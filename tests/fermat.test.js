'use strict';

// 费马点：作图法和数值最小点对照、120° 和旋转 60° 的性质、关卡数据（角度要求、初始位置没达到最小、答案由逻辑算出）、挂载
const fs = require('fs');
const path = require('path');
const katex = require('../vendor/katex/katex.min.js');
const { test, assert } = require('./harness');
const A = require('../src/answer.js');
const L = require('../src/games/fermat/logic.js');
const { LEVELS, CHAPTERS, TOL, FermatGame } = require('../src/games/fermat/game.js');

const tex = s => katex.renderToString(s, { throwOnError: true, strict: 'error' });
const texIn = text => { for (const m of String(text).matchAll(/\$([^$]+)\$/g)) tex(m[1]); };
const near = (a, b, e = 1e-6) => Math.abs(a - b) < e;
const parts = t => LEVELS.flatMap(l => l.parts.filter(p => p.t === t).map(p => ({ l, p })));
const part = (id, i) => LEVELS.find(l => l.id === id).parts[i];

// 固定种子的伪随机数，结果可复现
function rng(seed) {
  let s = seed;
  return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
}

test('费马点：作图法和数值最小点一致，三个角都是 120°', () => {
  const r = rng(7);
  let sharp = 0, blunt = 0;
  for (let k = 0; k < 300; k++) {
    const T = [0, 1, 2].map(() => [r() * 10, r() * 8]);
    const ang = L.angles(...T);
    if (Math.min(...ang) < 3) continue;
    const F = L.fermat(...T), M = L.median(T);
    assert(near(L.total(F, T), L.total(M, T), 1e-6), `第 ${k} 个三角形：作图法和数值结果不一致`);
    if (Math.max(...ang) >= 120) {
      blunt++;
      assert(T.some(v => L.dist(v, F) < 1e-9), '有角 ≥ 120° 时费马点应是顶点');
      // 这时三条线的交点在三角形外面，总长比顶点大
      const [a, b, c] = T, X = L.intersect(c, L.apexOut(a, b, c), a, L.apexOut(b, c, a));
      assert(!X || L.total(X, T) > L.total(F, T) - 1e-9, '钝角 ≥ 120° 时交点不应更短');
    } else {
      sharp++;
      const [a, b, c] = T;
      for (const [p, q] of [[a, b], [b, c], [c, a]]) assert(near(L.angleAt(p, F, q), 120, 1e-6), '费马点处的角应是 120°');
    }
  }
  assert(sharp > 50 && blunt > 10, '随机三角形两种情况都要测到');
});

test('费马点：三线共点、等长，旋转 60° 后折线拉直', () => {
  const r = rng(11);
  for (let k = 0; k < 200; k++) {
    const T = [0, 1, 2].map(() => [r() * 10, r() * 8]);
    const ang = L.angles(...T);
    if (Math.min(...ang) < 3 || Math.max(...ang) >= 120) continue;
    const [a, b, c] = T;
    const D = L.apexOut(a, b, c), E = L.apexOut(b, c, a), F = L.apexOut(c, a, b);
    const P = L.intersect(c, D, a, E), Q = L.intersect(b, F, a, E);
    assert(near(P[0], Q[0], 1e-6) && near(P[1], Q[1], 1e-6), 'CD、AE、BF 应交于一点');
    const m = L.total(P, T);
    for (const len of [L.dist(c, D), L.dist(a, E), L.dist(b, F)]) assert(near(len, m, 1e-6), '三条线段都应等于最小总长');
    // 课本的旋转：C 绕 B 转到和 A 不同的一侧，就是 E；P 转到 P′，A、P、P′、C′ 共线
    const turn = L.awayTurn(a, b, c), C1 = L.rotate(c, b, turn), P1 = L.rotate(P, b, turn);
    assert(near(C1[0], E[0], 1e-9) && near(C1[1], E[1], 1e-9), '旋转得到的 C′ 应是等边三角形的顶点 E');
    assert(near(L.dist(a, P) + L.dist(P, P1) + L.dist(P1, C1), L.dist(a, C1), 1e-6), 'A、P、P′、C′ 应共线');
  }
});

test('费马点：数轴、四个点和正方形路网', () => {
  assert(L.lineMin([-2, 5]).value === 7 && L.lineMin([-2, 5]).lo === -2 && L.lineMin([-2, 5]).hi === 5, '两个点的最小区间不对');
  assert(L.lineMin([-3, 1, 6]).lo === 1 && L.lineMin([-3, 1, 6]).hi === 1, '三个点应在中间的点');
  // 最小区间外面的点都更大
  for (const xs of [[-6, -2, 1, 3, 8], [-6, -2, 1, 3, 8, 9]]) {
    const m = L.lineMin(xs);
    for (let x = -10; x <= 12; x += 0.5) {
      const t = L.lineTotal(x, xs), inside = x >= m.lo && x <= m.hi;
      assert(inside ? t === m.value : t > m.value, `${xs} 在 ${x} 处不对`);
    }
  }
  const q = part('3-1', 1).pts;
  const X = L.intersect(q[0], q[2], q[1], q[3]), M = L.median(q);
  assert(near(X[0], M[0], 1e-6) && near(X[1], M[1], 1e-6), '四个点的最小点应是对角线交点');
  assert(near(L.total(X, q), L.dist(q[0], q[2]) + L.dist(q[1], q[3]), 1e-9), '最小总长应是两条对角线之和');
  const sq = L.squareRoads([0, 0], 4);
  assert(near(sq.best, 4 * (1 + Math.sqrt(3)), 1e-9) && sq.best < sq.cross, '正方形路网最短应是 4(1+√3)，比 X 形短');
  // 随便拖两个岔口都不会更短
  const r = rng(3);
  for (let k = 0; k < 5000; k++) {
    const P = [r() * 4, r() * 4], Q = [r() * 4, r() * 4];
    assert(L.roadLen(P, Q, sq.sq) >= sq.best - 1e-9, '找到了比最优更短的路网');
  }
  for (const [p, a, b] of [[sq.P, sq.sq[0], sq.sq[3]], [sq.P, sq.sq[3], sq.Q], [sq.Q, sq.sq[1], sq.sq[2]]]) {
    assert(near(L.angleAt(a, p, b), 120, 1e-9), '岔口处应是 120°');
  }
});

test('费马点：关卡数据符合设计，初始位置还没达到最小', () => {
  for (const { l, p } of parts('line')) {
    const m = L.lineMin(p.xs);
    assert(p.init >= p.range[0] && p.init <= p.range[1] && p.xs.every(x => x >= p.range[0] && x <= p.range[1]), `${l.id} 数轴范围不够`);
    assert(L.lineTotal(p.init, p.xs) > m.value, `${l.id} 初始位置已经是最小`);
    // 0.5 一格时，最小位置的个数不少于 need
    const spots = (m.hi - m.lo) * 2 + 1;
    assert(spots >= p.need && (p.need > 1) === (m.hi > m.lo), `${l.id} need 和点数的奇偶不符`);
  }
  for (const { l, p } of parts('plane')) {
    const best = L.minTotal(p.pts);
    assert(L.total(p.P, p.pts) > best * (1 + TOL) * 1.02, `${l.id} 初始位置离最小太近`);
    for (const v of [...p.pts, p.P, L.median(p.pts)]) assert(v[0] > 0.3 && v[0] < 9.7 && v[1] > 0.3 && v[1] < p.h - 0.3, `${l.id} 有点在画面外`);
  }
  const ang = id => L.angles(...part(id, 1).pts);
  assert(Math.max(...ang('2-1')) < 115, '2-1 的三角形每个角都应小于 120°');
  assert(ang('2-2')[0] > 120 && ang('2-2')[0] < 150, '2-2 的 ∠A 应大于 120°');
  const rot = part('2-3', 1);
  assert(Math.max(...L.angles(rot.A, rot.B, rot.C)) < 115, '2-3 的三角形每个角都应小于 120°');
  const C1 = L.rotate(rot.C, rot.B, L.awayTurn(rot.A, rot.B, rot.C));
  for (const v of [rot.A, rot.B, rot.C, rot.P, C1, L.rotate(L.fermat(rot.A, rot.B, rot.C), rot.B, 60)]) {
    assert(v[0] > 0.3 && v[0] < 9.7 && v[1] > 0.3 && v[1] < rot.h - 0.3, '2-3 有点在画面外');
  }
  assert(L.total(rot.P, [rot.A, rot.B, rot.C]) > L.dist(rot.A, C1) * (1 + TOL) * 1.02, '2-3 初始位置离拉直太近');
  const b = part('2-4', 1);
  assert(Math.max(...L.angles(b.A, b.B, b.C)) < 115, '2-4 一开始的三角形每个角都应小于 120°');
  for (const v of [L.apexOut(b.A, b.B, b.C), L.apexOut(b.B, b.C, b.A), L.apexOut(b.C, b.A, b.B)]) {
    assert(v[0] > 0.3 && v[0] < 9.7 && v[1] > 0.3 && v[1] < b.h - 0.3, '2-4 等边三角形的顶点在画面外');
  }
  const rd = part('3-2', 1), sq = L.squareRoads(rd.o, rd.s);
  assert(sq.sq.every(v => v[0] > 0.3 && v[0] < 9.7 && v[1] > 0.3 && v[1] < rd.h - 0.3), '3-2 村子在画面外');
  assert(sq.cross > sq.best * (1 + TOL) * 1.02, '3-2 X 形不应算过关');
});

test('费马点：填空答案由逻辑核对', () => {
  for (const { l, p } of parts('fill')) {
    if (p.line) assert(L.lineMin(p.line).value === p.blanks[0].answer, `${l.id} 最小值答案不对`);
  }
  // 2-3 两个 120°、3-2 岔口的 120° 由几何核对
  const rot = part('2-3', 1), F = L.fermat(rot.A, rot.B, rot.C);
  const a23 = part('2-3', 5).blanks.map(x => x.answer);
  assert(near(L.angleAt(rot.B, F, rot.A), a23[0], 1e-6) && near(L.angleAt(rot.B, F, rot.C), a23[1], 1e-6), '2-3 角度答案不对');
  const sq = L.squareRoads([3, 1.2], 4);
  assert(near(L.angleAt(sq.sq[0], sq.P, sq.sq[3]), part('3-2', 2).blanks[0].answer, 1e-9), '3-2 岔口角度不对');
  // 解析里写的两个长度
  for (const expl of [part('3-2', 3).explain, part('3-2', 1).explain.join('')]) {
    assert(expl.includes(sq.best.toFixed(2)) && expl.includes(sq.cross.toFixed(2)), '3-2 解析里的长度和计算不符');
  }
  // 数轴解析里写的最小值、1-1 里 −3.5 处的距离和
  for (const { l, p } of parts('line')) {
    const m = L.lineMin(p.xs), text = p.explain.join('');
    if (p.need === 1) assert(text.includes(`$${m.lo}$`), `${l.id} 解析里的最小位置不对`);
    else assert(text.includes(`$${m.lo}$`) && text.includes(`$${m.hi}$`), `${l.id} 解析里的最小区间不对`);
  }
  assert(L.lineTotal(-3.5, [-2, 5]) === 10 && L.lineMin([-3, 1, 6]).value === 9, '1-1 解析里的数不对');
});

test('费马点：关卡格式、公式能渲染、答案能被判分器接受', () => {
  const ids = new Set();
  const TYPES = ['text', 'choice', 'fill', 'line', 'plane', 'rotate', 'build', 'roads'];
  for (const l of LEVELS) {
    assert(!ids.has(l.id), `${l.id} 重复`);
    ids.add(l.id);
    assert(CHAPTERS.some(c => l.id.startsWith(c.no + '-')), `${l.id} 不属于任何一章`);
    for (const p of l.parts) {
      assert(TYPES.includes(p.t), `${l.id} 有未知部件 ${p.t}`);
      [p.md, p.stem, ...[].concat(p.explain || []), ...(p.options || [])].filter(Boolean).forEach(texIn);
      if (['line', 'plane', 'rotate', 'roads'].includes(p.t)) assert(Array.isArray(p.explain) && p.explain.length >= 2, `${l.id} 的拖动部件缺少分步解析`);
      if (p.t === 'choice') assert(p.answer >= 0 && p.answer < p.options.length, `${l.id} 选择题答案越界`);
      if (p.t === 'fill') for (const b of p.blanks) assert(A.checkBlank(b, String(b.answer)).ok, `${l.id} 的答案 ${b.answer} 判分器不认`);
    }
  }
});

test('费马点：挂在 18.4，并在 index.html 加载、放进首页宫格', () => {
  assert(FermatGame.section === 'math/sh2024/g7s2/18.4', '应挂在 18.4');
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const f of ['logic.js', 'game.js']) assert(html.includes(`src/games/fermat/${f}`), `index.html 没有加载 ${f}`);
  const catalog = fs.readFileSync(path.join(root, 'content', 'catalog.js'), 'utf8');
  assert(/no: '18\.4'[^}]*games: \['fermat'\]/.test(catalog), 'catalog.js 的 18.4 应挂 fermat');
  assert(fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8').includes("href: '#/g/fermat'"), '首页宫格应有费马点');
});
