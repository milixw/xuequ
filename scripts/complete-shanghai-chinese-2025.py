"""补回已核对的2025上海语文第2、3、6组原题；保留已发布内容及ID。

Usage: python scripts/complete-shanghai-chinese-2025.py <原PDF路径>
"""
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import sys

spec = importlib.util.spec_from_file_location('images', Path(__file__).with_name('supplement-shanghai-question-images.py'))
images = importlib.util.module_from_spec(spec)
spec.loader.exec_module(images)


def main(source):
    catalog = json.loads(images.DEST.read_text(encoding='utf-8').split('const catalog = ', 1)[1].split(';\n', 1)[0])
    paper = next(p for p in catalog['papers'] if p['id'] == 'sh-chinese-2025')
    if hashlib.sha256(source.read_bytes()).hexdigest() != paper['source']['sha256']:
        raise ValueError('原PDF与已发布来源哈希不一致')
    with images.pdfplumber.open(source) as pdf:
        starts, answers = [], []
        boundary = None
        for index, page in enumerate(pdf.pages):
            for line in page.extract_text_lines():
                if '2025年上海市中考试卷 参考答案' in line['text']:
                    boundary = (index, line['top'])
                # 分值锚点区分整组题号与答案中的点评编号。
                match = re.match(r'^([1-6])\.\s*（(13|22|21|14|20|60)分）', line['text'])
                if match:
                    (answers if boundary else starts).append(dict(no=int(match[1]), page=index, top=line['top']-3))
        if [p['no'] for p in starts] != list(range(1, 7)) or [p['no'] for p in answers] != list(range(1, 7)):
            raise ValueError('题干/答案编号不完整，拒绝猜测裁切')
        for no, category in [(2, '文言文阅读'), (3, '现代文阅读'), (6, '作文')]:
            if any(q['originalNo'] == no for q in paper['questions']):
                continue
            index = no-1
            start, apart = starts[index], answers[index]
            end = (starts[index+1]['page'], starts[index+1]['top']) if no < 6 else (4, 812)
            if no == 2:
                end = (1, 138)  # 第7小问之后为空白；下方已是现代文阅读标题。
            aend = (answers[index+1]['page'], answers[index+1]['top']) if no < 6 else (len(pdf.pages)-1, pdf.pages[-1].height-40)
            stems = images.regions(pdf.pages, start, end)
            solutions = images.regions(pdf.pages, apart, aend)
            if not stems or not solutions:
                raise ValueError('题干或答案裁图为空')
            paper['questions'].append(dict(
                id=f"{paper['id']}-q{no:02}", originalNo=no, type='written', category=category,
                stem='请根据下面的原资料题图作答，按小问编号填写答案。' if no != 6 else '请根据下面的作文题目与要求写作。',
                answer='原资料参考答案与解析见下方图片。' if no != 6 else '作文没有唯一答案；下方为原资料范文和写作分析，供人工参考。',
                explanation=None, explanationNote='保留原资料标注、人物关系图及跨页小问；参考答案待教师核对。',
                stemImages=images.crop(source, paper['id'], no, 'stem', stems),
                answerImages=images.crop(source, paper['id'], no, 'answer', solutions), review={'status': 'pending'}))
        paper['questions'].sort(key=lambda q: q['originalNo'])
        paper['skipped'] = []
        paper['note'] = '已按本地整理版资料补齐第1—6组题（含全部小问及作文），文字与本地原题图片混合展示；保留资料编号，不冒充官方小题编号。参考答案及作文范文来自原资料，待教师核对。'
        paper['imageSupplement'] = dict(sourceSha256=paper['source']['sha256'], answerBoundary=dict(page=boundary[0]+1, top=round(boundary[1], 3)), originalNumbers=list(range(1, 7)))
    images.DEST.write_text('// Generated from checked Shanghai source papers.\n(function(root) {\n  const catalog = '+json.dumps(catalog, ensure_ascii=False, indent=2)+';\n  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n  else root.ShanghaiSubjectPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n', encoding='utf-8')
    inventory_path = images.DEST.parent / 'source-inventory.json'
    inventory = json.loads(inventory_path.read_text(encoding='utf-8'))
    for entry in inventory['sources']:
        if entry.get('paperId') == paper['id']:
            entry.update(status='source-complete-imported', questionCount=6)
    inventory_path.write_text(json.dumps(inventory, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    image_inventory_path = images.DEST.parent / 'image-supplement-inventory.json'
    image_inventory = json.loads(image_inventory_path.read_text(encoding='utf-8'))
    image_inventory['entries'] = [entry for entry in image_inventory['entries'] if entry['paperId'] != paper['id']]
    image_inventory['entries'].append(dict(paperId=paper['id'], sha256=paper['source']['sha256'], status='image-supplemented', imageQuestions=3))
    image_inventory_path.write_text(json.dumps(image_inventory, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print('sh-chinese-2025: 6组原题已补齐')


if __name__ == '__main__':
    main(Path(sys.argv[1]))
