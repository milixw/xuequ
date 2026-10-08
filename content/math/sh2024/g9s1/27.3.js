'use strict';

// 上海数学九年级上册 · 27.3 确定二次函数的表达式（课本第 21～25 页）
// 知识范围：待定系数法——已知图像上三点，设 y=ax²+bx+c 列三元一次方程组；已知顶点（或对称轴、最值）再补条件，
//   设 y=a(x+m)²+h（顶点 (−m,h)，对称轴 x=−m）；含参数的表达式由“顶点在坐标轴上”“过原点”等条件定参数；
//   求出表达式后再求开口、对称轴、顶点、最高（低）点
// 可以使用：27.1、27.2 全部（图像、性质、配方、顶点公式、平移、区间最值）；六～八年级全部（三元一次方程组、
//   一元二次方程及因式分解、二次三项式按根分解、勾股定理、平行四边形），八下第 24～26 章的基础结论（坐标系、点的对称、一次函数）
// 还没学：与 x 轴交点个数和判别式的系统对应（27.4）、实际应用（27.5）、相似三角形、三角比、圆
// 本节约定：课本没有“交点式”的名称，用到时在解析里由二次三项式按根分解 ax²+bx+c=a(x−x₁)(x−x₂) 推出；
//   表达式填空用 expr，带根号的结果用 reals 并要求最简

const SVG273 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 15) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  poly: (pts, fill = 'none', dash = false) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.4"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  curve: pts => `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  axes: (m, x0, x1, y0, y1) => {
    const ax = [m([x0, 0]), m([x1, 0])], ay = [m([0, y0]), m([0, y1])];
    const arrow = (p, dir) => (dir === 'x'
      ? `<polygon points="${p[0]},${p[1]} ${p[0] - 8},${p[1] - 4} ${p[0] - 8},${p[1] + 4}" fill="#2b2b2b"/>`
      : `<polygon points="${p[0]},${p[1]} ${p[0] - 4},${p[1] + 8} ${p[0] + 4},${p[1] + 8}" fill="#2b2b2b"/>`);
    return SVG273.seg(ax[0], ax[1], false, 1.2) + arrow(ax[1], 'x') + SVG273.seg(ay[0], ay[1], false, 1.2) + arrow(ay[1], 'y')
      + SVG273.text('<tspan font-style="italic">x</tspan>', ax[1], -2, 12) + SVG273.text('<tspan font-style="italic">y</tspan>', ay[1], 12, 2)
      + SVG273.text('O', m([0, 0]), -10, 10);
  },
  sample: (f, x0, x1, n = 80) => Array.from({ length: n + 1 }, (_, i) => { const x = x0 + ((x1 - x0) * i) / n; return [x, f(x)]; }),
};

const I273 = s => `<tspan font-style="italic">${s}</tspan>`;

// 三点定 y=ax²+bx+c：克拉默法则，F 精确分数
const solve273 = pts => {
  const P = pts.map(([x, y]) => [F(x), F(y)]);
  const det = (m) => m[0][0].mul(m[1][1].mul(m[2][2]).sub(m[1][2].mul(m[2][1])))
    .sub(m[0][1].mul(m[1][0].mul(m[2][2]).sub(m[1][2].mul(m[2][0]))))
    .add(m[0][2].mul(m[1][0].mul(m[2][1]).sub(m[1][1].mul(m[2][0]))));
  const M = P.map(([x]) => [x.mul(x), x, F(1)]);
  const Y = P.map(([, y]) => y);
  const D = det(M);
  return [0, 1, 2].map(j => det(M.map((row, i) => row.map((v, k) => (k === j ? Y[i] : v)))).div(D));
};
// 系数 [a,b,c] 写成判分器认识的式子
const expr273 = ([a, b, c]) => `(${a})*x^2+(${b})*x+(${c})`;
// 由 y=a(x+m)²+h 展开成 [a,b,c]
const std273 = (a, m, h) => [F(a), F(a).mul(2).mul(m), F(a).mul(F(m).mul(m)).add(h)];
const val273 = ([a, b, c], x) => F(a).mul(F(x).mul(x)).add(F(b).mul(x)).add(c);

const FIG273 = (() => {
  const S = SVG273;
  const out = {};

  // e02：直线 y=-2x+4 与两轴交于 A、B，对称轴 x=-1（只画直线和对称轴，不画抛物线）
  {
    const m = S.map(26, 150, 150);
    let g = S.axes(m, -5, 3.6, -1.5, 5.2);
    g += S.seg(m([-0.4, 4.8]), m([2.7, -1.4]));
    g += S.seg(m([-1, -1.3]), m([-1, 5]), true, 1.2);
    g += S.dot(m([2, 0])) + S.dot(m([0, 4]));
    g += S.text('A', m([2, 0]), 8, 10) + S.text('B', m([0, 4]), -12, -2);
    g += S.text(`${I273('x')}=−1`, m([-1, 5]), -22, 4, 13) + S.text(`${I273('y')}=−2${I273('x')}+4`, m([1.6, 2.6]), 34, 0, 13);
    out.e02 = S.wrap(260, 200, g);
  }

  // e03：O、A(4,0)、B(1,3)
  {
    const m = S.map(28, 70, 120);
    let g = S.axes(m, -1.6, 5.8, -1.2, 3.9);
    g += S.seg(m([0, 0]), m([1, 3]), true, 1.2) + S.seg(m([1, 3]), m([4, 0]), true, 1.2);
    g += S.dot(m([4, 0])) + S.dot(m([1, 3]));
    g += S.text('A(4,0)', m([4, 0]), 6, 12, 13) + S.text('B(1,3)', m([1, 3]), 26, -4, 13);
    out.e03 = S.wrap(250, 160, g);
  }

  // c03：示意图。C1 过 A(1,0)、B(5,0)，顶点 D(3,4)；取一个非答案的 M(7.5,0)，C2 是 C1 绕 M 旋转 180° 的像
  {
    const f1 = x => -(x - 3) * (x - 3) + 4;
    const mm = 7.5, rot = ([x, y]) => [2 * mm - x, -y];
    const f2 = x => -f1(2 * mm - x);
    const m = S.map(16, 22, 100);
    let g = S.axes(m, -0.8, 16.4, -5.4, 5.6);
    g += S.curve(S.sample(f1, 0.7, 5.3).map(m)) + S.curve(S.sample(f2, 2 * mm - 5.3, 2 * mm - 0.7).map(m));
    const A = [1, 0], B = [5, 0], D = [3, 4], A2 = rot(A), B2 = rot(B), D2 = rot(D), M = [mm, 0];
    g += S.poly([m(A), m(D), m(A2), m(D2)], 'none', true);
    [A, B, D, A2, B2, D2, M].forEach(p => { g += S.dot(m(p)); });
    g += S.text('A', m(A), -2, 12) + S.text('B', m(B), -8, 12) + S.text('D', m(D), 0, -10)
      + S.text('A′', m(A2), 6, -10) + S.text('B′', m(B2), 8, -10) + S.text('D′', m(D2), 0, 12) + S.text('M', m(M), 0, 12)
      + S.text(`${I273('C')}<tspan font-size="11" baseline-shift="sub">1</tspan>`, m([0.7, f1(0.7)]), -10, 0, 14)
      + S.text(`${I273('C')}<tspan font-size="11" baseline-shift="sub">2</tspan>`, m([2 * mm - 0.7, f2(2 * mm - 0.7)]), 12, 0, 14);
    out.c03 = S.wrap(300, 200, g);
  }

  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/27.3',
  title: '确定二次函数的表达式',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第一轮打回：c01～c05 都只到真卷压轴（含参区间最值、等腰三分类、∠ACB=90° 加铅垂高是流传题换数、定点题转化后只剩两三步、关于 x=t 对称后太短）；b04 与卡片例子换数版；b07 的 k≠0 坑没有触发。处理：c01 改为由面积定式后求 m≤x≤n 时 2m≤y≤2n 的 m、n；c02 等腰四种情况再用钝角筛选；c03 改为绕 (m,0) 旋转 180° 成矩形、平行四边形；c04 换成定点加等腰直角加与线段恰一个公共点；c05 关于 x=t 对称、直角只能在交点处并与过点条件联立；b04 改为一个交点加对称轴加最大值；b07 改为 k=0 要舍。卡片补关于 x=t 对称、绕点旋转 180°。第二轮整节通过，之后按建议把 c03(3) 菱形换成平行四边形分类。卡片配 parabolaShift。' },
  intro: [
    {
      title: '待定系数法：已知三个点',
      body: '确定一次函数要两个条件；二次函数 $y=ax^2+bx+c$ 有 $a$、$b$、$c$ 三个系数，一般要三个条件。知道图像上三个点，就设 $y=ax^2+bx+c$，代入得到关于 $a$、$b$、$c$ 的三元一次方程组，解出来即可。有一个点在 $y$ 轴上时，先直接得到 $c$，计算量小很多。',
      example: '过 $(0,-1)$、$(1,2)$、$(2,7)$：由第一个点 $c=-1$；再得 $a+b=3$，$4a+2b=8$，解得 $a=1$，$b=2$，所以 $y=x^2+2x-1$。',
    },
    {
      title: '已知顶点或对称轴：设 $y=a(x+m)^2+h$',
      body: '顶点是 $(-m,h)$，对称轴是直线 $x=-m$。知道顶点就只剩 $a$ 一个未知数，再代入一个点；只知道对称轴（或只知道最大、最小值）时，剩两个未知数，要再补两个条件。',
      example: '顶点 $(2,-1)$，过点 $(0,3)$：设 $y=a(x-2)^2-1$，$4a-1=3$，$a=1$，所以 $y=(x-2)^2-1$。',
      pitfall: '顶点横坐标是 $-m$，顶点 $(2,-1)$ 对应 $m=-2$，括号里是 $x-2$，不是 $x+2$。',
      demo: { type: 'parabolaShift', a: -1, m: 1, h: 3 },
    },
    {
      title: '用好对称性',
      body: '抛物线上纵坐标相同的两点关于对称轴对称，对称轴就是这两点横坐标的平均数。已知与 $x$ 轴的两个交点 $(x_1,0)$、$(x_2,0)$ 时，$x_1$、$x_2$ 是方程 $ax^2+bx+c=0$ 的两根，按二次三项式的因式分解可写成 $y=a(x-x_1)(x-x_2)$，再代入一个点求 $a$。',
      example: '与 $x$ 轴交于 $(-2,0)$、$(3,0)$，与 $y$ 轴交于 $(0,-12)$：设 $y=a(x+2)(x-3)$，$-6a=-12$，$a=2$。',
    },
    {
      title: '把文字条件翻译成方程',
      body: '“是二次函数”要求二次项系数不为 $0$；“过原点”就是常数项为 $0$；“顶点在 $y$ 轴上”就是对称轴为 $x=0$，即一次项系数为 $0$；“顶点在 $x$ 轴上”就是顶点纵坐标为 $0$。含参数时先翻译，再解方程，最后回头检查二次项系数。',
      example: '$y=x^2+(k-1)x+k$ 的顶点在 $y$ 轴上，则 $k-1=0$，$k=1$，表达式为 $y=x^2+1$。',
      pitfall: '解出的参数让二次项系数变成 $0$ 时要舍去。',
    },
    {
      title: '求出表达式之后：平移与对称',
      body: '先化成 $y=a(x+m)^2+h$ 再平移：向左平移 $p$ 个单位，括号里加 $p$；向右则减；向上、向下改 $h$。关于 $x$ 轴对称：$y$ 换成 $-y$；关于 $y$ 轴对称：$x$ 换成 $-x$；关于原点对称：两个都换。开口大小不变。关于直线 $x=t$ 对称：顶点横坐标 $p$ 变成 $2t-p$，纵坐标和开口都不变。绕点 $(m,0)$ 旋转 $180^\\circ$：顶点 $(p,q)$ 变成 $(2m-p,-q)$，开口方向相反、大小不变。',
      example: '$y=(x-2)^2+1$ 关于 $x$ 轴对称的抛物线是 $-y=(x-2)^2+1$，即 $y=-(x-2)^2-1$；它关于直线 $x=5$ 对称的抛物线顶点是 $(8,1)$，为 $y=(x-8)^2+1$。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '27.3-b01',
      level: 'basic',
      type: 'fill',
      stem: '已知二次函数的图像经过点 $A(2,4)$、$B(0,-2)$、$C(-1,1)$，求这个二次函数的表达式。',
      blanks: [{ kind: 'expr', label: '$y=$', answer: '2x^2-x-2' }],
      explain: [
        '设 $y=ax^2+bx+c$（$a\\ne0$）。点 $B$ 在 $y$ 轴上，代入得 $c=-2$。坑：把 $B(0,-2)$ 当成“$c=2$”，或者不先用它，硬解三元方程组算错。',
        '代入 $A$：$4a+2b-2=4$，即 $2a+b=3$；代入 $C$：$a-b-2=1$，即 $a-b=3$。',
        '两式相加得 $3a=6$，$a=2$，$b=-1$。所以 $y=2x^2-x-2$。',
      ],
      verify: () => expr273(solve273([[2, 4], [0, -2], [-1, 1]])),
    },
    {
      id: '27.3-b02',
      level: 'basic',
      type: 'choice',
      stem: '已知二次函数图像的顶点坐标是 $(-3,2)$，且图像经过点 $(-1,-6)$，这个二次函数的表达式是（　　）',
      options: [
        '$y=-\\frac12(x-3)^2+2$',
        '$y=-2(x+3)^2+2$',
        '$y=-4(x+3)^2+2$',
        '$y=-(x+3)^2-2$',
      ],
      answer: 1,
      explain: [
        '顶点 $(-3,2)$ 对应 $-m=-3$，$m=3$，$h=2$，设 $y=a(x+3)^2+2$。',
        '代入 $(-1,-6)$：$a\\cdot(-1+3)^2+2=-6$，$4a=-8$，$a=-2$。所以 $y=-2(x+3)^2+2$，选 B。',
        'A 是把括号写成 $x-3$（顶点符号错）；C 是把 $(-1+3)^2$ 算成 $2$，忘了平方；D 是把 $h$ 的符号弄反。',
      ],
      verify: () => {
        const opts = [[F(-1).div(2), -3, 2], [-2, 3, 2], [-4, 3, 2], [-1, 3, -2]];
        return opts.findIndex(([a, m, h]) => F(m).neg().eq(-3) && F(h).eq(2) && F(a).mul(F(-1 + m).pow(2)).add(h).eq(-6));
      },
    },
    {
      id: '27.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '二次函数 $y=ax^2+bx+c$ 的图像经过点 $P(-2,5)$ 和 $Q(4,5)$，并且这个函数的最小值是 $-13$。求这个二次函数的表达式。',
      blanks: [{ kind: 'expr', label: '$y=$', answer: '2x^2-4x-11' }],
      explain: [
        '$P$、$Q$ 的纵坐标相同，它们关于对称轴对称，所以对称轴是 $x=\\frac{-2+4}{2}=1$。坑：只有两个点，以为条件不够，或者把 $5$ 当成最值。',
        '最小值 $-13$ 就是顶点纵坐标，顶点为 $(1,-13)$，设 $y=a(x-1)^2-13$。',
        '代入 $Q(4,5)$：$9a-13=5$，$a=2$（$a>0$ 开口向上，确实有最小值）。',
        '$y=2(x-1)^2-13=2x^2-4x-11$。',
      ],
      verify: () => {
        const axis = F(-2 + 4).div(2);
        const a = F(5 + 13).div(F(4).sub(axis).pow(2));
        return expr273(std273(a, axis.neg(), -13));
      },
    },
    {
      id: '27.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '一条抛物线的对称轴是直线 $x=2$，它与 $x$ 轴的一个交点是 $(-1,0)$，这个函数的最大值是 $18$。求它的表达式和它与 $x$ 轴的另一个交点的横坐标。',
      blanks: [
        { kind: 'expr', label: '(1) $y=$', answer: '-2x^2+8x+10' },
        { kind: 'num', label: '(2) 另一个交点的横坐标', answer: '5' },
      ],
      explain: [
        '最大值就是顶点纵坐标，顶点在对称轴上，所以顶点是 $(2,18)$，设 $y=a(x-2)^2+18$。',
        '代入 $(-1,0)$：$9a+18=0$，$a=-2$（$a<0$，开口向下，确实有最大值）。$y=-2(x-2)^2+18=-2x^2+8x+10$。',
        '两个交点关于直线 $x=2$ 对称，另一个交点的横坐标是 $2\\times2-(-1)=5$。坑：算成 $-1+2=1$ 或 $2+1=3$，把“到对称轴的距离”用错了——$(-1,0)$ 到对称轴的距离是 $3$，另一个交点在对称轴右边 $3$ 个单位处。',
      ],
      verify: () => {
        const co = std273(F(-18).div(F(-1 - 2).pow(2)), -2, 18);
        const other = F(2).mul(2).sub(-1);
        return [expr273(co), val273(co, other).isZero() ? other : null];
      },
    },
    {
      id: '27.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '抛物线 $y=-\\frac12x^2+bx+c$ 的顶点是 $(4,-1)$，求 $b$、$c$ 的值。',
      blanks: [
        { kind: 'num', label: '$b=$', answer: '4' },
        { kind: 'num', label: '$c=$', answer: '-9' },
      ],
      explain: [
        '二次项系数已经给定是 $-\\frac12$，顶点 $(4,-1)$，所以 $y=-\\frac12(x-4)^2-1$。坑：忘了 $a=-\\frac12$，写成 $y=(x-4)^2-1$，得到 $b=-8$，$c=15$。',
        '展开：$-\\frac12(x^2-8x+16)-1=-\\frac12x^2+4x-8-1=-\\frac12x^2+4x-9$。',
        '所以 $b=4$，$c=-9$。',
      ],
      verify: () => { const co = std273(F(-1).div(2), -4, -1); return [co[1], co[2]]; },
    },
    {
      id: '27.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '二次函数 $y=(m-1)x^2+3x+m^2-1$ 的图像经过原点，求 $m$ 的值和这个二次函数的表达式。',
      blanks: [
        { kind: 'nums', label: '(1) $m=$（有几个填几个，用逗号隔开）', answer: ['-1'] },
        { kind: 'expr', label: '(2) $y=$', answer: '-2x^2+3x' },
      ],
      explain: [
        '过原点，就是 $x=0$ 时 $y=0$：$m^2-1=0$，$m=1$ 或 $m=-1$。',
        '它是二次函数，$m-1\\ne0$，所以 $m\\ne1$。坑：两个都留下，$m=1$ 时表达式变成 $y=3x$，不是二次函数。',
        '$m=-1$，$y=-2x^2+3x$。',
      ],
      verify: () => {
        const ms = [];
        for (let m = -10; m <= 10; m++) if (m * m - 1 === 0 && m - 1 !== 0) ms.push(m);
        return [ms, `(${ms[0] - 1})*x^2+3x`];
      },
    },
    {
      id: '27.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '已知抛物线 $y=kx^2-2kx+k^2-3k$ 的顶点在 $x$ 轴上，求 $k$ 的值。',
      blanks: [{ kind: 'nums', label: '$k=$（全部填出，用逗号隔开）', answer: ['4'] }],
      explain: [
        '顶点在 $x$ 轴上，是顶点的纵坐标为 $0$。对称轴 $x=-\\frac{-2k}{2k}=1$，顶点纵坐标就是 $x=1$ 时的函数值：$k-2k+k^2-3k=k^2-4k$。',
        '令 $k^2-4k=0$，$k(k-4)=0$，$k=0$ 或 $k=4$。',
        '坑：两个都留下。$k=0$ 时二次项系数为 $0$，式子变成 $y=0$，根本不是二次函数，要舍去。所以 $k=4$，此时 $y=4x^2-8x+4=4(x-1)^2$，顶点 $(1,0)$ 确实在 $x$ 轴上。',
      ],
      verify: () => {
        const ks = [];
        for (let k = -20; k <= 20; k++) {
          if (k === 0) continue;
          const co = [k, -2 * k, k * k - 3 * k], vx = F(-co[1]).div(2 * k);
          if (val273(co, vx).isZero()) ks.push(k);
        }
        return ks;
      },
    },
    {
      id: '27.3-b08',
      level: 'basic',
      type: 'choice',
      stem: '把抛物线 $y=x^2+bx+c$ 先向左平移 $2$ 个单位，再向下平移 $3$ 个单位，得到抛物线 $y=x^2-2x+1$。那么（　　）',
      options: [
        '$b=-6$，$c=12$',
        '$b=2$，$c=-2$',
        '$b=-6$，$c=6$',
        '$b=2$，$c=4$',
      ],
      answer: 0,
      explain: [
        '结果 $y=x^2-2x+1=(x-1)^2$，顶点 $(1,0)$。',
        '倒过来想：把它向上平移 $3$ 个单位、再向右平移 $2$ 个单位就回到原抛物线，原顶点是 $(3,3)$。',
        '原抛物线 $y=(x-3)^2+3=x^2-6x+12$，选 A。坑：B 是把题目里的平移直接用在结果上（方向没倒过来）；C 只把左右倒过来，上下没倒；D 只倒了上下。',
      ],
      verify: () => {
        const target = x => F(x - 1).pow(2);
        const opts = [[-6, 12], [2, -2], [-6, 6], [2, 4]];
        return opts.findIndex(([b, c]) => [-3, 0, 1, 4, 7].every(x => val273([1, b, c], x + 2).sub(3).eq(target(x))));
      },
    },
    {
      id: '27.3-b09',
      level: 'basic',
      type: 'choice',
      stem: '抛物线 $C$ 与抛物线 $y=-x^2+4x-1$ 关于原点对称，$C$ 的表达式是（　　）',
      options: [
        '$y=x^2-4x+1$',
        '$y=-x^2-4x-1$',
        '$y=x^2+4x+1$',
        '$y=x^2+4x-1$',
      ],
      answer: 2,
      explain: [
        '关于原点对称：点 $(x,y)$ 对应 $(-x,-y)$，所以把 $x$ 换成 $-x$、$y$ 换成 $-y$：$-y=-(-x)^2+4(-x)-1$。',
        '整理得 $y=x^2+4x+1$，选 C。也可以看顶点：原顶点 $(2,3)$ 变成 $(-2,-3)$，开口从向下变成向上。',
        '坑：A 是关于 $x$ 轴对称，B 是关于 $y$ 轴对称，D 是常数项忘了变号。',
      ],
      verify: () => {
        const f = x => val273([-1, 4, -1], x);
        const opts = [[1, -4, 1], [-1, -4, -1], [1, 4, 1], [1, 4, -1]];
        return opts.findIndex(co => [-3, -1, 0, 2, 5].every(x => val273(co, x).eq(f(-x).neg())));
      },
    },

    // ---------- 扩展 ----------
    {
      id: '27.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '二次函数图像的对称轴是直线 $x=-1$，顶点到 $x$ 轴的距离是 $4$，且图像经过点 $(1,2)$。',
      blanks: [
        { kind: 'nums', label: '(1) 二次项系数 $a$ 的所有可能值（全部填出，用逗号隔开）', answer: ['-1/2', '3/2'] },
        { kind: 'expr', label: '(2) 符合条件的表达式中，图像与 $y$ 轴交点在 $x$ 轴下方的是 $y=$', answer: '3/2x^2+3x-5/2' },
      ],
      explain: [
        '设 $y=a(x+1)^2+h$。顶点 $(-1,h)$ 到 $x$ 轴的距离是 $|h|=4$，所以 $h=4$ 或 $h=-4$。坑：只取 $h=4$。',
        '代入 $(1,2)$：$4a+h=2$。$h=4$ 时 $a=-\\frac12$；$h=-4$ 时 $a=\\frac32$。',
        '两个表达式：$y=-\\frac12(x+1)^2+4=-\\frac12x^2-x+\\frac72$，与 $y$ 轴交于 $(0,\\frac72)$；$y=\\frac32(x+1)^2-4=\\frac32x^2+3x-\\frac52$，与 $y$ 轴交于 $(0,-\\frac52)$。',
        '所以 (2) 填 $\\frac32x^2+3x-\\frac52$。',
      ],
      verify: () => {
        const sols = [4, -4].map(h => { const a = F(2 - h).div(4); return std273(a, 1, h); });
        const below = sols.find(co => co[2].cmp(0) < 0);
        return [sols.map(co => co[0]), expr273(below)];
      },
    },
    {
      id: '27.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $y=-2x+4$ 与 $x$ 轴、$y$ 轴分别交于点 $A$、$B$。一条抛物线经过 $A$、$B$ 两点，且对称轴是直线 $x=-1$。求这条抛物线的表达式和顶点的纵坐标。',
      figure: FIG273.e02,
      blanks: [
        { kind: 'expr', label: '(1) $y=$', answer: '-1/2x^2-x+4' },
        { kind: 'num', label: '(2) 顶点纵坐标是', answer: '9/2' },
      ],
      explain: [
        '令 $y=0$ 得 $A(2,0)$；令 $x=0$ 得 $B(0,4)$。',
        '只知道两个点和对称轴：$A$ 在 $x$ 轴上，它关于直线 $x=-1$ 的对称点 $(-4,0)$ 也在抛物线上。坑：把 $B$ 的对称点 $(-2,4)$ 也当成新条件，其实它和对称轴是同一个信息，要配合别的条件用。',
        '与 $x$ 轴交于 $(2,0)$、$(-4,0)$，设 $y=a(x-2)(x+4)$，代入 $B(0,4)$：$-8a=4$，$a=-\\frac12$。',
        '$y=-\\frac12(x^2+2x-8)=-\\frac12x^2-x+4$。$x=-1$ 时 $y=-\\frac12+1+4=\\frac92$。',
      ],
      verify: () => {
        const A = [2, 0], B = [0, 4], A2 = [2 * -1 - A[0], 0];
        const co = solve273([A, B, A2]);
        return [expr273(co), val273(co, -1)];
      },
    },
    {
      id: '27.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，在平面直角坐标系中，$O$ 为原点，$A(4,0)$，$B(1,3)$。点 $C$ 使得以 $O$、$A$、$B$、$C$ 为顶点的四边形是平行四边形，抛物线 $y=ax^2+bx+c$ 经过 $O$、$A$、$C$ 三点。求 $a$ 的所有可能值。',
      figure: FIG273.e03,
      blanks: [{ kind: 'nums', label: '$a=$（全部填出，用逗号隔开）', answer: ['3/5', '1/7', '1'] }],
      explain: [
        '抛物线过 $O(0,0)$、$A(4,0)$，可设 $y=ax(x-4)$，只要找出 $C$ 再代入。',
        '分三种情况（看 $OA$、$OB$、$AB$ 哪一条是对角线）：$AB$ 为对角线时 $C=(4+1-0,0+3-0)=(5,3)$；$OB$ 为对角线时 $C=(0+1-4,3)=(-3,3)$；$OA$ 为对角线时 $C=(0+4-1,0-3)=(3,-3)$。坑：只想到 $BC\\parallel OA$ 的两种，漏了 $OA$ 是对角线的情况。',
        '$C(5,3)$：$5a=3$，$a=\\frac35$；$C(-3,3)$：$21a=3$，$a=\\frac17$；$C(3,-3)$：$-3a=-3$，$a=1$。',
        '三个 $C$ 的横坐标都不是 $0$ 或 $4$，三个 $a$ 都不为 $0$，都符合。',
      ],
      verify: () => {
        const O = [0, 0], A = [4, 0], B = [1, 3];
        const Cs = [[A[0] + B[0] - O[0], A[1] + B[1] - O[1]], [O[0] + B[0] - A[0], O[1] + B[1] - A[1]], [O[0] + A[0] - B[0], O[1] + A[1] - B[1]]];
        return Cs.filter(([x]) => x !== 0 && x !== 4).map(([x, y]) => F(y).div(x * (x - 4))).filter(a => !a.isZero());
      },
    },
    {
      id: '27.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '抛物线 $y=-x^2+bx+c$ 经过点 $(-1,2)$。把它向左平移 $3$ 个单位后，得到的抛物线的对称轴恰好是 $y$ 轴。',
      blanks: [
        { kind: 'num', label: '(1) $b=$', answer: '6' },
        { kind: 'num', label: '$c=$', answer: '9' },
        { kind: 'expr', label: '(2) 平移后的抛物线 $y=$', answer: '-x^2+18' },
      ],
      explain: [
        '平移后对称轴是 $x=0$，向左平移了 $3$，所以原来的对称轴是 $x=3$。坑：方向反了，得到 $x=-3$。',
        '$y=-x^2+bx+c$ 的对称轴是 $x=\\frac{b}{2}$，所以 $\\frac b2=3$，$b=6$。',
        '代入 $(-1,2)$：$-1-6+c=2$，$c=9$。原抛物线 $y=-x^2+6x+9=-(x-3)^2+18$。',
        '向左平移 $3$：$y=-(x-3+3)^2+18=-x^2+18$。',
      ],
      verify: () => {
        const b = F(2 * 3), c = F(2).add(1).add(b);
        const h = val273([-1, b, c], 3);
        return [b, c, `-x^2+(${h})`];
      },
    },
    {
      id: '27.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '抛物线 $y=x^2+bx+c$ 经过点 $A(-1,0)$，与 $x$ 轴的另一个交点为 $B$，与 $y$ 轴交于点 $C$。若 $\\triangle ABC$ 的面积是 $3$，求 $b$ 的值。',
      blanks: [{ kind: 'nums', label: '$b=$（全部填出，用逗号隔开）', answer: ['4', '-1'] }],
      explain: [
        '代入 $A$：$1-b+c=0$，$c=b-1$。于是 $x^2+bx+b-1=(x+1)(x+b-1)$，另一个交点 $B(1-b,0)$，$C(0,b-1)$。',
        '$AB=|1-b-(-1)|=|2-b|$，$C$ 到 $x$ 轴的距离是 $|b-1|$，面积 $\\frac12|2-b|\\cdot|b-1|=3$，即 $(2-b)(b-1)=6$ 或 $-6$。坑：不带绝对值，只解一个方程，或者只考虑 $B$ 在 $A$ 右侧。',
        '$(2-b)(b-1)=6$ 整理得 $b^2-3b+8=0$，没有实数根；$(2-b)(b-1)=-6$ 整理得 $b^2-3b-4=0$，$b=4$ 或 $b=-1$。',
        '检验：$b=4$ 时 $y=x^2+4x+3$，$B(-3,0)$，$C(0,3)$；$b=-1$ 时 $y=x^2-x-2$，$B(2,0)$，$C(0,-2)$。面积都是 $3$。',
      ],
      verify: () => {
        const bs = [];
        for (let k = -80; k <= 80; k++) {
          const b = F(k).div(4), c = b.sub(1), xB = F(1).sub(b);
          if (xB.eq(-1) || c.isZero()) continue;
          if (xB.add(1).abs().mul(c.abs()).div(2).eq(3)) bs.push(b);
        }
        return bs;
      },
    },
    {
      id: '27.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '小明列出了某个二次函数 $y=ax^2+bx+c$ 的一组对应值，检查后发现其中恰好有一个 $y$ 值算错了：<br>$x$：$-2$，$-1$，$0$，$1$，$2$，$3$<br>$y$：$13$，$4$，$-1$，$-2$，$-1$，$8$<br>求算错的那一项，以及这个二次函数的表达式。',
      blanks: [
        { kind: 'num', label: '(1) 算错的是 $x=$', answer: '2' },
        { kind: 'num', label: '这一项正确的 $y$ 值是', answer: '1' },
        { kind: 'expr', label: '(2) $y=$', answer: '2x^2-3x-1' },
      ],
      explain: [
        '坑：看到 $x=0$ 和 $x=2$ 时 $y$ 都是 $-1$，就认定对称轴是 $x=1$。若真如此，$x=-1$ 与 $x=3$ 的 $y$ 值应相等，可表里是 $4$ 和 $8$，矛盾；所以 $(0,-1)$、$(2,-1)$ 中至少有一个是错的。',
        '换用两端的点试：取 $(-2,13)$、$(-1,4)$、$(3,8)$，设 $y=ax^2+bx+c$，得 $4a-2b+c=13$，$a-b+c=4$，$9a+3b+c=8$。',
        '前两式相减：$3a-b=9$；后两式相减：$8a+4b=4$，即 $2a+b=1$。解得 $a=2$，$b=-3$，$c=-1$。',
        '检验其余各项：$x=0$ 时 $y=-1$ ✓，$x=1$ 时 $y=-2$ ✓，$x=2$ 时 $y=8-6-1=1\\ne-1$。只有 $x=2$ 这一项不符，表达式 $y=2x^2-3x-1$。',
      ],
      verify: () => {
        const xs = [-2, -1, 0, 1, 2, 3], ys = [13, 4, -1, -2, -1, 8];
        for (let i = 0; i < 6; i++) {
          const rest = xs.map((x, j) => [x, ys[j]]).filter((_, j) => j !== i);
          const co = solve273(rest.slice(0, 3));
          if (rest.every(([x, y]) => val273(co, x).eq(y))) return [xs[i], val273(co, xs[i]), expr273(co)];
        }
        return null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '27.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '抛物线 $y=ax^2+bx+c$ 与 $x$ 轴交于 $A(-2,0)$、$B(4,0)$ 两点，与 $y$ 轴交于点 $C$，点 $C$ 在 $x$ 轴上方，且 $\\triangle ABC$ 的面积是 $12$。(1) 求抛物线的表达式；(2) 是否存在实数 $m$、$n$（$m<n$），使得当 $m\\le x\\le n$ 时，$y$ 的取值范围恰好是 $2m\\le y\\le2n$？若存在，求出 $m$、$n$。',
      blanks: [
        { kind: 'expr', label: '(1) $y=$', answer: '-1/2x^2+x+4' },
        { kind: 'num', label: '(2) $m=$', answer: '-4' },
        { kind: 'num', label: '$n=$', answer: '9/4' },
      ],
      explain: [
        '叠加的两个环节：先用面积定出 $C$，再由两个交点定表达式；然后按区间与对称轴的位置三种情况讨论，每种都要回头检验区间位置，跨过对称轴的情况还要比较两端的函数值。',
        '(1) $AB=6$，$\\frac12\\times6\\times OC=12$，$OC=4$，$C$ 在 $x$ 轴上方，$C(0,4)$。设 $y=a(x+2)(x-4)$，$-8a=4$，$a=-\\frac12$，$y=-\\frac12x^2+x+4=-\\frac12(x-1)^2+\\frac92$。',
        '(2) 思路：先看最大值。函数的最大值是 $\\frac92$，所以 $2n\\le\\frac92$，$n\\le\\frac94$。再按区间 $m\\le x\\le n$ 在对称轴 $x=1$ 的哪一侧分三类。',
        '① $n\\le1$：$y$ 随 $x$ 增大而增大，$x=m$ 时 $y=2m$，$x=n$ 时 $y=2n$，$m$、$n$ 都是方程 $-\\frac12x^2+x+4=2x$ 的根。整理得 $x^2+2x-8=0$，$x=-4$ 或 $x=2$，于是 $m=-4$，$n=2$，但 $n=2>1$，不符合这一类的前提。坑：解出 $-4$、$2$ 就直接作答，没有回头检验区间位置。',
        '② $m\\ge1$：$y$ 随 $x$ 增大而减小，$x=m$ 时 $y=2n$，$x=n$ 时 $y=2m$。两式相减：$-\\frac12(m^2-n^2)+(m-n)=2n-2m$，约去 $m-n$ 得 $1-\\frac{m+n}2=-2$，$m+n=6$；可 $m<n\\le\\frac94$ 时 $m+n<\\frac92$，矛盾。',
        '③ $m<1<n$：最大值在顶点，$2n=\\frac92$，$n=\\frac94$。最小值在某一端点取到。若最小值是 $x=\\frac94$ 时的 $y=\\frac{119}{32}$，则 $m=\\frac{119}{64}>1$，矛盾；所以最小值是 $x=m$ 时的值，$-\\frac12m^2+m+4=2m$，$m=-4$（$m=2$ 不小于 $1$，舍去）。检验：$x=-4$ 时 $y=-8$，确实小于 $\\frac{119}{32}$。',
        '所以存在，$m=-4$，$n=\\frac94$。',
      ],
      verify: () => {
        const c = F(12 * 2).div(4 - -2);
        const co = solve273([[-2, 0], [4, 0], [0, c]]);
        const vx = co[1].neg().div(co[0].mul(2));
        const found = [];
        for (let i = -40; i <= 40; i++) {
          for (let j = i + 1; j <= 40; j++) {
            const m = F(i).div(4), n = F(j).div(4);
            const xs = [m, n];
            if (vx.cmp(m) > 0 && vx.cmp(n) < 0) xs.push(vx);
            const ys = xs.map(x => val273(co, x));
            const lo = ys.reduce((p, q) => (q.cmp(p) < 0 ? q : p)), hi = ys.reduce((p, q) => (q.cmp(p) > 0 ? q : p));
            if (lo.eq(m.mul(2)) && hi.eq(n.mul(2))) found.push([m, n]);
          }
        }
        return found.length === 1 ? [expr273(co), found[0][0], found[0][1]] : null;
      },
    },
    {
      id: '27.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '抛物线 $y=ax^2+bx-3$ 经过点 $A(-1,0)$，与 $x$ 轴的另一个交点为 $B$，与 $y$ 轴交于点 $C$。(1) 若 $\\triangle ABC$ 是等腰三角形，求点 $B$ 的横坐标的所有可能值；(2) 若 $\\triangle ABC$ 是钝角三角形，同时也是等腰三角形，求 $a$、$b$ 的值。',
      blanks: [
        { kind: 'reals', label: '(1) 点 $B$ 的横坐标（全部填出，用逗号隔开，化成最简二次根式）', answer: ['-1+√10', '-1-√10', '4', '1'], simplest: true },
        { kind: 'real', label: '(2) $a=$', answer: '(1-√10)/3', simplest: true },
        { kind: 'real', label: '$b=$', answer: '(-8-√10)/3', simplest: true },
      ],
      explain: [
        '叠加的两个环节：把 $B$ 设成未知点，按等腰三角形的腰分三类求出 $B$；再逐个判断钝角，用剩下的 $B$ 定出表达式。',
        '$C(0,-3)$。设 $B(p,0)$，$p\\ne-1$。$-1$、$p$ 是方程 $ax^2+bx-3=0$ 的两根，可设 $y=a(x+1)(x-p)$，令 $x=0$ 得 $-ap=-3$，$a=\\frac3p$（所以 $p\\ne0$）。',
        '$AB=|p+1|$，$AC^2=1+9=10$，$BC^2=p^2+9$。① $AB=AC$：$(p+1)^2=10$，$p=-1\\pm\\sqrt{10}$；② $AB=BC$：$(p+1)^2=p^2+9$，$p=4$；③ $AC=BC$：$p^2+9=10$，$p=\\pm1$，$p=-1$ 时 $B$ 与 $A$ 重合，舍去，$p=1$。坑：漏掉 $B$ 在 $A$ 左边的 $p=-1-\\sqrt{10}$，或者没舍 $p=-1$。',
        '(2) 思路：钝角不好直接列方程，就对 (1) 的四种情况逐个检验最大边。$AB^2$ 最大时看 $AC^2+BC^2<AB^2$，即 $10+p^2+9<(p+1)^2$，得 $p>9$，四个值都不满足；$BC^2$ 最大时看 $AB^2+AC^2<BC^2$，即 $(p+1)^2+10<p^2+9$，得 $p<-1$，只有 $p=-1-\\sqrt{10}$ 满足；$AC^2=10$ 最大时要 $AB^2+BC^2<10$，四个值都不满足。',
        '所以 $p=-1-\\sqrt{10}$，此时 $\\angle A$ 是钝角（$B$ 在 $A$ 的左边，$C$ 在 $A$ 的右下方）。',
        '$a=\\frac3p=\\frac{3}{-1-\\sqrt{10}}=-\\frac{3(\\sqrt{10}-1)}{9}=\\frac{1-\\sqrt{10}}3$；$b=a(1-p)=\\frac{1-\\sqrt{10}}3\\cdot(2+\\sqrt{10})=\\frac{-8-\\sqrt{10}}3$。坑：分母没有有理化，或者 $b$ 的符号算错。',
      ],
      verify: () => {
        const r10 = Math.sqrt(10), eq = (u, v) => Math.abs(u - v) < 1e-9;
        const cand = [-1 + r10, -1 - r10, 4, 1, -1];  // ①②③ 三类方程的全部根
        const ps = cand.filter(p => !eq(p, -1) && !eq(p, 0)).filter(p => {
          const AB2 = (p + 1) ** 2, AC2 = 10, BC2 = p * p + 9;
          return eq(AB2, AC2) || eq(AB2, BC2) || eq(AC2, BC2);
        });
        const obtuse = ps.filter(p => {
          const s = [(p + 1) ** 2, 10, p * p + 9].sort((u, v) => u - v);
          return s[0] + s[1] < s[2] - 1e-9;
        });
        const p = obtuse.length === 1 ? obtuse[0] : NaN, a = 3 / p;
        return [ps, a, a * (1 - p)];
      },
    },
    {
      id: '27.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图（示意图），开口向下的抛物线 $C_1$：$y=ax^2+bx+c$ 与 $x$ 轴交于 $A(1,0)$、$B(5,0)$，顶点为 $D$，且 $AD=2\\sqrt5$。把 $C_1$ 绕 $x$ 轴上的点 $M(m,0)$ 旋转 $180^\\circ$ 得到抛物线 $C_2$，点 $A$、$B$、$D$ 的对应点分别是 $A\'$、$B\'$、$D\'$。(1) 求 $C_1$ 的表达式；(2) 若以 $A$、$D$、$A\'$、$D\'$ 为顶点的四边形是矩形，或以 $B$、$D$、$B\'$、$D\'$ 为顶点的四边形是矩形，求 $m$ 的所有可能值；(3) 点 $Q$ 在 $y$ 轴上，若以 $A$、$D$、$D\'$、$Q$ 为顶点的四边形是平行四边形，求 $m$ 的所有可能值；(4) 当 $m>0$ 且 (2) 成立时，求 $C_2$ 的表达式。',
      figure: FIG273.c03,
      blanks: [
        { kind: 'expr', label: '(1) $C_1$：$y=$', answer: '-x^2+6x-5' },
        { kind: 'nums', label: '(2) $m=$（全部填出，用逗号隔开）', answer: ['6', '0'] },
        { kind: 'nums', label: '(3) $m=$（全部填出，用逗号隔开）', answer: ['1/2', '5/2', '7/2'] },
        { kind: 'expr', label: '(4) $C_2$：$y=$', answer: 'x^2-18x+77' },
      ],
      explain: [
        '叠加的两个环节：用两点距离定出顶点，再定表达式；然后把旋转 $180^\\circ$ 翻译成“$M$ 是对应点连线的中点”，把矩形条件化成关于 $m$ 的方程，分两种四边形讨论；再按哪两点连成对角线分类，用“对角线中点相同”列方程。',
        '(1) 对称轴 $x=\\frac{1+5}2=3$，设 $D(3,k)$。$AD^2=(3-1)^2+k^2=20$，$k=\\pm4$。开口向下又与 $x$ 轴有交点，顶点在 $x$ 轴上方，$k=4$。设 $y=a(x-1)(x-5)$，代入 $D$：$-4a=4$，$a=-1$，$C_1$：$y=-x^2+6x-5$。坑：取 $k=-4$，得到开口向上的抛物线。',
        '(2) 绕 $M$ 旋转 $180^\\circ$，$M$ 是 $AA\'$、$DD\'$、$BB\'$ 的中点，所以 $A\'(2m-1,0)$，$B\'(2m-5,0)$，$D\'(2m-3,-4)$。四边形 $ADA\'D\'$ 的两条对角线 $AA\'$、$DD\'$ 互相平分，它是平行四边形；对角线相等时是矩形，即 $MA=MD$。',
        '$MA=MD$：$(m-1)^2=(m-3)^2+16$，$4m-8=16$，$m=6$。同理 $BDB\'D\'$ 是矩形要 $MB=MD$：$(m-5)^2=(m-3)^2+16$，$-4m+16=16$，$m=0$（就是绕原点旋转）。坑：只考虑 $ADA\'D\'$ 一种。',
        '(3) 设 $Q(0,q)$，$D\'(2m-3,-4)$。平行四边形的对角线互相平分，按 $Q$ 与哪个点连成对角线分三类，看两条对角线的端点坐标之和是否相同：① $AD$、$D\'Q$ 为对角线：$1+3=2m-3+0$，$0+4=-4+q$，得 $m=\\frac72$，$Q(0,8)$；② $AD\'$、$DQ$ 为对角线：$1+2m-3=3+0$，$0-4=4+q$，得 $m=\\frac52$，$Q(0,-8)$；③ $DD\'$、$AQ$ 为对角线：$3+2m-3=1+0$，$4-4=0+q$，得 $m=\\frac12$，$Q(0,0)$。坑：只把 $AD$ 当边、按“$DD\'$ 被 $M$ 平分”去凑，漏掉另两类；或者只用横坐标列方程，不检查纵坐标。',
        '检验：$A$、$D$、$D\'$ 共线时（$D\'$ 在直线 $y=2x-2$ 上，即 $2m-3=-1$，$m=1$）构不成四边形，三个值都不是 $1$，四点也互不重合，所以 $m=\\frac12$、$\\frac52$、$\\frac72$。',
        '(4) $m=6$，$C_2$ 开口向上、形状不变，顶点 $D\'(9,-4)$：$y=(x-9)^2-4=x^2-18x+77$。',
      ],
      verify: () => {
        const A = [F(1), F(0)], B = [F(5), F(0)];
        const ax = A[0].add(B[0]).div(2);
        let k = null;
        for (let i = 1; i <= 40; i++) if (ax.sub(A[0]).pow(2).add(i * i).eq(20)) k = F(i);  // 开口向下取正
        const co = solve273([[1, 0], [5, 0], [ax, k]]);
        const D = [ax, k];
        const d2 = (P, Q) => P[0].sub(Q[0]).pow(2).add(P[1].sub(Q[1]).pow(2));
        const rot = (P, m) => [m.mul(2).sub(P[0]), P[1].neg()];
        const rect = [], para = [];
        for (let i = -80; i <= 80; i++) {
          const m = F(i).div(4);
          if (m.eq(1) || m.eq(5)) continue;
          if (d2(A, rot(A, m)).eq(d2(D, rot(D, m))) || d2(B, rot(B, m)).eq(d2(D, rot(D, m)))) rect.push(m);
          // (3) 以 A、D、D′ 为三个顶点的平行四边形的第四个顶点在 y 轴上；A、D、D′ 共线时舍去
          const D2 = rot(D, m);
          const cross = D[0].sub(A[0]).mul(D2[1].sub(A[1])).sub(D[1].sub(A[1]).mul(D2[0].sub(A[0])));
          if (cross.isZero()) continue;
          const fourth = [[A, D, D2], [A, D2, D], [D, D2, A]].map(([P, R, S]) => [P[0].add(R[0]).sub(S[0]), P[1].add(R[1]).sub(S[1])]);
          if (fourth.some(Q => Q[0].isZero())) para.push(m);
        }
        const mp = rect.find(m => m.cmp(0) > 0);
        const D2 = rot(D, mp);
        return [expr273(co), rect, para, expr273(std273(co[0].neg(), D2[0].neg(), D2[1]))];
      },
    },
    {
      id: '27.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知抛物线 $y=mx^2-4mx+3m+2$（$m\\ne0$）。(1) 无论 $m$ 取什么非零实数，抛物线都经过两个定点 $A$、$B$（$A$ 在 $B$ 左侧），求它们的横坐标；(2) 设抛物线的顶点为 $D$，若 $\\triangle ABD$ 是等腰直角三角形，求 $m$；(3) 已知点 $P(0,-1)$、$Q(5,-1)$，若抛物线与线段 $PQ$ 恰好有一个公共点，求 $m$ 的取值范围。',
      blanks: [
        { kind: 'nums', label: '(1) $A$、$B$ 的横坐标（用逗号隔开）', answer: ['1', '3'] },
        { kind: 'nums', label: '(2) $m=$（全部填出，用逗号隔开）', answer: ['1', '-1'] },
        { kind: 'num', label: '(3) 当 $m>0$ 时，$m=$', answer: '3' },
        { kind: 'ineq', var: 'm', label: '当 $m<0$ 时，$m$ 的取值范围是', answer: '-1<m<=-3/8' },
      ],
      explain: [
        '叠加的两个环节：先按 $m$ 整理找定点、定出顶点随 $m$ 的变化；再按开口方向分类，用“顶点位置 + 线段端点处的函数值”判断与线段的公共点个数。',
        '(1) $y=m(x^2-4x+3)+2$，对所有 $m$ 成立要 $x^2-4x+3=0$，$x=1$ 或 $x=3$，此时 $y=2$。$A(1,2)$、$B(3,2)$。',
        '(2) 对称轴 $x=2$，顶点 $D(2,2-m)$，正好在 $AB$ 的垂直平分线上，$DA=DB$ 总成立。直角只能在 $D$，此时 $D$ 到 $AB$ 的距离等于 $\\frac12AB=1$：$|2-m-2|=1$，$m=\\pm1$，表达式为 $y=x^2-4x+5$ 或 $y=-x^2+4x-1$。坑：只取开口向上的一个。',
        '(3) 线段 $PQ$ 在直线 $y=-1$ 上，$0\\le x\\le5$，对称轴 $x=2$ 在其中。记 $x=0$、$x=5$ 时的函数值为 $3m+2$、$8m+2$。',
        '$m>0$，开口向上：顶点纵坐标 $2-m>-1$ 时没有公共点；$2-m=-1$ 即 $m=3$ 时，顶点 $(2,-1)$ 在线段上，恰好一个；$m>3$ 时顶点在线段下方，而两端的函数值 $3m+2$、$8m+2$ 都大于 $-1$，对称轴左右各有一个公共点，共两个。所以 $m=3$。',
        '$m<0$，开口向下，顶点 $(2,2-m)$ 在线段上方。对称轴左边 $y$ 随 $x$ 减小而减小，左侧与线段有公共点当且仅当 $3m+2\\le-1$，即 $m\\le-1$；右侧同理当且仅当 $8m+2\\le-1$，即 $m\\le-\\frac38$。恰好一个：$m\\le-\\frac38$ 且 $m>-1$。坑：端点 $m=-1$ 时左侧公共点正好是 $P$，右侧也有一个，共两个，不能取等号；$m=-\\frac38$ 时右侧公共点是 $Q$，要取等号。',
        '答案：$m=3$ 或 $-1<m\\le-\\frac38$。',
      ],
      verify: () => {
        const fixed = [];
        for (let x = -10; x <= 10; x++) if (x * x - 4 * x + 3 === 0) fixed.push(x);
        const [A, B] = fixed.map(x => [F(x), F(2)]);
        const d2 = (P, Q) => P[0].sub(Q[0]).pow(2).add(P[1].sub(Q[1]).pow(2));
        const right = [], one = [];
        for (let k = -200; k <= 200; k++) {
          if (!k) continue;
          const m = F(k).div(40), co = [m, m.mul(-4), m.mul(3).add(2)];
          const vx = co[1].neg().div(m.mul(2)), D = [vx, val273(co, vx)];
          if (d2(D, A).eq(d2(D, B)) && d2(D, A).add(d2(D, B)).eq(d2(A, B))) right.push(m);
          // 与 y=-1 的交点满足 (x-2)²=1-3/m，交点 2±s 落在 [0,5] 上的个数
          const S2 = F(1).sub(F(3).div(m));
          let cnt = 0;
          if (S2.isZero()) cnt = 1;
          else if (S2.cmp(0) > 0) cnt = (S2.cmp(4) <= 0 ? 1 : 0) + (S2.cmp(9) <= 0 ? 1 : 0);
          if (cnt === 1) one.push(m);
        }
        const pos = one.filter(m => m.cmp(0) > 0), neg = one.filter(m => m.cmp(0) < 0);
        const lo = neg[0].sub(F(1).div(40)), hi = neg[neg.length - 1];
        return [fixed, right, pos.length === 1 ? pos[0] : null, `${lo}<m<=${hi}`];
      },
    },
    {
      id: '27.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '开口向下的抛物线 $C_1$ 经过原点 $O$ 和点 $(4,0)$，顶点为 $M$。抛物线 $C_2$ 与 $C_1$ 关于直线 $x=t$（$t\\ne2$）对称，顶点为 $N$，$C_1$ 与 $C_2$ 的交点为 $P$。若 $\\triangle MNP$ 是直角三角形，且 $C_2$ 经过点 $(5,3)$。(1) 求 $t$ 的所有可能值；(2) 当 $t$ 取较大的值时，求 $C_1$ 的表达式。',
      blanks: [
        { kind: 'nums', label: '(1) $t=$（全部填出，用逗号隔开）', answer: ['3', '13/4'] },
        { kind: 'expr', label: '(2) $t$ 取较大的值时，$C_1$：$y=$', answer: '-4/5x^2+16/5x' },
      ],
      explain: [
        '叠加的两个环节：由轴对称写出 $C_2$ 和交点，判断直角的位置，把直角条件化成 $a$ 与 $t$ 的关系；再和“$C_2$ 过定点”联立，按 $t$ 在 $2$ 的哪一侧分类去绝对值，用韦达定理排除一类。',
        '设 $C_1$：$y=ax(x-4)=a(x-2)^2-4a$（$a<0$），$M(2,-4a)$。$N$ 是 $M$ 关于 $x=t$ 的对称点 $(2t-2,-4a)$，$C_2$：$y=a(x-2t+2)^2-4a$。',
        '令两式相等：$(x-2)^2=(x-2t+2)^2$，$t\\ne2$ 时只有 $x=t$，交点 $P(t,a(t-2)^2-4a)$。记 $s=t-2$，$P$ 在 $MN$ 的垂直平分线上、在 $MN$ 下方 $-as^2$ 处，$MN=2|s|$。',
        '$MN$ 是水平的，$P$ 不在 $M$、$N$ 的正下方，所以直角只能在 $P$，$\\triangle MNP$ 是等腰直角三角形，$-as^2=|s|$，即 $a=-\\frac1{|s|}$。',
        '$C_2$ 过 $(5,3)$：$a[(5-2t+2)^2-4]=3$，即 $a[(3-2s)^2-4]=3$。$s>0$ 时 $a=-\\frac1s$，整理得 $4s^2-9s+5=0$，$s=1$ 或 $s=\\frac54$；$s<0$ 时 $a=\\frac1s$，整理得 $4s^2-15s+5=0$，若有实数根，两根之和 $\\frac{15}4>0$、积 $\\frac54>0$，两根都是正数，与 $s<0$ 矛盾。坑：不分 $s$ 的正负，把 $|s|$ 直接当成 $s$。',
        '$s=1$：$t=3$，$a=-1$，$C_1$：$y=-x^2+4x$；$s=\\frac54$：$t=\\frac{13}4$，$a=-\\frac45$，$C_1$：$y=-\\frac45x^2+\\frac{16}5x$。',
      ],
      verify: () => {
        const ts = [], as = [];
        const dot = (O, U, V) => U[0].sub(O[0]).mul(V[0].sub(O[0])).add(U[1].sub(O[1]).mul(V[1].sub(O[1])));
        for (let k = -80; k <= 80; k++) {
          const t = F(k).div(8);
          if (t.eq(2)) continue;
          const den = F(7).sub(t.mul(2)).pow(2).sub(4);
          if (den.isZero()) continue;
          const a = F(3).div(den);  // C2 过 (5,3) 定出 a
          if (a.cmp(0) >= 0) continue;
          const M = [F(2), a.mul(-4)], N = [t.mul(2).sub(2), a.mul(-4)], P = [t, a.mul(t.sub(2).pow(2)).sub(a.mul(4))];
          if (dot(P, M, N).isZero() || dot(M, N, P).isZero() || dot(N, M, P).isZero()) { ts.push(t); as.push(a); }
        }
        const i = ts.reduce((b, t, j) => (t.cmp(ts[b]) > 0 ? j : b), 0);
        return [ts, expr273([as[i], as[i].mul(-4), 0])];
      },
    },
  ],
});
