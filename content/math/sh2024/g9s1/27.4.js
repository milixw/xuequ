'use strict';

// 上海数学九年级上册 · 27.4 二次函数与一元二次方程（课本第 26～32 页）
// 知识范围：已知函数值求自变量（化成一元二次方程 ax²+bx+c=t）；抛物线与 x 轴交点的横坐标就是方程 ax²+bx+c=0 的实数根；
//   由两个交点设 y=a(x−x₁)(x−x₂) 求表达式；交点个数 2/1/0 ⇔ Δ>0/Δ=0/Δ<0（反过来也成立），含参时要求二次项系数 ≠0；
//   用图像和取值表估计方程的近似根；两交点间的距离
// 延伸（用已学知识可解）：抛物线与水平直线 y=k、一般直线、线段的公共点（联立后看判别式和端点）；f(x)=k 在给定范围内根的个数
// 可以使用：27.1～27.3（概念、图像与性质、配方、平移、区间最值、待定系数法）；一元二次方程、判别式、韦达定理正向使用；
//   八下第 24～26 章的基础结论（平面直角坐标系、两点间距离公式、一次函数）
// 还没学：实际应用题（27.5）、二次不等式的系统解法（课本本节没有“看图写 y>0 的范围”，不出）、相似三角形、三角比、圆
// 本节约定：带根号的结果用 real / reals 并要求最简；取值范围用 ineq 填空

const SVG274 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false, w = 1.6) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, size = 14) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle" font-size="${size}">${t}</text>`,
  curve: pts => `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (kx, ky, ox, oy) => ([x, y]) => [ox + x * kx, oy - y * ky],
  axes: (m, x0, x1, y0, y1) => {
    const ax = [m([x0, 0]), m([x1, 0])], ay = [m([0, y0]), m([0, y1])];
    const ah = p => `<polygon points="${p[0]},${p[1]} ${p[0] - 8},${p[1] - 4} ${p[0] - 8},${p[1] + 4}" fill="#2b2b2b"/>`;
    const av = p => `<polygon points="${p[0]},${p[1]} ${p[0] - 4},${p[1] + 8} ${p[0] + 4},${p[1] + 8}" fill="#2b2b2b"/>`;
    return SVG274.seg(ax[0], ax[1], false, 1.2) + ah(ax[1]) + SVG274.seg(ay[0], ay[1], false, 1.2) + av(ay[1])
      + SVG274.text('<tspan font-style="italic">x</tspan>', ax[1], -2, 12) + SVG274.text('<tspan font-style="italic">y</tspan>', ay[1], 12, 2)
      + SVG274.text('O', m([0, 0]), -10, 10);
  },
};

// 一元二次方程（或一次方程）的实数根，从小到大；重根只算一个
const roots274 = (a, b, c) => {
  if (Math.abs(a) < 1e-12) return Math.abs(b) < 1e-12 ? [] : [-c / b];
  let d = b * b - 4 * a * c;
  if (Math.abs(d) < 1e-9) d = 0;
  if (d < 0) return [];
  if (d === 0) return [-b / (2 * a)];
  const s = Math.sqrt(d);
  return [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
};
const R274 = v => Math.round(v * 1e9) / 1e9;
const near274 = (x, y) => Math.abs(x - y) < 1e-9;
// 在 [lo, hi] 里的根（loInc、hiInc 表示端点能不能取）
const inRange274 = (rs, lo, hi, loInc = true, hiInc = true) => rs.filter(x => (loInc ? x > lo - 1e-9 : x > lo + 1e-9) && (hiInc ? x < hi + 1e-9 : x < hi - 1e-9));
// 小分母小数转成分数文本
const frac274 = x => {
  for (let d = 1; d <= 60; d++) {
    const n = Math.round(x * d);
    if (Math.abs(x * d - n) < 1e-9) return d === 1 ? String(n) : `${n}/${d}`;
  }
  return String(x);
};
// 由“临界值 + 逐段取点检验”求出满足 pred 的参数集合，写成 ineq 文本（一段返回字符串，多段返回数组）
const range274 = (pred, crit, v) => {
  const cs = [...crit].sort((p, q) => p - q);
  const elems = [{ lo: -Infinity, hi: cs[0], t: cs[0] - 1 }];
  cs.forEach((c, i) => {
    elems.push({ pt: c });
    elems.push({ lo: c, hi: i + 1 < cs.length ? cs[i + 1] : Infinity, t: i + 1 < cs.length ? (c + cs[i + 1]) / 2 : c + 1 });
  });
  const ok = elems.map(e => pred('pt' in e ? e.pt : e.t));
  const out = [];
  for (let i = 0; i < elems.length; i++) {
    if (!ok[i]) continue;
    let j = i;
    while (j + 1 < elems.length && ok[j + 1]) j++;
    const s = elems[i], e = elems[j];
    const lo = 'pt' in s ? s.pt : s.lo, loInc = 'pt' in s, hi = 'pt' in e ? e.pt : e.hi, hiInc = 'pt' in e;
    if (lo === hi) out.push(`${v}=${frac274(lo)}`);
    else if (lo === -Infinity) out.push(`${v}${hiInc ? '≤' : '<'}${frac274(hi)}`);
    else if (hi === Infinity) out.push(`${v}${loInc ? '≥' : '>'}${frac274(lo)}`);
    else out.push(`${frac274(lo)}${loInc ? '≤' : '<'}${v}${hiInc ? '≤' : '<'}${frac274(hi)}`);
    i = j;
  }
  return out.length === 1 ? out[0] : out;
};

const FIG274 = (() => {
  const S = SVG274;
  const out = {};
  // b07：y=x²+2x−3 的图像，标出与 x 轴交点、顶点和点 (2,5)
  {
    const f = x => x * x + 2 * x - 3;
    const m = S.map(30, 18, 160, 125);
    const pts = [];
    for (let x = -4.2; x <= 2.2001; x += 0.05) pts.push(m([x, f(x)]));
    let g = S.axes(m, -5, 3.3, -4.8, 6.2) + S.curve(pts);
    g += S.dot(m([-3, 0])) + S.text('−3', m([-3, 0]), -8, 12);
    g += S.dot(m([1, 0])) + S.text('1', m([1, 0]), 8, 12);
    g += S.dot(m([-1, -4])) + S.text('(−1, −4)', m([-1, -4]), 0, 14);
    g += S.seg(m([-1, -4]), m([-1, 0]), true, 1);
    g += S.dot(m([2, 5])) + S.text('(2, 5)', m([2, 5]), 30, 0);
    out.b07 = S.wrap(290, 230, g);
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/27.4',
  title: '二次函数与一元二次方程',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第一轮打回：c03（AB 不变、面积为定值的绝对值分类）只有 3 级；c01、c02、c05 只到真卷压轴，c02 与 e04 方法太近。处理：c01 改为翻折截端点的图像与斜线 y=−x+k 的公共点个数（相切、过翻折点、过端点）；c02 改为过定点的抛物线与线段 OD 恰两个公共点；c03 改为抛物线上点 P 使 △PAB 与 △CAB 面积相等，P 的个数随 m 变化；c04 改为直线与抛物线交点、∠AOB 恒为直角与 OB=8OA；c05 加求两公共点距离最大值。第二轮整节通过；c04(1) 的 y=x² 与过 (0,1) 的直线是流传数据，改为 y=½x² 与 y=kx+2。卡片配 parabolaRoots。' },
  intro: [
    {
      title: '已知函数值，求自变量',
      body: '知道二次函数 $y=ax^2+bx+c$ 的函数值是 $t$，要找对应的 $x$，就是解方程 $ax^2+bx+c=t$。先把 $t$ 移到左边化成一般形式，再用因式分解或求根公式。反过来，解方程 $ax^2+bx+c=t$ 也可以看成“函数值为 $t$ 时找 $x$”。',
      example: '$y=3x^2-x$ 的函数值为 $2$：$3x^2-x-2=0$，$(3x+2)(x-1)=0$，所以 $x=1$ 或 $x=-\\frac23$。',
      pitfall: '函数值是 $t$ 时，要先移项再解，不要直接令右边为 $0$；得到的方程也可能只有一个根或没有实数根。',
    },
    {
      title: '与 x 轴的交点 ↔ 方程的根',
      body: '抛物线与 $x$ 轴交点的纵坐标是 $0$，所以交点的横坐标就是方程 $ax^2+bx+c=0$ 的实数根。反过来，知道两个交点 $(x_1,0)$、$(x_2,0)$，可以设 $y=a(x-x_1)(x-x_2)$，再用一个点求 $a$。',
      example: '$y=x^2-x-6$：解 $x^2-x-6=0$ 得 $x=3$ 或 $x=-2$，交点是 $(3,0)$、$(-2,0)$；它也可以写成 $y=(x-3)(x+2)$。',
      pitfall: '由 $(x-x_1)(x-x_2)$ 读交点时注意符号：因式 $x+2$ 对应的交点横坐标是 $-2$。',
    },
    {
      title: '交点个数看判别式',
      body: '方程 $ax^2+bx+c=0$ 的根有三种情况，对应抛物线与 $x$ 轴交点的三种情况：$\\Delta=b^2-4ac>0$ 时有两个交点，$\\Delta=0$ 时有且只有一个交点，$\\Delta<0$ 时没有交点。反过来也成立。拖动下面的滑块改变 $c$，看交点个数和 $\\Delta$ 怎样一起变。',
      example: '$y=x^2+4x+c$：$\\Delta=16-4c$。$c<4$ 时两个交点，$c=4$ 时一个，$c>4$ 时没有。',
      pitfall: '含参数时先保证二次项系数不为 $0$；题目只说“函数”而没说“二次函数”时，还要单独看二次项系数为 $0$ 的情况。',
      demo: { type: 'parabolaRoots', a: 1, b: 4, c: 2, cMin: -4, cMax: 8 },
    },
    {
      title: '两交点之间的距离',
      body: '抛物线与 $x$ 轴交于 $A(x_1,0)$、$B(x_2,0)$ 时，$AB=|x_1-x_2|$。根不好求时用根与系数的关系：$(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2$，整理后 $AB=\\dfrac{\\sqrt{\\Delta}}{|a|}$。',
      example: '$y=x^2-5x+2$：$x_1+x_2=5$，$x_1x_2=2$，$(x_1-x_2)^2=25-8=17$，所以 $AB=\\sqrt{17}$。',
      pitfall: '分母是 $|a|$，$a$ 为负数时不要算出负的长度。',
    },
    {
      title: '用图像估计近似根',
      body: '画出 $y=ax^2+bx+c$ 的图像，看它在哪两个整数之间穿过 $x$ 轴；再列表计算，找出函数值由负变正（或由正变负）的相邻两个 $x$，根就夹在它们之间。逐步缩小范围，直到满足精确度。',
      example: '$y=x^2-3$：$x=1.7$ 时 $y=-0.11$，$x=1.8$ 时 $y=0.24$，所以方程 $x^2-3=0$ 的正根在 $1.7$ 与 $1.8$ 之间。',
      pitfall: '表里某个函数值很接近 $0$，并不说明根就是这个 $x$，要看函数值在哪两个 $x$ 之间变号。',
    },
    {
      title: '与水平直线、一般直线的交点',
      body: '抛物线与直线 $y=k$ 的交点，就是方程 $ax^2+bx+c=k$ 的根；与直线 $y=mx+n$ 的交点，联立后化成一个一元二次方程，再看判别式。如果只给了线段或者 $x$ 的一段范围，还要检查根是否落在范围里，端点能不能取。',
      example: '$y=-x^2+4x$ 的最大值是 $4$：直线 $y=k$ 与它在 $k<4$ 时有两个交点，$k=4$ 时一个，$k>4$ 时没有。',
      pitfall: '把直线上下平移（或画出水平线）对照图像，比只算判别式更不容易漏掉端点的情况。',
    },
  ],
  questions: [
    // ---------- 基础 ----------
    {
      id: '27.4-b01',
      level: 'basic',
      type: 'fill',
      stem: '二次函数 $y=2x^2-3x-4$ 的函数值等于 $1$ 时，求自变量 $x$ 的值。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '$x=$', answer: ['5/2', '-1'] }],
      explain: [
        '令 $2x^2-3x-4=1$，移项得 $2x^2-3x-5=0$。',
        '$(2x-5)(x+1)=0$，所以 $x=\\frac52$ 或 $x=-1$。',
        '坑：直接解 $2x^2-3x-4=0$（那是函数值为 $0$ 时的 $x$），或移项时把 $-4-1$ 算成 $-3$。',
      ],
      verify: () => roots274(2, -3, -5).map(R274),
    },
    {
      id: '27.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '二次函数 $y=(2x-1)(x+3)$ 的图像与 $x$ 轴交点的横坐标是多少？与 $y$ 轴交点的纵坐标是多少？',
      blanks: [
        { kind: 'nums', label: '与 $x$ 轴交点的横坐标（全部填出，用逗号隔开）', answer: ['1/2', '-3'] },
        { kind: 'num', label: '与 $y$ 轴交点的纵坐标', answer: '-3' },
      ],
      explain: [
        '令 $y=0$：$(2x-1)(x+3)=0$，$x=\\frac12$ 或 $x=-3$。坑：由 $2x-1$ 读成 $x=1$，或由 $x+3$ 读成 $x=3$。',
        '令 $x=0$：$y=(-1)\\times3=-3$。',
      ],
      verify: () => { const a = 2, b = 6 - 1, c = -3; return [roots274(a, b, c).map(R274), R274(c)]; },
    },
    {
      id: '27.4-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列抛物线中，与 $x$ 轴没有公共点的是（　　）',
      options: ['$y=x(x-4)+4$', '$y=-2x^2+3x-1$', '$y=-3x^2+2x-1$', '$y=-(x-3)^2+2$'],
      answer: 2,
      explain: [
        'A：化成 $y=x^2-4x+4$，$\\Delta=16-16=0$，有一个公共点。坑：没展开就判断。',
        'B：$\\Delta=9-4\\times(-2)\\times(-1)=9-8=1>0$，有两个公共点。坑：看到 $a$、$c$ 都是负数就以为没有交点。',
        'C：$\\Delta=4-4\\times(-3)\\times(-1)=4-12=-8<0$，没有公共点。',
        'D：开口向下、顶点 $(3,2)$ 在 $x$ 轴上方，有两个公共点。选 C。',
      ],
      verify: () => [[1, -4, 4], [-2, 3, -1], [-3, 2, -1], [-1, 6, -7]].findIndex(([a, b, c]) => roots274(a, b, c).length === 0),
    },
    {
      id: '27.4-b04',
      level: 'basic',
      type: 'choice',
      stem: '抛物线 $y=(k-2)x^2+2kx+k+1$ 与 $x$ 轴有两个交点，则 $k$ 的取值范围是（　　）',
      options: ['$k>-2$', '$k>-2$ 且 $k\\ne2$', '$k\\ge-2$ 且 $k\\ne2$', '$k<-2$'],
      answer: 1,
      explain: [
        '既然是抛物线，$k-2\\ne0$，即 $k\\ne2$。',
        '$\\Delta=(2k)^2-4(k-2)(k+1)=4k^2-4(k^2-k-2)=4k+8$。两个交点要求 $\\Delta>0$，$k>-2$。',
        '所以 $k>-2$ 且 $k\\ne2$，选 B。坑：忘了二次项系数不为 $0$ 选 A；把“两个交点”当成 $\\Delta\\ge0$ 选 C。',
      ],
      verify: () => {
        const got = range274(k => !near274(k, 2) && roots274(k - 2, 2 * k, k + 1).length === 2, [-2, 2], 'k');
        const opts = [['k>-2'], ['-2<k<2', 'k>2'], ['-2≤k<2', 'k>2'], ['k<-2']];
        return opts.findIndex(o => JSON.stringify(o) === JSON.stringify([].concat(got)));
      },
    },
    {
      id: '27.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '二次函数的图像与 $x$ 轴交于 $(-1,0)$、$(5,0)$ 两点，且经过点 $(2,6)$，求这个二次函数的表达式。',
      blanks: [{ kind: 'expr', label: '$y=$', answer: '-2/3*(x+1)*(x-5)' }],
      explain: [
        '与 $x$ 轴交于 $(-1,0)$、$(5,0)$，可设 $y=a(x+1)(x-5)$。坑：设成 $a(x-1)(x+5)$，符号反了。',
        '代入 $(2,6)$：$6=a\\times3\\times(-3)=-9a$，$a=-\\frac23$。',
        '所以 $y=-\\frac23(x+1)(x-5)$，即 $y=-\\frac23x^2+\\frac83x+\\frac{10}3$。',
      ],
      verify: () => { const a = F(6).div(F(2 + 1).mul(F(2 - 5))); return `${a}*(x+1)*(x-5)`; },
    },
    {
      id: '27.4-b06',
      level: 'basic',
      type: 'fill',
      stem: '抛物线 $y=-2x^2+5x+1$ 与 $x$ 轴交于 $A$、$B$ 两点，求线段 $AB$ 的长。（结果化成最简形式）',
      blanks: [{ kind: 'real', label: '$AB=$', answer: '√33/2', simplest: true }],
      explain: [
        '设 $A(x_1,0)$、$B(x_2,0)$，$x_1$、$x_2$ 是 $-2x^2+5x+1=0$ 的两根，$\\Delta=25+8=33>0$。',
        '$x_1+x_2=\\frac52$，$x_1x_2=-\\frac12$，$(x_1-x_2)^2=\\frac{25}4+2=\\frac{33}4$。',
        '$AB=|x_1-x_2|=\\frac{\\sqrt{33}}2$。坑：用 $\\frac{\\sqrt\\Delta}{a}$ 算出负数，或忘了开方写成 $\\frac{33}4$。',
      ],
      verify: () => { const r = roots274(-2, 5, 1); return r[1] - r[0]; },
    },
    {
      id: '27.4-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，二次函数 $y=ax^2+bx+c$ 的图像与 $x$ 轴交于 $(-3,0)$、$(1,0)$，顶点是 $(-1,-4)$，图像还经过点 $(2,5)$。不求表达式，直接写出下列方程的解。（每空全部填出，用逗号隔开）',
      figure: FIG274.b07,
      blanks: [
        { kind: 'nums', label: '(1) $ax^2+bx+c=0$ 的解', answer: ['-3', '1'] },
        { kind: 'nums', label: '(2) $ax^2+bx+c=-4$ 的解', answer: ['-1'] },
        { kind: 'nums', label: '(3) $ax^2+bx+c=5$ 的解', answer: ['2', '-4'] },
      ],
      explain: [
        '(1) 方程的根就是图像与 $x$ 轴交点的横坐标：$-3$、$1$。',
        '(2) 直线 $y=-4$ 只碰到顶点，方程只有一个根 $x=-1$。坑：写成两个根。',
        '(3) 对称轴是 $x=-1$，点 $(2,5)$ 关于对称轴的对称点是 $(-4,5)$，所以解是 $2$、$-4$。坑：只写图上标出的 $2$。',
      ],
      verify: () => {
        // 由两个交点和点 (2,5) 定出 a，再分别解方程（不依赖图上标的数）
        const a = 5 / ((2 + 3) * (2 - 1)), b = a * 2, c = a * -3;
        return [roots274(a, b, c).map(R274), roots274(a, b, c + 4).map(R274), roots274(a, b, c - 5).map(R274)];
      },
    },
    {
      id: '27.4-b08',
      level: 'basic',
      type: 'choice',
      stem: '下表是二次函数 $y=x^2+x-3$ 的几组对应值：$x=1.1$ 时 $y=-0.69$；$x=1.2$ 时 $y=-0.36$；$x=1.3$ 时 $y=-0.01$；$x=1.4$ 时 $y=0.36$；$x=1.5$ 时 $y=0.75$。方程 $x^2+x-3=0$ 的一个正根 $x$ 满足（　　）',
      options: ['$x=1.3$', '$1.2<x<1.3$', '$1.3<x<1.4$', '$1.4<x<1.5$'],
      answer: 2,
      explain: [
        '根所在的位置是函数值变号的地方：$x=1.3$ 时 $y<0$，$x=1.4$ 时 $y>0$，所以根在 $1.3$ 与 $1.4$ 之间，选 C。',
        '坑：$x=1.3$ 时 $y=-0.01$ 很接近 $0$，但不等于 $0$，$1.3$ 不是方程的根，选 A 错。',
      ],
      verify: () => {
        const r = roots274(1, 1, -3)[1];
        const ok = [1.1, 1.2, 1.3, 1.4, 1.5].every((x, i) => Math.abs(R274(x * x + x - 3) - [-0.69, -0.36, -0.01, 0.36, 0.75][i]) < 1e-9);
        if (!ok) return null;
        return [near274(r, 1.3), r > 1.2 && r < 1.3, r > 1.3 && r < 1.4, r > 1.4 && r < 1.5].indexOf(true);
      },
    },
    {
      id: '27.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '已知抛物线 $y=x^2-2x+m$ 与 $x$ 轴的一个交点是 $(-2,0)$，求另一个交点的横坐标和 $m$ 的值。',
      blanks: [
        { kind: 'num', label: '另一个交点的横坐标', answer: '4' },
        { kind: 'num', label: '$m=$', answer: '-8' },
      ],
      explain: [
        '对称轴是直线 $x=1$，两个交点关于它对称，$(-2,0)$ 的对称点是 $(4,0)$。也可以用两根之和 $x_1+x_2=2$ 得出另一根 $4$。',
        '代入 $(-2,0)$：$4+4+m=0$，$m=-8$。坑：代入时把 $-2x$ 算成 $-4$，得 $m=0$。',
      ],
      verify: () => { const m = -(4 + 4); return [R274(roots274(1, -2, m).find(x => !near274(x, -2))), m]; },
    },
    // ---------- 扩展 ----------
    {
      id: '27.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '函数 $y=(m-1)x^2-2mx+m+2$ 的图像与 $x$ 轴只有一个公共点，求 $m$ 的值。（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '$m=$', answer: ['1', '2'] }],
      explain: [
        '题目说的是“函数”，二次项系数可能为 $0$，要分两种情况。',
        '① $m=1$：$y=-2x+3$ 是一次函数，图像是直线，与 $x$ 轴只有一个公共点 $(\\frac32,0)$，符合。',
        '② $m\\ne1$：是二次函数，要求 $\\Delta=4m^2-4(m-1)(m+2)=4m^2-4(m^2+m-2)=-4m+8=0$，$m=2$。',
        '所以 $m=1$ 或 $m=2$。坑：只做第②种情况，漏掉 $m=1$。',
      ],
      verify: () => {
        const out = [];
        for (let k = -40; k <= 40; k++) {
          const m = k / 4;
          if (roots274(m - 1, -2 * m, m + 2).length === 1) out.push(m);
        }
        return out;
      },
    },
    {
      id: '27.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '抛物线 $y=x^2+(2m-1)x+m^2$ 与 $x$ 轴交于 $A(x_1,0)$、$B(x_2,0)$ 两点，且 $x_1^2+x_2^2=7$，求 $m$ 的值。（有几个就填几个，用逗号隔开）',
      blanks: [{ kind: 'nums', label: '$m=$', answer: ['-1'] }],
      explain: [
        '$x_1+x_2=1-2m$，$x_1x_2=m^2$。',
        '$x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=(1-2m)^2-2m^2=2m^2-4m+1=7$，即 $m^2-2m-3=0$，$m=3$ 或 $m=-1$。',
        '与 $x$ 轴有两个交点，要求 $\\Delta=(2m-1)^2-4m^2=1-4m>0$，即 $m<\\frac14$。',
        '$m=3$ 不满足，舍去；$m=-1$ 时 $y=x^2-3x+1$，$\\Delta=5>0$，符合。坑：不检验判别式，把 $3$ 也填上。',
      ],
      verify: () => {
        const out = [];
        for (let m = -20; m <= 20; m++) {
          const r = roots274(1, 2 * m - 1, m * m);
          if (r.length === 2 && near274(r[0] ** 2 + r[1] ** 2, 7)) out.push(m);
        }
        return out;
      },
    },
    {
      id: '27.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-6x+5=k$ 在 $-1<x\\le4$ 的范围内有两个不相等的实数根，求 $k$ 的取值范围。',
      blanks: [{ kind: 'ineq', var: 'k', label: '$k$ 的取值范围', answer: '-4<k≤-3' }],
      explain: [
        '把方程看成抛物线 $y=x^2-6x+5$（$-1<x\\le4$ 的部分）与水平直线 $y=k$ 的交点。',
        '$y=(x-3)^2-4$，顶点 $(3,-4)$。左端 $x=-1$ 时 $y=12$（取不到），右端 $x=4$ 时 $y=-3$（取得到）。',
        '对称轴左边一段 $-1<x<3$，$y$ 从 $12$ 降到 $-4$（都取不到）；右边一段 $3<x\\le4$，$y$ 从 $-4$ 升到 $-3$。',
        '两段各有一个交点，要求 $-4<k\\le-3$。坑：只用 $\\Delta>0$ 得 $k>-4$，没考虑右端点；或者把 $k=-3$ 漏掉（此时根 $2$、$4$ 都在范围内）。',
      ],
      verify: () => range274(k => inRange274(roots274(1, -6, 5 - k), -1, 4, false, true).length === 2, [-4, -3, 12], 'k'),
    },
    {
      id: '27.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知点 $A(-1,1)$、$B(2,4)$，抛物线 $y=x^2-2x+c$。求：(1) 抛物线与线段 $AB$ 有公共点时 $c$ 的取值范围；(2) 抛物线与线段 $AB$ 有两个公共点时 $c$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'c', label: '(1)', answer: '-2≤c≤17/4' },
        { kind: 'ineq', var: 'c', label: '(2)', answer: '4≤c<17/4' },
      ],
      explain: [
        '直线 $AB$：$y=x+2$，线段 $AB$ 对应 $-1\\le x\\le2$。联立 $x^2-2x+c=x+2$，得 $x^2-3x+c-2=0$，要看它在 $-1\\le x\\le2$ 内的根。',
        '设 $g(x)=x^2-3x+c-2=(x-\\frac32)^2+c-\\frac{17}4$，对称轴 $x=\\frac32$ 在范围内。$g(-1)=c+2$，$g(2)=c-4$。',
        '(1) 有根要求最小值 $c-\\frac{17}4\\le0$，且两端中较大的 $g(-1)=c+2\\ge0$。所以 $-2\\le c\\le\\frac{17}4$。',
        '(2) 两根 $\\frac32\\pm\\sqrt{\\frac{17}4-c}$ 都在范围内：要求 $c<\\frac{17}4$（两根不等），且右边的根 $\\le2$，即 $g(2)\\ge0$，$c\\ge4$（左边的根自然 $\\ge1$）。所以 $4\\le c<\\frac{17}4$。',
        '坑：把线段当成直线，只用 $\\Delta$ 得 $c\\le\\frac{17}4$；或漏掉 $c=4$（此时交点 $(1,3)$、$(2,4)$，后者正是端点 $B$）。',
      ],
      verify: () => {
        const cnt = c => inRange274(roots274(1, -3, c - 2), -1, 2).length;
        return [range274(c => cnt(c) >= 1, [-2, 4, 17 / 4], 'c'), range274(c => cnt(c) === 2, [-2, 4, 17 / 4], 'c')];
      },
    },
    {
      id: '27.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '直线 $y=x+b$ 与抛物线 $y=-x^2+3x$ 交于 $A$、$B$ 两点，且 $A$、$B$ 两点横坐标之差的绝对值是 $3$。求 $b$ 的值和线段 $AB$ 的长。（结果化成最简形式）',
      blanks: [
        { kind: 'num', label: '$b=$', answer: '-5/4' },
        { kind: 'real', label: '$AB=$', answer: '3√2', simplest: true },
      ],
      explain: [
        '联立 $-x^2+3x=x+b$，得 $x^2-2x+b=0$，$x_1+x_2=2$，$x_1x_2=b$。',
        '$(x_1-x_2)^2=4-4b=9$，$b=-\\frac54$；此时 $\\Delta=9>0$，确实有两个交点。',
        '$A$、$B$ 都在直线 $y=x+b$ 上，纵坐标之差也等于 $x_1-x_2$，所以 $AB=\\sqrt{3^2+3^2}=3\\sqrt2$。坑：把横坐标之差 $3$ 当成 $AB$ 的长。',
      ],
      verify: () => {
        for (let k = -40; k <= 40; k++) {
          const b = k / 4, r = roots274(1, -2, b);
          if (r.length === 2 && near274(r[1] - r[0], 3)) return [b, Math.hypot(r[1] - r[0], r[1] - r[0])];
        }
        return null;
      },
    },
    {
      id: '27.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '抛物线 $y=mx^2-(2m+1)x+2$（$m\\ne0$）。(1) 无论 $m$ 取何值，抛物线都经过 $x$ 轴上的同一个点，写出这个点的横坐标；(2) 若抛物线与 $x$ 轴的两个交点之间的距离是 $3$，求 $m$ 的值。',
      blanks: [
        { kind: 'num', label: '(1) 横坐标', answer: '2' },
        { kind: 'nums', label: '(2) $m=$（全部填出，用逗号隔开）', answer: ['1/5', '-1'] },
      ],
      explain: [
        '(1) 按 $m$ 整理：$y=m(x^2-2x)-x+2$。当 $x^2-2x=0$ 时 $y$ 与 $m$ 无关：$x=0$ 时 $y=2$，$x=2$ 时 $y=0$。在 $x$ 轴上的定点是 $(2,0)$。',
        '(2) $x=2$ 是方程 $mx^2-(2m+1)x+2=0$ 的一个根，由两根之积 $\\frac2m$ 得另一个根是 $\\frac1m$。',
        '两交点距离 $|2-\\frac1m|=3$：$\\frac1m=5$ 或 $\\frac1m=-1$，即 $m=\\frac15$ 或 $m=-1$（此时两根 $2$、$5$ 或 $2$、$-1$，不重合）。',
        '坑：只考虑另一个交点在 $(2,0)$ 右边，漏掉 $m=-1$。',
      ],
      verify: () => {
        const fixed = [-3, -2, -1, 0, 1, 2, 3, 4].find(x => [1, 2, -3, 0.5].every(m => near274(m * x * x - (2 * m + 1) * x + 2, 0)));
        const out = [];
        for (let d = -60; d <= 60; d++) {
          if (d === 0) continue;
          for (let n = 1; n <= 10; n++) {
            const m = n / d;
            if (out.some(x => near274(x, m))) continue;
            const r = roots274(m, -(2 * m + 1), 2);
            if (r.length === 2 && near274(r[1] - r[0], 3)) out.push(m);
          }
        }
        return [fixed, out.map(m => frac274(m))];
      },
    },
    // ---------- 挑战 ----------
    {
      id: '27.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '把函数 $y=|x^2-2x-3|$（$-3\\le x\\le5$）的图像记作 $G$，直线 $l$：$y=-x+k$。(1) $G$ 与 $l$ 恰有 $3$ 个公共点时，求 $k$ 的所有值；(2) 恰有 $4$ 个公共点时，求 $k$ 的取值范围；(3) 当 $k>0$ 时，若恰有 $1$ 个公共点，求 $k$ 的取值范围。',
      blanks: [
        { kind: 'nums', label: '(1) $k=$（全部填出，用逗号隔开）', answer: ['3', '21/4'] },
        { kind: 'ineq', var: 'k', label: '(2)', answer: '3<k<21/4' },
        { kind: 'ineq', var: 'k', label: '(3)', answer: '9<k≤17' },
      ],
      explain: [
        '思路：先画出带绝对值、又截了两端的图像 $G$，再让斜率为 $-1$ 的直线 $l$ 随 $k$ 增大往上平移。公共点个数只会在三类位置变化：过翻折点、与翻上去的弧相切（$\\Delta=0$）、过 $G$ 的端点。',
        '$x^2-2x-3=(x+1)(x-3)$，在 $-1<x<3$ 时为负，这一段翻上去变成 $y=-x^2+2x+3$，最高点 $(1,4)$。翻折点 $A(-1,0)$、$B(3,0)$；端点 $x=-3$ 时 $y=12$，$x=5$ 时 $y=12$。',
        '过点的临界值：过 $A$ 得 $k=-1$，过 $B$ 得 $k=3$，过端点 $(-3,12)$ 得 $k=9$，过端点 $(5,12)$ 得 $k=17$。',
        '相切：$-x^2+2x+3=-x+k$，即 $x^2-3x+k-3=0$，$\\Delta=9-4(k-3)=21-4k=0$，$k=\\frac{21}4$，切点 $x=\\frac32$ 在 $-1<x<3$ 内，有效。左右两段：$x^2-2x-3=-x+k$，$\\Delta=13+4k=0$ 时切点 $x=\\frac12$ 不在这两段上，不是临界。',
        '逐段数（左段 $[-3,-1]$、弧、右段 $[3,5]$）：$k<-1$ 没有；$k=-1$ 只有 $A$；$-1<k<3$ 左段、弧各 $1$ 个，共 $2$ 个；$k=3$ 时有 $(-2,5)$、$(0,3)$、$B$，共 $3$ 个；$3<k<\\frac{21}4$ 左段 $1$、弧 $2$、右段 $1$，共 $4$ 个；$k=\\frac{21}4$ 共 $3$ 个；$\\frac{21}4<k\\le9$ 左右段各 $1$ 个；$9<k\\le17$ 只剩右段 $1$ 个；$k>17$ 没有。',
        '答：(1) $k=3$ 或 $\\frac{21}4$；(2) $3<k<\\frac{21}4$；(3) $9<k\\le17$。坑：只想到相切和过翻折点，忘了端点；$k=3$ 时以为只有 $B$ 一个点，漏掉左段和弧上另外两个交点；切点不检验是否在弧上。',
      ],
      verify: () => {
        const cnt = k => {
          const all = [...roots274(1, -1, -3 - k), ...roots274(-1, 3, 3 - k)]
            .filter(x => x > -3 - 1e-9 && x < 5 + 1e-9 && near274(Math.abs(x * x - 2 * x - 3), -x + k));
          return all.filter((x, i) => all.findIndex(y => near274(x, y)) === i).length;
        };
        const crit = [-1, 3, 21 / 4, 9, 17];
        const three = [].concat(range274(k => cnt(k) === 3, crit, 'k')).map(s => { const [n, d = 1] = s.split('=')[1].split('/').map(Number); return R274(n / d); });
        return [three, range274(k => cnt(k) === 4, crit, 'k'), range274(k => k > 0 && cnt(k) === 1, [0, ...crit], 'k')];
      },
    },
    {
      id: '27.4-c02',
      level: 'challenge',
      type: 'choice',
      stem: '已知点 $O(0,0)$、$D(4,4)$，抛物线 $y=ax^2-4ax+3a+1$（$a\\ne0$）与线段 $OD$ 恰有两个公共点，则 $a$ 的取值范围是（　　）',
      options: ['$a\\ge1$ 或 $a\\le-\\frac13$', '$a\\ge1$ 或 $a\\le-\\frac13$，且 $a\\ne-\\frac12$', '$a>1$ 或 $a<-\\frac13$，且 $a\\ne-\\frac12$', '$-\\frac13\\le a\\le1$，且 $a\\ne0$'],
      answer: 1,
      explain: [
        '思路：先找抛物线不随 $a$ 变的点，发现它恰好在线段上，于是联立后的方程有一个已知根，另一个根用 $a$ 表示，再看它落在哪里、会不会和已知根重合。',
        '按 $a$ 整理：$y=a(x^2-4x+3)+1=a(x-1)(x-3)+1$。$x=1$ 或 $x=3$ 时 $y=1$，所以抛物线必过 $M(1,1)$、$N(3,1)$。线段 $OD$ 在直线 $y=x$（$0\\le x\\le4$）上，$M$ 在线段上，$N$ 不在。',
        '联立 $a(x-1)(x-3)+1=x$，移项 $a(x-1)(x-3)-(x-1)=0$，$(x-1)[a(x-3)-1]=0$，两个根是 $x=1$ 和 $x=3+\\frac1a$。',
        '恰有两个公共点 $\\Leftrightarrow$ $0\\le3+\\frac1a\\le4$ 且 $3+\\frac1a\\ne1$。前者即 $-3\\le\\frac1a\\le1$：$a>0$ 时只需 $\\frac1a\\le1$，得 $a\\ge1$；$a<0$ 时只需 $\\frac1a\\ge-3$，两边乘 $a$（负数）变号得 $1\\le-3a$，$a\\le-\\frac13$。',
        '后者：$3+\\frac1a=1$ 时 $a=-\\frac12$，两根重合，直线与抛物线在 $M$ 处相切（此时联立方程的 $\\Delta=0$），只有一个公共点，要去掉。',
        '所以 $a\\ge1$ 或 $a\\le-\\frac13$，且 $a\\ne-\\frac12$，选 B。坑：$a=1$、$a=-\\frac13$ 时另一个交点正好是端点 $D$、$O$，要保留（误选 C）；忘了重根情况（误选 A）；乘负数不变号（误选 D）。',
      ],
      verify: () => {
        const cnt = a => inRange274(roots274(a, -(4 * a + 1), 3 * a + 1), 0, 4).length;
        const got = [].concat(range274(a => !near274(a, 0) && cnt(a) === 2, [-1 / 2, -1 / 3, 0, 1], 'a'));
        const opts = [['a≤-1/3', 'a≥1'], ['a<-1/2', '-1/2<a≤-1/3', 'a≥1'], ['a<-1/2', '-1/2<a<-1/3', 'a>1'], ['-1/3≤a<0', '0<a≤1']];
        return opts.findIndex(o => JSON.stringify(o) === JSON.stringify(got));
      },
    },
    {
      id: '27.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '抛物线 $y=x^2-2mx+m^2-8$ 与 $x$ 轴交于 $A$、$B$ 两点，与 $y$ 轴交于点 $C$（$A$、$B$、$C$ 能构成三角形）。点 $P$ 在抛物线上且不与 $C$ 重合，$\\triangle PAB$ 的面积等于 $\\triangle CAB$ 的面积。(1) 当 $m=1$ 时，这样的点 $P$ 有几个？(2) 这样的点 $P$ 恰有 $2$ 个时，求 $m$ 的所有值；(3) 当 $m>0$ 时，若这样的点 $P$ 只有 $1$ 个，求 $m$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '(1) 个数', answer: '3' },
        { kind: 'nums', label: '(2) $m=$（全部填出，用逗号隔开）', answer: ['0', '4', '-4'] },
        { kind: 'ineq', var: 'm', label: '(3)', answer: 'm>4' },
      ],
      explain: [
        '思路：两个三角形同底 $AB$，面积相等就是高相等，即点 $P$ 到 $x$ 轴的距离等于 $C$ 到 $x$ 轴的距离。$P$ 落在两条水平直线上，再分别数它们与抛物线的交点，扣掉 $C$。',
        '$y=(x-m)^2-8$，顶点 $(m,-8)$，$A$、$B$ 横坐标 $m\\pm2\\sqrt2$，$AB=4\\sqrt2$ 不变。$C(0,m^2-8)$，构成三角形要求 $m^2\\ne8$。记 $h=m^2-8\\ne0$，条件是 $|y_P|=|h|$，即 $P$ 在直线 $y=h$ 或 $y=-h$ 上（两条不同的直线）。',
        '直线 $y=h$ 经过 $C$：$(x-m)^2-8=m^2-8$，$x=0$ 或 $x=2m$。扣掉 $C$（$x=0$）：$m\\ne0$ 时有 $1$ 个（$C$ 的对称点）；$m=0$ 时两根重合，$C$ 就是顶点，一个也没有。',
        '直线 $y=-h$：$(x-m)^2-8=8-m^2$，即 $(x-m)^2=16-m^2$。$m^2<16$ 时 $2$ 个，$m^2=16$ 时 $1$ 个（顶点，$-h=-8$），$m^2>16$ 时没有。',
        '合起来：$m=0$ 时 $0+2=2$ 个；$0<|m|<4$（$|m|\\ne2\\sqrt2$）时 $1+2=3$ 个；$|m|=4$ 时 $1+1=2$ 个；$|m|>4$ 时 $1$ 个。',
        '答：(1) $3$ 个；(2) $m=0$、$4$、$-4$；(3) $m>4$。坑：只考虑 $P$ 和 $C$ 在 $x$ 轴同侧，漏掉直线 $y=-h$；把 $C$ 自己也算进去；$m=0$ 时没发现 $C$ 是顶点、同侧一个点都没有。',
      ],
      verify: () => {
        const cnt = m => {
          const h = m * m - 8;
          if (near274(h, 0)) return null;
          const pts = [h, -h].flatMap(y => roots274(1, -2 * m, m * m - 8 - y).map(x => [x, y]))
            .filter(p => !(near274(p[0], 0) && near274(p[1], h)));
          return pts.filter((p, i) => pts.findIndex(q => near274(p[0], q[0]) && near274(p[1], q[1])) === i).length;
        };
        for (let k = -60; k <= 60; k++) { const m = k / 7 + 0.013; if (cnt(m) === 2) return null; }
        const s = Math.sqrt(8), two = [-4, -s, 0, s, 4].filter(m => cnt(m) === 2);
        return [cnt(1), two, range274(m => m > 0 && cnt(m) === 1, [0, s, 4], 'm')];
      },
    },
    {
      id: '27.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '直线 $y=kx+2$ 与抛物线 $y=\\frac12x^2$ 交于 $A$、$B$ 两点（$A$ 在 $B$ 的左边），$O$ 是原点。(1) 求 $OA^2+OB^2-AB^2$ 的值；(2) 若 $OB=8OA$，求 $k$ 的值；(3) 在 (2) 的条件下，求 $AB$ 的长。（结果化成最简形式）',
      blanks: [
        { kind: 'num', label: '(1)', answer: '0' },
        { kind: 'num', label: '(2) $k=$', answer: '3/2' },
        { kind: 'real', label: '(3) $AB=$', answer: '5√13/2', simplest: true },
      ],
      explain: [
        '思路：交点坐标解出来带根号，不好直接算距离。用两根之和、两根之积整体代入；(2) 再用“两根之积为 $-4$”把两个长度化成同一个字母，比值就变得很简单。',
        '联立 $\\frac12x^2=kx+2$，$x^2-2kx-4=0$，$\\Delta=4k^2+16>0$，总有两个交点。设 $A(x_1,\\frac12x_1^2)$、$B(x_2,\\frac12x_2^2)$，则 $x_1+x_2=2k$，$x_1x_2=-4$，所以 $x_1<0<x_2$。',
        '(1) 记 $y_1=\\frac12x_1^2$、$y_2=\\frac12x_2^2$。$OA^2+OB^2=x_1^2+y_1^2+x_2^2+y_2^2$，$AB^2=(x_1-x_2)^2+(y_1-y_2)^2$，相减后平方项抵消，只剩交叉项：$2x_1x_2+2y_1y_2=2\\times(-4)+2\\times\\frac14(x_1x_2)^2=-8+8=0$。所以无论 $k$ 取何值，$OA^2+OB^2=AB^2$，$\\angle AOB$ 总是直角。',
        '(2) $x_2=-\\frac4{x_1}$。$OA^2=x_1^2+\\frac14x_1^4=\\frac{x_1^2(4+x_1^2)}4$，$OB^2=\\frac{16}{x_1^2}+\\frac{64}{x_1^4}=\\frac{16(x_1^2+4)}{x_1^4}$，相除得 $\\frac{OB^2}{OA^2}=\\frac{64}{x_1^6}$，即 $\\frac{OB}{OA}=\\frac8{|x_1|^3}$。',
        '$OB=8OA$ 得 $|x_1|^3=1$，$|x_1|=1$；又 $x_1<0$，所以 $x_1=-1$，$x_2=4$，$2k=x_1+x_2=3$，$k=\\frac32$。',
        '(3) $A(-1,\\frac12)$、$B(4,8)$，$AB=\\sqrt{5^2+(\\frac{15}2)^2}=\\sqrt{\\frac{325}4}=\\frac{5\\sqrt{13}}2$（也可由 $OA=\\frac{\\sqrt5}2$、$OB=4\\sqrt5$ 用勾股定理）。坑：设 $OB=8OA$ 后直接列关于 $k$ 的方程，次数太高解不出；忘了 $A$ 在左边，多出 $k=-\\frac32$。',
      ],
      verify: () => {
        const pts = k => roots274(1, -2 * k, -4).map(x => [x, x * x / 2]);
        const d2 = (p, q) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2, O = [0, 0];
        const vals = [-3, -1, 0.5, 2, 5].map(k => { const [A, B] = pts(k); return R274(d2(O, A) + d2(O, B) - d2(A, B)); });
        if (vals.some(v => v !== vals[0])) return null;
        for (let n = -40; n <= 40; n++) {
          const k = n / 4, [A, B] = pts(k);
          if (near274(d2(O, B), 64 * d2(O, A))) return [vals[0], k, Math.sqrt(d2(A, B))];
        }
        return null;
      },
    },
    {
      id: '27.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '函数 $y=mx^2-2x+m-1$ 的图像与坐标轴恰有两个公共点。(1) 求 $m$ 的所有值；(2) 在 (1) 的各种情况中，这两个公共点之间的距离最大是多少？（结果化成最简形式）',
      blanks: [
        { kind: 'reals', label: '(1) $m=$（全部填出，用逗号隔开）', answer: ['0', '1', '(1+√5)/2', '(1-√5)/2'], simplest: true },
        { kind: 'real', label: '(2) 最大距离', answer: '(√10+√2)/2', simplest: true },
      ],
      explain: [
        '思路：“函数”不一定是二次函数；“坐标轴”包括 $x$ 轴和 $y$ 轴，而原点同时在两条轴上。所以先按 $m$ 是否为 $0$ 分类，二次函数再按“是否过原点”分类。',
        '① $m=0$：$y=-2x-1$，与 $x$ 轴交于 $(-\\frac12,0)$，与 $y$ 轴交于 $(0,-1)$，恰两个，符合。',
        '② $m\\ne0$：与 $y$ 轴总有一个交点 $(0,m-1)$。若不过原点（$m\\ne1$），就要求与 $x$ 轴恰一个交点：$\\Delta=4-4m(m-1)=0$，$m^2-m-1=0$，$m=\\frac{1\\pm\\sqrt5}2$（这两个值都不等于 $1$）。',
        '③ 过原点（$m-1=0$，$m=1$）：$y=x^2-2x$，与 $x$ 轴交于 $(0,0)$、$(2,0)$，原点算一个，共两个公共点，符合。(1) 所以 $m=0$、$1$、$\\frac{1+\\sqrt5}2$、$\\frac{1-\\sqrt5}2$。',
        '(2) $m=0$ 时距离 $\\sqrt{\\frac14+1}=\\frac{\\sqrt5}2$；$m=1$ 时距离 $2$。$\\Delta=0$ 时两个公共点是 $(\\frac1m,0)$ 和 $(0,m-1)$，由 $m^2-m-1=0$ 得 $m(m-1)=1$，即 $\\frac1m=m-1$，距离 $=\\sqrt{(m-1)^2+(m-1)^2}=\\sqrt2\\,|m-1|$。',
        '$m=\\frac{1+\\sqrt5}2$ 时 $|m-1|=\\frac{\\sqrt5-1}2$，距离 $\\frac{\\sqrt{10}-\\sqrt2}2\\approx0.88$；$m=\\frac{1-\\sqrt5}2$ 时 $|m-1|=\\frac{\\sqrt5+1}2$，距离 $\\frac{\\sqrt{10}+\\sqrt2}2\\approx2.29$。比较 $\\frac{\\sqrt5}2\\approx1.12$、$2$，最大是 $\\frac{\\sqrt{10}+\\sqrt2}2$。坑：漏掉一次函数或过原点的情况；切点横坐标 $\\frac1m$ 不会化简，硬代根式算错。',
      ],
      verify: () => {
        const pointsOf = m => {
          const pts = [[0, m - 1], ...roots274(m, -2, m - 1).map(x => [x, 0])];
          return pts.filter((p, i) => pts.findIndex(q => near274(p[0], q[0]) && near274(p[1], q[1])) === i);
        };
        // 候选：一次函数、过原点、Δ=0 三种临界情况
        const cands = [0, ...roots274(0, 1, -1), ...roots274(1, -1, -1)];
        // 抽查其他 m 都不是两个公共点
        for (let k = -50; k <= 50; k++) { const m = k / 7 + 0.013; if (pointsOf(m).length === 2) return null; }
        const ok = cands.filter(m => pointsOf(m).length === 2);
        const dist = ok.map(m => { const [p, q] = pointsOf(m); return Math.hypot(p[0] - q[0], p[1] - q[1]); });
        return [ok, Math.max(...dist)];
      },
    },
  ],
});
