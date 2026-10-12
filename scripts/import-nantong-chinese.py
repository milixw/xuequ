"""导入已核对的南通本地整理卷；旧 DOC 先在临时目录转换 DOCX。"""
import hashlib
import io
import json
import re
import sys
from pathlib import Path
from zipfile import ZipFile
from docx import Document
from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
GROUPS = {
    2013: [(4,29),(30,42),(42,64),(64,83),(83,111),(111,121)],
    2014: [(2,23),(24,33),(33,53),(53,78),(78,105),(105,111)],
    2015: [(8,32),(33,43),(43,67),(67,101),(101,130),(130,175)],
    2018: [(4,30),(30,41),(41,57),(57,95),(95,124),(124,164),(164,None)],
    2019: [(3,59),(59,71),(71,86),(86,90),(90,122),(122,158),(158,206),(206,239),(239,None)],
}

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def write_image(blob, year, group, role, number, page=1, crop=None):
    im = Image.open(io.BytesIO(blob)).convert('RGB')
    original_size = im.size
    if crop: im = im.crop(crop)
    relative = f'content/past-papers/images/nt-chinese-{year}/q{group:02}-{role}-{number:02}.png'
    path = ROOT / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path)
    return dict(src=relative, page=page, width=im.width, height=im.height,
                bbox=list(crop or (0,0,*original_size)), coordinateUnit='source-pixel')

def paragraph(doc, p, index, year, blobs):
    parts = []
    for run in p.iter(W+'r'):
        text = ''.join(e.text or '' for e in run.iter(W+'t'))
        text = re.sub(r'[\x00-\x08\x0b-\x1f]', '', text)
        underline = run.find('.//'+W+'u')
        emphasis = run.find('.//'+W+'em')
        if text and underline is not None and underline.get(W+'val') != 'none':
            marker = 'wave' if underline.get(W+'val') in ('wave','doubleWave') else 'u'
            text = f'[[{marker}]]{text}[[/{marker}]]'
        elif text and emphasis is not None and emphasis.get(W+'val') in ('dot','underDot'):
            text = f'[[dot]]{text}[[/dot]]'
        parts.append(text)
        for blip in run.iter():
            if blip.tag.endswith('}blip'):
                rid = blip.get(R+'embed')
                if not rid: continue
                blob = doc.part.related_parts[rid].blob
                try: size = Image.open(io.BytesIO(blob)).size
                except Exception: raise ValueError('原图格式需核对：'+rid)
                # 已逐图确认这些 324x36 图只是学科网水印。
                if size == (324,36): continue
                token = f'{{{{image:{len(blobs)}}}}}'
                blobs.append((blob,index)); parts.append(token)
    return ''.join(parts)

def read_lines(doc, year):
    lines, blobs = [], []
    index = -1
    for element in doc.element.body:
        if element.tag == W+'p':
            index += 1
            lines.append((index, paragraph(doc,element,index,year,blobs)))
        elif element.tag == W+'tbl':
            for row in element.findall(W+'tr'):
                cells = [' / '.join(paragraph(doc,p,index,year,blobs) for p in cell.iter(W+'p')) for cell in row.findall(W+'tc')]
                lines.append((index,' | '.join(cells)))
    return lines, blobs

def material(lines, start, end):
    return '\n'.join(t for i,t in lines if i >= start and (end is None or i < end)).strip()

def images(text, blobs, year, group, role):
    result = []
    def replace(match):
        blob, p = blobs[int(match.group(1))]
        result.append(write_image(blob,year,group,role,len(result)+1))
        result[-1]['sourceParagraph'] = p
        return f'（原图 {len(result)}，见本题下方）'
    return re.sub(r'\{\{image:(\d+)\}\}', replace, text), result

def question(year, no, stem, answer='', stem_images=None, answer_images=None):
    return dict(id=f'nt-chinese-{year}-q{no:02}',originalNo=no,type='written',category='整组阅读与作答',
                stem=stem,answer=answer,stemImages=stem_images or [],answerImages=answer_images or [],
                answerSource={'kind':'local-reference' if answer or answer_images else 'not-provided'},review={'status':'pending'})

def import_word(path, converted):
    year = int(path.name[:4]); file = next(converted.glob(f'{year}*.docx'))
    doc = Document(file); lines, blobs = read_lines(doc,year)
    if year in (2014,2015):
        answer_text = material(lines,112 if year==2014 else 177,None)
        matches = list(re.finditer(r'(?m)^\s*(\d+)[.．]',answer_text))
        answers = {int(m.group(1)):answer_text[m.start():matches[i+1].start() if i+1<len(matches) else len(answer_text)] for i,m in enumerate(matches)}
    result = []
    ranges = [range(1,6),range(6,8),range(8,13),range(13,17),range(17,22),range(22,23)]
    for no,(start,end) in enumerate(GROUPS[year],1):
        stem = material(lines,start,end); answer = ''
        if year in (2014,2015):
            answer = '\n'.join(answers.get(n,f'{n}：原资料答案待补充') for n in ranges[no-1])
        elif year in (2018,2019):
            if year==2019 and no==1:
                stem = '\n'.join(material(lines,a,b) for a,b in [(3,7),(11,13),(52,54)])
                answer = '\n'.join(material(lines,a,b) for a,b in [(7,11),(13,52),(54,59)])
            else:
                marker = re.search(r'【答案】|【写作指导】',stem)
                if not marker: raise ValueError(f'{year} 第{no}组没有答案分界')
                answer, stem = stem[marker.start():], stem[:marker.start()]
        stem, si = images(stem,blobs,year,no,'stem')
        answer, ai = images(answer,blobs,year,no,'answer')
        if year==2013:
            ai = [write_image(blob,year,1,'answer',i+1) for i,(blob,p) in enumerate((b,p) for b,p in blobs if p==121)]
            answer = '见下方原资料整卷参考答案照片，请按原题号核对。'
        if not stem.strip(): raise ValueError('空题组')
        result.append(question(year,no,stem,answer,si,ai))
    return result, sha(file)

def main(source_dir, converted):
    output = ROOT/'content/past-papers/nantong-chinese.js'
    if output.exists(): raise ValueError('数据已存在，拒绝覆盖已发布题目')
    papers = []
    for path in sorted(source_dir.glob('*南通*')):
        year = int(path.name[:4]); skipped = []
        if path.suffix=='.doc':
            questions, converted_hash = import_word(path,converted)
        elif year==2020:
            z=ZipFile(path); si=[]; ai=[]
            for i in range(1,11):
                blob=z.read(f'word/media/image{i}.png')
                if i<7: si.append(write_image(blob,year,1,'stem',i,page=i))
                elif i==7:
                    size=Image.open(io.BytesIO(blob)).size
                    si.append(write_image(blob,year,1,'stem',7,page=7,crop=(0,0,size[0],1340)))
                    ai.append(write_image(blob,year,1,'answer',1,page=7,crop=(0,1340,*size)))
                else: ai.append(write_image(blob,year,1,'answer',i-6,page=i))
            questions=[question(year,1,'以下为原资料整卷题图（含第1～22题及作文），按原题号作答。','见下方原资料参考答案。',si,ai)]
            converted_hash=None
        elif year==2023:
            si=[]
            for i in range(1,len(PdfReader(path).pages)+1):
                png=converted/f'2023-page-{i}.png'
                si.append(write_image(png.read_bytes(),year,1,'stem',i,page=i))
            questions=[question(year,1,'以下为原资料整卷题图（含第1～22题及作文），按原题号作答。','原目录只提供题卷，未附参考答案。请由老师人工评阅。',si)]
            questions[0]['answerSource']={'kind':'not-provided'}
            skipped=['原资料未附参考答案，不自动判分。']; converted_hash=None
        else: raise ValueError('尚未核对的年份')
        papers.append(dict(id=f'nt-chinese-{year}',subject='chinese',year=year,title=f'{year}年江苏南通语文中考真题',
            version='本地整理版 · 非官方',note='保留原资料题干与标注。题组号为本地整理组号，不替代原卷小题号。所有题目人工核对。',
            source=dict(file=path.name,sha256=sha(path),convertedSha256=converted_hash,kind='local-exam-compilation',
                        groups=GROUPS.get(year),coordinateNote='图片 bbox 使用原图片像素；Word 图片记录原转换文件段落索引'),
            review={'status':'pending'},questions=questions,skipped=skipped))
    output.write_text('/* 用户提供的南通整理卷，待教师审核。 */\n(function(root){\n  const data = '+json.dumps({'region':'江苏南通','papers':papers},ensure_ascii=False,indent=2)+';\n  if (typeof module !== "undefined" && module.exports) module.exports = data;\n  else root.NantongChinesePapers = data;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n',encoding='utf8')
    print([(p['year'],len(p['questions'])) for p in papers])

if __name__=='__main__': main(Path(sys.argv[1]),Path(sys.argv[2]))
