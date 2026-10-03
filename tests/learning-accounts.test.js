'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');
const { create } = require('../src/learning-store.js');
const questions = require('../content/english/question-bank.js');
const bank = require('../src/english-bank.js');
const knowledge = require('../content/english/knowledge.js');
const q = questions.find(q => q.type === 'choice' && /^[A-D]$/.test(q.answer));
const sourceName = '我是臭诗琪';
const targetName = '我是臭恩铭';
const targetScope = `user:${encodeURIComponent(targetName)}`;

function environment(values = new Map()) {
  const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  function signIn(name) {
    if (name) values.set('xq.account.v1', JSON.stringify({ name })); else values.delete('xq.account.v1');
  }
  const store = create(storage);
  const context = { localStorage: storage, LearningStore: store, EnglishKnowledge: knowledge,
    EnglishBank: bank };
  for (const file of ['progress', 'english-plan']) {
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, `../src/${file}.js`), 'utf8'), context);
  }
  return { values, storage, store, context, signIn, progress: context.Progress, plan: context.EnglishPlan };
}

function report(id = '1-1000') {
  return { id, day: 1, submittedAt: 1000, attempted: 1, correct: 0, unanswered: 0, ungradable: 0,
    wrong: [{ id: q.id, text: q.text, answer: q.answer, selected: q.answer === 'A' ? 'B' : 'A', topic: '语法' }] };
}

test('同页切换中文账号，提交记录、错误次数与英语进度各自独立', () => {
  const e = environment();
  e.signIn(sourceName);
  e.progress.record('english-bank', q.id, false, `english-plan:1-1000:${q.id}`);
  assert(e.plan.saveReport(report()));
  assert(e.plan.reportsFor(1).length === 1 && e.progress.errorCount('english-bank', q.id) === 1);
  e.signIn(targetName);
  assert(e.plan.reportsFor(1).length === 0, '新账号不能看到另一人的历史');
  assert(e.progress.errorCount('english-bank', q.id) === 0 && e.progress.get('english-bank', q.id) === null);
  e.progress.record('english-bank', q.id, false, `english-plan:1-1000:${q.id}`);
  e.progress.record('english-bank', q.id, false, `english-plan:1-1000:${q.id}`);
  assert(e.progress.errorCount('english-bank', q.id) === 1, '跨账号相同事件应独立，账号内应去重');
  e.plan.saveReport({ ...report(), correct: 1, wrong: [] });
  e.signIn(sourceName);
  assert(e.plan.reportsFor(1)[0].wrong.length === 1);
  assert(e.progress.get('english-bank', q.id).tries === 1);
  e.signIn(null);
  assert(e.plan.reportsFor(1).length === 0 && e.progress.errorCount('english-bank', q.id) === 0);
  e.progress.record('english-bank', q.id, true);
  e.signIn(sourceName);
  assert(!e.progress.get('english-bank', q.id).solved, '访客答对不能更新登录账号');
});

test('旧共享记录只迁移给指定账号，保留备份与错误事件，重复启动不重复', () => {
  const r = report();
  const values = new Map([
    ['xq.english-plan-prints.v1', JSON.stringify([r])],
    ['xq.english-plan.v1', JSON.stringify({ drafts: { 1: { [q.id]: 'A' } }, results: {} })],
    ['xq.english-plan-retry.v1', JSON.stringify({ drafts: { [r.id]: { [q.id]: 'B' } }, submissions: {} })],
    ['xq.errors.v1', JSON.stringify({ counts: { 'english-bank': { [q.id]: 3 } }, events: { [`english-plan:${r.id}:${q.id}`]: true } })],
    ['xq.progress.v2', JSON.stringify({ 'english-bank': { [q.id]: { tries: 4, solved: false, revealed: true } }, math: { q: { solved: true } } })],
  ]);
  const backup = values.get('xq.english-plan-prints.v1');
  let e = environment(values);
  assert(e.plan.reportsFor(1).length === 0, '未登录不能看到已归入账号的旧数据');
  e.signIn(sourceName);
  assert(e.plan.reportsFor(1).length === 0);
  e.signIn(targetName);
  assert(e.plan.reportsFor(1).length === 1);
  assert(e.progress.errorCount('english-bank', q.id) === 3);
  assert(e.progress.get('english-bank', q.id).tries === 4);
  assert(e.store.read('xq.english-plan-retry.v2', null).drafts[r.id][q.id] === 'B');
  assert(JSON.parse(values.get('xq.learning-migration.v1')).owner === targetName);
  e = environment(values);
  assert(e.plan.reportsFor(1).length === 1 && e.progress.errorCount('english-bank', q.id) === 3);
  assert(values.get('xq.english-plan-prints.v1') === backup, '不能修改旧共享备份');
  assert(JSON.parse(values.get('xq.progress.v2')).math.q.solved, '数学共享进度不能丢失');
});

test('迁移 ID 冲突保留双方原题，重做关联同步；错误仅按已知记录补回', () => {
  const old = report();
  const own = { ...old, wrong: [{ ...old.wrong[0], text: '目标账号已有题干' }] };
  const values = new Map([
    ['xq.english-plan-prints.v1', JSON.stringify([old])],
    [`xq.english-plan-prints.v2.${targetScope}`, JSON.stringify([own])],
    ['xq.english-plan-retry.v1', JSON.stringify({ drafts: { [old.id]: { [q.id]: 'A' } },
      submissions: { [old.id]: { sourceId: old.id, review: old.wrong } } })],
  ]);
  const e = environment(values);
  e.signIn(targetName);
  const records = e.plan.reportsFor(1);
  assert(records.length === 2);
  const copied = records.find(item => item.id !== old.id);
  assert(copied.wrong[0].text === old.wrong[0].text && records.find(item => item.id === old.id).wrong[0].text === '目标账号已有题干');
  const retry = e.store.read('xq.english-plan-retry.v2', null);
  assert(retry.submissions[copied.id].sourceId === copied.id && retry.drafts[copied.id][q.id] === 'A');
  assert(e.progress.errorCount('english-bank', q.id) === 2, '两份不同记录各有一次明确错答');
});

test('旧数据迁移失败不标记完成，修复存储后重试不会删除或重复', () => {
  const values = new Map([['xq.english-plan-prints.v1', JSON.stringify([report()])]]);
  const storage = { getItem: key => values.get(key) || null, setItem: () => { throw Error('disabled'); } };
  create(storage);
  assert(!values.has('xq.learning-migration.v1'));
  storage.setItem = (key, value) => values.set(key, value);
  create(storage);
  create(storage);
  assert(values.has('xq.learning-migration.v1') && JSON.parse(values.get(`xq.english-plan-prints.v2.${targetScope}`)).length === 1);
  const weird = create(new MapStorage());
  assert(weird.scope() === `user:${encodeURIComponent('a.b/中文:guest')}`);
  function MapStorage() {
    this.getItem = key => key === 'xq.account.v1' ? JSON.stringify({ name: 'a.b/中文:guest' }) : null;
    this.setItem = () => {};
  }
  // 与普通 guest 键不同，特殊字符不会改变键的归属。
  assert(weird.key('xq.errors.v2') !== 'xq.errors.v2.guest');
  const broken = create({ getItem: () => 'null', setItem: () => {} });
  assert(broken.scope() === 'guest' && !broken.hasLegacy(), '空的旧存储不能导致页面崩溃');
});

test('早期仅有最近提交、缺少打印快照的旧数据也保留时间入口', () => {
  const result = { submittedAt: 1000, attempted: 1, correct: 0, unanswered: 0, ungradable: 0,
    wrong: [{ id: q.id, selected: 'A', answer: q.answer }] };
  const values = new Map([
    ['xq.english-plan.v1', JSON.stringify({ results: { 1: result } })],
    [`xq.english-plan.v2.${targetScope}`, JSON.stringify({ drafts: {}, results: { 1: { ...result, submittedAt: 2000 } } })],
  ]);
  const e = environment(values);
  e.signIn(targetName);
  const old = e.plan.reportsFor(1).find(report => report.id === '1-1000');
  assert(old, '不能只因目标账号已有当日提交就丢弃旧结果');
  const restored = e.plan.retryQuestions(old, [q])[0];
  assert(restored.text === q.text && restored.answer === q.answer);
  assert(e.store.read('xq.english-plan.v2', null).results[1].submittedAt === 2000, '不能覆盖目标最新结果');
  assert(e.progress.errorCount('english-bank', q.id) === 2, '两次明确错答应分别统计');
});

test('旧页面在跨标签切换账号后拒绝提交，重新打开恢复自己的草稿', () => {
  class Node {
    constructor(tag) { this.tag = tag; this.children = []; this.events = {}; }
    set textContent(value) { this.text = String(value); this.children = []; }
    get textContent() { return (this.text || '') + this.children.map(node => node.textContent).join(''); }
    appendChild(node) { this.children.push(node); return node; }
    append(...nodes) { this.children.push(...nodes); }
    setAttribute(key, value) { this[key] = value; }
    addEventListener(name, fn) { this.events[name] = fn; }
    all() { return [this, ...this.children.flatMap(node => node.all())]; }
  }
  const e = environment();
  e.context.document = { createElement: tag => new Node(tag), createTextNode: text => {
    const node = new Node('#text'); node.textContent = text; return node;
  } };
  e.context.EnglishBank = { ...bank, knowledgeIntro: () => new Node('section') };
  // 在 plan 初始化时捕获的 BANK 只用于纯函数，页面讲解从 root.EnglishBank 读取。
  e.context.location = {};
  const allPlan = require('../src/english-plan.js').buildPlan([q]);
  const day = allPlan.find(day => day.total).number;
  e.signIn(sourceName);
  const main = new Node('main');
  e.plan.renderDay(main, [q], day);
  const radio = main.all().find(node => node.tag === 'input');
  radio.events.change();
  e.signIn(targetName);
  main.all().find(node => node.tag === 'form').events.submit({ preventDefault() {} });
  radio.events.change();
  assert(main.textContent.includes('账号已切换'));
  assert(e.plan.reportsFor(day).length === 0);
  assert(!e.store.read('xq.english-plan.v2', null), '旧表单不能创建新账号的草稿');
  e.signIn(sourceName);
  assert(e.store.read('xq.english-plan.v2', null).drafts[day][q.id] === radio.value);
});
