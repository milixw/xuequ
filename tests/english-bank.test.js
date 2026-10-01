'use strict';

const { test, assert } = require('./harness');
const fs = require('fs');
const path = require('path');
const questions = require('../content/english/question-bank.js');
const bank = require('../src/english-bank.js');
const knowledge = require('../content/english/knowledge.js');
const Progress = require('../src/progress.js').Progress;

test('英语题库数据含主要题型和可追溯来源', () => {
  assert(questions.length >= 450, '导入题量异常');
  const counts = bank.categoryCounts(questions);
  for (const type of ['choice', 'cloze', 'reading']) assert(counts[type] > 0, `缺少 ${type}`);
  const ids = new Set();
  for (const q of questions) {
    assert(/^xdf-[0-9a-f]{16}$/.test(q.id) && !ids.has(q.id), `题目 ID 异常：${q.id}`);
    ids.add(q.id);
    assert(q.review === 'pending', `${q.id} 未标待核对`);
    assert(q.text && q.text.length >= 12, `${q.id} 题干为空`);
    assert(Array.isArray(q.sources) && q.sources.length > 0, `${q.id} 缺少来源`);
    assert(q.sources.every(s => /^错题_\d+_\d+_\d+\.pdf$/.test(s.file) && s.number > 0 && s.page > 0), `${q.id} 来源异常`);
  }
});

test('英语题目页面不展示导入来源编号，来源数据仍保留', () => {
  const ui = fs.readFileSync(path.join(__dirname, '..', 'src', 'english-bank.js'), 'utf8');
  assert(!ui.includes('sourceLabel('), '题目页仍生成来源标签');
  assert(!ui.includes('重复来源'), '题目页仍展示重复来源数量');
  assert(!ui.includes('原第 ${source.number} 题'), '题目页仍展示原题号');
  assert(questions.every(q => q.sources.length > 0), '来源数据被意外删除');
});

test('英语题库不包含 PDF 页眉及学生标识', () => {
  const text = JSON.stringify(questions);
  assert(!/学号|SH\d{6,}|新东方智慧学习机|英语错题|梁恩铭/.test(text), '疑似包含源 PDF 学生信息');
});

test('英语原题解析补回并与 AI 待审核讲解区分', () => {
  const supplements = require('../content/english/explanation-supplements.js');
  assert(questions.filter(q => q.explanation).length === 430, '原文解析覆盖数量异常');
  for (const q of questions) {
    assert(q.explanation === null || typeof q.explanation === 'string');
    if (q.explanation) {
      assert(q.explanation !== '无' && bank.explanationFor(q).text === q.explanation);
      assert(bank.explanationFor(q).title.includes('原题解析'));
    }
    if (q.answer) assert(q.explanation || supplements[q.id], `${q.id} 有答案但缺少解析`);
  }
  assert(Object.keys(supplements).length === 10);
  for (const [id, entry] of Object.entries(supplements)) {
    const q = questions.find(q => q.id === id);
    assert(q && q.answer && !q.explanation, `${id} 不应覆盖原文解析`);
    assert(entry.review.status === 'pending' && entry.source === 'ai-supplement');
    assert(entry.explanation.length > 100 && bank.explanationFor(q).title.includes('AI'));
  }
  assert(bank.explanationFor({ id: 'missing' }).text.includes('待补充'));
  const when = questions.find(q => /I was writing a letter at home/.test(q.text));
  assert(when.explanation.includes('while') && when.explanation.includes('故选B'));
  const storytelling = questions.find(q => q.text.startsWith('Storytelling is one of humanity'));
  assert(storytelling.explanation.includes('oldest') && storytelling.explanation.includes('likely'));
  const index = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  assert(index.indexOf('content/english/explanation-supplements.js') < index.indexOf('src/english-bank.js'));
});

test('英语答题后显示解析，重新打开保留，重置隐藏', () => {
  const vm = require('vm');
  class Node {
    constructor(tag) { this.tag = tag; this.children = []; this.events = {}; }
    set textContent(value) { this.text = String(value); this.children = []; }
    get textContent() { return (this.text || '') + this.children.map(n => n.textContent).join(''); }
    appendChild(node) { this.children.push(node); return node; }
    append(...nodes) { this.children.push(...nodes); }
    setAttribute(key, value) { this[key] = value; }
    addEventListener(name, handler) { this.events[name] = handler; }
    all() { return [this, ...this.children.flatMap(n => n.all())]; }
  }
  const values = new Map();
  const context = {
    EnglishKnowledge: knowledge,
    EnglishExplanationSupplements: require('../content/english/explanation-supplements.js'),
    document: { createElement: tag => new Node(tag) },
    localStorage: { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) },
  };
  context.window = { confirm: () => true };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/progress.js'), 'utf8'), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/english-bank.js'), 'utf8'), context);
  const q = questions.find(q => q.type === 'choice' && q.answer && q.explanation);
  function open() {
    const main = new Node('main'); context.EnglishBank.detailPage(main, [q], q.id); return main.all();
  }
  const nodes = open();
  const explanation = nodes.find(n => n.className === 'english-explanation');
  assert(explanation.hidden, '作答前不能泄露解析');
  const choice = nodes.find(n => n['aria-label'] === `选择 ${q.answer === 'A' ? 'B' : 'A'}`);
  choice.events.click();
  assert(!explanation.hidden && explanation.textContent.includes(q.explanation), '答错后必须显示原解析');
  assert(!open().find(n => n.className === 'english-explanation').hidden, '刷新后应显示已作答题的解析');
  nodes.find(n => n.className === 'english-reset').events.click();
  assert(explanation.hidden, '重置后应隐藏解析');
  nodes.find(n => n.className === 'english-reveal').events.click();
  assert(!explanation.hidden, '查看答案也应显示解析');
  const cloze = questions.find(q => q.text.startsWith('Storytelling is one of humanity'));
  const clozePage = new Node('main');
  context.EnglishBank.detailPage(clozePage, [cloze], cloze.id);
  const clozeNodes = clozePage.all();
  const clozeExplanation = clozeNodes.find(n => n.className === 'english-explanation');
  const selects = clozeNodes.filter(n => n.tag === 'select');
  const form = clozeNodes.find(n => n.tag === 'form');
  form.events.submit({ preventDefault() {} });
  assert(clozeExplanation.hidden, '未答完不应展示解析');
  selects.forEach(select => { select.value = 'A'; });
  form.events.submit({ preventDefault() {} });
  assert(!clozeExplanation.hidden && clozeExplanation.textContent.includes(cloze.explanation));
});

test('英语题库筛选及选项识别', () => {
  const filtered = bank.filterQuestions(questions, 'choice', 'national flag');
  assert(filtered.length > 0 && filtered.every(q => q.type === 'choice' && /national flag/i.test(q.text)));
  assert(bank.optionLetters('A. one\nB. two\nC. three\nD. four').join('') === 'ABCD');
});

test('全部英语错题都有主要知识点，知识介绍待审核', () => {
  const known = new Set(knowledge.points.map(p => p.id));
  assert(known.size === knowledge.points.length, '知识点 ID 重复');
  for (const point of knowledge.points) {
    assert(point.review.status === 'pending', `${point.id} 未标待审核`);
    assert(point.title && point.intro.length > 25 && point.example, `${point.id} 介绍不完整`);
    assert(Array.isArray(point.steps) && point.steps.length >= 3 &&
      point.steps.every(item => item.length > 25), `${point.id} 缺少具体判断步骤`);
    assert(Array.isArray(point.commonErrors) && point.commonErrors.length >= 3 &&
      point.commonErrors.every(item => item.length > 25), `${point.id} 缺少带错因的常见错误讲解`);
  }
  const counts = bank.knowledgeCounts(questions);
  assert(Object.values(counts).reduce((n, count) => n + count, 0) === questions.length);
  for (const q of questions) assert(known.has(knowledge.classify(q)), `${q.id} 没有知识点`);
  assert(counts.connectors > 30 && counts.pronouns > 20 && counts.nonfinite > 20);
  assert(counts.mixed < questions.length / 5, '待细分题过多');
});

test('英语错题复习先讲知识点和常见错误，再列原题', () => {
  const bankUI = fs.readFileSync(path.join(__dirname, '..', 'src', 'english-bank.js'), 'utf8');
  const planUI = fs.readFileSync(path.join(__dirname, '..', 'src', 'english-plan.js'), 'utf8');
  assert(bankUI.includes("errorsHeading.textContent = '常见错误'"));
  assert(bankUI.includes("stepsHeading.textContent = '怎么判断、怎么做'"));
  assert(bankUI.includes('section.append(title, knowledgeIntro(point), items, more)'));
  assert(planUI.indexOf('section.appendChild(root.EnglishBank.knowledgeIntro(group.point))') <
    planUI.indexOf('section.appendChild(card)'), '每日复习没有先讲再练');
});

test('连词清单按用途列全常见项目，逐项给出独立例句', () => {
  const point = knowledge.get('connectors');
  assert(point.conjunctionNote.includes('不等同于官方逐词必背表') ||
    point.conjunctionNote.includes('复习清单'));
  assert(point.conjunctionGroups.length >= 8);
  const items = point.conjunctionGroups.flatMap(group => group.items);
  assert(items.length >= 40, '连词清单项目过少');
  for (const term of ['and', 'but', 'or', 'so', 'when', 'while', 'if', 'unless',
    'because', 'although', 'so that', 'so ... that ...', 'such ... that ...',
    'either ... or ...', 'neither ... nor ...', 'that', 'whether']) {
    assert(items.some(item => item[0] === term), `缺少 ${term}`);
  }
  for (const [term, meaning, example] of items) {
    assert(term && meaning.length >= 3 && example.length >= 20, `${term} 缺少用法或例句`);
    assert(!questions.some(q => q.text.includes(example)), `${term} 例句泄露原题`);
  }
});

test('易混连词逐组讲区别、给对比例句和易错提醒', () => {
  const point = knowledge.get('connectors');
  assert(point.confusables.length >= 10, '易混连词覆盖不足');
  for (const title of ['when / while / as', 'because / since / as', 'if / whether',
    'if ... not / unless', 'so ... that / such ... that / so that']) {
    assert(point.confusables.some(item => item.title === title), `缺少辨析：${title}`);
  }
  for (const item of point.confusables) {
    assert(item.rule.length >= 40 && item.pitfall.length >= 20 && item.examples.length >= 2,
      `${item.title} 的辨析不完整`);
    assert(item.examples.every(example => example.length >= 20 &&
      !questions.some(q => q.text.includes(example))), `${item.title} 例句过短或泄露原题`);
  }
  const ui = fs.readFileSync(path.join(__dirname, '..', 'src', 'english-bank.js'), 'utf8');
  assert(ui.includes("? '容易混淆的连词与连接结构'"));
  assert(ui.indexOf('if (confusableGuide) box.appendChild(confusableGuide)') <
    ui.indexOf('box.appendChild(errors)'), '易混辨析未放在原题前的知识讲解中');
});

test('其余题型也有独立易混辨析并在原题前复用', () => {
  for (const point of knowledge.points.filter(item => item.id !== 'connectors')) {
    assert(point.confusables.length >= 3, `${point.id} 易混辨析不足`);
    for (const item of point.confusables) {
      assert(item.title && item.rule.length >= 35 && item.pitfall.length >= 18,
        `${point.id} 的 ${item.title} 缺少区别或易错提醒`);
      assert(item.examples.length >= 2 && item.examples.every(example => example.length >= 20 &&
        !questions.some(q => q.text.includes(example))), `${point.id} 的例句不完整或泄露原题`);
    }
  }
  const ui = fs.readFileSync(path.join(__dirname, '..', 'src', 'english-bank.js'), 'utf8');
  assert(ui.includes("'容易混淆的知识点'"));
  assert(ui.includes('if (point.confusables)'));
});

test('知识点筛选保留原题，代表题归类正确', () => {
  const examples = [
    [/I was writing a letter at home/, 'connectors'],
    [/There are three books on the shelf/, 'pronouns'],
    [/The number of people that had bought tickets/, 'quantity'],
    [/I haven't decided when doing it/, 'nonfinite'],
    [/Storytelling is one of humanity/, 'cloze'],
  ];
  for (const [pattern, id] of examples) {
    const q = questions.find(item => pattern.test(item.text));
    assert(q && knowledge.classify(q) === id, `${pattern} 归类错误`);
    assert(bank.filterQuestions(questions, 'all', '', id).some(item => item.id === q.id));
  }
});

test('自动归类以选项考点为先，避免背景词误分', () => {
  const cases = [
    ['xdf-5d27db6f9be93dd2', 'connectors'], // someone 只是背景词，选项是连词
    ['xdf-00684949199af900', 'connectors'], // have another try 不是非谓语考点
    ['xdf-58a1347499d5baf7', 'nonfinite'], // 明确是 to solve 等动词形式
    ['xdf-3c9ec84473ae3123', 'comparison'], // interesting / interested
  ];
  for (const [id, expected] of cases) {
    const q = questions.find(item => item.id === id);
    assert(q && knowledge.classify(q) === expected, `${id} 误归为 ${q && knowledge.classify(q)}`);
  }
});

test('完形填空每空均能选择，Storytelling 题识别 10 组选项和答案', () => {
  const item = questions.find(q => q.text.startsWith('Storytelling is one of humanity'));
  assert(item && item.type === 'cloze');
  const parsed = bank.parseCloze(item.text);
  assert(parsed && parsed.items.length === 10);
  assert(parsed.passage.startsWith('Storytelling is one of humanity'));
  assert(parsed.items[0].options.map(o => o.letter).join('') === 'ABCD');
  assert(parsed.items[0].options[2].text === 'oldest');
  assert(bank.parseClozeAnswers(item.answer, 10).join('') === 'CADCCDBDDA');
  assert(bank.parseClozeAnswers('(1) C', 10) === null, '不完整答案不能用于判分');
});

test('所有导入的完形题均可按题号拆分选项和参考答案', () => {
  for (const item of questions.filter(q => q.type === 'cloze')) {
    const parsed = bank.parseCloze(item.text);
    assert(parsed && parsed.items.length >= 5, `${item.id} 选项未识别`);
    const answers = bank.parseClozeAnswers(item.answer, parsed.items.length);
    assert(answers && answers.length === parsed.items.length, `${item.id} 答案未识别`);
    assert(parsed.items.every((part, i) => part.options.some(o => o.letter === answers[i])), `${item.id} 答案不在选项中`);
  }
});

test('重置英语本题会取消完成记录且不影响其它题', () => {
  const group = 'english-bank';
  const first = 'reset-test-a';
  const second = 'reset-test-b';
  Progress.record(group, first, true);
  Progress.reveal(group, first);
  Progress.record(group, second, false);
  assert(Progress.errorCount(group, second) > 0);
  const secondErrors = Progress.errorCount(group, second);
  assert(Progress.status(group, first) === 'solved');
  assert(Progress.clear(group, first) === true);
  assert(Progress.get(group, first) === null);
  assert(Progress.status(group, first) === 'new');
  assert(Progress.status(group, second) === 'tried');
  assert(Progress.solvedCount(group) === 0);
  assert(!JSON.parse(localStorage.getItem('xq.progress.v2'))[group][first]);
  assert(Progress.clear(group, first) === false);
  Progress.clear(group, second);
  assert(Progress.errorCount(group, second) === secondErrors, '重置练习应保留累计错误次数');
});
