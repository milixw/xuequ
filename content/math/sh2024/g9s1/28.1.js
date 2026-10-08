'use strict';

// 上海数学九年级上册 · 28.1 成比例的线段（课本第 44～53 页）
// 知识范围：线段的比（同一长度单位，比值为正）；成比例线段；比例中项；比例的四条性质（课本不用“合比”“等比”名称，这里也不用）；
//   黄金分割与黄金数 (√5−1)/2；平行线分线段成比例定理 1（截两边或两边的延长线）、定理 2（三条平行线截两条直线）；作第四比例项
// 可以使用：六～八年级全部（全等、等腰、勾股定理及逆定理、中位线、重心 2∶1、平行四边形与矩形、面积、平面直角坐标系、一次函数），
//   一元二次方程（判别式、韦达定理正向使用）、二次根式，第 27 章二次函数
// 还没学：相似三角形（解析里不出现“∽”，平行线段的长度之比要转成平行四边形、矩形或面积来求）、三角比、圆、“角平分线分对边成比例”
// 本节约定：带根号的结果用 real / reals 并要求最简；比用 ratio 填空

const SVG281 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  poly: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  curve: pts => `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
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
  area: pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2,
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  ang: (P, Q, R) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180) / Math.PI;
  },
  // B 在原点、C=(a,0)，AB=c、AC=b，求 A（在上方）
  apex: (a, b, c) => { const x = (c * c - b * b + a * a) / (2 * a); return [x, Math.sqrt(c * c - x * x)]; },
};

// 把数值还原成分母不超过 1000 的分数（verify 里比较有理数答案用）
const Q281 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return F(n).div(F(d)); } return v; };
const near281 = (x, y) => Math.abs(x - y) < 1e-9;
// 一元二次方程的实数根，从小到大
const roots281 = (a, b, c) => {
  let d = b * b - 4 * a * c;
  if (Math.abs(d) < 1e-12) d = 0;
  if (d < 0) return [];
  const s = Math.sqrt(d);
  return d === 0 ? [-b / (2 * a)] : [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
};
// 在 (lo, hi) 上用二分法求单调函数 f 的零点
const bisect281 = (f, lo, hi) => {
  let a = lo, b = hi, fa = f(a);
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2, fm = f(m);
    if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m;
  }
  return (a + b) / 2;
};

const FIG281 = (() => {
  const S = SVG281, out = {};
  // b07：A 字型，AD=4，DB=6，AC=12（BC 取 13）
  {
    const m = S.map(16, 28, 175), B = m([0, 0]), C = m([13, 0]), A = m(S.apex(13, 12, 10));
    const D = S.at(A, B, 0.4), E = S.at(A, C, 0.4);
    out.b07 = S.wrap(270, 200, S.poly([A, B, C]) + S.seg(D, E) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('D', D, -11, -2) + S.text('E', E, 11, -2));
  }
  // b08：8 字型，D、E 在 BA、CA 的延长线上，AD=4，AB=10，AE=6，AC=15
  {
    const u = [-0.5, -Math.sqrt(3) / 2], v = [0.6, -0.8], m = S.map(11, 110, 70);
    const A = m([0, 0]), B = m([10 * u[0], 10 * u[1]]), C = m([15 * v[0], 15 * v[1]]), D = m([-4 * u[0], -4 * u[1]]), E = m([-6 * v[0], -6 * v[1]]);
    out.b08 = S.wrap(240, 215, S.seg(D, B) + S.seg(E, C) + S.seg(B, C) + S.seg(D, E) + S.text('A', A, 13, 0) + S.text('B', B, -10, 6)
      + S.text('C', C, 10, 6) + S.text('D', D, 10, -6) + S.text('E', E, -10, -6));
  }
  // b09：l1∥l2∥l3，AB∶BC=4∶6
  {
    const m = S.map(14, 40, 25), ys = [0, -4, -10];
    let g = '';
    ys.forEach((y, i) => { g += S.seg(m([-1.5, y]), m([10.5, y])) + S.text(`<tspan font-style="italic">l</tspan>${i + 1}`, m([10.5, y]), 14, -2, 14); });
    const A = m([0, 0]), C = m([3, -10]), B = S.at(A, C, 0.4), D = m([8, 0]), Fp = m([5.5, -10]), E = S.at(D, Fp, 0.4);
    g += S.seg(S.at(A, C, -0.12), S.at(A, C, 1.1)) + S.seg(S.at(D, Fp, -0.12), S.at(D, Fp, 1.1));
    g += S.text('A', A, -10, -12) + S.text('B', B, -12, -10) + S.text('C', C, -12, -10) + S.text('D', D, 10, -12) + S.text('E', E, 12, -10) + S.text('F', Fp, 12, -10);
    out.b09 = S.wrap(230, 200, g);
  }
  // e04：AD∶DB=3∶2，DE∥BC，EF∥AB，BC=15（AB=10、AC=12 只用来画图）
  {
    const m = S.map(14, 22, 150), B = m([0, 0]), C = m([15, 0]), A = m(S.apex(15, 12, 10));
    const D = S.at(A, B, 0.6), E = S.at(A, C, 0.6), Fp = S.at(B, C, 0.6);
    out.e04 = S.wrap(260, 175, S.poly([A, B, C]) + S.seg(D, E) + S.seg(E, Fp) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('D', D, -11, -2) + S.text('E', E, 11, -2) + S.text('F', Fp, 0, 14));
  }
  // e05：BD∶DC=2∶3，E 是 AD 中点，BE 交 AC 于 F
  {
    const m = S.map(22, 25, 185), B = m([0, 0]), C = m([10, 0]), A = m([3, 7.2]), D = S.at(B, C, 0.4), E = S.mid(A, D), Fp = S.meet(B, E, A, C);
    out.e05 = S.wrap(270, 215, S.poly([A, B, C]) + S.seg(A, D) + S.seg(B, Fp) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('D', D, 0, 14) + S.text('E', E, -11, -4) + S.text('F', Fp, 11, -4));
  }
  // e06：□ABCD，AB=6，AD=9，∠B=60°（只用来画图），E 在 AD 上（示意位置 AE=3.5），直线 CE 交 BA 延长线于 F
  {
    const m = S.map(17, 20, 190), B = m([0, 0]), C = m([9, 0]), A = m([3, 3 * Math.sqrt(3)]), D = m([12, 3 * Math.sqrt(3)]);
    const E = S.at(A, D, 3.5 / 9), Fp = S.meet(C, E, B, A);
    out.e06 = S.wrap(260, 205, S.poly([A, B, C, D]) + S.seg(A, Fp) + S.seg(C, Fp) + S.text('A', A, -12, -2) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('D', D, 12, -2) + S.text('E', E, 4, -16) + S.text('F', Fp, 0, -14));
  }
  // c01：D 是 BC 中点，P 在 AD 上（示意 AP:PD=3:2），过 P 的直线交 AB、AC 于 M、N（示意 t=0.75）
  {
    const m = S.map(18, 20, 185), B = m([0, 0]), C = m([12, 0]), A = m([4, 9]), D = S.mid(B, C), P = S.at(A, D, 0.6), M = S.at(A, B, 0.75), N = S.meet(M, P, A, C);
    out.c01 = S.wrap(260, 210, S.poly([A, B, C]) + S.seg(A, D, true) + S.seg(M, N) + S.dot(P) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('D', D, 0, 14) + S.text('M', M, -12, -2) + S.text('N', N, 12, -4) + S.text('P', P, -11, 6));
  }
  // c02：y=−½x²+x+4，P 在直线 BC 上方（示意 m=2.8），AP 交 BC 于 D
  {
    const f = x => -0.5 * x * x + x + 4, k = 30, m = S.map(k, 100, 175);
    const pts = [];
    for (let x = -2.5; x <= 4.5001; x += 0.05) pts.push(m([x, f(x)]));
    const ah = p => `<polygon points="${p[0]},${p[1]} ${p[0] - 8},${p[1] - 4} ${p[0] - 8},${p[1] + 4}" fill="#2b2b2b"/>`;
    const av = p => `<polygon points="${p[0]},${p[1]} ${p[0] - 4},${p[1] + 8} ${p[0] + 4},${p[1] + 8}" fill="#2b2b2b"/>`;
    const xe = m([5.4, 0]), ye = m([0, 5.3]);
    let g = S.seg(m([-3, 0]), xe, false, 1.2) + ah(xe) + S.seg(m([0, -1.2]), ye, false, 1.2) + av(ye)
      + S.text('<tspan font-style="italic">x</tspan>', xe, -2, 12, 14) + S.text('<tspan font-style="italic">y</tspan>', ye, 12, 2, 14) + S.text('O', m([0, 0]), -10, 10, 14);
    const A = m([-2, 0]), B = m([4, 0]), C = m([0, 4]), P = m([2.8, f(2.8)]), D = S.meet(A, P, B, C);
    g += S.curve(pts) + S.seg(B, C) + S.seg(A, P) + [A, B, C, P, D].map(S.dot).join('');
    g += S.text('A', A, -8, 12) + S.text('B', B, 8, 12) + S.text('C', C, -12, -10) + S.text('P', P, 10, -12) + S.text('D', D, -4, 14);
    out.c02 = S.wrap(280, 225, g);
  }
  // c03：示意图（按 OA₂/OA₁=1/0.7 往外画，不按题中比例）
  {
    const m = S.map(25, 15, 170), O = m([0, 0]), th = (35 * Math.PI) / 180, kk = 0.7;
    const oa = [10 * kk ** 4, 10 * kk ** 3, 10 * kk ** 2, 10 * kk, 10], ob = [2, 2 / kk, 2 / kk ** 2, 2 / kk ** 3];
    const A = oa.map(r => m([r, 0])), Bp = ob.map(r => m([r * Math.cos(th), r * Math.sin(th)]));
    let g = S.seg(O, m([11.2, 0])) + S.seg(O, m([9.4 * Math.cos(th), 9.4 * Math.sin(th)]));
    for (let i = 0; i < 4; i++) g += S.seg(A[i], Bp[i]) + S.seg(Bp[i], A[i + 1]);
    g += S.text('O', O, -8, 6) + S.text('X', m([11.2, 0]), 8, 10) + S.text('Y', m([9.4 * Math.cos(th), 9.4 * Math.sin(th)]), 6, -12);
    A.forEach((P, i) => { g += S.text(`A<tspan font-size="11" dy="4">${i + 1}</tspan>`, P, 0, 14, 14); });
    Bp.forEach((P, i) => { g += S.text(`B<tspan font-size="11" dy="4">${i + 1}</tspan>`, P, -10, -12, 14); });
    out.c03 = S.wrap(310, 200, g);
  }
  // c04：示意图按 ∠B、∠C 都是锐角画：高 12，AB=13，CD=15（示意 a=6），PQ∥BC
  {
    const a = 6, m = S.map(10, 18, 150), B = m([0, 0]), C = m([a + 14, 0]), A = m([5, 12]), D = m([5 + a, 12]);
    const P = S.at(A, B, 0.55), Q = S.at(D, C, 0.55);
    out.c04 = S.wrap(240, 175, S.poly([A, B, C, D]) + S.seg(P, Q) + S.text('A', A, -6, -14) + S.text('D', D, 6, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('P', P, -12, -2) + S.text('Q', Q, 12, -2));
  }
  // c05：矩形 ABCD，示意 m=4.5，两个点 P₁、P₂
  {
    const mm = 4.5, xs = roots281(1, -10, mm * mm), m = S.map(24, 20, 140);
    const A = m([0, mm]), B = m([0, 0]), C = m([10, 0]), D = m([10, mm]);
    const P1 = m([xs[0], 0]), P2 = m([xs[1], 0]), O1 = S.meet(A, P1, B, D), O2 = S.meet(A, P2, B, D);
    out.c05 = S.wrap(280, 170, S.poly([A, B, C, D]) + S.seg(B, D) + S.seg(A, P1) + S.seg(A, P2)
      + S.text('A', A, -10, -10) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 10, -10)
      + S.text('P<tspan font-size="11" dy="4">1</tspan>', P1, 0, 14, 14) + S.text('P<tspan font-size="11" dy="4">2</tspan>', P2, 0, 14, 14)
      + S.text('O<tspan font-size="11" dy="4">1</tspan>', O1, 4, -18, 14) + S.text('O<tspan font-size="11" dy="4">2</tspan>', O2, 4, -16, 14));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/28.1',
  title: '成比例的线段',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），先审挑战题提纲两轮再写全文，全文子代理盲解复核两轮，答案全部一致。提纲阶段打回：铅垂线求 PD/AD 最大值是流传模板、36° 黄金三角形是阅读材料经典题、平行截线同时平分面积和周长是老题型、比例中项三问各自独立；黄金分割从 5 处减到 3 处。全文第一轮打回：c01 过重心截线 4/9～1/2 是流传结论（改为中线上一般点 AP:PD=k、N 位置分类、四边形 BMNC 面积范围）；c03 连比太平直（改为 5 个点、不给内外顺序）；c04 去掉锐角前提分四种情形；b01、b05 与卡片例子是换数版，b02(1) 改反求，b06 第①项改为按给出顺序不成比例。本节还没学相似，解析中平行线段之比一律用平行四边形、全等、同高面积比转化。' },
  intro: [
    {
      title: '线段的比与比例中项',
      body: '研究图形“放大缩小”要比较线段长短，先学线段的比：两条线段长度的比，叫作这两条线段的比，两条线段要用同一长度单位量，比值总是正数。四条线段 $a$、$b$、$c$、$d$ 中若 $a:b=c:d$，就说它们成比例；若 $a:b=b:c$，$b$ 叫作 $a$、$c$ 的比例中项。',
      example: '$AB=0.8$ 米，$CD=60$ 厘米：先统一成 $80$ 厘米和 $60$ 厘米，$AB:CD=4:3$。线段 $2$ 和 $8$ 的比例中项 $b$ 满足 $b^2=16$，$b=4$。',
      pitfall: '“成比例”是按给出的顺序说的：$a$、$b$、$c$、$d$ 成比例指 $a:b=c:d$，换了顺序要重新检验。',
    },
    {
      title: '比例的性质',
      body: '如果 $\\frac ab=\\frac cd$（分母都不为零），那么：(1) $ad=bc$；(2) $\\frac{a+b}b=\\frac{c+d}d$；(3) $\\frac{a-b}b=\\frac{c-d}d$；(4) 若 $\\frac ab=\\frac cd=k$，则 $\\frac{a+c}{b+d}=k$（$b+d\\ne0$），多个比相等时也一样。理由都是设 $a=bk$、$c=dk$ 后代入。',
      example: '$\\frac xy=\\frac34$：由 (2) 得 $\\frac{x+y}y=\\frac74$，由 (3) 得 $\\frac{x-y}y=-\\frac14$。',
      pitfall: '用性质 (4) 前要确认新分母不为零；分子、分母要按同样的系数组合。',
    },
    {
      title: '黄金分割',
      body: '点 $P$ 把线段 $AB$ 分成两段，较长一段 $AP$ 是较短一段 $PB$ 和整条线段 $AB$ 的比例中项，叫作黄金分割，$P$ 叫黄金分割点。设 $AB=1$、$AP=x$，由 $x^2=1-x$ 解得 $\\frac{AP}{AB}=\\frac{\\sqrt5-1}2\\approx0.618$，这个数叫黄金数。',
      example: '$AB=4$，$AP>PB$：$AP=\\frac{\\sqrt5-1}2\\times4=2\\sqrt5-2$，$PB=4-AP=6-2\\sqrt5$。',
      pitfall: '黄金数是“较长段 ∶ 全长”。较短段 ∶ 全长 $=1-\\frac{\\sqrt5-1}2=\\frac{3-\\sqrt5}2$。',
    },
    {
      title: '平行线分线段成比例定理 1',
      body: '平行于三角形一边的直线截其他两边（或两边的延长线），截得的对应线段成比例。如 $DE\\parallel BC$，$D$、$E$ 在 $AB$、$AC$ 上时 $\\frac{AD}{DB}=\\frac{AE}{EC}$，由比例的性质还有 $\\frac{AD}{AB}=\\frac{AE}{AC}$ 等。课本用“同底等高的三角形面积相等”证明它。',
      example: '$DE\\parallel BC$，$AD=3$，$DB=2$，$AE=4.5$：$\\frac{EC}{4.5}=\\frac23$，$EC=3$。',
      pitfall: '定理说的是两边上的线段对应成比例，不是 $\\frac{DE}{BC}$；求平行线段本身的长，要另外作平行线转成平行四边形。',
    },
    {
      title: '定理 2 和作第四比例项',
      body: '两条直线被三条平行线所截，截得的对应线段成比例。用它可以作第四比例项：在一条射线 $OM$ 上顺次截 $OA=a$、$AB=b$，在射线 $ON$ 上截 $OC=c$，连接 $AC$，过 $B$ 作 $AC$ 的平行线交 $ON$ 于 $D$，则 $CD$ 满足 $a:b=c:CD$。',
      example: '$l_1\\parallel l_2\\parallel l_3$ 截一条直线得 $2$ 和 $5$，截另一条直线得 $3$ 和 $EF$：$\\frac25=\\frac3{EF}$，$EF=7.5$。',
      pitfall: '在一条直线上截得的两段相等，另一条直线上截得的两段也相等，可以用来等分线段。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '28.1-b01',
      level: 'basic',
      type: 'fill',
      stem: '已知线段 $AB$、$CD$ 满足 $AB:CD=3:5$，$CD=1.2$ 米。(1) 线段 $AB$ 的长是多少厘米？(2) 若线段 $EF=48$ 厘米，求线段 $EF$ 与 $AB$ 的比值。',
      blanks: [
        { kind: 'num', label: '(1) $AB=$（厘米）', answer: '72' },
        { kind: 'num', label: '(2) 比值是', answer: '2/3' },
      ],
      explain: [
        '(1) $AB=\\frac35CD=\\frac35\\times1.2=0.72$ 米 $=72$ 厘米。坑：算出 $0.72$ 就直接填，忘了题目问的是厘米。',
        '(2) 单位统一成厘米：$\\frac{EF}{AB}=\\frac{48}{72}=\\frac23$。',
        '坑：“比值”是一个数，要写 $\\frac23$；还要分清顺序，是 $EF$ 比 $AB$，不是 $AB$ 比 $EF$（$\\frac32$）。',
      ],
      verify: () => { const ab = F(3).div(F(5)).mul(F(120)); return [ab, F(48).div(ab)]; },
    },
    {
      id: '28.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '(1) 线段 $b=6$ 厘米是线段 $a$、$c$ 的比例中项，$a=4$ 厘米，求线段 $c$；(2) 求数 $3$ 与 $12$ 的比例中项。',
      blanks: [
        { kind: 'num', label: '(1) $c=$（厘米）', answer: '9' },
        { kind: 'nums', label: '(2)（全部填出，用逗号隔开）', answer: ['6', '-6'] },
      ],
      explain: [
        '(1) $b$ 是 $a$、$c$ 的比例中项，即 $a:b=b:c$，$b^2=ac$，$36=4c$，$c=9$ 厘米。坑：把比例中项当成平均数，由 $\\frac{4+c}2=6$ 算成 $c=8$。',
        '(2) 设比例中项为 $x$，$3:x=x:12$，$x^2=36$。两个数的比例中项没有“正数”的限制，$x=6$ 或 $-6$。坑：照线段的情形只写 $6$。',
      ],
      verify: () => { const c = F(36).div(F(4)), s = Math.sqrt(3 * 12); return [c, [s, -s]]; },
    },
    {
      id: '28.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\frac xy=\\frac25$，求 $\\frac{x-y}y$ 和 $\\frac{x+y}x$ 的值。',
      blanks: [
        { kind: 'num', label: '$\\frac{x-y}y=$', answer: '-3/5' },
        { kind: 'num', label: '$\\frac{x+y}x=$', answer: '7/2' },
      ],
      explain: [
        '设 $x=2t$，$y=5t$（$t\\ne0$）。',
        '$\\frac{x-y}y=\\frac{2t-5t}{5t}=-\\frac35$。坑：算成 $\\frac35$，忘了 $x<y$ 时差是负的。',
        '$\\frac{x+y}x=\\frac{7t}{2t}=\\frac72$。坑：分母是 $x$ 不是 $y$，误写成 $\\frac75$。',
      ],
      verify: () => { const x = F(2), y = F(5); return [x.sub(y).div(y), x.add(y).div(x)]; },
    },
    {
      id: '28.1-b04',
      level: 'basic',
      type: 'choice',
      stem: '已知 $\\frac ab=\\frac cd=\\frac ef=\\frac34$，且下列各式的分母都不为零，那么一定等于 $\\frac34$ 的是（　　）',
      options: ['$\\dfrac{a+c+e}{b+d}$', '$\\dfrac{2a-c+5e}{2b-d+5f}$', '$\\dfrac{2a+c}{b+2d}$', '$\\dfrac{a-c}{b+d}$'],
      answer: 1,
      explain: [
        '设 $a=\\frac34b$，$c=\\frac34d$，$e=\\frac34f$。',
        'B：$2a-c+5e=\\frac34(2b-d+5f)$，所以比值是 $\\frac34$。',
        'A 分母少了 $f$；C 的分子、分母系数没有对应；D 分子是减、分母是加，符号没有对应。它们都不一定等于 $\\frac34$。选 B。',
      ],
      verify: () => {
        const opts = [
          (a, b, c, d, e, f) => a.add(c).add(e).div(b.add(d)),
          (a, b, c, d, e, f) => a.mul(2).sub(c).add(e.mul(5)).div(b.mul(2).sub(d).add(f.mul(5))),
          (a, b, c, d, e, f) => a.mul(2).add(c).div(b.add(d.mul(2))),
          (a, b, c, d, e, f) => a.sub(c).div(b.add(d)),
        ];
        const k = F(3).div(F(4)), samples = [[8, 4, 12], [4, 20, 8], [12, 4, 16]];
        const good = opts.map(g => samples.every(([b, d, f]) => g(k.mul(b), F(b), k.mul(d), F(d), k.mul(f), F(f)).eq(k)));
        return good.indexOf(true) === good.lastIndexOf(true) ? good.indexOf(true) : -1;
      },
    },
    {
      id: '28.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '点 $P$ 是线段 $AB$ 的黄金分割点，$AP<PB$，且 $AP=2$，求 $AB$ 的长。（结果化成最简形式）',
      blanks: [{ kind: 'real', label: '$AB=$', answer: '3+√5', simplest: true }],
      explain: [
        '$AP<PB$，所以 $AP$ 是较短的一段：$\\frac{AP}{AB}=1-\\frac{\\sqrt5-1}2=\\frac{3-\\sqrt5}2$。',
        '$AB=2\\div\\frac{3-\\sqrt5}2=\\frac4{3-\\sqrt5}=\\frac{4(3+\\sqrt5)}{(3-\\sqrt5)(3+\\sqrt5)}=3+\\sqrt5$。',
        '也可以设 $AB=y$，由 $PB^2=AP\\cdot AB$ 得 $(y-2)^2=2y$，$y^2-6y+4=0$，$y=3\\pm\\sqrt5$；$AB>AP=2$，取 $3+\\sqrt5$。',
        '坑：把 $AP$ 当成较长段，算成 $AB=\\frac2{\\frac{\\sqrt5-1}2}=\\sqrt5+1$；或分母没有有理化。',
      ],
      verify: () => bisect281(y => (y - 2) * (y - 2) - 2 * y, 2.5, 10),
    },
    {
      id: '28.1-b06',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的有（　　）<br>① 长度依次为 $2$、$3$、$\\sqrt2$、$3\\sqrt2$ 的四条线段 $a$、$b$、$c$、$d$ 成比例；② 两条线段的比值可能是负数；③ 一条线段的黄金分割点只有一个；④ 若 $a:b=c:d$，则 $a:c=b:d$；⑤ 按课本作法作线段 $x$ 使 $a:b=c:x$（$OA=a$，$AB=b$，$OC=c$，$BD\\parallel AC$），所求的线段是 $OD$。',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 0,
      explain: [
        '① “$a$、$b$、$c$、$d$ 成比例”指 $a:b=c:d$，即 $ad=bc$：$ad=2\\times3\\sqrt2=6\\sqrt2$，$bc=3\\sqrt2$，不相等，错误。坑：先从小到大排成 $\\sqrt2$、$2$、$3$、$3\\sqrt2$，看到 $\\sqrt2:2=3:3\\sqrt2$ 就说成比例——那是换了顺序以后的结论。',
        '② 线段长都是正数，比值一定是正数，错误。③ 在线段两侧各有一个，共两个黄金分割点，错误。',
        '④ 由 $a:b=c:d$ 得 $ad=bc$，两边同除以 $cd$ 得 $\\frac ac=\\frac bd$，正确。',
        '⑤ 由定理 1 得 $\\frac{OA}{AB}=\\frac{OC}{CD}$，所求的是 $CD$，不是 $OD$，错误。正确的只有 ④，共 1 个，选 A。',
      ],
      verify: () => {
        const L = [2, 3, Math.sqrt(2), 3 * Math.sqrt(2)], so = [...L].sort((p, q) => p - q);
        const s1 = near281(L[0] * L[3], L[1] * L[2]);
        if (!near281(so[0] * so[3], so[1] * so[2])) return 99;  // 换顺序后要能成比例，坑才成立
        const s2 = 3 / 5 < 0;
        const s3 = roots281(1, 1, -1).filter(x => x > 0 && x < 1).map(x => [x, 1 - x]).flat().length === 1;
        const [a, b, c, d] = [2, 5, 4, 10], s4 = near281(a / c, b / d);
        const OD = (c * (a + b)) / a, CD = OD - c, s5 = near281(a / b, c / OD);
        return [s1, s2, s3, s4, s5].filter(Boolean).length - 1 + (near281(a / b, c / CD) ? 0 : 99);
      },
    },
    {
      id: '28.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$DE\\parallel BC$，$DE$ 与边 $AB$、$AC$ 分别交于点 $D$、$E$，$AD=4$，$DB=6$，$AC=12$，求 $AE$ 的长。',
      figure: FIG281.b07,
      blanks: [{ kind: 'num', label: '$AE=$', answer: '24/5' }],
      explain: [
        '$DE\\parallel BC$，由定理 1 和比例的性质得 $\\frac{AD}{AB}=\\frac{AE}{AC}$。',
        '$AB=4+6=10$，$\\frac4{10}=\\frac{AE}{12}$，$AE=\\frac{24}5$。',
        '坑：用 $\\frac{AD}{DB}=\\frac{AE}{AC}$ 算出 $AE=8$——$AD$、$DB$ 是“部分比部分”，对应的应该是 $AE$、$EC$。',
      ],
      verify: () => F(4).div(F(4 + 6)).mul(12),
    },
    {
      id: '28.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，点 $D$、$E$ 分别在 $\\triangle ABC$ 的边 $BA$、$CA$ 的延长线上，$DE\\parallel BC$，$AD=4$，$AB=10$，$CE=21$，求 $AE$ 的长。',
      figure: FIG281.b08,
      blanks: [{ kind: 'num', label: '$AE=$', answer: '6' }],
      explain: [
        '截线与两边的延长线相交，定理 1 仍然成立：$\\frac{AD}{AB}=\\frac{AE}{AC}=\\frac4{10}$。',
        '$E$、$C$ 在点 $A$ 两侧，$CE=AE+AC=21$。设 $AE=2t$，$AC=5t$，$7t=21$，$t=3$，$AE=6$。',
        '坑：把 $CE$ 当成 $AC$，算出 $AE=8.4$。',
      ],
      verify: () => F(21).mul(F(4)).div(F(4 + 10)),
    },
    {
      id: '28.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，$l_1\\parallel l_2\\parallel l_3$，直线 $AC$ 与它们依次交于 $A$、$B$、$C$，直线 $DF$ 与它们依次交于 $D$、$E$、$F$。已知 $AB=4$，$AC=10$，$EF=9$，求 $DE$ 和 $DF$ 的长。',
      figure: FIG281.b09,
      blanks: [
        { kind: 'num', label: '$DE=$', answer: '6' },
        { kind: 'num', label: '$DF=$', answer: '15' },
      ],
      explain: [
        '$BC=AC-AB=6$。由定理 2，$\\frac{AB}{BC}=\\frac{DE}{EF}$，即 $\\frac46=\\frac{DE}9$，$DE=6$。',
        '$DF=DE+EF=15$。',
        '坑：直接用 $\\frac{AB}{AC}=\\frac{DE}{EF}$（整段和部分配错），得 $DE=3.6$。',
      ],
      verify: () => { const de = F(4).div(F(10 - 4)).mul(9); return [de, de.add(9)]; },
    },
    // ---------- 扩展 ----------
    {
      id: '28.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\frac{b+c}a=\\frac{c+a}b=\\frac{a+b}c=k$（$abc\\ne0$），求 $k$ 的值，以及 $\\frac{(a+b)(b+c)(c+a)}{abc}$ 的值。（每空全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '$k=$', answer: ['2', '-1'] },
        { kind: 'nums', label: '$\\frac{(a+b)(b+c)(c+a)}{abc}=$', answer: ['8', '-1'] },
      ],
      explain: [
        '情况一：$a+b+c\\ne0$。三个比的分子相加、分母相加（比例性质 (4) 的推广）：$k=\\frac{2(a+b+c)}{a+b+c}=2$。',
        '情况二：$a+b+c=0$。这时不能用上面的方法（新分母为 $0$）；$b+c=-a$，所以 $k=\\frac{-a}a=-1$。例如 $a=1$，$b=2$，$c=-3$。',
        '$\\frac{(a+b)(b+c)(c+a)}{abc}=\\frac{b+c}a\\cdot\\frac{c+a}b\\cdot\\frac{a+b}c=k^3$，等于 $8$ 或 $-1$。',
        '坑：只得到 $k=2$，漏了 $a+b+c=0$ 的情况。',
      ],
      verify: () => {
        const ks = [[1, 1, 1], [1, 2, -3]].map(([a, b, c]) => {
          const [A, B, C] = [F(a), F(b), F(c)], k = B.add(C).div(A);
          return C.add(A).div(B).eq(k) && A.add(B).div(C).eq(k) ? k : null;
        });
        const vals = [[1, 1, 1], [1, 2, -3]].map(([a, b, c]) => F(a + b).mul(b + c).mul(c + a).div(F(a * b * c)));
        return [ks, vals];
      },
    },
    {
      id: '28.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '点 $P$、$Q$ 是线段 $AB$ 的两个黄金分割点，$PQ=2$，求 $AB$ 的长。（结果化成最简形式）',
      blanks: [{ kind: 'real', label: '$AB=$', answer: '4+2√5', simplest: true }],
      explain: [
        '设 $AB=l$，两个黄金分割点分别靠近 $B$ 和 $A$：$AP=BQ=\\frac{\\sqrt5-1}2l$（较长段）。',
        '两段较长线段重叠的部分就是 $PQ$：$PQ=AP+BQ-AB=(\\sqrt5-1)l-l=(\\sqrt5-2)l$。',
        '$(\\sqrt5-2)l=2$，$l=\\frac2{\\sqrt5-2}=\\frac{2(\\sqrt5+2)}{(\\sqrt5-2)(\\sqrt5+2)}=4+2\\sqrt5$。',
        '坑：以为 $PQ$ 等于较短段，或者分母没有有理化。',
      ],
      verify: () => { const g = (Math.sqrt(5) - 1) / 2; return 2 / (2 * g - 1); },
    },
    {
      id: '28.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '在平面直角坐标系中，$A(0,4)$，$B(6,0)$，点 $P$ 在直线 $AB$ 上，且 $PA=2PB$。求点 $P$ 的坐标。',
      blanks: [
        { kind: 'num', label: '(1) $P$ 在线段 $AB$ 上时，横坐标', answer: '4' },
        { kind: 'num', label: '纵坐标', answer: '4/3' },
        { kind: 'num', label: '(2) $P$ 不在线段 $AB$ 上时，横坐标', answer: '12' },
        { kind: 'num', label: '纵坐标', answer: '-4' },
      ],
      explain: [
        '思路：过 $P$ 作两坐标轴的垂线，垂线分别和另一条坐标轴平行，用定理 1 把 $PA:PB$ 搬到坐标轴上。',
        '(1) $P$ 在线段 $AB$ 上，$BP:BA=1:3$。作 $PM\\perp x$ 轴于 $M$，$PM\\parallel OA$，$\\frac{BM}{BO}=\\frac{BP}{BA}=\\frac13$，$BM=2$，$M(4,0)$；作 $PN\\perp y$ 轴于 $N$，$PN\\parallel OB$，$\\frac{AN}{AO}=\\frac{AP}{AB}=\\frac23$，$AN=\\frac83$，$ON=\\frac43$。$P(4,\\frac43)$。',
        '(2) $P$ 不在线段上：若在 $A$ 的外侧，$PA<PB$，不行；所以在 $B$ 的外侧，$PA=2PB$ 说明 $AB=PB$。作 $PM\\perp x$ 轴，$OA\\parallel MP$，延长线情形 $\\frac{BM}{BO}=\\frac{BP}{BA}=1$，$BM=6$，$M(12,0)$；作 $PN\\perp y$ 轴，$\\frac{AO}{AN}=\\frac{AB}{AP}=\\frac12$，$AN=8$，$N$ 在原点下方 $4$ 处。$P(12,-4)$。',
        '坑：只求出线段上的一个点。也可以用直线 $AB$：$y=-\\frac23x+4$ 检验两点都在直线上。',
      ],
      verify: () => {
        const A = [F(0), F(4)], B = [F(6), F(0)];
        const pt = t => [A[0].add(B[0].sub(A[0]).mul(t)), A[1].add(B[1].sub(A[1]).mul(t))];
        const p1 = pt(F(2).div(F(3))), p2 = pt(F(2));
        return [p1[0], p1[1], p2[0], p2[1]];
      },
    },
    {
      id: '28.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，点 $D$ 在边 $AB$ 上，$AD:DB=3:2$，$DE\\parallel BC$ 交 $AC$ 于点 $E$，$EF\\parallel AB$ 交 $BC$ 于点 $F$，$BC=15$。求 $DE$ 的长，以及 $S_{\\triangle ADE}:S_{\\text{四边形}DBFE}$。',
      figure: FIG281.e04,
      blanks: [
        { kind: 'num', label: '$DE=$', answer: '9' },
        { kind: 'ratio', label: '$S_{\\triangle ADE}:S_{\\text{四边形}DBFE}=$', answer: '3:4' },
      ],
      explain: [
        '$DE\\parallel BC$：$\\frac{AE}{AC}=\\frac{AD}{AB}=\\frac35$。$EF\\parallel AB$：$\\frac{BF}{BC}=\\frac{AE}{AC}=\\frac35$，$BF=9$。',
        '四边形 $DBFE$ 两组对边分别平行，是平行四边形，$DE=BF=9$。（本节还不能直接说“$DE:BC=3:5$”，要这样转一下。）',
        '面积：设 $S_{\\triangle ABC}=S$。$\\triangle ADE$ 与 $\\triangle ABE$ 同高，$S_{\\triangle ADE}=\\frac35S_{\\triangle ABE}$；$\\triangle ABE$ 与 $\\triangle ABC$ 同高，$S_{\\triangle ABE}=\\frac35S$。所以 $S_{\\triangle ADE}=\\frac9{25}S$。',
        '同理 $\\frac{CF}{CB}=\\frac{CE}{CA}=\\frac25$，$S_{\\triangle EFC}=\\frac25\\cdot\\frac25S=\\frac4{25}S$。平行四边形面积 $S-\\frac9{25}S-\\frac4{25}S=\\frac{12}{25}S$。',
        '$S_{\\triangle ADE}:S_{DBFE}=9:12=3:4$。坑：以为面积比等于 $3:2$。',
      ],
      verify: () => {
        const B = [0, 0], C = [15, 0], A = SVG281.apex(15, 12, 10), S = SVG281;
        const D = S.at(A, B, 0.6), E = S.meet(D, [D[0] + 1, D[1]], A, C), Fp = S.meet(E, [E[0] + B[0] - A[0], E[1] + B[1] - A[1]], B, C);
        const r = Q281(S.area([A, D, E]) / S.area([D, B, Fp, E]));
        return [Q281(S.dist(D, E)), [r.n, r.d]];
      },
    },
    {
      id: '28.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，点 $D$ 在边 $BC$ 上，$BD:DC=2:3$，$E$ 是 $AD$ 的中点，$BE$ 的延长线交 $AC$ 于点 $F$。求 $AF:FC$ 和 $BE:EF$。',
      figure: FIG281.e05,
      blanks: [
        { kind: 'ratio', label: '$AF:FC=$', answer: '2:5' },
        { kind: 'ratio', label: '$BE:EF=$', answer: '7:3' },
      ],
      explain: [
        '思路：已知的比在 $BC$ 上，要求的比在 $AC$、$BF$ 上，过 $D$ 作平行线把比“搬”过去。',
        '求 $AF:FC$：过 $D$ 作 $DG\\parallel BF$ 交 $AC$ 于 $G$。在 $\\triangle CBF$ 中 $\\frac{CG}{GF}=\\frac{CD}{DB}=\\frac32$；在 $\\triangle ADG$ 中 $E$ 是 $AD$ 中点、$EF\\parallel DG$，所以 $AF=FG$。设 $AF=FG=2t$，则 $GC=3t$，$AF:FC=2t:5t=2:5$。',
        '求 $BE:EF$：过 $D$ 作 $DH\\parallel AC$ 交 $BF$ 于 $H$。$\\triangle AEF\\cong\\triangle DEH$（$AE=DE$，对顶角，内错角），$EF=EH$。在 $\\triangle BCF$ 中 $\\frac{BH}{BF}=\\frac{BD}{BC}=\\frac25$。',
        '设 $BF=10s$，则 $BH=4s$，$HF=6s$，$EF=EH=3s$，$BE=7s$，$BE:EF=7:3$。',
        '坑：以为 $E$ 是中点，$F$ 就把 $AC$ 分成 $1:1$ 或 $2:3$。',
      ],
      verify: () => {
        const S = SVG281, B = [0, 0], C = [10, 0], A = [3, 7.2], D = S.at(B, C, 0.4), E = S.mid(A, D), Fp = S.meet(B, E, A, C);
        const r1 = Q281(S.dist(A, Fp) / S.dist(Fp, C)), r2 = Q281(S.dist(B, E) / S.dist(E, Fp));
        return [[r1.n, r1.d], [r2.n, r2.d]];
      },
    },
    {
      id: '28.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\square ABCD$ 中，$AB=6$，$AD=9$，点 $E$ 在边 $AD$ 上（不与 $A$、$D$ 重合），直线 $CE$ 交 $BA$ 的延长线于点 $F$。设 $AE=x$，$AF=y$。(1) 求 $y$ 关于 $x$ 的函数解析式，并写出定义域；(2) 若 $AF=2ED$，求 $x$ 的值。',
      figure: FIG281.e06,
      blanks: [
        { kind: 'expr', label: '(1) $y=$', answer: '6x/(9-x)' },
        { kind: 'ineq', var: 'x', label: '定义域', answer: '0<x<9' },
        { kind: 'real', label: '(2) $x=$', answer: '(21-3√13)/2', simplest: true },
      ],
      explain: [
        '(1) $AE\\parallel BC$，在 $\\triangle FBC$ 中由定理 1：$\\frac{FA}{AB}=\\frac{FE}{EC}$。',
        '再看以 $E$ 为交点的两条直线 $AD$、$FC$，$FA\\parallel CD$，由定理 1 的延长线情形：$\\frac{FE}{EC}=\\frac{AE}{ED}$。',
        '所以 $\\frac y6=\\frac x{9-x}$，$y=\\frac{6x}{9-x}$，定义域 $0<x<9$。坑：想直接写 $\\frac{AF}{BF}=\\frac{AE}{BC}$——那是平行线段之比，本节还不能直接用。',
        '(2) $ED=9-x$，$\\frac{6x}{9-x}=2(9-x)$，$3x=(9-x)^2$，$x^2-21x+81=0$，$x=\\frac{21\\pm3\\sqrt{13}}2$。',
        '$\\frac{21+3\\sqrt{13}}2\\approx15.9>9$，舍去；$x=\\frac{21-3\\sqrt{13}}2\\approx5.09$。坑：两个根都保留。',
      ],
      verify: () => {
        const S = SVG281, B = [0, 0], C = [9, 0], A = [3, 3 * Math.sqrt(3)];
        const AF = x => { const E = [A[0] + x, A[1]], Fp = S.meet(C, E, B, A); return S.dist(A, Fp); };
        const ok = [1, 2.5, 7].every(x => near281(AF(x), (6 * x) / (9 - x)));
        const x = bisect281(t => AF(t) - 2 * (9 - t), 0.1, 8.9);
        return [ok ? '6x/(9-x)' : null, '0<x<9', x];
      },
    },
    // ---------- 挑战 ----------
    {
      id: '28.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 的面积为 $175$，$D$ 是边 $BC$ 的中点，点 $P$ 在中线 $AD$ 上，$AP:PD=k$。过点 $P$ 的直线交边 $AB$ 于点 $M$（$M$ 不与 $A$ 重合，可以与 $B$ 重合），交射线 $AC$ 于点 $N$。(1) 用 $k$ 表示 $\\frac{AB}{AM}+\\frac{AC}{AN}$；(2) 以下取 $k=\\frac32$，设 $\\frac{AM}{AB}=t$，分别写出点 $N$ 在边 $AC$ 上（可以与 $C$ 重合）和点 $N$ 在 $AC$ 的延长线上时 $t$ 的取值范围；(3) 当点 $N$ 在边 $AC$ 上时，用 $t$ 表示四边形 $BMNC$ 的面积 $S$（$M$ 与 $B$ 重合或 $N$ 与 $C$ 重合时看作三角形），并求 $S$ 的取值范围。',
      figure: FIG281.c01,
      blanks: [
        { kind: 'expr', label: '(1) $\\frac{AB}{AM}+\\frac{AC}{AN}=$', answer: '2(k+1)/k' },
        { kind: 'ineq', var: 't', label: '(2) $N$ 在边 $AC$ 上时', answer: '3/7≤t≤1' },
        { kind: 'ineq', var: 't', label: '$N$ 在 $AC$ 的延长线上时', answer: '3/10<t<3/7' },
        { kind: 'expr', label: '(3) $S=$', answer: '175-525t^2/(10t-3)' },
        { kind: 'ineq', var: 'S', label: '$S$ 的取值范围', answer: '100≤S≤112' },
      ],
      explain: [
        '思路：两个比 $\\frac{AB}{AM}$、$\\frac{AC}{AN}$ 在两条不同的边上，想办法把它们都搬到中线 $AD$ 所在的直线上，再利用 $D$ 是中点。',
        '(1) 过 $B$、$C$ 作 $MN$ 的平行线，交直线 $AD$ 于 $B\'$、$C\'$。在 $\\triangle ABB\'$ 中 $MP\\parallel BB\'$，由定理 1：$\\frac{AB}{AM}=\\frac{AB\'}{AP}$；同理 $\\frac{AC}{AN}=\\frac{AC\'}{AP}$（$MN\\parallel BC$ 时 $B\'$、$C\'$ 都和 $D$ 重合）。',
        '$BB\'\\parallel CC\'$，$BD=CD$，对顶角相等，内错角相等，$\\triangle DBB\'\\cong\\triangle DCC\'$，$DB\'=DC\'$，且 $B\'$、$C\'$ 在 $D$ 的两侧，所以 $AB\'+AC\'=(AD-DB\')+(AD+DC\')=2AD$。又 $AD=AP+PD=\\frac{k+1}k AP$，所以 $\\frac{AB}{AM}+\\frac{AC}{AN}=\\frac{2AD}{AP}=\\frac{2(k+1)}k$。',
        '(2) $k=\\frac32$ 时和为 $\\frac{10}3$。设 $\\frac{AN}{AC}=s$，$\\frac1t+\\frac1s=\\frac{10}3$，$s=\\frac{3t}{10t-3}$。$N$ 在射线 $AC$ 上要求 $s>0$，而 $0<t\\le1$，所以 $t>\\frac3{10}$（$t=\\frac3{10}$ 时 $MN\\parallel AC$，没有交点；$t<\\frac3{10}$ 时直线只交 $CA$ 的延长线）。',
        '$N$ 在边 $AC$ 上：$s\\le1$，$3t\\le10t-3$，$t\\ge\\frac37$，所以 $\\frac37\\le t\\le1$；$N$ 在 $AC$ 的延长线上：$s>1$，$\\frac3{10}<t<\\frac37$。坑：漏掉“$s>0$”这一条，把下界写成 $0$。',
        '(3) $\\triangle AMN$ 与 $\\triangle ABN$ 同高（都从 $N$ 出发），$S_{\\triangle AMN}=t\\cdot S_{\\triangle ABN}$；$\\triangle ABN$ 与 $\\triangle ABC$ 同高，$S_{\\triangle ABN}=s\\cdot175$。所以 $S_{\\triangle AMN}=175ts=\\frac{525t^2}{10t-3}$，$S=175-\\frac{525t^2}{10t-3}$（$\\frac37\\le t\\le1$）。',
        '范围：$S_{\\triangle AMN}-63=\\frac{21(5t-3)^2}{10t-3}\\ge0$，$t=\\frac35$（$MN\\parallel BC$）时取等号；$75-S_{\\triangle AMN}=\\frac{75(7t-3)(1-t)}{10t-3}\\ge0$，$t=\\frac37$ 或 $1$ 时取等号。所以 $63\\le S_{\\triangle AMN}\\le75$，$100\\le S\\le112$。',
        '坑：只算两个端点（都是 $100$）就下结论，没发现 $S$ 的最大值 $112$ 在区间内部 $t=\\frac35$ 处取到。',
      ],
      verify: () => {
        const S = SVG281, B = [0, 0], C = [12, 0], A = [4, 9], D = S.mid(B, C), tot = S.area([A, B, C]);
        const meetN = (k, t) => { const P = S.at(A, D, k / (k + 1)), M = S.at(A, B, t); return { M, N: S.meet(M, P, A, C) }; };
        const okSum = [[1.5, 0.8], [2, 0.6], [0.7, 0.9]].every(([k, t]) => { const { M, N } = meetN(k, t); return near281(S.dist(A, B) / S.dist(A, M) + S.dist(A, C) / S.dist(A, N), (2 * (k + 1)) / k); });
        // AC/AN 带符号（N 在 CA 延长线上时为负），t 从小到大单调
        const inv = t => { const { N } = meetN(1.5, t), ac = [C[0] - A[0], C[1] - A[1]]; return (ac[0] ** 2 + ac[1] ** 2) / ((N[0] - A[0]) * ac[0] + (N[1] - A[1]) * ac[1]); };
        const t0 = bisect281(inv, 0.05, 0.99), t1 = bisect281(t => inv(t) - 1, 0.05, 0.99);
        const quad = t => { const { M, N } = meetN(1.5, t); return 175 - (S.area([A, M, N]) / tot) * 175; };
        const okS = [0.5, 0.6, 0.85].every(t => near281(quad(t), 175 - (525 * t * t) / (10 * t - 3)));
        let lo = Infinity, hi = -Infinity;
        for (let i = 0; i <= 6000; i++) { const v = quad(t1 + ((1 - t1) * i) / 6000); lo = Math.min(lo, v); hi = Math.max(hi, v); }
        return [okSum ? '2(k+1)/k' : null, `${Q281(t1)}≤t≤1`, `${Q281(t0)}<t<${Q281(t1)}`, okS ? '175-525t^2/(10t-3)' : null, `${Q281(lo)}≤S≤${Q281(hi)}`];
      },
    },
    {
      id: '28.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，抛物线 $y=-\\frac12x^2+x+4$ 与 $x$ 轴交于 $A$、$B$ 两点（$A$ 在左），与 $y$ 轴交于点 $C$。点 $P$ 是直线 $BC$ 上方抛物线上的点，横坐标为 $m$，$AP$ 交 $BC$ 于点 $D$。(1) 求 $\\frac{PD}{AD}$ 的最大值及此时点 $P$ 的坐标；(2) 当 $\\frac{PD}{AD}=k$ 时，满足条件的点 $P$ 恰有两个，记为 $P_1$、$P_2$，直线 $AP_1$、$AP_2$ 分别交 $y$ 轴于 $Q_1$、$Q_2$。求证：$P_1P_2\\parallel BC$，且 $P_1P_2=\\sqrt2Q_1Q_2$；若 $Q_1Q_2=3$，求 $k$ 及 $P_1$、$P_2$ 的横坐标。',
      figure: FIG281.c02,
      blanks: [
        { kind: 'num', label: '(1) 最大值', answer: '1/3' },
        { kind: 'num', label: '此时 $P$ 的横坐标', answer: '2' },
        { kind: 'num', label: '纵坐标', answer: '4' },
        { kind: 'num', label: '(2) $k=$', answer: '7/48' },
        { kind: 'nums', label: '$P_1$、$P_2$ 的横坐标（全部填出，用逗号隔开）', answer: ['1/2', '7/2'] },
      ],
      explain: [
        '$A(-2,0)$，$B(4,0)$，$C(0,4)$，直线 $BC$：$y=-x+4$。',
        '(1) 思路：$\\frac{PD}{AD}$ 是一条斜线段上的比，转成面积比。$\\triangle PBD$ 与 $\\triangle ABD$ 同高，面积比是 $\\frac{PD}{AD}$；$\\triangle PCD$ 与 $\\triangle ACD$ 也是。由比例性质 (4)，$\\frac{PD}{AD}=\\frac{S_{\\triangle PBC}}{S_{\\triangle ABC}}$。',
        '过 $P$ 作 $y$ 轴的平行线交 $BC$ 于 $E$，$PE=(-\\frac12m^2+m+4)-(-m+4)=-\\frac12m^2+2m$。以 $PE$ 为公共底把 $\\triangle PBC$ 分成两块，高之和是 $B$、$C$ 横坐标之差 $4$，$S_{\\triangle PBC}=2PE$；$S_{\\triangle ABC}=\\frac12\\times6\\times4=12$。',
        '$\\frac{PD}{AD}=\\frac{PE}6=-\\frac1{12}(m-2)^2+\\frac13$（$0<m<4$），$m=2$ 时最大值 $\\frac13$，$P(2,4)$。',
        '(2) $\\frac{PE}6=k$，即 $m^2-4m+12k=0$。两个点都在 $0<m<4$ 内，要求 $\\Delta=16-48k>0$ 且两根积 $12k>0$，即 $0<k<\\frac13$；这时 $m_1+m_2=4$，两根都在 $(0,4)$ 内。',
        '证平行：两点对应的 $PE$ 都等于 $6k$，$P_1E_1$、$P_2E_2$ 都与 $y$ 轴平行且相等，四边形 $P_1E_1E_2P_2$ 是平行四边形，$P_1P_2\\parallel E_1E_2$，即 $P_1P_2\\parallel BC$。所以 $P_1P_2$ 与 $BC$ 一样“横走多少、竖走多少”，$P_1P_2=\\sqrt2|m_1-m_2|$（勾股定理）。',
        '求 $OQ$：过 $P$ 作 $PH\\perp x$ 轴于 $H$，过 $Q$ 作 $QK\\parallel x$ 轴交 $PH$ 于 $K$，$OHKQ$ 是矩形，$KH=OQ$。在 $\\triangle AHP$ 中 $OQ\\parallel HP$：$\\frac{AQ}{QP}=\\frac{AO}{OH}=\\frac2m$；$QK\\parallel AH$：$\\frac{PK}{KH}=\\frac{PQ}{QA}=\\frac m2$。$PH=PK+KH=\\frac{m+2}2OQ$，又 $PH=-\\frac12(m-4)(m+2)$，所以 $OQ=4-m$（也可以写出直线 $AP$ 的解析式检验）。于是 $Q_1Q_2=|m_1-m_2|$，$P_1P_2=\\sqrt2Q_1Q_2$。',
        '$Q_1Q_2^2=(m_1+m_2)^2-4m_1m_2=16-48k=9$，$k=\\frac7{48}$，在 $0<k<\\frac13$ 内。$m^2-4m+\\frac74=0$，$m=\\frac12$ 或 $\\frac72$。',
        '坑：以为 $m_1+m_2=4$ 说明两点关于对称轴对称（对称轴是 $x=1$，不是 $x=2$），两点纵坐标并不相等；忘了检验 $k$ 的范围。',
      ],
      verify: () => {
        const S = SVG281, f = x => -0.5 * x * x + x + 4, A = [-2, 0], B = [4, 0], C = [0, 4];
        const r = m => { const P = [m, f(m)], D = S.meet(A, P, B, C); return S.dist(P, D) / S.dist(A, D); };
        let best = -1, bm = 0;
        for (let i = 1; i < 4000; i++) { const m = i / 1000, v = r(m); if (v > best) { best = v; bm = m; } }
        // 找 k：两点 Q₁Q₂=3（Q 由直线 AP 与 y 轴的交点算出）
        const Qy = m => S.meet(A, [m, f(m)], [0, 0], [0, 1])[1];
        const ms = k => roots281(1, -4, 12 * k).filter(m => m > 0 && m < 4);
        const k = bisect281(kk => Math.abs(Qy(ms(kk)[0]) - Qy(ms(kk)[1])) - 3, 1e-6, 1 / 3 - 1e-6);
        const two = ms(k);
        const okk = two.every(m => near281(r(m), k));
        return [Q281(best), Q281(bm), Q281(f(bm)), okk ? Q281(k) : null, two.map(Q281)];
      },
    },
    {
      id: '28.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图（示意图），点 $A_1$、$A_2$、$A_3$、$A_4$、$A_5$ 按这个顺序排在 $\\angle XOY$ 的边 $OX$ 上（只知道排列顺序，不知道 $A_1$ 离 $O$ 最近还是最远），点 $B_1$、$B_2$、$B_3$、$B_4$ 在边 $OY$ 上，且 $A_1B_1\\parallel A_2B_2\\parallel A_3B_3\\parallel A_4B_4$，$B_1A_2\\parallel B_2A_3\\parallel B_3A_4\\parallel B_4A_5$。设 $\\frac{OA_2}{OA_1}=q$。(1) 用 $q$ 表示 $\\frac{A_1A_5}{A_2A_4}$；(2) 记 $\\frac{A_1A_5}{A_2A_4}=r$，求 $r$ 的取值范围；(3) 若 $A_1A_5=\\frac{17}4A_2A_4$，求 $q$；(4) 在 (3) 的条件下，若 $A_2A_3=24$，求 $OA_3$ 的长。',
      figure: FIG281.c03,
      blanks: [
        { kind: 'expr', label: '(1) $\\frac{A_1A_5}{A_2A_4}=$', answer: '(q^2+1)/q' },
        { kind: 'ineq', var: 'r', label: '(2)', answer: 'r>2' },
        { kind: 'nums', label: '(3) $q=$（全部填出，用逗号隔开）', answer: ['4', '1/4'] },
        { kind: 'nums', label: '(4) $OA_3=$（全部填出，用逗号隔开）', answer: ['8', '32'] },
      ],
      explain: [
        '(1) $A_1B_1\\parallel A_2B_2$，由定理 1：$\\frac{OA_2}{OA_1}=\\frac{OB_2}{OB_1}$；$B_1A_2\\parallel B_2A_3$：$\\frac{OB_2}{OB_1}=\\frac{OA_3}{OA_2}$。所以 $\\frac{OA_2}{OA_1}=\\frac{OA_3}{OA_2}$。依次往下推，$\\frac{OA_2}{OA_1}=\\frac{OA_3}{OA_2}=\\frac{OA_4}{OA_3}=\\frac{OA_5}{OA_4}=q$。',
        '设 $OA_1=a$，则 $OA_2=aq$，$OA_3=aq^2$，$OA_4=aq^3$，$OA_5=aq^4$。五个点互不重合，$q\\ne1$。$q>1$ 时点从 $O$ 往外排，$q<1$ 时往里排，两种都可能，所以长度要加绝对值：$A_1A_5=a|q^4-1|=a(q^2+1)|q^2-1|$，$A_2A_4=a|q^3-q|=aq|q^2-1|$，比值 $\\frac{q^2+1}q$。',
        '(2) $r=\\frac{q^2+1}q=q+\\frac1q$，$r-2=\\frac{(q-1)^2}q>0$（$q>0$，$q\\ne1$），所以 $r>2$；反过来任给 $r>2$，方程 $q^2-rq+1=0$ 有两个不等于 $1$ 的正根，所以 $r$ 能取遍大于 $2$ 的数。也就是说 $A_1A_5$ 总比 $A_2A_4$ 的 $2$ 倍长。',
        '(3) $q+\\frac1q=\\frac{17}4$，$4q^2-17q+4=0$，$(q-4)(4q-1)=0$，$q=4$ 或 $\\frac14$。两个都符合：$q=4$ 是从 $O$ 往外排，$q=\\frac14$ 是从外往 $O$ 排。坑：默认 $A_1$ 离 $O$ 最近，把 $q=\\frac14$ 舍掉。',
        '(4) 思路：不必求 $a$，用 $A_2A_3$ 与 $OA_3$ 的比。$A_2A_3=|aq^2-aq|=aq|q-1|$，$OA_3=aq^2$，所以 $OA_3=A_2A_3\\cdot\\frac q{|q-1|}$。',
        '$q=4$：$OA_3=24\\times\\frac43=32$（此时 $OA_1=2$）；$q=\\frac14$：$OA_3=24\\times\\frac{1/4}{3/4}=8$（此时 $OA_1=128$）。所以 $OA_3=32$ 或 $8$。',
        '坑：(1) 不加绝对值，$q<1$ 时得到负的长度；(4) 两种排列只算一种。',
      ],
      verify: () => {
        // 按作图过程逐点作平行线：给定 OA₁、OA₂，B₁ 任取在 OY 上，再交替作 A₁B₁、B₁A₂ 的平行线
        const S = SVG281, Y = [Math.cos(0.7), Math.sin(0.7)], O = [0, 0], X = [1, 0];
        const build = (a, b) => {
          const A = [[a, 0], [b, 0]], B1 = [Y[0] * 1.3 * a, Y[1] * 1.3 * a];
          const u = [B1[0] - A[0][0], B1[1] - A[0][1]], v = [A[1][0] - B1[0], A[1][1] - B1[1]];
          for (let i = 1; i <= 3; i++) {
            const Bi = S.meet(A[i], [A[i][0] + u[0], A[i][1] + u[1]], O, Y);
            A.push(S.meet(Bi, [Bi[0] + v[0], Bi[1] + v[1]], O, X));
          }
          return A.map(p => p[0]);
        };
        const r = q => { const x = build(1, q); return Math.abs(x[4] - x[0]) / Math.abs(x[3] - x[1]); };
        const okR = [4, 0.25, 1.7, 0.6].every(q => near281(r(q), (q * q + 1) / q));
        let lo = Infinity;
        for (let i = 1; i < 4000; i++) { const q = i / 400; if (Math.abs(q - 1) > 1e-9) lo = Math.min(lo, r(q)); }
        const qs = [bisect281(q => r(q) - 17 / 4, 0.02, 0.99), bisect281(q => r(q) - 17 / 4, 1.01, 50)];
        const oa3 = qs.map(q => { const x = build(1, q); return x[2] * (24 / Math.abs(x[2] - x[1])); });
        return [okR ? '(q^2+1)/q' : null, lo > 2 && lo < 2.001 ? 'r>2' : null, qs.map(Q281), oa3.map(Q281)];
      },
    },
    {
      id: '28.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图（示意图，按 $\\angle B$、$\\angle C$ 都是锐角画），梯形 $ABCD$ 中，$AD\\parallel BC$，梯形的高为 $12$，$AB=13$，$CD=15$，$AD=a$；题中没有说明 $\\angle B$、$\\angle C$ 是锐角还是钝角。点 $P$ 在腰 $AB$ 上（不与 $A$、$B$ 重合），过 $P$ 作 $PQ\\parallel BC$ 交 $CD$ 于点 $Q$，设 $AP=x$。(1) 用 $x$ 表示 $DQ$；(2) 若 $\\angle B$、$\\angle C$ 都是锐角，用 $a$、$x$ 表示 $PQ$，并写出 $x$ 的取值范围；(3) 是否存在这样的梯形，使 $PQ$ 同时平分梯形的周长和面积？若存在，求出 $a$ 的所有可能值。',
      figure: FIG281.c04,
      blanks: [
        { kind: 'expr', label: '(1) $DQ=$', answer: '15x/13' },
        { kind: 'expr', label: '(2) $PQ=$', answer: 'a+14x/13' },
        { kind: 'ineq', var: 'x', label: '$x$ 的取值范围', answer: '0<x<13' },
        { kind: 'nums', label: '(3) $a=$（全部填出，用逗号隔开；不存在填 0）', answer: ['34/7', '62/7'] },
      ],
      explain: [
        '先定 $BC$：作高 $AH$、$DK$（$H$、$K$ 在直线 $BC$ 上），$BH=\\sqrt{13^2-12^2}=5$，$CK=\\sqrt{15^2-12^2}=9$，$HK=AD=a$。$\\angle B$ 是锐角时 $H$ 在 $B$ 的 $C$ 一侧，是钝角时 $H$ 在 $CB$ 的延长线上；$\\angle C$ 同理。所以 $BC$ 有四种可能：$a+14$（都锐角）、$a-4$（$\\angle B$ 锐、$\\angle C$ 钝）、$a+4$（$\\angle B$ 钝、$\\angle C$ 锐）、$a-14$（都钝角）。统一记 $BC=a+e$，$e=14$、$-4$、$4$、$-14$。',
        '(1) $AD\\parallel PQ\\parallel BC$，由定理 2，$\\frac{DQ}{DC}=\\frac{AP}{AB}=\\frac x{13}$，$DQ=\\frac{15x}{13}$，与形状无关。',
        '(2) 设 $PQ$ 交 $AH$ 于 $R$、交 $DK$ 于 $T$，$RT=a$。$PR$ 是平行线段，不能直接按比例算；过 $P$ 作 $PS\\perp BC$ 于 $S$，$PRHS$ 是矩形，$PR=HS$。在 $\\triangle ABH$ 中 $PS\\parallel AH$，$\\frac{BS}{BH}=\\frac{BP}{BA}$，$BS=\\frac{5(13-x)}{13}$，$PR=HS=\\frac{5x}{13}$；同理 $TQ=\\frac{9x}{13}$。$PQ=a+\\frac{14x}{13}$，$0<x<13$。',
        '一般地，角是钝角的一侧，$R$（或 $T$）落在 $PQ$ 的外面，这一段要减去，所以 $PQ=a+e\\cdot\\frac x{13}$；又由定理 1，$\\frac{AR}{AH}=\\frac{AP}{AB}$，梯形 $APQD$ 的高是 $\\frac{12x}{13}$。',
        '(3) 记 $u=\\frac x{13}$（$0<u<1$）。周长：上下两部分都含 $PQ$，平分周长就是 $AP+AD+DQ=PB+BC+CQ$：$13u+a+15u=13(1-u)+(a+e)+15(1-u)$，$56u=28+e$，$a$ 被消掉。',
        '面积：$\\frac12(2a+eu)\\cdot12u=\\frac12\\times\\frac12(2a+e)\\times12$，整理得 $a(2u-1)=e(\\frac12-u^2)$。由周长条件 $2u-1=\\frac e{28}$，约去 $e$（$e\\ne0$）：$a=14(1-2u^2)$。',
        '逐一检验 $a>0$ 且 $BC>0$：$e=14$，$u=\\frac34$，$a=-\\frac74<0$，舍去；$e=-4$，$u=\\frac37$，$a=\\frac{62}7$，$BC=\\frac{34}7>0$，成立；$e=4$，$u=\\frac47$，$a=\\frac{34}7$，$BC=\\frac{62}7$，成立；$e=-14$，$u=\\frac14$，$a=\\frac{49}4$，$BC=-\\frac74<0$，舍去。所以存在，$a=\\frac{34}7$（$\\angle B$ 钝角）或 $\\frac{62}7$（$\\angle C$ 钝角）。这两个其实是同一个梯形上下翻转：一个的上底恰是另一个的下底。',
        '坑：只按示意图的“两个底角都是锐角”算，得到 $a<0$ 就说不存在；或在钝角情形忘了检验 $BC>0$。',
      ],
      verify: () => {
        const S = SVG281;
        // p、dl：A、D 相对 B、C 的水平偏移（±5、±9），BC=a+p-dl
        const shape = (a, p, dl) => { const c = a + p - dl; return { A: [p, 12], B: [0, 0], C: [c, 0], D: [c + dl, 12] }; };
        const cut = (a, p, dl, x) => {
          const { A, B, C, D } = shape(a, p, dl), P = S.at(A, B, x / 13), Q = S.meet(P, [P[0] + 1, P[1]], D, C);
          const top = S.dist(A, P) + S.dist(A, D) + S.dist(D, Q), bot = S.dist(P, B) + S.dist(B, C) + S.dist(C, Q);
          return { DQ: S.dist(D, Q), PQ: S.dist(P, Q), dp: top - bot, ds: S.area([A, P, Q, D]) - S.area([P, B, C, Q]), AB: S.dist(A, B), CD: S.dist(C, D) };
        };
        const cases = [[5, -9], [5, 9], [-5, -9], [-5, 9]];
        const okShape = cases.every(([p, dl]) => near281(cut(30, p, dl, 1).AB, 13) && near281(cut(30, p, dl, 1).CD, 15));
        const okDQ = cases.every(([p, dl]) => [3, 8].every(x => near281(cut(30, p, dl, x).DQ, (15 * x) / 13)));
        const okPQ = [[3, 5], [8, 12]].every(([a, x]) => near281(cut(a, 5, -9, x).PQ, a + (14 * x) / 13));
        const as = [];
        cases.forEach(([p, dl]) => {
          const lo = Math.max(0, dl - p) + 1e-6, hi = 300;  // 要求 a>0 且 BC>0
          const x = bisect281(t => cut(lo + 1, p, dl, t).dp, 0.01, 12.99);
          const g = s => cut(s, p, dl, x).ds;
          if (g(lo) * g(hi) < 0) as.push(Q281(bisect281(g, lo, hi)));
        });
        return [okShape && okDQ ? '15x/13' : null, okPQ ? 'a+14x/13' : null, '0<x<13', as];
      },
    },
    {
      id: '28.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=m$，$BC=10$，点 $P$ 在边 $BC$ 上（不与 $B$、$C$ 重合），且 $AB$ 是 $BP$、$PC$ 的比例中项。(1) 求 $\\angle APD$ 的度数；(2) 按 $m$ 的取值讨论这样的点 $P$ 有几个；(3) 当点 $P$ 有两个时，记为 $P_1$、$P_2$，$AP_1$、$AP_2$ 分别交对角线 $BD$ 于 $O_1$、$O_2$。若 $O_1O_2:BD=5:18$，求 $m$。',
      figure: FIG281.c05,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle APD=$', answer: '90°' },
        { kind: 'num', label: '(2) $0<m<5$ 时，点 $P$ 的个数', answer: '2' },
        { kind: 'num', label: '$m=5$ 时，点 $P$ 的个数', answer: '1' },
        { kind: 'num', label: '$m>5$ 时，点 $P$ 的个数', answer: '0' },
        { kind: 'num', label: '(3) $m=$', answer: '4' },
      ],
      explain: [
        '(1) 设 $BP=x$，则 $PC=10-x$，条件是 $m^2=x(10-x)$。由勾股定理，$AP^2+PD^2=(m^2+x^2)+(m^2+(10-x)^2)=x^2+(10-x)^2+2x(10-x)=(x+10-x)^2=100=AD^2$。由勾股定理的逆定理，$\\angle APD=90^\\circ$。',
        '(2) $x^2-10x+m^2=0$，$\\Delta=100-4m^2$。$0<m<5$ 时 $\\Delta>0$，两根之和 $10$、之积 $m^2>0$，两根都是正数且都小于 $10$，都在边 $BC$ 上，有 $2$ 个；$m=5$ 时 $x=5$（$BC$ 中点），$1$ 个；$m>5$ 时没有。',
        '(3) 思路：$O$ 的位置用 $BO:BD$ 表示，两个点的 $x$ 是同一个方程的两根，作差后用韦达定理。',
        '用面积表示 $O$ 分 $BD$ 的比：$\\triangle AOD$ 与 $\\triangle AOB$ 同高（从 $A$ 出发），$\\triangle POD$ 与 $\\triangle POB$ 同高（从 $P$ 出发），面积比都等于 $\\frac{OD}{OB}$，由比例性质 (4)，$\\frac{OD}{OB}=\\frac{S_{\\triangle APD}}{S_{\\triangle APB}}=\\frac{\\frac12\\times10\\times m}{\\frac12\\times x\\times m}=\\frac{10}x$。所以 $\\frac{BO_i}{BD}=\\frac{x_i}{10+x_i}$。',
        '$\\frac{O_1O_2}{BD}=\\left|\\frac{x_1}{10+x_1}-\\frac{x_2}{10+x_2}\\right|=\\frac{10|x_1-x_2|}{(10+x_1)(10+x_2)}$。由韦达定理 $x_1+x_2=10$，$x_1x_2=m^2$：$|x_1-x_2|=2\\sqrt{25-m^2}$，$(10+x_1)(10+x_2)=200+m^2$。',
        '$\\frac{20\\sqrt{25-m^2}}{200+m^2}=\\frac5{18}$。令 $u=m^2$：$72\\sqrt{25-u}=200+u$，平方得 $u^2+5584u-89600=0$，$(u-16)(u+5600)=0$，$u=16$（负根舍去），$m=4$，满足 $0<m<5$。',
        '检验：$m=4$ 时 $x=2$、$8$，$\\frac{BO}{BD}=\\frac16$、$\\frac49$，差 $\\frac5{18}$。坑：(2) 忘了说明两根都在 $0$ 到 $10$ 之间；(3) 用 $\\frac{BO}{OD}$ 直接作差。',
      ],
      verify: () => {
        const S = SVG281;
        const ang = (() => { const mm = 3, x = roots281(1, -10, mm * mm)[0]; return S.ang([x, 0], [0, mm], [10, mm]); })();
        const cnt = mm => roots281(1, -10, mm * mm).filter(x => x > 1e-9 && x < 10 - 1e-9).length;
        const ratio = mm => {
          const [x1, x2] = roots281(1, -10, mm * mm), A = [0, mm], B = [0, 0], D = [10, mm];
          const O1 = S.meet(A, [x1, 0], B, D), O2 = S.meet(A, [x2, 0], B, D);
          return S.dist(O1, O2) / S.dist(B, D);
        };
        const m = bisect281(mm => ratio(mm) - 5 / 18, 0.01, 4.99);
        return [`${Math.round(ang)}°`, cnt(3), cnt(5), cnt(6), Q281(m)];
      },
    },
  ],
});
