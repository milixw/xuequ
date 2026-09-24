'use strict';

// 24 点：求解器、算式排版、发牌和关卡数据
const { test, assert } = require('./harness');
const S = require('../src/games/24/solver.js');
const { CHAPTERS, LEVELS, chapterOf } = require('../src/games/24/game.js');

// 可复现的伪随机数
function rng(seed) {
  return () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
}

function eachHand(max, fn) {
  for (let a = 1; a <= max; a++) for (let b = a; b <= max; b++)
    for (let c = b; c <= max; c++) for (let d = c; d <= max; d++) fn([a, b, c, d]);
}

test('24 点：求解器找到的解都等于 24，每张牌恰好用一次', () => {
  for (const hand of [[3, 3, 8, 8], [1, 5, 5, 5], [2, 5, 7, 8], [-3, -3, 8, 8], [1, 6, 11, 13]]) {
    const sols = S.solve(hand);
    assert(sols.length > 0, hand + ' 应该有解');
    for (const t of sols) {
      assert(t.v.eq(24), hand + ' 的解不等于 24');
      const used = [];
      (function walk(n) { if (n.op) { walk(n.a); walk(n.b); } else used.push(n.i); })(t);
      assert(used.sort().join() === '0,1,2,3', hand + ' 的解没有恰好用一次每张牌');
    }
  }
  assert(S.solve([1, 1, 1, 1]).length === 0, '1 1 1 1 应该无解');
});

test('24 点：经典难题的解和解法数', () => {
  const one = (hand, text) => {
    const sols = S.solve(hand);
    assert(sols.length === 1, `${hand} 的解法数是 ${sols.length}`);
    assert(S.toText(sols[0]) === text, `${hand} 的解是 ${S.toText(sols[0])}`);
  };
  one([3, 3, 8, 8], '8 ÷ (3 − 8 ÷ 3)');
  one([1, 5, 5, 5], '5 × (5 − 1 ÷ 5)');
  assert(S.solve([1, 4, 5, 6]).length === 2, '1 4 5 6 应该有两种解法');
});

test('24 点：有解组数和设计文档的统计一致', () => {
  // 穷举一遍 1～13，1～10 的顺带统计
  const c = { 10: [0, 0, 0], 13: [0, 0, 0] };
  eachHand(13, h => {
    const r = S.rate(h);
    for (const max of h[3] <= 10 ? [10, 13] : [13]) {
      c[max][0]++;
      if (r.count) c[max][1]++;
      if (r.needFrac) c[max][2]++;
    }
  });
  assert(c[10].join() === '715,566,10', '1～10：' + c[10]);
  assert(c[13].join() === '1820,1362,16', '1～13：' + c[13]);
});

test('24 点：算式只加必要的括号', () => {
  const tex = hand => S.toTex(S.solve(hand)[0]);
  assert(tex([3, 3, 8, 8]) === '8 \\div (3 - 8 \\div 3)', tex([3, 3, 8, 8]));
  assert(tex([1, 5, 5, 5]) === '5 \\times (5 - 1 \\div 5)', tex([1, 5, 5, 5]));
  const L = v => ({ v: S.Frac.of(v) });
  const N = (op, a, b) => ({ op, a, b });
  // 同级的右孩子：减、除要加括号，加、乘不用
  assert(S.toText(N('-', L(9), N('-', L(4), L(1)))) === '9 − (4 − 1)', '减号右边的减法要加括号');
  assert(S.toText(N('+', L(9), N('-', L(4), L(1)))) === '9 + 4 − 1', '加号右边的减法不用加括号');
  assert(S.toText(N('/', L(8), N('*', L(2), L(2)))) === '8 ÷ (2 × 2)', '除号右边的乘法要加括号');
  assert(S.toText(N('*', L(8), N('/', L(6), L(2)))) === '8 × 6 ÷ 2', '乘号右边的除法不用加括号');
  assert(S.toText(N('-', N('-', L(9), L(4)), L(1))) === '9 − 4 − 1', '左边同级不用加括号');
  assert(S.toText(N('*', L(-3), L(8))) === '(−3) × 8', '负数要加括号');
});

test('24 点：提示给出的第一步能继续算出 24', () => {
  for (const hand of [[3, 3, 8, 8], [2, 5, 7, 8], [-7, 2, 4, 4]]) {
    const h = S.hint(hand);
    const a = S.Frac.of(hand[h.i]), b = S.Frac.of(hand[h.j]);
    const v = { '+': a.add(b), '-': a.sub(b), '*': a.mul(b), '/': a.div(b) }[h.op];
    const rest = hand.filter((_, k) => k !== h.i && k !== h.j);
    assert(S.solve([v, ...rest]).length > 0, hand + ' 的提示走不通');
  }
  assert(S.hint([1, 1, 1, 1]) === null, '无解时提示应为 null');
});

test('24 点：发牌符合各档条件', () => {
  const r = rng(7);
  for (const [id, tier] of Object.entries(S.TIERS)) {
    for (const rational of [false, true]) {
      for (let k = 0; k < 30; k++) {
        const d = S.deal(id, { rational, maybeNone: true }, r);
        const values = d.cards.map(c => c.value);
        const n = S.solve(values).length;
        assert(d.solvable === n > 0, '发牌的 solvable 和求解器不一致');
        if (n) assert(n >= tier.min && n <= tier.top, `${tier.name}档发出了 ${n} 种解法的牌`);
        assert(d.cards.every(c => c.rank >= 1 && c.rank <= tier.max), '点数超出范围');
        assert(new Set(d.cards.map(c => c.rank + c.suit)).size === 4, '发出了重复的牌');
        const reds = d.cards.filter(c => S.isRed(c.suit));
        if (rational) {
          assert(reds.length >= 1 && reds.length <= 2, '有理数版每手应有 1～2 张红牌');
          assert(d.cards.every(c => c.value === (S.isRed(c.suit) ? -c.rank : c.rank)), '红牌没有算成负数');
        } else {
          assert(values.every(v => v > 0), '经典版出现了负数');
        }
      }
    }
  }
});

test('24 点：关卡满足各章条件', () => {
  assert(new Set(LEVELS.map(l => l.id)).size === LEVELS.length, '关卡 ID 重复');
  for (const l of LEVELS) {
    const ch = chapterOf(l);
    assert(ch, l.id + ' 找不到所在的章');
    const r = S.rate(l.cards);
    if (ch.no === '1') {
      assert(r.needFrac && l.cards.every(v => v >= 1 && v <= 10), l.id + ' 不是 1～10 里必须用分数的牌');
    } else if (ch.no === '2') {
      const reds = l.cards.filter(v => v < 0).length;
      assert(reds >= 1 && reds <= 2, l.id + ' 应有 1～2 张负数牌');
      assert(r.count >= 1 && r.count <= 3, `${l.id} 的解法数是 ${r.count}`);
    } else {
      assert((r.count > 0) === l.solvable, l.id + ' 标注的有解 / 无解和求解器不一致');
    }
    // 同一个点数同一种花色不能出现两次
    const cards = S.cardsOf(l.cards, !!ch.rational);
    assert(new Set(cards.map(c => c.rank + c.suit)).size === 4, l.id + ' 配出了重复的牌');
  }
  const ch3 = LEVELS.filter(l => l.id.startsWith('3-'));
  assert(ch3.some(l => l.solvable) && ch3.some(l => !l.solvable), '第 3 章要有有解也有无解的牌');
  assert(CHAPTERS.every(c => LEVELS.some(l => chapterOf(l) === c)), '有空的章');
});

test('24 点：写算式只接受合法的下一个记号', () => {
  const num = i => ({ t: 'num', i }), op = o => ({ t: 'op', op: o });
  const L = { t: '(' }, R = { t: ')' };
  const err = (tokens, tok) => !!S.pushToken(tokens, tok).error;
  assert(err([num(0)], num(1)), '两个数之间没有运算符应该拦住');
  assert(err([num(0), op('+')], num(0)), '同一张牌用两次应该拦住');
  assert(/用过/.test(S.pushToken([num(0)], num(0)).error), '紧接着再点同一张牌，应提示用过了');
  assert(err([], op('+')), '开头不能是运算符');
  assert(err([L], op('*')), '左括号后面不能是运算符');
  assert(err([num(0)], L), '数后面不能直接接左括号');
  assert(err([num(0)], R), '没有左括号时不能放右括号');
  assert(err([L, num(0), op('-')], R), '运算符后面不能直接接右括号');
  const t = S.pushToken([num(0), op('+')], op('*'));
  assert(t.length === 2 && t[1].op === '*', '连按两个运算符应换成后按的');
  assert(!S.isComplete([L, num(0), op('+'), num(1)], 2), '括号没配对不算写完');
  assert(S.isComplete([L, num(0), op('+'), num(1), R], 2), '写完的算式没认出来');
});

test('24 点：写出的算式按运算顺序计算，显示保留原样', () => {
  const vals = [8, 3, 8, 3];
  const num = i => ({ t: 'num', i }), op = o => ({ t: 'op', op: o });
  // 8 ÷ (3 − 8 ÷ 3)
  const tokens = [num(0), op('/'), { t: '(' }, num(1), op('-'), num(2), op('/'), num(3), { t: ')' }];
  assert(S.parseTokens(tokens, vals).v.eq(24), '8 ÷ (3 − 8 ÷ 3) 应该等于 24');
  assert(S.tokensFormat(tokens, vals, 'text') === '8 ÷ (3 − 8 ÷ 3)', S.tokensFormat(tokens, vals, 'text'));
  // 不加括号时先乘除后加减：8 ÷ 3 − 8 ÷ 3 = 0
  const flat = [num(0), op('/'), num(1), op('-'), num(2), op('/'), num(3)];
  assert(S.parseTokens(flat, vals).v.isZero(), '没有先乘除后加减');
  // 同级从左到右：8 − 3 − 3 = 2
  assert(S.parseTokens([num(0), op('-'), num(1), op('-'), num(3)], vals).v.eq(2), '同级没有从左到右算');
  // 多余的括号照原样显示，负数加括号
  const neg = [{ t: '(' }, { t: '(' }, num(0), { t: ')' }, op('*'), num(1), { t: ')' }];
  assert(S.tokensFormat(neg, [-3, 8], 'text') === '(((−3)) × 8)', S.tokensFormat(neg, [-3, 8], 'text'));
  assert(S.parseTokens(neg, [-3, 8]).v.eq(-24), '(−3) × 8 应该等于 −24');
  assert.throws(() => S.parseTokens([num(0), op('/'), { t: '(' }, num(1), op('-'), num(3), { t: ')' }], vals),
    '除以 0 应该抛错');
});
