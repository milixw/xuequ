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
template = r'''<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>语文实词虚词 · 学趣闯关</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f5f7fb;color:#233047;font:16px/1.8 system-ui,sans-serif}main{max-width:820px;margin:auto;padding:16px}a{color:#285cab}header a,.actions a{display:inline-flex;align-items:center;min-height:40px}h1{font-size:25px}h2{font-size:20px}.tabs,.actions{display:flex;gap:12px;flex-wrap:wrap}button{min-height:40px;padding:8px 18px;border:1px solid #aebed5;border-radius:10px;background:white;color:#233047;font:inherit;cursor:pointer}button[aria-pressed="true"]{background:#285cab;color:white}input{width:100%;min-height:44px;font:inherit;padding:10px;border:1px solid #aebed5;border-radius:10px}.sheet,.note{background:white;padding:16px;border-radius:14px;margin:16px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;margin:0}mark{background:#ffe79b} [hidden]{display:none!important}.muted{color:#58677d;font-size:14px}
.usage{border-top:1px solid #e4e9f0;padding:10px 0;overflow-wrap:anywhere}.usage h3{font-size:17px;margin:4px 0}.usage p{margin:4px 0}.function-sheet a{display:inline-flex;min-height:40px;align-items:center;overflow-wrap:anywhere}
</style></head><body><main>
<header><a href="../../index.html#/">‹ 返回首页</a><h1>语文实词虚词</h1></header>
<nav class="tabs" aria-label="资料分类"><button type="button" id="real" aria-pressed="true">实词 · 180 个</button><button type="button" id="function" aria-pressed="false">虚词 · 37 个</button></nav>
<label for="search">查找实词、虚词词条（不搜索释义和例句）</label><input id="search" type="search" placeholder="例如：安、卑、备"><p id="result" role="status"></p><section id="real-panel"><div id="pages">CARDS</div></section>
<section id="function-panel" hidden><p class="muted">基础与拓展用法依据已有速查资料整理，待语文教师审核。部分词也有实词用法，请结合句子判断；拓展词不代表已核实的官方考纲范围。</p><div id="function-entries"></div></section>
<script src="classical-function-words.js?v=20261012"></script>
<script>
'use strict';
const sheets = Array.from(document.querySelectorAll('#real-panel .sheet'));
const originals = sheets.map(sheet => sheet.querySelector('pre').textContent);
const words = originals.map(text => (text.match(/^\s*\d+[．.]\s*([^：:①\s]+)/) || [,''])[1]);
const search = document.getElementById('search');
let activeReal = true;
function element(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function renderFunctionWords(){
  const parent=document.getElementById('function-entries');
  if(typeof ClassicalFunctionWords==='undefined'){parent.textContent='虚词资料暂时无法加载，请刷新重试。';return;}
  for(const [group,label] of [['core','基础用法 · 6 个词'],['extended','拓展辨析 · 31 个词']]){
    const section=element('div',undefined,'function-group');section.appendChild(element('h2',label));
    ClassicalFunctionWords.entries.filter(e=>e.group===group).forEach(entry=>{
      const card=element('article',undefined,'sheet function-sheet');card.dataset.word=entry.word;
      card.appendChild(element('h2',entry.word,'word-head'));
      entry.rows.forEach(row=>{
        const block=element('section',undefined,'usage');
        const offset=row.length===4?1:0;
        block.appendChild(element('h3',row[offset]));
        if(offset)block.appendChild(element('p','读音：'+row[0]));
        block.appendChild(element('p','译法：'+row[offset+1]));
        block.appendChild(element('p','例句：'+row[offset+2]));card.appendChild(block);
      });
      if(entry.note)card.appendChild(element('p',entry.note,'muted'));
      const link=element('a','查看古诗文中的出处 →');link.href='上海中考古诗文·虚实词联动注释版.html#w-'+encodeURIComponent(entry.word);card.appendChild(link);
      section.appendChild(card);
    });parent.appendChild(section);
  }
}
function updateSearch(){
  const term = search.value.trim(); let visible = 0;
  if(activeReal){
    sheets.forEach((sheet,i)=>{
      const text = originals[i], word = words[i]; sheet.hidden = !!term && !word.includes(term);
      const pre = sheet.querySelector('pre'); pre.textContent = '';
      if(!sheet.hidden){visible++; if(!term){pre.textContent=text;return;}
        const start = text.indexOf(word);
        pre.appendChild(document.createTextNode(text.slice(0,start)));
        word.split(term).forEach((part,j)=>{if(j){const mark=document.createElement('mark');mark.textContent=term;pre.appendChild(mark);}pre.appendChild(document.createTextNode(part));});
        pre.appendChild(document.createTextNode(text.slice(start+word.length)));
      }
    });
  }else{
    document.querySelectorAll('.function-sheet').forEach(card=>{
      const word=card.dataset.word;card.hidden=!!term&&!word.includes(term);
      const head=card.querySelector('.word-head');head.textContent='';
      if(!card.hidden){visible++;if(!term){head.textContent=word;return;}
        word.split(term).forEach((part,j)=>{if(j){const mark=element('mark',term);head.appendChild(mark);}head.appendChild(document.createTextNode(part));});
      }
    });
    document.querySelectorAll('.function-group').forEach(group=>{group.hidden=!Array.from(group.querySelectorAll('.function-sheet')).some(card=>!card.hidden);});
  }
  document.getElementById('result').textContent = term ? (visible ? '匹配词条已标亮' : '没有找到相关词条，请换个词') : '';
}
search.addEventListener('input',updateSearch);
function selectTab(real){activeReal=real;document.getElementById('real-panel').hidden=!real;document.getElementById('function-panel').hidden=real;document.getElementById('real').setAttribute('aria-pressed',String(real));document.getElementById('function').setAttribute('aria-pressed',String(!real));search.value='';search.placeholder=real?'例如：安、卑、备':'例如：之、其、为';updateSearch();}
document.getElementById('real').addEventListener('click',()=>selectTab(true));document.getElementById('function').addEventListener('click',()=>selectTab(false));
renderFunctionWords();updateSearch();
</script></main></body></html>'''
(target / 'classical-words.html').write_text(template.replace('PAGECOUNT', str(len(pages))).replace('CARDS', cards), encoding='utf-8')
print(f'已导入 {len(pages)} 页，{sum(map(len, pages))} 字符')
