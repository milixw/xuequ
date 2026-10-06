'use strict';

// 上海数学七年级下册 · 18.1 等腰三角形的性质
// 知识范围：等腰三角形的腰、底边、顶角、底角；定理“等腰三角形的两底角相等”（等边对等角）；定理“三线合一”
//   （顶角平分线、底边上的中线、底边上的高互相重合）；等腰三角形是轴对称图形，对称轴是三线所在直线；在三角形中，大边对大角
// 可以使用：第 17 章（三边关系、内角和、外角、全等的性质与判定 SSS/SAS/ASA/AAS）；第 16 章相交线与平行线；第 15 章不等式；七年级上册
// 还没学：等腰三角形的判定“等角对等边”、大角对大边（18.2，本节不能由角相等推出边相等）；等边三角形（18.3）；线段的垂直平分线（18.4）；
//   “30° 角所对直角边等于斜边的一半”、角平分线性质、HL、勾股定理（八年级）
// 本节约定：题中的等腰三角形都由“两边相等”给出

const SVG181 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  // 以 BC 为底、顶角为 apex 度的等腰三角形的顶点 A（A 在 BC 上方）
  apex: (B, C, deg) => {
    const m = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], half = Math.hypot(C[0] - B[0], C[1] - B[1]) / 2;
    const h = half / Math.tan(((deg / 2) * Math.PI) / 180);
    return [m[0], m[1] - h];
  },
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
};

const FIG181 = (() => {
  const S = SVG181, out = {};
  // b04：AB=AC，∠A=40°，CD 平分 ∠ACB 交 AB 于 D
  {
    const B = [95, 215], C = [205, 215], A = S.apex(B, C, 40);
    // CD 平分 ∠ACB：D 在 AB 上，AD:DB = AC:BC（只用于作图）
    const ac = Math.hypot(A[0] - C[0], A[1] - C[1]), bc = C[0] - B[0], D = S.at(A, B, ac / (ac + bc));
    out.b04 = S.wrap(300, 240, S.poly([A, B, C]) + S.seg(C, D) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, -12, 0));
  }
  // b06：AB=AC，∠B=30°，D 在 BC 上，AD=BD
  {
    const B = [20, 150], C = [280, 150], A = S.apex(B, C, 120);
    const D = [B[0] + (A[0] - B[0]) / 2 / Math.cos(Math.PI / 6) / Math.cos(Math.PI / 6), B[1]];
    out.b06 = S.wrap(300, 175, S.poly([A, B, C]) + S.seg(A, D) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14));
  }
  // e02：AB=AC，D 在 AC 上，BD=BC=AD
  {
    const B = [95, 225], C = [205, 225], A = S.apex(B, C, 46);
    const ab = Math.hypot(A[0] - B[0], A[1] - B[1]), D = S.at(A, C, (C[0] - B[0]) / ab);
    out.e02 = S.wrap(300, 245, S.poly([A, B, C]) + S.seg(B, D) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 12, 0));
  }
  // e04：AB=AC，P 在 BC 上，PD⊥AB 于 D，PE⊥AC 于 E
  {
    // 腰 6、腰上的高 5：顶角取锐角的情况，sin∠A=5/6；腰长按 30 px/单位画
    const top = (Math.asin(5 / 6) * 180) / Math.PI, half = 6 * 30 * Math.sin(((top / 2) * Math.PI) / 180);
    const B = [150 - half, 200], C = [150 + half, 200], A = S.apex(B, C, top), P = [B[0] + 2 * half * 0.33, 200];
    const foot = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy); return [a[0] + t * dx, a[1] + t * dy]; };
    const D = foot(P, A, B), E = foot(P, A, C);
    out.e04 = S.wrap(300, 225, S.poly([A, B, C]) + S.seg(P, D) + S.seg(P, E) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6)
      + S.text('P', P, 0, 14) + S.text('D', D, -12, -2) + S.text('E', E, 12, -2));
  }
  // c01：AB=AC，D 在 BC 上，E 在 AC 上，AD=AE
  {
    const B = [30, 200], C = [270, 200], A = S.apex(B, C, 64), D = [120, 200];
    const ad = Math.hypot(A[0] - D[0], A[1] - D[1]), ac = Math.hypot(A[0] - C[0], A[1] - C[1]), E = S.at(A, C, ad / ac);
    out.c01 = S.wrap(300, 235, S.poly([A, B, C]) + S.seg(A, D) + S.seg(D, E) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14) + S.text('E', E, 12, 0));
  }
  return out;
})();

// verify 用：等腰三角形中给定一个角，求另外两个角的所有可能（返回 [[a,b], ...]）
const others181 = deg => {
  const r = [];
  if (deg < 180) r.push([(180 - deg) / 2, (180 - deg) / 2]);   // deg 是顶角
  if (deg < 90) r.push([deg, 180 - 2 * deg]);                    // deg 是底角
  return r;
};

Content.section({
  id: 'math/sh2024/g7s2/18.1',
  title: '等腰三角形的性质',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“等边对等角”配 motion 翻折动画。第 1 轮 e05、c05 都靠同一个反证（大边对大角当时还没学），c04 D 项用到等角对等边，e01、e02、e04、c01 数据与网上流传题相同，c01、c02、c04、c05 偏易，卡片 4 例子接近 b05；第 2 轮换数据，c01 改成不给图、D、E 在直线上的位置分类，c02、c03 各加一问反求，c04 改成顶角可锐可钝的多选，c05 改成腰上中线分周长差加底角筛选，整节通过；按意见重画 e04 配图并补全 c01 (2) 的 6 种组合说明' },

  intro: [
    {
      title: '等边对等角',
      body: '等腰三角形 $ABC$ 中 $AB=AC$，$AB$、$AC$ 是腰，$BC$ 是底边，$\\angle A$ 是顶角，$\\angle B$、$\\angle C$ 是底角。**定理**：等腰三角形的两底角相等（等边对等角）。证明：作顶角平分线 $AD$，由 SAS 得 $\\triangle ABD\\cong\\triangle ACD$。把等腰三角形沿顶角平分线对折，点「播放」看两半重合。',
      example: '等腰三角形的顶角是 $50^\\circ$，两个底角都是 $(180^\\circ-50^\\circ)\\div2=65^\\circ$。',
      demo: { type: 'motion', mode: 'reflect', shape: [[4, 5], [4, 0], [7, 0]], labels: ['A', 'D', 'C'], axis: [[4, 5], [4, 0]], view: [0, 8, -1, 6] },
    },
    {
      title: '三线合一',
      body: '由上面的全等还得到 $BD=CD$，$\\angle ADB=\\angle ADC=90^\\circ$。**定理**：等腰三角形的顶角平分线、底边上的中线、底边上的高互相重合（三线合一）。知道其中一条，就同时得到另外两条。',
      example: '$AB=AC$，$AD$ 是底边上的中线，则 $AD\\perp BC$，$AD$ 平分 $\\angle BAC$。',
      pitfall: '三线合一说的是**底边**上的中线、高和**顶角**的平分线；腰上的中线、高一般不重合。',
    },
    {
      title: '轴对称',
      body: '等腰三角形是轴对称图形，对称轴是顶角平分线（底边上的中线、底边上的高）**所在的直线**。对称轴是直线，顶角平分线是线段，说法要区分。',
      example: '把等腰三角形纸片沿对称轴对折，两腰重合，两个底角重合。',
    },
    {
      title: '大边对大角',
      body: '三角形中，较长的边所对的角较大。证明：$AB>AC$ 时在 $AB$ 上截取 $AD=AC$，由等边对等角和“外角大于不相邻的内角”得 $\\angle ACB>\\angle B$。',
      example: '$\\triangle PQR$ 中 $PQ>PR$，所以 $PQ$ 所对的 $\\angle R$ 大于 $PR$ 所对的 $\\angle Q$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '18.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '等腰三角形的一个内角是 $70^\\circ$，它的另外两个内角是（　　）',
      options: ['$55^\\circ$，$55^\\circ$', '$70^\\circ$，$40^\\circ$', '$55^\\circ$，$55^\\circ$ 或 $70^\\circ$，$40^\\circ$', '不能确定'],
      answer: 2,
      explain: [
        '$70^\\circ$ 可能是顶角，也可能是底角。',
        '是顶角：两个底角都是 $(180^\\circ-70^\\circ)\\div2=55^\\circ$。是底角：另一个底角也是 $70^\\circ$，顶角是 $180^\\circ-140^\\circ=40^\\circ$。',
        '两种都可以，选 C。坑：只想到一种情况。',
      ],
      verify: () => (others181(70).length === 2 ? 2 : -1),
    },
    {
      id: '18.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '等腰三角形的一个内角是 $100^\\circ$，求它的底角。',
      blanks: [
        { kind: 'angle', label: '底角', answer: '40°' },
      ],
      explain: [
        '若 $100^\\circ$ 是底角，两个底角的和就是 $200^\\circ$，超过 $180^\\circ$，不可能。',
        '所以 $100^\\circ$ 是顶角，底角是 $(180^\\circ-100^\\circ)\\div2=40^\\circ$。',
        '坑：照搬 b01 的分类，把 $100^\\circ$ 也当成底角讨论。钝角只能是顶角。',
      ],
      verify: () => { const r = others181(100); return r.length === 1 ? r[0][0] : null; },
    },
    {
      id: '18.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$，$AD\\perp BC$ 于点 $D$，$BC=10$，$\\angle BAC=80^\\circ$。求 $BD$ 的长和 $\\angle BAD$ 的度数。',
      blanks: [
        { kind: 'num', label: '$BD=$', answer: '5' },
        { kind: 'angle', label: '$\\angle BAD=$', answer: '40°' },
      ],
      explain: [
        '$AD$ 是底边上的高，由三线合一，$AD$ 也是底边上的中线和顶角平分线。',
        '$BD=\\frac12BC=5$，$\\angle BAD=\\frac12\\angle BAC=40^\\circ$。',
        '坑：没看出“高”同时是中线、角平分线，以为求不出来。',
      ],
      verify: () => [10 / 2, 80 / 2],
    },
    {
      id: '18.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC$，$\\angle A=40^\\circ$，$CD$ 平分 $\\angle ACB$，交 $AB$ 于点 $D$。求 $\\angle BDC$ 的度数。',
      figure: FIG181.b04,
      blanks: [
        { kind: 'angle', label: '$\\angle BDC=$', answer: '75°' },
      ],
      explain: [
        '$AB=AC$，$\\angle B=\\angle ACB=(180^\\circ-40^\\circ)\\div2=70^\\circ$（等边对等角）。',
        '$CD$ 平分 $\\angle ACB$，$\\angle BCD=35^\\circ$。',
        '在 $\\triangle BCD$ 中，$\\angle BDC=180^\\circ-70^\\circ-35^\\circ=75^\\circ$。也可以用外角：$\\angle BDC=\\angle A+\\angle ACD=40^\\circ+35^\\circ$。坑：把 $\\angle ACB$ 当成 $40^\\circ$。',
      ],
      verify: () => { const b = (180 - 40) / 2; return 180 - b - b / 2; },
    },
    {
      id: '18.1-b05',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$AB=5$，$BC=7$，$AC=6$。三个内角中最大的是（　　）',
      options: ['$\\angle A$', '$\\angle B$', '$\\angle C$', '不能确定'],
      answer: 0,
      explain: [
        '大边对大角：最长的边是 $BC=7$，它所对的角最大。',
        '$BC$ 所对的角是 $\\angle A$（$BC$ 不经过点 $A$），选 A。',
        '坑：把“边 $BC$”和“角 $\\angle B$、$\\angle C$”联系起来，选成 B 或 C。边所对的角是不在这条边上的那个顶点处的角。',
      ],
      verify: () => {
        // 用坐标算出各角：B(0,0)，C(7,0)，A 满足 AB=5、AC=6
        const x = (25 - 36 + 49) / 14, y = Math.sqrt(25 - x * x), A = [x, y], B = [0, 0], C = [7, 0];
        const ang = (p, q, r) => Math.acos(((q[0] - p[0]) * (r[0] - p[0]) + (q[1] - p[1]) * (r[1] - p[1])) / Math.hypot(q[0] - p[0], q[1] - p[1]) / Math.hypot(r[0] - p[0], r[1] - p[1]));
        const a = [ang(A, B, C), ang(B, A, C), ang(C, A, B)];
        return a.indexOf(Math.max(...a));
      },
    },
    {
      id: '18.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC$，$\\angle B=30^\\circ$，点 $D$ 在 $BC$ 上，$AD=BD$。求 $\\angle DAC$ 的度数。',
      figure: FIG181.b06,
      blanks: [
        { kind: 'angle', label: '$\\angle DAC=$', answer: '90°' },
      ],
      explain: [
        '$AB=AC$，$\\angle C=\\angle B=30^\\circ$，$\\angle BAC=180^\\circ-60^\\circ=120^\\circ$。',
        '$AD=BD$，在 $\\triangle ABD$ 中 $\\angle BAD=\\angle B=30^\\circ$（等边对等角）。',
        '$\\angle DAC=120^\\circ-30^\\circ=90^\\circ$。坑：两次等边对等角用在不同的三角形里，$AD=BD$ 对的是 $\\angle B$ 和 $\\angle BAD$。',
      ],
      verify: () => (180 - 2 * 30) - 30,
    },
    {
      id: '18.1-b07',
      level: 'basic',
      type: 'choice',
      stem: '关于等腰三角形 $ABC$（$AB=AC$）的对称轴，下列说法正确的是（　　）',
      options: ['对称轴是顶角平分线', '对称轴是底边上的中线', '对称轴是底边上的高所在的直线', '对称轴是腰上的高所在的直线'],
      answer: 2,
      explain: [
        'A、B：顶角平分线、底边上的中线都是线段，而对称轴是直线，说法不准确。',
        'C：底边上的高所在的直线就是对称轴，正确。',
        'D：腰上的高一般不经过对称轴，错误。选 C。坑：把“线段”和“所在的直线”混为一谈。',
      ],
    },
    {
      id: '18.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$，$D$ 是 $BC$ 的中点，$\\angle B=35^\\circ$。求 $\\angle BAD$ 和 $\\angle ADC$ 的度数。',
      blanks: [
        { kind: 'angle', label: '$\\angle BAD=$', answer: '55°' },
        { kind: 'angle', label: '$\\angle ADC=$', answer: '90°' },
      ],
      explain: [
        '$AD$ 是底边上的中线，由三线合一，$AD\\perp BC$，所以 $\\angle ADC=\\angle ADB=90^\\circ$。',
        '在 $\\text{Rt}\\triangle ABD$ 中，$\\angle BAD=90^\\circ-35^\\circ=55^\\circ$。',
        '坑：以为 $\\angle BAD=\\angle B$；或用 $180^\\circ-2\\times35^\\circ=110^\\circ$ 后忘了除以 $2$。',
      ],
      verify: () => [90 - 35, 90],
    },
    {
      id: '18.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB>AC$，$\\angle ABC$、$\\angle ACB$ 的平分线交于点 $D$。比较 $\\angle DBC$ 与 $\\angle DCB$ 的大小。',
      blanks: [
        { kind: 'text', label: '$\\angle DBC$ ○ $\\angle DCB$', answer: '<', options: ['>', '<', '=', '不能确定'] },
      ],
      explain: [
        '大边对大角：$AB>AC$，$AB$ 所对的角 $\\angle ACB$ 大于 $AC$ 所对的角 $\\angle ABC$。',
        '平分后：$\\angle DBC=\\frac12\\angle ABC$，$\\angle DCB=\\frac12\\angle ACB$，所以 $\\angle DBC<\\angle DCB$。',
        '坑：以为 $AB$ 长，所以 $B$ 处的角大。边 $AB$ 所对的角在点 $C$。',
      ],
      verify: () => {
        // 取几个 AB>AC 的三角形，算出 ∠ABC、∠ACB 的一半作比较
        const ang = (p, q, r) => Math.acos(((q[0] - p[0]) * (r[0] - p[0]) + (q[1] - p[1]) * (r[1] - p[1])) / Math.hypot(q[0] - p[0], q[1] - p[1]) / Math.hypot(r[0] - p[0], r[1] - p[1]));
        const res = [[[1, 4], [-5, 0], [3, 0]], [[2, 3], [-4, 0], [4, 0]], [[-1, 2], [-6, 0], [1, 0]]].map(([A, B, C]) => {
          if (!(Math.hypot(A[0] - B[0], A[1] - B[1]) > Math.hypot(A[0] - C[0], A[1] - C[1]))) return null;
          return ang(B, A, C) / 2 < ang(C, A, B) / 2;
        });
        return res.every(x => x === true) ? '<' : null;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '18.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '等腰三角形一腰上的高与另一腰的夹角为 $26^\\circ$，求它的顶角（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '顶角', answer: ['64', '116'], suffix: '°' },
      ],
      explain: [
        '设 $AB=AC$，$BD$ 是腰 $AC$ 上的高，$BD$ 与 $AB$ 的夹角为 $26^\\circ$。垂足 $D$ 的位置取决于顶角是锐角还是钝角。',
        '① 顶角是锐角：$D$ 在 $AC$ 上，在 $\\text{Rt}\\triangle ABD$ 中，$\\angle A=90^\\circ-26^\\circ=64^\\circ$。',
        '② 顶角是钝角：$D$ 在 $CA$ 的延长线上，在 $\\text{Rt}\\triangle ABD$ 中，$\\angle BAD=64^\\circ$，它是顶角的邻补角，顶角 $=180^\\circ-64^\\circ=116^\\circ$。',
        '（顶角是直角时，腰上的高就是另一腰，夹角为 $0^\\circ$，不符合。）所以顶角是 $64^\\circ$ 或 $116^\\circ$。转弯：无图题要考虑高在三角形内部或外部。',
      ],
      verify: () => {
        const r = [];
        for (let a = 1; a < 180; a++) {
          if (a === 90) continue;
          const theta = a < 90 ? 90 - a : 90 - (180 - a);  // 高与另一腰的夹角
          if (theta === 26) r.push(a);
        }
        return r;
      },
    },
    {
      id: '18.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC$，点 $D$ 在 $AC$ 上，$BD=BC$，$\\angle ABD=21^\\circ$。求 $\\angle A$ 和 $\\angle DBC$ 的度数。',
      figure: FIG181.e02,
      blanks: [
        { kind: 'angle', label: '$\\angle A=$', answer: '46°' },
        { kind: 'angle', label: '$\\angle DBC=$', answer: '46°' },
      ],
      explain: [
        '设 $\\angle A=x$。$AB=AC$：$\\angle ABC=\\angle C=\\frac12(180^\\circ-x)$。',
        '$BD=BC$：$\\angle BDC=\\angle C$，所以在 $\\triangle BDC$ 中 $\\angle DBC=180^\\circ-2\\angle C=x$。也可以这样看：$\\angle BDC$ 是 $\\triangle ABD$ 的外角，$\\angle BDC=x+21^\\circ$。',
        '由 $\\angle ABD=\\angle ABC-\\angle DBC$：$\\frac12(180^\\circ-x)-x=21^\\circ$，$180^\\circ-3x=42^\\circ$，$x=46^\\circ$。',
        '所以 $\\angle A=46^\\circ$，$\\angle DBC=46^\\circ$。转弯：两次等边对等角得到 $\\angle DBC=\\angle A$，再用 $\\angle ABC$ 的拆分列方程。',
      ],
      verify: () => { for (let x = 1; x < 180; x++) { const c = (180 - x) / 2, dbc = 180 - 2 * c; if (Math.abs(c - dbc - 21) < 1e-9) return [x, dbc]; } return null; },
    },
    {
      id: '18.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '一个等腰三角形中，有一个内角是另一个内角的 $2$ 倍。求它的顶角（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '顶角', answer: ['90', '36'], suffix: '°' },
      ],
      explain: [
        '设顶角为 $a$，两个底角都是 $b$，$a+2b=180^\\circ$。“一个是另一个的 $2$ 倍”只能发生在顶角和底角之间（两个底角相等）。',
        '① 顶角是底角的 $2$ 倍：$a=2b$，$4b=180^\\circ$，$b=45^\\circ$，$a=90^\\circ$。',
        '② 底角是顶角的 $2$ 倍：$b=2a$，$5a=180^\\circ$，$a=36^\\circ$。',
        '所以顶角是 $90^\\circ$ 或 $36^\\circ$。转弯：先用“两个底角相等”排除一种配对，再对剩下的两种分别列方程。',
      ],
      verify: () => {
        const r = [];
        for (let a = 1; a < 180; a++) { const b = (180 - a) / 2; if (a === 2 * b || b === 2 * a) r.push(a); }
        return r;
      },
    },
    {
      id: '18.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC=6$，腰上的高为 $5$。点 $P$ 在底边 $BC$ 上运动（不与 $B$、$C$ 重合），$PD\\perp AB$ 于点 $D$，$PE\\perp AC$ 于点 $E$。求 $PD+PE$ 的值。',
      figure: FIG181.e04,
      blanks: [
        { kind: 'num', label: '$PD+PE=$', answer: '5' },
      ],
      explain: [
        '连接 $AP$，把 $\\triangle ABC$ 分成 $\\triangle ABP$ 和 $\\triangle ACP$。',
        '$S_{\\triangle ABP}=\\frac12\\times AB\\times PD=3PD$，$S_{\\triangle ACP}=\\frac12\\times AC\\times PE=3PE$（两腰相等）。',
        '而 $S_{\\triangle ABC}=\\frac12\\times AC\\times5=15$，所以 $3(PD+PE)=15$，$PD+PE=5$，不论 $P$ 在哪里。',
        '顶角是锐角还是钝角（腰 $6$、腰上的高 $5$ 两种都画得出来）都不影响这个计算。转弯：两条垂线段都在变，但两腰相等，面积一拆为二后就合成了“腰 × 腰上的高”，等于一个定值。',
      ],
      verify: () => {
        // 构造一个腰长 6、腰上的高 5 的等腰三角形：顶角 A 满足 6·sinA=5（只用于核对），在 BC 上取几个 P
        const sinA = 5 / 6, cosA = Math.sqrt(1 - sinA * sinA);
        const A = [0, 0], B = [6, 0], C = [6 * cosA, 6 * sinA];
        const dist = (p, q, r) => Math.abs((r[0] - q[0]) * (q[1] - p[1]) - (q[0] - p[0]) * (r[1] - q[1])) / Math.hypot(r[0] - q[0], r[1] - q[1]);
        const vals = [0.2, 0.5, 0.8].map(t => { const P = [B[0] + (C[0] - B[0]) * t, B[1] + (C[1] - B[1]) * t]; return dist(P, A, B) + dist(P, A, C); });
        return vals.every(v => Math.abs(v - 5) < 1e-9) ? 5 : null;
      },
    },
    {
      id: '18.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=8$，$AC=5$，$BC=x$（$x$ 为整数），并且 $\\angle C$ 比另外两个角都大。$x$ 可以取几个不同的值？',
      blanks: [
        { kind: 'num', label: '', answer: '4', suffix: '个' },
      ],
      explain: [
        '$\\angle C$ 所对的边是 $AB=8$。$\\angle C$ 最大，说明 $AB$ 是最长的边：否则若 $BC\\geq AB$，由大边对大角（或等边对等角），$\\angle A\\geq\\angle C$，矛盾。所以 $x<8$。',
        '三边关系：$8-5<x<8+5$，即 $3<x<13$。',
        '合起来 $3<x<8$，整数 $x=4,5,6,7$，共 $4$ 个。',
        '转弯：题目给的是“角最大”，要用大边对大角反过来推出边的大小关系（用反证的说法），再和三边关系合起来。',
      ],
      verify: () => {
        let n = 0;
        for (let x = 1; x < 20; x++) {
          if (!(x + 5 > 8 && x + 8 > 5 && 8 + 5 > x)) continue;
          // 余弦比较：最大边对最大角，∠C 最大即 AB 严格最大
          if (8 > x && 8 > 5) n++;
        }
        return n;
      },
    },
    {
      id: '18.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$，$\\angle BAC=100^\\circ$。点 $D$ 在直线 $BC$ 上（不与 $B$、$C$ 重合），且 $BD=AB$。求 $\\angle DAC$ 的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle DAC=$', answer: ['30', '120'], suffix: '°' },
      ],
      explain: [
        '$AB=AC$，$\\angle B=\\angle C=40^\\circ$。$BD=AB$，在 $\\triangle ABD$ 中 $\\angle BAD=\\angle BDA$（等边对等角）。$D$ 在直线 $BC$ 上，按位置分类。',
        '① $D$ 在 $B$ 的右侧（射线 $BC$ 上）：$\\angle ABD=40^\\circ$，$\\angle BAD=\\angle BDA=(180^\\circ-40^\\circ)\\div2=70^\\circ$。$70^\\circ<100^\\circ$，射线 $AD$ 在 $\\angle BAC$ 内部，$D$ 在线段 $BC$ 上，$\\angle DAC=100^\\circ-70^\\circ=30^\\circ$。',
        '② $D$ 在 $B$ 的左侧（$CB$ 的延长线上）：$\\angle ABD=180^\\circ-40^\\circ=140^\\circ$，$\\angle BAD=\\angle BDA=20^\\circ$，$\\angle DAC=100^\\circ+20^\\circ=120^\\circ$。',
        '（$D$ 不会落到 $C$ 的右侧：在 ① 中已求出射线 $AD$ 在 $\\angle BAC$ 内部。）所以 $\\angle DAC=30^\\circ$ 或 $120^\\circ$。转弯：先找准 $BD=AB$ 所对的是哪两个角，再按 $D$ 在 $B$ 的哪一侧分类。',
      ],
      verify: () => {
        // A 为原点，AB、AC 长 1，夹角 100°；在直线 BC 上搜索 D 使 BD=AB=1
        const rad = (100 * Math.PI) / 180, B = [1, 0], C = [Math.cos(rad), Math.sin(rad)];
        const len = Math.hypot(C[0] - B[0], C[1] - B[1]), u = [(C[0] - B[0]) / len, (C[1] - B[1]) / len];
        const r = [];
        for (const sgn of [1, -1]) {
          const D = [B[0] + sgn * u[0], B[1] + sgn * u[1]];
          const ang = Math.acos((D[0] * C[0] + D[1] * C[1]) / Math.hypot(D[0], D[1])) * 180 / Math.PI;
          r.push(Math.round(ang));
        }
        return r.sort((p, q) => p - q);
      },
    },

    // ---------- 挑战 ----------
    {
      id: '18.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$。(1) 如图，点 $D$ 在 $BC$ 上，点 $E$ 在 $AC$ 上，$AD=AE$，$\\angle BAD=40^\\circ$，求 $\\angle EDC$；(2) 若只知道点 $D$ 在直线 $BC$ 上、点 $E$ 在直线 $AC$ 上（都不与 $A$、$B$、$C$ 重合），$AD=AE$，$\\angle BAD=40^\\circ$，求直线 $DE$ 与直线 $BC$ 所成的锐角的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG181.c01,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle EDC=$', answer: '20°' },
        { kind: 'nums', label: '(2)', answer: ['20', '70'], suffix: '°' },
      ],
      explain: [
        '(1) 设 $\\angle B=\\angle C=\\beta$（等边对等角），$\\angle EDC=x$。$\\angle AED$ 是 $\\triangle EDC$ 的外角：$\\angle AED=\\beta+x$；$AD=AE$，$\\angle ADE=\\angle AED=\\beta+x$。$\\angle ADC$ 是 $\\triangle ABD$ 的外角：$\\angle ADC=\\beta+40^\\circ$。又 $\\angle ADC=\\angle ADE+x=\\beta+2x$，所以 $x=20^\\circ$。$\\beta$ 自动抵消，说明结论与底角无关。',
        '(2) 先看 $D$ 可能在哪。射线 $AD$ 在 $\\angle BAC$ 内部时，$D$ 在线段 $BC$ 上（顶角大于 $40^\\circ$）或在 $C$ 外侧的延长线上（顶角小于 $40^\\circ$）；射线 $AD$ 在 $\\angle BAC$ 外部时，$D$ 在 $B$ 外侧的延长线上（$\\triangle ABD$ 中 $\\angle ABD=180^\\circ-\\beta$，要求 $\\beta>40^\\circ$）。三种位置都画得出来，$E$ 又可以在 $A$ 的两侧，共 $6$ 种组合，按 $E$ 的位置分两大类。',
        '第一类，$E$ 在射线 $AC$ 上：三种 $D$ 都用 (1) 的方法，把 $\\angle ADE=\\angle AED$ 和外角都用 $\\beta$ 表示，$\\beta$ 都抵消。例如 $D$ 在 $C$ 外侧：$\\angle ADB=180^\\circ-40^\\circ-\\beta=140^\\circ-\\beta$，$\\angle DAE=\\angle DAC=40^\\circ-(180^\\circ-2\\beta)=2\\beta-140^\\circ$，$\\angle ADE=\\frac12(180^\\circ-\\angle DAE)=160^\\circ-\\beta$，两者相差 $20^\\circ$。所以这一类的锐角都是 $\\frac12\\angle BAD=20^\\circ$。',
        '第二类，$E$ 在 $CA$ 的延长线上（$A$ 的另一侧）：$E\'$ 与上一种情况的点 $E$ 关于 $A$ 对称（$AE\'=AD$），$\\triangle EDE\'$ 中 $A$ 到三个顶点的距离相等，$\\angle EDE\'=\\angle ADE+\\angle ADE\'=\\frac12(180^\\circ-\\angle DAE)+\\frac12(180^\\circ-\\angle DAE\')=90^\\circ$（两个底角之和，$\\angle DAE+\\angle DAE\'=180^\\circ$）。所以 $DE\'\\perp DE$，它与 $BC$ 所成的锐角是 $90^\\circ-20^\\circ=70^\\circ$。',
        '所以所成的锐角是 $20^\\circ$ 或 $70^\\circ$。',
        '思路：先在一个位置上用“设底角 + 两次外角”得到 $\\frac12$ 的关系；再发现 $E$ 换到 $A$ 的另一侧时，新旧两条 $DE$ 互相垂直（两次等边对等角），答案变成余角。',
      ],
      verify: () => {
        const r = new Set();
        const lineAng = (p, q, u, v) => { let a = Math.abs(Math.atan2(q[1] - p[1], q[0] - p[0]) - Math.atan2(v[1] - u[1], v[0] - u[0])) * 180 / Math.PI % 180; return a > 90 ? 180 - a : a; };
        for (const apex of [50, 70, 100]) {
          const h = ((apex / 2) * Math.PI) / 180, B = [-Math.sin(h), -Math.cos(h)], C = [Math.sin(h), -Math.cos(h)];
          const dirB = Math.atan2(B[1], B[0]);
          for (const turn of [1, -1]) {           // 从 AB 向 AC 一侧转或向外侧转 40°
            const dir = dirB + (turn * 40 * Math.PI) / 180;
            if (Math.sin(dir) >= 0) continue;     // 射线要能交到直线 BC（在 A 下方）
            const t = B[1] / Math.sin(dir), D = [Math.cos(dir) * t, B[1]];
            if (Math.hypot(D[0] - B[0], D[1] - B[1]) < 1e-9 || Math.hypot(D[0] - C[0], D[1] - C[1]) < 1e-9) continue;
            const ad = Math.hypot(D[0], D[1]);
            for (const sg of [1, -1]) {
              const E = [C[0] * ad * sg, C[1] * ad * sg];
              r.add(Math.round(lineAng(D, E, B, C) * 1000) / 1000);
            }
          }
        }
        const one = (() => { const h = (32 * Math.PI) / 180, B = [-Math.sin(h), -Math.cos(h)], C = [Math.sin(h), -Math.cos(h)], dir = Math.atan2(B[1], B[0]) + (40 * Math.PI) / 180, t = B[1] / Math.sin(dir), D = [Math.cos(dir) * t, B[1]], ad = Math.hypot(...D), E = [C[0] * ad, C[1] * ad]; return lineAng(D, E, B, C); })();
        return [Math.round(one), [...r].sort((p, q) => p - q)];
      },
    },
    {
      id: '18.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB>AC$，$AD$ 是 $BC$ 边上的中线。(1) 比较 $\\angle BAD$ 与 $\\angle CAD$ 的大小；(2) 比较 $AD$ 与 $\\frac12(AB+AC)$ 的大小；(3) 若 $AB=7$，$AC=3$，$AD$ 的长是整数，求 $AD$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'text', label: '(1) $\\angle BAD$ ○ $\\angle CAD$', answer: '<', options: ['>', '<', '=', '不能确定'] },
        { kind: 'text', label: '(2) $AD$ ○ $\\frac12(AB+AC)$', answer: '<', options: ['>', '<', '=', '不能确定'] },
        { kind: 'nums', label: '(3) $AD=$', answer: ['3', '4'] },
      ],
      explain: [
        '思路：$\\angle BAD$、$\\angle CAD$ 分在两个三角形里，没法直接比；延长 $AD$ 到 $E$，使 $DE=AD$，连接 $CE$（倍长中线），把它们放进同一个三角形。',
        '在 $\\triangle ABD$ 和 $\\triangle ECD$ 中，$BD=CD$，$\\angle ADB=\\angle EDC$（对顶角），$AD=ED$，所以 $\\triangle ABD\\cong\\triangle ECD$（SAS），$CE=AB$，$\\angle E=\\angle BAD$。',
        '(1) 在 $\\triangle ACE$ 中，$CE=AB>AC$，由大边对大角，$CE$ 所对的角 $\\angle CAE$ 大于 $AC$ 所对的角 $\\angle E$，即 $\\angle CAD>\\angle BAD$。',
        '(2) 在 $\\triangle ACE$ 中，$AE<AC+CE=AC+AB$，而 $AE=2AD$，所以 $AD<\\frac12(AB+AC)$。',
        '(3) 在 $\\triangle ACE$ 中，$CE=AB=7$，$AC=3$，$AE=2AD$：$7-3<2AD<7+3$，$2<AD<5$，整数 $AD=3$ 或 $4$。',
        '思路：一次倍长中线，同时得到“边”和“角”的转移；比角用大边对大角，比边、求范围用三边关系。',
      ],
      verify: () => {
        const ang = (p, q, r) => Math.acos(((q[0] - p[0]) * (r[0] - p[0]) + (q[1] - p[1]) * (r[1] - p[1])) / Math.hypot(q[0] - p[0], q[1] - p[1]) / Math.hypot(r[0] - p[0], r[1] - p[1]));
        const res = [];
        for (const [A, B, C] of [[[1, 5], [-6, 0], [3, 0]], [[0, 4], [-5, 0], [2, 1]], [[2, 3], [-4, -1], [4, 0]]]) {
          const ab = Math.hypot(A[0] - B[0], A[1] - B[1]), ac = Math.hypot(A[0] - C[0], A[1] - C[1]);
          if (!(ab > ac)) return null;
          const D = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], ad = Math.hypot(A[0] - D[0], A[1] - D[1]);
          res.push([ang(A, B, D) < ang(A, C, D), ad < (ab + ac) / 2]);
        }
        const ints = [];
        for (let ad = 1; ad < 10; ad++) if (7 - 3 < 2 * ad && 2 * ad < 7 + 3) ints.push(ad);
        return res.every(r => r[0] && r[1]) ? ['<', '<', ints] : null;
      },
    },
    {
      id: '18.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $\\angle AOB=\\alpha$（锐角）。在射线 $OA$ 上取点 $P_1$，在射线 $OB$ 上取点 $P_2$，使 $OP_1=P_1P_2$；再在 $OA$ 上取点 $P_3$，使 $P_2P_3=P_1P_2$；再在 $OB$ 上取点 $P_4$，使 $P_3P_4=P_2P_3$……如此交替在两条射线上取点（每个新点都比上一个同侧的点离 $O$ 更远）。(1) 若 $\\alpha=15^\\circ$，这样最多能作出几条与 $OP_1$ 相等的线段 $P_1P_2$、$P_2P_3$、……？(2) 若恰好能作出 $4$ 条这样的线段（第 $5$ 条作不出来），求 $\\alpha$ 的取值范围；(3) 若作出的第 $3$ 个等腰三角形（腰为 $P_3P_4$ 的那个，即 $\\triangle P_2P_3P_4$）的顶角是 $72^\\circ$，求 $\\alpha$。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '5', suffix: '条' },
        { kind: 'ineq', var: 'a', label: '(2) $\\alpha$（度）满足', answer: '18<=a<22.5' },
        { kind: 'angle', label: '(3) $\\alpha=$', answer: '18°' },
      ],
      explain: [
        '先找规律。$OP_1=P_1P_2$：$\\angle P_1P_2O=\\angle O=\\alpha$，外角 $\\angle P_2P_1A=2\\alpha$。$P_1P_2=P_2P_3$：$\\angle P_2P_3P_1=\\angle P_2P_1P_3=2\\alpha$，于是 $\\angle P_3P_2B=\\alpha+2\\alpha=3\\alpha$（$\\triangle OP_2P_3$ 的外角）。',
        '依此类推，作第 $k$ 条线段 $P_kP_{k+1}$ 时，它所在的等腰三角形的底角是 $k\\alpha$（第 $1$ 条的底角为 $\\alpha$，第 $2$ 条为 $2\\alpha$……）。等腰三角形的底角必须是锐角：能作出第 $k$ 条，当且仅当 $k\\alpha<90^\\circ$。',
        '(1) $\\alpha=15^\\circ$：$k\\cdot15^\\circ<90^\\circ$，$k<6$，最多作 $5$ 条（第 $6$ 条的底角是 $90^\\circ$，作不出）。',
        '(2) 能作第 $4$ 条：$4\\alpha<90^\\circ$，$\\alpha<22.5^\\circ$；作不出第 $5$ 条：$5\\alpha\\geq90^\\circ$，$\\alpha\\geq18^\\circ$。所以 $18^\\circ\\leq\\alpha<22.5^\\circ$。',
        '(3) 第 $k$ 个等腰三角形的底角是 $k\\alpha$，顶角是 $180^\\circ-2k\\alpha$。第 $3$ 个：$180^\\circ-6\\alpha=72^\\circ$，$\\alpha=18^\\circ$，此时 $3\\alpha=54^\\circ<90^\\circ$，能作出，符合。',
        '思路：反复用“等边对等角 + 外角”，发现底角依次是 $\\alpha,2\\alpha,3\\alpha,\\dots$；再用“等腰三角形的底角是锐角”这个限制把规律变成不等式，(3) 把规律反过来用。',
      ],
      verify: () => {
        const count = a => { let k = 0; while ((k + 1) * a < 90) k++; return k; };
        const ok = [];
        for (let i = 1; i <= 400; i++) { const a = i / 10; if (count(a) === 4) ok.push(a); }
        let a3 = null;
        for (let i = 1; i < 900; i++) { const a = i / 10; if (Math.abs(180 - 6 * a - 72) < 1e-9 && 3 * a < 90) a3 = a; }
        return [count(15), ok[0] === 18 && ok[ok.length - 1] === 22.4 ? '18<=a<22.5' : null, a3];
      },
    },
    {
      id: '18.1-c04',
      level: 'challenge',
      type: 'multi',
      stem: '在 $\\triangle ABC$ 中，$AB=AC$，$\\angle A\\neq90^\\circ$（可能是锐角，也可能是钝角）。$BD\\perp$ 直线 $AC$ 于点 $D$，$CE\\perp$ 直线 $AB$ 于点 $E$，直线 $BD$ 与 $CE$ 相交于点 $O$。下列结论中，不论 $\\angle A$ 是锐角还是钝角都成立的有（　　）',
      options: ['$BD=CE$', '$DE\\parallel BC$', '$OB=OC$', '直线 $AO$ 垂直于 $BC$', '$BD\\perp CE$', '点 $O$ 在 $\\triangle ABC$ 的内部'],
      answer: [0, 1, 2, 3],
      explain: [
        '$\\angle A$ 为锐角时 $D$、$E$ 在两腰上，$O$ 在形内；为钝角时 $D$、$E$ 在两腰的延长线上，$O$ 在形外。两种都要检验。',
        'A：$\\triangle ABD$ 与 $\\triangle ACE$ 中，$\\angle ADB=\\angle AEC=90^\\circ$，$\\angle BAD=\\angle CAE$（锐角时是同一个角，钝角时是对顶角），$AB=AC$，AAS 得全等，$BD=CE$，$AD=AE$。',
        'B：$AD=AE$，$\\angle ADE=\\angle AED=\\frac12(180^\\circ-\\angle DAE)$，而 $\\angle DAE=\\angle BAC$，所以 $\\angle AED=\\angle ABC$（锐角时是同位角，钝角时是内错角），$DE\\parallel BC$。',
        'C：$BE=CD$（锐角时 $AB-AE=AC-AD$，钝角时 $AB+AE=AC+AD$）。$\\triangle BEO$ 与 $\\triangle CDO$ 中，两个直角，$\\angle BOE=\\angle COD$（对顶角或公共角），$BE=CD$，AAS 得全等，$OB=OC$。注意不能由“$\\angle OBC=\\angle OCB$”直接得出，那要用 18.2 的等角对等边。',
        'D：$\\triangle ABO$ 与 $\\triangle ACO$ 中，$AB=AC$，$OB=OC$，$AO=AO$，SSS 得全等，$\\angle BAO=\\angle CAO$（钝角时是两个外角相等，$AO$ 的反向延长线平分 $\\angle BAC$），所以直线 $AO$ 是顶角平分线所在的直线，由三线合一，$AO\\perp BC$。',
        'E：$\\angle BOC$ 与 $\\angle A$ 互补或相等，只有 $\\angle A=90^\\circ$ 时才垂直，不成立。F：钝角时 $O$ 在形外，不成立。选 A、B、C、D。',
      ],
      verify: () => {
        const res = [true, true, true, true, true, true];
        const meet = (p1, p2, q1, q2) => { const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]], det = d1[0] * -d2[1] + d2[0] * d1[1], s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det; return [p1[0] + s * d1[0], p1[1] + s * d1[1]]; };
        const foot = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy); return [a[0] + t * dx, a[1] + t * dy]; };
        const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        for (const apex of [40, 70, 110, 140]) {
          const h = ((apex / 2) * Math.PI) / 180, A = [0, 0], B = [-Math.sin(h), -Math.cos(h)], C = [Math.sin(h), -Math.cos(h)];
          const D = foot(B, A, C), E = foot(C, A, B), O = meet(B, D, C, E);
          if (Math.abs(d(B, D) - d(C, E)) > 1e-9) res[0] = false;
          if (Math.abs((D[1] - E[1]) * (C[0] - B[0]) - (D[0] - E[0]) * (C[1] - B[1])) > 1e-9) res[1] = false;
          if (Math.abs(d(O, B) - d(O, C)) > 1e-9) res[2] = false;
          if (Math.abs(O[0] * (C[0] - B[0]) + O[1] * (C[1] - B[1])) > 1e-9) res[3] = false;
          if (Math.abs((D[0] - B[0]) * (E[0] - C[0]) + (D[1] - B[1]) * (E[1] - C[1])) > 1e-9) res[4] = false;
          if (!(O[1] < 0 && O[1] > B[1])) res[5] = false;
        }
        return res.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '18.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '一个等腰三角形的周长为 $30$，一腰上的中线把它的周长分成两部分，这两部分的差为 $3$。(1) 求底边的长（全部填出，用逗号隔开）；(2) 在这些三角形中，底角比顶角大的那个三角形的底边长是多少？',
      blanks: [
        { kind: 'nums', label: '(1) 底边', answer: ['8', '12'] },
        { kind: 'num', label: '(2) 底边', answer: '8' },
      ],
      explain: [
        '设腰长为 $x$，底边为 $y$，$2x+y=30$。腰 $AC$ 上的中线 $BD$ 把周长分成 $AB+AD=x+\\frac x2$ 和 $DC+BC=\\frac x2+y$，差为 $|x-y|=3$。',
        '① $x-y=3$：$3x-3=30$，$x=11$，$y=8$，三边 $11,11,8$ 能组成三角形。② $y-x=3$：$3x+3=30$，$x=9$，$y=12$，三边 $9,9,12$：$9+9>12$，能组成三角形。',
        '(1) 底边长为 $8$ 或 $12$。',
        '(2) 底角所对的边是腰，顶角所对的边是底边。由大边对大角：腰 $11>$ 底 $8$ 时，底角 $>$ 顶角；腰 $9<$ 底 $12$ 时，顶角 $>$ 底角。所以是底边为 $8$ 的那个。',
        '思路：两部分的差把“哪部分大”这一层分类变成了绝对值；(2) 再把角的大小翻译成对边的大小（大边对大角），两层判断叠加。',
      ],
      verify: () => {
        const bases = [];
        for (let k = 1; k <= 240; k++) {
          const x = k / 8, y = 30 - 2 * x;
          if (y <= 0 || 2 * x <= y) continue;
          if (Math.abs(Math.abs(x - y) - 3) < 1e-9) bases.push([x, y]);
        }
        const big = bases.filter(([x, y]) => { const apex = 2 * Math.asin(y / 2 / x); return (Math.PI - apex) / 2 > apex; });
        return [bases.map(b => b[1]), big.length === 1 ? big[0][1] : null];
      },
    },
  ],
});
