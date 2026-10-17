"""从已有范围速查表整理虚词数据，不执行来源 HTML 中的脚本。"""
import html
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / 'content/chinese/上海中考文言虚实词范围速查表.html'
text = source.read_text(encoding='utf8')

def plain(value):
    return html.unescape(re.sub(r'<[^>]+>', '', re.sub(r'<br\s*/?>', '；', value))).strip()

def table(value):
    raw = re.search(r'<table\b[^>]*>([\s\S]*?)</table>', value).group(1)
    headers = [plain(s) for s in re.findall(r'<th\b[^>]*>([\s\S]*?)</th>', raw)]
    rows = [[plain(s) for s in re.findall(r'<td\b[^>]*>([\s\S]*?)</td>', row)]
            for row in re.findall(r'<tr\b[^>]*>([\s\S]*?)</tr>', raw)]
    rows = [row for row in rows if row]
    if not rows or any(len(row) != len(headers) for row in rows): raise ValueError('表格列数不一致')
    return headers, rows

entries = []
core = text[text.index('<h2>二、6 个虚词'):text.index('<h2>三、')]
for match in re.finditer(r'<h3>\d+\.\s*([^<]+)</h3>([\s\S]*?)(?=<h3>|$)', core):
    name = match.group(1).strip()
    headers, rows = table(match.group(2))
    entries.append(dict(word=name,group='core',headers=headers,rows=rows,review={'status':'pending'}))
starts = list(re.finditer(r'<div class="xcard">', text))
for i, match in enumerate(starts):
    block = text[match.start():starts[i+1].start() if i+1 < len(starts) else len(text)]
    name = plain(re.search(r'<span class="xw">([\s\S]*?)</span>',block).group(1))
    headers, rows = table(block)
    note = re.search(r'<div class="pyn">([\s\S]*?)</div>', block)
    entries.append(dict(word=name,group='extended',headers=headers,rows=rows,
                        note=plain(note.group(1)) if note else '',review={'status':'pending'}))
if [e['word'] for e in entries[:6]] != ['之','其','而','以','何','于'] or len(entries)!=37:
    raise ValueError('词条范围应为6个基础词及31个拓展词')
if len({e['word'] for e in entries}) != len(entries): raise ValueError('重复词名')
data = dict(source=source.name,review={'status':'pending'},entries=entries)
out = root / 'content/chinese/classical-function-words.js'
out.write_text('(function(root){\n  const data = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n  if(typeof module!=="undefined" && module.exports) module.exports=data;\n  else root.ClassicalFunctionWords=data;\n})(typeof globalThis!=="undefined" ? globalThis : this);\n',encoding='utf8')
print(f'整理 {len(entries)} 个词，{sum(len(e["rows"]) for e in entries)} 个用法')
