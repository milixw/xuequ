'use strict';

const { test, assert } = require('./harness');
const A = require('../src/answer.js');

const blank = (kind, answer, extra) => ({ kind, answer, ...extra });
const ok = (b, input) => A.checkBlank(b, input).ok;

test('分数运算', () => {
  const F = A.Frac.of;
  assert(F('1/2').add('1/3').eq('5/6'), '1/2 + 1/3');
  assert(F(-3).mul('-2/3').eq(2), '-3 × -2/3');
  assert(F('-2').pow(3).eq(-8), '(-2)^3');
  assert(F('2/3').div('-4').eq('-1/6'), '2/3 ÷ -4');
  assert(F('0.75').eq('3/4'), '0.75 = 3/4');
  assert(F('1又1/2').eq('3/2'), '带分数');
  assert(F('-6/8').toString() === '-3/4', '约分');
  assert(F('-3/4').toTeX() === '-\\frac{3}{4}', 'TeX');
});

test('数值填空：各种写法', () => {
  const b = blank('num', '-3/4');
  for (const s of ['-3/4', '−3/4', '－3/4', '-0.75', ' -6/8 ', '-3÷4']) assert(ok(b, s), `应判对：${s}`);
  for (const s of ['3/4', '-0.7']) assert(!ok(b, s), `应判错：${s}`);
  assert(A.checkBlank(b, 'abc').error, '看不懂的输入要给出提示');
  assert(A.checkBlank(b, '').error, '空输入要给出提示');
  assert(ok(blank('num', 5), '+5'), '+5');
});

test('多值填空：与顺序无关、重复不算', () => {
  const b = blank('nums', ['3', '-3']);
  for (const s of ['3, -3', '-3，3', '3或-3', '3、−3', '3,-3,3']) assert(ok(b, s), `应判对：${s}`);
  for (const s of ['3', '3,-3,0']) assert(!ok(b, s), `应判错：${s}`);
});

test('代数式：等价判定', () => {
  const b = blank('expr', '2a+3b');
  for (const s of ['2a+3b', '3b+2a', '2*a+3*b', 'a+a+3b', '2×a＋3b']) assert(ok(b, s), `应判对：${s}`);
  assert(!ok(b, '2a+3'), '2a+3 不等价');
  assert(ok(blank('expr', 's/t'), 's÷t'), 's÷t');
  assert(ok(blank('expr', '(a+b)/2'), 'a/2+b/2'), '(a+b)/2');
  assert(ok(blank('expr', 'a^2'), 'a²'), '上标平方');
  assert(ok(blank('expr', '-a^2'), '-(a*a)'), '-a^2 是 a^2 的相反数');
  assert(!ok(blank('expr', '-a^2'), '(-a)^2'), '(-a)^2 不等于 -a^2');
  assert(A.checkBlank(b, '2a+').error, '不完整的式子要给出提示');
});

test('代数式：化简要求', () => {
  const b = blank('expr', '5x-2', { simplified: true });
  assert(ok(b, '5x-2'), '5x-2');
  assert(ok(b, '-2+5x'), '-2+5x');
  const r = A.checkBlank(b, '3x+2x-2');
  assert(!r.ok && r.error, '未合并同类项要提示再化简');
  assert(!ok(b, '5(x-1)+3'), '含括号不算化简');
  assert(ok(blank('expr', '0', { simplified: true }), '0'), '结果为 0');
  assert(ok(blank('expr', 'x/2', { simplified: true }), 'x/2'), 'x/2');
});

test('角度', () => {
  const b = blank('angle', "36°15'");
  for (const s of ['36°15′', "36°15'", '36.25°', '36.25', '36度15分', '36°15′0″']) assert(ok(b, s), `应判对：${s}`);
  assert(!ok(b, '36°25′'), '36°25′');
  assert(A.checkBlank(b, '35°75′').error, '分大于 60 要提示');
});

test('符号填空', () => {
  const b = blank('text', '>');
  assert(ok(b, '>'), '>');
  assert(ok(b, '＞'), '全角 >');
  assert(!ok(b, '<'), '<');
});

test('整题判分', () => {
  assert(A.checkQuestion({ type: 'choice', answer: 2 }, 2).ok, '单选');
  assert(!A.checkQuestion({ type: 'choice', answer: 2 }, 1).ok, '单选错');
  assert(A.checkQuestion({ type: 'multi', answer: [0, 2] }, [2, 0]).ok, '多选顺序无关');
  assert(!A.checkQuestion({ type: 'multi', answer: [0, 2] }, [0]).ok, '多选少选');
  const q = { type: 'fill', blanks: [blank('num', 1), blank('num', -1)] };
  const r = A.checkQuestion(q, ['1', '2']);
  assert(!r.ok && r.blanks[0].ok && !r.blanks[1].ok, '多空逐个判');
});

test('标准答案展示', () => {
  assert(A.answerText(blank('num', '-3/4')) === '$-\\frac{3}{4}$', 'num');
  assert(A.answerText(blank('angle', "36°15'")) === '36°15′', 'angle');
});
