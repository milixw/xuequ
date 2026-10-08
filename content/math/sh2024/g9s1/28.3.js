'use strict';

// 上海数学九年级上册 · 28.3 相似多边形（课本第 69～71 页）
// 知识范围：相似多边形的定义（边数相同，顶点依次对应，对应角相等且对应边成比例，两条缺一不可）；对应顶点、对应边；
//   相似比（对应边的比值，有方向）；相似比为 1 ⇔ 全等；相似三角形是相似多边形的特殊情形
// 延伸（用已学知识可解）：周长比等于相似比；面积比等于相似比的平方（课本本节没有直接给出，解析里用对角线分成三角形、借 28.2 现推）；
//   矩形、菱形的相似条件；裁剪、分割后的图形与原图形相似；网格中画相似图形
// 可以使用：28.1（比例线段、平行线分线段成比例）、28.2（相似三角形的判定与性质）；六～八年级全部（全等、勾股、30° 角所对直角边、
//   四边形、坐标系、一次函数、反比例函数）；第 27 章二次函数
// 还没学：位似（28.4）、锐角三角比、圆、射影定理名称、“角平分线定理”
// 本节约定：带根号的结果用 real / reals 并要求最简；取值范围用 ineq 填空或选择

const SVG283 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  thin: (a, b) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#c9c9c9" stroke-width="1"/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 14) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  poly: (pts, fill = 'none') => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  // 网格：左下角 (ox, oy)，cols×rows 个小正方形，边长 c
  grid: (ox, oy, cols, rows, c) => {
    let s = '';
    for (let i = 0; i <= cols; i++) s += SVG283.thin([ox + i * c, oy], [ox + i * c, oy - rows * c]);
    for (let j = 0; j <= rows; j++) s += SVG283.thin([ox, oy - j * c], [ox + cols * c, oy - j * c]);
    return s;
  },
};
const d283 = (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]);
const near283 = (x, y) => Math.abs(x - y) < 1e-9;
// 一元二次方程的实数根
const roots283 = (a, b, c) => {
  let d = b * b - 4 * a * c;
  if (Math.abs(d) < 1e-9) d = 0;
  if (d < 0) return [];
  const s = Math.sqrt(d);
  return d === 0 ? [-b / (2 * a)] : [(-b - s) / (2 * a), (-b + s) / (2 * a)];
};
// 两组边长（按顶点顺序）是否对应成比例
const prop283 = (xs, ys) => xs.every((x, i) => near283(x * ys[0], ys[i] * xs[0]));

// b07 配图：网格中的四边形（1）和甲、乙、丙
const FIG283B07 = (() => {
  const c = 13, ox = 3, oy = 88;
  const m = ([x, y]) => [ox + x * c, oy - y * c];
  const shapes = [
    { name: '(1)', pts: [[0, 0], [3, 0], [2, 1], [0, 1]] },
    { name: '甲', pts: [[5, 0], [9, 0], [8, 1], [5, 1]] },
    { name: '乙', pts: [[13, 0], [13, 6], [11, 4], [11, 0]] },
    { name: '丙', pts: [[15, 0], [21, 0], [19, 1], [15, 1]] },
  ];
  let s = SVG283.grid(ox, oy, 21, 6, c);
  shapes.forEach(({ name, pts }) => {
    s += SVG283.poly(pts.map(m));
    const cx = pts.reduce((t, p) => t + p[0], 0) / pts.length;
    s += SVG283.text(name, m([cx, 0]), 0, 14);
  });
  return SVG283.wrap(280, 112, s);
})();

// e03 配图：5×5 网格中的直角梯形 ABCD
const FIG283E03 = (() => {
  const c = 26, ox = 30, oy = 150;
  const m = ([x, y]) => [ox + x * c, oy - y * c];
  const A = [0, 0], B = [2, 0], C = [2, 1], D = [0, 2];
  return SVG283.wrap(200, 170, SVG283.grid(ox, oy, 5, 5, c) + SVG283.poly([A, B, C, D].map(m))
    + SVG283.text('A', m(A), -9, 9) + SVG283.text('B', m(B), 8, 9) + SVG283.text('C', m(C), 9, -4) + SVG283.text('D', m(D), -9, -4));
})();

// e04 配图：矩形 ABCD 被 EF 分成两个矩形（示意，E 的位置不代表答案）
const FIG283E04 = (() => {
  const m = SVG283.map(16, 20, 120);
  const A = [0, 6], B = [0, 0], C = [13, 0], D = [13, 6], E = [5.2, 6], F = [5.2, 0];
  return SVG283.wrap(250, 140, SVG283.poly([A, B, C, D].map(m)) + SVG283.seg(m(E), m(F))
    + SVG283.text('A', m(A), -8, -6) + SVG283.text('B', m(B), -8, 8) + SVG283.text('C', m(C), 8, 8) + SVG283.text('D', m(D), 8, -6)
    + SVG283.text('E', m(E), 0, -10) + SVG283.text('F', m(F), 0, 10));
})();

// e06 配图：画与外框
const FIG283E06 = (() => {
  const m = SVG283.map(4, 20, 150);
  const x = 4, y = 6;
  const O = [[0, 0], [30 + 2 * y, 0], [30 + 2 * y, 20 + 2 * x], [0, 20 + 2 * x]];
  const I = [[y, x], [y + 30, x], [y + 30, x + 20], [y, x + 20]];
  return SVG283.wrap(230, 170, SVG283.poly(O.map(m), '#e9dcc3') + SVG283.poly(I.map(m), '#ffffff')
    + SVG283.text('画 30×20', m([y + 15, x + 10]))
    + SVG283.text('<tspan font-style="italic">x</tspan>', m([y + 15, x / 2]), 0, -2) + SVG283.text('<tspan font-style="italic">y</tspan>', m([y / 2, x + 10]), 0, -2));
})();

// c01 配图：矩形 ABCD 与内部一点 P（示意）
const FIG283C01 = (() => {
  const m = SVG283.map(22, 22, 135);
  const A = [0, 5], B = [0, 0], C = [10, 0], D = [10, 5], P = [3.4, 2.1];
  return SVG283.wrap(270, 160, SVG283.poly([A, B, C, D].map(m)) + SVG283.seg(m([P[0], 0]), m([P[0], 5]), true) + SVG283.seg(m([0, P[1]]), m([10, P[1]]), true)
    + SVG283.dot(m(P)) + SVG283.text('P', m(P), 9, -8)
    + SVG283.text('A', m(A), -8, -6) + SVG283.text('B', m(B), -8, 8) + SVG283.text('C', m(C), 8, 8) + SVG283.text('D', m(D), 8, -6));
})();

// c02 配图：等边等角六边形与截点（示意，x、y 取一般值）
const FIG283C02 = (() => {
  const m = SVG283.map(14, 125, 112);
  const H = [0, 1, 2, 3, 4, 5].map(k => [6 * Math.cos(Math.PI * (2 + k) / 3), 6 * Math.sin(Math.PI * (2 + k) / 3)]);
  const names = ['A', 'B', 'C', 'D', 'E', 'F'];
  const x = 1.6, y = 2.6;
  const P = H.map((p, k) => SVG283.at(p, H[(k + 1) % 6], (k % 2 === 0 ? x : y) / 6));
  let s = SVG283.poly(H.map(m)) + SVG283.poly(P.map(m), '#e9dcc3');
  H.forEach((p, k) => { s += SVG283.text(names[k], m(p), p[0] * 1.6, -p[1] * 1.6); });
  P.forEach((p, k) => { s += SVG283.text(`P<tspan font-size="10" dy="3">${k + 1}</tspan>`, m(p), p[0] * 1.5, -p[1] * 1.5, 13); });
  return SVG283.wrap(250, 225, s);
})();

// c03 配图：矩形 ABCD 的内接矩形 EFGH（示意，取 FG∶EF=0.4）
const FIG283C03 = (() => {
  const k = 0.4, p = (5 - 7 * k) / (1 - k * k), q = 7 - k * p;
  const m = SVG283.map(24, 25, 140);
  const A = [0, 5], B = [0, 0], C = [7, 0], D = [7, 5];
  const E = [0, p], F = [q, 0], G = [7, k * q], H = [7 - q, 5];
  return SVG283.wrap(220, 160, SVG283.poly([A, B, C, D].map(m)) + SVG283.poly([E, F, G, H].map(m), '#e9dcc3')
    + SVG283.text('A', m(A), -8, -6) + SVG283.text('B', m(B), -8, 8) + SVG283.text('C', m(C), 8, 8) + SVG283.text('D', m(D), 8, -6)
    + SVG283.text('E', m(E), -9, 0) + SVG283.text('F', m(F), 0, 10) + SVG283.text('G', m(G), 9, 0) + SVG283.text('H', m(H), 0, -10));
})();

// c04 配图：直角梯形 ABCD，F 在 CD 上，EF⊥CD（示意，F 的位置不代表答案）
const FIG283C04 = (() => {
  const s = 5.4;
  const m = SVG283.map(20, 25, 160);
  const A = [0, 7], B = [0, 0], C = [9, 0], D = [2, 7], F = [9 - s, s], E = [0, 2 * s - 9];
  return SVG283.wrap(240, 180, SVG283.poly([A, B, C, D].map(m)) + SVG283.seg(m(E), m(F))
    + SVG283.text('A', m(A), -8, -6) + SVG283.text('B', m(B), -8, 8) + SVG283.text('C', m(C), 8, 8) + SVG283.text('D', m(D), 6, -8)
    + SVG283.text('E', m(E), -10, 0) + SVG283.text('F', m(F), 10, -4));
})();

Content.section({
  id: 'math/sh2024/g9s1/28.3',
  title: '相似多边形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），先审挑战题提纲一轮再写全文，全文子代理盲解复核两轮。提纲阶段打回：c02 六边形学生凭对称直接设 x=y（改为只给面积 7/9，先求 y 关于 x 的函数和分段定义域，再判断是否一定相似）；c03 第(2)问只是代入发现退化（改为求邻边比范围并说明不可能相似）；c05 两种对应是标准分类、共线自动排除（换条件 PQ=√10 并加面积函数）；e06 与 c04 同模板，换成画框宽度。全文第一轮：c01 直接套对角线结论、对称翻倍（第(2)问改为 BC=a 按长宽比讨论点数，分界 5√2）；复核判 c04 无解，实为漏了顶点顺序相反的对应，CF=6√2 正确，题干补“对应关系不确定”、解析写清两种对应；e03 补格点向量偶数论证；b07 配图缩到 280 宽；b01 第⑥句与 e05 重复，换成“有一个内角 60° 的两个菱形相似”（答案改为 4 个）；周长卡片例子改方向。' },
  intro: [
    {
      title: '什么是相似多边形',
      body: '两个边数相同的多边形，把顶点依次对应起来后，如果对应角都相等、对应边都成比例，就说这两个多边形相似。两个条件缺一不可：只有角相等、或只有边成比例，形状都可能不同。',
      example: '邻边为 $2$、$3$，夹角 $60^\\circ$ 的平行四边形，和邻边为 $4$、$6$ 的矩形：边成比例，但角不相等，所以不相似。',
      pitfall: '三角形只看角（或只看边）就能判断相似，多边形不行。',
    },
    {
      title: '对应顶点和相似比',
      body: '写“四边形 $ABCD$ 与四边形 $PQRS$ 相似”时，要说清哪个顶点对应哪个顶点；对应边的比值叫相似比。相似比有方向：前一个与后一个的相似比是 $k$，反过来就是 $\\frac1k$。',
      example: '五边形甲与五边形乙相似，甲的一边 $10$ 对应乙的一边 $4$，则甲与乙的相似比是 $\\frac52$，乙与甲的相似比是 $\\frac25$。',
      pitfall: '对应关系没说清时，要分情况讨论；按字母顺序对应只是在题目这样写的时候才成立。',
    },
    {
      title: '相似比为 1 与全等；周长比',
      body: '相似比等于 $1$ 的两个相似多边形对应边都相等，就是全等形；反过来，全等形是相似比为 $1$ 的相似多边形。相似三角形是相似多边形的特殊情形。每条边都乘同一个数 $k$，所以周长也乘 $k$：周长比等于相似比。',
      example: '两个相似六边形的周长分别是 $40$ 和 $25$，那么相似比（大 ∶ 小）就是 $40\\!:\\!25=8\\!:\\!5$；大的一边是 $16$，小的对应边就是 $16\\times\\frac58=10$。',
    },
    {
      title: '面积比等于相似比的平方',
      body: '从一个顶点连对角线，把两个相似多边形都分成若干对三角形。每一对都是“两边成比例且夹角相等”，所以相似，相似比都是 $k$，每对面积比都是 $k^2$，加起来面积比还是 $k^2$。',
      example: '相似比为 $3\\!:\\!5$ 的两个五边形，各分成 $3$ 对三角形，每对面积比都是 $9\\!:\\!25$，所以五边形的面积比也是 $9\\!:\\!25$。',
      pitfall: '面积比不是相似比；已知面积比求相似比要开平方。',
    },
    {
      title: '两个矩形什么时候相似',
      body: '矩形的角都是直角，只要看边：长与宽的比相等就相似（长对长、宽对宽）。不知道哪条边对应哪条边时，要把“这条边是长”和“这条边是宽”都试一遍。',
      example: '长 $10$、宽 $4$ 的矩形与长 $5$、宽 $2$ 的矩形相似；与长 $7$、宽 $4$ 的矩形不相似（$10\\!:\\!4\\ne7\\!:\\!4$）。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '28.3-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：①所有矩形都相似；②所有菱形都相似；③所有正方形都相似；④各边都相等、各内角也都相等的两个五边形相似；⑤相似比为 $1$ 的两个相似多边形全等；⑥有一个内角是 $60^\\circ$ 的两个菱形相似。其中正确的有几个？',
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 2,
      explain: [
        '①错：矩形的角都相等，但长宽比可以不同（如 $1\\times1$ 与 $1\\times2$），边不成比例。',
        '②错：菱形的边都成比例，但角可以不同（如正方形与有一个角是 $60^\\circ$ 的菱形）。',
        '③对：角都是 $90^\\circ$，边的比都相等。④对：五边形内角和 $540^\\circ$，各角都是 $108^\\circ$，边的比也都相等。⑤对：相似比为 $1$ 时对应边都相等，是全等形。',
        '⑥对：有一个角是 $60^\\circ$ 的菱形，四个角依次是 $60^\\circ$、$120^\\circ$、$60^\\circ$、$120^\\circ$，两个这样的菱形让 $60^\\circ$ 角对 $60^\\circ$ 角，对应角相等；菱形四边相等，对应边也成比例，所以相似。正确的是③④⑤⑥，共 $4$ 个。坑：由②“菱形不一定相似”顺手判⑥错——②缺的是角相等，⑥把角定住了。',
      ],
      verify: () => [false, false, true, true, true, true].filter(Boolean).length - 2,
    },
    {
      id: '28.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '四边形 $ABCD$ 与四边形 $GHEF$ 相似，点 $A$ 与 $G$、$B$ 与 $H$、$C$ 与 $E$、$D$ 与 $F$ 分别是对应顶点。已知 $AB=6$，$BC=8$，$GH=4.5$，$\\angle C=80^\\circ$，求 $HE$ 的长和 $\\angle E$ 的度数。',
      blanks: [
        { kind: 'num', label: '$HE=$', answer: '6' },
        { kind: 'num', label: '$\\angle E=$（度）', answer: '80' },
      ],
      explain: [
        '按给出的对应顶点找对应边：$AB$ 对 $GH$，$BC$ 对 $HE$。',
        '$\\frac{GH}{AB}=\\frac{4.5}{6}=\\frac34$，所以 $HE=\\frac34BC=6$。',
        '$C$ 与 $E$ 对应，$\\angle E=\\angle C=80^\\circ$。坑：看到四边形 $GHEF$ 就按字母表顺序把 $BC$ 配给 $EF$、把 $\\angle E$ 配给 $\\angle A$，要按题目给的对应顶点来。',
      ],
      verify: () => [8 * 4.5 / 6, 80],
    },
    {
      id: '28.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '四边形甲与四边形乙相似，甲与乙的相似比为 $3\\!:\\!4$。乙的周长是 $32$，乙的一条边长是 $8$，求甲的周长和甲中与这条边对应的边长。',
      blanks: [
        { kind: 'num', label: '甲的周长', answer: '24' },
        { kind: 'num', label: '甲中对应边的长', answer: '6' },
      ],
      explain: [
        '“甲与乙的相似比为 $3\\!:\\!4$”表示甲的边 ∶ 乙的对应边 $=3\\!:\\!4$，甲比乙小。',
        '周长比等于相似比：甲的周长 $=32\\times\\frac34=24$；对应边 $=8\\times\\frac34=6$。',
        '坑：把方向弄反，乘 $\\frac43$ 得到 $\\frac{128}{3}$ 和 $\\frac{32}{3}$。',
      ],
      verify: () => [F(32).mul(F(3).div(4)), F(8).mul(F(3).div(4))],
    },
    {
      id: '28.3-b04',
      level: 'basic',
      type: 'choice',
      stem: '一幅长 $24$、宽 $16$ 的矩形画，四周镶上宽度都是 $4$ 的边框。边框外沿围成的矩形与画（内矩形）是否相似？',
      options: ['相似，因为两个矩形的四个角都是直角', '相似，因为长和宽都增加了同样的 $8$', '不相似，因为 $32\\!:\\!24\\ne24\\!:\\!16$', '不相似，因为外矩形比画大'],
      answer: 2,
      explain: [
        '外矩形长 $24+8=32$，宽 $16+8=24$，长宽比 $\\frac{32}{24}=\\frac43$；画的长宽比 $\\frac{24}{16}=\\frac32$。',
        '角都相等，但对应边不成比例，所以不相似。',
        '坑：觉得“四周一样宽”就是等比例放大。加上同一个数不是乘同一个数，长宽比会变；大小不同本身不影响相似。',
      ],
      verify: () => (F(32).div(24).eq(F(24).div(16)) ? 0 : 2),
    },
    {
      id: '28.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '两个相似四边形的相似比是 $2\\!:\\!3$，较小的四边形面积是 $12$，求较大的四边形的面积。',
      blanks: [{ kind: 'num', label: '较大四边形的面积', answer: '27' }],
      explain: [
        '各连一条对应的对角线，把两个四边形都分成两对三角形。每对三角形两边成比例（比为 $2\\!:\\!3$）且夹角相等，所以相似，面积比都是 $4\\!:\\!9$。',
        '两对加起来，四边形的面积比也是 $4\\!:\\!9$：较大面积 $=12\\times\\frac94=27$。',
        '坑：按相似比 $2\\!:\\!3$ 算成 $18$。',
      ],
      verify: () => F(12).mul(F(9).div(4)),
    },
    {
      id: '28.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '五边形 $ABCDE$ 与五边形 $A\'B\'C\'D\'E\'$ 相似，字母依次对应。已知 $\\angle A=100^\\circ$，$\\angle B\'=110^\\circ$，$\\angle C=120^\\circ$，$\\angle D\'=95^\\circ$，求 $\\angle E$ 的度数。',
      blanks: [{ kind: 'num', label: '$\\angle E=$（度）', answer: '115' }],
      explain: [
        '对应角相等：$\\angle B=\\angle B\'=110^\\circ$，$\\angle D=\\angle D\'=95^\\circ$，先把角都转到五边形 $ABCDE$ 里。',
        '五边形内角和 $(5-2)\\times180^\\circ=540^\\circ$，$\\angle E=540^\\circ-100^\\circ-110^\\circ-120^\\circ-95^\\circ=115^\\circ$。',
        '坑：用四边形的 $360^\\circ$ 去减，得到负数。',
      ],
      verify: () => 180 * 3 - 100 - 110 - 120 - 95,
    },
    {
      id: '28.3-b07',
      level: 'basic',
      type: 'choice',
      stem: '如图，在小正方形边长为 $1$ 的网格中，四边形（1）的顶点都在格点上。甲、乙、丙三个格点四边形中，哪一个与四边形（1）相似？',
      figure: FIG283B07,
      options: ['甲', '乙', '丙', '都不相似'],
      answer: 1,
      explain: [
        '四边形（1）是直角梯形：两底 $3$、$2$，高 $1$，斜腰 $\\sqrt2$，四个角依次是 $90^\\circ$、$45^\\circ$、$135^\\circ$、$90^\\circ$。',
        '甲：两底 $4$、$3$，高 $1$，四个角和（1）一样，但 $4\\!:\\!3\\ne3\\!:\\!2$，边不成比例，不相似。',
        '丙：两底 $6$、$4$，高仍是 $1$，斜腰横跨 $2$ 格、竖跨 $1$ 格，那个锐角不是 $45^\\circ$；而且高没有跟着变成 $2$，不相似。',
        '乙：竖放的直角梯形，两底 $6$、$4$，高 $2$，斜腰 $2\\sqrt2$，各边都是（1）的 $2$ 倍，角也对应相等，相似。坑：只看“摆放方向一样”，忽略转了 $90^\\circ$ 的乙。',
      ],
      verify: () => {
        // 按顶点顺序取各边长和各角（余弦），逐个起点、两个方向比较：角相等且边成比例才算相似
        const info = pts => pts.map((p, i) => {
          const a = pts[(i + pts.length - 1) % pts.length], b = pts[(i + 1) % pts.length];
          const u = [a[0] - p[0], a[1] - p[1]], v = [b[0] - p[0], b[1] - p[1]];
          return { side: d283(p, b), cos: (u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v) };
        });
        const q1 = info([[0, 0], [3, 0], [2, 1], [0, 1]]);
        const cand = [[[5, 0], [9, 0], [8, 1], [5, 1]], [[13, 0], [13, 6], [11, 4], [11, 0]], [[15, 0], [21, 0], [19, 1], [15, 1]]];
        const ok = cand.map(pts => [pts, [...pts].reverse()].some(seq => [0, 1, 2, 3].some(st => {
          const t = info(seq.slice(st).concat(seq.slice(0, st)));
          return t.every((x, i) => near283(x.cos, q1[i].cos)) && prop283(q1.map(x => x.side), t.map(x => x.side));
        })));
        return ok.filter(Boolean).length === 1 ? ok.indexOf(true) : 3;
      },
    },
    {
      id: '28.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '一个矩形长 $6$、宽 $4$，另一个矩形与它相似，且一边长为 $3$。求另一个矩形另一边的长。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '另一边长', answer: ['9/2', '2'] }],
      explain: [
        '长宽比都要是 $6\\!:\\!4=3\\!:\\!2$。',
        '若 $3$ 是长：宽 $=3\\times\\frac23=2$；若 $3$ 是宽：长 $=3\\times\\frac32=4.5$。',
        '坑：只按“$3$ 对应 $6$”算出 $2$，漏掉 $4.5$。',
      ],
      verify: () => [F(3).mul(F(4).div(6)), F(3).mul(F(6).div(4))],
    },
    {
      id: '28.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '一个四边形的四条边长分别是 $3$、$4$、$5$、$6$，另一个四边形与它相似，且最长边是 $9$。求另一个四边形的最短边和周长。',
      blanks: [
        { kind: 'num', label: '最短边', answer: '9/2' },
        { kind: 'num', label: '周长', answer: '27' },
      ],
      explain: [
        '对应边成比例，长的对长的、短的对短的：最长边 $9$ 对应 $6$，相似比（新 ∶ 原）为 $3\\!:\\!2$。',
        '最短边 $=3\\times\\frac32=4.5$；周长 $=(3+4+5+6)\\times\\frac32=27$。',
        '坑：让 $9$ 对应 $3$（按出现顺序），得到最短边 $9$、周长 $54$。',
      ],
      verify: () => { const k = F(9).div(6); return [F(3).mul(k), F(18).mul(k)]; },
    },
    // ---------- 扩展 ----------
    {
      id: '28.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '菱形 $ABCD$ 的两条对角线长为 $6$ 和 $8$。另一个菱形与它相似，且有一条对角线长为 $12$，求这个菱形的面积。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '面积', answer: ['96', '54'] }],
      explain: [
        '两个菱形相似，对应角相等。菱形的对角线互相垂直平分，把菱形分成 $4$ 个全等的直角三角形，两条直角边是两条对角线的一半；对应角相等时这些直角三角形相似，所以两条对角线之比也相等：两个菱形相似 $\\Leftrightarrow$ 对角线之比相等。',
        '若 $12$ 对应 $6$：相似比 $2$，另一条对角线 $16$，面积 $\\frac12\\times12\\times16=96$。',
        '若 $12$ 对应 $8$：相似比 $\\frac32$，另一条对角线 $9$，面积 $\\frac12\\times12\\times9=54$。',
        '坑：只按“$12$ 对应 $6$”算，漏掉 $54$；或用相似比代替面积比。',
      ],
      verify: () => [12, 8].map((_, i) => { const k = i === 0 ? F(12).div(6) : F(12).div(8); return F(24).mul(k).mul(k); }),
    },
    {
      id: '28.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '四边形 $ABCD$ 与四边形 $A\'B\'C\'D\'$ 相似（字母依次对应）。对角线 $AC$ 把四边形 $ABCD$ 分成面积为 $6$ 和 $9$ 的两个三角形，对角线 $A\'C\'$ 把四边形 $A\'B\'C\'D\'$ 分成的两个三角形中，较小的一个面积为 $24$。求四边形 $A\'B\'C\'D\'$ 的面积和 $AB\\!:\\!A\'B\'$。',
      blanks: [
        { kind: 'num', label: '四边形 $A\'B\'C\'D\'$ 的面积', answer: '60' },
        { kind: 'ratio', label: '$AB\\!:\\!A\'B\'=$', answer: '1:2' },
      ],
      explain: [
        '设相似比 $\\frac{A\'B\'}{AB}=k$。由相似多边形：$\\frac{A\'B\'}{AB}=\\frac{B\'C\'}{BC}=k$，$\\angle B=\\angle B\'$，所以 $\\triangle A\'B\'C\'\\sim\\triangle ABC$（两边成比例且夹角相等）；同理 $\\triangle A\'C\'D\'\\sim\\triangle ACD$，相似比都是 $k$。',
        '于是两块面积分别是 $6k^2$ 和 $9k^2$，较小的是 $6k^2=24$，$k^2=4$，$k=2$。',
        '另一块 $9\\times4=36$，总面积 $24+36=60$；$AB\\!:\\!A\'B\'=1\\!:\\!2$。',
        '坑：把 $24\\div6=4$ 当成相似比，得到 $1\\!:\\!4$；或让 $24$ 对应 $9$。',
      ],
      verify: () => { const k2 = F(24).div(6); return [F(15).mul(k2), [1, 2]]; },
    },
    {
      id: '28.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $5\\times5$ 的正方形网格（小正方形边长为 $1$）中，直角梯形 $ABCD$ 的顶点都在格点上。在这个网格内（包括边界格点）画一个顶点都在格点上、与梯形 $ABCD$ 相似但不全等的四边形，它与梯形 $ABCD$ 的相似比（新 ∶ 原）可能是多少？（全部填出，用逗号隔开）',
      figure: FIG283E03,
      blanks: [{ kind: 'reals', label: '相似比', answer: ['√2', '2'], simplest: true }],
      explain: [
        '$ABCD$ 中 $AB=2$，$BC=1$，$AD=2$，$CD=\\sqrt5$，$\\angle A=\\angle B=90^\\circ$。设新图形中与 $AB$ 对应的边 $A\'B\'$ 从 $A\'$ 到 $B\'$ 横走 $p$ 格、竖走 $q$ 格（$p$、$q$ 是整数，可正可负），$A\'B\'=\\sqrt{p^2+q^2}$。',
        '$B\'C\'$ 与 $A\'B\'$ 垂直、长是它的一半，所以从 $B\'$ 到 $C\'$ 是横走 $\\frac q2$、竖走 $-\\frac p2$，或横走 $-\\frac q2$、竖走 $\\frac p2$（把 $(p,q)$ 转 $90^\\circ$ 再取一半）。$C\'$ 是格点，$\\frac p2$、$\\frac q2$ 都要是整数，所以 $p$、$q$ 都是偶数。设 $p=2m$，$q=2n$，相似比 $k=\\frac{A\'B\'}{AB}=\\frac{2\\sqrt{m^2+n^2}}{2}=\\sqrt{m^2+n^2}$。',
        '不全等，$k\\ne1$，按从小到大试：$k=\\sqrt2$（$m=n=1$，$A\'B\'$ 横 $2$ 竖 $2$）：例如 $A\'(2,0)$、$B\'(4,2)$、$C\'(3,3)$、$D\'(0,2)$，放得下。$k=2$（$m=2$，$n=0$，$A\'B\'$ 横 $4$）：图形占 $4\\times4$，放得下。',
        '$k=\\sqrt5$（$m=2$，$n=1$）：$A\'B\'$ 横 $4$ 竖 $2$，$A\'D\'$ 与它垂直等长，是横 $\\mp2$ 竖 $\\pm4$，$B\'$ 与 $D\'$ 在横向（或竖向）上相差 $4+2=6$ 格，$5\\times5$ 网格（包括边界，横竖各只有 $0\\sim5$）放不下。$k\\ge2\\sqrt2$ 时 $A\'B\'$、$A\'D\'$ 更长：同理 $B\'$、$D\'$ 在某一方向上相差 $2(|m|+|n|)\\ge6$ 格，也放不下。所以只有 $\\sqrt2$ 和 $2$。',
        '坑：只想到“放大 $2$ 倍”，漏掉斜着放的 $\\sqrt2$；翻折后的图形相似比不变，不会多出新值。',
      ],
      verify: () => {
        // 穷举：把梯形绕原点乘以 (m+ni)（可先翻折），检查是否都是格点且能放进 5×5
        const Q = [[0, 0], [2, 0], [2, 1], [0, 2]];
        const set = new Set();
        for (const refl of [1, -1]) for (let m = -6; m <= 6; m++) for (let n = -6; n <= 6; n++) {
          if (!m && !n) continue;
          const img = Q.map(([x, y]) => [m * x - n * refl * y, n * x + m * refl * y]);
          const xs = img.map(p => p[0]), ys = img.map(p => p[1]);
          if (Math.max(...xs) - Math.min(...xs) <= 5 && Math.max(...ys) - Math.min(...ys) <= 5 && m * m + n * n > 1) set.add(m * m + n * n);
        }
        return [...set].map(Math.sqrt);
      },
    },
    {
      id: '28.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=6$，$BC=13$，点 $E$ 在 $AD$ 上，点 $F$ 在 $BC$ 上，$EF\\parallel AB$。若矩形 $ABFE$ 与矩形 $EFCD$ 相似，求 $AE$ 的长。（全部填出，用逗号隔开）',
      figure: FIG283E04,
      blanks: [{ kind: 'nums', label: '$AE=$', answer: ['4', '13/2', '9'] }],
      explain: [
        '设 $AE=x$，则 $ED=13-x$（$0<x<13$）。两个矩形有一组边都是 $EF=6$。',
        '若 $AE$ 对应 $EF$、$AB$ 对应 $ED$：$\\frac{x}{6}=\\frac{6}{13-x}$，$x(13-x)=36$，$x^2-13x+36=0$，$x=4$ 或 $9$。',
        '若 $AE$ 对应 $ED$、$AB$ 对应 $EF$：$\\frac{x}{13-x}=\\frac66=1$，$x=6.5$，两个矩形全等，相似比为 $1$，也是相似。',
        '所以 $AE=4$、$6.5$ 或 $9$。坑：漏掉相似比为 $1$ 的全等情况；或只解出一个根。',
      ],
      verify: () => {
        const r = roots283(1, -13, 36).filter(x => x > 0 && x < 13);
        return [...r, 6.5].map(x => F(Math.round(x * 2)).div(2));
      },
    },
    {
      id: '28.3-e05',
      level: 'extended',
      type: 'choice',
      stem: '关于两个凸四边形 $ABCD$ 与 $A\'B\'C\'D\'$（字母依次对应），下列条件：①四个内角对应相等；②四条边对应成比例；③四条边对应成比例，且有一组对应角相等；④相邻三边 $AB$、$BC$、$CD$ 与 $A\'B\'$、$B\'C\'$、$C\'D\'$ 对应成比例，且 $\\angle B=\\angle B\'$，$\\angle C=\\angle C\'$；⑤两条对角线对应成比例，且四个内角对应相等；⑥四条边和对角线 $AC$、$A\'C\'$ 都对应成比例。能判定这两个四边形相似的有几个？',
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 1,
      explain: [
        '①错：长宽不同的两个矩形。②错：正方形与有一个角是 $60^\\circ$ 的菱形。⑤错：$1\\times2$ 与 $1\\times3$ 的矩形，角都相等，两条对角线各自相等，“对角线对应成比例”自然成立，但边不成比例。',
        '⑥对：连 $AC$、$A\'C\'$，$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$、$\\triangle ACD$ 与 $\\triangle A\'C\'D\'$ 都三边成比例，相似比相同，所以对应角都相等（$\\angle BCD=\\angle BCA+\\angle ACD$ 等），对应边又成比例。',
        '④对：由 $AB$、$BC$ 与 $\\angle B$ 得 $\\triangle ABC\\sim\\triangle A\'B\'C\'$，于是 $\\frac{AC}{A\'C\'}$ 也等于相似比，且 $\\angle ACB=\\angle A\'C\'B\'$；再由 $\\angle ACD=\\angle C-\\angle ACB$ 和 $AC$、$CD$ 得 $\\triangle ACD\\sim\\triangle A\'C\'D\'$，与⑥同理得到相似。',
        '③对：设 $\\angle A=\\angle A\'$，连 $BD$。由 $AB$、$AD$ 与 $\\angle A$ 得 $\\triangle ABD\\sim\\triangle A\'B\'D\'$，$BD$ 也成同样的比例，再由三边成比例得 $\\triangle CBD\\sim\\triangle C\'B\'D\'$（凸四边形中 $C$ 在 $BD$ 的另一侧），与⑥同理。正确的是③④⑥，共 $3$ 个。',
      ],
      verify: () => [false, false, true, true, false, true].filter(Boolean).length - 2,
    },
    {
      id: '28.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，一幅长 $30$、宽 $20$ 的矩形画（长边水平），在上、下两边各镶宽 $x$ 的边框，左、右两边各镶宽 $y$ 的边框（$x>0$，$y>0$），外沿围成一个矩形。(1) 若外矩形与画相似，且外矩形的长边也水平，求 $y$ 与 $x$ 的关系；(2) 若外矩形与画相似，且外矩形的长边竖直，求 $y$ 关于 $x$ 的函数解析式及定义域；(3) 若外矩形与画相似，且边框的面积等于画的面积，求 $x$。',
      figure: FIG283E06,
      blanks: [
        { kind: 'num', label: '(1) $y$ 是 $x$ 的几倍', answer: '3/2' },
        { kind: 'expr', label: '(2) $y=$', answer: '(2x-25)/3' },
        { kind: 'ineq', label: '(2) 定义域', answer: 'x>25/2' },
        { kind: 'real', label: '(3) $x=$（化成最简形式）', answer: '10√2-10', simplest: true },
      ],
      explain: [
        '外矩形横 $30+2y$，竖 $20+2x$。',
        '(1) 长对长：$\\frac{30+2y}{20+2x}=\\frac{30}{20}$，$60+4y=60+6x$，$y=\\frac32x$。',
        '(2) 外矩形的竖边是长边，对应画的长 $30$：$\\frac{30+2y}{20+2x}=\\frac{20}{30}$，$90+6y=40+4x$，$y=\\frac{2x-25}{3}$；由 $y>0$ 得 $x>12.5$（此时 $20+2x>30+2y$ 确实成立）。',
        '(3) 边框面积等于画的面积，外矩形面积为 $2\\times600=1200$。按 (1)：$(30+3x)(20+2x)=6(10+x)^2=1200$，$(10+x)^2=200$，$x=10\\sqrt2-10$。',
        '按 (2)：外矩形横边是竖边的 $\\frac23$，面积 $\\frac23(20+2x)^2=1200$，$20+2x=30\\sqrt2$，$x=15\\sqrt2-10\\approx11.2$，不满足 $x>12.5$，舍去。',
        '所以 $x=10\\sqrt2-10$（此时 $y=15\\sqrt2-15$）。坑：(3) 中第二种情况不检验定义域就当成第二个解。',
      ],
      verify: () => {
        const x1 = Math.sqrt(200) - 10, x2 = (Math.sqrt(1800) - 20) / 2;
        const ok = [x1].concat(x2 > 12.5 ? [x2] : []);
        return [F(3).div(2), '(2x-25)/3', 'x>25/2', ok.length === 1 ? ok[0] : NaN];
      },
    },
    // ---------- 挑战 ----------
    {
      id: '28.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=5$，$BC=10$。$P$ 是矩形内部一点，过 $P$ 分别作 $AB$、$BC$ 的平行线，把矩形 $ABCD$ 分成四个小矩形。(1) 若点 $P$ 在对角线 $BD$ 上，且四个小矩形中恰有三个与矩形 $ABCD$ 相似，求 $BP$ 的长；(2) 把 $BC$ 的长改为 $a$（$a>5$），$AB=5$ 不变。若点 $P$ 不在对角线 $AC$、$BD$ 上，且四个小矩形中恰有两个与矩形 $ABCD$ 相似，这样的点 $P$ 的个数与 $a$ 有关：存在一个数 $t$，当 $5<a<t$ 时有 $n_1$ 个，当 $a\\ge t$ 时有 $n_2$ 个。求 $t$、$n_1$、$n_2$。',
      figure: FIG283C01,
      blanks: [
        { kind: 'reals', label: '(1) $BP=$（全部填出，用逗号隔开）', answer: ['√5', '4√5'], simplest: true },
        { kind: 'real', label: '(2) $t=$（化成最简形式）', answer: '5√2', simplest: true },
        { kind: 'num', label: '(2) $n_1=$', answer: '4' },
        { kind: 'num', label: '(2) $n_2=$', answer: '2' },
      ],
      explain: [
        '思路：小矩形与 $ABCD$ 相似，只看“横边 ∶ 竖边”，它要等于原矩形的横 ∶ 竖，或者等于它的倒数（竖的变成长边）——两种对应都要考虑。每个条件都是一条直线，“恰有几个相似”就是看 $P$ 落在几条线上。',
        '以 $B$ 为原点、$BC$ 方向为横轴，设 $P(u,v)$。四块的横 ∶ 竖分别为：含 $B$ 的 $u\\!:\\!v$，含 $C$ 的 $(BC-u)\\!:\\!v$，含 $A$ 的 $u\\!:\\!(5-v)$，含 $D$ 的 $(BC-u)\\!:\\!(5-v)$。',
        '(1) $BC=10$，$P$ 在 $BD$ 上，设 $P(10t,5t)$（$0<t<1$）：含 $B$、含 $D$ 两块的横 ∶ 竖都是 $2$，一定相似。含 $A$ 的为 $\\frac{2t}{1-t}$，等于 $2$ 得 $t=\\frac12$，等于 $\\frac12$ 得 $t=\\frac15$；含 $C$ 的为 $\\frac{2(1-t)}{t}$，等于 $2$ 得 $t=\\frac12$，等于 $\\frac12$ 得 $t=\\frac45$。$t=\\frac12$ 时四块都相似，不是“恰有三个”，舍去。$BD=5\\sqrt5$，所以 $BP=\\frac15BD=\\sqrt5$ 或 $\\frac45BD=4\\sqrt5$。',
        '(2) 原矩形横 ∶ 竖 $=\\frac a5>1$。先看“横 ∶ 竖 $=\\frac a5$”的四个条件：含 $B$ 的是 $u=\\frac a5v$，含 $D$ 的 $a-u=\\frac a5(5-v)$ 化简后也是 $u=\\frac a5v$——都是直线 $BD$；同理含 $A$、含 $C$ 的都是直线 $AC$。$P$ 不在对角线上，所以相似的块只能是“竖边是长边”的：含 $B$：$u=\\frac{5v}a$；含 $C$：$a-u=\\frac{5v}a$；含 $A$：$u=\\frac{5(5-v)}a$；含 $D$：$a-u=\\frac{5(5-v)}a$。$P$ 要恰好落在其中两条上。',
        '两两联立：含 $B$ 与含 $D$ 相加得 $a=\\frac{25}a$，$a=5$，不合；含 $A$ 与含 $C$ 同样不合。含 $B$ 与含 $A$：$v=5-v$，得 $P_1(\\frac{25}{2a},\\frac52)$；含 $C$ 与含 $D$：得 $P_2(a-\\frac{25}{2a},\\frac52)$，这两点对任何 $a>5$ 都在矩形内部。',
        '含 $B$ 与含 $C$：$\\frac{5v}a=a-\\frac{5v}a$，$v=\\frac{a^2}{10}$，$P_3(\\frac a2,\\frac{a^2}{10})$；含 $A$ 与含 $D$：$P_4(\\frac a2,5-\\frac{a^2}{10})$。它们在内部要求 $\\frac{a^2}{10}<5$，即 $a<5\\sqrt2$；$a=5\\sqrt2$ 时正好落在 $AD$、$BC$ 上，不算。',
        '检验没有第三块也相似、也不在对角线上：如 $P_3$ 处含 $A$ 的块横 ∶ 竖 $=\\frac{5a}{50-a^2}$，等于 $\\frac a5$ 或 $\\frac5a$ 都化成 $a^2=25$，不成立；$P_1$ 处含 $C$ 的块为 $\\frac{2a}5-\\frac5a$，同样只在 $a=5$ 时才等于 $\\frac a5$ 或 $\\frac5a$。$P$ 在 $BD$（或 $AC$）上，等价于含 $B$（或含 $A$）的块横 ∶ 竖等于 $\\frac a5$，上面已说明这些块的比都不等于 $\\frac a5$，所以四点都不在对角线上；$a\\ne5$ 时四点互不相同。',
        '所以 $t=5\\sqrt2$，$5<a<5\\sqrt2$ 时有 $4$ 个，$a\\ge5\\sqrt2$ 时只有 $P_1$、$P_2$ 两个（例如 $a=10$ 时是 $(1.25,2.5)$、$(8.75,2.5)$）。坑：只用“长对长”的对应，把条件全看成对角线；或忘了检验 $P_3$、$P_4$ 是否在矩形内部，误以为个数不随 $a$ 变。',
      ],
      verify: () => {
        // 每块、每种对应都是一条直线 pu+qv+r=0；两两求交点，留下在内部、不在对角线上、恰有指定块数相似的点
        const pts = (a, need, onDiag) => {
          const lines = [];
          for (const k of [a / 5, 5 / a]) lines.push([1, -k, 0], [-1, -k, a], [1, k, -5 * k], [-1, k, a - 5 * k]);
          const res = [];
          for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) {
            const [p1, q1, r1] = lines[i], [p2, q2, r2] = lines[j];
            const det = p1 * q2 - p2 * q1;
            if (Math.abs(det) < 1e-12) continue;
            const u = (q1 * r2 - q2 * r1) / det, v = (r1 * p2 - r2 * p1) / det;
            if (!(u > 1e-12 && u < a - 1e-12 && v > 1e-12 && v < 5 - 1e-12)) continue;
            const sim = [u / v, (a - u) / v, u / (5 - v), (a - u) / (5 - v)].filter(r => near283(r, a / 5) || near283(r, 5 / a)).length;
            const diag = near283(u, a / 5 * v) || near283(u, a / 5 * (5 - v));
            if (sim === need && diag === onDiag && !res.some(([x, y]) => near283(x, u) && near283(y, v))) res.push([u, v]);
          }
          return res;
        };
        const bp = pts(10, 3, true).filter(([u, v]) => near283(u, 2 * v)).map(([u, v]) => Math.hypot(u, v));
        const cnt = a => pts(a, 2, false).length;
        // 二分找个数变化的分界
        let lo = 5.01, hi = 20;
        const nLo = cnt(lo), nHi = cnt(hi);
        for (let it = 0; it < 80; it++) { const mid = (lo + hi) / 2; if (cnt(mid) === nLo) lo = mid; else hi = mid; }
        const stable = [5.2, 6, 7, 7.07].every(a => cnt(a) === nLo) && [7.072, 8, 10, 15].every(a => cnt(a) === nHi);
        return stable ? [bp, hi, nLo, nHi] : NaN;
      },
    },
    {
      id: '28.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，六边形 $ABCDEF$ 各边都等于 $6$，各内角都等于 $120^\\circ$。在 $AB$、$BC$、$CD$、$DE$、$EF$、$FA$ 上依次取点 $P_1$、$P_2$、$P_3$、$P_4$、$P_5$、$P_6$，使 $AP_1=CP_3=EP_5=x$，$BP_2=DP_4=FP_6=y$（$0<x<6$，$0<y<6$），且六边形 $P_1P_2P_3P_4P_5P_6$ 的面积是六边形 $ABCDEF$ 面积的 $\\frac79$。(1) 求 $y$ 关于 $x$ 的函数解析式及定义域；(2) 此时六边形 $P_1P_2\\cdots P_6$ 是否一定与六边形 $ABCDEF$ 相似？若两者相似，求 $x$ 的值。',
      figure: FIG283C02,
      blanks: [
        { kind: 'expr', label: '(1) $y=$', answer: '(3x-8)/(x-3)' },
        { kind: 'text', label: '(1) 定义域', answer: '$0<x<\\frac83$ 或 $\\frac{10}3<x<6$', options: ['$0<x<6$ 且 $x\\ne3$', '$0<x<\\frac83$ 或 $\\frac{10}3<x<6$', '$\\frac83<x<\\frac{10}3$', '$\\frac{10}3<x<6$'] },
        { kind: 'text', label: '(2) 是否一定相似', answer: '不一定', options: ['一定相似', '不一定'] },
        { kind: 'nums', label: '(2) 相似时 $x$ 的值（全部填出，用逗号隔开）', answer: ['2', '4'] },
      ],
      explain: [
        '先算面积。夹 $120^\\circ$ 角、两边为 $a$、$b$ 的三角形：过一端作另一边延长线的垂线，所成直角三角形有一个 $30^\\circ$ 角，高 $=\\frac{\\sqrt3}{2}a$，面积 $=\\frac{\\sqrt3}{4}ab$。原六边形可从中心分成 $6$ 个边长 $6$ 的等边三角形，面积 $6\\times9\\sqrt3=54\\sqrt3$。',
        '截去的 $6$ 个角：在 $B$、$D$、$F$ 处两边为 $6-x$、$y$，在 $C$、$E$、$A$ 处两边为 $6-y$、$x$。截去面积 $=\\frac{3\\sqrt3}{4}[(6-x)y+(6-y)x]$，它等于原面积的 $\\frac29$，即 $12\\sqrt3$。化简得 $3x+3y-xy=8$，即 $(x-3)(y-3)=1$，$y=\\frac{3x-8}{x-3}$。',
        '定义域：$x=3$ 不行。$x>3$ 时 $y=3+\\frac1{x-3}>3>0$，由 $y<6$ 得 $\\frac{1}{x-3}<3$，$x>\\frac{10}3$；$x<3$ 时 $y=3-\\frac1{3-x}<6$，由 $y>0$ 得 $3-x>\\frac13$，$x<\\frac83$。所以 $0<x<\\frac83$ 或 $\\frac{10}3<x<6$。',
        '(2) 面积比对了不一定相似。各截线长：在 $B$ 处，$P_1P_2^2=(6-x)^2+y^2+(6-x)y$（同样作高、用勾股定理）；在 $C$ 处，$P_2P_3^2=(6-y)^2+x^2+(6-y)x$。取 $x=5$、$y=\\frac72$（满足 $(x-3)(y-3)=1$）：$P_1P_2^2=\\frac{67}4$，$P_2P_3^2=\\frac{175}4$，内六边形的边不全相等，而原六边形各边相等，对应边不可能成比例，所以不相似。',
        '若相似：原六边形各边相等，内六边形各边也要相等，$P_1P_2=P_2P_3$，展开化简得 $18x=18y$，$x=y$。代入 $(x-3)^2=1$，$x=2$ 或 $4$，都在定义域内。',
        '检验：$x=y$ 时六个截角三角形全等（两边及夹角对应相等），内六边形各边相等；每个内角 $=180^\\circ-$ 两个底角之和，由全等可知六个内角也相等，都是 $120^\\circ$，所以与原六边形相似。答：$x=2$ 或 $4$。',
        '坑：凭对称直接认为 $x=y$，没有先说明“面积条件推不出相似”；或定义域只写 $0<x<6$。',
      ],
      verify: () => {
        const H = [0, 1, 2, 3, 4, 5].map(k => [6 * Math.cos(Math.PI * k / 3), 6 * Math.sin(Math.PI * k / 3)]);
        const inner = (x, y) => H.map((p, k) => SVG283.at(p, H[(k + 1) % 6], (k % 2 === 0 ? x : y) / 6));
        const area = P => Math.abs(P.reduce((s, p, i) => { const q = P[(i + 1) % P.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
        const A0 = area(H);
        const yOf = x => (3 * x - 8) / (x - 3);
        // 抽查几个 x：面积比是 7/9
        const okArea = [1, 2.5, 3.5, 5].every(x => near283(area(inner(x, yOf(x))) / A0, 7 / 9));
        const sides = P => P.map((p, i) => d283(p, P[(i + 1) % 6]));
        const xs = [];
        for (let i = 1; i < 6000; i++) {
          const x = i / 1000, y = yOf(x);
          if (!(y > 0 && y < 6)) continue;
          const s = sides(inner(x, y));
          if (s.every(t => Math.abs(t - s[0]) < 1e-9)) xs.push(x);
        }
        return [okArea ? '(3x-8)/(x-3)' : '', '$0<x<\\frac83$ 或 $\\frac{10}3<x<6$', '不一定', xs.map(x => F(Math.round(x)))];
      },
    },
    {
      id: '28.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=5$，$BC=7$。四边形 $EFGH$ 是矩形，点 $E$、$F$、$G$、$H$ 分别在边 $AB$、$BC$、$CD$、$DA$ 上（都不与 $A$、$B$、$C$、$D$ 重合）。(1) 若矩形 $EFGH$ 的一边是相邻一边的 $2$ 倍，求 $BE$ 的长；(2) 求 $FG\\!:\\!EF$ 的取值范围，并据此判断矩形 $EFGH$ 能否与矩形 $ABCD$ 相似。',
      figure: FIG283C03,
      blanks: [
        { kind: 'nums', label: '(1) $BE=$（全部填出，用逗号隔开）', answer: ['3', '2'] },
        { kind: 'text', label: '(2) 设 $k=FG\\!:\\!EF$，$k$ 的取值范围', answer: '$0<k<\\frac57$ 或 $k>\\frac75$', options: ['$k>0$ 且 $k\\ne1$', '$0<k<\\frac57$ 或 $k>\\frac75$', '$\\frac57<k<\\frac75$', '$\\frac57\\le k\\le\\frac75$'] },
        { kind: 'text', label: '(2) 矩形 $EFGH$ 能否与矩形 $ABCD$ 相似', answer: '不能', options: ['能', '不能'] },
      ],
      explain: [
        '思路：先把内接矩形的位置用两三个量表示出来。设 $BE=p$，$BF=q$，$k=\\frac{FG}{EF}$。',
        '$\\angle EFG=90^\\circ$，所以 $\\angle BFE+\\angle CFG=90^\\circ=\\angle BFE+\\angle BEF$，$\\angle BEF=\\angle CFG$，又 $\\angle B=\\angle C=90^\\circ$，$\\triangle EBF\\sim\\triangle FCG$，相似比 $\\frac{FG}{EF}=k$：$FC=kp$，$CG=kq$。',
        '$GH\\parallel EF$ 且 $GH=EF$，$\\triangle GDH$ 与 $\\triangle EBF$ 三个角对应相等、斜边相等，所以全等：$DG=BE=p$。于是 $BC$：$q+kp=7$；$CD$：$kq+p=5$。',
        '$k=1$ 时两式变成 $p+q=7$ 与 $p+q=5$，矛盾（所以内接正方形不存在）。$k\\ne1$ 时解得 $p=\\frac{5-7k}{1-k^2}$，$q=\\frac{7-5k}{1-k^2}$。',
        '(1) $k=2$：$p=\\frac{5-14}{-3}=3$，$q=1$，$CG=2$，都在边内；$k=\\frac12$：$p=\\frac{5-3.5}{0.75}=2$，$q=6$，$CG=3$，也在边内。$BE=3$ 或 $2$。',
        '(2) 要 $0<p<5$，$0<q<7$。$0<k<1$ 时分母为正：$p>0\\Rightarrow k<\\frac57$，$q>0\\Rightarrow k<\\frac75$，$p<5\\Rightarrow5k^2-7k<0\\Rightarrow k<\\frac75$，$q<7\\Rightarrow7k^2-5k<0\\Rightarrow k<\\frac57$，得 $0<k<\\frac57$。$k>1$ 时分母为负，不等号全部反向，得 $k>\\frac75$。',
        '矩形 $EFGH$ 与 $ABCD$ 相似要求 $k=\\frac75$ 或 $\\frac57$，恰好是范围的端点：$k=\\frac75$ 时 $p=5$、$q=0$，$k=\\frac57$ 时 $p=0$，都是顶点重合的退化情形。所以不能相似——内接矩形总比原矩形“更扁”。',
        '坑：(1) 只算一种“长是宽 2 倍”的摆法；(2) 只说“解方程无解”却不交代 $k$ 的范围。',
      ],
      verify: () => {
        const sol = k => { const p = (5 - 7 * k) / (1 - k * k); return [p, (7 - 5 * k) / (1 - k * k)]; };
        const valid = k => { const [p, q] = sol(k); return p > 1e-9 && p < 5 - 1e-9 && q > 1e-9 && q < 7 - 1e-9; };
        const be = [2, 0.5].filter(valid).map(k => F(Math.round(sol(k)[0])));
        const okRange = [0.3, 0.7, 1.41, 3].every(valid) && ![0.72, 1, 1.2, 1.39].some(valid);
        const canSim = valid(7 / 5) || valid(5 / 7);
        return [be, okRange ? '$0<k<\\frac57$ 或 $k>\\frac75$' : '', canSim ? '能' : '不能'];
      },
    },
    {
      id: '28.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，直角梯形 $ABCD$ 中，$AD\\parallel BC$，$\\angle B=90^\\circ$，$AD=2$，$BC=9$，$AB=7$。点 $F$ 在腰 $CD$ 上，过 $F$ 作 $CD$ 的垂线交边 $AB$ 于点 $E$。若四边形 $AEFD$ 与四边形 $EBCF$ 相似（顶点的对应关系不确定），求 $CF$ 的长。',
      figure: FIG283C04,
      blanks: [{ kind: 'real', label: '$CF=$（化成最简形式）', answer: '6√2', simplest: true }],
      explain: [
        '先算角：作 $DH\\perp BC$ 于 $H$，$DH=7$，$CH=9-2=7$，$\\triangle DHC$ 是等腰直角三角形，$\\angle C=45^\\circ$，$\\angle ADC=135^\\circ$，$CD=7\\sqrt2$。',
        '四边形 $AEFD$ 的角依次为 $\\angle A=90^\\circ$、$\\angle AEF=360^\\circ-90^\\circ-90^\\circ-135^\\circ=45^\\circ$、$\\angle EFD=90^\\circ$、$\\angle D=135^\\circ$；四边形 $EBCF$ 的角依次为 $\\angle BEF=135^\\circ$、$\\angle B=90^\\circ$、$\\angle C=45^\\circ$、$\\angle CFE=90^\\circ$。两个四边形都是“两个直角相对”，与梯形不同，对应关系要按角一个个配。',
        '先由角筛对应：$45^\\circ$ 角只有 $\\angle AEF$ 和 $\\angle C$，$135^\\circ$ 角只有 $\\angle D$ 和 $\\angle BEF$，所以必须 $E\\to C$、$D\\to E$；剩下两个直角 $A$、$F$ 配 $B$、$F$，有两种配法：①$A\\to B$，$F\\to F$：$A,E,F,D$ 依次对 $B,C,F,E$，和 $E,B,C,F$ 是同一个转向（同向）；②$A\\to F$，$F\\to B$：$A,E,F,D$ 依次对 $F,C,B,E$，正好是 $E,B,C,F$ 倒过来走（反向，顶点顺序相反）。两种都满足“对应角相等”，都要检验边。',
        '用坐标表示各边：$B(0,0)$，$C(9,0)$，$D(2,7)$。设 $F$ 到 $BC$ 的距离为 $s$，则 $F(9-s,s)$，$CF=\\sqrt2s$，$FD=\\sqrt2(7-s)$；$EF$ 与 $CD$ 垂直，方向是“横走 $1$、竖降 $1$”，得 $E(0,2s-9)$，$EF=\\sqrt2(9-s)$，$BE=2s-9$，$AE=16-2s$。$E$ 在边 $AB$ 上要 $0<2s-9<7$，即 $4.5<s<8$，又 $F$ 在 $CD$ 上，$s<7$，所以 $4.5<s<7$。',
        '①（同向）：对应边是 $AE$ 对 $BC$、$EF$ 对 $CF$、$FD$ 对 $FE$、$DA$ 对 $EB$，四个比 $\\frac{BC}{AE}=\\frac{9}{16-2s}$，$\\frac{CF}{EF}=\\frac{s}{9-s}$，$\\frac{FE}{FD}=\\frac{9-s}{7-s}$，$\\frac{EB}{DA}=\\frac{2s-9}{2}$ 要全相等。只看中间两个：$s(7-s)=(9-s)^2$，$2s^2-25s+81=0$，判别式 $625-648<0$，无解，所以①不可能。',
        '②（反向）：对应边是 $AE$ 对 $FC$、$EF$ 对 $CB$、$FD$ 对 $BE$、$DA$ 对 $EF$，四个比 $\\frac{CF}{AE}=\\frac{\\sqrt2s}{16-2s}$，$\\frac{BC}{EF}=\\frac{9}{\\sqrt2(9-s)}$，$\\frac{BE}{FD}=\\frac{2s-9}{\\sqrt2(7-s)}$，$\\frac{EF}{DA}=\\frac{\\sqrt2(9-s)}{2}$ 要全相等。由第二、三个比相等：$9(7-s)=(9-s)(2s-9)$，$s^2-18s+72=0$，$s=6$ 或 $12$；$s=12$ 时 $BE=15>7$，$E$ 跑到 $BA$ 的延长线上（也不满足 $4.5<s<7$），舍去。',
        '验算 $s=6$：$AD\\!:\\!FE=2\\!:\\!3\\sqrt2$，$DF\\!:\\!EB=\\sqrt2\\!:\\!3$，$FE\\!:\\!BC=3\\sqrt2\\!:\\!9$，$EA\\!:\\!CF=4\\!:\\!6\\sqrt2$，四个比都等于 $\\sqrt2\\!:\\!3$（另外两个比也成立，不只是解方程用的那两个），对应角也相等，确实相似。所以 $CF=6\\sqrt2$。',
        '坑：只试同向的对应，①无解就以为无解，漏掉顶点顺序相反的②；按字母顺序硬套 $A\\to E$、$E\\to B$……（角对不上）；或解出 $s=12$ 不检验 $E$ 是否在边 $AB$ 上。',
      ],
      verify: () => {
        const B = [0, 0], C = [9, 0], D = [2, 7], A = [0, 7];
        const angs = P => P.map((p, i) => {
          const a = P[(i + 3) % 4], b = P[(i + 1) % 4];
          const u = [a[0] - p[0], a[1] - p[1]], v = [b[0] - p[0], b[1] - p[1]];
          return Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v));
        });
        const sides = P => P.map((p, i) => d283(p, P[(i + 1) % 4]));
        const sols = [];
        for (let i = 4501; i < 7000; i++) {
          const s = i / 1000;
          const F_ = [9 - s, s], E = [0, 2 * s - 9];
          const P1 = [A, E, F_, D], P2 = [E, B, C, F_];
          const a1 = angs(P1), s1 = sides(P1), a2 = angs(P2), s2 = sides(P2);
          for (let st = 0; st < 4; st++) for (const dir of [1, -1]) {
            const idx = [0, 1, 2, 3].map(j => ((st + dir * j) % 4 + 4) % 4);
            const angOk = idx.every((k, j) => Math.abs(a2[k] - a1[j]) < 1e-6);
            const sideIdx = [0, 1, 2, 3].map(j => (dir === 1 ? idx[j] : (idx[j] + 3) % 4));
            const r = sideIdx.map((k, j) => s2[k] / s1[j]);
            if (angOk && r.every(t => Math.abs(t - r[0]) < 1e-6)) sols.push(d283(F_, C));
          }
        }
        return sols.length ? sols[0] : NaN;
      },
    },
    {
      id: '28.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '点 $P$ 在双曲线 $y=\\frac{12}{x}$（$x>0$）上，点 $Q$ 在双曲线 $y=\\frac3x$ 上（两支都可以）。过 $P$ 作 $PM\\perp x$ 轴于 $M$、$PN\\perp y$ 轴于 $N$，过 $Q$ 作 $QS\\perp x$ 轴于 $S$、$QT\\perp y$ 轴于 $T$，矩形 $OMPN$ 与矩形 $OSQT$ 相似。设 $P$ 的横坐标为 $u$。(1) 当 $O$、$P$、$Q$ 不在一条直线上、$Q$ 在第一象限且 $u>2\\sqrt3$ 时，求 $\\triangle OPQ$ 的面积 $S$ 关于 $u$ 的函数解析式；(2) 若 $PQ=\\sqrt{10}$，求点 $Q$ 的横坐标。',
      blanks: [
        { kind: 'expr', label: '(1) $S=$', answer: 'u^2/4-36/u^2' },
        { kind: 'reals', label: '(2) 点 $Q$ 的横坐标（全部填出，用逗号隔开）', answer: ['1', '3', '√5', '3√5/5'], simplest: true },
      ],
      explain: [
        '$P(u,\\frac{12}u)$，矩形 $OMPN$ 两边为 $OM=u$、$ON=\\frac{12}u$。设 $Q(w,\\frac3w)$，矩形 $OSQT$ 两边为 $|w|$、$\\frac3{|w|}$。',
        '两种对应：$OM$ 对 $OS$ 时 $\\frac{u}{|w|}=\\frac{12/u}{3/|w|}$，$u^2=4w^2$，$Q(\\frac u2,\\frac6u)$ 或 $(-\\frac u2,-\\frac6u)$，都在直线 $OP$ 上；$OM$ 对 $OT$ 时 $\\frac{u}{3/|w|}=\\frac{12/u}{|w|}$，$u|w|=6$，$Q(\\frac6u,\\frac u2)$ 或 $(-\\frac6u,-\\frac u2)$。后一种当 $u=2\\sqrt3$ 时 $P$、$Q$ 都在 $y=x$ 上，也共线。',
        '(1) 不共线且 $Q$ 在第一象限，只能是 $Q(\\frac6u,\\frac u2)$。$u>2\\sqrt3$ 时 $P$ 在 $Q$ 右下方。割补：过 $P$、$Q$ 作 $x$ 轴的垂线，$S_{\\triangle OPQ}=S_{\\triangle OQS}+S_{\\text{梯形}QSMP}-S_{\\triangle OPM}$，其中 $S_{\\triangle OQS}=\\frac12\\cdot\\frac6u\\cdot\\frac u2=\\frac32$，$S_{\\triangle OPM}=\\frac12\\cdot u\\cdot\\frac{12}u=6$，梯形 $=\\frac12(\\frac u2+\\frac{12}u)(u-\\frac6u)=\\frac{u^2}4+\\frac92-\\frac{36}{u^2}$。',
        '所以 $S=\\frac32+\\frac{u^2}4+\\frac92-\\frac{36}{u^2}-6=\\frac{u^2}4-\\frac{36}{u^2}$（$u>2\\sqrt3$）。',
        '(2) 四种位置分别算 $PQ^2$（两点间距离公式）。同向、第一象限：$PQ^2=\\frac{u^2}4+\\frac{36}{u^2}=10$，$u^4-40u^2+144=0$，$u^2=4$ 或 $36$，$u=2$ 或 $6$，$Q(1,3)$ 或 $(3,1)$。这里 $O$、$P$、$Q$ 共线不影响，两点都成立。',
        '反向、第一象限：$PQ^2=(u-\\frac6u)^2+(\\frac{12}u-\\frac u2)^2=\\frac54u^2+\\frac{180}{u^2}-24=10$，$5u^4-136u^2+720=0$，$u^2=\\frac{36}5$ 或 $20$，$Q$ 的横坐标 $\\frac6u=\\sqrt5$ 或 $\\frac{3\\sqrt5}5$。',
        '第三象限：同向时 $PQ^2=\\frac94u^2+\\frac{324}{u^2}=(\\frac32u-\\frac{18}u)^2+54\\ge54$；反向时 $PQ^2=(u+\\frac6u)^2+(\\frac{12}u+\\frac u2)^2\\ge(u+\\frac6u)^2=(u-\\frac6u)^2+24\\ge24$，都大于 $10$，无解。',
        '所以 $Q$ 的横坐标为 $1$、$3$、$\\sqrt5$、$\\frac{3\\sqrt5}5$。坑：以为“同向时三点共线”就要舍去（那只影响 (1) 的三角形，不影响 (2)）；或漏掉反向的两个解。',
      ],
      verify: () => {
        const S = u => { const P = [u, 12 / u], Q = [6 / u, u / 2]; return Math.abs(P[0] * Q[1] - P[1] * Q[0]) / 2; };
        const okS = [4, 5, 7].every(u => near283(S(u), u * u / 4 - 36 / (u * u)));
        const xs = [];
        const cands = u => [[u / 2, 6 / u], [-u / 2, -6 / u], [6 / u, u / 2], [-6 / u, -u / 2]];
        const f = (u, k) => { const Q = cands(u)[k]; return (u - Q[0]) ** 2 + (12 / u - Q[1]) ** 2 - 10; };
        for (let k = 0; k < 4; k++) {
          for (let i = 1; i < 20000; i++) {
            const a = i / 1000, b = (i + 1) / 1000;
            if (f(a, k) === 0 || f(a, k) * f(b, k) < 0) {
              let lo = a, hi = b;
              for (let t = 0; t < 80; t++) { const mid = (lo + hi) / 2; if (f(lo, k) * f(mid, k) <= 0) hi = mid; else lo = mid; }
              xs.push(cands(lo)[k][0]);
            }
          }
        }
        return [okS ? 'u^2/4-36/u^2' : '', xs];
      },
    },
  ],
});
