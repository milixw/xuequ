'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
const plan = require('../src/english-plan.js');
const questions = require('../content/english/question-bank.js');
const knowledge = require('../content/english/knowledge.js');

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
  assert(app.includes("if (parts[0] === 'english-plan') return englishPlanPage(parts[1], parts[2]);"));
  assert(html.indexOf('src/english-plan.js') > html.indexOf('src/english-bank.js'));
  assert(html.indexOf('src/english-plan.js') < html.indexOf('src/app.js'));
  assert(css.includes('@page { size: A4;'));
  assert(css.includes('@media print'));
});

test('七天计划概览先展示连词讲解，再展示第一天安排', () => {
  const root = path.join(__dirname, '..');
  const ui = fs.readFileSync(path.join(root, 'src', 'english-plan.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'src', 'app.css'), 'utf8');
  const overview = ui.slice(ui.indexOf('function renderOverview('), ui.indexOf('function renderDay('));
  assert(overview.includes("'先学：连词与状语从句'"));
  assert(overview.includes("root.EnglishBank.knowledgeIntro(KNOWLEDGE.get('connectors'))"));
  assert(overview.indexOf('main.appendChild(primer)') < overview.indexOf("const list = element('div', 'english-plan-days')"));
  assert(css.includes('.english-plan-primer { display: none !important; }'), 'A4 打印应保持七天计划精简');
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
