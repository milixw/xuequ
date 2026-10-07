'use strict';

// 上海数学八年级上册 · 22.2 角平分线
// 知识范围：尺规作角的平分线；角平分线的性质定理（角平分线上的点到角两边所在直线的距离相等）及逆定理（在角的内部，到角两边所在直线距离相等的点在角的平分线上）；
//   三角形三个内角的平分线交于一点（内心），内心到三边距离相等
// 可以使用：22.1（两锐角互余、斜边上的中线等于斜边一半、30° 角所对直角边等于斜边一半、直角三角形全等的判定定理（斜边、直角边））；第 17、18 章（全等、等腰、等边、垂直平分线、外角）；三角形面积公式
// 还没学：勾股定理、斜边大于直角边、垂线段最短（22.3）；平行四边形与矩形的性质、相似、三角比、圆

const SVG222 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  poly: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.5" fill="#2b2b2b"/>`,
  // 直角记号：在 F 处，两条边分别指向 P、Q
  right: (F, P, Q, s = 7) => {
    const u = SVG222.unit(F, P), v = SVG222.unit(F, Q);
    const a = [F[0] + u[0] * s, F[1] + u[1] * s], b = [a[0] + v[0] * s, a[1] + v[1] * s], c = [F[0] + v[0] * s, F[1] + v[1] * s];
    return `<polyline points="${[a, b, c].map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1"/>`;
  },
  unit: (P, Q) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); return [(Q[0] - P[0]) / d, (Q[1] - P[1]) / d]; },
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  ang: (P, Q, R) => {  // ∠QPR（度）
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    return (Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v)))) * 180) / Math.PI;
  },
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  // 点 P 在直线 QR 上的垂足、到直线 QR 的距离
  foot: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    return [Q[0] + t * u[0], Q[1] + t * u[1]];
  },
  dl: (P, Q, R) => SVG222.dist(P, SVG222.foot(P, Q, R)),
  // 点 P 绕点 C 逆时针（数学坐标）旋转 deg 度
  rot: (P, C, deg) => {
    const t = (deg * Math.PI) / 180, x = P[0] - C[0], y = P[1] - C[1];
    return [C[0] + x * Math.cos(t) - y * Math.sin(t), C[1] + x * Math.sin(t) + y * Math.cos(t)];
  },
  pt: (r, deg) => [r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180)],
  // ∠QPR 的平分线上的另一点（内角平分线），外角平分线方向与它垂直
  bis: (P, Q, R) => { const u = SVG222.unit(P, Q), v = SVG222.unit(P, R); return [P[0] + u[0] + v[0], P[1] + u[1] + v[1]]; },
  exb: (P, Q, R) => { const u = SVG222.unit(P, Q), v = SVG222.unit(P, R); return [P[0] + u[0] - v[0], P[1] + u[1] - v[1]]; },
  // 由底边 BC（数学坐标，B=(0,0)、C=(a,0)）和两个底角求顶点 A
  apex: (a, angB, angC) => SVG222.meet([0, 0], SVG222.pt(1, angB), [a, 0], [a - Math.cos((angC * Math.PI) / 180), Math.sin((angC * Math.PI) / 180)]),
  // 三边 BC=a、CA=b、AB=c：B=(0,0)、C=(a,0)，A 在上方
  tri: (a, b, c) => { const x = (c * c - b * b + a * a) / (2 * a); return [x, Math.sqrt(c * c - x * x)]; },
  // 两条内角平分线的交点（内心）
  inc: (A, B, C) => SVG222.meet(A, SVG222.bis(A, B, C), B, SVG222.bis(B, A, C)),
};
const R222 = v => Math.round(v * 1e9) / 1e9;
// 小数化成分数字符串（分母不超过 1000），给 verify 用
const D222 = v => Math.round(v * 1e6) / 1e6;
const FR222 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return d === 1 ? String(n) : `${n}/${d}`; } return String(v); };

const FIG222 = (() => {
  const S = SVG222, out = {};
  const V = (ox, oy, k) => p => [ox + k * p[0], oy - k * p[1]];
  // b02：∠C=90°，AD 平分 ∠BAC，BC=10，BD=6（AC:AB=2:3）
  {
    const f = V(30, 190, 18), Cm = [0, 0], Bm = [10, 0], Am = [0, 4 * Math.sqrt(5)], Dm = [4, 0];
    const [A, B, C, D] = [Am, Bm, Cm, Dm].map(f);
    out.b02 = S.wrap(240, 215, S.poly([A, B, C]) + S.seg(A, D) + S.right(C, A, B)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('D', D, 0, 14));
  }
  // b03：∠C=90°，AC=BC，AD 平分 ∠CAB，DE⊥AB，AB=13
  {
    const s = 13 / Math.SQRT2, f = V(30, 195, 17), Cm = [0, 0], Am = [0, s], Bm = [s, 0];
    const Dm = [(s * s) / (s + 13), 0], Em = S.foot(Dm, Am, Bm);
    const [A, B, C, D, E] = [Am, Bm, Cm, Dm, Em].map(f);
    out.b03 = S.wrap(230, 220, S.poly([A, B, C]) + S.seg(A, D) + S.seg(D, E) + S.right(C, A, B) + S.right(E, D, B)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('D', D, 0, 14) + S.text('E', E, 8, -8));
  }
  // b04：AB=8，AC=6，AD 平分 ∠BAC，DE⊥AB，DE=3（sin A=7/8）
  {
    const f = V(25, 170, 26), Am = [0, 0], Bm = [8, 0], Cm = [6 * Math.sqrt(1 - 0.875 * 0.875), 6 * 0.875];
    const Dm = S.at(Bm, Cm, 8 / 14), Em = S.foot(Dm, Am, Bm);
    const [A, B, C, D, E] = [Am, Bm, Cm, Dm, Em].map(f);
    out.b04 = S.wrap(260, 195, S.poly([A, B, C]) + S.seg(A, D) + S.seg(D, E) + S.right(E, D, B)
      + S.text('A', A, -10, 4) + S.text('B', B, 10, 4) + S.text('C', C, 0, -14) + S.text('D', D, 12, -2) + S.text('E', E, 0, 14));
  }
  // b05：∠BAC、∠ABC 的平分线交于 O，∠ACB=64°（按 ∠ABC=50° 画）
  {
    const f = V(20, 185, 22), Bm = [0, 0], Cm = [10, 0], Am = S.apex(10, 50, 64), Om = S.inc(Am, Bm, Cm);
    const [A, B, C, O] = [Am, Bm, Cm, Om].map(f);
    out.b05 = S.wrap(260, 205, S.poly([A, B, C]) + S.seg(A, O) + S.seg(B, O) + S.seg(C, O, true)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('O', O, 0, 15));
  }
  // b07：∠AOB=30°，OP 平分 ∠AOB，PC∥OA 交 OB 于 C，PD⊥OA，PC=7
  {
    const f = V(20, 105, 17), Om = [0, 0], Cm = S.pt(7, 30), Pm = [Cm[0] + 7, Cm[1]], Dm = [Pm[0], 0];
    const Am = [16, 0], Bm = S.pt(10.5, 30);
    const [O, A, B, C, P, D] = [Om, Am, Bm, Cm, Pm, Dm].map(f);
    out.b07 = S.wrap(305, 125, S.seg(O, A) + S.seg(O, B) + S.seg(O, P) + S.seg(C, P) + S.seg(P, D) + S.right(D, P, A)
      + S.text('O', O, -10, 4) + S.text('A', A, 4, 14) + S.text('B', B, 8, -8) + S.text('C', C, -4, -14) + S.text('P', P, 10, -8) + S.text('D', D, 0, 14));
  }
  // b08：直线 a、b 相交于 O
  {
    const f = V(120, 80, 1), O = f([0, 0]);
    const a1 = f([-105, 0]), a2 = f([105, 0]), b1 = f(S.pt(-95, 50)), b2 = f(S.pt(95, 50));
    out.b08 = S.wrap(240, 160, S.seg(a1, a2) + S.seg(b1, b2) + S.dot(O)
      + S.text('O', O, 4, 14) + S.text('a', a2, -6, -12) + S.text('b', b2, 10, 2));
  }
  // b09：∠B=46°，∠C=64°，D 在 BC 上，DE⊥AB，DF⊥AC，DE=DF
  {
    const f = V(20, 175, 22), Bm = [0, 0], Cm = [10, 0], Am = S.apex(10, 46, 64), Dm = S.meet(Am, S.bis(Am, Bm, Cm), Bm, Cm);
    const Em = S.foot(Dm, Am, Bm), Fm = S.foot(Dm, Am, Cm);
    const [A, B, C, D, E, F] = [Am, Bm, Cm, Dm, Em, Fm].map(f);
    out.b09 = S.wrap(260, 200, S.poly([A, B, C]) + S.seg(A, D) + S.seg(D, E) + S.seg(D, F) + S.right(E, D, B) + S.right(F, D, C)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14) + S.text('E', E, -10, -6) + S.text('F', F, 10, -6));
  }
  // e01：∠C=90°，∠B=30°，AD 平分 ∠BAC，D 到 AB 的距离为 3
  {
    const f = V(30, 150, 22), Cm = [0, 0], Bm = [9, 0], Am = [0, 9 / Math.sqrt(3)], Dm = [3, 0], Em = S.foot(Dm, Am, Bm);
    const [A, B, C, D, E] = [Am, Bm, Cm, Dm, Em].map(f);
    out.e01 = S.wrap(250, 175, S.poly([A, B, C]) + S.seg(A, D) + S.right(C, A, B)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('D', D, 0, 14));
  }
  // e02：∠C=90°，AC=8，BC=15，AB=17，沿 AD 折叠，C 落在 AB 上的 E
  {
    const f = V(30, 140, 13), Cm = [0, 0], Am = [0, 8], Bm = [15, 0], Dm = [4.8, 0], Em = [120 / 17, 8 - 64 / 17];
    const [A, B, C, D, E] = [Am, Bm, Cm, Dm, Em].map(f);
    out.e02 = S.wrap(250, 165, S.poly([A, B, C]) + S.seg(A, D) + S.seg(D, E, true) + S.right(C, A, B)
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('D', D, 0, 14) + S.text('E', E, 8, -8));
  }
  // e03：AB=9，AC=6，BC=10，AD 平分 ∠BAC
  {
    const f = V(20, 150, 22), Bm = [0, 0], Cm = [10, 0], Am = S.tri(10, 6, 9), Dm = S.meet(Am, S.bis(Am, Bm, Cm), Bm, Cm);
    const [A, B, C, D] = [Am, Bm, Cm, Dm].map(f);
    out.e03 = S.wrap(260, 175, S.poly([A, B, C]) + S.seg(A, D)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14));
  }
  // e05：AB=11，AC=5（按 ∠BAC=60° 画），∠BAC 的平分线与 BC 的垂直平分线交于 P
  {
    const f = V(20, 165, 20), Am = [0, 0], Bm = [11, 0], Cm = S.pt(5, 60);
    const Mm = S.at(Bm, Cm, 0.5), Pm = S.meet(Am, S.pt(1, 30), Mm, [Mm[0] - (Cm[1] - Bm[1]), Mm[1] + (Cm[0] - Bm[0])]);
    const Em = S.foot(Pm, Am, Bm), Fm = S.foot(Pm, Am, Cm);
    const [A, B, C, P, E, F, M] = [Am, Bm, Cm, Pm, Em, Fm, Mm].map(f);
    out.e05 = S.wrap(260, 185, S.poly([A, B, C]) + S.seg(C, F) + S.seg(A, P) + S.seg(P, E) + S.seg(P, F) + S.seg(P, B) + S.seg(P, C)
      + S.seg(S.at(P, M, 1.25), P, true) + S.right(E, P, B) + S.right(F, P, C) + S.right(M, P, B)
      + S.text('A', A, -10, 4) + S.text('B', B, 10, 6) + S.text('C', C, -12, 2) + S.text('P', P, 10, -6) + S.text('E', E, 0, 14) + S.text('F', F, -4, -14));
  }
  // e06：∠AOB=60°，OC 平分 ∠AOB，P 在 OC 上，OP=10，PD⊥OA，PE⊥OB，M 是 OP 中点
  {
    const f = V(20, 200, 16), Om = [0, 0], Am = [14, 0], Bm = S.pt(13, 60), Cm = S.pt(13.5, 30), Pm = S.pt(10, 30);
    const Dm = [Pm[0], 0], Em = S.foot(Pm, Om, Bm), Mm = S.at(Om, Pm, 0.5);
    const [O, A, B, C, P, D, E, M] = [Om, Am, Bm, Cm, Pm, Dm, Em, Mm].map(f);
    out.e06 = S.wrap(270, 220, S.seg(O, A) + S.seg(O, B) + S.seg(O, C) + S.seg(P, D) + S.seg(P, E) + S.seg(M, D) + S.seg(M, E)
      + S.right(D, P, A) + S.right(E, P, B)
      + S.text('O', O, -10, 4) + S.text('A', A, 4, 14) + S.text('B', B, 10, -4) + S.text('C', C, 10, -2) + S.text('P', P, 10, -8)
      + S.text('D', D, 0, 14) + S.text('E', E, -12, -2) + S.text('M', M, 2, 14));
  }
  // c01：AB=13，BC=14，CA=15，∠B、∠C 的外角平分线交于 P，PM⊥AB 的延长线，PN⊥AC 的延长线
  {
    const f = V(55, 125, 8.6), Bm = [0, 0], Cm = [14, 0], Am = [5, 12];
    const Pm = S.meet(Bm, S.exb(Bm, Cm, Am), Cm, S.exb(Cm, Bm, Am)), Mm = S.foot(Pm, Am, Bm), Nm = S.foot(Pm, Am, Cm);
    const [A, B, C, P, M, N] = [Am, Bm, Cm, Pm, Mm, Nm].map(f);
    out.c01 = S.wrap(265, 255, S.poly([A, B, C]) + S.seg(B, M) + S.seg(C, N) + S.seg(B, P) + S.seg(C, P) + S.seg(P, M) + S.seg(P, N)
      + S.right(M, P, A) + S.right(N, P, A)
      + S.text('A', A, 0, -14) + S.text('B', B, -12, -4) + S.text('C', C, 12, -4) + S.text('P', P, 0, 14) + S.text('M', M, -12, 2) + S.text('N', N, 12, 2));
  }
  // c02：∠MON=120°，OC 平分，P 在 OC 上；A 在直线 OM 上，PA 绕 P 逆时针转 60° 得 PB，B 在直线 ON 上（画的是 OA=1.5 的情形，不是 (2) 的解）
  {
    const f = V(60, 150, 24), Om = [0, 0], Pm = [6, 0], Am = S.pt(1.5, 60), Bm = S.rot(Am, Pm, 60);
    const Mm = S.pt(5.5, 60), Nm = S.pt(5.5, -60), M2 = S.pt(-2, 60), N2 = S.pt(-2, -60), Cm = [8, 0];
    const [O, P, A, B, M, N, M_, N_, C] = [Om, Pm, Am, Bm, Mm, Nm, M2, N2, Cm].map(f);
    out.c02 = S.wrap(275, 300, S.seg(O, M) + S.seg(O, N) + S.seg(O, M_, true) + S.seg(O, N_, true) + S.seg(O, C) + S.seg(P, A) + S.seg(P, B) + S.dot(A) + S.dot(B)
      + S.text('O', O, -12, -4) + S.text('M', M, 10, -4) + S.text('N', N, 10, 4) + S.text('C', C, 4, 14) + S.text('P', P, 4, 14)
      + S.text('A', A, -12, -4) + S.text('B', B, -12, 4));
  }
  // c03：AB=6，AC=4，BC=8，内心 I，AI 的延长线交 BC 于 D
  {
    const f = V(20, 120, 26), Bm = [0, 0], Cm = [8, 0], Am = S.tri(8, 4, 6), Im = S.inc(Am, Bm, Cm), Dm = S.meet(Am, Im, Bm, Cm);
    const [A, B, C, I, D] = [Am, Bm, Cm, Im, Dm].map(f);
    out.c03 = S.wrap(250, 145, S.poly([A, B, C]) + S.seg(A, D) + S.seg(B, I) + S.seg(C, I, true)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('I', I, -10, -4) + S.text('D', D, 0, 14));
  }
  // c05：∠C=90°，AC=5，BC=12，AB=13，P 沿 C→B→A 运动
  {
    const f = V(30, 120, 18), Cm = [0, 0], Am = [0, 5], Bm = [12, 0], Pm = [4.6, 0];
    const [A, B, C, P] = [Am, Bm, Cm, Pm].map(f);
    out.c05 = S.wrap(280, 145, S.poly([A, B, C]) + S.right(C, A, B) + S.dot(P)
      + `<path d="M${(P[0] + 10).toFixed(1)},${(P[1] + 10).toFixed(1)} h30 m-6,-4 l6,4 l-6,4" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`
      + S.text('A', A, -10, -4) + S.text('B', B, 10, 6) + S.text('C', C, -10, 6) + S.text('P', P, 0, -14));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s1/22.2',
  title: '角平分线',
  review: { status: 'pending' },
  audit: { blind: '2026-10-07', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“性质定理”配 bisectorDist 拖动演示，“内心”配 incenter 演示，e02 解析配 motion 翻折动画。第 1 轮 c03（平分线分对边成比例正算加倒算）与 e03 同套路且只有 4～5 级，e02 用了流传的 6、8、10 折叠原数据，扩展档没有 5 级，c02 分类偏少，卡片三条易错提醒与 b01 三个错项一一对应，e05 垂直平分线缺垂直记号；第 2 轮 c03 换成两个比例联立求三边加内心面积比，e02 换成 8、15、17，e04 加反求 ∠BAC 一问，c02 加 OA=8 时 B 越过 O 的情形，b01 换选项并改卡片易错提醒，补记号，c03 配图按新数据重画后整节通过' },

  intro: [
    {
      title: '用尺规作角的平分线',
      body: '角是轴对称图形，对称轴是它的平分线所在的直线。作 $\\angle AOB$ 的平分线：以 $O$ 为圆心、任意长为半径画弧，交 $OA$、$OB$ 于 $D$、$E$；再分别以 $D$、$E$ 为圆心、$DE$ 的长为半径画弧，两弧在角内交于 $C$；作射线 $OC$。连接 $CD$、$CE$，用三角形全等可以说明 $\\angle COD=\\angle COE$。',
      example: '$\\angle AOB=110^\\circ$，作出平分线 $OC$，$\\angle AOC=55^\\circ$；再平分 $\\angle AOC$，就得到 $27.5^\\circ$（即 $27^\\circ30\'$）的角。',
    },
    {
      title: '性质定理：平分线上的点到两边距离相等',
      body: '**定理**：角平分线上的点到这个角的两边所在直线的距离相等（过点作两边的垂线段，用 AAS 证两个直角三角形全等）。拖动下面的点试一试：点在平分线上时两条垂线段一样长，离开平分线就不相等了。',
      example: '$OC$ 平分 $\\angle AOB$，点 $P$ 在 $OC$ 上，$P$ 到 $OA$ 的距离是 $4.5$，那么 $P$ 到 $OB$ 的距离也是 $4.5$。',
      pitfall: '“距离”指垂线段的长。平分线上一点与两边上随便两点的连线，一般并不相等。',
      demo: { type: 'bisectorDist', angle: 60 },
    },
    {
      title: '逆定理：到两边距离相等的点在平分线上',
      body: '**定理**：在角的内部，到角的两边所在直线距离相等的点，在这个角的平分线上（用直角三角形全等的判定定理证）。它常用来说明“某条线平分某个角”。',
      example: '点 $Q$ 在 $\\angle MON$ 的内部，$Q$ 到 $OM$、$ON$ 的距离都是 $2$，所以射线 $OQ$ 平分 $\\angle MON$。',
      pitfall: '性质定理由“在平分线上”推出“距离相等”；逆定理反过来，用来说明“平分”。写理由时别把两个定理用反。',
    },
    {
      title: '三角形的内心',
      body: '三角形两个内角的平分线交于一点，这点到三边的距离都相等，由逆定理它也在第三个角的平分线上。所以**三角形的三个内角的平分线相交于一点，这个交点叫作三角形的内心**，内心到三边的距离相等。拖动顶点看一看。',
      example: '$\\triangle ABC$ 的内心 $I$ 到 $AB$ 的距离是 $1.5$，那么 $I$ 到 $BC$、$CA$ 的距离也都是 $1.5$。',
      pitfall: '内心到三条边距离相等，到三个顶点的距离一般并不相等。',
      demo: { type: 'incenter' },
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '22.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，正确的是（　　）',
      options: [
        '三角形的内心可能在三角形的外部',
        '直角三角形两个锐角的平分线的交点，到斜边的距离等于到两条直角边的距离',
        '等腰三角形底边上任意一点到两腰的距离都相等',
        '点 $P$ 到 $\\angle AOB$ 两边所在直线的距离相等，那么射线 $OP$ 平分 $\\angle AOB$',
      ],
      answer: 1,
      explain: [
        'A 错：内心是三条内角平分线的交点，每条内角平分线都在三角形内部，交点一定在三角形内部（在外部的是外心的一种情况）。',
        'B 对：两个锐角的平分线交于内心，内心到三边距离相等，选 B。',
        'C 错：底边上的点只有中点（在顶角平分线上）到两腰距离相等，其他点离较远的那腰更远。',
        'D 错：漏了“$P$ 在角的内部”。$P$ 在角的外部时，到两边所在直线距离相等，却不在这个角的平分线上。',
        '坑：D 和逆定理只差一个条件，容易误选。',
      ],
      verify: () => {
        const S = SVG222, O = [0, 0], A = [5, 0], B = S.pt(5, 70);
        const inside = (P, T) => { const c = (U, V) => (V[0] - U[0]) * (P[1] - U[1]) - (V[1] - U[1]) * (P[0] - U[0]); const s = [c(T[0], T[1]), c(T[1], T[2]), c(T[2], T[0])]; return s.every(x => x > 0) || s.every(x => x < 0); };
        // A：几个形状各异（含钝角）的三角形，内心都在内部
        const okA = ![[[0, 0], [7, 0], [2, 4]], [[0, 0], [10, 0], [12, 1]], [[0, 0], [3, 0], [-4, 1]]].every(T => inside(S.inc(...T), T));
        // B：直角三角形内心到三边距离
        const R = [[0, 0], [5, 0], [0, 3]], I = S.inc(...R), okB = Math.abs(S.dl(I, R[1], R[2]) - S.dl(I, R[0], R[1])) < 1e-9 && Math.abs(S.dl(I, R[0], R[2]) - S.dl(I, R[0], R[1])) < 1e-9;
        // C：等腰三角形底边上非中点的点
        const Tb = [[0, 0], [6, 0], [3, 5]], X = [2, 0], okC = Math.abs(S.dl(X, Tb[0], Tb[2]) - S.dl(X, Tb[1], Tb[2])) < 1e-9;
        // D：角外的点到两直线距离相等，但不在平分线上
        const Q = S.pt(3, 125), okD = Math.abs(S.dl(Q, O, A) - S.dl(Q, O, B)) < 1e-9 && Math.abs(S.ang(O, A, Q) - 35) < 1e-9;
        return [okA, okB, okC, okD].indexOf(true);
      },
    },
    {
      id: '22.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$AD$ 平分 $\\angle BAC$，交 $BC$ 于点 $D$，$BC=10$，$BD=6$。求点 $D$ 到 $AB$ 的距离。',
      figure: FIG222.b02,
      blanks: [{ kind: 'num', label: '距离为', answer: '4' }],
      explain: [
        '过 $D$ 作 $DE\\perp AB$，垂足为 $E$，$DE$ 就是 $D$ 到 $AB$ 的距离。',
        '$AD$ 平分 $\\angle BAC$，$DC\\perp AC$，$DE\\perp AB$，由性质定理 $DE=DC$。',
        '$DC=BC-BD=10-6=4$，所以距离为 $4$。坑：把 $BD=6$ 当成距离——$BD$ 并不垂直于 $AB$。',
      ],
      verify: () => {
        const S = SVG222, C = [0, 0], B = [10, 0], A = [0, 4 * Math.sqrt(5)], D = S.meet(A, S.bis(A, B, C), B, C);
        return Math.abs(S.dist(B, D) - 6) < 1e-9 ? R222(S.dl(D, A, B)) : null;
      },
    },
    {
      id: '22.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$AC=BC$，$AD$ 平分 $\\angle CAB$，交 $BC$ 于点 $D$，$DE\\perp AB$，垂足为 $E$，$AB=13$。求 $\\triangle DBE$ 的周长。',
      figure: FIG222.b03,
      blanks: [{ kind: 'num', label: '周长为', answer: '13' }],
      explain: [
        '由性质定理，$DE=DC$。',
        '在 $\\mathrm{Rt}\\triangle ACD$ 和 $\\mathrm{Rt}\\triangle AED$ 中，$AD=AD$，$DC=DE$，由直角三角形全等的判定定理得两三角形全等，所以 $AE=AC=BC$。',
        '周长 $=DB+DE+EB=DB+DC+EB=BC+EB=AE+EB=AB=13$。坑：以为不知道 $AC$ 就算不出来——两次“换线段”后正好凑成 $AB$。',
      ],
      verify: () => {
        const S = SVG222, s = 13 / Math.SQRT2, C = [0, 0], A = [0, s], B = [s, 0], D = S.meet(A, S.bis(A, C, B), B, C), E = S.foot(D, A, B);
        return R222(S.dist(D, B) + S.dist(D, E) + S.dist(E, B));
      },
    },
    {
      id: '22.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AD$ 平分 $\\angle BAC$，交 $BC$ 于点 $D$，$DE\\perp AB$，垂足为 $E$，$DE=3$，$AB=8$，$AC=6$。求 $\\triangle ABC$ 的面积。',
      figure: FIG222.b04,
      blanks: [{ kind: 'num', label: '面积为', answer: '21' }],
      explain: [
        '过 $D$ 作 $DF\\perp AC$，垂足为 $F$。由性质定理，$DF=DE=3$。',
        '$S_{\\triangle ABC}=S_{\\triangle ABD}+S_{\\triangle ACD}=\\frac12\\times8\\times3+\\frac12\\times6\\times3=12+9=21$。',
        '坑：只算了 $\\triangle ABD$ 的面积 $12$，或者以为没有 $AC$ 边上的高就算不了。',
      ],
      verify: () => {
        const S = SVG222, A = [0, 0], B = [8, 0], C = [6 * Math.sqrt(1 - 0.875 * 0.875), 6 * 0.875];
        const D = S.meet(A, S.bis(A, B, C), B, C);
        return Math.abs(S.dl(D, A, B) - 3) < 1e-9 ? R222((8 * C[1]) / 2) : null;
      },
    },
    {
      id: '22.2-b05',
      level: 'basic',
      type: 'choice',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle BAC$ 与 $\\angle ABC$ 的平分线相交于点 $O$，连接 $CO$，$\\angle ACB=64^\\circ$，则 $\\angle ACO$ 等于（　　）',
      figure: FIG222.b05,
      options: ['$26^\\circ$', '$32^\\circ$', '$58^\\circ$', '条件不足，无法确定'],
      answer: 1,
      explain: [
        '$O$ 在 $\\angle BAC$ 的平分线上，到 $AB$、$AC$ 的距离相等；$O$ 在 $\\angle ABC$ 的平分线上，到 $AB$、$BC$ 的距离相等。',
        '所以 $O$ 到 $CA$、$CB$ 的距离相等，又 $O$ 在 $\\angle ACB$ 的内部，由逆定理 $CO$ 平分 $\\angle ACB$（三角形三条角平分线交于一点）。',
        '$\\angle ACO=\\frac12\\times64^\\circ=32^\\circ$，选 B。坑：题目没说 $CO$ 平分 $\\angle ACB$ 就选“无法确定”。',
      ],
      verify: () => {
        // 换几个 ∠ABC，都作两条平分线求交点，量 ∠ACO
        const S = SVG222, vals = [30, 50, 80].map(b => { const B = [0, 0], C = [10, 0], A = S.apex(10, b, 64); return D222(S.ang(C, A, S.inc(A, B, C))); });
        return vals.every(v => v === vals[0]) ? [26, 32, 58].indexOf(vals[0]) : -1;
      },
    },
    {
      id: '22.2-b06',
      level: 'basic',
      type: 'choice',
      stem: '在 $\\triangle ABC$ 中，$\\angle ABC=50^\\circ$，$\\angle ACB=70^\\circ$，点 $P$ 在 $\\triangle ABC$ 内部，且 $P$ 到三角形三条边的距离相等，连接 $PA$。则 $\\angle PAB$ 等于（　　）',
      options: ['$20^\\circ$', '$25^\\circ$', '$30^\\circ$', '$35^\\circ$'],
      answer: 2,
      explain: [
        '$P$ 在 $\\angle BAC$ 内部，到 $AB$、$AC$ 的距离相等，由逆定理 $PA$ 平分 $\\angle BAC$。',
        '$\\angle BAC=180^\\circ-50^\\circ-70^\\circ=60^\\circ$，$\\angle PAB=30^\\circ$，选 C。',
        '坑：把“到三条边距离相等”当成“到三个顶点距离相等”（那是三边垂直平分线的交点），会算出 $20^\\circ$。',
      ],
      verify: () => {
        const S = SVG222, B = [0, 0], C = [10, 0], A = S.apex(10, 50, 70), P = S.inc(A, B, C);
        const eq = Math.abs(S.dl(P, A, B) - S.dl(P, B, C)) < 1e-9 && Math.abs(S.dl(P, B, C) - S.dl(P, C, A)) < 1e-9;
        return eq ? [20, 25, 30, 35].indexOf(D222(S.ang(A, P, B))) : -1;
      },
    },
    {
      id: '22.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\angle AOB=30^\\circ$，点 $P$ 在 $\\angle AOB$ 的平分线上，$PC\\parallel OA$，交 $OB$ 于点 $C$，$PD\\perp OA$，垂足为 $D$，$PC=7$。求 $PD$ 的长。',
      figure: FIG222.b07,
      blanks: [{ kind: 'num', label: '$PD=$', answer: '7/2' }],
      explain: [
        '$PD$ 和 $PC$ 不在同一个直角三角形里。过 $P$ 作 $PE\\perp OB$，垂足为 $E$，由性质定理 $PD=PE$。',
        '$PC\\parallel OA$，同位角相等，$\\angle PCB=\\angle AOB=30^\\circ$；它是锐角，所以 $E$ 在射线 $CB$ 上，$\\angle PCE=30^\\circ$。',
        '在 $\\mathrm{Rt}\\triangle PEC$ 中，$30^\\circ$ 角所对的直角边等于斜边的一半：$PE=\\frac12PC=\\frac72$，所以 $PD=\\frac72$。坑：想直接在 $\\triangle PDO$ 里求 $PD$，条件不够。',
      ],
      verify: () => {
        const S = SVG222, O = [0, 0], A = [1, 0], B = S.pt(1, 30), C = S.pt(7, 30), P = [C[0] + 7, C[1]];
        return Math.abs(S.ang(O, A, P) - 15) < 1e-9 ? FR222(S.dl(P, O, A)) : null;
      },
    },
    {
      id: '22.2-b08',
      level: 'basic',
      type: 'choice',
      stem: '如图，直线 $a$、$b$ 相交于点 $O$。到直线 $a$、$b$ 的距离相等，并且到点 $O$ 的距离为 $3$ 的点共有（　　）',
      figure: FIG222.b08,
      options: ['$1$ 个', '$2$ 个', '$4$ 个', '无数个'],
      answer: 2,
      explain: [
        '直线 $a$、$b$ 组成四个角。某个角内部的点到 $a$、$b$ 距离相等，由逆定理它在这个角的平分线上；直线上的点只有 $O$ 到两条直线距离都为 $0$，而 $O$ 到自己的距离不是 $3$。',
        '四个角的平分线组成两条直线：对顶角的平分线在同一条直线上，邻补角的平分线互相垂直。所以这些点在过 $O$ 的两条互相垂直的直线上。',
        '每条直线上到 $O$ 距离为 $3$ 的点有 $2$ 个，共 $4$ 个，选 C。坑：只想到一个角的平分线，答 $1$ 个或 $2$ 个。',
      ],
      verify: () => {
        // 在以 O 为圆心、半径 3 的圆上找到 a、b 距离相等的点（a 为 x 轴，b 与 a 成 50°）
        const S = SVG222, O = [0, 0], a2 = [1, 0], b2 = S.pt(1, 50), g = d => { const P = S.pt(3, d); return S.dl(P, O, a2) - S.dl(P, O, b2); };
        let n = 0;
        for (let k = 0; k < 36000; k++) { const x = g(k / 100), y = g((k + 1) / 100); if (x === 0 || x * y < 0) n++; }
        return [1, 2, 4].indexOf(n);
      },
    },
    {
      id: '22.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle B=46^\\circ$，$\\angle C=64^\\circ$，点 $D$ 在边 $BC$ 上，$DE\\perp AB$，$DF\\perp AC$，垂足分别为 $E$、$F$，且 $DE=DF$。求 $\\angle ADB$ 的度数。',
      figure: FIG222.b09,
      blanks: [{ kind: 'angle', label: '$\\angle ADB=$', answer: '99°' }],
      explain: [
        '$D$ 在 $\\angle BAC$ 的内部，到 $AB$、$AC$ 的距离相等，由逆定理 $AD$ 平分 $\\angle BAC$。',
        '$\\angle BAC=180^\\circ-46^\\circ-64^\\circ=70^\\circ$，$\\angle BAD=35^\\circ$。',
        '$\\angle ADB=180^\\circ-46^\\circ-35^\\circ=99^\\circ$。坑：把 $DE=DF$ 误当成“$D$ 是中点”或“$AD\\perp BC$”。',
      ],
      verify: () => {
        // 在 BC 上找 DE=DF 的点，量 ∠ADB
        const S = SVG222, B = [0, 0], C = [10, 0], A = S.apex(10, 46, 64), g = x => S.dl([x, 0], A, B) - S.dl([x, 0], A, C);
        let lo = 0.001, hi = 9.999;
        for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
        return D222(S.ang([lo, 0], A, B)) + '°';
      },
    },

    // ---------- 扩展 ----------
    {
      id: '22.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$\\angle B=30^\\circ$，$AD$ 平分 $\\angle BAC$，交 $BC$ 于点 $D$，点 $D$ 到 $AB$ 的距离为 $3$。求 $BC$ 和 $AD$ 的长。',
      figure: FIG222.e01,
      blanks: [
        { kind: 'num', label: '$BC=$', answer: '9' },
        { kind: 'num', label: '$AD=$', answer: '6' },
      ],
      explain: [
        '过 $D$ 作 $DE\\perp AB$，垂足为 $E$，$DE=3$。由性质定理，$DC=DE=3$。',
        '在 $\\mathrm{Rt}\\triangle BED$ 中，$\\angle B=30^\\circ$，$DE$ 是 $30^\\circ$ 角所对的直角边，所以斜边 $BD=2DE=6$，$BC=DC+BD=9$。',
        '$\\angle BAC=90^\\circ-30^\\circ=60^\\circ$，$\\angle BAD=30^\\circ=\\angle B$，所以 $AD=BD=6$（也可以在 $\\mathrm{Rt}\\triangle ACD$ 中由 $\\angle CAD=30^\\circ$ 得 $AD=2DC=6$）。',
        '转弯：同一个距离 $3$ 要用两次——先搬到 $DC$，再在 $\\triangle BED$ 里翻倍成 $BD$。坑：只算出 $BD=6$ 就当成 $BC$。',
      ],
      verify: () => {
        const S = SVG222, C = [0, 0], B = [1, 0], A = [0, 1 / Math.sqrt(3)], D = S.meet(A, S.bis(A, B, C), B, C), k = 3 / S.dl(D, A, B);
        return [R222(k * S.dist(B, C)), R222(k * S.dist(A, D))];
      },
    },
    {
      id: '22.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$AC=8$，$BC=15$，$AB=17$。把 $\\triangle ABC$ 沿过点 $A$ 的直线折叠，使点 $C$ 落在边 $AB$ 上的点 $E$ 处，折痕交 $BC$ 于点 $D$。求 $CD$ 的长和 $\\triangle ABD$ 的面积。',
      figure: FIG222.e02,
      blanks: [
        { kind: 'num', label: '$CD=$', answer: '24/5' },
        { kind: 'num', label: '$S_{\\triangle ABD}=$', answer: '204/5' },
      ],
      explain: [
        '折叠前后图形全等：$\\angle DAE=\\angle DAC$，所以 $AD$ 平分 $\\angle BAC$；$\\angle AED=\\angle C=90^\\circ$，$DE\\perp AB$，$DE=DC$（也可由性质定理得到）。',
        '设 $CD=x$，则 $D$ 到 $AC$、$AB$ 的距离都是 $x$。用面积：$S_{\\triangle ABC}=\\frac12\\times8\\times15=60$，又 $S_{\\triangle ABC}=S_{\\triangle ACD}+S_{\\triangle ABD}=\\frac12\\times8x+\\frac12\\times17x=\\frac{25}2x$。',
        '$\\frac{25}2x=60$，$x=\\frac{24}5$，$CD=\\frac{24}5$；$S_{\\triangle ABD}=\\frac12\\times17\\times\\frac{24}5=\\frac{204}5$。',
        '转弯：不会勾股定理，就把三角形按角平分线分成两块，两块的高都是 $x$。坑：以为 $E$ 是 $AB$ 的中点。',
      ],
      demo: { type: 'motion', mode: 'reflect', shape: [[0, 8], [0, 0], [4.8, 0]], labels: ['A', 'C', 'D'], axis: [[0, 8], [4.8, 0]], view: [-1, 16, -1, 9] },
      verify: () => {
        const S = SVG222, C = [0, 0], A = [0, 8], B = [15, 0], D = S.meet(A, S.bis(A, B, C), B, C);
        // 检验 C 关于 AD 的对称点在 AB 上
        const F = S.foot(C, A, D), E = [2 * F[0] - C[0], 2 * F[1] - C[1]], onAB = Math.abs(S.dist(A, E) + S.dist(E, B) - 17) < 1e-9;
        return onAB ? [FR222(S.dist(C, D)), FR222((17 * S.dl(D, A, B)) / 2)] : null;
      },
    },
    {
      id: '22.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '(1) 如图，在 $\\triangle ABC$ 中，$AB=9$，$AC=6$，$BC=10$，$AD$ 平分 $\\angle BAC$，交 $BC$ 于点 $D$。求 $BD$ 的长。(2) 在另一个 $\\triangle ABC$ 中，$AD$ 平分 $\\angle BAC$，交 $BC$ 于点 $D$，$BD=4$，$DC=3$，$AB+AC=21$。求 $AB$ 的长。',
      figure: FIG222.e03,
      blanks: [
        { kind: 'num', label: '(1) $BD=$', answer: '6' },
        { kind: 'num', label: '(2) $AB=$', answer: '12' },
      ],
      explain: [
        '关键：用两种方法比较 $\\triangle ABD$ 和 $\\triangle ACD$ 的面积。',
        '① 以 $AB$、$AC$ 为底：$D$ 在 $\\angle BAC$ 的平分线上，到 $AB$、$AC$ 的距离相等（记为 $h$），$S_{\\triangle ABD}:S_{\\triangle ACD}=\\frac12AB\\cdot h:\\frac12AC\\cdot h=AB:AC$。',
        '② 以 $BD$、$DC$ 为底：两个三角形的高都是点 $A$ 到 $BC$ 的距离，$S_{\\triangle ABD}:S_{\\triangle ACD}=BD:DC$。所以 $BD:DC=AB:AC$。',
        '(1) $BD:DC=9:6=3:2$，$BD=10\\times\\frac35=6$。',
        '(2) 反过来用：$AB:AC=BD:DC=4:3$，$AB=21\\times\\frac47=12$。坑：(1) 以为 $D$ 是 $BC$ 的中点，答 $5$。',
      ],
      verify: () => {
        const S = SVG222, run = (a, b, c) => { const B = [0, 0], C = [a, 0], A = S.tri(a, b, c); return S.dist(B, S.meet(A, S.bis(A, B, C), B, C)); };
        // (2)：AC=21−AB，BC=7，扫描 AB 使 BD=4
        let ab = null;
        for (let k = 701; k < 1400; k++) { const x = k / 100; if (21 - x + 7 > x && x + 7 > 21 - x && Math.abs(run(7, 21 - x, x) - 4) < 1e-9) ab = x; }
        return [R222(run(10, 6, 9)), ab];
      },
    },
    {
      id: '22.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle BAC=50^\\circ$。平面内的点 $P$ 到直线 $AB$、$BC$、$CA$ 的距离都相等，连接 $PB$、$PC$。(1) 求 $\\angle BPC$ 的所有可能值；(2) 在另一个 $\\triangle ABC$ 中，有一个这样的点 $P$ 使 $\\angle BPC=40^\\circ$，求 $\\angle BAC$ 的所有可能值。（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $\\angle BPC=$', answer: ['115', '65', '25'], suffix: '°' },
        { kind: 'nums', label: '(2) $\\angle BAC=$', answer: ['100', '80'], suffix: '°' },
      ],
      explain: [
        '到两条相交直线距离相等的点，在它们所成角（或邻补角）的平分线上。所以 $P$ 在每个顶点处，要么在内角平分线上，要么在外角平分线上。这样的点有 $4$ 个：三条内角平分线的交点（内心），以及每个顶点的内角平分线与另两个顶点的外角平分线的交点。',
        '① 内心：$\\angle PBC+\\angle PCB=\\frac12(\\angle ABC+\\angle ACB)=\\frac12\\times130^\\circ=65^\\circ$，$\\angle BPC=115^\\circ$。',
        '② $P$ 在 $\\angle A$ 的平分线上、$\\angle B$ 和 $\\angle C$ 的外角平分线上（在 $BC$ 外侧）：$\\angle PBC+\\angle PCB=\\frac12(180^\\circ-\\angle ABC)+\\frac12(180^\\circ-\\angle ACB)=180^\\circ-65^\\circ=115^\\circ$，$\\angle BPC=65^\\circ$。',
        '③ $P$ 在 $\\angle B$ 的平分线上、$\\angle C$ 的外角平分线上：$\\angle C$ 的外角等于 $\\angle A+\\angle ABC$，它的一半是 $\\angle PBC$ 和 $\\angle BPC$ 的和（外角），所以 $\\angle BPC=\\frac12(\\angle A+\\angle ABC)-\\frac12\\angle ABC=\\frac12\\angle A=25^\\circ$。④ 在 $\\angle C$ 的平分线上的那一点同理也是 $25^\\circ$。',
        '(1) 所以 $\\angle BPC=115^\\circ$、$65^\\circ$ 或 $25^\\circ$。',
        '(2) 把三个结论反过来用（记 $\\angle BAC=\\alpha$）：内心时 $90^\\circ+\\frac\\alpha2=40^\\circ$，不可能（内心处的 $\\angle BPC$ 一定是钝角）；② 时 $90^\\circ-\\frac\\alpha2=40^\\circ$，$\\alpha=100^\\circ$；③④ 时 $\\frac\\alpha2=40^\\circ$，$\\alpha=80^\\circ$。两种都能取到合适的 $\\angle B$、$\\angle C$，所以 $\\angle BAC=100^\\circ$ 或 $80^\\circ$。',
        '转弯：“到三条直线距离相等”不只是内心，三角形外还有 $3$ 个点；反求时要逐个检验。坑：(1) 只答 $115^\\circ$；(2) 只想到内心，以为无解。',
      ],
      verify: () => {
        // 换两种 ∠ABC，求四个到三直线等距的点（内、外角平分线两两相交），量 ∠BPC
        const S = SVG222, res = new Set();
        for (const b of [55, 75]) {
          const B = [0, 0], C = [10, 0], A = S.apex(10, b, 130 - b);
          const lines = P => [[P, S.bis(P, ...[A, B, C].filter(X => X !== P))], [P, S.exb(P, ...[A, B, C].filter(X => X !== P))]];
          for (const la of lines(A)) for (const lb of lines(B)) {
            const P = S.meet(la[0], la[1], lb[0], lb[1]);
            const d = [S.dl(P, A, B), S.dl(P, B, C), S.dl(P, C, A)];
            if (Math.abs(d[0] - d[1]) < 1e-6 && Math.abs(d[1] - d[2]) < 1e-6) res.add(D222(S.ang(P, B, C)));
          }
        }
        // (2)：∠BAC 从 1° 到 179° 扫描（∠ABC 取剩下的 0.4 倍），找出某个等距点使 ∠BPC=40°
        const r2 = new Set();
        for (let al = 1; al < 180; al++) {
          const b = (180 - al) * 0.4, B = [0, 0], C = [10, 0], A = S.apex(10, b, 180 - al - b), T = [A, B, C];
          const lines = P => { const o = T.filter(X => X !== P); return [[P, S.bis(P, ...o)], [P, S.exb(P, ...o)]]; };
          for (const la of lines(A)) for (const lb of lines(B)) {
            const P = S.meet(la[0], la[1], lb[0], lb[1]);
            if (Math.abs(S.dl(P, A, B) - S.dl(P, C, A)) < 1e-6 && Math.abs(S.ang(P, B, C) - 40) < 1e-6) r2.add(al);
          }
        }
        return [[...res], [...r2]];
      },
    },
    {
      id: '22.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=11$，$AC=5$，$\\angle BAC$ 的平分线与边 $BC$ 的垂直平分线相交于点 $P$，$PE\\perp AB$ 于点 $E$，$PF\\perp AC$，交 $AC$ 的延长线于点 $F$，连接 $PB$、$PC$。(1) 求 $AE$、$BE$ 的长；(2) 若 $\\angle BAC=60^\\circ$，求 $\\angle BPC$ 的度数。',
      figure: FIG222.e05,
      blanks: [
        { kind: 'num', label: '(1) $AE=$', answer: '8' },
        { kind: 'num', label: '$BE=$', answer: '3' },
        { kind: 'angle', label: '(2) $\\angle BPC=$', answer: '120°' },
      ],
      explain: [
        '$P$ 在 $\\angle BAC$ 的平分线上，$PE=PF$；$P$ 在 $BC$ 的垂直平分线上，$PB=PC$。',
        '$\\mathrm{Rt}\\triangle PEB$ 与 $\\mathrm{Rt}\\triangle PFC$：斜边 $PB=PC$，直角边 $PE=PF$，由直角三角形全等的判定定理得全等，$BE=CF$。同理 $\\mathrm{Rt}\\triangle PEA\\cong\\mathrm{Rt}\\triangle PFA$，$AE=AF$。',
        '(1) $AE=AB-BE$，$AF=AC+CF=AC+BE$，所以 $11-BE=5+BE$，$BE=3$，$AE=8$。',
        '(2) $\\angle PAE=\\angle PAF=30^\\circ$，$\\angle APE=\\angle APF=60^\\circ$，$\\angle EPF=120^\\circ$。由 (1) 中的全等，$\\angle EPB=\\angle FPC$，所以 $\\angle BPC=\\angle CPE+\\angle EPB=\\angle CPE+\\angle FPC=\\angle EPF=120^\\circ$。',
        '转弯：两组全等把“和”与“差”联系起来，$BE=\\frac12(AB-AC)$；(2) 把 $\\angle BPC$ 换成 $\\angle EPF$。坑：以为 $P$ 在三角形内，或把 $F$ 画在线段 $AC$ 上。',
      ],
      verify: () => {
        const S = SVG222, A = [0, 0], B = [11, 0], C = S.pt(5, 60), M = S.at(B, C, 0.5);
        const P = S.meet(A, S.bis(A, B, C), M, [M[0] - (C[1] - B[1]), M[1] + (C[0] - B[0])]), E = S.foot(P, A, B);
        // (1) 与 ∠BAC 无关：换一个角再算一次
        const C2 = S.pt(5, 80), M2 = S.at(B, C2, 0.5), P2 = S.meet(A, S.bis(A, B, C2), M2, [M2[0] - (C2[1] - B[1]), M2[1] + (C2[0] - B[0])]);
        const same = Math.abs(S.dist(A, S.foot(P2, A, B)) - S.dist(A, E)) < 1e-9;
        return same ? [R222(S.dist(A, E)), R222(S.dist(B, E)), D222(S.ang(P, B, C)) + '°'] : null;
      },
    },
    {
      id: '22.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\angle AOB=60^\\circ$，$OC$ 平分 $\\angle AOB$，点 $P$ 在 $OC$ 上，$OP=10$，$PD\\perp OA$，$PE\\perp OB$，垂足分别为 $D$、$E$，$M$ 是 $OP$ 的中点，连接 $DM$、$EM$。求四边形 $PDME$ 的周长和 $\\angle DME$ 的度数。',
      figure: FIG222.e06,
      blanks: [
        { kind: 'num', label: '周长为', answer: '20' },
        { kind: 'angle', label: '$\\angle DME=$', answer: '120°' },
      ],
      explain: [
        '$\\angle POD=\\angle POE=30^\\circ$。在 $\\mathrm{Rt}\\triangle ODP$ 中，$PD=\\frac12OP=5$；由性质定理 $PE=PD=5$。',
        '$DM$、$EM$ 分别是 $\\mathrm{Rt}\\triangle ODP$、$\\mathrm{Rt}\\triangle OEP$ 斜边上的中线，$DM=EM=\\frac12OP=5$。周长 $=5\\times4=20$。',
        '$MO=MD$，$\\angle MDO=\\angle MOD=30^\\circ$，外角 $\\angle DMP=60^\\circ$；同理 $\\angle EMP=60^\\circ$，所以 $\\angle DME=120^\\circ$。',
        '转弯：把 22.1 的两个结论（$30^\\circ$ 角所对直角边、斜边上的中线）和角平分线的性质放在一起用。坑：以为 $\\angle DME=\\angle AOB=60^\\circ$。',
      ],
      verify: () => {
        const S = SVG222, O = [0, 0], A = [1, 0], B = S.pt(1, 60), P = S.pt(10, 30), D = S.foot(P, O, A), E = S.foot(P, O, B), M = S.at(O, P, 0.5);
        return [R222(S.dist(P, D) + S.dist(D, M) + S.dist(M, E) + S.dist(E, P)), D222(S.ang(M, D, E)) + '°'];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '22.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$AB=13$，$BC=14$，$CA=15$，面积为 $84$。$\\angle ABC$ 和 $\\angle ACB$ 的外角平分线相交于点 $P$，$PM\\perp$ 直线 $AB$ 于点 $M$，$PN\\perp$ 直线 $AC$ 于点 $N$。(1) 求 $AM$ 的长；(2) 求 $PM$ 的长；(3) $PM$ 是 $\\triangle ABC$ 的内心到 $BC$ 的距离的几倍？',
      figure: FIG222.c01,
      blanks: [
        { kind: 'num', label: '(1) $AM=$', answer: '21' },
        { kind: 'num', label: '(2) $PM=$', answer: '12' },
        { kind: 'num', label: '(3)', answer: '3', suffix: ' 倍' },
      ],
      explain: [
        '作 $PQ\\perp BC$ 于 $Q$。$P$ 在 $\\angle B$ 的外角平分线上，$PM=PQ$；在 $\\angle C$ 的外角平分线上，$PN=PQ$。所以 $PM=PQ=PN$（$P$ 到三条边所在直线距离相等，也在 $\\angle BAC$ 的平分线上）。',
        '(1) 三对直角三角形全等（斜边、直角边）：$\\mathrm{Rt}\\triangle PBM\\cong\\mathrm{Rt}\\triangle PBQ$，$BM=BQ$；$\\mathrm{Rt}\\triangle PCN\\cong\\mathrm{Rt}\\triangle PCQ$，$CN=CQ$；$\\mathrm{Rt}\\triangle PAM\\cong\\mathrm{Rt}\\triangle PAN$，$AM=AN$。',
        '$AM+AN=(AB+BM)+(AC+CN)=AB+AC+(BQ+QC)=13+15+14=42$，所以 $AM=21$，即 $AM$ 等于 $\\triangle ABC$ 周长的一半。',
        '(2) 用面积割补：$S_{\\triangle ABC}=S_{\\triangle PAB}+S_{\\triangle PAC}-S_{\\triangle PBC}=\\frac12\\times13\\cdot PM+\\frac12\\times15\\cdot PM-\\frac12\\times14\\cdot PM=7PM$。$7PM=84$，$PM=12$。',
        '(3) 内心 $I$ 到三边距离都为 $r$：$S_{\\triangle ABC}=\\frac12r(13+14+15)=21r=84$，$r=4$。$PM=3r$，是 $3$ 倍。',
        '思路：外角平分线的交点同样到三条直线距离相等，只是它在三角形外，面积要“两块相加再减一块”；切线段相等用斜边、直角边的全等。坑：照搬内心的做法写成 $S=\\frac12PM(13+14+15)$。',
      ],
      verify: () => {
        const S = SVG222, B = [0, 0], C = [14, 0], A = [5, 12];
        const P = S.meet(B, S.exb(B, C, A), C, S.exb(C, B, A)), M = S.foot(P, A, B), I = S.inc(A, B, C);
        const area = (12 * 14) / 2;
        return area === 84 ? [R222(S.dist(A, M)), R222(S.dist(P, M)), R222(S.dist(P, M) / S.dl(I, B, C))] : null;
      },
    },
    {
      id: '22.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$\\angle MON=120^\\circ$，$OC$ 平分 $\\angle MON$，点 $P$ 在 $OC$ 上，$OP=6$。点 $A$ 在直线 $OM$ 上，把射线 $PA$ 绕点 $P$ 按逆时针方向旋转 $60^\\circ$，与直线 $ON$ 交于点 $B$（即 $\\angle APB=60^\\circ$）。(1) 当点 $A$、$B$ 分别在射线 $OM$、$ON$ 上时，求 $OA+OB$；(2) 若 $OA=2$，求 $OB$ 的所有可能值；(3) 若 $OA=8$，求 $OB$ 的所有可能值。（都全部填出，用逗号隔开）',
      figure: FIG222.c02,
      blanks: [
        { kind: 'num', label: '(1) $OA+OB=$', answer: '6' },
        { kind: 'nums', label: '(2) $OB=$', answer: ['4', '8'] },
        { kind: 'nums', label: '(3) $OB=$', answer: ['2', '14'] },
      ],
      explain: [
        '作 $PD\\perp OM$ 于 $D$，$PE\\perp ON$ 于 $E$。$OP$ 平分 $\\angle MON$，$PD=PE$。$\\angle POD=60^\\circ$，$\\angle OPD=30^\\circ$，同理 $\\angle OPE=30^\\circ$，所以 $\\angle DPE=60^\\circ$；在 $\\mathrm{Rt}\\triangle ODP$ 中 $OD=\\frac12OP=3$，同理 $OE=3$。',
        '关键：$\\angle APB=\\angle DPE=60^\\circ$，而且都是逆时针转 $60^\\circ$，所以从 $PD$ 转到 $PA$ 的角等于从 $PE$ 转到 $PB$ 的角，$\\angle DPA=\\angle EPB$。又 $PD=PE$，$\\angle PDA=\\angle PEB=90^\\circ$，所以 $\\triangle PDA\\cong\\triangle PEB$（ASA），$DA=EB$，并且 $A$ 在 $D$ 的哪一侧（靠近 $O$ 还是远离 $O$），$B$ 就在 $E$ 的另一侧。',
        '(1) $A$ 在线段 $OD$ 上时，$B$ 在 $E$ 的远离 $O$ 一侧：$OA+OB=(OD-DA)+(OE+EB)=OD+OE=6$；$A$ 在 $D$ 外侧时同理 $OA+OB=(OD+DA)+(OE-EB)=6$。',
        '(2) 按 $A$ 的位置分类。① $A$ 在射线 $OM$ 上：$OA=2<3$，$A$ 在 $O$、$D$ 之间，由 (1) $OB=6-2=4$。② $A$ 在 $OM$ 的反向延长线上：$DA=OD+OA=5$，$EB=5$，$B$ 在 $E$ 的远离 $O$ 一侧，$OB=OE+EB=8$。',
        '所以 $OB=4$ 或 $8$。',
        '(3) ① $A$ 在射线 $OM$ 上：$OA=8>3$，$A$ 在 $D$ 的远离 $O$ 一侧，$DA=5$，$B$ 在 $E$ 的靠近 $O$ 一侧且 $EB=5>OE=3$，$B$ 越过 $O$ 落在 $ON$ 的反向延长线上，$OB=EB-OE=2$（这时 $OA-OB=OP$，(1) 的结论不再成立）。② $A$ 在 $OM$ 的反向延长线上：$DA=3+8=11$，$OB=OE+EB=14$。所以 $OB=2$ 或 $14$。',
        '思路：先用角平分线的性质和 $30^\\circ$ 角作出两个全等的直角三角形，把 $OA$、$OB$ 都转化成 $OD$、$OE$ 加减同一段；再按 $A$ 在 $O$ 的哪一侧分类，$B$ 也可能越过 $O$，关系依次变成 $OA+OB=OP$、$OB-OA=OP$、$OA-OB=OP$。坑：只用 (1) 的结论，漏掉 $8$；(3) 用 $OB=6-8$ 得负数就以为无解。',
      ],
      verify: () => {
        // O 为原点，OM 在 60° 方向，ON 在 −60° 方向，P=(6,0)；A 取直线 OM 上的点，B 是 A 绕 P 逆时针转 60°
        const S = SVG222, P = [6, 0], u = S.pt(1, 60), w = S.pt(1, -60), along = X => X[0] * w[0] + X[1] * w[1], off = X => Math.abs(X[0] * w[1] - X[1] * w[0]);
        let ok = true;
        for (const s of [0.5, 1, 2.5, 3, 4.5]) {
          const B = S.rot([s * u[0], s * u[1]], P, 60);
          if (off(B) > 1e-9 || along(B) < 0 || Math.abs(s + along(B) - 6) > 1e-9) ok = false;
        }
        const ob = v => [v, -v].map(s => { const B = S.rot([s * u[0], s * u[1]], P, 60); return off(B) < 1e-9 ? R222(Math.hypot(...B)) : null; });
        return [ok ? 6 : null, ob(2), ob(8)];
      },
    },
    {
      id: '22.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$I$ 是 $\\triangle ABC$ 的内心，$AI$ 的延长线交 $BC$ 于点 $D$。已知 $BD:DC=3:2$，$AI:ID=5:4$，$\\triangle ABC$ 的周长为 $18$。(1) 求 $AB$、$AC$、$BC$ 的长；(2) 求 $\\triangle ABI$ 与 $\\triangle ABC$ 的面积之比。',
      figure: FIG222.c03,
      blanks: [
        { kind: 'num', label: '(1) $AB=$', answer: '6' },
        { kind: 'num', label: '$AC=$', answer: '4' },
        { kind: 'num', label: '$BC=$', answer: '8' },
        { kind: 'ratio', label: '(2) $S_{\\triangle ABI}:S_{\\triangle ABC}=$', answer: '1:3' },
      ],
      explain: [
        '工具：若 $AD$ 平分 $\\triangle ABC$ 的 $\\angle BAC$，$D$ 在 $BC$ 上，则 $BD:DC=AB:AC$（$D$ 到 $AB$、$AC$ 距离相等，两三角形面积比是 $AB:AC$；又同高，面积比是 $BD:DC$）。',
        '第一个比：$AD$ 平分 $\\angle BAC$，$AB:AC=BD:DC=3:2$。设 $AB=3m$，$AC=2m$。',
        '第二个比：$I$ 是内心，$BI$ 平分 $\\triangle ABD$ 的 $\\angle ABD$，$I$ 在 $AD$ 上，所以 $AI:ID=AB:BD=5:4$，$BD=\\frac45AB=\\frac{12m}5$；再由 $BD:DC=3:2$，$BC=\\frac53BD=4m$。',
        '(1) 周长 $3m+2m+4m=18$，$m=2$：$AB=6$，$AC=4$，$BC=8$（$4+6>8$，能组成三角形）。',
        '(2) 换一种用法：内心 $I$ 到三边的距离都是 $r$。$S_{\\triangle ABI}=\\frac12\\times6r=3r$，$S_{\\triangle ABC}=S_{\\triangle ABI}+S_{\\triangle BCI}+S_{\\triangle CAI}=\\frac12r\\times18=9r$，所以面积比为 $1:3$。',
        '思路：两个比要在不同的三角形里各用一次“平分线分对边成比例”（大三角形里用 $AD$，$\\triangle ABD$ 里用 $BI$），联立定出三边；面积比则用内心到三边距离相等，与 $r$ 的大小无关。坑：把 $AI:ID$ 当成 $AB:AC$，或以为面积比要先求出 $r$。',
      ],
      verify: () => {
        // 设 AB=3m、AC=2m、BC=18−5m，扫描 m，作图找 AI:ID=5:4 的三角形
        const S = SVG222;
        let hit = null;
        for (let k = 1; k < 4000; k++) {
          const m = k / 1000, c = 3 * m, b = 2 * m, a = 18 - 5 * m;
          if (!(a > 0 && b + c > a && a + b > c && a + c > b)) continue;
          const B = [0, 0], C = [a, 0], A = S.tri(a, b, c), I = S.inc(A, B, C), D = S.meet(A, I, B, C);
          if (Math.abs(S.dist(B, D) / S.dist(D, C) - 1.5) < 1e-9 && Math.abs(S.dist(A, I) / S.dist(I, D) - 1.25) < 1e-9) {
            const area = (P, Q, R) => Math.abs((Q[0] - P[0]) * (R[1] - P[1]) - (R[0] - P[0]) * (Q[1] - P[1])) / 2;
            hit = [R222(c), R222(b), R222(a), [1, R222(area(A, B, C) / area(A, B, I))]];
          }
        }
        return hit;
      },
    },
    {
      id: '22.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$\\angle B=40^\\circ$。点 $D$ 在直线 $BC$ 上（不与 $B$、$C$ 重合），$D$ 到直线 $AB$、$AC$ 的距离相等，并且 $\\triangle ABD$ 是等腰三角形。求 $\\angle BAC$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [{ kind: 'nums', label: '$\\angle BAC=$', answer: ['80', '20'], suffix: '°' }],
      explain: [
        '记 $\\angle BAC=\\alpha$，$\\angle C=140^\\circ-\\alpha$。$D$ 在 $BC$ 上时在 $\\angle BAC$ 内部，由逆定理 $AD$ 平分 $\\angle BAC$；$D$ 在 $BC$ 的延长线上时在 $\\angle BAC$ 的邻补角内部，$AD$ 平分 $\\angle BAC$ 的外角。按 $D$ 的位置分三种，每种再按等腰分类。',
        '① $D$ 在线段 $BC$ 上：$\\angle BAD=\\frac\\alpha2$，$\\angle ADB=140^\\circ-\\frac\\alpha2$。$\\angle BAD=\\angle B$ 得 $\\alpha=80^\\circ$（$\\angle C=60^\\circ$，成立）；$\\angle ADB=\\angle B$ 得 $\\alpha=200^\\circ$，不可能；$\\angle BAD=\\angle ADB$ 得 $\\alpha=140^\\circ$，$\\angle C=0^\\circ$，不可能。',
        '② $D$ 在 $BC$ 的延长线上（$C$ 的外侧）：$\\angle CAD=\\frac12(180^\\circ-\\alpha)$，$\\angle BAD=90^\\circ+\\frac\\alpha2$ 是钝角，只能 $\\angle B=\\angle ADB$。$\\angle ADB=180^\\circ-40^\\circ-(90^\\circ+\\frac\\alpha2)=50^\\circ-\\frac\\alpha2=40^\\circ$，$\\alpha=20^\\circ$，这时 $\\angle C=120^\\circ$，$AB>AC$，外角平分线确实交在 $C$ 的外侧，成立。',
        '③ $D$ 在 $CB$ 的延长线上（$B$ 的外侧）：$\\angle ABD=140^\\circ$ 是钝角，只能 $\\angle BAD=\\angle ADB=20^\\circ$；而 $\\angle BAD=\\frac12(180^\\circ-\\alpha)$，得 $\\alpha=140^\\circ$，不可能。（$AB=AC$ 时外角平分线与 $BC$ 平行，没有交点。）',
        '所以 $\\angle BAC=80^\\circ$ 或 $20^\\circ$。思路：“到两条直线距离相等”既可能在内角平分线上，也可能在外角平分线上；先定位置，再按等腰分类并检验。坑：只考虑 $D$ 在边 $BC$ 上，漏掉 $20^\\circ$。',
      ],
      verify: () => {
        const S = SVG222, res = [];
        for (let k = 1; k < 280; k++) {
          const al = k / 2, B = [0, 0], C = [10, 0], A = S.apex(10, 40, 140 - al);
          if (140 - al <= 0) continue;
          for (const Q of [S.bis(A, B, C), S.exb(A, B, C)]) {
            const dy = Q[1] - A[1];
            if (Math.abs(dy) < 1e-12) continue;
            const D = S.meet(A, Q, B, C);
            if (S.dist(D, B) < 1e-6 || S.dist(D, C) < 1e-6) continue;
            const s = [S.dist(A, B), S.dist(A, D), S.dist(B, D)];
            if (Math.abs(s[0] - s[1]) < 1e-9 || Math.abs(s[1] - s[2]) < 1e-9 || Math.abs(s[0] - s[2]) < 1e-9) res.push(al);
          }
        }
        return res;
      },
    },
    {
      id: '22.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，在 $\\triangle ABC$ 中，$\\angle C=90^\\circ$，$AC=5$，$BC=12$，$AB=13$。点 $P$ 从 $C$ 出发，沿 $C\\to B\\to A$ 以每秒 $1$ 个单位的速度运动，到达 $A$ 时停止，运动时间为 $t$ 秒。当点 $P$ 不在顶点上，并且 $P$ 到 $\\triangle ABC$ 的某两条边所在直线的距离相等时，求 $t$ 的所有值（全部填出，用逗号隔开）。',
      figure: FIG222.c05,
      blanks: [{ kind: 'nums', label: '$t=$', answer: ['10/3', '360/17'] }],
      explain: [
        '$P$ 在哪条边上，它到这条边所在直线的距离就是 $0$，而到另外两条边的距离都大于 $0$（不在顶点）。所以能相等的只有“另外两条边”这一对。',
        '① $P$ 在边 $CB$ 上（$0<t<12$）：要 $P$ 到 $AC$、$AB$ 的距离相等。$P$ 在 $\\angle BAC$ 内部，由逆定理 $AP$ 平分 $\\angle BAC$。设 $CP=x$，$P$ 到 $AC$、$AB$ 的距离都是 $x$：$S_{\\triangle ABC}=\\frac12\\times5\\times12=30=\\frac12\\times5x+\\frac12\\times13x=9x$，$x=\\frac{10}3$，$t=\\frac{10}3$。',
        '② $P$ 在边 $BA$ 上（$12<t<25$）：要 $P$ 到 $BC$、$AC$ 的距离相等，由逆定理 $CP$ 平分 $\\angle ACB$。$P$ 到 $CB$、$CA$ 的距离相等，$S_{\\triangle BCP}:S_{\\triangle ACP}=BC:AC=12:5$；两三角形同高（$C$ 到 $AB$），面积比也等于 $BP:PA$。',
        '$BP=13\\times\\frac{12}{17}=\\frac{156}{17}$，$t=12+\\frac{156}{17}=\\frac{360}{17}$。',
        '所以 $t=\\frac{10}3$ 或 $\\frac{360}{17}$。思路：先用“在哪条边上，到这条边的距离为 $0$”排除，确定每一段该用哪个角的平分线；再分别用面积和、面积比求出位置。坑：在 $CB$ 段上去找 $\\angle C$ 或 $\\angle B$ 的平分线。',
      ],
      verify: () => {
        // 沿路线细分扫描，找某两条边所在直线距离相等的时刻（不含顶点）
        const S = SVG222, C = [0, 0], A = [0, 5], B = [12, 0];
        const P = t => (t <= 12 ? [t, 0] : S.at(B, A, (t - 12) / 13));
        const sides = [[A, B], [B, C], [C, A]], res = [];
        for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
          const g = t => S.dl(P(t), ...sides[i]) - S.dl(P(t), ...sides[j]);
          for (const [lo0, hi0] of [[0, 12], [12, 25]]) {
            const n = 2000;
            for (let k = 1; k < n - 1; k++) {
              let lo = lo0 + ((hi0 - lo0) * k) / n, hi = lo0 + ((hi0 - lo0) * (k + 1)) / n;
              if (Math.abs(g(lo)) < 1e-12 && Math.abs(g((lo + hi) / 2)) < 1e-12) continue;  // 整段为 0（不会出现）
              if (g(lo) * g(hi) < 0) {
                for (let it = 0; it < 200; it++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
                res.push(FR222(lo));
              }
            }
          }
        }
        return res;
      },
    },
  ],
});
