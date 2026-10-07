'use strict';

// 上海数学八年级下册 · 23.4 三角形的中位线与重心（按试读片段课本第 37～43 页）
// 知识范围：三角形的中位线（连接两边中点的线段，每个三角形有三条）；中位线定理（平行于第三边并且等于第三边的一半，课本用旋转 180°/倍长拼平行四边形证明）；
//   用中位线研究四边形（四边中点连成平行四边形）；三条中线交于一点（重心）；重心定理（重心到顶点的距离等于它到对边中点距离的两倍）；
//   重心与三个顶点连成的三个三角形面积相等（课本例 3）
// 可以使用：23.1～23.3（多边形内角和与外角和、平行四边形性质与判定、矩形菱形正方形的定义性质判定）；八上第 19～22 章（实数、二次根式、一元二次方程、
//   直角三角形：斜边中线、30° 角、勾股定理及逆定理、垂线段最短）；七年级全部（全等、等腰、平行线、面积）
// 还没学：平面直角坐标系与距离公式、一次函数、相似三角形与比例线段、三角比、圆
// 本节约定：带根号的结果用 real / reals 填空，并要求化成最简二次根式

const SVG234 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: (pts, fill = 'none') => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"/>`,
  shade: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#e9dcc3" stroke="none"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  ra: (P, Q, R, s = 9) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]], lu = Math.hypot(...u), lv = Math.hypot(...v);
    const a = [P[0] + (u[0] / lu) * s, P[1] + (u[1] / lu) * s], b = [P[0] + (v[0] / lv) * s, P[1] + (v[1] / lv) * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    return `<polyline points="${[a, c, b].map(p => p.map(t => t.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
  },
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  mid: (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2],
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  cen: (A, B, C) => [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3],
  // 多边形面积（鞋带公式，只在 verify 里当计算工具用）
  area: pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2,
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  // ∠QPR（度）
  ang: (P, Q, R) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180) / Math.PI;
  },
  // B 在原点、C=(a,0)，AB=c、AC=b，求 A（在上方）
  apex: (a, b, c) => { const x = (c * c - b * b + a * a) / (2 * a); return [x, Math.sqrt(c * c - x * x)]; },
  // B 在原点、C=(a,0)，已知 ∠B、∠C（度），求 A
  apexAng: (a, angB, angC) => {
    const tb = Math.tan((angB * Math.PI) / 180), tc = Math.tan((angC * Math.PI) / 180), x = (a * tc) / (tb + tc);
    return [x, x * tb];
  },
  // 点 P 到直线 QR 的距离
  toLine: (P, Q, R) => Math.abs((R[0] - Q[0]) * (P[1] - Q[1]) - (R[1] - Q[1]) * (P[0] - Q[0])) / Math.hypot(R[0] - Q[0], R[1] - Q[1]),
};

const R234 = v => Math.round(v * 1e9) / 1e9;
// 把数值还原成分母不超过 1000 的分数（verify 里比较有理数答案用）
const Q234 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return F(n).div(F(d)); } return v; };
// 中点四边形 EFGH（E、F、G、H 依次是 AB、BC、CD、DA 的中点）
const VAR234 = (A, B, C, D) => { const S = SVG234; return [S.mid(A, B), S.mid(B, C), S.mid(C, D), S.mid(D, A)]; };
// 四边形是否是平行四边形 / 矩形（有一个直角的平行四边形）/ 菱形（邻边相等的平行四边形）/ 正方形
const KIND234 = ([P, Q, R, T]) => {
  const S = SVG234, eq = (x, y) => Math.abs(x - y) < 1e-9;
  const pg = eq(P[0] + R[0], Q[0] + T[0]) && eq(P[1] + R[1], Q[1] + T[1]);
  const rect = pg && eq(S.ang(Q, P, R), 90);
  const rhom = pg && eq(S.dist(P, Q), S.dist(Q, R));
  return { pg, rect, rhom, square: rect && rhom };
};

const FIG234 = (() => {
  const S = SVG234, out = {};
  const lab = (A, B, C) => S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6);
  // b02：D、E 是 AB、AC 中点，四边形 DBCE 涂色
  {
    const m = S.map(28, 25, 185), A = m([3, 5.5]), B = m([0, 0]), C = m([9, 0]), D = S.mid(A, B), E = S.mid(A, C);
    out.b02 = S.wrap(300, 210, S.shade([D, B, C, E]) + S.poly([A, B, C]) + S.seg(D, E) + lab(A, B, C) + S.text('D', D, -11, -2) + S.text('E', E, 11, -2));
  }
  // b03：∠C=90°，AB=10，AC=6，D、E 是 AC、AB 中点
  {
    const m = S.map(26, 40, 190), C = m([0, 0]), A = m([0, 6]), B = m([8, 0]), D = S.mid(A, C), E = S.mid(A, B);
    out.b03 = S.wrap(280, 215, S.poly([A, B, C]) + S.seg(D, E) + S.ra(C, A, B) + S.text('A', A, 0, -14) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6)
      + S.text('D', D, -11, 0) + S.text('E', E, 10, -8));
  }
  // b04：∠A=48°，∠B=70°，D、E 是 AB、AC 中点
  {
    const m = S.map(20, 70, 205), B = m([0, 0]), C = m([8, 0]), A = m(S.apexAng(8, 70, 62)), D = S.mid(A, B), E = S.mid(A, C);
    out.b04 = S.wrap(300, 230, S.poly([A, B, C]) + S.seg(D, E) + lab(A, B, C) + S.text('D', D, -11, -2) + S.text('E', E, 11, -2));
  }
  // b05：G 是重心，连接 AG 并延长交 BC 于 D
  {
    const m = S.map(28, 25, 190), A = m([3.2, 6]), B = m([0, 0]), C = m([9, 0]), D = S.mid(B, C), G = S.cen(A, B, C);
    out.b05 = S.wrap(300, 215, S.poly([A, B, C]) + S.seg(A, D) + S.dot(G) + lab(A, B, C) + S.text('D', D, 0, 14) + S.text('G', G, 12, -4));
  }
  // b06：等边三角形，G 是重心
  {
    const m = S.map(36, 42, 210), B = m([0, 0]), C = m([6, 0]), A = m([3, 3 * Math.sqrt(3)]), D = S.mid(B, C), G = S.cen(A, B, C);
    out.b06 = S.wrap(300, 235, S.poly([A, B, C]) + S.seg(A, D, true) + S.seg(B, S.mid(A, C), true) + S.dot(G) + lab(A, B, C) + S.text('G', G, 12, -2));
  }
  // b07：三条中线 AD、BE、CF 交于 G，△BGD 涂色
  {
    const m = S.map(28, 25, 190), A = m([2.6, 6]), B = m([0, 0]), C = m([9, 0]), D = S.mid(B, C), E = S.mid(A, C), Fp = S.mid(A, B), G = S.cen(A, B, C);
    out.b07 = S.wrap(300, 215, S.shade([B, G, D]) + S.poly([A, B, C]) + S.seg(A, D) + S.seg(B, E) + S.seg(C, Fp) + lab(A, B, C)
      + S.text('D', D, 0, 14) + S.text('E', E, 11, -2) + S.text('F', Fp, -11, -2) + S.text('G', G, 4, -16));
  }
  // b08：矩形 ABCD，AB=6，BC=8，对角线交于 O，E、F 是 AO、AD 中点
  {
    const m = S.map(28, 35, 195), A = m([0, 6]), B = m([0, 0]), C = m([8, 0]), D = m([8, 6]), O = m([4, 3]), E = S.mid(A, O), Fp = S.mid(A, D);
    out.b08 = S.wrap(300, 220, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D) + S.seg(E, Fp)
      + S.text('A', A, -10, -4) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 10, -4) + S.text('O', O, 0, 13) + S.text('E', E, -10, 4) + S.text('F', Fp, 0, -14));
  }
  // b09：G 是重心，A 到 BC 的距离为 9
  {
    const m = S.map(20, 30, 210), A = m([4, 9]), B = m([0, 0]), C = m([12, 0]), H = m([4, 0]), G = S.cen(A, B, C), K = [G[0], H[1]];
    out.b09 = S.wrap(300, 235, S.poly([A, B, C]) + S.seg(A, H, true) + S.seg(G, K, true) + S.ra(H, A, C, 8) + S.dot(G) + lab(A, B, C)
      + S.text('G', G, 11, -6) + S.text('H', H, 0, 14));
  }
  // e02：AB=7，AC=6，BC=10，CE 平分外角 ∠ACM，AE⊥CE 于 E，F 是 AB 中点
  {
    const m = S.map(17, 15, 125), B0 = [0, 0], C0 = [10, 0], A0 = S.apex(10, 6, 7), H0 = [16, 0], E0 = S.mid(A0, H0), F0 = S.mid(A0, B0);
    const A = m(A0), B = m(B0), C = m(C0), E = m(E0), Fp = m(F0), M = m([16.6, 0]), Ext = S.at(C, E, 1.35);
    out.e02 = S.wrap(310, 150, S.poly([A, B, C]) + S.seg(C, M) + S.seg(C, Ext) + S.seg(A, E) + S.seg(E, Fp, true) + S.ra(E, A, C, 7)
      + lab(A, B, C) + S.text('M', M, 0, 14) + S.text('E', E, 4, -16) + S.text('F', Fp, -11, -2));
  }
  // e03：AB=AC=13，BC=10，G 是重心
  {
    const m = S.map(14, 150, 200), A = m([0, 12]), B = m([-5, 0]), C = m([5, 0]), Fp = m([0, 0]), G = m([0, 4]);
    out.e03 = S.wrap(300, 225, S.poly([A, B, C]) + S.seg(A, Fp, true) + S.seg(B, G) + S.dot(G) + lab(A, B, C) + S.text('G', G, 11, -6));
  }
  // e04：AD⊥BC 于 D，AD=8，AB=10，AC=17；E、F、G 是 AB、AC、BC 中点
  {
    const m = S.map(13, 12, 140), B = m([0, 0]), D = m([6, 0]), A = m([6, 8]), C = m([21, 0]), E = m([3, 4]), Fp = m([13.5, 4]), G = m([10.5, 0]);
    out.e04 = S.wrap(300, 165, S.poly([A, B, C]) + S.seg(A, D) + S.ra(D, A, C, 7) + S.seg(E, D) + S.seg(Fp, G) + S.seg(E, Fp)
      + lab(A, B, C) + S.text('D', D, 0, 14) + S.text('E', E, -11, -4) + S.text('F', Fp, 11, -4) + S.text('G', G, 0, 14));
  }
  // e06：梯形 ABCD，AD∥BC，P、Q 是两腰中点，M、N 是对角线 BD、AC 中点
  {
    const m = S.map(27, 15, 180), A = m([3, 5.5]), D = m([7, 5.5]), B = m([0, 0]), C = m([10, 0]);
    const P = S.mid(A, B), Q = S.mid(D, C), M = S.mid(B, D), N = S.mid(A, C);
    out.e06 = S.wrap(300, 205, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D) + S.seg(P, Q, true) + S.dot(M) + S.dot(N)
      + S.text('A', A, -6, -14) + S.text('D', D, 6, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('P', P, -11, -2) + S.text('Q', Q, 11, -2)
      + S.text('M', M, -2, 10) + S.text('N', N, 2, 10));
  }
  // c01：一般的凸四边形和它的中点四边形（不是取最大值的位置）
  {
    const A = [70, 40], B = [30, 170], C = [250, 200], D = [230, 60], [E, Fp, G, H] = VAR234(A, B, C, D);
    out.c01 = S.wrap(290, 225, S.poly([A, B, C, D]) + S.poly([E, Fp, G, H]) + S.seg(A, C, true) + S.seg(B, D, true)
      + S.text('A', A, -6, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 10, -10)
      + S.text('E', E, -11, 0) + S.text('F', Fp, 0, 14) + S.text('G', G, 13, 0) + S.text('H', H, 0, -16));
  }
  // c02：BC=4，AC=7，中线 AD⊥BE 于 G（按真实数据画）
  {
    const m = S.map(32, 100, 175), B0 = [0, 0], C0 = [4, 0], A0 = S.apex(4, 7, Math.sqrt(13));
    const A = m(A0), B = m(B0), C = m(C0), D = m(S.mid(B0, C0)), E = m(S.mid(A0, C0)), G = m(S.cen(A0, B0, C0));
    out.c02 = S.wrap(290, 195, S.poly([A, B, C]) + S.seg(A, D) + S.seg(B, E) + S.ra(G, A, E, 7) + lab(A, B, C)
      + S.text('D', D, 0, 14) + S.text('E', E, 11, -4) + S.text('G', G, -12, 2));
  }
  // c03：四边形 ABCD，E、F 是 AD、BC 中点（按 AB=10、CD=24、∠ABC=55°、∠BCD=35° 画）
  {
    const k = 7, m = S.map(k, 20, 135), r = d => (d * Math.PI) / 180;
    const B0 = [0, 0], C0 = [40, 0], A0 = [10 * Math.cos(r(55)), 10 * Math.sin(r(55))], D0 = [40 - 24 * Math.cos(r(35)), 24 * Math.sin(r(35))];
    const A = m(A0), B = m(B0), C = m(C0), D = m(D0), E = S.mid(A, D), Fp = S.mid(B, C);
    out.c03 = S.wrap(318, 160, S.poly([A, B, C, D]) + S.seg(E, Fp, true)
      + S.text('A', A, -8, -12) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 8, -12) + S.text('E', E, 0, -15) + S.text('F', Fp, 0, 14));
  }
  // c04：平行四边形 ABCD，E、F 是 CD、AD 中点，BE、BF 分别交 AC 于 G、H
  {
    const m = S.map(22, 25, 170), A0 = [0, 0], B0 = [9, 0], C0 = [12, 6.5], D0 = [3, 6.5], E0 = S.mid(C0, D0), F0 = S.mid(A0, D0);
    const G0 = S.meet(B0, E0, A0, C0), H0 = S.meet(B0, F0, A0, C0);
    const [A, B, C, D, E, Fp, G, H] = [A0, B0, C0, D0, E0, F0, G0, H0].map(m);
    out.c04 = S.wrap(310, 195, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, E) + S.seg(B, Fp) + S.seg(E, Fp, true)
      + S.text('A', A, -10, 6) + S.text('B', B, 10, 6) + S.text('C', C, 10, -6) + S.text('D', D, -8, -12) + S.text('E', E, 0, -15) + S.text('F', Fp, -11, 0)
      + S.text('G', G, 2, -18) + S.text('H', H, -2, -18));
  }
  // c05：BC=10，AB=6，∠ABC=60°，D、E 是 AB、AC 中点，直线 DE
  {
    const m = S.map(18, 128, 140), B = m([0, 0]), C = m([10, 0]), A = m([3, 3 * Math.sqrt(3)]), D = S.mid(A, B), E = S.mid(A, C);
    const L = m([-6.5, 1.5 * Math.sqrt(3)]), Rt = m([9.5, 1.5 * Math.sqrt(3)]);
    out.c05 = S.wrap(320, 165, S.poly([A, B, C]) + S.seg(L, Rt) + lab(A, B, C) + S.text('D', D, -6, -16) + S.text('E', E, 8, -16));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s2/23.4',
  title: '三角形的中位线与重心',
  review: { status: 'pending' },
  audit: { blind: '2026-10-07', rounds: 1, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核一轮，20 题答案全部一致，结论为修好 b04 配图后整节通过。处理：b04 配图顶点 A 超出画布，缩小并下移三角形；复核提示 c02（中线互相垂直，BC=6、AC=8）和 c03(1)（AB=6、CD=8、两角和 90°）可能与网上流传题同数据，c02 改为 BC=4、AC=7（AB=√13，面积 3√3），c03(1) 改为 AB=10、CD=24（EF=13），结构不变。卡片“中位线定理”配 midlineRotate、“重心和重心定理”配 centroid，e01 中点四边形的解析配 varignon 拖动演示' },

  intro: [
    {
      title: '三角形的中位线',
      body: '连接三角形两边中点的线段，叫作三角形的中位线。每个三角形有三条中位线。注意和“中线”区分：中线连接的是一个**顶点**和对边中点，中位线连接的是**两个中点**。',
      example: '$\\triangle PQR$ 中，$M$、$N$ 分别是 $PQ$、$PR$ 的中点，$MN$ 是中位线；$K$ 是 $QR$ 的中点，$PK$ 是中线，不是中位线。',
      pitfall: '中位线对着的那条边叫“第三边”，它是中位线两端都不在的那条边。',
    },
    {
      title: '中位线定理',
      body: '三角形的中位线平行于第三边，并且等于第三边的一半。证明的想法：把 $\\triangle ADE$ 绕点 $E$ 旋转 $180^\\circ$（也就是延长 $DE$ 到 $F$，使 $EF=DE$），拼出平行四边形 $DBCF$，于是 $DF$ 与 $BC$ 平行且相等，$DE$ 是 $DF$ 的一半。点“播放”看拼的过程。',
      example: '$\\triangle PQR$ 中，$M$、$N$ 是 $PQ$、$PR$ 的中点，$QR=9$，那么 $MN\\parallel QR$，$MN=4.5$。',
      demo: { type: 'midlineRotate' },
    },
    {
      title: '用中位线研究四边形',
      body: '四边形里出现中点时，常常连一条对角线，把四边形分成两个三角形，中位线就出现了。中位线既给出“平行”，又给出“一半”，可以用来判定平行四边形。',
      example: '$\\triangle PQR$ 中，$K$、$L$、$M$ 分别是 $PQ$、$QR$、$RP$ 的中点：$KL\\parallel PR$，并且 $KL=\\frac12PR=PM$，一组对边平行且相等，所以四边形 $PKLM$ 是平行四边形。',
    },
    {
      title: '重心和重心定理',
      body: '三角形的三条中线交于一点，这个点叫作三角形的重心。**重心定理**：重心到一个顶点的距离，等于它到这个顶点对边中点的距离的两倍。也就是说，重心把每条中线分成 $2:1$ 两段，靠近顶点的一段长。',
      example: '$\\triangle PQR$ 的中线 $PK$ 长 $12$，重心为 $O$，那么 $PO=8$，$OK=4$。',
      pitfall: '重心是三条**中线**的交点，不是角平分线的交点（内心），也不是垂直平分线的交点（外心）。',
      demo: { type: 'centroid' },
    },
    {
      title: '重心与面积',
      body: '重心 $O$ 和三个顶点相连，得到的三个三角形 $\\triangle OAB$、$\\triangle OBC$、$\\triangle OCA$ 面积相等，各占整个三角形的三分之一。理由：中线把三角形分成面积相等的两半，再加上重心定理 $AO=2OF$，用“等高的三角形面积比等于底的比”就能推出来。',
      example: '$\\triangle PQR$ 的面积是 $45$，$O$ 是重心，那么 $\\triangle OQR$ 的面积是 $15$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '23.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，正确的是（　　）',
      options: [
        '三角形的中位线是连接三角形一个顶点和它对边中点的线段',
        '三角形的重心到一个顶点的距离，等于它到这个顶点对边中点的距离的两倍',
        '三角形的重心到三个顶点的距离相等',
        '一个三角形只有一条中位线',
      ],
      answer: 1,
      explain: [
        'A 错：连接顶点和对边中点的是**中线**；中位线连接的是两边的中点。',
        'C 错：到三个顶点距离相等的是三边垂直平分线的交点（外心），重心一般不满足。D 错：每两边的中点连一条，共三条中位线。',
        'B 就是重心定理，选 B。坑：把“中线”和“中位线”混为一谈而选 A。',
      ],
      verify: () => {
        // 在一个不等边三角形里逐条检验
        const S = SVG234, A = [1, 5], B = [0, 0], C = [7, 0], D = S.mid(B, C), G = S.cen(A, B, C);
        const parallel = (P, Q, R, T) => Math.abs((Q[0] - P[0]) * (T[1] - R[1]) - (Q[1] - P[1]) * (T[0] - R[0])) < 1e-9;
        const checks = [
          parallel(A, D, B, C),  // 若 AD 是中位线，它应平行于第三边；实际上 AD 与 BC 相交
          Math.abs(S.dist(A, G) - 2 * S.dist(G, D)) < 1e-9,
          Math.abs(S.dist(G, A) - S.dist(G, B)) < 1e-9 && Math.abs(S.dist(G, B) - S.dist(G, C)) < 1e-9,
          [[A, B], [B, C], [C, A]].filter(([P, Q]) => parallel(S.mid(P, Q), S.mid(Q, [A, B, C].find(X => X !== P && X !== Q)), P, [A, B, C].find(X => X !== P && X !== Q))).length === 1,
        ];
        return checks.indexOf(true);
      },
    },
    {
      id: '23.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$D$、$E$ 分别是 $AB$、$AC$ 的中点，$\\triangle ABC$ 的面积是 $28$。求四边形 $DBCE$（涂色部分）的面积。',
      figure: FIG234.b02,
      blanks: [{ kind: 'num', label: '面积', answer: '21' }],
      explain: [
        '连接 $DC$。$D$ 是 $AB$ 中点，$\\triangle ADC$ 与 $\\triangle ABC$ 同高、底是一半，面积 $=14$。',
        '$E$ 是 $AC$ 中点，$\\triangle ADE$ 与 $\\triangle ADC$ 同高、底是一半，面积 $=7$。',
        '四边形 $DBCE$ 的面积 $=28-7=21$。坑：中位线 $DE$ 等于 $BC$ 的一半，但它截下的 $\\triangle ADE$ 面积只有整个三角形的四分之一，不是一半，填 $14$ 就错了。',
      ],
      verify: () => {
        const S = SVG234, A = [3, 5.5], B = [0, 0], C = [9, 0], k = 28 / S.area([A, B, C]);
        return Q234(R234(S.area([S.mid(A, B), B, C, S.mid(A, C)]) * k));
      },
    },
    {
      id: '23.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$AB=10$，$AC=6$，$D$、$E$ 分别是 $AC$、$AB$ 的中点。求 $DE$ 的长。',
      figure: FIG234.b03,
      blanks: [{ kind: 'num', label: '$DE=$', answer: '4' }],
      explain: [
        '$DE$ 连接 $AC$、$AB$ 的中点，它的第三边是 $BC$，所以 $DE=\\frac12BC$。',
        '由勾股定理，$BC=\\sqrt{10^2-6^2}=8$，所以 $DE=4$。',
        '坑：看到斜边就取 $AB$ 的一半得 $5$；中位线对应的是两端都不在的那条边 $BC$。',
      ],
      verify: () => { const S = SVG234, C = [0, 0], A = [0, 6], B = [Math.sqrt(100 - 36), 0]; return Q234(R234(S.dist(S.mid(A, C), S.mid(A, B)))); },
    },
    {
      id: '23.4-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle A=48^\\circ$，$\\angle B=70^\\circ$，$D$、$E$ 分别是 $AB$、$AC$ 的中点。求 $\\angle DEC$ 的度数。',
      figure: FIG234.b04,
      blanks: [{ kind: 'angle', label: '$\\angle DEC=$', answer: '118°' }],
      explain: [
        '$\\angle C=180^\\circ-48^\\circ-70^\\circ=62^\\circ$。',
        '由中位线定理 $DE\\parallel BC$，所以 $\\angle AED=\\angle C=62^\\circ$（同位角相等）。',
        '$\\angle DEC=180^\\circ-62^\\circ=118^\\circ$。坑：求的是 $\\angle DEC$ 不是 $\\angle AED$；也别把 $\\angle AED$ 当成和 $\\angle B$ 相等，$\\angle ADE$ 才等于 $\\angle B$。',
      ],
      verify: () => {
        const S = SVG234, B = [0, 0], C = [8, 0], A = S.apexAng(8, 70, 62), D = S.mid(A, B), E = S.mid(A, C);
        return Math.round(S.ang(E, D, C) * 1e6) / 1e6 + '°';
      },
    },
    {
      id: '23.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，$G$ 是 $\\triangle ABC$ 的重心，连接 $AG$ 并延长交 $BC$ 于点 $D$，$GD=2.5$。求中线 $AD$ 的长。',
      figure: FIG234.b05,
      blanks: [{ kind: 'num', label: '$AD=$', answer: '7.5' }],
      explain: [
        '$G$ 是重心，$AD$ 是 $BC$ 边上的中线。由重心定理，$AG=2GD=5$。',
        '$AD=AG+GD=5+2.5=7.5$。',
        '坑：重心定理说的是 $AG=2GD$，不是 $AD=2GD$，填 $5$ 是只算了 $AG$。',
      ],
      verify: () => {
        const S = SVG234, A = [3.2, 6], B = [0, 0], C = [9, 0], D = S.mid(B, C), G = S.cen(A, B, C);
        return Q234(R234((S.dist(A, D) / S.dist(G, D)) * 2.5));
      },
    },
    {
      id: '23.4-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，等边三角形 $ABC$ 的边长为 $6$，$G$ 是它的重心。求 $AG$ 的长。',
      figure: FIG234.b06,
      blanks: [{ kind: 'real', label: '$AG=$', answer: '2√3', simplest: true }],
      explain: [
        '取 $BC$ 中点 $D$，中线 $AD$ 也是高（三线合一），$BD=3$，$AD=\\sqrt{6^2-3^2}=3\\sqrt3$。',
        '重心把中线分成 $2:1$，$AG=\\frac23AD=2\\sqrt3$。',
        '坑：重心定理里的“两倍”针对的是中线，不是边，不能用边长 $6$ 的三分之二算成 $4$。',
      ],
      verify: () => { const S = SVG234, A = [3, 3 * Math.sqrt(3)], B = [0, 0], C = [6, 0]; return S.dist(A, S.cen(A, B, C)); },
    },
    {
      id: '23.4-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 的三条中线 $AD$、$BE$、$CF$ 交于点 $G$，$\\triangle BGD$（涂色部分）的面积是 $4$。求 $\\triangle ABC$ 的面积。',
      figure: FIG234.b07,
      blanks: [{ kind: 'num', label: '面积', answer: '24' }],
      explain: [
        '$D$ 是 $BC$ 中点，$\\triangle BGD$ 与 $\\triangle CGD$ 同高等底，所以 $S_{\\triangle GBC}=2\\times4=8$。',
        '$G$ 是重心，$S_{\\triangle GBC}$ 是 $\\triangle ABC$ 面积的三分之一，所以 $S_{\\triangle ABC}=3\\times8=24$。',
        '坑：只算到 $\\triangle GBC$ 就以为它占一半，填 $16$；或者把 $\\triangle BGD$ 当成三分之一填 $12$。',
      ],
      verify: () => {
        const S = SVG234, A = [2.6, 6], B = [0, 0], C = [9, 0], G = S.cen(A, B, C), k = 4 / S.area([B, G, S.mid(B, C)]);
        return Q234(R234(S.area([A, B, C]) * k));
      },
    },
    {
      id: '23.4-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 的对角线交于点 $O$，$AB=6$，$BC=8$，$E$、$F$ 分别是 $AO$、$AD$ 的中点。求 $EF$ 的长。',
      figure: FIG234.b08,
      blanks: [{ kind: 'num', label: '$EF=$', answer: '5/2' }],
      explain: [
        '在 $\\triangle AOD$ 中，$EF$ 连接 $AO$、$AD$ 的中点，第三边是 $OD$，所以 $EF=\\frac12OD$。',
        '矩形的对角线相等且互相平分，$BD=\\sqrt{6^2+8^2}=10$，$OD=5$，所以 $EF=\\frac52$。',
        '坑：看图以为 $EF$ 和 $CD$ 有关而取 $3$，或者取 $BD$ 的一半 $5$；要先找准 $EF$ 在哪个三角形里、第三边是哪条。',
      ],
      verify: () => { const S = SVG234, A = [0, 6], C = [8, 0], D = [8, 6], O = S.mid(A, C); return Q234(R234(S.dist(S.mid(A, O), S.mid(A, D)))); },
    },
    {
      id: '23.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，$G$ 是 $\\triangle ABC$ 的重心，点 $A$ 到 $BC$ 的距离 $AH=9$。求点 $G$ 到 $BC$ 的距离。',
      figure: FIG234.b09,
      blanks: [{ kind: 'num', label: '距离', answer: '3' }],
      explain: [
        '$G$ 是重心，$\\triangle GBC$ 的面积是 $\\triangle ABC$ 的三分之一。',
        '两个三角形底边都是 $BC$，面积是三分之一，高也是三分之一：$G$ 到 $BC$ 的距离 $=\\frac13\\times9=3$。',
        '坑：由 $AG=2GD$ 想当然地填 $9\\div2$ 或 $6$；$G$ 在中线上离 $BC$ 较近的三分点处，到 $BC$ 的距离是 $AH$ 的三分之一。',
      ],
      verify: () => {
        const S = SVG234, A = [4, 9], B = [0, 0], C = [12, 0];
        return Q234(R234(S.toLine(S.cen(A, B, C), B, C)));
      },
    },

    // ---------- 扩展 ----------
    {
      id: '23.4-e01',
      level: 'extended',
      type: 'choice',
      stem: '顺次连接四边形各边的中点得到的四边形，叫作原四边形的中点四边形。下列说法中，正确的有（　　）<br>① 任意四边形的中点四边形都是平行四边形；<br>② 矩形的中点四边形是矩形；<br>③ 对角线互相垂直的四边形，它的中点四边形是矩形；<br>④ 如果四边形 $ABCD$ 的中点四边形是正方形，那么 $ABCD$ 是正方形；<br>⑤ 菱形的中点四边形的面积是菱形面积的一半。',
      options: ['$1$ 个', '$2$ 个', '$3$ 个', '$4$ 个'],
      answer: 2,
      explain: [
        '设 $E$、$F$、$G$、$H$ 是 $AB$、$BC$、$CD$、$DA$ 的中点。由中位线定理，$EF$、$HG$ 都平行于 $AC$ 且等于 $\\frac12AC$；$EH$、$FG$ 都平行于 $BD$ 且等于 $\\frac12BD$。所以 ① 对。',
        '中点四边形的邻边分别平行于两条对角线、等于对角线的一半：对角线**相等**时邻边相等，是菱形；对角线**垂直**时有一个直角，是矩形。矩形的对角线相等，中点四边形是菱形，② 错；③ 对。',
        '④ 错：只要 $AC=BD$ 且 $AC\\perp BD$，中点四边形就是正方形，比如对角线相等且垂直、但不互相平分的“筝形”就不是正方形。',
        '⑤ 对：$\\triangle AEH$ 的面积是 $\\triangle ABD$ 的四分之一，$\\triangle CFG$ 是 $\\triangle CBD$ 的四分之一，这两块共占四边形面积的四分之一；同理另外两个角共占四分之一，剩下的中点四边形占一半（任何凸四边形都这样）。',
        '正确的是 ①③⑤，共 $3$ 个，选 C。拖动下面的顶点，看中点四边形怎样随对角线变化。',
      ],
      demo: { type: 'varignon' },
      verify: () => {
        const S = SVG234;
        const k1 = KIND234(VAR234([1, 5], [0, 0], [7, -1], [6, 4]));
        const k2 = KIND234(VAR234([0, 4], [0, 0], [7, 0], [7, 4]));
        const k3 = KIND234(VAR234([0, 3], [-2, 0], [0, -1], [5, 0]));  // AC⊥BD（AC 竖直，BD 水平）
        const kite = [[0, 3], [-2, 0], [0, -3], [4, 0]];                // AC=BD=6 且垂直，但不是正方形
        const k4 = KIND234(VAR234(...kite)).square && !KIND234(kite).square;
        const rh = [[0, 3], [-2, 0], [0, -3], [2, 0]];
        const ok5 = Math.abs(S.area(VAR234(...rh)) * 2 - S.area(rh)) < 1e-9;
        const right = [k1.pg, k2.rect, k3.rect, !k4, ok5].filter(Boolean).length;
        return right - 1;
      },
    },
    {
      id: '23.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=7$，$AC=6$，$BC=10$，$M$ 是 $BC$ 延长线上的一点，$CE$ 平分 $\\angle ACM$，$AE\\perp CE$，垂足为 $E$，$F$ 是 $AB$ 的中点。求 $EF$ 的长。',
      figure: FIG234.e02,
      blanks: [{ kind: 'num', label: '$EF=$', answer: '8' }],
      explain: [
        '图中只有一个中点 $F$，想用中位线，就要再造一个中点。$CE$ 是角平分线又垂直于 $AE$，延长 $AE$ 交 $BC$ 的延长线于点 $H$。',
        '$\\angle ACE=\\angle HCE$，$CE=CE$，$\\angle AEC=\\angle HEC=90^\\circ$，所以 $\\triangle ACE\\cong\\triangle HCE$（ASA），得 $CH=CA=6$，$AE=EH$。',
        '于是 $E$ 是 $AH$ 的中点，$F$ 是 $AB$ 的中点，$EF$ 是 $\\triangle ABH$ 的中位线：$EF=\\frac12BH=\\frac12(BC+CH)=\\frac12(10+6)=8$。',
        '也就是说 $EF=\\frac12(BC+AC)$，和 $AB$ 的长无关。',
      ],
      verify: () => {
        const S = SVG234, B = [0, 0], C = [10, 0], A = S.apex(10, 6, 7);
        // 外角 ∠ACM 的平分线方向：CA 方向与 CM 方向（x 正方向）的单位向量之和
        const ca = [(A[0] - C[0]) / 6, (A[1] - C[1]) / 6], u = [ca[0] + 1, ca[1]];
        const t = ((A[0] - C[0]) * u[0] + (A[1] - C[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]), E = [C[0] + t * u[0], C[1] + t * u[1]];
        return Q234(R234(S.dist(E, S.mid(A, B))));
      },
    },
    {
      id: '23.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC=13$，$BC=10$，$G$ 是 $\\triangle ABC$ 的重心。求 $BG$ 的长，以及点 $G$ 到 $AB$ 的距离。',
      figure: FIG234.e03,
      blanks: [
        { kind: 'real', label: '$BG=$', answer: '√41', simplest: true },
        { kind: 'num', label: '$G$ 到 $AB$ 的距离', answer: '40/13' },
      ],
      explain: [
        '取 $BC$ 中点 $F$，中线 $AF$ 也是高，$BF=5$，$AF=\\sqrt{13^2-5^2}=12$。重心 $G$ 在 $AF$ 上，$GF=\\frac13AF=4$。',
        '在 $\\text{Rt}\\triangle BFG$ 中，$BG=\\sqrt{5^2+4^2}=\\sqrt{41}$。',
        '$S_{\\triangle ABC}=\\frac12\\times10\\times12=60$，$G$ 是重心，$S_{\\triangle GAB}=\\frac13\\times60=20$。',
        '设 $G$ 到 $AB$ 的距离为 $h$，$\\frac12\\times13\\times h=20$，$h=\\frac{40}{13}$。',
        '转弯：$BG$ 不在已知的那条中线 $AF$ 上，要先用重心定理求 $GF$，再放进直角三角形；距离用面积法。',
      ],
      verify: () => {
        const S = SVG234, A = [0, 12], B = [-5, 0], C = [5, 0], G = S.cen(A, B, C);
        return [S.dist(B, G), Q234(R234(S.toLine(G, A, B)))];
      },
    },
    {
      id: '23.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AD\\perp BC$，垂足为 $D$，$AD=8$，$AB=10$，$AC=17$，$E$、$F$、$G$ 分别是 $AB$、$AC$、$BC$ 的中点。求四边形 $EDGF$ 的周长。',
      figure: FIG234.e04,
      blanks: [{ kind: 'num', label: '周长', answer: '25' }],
      explain: [
        '由勾股定理，$BD=\\sqrt{10^2-8^2}=6$，$DC=\\sqrt{17^2-8^2}=15$，$BC=21$。',
        '$DE$ 是 $\\text{Rt}\\triangle ABD$ 斜边上的中线，$DE=\\frac12AB=5$；$GF$ 是 $\\triangle ABC$ 的中位线，$GF=\\frac12AB=5$。',
        '$EF$ 是中位线，$EF=\\frac12BC=\\frac{21}2$；$G$ 是 $BC$ 中点，$BG=\\frac{21}2$，$DG=BG-BD=\\frac{21}2-6=\\frac92$。',
        '周长 $=5+\\frac92+5+\\frac{21}2=25$。',
        '转弯：$DE$ 不是中位线，要用直角三角形斜边上的中线；它和中位线 $GF$ 都等于 $AB$ 的一半。',
      ],
      verify: () => {
        const S = SVG234, B = [0, 0], D = [Math.sqrt(36), 0], A = [6, 8], C = [6 + Math.sqrt(289 - 64), 0];
        const E = S.mid(A, B), Fp = S.mid(A, C), G = S.mid(B, C);
        return Q234(R234(S.dist(E, D) + S.dist(D, G) + S.dist(G, Fp) + S.dist(Fp, E)));
      },
    },
    {
      id: '23.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '一个直角三角形的两条边长分别是 $6$ 和 $8$，$G$ 是它的重心。求点 $G$ 到直角顶点的距离。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '距离', answer: ['10/3', '8/3'] }],
      explain: [
        '设直角顶点为 $C$，斜边中点为 $D$。$CD$ 是斜边上的中线，重心 $G$ 在 $CD$ 上，$CG=\\frac23CD$；而斜边上的中线等于斜边的一半，所以 $CG=\\frac23\\times\\frac12\\times\\text{斜边}=\\frac13\\times\\text{斜边}$。',
        '情况一：$6$ 和 $8$ 都是直角边，斜边 $=\\sqrt{6^2+8^2}=10$，$CG=\\frac{10}3$。',
        '情况二：$8$ 是斜边，$6$ 是直角边（$6<8$，成立），$CG=\\frac83$。',
        '（$6$ 不能是斜边，因为斜边最长。）所以距离是 $\\frac{10}3$ 或 $\\frac83$。',
      ],
      verify: () => {
        const S = SVG234, out = [];
        for (const [a, b] of [[6, 8], [6, Math.sqrt(64 - 36)]]) { const C = [0, 0], A = [0, a], B = [b, 0]; out.push(Q234(R234(S.dist(C, S.cen(A, B, C))))); }
        return out;
      },
    },
    {
      id: '23.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，在梯形 $ABCD$ 中，$AD\\parallel BC$，$AD<BC$，$P$、$Q$ 分别是两腰 $AB$、$DC$ 的中点，$M$、$N$ 分别是对角线 $BD$、$AC$ 的中点。已知 $PQ=7$，$MN=3$，求 $AD$ 和 $BC$ 的长。',
      figure: FIG234.e06,
      blanks: [
        { kind: 'num', label: '$AD=$', answer: '4' },
        { kind: 'num', label: '$BC=$', answer: '10' },
      ],
      explain: [
        '在 $\\triangle ABD$ 中，$PM$ 是中位线，$PM\\parallel AD$，$PM=\\frac12AD$；在 $\\triangle ABC$ 中，$PN$ 是中位线，$PN\\parallel BC$，$PN=\\frac12BC$。',
        '$AD\\parallel BC$，所以 $PM$、$PN$ 都平行于 $BC$。过点 $P$ 只有一条直线平行于 $BC$，所以 $P$、$M$、$N$ 在同一条直线上，且 $MN=PN-PM=\\frac12(BC-AD)$。',
        '同理在 $\\triangle ACD$ 中，$NQ\\parallel AD$，$NQ=\\frac12AD$，并且 $Q$ 也在这条直线上：$PQ=PN+NQ=\\frac12(BC+AD)$。',
        '于是 $BC-AD=6$，$BC+AD=14$，得 $BC=10$，$AD=4$。',
      ],
      verify: () => {
        // 枚举整数的上下底，找出满足两个条件的梯形（顶点位置任取）
        const S = SVG234, sol = [];
        for (let ad = 1; ad < 20; ad++) for (let bc = ad + 1; bc <= 20; bc++) {
          const A = [2.3, 5], D = [2.3 + ad, 5], B = [0, 0], C = [bc, 0];
          const pq = S.dist(S.mid(A, B), S.mid(D, C)), mn = S.dist(S.mid(B, D), S.mid(A, C));
          if (Math.abs(pq - 7) < 1e-9 && Math.abs(mn - 3) < 1e-9) sol.push([ad, bc]);
        }
        if (sol.length !== 1) throw new Error('解不唯一');
        return sol[0];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '23.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，凸四边形 $ABCD$ 的两条对角线长度之和 $AC+BD=14$，$E$、$F$、$G$、$H$ 分别是 $AB$、$BC$、$CD$、$DA$ 的中点。四边形 $EFGH$ 的面积最大是多少？面积最大时，$EFGH$ 的边长是多少？',
      figure: FIG234.c01,
      blanks: [
        { kind: 'num', label: '最大面积', answer: '49/4' },
        { kind: 'num', label: '边长', answer: '7/2' },
      ],
      explain: [
        '思路：先把 $EFGH$ 的面积换成 $ABCD$ 的面积，再估计 $ABCD$ 的面积最大能有多大。',
        '第一步，$EFGH$ 是 $ABCD$ 面积的一半：$AE=\\frac12AB$，$AH=\\frac12AD$，所以 $S_{\\triangle AEH}=\\frac12S_{\\triangle ABH}=\\frac14S_{\\triangle ABD}$；同理 $S_{\\triangle CFG}=\\frac14S_{\\triangle CBD}$。两块合起来是 $\\frac14S_{ABCD}$；$\\triangle BEF$、$\\triangle DGH$ 合起来也是 $\\frac14S_{ABCD}$，所以 $S_{EFGH}=\\frac12S_{ABCD}$。',
        '第二步，设 $AC$、$BD$ 交于 $O$，$A$、$C$ 到 $BD$ 的距离分别为 $h_1$、$h_2$。由垂线段最短，$h_1\\le AO$，$h_2\\le OC$，所以 $S_{ABCD}=\\frac12BD\\cdot(h_1+h_2)\\le\\frac12BD\\cdot AC$，$AC\\perp BD$ 时取等号。',
        '第三步，设 $AC=a$，$BD=b$，$a+b=14$。因为 $(a+b)^2-4ab=(a-b)^2\\ge0$，所以 $ab\\le\\frac{14^2}4=49$，$a=b=7$ 时取等号。',
        '所以 $S_{EFGH}\\le\\frac12\\times\\frac12\\times49=\\frac{49}4$，当 $AC=BD=7$ 且 $AC\\perp BD$ 时取到。这时 $EFGH$ 的邻边分别等于 $\\frac12AC$、$\\frac12BD$ 并且互相垂直，是边长为 $\\frac72$ 的正方形，面积 $\\frac{49}4$ 正好对上。',
      ],
      verify: () => {
        const S = SVG234;
        // 随机取对角线长度和、夹角、交点位置，中点四边形面积都不超过取等时的值
        const quad = (a, t, s, deg) => {  // AC=a，BD=14-a，交点把 AC 分成 t:(1-t)、把 BD 分成 s:(1-s)，夹角 deg
          const b = 14 - a, r = (deg * Math.PI) / 180, u = [Math.cos(r), Math.sin(r)];
          return [[-t * a, 0], [-s * b * u[0], -s * b * u[1]], [(1 - t) * a, 0], [(1 - s) * b * u[0], (1 - s) * b * u[1]]];
        };
        const best = quad(7, 0.3, 0.6, 90), bestArea = S.area(VAR234(...best));
        for (let i = 1; i < 14; i++) for (const t of [0.2, 0.5, 0.8]) for (const deg of [30, 60, 89, 120]) {
          if (S.area(VAR234(...quad(i, t, 0.4, deg))) > bestArea + 1e-9) throw new Error('出现更大的面积');
        }
        const [E, Fp] = VAR234(...best);
        return [Q234(R234(bestArea)), Q234(R234(S.dist(E, Fp)))];
      },
    },
    {
      id: '23.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$BC=4$，$AC=7$，中线 $AD$ 与中线 $BE$ 互相垂直，垂足为 $G$。求 $AB$ 的长和 $\\triangle ABC$ 的面积。',
      figure: FIG234.c02,
      blanks: [
        { kind: 'real', label: '$AB=$', answer: '√13', simplest: true },
        { kind: 'real', label: '面积', answer: '3√3', simplest: true },
      ],
      explain: [
        '$G$ 是两条中线的交点，就是重心。设 $GD=x$，$GE=y$，由重心定理 $AG=2x$，$BG=2y$。',
        '图中有三个以 $G$ 为直角顶点的直角三角形，分别用勾股定理：$\\text{Rt}\\triangle BGD$ 中 $(2y)^2+x^2=BD^2=4$；$\\text{Rt}\\triangle AGE$ 中 $(2x)^2+y^2=AE^2=\\frac{49}4$。',
        '两式相加，$5(x^2+y^2)=\\frac{65}4$，$x^2+y^2=\\frac{13}4$。$\\text{Rt}\\triangle AGB$ 中 $AB^2=(2x)^2+(2y)^2=4(x^2+y^2)=13$，$AB=\\sqrt{13}$。',
        '再求面积：两式相减得 $3x^2-3y^2=\\frac{33}4$，$x^2-y^2=\\frac{11}4$，与 $x^2+y^2=\\frac{13}4$ 联立，$x^2=3$，$y^2=\\frac14$，所以 $x=\\sqrt3$，$y=\\frac12$，$xy=\\frac{\\sqrt3}2$。',
        '$S_{\\triangle GAB}=\\frac12\\cdot2x\\cdot2y=2xy=\\sqrt3$。重心与三个顶点连成的三个三角形面积相等，$S_{\\triangle ABC}=3\\sqrt3$。',
        '思路：不要分别求 $x$、$y$ 再算 $AB$——$AB^2$ 只需要 $x^2+y^2$，把两个式子“整体相加”最省事；面积则需要 $xy$，要回到联立求解。',
      ],
      verify: () => {
        // 固定 B、C，在以 C 为圆心、半径 7 的圆上找 A，使 AD⊥BE
        const S = SVG234, B = [0, 0], C = [4, 0], D = S.mid(B, C);
        const f = th => { const A = [4 + 7 * Math.cos(th), 7 * Math.sin(th)], E = S.mid(A, C); return (D[0] - A[0]) * (E[0] - B[0]) + (D[1] - A[1]) * (E[1] - B[1]); };
        let lo = 0.01, hi = Math.PI - 0.01, sols = [];
        const N = 2000;
        for (let i = 0; i < N; i++) {
          let a = lo + ((hi - lo) * i) / N, b = lo + ((hi - lo) * (i + 1)) / N;
          if (f(a) * f(b) <= 0) { for (let j = 0; j < 100; j++) { const m = (a + b) / 2; if (f(a) * f(m) <= 0) b = m; else a = m; } sols.push(a); }
        }
        if (sols.length !== 1) throw new Error('解不唯一');
        const A = [4 + 7 * Math.cos(sols[0]), 7 * Math.sin(sols[0])];
        return [S.dist(A, B), S.area([A, B, C])];
      },
    },
    {
      id: '23.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在凸四边形 $ABCD$ 中，$E$、$F$ 分别是 $AD$、$BC$ 的中点。<br>(1) 如果 $AB=10$，$CD=24$，$\\angle ABC+\\angle BCD=90^\\circ$，求 $EF$ 的长；<br>(2) 如果 $AB=CD=6$，$\\angle ABC+\\angle BCD=120^\\circ$，求 $EF$ 的长。',
      figure: FIG234.c03,
      blanks: [
        { kind: 'num', label: '(1) $EF=$', answer: '13' },
        { kind: 'real', label: '(2) $EF=$', answer: '3√3', simplest: true },
      ],
      explain: [
        '思路：$E$、$F$ 两个中点分别在两条对边上，凑不成一个三角形的中位线。取对角线 $BD$ 的中点 $P$，连接 $PE$、$PF$，就有两条中位线，分别“搬运”了 $AB$ 和 $CD$。',
        '在 $\\triangle ABD$ 中，$PE\\parallel AB$，$PE=\\frac12AB$；在 $\\triangle BCD$ 中，$PF\\parallel CD$，$PF=\\frac12CD$。',
        '求 $\\angle EPF$：$PE\\parallel AB$，$\\angle EPD=\\angle ABD$（同位角）；$PF\\parallel DC$，$\\angle BPF=\\angle BDC$，所以 $\\angle DPF=180^\\circ-\\angle BDC=\\angle DBC+\\angle BCD$。于是 $\\angle EPF=\\angle EPD+\\angle DPF=\\angle ABD+\\angle DBC+\\angle BCD=\\angle ABC+\\angle BCD$。',
        '(1) $\\angle EPF=90^\\circ$，$PE=5$，$PF=12$，$EF=\\sqrt{5^2+12^2}=13$。',
        '(2) $\\angle EPF=120^\\circ$，$PE=PF=3$。作 $PK\\perp EF$ 于 $K$，等腰三角形三线合一，$\\angle EPK=60^\\circ$，$\\angle PEK=30^\\circ$，$PK=\\frac32$，$EK=\\sqrt{3^2-\\left(\\frac32\\right)^2}=\\frac{3\\sqrt3}2$，所以 $EF=3\\sqrt3$。',
        '关键在于：$EF$ 的长只由 $AB$、$CD$ 的长以及 $\\angle ABC+\\angle BCD$ 决定，和 $BC$ 多长、四边形怎么摆无关。',
      ],
      verify: () => {
        const S = SVG234, r = d => (d * Math.PI) / 180;
        const ef = (ab, cd, angB, angC, bc) => {
          const B = [0, 0], C = [bc, 0], A = [ab * Math.cos(r(angB)), ab * Math.sin(r(angB))], D = [bc - cd * Math.cos(r(angC)), cd * Math.sin(r(angC))];
          return S.dist(S.mid(A, D), S.mid(B, C));
        };
        const v1 = ef(10, 24, 50, 40, 30), v2 = ef(6, 6, 70, 50, 12);
        // 换一种摆法、换 BC 的长，结果不变
        if (Math.abs(ef(10, 24, 30, 60, 36) - v1) > 1e-9 || Math.abs(ef(6, 6, 45, 75, 10) - v2) > 1e-9) throw new Error('EF 与摆法有关');
        return [Q234(R234(v1)), v2];
      },
    },
    {
      id: '23.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在平行四边形 $ABCD$ 中，$E$、$F$ 分别是 $CD$、$AD$ 的中点，$BE$、$BF$ 分别交对角线 $AC$ 于点 $G$、$H$，$AC=12$，平行四边形 $ABCD$ 的面积是 $60$。求：<br>(1) $AG$ 的长；(2) 四边形 $AGED$ 的面积；(3) 四边形 $FHGE$ 的面积。',
      figure: FIG234.c04,
      blanks: [
        { kind: 'num', label: '(1) $AG=$', answer: '8' },
        { kind: 'num', label: '(2) 面积', answer: '25' },
        { kind: 'num', label: '(3) 面积', answer: '25/2' },
      ],
      explain: [
        '关键：在图里找出三角形的重心。连接 $BD$ 交 $AC$ 于 $O$，平行四边形的对角线互相平分，$O$ 是 $BD$ 的中点。',
        '在 $\\triangle BCD$ 中，$CO$、$BE$ 都是中线，它们的交点 $G$ 是 $\\triangle BCD$ 的重心，$CG=\\frac23CO=\\frac13AC=4$，所以 $AG=8$。同理 $H$ 是 $\\triangle ABD$ 的重心，$AH=\\frac13AC=4$。',
        '(2) $S_{\\triangle BCD}=S_{\\triangle ACD}=30$。$G$ 是 $\\triangle BCD$ 的重心，$S_{\\triangle GCD}=\\frac13\\times30=10$；$E$ 是 $CD$ 中点，$S_{\\triangle GCE}=5$。所以 $S_{AGED}=S_{\\triangle ACD}-S_{\\triangle GCE}=30-5=25$。',
        '(3) $\\triangle ACD$ 被分成 $\\triangle AFH$、$\\triangle CGE$、$\\triangle DFE$ 和四边形 $FHGE$。同 (2)，$S_{\\triangle AFH}=5$，$S_{\\triangle CGE}=5$；$FE$ 是 $\\triangle ACD$ 的中位线，$S_{\\triangle DFE}=\\frac12S_{\\triangle DFC}=\\frac14S_{\\triangle DAC}=\\frac{15}2$。',
        '$S_{FHGE}=30-5-5-\\frac{15}2=\\frac{25}2$。顺带看出 $AH=HG=GC=4$：两条中线把对角线三等分。',
      ],
      verify: () => {
        const S = SVG234, A = [0, 0], B = [9, 0], C = [12, 6.5], D = [3, 6.5], E = S.mid(C, D), Fp = S.mid(A, D);
        const G = S.meet(B, E, A, C), H = S.meet(B, Fp, A, C), ka = 60 / S.area([A, B, C, D]), kl = 12 / S.dist(A, C);
        return [Q234(R234(S.dist(A, G) * kl)), Q234(R234(S.area([A, G, E, D]) * ka)), Q234(R234(S.area([Fp, H, G, E]) * ka))];
      },
    },
    {
      id: '23.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=6$，$BC=10$，$\\angle ABC=60^\\circ$，$D$、$E$ 分别是 $AB$、$AC$ 的中点。点 $F$ 在直线 $DE$ 上，并且以 $A$、$B$、$F$ 为顶点的三角形是直角三角形。求 $EF$ 的长。（全部填出，用逗号隔开）',
      figure: FIG234.c05,
      blanks: [{ kind: 'nums', label: '$EF=$', answer: ['1', '2', '8', '11'] }],
      explain: [
        '先定直线 $DE$：$DE$ 是中位线，$DE\\parallel BC$，$DE=5$，$\\angle ADE=\\angle ABC=60^\\circ$。按直角顶点分三类。',
        '直角在 $F$：$D$ 是斜边 $AB$ 的中点，$DF=\\frac12AB=3$。直线 $DE$ 上到 $D$ 距离为 $3$ 的点有两个：在线段 $DE$ 上时 $EF=5-3=2$；在 $ED$ 的延长线上时 $EF=5+3=8$。',
        '直角在 $A$：$AF\\perp AB$，$F$ 在射线 $DE$ 上（$\\angle ADF=60^\\circ$）。$\\text{Rt}\\triangle ADF$ 中 $\\angle AFD=30^\\circ$，$DF=2AD=6$，$F$ 在 $DE$ 的延长线上，$EF=6-5=1$。',
        '直角在 $B$：$BF\\perp AB$，$F$ 在 $ED$ 的延长线上，$\\angle BDF=\\angle ADE=60^\\circ$（对顶角）。$\\text{Rt}\\triangle BDF$ 中 $\\angle BFD=30^\\circ$，$DF=2BD=6$，$EF=5+6=11$。',
        '所以 $EF=1$、$2$、$8$ 或 $11$。思路：中位线先把直线 $DE$ 的位置和 $60^\\circ$ 角定下来；直角顶点三种情况各用一个工具——斜边中线、$30^\\circ$ 角所对的直角边。',
      ],
      verify: () => {
        // 直线 DE 上取点 F=(x, h)，三种直角各解一次（直角在 F 时解二次方程）
        const A = [3, 3 * Math.sqrt(3)], B = [0, 0], C = [10, 0], h = A[1] / 2, Ex = (A[0] + C[0]) / 2, out = [];
        const dot = (P, Q, R) => (Q[0] - P[0]) * (R[0] - P[0]) + (Q[1] - P[1]) * (R[1] - P[1]);  // 在 P 处的两边点积
        // 直角在 A：(F−A)·(B−A)=0，关于 x 是一次的
        const xa = (A[0] * (B[0] - A[0]) - (h - A[1]) * (B[1] - A[1])) / (B[0] - A[0]);
        // 直角在 B：(F−B)·(A−B)=0
        const xb = (-h * (A[1] - B[1])) / (A[0] - B[0]);
        // 直角在 F：(A−F)·(B−F)=0 → x²−(A0+B0)x + A0B0 + (A1−h)(B1−h)=0
        const p = A[0] + B[0], q = A[0] * B[0] + (A[1] - h) * (B[1] - h), disc = Math.sqrt(p * p - 4 * q);
        for (const x of [xa, xb, (p - disc) / 2, (p + disc) / 2]) {
          const Fp = [x, h];
          if (Math.min(Math.abs(dot(A, B, Fp)), Math.abs(dot(B, A, Fp)), Math.abs(dot(Fp, A, B))) > 1e-9) throw new Error('不是直角');
          out.push(Q234(R234(Math.abs(x - Ex))));
        }
        return out;
      },
    },
  ],
});
