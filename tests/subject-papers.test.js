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

test('上海语数26个年份科目入口保留资料编号、来源、答案及待审核状态', () => {
  const ids = new Set(); assert(catalog.papers.filter(p => ['math','chinese'].includes(p.subject)).length === 26);
  assert(api.papers(catalog, 'math').reduce((n, p) => n + p.questions.filter(q=>!q.stemImages).length, 0) === 78);
  assert(api.papers(catalog, 'chinese').reduce((n, p) => n + p.questions.length, 0) === 99);
  for (const paper of catalog.papers) {
    assert(['math', 'chinese', 'physics', 'chemistry'].includes(paper.subject) && paper.title.includes('上海'));
    assert(paper.review.status === 'pending' && /^[a-f0-9]{64}$/.test(paper.source.sha256));
    assert(paper.note.includes('混合展示') || paper.skipped.length > 0 && (paper.note.includes('部分原题')
      || !paper.questions.length && paper.note.includes('资料已找到')
      || !!paper.textSource && paper.textSource.kind === 'web-page-transcription' && paper.note.includes('公开真题页面')));
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

test('105组必要配图本地PNG真实存在，题图与原答案边界分离、跨页有序', () => {
  let count=0;
  for(const p of catalog.papers) for(const q of p.questions.filter(q=>q.stemImages)) {
    count++;
    assert((q.textSource && q.answer || q.answerImages && q.answerImages.length || q.category==='作文' && q.answerSource.kind==='no-unique-answer') && p.imageSupplement.sourceSha256===p.source.sha256);
    const boundary=q.imageSource ? q.imageSource.answerBoundary : p.imageSupplement.answerBoundary;
    if(q.imageSource) assert(q.imageSource.sourceSha256===p.source.sha256 && /^[a-f0-9]{64}$/.test(q.imageSource.renderedSha256));
    for(const [kind,images] of [['stem',q.stemImages||[]],['answer',q.answerImages||[]]]) {
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
  assert(count===105);
  assert(api.find(catalog,'chemistry',2025).questions.find(q=>q.originalNo===21).stemImages.length===2);
  for(const [s,y,n] of [['math',2023,25],['math',2024,25],['math',2025,25],['physics',2023,20],['physics',2025,20],['chemistry',2023,21],['chemistry',2024,21],['chemistry',2025,21]]) {
    const p=api.find(catalog,s,y);assert(p.questions.length===n && !p.skipped.length);
  }
});

test('上海语文十一份本地资料题号完整，无重复小问，旧Word图文可作答', () => {
  const crops=JSON.parse(read('content/past-papers/chinese-completion-crops.json'));
  for(const [year,total] of [[2013,27],[2014,27],[2015,26],[2016,27],[2017,8],[2018,23],[2019,26],[2020,26],[2023,6],[2024,6],[2025,6]]) {
    const paper=api.find(catalog,'chinese',year);
    const numbers=paper.questions.flatMap(q=>q.originalNumbers||[q.originalNo]).sort((a,b)=>a-b);
    assert(numbers.join(',')===Array.from({length:total},(_,i)=>i+1).join(','), String(year));
    assert(!paper.skipped.length);
    const page=setup('chinese',year);
    assert(page.nodes.filter(n=>n.tag==='form').length===paper.questions.length);
    assert(paper.questions.some(q=>q.category==='作文'));
    if(crops[year]) for(const q of paper.questions.filter(q=>q.imageSource)) {
      assert(crops[year].sourceSha256===q.imageSource.sourceSha256);
      assert(crops[year].renderedSha256===q.imageSource.renderedSha256);
    }
  }
  assert(api.find(catalog,'chinese',2020).questions.some(q=>q.originalNo===13));
  assert(api.find(catalog,'chinese',2026).skipped.length && api.find(catalog,'chinese',2026).version.includes('回忆'));
});

test('2026上海语文交叉核对四份回忆资料，六组可作答且不冒充完整原卷', () => {
  const paper=api.find(catalog,'chinese',2026);
  const transcript=JSON.parse(read('content/past-papers/chinese-2026-recollections.json'));
  assert(paper.questions.length===6 && paper.skipped.length===3);
  assert(paper.note.includes('不是官方小题号') && paper.version.includes('非官方'));
  assert(new Set(paper.recollectionSources.map(s=>s.sha256)).size===4);
  assert(JSON.stringify(paper.recollectionSources)===JSON.stringify(transcript.sources));
  for(const q of paper.questions) {
    assert(q.type==='written' && q.review.status==='pending');
    assert(api.check(q,q.answer)===null);
    assert(JSON.stringify(q.recollectionSources)===JSON.stringify(paper.recollectionSources));
    assert(!/【答案】|（[A-D]）/.test(q.stem));
  }
  const prose=paper.questions.find(q=>q.originalNo===2);
  assert(prose.context.includes('【甲】') && prose.context.includes('【乙】') && prose.context.includes('岂'));
  assert(paper.questions.find(q=>q.originalNo===4).contextLabel.includes('非试卷完整原文'));
  const page=setup('chinese',2026);
  assert(page.nodes.filter(n=>n.tag==='form').length===6);
  assert(page.nodes.filter(n=>n.className==='english-explanation').every(n=>n.hidden));
});

test('2025上海语文补齐六组题，跨页阅读与作文可作答且答案默认隐藏', () => {
  const p = api.find(catalog, 'chinese', 2025);
  assert(p.questions.map(q => q.originalNo).join(',') === '1,2,3,4,5,6' && !p.skipped.length);
  const prose=p.questions.find(q=>q.originalNo===2), novel=p.questions.find(q=>q.originalNo===3);
  assert(prose.stem.includes('陋室铭') && prose.stem.includes('（7）') && prose.stem.includes('[[wave]]'));
  assert(novel.stem.includes('春江水暖鸭先知') && novel.stem.includes('人物关系图（按连线转录）'));
  const view = setup('chinese', 2025);
  assert(view.nodes.filter(n => n.tag === 'form').length === 6);
  const composition = view.nodes.find(n => n.tag === 'section' && n.textContent.includes('资料第 6 题'));
  assert(composition.all().some(n => n.tag === 'textarea'));
  const answer=composition.all().find(n=>n.className==='english-explanation');
  assert(answer.hidden && answer.textContent.includes(p.questions.find(q=>q.originalNo===6).answer));
  assert(view.nodes.filter(n=>n.className==='subject-papers-wave').length===3);
});

test('全部语文真题文字可读，59组为46组转录加13组网络抓取，仅显示七组必要配图', () => {
  const manifest=JSON.parse(read('content/past-papers/chinese-text-transcripts.json'));
  assert(manifest.questions.length===46 && new Set(manifest.questions.map(r=>r.id)).size===46);
  const papers=api.papers(catalog,'chinese');
  assert(papers.reduce((n,p)=>n+p.questions.length,0)===99);
  for(const paper of papers) for(const q of paper.questions) {
    assert(q.stem.length>40 && !/请根据下面的原资料题图作答|原资料参考答案见下方图片/.test(q.stem+q.answer));
    if(!q.textSource) continue;
    const r=manifest.questions.find(r=>r.id===q.id);
    assert(r && r.stem===q.stem && r.answer===q.answer && r.review.status==='pending');
    assert(r.sourceSha256===paper.source.sha256 && q.textSource.sourceSha256===paper.source.sha256);
    assert(/^[a-f0-9]{64}$/.test(q.textSource.recordSha256));
    assert(q.sourceImages.stem.length && !q.answerImages);
    assert((q.stemImages||[]).every(im=>im.src.endsWith('-stem-90.png') && im.label && im.sourceImage));
    const markers=[...q.stem.matchAll(/\[\[(u|dot|wave)\]\]([\s\S]*?)\[\[\/\1\]\]/g)];
    assert(markers.every(m=>m[2].trim() && !m[2].includes('[[')),q.id+'标注嵌套或空内容');
    assert(!q.stem.replace(/\[\[(u|dot|wave)\]\][\s\S]*?\[\[\/\1\]\]/g,'').includes('[['),q.id+'有未闭合标注');
  }
  assert(papers.reduce((n,p)=>n+p.questions.filter(q=>q.stemImages?.length).length,0)===7);
  const page=setup('chinese',2015), q=api.find(catalog,'chinese',2015).questions.find(q=>q.originalNo===8);
  assert(q.stem.includes('文学常识：') && q.stem.includes('词语解释：') && q.stem.includes('句子翻译：'));
  assert(page.nodes.filter(n=>n.className==='english-explanation').every(n=>n.hidden));
  assert(read('src/app.css').includes('.subject-papers-wave'));
});

test('2022语文为网络抓取来源：绑定存档哈希、标非官方、如实声明缺图且不冒充本地原卷', () => {
  const paper=api.find(catalog,'chinese',2022);
  assert(paper && paper.version.includes('网络抓取') && paper.version.includes('非官方'));
  assert(paper.source.root==='download' && paper.source.file==='2022年上海市中考语文试卷（网络抓取存档）.txt');
  assert(/^[a-f0-9]{64}$/.test(paper.source.sha256), '来源哈希须绑定本机存档文件');
  assert(paper.textSource.kind==='web-page-transcription' && paper.textSource.url.includes('shijuan.net'));
  assert(paper.textSource.sourceSha256===paper.source.sha256 && /^[a-f0-9]{64}$/.test(paper.textSource.recordSha256));
  assert(paper.skipped.length===3 && paper.skipped.every(s=>s.includes('图')), '缺图须逐条声明');
  assert(paper.note.includes('公开真题页面') && paper.note.includes('不是本地整理版 PDF 原卷'));
  assert(paper.questions.length===6);
  assert(paper.questions.map(q=>q.originalNo).join()==='1,2,3,4,5,6');
  for(const q of paper.questions) {
    assert(/^sh-chinese-2022-q0[1-6]$/.test(q.id) && q.review.status==='pending');
    assert(!q.textSource && !q.stemImages && !q.sourceImages, q.id+'不得冒用本地转录或裁图来源');
    assert(q.category!=='作文' || (q.answer.includes('人工评阅') && q.answer.length<80), q.id+'作文不得伪造范文');
  }
  assert(paper.questions.slice(0,5).map(q=>q.originalNumbers.length).join()==='4,6,3,5,3');
  assert(paper.questions[5].category==='作文' && paper.questions[5].originalNumbers.length===0);
  assert(paper.questions[1].stem.includes('两小儿') && paper.questions[1].answer.includes('热水'));
  assert(paper.questions[3].stem.includes('写给儿子') && paper.questions[5].stem.includes('这不过是个开场'));
  const page=setup('chinese',2022), text=page.nodes.map(n=>n.textContent).join('\n');
  assert(text.includes('网络抓取整理版 · 非官方') && text.includes(paper.source.file));
  assert(['待审核','配图未随资料保存'].every(s=>text.includes(s)), '缺图声明须在页面可见');
  assert(['资料第 1、2、3、4 题','资料第 5、6、7、8、9、10 题','资料第 11、12、13 题',
    '资料第 14、15、16、17、18 题','资料第 19、20、21 题','资料第 6 题 · 作文']
    .every(s=>text.includes(s)), '原题组号须逐组可见');
  assert(['默写','两小儿','劳动宣言','写给儿子','必读名著','这不过是个开场'].every(s=>text.includes(s)));
  assert(!/<img/i.test(text), '本卷无可用的题图资源');
});

test('2021语文为网络抓取来源：绑定存档哈希、标非官方、篇目与官方评析一致且不冒充本地原卷', () => {
  const paper=api.find(catalog,'chinese',2021);
  assert(paper && paper.version.includes('网络抓取') && paper.version.includes('非官方'));
  assert(paper.source.root==='download' && paper.source.file==='2021年上海市中考语文试卷（网络抓取存档）.txt');
  assert(/^[a-f0-9]{64}$/.test(paper.source.sha256), '来源哈希须绑定本机存档文件');
  assert(paper.textSource.kind==='web-page-transcription' && paper.textSource.url.includes('kaowang.cn'));
  assert(paper.textSource.sourceSha256===paper.source.sha256 && /^[a-f0-9]{64}$/.test(paper.textSource.recordSha256));
  assert(paper.skipped.length===3 && paper.skipped.some(s=>s.includes('图')), '缺图须逐条声明');
  assert(paper.note.includes('公开真题页面') && paper.note.includes('教育考试院'), '须留下官方锚点');
  assert(paper.questions.length===7);
  assert(paper.questions.map(q=>q.originalNo).join()==='1,2,3,4,5,6,7');
  for(const q of paper.questions) {
    assert(/^sh-chinese-2021-q0[1-7]$/.test(q.id) && q.review.status==='pending');
    assert(q.stem.length>40 && q.answer && !q.textSource && !q.stemImages && !q.sourceImages,
      q.id+'不得冒用本地转录或裁图来源');
    assert(q.category!=='作文' || (q.answer.includes('人工评阅') && !q.answer.includes('范文如下')),
      q.id+'作文不得伪造范文');
  }
  assert(paper.questions.slice(0,6).map(q=>q.originalNumbers.length).join()==='5,3,3,4,5,3');
  assert(paper.questions[6].category==='作文');
  // 与上海市教育考试院 2021-06-19 专家评析核对的锚点
  const all=paper.questions.map(q=>q.stem+q.answer).join('\n');
  assert(['卖油翁','核舟记','口技','郑和','玩具诊所','愚公','比看上去更有意思']
    .every(s=>all.includes(s)), '官方评析确认的篇目与作文题须齐全');
  assert(paper.questions[1].answer.includes('欧阳修') && paper.questions[1].answer.includes('熟能生巧'));
  assert(paper.questions[3].stem.includes('现存最早') && paper.questions[3].answer.includes('航海图'));
  assert(paper.questions[6].stem.includes('比看上去更有意思'));
  const page=setup('chinese',2021), text=page.nodes.map(n=>n.textContent).join('\n');
  assert(text.includes('网络抓取整理版 · 非官方') && text.includes(paper.source.file));
  assert(text.includes('待审核'), '待审核状态须在页面可见');
  assert(['资料第 1、2、3、4、5 题','资料第 6、7、8 题','资料第 9、10、11 题',
    '资料第 12、13、14、15 题','资料第 16、17、18、19、20 题','资料第 21、22、23 题']
    .every(s=>text.includes(s)), '原题组号须逐组可见');
  assert(!/<img/i.test(text), '本卷无可用的题图资源');
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

test('上海语数真题数据按需加载，首页数学语文入口及手机控件接入', () => {
  const index = read('index.html'), app = read('src/app.js'), css = read('src/app.css');
  assert(!index.includes('content/past-papers/shanghai.js') && app.includes("'content/past-papers/shanghai.js?v="));
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
