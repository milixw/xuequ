'use strict';

// 上海数学七年级下册 · 17.2 三角形的内角和
// 知识范围：三角形内角和定理（180°，用平行线添辅助线证明，辅助线画虚线）；三角形的外角；推论“外角等于与它不相邻的两个内角的和”；
//   外角大于任何一个与它不相邻的内角；外角和等于 360°
// 可以使用：17.1（三边关系、分类、高、中线、角平分线）；第 16 章（对顶角、垂直、平行线的判定与性质）；第 15 章不等式；六年级、七年级上册全部
// 还没学：全等三角形（17.3、17.4）；等腰三角形的性质“等边对等角”、等边三角形每个角 60°（18 章，本节等腰三角形的底角相等不能直接用）；多边形内角和公式
// 本节约定：角的度数用“°”，填空只填数

const SVG172 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  poly: (pts, fill = 'none') => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"/>`,
  foot: (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
    return [a[0] + t * dx, a[1] + t * dy];
  },
  // 点 p 处，在 ∠qpr 内、与 pq 成 t 倍该角的射线，与从 s 出发的同类射线的交点
  dir: (p, q, r, t) => {
    const a = Math.atan2(q[1] - p[1], q[0] - p[0]);
    let d = Math.atan2(r[1] - p[1], r[0] - p[0]) - a;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    return a + d * t;
  },
  meet: (p, a1, q, a2) => {
    const c1 = Math.cos(a1), s1 = Math.sin(a1), c2 = Math.cos(a2), s2 = Math.sin(a2);
    const det = c1 * -s2 + c2 * s1, dx = q[0] - p[0], dy = q[1] - p[1];
    const s = (dx * -s2 + c2 * dy) / det;
    return [p[0] + s * c1, p[1] + s * s1];
  },
};

// verify 用：屏幕坐标下 ∠qpr 的度数
const ang172 = (p, q, r) => {
  let d = (Math.abs(Math.atan2(q[1] - p[1], q[0] - p[0]) - Math.atan2(r[1] - p[1], r[0] - p[0])) * 180) / Math.PI;
  return d > 180 ? 360 - d : d;
};

const FIG172 = (() => {
  const S = SVG172, out = {};
  // b04：Rt△ABC，∠ACB=90°，CD⊥AB
  {
    const C = [70, 40], A = [20, 160], B = [280, 160], D = S.foot(C, A, B);
    out.b04 = S.wrap(300, 185, S.poly([A, B, C]) + S.seg(C, D) + S.text('A', A, -10, 4) + S.text('B', B, 10, 4) + S.text('C', C, 0, -14) + S.text('D', D, 0, 14));
  }
  // b07：△ABC 剪去 ∠A 所在的一角（沿 DE），∠1=∠BDE，∠2=∠CED
  {
    const A = [150, 25], B = [30, 170], C = [270, 170];
    const D = [A[0] + (B[0] - A[0]) * 0.4, A[1] + (B[1] - A[1]) * 0.4], E = [A[0] + (C[0] - A[0]) * 0.45, A[1] + (C[1] - A[1]) * 0.45];
    out.b07 = S.wrap(300, 195, `<polygon points="${[A, D, E].map(p => p.join(',')).join(' ')}" fill="#eee" stroke="#999" stroke-dasharray="4 3"/>`
      + S.seg(D, B) + S.seg(B, C) + S.seg(C, E) + S.seg(D, E)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 4) + S.text('C', C, 10, 4) + S.text('D', D, -12, 0) + S.text('E', E, 12, 0)
      + S.text('1', D, 10, 14, 13) + S.text('2', E, -12, 14, 13));
  }
  // b08：AD⊥BC，AE 平分 ∠BAC
  {
    const B = [20, 175], C = [240, 175], A = [188.6, 34];
    const D = S.foot(A, B, C), E = S.meet(A, S.dir(A, B, C, 0.5), B, 0);
    out.b08 = S.wrap(300, 200, S.poly([A, B, C]) + S.seg(A, D) + S.seg(A, E)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 4) + S.text('C', C, 10, 4) + S.text('D', D, 4, 14) + S.text('E', E, -4, 14));
  }
  // e02：BE 平分 ∠ABC，CE 平分外角 ∠ACD
  {
    const B = [20, 160], C = [170, 160], A = [110, 50], Dp = [290, 160];
    const E = S.meet(B, S.dir(B, A, C, 0.5), C, S.dir(C, A, Dp, 0.5));
    out.e02 = S.wrap(300, 185, S.poly([A, B, C]) + S.seg(C, Dp) + S.seg(B, E) + S.seg(C, E)
      + S.text('A', A, -4, -14) + S.text('B', B, -10, 4) + S.text('C', C, 0, 14) + S.text('D', Dp, 4, 14) + S.text('E', E, 10, -6));
  }
  // e04：五角星 ABCDE（各顶点按星形连线）
  {
    const o = [150, 105], R = 90;
    const P = k => [o[0] + R * Math.sin((k * 72 * Math.PI) / 180), o[1] - R * Math.cos((k * 72 * Math.PI) / 180)];
    const V = [P(0), P(1), P(2), P(3), P(4)];
    const order = [0, 2, 4, 1, 3, 0];
    let s = '';
    for (let i = 0; i < 5; i++) s += S.seg(V[order[i]], V[order[i + 1]]);
    const names = ['A', 'B', 'C', 'D', 'E'];
    out.e04 = S.wrap(300, 205, s + V.map((p, i) => S.text(names[i], p, (p[0] - o[0]) * 0.14, (p[1] - o[1]) * 0.14)).join(''));
  }
  // e05：∠MON=70°，A 在 OM 上，B 在 ON 上，外角 ∠BAM、∠ABN 的平分线交于 P
  {
    const O = [40, 180], rad = (70 * Math.PI) / 180;
    const M = [O[0] + 175 * Math.cos(rad), O[1] - 175 * Math.sin(rad)], N = [290, 180];
    const A = [O[0] + 95 * Math.cos(rad), O[1] - 95 * Math.sin(rad)], B = [150, 180];
    const P = S.meet(A, S.dir(A, B, M, 0.5), B, S.dir(B, A, N, 0.5));
    out.e05 = S.wrap(300, 205, S.seg(O, M) + S.seg(O, N) + S.seg(A, B) + S.seg(A, P, true) + S.seg(B, P, true)
      + S.text('O', O, -10, 6) + S.text('M', M, -10, 0) + S.text('N', N, 4, 14) + S.text('A', A, -12, 0) + S.text('B', B, -4, 14) + S.text('P', P, 10, 0));
  }
  // c04：线段 AD、BC 相交；AP、CP 分别平分 ∠BAD、∠BCD
  {
    const k = 22, o = [30, 20];
    const T = ([x, y]) => [o[0] + x * k, o[1] + y * k];
    const A = T([0, 0]), B = T([10, 1]), C = T([1, 8]), D = T([11, 7]);
    const P = S.meet(A, S.dir(A, B, D, 0.5), C, S.dir(C, B, D, 0.5));
    out.c04 = S.wrap(300, 210, S.seg(A, B) + S.seg(A, D) + S.seg(C, B) + S.seg(C, D) + S.seg(A, P, true) + S.seg(C, P, true)
      + S.text('A', A, -10, -6) + S.text('B', B, 10, -6) + S.text('C', C, -10, 8) + S.text('D', D, 10, 8) + S.text('P', P, -12, 0));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s2/17.2',
  title: '三角形的内角和',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“内角和”配 angleSum 动画（∠A 绕 AC 中点转 180°、∠B 沿 BC 平移，拼成平角）。第 1 轮 c01 与 c03 同为“角的倍数 + 大小顺序 → 不等式计数”，“一内一外平分线夹角为顶角一半”在 e02、e05、c02 重复，c02 只是三个公式叠加，e01 只有 2 级，c04 配图角的大小与数据相反；第 2 轮 e01 改外角 120° 分类，e05 改两条外角平分线，c02 改“三角中一个是另一个的 3 倍”的六种配对，c03 改倍角三角形计数，c04 数据对调后判定整节通过' },

  intro: [
    {
      title: '三角形的内角和',
      body: '**定理**：三角形的内角和等于 $180^\\circ$。证明时过顶点 $C$ 作 $AB$ 的平行线、延长 $BC$，用内错角和同位角把 $\\angle A$、$\\angle B$ 搬到点 $C$，和 $\\angle ACB$ 拼成平角。为证明而添的线叫**辅助线**，画成虚线。点「播放」看一看。',
      example: '$\\angle B=35^\\circ$，$\\angle C=55^\\circ$，则 $\\angle A=180^\\circ-35^\\circ-55^\\circ=90^\\circ$，是直角三角形。',
      demo: { type: 'angleSum' },
    },
    {
      title: '直角三角形的两个锐角',
      body: '直角占去 $90^\\circ$，另两个角的和是 $90^\\circ$，所以**直角三角形的两个锐角互余**。一个三角形最多有一个直角或一个钝角，至少有两个锐角。',
      example: '直角三角形的一个锐角是 $27^\\circ$，另一个锐角是 $63^\\circ$。',
    },
    {
      title: '外角',
      body: '三角形一个内角的一边与另一边的**反向延长线**组成的角，叫三角形的外角。外角与相邻的内角互补。**推论**：三角形的外角等于与它不相邻的两个内角的和，所以外角大于任何一个与它**不相邻**的内角。',
      example: '$\\angle A=75^\\circ$，$\\angle B=40^\\circ$，延长 $BC$ 得外角 $\\angle ACD=75^\\circ+40^\\circ=115^\\circ$。',
    },
    {
      title: '外角和',
      body: '每个顶点取一个外角，三个外角的和叫三角形的外角和。三个“内角 + 外角”是 $3\\times180^\\circ$，减去内角和 $180^\\circ$，**外角和等于 $360^\\circ$**。',
      example: '一个三角形的两个外角是 $100^\\circ$ 和 $150^\\circ$，第三个外角是 $360^\\circ-100^\\circ-150^\\circ=110^\\circ$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '17.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$\\angle A:\\angle B:\\angle C=2:3:4$，则 $\\triangle ABC$ 是（　　）',
      options: ['锐角三角形', '直角三角形', '钝角三角形', '无法确定'],
      answer: 0,
      explain: [
        '设三个角为 $2x$、$3x$、$4x$，$9x=180^\\circ$，$x=20^\\circ$，三个角为 $40^\\circ$、$60^\\circ$、$80^\\circ$。',
        '最大的角 $80^\\circ$ 是锐角，所以三个角都是锐角，是锐角三角形。选 A。',
        '坑：看到比里有 $4$ 份，以为最大角接近直角就选 B；要算出来再判断。',
      ],
      verify: () => (180 / 9) * 4 < 90 ? 0 : (180 / 9) * 4 === 90 ? 1 : 2,
    },
    {
      id: '17.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，延长 $BC$ 到 $D$，$\\angle ACD=110^\\circ$，$\\angle A=45^\\circ$。求 $\\angle B$ 和 $\\angle ACB$ 的度数。',
      blanks: [
        { kind: 'angle', label: '$\\angle B=$', answer: '65°' },
        { kind: 'angle', label: '$\\angle ACB=$', answer: '70°' },
      ],
      explain: [
        '$\\angle ACD$ 是外角，等于不相邻的两个内角之和：$\\angle ACD=\\angle A+\\angle B$，$\\angle B=110^\\circ-45^\\circ=65^\\circ$。',
        '$\\angle ACB$ 与外角 $\\angle ACD$ 互补：$\\angle ACB=180^\\circ-110^\\circ=70^\\circ$。',
        '检验：$45^\\circ+65^\\circ+70^\\circ=180^\\circ$。坑：把外角当成等于“相邻”的内角与另一个角的和。',
      ],
      verify: () => [110 - 45, 180 - 110],
    },
    {
      id: '17.2-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的是（　　）',
      options: ['三角形的外角大于它的任何一个内角', '一个三角形中最多有两个锐角', '三角形的一个外角等于它的两个内角的和', '一个三角形中至少有两个锐角'],
      answer: 3,
      explain: [
        'A：外角只大于与它**不相邻**的内角；与它相邻的内角是钝角时，外角反而更小。错误。',
        'B：锐角三角形有三个锐角。错误。C：外角等于与它不相邻的两个内角的和，少了“不相邻”。错误。',
        'D：若只有一个锐角，另两个角都不小于 $90^\\circ$，和已经不小于 $180^\\circ$，矛盾。所以至少有两个锐角，正确。选 D。',
      ],
    },
    {
      id: '17.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$CD\\perp AB$ 于 $D$，$\\angle A=35^\\circ$。求 $\\angle BCD$ 的度数。',
      figure: FIG172.b04,
      blanks: [
        { kind: 'angle', label: '$\\angle BCD=$', answer: '35°' },
      ],
      explain: [
        '在 $\\text{Rt}\\triangle ABC$ 中，$\\angle B=90^\\circ-\\angle A=55^\\circ$（直角三角形两锐角互余）。',
        '在 $\\text{Rt}\\triangle BCD$ 中，$\\angle BCD=90^\\circ-\\angle B=35^\\circ$。',
        '也就是 $\\angle BCD=\\angle A$（同角 $\\angle B$ 的余角相等）。坑：答成 $55^\\circ$，那是 $\\angle ACD$。',
      ],
      verify: () => 90 - (90 - 35),
    },
    {
      id: '17.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle ABC$、$\\angle ACB$ 的平分线相交于点 $O$，$\\angle BOC=130^\\circ$。求 $\\angle A$ 的度数。',
      blanks: [
        { kind: 'angle', label: '$\\angle A=$', answer: '80°' },
      ],
      explain: [
        '在 $\\triangle OBC$ 中，$\\angle OBC+\\angle OCB=180^\\circ-130^\\circ=50^\\circ$。',
        '$OB$、$OC$ 是角平分线，所以 $\\angle ABC+\\angle ACB=2\\times50^\\circ=100^\\circ$。',
        '$\\angle A=180^\\circ-100^\\circ=80^\\circ$。坑：直接用 $180^\\circ-130^\\circ=50^\\circ$ 当作 $\\angle A$。',
      ],
      verify: () => 180 - 2 * (180 - 130),
    },
    {
      id: '17.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '一个三角形的三个外角（每个顶点取一个）的度数之比为 $2:3:4$。求这个三角形最大内角的度数。',
      blanks: [
        { kind: 'angle', label: '', answer: '100°' },
      ],
      explain: [
        '外角和是 $360^\\circ$：设三个外角为 $2x$、$3x$、$4x$，$9x=360^\\circ$，$x=40^\\circ$，外角为 $80^\\circ$、$120^\\circ$、$160^\\circ$。',
        '对应的内角是 $100^\\circ$、$60^\\circ$、$20^\\circ$，最大内角是 $100^\\circ$。',
        '坑：最大的内角对应**最小**的外角；按内角和 $180^\\circ$ 去分配比例也是错的。',
      ],
      verify: () => 180 - (360 / 9) * 2,
    },
    {
      id: '17.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，把 $\\triangle ABC$ 沿 $DE$ 剪去 $\\angle A$ 所在的一角，得到四边形 $BCED$，$\\angle A=60^\\circ$。求 $\\angle1+\\angle2$（$\\angle1=\\angle BDE$，$\\angle2=\\angle CED$）。',
      figure: FIG172.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle1+\\angle2=$', answer: '240°' },
      ],
      explain: [
        '在剪下的 $\\triangle ADE$ 中，$\\angle ADE+\\angle AED=180^\\circ-60^\\circ=120^\\circ$。',
        '$\\angle1=180^\\circ-\\angle ADE$，$\\angle2=180^\\circ-\\angle AED$（邻补角）。',
        '$\\angle1+\\angle2=360^\\circ-120^\\circ=240^\\circ$。也可以看成 $\\angle1$、$\\angle2$ 是 $\\triangle ADE$ 的两个外角，各等于不相邻两内角之和。坑：以为剪掉一个角后角度和变成 $120^\\circ$。',
      ],
      verify: () => 360 - (180 - 60),
    },
    {
      id: '17.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=40^\\circ$，$\\angle C=70^\\circ$，$AD\\perp BC$ 于 $D$，$AE$ 平分 $\\angle BAC$ 交 $BC$ 于 $E$。求 $\\angle DAE$ 的度数。',
      figure: FIG172.b08,
      blanks: [
        { kind: 'angle', label: '$\\angle DAE=$', answer: '15°' },
      ],
      explain: [
        '$\\angle BAC=180^\\circ-40^\\circ-70^\\circ=70^\\circ$，$AE$ 平分它，$\\angle BAE=35^\\circ$。',
        '在 $\\text{Rt}\\triangle ABD$ 中，$\\angle BAD=90^\\circ-40^\\circ=50^\\circ$。',
        '$\\angle DAE=\\angle BAD-\\angle BAE=50^\\circ-35^\\circ=15^\\circ$。坑：看错 $D$、$E$ 的先后顺序，用 $35^\\circ-20^\\circ$ 或别的组合。',
      ],
      verify: () => {
        const bac = 180 - 40 - 70;
        return 90 - 40 - bac / 2;
      },
    },
    {
      id: '17.2-b09',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$\\angle A=\\angle B+\\angle C$，则 $\\triangle ABC$ 是（　　）',
      options: ['锐角三角形', '直角三角形', '钝角三角形', '不能确定'],
      answer: 1,
      explain: [
        '$\\angle A+\\angle B+\\angle C=180^\\circ$，把 $\\angle B+\\angle C$ 换成 $\\angle A$：$2\\angle A=180^\\circ$，$\\angle A=90^\\circ$。',
        '所以是直角三角形，选 B。',
        '坑：觉得 $\\angle A$ 比另外两个角都大，就以为是钝角三角形。',
      ],
      verify: () => (180 / 2 === 90 ? 1 : -1),
    },

    // ---------- 扩展 ----------
    {
      id: '17.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle A=2\\angle B$，并且这个三角形有一个外角等于 $120^\\circ$。求 $\\angle C$ 的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle C=$', answer: ['90', '60'], suffix: '°' },
      ],
      explain: [
        '外角与相邻的内角互补，外角为 $120^\\circ$，就是有一个内角为 $60^\\circ$。不知道是哪个顶点处的，分三种情况。',
        '① $\\angle A=60^\\circ$：$\\angle B=30^\\circ$，$\\angle C=90^\\circ$。',
        '② $\\angle B=60^\\circ$：$\\angle A=120^\\circ$，$\\angle A+\\angle B=180^\\circ$，$\\angle C=0^\\circ$，不可能。',
        '③ $\\angle C=60^\\circ$：$\\angle A+\\angle B=3\\angle B=120^\\circ$，$\\angle B=40^\\circ$，$\\angle A=80^\\circ$，成立。',
        '所以 $\\angle C=90^\\circ$ 或 $60^\\circ$。转弯：先把“外角为 $120^\\circ$”转化成“某个内角为 $60^\\circ$”，再按顶点分类并检验。',
      ],
      verify: () => {
        const r = new Set();
        for (let b = 1; b < 90; b++) { const a = 2 * b, c = 180 - a - b; if (c <= 0) continue; if ([a, b, c].some(x => 180 - x === 120)) r.add(c); }
        return [...r];
      },
    },
    {
      id: '17.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，延长 $BC$ 到 $D$，$\\angle ABC$ 的平分线与外角 $\\angle ACD$ 的平分线相交于点 $E$，$\\angle A=64^\\circ$。求 $\\angle E$ 的度数。',
      figure: FIG172.e02,
      blanks: [
        { kind: 'angle', label: '$\\angle E=$', answer: '32°' },
      ],
      explain: [
        '$\\angle ACD$ 是 $\\triangle ABC$ 的外角：$\\angle ACD=\\angle A+\\angle ABC$。',
        '$\\angle ECD$ 是 $\\triangle EBC$ 的外角：$\\angle ECD=\\angle E+\\angle EBC$。',
        '两条角平分线：$\\angle ECD=\\frac12\\angle ACD=\\frac12\\angle A+\\frac12\\angle ABC$，$\\angle EBC=\\frac12\\angle ABC$。代入得 $\\angle E=\\frac12\\angle A=32^\\circ$。',
        '转弯：在两个三角形里各用一次外角的推论，再相减，与 $\\angle ABC$ 的大小无关。',
      ],
      verify: () => {
        const r = [];
        for (const b of [30, 50, 70]) { const acd = 64 + b; r.push(acd / 2 - b / 2); }
        return r.every(x => x === r[0]) ? r[0] : null;
      },
    },
    {
      id: '17.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle A=50^\\circ$，高 $BD$、$CE$ 所在的直线相交于点 $H$（$H$ 与 $B$、$C$ 不重合）。求 $\\angle BHC$ 的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BHC=$', answer: ['130', '50'], suffix: '°' },
      ],
      explain: [
        '没有图，按三角形的形状分类（$\\angle A=50^\\circ$ 是锐角）。',
        '① 锐角三角形：$H$ 在三角形内部。在四边形 $ADHE$ 中不好算，改看 $\\text{Rt}\\triangle ABD$：$\\angle ABD=90^\\circ-50^\\circ=40^\\circ$；在 $\\text{Rt}\\triangle BEH$ 中，$\\angle BHE=90^\\circ-40^\\circ=50^\\circ$，所以 $\\angle BHC=180^\\circ-50^\\circ=130^\\circ$。',
        '② $\\angle B$ 或 $\\angle C$ 是钝角（比如 $\\angle B$）：$H$ 在三角形外部。$\\angle ABD=40^\\circ$ 仍成立，此时 $H$ 在 $DB$ 的延长线上，$\\angle BHC$ 就是 $\\text{Rt}\\triangle$ 中与 $40^\\circ$ 互余的那个角：$\\angle BHC=90^\\circ-40^\\circ=50^\\circ$（$\\angle C$ 为钝角时同理）。',
        '③ 直角三角形（$\\angle B$ 或 $\\angle C$ 为直角）时 $H$ 与直角顶点重合，题目已排除。',
        '所以 $\\angle BHC=130^\\circ$ 或 $50^\\circ$。转弯：高的交点随三角形形状变化位置，要分锐角、钝角讨论。',
      ],
      verify: () => {
        // A 在原点，AB 沿 x 轴，AC 与 AB 成 50°；取不同的 AC 长度得到锐角、钝角三角形，求高的交点
        const r = new Set();
        const rad = (50 * Math.PI) / 180;
        for (const [b, c] of [[1, 1.2], [1, 3], [3, 1]]) {
          const A = [0, 0], B = [c, 0], C = [b * Math.cos(rad), b * Math.sin(rad)];
          // H 在过 C 且垂直于 AB 的直线 x=C.x 上，并满足 BH⊥AC：(H−B)·(C−A)=0 → (C.x−B.x)·C.x + y·C.y = 0
          const y = (-(C[0] - B[0]) * C[0]) / C[1];
          const Hh = [C[0], y];
          r.add(Math.round(ang172(Hh, B, C)));
        }
        return [...r];
      },
    },
    {
      id: '17.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，五角星 $ABCDE$ 中，$\\angle A=30^\\circ$，$\\angle B=40^\\circ$，$\\angle C=35^\\circ$，$\\angle D=45^\\circ$（这里的 $\\angle A$ 等指五角星各个尖角）。求 $\\angle E$ 的度数。',
      figure: FIG172.e04,
      blanks: [
        { kind: 'angle', label: '$\\angle E=$', answer: '30°' },
      ],
      explain: [
        '先证明五个尖角的和是 $180^\\circ$。设线段 $AC$ 与 $BE$ 交于点 $M$，$AD$ 与 $BE$ 交于点 $N$（尖角 $A$ 的两边是 $AC$、$AD$）。',
        '$\\angle AMN$ 是 $\\triangle MCE$ 的外角：$\\angle AMN=\\angle C+\\angle E$；$\\angle ANM$ 是 $\\triangle NBD$ 的外角：$\\angle ANM=\\angle B+\\angle D$。',
        '在 $\\triangle AMN$ 中：$\\angle A+\\angle AMN+\\angle ANM=180^\\circ$，即 $\\angle A+\\angle B+\\angle C+\\angle D+\\angle E=180^\\circ$。',
        '所以 $\\angle E=180^\\circ-30^\\circ-40^\\circ-35^\\circ-45^\\circ=30^\\circ$。转弯：用两次外角把五个角集中到一个三角形里。',
      ],
      verify: () => 180 - 30 - 40 - 35 - 45,
    },
    {
      id: '17.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\angle MON=70^\\circ$，点 $A$、$B$ 分别在射线 $OM$、$ON$ 上运动（不与点 $O$ 重合）。$\\triangle AOB$ 在顶点 $A$、$B$ 处的两个外角（$\\angle BAM$ 和 $\\angle ABN$）的平分线相交于点 $P$。在运动过程中，$\\angle APB$ 的度数是多少？',
      figure: FIG172.e05,
      blanks: [
        { kind: 'angle', label: '$\\angle APB=$', answer: '55°' },
      ],
      explain: [
        '外角与内角互补：$\\angle BAM=180^\\circ-\\angle OAB$，$\\angle ABN=180^\\circ-\\angle OBA$。',
        '在 $\\triangle APB$ 中，$\\angle PAB=\\frac12\\angle BAM$，$\\angle PBA=\\frac12\\angle ABN$，所以 $\\angle PAB+\\angle PBA=\\frac12(360^\\circ-\\angle OAB-\\angle OBA)=\\frac12(360^\\circ-110^\\circ)=125^\\circ$。',
        '这里用了 $\\triangle AOB$ 的内角和：$\\angle OAB+\\angle OBA=180^\\circ-70^\\circ=110^\\circ$。',
        '$\\angle APB=180^\\circ-125^\\circ=55^\\circ$，即 $90^\\circ-\\frac12\\angle MON$，与 $A$、$B$ 的位置无关。转弯：两个外角都不知道，但它们的和可以由两个三角形的内角和求出来。',
      ],
      verify: () => {
        const r = [];
        const rad = (70 * Math.PI) / 180;
        for (const [a, b] of [[3, 5], [6, 2], [4, 4]]) {
          const O = [0, 0], A = [a * Math.cos(rad), a * Math.sin(rad)], B = [b, 0], M = [10 * Math.cos(rad), 10 * Math.sin(rad)], N = [10, 0];
          const dirBis = (p, q, r2) => { const u = Math.atan2(q[1] - p[1], q[0] - p[0]); let d = Math.atan2(r2[1] - p[1], r2[0] - p[0]) - u; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return u + d / 2; };
          const P = SVG172.meet(A, dirBis(A, B, M), B, dirBis(B, A, N));
          r.push(Math.round(ang172(P, A, B) * 1e6) / 1e6);
        }
        return r.every(x => Math.abs(x - r[0]) < 1e-6) ? r[0] : null;
      },
    },
    {
      id: '17.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '如果一个三角形中有一个内角是另一个内角的 $3$ 倍，就称它为“三倍角三角形”。若一个三倍角三角形中有一个内角是 $36^\\circ$，求它最大内角的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '', answer: ['108', '132'], suffix: '°' },
      ],
      explain: [
        '$36^\\circ$ 这个角可能是“小的那个”“大的那个”，也可能是第三个角，分三种情况。',
        '① $36^\\circ$ 是小角，大角 $108^\\circ$，第三个角 $180^\\circ-144^\\circ=36^\\circ$，三个角 $36^\\circ,36^\\circ,108^\\circ$，最大 $108^\\circ$。',
        '② $36^\\circ$ 是大角，小角 $12^\\circ$，第三个角 $132^\\circ$，最大 $132^\\circ$。',
        '③ $36^\\circ$ 是第三个角，另两个角 $x$、$3x$：$4x=144^\\circ$，$x=36^\\circ$，三个角又是 $36^\\circ,36^\\circ,108^\\circ$，和 ① 相同。',
        '所以最大内角是 $108^\\circ$ 或 $132^\\circ$。转弯：新定义里“哪两个角是 3 倍关系”不确定，要列出所有位置再合并相同的结果。',
      ],
      verify: () => {
        const r = new Set();
        for (let a = 1; a < 180; a++) for (let b = a; b < 180; b++) {
          const c = 180 - a - b;
          if (c < b) continue;
          const t = [a, b, c];
          const triple = t.some((x, i) => t.some((y, j) => i !== j && x === 3 * y));
          if (triple && t.includes(36)) r.add(c);
        }
        return [...r];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '17.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '$\\triangle ABC$ 的三个内角的度数都是正整数，$\\angle A<\\angle B<\\angle C$，并且 $\\angle C=5\\angle A$。这样的三角形（按三个角的度数区分）共有几种？其中 $\\angle B$ 的最大值是多少度？',
      blanks: [
        { kind: 'num', label: '共', answer: '9', suffix: '种' },
        { kind: 'angle', label: '$\\angle B$ 最大为', answer: '78°' },
      ],
      explain: [
        '设 $\\angle A=x$，则 $\\angle C=5x$，$\\angle B=180^\\circ-6x$。',
        '$\\angle A<\\angle B$：$x<180-6x$，$x<\\frac{180}{7}\\approx25.7$。$\\angle B<\\angle C$：$180-6x<5x$，$x>\\frac{180}{11}\\approx16.4$。',
        '$x$ 是正整数，$17\\leq x\\leq25$，共 $9$ 种（此时 $\\angle B$、$\\angle C$ 也都是正整数）。',
        '$\\angle B=180^\\circ-6x$ 随 $x$ 增大而减小，$x=17$ 时最大：$180^\\circ-102^\\circ=78^\\circ$。',
        '思路：用内角和把三个角都用 $x$ 表示，把大小关系翻译成不等式组，再取整数解。',
      ],
      verify: () => {
        const xs = [];
        for (let x = 1; x < 60; x++) { const b = 180 - 6 * x, c = 5 * x; if (b > 0 && x < b && b < c) xs.push(x); }
        return [xs.length, Math.max(...xs.map(x => 180 - 6 * x))];
      },
    },
    {
      id: '17.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle ABC$、$\\angle ACB$ 的平分线交于点 $O$；两个外角 $\\angle CBM$、$\\angle BCN$（$M$、$N$ 分别在 $AB$、$AC$ 的延长线上）的平分线交于点 $P$；$\\angle ABC$ 的平分线与外角 $\\angle ACD$（$D$ 在 $BC$ 的延长线上）的平分线交于点 $E$。若 $\\angle BOC$、$\\angle BPC$、$\\angle E$ 这三个角中，有一个角是另一个角的 $3$ 倍，求 $\\angle A$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle A=$', answer: ['90', '45', '135'], suffix: '°' },
      ],
      explain: [
        '先用 $\\angle A$ 表示三个角。① 两内角平分线：$\\angle OBC+\\angle OCB=\\frac12(180^\\circ-\\angle A)$，$\\angle BOC=90^\\circ+\\frac12\\angle A$。',
        '② 两外角平分线：$\\angle PBC+\\angle PCB=\\frac12[(180^\\circ-\\angle ABC)+(180^\\circ-\\angle ACB)]=\\frac12(180^\\circ+\\angle A)$，$\\angle BPC=90^\\circ-\\frac12\\angle A$。',
        '③ 一内一外：$\\angle ECD=\\frac12(\\angle A+\\angle ABC)$，又 $\\angle ECD=\\angle E+\\frac12\\angle ABC$，所以 $\\angle E=\\frac12\\angle A$。',
        '记 $x=\\frac12\\angle A$（$0<x<90$），三个角是 $90+x$、$90-x$、$x$。按“谁是谁的 3 倍”分六种：$90+x=3(90-x)$ 得 $x=45$；$90-x=3(90+x)$ 得 $x<0$；$90+x=3x$ 得 $x=45$；$x=3(90+x)$ 得 $x<0$；$90-x=3x$ 得 $x=22.5$；$x=3(90-x)$ 得 $x=67.5$。',
        '去掉不合题意的和重复的，$x=45,22.5,67.5$，即 $\\angle A=90^\\circ$、$45^\\circ$ 或 $135^\\circ$。思路：三种“平分线交点”各推出一个只含 $\\angle A$ 的式子，再按倍数关系的六种配对分类，用 $0^\\circ<\\angle A<180^\\circ$ 筛选。',
      ],
      verify: () => {
        const r = new Set();
        for (let k = 1; k < 360; k++) {
          const a = k / 2, x = a / 2, t = [90 + x, 90 - x, x];
          if (t.some((p, i) => t.some((q, j) => i !== j && Math.abs(p - 3 * q) < 1e-9))) r.add(a);
        }
        return [...r];
      },
    },
    {
      id: '17.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如果一个三角形中有一个内角恰好是另一个内角的 $2$ 倍，就称它为“倍角三角形”。三个内角的度数都是正整数的倍角三角形（三个角的度数分别相同的算同一个）共有多少个？其中直角三角形有几个？',
      blanks: [
        { kind: 'num', label: '共', answer: '59', suffix: '个' },
        { kind: 'num', label: '直角三角形', answer: '2', suffix: '个' },
      ],
      explain: [
        '设三个角为 $a\\leq b\\leq c$（度），$a+b+c=180$。“2 倍”关系可能出现在三对角之间，分三类：',
        '① $b=2a$：$c=180-3a\\geq b=2a$，得 $a\\leq36$，$a=1,2,\\dots,36$，共 $36$ 个。',
        '② $c=2a$：$b=180-3a$，要 $a\\leq b\\leq c$：$a\\leq180-3a\\leq2a$，得 $36\\leq a\\leq45$，共 $10$ 个。',
        '③ $c=2b$：$a=180-3b$，要 $1\\leq a\\leq b$：$45\\leq b\\leq59$，共 $15$ 个。',
        '三类有重复：$36^\\circ,72^\\circ,72^\\circ$ 同时属于 ① 和 ②；$45^\\circ,45^\\circ,90^\\circ$ 同时属于 ② 和 ③。所以共 $36+10+15-2=59$ 个。直角三角形：$c=90$，有 $30^\\circ,60^\\circ,90^\\circ$ 和 $45^\\circ,45^\\circ,90^\\circ$，共 $2$ 个。',
        '思路：不知道是哪两个角成 2 倍，就按三种配对分类，每类用“从小到大”的顺序列不等式求整数个数，最后去掉重复计数的。',
      ],
      verify: () => {
        let n = 0, right = 0;
        for (let a = 1; a <= 180; a++) for (let b = a; b <= 180; b++) {
          const c = 180 - a - b;
          if (c < b) continue;
          const t = [a, b, c];
          if (t.some((x, i) => t.some((y, j) => i !== j && x === 2 * y))) { n++; if (c === 90) right++; }
        }
        return [n, right];
      },
    },
    {
      id: '17.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，线段 $AD$、$BC$ 相交，连接 $AB$、$CD$。(1) 若 $AP$、$CP$ 分别平分 $\\angle BAD$、$\\angle BCD$，$\\angle B=48^\\circ$，$\\angle D=36^\\circ$（$\\angle B=\\angle ABC$，$\\angle D=\\angle ADC$），求 $\\angle APC$（配图为第 (1) 问的情形）；(2) 若改为 $\\angle BAP=\\frac13\\angle BAD$，$\\angle BCP=\\frac13\\angle BCD$，其余条件不变，求 $\\angle APC$。',
      figure: FIG172.c04,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle APC=$', answer: '42°' },
        { kind: 'angle', label: '(2) $\\angle APC=$', answer: '44°' },
      ],
      explain: [
        '基本结论（“8 字形”）：两条线段交叉形成两个三角形，它们有一对对顶角，所以另外两个角的和相等。',
        '设 $\\angle BAD=x$，$\\angle BCD=y$，$\\angle BAP=kx$，$\\angle BCP=ky$（(1) 中 $k=\\frac12$，(2) 中 $k=\\frac13$）。',
        '在以 $AB$、$CP$ 交叉形成的“8 字形”中（$AP$ 与 $BC$ 相交）：$\\angle BAP+\\angle B=\\angle APC+\\angle BCP$，即 $kx+48^\\circ=\\angle APC+ky$。',
        '在 $AP$ 与 $CD$ 方向的“8 字形”中（$CP$ 与 $AD$ 相交）：$\\angle PAD+\\angle APC=\\angle PCD+\\angle D$，即 $(1-k)x+\\angle APC=(1-k)y+36^\\circ$。',
        '把第一式乘 $(1-k)$、第二式乘 $k$ 再相加，消去 $x$、$y$：$\\angle APC=(1-k)\\times48^\\circ+k\\times36^\\circ$。(1) $k=\\frac12$：$\\angle APC=42^\\circ$。(2) $k=\\frac13$：$\\angle APC=\\frac23\\times48^\\circ+\\frac13\\times36^\\circ=32^\\circ+12^\\circ=44^\\circ$。',
        '思路：找出两个以 $\\angle APC$ 为一角的“8 字形”，各列一个等式，$x$、$y$ 求不出来，就设法把它们消掉。',
      ],
      verify: () => {
        // 构造满足 ∠ABC=48°、∠ADC=36° 的图形较繁，这里用一般位置的数值检验 ∠APC=(1−k)∠B+k∠D，再代入数据
        const S = SVG172;
        const cases = [[[0, 0], [10, 1], [1, 8], [11, 7]], [[0, 0], [12, -1], [-1, 9], [9, 8]], [[0, 0], [9, 0], [2, 10], [12, 9]]];
        for (const k of [0.5, 1 / 3]) for (const [A, B, C, D] of cases) {
          const P = S.meet(A, S.dir(A, B, D, k), C, S.dir(C, B, D, k));
          const want = (1 - k) * ang172(B, A, C) + k * ang172(D, A, C);
          if (Math.abs(ang172(P, A, C) - want) > 1e-6) return null;
        }
        return [(48 + 36) / 2, (2 * 48 + 36) / 3];
      },
    },
    {
      id: '17.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 纸片中，$\\angle A=40^\\circ$，点 $D$、$E$ 分别在边 $AB$、$AC$ 上（不与端点重合），沿直线 $DE$ 折叠，点 $A$ 落在点 $A\'$ 处。记 $\\angle1=\\angle BDA\'$，$\\angle2=\\angle CEA\'$（都取小于平角的角）。若 $\\angle1=30^\\circ$，求 $\\angle2$ 的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle2=$', answer: ['50', '110'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle ADE=x$，$\\angle AED=y$，则 $x+y=140^\\circ$。折叠后 $\\angle A\'DE=x$，$\\angle A\'ED=y$，$\\angle ADA\'=2x$，$\\angle AEA\'=2y$。',
        '$\\angle1$ 与 $\\angle ADA\'$ 的关系看 $2x$ 与 $180^\\circ$ 的大小：$2x\\leq180^\\circ$ 时，$A\'$ 与 $C$ 在 $AB$ 同侧，$\\angle1=180^\\circ-2x$；$2x>180^\\circ$ 时，$A\'$ 翻到了 $AB$ 的另一侧，$\\angle1=2x-180^\\circ$。$\\angle2$ 同理。',
        '① $2x\\leq180^\\circ$、$2y\\leq180^\\circ$：$\\angle1+\\angle2=360^\\circ-2(x+y)=80^\\circ$，$\\angle2=50^\\circ$。此时 $x=75^\\circ$，$y=65^\\circ$，可以取到。',
        '② $2x>180^\\circ$：$\\angle1=2x-180^\\circ=30^\\circ$，$x=105^\\circ$，$y=35^\\circ$，$\\angle2=180^\\circ-70^\\circ=110^\\circ$（这时 $\\angle2-\\angle1=80^\\circ$）。③ $2y>180^\\circ$：$y>90^\\circ$，$x<50^\\circ$，$\\angle1=180^\\circ-2x>80^\\circ$，与 $\\angle1=30^\\circ$ 矛盾。',
        '所以 $\\angle2=50^\\circ$ 或 $110^\\circ$。思路：折叠后 $A\'$ 的位置不确定，用 $\\angle ADE$、$\\angle AED$ 统一表示，按“折过去的角是否超过平角”分类，每种情况都要检验能否取到。',
      ],
      verify: () => {
        const r = new Set();
        for (let k = 1; k < 1400; k++) {
          const x = k / 10, y = 140 - x;
          if (y <= 0) continue;
          const a1 = 2 * x <= 180 ? 180 - 2 * x : 2 * x - 180, a2 = 2 * y <= 180 ? 180 - 2 * y : 2 * y - 180;
          if (Math.abs(a1 - 30) < 1e-9) r.add(Math.round(a2));
        }
        return [...r];
      },
    },
  ],
});
