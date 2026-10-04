"""Import checked Shanghai Chinese/math text only. No guessed stems/answers.
Usage: python scripts/import-shanghai-subject-papers.py <中考真题目录>
"""
import hashlib
import json
from pathlib import Path
import re
import sys
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/past-papers/shanghai.js'
NUMBER = re.compile(r'^\s*(\d{1,2})\s*[.．]\s*[（(]\s*\d+\s*分\s*[）)]', re.M)


def clean(text):
    # PDF text-position controls are not part of the visible question.
    text = re.sub(r'[\ufe00-\ufe0f]', '', text)
    text = re.sub(r'(?m)^\s*(?:/g0|sgt|/×0)\s*$', '', text)
    text = re.sub(r'(?m)^\s*(?:语文|数学)试题\s*第\d+页[（(]共\d+页[）)]\s*$', '', text)
    text = re.sub(r'(?m)^\s*[一二三四五六七八九十⼀⼆]+、[^\n]*本题共[^\n]*$', '', text)
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', text)
    return re.sub(r'\n[ \t]*\n+', '\n\n', text).strip()


def split_source(text):
    match = re.search(r'\d{4}\s*年上海市中考试卷[^\n]*参考答案', text)
    if not match: raise ValueError('No unambiguous answer boundary')
    return clean(text[:match.start()]), clean(text[match.end():])


def blocks(text):
    matches = list(NUMBER.finditer(text))
    numbers = [int(m.group(1)) for m in matches]
    if len(numbers) != len(set(numbers)): raise ValueError('Duplicate question numbers')
    return {int(m.group(1)): text[m.end():matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
            for i, m in enumerate(matches)}


def answer_parts(chunk):
    answer = re.search(r'【\s*答\s*案\s*】(.*?)(?=【\s*解\s*析\s*】|$)', chunk, re.S)
    explanation = re.search(r'【\s*解\s*析\s*】(.*?)(?=【\s*点\s*评\s*】|$)', chunk, re.S)
    return (clean(answer.group(1)) if answer else None,
            clean(explanation.group(1)) if explanation else None)


def mark(text, original, kind='u'):
    if original not in text: raise ValueError('Missing checked annotation: ' + original)
    return text.replace(original, '[[' + kind + ']]' + original + '[[/' + kind + ']]', 1)


def safe_math_analysis(text):
    # PDF extraction flattens superscripts, fractions and geometric labels.
    # Until visually transcribed, show only prose with no mathematical tokens.
    return text if text and not re.search(r'[A-Za-z0-9=<>√∵∴÷×±∠△]', text) else None


def import_papers(root):
    transcripts = json.loads((ROOT / 'content/past-papers/math-transcripts.json').read_text(encoding='utf-8'))
    papers = []
    for subject, name in [('math', '数学'), ('chinese', '语文')]:
        for year in (2023, 2024, 2025):
            filename = f'{year}年上海市中考{name}试卷' + ('（回忆版）' if subject == 'math' and year == 2025 else '') + '.pdf'
            path = root / filename
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            raw = '\n'.join(page.extract_text() or '' for page in PdfReader(path).pages)
            source, answers = split_source(raw)
            stems, keys = blocks(source), blocks(answers)
            paper_id = f'sh-{subject}-{year}'
            paper = dict(id=paper_id, subject=subject, year=year, title=f'{year} 年上海{name}中考真题',
                         version='回忆版 · 非官方' if subject == 'math' and year == 2025 else '整理版',
                         review={'status': 'pending'}, source={'root': 'download', 'file': filename, 'sha256': digest},
                         questions=[], skipped=[],
                         note='部分原题已导入，题干、答案与解析来自本地整理资料，待教师核对。' +
                              ('语文按资料整组题号编排，整篇阅读及小问一起作答；不冒充官方小题编号。' if subject == 'chinese' else '填空和解答题不自动判分，请对照参考答案订正。'))
            for no, stem in stems.items():
                q = dict(id=f'{paper_id}-q{no:02}', originalNo=no, type='written', stem=stem, review={'status': 'pending'})
                if subject == 'math':
                    entry = transcripts[str(year)]
                    if entry['sourceSha256'] != digest: raise ValueError('Math transcript source changed')
                    checked = entry['questions'].get(str(no))
                    if not checked:
                        paper['skipped'].append(f'{no}: 图形或公式尚未完整核对转录'); continue
                    q.update(checked)
                    q['category'] = '选择题' if q['type'] == 'choice' else '填空题' if no < 19 else '解答题'
                    # The short explanation is the source's own analysis, not a
                    # flattened (and potentially corrupted) equation derivation.
                    answer, explanation = answer_parts(keys.get(no, ''))
                    if q['type'] == 'choice' and answer != q['answer']: raise ValueError('Choice key mismatch')
                    q['explanation'] = safe_math_analysis(explanation)
                    q['explanationNote'] = '仅保留可可靠提取的原资料文字思路；含公式的解析待完整核对转录。'
                else:
                    if no == 6 or year == 2025 and no in (2, 3):
                        paper['skipped'].append(f'{no}: 作文暂不导入' if no == 6 else f'{no}: 加点、波浪线或人物关系图未完整转录'); continue
                    if year == 2023 and no == 2:
                        # q(2) visually checked: the marked words are 绝 and 简.
                        q['stem'] = mark(q['stem'], '绝', 'dot')
                        q['stem'] = mark(q['stem'], '简', 'dot')
                    if year == 2023 and no == 4:
                        q['stem'] = mark(q['stem'], '公交车的报站声把神游的小申拽回到车厢。')
                    if year == 2024 and no == 2:
                        q['stem'] = mark(q['stem'], '苟', 'dot')
                        q['stem'] = mark(q['stem'], '度', 'dot')
                        q['stem'] = mark(q['stem'], '庆历末，妖贼王则盗据甘陵，贾魏公镇北门，仓卒遣将引兵还城，未有破贼之计。')
                    q['answer'], q['explanation'] = answer_parts(keys.get(no, ''))
                    if year == 2025 and no == 5:
                        q['context'] = stems[4]
                        q['contextLabel'] = '本题引用的新闻材料（资料第 4 题，含原小问）'
                    q['category'] = {1: '古诗文默写', 2: '文言文阅读', 3: '现代文阅读', 4: '现代文阅读', 5: '综合运用'}[no]
                paper['questions'].append(q)
            papers.append(paper)
    catalog = {'importedAt': '2026-10-04', 'papers': papers}
    if DEST.exists():
        old = json.loads(DEST.read_text(encoding='utf-8').split('const catalog = ', 1)[1].split(';\n', 1)[0])
        for paper in catalog['papers']:
            previous = next((p for p in old['papers'] if p['id'] == paper['id']), None)
            if previous:
                if paper['source']['sha256'] != previous['source']['sha256']: raise ValueError('Published source changed')
                by_id = {q['id']: q for q in paper['questions']}
                by_id.update({q['id']: q for q in previous['questions']})
                paper['questions'] = sorted(by_id.values(), key=lambda q: q['originalNo'])
                paper['review'] = previous['review']
        known = {paper['id'] for paper in catalog['papers']}
        catalog['papers'].extend(paper for paper in old['papers'] if paper['id'] not in known)
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text('// Generated from checked Shanghai source papers.\n(function(root) {\n  const catalog = ' +
                    json.dumps(catalog, ensure_ascii=False, indent=2) + ';\n' +
                    '  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n' +
                    '  else root.ShanghaiSubjectPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n', encoding='utf-8')
    for paper in papers: print(paper['id'], len(paper['questions']), 'questions;', sum(bool(q.get('answer')) for q in paper['questions']), 'with reference answers')


if __name__ == '__main__':
    if len(sys.argv) != 2: raise SystemExit(__doc__)
    import_papers(Path(sys.argv[1]))
