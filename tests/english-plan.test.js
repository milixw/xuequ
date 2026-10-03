'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
const plan = require('../src/english-plan.js');
const questions = require('../content/english/question-bank.js');
const knowledge = require('../content/english/knowledge.js');
const vm = require('vm');

test('七天复习计划覆盖全部知识点和原题，且不重复', () => {
  assert(plan.DAYS.length === 7);
  const ids = plan.DAYS.flatMap(day => day.points);
  assert(new Set(ids).size === ids.length, '同一知识点分配到多天');
  for (const point of knowledge.points) assert(ids.includes(point.id), `未安排知识点：${point.id}`);
  const built = plan.buildPlan(questions);
  const assigned = built.flatMap(day => day.groups.flatMap(group => group.questions.map(q => q.id)));
  assert(assigned.length === questions.length, '部分原题未分配');
  assert(new Set(assigned).size === questions.length, '原题重复分配');
  for (const day of built) {
    assert(day.total > 0, `第 ${day.number} 天没有题`);
    assert(day.answerable <= day.total, '参考答案数量超出题量');
  }
});

test('英语错题页有计划入口，页面支持 A4 打印', () => {
  const root = path.join(__dirname, '..');
  const bank = fs.readFileSync(path.join(root, 'src/english-bank.js'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src/app.css'), 'utf8');
  assert(bank.includes("plan.href = '#/english-plan'"));
  assert(app.includes("if (parts[0] === 'english-plan') return englishPlanPage(parts[1], parts[2], parts[3]);"));
  assert(html.indexOf('src/english-plan.js') > html.indexOf('src/english-bank.js'));
  assert(html.indexOf('src/english-plan.js') < html.indexOf('src/app.js'));
  assert(css.includes('@page { size: A4;'));
  assert(css.includes('@media print'));
});

test('七天计划概览仅展示安排，不再插入完整连词讲解', () => {
  const root = path.join(__dirname, '..');
  const ui = fs.readFileSync(path.join(root, 'src', 'english-plan.js'), 'utf8');
  const overview = ui.slice(ui.indexOf('function renderOverview('), ui.indexOf('function renderDay('));
  assert(!overview.includes('完整讲解、连词用法清单与常见错误'));
  assert(!overview.includes('english-plan-primer'));
  assert(!overview.includes('knowledgeIntro('), '概览不应重复展示完整知识点');
  assert(overview.includes("const list = element('div', 'english-plan-days')"), '必须保留七天安排');
  const day = ui.slice(ui.indexOf('function renderDay('), ui.indexOf('function renderResult('));
  assert(day.includes('root.EnglishBank.knowledgeIntro(group.point)'), '每日题目前的知识点讲解应保留');
});

test('每日完整原题直接作答，选项紧凑排列且无需额外外框', () => {
  const root = path.join(__dirname, '..');
  const ui = fs.readFileSync(path.join(root, 'src', 'english-plan.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src', 'app.css'), 'utf8');
  const day = ui.slice(ui.indexOf('function renderDay('));
  assert(day.includes('appendQuestion(card, ordinal, q.text)'), '每日题卡没有使用完整原题');
  assert(ui.includes("line.appendChild(element('strong', 'english-plan-number', `第 ${ordinal} 题 · `))"),
    '题号没有和题干放在同一行');
  assert(!day.includes('`第 ${ordinal} 题 · ${group.point.title}`'), '题号后仍显示知识点名称');
  assert(!day.includes("q.text.replace(/\\s+/g, ' ')"), '每日题卡仍把换行合并为空格');
  assert(css.includes('.english-plan-question { white-space: pre-wrap;'), '每日题卡没有保留换行的样式');
  assert(day.includes('link.href = `#/english-bank/${q.id}`'), '点击题卡不能打开原题');
  assert(!day.includes('打开原题作答或查看参考答案'), '题卡仍显示多余的打开提示');
  assert(day.includes("element('div', 'english-plan-choices')"), '选择题应直接显示选项');
  assert(!day.includes("element('fieldset'"), '选择题不应有额外外框');
  assert(!day.includes('选择一个答案'), '选择题不应有额外提示标题');
  assert(css.includes('.english-plan-choices { display: flex; flex-wrap: wrap;'), '选项应在空间足够时同排');
  assert(!day.includes('显示更多'), '每天应展开全部题目');
  assert(day.includes("root.location.hash = `#/english-plan/${day.number}/result`"), '提交后应跳转错题页');
});

test('七天计划只对可靠完整作答判分，提交结果保留错题答案', () => {
  const choice = questions.find(q => q.type === 'choice' &&
    plan.questionMode(q).kind === 'choice' && plan.questionMode(q).answer);
  const cloze = questions.find(q => q.type === 'cloze' && plan.questionMode(q).answer);
  const reading = questions.find(q => q.type === 'reading' &&
    plan.questionMode(q).kind === 'reading-multi');
  assert(choice && cloze && reading, '应有可判分的选择、完形和阅读原题');
  const mode = plan.questionMode(choice);
  const wrongLetter = mode.options.find(option => option.letter !== mode.answer).letter;
  const day = { groups: [{ questions: [choice, cloze, reading] }] };
  const responses = { [choice.id]: wrongLetter, [cloze.id]: plan.questionMode(cloze).answer };
  const graded = plan.gradeDay(day, responses);
  assert(graded.total === 3 && graded.gradable === 3 && graded.attempted === 2);
  assert(graded.correct === 1 && graded.wrong.length === 1 && graded.unanswered === 1);
  assert(graded.wrong[0].selected === wrongLetter && graded.wrong[0].answer === mode.answer);
});

test('错题打印记录独立保存题干和答案，重复打开不重复，后续提交不覆盖', () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/english-plan.js'), 'utf8');
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  };
  function load() {
    const context = { localStorage: storage, EnglishKnowledge: knowledge,
      EnglishBank: require('../src/english-bank.js') };
    context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
  vm.runInNewContext(source, context);
    return context.EnglishPlan;
  }
  const api = load();
  const q = questions.find(q => plan.questionMode(q).kind === 'cloze' && plan.questionMode(q).answer);
  const answer = plan.questionMode(q).answer.slice();
  const selected = answer.map(() => 'A');
  const result = { submittedAt: 1000, attempted: 1, correct: 0, unanswered: 0, ungradable: 0,
    wrong: [{ id: q.id, selected, answer }] };
  const report = api.createReport(6, result, [q]);
  assert(api.saveReport(report));
  selected[0] = 'D';
  answer[0] = 'D';
  assert(report.wrong[0].selected[0] === 'A', '选择快照应独立于草稿');
  assert(api.saveReport(api.createReport(6, result, [{ ...q, text: '已修改题干' }])));
  assert(api.reportsFor(6).length === 1, '同次提交不应重复归档');
  assert(api.reportsFor(6)[0].wrong[0].text === q.text, '旧快照题干不应被题库更新覆盖');
  assert(api.saveReport(api.createReport(6, { ...result, submittedAt: 2000 }, [q])));
  const restored = load().reportsFor(6);
  assert(restored.length === 2 && restored[0].submittedAt === 2000, '重开页面应还原历史且新记录在前');
  assert(restored[1].wrong[0].answer[0] === report.wrong[0].answer[0]);
  assert(load().reportsFor(1).length === 0, '记录应按天筛选');
  storage.setItem = () => { throw new Error('storage full'); };
  assert(!api.saveReport({ ...report, id: 'new' }), '保存失败须返回明确结果');
});

test('已有结果页自动记录当前错题，刷新后可脱离题库还原并打印', () => {
  class Node {
    constructor(tag) { this.tag = tag; this.children = []; this.events = {}; this.value = ''; }
    set textContent(value) { this.text = String(value); this.children = []; }
    get textContent() { return (this.text || '') + this.children.map(n => n.textContent).join(''); }
    appendChild(node) { this.children.push(node); return node; }
    append(...nodes) { this.children.push(...nodes); }
    setAttribute(key, value) { this[key] = value; }
    addEventListener(name, handler) { this.events[name] = handler; }
    find(tag) { return this.tag === tag ? this : this.children.map(n => n.find(tag)).find(Boolean); }
    findAll(tag) { return (this.tag === tag ? [this] : []).concat(this.children.flatMap(n => n.findAll(tag))); }
  }
  const q = plan.buildPlan(questions)[0].groups[0].questions.find(q => plan.questionMode(q).answer);
  const mode = plan.questionMode(q);
  const wrong = mode.options.find(option => option.letter !== mode.answer).letter;
  const submitted = { submittedAt: 1000, attempted: 1, correct: 0, unanswered: 0, ungradable: 0,
    wrong: [{ id: q.id, selected: wrong, answer: mode.answer }] };
  const values = new Map([['xq.english-plan.v2.guest', JSON.stringify({ drafts: {}, results: { 1: submitted } })]]);
  const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  let prints = 0;
  const source = fs.readFileSync(path.join(__dirname, '../src/english-plan.js'), 'utf8');
  function open(bank, reportId, view = 'result') {
    const context = { localStorage: storage, EnglishKnowledge: knowledge,
      EnglishBank: { ...require('../src/english-bank.js'), knowledgeIntro: () => new Node('section') },
      document: { createElement: tag => new Node(tag), createTextNode: text => {
        const node = new Node('#text'); node.textContent = text; return node;
      } },
      print: () => prints++, location: {} };
    context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/progress.js'), 'utf8'), context);
    context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
  vm.runInNewContext(source, context);
    const main = new Node('main');
    if (view === 'day') context.EnglishPlan.renderDay(main, bank, 1);
    else context.EnglishPlan.renderResult(main, bank, 1, reportId);
    return main;
  }
  const page = open(questions);
  assert(page.textContent.includes(q.text), '应展示已有错题原文');
  assert(page.textContent.includes(plan.questionMode(q).answer));
  assert(page.textContent.includes(require('../src/english-bank.js').explanationFor(q).text), '错题页必须补取题目解析');
  assert(page.textContent.includes('累计答错 1 次'), '现有错题应回填并显示错误次数');
  assert(JSON.parse(values.get('xq.english-plan-prints.v2.guest')).length === 1, '现有结果应自动保存');
  const firstReport = JSON.parse(values.get('xq.english-plan-prints.v2.guest'))[0];
  values.set('xq.english-plan.v2.guest', JSON.stringify({ drafts: { 1: { [q.id]: mode.answer } }, results: { 1: submitted } }));
  const answerPage = open(questions, undefined, 'day');
  answerPage.find('form').events.submit({ preventDefault() {} });
  const afterSubmit = JSON.parse(values.get('xq.english-plan-prints.v2.guest'));
  assert(afterSubmit.length === 2 && afterSubmit[1].wrong.length === 0, '每次有效提交都应留记录，包括全部答对');
  const latestPage = open(questions);
  assert(JSON.parse(values.get('xq.errors.v2.guest')).counts['english-bank'][q.id] === 1, '答对不能增加错误次数');
  const links = latestPage.findAll('a').map(link => link.href);
  for (const report of afterSubmit) {
    assert(links.includes(`#/english-plan/1/result/${report.id}`), '每次提交应有时间点独立入口');
  }
  const historicPage = open([], firstReport.id);
  assert(historicPage.textContent.includes(q.text), '有新提交后，旧入口仍应打开旧错题');
  assert(historicPage.textContent.includes('第 1 题 · '), '错题格式应保持题号与原题在同一行');
  const supplemented = open(questions.map(item => item.id === q.id ? { ...item, explanation: '重新补回的原题解析' } : item), firstReport.id);
  assert(supplemented.textContent.includes('重新补回的原题解析'), '旧时间点入口应读取新增解析，无需重新提交');
  assert(historicPage.textContent.includes('待补充'), '题库暂不可用时不应编造解析');
  values.delete('xq.english-plan.v2.guest');
  const restored = open([], firstReport.id);
  assert(restored.textContent.includes(q.text), '原题暂不可用时应从打印快照还原');
  assert(restored.textContent.includes(`你的选择：${wrong}`));
  assert(restored.textContent.includes(`参考答案：${mode.answer}`));
  assert(restored.textContent.includes('累计答错 1 次'), '打开历史错题不能重复累计错误');
  restored.find('button').events.click();
  assert(prints === 1, '结果页打印按钮应调用浏览器打印');
  const css = fs.readFileSync(path.join(__dirname, '../src/app.css'), 'utf8');
  const printCss = css.slice(css.indexOf('@media print'));
  assert(/\.english-plan-review \.english-plan-your-answer,[\s\S]*?\.english-plan-review \.english-plan-correct-answer\s*\{\s*display:\s*none !important/.test(printCss),
    '打印时必须隐藏作答选择和参考答案');
  assert(printCss.includes('.english-error-count,'), '打印应继续保持原题格式，不附加错误次数');
  assert(printCss.includes('.english-explanation,'), '打印原题不能包含解析');
});
