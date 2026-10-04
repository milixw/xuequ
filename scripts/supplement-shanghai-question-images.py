"""Append missing Shanghai PDF originals as local images, never replace text.
Usage: python scripts/supplement-shanghai-question-images.py <download-root> <netdisk-root>
"""
import hashlib
import json
import logging
import math
from pathlib import Path
import re
import shutil
import subprocess
import sys
import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'content/past-papers/shanghai.js'
IMAGES = ROOT / 'content/past-papers/images'
NUM = re.compile(r'^\s*[−–—]*([1-9]\d?)[.．](?!\d)')
logging.getLogger('pdfminer').setLevel(logging.ERROR)


def locate(pages):
    boundary = None
    source, answers = [], []
    for i, page in enumerate(pages):
        lines = page.extract_text_lines()
        for line in lines:
            if '参考答案' in line['text'] and '中考试卷' in line['text']:
                if boundary is not None: raise ValueError('Multiple answer boundaries')
                boundary = (i, line['top'])
            match = NUM.match(line['text'])
            if match:
                point = dict(no=int(match.group(1)), page=i, top=max(0,line['top']-3))
                (answers if boundary else source).append(point)
    if boundary is None: raise ValueError('No independent answer boundary')
    for points in (source,answers):
        nums=[p['no'] for p in points]
        # Reject formula decimals or duplicated headers masquerading as numbers.
        if not nums or nums != list(range(1,max(nums)+1)):
            raise ValueError('Question numbers not unique and contiguous')
    if [p['no'] for p in source] != [p['no'] for p in answers]:
        raise ValueError('Question and answer numbers differ')
    return source,answers,boundary


def regions(pages,start,end):
    """Full-width crops, sequential page pieces, excluding the answer boundary."""
    result=[]
    for index in range(start['page'],end[0]+1):
        page=pages[index]
        top=start['top'] if index==start['page'] else 48
        bottom=min(page.height-30,end[1] if index==end[0] else page.height-30)
        if bottom-top<4: continue
        # Drop blank continuation pieces and page-tail whitespace. Pattern
        # watermarks/full-page white rectangles are not question content.
        def dark(color):
            if color is None:return True
            if isinstance(color,(int,float)):return color<0.7
            if isinstance(color,(tuple,list)):return bool(color) and max(color)<0.7
            return False
        objects=list(page.chars)+list(page.images)
        objects += [o for kind in ('rect','curve','line') for o in page.objects.get(kind,[])
                    if dark(o.get('stroking_color')) and not isinstance(o.get('non_stroking_color'),str)
                    and not (o.get('bottom',0)<60 and o.get('x1',0)-o.get('x0',0)>page.width*0.8)]
        visible=[o for o in objects if o.get('top',-1)>=top and o.get('bottom',page.height)<=bottom
                 and (o.get('object_type')=='image' or dark(o.get('non_stroking_color')))
                 and o.get('bottom',0)-o.get('top',0)<page.height*0.8]
        if not visible:continue
        bottom=min(bottom,max(o['bottom'] for o in visible)+8)
        result.append((index,[max(0,28),top,page.width-28,bottom]))
    return result


def crop(source,paper_id,no,kind,parts):
    result=[]
    target=IMAGES/paper_id
    target.mkdir(parents=True,exist_ok=True)
    for count,(page,bbox) in enumerate(parts,1):
        name=f'q{no:02}-{kind}-{count:02}'
        output=target/name
        x,y,right,bottom=bbox
        # 144 dpi = 2 pixels per PDF point. Render directly from the original
        # PDF, without editing or resampling diagrams/formulas in another tool.
        px,py=math.floor(x*2),math.floor(y*2)
        width,height=math.ceil(right*2)-px,math.ceil(bottom*2)-py
        subprocess.run(['pdftoppm','-f',str(page+1),'-l',str(page+1),'-singlefile','-r','144',
            '-x',str(px),'-y',str(py),'-W',str(width),'-H',str(height),'-png',str(source),str(output)],
            check=True,capture_output=True)
        result.append(dict(src=(output.with_suffix('.png')).relative_to(ROOT).as_posix(),
            page=page+1,bbox=[round(n,3) for n in bbox],width=width,height=height))
    return result


def choice_answer(text):
    # Only an explicit, sole single-choice answer is automatically scored.
    match=re.search(r'【\s*答\s*案\s*】\s*([A-D])\s*(?=【|\n|$)',text)
    return match.group(1) if match else None


def supplement(paper,path,refresh_images=False):
    published={q['originalNo'] for q in paper['questions']}
    with pdfplumber.open(path) as pdf:
        starts,answers,boundary=locate(pdf.pages)
        count=0
        for index,start in enumerate(starts):
            no=start['no']
            previous=next((q for q in paper['questions'] if q['originalNo']==no),None)
            if no in published and not (refresh_images and previous.get('stemImages')):continue
            end=(starts[index+1]['page'],starts[index+1]['top']) if index+1<len(starts) else boundary
            apart=answers[index]
            aend=(answers[index+1]['page'],answers[index+1]['top']) if index+1<len(answers) else (len(pdf.pages)-1,pdf.pages[-1].height-40)
            stem_parts=regions(pdf.pages,start,end)
            answer_parts=regions(pdf.pages,apart,aend)
            if not stem_parts or not answer_parts: continue
            if previous:
                previous['stemImages']=crop(path,paper['id'],no,'stem',stem_parts)
                previous['answerImages']=crop(path,paper['id'],no,'answer',answer_parts)
                continue
            raw='\n'.join(pdf.pages[p].crop(tuple(box)).extract_text() or '' for p,box in stem_parts)
            answer_text='\n'.join(pdf.pages[p].crop(tuple(box)).extract_text() or '' for p,box in answer_parts)
            # Never treat an unmarked recalled solution as an original answer.
            if not re.search(r'【\s*答\s*案\s*】',answer_text): continue
            letter=choice_answer(answer_text)
            has_four=all(re.search(r'\b'+c+r'[.．]',raw) for c in 'ABCD')
            q=dict(id=paper['id']+f'-q{no:02}',originalNo=no,type='choice' if letter and has_four else 'written',
                category='选择题' if letter and has_four else '原题图片（人工核对）',
                stem='请根据下面的原题图片作答。',answer=letter if letter and has_four else '参考答案与原解析见下方原资料图片。',
                explanation=None,explanationNote='参考答案及原解析保留在答案图片中；未进行教师审核。',
                stemImages=crop(path,paper['id'],no,'stem',stem_parts),
                answerImages=crop(path,paper['id'],no,'answer',answer_parts),review={'status':'pending'})
            if q['type']=='choice': q.update(options=list('ABCD'),optionsInImage=True)
            paper['questions'].append(q); count+=1
        if any(q.get('stemImages') for q in paper['questions']):
            paper['imageSupplement']=dict(sourceSha256=paper['source']['sha256'],
                answerBoundary=dict(page=boundary[0]+1,top=round(boundary[1],3)),
                originalNumbers=[p['no'] for p in starts])
        if count:
            paper['questions'].sort(key=lambda q:q['originalNo'])
            complete={q['originalNo'] for q in paper['questions']}=={p['no'] for p in starts}
            paper['skipped']=[] if complete else ['其余题号未可靠定位或缺原答案，继续待补；图片原题仍待教师审核。']
            paper['note']='原题采用文字与本地图片混合展示，保留原题号、图表、公式及原资料答案；待教师审核。主观题人工订正。'
        return count


def main(roots,refresh_images=False):
    if not shutil.which('pdftoppm'): raise RuntimeError('Poppler pdftoppm required')
    catalog=json.loads(DEST.read_text(encoding='utf-8').split('const catalog = ',1)[1].split(';\n',1)[0])
    entries=[]
    for paper in catalog['papers']:
        source=paper['source']; path=roots[source['root']]/source['file']
        if path.suffix.lower()!='.pdf' or paper['subject']=='chinese': continue
        if hashlib.sha256(path.read_bytes()).hexdigest()!=source['sha256']:
            raise ValueError('Source changed: '+paper['id'])
        try:
            count=supplement(paper,path,refresh_images)
            status='image-supplemented' if any(q.get('stemImages') for q in paper['questions']) else 'no-new-images'
            entries.append(dict(paperId=paper['id'],sha256=source['sha256'],status=status,
                addedThisRun=count,imageQuestions=sum(bool(q.get('stemImages')) for q in paper['questions'])))
            print(paper['id'],count,'added')
        except ValueError as error:
            entries.append(dict(paperId=paper['id'],sha256=source['sha256'],status='pending-manual-crops',reason=str(error)))
            print(paper['id'],'pending:',error)
    DEST.write_text('// Generated from checked Shanghai source papers.\n(function(root) {\n  const catalog = '+json.dumps(catalog,ensure_ascii=False,indent=2)+';\n  if (typeof module !== "undefined" && module.exports) module.exports = catalog;\n  else root.ShanghaiSubjectPapers = catalog;\n})(typeof globalThis !== "undefined" ? globalThis : this);\n',encoding='utf-8')
    (IMAGES.parent/'image-supplement-inventory.json').write_text(json.dumps(dict(entries=entries),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')


if __name__=='__main__':
    if len(sys.argv) not in (3,4) or len(sys.argv)==4 and sys.argv[3]!='--refresh-images':raise SystemExit(__doc__)
    main(dict(download=Path(sys.argv[1]),netdisk=Path(sys.argv[2])),len(sys.argv)==4)
