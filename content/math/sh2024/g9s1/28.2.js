'use strict';

// 上海数学九年级上册 · 28.2 相似三角形（课本第 54～68 页）
// 知识范围：相似三角形的定义（三个角对应相等、三条边对应成比例）、记号 ∽ 与对应顶点、相似比（有方向，k 与 1/k）、全等是相似比为 1 的相似、传递性；
//   预备定理（平行于一边的直线截其他两边所在直线，截得的三角形与原三角形相似）；判定：两角对应相等、两边对应成比例且夹角相等、三边对应成比例；
//   直角三角形：斜边和一条直角边对应成比例；性质：对应高、对应中线、对应角平分线、周长之比等于相似比，面积之比等于相似比的平方
//   课本例题方法：例 4 直角三角形斜边上的高（现推乘积式，不用“射影定理”名称）、例 8 三角形内接正方形、例 9 过顶点作平行线证比例（不用“角平分线定理”名称）
// 可以使用：28.1（比例性质、平行线分线段成比例）；六～八年级全部（全等、等腰、勾股定理及逆定理、中位线、平行四边形、坐标系、一次函数）；第 27 章二次函数
// 还没学：锐角三角比（第 29 章）、圆、相似多边形（28.3）、位似（28.4）
// 本节约定：带根号的结果用 real / reals 并要求最简；多个答案用 nums / reals

const SVG282 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  shade: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#e9dcc3" stroke="none"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  curve: pts => `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  ra: (P, Q, R, s = 9) => {
    const u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]], lu = Math.hypot(...u), lv = Math.hypot(...v);
    const a = [P[0] + (u[0] / lu) * s, P[1] + (u[1] / lu) * s], b = [P[0] + (v[0] / lv) * s, P[1] + (v[1] / lv) * s], c = [a[0] + b[0] - P[0], a[1] + b[1] - P[1]];
    return `<polyline points="${[a, c, b].map(p => p.map(t => t.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
  },
  at: (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t],
  dist: (P, Q) => Math.hypot(P[0] - Q[0], P[1] - Q[1]),
  meet: (p1, p2, q1, q2) => {
    const d1 = [p2[0] - p1[0], p2[1] - p1[1]], d2 = [q2[0] - q1[0], q2[1] - q1[1]];
    const det = d1[0] * -d2[1] + d2[0] * d1[1];
    const s = ((q1[0] - p1[0]) * -d2[1] + d2[0] * (q1[1] - p1[1])) / det;
    return [p1[0] + s * d1[0], p1[1] + s * d1[1]];
  },
  // B 在原点、C=(a,0)，AB=c、AC=b，求 A（在上方）
  apex: (a, b, c) => { const x = (c * c - b * b + a * a) / (2 * a); return [x, Math.sqrt(c * c - x * x)]; },
  // 按点的范围自动缩放：P 为数学坐标（y 向上）的点表，segs/dash 为 'AB' 这样的两字母连线（字母可带撇号写成 "A'"，用数组），labels 为 {名字: [dx, dy]}
  fig: ({ P, w = 260, maxH = 220, pad = 22, segs = [], dash = [], labels = {}, ra = [], shade = [], dots = [], extra = () => '' }) => {
    const xs = Object.values(P).map(p => p[0]), ys = Object.values(P).map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const k = Math.min((w - 2 * pad) / (x1 - x0 || 1), (maxH - 2 * pad) / (y1 - y0 || 1));
    const h = Math.round((y1 - y0) * k + 2 * pad);
    const m = ([x, y]) => [pad + (x - x0) * k + (w - 2 * pad - (x1 - x0) * k) / 2, h - pad - (y - y0) * k];
    const S = {};
    for (const n in P) S[n] = m(P[n]);
    let out = shade.map(names => SVG282.shade(names.map(n => S[n]))).join('');
    out += segs.map(([a, b]) => SVG282.seg(S[a], S[b])).join('');
    out += dash.map(([a, b]) => SVG282.seg(S[a], S[b], true)).join('');
    out += ra.map(([p, q, r]) => SVG282.ra(S[p], S[q], S[r])).join('');
    out += dots.map(n => SVG282.dot(S[n])).join('');
    out += extra(m, S);
    for (const n in labels) out += SVG282.text(n.replace(/1$/, '<tspan font-size="11" dy="4">1</tspan>'), S[n], labels[n][0], labels[n][1]);
    return SVG282.wrap(w, h, out);
  },
};

// 两两连线：'AB BC CA' → [['A','B'],...]
const pairs282 = s => s.trim().split(/\s+/).map(t => (t.includes('-') ? t.split('-') : [t[0], t.slice(1)]));

const FIG282 = (() => {
  const G = SVG282, out = {};
  // b03：DE∥BC，AD=2，DB=3，DE=4，BC=10
  {
    const A = [4, 5], B = [0, 0], C = [10, 0], D = G.at(A, B, 0.4), E = G.at(A, C, 0.4);
    out.b03 = G.fig({ P: { A, B, C, D, E }, segs: pairs282('AB BC CA DE'), labels: { A: [0, -12], B: [-10, 4], C: [10, 4], D: [-11, -2], E: [11, -2] } });
  }
  // b04：AB∥CD，AC 与 BD 交于 O，AB=4，CD=6（AO∶OC=2∶3）
  {
    const A = [0, 3], B = [4, 3], C = [7, -2], D = [1, -2], O = G.meet(A, C, B, D);
    out.b04 = G.fig({ P: { A, B, C, D, O }, segs: pairs282('AB CD AC BD'), labels: { A: [-10, -6], B: [10, -6], C: [10, 4], D: [-10, 4], O: [14, 0] } });
  }
  // b05：AB=8，AC=6，BC=9，AD=3，AE=4
  {
    const B = [0, 0], C = [9, 0], A = G.apex(9, 6, 8), D = G.at(A, B, 3 / 8), E = G.at(A, C, 4 / 6);
    out.b05 = G.fig({ P: { A, B, C, D, E }, segs: pairs282('AB BC CA DE'), labels: { A: [0, -12], B: [-10, 4], C: [10, 4], D: [-11, -2], E: [11, -2] } });
  }
  // b09：∠ACB=90°，CD⊥AB，AD=4，BD=5
  {
    const A = [0, 0], B = [9, 0], D = [4, 0], C = [4, 2 * Math.sqrt(5)];
    out.b09 = G.fig({ P: { A, B, C, D }, segs: pairs282('AB BC CA CD'), ra: [['D', 'B', 'C']], labels: { A: [-10, 4], B: [10, 4], C: [0, -12], D: [0, 14] } });
  }
  // e01：AB=AC=9，BC=12，D 在 BC 上，∠ADE=∠B
  {
    const B = [0, 0], C = [12, 0], A = [6, Math.sqrt(45)], D = [6 + 3 * Math.sqrt(2), 0], E = G.at(C, A, 2 / 9);
    out.e01 = G.fig({ P: { A, B, C, D, E }, segs: pairs282('AB BC CA AD DE'), labels: { A: [0, -12], B: [-10, 4], C: [10, 4], D: [0, 14], E: [11, -4] } });
  }
  // e02：BC=15，AH=10 的锐角三角形内接矩形（示意，比例不是答案）
  {
    const B = [0, 0], C = [15, 0], A = [6, 10], t = 0.5;
    const D = G.at(B, A, t), G1 = G.at(C, A, t), E = [D[0], 0], F = [G1[0], 0], H = [6, 0];
    out.e02 = G.fig({ P: { A, B, C, D, G: G1, E, F, H }, segs: pairs282('AB BC CA DG DE GF'), dash: pairs282('AH'), ra: [['H', 'C', 'A']], labels: { A: [0, -12], B: [-10, 4], C: [10, 4], D: [-11, -2], G: [11, -2], E: [0, 14], F: [0, 14], H: [0, 14] } });
  }
  // e04：梯形 AD∥BC，AD=4，BC=6，EF 过 O 且平行于 BC
  {
    const A = [1, 5], D = [5, 5], B = [0, 0], C = [6, 0], O = G.meet(A, C, B, D);
    const E = G.meet(A, B, O, [O[0] + 1, O[1]]), F = G.meet(D, C, O, [O[0] + 1, O[1]]);
    out.e04 = G.fig({ P: { A, B, C, D, O, E, F }, segs: pairs282('AD DC CB BA AC BD EF'), labels: { A: [-6, -10], D: [6, -10], B: [-10, 4], C: [10, 4], O: [0, 14], E: [-11, 0], F: [11, 0] } });
  }
  // e05：AB=6，AC=4，AD 平分∠BAC，DE∥AC（BC 画成 5，题中没给）
  {
    const B = [0, 0], C = [5, 0], A = G.apex(5, 4, 6), D = [3, 0], E = G.at(B, A, 3 / 5);
    out.e05 = G.fig({ P: { A, B, C, D, E }, segs: pairs282('AB BC CA AD DE'), labels: { A: [0, -12], B: [-10, 4], C: [10, 4], D: [0, 14], E: [-11, -2] } });
  }
  // e06：平行四边形 ABCD，AB=6，AD=4，E 在 CD 上，AE 交 BC 延长线于 F
  {
    const A = [0, 0], B = [6, 0], D = [2, 2 * Math.sqrt(3)], C = [8, 2 * Math.sqrt(3)], E = G.at(D, C, 2.4 / 6), F = G.meet(A, E, B, C);
    out.e06 = G.fig({ P: { A, B, C, D, E, F }, segs: pairs282('AB BC CD DA AF'), dash: pairs282('CF'), labels: { A: [-10, 4], B: [8, 10], C: [12, 2], D: [-8, -8], E: [0, -12], F: [0, -12] } });
  }
  // c01：抛物线 y=-2x²+6x+8
  {
    const f = x => -2 * x * x + 6 * x + 8, kx = 34, ky = 13, ox = 70, oy = 190;
    const m = ([x, y]) => [ox + x * kx, oy - y * ky];
    const pts = [];
    for (let x = -1.35; x <= 4.36; x += 0.05) pts.push(m([x, f(x)]));
    const ax = [m([-1.8, 0]), m([5.2, 0])], ay = [m([0, -3]), m([0, 13.5])];
    const ah = p => `<polygon points="${p[0]},${p[1]} ${p[0] - 8},${p[1] - 4} ${p[0] - 8},${p[1] + 4}" fill="#2b2b2b"/>`;
    const av = p => `<polygon points="${p[0]},${p[1]} ${p[0] - 4},${p[1] + 8} ${p[0] + 4},${p[1] + 8}" fill="#2b2b2b"/>`;
    const A = m([-1, 0]), B = m([4, 0]), C = m([0, 8]);
    out.c01 = G.wrap(260, 240, G.seg(ax[0], ax[1], false, 1.2) + ah(ax[1]) + G.seg(ay[0], ay[1], false, 1.2) + av(ay[1]) + G.curve(pts)
      + G.seg(A, C) + G.seg(B, C) + [A, B, C].map(G.dot).join('')
      + G.text('<tspan font-style="italic">x</tspan>', ax[1], -2, 12) + G.text('<tspan font-style="italic">y</tspan>', ay[1], 12, 2) + G.text('O', m([0, 0]), -10, 10)
      + G.text('A', A, -8, 12) + G.text('B', B, 8, 12) + G.text('C', C, -12, -4));
  }
  // c02：A(0,0)、B(2,0)、C(0,4)，D 在线段 BC 上（示意位置），E 由 AD 逆时针转 90° 再伸长 2 倍
  {
    const A = [0, 0], B = [2, 0], C = [0, 4], s = 0.3, D = [2 - 2 * s, 4 * s], E = [-8 * s, 4 - 4 * s];
    out.c02 = G.fig({ P: { A, B, C, D, E }, maxH: 230, segs: pairs282('AB AC BC AD AE CE DE'), ra: [['A', 'B', 'C']], labels: { A: [-6, 12], B: [10, 6], C: [8, -10], D: [12, 2], E: [-10, -4] } });
  }
  // c03：直角梯形（a 取 3 时的示意）
  {
    const B = [0, 0], C = [10, 0], A = [0, 3], D = [10, 4], P = [30 / 7, 0];
    out.c03 = G.fig({ P: { A, B, C, D, P }, segs: pairs282('AB BC CD DA AP PD'), ra: [['B', 'C', 'A'], ['C', 'D', 'B']], labels: { A: [-10, -4], B: [-10, 6], C: [10, 6], D: [10, -4], P: [0, 14] } });
  }
  // c04：BC=12，AH=8，BH=4，DE=9 时翻折后 A′ 在 BC 下方
  {
    const B = [0, 0], C = [12, 0], H = [4, 0], A = [4, 8], t = 0.75, D = G.at(A, B, t), E = G.at(A, C, t), A1 = [4, 8 - 2 * 8 * t];
    const M = G.meet(A1, D, B, C), N = G.meet(A1, E, B, C);
    out.c04 = G.fig({
      P: { A, B, C, D, E, H, "A'": A1, M, N }, maxH: 240,
      shade: [['D', 'M', 'N', 'E']],
      segs: pairs282('AB BC CA DE'), dash: [['A', 'H'], ["A'", 'D'], ["A'", 'E']],
      labels: { A: [0, -12], B: [-10, 4], C: [10, 4], D: [-11, -4], E: [11, -4], H: [-8, 12], "A'": [0, 12] },
    });
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/28.2',
  title: '相似三角形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），先审挑战题提纲两轮再写全文，全文子代理盲解复核两轮，答案全部一致。提纲阶段打回：c01 数据是流传题 y=−x²+2x+3 乘 2（改新数据、∠PBA=∠ACB 要自己作高）；c03 矩形中 △ABP∽△PCD 计数是流传题（改直角梯形 AB=a，两种对应含外分点与去重）；c04 翻折重叠面积最大值是熟知结论（第(3)问改为 ∠BA′C=90°）；c05 第(3)问生硬且用 6-8-10（改为 13-20-21、P 在直线 BC 上两种形状）。全文第一轮打回：c01 只到中考 24 题水平（加问 x 轴上点 Q 使 △BPQ 与 △ABC 相似；复核建议的“M 在对称轴上”6 种对应均无解）；c04 填空标签泄露分段点、e02 与 c04 同数据；c05 补“对应关系不确定”；b09 原题直接勾股无坑（改为 AD=4、DB=5 求 AC）。' },
  intro: [
    {
      title: '相似三角形与相似比',
      body: '形状相同、大小不一定相同的两个三角形叫相似三角形：三个角对应相等，三条边对应成比例。记作 $\\triangle ABC\\backsim\\triangle A_1B_1C_1$，对应顶点要写在对应的位置上。对应边的比叫相似比，它有方向：前一个比后一个是 $k$，反过来就是 $\\frac1k$。全等三角形是相似比为 $1$ 的相似三角形；两个三角形都和第三个三角形相似，它们也相似。',
      example: '$\\triangle PQR\\backsim\\triangle XYZ$，$PQ=5$，$XY=10$：$\\triangle PQR$ 与 $\\triangle XYZ$ 的相似比是 $\\frac12$，$\\triangle XYZ$ 与 $\\triangle PQR$ 的相似比是 $2$；$QR$ 的对应边是 $YZ$。',
      pitfall: '找对应边看记号里字母的位置，不看字母本身：$\\triangle PQR\\backsim\\triangle XZY$ 时，$QR$ 对应的是 $ZY$。',
    },
    {
      title: '平行线截出相似三角形',
      body: '直线平行于三角形的一边，并且与另两边（或它们的延长线）相交，截得的三角形与原三角形相似（预备定理）。这就是常见的“A 字型”和“8 字型”：平行线让对应角相等，再由平行线分线段成比例得到三边成比例。',
      example: '$\\triangle PQR$ 中 $MN\\parallel QR$，$M$、$N$ 分别在 $PQ$、$PR$ 上，$PM\\colon PQ=3\\colon4$，$QR=8$：$\\triangle PMN\\backsim\\triangle PQR$，$MN=8\\times\\frac34=6$。',
      pitfall: '小三角形的边要和整条边比：已知的是 $PM\\colon MQ$ 时，要先换成 $PM\\colon PQ$。',
    },
    {
      title: '三个判定定理',
      body: '不必验证三个角和三条边：① 两角对应相等；② 两边对应成比例且夹角相等；③ 三边对应成比例。用 ② 时角必须是两边的夹角；用 ③ 时先把两个三角形的边各自从小到大排好再比。',
      example: '$OP=2$，$OR=3$，$OQ=4$，$OS=6$，$PS$ 与 $QR$ 交于 $O$（$P$、$S$ 在 $O$ 两侧，$Q$、$R$ 在 $O$ 两侧）：$\\frac{OP}{OS}=\\frac{OR}{OQ}$ 不成立，但 $\\frac{OP}{OQ}=\\frac{OR}{OS}=\\frac12$，夹角是对顶角，所以 $\\triangle OPR\\backsim\\triangle OQS$。',
      pitfall: '两边成比例时要先找出夹角，再决定哪条边对哪条边。',
    },
    {
      title: '直角三角形的相似',
      body: '两个直角三角形，只要再有一个锐角相等就相似；另外，斜边和一条直角边对应成比例的两个直角三角形也相似（用勾股定理可以推出第三边也成同样的比）。',
      example: '一个直角三角形斜边 $13$、一条直角边 $5$，另一个斜边 $26$、一条直角边 $10$：$\\frac{5}{10}=\\frac{13}{26}$，两个直角三角形相似。',
      pitfall: '题目只说“一条直角边”时，要想想它对应的是不是另一条直角边。',
    },
    {
      title: '相似三角形的性质',
      body: '相似三角形对应高的比、对应中线的比、对应角平分线的比、周长的比都等于相似比；面积的比等于相似比的平方。反过来，知道面积比，开平方才得到相似比。',
      example: '两个相似三角形的相似比是 $3\\colon4$：对应中线之比、周长之比都是 $3\\colon4$，面积之比是 $9\\colon16$。',
      pitfall: '面积比不等于相似比；已知面积比求边长、周长时别忘了开平方。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '28.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的有（　　）<br>① 所有等腰三角形都相似；② 所有等边三角形都相似；③ 全等三角形是相似比为 $1$ 的相似三角形；④ 有一个锐角相等的两个直角三角形相似；⑤ 有一个角是 $100^\\circ$ 的两个等腰三角形相似；⑥ 有一个角是 $40^\\circ$ 的两个等腰三角形相似；⑦ 如果 $\\triangle A_1B_1C_1\\backsim\\triangle ABC$，$\\triangle A_2B_2C_2\\backsim\\triangle ABC$，那么 $\\triangle A_1B_1C_1\\backsim\\triangle A_2B_2C_2$。',
      options: ['$3$ 个', '$4$ 个', '$5$ 个', '$6$ 个'],
      answer: 2,
      explain: [
        '①错：等腰三角形的顶角可以不同，比如顶角 $30^\\circ$ 和顶角 $90^\\circ$ 的两个等腰三角形形状不同。',
        '②对：三个角都是 $60^\\circ$。③对。④对：直角相等，再有一个锐角相等，两角对应相等。',
        '⑤对：$100^\\circ$ 是钝角，只能是顶角，两个底角都是 $40^\\circ$，三个角都对应相等。',
        '⑥错（坑）：$40^\\circ$ 可能是顶角（底角 $70^\\circ$），也可能是底角（顶角 $100^\\circ$），两个三角形不一定相似。',
        '⑦对：这是相似的传递性。正确的有②③④⑤⑦共 $5$ 个，选 C。',
      ],
      verify: () => {
        // ⑤⑥：枚举“这个角是顶角还是底角”，看得到的形状是否唯一
        const shapes = a => [a < 180 ? [a, (180 - a) / 2, (180 - a) / 2] : null, 2 * a < 180 ? [180 - 2 * a, a, a] : null].filter(Boolean).map(s => s.slice().sort((p, q) => p - q).join());
        const unique = a => new Set(shapes(a)).size === 1;
        const truth = [false, true, true, true, unique(100), unique(40), true];
        return truth.filter(Boolean).length - 3;
      },
    },
    {
      id: '28.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\triangle ABC\\backsim\\triangle DFE$，$AB=6$，$BC=9$，$AC=7.5$，$DF=4$。求 $FE$、$DE$ 的长，以及 $\\triangle DFE$ 与 $\\triangle ABC$ 的相似比。',
      blanks: [
        { kind: 'num', label: '$FE=$', answer: '6' },
        { kind: 'num', label: '$DE=$', answer: '5' },
        { kind: 'num', label: '$\\triangle DFE$ 与 $\\triangle ABC$ 的相似比 $k=$', answer: '2/3' },
      ],
      explain: [
        '按记号里的位置对应：$A\\to D$，$B\\to F$，$C\\to E$，所以 $AB$ 对 $DF$，$BC$ 对 $FE$，$AC$ 对 $DE$。坑：看到字母 $E$ 在第二个位置就把 $AB$ 对成 $DE$。',
        '$\\frac{DF}{AB}=\\frac46=\\frac23$，所以 $FE=9\\times\\frac23=6$，$DE=7.5\\times\\frac23=5$。',
        '$\\triangle DFE$ 与 $\\triangle ABC$ 的相似比是前者比后者，$k=\\frac23$。坑：写成 $\\frac32$（那是 $\\triangle ABC$ 与 $\\triangle DFE$ 的相似比）。',
      ],
      verify: () => { const k = F(4).div(6); return [F(9).mul(k), F('7.5').mul(k), k]; },
    },
    {
      id: '28.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，点 $D$、$E$ 分别在边 $AB$、$AC$ 上，$DE\\parallel BC$，$AD=2$，$DB=3$，$DE=4$，求 $BC$ 的长。',
      figure: FIG282.b03,
      blanks: [{ kind: 'num', label: '$BC=$', answer: '10' }],
      explain: [
        '$DE\\parallel BC$，所以 $\\triangle ADE\\backsim\\triangle ABC$（预备定理）。',
        '对应边是 $AD$ 与 $AB$：$AB=AD+DB=5$，$\\frac{DE}{BC}=\\frac{AD}{AB}=\\frac25$，$BC=4\\times\\frac52=10$。',
        '坑：写成 $\\frac{DE}{BC}=\\frac{AD}{DB}=\\frac23$，得到 $BC=6$。$DB$ 不是 $\\triangle ADE$ 的边，不能拿来对应。',
      ],
      verify: () => F(4).mul(F(2 + 3)).div(2),
    },
    {
      id: '28.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，$AB\\parallel CD$，$AC$ 与 $BD$ 相交于点 $O$，$AB=4$，$CD=6$，$AC=15$，求 $AO$ 的长。',
      figure: FIG282.b04,
      blanks: [{ kind: 'num', label: '$AO=$', answer: '6' }],
      explain: [
        '$AB\\parallel CD$，$\\angle A=\\angle C$，$\\angle B=\\angle D$，所以 $\\triangle AOB\\backsim\\triangle COD$（8 字型），$\\frac{AO}{CO}=\\frac{AB}{CD}=\\frac46=\\frac23$。',
        '$AO$ 占 $AC$ 的 $\\frac{2}{2+3}=\\frac25$，$AO=15\\times\\frac25=6$。',
        '坑：把 $\\frac{AO}{CO}=\\frac23$ 当成 $\\frac{AO}{AC}=\\frac23$，得到 $10$。',
      ],
      verify: () => F(15).mul(F(4).div(4 + 6)),
    },
    {
      id: '28.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，$AB=8$，$AC=6$，$BC=9$，点 $D$、$E$ 分别在边 $AB$、$AC$ 上，$AD=3$，$AE=4$。求 $DE$ 的长。',
      figure: FIG282.b05,
      blanks: [{ kind: 'num', label: '$DE=$', answer: '9/2' }],
      explain: [
        '$\\frac{AD}{AB}=\\frac38$，$\\frac{AE}{AC}=\\frac46$，不相等，所以 $DE$ 不平行于 $BC$。',
        '交叉着比：$\\frac{AD}{AC}=\\frac36=\\frac12$，$\\frac{AE}{AB}=\\frac48=\\frac12$，又 $\\angle A$ 是公共的夹角，所以 $\\triangle ADE\\backsim\\triangle ACB$（$D$ 对 $C$，$E$ 对 $B$）。',
        '$DE$ 对 $CB$：$DE=9\\times\\frac12=\\frac92$。坑：按 $\\frac{AD}{AB}=\\frac38$ 去算，得到 $\\frac{27}8$。',
      ],
      verify: () => {
        const k = F(3).div(6);
        if (!F(4).div(8).eq(k)) throw new Error('不是交叉对应');
        return F(9).mul(k);
      },
    },
    {
      id: '28.2-b06',
      level: 'basic',
      type: 'choice',
      stem: '三个三角形的三边长分别是：甲 $2$、$3$、$4$；乙 $4.5$、$6$、$3$；丙 $4$、$6$、$9$。其中相似的两个是（　　）',
      options: ['甲和乙', '甲和丙', '乙和丙', '三个都不相似'],
      answer: 0,
      explain: [
        '把三边各自从小到大排好：甲 $2,3,4$；乙 $3,4.5,6$；丙 $4,6,9$。',
        '甲和乙：$\\frac32=\\frac{4.5}3=\\frac64=1.5$，三边对应成比例，相似。坑：乙没排序就按 $\\frac{4.5}2$、$\\frac63$ 比，以为不相似。',
        '甲和丙：$\\frac42=\\frac63=2$，但 $\\frac94\\ne2$，不相似。坑：只比了前两组。选 A。',
      ],
      verify: () => {
        const T = [[2, 3, 4], [4.5, 6, 3], [4, 6, 9]].map(t => t.map(x => F(x)).sort((p, q) => p.cmp(q)));
        const sim = (s, t) => s[0].div(t[0]).eq(s[1].div(t[1])) && s[1].div(t[1]).eq(s[2].div(t[2]));
        const r = [sim(T[0], T[1]), sim(T[0], T[2]), sim(T[1], T[2])];
        return r.filter(Boolean).length === 1 ? r.indexOf(true) : 3;
      },
    },
    {
      id: '28.2-b07',
      level: 'basic',
      type: 'choice',
      stem: '一个直角三角形的斜边长 $10$，一条直角边长 $6$；另一个直角三角形的斜边长 $15$，一条直角边长 $12$。这两个直角三角形（　　）',
      options: ['一定相似', '一定不相似', '不能确定是否相似'],
      answer: 0,
      explain: [
        '$\\frac{6}{12}\\ne\\frac{10}{15}$，好像不成比例。坑：就此判断“不相似”。',
        '第一个三角形的另一条直角边是 $\\sqrt{10^2-6^2}=8$，而 $\\frac{8}{12}=\\frac{10}{15}=\\frac23$。',
        '斜边和一条直角边对应成比例，两个直角三角形相似（$8$ 对 $12$，$6$ 对 $9$）。三角形的三边都已确定，所以一定相似，选 A。',
      ],
      verify: () => {
        const leg = Math.sqrt(10 * 10 - 6 * 6);
        const s = [6, leg, 10].sort((p, q) => p - q), t = [Math.sqrt(15 * 15 - 12 * 12), 12, 15].sort((p, q) => p - q);
        return Math.abs(s[0] / t[0] - s[2] / t[2]) < 1e-9 && Math.abs(s[1] / t[1] - s[2] / t[2]) < 1e-9 ? 0 : 1;
      },
    },
    {
      id: '28.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '两个相似三角形对应角平分线的比是 $2\\colon3$，它们的面积之和是 $78$，求较小的三角形的面积。',
      blanks: [{ kind: 'num', label: '较小三角形的面积是', answer: '24' }],
      explain: [
        '对应角平分线的比等于相似比，相似比是 $2\\colon3$。',
        '面积比等于相似比的平方：$4\\colon9$。较小的面积 $=78\\times\\frac{4}{4+9}=24$。',
        '坑：按 $2\\colon3$ 分，得到 $31.2$。',
      ],
      verify: () => F(78).mul(F(4).div(4 + 9)),
    },
    {
      id: '28.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，$\\angle ACB=90^\\circ$，$CD\\perp AB$，垂足为 $D$，$AD=4$，$DB=5$。求 $AC$ 的长。',
      figure: FIG282.b09,
      blanks: [{ kind: 'num', label: '$AC=$', answer: '6' }],
      explain: [
        '$\\triangle ACD$ 与 $\\triangle ABC$：$\\angle A$ 公共，$\\angle ADC=\\angle ACB=90^\\circ$，两角对应相等，所以 $\\triangle ACD\\backsim\\triangle ABC$（$D$ 对 $C$，$C$ 对 $B$）。',
        '对应边成比例：$\\frac{AD}{AC}=\\frac{AC}{AB}$，所以 $AC^2=AD\\cdot AB$。$AB=AD+DB=9$，$AC^2=4\\times9=36$，$AC=6$。',
        '坑：把 $AC^2=AD\\cdot AB$ 记成 $AC^2=AD\\cdot DB=20$，得出 $2\\sqrt5$（那其实是 $CD$）。哪条线段乘哪条，要由相似三角形的对应边现推，不要死记。',
      ],
      verify: () => {
        const AD = F(4), AB = AD.add(5), sq = AD.mul(AB);
        const r = Math.round(Math.sqrt(Number(sq.n)));
        if (BigInt(r * r) !== sq.n || sq.d !== 1n) throw new Error('不是整数');
        return r;
      },
    },
    // ---------- 扩展 ----------
    {
      id: '28.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，$AB=AC=9$，$BC=12$。点 $D$ 在边 $BC$ 上，点 $E$ 在边 $AC$ 上，$\\angle ADE=\\angle B$。若 $CE=2$，求 $BD$ 的长。（全部填出，用逗号隔开，结果化成最简形式）',
      figure: FIG282.e01,
      blanks: [{ kind: 'reals', label: '$BD=$', answer: ['6+3√2', '6-3√2'], simplest: true }],
      explain: [
        '找相似：$\\angle ADC$ 是 $\\triangle ABD$ 的外角，$\\angle ADC=\\angle B+\\angle BAD$；又 $\\angle ADC=\\angle ADE+\\angle EDC=\\angle B+\\angle EDC$，所以 $\\angle BAD=\\angle EDC$。',
        '$AB=AC$ 得 $\\angle B=\\angle C$，两角对应相等，$\\triangle ABD\\backsim\\triangle DCE$，$\\frac{AB}{DC}=\\frac{BD}{CE}$，即 $BD\\cdot DC=AB\\cdot CE=18$。',
        '设 $BD=x$，$x(12-x)=18$，$x^2-12x+18=0$，$x=6\\pm3\\sqrt2$。',
        '检验：两个值都在 $0$ 与 $12$ 之间，$D$ 都在边 $BC$ 上；$CE=2<9$，$E$ 在边 $AC$ 上，所以两个都保留。坑：只写一个。',
      ],
      verify: () => { const r = [6 + Math.sqrt(36 - 18), 6 - Math.sqrt(36 - 18)]; return r.filter(x => x > 0 && x < 12 && Math.abs(x * (12 - x) - 9 * 2) < 1e-9); },
    },
    {
      id: '28.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图（示意图），锐角 $\\triangle ABC$ 中，$BC=15$，高 $AH=10$。矩形 $DEFG$ 的边 $EF$ 在 $BC$ 上，顶点 $D$、$G$ 分别在边 $AB$、$AC$ 上，矩形的一边长是另一边长的 $2$ 倍。求矩形 $DEFG$ 的周长。（全部填出，用逗号隔开）',
      figure: FIG282.e02,
      blanks: [{ kind: 'nums', label: '周长', answer: ['180/7', '45/2'] }],
      explain: [
        '设 $AH$ 交 $DG$ 于 $P$。$DG\\parallel BC$，$\\triangle ADG\\backsim\\triangle ABC$，$AP$、$AH$ 是对应高，所以 $\\frac{DG}{BC}=\\frac{AP}{AH}=\\frac{10-DE}{10}$。',
        '“一边是另一边的 $2$ 倍”有两种情况，坑：只算一种。',
        '① $DG=2DE$：设 $DE=x$，$\\frac{2x}{15}=\\frac{10-x}{10}$，$20x=150-15x$，$x=\\frac{30}7$，周长 $6x=\\frac{180}7$。',
        '② $DE=2DG$：设 $DG=y$，$\\frac{y}{15}=\\frac{10-2y}{10}$，$10y=150-30y$，$y=\\frac{15}4$，周长 $6y=\\frac{45}2$。',
        '两种情况 $DE$（$\\frac{30}7$ 和 $\\frac{15}2$）都小于 $10$，矩形都在三角形内，都成立。',
      ],
      verify: () => {
        // DG∶BC = (h−DE)∶h；① DG=2DE：DE=ah/(2h+a)；② DE=2DG：DG=ah/(h+2a)；周长 = 6×短边
        const a = F(15), h = F(10);
        const x = a.mul(h).div(h.mul(2).add(a)), y = a.mul(h).div(h.add(a.mul(2)));
        if (!x.mul(2).div(a).eq(h.sub(x).div(h)) || !y.div(a).eq(h.sub(y.mul(2)).div(h))) throw new Error('比例不成立');
        if (!(x.n < h.n * x.d && y.mul(2).n < h.n * y.d)) throw new Error('DE 超出高');
        return [x.mul(6), y.mul(6)];
      },
    },
    {
      id: '28.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 中，$AB=12$，$AC=9$。动点 $P$ 从 $A$ 出发沿 $AB$ 向 $B$ 以每秒 $2$ 个单位运动，同时动点 $Q$ 从 $C$ 出发沿 $CA$ 向 $A$ 以每秒 $1$ 个单位运动，一个点到达终点时两点都停止。运动 $t$ 秒（$t>0$）时，以 $A$、$P$、$Q$ 为顶点的三角形与 $\\triangle ABC$ 相似，求 $t$。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '$t=$', answer: ['18/5', '27/11'] }],
      explain: [
        '$AP=2t$，$AQ=9-t$；$P$ 在 $t=6$ 时到 $B$，$Q$ 在 $t=9$ 时到 $A$，所以 $0<t\\le6$。',
        '两个三角形有公共角 $\\angle A$，按“两边成比例且夹角相等”，有两种对应。',
        '① $\\triangle APQ\\backsim\\triangle ABC$：$\\frac{AP}{AB}=\\frac{AQ}{AC}$，$\\frac{2t}{12}=\\frac{9-t}9$，$18t=108-12t$，$t=\\frac{18}5$。',
        '② $\\triangle APQ\\backsim\\triangle ACB$：$\\frac{AP}{AC}=\\frac{AQ}{AB}$，$\\frac{2t}9=\\frac{9-t}{12}$，$24t=81-9t$，$t=\\frac{27}{11}$。',
        '两个值都在 $0<t\\le6$ 内。坑：只考虑 $PQ\\parallel BC$ 的那一种。',
      ],
      verify: () => {
        const ts = [F(108).div(30), F(81).div(33)];
        return ts.filter(t => t.cmp(0) > 0 && t.cmp(6) <= 0);
      },
    },
    {
      id: '28.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，梯形 $ABCD$ 中，$AD\\parallel BC$，对角线 $AC$、$BD$ 相交于点 $O$，$S_{\\triangle AOD}=4$，$S_{\\triangle AOB}=6$，$AD=4$。过点 $O$ 作 $EF\\parallel BC$，分别交 $AB$、$DC$ 于 $E$、$F$。求梯形 $ABCD$ 的面积和 $EF$ 的长。',
      figure: FIG282.e04,
      blanks: [
        { kind: 'num', label: '梯形面积', answer: '25' },
        { kind: 'num', label: '$EF=$', answer: '24/5' },
      ],
      explain: [
        '$\\triangle AOD$ 与 $\\triangle AOB$ 同高（从 $A$ 到 $BD$），面积比等于底的比：$\\frac{OD}{OB}=\\frac46=\\frac23$。',
        '$AD\\parallel BC$，$\\triangle AOD\\backsim\\triangle COB$，相似比 $\\frac{OD}{OB}=\\frac23$，所以 $BC=6$，$S_{\\triangle BOC}=4\\times\\frac94=9$。',
        '$S_{\\triangle ABD}=S_{\\triangle ACD}$（同底等高），两边都减去 $S_{\\triangle AOD}$ 得 $S_{\\triangle COD}=S_{\\triangle AOB}=6$。梯形面积 $=4+6+6+9=25$。',
        '$EF$ 要分成 $EO$、$OF$：$EO\\parallel BC$，$\\triangle AEO\\backsim\\triangle ABC$，$\\frac{EO}{BC}=\\frac{AO}{AC}=\\frac25$，$EO=\\frac{12}5$；同理 $\\triangle DOF\\backsim\\triangle DBC$，$OF=6\\times\\frac{DO}{DB}=6\\times\\frac25=\\frac{12}5$。$EF=\\frac{24}5$。',
        '坑：把 $EF$ 当成两底的平均数 $5$（那是中位线，$O$ 不在中位线上）。',
      ],
      verify: () => {
        const r = F(4).div(6), BC = F(4).div(r), sBOC = F(4).div(r.mul(r)), total = F(4).add(6).add(6).add(sBOC);
        const AOAC = r.div(r.add(1));
        return [total, BC.mul(AOAC).mul(2)];
      },
    },
    {
      id: '28.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，$AB=6$，$AC=4$，$AD$ 平分 $\\angle BAC$ 交 $BC$ 于点 $D$，过点 $D$ 作 $DE\\parallel AC$ 交 $AB$ 于点 $E$。求 $DE$ 的长和 $S_{\\triangle BED}\\colon S_{\\triangle ABC}$ 的值。',
      figure: FIG282.e05,
      blanks: [
        { kind: 'num', label: '$DE=$', answer: '12/5' },
        { kind: 'num', label: '$S_{\\triangle BED}\\colon S_{\\triangle ABC}=$（填分数）', answer: '9/25' },
      ],
      explain: [
        '$DE\\parallel AC$，$\\angle EDA=\\angle DAC$；又 $\\angle EAD=\\angle DAC$（平分），所以 $\\angle EDA=\\angle EAD$，$AE=DE$。',
        '设 $DE=x$，则 $AE=x$，$BE=6-x$。$DE\\parallel AC$，$\\triangle BED\\backsim\\triangle BAC$，$\\frac{DE}{AC}=\\frac{BE}{BA}$，$\\frac x4=\\frac{6-x}6$，$6x=24-4x$，$x=\\frac{12}5$。',
        '相似比 $\\frac{DE}{AC}=\\frac{12/5}{4}=\\frac35$，面积比 $\\left(\\frac35\\right)^2=\\frac9{25}$。',
        '坑：面积比写成 $\\frac35$；或者以为 $D$ 是 $BC$ 的中点。',
      ],
      verify: () => { const x = F(24).div(10), k = x.div(4); return [x, k.mul(k)]; },
    },
    {
      id: '28.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，平行四边形 $ABCD$ 中，$AB=6$，$AD=4$。点 $E$ 在边 $CD$ 上（不与 $C$、$D$ 重合），射线 $AE$ 交 $BC$ 的延长线于点 $F$。设 $DE=x$，$CF=y$。(1) 求 $y$ 关于 $x$ 的函数解析式，并写出定义域；(2) 当 $\\triangle ABF$ 的面积是平行四边形 $ABCD$ 面积的 $\\frac54$ 时，求 $x$。',
      figure: FIG282.e06,
      blanks: [
        { kind: 'expr', label: '(1) $y=$', answer: '4*(6-x)/x' },
        { kind: 'ineq', label: '定义域', answer: '0<x<6' },
        { kind: 'num', label: '(2) $x=$', answer: '12/5' },
      ],
      explain: [
        '$AD\\parallel BF$，所以 $\\triangle ECF\\backsim\\triangle EDA$（8 字型），$\\frac{CF}{DA}=\\frac{CE}{DE}$，$\\frac y4=\\frac{6-x}x$，$y=\\frac{4(6-x)}x$。',
        '$E$ 在边 $CD$ 上且不与端点重合，$0<x<6$。坑：写成 $0\\le x\\le6$（$x=0$ 时没有意义，$x=6$ 时 $F$ 与 $C$ 重合）。',
        '(2) $\\triangle ABF$ 的底 $BF=4+y$ 在直线 $BC$ 上，高等于平行四边形以 $BC$ 为底的高 $h$：$S_{\\triangle ABF}=\\frac12(4+y)h$，$S_{ABCD}=4h$。',
        '$\\frac{(4+y)h}{2\\cdot4h}=\\frac54$，$4+y=10$，$y=6$；$\\frac{4(6-x)}x=6$，$24-4x=6x$，$x=\\frac{12}5$，在定义域内。',
      ],
      verify: () => {
        // 用坐标求 F，核对 CF=4(6−x)/x；再由面积条件求 x
        const AB = 6, AD = 4, A = [0, 0], B = [AB, 0], D = [2, 2 * Math.sqrt(3)], C = [D[0] + AB, D[1]];
        [0.5, 2, 3.7, 5.5].forEach(x => {
          const E = SVG282.at(D, C, x / AB), Fp = SVG282.meet(A, E, B, C);
          if (Math.abs(SVG282.dist(C, Fp) - (AD * (AB - x)) / x) > 1e-9) throw new Error('CF 不对');
        });
        const y = F(5).div(4).mul(2 * AD).sub(AD);
        const x = F(AD * AB).div(y.add(AD));
        return [`${AD}*(${AB}-x)/x`, `0<x<${AB}`, x];
      },
    },
    // ---------- 挑战 ----------
    {
      id: '28.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，抛物线 $y=-2x^2+6x+8$ 与 $x$ 轴交于 $A$、$B$ 两点（$A$ 在 $B$ 的左侧），与 $y$ 轴交于点 $C$。点 $P$ 在抛物线上，且 $\\angle PBA=\\angle ACB$。(1) 求点 $P$ 的坐标；(2) 取 (1) 中在 $x$ 轴上方的点 $P$，点 $Q$ 在 $x$ 轴上，以 $B$、$P$、$Q$ 为顶点的三角形与 $\\triangle ABC$ 相似，求点 $Q$ 的坐标。',
      figure: FIG282.c01,
      blanks: [
        { kind: 'num', label: '(1) 在 $x$ 轴上方的点 $P$：横坐标', answer: '-2/3' },
        { kind: 'num', label: '纵坐标', answer: '28/9' },
        { kind: 'num', label: '在 $x$ 轴下方的点 $P$：横坐标', answer: '-4/3' },
        { kind: 'num', label: '纵坐标', answer: '-32/9' },
        { kind: 'nums', label: '(2) 点 $Q$ 的横坐标（全部填出，用逗号隔开）', answer: ['-19/18', '-20/9'] },
      ],
      explain: [
        '思路：要让 $\\angle PBA$ 等于 $\\angle ACB$，又还没学三角比，只能把 $\\angle ACB$ 放进一个直角三角形，读出两条直角边的比，再用“直角三角形一个锐角相等就相似”把这个比搬到点 $B$ 处。',
        '求点：令 $y=0$，$-2(x+1)(x-4)=0$，$A(-1,0)$、$B(4,0)$；$C(0,8)$。$AB=5$，$AC=\\sqrt{65}$，$BC=\\sqrt{80}=4\\sqrt5$。三边的平方 $25$、$65$、$80$ 中没有一个等于另两个之和，$\\triangle ABC$ 不是直角三角形，$\\angle ACB$ 不在现成的直角三角形里。',
        '作 $AH\\perp BC$ 于 $H$。$S_{\\triangle ABC}=\\frac12\\times5\\times8=20$，所以 $AH=\\frac{2\\times20}{4\\sqrt5}=2\\sqrt5$；$CH=\\sqrt{65-20}=3\\sqrt5$，$BH=\\sqrt{25-20}=\\sqrt5$。$CH+BH=4\\sqrt5=BC$，垂足 $H$ 在边 $BC$ 上，$\\angle ACB$ 是锐角，且 $Rt\\triangle AHC$ 中 $AH\\colon CH=2\\colon3$。',
        '作 $PQ\\perp x$ 轴于 $Q$。由 $\\angle PBQ=\\angle ACH$ 及直角，$Rt\\triangle PQB\\backsim Rt\\triangle AHC$，所以 $PQ\\colon QB=AH\\colon CH=2\\colon3$。因为 $\\angle PBA$ 是锐角，$P$ 不能在 $B$ 的右侧（那时 $\\angle PBA$ 是 $BP$ 与向左的射线 $BA$ 的夹角，是钝角或平角），所以 $P$ 在 $B$ 左侧，$QB=4-x$。',
        '$P$ 在 $x$ 轴上方：$y=\\frac23(4-x)$，代入抛物线 $-2(x+1)(x-4)=\\frac23(4-x)$。$x=4$ 时 $P$ 与 $B$ 重合，舍去；$x\\ne4$ 时两边除以 $4-x$：$2(x+1)=\\frac23$，$x=-\\frac23$，$y=\\frac23\\times\\frac{14}3=\\frac{28}9$。',
        '$P$ 在 $x$ 轴下方：$y=-\\frac23(4-x)$，同样约去 $4-x$：$2(x+1)=-\\frac23$，$x=-\\frac43$，$y=-\\frac23\\times\\frac{16}3=-\\frac{32}9$。',
        '所以 $P\\left(-\\frac23,\\frac{28}9\\right)$ 或 $P\\left(-\\frac43,-\\frac{32}9\\right)$。坑：只求 $x$ 轴上方一个；或者把联立得到的 $x=4$ 也写进去。',
        '(2) 先定对应顶点。$\\triangle ABC$ 三边 $5$、$\\sqrt{65}$、$4\\sqrt5$ 各不相等，三个角各不相等，又都是锐角（最长边 $4\\sqrt5$：$80<25+65$）。$Q$ 在 $B$ 右侧时 $\\angle PBQ=180^\\circ-\\angle PBA$ 是钝角，不可能；所以 $Q$ 在 $B$ 左侧，$\\angle PBQ=\\angle PBA=\\angle ACB$，顶点 $B$ 只能对应顶点 $C$。',
        '两边成比例且夹角相等：$B$ 的两边 $BP$、$BQ$ 对应 $C$ 的两边 $CA$、$CB$，有两种对法。$BP=\\sqrt{\\left(\\frac{14}3\\right)^2+\\left(\\frac{28}9\\right)^2}=\\frac{14\\sqrt{13}}9$，$CA=\\sqrt{65}$，$CB=4\\sqrt5$。',
        '① $\\frac{BQ}{BP}=\\frac{CA}{CB}$：$BQ=\\frac{14\\sqrt{13}}9\\times\\frac{\\sqrt{65}}{4\\sqrt5}=\\frac{91}{18}$，$Q$ 的横坐标 $4-\\frac{91}{18}=-\\frac{19}{18}$；② $\\frac{BQ}{BP}=\\frac{CB}{CA}$：$BQ=\\frac{14\\sqrt{13}}9\\times\\frac{4\\sqrt5}{\\sqrt{65}}=\\frac{56}9$，横坐标 $4-\\frac{56}9=-\\frac{20}9$。',
        '所以 $Q\\left(-\\frac{19}{18},0\\right)$ 或 $Q\\left(-\\frac{20}9,0\\right)$。坑：只按“$BP$ 对 $CB$”一种顺序；或者看 $Q$ 离 $A$ 很近，误以为 $Q$ 就是 $A$。',
      ],
      verify: () => {
        const f = x => F(-2).mul(x).mul(x).add(F(6).mul(x)).add(8);
        // ∠ACB 的“对边比邻边”：用向量叉积与点积，r = |CA×CB| / (CA·CB)
        const CA = [-1, -8], CB = [4, -8];
        const r = F(Math.abs(CA[0] * CB[1] - CA[1] * CB[0])).div(CA[0] * CB[0] + CA[1] * CB[1]);
        const out = [];
        for (const s of [1, -1]) {
          // y = s·r·(4−x) 与 y=-2(x+1)(x-4) 联立，约去 x−4：2(x+1) = s·r
          const x = F(s).mul(r).div(2).sub(1);
          const y = F(s).mul(r).mul(F(4).sub(x));
          if (!f(x).eq(y)) throw new Error('不在抛物线上');
          out.push(x, y);
        }
        // (2)：P 取上方的点，Q 在 B 左侧且 ∠PBQ=∠ACB，B 对 C；BQ² = BP²·CA²/CB² 或 BP²·CB²/CA²
        const [px, py] = out;
        const bp2 = F(4).sub(px).mul(F(4).sub(px)).add(py.mul(py)), ca2 = F(65), cb2 = F(80);
        const sqrtF = q => {
          const a = Math.round(Math.sqrt(Number(q.n))), b = Math.round(Math.sqrt(Number(q.d)));
          if (BigInt(a * a) !== q.n || BigInt(b * b) !== q.d) throw new Error('开不尽');
          return F(a).div(b);
        };
        const qs = [bp2.mul(ca2).div(cb2), bp2.mul(cb2).div(ca2)].map(q => F(4).sub(sqrtF(q)));
        // 数值核对：三边比例一致（与 △ABC 三边排序后比较）
        qs.forEach(qx => {
          const q = Number(qx.n) / Number(qx.d), P = [Number(px.n) / Number(px.d), Number(py.n) / Number(py.d)];
          const t = [Math.hypot(P[0] - 4, P[1]), 4 - q, Math.hypot(P[0] - q, P[1])].sort((u, v) => u - v);
          const o = [5, Math.sqrt(65), Math.sqrt(80)];
          if (Math.abs(t[0] / o[0] - t[1] / o[1]) > 1e-9 || Math.abs(t[1] / o[1] - t[2] / o[2]) > 1e-9) throw new Error('不相似');
        });
        return [...out, qs];
      },
    },
    {
      id: '28.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图（示意图），$Rt\\triangle ABC$ 中，$\\angle BAC=90^\\circ$，$AB=2$，$AC=4$。点 $D$ 在直线 $BC$ 上（不与 $B$、$C$ 重合），把线段 $AD$ 绕点 $A$ 按从 $AB$ 转到 $AC$ 的方向旋转 $90^\\circ$，再沿射线方向伸长为原来的 $2$ 倍，得到线段 $AE$。(1) 求 $\\angle BCE$ 的度数和 $\\frac{CE}{BD}$ 的值；(2) 若以 $C$、$D$、$E$ 为顶点的三角形与 $\\triangle ABC$ 相似，求 $BD$ 的长。',
      figure: FIG282.c02,
      blanks: [
        { kind: 'num', label: '(1) $\\angle BCE=$（度）', answer: '90' },
        { kind: 'num', label: '$\\frac{CE}{BD}=$', answer: '2' },
        { kind: 'reals', label: '(2) $BD=$（全部填出，用逗号隔开，结果化成最简形式）', answer: ['√5', '2√5/5', '2√5/3'], simplest: true },
      ],
      explain: [
        '思路：$AE$ 由 $AD$ 转 $90^\\circ$、伸长 $2$ 倍得到，而 $AC$ 恰好也是由 $AB$ 这样得到的（$AC=2AB$，$\\angle BAC=90^\\circ$）。两组线段“同步转动”，就去找 $\\triangle ABD$ 与 $\\triangle ACE$。',
        '(1) 先证 $\\angle BAD=\\angle CAE$，按 $D$ 的三个位置分别看。$D$ 在线段 $BC$ 上：$\\angle BAD=90^\\circ-\\angle DAC=\\angle DAE-\\angle DAC=\\angle CAE$。$D$ 在 $CB$ 的延长线上（$B$ 外侧）：$\\angle DAC=\\angle BAD+90^\\circ$，又 $AE$ 在 $AD$、$AC$ 之间，$\\angle DAC=\\angle DAE+\\angle CAE=90^\\circ+\\angle CAE$，所以 $\\angle BAD=\\angle CAE$。$D$ 在 $BC$ 的延长线上（$C$ 外侧）：$\\angle BAD=\\angle BAC+\\angle CAD=90^\\circ+\\angle CAD=\\angle DAE+\\angle CAD=\\angle CAE$。',
        '三个位置都有 $\\frac{AB}{AC}=\\frac{AD}{AE}=\\frac12$，$\\angle BAD=\\angle CAE$，由两边对应成比例且夹角相等，$\\triangle ABD\\backsim\\triangle ACE$，所以 $CE=2BD$，$\\angle ACE=\\angle ABD$。',
        '$D$ 在线段 $BC$ 上：$\\angle ABD=\\angle ABC$，$E$ 与 $B$ 在 $AC$ 两侧，$\\angle BCE=\\angle ACB+\\angle ACE=\\angle ACB+\\angle ABC=90^\\circ$。',
        '$D$ 在 $CB$ 的延长线上（$B$ 外侧）：$\\angle ABD=180^\\circ-\\angle ABC$，所以 $\\angle ACE=180^\\circ-\\angle ABC$，这时 $E$ 与 $B$ 在 $AC$ 同侧，$\\angle BCE=\\angle ACE-\\angle ACB=180^\\circ-\\angle ABC-\\angle ACB=90^\\circ$。',
        '$D$ 在 $BC$ 的延长线上（$C$ 外侧）：$\\angle ABD=\\angle ABC$，$\\angle ACE=\\angle ABC$，$E$ 与 $B$ 在 $AC$ 两侧，$\\angle BCE=\\angle ACB+\\angle ACE=90^\\circ$。三个位置都有 $\\angle BCE=90^\\circ$，$\\frac{CE}{BD}=2$。',
        '(2) $BC=\\sqrt{4+16}=2\\sqrt5$。$\\triangle CDE$ 在 $C$ 处是直角，$\\triangle ABC$ 的两条直角边之比是 $1\\colon2$，所以要求 $CE=2CD$ 或 $CD=2CE$。设 $BD=d$，$CE=2d$。',
        '$D$ 在线段 $BC$ 上，$CD=2\\sqrt5-d$：$2d=2(2\\sqrt5-d)$ 得 $d=\\sqrt5$；$2\\sqrt5-d=4d$ 得 $d=\\frac{2\\sqrt5}5$。两个都在 $0<d<2\\sqrt5$ 内。',
        '$D$ 在 $B$ 外侧，$CD=2\\sqrt5+d$：$2d=2(2\\sqrt5+d)$ 无解；$2\\sqrt5+d=4d$ 得 $d=\\frac{2\\sqrt5}3$。',
        '$D$ 在 $C$ 外侧，$CD=d-2\\sqrt5$：$2d=2(d-2\\sqrt5)$ 无解；$d-2\\sqrt5=4d$ 得 $d<0$，舍去。',
        '所以 $BD=\\sqrt5$、$\\frac{2\\sqrt5}5$ 或 $\\frac{2\\sqrt5}3$。坑：只在线段 $BC$ 上找，漏掉 $B$ 外侧的一个。',
      ],
      verify: () => {
        // 坐标：A(0,0)、B(2,0)、C(0,4)，D=B+s(C−B)，E=2·(AD 逆时针转 90°)
        const B = [2, 0], C = [0, 4], len = Math.hypot(2, 4);
        const sim = s => {
          const D = [2 - 2 * s, 4 * s], E = [-2 * D[1], 2 * D[0]];
          const CD = Math.hypot(D[0] - C[0], D[1] - C[1]), CE = Math.hypot(E[0] - C[0], E[1] - C[1]);
          return { D, E, CD, CE };
        };
        // (1) 用三个位置各取一点检验
        let ang = null, ratio = null;
        for (const s of [0.3, -0.7, 1.6]) {
          const { D, E, CE } = sim(s);
          const dot = (B[0] - C[0]) * (E[0] - C[0]) + (B[1] - C[1]) * (E[1] - C[1]);
          if (Math.abs(dot) > 1e-9) throw new Error('不垂直');
          ang = 90; ratio = CE / Math.hypot(D[0] - B[0], D[1] - B[1]);
        }
        // (2) 扫描 s，找 CE∶CD = 2 或 1/2 的位置（方程是一次的，用二分）
        const sols = [];
        for (const target of [2, 0.5]) {
          const g = s => { const { CD, CE } = sim(s); return CE - target * CD; };
          for (let a = -20; a < 20; a += 0.01) {
            const b = a + 0.01;
            if (g(a) === 0 || g(a) * g(b) < 0) {
              let lo = a, hi = b;
              for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (g(lo) * g(mid) <= 0) hi = mid; else lo = mid; }
              const s = (lo + hi) / 2;
              if (Math.abs(s) > 1e-6 && Math.abs(s - 1) > 1e-6) sols.push(Math.abs(s) * len);
            }
          }
        }
        return [ang, Math.round(ratio * 1e9) / 1e9, sols.filter((v, i) => sols.findIndex(w => Math.abs(w - v) < 1e-7) === i)];
      },
    },
    {
      id: '28.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图（示意图），直角梯形 $ABCD$ 中，$AB\\perp BC$，$DC\\perp BC$，$A$、$D$ 在直线 $BC$ 的同侧，$CD=4$，$BC=10$，$AB=a$（$a>0$ 且 $a\\ne4$）。点 $P$ 在直线 $BC$ 上（不与 $B$、$C$ 重合），并且以 $A$、$B$、$P$ 为顶点的三角形与以 $P$、$C$、$D$ 为顶点的三角形相似。(1) 当 $a=3$ 时，这样的点 $P$ 有几个？(2) 若这样的点 $P$ 恰好有 $5$ 个，求 $a$ 的值。',
      figure: FIG282.c03,
      blanks: [
        { kind: 'num', label: '(1) 点 $P$ 有（个）', answer: '6' },
        { kind: 'nums', label: '(2) $a=$（全部填出，用逗号隔开）', answer: ['6', '25/4'] },
      ],
      explain: [
        '思路：$P$ 在直线 $BC$ 上，不管在线段内还是延长线上，$\\angle ABP$ 和 $\\angle DCP$ 都是直角（$AB$、$DC$ 都垂直于直线 $BC$），而每个三角形只有一个直角，所以直角必须对应，只剩“哪条直角边对哪条”两种对应。再把直线 $BC$ 分成线段内、$B$ 外侧、$C$ 外侧三段来数。',
        '设 $BP=m$，$PC=n$（都是正数）。对应①（$AB$ 对 $PC$，$BP$ 对 $CD$）：$\\frac{AB}{PC}=\\frac{BP}{CD}$，$m\\cdot n=4a$；对应②（$AB$ 对 $CD$，$BP$ 对 $CP$）：$\\frac{AB}{DC}=\\frac{BP}{CP}$，$4m=a\\cdot n$。',
        '对应①：$P$ 在线段内，$m+n=10$，$m(10-m)=4a$，即 $m^2-10m+4a=0$，$\\Delta=100-16a$：$a<\\frac{25}4$ 时两个根（都在 $0$ 与 $10$ 之间），$a=\\frac{25}4$ 时一个根 $m=5$，$a>\\frac{25}4$ 时没有。$P$ 在 $C$ 外侧，$m-n=10$，$n(n+10)=4a$ 恰有一个正根；$P$ 在 $B$ 外侧同理恰有一个。',
        '对应②：线段内 $4m=a(10-m)$，$m=\\frac{10a}{a+4}$，总有一个；线段外 $|m-n|=10$，$4m=an$：$a>4$ 时 $m=\\frac{10a}{a-4}$ 在 $C$ 外侧，$a<4$ 时 $n=\\frac{40}{4-a}$ 在 $B$ 外侧，各一个（$a=4$ 是矩形，已排除）。',
        '两种对应可能得到同一点，要去重：线段内把 $m=\\frac{10a}{a+4}$ 代入 $m(10-m)=4a$，得 $(a+4)^2=100$，$a=6$（此时 $m=6$，两种对应都是 $BP=6$）；线段外把 $m=\\frac{10a}{a-4}$ 代入 $m(m-10)=4a$，得 $(a-4)^2=100$，$a=14$（$BP=14$）。',
        '计数：$a<\\frac{25}4$ 且 $a\\ne4$、$a\\ne6$ 时 $2+2+1+1=6$ 个；$a=6$ 时线段内重合一个，$5$ 个；$a=\\frac{25}4$ 时对应①线段内只有 $1$ 个，$5$ 个；$a>\\frac{25}4$ 时 $0+2+1+1=4$ 个，其中 $a=14$ 时线段外重合一个，$3$ 个。',
        '(1) $a=3$：$6$ 个（$BP=5\\pm\\sqrt{13}$，$C$ 外侧 $BP=5+\\sqrt{37}$，$B$ 外侧 $BP=\\sqrt{37}-5$，线段内 $BP=\\frac{30}7$，$B$ 外侧 $BP=30$）。(2) $a=6$ 或 $\\frac{25}4$。坑：忘了两种对应会重合；或只在线段 $BC$ 上找。',
      ],
      verify: () => {
        // 枚举：P(x,0)，B(0,0)、C(10,0)、A(0,a)、D(10,4)；两三角形三边排序后成比例即相似
        const count = a => {
          const cand = [];
          // 两种对应各自在三个区间内的解（解析式求出后再用三边比例逐个复核）
          const disc = 100 - 16 * a;
          if (disc >= 0) { const r = Math.sqrt(disc); cand.push((10 + r) / 2, (10 - r) / 2); }
          cand.push(5 + Math.sqrt(25 + 4 * a), 5 - Math.sqrt(25 + 4 * a), (10 * a) / (a + 4));
          if (a !== 4) cand.push((10 * a) / (a - 4));
          const sim = x => {
            const s = [a, Math.abs(x), Math.hypot(a, x)].sort((p, q) => p - q), t = [Math.abs(10 - x), 4, Math.hypot(10 - x, 4)].sort((p, q) => p - q);
            return Math.abs(s[0] / t[0] - s[2] / t[2]) < 1e-9 && Math.abs(s[1] / t[1] - s[2] / t[2]) < 1e-9;
          };
          const ok = cand.filter(x => Math.abs(x) > 1e-9 && Math.abs(x - 10) > 1e-9 && sim(x));
          return ok.filter((v, i) => ok.findIndex(w => Math.abs(w - v) < 1e-7) === i).length;
        };
        const five = [];
        for (let k = 1; k <= 400; k++) { const a = k / 16; if (a !== 4 && count(a) === 5) five.push(F(k).div(16)); }
        return [count(3), five];
      },
    },
    {
      id: '28.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图（示意图），$\\triangle ABC$ 中，$BC=12$，$BC$ 边上的高 $AH=8$，垂足 $H$ 在边 $BC$ 上，$BH=4$。点 $D$、$E$ 分别在边 $AB$、$AC$ 上，$DE\\parallel BC$，把 $\\triangle ADE$ 沿 $DE$ 翻折得到 $\\triangle A\'DE$。设 $DE=x$，$\\triangle A\'DE$ 与四边形 $DBCE$ 重叠部分的面积为 $y$。(1) 求 $y$ 关于 $x$ 的函数解析式，并写出定义域；(2) 当重叠部分的面积为 $15$ 时，求 $DE$；(3) 当 $\\angle BA\'C=90^\\circ$ 时，求重叠部分的面积。',
      figure: FIG282.c04,
      blanks: [
        { kind: 'num', label: '(1) 解析式分两段，两段的分界点 $x=$', answer: '6' },
        { kind: 'expr', label: '$x$ 不超过分界点的一段：$y=$', answer: 'x^2/3' },
        { kind: 'expr', label: '$x$ 超过分界点的一段：$y=$', answer: '-x^2+16*x-48' },
        { kind: 'ineq', var: 'x', label: '整个函数的定义域', answer: '0<x<12' },
        { kind: 'nums', label: '(2) $DE=$（全部填出，用逗号隔开）', answer: ['7', '9'] },
        { kind: 'reals', label: '(3) 重叠部分的面积（全部填出，用逗号隔开，结果化成最简形式）', answer: ['18-12√2', '12√2-6'], simplest: true },
      ],
      explain: [
        '思路：翻折后 $A\'$ 在直线 $AH$ 上，$A\'$ 到 $DE$ 的距离等于 $A$ 到 $DE$ 的距离。$A\'$ 有没有越过 $BC$，决定了重叠部分是整个 $\\triangle A\'DE$ 还是被 $BC$ 截掉一角，所以先找分界点。',
        '$DE\\parallel BC$，$\\triangle ADE\\backsim\\triangle ABC$，相似比 $\\frac x{12}$；对应高之比也是 $\\frac x{12}$，$A$ 到 $DE$ 的距离是 $\\frac{2x}3$，$S_{\\triangle ADE}=48\\times\\left(\\frac x{12}\\right)^2=\\frac{x^2}3$。$A\'$ 到 $A$ 的距离是 $\\frac{4x}3$，$\\frac{4x}3\\le8$ 即 $x\\le6$ 时 $A\'$ 不越过 $BC$。',
        '(1) 分界点是 $x=6$。$0<x\\le6$：重叠部分就是 $\\triangle A\'DE$，$y=\\frac{x^2}3$。$6<x<12$：$A\'D$、$A\'E$ 交 $BC$ 于 $M$、$N$，$MN\\parallel DE$，$\\triangle A\'MN\\backsim\\triangle A\'DE$，对应高 $\\frac{4x}3-8$ 与 $\\frac{2x}3$ 之比是 $\\frac{2x-12}x$，$S_{\\triangle A\'MN}=\\frac{x^2}3\\cdot\\frac{(2x-12)^2}{x^2}=\\frac{(2x-12)^2}3$，$y=\\frac{x^2-(2x-12)^2}3=-x^2+16x-48$。',
        '(2) 第一段：$\\frac{x^2}3=15$，$x=3\\sqrt5>6$，不在这一段，舍去。第二段：$-x^2+16x-48=15$，$x^2-16x+63=0$，$x=7$ 或 $9$，都在 $6<x<12$ 内。坑：第一段的 $3\\sqrt5$ 没检验就写上。',
        '(3) $A\'$ 在直线 $AH$ 上，$\\angle BA\'C=90^\\circ$ 时，$\\angle HBA\'$ 与 $\\angle HCA\'$ 互余，$\\angle HBA\'=\\angle HA\'C$，所以 $Rt\\triangle A\'HB\\backsim Rt\\triangle CHA\'$，$A\'H^2=BH\\cdot HC=4\\times8=32$，$A\'H=4\\sqrt2$。',
        '$A\'$ 在 $BC$ 上方：$A\'H=8-\\frac{4x}3=4\\sqrt2$，$x=6-3\\sqrt2$（约 $1.76$，在 $0<x\\le6$ 内），$y=\\frac{x^2}3=\\frac{54-36\\sqrt2}3=18-12\\sqrt2$。',
        '$A\'$ 在 $BC$ 下方：$A\'H=\\frac{4x}3-8=4\\sqrt2$，$x=6+3\\sqrt2$（约 $10.24$，在 $6<x<12$ 内），$y=-(54+36\\sqrt2)+16(6+3\\sqrt2)-48=12\\sqrt2-6$。',
        '所以重叠部分的面积是 $18-12\\sqrt2$ 或 $12\\sqrt2-6$。坑：只想到 $A\'$ 在三角形内部的一种；或两种都用同一个解析式算。',
      ],
      verify: () => {
        // 用坐标和多边形裁剪直接算重叠面积：B(0,0)、C(12,0)、A(4,8)
        const A = [4, 8], B = [0, 0], C = [12, 0];
        const area = pts => Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % pts.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
        const clip = (poly, a, b) => {  // 保留直线 ab 左侧
          const side = p => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
          const out = [];
          poly.forEach((p, i) => {
            const q = poly[(i + 1) % poly.length], sp = side(p), sq = side(q);
            if (sp >= 0) out.push(p);
            if (sp * sq < 0) { const t = sp / (sp - sq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
          });
          return out;
        };
        const overlap = x => {
          const t = x / 12, D = SVG282.at(A, B, t), E = SVG282.at(A, C, t), A1 = [4, 8 - (4 * x) / 3];
          // △A′DE 与四边形 DBCE（凸，按逆时针 D→B→C→E）逐边裁剪
          const quad = [D, B, C, E];
          let cur = [A1, D, E];
          quad.forEach((p, i) => { cur = clip(cur, p, quad[(i + 1) % 4]); });
          return area(cur);
        };
        // (1) 两段解析式抽点核对
        [1.5, 3, 5, 6].forEach(x => { if (Math.abs(overlap(x) - (x * x) / 3) > 1e-9) throw new Error('第一段不对'); });
        [6.5, 8, 10, 11.5].forEach(x => { if (Math.abs(overlap(x) - (-x * x + 16 * x - 48)) > 1e-9) throw new Error('第二段不对'); });
        // (2) 扫描 x，找重叠面积为 15 的位置
        const two = [];
        for (let k = 1; k < 1200; k++) { const x = k / 100; if (Math.abs(overlap(x) - 15) < 1e-9) two.push(F(k).div(100)); }
        // (3) 扫描 A′ 使 ∠BA′C=90°
        const three = [];
        const g = x => { const A1 = [4, 8 - (4 * x) / 3]; return (B[0] - A1[0]) * (C[0] - A1[0]) + (B[1] - A1[1]) * (C[1] - A1[1]); };
        for (let a = 0.001; a < 11.99; a += 0.01) {
          const b = a + 0.01;
          if (g(a) * g(b) < 0) {
            let lo = a, hi = b;
            for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (g(lo) * g(mid) <= 0) hi = mid; else lo = mid; }
            three.push(overlap((lo + hi) / 2));
          }
        }
        // 分界点：A′ 恰好落在 BC 上，AA′=2×(A 到 DE 的距离)=2×8×x/12=8
        const cut = F(8).mul(12).div(F(2).mul(8));
        if (Math.abs(overlap(Number(cut.n) / Number(cut.d)) - Number(cut.n * cut.n) / Number(cut.d * cut.d) / 3) > 1e-9) throw new Error('分界点不对');
        return [cut, 'x^2/3', '-x^2+16*x-48', '0<x<12', two, three];
      },
    },
    {
      id: '28.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '$\\triangle ABC$ 中，$AB=13$，$AC=20$，$BC$ 边上的高 $AD=12$；$\\triangle A_1B_1C_1$ 中，$A_1B_1=26$，$A_1C_1=40$，$B_1C_1$ 边上的高 $A_1D_1=24$（垂足 $D$、$D_1$ 分别在直线 $BC$、$B_1C_1$ 上）。(1) $\\triangle ABC$ 与 $\\triangle A_1B_1C_1$ 一定相似吗？(2) 若 $BC=21$，点 $P$ 在直线 $BC$ 上，且 $P$ 不与点 $C$ 重合，$\\triangle ABP$ 与 $\\triangle A_1B_1C_1$ 相似（顶点的对应关系不确定），求 $BP$ 的所有可能值。',
      blanks: [
        { kind: 'text', label: '(1)', answer: '不一定', options: ['一定', '不一定'] },
        { kind: 'nums', label: '(2) $BP=$（全部填出，用逗号隔开）', answer: ['169/21', '11', '169/11'] },
      ],
      explain: [
        '思路：已知的是两边和第三边上的高，高把三角形分成两个直角三角形，用“斜边和一条直角边对应成比例”可以判定这两对直角三角形相似；但垂足可能在边上，也可能在边的延长线上，三角形的形状不唯一，这就是要分类的地方。',
        '(1) $\\frac{AB}{A_1B_1}=\\frac{AD}{A_1D_1}=\\frac12$，所以 $Rt\\triangle ABD\\backsim Rt\\triangle A_1B_1D_1$，$\\angle ABD=\\angle A_1B_1D_1$；同理 $Rt\\triangle ACD\\backsim Rt\\triangle A_1C_1D_1$。由勾股，$BD=5$，$CD=16$，$B_1D_1=10$，$C_1D_1=32$。',
        '$D$ 在 $B$、$C$ 之间时 $BC=21$；$B$ 在 $D$、$C$ 之间时 $BC=16-5=11$（$CD>BD$，$C$ 不会在 $B$、$D$ 之间）。同样 $B_1C_1=42$ 或 $22$。垂足位置相同时两三角形三边对应成比例，相似；位置不同时，比如 $BC=21$、$B_1C_1=22$，$\\angle ABC$ 是锐角，$\\angle A_1B_1C_1=180^\\circ-\\angle A_1B_1D_1$ 是钝角，不相似。所以“不一定”。',
        '(2) $BC=21$ 时 $\\triangle ABC$ 的三个角都是锐角（$D$ 在边 $BC$ 内，$\\angle B$、$\\angle C$ 锐角；$13^2+20^2>21^2$，$\\angle BAC$ 也是锐角）。分 $\\triangle A_1B_1C_1$ 的两种形状讨论。',
        '形状一 $B_1C_1=42$：它与 $\\triangle ABC$ 三边对应成比例，$\\angle B_1=\\angle ABC$，$\\angle C_1=\\angle ACB$，$\\angle A_1=\\angle BAC$，都是锐角。$P$ 在 $B$ 外侧时 $\\angle ABP=180^\\circ-\\angle ABC$ 是钝角，不可能；$P$ 在射线 $BC$ 上时 $\\angle ABP=\\angle ABC$，而 $\\angle ACB$、$\\angle BAC$ 的对边 $13$、$21$ 都不等于 $\\angle ABC$ 的对边 $20$，这两个角都不等于 $\\angle ABC$，所以 $\\angle B$ 只能对 $\\angle B_1$。',
        '$\\frac{BA}{B_1A_1}=\\frac{BP}{B_1C_1}$：$BP=42\\times\\frac12=21$，$P$ 与 $C$ 重合，题目已排除；$\\frac{BA}{B_1C_1}=\\frac{BP}{B_1A_1}$：$BP=\\frac{13\\times26}{42}=\\frac{169}{21}$，$P$ 在边 $BC$ 上。',
        '形状二 $B_1C_1=22$：$B_1$ 在 $D_1$、$C_1$ 之间，$\\angle A_1B_1C_1=180^\\circ-\\angle A_1B_1D_1=180^\\circ-\\angle ABC$ 是钝角；$\\angle C_1=\\angle A_1C_1D_1=\\angle ACB$；$\\angle B_1A_1C_1=\\angle A_1B_1D_1-\\angle C_1$（$\\angle A_1B_1D_1$ 是 $\\triangle A_1B_1C_1$ 的外角）$=\\angle ABC-\\angle ACB$。',
        '$P$ 在射线 $BC$ 上时 $\\triangle ABP$ 有锐角 $\\angle ABC$，但形状二的三个角 $180^\\circ-\\angle ABC$、$\\angle ACB$、$\\angle ABC-\\angle ACB$ 都不等于 $\\angle ABC$（$\\angle ACB\\ne\\angle ABC$，因为对边 $13\\ne20$），无解。$P$ 在 $B$ 外侧时 $\\angle ABP=180^\\circ-\\angle ABC=\\angle A_1B_1C_1$：$\\frac{BA}{B_1A_1}=\\frac{BP}{B_1C_1}$ 得 $BP=11$；$\\frac{BA}{B_1C_1}=\\frac{BP}{B_1A_1}$ 得 $BP=\\frac{13\\times26}{22}=\\frac{169}{11}$。',
        '所以 $BP=\\frac{169}{21}$、$11$ 或 $\\frac{169}{11}$（后两个 $P$ 在 $CB$ 的延长线上）。坑：只用题目里“看起来像”的那一种形状；或者把 $BP=21$ 也写进去。',
      ],
      verify: () => {
        // 精确枚举：B(0,0)、D(5,0)、A(5,12)，P(p,0)；△ABP 三边与 △A1B1C1 的两种形状逐个比较 6 种对应
        const shapes = [[26, 40, 42], [26, 40, 22]];
        const out = [];
        const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
        for (const T of shapes) {
          for (const [i, j, k] of perms) {
            const r = F(13).div(T[i]), bp = r.mul(T[j]);
            for (const p of [bp, bp.neg()]) {
              if (p.eq(0) || p.eq(21)) continue;
              const ap2 = p.sub(5).mul(p.sub(5)).add(144);
              if (ap2.eq(r.mul(T[k]).mul(r.mul(T[k])))) out.push(p.abs());
            }
          }
        }
        // (1)：△ABC 的两种形状 BC=21、11 与 △A1B1C1 的两种形状比较，有不相似的组合就是“不一定”
        const prop = (s, t) => { s = [...s].sort((p, q) => p - q); t = [...t].sort((p, q) => p - q); return F(s[0]).div(t[0]).eq(F(s[1]).div(t[1])) && F(s[1]).div(t[1]).eq(F(s[2]).div(t[2])); };
        const all = [[13, 20, 5 + 16], [13, 20, 16 - 5]].every(s => shapes.every(t => prop(s, t)));
        return [all ? '一定' : '不一定', out.filter((v, i) => out.findIndex(w => w.eq(v)) === i)];
      },
    },
  ],
});
