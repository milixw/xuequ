"""Append Shanghai original text from both user directories, preserving published data.
Usage: python scripts/expand-shanghai-subject-papers.py <download-root> <netdisk-root>
"""
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import sys
from docx import Document
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/past-papers/shanghai.js'
spec = importlib.util.spec_from_file_location('word_binary', ROOT / 'scripts/word-binary-text.py')
word = importlib.util.module_from_spec(spec)
spec.loader.exec_module(word)
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
SUP = str.maketrans('0123456789+-=()n', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ')
NUM = re.compile(r'(?m)(?:^|(?<=\s))(\d{1,2})[.．、](?!\d)')
UNRELIABLE = re.compile(r'\[\[image\]\]|EMBED|[\ue000-\uf8ff\ufffd]')


def discover(roots):
    found = {}
    for label, root in roots:
        if not root.is_dir(): continue
        for path in sorted(root.rglob('*')):
            if not path.is_file() or path.suffix.lower() not in ('.pdf', '.doc', '.docx'): continue
            if '上海' not in path.name or not re.search('数学|语文', path.name): continue
            year = re.search(r'(20\d{2})', path.name)
            if not year: continue
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            item = found.setdefault(digest, dict(sha256=digest, year=int(year.group()),
                subject='math' if '数学' in path.name else 'chinese', paths=[]))
            item['paths'].append(dict(root=label, file=path.relative_to(root).as_posix()))
            item.setdefault('_path', path)
    return list(found.values())


def docx_text(path):
    # Paragraphs inside tables stay in document order; no media is discarded.
    document = Document(path)
    paragraphs = []
    for paragraph in document.element.body.iter(W + 'p'):
        parts = []
        for run in paragraph.iter(W + 'r'):
            if any(e.tag.rsplit('}', 1)[-1] in ('drawing', 'pict', 'object') for e in run.iter()):
                parts.append('[[image]]'); continue
            text = ''.join(e.text or '' for e in run.iter(W + 't'))
            if not text: continue
            superscript = run.find('.//' + W + 'vertAlign')
            if superscript is not None and superscript.get(W + 'val') == 'superscript':
                if re.fullmatch(r'[0-9+\-=()n]+', text): text = text.translate(SUP)
                else: text = '[[image]]'
            underline, emphasis = run.find('.//' + W + 'u'), run.find('.//' + W + 'em')
            if underline is not None and underline.get(W + 'val', 'single') != 'none': text = '[[u]]' + text + '[[/u]]'
            if emphasis is not None and emphasis.get(W + 'val') in ('dot', 'underDot'):
                text = '[[dot]]' + text + '[[/dot]]'
            parts.append(text)
        # OMML/objects can be siblings of w:r, not children of a run. Never
        # silently erase those equations when extracting ordinary text.
        if any(e.tag.rsplit('}', 1)[-1] in ('oMath', 'oMathPara', 'drawing', 'pict', 'object') for e in paragraph.iter()) and '[[image]]' not in parts:
            parts.append('[[image]]')
        paragraphs.append(''.join(parts))
    return '\n'.join(paragraphs)


def read_source(path):
    if path.suffix == '.docx': return docx_text(path)
    if path.suffix == '.doc':
        return word.word_text(path).replace('\x01', '[[image]]')
    return '\n'.join(page.extract_text() or '' for page in PdfReader(path).pages)


def clean(text):
    text = re.sub(r'\[来源[:：][^\]]*\]', '', text)
    return re.sub(r'[\x00-\x08\x0b-\x1f\ufe00-\ufe0f]', '', text).strip()


def numbered(text):
    matches = list(NUM.finditer(text))
    numbers = [int(m.group(1)) for m in matches]
    if len(numbers) != len(set(numbers)): raise ValueError('Duplicate source numbers')
    return {int(m.group(1)): text[m.end():matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
            for i, m in enumerate(matches)}


def chinese_groups(text, year):
    if year in (2017, 2018):
        starts = list(re.finditer(r'(?m)^\s*(?:\d+[.．]默写|\d+[.．]阅读[^\n]*|阅读(?:下文|下面)[^\n]*)', text))
        return [text[m.start():starts[i + 1].start() if i + 1 < len(starts) else len(text)] for i, m in enumerate(starts)]
    # A major section is one group only if it has no reading subheadings.
    major = list(re.finditer(r'(?m)^\s*[一二三四][、.．][^\n]*', text))
    groups = []
    for i, m in enumerate(major):
        segment = text[m.start():major[i + 1].start() if i + 1 < len(major) else len(text)]
        if '写作' in m.group(): break
        minor = list(re.finditer(r'(?m)^\s*[(（][一二三四][）)][^\n]*', segment))
        if minor:
            groups.extend(segment[s.start():minor[j + 1].start() if j + 1 < len(minor) else len(segment)] for j, s in enumerate(minor))
        else: groups.append(segment)
    return groups


def import_chinese(item):
    year = item['year']; text = read_source(item['_path'])
    if year not in range(2013, 2021): return [], ['该版本尚未逐题核对，不用回忆提纲补造原题']
    inline = year in (2018, 2019)
    if inline:
        boundary = re.search(r'(?m)^\s*四[、.．]写作|^\s*\d+[.．]作文|^\s*作文', text)
        source, answers = text[:boundary.start()] if boundary else text, {}
    else:
        boundary = re.search(r'(?m)^\s*(?:答案全解全析|参考答案|\d{4}年上海中考语文参考答案)[^\n]*', text)
        if not boundary: return [], ['未找到明确的原答案分界']
        source = text[:boundary.start()]
        try: answers = numbered(text[boundary.end():])
        except ValueError: return [], ['原答案题号重复，待人工核对']
    if year == 2017:
        source = source.split('四、写作', 1)[0]
    questions, skipped = [], []
    for group in chinese_groups(source, year):
        if inline:
            marker = re.search(r'【答案】', group)
            if not marker: skipped.append('整组未找到原答案'); continue
            stem, result = group[:marker.start()], group[marker.end():]
            parts = result.split('【解析】', 1)
            answer, explanation = clean(parts[0]), clean(parts[1]) if len(parts) > 1 else None
        else: stem, answer, explanation = group, None, None
        numbers = list(dict.fromkeys(int(m.group(1)) for m in NUM.finditer(stem)))
        if not numbers: skipped.append('整组原题号无法确认'); continue
        no = numbers[0]
        if UNRELIABLE.search(stem): skipped.append(f'{no}: 图片或原文标记未恢复'); continue
        if '加点' in stem and '[[dot]]' not in stem or re.search('画线|划线|下划线|波浪线', stem) and '[[u]]' not in stem:
            skipped.append(f'{no}: 题目依赖的加点或画线尚未恢复'); continue
        if re.search(r'完成下表|如图|下图|右图|左图|图中|图示|邮票|海报|示意图', stem):
            skipped.append(f'{no}: 原图或表格需完整转录'); continue
        if not inline:
            chunks = [str(n) + '. ' + answers[n] for n in numbers if n in answers]
            if len(chunks) != len(numbers): skipped.append(f'{no}: 部分小问缺少可靠原答案'); continue
            if year == 2017:
                # Its answer part repeats the question: retain only 解答/答案.
                result = answers[no]
                marker = re.search(r'【解答】|答案[:：]', result)
                if not marker: skipped.append(f'{no}: 原参考答案未可靠分离'); continue
                answer = clean(result[marker.end():])
            else: answer = clean('\n\n'.join(chunks))
        if not answer or UNRELIABLE.search(answer): skipped.append(f'{no}: 原答案含未转录内容'); continue
        category = '古诗文默写' if '默写' in stem[:70] else '阅读理解'
        questions.append(dict(id=f'sh-chinese-{year}-q{no:02}', originalNo=no, originalNumbers=numbers,
            type='written', category=category, stem=clean(stem), answer=answer,
            explanation=explanation, review={'status': 'pending'}))
    return questions, skipped


def import_math(item):
    # Never auto-import flattened PDF formula text. DOCX preserves numeric
    # superscripts; missing equation objects are explicit image placeholders.
    if item['_path'].suffix not in ('.docx', '.doc'): return [], ['公式、图形或原答案需逐页核对转录']
    text = read_source(item['_path'])
    boundary = re.search(r'(?m)^\s*(?:答案全解全析|参考答案)[^\n]*', text)
    if not boundary: return [], ['未找到明确的原答案分界']
    try: stems, answers = numbered(text[:boundary.start()]), numbered(text[boundary.end():])
    except ValueError: return [], ['原题或答案编号重复，待人工核对']
    questions, skipped = [], []
    for no, stem in stems.items():
        stem = re.split(r'(?m)^\s*(?:第[ⅠⅡIV]+卷|[一二三四五六七八九十]+[、.．])', stem, maxsplit=1)[0]
        if no > 18 or UNRELIABLE.search(stem) or re.search('如图|图象如图|图像如图|图中|如表', stem) or item['_path'].suffix == '.doc' and re.search(r'[A-Za-z][0-9]', stem):
            skipped.append(f'{no}: 公式或原图尚未完整核对'); continue
        chunk = re.sub(r'\[\[/?(?:u|dot)\]\]', '', answers.get(no, ''))
        if no <= 6:
            options = list(re.finditer(r'[A-D][.．]', stem))
            if len(options) != 4: skipped.append(f'{no}: 原选项未可靠分离'); continue
            body = stem[:options[0].start()].strip()
            values = [clean(stem[m.end():options[i + 1].start() if i < 3 else len(stem)]) for i, m in enumerate(options)]
            key = re.search(r'^(?:答案\s*)?([A-D])(?=\s|[.．])|故选[:：]?\s*([A-D])', chunk)
            if not key or not all(values): skipped.append(f'{no}: 原答案或选项缺失'); continue
            q = dict(type='choice', stem=clean(body), options=values, answer=key.group(1) or key.group(2), category='选择题')
        else:
            key = re.search(r'答案\s*(.*?)(?=解析|评析|$)', chunk, re.S)
            if not key or not key.group(1).strip() or UNRELIABLE.search(key.group(1)):
                skipped.append(f'{no}: 参考答案含未恢复公式'); continue
            q = dict(type='written', stem=clean(stem), answer=clean(key.group(1)), category='填空题')
        q.update(id=f"sh-math-{item['year']}-q{no:02}", originalNo=no, explanation=None,
                 explanationNote='原解析含公式或图形，待完整核对转录。', review={'status': 'pending'})
        questions.append(q)
    return questions, skipped


def append_questions(papers, paper):
    previous = next((p for p in papers if p['id'] == paper['id']), None)
    if previous:
        if not previous['questions']:
            papers[papers.index(previous)] = paper
            return True
        if previous['source']['sha256'] != paper['source']['sha256']: return False
        published = {q['id'] for q in previous['questions']}
        previous['questions'].extend(q for q in paper['questions'] if q['id'] not in published)
    else: papers.append(paper)
    return True


def main(roots):
    catalog = json.loads(DEST.read_text(encoding='utf-8').split('const catalog = ', 1)[1].split(';\n', 1)[0])
    inventory = discover(roots)
    papers = catalog['papers']
    root_map = dict(roots)
    for paper in papers:
        if not paper['questions']: continue
        path = root_map[paper['source']['root']] / paper['source']['file']
        if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != paper['source']['sha256']:
            raise ValueError('Published source missing or changed: ' + paper['id'])
    checked = json.loads((ROOT / 'content/past-papers/math-2026-transcripts.json').read_text(encoding='utf-8'))
    # One exact, visually checked question/answer pair from F: (D: has copies).
    source = next((i for i in inventory if i['sha256'] == checked['sourceSha256']), None)
    answer = next((i for i in inventory if i['sha256'] == checked['answerSha256']), None)
    if not source or not answer: raise ValueError('Checked 2026 source/answer missing or changed')
    qs = [dict(q, id=f'sh-math-2026-q{int(no):02}', originalNo=int(no),
               category='选择题' if q['type'] == 'choice' else '解答题' if int(no) >= 18 else '填空题',
               explanation=None, review={'status': 'pending'}) for no, q in checked['questions'].items()]
    append_questions(papers, dict(id='sh-math-2026', subject='math', year=2026, title='2026 年上海数学中考真题',
        version='非官方整理版', source={**source['paths'][0], 'sha256': source['sha256'],
          'answerFile': answer['paths'][0]['file'], 'answerSha256': answer['sha256']}, review={'status': 'pending'},
        questions=qs, skipped=['6、13、15—17、20—25: 原图及后续题目待完整核对转录'],
        note='部分原题已导入，扫描页逐题转成网页文字并核对原答案，待教师审核；主观题不自动判分。'))
    # Choose a readable version for each still-missing subject/year, not copies.
    candidates = {}
    for item in inventory:
        key = (item['subject'], item['year'])
        if 2013 <= item['year'] <= 2020: candidates.setdefault(key, []).append(item)
    for (subject, year), versions in sorted(candidates.items()):
        if any(p['id'] == f'sh-{subject}-{year}' and p['questions'] for p in papers): continue
        results = []
        for item in versions:
            try: questions, skipped = (import_chinese if subject == 'chinese' else import_math)(item)
            except (ValueError, KeyError): questions, skipped = [], ['原格式或题号不能可靠解析，待人工核对']
            results.append((len(questions), item, questions, skipped))
        _, item, questions, skipped = max(results, key=lambda r: r[0])
        name = '语文' if subject == 'chinese' else '数学'
        append_questions(papers, dict(id=f'sh-{subject}-{year}', subject=subject, year=year,
            title=f'{year} 年上海{name}中考真题', version='整理版',
            source={**item['paths'][0], 'sha256': item['sha256']}, review={'status': 'pending'},
            questions=questions, skipped=skipped or ['作文或后续依赖图文的题暂未导入'],
            note=('部分原题已导入，原资料文字和参考答案待核对、待教师审核。' if questions else '资料已找到，但原题、公式或答案尚未可靠转录，暂不能作答。') +
                 ('阅读与全部小问保留在同一道题中。' if subject == 'chinese' else '填空题不自动判分。')))
    for subject, year in sorted({(i['subject'], i['year']) for i in inventory}):
        if any(p['id'] == f'sh-{subject}-{year}' for p in papers): continue
        item = next(i for i in inventory if i['subject'] == subject and i['year'] == year)
        name = '语文' if subject == 'chinese' else '数学'
        papers.append(dict(id=f'sh-{subject}-{year}', subject=subject, year=year,
            title=f'{year} 年上海{name}中考资料', version='未完成转录 · 待核对',
            source={**item['paths'][0], 'sha256': item['sha256']}, review={'status': 'pending'},
            questions=[], skipped=['扫描、原题标记或回忆资料尚未完整核对，不根据答案补造题干'],
            note='资料已找到，题干待完整转录，暂不能作答。'))
    for item in inventory:
        published = next((p for p in papers if p['source']['sha256'] == item['sha256']), None)
        item['status'] = 'partial-imported' if published and published['questions'] else 'reference-answer' if item is answer else 'pending-transcription'
        if published: item['paperId'] = published['id']; item['questionCount'] = len(published['questions'])
        del item['_path']
    (ROOT / 'content/past-papers/source-inventory.json').write_text(json.dumps(dict(scannedAt='2026-10-04',
        roots=[label for label, _ in roots], sources=inventory), ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    DEST.write_text('// Generated from checked Shanghai source papers.\n(function(root) {\n  const catalog = ' +
        json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n' +
        '  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n' +
        '  else root.ShanghaiSubjectPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n', encoding='utf-8')
    for p in papers: print(p['id'], len(p['questions']))
    print('Unique source files:', len(inventory), 'Paths:', sum(len(i['paths']) for i in inventory))


if __name__ == '__main__':
    if len(sys.argv) != 3: raise SystemExit(__doc__)
    main([('download', Path(sys.argv[1])), ('netdisk', Path(sys.argv[2]))])
