'use strict';

// 天平解方程：局面变形、判断解完、最少步数（BFS）、式子排版。纯函数，不依赖 DOM，浏览器和 node 通用。
//
// 局面 state 是 [左边, 右边]，每边 { x, n, b }：
//   x 个 x 盒子（负数表示 x 气球），n 个砝码（负数表示气球），b 个袋子（负数表示袋子气球）
// 每个袋子里装的东西由关卡给出：bag = { x, n }，比如 x+2 是 { x: 1, n: 2 }；一关只有一种袋子
// 操作 op：
//   { op: 'add', kind: 'x' | 'n' | 'b', k }  两边同时加上 k 个（k 为负就是减去）
//   { op: 'div', k }                          两边同时除以 k（k ≠ 0、1，每一项都要能整除）
//   { op: 'open', side }                      打开 side 边（0 左 1 右）的袋子，也就是去括号；天平不动

(function (root) {
  const KINDS = ['x', 'n', 'b'];

  const clone = s => s.map(side => ({ ...side }));
  const key = s => s.map(side => `${side.x},${side.n},${side.b}`).join('|');

  // 一边在 x = v 时的重量
  function weight(side, bag, v) {
    const inBag = bag ? bag.x * v + bag.n : 0;
    return side.x * v + side.n + side.b * inBag;
  }

  // 原方程的解；要求是整数且唯一，否则返回 null
  function solution(state, bag) {
    const coef = side => side.x + (bag ? side.b * bag.x : 0);
    const cons = side => side.n + (bag ? side.b * bag.n : 0);
    const a = coef(state[0]) - coef(state[1]);
    const c = cons(state[1]) - cons(state[0]);
    if (a === 0 || c % a !== 0) return null;
    return c / a;
  }

  // 只剩 1 个袋子时括号没有意义了，直接打开，不算一步（−1 个不自动打开，变号正是要练的）
  function tidy(s, bag) {
    s.forEach(side => {
      if (side.b === 1) { side.x += bag.x; side.n += bag.n; side.b = 0; }
    });
    return s;
  }

  // 返回 { state } 或 { error }
  function apply(state, op, bag) {
    const r = applyRaw(state, op, bag);
    if (r.state && bag) tidy(r.state, bag);
    return r;
  }

  function applyRaw(state, op, bag) {
    const s = clone(state);
    if (op.op === 'add') {
      if (!KINDS.includes(op.kind) || !Number.isInteger(op.k) || op.k === 0) return { error: '操作不对' };
      if (op.kind === 'b' && !bag) return { error: '这一关没有袋子' };
      s.forEach(side => { side[op.kind] += op.k; });
      return { state: s };
    }
    if (op.op === 'div') {
      const k = op.k;
      if (!Number.isInteger(k) || k === 0) return { error: '不能除以 0' };
      if (k === 1) return { error: '除以 1 什么也没变' };
      for (let i = 0; i < 2; i++) {
        for (const kind of KINDS) {
          if (s[i][kind] % k !== 0) return { error: `${i ? '右' : '左'}边的${NAMES[kind]}没法平均分成 ${Math.abs(k)} 份`, side: i, kind };
        }
      }
      s.forEach(side => KINDS.forEach(kind => { side[kind] = side[kind] / k || 0; }));
      return { state: s };
    }
    if (op.op === 'open') {
      const side = s[op.side];
      if (!side || !side.b) return { error: '这边没有袋子' };
      side.x += side.b * bag.x;
      side.n += side.b * bag.n;
      side.b = 0;
      return { state: s };
    }
    return { error: '操作不对' };
  }

  const NAMES = { x: 'x 盒子', n: '砝码', b: '袋子' };

  // 解完：一边只剩一个 x 盒子，另一边只有砝码或气球（或者空着）
  function solvedSide(state) {
    for (let i = 0; i < 2; i++) {
      const a = state[i], o = state[1 - i];
      if (a.x === 1 && a.n === 0 && a.b === 0 && o.x === 0 && o.b === 0) return i;
    }
    return -1;
  }
  const solved = state => solvedSide(state) >= 0;

  // x 和袋子都拿光了，再怎么变也解不出来
  const dead = state => state.every(side => side.x === 0 && side.b === 0);

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  }

  // BFS 用的候选操作：把某一边的某种东西消成 0、按公因数整除、打开袋子。
  // 测试里用全部操作做了穷举对比，关卡的最少步数不会被别的走法打破
  function smartOps(state, bag) {
    const ops = [];
    const seen = new Set();
    const push = op => {
      const k = JSON.stringify(op);
      if (!seen.has(k)) { seen.add(k); ops.push(op); }
    };
    // 顺序决定提示给哪种走法：先打开袋子，再按数从小到大消项，最后除（正数优先）
    state.forEach((side, i) => { if (side.b) push({ op: 'open', side: i }); });
    const adds = [];
    for (const kind of KINDS) {
      if (kind === 'b' && !bag) continue;
      for (const side of state) if (side[kind]) adds.push({ op: 'add', kind, k: -side[kind] });
    }
    adds.sort((p, q) => Math.abs(p.k) - Math.abs(q.k)).forEach(push);
    const g = state.reduce((acc, side) => KINDS.reduce((a, kind) => gcd(a, side[kind]), acc), 0);
    for (let k = 2; k <= g; k++) if (g % k === 0) push({ op: 'div', k });
    for (let k = 1; k <= g; k++) if (g % k === 0) push({ op: 'div', k: -k });
    return ops;
  }

  // 最少步数的一种走法（操作数组）；走不通返回 null
  function shortest(start, bag, maxDepth = 8) {
    if (solved(start)) return [];
    const prev = new Map([[key(start), null]]);
    let frontier = [start];
    for (let depth = 0; depth < maxDepth && frontier.length; depth++) {
      const next = [];
      for (const s of frontier) {
        for (const op of smartOps(s, bag)) {
          const r = apply(s, op, bag);
          if (r.error || dead(r.state)) continue;
          const k = key(r.state);
          if (prev.has(k)) continue;
          prev.set(k, { from: s, op });
          if (solved(r.state)) {
            const path = [];
            for (let cur = r.state; prev.get(key(cur)); cur = prev.get(key(cur)).from) path.unshift(prev.get(key(cur)).op);
            return path;
          }
          next.push(r.state);
        }
      }
      frontier = next;
    }
    return null;
  }

  // ---------- 排版（TeX） ----------
  function term(c, body, first) {
    if (c === 0) return '';
    const sign = c < 0 ? '-' : first ? '' : '+';
    const abs = Math.abs(c);
    if (!body) return sign + abs;
    return sign + (abs === 1 ? '' : abs) + body;
  }

  function bagTex(bag) {
    return term(bag.x, 'x', true) + term(bag.n, '', false);
  }

  function sideTex(side, bag) {
    let out = '';
    if (side.b) out += term(side.b, `(${bagTex(bag)})`, true);
    if (side.x) out += term(side.x, 'x', !out);
    if (side.n) out += term(side.n, '', !out);
    return out || '0';
  }

  const eqTex = (state, bag) => `${sideTex(state[0], bag)}=${sideTex(state[1], bag)}`;

  // 操作的算式说法，比如“两边同时减去 $2x$”
  function describe(op, bag) {
    if (op.op === 'open') return `打开${op.side ? '右' : '左'}边的袋子（去括号）`;
    if (op.op === 'div') return `两边同时除以 $${op.k}$`;
    const abs = Math.abs(op.k);
    const body = op.kind === 'x' ? term(abs, 'x', true)
      : op.kind === 'n' ? String(abs)
      : term(abs, `(${bagTex(bag)})`, true);
    return `两边同时${op.k > 0 ? '加上' : '减去'} $${body}$`;
  }

  const api = { weight, solution, apply, solved, solvedSide, dead, smartOps, shortest, sideTex, eqTex, bagTex, describe, key, NAMES };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BalanceSolver = api;
})(this);
