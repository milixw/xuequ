"""按逐页核对的裁切清单追加上海语文缺题，保留已发布题目。

Usage: python scripts/complete-shanghai-chinese-papers.py <下载根目录> <临时转换PDF目录>
旧 Word 文件须先复制到临时目录，以 <年份>.pdf 导出，原文件不修改。
"""
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
from PIL import Image
import numpy as np

spec = importlib.util.spec_from_file_location('images', Path(__file__).with_name('supplement-shanghai-question-images.py'))
images = importlib.util.module_from_spec(spec)
spec.loader.exec_module(images)
MANIFEST = images.DEST.parent / 'chinese-completion-crops.json'


def regions(pdf, start, end, source, raster_dir):
    # 坐标为一基页号、PDF点。每组止于下一题/原答案前，保留跨页图表。
    end = end or [len(pdf.pages), pdf.pages[-1].height-35]
    parts = []
    for index in range(start[0]-1, end[0]):
        page = pdf.pages[index]
        top = start[1]-2 if index == start[0]-1 else 48
        # 原整理PDF的正文最末行可到页底812点，页码从817点开始。
        bottom = min(page.height-25, end[1]-2 if index == end[0]-1 else page.height-25)
        if bottom <= top:
            continue
        # 旧Word导出的部分字体文字框与实际笔画有偏移，边缘对齐原渲染的空白行。
        raster = raster_dir / (source.stem+f'-page{index+1}.png')
        if not raster.exists():
            subprocess.run(['pdftoppm','-f',str(index+1),'-l',str(index+1),'-r','144',
                '-singlefile','-png',str(source),str(raster.with_suffix(''))],check=True,capture_output=True)
        pixels = np.asarray(Image.open(raster).convert('L'))
        rows = (pixels[:,56:-56] < 120).sum(axis=1)
        def snap(value):
            center = round(value*2)
            candidates = [n for n in range(max(0,center-24),min(len(rows),center+25)) if rows[n] <= 2]
            return min(candidates,key=lambda n:abs(n-center))/2 if candidates else value
        if index == start[0]-1:
            top = snap(top)
        bottom = snap(bottom)
        box = [28, top, page.width-28, bottom]
        if not (page.crop(tuple(box)).extract_text() or '').strip() and not any(
                top <= im['top'] and im['bottom'] <= bottom for im in page.images):
            continue
        parts.append((index, box))
    return parts


def main(download, converted, refresh=False):
    text = images.DEST.read_text(encoding='utf-8')
    catalog = json.loads(text.split('const catalog = ', 1)[1].split(';\n', 1)[0])
    crops = json.loads(MANIFEST.read_text(encoding='utf-8'))
    inventory_path = images.DEST.parent / 'source-inventory.json'
    inventory = json.loads(inventory_path.read_text(encoding='utf-8'))
    image_inventory_path = images.DEST.parent / 'image-supplement-inventory.json'
    image_inventory = json.loads(image_inventory_path.read_text(encoding='utf-8'))
    added = 0
    raster_dir = converted / 'crop-qa'
    raster_dir.mkdir(parents=True, exist_ok=True)
    for year, record in crops.items():
        paper = next(p for p in catalog['papers'] if p['id'] == 'sh-chinese-'+year)
        source = download / paper['source']['file']
        source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
        if source_hash != paper['source']['sha256']:
            raise ValueError('原资料变化：'+year)
        pdf_path = source if source.suffix.lower() == '.pdf' else converted / (year+'.pdf')
        pdf_hash = hashlib.sha256(pdf_path.read_bytes()).hexdigest()
        if record['sourceSha256'] != source_hash or record['renderedSha256'] != pdf_hash:
            raise ValueError('裁切清单与已核对来源/转换PDF不一致：'+year)
        with images.pdfplumber.open(pdf_path) as pdf:
            for first, last, start, end, astart, aend in record['groups']:
                previous = next((q for q in paper['questions'] if q['originalNo'] == first), None)
                if previous and previous.get('textSource'):
                    continue
                if previous and not refresh:
                    continue
                stem_parts = regions(pdf, start, end, pdf_path, raster_dir)
                raw = '\n'.join(pdf.pages[i].crop(tuple(box)).extract_text() or '' for i, box in stem_parts)
                if re.search(r'【答案】|答案全解全析|参考答案', raw):
                    raise ValueError(f'题图含答案：{year}-{first}')
                if previous:
                    previous['stemImages'] = images.crop(pdf_path, paper['id'], first, 'stem', stem_parts)
                    previous['answerImages'] = images.crop(pdf_path, paper['id'], first, 'answer', regions(pdf, astart, aend, pdf_path, raster_dir)) if astart else []
                    previous['imageSource']['answerBoundary'] = dict(page=stem_parts[-1][0]+1, top=stem_parts[-1][1][3])
                    continue
                composition = first == record['total']
                q = dict(id=f"{paper['id']}-q{first:02}", originalNo=first,
                    originalNumbers=list(range(first, last+1)), type='written',
                    category='作文' if composition else '阅读与综合运用（原题图片）',
                    stem='请根据下面的原资料题图作答，按小问编号填写答案。' if not composition else '请根据下面的作文题目与要求写作。',
                    answer='原资料参考答案见下方图片，按小问编号人工核对。' if not composition else '作文没有唯一答案；原资料写作指导或范文仅供参考，由教师人工评阅。',
                    explanation=None, explanationNote='原题标注、配图与跨页内容均保留；原资料仍待教师审核。',
                    stemImages=images.crop(pdf_path, paper['id'], first, 'stem', stem_parts),
                    answerImages=images.crop(pdf_path, paper['id'], first, 'answer', regions(pdf, astart, aend, pdf_path, raster_dir)) if astart else [],
                    imageSource=dict(sourceSha256=source_hash, renderedSha256=pdf_hash,
                        answerBoundary=dict(page=stem_parts[-1][0]+1, top=stem_parts[-1][1][3])), review={'status':'pending'})
                if not astart:
                    if not composition:
                        raise ValueError('非作文题缺原答案')
                    q['answer'] = '作文没有唯一答案。原资料未提供本题范文或写作指导，请按题目要求请教师人工评阅。'
                    q['answerSource'] = {'kind':'no-unique-answer', 'originalAnswer':None}
                if year == '2016' and first == 8:
                    q['explanationNote'] += '原资料将第10题误印为第9题，依阅读组“第8—10题”和原答案第10题核对；图片保留原误印。'
                paper['questions'].append(q)
                added += 1
            paper['questions'].sort(key=lambda q:q['originalNo'])
            coverage = sorted(n for q in paper['questions'] for n in q.get('originalNumbers', [q['originalNo']]))
            if coverage != list(range(1, record['total']+1)):
                raise ValueError('题号覆盖不完整或重复：'+year)
            paper['skipped'] = []
            paper['note'] = '已按本地整理版资料补齐全部题号、阅读小问及作文，文字与本地原题图片混合展示；保留原资料编号及配图标注，主观题人工订正，参考答案待教师核对。'
            paper['imageSupplement'] = dict(sourceSha256=source_hash,
                originalNumbers=list(range(1, record['total']+1)))
            if 'boundary' in record:
                paper['imageSupplement']['answerBoundary'] = dict(page=record['boundary'][0], top=record['boundary'][1])
        for entry in inventory['sources']:
            if entry.get('paperId') == paper['id']:
                entry.update(status='source-complete-imported', questionCount=len(paper['questions']))
        image_inventory['entries'] = [entry for entry in image_inventory['entries'] if entry['paperId'] != paper['id']]
        image_inventory['entries'].append(dict(paperId=paper['id'], sha256=source_hash,
            status='image-supplemented', imageQuestions=sum(bool(q.get('stemImages')) for q in paper['questions']), renderedSha256=pdf_hash))
        print(year, len(paper['questions']), 'groups complete')
    images.DEST.write_text(text.split('const catalog = ',1)[0]+'const catalog = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n'+text.split(';\n',1)[1],encoding='utf-8')
    inventory_path.write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    image_inventory_path.write_text(json.dumps(image_inventory,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(added, 'groups added')


if __name__ == '__main__':
    main(Path(sys.argv[1]), Path(sys.argv[2]), '--refresh-images' in sys.argv[3:])
