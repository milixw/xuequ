'use strict';

// 上海数学八年级上册 · 20.1 二次根式及其性质
// 知识范围：二次根式 √a（a 为有理式）及有意义的条件 a≥0（与分母不为 0 一起考虑）；性质 1 (√a)²=a（a≥0）、性质 2 √(a²)=|a|、
//   性质 3 √(ab)=√a·√b（a≥0，b≥0）、性质 4 √(a/b)=√a/√b（a≥0，b>0）；完全平方式；化简二次根式（把完全平方因式移到根号外，
//   被开方数含字母时先由被开方数非负判断字母的符号；化去被开方数的分母）；最简二次根式的两个条件
// 可以使用：六、七年级全部（绝对值、整式乘法与乘法公式、因式分解、分式、一元一次不等式（组）、三角形三边关系），19 章的平方根、立方根、实数
// 还没学：同类二次根式及其合并的说法、二次根式乘除法则的名称、分母有理化与有理化因式（20.2）；一元二次方程（第 21 章）；勾股定理（第 22 章）
// 本节约定：分母里有根号的式子一律不出（那是 20.2 的分母有理化）；被开方数含分母时只用性质 4 和“分子分母同乘一个数使分母成为完全平方”
//   化去分母；同一个根号的项相加减用 19.2 已有的分配律（如 2√3+3√3=5√3），不提“同类二次根式”；数值结果的填空要求最简（simplest）

const S = Math.sqrt;
const near = (x, y) => Math.abs(x - y) < 1e-9;
const R9 = v => Math.round(v * 1e9) / 1e9;
// 根号里的数是否不含大于 1 的平方因数（最简二次根式的判定）
const squareFree201 = n => { for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) return false; return true; };

const FIG201 = (() => {
  const ink = '#2b2b2b', red = '#c0513a';
  // e01：数轴上的 a、b、c
  const e01 = (() => {
    const u = 52, lo = -3, hi = 2, ox = 22, y = 40, w = (hi - lo) * u + 2 * ox + 10;
    const sx = x => ox + (x - lo) * u;
    let s = `<line x1="6" y1="${y}" x2="${w - 6}" y2="${y}" stroke="${ink}" stroke-width="1.6"/><path d="M${w - 10},${y - 4} l6,4 l-6,4" fill="none" stroke="${ink}" stroke-width="1.6"/>`;
    for (let x = lo; x <= hi; x++) s += `<line x1="${sx(x)}" y1="${y}" x2="${sx(x)}" y2="${y - 5}" stroke="${ink}"/><text x="${sx(x)}" y="${y + 18}" text-anchor="middle" font-size="13">${x < 0 ? '−' + -x : x}</text>`;
    for (const [v, name] of [[-2.45, 'a'], [0.45, 'b'], [1.6, 'c']]) s += `<circle cx="${sx(v)}" cy="${y}" r="3.5" fill="${red}"/><text x="${sx(v)}" y="${y - 10}" text-anchor="middle" font-size="15" font-style="italic" fill="${red}">${name}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 66" width="${w}" height="66" font-family="Times New Roman, serif">${s}</svg>`;
  })();
  // e05：三个正方形并排，底边在同一条直线上（边长按 2∶3∶4 画）
  const e05 = (() => {
    const k = 26, x0 = 14, base = 128;
    let s = `<line x1="4" y1="${base}" x2="${x0 + 9 * k + 10}" y2="${base}" stroke="#999" stroke-dasharray="4 3"/>`;
    let x = x0;
    for (const [side, area] of [[2, 12], [3, 27], [4, 48]]) {
      s += `<rect x="${x}" y="${base - side * k}" width="${side * k}" height="${side * k}" fill="#f6e3dc" stroke="${ink}" stroke-width="1.6"/>`;
      s += `<text x="${x + side * k / 2}" y="${base - side * k / 2 + 5}" text-anchor="middle" font-size="14">${area}</text>`;
      x += side * k;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${x0 + 9 * k + 16} 138" width="${x0 + 9 * k + 16}" height="138" font-family="Times New Roman, serif">${s}</svg>`;
  })();
  return { e01, e05 };
})();

Content.section({
  id: 'math/sh2024/g8s1/20.1',
  title: '二次根式及其性质',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。数值结果的填空用新增的 simplest 判分（没化成最简提示重写）。第 1 轮 c03（最简根式计数）四问同一方法、只有 4 级，c01 依赖“非完全平方数的算术平方根是无理数”未交代，c04、c05 的按钮选项可代入排除，扩展档缺 5 级题；第 2 轮 c03 换成“化简后根号相同”的反求（m=s(b−a)(b+a)，同奇偶分解 + 最值），c01 题干给出所用结论，c04 (2) 改两段填空，c05 (3) 改求值，e05 加四个正方形周长所有可能值，判定整节通过' },

  intro: [
    {
      title: '二次根式和它有意义的条件',
      body: '形如 $\\sqrt a$ 的代数式（$a$ 是有理式）叫作**二次根式**。负数没有平方根，所以 $\\sqrt a$ 有意义的条件是 $a\\geq0$。如果根号还在分母上，分母又不能为 $0$，被开方数就只能大于 $0$。',
      example: '$\\sqrt{x-7}$ 有意义，要 $x-7\\geq0$，即 $x\\geq7$。',
      pitfall: '“有意义”要把式子里每一个根号、每一个分母都检查一遍，最后取它们的公共部分。',
    },
    {
      title: '性质 1 和性质 2',
      body: '$\\sqrt a$ 是 $a$ 的算术平方根，所以**性质 1：$(\\sqrt a)^2=a$（$a\\geq0$）**。反过来先平方再开方，结果是非负数，而 $a$ 可能是负数，所以**性质 2：$\\sqrt{a^2}=\\lvert a\\rvert$**。',
      example: '$(\\sqrt7)^2=7$；$\\sqrt{(-5)^2}=\\lvert-5\\rvert=5$；$\\sqrt{(1-\\sqrt2)^2}=\\lvert1-\\sqrt2\\rvert=\\sqrt2-1$。',
      pitfall: '$\\sqrt{a^2}$ 等于 $a$ 还是 $-a$，要先看 $a$ 的正负。',
    },
    {
      title: '性质 3 和性质 4',
      body: '**性质 3：$\\sqrt{ab}=\\sqrt a\\cdot\\sqrt b$（$a\\geq0$，$b\\geq0$）**；**性质 4：$\\sqrt{\\dfrac ab}=\\dfrac{\\sqrt a}{\\sqrt b}$（$a\\geq0$，$b>0$）**。用它们可以把根号拆开，也可以合起来。',
      example: '$\\sqrt{75}=\\sqrt{25\\times3}=\\sqrt{25}\\times\\sqrt3=5\\sqrt3$；$\\sqrt{\\dfrac{5}{16}}=\\dfrac{\\sqrt5}{\\sqrt{16}}=\\dfrac{\\sqrt5}{4}$。',
      pitfall: '条件不能丢：$\\sqrt{(-4)\\times(-9)}=6$ 有意义，但写成 $\\sqrt{-4}\\times\\sqrt{-9}$ 就没有意义了。',
    },
    {
      title: '化简二次根式',
      body: '两件事：① 把被开方数里的**完全平方因式**用它的算术平方根代替，移到根号外面；② 被开方数有分母时，分子分母同乘一个数（或式子），使分母变成完全平方，再把分母移出来。含字母时，先由“被开方数 $\\geq0$”判断字母的正负，移出来的是绝对值。',
      example: '$\\sqrt{18m^3}$ 有意义要 $m\\geq0$，$\\sqrt{18m^3}=\\sqrt{(3m)^2\\cdot2m}=\\lvert3m\\rvert\\sqrt{2m}=3m\\sqrt{2m}$；$\\sqrt{\\dfrac23}=\\sqrt{\\dfrac{6}{9}}=\\dfrac{\\sqrt6}{3}$。',
    },
    {
      title: '最简二次根式',
      body: '满足两个条件的二次根式叫作**最简二次根式**：① 被开方数中各因式（分解因式、分解素因数后）的指数都是 $1$；② 被开方数不含分母。计算的结果一般都要化成最简二次根式。',
      example: '$\\sqrt{7ab}$ 是最简二次根式；$\\sqrt{9a}=3\\sqrt a$ 不是（含因数 $3^2$）；$\\sqrt{\\dfrac a5}$ 不是（含分母）。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '20.1-b01',
      level: 'basic',
      type: 'fill',
      stem: '设 $x$ 是实数，当 $x$ 满足什么条件时，下列各式有意义？（填 $x$ 的取值范围，如 $x\\geq1$、$-1<x\\leq3$）',
      blanks: [
        { kind: 'ineq', label: '(1) $\\sqrt{6-3x}$：', answer: 'x<=2' },
        { kind: 'ineq', label: '(2) $\\dfrac{2}{\\sqrt{4x+1}}$：', answer: 'x>-1/4' },
        { kind: 'ineq', label: '(3) $\\sqrt{x+2}+\\sqrt{1-2x}$：', answer: '-2<=x<=1/2' },
      ],
      explain: [
        '(1) 被开方数非负：$6-3x\\geq0$，$-3x\\geq-6$，两边除以 $-3$ 要变号，得 $x\\leq2$。',
        '(2) 根号在分母上，既要 $4x+1\\geq0$，又要 $\\sqrt{4x+1}\\neq0$，合起来是 $4x+1>0$，得 $x>-\\frac14$。坑：写成 $x\\geq-\\frac14$ 就把使分母为 $0$ 的值也算进去了。',
        '(3) 两个根号都要有意义：$x+2\\geq0$ 且 $1-2x\\geq0$，即 $x\\geq-2$ 且 $x\\leq\\frac12$，公共部分是 $-2\\leq x\\leq\\frac12$。',
      ],
      verify: () => {
        // 逐个解 kx+c≥0（或 >0），返回边界
        const bound = (k, c) => F(-c).div(k);
        return [`x<=${bound(-3, 6)}`, `x>${bound(4, 1)}`, `${bound(1, 2)}<=x<=${bound(-2, 1)}`];
      },
    },
    {
      id: '20.1-b02',
      level: 'basic',
      type: 'multi',
      stem: '下列各式中，对**任意实数** $x$ 都有意义的有（　　）',
      options: ['$\\sqrt{x^2+2}$', '$\\sqrt{-x^2}$', '$\\sqrt{(x-1)^2}$', '$\\dfrac{1}{\\sqrt{x^2}}$', '$\\sqrt{x^2-2x+2}$', '$\\sqrt{\\lvert x\\rvert-1}$'],
      answer: [0, 2, 4],
      explain: [
        'A：$x^2\\geq0$，所以 $x^2+2\\geq2>0$，总有意义。',
        'B：$-x^2\\leq0$，只有 $x=0$ 时才等于 $0$，其余时候是负数，没有意义。',
        'C：$(x-1)^2$ 是一个数的平方，总是 $\\geq0$，总有意义。坑：看到“$x-1$ 可能是负数”就以为不行，其实平方以后就不会负了。',
        'D：$x=0$ 时分母为 $0$，不是对任意实数都有意义。',
        'E：$x^2-2x+2=(x-1)^2+1\\geq1$，总有意义。',
        'F：$x=0$ 时 $\\lvert x\\rvert-1=-1<0$，没有意义。所以选 A、C、E。',
      ],
      verify: () => {
        const xs = [-3, -1, -0.5, 0, 0.5, 1, 2.7];
        const ok = [x => x * x + 2 >= 0, x => -x * x >= 0, x => (x - 1) ** 2 >= 0, x => x * x > 0, x => x * x - 2 * x + 2 >= 0, x => Math.abs(x) - 1 >= 0];
        return ok.map((f, i) => (xs.every(f) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '20.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '求下列各式的值。',
      blanks: [
        { kind: 'real', label: '(1) $\\sqrt{(\\sqrt3-2)^2}=$', answer: '2-√3', simplest: true },
        { kind: 'num', label: '(2) $(-2\\sqrt5)^2=$', answer: '20' },
        { kind: 'num', label: '(3) $\\sqrt{(3-\\pi)^2}+\\sqrt{(\\pi-4)^2}=$', answer: '1' },
      ],
      explain: [
        '(1) 由性质 2，$\\sqrt{(\\sqrt3-2)^2}=\\lvert\\sqrt3-2\\rvert$。因为 $3<4$，$\\sqrt3<2$，括号里是负数，所以结果是 $2-\\sqrt3$。坑：直接写 $\\sqrt3-2$，那是一个负数，算术平方根不可能是负数。',
        '(2) $(-2\\sqrt5)^2=(-2)^2\\times(\\sqrt5)^2=4\\times5=20$。坑：只把 $\\sqrt5$ 平方得 $-10$ 或 $10$，漏了系数 $-2$ 也要平方。',
        '(3) $\\pi\\approx3.14$，$3-\\pi<0$，$\\pi-4<0$。原式 $=\\lvert3-\\pi\\rvert+\\lvert\\pi-4\\rvert=(\\pi-3)+(4-\\pi)=1$。',
      ],
      verify: () => [S((S(3) - 2) ** 2), Math.round((-2 * S(5)) ** 2), Math.round(S((3 - Math.PI) ** 2) + S((Math.PI - 4) ** 2))],
    },
    {
      id: '20.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '把下列二次根式化成最简二次根式（可以写成 6√3、3√2/10 这样的形式）。',
      blanks: [
        { kind: 'real', label: '(1) $\\sqrt{108}=$', answer: '6√3', simplest: true },
        { kind: 'real', label: '(2) $\\sqrt{0.18}=$', answer: '3√2/10', simplest: true },
        { kind: 'real', label: '(3) $\\sqrt{2\\frac29}=$', answer: '2√5/3', simplest: true },
        { kind: 'real', label: '(4) $\\sqrt{14\\times21}=$', answer: '7√6', simplest: true },
      ],
      explain: [
        '(1) $108=36\\times3$，$\\sqrt{108}=\\sqrt{6^2\\times3}=6\\sqrt3$。坑：只找到因数 $4$，写成 $2\\sqrt{27}$，根号里还有 $9$，没化完。',
        '(2) 小数先化成分数：$\\sqrt{0.18}=\\sqrt{\\frac{18}{100}}=\\frac{\\sqrt{18}}{10}=\\frac{3\\sqrt2}{10}$。',
        '(3) 带分数先化成假分数：$2\\frac29=\\frac{20}{9}$，$\\sqrt{\\frac{20}{9}}=\\frac{\\sqrt{20}}{3}=\\frac{2\\sqrt5}{3}$。坑：写成 $2\\sqrt{\\frac29}$，带分数的“$2$”是加上去的，不是乘。',
        '(4) 不必先算出 $294$，分解素因数更快：$14\\times21=2\\times7\\times3\\times7=7^2\\times6$，所以 $\\sqrt{14\\times21}=7\\sqrt6$。',
      ],
      verify: () => [S(108), S(0.18), S(2 + 2 / 9), S(14 * 21)],
    },
    {
      id: '20.1-b05',
      level: 'basic',
      type: 'multi',
      stem: '下列二次根式中，是**最简二次根式**的有（　　）',
      options: ['$\\sqrt{15}$', '$\\sqrt{0.3}$', '$\\sqrt{a^2+9}$', '$\\sqrt{12x}$', '$\\sqrt{5xy}$', '$\\sqrt{a^2+2ab+b^2}$'],
      answer: [0, 2, 4],
      explain: [
        'A：$15=3\\times5$，各因数的指数都是 $1$，是最简二次根式。',
        'B：$0.3=\\frac{3}{10}$，被开方数含分母，不是。坑：小数也算含分母。',
        'C：$a^2+9$ 不能分解因式，指数为 $1$，是最简二次根式。坑：误以为 $\\sqrt{a^2+9}=a+3$，平方的和不能这样开方。',
        'D：$12x=2^2\\times3x$，含因数 $2^2$，$\\sqrt{12x}=2\\sqrt{3x}$，不是。',
        'E：$5xy$ 中各因式指数都是 $1$，是最简二次根式。',
        'F：$a^2+2ab+b^2=(a+b)^2$，因式 $a+b$ 的指数是 $2$，不是。所以选 A、C、E。',
      ],
      verify: () => {
        const simple = [squareFree201(15), false /* 0.3 含分母 */, true, squareFree201(12), squareFree201(5), false /* (a+b)² */];
        return simple.map((s, i) => (s ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '20.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '写出下列等式成立的条件（填 $x$ 的取值范围）。',
      blanks: [
        { kind: 'ineq', label: '(1) $\\sqrt{(x+1)(x-2)}=\\sqrt{x+1}\\cdot\\sqrt{x-2}$：', answer: 'x>=2' },
        { kind: 'ineq', label: '(2) $\\sqrt{\\dfrac{x+3}{2-x}}=\\dfrac{\\sqrt{x+3}}{\\sqrt{2-x}}$：', answer: '-3<=x<2' },
      ],
      explain: [
        '要让等式成立，等号**两边都要有意义**，右边的条件更严格，就按右边来。',
        '(1) 右边 $\\sqrt{x+1}$、$\\sqrt{x-2}$ 都要有意义：$x\\geq-1$ 且 $x\\geq2$，所以 $x\\geq2$。坑：左边在 $x\\leq-1$ 时也有意义（两个负数相乘为正），但那时右边没有意义，等式不成立。',
        '(2) 右边分子 $x+3\\geq0$，分母 $\\sqrt{2-x}$ 要有意义且不为 $0$：$2-x>0$。所以 $-3\\leq x<2$。坑：$x=2$ 时分母为 $0$，不能取等号。',
      ],
      verify: () => {
        // 在一串点上检验：两边都有意义且相等的 x 恰好满足答案
        const xs = [-4, -3, -2, -1, 0, 1.5, 2, 3, 5];
        const ok1 = xs.filter(x => x + 1 >= 0 && x - 2 >= 0 && near(S((x + 1) * (x - 2)), S(x + 1) * S(x - 2)));
        const ok2 = xs.filter(x => x + 3 >= 0 && 2 - x > 0 && near(S((x + 3) / (2 - x)), S(x + 3) / S(2 - x)));
        return [`x>=${Math.min(...ok1)}`, `${Math.min(...ok2)}<=x<2`];
      },
    },
    {
      id: '20.1-b07',
      level: 'basic',
      type: 'choice',
      stem: '已知 $x<0$，那么 $\\sqrt{12x^2y}$ 化简的结果是（　　）',
      options: ['$2x\\sqrt{3y}$', '$-2x\\sqrt{3y}$', '$2x\\sqrt{-3y}$', '$-2x\\sqrt{-3y}$'],
      answer: 1,
      explain: [
        '先看被开方数：$x^2>0$，要 $12x^2y\\geq0$，必须 $y\\geq0$，所以 C、D 里的 $\\sqrt{-3y}$ 对不上。',
        '$\\sqrt{12x^2y}=\\sqrt{(2x)^2\\cdot3y}=\\lvert2x\\rvert\\sqrt{3y}$。',
        '因为 $x<0$，$\\lvert2x\\rvert=-2x$，所以结果是 $-2x\\sqrt{3y}$，选 B。坑：选 A，把 $x$ 直接移出根号，结果成了负数。',
      ],
      verify: () => {
        const x = -1.7, y = 0.8, v = S(12 * x * x * y);
        const opts = [2 * x * S(3 * y), -2 * x * S(3 * y), NaN, NaN];
        return opts.findIndex(o => near(o, v));
      },
    },
    {
      id: '20.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '已知 $2<x<5$，化简：$\\sqrt{x^2-4x+4}-\\sqrt{x^2-10x+25}$。',
      blanks: [{ kind: 'expr', label: '结果是', answer: '2x-7', simplified: true }],
      explain: [
        '先把被开方数写成完全平方式：$x^2-4x+4=(x-2)^2$，$x^2-10x+25=(x-5)^2$。',
        '由性质 2，原式 $=\\lvert x-2\\rvert-\\lvert x-5\\rvert$。',
        '因为 $2<x<5$，$x-2>0$，$x-5<0$，所以原式 $=(x-2)-(5-x)=2x-7$。',
        '坑：第二个绝对值去掉后是 $5-x$，前面还有减号，写成 $-(5-x)$ 再去括号，别算成 $x-2-5-x$。',
      ],
      verify: () => {
        const f = x => S(x * x - 4 * x + 4) - S(x * x - 10 * x + 25);
        return [2.5, 3, 4.2].every(x => near(f(x), 2 * x - 7)) ? '2x-7' : '';
      },
    },
    {
      id: '20.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '一个正方体的表面积是 $72\\text{ cm}^2$。（结果化成最简二次根式）',
      blanks: [
        { kind: 'real', label: '(1) 棱长是（cm）', answer: '2√3', simplest: true },
        { kind: 'real', label: '(2) 体积是（cm³）', answer: '24√3', simplest: true },
      ],
      explain: [
        '(1) 正方体有 $6$ 个面，每个面的面积是 $72\\div6=12$，棱长 $=\\sqrt{12}=\\sqrt{2^2\\times3}=2\\sqrt3$。坑：直接用 $\\sqrt{72}$，那是把表面积当成了一个面。',
        '(2) 体积 $=(2\\sqrt3)^3=2^3\\times(\\sqrt3)^2\\times\\sqrt3=8\\times3\\times\\sqrt3=24\\sqrt3$。',
      ],
      verify: () => { const a = S(72 / 6); return [a, a ** 3]; },
    },

    // ---------- 扩展 ----------
    {
      id: '20.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '实数 $a$、$b$、$c$ 在数轴上对应的点如图所示。化简：$\\sqrt{a^2}-\\sqrt{(a-b)^2}+\\sqrt{(b-c)^2}+\\sqrt{(a+c)^2}$。',
      figure: FIG201.e01,
      blanks: [{ kind: 'expr', label: '结果是', answer: '-a-2b', simplified: true }],
      explain: [
        '由性质 2，四个根号依次等于 $\\lvert a\\rvert$、$\\lvert a-b\\rvert$、$\\lvert b-c\\rvert$、$\\lvert a+c\\rvert$，关键是判断每个式子的正负。',
        '从图上看：$-3<a<-2$，$0<b<1$，$1<c<2$。',
        '$a<0$，$\\lvert a\\rvert=-a$；$a<b$，$a-b<0$，$\\lvert a-b\\rvert=b-a$；$b<c$，$b-c<0$，$\\lvert b-c\\rvert=c-b$。',
        '$a+c$：$a$ 离原点超过 $2$，$c$ 离原点不到 $2$，负数的绝对值更大，所以 $a+c<0$，$\\lvert a+c\\rvert=-a-c$。这一项最容易判断错。',
        '原式 $=(-a)-(b-a)+(c-b)+(-a-c)=-a-b+a+c-b-a-c=-a-2b$。',
      ],
      verify: () => {
        const f = (a, b, c) => S(a * a) - S((a - b) ** 2) + S((b - c) ** 2) + S((a + c) ** 2);
        return [[-2.45, 0.45, 1.6], [-2.9, 0.1, 1.95], [-2.05, 0.9, 1.1]].every(([a, b, c]) => near(f(a, b, c), -a - 2 * b)) ? '-a-2b' : '';
      },
    },
    {
      id: '20.1-e02',
      level: 'extended',
      type: 'multi',
      stem: '下列把根号外的因式移进根号、或把根号里的因式移出根号的变形中，正确的有（　　）（各式都在有意义的前提下）',
      options: [
        '$a\\sqrt{-\\dfrac{2}{a}}=-\\sqrt{-2a}$',
        '$\\sqrt{-8x^3}=2x\\sqrt{-2x}$',
        '$(b-1)\\sqrt{\\dfrac{1}{1-b}}=-\\sqrt{1-b}$',
        '$\\sqrt{m^2n}=m\\sqrt n$（已知 $m<0$）',
        '$-x\\sqrt{-\\dfrac1x}=\\sqrt{-x}$',
      ],
      answer: [0, 2, 4],
      explain: [
        '先由“有意义”定符号，再动手。移进根号时，根号外的因式若是负数，要把负号留在根号外。',
        'A：$-\\frac2a\\geq0$ 且 $a\\neq0$，所以 $a<0$。$\\sqrt{-\\frac2a}=\\sqrt{\\frac{-2a}{a^2}}=\\frac{\\sqrt{-2a}}{\\lvert a\\rvert}=\\frac{\\sqrt{-2a}}{-a}$，乘以 $a$ 得 $-\\sqrt{-2a}$，正确。',
        'B：$-8x^3\\geq0$，所以 $x\\leq0$。$\\sqrt{-8x^3}=\\sqrt{(2x)^2\\cdot(-2x)}=\\lvert2x\\rvert\\sqrt{-2x}=-2x\\sqrt{-2x}$，题中少了负号，错误。',
        'C：$\\frac{1}{1-b}>0$，所以 $b<1$，$b-1<0$。$(b-1)\\sqrt{\\frac{1}{1-b}}=-(1-b)\\cdot\\frac{1}{\\sqrt{1-b}}=-\\sqrt{1-b}$，正确。',
        'D：$\\sqrt{m^2n}=\\lvert m\\rvert\\sqrt n=-m\\sqrt n$，错误。',
        'E：$-\\frac1x\\geq0$，所以 $x<0$，$-x>0$。$-x\\sqrt{-\\frac1x}=\\sqrt{(-x)^2\\cdot(-\\frac1x)}=\\sqrt{-x}$，正确。所以选 A、C、E。',
      ],
      verify: () => {
        const a = -1.3, x = -0.7, b = 0.4, m = -2.2, n = 1.9, y = -0.6;
        const ok = [
          near(a * S(-2 / a), -S(-2 * a)),
          near(S(-8 * x ** 3), 2 * x * S(-2 * x)),
          near((b - 1) * S(1 / (1 - b)), -S(1 - b)),
          near(S(m * m * n), m * S(n)),
          near(-y * S(-1 / y), S(-y)),
        ];
        return ok.map((t, i) => (t ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '20.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x$ 是整数。',
      blanks: [
        { kind: 'num', label: '(1) 使 $\\sqrt{4-x}+\\dfrac{1}{\\sqrt{2x+3}}$ 有意义的整数 $x$ 有几个？', answer: '6' },
        { kind: 'num', label: '(2) 在 (1) 的这些整数中，使 $\\sqrt{4-x}\\cdot\\sqrt{2x+3}$ 的值是整数的有几个？', answer: '2' },
      ],
      explain: [
        '(1) 要 $4-x\\geq0$ 且 $2x+3>0$（根号在分母上，不能为 $0$），即 $-\\frac32<x\\leq4$。整数 $x$ 为 $-1$、$0$、$1$、$2$、$3$、$4$，共 $6$ 个。',
        '(2) 这时两个被开方数都非负，由性质 3，$\\sqrt{4-x}\\cdot\\sqrt{2x+3}=\\sqrt{(4-x)(2x+3)}$，只要看 $(4-x)(2x+3)$ 是不是完全平方数。',
        '逐个算：$x=-1$ 得 $5\\times1=5$；$x=0$ 得 $12$；$x=1$ 得 $15$；$x=2$ 得 $14$；$x=3$ 得 $1\\times9=9$；$x=4$ 得 $0$。',
        '只有 $9$ 和 $0$ 是完全平方数，值分别是 $3$ 和 $0$，所以有 $2$ 个。坑：漏掉 $x=4$——$0$ 也是整数。',
      ],
      verify: () => {
        const xs = [];
        for (let x = -10; x <= 10; x++) if (4 - x >= 0 && 2 * x + 3 > 0) xs.push(x);
        const good = xs.filter(x => Number.isInteger(S((4 - x) * (2 * x + 3))));
        return [xs.length, good.length];
      },
    },
    {
      id: '20.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '化简求值：$x\\sqrt{\\dfrac yx}+y\\sqrt{\\dfrac xy}$。（结果化成最简二次根式）',
      blanks: [
        { kind: 'real', label: '(1) 已知 $x+y=-7$，$xy=8$，原式 $=$', answer: '-4√2', simplest: true },
        { kind: 'real', label: '(2) 已知 $x+y=7$，$xy=8$，原式 $=$', answer: '4√2', simplest: true },
      ],
      explain: [
        '$x$、$y$ 不容易直接求出来，先化简。由性质 4 和化去分母的方法：$\\sqrt{\\frac yx}=\\sqrt{\\frac{xy}{x^2}}=\\frac{\\sqrt{xy}}{\\lvert x\\rvert}$，同理 $\\sqrt{\\frac xy}=\\frac{\\sqrt{xy}}{\\lvert y\\rvert}$。',
        '所以原式 $=\\frac{x}{\\lvert x\\rvert}\\sqrt{xy}+\\frac{y}{\\lvert y\\rvert}\\sqrt{xy}$，关键是 $x$、$y$ 的正负。',
        '(1) $xy=8>0$，$x$、$y$ 同号；$x+y=-7<0$，所以都是负数，$\\frac{x}{\\lvert x\\rvert}=\\frac{y}{\\lvert y\\rvert}=-1$。原式 $=-2\\sqrt{xy}=-2\\sqrt8=-4\\sqrt2$。',
        '(2) 同号且和为正，都是正数，原式 $=2\\sqrt8=4\\sqrt2$。',
        '坑：直接把 $x$ “约掉”写成 $\\sqrt{xy}+\\sqrt{xy}$，忽略了 $x$ 是负数时移进根号要留负号，两问就得到同一个答案了。',
      ],
      verify: () => {
        // 由和与积求出 x、y（只在测试里用一元二次方程求根公式），再直接代入原式
        const calc = (s, p) => {
          const d = S(s * s - 4 * p), x = (s + d) / 2, y = (s - d) / 2;
          return x * S(y / x) + y * S(x / y);
        };
        return [calc(-7, 8), calc(7, 8)];
      },
    },
    {
      id: '20.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '面积分别为 $12$、$27$、$48$（单位：$\\text{cm}^2$）的三个正方形纸片，不重叠地并排摆放，底边在同一条直线上，相邻两个正方形靠在一起（如图是其中一种摆法）。所拼图形的周长指整个图形外轮廓的长。（结果化成最简二次根式）',
      figure: FIG201.e05,
      blanks: [
        { kind: 'real', label: '(1) 按图中从小到大的顺序摆放，所拼图形的周长是（cm）', answer: '26√3', simplest: true },
        { kind: 'real', label: '(2) 改变三个正方形的左右顺序，所拼图形周长的最大值是（cm）', answer: '28√3', simplest: true },
        { kind: 'reals', label: '(3) 再添一个面积为 $75\\text{ cm}^2$ 的正方形，四个正方形按同样的方式以任意顺序摆放，所拼图形的周长可能是（cm，全部填出，用逗号隔开）', answer: ['38√3', '40√3', '42√3'], simplest: true },
      ],
      explain: [
        '三个正方形的边长：$\\sqrt{12}=2\\sqrt3$，$\\sqrt{27}=3\\sqrt3$，$\\sqrt{48}=4\\sqrt3$。',
        '周长分成两部分：横向的边，上下各有一段总宽 $2\\sqrt3+3\\sqrt3+4\\sqrt3=9\\sqrt3$（上方是几段高低不同的边，加起来也是总宽），共 $18\\sqrt3$。',
        '竖向的边：最左、最右两条，加上相邻两个正方形高度差露出的部分。',
        '(1) 从左往右 $2\\sqrt3$、$3\\sqrt3$、$4\\sqrt3$：竖边 $=2\\sqrt3+4\\sqrt3+(3\\sqrt3-2\\sqrt3)+(4\\sqrt3-3\\sqrt3)=8\\sqrt3$，正好是最高的边长的 $2$ 倍。周长 $=18\\sqrt3+8\\sqrt3=26\\sqrt3$。',
        '(2) 分类看最矮的放在哪里。最矮的在一端（如 $2,3,4$ 或 $3,4,2$ 等），高度先升后降或一直升，竖边都是最高边长的 $2$ 倍，即 $8\\sqrt3$。',
        '最矮的放中间（$3\\sqrt3$、$2\\sqrt3$、$4\\sqrt3$）：竖边 $=3\\sqrt3+4\\sqrt3+(3\\sqrt3-2\\sqrt3)+(4\\sqrt3-2\\sqrt3)=10\\sqrt3$，周长 $=18\\sqrt3+10\\sqrt3=28\\sqrt3$。这是最大值。',
        '(3) 第四个边长 $\\sqrt{75}=5\\sqrt3$，总宽 $14\\sqrt3$，横边共 $28\\sqrt3$。把竖边看成“沿着高度走一遍”：从地面爬到第一个正方形顶上，每遇到高低变化就上或下，最后从最右边下到地面。上升的总量等于下降的总量，所以竖边之和 $=2\\times$（上升的总量）。',
        '以下以 $\\sqrt3$ 为单位。高度只有一个“峰”（先升后降，或一直升、一直降）时，上升总量就是最高的 $5$，竖边 $10$。',
        '有两个峰、中间夹一个“谷”时（如 $4,2,5,3$），上升总量 $=$ 两个峰之和 $-$ 谷的高度。谷要比两边的峰都矮，而 $5$ 必是一个峰：峰 $5$、$4$ 谷 $2$ 得 $7$；峰 $5$、$4$ 谷 $3$ 或峰 $5$、$3$ 谷 $2$ 得 $6$。四个数排不出三个峰。',
        '所以竖边之和可能是 $10$、$12$、$14$，周长可能是 $38\\sqrt3$、$40\\sqrt3$、$42\\sqrt3$。',
      ],
      verify: () => {
        const allOrders = a => (a.length < 2 ? [a] : a.flatMap((x, i) => allOrders([...a.slice(0, i), ...a.slice(i + 1)]).map(q => [x, ...q])));
        const per4 = o => 2 * o.reduce((t, v) => t + v, 0) + o[0] + o[o.length - 1] + o.slice(1).reduce((t, v, i) => t + Math.abs(v - o[i]), 0);
        const four = allOrders([12, 27, 48, 75].map(S)).map(per4).filter((v, i, arr) => arr.findIndex(w => near(w, v)) === i);
        const sides = [12, 27, 48].map(S);
        const per = o => {
          const h = o.map(i => sides[i]);
          return 2 * (h[0] + h[1] + h[2]) + h[0] + h[2] + Math.abs(h[0] - h[1]) + Math.abs(h[1] - h[2]);
        };
        const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
        return [per([0, 1, 2]), Math.max(...perms.map(per)), four];
      },
    },
    {
      id: '20.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$、$c$ 都不为 $0$，且 $a+b+c=0$。',
      blanks: [
        { kind: 'nums', label: '(1) $\\dfrac{\\sqrt{a^2}}{a}+\\dfrac{\\sqrt{b^2}}{b}+\\dfrac{\\sqrt{c^2}}{c}$ 所有可能的值是（全部填出，用逗号隔开）', answer: ['1', '-1'] },
        { kind: 'num', label: '(2) 如果还知道 $abc>0$，那么 $\\dfrac{\\sqrt{(a+b)^2}}{c}+\\dfrac{\\sqrt{(b+c)^2}}{a}+\\dfrac{\\sqrt{(c+a)^2}}{b}=$', answer: '-1' },
      ],
      explain: [
        '(1) 由性质 2，$\\frac{\\sqrt{a^2}}{a}=\\frac{\\lvert a\\rvert}{a}$，$a>0$ 时为 $1$，$a<0$ 时为 $-1$。',
        '三个数和为 $0$ 且都不为 $0$，不可能全正，也不可能全负，只能“两正一负”或“两负一正”。',
        '两正一负：$1+1-1=1$；两负一正：$-1-1+1=-1$。所以可能的值是 $1$ 或 $-1$。',
        '(2) 由 $a+b+c=0$ 得 $a+b=-c$，所以 $\\sqrt{(a+b)^2}=\\sqrt{c^2}=\\lvert c\\rvert$，同理另两个分子是 $\\lvert a\\rvert$、$\\lvert b\\rvert$。原式 $=\\frac{\\lvert c\\rvert}{c}+\\frac{\\lvert a\\rvert}{a}+\\frac{\\lvert b\\rvert}{b}$，就是 (1) 的式子。',
        '$abc>0$：负数的个数是偶数，结合 (1) 只能是两负一正，原式 $=-1$。',
      ],
      verify: () => {
        const sg = v => Math.abs(v) / v;
        const vals1 = new Set(), vals2 = new Set();
        for (let a = -5; a <= 5; a++) for (let b = -5; b <= 5; b++) {
          const c = -a - b;
          if (!a || !b || !c) continue;
          vals1.add(sg(a) + sg(b) + sg(c));
          if (a * b * c > 0) vals2.add(S((a + b) ** 2) / c + S((b + c) ** 2) / a + S((c + a) ** 2) / b);
        }
        return [[...vals1], vals2.size === 1 ? [...vals2][0] : NaN];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '20.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '研究关于正整数 $a$、$b$ 的等式 $\\sqrt a+\\sqrt b=\\sqrt n$（$n$ 是给定的正整数，$a\\leq b$）。可以直接使用：正整数 $N$ 不是完全平方数时，$\\sqrt N$ 是无理数。',
      blanks: [
        { kind: 'num', label: '(1) 当 $n=180$ 时，满足等式的正整数对 $(a,b)$ 有几对？', answer: '3' },
        { kind: 'num', label: '(2) 使满足等式的正整数对 $(a,b)$ 恰好有 $3$ 对的正整数 $n$，最小是多少？', answer: '36' },
        { kind: 'num', label: '(3) 如果还要求 $\\sqrt n$ 不是整数，(2) 中的 $n$ 最小是多少？', answer: '72' },
      ],
      explain: [
        '思路：先说明 $\\sqrt a$、$\\sqrt b$ 只能是“$\\sqrt n$ 化简后那个根号”的整数倍，问题就变成把一个正整数拆成两个正整数之和。',
        '(1) $\\sqrt{180}=6\\sqrt5$。由 $\\sqrt a=6\\sqrt5-\\sqrt b$，两边平方：$a=180+b-2\\times6\\sqrt5\\cdot\\sqrt b=180+b-12\\sqrt{5b}$（性质 3），所以 $\\sqrt{5b}=\\frac{180+b-a}{12}$ 是有理数。',
        '由题目给的结论，$\\sqrt{5b}$ 是有理数，$5b$ 就必须是完全平方数，而 $5b$ 含因数 $5$，于是含 $5^2$，$b=5q^2$（$q$ 是正整数），即 $\\sqrt b=q\\sqrt5$；同理 $\\sqrt a=p\\sqrt5$。',
        '代回得 $p+q=6$，$p\\leq q$：$(1,5)$、$(2,4)$、$(3,3)$，对应 $(a,b)=(5,125)$、$(20,80)$、$(45,45)$，共 $3$ 对。',
        '(2) 一般地，把 $\\sqrt n$ 化成最简形式 $s\\sqrt m$（$m$ 不含平方因数，$\\sqrt n$ 是整数时 $m=1$），同样的道理得 $\\sqrt a=p\\sqrt m$，$\\sqrt b=q\\sqrt m$，$p+q=s$，$1\\leq p\\leq q$。',
        '$p$ 可取 $1,2,\\cdots$ 直到 $p\\leq\\frac s2$，数对个数是 $\\frac s2$ 的整数部分。要恰好 $3$ 对，$s=6$ 或 $7$。$n=s^2m$ 最小取 $s=6$，$m=1$：$n=36$（$\\sqrt{36}=6=1+5=2+4=3+3$，对应 $(1,25)$、$(4,16)$、$(9,9)$）。',
        '(3) $\\sqrt n$ 不是整数，$m\\geq2$，最小 $m=2$，$n=36\\times2=72$（检验 $s=7$ 时 $n\\geq98>72$）。',
      ],
      verify: () => {
        const pairs = n => {
          let k = 0;
          for (let a = 1; a <= n; a++) for (let b = a; b <= n; b++) if (Math.abs(S(a) + S(b) - S(n)) < 1e-9) k++;
          return k;
        };
        let first = 0, firstIrr = 0;
        for (let n = 1; n <= 120 && !(first && firstIrr); n++) {
          if (pairs(n) !== 3) continue;
          if (!first) first = n;
          if (!firstIrr && !Number.isInteger(S(n))) firstIrr = n;
        }
        return [pairs(180), first, firstIrr];
      },
    },
    {
      id: '20.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '先读一段：因为 $(\\sqrt3+\\sqrt2)^2=3+2\\sqrt3\\cdot\\sqrt2+2=5+2\\sqrt6$，所以 $\\sqrt{5+2\\sqrt6}=\\sqrt3+\\sqrt2$；同理 $(\\sqrt3-\\sqrt2)^2=5-2\\sqrt6$，而 $\\sqrt3-\\sqrt2>0$，所以 $\\sqrt{5-2\\sqrt6}=\\sqrt3-\\sqrt2$。现在设 $E=\\sqrt{x+4\\sqrt{x-4}}+\\sqrt{x-4\\sqrt{x-4}}$（$x\\geq4$）。',
      blanks: [
        { kind: 'num', label: '(1) 当 $x=6$ 时，$E=$', answer: '4' },
        { kind: 'num', label: '(2) 当 $x=13$ 时，$E=$', answer: '6' },
        { kind: 'num', label: '(3) 若 $E=10$，则 $x=$', answer: '29' },
        { kind: 'num', label: '(4) 在 $4\\leq x\\leq100$ 的整数 $x$ 中，使 $E$ 的值是整数的有几个？', answer: '12' },
      ],
      explain: [
        '思路：仿照阅读材料，把根号里的式子配成完全平方。设 $t=\\sqrt{x-4}$（$t\\geq0$），则 $x=t^2+4$。',
        '$x+4\\sqrt{x-4}=t^2+4t+4=(t+2)^2$，$x-4\\sqrt{x-4}=t^2-4t+4=(t-2)^2$。由性质 2：$E=\\lvert t+2\\rvert+\\lvert t-2\\rvert=t+2+\\lvert t-2\\rvert$。',
        '分类：$0\\leq t\\leq2$（即 $4\\leq x\\leq8$）时，$E=t+2+2-t=4$；$t>2$（即 $x>8$）时，$E=2t=2\\sqrt{x-4}$。',
        '(1) $x=6$ 在 $4\\sim8$ 之间，$E=4$。坑：直接用 $\\sqrt{x-4\\sqrt{x-4}}=\\sqrt{x-4}-2$ 会得到负数。',
        '(2) $x=13>8$，$E=2\\sqrt9=6$。',
        '(3) $E=10\\neq4$，只能 $x>8$：$2\\sqrt{x-4}=10$，$x-4=25$，$x=29$。',
        '(4) $4\\leq x\\leq8$ 时 $E=4$，整数 $x$ 有 $4,5,6,7,8$ 共 $5$ 个。$x>8$ 时 $E=2\\sqrt{x-4}=\\sqrt{4(x-4)}$ 是整数，要 $4(x-4)$ 是完全平方数，即 $x-4$ 是完全平方数。',
        '$8<x\\leq100$，$4<x-4\\leq96$，完全平方数有 $9,16,25,36,49,64,81$ 共 $7$ 个。合计 $5+7=12$ 个。',
      ],
      verify: () => {
        const E = x => S(x + 4 * S(x - 4)) + S(Math.max(0, x - 4 * S(x - 4)));
        let cnt = 0, x10 = 0;
        for (let x = 4; x <= 100; x++) {
          const e = E(x);
          if (near(e, Math.round(e))) cnt++;
          if (near(e, 10)) x10 = x;
        }
        return [Math.round(E(6) * 1e9) / 1e9, Math.round(E(13) * 1e9) / 1e9, x10, cnt];
      },
    },
    {
      id: '20.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '把两个二次根式都化成最简二次根式后，如果根号里的数相同，就说它们“根号相同”（例如 $\\sqrt8=2\\sqrt2$ 与 $\\sqrt{18}=3\\sqrt2$ 根号相同）。下面的 $n$、$m$ 都是正整数，$\\sqrt n$ 不是整数。',
      blanks: [
        { kind: 'num', label: '(1) 使 $\\sqrt{12}$ 与 $\\sqrt{12+m}$ 根号相同的 $m$，最小是', answer: '15' },
        { kind: 'nums', label: '(2) 使 $\\sqrt n$ 与 $\\sqrt{n+24}$ 根号相同的 $n$ 是（全部填出，用逗号隔开）', answer: ['3', '8'] },
        { kind: 'num', label: '(3) 只要存在某个 $n$，使 $\\sqrt n$ 与 $\\sqrt{n+m}$ 根号相同，这样的 $m$ 最小是', answer: '6' },
      ],
      explain: [
        '思路：把“根号相同”翻译成式子。设化简后根号里的数是 $s$（$s\\geq2$，不含平方因数），那么 $n=s\\cdot a^2$，$n+m=s\\cdot b^2$（$a$、$b$ 是正整数，$b>a$），于是 $m=s(b^2-a^2)=s(b-a)(b+a)$。',
        '(1) $12=3\\times2^2$，$s=3$，$a=2$。$n+m=3b^2$ 且 $b\\geq3$，最小取 $b=3$：$12+m=27$，$m=15$。',
        '(2) $24=s(b-a)(b+a)$，$s$ 是 $24$ 的不含平方因数且大于 $1$ 的因数：$s=2$、$3$ 或 $6$。',
        '$b-a$ 与 $b+a$ 的和是 $2b$，是偶数，所以它们同奇同偶；又 $b-a<b+a$。',
        '$s=2$：$(b-a)(b+a)=12=2\\times6$（$1\\times12$、$3\\times4$ 奇偶不同，舍去），$b=4$，$a=2$，$n=2\\times4=8$（$\\sqrt8=2\\sqrt2$，$\\sqrt{32}=4\\sqrt2$）。',
        '$s=3$：$(b-a)(b+a)=8=2\\times4$，$b=3$，$a=1$，$n=3$（$\\sqrt3$ 与 $\\sqrt{27}=3\\sqrt3$）。',
        '$s=6$：$(b-a)(b+a)=4$，只能 $2\\times2$，$a=0$，不是正整数，舍去。所以 $n=3$ 或 $8$。',
        '(3) $m=s(b-a)(b+a)$ 要最小：$s$ 最小是 $2$；$b-a\\geq1$，$b+a\\geq3$（$a\\geq1$，$b\\geq2$），且 $b=2$、$a=1$ 同时取到，$(b-a)(b+a)$ 最小是 $3$。所以 $m$ 最小是 $2\\times3=6$（$n=2$：$\\sqrt2$ 与 $\\sqrt8=2\\sqrt2$）。',
        '坑：以为 $m=1$ 或 $2$ 也行。$m=1$ 时 $s(b-a)(b+a)=1$ 不可能；$m=2$ 时 $s=2$，$(b-a)(b+a)=1$ 也不可能。',
      ],
      verify: () => {
        const core = n => { let k = 1; for (let d = 2; d * d <= n; d++) if (n % (d * d) === 0) k = d; return n / (k * k); };
        const same = (x, y) => core(x) === core(y) && core(x) > 1;
        let m1 = 1; while (!same(12, 12 + m1)) m1++;
        const ns = []; for (let n = 1; n <= 500; n++) if (same(n, n + 24)) ns.push(n);
        let m3 = 1; while (![...Array(500).keys()].some(n => n >= 1 && same(n, n + m3))) m3++;
        return [m1, ns, m3];
      },
    },
    {
      id: '20.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知使式子 $\\sqrt{x-a}+\\sqrt{2a-x}$ 有意义的整数 $x$ 恰好有 $3$ 个。',
      blanks: [
        { kind: 'num', label: '(1) 如果 $a$ 是整数，那么 $a=$', answer: '2' },
        { kind: 'ineq', var: 'a', label: '(2) 如果 $a$ 不是整数，$a$ 的取值范围由两段组成（每空写一段，如 $1<a\\leq2$）。较小的一段是', answer: '5/2<=a<3' },
        { kind: 'ineq', var: 'a', label: '较大的一段是', answer: '3<a<7/2' },
      ],
      explain: [
        '思路：先由有意义写出 $x$ 的范围，变成“区间里恰有 $3$ 个整数”，再按 $a$ 和 $2a$ 是不是整数分类。',
        '要 $x-a\\geq0$ 且 $2a-x\\geq0$，即 $a\\leq x\\leq2a$。这个范围不空，需要 $a\\leq2a$，即 $a\\geq0$。',
        '(1) $a$ 是整数时，$a$ 到 $2a$ 之间（含两端）的整数有 $2a-a+1=a+1$ 个。$a+1=3$，$a=2$（此时 $x=2,3,4$）。',
        '(2) $a$ 不是整数，设 $n<a<n+1$（$n$ 是非负整数），最小的整数解是 $n+1$；$2a$ 在 $2n$ 与 $2n+2$ 之间。',
        '若 $n<a<n+\\frac12$，则 $2n<2a<2n+1$，最大整数解是 $2n$，个数为 $2n-(n+1)+1=n$，要 $n=3$：$3<a<3.5$（此时 $x=4,5,6$）。',
        '若 $n+\\frac12\\leq a<n+1$，则 $2n+1\\leq2a<2n+2$，最大整数解是 $2n+1$，个数为 $n+1$，要 $n=2$：$2.5\\leq a<3$（此时 $x=3,4,5$；$a=2.5$ 时 $2a=5$ 正好取到）。',
        '所以 $a$ 的取值范围是 $2.5\\leq a<3$ 或 $3<a<3.5$。坑：把两段连成 $2.5\\leq a<3.5$，可是 $a=3$ 时 $x=3,4,5,6$ 有 $4$ 个。',
      ],
      verify: () => {
        // 以 0.01 为步长扫描 a，记录恰有 3 个整数解的 a
        const count = a => { let k = 0; for (let x = Math.ceil(a - 1e-12); x <= 2 * a + 1e-12; x++) k++; return k; };
        const good = [];
        for (let i = 0; i <= 600; i++) { const a = i / 100; if (a <= 2 * a && count(a) === 3) good.push(a); }
        const ints = good.filter(a => Number.isInteger(a));
        const rest = good.filter(a => !Number.isInteger(a));
        const fits = rest.every(a => (a >= 2.5 && a < 3) || (a > 3 && a < 3.5)) && rest.includes(2.5) && rest.includes(3.49) && rest.includes(3.01) && rest.includes(2.99);
        return [ints.length === 1 ? ints[0] : NaN, fits ? '5/2<=a<3' : '', fits ? '3<a<7/2' : ''];
      },
    },
    {
      id: '20.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '设 $E=\\sqrt{x^3+6x^2+9x}-\\sqrt{x^3-4x^2+4x}$。',
      blanks: [
        {
          kind: 'text',
          label: '(1) 只看前一个根号，$\\sqrt{x^3+6x^2+9x}$ 有意义的条件是',
          answer: '$x\\geq0$ 或 $x=-3$',
          options: ['$x\\geq0$', '$x\\geq-3$', '$x\\geq0$ 或 $x=-3$', '$x>0$'],
        },
        { kind: 'ineq', label: '(2) $E$ 有意义的条件是', answer: 'x>=0' },
        { kind: 'num', label: '(3) 当 $x=\\dfrac14$ 时，$E=$', answer: '3/4' },
        { kind: 'num', label: '(4) 若 $E=3$，则 $x=$', answer: '1' },
      ],
      explain: [
        '思路：被开方数先分解因式，提出完全平方因式；“有意义”要特别留意平方因式等于 $0$ 的孤立点；再按绝对值里的正负分段。',
        '(1) $x^3+6x^2+9x=x(x+3)^2$。$(x+3)^2\\geq0$，所以要 $x\\geq0$，或者 $(x+3)^2=0$ 即 $x=-3$（此时被开方数为 $0$）。答案是 $x\\geq0$ 或 $x=-3$。',
        '(2) 后一个：$x^3-4x^2+4x=x(x-2)^2$，有意义要 $x\\geq0$ 或 $x=2$，合起来就是 $x\\geq0$。$x=-3$ 时后一个被开方数是 $-3\\times25<0$，不行。所以 $E$ 有意义的条件是 $x\\geq0$。',
        '(3) $x\\geq0$ 时，$\\sqrt{x(x+3)^2}=\\lvert x+3\\rvert\\sqrt x=(x+3)\\sqrt x$，$\\sqrt{x(x-2)^2}=\\lvert x-2\\rvert\\sqrt x$。',
        '$0\\leq x\\leq2$ 时 $\\lvert x-2\\rvert=2-x$，$E=(x+3)\\sqrt x-(2-x)\\sqrt x=(2x+1)\\sqrt x$。$x=\\frac14$ 时 $E=\\left(\\frac12+1\\right)\\times\\frac12=\\frac34$。坑：忘了绝对值，用 $5\\sqrt x$ 算出 $\\frac52$——那是 $x\\geq2$ 时的式子。',
        '(4) 分两段：$0\\leq x\\leq2$ 时 $(2x+1)\\sqrt x=3$，$x=1$ 时 $3\\times1=3$ 成立；左边随 $x$ 增大而增大，只有这一个解。$x>2$ 时 $E=5\\sqrt x>5\\sqrt2>3$，无解。所以 $x=1$。',
      ],
      verify: () => {
        const r1 = x => x ** 3 + 6 * x * x + 9 * x, r2 = x => x ** 3 - 4 * x * x + 4 * x;
        const ok1 = [-3, -2, -1, 0, 1].filter(x => r1(x) >= 0);   // 应为 −3、0、1
        const ok2 = [-3, -1, 0, 1, 2, 3].filter(x => r1(x) >= 0 && r2(x) >= 0);  // 应为 0、1、2、3
        const E = x => S(r1(x)) - S(r2(x));
        const simp = [0, 0.3, 1.2, 2].every(x => near(E(x), (2 * x + 1) * S(x)));
        // 二分法在 [0,2] 上解 E=3，再确认 x>2 时 E>3
        let lo = 0, hi = 2;
        for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (E(m) < 3) lo = m; else hi = m; }
        const noRight = E(2.0001) > 3;
        return [
          ok1.join() === '-3,0,1' ? '$x\\geq0$ 或 $x=-3$' : '',
          ok2.join() === '0,1,2,3' ? 'x>=0' : '',
          simp ? R9(E(0.25)) : NaN,
          noRight ? Math.round(lo * 1e6) / 1e6 : NaN,
        ];
      },
    },
  ],
});
