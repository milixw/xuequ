'use strict';

// 上海数学八年级上册 · 22.1 直角三角形
// 知识范围：直角三角形两锐角互余及其逆定理；斜边上的中线等于斜边的一半，及其逆命题（一边上的中线等于这边的一半 → 直角三角形，课本例 1）；
//   含 30° 角的直角三角形中，30° 角所对的直角边等于斜边的一半（课本例 2）；直角三角形全等的判定定理（斜边和一条直角边对应相等）；尺规作直角三角形
// 可以使用：第 17、18 章（三角形、全等、等腰与等边三角形、垂直平分线）；19～21 章（实数、二次根式、一元二次方程）
// 还没学：角平分线性质定理与内心（22.2）；勾股定理及逆定理、“斜边大于直角边”“垂线段最短”（22.3）；平行四边形、矩形的性质、三角形中位线、相似、三角比、圆
// 本节约定：课本不用“HL”简称，解析写“斜边、直角边”；“30° 角所对直角边等于斜边一半”的逆命题课本没讲，用到时在解析里用斜边上的中线推一遍

const SVG221 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: P => `<circle cx="${P[0].toFixed(1)}" cy="${P[1].toFixed(1)}" r="2.5" fill="#2b2b2b"/>`,
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  mid: (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2],
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  // 由底边 BC（水平）和两个底角求顶点 A（屏幕坐标，A 在上方）
  apex: (B, C, angB, angC) => SVG221.meet(B, [B[0] + Math.cos((angB * Math.PI) / 180), B[1] - Math.sin((angB * Math.PI) / 180)],
    C, [C[0] - Math.cos((angC * Math.PI) / 180), C[1] - Math.sin((angC * Math.PI) / 180)]),
  // 点 P 在直线 QR 上的垂足
  foot: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    return [Q[0] + t * u[0], Q[1] + t * u[1]];
  },
  // 点 P 关于直线 QR 的对称点
  refl: (P, Q, R) => { const F = SVG221.foot(P, Q, R); return [2 * F[0] - P[0], 2 * F[1] - P[1]]; },
  ang: (P, Q, R) => {  // ∠QPR（度）
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)))) * 180) / Math.PI;
  },
  // 直角记号：顶点 P，两边分别朝 Q、R
  rt: (P, Q, R, s = 9) => {
    const e = X => { const d = SVG221.dist(P, X); return [(X[0] - P[0]) / d * s, (X[1] - P[1]) / d * s]; };
    const u = e(Q), v = e(R);
    return `<polyline points="${[[P[0] + u[0], P[1] + u[1]], [P[0] + u[0] + v[0], P[1] + u[1] + v[1]], [P[0] + v[0], P[1] + v[1]]].map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1"/>`;
  },
  // 圆弧（圆心 O、半径 r，从角 a1 到 a2，屏幕坐标里的角度，单位度）
  arc: (O, r, a1, a2) => {
    const p = a => [O[0] + r * Math.cos((a * Math.PI) / 180), O[1] + r * Math.sin((a * Math.PI) / 180)];
    const s = p(a1), e = p(a2);
    return `<path d="M${s[0].toFixed(1)},${s[1].toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${e[0].toFixed(1)},${e[1].toFixed(1)}" fill="none" stroke="#2b2b2b" stroke-width="1.1"/>`;
  },
};

const FIG221 = (() => {
  const S = SVG221, out = {};
  // b02：∠ACB=90°，∠A=28°，CD 是斜边上的中线，CE⊥AB
  {
    const A = [20, 200], B = [300, 200], C = S.apex(A, B, 28, 62), D = S.mid(A, B), E = S.foot(C, A, B);
    out.b02 = S.wrap(320, 225, S.poly([A, B, C]) + S.seg(C, D) + S.seg(C, E) + S.rt(C, A, B) + S.rt(E, B, C, 7)
      + S.text('A', A, -10, 4) + S.text('B', B, 10, 4) + S.text('C', C, 0, -14) + S.text('D', D, 0, 14) + S.text('E', E, 0, 14));
  }
  // b03：∠ACB=90°，∠A=30°，CD⊥AB，BD=2（按 AB=8，每单位 34px）
  {
    const A = [20, 190], B = [292, 190], C = S.apex(A, B, 30, 60), D = S.foot(C, A, B);
    out.b03 = S.wrap(320, 215, S.poly([A, B, C]) + S.seg(C, D) + S.rt(C, A, B) + S.rt(D, B, C, 7)
      + S.text('A', A, -10, 4) + S.text('B', B, 10, 4) + S.text('C', C, 0, -14) + S.text('D', D, 0, 14));
  }
  // b04：作 AC=b，过 C 作 MN⊥AC，以 A 为圆心、c 为半径画弧交 MN 于 B、B′
  {
    const A = [160, 30], C = [160, 170], B = [70, 170], B2 = [250, 170], r = S.dist(A, B);
    const deg = P => (Math.atan2(P[1] - A[1], P[0] - A[0]) * 180) / Math.PI;
    out.b04 = S.wrap(320, 200, S.seg([20, 170], [300, 170]) + S.seg(A, C) + S.seg(A, B) + S.seg(A, B2) + S.rt(C, A, B2)
      + S.arc(A, r, deg(B2) - 8, deg(B2) + 8) + S.arc(A, r, deg(B) - 8, deg(B) + 8)
      + S.text('A', A, 0, -14) + S.text('C', C, 8, 14) + S.text('B', B, -4, 14) + S.text('B′', B2, 6, 14) + S.text('M', [20, 170], 0, 14) + S.text('N', [300, 170], 0, 14));
  }
  // b05：AB⊥BC，DC⊥BC，E 在 BC 上，AB=EC=3，BE=CD=7（每单位 24px）
  {
    const k = 24, B = [30, 200], A = [30, 200 - 3 * k], E = [30 + 7 * k, 200], C = [30 + 10 * k, 200], D = [30 + 10 * k, 200 - 7 * k];
    out.b05 = S.wrap(300, 225, S.seg(A, B) + S.seg(B, C) + S.seg(C, D) + S.seg(A, E) + S.seg(E, D) + S.rt(B, A, C) + S.rt(C, B, D)
      + S.text('A', A, -10, -4) + S.text('B', B, -10, 6) + S.text('E', E, 0, 14) + S.text('C', C, 10, 6) + S.text('D', D, 10, -4));
  }
  // b06：D 是 AB 的中点，CD=AD，∠A=35°
  {
    const A = [20, 190], B = [300, 190], C = S.apex(A, B, 35, 55), D = S.mid(A, B);
    out.b06 = S.wrap(320, 215, S.poly([A, B, C]) + S.seg(C, D)
      + S.text('A', A, -10, 4) + S.text('B', B, 10, 4) + S.text('C', C, 0, -14) + S.text('D', D, 0, 14));
  }
  // b07：∠B=30°，AB=10，BC=14（每单位 19px）
  {
    const k = 19, B = [20, 130], C = [20 + 14 * k, 130], A = [20 + 10 * k * Math.cos(Math.PI / 6), 130 - 10 * k * Math.sin(Math.PI / 6)];
    out.b07 = S.wrap(310, 155, S.poly([A, B, C]) + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6));
  }
  // b08：梯子 AB 靠墙，P 是中点，O 是墙角
  {
    const O = [40, 210], A = [40 + 200 * Math.cos(Math.PI / 3), 210], B = [40, 210 - 200 * Math.sin(Math.PI / 3)], P = S.mid(A, B);
    out.b08 = S.wrap(300, 235, S.seg([40, 20], O) + S.seg(O, [280, 210]) + S.seg(A, B) + S.seg(O, P, true) + S.dot(P) + S.rt(O, B, A)
      + S.text('O', O, -10, 8) + S.text('A', A, 0, 14) + S.text('B', B, -12, 0) + S.text('P', P, 12, -4) + S.text('N', [40, 20], -12, 0) + S.text('M', [280, 210], 0, 14));
  }
  // b09：CD⊥AB，∠ACD=∠B（按 ∠B=40° 画），E 是 AB 的中点
  {
    const A = [20, 190], B = [300, 190], C = S.apex(A, B, 50, 40), D = S.foot(C, A, B), E = S.mid(A, B);
    out.b09 = S.wrap(320, 215, S.poly([A, B, C]) + S.seg(C, D) + S.seg(C, E) + S.rt(D, B, C, 7)
      + S.text('A', A, -10, 4) + S.text('B', B, 10, 4) + S.text('C', C, 0, -14) + S.text('D', D, 0, 14) + S.text('E', E, 0, 14));
  }
  // e01：∠C=90°，∠A=30°，AB=16；画的是 t=2 时的位置（BP=14，BQ=4，每单位 12px）
  {
    const k = 12, C = [30, 130], B = [30, 130 - 8 * k], A = [30 + 8 * Math.sqrt(3) * k, 130], P = S.at(B, A, 14 / 16), Q = S.at(B, C, 4 / 8);
    out.e01 = S.wrap(230, 155, S.poly([A, B, C]) + S.seg(P, Q) + S.rt(C, A, B) + S.dot(P) + S.dot(Q)
      + S.text('A', A, 10, 6) + S.text('B', B, -10, -4) + S.text('C', C, -10, 6) + S.text('P', P, 6, -12) + S.text('Q', Q, -12, 0));
  }
  // e02：∠ABC=∠ADC=90°，B、D 在 AC 两侧，∠BAC=20°，∠DAC=16°，M 是 AC 的中点
  {
    const A = [20, 120], C = [300, 120], L = 280, p = d => [A[0] + L * Math.cos((d * Math.PI) / 180) ** 2, A[1] + L * Math.cos((d * Math.PI) / 180) * Math.sin((d * Math.PI) / 180)];
    const B = p(20), D = p(-16), M = S.mid(A, C);
    out.e02 = S.wrap(320, 230, S.poly([A, B, C, D]) + S.seg(A, C) + S.seg(M, B) + S.seg(M, D) + S.seg(B, D) + S.rt(B, A, C, 7) + S.rt(D, A, C, 7)
      + S.text('A', A, -10, 4) + S.text('C', C, 10, 4) + S.text('B', B, 4, 14) + S.text('D', D, 4, -14) + S.text('M', M, 0, -14));
  }
  // e03：∠ACB=90°，AC=9，BC=4，AX⊥AC；画的是 t=2 时（CP=2，AP=7，不是答案，每单位 20px）
  {
    const k = 20, C = [20, 200], A = [20 + 9 * k, 200], B = [20, 200 - 4 * k], X = [A[0], 15], P = [20 + 2 * k, 200], Q = [A[0], 200 - Math.sqrt(97 - 49) * k];
    out.e03 = S.wrap(320, 225, S.poly([A, B, C]) + S.seg(A, [310, 200]) + S.seg(A, X) + S.seg(P, Q) + S.rt(C, A, B) + S.rt(A, C, X) + S.dot(P)
      + S.text('A', A, 10, 10) + S.text('B', B, -10, -4) + S.text('C', C, -10, 8) + S.text('X', X, 12, 0) + S.text('P', P, 0, 14) + S.text('Q', Q, 12, 0));
  }
  // e04：AB=AC，∠BAC=120°，AB 的垂直平分线交 AB 于 E、交 BC 于 D
  {
    const B = [20, 150], C = [300, 150], A = S.apex(B, C, 30, 30), E = S.mid(A, B), D = S.meet(E, [E[0] + (A[1] - B[1]), E[1] - (A[0] - B[0])], B, C);
    out.e04 = S.wrap(320, 175, S.poly([A, B, C]) + S.seg(E, D) + S.seg(A, D) + S.rt(E, A, D, 7)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14) + S.text('E', E, -10, -8));
  }
  // e05：等边三角形 ABC，P 在 BC 上（画的是 BP=5），PE⊥AB，PF⊥AC
  {
    const k = 22, B = [20, 250], C = [20 + 12 * k, 250], A = S.apex(B, C, 60, 60), P = [20 + 5 * k, 250], E = S.foot(P, A, B), F = S.foot(P, A, C);
    out.e05 = S.wrap(300, 275, S.poly([A, B, C]) + S.seg(P, E) + S.seg(P, F) + S.rt(E, B, P, 7) + S.rt(F, C, P, 7)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('P', P, 0, 14) + S.text('E', E, -12, -2) + S.text('F', F, 12, -2));
  }
  // c01：∠MON=90°，AB=10 的两端在 OM、ON 上，Rt△ACB（∠ACB=90°，∠BAC=15°）在 AB 远离 O 的一侧；画的是 ∠OAB=40° 时
  {
    const k = 17, al = (40 * Math.PI) / 180, O = [30, 230], A = [30 + 10 * k * Math.cos(al), 230], B = [30, 230 - 10 * k * Math.sin(al)];
    const u = [B[0] - A[0], B[1] - A[1]], t = (15 * Math.PI) / 180, c = Math.cos(t);
    const C = [A[0] + (u[0] * Math.cos(t) - u[1] * Math.sin(t)) * c, A[1] + (u[0] * Math.sin(t) + u[1] * Math.cos(t)) * c];
    out.c01 = S.wrap(300, 255, S.seg([30, 10], O) + S.seg(O, [290, 230]) + S.poly([A, B, C]) + S.seg(O, C, true) + S.rt(O, A, B) + S.rt(C, A, B, 7)
      + S.text('O', O, -10, 8) + S.text('A', A, 0, 14) + S.text('B', B, -12, 0) + S.text('C', C, 10, -6) + S.text('N', [30, 10], -12, 0) + S.text('M', [290, 230], 0, 14));
  }
  // c02：∠ACB=90°，CD 是斜边上的中线，△ACD 沿 CD 翻折得 △A′CD；画的是 ∠A=40° 时（不是答案）
  {
    const C = [190, 235], L = 260, a = (40 * Math.PI) / 180, AC = L * Math.cos(a), BC = L * Math.sin(a);
    const A1 = [C[0] + AC * Math.cos((150 * Math.PI) / 180), C[1] - AC * Math.sin((150 * Math.PI) / 180)];
    const B1 = [C[0] + BC * Math.cos(Math.PI / 3), C[1] - BC * Math.sin(Math.PI / 3)];
    const D = S.mid(A1, B1), Ap = S.refl(A1, C, D);
    out.c02 = S.wrap(320, 255, S.poly([A1, B1, C]) + S.seg(C, D) + S.seg(C, Ap, true) + S.seg(D, Ap, true) + S.rt(C, A1, B1)
      + S.text('A', A1, -10, 4) + S.text('B', B1, 10, -2) + S.text('C', C, 0, 14) + S.text('D', D, -12, 10) + S.text('A′', Ap, 0, -14));
  }
  // c03：∠ACB=90°，AC=6，BC=8；示意图故意把 AC 画成 7（不按比例），D 取在 DE=DC 的位置，CD 不是 3
  {
    const k = 28, a = 7, x = (8 * a) / (a + Math.hypot(8, a)), C = [30, 200], A = [30, 200 - a * k], B = [30 + 8 * k, 200], D = [30 + x * k, 200], E = S.foot(D, A, B);
    out.c03 = S.wrap(290, 225, S.poly([A, B, C]) + S.seg(D, E) + S.rt(C, A, B) + S.rt(E, B, D, 7)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('D', D, 0, 14) + S.text('E', E, 8, -10));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s1/22.1',
  title: '直角三角形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-07', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“斜边上的中线”配 rtMedian 演示、“直角三角形全等的判定”配 hlCongruent 演示，b08、c01 解析配 ladderSlide，c02 配 motion 翻折。第 1 轮 c01（梯子中点 + 30° 直角三角形）只有 5 级且 BC 恰好等于斜边一半，c05（15° 求面积 + 反求）与 c04 同一引擎，e03 与人教版 HL 课后题几乎相同，e01 双动点直角三角形是流传模型，c03 两空分开填丢了配对且配图 DE≠DC；第 2 轮 c01 改为 ∠BAC=15°，加问取最大值时 ∠OAB 和 △OBC 面积，e01 改为 Q 折返并排除一种直角位置，e03 改为 P 沿射线 CA 越过 A，c03 按位置分组作答，c05 改为由中线 CM=½AB 判直角、面积求高、轴对称证 30°，整节通过；随后把 c03 示意图改成不按比例' },

  intro: [
    {
      title: '两个锐角互余',
      body: '直角三角形有一个角是 $90^\\circ$，由三角形内角和，另外两个锐角的和是 $90^\\circ$，即**直角三角形的两个锐角互余**。反过来也成立：**两个锐角互余的三角形是直角三角形**，可以用它判定直角三角形。',
      example: 'Rt$\\triangle PQR$ 中 $\\angle R=90^\\circ$，$\\angle P=52^\\circ$，那么 $\\angle Q=38^\\circ$。',
    },
    {
      title: '斜边上的中线',
      body: '**直角三角形斜边上的中线等于斜边的一半**：中线把直角三角形分成两个等腰三角形。拖动下面的直角顶点试一试，中线的长始终不变。它的逆命题也成立：如果三角形一边上的中线等于这边的一半，那么这个三角形是直角三角形（这边所对的角是直角）。',
      example: 'Rt$\\triangle XYZ$ 的斜边 $XY=13$，那么斜边上的中线长 $6.5$。',
      pitfall: '只有**斜边**上的中线等于斜边的一半，直角边上的中线没有这个结论。',
      demo: { type: 'rtMedian' },
    },
    {
      title: '含 $30^\\circ$ 角的直角三角形',
      body: '在直角三角形中，**$30^\\circ$ 角所对的直角边等于斜边的一半**。理由：作斜边上的中线，另一个锐角是 $60^\\circ$，中线把它所在的那一半分成一个等边三角形。',
      example: 'Rt$\\triangle KLN$ 中 $\\angle N=90^\\circ$，$\\angle K=30^\\circ$，斜边 $KL=9$，那么 $LN=4.5$。',
      pitfall: '一定要是直角三角形，并且是 $30^\\circ$ 角**所对**的直角边；不是直角三角形时，先作高造出直角三角形。',
    },
    {
      title: '直角三角形全等的判定',
      body: '**如果两个直角三角形的斜边和一条直角边对应相等，那么这两个直角三角形全等**（简称“斜边、直角边”）。一般三角形“两边及一边的对角”不能判定全等，但对应的角是直角时可以。尺规作直角三角形就是用它：先作一条直角边，过它的端点作垂线，再以另一端点为圆心、斜边长为半径画弧交垂线。',
      example: 'Rt$\\triangle GHI$ 与 Rt$\\triangle G\'H\'I\'$ 中 $\\angle I=\\angle I\'=90^\\circ$，$GH=G\'H\'=5$，$HI=H\'I\'=3$，所以两个三角形全等，$\\angle G=\\angle G\'$。',
      pitfall: '用这个定理时，相等的一定是**斜边**和一条直角边；也别忘了直角三角形还可以用前面学过的 SAS、ASA、AAS、SSS。',
      demo: { type: 'hlCongruent' },
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '22.1-b01',
      level: 'basic',
      type: 'multi',
      stem: '在 $\\triangle ABC$ 中，下列条件中，能判定 $\\triangle ABC$ 是直角三角形的有（　　）',
      options: [
        '$\\angle A=\\angle B-\\angle C$',
        '$\\angle A:\\angle B:\\angle C=3:4:5$',
        '$\\angle A=\\frac12\\angle B=\\frac13\\angle C$',
        '$AB$ 边上的中线等于 $AB$ 的一半',
        '$\\angle A=2\\angle B=3\\angle C$',
        '$AB$ 边上的高等于 $AB$ 的一半',
      ],
      answer: [0, 2, 3],
      explain: [
        'A：$\\angle B=\\angle A+\\angle C$，内角和 $2\\angle B=180^\\circ$，$\\angle B=90^\\circ$，能。',
        'B：三个角是 $45^\\circ$、$60^\\circ$、$75^\\circ$，不能。坑：$3$、$4$、$5$ 让人想到直角三角形，但这里是角的比，不是边的比。',
        'C：三个角之比 $1:2:3$，是 $30^\\circ$、$60^\\circ$、$90^\\circ$，能。E：设 $\\angle A=6k$，$\\angle B=3k$，$\\angle C=2k$，$11k=180^\\circ$，没有直角，不能。',
        'D：由“一边上的中线等于这边的一半”，$AB$ 所对的 $\\angle C=90^\\circ$，能。F：高等于 $AB$ 的一半的三角形很多，比如底边为 $4$、高为 $2$、顶点不在正中间的三角形就不是直角三角形，不能。所以选 A、C、D。',
      ],
      verify: () => {
        const right = angs => angs.some(a => Math.abs(a - 90) < 1e-9);
        const res = [];
        // A：∠A=∠B−∠C，取 ∠C=30°，∠A=x，∠B=x+30，内角和求 x
        { const x = (180 - 60) / 2; if (right([x, x + 30, 30])) res.push(0); }
        { const k = 180 / 12; if (right([3 * k, 4 * k, 5 * k])) res.push(1); }
        { const k = 180 / 6; if (right([k, 2 * k, 3 * k])) res.push(2); }
        // D：AB=4，中点 D=(2,0)，C 取在以 D 为端点、长 2 的位置上（多试几个）
        if ([30, 75, 120].every(d => { const C = [2 + 2 * Math.cos((d * Math.PI) / 180), 2 * Math.sin((d * Math.PI) / 180)]; return Math.abs(SVG221.ang(C, [0, 0], [4, 0]) - 90) < 1e-9; })) res.push(3);
        { const k = 180 / 11; if (right([6 * k, 3 * k, 2 * k])) res.push(4); }
        // F：AB=4，C=(1,2) 时高为 2，∠C 不是直角
        if (Math.abs(SVG221.ang([1, 2], [0, 0], [4, 0]) - 90) < 1e-9) res.push(5);
        return res;
      },
    },
    {
      id: '22.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 Rt$\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$\\angle A=28^\\circ$，$CD$ 是斜边 $AB$ 上的中线，$CE\\perp AB$，垂足为 $E$。求 $\\angle DCE$ 的度数。',
      figure: FIG221.b02,
      blanks: [
        { kind: 'angle', label: '$\\angle DCE=$', answer: '34°' },
      ],
      explain: [
        '$CD$ 是斜边上的中线，$CD=AD=\\frac12AB$，所以 $\\angle ACD=\\angle A=28^\\circ$。',
        '在 Rt$\\triangle ACE$ 中，$\\angle ACE=90^\\circ-\\angle A=62^\\circ$。',
        '$\\angle DCE=\\angle ACE-\\angle ACD=62^\\circ-28^\\circ=34^\\circ$。坑：以为 $\\angle DCE=\\angle A$；其实它等于 $\\angle B-\\angle A$。',
      ],
      verify: () => {
        const S = SVG221, A = [0, 200], B = [300, 200], C = S.apex(A, B, 28, 62), D = S.mid(A, B), E = S.foot(C, A, B);
        return Math.round(S.ang(C, D, E) * 1e6) / 1e6 + '°';
      },
    },
    {
      id: '22.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 Rt$\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$\\angle A=30^\\circ$，$CD\\perp AB$，垂足为 $D$，$BD=2$。求 $AD$ 的长。',
      figure: FIG221.b03,
      blanks: [
        { kind: 'num', label: '$AD=$', answer: '6' },
      ],
      explain: [
        '$\\angle B=60^\\circ$，在 Rt$\\triangle BCD$ 中，$\\angle BCD=90^\\circ-60^\\circ=30^\\circ$，它所对的直角边 $BD=\\frac12BC$，所以 $BC=4$。',
        '在 Rt$\\triangle ABC$ 中，$\\angle A=30^\\circ$ 所对的 $BC=\\frac12AB$，所以 $AB=8$。',
        '$AD=AB-BD=8-2=6$。坑：只用一次 $30^\\circ$ 角的性质，把 $AB$ 当成 $4$；要在两个直角三角形里各用一次。',
      ],
      verify: () => {
        const S = SVG221, A = [0, 0], B = [8, 0], C = S.meet(A, [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)], B, [8 - Math.cos(Math.PI / 3), -Math.sin(Math.PI / 3)]), D = S.foot(C, A, B);
        const k = 2 / S.dist(B, D);  // 按 BD=2 缩放
        return Math.round(S.dist(A, D) * k * 1e9) / 1e9;
      },
    },
    {
      id: '22.1-b04',
      level: 'basic',
      type: 'choice',
      stem: '已知线段 $b$、$c$，用尺规作 Rt$\\triangle ABC$，使 $\\angle ACB=90^\\circ$，$AC=b$，斜边 $AB=c$：如图，先作线段 $AC=b$，过点 $C$ 作直线 $MN\\perp AC$，再以 $A$ 为圆心、$c$ 为半径画弧，交直线 $MN$ 于 $B$、$B\'$ 两点。下列说法中，正确的是（　　）',
      figure: FIG221.b04,
      options: [
        '$\\triangle ABC$ 与 $\\triangle AB\'C$ 位置不同，所以满足条件的直角三角形有两种',
        '$\\triangle ABC\\cong\\triangle AB\'C$，依据是“斜边和一条直角边对应相等的两个直角三角形全等”',
        '$\\triangle ABC\\cong\\triangle AB\'C$，依据是“两边及其中一边的对角对应相等的两个三角形全等”',
        '只要 $b$、$c$ 不相等，就一定能作出这个直角三角形',
      ],
      answer: 1,
      explain: [
        '两个三角形中 $\\angle ACB=\\angle ACB\'=90^\\circ$，斜边 $AB=AB\'=c$，直角边 $AC$ 公共，由直角三角形全等的判定定理（斜边、直角边），$\\triangle ABC\\cong\\triangle AB\'C$，只算一种，A 错，B 对。',
        'C 错：“两边及其中一边的对角”在一般三角形中不能判定全等；这里能全等，是因为这个角是直角。',
        'D 错：斜边是直角所对的边，由大角对大边，斜边要比直角边长；$c<b$ 时弧与 $MN$ 没有交点，作不出来。选 B。坑：选 C，把直角三角形的特殊判定当成一般三角形的“边边角”。',
      ],
      verify: () => {
        // 按作法求弧与 MN 的交点：b=3、c=5 时两个三角形三边相同（A 不成立、B 成立）；b=5、c=3 时没有交点（D 不成立）
        const S = SVG221, cut = (b, c) => { const A = [0, b], C = [0, 0], d2 = c * c - b * b; return d2 <= 0 ? null : [A, C, [-Math.sqrt(d2), 0], [Math.sqrt(d2), 0]]; };
        const [A, C, B1, B2] = cut(3, 5), side = (P, Q, R) => [S.dist(P, Q), S.dist(Q, R), S.dist(R, P)].sort((p, q) => p - q);
        const same = side(A, B1, C).every((x, i) => Math.abs(x - side(A, B2, C)[i]) < 1e-9);
        return same && cut(5, 3) === null ? 1 : -1;
      },
    },
    {
      id: '22.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，点 $E$ 在线段 $BC$ 上，$AB\\perp BC$，$DC\\perp BC$，垂足分别为 $B$、$C$，$AE=ED$，$AB=EC$，$AB=3$，$CD=7$。求 $\\angle AED$ 的度数和 $BC$ 的长。',
      figure: FIG221.b05,
      blanks: [
        { kind: 'angle', label: '$\\angle AED=$', answer: '90°' },
        { kind: 'num', label: '$BC=$', answer: '10' },
      ],
      explain: [
        '在 Rt$\\triangle ABE$ 和 Rt$\\triangle ECD$ 中，斜边 $AE=ED$，直角边 $AB=EC$，由直角三角形全等的判定定理，Rt$\\triangle ABE\\cong$ Rt$\\triangle ECD$。',
        '所以 $\\angle AEB=\\angle EDC$，$BE=CD=7$。$\\angle DEC+\\angle EDC=90^\\circ$，所以 $\\angle AEB+\\angle DEC=90^\\circ$，$\\angle AED=180^\\circ-90^\\circ=90^\\circ$。',
        '$BC=BE+EC=7+3=10$。坑：$AE=ED$、$AB=EC$ 加上一个直角，看起来像“边边角”，以为不能判定全等；要分清哪条是斜边：对应的两条斜边相等，对应的两条直角边相等。',
      ],
      verify: () => {
        // 由 AB=3、CD=7 和全等，B=(0,0)，E=(CD,0)，C=(CD+AB,0)
        const S = SVG221, B = [0, 0], A = [0, 3], E = [7, 0], C = [10, 0], D = [10, 7];
        const ok = Math.abs(S.dist(A, E) - S.dist(E, D)) < 1e-9 && Math.abs(S.dist(E, C) - 3) < 1e-9;
        return ok ? [Math.round(S.ang(E, A, D) * 1e6) / 1e6 + '°', S.dist(B, C)] : null;
      },
    },
    {
      id: '22.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，点 $D$ 是 $AB$ 的中点，连接 $CD$，$CD=AD$，$\\angle A=35^\\circ$。求 $\\angle BCD$ 的度数。',
      figure: FIG221.b06,
      blanks: [
        { kind: 'angle', label: '$\\angle BCD=$', answer: '55°' },
      ],
      explain: [
        '$D$ 是 $AB$ 的中点，$CD=AD=BD=\\frac12AB$，$AB$ 边上的中线等于 $AB$ 的一半，所以 $\\angle ACB=90^\\circ$。',
        '$\\angle B=90^\\circ-35^\\circ=55^\\circ$。$DB=DC$，所以 $\\angle BCD=\\angle B=55^\\circ$。',
        '坑：只看到 $\\triangle ACD$ 是等腰三角形，把 $\\angle BCD$ 当成 $35^\\circ$；要先由中线判定出直角。',
      ],
      verify: () => {
        // 枚举 C 的位置：DC=DA 时 C 在以 D 为中心、半径 DA 的位置上，取使 ∠A=35° 的那一点
        const S = SVG221, A = [0, 0], B = [2, 0], D = [1, 0];
        for (let k = 1; k < 18000; k++) {
          const t = (k / 100) * Math.PI / 180, C = [1 + Math.cos(t), Math.sin(t)];
          if (Math.abs(S.ang(A, B, C) - 35) < 1e-3) return Math.round(S.ang(C, B, D)) + '°';
        }
        return null;
      },
    },
    {
      id: '22.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=30^\\circ$，$AB=10$，$BC=14$。求 $\\triangle ABC$ 的面积。',
      figure: FIG221.b07,
      blanks: [
        { kind: 'num', label: '面积', answer: '35' },
      ],
      explain: [
        '$\\triangle ABC$ 不是直角三角形，先作高：过 $A$ 作 $AH\\perp BC$，垂足为 $H$。',
        '在 Rt$\\triangle ABH$ 中，$\\angle B=30^\\circ$，它所对的直角边 $AH=\\frac12AB=5$。',
        '面积 $=\\frac12BC\\cdot AH=\\frac12\\times14\\times5=35$。坑：直接算 $\\frac12\\times10\\times14=70$，把 $AB$ 当成了高。',
      ],
      verify: () => {
        const B = [0, 0], C = [14, 0], A = [10 * Math.cos(Math.PI / 6), 10 * Math.sin(Math.PI / 6)];
        return Math.round((Math.abs((C[0] - B[0]) * (A[1] - B[1]) - (C[1] - B[1]) * (A[0] - B[0])) / 2) * 1e9) / 1e9;
      },
    },
    {
      id: '22.1-b08',
      level: 'basic',
      type: 'choice',
      stem: '如图，一架长 $10$ 米的梯子 $AB$ 斜靠在竖直的墙 $ON$ 上，$O$ 是墙角，底端 $A$ 在水平地面 $OM$ 上。梯子顶端 $B$ 沿墙下滑、底端 $A$ 沿地面向外滑动，直到梯子平躺在地面上。在这个过程中，梯子的中点 $P$ 到墙角 $O$ 的距离（　　）',
      figure: FIG221.b08,
      options: ['逐渐变大', '逐渐变小', '先变大后变小', '始终是 $5$ 米'],
      answer: 3,
      explain: [
        '梯子没有平躺时，$\\angle AOB=90^\\circ$，$OP$ 是 Rt$\\triangle AOB$ 斜边上的中线，$OP=\\frac12AB=5$ 米；平躺时 $O$、$A$、$B$ 中有两点重合，$OP$ 仍是 $5$ 米。',
        '所以距离始终是 $5$ 米，选 D。点 $P$ 走过的路线是以 $O$ 为端点、长 $5$ 米的线段扫出来的一段弧。',
        '坑：凭感觉认为梯子越倒，中点离墙角越近或越远。顶端下降和底端滑出的距离在变，但中点到墙角的距离不变。',
      ],
      demo: { type: 'ladderSlide', len: 10 },
      verify: () => {
        const ds = [];
        for (let d = 1; d < 90; d += 7) { const a = (d * Math.PI) / 180, P = [5 * Math.cos(a), 5 * Math.sin(a)]; ds.push(Math.hypot(...P)); }
        return ds.every(x => Math.abs(x - 5) < 1e-9) ? 3 : -1;
      },
    },
    {
      id: '22.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$CD\\perp AB$，垂足为 $D$，$\\angle ACD=\\angle B$，$E$ 是 $AB$ 的中点，连接 $CE$，$AB=10$。求 $CE$ 的长。',
      figure: FIG221.b09,
      blanks: [
        { kind: 'num', label: '$CE=$', answer: '5' },
      ],
      explain: [
        '在 Rt$\\triangle ACD$ 中，$\\angle A+\\angle ACD=90^\\circ$。又 $\\angle ACD=\\angle B$，所以 $\\angle A+\\angle B=90^\\circ$。',
        '两个锐角互余的三角形是直角三角形，$\\angle ACB=90^\\circ$，$CE$ 是斜边 $AB$ 上的中线，$CE=\\frac12AB=5$。',
        '坑：觉得不知道角的大小就求不出 $CE$；关键是先用“两锐角互余”判定出直角。',
      ],
      verify: () => {
        // 对几个不同的 ∠B，构造 ∠ACD=∠B 的三角形，量 CE
        const S = SVG221, r = new Set();
        for (const b of [25, 40, 55]) {
          const A = [0, 0], B = [10, 0];
          // C 在 AB 上方，∠CAB=90°−b（使 ∠ACD=b），∠CBA=b
          const C = S.meet(A, [Math.cos(((90 - b) * Math.PI) / 180), Math.sin(((90 - b) * Math.PI) / 180)], B, [10 - Math.cos((b * Math.PI) / 180), Math.sin((b * Math.PI) / 180)]);
          const D = S.foot(C, A, B);
          if (Math.abs(S.ang(C, A, D) - S.ang(B, C, A)) > 1e-9) return null;
          r.add(Math.round(S.dist(C, S.mid(A, B)) * 1e9) / 1e9);
        }
        return r.size === 1 ? [...r][0] : null;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '22.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 Rt$\\triangle ABC$ 中，$\\angle C=90^\\circ$，$\\angle A=30^\\circ$，$AB=16$ cm。动点 $P$ 从点 $A$ 出发，沿 $AB$ 以每秒 $1$ cm 的速度向点 $B$ 运动；同时动点 $Q$ 从点 $B$ 出发，沿 $BC$ 以每秒 $2$ cm 的速度向点 $C$ 运动，到达点 $C$ 后立即以原速沿 $CB$ 返回，$Q$ 回到点 $B$ 时两点同时停止。设运动时间为 $t$ 秒（$0<t<8$）。当 $\\triangle PBQ$ 是直角三角形时，求 $t$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG221.e01,
      blanks: [
        { kind: 'nums', label: '$t=$', answer: ['3.2', '16/3'] },
      ],
      explain: [
        '$\\angle B=60^\\circ$，$BC=\\frac12AB=8$ cm。$BP=16-t$，在 $0<t<8$ 内 $BP>8$。$Q$ 分两段：$0<t\\le4$ 时 $BQ=2t$；$4\\le t<8$ 时 $BQ=16-2t$。$BQ$ 始终不超过 $8$。',
        '若 $\\angle BPQ=90^\\circ$：$\\angle BQP=30^\\circ$，它所对的 $BP=\\frac12BQ\\le4$，与 $BP>8$ 矛盾，不可能。',
        '所以只能 $\\angle BQP=90^\\circ$：$\\angle BPQ=30^\\circ$，它所对的 $BQ=\\frac12BP$。去程：$2t=\\frac12(16-t)$，$t=3.2$，在 $0<t\\le4$ 内；返程：$16-2t=\\frac12(16-t)$，$t=\\frac{16}3$，在 $4\\le t<8$ 内。',
        '所以 $t=3.2$ 或 $\\frac{16}3$。转弯：先比较 $BP$、$BQ$ 的范围排除一种直角位置；$Q$ 折返要分段列式，并检查解是否在对应的时间段内。坑：只算去程，漏掉返程的 $\\frac{16}3$。',
      ],
      verify: () => {
        // 坐标：C 原点，B=(0,8)，A=(8√3,0)
        const S = SVG221, C = [0, 0], B = [0, 8], A = [8 * Math.sqrt(3), 0], r = [];
        for (let k = 1; k < 2400; k++) {
          const t = k / 300, P = S.at(A, B, t / 16), bq = t <= 4 ? 2 * t : 16 - 2 * t, Q = S.at(B, C, bq / 8);
          if ([S.ang(P, B, Q), S.ang(Q, B, P)].some(a => Math.abs(a - 90) < 1e-6)) r.push(F(k).div(F(300)));  // 精确分数
        }
        return r;
      },
    },
    {
      id: '22.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\angle ABC=\\angle ADC=90^\\circ$，点 $B$、$D$ 在直线 $AC$ 的两侧，$M$ 是 $AC$ 的中点，连接 $MB$、$MD$、$BD$。(1) 如图，若 $\\angle BAD=36^\\circ$，求 $\\angle MBD$ 的度数；(2) 若 $AC=10$，$\\angle BAD=150^\\circ$，求 $BD$ 的长。',
      figure: FIG221.e02,
      blanks: [
        { kind: 'angle', label: '(1) $\\angle MBD=$', answer: '54°' },
        { kind: 'num', label: '(2) $BD=$', answer: '5' },
      ],
      explain: [
        '$MB$、$MD$ 分别是 Rt$\\triangle ABC$、Rt$\\triangle ADC$ 斜边上的中线，$MA=MB=MC=MD=\\frac12AC$。',
        '$MA=MB$，$\\angle MBA=\\angle BAC$，外角 $\\angle BMC=2\\angle BAC$；同理 $\\angle DMC=2\\angle DAC$。$B$、$D$ 在 $AC$ 两侧，所以 $\\angle BMC+\\angle DMC=2\\angle BAD$。',
        '(1) $2\\angle BAD=72^\\circ$，$\\angle BMD=72^\\circ$。$MB=MD$，$\\angle MBD=\\frac{180^\\circ-72^\\circ}2=54^\\circ$。',
        '(2) $2\\angle BAD=300^\\circ>180^\\circ$，这时 $\\angle BMC$ 与 $\\angle DMC$ 合起来超过平角，$\\angle BMD=360^\\circ-300^\\circ=60^\\circ$。$MB=MD=5$，$\\triangle MBD$ 是等边三角形，$BD=5$。',
        '转弯：四个点到 $M$ 的距离都相等，把 $\\angle BAD$ 转化为 $\\angle BMD$；(2) 中两倍超过 $180^\\circ$，要取剩下的角。坑：(2) 写成 $\\angle BMD=300^\\circ$ 而求不出来。',
      ],
      verify: () => {
        // M 为原点，半径 5；B、D 在 AC 两侧，按 ∠BAC、∠DAC 定位
        const S = SVG221, A = [-5, 0], C = [5, 0], M = [0, 0];
        const pt = (deg, sg) => { const a = (deg * Math.PI) / 180; return [-5 + 10 * Math.cos(a) * Math.cos(a), sg * 10 * Math.cos(a) * Math.sin(a)]; };
        const B1 = pt(20, 1), D1 = pt(16, -1), B2 = pt(70, 1), D2 = pt(80, -1);
        const ok = Math.abs(S.ang(B1, A, C) - 90) < 1e-9 && Math.abs(S.ang(A, B1, D1) - 36) < 1e-9 && Math.abs(S.ang(A, B2, D2) - 150) < 1e-9;
        return ok ? [Math.round(S.ang(B1, M, D1) * 1e6) / 1e6 + '°', Math.round(S.dist(B2, D2) * 1e9) / 1e9] : null;
      },
    },
    {
      id: '22.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 Rt$\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$AC=9$，$BC=4$。过点 $A$ 作射线 $AX\\perp AC$，$AX$ 与点 $B$ 在直线 $AC$ 的同侧。动点 $P$ 从点 $C$ 出发，沿射线 $CA$ 以每秒 $1$ 个单位的速度运动（经过点 $A$ 后继续前进）；点 $Q$ 在射线 $AX$ 上，并且始终满足 $PQ=AB$。设运动时间为 $t$ 秒（$t>0$，$P$ 与 $A$ 重合的时刻不考虑）。当以 $P$、$A$、$Q$ 为顶点的三角形与 $\\triangle ABC$ 全等时，求 $t$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG221.e03,
      blanks: [
        { kind: 'nums', label: '$t=$', answer: ['5', '13', '18'] },
      ],
      explain: [
        '不论 $P$ 在 $A$ 的哪一侧，$PA$ 都在直线 $AC$ 上，$\\angle PAQ=90^\\circ$，斜边 $PQ=AB$。全等时直角对直角、斜边对斜边，$AP$ 只能等于 $BC$ 或 $AC$；反过来，$AP$ 等于其中一条时，由“斜边、直角边”就全等。',
        '$AP=|9-t|$：$t<9$ 时 $P$ 在 $C$、$A$ 之间，$AP=9-t$；$t>9$ 时 $P$ 越过了 $A$，$AP=t-9$。',
        '① $AP=BC=4$：$9-t=4$ 得 $t=5$；$t-9=4$ 得 $t=13$。② $AP=AC=9$：$9-t=9$ 得 $t=0$（舍去）；$t-9=9$ 得 $t=18$。',
        '所以 $t=5$、$13$ 或 $18$。转弯：全等的对应关系要分两种，$P$ 越过 $A$ 后还要再分一次，并舍去 $t=0$。坑：只考虑 $P$ 在线段 $CA$ 上，得到 $t=5$ 一个值。',
      ],
      verify: () => {
        // 枚举 t，PQ=AB 时由 AQ 的长判断三边是否与 △ABC 的三边一一相等
        const S = SVG221, C = [0, 0], A = [9, 0], B = [0, 4], ab = S.dist(A, B), sides = [9, 4, ab].sort((p, q) => p - q), r = [];
        for (let k = 1; k <= 3000; k++) {
          const t = k / 100, P = [t, 0], ap = Math.abs(9 - t), aq2 = ab * ab - ap * ap;
          if (ap < 1e-9 || aq2 <= 0) continue;
          const Q = [9, Math.sqrt(aq2)], s = [S.dist(A, P), S.dist(A, Q), S.dist(P, Q)].sort((p, q) => p - q);
          if (s.every((x, i) => Math.abs(x - sides[i]) < 1e-9)) r.push(t);
        }
        void C;
        return r;
      },
    },
    {
      id: '22.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=AC$，$\\angle BAC=120^\\circ$，$AB$ 的垂直平分线交 $AB$ 于点 $E$，交 $BC$ 于点 $D$，连接 $AD$，$BC=15$。求 $BD$ 和 $DE$ 的长。',
      figure: FIG221.e04,
      blanks: [
        { kind: 'num', label: '$BD=$', answer: '5' },
        { kind: 'num', label: '$DE=$', answer: '2.5' },
      ],
      explain: [
        '$\\angle B=\\angle C=30^\\circ$。$D$ 在 $AB$ 的垂直平分线上，$DA=DB$，$\\angle DAB=\\angle B=30^\\circ$，所以 $\\angle DAC=120^\\circ-30^\\circ=90^\\circ$。',
        '在 Rt$\\triangle ADC$ 中，$\\angle C=30^\\circ$ 所对的 $AD=\\frac12DC$，所以 $DC=2AD=2BD$。',
        '$BC=BD+DC=3BD=15$，$BD=5$。',
        '在 Rt$\\triangle BED$ 中，$\\angle B=30^\\circ$ 所对的 $DE=\\frac12BD=2.5$。转弯：先由垂直平分线把 $DB$ 换成 $DA$，再看出 $\\angle DAC$ 是直角，用两次 $30^\\circ$ 角的性质。',
      ],
      verify: () => {
        const S = SVG221, B = [0, 0], C = [15, 0], A = S.meet(B, [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)], C, [15 - Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)]);
        const E = S.mid(A, B), D = S.meet(E, [E[0] + (A[1] - B[1]), E[1] - (A[0] - B[0])], B, C);
        return [Math.round(S.dist(B, D) * 1e9) / 1e9, Math.round(S.dist(D, E) * 1e9) / 1e9];
      },
    },
    {
      id: '22.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，等边三角形 $ABC$ 的边长为 $12$，点 $P$ 在边 $BC$ 上（不与 $B$、$C$ 重合），$PE\\perp AB$，$PF\\perp AC$，垂足分别为 $E$、$F$。(1) 求 $AE+AF$ 的值；(2) 若 $AE$ 与 $AF$ 相差 $3$，求 $BP$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG221.e05,
      blanks: [
        { kind: 'num', label: '(1) $AE+AF=$', answer: '18' },
        { kind: 'nums', label: '(2) $BP=$', answer: ['3', '9'] },
      ],
      explain: [
        '设 $BP=x$，则 $CP=12-x$。在 Rt$\\triangle BPE$ 中，$\\angle B=60^\\circ$，$\\angle BPE=30^\\circ$，它所对的 $BE=\\frac12x$；同理 $CF=\\frac12(12-x)$。',
        '(1) $AE+AF=(12-BE)+(12-CF)=24-\\frac12x-\\frac12(12-x)=24-6=18$，与 $P$ 的位置无关。',
        '(2) $AE=12-\\frac12x$，$AF=12-\\frac12(12-x)=6+\\frac12x$，$AE-AF=6-x$。相差 $3$：$6-x=3$ 或 $6-x=-3$，$x=3$ 或 $9$，都在 $0<x<12$ 内。',
        '转弯：两个含 $30^\\circ$ 角的直角三角形的“一半”加起来是定值；(2) 没说谁大，要分两种。坑：(1) 以为要知道 $P$ 的位置；(2) 只算出 $BP=9$。',
      ],
      verify: () => {
        const S = SVG221, B = [0, 0], C = [12, 0], A = [6, 6 * Math.sqrt(3)], sums = new Set(), r = [];
        for (let k = 1; k < 1200; k++) {
          const x = k / 100, P = [x, 0], E = S.foot(P, A, B), F = S.foot(P, A, C), ae = S.dist(A, E), af = S.dist(A, F);
          sums.add(Math.round((ae + af) * 1e6) / 1e6);
          if (Math.abs(Math.abs(ae - af) - 3) < 1e-9) r.push(x);
        }
        return sums.size === 1 ? [[...sums][0], r] : null;
      },
    },
    {
      id: '22.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle B$、$\\angle C$ 都是锐角，$BD\\perp$ 直线 $AC$，$CE\\perp$ 直线 $AB$，垂足分别为 $D$、$E$，$M$ 是 $BC$ 的中点，连接 $DE$。若 $DE=\\frac12BC$，求 $\\angle BAC$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle BAC=$', answer: ['60', '120'], suffix: '°' },
      ],
      explain: [
        '连接 $ME$、$MD$。$ME$、$MD$ 分别是 Rt$\\triangle BEC$、Rt$\\triangle BDC$ 斜边 $BC$ 上的中线，$ME=MD=\\frac12BC$。又 $DE=\\frac12BC$，所以 $\\triangle MDE$ 是等边三角形，$\\angle DME=60^\\circ$。（$\\angle BAC=90^\\circ$ 时 $D$、$E$ 都与 $A$ 重合，不合题意。）',
        '$MB=ME$，$\\angle BME=180^\\circ-2\\angle ABC$；$MC=MD$，$\\angle CMD=180^\\circ-2\\angle ACB$。两式相加：$\\angle BME+\\angle CMD=360^\\circ-2(\\angle ABC+\\angle ACB)=2\\angle BAC$。',
        '① $\\angle BAC$ 是锐角：$D$、$E$ 分别在边 $AC$、$AB$ 上，$\\angle BME+\\angle CMD<180^\\circ$，$\\angle DME=180^\\circ-2\\angle BAC=60^\\circ$，$\\angle BAC=60^\\circ$。',
        '② $\\angle BAC$ 是钝角：$D$、$E$ 分别在 $CA$、$BA$ 的延长线上，$\\angle BME+\\angle CMD>180^\\circ$，两个角有重叠，$\\angle DME=2\\angle BAC-180^\\circ=60^\\circ$，$\\angle BAC=120^\\circ$。',
        '所以 $\\angle BAC=60^\\circ$ 或 $120^\\circ$。转弯：两次用斜边上的中线把 $DE=\\frac12BC$ 变成等边三角形，再按 $\\angle BAC$ 是锐角还是钝角分类。坑：只画锐角三角形，漏掉 $120^\\circ$。',
      ],
      verify: () => {
        const S = SVG221, r = new Set();
        for (let b = 1; b < 90; b++) for (let c = 1; c < 90; c++) {
          const a = 180 - b - c;
          if (a <= 0 || a === 90) continue;
          const B = [0, 0], C = [2, 0], A = S.meet(B, [Math.cos((b * Math.PI) / 180), Math.sin((b * Math.PI) / 180)], C, [2 - Math.cos((c * Math.PI) / 180), Math.sin((c * Math.PI) / 180)]);
          const D = S.foot(B, A, C), E = S.foot(C, A, B);
          if (Math.abs(S.dist(D, E) - 1) < 1e-9) r.add(a);
        }
        return [...r].sort((p, q) => p - q);
      },
    },

    // ---------- 挑战 ----------
    {
      id: '22.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$\\angle MON=90^\\circ$，长为 $10$ 的线段 $AB$ 的端点 $A$ 在射线 $OM$ 上、$B$ 在射线 $ON$ 上滑动（$A$、$B$ 都不与 $O$ 重合）。以 $AB$ 为斜边，在 $AB$ 远离点 $O$ 的一侧作 Rt$\\triangle ABC$，使 $\\angle ACB=90^\\circ$，$\\angle BAC=15^\\circ$。求 $OC$ 的最大值；当 $OC$ 最大时，求 $\\angle OAB$ 的度数和 $\\triangle OBC$ 的面积。',
      figure: FIG221.c01,
      blanks: [
        { kind: 'num', label: '$OC$ 的最大值', answer: '10' },
        { kind: 'angle', label: '$\\angle OAB=$', answer: '75°' },
        { kind: 'num', label: '$\\triangle OBC$ 的面积', answer: '12.5' },
      ],
      explain: [
        '想法：$O$、$C$ 都是以 $AB$ 为斜边的直角三角形的直角顶点，取斜边 $AB$ 的中点 $P$ 作“桥”。连接 $OP$、$PC$。',
        '$OP$ 是 Rt$\\triangle AOB$ 斜边上的中线，$OP=\\frac12AB=5$；$PC$ 是 Rt$\\triangle ACB$ 斜边上的中线，$PC=5$。它们的长都不随滑动改变。由三角形三边关系，$OC\\le OP+PC=10$，等号在 $P$ 落在线段 $OC$ 上时取到。',
        '求这个位置：$PA=PC$，$\\angle PCA=\\angle PAC=15^\\circ$，外角 $\\angle BPC=30^\\circ$。$O$、$P$、$C$ 共线，$\\angle OPB=180^\\circ-30^\\circ=150^\\circ$。$PO=PB$，$\\angle PBO=\\frac{180^\\circ-150^\\circ}2=15^\\circ$，所以 $\\angle OBA=15^\\circ$，$\\angle OAB=75^\\circ$。这个位置能取到，所以 $OC$ 的最大值是 $10$。',
        '求面积：过 $B$ 作 $BK\\perp OC$，垂足为 $K$。$\\angle BPC=30^\\circ$ 是锐角，$K$ 在射线 $PC$ 上，在 Rt$\\triangle BPK$ 中，$30^\\circ$ 角所对的 $BK=\\frac12PB=2.5$。$S_{\\triangle OBC}=\\frac12OC\\cdot BK=\\frac12\\times10\\times2.5=12.5$。',
        '三个环节：用两条斜边上的中线把 $OC$ 拆成两段定长，由三边关系得最值；由取等条件（共线）用两次等腰三角形的外角倒推位置；再把共线后的 $150^\\circ$ 角转成 $30^\\circ$ 角求高。坑：以为 $OC$ 最大时 $\\angle OAB=45^\\circ$（对称位置）。',
      ],
      demo: { type: 'ladderSlide', len: 10 },
      verify: () => {
        // 扫描 ∠OAB，求 OC 的最大值、此时的 ∠OAB 和 △OBC 的面积
        let best = [0, 0, 0];
        for (let i = 1; i < 9000; i++) {
          const al = ((i / 100) * Math.PI) / 180, A = [10 * Math.cos(al), 0], B = [0, 10 * Math.sin(al)], u = [B[0] - A[0], B[1] - A[1]];
          const cr = P => u[0] * (P[1] - A[1]) - u[1] * (P[0] - A[0]);
          for (const s of [1, -1]) {
            const t = (s * Math.PI) / 12, k = Math.cos(Math.PI / 12), C = [A[0] + (u[0] * Math.cos(t) - u[1] * Math.sin(t)) * k, A[1] + (u[0] * Math.sin(t) + u[1] * Math.cos(t)) * k];
            if (cr(C) * cr([0, 0]) < 0 && Math.hypot(...C) > best[0]) best = [Math.hypot(...C), i / 100, Math.abs(B[0] * C[1] - B[1] * C[0]) / 2];
          }
        }
        return [Math.round(best[0] * 1e6) / 1e6, Math.round(best[1] * 1e3) / 1e3 + '°', Math.round(best[2] * 1e6) / 1e6];
      },
    },
    {
      id: '22.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 Rt$\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$CD$ 是斜边 $AB$ 上的中线。将 $\\triangle ACD$ 沿直线 $CD$ 翻折，点 $A$ 落在点 $A\'$ 处。若直线 $A\'D$ 与 $\\triangle ABC$ 的某一条边所在的直线垂直，求 $\\angle A$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG221.c02,
      blanks: [
        { kind: 'nums', label: '$\\angle A=$', answer: ['22.5', '30', '60', '67.5'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle A=x$。$CD=AD=BD$，所以 $\\angle ACD=x$，$\\angle BCD=\\angle B=90^\\circ-x$，$\\angle ADC=180^\\circ-2x$。翻折后 $\\angle A\'=\\angle A=x$，$\\angle A\'CD=x$，$\\angle A\'DC=\\angle ADC=180^\\circ-2x$。（$x=45^\\circ$ 时 $A\'$ 与 $B$ 重合，$A\'D$ 就是直线 $AB$，不垂直于任何一边。）',
        '$D$ 在 $A$、$B$ 之间，$A$、$B$ 在直线 $CD$ 两侧，翻折后 $A\'$ 与 $B$ 在 $CD$ 的同侧、与 $A$ 在两侧。$\\angle BDC=2x$（$\\triangle ACD$ 的外角）。',
        '① $A\'D\\perp AB$：$\\angle A\'DB=90^\\circ$。$\\angle A\'DC$ 与 $\\angle BDC$ 在 $DC$ 同侧，$\\angle A\'DB=|\\angle A\'DC-\\angle BDC|=|180^\\circ-4x|=90^\\circ$，$x=22.5^\\circ$ 或 $67.5^\\circ$。',
        '② $A\'D\\perp AC$：又 $BC\\perp AC$，所以 $A\'D\\parallel BC$。截线 $CD$，$A\'$、$B$ 在 $CD$ 同侧，$\\angle A\'DC$ 与 $\\angle BCD$ 是同旁内角，互补：$(180^\\circ-2x)+(90^\\circ-x)=180^\\circ$，$x=30^\\circ$。',
        '③ $A\'D\\perp BC$：又 $AC\\perp BC$，所以 $A\'D\\parallel AC$。截线 $CD$，$A\'$、$A$ 在 $CD$ 两侧，$\\angle A\'DC$ 与 $\\angle ACD$ 是内错角，相等：$180^\\circ-2x=x$，$x=60^\\circ$。',
        '所以 $\\angle A=22.5^\\circ$、$30^\\circ$、$60^\\circ$ 或 $67.5^\\circ$。两个环节：斜边上的中线把所有角都用 $x$ 表示，翻折保持角不变；再按“垂直于哪条边”分类，并把垂直转化为平行（同垂直于一条直线）或角的差，$A\'D\\perp AB$ 时还要分 $\\angle A\'DC$ 比 $\\angle BDC$ 大还是小。',
      ],
      demo: { type: 'motion', mode: 'reflect', shape: [[6.928, 0], [0, 0], [3.464, 2]], labels: ['A', 'C', 'D'], axis: [[0, 0], [3.464, 2]], view: [-1, 8, -1, 7] },
      verify: () => {
        const S = SVG221, r = [];
        for (let k = 1; k < 900; k++) {
          const a = ((k / 10) * Math.PI) / 180, C = [0, 0], A = [Math.cos(a), 0], B = [0, Math.sin(a)], D = S.mid(A, B), A1 = S.refl(A, C, D);
          const u = [A1[0] - D[0], A1[1] - D[1]], n = Math.hypot(...u);
          if (n < 1e-9) continue;
          for (const v of [[A[0] - C[0], A[1] - C[1]], [B[0] - C[0], B[1] - C[1]], [B[0] - A[0], B[1] - A[1]]]) {
            if (Math.abs((u[0] * v[0] + u[1] * v[1]) / n / Math.hypot(...v)) < 1e-9) r.push(k / 10);
          }
        }
        return r;
      },
    },
    {
      id: '22.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '在 Rt$\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$AC=6$，$BC=8$，$AB=10$。点 $D$ 在直线 $BC$ 上（不与 $C$ 重合），过 $D$ 作 $DE\\perp$ 直线 $AB$，垂足为 $E$，且 $DE=DC$。按点 $D$ 的位置分别回答下面的问题（示意图画的是 $D$ 在线段 $BC$ 上的情形，没有按比例）。',
      figure: FIG221.c03,
      blanks: [
        { kind: 'num', label: '(1) $D$ 在线段 $BC$ 上时，$CD=$', answer: '3' },
        { kind: 'num', label: '$BE=$', answer: '4' },
        { kind: 'num', label: '(2) $D$ 在 $BC$ 的延长线上（$C$ 在 $B$、$D$ 之间）时，$CD=$', answer: '12' },
        { kind: 'num', label: '$BE=$', answer: '16' },
        { kind: 'num', label: '(3) $D$ 在 $CB$ 的延长线上（$B$ 在 $C$、$D$ 之间）时，满足条件的点 $D$ 有几个', answer: '0' },
      ],
      explain: [
        '连接 $AD$。在 Rt$\\triangle ACD$ 和 Rt$\\triangle AED$ 中，斜边 $AD$ 公共，直角边 $DC=DE$，由直角三角形全等的判定定理，两个三角形全等，所以 $AE=AC=6$。',
        '设 $CD=x$，用面积的和差列方程，$S_{\\triangle ABC}=\\frac12\\times6\\times8=24$，$S_{\\triangle ACD}=3x$，$S_{\\triangle ABD}=\\frac12AB\\cdot DE=5x$。',
        '(1) $S_{\\triangle ABC}=S_{\\triangle ACD}+S_{\\triangle ABD}$：$24=3x+5x$，$x=3$。这时 $E$ 在边 $AB$ 上，$BE=10-6=4$。',
        '(2) $S_{\\triangle ABD}=S_{\\triangle ABC}+S_{\\triangle ACD}$：$5x=24+3x$，$x=12$。这时 $\\angle DAB=\\angle DAC+\\angle CAB>90^\\circ$，垂足 $E$ 在 $BA$ 的延长线上，$BE=10+6=16$。',
        '(3) $S_{\\triangle ABD}=S_{\\triangle ACD}-S_{\\triangle ABC}$：$5x=3x-24$，$x=-12<0$，不存在，有 $0$ 个。',
        '两个环节：用“斜边、直角边”得到 $AE=AC$，再判断 $E$ 在哪一侧求 $BE$；用面积的和差列方程求 $CD$，按 $D$ 的位置分类。坑：(2) 中照搬 (1) 写 $BE=4$，没注意 $E$ 已经跑到 $A$ 的另一侧。',
      ],
      verify: () => {
        // B 在 C 的右侧：x>8 为 (3)，0<x<8 为 (1)，x<0 为 (2)
        const S = SVG221, C = [0, 0], A = [0, 6], B = [8, 0], g = { 1: [], 2: [], 3: [] };
        for (let k = -3000; k <= 3000; k++) {
          if (k === 0 || k === 800) continue;
          const D = [k / 100, 0], E = S.foot(D, A, B);
          if (Math.abs(S.dist(D, E) - S.dist(D, C)) < 1e-9) g[k < 0 ? 2 : k < 800 ? 1 : 3].push([Math.abs(k / 100), Math.round(S.dist(B, E) * 1e9) / 1e9]);
        }
        return g[1].length === 1 && g[2].length === 1 ? [g[1][0][0], g[1][0][1], g[2][0][0], g[2][0][1], g[3].length] : null;
      },
    },
    {
      id: '22.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一个等腰三角形中，某一条边上的高恰好等于某一条边长的一半（这两条边可以是同一条，也可以不同）。求这个等腰三角形顶角的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '顶角', answer: ['30', '90', '120', '150'], suffix: '°' },
      ],
      explain: [
        '先准备一个工具（课本没有直接给出）：直角三角形中，如果一条直角边等于斜边的一半，那么它所对的角是 $30^\\circ$。证明：作斜边上的中线，它也等于斜边的一半，于是这条直角边、中线和斜边的一半组成等边三角形，这条直角边与斜边的夹角是 $60^\\circ$，所对的角是 $30^\\circ$。',
        '设 $AB=AC$，顶角 $\\angle A$。高有两种（底边上的高 $AD$，腰上的高 $BH$，$H$ 在直线 $AC$ 上），“一半”的边也有两种（腰、底），共四种：',
        '① 底边上的高 $=\\frac12$ 腰：Rt$\\triangle ABD$ 中 $AD=\\frac12AB$，$\\angle B=30^\\circ$，顶角 $120^\\circ$。② 底边上的高 $=\\frac12$ 底：$AD=\\frac12BC=BD$，$\\angle B=45^\\circ$，顶角 $90^\\circ$。',
        '③ 腰上的高 $=\\frac12$ 腰：Rt$\\triangle ABH$ 中 $BH=\\frac12AB$，$\\angle BAH=30^\\circ$。顶角是锐角时 $H$ 在边 $AC$ 上，顶角 $30^\\circ$；顶角是钝角时 $H$ 在 $CA$ 的延长线上，$\\angle BAH$ 是顶角的邻补角，顶角 $150^\\circ$。（顶角为直角时 $H=A$，$BH=AB$，不合。）',
        '④ 腰上的高 $=\\frac12$ 底：Rt$\\triangle BHC$ 中 $BH=\\frac12BC$，$\\angle BCH=30^\\circ$，也就是底角 $\\angle ACB=30^\\circ$（底角是锐角，$H$ 在射线 $CA$ 上），顶角 $120^\\circ$。',
        '所以顶角是 $30^\\circ$、$90^\\circ$、$120^\\circ$ 或 $150^\\circ$。两个环节：先补证“直角边等于斜边一半 → $30^\\circ$”，再按“哪条边上的高 × 哪条边的一半”以及腰上的高在内、在外两层分类。坑：只考虑腰上的高等于腰的一半，或漏掉钝角的情况。',
      ],
      verify: () => {
        // 枚举顶角（0.5° 一档），计算两种高与两种边，检查“高 = 某边的一半”
        const S = SVG221, r = [];
        for (let k = 1; k < 360; k++) {
          const t = k / 2, h = ((t / 2) * Math.PI) / 180, A = [0, 0], B = [-Math.sin(h), -Math.cos(h)], C = [Math.sin(h), -Math.cos(h)];
          const heights = [S.dist(A, S.mid(B, C)), S.dist(B, S.foot(B, A, C))], sides = [1, S.dist(B, C)];
          if (heights.some(x => sides.some(y => Math.abs(x - y / 2) < 1e-9))) r.push(t);
        }
        return r;
      },
    },
    {
      id: '22.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=12$，$AB$ 边上的中线 $CM=6$，$\\triangle ABC$ 的面积为 $18$。求 $\\angle A$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$\\angle A=$', answer: ['15', '75'], suffix: '°' },
      ],
      explain: [
        '第一步，判定直角：$CM=6=\\frac12AB$，$AB$ 边上的中线等于 $AB$ 的一半，所以 $\\angle ACB=90^\\circ$，并且 $MA=MB=MC$。',
        '第二步，求高：作 $CH\\perp AB$，垂足为 $H$。$\\frac12\\times12\\times CH=18$，$CH=3=\\frac12CM$。',
        '第三步，由 $CH=\\frac12CM$ 推出 $\\angle CMH=30^\\circ$（这一步要自己证）：作点 $C$ 关于直线 $AB$ 的对称点 $C\'$，$CC\'$ 过 $H$，$CC\'=2CH=6$。$AB$ 垂直平分 $CC\'$，$MC\'=MC=6$，所以 $\\triangle MCC\'$ 是等边三角形；$MH\\perp CC\'$，由三线合一，$\\angle CMH=\\frac12\\times60^\\circ=30^\\circ$。（$CH\\ne CM$，所以 $H$ 与 $M$ 不重合。）',
        '第四步，分类：$MA=MC$，$\\angle ACM=\\angle A$，外角 $\\angle CMB=2\\angle A$。若 $H$ 在 $M$、$B$ 之间，$\\angle CMB=30^\\circ$，$\\angle A=15^\\circ$；若 $H$ 在 $A$、$M$ 之间，$\\angle CMA=30^\\circ$，$\\angle CMB=150^\\circ$，$\\angle A=75^\\circ$。',
        '所以 $\\angle A=15^\\circ$ 或 $75^\\circ$。三个环节：中线的逆命题判定直角，面积求高，“高等于中线的一半”用轴对称造等边三角形得 $30^\\circ$，再按垂足的位置分类。坑：只想到 $15^\\circ$；或者没先判定直角，以为条件不够。',
      ],
      verify: () => {
        // A=(0,0)，B=(12,0)，面积 18 ⇒ C 的纵坐标为 3；CM=6 ⇒ C 的横坐标为 6±√27
        const S = SVG221, A = [0, 0], B = [12, 0], r = [];
        for (const sg of [1, -1]) {
          const C = [6 + sg * Math.sqrt(36 - 9), 3];
          if (Math.abs(S.dist(C, [6, 0]) - 6) < 1e-9) r.push(Math.round(S.ang(A, B, C) * 1e6) / 1e6);
        }
        return r.sort((p, q) => p - q);
      },
    },
  ],
});
