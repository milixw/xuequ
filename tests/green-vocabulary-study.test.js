'use strict';
const fs=require('fs'),path=require('path');
const {test,assert}=require('./harness');
const data=require('../content/english/green-vocabulary-study-data.js');
const api=require('../src/vocabulary-study.js');
test('绿本39组辨析覆盖原章范围，讲解例句待审核、ID连续',()=>{
  assert(data.source.sha256===require('../content/english/green-vocabulary-enrichment.js').source.sha256);
  assert(data.confusables.length===39);
  data.confusables.forEach((g,i)=>{
    assert(g.no===i+1 && g.id==='green-confusable-'+String(i+1).padStart(2,'0'));
    assert(g.review.status==='pending' && g.rows.length>=2 && g.pitfall);
    assert(g.pages.every(p=>p>=309&&p<=329));
    assert(g.rows.every(r=>r.word&&r.rule&&r.example.en&&r.example.zh&&r.example.review.status==='pending'));
  });
  assert(data.confusables[30].rows.map(r=>r.word).join('/')==='work/job');
  assert(data.confusables[20].pitfall.includes('不能机械'));
  assert(data.confusables[15].pitfall.includes('after'));
});
test('24组转换包含完整原创练习、主语时态限制和默认折叠自查',()=>{
  assert(data.patterns.length===24);
  const ids=new Set();
  for(const p of data.patterns){
    assert(!ids.has(p.id));ids.add(p.id);
    assert(p.review.status==='pending' && p.exercise.review.status==='pending');
    assert(p.example.from!==p.exercise.sentence && p.exercise.answer && p.exercise.explain);
    const html=api.patternHTML(p);
    assert(html.includes('<textarea') && html.includes('<details class="gs-answer">'));
    assert(!html.includes('<details class="gs-answer" open'));
  }
  const purpose=data.patterns[14];
  assert(purpose.note.includes('主语') && purpose.exercise.answer.includes('不能'));
  assert(data.patterns[0].exercise.answer.includes('took us'));
});
test('104个动词按真实拼写组合分类，多写法和情态动词不误分',()=>{
  assert(data.verbs.length===104 && new Set(data.verbs.map(v=>v.base)).size===104);
  const verb=base=>data.verbs.find(v=>v.base===base);
  assert(api.classify(verb('read')).join()==='AAA' && verb('read').note.includes('/red/'));
  assert(api.classify(verb('begin')).join()==='ABC');
  assert(api.classify(verb('keep')).join()==='ABB');
  assert(api.classify(verb('come')).join()==='ABA');
  assert(api.classify(verb('beat')).join()==='AAB');
  assert(api.classify(verb('get')).join()==='ABB,ABC');
  assert(api.classify(verb('fit')).join()==='AAA,ABB');
  assert(verb('lie').participle[0]==='lain' && verb('lay').past[0]==='laid');
  assert(verb('hang').note.includes('绞死'));
  assert(!data.verbs.some(v=>['can','may','must','shall','will'].includes(v.base)));
  assert(data.modals.length===5 && data.modals.every(m=>m.review.status==='pending'));
  assert(data.verbs.every(v=>v.review.status==='pending'&&v.pages.every(p=>p>=356&&p<=359)));
});
test('专项渲染安全转义、英文变形可检索，词汇页三个入口存在',()=>{
  const bad={...data.confusables[0],title:'<script>alert(1)</script>'};
  assert(api.confusableHTML(bad).includes('&lt;script&gt;') && !api.confusableHTML(bad).includes('<script>'));
  assert(api.searchText(data.verbs.find(v=>v.base==='ring')).includes('rang'));
  const root=path.join(__dirname,'..');
  const page=fs.readFileSync(path.join(root,'content/english/green-vocabulary-study.html'),'utf8');
  const vocab=fs.readFileSync(path.join(root,'content/english/shanghai-exam-vocabulary.html'),'utf8');
  for(const tab of ['confusables','patterns','verbs'])assert(vocab.includes('green-vocabulary-study.html#'+tab));
  assert(page.includes('green-vocabulary-study-data.js') && page.includes('../../src/vocabulary-study.js'));
  assert(!page.includes('fetch(') && !fs.readFileSync(path.join(root,'src/vocabulary-study.js'),'utf8').includes('localStorage'));
});
