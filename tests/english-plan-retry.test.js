'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');
const bank = require('../src/english-bank.js');
const plan = require('../src/english-plan.js');
const knowledge = require('../content/english/knowledge.js');
const questions = require('../content/english/question-bank.js');
// 其他模块测试会替换全局 Date，用干净 VM 的构造器隔离时钟。
const NativeDate = vm.runInNewContext('Date');

class Node {
  constructor(tag) { this.tag = tag; this.children = []; this.events = {}; this.value = ''; }
  set textContent(value) { this.text = String(value); this.children = []; }
  get textContent() { return (this.text || '') + this.children.map(n => n.textContent).join(''); }
  appendChild(node) { this.children.push(node); return node; }
  append(...nodes) { this.children.push(...nodes); }
  setAttribute(key, value) { this[key] = value; }
  addEventListener(name, handler) { this.events[name] = handler; }
  all() { return [this, ...this.children.flatMap(node => node.all())]; }
}

const source = fs.readFileSync(path.join(__dirname, '../src/english-plan.js'), 'utf8');
const progress = fs.readFileSync(path.join(__dirname, '../src/progress.js'), 'utf8');

function setup() {
  const fixtures = ['choice', 'cloze', 'reading-multi'].map(kind =>
    questions.find(q => plan.questionMode(q).kind === kind && plan.questionMode(q).answer));
  const wrong = fixtures.map(q => {
    const mode = plan.questionMode(q);
    return { id: q.id, selected: Array.isArray(mode.answer)
      ? mode.answer.map(letter => letter === 'A' ? 'B' : 'A')
      : mode.options.find(option => option.letter !== mode.answer).letter, answer: mode.answer };
  });
  const report = plan.createReport(6, { submittedAt: 500, attempted: 3, correct: 0,
    unanswered: 0, ungradable: 0, wrong }, fixtures);
  const daily = JSON.stringify({ drafts: { 6: { unrelated: 'B' } }, results: {} });
  const values = new Map([['xq.english-plan-prints.v1', JSON.stringify([report])], ['xq.english-plan.v1', daily]]);
  const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  function open(view, id = report.id, live = fixtures) {
    class FixedDate extends NativeDate { static now() { return 1000; } }
    const context = { localStorage: storage, EnglishKnowledge: knowledge,
      EnglishBank: { ...bank, knowledgeIntro: () => new Node('section') }, Date: FixedDate,
      document: { createElement: tag => new Node(tag), createTextNode: text => {
        const node = new Node('#text'); node.textContent = text; return node;
      } }, location: {} };
    vm.runInNewContext(progress, context);
    vm.runInNewContext(source, context);
    const main = new Node('main');
    if (view === 'retry') context.EnglishPlan.renderRetry(main, live, 6, id);
    else if (view === 'day') context.EnglishPlan.renderDay(main, live, 6);
    else context.EnglishPlan.renderResult(main, live, 6, id);
    return { context, main, nodes: main.all() };
  }
  function answer(page, q, values) {
    if (typeof values === 'string') {
      const input = page.nodes.find(node => node.tag === 'input' && node.name === `q-${q.id}` && node.value === values);
      assert(input, `未找到选项 ${q.id}`);
      input.checked = true;
      input.events.change();
    } else {
      const index = fixtures.findIndex(item => item.id === q.id) + 1;
      const selects = page.nodes.filter(node => node.tag === 'select' && node['aria-label'].startsWith(`第 ${index} 题`));
      assert(selects.length === values.length);
      selects.forEach((select, i) => { select.value = values[i]; select.events.change(); });
    }
  }
  function submit(page) { page.nodes.find(node => node.tag === 'form').events.submit({ preventDefault() {} }); }
  return { fixtures, report, values, storage, daily, open, answer, submit };
}

test('提交记录重做按原快照还原单选、完形、阅读，不预选或泄露答案', () => {
  const s = setup();
  const page = s.open('retry', s.report.id, s.fixtures.map(q => ({ ...q, text: '后来修改的题干', answer: 'Z' })));
  const restored = plan.retryQuestions(s.report);
  for (const [i, q] of restored.entries()) {
    assert(q.id === s.fixtures[i].id && q.text === s.fixtures[i].text);
    assert(JSON.stringify(plan.questionMode(q).answer) === JSON.stringify(s.report.wrong[i].answer));
  }
  assert(page.nodes.filter(node => node.tag === 'input').every(node => !node.checked));
  assert(page.nodes.filter(node => node.tag === 'select').every(node => node.value === ''));
  assert(!page.nodes.some(node => node.className === 'english-explanation'), '重做前不能提前显示解析');
  assert(!page.main.textContent.includes('后来修改的题干'));
  const view = s.open('result');
  assert(view.nodes.some(node => node.href === `#/english-plan/6/retry/${s.report.id}`), '提交记录中缺少重做入口');
});

test('重做草稿刷新可恢复，与每日草稿独立，未回答不能提交', () => {
  const s = setup();
  const page = s.open('retry');
  s.submit(page);
  assert(JSON.parse(s.values.get('xq.english-plan-prints.v1')).length === 1);
  assert(page.main.textContent.includes('请先完整作答至少一道'));
  s.answer(page, s.fixtures[0], plan.questionMode(s.fixtures[0]).answer);
  const restored = s.open('retry');
  assert(restored.nodes.some(node => node.tag === 'input' && node.checked), '刷新丢失重做选择');
  assert(s.values.get('xq.english-plan.v1') === s.daily, '重做不能改每日草稿或结果');
});

test('重做提交追加记录、累计错误，新错题可继续重做，原记录不变', () => {
  const s = setup();
  const before = JSON.stringify(s.report);
  const page = s.open('retry');
  const choice = s.fixtures[0];
  const mode = plan.questionMode(choice);
  s.answer(page, choice, mode.options.find(option => option.letter !== mode.answer).letter);
  s.answer(page, s.fixtures[1], plan.questionMode(s.fixtures[1]).answer);
  s.submit(page);
  s.submit(page); // 连击不能为同一轮产生两条记录。
  const records = JSON.parse(s.values.get('xq.english-plan-prints.v1'));
  assert(records.length === 2 && JSON.stringify(records[0]) === before);
  const added = records[1];
  assert(added.attempted === 2 && added.correct === 1 && added.unanswered === 1 && added.wrong.length === 1);
  assert(page.context.location.hash === `#/english-plan/6/result/${added.id}`);
  assert(s.values.get('xq.english-plan.v1') === s.daily);
  assert(!JSON.parse(s.values.get('xq.english-plan-retry.v1')).drafts[s.report.id], '提交后清空本轮草稿');
  const result = s.open('result', added.id);
  assert(result.main.textContent.includes('本次重做答对的题 · 答案与解析'));
  assert(result.main.textContent.includes(bank.explanationFor(s.fixtures[1]).text));
  assert(result.nodes.some(node => node.href === `#/english-plan/6/retry/${added.id}`));
  assert(s.open('result').main.textContent.includes(s.fixtures[0].text), '旧入口须保留原题');
  assert(JSON.parse(s.values.get('xq.errors.v1')).counts['english-bank'][choice.id] === 2, '原错答与重做错答各计一次');
  const next = s.open('retry', added.id, []);
  assert(next.nodes.filter(node => node.tag === 'input').every(node => !node.checked));
  assert(next.nodes.filter(node => node.tag === 'select').length === 0, '下轮只能重做新记录的错题');
  s.answer(next, choice, mode.answer);
  s.submit(next);
  const after = JSON.parse(s.values.get('xq.english-plan-prints.v1'));
  assert(after.length === 3 && after[2].wrong.length === 0 && after[2].id !== added.id);
  const allCorrect = s.open('result', after[2].id);
  assert(allCorrect.main.textContent.includes(`参考答案：${mode.answer}`), '全对也能查看答案');
  assert(allCorrect.main.textContent.includes('无错题可重做'));
  assert(s.open('retry', after[2].id).main.textContent.includes('没有错题可重做'));
  const latest = s.open('result', null);
  assert(latest.main.textContent.includes('本次提交没有答错的题'));
  assert(JSON.parse(s.values.get('xq.errors.v1')).counts['english-bank'][choice.id] === 2, '刷新或答对不能增加错误次数');
});

test('重做保存失败可重试，无效记录安全提示，打印隐藏答对题和解析', () => {
  const s = setup();
  assert(s.open('retry', 'nonexistent').main.textContent.includes('找不到这次提交记录'));
  const page = s.open('retry');
  const setter = s.storage.setItem;
  s.storage.setItem = () => { throw new Error('quota'); };
  s.answer(page, s.fixtures[0], plan.questionMode(s.fixtures[0]).answer);
  s.submit(page);
  assert(page.main.textContent.includes('无法保存新提交记录'));
  assert(!page.context.location.hash && JSON.parse(s.values.get('xq.english-plan-prints.v1')).length === 1);
  s.storage.setItem = (key, value) => {
    if (key === 'xq.english-plan-prints.v1') throw new Error('print quota');
    setter(key, value);
  };
  s.submit(page);
  assert(Object.keys(JSON.parse(s.values.get('xq.english-plan-retry.v1')).submissions).length === 0,
    '错题记录保存失败时应撤销对应重做元数据');
  s.storage.setItem = setter;
  s.submit(page);
  assert(JSON.parse(s.values.get('xq.english-plan-prints.v1')).length === 2);
  const css = fs.readFileSync(path.join(__dirname, '../src/app.css'), 'utf8');
  assert(css.slice(css.indexOf('@media print')).includes('.english-plan-retry-correct,'));
  const app = fs.readFileSync(path.join(__dirname, '../src/app.js'), 'utf8');
  assert(app.includes("if (day && view === 'retry') EnglishPlan.renderRetry(main, questions, day, reportId)"));
});

test('重做复合小题逐空提交，全对记录仍保留，之后每日提交不会撞 ID', () => {
  const s = setup();
  const page = s.open('retry');
  for (const q of s.fixtures) s.answer(page, q, plan.questionMode(q).answer);
  s.submit(page);
  const records = JSON.parse(s.values.get('xq.english-plan-prints.v1'));
  const report = records[1];
  assert(report.attempted === 3 && report.correct === 3 && report.wrong.length === 0);
  const review = JSON.parse(s.values.get('xq.english-plan-retry.v1')).submissions[report.id].review;
  assert(review.length === 3 && Array.isArray(review[2].answer), '阅读复合小题答案必须保存完整');
  const result = s.open('result', report.id);
  assert(result.main.textContent.includes(s.fixtures[2].text));
  assert(result.main.textContent.includes('(1)'));
  const daily = s.open('day');
  const clozeAnswers = plan.questionMode(s.fixtures[1]).answer;
  const selects = daily.nodes.filter(node => node.tag === 'select');
  selects.forEach((select, index) => { select.value = clozeAnswers[index]; select.events.change(); });
  s.submit(daily);
  const after = JSON.parse(s.values.get('xq.english-plan-prints.v1'));
  assert(after.length === 3 && after[2].submittedAt > report.submittedAt);
});
