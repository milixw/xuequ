"""把用户提供的实词 PDF 转成离线可搜索的资料页（保留原文）。"""
import html
import re
import shutil
import sys
from pathlib import Path
from pypdf import PdfReader

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'content' / 'chinese'
target.mkdir(exist_ok=True)
reader = PdfReader(source)
pages = [page.extract_text() or '' for page in reader.pages]
pages = [re.sub(r'第\s*\d+\s*/\s*\d+\s*页', '', text).strip() for text in pages]
if not all(text.strip() for text in pages):
    raise ValueError('PDF 有无法提取文字的页面，请先核对原件')
text = '\n'.join(pages)
starts = list(re.finditer(r'(?m)^\s*(\d{1,3})[．.]', text))
if [int(match.group(1)) for match in starts] != list(range(1, 181)):
    raise ValueError('实词编号必须完整且按顺序包含 1～180')
entries = [text[match.start():starts[i + 1].start() if i + 1 < len(starts) else len(text)].strip()
           for i, match in enumerate(starts)]
shutil.copyfile(source, target / 'classical-words.pdf')
cards = ''.join(f'<article class="sheet" id="word-{i}"><pre>{html.escape(entry)}</pre></article>' for i, entry in enumerate(entries, 1))
template = '''<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>语文实词虚词 · 学趣闯关</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f5f7fb;color:#233047;font:16px/1.8 system-ui,sans-serif}main{max-width:820px;margin:auto;padding:16px}a{color:#285cab}header a,.actions a{display:inline-flex;align-items:center;min-height:40px}h1{font-size:25px}h2{font-size:20px}.tabs,.actions{display:flex;gap:12px;flex-wrap:wrap}button{min-height:40px;padding:8px 18px;border:1px solid #aebed5;border-radius:10px;background:white;color:#233047;font:inherit;cursor:pointer}button[aria-pressed="true"]{background:#285cab;color:white}input{width:100%;min-height:44px;font:inherit;padding:10px;border:1px solid #aebed5;border-radius:10px}.sheet,.note{background:white;padding:16px;border-radius:14px;margin:16px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;margin:0}mark{background:#ffe79b} [hidden]{display:none!important}.muted{color:#58677d;font-size:14px}
</style></head><body><main>
<header><a href="../../index.html#/">‹ 返回首页</a><h1>语文实词虚词</h1></header>
<nav class="tabs" aria-label="资料分类"><button type="button" id="real" aria-pressed="true">实词 · 180 个</button><button type="button" id="function" aria-pressed="false">虚词</button></nav>
<section id="real-panel">
<label for="search">查找实词、词义或例句</label><input id="search" type="search" placeholder="例如：安、所以、得到"><p id="result" role="status"></p><div id="pages">CARDS</div></section>
<section id="function-panel" hidden><div class="note"><h2>虚词资料待补充</h2></div></section>
<script>
'use strict';
const sheets = Array.from(document.querySelectorAll('.sheet'));
const originals = sheets.map(sheet => sheet.querySelector('pre').textContent);
const search = document.getElementById('search');
function updateSearch(){
  const term = search.value.trim(); let visible = 0;
  sheets.forEach((sheet,i)=>{
    const text = originals[i]; sheet.hidden = !!term && !text.includes(term);
    const pre = sheet.querySelector('pre'); pre.textContent = '';
    if(!sheet.hidden){visible++; if(!term){pre.textContent=text;return;}
      text.split(term).forEach((part,j)=>{if(j){const mark=document.createElement('mark');mark.textContent=term;pre.appendChild(mark);}pre.appendChild(document.createTextNode(part));});
    }
  });
  document.getElementById('result').textContent = term ? (visible ? '匹配文字已标亮' : '没有找到相关内容，请换个关键词') : '';
}
search.addEventListener('input',updateSearch);updateSearch();
function selectTab(real){document.getElementById('real-panel').hidden=!real;document.getElementById('function-panel').hidden=real;document.getElementById('real').setAttribute('aria-pressed',String(real));document.getElementById('function').setAttribute('aria-pressed',String(!real));}
document.getElementById('real').addEventListener('click',()=>selectTab(true));document.getElementById('function').addEventListener('click',()=>selectTab(false));
</script></main></body></html>'''
(target / 'classical-words.html').write_text(template.replace('PAGECOUNT', str(len(pages))).replace('CARDS', cards), encoding='utf-8')
print(f'已导入 {len(pages)} 页，{sum(map(len, pages))} 字符')
