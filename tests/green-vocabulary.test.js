'use strict';
const fs=require('fs'),path=require('path');
const {test,assert}=require('./harness');
const data=require('../content/english/green-vocabulary-enrichment.js');
const api=require('../src/vocabulary-details.js');
const html=fs.readFileSync(path.join(__dirname,'../content/english/shanghai-exam-vocabulary.html'),'utf8');
const base=JSON.parse(html.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
test('教学与考纲释义按词性合并去重，保留括号含义和原数据',()=>{
  const senses=[{pos:'v.',cn:'接受；认可',s:'t'},{pos:'v.',cn:'接受，认可；承认',s:'e'},{pos:'n.',cn:'接受（正式、非正式）',s:'e'}];
  const original=JSON.stringify(senses),merged=api.mergeSenses(senses);
  assert(merged.length===2 && merged[0].cn==='接受；认可；承认');
  assert(merged[1].cn==='接受（正式、非正式）');
  assert(JSON.stringify(senses)===original);
  const about=base.words.find(w=>w.en==='about');
  assert(api.mergeSenses(about.senses).length===2);
});
test('绿本补充有来源及待审核状态，仅增强现有词条且不复制原书例句',()=>{
  assert(data.source.pdfPages===368 && /^[a-f0-9]{64}$/.test(data.source.sha256));
  assert(Object.keys(data.entries).length===900 && data.phrases.length===281);
  const words=new Set(base.words.map(w=>api.key(w.en)));
  for(const [word,e] of Object.entries(data.entries)){
    assert(words.has(word) && e.review.status==='pending');
    assert(e.pages.every(p=>Number.isInteger(p)&&p>=1&&p<=368));
    assert(e.examples.every(ex=>ex.review.status==='pending' && ex.en && ex.zh));
  }
  assert(data.entries.ability.derivatives.some(d=>d.en==='enable'));
  assert(data.entries.happy.derivatives.some(d=>d.en==='happiness'));
  assert(!data.entries.happy.derivatives.some(d=>d.en==='France'));
  assert(!data.entries.begin.derivatives.some(d=>d.en==='bakery'));
  assert(data.entries.right.antonyms.some(a=>a.en==='left'&&a.meaning.includes('右边')));
});
test('考纲词组去重合并保留原词条与释义，新词组不伪装两套官方共有',()=>{
  global.GreenVocabularyData=data;
  try{
    const snapshot=JSON.stringify(base.phrases);const merged=api.mergePhrases(base.phrases);
    assert(JSON.stringify(base.phrases)===snapshot);
    assert(merged.length===base.phrases.length+2);
    assert(new Set(merged.map(p=>api.phraseKey(p.en))).size===merged.length);
    assert(merged.filter(p=>p.greenBook).length===281);
    assert(merged.some(p=>p.en==='make sure'&&p.src==='e'));
    const least=merged.find(p=>p.en==='at least / most');
    assert(least.cn===base.phrases.find(p=>p.en===least.en).cn);
    assert(api.mergePhrases(merged).length===merged.length);
  }finally{delete global.GreenVocabularyData;}
});
test('补充资料安全渲染，未加载或缺词时原练习仍可用',()=>{
  assert(api.render('ability')==='');
  global.GreenVocabularyData={entries:{test:{pages:[6],synonyms:[{en:'<script>bad</script>'}],antonyms:[],derivatives:[],inflections:[],collocations:[],examples:[{en:'A < B',zh:'<img src=x>'}]}}};
  try{
    const output=api.render('test');assert(output.includes('&lt;script&gt;') && !output.includes('<script>'));
    assert(api.render('missing')==='');
  }finally{delete global.GreenVocabularyData;}
  assert(html.includes('green-vocabulary-enrichment.js') && html.includes('id="green-phrases"'));
  const ui=fs.readFileSync(path.join(__dirname,'../src/words-ui.js'),'utf8');
  assert(ui.includes('loadSupplement()') && ui.includes('VocabularyDetails.render(e.word.w)'));
});
