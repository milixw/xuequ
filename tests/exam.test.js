'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
const A = require('../src/answer.js');
const katex = require('../vendor/katex/katex.min.js');
const Content = globalThis.Content || require('../src/content.js');

if (!Content.catalog) require('../content/catalog.js');

function checkMath(text, where) {
  assert(typeof text === 'string' && text.trim(), `${where}：内容为空`);
  const ctrl = text.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/);
  assert(!ctrl, `${where}：含控制字符`);
  for (const part of text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/)) {
    if (!part.startsWith('$')) continue;
    const tex = part.replace(/^\$\$?|\$\$?$/g, '');
    katex.renderToString(tex, { throwOnError: true, strict: 'error' });
  }
}

for (const meta of Content.examMetas()) {
  if (!meta.exam.ready) continue;
  test(`真题卷 ${meta.exam.title}`, () => {
    const file = path.join(__dirname, '..', Content.examPath(meta.id));
    assert(fs.existsSync(file), `缺少真题卷文件 ${Content.examPath(meta.id)}`);
    require(file);
    const exam = Content.exams[meta.id];
    assert(exam, `文件没有注册真题卷 ${meta.id}`);
    assert(exam.title === meta.exam.title, '真题卷标题与目录不一致');
    assert(exam.questions.length === meta.exam.questionCount, `题量应为 ${meta.exam.questionCount}`);

    const ids = exam.questions.map(q => q.id);
    assert(new Set(ids).size === ids.length, '真题卷题目 ID 有重复');
    const numbers = exam.questions.map(q => q.originalNo);
    assert(numbers.every((n, i) => n === i + 1), '原卷题号应从 1 连续排列');

    for (const q of exam.questions) {
      const where = `原题 ${q.originalNo}`;
      assert(/^[a-z]+2025-q\d{2}$/.test(q.id), `${where}：题目 ID 格式错误`);
      const sectionMeta = Content.sectionMeta(`${meta.volumeId}/${q.section}`);
      assert(sectionMeta, `${where}：未知教材小节 ${q.section}`);
      assert(Number.isInteger(q.chapter), `${where}：缺少所属章编号`);
      assert(q.chapter === sectionMeta.chapter.no, `${where}：所属章与小节 ${q.section} 不一致`);
      assert(q.chapterTitle === sectionMeta.chapter.title, `${where}：所属章名称与目录不一致`);
      assert(q.sectionTitle === sectionMeta.section.title, `${where}：所属节名称与目录不一致`);
      assert(Number.isInteger(q.difficulty) && q.difficulty >= 1 && q.difficulty <= 5, `${where}：难度应为 1～5`);
      assert(typeof q.difficultyReason === 'string' && q.difficultyReason.trim(), `${where}：缺少难度理由`);
      assert(typeof q.topic === 'string' && q.topic.trim(), `${where}：缺少知识点`);
      checkMath(q.stem, `${where}题干`);
      q.explain.forEach((s, i) => checkMath(s, `${where}解析${i + 1}`));
      if (q.figure) assert(/^<svg[\s\S]*<\/svg>$/.test(q.figure.trim()), `${where}：figure 应为 SVG`);

      let response;
      if (q.type === 'choice') response = q.answer;
      else if (q.type === 'multi') response = q.answer;
      else response = q.blanks.map(b => b.kind === 'nums' ? b.answer.join(',') : Array.isArray(b.answer) ? b.answer[0] : String(b.answer));
      const result = A.checkQuestion(q, response);
      assert(result.ok, `${where}：标准答案不能被判分器判对`);
    }
  });
}

const Accounts = require('../src/accounts.js');

// exam.js 只用 sessionStorage，不碰 localStorage — 不要在这里 mock global.localStorage，
// 会覆盖前面 accounts.test.js 的 mock（导致 accounts 测试读取错误的存储）

// mock sessionStorage（node 默认没有）
const _ss = {};
global.sessionStorage = {
  getItem(k) { return _ss[k] ?? null; },
  setItem(k, v) { _ss[k] = String(v); },
  removeItem(k) { delete _ss[k]; },
};
// localStorage 由 accounts.test.js 先 setup，本文件直接复用。
// 锁定当前时间，让 deadlineAt 可预测
global.Date = { now: () => 1731910000000 };

const Exam = require('../src/exam.js');
const Answer = require('../src/answer.js');

// result() 依赖两个全局：Content.sections[sectionId] 取题，Answer.checkQuestion 判分
// 已有 Content 就保留（content.test.js 会先 setup 完整版），只补 sections 和 Answer
global.Answer = Answer;
if (!global.Content) global.Content = { sections: {} };

test('Exam.formatTime: 0 → 00:00', () => {
  assert(Exam.formatTime(0) === '00:00');
});
test('Exam.formatTime: 75 → 01:15', () => {
  assert(Exam.formatTime(75) === '01:15');
});
test('Exam.formatTime: 2400 → 40:00', () => {
  assert(Exam.formatTime(2400) === '40:00');
});

test('Exam.totalSeconds: 标准 5+10+5 = 2400', () => {
  const qs = [
    ...Array(5).fill({ level: 'basic' }),
    ...Array(10).fill({ level: 'extended' }),
    ...Array(5).fill({ level: 'challenge' }),
  ];
  assert(Exam.totalSeconds(qs) === 2400);
});
test('Exam.totalSeconds: 空数组 = 0', () => {
  assert(Exam.totalSeconds([]) === 0);
});
test('Exam.totalSeconds: 未知档位当 0', () => {
  assert(Exam.totalSeconds([{ level: 'unknown' }]) === 0);
});

test('Exam.prepare: 写入 session 并能读出', () => {
  for (const k of Object.keys(_ss)) delete _ss[k];
  const qs = [
    { id: 'q1', level: 'basic' },
    { id: 'q2', level: 'extended' },
  ];
  const sec = { id: 'sec1', questions: qs };
  Exam.prepare('sec1', 'jiajia', sec);
  const s = Exam.session();
  assert(s, 'session 存在');
  assert(s.username === 'jiajia');
  assert(s.sectionId === 'sec1');
  assert(s.questions.length === 2);
  assert(s.totalSeconds === 60 + 120);
  assert(s.submitted === false);
  assert(s.deadlineAt === 1731910000000 + (60 + 120) * 1000);
});

test('Exam.setResponse 写入后 session.answers 拿到', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.setResponse('q1', 2);
  assert(Exam.session().answers.q1 === 2);
});

test('Exam.submit 后 submitted=true', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.setResponse('q1', 0);
  Exam.submit();
  assert(Exam.session().submitted === true);
});

test('Exam.submit 后再 setResponse 抛错', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.submit();
  assert.throws(() => Exam.setResponse('q1', 1), '已交卷不应再改');
});

test('Exam.clear 后 session 为 null', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.clear();
  assert(Exam.session() === null);
});

test('Exam.remainingSeconds 用 Date.now() 算', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  // basic 60s
  global.Date.now = () => 1731910000000 + 30 * 1000;
  assert(Exam.remainingSeconds() === 30);
  global.Date.now = () => 1731910000000 + 70 * 1000;
  assert(Exam.remainingSeconds() === 0, '已超时返回 0 不为负');
});

test('Exam.result 算分', () => {
  const section = { id: 'sec1', questions: [{ id: 'q1', level: 'basic', type: 'choice', options: ['A','B'], answer: 1 }] };
  global.Content.sections.sec1 = section;
  Exam.prepare('sec1', 'jiajia', section);
  Exam.setResponse('q1', 1);
  const result = Exam.result();
  assert(result.total === 1);
  assert(result.correct === 1);
  assert(result.items[0].ok === true);
});

test('Exam.result 未作答计 0', () => {
  const section = { id: 'sec1', questions: [{ id: 'q1', level: 'basic', type: 'choice', options: ['A','B'], answer: 1 }] };
  global.Content.sections.sec1 = section;
  Exam.prepare('sec1', 'jiajia', section);
  // 不 setResponse
  const result = Exam.result();
  assert(result.correct === 0);
  assert(result.items[0].ok === false);
});

test('Exam.submit 写一条历史', () => {
  for (const k of Object.keys(_ss)) delete _ss[k];
  // 用独立的 localStorage mock 隔离：保存原 mock，测试内用全新 mock，结束后原样还原
  const origLS = global.localStorage;
  const _ls = {};
  global.localStorage = {
    getItem(k) { return _ls[k] ?? null; },
    setItem(k, v) { _ls[k] = String(v); },
    removeItem(k) { delete _ls[k]; },
  };
  try {
    global.Content = { sections: {} };
    Accounts.signIn('xiaoming');
    const sec = { id: 'sec1', questions: [{ id: 'q1', level: 'basic', type: 'choice', options: ['A', 'B'], answer: 1 }] };
    Exam.prepare('sec1', 'xiaoming', sec);
    global.Content.sections.sec1 = sec;
    Exam.setResponse('q1', 1);
    Exam.submit();
    const list = Accounts.history.list('xiaoming');
    assert(list.length === 1, 'submit 后 history 应有 1 条');
    assert(list[0].sectionId === 'sec1');
    assert(list[0].score === 1);
  } finally {
    global.localStorage = origLS;
  }
});
