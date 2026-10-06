'use strict';

// 上海数学七年级下册 · 18.3 等边三角形
// 知识范围：定理“等边三角形的每个内角都等于 60°”；定理“三个内角都相等的三角形是等边三角形”；“有一个内角等于 60° 的等腰三角形是等边三角形”是课本例题的结论，引用时要先说明（分 60° 是顶角、底角讨论）
// 可以使用：18.1、18.2（等边对等角、三线合一、轴对称、等角对等边、大边对大角、大角对大边）；第 17 章（三边关系、内角和、外角、全等的判定）；第 16 章平行线；第 14 章旋转、翻折
// 还没学：线段的垂直平分线（18.4）；“30° 角所对直角边等于斜边的一半”、角平分线性质、HL、勾股定理（八年级）；平行四边形（八年级下册）

const SVG183 = {
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
  // 以 BC 为底边、顶点在上方的等边三角形的顶点（屏幕坐标，y 向下）
  eq: (B, C) => [(B[0] + C[0]) / 2 + ((C[1] - B[1]) * Math.sqrt(3)) / 2, (B[1] + C[1]) / 2 - ((C[0] - B[0]) * Math.sqrt(3)) / 2],
  ang: (P, Q, R) => {  // ∠QPR（度）
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)) * 180) / Math.PI;
  },
  // 在 (lo, hi) 上用二分法解 f(x)=0（f 单调）
  solve: (f, lo, hi) => { for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; } return (lo + hi) / 2; },
};

const FIG183 = (() => {
  const S = SVG183, out = {};
  const B0 = [50, 215], C0 = [250, 215], A0 = S.eq(B0, C0);
  const lab = (A, B, C) => S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6);
  // b02：AD⊥BC 于 D，E 在 AD 上，∠EBD=20°
  {
    const D = S.at(B0, C0, 0.5), E = [D[0], D[1] - 100 * Math.tan((20 * Math.PI) / 180)];
    out.b02 = S.wrap(300, 245, S.poly([A0, B0, C0]) + S.seg(A0, D) + S.seg(B0, E) + S.seg(C0, E) + lab(A0, B0, C0) + S.text('D', D, 0, 14) + S.text('E', E, 12, -4));
  }
  // b03：边长 8，D 在 BC 上，CD=3，DE∥AB 交 AC 于 E
  {
    const D = S.at(B0, C0, 5 / 8), E = S.at(C0, A0, 3 / 8);
    out.b03 = S.wrap(300, 245, S.poly([A0, B0, C0]) + S.seg(D, E) + lab(A0, B0, C0) + S.text('D', D, 0, 14) + S.text('E', E, 12, -2));
  }
  // b07：AD=BE=CF，∠BDE=80°
  {
    const pts = x => [S.at(A0, B0, x), S.at(B0, C0, x), S.at(C0, A0, x)];
    const x = S.solve(t => { const [D, E] = pts(t); return S.ang(D, B0, E) - 80; }, 0.5, 0.99);
    const [D, E, F] = pts(x);
    out.b07 = S.wrap(300, 245, S.poly([A0, B0, C0]) + S.poly([D, E, F]) + lab(A0, B0, C0) + S.text('D', D, -12, 0) + S.text('E', E, 0, 14) + S.text('F', F, 12, -2));
  }
  // b08：BD⊥AC 于 D，CE⊥AB 于 E，交于 O
  {
    const D = S.at(A0, C0, 0.5), E = S.at(A0, B0, 0.5), O = S.meet(B0, D, C0, E);
    out.b08 = S.wrap(300, 245, S.poly([A0, B0, C0]) + S.seg(B0, D) + S.seg(C0, E) + lab(A0, B0, C0) + S.text('D', D, 12, -2) + S.text('E', E, -12, -2) + S.text('O', O, 0, 15));
  }
  // b09：沿 DE 折叠，A 落在 BC 上的 A′，∠BDA′=50°
  {
    const fold = s => {
      const Ap = S.at(B0, C0, s), w = [A0[0] - Ap[0], A0[1] - Ap[1]], ww = w[0] * w[0] + w[1] * w[1];
      const onSide = Q => { const t = -ww / (2 * (w[0] * (Q[0] - A0[0]) + w[1] * (Q[1] - A0[1]))); return S.at(A0, Q, t); };
      return { Ap, D: onSide(B0), E: onSide(C0) };
    };
    const s = S.solve(t => { const f = fold(t); return S.ang(f.D, B0, f.Ap) - 50; }, 0.05, 0.95);
    const { Ap, D, E } = fold(s);
    out.b09 = S.wrap(300, 245, S.poly([B0, C0, E, D]) + S.seg(A0, D, true) + S.seg(A0, E, true) + S.seg(D, Ap) + S.seg(E, Ap) + S.seg(D, E)
      + S.text('A', A0, 0, -14) + S.text('B', B0, -10, 6) + S.text('C', C0, 10, 6) + S.text('D', D, -12, 0) + S.text('E', E, 12, 0) + S.text('A′', Ap, 0, 14));
  }
  // c01：边长 8，D 在 AC 上，AD=3，E 在 BC 的延长线上，CE=3（DB=DE）
  {
    const k = 24, B = [20, 205], C = [20 + 8 * k, 205], A = S.eq(B, C), D = S.at(A, C, 3 / 8), E = [C[0] + 3 * k, 205];
    out.c01 = S.wrap(300, 235, S.poly([A, B, C]) + S.seg(C, E) + S.seg(B, D) + S.seg(D, E) + lab(A, B, C) + S.text('D', D, 12, -2) + S.text('E', E, 8, 10));
  }
  // e05：六个内角都是 120° 的六边形，AB=2、BC=4、CD=3、DE=3、EF=3、FA=4（每单位 22px）
  {
    const k = 22, L = [2, 4, 3, 3, 3, 4], P = [[90, 205]];
    L.slice(0, 5).forEach((l, i) => { const a = (i * Math.PI) / 3, q = P[P.length - 1]; P.push([q[0] + l * k * Math.cos(a), q[1] - l * k * Math.sin(a)]); });
    const nm = ['A', 'B', 'C', 'D', 'E', 'F'], off = [[-8, 10], [8, 10], [12, 0], [6, -12], [-8, -12], [-12, 0]];
    out.e05 = S.wrap(300, 230, S.poly(P) + P.map((q, i) => S.text(nm[i], q, off[i][0], off[i][1])).join(''));
  }
  // e06：D 与 A 在 BC 两侧，BD=3，CD=5，∠BDC=120°（BC=7，每单位 26px）
  {
    const k = 26, B = [60, 180], C = [60 + 7 * k, 180], A = S.eq(B, C), x = 33 / 14, D = [B[0] + x * k, 180 + Math.sqrt(9 - x * x) * k];
    out.e06 = S.wrap(300, 255, S.poly([A, B, C]) + S.seg(B, D) + S.seg(C, D) + S.seg(A, D, true) + S.text('A', A, 0, -14) + S.text('B', B, -12, 0) + S.text('C', C, 12, 0) + S.text('D', D, 0, 14));
  }
  // e02：∠A=60°，BD、CE 分别平分 ∠ABC、∠ACB，交于 O
  {
    const B = [40, 215], C = [270, 215], A = S.meet(B, [B[0] + Math.cos((70 * Math.PI) / 180), B[1] - Math.sin((70 * Math.PI) / 180)], C, [C[0] - Math.cos((50 * Math.PI) / 180), C[1] - Math.sin((50 * Math.PI) / 180)]);
    const bis = (p, q, r) => { const u = [q[0] - p[0], q[1] - p[1]], v = [r[0] - p[0], r[1] - p[1]], lu = Math.hypot(...u), lv = Math.hypot(...v); return [p[0] + u[0] / lu + v[0] / lv, p[1] + u[1] / lu + v[1] / lv]; };
    const D = S.meet(B, bis(B, A, C), A, C), E = S.meet(C, bis(C, A, B), A, B), O = S.meet(B, D, C, E);
    out.e02 = S.wrap(310, 245, S.poly([A, B, C]) + S.seg(B, D) + S.seg(C, E) + lab(A, B, C) + S.text('D', D, 12, -2) + S.text('E', E, -12, -2) + S.text('O', O, 0, 15));
  }
  // c02：边长 6，D 在 BC 上，△ADE 是等边三角形（E 与 C 在 AD 同侧），连接 CE
  {
    const D = S.at(B0, C0, 0.35), E = S.eq(D, A0).map((v, i) => 2 * [(D[0] + A0[0]) / 2, (D[1] + A0[1]) / 2][i] - v);
    out.c02 = S.wrap(320, 245, S.poly([A0, B0, C0]) + S.poly([A0, D, E]) + S.seg(C0, E) + lab(A0, B0, C0) + S.text('D', D, 0, 14) + S.text('E', E, 10, -4));
  }
  // e01：沿 CD 折叠，B 落在 B′（取 ∠BCD=20°）
  {
    const r = (20 * Math.PI) / 180, Dp = S.meet(C0, [C0[0] - Math.cos(r), C0[1] - Math.sin(r)], A0, B0);
    const u = [Dp[0] - C0[0], Dp[1] - C0[1]], L = Math.hypot(...u), e = [u[0] / L, u[1] / L], t = (B0[0] - C0[0]) * e[0] + (B0[1] - C0[1]) * e[1];
    const Bp = [2 * (C0[0] + t * e[0]) - B0[0], 2 * (C0[1] + t * e[1]) - B0[1]];
    out.e01 = S.wrap(300, 245, S.poly([A0, B0, C0]) + S.seg(C0, Dp) + S.seg(Dp, Bp, true) + S.seg(C0, Bp, true) + S.seg(A0, Bp) + lab(A0, B0, C0) + S.text('D', Dp, -12, 0) + S.text('B′', Bp, -14, -2));
  }
  // c03：D 与 A 在 BC 同侧，∠BDC=60°，BD=7，CD=3（BC=√37，每单位 32px）
  {
    const k = 32, bc = Math.sqrt(37), B = [45, 220], C = [45 + bc * k, 220], A = S.eq(B, C), x = (49 - 9 + 37) / (2 * bc), D = [B[0] + x * k, 220 - Math.sqrt(49 - x * x) * k];
    out.c03 = S.wrap(300, 245, S.poly([A, B, C]) + S.seg(B, D) + S.seg(C, D) + S.seg(A, D, true) + lab(A, B, C) + S.text('D', D, 12, -4));
  }
  // c05：P 在等边三角形内，∠APB=130°，∠BPC=110°
  {
    const f = P => Math.abs(S.ang(P, A0, B0) - 130) + Math.abs(S.ang(P, B0, C0) - 110);
    let best = [150, 150], step = 8;
    for (let r = 0; r < 40; r++) {
      let cur = best;
      for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) { const P = [best[0] + i * step, best[1] + j * step]; if (f(P) < f(cur)) cur = P; }
      if (cur === best) step /= 2; best = cur;
    }
    out.c05 = S.wrap(300, 245, S.poly([A0, B0, C0]) + S.seg(best, A0) + S.seg(best, B0) + S.seg(best, C0) + lab(A0, B0, C0) + S.text('P', best, 12, 2));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s2/18.3',
  title: '等边三角形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“共顶点的两个等边三角形”配 motion 旋转动画。第 1 轮 e01 两问同一技巧，b06② 与 b04 重复，e03 两空顺序对不上，c01（∠A=60° 两角平分线）是经典压轴且分步引导、c02 只是标准套路、c03 题干给出旋转提示，c04 (1) 答案可猜；第 2 轮 e01 换成折叠后按 B′ 位置分类，原 c01 降为 e02，c01 改为 DB=DE 在直线 AC 上三种位置，c02 用旋转定义 E 并让 D 在整条直线上运动，c03 换成同侧 60° 的“差”版并反求，c04 (1) 加 AB=10，整节通过' },

  intro: [
    {
      title: '等边三角形的角',
      body: '三条边都相等的三角形叫等边三角形，它是特殊的等腰三角形。任取两条相等的边用“等边对等角”，三个角两两相等，再由内角和得到**定理**：等边三角形的每个内角都等于 $60^\\circ$。它有三条对称轴，每条边上的中线、高和对角的平分线都重合。',
      example: '边长为 $5$ 的等边三角形 $ABC$，周长是 $15$，$\\angle A+\\angle B=120^\\circ$。',
    },
    {
      title: '怎样判定等边三角形',
      body: '**定理**：三个内角都相等的三角形是等边三角形（由等角对等边）。常用的结论：有一个角是 $60^\\circ$ 的等腰三角形是等边三角形。用它时要说明理由——$60^\\circ$ 无论是顶角还是底角，由内角和都能推出三个角都是 $60^\\circ$。',
      example: '$\\triangle PQR$ 中 $PQ=PR$，$\\angle P=60^\\circ$，则 $\\angle Q=\\angle R=\\frac{180^\\circ-60^\\circ}2=60^\\circ$，所以它是等边三角形。',
      pitfall: '只有一个角是 $60^\\circ$、没有说等腰的三角形不一定是等边三角形。',
    },
    {
      title: '共顶点的两个等边三角形',
      body: '两个等边三角形有一个公共顶点时，常能找到一对全等三角形：两边分别是两个等边三角形的边，夹角都是“$60^\\circ$ 加（或减）同一个角”，用 SAS。从图形运动看，其中一个三角形绕公共顶点旋转 $60^\\circ$ 就得到另一个。',
      example: '下面的演示中 $\\triangle ABC$、$\\triangle CDE$ 都是等边三角形，$B$、$C$、$D$ 在一条直线上。$\\triangle BCE$ 绕点 $C$ 旋转 $60^\\circ$，$B$ 转到 $A$，$E$ 转到 $D$（演示里记作 $B\'$、$E\'$），所以 $\\triangle BCE\\cong\\triangle ACD$，$BE=AD$。',
      demo: { type: 'motion', mode: 'rotate', shape: [[0, 0], [4, 0], [5, 1.732]], labels: ['B', 'C', 'E'], center: [4, 0], angle: -60, view: [-1, 7, -1, 4.5] },
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '18.3-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列说法中，正确的是（　　）（多选）',
      options: [
        '有一个角是 $60^\\circ$ 的三角形是等边三角形',
        '有两个角是 $60^\\circ$ 的三角形是等边三角形',
        '有一个角是 $60^\\circ$ 的等腰三角形是等边三角形',
        '三个外角都相等的三角形是等边三角形',
        '等边三角形是轴对称图形，只有一条对称轴',
      ],
      answer: [1, 2, 3],
      explain: [
        'A 错：比如三个角是 $60^\\circ$、$50^\\circ$、$70^\\circ$。',
        'B 对：第三个角是 $180^\\circ-120^\\circ=60^\\circ$，三个角都相等。C 对：$60^\\circ$ 是顶角或底角，都能推出三个角都是 $60^\\circ$。',
        'D 对：外角都相等，它们的邻补角（三个内角）也都相等。E 错：等边三角形有三条对称轴。',
        '坑：漏选 D，或者以为 C 要分情况就不一定成立。',
      ],
    },
    {
      id: '18.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 是等边三角形，$AD\\perp BC$ 于点 $D$，点 $E$ 在 $AD$ 上，连接 $BE$、$CE$，$\\angle EBD=20^\\circ$。求 $\\angle ACE$ 的度数。',
      figure: FIG183.b02,
      blanks: [
        { kind: 'angle', label: '$\\angle ACE=$', answer: '40°' },
      ],
      explain: [
        '$AB=AC$，$AD\\perp BC$：由三线合一，$BD=DC$。',
        '在 $\\triangle EDB$ 和 $\\triangle EDC$ 中，$BD=CD$，$\\angle EDB=\\angle EDC=90^\\circ$，$ED=ED$，所以 $\\triangle EDB\\cong\\triangle EDC$（SAS），$\\angle ECD=\\angle EBD=20^\\circ$。',
        '$\\angle ACB=60^\\circ$，$\\angle ACE=60^\\circ-20^\\circ=40^\\circ$。坑：直接答 $20^\\circ$。',
      ],
      verify: () => 60 - 20,
    },
    {
      id: '18.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，等边三角形 $ABC$ 的边长为 $8$，点 $D$ 在 $BC$ 上，$DE\\parallel AB$，交 $AC$ 于点 $E$，$CD=3$。求 $\\triangle DEC$ 的周长和四边形 $ABDE$ 的周长。',
      figure: FIG183.b03,
      blanks: [
        { kind: 'num', label: '$\\triangle DEC$ 的周长', answer: '9' },
        { kind: 'num', label: '四边形 $ABDE$ 的周长', answer: '21' },
      ],
      explain: [
        '$DE\\parallel AB$：$\\angle EDC=\\angle B=60^\\circ$，$\\angle DEC=\\angle A=60^\\circ$（同位角），又 $\\angle C=60^\\circ$，所以 $\\triangle DEC$ 是等边三角形，$DE=EC=CD=3$，周长 $9$。',
        '$BD=8-3=5$，$AE=8-3=5$，四边形 $ABDE$ 的周长 $=AB+BD+DE+EA=8+5+3+5=21$。',
        '坑：漏掉 $DE$，或者以为 $AE=3$。',
      ],
      verify: () => { const a = 8, cd = 3; return [3 * cd, a + (a - cd) + cd + (a - cd)]; },
    },
    {
      id: '18.3-b04',
      level: 'basic',
      type: 'choice',
      stem: '一个等腰三角形的一个外角等于 $120^\\circ$，这个三角形（　　）',
      options: ['一定是等边三角形', '一定是顶角为 $120^\\circ$ 的等腰三角形', '是等边三角形或顶角为 $120^\\circ$ 的等腰三角形', '形状不能确定'],
      answer: 0,
      explain: [
        '外角 $120^\\circ$，与它相邻的内角是 $60^\\circ$。',
        '等腰三角形有一个角是 $60^\\circ$：若它是顶角，底角都是 $60^\\circ$；若它是底角，顶角是 $180^\\circ-120^\\circ=60^\\circ$。两种情况都是等边三角形，选 A。',
        '坑：把外角 $120^\\circ$ 当成内角（选 B、C），或者以为“$60^\\circ$ 可能是顶角也可能是底角”就不能确定。',
      ],
      verify: () => {
        const inner = 180 - 120;
        const asTop = [inner, (180 - inner) / 2, (180 - inner) / 2], asBase = [180 - 2 * inner, inner, inner];  // 60° 作顶角 / 作底角
        return [asTop, asBase].every(t => t.every(x => x === 60)) ? 0 : -1;
      },
    },
    {
      id: '18.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '$\\triangle ABC$ 是等边三角形，点 $D$ 在 $BC$ 的延长线上，$CD=CA$，连接 $AD$。求 $\\angle BAD$ 的度数。',
      blanks: [
        { kind: 'angle', label: '$\\angle BAD=$', answer: '90°' },
      ],
      explain: [
        '$\\angle ACD=180^\\circ-\\angle ACB=120^\\circ$。$CD=CA$，所以 $\\angle CAD=\\angle D=\\frac{180^\\circ-120^\\circ}2=30^\\circ$。',
        '$\\angle BAD=\\angle BAC+\\angle CAD=60^\\circ+30^\\circ=90^\\circ$。',
        '坑：只求出 $\\angle CAD=30^\\circ$ 就当成答案。',
      ],
      verify: () => { const acd = 180 - 60; return 60 + (180 - acd) / 2; },
    },
    {
      id: '18.3-b06',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，给出下列四组条件：① $\\angle A=\\angle B=60^\\circ$；② $AB=AC$，$\\angle A$ 的外角等于 $120^\\circ$；③ $\\angle A=60^\\circ$，$\\angle B$ 的外角等于 $2\\angle C$；④ $AB=AC$，$\\angle A=2\\angle B$。能判定 $\\triangle ABC$ 是等边三角形的有（　　）',
      options: ['$1$ 组', '$2$ 组', '$3$ 组', '$4$ 组'],
      answer: 2,
      explain: [
        '① 第三个角也是 $60^\\circ$，能。② $\\angle A=60^\\circ$ 是顶角，底角 $\\angle B=\\angle C=60^\\circ$，能。',
        '③ $\\angle B$ 的外角 $=\\angle A+\\angle C=60^\\circ+\\angle C$，它等于 $2\\angle C$，所以 $\\angle C=60^\\circ$，$\\angle B=60^\\circ$，能。',
        '④ $\\angle B=\\angle C$，$\\angle A=2\\angle B$，$4\\angle B=180^\\circ$，$\\angle B=45^\\circ$，$\\angle A=90^\\circ$，是等腰直角三角形，不能。共 $3$ 组，选 C。坑：觉得 ③ 没说等腰就不能判定。',
      ],
      verify: () => {
        const tri = [
          [60, 60, 60],
          (() => { const a = 180 - 120; return [a, (180 - a) / 2, (180 - a) / 2]; })(),
          (() => { const c = 60; return [60, 180 - 60 - c, c]; })(),   // 60 + C = 2C
          (() => { const b = 180 / 4; return [2 * b, b, b]; })(),
        ];
        return tri.filter(t => t.every(x => x === 60)).length - 1;
      },
    },
    {
      id: '18.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 是等边三角形，点 $D$、$E$、$F$ 分别在 $AB$、$BC$、$CA$ 上，$AD=BE=CF$，$\\angle BDE=80^\\circ$。求 $\\angle ADF$ 的度数，并判断 $\\triangle DEF$ 的形状。',
      figure: FIG183.b07,
      blanks: [
        { kind: 'angle', label: '$\\angle ADF=$', answer: '40°' },
        { kind: 'text', label: '$\\triangle DEF$ 是', answer: '等边三角形', options: ['等边三角形', '等腰三角形（不是等边三角形）', '直角三角形', '不能确定'] },
      ],
      explain: [
        '$AB=BC=CA$，$AD=BE=CF$，所以 $BD=AB-AD=BC-BE=CE$，同理 $AF=BD$。',
        '在 $\\triangle ADF$ 和 $\\triangle BED$ 中，$AD=BE$，$\\angle A=\\angle B=60^\\circ$，$AF=BD$，所以 $\\triangle ADF\\cong\\triangle BED$（SAS），$\\angle ADF=\\angle BED=180^\\circ-60^\\circ-80^\\circ=40^\\circ$，$DF=ED$。',
        '同理 $\\triangle BED\\cong\\triangle CFE$，$ED=FE$。三边相等，$\\triangle DEF$ 是等边三角形（也可以算出 $\\angle FDE=180^\\circ-80^\\circ-40^\\circ=60^\\circ$）。坑：对应角找错，把 $\\angle ADF$ 写成 $80^\\circ$。',
      ],
      verify: () => {
        // 数值检验：取使 ∠BDE=80° 的 AD，计算 ∠ADF 和三边
        const S = SVG183, A = [0, -Math.sqrt(3)], B = [-1, 0], C = [1, 0];
        const pts = x => [S.at(A, B, x), S.at(B, C, x), S.at(C, A, x)];
        const x = S.solve(t => { const [D, E] = pts(t); return S.ang(D, B, E) - 80; }, 0.5, 0.99);
        const [D, E, F] = pts(x), d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const eq = Math.abs(d(D, E) - d(E, F)) < 1e-9 && Math.abs(d(E, F) - d(F, D)) < 1e-9;
        return [Math.round(S.ang(D, A, F) * 1e6) / 1e6 + '°', eq ? '等边三角形' : null];
      },
    },
    {
      id: '18.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 是等边三角形，$BD\\perp AC$ 于点 $D$，$CE\\perp AB$ 于点 $E$，$BD$ 与 $CE$ 相交于点 $O$。求 $\\angle BOC$ 和 $\\angle BOE$ 的度数。',
      figure: FIG183.b08,
      blanks: [
        { kind: 'angle', label: '$\\angle BOC=$', answer: '120°' },
        { kind: 'angle', label: '$\\angle BOE=$', answer: '60°' },
      ],
      explain: [
        '$BA=BC$，$BD\\perp AC$：由三线合一，$BD$ 平分 $\\angle ABC$，$\\angle OBC=30^\\circ$；同理 $\\angle OCB=30^\\circ$。',
        '$\\angle BOC=180^\\circ-30^\\circ-30^\\circ=120^\\circ$，$\\angle BOE=180^\\circ-\\angle BOC=60^\\circ$。',
        '坑：把两条高的夹角都当成 $60^\\circ$，没分清 $\\angle BOC$ 是钝角。',
      ],
      verify: () => {
        const S = SVG183, A = [0, -Math.sqrt(3)], B = [-1, 0], C = [1, 0];
        const D = S.at(A, C, 0.5), E = S.at(A, B, 0.5), O = S.meet(B, D, C, E);
        return [Math.round(S.ang(O, B, C)) + '°', Math.round(S.ang(O, B, E)) + '°'];
      },
    },
    {
      id: '18.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，把等边三角形纸片 $ABC$ 沿 $DE$ 折叠（$D$ 在 $AB$ 上，$E$ 在 $AC$ 上），点 $A$ 落在 $BC$ 边上的点 $A\'$ 处，$\\angle BDA\'=50^\\circ$。求 $\\angle A\'EC$ 的度数。',
      figure: FIG183.b09,
      blanks: [
        { kind: 'angle', label: '$\\angle A\'EC=$', answer: '70°' },
      ],
      explain: [
        '折叠前后的角相等：$\\angle DA\'E=\\angle A=60^\\circ$。',
        '$\\triangle BDA\'$ 中，$\\angle BA\'D=180^\\circ-60^\\circ-50^\\circ=70^\\circ$。$B$、$A\'$、$C$ 在一条直线上，$\\angle EA\'C=180^\\circ-70^\\circ-60^\\circ=50^\\circ$。',
        '$\\triangle A\'EC$ 中，$\\angle A\'EC=180^\\circ-60^\\circ-50^\\circ=70^\\circ$。坑：忘了 $\\angle DA\'E$ 也是 $60^\\circ$，在平角里少减一块。',
      ],
      verify: () => { const ba = 180 - 60 - 50, eac = 180 - ba - 60; return 180 - 60 - eac; },
    },

    // ---------- 扩展 ----------
    {
      id: '18.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，等边三角形纸片 $ABC$ 中，点 $D$ 在边 $AB$ 上（不与 $A$、$B$ 重合），沿 $CD$ 折叠，点 $B$ 落在点 $B\'$ 处（$B\'$ 与 $A$ 不重合），连接 $AB\'$。若 $\\triangle ADB\'$ 是等腰三角形，求 $\\angle BCD$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG183.e01,
      blanks: [
        { kind: 'nums', label: '$\\angle BCD=$', answer: ['20', '40'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle BCD=\\theta$（$0^\\circ<\\theta<60^\\circ$）。折叠：$CB\'=CB=CA$，$\\angle BCB\'=2\\theta$，$\\angle CDB\'=\\angle CDB=180^\\circ-60^\\circ-\\theta=120^\\circ-\\theta$。$\\theta=30^\\circ$ 时 $B\'$ 与 $A$ 重合，不合题意。',
        '① $\\theta<30^\\circ$：$B\'$ 在 $\\angle ACB$ 内部，$\\angle ACB\'=60^\\circ-2\\theta$，$CA=CB\'$，$\\angle CAB\'=\\frac{180^\\circ-(60^\\circ-2\\theta)}2=60^\\circ+\\theta$，所以 $\\angle DAB\'=\\theta$；$\\angle ADB\'=\\angle BDB\'-180^\\circ=2(120^\\circ-\\theta)-180^\\circ=60^\\circ-2\\theta$；第三个角 $120^\\circ+\\theta$ 是钝角，只能作顶角。等腰只能 $\\theta=60^\\circ-2\\theta$，$\\theta=20^\\circ$。',
        '② $\\theta>30^\\circ$：$B\'$ 越过了 $CA$，$\\angle ACB\'=2\\theta-60^\\circ$，$\\angle CAB\'=120^\\circ-\\theta$，$\\angle DAB\'=60^\\circ+120^\\circ-\\theta=180^\\circ-\\theta$ 是钝角；$\\angle ADB\'=180^\\circ-2(120^\\circ-\\theta)=2\\theta-60^\\circ$，第三个角 $60^\\circ-\\theta$。等腰只能 $2\\theta-60^\\circ=60^\\circ-\\theta$，$\\theta=40^\\circ$。',
        '所以 $\\angle BCD=20^\\circ$ 或 $40^\\circ$。转弯：$B\'$ 落在 $CA$ 的哪一侧，角的表达式不同，要以 $\\theta=30^\\circ$ 为界分类；钝角只能是顶角。',
      ],
      verify: () => {
        const S = SVG183, B = [0, 0], C = [1, 0], A = [0.5, -Math.sqrt(3) / 2], d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const out = [];
        for (let k = 1; k < 120; k++) {
          const th = k / 2, r = (th * Math.PI) / 180;
          const Dp = S.meet(C, [C[0] - Math.cos(r), -Math.sin(r)], A, B);
          const u = [Dp[0] - C[0], Dp[1] - C[1]], L = Math.hypot(...u), e = [u[0] / L, u[1] / L], t = (B[0] - C[0]) * e[0] + (B[1] - C[1]) * e[1];
          const Bp = [2 * (C[0] + t * e[0]) - B[0], 2 * (C[1] + t * e[1]) - B[1]];
          if (d(Bp, A) < 1e-9) continue;
          const s = [d(A, Dp), d(Dp, Bp), d(A, Bp)];
          if (Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9) out.push(th);
        }
        return out;
      },
    },
    {
      id: '18.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle A=60^\\circ$，$BD$、$CE$ 分别平分 $\\angle ABC$、$\\angle ACB$，交 $AC$、$AB$ 于点 $D$、$E$，$BD$ 与 $CE$ 相交于点 $O$。(1) 求 $\\angle BOC$；(2) 若 $BE=4$，$CD=5$，求 $BC$；(3) 比较 $OD$ 与 $OE$ 的大小。',
      figure: FIG183.e02,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle BOC=$', answer: '120°' },
        { kind: 'num', label: '(2) $BC=$', answer: '9' },
        { kind: 'text', label: '(3) $OD$ ○ $OE$', answer: '=', options: ['>', '<', '=', '不能确定'] },
      ],
      explain: [
        '(1) $\\angle OBC+\\angle OCB=\\frac12(\\angle ABC+\\angle ACB)=\\frac12\\times120^\\circ=60^\\circ$，$\\angle BOC=120^\\circ$，所以 $\\angle BOE=\\angle COD=60^\\circ$。',
        '(2) 思路：$BC$ 比 $BE$、$CD$ 长，在 $BC$ 上“截长”。作 $\\angle BOC$ 的平分线交 $BC$ 于 $F$，$\\angle BOF=\\angle COF=60^\\circ$。',
        '在 $\\triangle BOE$ 和 $\\triangle BOF$ 中，$\\angle EBO=\\angle FBO$，$BO=BO$，$\\angle BOE=\\angle BOF=60^\\circ$，所以 $\\triangle BOE\\cong\\triangle BOF$（ASA），$BF=BE=4$，$OF=OE$。同理 $\\triangle COD\\cong\\triangle COF$，$CF=CD=5$，$OF=OD$。',
        '$BC=BF+FC=4+5=9$。(3) $OD=OF=OE$。',
        '思路：$60^\\circ$ 的角使 $\\angle BOC=120^\\circ$，正好被平分成两个 $60^\\circ$，和 $\\angle BOE$、$\\angle COD$ 相等，于是在 $BC$ 上造出两对全等三角形，一次得到长度和等量两个结论。',
      ],
      verify: () => {
        // 数值求出满足 ∠A=60°、BE=4、CD=5 的三角形（用角平分线分对边的比例只作核对）
        const solveTri = () => {
          const f = (b, c) => { const a = Math.sqrt(b * b + c * c - b * c); return [(c * a) / (a + b) - 4, (b * a) / (a + c) - 5]; };
          let b = 8, c = 8;
          for (let i = 0; i < 60; i++) {
            const [f1, f2] = f(b, c), h = 1e-7, [g1, g2] = f(b + h, c), [k1, k2] = f(b, c + h);
            const j11 = (g1 - f1) / h, j21 = (g2 - f2) / h, j12 = (k1 - f1) / h, j22 = (k2 - f2) / h, det = j11 * j22 - j12 * j21;
            b -= (f1 * j22 - f2 * j12) / det; c -= (f2 * j11 - f1 * j21) / det;
          }
          return [b, c];
        };
        const [b, c] = solveTri(), A = [0, 0], B = [c, 0], C = [b / 2, (b * Math.sqrt(3)) / 2];
        const S = SVG183, bis = (p, q, r) => { const u = [q[0] - p[0], q[1] - p[1]], v = [r[0] - p[0], r[1] - p[1]], lu = Math.hypot(...u), lv = Math.hypot(...v); return [p[0] + u[0] / lu + v[0] / lv, p[1] + u[1] / lu + v[1] / lv]; };
        const D = S.meet(B, bis(B, A, C), A, C), E = S.meet(C, bis(C, A, B), A, B), O = S.meet(B, D, C, E), d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const cmp = Math.abs(d(O, D) - d(O, E)) < 1e-6 ? '=' : null;
        return [Math.round(S.ang(O, B, C) * 1e4) / 1e4 + '°', Math.round(d(B, C) * 1e6) / 1e6, cmp];
      },
    },
    {
      id: '18.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 是等边三角形，$AB=4$，点 $D$ 在直线 $BC$ 上（不与 $B$、$C$ 重合）。若 $\\triangle ABD$ 与 $\\triangle ACD$ 中至少有一个是等腰三角形，求 $\\angle CAD$ 的所有可能值（全部填出，用逗号隔开）以及每种情况下 $BD$ 的长。',
      blanks: [
        { kind: 'nums', label: '$\\angle CAD=$', answer: ['30', '90'], suffix: '°' },
        { kind: 'num', label: '$\\angle CAD$ 较小时 $BD=$', answer: '8' },
        { kind: 'num', label: '$\\angle CAD$ 较大时 $BD=$', answer: '4' },
      ],
      explain: [
        '按 $D$ 的位置分三种。$D$ 在线段 $BC$ 上：$\\triangle ABD$ 中 $\\angle B=60^\\circ$，若它等腰就是等边三角形，$BD=AB=BC$，$D$ 与 $C$ 重合，不行；同理 $\\triangle ACD$ 也不行。',
        '$D$ 在 $C$ 的外侧：$\\triangle ABD$ 中 $\\angle B=60^\\circ$，同理不行；$\\triangle ACD$ 中 $\\angle ACD=120^\\circ$ 是钝角，只能是顶角，$CD=CA=4$，$\\angle CAD=\\frac{180^\\circ-120^\\circ}2=30^\\circ$，$BD=8$。',
        '$D$ 在 $B$ 的外侧：同理只有 $BD=BA=4$，$\\angle BAD=30^\\circ$，$\\angle CAD=60^\\circ+30^\\circ=90^\\circ$。',
        '所以 $\\angle CAD=30^\\circ$（$BD=8$）或 $90^\\circ$（$BD=4$）。转弯：有 $60^\\circ$ 角的三角形等腰就等边，会把 $D$ 逼到顶点上；钝角只能作顶角。坑：$D$ 在 $B$ 外侧时，$\\angle CAD$ 要加上 $\\angle BAC$。',
      ],
      verify: () => {
        const A = [2, -2 * Math.sqrt(3)], B = [0, 0], C = [4, 0], d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const iso = (p, q, r) => { const s = [d(p, q), d(q, r), d(r, p)]; return Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9; };
        const angs = new Set(), bds = new Set();
        for (let k = -2000; k <= 2400; k++) {
          const x = k / 200;
          if (Math.abs(x) < 1e-9 || Math.abs(x - 4) < 1e-9) continue;
          const D = [x, 0];
          if (iso(A, B, D) || iso(A, C, D)) { angs.add(Math.round(SVG183.ang(A, C, D))); bds.add(Math.round(d(B, D) * 1e6) / 1e6); }
        }
        const srt = s => [...s].sort((p, q) => p - q), b = srt(bds);  // ∠CAD 较小（D 在 C 外侧）时 BD 较大
        return [srt(angs), b[1], b[0]];
      },
    },
    {
      id: '18.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 是等边三角形，点 $D$、$E$ 分别在直线 $BC$、$CA$ 上，$BD=CE$，直线 $AD$ 与 $BE$ 相交于点 $P$。(1) 若 $D$ 在边 $BC$ 上，$E$ 在边 $CA$ 上，求 $\\angle APB$；(2) 若 $D$ 在 $BC$ 的延长线上（$C$ 在 $B$、$D$ 之间），$E$ 在 $CA$ 的延长线上（$A$ 在 $C$、$E$ 之间），求 $\\angle APB$。',
      blanks: [
        { kind: 'angle', label: '(1) $\\angle APB=$', answer: '120°' },
        { kind: 'angle', label: '(2) $\\angle APB=$', answer: '60°' },
      ],
      explain: [
        '两问都先证全等：在 $\\triangle ABD$ 和 $\\triangle BCE$ 中，$AB=BC$，$\\angle ABD=\\angle BCE$（(1) 中都是 $60^\\circ$；(2) 中 $D$ 在射线 $BC$ 上、$E$ 在射线 $CA$ 上，仍都是 $60^\\circ$），$BD=CE$，所以 $\\triangle ABD\\cong\\triangle BCE$（SAS），$\\angle BAD=\\angle CBE$。',
        '(1) $\\angle APE$ 是 $\\triangle ABP$ 的外角：$\\angle APE=\\angle BAP+\\angle ABP=\\angle CBE+\\angle ABP=\\angle ABC=60^\\circ$，所以 $\\angle APB=180^\\circ-60^\\circ=120^\\circ$。',
        '(2) 这时 $P$ 在 $DA$ 的延长线上、在线段 $BE$ 上。$\\triangle ABD$ 中 $\\angle ADB=180^\\circ-60^\\circ-\\angle BAD$；$\\triangle PBD$ 中 $\\angle BPD=180^\\circ-\\angle PBD-\\angle PDB=180^\\circ-\\angle CBE-(120^\\circ-\\angle BAD)=60^\\circ$（因为 $\\angle CBE=\\angle BAD$）。$\\angle APB$ 就是 $\\angle BPD$，等于 $60^\\circ$。',
        '转弯：两种位置全等不变，但交点 $P$ 的位置变了，要求的角由钝角变成锐角。坑：(2) 照搬 (1) 的 $120^\\circ$。',
      ],
      verify: () => {
        const S = SVG183, A = [1, -Math.sqrt(3)], B = [0, 0], C = [2, 0];
        const at = (bd) => { const D = [bd, 0], E = S.at(C, A, bd / 2); const P = S.meet(A, D, B, E); return Math.round(S.ang(P, A, B) * 1e6) / 1e6 + '°'; };
        const r1 = new Set([0.5, 0.8, 1.3].map(at)), r2 = new Set([2.4, 3, 4.5].map(at));
        return [r1.size === 1 ? [...r1][0] : null, r2.size === 1 ? [...r2][0] : null];
      },
    },
    {
      id: '18.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，六边形 $ABCDEF$ 的六个内角都等于 $120^\\circ$，$AB=2$，$BC=4$，$CD=3$，$DE=3$。求 $EF$ 和 $FA$ 的长。',
      figure: FIG183.e05,
      blanks: [
        { kind: 'num', label: '$EF=$', answer: '3' },
        { kind: 'num', label: '$FA=$', answer: '4' },
      ],
      explain: [
        '思路：六个角都是 $120^\\circ$，相邻的外角都是 $60^\\circ$。把不相邻的三条边 $AB$、$CD$、$EF$ 向两端延长，它们两两相交，围成一个大三角形 $PQR$。',
        '每个角上切出的小三角形（如以 $BC$ 为边的那个）两个角都是 $180^\\circ-120^\\circ=60^\\circ$，是等边三角形，边长分别等于 $BC$、$DE$、$FA$。大三角形三个角也都是 $60^\\circ$，是等边三角形。',
        '大三角形三边相等：$FA+AB+BC=BC+CD+DE=DE+EF+FA$。由第二个等号：$FA=CD+DE-AB=3+3-2=4$；由第三个等号：$EF=BC+CD-FA=4+3-4=3$。',
        '转弯：六边形的边长关系不容易直接看出，补成大等边三角形后，每条大边都由三段组成。',
      ],
      verify: () => {
        // 边向量方向依次为 0°、60°、…、300°，闭合时向量和为 0，解出 EF、FA
        const L = [2, 4, 3, 3], dir = i => [Math.cos((i * Math.PI) / 3), Math.sin((i * Math.PI) / 3)];
        let x = 0, y = 0;
        L.forEach((l, i) => { x += l * dir(i)[0]; y += l * dir(i)[1]; });
        // e·dir(4) + f·dir(5) = −(x, y)，解二元一次方程组
        const [a, b] = dir(4), [c, d] = dir(5), det = a * d - b * c;
        const e = (-x * d + y * c) / det, f = (-y * a + x * b) / det;
        return [Math.round(e * 1e9) / 1e9, Math.round(f * 1e9) / 1e9];
      },
    },
    {
      id: '18.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 是等边三角形，点 $D$ 与点 $A$ 在直线 $BC$ 的两侧，$\\angle BDC=120^\\circ$，$BD=3$，$CD=5$。求 $AD$ 的长和 $\\angle ADB$ 的度数。',
      figure: FIG183.e06,
      blanks: [
        { kind: 'num', label: '$AD=$', answer: '8' },
        { kind: 'angle', label: '$\\angle ADB=$', answer: '60°' },
      ],
      explain: [
        '思路：要把 $BD$、$CD$ 接成一条线段和 $AD$ 比较。延长 $BD$ 到 $E$，使 $DE=DC$，连接 $CE$。',
        '$\\angle CDE=180^\\circ-120^\\circ=60^\\circ$，$DC=DE$，所以 $\\triangle DCE$ 是等边三角形（有一个角是 $60^\\circ$ 的等腰三角形），$CE=CD$，$\\angle DCE=60^\\circ$。',
        '$\\angle ACD=\\angle ACB+\\angle BCD=60^\\circ+\\angle BCD$，$\\angle BCE=\\angle BCD+\\angle DCE=\\angle BCD+60^\\circ$，所以 $\\angle ACD=\\angle BCE$。又 $AC=BC$，$CD=CE$，所以 $\\triangle ACD\\cong\\triangle BCE$（SAS）。',
        '$AD=BE=BD+DE=3+5=8$，$\\angle ADC=\\angle E=60^\\circ$，$\\angle ADB=\\angle BDC-\\angle ADC=120^\\circ-60^\\circ=60^\\circ$。转弯：$120^\\circ$ 的邻补角是 $60^\\circ$，补出一个等边三角形，再找共顶点的全等。',
      ],
      verify: () => {
        const x = 33 / 14, D = [x, Math.sqrt(9 - x * x)], B = [0, 0], C = [7, 0], A = [3.5, -3.5 * Math.sqrt(3)];
        const ok = Math.abs(SVG183.ang(D, B, C) - 120) < 1e-9 && Math.abs(Math.hypot(D[0] - 7, D[1]) - 5) < 1e-9;
        return ok ? [Math.round(Math.hypot(A[0] - D[0], A[1] - D[1]) * 1e9) / 1e9, Math.round(SVG183.ang(D, A, B) * 1e6) / 1e6 + '°'] : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '18.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '等边三角形 $ABC$ 的边长为 $8$，点 $D$ 在直线 $AC$ 上，点 $E$ 在直线 $BC$ 上（不与 $B$ 重合），且 $DB=DE$。(1) 如图，$D$ 在边 $AC$ 上，$AD=3$，求 $BE$；(2) $D$ 在 $AC$ 的延长线上（$C$ 在 $A$、$D$ 之间），$CD=2$，求 $BE$；(3) $D$ 在 $CA$ 的延长线上（$A$ 在 $C$、$D$ 之间），$AD=2$，求 $BE$。',
      figure: FIG183.c01,
      blanks: [
        { kind: 'num', label: '(1) $BE=$', answer: '11' },
        { kind: 'num', label: '(2) $BE=$', answer: '18' },
        { kind: 'num', label: '(3) $BE=$', answer: '6' },
      ],
      explain: [
        '(1) 过 $D$ 作 $DF\\parallel BC$，交 $AB$ 于 $F$。$\\angle AFD=\\angle ADF=60^\\circ$（同位角），$\\triangle AFD$ 是等边三角形，$FD=AF=AD=3$，$BF=5=CD$。$DB=DE$ 得 $\\angle DBE=\\angle E$。$\\angle FBD=60^\\circ-\\angle DBC$，$\\angle CDE=\\angle ACB-\\angle E=60^\\circ-\\angle DBC$，所以 $\\angle FBD=\\angle CDE$；又 $\\angle BFD=\\angle DCE=120^\\circ$，$\\triangle BFD\\cong\\triangle DCE$（AAS），$CE=FD=3$，$BE=8+3=11$。',
        '(2) 同样过 $D$ 作 $DF\\parallel BC$，交直线 $AB$ 于 $F$（$F$ 在 $AB$ 的延长线上），$\\triangle AFD$ 是等边三角形，$FD=AD=10$，$BF=AF-AB=2=CD$。这时 $\\angle BFD=60^\\circ$，$\\angle DCE=\\angle ACB=60^\\circ$（对顶角），$\\angle FBD=\\angle CDE$（都等于 $\\angle DBE-60^\\circ$），所以 $\\triangle BFD\\cong\\triangle DCE$，$CE=FD=10$，$E$ 在 $BC$ 的延长线上，$BE=18$。',
        '(3) 过 $D$ 作 $DF\\parallel BC$，交 $BA$ 的延长线于 $F$，$\\triangle AFD$ 是等边三角形，$FD=AD=2$，$BF=10=CD$。$\\angle BFD=\\angle DCE=60^\\circ$，$\\angle FBD=\\angle CDE$（都等于 $\\angle DBC-60^\\circ$），所以 $CE=FD=2$。这里 $\\angle DCE=60^\\circ$ 说明 $E$ 在射线 $CB$ 上，$BE=8-2=6$。',
        '思路：三种位置都过 $D$ 作 $BC$ 的平行线截出等边三角形，得到 $CE=AD$；难点是每种位置要重新确定 $F$、$E$ 在哪里、哪两个角相等，最后 $BE$ 分别是 $BC+CE$ 或 $BC-CE$。',
      ],
      verify: () => {
        // B=(0,0)，C=(8,0)，A 在上方（数学坐标）；在 x 轴上解出 DE=DB 且 E≠B 的点
        const A = [4, 4 * Math.sqrt(3)], C = [8, 0], u = [(C[0] - A[0]) / 8, (C[1] - A[1]) / 8];
        const be = ad => { const D = [A[0] + ad * u[0], A[1] + ad * u[1]], db2 = D[0] * D[0] + D[1] * D[1], h = Math.sqrt(db2 - D[1] * D[1]); const xs = [D[0] + h, D[0] - h].filter(x => Math.abs(x) > 1e-9); return xs.length === 1 ? Math.round(Math.abs(xs[0]) * 1e9) / 1e9 : null; };
        return [be(3), be(10), be(-2)];
      },
    },
    {
      id: '18.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '等边三角形 $ABC$ 的边长为 $6$，点 $D$ 在直线 $BC$ 上（不与 $B$、$C$ 重合），把线段 $AD$ 绕点 $A$ 按逆时针方向旋转 $60^\\circ$ 得到线段 $AE$（图中 $B$ 在左、$C$ 在右、$A$ 在上方），连接 $CE$、$DE$。(1) 如图，$D$ 在边 $BC$ 上，求 $CD+CE$；(2) $D$ 在 $BC$ 的延长线上（$C$ 在 $B$、$D$ 之间），$CD=2$，求 $CE$ 和 $\\angle DCE$；(3) $D$ 在直线 $BC$ 上运动，当 $\\triangle CDE$ 的周长最小时，求 $BD$ 的长和 $\\angle CDE$ 的度数。',
      figure: FIG183.c02,
      blanks: [
        { kind: 'num', label: '(1) $CD+CE=$', answer: '6' },
        { kind: 'num', label: '(2) $CE=$', answer: '8' },
        { kind: 'angle', label: '$\\angle DCE=$', answer: '60°' },
        { kind: 'num', label: '(3) $BD=$', answer: '3' },
        { kind: 'angle', label: '$\\angle CDE=$', answer: '30°' },
      ],
      explain: [
        '$AD=AE$，$\\angle DAE=60^\\circ$，$\\triangle ADE$ 是等边三角形，$DE=AD$。逆时针旋转 $60^\\circ$ 也把 $AB$ 转到 $AC$，所以总有 $\\angle BAD=\\angle CAE$（都是 $60^\\circ$ 与 $\\angle DAC$ 的和或差），$\\triangle ABD\\cong\\triangle ACE$（SAS），$CE=BD$，$\\angle ACE=\\angle ABD$。',
        '(1) $CD+CE=CD+BD=BC=6$。',
        '(2) $CE=BD=6+2=8$。$\\angle ACE=\\angle ABD=60^\\circ$，$\\angle ACD=180^\\circ-60^\\circ=120^\\circ$，$E$ 在 $\\angle ACD$ 内，$\\angle DCE=120^\\circ-60^\\circ=60^\\circ$。',
        '(3) $\\triangle CDE$ 的周长 $=CD+CE+AD$。$D$ 在边 $BC$ 上时 $CD+CE=6$；$D$ 在 $C$ 外侧时 $CE-CD=6$，$CD+CE=6+2CD>6$；在 $B$ 外侧时同理 $CD+CE>6$。而 $AD\\geq AH$（$AH\\perp BC$ 于 $H$；$D$ 不在 $H$ 时，$\\triangle AHD$ 中直角最大，大角对大边，$AD>AH$）。所以 $D$ 与 $H$ 重合时周长最小，由三线合一 $BD=3$。',
        '这时 $\\angle ADC=90^\\circ$，$\\angle ADE=60^\\circ$，$E$ 与 $C$ 在 $AD$ 同侧，$\\angle CDE=30^\\circ$。思路：旋转给出 $CE=BD$，周长拆成“$CD+CE$”和“$AD$”两部分，两部分在 $D$ 位于中点时同时最小——要先按 $D$ 的位置分类比较 $CD+CE$。',
      ],
      verify: () => {
        // B=(0,0)，C=(6,0)，A=(3,3√3)（数学坐标），E 是 D 绕 A 逆时针转 60° 的像
        const A = [3, 3 * Math.sqrt(3)], C = [6, 0], t = Math.PI / 3, d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const E = D => { const v = [D[0] - A[0], D[1] - A[1]]; return [A[0] + v[0] * Math.cos(t) - v[1] * Math.sin(t), A[1] + v[0] * Math.sin(t) + v[1] * Math.cos(t)]; };
        const s1 = new Set([1, 2.5, 4.2].map(x => Math.round((d(C, [x, 0]) + d(C, E([x, 0]))) * 1e9) / 1e9));
        const D2 = [8, 0], E2 = E(D2);
        let best = Infinity, bx = null;
        for (let k = -1200; k <= 1800; k++) {
          const x = k / 100; if (Math.abs(x) < 1e-9 || Math.abs(x - 6) < 1e-9) continue;
          const Dp = [x, 0], per = d(C, Dp) + d(C, E(Dp)) + d(Dp, E(Dp));
          if (per < best - 1e-12) { best = per; bx = x; }
        }
        return [s1.size === 1 ? [...s1][0] : null, Math.round(d(C, E2) * 1e9) / 1e9, Math.round(SVG183.ang(C, D2, E2) * 1e6) / 1e6 + '°', bx, Math.round(SVG183.ang([bx, 0], C, E([bx, 0])) * 1e6) / 1e6 + '°'];
      },
    },
    {
      id: '18.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '$\\triangle ABC$ 是等边三角形，点 $D$ 与点 $A$ 在直线 $BC$ 的同侧（$D$ 不与 $A$ 重合），且 $\\angle BDC=60^\\circ$。(1) 如图，若 $BD=7$，$CD=3$，求 $AD$ 的长和 $\\angle ADB$ 的度数；(2) 若 $BD+CD=10$，$AD=4$，求 $BD$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG183.c03,
      blanks: [
        { kind: 'num', label: '(1) $AD=$', answer: '4' },
        { kind: 'angle', label: '$\\angle ADB=$', answer: '60°' },
        { kind: 'nums', label: '(2) $BD=$', answer: ['3', '7'] },
      ],
      explain: [
        '(1) 思路：$\\angle BDC=60^\\circ$，在较长的 $DB$ 上截取 $DE=DC=3$，连接 $CE$。$\\triangle DCE$ 是有一个角为 $60^\\circ$ 的等腰三角形，是等边三角形，$CE=CD$，$\\angle DCE=\\angle CED=60^\\circ$。',
        '$\\angle BCE=\\angle BCA-\\angle ECA=60^\\circ-\\angle ECA$，$\\angle ACD=\\angle DCE-\\angle ECA=60^\\circ-\\angle ECA$，所以 $\\angle BCE=\\angle ACD$。又 $BC=AC$，$CE=CD$，$\\triangle BCE\\cong\\triangle ACD$（SAS）。',
        '$AD=BE=BD-DE=7-3=4$；$\\angle ADC=\\angle BEC=180^\\circ-60^\\circ=120^\\circ$，$\\angle ADB=\\angle ADC-\\angle BDC=60^\\circ$。',
        '(2) 由 (1) 的方法：$BD>CD$ 时在 $DB$ 上截取，$AD=BD-CD$；$BD<CD$ 时在 $DC$ 上截取 $DE=DB$，同理 $AD=CD-BD$；$BD=CD$ 时 $\\triangle DBC$ 是有一个角为 $60^\\circ$ 的等腰三角形，即以 $BC$ 为边的等边三角形，它和 $\\triangle ABC$ 在 $BC$ 同侧，$D$ 与 $A$ 重合，不合题意。所以 $|BD-CD|=4$，又 $BD+CD=10$，$BD=7$ 或 $3$。',
        '思路：$60^\\circ$ 角配上“截长”造出等边三角形，再找共顶点的全等，得到 $AD=|BD-CD|$；第 (2) 问反过来用这个结论，还要按哪条边较长分类。',
      ],
      verify: () => {
        // 由 BD、CD 和 ∠BDC=60° 定出 BC，作等边三角形，求 AD
        const calc = (bd, cd) => {
          const bc = Math.sqrt(bd * bd + cd * cd - bd * cd), B = [0, 0], C = [bc, 0], A = [bc / 2, (bc * Math.sqrt(3)) / 2];
          const x = (bd * bd - cd * cd + bc * bc) / (2 * bc), D = [x, Math.sqrt(bd * bd - x * x)];
          return { ad: Math.hypot(A[0] - D[0], A[1] - D[1]), adb: SVG183.ang(D, A, B) };
        };
        const r1 = calc(7, 3), bds = [];
        for (let k = 1; k < 1000; k++) { const bd = k / 100; if (Math.abs(calc(bd, 10 - bd).ad - 4) < 1e-6) bds.push(bd); }
        return [Math.round(r1.ad * 1e9) / 1e9, Math.round(r1.adb * 1e6) / 1e6 + '°', bds];
      },
    },
    {
      id: '18.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '六边形 $ABCDEF$ 的六个内角都等于 $120^\\circ$。(1) 若它的六条边长是互不相等的正整数，且 $AB=10$，周长最小是多少？(2) 若六条边长恰好是 $1$、$2$、$3$、$4$、$5$、$6$（各用一次），且 $AB=1$，按 $AB$、$BC$、$CD$、$DE$、$EF$、$FA$ 的顺序写出的边长共有几种不同的排法？',
      blanks: [
        { kind: 'num', label: '(1) 周长最小', answer: '28' },
        { kind: 'num', label: '(2)', answer: '4', suffix: '种' },
      ],
      explain: [
        '先找边长之间的关系：延长 $AB$、$CD$、$EF$ 围成大三角形，三个角上切出的小三角形和大三角形都是等边三角形（角都是 $60^\\circ$），所以 $FA+AB+BC=BC+CD+DE=DE+EF+FA$，即 $AB-DE=EF-BC=CD-FA$（记这个公共的差为 $d$）。',
        '(1) 记 $d=AB-DE=10-DE$，则 $EF=BC+d$，$CD=FA+d$，周长 $=10+DE+(BC+EF)+(CD+FA)=10+(10-d)+(2BC+d)+(2FA+d)=20+d+2(BC+FA)$。$d>0$ 时 $d=10-DE$，周长 $=30-DE+2(BC+FA)$：$BC$、$FA$ 至少是 $1$、$2$，$DE$ 越大越好，但六个数要互不相等。$DE=9$（$d=1$）时 $BC+1$、$FA+1$ 会和 $1$、$2$ 撞车，$BC$、$FA$ 只能取 $1$、$3$ 等，周长 $\\geq30-9+8=29$；$DE=8$（$d=2$），$BC=1$，$FA=2$ 时 $EF=3$，$CD=4$，六边 $10,1,4,8,3,2$ 互不相等，周长 $30-8+6=28$；$DE\\leq7$ 时周长 $\\geq30-7+6=29$。$d<0$ 时设 $e=-d\\geq1$，$BC=EF+e\\geq1+e$，$FA=CD+e\\geq1+e$，又 $BC\\neq FA$，$BC+FA\\geq3+2e$，周长 $\\geq20-e+2(3+2e)=26+3e\\geq29$。所以最小是 $28$。',
        '(2) 把 $1\\sim6$ 分成三对（$AB$ 与 $DE$，$EF$ 与 $BC$，$CD$ 与 $FA$），每对前一个减后一个都等于同一个 $d$，$d\\neq0$。$1\\sim6$ 里差为 $d$ 的三对互不重叠的数对：$d=\\pm3$ 时是 $\\{1,4\\},\\{2,5\\},\\{3,6\\}$；$d=\\pm1$ 时是 $\\{1,2\\},\\{3,4\\},\\{5,6\\}$；$d=\\pm2$ 时 $1,3,5$ 和 $2,4,6$ 各自无法两两配成差 $2$ 的三对（三个数配不成对），不行。',
        '$AB=1$，它是第一对的前一个数，所以 $d=1-DE<0$。$d=-3$：$DE=4$，$\\{EF,BC\\}$、$\\{CD,FA\\}$ 分别是 $\\{2,5\\}$、$\\{3,6\\}$ 的某种安排（前一个小），有 $2$ 种；$d=-1$：$DE=2$，另两对是 $\\{3,4\\}$、$\\{5,6\\}$，也有 $2$ 种。共 $4$ 种。',
        '思路：先把“角都是 $120^\\circ$”转化成边长的等式（补成大等边三角形），再把问题变成整数的最值和计数；(1) 要把周长写成 $DE$、$BC$、$FA$ 的式子，再兼顾“互不相等”。',
      ],
      verify: () => {
        // 边向量方向依次为 0°、60°、…、300°，枚举边长检验闭合
        const close = s => { let x = 0, y = 0; s.forEach((l, i) => { x += l * Math.cos((i * Math.PI) / 3); y += l * Math.sin((i * Math.PI) / 3); }); return Math.abs(x) < 1e-9 && Math.abs(y) < 1e-9; };
        const perm = a => (a.length < 2 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));
        let best = Infinity;
        for (let b = 1; b < 25; b++) for (let c = 1; c < 25; c++) for (let dd = 1; dd < 25; dd++) {
          const k = 10 - dd, sides = [10, b, c, dd, b + k, c - k];  // AB、BC、CD、DE、EF、FA
          if (sides.some(x => x < 1) || new Set(sides).size < 6 || !close(sides)) continue;
          best = Math.min(best, sides.reduce((p, q) => p + q, 0));
        }
        const cnt = perm([1, 2, 3, 4, 5, 6]).filter(p => p[0] === 1 && close(p)).length;
        return [best, cnt];
      },
    },
    {
      id: '18.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，点 $P$ 在等边三角形 $ABC$ 的内部，$\\angle APB=130^\\circ$，$\\angle BPC=110^\\circ$。以 $PA$、$PB$、$PC$ 的长为三边可以组成一个三角形。(1) 求这个三角形的三个内角（全部填出，用逗号隔开）；(2) $PA$、$PB$、$PC$ 中最长的和最短的分别是哪条？',
      figure: FIG183.c05,
      blanks: [
        { kind: 'nums', label: '(1) 三个内角', answer: ['50', '60', '70'], suffix: '°' },
        { kind: 'text', label: '(2) 最长', answer: 'PC', options: ['PA', 'PB', 'PC'] },
        { kind: 'text', label: '最短', answer: 'PA', options: ['PA', 'PB', 'PC'] },
      ],
      explain: [
        '思路：三条线段从同一点出发，要把它们“拼”成一个三角形，用旋转 $60^\\circ$。把 $\\triangle APB$ 绕点 $B$ 旋转 $60^\\circ$，使 $A$ 转到 $C$，$P$ 转到 $P\'$，连接 $PP\'$。',
        '$BP=BP\'$，$\\angle PBP\'=60^\\circ$，所以 $\\triangle BPP\'$ 是等边三角形（有一个角是 $60^\\circ$ 的等腰三角形），$PP\'=PB$，$\\angle BPP\'=\\angle BP\'P=60^\\circ$。又 $P\'C=PA$。所以 $\\triangle PP\'C$ 的三边正好是 $PB$、$PA$、$PC$。',
        '(1) $\\angle BP\'C=\\angle BPA=130^\\circ$，$\\angle PP\'C=130^\\circ-60^\\circ=70^\\circ$；$\\angle P\'PC=\\angle BPC-60^\\circ=50^\\circ$；第三个角 $180^\\circ-70^\\circ-50^\\circ=60^\\circ$（也等于 $\\angle APC-60^\\circ=120^\\circ-60^\\circ$）。',
        '(2) 在 $\\triangle PP\'C$ 中：$70^\\circ$ 角 $\\angle PP\'C$ 的对边是 $PC$，$50^\\circ$ 角 $\\angle P\'PC$ 的对边是 $P\'C=PA$，$60^\\circ$ 角的对边是 $PP\'=PB$。大角对大边：$PC>PB>PA$，最长 $PC$，最短 $PA$。',
        '思路：旋转 $60^\\circ$ 造出等边三角形，把三条线段集中到一个三角形里，再把“比较线段”转化成“比较对角”。',
      ],
      verify: () => {
        // 数值找出满足两个角的点 P，再用余弦定理算以 PA、PB、PC 为边的三角形的角
        const S = SVG183, A = [0, -Math.sqrt(3)], B = [-1, 0], C = [1, 0], d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        const f = P => Math.abs(S.ang(P, A, B) - 130) + Math.abs(S.ang(P, B, C) - 110);
        let P = [0, -0.5], step = 0.1;
        for (let r = 0; r < 400; r++) {
          let cur = P;
          for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) { const Q = [P[0] + i * step, P[1] + j * step]; if (f(Q) < f(cur)) cur = Q; }
          if (cur === P) step /= 2; P = cur;
        }
        const a = d(P, A), b = d(P, B), c = d(P, C), ang = (o, p, q) => (Math.acos((p * p + q * q - o * o) / (2 * p * q)) * 180) / Math.PI;
        const angs = [ang(a, b, c), ang(b, a, c), ang(c, a, b)].map(x => Math.round(x * 1e4) / 1e4).sort((p, q) => p - q);
        const nm = ['PA', 'PB', 'PC'], len = [a, b, c];
        return [angs, nm[len.indexOf(Math.max(...len))], nm[len.indexOf(Math.min(...len))]];
      },
    },
  ],
});
