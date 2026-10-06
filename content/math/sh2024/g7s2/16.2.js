'use strict';

// 上海数学七年级下册 · 16.2 平行线
// 知识范围：平行线的定义（同一平面上不相交的两条直线）、画平行线；平行公理（过直线外一点有且只有一条直线与已知直线平行）；
//   平行的传递性（用反证法证明）；同位角、内错角、同旁内角；判定：同位角相等两直线平行（公理）、内错角相等两直线平行、
//   同旁内角互补两直线平行；性质：两直线平行，同位角相等、内错角相等、同旁内角互补
// 可以使用：16.1（对顶角、垂直、垂线公理）；六年级全部（角的和差、余角补角、角平分线、方程）；七年级上册（翻折、旋转）；第 15 章
// 还没学：三角形内角和（17.2，本节不能用“三角形内角和为 180°”）；全等三角形；平行线间的距离
// 本节约定：图形都在同一平面上；三角尺的角（30°、45°、60°、90°）可以直接用

const SVG162 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  P: ([x, y], d, r) => [x + r * Math.cos((d * Math.PI) / 180), y - r * Math.sin((d * Math.PI) / 180)],
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#2b2b2b"/>`,
  // 过点 p、方向 d 的直线（两边各伸出 r），可在一端标字母
  line: (p, d, r, t, r2 = r) => SVG162.seg(SVG162.P(p, d, r), SVG162.P(p, d + 180, r2)) + (t ? SVG162.text(t, SVG162.P(p, d, r + 10), 0, -2) : ''),
  // 在点 p 处、方向 d 上距离 r 写角的编号
  num: (p, d, t, r = 16) => SVG162.text(t, SVG162.P(p, d, r), 0, -1, 13),
};

const FIG162 = (() => {
  const S = SVG162, out = {};
  // 标准图：a、b 被 l 所截，∠1～∠4 在上交点（右上、左上、左下、右下），∠5～∠8 在下交点
  {
    const P1 = [160, 55], L = 70, P2 = S.P(P1, L + 180, 96);
    const nums = (p, k) => [35, 125, 215, 305].map((d, i) => S.num(p, d, String(k + i))).join('');
    out.std = S.wrap(300, 200, S.line(P1, 0, 130, '', 140) + S.text('a', [P1[0] + 122, P1[1]], 0, -14) + S.line(P2, 0, 160, '', 110) + S.text('b', [P2[0] + 152, P2[1]], 0, -14) + S.seg(S.P(P1, L, 45), S.P(P2, L + 180, 45))
      + S.text('l', S.P(P2, L + 180, 52), 8, 0) + nums(P1, 1) + nums(P2, 5));
  }
  // b06：AB∥CD，E 在 AB 上，F 在 CD 上，FG 平分 ∠EFD 交 AB 于 G
  {
    const E = [160, 60], Fp = [84.5, 150], G = [277.5, 60];
    out.b06 = S.wrap(340, 175, S.seg([10, 60], [325, 60]) + S.seg([10, 150], [325, 150]) + S.seg(S.P(E, 50, 20), S.P(Fp, 230, 20)) + S.seg(Fp, G)
      + S.text('A', [10, 60], -2, -14) + S.text('B', [325, 60], 2, -14) + S.text('C', [10, 150], -2, 14) + S.text('D', [325, 150], 2, 14)
      + S.text('E', E, 4, -14) + S.text('F', Fp, -4, 14) + S.text('G', G, 0, -14));
  }
  // b07：梯形 ABCD，AD∥BC
  {
    const A = [80, 40], D = [220, 40], B = [30, 160], C = [280, 160];
    out.b07 = S.wrap(310, 185, `<polygon points="${[A, D, C, B].map(p => p.join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('A', A, -6, -14) + S.text('D', D, 6, -14) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8));
  }
  // b08：四边形 ABCD 与对角线 AC，∠1=∠BAC，∠2=∠DCA
  {
    const A = [40, 40], B = [240, 40], C = [270, 160], D = [70, 160];
    out.b08 = S.wrap(310, 190, `<polygon points="${[A, B, C, D].map(p => p.join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>` + S.seg(A, C)
      + S.text('A', A, -8, -12) + S.text('B', B, 8, -12) + S.text('C', C, 10, 8) + S.text('D', D, -10, 8)
      + S.num(A, -12, '1', 34) + S.num(C, 168, '2', 34));
  }
  // e01：铅笔型，AB∥CD，E 在两线之间、B 和 D 的右侧
  {
    const A = [20, 40], B = [200, 40], C = [20, 180], D = [200, 180], E = [248, 97];
    out.e01 = S.wrap(290, 205, S.seg(A, B) + S.seg(C, D) + S.seg(B, E) + S.seg(D, E)
      + S.text('A', A, -10, 0) + S.text('B', B, 0, -14) + S.text('C', C, -10, 0) + S.text('D', D, 0, 14) + S.text('E', E, 12, 0));
  }
  // e03：AB∥CD，EG、FG 分别平分 ∠BEF、∠EFD
  {
    const E = [200, 50], Fp = [156.3, 170], G = [242, 110];
    out.e03 = S.wrap(300, 195, S.seg([20, 50], [290, 50]) + S.seg([20, 170], [290, 170]) + S.seg(S.P(E, 70, 18), S.P(Fp, 250, 18)) + S.seg(E, G) + S.seg(Fp, G)
      + S.text('A', [20, 50], -4, -14) + S.text('B', [290, 50], 0, -14) + S.text('C', [20, 170], -4, 14) + S.text('D', [290, 170], 0, 14)
      + S.text('E', E, -2, -14) + S.text('F', Fp, -4, 14) + S.text('G', G, 12, 0));
  }
  // e04：a、b 被 l1、l2 所截
  {
    const T1 = [90, 50], B1 = [135, 170], T2 = [225, 50], B2 = [195, 170];
    const d1 = (Math.atan2(-(B1[1] - T1[1]), B1[0] - T1[0]) * 180) / Math.PI + 180;  // l1 向上的方向
    const d2 = (Math.atan2(-(B2[1] - T2[1]), B2[0] - T2[0]) * 180) / Math.PI + 180;
    out.e04 = S.wrap(300, 210, S.line(T1, 0, 195, '', 80) + S.text('a', [282, 50], 0, -12) + S.line(B1, 0, 155, '', 115) + S.text('b', [282, 170], 0, -12)
      + S.seg(S.P(T1, d1, 25), S.P(B1, d1 + 180, 25)) + S.text('l₁', S.P(B1, d1 + 180, 32), 8, 0)
      + S.seg(S.P(T2, d2, 25), S.P(B2, d2 + 180, 25)) + S.text('l₂', S.P(B2, d2 + 180, 32), 8, 0)
      + S.num(T1, (d1 + 180 + 360) / 2, '3', 18) + S.num(B1, (d1 + 180) / 2, '4', 18) + S.num(B1, d1 / 2, '5', 18)
      + S.num(T2, (d2 + 180 + 360) / 2, '1', 18) + S.num(B2, d2 / 2, '2', 18));
  }
  // e06：四边形 ABCD 与对角线 BD，∠1=∠ABD，∠2=∠CDB，∠3=∠ADB，∠4=∠CBD
  {
    const A = [70, 40], B = [30, 160], C = [250, 160], D = [270, 40];
    out.e06 = S.wrap(310, 190, `<polygon points="${[A, B, C, D].map(p => p.join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>` + S.seg(B, D)
      + S.text('A', A, -6, -14) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8) + S.text('D', D, 8, -12)
      + S.num(B, 52, '1', 36) + S.num(D, 234, '2', 34) + S.num(D, 194, '3', 40) + S.num(B, 14, '4', 42));
  }
  // c01：M 型，AB∥CD，E 在两线之间、B 和 D 的左侧；BF、DF 分别平分 ∠ABE、∠CDE
  {
    const A = [20, 40], B = [270, 40], C = [20, 190], D = [270, 190], E = [150, 115], Fp = [210, 115];
    out.c01 = S.wrap(300, 215, S.seg(A, B) + S.seg(C, D) + S.seg(B, E) + S.seg(D, E) + S.seg(B, Fp, true) + S.seg(D, Fp, true)
      + S.text('A', A, -10, 0) + S.text('B', B, 0, -14) + S.text('C', C, -10, 0) + S.text('D', D, 0, 14) + S.text('E', E, -12, 0) + S.text('F₁', Fp, -2, 0));
  }
  // c04：两条平行线 PQ、MN，灯 A 在 PQ 上，灯 B 在 MN 上
  {
    const A = [170, 45], B = [120, 165];
    out.c04 = S.wrap(300, 200, S.seg([20, 45], [280, 45]) + S.seg([20, 165], [280, 165]) + S.dot(A) + S.dot(B)
      + S.seg(A, S.P(A, -40, 70), true) + S.seg(B, S.P(B, 150, 70), true)
      + S.text('P', [20, 45], -4, -14) + S.text('Q', [280, 45], 0, -14) + S.text('M', [20, 165], -4, 14) + S.text('N', [280, 165], 0, 14)
      + S.text('A', A, 0, -14) + S.text('B', B, 0, 14));
  }
  // c05：三角尺 ABC（∠BAC=90°，∠B=60°，∠C=30°）与 ADE（∠DAE=90°，∠D=∠E=45°）共顶点 A，ADE 旋转到某个位置
  {
    const A = [120, 170];
    const B = S.P(A, 0, 80), C = S.P(A, 90, 80 * Math.sqrt(3));
    const al = 15, D = S.P(A, al, 120), E = S.P(A, al + 90, 120);
    out.c05 = S.wrap(300, 200, `<polygon points="${[A, B, C].map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#cfe3f7" fill-opacity="0.6" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<polygon points="${[A, D, E].map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#f6d8b8" fill-opacity="0.5" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('A', A, -10, 6) + S.text('B', B, 10, 6) + S.text('C', C, -10, -6) + S.text('D', D, 10, 0) + S.text('E', E, -10, 0));
  }
  return out;
})();

// verify 用：两条射线（方向，度）所成的角（0～180），以及两条直线方向是否平行
const between162 = (d1, d2) => {
  const x = (((d1 - d2) % 360) + 360) % 360;
  return x > 180 ? 360 - x : x;
};
const parallel162 = (d1, d2) => { const x = (((d1 - d2) % 180) + 180) % 180; return x < 1e-9 || 180 - x < 1e-9; };
// 直线 p1 + s·(方向 d1) 与 p2 + u·(方向 d2) 的交点参数 [s, u]（数学坐标）
const meet162 = (p1, d1, p2, d2) => {
  const r = d => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)];
  const [a, b] = r(d1), [c, e] = r(d2);
  const det = a * -e - -c * b;
  const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
  return [(dx * -e - -c * dy) / det, (a * dy - b * dx) / det];
};

Content.section({
  id: 'math/sh2024/g7s2/16.2',
  title: '平行线',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“三线八角”配 parallelAngles 动画。第 1 轮 e04 配图的角与数据对调，c05 配图正好画在一个答案位置，卡片 1、卡片 3 的例子泄露 b09、b02，c01（等比迭代）与 c02（无平行的同位角计数）只有 4 级，c03 无筛选环节；第 2 轮重标 e04、c05 改画 α=15°，卡片换例子，c01 加铅笔型（交点跳到另一侧），c02 改为含平行线的计数，c03 加 ∠β=∠γ+40° 筛选，e02 加角平分线后判定整节通过。可选意见：扩展档仍缺真 5 级题；“平行线 + 角平分线 + 拐点”类题偏多' },

  intro: [
    {
      title: '平行线与平行公理',
      body: '同一平面上**不相交**的两条直线叫作平行线，记作 $a\\parallel b$。**平行公理**：经过直线外一点，有且只有一条直线与该直线平行。由它推出**平行的传递性**：两条直线都和第三条直线平行，那么这两条直线也平行。',
      example: '$a\\parallel c$，$b\\parallel c$，所以 $a\\parallel b$。这条定理要用反证法证明：先假设结论不成立，推出与平行公理矛盾的结果。',
    },
    {
      title: '同位角、内错角、同旁内角',
      body: '两条直线被第三条直线（截线）所截，形成八个角。在两条直线的同一侧、截线同侧的一对角叫**同位角**；在两条直线之间、截线两旁的叫**内错角**；在两条直线之间、截线同旁的叫**同旁内角**。点按钮看看各是哪一对。',
      example: '“F”形里找同位角，“Z”形里找内错角，“U”形里找同旁内角。',
      demo: { type: 'parallelAngles', start: 20 },
    },
    {
      title: '平行线的判定',
      body: '直线无限长，看不出是否相交，所以借助截线上的角来判断。**公理**：同位角相等，两直线平行。由它可以证明两条**定理**：内错角相等，两直线平行；同旁内角互补，两直线平行。',
      example: '直线 $a$、$b$ 被 $l$ 所截，同位角都是 $72^\\circ$，所以 $a\\parallel b$（同位角相等，两直线平行）。',
    },
    {
      title: '平行线的性质',
      body: '反过来，两直线平行时：同位角相等，内错角相等，同旁内角互补。**判定**是由角的关系得到平行，**性质**是由平行得到角的关系，写推理依据时不要用反。',
      example: '$a\\parallel b$，一对内错角中有一个是 $65^\\circ$，另一个也是 $65^\\circ$（两直线平行，内错角相等）。',
      pitfall: '只有两条直线平行时，同位角、内错角才相等；不平行时它们一般不相等。',
    },
    {
      title: '拐点处添平行线',
      body: '两条平行线之间有一个“拐角”时，常过拐点作一条与它们平行的直线（平行公理保证可以作，传递性保证它和两条直线都平行），把拐角分成两部分，分别用平行线的性质。',
      example: '$AB\\parallel CD$，过拐点 $E$ 作 $EM\\parallel AB$，则 $EM\\parallel CD$，拐角就拆成了两个可以求的角。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '16.2-b01',
      level: 'basic',
      type: 'fill',
      stem: '如图，直线 $a$、$b$ 被直线 $l$ 所截，判断下列各对角的关系。',
      figure: FIG162.std,
      blanks: [
        { kind: 'text', label: '(1) $\\angle1$ 与 $\\angle5$ 是', answer: '同位角', options: ['同位角', '内错角', '同旁内角', '都不是'] },
        { kind: 'text', label: '(2) $\\angle3$ 与 $\\angle5$ 是', answer: '内错角', options: ['同位角', '内错角', '同旁内角', '都不是'] },
        { kind: 'text', label: '(3) $\\angle4$ 与 $\\angle5$ 是', answer: '同旁内角', options: ['同位角', '内错角', '同旁内角', '都不是'] },
        { kind: 'text', label: '(4) $\\angle2$ 与 $\\angle8$ 是', answer: '都不是', options: ['同位角', '内错角', '同旁内角', '都不是'] },
      ],
      explain: [
        '(1) $\\angle1$、$\\angle5$ 都在各自交点的右上方：同在直线 $a$、$b$ 的上侧，截线 $l$ 的右侧，是同位角。',
        '(2) $\\angle3$ 在上交点的左下方，$\\angle5$ 在下交点的右上方：都在 $a$、$b$ 之间，分在 $l$ 两旁，是内错角。',
        '(3) $\\angle4$ 在上交点的右下方，$\\angle5$ 在下交点的右上方：都在 $a$、$b$ 之间，都在 $l$ 右侧，是同旁内角。',
        '(4) $\\angle2$ 在上交点左上方（在 $a$、$b$ 外侧），$\\angle8$ 在下交点右下方（也在外侧），分在 $l$ 两旁，不是这三种中的任何一种。坑：看到“交错”就以为是内错角，内错角必须在两条直线**之间**。',
      ],
    },
    {
      id: '16.2-b02',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的是（　　）',
      options: ['过一点有且只有一条直线与已知直线平行', '同位角相等', '在同一平面上，垂直于同一条直线的两条直线互相平行', '两条直线被第三条直线所截，内错角相等'],
      answer: 2,
      explain: [
        'A：平行公理说的是“过直线**外**一点”；点在直线上时，过它的直线都和已知直线相交或重合，错误。',
        'B、D：只有两条直线平行时，同位角、内错角才相等，错误。',
        'C：两条直线都垂直于第三条直线，它们与第三条直线所成的同位角都是 $90^\\circ$，由“同位角相等，两直线平行”，正确。选 C。',
        '坑：B、D 漏掉了“两直线平行”这个前提。',
      ],
    },
    {
      id: '16.2-b03',
      level: 'basic',
      type: 'choice',
      stem: '如图，直线 $a$、$b$ 被直线 $l$ 所截。下列条件中，能判定 $a\\parallel b$ 的是（　　）',
      figure: FIG162.std,
      options: ['$\\angle1=\\angle3$', '$\\angle2=\\angle5$', '$\\angle3=\\angle5$', '$\\angle4+\\angle6=180^\\circ$'],
      answer: 2,
      explain: [
        'A：$\\angle1$ 与 $\\angle3$ 是对顶角，不论 $a$、$b$ 是否平行都相等，不能判定。',
        'B：$\\angle2$（上交点左上）与 $\\angle5$（下交点右上）不是同位角、内错角或同旁内角，不能判定。',
        'C：$\\angle3$ 与 $\\angle5$ 是内错角，内错角相等，两直线平行，能判定。选 C。',
        'D：$\\angle4=180^\\circ-\\angle3$，所以 $\\angle4+\\angle6=180^\\circ$ 就是 $\\angle6=\\angle3$。而 $\\angle3$ 与 $\\angle6$ 是同旁内角，平行时它们互补，不是相等，不能判定（除非都是 $90^\\circ$）。坑：A 永远成立，选它等于什么也没用上。',
      ],
    },
    {
      id: '16.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，$a\\parallel b$，$\\angle1=58^\\circ$。求 $\\angle8$ 的度数。',
      figure: FIG162.std,
      blanks: [
        { kind: 'angle', label: '$\\angle8=$', answer: '122°' },
      ],
      explain: [
        '$\\angle1$ 与 $\\angle4$ 是邻补角：$\\angle4=180^\\circ-58^\\circ=122^\\circ$。',
        '∵ $a\\parallel b$，∴ $\\angle8=\\angle4=122^\\circ$（两直线平行，同位角相等）。',
        '也可以：$\\angle5=\\angle1=58^\\circ$（同位角），$\\angle8=180^\\circ-\\angle5=122^\\circ$。坑：$\\angle8$ 和 $\\angle1$ 不是同位角，直接答 $58^\\circ$ 是错的。',
      ],
      verify: () => {
        // l 向上的方向取 58°，使 ∠1（a 向右与 l 向上之间）=58°；a∥b 时下交点处 b 向右也是 0°，∠8 在 b 向右与 l 向下（238°）之间
        const L = 58;
        return between162(0, L) === 58 ? between162(0, L + 180) : null;
      },
    },
    {
      id: '16.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '在同一平面上，直线 $a$、$b$、$c$、$d$ 满足 $a\\perp b$，$b\\perp c$，$c\\perp d$。判断直线 $a$ 与 $d$ 的位置关系。',
      blanks: [
        { kind: 'text', label: '$a$ 与 $d$', answer: '垂直', options: ['平行', '垂直', '不能确定'] },
      ],
      explain: [
        '$a\\perp b$，$c\\perp b$：垂直于同一条直线的两条直线平行，$a\\parallel c$。',
        '$a\\parallel c$，$c\\perp d$：$d$ 与 $c$ 的夹角是 $90^\\circ$，由“两直线平行，同位角相等”，$d$ 与 $a$ 所成的同位角也是 $90^\\circ$，所以 $a\\perp d$。',
        '坑：看到三个“垂直”就以为“垂直再垂直是平行”，推一次平行、再推一次垂直，要一步一步来。',
      ],
      verify: () => {
        // 用方向表示：a=0°，b=90°，c 与 b 垂直，d 与 c 垂直
        const a = 0, b = a + 90, c = b + 90, d = c + 90;
        return parallel162(a, d) ? '平行' : parallel162(a + 90, d) ? '垂直' : '不能确定';
      },
    },
    {
      id: '16.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，$AB\\parallel CD$，点 $E$ 在 $AB$ 上，点 $F$ 在 $CD$ 上，$\\angle AEF=50^\\circ$，$FG$ 平分 $\\angle EFD$，交 $AB$ 于点 $G$。求 $\\angle EGF$ 的度数。',
      figure: FIG162.b06,
      blanks: [
        { kind: 'angle', label: '$\\angle EGF=$', answer: '25°' },
      ],
      explain: [
        '∵ $AB\\parallel CD$，∴ $\\angle EFD=\\angle AEF=50^\\circ$（两直线平行，内错角相等）。',
        '∵ $FG$ 平分 $\\angle EFD$，∴ $\\angle GFD=25^\\circ$。',
        '∵ $AB\\parallel CD$，∴ $\\angle EGF=\\angle GFD=25^\\circ$（两直线平行，内错角相等）。',
        '坑：直接把 $\\angle EGF$ 当成 $50^\\circ$；它和 $\\angle GFD$（不是 $\\angle EFD$）是内错角。',
      ],
      verify: () => {
        const efd = 50, gfd = efd / 2;
        return gfd;
      },
    },
    {
      id: '16.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，在四边形 $ABCD$ 中，$AD\\parallel BC$，$\\angle A=2\\angle B$。求 $\\angle B$ 的度数。',
      figure: FIG162.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle B=$', answer: '60°' },
      ],
      explain: [
        '$\\angle A$、$\\angle B$ 是直线 $AD$、$BC$ 被直线 $AB$ 所截得到的同旁内角。',
        '∵ $AD\\parallel BC$，∴ $\\angle A+\\angle B=180^\\circ$（两直线平行，同旁内角互补）。',
        '$2\\angle B+\\angle B=180^\\circ$，$\\angle B=60^\\circ$。坑：误以为 $\\angle A$、$\\angle B$ 相等，或把截线看成 $BC$。',
      ],
      verify: () => 180 / 3,
    },
    {
      id: '16.2-b08',
      level: 'basic',
      type: 'choice',
      stem: '如图，在四边形 $ABCD$ 中，连接 $AC$，$\\angle1=\\angle BAC$，$\\angle2=\\angle DCA$。由 $\\angle1=\\angle2$ 可以推出的结论及依据是（　　）',
      figure: FIG162.b08,
      options: ['$AB\\parallel CD$（内错角相等，两直线平行）', '$AD\\parallel BC$（内错角相等，两直线平行）', '$AB\\parallel CD$（两直线平行，内错角相等）', '$AD\\parallel BC$（同位角相等，两直线平行）'],
      answer: 0,
      explain: [
        '$\\angle BAC$ 与 $\\angle DCA$ 的边是 $AB$、$CD$ 和截线 $AC$：它们是直线 $AB$、$CD$ 被 $AC$ 所截的内错角。',
        '由角相等推出平行，用判定定理：内错角相等，两直线平行，得 $AB\\parallel CD$。选 A。',
        '坑：B 把被截的两条直线找错了；C 把判定写成了性质（“两直线平行，内错角相等”是由平行推角）。',
      ],
    },
    {
      id: '16.2-b09',
      level: 'basic',
      type: 'choice',
      stem: '用反证法证明“在同一平面上，如果 $a\\perp c$，$b\\perp c$，那么 $a\\parallel b$”，第一步应假设（　　）',
      options: ['$a\\perp b$', '$a$ 与 $b$ 相交', '$a\\parallel c$', '$a$ 与 $c$ 不垂直'],
      answer: 1,
      explain: [
        '反证法的第一步是假设**要证明的结论**不成立。结论是 $a\\parallel b$。',
        '同一平面上两条直线不平行就相交，所以假设“$a$ 与 $b$ 相交”。选 B。',
        '坑：D 否定的是条件，不是结论；A 只是相交的一种特殊情况，不是结论的反面。',
      ],
    },

    // ---------- 扩展 ----------
    {
      id: '16.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，$AB\\parallel CD$，点 $E$ 在两条直线之间，$\\angle ABE=130^\\circ$，$\\angle CDE=120^\\circ$。求 $\\angle BED$ 的度数。',
      figure: FIG162.e01,
      blanks: [
        { kind: 'angle', label: '$\\angle BED=$', answer: '110°' },
      ],
      explain: [
        '过点 $E$ 作 $EM\\parallel AB$（$M$ 在 $E$ 的左侧）。∵ $AB\\parallel CD$，∴ $EM\\parallel CD$（平行的传递性）。',
        '∵ $EM\\parallel AB$，∴ $\\angle ABE+\\angle BEM=180^\\circ$（两直线平行，同旁内角互补），$\\angle BEM=50^\\circ$。',
        '同理 $\\angle CDE+\\angle DEM=180^\\circ$，$\\angle DEM=60^\\circ$。',
        '$\\angle BED=\\angle BEM+\\angle DEM=110^\\circ$。也可以记成 $\\angle ABE+\\angle BED+\\angle CDE=360^\\circ$。转弯：拐点处添平行线，把拐角拆成两个同旁内角的补角。',
      ],
      verify: () => {
        // B 在原点、D 在 (0,−140)；BE 方向 −50°（与 BA 成 130°），DE 方向 60°（与 DC 成 120°）
        const [s, u] = meet162([0, 0], -50, [0, -140], 60);
        return s > 0 && u > 0 ? between162(-50 + 180, 60 + 180) : null;
      },
    },
    {
      id: '16.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '$AB\\parallel CD$，点 $E$ 在直线 $AB$ 上，点 $F$ 在直线 $CD$ 上，射线 $EA$ 与射线 $FC$ 的方向相同。点 $P$ 不在直线 $AB$、$CD$ 上，$\\angle AEP=40^\\circ$，$\\angle CFP=70^\\circ$。$EM$ 平分 $\\angle AEP$，$FM$ 平分 $\\angle CFP$，$EM$、$FM$ 交于点 $M$。求 $\\angle EPF$ 和 $\\angle EMF$ 的度数（各自全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle EPF=$', answer: ['110', '30'], suffix: '°' },
        { kind: 'nums', label: '$\\angle EMF=$', answer: ['55', '15'], suffix: '°' },
      ],
      explain: [
        '没有图，按点 $P$ 的位置分类：在两条直线之间，在 $AB$ 上方，在 $CD$ 下方。不妨让 $AB$ 在上，$A$、$C$ 都在左侧。',
        '① $P$ 在两线之间：过 $P$ 作 $PN\\parallel AB$，则 $PN\\parallel CD$。$\\angle EPN=\\angle AEP=40^\\circ$，$\\angle FPN=\\angle CFP=70^\\circ$（内错角），$\\angle EPF=110^\\circ$。',
        '② $P$ 在 $AB$ 上方：$EP$、$FP$ 都朝左上方，$FP$ 穿过 $AB$。过 $P$ 作 $PN\\parallel AB$，$\\angle EPN=40^\\circ$，$\\angle FPN=70^\\circ$（内错角），这次两个角重叠，$\\angle EPF=70^\\circ-40^\\circ=30^\\circ$。',
        '③ $P$ 在 $CD$ 下方：$EP$ 朝左下方与 $EA$ 成 $40^\\circ$，$FP$ 朝左下方与 $FC$ 成 $70^\\circ$，$FP$ 比 $EP$ 陡，又从更低的位置出发，两条射线在 $CD$ 下方不会相交，不可能。',
        '再求 $\\angle EMF$：$\\angle AEM=20^\\circ$，$\\angle CFM=35^\\circ$，$M$ 的位置跟 $P$ 同类：$P$ 在两线之间时，$M$ 也在两线之间，$\\angle EMF=20^\\circ+35^\\circ=55^\\circ$；$P$ 在 $AB$ 上方时，$EM$、$FM$ 仍都朝左上方，且 $FM$ 更陡，$M$ 也在 $AB$ 上方，$\\angle EMF=35^\\circ-20^\\circ=15^\\circ$。',
        '所以 $\\angle EPF=110^\\circ$ 或 $30^\\circ$，$\\angle EMF=55^\\circ$ 或 $15^\\circ$，每种情况都正好是一半。转弯：在两线之间是“和”，在外侧是“差”；还要检验每种位置能否画出来，并判断 $M$ 落在哪个区域。',
      ],
      verify: () => {
        // E=(0,0)，F=(0,−5)，EA、FC 指向 180°。按 P 的位置求 ∠EPF，再求对应的 ∠EMF
        const res = [];
        for (const de of [140, 220]) for (const df of [110, 250]) {
          const [s, u] = meet162([0, 0], de, [0, -5], df);
          if (s <= 0 || u <= 0) continue;
          // 平分线：EM 与 EA 成 20°、FM 与 FC 成 35°，在 P 的同一侧（上半或下半）
          const dm = de < 180 ? 160 : 200, fm = df < 180 ? 145 : 215;
          const [s2, u2] = meet162([0, 0], dm, [0, -5], fm);
          if (s2 <= 0 || u2 <= 0) return null;
          res.push([Math.round(between162(de + 180, df + 180)), Math.round(between162(dm + 180, fm + 180))]);
        }
        return [res.map(r => r[0]), res.map(r => r[1])];
      },
    },
    {
      id: '16.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，$AB\\parallel CD$，直线 $EF$ 分别交 $AB$、$CD$ 于点 $E$、$F$，$EG$ 平分 $\\angle BEF$，$FG$ 平分 $\\angle EFD$，$\\angle AEF=70^\\circ$。求 $\\angle BEG$ 和 $\\angle EGF$ 的度数。',
      figure: FIG162.e03,
      blanks: [
        { kind: 'angle', label: '$\\angle BEG=$', answer: '55°' },
        { kind: 'angle', label: '$\\angle EGF=$', answer: '90°' },
      ],
      explain: [
        '$\\angle BEF=180^\\circ-70^\\circ=110^\\circ$，$EG$ 平分它，$\\angle BEG=55^\\circ$。',
        '∵ $AB\\parallel CD$，∴ $\\angle EFD=\\angle AEF=70^\\circ$（内错角），$FG$ 平分它，$\\angle GFD=35^\\circ$。',
        '过 $G$ 作 $GM\\parallel AB$，则 $GM\\parallel CD$。$\\angle EGM=\\angle BEG=55^\\circ$，$\\angle FGM=\\angle GFD=35^\\circ$（内错角），$\\angle EGF=90^\\circ$。',
        '其实不论 $\\angle AEF$ 是多少，$\\angle EGF=\\frac12(\\angle BEF+\\angle EFD)=\\frac12\\times180^\\circ=90^\\circ$（同旁内角互补的一半）。转弯：不能用三角形内角和，要过 $G$ 添平行线。',
      ],
      verify: () => {
        const bef = 180 - 70, efd = 70;
        return [bef / 2, bef / 2 + efd / 2];
      },
    },
    {
      id: '16.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $a$、$b$ 被直线 $l_1$、$l_2$ 所截，$\\angle1=104^\\circ$，$\\angle2=76^\\circ$，$\\angle3=(3x+10)^\\circ$，$\\angle4=(5x-30)^\\circ$。求 $x$ 的值和 $\\angle5$ 的度数。',
      figure: FIG162.e04,
      blanks: [
        { kind: 'num', label: '$x=$', answer: '20' },
        { kind: 'angle', label: '$\\angle5=$', answer: '110°' },
      ],
      explain: [
        '$\\angle3$、$\\angle4$ 是 $a$、$b$ 被 $l_1$ 所截的内错角，但现在还不知道 $a$、$b$ 是否平行，不能直接让它们相等。',
        '先看 $l_2$：$\\angle1$、$\\angle2$ 是 $a$、$b$ 被 $l_2$ 所截的同旁内角，$104^\\circ+76^\\circ=180^\\circ$，∴ $a\\parallel b$（同旁内角互补，两直线平行）。',
        '再看 $l_1$：∵ $a\\parallel b$，∴ $\\angle3=\\angle4$（两直线平行，内错角相等），$3x+10=5x-30$，$x=20$，$\\angle4=70^\\circ$。',
        '$\\angle5$ 与 $\\angle4$ 是邻补角，$\\angle5=180^\\circ-70^\\circ=110^\\circ$。转弯：先用一条截线上的角“判定”平行，再用另一条截线上的角“性质”。',
      ],
      verify: () => {
        if (104 + 76 !== 180) return null;
        for (let x = 0; x <= 60; x++) if (3 * x + 10 === 5 * x - 30) return [x, 180 - (5 * x - 30)];
        return null;
      },
    },
    {
      id: '16.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '在同一平面上有 $100$ 条直线 $a_1$、$a_2$、…、$a_{100}$，满足 $a_1\\parallel a_2$，$a_2\\perp a_3$，$a_3\\parallel a_4$，$a_4\\perp a_5$，……（“平行”“垂直”交替出现）。判断 $a_1$ 与 $a_{100}$、$a_1$ 与 $a_{98}$ 的位置关系。',
      blanks: [
        { kind: 'text', label: '$a_1$ 与 $a_{100}$', answer: '垂直', options: ['平行', '垂直', '不能确定'] },
        { kind: 'text', label: '$a_1$ 与 $a_{98}$', answer: '平行', options: ['平行', '垂直', '不能确定'] },
      ],
      explain: [
        '从 $a_1$ 出发逐条看：$a_2\\parallel a_1$；$a_3\\perp a_2$，所以 $a_3\\perp a_1$；$a_4\\parallel a_3$，所以 $a_4\\perp a_1$；$a_5\\perp a_4$，而 $a_4\\perp a_1$，垂直于同一条直线的 $a_5$、$a_1$ 平行（或者重合，题目中的直线不重合时就是平行）。',
        '$a_5$ 又回到和 $a_1$ 平行，之后每 $4$ 条循环一次：编号除以 $4$ 余 $1$、$2$ 的与 $a_1$ 平行，余 $3$、$0$ 的与 $a_1$ 垂直。',
        '$100$ 除以 $4$ 余 $0$，和 $a_4$ 一样，$a_{100}\\perp a_1$；$98$ 除以 $4$ 余 $2$，和 $a_2$ 一样，$a_{98}\\parallel a_1$。坑：以为“垂直出现偶数次就平行”，要看到循环周期是 $4$。',
      ],
      verify: () => {
        let rel = 'p';  // a_k 与 a_1 的关系
        const out = { 1: 'p' };
        for (let k = 2; k <= 100; k++) {
          const op = k % 2 === 0 ? 'p' : 'v';  // a_{k-1} 到 a_k：偶数号用平行，奇数号用垂直
          rel = op === 'p' ? rel : rel === 'p' ? 'v' : 'p';
          out[k] = rel;
        }
        const name = r => (r === 'p' ? '平行' : '垂直');
        return [name(out[100]), name(out[98])];
      },
    },
    {
      id: '16.2-e06',
      level: 'extended',
      type: 'multi',
      stem: '如图，在四边形 $ABCD$ 中，连接 $BD$，$\\angle1=\\angle ABD$，$\\angle2=\\angle CDB$，$\\angle3=\\angle ADB$，$\\angle4=\\angle CBD$。下列条件中，能判定 $AB\\parallel CD$ 的有（　　）',
      figure: FIG162.e06,
      options: ['$\\angle1=\\angle2$', '$\\angle3=\\angle4$', '$\\angle A+\\angle ABC=180^\\circ$', '$\\angle ABC+\\angle C=180^\\circ$', '$\\angle A=\\angle C$，且 $AD\\parallel BC$'],
      answer: [0, 3, 4],
      explain: [
        'A：$\\angle1$、$\\angle2$ 是 $AB$、$CD$ 被 $BD$ 所截的内错角，相等则 $AB\\parallel CD$，能判定。',
        'B：$\\angle3$、$\\angle4$ 是 $AD$、$BC$ 被 $BD$ 所截的内错角，只能推出 $AD\\parallel BC$，不能判定。',
        'C：$\\angle A$、$\\angle ABC$ 是 $AD$、$BC$ 被 $AB$ 所截的同旁内角，推出的也是 $AD\\parallel BC$，不能判定。',
        'D：$\\angle ABC$、$\\angle C$ 是 $AB$、$CD$ 被 $BC$ 所截的同旁内角，互补则 $AB\\parallel CD$，能判定。',
        'E：由 $AD\\parallel BC$ 得 $\\angle A+\\angle ABC=180^\\circ$（性质），又 $\\angle A=\\angle C$，所以 $\\angle C+\\angle ABC=180^\\circ$，再由判定得 $AB\\parallel CD$，能判定。选 A、D、E。转弯：先认清每对角是哪两条直线被哪条截线所截，E 要先用性质、再用判定。',
      ],
    },

    // ---------- 挑战 ----------
    {
      id: '16.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '$AB\\parallel CD$（$A$、$C$ 在左，$B$、$D$ 在右），点 $E$ 在两条直线之间。$BF_1$、$DF_1$ 分别平分 $\\angle ABE$、$\\angle CDE$，交于点 $F_1$；$BF_2$、$DF_2$ 分别平分 $\\angle ABF_1$、$\\angle CDF_1$，交于点 $F_2$；照这样继续，得到 $F_3$、$F_4$、……。(1) 如图，$E$ 在 $B$、$D$ 的左侧，$\\angle BED=96^\\circ$，求 $\\angle BF_3D$；(2) 若 $E$ 在 $B$、$D$ 的右侧（$\\angle ABE$、$\\angle CDE$ 都是钝角），$\\angle BED=104^\\circ$，求 $\\angle BF_3D$；(3) 在 (2) 的情况下，$\\angle BF_nD$ 第一次小于 $1^\\circ$ 时，求 $n$。',
      figure: FIG162.c01,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle BF_3D=$', answer: '12°' },
        { kind: 'angle', label: '(2) $\\angle BF_3D=$', answer: '32°' },
        { kind: 'num', label: '(3) $n=$', answer: '9' },
      ],
      explain: [
        '两个结论（都过拐点作平行线证明）：拐点 $P$ 在 $B$、$D$ 左侧时，$\\angle BPD=\\angle ABP+\\angle CDP$；在右侧时，$\\angle ABP+\\angle BPD+\\angle CDP=360^\\circ$（两组同旁内角互补）。',
        '(1) $E$ 在左侧：$\\angle ABE+\\angle CDE=96^\\circ$。平分后 $F_1$ 仍在左侧，$\\angle BF_1D=\\frac12\\times96^\\circ=48^\\circ$；每作一次减半，$\\angle BF_3D=12^\\circ$。',
        '(2) $E$ 在右侧：$\\angle ABE+\\angle CDE=360^\\circ-104^\\circ=256^\\circ$。关键是 $F_1$ 在哪里：$\\angle ABF_1=\\frac12\\angle ABE<90^\\circ$，射线 $BF_1$ 朝左下方；同理 $DF_1$ 朝左上方，所以 $F_1$ 在 $B$、$D$ 的**左侧**，要用第一个结论：$\\angle BF_1D=\\frac12\\times256^\\circ=128^\\circ$。',
        '之后 $F_2$、$F_3$ 都在左侧，每次减半：$\\angle BF_2D=64^\\circ$，$\\angle BF_3D=32^\\circ$。一般地 $\\angle BF_nD=\\frac{256^\\circ}{2^{n}}$。',
        '(3) $\\frac{256}{2^{n}}<1$，即 $2^{n}>256=2^{8}$，最小的 $n=9$。关键：(2) 中拐点从右侧“跳”到了左侧，套错结论会得到 $\\angle BF_1D=360^\\circ-128^\\circ$ 这样不可能的结果。',
      ],
      verify: () => {
        // 数值模拟：B=(0,0)，D=(0,−10)，BA、DC 指向 180°。给定 ∠ABP、∠CDP（P 的位置由射线方向决定），求交点并算 ∠BPD
        const run = (abe, cde, steps) => {
          let a = abe, c = cde, ang = null;
          for (let k = 0; k <= steps; k++) {
            const db = 180 + a, dd = 180 - c;   // BP 与 BA 成 a（向下），DP 与 DC 成 c（向上）
            const [s, u] = meet162([0, 0], db, [0, -10], dd);
            if (s <= 0 || u <= 0) return null;
            ang = between162(db + 180, dd + 180);
            a /= 2; c /= 2;
          }
          return ang;
        };
        const r1 = run(50, 46, 3);                 // ∠BED=96°，E 在左侧
        const r2 = run(130, 126, 3);               // ∠ABE+∠CDE=256°，E 在右侧：∠BED=104°
        const e2 = run(130, 126, 0);
        let n = 0, v = 256;
        while (v >= 1) { n++; v /= 2; }
        return e2 !== null && Math.abs(e2 - 104) < 1e-6 ? [Math.round(r1 * 1e6) / 1e6, Math.round(r2 * 1e6) / 1e6, n] : null;
      },
    },
    {
      id: '16.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '只考虑“两条直线被第三条直线所截”形成的同位角（截线必须与被截的两条直线都相交）。(1) 平面上有 $5$ 条直线，其中恰有 $2$ 条互相平行，其余每两条都相交，且任意三条不交于同一点，图中共有多少对同位角？(2) 若 $5$ 条直线中有 $3$ 条互相平行，另外 $2$ 条与它们都相交、彼此也相交，且任意三条不交于同一点，图中共有多少对同位角？',
      blanks: [
        { kind: 'num', label: '(1)', answer: '96', suffix: '对' },
        { kind: 'num', label: '(2)', answer: '60', suffix: '对' },
      ],
      explain: [
        '基本单元：两条直线被第三条直线所截，形成 $4$ 对同位角。截线必须和被截的两条直线都相交，所以平行线之间不能互相当截线。',
        '(1) 记平行的两条为 $p_1$、$p_2$，另外三条为 $q_1$、$q_2$、$q_3$。以 $p_1$ 为截线：被截的两条只能从 $q_1$、$q_2$、$q_3$ 中选（$p_2$ 与 $p_1$ 不相交），有 $3$ 种；$p_2$ 同样 $3$ 种。以某条 $q$ 为截线：其余 $4$ 条都和它相交，任选两条，$\\frac{4\\times3}{2}=6$ 种，三条 $q$ 共 $18$ 种。',
        '共 $3+3+18=24$ 个单元，同位角 $24\\times4=96$ 对。（若没有平行线，是 $5\\times6=30$ 个单元、$120$ 对，平行使截线的选法变少了。）',
        '(2) 三条平行线 $p_1$、$p_2$、$p_3$，另两条 $q_1$、$q_2$。以某条 $p$ 为截线：只能截 $q_1$、$q_2$，$1$ 种，三条共 $3$ 种。以某条 $q$ 为截线：其余 $4$ 条都和它相交，$6$ 种，两条共 $12$ 种。共 $15$ 个单元，$60$ 对。',
        '思路：回到定义“两条直线被第三条直线所截”，先按“谁当截线”分类数单元，再乘 $4$；平行线不相交这一点改变了能当截线的组合。',
      ],
      verify: () => {
        // 用方向表示直线：同方向即平行；数“截线与被截两条都相交（不平行）”的组合
        const count = dirs => {
          let u = 0;
          for (let t = 0; t < dirs.length; t++) {
            const others = dirs.map((d, i) => [d, i]).filter(([d, i]) => i !== t && d !== dirs[t]);
            u += (others.length * (others.length - 1)) / 2;
          }
          return u * 4;
        };
        return [count([0, 0, 30, 70, 120]), count([0, 0, 0, 50, 110])];
      },
    },
    {
      id: '16.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $\\angle\\alpha$ 的两边分别与 $\\angle\\beta$ 的两边平行，$\\angle\\beta$ 的两边分别与 $\\angle\\gamma$ 的两边垂直，并且 $\\angle\\alpha=2\\angle\\gamma-30^\\circ$，$\\angle\\beta=\\angle\\gamma+40^\\circ$（三个角都大于 $0^\\circ$、小于 $180^\\circ$）。求 $\\angle\\gamma$ 和 $\\angle\\alpha$ 的度数。',
      blanks: [
        { kind: 'angle', label: '$\\angle\\gamma=$', answer: '70°' },
        { kind: 'angle', label: '$\\angle\\alpha=$', answer: '110°' },
      ],
      explain: [
        '先证两个结论。① 两边分别平行的两个角相等或互补：延长一个角的一边与另一个角的边相交，用两次“两直线平行，同位角相等”可得两角相等；若某一边方向相反，就换成它的邻补角，所以两角相等或互补。',
        '② 两边分别垂直的两个角相等或互补：把 $\\angle\\gamma$ 的两边同时绕顶点朝同一方向转 $90^\\circ$，得到的角与 $\\angle\\gamma$ 相等（同角的余角相等），而它的两边分别与 $\\angle\\beta$ 的两边平行，由 ① 得 $\\angle\\beta$ 与 $\\angle\\gamma$ 相等或互补。',
        '第一步用 $\\angle\\beta$ 的条件筛选：$\\angle\\beta=\\angle\\gamma+40^\\circ\\neq\\angle\\gamma$，所以只能互补：$\\angle\\gamma+40^\\circ+\\angle\\gamma=180^\\circ$，$\\angle\\gamma=70^\\circ$，$\\angle\\beta=110^\\circ$。',
        '第二步：$\\angle\\alpha$ 与 $\\angle\\beta$ 相等或互补，$\\angle\\alpha=110^\\circ$ 或 $70^\\circ$；又 $\\angle\\alpha=2\\times70^\\circ-30^\\circ=110^\\circ$，所以 $\\angle\\alpha=110^\\circ$。',
        '关键：两次“相等或互补”各带来两种可能，用两个等式依次筛掉不符合的情况，最后只剩一组。',
      ],
      verify: () => {
        const r = [];
        for (let g = 1; g < 180; g++) {
          for (const s1 of [90, -90]) for (const s2 of [90, -90]) for (const t1 of [0, 180]) for (const t2 of [0, 180]) {
            const beta = between162(0 + s1, g + s2), alpha = between162(0 + s1 + t1, g + s2 + t2);
            if (beta <= 0 || beta >= 180 || alpha <= 0 || alpha >= 180) continue;
            if (beta === g + 40 && alpha === 2 * g - 30) r.push([g, alpha]);
          }
        }
        const u = [...new Set(r.map(x => x.join()))];
        return u.length === 1 ? r[0] : null;
      },
    },
    {
      id: '16.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$PQ\\parallel MN$，探照灯 $A$ 在 $PQ$ 上，探照灯 $B$ 在 $MN$ 上。灯 $A$ 的光束从射线 $AQ$ 开始，绕点 $A$ 顺时针以每秒 $4^\\circ$ 旋转，转到射线 $AP$ 后立即以同样的速度转回；灯 $B$ 的光束从射线 $BM$ 开始，绕点 $B$ 顺时针以每秒 $2^\\circ$ 旋转，转到射线 $BN$ 后立即转回。灯 $B$ 先转 $10$ 秒后灯 $A$ 才开始转。在灯 $A$ 第一次转回到 $AQ$ 之前，灯 $A$ 转了多少秒时，两灯光束所在的直线互相平行？（不考虑两条光束所在直线重合的情况；全部填出，用逗号隔开）',
      figure: FIG162.c04,
      blanks: [
        { kind: 'nums', label: '', answer: ['10', '170/3'], suffix: '秒' },
      ],
      explain: [
        '设灯 $A$ 转了 $t$ 秒（$0<t<90$），此时灯 $B$ 已转了 $(t+10)$ 秒。用“光束与平行线所成的角”描述位置。',
        '灯 $A$：$0<t\\leq45$ 时，光束从 $AQ$ 向下转了 $4t$ 度，即 $\\angle QA$光$=4t$；$45<t<90$ 时转回，光束与 $AP$ 所成的角为 $4(t-45)$ 度。',
        '灯 $B$：转到 $BN$ 要 $90$ 秒，$t+10\\leq90$ 即 $t\\leq80$ 时，光束从 $BM$ 向上转了 $2(t+10)$ 度。',
        '① $0<t\\leq45$：灯 $A$ 光束与 $AQ$ 成 $4t$（在 $PQ$ 下方），灯 $B$ 光束与 $BM$ 成 $2t+20$（在 $MN$ 上方）。两光束平行时，由“两直线平行，内错角相等”，光束与 $AQ$ 的夹角等于与 $BM$ 的夹角：$4t=2t+20$，$t=10$。',
        '② $45<t\\leq80$：灯 $A$ 光束与 $AP$ 成 $4(t-45)$，与 $AQ$ 成 $180-4(t-45)$；平行时 $180-4(t-45)=2t+20$，即 $360-4t=2t+20$，$t=\\frac{170}{3}$，在范围内。',
        '③ $80<t<90$：灯 $B$ 转回，光束与 $BN$ 成 $2(t+10-90)$，与 $BM$ 成 $180-2(t-80)$；平行时 $360-4t=180-2(t-80)$，$t=10$，不在范围内。',
        '所以 $t=10$ 或 $\\frac{170}{3}$。关键：每盏灯都要按“去”和“回”分段，把光束位置统一用与 $AQ$、$BM$ 所成的角表示，再用内错角相等列方程。',
      ],
      verify: () => {
        // 数学方向：A 光束 0°→−180°→0°，B 光束 180°→0°→180°
        const dirA = t => (t <= 45 ? -4 * t : -180 + 4 * (t - 45));
        const dirB = t => { const u = t + 10; return u <= 90 ? 180 - 2 * u : 2 * (u - 90); };
        const r = [];
        for (let k = 1; k < 270; k++) {  // t = k/3
          const t = k / 3;
          if (parallel162(dirA(t), dirB(t))) r.push(F(k).div(3));
        }
        return r;
      },
    },
    {
      id: '16.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，把一副三角尺按如图方式放置，直角顶点重合于点 $A$。三角尺 $ABC$ 中 $\\angle BAC=90^\\circ$，$\\angle B=60^\\circ$，$\\angle C=30^\\circ$；三角尺 $ADE$ 中 $\\angle DAE=90^\\circ$，$\\angle D=\\angle E=45^\\circ$。开始时 $AD$ 与 $AB$ 重合、$AE$ 与 $AC$ 重合，固定三角尺 $ABC$，将三角尺 $ADE$ 绕点 $A$ 逆时针旋转 $\\alpha$（$0^\\circ<\\alpha<180^\\circ$）。当三角尺 $ADE$ 的某一条边与三角尺 $ABC$ 的某一条边平行时，求 $\\alpha$ 的所有值（全部填出，用逗号隔开）。',
      figure: FIG162.c05,
      blanks: [
        { kind: 'nums', label: '$\\alpha=$', answer: ['30', '45', '120', '135', '165'], suffix: '°' },
      ],
      explain: [
        '$AD$、$AE$ 和 $AB$、$AC$ 都过点 $A$，它们之间不会平行，所以只要考虑：$AD\\parallel BC$、$AE\\parallel BC$、$DE\\parallel AB$、$DE\\parallel AC$、$DE\\parallel BC$ 五种。',
        '记 $AB$ 向右为基准。$AB$ 的方向为 $0^\\circ$，$AC$ 为 $90^\\circ$；$BC$ 与 $BA$ 成 $60^\\circ$，用内错角可知 $BC$ 所在直线与 $AB$ 成 $120^\\circ$（或说与 $AB$ 的反方向成 $60^\\circ$）。旋转 $\\alpha$ 后，$AD$ 的方向是 $\\alpha$，$AE$ 是 $90^\\circ+\\alpha$，$DE$ 与 $DA$ 成 $45^\\circ$，所在直线的方向是 $135^\\circ+\\alpha$。',
        '两条直线平行，就是它们与 $AB$ 所成的同位角相等，即方向相同或相差 $180^\\circ$：',
        '$AD\\parallel BC$：$\\alpha=120^\\circ$。$AE\\parallel BC$：$90^\\circ+\\alpha=120^\\circ$，$\\alpha=30^\\circ$。$DE\\parallel AB$：$135^\\circ+\\alpha=180^\\circ$，$\\alpha=45^\\circ$。',
        '$DE\\parallel AC$：$135^\\circ+\\alpha=90^\\circ+180^\\circ$，$\\alpha=135^\\circ$。$DE\\parallel BC$：$135^\\circ+\\alpha=120^\\circ+180^\\circ$，$\\alpha=165^\\circ$。',
        '共 $5$ 个值：$30^\\circ$、$45^\\circ$、$120^\\circ$、$135^\\circ$、$165^\\circ$。关键：先排除共顶点的边，再把每条边所在直线的“方向”用 $\\alpha$ 表示，平行就是方向相同或相差 $180^\\circ$，逐一列出不漏。',
      ],
      verify: () => {
        const r = [];
        const abc = [['AB', 0], ['AC', 90], ['BC', 120]];
        for (let a = 1; a < 180; a++) {
          const ade = [['AD', a], ['AE', 90 + a], ['DE', 135 + a]];
          let hit = false;
          for (const [n1, d1] of ade) for (const [n2, d2] of abc) {
            if (n1.includes('A') && n2.includes('A')) continue;  // 都过点 A
            if (parallel162(d1, d2)) hit = true;
          }
          if (hit) r.push(a);
        }
        return r;
      },
    },
  ],
});
