'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');
const source = fs.readFileSync(path.join(__dirname, '../src/progress.js'), 'utf8');

function progressWith(values) {
  const context = { localStorage: {
    getItem: key => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  } };
  context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
  vm.runInNewContext(source, context);
  return context.Progress;
}

test('每题错误次数只累加错答，答对、查看答案和重置练习不会清除统计', () => {
  const values = new Map();
  const progress = progressWith(values);
  progress.record('english-bank', 'q1', false);
  progress.record('english-bank', 'q1', true);
  progress.record('english-bank', 'q1', false);
  progress.reveal('english-bank', 'q1');
  assert(progress.errorCount('english-bank', 'q1') === 2);
  assert(progress.get('english-bank', 'q1').tries === 3);
  progress.record('english-bank', 'q2', false);
  progress.record('math', 'q1', false);
  assert(progress.errorCount('math', 'q1') === 1, '不同分组的同题号应独立');
  assert(progress.errorStats('english-bank')[0].id === 'q1');
  progress.clear('english-bank', 'q1');
  assert(progress.get('english-bank', 'q1') === null);
  assert(progress.errorCount('english-bank', 'q1') === 2, '重置练习应保留错误统计');
  assert(progressWith(values).errorCount('english-bank', 'q1') === 2, '重开页面应保留统计');
});

test('历史七天错题按提交事件导入去重，新提交重复答错继续累加', () => {
  const result = { submittedAt: 1000, wrong: [{ id: 'q1' }, { id: 'q2' }] };
  const report = { ...result, id: '1-1000', day: 1 };
  const values = new Map([
    ['xq.english-plan.v2.guest', JSON.stringify({ results: { 1: result } })],
    ['xq.english-plan-prints.v2.guest', JSON.stringify([report, report])],
    ['xq.english-progress.v1.guest', JSON.stringify({ 'english-bank': {
      q1: { tries: 9, solved: true, revealed: true },
      old: { tries: 3, solved: true, revealed: false },
    } })],
  ]);
  let progress = progressWith(values);
  assert(progress.errorCount('english-bank', 'q1') === 1, '同次提交同时出现在两处不能重复统计');
  assert(progress.errorCount('english-bank', 'old') === 0, '不能从旧尝试总数推算错误次数');
  assert(progress.get('english-bank', 'q1').tries === 9, '历史导入不能改变旧进度');
  progress.record('english-bank', 'q1', false, 'english-plan:1-2000:q1');
  progress.record('english-bank', 'q1', false, 'english-plan:1-2000:q1');
  assert(progress.errorCount('english-bank', 'q1') === 2);
  assert(progress.get('english-bank', 'q1').tries === 10, '同一事件的重复调用不能重复记录尝试');
  values.set('xq.english-plan-prints.v2.guest', JSON.stringify([report,
    { id: '1-2000', day: 1, submittedAt: 2000, wrong: [{ id: 'q1' }] }]));
  progress = progressWith(values);
  assert(progress.errorCount('english-bank', 'q1') === 2, '刷新不能再次累加已经统计的新提交');
});

test('浏览器存储不可用时错误统计仍可在当前会话使用', () => {
  const context = { localStorage: { getItem() { throw Error('disabled'); }, setItem() { throw Error('disabled'); } } };
  context.LearningStore = require('../src/learning-store.js').create(context.localStorage);
  vm.runInNewContext(source, context);
  context.Progress.record('english-bank', 'q', false);
  assert(context.Progress.errorCount('english-bank', 'q') === 1);
});
