"""整理本地扫描OCR事实字段；原书例句不进入发布数据。"""
import hashlib
import json
import re
import sys
import difflib
from pathlib import Path
from functools import lru_cache

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(sys.argv[1])
OCR=Path(sys.argv[2])
OUT=Path(sys.argv[3]) if len(sys.argv)>3 else ROOT/'content/english/green-vocabulary-candidates.json'
html=(ROOT/'content/english/shanghai-exam-vocabulary.html').read_text(encoding='utf8')
original=json.loads(re.search(r'<script id="data" type="application/json">([\s\S]*?)</script>',html).group(1))
def key(s):return re.sub(r'\s+',' ',s.lower().replace('’',"'").strip())
words={key(w['en']):w for w in original['words']}
aliases={}
for name in words:
    aliases[re.sub('[^a-z]','',name)]=name
    for piece in re.split(r'\s*/\s*',name):aliases.setdefault(re.sub('[^a-z]','',piece),name)
phrases={re.sub('[^a-z]','',key(w['en'])):w['en'] for w in original['phrases']}
lexicon={w for w in words if re.fullmatch('[a-z]+',w)}|{'s','sb','sth','ones','one','somebody','someone','something','doing','dosth','todosth','oneself','dont','didnt','cant','wont','incorrect'}
lexicon|={s.lower() for w in words.values() for s in re.findall('[A-Za-z]+',w.get('forms',''))}
@lru_cache(None)
def segment(s):
    if not s:return []
    if s in lexicon:return [s]
    best=None
    for i in range(1,len(s)+1):
        part=s[:i]
        if part not in lexicon:continue
        tail=segment(s[i:])
        if tail is None:continue
        proposed=[part]+tail
        if best is None or len(proposed)<len(best):best=proposed
    return best
def english(s):
    s=s.replace('…','...').replace('（','(').replace('）',')').replace('，',',').replace('；',';').replace('’',"'")
    if re.sub('[^a-z]','',key(s)) in phrases:return phrases[re.sub('[^a-z]','',key(s))]
    tokens=re.split(r'([A-Za-z]+)',s)
    for i,token in enumerate(tokens):
        if re.fullmatch('[A-Za-z]+',token):
            parts=segment(token.lower())
            if parts:tokens[i]=' '.join(parts)
    s=''.join(tokens)
    s=re.sub(r'\bdosth\b','do sth.',s);s=re.sub(r'\btodosth\b','to do sth.',s)
    s=re.sub(r'\bsth\.{2,}','sth.',s)
    return re.sub(r'\s+',' ',re.sub(r'\.{2,}',' … ',s)).strip(' ;，,')

HEAD=re.compile(r'^[▶►>△]?(\d{1,4})[.．、,]\s*\*?\s*([A-Za-z][A-Za-z() -]*?)/')
POS=re.compile(r'^(.*?)(adj\.|adv\.|vt\.|vi\.|v\.|n\.)\s*(.*)$',re.I)
Chinese=re.compile('[\u4e00-\u9fff]')
entries={}; blocks=[];unmatched=[]; gaps=[];unparsed=[]
current=None
for page in range(6,310):
    file=OCR/f'{page:03}.json'
    if not file.exists():gaps.append(page);continue
    record=json.loads(file.read_text(encoding='utf8'))
    if 251<=page<=286:continue
    for line in record['lines']:
        text=line['text'].strip(); m=HEAD.match(text)
        if page==250 and '二、考纲词组' in text:break
        if m:
            name=key(m.group(2));name=aliases.get(re.sub('[^a-z]','',name),name);base=words.get(name)
            if base:
                current={'word':name,'page':page,'head':text,'lines':[]};blocks.append(current)
            else:unmatched.append({'page':page,'head':text,'name':name});current=None
        elif current:current['lines'].append({**line,'page':page})

def add(entry,name,value):
    if value not in entry[name]:entry[name].append(value)
for block in blocks:
    word=block['word'];e=entries.setdefault(word,dict(pages=[],synonyms=[],antonyms=[],derivatives=[],inflections=[],collocations=[],review={'status':'pending'}))
    if block['page'] not in e['pages']:e['pages'].append(block['page'])
    # 括号内的简单字母词形仅作展示，不改拼写判分答案。
    for form in re.findall(r'[（(]([^）)]+)[）)]',block['head']):
        if re.search('复|过去|分词|比较|最高',form):
            for token in re.findall('[a-z]+',re.sub(r'/[^/]+/','',form)):
                if len(token)>2 and token!=word and token in lexicon:add(e,'inflections',token)
    state=None
    for line in block['lines']:
        text=line['text'];compact=re.sub(r'\s+','',text)
        marker=re.match(r'^(?:[☞☛▶►]?)(近义|同义|反义)(.*)$',compact)
        if marker:
            name='antonyms' if marker.group(1)=='反义' else 'synonyms'
            for piece in re.split('[;；、/]',marker.group(2)):
                raw=re.split('[\u4e00-\u9fff]',piece,1)[0].strip()
                term=english(raw) if re.sub('[^a-z]','',key(raw)) in phrases or ' ' in raw else raw
                if raw and re.fullmatch(r"[A-Za-z '()-]+",term) and len(term)>1:
                    add(e,name,{'en':term,'meaning':''})
            state=None;continue
        if re.search('词形[拓扩]展',compact):state='derivatives';continue
        if '常用词组' in compact or '常用词目' in compact:state='collocations';continue
        if re.search('名师|点拨|点拔|谚语|谚言|易混',text):state=None;continue
        if state=='derivatives':
            match=POS.match(text)
            if match:
                term=key(match.group(1));term=re.sub(r'^[^A-Za-z]+','',term)
                if re.fullmatch(r'[a-z -]+',term) and Chinese.search(match.group(3)):
                    add(e,state,{'en':term,'pos':match.group(2),'meaning':match.group(3)});continue
            if not Chinese.search(text) or len(re.findall(r'[A-Za-z]+',text))>8:state=None
        elif state=='collocations':
            split=Chinese.search(text)
            if split:
                raw=text[:split.start()].strip();meaning=text[split.start():]
                term=english(raw)
                if re.fullmatch(r"[A-Za-z .'()/~-]+",term) and len(term)>2 and len(term.split())<=14:
                    add(e,state,{'en':term,'meaning':meaning});continue
            state=None

# 独立考纲词组部分：只取编号词头和释义，不采集原例句。
book_phrases=[]
for page in range(250,287):
    file=OCR/f'{page:03}.json'
    if not file.exists():gaps.append(page);continue
    for line in json.loads(file.read_text(encoding='utf8'))['lines']:
        text=line['text'];m=re.match(r'^[▶►>]?(\d{1,3})[.．、,]\s*\*?\s*([A-Za-z].*)$',text)
        if not m:continue
        body=m.group(2);split=Chinese.search(body)
        if not split:unparsed.append({'page':page,'text':text});continue
        term=english(body[:split.start()].rstrip(' ('));meaning=body[split.start():]
        term=term.replace('（','(').replace('）',')')
        compact=re.sub('[^a-z]','',key(term))
        close=difflib.get_close_matches(compact,list(phrases),n=1,cutoff=0.89)
        if compact not in phrases and close and len(compact)>5:term=phrases[close[0]]
        if re.fullmatch(r"[A-Za-z .'()/~-]+",term) and len(term.split())<=14:
            book_phrases.append({'en':term,'meaning':meaning,'pages':[page],'confidence':line['confidence'],'sourceNo':int(m.group(1))})
        else:unparsed.append({'page':page,'text':text})
# 词形转换附录：按OCR坐标恢复表格行、词族，不将它们写入拼写判分。
families=[];family=[];last_word=None
for page in range(330,356):
    file=OCR/f'{page:03}.json'
    if not file.exists():gaps.append(page);continue
    record=json.loads(file.read_text(encoding='utf8'));width=record['width']
    lines=record['lines']
    for line in lines:
        raw=line['text'].strip();x=sum(p[0] for p in line['box'])/4/width;y=sum(p[1] for p in line['box'])/4
        left=min(p[0] for p in line['box'])/width
        if not re.fullmatch(r'[A-Za-z-]+',raw) or not .12<left<.30:continue
        relatives=[l for l in lines if abs(sum(p[1] for p in l['box'])/4-y)<22]
        number=next((l for l in relatives if max(p[0] for p in l['box'])/width<left-.006 and re.fullmatch(r'\d{1,3}',l['text'])),None)
        if number:
            if family:families.append(family)
            family=[]
        pos=next((l['text'].lower() for l in relatives if .28<min(p[0] for p in l['box'])/width<.44 and re.fullmatch(r'[a-zA-Z./]+',l['text'])),None)
        meaning=''.join(l['text'] for l in relatives if min(p[0] for p in l['box'])/width>.44 and Chinese.search(l['text']))
        if pos and meaning:family.append({'en':raw,'pos':pos,'meaning':meaning,'page':page})
if family:families.append(family)
for family in families:
    if len(family)>8:continue
    for member in family:
        name=aliases.get(re.sub('[^a-z]','',key(member['en'])),key(member['en']))
        if name not in words:continue
        e=entries.setdefault(name,dict(pages=[],synonyms=[],antonyms=[],derivatives=[],inflections=[],collocations=[],review={'status':'pending'}))
        for relative in family:
            if key(relative['en'])==key(member['en']):continue
            # 无法对上可靠英文词形的OCR串留给人工核对，不显示给学生。
            if key(relative['en']) not in lexicon:continue
            add(e,'derivatives',{k:relative[k] for k in ['en','pos','meaning']})
        for item in family:
            if item['page'] not in e['pages']:e['pages'].append(item['page'])
audit={'ocrPages':len(list(OCR.glob('*.json'))),'gaps':sorted(set(gaps)),'matchedBlocks':len(blocks),'matchedWords':len(entries),'unmatchedHeads':unmatched,'unparsedPhrases':unparsed,'appendixFamilies':len(families)}
data={'source':{'file':SOURCE.name,'sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'pdfPages':368},'review':{'status':'pending'},'entries':entries,'phrases':book_phrases,'audit':audit}
OUT.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'matched':len(entries),'synonyms':sum(bool(e['synonyms']) for e in entries.values()),'antonyms':sum(bool(e['antonyms']) for e in entries.values()),'derivatives':sum(bool(e['derivatives']) for e in entries.values()),'collocations':sum(bool(e['collocations']) for e in entries.values()),'phrases':len(book_phrases),'unmatched':len(unmatched),'gaps':len(set(gaps))},ensure_ascii=False))
