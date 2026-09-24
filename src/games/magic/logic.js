'use strict';

// 数学魔术揭秘：计算器补数、撕牌模拟和约瑟夫问题、一次式变换、1089。纯函数，不依赖 DOM，浏览器和 node 通用。
// 分数运算用 answer.js 的 Frac。

(function (root) {
  const A = typeof Answer !== 'undefined' ? Answer : require('../../answer.js');
  const { Frac } = A;

  // ---------- 春晚计算器 ----------
  // 目标数：月、日、时、分连写，日时分各占两位。2 月 16 日 22:27 → 2162227
  function timeNumber(d) {
    const p = n => String(n).padStart(2, '0');
    return Number(`${d.getMonth() + 1}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}`);
  }

  // 计算器偷偷补的数：目标 − 前面各数之和
  function missing(target, nums) {
    return nums.reduce((acc, x) => acc.sub(Frac.of(x)), Frac.of(target));
  }

  // ---------- 撕牌 ----------
  // 牌堆是数组，下标 0 是牌堆顶。每张半牌 { card, half }：card 是 0～3（第几张牌），half 是 0 或 1
  function tear() {
    const deck = [];
    for (const half of [0, 1]) for (let card = 0; card < 4; card++) deck.push({ card, half });
    return deck;
  }

  // 从顶上拿 k 张放到底下
  function rotate(deck, k) {
    const n = deck.length;
    if (!n) return deck.slice();
    k %= n;
    return deck.slice(k).concat(deck.slice(0, k));
  }

  // 拿起顶上 k 张，插到剩下的牌里第 gap 张的下面（1 ≤ gap ≤ 剩下张数 − 1，也就是“中间”）
  function insertTop(deck, k, gap) {
    const top = deck.slice(0, k), rest = deck.slice(k);
    if (gap < 1 || gap > rest.length - 1) throw new Error('只能插到中间');
    return rest.slice(0, gap).concat(top, rest.slice(gap));
  }

  // 好运留下来，烦恼丢出去：顶上一张放到底下，再把顶上一张扔掉，直到剩一张。返回每一步的牌堆
  function luckSteps(deck) {
    const out = [];
    let d = deck.slice();
    let keep = true;
    while (d.length > 1) {
      d = keep ? rotate(d, 1) : d.slice(1);
      out.push({ keep, deck: d });
      keep = !keep;
    }
    return out;
  }

  // n 张牌做“好运留下来”，最后剩下的是原来的第几张（从 1 数）
  function survivor(n) {
    const steps = luckSteps(Array.from({ length: n }, (_, i) => i + 1));
    return steps.length ? steps[steps.length - 1].deck[0] : 1;
  }

  // 完整走一遍。choices：{ name 名字字数, gap1 第一次插到哪, region 南方 1 / 北方 2 / 不确定 3, gap2, gender 男 1 / 女 2, phrase 口令字数 }
  function perform(choices) {
    let d = tear();
    d = rotate(d, choices.name);
    d = insertTop(d, 3, choices.gap1);
    const hidden = d[0];
    d = d.slice(1);
    d = insertTop(d, choices.region, choices.gap2);
    d = d.slice(choices.gender);
    d = rotate(d, choices.phrase == null ? 7 : choices.phrase);
    const steps = luckSteps(d);
    const last = steps.length ? steps[steps.length - 1].deck[0] : d[0];
    return { hidden, last, ok: hidden.card === last.card };
  }

  // 口令 r 个字时，底牌（第 n 张）挪到了第几张
  const afterPhrase = (n, r) => ((n - 1 - r) % n + n) % n + 1;
  // 男生剩 6 张、女生剩 5 张，底牌都在最后一张；口令 r 个字能不能成功
  const phraseWorks = (n, r) => afterPhrase(n, r) === survivor(n);

  // ---------- 一次式 ax + b（自己设计魔术） ----------
  // 操作 { op: '+' | '-' | '*' | '/', k } 或 { op: 'x', k }（减去原数的 k 倍）
  function applyLin(lin, o) {
    const k = Frac.of(o.k);
    switch (o.op) {
      case '+': return { a: lin.a, b: lin.b.add(k) };
      case '-': return { a: lin.a, b: lin.b.sub(k) };
      case '*': return { a: lin.a.mul(k), b: lin.b.mul(k) };
      case '/': return { a: lin.a.div(k), b: lin.b.div(k) };
      case 'x': return { a: lin.a.sub(k), b: lin.b };
    }
    throw new Error('未知操作 ' + o.op);
  }
  const startLin = () => ({ a: Frac.of(1), b: Frac.of(0) });
  const runLin = ops => ops.reduce(applyLin, startLin());
  const evalLin = (lin, x) => lin.a.mul(Frac.of(x)).add(lin.b);

  function linTex(lin) {
    const { a, b } = lin;
    let s = '';
    if (!a.isZero()) {
      if (a.eq(Frac.of(1))) s = 'x';
      else if (a.eq(Frac.of(-1))) s = '-x';
      else s = a.toTeX() + 'x';
    }
    if (!b.isZero() || !s) {
      const t = b.toTeX();
      s += s && !t.startsWith('-') ? '+' + t : t;
    }
    return s;
  }

  function opTex(o) {
    const k = Frac.of(o.k).toTeX();
    if (o.op === 'x') return o.k === 1 ? '减去原数' : `减去原数的 ${k} 倍`;
    return { '+': '加上 ', '-': '减去 ', '*': '乘 ', '/': '除以 ' }[o.op] + k;
  }

  // ---------- 1089 ----------
  const reverse3 = n => Number(String(n).padStart(3, '0').split('').reverse().join(''));
  function trick1089(n) {
    const r = reverse3(n);
    const diff = Math.abs(n - r);
    const back = reverse3(diff);
    return { n, r, diff, back, sum: diff + back };
  }
  // 能做 1089 的三位数：百位和个位相差至少 2
  const ok1089 = n => n >= 100 && n <= 999 && Math.abs(Math.floor(n / 100) - n % 10) >= 2;

  const api = {
    timeNumber, missing, tear, rotate, insertTop, luckSteps, survivor, perform, afterPhrase, phraseWorks,
    applyLin, startLin, runLin, evalLin, linTex, opTex, reverse3, trick1089, ok1089,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MagicLogic = api;
})(this);
