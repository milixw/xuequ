"""把经多份本地回忆资料核对的2026语文整理内容接入网页，不覆盖已发布题。

Usage: python scripts/apply-shanghai-chinese-recollections.py <下载根目录>
"""
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'content/past-papers/shanghai.js'
TRANSCRIPT = ROOT / 'content/past-papers/chinese-2026-recollections.json'


def main(download):
    text = DATA.read_text(encoding='utf-8')
    catalog = json.loads(text.split('const catalog = ',1)[1].split(';\n',1)[0])
    paper = next(p for p in catalog['papers'] if p['id']=='sh-chinese-2026')
    source = download / paper['source']['file']
    parent = source.parent
    names = [source.name, '上海市初中语文中考真题（考生回忆版）.pdf',
        '2026年上海中考语文真题（完整版）.docx', '2026年上海中考语文真题答案（最全估分版）.docx']
    sources = [dict(file=(parent/name).relative_to(download).as_posix(),
        sha256=hashlib.sha256((parent/name).read_bytes()).hexdigest(), kind='local-recollection') for name in names]
    if sources[0]['sha256'] != paper['source']['sha256']:
        raise ValueError('原回忆解析PDF已改变')
    transcript = json.loads(TRANSCRIPT.read_text(encoding='utf-8'))
    if transcript.get('sources') != sources:
        raise ValueError('核对清单与回忆资料哈希不一致')
    import pdfplumber
    with pdfplumber.open(source) as pdf:
        first = pdf.pages[0].extract_text()
    context = first.split('【甲】',1)[1]
    if '【乙】' not in context or '岂' not in context:
        raise ValueError('甲乙文范围缺失')
    context = '【甲】'+context
    existing = {q['id'] for q in paper['questions']}
    for item in transcript['questions']:
        no=item['group']; qid=f"{paper['id']}-q{no:02}"
        if qid in existing:
            continue
        q=dict(id=qid, originalNo=no, type='written', category=item['category'],
            stem=item['stem'], answer=item['answer'], explanation=None,
            explanationNote=item['explanationNote'], review={'status':'pending'})
        if item.get('context'):
            q.update(context=item['context'], contextLabel=item['contextLabel'])
        if no==2:
            q.update(context=context, contextLabel=item['contextLabel'])
        q['recollectionSources'] = sources
        paper['questions'].append(q)
    paper['questions'].sort(key=lambda q:q['originalNo'])
    paper['version']='多份回忆资料整理版（非官方）'
    paper['note']='部分原题已按回忆资料整理，可练习六组；'+transcript['note']
    paper['skipped']=transcript['missing']
    paper['recollectionSources']=sources
    DATA.write_text(text.split('const catalog = ',1)[0]+'const catalog = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n'+text.split(';\n',1)[1],encoding='utf-8')
    inventory_path=ROOT/'content/past-papers/source-inventory.json'
    inventory=json.loads(inventory_path.read_text(encoding='utf-8'))
    for entry in inventory['sources']:
        if entry.get('paperId')==paper['id']:
            entry.update(status='recollection-compiled-partial', questionCount=len(paper['questions']))
    inventory_path.write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('2026回忆版：六组可作答，缺失小问及版本差异明确保留')


if __name__=='__main__':
    main(Path(sys.argv[1]))
