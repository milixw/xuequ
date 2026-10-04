"""Append Shanghai science originals without altering published questions.
Usage: python scripts/import-shanghai-science-papers.py <download-root> <netdisk-root>
"""
import hashlib
import importlib.util
import json
import logging
from pathlib import Path
import re
import sys
import pdfplumber
from docx import Document

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('existing', ROOT / 'scripts/expand-shanghai-subject-papers.py')
existing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(existing)
NAMES = {'physics': '物理', 'chemistry': '化学'}
NUM = re.compile(r'(?m)^\s*(\d{1,2})[.．、](?!\d)')
BAD = re.compile(r'\[\[image\]\]|EMBED|[\ue000-\uf8ff\ufffd]|如图|下图|图所示|图像|图象|见图|下表|见表|如下表')
logging.getLogger('pdfminer').setLevel(logging.ERROR)


def docx_text(path):
    w = existing.W
    lines = []
    sub = str.maketrans('0123456789+-=()', '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎')
    for paragraph in Document(path).element.body.iter(w + 'p'):
        parts = []
        for run in paragraph.iter(w + 'r'):
            text = ''.join(e.text or '' for e in run.iter(w + 't'))
            align = run.find('.//' + w + 'vertAlign')
            if align is not None and align.get(w + 'val') in ('subscript', 'superscript'):
                if re.fullmatch(r'[0-9+\-=()]+', text):
                    text = text.translate(sub if align.get(w + 'val') == 'subscript' else existing.SUP)
                elif text: text = '[[image]]'
            parts.append(text)
        if any(e.tag.rsplit('}', 1)[-1] in ('oMath', 'oMathPara', 'drawing', 'pict', 'object') for e in paragraph.iter()):
            parts.append('[[image]]')
        lines.append(''.join(parts))
    return '\n'.join(lines)


def clean(text):
    text = existing.clean(text)
    text = re.sub(r'(?m)^.*(?:试题 第\d+页|/g\d+).*$','',text)
    return text.strip()


def blocks(text):
    matches = list(NUM.finditer(text))
    result = {}
    for i, m in enumerate(matches):
        no = int(m.group(1))
        if no in result: raise ValueError('重复原题号')
        result[no] = clean(text[m.end():matches[i+1].start() if i+1<len(matches) else len(text)])
    return result


def parse(text, subject, year, binary=False, pdf=False):
    # Keep inline-answer papers intact; separate answer sections otherwise.
    inline = '【答案】' in text and not re.search(r'中考试卷[^\n]*参考答案', text)
    if inline:
        marker = re.search(r'(?m)^\s*一[、.．].*(?:选择|单选)', text)
        source = text[marker.end():] if marker else text
        answers = None
    else:
        boundary = re.search(r'(?m)^\s*(?:[^\n]*中考试卷[^\n]*参考答案|答案全解全析[^\n]*|参考答案[^\n]*)', text)
        if not boundary: return [], ['未找到明确原答案分界或原题编号']
        source = text[:boundary.start()]
        marker = re.search(r'(?m)^\s*一[、.．].*(?:选择|单选)', source)
        if marker: source = source[marker.end():]
        answers = blocks(text[boundary.end():])
    questions, skipped = [], []
    for no, part in blocks(source).items():
        part = re.split(r'(?m)^\s*[一二三四五六七八九十⼀⼆]+[、.．].*', part)[0].strip()
        if inline:
            pieces = part.split('【答案】',1)
            if len(pieces)!=2: skipped.append(f'{no}: 未找到原答案'); continue
            stem, result = pieces
        else: stem, result = part, answers.get(no, '')
        result = re.sub(r'^\s*[（(]\s*\d+\s*分\s*[）)]\s*', '',result)
        result = re.sub(r'^\s*【答案】\s*|^\s*答案\s*', '', result)
        pieces = re.split(r'【解析】|\n解析\s*', result, maxsplit=1)
        answer = clean(pieces[0])
        explanation = clean(re.split(r'【点评】|\n评析', pieces[1])[0]) if len(pieces)>1 else None
        if not inline and re.match(r'^[A-D](?![A-Za-z])',answer):
            explanation = explanation or clean(answer[1:]) or None
            answer = answer[0]
        stem = re.sub(r'^\s*[（(]\s*\d+\s*分\s*[）)]\s*','',stem).strip()
        # Reject flattened equations/exponents rather than guessing notation.
        unsafe_formula = re.compile(r'[A-Za-z][ \n]*\d|10[ \n]*[−﹣\-]?\d|\d(?:米|厘米|毫米)[23]|高温|═|=\s*(?:[,，;；。]|$)|={2,}')
        if not stem or not answer or BAD.search(stem+answer) or (pdf or binary) and unsafe_formula.search(stem+answer):
            skipped.append(f'{no}: 图、表、公式或答案不能可靠转录'); continue
        options = list(re.finditer(r'([A-D])[.．、]',stem))
        qtype = 'written'; values = None
        if options:
            if [m.group(1) for m in options] != list('ABCD'):
                skipped.append(f'{no}: 选项不完整'); continue
            values = [clean(stem[m.end():options[i+1].start() if i<3 else len(stem)]) for i,m in enumerate(options)]
            stem = clean(stem[:options[0].start()])
            if not all(values): skipped.append(f'{no}: 空选项'); continue
            if re.fullmatch('[A-D]',answer): qtype='choice'
            else:
                # Existing renderer has no multi-choice scoring. Keep options
                # with the full original written question for manual checking.
                stem += '\n' + '\n'.join(f'{chr(65+i)}. {v}' for i,v in enumerate(values))
                values = None
        if explanation and (BAD.search(explanation) or unsafe_formula.search(explanation)):
            explanation = None
        if re.search('见解析|略|见详解', answer) and not explanation:
            skipped.append(f'{no}: 答案依赖未能可靠提取的解析'); continue
        q = dict(id=f'sh-{subject}-{year}-q{no:02}', originalNo=no, type=qtype,
                 category='选择题' if qtype=='choice' else '填空与解答题', stem=stem,
                 answer=answer, explanation=explanation, review={'status':'pending'})
        if values: q['options']=values
        questions.append(q)
    return questions, skipped or ['依赖图文的后续题目待核对']


def discover(roots):
    found = {}
    for label, root in roots:
        for path in sorted(root.rglob('*')):
            if not path.is_file() or path.suffix.lower() not in ('.pdf','.doc','.docx'): continue
            if '上海' not in path.name: continue
            subject = next((s for s,n in NAMES.items() if n in path.name),None)
            if not subject: continue
            year = re.search(r'20\d{2}',path.name)
            if not year:
                # Use nearest dated folder, not the 2013-2024 collection root.
                year = next((re.search(r'^20\d{2}年',p.name) for p in path.parents if re.search(r'^20\d{2}年',p.name)),None)
            if not year: continue
            digest = hashlib.sha256(path.read_bytes()).hexdigest()
            item = found.setdefault(digest,dict(sha256=digest,subject=subject,year=int(year.group()[:4]),paths=[],_path=path))
            item['paths'].append(dict(root=label,file=path.relative_to(root).as_posix()))
    return list(found.values())


def main(roots):
    dest=existing.DEST
    catalog=json.loads(dest.read_text(encoding='utf-8').split('const catalog = ',1)[1].split(';\n',1)[0])
    inventory=discover(roots)
    candidates={}
    for item in inventory:
        path=item['_path']
        try:
            if path.suffix=='.pdf':
                with pdfplumber.open(path) as pdf: text='\n'.join(p.extract_text() or '' for p in pdf.pages)
            else: text=docx_text(path) if path.suffix=='.docx' else existing.read_source(path)
            qs,skipped=parse(text,item['subject'],item['year'],path.suffix=='.doc',path.suffix=='.pdf')
        except Exception as error:
            qs,skipped=[],['格式或题号不能可靠解析: '+type(error).__name__]
        candidates.setdefault((item['subject'],item['year']),[]).append((len(qs),item,qs,skipped))
    for (subject,year),versions in sorted(candidates.items()):
        _,item,qs,skipped=max(versions,key=lambda x:x[0])
        name=item['_path'].name
        paper=dict(id=f'sh-{subject}-{year}',subject=subject,year=year,title=f'{year} 年上海{NAMES[subject]}中考真题',
            version='回忆版 · 非官方' if '回忆' in name else '部分试题 · 整理版' if '部分' in name else '整理版 · 非官方',
            source={**item['paths'][0],'sha256':item['sha256']},review={'status':'pending'},questions=qs,skipped=skipped,
            note='部分原题已导入，保留原答案；图表及公式缺失题待转录、待教师审核。主观题不自动判分。' if qs else '资料已找到，图表、公式或原题号尚未完整转录，暂不能作答。')
        existing.append_questions(catalog['papers'],paper)
    for item in inventory:
        p=next((p for p in catalog['papers'] if p['source']['sha256']==item['sha256']),None)
        item['status']='partial-imported' if p and p['questions'] else 'pending-transcription'
        if p: item.update(paperId=p['id'],questionCount=len(p['questions']))
        del item['_path']
    (dest.parent/'science-source-inventory.json').write_text(json.dumps(dict(scannedAt='2026-10-04',roots=[r for r,_ in roots],sources=inventory),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    dest.write_text('// Generated from checked Shanghai source papers.\n(function(root) {\n  const catalog = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n  else root.ShanghaiSubjectPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n',encoding='utf-8')
    for p in catalog['papers']:
        if p['subject'] in NAMES: print(p['id'],len(p['questions']))
    print('Unique science sources:',len(inventory))


if __name__=='__main__':
    if len(sys.argv)!=3: raise SystemExit(__doc__)
    main([('download',Path(sys.argv[1])),('netdisk',Path(sys.argv[2]))])
