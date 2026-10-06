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

test('比', () => {
  const b = blank('ratio', '30:9:16');
  for (const s of ['30:9:16', '30：9：16', '30 : 9 : 16', '30∶9∶16']) assert(ok(b, s), `应判对：${s}`);
  assert(!ok(b, '30:16:9'), '顺序不同');
  assert(!ok(b, '30:9'), '项数不同');
  const r = A.checkBlank(b, '60:18:32');
  assert(!r.ok && r.error, '没化简要提示');
  assert(A.checkBlank(b, '30 9 16').error, '没有冒号要提示');
  assert(ok(blank('ratio', '4:3'), '4:3'), '两项的比');
});

test('符号填空', () => {
  const b = blank('text', '>');
  assert(ok(b, '>'), '>');
  assert(ok(b, '＞'), '全角 >');
  assert(!ok(b, '<'), '<');
});

test('实数填空：根号、立方根、圆周率', () => {
  const b = blank('real', '2√3');
  for (const s of ['2√3', '2*√3', '√3*2', '√12', '2 √3', '2×√3', '2sqrt3']) assert(ok(b, s), `应判对：${s}`);
  for (const s of ['3√2', '-2√3', '3.46', '2√3.1']) assert(!ok(b, s), `应判错：${s}`);
  assert(!ok(b, '3.4641016'), '近似值不算对');
  assert(ok(blank('real', '√2'), '1.4142135623730951'), '写到双精度极限的小数仍算对');

  assert(ok(blank('real', '3+2√3'), '2√3+3'), '加法交换');
  assert(ok(blank('real', '∛(-8)'), '-2'), '立方根是整数');
  assert(ok(blank('real', '∛-8'), '−2'), '立方根括号可省、负号可用全角');
  assert(ok(blank('real', '(1+√5)/2'), '(1+√5)/2'), '分式');
  assert(ok(blank('real', 'π-3'), 'π−3'), '圆周率');
  assert(ok(blank('real', '(√7)^2'), '7'), '根号平方');

  assert(A.checkBlank(blank('real', '√2'), '√-4').error, '负数开平方要提示');
  assert(A.checkBlank(blank('real', '√2'), '2√').error, '写不完整要提示');
  assert(A.checkBlank(blank('real', '√2'), '(1+√2').error, '括号不配对要提示');
  assert(A.checkBlank(blank('real', '√2'), 'x+1').error, '看不懂的输入要提示');
});

test('实数填空：最简二次根式（simplest）', () => {
  const S = (ans, opts) => blank('real', ans, { simplest: true, ...opts });
  const err = (b, s) => A.checkBlank(b, s).error;
  for (const s of ['2√3', '√3*2', '2×√3']) assert(ok(S('2√3'), s), `应判对：${s}`);
  for (const s of ['√12', '√3+√3', '√2*√6', '(√3)^2*2/√3']) {
    assert(!ok(S('2√3'), s), `没化简应判错：${s}`);
    assert(err(S('2√3'), s), `没化简要提示：${s}`);
  }
  assert(!err(S('2√3'), '3√2'), '数值不对就是错，不提示化简');
  assert(ok(S('√6/2'), '√6/2') && ok(S('√6/2'), '1/2√6'), '分母不含根号');
  for (const s of ['√3/√2', '√(3/2)', '3/√6', '√1.5']) assert(err(S('√6/2'), s), `分母或根号里有分数：${s}`);
  assert(ok(S('(4√3-3√2)/30'), '(4√3−3√2)/30'), '整体除以整数');
  assert(ok(S('(4√3-3√2)/30'), '2√3/15-√2/10'), '拆成两项也行');
  assert(err(S('(1+√3)/2'), '(2+2√3)/4'), '分数没约分');
  assert(ok(S('-(1+√5)/2'), '-(1+√5)/2'), '负号在前');
  assert(err(S('5√2'), '2√2+3√2'), '同一个根号要合并');
  assert(err(S('2+√2'), '(√2+1)*√2'), '括号要乘开');
  assert(ok(S('3-2√2'), '3-2√2') && ok(S('5'), '5') && ok(S('π-3'), 'π-3'), '整数、π');
  assert(err(S('1'), '√1'), '√1 要写成 1');
  const R = blank('reals', ['√2', '-√2'], { simplest: true });
  assert(ok(R, '√2,-√2'), '多值');
  assert(A.checkBlank(R, '√2,-√8/2').error, '多值里有没化简的');
  assert(ok(blank('real', '2√3'), '√12'), '不要求最简时照旧按数值判');
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
  assert(A.answerText(blank('real', '2√3')) === '$2\\sqrt{3}$', 'real');
  assert(A.answerText(blank('real', '(1+√5)/2')) === '$\\frac{1+\\sqrt{5}}{2}$', 'real 分式');
  assert(A.answerText(blank('real', '∛(-8)')) === '$\\sqrt[3]{-8}$', 'real 立方根');
  assert(A.answerText(blank('angle', "36°15'")) === '36°15′', 'angle');
  assert(A.answerText(blank('ratio', '4:13:31')) === '$4:13:31$', 'ratio');
});

test('因式分解：要写成积并且分解彻底', () => {
  const b = blank('factor', '3x(x+2)(x-2)');
  for (const s of ['3x(x+2)(x-2)', '3x(x-2)(x+2)', '-3x(2-x)(x+2)', '(x+2)·3x·(x-2)', '3(x-2)(x+2)x']) assert(ok(b, s), `应判对：${s}`);
  assert(!ok(b, '3x^3-12x'), '没有分解');
  assert(A.checkBlank(b, '3x^3-12x').error, '没有分解时提示写成积');
  assert(!ok(b, '3x(x^2-4)'), '没有分解彻底');
  assert(/彻底/.test(A.checkBlank(b, 'x(3x^2-12)').error), '公因式没提完要提示');
  assert(!ok(b, '3x(x+2)(x+2)'), '与原式不相等');
  const sq = blank('factor', '(a-2b)^2');
  for (const s of ['(a-2b)^2', '(2b-a)^2', '(a-2b)(a-2b)']) assert(ok(sq, s), `应判对：${s}`);
  assert(!ok(sq, 'a^2-4ab+4b^2'), '展开式不算分解');
  const two = blank('factor', '(x-y)^2(a+b)');
  assert(ok(two, '(a+b)(y-x)^2'), '底数互为相反数的平方');
  assert(!ok(two, '(x-y)(ax+bx-ay-by)'), '还能继续分');
});


test('最简分式：相等并且约分到最简', () => {
  const b = blank('frac', '(a+2)/(a-2)');
  for (const s of ['(a+2)/(a-2)', '-(a+2)/(2-a)', '(-a-2)/(2-a)']) assert(ok(b, s), `应判对：${s}`);
  assert(!ok(b, '(a^2-4)/(a^2-4a+4)'), '没有约分');
  assert(/最简/.test(A.checkBlank(b, '(2a+4)/(2a-4)').error), '数字公因数没约要提示');
  assert(!ok(b, '(a-2)/(a+2)'), '不相等');
  const m = blank('frac', '-2x/(3y^2)');
  for (const s of ['-2x/(3y^2)', '2x/(-3y^2)', '-(2x)/(3y^2)']) assert(ok(m, s), `应判对：${s}`);
  assert(!ok(m, '-4x^2/(6x*y^2)'), '单项式没约完');
});

test('不等式的解集', () => {
  const b = blank('ineq', 'x>=2');
  for (const s of ['x≥2', 'x>=2', 'x＞=2', '2≤x', 'x≥4/2', 'x ≥ 2']) assert(ok(b, s), `应判对：${s}`);
  assert(!ok(b, 'x>2'), '端点不含');
  assert(!ok(b, 'x≤2'), '方向反了');
  assert(/未知数/.test(A.checkBlank(b, 'y≥2').error), '字母写错要提示');
  const two = blank('ineq', '-3<x<=5');
  for (const s of ['-3<x≤5', '−3<x≤5', '5≥x>-3']) assert(ok(two, s), `应判对：${s}`);
  assert(!ok(two, '-3≤x≤5'), '左端点不含');
  assert(A.checkBlank(two, '-3<x>5').error, '连写方向不一致要提示');
  assert(A.checkBlank(two, '5<x<-3').error, '连写不成立要提示');
  const none = blank('ineq', '无解');
  assert(ok(none, '无解') && !ok(none, 'x>1'), '无解');
  assert(!ok(b, '无解'), '有解却填无解');
  assert(ok(blank('ineq', 'x=2'), '2≤x≤2') && ok(blank('ineq', 'x<-3/2'), 'x<-1.5'), '单点、分数');
  assert(ok(blank('ineq', 'y<1', { var: 'y' }), '1>y'), '指定字母');
  assert(A.answerText(two) === '$-3<x\\leq 5$', 'answerText 连写');
  assert(A.answerText(b) === '$x\\geq 2$', 'answerText');
});
