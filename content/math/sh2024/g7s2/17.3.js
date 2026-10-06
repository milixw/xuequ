'use strict';

// 上海数学七年级下册 · 17.3 全等三角形及其性质
// 知识范围：全等形（经过平移、旋转、翻折后能完全重合）、全等三角形、对应顶点 / 对应边 / 对应角，记号“≌”（对应顶点写在对应位置）；
//   性质：全等三角形的对应边相等、对应角相等；全等的传递性
// 可以使用：17.1、17.2（三边关系、内角和、外角）；第 16 章相交线与平行线；第 15 章不等式；七年级上册图形的运动（平移、旋转、翻折）与网格
// 还没学：三角形全等的判定（SSS、SAS、ASA、AAS 在 17.4，本节不能用判定证明全等，全等关系都由题目给出或由图形运动得到）；
//   等腰三角形的性质（18 章，本节“AB=AD”之类不能推出底角相等）；勾股定理（八年级）
// 本节约定：网格中每个小正方形的边长为 1

const SVG173 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: (pts, fill = 'none', dash = false) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" fill-opacity="0.5" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  rot: ([x, y], [cx, cy], deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];
  },
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  grid: (ox, oy, cols, rows, u) => {
    let g = '';
    for (let i = 0; i <= cols; i++) g += `<line x1="${ox + i * u}" y1="${oy}" x2="${ox + i * u}" y2="${oy + rows * u}" stroke="#c8c8c8"/>`;
    for (let j = 0; j <= rows; j++) g += `<line x1="${ox}" y1="${oy + j * u}" x2="${ox + cols * u}" y2="${oy + j * u}" stroke="#c8c8c8"/>`;
    return g;
  },
};

const FIG173 = (() => {
  const S = SVG173, out = {};
  // b04：△ABC 沿 BC 方向平移得 △DEF，B、E、C、F 在同一直线上
  {
    const B = [20, 150], C = [180, 150], A = [70, 50], v = 80;
    const E = [B[0] + v, B[1]], Fp = [C[0] + v, C[1]], D = [A[0] + v, A[1]];
    out.b04 = S.wrap(300, 180, S.poly([A, B, C]) + S.poly([D, E, Fp]) + S.text('A', A, 0, -14) + S.text('B', B, -6, 14) + S.text('C', C, 4, 14)
      + S.text('D', D, 0, -14) + S.text('E', E, -4, 14) + S.text('F', Fp, 6, 14));
  }
  // b05：△ABC 绕点 A 旋转得 △ADE，射线 AB、AD、AC、AE 依次排列
  {
    const A = [150, 170];
    const P = (deg, r) => [A[0] + r * Math.cos((deg * Math.PI) / 180), A[1] - r * Math.sin((deg * Math.PI) / 180)];
    const B = P(150, 120), C = P(80, 140), D = P(110, 120), E = P(40, 140);
    out.b05 = S.wrap(300, 190, S.poly([A, B, C]) + S.poly([A, D, E], 'none', true) + S.text('A', A, 0, 14) + S.text('B', B, -10, 0) + S.text('C', C, 4, -12)
      + S.text('D', D, -4, -12) + S.text('E', E, 10, 0));
  }
  // b07：把 △ABD 沿 AD 翻折得 △AED，B、D、C 在同一直线上；∠B=50°，∠ADB=100°（钝角），E 落在 BC 下方
  {
    const B = [20, 150], D = [100, 150], C = [280, 150];
    const A = S.meet(B, [B[0] + Math.cos((50 * Math.PI) / 180), B[1] - Math.sin((50 * Math.PI) / 180)], D, [D[0] + Math.cos((80 * Math.PI) / 180), D[1] - Math.sin((80 * Math.PI) / 180)]);
    const dx = D[0] - A[0], dy = D[1] - A[1], t = ((B[0] - A[0]) * dx + (B[1] - A[1]) * dy) / (dx * dx + dy * dy);
    const Fo = [A[0] + t * dx, A[1] + t * dy], E = [2 * Fo[0] - B[0], 2 * Fo[1] - B[1]];
    out.b07 = S.wrap(300, 250, S.poly([A, B, C]) + S.seg(A, D) + S.seg(A, E, true) + S.seg(D, E, true) + S.text('A', A, 0, -14) + S.text('B', B, -8, 12) + S.text('C', C, 8, 12)
      + S.text('D', D, 4, -14) + S.text('E', E, 10, 4));
  }
  // b09：网格中的 △ABC，B(1,1)、C(3,1)、A(1,2)（y 向上），网格 4×3
  {
    const u = 40, ox = 20, oy = 20;
    const g = ([x, y]) => [ox + x * u, oy + (3 - y) * u];
    const A = g([1, 2]), B = g([1, 1]), C = g([3, 1]);
    out.b09 = S.wrap(200, 160, S.grid(ox, oy, 4, 3, u) + S.poly([A, B, C], '#cfe3f7') + S.text('A', A, -10, -6) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8));
  }
  // e01：△ABC 绕点 A 旋转得到 △ADE，点 D 落在 BC 上
  {
    const A = [120, 100], B = [30, 240], C = [255, 240];
    const len = Math.hypot(B[0] - A[0], B[1] - A[1]);
    const Dp = [A[0] + Math.sqrt(len * len - (B[1] - A[1]) ** 2), B[1]];
    const th = Math.atan2(Dp[1] - A[1], Dp[0] - A[0]) - Math.atan2(B[1] - A[1], B[0] - A[0]);
    const Ep = S.rot(C, A, (th * 180) / Math.PI);
    out.e01 = S.wrap(340, 265, S.poly([A, B, C]) + S.poly([A, Dp, Ep], 'none', true) + S.text('A', A, -6, -14) + S.text('B', B, -8, 12) + S.text('C', C, 8, 12) + S.text('D', Dp, 0, 14) + S.text('E', Ep, 10, 0));
  }
  // e02：Rt△ABC（∠B=90°）沿 BC 方向平移得 △DEF，DE 交 AC 于 G
  {
    const k = 18, B = [30, 170], A = [30, 170 - 8 * k], C = [30 + 9 * k, 170], v = 4 * k;
    const E = [B[0] + v, B[1]], D = [A[0] + v, A[1]], Fp = [C[0] + v, C[1]];
    const G = S.meet(A, C, D, E);
    out.e02 = S.wrap(320, 200, `<polygon points="${[A, B, E, G].map(p => p.map(v2 => v2.toFixed(1)).join(',')).join(' ')}" fill="#f6d8b8" fill-opacity="0.7" stroke="none"/>`
      + S.poly([A, B, C]) + S.poly([D, E, Fp]) + S.text('A', A, -10, 0) + S.text('B', B, -8, 12) + S.text('C', C, 4, 14) + S.text('D', D, 0, -14) + S.text('E', E, 0, 14) + S.text('F', Fp, 8, 12) + S.text('G', G, 10, -4));
  }
  // e03：B、C、E 共线，△ABC≌△CED（一线三等角），AB=3，BC=5，∠B=70°（每单位 30px）
  {
    const k = 30, B = [20, 190], C = [20 + 5 * k, 190], E = [20 + 8 * k, 190];
    const A = [B[0] + 3 * k * Math.cos((70 * Math.PI) / 180), B[1] - 3 * k * Math.sin((70 * Math.PI) / 180)];
    const D = [E[0] + 5 * k * Math.cos((110 * Math.PI) / 180), E[1] - 5 * k * Math.sin((110 * Math.PI) / 180)];
    out.e03 = S.wrap(290, 215, S.poly([A, B, C]) + S.poly([C, E, D]) + S.seg(A, D, true)
      + S.text('A', A, -8, -12) + S.text('B', B, -8, 12) + S.text('C', C, 0, 14) + S.text('E', E, 8, 12) + S.text('D', D, 0, -14));
  }
  // e04：△ABE≌△ACD，D 在 AB 上，E 在 AC 上，BE 与 CD 交于 O
  {
    const A = [150, 25], B = [40, 175], C = [265, 175];
    const D = [A[0] + (B[0] - A[0]) * 0.55, A[1] + (B[1] - A[1]) * 0.55], E = [A[0] + (C[0] - A[0]) * 0.5, A[1] + (C[1] - A[1]) * 0.5];
    const O = S.meet(B, E, C, D);
    out.e04 = S.wrap(300, 200, S.seg(A, B) + S.seg(A, C) + S.seg(B, E) + S.seg(C, D)
      + S.text('A', A, 0, -14) + S.text('B', B, -8, 10) + S.text('C', C, 8, 10) + S.text('D', D, -12, 0) + S.text('E', E, 12, 0) + S.text('O', O, 0, 16));
  }
  return out;
})();

// verify 用：屏幕或数学坐标下 ∠qpr 的度数
const ang173 = (p, q, r) => {
  let d = (Math.abs(Math.atan2(q[1] - p[1], q[0] - p[0]) - Math.atan2(r[1] - p[1], r[0] - p[0])) * 180) / Math.PI;
  return d > 180 ? 360 - d : d;
};
const parallel173 = (d1, d2) => { const x = (((d1 - d2) % 180) + 180) % 180; return x < 1e-9 || 180 - x < 1e-9; };

Content.section({
  id: 'math/sh2024/g7s2/17.3',
  title: '全等三角形及其性质',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。本节只学全等的性质，全等关系由题目给出或由图形运动得到。第 1 轮 c02 数据在几何上不成立（AB=AD 时 ∠EDC 应为 40°）且与 e01 同构，b07、e01、e03 配图与题干不一致，c04 第 3 空有歧义，c01（靠勾股排除斜放）、c03（题干提示分类）偏易，卡片例子撞 b05；第 2 轮 c02 换成“旋转角分类 + 直线夹角等于旋转角”，e03 换成一线三等角，c01 改为限定运动方式的网格计数 + 按公共顶点去重，c03 去掉提示，重画配图、换卡片例子，复核指出 c04 只有一次分类；第 3 轮 c04 改为平移方向不确定的分段讨论，(3) 措辞改清后判定整节通过。复核认为本节挑战题上限约为真卷 5 级' },

  intro: [
    {
      title: '全等形',
      body: '一个图形经过**平移、旋转、翻折**后，能与另一个图形完全重合，这两个图形叫作全等形。全等的两个三角形叫作全等三角形。全等形的形状和大小都相同，与位置无关。点「播放」看三角形旋转后与另一个重合。',
      example: '把一张三角形纸片绕一个顶点转一个角度，转动前后的两个三角形全等。',
      demo: { type: 'motion', mode: 'rotate', shape: [[2, 1], [5, 1], [3, 3]], center: [2, 1], angle: 90, view: [-2, 7, -3, 5] },
    },
    {
      title: '对应元素与记号',
      body: '两个全等三角形重合时，重合的顶点、边、角分别叫对应顶点、对应边、对应角。记作 $\\triangle ABC\\cong\\triangle DEF$ 时，**对应顶点写在对应的位置上**：$A$ 对 $D$，$B$ 对 $E$，$C$ 对 $F$，于是 $AB$ 对 $DE$，$\\angle B$ 对 $\\angle E$。',
      example: '$\\triangle PQR\\cong\\triangle XYZ$：$QR$ 的对应边是 $YZ$，$\\angle R$ 的对应角是 $\\angle Z$。',
      pitfall: '找对应边、对应角要看字母的位置，不能凭图上看起来“差不多大”。',
    },
    {
      title: '全等三角形的性质',
      body: '全等三角形的**对应边相等，对应角相等**；因此周长相等，面积相等，对应的高、中线、角平分线也相等。如果两个三角形都和第三个三角形全等，那么这两个三角形全等（传递性）。',
      example: '$\\triangle ABC\\cong\\triangle DEF$，$AB=3$，$\\angle A=55^\\circ$，则 $DE=3$，$\\angle D=55^\\circ$。',
    },
    {
      title: '在图形运动中找全等',
      body: '平移、旋转、翻折都不改变图形的形状和大小，所以运动前后的三角形全等。旋转时，对应边绕同一点转过相同的角；共边、共顶点时，常用“同一个角加上（减去）同一部分”得到新的相等关系。',
      example: '$\\triangle PQR$ 绕点 $P$ 旋转得 $\\triangle PMN$，若射线 $PR$、$PM$ 不重叠：$\\angle QPR=\\angle MPN$，两边同加 $\\angle RPM$，得 $\\angle QPM=\\angle RPN$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '17.3-b01',
      level: 'basic',
      type: 'choice',
      stem: '已知 $\\triangle ABC\\cong\\triangle DEF$，下列结论中正确的是（　　）',
      options: ['$AB=EF$', '$\\angle B=\\angle E$', '$AC=DE$', '$\\angle C=\\angle D$'],
      answer: 1,
      explain: [
        '对应顶点：$A\\leftrightarrow D$，$B\\leftrightarrow E$，$C\\leftrightarrow F$。',
        '对应边：$AB=DE$，$BC=EF$，$AC=DF$；对应角：$\\angle A=\\angle D$，$\\angle B=\\angle E$，$\\angle C=\\angle F$。',
        '只有 B 正确。坑：按字母“看起来顺”去配，比如把 $AB$ 和 $EF$ 配在一起。',
      ],
    },
    {
      id: '17.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\triangle ABC\\cong\\triangle DEF$，$AB=5$，$BC=7$，$\\angle A=50^\\circ$，$\\angle B=70^\\circ$。求 $EF$ 的长和 $\\angle F$ 的度数。',
      blanks: [
        { kind: 'num', label: '$EF=$', answer: '7' },
        { kind: 'angle', label: '$\\angle F=$', answer: '60°' },
      ],
      explain: [
        '$EF$ 的对应边是 $BC$，所以 $EF=BC=7$。',
        '$\\angle F$ 的对应角是 $\\angle C$，$\\angle C=180^\\circ-50^\\circ-70^\\circ=60^\\circ$，所以 $\\angle F=60^\\circ$。',
        '坑：把 $EF$ 当成 $AB$ 的对应边答 $5$；$\\angle F$ 题中没直接给，要先用内角和求 $\\angle C$。',
      ],
      verify: () => [7, 180 - 50 - 70],
    },
    {
      id: '17.3-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的是（　　）',
      options: ['全等三角形的面积相等', '面积相等的两个三角形全等', '周长相等的两个三角形全等', '所有的等边三角形都全等'],
      answer: 0,
      explain: [
        'A：全等三角形能完全重合，面积一定相等，正确。',
        'B：底 $4$、高 $3$ 的三角形和底 $6$、高 $2$ 的三角形面积相等，但不全等。C：三边 $3,4,5$ 与 $4,4,4$ 周长相等，不全等。',
        'D：边长不同的等边三角形大小不同，不全等。选 A。坑：把性质反过来用（面积相等推不出全等）。',
      ],
    },
    {
      id: '17.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 沿 $BC$ 方向平移得到 $\\triangle DEF$，点 $B$、$E$、$C$、$F$ 在同一直线上，$BF=10$，$EC=4$。求平移的距离 $BE$。',
      figure: FIG173.b04,
      blanks: [
        { kind: 'num', label: '$BE=$', answer: '3' },
      ],
      explain: [
        '平移前后两个三角形全等，$BC=EF$。两边同减 $EC$，得 $BE=CF$。',
        '$BF=BE+EC+CF=2BE+4=10$，所以 $BE=3$。',
        '坑：以为 $BE=BF-EC=6$，忘了 $BE$ 和 $CF$ 各占一份。',
      ],
      verify: () => (10 - 4) / 2,
    },
    {
      id: '17.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 绕点 $A$ 旋转得到 $\\triangle ADE$，射线 $AB$、$AD$、$AC$、$AE$ 依次排列，$\\angle BAE=110^\\circ$，$\\angle CAD=30^\\circ$。求旋转角 $\\angle BAD$ 的度数。',
      figure: FIG173.b05,
      blanks: [
        { kind: 'angle', label: '$\\angle BAD=$', answer: '40°' },
      ],
      explain: [
        '$\\triangle ABC\\cong\\triangle ADE$，$\\angle BAC=\\angle DAE$。两边同减 $\\angle DAC$，得 $\\angle BAD=\\angle CAE$。',
        '$\\angle BAE=\\angle BAD+\\angle DAC+\\angle CAE=2\\angle BAD+30^\\circ=110^\\circ$，$\\angle BAD=40^\\circ$。',
        '坑：直接用 $110^\\circ-30^\\circ=80^\\circ$ 当作旋转角。',
      ],
      verify: () => (110 - 30) / 2,
    },
    {
      id: '17.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\triangle ABC\\cong\\triangle DEF$，$\\triangle ABC$ 的周长为 $24$，$AB=7$，$DF=9$。求 $EF$ 的长。',
      blanks: [
        { kind: 'num', label: '$EF=$', answer: '8' },
      ],
      explain: [
        '$DF$ 的对应边是 $AC$，所以 $AC=9$。',
        '$BC=24-AB-AC=24-7-9=8$，而 $EF$ 的对应边是 $BC$，所以 $EF=8$。',
        '坑：把 $DF$ 当成 $\\triangle ABC$ 的边直接用，却没找对它对应 $AC$。',
      ],
      verify: () => 24 - 7 - 9,
    },
    {
      id: '17.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，点 $D$ 在 $\\triangle ABC$ 的边 $BC$ 上，把 $\\triangle ABD$ 沿 $AD$ 翻折得到 $\\triangle AED$，$\\angle B=50^\\circ$，$\\angle BAD=30^\\circ$。求 $\\angle EDC$ 的度数。',
      figure: FIG173.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle EDC=$', answer: '20°' },
      ],
      explain: [
        '在 $\\triangle ABD$ 中，$\\angle ADB=180^\\circ-50^\\circ-30^\\circ=100^\\circ$，所以 $\\angle ADC=80^\\circ$。',
        '翻折后 $\\triangle AED\\cong\\triangle ABD$，$\\angle ADE=\\angle ADB=100^\\circ$。',
        '$\\angle EDC=\\angle ADE-\\angle ADC=100^\\circ-80^\\circ=20^\\circ$。坑：以为 $\\angle ADE=\\angle ADC$，或者把 $\\angle EDC$ 当成 $80^\\circ$。',
      ],
      verify: () => (180 - 50 - 30) - (180 - (180 - 50 - 30)),
    },
    {
      id: '17.3-b08',
      level: 'basic',
      type: 'choice',
      stem: '在四边形 $ABCD$ 中，连接对角线 $AC$，已知 $\\triangle ABC\\cong\\triangle CDA$。下列结论中正确的是（　　）',
      options: ['$AB=AD$', '$\\angle BAC=\\angle DCA$', '$\\angle ACB=\\angle DCA$', '$BC=CD$'],
      answer: 1,
      explain: [
        '对应顶点：$A\\leftrightarrow C$，$B\\leftrightarrow D$，$C\\leftrightarrow A$。',
        '对应边：$AB=CD$，$BC=DA$，$CA=AC$；对应角：$\\angle BAC=\\angle DCA$，$\\angle B=\\angle D$，$\\angle ACB=\\angle CAD$。',
        '所以 B 正确。坑：公共边 $AC$ 让人以为 $A$ 对 $A$、$C$ 对 $C$，要按记号的位置配对。',
      ],
    },
    {
      id: '17.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $4\\times3$ 的网格中，$\\triangle ABC$ 的顶点都在格点上。以 $B$、$C$ 为两个顶点，在网格中再找一个格点 $D$（不与 $A$ 重合），使 $\\triangle DBC$ 与 $\\triangle ABC$ 全等。这样的点 $D$ 共有几个？',
      figure: FIG173.b09,
      blanks: [
        { kind: 'num', label: '', answer: '3', suffix: '个' },
      ],
      explain: [
        '$\\triangle ABC$ 是直角三角形：$AB=1$（竖直），$BC=2$（水平），直角在 $B$。$\\triangle DBC$ 与它全等，$BC$ 是公共边，另外两边一条是长为 $1$、与 $BC$ 垂直的直角边。',
        '直角在 $B$：$D$ 在 $B$ 的正上方或正下方 $1$ 格，正上方是 $A$ 本身，正下方是一个。',
        '直角在 $C$：$D$ 在 $C$ 的正上方或正下方 $1$ 格，共两个。',
        '共 $3$ 个，分别相当于把 $\\triangle ABC$ 沿 $BC$ 翻折、沿 $BC$ 的垂直平分线翻折、绕 $BC$ 的中点旋转 $180^\\circ$。坑：只想到沿 $BC$ 翻折这一种。',
      ],
      verify: () => {
        const A = [1, 2], B = [1, 1], C = [3, 1];
        const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
        const want = [d2(A, B), d2(A, C)].sort((x, y) => x - y).join();
        let n = 0;
        for (let x = 0; x <= 4; x++) for (let y = 0; y <= 3; y++) {
          const D = [x, y];
          if (x === A[0] && y === A[1]) continue;
          if ((D[0] - B[0]) * (C[1] - B[1]) - (D[1] - B[1]) * (C[0] - B[0]) === 0) continue;
          if ([d2(D, B), d2(D, C)].sort((p, q) => p - q).join() === want) n++;
        }
        return n;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '17.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 绕点 $A$ 旋转得到 $\\triangle ADE$，点 $D$ 恰好落在边 $BC$ 上，$\\angle BAD=34^\\circ$。求 $\\angle EDC$ 和 $\\angle CAE$ 的度数。',
      figure: FIG173.e01,
      blanks: [
        { kind: 'angle', label: '$\\angle EDC=$', answer: '34°' },
        { kind: 'angle', label: '$\\angle CAE=$', answer: '34°' },
      ],
      explain: [
        '$\\triangle ABC\\cong\\triangle ADE$：$\\angle ADE=\\angle B$，$\\angle BAC=\\angle DAE$。',
        '$\\angle ADC$ 是 $\\triangle ABD$ 的外角：$\\angle ADC=\\angle B+\\angle BAD$。所以 $\\angle EDC=\\angle ADC-\\angle ADE=\\angle B+34^\\circ-\\angle B=34^\\circ$。',
        '$\\angle BAC=\\angle DAE$，两边同减 $\\angle DAC$：$\\angle CAE=\\angle BAD=34^\\circ$。',
        '转弯：$\\angle B$ 不知道，但它在外角关系和对应角关系里各出现一次，正好抵消。',
      ],
      verify: () => {
        const r = [];
        for (const b of [40, 55, 70]) { const adc = b + 34; r.push(adc - b); }
        return r.every(x => x === 34) ? [34, 34] : null;
      },
    },
    {
      id: '17.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=90^\\circ$，$AB=8$。把 $\\triangle ABC$ 沿 $BC$ 方向平移 $4$ 个单位得到 $\\triangle DEF$，$DE$ 交 $AC$ 于点 $G$，$DG=3$。求阴影部分（四边形 $ABEG$）的面积。',
      figure: FIG173.e02,
      blanks: [
        { kind: 'num', label: '', answer: '26' },
      ],
      explain: [
        '平移前后全等：$S_{\\triangle ABC}=S_{\\triangle DEF}$。两者都减去重叠部分 $\\triangle GEC$，得 $S_{\\text{四边形}ABEG}=S_{\\text{四边形}DGCF}$……换一种更直接的割法：',
        '阴影 $ABEG$ 与梯形 $DEFC$ 去掉 $\\triangle GEC$ 后剩下的部分面积相同。更简单的是：$S_{ABEG}=S_{\\triangle ABC}-S_{\\triangle GEC}=S_{\\triangle DEF}-S_{\\triangle GEC}=S_{\\text{梯形}DGCF}$。',
        '梯形 $DGCF$：$DE=AB=8$，$GE=DE-DG=5$，$EF=BC$，$CF=BE=4$。它是以 $GE$、$DE$ 为两底、$CF$ 为高的直角梯形吗？不是——我们直接算阴影：$ABEG$ 是直角梯形，两底 $AB=8$、$GE=5$，高 $BE=4$。',
        '$S=\\frac12\\times(8+5)\\times4=26$。转弯：$GE$ 不能直接量，要用对应边 $DE=AB=8$ 减去 $DG$。',
      ],
      verify: () => (8 + (8 - 3)) * 4 / 2,
    },
    {
      id: '17.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，点 $B$、$C$、$E$ 依次在同一直线上，$\\triangle ABC\\cong\\triangle CED$，点 $A$、$D$ 在直线的同侧，$AB=3$，$DE=5$，$\\angle B=70^\\circ$。求 $BE$ 的长和 $\\angle ACD$ 的度数。',
      figure: FIG173.e03,
      blanks: [
        { kind: 'num', label: '$BE=$', answer: '8' },
        { kind: 'angle', label: '$\\angle ACD=$', answer: '70°' },
      ],
      explain: [
        '先写对应关系：$A\\leftrightarrow C$，$B\\leftrightarrow E$，$C\\leftrightarrow D$。所以 $AB=CE$，$BC=ED$，$\\angle BAC=\\angle ECD$。',
        '$BE=BC+CE=ED+AB=5+3=8$。',
        '$B$、$C$、$E$ 共线：$\\angle ACD=180^\\circ-\\angle ACB-\\angle ECD=180^\\circ-\\angle ACB-\\angle BAC=\\angle B=70^\\circ$（三角形内角和）。',
        '转弯：按记号写对应关系时，$\\triangle CED$ 里 $C$ 排在第一位，对应 $\\triangle ABC$ 的 $A$；再把 $\\angle ECD$ 换成 $\\angle BAC$，用内角和把三个角凑在一起。',
      ],
      verify: () => [5 + 3, 180 - (180 - 70)],
    },
    {
      id: '17.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\triangle ABE\\cong\\triangle ACD$，点 $D$ 在 $AB$ 上，点 $E$ 在 $AC$ 上，$BE$ 与 $CD$ 相交于点 $O$，$\\angle A=50^\\circ$，$\\angle C=25^\\circ$。求 $\\angle BDC$ 和 $\\angle BOC$ 的度数。',
      figure: FIG173.e04,
      blanks: [
        { kind: 'angle', label: '$\\angle BDC=$', answer: '75°' },
        { kind: 'angle', label: '$\\angle BOC=$', answer: '100°' },
      ],
      explain: [
        '$\\angle BDC$ 是 $\\triangle ADC$ 的外角：$\\angle BDC=\\angle A+\\angle C=50^\\circ+25^\\circ=75^\\circ$。',
        '$\\triangle ABE\\cong\\triangle ACD$，$\\angle B$ 与 $\\angle C$ 是对应角：$\\angle ABE=\\angle ACD=25^\\circ$。',
        '$\\angle BOC$ 是 $\\triangle BDO$ 的外角：$\\angle BOC=\\angle DBO+\\angle BDO=25^\\circ+75^\\circ=100^\\circ$。',
        '转弯：先用全等把 $\\angle ABE$ 求出来，再连续用两次外角。',
      ],
      verify: () => { const bdc = 50 + 25; return [bdc, 25 + bdc]; },
    },
    {
      id: '17.3-e05',
      level: 'extended',
      type: 'multi',
      stem: '已知 $\\triangle ABC\\cong\\triangle DEF$，点 $B$、$E$、$C$、$F$ 依次在同一直线上，但没有说明点 $A$、$D$ 在这条直线的同侧还是异侧。下列结论中一定成立的有（　　）',
      options: ['$BE=CF$', '$AB\\parallel DE$', '$\\angle ACB=\\angle DFE$', '$AC\\parallel DF$', '$AB=DE$'],
      answer: [0, 2, 4],
      explain: [
        'A：$BC=EF$，两边同减 $EC$，$BE=CF$，一定成立。C、E：全等三角形的对应角、对应边相等，一定成立。',
        'B：若 $A$、$D$ 在直线同侧，$\\angle ABC$ 与 $\\angle DEF$ 是同位角且相等，$AB\\parallel DE$；若在异侧，$\\triangle DEF$ 相当于翻到了直线另一边，$AB$ 向上倾斜、$DE$ 向下倾斜，两直线相交（除非都垂直于这条直线）。所以不一定成立。',
        'D：同理，不一定成立。选 A、C、E。',
        '转弯：题目没给图时，要想到两个三角形可以在直线的同侧或异侧；平行要靠“同位角相等”，而异侧时这两个角不再是同位角。',
      ],
      verify: () => {
        // B(0,0)，C(5,0)，A(1,3)；E(2,0)，F(7,0)。D 在同侧 (3,3) 或异侧 (3,−3)
        const dir = (p, q) => (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
        const A = [1, 3], B = [0, 0], C = [5, 0], E = [2, 0], Fp = [7, 0];
        const res = [true, true, true, true, true];
        for (const D of [[3, 3], [3, -3]]) {
          if (!parallel173(dir(A, B), dir(D, E))) res[1] = false;
          if (!parallel173(dir(A, C), dir(D, Fp))) res[3] = false;
        }
        return res.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '17.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 与 $\\triangle DEF$ 全等（对应顶点不确定），$AB=5$，$BC=x$，$CA=y$，$DE=x+1$，$EF=2y-7$，$FD=5$。求 $x$、$y$ 的值。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '5' },
        { kind: 'num', label: '$y=$', answer: '6' },
      ],
      explain: [
        '两个三角形三边对应相等，即 $\\{5,x,y\\}$ 与 $\\{x+1,2y-7,5\\}$ 是相同的三个数。按 $\\triangle DEF$ 中的 $5$ 对应谁分类。',
        '① $FD=5$ 对应 $AB=5$：剩下 $\\{x,y\\}=\\{x+1,2y-7\\}$。$x=x+1$ 不可能，所以 $x=2y-7$，$y=x+1$，解得 $x=5$，$y=6$。',
        '② $FD=5$ 对应 $BC=x$：$x=5$，剩下 $\\{5,y\\}=\\{6,2y-7\\}$，只能 $y=6$，$2y-7=5$，成立，与 ① 相同。③ $FD=5$ 对应 $CA=y$：$y=5$，剩下 $\\{5,x\\}=\\{x+1,3\\}$，$x=3$ 时 $5\\neq4$，$x+1=5$ 时 $x=4\\neq3$，矛盾。',
        '检验：三边 $5,5,6$ 满足三边关系。所以 $x=5$，$y=6$。转弯：对应关系不确定时，按某一条已知边的对应情况分类，每种情况都要检验。',
      ],
      verify: () => {
        const r = [];
        for (let x = 1; x <= 20; x++) for (let y = 1; y <= 20; y++) {
          const a = [5, x, y].sort((p, q) => p - q), b = [x + 1, 2 * y - 7, 5].sort((p, q) => p - q);
          if (a.join() === b.join() && a[0] + a[1] > a[2]) r.push([x, y]);
        }
        return r.length === 1 ? r[0] : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '17.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '在 $4\\times4$ 个格点组成的正方形点阵中（横、竖各 $4$ 个点，相邻两点距离为 $1$），$P(0,0)$、$Q(1,0)$、$R(0,2)$ 都是格点，$\\triangle PQR$ 的两条直角边分别为 $1$ 和 $2$。只考虑由 $\\triangle PQR$ 经过平移、旋转（$90^\\circ$ 的整数倍）、翻折得到、顶点仍在点阵上的三角形。(1) 这样的三角形共有多少个（包括 $\\triangle PQR$ 本身）？(2) 其中与 $\\triangle PQR$ 至少有一个公共顶点的有多少个（不包括 $\\triangle PQR$ 本身）？',
      blanks: [
        { kind: 'num', label: '(1)', answer: '48', suffix: '个' },
        { kind: 'num', label: '(2)', answer: '18', suffix: '个' },
      ],
      explain: [
        '(1) 这些三角形的两条直角边都沿网格线，一条长 $1$、一条长 $2$，所以它正好占一个“$1\\times2$”或“$2\\times1$”的长方形框，直角顶点是框的一个角。',
        '“竖着”的 $1\\times2$ 框（宽 $1$、高 $2$）在点阵中有 $3\\times2=6$ 个位置，每个框的 $4$ 个角都能当直角顶点，得 $4$ 个三角形，共 $24$ 个；“横着”的 $2\\times1$ 框同样 $24$ 个。合计 $48$ 个。',
        '(2) 分别数含 $P$、含 $Q$、含 $R$ 的三角形。顶点在某点时，它可能是直角顶点、短直角边的另一端、长直角边的另一端，逐一看是否出界：',
        '$P(0,0)$ 在点阵角上：作直角顶点 $2$ 个，作短边端点 $2$ 个，作长边端点 $2$ 个，共 $6$ 个。$Q(1,0)$ 在下边上：三种身份各 $3$ 个，共 $9$ 个。$R(0,2)$ 在左边上：同理共 $9$ 个。',
        '同时含两个顶点的：含 $P$、$Q$ 的 $2$ 个，含 $P$、$R$ 的 $2$ 个，含 $Q$、$R$ 的 $2$ 个（都包括 $\\triangle PQR$ 本身）；三个顶点都含的只有它本身。由“加上重复减去的”：$6+9+9-2-2-2+1=19$，去掉 $\\triangle PQR$ 本身，得 $18$ 个。',
        '思路：(1) 把三角形放进它的“外框”，先数框再数朝向；(2) 按公共顶点分类计数，同时含两个顶点的被数了两次，要减去，再补上三个都含的。',
      ],
      verify: () => {
        const pts = [];
        for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) pts.push([x, y]);
        const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
        const base = ['0,0', '1,0', '0,2'];
        let n = 0, share = 0;
        for (let i = 0; i < 16; i++) for (let j = i + 1; j < 16; j++) for (let k = j + 1; k < 16; k++) {
          const t = [pts[i], pts[j], pts[k]];
          // 两直角边沿网格线：三条边中有一条水平长 1 或 2、一条竖直长 2 或 1，且平方和为 1、4、5
          if ([d2(t[0], t[1]), d2(t[1], t[2]), d2(t[0], t[2])].sort((a, b) => a - b).join() !== '1,4,5') continue;
          n++;
          const ks = t.map(p => p.join());
          if (ks.slice().sort().join() === base.slice().sort().join()) continue;
          if (ks.some(q => base.includes(q))) share++;
        }
        return [n, share];
      },
    },
    {
      id: '17.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle BAC=70^\\circ$。把 $\\triangle ABC$ 绕点 $A$ 旋转得到 $\\triangle ADE$（点 $B$、$C$ 的对应点分别是 $D$、$E$），$\\angle CAD=20^\\circ$。直线 $BC$ 与直线 $DE$ 相交，所成的角中不大于 $90^\\circ$ 的那个角是多少度？（有几个填几个，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '', answer: ['50', '90'], suffix: '°' },
      ],
      explain: [
        '第一步：求旋转角 $\\angle BAD$。$\\triangle ADE\\cong\\triangle ABC$，射线 $AD$ 与 $AC$ 成 $20^\\circ$，$AD$ 可能在 $\\angle BAC$ 内部，也可能在它外部（$AC$ 的另一侧）。',
        '$AD$ 在 $\\angle BAC$ 内部：$\\angle BAD=70^\\circ-20^\\circ=50^\\circ$。$AD$ 在 $AC$ 外侧（远离 $AB$）：$\\angle BAD=70^\\circ+20^\\circ=90^\\circ$。若 $AD$ 在 $AB$ 外侧，$\\angle CAD>70^\\circ$，不可能。',
        '第二步：说明对应边所在直线的夹角等于旋转角。设直线 $AB$ 与 $DE$ 交于点 $P$，直线 $BC$ 与 $DE$ 交于点 $F$。由全等，$\\angle ABC=\\angle ADE$。在 $\\triangle APD$ 和 $\\triangle FPB$ 中（“8 字形”），$\\angle APD=\\angle FPB$（对顶角），所以 $\\angle PAD+\\angle ADP=\\angle PFB+\\angle PBF$，于是 $\\angle PFB=\\angle PAD$，即直线 $BC$ 与 $DE$ 所成的一个角等于 $\\angle BAD$（交点位置不同时，所成的角是它或它的补角）。',
        '所以所成的不大于 $90^\\circ$ 的角是 $50^\\circ$ 或 $90^\\circ$。',
        '思路：先由“旋转角”的位置分类，再用“对应角相等 + 8 字形”把直线的夹角转化成旋转角；两个环节缺一不可。',
      ],
      verify: () => {
        // A 在原点，AB 沿 0°，AC 沿 70°（|AB|=4，|AC|=5），绕 A 旋转 α，使 AD 与 AC 成 20°
        const rot = ([x, y], d) => { const a = (d * Math.PI) / 180; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; };
        const B = [4, 0], C = rot([5, 0], 70);
        const r = new Set();
        for (let al = 1; al < 360; al++) {
          const D = rot(B, al), E = rot(C, al);
          const dirD = (Math.atan2(D[1], D[0]) * 180) / Math.PI, dirC = 70;
          let diff = Math.abs(dirD - dirC) % 360;
          if (diff > 180) diff = 360 - diff;
          if (Math.abs(diff - 20) > 1e-9) continue;
          const d1 = Math.atan2(C[1] - B[1], C[0] - B[0]), d2 = Math.atan2(E[1] - D[1], E[0] - D[0]);
          let x = (Math.abs(d1 - d2) * 180) / Math.PI % 180;
          if (x > 90) x = 180 - x;
          r.add(Math.round(x));
        }
        return [...r].sort((p, q) => p - q);
      },
    },
    {
      id: '17.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '长方形纸片 $ABCD$ 足够长，点 $E$ 在边 $BC$ 上，沿 $AE$ 折叠，使 $\\triangle ABE$ 落到 $\\triangle AB\'E$ 的位置。若 $\\angle B\'AD=\\angle BAE-6^\\circ$，求 $\\angle BAE$ 的度数（有几个填几个，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BAE=$', answer: ['32', '84'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle BAE=x$（$0^\\circ<x<90^\\circ$）。折叠后 $\\triangle AB\'E\\cong\\triangle ABE$，$\\angle B\'AE=x$，所以 $\\angle BAB\'=2x$。',
        '$\\angle BAD=90^\\circ$。按 $AB\'$ 是否越过 $AD$ 分类：',
        '① $2x\\leq90^\\circ$（$B\'$ 在 $\\angle BAD$ 内部或 $AD$ 上）：$\\angle B\'AD=90^\\circ-2x$。$90-2x=x-6$，$x=32$，$2x=64<90$，符合。',
        '② $2x>90^\\circ$（$AB\'$ 越过 $AD$，$B\'$ 在长方形外）：$\\angle B\'AD=2x-90^\\circ$。$2x-90=x-6$，$x=84$，$2x=168>90$，符合（长方形足够长，$E$ 能落在 $BC$ 上）。',
        '所以 $\\angle BAE=32^\\circ$ 或 $84^\\circ$。思路：翻折得到全等，对应角相等使 $\\angle BAB\'=2\\angle BAE$；$B\'$ 的位置不确定，按 $2x$ 与 $90^\\circ$ 的大小分类，每种情况都要检验。',
      ],
      verify: () => {
        const r = [];
        for (let k = 1; k < 900; k++) {
          const x = k / 10, bad = 2 * x <= 90 ? 90 - 2 * x : 2 * x - 90;
          if (Math.abs(bad - (x - 6)) < 1e-9) r.push(Math.round(x));
        }
        return r;
      },
    },
    {
      id: '17.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '$\\triangle ABC$ 沿直线 $BC$ 平移得到 $\\triangle DEF$（点 $B$、$C$ 的对应点分别是 $E$、$F$），$BC=6$，平移的距离为 $d$（$d>0$），平移方向不确定。(1) 若向射线 $BC$ 的方向平移，且 $BF\\leq2EC$，求 $d$ 的取值范围；(2) 若向射线 $CB$ 的方向平移，且 $BF\\leq2EC$，求 $d$ 的取值范围；(3) 若平移方向可以任选，要使 $BF\\leq2EC$ 并且两个三角形有重叠部分，$d$ 的取值范围是什么？',
      blanks: [
        { kind: 'ineq', var: 'd', label: '(1)', answer: '0<d<=2', suffix: '或' },
        { kind: 'ineq', var: 'd', label: '', answer: 'd>=18' },
        { kind: 'ineq', var: 'd', label: '(2)', answer: 'd>0' },
        { kind: 'ineq', var: 'd', label: '(3)', answer: '0<d<6' },
      ],
      explain: [
        '平移距离就是 $BE=CF=d$，$EF=BC=6$（对应边相等）。在直线上设 $B$ 为原点、$C$ 为 $6$，按方向分别写出 $E$、$F$ 的位置。',
        '(1) 向右平移：$E$ 在 $d$，$F$ 在 $6+d$，$BF=6+d$。$EC$ 看 $E$ 在 $C$ 的哪侧：$0<d<6$ 时 $EC=6-d$，由 $6+d\\leq2(6-d)$ 得 $d\\leq2$；$d\\geq6$ 时 $EC=d-6$，由 $6+d\\leq2(d-6)$ 得 $d\\geq18$。所以 $0<d\\leq2$ 或 $d\\geq18$。',
        '(2) 向左平移：$E$ 在 $-d$，$F$ 在 $6-d$，$EC=6+d$；$BF=|6-d|$。$d\\leq6$ 时 $BF=6-d<6+d<2(6+d)$；$d>6$ 时 $BF=d-6<6+d<2(6+d)$。不论 $d$ 是多少都成立，所以 $d>0$。',
        '(3) 有重叠部分，就是平移距离小于 $BC$：$d<6$。向右时还要 $d\\leq2$，向左时 $d<6$ 都可以。不论方向，满足要求的 $d$ 合起来是 $0<d<6$（其中 $2<d<6$ 只能向左平移）。',
        '思路：方向不确定时，先按方向分类；每个方向里 $EC$（或 $BF$）的表达式又随“$E$ 在 $C$ 的哪一侧”改变，要再分段；最后按题意把两个方向的结果合起来。',
      ],
      verify: () => {
        const ok = (d, right) => { const s = right ? d : -d, bf = Math.abs(6 + s), ec = Math.abs(6 - s); return bf <= 2 * ec + 1e-12; };
        const ds = [];
        for (let k = 1; k <= 120; k++) ds.push(k / 4);
        const r = ds.filter(d => ok(d, true)), l = ds.filter(d => ok(d, false));
        const both = ds.filter(d => d < 6 && (ok(d, true) || ok(d, false)));
        return [
          r.filter(d => d < 6).pop() === 2 ? '0<d<=2' : null,
          r.filter(d => d >= 6)[0] === 18 ? 'd>=18' : null,
          l.length === ds.length ? 'd>0' : null,
          both[0] === 0.25 && both[both.length - 1] === 5.75 && both.length === 23 ? '0<d<6' : null,
        ];
      },
    },
    {
      id: '17.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle BAC=40^\\circ$，$\\angle B=60^\\circ$。把 $\\triangle ABC$ 绕点 $A$ 逆时针旋转 $\\alpha$（$0^\\circ<\\alpha<360^\\circ$）得到 $\\triangle AB\'C\'$。当 $\\triangle AB\'C\'$ 的某一条边与 $\\triangle ABC$ 的某一条边平行时（不考虑共线），这样的 $\\alpha$ 共有几个？其中最小的是多少度？',
      blanks: [
        { kind: 'num', label: '共', answer: '9', suffix: '个' },
        { kind: 'angle', label: '最小的 $\\alpha=$', answer: '60°' },
      ],
      explain: [
        '旋转后 $\\triangle AB\'C\'\\cong\\triangle ABC$，每条边都绕 $A$ 转了 $\\alpha$。记 $AB$ 的方向为 $0^\\circ$（逆时针量），$AC$ 为 $40^\\circ$；$\\angle B=60^\\circ$，$BC$ 所在直线的方向为 $120^\\circ$。旋转后：$AB\'$ 为 $\\alpha$，$AC\'$ 为 $40^\\circ+\\alpha$，$B\'C\'$ 为 $120^\\circ+\\alpha$。',
        '两条直线平行就是方向相同或相差 $180^\\circ$。过点 $A$ 的边（$AB\'$、$AC\'$ 与 $AB$、$AC$）只会重合不会平行，排除。剩下：',
        '$B\'C\'\\parallel AB$：$120+\\alpha=180,360$，$\\alpha=60^\\circ,240^\\circ$；$B\'C\'\\parallel AC$：$120+\\alpha=220,400$，$\\alpha=100^\\circ,280^\\circ$；$B\'C\'\\parallel BC$：$\\alpha=180^\\circ$。',
        '$AB\'\\parallel BC$：$\\alpha=120^\\circ,300^\\circ$；$AC\'\\parallel BC$：$40+\\alpha=120,300$，$\\alpha=80^\\circ,260^\\circ$。',
        '共 $9$ 个：$60^\\circ,80^\\circ,100^\\circ,120^\\circ,180^\\circ,240^\\circ,260^\\circ,280^\\circ,300^\\circ$，最小是 $60^\\circ$。思路：旋转得到全等，每条对应边转过相同的角；把“平行”翻译成方向相差 $180^\\circ$ 的整数倍，逐对列举。',
      ],
      verify: () => {
        const r = [];
        for (let a = 1; a < 360; a++) {
          const orig = [['AB', 0], ['AC', 40], ['BC', 120]], img = [['AB', a], ['AC', 40 + a], ['BC', 120 + a]];
          let hit = false;
          for (const [n1, d1] of img) for (const [n2, d2] of orig) {
            if (n1 !== 'BC' && n2 !== 'BC') continue;  // 两条都过点 A
            if (parallel173(d1, d2)) hit = true;
          }
          if (hit) r.push(a);
        }
        return [r.length, r[0]];
      },
    },
  ],
});
