'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');
const catalog = require('../content/english/past-papers/catalog.js');
const jiangsu = require('../content/english/past-papers/jiangsu.js');
const exams = require('../src/english-exams.js');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

class Node {
  constructor(tag) { this.tag = tag; this.children = []; this.events = {}; this.value = ''; }
  set textContent(value) { this.text = String(value); this.children = []; }
  get textContent() { return (this.text || '') + this.children.map(n => n.textContent).join(''); }
  appendChild(child) { this.children.push(child); return child; }
  setAttribute(name, value) { this[name] = value; }
  addEventListener(name, fn) { this.events[name] = fn; }
  all() { return [this, ...this.children.flatMap(n => n.all())]; }
}
function setup(year, data = catalog, city) {
  const values = new Map();
  const context = { document: { createElement: tag => new Node(tag), querySelectorAll: () => [] },
    localStorage: { getItem: k => values.get(k) || null, setItem: (k, v) => values.set(k, v) } };
  context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
  vm.runInNewContext(read('src/progress.js'), context);
  vm.runInNewContext(read('src/english-exams.js'), context);
  const main = new Node('main');
  context.EnglishExams.renderYear(main, data, year, city);
  return { main, context, values, nodes: main.all() };
}

test('上海原题优先文字，仅必要原图保留且不以原件链接代替题目', () => {
  const years = exams.papers(catalog).map(p => p.year);
  assert(JSON.stringify(years) === JSON.stringify([2026, 2025, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013]));
  assert(catalog.papers.reduce((n, p) => n + p.questions.length, 0) === 715);
  const ids = new Set();
  for (const paper of catalog.papers) {
    assert(paper.review.status === 'pending');
    assert(!paper.resources, '不再展示原文件资源包');
    if (paper.source) assert(/^[a-f0-9]{64}$/.test(paper.source.sha256));
    for (const q of paper.questions) {
      const prefix = paper.year === 2019 && q.part === 'listening' ? 'sh2019-listening' : `sh${paper.year}`;
      assert(q.id === `${prefix}-q${String(q.originalNo).padStart(2, '0')}`);
      assert(!ids.has(q.id)); ids.add(q.id);
      assert((q.stem.trim() || q.category === '完形填空' && q.passage) && q.review.status === 'pending');
      assert(!q.stem.includes('【答案】') && !q.stem.includes('[[image]]'));
      assert(!/[\x00-\x08\x0b\x0c\x0e-\x1f\ufffd]/.test(q.stem));
      if (q.type === 'choice') {
        assert(q.options.length === (q.optionLabels === 'TF' ? 2 : 4) && q.options.every(o => o.trim()));
        assert(q.answer === null || (q.optionLabels === 'TF' ? /^[TF]$/ : /^[A-D]$/).test(q.answer));
        assert(q.options.every(o => !o.includes('【答案】') && !o.includes('[[image]]')));
      }
      if (q.category === '阅读理解' || q.category === '完形填空') assert(q.passage && !q.passage.includes('[[image]]'));
    }
    if (paper.audio) assert(fs.existsSync(path.join(root, paper.audio)));
  }
  const renderer = read('src/english-exams.js');
  assert(!renderer.includes("node('object')"));
  assert(!renderer.includes('fetch(') && !renderer.includes('innerHTML'));
});

test('缺失年份和回忆版如实标注，不根据答案造原题', () => {
  assert(catalog.missingYears.join(',') === '2021,2022,2023,2024');
  assert(exams.find(catalog, 2025).questions.every(q => q.part === 'listening'));
  assert(exams.find(catalog, 2026).version.includes('非官方'));
  assert(exams.find(catalog, 2018).questions.filter(q => !q.completionSource).every(q => q.answerSource.kind === 'public-supplement'));
  const page = setup(2025);
  assert(page.main.textContent.includes('缺选项图片、笔试题干'));
  assert(page.nodes.filter(n => n.tag === 'form').length === 5);
});

test('历史笔试69项连续覆盖，253个原有题目及答案逐字保持', () => {
  const crypto = require('crypto');
  const originals = catalog.papers.flatMap(p => p.questions).filter(q => !q.completionSource).sort((a, b) => a.id.localeCompare(b.id));
  assert(crypto.createHash('sha256').update(JSON.stringify(originals)).digest('hex') === 'db7fcd985d7443200c29664c5c1742e05f010ad4c566d3f4bdcba095f79afdd6');
  for (let year = 2013; year <= 2020; year++) {
    const paper = exams.find(catalog, year), written = paper.questions.filter(q => q.part !== 'listening');
    const start = year === 2013 ? 31 : year === 2019 ? 1 : 26;
    assert(written.length === 69 && paper.coverage.writtenIncluded === 69);
    assert(written.every((q, i) => q.originalNo === start + i), String(year));
    for (const category of ['语法与词汇', '选词填空', '词性转换', '句型转换', '阅读理解', '完形填空', '首字母填空', '阅读简答', '作文']) {
      assert(written.some(q => q.category === category), year + category);
    }
  }
});

test('462条补充与来源清单一致，配图绑定本地文件及哈希且无答案污染', () => {
  const crypto = require('crypto'), records = JSON.parse(read('content/english/past-papers/completion-transcripts.json'));
  let total = 0; const images = new Set();
  for (const entry of records.papers) {
    const paper = exams.find(catalog, entry.year);
    for (const source of entry.sources) assert(/^[a-f0-9]{64}$/.test(source.sha256));
    for (const item of entry.questions) {
      const q = paper.questions.find(q => q.id === item.id); total++;
      assert(q && q.completionSource.sourceSha256 === entry.sources[0].sha256);
      const { completionSource, ...body } = q;
      assert(JSON.stringify(body) === JSON.stringify(item), q.id);
      assert(!/【(?:答案|分析|解答|解析)】|HYPERLINK|\[\[image\]\]/.test(q.stem + (q.passage || '')), q.id);
      for (const field of ['stemImages', 'passageImages', 'answerImages']) for (const fig of q[field] || []) {
        assert(/^content\/english\/past-papers\/\d{4}\/[\w.-]+\.png$/.test(fig.src));
        assert(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, fig.src))).digest('hex') === fig.sha256);
        images.add(fig.src);
      }
    }
  }
  assert(total === 462 && images.size === 8);
  assert(!exams.find(catalog, 2026).questions.some(q => q.originalNo >= 21 && q.originalNo <= 35));
  assert(exams.find(catalog, 2026).coverage.gaps.some(g => g.includes('重组推测')));
});

test('主观题支持长作答并人工核对，不按参考措辞计错，原图可离线放大', () => {
  const q = { id: 'open-test', originalNo: 1, type: 'open', category: '阅读简答', stem: 'Explain.', answer: 'One possible answer.',
    stemImages: [{ src: 'content/english/past-papers/2013/image3.png', label: '选项图' }], listeningText: 'Hidden source transcript.' };
  const page = setup(2000, { papers: [{ year: 2000, questions: [q], note: '', version: '测试' }] });
  const form = page.nodes.find(n => n.tag === 'form'), input = page.nodes.find(n => n.tag === 'textarea');
  input.value = 'Another reasonable answer.'; input.events.input(); form.events.submit({ preventDefault() {} });
  assert(exams.check(q, input.value) === null);
  assert(!page.context.Progress.get('english-exam:2000', q.id));
  assert(page.main.textContent.includes('请对照参考答案核对'));
  const img = page.nodes.find(n => n.tag === 'img');
  assert(img.alt === '选项图' && page.nodes.some(n => n.tag === 'a' && n.href === img.src));
  assert(page.nodes.some(n => n.tag === 'details' && n.textContent.includes('Hidden source transcript.')));
});

test('单词填空兼容原答案大小写、可选复数与备选，不判缺答案', () => {
  assert(exams.check({ type: 'choice', answer: 'D' }, 'D') === true);
  assert(exams.check({ type: 'choice', answer: 'D' }, 'A') === false);
  assert(exams.check({ type: 'fill', answer: 'Luckily' }, ' luckily ') === true);
  assert(exams.check({ type: 'fill', answer: 'suggestion(s)' }, 'suggestions') === true);
  assert(exams.check({ type: 'fill', answer: 'suggestion(s)' }, 'suggestion') === true);
  assert(exams.check({ type: 'fill', answer: 'closely/carefully' }, 'carefully') === true);
  assert(exams.check({ type: 'fill', answer: 'ten' }, 'tenth') === false);
  assert(exams.check({ type: 'choice', answer: null }, 'A') === null);
});

test('中考页面先答题后显示原解析，未答不能提交，错误次数累加', () => {
  const page = setup(2015), q = exams.find(catalog, 2015).questions[0];
  const form = page.nodes.find(n => n.tag === 'form');
  const box = page.nodes.find(n => n.className === 'english-explanation');
  assert(box.hidden === true);
  form.events.submit({ preventDefault() {} });
  assert(box.hidden === true);
  const wrong = form.all().find(n => n.tag === 'input' && n.value !== q.answer);
  wrong.events.change(); form.events.submit({ preventDefault() {} });
  assert(box.hidden === false && box.textContent.includes(q.explanation));
  assert(page.context.Progress.errorCount('english-exam:2015', q.id) === 1);
  const right = form.all().find(n => n.tag === 'input' && n.value === q.answer);
  right.events.change(); form.events.submit({ preventDefault() {} });
  assert(page.context.Progress.errorCount('english-exam:2015', q.id) === 1);
  assert(page.context.Progress.status('english-exam:2015', q.id) === 'solved');
});

test('中考无答案题不记错误，账号切换后旧表单拒绝写入且进度隔离', () => {
  const q = { ...exams.find(catalog, 2018).questions.find(q => q.type === 'choice'), answer: null, answerSource: undefined };
  const page = setup(2018, { papers: [{ year: 2018, questions: [q], version: '测试', note: '' }] });
  let form = page.nodes.find(n => n.tag === 'form');
  form.all().find(n => n.tag === 'input').events.change();
  form.events.submit({ preventDefault() {} });
  assert(page.context.Progress.errorCount('english-exam:2018', q.id) === 0);
  assert(!page.context.Progress.get('english-exam:2018', q.id));
  const answered = setup(2015), live = exams.find(catalog, 2015).questions[0];
  form = answered.nodes.find(n => n.tag === 'form');
  form.all().find(n => n.tag === 'input').events.change();
  answered.values.set('xq.account.v1', JSON.stringify({ name: '新账号' }));
  form.events.submit({ preventDefault() {} });
  assert(!answered.context.Progress.get('english-exam:2015', live.id));
  answered.context.Progress.record('english-exam:2015', live.id, false);
  assert(answered.values.has('xq.english-progress.v1.user:' + encodeURIComponent('新账号')));
  assert(!answered.values.has('xq.progress.v2'));
  answered.values.delete('xq.account.v1');
  assert(!answered.context.Progress.get('english-exam:2015', live.id));
  assert(answered.context.Progress.errorCount('english-exam:2015', live.id) === 0);
});

test('上海已导入的253小题均有答案，公开补充与原答案分开标注', () => {
  const questions = catalog.papers.flatMap(p => p.questions).filter(q => !q.completionSource);
  assert(questions.length === 253 && questions.every(q => q.answer));
  assert(questions.filter(q => q.answerSource).length === 35);
  const supplements = JSON.parse(read('content/english/past-papers/answer-supplements.json'));
  const paper = exams.find(catalog, 2018);
  assert(paper.questions.filter(q => !q.completionSource).length === 35);
  for (const q of paper.questions.filter(q => !q.completionSource)) {
    assert(q.answer === supplements['2018'].answers[q.originalNo]);
    assert(q.answerSource.review.status === 'pending');
    assert(q.answerSource.urls.length === 2 && q.answerSource.urls.every(url => url.startsWith('https://')));
  }
  assert(exams.find(catalog, 2017).questions.find(q => q.originalNo === 37).answer === 'B');
  assert(exams.find(catalog, 2017).questions.find(q => q.originalNo === 59).answer === 'politely');
  const original = paper.questions.find(q => !q.completionSource);
  const page = setup(2018, { papers: [{ ...paper, questions: [original] }] }), form = page.nodes.find(n => n.tag === 'form');
  form.all().find(n => n.tag === 'input' && n.value === 'A').events.change();
  form.events.submit({ preventDefault() {} });
  const explanation = form.all().find(n => n.className === 'english-explanation');
  assert(!explanation.hidden && explanation.textContent.includes('补充参考答案（公开资料核对·待审核）：A'));
  assert(!explanation.textContent.includes('原资料参考答案'));
  assert(page.context.Progress.status('english-exam:2018', original.id) === 'solved');
});

test('中考纯文本保持下划线，题型筛选和错误年份可正常显示', () => {
  const page = setup(2014);
  assert(page.nodes.some(n => n.tag === 'u'));
  const select = page.nodes.find(n => n.tag === 'select');
  select.value = '词性转换'; select.events.change();
  assert(page.main.all().filter(n => n.tag === 'form').length === 8);
  const main = new Node('main');
  page.context.EnglishExams.renderYear(main, catalog, 2024);
  assert(main.textContent.includes('未收录这一年份'));
});

test('阅读与完形按同篇文章合并，不改变小题 ID、原文或跨类别合并', () => {
  for (const paper of catalog.papers) {
    const groups = exams.questionGroups(paper.questions);
    assert(groups.flat().length === paper.questions.length);
    assert(new Set(groups.flat().map(q => q.id)).size === paper.questions.length);
    for (const category of ['完形填空', '阅读理解']) {
      const originals = paper.questions.filter(q => q.category === category);
      assert(groups.filter(g => g[0].category === category).length === new Set(originals.map(q => q.passage)).size);
    }
  }
  const questions = [
    { id: 'a', category: '阅读理解', passage: 'Text.' },
    { id: 'b', category: '阅读理解', passage: 'Text.' },
    { id: 'c', category: '完形填空', passage: 'Text.' },
    { id: 'd', category: '阅读理解', passage: 'Other text.' }
  ];
  const groups = exams.questionGroups(questions);
  assert(groups.length === 3 && groups[0][0] === questions[0] && groups[0][1] === questions[1]);
});

test('同篇文章只显示一次，漏答整题不提交，统一判分并逐小题统计', () => {
  const questions = ['A', 'B', null].map((answer, i) => ({
    id: 'group-' + i, originalNo: i + 1, category: '阅读理解', type: 'choice',
    passage: 'One complete passage.', stem: 'Question ' + i,
    options: ['one', 'two', 'three', 'four'], answer, explanation: 'Explain ' + i
  }));
  const page = setup(2000, { papers: [{ year: 2000, questions, version: '测试', note: '' }] });
  const forms = page.nodes.filter(n => n.tag === 'form');
  assert(forms.length === 1);
  assert(page.nodes.filter(n => n.className === 'english-exams-passage').length === 1);
  const form = forms[0], entries = form.all().filter(n => n.className === 'english-exams-subquestion');
  assert(entries.length === 3 && form.all().filter(n => n.type === 'submit').length === 1);
  entries[0].all().find(n => n.tag === 'input' && n.value === 'A').events.change();
  form.events.submit({ preventDefault() {} });
  assert(!page.context.Progress.get('english-exam:2000', 'group-0'));
  assert(entries.every(n => n.all().find(el => el.className === 'english-explanation').hidden));
  entries.slice(1).forEach(n => n.all().find(el => el.tag === 'input' && el.value === 'A').events.change());
  form.events.submit({ preventDefault() {} });
  assert(page.context.Progress.status('english-exam:2000', 'group-0') === 'solved');
  assert(page.context.Progress.errorCount('english-exam:2000', 'group-1') === 1);
  assert(!page.context.Progress.get('english-exam:2000', 'group-2'));
  entries.forEach((n, i) => {
    const explanation = n.all().find(el => el.className === 'english-explanation');
    assert(!explanation.hidden && explanation.textContent.includes('Explain ' + i));
  });
  page.values.set('xq.account.v1', JSON.stringify({ name: '另一个账号' }));
  form.events.submit({ preventDefault() {} });
  assert(!page.context.Progress.get('english-exam:2000', 'group-0'));
});

test('首页和英语试题库均有中考入口，真题数据按需加载', () => {
  const html = read('index.html'), app = read('src/app.js');
  assert(app.indexOf("title: '英语中考真题'") > app.indexOf("title: '英语试题库'"));
  assert(app.includes("() => englishExamsPage(parts[1], parts[2], parts[3])"));
  assert(read('src/english-bank.js').includes("exams.href = '#/english-exams'"));
  // 真题数据体积大，不在首屏加载，进入页面时由 app.js 按需加载
  assert(!html.includes('content/english/past-papers/catalog.js') && !html.includes('content/english/past-papers/jiangsu.js'));
  assert(app.includes("'content/english/past-papers/catalog.js?v=") && app.includes("'content/english/past-papers/jiangsu.js?v="));
  assert(html.indexOf('src/english-exams.js') < html.indexOf('src/app.js'));
  assert(app.includes('EnglishExams.stopMedia()'));
  const css = read('src/app.css');
  assert(css.includes('.english-exams-choices') && css.includes('flex-wrap: wrap'));
  assert(css.includes('.english-exams-fill, .english-exams-filter select { min-height: 40px'));
  assert(read('scripts/serve.js').includes("'.mp3': 'audio/mpeg'"));
});

test('江苏目录先选城市再选年份，不把所有试卷混在首页', () => {
  const page = setup(2015), regions = new Node('main'), cities = new Node('main'), years = new Node('main');
  page.context.EnglishExams.renderRegions(regions, catalog, jiangsu);
  const links = regions.all().filter(n => n.tag === 'a');
  assert(links.length === 2 && links[0].href === '#/english-exams/shanghai' && links[1].href === '#/english-exams/jiangsu');
  page.context.EnglishExams.renderCities(cities, jiangsu);
  assert(cities.all().filter(n => n.tag === 'a').length === 13);
  assert(cities.textContent.includes('南通') && !cities.textContent.includes('2018 年'));
  page.context.EnglishExams.renderList(years, jiangsu, 'nantong');
  assert(years.all().filter(n => n.tag === 'a').every(n => n.href.startsWith('#/english-exams/jiangsu/nantong/')));
  assert(!years.textContent.includes('南京'));
  assert(exams.find(jiangsu, 2018) === null, '未选城市不能任取同年试卷');
  assert(exams.find(jiangsu, 2018, 'unknown') === null);
  assert(exams.find(jiangsu, 2018, 'nantong').id === 'js-nantong-2018');
});

test('江苏原题按稳定城市试卷 ID 保存，资料来源及缺失状态明确', () => {
  assert(jiangsu.cities.length === 13);
  assert(jiangsu.papers.length >= 90);
  const ids = new Set();
  for (const paper of jiangsu.papers) {
    assert(paper.id === 'js-' + paper.city + '-' + paper.year);
    assert(paper.review.status === 'pending' && paper.sources.length > 0);
    assert(jiangsu.cities.some(c => c.id === paper.city && c.name === paper.cityName));
    if (paper.questions.length) assert(paper.source && /^[a-f0-9]{64}$/.test(paper.source.sha256));
    else assert(paper.version === '题干待补充');
    for (const q of paper.questions) {
      assert(q.id === paper.id + '-q' + String(q.originalNo).padStart(2, '0'));
      assert(!ids.has(q.id)); ids.add(q.id);
      assert(q.review.status === 'pending' && q.type === 'choice');
      assert(q.options.length === 4 && q.options.every(o => o.trim()));
      assert(q.answer === null || /^[A-D]$/.test(q.answer));
      assert(!/【|\[\[image\]\]|\ufffd/.test(q.stem + q.options.join('') + (q.passage || '')), q.id + ' 不得含缺图或解析');
      if (q.category !== '语法与词汇') assert(q.passage);
    }
  }
  assert(exams.find(jiangsu, 2018, 'nantong').questions.length > 20);
  assert(jiangsu.papers.flatMap(p => p.questions).every(q => /^[A-D]$/.test(q.answer)), '已导入江苏原题须保留已补齐的来源答案');
});

test('同年不同城市与上海的进度不混用，江苏仍按账号隔离', () => {
  const page = setup(2018, jiangsu, 'nantong');
  const paper = exams.find(jiangsu, 2018, 'nantong'), q = paper.questions[0];
  const form = page.nodes.find(n => n.tag === 'form');
  form.all().find(n => n.tag === 'input' && n.value !== q.answer).events.change();
  form.events.submit({ preventDefault() {} });
  assert(page.context.Progress.errorCount('english-exam:js-nantong-2018', q.id) === 1);
  assert(page.context.Progress.errorCount('english-exam:js-nanjing-2018', q.id) === 0);
  assert(page.context.Progress.errorCount('english-exam:2018', q.id) === 0);
  assert(exams.progressGroup(exams.find(catalog, 2018)) === 'english-exam:2018');
  page.values.set('xq.account.v1', JSON.stringify({ name: '城市测试账号' }));
  form.events.submit({ preventDefault() {} });
  assert(page.context.Progress.errorCount('english-exam:js-nantong-2018', q.id) === 0);
  assert(!page.values.has('xq.progress.v2'));
});

test('中考路由的地区、城市、年份层级及返回入口正确，旧上海链接兼容', () => {
  const page = setup(2015), pages = [];
  Object.assign(page.context, {
    EnglishPastPapers: catalog, JiangsuEnglishPastPapers: jiangsu,
    page(title, back) { const main = new Node('main'); pages.push({ title, back, main }); return main; },
    showError(main, message) { main.textContent = message; }
  });
  const source = read('src/app.js');
  const handler = source.slice(source.indexOf('  function englishExamsPage('), source.indexOf('  async function englishPlanPage('));
  vm.runInNewContext(handler, page.context);
  page.context.englishExamsPage();
  assert(pages.at(-1).main.all().filter(n => n.tag === 'a').length === 2);
  page.context.englishExamsPage('jiangsu');
  assert(pages.at(-1).back === '#/english-exams');
  page.context.englishExamsPage('jiangsu', 'nantong');
  assert(pages.at(-1).back === '#/english-exams/jiangsu' && pages.at(-1).title.includes('南通'));
  page.context.englishExamsPage('jiangsu', 'nantong', '2018');
  assert(pages.at(-1).back === '#/english-exams/jiangsu/nantong' && pages.at(-1).title.includes('2018'));
  page.context.englishExamsPage('2015');
  assert(pages.at(-1).title === exams.find(catalog, 2015).title && pages.at(-1).back === '#/english-exams/shanghai');
  page.context.englishExamsPage('shanghai', '2015');
  assert(pages.at(-1).title === exams.find(catalog, 2015).title);
  page.context.englishExamsPage('jiangsu', 'unknown');
  assert(pages.at(-1).main.textContent.includes('返回江苏城市目录'));
});
