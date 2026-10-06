'use strict';

// 上海数学七年级下册 · 17.4 三角形全等的判定
// 知识范围：公理 SSS（及全等的传递性、三角形的稳定性）、公理 SAS、公理 ASA、定理 AAS；“边边角”不能判定全等；
//   尺规作图（作一条线段等于已知线段、作一个角等于已知角、过直线外一点作平行线），用全等说明作图的依据
// 可以使用：17.1～17.3（三边关系、内角和、外角、全等的性质）；第 16 章相交线与平行线；第 15 章不等式；七年级上册图形的运动
// 还没学：直角三角形的 HL 判定（八年级上册 22.1）；等腰三角形的性质与判定（18 章：等边对等角、等角对等边、三线合一）；
//   角平分线的性质定理（八年级上册）；勾股定理；本节题目中的“AB=AC”只当作两条边相等的条件，不能推出底角相等
// 本节约定：证明全等时按课本写出“在 △… 和 △… 中”和依据（SSS、SAS、ASA、AAS）

const SVG174 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  foot: (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
    return [a[0] + t * dx, a[1] + t * dy];
  },
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  rot: ([x, y], [cx, cy], deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)];
  },
};

const FIG174 = (() => {
  const S = SVG174, out = {};
  // b02：四边形 ABCD（A 在上、C 在下），连接 AC
  {
    const A = [150, 25], B = [60, 110], C = [150, 190], D = [240, 110];
    out.b02 = S.wrap(300, 215, S.poly([A, B, C, D]) + S.seg(A, C) + S.text('A', A, 0, -14) + S.text('B', B, -12, 0) + S.text('C', C, 0, 14) + S.text('D', D, 12, 0));
  }
  // e03：筝形 ABCD（AB=AD，CB=CD，C 离得远），连接 AC、BD
  {
    const A = [150, 25], B = [85, 85], C = [150, 225], D = [215, 85], O = [150, 85];
    out.e03 = S.wrap(300, 250, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D) + S.text('A', A, 0, -14) + S.text('B', B, -12, 0) + S.text('C', C, 0, 14) + S.text('D', D, 12, 0) + S.text('O', O, 10, 10));
  }
  // b04：AC 与 BD 交于 O
  {
    const A = [40, 40], C = [260, 170], B = [70, 170], D = [230, 40], O = S.meet(A, C, B, D);
    out.b04 = S.wrap(300, 200, S.seg(A, C) + S.seg(B, D) + S.seg(A, B) + S.seg(C, D) + S.text('A', A, -8, -10) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8) + S.text('D', D, 8, -10) + S.text('O', O, 0, 18));
  }
  // b05、e05：B、E、C、F 在同一直线上，△ABC 沿直线平移得 △DEF（b05：∠B=30°、∠ACB=70°；e05：∠B=75°、∠ACB=40°）
  {
    const tri = (angB, angC) => {
      const B = [20, 165], C = [190, 165];
      const A = S.meet(B, [B[0] + Math.cos((angB * Math.PI) / 180), B[1] - Math.sin((angB * Math.PI) / 180)],
        C, [C[0] + Math.cos(((180 - angC) * Math.PI) / 180), C[1] - Math.sin(((180 - angC) * Math.PI) / 180)]);
      const v = angB === 75 ? (C[0] - B[0]) / 3 : 85, E = [B[0] + v, B[1]], Fp = [C[0] + v, C[1]], D = [A[0] + v, A[1]];
      return { A, B, C, D, E, Fp };
    };
    const lab = ({ A, B, C, D, E, Fp }) => S.text('A', A, 0, -14) + S.text('B', B, -6, 14) + S.text('E', E, 0, 14) + S.text('C', C, 0, 14) + S.text('F', Fp, 6, 14) + S.text('D', D, 0, -14);
    const t1 = tri(30, 70);
    out.b05 = S.wrap(300, 190, S.poly([t1.A, t1.B, t1.C]) + S.poly([t1.D, t1.E, t1.Fp]) + lab(t1));
    const t2 = tri(75, 40), G = S.meet(t2.A, t2.C, t2.D, t2.E);
    out.e05 = S.wrap(300, 190, S.poly([t2.A, t2.B, t2.C]) + S.poly([t2.D, t2.E, t2.Fp]) + lab(t2) + S.text('G', G, 12, 0));
  }
  // b06：AD 是中线，BE⊥AD 于 E，CF⊥AD 的延长线于 F
  {
    const A = [70, 30], B = [30, 170], C = [270, 170], D = [150, 170];
    const ext = [D[0] + (D[0] - A[0]) * 0.45, D[1] + (D[1] - A[1]) * 0.45];
    const E = S.foot(B, A, D), Fp = S.foot(C, A, ext);
    out.b06 = S.wrap(300, 250, S.poly([A, B, C]) + S.seg(A, Fp) + S.seg(B, E) + S.seg(C, Fp)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 12, -6) + S.text('E', E, -12, -4) + S.text('F', Fp, 4, 14));
  }
  // b09 / e02：手拉手，AB=AC，AD=AE，∠BAC=∠DAE，连接 BD、CE（e02 中交于 F）
  {
    const A = [130, 90];
    const B = [79, 231], C = [181, 231];
    const D = [224, 106], E = S.rot(D, A, (Math.atan2(C[1] - A[1], C[0] - A[0]) - Math.atan2(B[1] - A[1], B[0] - A[0])) * 180 / Math.PI);
    const Fp = S.meet(B, D, C, E);
    const base = S.poly([A, B, C]) + S.poly([A, D, E]) + S.seg(B, D) + S.seg(C, E)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 4, 14) + S.text('D', D, 12, 0) + S.text('E', E, 10, 4);
    out.b09 = S.wrap(300, 255, base);
    out.e02 = S.wrap(300, 255, base + S.text('F', Fp, 12, 4));
  }
  // e01：四边形 ABCD（∠ABC=∠DAB=110°，DC 比 AB 长），对角线 AC、BD
  {
    const A = [110, 175], B = [190, 175];
    const C = S.meet(A, [A[0] + Math.cos((40 * Math.PI) / 180), A[1] - Math.sin((40 * Math.PI) / 180)], B, [B[0] + Math.cos((70 * Math.PI) / 180), B[1] - Math.sin((70 * Math.PI) / 180)]);
    const D = [A[0] + B[0] - C[0], C[1]];
    out.e01 = S.wrap(300, 200, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(B, D) + S.text('A', A, -8, 10) + S.text('B', B, 8, 10) + S.text('C', C, 10, -8) + S.text('D', D, -10, -8));
  }
  // e06：长方形 ABCD，P 在 BC 上，Q 在 CD 上
  {
    const k = 34, A = [30, 30], B = [30, 30 + 4 * k], C = [30 + 6 * k, 30 + 4 * k], D = [30 + 6 * k, 30];
    const P = [30 + 2 * k, B[1]], Q = [C[0], C[1] - 2 * k];
    out.e06 = S.wrap(280, 200, S.poly([A, B, C, D]) + S.seg(A, P) + S.seg(P, Q, true)
      + S.text('A', A, -10, -6) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8) + S.text('D', D, 10, -6) + S.text('P', P, 0, 14) + S.text('Q', Q, 12, 0));
  }
  // c01：AB∥CD，∠A=∠D=90°，AB=3，CD=5，AD=8（每单位 22px）；AE、DE 平分 ∠BAD、∠ADC，E 在 BC 上
  {
    const k = 22, P = ([x, y]) => [40 + x * k, 20 + y * k];
    const A = P([0, 0]), B = P([3, 0]), C = P([5, 8]), D = P([0, 8]), E = P([4, 4]);
    out.c01 = S.wrap(220, 215, S.poly([A, B, C, D]) + S.seg(A, E) + S.seg(D, E)
      + S.text('A', A, -10, -6) + S.text('B', B, 4, -12) + S.text('C', C, 10, 6) + S.text('D', D, -10, 8) + S.text('E', E, 12, 0));
  }
  // c03：正方形 ABCD，E 在 BC 上，F 在 CD 上，∠EAF=45°
  {
    const k = 30, A = [30, 20], B = [30, 20 + 6 * k], C = [30 + 6 * k, 20 + 6 * k], D = [30 + 6 * k, 20];
    const E = [30 + 2 * k, B[1]], Fp = [C[0], 20 + 3 * k];
    out.c03 = S.wrap(250, 220, S.poly([A, B, C, D]) + S.seg(A, E) + S.seg(A, Fp) + S.seg(E, Fp)
      + S.text('A', A, -10, -6) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8) + S.text('D', D, 10, -6) + S.text('E', E, 0, 14) + S.text('F', Fp, 12, 0));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s2/17.4',
  title: '三角形全等的判定',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“边边角”配 ssaSwing 动画。第 1 轮 e04 数据在几何上不成立（∠B=40°、AB=5 时距离不可能是 3），e01、c01、e03、b05 配图失真，卡片例子撞 b04、b07，e05 只有 2 级，c02、c03 偏易（c03 可用勾股绕过），c04 倍长中线是模板题，c05 有选项与 b08 重复；第 2 轮修正数据与配图，c02 加反求 BE，c03 改求定值周长与角的关系，c04 换成一线三垂直双动点分类，c05 换选项；按复核意见再把卡片改成文字情境（避免与 b01 选项相同），c04 换成原创数据（AC=8，BC=10，速度 1、2）后判定整节通过' },

  intro: [
    {
      title: '边边边（SSS）',
      body: '**公理**：三边对应相等的两个三角形全等。由它得到：三角形的三条边长确定后，形状和大小就完全确定了，这叫三角形的**稳定性**（自行车架、桥梁拉杆都用三角形结构）。',
      example: '用长 $3$ cm、$4$ cm、$5$ cm 的三根木条首尾钉成三角形，不论谁来钉、先钉哪根，钉出的三角形都能完全重合，架子也推不动。',
    },
    {
      title: '边角边（SAS）',
      body: '**公理**：两边及其**夹角**对应相等的两个三角形全等。夹角是这两条边组成的角；对顶角、公共角、“同一个角加上（减去）同一部分”常用来凑出相等的夹角。',
      example: '画两边分别为 $4$ cm、$3$ cm，它们的夹角为 $50^\\circ$ 的三角形：不论谁画，画出的三角形都能完全重合。',
    },
    {
      title: '角边角（ASA）与角角边（AAS）',
      body: '**公理**：两角及其**夹边**对应相等的两个三角形全等（ASA）。**定理**：两角对应相等，且其中一组等角的**对边**相等的两个三角形全等（AAS）——两个角相等，第三个角也相等，就化成了 ASA。',
      example: '已知三角形的两个角是 $40^\\circ$、$60^\\circ$，$40^\\circ$ 角的对边长 $5$：第三个角是 $80^\\circ$，这条边就夹在 $60^\\circ$、$80^\\circ$ 两角之间，于是化成了 ASA。',
    },
    {
      title: '“边边角”不能判定全等',
      body: '两边及其中一边的**对角**对应相等，两个三角形不一定全等：以另一边的端点为圆心画弧，可能和角的另一边交于两点。三个角对应相等也不一定全等（大小可以不同）。点「播放」看一看。',
      demo: { type: 'ssaSwing', angle: 40, c: 6, a: 4.5 },
    },
    {
      title: '尺规作图',
      body: '只用**没有刻度的直尺和圆规**作图叫尺规作图。作一个角等于已知角：以顶点为圆心画弧截得两点，再用同样的半径和两交点间的距离画弧。过直线外一点作平行线：先作一个同位角等于已知角。作法为什么正确，都可以用全等或平行线的判定来说明。',
      example: '作线段 $A\'B\'=AB$：在射线上用圆规截取，圆规两脚间的距离就是 $AB$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '17.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列条件中，不能判定 $\\triangle ABC\\cong\\triangle DEF$ 的是（　　）',
      options: ['$AB=DE$，$BC=EF$，$AC=DF$', '$AB=DE$，$\\angle B=\\angle E$，$BC=EF$', '$AB=DE$，$\\angle A=\\angle D$，$BC=EF$', '$\\angle A=\\angle D$，$\\angle B=\\angle E$，$AC=DF$'],
      answer: 2,
      explain: [
        'A：三边对应相等，SSS。B：$\\angle B$ 是 $AB$、$BC$ 的夹角，SAS。',
        'D：$AC$ 是 $\\angle B$ 的对边，两角及其中一角的对边，AAS。',
        'C：$\\angle A$ 不是 $AB$、$BC$ 的夹角（是 $BC$ 的对角），属于“边边角”，不能判定。选 C。坑：看到“两边一角”就以为是 SAS，要看角是不是夹角。',
      ],
    },
    {
      id: '17.4-b02',
      level: 'basic',
      type: 'multi',
      stem: '如图，在四边形 $ABCD$ 中，$AB=AD$，连接 $AC$。再添加下列哪个条件，可以判定 $\\triangle ABC\\cong\\triangle ADC$？（　　）',
      figure: FIG174.b02,
      options: ['$\\angle BAC=\\angle DAC$', '$BC=DC$', '$\\angle B=\\angle D$', '$\\angle BCA=\\angle DCA$'],
      answer: [0, 1],
      explain: [
        '已有 $AB=AD$，$AC=AC$（公共边）。',
        'A：$\\angle BAC=\\angle DAC$ 是这两边的夹角，SAS，可以。B：三边对应相等，SSS，可以。',
        'C、D：添的角都不是 $AB$、$AC$（或 $AD$、$AC$）的夹角，是“边边角”，不能判定。选 A、B。',
        '坑：D 中 $\\angle BCA$ 在公共边 $AC$ 的一端，看起来像“角边角”，但另一个角并没有给出。',
      ],
    },
    {
      id: '17.4-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列做法中，利用了三角形稳定性的是（　　）',
      options: ['用两颗钉子把木条固定在墙上', '在门框的一角钉上一根斜木条，使门框不变形', '把弯曲的公路改直，缩短路程', '用直尺和圆规作一个角等于已知角'],
      answer: 1,
      explain: [
        'B：斜木条和门框的两边组成三角形，三边长度固定，形状就不会改变，利用了三角形的稳定性。',
        'A 是“两点确定一条直线”；C 是“两点之间线段最短”；D 是尺规作图，依据是 SSS，但不是利用稳定性。选 B。',
        '坑：D 也和 SSS 有关，但“稳定性”指的是实际物体中三角形结构不易变形。',
      ],
    },
    {
      id: '17.4-b04',
      level: 'basic',
      type: 'choice',
      stem: '如图，$AC$ 与 $BD$ 相交于点 $O$，$OA=OC$，$OB=OD$。证明 $\\triangle AOB\\cong\\triangle COD$ 的依据是（　　）',
      figure: FIG174.b04,
      options: ['SSS', 'SAS', 'ASA', 'AAS'],
      answer: 1,
      explain: [
        '已知两组边：$OA=OC$，$OB=OD$。',
        '它们的夹角 $\\angle AOB$ 与 $\\angle COD$ 是对顶角，相等。',
        '两边及其夹角对应相等，依据是 SAS，选 B。坑：对顶角这个隐含条件要自己找出来；不知道 $AB$、$CD$ 的关系，不能用 SSS。',
      ],
    },
    {
      id: '17.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，点 $B$、$E$、$C$、$F$ 在同一直线上，$AB=DE$，$AC=DF$，$BE=CF$，$\\angle A=80^\\circ$，$\\angle B=30^\\circ$。求 $\\angle F$ 的度数。',
      figure: FIG174.b05,
      blanks: [
        { kind: 'angle', label: '$\\angle F=$', answer: '70°' },
      ],
      explain: [
        '$BE=CF$，两边同加 $EC$，得 $BC=EF$。',
        '在 $\\triangle ABC$ 和 $\\triangle DEF$ 中，$AB=DE$，$AC=DF$，$BC=EF$，所以 $\\triangle ABC\\cong\\triangle DEF$（SSS），$\\angle F=\\angle ACB$。',
        '$\\angle ACB=180^\\circ-80^\\circ-30^\\circ=70^\\circ$，所以 $\\angle F=70^\\circ$。坑：$BC=EF$ 要由 $BE=CF$ 加上公共部分得到，不能直接说。',
      ],
      verify: () => 180 - 80 - 30,
    },
    {
      id: '17.4-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，$AD$ 是 $\\triangle ABC$ 的中线，$BE\\perp AD$ 于点 $E$，$CF\\perp AD$ 的延长线于点 $F$，$BE=3$。求 $CF$ 的长。',
      figure: FIG174.b06,
      blanks: [
        { kind: 'num', label: '$CF=$', answer: '3' },
      ],
      explain: [
        '$AD$ 是中线，$BD=CD$。$\\angle BED=\\angle CFD=90^\\circ$，$\\angle BDE=\\angle CDF$（对顶角）。',
        '在 $\\triangle BDE$ 和 $\\triangle CDF$ 中，两角及其中一角的对边（$BD$ 是 $\\angle BED$ 的对边）对应相等，$\\triangle BDE\\cong\\triangle CDF$（AAS）。',
        '所以 $CF=BE=3$。坑：$BD$、$CD$ 不是两个角的夹边，要用 AAS 而不是 ASA。',
      ],
      verify: () => 3,
    },
    {
      id: '17.4-b07',
      level: 'basic',
      type: 'choice',
      stem: '用直尺和圆规作一个角等于已知角，能得到两个角相等，依据是（　　）',
      options: ['SAS', 'ASA', 'SSS', 'AAS'],
      answer: 2,
      explain: [
        '作图时：以两个角的顶点为圆心、同样的半径画弧，得到两组相等的线段；再用圆规量出两交点间的距离，截得第三组相等的线段。',
        '两个三角形的三边分别相等，由 SSS 得全等，对应角相等。选 C。',
        '坑：作图中没有用到“角相等”这个条件（要作的就是角），所以不能是 SAS、ASA、AAS。',
      ],
    },
    {
      id: '17.4-b08',
      level: 'basic',
      type: 'choice',
      stem: '下列命题中，真命题是（　　）',
      options: ['有两边和一个角对应相等的两个三角形全等', '三个角对应相等的两个三角形全等', '有两个角和一条边对应相等的两个三角形全等', '有一条边和一个角对应相等的两个三角形全等'],
      answer: 2,
      explain: [
        'A：“边边角”不能判定，假命题。B：三个角对应相等，大小可以不同，假命题。D：条件太少，假命题。',
        'C：两角和一边对应相等，这条边不论是两角的夹边（ASA）还是其中一角的对边（AAS），都能判定全等，真命题。选 C。',
        '坑：A 中如果那个角恰好是夹角就能判定，但命题说的是“一个角”，没有保证是夹角。',
      ],
    },
    {
      id: '17.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，$AB=AC$，$AD=AE$，$\\angle BAC=\\angle DAE$，连接 $BD$、$CE$，$\\angle ABD=20^\\circ$，$BD=7$。求 $CE$ 的长和 $\\angle ACE$ 的度数。',
      figure: FIG174.b09,
      blanks: [
        { kind: 'num', label: '$CE=$', answer: '7' },
        { kind: 'angle', label: '$\\angle ACE=$', answer: '20°' },
      ],
      explain: [
        '$\\angle BAC=\\angle DAE$，两边同加 $\\angle CAD$，得 $\\angle BAD=\\angle CAE$。',
        '在 $\\triangle ABD$ 和 $\\triangle ACE$ 中，$AB=AC$，$\\angle BAD=\\angle CAE$，$AD=AE$，所以 $\\triangle ABD\\cong\\triangle ACE$（SAS）。',
        '$CE=BD=7$，$\\angle ACE=\\angle ABD=20^\\circ$。坑：夹角 $\\angle BAD=\\angle CAE$ 不是直接给的，要用“同一个角加上同一部分”凑出来。',
      ],
      verify: () => [7, 20],
    },

    // ---------- 扩展 ----------
    {
      id: '17.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，四边形 $ABCD$ 的对角线 $AC$、$BD$ 相交，$AD=BC$，$AC=BD$，$\\angle ACB=30^\\circ$，$\\angle CAB=40^\\circ$。求 $\\angle ADB$ 和 $\\angle DAB$ 的度数。',
      figure: FIG174.e01,
      blanks: [
        { kind: 'angle', label: '$\\angle ADB=$', answer: '30°' },
        { kind: 'angle', label: '$\\angle DAB=$', answer: '110°' },
      ],
      explain: [
        '在 $\\triangle ABC$ 和 $\\triangle BAD$ 中，$BC=AD$，$AC=BD$，$AB=BA$（公共边），所以 $\\triangle ABC\\cong\\triangle BAD$（SSS）。',
        '对应关系：$A\\leftrightarrow B$，$B\\leftrightarrow A$，$C\\leftrightarrow D$。所以 $\\angle ADB=\\angle BCA=30^\\circ$，$\\angle DBA=\\angle CAB=40^\\circ$。',
        '在 $\\triangle ABD$ 中，$\\angle DAB=180^\\circ-30^\\circ-40^\\circ=110^\\circ$。',
        '转弯：公共边让人误以为 $A$ 对 $A$，要按“相等的边”确定对应关系：$BC$ 对 $AD$，说明 $C$ 对 $D$、$B$ 对 $A$。',
      ],
      verify: () => [30, 180 - 30 - 40],
    },
    {
      id: '17.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，$AB=AC$，$AD=AE$，$\\angle BAC=\\angle DAE=50^\\circ$，连接 $BD$、$CE$，$BD$ 与 $CE$ 相交于点 $F$。求 $\\angle BFC$ 的度数。',
      figure: FIG174.e02,
      blanks: [
        { kind: 'angle', label: '$\\angle BFC=$', answer: '50°' },
      ],
      explain: [
        '同 b09 的方法：$\\angle BAD=\\angle CAE$，$\\triangle ABD\\cong\\triangle ACE$（SAS），所以 $\\angle ABD=\\angle ACE$。',
        '设 $AC$ 与 $BF$ 交于点 $G$。$\\triangle ABG$ 与 $\\triangle FCG$ 有一对对顶角 $\\angle AGB=\\angle FGC$（“8 字形”），所以 $\\angle BAG+\\angle ABG=\\angle GFC+\\angle GCF$。',
        '由 $\\angle ABG=\\angle GCF$，得 $\\angle BFC=\\angle BAC=50^\\circ$。',
        '转弯：先用全等得到一对角相等，再借“8 字形”把这对角消掉，$\\angle BFC$ 等于两个三角形的顶角。',
      ],
      verify: () => {
        // 一般位置检验：手拉手图形中，直线 BD、CE 的夹角等于 ∠BAC
        const rot = ([x, y], d) => { const a = (d * Math.PI) / 180; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; };
        const B = [-3, -5], C = rot(B, 50), D = [6, 1], E = rot(D, 50);
        const d1 = Math.atan2(D[1] - B[1], D[0] - B[0]), d2 = Math.atan2(E[1] - C[1], E[0] - C[0]);
        let x = (Math.abs(d1 - d2) * 180) / Math.PI % 180;
        if (x > 90) x = 180 - x;
        return Math.round(x * 1e6) / 1e6;
      },
    },
    {
      id: '17.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，在四边形 $ABCD$ 中，$AB=AD$，$CB=CD$，对角线 $AC$、$BD$ 相交于点 $O$。图中共有几对全等三角形？',
      figure: FIG174.e03,
      blanks: [
        { kind: 'num', label: '', answer: '3', suffix: '对' },
      ],
      explain: [
        '① $\\triangle ABC\\cong\\triangle ADC$：$AB=AD$，$CB=CD$，$AC=AC$（SSS）。于是 $\\angle BAO=\\angle DAO$，$\\angle BCO=\\angle DCO$。',
        '② $\\triangle ABO\\cong\\triangle ADO$：$AB=AD$，$\\angle BAO=\\angle DAO$，$AO=AO$（SAS）。',
        '③ $\\triangle CBO\\cong\\triangle CDO$：$CB=CD$，$\\angle BCO=\\angle DCO$，$CO=CO$（SAS）。',
        '其他三角形（如 $\\triangle ABD$ 与 $\\triangle CBD$）一般不全等。共 $3$ 对。转弯：② ③ 要先用 ① 的结论得到夹角相等，不能直接看出来。',
      ],
      verify: () => 3,
    },
    {
      id: '17.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\angle ABM$ 是锐角，点 $A$ 到射线 $BM$ 所在直线的距离为 $3$，$AB=5$。在射线 $BM$ 上取点 $C$，使 $AC=x$。当以 $A$、$B$、$C$ 为顶点的三角形恰好有两个（两个三角形不全等）时，求 $x$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '', answer: '3<x<5' },
      ],
      explain: [
        '已知 $AB$ 和 $\\angle B$，再给出 $\\angle B$ 的对边 $AC=x$，这是“边边角”的情况：以 $A$ 为圆心、$x$ 为半径画弧，看它和射线 $BM$ 有几个交点（交点不能是 $B$）。',
        '设 $A$ 到 $BM$ 的垂线段为 $AH$，$AH=3$。$x<3$ 时弧碰不到射线，$0$ 个；$x=3$ 时只碰到点 $H$，$1$ 个。',
        '$3<x<5$ 时，弧与直线 $BM$ 交于 $H$ 两侧的两点，而且这两点都在射线 $BM$ 上（离 $A$ 的距离小于 $AB=5$，都在 $B$ 的同一侧），得到两个不全等的三角形。',
        '$x=5$ 时，一个交点就是 $B$，只剩 $1$ 个三角形；$x>5$ 时另一个交点跑到射线的反向延长线上，也只有 $1$ 个。所以 $3<x<5$。转弯：这正是“边边角不能判定全等”的情形，要找出两个交点同时落在射线上的条件。',
      ],
      verify: () => {
        // B 在原点，射线 BM 沿 x 轴正方向，A=(4,3)（AB=5，到 BM 距离 3）；AC=x 时 C=(4±√(x²−9), 0)，C 的横坐标要大于 0
        const cnt = x => {
          if (x < 3) return 0;
          const r = Math.sqrt(x * x - 9);
          return [4 - r, 4 + r].filter((c, i, a) => c > 1e-9 && a.indexOf(c) === i).length;
        };
        const ok = [];
        for (let k = 1; k <= 40; k++) { const x = k / 4; if (cnt(x) === 2) ok.push(x); }
        return ok[0] === 3.25 && ok[ok.length - 1] === 4.75 ? '3<x<5' : null;
      },
    },
    {
      id: '17.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，点 $B$、$E$、$C$、$F$ 在同一直线上，$AB=DE$，$\\angle B=\\angle DEF$，$BE=CF$，$AC$ 与 $DE$ 相交于点 $G$，$\\angle A=65^\\circ$，$\\angle ACB=40^\\circ$。求 $\\angle D$ 和 $\\angle EGC$ 的度数；若又知 $BE=\\frac12EC$，$BF=12$，求 $EC$ 的长。',
      figure: FIG174.e05,
      blanks: [
        { kind: 'angle', label: '$\\angle D=$', answer: '65°' },
        { kind: 'angle', label: '$\\angle EGC=$', answer: '65°' },
        { kind: 'num', label: '$EC=$', answer: '6' },
      ],
      explain: [
        '$BE=CF$，加上 $EC$，$BC=EF$。在 $\\triangle ABC$ 和 $\\triangle DEF$ 中，$AB=DE$，$\\angle B=\\angle DEF$，$BC=EF$，所以 $\\triangle ABC\\cong\\triangle DEF$（SAS），$\\angle D=\\angle A=65^\\circ$。',
        '$\\angle B=180^\\circ-65^\\circ-40^\\circ=75^\\circ$，所以 $\\angle GEC=\\angle DEF=75^\\circ$。',
        '在 $\\triangle GEC$ 中，$\\angle EGC=180^\\circ-75^\\circ-40^\\circ=65^\\circ$。',
        '设 $EC=x$，则 $BE=CF=\\frac x2$，$BF=BE+EC+CF=2x=12$，$EC=6$。转弯：$\\angle EGC$ 所在的三角形里，$\\angle GEC$ 要借全等的条件 $\\angle DEF=\\angle B$ 求出；长度要先由 $BC=EF$ 得到 $BE=CF$。',
      ],
      verify: () => { const b = 180 - 65 - 40; return [65, 180 - b - 40, 12 / 2]; },
    },
    {
      id: '17.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，在长方形 $ABCD$ 中，$AB=4$，$BC=6$。点 $P$ 从 $B$ 出发沿 $BC$ 向 $C$ 以每秒 $2$ 个单位运动，同时点 $Q$ 从 $C$ 出发沿 $CD$ 向 $D$ 以每秒 $v$ 个单位运动（其中一点到达终点时，两点都停止）。若某一时刻以 $A$、$B$、$P$ 为顶点的三角形与以 $P$、$C$、$Q$ 为顶点的三角形全等，求 $v$ 的值（全部填出，用逗号隔开）。',
      figure: FIG174.e06,
      blanks: [
        { kind: 'nums', label: '$v=$', answer: ['2', '8/3'] },
      ],
      explain: [
        '设运动了 $t$ 秒，$BP=2t$，$PC=6-2t$，$CQ=vt$。两个三角形分别以 $\\angle B$、$\\angle C$ 为直角，直角要对应，再分两种对应关系，用 SAS：',
        '① $AB=PC$，$BP=CQ$：$4=6-2t$，$t=1$；$CQ=BP=2$，$v=2$。',
        '② $AB=QC$，$BP=CP$：$BP=CP=3$，$t=\\frac32$；$CQ=AB=4$，$v=4\\div\\frac32=\\frac83$。',
        '检验：两种情况在那一时刻 $P$ 在 $BC$ 上、$Q$ 在 $CD$ 上，两点都还没有到达终点（$Q$ 到 $D$ 分别要 $2$ 秒、$1.5$ 秒，都不早于对应时刻；$v=\\frac83$ 时全等的时刻正好是 $Q$ 到达 $D$、两点停止的时刻，这一刻计入）。所以 $v=2$ 或 $\\frac83$。转弯：对应关系不确定，按“直角两边谁对谁”分类，每类列两个方程。',
      ],
      verify: () => {
        // 枚举两种对应：① AB=PC、BP=CQ；② AB=QC、BP=CP（t 以 1/100 秒为步长，P 未到 C）
        const r = [];
        for (let k = 1; k < 300; k++) {
          const t = F(k).div(100), bp = t.mul(2), pc = F(6).sub(bp);
          if (pc.eq(4)) r.push(bp.div(t));          // ① CQ=BP
          if (bp.eq(pc)) r.push(F(4).div(t));       // ② CQ=AB
        }
        return r;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '17.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在四边形 $ABCD$ 中，$AB\\parallel CD$，$AE$、$DE$ 分别平分 $\\angle BAD$、$\\angle ADC$，点 $E$ 在 $BC$ 上，$AB=3$，$CD=5$。求 $AD$ 的长和 $\\angle AED$ 的度数。',
      figure: FIG174.c01,
      blanks: [
        { kind: 'num', label: '$AD=$', answer: '8' },
        { kind: 'angle', label: '$\\angle AED=$', answer: '90°' },
      ],
      explain: [
        '求 $\\angle AED$：$AB\\parallel CD$，$\\angle BAD+\\angle ADC=180^\\circ$，平分后 $\\angle EAD+\\angle EDA=90^\\circ$，所以 $\\angle AED=90^\\circ$。',
        '求 $AD$（截长）：在 $AD$ 上截取 $AF=AB=3$，连接 $EF$。在 $\\triangle ABE$ 和 $\\triangle AFE$ 中，$AB=AF$，$\\angle BAE=\\angle FAE$，$AE=AE$，所以 $\\triangle ABE\\cong\\triangle AFE$（SAS），$\\angle AFE=\\angle B$。',
        '$\\angle DFE=180^\\circ-\\angle AFE=180^\\circ-\\angle B$；而 $AB\\parallel CD$，$\\angle B+\\angle C=180^\\circ$，所以 $\\angle DFE=\\angle C$。',
        '在 $\\triangle DFE$ 和 $\\triangle DCE$ 中，$\\angle DFE=\\angle C$，$\\angle FDE=\\angle CDE$，$DE=DE$，所以 $\\triangle DFE\\cong\\triangle DCE$（AAS），$DF=DC=5$。',
        '$AD=AF+FD=3+5=8$。思路：要证一条线段等于另两条之和，就在长线段上截出一段等于其中一条，再证剩下的一段等于另一条，两次全等分别用 SAS 和 AAS。',
      ],
      verify: () => [3 + 5, 180 - 180 / 2],  // AF+FD；∠EAD+∠EDA=½(∠BAD+∠ADC)=90°
    },
    {
      id: '17.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$AC=BC$。直线 $l$ 经过点 $C$（不与 $AC$、$BC$ 重合），$AD\\perp l$ 于点 $D$，$BE\\perp l$ 于点 $E$。(1) 若 $AD=6$，$BE=2$，求 $DE$ 的长；(2) 若 $AD=6$，$DE=4$，求 $BE$ 的长。（每问有几个填几个，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $DE=$', answer: ['8', '4'] },
        { kind: 'nums', label: '(2) $BE=$', answer: ['2', '10'] },
      ],
      explain: [
        '先证全等（一线三垂直）：$\\angle ADC=\\angle CEB=90^\\circ$。不论 $l$ 怎样放，$\\angle ACD$ 与 $\\angle BCE$ 都互余（$\\angle ACB=90^\\circ$），又 $\\angle ACD$ 与 $\\angle CAD$ 互余，所以 $\\angle CAD=\\angle BCE$。由 $AC=CB$，得 $\\triangle ACD\\cong\\triangle CBE$（AAS），$CD=BE$，$CE=AD$。',
        '再看 $D$、$E$ 的位置：$l$ 在 $\\triangle ABC$ 外部（$A$、$B$ 在 $l$ 同侧）时，$D$、$E$ 在 $C$ 的两侧，$DE=CD+CE=BE+AD$；$l$ 穿过三角形内部（$A$、$B$ 在 $l$ 两侧）时，$D$、$E$ 在 $C$ 的同侧，$DE=|CE-CD|=|AD-BE|$。',
        '(1) $DE=6+2=8$，或 $DE=6-2=4$。',
        '(2) 若 $l$ 在外部，$DE=AD+BE\\geq6$，与 $DE=4$ 矛盾；所以 $l$ 穿过内部，$|6-BE|=4$，$BE=2$ 或 $10$。两种都能画出：$BE=2$ 时 $CE=6$、$CD=2$；$BE=10$ 时 $CD=10$、$CE=6$，$D$ 比 $E$ 离 $C$ 更远。',
        '思路：先用“同角的余角相等”证全等，把 $DE$ 拆成 $CD$、$CE$；再按 $l$ 的位置分出“和”与“差”两种关系，(2) 还要用“和”的情况不可能来排除，并在“差”里再分谁大谁小。',
      ],
      verify: () => {
        // 以 l 为 x 轴、C 为原点：A=(x,y)，B 由 A 绕 C 转 ±90° 得到；AD=|A 的纵坐标|，BE=|B 的纵坐标|，DE=两点横坐标之差
        const cases = [];
        for (const ax of [-10, -6, -4, -2, 2, 4, 6, 10]) for (const ay of [-6, 6]) for (const sgn of [1, -1]) {
          const B = sgn > 0 ? [-ay, ax] : [ay, -ax];
          cases.push({ AD: Math.abs(ay), BE: Math.abs(B[1]), DE: Math.abs(ax - B[0]) });
        }
        const q1 = [...new Set(cases.filter(c => c.AD === 6 && c.BE === 2).map(c => c.DE))].sort((p, q) => q - p);
        const q2 = [...new Set(cases.filter(c => c.AD === 6 && c.DE === 4).map(c => c.BE))].sort((p, q) => p - q);
        return [q1, q2];
      },
    },
    {
      id: '17.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 的边长为 $6$，点 $E$ 在 $BC$ 上，点 $F$ 在 $CD$ 上（都不与正方形的顶点重合），$\\angle EAF=45^\\circ$（$E$、$F$ 的具体位置不确定）。(1) 求 $\\triangle CEF$ 的周长；(2) 判断 $\\angle AEB$ 与 $\\angle AEF$ 的大小关系。',
      figure: FIG174.c03,
      blanks: [
        { kind: 'num', label: '(1) 周长', answer: '12' },
        { kind: 'text', label: '(2) $\\angle AEB$ 与 $\\angle AEF$', answer: '相等', options: ['相等', '互补', '不能确定'] },
      ],
      explain: [
        '思路：$BE$、$DF$ 分在两处，又不知道长度，要把它们“接”起来——在 $CB$ 的延长线上截取 $BG=DF$，连接 $AG$。',
        '在 $\\triangle ABG$ 和 $\\triangle ADF$ 中，$AB=AD$，$\\angle ABG=\\angle D=90^\\circ$，$BG=DF$，所以 $\\triangle ABG\\cong\\triangle ADF$（SAS），$AG=AF$，$\\angle BAG=\\angle DAF$。',
        '$\\angle GAE=\\angle BAG+\\angle BAE=\\angle DAF+\\angle BAE=90^\\circ-\\angle EAF=45^\\circ=\\angle FAE$。在 $\\triangle AEG$ 和 $\\triangle AEF$ 中，$AG=AF$，$\\angle GAE=\\angle FAE$，$AE=AE$，所以 $\\triangle AEG\\cong\\triangle AEF$（SAS）。',
        '(1) $EF=EG=BE+BG=BE+DF$。$\\triangle CEF$ 的周长 $=CE+CF+EF=CE+CF+BE+DF=(CE+BE)+(CF+DF)=6+6=12$，与 $E$、$F$ 的位置无关。',
        '(2) 由 $\\triangle AEG\\cong\\triangle AEF$，$\\angle AEG=\\angle AEF$，而 $\\angle AEG$ 就是 $\\angle AEB$，所以两角相等，即 $AE$ 平分 $\\angle BEF$。关键：用 SAS 构造全等，把 $45^\\circ$ “补”成两个相等的角；长度都不知道，靠“拼接”得到定值。',
      ],
      verify: () => {
        // A(0,6)，B(0,0)，C(6,0)，D(6,6)。E=(e,0)，求 F=(6,f) 使 ∠EAF=45°，检查周长与两角
        const ang = (p, q, r) => { let d = Math.abs(Math.atan2(q[1] - p[1], q[0] - p[0]) - Math.atan2(r[1] - p[1], r[0] - p[0])) * 180 / Math.PI; return d > 180 ? 360 - d : d; };
        const A = [0, 6], B = [0, 0];
        const per = [], eq = [];
        for (const e of [1, 2, 3, 4.5]) {
          const E = [e, 0];
          // F 在 CD 上从 C 往 D 移动时 ∠EAF 单调变化，先粗扫找到跨过 45° 的位置，再二分
          let lo = 0, hi = 6;
          const f = m => ang(A, E, [6, m]) - 45;
          for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; }
          const Fp = [6, (lo + hi) / 2];
          per.push((6 - e) + Fp[1] + Math.hypot(6 - e, Fp[1]));
          eq.push(Math.abs(ang(E, A, B) - ang(E, A, Fp)) < 1e-6);
        }
        return per.every(p => Math.abs(p - 12) < 1e-6) && eq.every(Boolean) ? [12, '相等'] : null;
      },
    },
    {
      id: '17.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$AC=8$，$BC=10$。直线 $l$ 经过点 $C$，且在 $\\triangle ABC$ 的外部。点 $P$ 从点 $A$ 出发，沿 $A\\to C\\to B$ 以每秒 $1$ 个单位运动，到 $B$ 停止；点 $Q$ 同时从点 $B$ 出发，沿 $B\\to C\\to A$ 以每秒 $2$ 个单位运动，到 $A$ 停止。过 $P$、$Q$ 分别作 $PE\\perp l$ 于 $E$、$QF\\perp l$ 于 $F$。当以 $P$、$E$、$C$ 为顶点的三角形与以 $C$、$F$、$Q$ 为顶点的三角形全等时（包括 $P$、$Q$ 重合的情形），求运动时间 $t$ 的所有值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$t=$', answer: ['2', '6', '16'], suffix: '秒' },
      ],
      explain: [
        '先说明：$P$、$Q$ 分别在 $\\angle ACB$ 的两边上时，$\\angle PCE$ 与 $\\angle QCF$ 互余（$l$ 在三角形外，$\\angle ACB=90^\\circ$），所以 $\\angle EPC=\\angle FCQ$；又 $\\angle PEC=\\angle CFQ=90^\\circ$，两个三角形全等只差“斜边” $PC=CQ$（AAS）。$P$、$Q$ 重合时两个三角形重合。所以条件就是 $PC=CQ$。',
        '分段写出 $PC$、$CQ$：$P$ 到 $C$ 要 $8$ 秒，到 $B$ 要 $18$ 秒；$Q$ 到 $C$ 要 $5$ 秒，到 $A$ 要 $9$ 秒，之后停在 $A$。',
        '① $0<t\\leq5$：$P$ 在 $AC$ 上，$PC=8-t$；$Q$ 在 $BC$ 上，$CQ=10-2t$。$8-t=10-2t$，$t=2$，符合。',
        '② $5<t\\leq8$：$P$、$Q$ 都在 $CA$ 上，$PC=8-t$，$CQ=2t-10$。$8-t=2t-10$，$t=6$，此时两点重合，符合。',
        '③ $8<t\\leq9$：$P$ 在 $CB$ 上，$PC=t-8$；$Q$ 仍在 $CA$ 上，$CQ=2t-10$。$t-8=2t-10$ 得 $t=2$，不在这一段。④ $9<t\\leq18$：$Q$ 停在 $A$，$CQ=8$；$PC=t-8=8$，$t=16$，符合（$P$、$Q$ 分在两边）。',
        '所以 $t=2$、$6$ 或 $16$。思路：先把“全等”化成一个条件 $PC=CQ$（一线三垂直），再按两点各自所在的线段分段列方程，每段检验时间范围；$Q$ 停下后 $P$ 还在动，不能漏掉最后一段。',
      ],
      verify: () => {
        const pc = t => (t <= 8 ? 8 - t : t - 8);
        const cq = t => (t <= 5 ? 10 - 2 * t : t <= 9 ? 2 * t - 10 : 8);
        const r = [];
        for (let k = 1; k <= 108; k++) { const t = k / 6; if (Math.abs(pc(t) - cq(t)) < 1e-9) r.push(F(k).div(6)); }
        return r;
      },
    },
    {
      id: '17.4-c05',
      level: 'challenge',
      type: 'multi',
      stem: '下列各组条件中，能保证两个三角形全等的有（　　）',
      options: [
        '两边及其中一边上的中线对应相等',
        '两边及第三边上的高对应相等',
        '两角及其中一个角的平分线对应相等',
        '两边及第三边上的中线对应相等',
        '两边及其中一边上的高对应相等',
      ],
      answer: [0, 2, 3],
      explain: [
        'A：设 $AB=A\'B\'$，$BC=B\'C\'$，中线 $AD=A\'D\'$（在 $BC$、$B\'C\'$ 上）。$BD=\\frac12BC=B\'D\'$，SSS 得 $\\triangle ABD\\cong\\triangle A\'B\'D\'$，$\\angle B=\\angle B\'$，再由 SAS 得原三角形全等。能。',
        'B：反例：$AB$、$AC$ 和 $BC$ 上的高 $AH$ 都相同，但一个三角形的 $B$、$C$ 在 $H$ 两侧，另一个在 $H$ 同侧，第三边不同。不能。',
        'C：两角对应相等，第三个角也相等。设 $\\angle A$ 的平分线 $AD=A\'D\'$：在 $\\triangle ABD$ 与 $\\triangle A\'B\'D\'$ 中，$\\angle B=\\angle B\'$，$\\angle BAD=\\frac12\\angle A=\\angle B\'A\'D\'$，$AD=A\'D\'$，AAS 得 $AB=A\'B\'$，再由 ASA 得原三角形全等。能。',
        'D：设 $AB=A\'B\'$，$AC=A\'C\'$，$BC$ 上的中线 $AD=A\'D\'$。延长 $AD$ 到 $G$ 使 $DG=AD$，由 SAS 得 $\\triangle ABD\\cong\\triangle GCD$，$CG=AB$，$\\angle G=\\angle BAD$。另一个三角形同样作出 $G\'$。在 $\\triangle ACG$ 与 $\\triangle A\'C\'G\'$ 中三边对应相等（$AC$、$CG=AB$、$AG=2AD$），SSS 得全等，于是 $\\angle CAG=\\angle C\'A\'G\'$，$\\angle BAD=\\angle G=\\angle G\'=\\angle B\'A\'D\'$，所以 $\\angle BAC=\\angle B\'A\'C\'$，再由 SAS 得原三角形全等。能。',
        'E：反例：$AB=A\'B\'=5$，$AC=A\'C\'=6$，$AC$ 边上的高（$B$ 到直线 $AC$ 的距离）都是 $4$，但一个三角形中垂足落在线段 $AC$ 上（$\\angle A$ 是锐角），另一个落在 $CA$ 的延长线上（$\\angle A$ 是钝角），不全等。不能。选 A、C、D。',
        '思路：条件里有中线、高、角平分线时，先在“小三角形”里用判定得到新的边或角，再回到原三角形；第三边上的中线要倍长；判断“不能”时给出垂足位置不同的反例。',
      ],
    },
  ],
});
