"""Import original text questions, never infer missing stems or answers.
Usage: python scripts/import-english-past-papers.py <D-download-root> <F-download-root> [--supplement-answers]
"""
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil
import sys
from docx import Document
from pypdf import PdfReader

DEST = Path(__file__).resolve().parents[1] / 'content/english/past-papers'
spec = importlib.util.spec_from_file_location('word_binary', Path(__file__).with_name('word-binary-text.py'))
binary = importlib.util.module_from_spec(spec)
spec.loader.exec_module(binary)
NUM = re.compile(r'^\s*(\d{1,3})\s*[.．、,，•]\s*', re.M)
OPTION = re.compile(r'(?<![A-Za-z])([A-D])\s*[.．)）]\s*')


def clean(text):
    # Restore the visible apostrophe represented by the source's private font
    # glyph. Do not paraphrase or repair source spelling/grammar.
    text = text.replace('\U001001b3', "'")
    text = re.sub(r'[\x00-\x08\x0c\x0e-\x1f]', '', text)
    text = re.sub(r'(?m)^\s*第\s*\d+\s*页\s*$', '', text)
    text = re.sub(r'(?m)^\s*初中学业考试[^\n]*第\s*\d+\s*页[^\n]*$', '', text)
    return text.strip()


def text_of(path):
    if path.suffix == '.doc': return clean(binary.word_text(path).replace('\x01', '[[image]]'))
    if path.suffix == '.pdf': return clean('\n'.join(p.extract_text() or '' for p in PdfReader(path).pages))
    doc, lines = Document(path), []
    ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
    for child in doc.element.body:
        if child.tag.endswith('}p'):
            parts = []
            for run in child.iter(ns + 'r'):
                t = ''.join(el.text or '' for el in run.iter(ns + 't'))
                underline = run.find(ns + 'rPr/' + ns + 'u')
                if underline is not None and t.strip() and underline.get(ns + 'val') != 'none':
                    t = '[[u]]' + t + '[[/u]]'
                parts.append(t)
                if run.find(ns + 'drawing') is not None or run.find(ns + 'pict') is not None:
                    parts.append('[[image]]')
                if run.find(ns + 'tab') is not None: parts.append('\t')
            lines.append(''.join(parts))
        elif child.tag.endswith('}tbl'):
            for row in child:
                if row.tag.endswith('}tr'):
                    lines.append('\t'.join(''.join(el.text or '' for el in cell.iter(ns + 't')) for cell in row if cell.tag.endswith('}tc')))
    return clean('\n'.join(lines))


def numbered(text):
    matches = list(NUM.finditer(text))
    return [(int(m.group(1)), text[m.end():matches[i+1].start() if i+1 < len(matches) else len(text)].strip()) for i, m in enumerate(matches)]


def answer_map(text, year):
    answers, explains = {}, {}
    if year in (2013, 2014, 2015):
        section = text.split('\n答案全解全析', 1)[1]
        for no, chunk in numbered(section):
            match = re.match(r'([^\u3000\n]+)(?:\u3000|\n)(.*)', chunk, re.S)
            if match:
                answers[no] = match.group(1).strip()
                explains[no] = match.group(2).split('\n[长难句]')[0].split('\n评析')[0].strip()
    elif year == 2017:
        if '英语试卷答案要点' not in text: return answers, explains
        # Decorative drawings in the answer table are not missing answer text.
        # Never remove image markers from question stems or passages.
        section = text.split('英语试卷答案要点', 1)[1].replace('[[image]]', '')
        for m in re.finditer(r'(?<!\d)(\d{1,2})\s*[.．、]\s*([A-D])\b', section):
            answers[int(m.group(1))] = m.group(2)
        for m in re.finditer(r'(?<!\d)(5[4-9]|6[01])\s*\.\s*([A-Za-z]+)', section):
            answers[int(m.group(1))] = m.group(2)
    elif year == 2019:
        for block in re.findall(r'【答案】(.*?)(?:【解析】|$)', text, re.S):
            for m in re.finditer(r'(?<!\d)(\d{1,2})\.\s*([A-Za-z]+)', block):
                answers[int(m.group(1))] = m.group(2)
    elif year == 2020:
        section = text[text.find('2020 初中毕业统一学业考试英语试卷答案'):]
        for m in re.finditer(r'(\d+)\s*-\s*(\d+)\s+([A-E]+)', section):
            if len(m.group(3)) == int(m.group(2)) - int(m.group(1)) + 1:
                for i, value in enumerate(m.group(3)): answers[int(m.group(1)) + i] = value
        for m in re.finditer(r'(?<!\d)(\d{2})\s*\.\s*([^\n]+?)(?=\s+\d{2}\s*\.|\n|$)', section):
            answers[int(m.group(1))] = m.group(2).strip()
    return answers, explains


def region(text, start, end):
    a = re.search(start, text, re.I | re.M)
    if not a: return ''
    tail = text[a.end():]
    b = re.search(end, tail, re.I | re.M)
    return tail[:b.start()] if b else tail


def parse(text, year):
    answers, explains = answer_map(text, year)
    output, skipped = [], []
    grammar = region(text, r'(?:Ⅱ|II)\s*\.?\s*Choose\s+the\s+best\s+answer[^\n]*', r'(?:Ⅲ|I[Il]{2})\s*\.?\s*Complete')
    forms = region(text, r'(?:Ⅳ|IV)\s*\.?\s*Complete\s*the\s*sentences\s*with[^\n]*', r'(?:Ⅴ|V)\s*[.．]')
    if year == 2019: forms = forms.split('【答案】')[0]
    for no, chunk in numbered(grammar):
        raw = re.split(r'【(?:考点|答案|解答|解析)】', chunk)[0].strip()
        options = list(OPTION.finditer(raw))
        if [m.group(1) for m in options] != list('ABCD'):
            skipped.append(f'{no}: 选项不完整或格式未可靠识别'); continue
        stem = raw[:options[0].start()].strip()
        if ('underlined' in stem.lower() and '[[u]]' not in raw) or '\ufffd' in raw or '[[image]]' in raw:
            skipped.append(f'{no}: 下划线或字符尚待核对'); continue
        choices = [raw[m.end():options[i+1].start() if i < 3 else len(raw)].strip() for i, m in enumerate(options)]
        answer, explanation = answers.get(no), explains.get(no)
        direct = re.search(r'【答案】\s*([A-D])\b', chunk)
        if direct: answer = direct.group(1)
        if year == 2016:
            found = re.search(r'(?:故选\s*[:：]?|答案[为:：])\s*([A-D])', chunk)
            if found: answer = found.group(1)
        exp = re.search(r'【(?:解答|解析)】(.*?)(?:【点评】|$)', chunk, re.S)
        if exp: explanation = exp.group(1).strip()
        if answer and not re.fullmatch('[A-D]', answer): answer = None
        output.append(dict(id=f'sh{year}-q{no:02}', originalNo=no, type='choice', category='语法与词汇',
                           stem=stem, options=choices, answer=answer, explanation=explanation, review=dict(status='pending')))
    for no, chunk in numbered(forms):
        if no not in (range(59, 67) if year == 2013 else range(29, 37) if year == 2019 else range(54, 62)): continue
        chunk = re.split(r'(?m)^\s*(?:Ⅴ|V)\s*[.．]', chunk)[0]
        stem = re.split(r'【(?:考点|答案|解答|解析)】', chunk)[0].strip()
        if not re.search(r'[（(][A-Za-z]+[）)]\s*$', stem) or '\ufffd' in stem:
            skipped.append(f'{no}: 词性转换题干格式待核对'); continue
        answer, explanation = answers.get(no), explains.get(no)
        direct = re.search(r'【答案】\s*(.+?)(?:\n|【)', chunk)
        if direct: answer = direct.group(1).strip()
        if year == 2016:
            found = re.search(r'(?:故(?:填|答案[为是:：])|答案[为是:：])\s*([A-Za-z]+)', chunk)
            if found: answer = found.group(1)
        exp = re.search(r'【(?:解答|解析)】(.*?)(?:【点评】|$)', chunk, re.S)
        if exp: explanation = exp.group(1).strip()
        if answer and not re.fullmatch(r'[A-Za-z]+(?:/[A-Za-z]+|\(s\))?', answer): answer = None
        output.append(dict(id=f'sh{year}-q{no:02}', originalNo=no, type='fill', category='词性转换',
                           stem=stem, answer=answer, explanation=explanation, review=dict(status='pending')))
    if year == 2026:
        forms = region(text, r'C\.\s*词性转换[^\n]*', r'D\.\s*Sentence')
        keys = dict((int(m.group(1)), m.group(2)) for m in re.finditer(r'(\d{2})\.\s*([A-Za-z]+)', forms.split('【参考答案】')[-1]))
        for no, chunk in numbered(forms.split('【参考答案】')[0]):
            if keys.get(no) and re.search(r'[（(][A-Za-z]+[）)]\s*$', chunk):
                output.append(dict(id=f'sh{year}-q{no:02}', originalNo=no, type='fill', category='词性转换',
                                   stem=chunk, answer=keys[no], explanation=None, review=dict(status='pending')))
    for label, start, end in [
        ('阅读理解', r'A\s*[.．,，]\s*Choose\s*the\s*best\s*answer[^\n]*', r'B\s*[.．]\s*Choose'),
        ('完形填空', r'B\s*[.．]\s*Choose\s*the\s*best\s*(?:answer|words)\s*and\s*complete\s*the\s*passage[^\n]*', r'^\s*C\s*[.．]\s*(?:Fill|Read)')]:
        body = region(text, start, end)
        first = NUM.search(body)
        if not first: continue
        passage = body[:first.start()].strip()
        if not passage or '[[image]]' in passage or re.search(r'【(?:考点|分析|点评|答案)】', passage):
            skipped.append(label + ': 文章包含图片或没有完整文字正文'); continue
        # 2013-2015 append source explanations at the end of the document;
        # never allow them into the last exercise or passage.
        body = body.split('\n答案全解全析')[0]
        for no, chunk in numbered(body):
            raw = re.split(r'【(?:考点|答案|解答|解析)】', chunk)[0].strip()
            options = list(OPTION.finditer(raw))
            if [m.group(1) for m in options] != list('ABCD'):
                skipped.append(f'{no}: {label}选项不完整'); continue
            stem = raw[:options[0].start()].strip()
            if 'underlined' in stem.lower() and '[[u]]' not in passage and '[[u]]' not in raw:
                skipped.append(f'{no}: 阅读下划线未可靠提取'); continue
            if '[[image]]' in raw or '\ufffd' in raw: continue
            choices = [raw[m.end():options[i+1].start() if i < 3 else len(raw)].strip() for i, m in enumerate(options)]
            answer, explanation = answers.get(no), explains.get(no)
            direct = re.search(r'【答案】\s*([A-D])\b', chunk)
            if direct: answer = direct.group(1)
            if year == 2016:
                found = re.search(r'(?:故选\s*[:：]?|答案[为:：])\s*([A-D])', chunk)
                if found: answer = found.group(1)
            exp = re.search(r'【(?:解答|解析)】(.*?)(?:【点评】|$)', chunk, re.S)
            if exp: explanation = exp.group(1).strip()
            if answer and not re.fullmatch('[A-D]', answer): answer = None
            if any(q['id'] == f'sh{year}-q{no:02}' for q in output): continue
            output.append(dict(id=f'sh{year}-q{no:02}', originalNo=no, type='choice', category=label,
                               passage=passage, stem=stem, options=choices, answer=answer,
                               explanation=explanation, review=dict(status='pending')))
    output.sort(key=lambda q: q['originalNo'])
    return output, skipped


def fill_missing(paper, answers, source=None):
    count = 0
    for question in paper['questions']:
        # Supplement records have their own source/version/answer association.
        if question.get('completionSource'): continue
        if question.get('answer') is not None: continue
        value = answers.get(question['originalNo'])
        pattern = r'[A-D]' if question['type'] == 'choice' else r'[A-Za-z]+(?:/[A-Za-z]+|\(s\))?'
        if not isinstance(value, str) or not re.fullmatch(pattern, value): continue
        question['answer'] = value
        if source is not None:
            question['answerSource'] = dict(source)
        count += 1
    return count


def write_catalog(catalog):
    text = '// Generated by scripts/import-english-past-papers.py; text extracted from original sources.\n'
    text += '(function (root) {\n  const catalog = ' + json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n'
    text += '  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n'
    text += '  else root.EnglishPastPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n'
    DEST.mkdir(parents=True, exist_ok=True)
    (DEST / 'catalog.js').write_text(text, encoding='utf-8')


def supplement_answers(roots):
    previous = (DEST / 'catalog.js').read_text(encoding='utf-8')
    catalog = json.loads(previous.split('const catalog = ', 1)[1].split(';\n', 1)[0])
    supplements = json.loads((DEST / 'answer-supplements.json').read_text(encoding='utf-8'))
    root_map = dict(roots)
    count = 0
    for paper in catalog['papers']:
        if not paper['questions'] or not any(q.get('answer') is None and not q.get('completionSource') for q in paper['questions']): continue
        source = paper['source']
        relative = Path(source['file'])
        if relative.is_absolute() or '..' in relative.parts: raise ValueError('Unsafe source path')
        path = root_map[source['root']] / relative
        if hashlib.sha256(path.read_bytes()).hexdigest() != source['sha256']:
            raise ValueError('Published paper source changed: ' + str(paper['year']))
        answers, _ = answer_map(text_of(path), paper['year'])
        local_count = fill_missing(paper, answers)
        entry = supplements.get(str(paper['year']))
        online_count = 0
        if entry:
            if entry['sourceSha256'] != source['sha256']: raise ValueError('Supplement source mismatch')
            online_count = fill_missing(paper, {int(k): v for k, v in entry['answers'].items()}, entry['answerSource'])
        if online_count and all(q.get('answer') is not None for q in paper['questions']):
            paper['note'] = paper['note'].replace(' 原资料没有答案，题目仅支持作答，不自动判分。', '')
            paper['note'] += ' 原文件没有答案表；已导入题目的答案经两份公开资料核对补充，非官方发布，待教师审核。'
        count += local_count + online_count
        print(paper['year'], 'local:', local_count, 'public supplement:', online_count)
    write_catalog(catalog)
    print('Added answers:', count)


def main(roots):
    candidates = {}
    for label, root in roots:
        for path in root.rglob('*'):
            if path.is_file() and '上海' in str(path): candidates.setdefault(path.name, []).append((label, root, path))
    def locate(name):
        found = candidates.get(name, [])
        if not found: raise FileNotFoundError(name)
        hashes = {hashlib.sha256(p.read_bytes()).hexdigest() for _, _, p in found}
        if len(hashes) > 1: raise ValueError('Source conflict: ' + name)
        return found[0]
    papers = []
    for year in [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2026]:
        if year == 2026: name = '2026上海中考英语回忆版真题及解析.pdf'
        else:
            ext = 'pdf' if year == 2020 else 'doc' if year in (2016, 2018, 2019) else 'docx'
            parts = '+答案' if year in (2017, 2020) else '' if year == 2018 else '+答案+解析'
            name = f'{year}上海英语试卷{parts}({"PDF" if year == 2020 else "word"}整理版).{ext}'
        label, root, path = locate(name)
        questions, skipped = parse(text_of(path), year)
        source = dict(root=label, file=path.relative_to(root).as_posix(), sha256=hashlib.sha256(path.read_bytes()).hexdigest())
        paper = dict(year=year, title=f'{year} 年上海英语中考真题' + ('（回忆版）' if year == 2026 else ''),
                     version='回忆版 · 非官方' if year == 2026 else '整理版', completeness='部分题目已提取',
                     review=dict(status='pending'), source=source, questions=questions, skipped=skipped,
                     note='已导入可可靠提取的文字原题，保留原资料题号；未完成整卷导入。缺失或依赖图片的题目暂不收录。' +
                     (' 回忆版题干、答案及音频对应关系待核，不是官方完整版。' if year == 2026 else '') +
                     (' 原资料没有答案，题目仅支持作答，不自动判分。' if year == 2018 else ''))
        if year == 2026:
            _, _, audio = locate('2026年上海中考英语听力音频文件.mp3')
            target = DEST / '2026/listening.mp3'; target.parent.mkdir(parents=True, exist_ok=True)
            if not target.exists(): shutil.copyfile(audio, target)
            paper['audio'] = 'content/english/past-papers/2026/listening.mp3'
        papers.append(paper)
        print(year, len(questions), 'questions;', sum(q['answer'] is not None for q in questions), 'with supplied answers')
    papers.append(dict(year=2025, title='2025 年上海英语中考', version='题干待补充', completeness='未找到完整笔试题干',
                       review=dict(status='pending'), questions=[], skipped=[],
                       note='原目录只有听力原文、音频与答案图片/PDF，没有完整笔试题干。不能凭答案编造真题，待补充原卷后生成题目。'))
    _, _, audio = locate('听力音频.mp4')
    target = DEST / '2025/listening.mp4'; target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists(): shutil.copyfile(audio, target)
    papers[-1]['audio'] = 'content/english/past-papers/2025/listening.mp4'
    # Preserve already published IDs and human corrections on later imports.
    # A changed source must be reconciled manually, not silently re-associated.
    previous_path = DEST / 'catalog.js'
    if previous_path.exists():
        previous_text = previous_path.read_text(encoding='utf-8')
        previous = json.loads(previous_text.split('const catalog = ', 1)[1].split(';\n', 1)[0])
        for paper in papers:
            old = next((p for p in previous['papers'] if p['year'] == paper['year']), None)
            if not old: continue
            if old.get('source') and old['source']['sha256'] != paper['source']['sha256']:
                raise ValueError('Published paper source changed: ' + str(paper['year']))
            by_id = {q['id']: q for q in paper['questions']}
            by_id.update({q['id']: q for q in old['questions']})
            paper['questions'] = sorted(by_id.values(), key=lambda q: q['originalNo'])
            paper['review'] = old['review']
            if old.get('coverage'):
                for field in ['coverage', 'supplementSources', 'note', 'completeness', 'skipped']:
                    paper[field] = old[field]
            if any(q.get('answerSource') for q in paper['questions']):
                paper['note'] = old['note']
    # Mechanical removal of page footers and extraction-only image markers,
    # including previously generated text. This never changes answers or IDs.
    for paper in papers:
        for question in paper['questions']:
            for field in ['stem', 'passage', 'explanation']:
                if question.get(field):
                    question[field] = clean(question[field])
                    if field == 'explanation':
                        question[field] = question[field].replace('[[image]]', '')
            if question.get('options'):
                question['options'] = [clean(option) for option in question['options']]
    catalog = dict(importedAt='2026-10-03', missingYears=[2021, 2022, 2023, 2024], papers=sorted(papers, key=lambda p: p['year'], reverse=True))
    write_catalog(catalog)


if __name__ == '__main__':
    if len(sys.argv) not in (3, 4) or len(sys.argv) == 4 and sys.argv[3] != '--supplement-answers': raise SystemExit(__doc__)
    roots = [('download', Path(sys.argv[1])), ('baidu', Path(sys.argv[2]))]
    (supplement_answers if len(sys.argv) == 4 else main)(roots)
