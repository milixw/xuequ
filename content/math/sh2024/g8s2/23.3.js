'use strict';

// 上海数学八年级下册 · 23.3 矩形、菱形与正方形（按试读片段课本第 22～36 页）
// 知识范围：矩形（定义：四个内角都是直角的四边形；是平行四边形；性质定理：对角线相等；中心对称、轴对称；判定定理：有一个内角是直角的平行四边形、对角线相等的平行四边形）；
//   菱形（定义：四条边都相等的四边形；是平行四边形；性质定理：对角线互相垂直；面积等于对角线乘积的一半；判定定理：有一组邻边相等的平行四边形、对角线互相垂直的平行四边形）；
//   正方形（定义：四个内角都是直角、四条边都相等；既是矩形又是菱形，反之亦然；对角线分成四个全等的等腰直角三角形）
// 可以使用：23.1、23.2（多边形内角和与外角和、平行四边形的性质与判定）；八上第 19～22 章（实数、二次根式、一元二次方程、直角三角形：斜边中线、30° 角、
//   勾股定理及逆定理、垂线段最短、角平分线性质）；七年级全部（全等、等腰、平行线、旋转、轴对称、配方）
// 还没学：三角形中位线定理与重心（23.4）、平面直角坐标系与距离公式、一次函数、相似三角形、三角比、圆
// 本节约定：带根号的结果用 real / reals 填空，并要求化成最简二次根式

const SVG233 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  thin: (a, b) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#9a8f7c" stroke-width="1.1"/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: (pts, fill = 'none') => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  // 直角记号：顶点 P，两边朝向 Q、R
  ra: (P, Q, R, s = 8) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]], lu = Math.hypot(...u), lv = Math.hypot(...v);
    const a = [P[0] + (u[0] / lu) * s, P[1] + (u[1] / lu) * s], b = [P[0] + (v[0] / lv) * s, P[1] + (v[1] / lv) * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    return `<polyline points="${[a, c, b].map(p => p.map(t => t.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
  },
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  mid: (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2],
  add: (P, Q) => [P[0] + Q[0], P[1] + Q[1]],
  sub: (P, Q) => [P[0] - Q[0], P[1] - Q[1]],
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  // 直线 p1p2 与直线 q1q2 的交点
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  // 点 P 在直线 QR 上的垂足
  foot: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    return [Q[0] + t * u[0], Q[1] + t * u[1]];
  },
  // 点 P 关于直线 QR 的对称点
  refl: (P, Q, R) => { const F = SVG233.foot(P, Q, R); return [2 * F[0] - P[0], 2 * F[1] - P[1]]; },
  // 点 P 到直线 QR 的距离
  toLine: (P, Q, R) => Math.abs((R[0] - Q[0]) * (P[1] - Q[1]) - (R[1] - Q[1]) * (P[0] - Q[0])) / Math.hypot(R[0] - Q[0], R[1] - Q[1]),
  // ∠QPR（度）
  ang: (P, Q, R) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)))) * 180) / Math.PI;
  },
  // 把向量 v 逆时针转 deg 度
  rot: ([x, y], deg) => { const a = (deg * Math.PI) / 180; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; },
  // 多边形面积（鞋带公式，只在 verify 里当计算工具用）
  area: pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2,
};

const R233 = v => Math.round(v * 1e9) / 1e9;
const D233 = v => `${Math.round(v * 1e6) / 1e6}°`;
// 把数值还原成分母不超过 1000 的分数（verify 里比较有理数答案用）
const Q233 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-8) return F(n).div(F(d)); } return v; };
const bisect233 = (f, lo, hi) => {
  let flo = f(lo);
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2, fm = f(mid);
    if (fm === 0) return mid;
    if ((fm > 0) === (flo > 0)) { lo = mid; flo = fm; } else hi = mid;
  }
  return (lo + hi) / 2;
};
const roots233 = (f, lo, hi, n = 20000) => {
  const out = [];
  let x0 = lo, f0 = f(lo);
  for (let i = 1; i <= n; i++) {
    const x1 = lo + ((hi - lo) * i) / n, f1 = f(x1);
    if (f0 === 0) out.push(x0);
    else if ((f0 > 0) !== (f1 > 0)) out.push(bisect233(f, x0, x1));
    x0 = x1; f0 = f1;
  }
  return out;
};
// 单峰函数在 [lo, hi] 上的最小值点（三分法）
const min233 = (f, lo, hi) => {
  for (let i = 0; i < 200; i++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (f(m1) < f(m2)) hi = m2; else lo = m1; }
  return (lo + hi) / 2;
};

// 四边形 ABCD（顶点数组）的性质判断，给 b01、b02、b07 的 verify 用
const QUAD233 = (() => {
  const S = SVG233, eq = (a, b) => Math.abs(a - b) < 1e-7;
  const sides = q => q.map((p, i) => S.dist(p, q[(i + 1) % 4]));
  const angs = q => q.map((p, i) => S.ang(p, q[(i + 3) % 4], q[(i + 1) % 4]));
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1];
  const T = {
    para: q => eq(q[0][0] + q[2][0], q[1][0] + q[3][0]) && eq(q[0][1] + q[2][1], q[1][1] + q[3][1]),
    rightCount: q => angs(q).filter(a => eq(a, 90)).length,
    rect: q => T.rightCount(q) === 4,
    rhombus: q => { const s = sides(q); return s.every(x => eq(x, s[0])); },
    square: q => T.rect(q) && T.rhombus(q),
    diagEq: q => eq(S.dist(q[0], q[2]), S.dist(q[1], q[3])),
    diagPerp: q => eq(dot(S.sub(q[2], q[0]), S.sub(q[3], q[1])), 0),
    adjEq: q => { const s = sides(q); return s.some((x, i) => eq(x, s[(i + 1) % 4])); },
    // 每条对角线平分它两端的一组对角
    diagBisect: q => [0, 1, 2, 3].every(i => eq(S.ang(q[i], q[(i + 3) % 4], q[(i + 2) % 4]), S.ang(q[i], q[(i + 1) % 4], q[(i + 2) % 4]))),
    central: q => T.para(q),
    // 候选对称轴：两条对角线所在直线、各边的垂直平分线；沿轴翻折后顶点集合不变
    axis: q => {
      const axes = [[q[0], q[2]], [q[1], q[3]]];
      q.forEach((p, i) => { const r = q[(i + 1) % 4], m = S.mid(p, r); axes.push([m, S.add(m, [-(r[1] - p[1]), r[0] - p[0]])]); });
      return axes.some(([P, Q]) => q.every(v => { const w = S.refl(v, P, Q); return q.some(u => S.dist(u, w) < 1e-7); }));
    },
  };
  const s3 = Math.sqrt(3);
  T.samples = [
    [[0, 0], [2, 0], [2, 2], [0, 2]],                 // 正方形
    [[0, 0], [3, 0], [3, 2], [0, 2]],                 // 矩形
    [[0, 0], [2, 0], [3, s3], [1, s3]],               // 菱形（60°）
    [[0, 0], [5, 0], [8, 4], [3, 4]],                 // 菱形（3-4-5）
    [[0, 0], [3, 0], [4, 2], [1, 2]],                 // 一般平行四边形
    [[0, 0], [4, 0], [3, 2], [1, 2]],                 // 等腰梯形
    [[0, 0], [3, 0], [2, 2], [0, 2]],                 // 直角梯形
    [[0, 0], [1, -2], [4, 0], [1, 2]],                // 对角线垂直且相等的筝形
    [[0, 0], [4, 0], [5, 3], [1, 2]],                 // 一般四边形
  ];
  return T;
})();

const FIG233 = (() => {
  const S = SVG233, out = {};
  const L = (pts, names, offs) => pts.map((p, i) => S.text(names[i], p, offs[i][0], offs[i][1])).join('');
  // b03：矩形 ABCD，AB=6（竖边），BC=2√3，对角线交于 O
  {
    const m = S.map(25, 105, 182), A = m([0, 6]), B = m([0, 0]), C = m([2 * Math.sqrt(3), 0]), D = m([2 * Math.sqrt(3), 6]), O = S.mid(A, C);
    out.b03 = S.wrap(300, 205, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D)
      + L([A, B, C, D, O], ['A', 'B', 'C', 'D', 'O'], [[-10, -6], [-10, 6], [10, 6], [10, -6], [13, 0]]));
  }
  // b04：菱形 ABCD 与两条对角线（按半对角线 4、3 画）
  {
    const m = S.map(28, 150, 105), A = m([-4, 0]), B = m([0, -3]), C = m([4, 0]), D = m([0, 3]), O = m([0, 0]);
    out.b04 = S.wrap(300, 210, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D)
      + L([A, B, C, D, O], ['A', 'B', 'C', 'D', 'O'], [[-11, 0], [0, 13], [11, 0], [0, -14], [10, 10]]));
  }
  // b05：菱形 ABCD，∠ABC=40°，E 在 BD 上，∠BAE=30°
  {
    const k = 28, m = S.map(k, 22, 118), a = (40 * Math.PI) / 180;
    const b = [0, 0], c = [5, 0], aM = [5 * Math.cos(a), 5 * Math.sin(a)], d = S.add(aM, c);
    const e = S.at(b, d, bisect233(t => S.ang(aM, b, S.at(b, d, t)) - 30, 0.01, 0.99));
    const [A, B, C, D, E] = [aM, b, c, d, e].map(m);
    out.b05 = S.wrap(300, 145, S.poly([A, B, C, D]) + S.seg(B, D) + S.seg(A, E) + S.seg(C, E)
      + L([A, B, C, D, E], ['A', 'B', 'C', 'D', 'E'], [[-6, -12], [-10, 6], [8, 10], [10, -8], [0, -15]]));
  }
  // b06：正方形 ABCD，E 在对角线 AC 上，AE=AB
  {
    const m = S.map(36, 60, 200), a = [0, 5], b = [0, 0], c = [5, 0], d = [5, 5], e = S.add(a, [5 / Math.SQRT2, -5 / Math.SQRT2]);
    const [A, B, C, D, E] = [a, b, c, d, e].map(m);
    out.b06 = S.wrap(280, 220, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, E) + S.seg(D, E)
      + L([A, B, C, D, E], ['A', 'B', 'C', 'D', 'E'], [[-10, -6], [-10, 6], [10, 6], [10, -6], [-12, 4]]));
  }
  // b07：平行四边形 ABCD，对角线交于 O
  {
    const m = S.map(30, 25, 125), A = m([2, 3]), B = m([0, 0]), C = m([6, 0]), D = m([8, 3]), O = S.mid(A, C);
    out.b07 = S.wrap(300, 145, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D)
      + L([A, B, C, D, O], ['A', 'B', 'C', 'D', 'O'], [[-6, -12], [-10, 6], [10, 6], [8, -12], [0, 15]]));
  }
  // b08：矩形 ABCD，AB=6，AD=10，沿 AE 折叠，B 落在 AD 上的 F
  {
    const m = S.map(24, 25, 172), A = m([0, 6]), B = m([0, 0]), C = m([10, 0]), D = m([10, 6]), E = m([6, 0]), Fp = m([6, 6]);
    out.b08 = S.wrap(300, 195, S.poly([A, B, C, D]) + S.seg(A, E) + S.seg(E, Fp, true) + S.seg(D, E)
      + L([A, B, C, D, E, Fp], ['A', 'B', 'C', 'D', 'E', 'F'], [[-10, -6], [-10, 6], [10, 6], [10, -6], [0, 14], [0, -14]]));
  }
  // e01：矩形 ABCD（AD=4，DC=4√3），DE⊥AC 于 E
  {
    const s3 = Math.sqrt(3), m = S.map(24, 110, 184), a = [0, 4 * s3], b = [0, 0], c = [4, 0], d = [4, 4 * s3], e = S.foot(d, a, c);
    const [A, B, C, D, E] = [a, b, c, d, e].map(m), O = S.mid(A, C);
    out.e01 = S.wrap(300, 200, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D) + S.seg(D, E) + S.ra(E, D, C, 7)
      + L([A, B, C, D, E, O], ['A', 'B', 'C', 'D', 'E', 'O'], [[-10, -6], [-10, 6], [10, 6], [10, -6], [-11, -4], [-13, 2]]));
  }
  // e02：菱形 ABCD，AC=30，BD=16，P 在 AB 上，PE⊥AC，PF⊥BD
  {
    const m = S.map(8.5, 150, 96), a = [-15, 0], b = [0, -8], c = [15, 0], d = [0, 8], p = S.at(a, b, 0.6), e = [p[0], 0], f = [0, p[1]];
    const [A, B, C, D, P, E, Fp, O] = [a, b, c, d, p, e, f, [0, 0]].map(m);
    out.e02 = S.wrap(300, 192, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D) + S.seg(P, E) + S.seg(P, Fp) + S.seg(E, Fp, true)
      + S.ra(E, A, P, 7) + S.ra(Fp, B, P, 7)
      + L([A, B, C, D, P, E, Fp, O], ['A', 'B', 'C', 'D', 'P', 'E', 'F', 'O'], [[-11, 0], [0, 13], [11, 0], [0, -14], [-9, 9], [0, -13], [10, 6], [9, -11]]));
  }
  // e03：菱形 ABCD，AB=4，∠ABC=60°，E 是 AB 中点，P 在 AC 上
  {
    const s3 = Math.sqrt(3), m = S.map(40, 25, 175), a = [2, 2 * s3], b = [0, 0], c = [4, 0], d = [6, 2 * s3], e = S.mid(a, b), p = S.at(a, c, 0.38);
    const [A, B, C, D, E, P] = [a, b, c, d, e, p].map(m);
    out.e03 = S.wrap(300, 195, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(P, E) + S.seg(P, B)
      + L([A, B, C, D, E, P], ['A', 'B', 'C', 'D', 'E', 'P'], [[-6, -12], [-10, 6], [10, 6], [10, -8], [-11, -2], [11, 0]]));
  }
  // e04：矩形 ABCD，AB=9，BC=12，对角线交于 O，直线 AD 向两边延长
  {
    const m = S.map(15, 60, 168), A = m([0, 9]), B = m([0, 0]), C = m([12, 0]), D = m([12, 9]), O = S.mid(A, C);
    out.e04 = S.wrap(300, 190, S.seg(m([-3.6, 9]), A, true) + S.seg(D, m([15.6, 9]), true) + S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D)
      + L([A, B, C, D, O], ['A', 'B', 'C', 'D', 'O'], [[-4, -12], [-10, 6], [10, 6], [4, -12], [0, 15]]));
  }
  // e05：宽 3、宽 4 的两张纸条交叉（按夹角 65° 画），重叠部分为平行四边形 ABCD
  {
    const t = (65 * Math.PI) / 180, u = [Math.cos(t), Math.sin(t)], p = 3 / Math.sin(t), q = 4 / Math.sin(t), m = S.map(30, 60, 150);
    const b = [0, 0], c = [q, 0], a = [u[0] * p, u[1] * p], d = S.add(a, c);
    let strips = S.thin(m([-1.6, 0]), m([7.6, 0])) + S.thin(m([-1.6, 3]), m([7.6, 3]));
    strips += S.thin(m(S.add(b, [-u[0] * 1.2, -u[1] * 1.2])), m(S.add(b, [u[0] * 4.5, u[1] * 4.5]))) + S.thin(m(S.add(c, [-u[0] * 1.2, -u[1] * 1.2])), m(S.add(c, [u[0] * 4.5, u[1] * 4.5])));
    const [A, B, C, D] = [a, b, c, d].map(m);
    out.e05 = S.wrap(300, 195, strips + S.poly([A, B, C, D], '#efe5d2')
      + L([A, B, C, D], ['A', 'B', 'C', 'D'], [[-12, -8], [-10, 10], [10, 10], [12, -8]]));
  }
  // e06：菱形 ABCD，AB=6，∠ABC=120°，对角线 AC
  {
    const s3 = Math.sqrt(3), m = S.map(24, 100, 158), a = [-3, 3 * s3], b = [0, 0], c = [6, 0], d = [3, 3 * s3];
    const [A, B, C, D] = [a, b, c, d].map(m);
    out.e06 = S.wrap(300, 180, S.poly([A, B, C, D]) + S.seg(A, C)
      + L([A, B, C, D], ['A', 'B', 'C', 'D'], [[-10, -6], [-8, 8], [10, 6], [8, -10]]));
  }
  // c01：正方形 ABCD，边长 6，P 在 BC 上，CE 平分 ∠DCG，PE⊥AP
  {
    const m = S.map(24, 22, 220), x = 2.2, a = [0, 6], b = [0, 0], c = [6, 0], d = [6, 6], g = [10.5, 0], p = [x, 0], e = [6 + x, x];
    const [A, B, C, D, G, P, E] = [a, b, c, d, g, p, e].map(m);
    out.c01 = S.wrap(300, 240, S.poly([A, B, C, D]) + S.seg(C, G) + S.seg(C, m([10.2, 4.2]), true) + S.seg(A, P) + S.seg(P, E) + S.ra(P, A, E, 7)
      + L([A, B, C, D, G, P, E], ['A', 'B', 'C', 'D', 'G', 'P', 'E'], [[-10, -6], [-10, 6], [0, 14], [10, -6], [0, 14], [0, 14], [8, -10]]));
  }
  // c02：正方形 ABCD 内一点 P，PA=7，PB=6，PC=11
  {
    const s = Math.sqrt(85 + 42 * Math.SQRT2), m = S.map(15, 60, 205), a = [0, s], b = [0, 0], c = [s, 0], d = [s, s], p = [(s * s - 85) / (2 * s), (s * s - 13) / (2 * s)];
    const [A, B, C, D, P] = [a, b, c, d, p].map(m);
    out.c02 = S.wrap(300, 225, S.poly([A, B, C, D]) + S.seg(P, A) + S.seg(P, B) + S.seg(P, C) + S.seg(P, D, true)
      + L([A, B, C, D, P], ['A', 'B', 'C', 'D', 'P'], [[-10, -6], [-10, 6], [10, 6], [10, -6], [-12, 2]]));
  }
  // c03：平行四边形 ABCD，AB=7，BC=12，∠ABC=60°，四条内角平分线所在直线围成 EFGH
  {
    const s3 = Math.sqrt(3), m = S.map(16.5, 22, 128), b = [0, 0], c = [12, 0], a = [3.5, 3.5 * s3], d = S.add(a, c), V = [a, b, c, d];
    const bis = i => { const P = V[i], u = S.sub(V[(i + 1) % 4], P), w = S.sub(V[(i + 3) % 4], P), lu = Math.hypot(...u), lw = Math.hypot(...w); return [P, S.add(P, [u[0] / lu + w[0] / lw, u[1] / lu + w[1] / lw])]; };
    const Ls = [0, 1, 2, 3].map(bis), X = (i, j) => S.meet(Ls[i][0], Ls[i][1], Ls[j][0], Ls[j][1]);
    const e = X(0, 1), f = X(1, 2), g = X(2, 3), h = X(3, 0);
    const far = (P, Q, R) => (S.dist(P, Q) > S.dist(P, R) ? Q : R);
    const [A, B, C, D, E, Fp, G, H] = [a, b, c, d, e, f, g, h].map(m);
    out.c03 = S.wrap(300, 150, S.poly([A, B, C, D]) + S.seg(A, far(A, E, H)) + S.seg(B, far(B, E, Fp)) + S.seg(C, far(C, Fp, G)) + S.seg(D, far(D, G, H)) + S.poly([E, Fp, G, H], '#efe5d2')
      + L([A, B, C, D, E, Fp, G, H], ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [[-6, -12], [-10, 6], [10, 6], [8, -12], [-12, 0], [0, -14], [12, 0], [0, 14]]));
  }
  // c04：矩形 ABCD，AB=10，AD=8，M 在 CD 上，沿 EF 折叠使 A 落在 M（按 DM=5 画）
  {
    const m = S.map(22, 40, 196), a = [0, 8], b = [10, 8], c = [10, 0], d = [0, 0], mm = [5, 0], e = [8.9, 8], f = [0, 8 - 89 / 16];
    const [A, B, C, D, M, E, Fp] = [a, b, c, d, mm, e, f].map(m);
    out.c04 = S.wrap(300, 215, S.poly([A, B, C, D]) + S.seg(E, Fp, true) + S.seg(E, M) + S.seg(Fp, M)
      + L([A, B, C, D, M, E, Fp], ['A', 'B', 'C', 'D', 'M', 'E', 'F'], [[-10, -6], [10, -6], [10, 6], [-10, 6], [0, 14], [0, -14], [-11, 0]]));
  }
  // c05：正方形 ABCD，边长 8，菱形 EFGH，AH=3（按 DG=2.5 画）
  {
    const m = S.map(22, 60, 200), x = 2.5, ee = Math.sqrt(16 + x * x);
    const a = [0, 8], b = [8, 8], c = [8, 0], d = [0, 0], h = [0, 5], g = [x, 0], e = [ee, 8], f = [ee + x, 3];
    const [A, B, C, D, H, G, E, Fp] = [a, b, c, d, h, g, e, f].map(m);
    out.c05 = S.wrap(300, 220, S.poly([A, B, C, D]) + S.poly([E, Fp, G, H]) + S.seg(C, Fp)
      + L([A, B, C, D, H, G, E, Fp], ['A', 'B', 'C', 'D', 'H', 'G', 'E', 'F'], [[-10, -6], [10, -6], [10, 6], [-10, 6], [-11, 0], [0, 14], [0, -14], [12, -2]]));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s2/23.3',
  title: '矩形、菱形与正方形',
  review: { status: 'pending' },
  audit: {
    blind: '2026-10-07',
    rounds: 2,
    note: '子代理盲解复核两轮通过。第 1 轮：e01 换题（原题与网上 ∠CAE=15° 求 ∠BOE 同数据，改为 DE⊥AC、角的倍数）；e05 改为宽 3、4 纸条重叠面积分类并用垂线段最短排除，补足扩展档 5 级；c02 换数据为 PA=7、PB=6、PC=11 并加问 PD；c03 由直接求面积改为反求 BC（分类 + 一元二次方程）；c04 由 60° 菱形折到中点改为矩形折叠的 DM 取值范围加折痕长。第 2 轮通过后按意见把 c04 范围改为极端位置加增减性说理，c02 写全作垂线推 PA²+PC²=PB²+PD² 的过程。演示：卡片挂 quadFamily，b08、c04 解析挂 motion 翻折。',
  },

  intro: [
    {
      title: '矩形和它的性质',
      body: '四个内角都是直角的四边形叫作**矩形**（就是小学的长方形）。四个角都是直角，两组对边分别平行，所以矩形是一种特殊的平行四边形，平行四边形的性质它全都有。它还多一条**性质定理：矩形的两条对角线相等**。于是对角线的交点到四个顶点一样远。矩形是中心对称图形，也是轴对称图形，对称轴是两组对边的垂直平分线。下面的演示把平行四边形调成矩形、菱形、正方形，注意对角线的变化。',
      example: '矩形 $ABCD$ 的对角线交于 $O$，$BD=10$，那么 $OA=OB=OC=OD=5$，图中 $\\triangle OAB$、$\\triangle OBC$ 都是等腰三角形。',
      demo: { type: 'quadFamily' },
    },
    {
      title: '矩形的判定',
      body: '除了用定义（四个内角都是直角），课本给出两个**判定定理**：① 有一个内角是直角的**平行四边形**是矩形；② 对角线相等的**平行四边形**是矩形。用判定定理时，先要说明它是平行四边形。',
      example: '工人做矩形门框，先量两组对边分别相等（说明是平行四边形），再量两条对角线相等，就能确定门框是矩形。',
      pitfall: '两个判定定理的前提都是“平行四边形”，少了这个前提，结论不一定成立。',
    },
    {
      title: '菱形和它的性质',
      body: '四条边都相等的四边形叫作**菱形**。两组对边分别相等，所以菱形也是平行四边形。**性质定理：菱形的两条对角线互相垂直**（$AB=AD$，$O$ 是 $BD$ 中点，三线合一）。同样由等腰三角形三线合一，每条对角线还平分一组对角。对角线把菱形分成四个全等的直角三角形，所以**菱形的面积等于两条对角线乘积的一半**。',
      example: '对角线长 $14$ 和 $48$ 的菱形：面积 $=\\frac12\\times14\\times48=336$，边长 $=\\sqrt{7^2+24^2}=25$。',
    },
    {
      title: '菱形的判定',
      body: '除了用定义（四条边都相等），还有两个**判定定理**：① 有一组邻边相等的**平行四边形**是菱形；② 对角线互相垂直的**平行四边形**是菱形。',
      example: '平行四边形 $ABCD$ 的对角线交于 $O$，$OA=5$，$OB=12$，$AB=13$。因为 $5^2+12^2=13^2$，所以 $\\angle AOB=90^\\circ$，对角线互相垂直，它是菱形。',
      pitfall: '只有三条边相等的四边形不一定是菱形；判定定理同样要先有平行四边形。',
    },
    {
      title: '正方形',
      body: '四个内角都是直角、四条边都相等的四边形叫作**正方形**。正方形既是矩形又是菱形，所以两者的性质它都有：对角线相等、互相垂直、互相平分，两条对角线把它分成四个全等的等腰直角三角形，对角线和边的夹角都是 $45^\\circ$；它有 $4$ 条对称轴。反过来，既是矩形又是菱形的四边形是正方形。',
      example: '边长为 $5$ 的正方形：对角线长 $5\\sqrt2$，对角线分出的每个等腰直角三角形面积是 $\\frac{25}{4}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '23.3-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列说法中，正确的有（　　）（多选）',
      options: [
        '对角线相等的四边形是矩形',
        '对角线互相垂直的平行四边形是菱形',
        '有一个内角是直角的四边形是矩形',
        '有三个内角是直角的四边形是矩形',
        '对角线互相垂直且相等的四边形是正方形',
        '有一组邻边相等的矩形是正方形',
      ],
      answer: [1, 3, 5],
      explain: [
        'A 错：等腰梯形的两条对角线也相等，但它不是矩形。判定定理要求先是平行四边形。',
        'B 对：这是菱形的判定定理 2。',
        'C 错：直角梯形有直角，却不是矩形。“有一个内角是直角”只对平行四边形管用。',
        'D 对：四边形内角和是 $360^\\circ$，三个角是 $90^\\circ$，第四个角也是 $90^\\circ$，由矩形的定义，它是矩形。',
        'E 错：比如两条长 $4$ 的线段互相垂直，一条被另一条分成 $1$ 和 $3$，四个端点连成的四边形（筝形）对角线垂直且相等，但对角线不互相平分，连平行四边形都不是。',
        'F 对：矩形对边相等，再有一组邻边相等，四条边就都相等，它又是菱形；既是矩形又是菱形，所以是正方形。',
        '坑：把“平行四边形 + 条件”的判定定理，当成“四边形 + 条件”来用。',
      ],
      verify: () => {
        const T = QUAD233;
        const props = [
          [T.diagEq, T.rect],
          [q => T.para(q) && T.diagPerp(q), T.rhombus],
          [q => T.rightCount(q) >= 1, T.rect],
          [q => T.rightCount(q) >= 3, T.rect],
          [q => T.diagPerp(q) && T.diagEq(q), T.square],
          [q => T.rect(q) && T.adjEq(q), T.square],
        ];
        return props.map(([h, c], i) => (T.samples.some(q => h(q) && !c(q)) ? -1 : i)).filter(i => i >= 0);
      },
    },
    {
      id: '23.3-b02',
      level: 'basic',
      type: 'multi',
      stem: '下列性质中，菱形一定具有、而一般的平行四边形不一定具有的是（　　）（多选）',
      options: [
        '四条边都相等',
        '对角线互相垂直',
        '每条对角线平分一组对角',
        '对角线相等',
        '是中心对称图形',
        '是轴对称图形',
      ],
      answer: [0, 1, 2, 5],
      explain: [
        'A：菱形的定义，一般平行四边形只有对边相等。',
        'B：菱形的性质定理；一般平行四边形的对角线不垂直。',
        'C：菱形中 $\\triangle ABD$ 是等腰三角形，$AO$ 是底边上的中线，由三线合一它也平分 $\\angle BAD$；一般平行四边形没有这个性质。',
        'D：对角线相等是矩形的性质，菱形不一定有（正方形以外的菱形对角线不相等）。',
        'E：所有平行四边形都是中心对称图形，这不是菱形“多出来”的性质。坑：容易把它也选上。',
        'F：菱形沿任意一条对角线折叠，两边完全重合，是轴对称图形；一般平行四边形不是轴对称图形。',
      ],
      verify: () => {
        const T = QUAD233, rhombi = [T.samples[2], T.samples[3]], paras = [T.samples[4]];
        const props = [T.rhombus, T.diagPerp, T.diagBisect, T.diagEq, T.central, T.axis];
        return props.map((p, i) => (rhombi.every(p) && paras.some(q => !p(q)) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '23.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 的对角线 $AC$、$BD$ 相交于点 $O$，$\\angle AOB=2\\angle BOC$，$AB=6$。求 $AC$ 的长和矩形 $ABCD$ 的面积（根式化成最简二次根式）。',
      figure: FIG233.b03,
      blanks: [
        { kind: 'real', label: '$AC=$', answer: '4√3', simplest: true },
        { kind: 'real', label: '面积', answer: '12√3', simplest: true },
      ],
      explain: [
        '$\\angle AOB+\\angle BOC=180^\\circ$，$\\angle AOB=2\\angle BOC$，所以 $\\angle BOC=60^\\circ$，$\\angle AOB=120^\\circ$。',
        '矩形的对角线相等且互相平分，$OB=OC$，所以 $\\triangle BOC$ 是等边三角形，$\\angle ACB=60^\\circ$，在 $\\text{Rt}\\triangle ABC$ 中 $\\angle BAC=30^\\circ$，$BC=\\frac12AC$。',
        '由勾股定理 $AB^2=AC^2-BC^2=\\frac34AC^2=36$，$AC=4\\sqrt3$，$BC=2\\sqrt3$，面积 $=6\\times2\\sqrt3=12\\sqrt3$。',
        '坑：等边三角形是 $\\triangle BOC$ 而不是 $\\triangle AOB$（$\\angle AOB=120^\\circ$），误把 $AB$ 当成等于 $OB$ 会得到 $AC=12$。',
      ],
      verify: () => {
        const S = SVG233, A = [0, 6], B = [0, 0];
        const bc = bisect233(b => { const O = [b / 2, 3]; return S.ang(O, A, B) - 2 * S.ang(O, B, [b, 0]); }, 0.5, 30);
        return [S.dist(A, [bc, 0]), 6 * bc];
      },
    },
    {
      id: '23.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，菱形 $ABCD$ 的周长是 $20$，两条对角线 $AC$、$BD$ 的长度之和是 $14$。求这个菱形的面积，以及边 $BC$ 上的高。',
      figure: FIG233.b04,
      blanks: [
        { kind: 'num', label: '面积', answer: '24' },
        { kind: 'num', label: '$BC$ 边上的高', answer: '24/5' },
      ],
      explain: [
        '边长 $=20\\div4=5$。设对角线交于 $O$，菱形的对角线互相垂直平分，$OA+OB=\\frac12\\times14=7$，在 $\\text{Rt}\\triangle AOB$ 中 $OA^2+OB^2=25$。',
        '$(OA+OB)^2=OA^2+2OA\\cdot OB+OB^2$，所以 $2OA\\cdot OB=49-25=24$。',
        '面积 $=\\frac12AC\\cdot BD=\\frac12\\cdot2OA\\cdot2OB=2OA\\cdot OB=24$。（不必先求出 $OA=4$、$OB=3$。）',
        '菱形也是平行四边形，面积 $=$ 底 $\\times$ 高，$BC$ 边上的高 $=24\\div5=\\dfrac{24}{5}$。',
        '坑：面积写成两条对角线的乘积 $48$，忘了乘 $\\frac12$；或者把整条对角线当成直角边用勾股定理。',
      ],
      verify: () => {
        const a = roots233(t => t * t + (7 - t) * (7 - t) - 25, 0, 7)[0], S = 2 * a * (7 - a);
        return [Q233(S), Q233(S / 5)];
      },
    },
    {
      id: '23.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，在菱形 $ABCD$ 中，$\\angle ABC=40^\\circ$，点 $E$ 在对角线 $BD$ 上，连接 $AE$、$CE$，$\\angle BAE=30^\\circ$。求 $\\angle BCE$ 和 $\\angle AEC$ 的度数。',
      figure: FIG233.b05,
      blanks: [
        { kind: 'angle', label: '$\\angle BCE=$', answer: '30°' },
        { kind: 'angle', label: '$\\angle AEC=$', answer: '100°' },
      ],
      explain: [
        '菱形中 $AB=CB$，$AD=CD$，$BD$ 公共，$\\triangle ABD\\cong\\triangle CBD$（SSS），所以 $\\angle ABD=\\angle CBD=\\frac12\\times40^\\circ=20^\\circ$。',
        '在 $\\triangle ABE$ 和 $\\triangle CBE$ 中，$AB=CB$，$\\angle ABE=\\angle CBE$，$BE$ 公共，两三角形全等（SAS），$\\angle BCE=\\angle BAE=30^\\circ$。',
        '$\\angle AED$ 是 $\\triangle ABE$ 的外角，$\\angle AED=20^\\circ+30^\\circ=50^\\circ$；同理 $\\angle CED=50^\\circ$。所以 $\\angle AEC=100^\\circ$。',
        '坑：把 $\\angle ABE$ 当成整个 $\\angle ABC=40^\\circ$，得出 $\\angle AEC=140^\\circ$；对角线平分的是一组对角。',
      ],
      verify: () => {
        const S = SVG233, a = (40 * Math.PI) / 180, B = [0, 0], C = [5, 0], A = [5 * Math.cos(a), 5 * Math.sin(a)], D = S.add(A, C);
        const E = S.at(B, D, bisect233(t => S.ang(A, B, S.at(B, D, t)) - 30, 0.01, 0.99));
        return [D233(S.ang(C, B, E)), D233(S.ang(E, A, C))];
      },
    },
    {
      id: '23.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 中，点 $E$ 在对角线 $AC$ 上，$AE=AB$，连接 $BE$、$DE$。求 $\\angle EBC$ 和 $\\angle DEC$ 的度数。',
      figure: FIG233.b06,
      blanks: [
        { kind: 'angle', label: '$\\angle EBC=$', answer: '22.5°' },
        { kind: 'angle', label: '$\\angle DEC=$', answer: '112.5°' },
      ],
      explain: [
        '正方形的对角线和边的夹角是 $45^\\circ$，$\\angle BAE=45^\\circ$。$AE=AB$，所以 $\\angle ABE=\\angle AEB=\\frac12(180^\\circ-45^\\circ)=67.5^\\circ$，$\\angle EBC=90^\\circ-67.5^\\circ=22.5^\\circ$。',
        '$AB=AD$，$\\angle BAE=\\angle DAE=45^\\circ$，$AE$ 公共，$\\triangle ABE\\cong\\triangle ADE$（SAS），所以 $\\angle AED=\\angle AEB=67.5^\\circ$。',
        '$\\angle DEC=180^\\circ-\\angle AED=112.5^\\circ$。',
        '坑：把 $\\angle DEC$ 和 $\\angle AED$ 混为一谈填 $67.5^\\circ$；或者忘了 $\\angle BAC=45^\\circ$，直接用 $90^\\circ$ 去算底角。',
      ],
      verify: () => {
        const S = SVG233, A = [0, 5], B = [0, 0], C = [5, 0], D = [5, 5], E = S.add(A, [5 / Math.SQRT2, -5 / Math.SQRT2]);
        return [D233(S.ang(B, E, C)), D233(S.ang(E, D, C))];
      },
    },
    {
      id: '23.3-b07',
      level: 'basic',
      type: 'multi',
      stem: '如图，平行四边形 $ABCD$ 的对角线 $AC$、$BD$ 相交于点 $O$。单独添加下列哪个条件，能使平行四边形 $ABCD$ 成为矩形？（多选）',
      figure: FIG233.b07,
      options: [
        '$\\angle ABC=\\angle BCD$',
        '$AC\\perp BD$',
        '$\\angle OAB=\\angle OBA$',
        '$AB=BC$',
        '$\\angle ABD=\\angle CBD$',
        '$AB^2+BC^2=AC^2$',
      ],
      answer: [0, 2, 5],
      explain: [
        'A 能：$AB\\parallel CD$，$\\angle ABC+\\angle BCD=180^\\circ$，两角相等，都是 $90^\\circ$；有一个内角是直角的平行四边形是矩形。',
        'B 不能：对角线互相垂直的平行四边形是菱形。',
        'C 能：等角对等边，$OA=OB$；平行四边形对角线互相平分，$AC=2OA=2OB=BD$；对角线相等的平行四边形是矩形。',
        'D 不能：邻边相等的平行四边形是菱形。',
        'E 不能：$AD\\parallel BC$ 得 $\\angle ADB=\\angle CBD=\\angle ABD$，于是 $AB=AD$，得到的是菱形。',
        'F 能：由勾股定理的逆定理，$\\angle ABC=90^\\circ$。',
        '坑：把菱形的判定条件（B、D、E）和矩形的判定条件混在一起。',
      ],
      verify: () => {
        const S = SVG233, T = QUAD233, eq = (a, b) => Math.abs(a - b) < 1e-7, qs = [];
        for (let a = 1; a <= 5; a++) for (let b = 1; b <= 5; b++) for (let t = 20; t <= 160; t += 5) {
          const r = (t * Math.PI) / 180, B = [0, 0], C = [a, 0], A = [b * Math.cos(r), b * Math.sin(r)];
          qs.push([A, B, C, S.add(A, C)]);
        }
        const conds = [
          ([A, B, C, D]) => eq(S.ang(B, A, C), S.ang(C, B, D)),
          T.diagPerp,
          ([A, B, C, D]) => { const O = S.mid(A, C); return eq(S.ang(A, O, B), S.ang(B, O, A)); },
          ([A, B, C]) => eq(S.dist(A, B), S.dist(B, C)),
          ([A, B, C, D]) => eq(S.ang(B, A, D), S.ang(B, C, D)),
          ([A, B, C]) => eq(S.dist(A, B) ** 2 + S.dist(B, C) ** 2, S.dist(A, C) ** 2),
        ];
        return conds.map((c, i) => (qs.some(c) && qs.filter(c).every(T.rect) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '23.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，矩形纸片 $ABCD$ 中，$AB=6$，$AD=10$。折叠纸片，使点 $B$ 落在边 $AD$ 上的点 $F$ 处，折痕为 $AE$（点 $E$ 在边 $BC$ 上），连接 $EF$、$DE$。求 $CE$ 和 $DE$ 的长（根式化成最简二次根式）。',
      figure: FIG233.b08,
      blanks: [
        { kind: 'num', label: '$CE=$', answer: '4' },
        { kind: 'real', label: '$DE=$', answer: '2√13', simplest: true },
      ],
      explain: [
        '折叠前后图形全等：$AF=AB=6$，$\\angle AFE=\\angle B=90^\\circ$。又 $\\angle BAF=90^\\circ$，四边形 $ABEF$ 有三个内角是直角，由内角和第四个角也是直角，它是矩形。',
        '矩形 $ABEF$ 有一组邻边 $AB=AF$，四条边都相等，所以它是正方形，$BE=AB=6$，$CE=10-6=4$。',
        '$\\angle C=90^\\circ$，$CD=AB=6$，$DE=\\sqrt{4^2+6^2}=\\sqrt{52}=2\\sqrt{13}$。',
        '坑：以为折痕过 $BC$ 的中点，得 $CE=5$；关键是看出折出来的是正方形。',
      ],
      demo: { type: 'motion', mode: 'reflect', shape: [[0, 6], [0, 0], [6, 0]], labels: ['A', 'B', 'E'], axis: [[0, 6], [6, 0]], view: [-1, 11, -1, 7] },
      verify: () => {
        const S = SVG233, A = [0, 6], B = [0, 0];
        const e = bisect233(t => S.refl(B, A, [t, 0])[1] - 6, 0.1, 9.9), E = [e, 0];
        return [Q233(10 - e), S.dist(E, [10, 6])];
      },
    },
    {
      id: '23.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '正方形 $ABCD$ 中，以边 $AD$ 为一边作等边三角形 $ADE$（点 $E$ 可以在正方形内部，也可以在正方形外部），连接 $BE$、$CE$。求 $\\angle BEC$ 的度数（有几个就填几个，用逗号隔开，只填数字，单位是度）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BEC$（度）', answer: ['150', '30'] },
      ],
      explain: [
        '无论哪种情况，$AE=AD=AB$，$DE=DA=DC$，$\\triangle ABE$、$\\triangle DCE$ 都是等腰三角形；并且图形关于 $AD$ 的垂直平分线对称，$EB=EC$。',
        '$E$ 在正方形内：$\\angle BAE=90^\\circ-60^\\circ=30^\\circ$，$\\angle ABE=\\frac12(180^\\circ-30^\\circ)=75^\\circ$，$\\angle EBC=15^\\circ$，同理 $\\angle ECB=15^\\circ$，$\\angle BEC=150^\\circ$。',
        '$E$ 在正方形外：$\\angle BAE=90^\\circ+60^\\circ=150^\\circ$，$\\angle ABE=15^\\circ$，$\\angle EBC=75^\\circ$，同理 $\\angle ECB=75^\\circ$，$\\angle BEC=30^\\circ$。',
        '坑：只画了一种位置，漏掉另一个答案。',
      ],
      verify: () => {
        const S = SVG233, A = [0, 1], B = [0, 0], C = [1, 0], D = [1, 1], h = Math.sqrt(3) / 2;
        return [[0.5, 1 - h], [0.5, 1 + h]].map(E => Q233(Math.round(S.ang(E, B, C) * 1e6) / 1e6));
      },
    },

    // ---------- 扩展 ----------
    {
      id: '23.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 的对角线 $AC$、$BD$ 相交于点 $O$，$DE\\perp AC$，垂足为 $E$，$\\angle EDC=2\\angle ADE$，$AC=8$。求 $\\angle BDE$ 的度数和 $OE$ 的长。',
      figure: FIG233.e01,
      blanks: [
        { kind: 'angle', label: '$\\angle BDE=$', answer: '30°' },
        { kind: 'num', label: '$OE=$', answer: '2' },
      ],
      explain: [
        '$\\angle ADE+\\angle EDC=\\angle ADC=90^\\circ$，又 $\\angle EDC=2\\angle ADE$，所以 $\\angle ADE=30^\\circ$，$\\angle EDC=60^\\circ$。',
        '在 $\\text{Rt}\\triangle ADE$ 中，$\\angle DAE=90^\\circ-30^\\circ=60^\\circ$。矩形的对角线相等且互相平分，$OA=OD=\\frac12AC=4$，所以 $\\triangle AOD$ 是等边三角形，$AD=4$。',
        '$DE$ 是等边三角形 $AOD$ 边 $OA$ 上的高，由三线合一，$E$ 是 $OA$ 的中点，$OE=2$；$DE$ 还平分 $\\angle ADO$，$\\angle ODE=30^\\circ$，即 $\\angle BDE=30^\\circ$。',
        '也可以这样算：$\\angle OCD=90^\\circ-\\angle DAC=30^\\circ$，$OC=OD$，$\\angle ODC=30^\\circ$，$\\angle BDE=\\angle EDC-\\angle ODC=60^\\circ-30^\\circ=30^\\circ$。',
        '转弯：由角的倍数关系先得出 $\\angle DAC=60^\\circ$，再借“对角线相等且互相平分”看出等边三角形。坑：把 $\\angle BDE$ 当成 $\\angle EDC$，或以为垂足 $E$ 就是 $O$。',
      ],
      verify: () => {
        const S = SVG233, B = [0, 0];
        const parts = h => { const A = [0, h], D = [1, h], C = [1, 0], E = S.foot(D, A, C); return { A, D, C, E }; };
        const h = bisect233(t => { const { A, D, C, E } = parts(t); return S.ang(D, E, C) - 2 * S.ang(D, A, E); }, 0.1, 10);
        const { A, D, C, E } = parts(h), k = 8 / S.dist(A, C), O = S.mid(A, C);
        return [D233(S.ang(D, B, E)), Q233(R233(S.dist(O, E) * k))];
      },
    },
    {
      id: '23.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，菱形 $ABCD$ 的对角线 $AC=30$，$BD=16$，相交于点 $O$。点 $P$ 在边 $AB$ 上运动（不与 $A$、$B$ 重合），$PE\\perp AC$ 于点 $E$，$PF\\perp BD$ 于点 $F$，连接 $EF$。求 $EF$ 的最小值，以及此时 $AP$ 的长。',
      figure: FIG233.e02,
      blanks: [
        { kind: 'num', label: '$EF$ 的最小值', answer: '120/17' },
        { kind: 'num', label: '$AP=$', answer: '225/17' },
      ],
      explain: [
        '菱形的对角线互相垂直，$\\angle EOF=90^\\circ$；又 $\\angle PEO=\\angle PFO=90^\\circ$，四边形 $OEPF$ 有三个直角，是矩形。',
        '矩形的对角线相等：$EF=OP$。问题变成求 $OP$ 的最小值。',
        '由垂线段最短，$OP$ 最小时 $OP\\perp AB$。$OA=15$，$OB=8$，$AB=\\sqrt{15^2+8^2}=17$。用面积法：$\\frac12\\cdot OA\\cdot OB=\\frac12\\cdot AB\\cdot OP$，$OP=\\dfrac{15\\times8}{17}=\\dfrac{120}{17}$。',
        '此时在 $\\text{Rt}\\triangle AOP$ 中，$AP^2=15^2-\\left(\\frac{120}{17}\\right)^2=\\dfrac{225\\times(289-64)}{289}=\\dfrac{225^2}{17^2}$，$AP=\\dfrac{225}{17}$（小于 $17$，点 $P$ 确实在边上）。',
        '转弯：$EF$ 本身不好直接求，借矩形对角线相等换成 $OP$，再用垂线段最短。',
      ],
      verify: () => {
        const S = SVG233, A = [-15, 0], B = [0, -8];
        const ef = t => { const P = S.at(A, B, t); return S.dist([P[0], 0], [0, P[1]]); };
        const t = min233(ef, 0, 1), H = S.foot([0, 0], A, B);  // 数值最小点应与 O 到 AB 的垂足重合
        if (S.dist(S.at(A, B, t), H) > 1e-6) return [NaN, NaN];
        return [Q233(R233(ef(t))), Q233(R233(S.dist(A, H)))];
      },
    },
    {
      id: '23.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，菱形 $ABCD$ 中，$AB=4$，$\\angle ABC=60^\\circ$，点 $E$ 是边 $AB$ 的中点，点 $P$ 在对角线 $AC$ 上运动。求 $PE+PB$ 的最小值（根式化成最简二次根式）。',
      figure: FIG233.e03,
      blanks: [
        { kind: 'real', label: '最小值', answer: '2√7', simplest: true },
      ],
      explain: [
        '菱形的对角线互相垂直平分，$AC$ 是 $BD$ 的垂直平分线，所以 $PB=PD$（$B$、$D$ 关于直线 $AC$ 对称）。',
        '$PE+PB=PE+PD\\geq DE$，当 $P$ 是 $DE$ 与 $AC$ 的交点时取等号，最小值就是 $DE$ 的长。',
        '求 $DE$：$\\angle BAD=180^\\circ-60^\\circ=120^\\circ$。过 $D$ 作 $DH\\perp$ 直线 $AB$，垂足 $H$ 在 $BA$ 的延长线上，$\\angle DAH=60^\\circ$，$\\angle ADH=30^\\circ$，$AH=\\frac12AD=2$，$DH=\\sqrt{4^2-2^2}=2\\sqrt3$。',
        '$EH=EA+AH=2+2=4$，$DE=\\sqrt{4^2+(2\\sqrt3)^2}=\\sqrt{28}=2\\sqrt7$。',
        '坑：直接连 $BE$ 得 $2$（那是 $P$ 在 $AB$ 上才行），或者把 $\\angle BAD$ 当成 $60^\\circ$，得出 $DE=2\\sqrt3$。',
      ],
      verify: () => {
        const S = SVG233, s3 = Math.sqrt(3), A = [2, 2 * s3], B = [0, 0], C = [4, 0], E = S.mid(A, B);
        const f = t => { const P = S.at(A, C, t); return S.dist(P, E) + S.dist(P, B); };
        return f(min233(f, 0, 1));
      },
    },
    {
      id: '23.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=9$，$BC=12$，对角线 $AC$、$BD$ 相交于点 $O$。点 $P$ 在直线 $AD$ 上，它到直线 $AC$ 的距离是 $2$。求点 $P$ 到直线 $BD$ 的距离（全部填出，用逗号隔开）。',
      figure: FIG233.e04,
      blanks: [
        { kind: 'nums', label: '距离', answer: ['26/5', '46/5'] },
      ],
      explain: [
        '$AC=\\sqrt{9^2+12^2}=15$，矩形对角线相等且互相平分，$OA=OD=\\frac{15}2$；$S_{\\triangle AOD}=\\frac14S_{\\text{矩形}}=\\frac14\\times9\\times12=27$。设 $P$ 到 $AC$、$BD$ 的距离为 $d_1=2$、$d_2$。',
        '$P$ 在线段 $AD$ 上：$S_{\\triangle AOP}+S_{\\triangle DOP}=S_{\\triangle AOD}$，即 $\\frac12\\cdot\\frac{15}2(d_1+d_2)=27$，$d_1+d_2=\\frac{36}5$，$d_2=\\frac{26}5$。',
        '$P$ 在 $AD$ 延长线上（$D$ 在 $A$、$P$ 之间）：$S_{\\triangle AOP}-S_{\\triangle DOP}=27$，$d_1-d_2=\\frac{36}5$，要求 $d_1\\geq\\frac{36}5$，与 $d_1=2$ 矛盾，不存在。',
        '$P$ 在 $DA$ 延长线上（$A$ 在 $D$、$P$ 之间）：$S_{\\triangle DOP}-S_{\\triangle AOP}=27$，$d_2-d_1=\\frac{36}5$，$d_2=\\frac{46}5$。',
        '所以距离是 $\\frac{26}5$ 或 $\\frac{46}5$。转弯：点在“直线”上，要分三段讨论，面积由“和”变成“差”，还要排除一种。',
      ],
      verify: () => {
        const S = SVG233, A = [0, 9], B = [0, 0], C = [12, 0], D = [12, 9];
        const ps = roots233(p => S.toLine([p, 9], A, C) - 2, -60, 72, 132000);
        return ps.map(p => Q233(R233(S.toLine([p, 9], B, D))));
      },
    },
    {
      id: '23.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，两张长方形纸条的宽分别是 $3$ 和 $4$，交叉叠放，重叠部分是四边形 $ABCD$，其中 $AD$、$BC$ 在宽为 $3$ 的纸条的两边上，$AB$、$CD$ 在宽为 $4$ 的纸条的两边上。(1) 若四边形 $ABCD$ 有一条边长为 $5$，求它的面积（全部填出，用逗号隔开）；(2) 若它有一条边长为 $\\frac72$，求它的面积（有几个就填几个，用逗号隔开）。',
      figure: FIG233.e05,
      blanks: [
        { kind: 'nums', label: '(1) 面积', answer: ['15', '20'] },
        { kind: 'nums', label: '(2) 面积', answer: ['14'] },
      ],
      explain: [
        '每张纸条的两边平行，$AD\\parallel BC$，$AB\\parallel CD$，四边形 $ABCD$ 是平行四边形。',
        '同一个面积两种算法：以 $BC$ 为底，高是 $AD$、$BC$ 之间的距离 $3$，$S=3BC$；以 $AB$ 为底，高是 $4$，$S=4AB$。所以 $3BC=4AB$，$AB:BC=3:4$。',
        '边长的限制：$AB$ 连接宽为 $3$ 的纸条的两边，由垂线段最短，$AB\\geq3$；同理 $BC\\geq4$（两张纸条垂直时取等号，重叠部分是矩形）。',
        '(1) 若 $AB=5$：$S=4\\times5=20$，$BC=\\frac{20}3\\geq4$，可以。若 $BC=5$：$S=3\\times5=15$，$AB=\\frac{15}4\\geq3$，可以。面积是 $15$ 或 $20$。',
        '(2) 若 $AB=\\frac72$：$\\frac72\\geq3$，$S=4\\times\\frac72=14$，$BC=\\frac{14}3\\geq4$，可以。若 $BC=\\frac72$：$\\frac72<4$，与 $BC\\geq4$ 矛盾，不可能。面积只能是 $14$。',
        '转弯：先用“同一个面积的两种算法”得到邻边之比，再按“已知的是哪条边”分类，最后用垂线段最短检验。坑：(2) 照搬 (1) 得出两个答案；或者以为重叠部分是菱形（宽度不同时邻边不相等）。',
      ],
      verify: () => {
        const areas = L => {
          const out = [];
          [th => 3 / Math.sin(th) - L, th => 4 / Math.sin(th) - L].forEach(f => roots233(f, 0.01, Math.PI / 2 - 1e-9).forEach(th => {
            const s = Q233(R233((4 * 3) / Math.sin(th)));
            if (!out.some(x => x.eq(s))) out.push(s);
          }));
          return out;
        };
        return [areas(5), areas(3.5)];
      },
    },
    {
      id: '23.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，菱形 $ABCD$ 中，$AB=6$，$\\angle ABC=120^\\circ$。点 $P$ 在对角线 $AC$ 上（不与 $A$、$C$ 重合），且 $\\triangle PBC$ 是等腰三角形。求 $AP$ 的长（全部填出，用逗号隔开，根式化成最简二次根式）。',
      figure: FIG233.e06,
      blanks: [
        { kind: 'reals', label: '$AP=$', answer: ['4√3', '6√3-6'], simplest: true },
      ],
      explain: [
        '$\\angle BCD=180^\\circ-120^\\circ=60^\\circ$，菱形的对角线平分一组对角，$\\angle BCA=30^\\circ$。设对角线交于 $O$，$BO\\perp AC$，$BO=\\frac12BC=3$，$CO=\\sqrt{36-9}=3\\sqrt3$，$AC=6\\sqrt3$。',
        '$PB=PC$：$P$ 在 $BC$ 的垂直平分线上，设 $BC$ 中点为 $M$，$CM=3$，$\\angle PCM=30^\\circ$，$PM=\\frac12PC$，$PC^2-\\frac14PC^2=9$，$PC=2\\sqrt3$，$AP=6\\sqrt3-2\\sqrt3=4\\sqrt3$。',
        '$CP=CB=6$：$AP=6\\sqrt3-6$（大于 $0$，$P$ 在 $AC$ 上）。',
        '$BP=BC$：$\\angle BPC=\\angle BCP=30^\\circ$，$\\angle PBC=120^\\circ=\\angle ABC$，$P$ 落在直线 $BA$ 上，只能是点 $A$，不合题意。',
        '所以 $AP=4\\sqrt3$ 或 $6\\sqrt3-6$。坑：三种情况都算，忘了排除 $P$ 与 $A$ 重合。',
      ],
      verify: () => {
        const S = SVG233, s3 = Math.sqrt(3), A = [-3, 3 * s3], B = [0, 0], C = [6, 0], P = t => S.at(A, C, t);
        const fs = [t => S.dist(P(t), B) - S.dist(P(t), C), t => S.dist(C, P(t)) - 6, t => S.dist(B, P(t)) - 6];
        const out = [];
        fs.forEach(f => roots233(f, 1e-6, 1 - 1e-6).forEach(t => { const ap = S.dist(A, P(t)); if (!out.some(x => Math.abs(x - ap) < 1e-6)) out.push(ap); }));
        return out;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '23.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 的边长为 $6$，点 $P$ 在边 $BC$ 上（不与 $B$、$C$ 重合），点 $G$ 在 $BC$ 的延长线上，$CE$ 平分 $\\angle DCG$。过点 $P$ 作 $PE\\perp AP$，交射线 $CE$ 于点 $E$。(1) 当 $\\triangle PCE$ 是等腰三角形时，求 $BP$ 的长；(2) 求 $\\triangle PCE$ 面积的最大值。',
      figure: FIG233.c01,
      blanks: [
        { kind: 'real', label: '(1) $BP=$', answer: '6√2-6', simplest: true },
        { kind: 'num', label: '(2) 最大面积', answer: '9/2' },
      ],
      explain: [
        '思路：$\\angle APE=90^\\circ$，先找 $AP$ 与 $PE$、$BP$ 与 $CE$ 的关系。在 $AB$ 上截取 $BM=BP$，连接 $MP$，构造和 $\\triangle PCE$ 全等的三角形。',
        '$AM=AB-BM=BC-BP=PC$。$\\triangle BMP$ 是等腰直角三角形，$\\angle BMP=45^\\circ$，$\\angle AMP=135^\\circ$；$CE$ 平分直角 $\\angle DCG$，$\\angle PCE=90^\\circ+45^\\circ=135^\\circ$。$\\angle MAP=90^\\circ-\\angle APB=\\angle CPE$。所以 $\\triangle AMP\\cong\\triangle PCE$（ASA），$CE=MP$。',
        '设 $BP=x$，则 $MP=\\sqrt2x$（等腰直角三角形），$CE=\\sqrt2x$，$PC=6-x$。',
        '(1) $\\angle PCE=135^\\circ$ 是钝角，等腰时只能 $PC=CE$：$6-x=\\sqrt2x$，$x=\\dfrac{6}{\\sqrt2+1}=6\\sqrt2-6$。',
        '(2) 过 $E$ 作 $EH\\perp$ 直线 $BC$ 于 $H$，$\\angle ECH=45^\\circ$，$EH=\\dfrac{CE}{\\sqrt2}=x$。$S_{\\triangle PCE}=\\frac12(6-x)\\cdot x=-\\frac12(x-3)^2+\\frac92$，当 $x=3$ 时最大，最大值 $\\dfrac92$。',
        '两个环节：先截长构造全等，把 $CE$ 用 $BP$ 表示；再分别用“钝角三角形只能两邻边相等”和配方求最值。',
      ],
      verify: () => {
        const S = SVG233, A = [0, 6], C = [6, 0], w = [Math.SQRT1_2, Math.SQRT1_2];
        const E = x => { const P = [x, 0], d = S.rot(S.sub(A, P), -90); return S.meet(P, S.add(P, d), C, S.add(C, w)); };
        const iso = roots233(x => S.dist([x, 0], C) - S.dist(C, E(x)), 0.001, 5.999);
        const area = x => S.area([[x, 0], C, E(x)]), xm = min233(x => -area(x), 0.001, 5.999);
        return [iso[0], Q233(R233(area(xm)))];
      },
    },
    {
      id: '23.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，点 $P$ 在正方形 $ABCD$ 的内部，$PA=7$，$PB=6$，$PC=11$。求 $\\angle APB$ 的度数、正方形 $ABCD$ 的面积和 $PD$ 的长（根式化成最简二次根式）。',
      figure: FIG233.c02,
      blanks: [
        { kind: 'angle', label: '$\\angle APB=$', answer: '135°' },
        { kind: 'real', label: '面积', answer: '85+42√2', simplest: true },
        { kind: 'real', label: '$PD=$', answer: '√134', simplest: true },
      ],
      explain: [
        '思路：三条线段散在三个三角形里，用正方形“$BA=BC$、$\\angle ABC=90^\\circ$”把它们拼到一起：把 $\\triangle ABP$ 绕点 $B$ 旋转 $90^\\circ$，使 $BA$ 与 $BC$ 重合，点 $P$ 转到点 $Q$。',
        '$\\triangle CBQ\\cong\\triangle ABP$：$BQ=BP=6$，$CQ=AP=7$，$\\angle BQC=\\angle BPA$，且 $\\angle PBQ=90^\\circ$。等腰直角 $\\triangle PBQ$ 中 $PQ=6\\sqrt2$，$\\angle BQP=45^\\circ$。',
        '在 $\\triangle PQC$ 中，$PQ^2+CQ^2=72+49=121=PC^2$，由勾股定理的逆定理 $\\angle PQC=90^\\circ$。所以 $\\angle APB=\\angle BQC=45^\\circ+90^\\circ=135^\\circ$。',
        '面积就是 $AB^2$。延长 $BP$，过 $A$ 作 $AH\\perp$ 直线 $BP$ 于 $H$，$\\angle APH=180^\\circ-135^\\circ=45^\\circ$，$AH=PH=\\frac{7\\sqrt2}2$。$AB^2=AH^2+BH^2=\\frac{49}2+\\left(6+\\frac{7\\sqrt2}2\\right)^2=\\frac{49}2+36+42\\sqrt2+\\frac{49}2=85+42\\sqrt2$。',
        '求 $PD$：过 $P$ 作 $PK\\perp AB$ 于 $K$，作 $PL\\perp BC$ 于 $L$，作 $PS\\perp CD$ 于 $S$，作 $PT\\perp DA$ 于 $T$。因为 $AB\\parallel CD$，$K$、$P$、$S$ 在同一条直线上；同理 $T$、$P$、$L$ 共线。四边形 $AKPT$、$KBLP$、$PLCS$、$TPSD$ 都有三个直角，都是矩形，对边相等：$AK=TP=DS$，$BK=PL=CS$。',
        '记 $KP=a$，$PL=b$，$PS=c$，$TP=d$。由勾股定理：$\\text{Rt}\\triangle AKP$ 中 $PA^2=AK^2+KP^2=d^2+a^2$；$\\text{Rt}\\triangle BKP$ 中 $BK=PL=b$，$PB^2=a^2+b^2$；$\\text{Rt}\\triangle CSP$ 中 $CS=PL=b$，$PC^2=b^2+c^2$；$\\text{Rt}\\triangle DSP$ 中 $DS=TP=d$，$PD^2=c^2+d^2$。',
        '两式相加：$PA^2+PC^2=a^2+b^2+c^2+d^2=PB^2+PD^2$。所以 $PD^2=49+121-36=134$，$PD=\\sqrt{134}$。',
        '环节：旋转 $90^\\circ$ 拼出可用勾股定理逆定理的三角形求角；借 $135^\\circ$ 的邻补角 $45^\\circ$ 作高求边长；再用正方形里的四个小矩形找出四条线段平方之间的关系。',
      ],
      verify: () => {
        const S = SVG233, B = [0, 0];
        const Pof = s => [(s * s - 85) / (2 * s), (s * s - 13) / (2 * s)];  // 由 PA=7、PC=11 与 PB 的关系定出 P 的两个坐标
        const s = bisect233(t => { const P = Pof(t); return P[0] * P[0] + P[1] * P[1] - 36; }, Math.sqrt(85) + 1e-9, 20);
        const A = [0, s], P = Pof(s);
        if (!(P[0] > 0 && P[1] > 0 && P[0] < s && P[1] < s)) return [NaN, NaN, NaN];
        return [D233(S.ang(P, A, B)), s * s, S.dist(P, [s, s])];
      },
    },
    {
      id: '23.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，平行四边形 $ABCD$ 中，$AB=7$，$\\angle ABC=60^\\circ$，四个内角的平分线所在直线两两相交，围成四边形 $EFGH$（$E$ 在 $\\angle A$、$\\angle B$ 的平分线上，$F$ 在 $\\angle B$、$\\angle C$ 的平分线上，$G$ 在 $\\angle C$、$\\angle D$ 的平分线上，$H$ 在 $\\angle D$、$\\angle A$ 的平分线上；图中按 $BC=12$ 画）。(1) 若四边形 $EFGH$ 的面积是 $4\\sqrt3$，求 $BC$ 的长（全部填出，用逗号隔开）；(2) 若四边形 $EFGH$ 的面积是平行四边形 $ABCD$ 面积的 $\\frac17$，求 $BC$ 的长（全部填出，用逗号隔开，根式化成最简二次根式）。',
      figure: FIG233.c03,
      blanks: [
        { kind: 'nums', label: '(1) $BC=$', answer: ['3', '11'] },
        { kind: 'reals', label: '(2) $BC=$', answer: ['8+√15', '8-√15'], simplest: true },
      ],
      explain: [
        '定形状：平行四边形邻角互补，两个半角之和是 $90^\\circ$，所以 $\\angle AEB=90^\\circ$，它的对顶角 $\\angle HEF=90^\\circ$；同理四个角都是直角，$EFGH$ 是矩形。（$BC=AB$ 时是菱形，对角线就是平分线，围不成四边形，所以 $BC\\neq7$。）',
        '先看 $BC>AB$：延长 $\\angle B$ 的平分线交 $AD$ 于 $M$，由 $AD\\parallel BC$ 得 $\\angle AMB=\\angle MBC=\\angle ABM$，$AM=AB$；等腰 $\\triangle ABM$ 中 $AE$ 平分顶角，三线合一，$E$ 是 $BM$ 中点。同理 $\\angle D$ 的平分线交 $BC$ 于 $N$，$CN=CD=AB$，$G$ 是 $DN$ 中点。',
        '$MD=BN=BC-AB$ 且 $MD\\parallel BN$，$BNDM$ 是平行四边形，$BM\\parallel ND$ 且 $BM=ND$；于是 $BE\\parallel NG$ 且 $BE=NG$，$BNGE$ 是平行四边形，对角线 $EG=BN=BC-AB$，且 $EG\\parallel BC$。',
        '$EF$ 在 $BM$ 上，$EG\\parallel BC$，所以 $\\angle FEG=\\angle MBC=30^\\circ$。$\\text{Rt}\\triangle EFG$ 中 $FG=\\frac12EG$，$EF=\\frac{\\sqrt3}2EG$，矩形面积 $=\\frac{\\sqrt3}4EG^2$。',
        '若 $BC<AB$：$\\angle B$ 的平分线改为交 $CD$，把上面 $AB$、$BC$ 的角色互换，同理另一条对角线 $FH=AB-BC$，$FH\\parallel AB$，它与 $\\angle B$ 平分线的夹角也是 $30^\\circ$，面积 $=\\frac{\\sqrt3}4(AB-BC)^2$。两种情况合起来：面积 $=\\frac{\\sqrt3}4(BC-7)^2$。',
        '(1) $\\frac{\\sqrt3}4(BC-7)^2=4\\sqrt3$，$(BC-7)^2=16$，$BC=11$ 或 $BC=3$。',
        '(2) $AB$ 边对应的高：$A$ 到 $BC$ 的距离 $=\\frac{\\sqrt3}2AB=\\frac{7\\sqrt3}2$，$S_{ABCD}=\\frac{7\\sqrt3}2BC$。由 $\\frac{\\sqrt3}4(BC-7)^2=\\frac17\\times\\frac{7\\sqrt3}2BC$ 得 $(BC-7)^2=2BC$，$BC^2-16BC+49=0$，$BC=8\\pm\\sqrt{15}$，两个都是正数且不等于 $7$，都符合。',
        '环节：平分线加平行线造等腰、借平行四边形把对角线转化成 $|BC-AB|$；再按 $BC$ 与 $AB$ 的大小分类，最后列方程（第 (2) 问是一元二次方程）。坑：只考虑 $BC>AB$，漏掉 $BC=3$。',
      ],
      verify: () => {
        const S = SVG233, s3 = Math.sqrt(3);
        const area = bc => {
          const B = [0, 0], C = [bc, 0], A = [3.5, 3.5 * s3], D = S.add(A, C), V = [A, B, C, D];
          const bis = i => { const P = V[i], u = S.sub(V[(i + 1) % 4], P), w = S.sub(V[(i + 3) % 4], P), lu = Math.hypot(...u), lw = Math.hypot(...w); return [P, S.add(P, [u[0] / lu + w[0] / lw, u[1] / lu + w[1] / lw])]; };
          const Ls = [0, 1, 2, 3].map(bis), X = (i, j) => S.meet(Ls[i][0], Ls[i][1], Ls[j][0], Ls[j][1]);
          return S.area([X(0, 1), X(1, 2), X(2, 3), X(3, 0)]);
        };
        const r1 = roots233(bc => area(bc) - 4 * s3, 0.2, 30).map(v => Q233(R233(v)));
        const r2 = roots233(bc => area(bc) - (3.5 * s3 * bc) / 7, 0.2, 30);
        return [r1, r2];
      },
    },
    {
      id: '23.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，矩形纸片 $ABCD$ 中，$AB=10$，$AD=8$，点 $M$ 在边 $CD$ 上。折叠纸片，使点 $A$ 落在点 $M$ 处，折痕 $EF$ 的端点 $E$、$F$ 分别在边 $AB$、$AD$ 上（可以与端点重合）。(1) 求 $DM$ 的取值范围（填出最小值和最大值）；(2) 当 $DM=6$ 时，求折痕 $EF$ 的长。',
      figure: FIG233.c04,
      blanks: [
        { kind: 'num', label: '(1) $DM$ 最小值', answer: '4' },
        { kind: 'num', label: '(1) $DM$ 最大值', answer: '8' },
        { kind: 'num', label: '(2) $EF=$', answer: '125/12' },
      ],
      explain: [
        '设 $DM=m$。折叠后 $AE=EM$，$AF=FM$，先把 $AE$、$AF$ 都用 $m$ 表示。（$m=0$ 时 $M$ 与 $D$ 重合，折痕平行于 $AB$，碰不到 $AB$，所以 $m>0$。）',
        '求 $AF$：设 $AF=y$，$FD=8-y$，在 $\\text{Rt}\\triangle FDM$ 中 $y^2=(8-y)^2+m^2$，$y=\\dfrac{64+m^2}{16}$。',
        '求 $AE$：过 $M$ 作 $MN\\perp AB$ 于 $N$，四边形 $ANMD$ 是矩形，$AN=m$，$MN=8$。设 $AE=x$，$EN=|x-m|$，在 $\\text{Rt}\\triangle ENM$ 中 $x^2=(x-m)^2+64$，$x=\\dfrac{m^2+64}{2m}$。',
        '(1) 先找两个极端位置。$F$ 与 $D$ 重合时 $AF=8$：$\\frac{64+m^2}{16}=8$，$m^2=64$，$m=8$。$E$ 与 $B$ 重合时 $AE=10$：$\\frac{m^2+64}{2m}=10$，$m^2-20m+64=0$，$m=4$ 或 $m=16$（$16>10$，$M$ 不在边 $CD$ 上，舍去），所以 $m=4$。',
        '再看 $M$ 从 $D$ 往 $C$ 移动（$m$ 变大）时的变化：$AF=\\frac{64+m^2}{16}$ 随 $m$ 变大而变大；$AE=\\frac m2+\\frac{32}m$，取 $0<m_1<m_2\\leq8$，$AE(m_1)-AE(m_2)=\\frac{(m_2-m_1)(64-m_1m_2)}{2m_1m_2}>0$（因为 $m_1m_2<64$），所以在 $0<m\\leq8$ 时 $AE$ 随 $m$ 变大而变小。',
        '于是：$m<4$ 时 $AE>10$，$E$ 跑到 $AB$ 外；$m>8$ 时 $AF>8$，$F$ 跑到 $AD$ 外；$4\\leq m\\leq8$ 时 $AE\\leq10$、$AF\\leq8$，都在边上。所以 $4\\leq DM\\leq8$。',
        '(2) $m=6$：$AE=\\frac{36+64}{12}=\\frac{25}3$，$AF=\\frac{64+36}{16}=\\frac{25}4$，$\\angle A=90^\\circ$，$EF=\\sqrt{\\left(\\frac{25}3\\right)^2+\\left(\\frac{25}4\\right)^2}=25\\sqrt{\\frac{16+9}{144}}=\\dfrac{125}{12}$。',
        '两个环节：在两个不同的直角三角形里用勾股定理，把 $AE$、$AF$ 都写成 $DM$ 的式子；再由“$E$、$F$ 不能跑出边”分别列条件，取公共部分。坑：只考虑一个端点的限制，得到 $DM\\leq8$ 或 $DM\\geq4$ 之一。',
      ],
      demo: { type: 'motion', mode: 'reflect', shape: [[0, 8], [8.333, 8], [0, 1.75]], labels: ['A', 'E', 'F'], axis: [[8.333, 8], [0, 1.75]], view: [-1, 11, -1, 9] },
      verify: () => {
        const S = SVG233, A = [0, 8], B = [10, 8], D = [0, 0];
        const ends = m => { const M = [m, 0], Mid = S.mid(A, M), P2 = S.add(Mid, [8, m]); return { E: S.meet(Mid, P2, A, B), F: S.meet(Mid, P2, A, D) }; };
        const ok = m => { const { E, F } = ends(m); return E[0] >= -1e-9 && E[0] <= 10 + 1e-9 && F[1] >= -1e-9 && F[1] <= 8 + 1e-9; };
        const lo = bisect233(m => ends(m).E[0] - 10, 1, 6), hi = bisect233(m => ends(m).F[1], 6, 9.99);
        if (ok(lo - 0.01) || ok(hi + 0.01) || !ok((lo + hi) / 2)) return [NaN, NaN, NaN];
        const { E, F } = ends(6);
        return [Q233(R233(lo)), Q233(R233(hi)), Q233(R233(S.dist(E, F)))];
      },
    },
    {
      id: '23.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 的边长为 $8$，菱形 $EFGH$ 的三个顶点 $E$、$G$、$H$ 分别在正方形的边 $AB$、$CD$、$DA$ 上（可以与端点重合），$AH=3$，连接 $CF$。(1) 当 $DG=2$ 时，求 $\\triangle FCG$ 的面积；(2) 当点 $G$ 在边 $CD$ 上移动（$G$ 不与 $C$、$D$ 重合，$E$ 随之在边 $AB$ 上变化）时，求 $\\triangle FCG$ 面积的最小值（根式化成最简二次根式）。',
      figure: FIG233.c05,
      blanks: [
        { kind: 'num', label: '(1) 面积', answer: '9' },
        { kind: 'real', label: '(2) 最小值', answer: '12-6√3', simplest: true },
      ],
      explain: [
        '思路：$\\triangle FCG$ 的底 $CG$ 在 $CD$ 上，关键是求 $F$ 到 $CD$ 的距离。过 $F$ 作 $FN\\perp$ 直线 $CD$ 于 $N$，连接 $GE$。',
        '$AB\\parallel CD$，$\\angle AEG=\\angle NGE$；菱形中 $HE\\parallel GF$，$\\angle HEG=\\angle FGE$。两式相减，$\\angle AEH=\\angle NGF$。又 $\\angle A=\\angle FNG=90^\\circ$，$HE=GF$，所以 $\\triangle AEH\\cong\\triangle NGF$（AAS），$FN=AH=3$，与 $G$ 的位置无关。',
        '(1) $CG=8-2=6$，面积 $=\\frac12\\times6\\times3=9$。',
        '(2) 设 $DG=x$，面积 $=\\frac12(8-x)\\cdot3$，$x$ 越大面积越小，要找 $x$ 能取到多大。',
        '限制来自 $E$ 必须在边 $AB$ 上：$DH=5$，$HG^2=25+x^2$；$HE^2=9+AE^2$。$HE=HG$ 得 $AE^2=16+x^2\\leq8^2$，$x\\leq4\\sqrt3$（小于 $8$，$G$ 在边上）。$x=4\\sqrt3$ 时 $E$ 与 $B$ 重合。',
        '最小面积 $=\\frac32(8-4\\sqrt3)=12-6\\sqrt3$。',
        '两个环节：先用全等把“动点 $F$”转化为到 $CD$ 的距离恒为 $3$；再从“$E$ 不能跑出边 $AB$”找出 $DG$ 的最大值。',
      ],
      verify: () => {
        const S = SVG233, D = [0, 0], C = [8, 0], H = [0, 5];
        const info = x => { const G = [x, 0], e = Math.sqrt(S.dist(H, G) ** 2 - 9), E = [e, 8], Fp = S.sub(S.add(E, G), H); return { e, area: S.area([Fp, C, G]) }; };
        const xmax = bisect233(x => info(x).e - 8, 0.01, 7.99);
        let best = Infinity;
        for (let i = 1; i <= 4000; i++) { const x = (xmax * i) / 4000; best = Math.min(best, info(x).area); }
        return [Q233(R233(info(2).area)), best];
      },
    },
  ],
});
