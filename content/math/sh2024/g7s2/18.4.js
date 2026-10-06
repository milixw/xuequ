'use strict';

// 上海数学七年级下册 · 18.4 线段的垂直平分线
// 知识范围：线段垂直平分线（中垂线）的定义；性质定理（垂直平分线上的点到线段两端距离相等）及其逆定理（到线段两端距离相等的点在垂直平分线上）；尺规作线段的垂直平分线、中点、过一点作已知直线的垂线；三角形三边的垂直平分线交于一点（外心）
// 可以使用：18.1～18.3（等腰、等边三角形的性质与判定，大边对大角、大角对大边）；第 17 章（三边关系、内角和、外角、全等）；第 16 章平行线；第 14 章轴对称、旋转
// 还没学：角平分线的性质定理与内心、“30° 角所对直角边等于斜边的一半”、HL、勾股定理（八年级）；圆和圆周角

const SVG184 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  // 由底边 BC（水平）和两个底角求顶点 A（屏幕坐标，A 在上方）
  apex: (B, C, angB, angC) => SVG184.meet(B, [B[0] + Math.cos((angB * Math.PI) / 180), B[1] - Math.sin((angB * Math.PI) / 180)],
    C, [C[0] - Math.cos((angC * Math.PI) / 180), C[1] - Math.sin((angC * Math.PI) / 180)]),
  // 线段 PQ 的垂直平分线上的另一点（用来和别的直线求交点）
  perp: (P, Q) => { const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]; return [M, [M[0] - (Q[1] - P[1]), M[1] + (Q[0] - P[0])]]; },
  ang: (P, Q, R) => {  // ∠QPR（度）
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180) / Math.PI;
  },
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  // 点 P 关于直线 QR 的对称点
  refl: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    const F = [Q[0] + t * u[0], Q[1] + t * u[1]];
    return [2 * F[0] - P[0], 2 * F[1] - P[1]];
  },
  // 三角形的外心（两条垂直平分线的交点）
  circ: (A, B, C) => { const [m1, n1] = SVG184.perp(A, B), [m2, n2] = SVG184.perp(A, C); return SVG184.meet(m1, n1, m2, n2); },
};

const FIG184 = (() => {
  const S = SVG184, out = {};
  const lab = (A, B, C) => S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6);
  // b02：AB 的垂直平分线交 AB 于 E、交 BC 于 D（按 AB=9、AC=6、BC=10 画，每单位 25px）
  {
    const k = 25, B = [25, 200], C = [25 + 10 * k, 200], ax = (81 - 36 + 100) / 20, A = [B[0] + ax * k, 200 - Math.sqrt(81 - ax * ax) * k];
    const [M, N] = S.perp(A, B), D = S.meet(M, N, B, C), E = M;
    out.b02 = S.wrap(300, 225, S.poly([A, B, C]) + S.seg(D, S.at(D, E, 1.35)) + S.seg(A, D) + lab(A, B, C) + S.text('D', D, 0, 14) + S.text('E', E, -12, -4));
  }
  // b03：∠B=40°，∠ACB=75°，BC 的垂直平分线交 AB 于 D、交 BC 于 E
  {
    const B = [25, 200], C = [275, 200], A = S.apex(B, C, 40, 75), E = S.at(B, C, 0.5), D = S.meet(E, [E[0], 0], A, B);
    out.b03 = S.wrap(300, 225, S.poly([A, B, C]) + S.seg(E, D) + S.seg(C, D) + lab(A, B, C) + S.text('D', D, -12, -2) + S.text('E', E, 0, 14));
  }
  // b05：O 是三边垂直平分线的交点（∠A=60°，∠B=50°，∠C=70°）
  {
    const B = [50, 215], C = [250, 215], A = S.apex(B, C, 50, 70), O = S.circ(A, B, C);
    out.b05 = S.wrap(300, 240, S.poly([A, B, C]) + S.seg(O, A) + S.seg(O, B) + S.seg(O, C) + lab(A, B, C) + S.text('O', O, 0, 15));
  }
  // b07：AB=AC，∠A=28°，AB 的垂直平分线交 AB 于 E、交 AC 于 D
  {
    const B = [110, 225], C = [190, 225], A = S.apex(B, C, 76, 76), [M, N] = S.perp(A, B), D = S.meet(M, N, A, C);
    out.b07 = S.wrap(300, 250, S.poly([A, B, C]) + S.seg(M, D) + S.seg(B, D) + lab(A, B, C) + S.text('D', D, 12, 0) + S.text('E', M, -12, -2));
  }
  // e02：∠BAC=116°，AB、AC 的垂直平分线分别交 BC 于 D、E
  {
    const B = [20, 170], C = [280, 170], A = S.apex(B, C, 30, 34);
    const [m1, n1] = S.perp(A, B), [m2, n2] = S.perp(A, C), D = S.meet(m1, n1, B, C), E = S.meet(m2, n2, B, C);
    out.e02 = S.wrap(300, 195, S.poly([A, B, C]) + S.seg(m1, D) + S.seg(m2, E) + S.seg(A, D) + S.seg(A, E) + lab(A, B, C) + S.text('D', D, 0, 14) + S.text('E', E, 0, 14));
  }
  // e03：∠AOB=38°，P 在角内，P 关于 OA、OB 的对称点 P1、P2，P1P2 交 OA 于 M、交 OB 于 N
  {
    const O = [30, 160], r = (38 * Math.PI) / 180, A = [O[0] + 270, O[1]], B = [O[0] + 220 * Math.cos(r), O[1] - 220 * Math.sin(r)];
    const P = [O[0] + 150 * Math.cos(r * 0.45), O[1] - 150 * Math.sin(r * 0.45)];
    const P1 = S.refl(P, O, A), P2 = S.refl(P, O, B), M = S.meet(P1, P2, O, A), N = S.meet(P1, P2, O, B);
    out.e03 = S.wrap(310, 240, S.seg(O, A) + S.seg(O, B) + S.seg(P, P1, true) + S.seg(P, P2, true) + S.seg(P1, P2) + S.seg(P, M) + S.seg(P, N)
      + S.text('O', O, -10, 4) + S.text('A', A, 4, 14) + S.text('B', B, 10, -4) + S.text('P', P, 12, 2) + S.text('P₁', P1, 0, 14) + S.text('P₂', P2, -6, -12) + S.text('M', M, 4, 14) + S.text('N', N, -12, -4));
  }
  // c02：∠BAC=60°，AD 平分 ∠BAC，AD 的垂直平分线交直线 BC 于 E（按 ∠B=30°、∠C=90° 画，不是解）
  {
    const B = [20, 190], C = [200, 190], A = S.apex(B, C, 30, 90);
    // AD 的方向：∠BAD=30°，由 AB 方向转 30°
    const u = [B[0] - A[0], B[1] - A[1]], t = (-30 * Math.PI) / 180, v = [u[0] * Math.cos(t) - u[1] * Math.sin(t), u[0] * Math.sin(t) + u[1] * Math.cos(t)];
    const D = S.meet(A, [A[0] + v[0], A[1] + v[1]], B, C), [M, N] = S.perp(A, D), E = S.meet(M, N, B, C);
    out.c02 = S.wrap(320, 215, S.poly([A, B, C]) + S.seg(A, D) + S.seg(C, E) + S.seg(A, E) + S.seg(M, E, true)
      + lab(A, B, C) + S.text('D', D, 0, 14) + S.text('E', E, 4, 14));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s2/18.4',
  title: '线段的垂直平分线',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“垂直平分线上的点”配 perpBisector 拖动演示。第 1 轮 e06（折叠求周长）与 b02 同型且偏易，c02 配图正好画成一个解，c03 只分两种情况偏易，卡片 2 例子与 b09 撞车，e02(2) 附加条件不能保证 D、E 在边上；第 2 轮 e06 换成周长差两种方向加“D 在边上”筛选，c02 改为 E 在直线 BC 上先按位置分类、配图改用非解角度，c03 换成“△OBC 等边且 △ABC 等腰”，换卡片例子并修改 e02 措辞，整节通过' },

  intro: [
    {
      title: '垂直平分线上的点',
      body: '过线段中点并且垂直于这条线段的直线，叫作线段的垂直平分线（中垂线），它是线段的对称轴。**定理**：线段的垂直平分线上的任意一点，到线段两个端点的距离相等（用 SAS 证）。拖动下面的点 $P$ 试一试：$P$ 在直线 $l$ 上时 $PA=PB$，离开 $l$ 就不相等了。',
      example: '直线 $l$ 垂直平分线段 $MN$，点 $K$ 在 $l$ 上，$KM=6$，那么 $KN=6$。',
      demo: { type: 'perpBisector' },
    },
    {
      title: '到两端距离相等的点',
      body: '逆定理也成立：与线段两个端点距离相等的点，在这条线段的垂直平分线上（用三线合一证）。所以只要找到两个这样的点，过它们的直线就是垂直平分线。',
      example: '等腰三角形 $PQR$ 中 $PQ=PR$，所以顶点 $P$ 在底边 $QR$ 的垂直平分线上——这也说明了“三线合一”。',
      pitfall: '“垂直平分线上的点到两端距离相等”是性质，“到两端距离相等的点在垂直平分线上”是判定，使用时不要混。',
    },
    {
      title: '尺规作图',
      body: '作线段 $AB$ 的垂直平分线：分别以 $A$、$B$ 为圆心、以同样的长为半径画弧（半径要大于 $AB$ 的一半，两弧才有两个交点），过两个交点作直线。这条直线和 $AB$ 的交点就是 $AB$ 的中点。过一点作已知直线的垂线，也可以先在直线上截出一条以这一点为“等距点”的线段，再作它的垂直平分线。',
      example: '想把一条线段四等分，先作它的中点，再分别作两半的中点。',
    },
    {
      title: '三角形的外心',
      body: '三角形三条边的垂直平分线相交于一点，叫作三角形的外心。理由：两条垂直平分线的交点到三个顶点的距离都相等，它也就在第三条边的垂直平分线上。外心到三个顶点的距离相等。',
      example: '$\\triangle PQR$ 中，$PQ$、$PR$ 的垂直平分线交于点 $K$，$KP=4$，所以 $KQ=KR=4$，$K$ 也在 $QR$ 的垂直平分线上。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '18.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，正确的是（　　）',
      options: [
        '到线段两个端点距离相等的点是这条线段的中点',
        '线段的垂直平分线上的点到这条线段两个端点的距离相等',
        '经过线段中点的直线是这条线段的垂直平分线',
        '垂直于线段的直线是这条线段的垂直平分线',
      ],
      answer: 1,
      explain: [
        'A 错：到两端距离相等的点在垂直平分线上，不一定在线段上，中点只是其中一个。',
        'C、D 错：垂直平分线要同时满足“过中点”和“垂直”两个条件，只满足一个不行。',
        'B 是垂直平分线的性质定理，选 B。坑：选 A，把“在垂直平分线上”缩小成“是中点”。',
      ],
    },
    {
      id: '18.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB$ 的垂直平分线交 $AB$ 于点 $E$，交 $BC$ 于点 $D$，连接 $AD$，$AC=6$，$BC=10$。求 $\\triangle ACD$ 的周长。',
      figure: FIG184.b02,
      blanks: [
        { kind: 'num', label: '周长', answer: '16' },
      ],
      explain: [
        '$D$ 在 $AB$ 的垂直平分线上，所以 $DA=DB$。',
        '$\\triangle ACD$ 的周长 $=AC+CD+DA=AC+CD+DB=AC+BC=6+10=16$。',
        '坑：以为不知道 $AB$ 或 $CD$ 就算不出来；把 $DA$ 换成 $DB$，$CD+DB$ 正好是 $BC$。',
      ],
      verify: () => {
        const S = SVG184, B = [0, 0], C = [10, 0], ax = (81 - 36 + 100) / 20, A = [ax, Math.sqrt(81 - ax * ax)];  // 取 AB=9 画出三角形
        const [M, N] = S.perp(A, B), D = S.meet(M, N, B, C);
        return Math.round((S.dist(A, C) + S.dist(C, D) + S.dist(D, A)) * 1e9) / 1e9;
      },
    },
    {
      id: '18.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=40^\\circ$，$\\angle ACB=75^\\circ$，$BC$ 的垂直平分线交 $AB$ 于点 $D$，交 $BC$ 于点 $E$，连接 $CD$。求 $\\angle ACD$ 的度数。',
      figure: FIG184.b03,
      blanks: [
        { kind: 'angle', label: '$\\angle ACD=$', answer: '35°' },
      ],
      explain: [
        '$D$ 在 $BC$ 的垂直平分线上，$DB=DC$，所以 $\\angle DCB=\\angle B=40^\\circ$（等边对等角）。',
        '$\\angle ACD=\\angle ACB-\\angle DCB=75^\\circ-40^\\circ=35^\\circ$。',
        '坑：把 $\\angle DCB$ 当成 $\\angle ACB$ 的一半。',
      ],
      verify: () => {
        const S = SVG184, B = [0, 200], C = [250, 200], A = S.apex(B, C, 40, 75), E = S.at(B, C, 0.5), D = S.meet(E, [E[0], 0], A, B);
        return Math.round(S.ang(C, A, D) * 1e6) / 1e6 + '°';
      },
    },
    {
      id: '18.4-b04',
      level: 'basic',
      type: 'choice',
      stem: '用尺规作线段 $AB$ 的垂直平分线时，要分别以 $A$、$B$ 为圆心画弧。两次所取的半径应当（　　）',
      options: ['都等于 $AB$ 的长', '相等，并且大于 $\\frac12AB$', '可以不相等，只要都大于 $\\frac12AB$', '相等，并且等于 $\\frac12AB$'],
      answer: 1,
      explain: [
        '两弧的交点要到 $A$、$B$ 的距离相等，才在垂直平分线上，所以两个半径必须相等（C 错）。',
        '半径等于 $\\frac12AB$ 时两弧只在中点处碰到一个点，定不出直线；小于一半时不相交。所以半径要大于 $\\frac12AB$（D 错）。',
        '等于 $AB$ 只是其中一种可以的取法，不是“应当”（A 不对）。选 B。坑：记住了课本的作法，就以为半径必须是 $AB$。',
      ],
    },
    {
      id: '18.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，点 $O$ 是 $\\triangle ABC$ 三边垂直平分线的交点，连接 $OA$、$OB$、$OC$，$\\angle OAB=20^\\circ$，$\\angle OBC=30^\\circ$。求 $\\angle OCA$ 的度数。',
      figure: FIG184.b05,
      blanks: [
        { kind: 'angle', label: '$\\angle OCA=$', answer: '40°' },
      ],
      explain: [
        '外心到三个顶点的距离相等：$OA=OB=OC$，所以 $\\angle OBA=\\angle OAB=20^\\circ$，$\\angle OCB=\\angle OBC=30^\\circ$，$\\angle OAC=\\angle OCA$。',
        '三角形的内角和：$2(20^\\circ+30^\\circ+\\angle OCA)=180^\\circ$，$\\angle OCA=40^\\circ$。',
        '坑：只用了一个等腰三角形，没把六个角都写出来。',
      ],
      verify: () => {
        // 三个角分别是 20+z、20+30、30+z
        for (let z = 1; z < 90; z++) if ((20 + z) + (20 + 30) + (30 + z) === 180) return z + '°';
        return null;
      },
    },
    {
      id: '18.4-b06',
      level: 'basic',
      type: 'choice',
      stem: '过直线 $l$ 外一点 $P$ 作 $l$ 的垂线：以 $P$ 为圆心画弧，交 $l$ 于 $A$、$B$ 两点，再作线段 $AB$ 的垂直平分线。这样作出的直线一定经过点 $P$，依据是（　　）',
      options: [
        '线段的垂直平分线上的点到线段两个端点的距离相等',
        '与线段两个端点距离相等的点在这条线段的垂直平分线上',
        '经过两点有且只有一条直线',
        '同一平面内，过一点有且只有一条直线垂直于已知直线',
      ],
      answer: 1,
      explain: [
        '$PA=PB$（同一条弧的半径），要说明 $P$ 在 $AB$ 的垂直平分线上，用的是逆定理“与线段两个端点距离相等的点在这条线段的垂直平分线上”，选 B。',
        '坑：选 A。A 是由“在垂直平分线上”推出“距离相等”，方向反了。',
      ],
    },
    {
      id: '18.4-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC$，$\\angle A=28^\\circ$，$AB$ 的垂直平分线交 $AB$ 于点 $E$，交 $AC$ 于点 $D$，连接 $BD$。求 $\\angle DBC$ 的度数。',
      figure: FIG184.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle DBC=$', answer: '48°' },
      ],
      explain: [
        '$AB=AC$：$\\angle ABC=\\angle C=\\frac{180^\\circ-28^\\circ}2=76^\\circ$。',
        '$D$ 在 $AB$ 的垂直平分线上，$DA=DB$，$\\angle ABD=\\angle A=28^\\circ$。',
        '$\\angle DBC=76^\\circ-28^\\circ=48^\\circ$。坑：求出 $\\angle ABD=28^\\circ$ 就停下。',
      ],
      verify: () => {
        const S = SVG184, B = [0, 200], C = [100, 200], A = S.apex(B, C, 76, 76), [M, N] = S.perp(A, B), D = S.meet(M, N, A, C);
        return Math.round(S.ang(B, D, C) * 1e6) / 1e6 + '°';
      },
    },
    {
      id: '18.4-b08',
      level: 'basic',
      type: 'choice',
      stem: '平面上有直线 $l$ 和两点 $A$、$B$（$A$、$B$ 不重合）。直线 $l$ 上到 $A$、$B$ 两点距离相等的点有（　　）',
      options: ['恰好 $1$ 个', '$0$ 个或 $1$ 个', '$1$ 个或无数个', '$0$ 个、$1$ 个或无数个'],
      answer: 3,
      explain: [
        '这样的点在 $AB$ 的垂直平分线上，所以就是 $l$ 与 $AB$ 的垂直平分线的公共点。',
        '两条直线相交时有 $1$ 个；$l$ 就是 $AB$ 的垂直平分线时有无数个；$l$ 与垂直平分线平行（即 $AB\\perp l$ 而 $l$ 不过 $AB$ 的中点）时有 $0$ 个。',
        '选 D。坑：只想到一般情况的 $1$ 个。',
      ],
      verify: () => {
        // 三种摆法：l 与 AB 斜交、l 就是 AB 的垂直平分线、AB⊥l 但 l 不过中点
        const count = (A, B, P, Q) => {
          const pts = new Set();
          for (let k = -2000; k <= 2000; k++) {
            const X = SVG184.at(P, Q, k / 100);
            if (Math.abs(SVG184.dist(X, A) - SVG184.dist(X, B)) < 1e-9) pts.add(k);
          }
          return pts.size > 100 ? Infinity : pts.size;
        };
        const res = new Set([count([0, 0], [4, 2], [0, 5], [1, 5]), count([0, 0], [4, 0], [2, -3], [2, 3]), count([0, 0], [4, 0], [3, -3], [3, 3])]);
        return res.has(0) && res.has(1) && res.has(Infinity) ? 3 : -1;
      },
    },
    {
      id: '18.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '点 $P$、$Q$ 不重合，$PA=PB$，$QA=QB$，直线 $PQ$ 与线段 $AB$ 相交于点 $M$，$AB=10$。求 $AM$ 的长和 $\\angle PMA$ 的度数。',
      blanks: [
        { kind: 'num', label: '$AM=$', answer: '5' },
        { kind: 'angle', label: '$\\angle PMA=$', answer: '90°' },
      ],
      explain: [
        '$PA=PB$：$P$ 在 $AB$ 的垂直平分线上；$QA=QB$：$Q$ 也在 $AB$ 的垂直平分线上。两点确定一条直线，直线 $PQ$ 就是 $AB$ 的垂直平分线。',
        '所以 $M$ 是 $AB$ 的中点，$AM=5$，$PQ\\perp AB$，$\\angle PMA=90^\\circ$。',
        '坑：以为 $P$、$Q$ 要在 $AB$ 两侧才行；在同侧也一样。',
      ],
      verify: () => [10 / 2, '90°'],
    },

    // ---------- 扩展 ----------
    {
      id: '18.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '点 $O$ 是 $\\triangle ABC$ 三边垂直平分线的交点，$\\angle BOC=100^\\circ$。求 $\\angle BAC$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BAC=$', answer: ['50', '130'], suffix: '°' },
      ],
      explain: [
        '$OA=OB=OC$。分 $O$ 与 $A$ 在 $BC$ 同侧、异侧两种（$O$ 在 $BC$ 上时 $\\angle BOC=180^\\circ$，不合）。',
        '① 同侧：连接 $AO$ 并延长，$\\angle BOC$ 被分成两块，每块是一个等腰三角形的外角：$\\angle BOC=2\\angle OAB+2\\angle OAC=2\\angle BAC$（$O$ 在 $\\angle BAC$ 内部）。所以 $\\angle BAC=50^\\circ$。（若 $O$ 在 $\\angle BAC$ 外，结论同样成立，可以照样用外角推。）',
        '② 异侧：这时 $\\angle BAC$ 是钝角，$O$ 在 $\\angle BAC$ 内部、在 $BC$ 的另一侧。$\\angle AOB=180^\\circ-2\\angle OAB$，$\\angle AOC=180^\\circ-2\\angle OAC$，$\\angle BOC=\\angle AOB+\\angle AOC=360^\\circ-2\\angle BAC$，所以 $\\angle BAC=130^\\circ$。',
        '所以 $\\angle BAC=50^\\circ$ 或 $130^\\circ$。转弯：外心可能在三角形外，要按它和 $A$ 在 $BC$ 的同侧还是异侧分类。',
      ],
      verify: () => {
        // 对每个顶角，作等腰三角形求外心，量 ∠BOC
        const S = SVG184, r = [];
        for (let a = 1; a < 180; a++) {
          const h = ((a / 2) * Math.PI) / 180, A = [0, 0], B = [-Math.sin(h), Math.cos(h)], C = [Math.sin(h), Math.cos(h)];
          if (a === 90) continue;
          const O = S.circ(A, B, C);
          if (Math.abs(S.ang(O, B, C) - 100) < 1e-6) r.push(a);
        }
        return r;
      },
    },
    {
      id: '18.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB$ 的垂直平分线交 $BC$ 于点 $D$，$AC$ 的垂直平分线交 $BC$ 于点 $E$，连接 $AD$、$AE$。(1) 如图，若 $\\angle BAC=116^\\circ$，$BC=11$，求 $\\angle DAE$ 和 $\\triangle ADE$ 的周长；(2) 若 $\\angle BAC=64^\\circ$，且点 $D$、$E$ 都在线段 $BC$ 上，求 $\\angle DAE$。',
      figure: FIG184.e02,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle DAE=$', answer: '52°' },
        { kind: 'num', label: '周长', answer: '11' },
        { kind: 'angle', label: '(2) $\\angle DAE=$', answer: '52°' },
      ],
      explain: [
        '$DA=DB$，$EA=EC$，所以 $\\angle DAB=\\angle B$，$\\angle EAC=\\angle C$。',
        '(1) $\\angle B+\\angle C=64^\\circ$，$D$、$E$ 都在 $BC$ 上且 $\\angle DAB+\\angle EAC=64^\\circ<116^\\circ$，两个角不重叠，$\\angle DAE=116^\\circ-64^\\circ=52^\\circ$。周长 $=AD+DE+EA=BD+DE+EC=BC=11$。',
        '(2) $\\angle B+\\angle C=116^\\circ>64^\\circ$，$\\angle DAB$ 与 $\\angle EAC$ 有重叠部分，重叠部分就是 $\\angle DAE$：$\\angle DAE=116^\\circ-64^\\circ=52^\\circ$。这时 $E$ 在 $B$、$D$ 之间，周长不再等于 $BC$。',
        '两问都有 $\\angle DAE=|180^\\circ-2\\angle BAC|$。转弯：两个“等腰”角之和与 $\\angle BAC$ 比大小，决定是“剩下”还是“重叠”。坑：(2) 照搬 (1) 写成 $64^\\circ-\\ldots$ 或以为周长也等于 $BC$。',
      ],
      verify: () => {
        const S = SVG184, run = (b, c) => {
          const B = [0, 0], C = [11, 0], A = S.meet(B, [Math.cos((b * Math.PI) / 180), Math.sin((b * Math.PI) / 180)], C, [11 - Math.cos((c * Math.PI) / 180), Math.sin((c * Math.PI) / 180)]);
          const [m1, n1] = S.perp(A, B), [m2, n2] = S.perp(A, C), D = S.meet(m1, n1, B, C), E = S.meet(m2, n2, B, C);
          return { ang: Math.round(S.ang(A, D, E) * 1e6) / 1e6 + '°', per: Math.round((S.dist(A, D) + S.dist(D, E) + S.dist(E, A)) * 1e9) / 1e9 };
        };
        const r1 = run(30, 34), r2 = run(50, 66), r3 = run(60, 56);
        return [r1.ang, r1.per, r2.ang === r3.ang ? r2.ang : null];
      },
    },
    {
      id: '18.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\angle AOB=38^\\circ$，点 $P$ 在 $\\angle AOB$ 内部，点 $P_1$、$P_2$ 分别是 $P$ 关于 $OA$、$OB$ 的对称点，$P_1P_2$ 交 $OA$ 于点 $M$，交 $OB$ 于点 $N$，$P_1P_2=13$。求 $\\triangle PMN$ 的周长和 $\\angle MPN$ 的度数。',
      figure: FIG184.e03,
      blanks: [
        { kind: 'num', label: '周长', answer: '13' },
        { kind: 'angle', label: '$\\angle MPN=$', answer: '104°' },
      ],
      explain: [
        '$P$、$P_1$ 关于 $OA$ 对称，$OA$ 垂直平分 $PP_1$，$M$ 在 $OA$ 上，所以 $MP=MP_1$；同理 $NP=NP_2$，$OP=OP_1=OP_2$。',
        '周长 $=PM+MN+NP=P_1M+MN+NP_2=P_1P_2=13$。',
        '$\\angle P_1OP_2=2\\angle AOB=76^\\circ$（$\\angle P_1OA=\\angle AOP$，$\\angle P_2OB=\\angle BOP$）。$OP_1=OP_2$，$\\angle OP_1P_2=\\angle OP_2P_1=\\frac{180^\\circ-76^\\circ}2=52^\\circ$。',
        '由轴对称，$\\angle OPM=\\angle OP_1M=52^\\circ$，$\\angle OPN=\\angle OP_2N=52^\\circ$，$\\angle MPN=104^\\circ$。转弯：对称轴就是垂直平分线，把三角形的三边“拉直”成 $P_1P_2$，角也一起搬过去。',
      ],
      verify: () => {
        const S = SVG184, O = [0, 0], r = (38 * Math.PI) / 180, A = [10, 0], B = [10 * Math.cos(r), 10 * Math.sin(r)];
        const res = [];
        for (const f of [0.3, 0.5, 0.7]) {
          const P = [4 * Math.cos(r * f), 4 * Math.sin(r * f)], P1 = S.refl(P, O, A), P2 = S.refl(P, O, B), M = S.meet(P1, P2, O, A), N = S.meet(P1, P2, O, B);
          res.push([(S.dist(P, M) + S.dist(M, N) + S.dist(N, P)) / S.dist(P1, P2), S.ang(P, M, N)]);
        }
        const ok = res.every(([k, a]) => Math.abs(k - 1) < 1e-9 && Math.abs(a - res[0][1]) < 1e-6);
        return ok ? [Math.round(13 * res[0][0] * 1e9) / 1e9, Math.round(res[0][1] * 1e6) / 1e6 + '°'] : null;
      },
    },
    {
      id: '18.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$，$\\angle BAC=40^\\circ$，点 $D$ 使 $\\triangle BCD$ 是等边三角形，连接 $AD$。求 $\\angle ADB$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle ADB=$', answer: ['30', '150'], suffix: '°' },
      ],
      explain: [
        '$AB=AC$，$DB=DC$：$A$、$D$ 都在 $BC$ 的垂直平分线上，所以直线 $AD$ 就是 $BC$ 的垂直平分线，也是 $\\angle BAC$ 的平分线所在直线（三线合一），$\\angle BAD=20^\\circ$（$D$ 在射线 $AD$ 上时）。$\\angle ABC=70^\\circ$，$\\angle DBC=60^\\circ$。',
        '① $D$ 与 $A$ 在 $BC$ 同侧：$\\angle DBC=60^\\circ<70^\\circ=\\angle ABC$，$D$ 在 $\\triangle ABC$ 内部，$\\angle ABD=70^\\circ-60^\\circ=10^\\circ$，$\\angle ADB=180^\\circ-20^\\circ-10^\\circ=150^\\circ$。',
        '② $D$ 与 $A$ 在 $BC$ 两侧：$\\angle ABD=70^\\circ+60^\\circ=130^\\circ$，$\\angle ADB=180^\\circ-20^\\circ-130^\\circ=30^\\circ$。',
        '所以 $\\angle ADB=30^\\circ$ 或 $150^\\circ$。转弯：用逆定理说明 $A$、$D$ 在同一条垂直平分线上，才能得到 $\\angle BAD=20^\\circ$；$D$ 的位置要分两侧。',
      ],
      verify: () => {
        const S = SVG184, B = [0, 0], C = [2, 0], A = [1, Math.tan((70 * Math.PI) / 180)], r = [];
        for (const sg of [1, -1]) { const D = [1, sg * Math.sqrt(3)]; r.push(Math.round(S.ang(D, A, B) * 1e6) / 1e6); }
        return r.sort((p, q) => p - q);
      },
    },
    {
      id: '18.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle ABC=35^\\circ$，$AB$ 的垂直平分线与直线 $BC$ 相交于点 $D$，连接 $AD$，$\\angle CAD=15^\\circ$。求 $\\angle ACB$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle ACB=$', answer: ['95', '125'], suffix: '°' },
      ],
      explain: [
        '$DA=DB$，$\\angle BAD=\\angle B=35^\\circ$。$\\angle B$ 是锐角，$D$ 在射线 $BC$ 上，位置是确定的；$C$ 可能在 $D$ 的外侧，也可能在 $B$、$D$ 之间。',
        '① $D$ 在线段 $BC$ 上：$\\angle BAC=\\angle BAD+\\angle DAC=35^\\circ+15^\\circ=50^\\circ$，$\\angle ACB=180^\\circ-35^\\circ-50^\\circ=95^\\circ$。',
        '② $C$ 在 $B$、$D$ 之间：$\\angle BAC=\\angle BAD-\\angle CAD=20^\\circ$，$\\angle ACB=180^\\circ-35^\\circ-20^\\circ=125^\\circ$。',
        '所以 $\\angle ACB=95^\\circ$ 或 $125^\\circ$。转弯：题目没有画图，$D$ 不一定在边 $BC$ 上。坑：只算出 $95^\\circ$。',
      ],
      verify: () => {
        const S = SVG184, B = [0, 0], A = [5 * Math.cos((35 * Math.PI) / 180), 5 * Math.sin((35 * Math.PI) / 180)], [M, N] = S.perp(A, B), D = S.meet(M, N, B, [1, 0]);
        // 把射线 AD 绕 A 转 ±15°，与直线 BC（x 轴）的交点就是 C 的两个可能位置
        const r = [];
        for (const sg of [1, -1]) {
          const u = [D[0] - A[0], D[1] - A[1]], t = (sg * 15 * Math.PI) / 180, v = [u[0] * Math.cos(t) - u[1] * Math.sin(t), u[0] * Math.sin(t) + u[1] * Math.cos(t)];
          if (v[1] >= 0) continue;
          const C = S.meet(A, [A[0] + v[0], A[1] + v[1]], B, [1, 0]);
          if (C[0] > 1e-9) r.push(Math.round(S.ang(C, A, B) * 1e6) / 1e6);
        }
        return r.sort((p, q) => p - q);
      },
    },
    {
      id: '18.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$，$AC$ 的垂直平分线交 $AC$ 于点 $E$，交 $AB$ 于点 $D$（$D$ 在边 $AB$ 上，不与 $A$、$B$ 重合），连接 $CD$。已知 $\\triangle BCD$ 的周长为 $19$，且 $AB$ 与 $BC$ 的长度相差 $3$。求 $\\triangle ABC$ 的周长。',
      blanks: [
        { kind: 'num', label: '周长', answer: '30' },
      ],
      explain: [
        '$D$ 在 $AC$ 的垂直平分线上，$DA=DC$。$\\triangle BCD$ 的周长 $=BC+BD+DC=BC+BD+DA=BC+AB=19$。',
        '“相差 $3$”有两种：① $AB-BC=3$，$AB=11$，$BC=8$；② $BC-AB=3$，$AB=8$，$BC=11$。两组都满足三边关系。',
        '再检验 $D$ 是否在边 $AB$ 上：$DA=DC$，$\\angle DCA=\\angle A$。$D$ 在边 $AB$ 上（不与 $B$ 重合），$\\angle DCA$ 是 $\\angle ACB$ 的一部分，要 $\\angle A<\\angle ACB$；由大角对大边，就是 $BC<AB$。所以 ② 中 $BC=11>AB=8$，$D$ 会落在 $AB$ 的延长线上，舍去。',
        '所以 $AB=AC=11$，$BC=8$，周长 $30$。转弯：周长转化后两种情况都能构成三角形，要用“$D$ 在边 $AB$ 上”结合大角对大边再筛一次。坑：答 $30$ 或 $27$ 两个值。',
      ],
      verify: () => {
        // 两种边长组合，作图检验 AC 的垂直平分线与直线 AB 的交点是否落在线段 AB 内
        const S = SVG184, r = [];
        for (const [ab, bc] of [[11, 8], [8, 11]]) {
          const B = [0, 0], C = [bc, 0], A = [bc / 2, Math.sqrt(ab * ab - (bc * bc) / 4)];
          const [M, N] = S.perp(A, C), D = S.meet(M, N, A, B), t = (D[0] - A[0]) / (B[0] - A[0]);
          if (t > 1e-9 && t < 1 - 1e-9 && Math.abs(bc + S.dist(B, D) + S.dist(D, C) - 19) < 1e-9) r.push(2 * ab + bc);
        }
        return r.length === 1 ? r[0] : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '18.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '等边三角形 $ABC$（$A$ 在上方，$B$ 在左下，$C$ 在右下）绕点 $A$ 按逆时针方向旋转 $\\alpha$（$0^\\circ<\\alpha<360^\\circ$），得到 $\\triangle AB\'C\'$，连接 $BB\'$、$CB\'$。若 $\\triangle BB\'C$ 是等腰三角形，求 $\\alpha$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\alpha=$', answer: ['30', '120', '210', '300'], suffix: '°' },
      ],
      explain: [
        '旋转中 $AB\'=AB=AC=BC$，$\\angle BAB\'=\\alpha$（逆时针转过的角）。$\\alpha=60^\\circ$ 时 $B\'$ 与 $C$ 重合，三角形不存在。按哪两条边相等分三种：',
        '① $B\'B=B\'C$：由逆定理，$B\'$ 在 $BC$ 的垂直平分线上；$AB=AC$，这条垂直平分线也过 $A$，是 $\\angle BAC$ 的平分线所在直线。$B\'$ 在这条直线上、到 $A$ 的距离为 $AB$，有两个位置：在 $A$ 下方时 $\\angle BAB\'=30^\\circ$，$\\alpha=30^\\circ$；在 $A$ 上方时，从 $AB$ 逆时针转到它要转 $30^\\circ+180^\\circ=210^\\circ$。',
        '② $BB\'=BC$：$AB=AB\'=BB\'$，$\\triangle ABB\'$ 是等边三角形，$\\angle BAB\'=60^\\circ$。$B\'$ 在 $AB$ 的逆时针一侧就是 $C$（舍去），在顺时针一侧，逆时针要转 $360^\\circ-60^\\circ=300^\\circ$。',
        '③ $CB\'=CB$：$CA=CB\'=AB\'$，$\\triangle ACB\'$ 是等边三角形，$\\angle CAB\'=60^\\circ$。$B\'$ 与 $B$ 重合（$\\alpha=0^\\circ$，舍去），或者在 $AC$ 的另一侧，$\\alpha=60^\\circ+60^\\circ=120^\\circ$。',
        '所以 $\\alpha=30^\\circ$、$120^\\circ$、$210^\\circ$ 或 $300^\\circ$（四个位置的 $B\'$ 都不在直线 $BC$ 上）。思路：$B\'$ 总在“到 $A$ 距离为 $AB$”的位置上，按等腰分三种，每种都用垂直平分线的逆定理或等边三角形定出 $B\'$，再换算成逆时针转过的角。',
      ],
      verify: () => {
        // A 为原点，B 在 240° 方向、C 在 300° 方向（数学坐标，边长 1）
        const pt = d => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)], B = pt(240), C = pt(300), dd = SVG184.dist;
        const r = [];
        for (let k = 1; k < 720; k++) {
          const al = k / 2, Bp = pt(240 + al), s = [dd(B, Bp), dd(Bp, C), dd(B, C)];
          const cross = (C[0] - B[0]) * (Bp[1] - B[1]) - (C[1] - B[1]) * (Bp[0] - B[0]);
          if (Math.abs(cross) < 1e-9) continue;  // 三点共线
          if (Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9) r.push(al);
        }
        return r;
      },
    },
    {
      id: '18.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle BAC=60^\\circ$，$AD$ 平分 $\\angle BAC$，交 $BC$ 于点 $D$，$AD$ 的垂直平分线交直线 $BC$ 于点 $E$，连接 $AE$。若 $\\triangle ACE$ 是等腰三角形，求 $\\angle B$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG184.c02,
      blanks: [
        { kind: 'nums', label: '$\\angle B=$', answer: ['20', '40', '80', '100'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle B=b$，$\\angle ACB=c$，$b+c=120^\\circ$。$\\angle B=\\angle ACB=60^\\circ$ 时 $AD\\perp BC$，$AD$ 的垂直平分线与 $BC$ 平行，点 $E$ 不存在。所以分 $b<c$ 和 $b>c$ 两种：$EA=ED$ 要求 $\\angle EAD=\\angle EDA$，$E$ 只能在 $D$ 与较大的那个底角的顶点同侧的延长线上，即 $b<c$ 时在 $C$ 外侧，$b>c$ 时在 $B$ 外侧。',
        '① $b<c$，$E$ 在 $BC$ 的延长线上：$EA=ED$，$\\angle EAD=\\angle EDA$。$\\angle EDA$ 是 $\\triangle ABD$ 的外角，$\\angle EDA=b+30^\\circ$；$\\angle EAD=\\angle CAE+30^\\circ$，所以 $\\angle CAE=b$。$\\triangle ACE$ 的三个角：$b$、$\\angle ACE=180^\\circ-c=60^\\circ+b$、$\\angle E=120^\\circ-2b$。等腰：$b=120^\\circ-2b$ 得 $b=40^\\circ$；$60^\\circ+b=120^\\circ-2b$ 得 $b=20^\\circ$。',
        '② $b>c$，$E$ 在 $CB$ 的延长线上：同理 $\\angle EDA=c+30^\\circ$（$\\triangle ACD$ 的外角），$\\angle BAE=c$，$\\angle CAE=c+60^\\circ$。$\\triangle ACE$ 的三个角：$c+60^\\circ$、$\\angle ACE=c$、$\\angle E=120^\\circ-2c$。等腰：$c=120^\\circ-2c$ 得 $c=40^\\circ$，$b=80^\\circ$；$c+60^\\circ=120^\\circ-2c$ 得 $c=20^\\circ$，$b=100^\\circ$。',
        '所以 $\\angle B=20^\\circ$、$40^\\circ$、$80^\\circ$ 或 $100^\\circ$。思路：先按 $E$ 落在哪一侧分类（由 $\\angle B$、$\\angle C$ 的大小决定），每一侧都用“垂直平分线 → 等腰 → 外角”把 $\\angle CAE$ 用已知角表示，再按等腰分类。',
      ],
      verify: () => {
        const S = SVG184, r = [];
        for (let k = 1; k < 240; k++) {
          const b = k / 2, c = 120 - b;
          if (Math.abs(b - c) < 1e-9) continue;
          const B = [0, 0], C = [1, 0], A = S.meet(B, [Math.cos((b * Math.PI) / 180), Math.sin((b * Math.PI) / 180)], C, [1 - Math.cos((c * Math.PI) / 180), Math.sin((c * Math.PI) / 180)]);
          const u = [B[0] - A[0], B[1] - A[1]], t = (30 * Math.PI) / 180, v = [u[0] * Math.cos(t) - u[1] * Math.sin(t), u[0] * Math.sin(t) + u[1] * Math.cos(t)];
          const D = S.meet(A, [A[0] + v[0], A[1] + v[1]], B, C), [M, N] = S.perp(A, D), E = S.meet(M, N, B, C);
          const s = [S.dist(A, C), S.dist(C, E), S.dist(A, E)];
          if (Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9) r.push(b);
        }
        return r;
      },
    },
    {
      id: '18.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '点 $O$ 是 $\\triangle ABC$ 三边垂直平分线的交点，$\\triangle OBC$ 是等边三角形，并且 $\\triangle ABC$ 是等腰三角形。求 $\\angle ABC$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle ABC=$', answer: ['15', '30', '75', '120'], suffix: '°' },
      ],
      explain: [
        '$OA=OB=OC=BC$（外心到三个顶点距离相等，$\\triangle OBC$ 等边），$\\angle OBC=\\angle OCB=60^\\circ$。按哪两条边相等分三种。',
        '① $AB=AC$：由逆定理，$A$ 在 $BC$ 的垂直平分线上，而这条直线也过 $O$。$A$ 在这条直线上、到 $O$ 的距离为 $OB$，有两个位置。$A$ 在 $O$ 的远离 $BC$ 一侧：$\\angle AOB=180^\\circ-30^\\circ=150^\\circ$（$OB$ 与这条直线成 $30^\\circ$），$\\angle OBA=15^\\circ$，$\\angle ABC=60^\\circ+15^\\circ=75^\\circ$。$A$ 在 $BC$ 的另一侧：$\\angle AOB=30^\\circ$，$\\angle OBA=75^\\circ$，$\\angle ABC=75^\\circ-60^\\circ=15^\\circ$。',
        '② $BA=BC$：$BA=BO=OA$，$\\triangle OAB$ 是等边三角形，$\\angle OBA=60^\\circ$。$A$ 不与 $C$ 重合，所以 $A$ 在直线 $OB$ 的另一侧，$\\angle ABC=60^\\circ+60^\\circ=120^\\circ$。',
        '③ $CA=CB$：同理 $\\triangle OAC$ 是等边三角形，$\\angle ACB=120^\\circ$，$\\angle ABC=\\angle BAC=30^\\circ$。',
        '所以 $\\angle ABC=15^\\circ$、$30^\\circ$、$75^\\circ$ 或 $120^\\circ$。思路：外心给出“四条线段都相等”，再按等腰分类；$AB=AC$ 时用逆定理把 $A$ 放到垂直平分线上，还要看 $A$ 在 $BC$ 的哪一侧，$\\angle ABC$ 是两个角的和或差。',
      ],
      verify: () => {
        // O 为原点，B、C 在单位圆上且 ∠BOC=60°；A 在单位圆上扫一圈
        const S = SVG184, pt = d => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)], B = pt(-30), C = pt(30), r = new Set();
        for (let k = 0; k < 7200; k++) {
          const A = pt(k / 20);
          if (S.dist(A, B) < 1e-9 || S.dist(A, C) < 1e-9) continue;
          const s = [S.dist(A, B), S.dist(A, C), S.dist(B, C)];
          if (Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9) r.add(Math.round(S.ang(B, A, C) * 1e6) / 1e6);
        }
        return [...r].sort((p, q) => p - q);
      },
    },
    {
      id: '18.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '点 $O$ 是 $\\triangle ABC$ 三边垂直平分线的交点，连接 $OA$、$OB$、$OC$，$\\angle OAB=40^\\circ$，$\\angle OBC=20^\\circ$。求 $\\angle OCA$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle OCA=$', answer: ['30', '70'], suffix: '°' },
      ],
      explain: [
        '$OA=OB=OC$，三个等腰三角形的底角：$\\angle OAB=\\angle OBA=40^\\circ$，$\\angle OBC=\\angle OCB=20^\\circ$，$\\angle OCA=\\angle OAC=z$。底角都是锐角，所以 $0^\\circ<z<90^\\circ$。$O$ 不能在边上（否则某个底角为 $0^\\circ$）。',
        '① $O$ 在三角形内：每个内角是两个底角之和，$2(40^\\circ+20^\\circ+z)=180^\\circ$，$z=30^\\circ$（三个角 $70^\\circ$、$60^\\circ$、$50^\\circ$）。',
        '② $O$ 在 $BC$ 外侧（与 $A$ 在 $BC$ 两侧）：$\\angle BAC=40^\\circ+z$，$\\angle ABC=40^\\circ-20^\\circ$，$\\angle ACB=z-20^\\circ$，相加 $2z+40^\\circ=180^\\circ$，$z=70^\\circ$，三个角 $110^\\circ$、$20^\\circ$、$50^\\circ$，成立。',
        '③ $O$ 在 $CA$ 外侧：$\\angle ABC=40^\\circ+20^\\circ$，另两角是 $40^\\circ-z$、$20^\\circ-z$，相加 $120^\\circ-2z=180^\\circ$，$z<0$，不可能。④ $O$ 在 $AB$ 外侧：$\\angle ABC=20^\\circ-40^\\circ<0$，不可能。',
        '所以 $\\angle OCA=30^\\circ$ 或 $70^\\circ$。思路：外心的位置决定每个内角是两个底角的和还是差；逐个位置列式，用“每个内角为正、底角为锐角”筛选。',
      ],
      verify: () => {
        // O 为原点，A、B、C 在单位圆上；由底角得圆心角：∠AOB=180°−2·40°，∠BOC=180°−2·20°
        const S = SVG184, pt = d => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)], r = new Set();
        for (const sb of [1, -1]) for (const sc of [1, -1]) {
          const A = pt(0), B = pt(sb * 100), C = pt(sb * 100 + sc * 140);
          if (S.dist(A, C) < 1e-9) continue;
          if (Math.abs(S.ang(B, A, [0, 0]) - 40) < 1e-9 && Math.abs(S.ang(B, C, [0, 0]) - 20) < 1e-9) r.add(Math.round(S.ang(C, A, [0, 0]) * 1e6) / 1e6);
        }
        return [...r].sort((p, q) => p - q);
      },
    },
    {
      id: '18.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，点 $P$ 在 $AB$ 的垂直平分线上运动。(1) 若 $AB=6$，$AC=5$，$BC=7$，求 $PA+PC$ 的最小值，并指出这时点 $P$ 的位置；(2) 若 $AB=6$，$AC=9$，$BC=7$，求 $PA+PC$ 的最小值。',
      blanks: [
        { kind: 'num', label: '(1) 最小值', answer: '7' },
        { kind: 'text', label: '点 $P$ 是', answer: '直线 BC 与 AB 的垂直平分线的交点', options: ['AB 的中点', '直线 BC 与 AB 的垂直平分线的交点', '直线 AC 与 AB 的垂直平分线的交点', '△ABC 三边垂直平分线的交点'] },
        { kind: 'num', label: '(2) 最小值', answer: '9' },
      ],
      explain: [
        '记 $AB$ 的垂直平分线为 $l$。$P$ 在 $l$ 上，$PA=PB$。对 $l$ 上任意一点 $P$，都有两个下界：$PA+PC=PB+PC\\geq BC$，$PA+PC\\geq AC$（三边关系，三点共线时取等号）。',
        '先判断 $C$ 在 $l$ 的哪一侧：若 $C$ 与 $B$ 在 $l$ 同侧，线段 $CA$ 与 $l$ 交于 $R$，$CA=CR+RA=CR+RB>CB$。所以 $CA<CB$ 时 $C$ 与 $A$ 在 $l$ 同侧（$C$ 不在 $l$ 上，因为 $CA\\neq CB$），$CA>CB$ 时 $C$ 与 $B$ 同侧。',
        '(1) $CA=5<CB=7$：$C$ 与 $A$ 同侧，$C$、$B$ 在 $l$ 两侧，线段 $BC$ 与 $l$ 有交点 $P_0$，$P=P_0$ 时 $PB+PC=BC=7$。而 $7$ 是下界，所以最小值是 $7$（比 $AC=5$ 大，$5$ 这个下界取不到：$A$、$C$ 在 $l$ 同侧，$l$ 与线段 $AC$ 不相交）。$P$ 是直线 $BC$ 与 $l$ 的交点。',
        '(2) $CA=9>CB=7$：$C$ 与 $B$ 同侧，$A$、$C$ 在 $l$ 两侧，$l$ 与线段 $AC$ 相交，交点处 $PA+PC=AC=9$，最小值是 $9$。',
        '思路：用垂直平分线把 $PA$ 换成 $PB$，得到两个下界，真正取得到的是较大的那个——$AC$、$BC$ 中较长的一条。坑：直觉上选较短的边。',
      ],
      verify: () => {
        const S = SVG184, run = (ab, ac, bc) => {
          const A = [0, 0], B = [ab, 0], x = (ac * ac - bc * bc + ab * ab) / (2 * ab), C = [x, Math.sqrt(ac * ac - x * x)];
          let best = Infinity, bp = null;
          for (let k = -40000; k <= 40000; k++) { const P = [ab / 2, k / 2000], v = S.dist(P, A) + S.dist(P, C); if (v < best) { best = v; bp = P; } }
          const onBC = Math.abs((C[0] - B[0]) * (bp[1] - B[1]) - (C[1] - B[1]) * (bp[0] - B[0])) < 1e-2;
          return { min: Math.round(best * 1e3) / 1e3, onBC };
        };
        const r1 = run(6, 5, 7), r2 = run(6, 9, 7);
        return [r1.min, r1.onBC ? '直线 BC 与 AB 的垂直平分线的交点' : null, r2.min];
      },
    },
  ],
});
