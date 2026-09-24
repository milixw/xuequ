'use strict';

// 24 点：求解器、算式排版、发牌。纯函数，不依赖 DOM，浏览器和 node 通用。
// 表达式树：叶子 { v, i }（v 是 Frac，i 是在输入里的下标），运算节点 { v, op, a, b }，op 为 + - * /

(function (root) {
  const Frac = (typeof Answer !== 'undefined' ? Answer : require('../../answer.js')).Frac;

  const TARGET = 24;
  const isLeaf = t => !t.op;

  // 去重用的键：加法、乘法两边排序，其他等价变形不管
  function key(t) {
    if (isLeaf(t)) return t.v.toString();
    const a = key(t.a), b = key(t.b);
    if (t.op === '+' || t.op === '*') return '(' + [a, b].sort().join(t.op) + ')';
    return '(' + a + t.op + b + ')';
  }

  // 全部解。nums 是数或 Frac；每次任选两张合成一张，穷举到只剩一张
  function solve(nums, target = TARGET) {
    const goal = Frac.of(target);
    const found = new Map();
    function rec(items) {
      if (items.length === 1) {
        const k = key(items[0]);
        if (items[0].v.eq(goal) && !found.has(k)) found.set(k, items[0]);
        return;
      }
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (i === j) continue;
          const a = items[i], b = items[j];
          const rest = items.filter((_, k) => k !== i && k !== j);
          if (i < j) {
            rec([...rest, { v: a.v.add(b.v), op: '+', a, b }]);
            rec([...rest, { v: a.v.mul(b.v), op: '*', a, b }]);
          }
          rec([...rest, { v: a.v.sub(b.v), op: '-', a, b }]);
          if (!b.v.isZero()) rec([...rest, { v: a.v.div(b.v), op: '/', a, b }]);
        }
      }
    }
    rec(nums.map((n, i) => ({ v: Frac.of(n), i })));
    // 好懂的解排前面：不经过分数的优先，再是不经过负数的
    return [...found.values()].sort((x, y) => cost(x) - cost(y));
  }

  function someNode(t, pred) {
    if (isLeaf(t)) return false;
    return pred(t) || someNode(t.a, pred) || someNode(t.b, pred);
  }
  const hasFrac = t => someNode(t, n => n.v.d !== 1n);
  const hasNeg = t => someNode(t, n => n.v.n < 0n);
  const cost = t => (hasFrac(t) ? 2 : 0) + (hasNeg(t) ? 1 : 0);

  // 分档用：解法数（去重后的近似数）、是否每种解法都要经过分数
  function rate(nums) {
    const sols = solve(nums);
    return { count: sols.length, needFrac: sols.length > 0 && sols.every(hasFrac) };
  }

  // 一种解法的第一步：找两个孩子都是叶子的节点
  function firstStep(t) {
    if (isLeaf(t.a) && isLeaf(t.b)) return { i: t.a.i, j: t.b.i, op: t.op };
    return firstStep(isLeaf(t.a) ? t.b : t.a);
  }

  function hint(nums) {
    const sols = solve(nums);
    return sols.length ? firstStep(sols[0]) : null;
  }

  // ---------- 排版 ----------
  const PREC = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const SYM = {
    tex: { '+': '+', '-': '-', '*': '\\times', '/': '\\div', minus: '-' },
    text: { '+': '+', '-': '−', '*': '×', '/': '÷', minus: '−' },
  };

  // 只加必要的括号：孩子优先级低于自己要加；右孩子优先级相同、自己是减或除也要加
  function format(t, style) {
    const s = SYM[style];
    if (isLeaf(t)) {
      if (t.v.d !== 1n) return style === 'tex' ? t.v.toTeX() : t.v.toString().replace('-', s.minus);
      return t.v.n < 0n ? '(' + s.minus + (-t.v.n) + ')' : String(t.v.n);
    }
    const p = PREC[t.op];
    let a = format(t.a, style), b = format(t.b, style);
    if (!isLeaf(t.a) && PREC[t.a.op] < p) a = '(' + a + ')';
    if (!isLeaf(t.b) && (PREC[t.b.op] < p || (PREC[t.b.op] === p && (t.op === '-' || t.op === '/')))) b = '(' + b + ')';
    return a + ' ' + s[t.op] + ' ' + b;
  }
  const toTex = t => format(t, 'tex');
  const toText = t => format(t, 'text');

  // ---------- 写算式 ----------
  // 记号：{ t: 'num', i }（第 i 张牌）、{ t: 'op', op }、{ t: '(' }、{ t: ')' }
  const openCount = tokens => tokens.reduce((n, x) => n + (x.t === '(') - (x.t === ')'), 0);

  // 像计算器一样只接受合法的下一个记号：返回新的记号列表，或 { error }。
  // 连按两个运算符时换成后按的那个
  function pushToken(tokens, tok) {
    const last = tokens.length ? tokens[tokens.length - 1].t : null;
    const afterValue = last === 'num' || last === ')';
    if (tok.t === 'num') {
      if (tokens.some(x => x.t === 'num' && x.i === tok.i)) return { error: '这张牌已经用过了。' };
      if (afterValue) return { error: '两个数之间要先放运算符。' };
    } else if (tok.t === 'op') {
      if (last === 'op') return tokens.slice(0, -1).concat(tok);
      if (!afterValue) return { error: '运算符前面要先有数。' };
    } else if (tok.t === '(') {
      if (afterValue) return { error: '左括号前面要先放运算符。' };
    } else if (tok.t === ')') {
      if (!openCount(tokens)) return { error: '没有要配对的左括号。' };
      if (!afterValue) return { error: '右括号前面要先有数。' };
    }
    return tokens.concat(tok);
  }

  // 4 张牌都用上、括号配对、最后是数或右括号，才算写完
  function isComplete(tokens, n) {
    const last = tokens.length ? tokens[tokens.length - 1].t : null;
    return tokens.filter(x => x.t === 'num').length === n && !openCount(tokens) && (last === 'num' || last === ')');
  }

  // 按运算顺序把写完的算式转成表达式树，除以 0 时抛错
  function parseTokens(tokens, values) {
    let p = 0;
    const apply = (op, a, b) => {
      if (op === '/' && b.v.isZero()) throw new Error('0 不能作除数');
      const v = op === '+' ? a.v.add(b.v) : op === '-' ? a.v.sub(b.v) : op === '*' ? a.v.mul(b.v) : a.v.div(b.v);
      return { v, op, a, b };
    };
    function expr() {
      let t = term();
      while (p < tokens.length && tokens[p].t === 'op' && PREC[tokens[p].op] === 1) t = apply(tokens[p++].op, t, term());
      return t;
    }
    function term() {
      let t = factor();
      while (p < tokens.length && tokens[p].t === 'op' && PREC[tokens[p].op] === 2) t = apply(tokens[p++].op, t, factor());
      return t;
    }
    function factor() {
      const tok = tokens[p++];
      if (tok.t === 'num') return { v: Frac.of(values[tok.i]), i: tok.i };
      const t = expr();
      p++;  // 右括号
      return t;
    }
    return expr();
  }

  // 按学生写的原样显示（保留多余的括号），负数牌加括号
  function tokensFormat(tokens, values, style) {
    const s = SYM[style];
    return tokens.map(x => {
      if (x.t === 'num') {
        const v = values[x.i];
        return v < 0 ? '(' + s.minus + (-v) + ')' : String(v);
      }
      return x.t === 'op' ? s[x.op] : x.t;
    }).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');
  }

  // ---------- 发牌 ----------
  const SUITS = ['♠', '♥', '♣', '♦'];
  const isRed = suit => suit === '♥' || suit === '♦';
  const RANKS = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
  const rankText = r => RANKS[r] || String(r);

  // 自由练习的三档，count 是解法数的范围
  const TIERS = {
    easy: { name: '入门', max: 10, min: 9, top: Infinity },
    mid: { name: '进阶', max: 10, min: 2, top: 8 },
    hard: { name: '困难', max: 13, min: 1, top: 3 },
  };

  // 从一副牌（点数 1～max）里抽 4 张。rational：红牌算负数，每手 1～2 张红牌。
  // maybeNone：约四分之一的牌无解
  function deal(tierId, opts = {}, rng = Math.random) {
    const tier = TIERS[tierId];
    const wantNone = !!opts.maybeNone && rng() < 0.25;
    const deck = [];
    for (let r = 1; r <= tier.max; r++) for (const suit of SUITS) deck.push({ rank: r, suit });
    for (let tries = 0; tries < 20000; tries++) {
      const pool = deck.slice();
      const cards = [];
      for (let k = 0; k < 4; k++) cards.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
      const reds = cards.filter(c => isRed(c.suit)).length;
      if (opts.rational && (reds < 1 || reds > 2)) continue;
      const hand = cards.map(c => ({ ...c, value: opts.rational && isRed(c.suit) ? -c.rank : c.rank }));
      const n = solve(hand.map(c => c.value)).length;
      if (wantNone ? n === 0 : n >= tier.min && n <= tier.top) return { cards: hand, solvable: n > 0 };
    }
    throw new Error('发不出符合条件的牌');
  }

  // 关卡里写的是带符号的数，配上花色：rational 时负数用红花色、正数用黑花色，否则按 ♠♥♣♦ 轮流。
  // 同一点数取还没用过的花色
  function cardsOf(values, rational) {
    const used = new Set();
    return values.map((v, i) => {
      const rank = Math.abs(v);
      const list = !rational ? SUITS : v < 0 ? ['♥', '♦'] : ['♠', '♣'];
      let k = i;
      while (used.has(rank + list[k % list.length])) k++;
      const suit = list[k % list.length];
      used.add(rank + suit);
      return { rank, suit, value: v };
    });
  }

  const Solver24 = {
    Frac, TARGET, TIERS, SUITS, solve, rate, hint, firstStep, hasFrac, hasNeg, toTex, toText,
    pushToken, isComplete, parseTokens, tokensFormat,
    deal, cardsOf, isRed, rankText,
  };
  if (typeof module !== 'undefined') module.exports = Solver24;
  else root.Solver24 = Solver24;
})(this);
