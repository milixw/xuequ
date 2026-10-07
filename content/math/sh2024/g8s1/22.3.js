'use strict';

// 上海数学八年级上册 · 22.3 勾股定理
// 知识范围：直角三角形中斜边大于直角边；垂线段最短（点到直线的距离是最小值）；勾股定理（面积拼图证明）；勾股定理的逆定理；
//   勾股数；应用（古题、作长为 √n 的线段、判定直角后求面积、斜边上的高用面积法、梯子、折叠、最短路线）
// 可以使用：22.1（两锐角互余、斜边上的中线等于斜边一半、30° 角所对直角边等于斜边一半、直角三角形全等的判定定理）、
//   22.2（角平分线性质定理及逆定理、内心）；19～21 章（实数、二次根式化简、一元二次方程）；七年级全部（全等、等腰、垂直平分线、轴对称）
// 还没学：坐标系里的距离公式、相似、三角比、平行四边形的性质、圆
// 本节约定：带根号的结果用 real / reals 填空，并要求化成最简二次根式

const SVG223 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  thin: (a, b) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#d8cfbf" stroke-width="1"/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle"${size !== 15 ? ` font-size="${size}"` : ''}>${t}</text>`,
  poly: (pts, fill = 'none') => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  // 直角记号：顶点 P，两边朝向 Q、R
  ra: (P, Q, R, s = 9) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]], lu = Math.hypot(...u), lv = Math.hypot(...v);
    const a = [P[0] + (u[0] / lu) * s, P[1] + (u[1] / lu) * s], b = [P[0] + (v[0] / lv) * s, P[1] + (v[1] / lv) * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    return `<polyline points="${[a, c, b].map(p => p.map(t => t.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
  },
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  // 点 P 关于直线 QR 的对称点
  refl: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    const F = [Q[0] + t * u[0], Q[1] + t * u[1]];
    return [2 * F[0] - P[0], 2 * F[1] - P[1]];
  },
  // 点 P 到直线 QR 的距离
  toLine: (P, Q, R) => Math.abs((R[0] - Q[0]) * (P[1] - Q[1]) - (R[1] - Q[1]) * (P[0] - Q[0])) / Math.hypot(R[0] - Q[0], R[1] - Q[1]),
  // ∠QPR（度）
  ang: (P, Q, R) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180) / Math.PI;
  },
  // 已知 BC 在 x 轴上（B 在原点，C=(a,0)），AB=c、AC=b，求 A（在上方）
  apex: (a, b, c) => { const x = (c * c - b * b + a * a) / (2 * a); return [x, Math.sqrt(c * c - x * x)]; },
};

// 数值工具：二分求根、在区间上找出 f 的所有变号点
const R223 = v => Math.round(v * 1e9) / 1e9;
// 把数值还原成分母不超过 1000 的分数（verify 里比较有理数答案用）
const Q223 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return F(n).div(F(d)); } return v; };
const bisect223 = (f, lo, hi) => {
  let flo = f(lo);
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2, fm = f(mid);
    if (fm === 0) return mid;
    if ((fm > 0) === (flo > 0)) { lo = mid; flo = fm; } else hi = mid;
  }
  return (lo + hi) / 2;
};
// 单峰函数在 [lo, hi] 上的最小值点（三分法）
const min223 = (f, lo, hi) => {
  for (let i = 0; i < 200; i++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (f(m1) < f(m2)) hi = m2; else lo = m1; }
  return (lo + hi) / 2;
};
const roots223 = (f, lo, hi, n = 20000) => {
  const out = [];
  let x0 = lo, f0 = f(lo);
  for (let i = 1; i <= n; i++) {
    const x1 = lo + ((hi - lo) * i) / n, f1 = f(x1);
    if (f0 === 0) out.push(x0);
    else if ((f0 > 0) !== (f1 > 0)) out.push(bisect223(f, x0, x1));
    x0 = x1; f0 = f1;
  }
  return out;
};

const FIG223 = (() => {
  const S = SVG223, out = {};
  // b03：AB=7，AC=24，BC=25（不画直角记号）
  {
    const m = S.map(11, 22, 100), B = m([0, 0]), C = m([25, 0]), A = m(S.apex(25, 24, 7));
    out.b03 = S.wrap(320, 125, S.poly([A, B, C]) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6));
  }
  // b04：AB=AC=10，BC=12，BE⊥AC 于 E
  {
    const m = S.map(18, 42, 175), B = m([0, 0]), C = m([12, 0]), A = m([6, 8]);
    const t = ((B[0] - A[0]) * (C[0] - A[0]) + (B[1] - A[1]) * (C[1] - A[1])) / (S.dist(A, C) ** 2), E = S.at(A, C, t);
    out.b04 = S.wrap(300, 200, S.poly([A, B, C]) + S.seg(B, E) + S.ra(E, B, C, 8)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('E', E, 12, -4));
  }
  // b05：∠ACB=90°，CD⊥AB 于 D（按 AC=4、BC=3 画）
  {
    const m = S.map(48, 30, 160), A = m([0, 0]), B = m([5, 0]), C = m([3.2, 2.4]), D = m([3.2, 0]);
    out.b05 = S.wrap(300, 185, S.poly([A, B, C]) + S.seg(C, D) + S.ra(C, A, B) + S.ra(D, C, B, 8)
      + S.text('A', A, -10, 6) + S.text('B', B, 10, 6) + S.text('C', C, 0, -14) + S.text('D', D, 0, 14));
  }
  // b06：数轴，长方形 ABCD，A 表示 −1、B 表示 2，BC=2；以 A 为圆心、AC 为半径画弧交数轴于 P
  {
    const k = 62, m = S.map(k, 26 + 1.4 * k, 165), y0 = 165;
    let axis = `<line x1="8" y1="${y0}" x2="312" y2="${y0}" stroke="#2b2b2b" stroke-width="1.4"/><polygon points="312,${y0} 304,${y0 - 4} 304,${y0 + 4}" fill="#2b2b2b"/>`;
    for (let t = -1; t <= 3; t++) { const [x] = m([t, 0]); axis += `<line x1="${x.toFixed(1)}" y1="${y0}" x2="${x.toFixed(1)}" y2="${y0 - 5}" stroke="#2b2b2b" stroke-width="1.2"/>` + S.text(t < 0 ? '−' + -t : String(t), [x, y0], 0, 14, 13); }
    const A = m([-1, 0]), B = m([2, 0]), C = m([2, 2]), D = m([-1, 2]), r = Math.sqrt(13) * k, P = m([-1 + Math.sqrt(13), 0]);
    const arc = `<path d="M ${C[0].toFixed(1)} ${C[1].toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${P[0].toFixed(1)} ${P[1].toFixed(1)}" fill="none" stroke="#2b2b2b" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    out.b06 = S.wrap(320, 195, axis + S.poly([A, B, C, D]) + S.seg(A, C) + arc + S.dot(P)
      + S.text('A', A, -9, -12) + S.text('B', B, -9, -12) + S.text('C', C, 0, -14) + S.text('D', D, 0, -14) + S.text('P', P, 9, -12));
  }
  // b07：方格纸，A(0,1)，B(2,0)，C(4,4)
  {
    const m = S.map(48, 40, 222);
    let grid = '';
    for (let i = 0; i <= 4; i++) { grid += S.thin(m([i, 0]), m([i, 4])) + S.thin(m([0, i]), m([4, i])); }
    const A = m([0, 1]), B = m([2, 0]), C = m([4, 4]);
    out.b07 = S.wrap(270, 250, grid + S.poly([A, B, C]) + S.text('A', A, -12, 0) + S.text('B', B, 0, 14) + S.text('C', C, 10, -8));
  }
  // b08：长方形 ABCD，AB=4，BC=8，折叠使 C 与 A 重合，折痕 EF
  {
    const m = S.map(30, 30, 225), A = m([0, 4]), B = m([0, 0]), C = m([8, 0]), D = m([8, 4]), E = m([5, 4]), Fp = m([3, 0]), D1 = m([3.2, 6.4]);
    out.b08 = S.wrap(300, 250, S.poly([A, B, C, D]) + S.seg(E, Fp) + S.seg(A, D1, true) + S.seg(D1, E, true) + S.seg(A, Fp)
      + S.text('A', A, -10, -4) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 10, -2) + S.text('E', E, 4, 14) + S.text('F', Fp, 0, 14) + S.text('D′', D1, 8, -10));
  }
  // b09：折竹抵地
  {
    const m = S.map(17, 70, 195), G = m([0, 0]), K = m([0, 4.55]), T = m([3, 0]);
    out.b09 = S.wrap(260, 220, `<line x1="20" y1="195" x2="240" y2="195" stroke="#2b2b2b" stroke-width="1.4"/>` + S.seg(G, K) + S.seg(K, T) + S.ra(G, K, T, 8)
      + S.text('根', G, -12, 12, 13) + S.text('折断处', K, -26, -2, 13) + S.text('竹梢', T, 6, 14, 13) + S.text('3 尺', S.at(G, T, 0.5), 0, 13, 13));
  }
  // e01：圆柱形玻璃杯，高 18，A 在外壁离上沿 6，B 在内壁离底 8，位于相对的两侧
  {
    const L = 50, R = 230, top = 40, bot = 220, ry = 18, k = 10, cx = 140;
    const ell = (y, back) => `<path d="M ${L} ${y} A ${(R - L) / 2} ${ry} 0 0 ${back ? 1 : 0} ${R} ${y}" fill="none" stroke="#2b2b2b" stroke-width="1.6"${back ? ' stroke-dasharray="5 3"' : ''}/>`;
    const A = [L + 22, top + 6 * k], B = [R - 40, bot - 8 * k];
    out.e01 = S.wrap(280, 260, ell(top, false) + ell(top, true).replace(' stroke-dasharray="5 3"', '') + ell(bot, false) + ell(bot, true)
      + S.seg([L, top], [L, bot]) + S.seg([R, top], [R, bot]) + S.dot(A) + `<circle cx="${B[0]}" cy="${B[1]}" r="2.6" fill="none" stroke="#2b2b2b"/>`
      + S.text('A', A, 12, -2) + S.text('B', B, 12, -2) + S.text('18', [R, (top + bot) / 2], 16, 0, 13) + S.text('（A 在外壁，B 在内壁）', [cx, bot], 0, 26, 12));
  }
  // e02：Rt△ABC，∠ACB=90°，CM 是斜边上的中线，CH 是斜边上的高（按 5、12、13 画）
  {
    const m = S.map(21, 14, 150), A = m([0, 0]), B = m([13, 0]), C = m([25 / 13, 60 / 13]), M = m([6.5, 0]), H = m([25 / 13, 0]);
    out.e02 = S.wrap(300, 175, S.poly([A, B, C]) + S.seg(C, M) + S.seg(C, H) + S.ra(C, A, B, 8) + S.ra(H, C, B, 7)
      + S.text('A', A, -10, 6) + S.text('B', B, 10, 6) + S.text('C', C, 0, -14) + S.text('M', M, 0, 14) + S.text('H', H, 0, 14));
  }
  // e04：Rt△ABC，∠ACB=90°，AC=8，BC=6，画出直线 BC
  {
    const m = S.map(15, 150, 150), C = m([0, 0]), B = m([6, 0]), A = m([0, 8]);
    out.e04 = S.wrap(300, 175, `<line x1="10" y1="150" x2="290" y2="150" stroke="#2b2b2b" stroke-width="1.4"/>` + S.poly([A, B, C]) + S.ra(C, A, B, 8)
      + S.text('A', A, 0, -14) + S.text('B', B, 2, 14) + S.text('C', C, -4, 14));
  }
  // e05：弦图（直角边 2 和 5）
  {
    const a = 2, b = 5, m = S.map(30, 45, 245), c0 = [(a + b) / 2, (a + b) / 2];
    const rot = ([x, y], k) => { let p = [x - c0[0], y - c0[1]]; for (let i = 0; i < k; i++) p = [-p[1], p[0]]; return [p[0] + c0[0], p[1] + c0[1]]; };
    const tri = [[0, a], [b, 0], [b, a]];
    let inner = '';
    const big = [0, 1, 2, 3].map(k => m(rot(tri[0], k)));
    for (let k = 0; k < 4; k++) { const t = tri.map(p => m(rot(p, k))); inner += S.poly(t, '#efe7d6'); }
    const sq = [0, 1, 2, 3].map(k => m(rot(tri[2], k)));
    out.e05 = S.wrap(300, 270, inner + S.poly(big) + S.poly(sq));
  }
  // e06：梯子 AB 长 13，底端 B 离墙 5，滑动后的一个位置 A′B′
  {
    const m = S.map(14, 40, 205), O = m([0, 0]), A = m([0, 12]), B = m([5, 0]), A1 = m([0, 9]), B1 = m([Math.sqrt(169 - 81), 0]);
    out.e06 = S.wrap(260, 225, `<line x1="40" y1="10" x2="40" y2="205" stroke="#2b2b2b" stroke-width="2.4"/><line x1="40" y1="205" x2="250" y2="205" stroke="#2b2b2b" stroke-width="2.4"/>`
      + S.seg(A, B) + S.seg(A1, B1, true) + S.text('O', O, -12, 8) + S.text('A', A, -12, 0) + S.text('B', B, 0, 14) + S.text('A′', A1, -14, 0) + S.text('B′', B1, 0, 14));
  }
  // c02：长方形 ABCD，AB=8，BC=15，E 在直线 BC 上，沿 AE 折叠（按 BE=3 画，不是解）
  {
    const m = S.map(14, 60, 150), A = m([0, 8]), B = m([0, 0]), C = m([15, 0]), D = m([15, 8]), E0 = [3, 0], E = m(E0), B1 = m(S.refl([0, 0], [0, 8], E0));
    out.c02 = S.wrap(310, 175, `<line x1="8" y1="150" x2="302" y2="150" stroke="#2b2b2b" stroke-width="1.4"/>` + S.poly([A, B, C, D]) + S.seg(A, E) + S.seg(A, B1, true) + S.seg(B1, E, true)
      + S.text('A', A, -10, -4) + S.text('B', B, -10, 8) + S.text('C', C, 8, 8) + S.text('D', D, 10, -4) + S.text('E', E, 0, 14) + S.text('B′', B1, 10, -8));
  }
  // c03：AB=AC=13，BC=10，P 在直线 BC 上（画在边上）
  {
    const m = S.map(15, 75, 200), B = m([0, 0]), C = m([10, 0]), A = m([5, 12]), P = m([2.2, 0]);
    out.c03 = S.wrap(300, 225, `<line x1="10" y1="200" x2="290" y2="200" stroke="#2b2b2b" stroke-width="1.4"/>` + S.poly([A, B, C]) + S.seg(A, P)
      + S.text('A', A, 0, -14) + S.text('B', B, -6, 14) + S.text('C', C, 6, 14) + S.text('P', P, 0, 14));
  }
  // c04：∠C=90°，AC=10，BC=11，P 在 AC 上，Q 在 CB 上
  {
    const m = S.map(17, 40, 200), C = m([0, 0]), A = m([0, 10]), B = m([11, 0]), P = m([0, 7]), Q = m([6, 0]);  // 按 t=3：AP=3，CQ=6
    out.c04 = S.wrap(260, 225, S.poly([A, B, C]) + S.seg(P, Q) + S.ra(C, A, B, 8)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('P', P, -12, 0) + S.text('Q', Q, 0, 14));
  }
  // c05：∠C=90°，AC=7.5，BC=18，AD 平分 ∠BAC，BI 平分 ∠ABC 交 AD 于 I（内心 (3,3)）
  {
    const m = S.map(15, 25, 150), C = m([0, 0]), A = m([0, 7.5]), B = m([18, 0]), D = m([5, 0]), I = m([3, 3]);
    out.c05 = S.wrap(310, 175, S.poly([A, B, C]) + S.seg(A, D) + S.seg(B, I) + S.ra(C, A, B, 8)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('D', D, 0, 14) + S.text('I', I, -12, -8));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s1/22.3',
  title: '勾股定理',
  review: { status: 'pending' },
  audit: { blind: '2026-10-07', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。卡片“斜边最长，垂线段最短”配 perpShortest、“勾股定理”配 pythagorasProof，b08 解析配 motion 翻折，e06 解析配 ladderSlide。第 1 轮：c04 解出 (6+√181)/5 不整洁，c05(1) 与 c02(1) 同图同答案、(2) 只是反用，c03 与 b04 同一三角形且结论知名，c02 是矩形折叠的换数版，e06 用了流传原数据，扩展档缺 4、5 级，5-12-13、6-8-10 出现过多；改为 c04 换数据使两段各有整数解，c05 改成已知 CD 与 AB−AC 再叠加内心面积法，c03 换 13、13、10 并要求边上与延长线两种位置，c02 改成 E 在直线 BC 上的三类加位置分类，e06 改为梯子 13、5 求面积最大，e01 换成圆柱杯内外壁最短路，e03 改为高的垂足两解，b01、b08 换数据。第 2 轮：e03 的 15、20、12 是流传原数据且与卡片 9、12、15 撞车，换成 25、17、15，并调整 c02、c04、e01 配图；第 3 轮整节通过' },

  intro: [
    {
      title: '斜边最长，垂线段最短',
      body: '直角三角形的两个锐角互余，所以直角是最大的角；大角对大边，**斜边大于每一条直角边**。把直角边看成“点到直线的垂线段”，就得到：连接直线外一点与直线上各点的所有线段中，**垂线段最短**。拖动下面的点 $Q$ 看一看。',
      example: '点 $P$ 到直线 $l$ 的距离是 $4$，那么 $P$ 与 $l$ 上任何一点的连线都不短于 $4$，只有垂足那一点的连线等于 $4$。',
      demo: { type: 'perpShortest' },
    },
    {
      title: '勾股定理',
      body: '直角三角形两条直角边的平方和等于斜边的平方：$a^2+b^2=c^2$。古人称短直角边为“勾”、长直角边为“股”、斜边为“弦”。证明：两个边长 $a+b$ 的正方形各去掉四个全等的直角三角形，一个剩下 $c^2$，一个剩下 $a^2+b^2$，所以两者相等。',
      example: '两条直角边是 $12$ 和 $35$：斜边的平方 $=144+1225=1369=37^2$，斜边是 $37$。',
      pitfall: '只有直角三角形才能用；先看清哪条边是斜边（直角所对的边），已知斜边求直角边要用减法。',
      demo: { type: 'pythagorasProof' },
    },
    {
      title: '逆定理与勾股数',
      body: '**逆定理**：如果三角形的一条边的平方等于另外两条边的平方和，那么这个三角形是直角三角形，这条边所对的角是直角。满足 $a^2+b^2=c^2$ 的三个**正整数**叫作一组勾股数。',
      example: '三边 $28$、$45$、$53$：$28^2+45^2=784+2025=2809=53^2$，是直角三角形，$53$ 所对的角是直角。',
      pitfall: '要拿**最长边**的平方和另两边的平方和比；$0.3$、$0.4$、$0.5$ 能组成直角三角形，但不是勾股数。',
    },
    {
      title: '常用的计算方法',
      body: '(1) 斜边上的高用**面积法**：两条直角边的积 $=$ 斜边 $\\times$ 斜边上的高。(2) 边长不能直接求时，**设未知数**，在某个直角三角形里用勾股定理列方程（折叠、古题、梯子常这样做）。(3) 从边长为 $1$ 的直角三角形出发，接连作直角三角形，可以作出长为 $\\sqrt2$、$\\sqrt3$、$\\sqrt4$…的线段。',
      example: '直角边是 $9$、$12$ 时，斜边是 $15$，斜边上的高 $=\\dfrac{9\\times12}{15}=\\dfrac{36}{5}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '22.3-b01',
      level: 'basic',
      type: 'fill',
      stem: '一个直角三角形有两条边的长分别是 $15$ 和 $20$，求第三条边的长（有几个就填几个，用逗号隔开，根式化成最简二次根式）。',
      blanks: [
        { kind: 'reals', label: '第三边', answer: ['25', '5√7'], simplest: true },
      ],
      explain: [
        '题目没有说哪条是斜边，要分两种情况。',
        '$15$、$20$ 都是直角边：第三边是斜边，$\\sqrt{15^2+20^2}=\\sqrt{625}=25$。',
        '$20$ 是斜边、$15$ 是直角边：第三边 $=\\sqrt{20^2-15^2}=\\sqrt{175}=5\\sqrt7$。（$15$ 不能是斜边，因为斜边大于直角边。）',
        '坑：只想到“$15$、$20$、$25$”这组熟悉的数，漏掉 $20$ 是斜边的情况。',
      ],
      verify: () => [Math.hypot(15, 20), Math.sqrt(20 * 20 - 15 * 15)],
    },
    {
      id: '22.3-b02',
      level: 'basic',
      type: 'multi',
      stem: '以下列各组数为三边长的三角形中，是直角三角形的有（　　）（多选）',
      options: [
        '$1.5$，$2$，$2.5$',
        '$\\sqrt3$，$\\sqrt4$，$\\sqrt5$',
        '$1$，$\\sqrt2$，$\\sqrt3$',
        '三边之比为 $2:3:4$',
        '$11$，$60$，$61$',
      ],
      answer: [0, 2, 4],
      explain: [
        'A：$1.5^2+2^2=2.25+4=6.25=2.5^2$，是。',
        'B：最长边是 $\\sqrt5$，$(\\sqrt3)^2+(\\sqrt4)^2=3+4=7\\neq5$，不是。坑：看到被开方数是 $3$、$4$、$5$ 就以为是，其实要比的是平方，即 $3$、$4$、$5$ 本身，而 $3+4\\neq5$。',
        'C：$1^2+(\\sqrt2)^2=1+2=3=(\\sqrt3)^2$，是。',
        'D：设三边为 $2k$、$3k$、$4k$，$4k^2+9k^2=13k^2\\neq16k^2$，不是。',
        'E：$11^2+60^2=121+3600=3721=61^2$，是，$11$、$60$、$61$ 是一组勾股数。',
      ],
      verify: () => {
        const sets = [[1.5, 2, 2.5], [Math.sqrt(3), 2, Math.sqrt(5)], [1, Math.sqrt(2), Math.sqrt(3)], [2, 3, 4], [11, 60, 61]];
        return sets.map((s, i) => { const [a, b, c] = [...s].sort((x, y) => x - y); return Math.abs(a * a + b * b - c * c) < 1e-9 ? i : -1; }).filter(i => i >= 0);
      },
    },
    {
      id: '22.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=7$，$AC=24$，$BC=25$。求点 $A$ 到直线 $BC$ 的距离。',
      figure: FIG223.b03,
      blanks: [
        { kind: 'num', label: '距离', answer: '168/25' },
      ],
      explain: [
        '先判断形状：$AB^2+AC^2=49+576=625=25^2=BC^2$，由勾股定理的逆定理，$\\angle BAC=90^\\circ$。',
        '过 $A$ 作 $AD\\perp BC$ 于 $D$，$AD$ 就是所求距离。用两种方法算面积：$\\frac12AB\\cdot AC=\\frac12BC\\cdot AD$，$AD=\\dfrac{7\\times24}{25}=\\dfrac{168}{25}$。',
        '坑：题目没说是直角三角形，不先用逆定理判断就没法下手；或者把 $AB$、$AC$ 中的一条当成距离。',
      ],
      verify: () => { const S = SVG223, A = S.apex(25, 24, 7); return R223(S.toLine(A, [0, 0], [25, 0])); },
    },
    {
      id: '22.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC=10$，$BC=12$，$BE\\perp AC$，垂足为 $E$。求 $\\triangle ABC$ 的面积和 $BE$ 的长。',
      figure: FIG223.b04,
      blanks: [
        { kind: 'num', label: '面积', answer: '48' },
        { kind: 'num', label: '$BE=$', answer: '48/5' },
      ],
      explain: [
        '过 $A$ 作 $AD\\perp BC$ 于 $D$。等腰三角形三线合一，$D$ 是 $BC$ 的中点，$BD=6$。',
        '在 $\\text{Rt}\\triangle ABD$ 中，$AD=\\sqrt{10^2-6^2}=8$，面积 $=\\frac12\\times12\\times8=48$。',
        '再用面积法：$\\frac12AC\\cdot BE=48$，$BE=\\dfrac{96}{10}=\\dfrac{48}{5}$。',
        '坑：直接用 $BC=12$ 当直角边算 $\\sqrt{10^2-12^2}$（开不出来）或算成 $\\sqrt{10^2+12^2}$，忘了底边要先取一半。',
      ],
      verify: () => {
        const S = SVG223, B = [0, 0], C = [12, 0], A = S.apex(12, 10, 10), area = (12 * A[1]) / 2;
        return [R223(area), R223(S.toLine(B, A, C))];
      },
    },
    {
      id: '22.3-b05',
      level: 'basic',
      type: 'choice',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$CD\\perp AB$，垂足为 $D$。下列结论中，**一定成立**的有几个？①$AB>AC$；②$CD<BC$；③$AD<AC$；④$CD<AD$；⑤线段 $AB$ 上所有的点中，到点 $C$ 距离最小的是点 $D$。',
      figure: FIG223.b05,
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 2,
      explain: [
        '①：在 $\\text{Rt}\\triangle ABC$ 中，$AB$ 是斜边，大于直角边 $AC$，成立。',
        '②：在 $\\text{Rt}\\triangle CDB$ 中，$\\angle CDB=90^\\circ$，$BC$ 是斜边，$CD<BC$，成立。③同理，在 $\\text{Rt}\\triangle ACD$ 中 $AC$ 是斜边，$AD<AC$，成立。',
        '④：$CD$、$AD$ 都是 $\\text{Rt}\\triangle ACD$ 的直角边，谁长不一定：$\\angle A=60^\\circ$ 时 $\\angle ACD=30^\\circ$，$AD=\\frac12AC$，$CD^2=AC^2-AD^2=3AD^2>AD^2$，$CD$ 反而更长。不一定成立。',
        '⑤：垂线段最短，成立。所以一定成立的有 ①②③⑤ 共 $4$ 个。',
        '坑：看图里 $CD$ 比 $AD$ 短，就认为④成立；“一定成立”要对所有情况都对。',
      ],
      verify: () => {
        const S = SVG223, okAll = [true, true, true, true, true];
        for (let k = 1; k < 90; k++) {  // ∠A 从 1° 到 89°，AB=1
          const a = (k * Math.PI) / 180, A = [0, 0], B = [1, 0], C = [Math.cos(a) ** 2, Math.cos(a) * Math.sin(a)], D = [C[0], 0];
          const st = [S.dist(A, B) > S.dist(A, C), S.dist(C, D) < S.dist(B, C), S.dist(A, D) < S.dist(A, C), S.dist(C, D) < S.dist(A, D)];
          let best = Infinity, bx = 0;
          for (let i = 0; i <= 1000; i++) { const d = S.dist([i / 1000, 0], C); if (d < best) { best = d; bx = i / 1000; } }
          st.push(Math.abs(bx - D[0]) <= 1e-3);
          st.forEach((v, i) => { if (!v) okAll[i] = false; });
        }
        return okAll.filter(Boolean).length - 2;
      },
    },
    {
      id: '22.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，数轴上点 $A$ 表示 $-1$，点 $B$ 表示 $2$，以 $AB$ 为一边作长方形 $ABCD$，$BC=2$。以点 $A$ 为圆心、$AC$ 为半径画弧，交数轴的正半轴于点 $P$。点 $P$ 表示的数是多少？',
      figure: FIG223.b06,
      blanks: [
        { kind: 'real', label: '点 $P$ 表示', answer: '-1+√13', simplest: true },
      ],
      explain: [
        '$AB=2-(-1)=3$。在 $\\text{Rt}\\triangle ABC$ 中，$AC=\\sqrt{3^2+2^2}=\\sqrt{13}$，所以 $AP=AC=\\sqrt{13}$。',
        '$P$ 在 $A$ 的右边、距离 $A$ 为 $\\sqrt{13}$，所以 $P$ 表示 $-1+\\sqrt{13}$。',
        '坑：以为弧从原点画起，直接填 $\\sqrt{13}$；或者把 $AB$ 算成 $1$（$2-1$）。',
      ],
      verify: () => -1 + Math.hypot(2 - (-1), 2),
    },
    {
      id: '22.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，每个小正方形的边长都是 $1$，$\\triangle ABC$ 的三个顶点都在格点上，$M$ 是 $AC$ 的中点。求 $\\angle ABC$ 的度数和 $BM$ 的长。',
      figure: FIG223.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle ABC=$', answer: '90°' },
        { kind: 'num', label: '$BM=$', answer: '5/2' },
      ],
      explain: [
        '在格点组成的直角三角形中用勾股定理：$AB^2=2^2+1^2=5$，$BC^2=2^2+4^2=20$，$AC^2=4^2+3^2=25$。',
        '$AB^2+BC^2=25=AC^2$，由勾股定理的逆定理，$\\angle ABC=90^\\circ$。',
        '$BM$ 是 $\\text{Rt}\\triangle ABC$ 斜边上的中线，等于斜边的一半：$BM=\\frac12AC=\\frac52$。',
        '坑：$AB$、$BC$ 都斜着，看不出直角，就去算 $BM$ 的格点长度（$M$ 不在格点上）；先算三边的平方，用逆定理判定。',
      ],
      verify: () => {
        const S = SVG223, A = [0, 1], B = [2, 0], C = [4, 4], M = S.at(A, C, 0.5);
        return [Math.round(S.ang(B, A, C) * 1e6) / 1e6 + '°', R223(S.dist(B, M))];
      },
    },
    {
      id: '22.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，长方形纸片 $ABCD$ 中，$AB=4$，$BC=8$。折叠纸片，使点 $C$ 与点 $A$ 重合，折痕 $EF$ 的端点 $E$ 在 $AD$ 上、$F$ 在 $BC$ 上，点 $D$ 落在 $D\'$ 处。求 $BF$ 的长。',
      figure: FIG223.b08,
      blanks: [
        { kind: 'num', label: '$BF=$', answer: '3' },
      ],
      explain: [
        '折叠前后对应线段相等：$FA=FC$。设 $BF=x$，则 $FA=FC=8-x$。',
        '在 $\\text{Rt}\\triangle ABF$ 中，$AB^2+BF^2=AF^2$：$16+x^2=(8-x)^2$，$16=64-16x$，$x=3$。',
        '坑：以为折痕过 $BC$ 的中点，$BF=4$；折痕上的点到 $A$、$C$ 距离相等，$F$ 并不是中点。',
      ],
      demo: { type: 'motion', mode: 'reflect', shape: [[3, 0], [8, 0], [8, 4], [5, 4]], labels: ['F', 'C', 'D', 'E'], axis: [[3, 0], [5, 4]], view: [-1, 9, -1, 7] },
      verify: () => {
        const S = SVG223, A = [0, 4], C = [8, 0];
        return R223(bisect223(x => S.dist([x, 0], A) - S.dist([x, 0], C), 0, 8));
      },
    },
    {
      id: '22.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '《九章算术》中有一题：“今有竹高一丈，末折抵地，去本三尺，问折者高几何？”意思是：一根竹子高 $1$ 丈，从某处折断，竹梢恰好碰到地面，竹梢离竹根 $3$ 尺。问折断处离地面多高？（$1$ 丈 $=10$ 尺，竹子原来竖直，折断后两段仍相连。）',
      figure: FIG223.b09,
      blanks: [
        { kind: 'num', label: '折断处高（尺）', answer: '91/20' },
      ],
      explain: [
        '设折断处离地面 $x$ 尺，折下的一段长 $(10-x)$ 尺，它是直角三角形的斜边，两条直角边是 $x$ 和 $3$。',
        '$x^2+3^2=(10-x)^2$，$9=100-20x$，$x=\\dfrac{91}{20}=4.55$。所以折断处离地面 $4.55$ 尺。',
        '坑：单位不统一，把 $1$ 丈当成 $1$ 和 $3$ 尺直接列式；或者把竹子留在地上的一段当成斜边。',
      ],
      verify: () => R223(bisect223(x => x * x + 9 - (10 - x) ** 2, 0, 10)),
    },

    // ---------- 扩展 ----------
    {
      id: '22.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，圆柱形玻璃杯高 $18$ cm，底面周长 $24$ cm。杯子内壁离杯底 $8$ cm 的点 $B$ 处有一滴蜂蜜；一只蚂蚁在杯子外壁上，离杯子上沿 $6$ cm、与蜂蜜相对的点 $A$ 处（$A$、$B$ 所在的竖直线位于直径的两端）。蚂蚁从外壁翻过杯口爬到内壁吃蜂蜜，最短路线长多少厘米？（杯壁厚度不计）',
      figure: FIG223.e01,
      blanks: [
        { kind: 'num', label: '最短路线（cm）', answer: '20' },
      ],
      explain: [
        '把杯子的侧面沿 $A$ 所在的竖直线剪开展平，得到长 $24$、宽 $18$ 的长方形，$A$、$B$ 的水平距离是半个周长 $12$ cm。',
        '蚂蚁先在外壁爬到杯口上某点 $P$，再在内壁爬到 $B$。内壁、外壁展开后叠在一起，要把一侧“翻”过去：作 $A$ 关于杯口所在直线的对称点 $A\'$，$A\'$ 在杯口上方 $6$ cm，则 $PA=PA\'$，$PA+PB=PA\'+PB\\geq A\'B$（两点之间线段最短）。',
        '$B$ 在杯口下方 $18-8=10$ cm，所以 $A\'$、$B$ 的竖直距离是 $6+10=16$，水平距离是 $12$，$A\'B=\\sqrt{12^2+16^2}=20$。',
        '思路：曲面先展开成平面，再用轴对称把“跨过杯口”的折线拉直，两步缺一不可。坑：不作对称点，直接连 $A$、$B$ 算 $\\sqrt{12^2+4^2}$，这条线在展开图中没有经过杯口。',
      ],
      verify: () => {
        // 展开图中杯口为 y=0，A=(0,−6)（外壁），B=(12,−10)（内壁），过杯口上的点 P=(s,0)
        const len = s => Math.hypot(s, 6) + Math.hypot(12 - s, 10);
        return R223(len(min223(len, 0, 12)));
      },
    },
    {
      id: '22.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\text{Rt}\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，斜边上的中线 $CM=6.5$，$\\triangle ABC$ 的周长是 $30$，$CH$ 是斜边上的高。求 $\\triangle ABC$ 的面积和 $CH$ 的长。',
      figure: FIG223.e02,
      blanks: [
        { kind: 'num', label: '面积', answer: '30' },
        { kind: 'num', label: '$CH=$', answer: '60/13' },
      ],
      explain: [
        '斜边上的中线等于斜边的一半，所以 $AB=2CM=13$，两条直角边的和 $AC+BC=30-13=17$。',
        '不必求出每条直角边，用完全平方公式：$(AC+BC)^2=AC^2+BC^2+2AC\\cdot BC$，而 $AC^2+BC^2=AB^2=169$（勾股定理），所以 $2AC\\cdot BC=289-169=120$。',
        '面积 $=\\frac12AC\\cdot BC=\\frac{120}{4}=30$。',
        '面积法：$\\frac12AB\\cdot CH=30$，$CH=\\dfrac{60}{13}$。',
        '思路：已知“和”与“平方和”，用完全平方公式直接得到“积”，就是面积的 $2$ 倍、$4$ 倍关系，省去解方程。坑：把 $2AC\\cdot BC=120$ 当成面积。',
      ],
      verify: () => {
        const c = 13, s = 17, x = bisect223(a => a * a + (s - a) ** 2 - c * c, 0, s / 2), y = s - x, area = (x * y) / 2;
        return [R223(area), F(R223(2 * area)).div(F(c))];  // 面积法：CH = 2S ÷ AB
      },
    },
    {
      id: '22.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=25$，$AC=17$，$BC$ 边上的高 $AD=15$。求 $BC$ 的长（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$BC=$', answer: ['28', '12'] },
      ],
      explain: [
        '在 $\\text{Rt}\\triangle ABD$ 中，$BD=\\sqrt{25^2-15^2}=20$；在 $\\text{Rt}\\triangle ACD$ 中，$CD=\\sqrt{17^2-15^2}=8$。',
        '题目没有图，垂足 $D$ 的位置要分类：$D$ 在线段 $BC$ 上（$\\angle B$、$\\angle C$ 都是锐角），$BC=BD+CD=28$；$D$ 在 $BC$ 的延长线上（$\\angle ACB$ 是钝角），$B$、$C$ 在 $D$ 的同侧，$BC=BD-CD=20-8=12$。',
        '检验：两种情况三角形都存在（$28<25+17$，$12+17>25$）。',
        '坑：默认高在三角形内部，只得到 $28$。钝角三角形的高可以落在外面。',
      ],
      verify: () => {
        // A=(0,15)，D 为原点，B、C 在 x 轴上，枚举两点各在 D 的哪一侧
        const bd = Math.sqrt(25 * 25 - 225), cd = Math.sqrt(17 * 17 - 225), out = [];
        for (const sb of [1, -1]) for (const sc of [1, -1]) { const v = R223(Math.abs(sb * bd - sc * cd)); if (!out.includes(v)) out.push(v); }
        return out;
      },
    },
    {
      id: '22.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\text{Rt}\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$AC=8$，$BC=6$。点 $P$ 在直线 $BC$ 上（不与点 $B$ 重合），且 $\\triangle ABP$ 是等腰三角形。求 $CP$ 的长（全部填出，用逗号隔开）。',
      figure: FIG223.e04,
      blanks: [
        { kind: 'nums', label: '$CP$ 的长', answer: ['7/3', '6', '4', '16'] },
      ],
      explain: [
        '$AB=\\sqrt{8^2+6^2}=10$。按哪两条边相等分三类。',
        '$BP=BA=10$：$P$ 在 $B$ 的两侧各有一个。$P$ 在 $C$ 一侧时 $CP=10-6=4$；在另一侧时 $CP=6+10=16$。',
        '$AP=AB$：$AC\\perp BC$，三线合一，$P$ 与 $B$ 关于 $AC$ 对称，$CP=CB=6$。',
        '$PA=PB$：$P$ 在 $AB$ 的垂直平分线上。设 $CP=x$。若 $P$ 在线段 $CB$ 上，$PB=6-x$，$8^2+x^2=(6-x)^2$ 得 $x=-\\frac73$，不合；所以 $P$ 在 $C$ 的另一侧，$PB=6+x$，$64+x^2=(6+x)^2$，$x=\\dfrac73$。',
        '所以 $CP=\\frac73$、$6$、$4$ 或 $16$。坑：只在线段 $BC$ 上找点，漏掉 $P$ 在 $C$ 左侧和 $B$ 右侧的情况；$PA=PB$ 时 $AC>BC$，垂直平分线和直线 $BC$ 的交点在 $C$ 的另一侧。',
      ],
      verify: () => {
        const S = SVG223, C = [0, 0], B = [6, 0], A = [0, 8], P = t => [t, 0];
        const fs = [t => S.dist(P(t), A) - S.dist(P(t), B), t => S.dist(P(t), A) - S.dist(A, B), t => S.dist(P(t), B) - S.dist(A, B)];
        const ts = [];
        for (const f of fs) for (const t of roots223(f, -30.001, 30.003, 60000)) if (Math.abs(t - 6) > 1e-6 && !ts.some(u => Math.abs(u - t) < 1e-6)) ts.push(t);
        return ts.map(t => Q223(Math.abs(t - C[0])));
      },
    },
    {
      id: '22.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图是“赵爽弦图”：四个全等的直角三角形拼成一个大正方形，中间空出一个小正方形。已知大正方形的面积是 $29$，小正方形的面积是 $9$。求每个直角三角形的面积，以及它的两条直角边的长度之和。',
      figure: FIG223.e05,
      blanks: [
        { kind: 'num', label: '每个直角三角形的面积', answer: '5' },
        { kind: 'num', label: '两条直角边之和', answer: '7' },
      ],
      explain: [
        '设直角边为 $a$、$b$（$a<b$），斜边是大正方形的边，$a^2+b^2=29$；小正方形的边长是 $b-a$，$(b-a)^2=9$。',
        '四个三角形的面积和 $=29-9=20$，每个的面积是 $5$，即 $\\frac12ab=5$，$ab=10$。',
        '$(a+b)^2=a^2+b^2+2ab=29+20=49$，$a+b=7$（$a+b>0$）。',
        '坑：把大正方形的边长当成 $a+b$（那是外面再套一圈的正方形）；或者求出 $(a+b)^2=49$ 忘了开方。',
      ],
      verify: () => {
        const a = bisect223(x => x * x + (x + 3) ** 2 - 29, 0, 5), b = a + 3;  // b−a=3
        return [R223((a * b) / 2), R223(a + b)];
      },
    },
    {
      id: '22.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，长 $13$ 米的梯子 $AB$ 斜靠在竖直的墙 $OA$ 上，底端 $B$ 离墙角 $O$ 有 $5$ 米。梯子顶端沿墙下滑，底端沿地面向外滑，直到梯子平躺在地面上。(1) 滑动过程中，$\\triangle OAB$ 面积的最大值是多少平方米？(2) 面积最大时，顶端比原来下滑了多少米？(3) 滑动过程中，梯子的中点到墙角 $O$ 的距离是多少米？',
      figure: FIG223.e06,
      blanks: [
        { kind: 'num', label: '(1) 最大面积（平方米）', answer: '169/4' },
        { kind: 'real', label: '(2) 下滑（米）', answer: '12-13√2/2', simplest: true },
        { kind: 'num', label: '(3) 距离（米）', answer: '13/2' },
      ],
      explain: [
        '原来顶端高 $OA=\\sqrt{13^2-5^2}=12$ 米，面积是 $\\frac12\\times12\\times5=30$。',
        '(1) 任一时刻设 $OA=p$，$OB=q$，梯子长不变：$p^2+q^2=169$，面积 $S=\\frac12pq$。由 $(p-q)^2\\geq0$ 得 $2pq\\leq p^2+q^2=169$，所以 $S\\leq\\frac{169}{4}$，当 $p=q$ 时取等号。',
        '(2) $p=q$ 时 $2p^2=169$，$p=\\frac{13}{\\sqrt2}=\\frac{13\\sqrt2}{2}\\approx9.19$，在 $0$ 到 $12$ 之间，滑动过程中确实会经过这个位置，所以最大面积 $\\frac{169}4$ 取得到。顶端下滑了 $12-\\frac{13\\sqrt2}{2}$ 米（约 $2.81$ 米）。',
        '(3) 梯子、墙、地面组成直角三角形，梯子是斜边，斜边上的中线等于斜边的一半，中点到 $O$ 的距离始终是 $\\frac{13}{2}$ 米。',
        '思路：梯子长给出“平方和一定”，面积是“积”，用完全平方式比较积与平方和。坑：以为开始的位置面积最大，或者以为面积不变。',
      ],
      demo: { type: 'ladderSlide', len: 13 },
      verify: () => {
        const area = p => (p * Math.sqrt(169 - p * p)) / 2, p = bisect223(x => (169 - 2 * x * x) / (2 * Math.sqrt(169 - x * x)), 1, 12);  // 面积对 p 的变化率为 0 处（导数的式子，二分求根）
        const a = 0.7, A = [0, 13 * Math.sin(a)], B = [13 * Math.cos(a), 0], M = SVG223.at(A, B, 0.5);
        return [Q223(area(p)), 12 - p, Q223(SVG223.dist([0, 0], M))];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '22.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '一个直角三角形的三条边长都是正整数，并且它的面积的数值恰好是周长数值的 $2$ 倍。这样的直角三角形有几个（全等的算一个）？把它们的斜边长全部填出（用逗号隔开）。',
      blanks: [
        { kind: 'num', label: '个数', answer: '3' },
        { kind: 'nums', label: '斜边长', answer: ['20', '26', '41'] },
      ],
      explain: [
        '设两条直角边为 $a$、$b$（$a\\leq b$），斜边为 $c$。条件是 $\\frac12ab=2(a+b+c)$，所以 $c=\\dfrac{ab}{4}-a-b$。',
        '思路：三个未知数、两个关系，先消去 $c$。把 $c$ 代入 $a^2+b^2=c^2$：$a^2+b^2=\\dfrac{a^2b^2}{16}-\\dfrac{ab(a+b)}{2}+a^2+2ab+b^2$。',
        '两边消去 $a^2+b^2$，再除以 $\\dfrac{ab}{16}$（$ab\\neq0$）：$ab-8(a+b)+32=0$，即 $ab-8a-8b+64=32$，$(a-8)(b-8)=32$。',
        '再找整数解：若 $a-8$、$b-8$ 都是负数，它们都不小于 $-7$，积最大是 $49$，但能乘出 $32$ 的只有 $(-4)\\times(-8)$ 等，会使边长为 $0$ 或负数，不行；所以都是正数，$(a-8,b-8)=(1,32)$、$(2,16)$、$(4,8)$。',
        '得到 $(a,b)=(9,40)$、$(10,24)$、$(12,16)$，由 $c=\\frac{ab}4-a-b$ 算出 $c=41$、$26$、$20$，都是正整数，且 $9^2+40^2=41^2$、$10^2+24^2=26^2$、$12^2+16^2=20^2$，检验成立。共 $3$ 个。',
        '坑：直接把 $c=\\sqrt{a^2+b^2}$ 代入不好处理；先用面积条件表示 $c$ 再平方，才能消成乘积等于常数的形式。',
      ],
      verify: () => {
        const cs = [];
        for (let a = 1; a <= 300; a++) for (let b = a; b <= 300; b++) {
          const c = Math.round(Math.hypot(a, b));
          if (c * c === a * a + b * b && a * b === 4 * (a + b + c)) cs.push(c);
        }
        return [cs.length, cs];
      },
    },
    {
      id: '22.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，长方形 $ABCD$ 中，$AB=8$，$BC=15$。点 $E$ 在直线 $BC$ 上（不与 $B$、$C$ 重合），把 $\\triangle ABE$ 沿 $AE$ 所在直线折叠，点 $B$ 落在点 $B\'$ 处。当 $\\triangle B\'EC$ 是直角三角形时，求 $BE$ 的长（全部填出，用逗号隔开，相同的长度只填一次）。',
      figure: FIG223.c02,
      blanks: [
        { kind: 'nums', label: '$BE=$', answer: ['24/5', '8', '40/3'] },
      ],
      explain: [
        '折叠后 $AB\'=AB=8$，$B\'E=BE$，$\\angle AB\'E=\\angle ABE=90^\\circ$。$E$ 可能在线段 $BC$ 上、$C$ 的右侧或 $B$ 的左侧，按哪个角是直角分三类，每类再看 $E$ 的位置。',
        '$\\angle B\'CE=90^\\circ$：$B\'$ 在直线 $CD$ 上。点 $A$ 到直线 $CD$ 的距离是 $AD=15$，垂线段最短，$AB\'\\geq15>8$，不可能。',
        '$\\angle B\'EC=90^\\circ$：$B\'E\\perp BC$，$\\angle BEB\'=90^\\circ$，$AE$ 平分它，$\\angle AEB=45^\\circ$，$BE=AB=8$。$E$ 在 $B$ 右侧（线段 $BC$ 上）或左侧各一个，长度都是 $8$；$E$ 不会在 $C$ 右侧（那要 $BE>15$）。',
        '$\\angle EB\'C=90^\\circ$：又有 $\\angle AB\'E=90^\\circ$，所以 $A$、$B\'$、$C$ 共线，$B\'$ 在直线 $AC$ 上且 $AB\'=8$，$AC=\\sqrt{8^2+15^2}=17$。设 $BE=x$。',
        '① $B\'$ 在线段 $AC$ 上：$B\'C=17-8=9$，$E$ 在线段 $BC$ 上，$EC=15-x$，$x^2+9^2=(15-x)^2$，$x=\\dfrac{24}{5}$。',
        '② $B\'$ 在 $CA$ 的延长线上：$B\'C=17+8=25$。$EC$ 是 $\\text{Rt}\\triangle EB\'C$ 的斜边，$EC>25>15$，$E$ 不在线段 $BC$ 上；若 $E$ 在 $C$ 右侧，$EC=x-15$，$x^2+625=(x-15)^2$ 得 $x<0$，不合；所以 $E$ 在 $B$ 左侧，$EC=x+15$，$x^2+625=(x+15)^2$，$x=\\dfrac{40}{3}$。',
        '所以 $BE=\\frac{24}5$、$8$ 或 $\\frac{40}3$。思路：先按直角位置分类，再按 $E$（或 $B\'$）的位置分类，用垂线段最短和斜边最长排除不可能的情况。',
      ],
      verify: () => {
        const S = SVG223, A = [0, 8], C = [15, 0], Bp = e => S.refl([0, 0], A, [e, 0]);
        const dot = (P, Q, R) => (Q[0] - P[0]) * (R[0] - P[0]) + (Q[1] - P[1]) * (R[1] - P[1]);  // 以 P 为顶点
        const fs = [e => dot(Bp(e), [e, 0], C), e => dot([e, 0], Bp(e), C), e => dot(C, Bp(e), [e, 0])];
        const es = [];
        for (const [lo, hi] of [[-200, -0.001], [0.001, 14.999], [15.001, 200]]) for (const f of fs) for (const e of roots223(f, lo, hi, 80000)) {
          if (!es.some(u => Math.abs(u - Math.abs(e)) < 1e-6)) es.push(Math.abs(e));  // 两侧 BE=8 的两个点只算一个长度
        }
        return es.map(Q223);
      },
    },
    {
      id: '22.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC=13$，$BC=10$，点 $P$ 在直线 $BC$ 上。(1) 当 $P$ 在边 $BC$ 上移动时，$AP^2+BP\\cdot PC$ 的值是多少？(2) 若 $BP\\cdot PC=16$，求 $AP$ 的长（全部填出，用逗号隔开，根式化成最简二次根式）。',
      figure: FIG223.c03,
      blanks: [
        { kind: 'num', label: '(1) 值为', answer: '169' },
        { kind: 'reals', label: '(2) $AP=$', answer: ['3√17', '√185'], simplest: true },
      ],
      explain: [
        '作 $AD\\perp BC$ 于 $D$，三线合一，$BD=DC=5$，$AD=\\sqrt{13^2-5^2}=12$。',
        '(1) 设 $PD=d$（$P$ 在 $D$ 的哪一侧都一样），$BP$、$PC$ 一个是 $5-d$、一个是 $5+d$，$BP\\cdot PC=25-d^2$；$AP^2=AD^2+PD^2=144+d^2$。相加得 $169$，与 $P$ 的位置无关，正好是 $AB^2$。',
        '(2) 要分 $P$ 在边上和在延长线上。在边上：由 (1)，$AP^2=169-16=153$，$AP=3\\sqrt{17}$（此时 $25-d^2=16$，$d=3<5$，$P$ 确实在边上，有两个这样的点，$AP$ 相同）。',
        '在延长线上：$PD=d>5$，$BP\\cdot PC=(d+5)(d-5)=d^2-25=16$，$d^2=41$，$AP^2=144+41=185$，$AP=\\sqrt{185}$。',
        '思路：作底边上的高，把 $AP^2$ 和 $BP\\cdot PC$ 都用 $PD$ 表示，平方差让 $d^2$ 抵消；到了延长线上，“和为定值”变成 $AP^2-BP\\cdot PC=AB^2$。坑：只考虑边上的点，漏掉延长线上的 $\\sqrt{185}$。',
      ],
      verify: () => {
        const S = SVG223, A = S.apex(10, 13, 13);
        const vals = [0.7, 3.3, 5, 8.1, 9.5].map(x => S.dist(A, [x, 0]) ** 2 + x * (10 - x));
        const k = vals.every(v => Math.abs(v - vals[0]) < 1e-9) ? R223(vals[0]) : NaN;
        const f = x => Math.abs(x) * Math.abs(10 - x) - 16, aps = [];
        for (const x of roots223(f, -30.0001, 40.0003, 140000)) { const v = S.dist(A, [x, 0]); if (!aps.some(u => Math.abs(u - v) < 1e-6)) aps.push(v); }
        return [k, aps];
      },
    },
    {
      id: '22.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$AC=10$ cm，$BC=11$ cm。点 $P$ 从 $A$ 出发沿 $AC$ 以 $1$ cm/s 的速度向 $C$ 运动，同时点 $Q$ 从 $C$ 出发沿 $CB$ 以 $2$ cm/s 的速度向 $B$ 运动；$Q$ 到达 $B$ 后停在 $B$ 处，$P$ 到达 $C$ 时两点都停止。设运动时间为 $t$ s。(1) 求运动过程中 $PQ$ 的最小值；(2) 当 $PQ=5\\sqrt5$ cm 时，求 $t$ 的值（全部填出，用逗号隔开）。',
      figure: FIG223.c04,
      blanks: [
        { kind: 'real', label: '(1) 最小值（cm）', answer: '4√5', simplest: true },
        { kind: 'nums', label: '(2) $t=$', answer: ['5', '8'] },
      ],
      explain: [
        '$P$ 运动 $10$ s；$Q$ 运动 $5.5$ s 后停在 $B$。分两段。',
        '$0\\leq t\\leq5.5$：$PC=10-t$，$CQ=2t$，$PQ^2=(10-t)^2+(2t)^2=5t^2-20t+100=5(t-2)^2+80$。',
        '$5.5<t\\leq10$：$Q$ 停在 $B$，$PQ^2=(10-t)^2+11^2\\geq121$。',
        '(1) 第一段在 $t=2$ 时最小，$PQ^2=80$；第二段都不小于 $121$。所以 $PQ$ 的最小值是 $\\sqrt{80}=4\\sqrt5$ cm。',
        '(2) $PQ^2=125$。第一段：$5t^2-20t+100=125$，$t^2-4t-5=0$，$t=5$ 或 $t=-1$（舍），$5\\leq5.5$，符合。第二段：$(10-t)^2+121=125$，$10-t=\\pm2$，$t=8$ 或 $12$，$12>10$ 舍去，$t=8$ 符合。',
        '所以 $t=5$ 或 $8$。坑：没注意 $Q$ 在 $5.5$ s 后停下，一直用 $CQ=2t$，会漏掉 $t=8$；求最小值时只看第一段而没比较第二段也是常见疏漏。',
      ],
      verify: () => {
        const pq = t => Math.hypot(10 - t, Math.min(2 * t, 11));
        const best = Math.min(pq(min223(pq, 0, 5.5)), pq(min223(pq, 5.5, 10)));  // 两段上各自是单峰的
        const ts = roots223(t => pq(t) ** 2 - 125, 0.0003, 10, 50000);
        return [best, ts.map(R223)];
      },
    },
    {
      id: '22.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\text{Rt}\\triangle ABC$ 中，$\\angle C=90^\\circ$，$\\angle BAC$ 的平分线交 $BC$ 于点 $D$，$\\angle ABC$ 的平分线交 $AD$ 于点 $I$。已知 $CD=5$，$AB-AC=12$。(1) 求 $AC$ 的长；(2) 求点 $I$ 到 $AB$ 的距离。',
      figure: FIG223.c05,
      blanks: [
        { kind: 'num', label: '(1) $AC=$', answer: '15/2' },
        { kind: 'num', label: '(2) 距离', answer: '3' },
      ],
      explain: [
        '作 $DE\\perp AB$ 于 $E$。$D$ 在 $\\angle BAC$ 的平分线上，$DC\\perp AC$，所以 $DE=DC=5$（角平分线的性质定理）。',
        '$\\text{Rt}\\triangle ACD$ 和 $\\text{Rt}\\triangle AED$ 中，斜边 $AD$ 公共、直角边 $DC=DE$，由直角三角形全等的判定定理，两者全等，$AE=AC$。于是 $EB=AB-AE=AB-AC=12$。',
        '在 $\\text{Rt}\\triangle DEB$ 中，$DB=\\sqrt{5^2+12^2}=13$，所以 $BC=CD+DB=18$。',
        '(1) 设 $AC=y$，$AB=y+12$，$y^2+18^2=(y+12)^2$，$324=24y+144$，$y=\\dfrac{15}{2}$。',
        '(2) $I$ 是两条角平分线的交点，即 $\\triangle ABC$ 的内心，到三边的距离相等，设为 $r$。$AB=\\frac{15}2+12=\\frac{39}2$，周长 $=\\frac{15}2+18+\\frac{39}2=45$，面积 $=\\frac12\\times\\frac{15}2\\times18=\\frac{135}2$。把三角形分成 $\\triangle IAB$、$\\triangle IBC$、$\\triangle ICA$：$\\frac12r\\times45=\\frac{135}2$，$r=3$。',
        '思路：差 $AB-AC$ 不能直接用，角平分线 + 全等把它变成一条线段 $EB$，才能在 $\\triangle DEB$ 中用勾股定理求出 $BC$，再列方程；第 (2) 问用内心到三边距离相等，配合面积分割。',
      ],
      verify: () => {
        // C 在原点，A=(0,b)，B=(a,0)；角平分线方向是两边单位向量之和
        const bis = (P, Q, R) => { const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]], lu = Math.hypot(...u), lv = Math.hypot(...v); return [P, [P[0] + u[0] / lu + v[0] / lv, P[1] + u[1] / lu + v[1] / lv]]; };
        const meet = (p1, p2, q1, q2) => {
          const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]], det = d1[0] * -d2[1] + d2[0] * d1[1];
          const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det; return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
        };
        // 对给定 AC=b，由 CD=5 求出 a，再看 AB−AC，二分找 b
        const aOf = b => bisect223(a => { const [P, Q] = bis([0, b], [0, 0], [a, 0]); return meet(P, Q, [0, 0], [1, 0])[0] - 5; }, 5.0001, 1e4);
        const b = bisect223(b => Math.hypot(aOf(b), b) - b - 12, 0.5, 200), a = aOf(b), A = [0, b], B = [a, 0];
        const [p1, p2] = bis(A, [0, 0], B), [q1, q2] = bis(B, A, [0, 0]), I = meet(p1, p2, q1, q2);
        return [Q223(b), R223(SVG223.toLine(I, A, B))];
      },
    },
  ],
});
