"""Extract local Jiangsu English papers as text. No inferred questions/answers.
Usage: python scripts/import-jiangsu-english.py <download-root> <baidu-root>
"""
import hashlib
import importlib.util
import json
from pathlib import Path, PureWindowsPath
import re
import subprocess
import sys
import tempfile

spec = importlib.util.spec_from_file_location('english_import', Path(__file__).with_name('import-english-past-papers.py'))
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
DEST = base.DEST / 'jiangsu.js'
CITIES = [('nanjing', '南京'), ('wuxi', '无锡'), ('xuzhou', '徐州'), ('changzhou', '常州'),
          ('suzhou', '苏州'), ('nantong', '南通'), ('lianyungang', '连云港'), ('huaian', '淮安'),
          ('yancheng', '盐城'), ('yangzhou', '扬州'), ('zhenjiang', '镇江'), ('taizhou', '泰州'), ('suqian', '宿迁')]
NUM = re.compile(r'(?m)^\s*(?:[（(]\s*[）)]\s*)?(\d{1,3})\s*[.．、]\s*')
OPT = re.compile(r'([A-D])\s*[.．、)）]\s*')
HEAD = re.compile(r'(?m)^\s*(?:第[一二三四五六七八九十]+部分|[一二三四五六七八九十]+[、.．]|[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩIVX]+[.．、])\s*[^\n]*(?:单项|完[形型]|阅读理解|词汇|词性|任务型|短文填空|信息还原|完成句子|句型|书面表达|听力|选词)[^\n]*')
MARK = re.compile(r'【(?:答案|解析|分析|解答|详解|导语|文章大意|考点|点评|点睛|\d+题详解)】|\[语篇解读\]')


def valid_questions(text):
    matches = list(NUM.finditer(text))
    result = []
    for i, match in enumerate(matches):
        end = matches[i+1].start() if i+1 < len(matches) else len(text)
        raw = MARK.split(text[match.end():end], 1)[0]
        raw = HEAD.split(raw, 1)[0]
        raw = re.split(r'(?m)^\s*[A-D]\s*$', raw, 1)[0]
        opts = list(OPT.finditer(raw))
        if [o.group(1) for o in opts] == list('ABCD'):
            result.append((match, raw, opts))
    return result


def solutions(text):
    """Separate supplied solutions from stems; retain only unambiguous A-D keys."""
    answers, explanations = {}, {}
    tail = re.search(r'(?m)^\s*(?:答案全解全析|参考答案[^\n]*|答案与解析[^\n]*|答案解析[^\n]*|1\s*[.．]\s*[A-D](?=[\s　]))', text)
    if tail and (not re.match(r'\s*1\s*[.．]', tail.group()) or not valid_questions(text[tail.end():])):
        answer_text, text = text[tail.start():], text[:tail.start()]
        matches = list(re.finditer(r'(?m)^\s*(\d{1,3})\s*[.．]\s*([A-D])(?=[\s　、.．])', answer_text))
        for i, m in enumerate(matches):
            no = int(m.group(1)); answers[no] = m.group(2)
            explanation = answer_text[m.end():matches[i+1].start() if i+1 < len(matches) else len(answer_text)].strip('　 \n')
            explanation = HEAD.split(explanation, 1)[0]
            explanation = re.split(r'(?m)^\s*[A-D]\s*$|\[语篇解读\]', explanation, 1)[0].strip()
            if explanation: explanations[no] = explanation
    candidates = valid_questions(text)
    boundaries = sorted({m.start() for m, _, _ in candidates} | {m.start() for m in HEAD.finditer(text)})
    # A-D passage labels are boundaries only when followed by prose and an
    # original choice question, not a standalone answer letter in commentary.
    for m in re.finditer(r'(?m)^\s*[A-D]\s*$', text):
        next_question = next((q for q, _, _ in candidates if q.start() > m.end()), None)
        if next_question:
            prose = text[m.end():next_question.start()]
            if not MARK.search(prose) and len(re.findall('[A-Za-z]', prose)) > 40:
                boundaries.append(m.start())
    boundaries.sort()
    removals = []
    solution_starts = list(re.finditer(r'【答案】|【文章大意】|(?m:^\s*(\d{1,3})\s*[.．]\s*([A-D])(?=\s*[\u4e00-\u9fff]))', text))
    for m in solution_starts:
        end = next((b for b in boundaries if b > m.end()), len(text))
        block = text[m.end():end]
        if m.group(1):
            answers[int(m.group(1))] = m.group(2)
            explanations[int(m.group(1))] = block.strip()
            removals.append((m.start(), end))
            continue
        if m.group() == '【文章大意】':
            removals.append((m.start(), end))
            continue
        keys = re.findall(r'(\d{1,3})\s*[.．]\s*([A-D])(?=[\s　]|$)', MARK.split(block, 1)[0])
        if keys:
            for no, answer in keys: answers[int(no)] = answer
        else:
            single = re.match(r'\s*([A-D])(?=[\s　]|$)', block)
            previous = [q for q, _, _ in candidates if q.start() < m.start()]
            if single and previous: answers[int(previous[-1].group(1))] = single.group(1)
        details = list(re.finditer(r'【(\d+)题详解】', block))
        for i, detail in enumerate(details):
            value = block[detail.end():details[i+1].start() if i+1 < len(details) else len(block)].strip()
            if value: explanations[int(detail.group(1))] = value
        if not details:
            exp = re.search(r'【(?:解析|解答)】([\s\S]*)', block)
            previous = [q for q, _, _ in candidates if q.start() < m.start()]
            if exp and previous: explanations[int(previous[-1].group(1))] = exp.group(1).strip()
        removals.append((m.start(), end))
    # Merge overlapping solution spans before removing them.
    merged = []
    for start, end in sorted(removals):
        if merged and start <= merged[-1][1]: merged[-1] = (merged[-1][0], max(end, merged[-1][1]))
        else: merged.append((start, end))
    for start, end in reversed(merged): text = text[:start] + '\n' + text[end:]
    return text, answers, explanations


def parse(text, paper_id):
    text, answers, explanations = solutions(text)
    numbers = [int(match.group(1)) for match, _, _ in valid_questions(text)]
    if len(numbers) != len(set(numbers)):
        return [], ['原资料重复使用小题号，答案对应关系不明确，待人工核对后导入']
    headers = list(HEAD.finditer(text))
    questions, skipped = [], []
    for i, header in enumerate(headers):
        title = header.group()
        category = '完形填空' if re.search('完[形型]', title) else '阅读理解' if '阅读理解' in title else '语法与词汇' if '单项' in title else None
        if not category: continue
        body = text[header.end():headers[i+1].start() if i+1 < len(headers) else len(text)]
        blocks = re.split(r'(?m)^\s*[A-D]\s*$', body) if category == '阅读理解' else [body]
        for block in blocks:
            items = valid_questions(block)
            if not items: continue
            passage = block[:items[0][0].start()].strip() if category != '语法与词汇' else None
            if passage and ('[[image]]' in passage or '\ufffd' in passage or MARK.search(passage)):
                skipped.append(category + ': 文章包含图片、解析或无法识别字符'); continue
            if category != '语法与词汇' and (not passage or len(re.findall('[A-Za-z]', passage)) < 40):
                skipped.append(category + ': 未提取完整文章'); continue
            for match, raw, options in items:
                no = int(match.group(1))
                stem = raw[:options[0].start()].strip()
                choices = [raw[o.end():options[j+1].start() if j < 3 else len(raw)].strip() for j, o in enumerate(options)]
                if '[[image]]' in raw or '\ufffd' in raw or any(not option for option in choices):
                    skipped.append(f'{no}: 图片依赖或选项缺失'); continue
                if 'underlined' in stem.lower() and '[[u]]' not in (passage or '') + raw:
                    skipped.append(f'{no}: 下划线待核对'); continue
                if category == '语法与词汇' and not stem: continue
                explanation = explanations.get(no)
                if explanation and '[[image]]' in explanation: explanation = None
                questions.append(dict(id=f'{paper_id}-q{no:02}', originalNo=no, type='choice', category=category,
                                      stem=stem, options=choices, answer=answers.get(no), explanation=explanation,
                                      review=dict(status='pending'), **({'passage': passage} if passage else {})))
    counts = {}
    for q in questions: counts[q['id']] = counts.get(q['id'], 0) + 1
    questions = [q for q in questions if counts[q['id']] == 1]
    return sorted(questions, key=lambda q: q['originalNo']), skipped


def supplied_keys(text):
    """Read explicit keys only: compact tables, ranges, or original 故选 lines."""
    _, answers, explanations = solutions(text)
    conflicts = set()
    def add(no, answer):
        if no in answers and answers[no] != answer: conflicts.add(no)
        else: answers[no] = answer
    for line in text.splitlines():
        compact = re.findall(r'(?<!\d)(\d{1,3})\s*[.．]\s*([A-D])(?=\s|$)', line)
        if len(compact) >= 3:
            for no, answer in compact: add(int(no), answer)
        for match in re.finditer(r'(\d{1,3})\s*[-—－~～]\s*(\d{1,3})\s+((?:[A-D]\s*)+)', line):
            first, last = int(match.group(1)), int(match.group(2))
            values = re.sub(r'\s', '', match.group(3))
            if last - first + 1 == len(values):
                for i, answer in enumerate(values): add(first + i, answer)
    details = list(re.finditer(r'(?m)^\s*(\d{1,3})\s*[.．,，]\s*([A-D])\s*[.．、]?\s*(?=[\u4e00-\u9fff])', text))
    for i, match in enumerate(details):
        no = int(match.group(1)); add(no, match.group(2))
        value = text[match.end():details[i+1].start() if i+1 < len(details) else len(text)]
        value = HEAD.split(value, 1)[0].strip()
        if value and '[[image]]' not in value: explanations.setdefault(no, value)
    candidates = valid_questions(text)
    numbered_headers = list(NUM.finditer(text))
    for i, (match, _, _) in enumerate(candidates):
        next_header = next((n for n in numbered_headers if n.start() > match.start()), None)
        block = text[match.end():next_header.start() if next_header else len(text)]
        block = HEAD.split(block, 1)[0]
        explicit = set(re.findall(r'故选\s*[:：]?\s*([A-D])(?:[.．。]|\s|$)', block))
        if len(explicit) == 1:
            # This answer is attached to the exact original choice stem;
            # unrelated later subquestions may restart numbering at 1.
            no = int(match.group(1)); answers[no] = explicit.pop(); conflicts.discard(no)
            explanation = re.search(r'【解答】([\s\S]*?)(?:【点评】|$)', block)
            if explanation and '[[image]]' not in explanation.group(1):
                explanations.setdefault(no, explanation.group(1).strip())
    for no in conflicts: answers.pop(no, None); explanations.pop(no, None)
    return answers, explanations, conflicts


def write_catalog(catalog):
    data = '(function (root) {\n  const catalog = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n'
    data += '  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n'
    data += '  else root.JiangsuEnglishPastPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n'
    DEST.write_text(data, encoding='utf-8')


def supplement_answers(roots):
    catalog = json.loads(DEST.read_text(encoding='utf-8').split('const catalog = ', 1)[1].split(';\n', 1)[0])
    root_map = dict(roots)
    total = 0
    for paper in catalog['papers']:
        if not any(q['answer'] is None for q in paper['questions']): continue
        source = paper['source']
        path = root_map[source['root']] / source['file']
        if not path.resolve().is_relative_to(root_map[source['root']].resolve()):
            raise ValueError('Source outside specified root')
        if hashlib.sha256(path.read_bytes()).hexdigest() != source['sha256']:
            raise ValueError('Source changed: ' + paper['id'])
        answers, explanations, conflicts = supplied_keys(base.text_of(path))
        added = 0
        for q in paper['questions']:
            if q['answer'] is None and q['originalNo'] in answers:
                q['answer'] = answers[q['originalNo']]
                if not q['explanation'] and q['originalNo'] in explanations:
                    q['explanation'] = explanations[q['originalNo']]
                added += 1
        total += added
        print(paper['id'], 'added', added, 'conflicts', sorted(conflicts), flush=True)
    write_catalog(catalog)
    print('Total added answers:', total)


def inventory(roots):
    found = {}
    for label, root in roots:
        for path in root.rglob('*'):
            full = str(path)
            if not path.is_file() or not re.search('江苏|南通', full) or not re.search('英语|English', full): continue
            if path.suffix.lower() not in ('.pdf', '.doc', '.docx', '.rar', '.zip', '.7z'): continue
            year_match = re.search(r'20\d{2}', path.name)
            if not year_match: continue
            city = next(((slug, name) for slug, name in CITIES if name in full), None)
            if city: found.setdefault((city[0], int(year_match.group())), []).append((label, root, path))
    return found


def preserve_published(paper, previous):
    if previous.get('source') and previous['source'] != paper.get('source'):
        raise ValueError('Published source changed: ' + paper['id'])
    by_id = {q['id']: q for q in paper['questions']}
    by_id.update({q['id']: q for q in previous['questions']})
    paper['questions'] = sorted(by_id.values(), key=lambda q: q['originalNo'])
    paper['review'] = previous['review']
    return paper


def main(roots):
    found = inventory(roots)
    scratch = DEST.parents[3] / 'tmp/pdfs/jiangsu'
    scratch.mkdir(parents=True, exist_ok=True)
    old = {}
    if DEST.exists():
        data = json.loads(DEST.read_text(encoding='utf-8').split('const catalog = ', 1)[1].split(';\n', 1)[0])
        old = {p['id']: p for p in data['papers']}
    papers = []
    for (city, year), sources in sorted(found.items()):
        pid = f'js-{city}-{year}'
        city_name = dict(CITIES)[city]
        versions, seen, notes = [], set(), []
        # Annotated text sources first; image-only sources never substitute for text.
        sources.sort(key=lambda x: (x[2].suffix.lower() in ('.rar', '.zip', '.7z'), '图片' in x[2].name,
                                    '原卷版' in x[2].name, x[2].suffix.lower() == '.pdf', str(x[2])))
        with tempfile.TemporaryDirectory(prefix='xq-jiangsu-', dir=scratch) as temporary:
            if not Path(temporary).resolve().is_relative_to(scratch.resolve()):
                raise ValueError('Temporary directory outside workspace')
            for label, root, path in sources:
                digest = hashlib.sha256(path.read_bytes()).hexdigest()
                if digest in seen: continue
                seen.add(digest)
                source = dict(root=label, file=path.relative_to(root).as_posix(), sha256=digest)
                try:
                    members = [path]
                    if path.suffix.lower() in ('.rar', '.zip', '.7z'):
                        # Extract only document formats, never execute archive contents.
                        archive_dir = Path(temporary) / digest
                        archive_dir.mkdir()
                        listing = subprocess.run([r'C:\Program Files\7-Zip\7z.exe', 'l', '-slt', '-sccUTF-8', str(path)],
                                                 check=True, capture_output=True, timeout=60).stdout.decode('utf-8').replace('\r\n', '\n')
                        if '----------\n' not in listing:
                            raise ValueError('Cannot verify archive member list')
                        members_listing = listing.split('----------\n', 1)[1]
                        for entry in re.findall(r'(?m)^Path = (.+)$', members_listing):
                            member_path = PureWindowsPath(entry.strip())
                            if member_path.is_absolute() or '..' in member_path.parts or member_path.drive:
                                raise ValueError('Unsafe archive member path')
                        if re.search(r'(?m)^(?:Symbolic|Hard|Copy) Link = [^\n\s]', members_listing):
                            raise ValueError('Archive links are not permitted')
                        command = [r'C:\Program Files\7-Zip\7z.exe', 'x', str(path), '-o' + str(archive_dir),
                                   '-y', '-r', '*.pdf', '*.docx', '*.doc']
                        subprocess.run(command, check=True, capture_output=True, timeout=60)
                        members = sorted(p for p in archive_dir.rglob('*') if p.is_file() and p.suffix.lower() in ('.pdf', '.docx', '.doc'))
                    for member in members:
                        text = base.text_of(member)
                        # Placeholder/answer-only archives and wrong-subject contents are not papers.
                        if len(re.findall('[A-Za-z]', text)) < 150:
                            notes.append(path.name + ': 未提取足够英语题干（图片或占位资料）'); continue
                        questions, skipped = parse(text, pid)
                        if member != path:
                            source = dict(source, member=member.relative_to(archive_dir).as_posix(), memberSha256=hashlib.sha256(member.read_bytes()).hexdigest())
                        versions.append((questions, source, skipped))
                except Exception as error:
                    notes.append(path.name + ': 提取失败 ' + type(error).__name__)
        versions.sort(key=lambda v: (sum(q['answer'] is not None for q in v[0]), len(v[0])), reverse=True)
        questions, source, skipped = versions[0] if versions else ([], None, [])
        paper = dict(id=pid, city=city, cityName=city_name, year=year, title=f'{year} 年江苏{city_name}英语中考真题',
                     version='整理版 · 待核对' if questions else '题干待补充', review=dict(status='pending'),
                     completeness='部分题目已提取' if questions else '暂未可靠提取题干', questions=questions,
                     sources=[dict(root=l, file=p.relative_to(r).as_posix(), sha256=hashlib.sha256(p.read_bytes()).hexdigest()) for l,r,p in sources],
                     skipped=skipped + notes,
                     note='仅导入可靠提取的文字原题，不代表完整试卷；听力、图片依赖及无法可靠识别的题目暂未收录，原题和答案均待人工核对。' if questions else '已找到本地资料，但题干暂不能可靠提取；不凭答案或文件名生成真题。')
        if source: paper['source'] = source
        if pid in old:
            preserve_published(paper, old[pid])
        papers.append(paper)
        print(city_name, year, len(paper['questions']), 'questions', flush=True)
    # Never remove a published paper merely because its source is temporarily unavailable.
    papers.extend(p for pid, p in old.items() if pid not in {paper['id'] for paper in papers})
    catalog = dict(importedAt='2026-10-03', cities=[dict(id=slug, name=name) for slug,name in CITIES], papers=papers)
    write_catalog(catalog)


if __name__ == '__main__':
    if len(sys.argv) not in (3, 4) or (len(sys.argv) == 4 and sys.argv[3] != '--supplement-answers'):
        raise SystemExit(__doc__ + '\nOptional: --supplement-answers (only fill missing published answers)')
    roots = [('download', Path(sys.argv[1])), ('baidu', Path(sys.argv[2]))]
    if len(sys.argv) == 4: supplement_answers(roots)
    else: main(roots)
