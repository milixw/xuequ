'use strict';

// 上海数学九年级上册 · 27.2 二次函数的图像与性质（课本第 5～20 页）
// 知识范围：y=ax² 的图像（抛物线）与性质：开口方向、|a| 与开口大小、对称轴 y 轴、顶点原点、最高点 / 最低点、对称轴两侧的增减性、最值；
//   y=ax²+h（上下平移）、y=a(x+m)²（左右平移）、y=a(x+m)²+h（对称轴 x=−m，顶点 (−m,h)，由 y=ax² 平移得到）；
//   y=ax²+bx+c 配方化为 y=a(x+m)²+h，对称轴 x=−b/(2a)，顶点 (−b/(2a),(4ac−b²)/(4a))，与 y 轴交点 (0,c)
// 可以使用：27.1 二次函数的概念；八下第 24～26 章的平面直角坐标系、两点间距离公式、点关于坐标轴和原点的对称、一次函数；一元二次方程（含因式分解、求根公式）
// 还没学：待定系数法（27.3，本节不出“已知三点求表达式”）、判别式与抛物线和 x 轴交点个数的系统对应（27.4）、实际应用中的最值（27.5）、相似三角形、三角比、圆
// 本节约定：顶点式按课本写作 y=a(x+m)²+h；带根号的结果用 real / reals 填空，并要求化成最简形式

const SVG272 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="14">${inner}</svg>`,
  // 数学坐标（y 向上）换成屏幕坐标：比例 k，原点放在 (ox, oy)
  map: (k, ox, oy) => ([x, y]) => [ox + x * k, oy - y * k],
  seg: (a, b, dash = false, w = 1.5) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0, style = '') => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle"${style}>${t}</text>`,
  dot: ([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
  poly: (pts, dash = true) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.2"${dash ? ' stroke-dasharray="4 3"' : ''}/>`,
  // 抛物线：在 [x0, x1] 上采样画折线
  curve: (f, x0, x1, P) => {
    const pts = [];
    for (let i = 0; i <= 80; i++) { const x = x0 + ((x1 - x0) * i) / 80; pts.push(P([x, f(x)])); }
    return `<polyline points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#1f5fbf" stroke-width="2"/>`;
  },
  // 坐标轴（带箭头）和原点 O
  axes: (P, [x0, x1, y0, y1]) => {
    const arrow = ([x, y], dir) => dir === 'r'
      ? `<polygon points="${x},${y} ${x - 8},${y - 4} ${x - 8},${y + 4}" fill="#2b2b2b"/>`
      : `<polygon points="${x},${y} ${x - 4},${y + 8} ${x + 4},${y + 8}" fill="#2b2b2b"/>`;
    const X1 = P([x1, 0]), Y1 = P([0, y1]);
    return SVG272.seg(P([x0, 0]), X1, false, 1.2) + SVG272.seg(P([0, y0]), Y1, false, 1.2) + arrow(X1, 'r') + arrow(Y1, 'u') +
      SVG272.text('x', X1, -4, 12, ' font-style="italic"') + SVG272.text('y', Y1, 10, 2, ' font-style="italic"') + SVG272.text('O', P([0, 0]), -9, 10);
  },
};

// 解 a x² + b x + c = 0，返回从小到大的实数根
const roots272 = (a, b, c) => {
  const d = b * b - 4 * a * c;
  if (d < 0) return [];
  return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((p, q) => p - q);
};
// 在 [lo, hi] 上找 g 的零点：先按步长扫描变号，再二分
const zeros272 = (g, lo, hi, step = 1e-3) => {
  const out = [];
  for (let x = lo; x < hi; x += step) {
    const a = g(x), b = g(x + step);
    if (Math.abs(a) < 1e-12) { if (!out.some(z => Math.abs(z - x) < 1e-6)) out.push(x); continue; }
    if (a * b < 0) {
      let l = x, r = x + step;
      for (let i = 0; i < 60; i++) { const m = (l + r) / 2; if (g(l) * g(m) <= 0) r = m; else l = m; }
      out.push((l + r) / 2);
    }
  }
  return out;
};
// 闭区间 [p, q] 上二次函数 f（开口方向任意）的最大值、最小值：比较两个端点和区间内的顶点
const range272 = (a, b, c, p, q) => {
  const f = x => a * x * x + b * x + c, v = -b / (2 * a);
  const vals = [f(p), f(q)];
  if (v >= p && v <= q) vals.push(f(v));
  return [Math.max(...vals), Math.min(...vals)];
};

const FIG272 = (() => {
  const S = SVG272, out = {};
  // e01：y=−x²−2x+3 的大致图像，只标出对称轴 x=−1 和与 x 轴的交点 (1,0)
  {
    const P = S.map(34, 160, 168), f = x => -x * x - 2 * x + 3;
    out.e01 = S.wrap(270, 210,
      S.axes(P, [-4.2, 2.6, -1.6, 4.9]) + S.curve(f, -3.75, 1.75, P) +
      S.seg(P([-1, -1.5]), P([-1, 4.6]), true, 1.1) + S.text('x=−1', P([-1, 4.6]), -24, 0) +
      S.dot(P([1, 0])) + S.text('1', P([1, 0]), 7, 10));
  }
  // e04：y=−x²+2x+8，A、B 是与 x 轴的交点，C 是与 y 轴的交点，P 是顶点
  {
    const P = S.map(24, 70, 262), f = x => -x * x + 2 * x + 8;
    const A = P([-2, 0]), B = P([4, 0]), C = P([0, 8]), V = P([1, 9]);
    out.e04 = S.wrap(250, 290,
      S.axes(P, [-2.7, 7, -1, 10]) + S.curve(f, -2.35, 4.35, P) + S.poly([A, C, V, B]) +
      [A, B, C, V].map(S.dot).join('') +
      S.text('A', A, -8, 10) + S.text('B', B, 8, 10) + S.text('C', C, -9, 0) + S.text('P', V, 0, -14));
  }
  // c02：y=−½x²+2x+6，A(−2,0)、B(6,0)、C(0,6) 和对称轴 x=2（虚线）；P 是对称轴上的动点（示意）
  {
    const P = S.map(22, 70, 222), f = x => -0.5 * x * x + 2 * x + 6;
    const A = P([-2, 0]), B = P([6, 0]), C = P([0, 6]), D = P([2, 3.4]);
    out.c02 = S.wrap(260, 270,
      S.axes(P, [-2.8, 8.2, -1.8, 9.4]) + S.curve(f, -2.5, 6.5, P) +
      S.seg(P([2, -1.6]), P([2, 9]), true, 1.1) + S.text('x=2', P([2, 9]), 18, 0) +
      S.seg(A, C) + S.seg(C, D, true, 1) + S.seg(A, D, true, 1) +
      [A, B, C, D].map(S.dot).join('') +
      S.text('A', A, -8, 10) + S.text('B', B, 8, 10) + S.text('C', C, -10, -2) + S.text('P', D, 10, -4));
  }
  // c05：y=−x²+x+6，A(−2,0)、B(3,0)、C(0,6)，直线 BC，抛物线上一点 P（示意），PD ⊥ x 轴交 BC 于 D
  {
    const P = S.map(30, 85, 225), f = x => -x * x + x + 6;
    const A = P([-2, 0]), B = P([3, 0]), C = P([0, 6]), xp = 2.3, Q = P([xp, f(xp)]), D = P([xp, -2 * xp + 6]);
    out.c05 = S.wrap(240, 270,
      S.axes(P, [-2.6, 4.3, -1.3, 7.2]) + S.curve(f, -2.2, 3.2, P) + S.seg(B, C) + S.seg(Q, D, true, 1.1) +
      S.seg(Q, B, false, 1) + S.seg(Q, C, false, 1) +
      [A, B, C, Q, D].map(S.dot).join('') +
      S.text('A', A, -8, 10) + S.text('B', B, 8, 10) + S.text('C', C, -10, -2) + S.text('P', Q, 9, -8) + S.text('D', D, 9, 4));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g9s1/27.2',
  title: '二次函数的图像与性质',
  review: { status: 'pending' },
  audit: { blind: '2026-10-08', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第一轮打回：c02（对称轴上的点使三角形等腰）、c03（配方求最值再算面积）未达挑战档；c05 用 y=−x²+4x+5、面积最大 125/8 是流传数据；b04 与卡片配方例子换数版；b03 末空端点判分有争议。处理：c02 换成 y=−½x²+2x+6，△PAC 等腰（共线解要舍）加直角两问；c03(2) 改为 △OPQ 面积等于 h² 分四类；c05 换成 y=−x²+x+6、面积为 △ABC 的 1/5；b04 改为 −½x²+3x−2；b03 末空改为选 > 或 <；卡片补“令 y=0 求与 x 轴交点”。第二轮整节通过。卡片配 parabolaShape、parabolaShift，b01、b02 解析也配。' },
  intro: [
    {
      title: '抛物线 $y=ax^2$',
      body: '二次函数的图像是一条叫作抛物线的曲线。先看最简单的 $y=ax^2$：它关于 $y$ 轴对称，顶点是原点。$a>0$ 时开口向上，顶点是最低点；$a<0$ 时开口向下，顶点是最高点。$\\lvert a\\rvert$ 越大，开口越小。',
      example: '$y=-4x^2$：开口向下，对称轴是 $y$ 轴，顶点 $(0,0)$ 是最高点，最大值是 $0$；它的开口比 $y=x^2$ 的小。',
      pitfall: '比较开口大小看 $\\lvert a\\rvert$，不是看 $a$：$y=-4x^2$ 的开口比 $y=2x^2$ 的还小。',
      demo: { type: 'parabolaShape', a: 2.5 },
    },
    {
      title: '平移：$y=a(x+m)^2+h$',
      body: '把 $y=ax^2$ 整条抛物线平移，形状和开口都不变，只是顶点从 $(0,0)$ 搬到了 $(-m,h)$，所以 $y=a(x+m)^2+h$ 的对称轴是直线 $x=-m$，顶点是 $(-m,h)$。抓住“顶点怎么移”就能写出平移后的表达式。',
      example: '$y=3x^2$ 向右平移 $4$ 个单位、再向上平移 $2$ 个单位：顶点 $(0,0)\\to(4,2)$，得 $y=3(x-4)^2+2$。',
      pitfall: '左右平移改的是括号里：向右移 $4$ 是 $x-4$，不是 $x+4$（“左加右减”）；上下平移改的是末尾的常数。',
      demo: { type: 'parabolaShift', a: -1, m: 1.5, h: 2.5 },
    },
    {
      title: '增减性和最值',
      body: '以对称轴 $x=-m$ 为界看图像：$a>0$ 时，左侧下降、右侧上升，顶点处取到最小值 $h$；$a<0$ 时，左侧上升、右侧下降，顶点处取到最大值 $h$。',
      example: '$y=-(x+5)^2+7$：$a=-1<0$。当 $x<-5$ 时 $y$ 随 $x$ 的增大而增大，当 $x>-5$ 时 $y$ 随 $x$ 的增大而减小；当 $x=-5$ 时取到最大值 $7$。',
      pitfall: '$a<0$ 的抛物线只有最大值，没有最小值；说增减性时一定要带上“在对称轴哪一侧”。',
    },
    {
      title: '一般式配方：$y=ax^2+bx+c$',
      body: '一般式看不出顶点，先配方化成 $y=a(x+m)^2+h$。配方的结果可以写成公式：对称轴是直线 $x=-\\frac{b}{2a}$，顶点是 $\\left(-\\frac{b}{2a},\\frac{4ac-b^2}{4a}\\right)$。另外，令 $x=0$ 得 $y=c$，所以抛物线与 $y$ 轴交于点 $(0,c)$；令 $y=0$，解一元二次方程 $ax^2+bx+c=0$，就能求出抛物线与 $x$ 轴交点的横坐标。',
      example: '$y=2x^2+12x+11=2(x^2+6x+9)-18+11=2(x+3)^2-7$：对称轴 $x=-3$，顶点 $(-3,-7)$，与 $y$ 轴交于 $(0,11)$。又如 $y=x^2-x-12$，令 $y=0$ 得 $(x+3)(x-4)=0$，与 $x$ 轴交于 $(-3,0)$、$(4,0)$。',
      pitfall: '提出 $a$ 后括号里补的是 $9$，括号外要减去 $2\\times9=18$，不是减 $9$。',
    },
    {
      title: '比较函数值、区间上的最值',
      body: '抛物线上的点离对称轴越远：开口向上时函数值越大，开口向下时函数值越小。求 $p\\le x\\le q$ 上的最值，先看对称轴在不在这个范围里：在里面，顶点处取一个最值，另一个最值在离对称轴较远的端点；不在里面，最值都在两个端点。',
      example: '$y=3(x+2)^2-1$ 上，$x=-5$ 离对称轴 $x=-2$ 有 $3$，$x=0$ 离它有 $2$，所以 $x=-5$ 时的函数值较大。$y=(x-3)^2+1$ 在 $0\\le x\\le2$ 上一直下降，最大值 $10$（$x=0$），最小值 $2$（$x=2$）。',
    },
    {
      title: '关于坐标轴、原点对称的抛物线',
      body: '点 $(x,y)$ 关于 $x$ 轴的对称点是 $(x,-y)$，关于 $y$ 轴的是 $(-x,y)$，关于原点的是 $(-x,-y)$。抛物线对称后形状不变：关于 $x$ 轴或原点对称时开口方向反过来；顶点按点的对称规则移过去即可。',
      example: '$y=(x-1)^2+2$ 的顶点是 $(1,2)$，关于 $y$ 轴对称后顶点是 $(-1,2)$，开口仍向上，得 $y=(x+1)^2+2$。',
      pitfall: '关于 $x$ 轴对称时 $a$ 和顶点纵坐标都要变号，只改 $a$ 是常见错误。',
    },
  ],
  questions: [
    {
      id: '27.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '关于抛物线 $y=-\\frac25x^2$，有下列说法：① 开口向下；② 对称轴是 $x$ 轴；③ 当 $x<0$ 时，$y$ 随 $x$ 的增大而减小；④ 它的开口比抛物线 $y=x^2$ 的开口大。其中正确的有（　　）',
      options: ['$1$ 个', '$2$ 个', '$3$ 个', '$4$ 个'],
      answer: 1,
      explain: [
        '$a=-\\frac25<0$，开口向下，① 对。对称轴是 $y$ 轴（直线 $x=0$），不是 $x$ 轴，② 错。',
        '开口向下时，对称轴左侧图像上升：$x<0$ 时 $y$ 随 $x$ 的增大而增大，③ 错。坑：把 $a>0$ 的结论直接搬过来。',
        '$\\lvert a\\rvert=\\frac25<1$，开口比 $y=x^2$ 的大，④ 对。正确的有 $2$ 个，选 B。',
      ],
      demo: { type: 'parabolaShape', a: -0.4 },
      verify: () => {
        const a = F(-2).div(5), f = x => a.mul(F(x)).mul(F(x));
        const s1 = a.cmp(F(0)) < 0;
        const s2 = false;  // 对称轴是直线 x=0，即 y 轴
        const s3 = f(-2).cmp(f(-3)) < 0;  // 取 x=−3<−2<0：若 y 减小则 f(−2)<f(−3)
        const s4 = a.abs().cmp(F(1)) < 0;
        return [s1, s2, s3, s4].filter(Boolean).length - 1;
      },
    },
    {
      id: '27.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '把抛物线 $y=\\frac32x^2$ 先向右平移 $3$ 个单位，再向下平移 $2$ 个单位，求所得抛物线的表达式（写成 $y=a(x+m)^2+h$ 的形式）。',
      blanks: [{ kind: 'expr', label: '$y=$', answer: '3/2(x-3)^2-2' }],
      explain: [
        '平移不改变开口，$a$ 仍是 $\\frac32$。顶点 $(0,0)$ 向右移 $3$、向下移 $2$，到了 $(3,-2)$。',
        '顶点为 $(3,-2)$ 的抛物线是 $y=\\frac32(x-3)^2-2$。坑：“向右”写成 $x+3$——检验一下，$x=3$ 时括号为 $0$，才是新的顶点横坐标。',
      ],
      demo: { type: 'parabolaShift', a: 1.5, m: -3, h: -2 },
      verify: () => {
        // 新抛物线上的点 = 原抛物线上的点 (u, 3/2 u²) 平移成 (u+3, 3/2 u² − 2)，用三个点核对展开式
        const g = Poly.of('3/2(x-3)^2-2');
        const ok = [-1, 0, 2].every(u => g.at({ x: F(u + 3) }).eq(F(3).div(2).mul(F(u * u)).sub(F(2))));
        return ok ? String(g) : null;
      },
    },
    {
      id: '27.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '对于二次函数 $y=-3(x+2)^2+5$，填写下列各空。',
      blanks: [
        { kind: 'num', label: '顶点的横坐标是', answer: '-2' },
        { kind: 'num', label: '顶点的纵坐标是', answer: '5' },
        { kind: 'num', label: '函数的最大值是', answer: '5' },
        { kind: 'text', label: '当 $x$', suffix: '$-2$ 时，$y$ 随 $x$ 的增大而减小', answer: '>', options: ['>', '<'] },
      ],
      explain: [
        '对照 $y=a(x+m)^2+h$：$m=2$，$h=5$，顶点是 $(-m,h)=(-2,5)$。坑：顶点写成 $(2,5)$。',
        '$a=-3<0$，开口向下，顶点是最高点，最大值是 $5$。',
        '开口向下时，对称轴 $x=-2$ 的右侧图像下降，所以 $x>-2$ 时 $y$ 随 $x$ 的增大而减小。坑：照搬 $a>0$ 的结论选成 $<$。',
      ],
      verify: () => {
        const f = x => F(-3).mul(F(x).add(2).pow(2)).add(5);
        const vx = F(-2), vy = f(-2);
        // 在 x=−2 两侧各取几个点核对：右侧递减、左侧递增
        const right = [-2, -1, 0, 3].every((x, i, arr) => i === 0 || f(x).cmp(f(arr[i - 1])) < 0);
        const left = [-6, -4, -3, -2].every((x, i, arr) => i === 0 || f(arr[i - 1]).cmp(f(x)) < 0);
        return [vx, vy, vy, right && left ? '>' : null];
      },
    },
    {
      id: '27.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '已知二次函数 $y=-\\frac12x^2+3x-2$。',
      blanks: [
        { kind: 'num', label: '(1) 对称轴是直线 $x=$', answer: '3' },
        { kind: 'num', label: '(2) 顶点的纵坐标是', answer: '5/2' },
        { kind: 'num', label: '(3) 图像与 $y$ 轴交点的纵坐标是', answer: '-2' },
      ],
      explain: [
        '配方：先提出 $-\\frac12$：$y=-\\frac12(x^2-6x)-2=-\\frac12(x^2-6x+9)+\\frac92-2=-\\frac12(x-3)^2+\\frac52$。',
        '(1) 对称轴 $x=3$，也可用 $x=-\\frac{b}{2a}=-\\frac{3}{2\\times(-\\frac12)}=3$。坑：提出 $-\\frac12$ 时括号里写成 $x^2+6x$，对称轴错成 $-3$。',
        '(2) 顶点 $\\left(3,\\frac52\\right)$。坑：括号里补了 $9$，等于整体加了 $-\\frac12\\times9=-\\frac92$，括号外要加回 $\\frac92$；写成“减 $9$”或“减 $\\frac92$”都会错。',
        '(3) 令 $x=0$，$y=-2$，交点是 $(0,-2)$。',
      ],
      verify: () => {
        const a = F(-1).div(2), b = F(3), c = F(-2);
        const vx = b.neg().div(a.mul(2));
        const vy = a.mul(vx).mul(vx).add(b.mul(vx)).add(c);
        return [vx, vy, c];
      },
    },
    {
      id: '27.2-b05',
      level: 'basic',
      type: 'choice',
      stem: '点 $A(-2,y_1)$、$B(2,y_2)$、$C(5,y_3)$ 都在抛物线 $y=-2(x-1)^2+c$ 上，则 $y_1$、$y_2$、$y_3$ 的大小关系是（　　）',
      options: ['$y_1<y_2<y_3$', '$y_3<y_1<y_2$', '$y_2<y_1<y_3$', '$y_1<y_3<y_2$'],
      answer: 1,
      explain: [
        '对称轴是直线 $x=1$，开口向下，离对称轴越远，函数值越小。',
        '三个点到对称轴的距离：$A$ 是 $3$，$B$ 是 $1$，$C$ 是 $4$。所以 $y_3<y_1<y_2$，选 B。',
        '坑：只比较横坐标得 A；忘了开口向下、把远近关系反过来得 C。',
      ],
      verify: () => {
        const f = x => F(-2).mul(F(x).sub(1).pow(2)).add(7);  // c 取任意值都不影响大小关系
        const y = [f(-2), f(2), f(5)];
        const orders = [[0, 1, 2], [2, 0, 1], [1, 0, 2], [0, 2, 1]];
        return orders.findIndex(o => y[o[0]].cmp(y[o[1]]) < 0 && y[o[1]].cmp(y[o[2]]) < 0);
      },
    },
    {
      id: '27.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '已知抛物线 $y=2(x+4)^2-1$。分别写出与它关于 $x$ 轴、关于 $y$ 轴对称的抛物线的表达式。',
      blanks: [
        { kind: 'expr', label: '(1) 关于 $x$ 轴对称：$y=$', answer: '-2(x+4)^2+1' },
        { kind: 'expr', label: '(2) 关于 $y$ 轴对称：$y=$', answer: '2(x-4)^2-1' },
      ],
      explain: [
        '原抛物线开口向上，顶点 $(-4,-1)$。',
        '(1) 关于 $x$ 轴对称：开口变成向下，$a=-2$；顶点变成 $(-4,1)$。得 $y=-2(x+4)^2+1$。坑：只把 $a$ 变号，写成 $y=-2(x+4)^2-1$。',
        '(2) 关于 $y$ 轴对称：开口不变，$a=2$；顶点变成 $(4,-1)$。得 $y=2(x-4)^2-1$。',
      ],
      verify: () => {
        const f = Poly.of('2(x+4)^2-1');
        // 关于 x 轴：(x, y) → (x, −y)，即 y = −f(x)；关于 y 轴：(x, y) → (−x, y)，即 y = f(−x)
        const fx = f.scale(-1), fy = Poly.of('2(-x+4)^2-1');
        return [String(fx), String(fy)];
      },
    },
    {
      id: '27.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '当 $-2\\le x\\le2$ 时，求二次函数 $y=x^2-2x-3$ 的最大值和最小值。',
      blanks: [
        { kind: 'num', label: '最大值是', answer: '5' },
        { kind: 'num', label: '最小值是', answer: '-4' },
      ],
      explain: [
        '$y=(x-1)^2-4$，对称轴 $x=1$ 在 $-2\\le x\\le2$ 里面，开口向上，所以最小值在顶点处取到：$-4$。',
        '最大值在离对称轴较远的端点：$x=-2$ 离 $x=1$ 有 $3$，$x=2$ 只有 $1$，所以最大值是 $(-2)^2-2\\times(-2)-3=5$。',
        '坑：只算两个端点，得到最小值 $-3$（$x=2$ 时），漏了顶点。',
      ],
      verify: () => { const [mx, mn] = range272(1, -2, -3, -2, 2); return [Math.round(mx * 1e9) / 1e9, Math.round(mn * 1e9) / 1e9]; },
    },
    {
      id: '27.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '若 $y=(m-1)x^{m^2-m-4}$ 是 $y$ 关于 $x$ 的二次函数，且它的图像有最低点，求 $m$ 的值（有几个就填几个，用逗号隔开）。',
      blanks: [{ kind: 'nums', label: '$m=$', answer: ['3'] }],
      explain: [
        '二次函数要求 $x$ 的指数是 $2$：$m^2-m-4=2$，即 $m^2-m-6=0$，$(m-3)(m+2)=0$，$m=3$ 或 $m=-2$。',
        '有最低点要求开口向上：$m-1>0$。$m=3$ 时 $m-1=2>0$，符合；$m=-2$ 时 $m-1=-3<0$，开口向下，只有最高点，舍去。',
        '所以 $m=3$。坑：解出两个值就都填上，忘了检验开口方向。',
      ],
      verify: () => {
        const out = [];
        for (let m = -20; m <= 20; m++) if (m * m - m - 4 === 2 && m - 1 > 0) out.push(m);
        return out;
      },
    },
    {
      id: '27.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '抛物线 $y=-2x^2+bx+c$ 的顶点是 $(1,3)$，求 $b$、$c$ 的值。',
      blanks: [
        { kind: 'num', label: '$b=$', answer: '4' },
        { kind: 'num', label: '$c=$', answer: '1' },
      ],
      explain: [
        '平移不改变 $a$，顶点是 $(1,3)$ 的抛物线写成顶点式：$y=-2(x-1)^2+3$。',
        '展开：$y=-2(x^2-2x+1)+3=-2x^2+4x+1$，所以 $b=4$，$c=1$。',
        '坑：展开时 $-2\\times1$ 漏乘，得到 $c=3+1=4$；或把顶点式写成 $-2(x+1)^2+3$。',
      ],
      verify: () => {
        // 由对称轴 −b/(2a)=1 求 b，再由顶点纵坐标求 c
        const a = F(-2), b = a.mul(-2).mul(1);
        const c = F(3).sub(a.add(b));
        return [b, c];
      },
    },
    {
      id: '27.2-e01',
      level: 'extended',
      type: 'choice',
      stem: '二次函数 $y=ax^2+bx+c$ 的图像如图所示，对称轴是直线 $x=-1$，与 $x$ 轴的一个交点是 $(1,0)$。有下列结论：① $abc>0$；② $b=2a$；③ $a-b+c<0$；④ 若点 $(-3.5,y_1)$、$(1.5,y_2)$ 都在图像上，则 $y_1<y_2$；⑤ $3a+c=0$。其中正确的有（　　）',
      figure: FIG272.e01,
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 1,
      explain: [
        '开口向下，$a<0$；对称轴 $-\\frac{b}{2a}=-1$，得 $b=2a<0$，② 对；与 $y$ 轴交在正半轴，$c>0$。所以 $abc>0$，① 对。',
        '③：$a-b+c$ 就是 $x=-1$ 时的函数值，也就是顶点的纵坐标。抛物线开口向下又和 $x$ 轴有交点，顶点在 $x$ 轴上方，所以 $a-b+c>0$，③ 错。',
        '④：$-3.5$ 和 $1.5$ 到对称轴 $x=-1$ 的距离都是 $2.5$，函数值相等，$y_1=y_2$，④ 错。坑：只比较横坐标。',
        '⑤：点 $(1,0)$ 在图像上，$a+b+c=0$，把 $b=2a$ 代入得 $3a+c=0$，⑤ 对。正确的是 ①②⑤，共 $3$ 个，选 B。',
      ],
      verify: () => {
        // 图像满足条件的一条具体抛物线：a=−1，b=2a，c=−3a，即 y=−x²−2x+3（换别的 a<0 结论不变）
        return [-1, -0.5, -3].every(a => {
          const b = 2 * a, c = -3 * a, f = x => a * x * x + b * x + c;
          return [a * b * c > 0, b === 2 * a, a - b + c < 0, f(-3.5) < f(1.5), Math.abs(3 * a + c) < 1e-12].filter(Boolean).length === 3;
        }) ? 1 : -1;
      },
    },
    {
      id: '27.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '当 $-1\\le x\\le3$ 时，二次函数 $y=-x^2+2mx+1$ 的最大值是 $4$，求 $m$ 的值（全部填出，用逗号隔开，结果化成最简形式）。',
      blanks: [{ kind: 'reals', label: '$m=$', answer: ['-2', '√3'], simplest: true }],
      explain: [
        '配方：$y=-(x-m)^2+m^2+1$，开口向下，对称轴 $x=m$。最大值在哪里取，要看对称轴和区间 $-1\\le x\\le3$ 的位置。',
        '① $m<-1$：区间在对称轴右侧，图像下降，最大值在 $x=-1$：$-1-2m+1=-2m=4$，$m=-2$，符合 $m<-1$。',
        '② $-1\\le m\\le3$：最大值是顶点纵坐标 $m^2+1=4$，$m=\\pm\\sqrt3$。$-\\sqrt3\\approx-1.73<-1$，舍去；保留 $m=\\sqrt3$。',
        '③ $m>3$：区间在对称轴左侧，图像上升，最大值在 $x=3$：$-9+6m+1=4$，$m=2$，不符合 $m>3$，舍去。',
        '所以 $m=-2$ 或 $\\sqrt3$。坑：直接令顶点纵坐标等于 $4$，得到 $\\pm\\sqrt3$。',
      ],
      verify: () => zeros272(m => range272(-1, 2 * m, 1, -1, 3)[0] - 4, -20, 20),
    },
    {
      id: '27.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '抛物线 $C_1$：$y=2x^2-4x+5$ 与抛物线 $C_2$ 关于原点对称。(1) 写出 $C_2$ 的表达式（写成 $y=a(x+m)^2+h$ 的形式）；(2) 把 $C_2$ 向上平移 $k$ 个单位后，恰好经过点 $(1,0)$，求 $k$。',
      blanks: [
        { kind: 'expr', label: '(1) $C_2$：$y=$', answer: '-2(x+1)^2-3' },
        { kind: 'num', label: '(2) $k=$', answer: '11' },
      ],
      explain: [
        '(1) 配方：$C_1$：$y=2(x-1)^2+3$，开口向上，顶点 $(1,3)$。',
        '关于原点对称：开口变成向下（$a=-2$），顶点变成 $(-1,-3)$，所以 $C_2$：$y=-2(x+1)^2-3$。坑：只把顶点对称、忘了开口方向也反过来。',
        '(2) 向上平移 $k$ 个单位得 $y=-2(x+1)^2-3+k$，过 $(1,0)$：$-2\\times4-3+k=0$，$k=11$。',
      ],
      verify: () => {
        // 关于原点对称：(x, y) → (−x, −y)，C₂ 为 y = −C₁(−x)
        const c2 = Poly.of('2(-x)^2-4(-x)+5').scale(-1);
        const k = c2.at({ x: F(1) }).neg();
        return [String(c2), k];
      },
    },
    {
      id: '27.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，抛物线 $y=-x^2+2x+8$ 与 $x$ 轴交于 $A$、$B$ 两点（$A$ 在 $B$ 的左侧），与 $y$ 轴交于点 $C$，顶点为 $P$。求顶点 $P$ 的坐标和四边形 $ACPB$ 的面积。',
      figure: FIG272.e04,
      blanks: [
        { kind: 'num', label: '$P$ 的横坐标是', answer: '1' },
        { kind: 'num', label: '$P$ 的纵坐标是', answer: '9' },
        { kind: 'num', label: '四边形 $ACPB$ 的面积是', answer: '30' },
      ],
      explain: [
        '$y=-(x-1)^2+9$，顶点 $P(1,9)$。令 $x=0$ 得 $C(0,8)$；令 $y=0$：$x^2-2x-8=0$，$(x-4)(x+2)=0$，得 $A(-2,0)$、$B(4,0)$。',
        '四边形不规则，过 $P$ 作 $PH\\perp x$ 轴于 $H(1,0)$，把它分成三块：$\\triangle AOC$、梯形 $OCPH$、$\\triangle PHB$。',
        '$S_{\\triangle AOC}=\\frac12\\times2\\times8=8$；梯形 $OCPH$ 的面积 $=\\frac12\\times(8+9)\\times1=\\frac{17}2$；$S_{\\triangle PHB}=\\frac12\\times3\\times9=\\frac{27}2$。',
        '面积 $=8+\\frac{17}2+\\frac{27}2=30$。坑：误以为 $ACPB$ 的面积就是 $\\triangle APB$ 的面积 $27$，漏了 $C$ 凸出来的那一小块。',
      ],
      verify: () => {
        const [xa, xb] = roots272(-1, 2, 8), xp = 1, yp = 9;
        const pts = [[xa, 0], [0, 8], [xp, yp], [xb, 0]];
        const area = Math.abs(pts.reduce((s, p, i) => { const q = pts[(i + 1) % 4]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
        const v = -2 / (2 * -1);
        return [v, -v * v + 2 * v + 8, Math.round(area * 1e9) / 1e9];
      },
    },
    {
      id: '27.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '对于二次函数 $y=-x^2+2(m-1)x+3$，当 $x>2$ 时，$y$ 随 $x$ 的增大而减小；当 $x<-1$ 时，$y$ 随 $x$ 的增大而增大。求 $m$ 的取值范围。',
      blanks: [{ kind: 'ineq', var: 'm', label: '$m$ 的取值范围是', answer: '0<=m<=3' }],
      explain: [
        '$a=-1<0$，对称轴是直线 $x=-\\frac{2(m-1)}{2\\times(-1)}=m-1$。开口向下：对称轴右侧下降，左侧上升。',
        '“$x>2$ 时都下降”说明 $x>2$ 这一段整个在对称轴右侧（含对称轴本身）：$m-1\\le2$，$m\\le3$。',
        '“$x<-1$ 时都上升”说明 $x<-1$ 这一段整个在对称轴左侧：$m-1\\ge-1$，$m\\ge0$。',
        '所以 $0\\le m\\le3$。坑：漏掉等号。$m=3$ 时对称轴就是 $x=2$，$x>2$ 时确实一直下降，等号能取到。',
      ],
      verify: () => {
        // 对一组 m 逐个检查：在 x>2 和 x<−1 上取很多点，看是否单调
        const ok = m => {
          const f = x => -x * x + 2 * (m - 1) * x + 3;
          for (let x = 2; x < 12; x += 0.05) if (!(f(x + 0.05) < f(x))) return false;
          for (let x = -12; x < -1.05; x += 0.05) if (!(f(x + 0.05) > f(x))) return false;
          return true;
        };
        const ms = [];
        for (let k = -40; k <= 80; k++) if (ok(k / 8)) ms.push(k / 8);
        const lo = Math.min(...ms), hi = Math.max(...ms);
        return ms.length === (hi - lo) * 8 + 1 ? `${lo}<=m<=${hi}` : null;
      },
    },
    {
      id: '27.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知抛物线 $y=x^2-2mx+m^2+2m-3$（$m$ 是常数）。(1) 无论 $m$ 取何值，它的顶点都在同一条直线上，写出这条直线的表达式；(2) 若顶点在第四象限，求 $m$ 的取值范围。',
      blanks: [
        { kind: 'expr', label: '(1) 直线：$y=$', answer: '2x-3' },
        { kind: 'ineq', var: 'm', label: '(2) $m$ 的取值范围是', answer: '0<m<3/2' },
      ],
      explain: [
        '(1) 配方：$y=(x-m)^2+2m-3$，顶点是 $(m,2m-3)$。顶点的横坐标 $x=m$，纵坐标 $y=2m-3=2x-3$，所以顶点都在直线 $y=2x-3$ 上。',
        '想法：顶点坐标都用 $m$ 表示，把 $m$ 消掉，剩下的就是横、纵坐标之间的关系。',
        '(2) 第四象限：横坐标 $m>0$，纵坐标 $2m-3<0$，即 $m<\\frac32$。所以 $0<m<\\frac32$。坑：第四象限是“右下”，纵坐标为负、横坐标为正，不能取到 $0$。',
      ],
      verify: () => {
        const vert = m => { const b = -2 * m, c = m * m + 2 * m - 3, x = -b / 2; return [x, x * x + b * x + c]; };
        // 由 m=0、1 两个顶点定出直线，再用别的 m 核对
        const [x0, y0] = vert(0), [x1, y1] = vert(1), k = (y1 - y0) / (x1 - x0), t = y0 - k * x0;
        const onLine = [-3, 2.5, 7].every(m => { const [x, y] = vert(m); return Math.abs(y - (k * x + t)) < 1e-9; });
        const ms = [];
        for (let i = -40; i <= 40; i++) { const [x, y] = vert(i / 8); if (x > 0 && y < 0) ms.push(i / 8); }
        const range = Math.min(...ms) === 1 / 8 && Math.max(...ms) === 11 / 8 && vert(0)[0] === 0 && vert(1.5)[1] === 0 ? '0<m<3/2' : null;
        return onLine ? [`${k}x+(${t})`, range] : null;
      },
    },
    {
      id: '27.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '当 $t\\le x\\le t+2$ 时，二次函数 $y=x^2-4x+5$ 的最大值与最小值的差是 $3$，求 $t$ 的值（全部填出，用逗号隔开，结果化成最简形式）。',
      blanks: [{ kind: 'reals', label: '$t=$', answer: ['2-√3', '√3'], simplest: true }],
      explain: [
        '叠加的两个环节：先按对称轴是否落在区间里分类，落在里面时还要再分“哪个端点离对称轴更远”。',
        '$y=(x-2)^2+1$，对称轴 $x=2$，开口向上。区间长度固定为 $2$，随 $t$ 左右滑动。',
        '① $t+2<2$（$t<0$）：区间在对称轴左侧，图像下降，差 $=y(t)-y(t+2)=(t-2)^2-t^2=4-4t=3$，$t=\\frac14$，不满足 $t<0$，舍去。',
        '② $t>2$：区间在右侧，图像上升，差 $=y(t+2)-y(t)=t^2-(t-2)^2=4t-4=3$，$t=\\frac74$，不满足 $t>2$，舍去。',
        '③ $0\\le t\\le2$：最小值是顶点处的 $1$，最大值在离 $x=2$ 较远的端点。若 $0\\le t\\le1$，左端点 $t$ 离得远，差 $=(t-2)^2=3$，$t=2-\\sqrt3$（$2+\\sqrt3$ 不在范围内）；若 $1<t\\le2$，右端点离得远，差 $=t^2=3$，$t=\\sqrt3$。',
        '所以 $t=2-\\sqrt3$ 或 $\\sqrt3$。两个答案关于 $t=1$ 对称——区间中点 $t+1$ 关于对称轴 $x=2$ 对称时，最大值与最小值之差相同，可以用来检验。',
      ],
      verify: () => zeros272(t => { const [mx, mn] = range272(1, -4, 5, t, t + 2); return mx - mn - 3; }, -20, 20),
    },
    {
      id: '27.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，抛物线 $y=-\\frac12x^2+2x+6$ 与 $x$ 轴交于 $A$、$B$ 两点（$A$ 在 $B$ 的左侧），与 $y$ 轴交于点 $C$，点 $P$ 在这条抛物线的对称轴上。(1) 若 $\\triangle PAC$ 是等腰三角形，求点 $P$ 的纵坐标；(2) 若 $\\triangle PAC$ 是直角三角形，求点 $P$ 的纵坐标（每问都全部填出，用逗号隔开，结果化成最简形式）。',
      figure: FIG272.c02,
      blanks: [
        { kind: 'reals', label: '(1) $P$ 的纵坐标是', answer: ['0', '2', '2√6', '-2√6'], simplest: true },
        { kind: 'reals', label: '(2) $P$ 的纵坐标是', answer: ['2', '4', '-4/3', '16/3'], simplest: true },
      ],
      explain: [
        '叠加的两个环节：先由抛物线求出 $A$、$C$ 和对称轴，再按“哪两条边相等”“哪个角是直角”各分三种情况，用两点间距离公式和勾股定理列方程；最后逐个检验三点是否共线（共线就不成三角形）。',
        '令 $y=0$：$x^2-4x-12=0$，$(x+2)(x-6)=0$，得 $A(-2,0)$、$B(6,0)$；令 $x=0$ 得 $C(0,6)$；对称轴 $x=-\\frac{2}{2\\times(-\\frac12)}=2$。设 $P(2,p)$，$p$ 可正可负。',
        '用两点间距离公式：$PA^2=4^2+p^2=16+p^2$，$PC^2=2^2+(p-6)^2=p^2-12p+40$，$AC^2=2^2+6^2=40$。',
        '(1) ① $PA=PC$：$16+p^2=p^2-12p+40$，$p=2$。② $PA=AC$：$16+p^2=40$，$p=\\pm2\\sqrt6$。③ $PC=AC$：$(p-6)^2=36$，$p=0$ 或 $p=12$。',
        '甄别共线：直线 $AC$ 是 $y=3x+6$，与对称轴交于 $(2,12)$。$p=12$ 时 $P(2,12)$ 在直线 $AC$ 上（$C$ 恰好是 $AP$ 的中点，$PC=AC$ 只是“线段相等”），构不成三角形，舍去。$p=0$ 时 $P(2,0)$ 在 $x$ 轴上，但不在直线 $AC$ 上，保留。所以纵坐标是 $0$、$2$、$2\\sqrt6$、$-2\\sqrt6$。坑：默认 $P$ 在 $x$ 轴上方漏掉 $-2\\sqrt6$ 和 $0$，或把 $12$ 也算上。',
        '(2) ① $\\angle APC=90^\\circ$：$PA^2+PC^2=AC^2$，$16+p^2+p^2-12p+40=40$，$p^2-6p+8=0$，$p=2$ 或 $4$。② $\\angle PAC=90^\\circ$：$PA^2+AC^2=PC^2$，$56+p^2=p^2-12p+40$，$p=-\\frac43$。③ $\\angle ACP=90^\\circ$：$PC^2+AC^2=PA^2$，$p^2-12p+80=16+p^2$，$p=\\frac{16}3$。',
        '这四个值都不是 $12$，都能构成三角形。所以纵坐标是 $2$、$4$、$-\\frac43$、$\\frac{16}3$。$p=2$ 时 $\\triangle PAC$ 既等腰又直角。坑：只考虑 $P$ 处是直角。',
      ],
      verify: () => {
        const [xa, xb] = roots272(-0.5, 2, 6), A = [xa, 0], C = [0, 6], ax = -2 / (2 * -0.5);
        const d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
        const yAC = x => C[1] + ((A[1] - C[1]) / (A[0] - C[0])) * x;
        // 每种情况都是关于 p 的二次（或一次）方程；在 (−30, 30) 上找零点，去重后去掉 P 在直线 AC 上的
        const solve = eqs => {
          const ps = [];
          for (const g of eqs) for (const z of zeros272(g, -30, 30)) if (!ps.some(q => Math.abs(q - z) < 1e-6)) ps.push(z);
          return ps.filter(p => Math.abs(p - yAC(ax)) > 1e-6);
        };
        const PA = p => d2([ax, p], A), PC = p => d2([ax, p], C), AC = d2(A, C);
        const iso = solve([p => PA(p) - PC(p), p => PA(p) - AC, p => PC(p) - AC]);
        const right = solve([p => PA(p) + PC(p) - AC, p => PA(p) + AC - PC(p), p => PC(p) + AC - PA(p)]);
        return xa < xb ? [iso, right] : null;
      },
    },
    {
      id: '27.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '将抛物线 $y=-x^2$ 平移，使平移后抛物线的顶点 $P$ 落在直线 $y=x+1$ 上，设平移后的抛物线与 $y$ 轴交于点 $Q$。(1) 求点 $Q$ 纵坐标的最大值；(2) 设顶点 $P$ 的横坐标为 $h$。若顶点 $P$ 在 $x$ 轴上方，且 $\\triangle OPQ$ 的面积等于 $h^2$（$O$ 是原点），求 $h$ 的值（全部填出，用逗号隔开，结果化成最简形式）。',
      blanks: [
        { kind: 'num', label: '(1) 最大值是', answer: '5/4' },
        { kind: 'reals', label: '(2) $h=$', answer: ['(-1+√5)/2', '(3+√13)/2', '(3-√13)/2'], simplest: true },
      ],
      explain: [
        '叠加的环节：先用一个字母表示所有可能的顶点，写出平移后的抛物线和 $Q$ 的纵坐标；(2) 中面积要用“长度”表示，带两个绝对值，按 $h$ 的正负、$Q$ 在原点上方还是下方分类，每类解出的根都要回头检验，最后再用“$P$ 在 $x$ 轴上方”筛选。',
        '顶点在直线 $y=x+1$ 上，设顶点 $P(h,h+1)$。平移不改变 $a$，平移后的抛物线是 $y=-(x-h)^2+h+1$。',
        '(1) 令 $x=0$：$Q$ 的纵坐标 $q=-h^2+h+1=-\\left(h-\\frac12\\right)^2+\\frac54$。这是关于 $h$ 的二次函数，开口向下，当 $h=\\frac12$ 时取到最大值 $\\frac54$。坑：以为顶点越高 $Q$ 就越高。',
        '(2) 以 $OQ$ 为底（在 $y$ 轴上），高是 $P$ 到 $y$ 轴的距离 $\\lvert h\\rvert$：$S=\\frac12\\lvert q\\rvert\\cdot\\lvert h\\rvert=h^2$。$h=0$ 时 $P$、$Q$ 都是 $(0,1)$，构不成三角形，所以 $h\\ne0$，两边除以 $\\lvert h\\rvert$ 得 $\\lvert q\\rvert=2\\lvert h\\rvert$。',
        '① $h>0$，$Q$ 在原点上方：$-h^2+h+1=2h$，$h^2+h-1=0$，$h=\\frac{-1\\pm\\sqrt5}2$，只有 $\\frac{-1+\\sqrt5}2$ 是正的（此时 $q=2h>0$，符合）。② $h>0$，$Q$ 在原点下方：$-h^2+h+1=-2h$，$h^2-3h-1=0$，$h=\\frac{3\\pm\\sqrt{13}}2$，取正的 $\\frac{3+\\sqrt{13}}2$。',
        '③ $h<0$，$Q$ 在上方：$q=-2h$，同②的方程，取负的 $\\frac{3-\\sqrt{13}}2$。④ $h<0$，$Q$ 在下方：$q=2h$，同①的方程，取负的 $\\frac{-1-\\sqrt5}2$。',
        '最后筛选：$P$ 在 $x$ 轴上方要求 $h+1>0$，即 $h>-1$。$\\frac{-1-\\sqrt5}2\\approx-1.62$ 舍去，$\\frac{3-\\sqrt{13}}2\\approx-0.30$ 保留。所以 $h=\\frac{-1+\\sqrt5}2$、$\\frac{3+\\sqrt{13}}2$ 或 $\\frac{3-\\sqrt{13}}2$。坑：面积不加绝对值，只得到①一种情况。',
      ],
      verify: () => {
        // (1) 对 h 用精确分数枚举一大批值，取 Q 纵坐标的最大值
        let best = null;
        for (let k = -400; k <= 400; k++) { const h = F(k).div(100), q = h.mul(h).neg().add(h).add(1); if (!best || best.cmp(q) < 0) best = q; }
        // (2) 直接用三个点的坐标算面积，在 h 的一大段范围上找面积 − h² 的零点，去掉三角形退化和 P 不在 x 轴上方的
        const tri = (P, Q, R) => Math.abs((Q[0] - P[0]) * (R[1] - P[1]) - (R[0] - P[0]) * (Q[1] - P[1])) / 2;
        const g = h => tri([0, 0], [h, h + 1], [0, -h * h + h + 1]) - h * h;
        const hs = zeros272(g, -20, 20).filter(h => Math.abs(h) > 1e-6 && h + 1 > 0);
        return [best, hs];
      },
    },
    {
      id: '27.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '点 $A(-1,y_1)$、$B(2,y_2)$、$C(4,y_3)$ 都在抛物线 $y=ax^2-2amx+c$（$a\\ne0$，$m$、$c$ 是常数）上。若 $y_1>y_3>y_2$，求 $m$ 的取值范围。',
      blanks: [{ kind: 'ineq', var: 'm', label: '$m$ 的取值范围是', answer: '3/2<m<3' }],
      explain: [
        '叠加的两个环节：开口方向未知，要分 $a>0$、$a<0$ 讨论；每种情况下又要把两个大小关系分别化成“到对称轴的距离”比较，再取公共部分。',
        '对称轴 $x=-\\frac{-2am}{2a}=m$。$a>0$ 时离对称轴越远函数值越大；$a<0$ 时越远越小。',
        '$a>0$：$y_1>y_3$ ⇔ $A$ 比 $C$ 离对称轴远：$(m+1)^2>(m-4)^2$，展开得 $10m>15$，$m>\\frac32$；$y_3>y_2$ ⇔ $(m-4)^2>(m-2)^2$，展开得 $-4m>-12$，$m<3$。所以 $\\frac32<m<3$。',
        '$a<0$：两个关系都反过来，$m<\\frac32$ 且 $m>3$，不可能，这种情况不存在。',
        '所以 $\\frac32<m<3$（同时说明 $a>0$）。坑：默认开口向上，或者用平方比较时没检查两边都是距离（非负）。',
      ],
      verify: () => {
        const ok = m => [1, -1].some(a => { const f = x => a * x * x - 2 * a * m * x; return f(-1) > f(4) && f(4) > f(2); });
        const ms = [];
        for (let k = -80; k <= 80; k++) if (ok(k / 8)) ms.push(k / 8);
        const lo = Math.min(...ms), hi = Math.max(...ms);
        return ms.length === (hi - lo) * 8 + 1 && !ok(lo - 1 / 8) && !ok(hi + 1 / 8) && !ok(1.5) && !ok(3) ? `${lo - 1 / 8}<m<${hi + 1 / 8}` : null;
      },
    },
    {
      id: '27.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，抛物线 $y=-x^2+x+6$ 与 $x$ 轴交于 $A$、$B$ 两点（$A$ 在 $B$ 的左侧），与 $y$ 轴交于点 $C$，$P$ 是抛物线上的点。(1) 当 $P$ 在直线 $BC$ 上方时，求 $\\triangle PBC$ 面积的最大值及此时 $P$ 的横坐标；(2) 若 $P$ 可以是抛物线上任意一点，且 $\\triangle PBC$ 的面积等于 $\\triangle ABC$ 面积的 $\\frac15$，求 $P$ 的横坐标（全部填出，用逗号隔开，结果化成最简形式）。',
      figure: FIG272.c05,
      blanks: [
        { kind: 'num', label: '(1) 面积的最大值是', answer: '27/8' },
        { kind: 'num', label: '此时 $P$ 的横坐标是', answer: '3/2' },
        { kind: 'reals', label: '(2) $P$ 的横坐标是', answer: ['1', '2', '(3+√17)/2', '(3-√17)/2'], simplest: true },
      ],
      explain: [
        '叠加的两个环节：把斜放的 $\\triangle PBC$ 的面积转化成“竖直线段 $PD$ 的长 × 水平宽度 ÷ 2”，得到关于横坐标的二次函数求最值；第 (2) 问再去掉“在上方”的限制，带绝对值分两种情况解方程。',
        '令 $y=0$：$x^2-x-6=0$，$(x+2)(x-3)=0$，$A(-2,0)$、$B(3,0)$；$C(0,6)$。直线 $BC$ 过 $(3,0)$、$(0,6)$：$y=-2x+6$。',
        '设 $P(x,-x^2+x+6)$，过 $P$ 作 $x$ 轴的垂线交 $BC$（或其延长线）于 $D(x,-2x+6)$。把 $\\triangle PBC$ 沿 $PD$ 分成两块，两块的高之和是 $B$、$C$ 的横坐标之差 $3$，所以 $S_{\\triangle PBC}=\\frac12\\cdot PD\\cdot3$。',
        '(1) $P$ 在 $BC$ 上方时 $PD=(-x^2+x+6)-(-2x+6)=-x^2+3x$，$S=\\frac32(-x^2+3x)=-\\frac32\\left(x-\\frac32\\right)^2+\\frac{27}8$，当 $x=\\frac32$ 时最大，为 $\\frac{27}8$。',
        '(2) $S_{\\triangle ABC}=\\frac12\\times5\\times6=15$，它的 $\\frac15$ 是 $3$。$P$ 在任意位置时 $PD=\\lvert -x^2+3x\\rvert$，由 $\\frac32\\lvert x^2-3x\\rvert=3$ 得 $x^2-3x=-2$ 或 $x^2-3x=2$。',
        '$x^2-3x+2=0$：$x=1$ 或 $2$（$P$ 在 $BC$ 上方，都在 $0$ 与 $3$ 之间；$3<\\frac{27}8$，上方确实取得到）；$x^2-3x-2=0$：$x=\\frac{3\\pm\\sqrt{17}}2$（$P$ 在 $BC$ 下方）。共 $4$ 个。坑：只考虑 $BC$ 上方的点，漏掉下方两个。',
      ],
      verify: () => {
        const [xa, xb] = roots272(-1, 1, 6), C = [0, 6], f = x => -x * x + x + 6;
        const tri = (P, Q, R) => Math.abs((Q[0] - P[0]) * (R[1] - P[1]) - (R[0] - P[0]) * (Q[1] - P[1])) / 2;
        const S = x => tri([x, f(x)], [xb, 0], C);
        // (1) 精确分数：上方时面积 = 3/2 (−x²+3x)，配方求最大
        const a = F(-3).div(2), b = F(9).div(2), vx = b.neg().div(a.mul(2)), smax = a.mul(vx).mul(vx).add(b.mul(vx));
        const sampleMax = Math.max(...Array.from({ length: 5001 }, (_, i) => S((xb * i) / 5000)));
        const fifth = tri([xa, 0], [xb, 0], C) / 5;
        const xs = zeros272(x => S(x) - fifth, -10, 15);
        return Math.abs(sampleMax - Number(smax.n) / Number(smax.d)) < 1e-6 ? [smax, vx, xs] : null;
      },
    },
  ],
});
