'use strict';

// 上海数学九年级上册 · 27.1 二次函数的概念（课本第 2～4 页）
// 知识范围：形如 y=ax²+bx+c（a、b、c 是常数，a≠0）的函数叫二次函数，自变量取一切实数；
//   识别（先化简再判断、含参数要求 a≠0、指数含字母）；二次项系数、一次项系数、常数项；
//   由实际问题列二次函数表达式，并按实际意义写出自变量的取值范围；求函数值
// 可以使用：六～八年级全部（整式、分式、方程与方程组、不等式、二次根式、一元二次方程及根与系数的关系、勾股定理、四边形），
//   八下第 24～26 章的基础结论（平面直角坐标系、一次函数、反比例函数 y=k/x）
// 还没学：二次函数的图像与性质（开口、对称轴、顶点、增减性、最值都在 27.2）、待定系数法求表达式（27.3）、相似三角形、三角比、圆
// 本节约定：不出求最值、画图像的题；带根号的结果用 real / reals 并要求最简

const SVG271 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  poly: (pts, fill = 'none', dash = false) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  curve: pts => `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  // 坐标轴：x 从 x0 到 x1，y 从 y0 到 y1（数学坐标）
  axes: (m, x0, x1, y0, y1) => {
    const ax = [m([x0, 0]), m([x1, 0])], ay = [m([0, y0]), m([0, y1])];
    const arrow = (p, dir) => (dir === 'x'
      ? `<polygon points="${p[0]},${p[1]} ${p[0] - 8},${p[1] - 4} ${p[0] - 8},${p[1] + 4}" fill="#2b2b2b"/>`
      : `<polygon points="${p[0]},${p[1]} ${p[0] - 4},${p[1] + 8} ${p[0] + 4},${p[1] + 8}" fill="#2b2b2b"/>`);
    return SVG271.seg(ax[0], ax[1], false, 1.2) + arrow(ax[1], 'x') + SVG271.seg(ay[0], ay[1], false, 1.2) + arrow(ay[1], 'y')
      + SVG271.text('<tspan font-style="italic">x</tspan>', ax[1], -2, 12) + SVG271.text('<tspan font-style="italic">y</tspan>', ay[1], 12, 2)
      + SVG271.text('O', m([0, 0]), -10, 10);
  },
};

const I271 = s => `<tspan font-style="italic">${s}</tspan>`;

// 用等距取样的二阶差分判断“是不是二次函数”：二阶差分处处相等且不为 0
const quad271 = f => {
  const v = [1.3, 2.1, 2.9, 3.7, 4.5, 5.3].map(f);
  const d1 = v.slice(1).map((y, i) => y - v[i]);
  const d2 = d1.slice(1).map((y, i) => y - d1[i]);
  return d2.every(d => Math.abs(d - d2[0]) < 1e-7) && Math.abs(d2[0]) > 1e-7;
};
// 一次函数：二阶差分为 0，一阶差分不为 0
const linear271 = f => {
  const v = [1.3, 2.1, 2.9, 3.7].map(f);
  const d1 = v.slice(1).map((y, i) => y - v[i]);
  return d1.every(d => Math.abs(d - d1[0]) < 1e-9) && Math.abs(d1[0]) > 1e-9;
};
const R271 = v => Math.round(v * 1e9) / 1e9;

const FIG271 = (() => {
  const S = SVG271;
  const out = {};

  // b07：长方形铁皮四角剪去正方形
  {
    const k = 6, ox = 30, oy = 20, W = 30 * k, H = 20 * k, c = 5 * k;
    let g = S.poly([[ox, oy], [ox + W, oy], [ox + W, oy + H], [ox, oy + H]]);
    for (const [x, y] of [[ox, oy], [ox + W - c, oy], [ox + W - c, oy + H - c], [ox, oy + H - c]]) {
      g += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="#d9d9d9" stroke="#2b2b2b" stroke-width="1.2"/>`;
    }
    g += S.poly([[ox + c, oy + c], [ox + W - c, oy + c], [ox + W - c, oy + H - c], [ox + c, oy + H - c]], 'none', true);
    g += S.text('30 cm', [ox + W / 2, oy + H], 0, 16) + S.text('20 cm', [ox + W, oy + H / 2], 26, 0);
    g += S.text(I271('x'), [ox + c / 2, oy], 0, -12) + S.text(I271('x'), [ox, oy + c / 2], -10, 0);
    out.b07 = S.wrap(W + 70, H + 50, g);
  }

  // e03：靠墙围矩形，中间一道隔断（示意图按 AB=8 画）
  {
    const k = 13, ox = 40, oy = 34, x = 8, bc = 30 - 3 * x;
    const A = [ox, oy], D = [ox + bc * k, oy], B = [ox, oy + x * k], C = [ox + bc * k, oy + x * k];
    const E = [(A[0] + D[0]) / 2, oy], F = [(B[0] + C[0]) / 2, B[1]];
    let g = S.seg([ox - 20, oy], [ox + 12 * k + 20, oy], false, 2.4);
    for (let t = ox - 16; t < ox + 12 * k + 20; t += 10) g += S.seg([t, oy], [t + 7, oy - 7], false, 1);
    g += S.text('墙（长 12 m）', [ox + 6 * k + 30, oy], 0, -20, 13);
    g += S.seg(A, B) + S.seg(B, C) + S.seg(C, D) + S.seg(E, F);
    g += S.text('A', A, -10, -10) + S.text('D', D, 10, -10) + S.text('B', B, -10, 8) + S.text('C', C, 10, 8);
    g += S.text(I271('x'), [ox, oy + x * k / 2], -12, 0);
    out.e03 = S.wrap(12 * k + 90, x * k + 70, g);
  }

  // e04：线段 AB 上的点 P 与矩形 OMPN
  {
    const m = S.map(20, 30, 150), A = [8, 0], B = [0, 6], P = [3, 6 - 0.75 * 3];
    let g = S.axes(m, -0.8, 9.6, -0.8, 6.9);
    g += S.seg(m(A), m(B));
    g += S.poly([m([0, 0]), m([P[0], 0]), m(P), m([0, P[1]])], '#eef3fb', true);
    g += S.dot(m(P)) + S.text('P', m(P), 9, -9) + S.text('A', m(A), 4, 12) + S.text('B', m(B), -12, -2);
    g += S.text('M', m([P[0], 0]), 0, 12) + S.text('N', m([0, P[1]]), -12, 0);
    out.e04 = S.wrap(240, 175, g);
  }

  // e06：矩形 ABCD 中的四边形 EFGH（示意图按 x=1.5 画）
  {
    const m = S.map(30, 30, 150), x = 1.5;
    const A = [0, 4], B = [6, 4], C = [6, 0], D = [0, 0];
    const E = [x, 4], F = [6, 4 - x], G = [6 - x, 0], H = [0, x];
    let g = S.poly([A, B, C, D].map(m)) + S.poly([E, F, G, H].map(m), '#eef3fb');
    g += S.text('A', m(A), -10, -8) + S.text('B', m(B), 10, -8) + S.text('C', m(C), 10, 8) + S.text('D', m(D), -10, 8);
    g += S.text('E', m(E), 0, -12) + S.text('F', m(F), 12, 0) + S.text('G', m(G), 0, 12) + S.text('H', m(H), -12, 0);
    out.e06 = S.wrap(240, 185, g);
  }

  // c03：矩形中的两个动点（示意图按 t=2.5 画）
  {
    const m = S.map(24, 30, 175), t = 2.5;
    const A = [0, 0], B = [8, 0], C = [8, 6], D = [0, 6], P = [2 * t, 0], Q = [0, t];
    let g = S.poly([A, B, C, D].map(m)) + S.poly([C, P, Q].map(m), '#eef3fb');
    g += S.dot(m(P)) + S.dot(m(Q));
    g += S.text('A', m(A), -10, 8) + S.text('B', m(B), 10, 8) + S.text('C', m(C), 10, -8) + S.text('D', m(D), -10, -8);
    g += S.text('P', m(P), 0, 12) + S.text('Q', m(Q), -12, 0);
    out.c03 = S.wrap(260, 205, g);
  }

  // c04：反比例函数 y=6/x、直线 y=x+b 与 △OAB（示意图按 b=-1、m=4.2 画）
  {
    const m = S.map(19, 34, 185), a = 4.2, b = -1;
    let g = S.axes(m, -1.2, 8.6, -1.4, 8.6);
    const hyp = [];
    for (let x = 0.7; x <= 8.2; x += 0.08) hyp.push(m([x, 6 / x]));
    g += S.curve(hyp) + S.curve([m([-0.4, -0.4 + b]), m([8.2, 8.2 + b])]);
    const A = [a, 6 / a], B = [a, a + b];
    g += S.poly([[0, 0], A, B].map(m), '#eef3fb');
    g += S.seg(m([a, 0]), m(A), true);
    g += S.dot(m(A)) + S.dot(m(B)) + S.text('A', m(A), 11, 6) + S.text('B', m(B), -11, -6);
    g += S.text(`${I271('y')}=${I271('x')}+${I271('b')}`, m([6.4, 6.4 + b]), -30, -2, 13) + S.text(`${I271('y')}=6/${I271('x')}`, m([7.6, 0.8]), -4, -8, 13);
    out.c04 = S.wrap(220, 215, g);
  }

  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/27.1',
  title: '二次函数的概念',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，20 题答案全部一致。第一轮打回：c04（分段去绝对值解两个方程）、c05（第 (3) 问一步看出 t²=−1）未达挑战档；c01 人数与张数混用、第 (3) 问贴近 27.2 的增减性；b06② 与 b01A、卡片同一个平方项抵消的坑；e01(1) 与 b05 换数版。处理：c01 统一按购票张数计价，(2) 拆成最小值、最大值两空，(3) 只用作差因式分解；c04 改为直线 y=x+b，问 S=5 的 m 个数与 b 的关系；c05(3) 改为运动路线与 y=kx 有两个公共点求 k；b06② 换成 x 在根号里；e01(1) 改为二次项系数等于一次项系数。第二轮整节通过；另修 c05 题干 \\; 少一个反斜杠。' },
  intro: [
    {
      title: '什么是二次函数',
      body: '变量 $y$ 随 $x$ 变化，如果表达式能写成 $y=ax^2+bx+c$（$a$、$b$、$c$ 是常数，且 $a\\ne0$），$y$ 就是 $x$ 的二次函数。关键是 $x$ 的最高次数正好是 $2$：$b$、$c$ 可以是 $0$，$a$ 绝不能是 $0$。没有特别说明时，自变量 $x$ 可以取一切实数。',
      example: '$y=-x^2+5$ 是二次函数（$a=-1$，$b=0$，$c=5$）；$y=3x-1$ 是一次函数，不是二次函数。',
    },
    {
      title: '先整理，再判断',
      body: '表达式里有括号时，先展开、合并同类项，再看 $x$ 的最高次数。等号右边必须是关于 $x$ 的整式，$x$ 出现在分母或根号里的都不是二次函数。',
      example: '$y=(x+2)(x-2)-x$ 整理成 $y=x^2-x-4$，是二次函数；$y=x(x+1)-x^2$ 整理后是 $y=x$，不是。',
      pitfall: '只看外形“有平方”就下结论，平方项可能在整理时抵消掉。',
    },
    {
      title: '二次项系数、一次项系数、常数项',
      body: '把式子整理成 $y=ax^2+bx+c$ 的形式后再读：$a$ 是二次项系数，$b$ 是一次项系数，$c$ 是常数项。系数连同前面的符号一起读，缺哪一项，那一项的系数就是 $0$。',
      example: '$y=\\frac12x-2x^2$ 按降幂排成 $y=-2x^2+\\frac12x$，二次项系数 $-2$，一次项系数 $\\frac12$，常数项 $0$。',
    },
    {
      title: '系数或指数里有字母',
      body: '题目说“是二次函数”时，二次项系数必须不为 $0$；如果 $x$ 的指数里含字母，指数要等于 $2$。两个条件要一起检查。说“是一次函数”时，也要同时检查一次项系数不为 $0$。',
      example: '$y=(k+4)x^2-x$ 是二次函数，只要 $k\\ne-4$；当 $k=-4$ 时它变成 $y=-x$，是一次函数。',
    },
    {
      title: '由实际问题列二次函数',
      body: '按题意用 $x$ 表示出各个量，列出表达式后整理成一般形式。实际问题里自变量不再是一切实数：长度要为正数，人数、件数要是整数，还可能受墙长、材料等条件限制。',
      example: '直角三角形两条直角边的和是 $10$，一条直角边为 $x$，面积 $y=\\frac12x(10-x)$，即 $y=-\\frac12x^2+5x$。两条直角边都为正，所以 $0<x<10$。',
    },
    {
      title: '求函数值',
      body: '把自变量的值代入表达式计算。代入负数或带根号的数时要加括号，注意 $-x^2$ 表示“先平方再取相反数”。',
      example: '$y=2x^2-x$，当 $x=-3$ 时，$y=2\\times(-3)^2-(-3)=18+3=21$。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '27.1-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列函数中，$y$ 一定是 $x$ 的二次函数的是（　　）（多选）',
      options: [
        '$y=(x-3)^2-x^2$',
        '$y=x(1-x)$',
        '$y=\\dfrac{1}{x^2}+1$',
        '$y=\\dfrac{\\sqrt2}{3}x^2$',
        '$y=ax^2+bx+c$（$a$、$b$、$c$ 是常数）',
      ],
      answer: [1, 3],
      explain: [
        'A：展开得 $y=x^2-6x+9-x^2=-6x+9$，平方项抵消了，是一次函数。坑：看到平方就选。',
        'B：$y=-x^2+x$，二次项系数 $-1$，是。C：$x^2$ 在分母里，右边不是整式，不是。',
        'D：二次项系数 $\\frac{\\sqrt2}{3}$ 是不为 $0$ 的常数，是二次函数（系数是无理数也可以）。',
        'E：没有说明 $a\\ne0$，$a=0$ 时就不是二次函数，所以“不一定”。选 BD。',
      ],
      verify: () => {
        const cases = [
          [x => (x - 3) ** 2 - x ** 2],
          [x => x * (1 - x)],
          [x => 1 / x ** 2 + 1],
          [x => (Math.SQRT2 / 3) * x * x],
          [[1, 2, 3], [0, 2, 3], [-2, 0, 1]].map(([a, b, c]) => x => a * x * x + b * x + c),
        ];
        return cases.map((fs, i) => (fs.every(quad271) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '27.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '二次函数 $y=3-(2x-1)(x+3)$ 化成一般形式后，求它的各项系数。',
      blanks: [
        { kind: 'num', label: '二次项系数是', answer: '-2' },
        { kind: 'num', label: '一次项系数是', answer: '-5' },
        { kind: 'num', label: '常数项是', answer: '6' },
      ],
      explain: [
        '$(2x-1)(x+3)=2x^2+6x-x-3=2x^2+5x-3$。',
        '$y=3-(2x^2+5x-3)=-2x^2-5x+6$。坑：去括号时只改了第一项的符号，得到 $-2x^2+5x-3+3$。',
        '所以二次项系数 $-2$，一次项系数 $-5$，常数项 $6$。',
      ],
      verify: () => { const p = Poly.of('3-(2x-1)(x+3)'); return [p.coef('x^2'), p.coef('x'), p.coef('')]; },
    },
    {
      id: '27.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '已知二次函数 $y=-x^2+2x-3$，求下列自变量对应的函数值。',
      blanks: [
        { kind: 'num', label: '(1) 当 $x=-2$ 时，$y=$', answer: '-11' },
        { kind: 'num', label: '(2) 当 $x=1-\\sqrt2$ 时，$y=$', answer: '-4' },
      ],
      explain: [
        '(1) $y=-(-2)^2+2\\times(-2)-3=-4-4-3=-11$。坑：把 $-(-2)^2$ 算成 $4$。',
        '(2) $x^2=(1-\\sqrt2)^2=3-2\\sqrt2$，$2x=2-2\\sqrt2$。',
        '$y=-(3-2\\sqrt2)+(2-2\\sqrt2)-3=-3+2\\sqrt2+2-2\\sqrt2-3=-4$。坑：$-(3-2\\sqrt2)$ 去括号时 $2\\sqrt2$ 没变号，结果带着根号。',
      ],
      verify: () => { const f = x => -x * x + 2 * x - 3; return [f(-2), R271(f(1 - Math.SQRT2))]; },
    },
    {
      id: '27.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '若函数 $y=(m+2)x^{m^2-2}+3x-1$ 是关于 $x$ 的二次函数，求 $m$ 的值。',
      blanks: [{ kind: 'nums', label: '$m=$（有几个填几个，用逗号隔开）', answer: ['2'] }],
      explain: [
        '要出现二次项，指数 $m^2-2=2$，得 $m^2=4$，$m=2$ 或 $m=-2$。',
        '同时二次项系数 $m+2\\ne0$，$m\\ne-2$。$m=-2$ 时函数变成 $y=3x-1$，是一次函数。',
        '所以 $m=2$。坑：只解指数的方程，把 $m=-2$ 也填上。',
      ],
      verify: () => {
        const ms = [];
        for (let m = -10; m <= 10; m++) if (m * m - 2 === 2 && m + 2 !== 0 && quad271(x => (m + 2) * x ** (m * m - 2) + 3 * x - 1)) ms.push(m);
        return ms;
      },
    },
    {
      id: '27.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '若函数 $y=(k^2-9)x^2+(k-3)x+2$ 是关于 $x$ 的一次函数，求 $k$ 的值。',
      blanks: [{ kind: 'nums', label: '$k=$（有几个填几个，用逗号隔开）', answer: ['-3'] }],
      explain: [
        '是一次函数，二次项必须消失：$k^2-9=0$，$k=3$ 或 $k=-3$。',
        '还要一次项系数 $k-3\\ne0$。$k=3$ 时函数是 $y=2$，没有一次项，不是一次函数，舍去。',
        '所以 $k=-3$，此时 $y=-6x+2$。坑：忘了检查一次项系数，填上 $k=3$。',
      ],
      verify: () => {
        const ks = [];
        for (let k = -10; k <= 10; k++) if (linear271(x => (k * k - 9) * x * x + (k - 3) * x + 2)) ks.push(k);
        return ks;
      },
    },
    {
      id: '27.1-b06',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，正确的有（　　）<br>① 二次函数 $y=ax^2+bx+c$ 中，$b$ 和 $c$ 可以同时为 $0$；<br>② $y=2x^2-3\\sqrt{x}$ 是二次函数；<br>③ 二次函数 $y=x(3-x)$ 的一次项系数是 $3$；<br>④ 由实际问题得到的二次函数，自变量的取值范围要根据实际意义确定；<br>⑤ 若 $a$ 是常数，则 $y=ax^2$ 是 $x$ 的二次函数。',
      options: ['$1$ 个', '$2$ 个', '$3$ 个', '$4$ 个'],
      answer: 2,
      explain: [
        '① 对：只要 $a\\ne0$，比如 $y=2x^2$。② 错：$x$ 在根号里，$-3\\sqrt{x}$ 不是 $x$ 的整式，所以右边不是整式，不是二次函数（虽然它有不为 $0$ 的二次项 $2x^2$）。',
        '③ 对：$y=-x^2+3x$，一次项系数是 $3$。④ 对：比如长度要为正数，人数要是整数。',
        '⑤ 错：没有说 $a\\ne0$，$a=0$ 时 $y=0$。所以正确的是 ①③④，共 $3$ 个，选 C。',
        '坑：看到 ② 有 $2x^2$ 就判对；把 ③ 看成“二次项系数 $3$”而判错；或者忽略 ⑤ 里 $a$ 可能为 $0$。',
      ],
      verify: () => {
        const t = [
          quad271(x => 2 * x * x),
          quad271(x => 2 * x * x - 3 * Math.sqrt(x)),
          Poly.of('x(3-x)').coef('x').eq(F(3)),
          true,  // ④ 是概念判断
          [1, 0, -2].every(a => quad271(x => a * x * x)),
        ];
        return t.filter(Boolean).length - 1;
      },
    },
    {
      id: '27.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '一块长 $30\\,\\text{cm}$、宽 $20\\,\\text{cm}$ 的长方形铁皮，在四个角各剪去一个边长为 $x\\,\\text{cm}$ 的正方形，再折成一个无盖的盒子（如图）。设盒子的底面积为 $S\\,\\text{cm}^2$。',
      figure: FIG271.b07,
      blanks: [
        { kind: 'expr', label: '(1) $S$ 关于 $x$ 的函数表达式（化成一般形式）：$S=$', answer: '4x^2-100x+600' },
        { kind: 'ineq', label: '(2) 自变量 $x$ 的取值范围是', answer: '0<x<10' },
      ],
      explain: [
        '底面的长是 $(30-2x)\\,\\text{cm}$，宽是 $(20-2x)\\,\\text{cm}$，$S=(30-2x)(20-2x)=4x^2-100x+600$。',
        '长、宽都要为正：$30-2x>0$ 且 $20-2x>0$，再加上 $x>0$，得 $0<x<10$。',
        '坑：只看长边得到 $0<x<15$；$x=12$ 时宽 $20-24<0$，根本剪不出来。',
      ],
      verify: () => {
        const p = Poly.of('(30-2x)(20-2x)');
        return [String(p), `0<x<${Math.min(30, 20) / 2}`];
      },
    },
    {
      id: '27.1-b08',
      level: 'basic',
      type: 'choice',
      stem: '有 $n$ 支球队参加比赛，每两支球队之间都恰好比赛一场。设比赛的总场数为 $y$，下列关于 $y$ 与 $n$ 的函数表达式及自变量取值范围的说法，正确的是（　　）',
      options: [
        '$y=n^2-n$，$n$ 是大于 $1$ 的整数',
        '$y=\\frac12n^2-\\frac12n$，$n$ 是大于 $1$ 的整数',
        '$y=\\frac12n^2-\\frac12n$，$n$ 取一切实数',
        '$y=\\frac12n^2-\\frac12n$，$n>0$',
      ],
      answer: 1,
      explain: [
        '每支队都要和另外 $n-1$ 支队各赛一场，$n(n-1)$ 把每场比赛算了两次（甲对乙、乙对甲是同一场），所以 $y=\\frac12n(n-1)=\\frac12n^2-\\frac12n$。',
        '球队数是整数，至少要有 $2$ 支队才能比赛，所以 $n$ 是大于 $1$ 的整数。',
        '坑：A 每场算了两遍；C、D 没考虑“队数必须是整数”这个实际意义。选 B。',
      ],
      verify: () => {
        let half = true, full = true;
        for (let n = 2; n <= 9; n++) {
          let games = 0;
          for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) games++;
          if (games !== (n * n - n) / 2) half = false;
          if (games !== n * n - n) full = false;
        }
        return half && !full ? 1 : 0;
      },
    },
    {
      id: '27.1-b09',
      level: 'basic',
      type: 'choice',
      stem: '一个长方体的底面是边长为 $a$ 的正方形，高为 $h$，它的表面积 $S=2a^2+4ah$。下列判断正确的是（　　）',
      options: [
        '$h$ 一定时，$S$ 是 $a$ 的二次函数；$a$ 一定时，$S$ 是 $h$ 的二次函数',
        '$h$ 一定时，$S$ 是 $a$ 的二次函数；$a$ 一定时，$S$ 是 $h$ 的一次函数，但不是正比例函数',
        '$h$ 一定时，$S$ 是 $a$ 的一次函数；$a$ 一定时，$S$ 是 $h$ 的二次函数',
        '$h$ 一定时，$S$ 是 $a$ 的二次函数；$a$ 一定时，$S$ 是 $h$ 的正比例函数',
      ],
      answer: 1,
      explain: [
        '$h$ 一定时，把 $h$ 看成常数：$S=2a^2+(4h)a$，关于 $a$ 是二次式，二次项系数 $2\\ne0$，是 $a$ 的二次函数。',
        '$a$ 一定时，$S=(4a)h+2a^2$，关于 $h$ 是一次式，一次项系数 $4a\\ne0$，是一次函数；常数项 $2a^2\\ne0$，所以不是正比例函数。',
        '坑：把 $4ah$ 当成二次项（它对 $h$ 只是一次）；或忘了常数项 $2a^2$ 而选 D。选 B。',
      ],
      verify: () => {
        const S = (a, h) => 2 * a * a + 4 * a * h;
        const qa = quad271(a => S(a, 3)), lh = linear271(h => S(2, h)), prop = S(2, 0) === 0;
        if (qa && lh && !prop) return 1;
        if (qa && lh && prop) return 3;
        return qa ? 0 : 2;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '27.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知关于 $x$ 的函数 $y=(m^2-3m+2)x^2+(m-1)x+m$。',
      blanks: [
        { kind: 'nums', label: '(1) 它是二次函数，且二次项系数与一次项系数相等时，$m=$（有几个填几个，用逗号隔开）', answer: ['3'] },
        { kind: 'nums', label: '(2) 它是二次函数，并且当 $x=1$ 时 $y=3$，则 $m=$（有几个填几个，用逗号隔开）', answer: ['-1'] },
        { kind: 'num', label: '(3) 在 (2) 的条件下，当 $x=-\\frac12$ 时，$y=$', answer: '3/2' },
      ],
      explain: [
        '(1) 令 $m^2-3m+2=m-1$，即 $m^2-4m+3=0$，$(m-1)(m-3)=0$，$m=1$ 或 $3$。$m=1$ 时两个系数都是 $0$，函数是 $y=1$，不是二次函数，舍去。所以 $m=3$，此时 $y=2x^2+2x+3$。坑：解出方程就直接填 $m=1$、$3$。',
        '(2) 当 $x=1$ 时 $y=(m^2-3m+2)+(m-1)+m=m^2-m+1$。令它等于 $3$：$m^2-m-2=0$，$m=2$ 或 $m=-1$。',
        '是二次函数要求 $m^2-3m+2=(m-1)(m-2)\\ne0$，即 $m\\ne1$ 且 $m\\ne2$。$m=2$ 时二次项系数为 $0$，函数是 $y=x+2$，舍去，所以 $m=-1$。',
        '(3) $m=-1$ 时 $y=6x^2-2x-1$，当 $x=-\\frac12$ 时 $y=6\\times\\frac14+1-1=\\frac32$。',
        '坑：(2) 解出两个值不回头检查二次项系数，把 $m=2$ 也填上。',
      ],
      verify: () => {
        const fn = m => x => (m * m - 3 * m + 2) * x * x + (m - 1) * x + m;
        const lin = [], q = [];
        for (let m = -10; m <= 10; m++) {
          if (quad271(fn(m)) && m * m - 3 * m + 2 === m - 1) lin.push(m);
          if (quad271(fn(m)) && fn(m)(1) === 3) q.push(m);
        }
        const m = q[0], x = F(-1).div(F(2));
        return [lin, q, F(m * m - 3 * m + 2).mul(x).mul(x).add(F(m - 1).mul(x)).add(F(m))];
      },
    },
    {
      id: '27.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $y=y_1+y_2$，其中 $y_1$ 与 $x^2$ 成正比例，$y_2$ 与 $x-2$ 成正比例。当 $x=1$ 时 $y=3$；当 $x=-1$ 时 $y=-1$。',
      blanks: [
        { kind: 'expr', label: '(1) $y$ 关于 $x$ 的函数表达式：$y=$', answer: '5x^2+2x-4' },
        { kind: 'num', label: '(2) 当 $x=-\\frac25$ 时，$y=$', answer: '-4' },
      ],
      explain: [
        '两个正比例关系的比例系数不一定相同，要分别设：$y_1=k_1x^2$，$y_2=k_2(x-2)$（$k_1$、$k_2$ 都不为 $0$），$y=k_1x^2+k_2(x-2)$。坑：只设一个 $k$。',
        '$x=1$：$k_1-k_2=3$；$x=-1$：$k_1-3k_2=-1$。两式相减得 $2k_2=4$，$k_2=2$，$k_1=5$。',
        '所以 $y=5x^2+2(x-2)=5x^2+2x-4$，二次项系数 $5\\ne0$，确实是二次函数。',
        '(2) $y=5\\times\\frac4{25}+2\\times(-\\frac25)-4=\\frac45-\\frac45-4=-4$。',
      ],
      verify: () => {
        // k1 - k2 = 3，k1 - 3k2 = -1
        const k2 = F(3 - -1).div(F(2)), k1 = F(3).add(k2);
        const p = Poly.of(`${k1}x^2+${k2}(x-2)`);
        return [String(p), p.at({ x: F(-2).div(F(5)) })];
      },
    },
    {
      id: '27.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，用总长 $30\\,\\text{m}$ 的篱笆，一面靠墙（墙长 $12\\,\\text{m}$），围成中间隔有一道篱笆的矩形花圃 $ABCD$，隔断与 $AB$ 平行。设 $AB$ 的长为 $x\\,\\text{m}$，花圃的面积为 $S\\,\\text{m}^2$。（示意图不按比例）',
      figure: FIG271.e03,
      blanks: [
        { kind: 'expr', label: '(1) $S=$（化成一般形式）', answer: '-3x^2+30x' },
        { kind: 'ineq', label: '(2) 自变量 $x$ 的取值范围是', answer: '6≤x<10' },
        { kind: 'nums', label: '(3) 花圃面积为 $63\\,\\text{m}^2$ 时，$x=$（有几个填几个，用逗号隔开）', answer: ['7'] },
      ],
      explain: [
        '垂直于墙的篱笆有 $3$ 段（$AB$、$CD$ 和隔断），所以 $BC=30-3x$，$S=x(30-3x)=-3x^2+30x$。',
        '$BC$ 要为正，又不能超过墙长：$0<30-3x\\le12$，解得 $6\\le x<10$。坑：忘了墙长，写成 $0<x<10$。',
        '(3) $-3x^2+30x=63$，即 $x^2-10x+21=0$，$x=3$ 或 $x=7$。',
        '$x=3$ 时 $BC=21>12$，墙不够长，舍去；$x=7$ 时 $BC=9$，符合。所以 $x=7$。',
      ],
      verify: () => {
        const S = Poly.of('x(30-3x)');
        const lo = F(30 - 12).div(F(3)), hi = F(30).div(F(3));
        const xs = [];
        for (let x = 1; x < 10; x++) if (S.at({ x: F(x) }).eq(F(63)) && F(x).sub(lo).n >= 0n && F(x).sub(hi).n < 0n) xs.push(x);
        return [String(S), `${lo}≤x<${hi}`, xs];
      },
    },
    {
      id: '27.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，在平面直角坐标系中，$A(8,0)$，$B(0,6)$。点 $P(m,n)$ 在线段 $AB$ 上（不与 $A$、$B$ 重合），$PM\\perp x$ 轴于点 $M$，$PN\\perp y$ 轴于点 $N$。设矩形 $OMPN$ 的面积为 $S$。',
      figure: FIG271.e04,
      blanks: [
        { kind: 'expr', label: '(1) 用 $m$ 表示：$S=$（化成一般形式）', answer: '-3/4m^2+6m', vars: ['m'] },
        { kind: 'ineq', var: 'm', label: '$m$ 的取值范围是', answer: '0<m<8' },
        { kind: 'expr', label: '(2) 改用 $P$ 的纵坐标 $n$ 表示：$S=$（化成一般形式）', answer: '-4/3n^2+8n', vars: ['n'] },
        { kind: 'ineq', var: 'n', label: '$n$ 的取值范围是', answer: '0<n<6' },
      ],
      explain: [
        '直线 $AB$：设 $y=kx+b$，过 $(0,6)$ 得 $b=6$，过 $(8,0)$ 得 $8k+6=0$，$k=-\\frac34$，所以 $y=-\\frac34x+6$。',
        '(1) $P$ 在第一象限，$OM=m$，$PM=n=-\\frac34m+6$，$S=m(-\\frac34m+6)=-\\frac34m^2+6m$，$P$ 在 $A$、$B$ 之间，所以 $0<m<8$。',
        '(2) 由 $n=-\\frac34m+6$ 得 $m=8-\\frac43n$，$S=n(8-\\frac43n)=-\\frac43n^2+8n$，$0<n<6$。',
        '同一个面积，换一个自变量也是二次函数，系数和取值范围都跟着变。坑：(2) 里把 $m$ 和 $n$ 的关系写反成 $m=-\\frac34n+6$。',
      ],
      verify: () => {
        const k = F(-6).div(F(8));  // 直线 AB 的斜率
        const Sm = Poly.of(`m((${k})m+6)`);
        const Sn = Poly.of(`n((6-n)/(${k.neg()}))`);
        return [String(Sm), `0<m<${F(-6).div(k)}`, String(Sn), '0<n<6'];
      },
    },
    {
      id: '27.1-e05',
      level: 'extended',
      type: 'multi',
      stem: '下列说法中，正确的是（　　）（多选）',
      options: [
        '若 $y$ 是 $x$ 的二次函数，$x$ 是 $t$ 的一次函数，则 $y$ 是 $t$ 的二次函数',
        '若 $y$ 是 $x$ 的一次函数，$x$ 是 $t$ 的二次函数，则 $y$ 是 $t$ 的二次函数',
        '若 $y$ 是 $x$ 的二次函数，$x$ 是 $t$ 的二次函数，则 $y$ 是 $t$ 的二次函数',
        '两个关于 $x$ 的二次函数相加，得到的一定是 $x$ 的二次函数',
        '关于 $x$ 的二次函数减去关于 $x$ 的一次函数，得到的一定是 $x$ 的二次函数',
      ],
      answer: [0, 1, 4],
      explain: [
        'A：设 $y=ax^2+bx+c$（$a\\ne0$），$x=kt+p$（$k\\ne0$）。代入后 $t^2$ 只来自 $a(kt+p)^2$，系数是 $ak^2\\ne0$，对。',
        'B：设 $y=kx+p$（$k\\ne0$），$x=at^2+bt+c$（$a\\ne0$），$y=kat^2+kbt+kc+p$，二次项系数 $ka\\ne0$，对。',
        'C：反例 $y=x^2$，$x=t^2$，$y=t^4$，最高次数是 $4$，错。坑：以为“二次套二次还是二次”。',
        'D：反例 $y_1=x^2+x$，$y_2=-x^2+1$，相加得 $x+1$，二次项抵消了，错。',
        'E：一次函数没有 $x^2$ 项，相减不影响二次项系数 $a\\ne0$，对。选 ABE。',
      ],
      verify: () => {
        const params = [[1, 2, -3, 2, 1], [-2, 0, 5, -1, 3], [0.5, -1, 0, 3, -2]];
        const A = params.every(([a, b, c, k, p]) => quad271(t => { const x = k * t + p; return a * x * x + b * x + c; }));
        const B = params.every(([a, b, c, k, p]) => quad271(t => k * (a * t * t + b * t + c) + p));
        const C = quad271(t => (t * t) ** 2);
        const D = quad271(x => (x * x + x) + (-x * x + 1));
        const E = params.every(([a, b, c, k, p]) => quad271(x => a * x * x + b * x + c - (k * x + p)));
        return [A, B, C, D, E].map((v, i) => (v ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '27.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=6$，$BC=4$。点 $E$、$F$、$G$、$H$ 分别在边 $AB$、$BC$、$CD$、$DA$ 上（可以与矩形的顶点重合），且 $AE=BF=CG=DH=x$。设四边形 $EFGH$ 的面积为 $y$（四个点有重合时，按所围成图形的面积计算）。',
      figure: FIG271.e06,
      blanks: [
        { kind: 'expr', label: '(1) $y=$（化成一般形式）', answer: '2x^2-10x+24' },
        { kind: 'ineq', label: '(2) 自变量 $x$ 的取值范围是', answer: '0≤x≤4' },
        { kind: 'nums', label: '(3) 四边形 $EFGH$ 的面积是矩形 $ABCD$ 面积的一半时，$x=$（全部填出，用逗号隔开）', answer: ['2', '3'] },
      ],
      explain: [
        '四个角上的直角三角形：$\\triangle AEH$ 两直角边 $x$、$4-x$；$\\triangle EBF$ 两直角边 $6-x$、$x$；$\\triangle FCG$ 两直角边 $4-x$、$x$；$\\triangle GDH$ 两直角边 $6-x$、$x$。',
        '$y=24-2\\times\\frac12x(4-x)-2\\times\\frac12x(6-x)=24-x(4-x)-x(6-x)=2x^2-10x+24$。',
        '(2) $E$、$G$ 在长为 $6$ 的边上，要 $0\\le x\\le6$；$F$、$H$ 在长为 $4$ 的边上，要 $0\\le x\\le4$。合起来 $0\\le x\\le4$。坑：只看 $AB=6$ 写成 $x\\le6$；或者把可以重合的端点去掉。',
        '(3) $2x^2-10x+24=12$，即 $x^2-5x+6=0$，$x=2$ 或 $x=3$，都在范围内。',
      ],
      verify: () => {
        const tri = (u, v) => Poly.of(`(${u})(${v})/2`);
        const y = Poly.num(6 * 4).sub(tri('x', '4-x')).sub(tri('6-x', 'x')).sub(tri('4-x', 'x')).sub(tri('6-x', 'x'));
        const xs = [];
        for (let x = 0; x <= 4; x++) if (y.at({ x: F(x) }).eq(F(12))) xs.push(x);
        return [String(y), `0≤x≤${Math.min(6, 4)}`, xs];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '27.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '某景区团体票按购票张数计价：购票不超过 $20$ 张时，每张 $120$ 元；超过 $20$ 张时，每多买 $1$ 张，所有票每张降价 $2$ 元，但每张票价不低于 $60$ 元。团队可以多买几张票（多出的票作废）。设购票张数为 $x$，总票款为 $y$ 元。',
      blanks: [
        { kind: 'expr', label: '(1) 当 $x>20$ 且票价还在按“每多买 $1$ 张降 $2$ 元”计算时，$y=$（化成一般形式）', answer: '-2x^2+160x' },
        { kind: 'num', label: '(2) 第 (1) 问的表达式适用的购票张数 $x$ 中，最小值是', answer: '21' },
        { kind: 'num', label: '最大值是', answer: '50' },
        { kind: 'num', label: '(3) 一个团队有若干人，每人至少要有一张票。如果多买几张票反而比恰好按人数买票更省钱，这样的团队人数共有几种？', answer: '19' },
      ],
      explain: [
        '(1)(2) 超过 $20$ 张时每张票价 $120-2(x-20)=160-2x$ 元。票价不低于 $60$：$160-2x\\ge60$，$x\\le50$。所以 $x=21,22,\\dots,50$ 时 $y=x(160-2x)=-2x^2+160x$，最小值 $21$，最大值 $50$；$x>50$ 时每张 $60$ 元，$y=60x$。坑：最小值写成 $20$（$20$ 张还按每张 $120$ 元算）。',
        '(3) 思路：团队人数为 $x$，看有没有更大的张数 $n$ 使 $y(n)<y(x)$。两种张数都在 $21$～$50$ 这一段时，作差再分解：$y(x)-y(n)=160(x-n)-2(x^2-n^2)=(x-n)(160-2x-2n)$。',
        '因为 $x-n<0$，所以 $y(n)<y(x)$ 当且仅当 $160-2x-2n<0$，即 $x+n>80$。$n$ 最大取 $50$，所以 $31\\le x\\le49$ 时，买 $50$ 张就比买 $x$ 张便宜，这些人数都符合；$x\\le30$ 时 $x+n\\le80$，这一段里找不到更省的 $n$。',
        '买超过 $50$ 张也不会更省：这时 $y(n)=60n\\ge60\\times51=3060$。而 $21\\le x\\le30$ 时 $y(x)-y(30)=(x-30)(160-2x-60)=(x-30)(100-2x)\\le0$，所以 $y(x)\\le y(30)=3000<3060$。',
        '$x\\le20$ 时 $y(x)=120x\\le2400$：多买到 $20$ 张以内更贵；多买到 $21$～$50$ 张时 $y(n)-2400=-2(n^2-80n+1200)=-2(n-20)(n-60)>0$；买超过 $50$ 张至少 $3060$ 元，都不省。$x\\ge50$ 时再多买，每张 $60$ 元、张数更多，也更贵。',
        '所以符合的人数是 $31,32,\\dots,49$，共 $19$ 种。坑：只比较相邻两个张数；或者把 $x=30$、$x=50$ 也算进去（$x+n=80$ 时票款相等，不算“更省”）。',
      ],
      verify: () => {
        const price = x => (x <= 20 ? 120 * x : x <= 50 ? x * (160 - 2 * x) : 60 * x);
        let cnt = 0;
        for (let x = 1; x <= 120; x++) {
          let cheaper = false;
          for (let n = x + 1; n <= 300; n++) if (price(n) < price(x)) { cheaper = true; break; }
          if (cheaper) cnt++;
        }
        const p = Poly.of('x(120-2(x-20))');
        const xs = [];
        for (let x = 21; x <= 200; x++) if (120 - 2 * (x - 20) >= 60) xs.push(x);
        return [String(p), Math.min(...xs), Math.max(...xs), cnt];
      },
    },
    {
      id: '27.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $y=(m-3)x^{m^2-4m+5}+(m-1)x^2-2x$ 是关于 $x$ 的函数（$m$ 是常数）。',
      blanks: [
        { kind: 'nums', label: '(1) 若它是二次函数，则 $m=$（全部填出，用逗号隔开）', answer: ['1', '2', '3'] },
        { kind: 'num', label: '(2) 使它是一次函数的 $m$ 共有几个？', answer: '0' },
      ],
      explain: [
        '思路：第一项的次数和系数都含 $m$，第二项本身就是 $x^2$ 项，所以“是二次函数”有几种不同的来源，要按第一项的情况分类。指数 $m^2-4m+5=(m-2)^2+1\\ge1$。',
        '① 第一项系数为 $0$：$m=3$，函数是 $y=2x^2-2x$，是二次函数。坑：一看到 $(m-3)$ 就要求 $m\\ne3$，把它排除了。',
        '② 第一项是二次项：$(m-2)^2+1=2$，$m=1$ 或 $m=3$。$m=1$ 时 $y=-2x^2-2x$（第二项系数为 $0$ 不要紧），是二次函数；$m=3$ 已在 ① 中。',
        '③ 第一项是一次项：$(m-2)^2+1=1$，$m=2$，函数是 $y=-x+x^2-2x=x^2-3x$，是二次函数。',
        '④ 其他情况第一项系数不为 $0$、指数大于 $2$ 或不是整数，函数不是二次函数。所以 $m=1,2,3$。',
        '(2) 一次函数要没有 $x^2$ 项：①中 $m=3$ 时 $x^2$ 系数是 $2$；②中合并后 $x^2$ 系数是 $(m-3)+(m-1)=2m-4$，在 $m=1$、$3$ 时都不为 $0$；③中 $m=2$ 时 $x^2$ 系数是 $1$。没有一种能消去二次项，所以共 $0$ 个。',
      ],
      verify: () => {
        // 枚举能让指数成为正整数 1～6 的 m，以及若干整数 m，按“各次项系数”合并后判断
        const cand = new Set();
        for (let e = 1; e <= 6; e++) { const r = Math.sqrt(e - 1); cand.add(R271(2 + r)); cand.add(R271(2 - r)); }
        for (let m = -6; m <= 8; m++) cand.add(m);
        const kind = m => {
          const coef = {};
          const addTerm = (deg, c) => { if (Math.abs(c) > 1e-9) coef[deg] = (coef[deg] || 0) + c; };
          const e = R271(m * m - 4 * m + 5);
          if (Math.abs(m - 3) > 1e-9 && !Number.isInteger(e)) return 'other';
          addTerm(e, m - 3); addTerm(2, m - 1); addTerm(1, -2);
          const degs = Object.keys(coef).filter(d => Math.abs(coef[d]) > 1e-9).map(Number);
          const top = Math.max(...degs);
          return top === 2 ? 'quad' : top === 1 ? 'lin' : 'other';
        };
        const ms = [...cand].filter(m => kind(m) === 'quad').sort((a, b) => a - b);
        return [ms, [...cand].filter(m => kind(m) === 'lin').length];
      },
    },
    {
      id: '27.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，矩形 $ABCD$ 中，$AB=8\\,\\text{cm}$，$BC=6\\,\\text{cm}$。点 $P$ 从点 $A$ 出发，沿 $A\\to B\\to C$ 以 $2\\,\\text{cm/s}$ 的速度运动，到达点 $C$ 时停止；点 $Q$ 同时从点 $A$ 出发，沿 $A\\to D$ 以 $1\\,\\text{cm/s}$ 的速度运动，到达点 $D$ 后停在 $D$。设运动时间为 $t\\,\\text{s}$（$0<t<7$），$\\triangle CPQ$ 的面积为 $S\\,\\text{cm}^2$。',
      figure: FIG271.c03,
      blanks: [
        { kind: 'expr', label: '(1) 点 $P$ 在 $AB$ 上（$0<t\\le4$）时，$S=$（化成一般形式）', answer: '-t^2+10t', vars: ['t'] },
        { kind: 'expr', label: '(2) 点 $P$ 在 $BC$ 上（$4<t<7$）时，$S=$', answer: '56-8t', vars: ['t'] },
        { kind: 'nums', label: '(3) $\\triangle CPQ$ 与 $\\triangle APQ$ 面积相等时，$t=$（全部填出，用逗号隔开）', answer: ['14/3'] },
      ],
      explain: [
        '(1) $AP=2t$，$AQ=t$。用矩形面积减去三个直角三角形：$S=48-\\frac12\\cdot2t\\cdot t-\\frac12(8-2t)\\cdot6-\\frac12\\cdot8(6-t)=48-t^2-(24-6t)-(24-4t)=-t^2+10t$，是二次函数。',
        '(2) $P$ 在 $BC$ 上时，$PC=14-2t$，$Q$ 在直线 $AD$ 上，到 $BC$ 的距离总是 $8$。所以 $S=\\frac12(14-2t)\\times8=56-8t$，是一次函数。坑：以为 $Q$ 在 $t=6$ 停下要再分一段，其实 $Q$ 停在 $D$ 后到 $BC$ 的距离仍是 $8$，表达式不变。',
        '(3) 再算 $\\triangle APQ$：$0<t\\le4$ 时是直角三角形，面积 $t^2$；$4<t\\le6$ 时以 $AQ=t$ 为底，$P$ 到 $AD$ 的距离是 $8$，面积 $4t$；$6<t<7$ 时 $Q$ 停在 $D$，面积 $\\frac12\\times6\\times8=24$。这次 $Q$ 停下确实要分段。',
        '逐段列方程：$t^2=-t^2+10t$ 得 $t=0$ 或 $5$，都不在 $0<t\\le4$ 内；$4t=56-8t$ 得 $t=\\frac{14}3$，在 $4<t\\le6$ 内；$24=56-8t$ 得 $t=4$，不在 $6<t<7$ 内。',
        '所以 $t=\\frac{14}3$。坑：把 $\\triangle APQ$ 也当成两段，最后一段用 $4t=56-8t$ 的结果去套。',
      ],
      verify: () => {
        const area = (p, q, r) => Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1])) / 2;
        const A = [0, 0], C = [8, 6];
        const pos = t => [t <= 4 ? [2 * t, 0] : [8, 2 * t - 8], [0, Math.min(t, 6)]];
        const SC = t => { const [P, Q] = pos(t); return area(C, P, Q); };
        const SA = t => { const [P, Q] = pos(t); return area(A, P, Q); };
        // 用三个时刻定出每段的二次式，再在细分点上找相等的时刻
        const ok1 = [0.5, 1.7, 3.2].every(t => Math.abs(SC(t) - (-t * t + 10 * t)) < 1e-9);
        const ok2 = [4.3, 5.5, 6.6].every(t => Math.abs(SC(t) - (56 - 8 * t)) < 1e-9);
        const ts = [];
        for (let k = 1; k < 7 * 300; k++) { const t = k / 300; if (Math.abs(SC(t) - SA(t)) < 1e-9) ts.push(F(k).div(F(300))); }
        return [ok1 ? '-t^2+10t' : '0', ok2 ? '56-8t' : '0', ts];
      },
    },
    {
      id: '27.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，点 $A$ 在反比例函数 $y=\\dfrac6x$（$x>0$）的图像上，横坐标为 $m$；过点 $A$ 作 $x$ 轴的垂线，交直线 $y=x+b$（$b$ 是常数）于点 $B$（$A$、$B$ 不重合）。设 $\\triangle OAB$ 的面积为 $S$。（示意图按 $b=-1$ 画）',
      figure: FIG271.c04,
      blanks: [
        { kind: 'expr', label: '(1) 当点 $A$ 在点 $B$ 下方时，用 $m$、$b$ 表示：$S=$（化成一般形式）', answer: '1/2m^2+1/2bm-3', vars: ['m', 'b'] },
        { kind: 'num', label: '(2) 若使 $S=5$ 的 $m$ 恰好有两个，则 $b=$', answer: '-4' },
        { kind: 'ineq', var: 'b', label: '(3) 若使 $S=5$ 的 $m$ 恰好有一个，则 $b$ 的取值范围是', answer: 'b>-4' },
      ],
      explain: [
        '$A(m,\\frac6m)$，$B(m,m+b)$，$AB$ 平行于 $y$ 轴，$O$ 到 $AB$ 的距离是 $m$。所以 $S=\\frac12m\\cdot\\left|m+b-\\frac6m\\right|=\\frac12\\left|m^2+bm-6\\right|$。',
        '(1) $A$ 在 $B$ 下方时 $m+b>\\frac6m$，绝对值里为正：$S=\\frac12m^2+\\frac12bm-3$。',
        '(2)(3) 思路：$S=5$ 去掉绝对值分成两个关于 $m$ 的一元二次方程，再分别数各有几个正根。$|m^2+bm-6|=10$，即 ① $m^2+bm-16=0$ 或 ② $m^2+bm+4=0$。两个方程的常数项不同，不会有公共根；$S=5\\ne0$ 也保证了 $A$、$B$ 不重合。',
        '方程 ①：$\\Delta=b^2+64>0$，两根之积 $-16<0$，一正一负，不论 $b$ 是多少都恰好有 $1$ 个正根。',
        '方程 ②：两根之积 $4>0$，有根时两根同号，两根之和 $-b$。要有正根，需 $\\Delta=b^2-16\\ge0$ 且 $-b>0$，即 $b\\le-4$。$b=-4$ 时 $m^2-4m+4=0$，只有一个正根 $m=2$；$b<-4$ 时有两个不等的正根；$b>-4$ 时没有正根（$-4<b<4$ 无实根，$b\\ge4$ 时两根都是负数）。',
        '合起来：$b<-4$ 时 $3$ 个，$b=-4$ 时 $2$ 个，$b>-4$ 时 $1$ 个。所以 (2) $b=-4$，(3) $b>-4$。坑：只按图上 $A$ 在 $B$ 下方列一个方程；或者把方程 ② 的条件写成 $b^2-16\\ge0$，忘了根要为正而写成 $b\\le-4$ 或 $b\\ge4$。',
      ],
      verify: () => {
        const area = (m, b) => Math.abs(m * (m + b - 6 / m)) / 2;
        // (1)：在 A 在 B 下方的点上核对表达式
        const p = Poly.of('m(m+b)-6').scale(F(1).div(F(2)));
        const ok = [[3, 1], [1.5, 4], [5, -2]].every(([m, b]) => m + b > 6 / m && Math.abs(area(m, b) - (m * m / 2 + b * m / 2 - 3)) < 1e-9);
        // 数 S=5 的正数 m：两个一元二次方程的正根，去重
        const count = b => {
          const ms = [];
          for (const c of [-16, 4]) {
            const d = b * b - 4 * c;
            if (d < -1e-12) continue;
            const r = Math.sqrt(Math.max(d, 0));
            for (const m of [(-b + r) / 2, (-b - r) / 2]) if (m > 1e-12 && Math.abs(area(m, b) - 5) < 1e-7 && !ms.some(x => Math.abs(x - m) < 1e-9)) ms.push(m);
          }
          return ms.length;
        };
        const two = [], one = [];
        for (let k = -2000; k <= 2000; k++) { const b = k / 100; if (count(b) === 2) two.push(b); if (count(b) === 1) one.push(b); }
        const lo = Math.min(...one);  // 恰有一个的 b 从这里一直到扫描上界
        const cont = one.length === Math.round((20 - lo) * 100) + 1;
        return [ok ? String(p) : '0', two.length === 1 ? two[0] : NaN, cont && count(-4) !== 1 ? `b>${R271(lo - 0.01)}` : ''];
      },
    },
    {
      id: '27.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '在平面直角坐标系中，一个机器人从某点出发，出发 $t$ 秒时位于点 $P(2t-1,\\;t^2+2t)$，$t$ 从 $0$ 开始一直增大（$t\\ge0$）。机器人的运动路线就是 $t\\ge0$ 时点 $P$ 经过的所有点。设点 $P$ 的坐标为 $(x,y)$。',
      blanks: [
        { kind: 'expr', label: '(1) $y$ 关于 $x$ 的函数表达式：$y=$（化成一般形式）', answer: '1/4x^2+3/2x+5/4' },
        { kind: 'ineq', label: '自变量 $x$ 的取值范围是', answer: 'x≥-1' },
        { kind: 'nums', label: '(2) 机器人经过直线 $y=x+5$ 时，点 $P$ 的横坐标 $x=$（有几个填几个，用逗号隔开）', answer: ['3'] },
        { kind: 'real', label: '(3) 若机器人的运动路线与直线 $y=kx$ 有两个公共点，则 $k$ 的取值范围是 $k>$（结果化成最简形式）', answer: '(3+√5)/2', simplest: true },
      ],
      explain: [
        '(1) 思路：$x$、$y$ 都由 $t$ 决定，把 $t$ 用 $x$ 表示出来再代入，就得到 $y$ 和 $x$ 的直接关系。由 $x=2t-1$ 得 $t=\\frac{x+1}2$。',
        '$y=\\left(\\frac{x+1}2\\right)^2+2\\cdot\\frac{x+1}2=\\frac{x^2+2x+1}4+x+1=\\frac14x^2+\\frac32x+\\frac54$，是 $x$ 的二次函数。',
        '取值范围由 $t\\ge0$ 决定：$\\frac{x+1}2\\ge0$，$x\\ge-1$。坑：按“二次函数自变量取一切实数”写，忘了 $t$ 的限制。',
        '(2) $\\frac14x^2+\\frac32x+\\frac54=x+5$，即 $x^2+2x-15=0$，$x=3$ 或 $x=-5$。$-5<-1$，机器人到不了，舍去。所以 $x=3$（此时 $t=2$，$P(3,8)$）。',
        '(3) 思路：用 $t$ 列方程更方便。点 $P$ 在直线 $y=kx$ 上，就是 $t^2+2t=k(2t-1)$，即 $t^2+(2-2k)t+k=0$。不同的 $t$ 对应不同的横坐标 $2t-1$，也就是不同的点，所以“两个公共点”就是这个方程有两个不相等的根，并且都满足 $t\\ge0$。',
        '$k=0$ 时方程是 $t^2+2t=0$，$t=0$ 或 $t=-2$，只有 $t=0$ 可取，只有一个公共点（出发点 $(-1,0)$），不符合。',
        '一般地，两根不等：$\\Delta=(2-2k)^2-4k=4(k^2-3k+1)>0$；两根都非负：两根之和 $2k-2>0$，两根之积 $k\\ge0$（积为 $0$ 时有一根是 $0$，另一根要为正，同样要和大于 $0$）。由和 $>0$ 得 $k>1$。',
        '$k^2-3k+1=0$ 的两根是 $\\frac{3\\pm\\sqrt5}2$，$k^2-3k+1>0$ 即 $k<\\frac{3-\\sqrt5}2$ 或 $k>\\frac{3+\\sqrt5}2$。和 $k>1$ 合起来（$\\frac{3-\\sqrt5}2<1$），得 $k>\\frac{3+\\sqrt5}2$。',
        '坑：只要求 $\\Delta>0$，忘了 $t\\ge0$，得到 $k<\\frac{3-\\sqrt5}2$ 也算；或者改用 $x$ 列方程后忘了 $x\\ge-1$。',
      ],
      verify: () => {
        const t = Poly.of('(x+1)/2');
        const y = t.mul(t).add(t.scale(F(2)));
        const hits = c => {  // 解 y = x + c，留下 x ≥ -1 的解
          const p = y.sub(Poly.of(`x+${c}`));
          const num = fr => Number(fr.n) / Number(fr.d);
          const a = num(p.coef('x^2')), b = num(p.coef('x')), cc = num(p.coef(''));
          const d = b * b - 4 * a * cc;
          if (d < 0) return [];
          return [...new Set([(-b + Math.sqrt(d)) / (2 * a), (-b - Math.sqrt(d)) / (2 * a)])].filter(x => x >= -1).map(R271);
        };
        // (3)：对 k 扫描，数 t^2+2t=k(2t-1) 的不等非负根；有两个的 k 应是从某个边界起的一整段
        const count = k => {
          const B = 2 - 2 * k, C = k, d = B * B - 4 * C;
          if (d < 0) return 0;
          return [...new Set([(-B + Math.sqrt(d)) / 2, (-B - Math.sqrt(d)) / 2])].filter(s => s >= -1e-12).length;
        };
        const N = 20000, ks = [];
        for (let i = -10 * N; i <= 10 * N; i++) if (count(i / N) === 2) ks.push(i / N);
        const lo = ks[0], whole = ks.length === Math.round((10 - lo) * N) + 1;
        const edge = (3 + Math.sqrt(5)) / 2;  // 精确边界：k^2-3k+1=0 较大的根，边界上是重根
        return [String(y), 'x≥-1', hits(5), whole && lo > edge && lo - edge <= 1 / N && count(edge) !== 2 ? edge : NaN];
      },
    },
  ],
});
