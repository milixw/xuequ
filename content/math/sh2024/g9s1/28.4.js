'use strict';

// 上海数学九年级上册 · 28.4 位似多边形（课本第 72～77 页）
// 知识范围：用“在射线 OA、OB… 上取 OA₁=k·OA…”的方法放缩多边形，得到的图形与原图形位似（位似是特殊的相似）；
//   平面直角坐标系中以原点为位似中心：各顶点横、纵坐标都乘非零常数 k，k 叫位似比（可正可负），两个位似多边形相似，相似比为 |k|；
//   |k|>1 放大，0<|k|<1 缩小；k=1 重合，k=−1 关于原点中心对称；k<0 时对应点在原点两侧
// 可以使用：28.1～28.3（比例性质、平行线分线段成比例、相似三角形的判定与性质、相似多边形）；六～八年级全部；第 27 章二次函数
// 本节说明：课本没有讲“位似中心不是原点”时的坐标，也没有把“对应边平行或共线、对应点连线交于一点”列为性质，
//   用到时都在解析里由“两边成比例且夹角相等”或平行线分线段成比例现推，只出现在挑战题里
// 还没学：锐角三角比（第 29 章）、圆
// 本节约定：多个答案用 nums / reals；点的坐标拆成横、纵坐标两个空

const SVG284 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 14) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  poly: (pts, dash = false) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  shade: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#e9dcc3" stroke="none"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  curve: pts => `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  // 数学坐标（y 向上）到屏幕坐标的映射：给出数学范围和像素比例
  frame: (x0, x1, y0, y1, k, pad = 22) => {
    const w = Math.round((x1 - x0) * k + 2 * pad), h = Math.round((y1 - y0) * k + 2 * pad);
    return { w, h, m: ([x, y]) => [pad + (x - x0) * k, h - pad - (y - y0) * k] };
  },
  axes: (m, x0, x1, y0, y1) => {
    const ax = [m([x0, 0]), m([x1, 0])], ay = [m([0, y0]), m([0, y1])];
    const ah = p => `<polygon points="${p[0].toFixed(1)},${p[1].toFixed(1)} ${(p[0] - 8).toFixed(1)},${(p[1] - 4).toFixed(1)} ${(p[0] - 8).toFixed(1)},${(p[1] + 4).toFixed(1)}" fill="#2b2b2b"/>`;
    const av = p => `<polygon points="${p[0].toFixed(1)},${p[1].toFixed(1)} ${(p[0] - 4).toFixed(1)},${(p[1] + 8).toFixed(1)} ${(p[0] + 4).toFixed(1)},${(p[1] + 8).toFixed(1)}" fill="#2b2b2b"/>`;
    return SVG284.seg(ax[0], ax[1], false, 1.1) + ah(ax[1]) + SVG284.seg(ay[0], ay[1], false, 1.1) + av(ay[1])
      + SVG284.text('<tspan font-style="italic">x</tspan>', ax[1], -2, 12) + SVG284.text('<tspan font-style="italic">y</tspan>', ay[1], 12, 2)
      + SVG284.text('O', m([0, 0]), -10, 10);
  },
  // 名字里的撇号画成上标 ′
  lab: n => n.replace(/'/g, '′'),
};

// 以 P 为位似中心、位似比 k 的对应点（P、X 为分数坐标）：X′ = P + k(X − P)
const hom284 = (P, k, X) => [F(P[0]).add(F(k).mul(F(X[0]).sub(P[0]))), F(P[1]).add(F(k).mul(F(X[1]).sub(P[1])))];
const sq284 = x => x * x;

const FIG284 = (() => {
  const G = SVG284, out = {};
  // b05：位似中心 O 在两个三角形之间，位似比 −3
  {
    const P = { A: [-2, 0.3], B: [-1, -0.7], C: [-0.8, 0.8] };
    for (const n of ['A', 'B', 'C']) P[n + "'"] = [-3 * P[n][0], -3 * P[n][1]];
    P.O = [0, 0];
    const { w, h, m } = G.frame(-2.4, 6.4, -2.8, 2.6, 32);
    let s = G.poly(['A', 'B', 'C'].map(n => m(P[n]))) + G.poly(["A'", "B'", "C'"].map(n => m(P[n])));
    for (const n of ['A', 'B', 'C']) s += G.seg(m(P[n]), m(P[n + "'"]), true, 1.1);
    s += G.dot(m(P.O)) + G.text('O', m(P.O), 0, -14);
    const off = { A: [-10, 0], B: [-6, 10], C: [-4, -12], "A'": [12, 4], "B'": [6, -12], "C'": [4, 12] };
    for (const n in off) s += G.text(G.lab(n), m(P[n]), off[n][0], off[n][1]);
    out.b05 = G.wrap(w, h, s);
  }
  // b06：四幅图
  {
    const panel = (tri1, tri2, center, tag, dx) => {
      const k = 13, ox = dx + 12, oy = 150;
      const m = ([x, y]) => [ox + x * k, oy - y * k];
      let s = G.poly(tri1.map(m)) + G.poly(tri2.map(m));
      if (center) {
        s += G.dot(m(center));
        for (let i = 0; i < 3; i++) {
          const far = [tri1[i], tri2[i], center].reduce((a, p) => (Math.hypot(p[0] - center[0], p[1] - center[1]) > Math.hypot(a[0] - center[0], a[1] - center[1]) ? p : a), center);
          s += G.seg(m(center), m(far), true, 1);
        }
      } else {
        for (let i = 0; i < 3; i++) s += G.seg(m(tri1[i]), m(tri2[i]), true, 1);
      }
      s += G.text(tag, [ox + 60, 172], 0, 0, 15);
      return s;
    };
    const t = [[1, 1], [4, 1], [2, 3]];
    // ① 绕一点转过一个角度再放大 2 倍：相似但对应边不平行
    const rot = ([x, y]) => { const c = Math.cos(0.5), s = Math.sin(0.5); return [2 * (x * c - y * s) + 2.6, 2 * (x * s + y * c) - 1.4]; };
    const p1 = panel(t, t.map(rot), null, '①', 0);
    // ② 以 O(0,0) 为中心放大 2 倍：位似
    const p2 = panel(t, t.map(([x, y]) => [2 * x, 2 * y]), [0, 0], '②', 125);
    // ③ 连线交于 O，但比不相等：OA′=2OA，OB′=2OB，OC′=3OC
    const p3 = panel(t, [[2, 2], [8, 2], [6, 9]], [0, 0], '③', 250);
    // ④ 平移：大小相同，连线互相平行
    const p4 = panel(t, t.map(([x, y]) => [x + 3, y + 4]), null, '④', 375);
    out.b06 = G.wrap(500, 182, p1 + p2 + p3 + p4);
  }
  // e04：梯形 ABCD，AD∥BC，AD=2，BC=6
  {
    const P = { B: [0, 0], C: [6, 0], A: [2, 3], D: [4, 3], E: [3, 4.5], O: [3, 2.25] };
    const { w, h, m } = G.frame(0, 6, 0, 4.5, 34);
    let s = G.poly(['A', 'B', 'C', 'D'].map(n => m(P[n]))) + G.seg(m(P.A), m(P.C)) + G.seg(m(P.B), m(P.D));
    s += G.seg(m(P.A), m(P.E), true, 1.2) + G.seg(m(P.D), m(P.E), true, 1.2);
    const off = { A: [-10, -4], D: [10, -4], B: [-8, 8], C: [8, 8], E: [0, -14], O: [0, 14] };
    for (const n in off) s += G.text(n, m(P[n]), off[n][0], off[n][1]);
    out.e04 = G.wrap(w, h, s);
  }
  // e06：正方形 ABCD 与 k=0.6 时的位似正方形（示意）
  {
    const { w, h, m } = G.frame(-0.6, 4, -0.6, 4, 44);
    let s = G.shade([[1, 1], [1.8, 1], [1.8, 1.8], [1, 1.8]].map(m));
    s += G.axes(m, -0.6, 4, -0.6, 4);
    s += G.poly([[1, 1], [3, 1], [3, 3], [1, 3]].map(m)) + G.poly([[0.6, 0.6], [1.8, 0.6], [1.8, 1.8], [0.6, 1.8]].map(m), true);
    s += G.seg(m([0, 0]), m([3, 3]), true, 0.9);
    const off = { A: [[1, 1], -2, 12], B: [[3, 1], 8, 10], C: [[3, 3], 8, -10], D: [[1, 3], -8, -10] };
    for (const n in off) s += G.text(n, m(off[n][0]), off[n][1], off[n][2]);
    s += G.text('A′', m([0.6, 0.6]), -10, 6, 12) + G.text('C′', m([1.8, 1.8]), 10, -8, 12);
    out.e06 = G.wrap(w, h, s);
  }
  // c03：A(0,0)、B(8,0)、C(3,9)，t=1/3 时 P(3.5,4.5)
  {
    const P = { A: [0, 0], B: [8, 0], C: [3, 9], P: [3.5, 4.5], "A'": [14 / 3, 6], "B'": [2, 6], "C'": [11 / 3, 3] };
    const { w, h, m } = G.frame(0, 8, 0, 9, 22);
    let s = G.poly(['A', 'B', 'C'].map(n => m(P[n]))) + G.poly(["A'", "B'", "C'"].map(n => m(P[n])));
    for (const n of ['A', 'B', 'C']) s += G.seg(m(P[n]), m(P[n + "'"]), true, 1);
    s += G.dot(m(P.P));
    const off = { A: [-8, 8], B: [8, 8], C: [0, -14], P: [12, 0], "A'": [12, -4], "B'": [-12, -4], "C'": [0, 14] };
    for (const n in off) s += G.text(G.lab(n), m(P[n]), off[n][0], off[n][1]);
    out.c03 = G.wrap(w, h, s);
  }
  // c04：矩形 OABC 与以 P 为中心、位似比为负的位似图形（示意）
  {
    const { w, h, m } = G.frame(-0.8, 9.4, -0.8, 7.2, 24);
    let s = G.axes(m, -0.8, 9.4, -0.8, 7.2);
    s += G.poly([[0, 0], [8, 0], [8, 6], [0, 6]].map(m));
    const Pp = [3, 2.6], kk = -0.4, img = ([x, y]) => [Pp[0] + kk * (x - Pp[0]), Pp[1] + kk * (y - Pp[1])];
    s += G.poly([[0, 0], [8, 0], [8, 6], [0, 6]].map(img).map(m), true);
    s += G.dot(m(Pp)) + G.text('P', m(Pp), 10, -6, 13);
    s += G.text('A', m([8, 0]), 8, 10) + G.text('B', m([8, 6]), 10, -8) + G.text('C', m([0, 6]), -10, -6);
    out.c04 = G.wrap(w, h, s);
  }
  // c05：抛物线 y=−x²+6x+7 与 △BCD、△B′C′D′（k=−7/9）
  {
    const P = { B: [7, 0], C: [0, 7], D: [3, 16], "B'": [-49 / 9, 0], "C'": [0, -49 / 9], "D'": [-7 / 3, -112 / 9] };
    const { w, h, m } = G.frame(-6.5, 8.8, -13.5, 17.5, 11);
    let s = G.axes(m, -6.5, 8.8, -13.5, 17.5);
    const pts = [];
    for (let x = -2.4; x <= 8.41; x += 0.05) pts.push(m([x, -x * x + 6 * x + 7]));
    s += G.curve(pts);
    s += G.poly(['B', 'C', 'D'].map(n => m(P[n]))) + G.poly(["B'", "C'", "D'"].map(n => m(P[n])), true);
    const off = { B: [8, 10], C: [12, 0], D: [0, -12], "B'": [-6, -10], "C'": [14, 0], "D'": [-14, 4] };
    for (const n in off) s += G.text(G.lab(n), m(P[n]), off[n][0], off[n][1], 13);
    out.c05 = G.wrap(w, h, s);
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/28.4',
  title: '位似多边形',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），先审挑战题提纲一轮再写全文，全文子代理盲解复核两轮。课本只在坐标系中讲以原点为位似中心，位似中心不在原点的坐标在 c01、c04 题干中定义后现推。提纲阶段打回：c02 抛物线坐标乘 k 两步套路；c04 位似三角形三边与抛物线公共点个数是第 27 章计数题换数版（换成矩形内一点为位似中心）。全文第一轮：c05 用了流传数据 y=−x²+4x+5（换 y=−x²+6x+7，第(2)问改为不要求位似的相似、P 与 D 对应），不在原点的位似中心集中在 4 道挑战题；c04 两空泄露“一正一负”结构（合成选择空），“连续变化”论证改为构造法；c02(2) 靠定义（改为 △MQQ′ 面积反求 Q，复核建议的平行四边形问法因 O、Q、Q′ 恒共线会退化）；c03 加 C′ 到 AB 距离与 t 的范围。第二轮记录：c03(2) 后半问思维量偏小、c05(2) 有关于 y=x 对称的捷径，可接受。' },
  intro: [
    {
      title: '什么是位似',
      body: '把一个多边形放大或缩小，有一种整齐的做法：任取一点 $O$，从 $O$ 向每个顶点连射线，在射线上取点，使到 $O$ 的距离都变成原来的同一个倍数。这样得到的图形与原图形“位似”，$O$ 叫位似中心。位似图形一定相似；反过来，相似的图形摆的位置不对就不位似。',
      example: '四边形 $EFGH$ 中，在射线 $OE$、$OF$、$OG$、$OH$ 上取点，使 $OE_1=\\frac52OE$，$OF_1=\\frac52OF$……，四边形 $E_1F_1G_1H_1$ 与 $EFGH$ 位似，相似比是 $\\frac52$。',
      pitfall: '只说“对应顶点连线交于一点”还不够，到中心的距离还得是同一个倍数，才相似。',
    },
    {
      title: '中心在同侧还是两侧',
      body: '对应点也可以取在射线的反向延长线上，这时位似中心夹在两个图形之间，两个图形“倒过来”。不管哪种，两个图形的对应边都互相平行（或在同一直线上），对应顶点的连线都经过位似中心。',
      example: '$O$ 在 $E$、$E_1$ 之间，$OE=5$，$OE_1=2$，相似比是 $\\frac25$，而 $EE_1=5+2=7$。',
      pitfall: '中心在两图之间时，$EE_1$ 是两段相加；在同侧时是两段相减。',
    },
    {
      title: '坐标系里以原点为中心',
      body: '在平面直角坐标系中，以原点为位似中心、位似比为 $k$（$k\\ne0$）：每个顶点的横、纵坐标都乘 $k$。$k>0$ 时对应点在原点同侧，$k<0$ 时在原点两侧。两个图形相似，相似比是 $|k|$。',
      example: '点 $(8,-2)$：位似比 $\\frac32$ 时对应点 $(12,-3)$；位似比 $-\\frac32$ 时对应点 $(-12,3)$。',
      pitfall: '横、纵坐标都要乘，而且乘的是同一个 $k$，负号也一起乘进去。',
    },
    {
      title: '位似比、周长和面积',
      body: '$|k|>1$ 放大，$0<|k|<1$ 缩小；$k=1$ 时两个图形重合，$k=-1$ 时两个图形关于原点中心对称。周长之比等于 $|k|$，面积之比等于 $k^2$（相似多边形的性质）。',
      example: '一个三角形面积为 $3$，以原点为中心、位似比为 $-5$，得到的三角形面积是 $3\\times25=75$。',
      pitfall: '位似比可以是负数，相似比、周长比永远是正数 $|k|$。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '28.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的有（　　）<br>① 位似图形一定是相似图形；② 相似图形一定是位似图形；③ 以原点为位似中心、位似比为 $-2$ 的两个图形，相似比是 $-2$；④ 两个位似多边形的对应边一定互相平行；⑤ 以原点为位似中心、位似比为 $-1$ 的两个图形关于原点中心对称；⑥ 位似比为 $1$ 的两个位似图形重合。',
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 1,
      explain: [
        '①对：位似是一种特殊的相似。②错：相似的两个图形如果转了一个角度，对应边不平行，就不位似。',
        '③错：相似比是 $|k|=2$，相似比没有负数。',
        '④错：位似多边形的对应边是“平行或在同一条直线上”。经过位似中心的边，和它的对应边在同一条直线上（共线），共线不叫平行，所以“一定互相平行”说错了。',
        '⑤⑥对：$k=-1$ 时 $(x,y)$ 变成 $(-x,-y)$，关于原点中心对称；$k=1$ 时坐标不变，重合。',
        '正确的是①⑤⑥，共 $3$ 个，选 B。',
      ],
      verify: () => [true, false, false, false, true, true].filter(Boolean).length - 2,
    },
    {
      id: '28.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '在平面直角坐标系中，以原点为位似中心、位似比为 $-\\frac32$ 作 $\\triangle ABC$ 的位似图形 $\\triangle A\'B\'C\'$。已知 $A(-2,3)$、$B(4,-2)$，求 $A\'$、$B\'$ 的坐标。',
      blanks: [
        { kind: 'num', label: '$A\'$ 的横坐标', answer: '3' },
        { kind: 'num', label: '$A\'$ 的纵坐标', answer: '-9/2' },
        { kind: 'num', label: '$B\'$ 的横坐标', answer: '-6' },
        { kind: 'num', label: '$B\'$ 的纵坐标', answer: '3' },
      ],
      explain: [
        '以原点为位似中心、位似比 $k$：横、纵坐标都乘 $k$。',
        '$A\'$：$(-2)\\times(-\\frac32)=3$，$3\\times(-\\frac32)=-\\frac92$，$A\'(3,-\\frac92)$，在第四象限。',
        '$B\'$：$4\\times(-\\frac32)=-6$，$(-2)\\times(-\\frac32)=3$，$B\'(-6,3)$。',
        '坑：只给一个坐标变号，或者乘成 $\\frac32$（漏了负号，对应点就跑到原点同侧了）。',
      ],
      verify: () => { const O = [0, 0], k = F(-3).div(2); return [...hom284(O, k, [-2, 3]), ...hom284(O, k, [4, -2])]; },
    },
    {
      id: '28.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '$\\triangle A\'B\'C\'$ 与 $\\triangle ABC$ 关于原点位似，$\\triangle A\'B\'C\'$ 与 $\\triangle ABC$ 的位似比为 $-3$（即 $A\'$ 的坐标是 $A$ 的坐标的 $-3$ 倍）。已知 $A\'(6,-9)$，求点 $A$ 的坐标，以及 $\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 的位似比。',
      blanks: [
        { kind: 'num', label: '$A$ 的横坐标', answer: '-2' },
        { kind: 'num', label: '$A$ 的纵坐标', answer: '3' },
        { kind: 'num', label: '$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 的位似比', answer: '-1/3' },
      ],
      explain: [
        '$A\'$ 的坐标是 $A$ 的 $-3$ 倍，反过来 $A$ 的坐标是 $A\'$ 的 $-\\frac13$ 倍：$6\\times(-\\frac13)=-2$，$(-9)\\times(-\\frac13)=3$，$A(-2,3)$。',
        '坑：顺手再乘 $-3$，得到 $(-18,27)$。',
        '所以 $\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 的位似比是 $-\\frac13$。坑：位似比和相似比一样有方向，反过来要取倒数，符号不变。',
      ],
      verify: () => { const k = F(-1).div(3); return [...hom284([0, 0], k, [6, -9]), k]; },
    },
    {
      id: '28.4-b04',
      level: 'basic',
      type: 'fill',
      stem: '以原点为位似中心、位似比为 $-\\frac23$ 作四边形 $ABCD$ 的位似图形四边形 $A\'B\'C\'D\'$。已知四边形 $ABCD$ 的周长为 $15$，面积为 $18$，求四边形 $A\'B\'C\'D\'$ 的周长和面积。',
      blanks: [
        { kind: 'num', label: '周长', answer: '10' },
        { kind: 'num', label: '面积', answer: '8' },
      ],
      explain: [
        '两个四边形相似，相似比是 $|-\\frac23|=\\frac23$。',
        '周长之比等于相似比：$15\\times\\frac23=10$。',
        '面积之比等于相似比的平方 $\\frac49$：$18\\times\\frac49=8$。',
        '坑：面积也乘 $\\frac23$ 得 $12$；或者把负号带进去得到负的周长。',
      ],
      verify: () => { const r = F(-2).div(3).abs(); return [r.mul(15), r.mul(r).mul(18)]; },
    },
    {
      id: '28.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 位似，位似中心 $O$ 在两个三角形之间（$A$、$O$、$A\'$ 依次在一条直线上）。$OA=2$，$AA\'=8$，$\\triangle ABC$ 的面积为 $5$。求 $\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 的相似比，以及 $\\triangle A\'B\'C\'$ 的面积。',
      figure: FIG284.b05,
      blanks: [
        { kind: 'ratio', label: '$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 的相似比（写成 $a:b$）', answer: '1:3' },
        { kind: 'num', label: '$\\triangle A\'B\'C\'$ 的面积', answer: '45' },
      ],
      explain: [
        '$O$ 在 $A$、$A\'$ 之间，$OA\'=AA\'-OA=8-2=6$。',
        '相似比 $=OA\\colon OA\'=2\\colon6=1\\colon3$。坑：把 $AA\'=8$ 当成 $OA\'$，得 $1\\colon4$。',
        '面积比 $1\\colon9$，$\\triangle A\'B\'C\'$ 的面积 $=5\\times9=45$。',
      ],
      verify: () => { const oa = F(2), oa2 = F(8).sub(oa), r = oa2.div(oa); return [[1, r], r.mul(r).mul(5)]; },
    },
    {
      id: '28.4-b06',
      level: 'basic',
      type: 'choice',
      stem: '下面四幅图中，每幅都画了两个三角形，虚线连接（或延长）对应顶点。两个三角形是位似图形的是（　　）',
      figure: FIG284.b06,
      options: ['①', '②', '③', '④'],
      answer: 1,
      explain: [
        '①：两个三角形相似，但大三角形转了一个角度，对应边不平行，对应顶点连线也不交于一点，不位似。坑：只看“形状一样”就选它。',
        '②：三条连线交于一点 $O$，到 $O$ 的距离都是原来的 $2$ 倍，是位似图形。',
        '③：三条连线交于一点，但到 $O$ 的距离一个是 $3$ 倍、两个是 $2$ 倍，两个三角形连相似都不是。坑：只看“连线交于一点”。',
        '④：两个三角形全等，对应顶点连线互相平行，不交于一点，是平移，不位似。',
        '选 B。',
      ],
      verify: () => {
        const t = [[1, 1], [4, 1], [2, 3]];
        const c = Math.cos(0.5), s = Math.sin(0.5);
        const pics = [
          t.map(([x, y]) => [2 * (x * c - y * s) + 2.6, 2 * (x * s + y * c) - 1.4]),
          t.map(([x, y]) => [2 * x, 2 * y]),
          [[2, 2], [8, 2], [6, 9]],
          t.map(([x, y]) => [x + 3, y + 4]),
        ];
        // 位似：存在 Q、k≠1 使每个对应点 X′ = Q + k(X − Q)；先由 A、B 求 k，再看三点是否一致
        const isHom = u => {
          const k = (u[1][0] - u[0][0]) / (t[1][0] - t[0][0]);
          if (Math.abs(k - 1) < 1e-9) return false;
          const Q = [(u[0][0] - k * t[0][0]) / (1 - k), (u[0][1] - k * t[0][1]) / (1 - k)];
          return u.every((p, i) => Math.hypot(p[0] - (Q[0] + k * (t[i][0] - Q[0])), p[1] - (Q[1] + k * (t[i][1] - Q[1]))) < 1e-9);
        };
        return pics.findIndex(isHom);
      },
    },
    {
      id: '28.4-b07',
      level: 'basic',
      type: 'fill',
      stem: '以原点为位似中心作点 $A(-3,2)$ 的对应点 $A\'$，$A\'$ 在第四象限，且 $OA\'=2OA$。求 $A\'$ 的坐标和位似比。',
      blanks: [
        { kind: 'num', label: '$A\'$ 的横坐标', answer: '6' },
        { kind: 'num', label: '$A\'$ 的纵坐标', answer: '-4' },
        { kind: 'num', label: '位似比', answer: '-2' },
      ],
      explain: [
        '$OA\'=2OA$，位似比是 $2$ 或 $-2$。',
        '$k=2$ 时 $A\'(-6,4)$ 在第二象限；$k=-2$ 时 $A\'(6,-4)$ 在第四象限。',
        '所以位似比为 $-2$，$A\'(6,-4)$。坑：看到“2 倍”就写 $k=2$，不检查象限。',
      ],
      verify: () => {
        for (const k of [2, -2]) { const [x, y] = hom284([0, 0], k, [-3, 2]); if (x.cmp(0) > 0 && y.cmp(0) < 0) return [x, y, k]; }
        return null;
      },
    },
    {
      id: '28.4-b08',
      level: 'basic',
      type: 'fill',
      stem: '$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 关于原点位似，$A(2,1)$ 的对应点是 $A\'(-6,-3)$，求 $B(4,3)$ 的对应点 $B\'$ 的坐标。',
      blanks: [
        { kind: 'num', label: '$B\'$ 的横坐标', answer: '-12' },
        { kind: 'num', label: '$B\'$ 的纵坐标', answer: '-9' },
      ],
      explain: [
        '先求位似比：$-6\\div2=-3$，$-3\\div1=-3$，$k=-3$。',
        '$B\'$：$4\\times(-3)=-12$，$3\\times(-3)=-9$，$B\'(-12,-9)$。',
        '坑：以为 $A$ 到 $A\'$ 是“横坐标减 $8$、纵坐标减 $4$”，照样平移得 $(-4,-1)$。位似是乘同一个数，不是加减同一个数。',
      ],
      verify: () => { const k = F(-6).div(2); return hom284([0, 0], k, [4, 3]); },
    },
    {
      id: '28.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '矩形 $OABC$ 的顶点 $O(0,0)$、$A(4,0)$、$B(4,2)$、$C(0,2)$。以原点为位似中心作矩形 $OABC$ 的位似图形，得到的矩形面积为 $2$。求位似比，以及得到的矩形的周长。',
      blanks: [
        { kind: 'nums', label: '位似比（全部填出，用逗号隔开）', answer: ['1/2', '-1/2'] },
        { kind: 'num', label: '得到的矩形的周长', answer: '6' },
      ],
      explain: [
        '原矩形面积 $4\\times2=8$，面积比 $\\frac28=\\frac14$，相似比 $|k|=\\frac12$。',
        '位似比可以是 $\\frac12$（在第一象限），也可以是 $-\\frac12$（在第三象限）。坑：只写 $\\frac12$。',
        '周长 $=12\\times\\frac12=6$。',
      ],
      verify: () => { const r = F(1).div(2); return (r.mul(r).mul(8).eq(2)) ? [[r, r.neg()], r.mul(12)] : null; },
    },

    // ---------- 扩展 ----------
    {
      id: '28.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 位似，位似中心为 $O$，点 $A\'$ 在直线 $OA$ 上。$\\triangle ABC$ 与 $\\triangle A\'B\'C\'$ 的面积比为 $4\\colon9$，$OA=4$，求 $AA\'$ 的长。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '$AA\'=$', answer: ['2', '10'] }],
      explain: [
        '面积比 $4\\colon9$，相似比 $2\\colon3$，所以 $OA\\colon OA\'=2\\colon3$，$OA\'=6$。坑：把面积比当相似比，得 $OA\'=9$。',
        '题目没说位似中心在哪一边，要分两种：',
        '$A$、$A\'$ 在 $O$ 的同侧：$AA\'=6-4=2$。',
        '$O$ 在 $A$、$A\'$ 之间：$AA\'=6+4=10$。',
        '所以 $AA\'=2$ 或 $10$。',
      ],
      verify: () => { const r = F(3).div(2), oa2 = r.mul(4); return [oa2.sub(4), oa2.add(4)]; },
    },
    {
      id: '28.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle OAB$ 的顶点 $O(0,0)$、$A(3,0)$、$B(1,2)$。以原点为位似中心作 $\\triangle OAB$ 的位似图形 $\\triangle OA\'B\'$，点 $B\'$ 恰好落在双曲线 $y=\\frac8x$ 上。求位似比，以及 $\\triangle OA\'B\'$ 的面积。',
      blanks: [
        { kind: 'nums', label: '位似比（全部填出，用逗号隔开）', answer: ['2', '-2'] },
        { kind: 'num', label: '$\\triangle OA\'B\'$ 的面积', answer: '12' },
      ],
      explain: [
        '设位似比为 $k$，$B\'(k,2k)$。代入 $y=\\frac8x$：$2k\\cdot k=8$，$k^2=4$，$k=2$ 或 $k=-2$。',
        '$k=2$ 时 $B\'(2,4)$ 在第一象限的一支上；$k=-2$ 时 $B\'(-2,-4)$ 在第三象限的一支上，也满足 $y=\\frac8x$。坑：只取正的。',
        '$\\triangle OAB$ 的面积 $=\\frac12\\times3\\times2=3$，面积比为 $k^2=4$，$\\triangle OA\'B\'$ 的面积 $=12$（两种情况一样）。坑：面积乘 $k$，得 $6$ 或负数。',
      ],
      verify: () => {
        const ks = [2, -2].filter(k => F(2 * k).mul(k).eq(8));
        const S = ks.map(k => { const [ax] = hom284([0, 0], k, [3, 0]), [, by] = hom284([0, 0], k, [1, 2]); return ax.mul(by).div(2).abs(); });
        return [ks, S[0]];
      },
    },
    {
      id: '28.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '$\\triangle ABC$ 的顶点 $A(6,12)$、$B(-12,6)$、$C(18,-6)$。以原点为位似中心作 $\\triangle ABC$ 的位似图形，要求把它缩小（相似比小于 $1$），并且三个顶点仍然都是整点（横、纵坐标都是整数）。满足要求的位似比共有几个？',
      blanks: [{ kind: 'num', label: '共有几个', answer: '10' }],
      explain: [
        '设位似比为 $k$，$0<|k|<1$。六个坐标 $6,12,-12,6,18,-6$ 乘 $k$ 都要是整数，其中最关键的是 $6k$ 要是整数（$12k$、$18k$ 都是 $6k$ 的倍数）。',
        '反过来，$6k$ 是整数时 $6k\\times2$、$6k\\times3$ 等也都是整数。所以条件就是 $6k$ 为整数：$k=\\frac m6$，$m$ 是整数。',
        '$0<|k|<1$ 即 $m=\\pm1,\\pm2,\\pm3,\\pm4,\\pm5$，$k=\\pm\\frac16,\\pm\\frac13,\\pm\\frac12,\\pm\\frac23,\\pm\\frac56$，共 $10$ 个。',
        '坑：只想到 $\\frac12$、$\\frac13$、$\\frac16$ 这样分子是 $1$ 的；或者忘了位似比可以是负数。',
      ],
      verify: () => {
        const cs = [6, 12, -12, 6, 18, -6];
        const set = new Set();
        for (let d = 1; d <= 36; d++) for (let n = -d + 1; n < d; n++) {
          if (n === 0) continue;
          const k = F(n).div(d);
          if (cs.every(c => k.mul(c).d === 1n)) set.add(k.toString());
        }
        return set.size;
      },
    },
    {
      id: '28.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，梯形 $ABCD$ 中，$AD\\parallel BC$，$AD=2$，$BC=6$，对角线 $AC$、$BD$ 交于点 $O$，两腰 $BA$、$CD$ 的延长线交于点 $E$。图中 $\\triangle AOD$ 与 $\\triangle COB$ 位似，$\\triangle EAD$ 与 $\\triangle EBC$ 也位似。已知 $\\triangle AOD$ 的面积为 $1$，求梯形 $ABCD$ 的面积和 $\\triangle EAD$ 的面积。',
      figure: FIG284.e04,
      blanks: [
        { kind: 'num', label: '梯形 $ABCD$ 的面积', answer: '16' },
        { kind: 'num', label: '$\\triangle EAD$ 的面积', answer: '2' },
      ],
      explain: [
        '$\\triangle AOD$ 与 $\\triangle COB$：位似中心是 $O$，$O$ 在两个三角形之间（$A$、$O$、$C$ 依次共线），相似比 $AD\\colon CB=1\\colon3$，所以 $S_{\\triangle COB}=9$。',
        '$\\triangle AOB$ 与 $\\triangle AOD$ 同高（顶点 $A$），底 $BO\\colon OD=3\\colon1$，$S_{\\triangle AOB}=3$；同理 $S_{\\triangle COD}=3$。梯形面积 $=1+9+3+3=16$。',
        '$\\triangle EAD$ 与 $\\triangle EBC$：位似中心是 $E$，在同侧，相似比 $1\\colon3$，面积比 $1\\colon9$。设 $S_{\\triangle EAD}=s$，则 $S_{\\triangle EBC}=9s$，梯形 $=8s=16$，$s=2$。',
        '坑：把 $S_{\\triangle EAD}$ 当成和 $S_{\\triangle AOD}$ 一样是 $1$；或用相似比 $1\\colon3$ 当面积比，得 $16\\div2=8$。',
      ],
      verify: () => {
        const r = F(6).div(2), sAOD = F(1), sCOB = sAOD.mul(r).mul(r), side = sAOD.mul(r);
        const trap = sAOD.add(sCOB).add(side).add(side);
        return [trap, trap.div(r.mul(r).sub(1))];
      },
    },
    {
      id: '28.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '点 $A(-2,0)$、$B(0,4)$。以原点为位似中心、位似比为 $k$（$k\\ne\\pm1$）作线段 $AB$ 的位似图形线段 $A\'B\'$（$A\'$ 与 $A$ 对应）。以 $A$、$B$、$A\'$、$B\'$ 为顶点的四边形是梯形，且面积为 $12$，求 $k$ 的值。（全部填出，用逗号隔开，带根号的化成最简）',
      blanks: [{ kind: 'reals', label: '$k=$', answer: ['2', '1-√3'], simplest: true }],
      explain: [
        '$A\'(-2k,0)$、$B\'(0,4k)$，$A\'B\'\\parallel AB$（$\\triangle OA\'B\'$ 与 $\\triangle OAB$ 位似），面积 $S_{\\triangle OA\'B\'}=4k^2$，$S_{\\triangle OAB}=4$。',
        '$k>0$ 时两条线段在原点同侧，梯形 $ABB\'A\'$ 的面积是两个三角形面积之差：$|4k^2-4|=12$。$k>1$ 时 $4k^2-4=12$，$k=2$；$0<k<1$ 时 $4-4k^2=12$ 无解。',
        '$k<0$ 时 $A\'$ 在 $x$ 轴正半轴、$B\'$ 在 $y$ 轴负半轴，梯形 $ABA\'B\'$ 的两条对角线 $AA\'$、$BB\'$ 恰好在两条坐标轴上且互相垂直，面积 $=\\frac12\\cdot AA\'\\cdot BB\'=\\frac12(2-2k)(4-4k)=4(1-k)^2$。',
        '$4(1-k)^2=12$，$1-k=\\sqrt3$（$1-k>0$），$k=1-\\sqrt3$。',
        '所以 $k=2$ 或 $k=1-\\sqrt3$。坑：只想到同侧（漏 $k<0$），或在 $k<0$ 时仍用“面积之差”。',
      ],
      verify: () => {
        // 同侧（k>0）：面积 = |S△OA′B′ − S△OAB| = 4|k²−1|；两侧（k<0）：面积 = ½·AA′·BB′ = ½(2−2k)(4−4k)
        const S0 = 4, target = 12, res = [];
        const kBig = Math.sqrt((target + S0) / S0);            // k>1：4k²−4=12
        if (kBig > 1) res.push(kBig);
        if ((S0 - target) / S0 > 0) res.push(Math.sqrt((S0 - target) / S0));  // 0<k<1：4−4k²=12（无解）
        res.push(1 - Math.sqrt(target / 4));                    // k<0：4(1−k)²=12，1−k>0
        const area = k => (k > 0 ? Math.abs(4 * k * k - 4) : 0.5 * (2 - 2 * k) * (4 - 4 * k));
        return res.filter(k => Math.abs(area(k) - target) < 1e-9);
      },
    },
    {
      id: '28.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 的顶点 $A(1,1)$、$B(3,1)$、$C(3,3)$、$D(1,3)$。以原点为位似中心、位似比为 $k$（$k>0$）作正方形 $ABCD$ 的位似图形正方形 $A\'B\'C\'D\'$，两个正方形重叠部分的面积为 $S$（图中阴影是某个 $k$ 的示意）。<br>(1) 两个正方形有重叠部分（$S>0$）时，求 $k$ 的取值范围；<br>(2) 求 $k=\\frac12$ 时、$k=2$ 时的 $S$；<br>(3) 若重叠部分的面积等于正方形 $A\'B\'C\'D\'$ 面积的一半，求 $k$。（全部填出，用逗号隔开）',
      figure: FIG284.e06,
      blanks: [
        { kind: 'ineq', var: 'k', label: '(1)', answer: '1/3<k<3' },
        { kind: 'num', label: '(2) $k=\\frac12$ 时 $S=$', answer: '1/4' },
        { kind: 'num', label: '$k=2$ 时 $S=$', answer: '1' },
        { kind: 'reals', label: '(3) $k=$', answer: ['(3+√2)/7', '3√2-3'] },
      ],
      explain: [
        '正方形 $A\'B\'C\'D\'$ 横、纵方向都占 $k\\le x\\le3k$（$k\\le y\\le3k$），原正方形占 $1\\le x\\le3$。重叠部分也是正方形，边长是两个区间公共部分的长度。',
        '(1) 有公共部分要 $3k>1$ 且 $k<3$，即 $\\frac13<k<3$（$k=\\frac13$ 或 $3$ 时只有一个公共点）。',
        '分段：$\\frac13<k\\le1$ 时公共部分从 $1$ 到 $3k$，$S=(3k-1)^2$；$1\\le k<3$ 时从 $k$ 到 $3$，$S=(3-k)^2$。',
        '(2) $k=\\frac12$：$S=(\\frac32-1)^2=\\frac14$；$k=2$：$S=(3-2)^2=1$。',
        '(3) $A\'B\'C\'D\'$ 的面积为 $4k^2$，要 $S=2k^2$。第一段：$(3k-1)^2=2k^2$，$3k-1=\\sqrt2k$（$3k-1>0$），$k=\\frac1{3-\\sqrt2}=\\frac{3+\\sqrt2}7\\approx0.63$，在 $\\frac13<k\\le1$ 内。',
        '第二段：$(3-k)^2=2k^2$，$3-k=\\sqrt2k$，$k=\\frac3{1+\\sqrt2}=3\\sqrt2-3\\approx1.24$，在 $1\\le k<3$ 内。',
        '所以 $k=\\frac{3+\\sqrt2}7$ 或 $3\\sqrt2-3$。坑：只算一段；或解出后不检验是否在这一段里。',
      ],
      verify: () => {
        const ov = k => { const L = Math.max(0, Math.min(3, 3 * k) - Math.max(1, k)); return L * L; };
        // (1) 区间 [k,3k] 与 [1,3] 有公共部分（长度大于 0）：3k>1 且 k<3
        const lo = F(1).div(3), hi = F(3).div(1);
        const ineq = `${lo}<k<${hi}`;
        // (3) 二分求 ov(k) − 2k² 的零点
        const g = k => ov(k) - 2 * k * k, roots = [];
        for (let i = 334; i < 2999; i++) {
          const a = i / 1000, b = (i + 1) / 1000;
          if (g(a) === 0) roots.push(a);
          else if (g(a) * g(b) < 0) { let x = a, y = b; for (let t = 0; t < 60; t++) { const mid = (x + y) / 2; if (g(x) * g(mid) <= 0) y = mid; else x = mid; } roots.push((x + y) / 2); }
        }
        return [ineq, ov(0.5), ov(2), roots];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '28.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '在平面直角坐标系中，$\\triangle ABC$ 的顶点 $A(1,2)$、$B(3,1)$、$C(2,4)$。先以原点 $O$ 为位似中心、位似比为 $2$ 作 $\\triangle A_1B_1C_1$；再以点 $P(4,0)$ 为位似中心作 $\\triangle A_2B_2C_2$：使 $PA_2=|k|\\cdot PA_1$、$PB_2=|k|\\cdot PB_1$、$PC_2=|k|\\cdot PC_1$（$k\\ne0$；$k>0$ 时 $A_2$ 在射线 $PA_1$ 上，$k<0$ 时在射线 $PA_1$ 的反向延长线上，$B_2$、$C_2$ 同样）。<br>(1) 当 $k=-1$ 时，求 $A_2$ 的坐标；此时 $\\triangle A_2B_2C_2$ 与 $\\triangle ABC$ 位似，求位似中心的坐标和 $\\triangle A_2B_2C_2$ 与 $\\triangle ABC$ 的相似比（前者比后者）；<br>(2) 求所有使 $\\triangle A_2B_2C_2$ 与 $\\triangle ABC$ 不位似的 $k$，并说明此时两个三角形的关系；<br>(3) 若 $\\triangle A_2B_2C_2$ 与 $\\triangle ABC$ 全等并且位似，求 $k$ 和位似中心的横坐标。',
      blanks: [
        { kind: 'num', label: '(1) $A_2$ 的横坐标', answer: '6' },
        { kind: 'num', label: '$A_2$ 的纵坐标', answer: '-4' },
        { kind: 'num', label: '位似中心的横坐标', answer: '8/3' },
        { kind: 'num', label: '位似中心的纵坐标', answer: '0' },
        { kind: 'num', label: '相似比 $A_2B_2\\colon AB$', answer: '2' },
        { kind: 'nums', label: '(2) 不位似的 $k$（有几个就填几个，用逗号隔开）', answer: ['1/2'] },
        { kind: 'text', label: '此时两个三角形的关系', answer: '平移', options: ['平移', '关于某点中心对称', '相似但不全等'] },
        { kind: 'num', label: '(3) $k=$', answer: '-1/2' },
        { kind: 'num', label: '位似中心的横坐标', answer: '3' },
      ],
      explain: [
        '思路：课本只讲了以原点为中心的坐标，先自己推出“以 $P(4,0)$ 为中心”的坐标规则，再看两次放缩合起来是什么。',
        '设 $M_1(x_1,y_1)$，对应点 $M_2(x_2,y_2)$ 在直线 $PM_1$ 上，$PM_2=|k|PM_1$。过 $M_1$、$M_2$ 作 $x$ 轴的垂线，由平行线分线段成比例，$M_2$ 到 $x$ 轴的距离是 $M_1$ 的 $|k|$ 倍，水平方向到 $P$ 的距离也是 $|k|$ 倍；$k>0$ 同侧、$k<0$ 异侧，合起来：$x_2-4=k(x_1-4)$，$y_2=ky_1$。',
        '又 $x_1=2x$，$y_1=2y$，所以 $\\triangle ABC$ 上的点 $(x,y)$ 最终变成 $(2kx+4-4k,\\ 2ky)$。',
        '(1) $k=-1$：$(x,y)\\to(-2x+8,\\ -2y)$，$A_2(6,-4)$。若有位似中心 $Q(a,b)$、位似比 $m$，则 $-2x+8=a+m(x-a)$、$-2y=b+m(y-b)$ 对每个顶点都成立，比较得 $m=-2$，$a=8-2a$，$a=\\frac83$，$b=0$。也可以连 $AA_2$、$BB_2$ 求交点 $(\\frac83,0)$，再验 $CC_2$ 也过它。位似中心 $(\\frac83,0)$，相似比 $2$。',
        '(2) 一般地，$(x,y)\\to(2kx+4-4k,\\ 2ky)$。若 $2k\\ne1$：取 $Q(\\frac{4-4k}{1-2k},0)$，可以验证 $2kx+4-4k=Q_x+2k(x-Q_x)$，所以以 $Q$ 为中心、位似比 $2k$ 位似。',
        '若 $2k=1$，即 $k=\\frac12$：$(x,y)\\to(x+2,y)$，每个点都向右移 $2$ 个单位，$AA_2$、$BB_2$、$CC_2$ 互相平行、不交于一点，两个三角形全等（是平移）但不位似。所以只有 $k=\\frac12$。',
        '(3) 全等要相似比 $|2k|=1$，$k=\\pm\\frac12$；$k=\\frac12$ 是平移，不位似，舍去。$k=-\\frac12$：$(x,y)\\to(-x+6,-y)$，关于点 $(3,0)$ 中心对称，位似中心 $(3,0)$，位似比 $-1$。',
        '小结：两次位似合起来，只要两个位似比的乘积不等于 $1$，结果仍是位似（中心在直线 $OP$ 上）；乘积等于 $1$ 时退化成平移。',
      ],
      verify: () => {
        const P = [4, 0];
        const two = (k, X) => hom284(P, k, hom284([0, 0], 2, X));
        // 由 A、B 两点求合成后的位似比和中心，再用 C 检验
        const center = k => {
          const A = [1, 2], B = [3, 1], C = [2, 4];
          const A2 = two(k, A), B2 = two(k, B), C2 = two(k, C);
          const m = A2[0].sub(B2[0]).div(F(A[0] - B[0]));
          if (m.eq(1)) return null;   // 平移
          const Q = [A2[0].sub(m.mul(A[0])).div(F(1).sub(m)), A2[1].sub(m.mul(A[1])).div(F(1).sub(m))];
          const ok = [A, B, C].every((X, i) => { const Y = hom284(Q, m, X), Z = [A2, B2, C2][i]; return Y[0].eq(Z[0]) && Y[1].eq(Z[1]); });
          return ok ? { m, Q } : null;
        };
        const r1 = center(-1), A2 = two(-1, [1, 2]);
        const bad = [];
        for (let d = 1; d <= 12; d++) for (let n = -24; n <= 24; n++) { if (n === 0) continue; const k = F(n).div(d); if (!center(k) && !bad.some(b => b.eq(k))) bad.push(k); }
        let k3 = null, q3 = null;
        for (const k of [F(1).div(2), F(-1).div(2)]) { const c = center(k); if (c && c.m.abs().eq(1)) { k3 = k; q3 = c.Q[0]; } }
        return [A2[0], A2[1], r1.Q[0], r1.Q[1], r1.m.abs(), bad, bad.length === 1 ? '平移' : '', k3, q3];
      },
    },
    {
      id: '28.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '抛物线 $C$：$y=x^2-6$。把 $C$ 上每一点的横、纵坐标都乘 $k$（$k\\ne0$，$k\\ne1$），得到的所有点组成图形 $C\'$（$C$ 上的点 $Q$ 与它变成的点 $Q\'$ 叫对应点）。<br>(1) 当 $k=-\\frac12$ 时，求 $C\'$ 的函数解析式；<br>(2) 若 $C$ 与 $C\'$ 有公共点，求 $k$ 的取值范围。这时公共点有两个，记横坐标为正的一个为 $M$，另一个为 $N$；若 $O$、$M$、$N$ 构成等腰直角三角形，求 $k$；<br>(3) 当 $k$ 取 (2) 中求得的较小的值时，点 $Q$ 在 $C$ 上且在 $y$ 轴右侧，若 $\\triangle MQQ\'$ 的面积为 $\\frac{45}2$，求点 $Q$ 的横坐标。',
      blanks: [
        { kind: 'expr', label: '(1) $k=-\\frac12$ 时 $C\'$：$y=$', answer: '-2x^2+3' },
        { kind: 'ineq', var: 'k', label: '(2) 有公共点时 $k$ 的取值范围', answer: 'k<0' },
        { kind: 'nums', label: '$\\triangle OMN$ 是等腰直角三角形时 $k=$（全部填出，用逗号隔开）', answer: ['-3/2', '-2/3'] },
        { kind: 'nums', label: '(3) 点 $Q$ 的横坐标（全部填出，用逗号隔开）', answer: ['1', '4'] },
      ],
      explain: [
        '思路：“横、纵坐标都乘 $k$”就是以原点为位似中心、位似比为 $k$ 的变换。先翻译成解析式求公共点；最后一问抓住“$Q$、$O$、$Q\'$ 在一条直线上，$OQ\'=|k|\\cdot OQ$”，把 $\\triangle MQQ\'$ 的面积换成 $\\triangle MOQ$ 的面积。',
        '(1) 设 $(x,y)$ 在 $C$ 上，对应点 $(X,Y)=(kx,ky)$，则 $x=\\frac Xk$，$y=\\frac Yk$，代入 $y=x^2-6$：$\\frac Yk=\\frac{X^2}{k^2}-6$，$C\'$：$y=\\frac{x^2}k-6k$。$k=-\\frac12$ 时 $y=-2x^2+3$。',
        '(2) 联立 $x^2-6=\\frac{x^2}k-6k$：$x^2\\cdot\\frac{k-1}k=-6(k-1)$，$k\\ne1$，得 $x^2=-6k$。$k>0$ 无解；$k<0$ 时 $x=\\pm\\sqrt{-6k}$，有两个公共点。所以 $k<0$。',
        '设 $s=\\sqrt{-6k}$，$M(s,s^2-6)$、$N(-s,s^2-6)$ 关于 $y$ 轴对称，$OM=ON$。直角顶点若在 $M$，则 $OM\\perp MN$，$MN$ 水平，$OM$ 要竖直，$s=0$，不可能；同理不在 $N$。所以 $\\angle MON=90^\\circ$，$M$ 到两坐标轴距离相等：$|s^2-6|=s$（$s^2=6$ 即 $k=-1$ 时 $O$、$M$、$N$ 共线，不构成三角形）。$s^2-6=s$ 得 $s=3$，$k=-\\frac32$；$s^2-6=-s$ 得 $s=2$，$k=-\\frac23$。',
        '(3) $k=-\\frac32$，$M(3,3)$。设 $Q(x,x^2-6)$（$x>0$），$Q\'$ 在射线 $QO$ 越过 $O$ 的延长线上，$OQ\'=\\frac32OQ$，所以 $QQ\'=OQ+OQ\'=\\frac52OQ$。$\\triangle MQQ\'$ 与 $\\triangle MOQ$ 的底在同一条直线上、高相同，$S_{\\triangle MQQ\'}=\\frac52S_{\\triangle MOQ}$，所以 $S_{\\triangle MOQ}=\\frac{45}2\\div\\frac52=9$。',
        '直线 $OM$：$y=x$。过 $Q$ 作 $y$ 轴的平行线交 $OM$ 于 $(x,x)$，竖直方向的距离是 $|x^2-6-x|$，$O$、$M$ 的水平距离是 $3$，$S_{\\triangle MOQ}=\\frac12\\times3\\times|x^2-x-6|=9$，$|x^2-x-6|=6$。',
        '$x^2-x-6=6$：$x^2-x-12=0$，$x=4$ 或 $x=-3$（不在 $y$ 轴右侧，舍）；$x^2-x-6=-6$：$x^2-x=0$，$x=1$ 或 $x=0$（舍）。所以 $Q(4,10)$ 或 $Q(1,-5)$，横坐标是 $1$ 或 $4$。',
        '坑：$k<0$ 时 $O$ 在 $Q$、$Q\'$ 之间，$QQ\'$ 是两段相加，不是 $\\frac32-1$ 倍；$Q$ 可能在直线 $OM$ 的上方或下方，绝对值的两种情况都要解。',
      ],
      verify: () => {
        // (1) k=-1/2 时取三个点核对 C′ 的解析式
        const k1 = F(-1).div(2);
        const okExpr = [1, 2, 3].every(x => { const [X, Y] = hom284([0, 0], k1, [x, x * x - 6]); return Y.eq(F(-2).mul(X).mul(X).add(3)); });
        // (2) 数值扫描：哪些 k 使 C 与 C′ 有公共点
        const meet = k => { const g = x => x * x - 6 - (x * x / k - 6 * k); for (let x = 0; x < 30; x += 0.01) if (g(x) === 0 || g(x) * g(x + 0.01) < 0) return true; return false; };
        const kGrid = []; for (let i = -40; i <= 40; i++) if (i !== 0 && i !== 8) kGrid.push(i / 8);
        const range = kGrid.every(k => meet(k) === (k < 0)) ? 'k<0' : '';
        // 枚举分数 k<0，找 ∠MON=90°
        const ks = [];
        for (let d = 1; d <= 12; d++) for (let n = -36; n < 0; n++) {
          const k = F(n).div(d), s2 = k.mul(-6), s = Math.sqrt(Number(s2.n) / Number(s2.d));
          if (Math.abs(s - Math.round(s)) > 1e-12) continue;
          const y = s2.sub(6);
          if (!y.eq(0) && y.abs().eq(Math.round(s)) && !ks.some(t => t.eq(k))) ks.push(k);
        }
        const kmin = ks.reduce((a, b) => (a.cmp(b) < 0 ? a : b));
        const sM = Math.round(Math.sqrt(Number(kmin.mul(-6).n) / Number(kmin.mul(-6).d))), M = [F(sM), F(sM * sM - 6)];
        // (3) 枚举 y 轴右侧的分数横坐标，用坐标直接算 △MQQ′ 的面积
        const area = (P, Q, R) => Q[0].sub(P[0]).mul(R[1].sub(P[1])).sub(Q[1].sub(P[1]).mul(R[0].sub(P[0]))).abs().div(2);
        const xs = [];
        for (let d = 1; d <= 6; d++) for (let n = 1; n <= 20 * d; n++) {
          const x = F(n).div(d), Q = [x, x.mul(x).sub(6)], Qp = hom284([0, 0], kmin, Q);
          if (area(M, Q, Qp).eq(F(45).div(2)) && !xs.some(t => t.eq(x))) xs.push(x);
        }
        return [okExpr ? '-2x^2+3' : '', range, ks, xs];
      },
    },
    {
      id: '28.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，$AB=8$，面积为 $36$。点 $P$ 在 $\\triangle ABC$ 内部，以 $P$ 为位似中心作 $\\triangle A\'B\'C\'$：$A\'$、$B\'$、$C\'$ 分别在射线 $AP$、$BP$、$CP$ 上点 $P$ 的另一侧，且 $PA\'=t\\cdot PA$、$PB\'=t\\cdot PB$、$PC\'=t\\cdot PC$（$0<t<1$）。(1)(2) 两问中，点 $A\'$ 都在边 $BC$ 上、点 $B\'$ 都在边 $CA$ 上。<br>(1) 当 $t=\\frac13$ 时（如图），求点 $C\'$ 到 $AB$ 的距离和 $\\triangle A\'B\'C\'$ 的面积；<br>(2) 当点 $C\'$ 与点 $C$ 在直线 $AB$ 同侧时，用含 $t$ 的式子表示点 $C\'$ 到 $AB$ 的距离；并求点 $C\'$ 在 $\\triangle ABC$ 内部或边上时 $t$ 的取值范围；<br>(3) 若 $A\'$、$B\'$、$C\'$ 恰好分别在边 $BC$、$CA$、$AB$ 上，求 $t$，并指出此时点 $P$ 是 $\\triangle ABC$ 的什么点。',
      figure: FIG284.c03,
      blanks: [
        { kind: 'num', label: '(1) 点 $C\'$ 到 $AB$ 的距离', answer: '3' },
        { kind: 'num', label: '$\\triangle A\'B\'C\'$ 的面积', answer: '4' },
        { kind: 'expr', label: '(2) 点 $C\'$ 到 $AB$ 的距离 $=$', answer: '9-18t' },
        { kind: 'ineq', var: 't', label: '$C\'$ 在 $\\triangle ABC$ 内部或边上时 $t$ 的取值范围', answer: '0<t≤1/2' },
        { kind: 'num', label: '(3) $t=$', answer: '1/2' },
        { kind: 'text', label: '点 $P$ 是', answer: '重心', options: ['重心', '三条角平分线的交点', '三条高的交点', '三边垂直平分线的交点'] },
      ],
      explain: [
        '思路：$A\'$ 在 $BC$ 上，告诉我们 $P$ 离 $BC$ 有多远；两个这样的条件再加“三块面积之和等于整体”，就能算出 $P$ 离第三边多远，再沿 $C\\to P\\to C\'$ 推出 $C\'$ 的位置。',
        '(1) $AP\\colon PA\'=1\\colon\\frac13=3\\colon1$，所以 $PA\'=\\frac14AA\'$。过 $A$、$P$ 作 $BC$ 的垂线（互相平行），由平行线分线段成比例，$P$ 到 $BC$ 的距离是 $A$ 到 $BC$ 距离的 $\\frac14$，所以 $S_{\\triangle PBC}=\\frac14\\times36=9$。同理 $S_{\\triangle PCA}=9$，于是 $S_{\\triangle PAB}=18$。',
        '$AB$ 边上的高 $h=\\frac{2\\times36}8=9$，$P$ 到 $AB$ 的距离 $=\\frac{2\\times18}8=\\frac92$。$C$、$P$、$C\'$ 共线，$PC\'=\\frac13PC$，$C\'$ 在 $P$ 的另一侧。过三点作 $AB$ 的垂线：从 $C$ 到 $P$ 离 $AB$ 近了 $9-\\frac92=\\frac92$，从 $P$ 到 $C\'$ 再近 $\\frac13\\times\\frac92=\\frac32$，$C\'$ 到 $AB$ 的距离 $=\\frac92-\\frac32=3$。$\\triangle A\'B\'C\'$ 与 $\\triangle ABC$ 相似，相似比 $\\frac13$，面积 $=36\\times\\frac19=4$。',
        '(2) 一般地，$PA\'=\\frac t{1+t}AA\'$，$S_{\\triangle PBC}=S_{\\triangle PCA}=\\frac t{1+t}\\times36$，$S_{\\triangle PAB}=\\frac{1-t}{1+t}\\times36$，$P$ 到 $AB$ 的距离 $=\\frac{9(1-t)}{1+t}$。从 $C$ 到 $P$ 离 $AB$ 近了 $9-\\frac{9(1-t)}{1+t}=\\frac{18t}{1+t}$，从 $P$ 到 $C\'$ 再近 $\\frac{18t^2}{1+t}$。',
        '$C\'$ 到 $AB$ 的距离 $=\\frac{9(1-t)-18t^2}{1+t}=\\frac{9(1-2t)(1+t)}{1+t}=9-18t$（$t=\\frac13$ 时是 $3$，与 (1) 一致）。',
        '$C\'$ 在三角形内部或边上，要它在每条边所在直线上“靠第三个顶点的一侧”（或在边上）。看 $BC$：设 $A$ 到 $BC$ 的距离为 $h_a$，$C$ 在 $BC$ 上，$P$ 到 $BC$ 的距离是 $\\frac t{1+t}h_a$；从 $C$ 经 $P$ 到 $C\'$ 一直远离 $BC$，$C\'$ 到 $BC$ 的距离 $=\\frac t{1+t}h_a\\times(1+t)=th_a>0$，与 $A$ 同侧。同理 $C\'$ 与 $B$ 在 $CA$ 同侧。所以只要 $C\'$ 不越过 $AB$：$9-18t\\ge0$，$t\\le\\frac12$。范围是 $0<t\\le\\frac12$（$t=\\frac12$ 时 $C\'$ 在 $AB$ 上）。',
        '(3) 由 (2)，$C\'$ 在 $AB$ 上要 $9-18t=0$，$t=\\frac12$。这时三块面积都是 $12$，$PA\'\\colon PA=1\\colon2$，$B\'$、$C\'$ 同理；与 (1) 同样的方法，$A\'B\'\\parallel AB$ 且 $A\'B\'=\\frac12AB$，结合 $A\'$ 在 $BC$ 上、$B\'$ 在 $CA$ 上，$A\'B\'$ 是中位线，$A\'$、$B\'$ 是中点，$AA\'$、$BB\'$ 是中线，$P$ 是重心。',
        '坑：只看 $C\'$ 到 $AB$ 的距离不够，还要说明 $C\'$ 不会越过另外两边；$t=\\frac12$ 时 $C\'$ 在边上，题目说“含边上”，要取等号。',
      ],
      verify: () => {
        // 用坐标 A(0,0)、B(8,0)、C(3,9) 验算（面积 36，AB 在 x 轴上，C′ 的纵坐标就是它到 AB 的距离）
        const A = [0, 0], B = [8, 0], C = [3, 9];
        const solve = t => {
          // P = (A′ + tA)/(1+t) = (B′ + tB)/(1+t)，A′ = B + s(C−B)，B′ = C + u(A−C)，用分数解二元一次方程组
          t = F(t);
          const a11 = F(C[0] - B[0]), a12 = F(-(A[0] - C[0])), a21 = F(C[1] - B[1]), a22 = F(-(A[1] - C[1]));
          const r1 = F(C[0]).add(t.mul(B[0])).sub(F(B[0]).add(t.mul(A[0]))), r2 = F(C[1]).add(t.mul(B[1])).sub(F(B[1]).add(t.mul(A[1])));
          const det = a11.mul(a22).sub(a12.mul(a21));
          const s = r1.mul(a22).sub(a12.mul(r2)).div(det);
          const Ap = [F(B[0]).add(s.mul(C[0] - B[0])), F(B[1]).add(s.mul(C[1] - B[1]))];
          const P = [Ap[0].add(t.mul(A[0])).div(t.add(1)), Ap[1].add(t.mul(A[1])).div(t.add(1))];
          return hom284(P, t.neg(), C);
        };
        const C1 = solve(F(1).div(3));
        // (2) 由两个 t 的值求一次式 a+bt，再用第三个值检验
        const d1 = solve(F(1).div(4))[1], d2 = solve(F(1).div(5))[1];
        const b = d1.sub(d2).div(F(1).div(4).sub(F(1).div(5))), a = d1.sub(b.mul(F(1).div(4)));
        const lin = solve(F(2).div(7))[1].eq(a.add(b.mul(F(2).div(7))));
        // C′ 在三角形内或边上：与每个顶点在对边的同侧（叉积同号或为 0）
        const side = (P, Q, X) => F(Q[0] - P[0]).mul(X[1].sub(P[1])).sub(F(Q[1] - P[1]).mul(X[0].sub(P[0])));
        const inside = X => [[A, B, C], [B, C, A], [C, A, B]].every(([P, Q, R]) => { const s1 = side(P, Q, X), s2 = side(P, Q, [F(R[0]), F(R[1])]); return s1.eq(0) || s1.cmp(0) === s2.cmp(0); });
        let tmax = null, tout = null;
        for (let d = 2; d <= 12; d++) for (let n = 1; n < d; n++) {
          const t = F(n).div(d);
          if (inside(solve(t))) { if (tmax === null || t.cmp(tmax) > 0) tmax = t; } else if (tout === null || t.cmp(tout) < 0) tout = t;
        }
        const ok = tout === null || tmax.cmp(tout) < 0;   // 在内部的 t 全部小于不在内部的 t，范围是一段
        let tt = null;
        for (let d = 2; d <= 12; d++) for (let n = 1; n < d; n++) { if (tt === null && solve(F(n).div(d))[1].eq(0)) tt = F(n).div(d); }
        return [C1[1], F(36).div(9), lin ? `(${a})+(${b})*t` : '', ok ? `0<t<=${tmax}` : '', tt, '重心'];
      },
    },
    {
      id: '28.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，矩形 $OABC$ 的顶点 $O(0,0)$、$A(8,0)$、$B(8,6)$、$C(0,6)$。点 $P$ 在矩形内部，以 $P$ 为位似中心、位似比为 $k$ 作矩形 $OABC$ 的位似图形（$k>0$ 时对应点在从 $P$ 出发的同一条射线上，$k<0$ 时在 $P$ 的另一侧，到 $P$ 的距离都是原来的 $|k|$ 倍；$k\\ne0$，$k\\ne1$）。<br>(1) 当 $k=-\\frac13$ 时，若得到的矩形整个在矩形 $OABC$ 内（含边界），求点 $P$ 可能在的区域的面积；<br>(2) 若对角线 $OB$ 上存在点 $P$（不与 $O$、$B$ 重合），使得到的矩形与矩形 $OABC$ 重叠部分的面积为 $12$，求 $k$ 的所有可能值。',
      figure: FIG284.c04,
      blanks: [
        { kind: 'num', label: '(1) 区域的面积', answer: '12' },
        { kind: 'text', label: '(2) $k$ 的所有可能值是', answer: '$k=\\frac12$ 或 $k\\le-\\frac12$', options: ['$k=\\frac12$', '$k=\\pm\\frac12$', '$k\\le-\\frac12$', '$k=\\frac12$ 或 $k\\le-\\frac12$', '$|k|\\ge\\frac12$'] },
      ],
      explain: [
        '思路：位似中心不在原点，先自己推出坐标规则；然后横、纵两个方向分开看，各自变成“区间套区间”的问题。第 (2) 问先用面积找必要条件，再构造具体的点 $P$ 说明能取到。',
        '设 $P(p,q)$。点 $M(x,y)$ 的对应点 $M\'$ 在直线 $PM$ 上，$PM\'=|k|PM$。过 $M$、$M\'$、$P$ 作坐标轴的垂线，由平行线分线段成比例：$x\'-p=k(x-p)$，$y\'-q=k(y-q)$。',
        '(1) $k=-\\frac13$：$x\'=\\frac43p-\\frac13x$。$x$ 从 $0$ 到 $8$ 时，$x\'$ 从 $\\frac43p-\\frac83$ 到 $\\frac43p$。整个在 $0\\le x\'\\le8$ 内要 $\\frac43p-\\frac83\\ge0$ 且 $\\frac43p\\le8$，即 $2\\le p\\le6$，长 $4$。同理 $\\frac32\\le q\\le\\frac92$，长 $3$。所以 $P$ 在一个 $4\\times3$ 的矩形里，面积 $12$。',
        '(2) 必要条件：得到的矩形与 $OABC$ 相似，相似比 $|k|$，面积 $48k^2$；重叠部分在它里面，所以 $48k^2\\ge12$，$|k|\\ge\\frac12$。',
        '$k>0$：$x\'$ 的范围是 $p(1-k)$ 到 $p+k(8-p)$。$0<k<1$ 时它在 $0$ 到 $8$ 之间，纵向同理，得到的矩形整个在 $OABC$ 内，重叠面积就是 $48k^2=12$，$k=\\frac12$；$k>1$ 时 $p(1-k)<0$、$p+k(8-p)>8$，反过来 $OABC$ 整个在得到的矩形内，重叠面积是 $48\\ne12$。',
        '$k<0$：记 $t=-k$，由必要条件 $t\\ge\\frac12$。下面说明每个这样的 $t$ 都能找到 $P$：取 $P(8s,6s)$，$s=\\frac1{2(1+t)}$（$0<s<\\frac12$，$P$ 在 $OB$ 上）。$x\'=8s(1+t)-tx=4-tx$，$x$ 从 $0$ 到 $8$ 时 $x\'$ 从 $4-8t$ 到 $4$，而 $4-8t\\le0$，与 $0\\le x\\le8$ 的公共部分是 $0$ 到 $4$；纵向同理是 $0$ 到 $3$。重叠部分是 $4\\times3$ 的矩形，面积恰为 $12$。',
        '综上：$k=\\frac12$ 或 $k\\le-\\frac12$。坑：只解 $48k^2=12$ 得到 $k=\\pm\\frac12$；位似比为负时，得到的矩形可以只有一部分压在原矩形上，$|k|$ 更大也行。',
      ],
      verify: () => {
        // (1) 精确：横向 p 的范围长度 × 纵向 q 的范围长度
        const t1 = F(1).div(3), len = W => F(W).div(t1.add(1)).sub(t1.mul(W).div(t1.add(1)));
        const area = len(8).mul(len(6));
        // (2) 数值：对每个 k 扫描 P(8u,6u)，看重叠面积能否等于 12（介值：扫描到的最小值 ≤12≤ 最大值）
        const ov = (u, k) => {
          const P = [8 * u, 6 * u], f = (c, W) => { const a = c + k * (0 - c), b = c + k * (W - c); return Math.max(0, Math.min(Math.max(a, b), W) - Math.max(Math.min(a, b), 0)); };
          return f(P[0], 8) * f(P[1], 6);
        };
        const can = k => { let lo = Infinity, hi = -Infinity; for (let i = 1; i < 6000; i++) { const v = ov(i / 6000, k) - 12; lo = Math.min(lo, v); hi = Math.max(hi, v); } return lo <= 1e-9 && hi >= -1e-9; };
        // 用各选项对应的条件逐个比对扫描结果，挑出唯一吻合的
        const opts = {
          '$k=\\frac12$': k => k === 0.5,
          '$k=\\pm\\frac12$': k => Math.abs(k) === 0.5,
          '$k\\le-\\frac12$': k => k <= -0.5,
          '$k=\\frac12$ 或 $k\\le-\\frac12$': k => k === 0.5 || k <= -0.5,
          '$|k|\\ge\\frac12$': k => Math.abs(k) >= 0.5,
        };
        const ks = []; for (let i = -40; i <= 40; i++) if (i !== 0 && i !== 10) ks.push(i / 10);
        const got = ks.map(can);
        const fit = Object.keys(opts).filter(o => ks.every((k, i) => opts[o](k) === got[i]));
        return [area, fit.length === 1 ? fit[0] : ''];
      },
    },
    {
      id: '28.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，抛物线 $y=-x^2+6x+7$ 与 $x$ 轴正半轴交于点 $B$，与 $y$ 轴交于点 $C$，顶点为 $D$。以原点为位似中心、位似比为 $k$（$k\\ne1$）作 $\\triangle BCD$ 的位似图形 $\\triangle B\'C\'D\'$（$B\'$、$C\'$、$D\'$ 分别与 $B$、$C$、$D$ 对应）。<br>(1) 若点 $D\'$ 恰好落在这条抛物线上，求 $k$ 和点 $D\'$ 的坐标；<br>(2) 在 (1) 的条件下，点 $P$ 在 $x$ 轴上方，$\\triangle PB\'C\'$ 与 $\\triangle BCD$ 相似，并且点 $P$ 与点 $D$ 是对应顶点（$B\'$、$C\'$ 与 $B$、$C$ 怎样对应不限，顶点不要求按字母顺序对应）。求点 $P$ 的坐标，以及 $\\triangle PB\'C\'$ 与 $\\triangle BCD$ 的相似比（前者比后者）。',
      figure: FIG284.c05,
      blanks: [
        { kind: 'num', label: '(1) $k=$', answer: '-7/9' },
        { kind: 'num', label: '点 $D\'$ 的横坐标', answer: '-7/3' },
        { kind: 'num', label: '点 $D\'$ 的纵坐标', answer: '-112/9' },
        { kind: 'num', label: '(2) 点 $P$ 的横坐标', answer: '-28/9' },
        { kind: 'num', label: '点 $P$ 的纵坐标', answer: '7' },
        { kind: 'num', label: '相似比', answer: '7/9' },
      ],
      explain: [
        '$y=-(x-7)(x+1)$，$B(7,0)$；$C(0,7)$；$y=-(x-3)^2+16$，$D(3,16)$。',
        '(1) $D\'(3k,16k)$ 在抛物线上：$16k=-9k^2+18k+7$，$9k^2-2k-7=0$，$(k-1)(9k+7)=0$，$k=1$（两个三角形重合，舍）或 $k=-\\frac79$。此时 $D\'(-\\frac73,-\\frac{112}9)$，$B\'(-\\frac{49}9,0)$，$C\'(0,-\\frac{49}9)$。',
        '(2) 思路：$P$ 与 $D$ 对应，所以边 $B\'C\'$ 与边 $BC$ 对应，相似比 $=\\frac{B\'C\'}{BC}=|k|=\\frac79$。$\\triangle PB\'C\'$ 在 $B\'$、$C\'$ 处的两个角分别等于 $\\angle B$、$\\angle C$（两种对应），底边 $B\'C\'$ 和两个底角定了，三角形在直线 $B\'C\'$ 的每一侧只有一个，所以 $P$ 一共只有 $4$ 个可能的位置。',
        '① $B\'\\leftrightarrow B$、$C\'\\leftrightarrow C$：位似得到的 $D\'$ 就是一个（$\\triangle D\'B\'C\'\\backsim\\triangle DBC$），另一个在直线 $B\'C\'$ 的另一侧。',
        '② $B\'\\leftrightarrow C$、$C\'\\leftrightarrow B$：$OB\'=OC\'$，$B\'$、$C\'$ 关于直线 $y=x$ 对称。把 $D\'$ 关于 $y=x$ 对称到 $D_1(-\\frac{112}9,-\\frac73)$，$\\triangle D_1C\'B\'\\cong\\triangle D\'B\'C\'$，这是一个。再取 $B\'C\'$ 的中点 $E(-\\frac{49}{18},-\\frac{49}{18})$，把 $D\'$ 关于 $E$ 中心对称到 $D_2$：$D_2=(2\\times(-\\frac{49}{18})+\\frac73,\\ 2\\times(-\\frac{49}{18})+\\frac{112}9)=(-\\frac{28}9,7)$。四边形 $D\'B\'D_2C\'$ 的对角线互相平分，是平行四边形，$\\triangle D_2C\'B\'\\cong\\triangle D\'B\'C\'$，这是另一个（在直线 $B\'C\'$ 的另一侧）。',
        '①中直线 $B\'C\'$ 另一侧的那个点，由同样的对称关系就是 $D_2$ 关于 $y=x$ 的对称点 $(7,-\\frac{28}9)$。四个位置 $D\'(-\\frac73,-\\frac{112}9)$、$(7,-\\frac{28}9)$、$D_1(-\\frac{112}9,-\\frac73)$、$D_2(-\\frac{28}9,7)$ 中，只有 $D_2$ 在 $x$ 轴上方。',
        '所以 $P(-\\frac{28}9,7)$，对应关系是 $P\\leftrightarrow D$、$C\'\\leftrightarrow B$、$B\'\\leftrightarrow C$，相似比 $\\frac79$。验算：$PC\'$ 从 $C\'$ 到 $P$ 横坐标减 $\\frac{28}9$、纵坐标加 $\\frac{112}9$，与 $BD$（横坐标减 $4$、纵坐标加 $16$）方向相同，长度之比 $\\frac79$。',
        '坑：只想到位似的那一个 $D\'$（它在 $x$ 轴下方）；或者以为 $B\'$ 必须对应 $B$，漏掉把 $B\'$、$C\'$ 对调的两种情况。',
      ],
      verify: () => {
        const f = x => F(x).mul(x).neg().add(F(6).mul(x)).add(7);
        const B = [F(7), F(0)], C = [F(0), F(7)], D = [F(3), F(16)];
        let k = null;
        for (let d = 1; d <= 12; d++) for (let n = -40; n <= 40; n++) {
          if (n === 0) continue;
          const kk = F(n).div(d); if (kk.eq(1) || k) continue;
          const Dp = hom284([0, 0], kk, D); if (f(Dp[0]).eq(Dp[1])) k = kk;
        }
        const Bp = hom284([0, 0], k, B), Cp = hom284([0, 0], k, C), Dp = hom284([0, 0], k, D);
        // 用复数（分数实部、虚部）表示相似变换：把 X1→B′、X2→C′，再看 D 去哪里；refl 为真时先关于 x 轴翻折（反向相似）
        const sub = (a, b) => [a[0].sub(b[0]), a[1].sub(b[1])], add = (a, b) => [a[0].add(b[0]), a[1].add(b[1])];
        const mul = (a, b) => [a[0].mul(b[0]).sub(a[1].mul(b[1])), a[0].mul(b[1]).add(a[1].mul(b[0]))];
        const div = (a, b) => { const r = b[0].mul(b[0]).add(b[1].mul(b[1])); return [a[0].mul(b[0]).add(a[1].mul(b[1])).div(r), a[1].mul(b[0]).sub(a[0].mul(b[1])).div(r)]; };
        const cj = a => [a[0], a[1].neg()];
        const Ps = [];
        for (const [X1, X2] of [[B, C], [C, B]]) for (const refl of [false, true]) {
          const g = z => (refl ? cj(z) : z), a = div(sub(Cp, Bp), sub(g(X2), g(X1)));
          Ps.push(add(Bp, mul(a, sub(g(D), g(X1)))));
        }
        const up = Ps.filter(P => P[1].cmp(0) > 0);
        if (up.length !== 1 || !Ps.some(P => P[0].eq(Dp[0]) && P[1].eq(Dp[1]))) return null;
        const ratio = Bp[0].sub(Cp[0]).abs().div(B[0].sub(C[0]).abs());
        return [k, Dp[0], Dp[1], up[0][0], up[0][1], ratio];
      },
    },
  ],
});
