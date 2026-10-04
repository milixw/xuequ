'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');
const catalog = require('../content/past-papers/shanghai.js');
const api = require('../src/subject-papers.js');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
class Node {
  constructor(tag) { this.tag = tag; this.children = []; this.events = {}; this.value = ''; }
  set textContent(value) { this.text = String(value); this.children = []; }
  get textContent() { return (this.text || '') + (this.html || '') + this.children.map(n => n.textContent).join(''); }
  set innerHTML(value) { this.html = value; }
  appendChild(child) { this.children.push(child); return child; }
  setAttribute(name, value) { this[name] = value; }
  addEventListener(name, fn) { this.events[name] = fn; }
  all() { return [this, ...this.children.flatMap(n => n.all())]; }
}
function setup(subject = 'math', year = 2023, values = new Map(), fail = false, data = catalog) {
  const context = { document: { createElement: tag => new Node(tag) },
    Quiz: { renderText: text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') },
    localStorage: { getItem: key => values.get(key) || null, setItem: (key, value) => {
      if (fail && key.startsWith(api.KEY)) throw new Error('quota'); values.set(key, value);
    } } };
  context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
  vm.runInNewContext(read('src/subject-papers.js'), context);
  const main = new Node('main'); context.SubjectPapers.renderYear(main, data, subject, year);
  return { context, main, values, nodes: main.all() };
}
const submit = form => form.events.submit({ preventDefault() {} });

test('上海物化两个入口、22个年份目录与146题原答案，缺图公式不冒充完整卷', () => {
  for (const [subject, count] of [['physics',69],['chemistry',77]]) {
    const ps = api.papers(catalog,subject);
    assert(ps.length === 11 && ps.reduce((n,p) => n+p.questions.filter(q=>!q.stemImages).length,0) === count);
    const p = setup(subject,2023), main = new Node('main');
    p.context.SubjectPapers.renderList(main,catalog,subject);
    assert(main.all().filter(n => n.tag==='a').every(n => n.href.startsWith('#/shanghai-papers/'+subject+'/')));
    const form = p.nodes.find(n => n.tag==='form');
    const q = api.find(catalog,subject,2023).questions[0];
    form.all().find(n => n.tag==='input' && n.value===q.answer).events.change();
    submit(form);
    assert(JSON.parse(p.values.get(api.KEY+'.guest'))[api.find(catalog,subject,2023).id][q.id].solved);
    const missing=setup(subject,2026);
    assert(missing.main.textContent.includes('不能作答') && !missing.nodes.some(n => n.tag==='form'));
    assert(read('src/app.js').includes("href: '#/shanghai-papers/"+subject+"'"));
    for(const paper of ps) for(const q of paper.questions) {
      assert(!/见解析|见详解/.test(q.answer) || q.explanation);
      assert(!/如图|下图|图所示|图像|图象|下表/.test(q.stem));
      if(q.type==='written') assert(api.check(q,q.answer)===null);
    }
  }
  assert(api.find(catalog,'physics',2024).questions.find(q=>q.originalNo===16).stem.includes('F₂'));
  assert(api.find(catalog,'physics',2025).version.includes('回忆版'));
  const inventory=JSON.parse(read('content/past-papers/science-source-inventory.json'));
  assert(inventory.sources.length===29 && new Set(inventory.sources.map(s=>s.sha256)).size===29);
  assert(inventory.sources.some(s=>s.paths.some(p=>p.root==='netdisk')));
  assert(inventory.sources.every(s=>s.paths.every(p=>!p.file.includes('..'))));
});

test('上海语数24个年份科目入口112题保留资料编号、来源、答案及待审核状态', () => {
  const ids = new Set(); assert(catalog.papers.filter(p => ['math','chinese'].includes(p.subject)).length === 24);
  assert(api.papers(catalog, 'math').reduce((n, p) => n + p.questions.filter(q=>!q.stemImages).length, 0) === 78);
  assert(api.papers(catalog, 'chinese').reduce((n, p) => n + p.questions.length, 0) === 34);
  for (const paper of catalog.papers) {
    assert(['math', 'chinese', 'physics', 'chemistry'].includes(paper.subject) && paper.title.includes('上海'));
    assert(paper.review.status === 'pending' && /^[a-f0-9]{64}$/.test(paper.source.sha256));
    assert(paper.note.includes('混合展示') || paper.skipped.length > 0 && (paper.note.includes('部分原题') || !paper.questions.length && paper.note.includes('资料已找到')));
    for (const q of paper.questions) {
      assert(q.id === paper.id + '-q' + String(q.originalNo).padStart(2, '0'));
      assert(!ids.has(q.id)); ids.add(q.id);
      assert(q.review.status === 'pending' && q.stem.trim() && q.answer);
      assert(!q.stem.includes('【答案】') && !q.stem.includes('[[image]]'));
      assert(!/EMBED|[\ue000-\uf8ff]/.test(q.stem + q.answer + (q.options || []).join('')));
      assert(!/[\x00-\x08\x0b\x0c\x0e-\x1f\ufffd]/.test(q.stem));
      if (q.type === 'choice') assert(q.options.length === 4 && /^[A-D]$/.test(q.answer));
    }
  }
});

test('数学核对后的分数根号指数用本地KaTeX渲染，不展示压平的原解析', () => {
  const katex = require('../vendor/katex/katex.min.js');
  for (const paper of api.papers(catalog, 'math')) for (const q of paper.questions) {
    for (const text of [q.stem, q.answer, ...q.options || []]) {
      for (const match of text.matchAll(/\$([^$]+)\$/g)) katex.renderToString(match[1], { throwOnError: true, strict: 'error' });
    }
    assert(!q.explanation || !/[A-Za-z0-9=<>√∵∴÷×±∠△]/.test(q.explanation));
  }
  const q = api.find(catalog, 'math', 2025).questions.find(q => q.originalNo === 3);
  assert(q.options.some(o => o.includes('\\frac{x}{3}')) && q.answer === 'D');
});

test('98道补充图片题本地PNG真实存在，题图与原答案边界分离、跨页有序', () => {
  let count=0;
  for(const p of catalog.papers) for(const q of p.questions.filter(q=>q.stemImages)) {
    count++;
    assert(q.answerImages.length && p.imageSupplement.sourceSha256===p.source.sha256);
    const boundary=p.imageSupplement.answerBoundary;
    for(const [kind,images] of [['stem',q.stemImages],['answer',q.answerImages]]) {
      let previous=0;
      for(const im of images) {
        assert(api.imagePath(im.src) && im.src.startsWith('content/past-papers/images/'+p.id+'/'));
        assert(im.page>=previous); previous=im.page;
        assert(im.bbox[3]>im.bbox[1]);
        if(kind==='stem') assert(im.page<boundary.page || im.page===boundary.page && im.bbox[3]<=boundary.top+0.001);
        else assert(im.page>boundary.page || im.page===boundary.page && im.bbox[1]>=boundary.top);
        const bytes=fs.readFileSync(path.join(root,im.src));
        assert(bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])));
        assert(bytes.readUInt32BE(16)===im.width && bytes.readUInt32BE(20)===im.height);
      }
    }
  }
  assert(count===98);
  assert(api.find(catalog,'chemistry',2025).questions.find(q=>q.originalNo===21).stemImages.length===2);
  for(const [s,y,n] of [['math',2023,25],['math',2024,25],['math',2025,25],['physics',2023,20],['physics',2025,20],['chemistry',2023,21],['chemistry',2024,21],['chemistry',2025,21]]) {
    const p=api.find(catalog,s,y);assert(p.questions.length===n && !p.skipped.length);
  }
});

test('原题图片默认展示、答案图片只在隐藏答案区，放大路径限制且打印隐藏订正', () => {
  const p=setup('physics',2023), q=api.find(catalog,'physics',2023).questions.find(q=>q.originalNo===6);
  const card=p.nodes.find(n=>n.tag==='section' && n.children.some(c=>c.tag==='h2' && c.textContent.startsWith('资料第 6 题')));
  const box=card.all().find(n=>n.className==='english-explanation');assert(box.hidden);
  const stemImg=card.all().find(n=>n.tag==='img' && n.src===q.stemImages[0].src);assert(stemImg);
  assert(box.all().some(n=>n.tag==='img' && n.src===q.answerImages[0].src));
  const link=card.all().find(n=>n.tag==='a');assert(link.target==='_blank' && link.rel==='noopener');
  assert(!api.imagePath('javascript:alert(1)') && !api.imagePath('https://example.com/q.png'));
  assert(!api.imagePath('content/past-papers/images/../answer.png'));
  const form=card.all().find(n=>n.tag==='form');
  form.all().find(n=>n.tag==='input' && n.value===q.answer).events.change();submit(form);assert(!box.hidden);
  const css=read('src/app.css');
  assert(css.includes('.subject-papers-image img') && css.includes('max-width: 100%'));
  assert(css.includes('.subject-papers-question .english-explanation') && css.includes('display: none !important;'));
});

test('语文整篇阅读与小问不拆开，跨题材料及原加点下划线保留', () => {
  const p = setup('chinese', 2023);
  assert(p.nodes.some(n => n.tag === 'u') && p.nodes.some(n => n.className === 'subject-papers-dot'));
  assert(api.find(catalog, 'chinese', 2025).questions.find(q => q.originalNo === 5).context.includes('子弹库'));
  for (const paper of api.papers(catalog, 'chinese')) assert(paper.questions.every(q => q.type === 'written'));
});

test('上海语数目录按学科年份分层，无江苏题目，错误目录安全返回', () => {
  const p = setup(); const main = new Node('main'); p.context.SubjectPapers.renderList(main, catalog, 'math');
  assert(main.all().filter(n => n.tag === 'a').map(n => n.href).join(',') ===
    [2026,2025,2024,2023,2020,2019,2018,2017,2016,2015,2014,2013].map(y => '#/shanghai-papers/math/' + y).join(','));
  assert(!main.textContent.includes('江苏'));
  assert(setup('math', 2000).main.textContent.includes('未收录'));
  assert(setup('unknown', 2023).main.textContent.includes('未收录'));
});

test('上海资料清单覆盖两个根目录并按内容哈希去重，不把待转录年份当作试题', () => {
  const inventory = JSON.parse(read('content/past-papers/source-inventory.json'));
  assert(inventory.roots.join(',') === 'download,netdisk');
  assert(inventory.sources.length === 37 && inventory.sources.reduce((n, s) => n + s.paths.length, 0) === 64);
  assert(new Set(inventory.sources.map(s => s.sha256)).size === inventory.sources.length);
  assert(inventory.sources.every(s => s.paths.every(p => !p.file.includes('..') && ['download','netdisk'].includes(p.root))));
  const missing = setup('math', 2015); assert(missing.main.textContent.includes('不能作答'));
  assert(!missing.nodes.some(n => n.tag === 'form' || n.tag === 'select'));
  const scan = api.find(catalog, 'math', 2026);
  assert(scan.questions.length === 14 && /^[a-f0-9]{64}$/.test(scan.source.answerSha256));
  assert(scan.questions.find(q => q.originalNo === 19).answer.includes('y=-3'));
  for (const [year, missing] of [[2013,[8,9,11]],[2014,[8,9,14]],[2019,[3,9,11,12]]]) {
    assert(api.find(catalog, 'math', year).questions.every(q => !missing.includes(q.originalNo)), '缺失公式不能变成空题干或空答案');
  }
  for (const p of api.papers(catalog, 'math')) for (const q of p.questions) {
    assert(!(q.options || []).some(o => /第Ⅱ卷|二、填空题/.test(o)));
  }
});

test('上海数学先答后显答案，空提交不写入，答错次数累计且刷新恢复', () => {
  const p = setup(), q = api.find(catalog, 'math', 2023).questions[0];
  const form = p.nodes.find(n => n.tag === 'form'), box = p.nodes.find(n => n.className === 'english-explanation');
  assert(box.hidden); submit(form); assert(box.hidden && !p.values.has(api.KEY + '.guest'));
  const wrong = form.all().find(n => n.tag === 'input' && n.value !== q.answer);
  wrong.events.change(); submit(form); assert(!box.hidden);
  form.all().find(n => n.tag === 'input' && n.value === q.answer).events.change(); submit(form);
  const saved = p.context.LearningStore.read(api.KEY, {})['sh-math-2023'][q.id];
  assert(saved.attempts === 2 && saved.wrongCount === 1 && saved.solved && saved.response === q.answer);
  const again = setup('math', 2023, p.values);
  assert(again.nodes.some(n => n.tag === 'input' && n.value === q.answer && n.checked));
  assert(!again.nodes.find(n => n.className === 'english-explanation').hidden);
});

test('语文主观题保存作答但不冒充自动评分，查看答案不增加提交次数', () => {
  const p = setup('chinese'), form = p.nodes.find(n => n.tag === 'form');
  const input = form.all().find(n => n.tag === 'textarea'); input.value = '按小问编号作答'; input.events.input(); submit(form);
  form.all().find(n => n.tag === 'button' && n.type === 'button').events.click();
  const q = api.find(catalog, 'chinese', 2023).questions[0];
  const state = p.context.LearningStore.read(api.KEY, {})['sh-chinese-2023'][q.id];
  assert(state.attempts === 1 && state.wrongCount === 0 && !state.solved && state.response === input.value);
  assert(api.check(q, q.answer) === null);
});

test('上海语数账号及访客独立，切换账号后旧表单拒绝写入', () => {
  const p = setup(), form = p.nodes.find(n => n.tag === 'form');
  form.all().find(n => n.tag === 'input').events.change(); submit(form);
  p.values.set('xq.account.v1', JSON.stringify({ name: '新账号' })); submit(form);
  assert(p.main.textContent.includes('账号已切换'));
  assert(!p.values.has(api.KEY + '.user:' + encodeURIComponent('新账号')));
  const next = setup('math', 2023, p.values);
  assert(next.nodes.filter(n => n.tag === 'input').every(n => !n.checked));
  const nextForm = next.nodes.find(n => n.tag === 'form'); nextForm.all().find(n => n.tag === 'input').events.change(); submit(nextForm);
  assert(p.values.has(api.KEY + '.guest') && p.values.has(api.KEY + '.user:' + encodeURIComponent('新账号')));
  assert(!p.values.has('xq.progress.v2') && !p.values.has('xq.english-progress.v1.guest'));
});

test('上海语数存储失败不会显示保存成功，原题HTML转义且筛选可用', () => {
  const failed = setup('math', 2023, new Map(), true), form = failed.nodes.find(n => n.tag === 'form');
  form.all().find(n => n.tag === 'input').events.change(); submit(form);
  assert(failed.main.textContent.includes('保存失败') && failed.nodes.find(n => n.className === 'english-explanation').hidden);
  const p = setup(), select = p.nodes.find(n => n.tag === 'select'); select.value = '填空题'; select.events.change();
  assert(p.main.all().filter(n => n.tag === 'form').length === 8);
  const paper = api.find(catalog, 'math', 2023);
  const malicious = setup('math', 2023, new Map(), false, { papers: [{ ...paper, questions: [{ ...paper.questions[0], stem: '<script>alert(1)</script>' }] }] });
  assert(malicious.main.textContent.includes('&lt;script&gt;') && !malicious.main.textContent.includes('<script>'));
});

test('上海语数离线脚本在路由前加载，首页数学语文入口及手机控件接入', () => {
  const index = read('index.html'), app = read('src/app.js'), css = read('src/app.css');
  assert(index.indexOf('content/past-papers/shanghai.js') < index.indexOf('src/subject-papers.js'));
  assert(index.indexOf('src/subject-papers.js') < index.indexOf('src/app.js'));
  assert(app.includes('#/shanghai-papers/math') && app.includes('#/shanghai-papers/chinese'));
  assert(app.includes("parts[0] === 'shanghai-papers'"));
  assert(css.includes('.subject-papers-response') && css.includes('min-height: 40px'));
  assert(!read('src/subject-papers.js').includes('fetch('));
});

test('上海语数页面路由实调正确科目年份，并设置正确返回目录', () => {
  const source = read('src/app.js');
  const handler = source.slice(source.indexOf('  function subjectPapersPage('), source.indexOf('  async function englishPlanPage('));
  const calls = [], context = { ShanghaiSubjectPapers: catalog,
    SubjectPapers: { ...api, renderYear: (main, data, subject, year) => calls.push(['year', subject, year]),
      renderList: (main, data, subject) => calls.push(['list', subject]) },
    page: (title, back) => { calls.push(['page', title, back]); return new Node('main'); } };
  vm.runInNewContext(handler + "subjectPapersPage('chinese', '2024'); subjectPapersPage('math');", context);
  assert(calls[0][2] === '#/shanghai-papers/chinese');
  assert(calls[1].join(',') === 'year,chinese,2024');
  assert(calls[2][2] === '#/' && calls[3].join(',') === 'list,math');
});
