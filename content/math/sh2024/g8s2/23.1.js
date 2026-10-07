'use strict';

// 上海数学八年级下册 · 23.1 多边形
// 知识范围：多边形（同一平面上、不在同一直线上的三条或以上线段首尾顺次连接组成的封闭图形）及边、顶点、内角、对角线；凸多边形（本书所说多边形都指凸多边形）；
//   多边形的内角和定理（n 边形内角和为 (n−2)·180°，从一个顶点引对角线分成 n−2 个三角形）；外角（与相邻内角互补，同一顶点的两个外角是对顶角）；外角和定理（360°，与边数无关）
// 可以使用：六、七年级全部（方程、不等式、圆与扇形面积、平移旋转轴对称、平行线、三角形内角和与外角、全等、等腰与等边三角形、垂直平分线）；八上 19～22 章（实数、二次根式、一元二次方程、直角三角形与勾股定理）
// 还没学：梯形、平行四边形及其性质判定（23.2）、矩形菱形正方形的性质定理（23.3）、中位线与重心（23.4）；平面直角坐标系、函数、相似、三角比、圆的性质
// 本节约定：课本没有“正多边形”一词，题目写“各边都相等、各内角也都相等”；正方形、长方形、等边三角形是小学和七年级已有的说法

const SVG231 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle"${size ? ` font-size="${size}"` : ''}>${t}</text>`,
  poly: (pts, fill = 'none') => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dir: d => [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)],
  unit: (P, Q) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); return [(Q[0] - P[0]) / d, (Q[1] - P[1]) / d]; },
  mov: (P, u, k) => [P[0] + u[0] * k, P[1] + u[1] * k],
  mid: (P, Q) => [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2],
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
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
  // 点 P 关于直线 QR 的对称点
  refl: (P, Q, R) => {
    const u = [R[0] - Q[0], R[1] - Q[1]], t = ((P[0] - Q[0]) * u[0] + (P[1] - Q[1]) * u[1]) / (u[0] * u[0] + u[1] * u[1]);
    const F = [Q[0] + t * u[0], Q[1] + t * u[1]];
    return [2 * F[0] - P[0], 2 * F[1] - P[1]];
  },
  // 按外角画多边形（数学坐标，逆时针）：exts[i] 是顶点 i 处的外角，lens 给出前 n−2 条边长，最后两条边由闭合求出
  byExt: (exts, lens, start = 0) => {
    const S = SVG231, n = exts.length, th = [start];
    for (let i = 1; i < n; i++) th.push(th[i - 1] + exts[i]);
    const V = [[0, 0]];
    for (let i = 0; i < n - 2; i++) V.push(S.mov(V[i], S.dir(th[i]), lens[i]));
    const P = V[n - 2], u = S.dir(th[n - 2]), v = S.dir(th[n - 1]), det = u[0] * v[1] - u[1] * v[0];
    const a = (-P[0] * v[1] + P[1] * v[0]) / det;
    V.push(S.mov(P, u, a));
    return V;
  },
  // 把数学坐标的点（y 向上）缩放到 w×h 的画面里（y 向下），返回映射后的点组
  fit: (groups, w, h, pad = 28) => {
    const all = groups.flat(), xs = all.map(p => p[0]), ys = all.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const k = Math.min((w - 2 * pad) / (x1 - x0 || 1), (h - 2 * pad) / (y1 - y0 || 1));
    const ox = (w - (x1 - x0) * k) / 2, oy = (h - (y1 - y0) * k) / 2;
    return groups.map(g => g.map(p => [ox + (p[0] - x0) * k, h - oy - (p[1] - y0) * k]));
  },
  // 顶点 V 处朝多边形内部的标注位置（两邻点方向的角平分线）
  inside: (V, U, W, r) => {
    const S = SVG231, a = S.unit(V, U), b = S.unit(V, W), m = [a[0] + b[0], a[1] + b[1]], d = Math.hypot(...m);
    return [V[0] + (m[0] / d) * r, V[1] + (m[1] / d) * r];
  },
  // 外角：延长 UV 过 V，标注在延长线与 VW 的夹角里
  ext: (U, V, W, len, r, label) => {
    const S = SVG231, e = S.mov(V, S.unit(U, V), len), lab = S.inside(V, e, W, r);
    return S.seg(V, e, true) + S.text(label, lab, 0, 0, 13);
  },
  // 扇形（圆心 O、半径 r，从 P 方向到 Q 方向，取小于 180° 的那一边）
  sector: (O, P, Q, r, fill) => {
    const S = SVG231, a = S.mov(O, S.unit(O, P), r), b = S.mov(O, S.unit(O, Q), r);
    const cross = (a[0] - O[0]) * (b[1] - O[1]) - (a[1] - O[1]) * (b[0] - O[0]);
    return `<path d="M${O[0].toFixed(1)},${O[1].toFixed(1)} L${a[0].toFixed(1)},${a[1].toFixed(1)} A${r},${r} 0 0 ${cross > 0 ? 1 : 0} ${b[0].toFixed(1)},${b[1].toFixed(1)} Z" fill="${fill}" stroke="none"/>`;
  },
  circle: (O, r) => `<circle cx="${O[0].toFixed(1)}" cy="${O[1].toFixed(1)}" r="${r}" fill="none" stroke="#2b2b2b" stroke-width="1"/>`,
  // 凸多边形判断（顶点依次给出）
  convex: pts => {
    const n = pts.length, s = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], c = pts[(i + 2) % n];
      s.push(Math.sign((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])));
    }
    return s.every(x => x === s[0]);
  },
};

// 各题配图的几何数据（数学坐标），verify 也用它们
const GEO231 = (() => {
  const S = SVG231, g = {};
  g.b01 = [  // ① 凹四边形 ② 凸五边形 ③ 有一边是曲线（不是多边形，用 null 表示） ④ 凸六边形
    [[10, 85], [40, 15], [70, 85], [40, 58]],
    [[12, 70], [22, 22], [55, 12], [72, 48], [50, 85]],
    null,
    [[18, 30], [45, 14], [70, 30], [70, 68], [45, 86], [18, 68]],
  ];
  g.b02 = S.byExt([80, 55, 75, 40, 110], [5, 4, 4]);          // A100 B125 C105 D140 E70
  g.b07 = S.byExt([36, 54, 72, 90, 108], [5, 4, 4]);          // 外角之比 2:3:4:5:6
  g.b08 = S.byExt([110, 100, 80, 70], [5, 4]);                // A70 B80 C100 D110
  g.e03 = S.byExt([130, 110, 100, 20], [6, 4]);               // B50 C70 D80 A160（顶点顺序 B、C、D、A）
  {  // e05：四边形 ABCD，∠A=120°，∠B=110°；沿 EF 折叠，A、B 落在 A′、B′
    const A = [0, 0], B = [6, 0], E = S.mov(A, S.dir(120), 3), F = S.meet(E, S.mov(E, S.dir(15), 1), B, S.mov(B, S.dir(70), 1));
    const D = S.mov(A, S.dir(120), 10), C = S.mov(B, S.dir(70), 11);
    g.e05 = { A, B, C, D, E, F, A2: S.refl(A, E, F), B2: S.refl(B, E, F) };
  }
  {  // c05：五边形 ABCDE 五边相等、五角相等；以 AB 为边的等边三角形顶点 F 在形内或形外
    const P = [0, 1, 2, 3, 4].map(k => S.dir(234 + 72 * k));
    const [A, B] = P, M = S.mid(A, B), h = (S.dist(A, B) * Math.sqrt(3)) / 2, up = S.unit(M, P[3]);
    g.c05 = { P, Fin: S.mov(M, up, h), Fout: S.mov(M, up, -h) };
  }
  return g;
})();

const FIG231 = (() => {
  const S = SVG231, G = GEO231, out = {};
  // b01：四个图形
  {
    const cell = (i, inner) => `<g transform="translate(${i * 80},0)">${inner}</g>`;
    const [p1, p2, , p4] = G.b01;
    out.b01 = S.wrap(320, 120,
      cell(0, S.poly(p1) + S.text('①', [40, 100]))
      + cell(1, S.poly(p2) + S.text('②', [40, 100]))
      + cell(2, '<path d="M12,80 L68,80 L68,40 Q40,0 12,40 Z" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>' + S.text('③', [40, 100]))
      + cell(3, S.poly(p4) + S.text('④', [40, 100])));
  }
  // b02：五边形 ABCDE，C 处画出外角 75°
  {
    const [[A, B, C, D, E]] = S.fit([G.b02], 300, 230, 34), name = ['A', 'B', 'C', 'D', 'E'], V = [A, B, C, D, E];
    const lab = ['100°', '125°', '', '2x°', 'x°'];
    let s = S.poly(V);
    V.forEach((P, i) => {
      const U = V[(i + 4) % 5], W = V[(i + 1) % 5], o = S.inside(P, U, W, -16);
      s += S.text(name[i], o);
      if (lab[i]) s += S.text(lab[i], S.inside(P, U, W, 26), 0, 0, 13);
    });
    s += S.ext(B, C, D, 42, 22, '75°');
    out.b02 = S.wrap(300, 230, s);
  }
  // b04：机器人路线的前几段（每段 3 米，每次左转 a°；示意图按 35° 画，不是答案）
  {
    const pts = [[0, 0]];
    for (let i = 0; i < 4; i++) pts.push(S.mov(pts[i], S.dir(35 * i), 3));
    const [[P0, P1, P2, P3, P4]] = S.fit([pts], 300, 170, 26);
    out.b04 = S.wrap(300, 170, S.seg(P0, P1) + S.seg(P1, P2) + S.seg(P2, P3) + S.seg(P3, P4, true)
      + S.ext(P0, P1, P2, 70, 46, 'a°') + S.text('A', P0, -4, 14) + S.text('3 米', S.mid(P0, P1), 0, 14, 13) + S.text('3 米', S.mid(P1, P2), -12, -14, 13));
  }
  // b05：八边形 ABCDEFGH，从 A 出发的对角线
  {
    const raw = [0, 1, 2, 3, 4, 5, 6, 7].map(k => S.dir(247.5 + 45 * k)).map((p, k) => [p[0] * (k % 2 ? 1.05 : 1), p[1]]);
    const [V] = S.fit([raw], 260, 230, 30), name = 'ABCDEFGH';
    let s = S.poly(V);
    for (let k = 2; k <= 6; k++) s += S.seg(V[0], V[k], true);
    const O = [130, 115];
    V.forEach((P, k) => { const u = S.unit(O, P); s += S.text(name[k], S.mov(P, u, 14)); });
    out.b05 = S.wrap(260, 230, s);
  }
  // b07：五边形每个顶点处的一个外角 ∠1～∠5
  {
    const [V] = S.fit([G.b07], 300, 240, 50);
    let s = S.poly(V);
    V.forEach((P, i) => { s += S.ext(V[(i + 4) % 5], P, V[(i + 1) % 5], 36, 18, String(i + 1)); });
    out.b07 = S.wrap(300, 240, s);
  }
  // b08：四边形 ABCD，∠1、∠2 是 A、B 处的外角
  {
    const [[A, B, C, D]] = S.fit([G.b08], 300, 200, 40), V = [A, B, C, D], name = 'ABCD';
    let s = S.poly(V) + S.ext(D, A, B, 40, 20, '1') + S.ext(A, B, C, 40, 20, '2');
    V.forEach((P, i) => { s += S.text(name[i], S.inside(P, V[(i + 3) % 4], V[(i + 1) % 4], -15)); });
    out.b08 = S.wrap(300, 200, s);
  }
  // e03：四边形 ABCD 中 ∠B、∠C 的平分线交于 P，∠B、∠C 的外角平分线交于 Q
  {
    const [Bm, Cm, Dm, Am] = G.e03;
    const bis = (V, U, W) => { const a = S.unit(V, U), b = S.unit(V, W); return [a[0] + b[0], a[1] + b[1]]; };
    const ub = bis(Bm, Am, Cm), uc = bis(Cm, Bm, Dm);
    const P = S.meet(Bm, S.mov(Bm, ub, 1), Cm, S.mov(Cm, uc, 1));
    const Q = S.meet(Bm, S.mov(Bm, [-ub[1], ub[0]], 1), Cm, S.mov(Cm, [-uc[1], uc[0]], 1));
    const [[B, C, D, A, Pp, Qp]] = S.fit([[Bm, Cm, Dm, Am, P, Q]], 300, 260, 30);
    const s = S.poly([A, B, C, D]) + S.seg(B, Pp) + S.seg(C, Pp) + S.seg(B, Qp) + S.seg(C, Qp)
      + S.seg(B, S.mov(B, S.unit(A, B), 40), true) + S.seg(C, S.mov(C, S.unit(D, C), 40), true)
      + S.text('A', A, -6, -12) + S.text('B', B, -12, 0) + S.text('C', C, 12, 0) + S.text('D', D, 6, -12) + S.text('P', Pp, 0, -14) + S.text('Q', Qp, 0, 14);
    out.e03 = S.wrap(300, 260, s);
  }
  // e05：四边形纸片 ABCD 沿 EF 折叠
  {
    const g = G.e05, [[A, B, C, D, E, F, A2, B2]] = S.fit([[g.A, g.B, g.C, g.D, g.E, g.F, g.A2, g.B2]], 300, 300, 28);
    const s = `<polygon points="${[E, A2, B2, F].map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#e8eef8" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.seg(E, F) + S.seg(F, C) + S.seg(C, D) + S.seg(D, E) + S.seg(E, A, true) + S.seg(A, B, true) + S.seg(B, F, true)
      + S.text('A', A, -8, 10) + S.text('B', B, 8, 10) + S.text('C', C, 10, -6) + S.text('D', D, -10, -6)
      + S.text('E', E, -12, 0) + S.text('F', F, 12, 0) + S.text('A′', A2, -2, -12) + S.text('B′', B2, 0, -12)
      + S.text('1', S.inside(E, D, A2, 20), 0, 0, 13) + S.text('2', S.inside(F, C, B2, 20), 0, 0, 13);
    out.e05 = S.wrap(300, 300, s);
  }
  // e06：示意图（以五边形为例），以各顶点为圆心画等半径的圆，涂色的是圆在多边形内部的部分
  {
    const raw = [[0, 0], [6, 0], [8, 4.2], [3.6, 7.2], [-1.4, 4.6]];
    const [V] = S.fit([raw], 300, 230, 40), r = 22;
    let s = '';
    V.forEach((P, i) => { s += S.sector(P, V[(i + 4) % 5], V[(i + 1) % 5], r, '#cfd8e8') + S.circle(P, r); });
    s += S.poly(V);
    out.e06 = S.wrap(300, 230, s);
  }
  // c02：示意图，一条直线把凸多边形剪成两块（这里画的是不经过顶点的剪法）
  {
    const raw = [[0, 0], [5, -0.6], [8, 2.4], [7, 6], [2.5, 7], [-1, 3.5]];
    const [V] = S.fit([raw], 300, 220, 30);
    const a = S.mid(V[0], V[1]), b = S.mid(V[3], V[4]);
    const s = S.poly(V) + S.seg(S.mov(a, S.unit(b, a), 18), S.mov(b, S.unit(a, b), 18), true) + S.text('剪', S.mov(b, S.unit(a, b), 28), 0, 0, 13);
    out.c02 = S.wrap(300, 220, s);
  }
  // c03：n=6 的情形，延长各边得到 6 个尖角
  {
    const H = [0, 1, 2, 3, 4, 5].map(k => S.dir(60 * k));
    const tips = H.map((_, i) => S.meet(H[(i + 5) % 6], H[i], H[(i + 2) % 6], H[(i + 1) % 6]));
    const [[...all]] = S.fit([[...H, ...tips]], 280, 260, 26), V = all.slice(0, 6), T = all.slice(6);
    let s = `<polygon points="${V.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#e8eef8" stroke="#2b2b2b" stroke-width="1.6"/>`;
    T.forEach((t, i) => { s += S.seg(V[i], t) + S.seg(V[(i + 1) % 6], t); });
    out.c03 = S.wrap(280, 260, s);
  }
  // c05：五边形 ABCDE（只画五边形，不画点 F）
  {
    const [V] = S.fit([GEO231.c05.P], 240, 220, 30), name = 'ABCDE', O = [120, 110];
    let s = S.poly(V);
    V.forEach((P, k) => { s += S.text(name[k], S.mov(P, S.unit(O, P), 14)); });
    out.c05 = S.wrap(240, 220, s);
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g8s2/23.1',
  title: '多边形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-07', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。卡片“外角和是 360°”和 b04 解析配 exteriorWalk 演示。第 1 轮 b04 没限定凸多边形（a=48、96、168 的星形也走 15 段），c03（n 角星角度和 + 平均值求最小 n）只有 4～5 级，b03、b06 是流传数据，c01 解析缺 1+2+…+(n−1) 的由来；第 2 轮 b04 加“路线围成凸多边形”、配图改用非答案角度，c03 改为“边外侧有无尖角”的四边形至少 / 至多与 n≥5 至多（反证 + 构造），b03 改为内外角和之比 9:2，b06 改为 2340°，c01 补首尾配对说明，整节通过' },

  intro: [
    {
      title: '多边形和凸多边形',
      body: '在同一平面上，由不在同一直线上的三条或三条以上的线段首尾顺次连接组成的封闭图形叫作多边形，由 $n$ 条线段组成的叫 $n$ 边形。连接不相邻两个顶点的线段叫对角线。画出任意一边所在的直线，其余各边都在它的同一侧，这样的多边形叫凸多边形；**以后说的多边形都指凸多边形**。',
      example: '六边形从一个顶点出发，除了它自己和两个相邻顶点，还能连 $3$ 条对角线，把六边形分成 $4$ 个三角形。',
      pitfall: '有一条边是曲线、或者没有封闭的图形都不是多边形；“凹进去”的多边形是多边形，但不是凸多边形。',
    },
    {
      title: '内角和定理',
      body: '为什么要找规律？多边形的角越多越难一个个量，可以把它拆成三角形：从一个顶点出发画出所有对角线，$n$ 边形被分成 $(n-2)$ 个三角形，所以 **$n$ 边形的内角和等于 $(n-2)\\cdot180^\\circ$**。边数每多 $1$，内角和就多 $180^\\circ$。',
      example: '二十边形的内角和是 $(20-2)\\times180^\\circ=3240^\\circ$。',
    },
    {
      title: '外角和是 360°',
      body: '多边形内角的一边与另一边的延长线组成的角叫外角，它和相邻的内角互补。每个顶点各取一个外角，加起来叫外角和。**不管几边形，外角和都等于 $360^\\circ$**：$n$ 个“内角 + 外角”共 $n\\cdot180^\\circ$，减去内角和 $(n-2)\\cdot180^\\circ$ 正好剩 $360^\\circ$。沿着多边形的边走一圈，每到一个顶点转过一个外角，回到起点时正好转了一整圈。',
      example: '一个多边形的每个外角都是 $30^\\circ$，它有 $360\\div30=12$ 条边。',
      pitfall: '外角和只取每个顶点的一个外角；同一顶点的两个外角是对顶角，相等。',
      demo: { type: 'exteriorWalk', sides: 5 },
    },
    {
      title: '内角问题转成外角',
      body: '各内角都相等的多边形，直接用内角和列方程要解分式；先求出每个外角，再用 $360^\\circ$ 去除，往往一步就得到边数。内角越接近 $180^\\circ$，外角越小，边数越多。',
      example: '各内角都是 $170^\\circ$ 的多边形，每个外角是 $10^\\circ$，边数是 $360\\div10=36$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '23.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下面四个图形中，图③有一条边是曲线。四个图形中凸多边形有（　　）',
      figure: FIG231.b01,
      options: ['$1$ 个', '$2$ 个', '$3$ 个', '$4$ 个'],
      answer: 1,
      explain: [
        '③ 有一条边是曲线，不是由线段组成的，不是多边形。',
        '① 是多边形，但画出它凹进去的那条边所在的直线，其余的边分在直线两侧，所以不是凸多边形。',
        '②、④ 任意一边所在的直线都让其余各边在同一侧，是凸多边形，共 $2$ 个，选 B。坑：把 ① 也算进去，凹多边形不是凸多边形。',
      ],
      verify: () => GEO231.b01.filter(p => p && SVG231.convex(p)).length - 1,
    },
    {
      id: '23.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '如图，在五边形 $ABCDE$ 中，$\\angle A=100^\\circ$，$\\angle B=125^\\circ$，在顶点 $C$ 处延长 $BC$，所成的外角是 $75^\\circ$，$\\angle D=2x^\\circ$，$\\angle E=x^\\circ$。求 $x$ 的值。',
      figure: FIG231.b02,
      blanks: [{ kind: 'num', label: '$x=$', answer: '70' }],
      explain: [
        '五边形的内角和是 $(5-2)\\times180^\\circ=540^\\circ$。',
        '$75^\\circ$ 是外角，对应的内角 $\\angle BCD=180^\\circ-75^\\circ=105^\\circ$。',
        '$100+125+105+2x+x=540$，$3x=210$，$x=70$。坑：把 $75^\\circ$ 直接当成内角，会得到 $x=80$。',
      ],
      verify: () => {
        const V = GEO231.b02, S = SVG231, inner = i => S.ang(V[i], V[(i + 4) % 5], V[(i + 1) % 5]);
        return Math.round(inner(4) * 1e6) / 1e6;  // 按题目数据画出的图里量 ∠E
      },
    },
    {
      id: '23.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '一个多边形的内角和与外角和的比是 $9:2$，这个多边形是几边形？',
      blanks: [{ kind: 'num', label: '边数', answer: '11' }],
      explain: [
        '外角和是 $360^\\circ$，与边数无关，所以内角和是 $360^\\circ\\times\\frac92=1620^\\circ$。',
        '$(n-2)\\cdot180^\\circ=1620^\\circ$，$n-2=9$，$n=11$。',
        '坑：把外角和当成“$n$ 个外角、随边数变化”去列式；或者解出 $n-2=9$ 就把 $9$ 当成边数。',
      ],
      verify: () => { for (let n = 3; n < 100; n++) if (F((n - 2) * 180).div(F(360)).eq(F('9/2'))) return n; return null; },
    },
    {
      id: '23.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，机器人从点 $A$ 出发，沿直线走 $3$ 米后向左转 $a^\\circ$，再沿直线走 $3$ 米后向左转 $a^\\circ$……照这样走下去，它第一次回到点 $A$ 时一共走了 $45$ 米，走过的路线围成一个凸多边形（图只是示意，角的大小不准）。求 $a$ 的值。',
      figure: FIG231.b04,
      blanks: [{ kind: 'num', label: '$a=$', answer: '24' }],
      explain: [
        '一共走了 $45\\div3=15$ 段，走出的路线是一个十五边形。',
        '机器人每次转过的角是十五边形的一个外角（前进方向的延长线与下一段的夹角），回到出发点时转过的总角度就是外角和 $360^\\circ$。',
        '$a=360\\div15=24$。坑：把转过的角当成内角，算成 $156$。（如果不要求凸多边形，$a=48$、$96$、$168$ 时路线会绕成自己交叉的星形，也是走 $15$ 段回到 $A$，所以题目要说明路线是凸多边形。）',
      ],
      demo: { type: 'exteriorWalk', sides: 6 },
      verify: () => {
        // 模拟：每段 3 米、每次左转 a°，找第一次回到出发点用 15 段的 a
        for (let a = 1; a < 180; a++) {
          let x = 0, y = 0, th = 0, back = 0;
          for (let k = 1; k <= 400; k++) {
            x += 3 * Math.cos((th * Math.PI) / 180); y += 3 * Math.sin((th * Math.PI) / 180); th += a;
            if (Math.hypot(x, y) < 1e-6) { back = k; break; }
          }
          if (back * 3 === 45 && back * a === 360) return a;
        }
        return null;
      },
    },
    {
      id: '23.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，从八边形 $ABCDEFGH$ 的顶点 $A$ 出发画出了所有的对角线。这个八边形一共有多少条对角线？',
      figure: FIG231.b05,
      blanks: [{ kind: 'num', label: '对角线条数', answer: '20' }],
      explain: [
        '从每个顶点出发，除去它自己和两个相邻顶点，可以画 $8-3=5$ 条对角线。',
        '$8$ 个顶点共 $8\\times5=40$ 条，但每条对角线连着两个顶点，被数了两次，所以一共 $40\\div2=20$ 条。',
        '坑：只数了从 $A$ 出发的 $5$ 条，或者忘了除以 $2$ 得到 $40$。',
      ],
      verify: () => {
        let c = 0;
        for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) if (j - i !== 1 && j - i !== 7) c++;
        return c;
      },
    },
    {
      id: '23.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '把一个多边形纸片剪去一个角（沿一条直线剪一刀），剩下的多边形内角和是 $2340^\\circ$。原来的多边形可能是几边形？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '边数', answer: ['14', '15', '16'] }],
      explain: [
        '剩下的多边形：$(m-2)\\cdot180^\\circ=2340^\\circ$，$m=15$。',
        '剪去一个角有三种剪法：剪痕经过两个顶点，边数少 $1$；经过一个顶点，边数不变；不经过顶点，边数多 $1$。',
        '所以原多边形可能是 $16$、$15$、$14$ 边形。坑：只想到“剪掉一个角就多一条边”这一种。',
      ],
      verify: () => {
        const res = [];
        for (let n = 3; n < 40; n++) if ([n - 1, n, n + 1].some(m => m >= 3 && (m - 2) * 180 === 2340)) res.push(n);
        return res;
      },
    },
    {
      id: '23.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\angle1$～$\\angle5$ 是五边形在五个顶点处的外角，$\\angle1:\\angle2:\\angle3:\\angle4:\\angle5=2:3:4:5:6$。这个五边形最小的内角是多少度？',
      figure: FIG231.b07,
      blanks: [{ kind: 'angle', label: '最小的内角', answer: '72°' }],
      explain: [
        '外角和是 $360^\\circ$，每份 $360^\\circ\\div(2+3+4+5+6)=18^\\circ$，五个外角依次是 $36^\\circ$、$54^\\circ$、$72^\\circ$、$90^\\circ$、$108^\\circ$。',
        '内角与外角互补，外角最大时内角最小：最小的内角是 $180^\\circ-108^\\circ=72^\\circ$。',
        '坑：把比当成内角的比，用 $540^\\circ$ 分成 $20$ 份；或者取了最小的外角 $36^\\circ$ 去算。',
      ],
      verify: () => {
        const V = GEO231.b07, S = SVG231;
        return Math.round(Math.min(...V.map((P, i) => S.ang(P, V[(i + 4) % 5], V[(i + 1) % 5]))) * 1e6) / 1e6 + '°';
      },
    },
    {
      id: '23.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\angle1$、$\\angle2$ 分别是四边形 $ABCD$ 在顶点 $A$、$B$ 处的外角，$\\angle C+\\angle D=210^\\circ$。求 $\\angle1+\\angle2$ 的度数。',
      figure: FIG231.b08,
      blanks: [{ kind: 'angle', label: '$\\angle1+\\angle2=$', answer: '210°' }],
      explain: [
        '四边形内角和 $360^\\circ$，$\\angle DAB+\\angle ABC=360^\\circ-210^\\circ=150^\\circ$。',
        '$\\angle1+\\angle2=(180^\\circ-\\angle DAB)+(180^\\circ-\\angle ABC)=360^\\circ-150^\\circ=210^\\circ$。',
        '也就是说 $\\angle1+\\angle2=\\angle C+\\angle D$。坑：求出 $\\angle A+\\angle B=150^\\circ$ 就停下。',
      ],
      verify: () => {
        const [A, B, C, D] = GEO231.b08, S = SVG231;
        return Math.round((180 - S.ang(A, D, B) + 180 - S.ang(B, A, C)) * 1e6) / 1e6 + '°';
      },
    },
    {
      id: '23.1-b09',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 多边形的边数增加 $1$，内角和增加 $180^\\circ$；② 多边形的边数越多，外角和越大；③ 凸多边形的内角中最多有 $3$ 个锐角；④ 存在内角和是 $1000^\\circ$ 的多边形；⑤ 各内角都相等的多边形，各外角也都相等。其中正确的有（　　）',
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 1,
      explain: [
        '①对：$(n-1)\\cdot180^\\circ-(n-2)\\cdot180^\\circ=180^\\circ$。②错：外角和总是 $360^\\circ$。',
        '③对：锐角内角对应的外角大于 $90^\\circ$，有 $4$ 个就超过 $360^\\circ$。④错：内角和一定是 $180^\\circ$ 的整数倍，$1000$ 不是 $180$ 的倍数。',
        '⑤对：每个外角都等于 $180^\\circ$ 减去相等的内角。正确的是 ①③⑤，共 $3$ 个，选 B。坑：认为②对（外角和随边数变大），或者没检验④。',
      ],
      verify: () => {
        const s1 = [...Array(30).keys()].slice(4).every(n => (n - 2) * 180 - (n - 3) * 180 === 180);
        const s2 = false;  // 外角和恒为 360°
        let maxAcute = 0;  // 锐角个数 k：k 个外角都大于 90°，总和不超过 360°
        for (let k = 1; k <= 10; k++) if (k * 90 < 360) maxAcute = k;
        const s3 = maxAcute === 3, s4 = 1000 % 180 === 0, s5 = true;
        return [s1, s2, s3, s4, s5].filter(Boolean).length - 2;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '23.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '一个多边形除去两个内角以外，其余各内角的和是 $2570^\\circ$。这个多边形可能是几边形？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '边数', answer: ['17', '18'] }],
      explain: [
        '除去的两个内角都大于 $0^\\circ$、小于 $180^\\circ$，它们的和在 $0^\\circ$ 到 $360^\\circ$ 之间，所以内角和在 $2570^\\circ$ 到 $2930^\\circ$ 之间（都不含）。',
        '内角和是 $180^\\circ$ 的整数倍：这个范围里有 $15\\times180^\\circ=2700^\\circ$ 和 $16\\times180^\\circ=2880^\\circ$ 两个。',
        '内角和 $2700^\\circ$：$n=17$，除去的两角和为 $130^\\circ$（比如 $60^\\circ$ 和 $70^\\circ$）；内角和 $2880^\\circ$：$n=18$，两角和为 $310^\\circ$（比如两个 $155^\\circ$），都可以。',
        '答案：$17$ 或 $18$。坑：照“除去一个内角”的做法，只找比 $2570^\\circ$ 大的第一个 $180^\\circ$ 的倍数。',
      ],
      verify: () => {
        const res = [];
        for (let n = 3; n < 60; n++) { const r = (n - 2) * 180 - 2570; if (r > 0 && r < 360 && n - 2 >= 1) res.push(n); }
        return res;
      },
    },
    {
      id: '23.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '一个多边形有一个内角是 $100^\\circ$，其余各内角都大于 $150^\\circ$ 且小于 $160^\\circ$。这个多边形可能是几边形？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '边数', answer: ['11', '12', '13', '14'] }],
      explain: [
        '内角范围不好直接用，转成外角：$100^\\circ$ 的内角对应外角 $80^\\circ$，其余 $(n-1)$ 个外角都大于 $20^\\circ$、小于 $30^\\circ$。',
        '外角和 $360^\\circ$，其余外角的和是 $360^\\circ-80^\\circ=280^\\circ$。',
        '于是 $20(n-1)<280<30(n-1)$，得 $9\\frac13<n-1<14$，$n-1=10,11,12,13$，$n=11,12,13,14$。',
        '每种都能取到：比如 $n=11$ 时其余外角都取 $28^\\circ$，$n=14$ 时都取 $\\frac{280}{13}^\\circ$，都在范围内。坑：用内角和列不等式时忘了 $100^\\circ$ 那个角，或者端点取舍出错。',
      ],
      verify: () => {
        const res = [];
        for (let n = 3; n < 60; n++) if (20 * (n - 1) < 280 && 280 < 30 * (n - 1)) res.push(n);
        return res;
      },
    },
    {
      id: '23.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，在四边形 $ABCD$ 中，$\\angle ABC$、$\\angle BCD$ 的平分线交于点 $P$，$\\angle ABC$、$\\angle BCD$ 的外角平分线交于点 $Q$。已知 $\\angle BPC=2\\angle BQC$，$\\angle A=2\\angle D$，求 $\\angle D$ 的度数。',
      figure: FIG231.e03,
      blanks: [{ kind: 'angle', label: '$\\angle D=$', answer: '80°' }],
      explain: [
        '在 $\\triangle BPC$ 中，$\\angle BPC=180^\\circ-\\frac12(\\angle ABC+\\angle BCD)$；四边形中 $\\angle ABC+\\angle BCD=360^\\circ-(\\angle A+\\angle D)$，所以 $\\angle BPC=\\frac12(\\angle A+\\angle D)$。',
        '外角平分线：$\\angle QBC=\\frac12(180^\\circ-\\angle ABC)$，$\\angle QCB=\\frac12(180^\\circ-\\angle BCD)$，$\\angle BQC=\\frac12(\\angle ABC+\\angle BCD)=180^\\circ-\\frac12(\\angle A+\\angle D)$。',
        '于是 $\\angle BPC+\\angle BQC=180^\\circ$。又 $\\angle BPC=2\\angle BQC$，得 $\\angle BQC=60^\\circ$，$\\angle BPC=120^\\circ$，$\\angle A+\\angle D=240^\\circ$。',
        '$\\angle A=2\\angle D$：$3\\angle D=240^\\circ$，$\\angle D=80^\\circ$（$\\angle A=160^\\circ$，小于 $180^\\circ$，可以）。坑：把三角形里的结论 $\\angle BPC=90^\\circ+\\frac12\\angle A$ 搬过来用。',
      ],
      verify: () => {
        // 按题中关系在图里量：∠BPC、∠BQC，再核对 ∠A=2∠D
        const S = SVG231, [B, C, D, A] = GEO231.e03;
        const bis = (V, U, W) => { const a = S.unit(V, U), b = S.unit(V, W); return [a[0] + b[0], a[1] + b[1]]; };
        const ub = bis(B, A, C), uc = bis(C, B, D);
        const P = S.meet(B, S.mov(B, ub, 1), C, S.mov(C, uc, 1)), Q = S.meet(B, S.mov(B, [-ub[1], ub[0]], 1), C, S.mov(C, [-uc[1], uc[0]], 1));
        const ok = Math.abs(S.ang(P, B, C) - 2 * S.ang(Q, B, C)) < 1e-6 && Math.abs(S.ang(A, B, D) - 2 * S.ang(D, C, A)) < 1e-6;
        return ok ? Math.round(S.ang(D, C, A) * 1e6) / 1e6 + '°' : null;
      },
    },
    {
      id: '23.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '各内角都相等、并且每个内角的度数都是 $4$ 的倍数的多边形，按边数算一共有多少种？',
      blanks: [{ kind: 'num', label: '种数', answer: '10' }],
      explain: [
        '各内角相等时各外角也相等，每个外角是 $\\frac{360^\\circ}{n}$，内角是 $180^\\circ-\\frac{360^\\circ}{n}$。',
        '$180$ 是 $4$ 的倍数，所以内角是 $4$ 的倍数，等价于外角 $\\frac{360}{n}$ 是 $4$ 的倍数（当然先得是整数），即 $\\frac{360}{n}=4k$，$n=\\frac{90}{k}$，$n$ 是 $90$ 的约数。',
        '$90$ 的约数有 $1,2,3,5,6,9,10,15,18,30,45,90$，去掉 $1$、$2$（$n\\ge3$），剩 $10$ 个。',
        '坑：直接找 $360$ 的约数（那是“内角为整数”），或者漏掉 $n=3$ 时内角 $60^\\circ$ 也是 $4$ 的倍数。',
      ],
      verify: () => {
        let c = 0;
        for (let n = 3; n <= 360; n++) { const inner = F(180).sub(F(360).div(F(n))); if (inner.d === 1n && inner.n % 4n === 0n) c++; }
        return c;
      },
    },
    {
      id: '23.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，把四边形纸片 $ABCD$ 沿 $EF$ 折叠（$E$ 在 $AD$ 上，$F$ 在 $BC$ 上），点 $A$、$B$ 分别落在四边形内部的 $A^{\\prime}$、$B^{\\prime}$ 处。已知 $\\angle C+\\angle D=130^\\circ$，$\\angle1=\\angle A^{\\prime}ED=30^\\circ$，求 $\\angle2=\\angle B^{\\prime}FC$ 的度数。',
      figure: FIG231.e05,
      blanks: [{ kind: 'angle', label: '$\\angle2=$', answer: '70°' }],
      explain: [
        '四边形 $ABCD$：$\\angle A+\\angle B=360^\\circ-130^\\circ=230^\\circ$。',
        '四边形 $ABFE$：$\\angle AEF+\\angle BFE=360^\\circ-230^\\circ=130^\\circ$。',
        '折叠前后角相等：$\\angle AEF=\\angle A^{\\prime}EF$，所以 $2\\angle AEF+\\angle1=180^\\circ$，$\\angle AEF=75^\\circ$；同理 $2\\angle BFE+\\angle2=180^\\circ$。',
        '$\\angle BFE=130^\\circ-75^\\circ=55^\\circ$，$\\angle2=180^\\circ-110^\\circ=70^\\circ$。一般地 $\\angle1+\\angle2=2(\\angle A+\\angle B)-360^\\circ$。坑：把三角形折叠的结论“$\\angle1+\\angle2=2\\angle A$”照搬过来。',
      ],
      verify: () => {
        const g = GEO231.e05, S = SVG231;
        const ok = Math.abs(S.ang(g.D, g.A, g.C) + S.ang(g.C, g.B, g.D) - 130) < 1e-6 && Math.abs(S.ang(g.E, g.A2, g.D) - 30) < 1e-6;
        return ok ? Math.round(S.ang(g.F, g.B2, g.C) * 1e6) / 1e6 + '°' : null;
      },
    },
    {
      id: '23.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '以凸 $n$ 边形的每个顶点为圆心、$3$ 为半径各画一个圆，这些圆两两没有公共点，并且每个圆都不和不过其圆心的边相交（示意图以五边形为例，涂色的是圆在多边形内部的部分）。(1) 所有圆在多边形外部的部分的面积之和，比在内部的部分的面积之和多多少？(2) 如果外部部分的面积之和是内部部分的 $2$ 倍，求 $n$。',
      figure: FIG231.e06,
      blanks: [
        { kind: 'real', label: '(1) 多', answer: '18π' },
        { kind: 'num', label: '(2) $n=$', answer: '6' },
      ],
      explain: [
        '每个圆在多边形内部的部分是一个扇形，圆心角是这个顶点的内角。$n$ 个扇形的圆心角合起来是 $(n-2)\\cdot180^\\circ$，所以内部面积之和 $=\\frac{(n-2)\\cdot180}{360}\\cdot9\\pi=\\frac{9(n-2)\\pi}2$。',
        '$n$ 个圆的总面积是 $9n\\pi$，外部面积之和 $=9n\\pi-\\frac{9(n-2)\\pi}2=\\frac{9(n+2)\\pi}2$。',
        '(1) 外部减内部 $=\\frac{9\\pi}{2}\\cdot4=18\\pi$，和 $n$ 无关——相当于每个圆在外部多出的那部分圆心角加起来是 $2\\times$外角和 $=720^\\circ$，即两个整圆。',
        '(2) $\\frac{9(n+2)\\pi}2=2\\cdot\\frac{9(n-2)\\pi}2$，$n+2=2n-4$，$n=6$。坑：把外部面积当成“外角对应的扇形”，只算了 $360^\\circ$ 的部分。',
      ],
      verify: () => {
        const inner = n => ((n - 2) * 180 / 360) * 9 * Math.PI, outer = n => 9 * n * Math.PI - inner(n);
        let nn = null;
        for (let n = 3; n < 100; n++) if (Math.abs(outer(n) - 2 * inner(n)) < 1e-9) nn = n;
        return [outer(7) - inner(7), nn];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '23.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '一个凸多边形的各内角的度数都是整数，从小到大排列后，每个角都比前一个角大同一个度数（大于 $0$）。最小的内角是 $135^\\circ$。这个多边形可能是几边形？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '边数', answer: ['10', '15'] }],
      explain: [
        '思路：直接用内角列式含两个未知数，转成外角更清楚。设 $n$ 边形，每次增加 $d^\\circ$（$d$ 是正整数，因为相邻两角都是整数度）。外角从大到小依次是 $45,45-d,45-2d,\\dots,45-(n-1)d$。',
        '这些外角共减去了 $d\\cdot(1+2+\\dots+(n-1))$。把 $1+2+\\dots+(n-1)$ 首尾配对：$1+(n-1)$、$2+(n-2)$……每对都是 $n$，倒着再写一遍相加得 $2\\times(1+2+\\dots+(n-1))=(n-1)\\cdot n$，所以它等于 $\\frac{n(n-1)}2$。',
        '外角和：$45n-d\\cdot\\frac{n(n-1)}2=360$，得 $d=\\frac{90(n-8)}{n(n-1)}$，所以 $n>8$。',
        '凸多边形最大内角小于 $180^\\circ$，即最小外角 $45-(n-1)d>0$。代入 $d$：$45-\\frac{90(n-8)}n>0$，$45n>90n-720$，$n<16$。',
        '在 $9\\le n\\le15$ 里逐个看 $d=\\frac{90(n-8)}{n(n-1)}$ 是不是整数：$n=9$ 得 $\\frac{90}{72}$，$n=10$ 得 $2$，$n=11$ 得 $\\frac{270}{110}$，$n=12$ 得 $\\frac{360}{132}$，$n=13$ 得 $\\frac{450}{156}$，$n=14$ 得 $\\frac{540}{182}$，$n=15$ 得 $3$。',
        '所以 $n=10$（$d=2$，最大角 $153^\\circ$）或 $n=15$（$d=3$，最大角 $177^\\circ$）。坑：只找到一个；忘了“最大角小于 $180^\\circ$”的限制，范围就定不下来。',
      ],
      verify: () => {
        const res = [];
        for (let n = 3; n < 400; n++) for (let d = 1; d < 180; d++) {
          let sum = 0, ok = true;
          for (let i = 0; i < n; i++) { const a = 135 + i * d; if (a >= 180) { ok = false; break; } sum += a; }
          if (ok && sum === (n - 2) * 180) res.push(n);
        }
        return res;
      },
    },
    {
      id: '23.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '用一条直线把一个凸多边形纸片剪成两个多边形（示意图只是其中一种剪法）。剪得的两个多边形的内角和加起来，恰好是原多边形内角和的 $\\frac76$ 倍。原多边形可能是几边形？（全部填出，用逗号隔开）',
      figure: FIG231.c02,
      blanks: [{ kind: 'nums', label: '边数', answer: ['8', '14'] }],
      explain: [
        '先看边数怎么变。设原来是 $n$ 边形，剪得 $a$ 边形和 $b$ 边形。剪痕成为两块各自的一条边；原来的边被剪断时，一条边变成两块里各一条。',
        '剪痕经过两个顶点：$a+b=n+2$；经过一个顶点（另一端在边上）：$a+b=n+3$；不经过顶点：$a+b=n+4$。',
        '两块内角和之和 $=(a+b-4)\\cdot180^\\circ$，三种剪法分别是 $(n-2)\\cdot180^\\circ$、$(n-1)\\cdot180^\\circ$、$n\\cdot180^\\circ$，即比原内角和 $(n-2)\\cdot180^\\circ$ 多 $0^\\circ$、$180^\\circ$、$360^\\circ$。',
        '“是原来的 $\\frac76$ 倍”就是多出原来的 $\\frac16$。经过两个顶点时一点也没多，不行；经过一个顶点：$\\frac16(n-2)\\cdot180=180$，$n=8$；不经过顶点：$\\frac16(n-2)\\cdot180=360$，$n=14$。',
        '两种都能剪出来（比如八边形从一个顶点剪到对面一条边的中间，十四边形剪痕连接两条不相邻边的中点）。答案：$8$ 或 $14$。坑：只想到一种剪法，只得到一个答案；或者把“多出的部分”算成原内角和的 $\\frac76$。',
      ],
      verify: () => {
        const res = [];
        for (let n = 3; n < 100; n++) for (const k of [2, 3, 4]) if ((n + k - 4) * 6 === (n - 2) * 7) res.push(n);
        return [...new Set(res)];
      },
    },
    {
      id: '23.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '对于凸多边形的一条边，把与它相邻的两条边都朝这条边的方向延长，如果两条延长线在这条边的外侧相交，就说这条边外侧“有尖角”（图为一个六边形，每条边外侧都有尖角）；如果两条延长线平行，或者在另一侧相交，就说这条边外侧“没有尖角”。(1) 凸四边形中，外侧没有尖角的边至少有几条？(2) 凸四边形中，外侧没有尖角的边最多有几条？(3) 凸 $n$ 边形（$n\\ge5$）中，外侧没有尖角的边最多有几条？',
      figure: FIG231.c03,
      blanks: [
        { kind: 'num', label: '(1) 至少', answer: '2' },
        { kind: 'num', label: '(2) 最多', answer: '4' },
        { kind: 'num', label: '(3) 最多', answer: '2' },
      ],
      explain: [
        '先把“有尖角”翻译成角的条件。设顶点 $V_i$ 处的外角为 $e_i$。边 $V_iV_{i+1}$ 外侧如果有尖角，尖角和这条边组成一个三角形，它在 $V_i$、$V_{i+1}$ 处的两个底角正好是外角 $e_i$、$e_{i+1}$。所以：有尖角 $\\Leftrightarrow e_i+e_{i+1}<180^\\circ$；$e_i+e_{i+1}=180^\\circ$ 时两条延长线平行（同旁内角互补），大于时在另一侧相交。',
        '(1) 四边形：$(e_1+e_2)+(e_3+e_4)=360^\\circ$，两个括号不能都小于 $180^\\circ$，所以边 $V_1V_2$、$V_3V_4$ 中至少一条没有尖角；同理 $V_2V_3$、$V_4V_1$ 中也至少一条。至少 $2$ 条。能取到：外角取 $120^\\circ$、$70^\\circ$、$50^\\circ$、$120^\\circ$，四个两两相邻之和依次为 $190^\\circ$、$120^\\circ$、$170^\\circ$、$240^\\circ$，恰好 $2$ 条没有尖角。',
        '(2) 长方形四个外角都是 $90^\\circ$，每两条相邻外角之和都是 $180^\\circ$，对边平行，$4$ 条边都没有尖角，最多 $4$ 条。',
        '(3) $n\\ge5$ 时，先看两条没有公共顶点的边：如果它们都没有尖角，这四个顶点的外角之和就不小于 $360^\\circ$，而其余顶点（至少还有一个）的外角都大于 $0^\\circ$，外角和超过 $360^\\circ$，矛盾。所以没有尖角的边两两都有公共顶点。',
        '在 $n\\ge5$ 的多边形里，三条边不可能两两都有公共顶点（一个顶点只连着两条边，三条边两两相邻就围成了三角形），所以最多 $2$ 条，而且这两条相邻。能取到：五个外角取 $150^\\circ$、$40^\\circ$、$50^\\circ$、$50^\\circ$、$70^\\circ$，只有夹着 $150^\\circ$ 那个顶点的两条边没有尖角。答案：$2$、$4$、$2$。坑：只想到“边数越多，没有尖角的边越多”，或者忘了平行（等于 $180^\\circ$）也算没有尖角。',
      ],
      verify: () => {
        // 在整数外角（按步长取值）里穷举，统计“相邻两外角之和不小于 180°”的边数
        const scan = (n, step) => {
          let lo = Infinity, hi = 0;
          const e = [];
          const rec = (i, left) => {
            if (i === n - 1) {
              if (left <= 0 || left >= 180) return;
              e[i] = left;
              let c = 0;
              for (let k = 0; k < n; k++) if (e[k] + e[(k + 1) % n] >= 180) c++;
              lo = Math.min(lo, c); hi = Math.max(hi, c);
              return;
            }
            for (let v = step; v < 180 && v < left; v += step) { e[i] = v; rec(i + 1, left - v); }
          };
          rec(0, 360);
          return [lo, hi];
        };
        const q = scan(4, 5), p5 = scan(5, 10), p6 = scan(6, 15);
        return [q[0], q[1], Math.max(p5[1], p6[1])];
      },
    },
    {
      id: '23.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一个凸多边形各内角的度数都是整数，并且两两不相等。(1) 这个多边形最多有几条边？(2) 当边数取最多时，它最小的内角最大可能是多少度？',
      blanks: [
        { kind: 'num', label: '(1) 最多', answer: '26' },
        { kind: 'angle', label: '(2) 最小内角最大是', answer: '153°' },
      ],
      explain: [
        '思路：内角和随边数变化，不好控制；外角和固定是 $360^\\circ$。内角是互不相等的整数，外角 $=180^\\circ-$内角，也是互不相等的正整数，而且加起来是 $360$。',
        '(1) $n$ 个互不相等的正整数，和至少是 $1+2+\\dots+n=\\frac{n(n+1)}2$。$\\frac{26\\times27}2=351\\le360$，$\\frac{27\\times28}2=378>360$，所以 $n\\le26$。',
        '$n=26$ 能做到：外角取 $1,2,\\dots,25$ 和 $35$，和为 $325+35=360$，都小于 $180$，依次按这些外角转向、适当选取边长就能围成凸二十六边形。最多 $26$ 条边。',
        '(2) 最小的内角对应最大的外角，要让最大的外角 $m$ 尽量小。$26$ 个互不相等、都不超过 $m$ 的正整数，和最大是 $m+(m-1)+\\dots+(m-25)=26m-325$，要达到 $360$：$26m\\ge685$，$m\\ge27$。',
        '$m=27$ 能做到：取 $1\\sim27$ 去掉 $18$，和为 $378-18=360$。所以最小内角最大是 $180^\\circ-27^\\circ=153^\\circ$。坑：(2) 里平均分 $360\\div26\\approx13.8$ 去估，忘了要“互不相等”。',
      ],
      verify: () => {
        let n = 3;
        while ((n + 1) * (n + 2) / 2 <= 360) n++;
        let m = n;
        while (!(n * m - (n * (n - 1)) / 2 >= 360 && (n - 1) * n / 2 + m <= 360)) m++;
        return [n, 180 - m + '°'];
      },
    },
    {
      id: '23.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，五边形 $ABCDE$ 的五条边都相等，五个内角也都相等。以 $AB$ 为一边作等边三角形 $ABF$，连接 $CF$、$DF$。求 $\\angle CFD$ 的度数。（有几种情况就填几个，用逗号隔开）',
      figure: FIG231.c05,
      blanks: [{ kind: 'nums', label: '$\\angle CFD$ 的度数', answer: ['84', '24'] }],
      explain: [
        '五边形每个内角是 $540^\\circ\\div5=108^\\circ$。题目没说 $F$ 在 $AB$ 的哪一侧，要分 $F$ 在五边形内部、外部两种情况。',
        '先找 $DF$ 的位置：$\\triangle DEA\\cong\\triangle DCB$（$EA=CB$，$\\angle E=\\angle C$，$ED=CD$，边角边），所以 $DA=DB$，$D$ 在 $AB$ 的垂直平分线上；$FA=FB$，$F$ 也在上面。五边形关于这条直线对称（$A$、$B$ 互换，$E$、$C$ 互换），所以直线 $DF$ 平分 $\\angle CDE$，$\\angle FDC=54^\\circ$。',
        '$F$ 在内部：$\\angle FBC=108^\\circ-60^\\circ=48^\\circ$，$BF=BA=BC$，$\\angle BCF=\\frac{180^\\circ-48^\\circ}2=66^\\circ$，$\\angle FCD=108^\\circ-66^\\circ=42^\\circ$，$\\angle CFD=180^\\circ-42^\\circ-54^\\circ=84^\\circ$。',
        '$F$ 在外部：$\\angle FBC=108^\\circ+60^\\circ=168^\\circ$，$\\angle BCF=\\frac{180^\\circ-168^\\circ}2=6^\\circ$，$\\angle FCD=108^\\circ-6^\\circ=102^\\circ$，$\\angle CFD=180^\\circ-102^\\circ-54^\\circ=24^\\circ$。',
        '答案：$84^\\circ$ 或 $24^\\circ$。坑：只画了 $F$ 在内部的一种；或者没看出 $D$、$F$ 都在 $AB$ 的垂直平分线上，求不出 $\\angle FDC$。',
      ],
      verify: () => {
        const S = SVG231, g = GEO231.c05, [, , C, D] = g.P;
        return [g.Fin, g.Fout].map(Fp => Math.round(S.ang(Fp, C, D) * 1e6) / 1e6);
      },
    },
  ],
});
