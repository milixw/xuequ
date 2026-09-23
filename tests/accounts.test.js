'use strict';

const { test, assert } = require('./harness');

const _store = {};
global.localStorage = {
  getItem(k) { return _store[k] ?? null; },
  setItem(k, v) { _store[k] = String(v); },
  removeItem(k) { delete _store[k]; },
};

const Accounts = require('../src/accounts.js');

test('Accounts.formatCheck: 合法名', () => {
  for (const n of ['xiaoming', '_alice', 'x123', 'abc_def', 'A1']) {
    assert(Accounts.formatCheck(n).ok, `${n} 应合法`);
  }
});

test('Accounts.formatCheck: 空字符串', () => {
  const r = Accounts.formatCheck('');
  assert(!r.ok, '空应不合法');
  assert(r.error);
});

test('Accounts.formatCheck: 纯数字', () => {
  const r = Accounts.formatCheck('123');
  assert(!r.ok, '纯数字应不合法');
  assert(/数字|字母|下划线/.test(r.error), '提示应提到字符要求');
});

test('Accounts.formatCheck: 首字符数字', () => {
  const r = Accounts.formatCheck('1xiaoming');
  assert(!r.ok, '首字符数字应不合法');
});

test('Accounts.formatCheck: 含特殊字符', () => {
  for (const n of ['xiaoming!', 'foo bar', 'a@b', 'a.b']) {
    const r = Accounts.formatCheck(n);
    assert(!r.ok, `${n} 应不合法`);
  }
});

test('Accounts.formatCheck: 过长', () => {
  const r = Accounts.formatCheck('a'.repeat(21));
  assert(!r.ok, '21 字符应不合法');
});

test('Accounts.formatCheck: null/undefined', () => {
  assert(!Accounts.formatCheck(null).ok);
  assert(!Accounts.formatCheck(undefined).ok);
});

test('current 初始为 null', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  assert(Accounts.current() === null);
});

test('signIn 合法名 → ok + current 拿到', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('xiaoming');
  assert(r.ok);
  assert(Accounts.current() === 'xiaoming');
});

test('signIn 前后空格 trim', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('  xiaoming  ');
  assert(r.ok);
  assert(Accounts.current() === 'xiaoming');
});

test('signIn 默认宽松：含空格 → ok=false + error', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('alice x');
  assert(!r.ok);
  assert(r.error);
  assert(Accounts.current() === null);
});

test('signIn 默认宽松：中文/emoji → ok', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('张三');
  assert(r.ok);
  assert(Accounts.current() === '张三');
});

test('signIn 显式 strict 仍走严格校验', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('123', { strict: true });
  assert(!r.ok, '纯数字在 strict 下应失败');
});

test('signIn localStorage 抛错时 → ok=false + error', () => {
  const orig = localStorage.setItem;
  localStorage.setItem = () => { throw new Error('quota'); };
  const r = Accounts.signIn('xiaoming');
  assert(!r.ok);
  assert(r.error);
  localStorage.setItem = orig;
});

test('signOut 清掉 current', () => {
  Accounts.signIn('xiaoming');
  Accounts.signOut();
  assert(Accounts.current() === null);
});

test('history.list 初始为空数组', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const list = Accounts.history.list('xiaoming');
  assert(Array.isArray(list));
  assert(list.length === 0);
});

test('history.append 后能 list 拿到', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const rec = { sectionId: 'math/sh2024/g6s1/1.1', completedAt: 1731910400000, score: 15, total: 20, durationSec: 1950, items: [] };
  Accounts.history.append('xiaoming', rec);
  const list = Accounts.history.list('xiaoming');
  assert(list.length === 1);
  assert(list[0].id, 'append 后应分配 id');
  assert(list[0].sectionId === 'math/sh2024/g6s1/1.1');
  assert(list[0].score === 15);
});

test('history 多条按时间倒序', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.append('xiaoming', { sectionId: 'b', completedAt: 200, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.append('xiaoming', { sectionId: 'c', completedAt: 150, score: 1, total: 1, durationSec: 0, items: [] });
  const list = Accounts.history.list('xiaoming');
  assert(list[0].sectionId === 'b');
  assert(list[1].sectionId === 'c');
  assert(list[2].sectionId === 'a');
});

test('history 不同账号隔离', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  Accounts.history.append('alice', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.append('bob', { sectionId: 'b', completedAt: 200, score: 1, total: 1, durationSec: 0, items: [] });
  assert(Accounts.history.list('alice').length === 1);
  assert(Accounts.history.list('bob').length === 1);
  assert(Accounts.history.list('alice')[0].sectionId === 'a');
});

test('history.clear 清掉该账号全部', () => {
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.clear('xiaoming');
  assert(Accounts.history.list('xiaoming').length === 0);
});

test('history.get(id) 拿单条', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  const list = Accounts.history.list('xiaoming');
  const got = Accounts.history.get('xiaoming', list[0].id);
  assert(got && got.sectionId === 'a');
});

test('history.append 深拷贝 items，源记录后改不影响已存', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const items = [{ qid: 'q1', ok: true }];
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 1, score: 1, total: 1, durationSec: 0, items });
  items[0].ok = false;
  items.push({ qid: 'q2', ok: true });
  const list = Accounts.history.list('xiaoming');
  assert(list[0].items.length === 1, 'items 长度不应受外部影响');
  assert(list[0].items[0].ok === true, 'item 字段不应受外部影响');
});

test('history.append 抛错时静默（不抛给调用方）', () => {
  const orig = localStorage.setItem;
  localStorage.setItem = () => { throw new Error('quota'); };
  let threw = false;
  try {
    Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 1, score: 1, total: 1, durationSec: 0, items: [] });
  } catch { threw = true; }
  assert(!threw, 'append 应静默失败');
  localStorage.setItem = orig;
});
