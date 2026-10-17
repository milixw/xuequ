'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');
const candidate=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const html=fs.readFileSync(path.join(root,'content/english/shanghai-exam-vocabulary.html'),'utf8');
const base=JSON.parse(html.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const key=s=>String(s).trim().toLowerCase().replace(/\s+/g,' ');
const compact=s=>key(s).replace(/[^a-z]/g,'');
const dictionary=new Map(base.words.map(w=>[key(w.en),w]));
const vocabulary=new Set(base.words.flatMap(w=>[w.en,...w.en.split(/\s*\/\s*/),...w.forms.split(/[,;]/)]).map(s=>key(s)).filter(s=>/^[a-z]+$/.test(s)));
const extra=require('../content/english/vocabulary-original-extras.js');
const oldExamples=require('../content/english/vocabulary-examples.js');
const wordVolume={};vm.runInNewContext(fs.readFileSync(path.join(root,'content/english/words/sh2022-g6s1.js'),'utf8'),{Words:{volume(v){wordVolume[v.id]=v;}}});
const examples={};
function addExample(word,en,zh){const list=examples[key(word)]||(examples[key(word)]=[]);if(en&&zh&&!list.some(x=>x.en===en)&&list.length<2)list.push({en,zh,review:{status:'pending'}});}
for(const [word,pair] of Object.entries(oldExamples.entries))addExample(word,...pair);
for(const v of Object.values(wordVolume))for(const unit of v.units)for(const w of unit.words)for(const ex of w.ex||[])addExample(w.w,ex.en.replace(/\[\[([^\]]+)\]\]/g,'$1'),ex.zh);
for(const [word,pair] of Object.entries(extra.entries))addExample(word,...pair);
for(const name of ['unable','enable','disable','disabled','unhappy','happily','happiness','impolite','impossible','incorrect','relaxed','relaxing','actress','carelessness','carelessly','helpless','hopeless','hopeful','disagree','disadvantage','unnecessary','uncomfortable'])vocabulary.add(name);
const phraseLookup=new Map(base.phrases.map(p=>[compact(p.en),p]));
const corrections={
  'afera':'after all','akt':'at least / most','bccnecldtowith':'be connected to / with','r in':'fill in','iistento':'listen to','ake place':'take place','to.o':'too … to','socialstudy':'social studies','soc ial study':'social studies','at the end of':'at the end of (August)',
  'so that (':'so that','turn down/up (':'turn down / up',
};
const normalized=s=>String(s).replace(/(?:\.|·|…){2,}/g,'……').replace(/·+/g,'……').replace(/\s+/g,' ').trim();
const safeEnglish=s=>/^[A-Za-z][A-Za-z\s.'()\-/…]*$/.test(s);
function validWords(s){return s.replace(/\b(?:sb|sth)\./g,'').replace(/[().'\-/…]/g,' ').split(/\s+/).filter(Boolean).every(t=>vocabulary.has(key(t))||['sb','sth','ones','one','to','do','doing','of','with','for','the','a','an','in','on','at','be','get','have','it'].includes(key(t)));}
const excluded={relations:[],derivatives:[],collocations:[],phrases:[]};
const entries={};
for(const [word,item] of Object.entries(candidate.entries)){
  if(!dictionary.has(word))continue;
  const e={pages:item.pages,synonyms:[],antonyms:[],derivatives:[],inflections:[],collocations:[],examples:examples[word]||[],review:{status:'pending'}};
  for(const type of ['synonyms','antonyms'])for(const x of item[type]){
    if(safeEnglish(x.en)&&validWords(x.en)&&key(x.en)!==word)e[type].push({en:x.en,meaning:x.meaning||''});
    else excluded.relations.push({word,type,value:x.en,pages:item.pages});
  }
  for(const x of item.derivatives){
    if(safeEnglish(x.en)&&vocabulary.has(key(x.en))&&key(x.en)!==word)e.derivatives.push({en:x.en,pos:x.pos.replace('n.v.','n./v.'),meaning:normalized(x.meaning)});
    else excluded.derivatives.push({word,value:x.en,pages:item.pages});
  }
  e.inflections=Array.from(new Set([...item.inflections,...dictionary.get(word).forms.split(/[,;]/).map(s=>s.trim())].filter(s=>/^[A-Za-z-]+$/.test(s))));
  for(const x of item.collocations){
    let en=x.en.replace(/\.\./g,'.');
    if(safeEnglish(en)&&validWords(en))e.collocations.push({en,meaning:normalized(x.meaning)});
    else excluded.collocations.push({word,value:en,pages:item.pages});
  }
  if(['synonyms','antonyms','derivatives','inflections','collocations','examples'].some(k=>e[k].length))entries[word]=e;
}
const senses={right:{wrong:'正确 ↔ 错误',incorrect:'正确 ↔ 不正确',left:'右边 ↔ 左边'},light:{heavy:'轻 ↔ 重',dark:'明亮 ↔ 黑暗'},hard:{soft:'坚硬 ↔ 柔软',easy:'困难 ↔ 容易'},old:{new:'旧 ↔ 新',young:'年老 ↔ 年轻'},free:{busy:'空闲 ↔ 忙碌'},advice:{opinion:'建议性的意见，不能代替所有 opinion 用法',suggestion:'建议；advice 不可数，suggestion 可数'}};
for(const [word,labels] of Object.entries(senses))if(entries[word])for(const type of ['synonyms','antonyms'])for(const x of entries[word][type])if(labels[key(x.en)])x.meaning=labels[key(x.en)];
for(const [word,list] of Object.entries(examples))if(dictionary.has(word)&&!entries[word])entries[word]={pages:[],synonyms:[],antonyms:[],derivatives:[],inflections:[],collocations:[],examples:list,review:{status:'pending'}};
const phrases=[];const seen=new Set();
for(const item of candidate.phrases){
  let en=corrections[item.en]||corrections[compact(item.en)]||item.en;
  const known=phraseLookup.get(compact(en));
  if(known)en=known.en;
  const valid=known||safeEnglish(en)&&validWords(en);
  if(!valid||en.length<4){excluded.phrases.push(item);continue;}
  const k=compact(en);if(seen.has(k))continue;seen.add(k);
  phrases.push({en,meaning:known?known.cn:normalized(item.meaning),pages:item.pages,review:{status:'pending'}});
}
const aliases={};for(const word of Object.keys(entries))for(const part of word.split(/\s*\/\s*/))if(part!==word)aliases[part]=word;
const data={source:candidate.source,review:{status:'pending'},entries,aliases,phrases};
fs.writeFileSync(path.join(root,'content/english/green-vocabulary-enrichment.js'),'(function(root){\nconst data='+JSON.stringify(data,null,2)+';\nif(typeof module!=="undefined" && module.exports)module.exports=data;else root.GreenVocabularyData=data;\n})(typeof globalThis!=="undefined"?globalThis:this);\n');
const stats={words:Object.keys(entries).length,synonyms:Object.values(entries).filter(e=>e.synonyms.length).length,antonyms:Object.values(entries).filter(e=>e.antonyms.length).length,derivatives:Object.values(entries).filter(e=>e.derivatives.length).length,inflections:Object.values(entries).filter(e=>e.inflections.length).length,collocations:Object.values(entries).filter(e=>e.collocations.length).length,examples:Object.values(entries).filter(e=>e.examples.length).length,phrases:phrases.length,additionalPhrases:phrases.filter(p=>!phraseLookup.has(compact(p.en))).length};
fs.writeFileSync(path.join(root,'content/english/green-vocabulary-audit.json'),JSON.stringify({source:candidate.source,stats,ocrAudit:candidate.audit,excluded,checkedAt:'2026-10-12',note:'OCR原始例句仅在本地缓存，未发布。未可靠识别或校验不通过的关系和词组未展示，不宣称整本手册每项已录入。'},null,2));
console.log(stats);
