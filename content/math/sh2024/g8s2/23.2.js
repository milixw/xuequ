'use strict';

// 上海数学八年级下册 · 23.2 平行四边形（按试读片段课本第 8～21 页）
// 知识范围：梯形（有一组对边平行，本书的梯形包括平行四边形）、平行四边形的定义（两组对边分别平行）与记号 ▱；
//   性质定理：对边相等、对角相等、对角线互相平分；平行四边形是中心对称图形，对称中心是对角线的交点；两条平行线之间的距离；四边形的不稳定性；
//   判定定理：两组对边分别相等、一组对边平行且相等、对角线互相平分（另有课本例题：两组对角分别相等的四边形是平行四边形）
// 可以使用：23.1（多边形内角和、外角和）；八上第 19～22 章（实数、二次根式、一元二次方程、直角三角形：30° 角、斜边中线、勾股定理及逆定理、垂线段最短）；
//   七年级全部（平行线、全等、等腰、垂直平分线、轴对称、旋转、中心对称）；小学学过平行四边形面积 = 底 × 高
// 还没学：矩形、菱形、正方形的性质与判定（23.3）、三角形中位线与重心（23.4）、平面直角坐标系、相似三角形、三角比、圆
// 本节约定：带根号的结果用 real / reals 填空，并要求化成最简二次根式

const SVG232 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: (pts, dash = false) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
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
  add: (P, Q, R) => [P[0] + Q[0] - R[0], P[1] + Q[1] - R[1]],  // P + Q − R：平行四边形的第四个顶点
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  cross: (u, v) => u[0] * v[1] - u[1] * v[0],
  area: pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2,
  // 点 P 在直线 QR 上的垂足
  foot: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    return [Q[0] + t * u[0], Q[1] + t * u[1]];
  },
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  // ∠QPR（度）
  ang: (P, Q, R) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)))) * 180) / Math.PI;
  },
  rot: (P, C, deg) => {
    const r = (deg * Math.PI) / 180, x = P[0] - C[0], y = P[1] - C[1];
    return [C[0] + x * Math.cos(r) - y * Math.sin(r), C[1] + x * Math.sin(r) + y * Math.cos(r)];
  },
  // 由 ∠B（度）、AB、BC 作 ▱ABCD：B 在原点，C 在 x 轴正方向，A 在上方
  para: (angB, ab, bc) => {
    const r = (angB * Math.PI) / 180, B = [0, 0], C = [bc, 0], A = [ab * Math.cos(r), ab * Math.sin(r)];
    return { A, B, C, D: [A[0] + bc, A[1]] };
  },
  isPara: (A, B, C, D) => Math.hypot(A[0] + C[0] - B[0] - D[0], A[1] + C[1] - B[1] - D[1]) < 1e-7,
};

const R232 = v => Math.round(v * 1e9) / 1e9;

const FIG232 = (() => {
  const S = SVG232, out = {};
  const lab4 = (P, n, d) => n.map((s, i) => S.text(s, P[i], d[i][0], d[i][1])).join('');
  const std = [[-6, -10], [-8, 8], [8, 8], [6, -10]];  // A 左上、B 左下、C 右下、D 右上
  // b02：一般的 ▱ABCD（∠A=70°）
  {
    const q = S.para(110, 4, 6), m = S.map(30, 70, 140), P = [q.A, q.B, q.C, q.D].map(m);
    out.b02 = S.wrap(300, 165, S.poly(P) + lab4(P, ['A', 'B', 'C', 'D'], std));
  }
  // b03：AB=6、BC=10、AC=6 画出 ▱ABCD 和对角线 AC
  {
    const B = [0, 0], C = [10, 0], A = [5, Math.sqrt(11)], D = [15, Math.sqrt(11)], m = S.map(18, 15, 105), P = [A, B, C, D].map(m);
    out.b03 = S.wrap(310, 130, S.poly(P) + S.seg(P[0], P[2]) + lab4(P, ['A', 'B', 'C', 'D'], std));
  }
  // b04：AC⊥BC，BC=6，AC=8
  {
    const B = [0, 0], C = [6, 0], A = [6, 8], D = [12, 8], O = [6, 4], m = S.map(17, 40, 165), P = [A, B, C, D].map(m), Om = m(O);
    out.b04 = S.wrap(300, 190, S.poly(P) + S.seg(P[0], P[2]) + S.seg(P[1], P[3]) + S.ra(P[2], P[0], P[1]) + lab4(P, ['A', 'B', 'C', 'D'], std) + S.text('O', Om, 12, 0));
  }
  // b05：▱ABCD，E、F 在对角线 AC 上，四边形 BEDF
  {
    const A = [2, 4], B = [0, 0], C = [5, 0], D = [7, 4], E = S.at(A, C, 0.3), Fp = S.at(A, C, 0.7), m = S.map(30, 45, 145);
    const P = [A, B, C, D].map(m), e = m(E), f = m(Fp);
    out.b05 = S.wrap(300, 165, S.poly(P) + S.seg(P[0], P[2]) + S.poly([P[1], e, P[3], f]) + lab4(P, ['A', 'B', 'C', 'D'], std) + S.text('E', e, -2, -14) + S.text('F', f, 4, 12));
  }
  // b06：∠B=50°，AE⊥BC 于 E，AF⊥CD 于 F
  {
    const q = S.para(50, 5, 6), E = S.foot(q.A, q.B, q.C), Fp = S.foot(q.A, q.C, q.D), m = S.map(26, 25, 135);
    const P = [q.A, q.B, q.C, q.D].map(m), e = m(E), f = m(Fp);
    out.b06 = S.wrap(300, 160, S.poly(P) + S.seg(P[0], e) + S.seg(P[0], f) + S.ra(e, P[0], P[2]) + S.ra(f, P[0], P[2]) + lab4(P, ['A', 'B', 'C', 'D'], std) + S.text('E', e, 0, 12) + S.text('F', f, 10, 2));
  }
  // b07：AB=8 在下方，AB 与 CD 的距离为 4，BC=5
  {
    const A = [0, 0], B = [8, 0], C = [11, 4], D = [3, 4], H = [3, 0], G = S.foot(B, A, D), m = S.map(24, 20, 125);
    const P = [A, B, C, D].map(m);
    out.b07 = S.wrap(310, 150, S.poly(P) + S.seg(m(D), m(H), true) + S.seg(m(B), m(G), true) + S.ra(m(H), m(D), m(B), 7) + S.ra(m(G), m(B), m(D), 7)
      + S.text('A', P[0], -8, 8) + S.text('B', P[1], 8, 8) + S.text('C', P[2], 8, -8) + S.text('D', P[3], -6, -10));
  }
  // b08：AB=5，BC=8，过 O 的直线交 AD 于 E、交 BC 于 F，OE=3
  {
    const q = S.para(60, 5, 8), O = S.mid(q.A, q.C), dx = Math.sqrt(9 - O[1] * O[1]), E = [O[0] - dx, q.A[1]], Fp = [O[0] + dx, 0], m = S.map(22, 25, 125);
    const P = [q.A, q.B, q.C, q.D].map(m);
    out.b08 = S.wrap(300, 150, S.poly(P) + S.seg(P[0], P[2]) + S.seg(P[1], P[3]) + S.seg(m(E), m(Fp)) + lab4(P, ['A', 'B', 'C', 'D'], std)
      + S.text('E', m(E), 0, -14) + S.text('F', m(Fp), 0, 12) + S.text('O', m(O), -12, -2));
  }
  // b09：一般的 ▱ABCD 和两条对角线
  {
    const q = S.para(65, 4.6, 7), O = S.mid(q.A, q.C), m = S.map(26, 30, 135), P = [q.A, q.B, q.C, q.D].map(m);
    out.b09 = S.wrap(300, 160, S.poly(P) + S.seg(P[0], P[2]) + S.seg(P[1], P[3]) + lab4(P, ['A', 'B', 'C', 'D'], std) + S.text('O', m(O), 0, 12));
  }
  // e02：P 在 AD 上，Q 在 BC 上（一般位置）
  {
    const q = S.para(62, 4, 12), Pp = S.at(q.A, q.D, 0.35), Qp = S.at(q.B, q.C, 0.55), m = S.map(19, 22, 105), P = [q.A, q.B, q.C, q.D].map(m);
    out.e02 = S.wrap(310, 135, S.poly(P) + S.seg(m(Pp), m(Qp), true) + lab4(P, ['A', 'B', 'C', 'D'], std) + S.dot(m(Pp)) + S.dot(m(Qp))
      + S.text('P', m(Pp), 0, -14) + S.text('Q', m(Qp), 0, 12));
  }
  // e03：A(0,0)、B(8,0)、C(10,6)、D(2,6)，P(35/6, 2.5)
  {
    const A = [0, 0], B = [8, 0], C = [10, 6], D = [2, 6], Pp = [35 / 6, 2.5], m = S.map(24, 25, 170), P = [A, B, C, D].map(m), p = m(Pp);
    out.e03 = S.wrap(300, 195, S.poly(P) + P.map(X => S.seg(p, X)).join('') + S.seg(P[0], P[2], true)
      + S.text('A', P[0], -8, 8) + S.text('B', P[1], 8, 8) + S.text('C', P[2], 8, -8) + S.text('D', P[3], -6, -10) + S.text('P', p, 2, 14));
  }
  // e04：AB=10，AD=5，M 是 AB 中点，DM=6，CM=8
  {
    const A = [0, 0], B = [10, 0], M = [5, 0], D = [1.4, 4.8], C = [11.4, 4.8], m = S.map(23, 20, 135), P = [A, B, C, D].map(m);
    out.e04 = S.wrap(300, 160, S.poly(P) + S.seg(m(D), m(M)) + S.seg(m(C), m(M))
      + S.text('A', P[0], -8, 8) + S.text('B', P[1], 8, 8) + S.text('C', P[2], 8, -8) + S.text('D', P[3], -6, -10) + S.text('M', m(M), 0, 12));
  }
  // e05：△ABC，AB=5，AC=13，中线 AD=6，延长到 E 使 DE=AD
  {
    const A0 = [0, 0], B0 = [5, 0], E0 = [0, 12], D0 = [0, 6], C0 = [-5, 12];
    const turn = X => S.rot(X, [0, 6], -62), m = S.map(13, 150, 200);
    const [A, B, C, D, E] = [A0, B0, C0, D0, E0].map(turn).map(m);
    out.e05 = S.wrap(300, 240, S.poly([A, B, C]) + S.seg(A, E, true) + S.seg(B, E, true) + S.seg(C, E, true)
      + S.text('A', A, -10, 0) + S.text('B', B, 0, 12) + S.text('C', C, 0, -14) + S.text('D', D, -10, -6) + S.text('E', E, 10, 0));
  }
  // e06：Rt△ABC，∠B=90°，AB=3，BC=4
  {
    const B = [0, 0], A = [0, 3], C = [4, 0], m = S.map(30, 90, 120), P = [A, B, C].map(m);
    out.e06 = S.wrap(300, 140, S.poly(P) + S.ra(P[1], P[0], P[2]) + S.text('A', P[0], 0, -14) + S.text('B', P[1], -10, 6) + S.text('C', P[2], 10, 6));
  }
  // c02：∠B=60°，AB=4，BC=6，P 在 BC 上，▱PAQC（一般位置）
  {
    const q = S.para(60, 4, 6), Pp = [2.6, 0], Qp = S.add(q.A, q.C, Pp), m = S.map(30, 25, 135), P = [q.A, q.B, q.C, q.D].map(m);
    out.c02 = S.wrap(300, 160, S.poly(P) + S.poly([m(Pp), P[0], m(Qp), P[2]], true) + S.seg(m(Pp), m(Qp), true) + lab4(P, ['A', 'B', 'C', 'D'], std)
      + S.text('P', m(Pp), 0, 12) + S.text('Q', m(Qp), 8, -8));
  }
  // c03：只画 ▱ABCD（∠BAD=120°，AB=2，AD=3），E、F 的位置要分类，不画
  {
    const A = [0, 0], B = [2, 0], D = [-1.5, 1.5 * Math.sqrt(3)], C = S.add(B, D, A), m = S.map(40, 110, 140);
    const [a, b, c, d] = [A, B, C, D].map(m);
    out.c03 = S.wrap(300, 160, S.poly([a, b, c, d]) + S.text('A', a, 6, 10) + S.text('B', b, 8, 8) + S.text('C', c, 8, -8) + S.text('D', d, -6, -10));
  }
  // c05：A(0,0)、B(8,0)、D(6,8)、C(14,8)，P 在到 AB 距离为 2 的直线上（不是最优点）
  {
    const A = [0, 0], B = [8, 0], C = [14, 8], D = [6, 8], Pp = [6.4, 2], m = S.map(18, 20, 165), P = [A, B, C, D].map(m), p = m(Pp);
    out.c05 = S.wrap(300, 190, S.poly(P) + P.map(X => S.seg(p, X)).join('')
      + S.text('A', P[0], -8, 8) + S.text('B', P[1], 8, 8) + S.text('C', P[2], 8, -8) + S.text('D', P[3], -6, -10) + S.text('P', p, 2, 14));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s2/23.2',
  title: '平行四边形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-07', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“性质”配 parallelogramDrag 拖动演示，“中心对称”配 motion 旋转 180°，b08 解析也配 motion 旋转 180°。第 1 轮 c03（两边都向外作等边三角形证 △CEF 等边）只有 4 级且是流传老题，c05 配图 P 不在到 AB 距离为 2 的直线上，扩展档缺 5 级，c01 反例与反证写得不全；第 2 轮 c03 改为 E、F 内外四种位置分类求 △CEF 面积（同向等边、异向等腰，向内时点落在边上），c05 重画配图，e02 加“直线 PQ 分面积 1:2”一问，c01 写全 ②③、②④、②⑤ 反例并只用外角反证 ④⑤，长度都用作垂线加勾股，整节通过' },

  intro: [
    {
      title: '梯形和平行四边形',
      body: '有一组对边平行的四边形叫作梯形，平行的两边叫底，另两边叫腰。两组对边分别平行的四边形叫作平行四边形，记作“▱”。按本书的定义，平行四边形是梯形的特殊情形（有些书上的梯形不包括平行四边形）。',
      example: '四边形 $KLMN$ 中 $KL\\parallel NM$，而 $KN$ 与 $LM$ 不平行，它是梯形，但不是平行四边形。',
    },
    {
      title: '平行四边形的性质',
      body: '平行四边形的**对边相等**、**对角相等**、**对角线互相平分**（连对角线用全等三角形证）。另外由 $AD\\parallel BC$，相邻两个内角互补。拖动下面的滑块改变边长和夹角，这几条始终成立。',
      example: '▱$PQRS$ 中 $\\angle P=48^\\circ$，$PQ=7$，那么 $\\angle R=48^\\circ$，$\\angle Q=\\angle S=132^\\circ$，$RS=7$。',
      demo: { type: 'parallelogramDrag' },
    },
    {
      title: '平行线之间的距离',
      body: '两条平行线中，一条直线上任意一点到另一条直线的垂线段长度都相等，这个长度叫作两条平行线之间的距离。四边形的四条边长确定后，形状仍会变化，这叫四边形的不稳定性（伸缩门、升降机都利用了它）。',
      example: '直线 $a\\parallel b$，$a$ 上的点 $M$ 到 $b$ 的距离是 $5$，那么 $a$ 上任意一点 $N$ 到 $b$ 的距离也是 $5$。',
      pitfall: '距离是垂线段的长度，是一个数，不是那条线段本身。',
    },
    {
      title: '中心对称',
      body: '平行四边形是中心对称图形，对称中心是两条对角线的交点 $O$：绕 $O$ 旋转 $180^\\circ$ 后与自身重合，$A$ 落到 $C$，$B$ 落到 $D$。',
      example: '下面的动画把 ▱$ABCD$ 绕对角线交点转半圈，四个顶点两两交换位置，图形和原来完全重合。',
      demo: { type: 'motion', mode: 'half', shape: [[0, 0], [4, 0], [5.5, 2.5], [1.5, 2.5]], labels: ['B', 'C', 'D', 'A'], center: [2.75, 1.25], view: [-1.5, 7, -2, 4.5] },
    },
    {
      title: '平行四边形的判定',
      body: '除了定义（两组对边分别平行），还可以用三个判定定理：**两组对边分别相等**、**一组对边平行且相等**、**对角线互相平分**的四边形是平行四边形。用内角和还能说明：两组对角分别相等的四边形也是平行四边形。',
      example: '四边形 $KLMN$ 中 $KL\\parallel NM$，且 $KL=NM=4$，所以它是平行四边形。',
      pitfall: '“一组对边平行、另一组对边相等”不够，等腰梯形就是反例。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '23.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '按本书的定义，下列说法中，正确的是（　　）',
      options: [
        '平行四边形也是梯形',
        '平行四边形的两条对角线把它分成的四个小三角形都全等',
        '平行四边形是轴对称图形',
        '四边形的四条边长确定后，它的四个内角也就确定了',
      ],
      answer: 0,
      explain: [
        'A 对：本书规定“有一组对边平行的四边形叫作梯形”，平行四边形有两组对边平行，当然也是梯形，是梯形的特殊情形。',
        'B 错：对角线交点 $O$ 分出的四个三角形中，相对的两个（如 $\\triangle AOB$ 与 $\\triangle COD$）全等，相邻的两个一般不全等，它们有一条边分别是 $AB$、$BC$。',
        'C 错：一般的平行四边形是中心对称图形，但找不到对称轴。D 错：这正是四边形的不稳定性，边长不变，内角可以变。',
        '坑：按别的书“梯形不包括平行四边形”的说法，把 A 判错。',
      ],
      verify: () => {
        const S = SVG232, A = [0, 0], B = [5, 0], C = [7, 3], D = [2, 3], O = S.mid(A, C), P = [A, B, C, D];
        const sides = (X, Y, Z) => [S.dist(X, Y), S.dist(Y, Z), S.dist(Z, X)].sort((p, q) => p - q);
        const same = (u, v) => u.every((x, i) => Math.abs(x - v[i]) < 1e-9);
        const okA = Math.abs(S.cross([B[0] - A[0], B[1] - A[1]], [C[0] - D[0], C[1] - D[1]])) < 1e-9;  // 有一组对边平行
        const okB = same(sides(O, A, B), sides(O, B, C));
        // 候选对称轴：任两顶点连线、任两顶点的垂直平分线
        const refl = (X, Q, R) => { const Fp = S.foot(X, Q, R); return [2 * Fp[0] - X[0], 2 * Fp[1] - X[1]]; };
        const axes = [];
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
          axes.push([P[i], P[j]]);
          const M = S.mid(P[i], P[j]); axes.push([M, [M[0] - (P[j][1] - P[i][1]), M[1] + (P[j][0] - P[i][0])]]);
        }
        const okC = axes.some(([Q, R]) => P.every(X => { const Y = refl(X, Q, R); return P.some(Z => S.dist(Y, Z) < 1e-9); }));
        const p1 = S.para(60, 5, 4), p2 = S.para(80, 5, 4);  // 边长相同、角不同
        const okD = Math.abs(S.ang(p1.B, p1.A, p1.C) - S.ang(p2.B, p2.A, p2.C)) < 1e-9;
        const ok = [okA, okB, okC, okD];
        return ok.filter(x => x).length === 1 ? ok.indexOf(true) : -1;
      },
    },
    {
      id: '23.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$\\angle A+\\angle C=140^\\circ$。求 $\\angle B$ 的度数。',
      figure: FIG232.b02,
      blanks: [
        { kind: 'angle', label: '$\\angle B=$', answer: '110°' },
      ],
      explain: [
        '$\\angle A$ 与 $\\angle C$ 是一组对角，平行四边形的对角相等，所以 $\\angle A=\\angle C=70^\\circ$。',
        '$AD\\parallel BC$，$\\angle A+\\angle B=180^\\circ$，$\\angle B=110^\\circ$。',
        '坑：把 $\\angle A$、$\\angle C$ 当成相邻的角，以为它们互补；或者求出 $70^\\circ$ 就当成 $\\angle B$。',
      ],
      verify: () => {
        const a = 140 / 2;
        return 180 - a + '°';
      },
    },
    {
      id: '23.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，▱$ABCD$ 的周长为 $32$，对角线 $AC$ 把它分成两个三角形，$\\triangle ABC$ 的周长为 $22$。求 $AC$ 的长。',
      figure: FIG232.b03,
      blanks: [
        { kind: 'num', label: '$AC=$', answer: '6' },
      ],
      explain: [
        '平行四边形的对边相等：$AB=CD$，$BC=AD$，所以 $AB+BC$ 是周长的一半，等于 $16$。',
        '$AC=22-(AB+BC)=22-16=6$。',
        '坑：用 $22-32$ 或 $32-22$，没注意 $\\triangle ABC$ 只包含平行四边形的两条边。',
      ],
      verify: () => {
        // 按图里的数据（AB=6、BC=10）核对，再用周长关系算
        const S = SVG232, B = [0, 0], C = [10, 0], A = [5, Math.sqrt(11)], D = S.add(A, C, B);
        const per = S.dist(A, B) + S.dist(B, C) + S.dist(C, D) + S.dist(D, A), tri = S.dist(A, B) + S.dist(B, C) + S.dist(C, A);
        if (Math.abs(per - 32) > 1e-9 || Math.abs(tri - 22) > 1e-9) return null;
        return F(22).sub(F(32).div(F(2)));
      },
    },
    {
      id: '23.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，对角线 $AC$、$BD$ 相交于点 $O$，$AC\\perp BC$，$AB=10$，$BC=6$。求 $BD$ 的长。',
      figure: FIG232.b04,
      blanks: [
        { kind: 'real', label: '$BD=$', answer: '4√13', simplest: true },
      ],
      explain: [
        '在 Rt$\\triangle ABC$ 中，$AC=\\sqrt{10^2-6^2}=8$。对角线互相平分，$OC=\\frac12AC=4$。',
        '在 Rt$\\triangle BOC$ 中（$\\angle BCO=90^\\circ$），$OB=\\sqrt{6^2+4^2}=\\sqrt{52}=2\\sqrt{13}$。',
        '$BD=2OB=4\\sqrt{13}$。坑：算出 $OB$ 就停下，或者用 $AC=8$ 而不是 $OC=4$ 去算 $OB$。',
      ],
      verify: () => {
        const S = SVG232, B = [0, 0], C = [6, 0], A = [6, Math.sqrt(100 - 36)], D = S.add(A, C, B);
        return S.dist(B, D);
      },
    },
    {
      id: '23.2-b05',
      level: 'basic',
      type: 'choice',
      stem: '如图，在 ▱$ABCD$ 中，点 $E$、$F$ 在对角线 $AC$ 上（不与 $A$、$C$ 重合，$E$、$F$ 不重合）。添加下列条件中的一个，**不能**保证四边形 $BEDF$ 是平行四边形的是（　　）',
      figure: FIG232.b05,
      options: ['$AE=CF$', '$BE\\parallel DF$', '$BE=DF$', '$\\angle ABE=\\angle CDF$'],
      answer: 2,
      explain: [
        'A：$OA=OC$，$AE=CF$，得 $OE=OF$，又 $OB=OD$，对角线互相平分，能。',
        'B：由 $BE\\parallel DF$ 得 $\\angle BEF=\\angle DFE$，所以 $\\angle AEB=\\angle CFD$，再加 $AB=CD$、$\\angle BAC=\\angle DCA$，$\\triangle ABE\\cong\\triangle CDF$（AAS），$BE=DF$，一组对边平行且相等，能。D：$\\triangle ABE\\cong\\triangle CDF$（ASA），同理能。',
        'C：$BE=DF$ 只给出“边边角”。以 $D$ 为圆心、$BE$ 为半径画弧，可能与 $AC$ 交于两点，其中一点使 $BEDF$ 是平行四边形，另一点不是，所以不能。',
        '选 C。坑：把“$BE=DF$”看成和“$AE=CF$”一样的对称条件。',
      ],
      verify: () => {
        const S = SVG232, A = [2, 4], B = [0, 0], C = [5, 0], D = [7, 4], E = S.at(A, C, 0.3);
        const F0 = u => S.at(A, C, u);
        const conds = [
          u => S.dist(A, E) - S.dist(C, F0(u)),
          u => S.cross([E[0] - B[0], E[1] - B[1]], [F0(u)[0] - D[0], F0(u)[1] - D[1]]),
          u => S.dist(B, E) - S.dist(D, F0(u)),
          u => S.ang(B, A, E) - S.ang(D, C, F0(u)),
        ];
        const bad = [];
        conds.forEach((f, k) => {
          let prev = f(0.001);
          for (let i = 2; i < 1000; i++) {
            const u = i / 1000, v = f(u);
            if (Math.sign(v) !== Math.sign(prev)) {
              let lo = (i - 1) / 1000, hi = u;
              for (let it = 0; it < 60; it++) { const mm = (lo + hi) / 2; if (Math.sign(f(mm)) === Math.sign(f(lo))) lo = mm; else hi = mm; }
              const Fp = F0((lo + hi) / 2);
              if (S.dist(Fp, E) > 1e-6 && !S.isPara(B, E, D, Fp)) bad.push(k);
            }
            prev = v;
          }
        });
        const s = [...new Set(bad)];
        return s.length === 1 ? s[0] : -1;
      },
    },
    {
      id: '23.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$AE\\perp BC$ 于点 $E$，$AF\\perp CD$ 于点 $F$，$\\angle EAF=50^\\circ$。求 $\\angle B$ 的度数。',
      figure: FIG232.b06,
      blanks: [
        { kind: 'angle', label: '$\\angle B=$', answer: '50°' },
      ],
      explain: [
        '在四边形 $AECF$ 中，$\\angle AEC=\\angle AFC=90^\\circ$，内角和为 $360^\\circ$，所以 $\\angle C=360^\\circ-90^\\circ-90^\\circ-50^\\circ=130^\\circ$。',
        '$AB\\parallel CD$，$\\angle B+\\angle C=180^\\circ$，$\\angle B=50^\\circ$。',
        '坑：求出 $130^\\circ$ 就当答案，那是 $\\angle C$（也等于 $\\angle BAD$），不是 $\\angle B$。',
      ],
      verify: () => {
        const S = SVG232;
        for (let b = 1; b < 90; b++) {
          const q = S.para(b, 5, 6), E = S.foot(q.A, q.B, q.C), Fp = S.foot(q.A, q.C, q.D);
          if (Math.abs(S.ang(q.A, E, Fp) - 50) < 1e-6) return b + '°';
        }
        return null;
      },
    },
    {
      id: '23.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$AB=8$，$BC=5$，$AB$ 与 $CD$ 之间的距离为 $4$。求 $AD$ 与 $BC$ 之间的距离。',
      figure: FIG232.b07,
      blanks: [
        { kind: 'num', label: '距离', answer: '32/5' },
      ],
      explain: [
        '平行四边形的面积 $=$ 底 $\\times$ 高。以 $AB$ 为底，高是 $AB$ 与 $CD$ 之间的距离：面积 $=8\\times4=32$。',
        '以 $BC$ 为底，高是 $AD$ 与 $BC$ 之间的距离：$5\\times$ 距离 $=32$，距离 $=\\frac{32}{5}$。',
        '坑：以为两组对边之间的距离相等，填 $4$；或者把 $8$、$5$ 配错，算成 $\\frac{5\\times4}{8}$。',
      ],
      verify: () => {
        const S = SVG232, A = [0, 0], B = [8, 0], D = [3, 4], C = S.add(B, D, A);
        if (Math.abs(S.dist(B, C) - 5) > 1e-9) return null;
        return R232(S.dist(B, S.foot(B, A, D)));
      },
    },
    {
      id: '23.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，▱$ABCD$ 的对角线相交于点 $O$，过点 $O$ 的直线分别交 $AD$、$BC$ 于点 $E$、$F$，$AB=5$，$BC=8$，$OE=3$。求四边形 $ABFE$ 的周长。',
      figure: FIG232.b08,
      blanks: [
        { kind: 'num', label: '周长', answer: '19' },
      ],
      explain: [
        '$OA=OC$，$\\angle EAO=\\angle FCO$（$AD\\parallel BC$），$\\angle AOE=\\angle COF$，所以 $\\triangle AOE\\cong\\triangle COF$，$AE=CF$，$OF=OE=3$。',
        '周长 $=AB+BF+FE+EA=AB+(BF+CF)+EF=5+8+6=19$。',
        '坑：把 $EF$ 写成 $OE=3$，忘了 $EF=OE+OF=6$。也可以看成 $\\triangle AOE$ 绕 $O$ 旋转 $180^\\circ$ 正好落到 $\\triangle COF$ 上，见下面的动画。',
      ],
      demo: { type: 'motion', mode: 'half', shape: [[2.5, 4.33], [5.25, 2.165], [3.17, 4.33]], labels: ['A', 'O', 'E'], center: [5.25, 2.165], view: [-0.5, 11, -1, 5.5] },
      verify: () => {
        const S = SVG232, q = S.para(60, 5, 8), O = S.mid(q.A, q.C), dx = Math.sqrt(9 - O[1] * O[1]), E = [O[0] - dx, q.A[1]], Fp = S.meet(E, O, q.B, q.C);
        return R232(S.dist(q.A, q.B) + S.dist(q.B, Fp) + S.dist(Fp, E) + S.dist(E, q.A));
      },
    },
    {
      id: '23.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，▱$ABCD$ 的对角线 $AC$、$BD$ 相交于点 $O$，$AC=8$，$BD=12$。求边 $AB$ 长的取值范围。',
      figure: FIG232.b09,
      blanks: [
        { kind: 'num', label: '$AB$ 大于', answer: '2' },
        { kind: 'num', label: '且小于', answer: '10' },
      ],
      explain: [
        '对角线互相平分：$OA=\\frac12AC=4$，$OB=\\frac12BD=6$。',
        '在 $\\triangle AOB$ 中，由三角形三边关系，$6-4<AB<6+4$，即 $2<AB<10$。',
        '坑：直接用 $AC$、$BD$ 的长，写成 $4<AB<20$；$AB$ 是 $\\triangle AOB$ 的边，不是以 $AC$、$BD$ 为两边的三角形的边。',
      ],
      verify: () => {
        const S = SVG232;
        let lo = Infinity, hi = -Infinity;
        for (let k = 1; k < 18000; k++) {
          const r = (k / 100) * (Math.PI / 180), A = [-4, 0], B = [6 * Math.cos(r), 6 * Math.sin(r)], d = S.dist(A, B);
          lo = Math.min(lo, d); hi = Math.max(hi, d);
        }
        return [Math.round(lo * 100) / 100, Math.round(hi * 100) / 100];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '23.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '在 ▱$ABCD$ 中，$AD=5$，$\\angle DAB$ 的平分线与直线 $CD$ 交于点 $E$，$\\angle ABC$ 的平分线与直线 $CD$ 交于点 $F$，$EF=2$。求 $AB$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$AB=$', answer: ['8', '12'] },
      ],
      explain: [
        '$AB\\parallel CD$，$\\angle DEA=\\angle BAE=\\angle DAE$，所以 $DE=DA=5$；同理 $\\angle CFB=\\angle ABF=\\angle CBF$，$CF=CB=AD=5$。$E$ 在射线 $DC$ 上，$F$ 在射线 $CD$ 上。',
        '设 $CD=AB=x$。① $E$、$F$ 交叉重叠（$x<10$）：$DE+CF-EF=CD$，$x=5+5-2=8$。② $E$、$F$ 不重叠（$x>10$）：$DE+EF+FC=CD$，$x=5+2+5=12$。',
        '两种都符合各自的范围，所以 $AB=8$ 或 $12$。转弯：两个等腰三角形把 $CD$ 截成两段，要按两段“重叠”还是“分开”分类。',
      ],
      verify: () => {
        const S = SVG232, res = [];
        const g = x => {
          // A 在原点，AB=x 沿水平方向，AD=5 与 AB 成 70°
          const r = (70 * Math.PI) / 180, A = [0, 0], B = [x, 0], D = [5 * Math.cos(r), 5 * Math.sin(r)], C = S.add(B, D, A);
          const E = S.meet(A, [1 + Math.cos(r), Math.sin(r)], D, C);
          const Fp = S.meet(B, [B[0] - 1 + Math.cos(r), Math.sin(r)], D, C);
          return S.dist(E, Fp) - 2;
        };
        let prev = g(0.5);
        for (let i = 51; i <= 3000; i++) {
          const x = i / 100, v = g(x);
          if (Math.sign(v) !== Math.sign(prev)) { let lo = x - 0.01, hi = x; for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m; else hi = m; } res.push(Math.round(lo * 1e6) / 1e6); }
          prev = v;
        }
        return res;
      },
    },
    {
      id: '23.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$AD=12$。点 $P$ 从 $A$ 出发沿 $AD$ 向 $D$ 运动，速度为每秒 $1$ 个单位，到达 $D$ 时两点同时停止；点 $Q$ 同时从 $C$ 出发，以每秒 $3$ 个单位的速度在线段 $CB$ 上往返运动（到 $B$ 后立即返回，到 $C$ 后再返回……）。(1) 运动多少秒时，四边形 $PDCQ$ 是平行四边形？(2) 运动多少秒时，直线 $PQ$ 把 ▱$ABCD$ 分成面积比为 $1:2$ 的两部分？（每问都全部填出，用逗号隔开）',
      figure: FIG232.e02,
      blanks: [
        { kind: 'nums', label: '(1) 运动时间（秒）', answer: ['3', '6', '9'] },
        { kind: 'nums', label: '(2) 运动时间（秒）', answer: ['2', '5', '7', '10'] },
      ],
      explain: [
        '$P$ 在 $AD$ 上，$Q$ 在 $BC$ 上，$PD\\parallel CQ$ 始终成立，所以只要 $PD=CQ$（一组对边平行且相等）。$PD=12-t$，$0<t<12$。',
        '$Q$ 走一趟 $CB$ 用 $4$ 秒：$0<t\\le4$ 时 $CQ=3t$；$4<t\\le8$ 时 $CQ=24-3t$；$8<t<12$ 时 $CQ=3t-24$。',
        '分别令 $12-t=3t$、$12-t=24-3t$、$12-t=3t-24$，得 $t=3$、$6$、$9$，都在各自的时间段内（且 $Q$ 不在 $C$ 点）。',
        '(1) 所以 $t=3$、$6$ 或 $9$。',
        '(2) 直线 $PQ$ 把 ▱ 分成梯形 $ABQP$ 和梯形 $PQCD$，两者的高都是 $AD$ 与 $BC$ 之间的距离，面积比等于“上底 + 下底”之比。$(AP+BQ)+(PD+QC)=24$，面积比 $1:2$ 可以是哪一块小都行，所以 $AP+BQ=8$ 或 $16$。$AP=t$，$BQ=12-CQ$，得 $CQ=t+4$ 或 $CQ=t-4$。',
        '逐段代入：$0<t\\le4$，$3t=t+4$ 得 $t=2$（$3t=t-4$ 无解）；$4<t\\le8$，$24-3t=t+4$ 得 $t=5$，$24-3t=t-4$ 得 $t=7$；$8<t<12$，$3t-24=t+4$ 得 $t=14$（舍），$3t-24=t-4$ 得 $t=10$。所以 $t=2$、$5$、$7$ 或 $10$。',
        '转弯：$Q$ 往返要分段写 $CQ$；第 (2) 问还要按哪一块小分两类，三段各解两次再检验。',
      ],
      verify: () => {
        const S = SVG232, q = S.para(62, 4, 12), A = q.A, B = q.B, C = q.C, D = q.D;
        const cq = t => { const r = (3 * t) % 24; return r <= 12 ? r : 24 - r; };
        const pos = t => ({ P: S.at(A, D, t / 12), Q: S.at(C, B, cq(t) / 12) });
        const g1 = t => { const { P, Q } = pos(t); return S.dist(P, D) - S.dist(Q, C); };
        const g2 = (t, k) => { const { P, Q } = pos(t); return S.area([A, B, Q, P]) / S.area([A, B, C, D]) - k; };
        const roots = g => {
          const res = [];
          for (let i = 1; i < 12000; i++) {
            const t0 = i / 1000, t1 = t0 + 0.001, v0 = g(t0), v1 = g(t1);
            if (Math.abs(v0) < 1e-12 && cq(t0) > 0) res.push(R232(t0));
            else if (v0 * v1 < 0 && Math.abs(v1) > 1e-12) {
              let lo = t0, hi = t1; for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (g(m) * g(lo) > 0) lo = m; else hi = m; }
              if (Math.abs(g(lo)) < 1e-6 && cq(lo) > 1e-6) res.push(Math.round(lo * 1e6) / 1e6);  // 往返折点处 g 连续，变号即为根
            }
          }
          return [...new Set(res)];
        };
        return [roots(g1), [...roots(t => g2(t, 1 / 3)), ...roots(t => g2(t, 2 / 3))].sort((a, b) => a - b)];
      },
    },
    {
      id: '23.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，▱$ABCD$ 的面积为 $48$，点 $P$ 在它的内部，$S_{\\triangle PAB}=10$，$S_{\\triangle PBC}=9$。求 $S_{\\triangle PCD}$ 和 $S_{\\triangle PAC}$。',
      figure: FIG232.e03,
      blanks: [
        { kind: 'num', label: '$S_{\\triangle PCD}=$', answer: '14' },
        { kind: 'num', label: '$S_{\\triangle PAC}=$', answer: '5' },
      ],
      explain: [
        '$\\triangle PAB$、$\\triangle PCD$ 的底 $AB=CD$，两条高的和正好是 $AB$ 与 $CD$ 之间的距离，所以 $S_{\\triangle PAB}+S_{\\triangle PCD}=\\frac12\\times48=24$，$S_{\\triangle PCD}=14$。',
        '$S_{\\triangle ABC}=\\frac12\\times48=24$。如果 $P$ 在 $AC$ 的另一侧（$\\triangle ACD$ 内或 $AC$ 上），$\\triangle ABC$ 被四边形 $ABCP$ 包含，就有 $S_{\\triangle PAB}+S_{\\triangle PBC}\\ge24$；现在 $10+9=19<24$，所以 $P$ 在 $\\triangle ABC$ 内部。',
        '于是 $S_{\\triangle PAC}=S_{\\triangle ABC}-S_{\\triangle PAB}-S_{\\triangle PBC}=24-19=5$。',
        '转弯：先用平行线间的距离得到“相对两个三角形面积和是一半”，再判断 $P$ 在 $AC$ 哪一侧。',
      ],
      verify: () => {
        const S = SVG232, A = [0, 0], B = [8, 0], C = [10, 6], D = [2, 6];
        // P 的高：S△PAB=10 → y；再由 S△PBC=9 在 ▱ 内找 x
        const y = (2 * 10) / 8;
        for (let i = 1; i < 120000; i++) {
          const x = i / 10000, P = [x, y];
          if (Math.abs(S.area([P, B, C]) - 9) < 1e-4 && S.cross([B[0] - A[0], 0], [P[0] - A[0], P[1] - A[1]]) > 0 && S.cross([C[0] - B[0], C[1] - B[1]], [P[0] - B[0], P[1] - B[1]]) > 0) {
            const Pe = [35 / 6, y];  // 精确值
            if (Math.abs(Pe[0] - x) > 1e-3) return null;
            return [R232(S.area([Pe, C, D])), R232(S.area([Pe, A, C]))];
          }
        }
        return null;
      },
    },
    {
      id: '23.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$AB=2AD$，$M$ 是 $AB$ 的中点，连接 $DM$、$CM$，$DM=6$，$CM=8$。求 ▱$ABCD$ 的周长和面积。',
      figure: FIG232.e04,
      blanks: [
        { kind: 'num', label: '周长', answer: '30' },
        { kind: 'num', label: '面积', answer: '48' },
      ],
      explain: [
        '$AM=\\frac12AB=AD$，$\\angle AMD=\\angle ADM=\\frac{180^\\circ-\\angle A}{2}$；$BM=BC$，$\\angle BMC=\\frac{180^\\circ-\\angle B}{2}$。',
        '$\\angle A+\\angle B=180^\\circ$，所以 $\\angle AMD+\\angle BMC=\\frac{360^\\circ-180^\\circ}{2}=90^\\circ$，$\\angle DMC=90^\\circ$。',
        '$CD=\\sqrt{6^2+8^2}=10$，$AB=10$，$AD=5$，周长 $=2\\times(10+5)=30$。',
        '$\\triangle DMC$ 与 ▱$ABCD$ 同底 $CD$、同高（$M$ 在 $AB$ 上，高是 $AB$ 与 $CD$ 之间的距离），面积 $=2S_{\\triangle DMC}=2\\times\\frac12\\times6\\times8=48$。转弯：先发现两个等腰三角形，推出直角。',
      ],
      verify: () => {
        const S = SVG232;
        // 设 AD=a，AB=2a；由 AD=a、DM=6 定出 D，再由 CM=8 求 a
        const make = a => { const A = [0, 0], B = [2 * a, 0], M = [a, 0], x = (a * a - 36 + a * a) / (2 * a), D = [x, Math.sqrt(Math.max(0, a * a - x * x))], C = S.add(D, B, A); return { A, B, C, D, M }; };
        const g = a => S.dist(make(a).C, make(a).M) - 8;
        let prev = g(3.01);
        for (let i = 302; i < 2000; i++) {
          const a = i / 100, v = g(a);
          if (Math.sign(v) !== Math.sign(prev)) {
            let lo = a - 0.01, hi = a; for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m; else hi = m; }
            const q = make(lo);
            return [R232(2 * (3 * lo)), Math.round(S.area([q.A, q.B, q.C, q.D]) * 1e6) / 1e6];
          }
          prev = v;
        }
        return null;
      },
    },
    {
      id: '23.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=5$，$AC=13$，$BC$ 边上的中线 $AD=6$。求 $\\triangle ABC$ 的面积和 $BC$ 的长。',
      figure: FIG232.e05,
      blanks: [
        { kind: 'num', label: '面积', answer: '30' },
        { kind: 'real', label: '$BC=$', answer: '2√61', simplest: true },
      ],
      explain: [
        '延长 $AD$ 到 $E$，使 $DE=AD$，连接 $BE$、$CE$。$BD=DC$，$AD=DE$，对角线互相平分，四边形 $ABEC$ 是平行四边形，$BE=AC=13$，$AE=12$。',
        '在 $\\triangle ABE$ 中，$5^2+12^2=169=13^2$，由勾股定理的逆定理，$\\angle BAE=90^\\circ$。',
        '$S_{\\triangle ABC}=2S_{\\triangle ABD}=S_{\\triangle ABE}=\\frac12\\times5\\times12=30$（$D$ 是 $AE$ 的中点）。',
        'Rt$\\triangle ABD$ 中，$BD=\\sqrt{5^2+6^2}=\\sqrt{61}$，$BC=2\\sqrt{61}$。转弯：三条线段不在同一个三角形里，“倍长中线”构造平行四边形把它们搬到一起。',
      ],
      verify: () => {
        const S = SVG232;
        // 设 BC=x，B(0,0)、C(x,0)，A 满足 AB=5、AC=13，求中线等于 6 的 x
        const make = x => { const ax = (25 - 169 + x * x) / (2 * x), A = [ax, Math.sqrt(Math.max(0, 25 - ax * ax))]; return { A, B: [0, 0], C: [x, 0] }; };
        const g = x => { const q = make(x); return S.dist(q.A, S.mid(q.B, q.C)) - 6; };
        let prev = g(8.01);
        for (let i = 802; i < 1800; i++) {
          const x = i / 100, v = g(x);
          if (Math.sign(v) !== Math.sign(prev)) {
            let lo = x - 0.01, hi = x; for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m; else hi = m; }
            const q = make(lo);
            return [Math.round(S.area([q.A, q.B, q.C]) * 1e6) / 1e6, lo];
          }
          prev = v;
        }
        return null;
      },
    },
    {
      id: '23.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=90^\\circ$，$AB=3$，$BC=4$。点 $D$ 使得以 $A$、$B$、$C$、$D$ 为顶点的四边形是平行四边形。求 $CD$ 的所有可能值（全部填出，用逗号隔开；相同的值只填一次）。',
      figure: FIG232.e06,
      blanks: [
        { kind: 'reals', label: '$CD=$', answer: ['3', '√73'], simplest: true },
      ],
      explain: [
        '已知三点的平行四边形按哪条线段是对角线分三种：$AC$、$AB$ 或 $BC$ 是对角线，$D$ 各有一个位置。',
        '① $AC$ 是对角线（▱$ABCD$）：$CD=AB=3$。② $BC$ 是对角线（▱$ABDC$）：$CD$ 是 $AB$ 的对边，$CD=AB=3$。',
        '③ $AB$ 是对角线（▱$ACBD$）：$CD$ 是另一条对角线，经过 $AB$ 的中点 $M$，$CD=2CM$。$BM=\\frac32$，Rt$\\triangle CBM$ 中 $CM=\\sqrt{4^2+(\\frac32)^2}=\\frac{\\sqrt{73}}{2}$，$CD=\\sqrt{73}$。',
        '所以 $CD=3$ 或 $\\sqrt{73}$。转弯：三种位置都要找，算出来有两种相同，再去掉重复。',
      ],
      verify: () => {
        const S = SVG232, A = [0, 3], B = [0, 0], C = [4, 0];
        const Ds = [S.add(A, C, B), S.add(B, C, A), S.add(A, B, C)];
        const vals = [];
        for (const D of Ds) { const d = S.dist(C, D); if (!vals.some(v => Math.abs(v - d) < 1e-9)) vals.push(d); }
        return vals;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '23.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '四边形 $ABCD$ 的对角线 $AC$、$BD$ 相交于点 $O$。给出五个条件：① $AB\\parallel CD$；② $AB=CD$；③ $\\angle BAD=\\angle BCD$；④ $\\angle ABC=\\angle ADC$；⑤ $OA=OC$。从中任选两个作为已知，一共 $10$ 种选法。其中能判定四边形 $ABCD$ 是平行四边形的有几种？',
      blanks: [
        { kind: 'num', label: '能判定的选法', answer: '6' },
      ],
      explain: [
        '能的：①②（判定定理）；①③、①④（$AB\\parallel CD$ 得 $\\angle A+\\angle D=180^\\circ$、$\\angle B+\\angle C=180^\\circ$，再换成对角，推出 $AD\\parallel BC$）；①⑤（$\\triangle AOB\\cong\\triangle COD$（ASA），$OB=OD$，对角线互相平分）；③④（两组对角分别相等，内角和推出两组对边平行）。',
        '④⑤ 也能，用反证法：若 $OD\\ne OB$，不妨 $OD>OB$，在线段 $OD$ 上取 $D\'$ 使 $OD\'=OB$，则 $ABCD\'$ 的对角线互相平分，是平行四边形，$\\angle AD\'C=\\angle ABC=\\angle ADC$。但 $D\'$ 在 $\\triangle ACD$ 内部：延长 $AD\'$ 交 $CD$ 于 $G$，由三角形的外角，$\\angle AD\'C>\\angle AGC>\\angle ADC$，矛盾。$OD<OB$ 时在 $OB$ 上取点，同理也矛盾。所以 $OD=OB$，是平行四边形。',
        '不能的：③⑤——作 $AC\\perp BD$、$OA=OC$、$OB\\ne OD$ 的四边形（“筝形”），$BD$ 垂直平分 $AC$，四边形关于 $BD$ 对称，$\\angle BAD=\\angle BCD$，但 $OB\\ne OD$，不是平行四边形。它和 ④⑤ 只差在等角的位置：等角的顶点在对角线 $BD$ 上（④）才行。',
        '②⑤ 的反例：取 $OA=OC=3$，$OD\'=OB=2$，$\\angle AOB=60^\\circ$，先得 ▱$ABCD\'$，$CD\'=AB$。作 $CH\\perp BD\'$ 于 $H$，$\\angle COD\'=60^\\circ$，$OH=\\frac12OC=1.5$，$HD\'=0.5$。在 $OD\'$ 上取 $D$ 使 $HD=HD\'$（$OD=1$），$CH$ 垂直平分 $DD\'$，$CD=CD\'=AB$。四边形 $ABCD$ 中 $AB=CD$、$OA=OC$，但 $OD=1\\ne OB$，不是平行四边形。',
        '②③ 的反例：取等腰 $\\triangle XYZ$（$XY=XZ$），$W$ 是底边 $YZ$ 上不是中点的一点。把 $\\triangle XZW$ 沿 $XW$ 的垂直平分线翻折，$X$、$W$ 互换，$Z$ 落到 $Z\'$，于是 $WZ\'=XZ=XY$，$XZ\'=WZ$，$\\angle XZ\'W=\\angle Z=\\angle Y$。四边形 $YXZ\'W$ 中，一组对边 $YX=Z\'W$，一组对角 $\\angle Y=\\angle Z\'$，另一组对边 $XZ\'=WZ\\ne WY$，不是平行四边形。记 $A=Y$、$B=X$、$C=Z\'$、$D=W$ 就是 ②③ 的反例；记 $A=X$、$B=Y$、$C=W$、$D=Z\'$ 就是 ②④ 的反例。',
        '所以能判定的有 ①②、①③、①④、①⑤、③④、④⑤ 共 $6$ 种。思路：10 种逐一判断，能的要给证明，不能的要构造反例；最难的是 ③⑤ 与 ④⑤ 看上去对称，结论却不同。',
      ],
      verify: () => {
        const S = SVG232;
        // 用对角线描述四边形：O 为原点，A(−a,0)、C(c,0)，B=t·u、D=−s·u（a、c、t、s>0，四边形一定是凸的）
        const quad = (a, c, t, s, f) => { const u = [Math.cos(f), Math.sin(f)]; return { A: [-a, 0], C: [c, 0], B: [t * u[0], t * u[1]], D: [-s * u[0], -s * u[1]] }; };
        const conds = [
          q => S.cross([q.B[0] - q.A[0], q.B[1] - q.A[1]], [q.D[0] - q.C[0], q.D[1] - q.C[1]]),
          q => S.dist(q.A, q.B) - S.dist(q.C, q.D),
          q => (S.ang(q.A, q.D, q.B) - S.ang(q.C, q.B, q.D)) / 57.3,
          q => (S.ang(q.B, q.A, q.C) - S.ang(q.D, q.A, q.C)) / 57.3,
          q => q.C[0] + q.A[0],
        ];
        let seed = 7;
        const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        // 固定 a、t、方向，把 (c, s) 当未知数，用阻尼牛顿法找满足两个条件、但不是平行四边形的解
        const counter = (i, j) => {
          for (const a of [3, 2]) for (const t of [2, 1, 4]) for (const fd of [50, 75, 90, 110, 130]) {
            const f = (fd * Math.PI) / 180, Fn = x => { const q = quad(a, x[0], t, x[1], f); return [conds[i](q), conds[j](q)]; };
            for (let k = 0; k < 30; k++) {
              let x = [0.3 + 5 * rnd(), 0.3 + 5 * rnd()], ok = true;
              for (let it = 0; it < 80; it++) {
                const r = Fn(x), h = 1e-7, J = [[0, 0], [0, 0]];
                for (let m = 0; m < 2; m++) { const y = x.slice(); y[m] += h; const r2 = Fn(y); J[0][m] = (r2[0] - r[0]) / h; J[1][m] = (r2[1] - r[1]) / h; }
                const a11 = J[0][0] ** 2 + J[1][0] ** 2 + 1e-6, a12 = J[0][0] * J[0][1] + J[1][0] * J[1][1], a22 = J[0][1] ** 2 + J[1][1] ** 2 + 1e-6;
                const g1 = J[0][0] * r[0] + J[1][0] * r[1], g2 = J[0][1] * r[0] + J[1][1] * r[1], det = a11 * a22 - a12 * a12;
                x = [x[0] - (a22 * g1 - a12 * g2) / det, x[1] - (a11 * g2 - a12 * g1) / det];
                if (!(x[0] > 0.05 && x[1] > 0.05 && x[0] < 50 && x[1] < 50)) { ok = false; break; }
              }
              if (!ok) continue;
              const q = quad(a, x[0], t, x[1], f), r = Fn(x);
              if (Math.abs(r[0]) + Math.abs(r[1]) < 1e-9 && !S.isPara(q.A, q.B, q.C, q.D) && Math.abs(x[0] - a) + Math.abs(x[1] - t) > 0.05) return true;
            }
          }
          return false;
        };
        let n = 0;
        for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) if (!counter(i, j)) n++;
        return n;
      },
    },
    {
      id: '23.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$\\angle ABC=60^\\circ$，$AB=4$，$BC=6$。(1) 点 $P$ 在边 $BC$ 上，以 $PA$、$PC$ 为邻边作 ▱$PAQC$，求对角线 $PQ$ 长的最小值；(2) 若点 $P$ 改为在边 $AB$ 上运动，以 $PC$、$PD$ 为邻边作 ▱$PCQD$，求对角线 $PQ$ 长的最小值。',
      figure: FIG232.c02,
      blanks: [
        { kind: 'real', label: '(1) 最小值', answer: '2√3', simplest: true },
        { kind: 'real', label: '(2) 最小值', answer: '4√7', simplest: true },
      ],
      explain: [
        '(1) ▱$PAQC$ 的对角线互相平分，$PQ$ 经过 $AC$ 的中点，这个中点也是 ▱$ABCD$ 对角线的交点 $O$，$PQ=2PO$。$P$ 在 $BC$ 上，垂线段最短：$PO\\perp BC$ 时最小。',
        '过 $O$ 作 $BC$ 的垂线，交 $BC$ 于 $K$、交 $AD$ 于 $K\'$。$\\triangle OBK\\cong\\triangle ODK\'$，$OK=\\frac12KK\'$，$KK\'$ 是 $AD$ 与 $BC$ 之间的距离：$\\angle B=60^\\circ$，$AB=4$，$A$ 到 $BC$ 的垂足 $H$ 满足 $BH=2$（$30^\\circ$ 角所对直角边），$AH=2\\sqrt3$。所以 $OK=\\sqrt3$，$PQ$ 最小为 $2\\sqrt3$（$K$ 离 $B$ 为 $4$，在边 $BC$ 上，取得到）。',
        '(2) 同理 $PQ$ 经过 $CD$ 的中点 $N$，$PQ=2PN$。$N$ 到直线 $AB$ 的距离是 $AB$ 与 $CD$ 之间的距离：$C$ 到直线 $AB$ 的垂足 $G$ 满足 $BG=3$，$CG=3\\sqrt3$。',
        '但要看垂足在不在边 $AB$ 上：$C$、$D$ 在直线 $AB$ 上的垂足离 $B$ 分别为 $3$、$3+4=7$（沿 $BA$ 方向），$N$ 的垂足离 $B$ 为 $5$，超出了 $AB=4$，在 $A$ 外侧 $1$ 处。所以 $P$ 越靠近 $A$ 越近，$P=A$ 时最小：$PN=\\sqrt{1^2+(3\\sqrt3)^2}=\\sqrt{28}=2\\sqrt7$，$PQ$ 最小为 $4\\sqrt7$。',
        '坑：(2) 直接用距离得 $6\\sqrt3$。思路：先把“对角线”转成“到中点的距离的 2 倍”，再用垂线段最短，并检查垂足是否落在 $P$ 能到的线段上。',
      ],
      verify: () => {
        const S = SVG232, q = S.para(60, 4, 6);
        let m1 = Infinity, m2 = Infinity;
        for (let i = 0; i <= 600000; i++) {
          const t = i / 600000;
          const P1 = S.at(q.B, q.C, t), Q1 = S.add(q.A, q.C, P1); m1 = Math.min(m1, S.dist(P1, Q1));
          const P2 = S.at(q.A, q.B, t), Q2 = S.add(q.C, q.D, P2); m2 = Math.min(m2, S.dist(P2, Q2));
        }
        return [m1, m2];
      },
    },
    {
      id: '23.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$\\angle BAD=120^\\circ$，$AB=2$，$AD=3$。以 $AB$ 为边作等边 $\\triangle ABE$，以 $AD$ 为边作等边 $\\triangle ADF$（点 $E$ 可以在直线 $AB$ 的任意一侧，点 $F$ 可以在直线 $AD$ 的任意一侧），连接 $CE$、$CF$、$EF$。求 $\\triangle CEF$ 面积的所有可能值（全部填出，用逗号隔开；相同的值只填一次）。',
      figure: FIG232.c03,
      blanks: [
        { kind: 'reals', label: '$S_{\\triangle CEF}=$', answer: ['√3/4', '5√3/4', '19√3/4'], simplest: true },
      ],
      explain: [
        '$\\angle ABC=\\angle ADC=60^\\circ$。$E$ 有“外”（与 $C$ 在 $AB$ 异侧）、“内”两种，$F$ 也有两种，共四种情况。',
        '先看 $E$ 的两个位置：$E$ 在外时 $\\angle EBC=60^\\circ+60^\\circ=120^\\circ$；作 $EG\\perp$ 直线 $CB$ 于 $G$，$\\angle EBG=60^\\circ$，$BG=1$，$EG=\\sqrt3$，$CG=4$，$CE=\\sqrt{16+3}=\\sqrt{19}$。$E$ 在内时，$E$ 与 $C$ 在 $AB$ 同侧，$\\angle EBA=60^\\circ=\\angle CBA$，射线 $BE$ 与射线 $BC$ 重合，$E$ 落在 $BC$ 上；$BE=2<3=BC$，在边 $BC$ 上，$CE=1$。',
        '同理 $F$ 在外时 $\\angle CDF=120^\\circ$，$CF=\\sqrt{19}$（$DF=3$、$DC=2$，作垂线同样算）；$F$ 在内时，$\\angle FDA=60^\\circ=\\angle CDA$，射线 $DF$ 与射线 $DC$ 重合，$F$ 落在射线 $DC$ 上；$DF=3>2=DC$，$F$ 在 $DC$ 的延长线上，$CF=1$。',
        '再求 $EF$：每种情况 $\\angle EAF$ 都能由 $120^\\circ$ 和两个 $60^\\circ$ 加减得到。① 都在外：$\\angle EAF=360^\\circ-120^\\circ-120^\\circ=120^\\circ=\\angle EBC$，又 $EA=EB$、$AF=AD=BC$，$\\triangle EAF\\cong\\triangle EBC$，$EF=CE=\\sqrt{19}$，$\\triangle CEF$ 是边长 $\\sqrt{19}$ 的等边三角形。② 都在内：$CE=CF=1$，$\\angle ECF=180^\\circ-\\angle BCD=60^\\circ$，是边长 $1$ 的等边三角形。',
        '③ $E$ 外 $F$ 内：$\\angle BAF=60^\\circ$，$\\angle EAF=60^\\circ+60^\\circ=120^\\circ=\\angle EBC$，同样 $\\triangle EAF\\cong\\triangle EBC$，$EF=CE=\\sqrt{19}$，而 $CF=1$：等腰三角形，底边 $CF$ 上的高 $=\\sqrt{19-\\frac14}=\\frac{5\\sqrt3}{2}$，面积 $\\frac{5\\sqrt3}{4}$。④ $E$ 内 $F$ 外：与 ③ 对称，$CE=1$，$CF=EF=\\sqrt{19}$，面积也是 $\\frac{5\\sqrt3}{4}$。',
        '边长 $s$ 的等边三角形高为 $\\frac{\\sqrt3}{2}s$，面积 $\\frac{\\sqrt3}{4}s^2$：①为 $\\frac{19\\sqrt3}{4}$，②为 $\\frac{\\sqrt3}{4}$。所以面积为 $\\frac{\\sqrt3}{4}$、$\\frac{5\\sqrt3}{4}$ 或 $\\frac{19\\sqrt3}{4}$。',
        '思路：四种位置分类；关键是找出夹角相等、两边对应相等的三角形用全等求 $EF$（同向时 $\\triangle CEF$ 等边，异向时只是等腰），内侧时还要发现点落在边上。',
      ],
      verify: () => {
        const S = SVG232, A = [0, 0], B = [2, 0], D = S.rot([3, 0], A, 120), C = S.add(B, D, A), vals = [];
        for (const e of [60, -60]) for (const f of [60, -60]) {
          const E = S.rot(B, A, e), Fp = S.rot(D, A, f), v = S.area([C, E, Fp]);
          if (!vals.some(w => Math.abs(w - v) < 1e-9)) vals.push(v);
        }
        return vals;
      },
    },
    {
      id: '23.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '▱$ABCD$ 的两条对角线 $AC$、$BD$ 的长恰好是方程 $x^2-14x+48=0$ 的两个根，且 $AB=\\sqrt{13}$。求 ▱$ABCD$ 的周长和面积。',
      blanks: [
        { kind: 'real', label: '周长', answer: '2√13+2√37', simplest: true },
        { kind: 'real', label: '面积', answer: '12√3', simplest: true },
      ],
      explain: [
        '解方程得两根 $6$、$8$，但哪条对角线是 $6$ 不知道，要分两种。设对角线交于 $O$，作 $BH\\perp AC$ 于 $H$。',
        '① $AC=6$，$BD=8$：$OA=OC=3$，$OB=4$。由 $BH^2=OB^2-OH^2=AB^2-AH^2$，设 $OH=m$（$H$ 在 $O$、$A$ 之间），$16-m^2=13-(3-m)^2$，解得 $m=2$，$BH=2\\sqrt3$。$HC=m+3=5$，$BC=\\sqrt{12+25}=\\sqrt{37}$。面积 $=2S_{\\triangle ABC}=AC\\cdot BH=12\\sqrt3$。',
        '② $AC=8$，$BD=6$：$OA=4$，$OB=3$，$9-m^2=13-(4-m)^2$，$m=\\frac32$，$BH=\\frac{3\\sqrt3}{2}$。$HC=\\frac32+4=\\frac{11}{2}$，$BC=\\sqrt{\\frac{27}{4}+\\frac{121}{4}}=\\sqrt{37}$。面积 $=8\\times\\frac{3\\sqrt3}{2}=12\\sqrt3$。',
        '两种情况结果相同：周长 $=2(\\sqrt{13}+\\sqrt{37})=2\\sqrt{13}+2\\sqrt{37}$，面积 $=12\\sqrt3$。',
        '思路：$\\triangle AOB$ 三边已知但不是直角三角形，作高后用“公共高”列两次勾股定理；对角线谁长谁短要分类，最后发现结果一样。',
      ],
      verify: () => {
        const S = SVG232, disc = 14 * 14 - 4 * 48, r = [(14 - Math.sqrt(disc)) / 2, (14 + Math.sqrt(disc)) / 2], out = [];
        for (const [ac, bd] of [r, [r[1], r[0]]]) {
          const A = [-ac / 2, 0], C = [ac / 2, 0];
          // B 在以 O 为圆心、bd/2 为半径的圆上，找 AB=√13 的位置
          const rad = bd / 2, at = th => [rad * Math.cos(th), rad * Math.sin(th)], g = th => S.dist(A, at(th)) - Math.sqrt(13);
          let lo = 0.001, hi = Math.PI - 0.001;  // AB 随角度单调变化，二分
          for (let it = 0; it < 100; it++) { const m = (lo + hi) / 2; if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m; else hi = m; }
          const B = at(lo);
          const D = [-B[0], -B[1]];
          out.push([2 * (S.dist(A, B) + S.dist(B, C)), S.area([A, B, C, D])]);
        }
        return Math.abs(out[0][0] - out[1][0]) < 1e-4 && Math.abs(out[0][1] - out[1][1]) < 1e-4 ? out[0] : null;
      },
    },
    {
      id: '23.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 ▱$ABCD$ 中，$\\angle DAB$ 是锐角，$AB=8$，$AD=10$，$AB$ 与 $CD$ 之间的距离为 $8$。点 $P$ 在 ▱$ABCD$ 的内部，且 $S_{\\triangle PAB}:S_{\\triangle PCD}=1:3$。求 $PA+PB$ 的最小值，以及取得最小值时 $PC$ 的长。',
      figure: FIG232.c05,
      blanks: [
        { kind: 'real', label: '$PA+PB$ 的最小值', answer: '4√5', simplest: true },
        { kind: 'real', label: '此时 $PC=$', answer: '2√34', simplest: true },
      ],
      explain: [
        '$\\triangle PAB$、$\\triangle PCD$ 的底 $AB=CD$，面积比等于高之比 $1:3$，两高之和是平行线 $AB$、$CD$ 之间的距离 $8$，所以 $P$ 到 $AB$ 的距离是 $2$：$P$ 在与 $AB$ 平行、相距 $2$ 的直线 $l$ 上（在 ▱ 内的那一段）。',
        '作 $A$ 关于 $l$ 的对称点 $A\'$，$AA\'\\perp AB$，$AA\'=4$，$PA+PB=PA\'+PB\\ge A\'B=\\sqrt{4^2+8^2}=4\\sqrt5$，等号在 $P$ 为 $A\'B$ 与 $l$ 的交点时成立。',
        '检验这一点在 ▱ 内部：$l$ 在 $A\'$ 与 $AB$ 正中间，交点是 $A\'B$ 的中点，它到 $AB$ 的距离为 $2$，垂足离 $A$ 为 $4$。$AD=10$、高 $8$，$D$ 的垂足离 $A$ 为 $\\sqrt{10^2-8^2}=6$，所以 $l$ 与 $AD$、$BC$ 的交点的垂足离 $A$ 为 $1.5$、$9.5$，$4$ 在其中，取得到。最小值为 $4\\sqrt5$。',
        '此时求 $PC$：$C$ 的垂足离 $A$ 为 $8+6=14$，到 $AB$ 的距离为 $8$；过 $P$ 作 $AB$ 的平行线、过 $C$ 作 $AB$ 的垂线，得到直角边为 $14-4=10$、$8-2=6$ 的直角三角形，$PC=\\sqrt{100+36}=2\\sqrt{34}$。',
        '思路：先用平行线间的距离把面积条件变成“$P$ 在一条平行线上”，再用轴对称求最短路线，最后检验最优点在不在图形内。',
      ],
      verify: () => {
        const S = SVG232, A = [0, 0], B = [8, 0], D = [Math.sqrt(100 - 64), 8], C = S.add(B, D, A);
        // 先二分出满足面积比的高 y，再在这条线落在 ▱ 内的一段上求 PA+PB 的最小值（它是凸函数）
        const h = y => S.area([[0, y], A, B]) / S.area([[0, y], C, D]) - 1 / 3;
        let lo = 0.001, hi = 7.999;
        for (let it = 0; it < 100; it++) { const m = (lo + hi) / 2; if (Math.sign(h(m)) === Math.sign(h(lo))) lo = m; else hi = m; }
        const y = lo, xl = (D[0] * y) / 8, xr = xl + 8, f = x => S.dist([x, y], A) + S.dist([x, y], B);
        let a = xl, b = xr;
        const df = x => (x - A[0]) / S.dist([x, y], A) + (x - B[0]) / S.dist([x, y], B);  // f 的变化率，单调增，二分找 0（端点处另比较）
        if (df(a) < 0 && df(b) > 0) for (let it = 0; it < 100; it++) { const m = (a + b) / 2; if (df(m) < 0) a = m; else b = m; } else if (df(a) >= 0) b = a; else a = b;
        const bestP = [(a + b) / 2, y], best = f(bestP[0]);
        return [best, S.dist(bestP, C)];
      },
    },
  ],
});
