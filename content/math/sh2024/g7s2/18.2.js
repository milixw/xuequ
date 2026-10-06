'use strict';

// 上海数学七年级下册 · 18.2 等腰三角形的判定
// 知识范围：定理“如果一个三角形有两个角相等，那么这两个角所对的边也相等”（等角对等边）；在三角形中，大角对大边
// 可以使用：18.1（等边对等角、三线合一、轴对称、大边对大角）；第 17 章（三边关系、内角和、外角、全等的判定）；第 16 章平行线；第 15 章不等式
// 还没学：等边三角形（18.3）；线段的垂直平分线（18.4）；“30° 角所对直角边等于斜边的一半”、角平分线性质、HL、勾股定理（八年级）；三角形中位线（八年级下册）
// 本节约定：说明三角形是等腰三角形时，要指出相等的两条边

const SVG182 = {
  wrap: (w, h, inner, dy = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${dy ? `<g transform="translate(0,${dy})">${inner}</g>` : inner}</svg>`,
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
  // 由底边 BC 和两个底角（度）求顶点 A（A 在上方）
  apex: (B, C, angB, angC) => SVG182.meet(B, [B[0] + Math.cos((angB * Math.PI) / 180), B[1] - Math.sin((angB * Math.PI) / 180)],
    C, [C[0] - Math.cos((angC * Math.PI) / 180), C[1] - Math.sin((angC * Math.PI) / 180)]),
  // ∠qpr 的平分线方向上的一点
  bis: (p, q, r) => {
    const u = [q[0] - p[0], q[1] - p[1]], v = [r[0] - p[0], r[1] - p[1]];
    const lu = Math.hypot(...u), lv = Math.hypot(...v);
    return [p[0] + u[0] / lu + v[0] / lv, p[1] + u[1] / lu + v[1] / lv];
  },
};

const FIG182 = (() => {
  const S = SVG182, out = {};
  // b02：BD 平分 ∠ABC，DE∥BC 交 AB 于 E
  {
    const B = [30, 190], C = [270, 190], A = S.apex(B, C, 64, 50);
    const D = S.meet(B, S.bis(B, A, C), A, C), E = S.meet(D, [D[0] + 1, D[1]], A, B);
    out.b02 = S.wrap(300, 215, S.poly([A, B, C]) + S.seg(B, D) + S.seg(D, E) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 12, -2) + S.text('E', E, -12, -2));
  }
  // b06：∠B=∠C=40°，D、E 在 BC 上，∠BAD=∠CAE=40°（∠ADC=∠AEB=80°）
  {
    const B = [20, 170], C = [280, 170], A = S.apex(B, C, 40, 40);
    const r = (80 * Math.PI) / 180;
    const Dp = S.meet(A, [A[0] - Math.cos(r), A[1] + Math.sin(r)], B, C), Ep = [B[0] + C[0] - Dp[0], Dp[1]];
    out.b06 = S.wrap(300, 195, S.poly([A, B, C]) + S.seg(A, Dp) + S.seg(A, Ep) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', Dp, 0, 14) + S.text('E', Ep, 0, 14));
  }
  // b07：长方形 ABCD 沿 BD 折叠，C 落在 C′，BC′ 交 AD 于 E
  {
    const A = [40, 40], B = [40, 160], C = [280, 160], D = [280, 40];
    // C 关于 BD 的对称点
    const dx = D[0] - B[0], dy = D[1] - B[1], t = ((C[0] - B[0]) * dx + (C[1] - B[1]) * dy) / (dx * dx + dy * dy);
    const Fo = [B[0] + t * dx, B[1] + t * dy], Cp = [2 * Fo[0] - C[0], 2 * Fo[1] - C[1]];
    const E = S.meet(B, Cp, A, D);
    out.b07 = S.wrap(320, 245, S.poly([A, B, C, D]) + S.seg(B, D) + S.seg(B, Cp, true) + S.seg(D, Cp, true)
      + S.text('A', A, -10, -6) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8) + S.text('D', D, 10, -6) + S.text('C′', Cp, 4, -14) + S.text('E', E, -2, 16), 55);
  }
  // b09：AD 平分外角 ∠CAE（E 在 BA 的延长线上），AD∥BC
  {
    const B = [40, 190], C = [260, 190], A = S.apex(B, C, 50, 50), E = S.at(B, A, 1.45), D = [A[0] + 110, A[1]];
    out.b09 = S.wrap(320, 215, S.poly([A, B, C]) + S.seg(A, E) + S.seg(A, D) + S.text('A', A, -6, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 10, 0) + S.text('E', E, -10, -4));
  }
  // e04：AB=AC，D 在 AB 上，E 在 AC 的延长线上，DE 交 BC 于 F，F 是 DE 的中点（BD=CE）
  {
    const B = [40, 160], C = [240, 160], A = S.apex(B, C, 65, 65);
    const D = S.at(A, B, 5 / 8), ab = Math.hypot(A[0] - B[0], A[1] - B[1]), bd = (3 / 8) * ab;  // AB=8，BD=3
    const E = S.at(A, C, 1 + bd / ab), Fp = S.meet(D, E, B, C);
    out.e04 = S.wrap(300, 345, S.poly([A, B, C]) + S.seg(C, E) + S.seg(D, E) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 4, -12)
      + S.text('D', D, -12, 0) + S.text('E', E, 10, 4) + S.text('F', Fp, -4, 14), 75);
  }
  // c03：AB=AC，∠B=50°，D、E 在 BC 上，BD=BA，CE=CA（E 在 B、D 之间）
  {
    const B = [20, 175], C = [280, 175], A = S.apex(B, C, 50, 50), ab = Math.hypot(A[0] - B[0], A[1] - B[1]);
    const Dp = [B[0] + ab, 175], Ep = [C[0] - ab, 175];
    out.c03 = S.wrap(300, 200, S.poly([A, B, C]) + S.seg(A, Dp) + S.seg(A, Ep) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', Dp, 0, 14) + S.text('E', Ep, 0, 14));
  }
  // e06：BO 平分 ∠ABC，CO 平分外角 ∠ACD，过 O 作 MN∥BC 交 AB 于 M、AC 于 N（按 AB=10.5、AC=4.5、BC=12 画，每单位 18px）
  {
    const k = 18, B = [20, 175], C = [B[0] + 12 * k, 175];
    const ax = (10.5 * 10.5 - 4.5 * 4.5 + 144) / 24, A = [B[0] + ax * k, 175 - Math.sqrt(10.5 * 10.5 - ax * ax) * k];
    const Dx = [C[0] + 60, 175];
    const O = S.meet(B, S.bis(B, A, C), C, S.bis(C, A, Dx));
    const M = S.meet(O, [O[0] + 1, O[1]], A, B), N = S.meet(O, [O[0] + 1, O[1]], A, C);
    out.e06 = S.wrap(330, 200, S.poly([A, B, C]) + S.seg(C, Dx) + S.seg(B, O) + S.seg(C, O) + S.seg(M, O)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, -2, 14) + S.text('D', Dx, 8, 10) + S.text('O', O, 10, -6) + S.text('M', M, -12, -4) + S.text('N', N, 6, -12));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s2/18.2',
  title: '等腰三角形的判定',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 4, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核四轮，答案全部一致。第 1 轮卡片例子撞 b08、卡片“外角两倍”条架空 b05，b07、e04、e05 配图裁切，e01、e05 偏易，b06、e04、e05、e06、c04（AE=ED=DB=BC）、c05（三联图）照搬经典，c02～c05 不够难；第 2 轮换 b06、e01、e05、e06 和全部挑战题，e04 改逆向，修正卡片与配图；第 3 轮 c03（一线三等角）与流传中考题同数据，c05 纸条折叠为经典题，换成 BD=BA、CE=CA 加参数的等腰计数；第 4 轮原 c05（角和边同给具体值）超定、且与 e01、e03 重复，换成外角延长两个三角形嵌套的两层分类，整节通过' },

  intro: [
    {
      title: '等角对等边',
      body: '“等边对等角”的逆命题也成立。**定理**：如果一个三角形有两个角相等，那么这两个角所对的边也相等（等角对等边）。证明：作第三个角的平分线，由 AAS 得两个三角形全等。',
      example: '$\\triangle PQR$ 中，$\\angle Q=\\angle R=48^\\circ$，所以 $PQ=PR$，它是等腰三角形。',
      pitfall: '相等的两个角所对的边才相等，要先找准“对边”：$\\angle Q$ 的对边是 $PR$。',
    },
    {
      title: '常见的“等腰”来源',
      body: '题目里不直接给相等的边时，常从角相等推出等腰：① 角平分线遇到平行线，会出现一对相等的角（平分得一对，平行又得一对）；② 折叠时，折痕两侧的角相等，再遇到平行就出现等腰。',
      example: '若 $\\angle 1=\\angle 2$（平分），$\\angle 2=\\angle 3$（平行线的内错角），则 $\\angle1=\\angle3$，这两个角所对的边相等。',
    },
    {
      title: '大角对大边',
      body: '“大边对大角”的逆命题也成立：三角形中，较大的角所对的边较长。可以用反证法说明：若较大的角所对的边不比另一边长，由等边对等角或大边对大角，角就不会更大，矛盾。',
      example: '$\\triangle PQR$ 中 $\\angle Q>\\angle R$，那么 $\\angle Q$ 的对边 $PR$ 大于 $\\angle R$ 的对边 $PQ$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '18.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$\\angle A=40^\\circ$，$\\angle B=70^\\circ$。下列结论中正确的是（　　）',
      options: ['$AB=BC$', '$AB=AC$', '$AC=BC$', '$\\triangle ABC$ 不是等腰三角形'],
      answer: 1,
      explain: [
        '$\\angle C=180^\\circ-40^\\circ-70^\\circ=70^\\circ=\\angle B$。',
        '等角对等边：$\\angle B$ 的对边是 $AC$，$\\angle C$ 的对边是 $AB$，所以 $AB=AC$，选 B。',
        '坑：以为 $\\angle B=\\angle C$ 就有 $BC$ 相关的两边相等，选成 A 或 C。',
      ],
      verify: () => (180 - 40 - 70 === 70 ? 1 : -1),
    },
    {
      id: '18.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$BD$ 平分 $\\angle ABC$，交 $AC$ 于点 $D$，$DE\\parallel BC$，交 $AB$ 于点 $E$，$AB=7$，$AE=3$，$AD=4$。求 $DE$ 的长和 $\\triangle ADE$ 的周长。',
      figure: FIG182.b02,
      blanks: [
        { kind: 'num', label: '$DE=$', answer: '4' },
        { kind: 'num', label: '周长', answer: '11' },
      ],
      explain: [
        '$BD$ 平分 $\\angle ABC$：$\\angle EBD=\\angle DBC$；$DE\\parallel BC$：$\\angle EDB=\\angle DBC$（内错角）。所以 $\\angle EBD=\\angle EDB$，$DE=BE$（等角对等边）。',
        '$BE=AB-AE=7-3=4$，所以 $DE=4$。',
        '$\\triangle ADE$ 的周长 $=AE+DE+AD=3+4+4=11$。坑：把 $DE$ 和 $AD$ 弄混，或者以为 $DE=AE$。',
      ],
      verify: () => { const de = 7 - 3; return [de, 3 + de + 4]; },
    },
    {
      id: '18.2-b03',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$\\angle A=50^\\circ$，$\\angle B=60^\\circ$。三条边中最长的是（　　）',
      options: ['$AB$', '$BC$', '$AC$', '不能确定'],
      answer: 0,
      explain: [
        '$\\angle C=180^\\circ-50^\\circ-60^\\circ=70^\\circ$，是最大的角。',
        '大角对大边：$\\angle C$ 的对边 $AB$ 最长，选 A。',
        '坑：看到 $\\angle B$ 是题目给的较大的角，就以为 $\\angle B$ 最大；要先算出第三个角。',
      ],
      verify: () => { const a = [50, 60, 70]; return [1, 2, 0][a.indexOf(Math.max(...a))]; },  // ∠A、∠B、∠C 的对边依次是 BC、AC、AB（选项下标 1、2、0）
    },
    {
      id: '18.2-b04',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$\\angle A:\\angle B:\\angle C=1:1:2$，则 $\\triangle ABC$ 是（　　）',
      options: ['等腰三角形，但不是直角三角形', '直角三角形，但不是等腰三角形', '等腰直角三角形', '等边三角形'],
      answer: 2,
      explain: [
        '$\\angle A=\\angle B=45^\\circ$，$\\angle C=90^\\circ$。',
        '$\\angle A=\\angle B$，所以 $BC=AC$（等角对等边），是等腰三角形；又 $\\angle C=90^\\circ$，是直角三角形。',
        '所以是等腰直角三角形，选 C。坑：只看出一个特征。',
      ],
      verify: () => { const x = 180 / 4; return x === x && 2 * x === 90 ? 2 : -1; },
    },
    {
      id: '18.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，延长 $BC$ 到 $D$，外角 $\\angle ACD=2\\angle A$，$AC=5$。求 $BC$ 的长。',
      blanks: [
        { kind: 'num', label: '$BC=$', answer: '5' },
      ],
      explain: [
        '外角 $\\angle ACD=\\angle A+\\angle B$。又 $\\angle ACD=2\\angle A$，所以 $\\angle B=\\angle A$。',
        '等角对等边：$\\angle A$ 的对边 $BC$ 等于 $\\angle B$ 的对边 $AC$，$BC=AC=5$。',
        '坑：以为 $AB=AC$；相等的是 $\\angle A$、$\\angle B$，对边是 $BC$、$AC$。',
      ],
      verify: () => 5,
    },
    {
      id: '18.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=\\angle C=40^\\circ$，点 $D$、$E$ 在边 $BC$ 上，$\\angle BAD=\\angle CAE=40^\\circ$。图中共有几个等腰三角形？',
      figure: FIG182.b06,
      blanks: [
        { kind: 'num', label: '', answer: '4', suffix: '个' },
      ],
      explain: [
        '$\\angle B=\\angle C$：$\\triangle ABC$ 是等腰三角形（$AB=AC$）。$\\angle B=\\angle BAD$：$DA=DB$；$\\angle C=\\angle CAE$：$EA=EC$。',
        '$\\angle ADE$ 是 $\\triangle ABD$ 的外角：$\\angle ADE=40^\\circ+40^\\circ=80^\\circ$，同理 $\\angle AED=80^\\circ$，所以 $AD=AE$，$\\triangle ADE$ 也是等腰三角形。',
        '$\\triangle ABE$ 中 $\\angle BAE=100^\\circ-40^\\circ=60^\\circ$，三个角 $40^\\circ$、$60^\\circ$、$80^\\circ$ 互不相等，不是；$\\triangle ACD$ 同理。共 $4$ 个。坑：漏掉中间的 $\\triangle ADE$，或把 $\\triangle ABE$ 也算进去。',
      ],
      verify: () => {
        const bac = 180 - 40 - 40, adb = 180 - 40 - 40, ade = 180 - adb;
        const tri = [[40, bac, 40], [40, 40, adb], [40, 40, adb], [bac - 80, ade, ade], [40, bac - 40, 180 - 40 - (bac - 40)], [40, bac - 40, 180 - 40 - (bac - 40)]];  // ABC、ABD、ACE、ADE、ABE、ACD
        return tri.filter(t => new Set(t).size < 3).length;
      },
    },
    {
      id: '18.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，把长方形 $ABCD$ 沿对角线 $BD$ 折叠，点 $C$ 落在点 $C\'$，$BC\'$ 交 $AD$ 于点 $E$，$AD=8$，$AE=3$。求 $BE$ 的长。',
      figure: FIG182.b07,
      blanks: [
        { kind: 'num', label: '$BE=$', answer: '5' },
      ],
      explain: [
        '折叠：$\\angle EBD=\\angle CBD$。长方形中 $AD\\parallel BC$：$\\angle EDB=\\angle CBD$（内错角）。',
        '所以 $\\angle EBD=\\angle EDB$，$BE=DE$（等角对等边）。',
        '$DE=AD-AE=8-3=5$，所以 $BE=5$。坑：想用直角三角形的边长关系去算，其实等腰就够了。',
      ],
      verify: () => 8 - 3,
    },
    {
      id: '18.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$。比较 $AB$ 与 $AC$、$AB$ 与 $BC$ 的大小。',
      blanks: [
        { kind: 'text', label: '$AB$ ○ $AC$', answer: '>', options: ['>', '<', '=', '不能确定'] },
        { kind: 'text', label: '$AB$ ○ $BC$', answer: '>', options: ['>', '<', '=', '不能确定'] },
      ],
      explain: [
        '直角三角形中，另两个角的和是 $90^\\circ$，每个都小于 $90^\\circ$，所以 $\\angle C$ 最大。',
        '大角对大边：$\\angle C$ 的对边 $AB$ 最长，$AB>AC$，$AB>BC$。',
        '坑：觉得不知道具体长度就“不能确定”。斜边总是最长的边。',
      ],
      verify: () => {
        // C 为原点，两条直角边在坐标轴上，取几组长度
        const ok = [[3, 4], [1, 7], [5, 5]].every(([a, b]) => { const ab = Math.hypot(a, b); return ab > a && ab > b; });
        return ok ? ['>', '>'] : null;
      },
    },
    {
      id: '18.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，点 $E$ 在 $BA$ 的延长线上，$AD$ 平分 $\\angle CAE$，$AD\\parallel BC$，$\\angle CAE=100^\\circ$，$AB=6$。求 $\\angle B$ 的度数和 $AC$ 的长。',
      figure: FIG182.b09,
      blanks: [
        { kind: 'angle', label: '$\\angle B=$', answer: '50°' },
        { kind: 'num', label: '$AC=$', answer: '6' },
      ],
      explain: [
        '$AD$ 平分 $\\angle CAE$：$\\angle EAD=\\angle DAC=50^\\circ$。',
        '$AD\\parallel BC$：$\\angle B=\\angle EAD=50^\\circ$（同位角），$\\angle C=\\angle DAC=50^\\circ$（内错角）。',
        '$\\angle B=\\angle C$，所以 $AC=AB=6$（等角对等边）。坑：$\\angle B$ 对应的是同位角 $\\angle EAD$，不要和 $\\angle DAC$ 弄混；两个都是 $50^\\circ$。',
      ],
      verify: () => [100 / 2, 6],
    },

    // ---------- 扩展 ----------
    {
      id: '18.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle A=(x+55)^\\circ$，$\\angle B=(3x-25)^\\circ$。(1) 若 $\\triangle ABC$ 是等腰三角形，求 $x$ 的所有可能值（全部填出，用逗号隔开）；(2) 若 $AB=BC$，求 $x$。',
      blanks: [
        { kind: 'nums', label: '(1) $x=$', answer: ['19', '25'] },
        { kind: 'num', label: '(2) $x=$', answer: '19' },
      ],
      explain: [
        '$\\angle C=180^\\circ-(x+55)^\\circ-(3x-25)^\\circ=(150-4x)^\\circ$。等腰三角形就是有两个角相等，分三种情况：',
        '① $\\angle A=\\angle B$：$x+55=3x-25$，$x=40$，这时 $\\angle C=150^\\circ-160^\\circ<0^\\circ$，不成立，舍去。',
        '② $\\angle A=\\angle C$：$x+55=150-4x$，$x=19$，三个角为 $74^\\circ$、$32^\\circ$、$74^\\circ$。③ $\\angle B=\\angle C$：$3x-25=150-4x$，$x=25$，三个角为 $80^\\circ$、$50^\\circ$、$50^\\circ$。所以 $x=19$ 或 $25$。',
        '(2) $AB$ 是 $\\angle C$ 的对边，$BC$ 是 $\\angle A$ 的对边，$AB=BC$ 就是 $\\angle C=\\angle A$，$x=19$。坑：写成 $\\angle A=\\angle B$。',
        '转弯：每种情况都要检验三个角是否都为正；“哪两条边相等”要换成“它们的对角相等”。',
      ],
      verify: () => {
        const all = [], ab = [];
        for (let k = 1; k <= 240; k++) {
          const x = k / 4, A = x + 55, B = 3 * x - 25, C = 180 - A - B;
          if (A <= 0 || B <= 0 || C <= 0) continue;
          if (A === B || B === C || A === C) all.push(x);
          if (C === A) ab.push(x);
        }
        return [all, ab.length === 1 ? ab[0] : null];
      },
    },
    {
      id: '18.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle B=30^\\circ$，$\\angle C=40^\\circ$。点 $D$ 在边 $BC$ 上（不与 $B$、$C$ 重合），且 $\\triangle ABD$ 是等腰三角形。求 $\\angle BAD$ 的度数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BAD=$', answer: ['30', '75'], suffix: '°' },
      ],
      explain: [
        '$\\angle BAC=180^\\circ-30^\\circ-40^\\circ=110^\\circ$，$D$ 在边 $BC$ 上，所以 $0^\\circ<\\angle BAD<110^\\circ$。$\\triangle ABD$ 中 $\\angle B=30^\\circ$，按哪两个角相等分类：',
        '① $\\angle BAD=\\angle B=30^\\circ$（$DA=DB$），符合。',
        '② $\\angle BAD=\\angle ADB=(180^\\circ-30^\\circ)\\div2=75^\\circ$（$BA=BD$），符合。',
        '③ $\\angle ADB=\\angle B=30^\\circ$（$AB=AD$）：$\\angle BAD=120^\\circ>110^\\circ$，$D$ 会跑到 $BC$ 外面，舍去。所以 $\\angle BAD=30^\\circ$ 或 $75^\\circ$。',
        '转弯：每种情况求出角后，都要回到“$D$ 在边 $BC$ 上”这一限制检验。',
      ],
      verify: () => {
        const r = [];
        for (let a = 1; a < 110; a++) { const d = 180 - 30 - a; if (a === 30 || a === d || d === 30) r.push(a); }
        return r;
      },
    },
    {
      id: '18.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=2x-1$，$BC=x+3$，$AC=8$，并且 $\\angle C>\\angle A>\\angle B$。求 $x$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '', answer: '5<x<12' },
      ],
      explain: [
        '大角对大边：$\\angle C$ 最大，它的对边 $AB$ 最长；$\\angle A$ 其次，对边 $BC$ 次之；$\\angle B$ 最小，对边 $AC$ 最短。所以 $AB>BC>AC$。',
        '$2x-1>x+3$，$x>4$；$x+3>8$，$x>5$。',
        '三边关系：较短两边之和大于最长边，$(x+3)+8>2x-1$，$x<12$。',
        '合起来 $5<x<12$。转弯：先把角的大小关系翻译成边的大小关系（大角对大边），再和三边关系一起列不等式组。',
      ],
      verify: () => {
        const ok = [];
        for (let k = 1; k <= 80; k++) {
          const x = k / 4, ab = 2 * x - 1, bc = x + 3, ac = 8;
          if (ab > bc && bc > ac && bc + ac > ab) ok.push(x);
        }
        return ok[0] === 5.25 && ok[ok.length - 1] === 11.75 ? '5<x<12' : null;
      },
    },
    {
      id: '18.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC=8$，点 $D$ 在 $AB$ 上，点 $E$ 在 $AC$ 的延长线上，$DE$ 交 $BC$ 于点 $F$，且 $F$ 是 $DE$ 的中点，$BD=3$。求 $AE$ 的长。',
      figure: FIG182.e04,
      blanks: [
        { kind: 'num', label: '$AE=$', answer: '11' },
      ],
      explain: [
        '思路：$AE=AC+CE$，只要求 $CE$。$CE$ 和 $BD$ 不在同一个三角形里，过 $D$ 作 $DG\\parallel AC$，交 $BC$ 于点 $G$，把 $CE$ 搬到 $D$ 旁边。',
        '在 $\\triangle DGF$ 和 $\\triangle ECF$ 中，$\\angle DGF=\\angle ECF$（$DG\\parallel AC$，内错角），$\\angle DFG=\\angle EFC$（对顶角），$DF=EF$，所以 $\\triangle DGF\\cong\\triangle ECF$（AAS），$DG=CE$。',
        '$DG\\parallel AC$：$\\angle DGB=\\angle ACB$（同位角）；$AB=AC$：$\\angle B=\\angle ACB$。所以 $\\angle DGB=\\angle B$，$DG=DB=3$（等角对等边）。',
        '$CE=DG=3$，$AE=AC+CE=8+3=11$。坑：求出 $CE=3$ 就停下，或误用 $AD=5$。',
      ],
      verify: () => {
        // 数值检验：顶角取几个值，在 AC 的延长线上解出使 DE 中点落在 BC 上的点 E
        const res = [];
        for (const apex of [40, 60, 80]) {
          const h = ((apex / 2) * Math.PI) / 180, B = [-8 * Math.sin(h), -8 * Math.cos(h)], C = [8 * Math.sin(h), -8 * Math.cos(h)];
          const D = [B[0] * 5 / 8, B[1] * 5 / 8], u = [C[0] / 8, C[1] / 8];
          // 中点 M(s) = (D + C + s·u) / 2 在直线 BC 上：cross(M - B, C - B) = 0，关于 s 是一次的
          const cr = (p, q) => p[0] * q[1] - p[1] * q[0], bc = [C[0] - B[0], C[1] - B[1]];
          const m0 = [(D[0] + C[0]) / 2 - B[0], (D[1] + C[1]) / 2 - B[1]], m1 = [u[0] / 2, u[1] / 2];
          res.push(8 - cr(m0, bc) / cr(m1, bc));
        }
        return res.every(v => Math.abs(v - res[0]) < 1e-9) ? Math.round(res[0] * 1e9) / 1e9 : null;
      },
    },
    {
      id: '18.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 的三边长都是整数，周长为 $20$。(1) 满足 $\\angle A=\\angle B>\\angle C$ 的三角形有几个？(2) 满足 $\\angle A>\\angle B>\\angle C$ 的三角形有几个？（$BC$、$CA$、$AB$ 的长有一条不同，就算不同的三角形）',
      blanks: [
        { kind: 'num', label: '(1)', answer: '3', suffix: '个' },
        { kind: 'num', label: '(2)', answer: '4', suffix: '个' },
      ],
      explain: [
        '设 $BC=a$，$CA=b$，$AB=c$，它们分别是 $\\angle A$、$\\angle B$、$\\angle C$ 的对边，$a+b+c=20$。',
        '(1) $\\angle A=\\angle B$：$a=b$（等角对等边）；$\\angle B>\\angle C$：$b>c$（大角对大边）。$c=20-2a<a$，得 $a>\\frac{20}3$；$c\\geq1$，得 $a\\leq9$。三边关系 $c<2a$ 自动成立。$a=7$、$8$、$9$（$c=6$、$4$、$2$），共 $3$ 个。',
        '(2) $a>b>c$（大角对大边）。三边关系：$a<b+c=20-a$，$a<10$；$a$ 最大，$3a>20$，$a\\geq7$。',
        '$a=9$：$b+c=11$，$9>b>c$，有 $(8,3)$、$(7,4)$、$(6,5)$；$a=8$：$b+c=12$，$8>b>c$，只有 $(7,5)$；$a=7$：$b\\leq6$，$b+c\\leq11<13$，没有。共 $4$ 个。',
        '转弯：先把角的大小关系翻译成边的关系，再用三边关系和周长枚举。坑：(2) 漏掉 $a<10$，或把 $b=c=6$ 也算进去。',
      ],
      verify: () => {
        // 枚举整数边，用余弦定理算角（只用于核对）
        const ang = (o, p, q) => Math.acos((p * p + q * q - o * o) / (2 * p * q));
        let n1 = 0, n2 = 0;
        for (let a = 1; a < 20; a++) for (let b = 1; a + b < 20; b++) {
          const c = 20 - a - b;
          if (a >= b + c || b >= a + c || c >= a + b) continue;
          const A = ang(a, b, c), B = ang(b, a, c), C = ang(c, a, b);
          if (Math.abs(A - B) < 1e-12 && B > C + 1e-12) n1++;
          if (A > B + 1e-12 && B > C + 1e-12) n2++;
        }
        return [n1, n2];
      },
    },
    {
      id: '18.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$BO$ 平分 $\\angle ABC$，$CO$ 平分 $\\triangle ABC$ 的外角 $\\angle ACD$（$D$ 在 $BC$ 的延长线上），过点 $O$ 作 $MO\\parallel BC$，交 $AB$ 于点 $M$，交 $AC$ 于点 $N$，$BM=7$，$CN=3$。求 $MN$ 的长。',
      figure: FIG182.e06,
      blanks: [
        { kind: 'num', label: '$MN=$', answer: '4' },
      ],
      explain: [
        '$BO$ 平分 $\\angle ABC$，$MO\\parallel BC$：$\\angle MOB=\\angle OBC=\\angle MBO$（内错角），所以 $MO=MB=7$（等角对等边）。',
        '$CO$ 平分 $\\angle ACD$，$MO\\parallel BC$：$\\angle NOC=\\angle OCD=\\angle NCO$（内错角），所以 $NO=NC=3$。',
        '看图：$O$ 在三角形外，$N$ 在 $M$、$O$ 之间，所以 $MN=MO-NO=7-3=4$。',
        '转弯：两处都是“平分 + 平行 → 等腰”，但 $O$ 不在线段 $MN$ 上，长度是差而不是和。坑：写成 $7+3=10$。',
      ],
      verify: () => {
        // 按配图的三角形（AB=10.5，AC=4.5，BC=12）求 O、M、N，核对 BM、CN 与题目一致
        const meet = (p1, p2, q1, q2) => { const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]], det = d1[0] * -d2[1] + d2[0] * d1[1], s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det; return [p1[0] + s * d1[0], p1[1] + s * d1[1]]; };
        const unit = (p, q) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / l, (q[1] - p[1]) / l]; };
        const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const ax = (10.5 * 10.5 - 4.5 * 4.5 + 144) / 24, A = [ax, Math.sqrt(10.5 * 10.5 - ax * ax)], B = [0, 0], C = [12, 0];
        const u1 = unit(B, A), u2 = unit(B, C), u3 = unit(C, A);
        const O = meet(B, [u1[0] + u2[0], u1[1] + u2[1]], C, [C[0] + u3[0] + 1, C[1] + u3[1]]);
        const M = meet(O, [O[0] + 1, O[1]], A, B), N = meet(O, [O[0] + 1, O[1]], A, C);
        const ok = Math.abs(d(B, M) - 7) < 1e-9 && Math.abs(d(C, N) - 3) < 1e-9 && d(M, O) > d(M, N);
        return ok ? Math.round(d(M, N) * 1e9) / 1e9 : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '18.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle B=20^\\circ$。(1) 若过顶点 $A$ 的一条直线把 $\\triangle ABC$ 分成两个等腰三角形，求 $\\angle C$ 的所有可能值；(2) 若过顶点 $C$ 的一条直线把 $\\triangle ABC$ 分成两个等腰三角形，求 $\\angle C$ 的所有可能值。（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $\\angle C=$', answer: ['10', '40', '70', '100'], suffix: '°' },
        { kind: 'nums', label: '(2) $\\angle C=$', answer: ['60', '90', '120', '150'], suffix: '°' },
      ],
      explain: [
        '(1) 设这条直线交 $BC$ 于 $D$，$\\angle BAD=\\alpha$。$\\triangle ABD$ 的三个角是 $20^\\circ$、$\\alpha$、$160^\\circ-\\alpha$，按哪两个角相等：$\\alpha=20^\\circ$、$80^\\circ$ 或 $140^\\circ$。外角 $\\angle ADC=20^\\circ+\\alpha$，分别是 $40^\\circ$、$100^\\circ$、$160^\\circ$。',
        '$\\triangle ADC$ 中 $\\angle C+\\angle DAC=180^\\circ-\\angle ADC$：$\\angle ADC=40^\\circ$ 时，$\\angle C=\\angle DAC=70^\\circ$，或 $\\angle C=40^\\circ$，或 $\\angle DAC=40^\\circ$、$\\angle C=100^\\circ$；$\\angle ADC=100^\\circ$（钝角只能是顶角）时 $\\angle C=40^\\circ$；$\\angle ADC=160^\\circ$ 时 $\\angle C=10^\\circ$。所以 $\\angle C=10^\\circ$、$40^\\circ$、$70^\\circ$ 或 $100^\\circ$。',
        '(2) 设这条直线交 $AB$ 于 $D$，$\\angle BCD=\\gamma$，这次被分开的是 $\\angle C$ 本身：$\\angle C=\\gamma+\\angle ACD$。$\\triangle BCD$ 的三个角是 $20^\\circ$、$\\gamma$、$160^\\circ-\\gamma$，同样 $\\gamma=20^\\circ$、$80^\\circ$ 或 $140^\\circ$，外角 $\\angle ADC=20^\\circ+\\gamma$ 是 $40^\\circ$、$100^\\circ$、$160^\\circ$。',
        '$\\triangle ADC$ 中：$\\angle ADC=40^\\circ$（$\\gamma=20^\\circ$）时，$\\angle ACD=70^\\circ$、$100^\\circ$ 或 $40^\\circ$，$\\angle C=90^\\circ$、$120^\\circ$ 或 $60^\\circ$；$\\angle ADC=100^\\circ$（$\\gamma=80^\\circ$）时 $\\angle ACD=40^\\circ$，$\\angle C=120^\\circ$；$\\angle ADC=160^\\circ$（$\\gamma=140^\\circ$）时 $\\angle ACD=10^\\circ$，$\\angle C=150^\\circ$。去掉重复的 $120^\\circ$，$\\angle C=60^\\circ$、$90^\\circ$、$120^\\circ$ 或 $150^\\circ$。',
        '思路：两个三角形都要等腰，先对含已知角的三角形按“哪两个角相等”分类，用外角接到第二个三角形再分类。(2) 的不同在于：$\\angle C$ 是两部分之和，要把第一个三角形里的角加回去，而且不同情况可能得到同一个值。',
      ],
      verify: () => {
        const iso = t => t.every(x => x > 1e-9) && (Math.abs(t[0] - t[1]) < 1e-9 || Math.abs(t[1] - t[2]) < 1e-9 || Math.abs(t[0] - t[2]) < 1e-9);
        const viaA = new Set(), viaC = new Set();
        for (let c2 = 1; c2 < 320; c2++) {
          const c = c2 / 2, a = 160 - c;
          for (let u2 = 1; u2 < 360; u2++) {
            const u = u2 / 2;
            // 过 A：∠BAD=u，△ABD(20,u,160−u)，△ADC(a−u, c, 20+u)
            if (u < a && iso([20, u, 160 - u]) && iso([a - u, c, 20 + u])) viaA.add(c);
            // 过 C：∠BCD=u，△BCD(20,u,160−u)，△ADC(a, c−u, 20+u)
            if (u < c && iso([20, u, 160 - u]) && iso([a, c - u, 20 + u])) viaC.add(c);
          }
        }
        const srt = st => [...st].sort((p, q) => p - q);
        return [srt(viaA), srt(viaC)];
      },
    },
    {
      id: '18.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $\\angle MON=\\alpha$（$0^\\circ<\\alpha<180^\\circ$），点 $A$ 在射线 $OM$ 上（$OA$ 的长度确定）。在直线 $ON$ 上找点 $P$（不与 $O$ 重合），使 $\\triangle AOP$ 是等腰三角形。(1) 当 $\\alpha=50^\\circ$ 时，这样的点 $P$ 共有几个？(2) 若这样的点 $P$ 恰好有 $2$ 个，求 $\\alpha$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '4', suffix: '个' },
        { kind: 'nums', label: '(2) $\\alpha=$', answer: ['60', '90', '120'], suffix: '°' },
      ],
      explain: [
        '$P$ 在直线 $ON$ 上，分在射线 $ON$ 上（$\\angle AOP=\\alpha$）和在它的反向延长线上（$\\angle AOP=180^\\circ-\\alpha$）两类。每一类都是“已知 $\\angle AOP=\\theta$，找等腰三角形”。',
        '按哪两个角相等分三种：$OA=OP$，$\\angle OAP=\\frac{180^\\circ-\\theta}2$，总有一个点；$PA=PO$，$\\angle OAP=\\theta$；$AO=AP$，$\\angle OPA=\\theta$，$\\angle OAP=180^\\circ-2\\theta$。后两种要三角形里放得下两个 $\\theta$，即 $\\theta<90^\\circ$。',
        '$P$ 由射线 $AP$ 的方向（$\\angle OAP$）确定。三个 $\\angle OAP$ 两两相等都推出 $\\theta=60^\\circ$，这时三种情况是同一个点。所以每一类的点数：$\\theta<90^\\circ$ 且 $\\theta\\neq60^\\circ$ 时 $3$ 个；$\\theta=60^\\circ$ 时 $1$ 个；$\\theta\\geq90^\\circ$ 时 $1$ 个。',
        '(1) $\\alpha=50^\\circ$：射线 $ON$ 上 $\\theta=50^\\circ$，$3$ 个；反向延长线上 $\\theta=130^\\circ$，$1$ 个。共 $4$ 个。',
        '(2) 两类的 $\\theta$ 是 $\\alpha$ 和 $180^\\circ-\\alpha$。$\\alpha<90^\\circ$ 时，另一类是钝角，有 $1$ 个，本类 $\\alpha\\neq60^\\circ$ 有 $3$ 个、$\\alpha=60^\\circ$ 只有 $1$ 个，总数 $4$ 或 $2$；$\\alpha=90^\\circ$ 时两类各 $1$ 个，共 $2$ 个；$\\alpha>90^\\circ$ 与前面对称，$\\alpha=120^\\circ$ 时 $2$ 个，其余 $4$ 个。所以 $\\alpha=60^\\circ$、$90^\\circ$ 或 $120^\\circ$。',
        '思路：先把“直线上的点”分成两条射线，再在每条射线上按“哪两个角相等”分类；难点是发现三种情况会在 $60^\\circ$ 时重合，以及直角、钝角时只剩一种。',
      ],
      verify: () => {
        // O 为原点，ON 沿 x 轴，OA=1；直接解出直线 ON 上使两边相等的点
        const count = al => {
          const r = (al * Math.PI) / 180, A = [Math.cos(r), Math.sin(r)], xs = [1, -1, 2 * Math.cos(r)];
          if (Math.abs(Math.cos(r)) > 1e-12) xs.push(1 / (2 * Math.cos(r)));
          const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]), O = [0, 0], got = new Set();
          for (const x of xs) {
            if (Math.abs(x) < 1e-9) continue;
            const P = [x, 0], oa = d(O, A), op = d(O, P), ap = d(A, P);
            if (Math.abs(oa - op) < 1e-9 || Math.abs(oa - ap) < 1e-9 || Math.abs(op - ap) < 1e-9) got.add(Math.round(x * 1e6));
          }
          return got.size;
        };
        const two = [];
        for (let al = 1; al < 180; al++) if (count(al) === 2) two.push(al);
        return [count(50), two];
      },
    },
    {
      id: '18.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC$，$\\angle B=\\alpha$（$0^\\circ<\\alpha<60^\\circ$），点 $D$、$E$ 在边 $BC$ 上，$BD=BA$，$CE=CA$。图中以 $A$ 为顶点、另两个顶点在 $B$、$E$、$D$、$C$ 中的三角形共有 $6$ 个。(1) 当 $\\alpha=50^\\circ$ 时，求 $\\angle DAE$ 的度数，并数一数这 $6$ 个三角形中有几个等腰三角形；(2) 若这 $6$ 个三角形都是等腰三角形，求 $\\alpha$。',
      figure: FIG182.c03,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle DAE=$', answer: '50°' },
        { kind: 'num', label: '等腰三角形', answer: '4', suffix: '个' },
        { kind: 'angle', label: '(2) $\\alpha=$', answer: '36°' },
      ],
      explain: [
        '先一般地算。$BD=BA$：$\\angle BAD=\\angle BDA=\\frac{180^\\circ-\\alpha}2=90^\\circ-\\frac\\alpha2$；同理 $\\angle CAE=\\angle CEA=90^\\circ-\\frac\\alpha2$。$\\angle BAC=180^\\circ-2\\alpha$。',
        '$\\angle BAD+\\angle CAE=180^\\circ-\\alpha>\\angle BAC$，说明两个角有重叠，重叠部分就是 $\\angle DAE$（图中 $E$ 在 $B$、$D$ 之间）：$\\angle DAE=(180^\\circ-\\alpha)-(180^\\circ-2\\alpha)=\\alpha$。',
        '逐个看 $6$ 个三角形：$\\triangle ABC$、$\\triangle ABD$、$\\triangle ACE$ 一定等腰；$\\triangle ADE$ 中 $\\angle ADE=\\angle AED=90^\\circ-\\frac\\alpha2$，也一定等腰。$\\triangle ABE$ 的三个角是 $\\alpha$、$\\angle AEB=180^\\circ-\\angle AEC=90^\\circ+\\frac\\alpha2$、$\\angle BAE=90^\\circ-\\frac{3\\alpha}2$；$\\triangle ACD$ 与它对称。',
        '(1) $\\alpha=50^\\circ$：$\\angle DAE=50^\\circ$；$\\triangle ABE$ 的角是 $50^\\circ$、$115^\\circ$、$15^\\circ$，不等腰，所以共 $4$ 个等腰三角形。',
        '(2) $\\triangle ABE$ 等腰：$90^\\circ+\\frac\\alpha2$ 是钝角，只能 $\\alpha=90^\\circ-\\frac{3\\alpha}2$，$\\alpha=36^\\circ$（这时 $\\triangle ACD$ 也等腰）。所以 $\\alpha=36^\\circ$，这时 $6$ 个三角形全是等腰三角形。',
        '思路：先用 $\\alpha$ 表示所有的角（由“两个角之和超过 $\\angle BAC$”发现重叠），再把 $6$ 个三角形分成“总是等腰”和“要看 $\\alpha$”两类，对后一类按“哪两个角相等”分类，钝角只能是顶角。',
      ],
      verify: () => {
        // 数值核对：画出三角形，用边长判断 6 个三角形是否等腰
        const rad = d => (d * Math.PI) / 180, dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const fig = al => {
          const B = [0, 0], C = [2 * Math.cos(rad(al)), 0], A = [Math.cos(rad(al)), Math.sin(rad(al))];
          const Dp = [1, 0], Ep = [C[0] - 1, 0];  // BD=BA=1，CE=CA=1
          const P = { A, B, C, D: Dp, E: Ep }, tris = ['BC', 'BD', 'BE', 'DE', 'DC', 'EC'];
          const cnt = tris.filter(t => { const s = [dist(A, P[t[0]]), dist(A, P[t[1]]), dist(P[t[0]], P[t[1]])]; return Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9; }).length;
          const u = [Dp[0] - A[0], Dp[1] - A[1]], v = [Ep[0] - A[0], Ep[1] - A[1]];
          const dae = Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180 / Math.PI;
          return { cnt, dae };
        };
        const all6 = [];
        for (let k = 1; k < 120; k++) if (fig(k / 2).cnt === 6) all6.push(k / 2);
        const f50 = fig(50);
        return [Math.round(f50.dae * 1e6) / 1e6 + '°', f50.cnt, all6.length === 1 ? all6[0] + '°' : null];
      },
    },
    {
      id: '18.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=4$，设 $AC=x$。(1) 若 $\\angle ABC=2\\angle ACB$，求 $x$ 的取值范围；(2) 若 $\\angle ACB=2\\angle ABC$，求 $x$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '(1)', answer: '4<x<8' },
        { kind: 'ineq', label: '(2)', answer: '2<x<4' },
      ],
      explain: [
        '(1) 思路：“2 倍角”用延长线段造等腰。延长 $CB$ 到 $E$，使 $BE=BA=4$，连接 $AE$。$\\angle ABC$ 是 $\\triangle ABE$ 的外角，$\\angle ABC=\\angle E+\\angle BAE=2\\angle E$（$BE=BA$，等边对等角），所以 $\\angle E=\\angle ACB$，$AE=AC=x$（等角对等边）。',
        '在 $\\triangle ABE$ 中，$AE<AB+BE=8$，所以 $x<8$。又 $\\angle ABC>\\angle ACB$，大角对大边，$AC>AB$，$x>4$。所以 $4<x<8$。',
        '(2) 延长 $BC$ 到 $F$，使 $CF=CA=x$，连接 $AF$。同理 $\\angle ACB=2\\angle F$，$\\angle F=\\angle ABC$，$AF=AB=4$。在 $\\triangle ACF$ 中，$AF<AC+CF=2x$，$x>2$；又 $\\angle ACB>\\angle ABC$，$AB>AC$，$x<4$。所以 $2<x<4$。',
        '两个范围都取得满：以 (1) 为例，$\\angle ACB$ 可以是 $0^\\circ$ 到 $60^\\circ$ 之间的任意角，$\\angle ACB$ 越小，$\\triangle ABE$ 越扁，$AE$ 越接近 $8$；$\\angle ACB$ 越接近 $60^\\circ$，$AC$ 越接近 $AB$。',
        '思路：2 倍角关系通过延长线段转成两个等腰三角形，把 $AC$ “搬”到 $\\triangle ABE$ 里，三边关系给出一侧的界，大角对大边给出另一侧的界。两问的不同在于哪一侧用哪个结论。',
      ],
      verify: () => {
        // 扫描较小的那个角 t（0°<t<60°），由正弦定理算 AC（只用于核对范围）
        const sin = d => Math.sin((d * Math.PI) / 180);
        const r1 = [], r2 = [];
        for (let k = 1; k < 6000; k++) { const t = k / 100; r1.push(4 * sin(2 * t) / sin(t)); r2.push(4 * sin(t) / sin(2 * t)); }
        const near = (v, w) => Math.abs(v - w) < 0.01;
        const ok1 = near(Math.min(...r1), 4) && near(Math.max(...r1), 8) && r1.every(v => v > 4 && v < 8);
        const ok2 = near(Math.min(...r2), 2) && near(Math.max(...r2), 4) && r2.every(v => v > 2 && v < 4);
        return [ok1 ? '4<x<8' : null, ok2 ? '2<x<4' : null];
      },
    },
    {
      id: '18.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle BAC=30^\\circ$。(1) 点 $D$ 在 $BC$ 的延长线上（$C$ 在 $B$、$D$ 之间），且 $\\triangle ACD$ 与 $\\triangle ABD$ 都是等腰三角形，求 $\\angle B$ 的所有可能值（全部填出，用逗号隔开）；(2) 若点 $D$ 可以在直线 $BC$ 上线段 $BC$ 以外的任何位置，其余条件不变，$\\angle B$ 共有几种可能的值？',
      blanks: [
        { kind: 'nums', label: '(1) $\\angle B=$', answer: ['20', '40', '50', '70'], suffix: '°' },
        { kind: 'num', label: '(2)', answer: '8', suffix: '种' },
      ],
      explain: [
        '(1) 设 $\\angle B=b$，则 $\\angle ACB=150^\\circ-b$，外角 $\\angle ACD=30^\\circ+b$。先让小三角形 $\\triangle ACD$ 等腰，按哪两个角相等分三种，再看大三角形 $\\triangle ABD$（它的三个角是 $\\angle BAD=30^\\circ+\\angle CAD$、$b$、$\\angle D$）。',
        '① $\\angle CAD=\\angle D=\\frac{180^\\circ-(30^\\circ+b)}2=75^\\circ-\\frac b2$：$\\triangle ABD$ 的角为 $105^\\circ-\\frac b2$、$b$、$75^\\circ-\\frac b2$。$b=75^\\circ-\\frac b2$ 得 $b=50^\\circ$；$b=105^\\circ-\\frac b2$ 得 $b=70^\\circ$；另两个角不可能相等。',
        '② $\\angle ACD=\\angle D=30^\\circ+b$（要求它是锐角，$b<60^\\circ$）：$\\angle CAD=120^\\circ-2b$，$\\triangle ABD$ 的角为 $150^\\circ-2b$、$b$、$30^\\circ+b$。$b=150^\\circ-2b$ 得 $b=50^\\circ$；$150^\\circ-2b=30^\\circ+b$ 得 $b=40^\\circ$。',
        '③ $\\angle ACD=\\angle CAD=30^\\circ+b$（$b<60^\\circ$）：$\\angle D=120^\\circ-2b$，$\\triangle ABD$ 的角为 $60^\\circ+b$、$b$、$120^\\circ-2b$。$b=120^\\circ-2b$ 得 $b=40^\\circ$；$60^\\circ+b=120^\\circ-2b$ 得 $b=20^\\circ$。合起来 $\\angle B=20^\\circ$、$40^\\circ$、$50^\\circ$ 或 $70^\\circ$（各情况的角都为正，由等角对等边两个三角形确实等腰）。',
        '(2) $D$ 在 $B$ 的外侧时，把 $B$、$C$ 的名字对调就是 (1) 的情形，所以 $\\angle ACB$ 可以是 $20^\\circ$、$40^\\circ$、$50^\\circ$、$70^\\circ$，对应 $\\angle B=130^\\circ$、$110^\\circ$、$100^\\circ$、$80^\\circ$，与 (1) 的四个值都不同，共 $8$ 种。',
        '思路：两个三角形套在一起，公共的 $\\angle D$ 和外角 $\\angle ACD$ 把它们连起来；先对小三角形分类，再对大三角形分类，注意等腰三角形的钝角只能是顶角。(2) 不必重算，用对称（对调 $B$、$C$）就能得到另一侧的答案。',
      ],
      verify: () => {
        const iso = t => t.every(x => x > 1e-9) && (Math.abs(t[0] - t[1]) < 1e-9 || Math.abs(t[1] - t[2]) < 1e-9 || Math.abs(t[0] - t[2]) < 1e-9);
        const sideC = new Set(), all = new Set();
        for (let b2 = 1; b2 < 300; b2++) {
          const b = b2 / 2, c = 150 - b;
          for (let d2 = 1; d2 < 360; d2++) {
            const d = d2 / 2;
            const cad = c - d;  // D 在 C 外侧：∠CAD = 180° − ∠ACD − ∠D
            if (cad > 0 && iso([cad, 180 - c, d]) && iso([30 + cad, b, d])) { sideC.add(b); all.add(b); }
            const bad = b - d;  // D 在 B 外侧
            if (bad > 0 && iso([bad, 180 - b, d]) && iso([30 + bad, c, d])) all.add(b);
          }
        }
        return [[...sideC].sort((p, q) => p - q), all.size];
      },
    },
  ],
});
