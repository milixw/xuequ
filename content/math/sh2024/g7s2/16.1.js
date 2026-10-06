'use strict';

// 上海数学七年级下册 · 16.1 相交线
// 知识范围：公理“两点确定一条直线”；相交直线、交点（两条直线相交只有一个交点）；对顶角的定义与定理“对顶角相等”；
//   两条直线的夹角；互相垂直、垂线、垂足；公理“同一平面上过一点有且只有一条直线垂直于已知直线”；垂线段、点到直线的距离；
//   定义、公理、定理、证明的说法，用“∵”“∴”书写推理并在括号里注明依据
// 可以使用：六年级全部（线段、角的和差、余角补角、角平分线、方程与方程组）；七年级上册全部；第 15 章不等式
// 还没学：平行线（16.2）；三角形内角和（17.2）；“垂线段最短”（八年级上册 22.3）；勾股定理（八年级）
// 本节约定：图形都在同一平面上；“两条直线”指不重合的两条直线

// 配图工具：角度用数学方向（0° 向右，逆时针为正），屏幕坐标 y 向下
const SVG161 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  P: ([x, y], d, r) => [x + r * Math.cos((d * Math.PI) / 180), y - r * Math.sin((d * Math.PI) / 180)],
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#2b2b2b"/>`,
  // 从 o 出发的若干条射线 [方向, 长度, 端点字母]
  rays: (o, list) => list.map(([d, r, t]) => SVG161.seg(o, SVG161.P(o, d, r)) + (t ? SVG161.text(t, SVG161.P(o, d, r + 12)) : '')).join(''),
  right: (o, d, s = 10) => {
    const a = SVG161.P(o, d, s), b = SVG161.P(o, d + 90, s), c = SVG161.P(o, d + 45, s * Math.SQRT2);
    return `<polyline points="${a.map(v => v.toFixed(1))} ${c.map(v => v.toFixed(1))} ${b.map(v => v.toFixed(1))}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
  },
  // 角的小弧（从 d1 逆时针到 d2）和角的编号
  arc: (o, d1, d2, r, t) => {
    const a = SVG161.P(o, d1, r), b = SVG161.P(o, d2, r);
    return `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} A${r},${r} 0 0 0 ${b[0].toFixed(1)},${b[1].toFixed(1)}" fill="none" stroke="#2b2b2b" stroke-width="1.1"/>` + (t ? SVG161.text(t, SVG161.P(o, (d1 + d2) / 2, r + 11), 0, -1) : '');
  },
};

const FIG161 = (() => {
  const S = SVG161;
  const o = [130, 100], R = 82, out = {};
  const O = S.dot(o) + S.text('O', o, 4, 14);
  // b02：AB 水平，∠BOC=45°
  out.b02 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [45, R, 'C'], [225, R, 'D']]) + O);
  // b04：Rt△ABC，∠ACB=90°，CD⊥AB
  {
    const C = [40, 160], A = [40, 30], B = [240, 160];
    const t = ((C[0] - A[0]) * (B[0] - A[0]) + (C[1] - A[1]) * (B[1] - A[1])) / ((B[0] - A[0]) ** 2 + (B[1] - A[1]) ** 2);
    const D = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])];
    const dd = (Math.atan2(-(D[1] - C[1]), D[0] - C[0]) * 180) / Math.PI;  // CD 的方向
    out.b04 = S.wrap(280, 190, S.seg(A, B) + S.seg(B, C) + S.seg(C, A) + S.seg(C, D) + S.right(C, 0) + S.right(D, dd + 90)
      + S.text('A', A, -10, -6) + S.text('B', B, 10, 4) + S.text('C', C, -10, 6) + S.text('D', D, 6, -12));
  }
  // b06：OE⊥AB，∠COE=35°
  out.b06 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [90, R - 10, 'E'], [125, R, 'C'], [305, R, 'D']]) + S.right(o, 0) + O);
  // b07：∠AOC=60°，OE 平分 ∠AOD
  out.b07 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [120, R, 'C'], [300, R, 'D'], [240, R - 10, 'E']]) + O);
  // b08：∠AOB=∠COD=90°，OC 在 ∠AOB 内，OB 在 ∠COD 内
  {
    const p = [130, 150];
    out.b08 = S.wrap(260, 180, S.rays(p, [[164, 105, 'A'], [106, 105, 'C'], [74, 105, 'B'], [16, 105, 'D']]) + S.right(p, 74) + S.right(p, 16, 14) + S.dot(p) + S.text('O', p, 0, 14));
  }
  // e01：三条直线交于 O
  out.e01 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [40, R, 'C'], [220, R, 'D'], [100, R, 'E'], [280, R, 'F']]) + O);
  // e02：∠AOC=28°，OE⊥CD，OF 平分 ∠AOE
  out.e02 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [152, R, 'C'], [332, R, 'D'], [62, R - 8, 'E'], [121, R - 14, 'F']]) + S.right(o, 332 + 90 - 360) + O);
  // e03：OE⊥AB，OF 平分 ∠AOD
  out.e03 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [90, R - 10, 'E'], [140, R, 'C'], [320, R, 'D'], [250, R - 10, 'F']]) + S.right(o, 0) + O);
  // e04：网格，A(0,0)、B(4,3)、C(1,4)（y 向上），每格 30px
  {
    const u = 30, ox = 20, oy = 170;
    const g = ([x, y]) => [ox + x * u, oy - y * u];
    let grid = '';
    for (let i = 0; i <= 5; i++) grid += `<line x1="${ox + i * u}" y1="${oy}" x2="${ox + i * u}" y2="${oy - 5 * u}" stroke="#c8c8c8"/><line x1="${ox}" y1="${oy - i * u}" x2="${ox + 5 * u}" y2="${oy - i * u}" stroke="#c8c8c8"/>`;
    const A = g([0, 0]), B = g([4, 3]), C = g([1, 4]);
    out.e04 = S.wrap(200, 190, grid + `<polygon points="${[A, B, C].map(p => p.join(',')).join(' ')}" fill="#cfe3f7" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('A', A, -10, 4) + S.text('B', B, 12, 2) + S.text('C', C, -4, -12));
  }
  // e05：∠AOC=30°
  out.e05 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [150, R, 'C'], [330, R, 'D']]) + O);
  // c02：∠BOD=40°
  out.c02 = S.wrap(260, 200, S.rays(o, [[180, R, 'A'], [0, R, 'B'], [40, R, 'D'], [220, R, 'C']]) + O);
  // c04：Rt△ABC，∠ACB=90°，点 Q 在内部，QE⊥AC、QF⊥BC、QG⊥AB（AC=6，BC=8，每单位 22px）
  {
    const k = 22, C = [30, 170], A = [30, 170 - 6 * k], B = [30 + 8 * k, 170];
    const Q = [30 + 2.2 * k, 170 - 1.6 * k];
    const E = [C[0], Q[1]], Fp = [Q[0], C[1]];
    const t = ((Q[0] - A[0]) * (B[0] - A[0]) + (Q[1] - A[1]) * (B[1] - A[1])) / ((B[0] - A[0]) ** 2 + (B[1] - A[1]) ** 2);
    const G = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])];
    out.c04 = S.wrap(230, 195, S.seg(A, B) + S.seg(B, C) + S.seg(C, A) + S.seg(Q, E, true) + S.seg(Q, Fp, true) + S.seg(Q, G, true) + S.dot(Q) + S.right(C, 0)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 4) + S.text('C', C, -10, 6) + S.text('Q', Q, 8, 4) + S.text('E', E, -10, 0) + S.text('F', Fp, 0, 14) + S.text('G', G, 8, -10));
  }
  return out;
})();

// verify 用：两条射线（方向，度）所成的角（0～180）
const between161 = (d1, d2) => {
  const x = (((d1 - d2) % 360) + 360) % 360;
  return x > 180 ? 360 - x : x;
};

Content.section({
  id: 'math/sh2024/g7s2/16.1',
  title: '相交线',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“对顶角相等”配 vertAngles 动画。第 1 轮 c03（两条垂线位置的四种组合多选）只是一次分类、c04（等积法三问）都是直接套用，只到 4 级，e02 的 OE 位置只靠图确定；第 2 轮 c03 改为填空并叠加方程（∠EOF=3∠BOD−20°），c04 (3) 改为求 x+y+z 的范围（面积等式 + 两次放缩），e02 题干写明 OE 在 AB 上方后判定整节通过。复核认为本节可用知识少，c03 已接近本节难度上限' },

  intro: [
    {
      title: '公理与两条直线的交点',
      body: '从实践中总结、不加证明而承认其正确的基本事实叫作**公理**。公理：经过两点有一条直线，并且只有一条直线（两点确定一条直线）。由它可以推出：两条直线相交，**只有一个**交点——如果有两个交点，过这两点就有两条直线了，与公理矛盾。',
      example: '用两枚钉子就能把木条固定在墙上，因为两点确定一条直线。',
    },
    {
      title: '对顶角相等',
      body: '有公共顶点，并且一个角的两边分别是另一个角两边的**反向延长线**，这样的两个角叫作对顶角。**定理：对顶角相等**——两个角都等于 $180^\\circ$ 减去夹在中间的同一个角。拖动滑块看一看。',
      example: '直线 $AB$、$CD$ 交于 $O$，$\\angle AOC=70^\\circ$，则 $\\angle BOD=70^\\circ$，$\\angle BOC=110^\\circ$。',
      demo: { type: 'vertAngles', start: 40 },
    },
    {
      title: '夹角与垂直',
      body: '两条直线相交成四个角，其中**不大于直角**的那个角叫作这两条直线的**夹角**。夹角是直角时，称两条直线互相**垂直**，记作 $AB\\perp CD$，一条是另一条的垂线，交点叫垂足。',
      example: '两条直线相交所成的一个角是 $140^\\circ$，它们的夹角是 $180^\\circ-140^\\circ=40^\\circ$。',
    },
    {
      title: '垂线与点到直线的距离',
      body: '公理：在同一平面上，经过一点**有且只有一条**直线垂直于已知直线。过直线外一点 $P$ 作 $PO\\perp l$，垂足为 $O$，线段 $PO$ 叫作点 $P$ 到直线 $l$ 的垂线段，**垂线段的长度**叫作点 $P$ 到直线 $l$ 的距离。点在直线上时，距离为 $0$。',
      example: '$PO\\perp l$ 于 $O$，$PO=3$ cm，则点 $P$ 到直线 $l$ 的距离是 $3$ cm。',
    },
    {
      title: '用“∵”“∴”写推理',
      body: '证明要从已知出发，依据定义、公理、定理一步步推出结论。书写时“∵”读作“因为”，“∴”读作“所以”，重要的依据写在结论后的括号里。',
      example: '∵ $AB\\perp CD$，∴ $\\angle AOC=90^\\circ$（垂直的定义）。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '16.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的是（　　）',
      options: ['相等的角是对顶角', '有公共顶点且相等的两个角是对顶角', '两条直线相交所成的四个角中，相等的两个角一定是对顶角', '一对对顶角的平分线在同一条直线上'],
      answer: 3,
      explain: [
        'A、B：相等的角不一定是对顶角，比如两个 $30^\\circ$ 的角可以画在任何位置；有公共顶点也不够，还要两边互为反向延长线。',
        'C：两条直线垂直时，相邻的两个直角也相等，但它们不是对顶角。',
        'D：设对顶角 $\\angle AOC=\\angle BOD$，它们的平分线分别是 $OM$、$ON$。$OM$ 与 $OA$ 成 $\\frac12\\angle AOC$，$ON$ 与 $OB$ 成 $\\frac12\\angle BOD$，而 $OA$、$OB$ 方向相反，所以 $OM$、$ON$ 也方向相反，在同一条直线上。选 D。',
        '坑：C 忽略了垂直时相邻的角也相等。',
      ],
    },
    {
      id: '16.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，$\\angle AOC=3\\angle BOC$。求 $\\angle AOD$ 的度数。',
      figure: FIG161.b02,
      blanks: [
        { kind: 'angle', label: '$\\angle AOD=$', answer: '45°' },
      ],
      explain: [
        '∵ 点 $O$ 在直线 $AB$ 上，∴ $\\angle AOC+\\angle BOC=180^\\circ$。',
        '又 $\\angle AOC=3\\angle BOC$，∴ $4\\angle BOC=180^\\circ$，$\\angle BOC=45^\\circ$。',
        '∵ $\\angle AOD$ 与 $\\angle BOC$ 是对顶角，∴ $\\angle AOD=\\angle BOC=45^\\circ$（对顶角相等）。',
        '坑：$\\angle AOD$ 的对顶角是 $\\angle BOC$，不是 $\\angle AOC$；误配会答成 $135^\\circ$。',
      ],
      verify: () => {
        const boc = 180 / 4;
        return between161(180, 225) === boc ? boc : null;
      },
    },
    {
      id: '16.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '两条直线相交所成的四个角中，有一个角是另一个角的 $4$ 倍。求这两条直线的夹角。',
      blanks: [
        { kind: 'angle', label: '', answer: '36°' },
      ],
      explain: [
        '四个角中，对顶角相等，所以“一个是另一个的 $4$ 倍”的两个角不可能是对顶角，只能是相邻的两个角，它们的和是 $180^\\circ$。',
        '设较小的角为 $x$，则 $x+4x=180^\\circ$，$x=36^\\circ$，另一个是 $144^\\circ$。',
        '夹角是不大于直角的那个角，所以夹角是 $36^\\circ$。坑：答成 $144^\\circ$；夹角要取不大于 $90^\\circ$ 的那个。',
      ],
      verify: () => Math.min(180 / 5, 4 * 180 / 5),
    },
    {
      id: '16.1-b04',
      level: 'basic',
      type: 'choice',
      stem: '如图，$\\angle ACB=90^\\circ$，$CD\\perp AB$，垂足为 $D$。表示点 $A$ 到直线 $CD$ 的距离的是哪条线段的长度？（　　）',
      figure: FIG161.b04,
      options: ['$AC$', '$AD$', '$CD$', '$BD$'],
      answer: 1,
      explain: [
        '点到直线的距离，是这一点到直线的**垂线段**的长度。',
        '∵ $CD\\perp AB$，∴ $AD\\perp CD$，线段 $AD$ 就是点 $A$ 到直线 $CD$ 的垂线段，选 B。',
        '坑：$AC$ 是点 $A$ 到直线 $BC$ 的距离；$CD$ 是点 $C$ 到直线 $AB$ 的距离。先找“过这个点、垂直于这条直线”的线段。',
      ],
    },
    {
      id: '16.1-b05',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的是（　　）',
      options: ['两条直线相交，可能有两个交点', '过直线外一点，可以画无数条直线与已知直线垂直', '点到直线的距离，是指这一点到直线的垂线段', '两条直线相交所成的四个角中，如果有一个是直角，那么这两条直线互相垂直'],
      answer: 3,
      explain: [
        'A：两点确定一条直线，两条直线相交只有一个交点，错误。',
        'B：同一平面上过一点有且只有一条直线垂直于已知直线，错误。',
        'C：距离是垂线段的**长度**，是一个数，不是线段本身，错误。',
        'D：有一个角是直角，夹角就是直角，两条直线互相垂直，正确。选 D。坑：C 把“垂线段”和“垂线段的长度”混为一谈。',
      ],
    },
    {
      id: '16.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，$OE\\perp AB$，$\\angle COE=35^\\circ$。求 $\\angle BOD$ 的度数。',
      figure: FIG161.b06,
      blanks: [
        { kind: 'angle', label: '$\\angle BOD=$', answer: '55°' },
      ],
      explain: [
        '∵ $OE\\perp AB$，∴ $\\angle AOE=90^\\circ$（垂直的定义）。',
        '∴ $\\angle AOC=\\angle AOE-\\angle COE=90^\\circ-35^\\circ=55^\\circ$。',
        '∵ $\\angle BOD$ 与 $\\angle AOC$ 是对顶角，∴ $\\angle BOD=55^\\circ$（对顶角相等）。',
        '坑：直接把 $35^\\circ$ 当成 $\\angle BOD$；或者用 $180^\\circ-55^\\circ$ 得到 $125^\\circ$。',
      ],
      verify: () => between161(0, 305),
    },
    {
      id: '16.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，$OE$ 平分 $\\angle AOD$，$\\angle BOC=2\\angle AOC$。求 $\\angle COE$ 的度数。',
      figure: FIG161.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle COE=$', answer: '120°' },
      ],
      explain: [
        '$\\angle AOC+\\angle BOC=180^\\circ$，$\\angle BOC=2\\angle AOC$，∴ $3\\angle AOC=180^\\circ$，$\\angle AOC=60^\\circ$，$\\angle BOC=120^\\circ$。',
        '$\\angle AOD=\\angle BOC=120^\\circ$（对顶角相等）。∵ $OE$ 平分 $\\angle AOD$，∴ $\\angle AOE=60^\\circ$。',
        '$\\angle COE=\\angle AOC+\\angle AOE=60^\\circ+60^\\circ=120^\\circ$。',
        '坑：只算到 $\\angle AOE=60^\\circ$ 就停下；$\\angle COE$ 跨过了射线 $OA$，要把两部分加起来。',
      ],
      verify: () => between161(120, 240),
    },
    {
      id: '16.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\angle AOB=\\angle COD=90^\\circ$，射线 $OC$ 在 $\\angle AOB$ 内部，射线 $OB$ 在 $\\angle COD$ 内部，$\\angle BOC=32^\\circ$。求 $\\angle AOD$ 的度数。',
      figure: FIG161.b08,
      blanks: [
        { kind: 'angle', label: '$\\angle AOD=$', answer: '148°' },
      ],
      explain: [
        '$\\angle AOC=\\angle AOB-\\angle BOC=90^\\circ-32^\\circ=58^\\circ$。',
        '$\\angle AOD=\\angle AOC+\\angle COD=58^\\circ+90^\\circ=148^\\circ$。',
        '也可以看成 $\\angle AOD=\\angle AOB+\\angle COD-\\angle BOC=180^\\circ-32^\\circ$。坑：两个直角有重叠部分 $\\angle BOC$，不能直接相加得 $180^\\circ$，也不要答成 $58^\\circ$。',
      ],
      verify: () => between161(164, 16),
    },
    {
      id: '16.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '三条直线相交于同一点，图中共有多少对对顶角？（只算小于平角的角）',
      blanks: [
        { kind: 'num', label: '', answer: '6', suffix: '对' },
      ],
      explain: [
        '三条直线交于一点，得到 $6$ 条射线。每两条不共线的射线组成一个小于平角的角：$6$ 条射线两两搭配有 $15$ 种，减去 $3$ 对共线的（组成平角），共 $12$ 个角。',
        '每个角都和它的两边的反向延长线组成的角构成对顶角，$12$ 个角两两配对，共 $6$ 对。',
        '也可以这样数：每两条直线组成 $2$ 对对顶角，三条直线有 $3$ 种两两组合，$3\\times2=6$ 对。坑：只数相邻的小角，得到 $3$ 对。',
      ],
      verify: () => {
        // 三条直线方向 0°、50°、110°，6 条射线；数小于平角的角，再按“两边都反向”配对
        const rays = [0, 50, 110, 180, 230, 290];
        let angles = 0;
        for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (between161(rays[i], rays[j]) < 180) angles++;
        return angles / 2;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '16.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$、$EF$ 相交于点 $O$，$\\angle BOC:\\angle COE:\\angle EOA=2:3:4$。求 $\\angle AOF$ 和 $\\angle DOE$ 的度数。',
      figure: FIG161.e01,
      blanks: [
        { kind: 'angle', label: '$\\angle AOF=$', answer: '100°' },
        { kind: 'angle', label: '$\\angle DOE=$', answer: '120°' },
      ],
      explain: [
        '三个角拼成平角 $\\angle AOB$：设它们分别为 $2x$、$3x$、$4x$，$9x=180^\\circ$，$x=20^\\circ$，得 $\\angle BOC=40^\\circ$，$\\angle COE=60^\\circ$，$\\angle EOA=80^\\circ$。',
        '$\\angle AOF$ 与 $\\angle EOA$ 是邻补角（$E$、$O$、$F$ 共线）：$\\angle AOF=180^\\circ-80^\\circ=100^\\circ$。也可以看成 $\\angle AOF=\\angle BOE=\\angle BOC+\\angle COE=100^\\circ$（对顶角相等）。',
        '$\\angle DOE=180^\\circ-\\angle COE=180^\\circ-60^\\circ=120^\\circ$（$C$、$O$、$D$ 共线）。',
        '转弯：要先认清哪几条射线共线，再决定用“对顶角相等”还是“和为 $180^\\circ$”。',
      ],
      verify: () => [between161(180, 280), between161(220, 100)],
    },
    {
      id: '16.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，射线 $OE\\perp CD$ 且在直线 $AB$ 的上方，$OF$ 平分 $\\angle AOE$，$\\angle AOC=28^\\circ$。求 $\\angle DOF$ 的度数。',
      figure: FIG161.e02,
      blanks: [
        { kind: 'angle', label: '$\\angle DOF=$', answer: '149°' },
      ],
      explain: [
        '∵ $OE\\perp CD$，∴ $\\angle COE=90^\\circ$。∴ $\\angle AOE=\\angle AOC+\\angle COE=28^\\circ+90^\\circ=118^\\circ$。',
        '∵ $OF$ 平分 $\\angle AOE$，∴ $\\angle AOF=59^\\circ$，$\\angle COF=\\angle AOF-\\angle AOC=59^\\circ-28^\\circ=31^\\circ$。',
        '$C$、$O$、$D$ 共线，∴ $\\angle DOF=180^\\circ-\\angle COF=180^\\circ-31^\\circ=149^\\circ$。',
        '转弯：$OF$ 落在 $OC$ 和 $OE$ 之间，要先求出它和 $OC$ 的夹角，再用平角求 $\\angle DOF$。',
      ],
      verify: () => between161(332, 121),
    },
    {
      id: '16.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，$OE\\perp AB$，$OF$ 平分 $\\angle AOD$，$\\angle EOF=4\\angle AOC$。求 $\\angle BOF$ 的度数。',
      figure: FIG161.e03,
      blanks: [
        { kind: 'angle', label: '$\\angle BOF=$', answer: '110°' },
      ],
      explain: [
        '设 $\\angle AOC=x$。$\\angle AOD=180^\\circ-x$，$OF$ 平分它，$\\angle AOF=90^\\circ-\\frac{x}{2}$。',
        '$\\angle EOF=\\angle EOA+\\angle AOF=90^\\circ+90^\\circ-\\frac x2=180^\\circ-\\frac x2$。',
        '由 $\\angle EOF=4\\angle AOC$：$180^\\circ-\\frac x2=4x$，$x=40^\\circ$。',
        '$\\angle AOF=90^\\circ-20^\\circ=70^\\circ$，$\\angle BOF=180^\\circ-70^\\circ=110^\\circ$。转弯：设未知角，把 $\\angle EOF$ 用它表示出来列方程。',
      ],
      verify: () => {
        for (let x = 1; x < 90; x++) if (180 - x / 2 === 4 * x) return between161(0, 180 + (180 - x) / 2);
        return null;
      },
    },
    {
      id: '16.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在每个小正方形边长为 $1$ 的网格中，$A$、$B$、$C$ 都是格点，已知 $AB=5$。求点 $C$ 到直线 $AB$ 的距离。',
      figure: FIG161.e04,
      blanks: [
        { kind: 'num', label: '', answer: '13/5' },
      ],
      explain: [
        '点 $C$ 到直线 $AB$ 的距离 $h$ 是 $\\triangle ABC$ 中 $AB$ 边上的高，可以先求面积，再用“面积 $=\\frac12\\times AB\\times h$”求 $h$。',
        '用割补法求面积：把三角形放进 $4\\times4$ 的正方形（面积 $16$），减去周围三个直角三角形：$\\frac12\\times1\\times4=2$，$\\frac12\\times4\\times3=6$，$\\frac12\\times3\\times1=\\frac32$。',
        '$S_{\\triangle ABC}=16-2-6-\\frac32=\\frac{13}{2}$。',
        '$\\frac12\\times5\\times h=\\frac{13}{2}$，$h=\\frac{13}{5}$。转弯：斜着的距离量不出来，用“同一个三角形面积的两种算法”（等积法）求。',
      ],
      verify: () => {
        const A = [0, 0], B = [4, 3], C = [1, 4];
        const area = F(Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]))).div(2);
        return area.mul(2).div(5);
      },
    },
    {
      id: '16.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，$\\angle AOC=30^\\circ$。射线 $OM$ 从 $OA$ 出发，绕点 $O$ 按逆时针方向以每秒 $10^\\circ$ 的速度旋转一周后停止。旋转多少秒时，$OM\\perp CD$？（全部填出，用逗号隔开）',
      figure: FIG161.e05,
      blanks: [
        { kind: 'nums', label: '', answer: ['6', '24'], suffix: '秒' },
      ],
      explain: [
        '$OM\\perp CD$ 时，$OM$ 与 $OC$ 或 $OD$ 成 $90^\\circ$，有两个位置。',
        '图中逆时针从 $OA$ 转向 $OD$ 一侧：$\\angle AOD=180^\\circ-30^\\circ=150^\\circ$。第一个垂直的位置在 $OA$ 与 $OD$ 之间，离 $OD$ 还差 $90^\\circ$，转过的角为 $\\angle AOD-90^\\circ=60^\\circ$，用时 $6$ 秒。',
        '第二个位置与第一个方向相反，再转 $180^\\circ$，共转 $240^\\circ$，用时 $24$ 秒。',
        '转一周共 $36$ 秒，只有这两个时刻。转弯：先确定逆时针转向哪一侧，再找垂直的两个位置；两个位置相差 $180^\\circ$。',
      ],
      verify: () => {
        // 方向：OA 在 180°，OC 在 150°，CD 的方向 150°/330°；OM 方向 180+10t
        const r = [];
        for (let t = 0; t <= 36; t++) if (between161(180 + 10 * t, 150) === 90) r.push(t);
        return r;
      },
    },
    {
      id: '16.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '直线 $AB$、$CD$ 相交于点 $O$，射线 $OE\\perp AB$，$\\angle COE:\\angle AOD=2:7$。求 $\\angle BOC$ 的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BOC=$', answer: ['126', '70'], suffix: '°' },
      ],
      explain: [
        '没有图，要分情况。设 $\\angle AOC=x$（$0^\\circ<x<180^\\circ$），则 $\\angle AOD=180^\\circ-x$。$OE$ 在 $AB$ 的某一侧，按 $OC$ 与 $OE$ 是否在 $AB$ 的同一侧、以及 $\\angle AOC$ 是锐角还是钝角讨论 $\\angle COE$。',
        '① $OC$、$OE$ 在 $AB$ 同侧且 $x<90^\\circ$：$OC$ 在 $OA$、$OE$ 之间，$\\angle COE=90^\\circ-x$。$\\frac{90^\\circ-x}{180^\\circ-x}=\\frac27$，$x=54^\\circ$，$\\angle BOC=126^\\circ$。',
        '② $OC$、$OE$ 在 $AB$ 同侧且 $x>90^\\circ$：$OE$ 在 $OA$、$OC$ 之间，$\\angle COE=x-90^\\circ$。$\\frac{x-90^\\circ}{180^\\circ-x}=\\frac27$，$x=110^\\circ$，$\\angle BOC=70^\\circ$。',
        '③ $OC$、$OE$ 在 $AB$ 两侧：$\\angle COE=90^\\circ+x$ 或 $270^\\circ-x$ 中不超过 $180^\\circ$ 的那个，都比 $\\angle AOD=180^\\circ-x$ 的 $\\frac27$ 大（$90^\\circ+x>\\frac27(180^\\circ-x)$ 总成立；$x>90^\\circ$ 时 $270^\\circ-x>90^\\circ>\\frac27\\times90^\\circ$），不可能。',
        '所以 $\\angle BOC=126^\\circ$ 或 $70^\\circ$。转弯：无图题要画出所有可能的位置，逐一列方程并检验。',
      ],
      verify: () => {
        // A 在 180°，B 在 0°，E 在 90°；C 的方向 c 取遍 0～359 的整数（以 1/2 度细分）
        const r = new Set();
        for (let k = 0; k < 720; k++) {
          const c = k / 2;
          if (c % 180 === 0) continue;
          const coe = between161(c, 90), aod = between161(180, c + 180);
          if (Math.abs(coe * 7 - aod * 2) < 1e-9) r.add(between161(0, c));
        }
        return [...r];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '16.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '平面上有 $4$ 条直线，任意两条都相交（交点可以重合）。(1) 若 $4$ 条直线交于同一点，图中共有多少对对顶角？(2) 若任意三条直线都不交于同一点，共有多少对对顶角？(3) $10$ 条直线两两相交，交点重合的情况任意，共有多少对对顶角？（只算小于平角的角）',
      blanks: [
        { kind: 'num', label: '(1)', answer: '12', suffix: '对' },
        { kind: 'num', label: '(2)', answer: '12', suffix: '对' },
        { kind: 'num', label: '(3)', answer: '90', suffix: '对' },
      ],
      explain: [
        '(1) $4$ 条直线交于一点，有 $8$ 条射线。两两搭配 $28$ 种，去掉 $4$ 对共线的，得 $24$ 个小于平角的角，配成 $12$ 对对顶角。',
        '(2) 任意三条不共点时，$4$ 条直线两两相交有 $6$ 个交点，每个交点处只有两条直线，形成 $2$ 对对顶角，共 $6\\times2=12$ 对。',
        '两种情况答案相同，这不是巧合。换个角度数：一对对顶角总是由**两条直线**交出来的，而每两条直线不论交在哪里，都恰好贡献 $2$ 对对顶角（交点重合时，同一点上不同的两条直线交出的角仍各自成对，不会多也不会少）。',
        '所以对顶角的对数只取决于直线有几种两两组合：$n$ 条直线有 $\\frac{n(n-1)}{2}$ 种组合，共 $n(n-1)$ 对。验证：$4\\times3=12$。',
        '(3) $10\\times9=90$ 对，与交点是否重合无关。思路：先分别数两种极端情况，发现一样，再找“按两条直线配对”这个不变的计数方式推广到一般情况。',
      ],
      verify: () => {
        // 共点：n 条直线的 2n 条射线中，小于平角的角两两配对
        const concurrent = n => {
          const rays = [];
          for (let i = 0; i < n; i++) { const d = (i * 180) / n + 7; rays.push(d, d + 180); }
          let k = 0;
          for (let i = 0; i < rays.length; i++) for (let j = i + 1; j < rays.length; j++) if (between161(rays[i], rays[j]) < 180) k++;
          return k / 2;
        };
        const general = n => 2 * ((n * (n - 1)) / 2);
        return concurrent(4) === general(4) && concurrent(10) === general(10) ? [concurrent(4), general(4), concurrent(10)] : null;
      },
    },
    {
      id: '16.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，直线 $AB$、$CD$ 相交于点 $O$，$\\angle BOD=40^\\circ$。射线 $OM$ 从 $OB$ 出发，绕点 $O$ 逆时针以每秒 $6^\\circ$ 旋转；同时射线 $ON$ 从 $OD$ 出发，绕点 $O$ 顺时针以每秒 $4^\\circ$ 旋转。当 $OM$ 转完一周时两条射线同时停止。(1) 求 $OM\\perp ON$ 的所有时刻；(2) 求 $OM$ 恰好平分 $\\angle BON$ 的所有时刻。（单位：秒，全部填出，用逗号隔开）',
      figure: FIG161.c02,
      blanks: [
        { kind: 'nums', label: '(1)', answer: ['13', '31', '49'] },
        { kind: 'nums', label: '(2)', answer: ['5/2', '95/2'] },
      ],
      explain: [
        '用“从 $OB$ 起逆时针量的度数”表示射线位置：$OM$ 在 $6t$，$ON$ 在 $40-4t$（负数表示在 $OB$ 顺时针一侧），$0\\leq t\\leq60$。',
        '(1) 两条射线逆时针方向相差 $6t-(40-4t)=10t-40$ 度。垂直就是相差 $90^\\circ$ 或 $270^\\circ$（再加整圈也一样）：$10t-40=90,270,450$，得 $t=13,31,49$；$10t-40=630$ 时 $t=67$，超过 $60$。',
        '(2) $\\angle BON$ 指 $OB$、$ON$ 组成的小于平角的那个角（$t=55$ 时 $ON$ 与 $OB$ 反向，是平角，不考虑），$ON$ 转到不同位置，这个角“开口”的一侧会变：',
        '当 $0\\leq t<10$ 时，$ON$ 在 $OB$ 逆时针一侧，$\\angle BON=40-4t$，平分线在 $20-2t$。由 $6t=20-2t$ 得 $t=\\frac52$。',
        '当 $10<t<55$ 时，$ON$ 转到 $OB$ 顺时针一侧，$\\angle BON=4t-40$，平分线在 $OB$ 顺时针 $2t-20$ 度处，即逆时针 $360-(2t-20)=380-2t$ 度。由 $6t=380-2t$ 得 $t=\\frac{95}{2}$，此时 $\\angle BON=150^\\circ$，符合。',
        '当 $55<t\\leq60$ 时，$\\angle BON$ 又换成从 $OB$ 逆时针量（$400-4t$ 度，不到 $180^\\circ$），平分线在 $200-2t$，而 $OM$ 在 $6t\\geq330$，不可能重合。所以 $t=\\frac52$ 或 $\\frac{95}{2}$。',
        '关键：(2) 中“平分 $\\angle BON$”要先弄清 $\\angle BON$ 指哪一侧的角，随 $ON$ 的位置分段；每段列方程后检验解是否在这一段内。',
      ],
      verify: () => {
        const mod = x => ((x % 360) + 360) % 360;
        const perp = [], bis = [];
        for (let k = 0; k <= 1200; k++) {
          const t = k / 20, m = mod(6 * t), n = mod(40 - 4 * t);
          if (Math.abs(between161(m, n) - 90) < 1e-9) perp.push(t);
          if (n === 0 || n === 180) continue;
          // ∠BON 的平分线方向：ON 在上半平面时为 n/2，否则为 (n+360)/2
          const b = n < 180 ? n / 2 : (n + 360) / 2;
          if (Math.abs(mod(m - b)) < 1e-9 || Math.abs(mod(m - b) - 360) < 1e-9) bis.push(t);
        }
        return [perp, bis.map(t => F(Math.round(t * 2)).div(2))];
      },
    },
    {
      id: '16.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '直线 $AB$、$CD$ 相交于点 $O$，且不互相垂直。射线 $OE\\perp AB$，射线 $OF\\perp CD$（$OE$、$OF$ 各在哪一侧不确定）。若 $\\angle EOF=3\\angle BOD-20^\\circ$，求 $\\angle AOC$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle AOC=$', answer: ['10', '50'], suffix: '°' },
      ],
      explain: [
        '第一步：弄清 $\\angle EOF$ 和 $\\angle AOC$ 的关系。设 $\\angle AOC=\\alpha$，则 $\\angle BOD=\\alpha$（对顶角相等）。$OE$ 可以在 $AB$ 的两侧，$OF$ 也可以在 $CD$ 的两侧，共四种组合，要画图逐一看。',
        '以 $OA$ 方向为 $0^\\circ$ 逆时针量，$OC$ 在 $\\alpha$。$OE$ 在 $90^\\circ$ 或 $-90^\\circ$，$OF$ 在 $\\alpha+90^\\circ$ 或 $\\alpha-90^\\circ$。$OE$、$OF$ 朝同一旋转方向偏离时（$90^\\circ$ 与 $\\alpha+90^\\circ$，或 $-90^\\circ$ 与 $\\alpha-90^\\circ$），$\\angle EOF=\\alpha$；朝相反方向时，$\\angle EOF=180^\\circ-\\alpha$。',
        '说理：同向时，$\\angle EOF$ 与 $\\angle AOC$ 都等于“$\\angle AOF$ 去掉一个 $90^\\circ$ 后剩下的部分”（同角的余角相等的推广）；反向时 $OE$ 换成了它的反向延长线，角变成原来的补角。',
        '第二步：分两种情况列方程。① $\\angle EOF=\\alpha$：$\\alpha=3\\alpha-20^\\circ$，$\\alpha=10^\\circ$。② $\\angle EOF=180^\\circ-\\alpha$：$180^\\circ-\\alpha=3\\alpha-20^\\circ$，$\\alpha=50^\\circ$。',
        '两个值都不是 $90^\\circ$，符合“不垂直”，所以 $\\angle AOC=10^\\circ$ 或 $50^\\circ$。关键：射线有方向，$\\angle EOF$ 随两条垂线所在的一侧变化，只看一张图会漏掉一个答案。',
      ],
      verify: () => {
        const r = new Set();
        for (let k = 1; k < 360; k++) {
          const a = k / 2;
          if (a === 90 || a >= 180) continue;
          for (const e of [90, -90]) for (const f of [a + 90, a - 90]) {
            const eof = between161(e, f), bod = between161(180, a + 180);
            if (Math.abs(eof - (3 * bod - 20)) < 1e-9) r.add(a);
          }
        }
        return [...r];
      },
    },
    {
      id: '16.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$AC=6$，$BC=8$，$AB=10$。(1) 求点 $C$ 到直线 $AB$ 的距离；(2) 点 $Q$ 在三角形内部，$Q$ 到 $AC$、$BC$、$AB$ 的距离分别为 $x$、$y$、$z$（如图中 $QE$、$QF$、$QG$），求 $3x+4y+5z$ 的值；(3) 求 $x+y+z$ 的取值范围。',
      figure: FIG161.c04,
      blanks: [
        { kind: 'num', label: '(1)', answer: '24/5' },
        { kind: 'num', label: '(2)', answer: '24' },
        { kind: 'num', label: '(3)', answer: '24/5', suffix: '$<x+y+z<$' },
        { kind: 'num', label: '', answer: '8' },
      ],
      explain: [
        '(1) $S_{\\triangle ABC}=\\frac12\\times AC\\times BC=24$。设 $C$ 到 $AB$ 的距离为 $h$，又有 $S=\\frac12\\times AB\\times h=5h$，所以 $h=\\frac{24}{5}$。',
        '(2) 连接 $QA$、$QB$、$QC$，把 $\\triangle ABC$ 分成三个三角形，它们分别以 $AC$、$BC$、$AB$ 为底，高就是 $x$、$y$、$z$：',
        '$S_{\\triangle QAC}+S_{\\triangle QBC}+S_{\\triangle QAB}=\\frac12\\times6x+\\frac12\\times8y+\\frac12\\times10z=3x+4y+5z$。三块拼起来正好是整个三角形，所以 $3x+4y+5z=24$，不论 $Q$ 在内部哪里。',
        '(3) 设 $s=x+y+z$。用 (2) 的等式凑出 $s$：$5s=(3x+4y+5z)+2x+y=24+2x+y$。$Q$ 在内部，$x>0$，$y>0$，所以 $5s>24$，$s>\\frac{24}{5}$。',
        '另一边：$3s=(3x+4y+5z)-y-2z=24-y-2z$，$y>0$，$z>0$，所以 $3s<24$，$s<8$。',
        '所以 $\\frac{24}{5}<x+y+z<8$。两端取不到：$Q$ 越靠近 $C$，$s$ 越接近 $\\frac{24}{5}$（这时 $x$、$y$ 接近 $0$，$z$ 接近 (1) 的答案）；越靠近 $B$，$s$ 越接近 $8$。',
        '思路：距离量不出来时，用“同一块面积的两种算法”；(2) 得到一个与位置无关的等式，(3) 再把要求的式子用它“凑”出来，剩下的部分用不等式的性质放缩。',
      ],
      verify: () => {
        const area = F(6 * 8).div(2);
        // 在三角形内部取几个点（C 为原点，CA 沿 y 轴、CB 沿 x 轴），用坐标算三个距离
        const pts = [[F(2), F(1)], [F(1), F(3)], [F(11).div(4), F(3).div(2)]];
        const vals = pts.map(([px, py]) => {
          const x = px, y = py;                                    // 到 AC（y 轴）、BC（x 轴）的距离
          const z2area = F(48).sub(F(6).mul(px)).sub(F(8).mul(py)); // 2·S△QAB = 48 − 6px − 8py（由面积差）
          const z = z2area.div(10);
          return F(3).mul(x).add(F(4).mul(y)).add(F(5).mul(z));
        });
        // x+y+z 的范围：在内部的格点上算，看是否都在 (24/5, 8) 内，并且靠近 C、B 时分别接近两端
        const sOf = (px, py) => px.add(py).add(F(48).sub(F(6).mul(px)).sub(F(8).mul(py)).div(10));
        const inside = [];
        for (let i = 1; i < 80; i++) for (let j = 1; j < 60; j++) {
          const px = F(i).div(10), py = F(j).div(10);
          if (F(6).mul(px).add(F(8).mul(py)).cmp(48) < 0) inside.push(sOf(px, py));
        }
        const ok = inside.every(v => v.cmp(F(24).div(5)) > 0 && v.cmp(8) < 0);
        const nearC = sOf(F(1).div(1000), F(1).div(1000)), nearB = sOf(F(7999).div(1000), F(1).div(10000));
        const lo = F(24).div(5), hi = F(8);
        return vals.every(v => v.eq(vals[0])) && ok && nearC.sub(lo).cmp(F(1).div(100)) < 0 && hi.sub(nearB).cmp(F(1).div(100)) < 0 ? [area.mul(2).div(10), vals[0], lo, hi] : null;
      },
    },
    {
      id: '16.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '钟面上，把时针、分针都看作射线，它们所在的两条直线也有夹角。在 $3$ 点到 $4$ 点之间（不含 $3$ 点和 $4$ 点）：(1) 时针、分针所在的直线互相垂直时，是 $3$ 点几分？(2) 时针、分针所在直线的夹角为 $60^\\circ$ 的时刻共有几个？',
      blanks: [
        { kind: 'num', label: '(1) $3$ 点', answer: '360/11', suffix: '分' },
        { kind: 'num', label: '(2)', answer: '3', suffix: '个' },
      ],
      explain: [
        '设 $3$ 点过了 $t$ 分（$0<t<60$）。分针每分转 $6^\\circ$，时针每分转 $0.5^\\circ$。以 $12$ 点方向为起点顺时针量：分针在 $6t$，时针在 $90+0.5t$。分针比时针多转 $d=5.5t-90$ 度，$-90<d<240$。',
        '两条**射线**所成的角由 $d$ 决定；两条**直线**的夹角还要考虑射线反向：$d$ 与 $d\\pm180$ 对应同一对直线。所以直线夹角为 $90^\\circ$ 时，$d=\\pm90$ 或 $d=270$ 等；夹角为 $60^\\circ$ 时，$d$ 可以是 $\\pm60$、$\\pm120$、$240$ 等。',
        '(1) 在 $-90<d<240$ 内，$d=90$（$d=-90$ 对应 $3$ 点整，不算）。$5.5t-90=90$，$t=\\frac{360}{11}=32\\frac{8}{11}$。',
        '(2) $d$ 可取 $-60$、$60$、$120$（$240$ 正好对应 $4$ 点整，不算）：$t=\\frac{60}{11}$、$\\frac{300}{11}$、$\\frac{420}{11}$，共 $3$ 个。',
        '关键：射线之间的角只看 $d$ 除以 $360$ 的余数，直线的夹角要看 $d$ 除以 $180$ 的余数；两者的区别正是“射线有方向、直线没有方向”。',
      ],
      verify: () => {
        const lineAng = d => { const x = ((d % 180) + 180) % 180; return Math.min(x, 180 - x); };
        const perp = [], sixty = [];
        for (let k = 1; k < 660; k++) {  // t = k/11 分，覆盖所有可能的答案
          const t = k / 11, d = 5.5 * t - 90;
          if (Math.abs(lineAng(d) - 90) < 1e-9) perp.push(k);
          if (Math.abs(lineAng(d) - 60) < 1e-9) sixty.push(k);
        }
        return perp.length === 1 ? [F(perp[0]).div(11), sixty.length] : null;
      },
    },
  ],
});
