'use strict';

// 上海数学七年级上册 · 13.1 分式及其性质
// 知识范围：分式 A/B（A、B 是整式，B 是非零整式，本章讨论分母含字母的分式）；分式有意义（分母不为 0）、分式的值为 0（分子为 0 且分母不为 0）；
//   分式的值；分式的基本性质（分子分母同乘或同除以一个值不为 0 的整式）；约分（先因式分解再约去公因式）、最简分式
// 可以使用：第 12 章因式分解全部方法；第 11 章；第 10 章；六年级上下册全部内容（分数、整除、绝对值、方程与方程组）
// 还没学：分式的乘除、加减、通分（13.2，所以不出 x+1/x 这类要做分式运算的题，也不把分式拆成“整式 + 分式”）；
//   负整数指数（13.2）；分式方程（13.3）；不等式（七年级下册，所以不问分式的值为正、为负的范围）
// 本节约定：约分的填空用 frac 判分类型，要求约到最简分式

// verify 用：原分式 N/D 和结果 n/d 相等（交叉相乘相等）就返回结果
const chk131 = (N, D, n, d) => (Poly.of(N).mul(Poly.of(d)).eq(Poly.of(D).mul(Poly.of(n))) ? `(${n})/(${d})` : null);

Content.section({
  id: 'math/sh2024/g7s1/13.1',
  title: '分式及其性质',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。约分填空用新增的 frac 判分类型（要约到最简）。第 1 轮 e01（系数化整，2 级）太易、扩展档缺 5 级，c03（繁分式有意义）只有一个环节，c04 与 e02 同为代入比值，b05 的格式示例接近答案；第 2 轮 e01 改高次约分 + 值为 0、e06 加 x^3/(x^6+1)、c01 第 (2) 问改 (a²+b²+c²)/(ab+bc+ca)、c03 加“值不可能等于哪些数”、c04 加要舍去的情况后判定整节通过。b01、b08 是概念辨析题，没有 verify' },

  intro: [
    {
      title: '分式',
      body: '两个整式 $A$、$B$ 相除，$B$ 不是零，$A\\div B$ 写成 $\\frac AB$，叫作**分式**，$A$ 是分子，$B$ 是分母。本章说的分式，分母里都含有字母；分母里没有字母的，比如 $\\frac x3$，还是整式。',
      example: '$\\frac{2}{x-1}$、$\\frac{a+b}{3a}$ 是分式。',
    },
    {
      title: '有意义和值为 0',
      body: '分母的值是 $0$ 时，分式**没有意义**；分母不是 $0$ 时，分式有意义。分式的值为 $0$，要**同时**满足两条：分子的值是 $0$，分母的值不是 $0$。',
      example: '$\\frac{x+1}{x-4}$：$x\\ne4$ 时有意义；$x=-1$ 时分子为 $0$，分母 $-5\\ne0$，分式的值为 $0$。',
      pitfall: '求“值为 0”时，算出分子为 $0$ 的值以后，一定要代回分母检查。',
    },
    {
      title: '分式的基本性质',
      body: '和分数一样：分式的分子和分母乘（或除以）同一个整式，只要这个整式的值不为 $0$，分式的值不变。',
      example: '$a\\ne0$ 时，$\\frac{a}{3b}=\\frac{a\\cdot2a}{3b\\cdot2a}=\\frac{2a^{2}}{6ab}$。',
    },
    {
      title: '约分和最简分式',
      body: '把分子、分母的公因式约去，叫约分。分子、分母是多项式时，先因式分解，再约去相同的因式。约到分子、分母没有非常数的公因式为止，这样的分式叫**最简分式**，系数也要约到互质。',
      example: '$\\frac{x^{2}-1}{x^{2}+x}=\\frac{(x+1)(x-1)}{x(x+1)}=\\frac{x-1}{x}$。',
      pitfall: '只能约去分子、分母的**因式**，不能约“项”：$\\frac{x+2}{x+3}$ 不能把 $x$ 约掉。',
    },
    {
      title: '分式的符号',
      body: '分子、分母、分式本身三个符号，改变其中两个，分式的值不变；只改变一个，分式变成相反数。',
      example: '$\\frac{-x}{-y}=\\frac xy$；$\\frac{1-x}{y-x}=\\frac{x-1}{x-y}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '13.1-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列式子中，是分式的有（　　）',
      options: ['$\\frac{1}{x}$', '$\\frac{x}{2}$', '$\\frac{a+b}{\\pi}$', '$\\frac{x^{2}}{x}$', '$\\frac{2}{x+y}$', '$\\frac{x^{2}+1}{3}$'],
      answer: [0, 3, 4],
      explain: [
        '看分母里有没有字母。',
        'A：分母是 $x$，是分式。B：分母是 $2$，是整式 $\\frac12x$。',
        'C：$\\pi$ 是一个数，不是字母，$\\frac{a+b}{\\pi}$ 是整式。',
        'D：分母是 $x$，是分式。判断时看原来的样子，不能先约分（约分后 $x$ 就不能取 $0$ 的限制丢了）。',
        'E：分母含字母，是分式。F：分母是 $3$，是整式。选 A、D、E。',
      ],
    },
    {
      id: '13.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '要使分式 $\\frac{x+3}{x^{2}-4}$ 有意义，$x$ 不能取哪些值？（全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '$x$ 不能取', answer: ['2', '-2'] },
      ],
      explain: [
        '分母 $x^{2}-4=(x+2)(x-2)$，等于 $0$ 时 $x=2$ 或 $-2$。',
        '所以 $x\\ne2$ 且 $x\\ne-2$。',
        '常见错误：只写 $x\\ne2$，忘了负数的平方也是 $4$；或者把分子的 $x=-3$ 也排除了，分子为 $0$ 不影响有没有意义。',
      ],
      verify: () => {
        const bad = [];
        for (let i = -40; i <= 40; i++) if (Poly.of('x^2-4').at({ x: F(i).div(4) }).isZero()) bad.push(F(i).div(4));
        return bad;
      },
    },
    {
      id: '13.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '分式 $\\frac{\\lvert x\\rvert-2}{x-2}$ 的值为 $0$，求 $x$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '-2' },
      ],
      explain: [
        '分子为 $0$：$\\lvert x\\rvert=2$，$x=2$ 或 $-2$。',
        '代回分母：$x=2$ 时分母 $2-2=0$，分式没有意义，舍去；$x=-2$ 时分母 $-4\\ne0$。',
        '所以 $x=-2$。常见错误：两个都写。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -40; i <= 40; i++) {
          const x = F(i).div(4);
          if (!x.sub(2).isZero() && x.abs().sub(2).isZero()) xs.push(x);
        }
        return xs.length === 1 ? xs[0] : null;
      },
    },
    {
      id: '13.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '分式 $\\frac{x^{2}-9}{x^{2}-2x-3}$ 的值为 $0$，求 $x$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '-3' },
      ],
      explain: [
        '分子为 $0$：$x^{2}=9$，$x=3$ 或 $-3$。',
        '分母 $x^{2}-2x-3=(x-3)(x+1)$：$x=3$ 时分母为 $0$，舍去；$x=-3$ 时分母 $=(-6)\\times(-2)=12\\ne0$。',
        '所以 $x=-3$。常见错误：先约分成 $\\frac{x+3}{x+1}$ 再求，虽然这里也得 $-3$，但约分前要记住 $x\\ne3$。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -40; i <= 40; i++) {
          const x = F(i).div(4);
          if (Poly.of('x^2-9').at({ x }).isZero() && !Poly.of('x^2-2x-3').at({ x }).isZero()) xs.push(x);
        }
        return xs.length === 1 ? xs[0] : null;
      },
    },
    {
      id: '13.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '约分：$\\frac{-12x^{2}y^{3}}{18xy^{5}}$。（写成最简分式；分子、分母是乘积时用括号括起来，如 $(a)/(5b)$）',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '-2x/(3y^2)' },
      ],
      explain: [
        '分子、分母的公因式：系数取最大公因数 $6$，$x$ 取 $x$，$y$ 取 $y^{3}$，公因式是 $6xy^{3}$。',
        '$\\frac{-12x^{2}y^{3}}{18xy^{5}}=\\frac{-2x\\cdot6xy^{3}}{3y^{2}\\cdot6xy^{3}}=-\\frac{2x}{3y^{2}}$。',
        '常见错误：系数只约成 $\\frac{-6}{9}$，没约到互质；或者把 $y$ 的指数相减成 $y^{2}$ 放到分子上。',
      ],
      verify: () => chk131('-12x^2y^3', '18x*y^5', '-2x', '3y^2'),
    },
    {
      id: '13.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '约分：$\\frac{a^{2}-4}{a^{2}-4a+4}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '(a+2)/(a-2)' },
      ],
      explain: [
        '先因式分解：分子 $a^{2}-4=(a+2)(a-2)$，分母 $a^{2}-4a+4=(a-2)^{2}$。',
        '约去公因式 $a-2$：$\\frac{(a+2)(a-2)}{(a-2)^{2}}=\\frac{a+2}{a-2}$。',
        '常见错误：直接约“$a^{2}$”和“$4$”，得 $\\frac{-4}{-4a}$ 之类。只能约因式，不能约项。',
      ],
      verify: () => chk131('a^2-4', 'a^2-4a+4', 'a+2', 'a-2'),
    },
    {
      id: '13.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '约分：$\\frac{6b-3a}{a^{2}-4b^{2}}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '-3/(a+2b)' },
      ],
      explain: [
        '分子 $6b-3a=3(2b-a)=-3(a-2b)$，分母 $a^{2}-4b^{2}=(a+2b)(a-2b)$。',
        '约去 $a-2b$：$\\frac{-3(a-2b)}{(a+2b)(a-2b)}=-\\frac{3}{a+2b}$。',
        '常见错误：没发现 $2b-a$ 和 $a-2b$ 互为相反数，以为不能约；或者约完丢了负号。',
      ],
      verify: () => chk131('6b-3a', 'a^2-4b^2', '-3', 'a+2b'),
    },
    {
      id: '13.1-b08',
      level: 'basic',
      type: 'choice',
      stem: '下列分式中，是最简分式的是（　　）',
      options: ['$\\frac{x+1}{x^{2}+1}$', '$\\frac{x^{2}-1}{x+1}$', '$\\frac{4ab}{6a^{2}}$', '$\\frac{x-y}{y-x}$'],
      answer: 0,
      explain: [
        'A：$x^{2}+1$ 不能分解，和 $x+1$ 没有公因式，是最简分式。',
        'B：$x^{2}-1=(x+1)(x-1)$，能约成 $x-1$。',
        'C：有公因式 $2a$，约成 $\\frac{2b}{3a}$。',
        'D：分子、分母互为相反数，等于 $-1$。选 A。常见错误：以为 $x^{2}+1$ 也能像 $x^{2}-1$ 那样分解。',
      ],
    },
    {
      id: '13.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '在括号里填上适当的整式：(1) $\\frac{x}{2y}=\\frac{(\\quad)}{6xy^{2}}$；(2) $\\frac{x^{2}-xy}{x^{2}}=\\frac{x-y}{(\\quad)}$。',
      blanks: [
        { kind: 'expr', label: '(1)', answer: '3x^2y', simplified: true },
        { kind: 'expr', label: '(2)', answer: 'x', simplified: true },
      ],
      explain: [
        '(1) 分母从 $2y$ 变成 $6xy^{2}$，乘了 $3xy$，分子也要乘 $3xy$：$x\\cdot3xy=3x^{2}y$。',
        '(2) 分子 $x^{2}-xy=x(x-y)$ 变成 $x-y$，除以了 $x$，分母也除以 $x$：$x^{2}\\div x=x$。',
        '常见错误：(1) 只给分子乘 $3$ 或 $3y$；(2) 填成 $x^{2}$。',
      ],
      verify: () => {
        const m = Poly.of('6x*y^2');
        // (1) 分子 = x · (6xy² ÷ 2y)
        const k1 = Poly.of('3x*y');
        const ok1 = Poly.of('2y').mul(k1).eq(m);
        const ok2 = Poly.of('x^2-x*y').eq(Poly.of('x-y').mul(Poly.of('x')));
        return [ok1 ? String(Poly.of('x').mul(k1)) : null, ok2 ? 'x' : null];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '13.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '(1) 约分：$\\frac{x^{4}-5x^{2}+4}{x^{3}+x^{2}-4x-4}$；(2) 当 $x$ 取什么值时，这个分式的值为 $0$？（有几个就填几个，用逗号隔开）',
      blanks: [
        { kind: 'frac', label: '(1)', answer: 'x-1' },
        { kind: 'nums', label: '(2) $x=$', answer: ['1'] },
      ],
      explain: [
        '(1) 分子把 $x^{2}$ 看成整体十字相乘：$x^{4}-5x^{2}+4=(x^{2}-1)(x^{2}-4)=(x+1)(x-1)(x+2)(x-2)$。',
        '分母分组：$x^{2}(x+1)-4(x+1)=(x+1)(x^{2}-4)=(x+1)(x+2)(x-2)$。',
        '约去 $(x+1)(x+2)(x-2)$，结果是 $x-1$（分母约尽，结果是整式），但原分式要求 $x\\ne-1$、$x\\ne\\pm2$。',
        '(2) 分子为 $0$：$x=\\pm1$、$\\pm2$；分母为 $0$：$x=-1$、$\\pm2$。去掉使分母为 $0$ 的，只剩 $x=1$。',
        '常见错误：看约分后的 $x-1$，答“$x=1$”虽然对了，但如果只看分子会答成四个值；或者分母只分出 $(x+1)(x^{2}-4)$ 就停住，约分不彻底。',
      ],
      verify: () => {
        const N = Poly.of('x^4-5x^2+4');
        const D = Poly.of('x^3+x^2-4x-4');
        const zeros = [];
        for (let i = -40; i <= 40; i++) {
          const x = F(i).div(4);
          if (N.at({ x }).isZero() && !D.at({ x }).isZero()) zeros.push(x);
        }
        return [N.eq(D.mul(Poly.of('x-1'))) ? 'x-1' : null, zeros];
      },
    },
    {
      id: '13.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\frac{x}{2}=\\frac{y}{3}=\\frac{z}{4}\\ne0$，求 $\\frac{x+y-z}{2x-y+z}$ 的值。',
      blanks: [
        { kind: 'num', label: '值是', answer: '1/5' },
      ],
      explain: [
        '设 $\\frac x2=\\frac y3=\\frac z4=k$（$k\\ne0$），则 $x=2k$，$y=3k$，$z=4k$。',
        '分子 $=2k+3k-4k=k$，分母 $=4k-3k+4k=5k$。',
        '$\\frac{k}{5k}=\\frac15$（$k\\ne0$，可以约去）。常见错误：直接取 $x=2,y=3,z=4$ 也能算对，但要说明结果和 $k$ 无关。',
      ],
      verify: () => {
        const vals = [1, -2, F('1/3')].map(k => {
          const K = F(k);
          const x = K.mul(2);
          const y = K.mul(3);
          const z = K.mul(4);
          return x.add(y).sub(z).div(x.mul(2).sub(y).add(z));
        });
        return vals.every(v => v.eq(vals[0])) ? vals[0] : null;
      },
    },
    {
      id: '13.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '分式 $\\frac{x^{2}-1}{\\lvert x\\rvert-1}$ 的值为 $3$，求 $x$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$x=$', answer: ['2', '-2'] },
      ],
      explain: [
        '先看有意义：$\\lvert x\\rvert\\ne1$，即 $x\\ne\\pm1$。按 $x$ 的正负去掉绝对值：',
        '$x\\ge0$ 时，分母是 $x-1$，$\\frac{(x+1)(x-1)}{x-1}=x+1$，$x+1=3$，$x=2$，符合 $x\\ge0$。',
        '$x<0$ 时，分母是 $-x-1=-(x+1)$，$\\frac{(x+1)(x-1)}{-(x+1)}=-(x-1)=1-x$，$1-x=3$，$x=-2$，符合 $x<0$。',
        '所以 $x=2$ 或 $-2$。常见错误：只按 $x\\ge0$ 算，漏掉 $x=-2$；或者把 $\\lvert x\\rvert-1$ 当成 $x-1$ 直接约分。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -80; i <= 80; i++) {
          const x = F(i).div(8);
          const d = x.abs().sub(1);
          if (!d.isZero() && x.pow(2).sub(1).div(d).eq(F(3))) xs.push(x);
        }
        return xs;
      },
    },
    {
      id: '13.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '先化简 $\\frac{x^{2}+2x-3}{x^{2}-1}$，再从 $-1$、$0$、$1$、$2$ 中选一个合适的数代入求值。(1) 化简结果；(2) 可以选的 $x$ 有哪些？（全部填出，用逗号隔开）',
      blanks: [
        { kind: 'frac', label: '(1)', answer: '(x+3)/(x+1)' },
        { kind: 'nums', label: '(2) 可以选', answer: ['0', '2'] },
      ],
      explain: [
        '(1) 分子 $x^{2}+2x-3=(x+3)(x-1)$，分母 $x^{2}-1=(x+1)(x-1)$，约去 $x-1$：$\\frac{x+3}{x+1}$。',
        '(2) 关键：能不能选，要看**原来的**分式。原分母 $x^{2}-1\\ne0$，$x\\ne1$ 且 $x\\ne-1$。',
        '所以只能选 $0$ 或 $2$（值分别是 $3$ 和 $\\frac53$）。',
        '常见错误：看化简后的分母 $x+1$，以为 $x=1$ 也能选。约分时约掉的 $x-1$ 同样不能为 $0$。',
      ],
      verify: () => {
        const ok = [-1, 0, 1, 2].filter(x => !Poly.of('x^2-1').at({ x: F(x) }).isZero());
        return [chk131('x^2+2x-3', 'x^2-1', 'x+3', 'x+1'), ok];
      },
    },
    {
      id: '13.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '分式 $\\frac{x^{2}+ax+b}{x^{2}-3x+2}$ 约分后的结果是 $\\frac{x+3}{x-1}$，求 $a$、$b$。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '1' },
        { kind: 'num', label: '$b=$', answer: '-6' },
      ],
      explain: [
        '分母 $x^{2}-3x+2=(x-1)(x-2)$。约分后分母只剩 $x-1$，说明约去的公因式是 $x-2$。',
        '所以分子 $=(x+3)(x-2)=x^{2}+x-6$（分子、分母都是首项系数为 $1$ 的二次式，没有别的倍数）。',
        '对照：$a=1$，$b=-6$。',
        '常见错误：以为约去的是 $x-1$，得分子 $(x+3)(x-1)$；那样约分后分母会是 $x-2$，和题目不符。',
      ],
      verify: () => {
        for (let a = -10; a <= 10; a++) {
          for (let b = -20; b <= 20; b++) {
            const N = Poly.of('x^2').add(Poly.of('x').scale(a)).add(b);
            // 约分后等于 (x+3)/(x−1)：N·(x−1) = (x²−3x+2)(x+3)
            if (N.mul(Poly.of('x-1')).eq(Poly.of('x^2-3x+2').mul(Poly.of('x+3')))) return [a, b];
          }
        }
        return null;
      },
    },
    {
      id: '13.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x^{2}-3x+1=0$。求：(1) $\\frac{x^{2}}{x^{4}+x^{2}+1}$ 的值；(2) $\\frac{x^{3}}{x^{6}+1}$ 的值。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '1/8' },
        { kind: 'num', label: '(2)', answer: '1/18' },
      ],
      explain: [
        '$x$ 求不出具体值。思路：把分母因式分解，再用条件把每个因式化成 $x$ 的倍数，最后约分。由条件 $x^{2}+1=3x$，且 $x\\ne0$（$x=0$ 不满足条件）。',
        '(1) 12.2 学过：$x^{4}+x^{2}+1=(x^{2}+1)^{2}-x^{2}=(x^{2}+x+1)(x^{2}-x+1)$。$x^{2}+x+1=4x$，$x^{2}-x+1=2x$，分母 $=8x^{2}$，原式 $=\\frac{x^{2}}{8x^{2}}=\\frac18$。',
        '(2) 11.1 乘过 $(m+n)(m^{2}-mn+n^{2})=m^{3}+n^{3}$，取 $m=x^{2}$、$n=1$：$x^{6}+1=(x^{2}+1)(x^{4}-x^{2}+1)$。',
        '$x^{4}-x^{2}+1=(x^{2}+1)^{2}-3x^{2}=9x^{2}-3x^{2}=6x^{2}$，所以 $x^{6}+1=3x\\cdot6x^{2}=18x^{3}$，原式 $=\\frac{x^{3}}{18x^{3}}=\\frac{1}{18}$。',
        '常见错误：把 $x^{2}=3x-1$ 直接代进高次项，算得很繁；(2) 想不到 $x^{6}+1$ 能分解。',
      ],
      verify: () => {
        // 在 x²−3x+1=0 下 x² ≡ 3x−1，x³ ≡ 8x−3：分母的余式正好是分子余式的 8 倍、18 倍
        const r1 = Poly.of('x^4+x^2+1').sub(Poly.of('x^2-3x+1').mul(Poly.of('x^2+3x+9')));
        const r2 = Poly.of('x^6+1').sub(Poly.of('x^2-3x+1').mul(Poly.of('x^4+3x^3+8x^2+21x+55')));
        const ok1 = r1.eq(Poly.of('3x-1').scale(8));
        const ok2 = r2.eq(Poly.of('8x-3').scale(18));
        return [ok1 ? F(1).div(8) : null, ok2 ? F(1).div(18) : null];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '13.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '$a$、$b$、$c$ 都不为 $0$，且 $\\frac{a+b}{c}=\\frac{b+c}{a}=\\frac{c+a}{b}=k$。(1) 求 $k$ 的所有可能值；(2) 求 $\\frac{a^{2}+b^{2}+c^{2}}{ab+bc+ca}$ 的所有可能值。（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $k=$', answer: ['2', '-1'] },
        { kind: 'nums', label: '(2)', answer: ['1', '-2'] },
      ],
      explain: [
        '把三个等式写成乘法：$a+b=kc$，$b+c=ka$，$c+a=kb$。',
        '三式相加：$2(a+b+c)=k(a+b+c)$。这里不能直接两边除以 $a+b+c$，要分两种情况。',
        '若 $a+b+c\\ne0$，则 $k=2$；若 $a+b+c=0$，则 $a+b=-c$，$k=\\frac{-c}{c}=-1$。两种都能取到（$a=b=c=1$；$a=b=1$，$c=-2$），所以 $k=2$ 或 $-1$。',
        '(2) $k=2$ 时：$a+b=2c$，$b+c=2a$，两式相减 $a-c=2c-2a$，$a=c$；同理 $b=c$。所以 $a=b=c$，原式 $=\\frac{3c^{2}}{3c^{2}}=1$。',
        '$k=-1$ 时：$a+b+c=0$，平方得 $a^{2}+b^{2}+c^{2}+2(ab+bc+ca)=0$，即 $a^{2}+b^{2}+c^{2}=-2(ab+bc+ca)$。',
        '还要说明分母 $ab+bc+ca\\ne0$：如果它是 $0$，那么 $a^{2}+b^{2}+c^{2}=0$，$a=b=c=0$，和条件矛盾。所以原式 $=-2$。',
        '易错：只得到 $k=2$；(2) 在 $k=-1$ 时不说明分母不为 $0$。',
      ],
      verify: () => {
        const ks = new Set();
        const vs = new Set();
        const r = [-4, -3, -2, -1, 1, 2, 3, 4, 5];
        for (const a of r) {
          for (const b of r) {
            for (const c of r) {
              const k1 = F(a + b).div(c);
              if (k1.eq(F(b + c).div(a)) && k1.eq(F(c + a).div(b))) {
                ks.add(k1.toString());
                vs.add(F(a * a + b * b + c * c).div(a * b + b * c + c * a).toString());
              }
            }
          }
        }
        return [[...ks], [...vs]];
      },
    },
    {
      id: '13.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '对于分式 $\\frac{x^{2}-(a+2)x+2a}{x^{2}-x-2}$：(1) 要使存在 $x$ 让分式的值为 $0$，$a$ 不能取哪些值？（全部填出，用逗号隔开）(2) 当 $a$ 取什么值时，无论 $x$ 取哪个使分式有意义的数，分式的值都相同？(3) 当 $a=2$ 时，把分式约分。',
      blanks: [
        { kind: 'nums', label: '(1) $a$ 不能取', answer: ['2', '-1'] },
        { kind: 'num', label: '(2) $a=$', answer: '-1' },
        { kind: 'frac', label: '(3)', answer: '(x-2)/(x+1)' },
      ],
      explain: [
        '先分解：分子 $x^{2}-(a+2)x+2a=(x-2)(x-a)$（十字相乘：$-2$ 与 $-a$ 的积是 $2a$，和是 $-(a+2)$），分母 $x^{2}-x-2=(x-2)(x+1)$。',
        '(1) 分子为 $0$：$x=2$ 或 $x=a$。但 $x=2$ 时分母为 $0$，不行；所以只能靠 $x=a$，并且要 $a\\ne2$、$a\\ne-1$（否则分母为 $0$）。',
        '所以 $a$ 不能取 $2$ 和 $-1$。',
        '(2) 有意义时约去 $x-2$：分式 $=\\frac{x-a}{x+1}$。要它不随 $x$ 变化，分子、分母只能相同，$x-a=x+1$，$a=-1$，这时分式的值恒为 $1$。',
        '(3) $a=2$：$\\frac{(x-2)^{2}}{(x-2)(x+1)}=\\frac{x-2}{x+1}$。',
        '易错：(1) 把 $x=2$ 也当成使值为 $0$ 的解；(2) 以为 $a=2$ 时能约成常数。',
      ],
      verify: () => {
        const bad = [];
        let constA = null;
        for (let a = -10; a <= 10; a++) {
          const N = Poly.of('x^2').sub(Poly.of('x').scale(a + 2)).add(2 * a);
          const D = Poly.of('x^2-x-2');
          let zero = false;
          const vals = new Set();
          for (let i = -80; i <= 80; i++) {
            const x = F(i).div(4);
            if (D.at({ x }).isZero()) continue;
            const v = N.at({ x }).div(D.at({ x }));
            if (v.isZero()) zero = true;
            vals.add(v.toString());
          }
          if (!zero) bad.push(a);
          if (vals.size === 1) constA = a;
        }
        return [bad, constA, chk131('x^2-4x+4', 'x^2-x-2', 'x-2', 'x+1')];
      },
    },
    {
      id: '13.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '对于繁分式 $P=\\frac{1}{2-\\frac{1}{1-\\frac{1}{x}}}$：(1) 要使 $P$ 有意义，$x$ 不能取哪些值？(2) $P$ 的值不可能等于哪些数？（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $x$ 不能取', answer: ['0', '1', '2'] },
        { kind: 'nums', label: '(2) $P$ 不可能等于', answer: ['0', '1/2', '1'] },
      ],
      explain: [
        '(1) 每一层的分母都不能为 $0$，从里往外看：$x\\ne0$；$1-\\frac1x\\ne0$，即 $\\frac1x\\ne1$，$x\\ne1$；$2-\\frac{1}{1-\\frac1x}\\ne0$，即 $\\frac{1}{1-\\frac1x}\\ne2$，所以 $1-\\frac1x\\ne\\frac12$，$\\frac1x\\ne\\frac12$，$x\\ne2$。',
        '(2) 关键：从里往外追踪每一层**能取到哪些值**。设 $u=\\frac1x$：$x$ 取遍不为 $0$ 的数，$u$ 也取遍不为 $0$ 的数（一个数的倒数不会是 $0$）。',
        '$v=1-u$：$u\\ne0$，所以 $v\\ne1$；又要 $v\\ne0$。',
        '$w=\\frac1v$：$v\\ne1$，所以 $w\\ne1$；$w$ 也不会是 $0$。',
        '$t=2-w$：$w\\ne0$ 得 $t\\ne2$，$w\\ne1$ 得 $t\\ne1$；又要 $t\\ne0$。',
        '$P=\\frac1t$：$P\\ne0$；$t\\ne2$ 得 $P\\ne\\frac12$；$t\\ne1$ 得 $P\\ne1$。其余的数都能取到（倒着一层层往回推都有对应的 $x$），所以 $P$ 不可能等于 $0$、$\\frac12$、$1$。',
        '易错：只想到 $P\\ne0$；或者不追踪“不能取”的值，漏掉 $\\frac12$、$1$。',
      ],
      verify: () => {
        const bad = [];
        const vals = new Set();
        for (let i = -400; i <= 400; i++) {
          const x = F(i).div(20);
          if (x.isZero()) { bad.push(x); continue; }
          const m = F(1).sub(F(1).div(x));
          if (m.isZero()) { bad.push(x); continue; }
          const t = F(2).sub(F(1).div(m));
          if (t.isZero()) { bad.push(x); continue; }
          vals.add(F(1).div(t).toString());
        }
        // 候选：在 −3 到 3 之间以 1/4 为步长的数里，哪些从未出现（并检验 0、1/2、1 确实取不到，其他附近的数能取到）
        const never = [F(0), F('1/2'), F(1)].filter(v => !vals.has(v.toString()));
        return [bad, never];
      },
    },
    {
      id: '13.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $x^{2}-5xy+6y^{2}=0$，且 $xy\\ne0$。(1) 求 $\\frac{x^{2}+y^{2}}{xy}$ 的所有可能值；(2) 求 $\\frac{x^{2}-9y^{2}}{x^{2}+xy-6y^{2}}$ 的所有可能值。（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1)', answer: ['5/2', '10/3'] },
        { kind: 'nums', label: '(2)', answer: ['0'] },
      ],
      explain: [
        '十字相乘：$x^{2}-5xy+6y^{2}=(x-2y)(x-3y)=0$，所以 $x=2y$ 或 $x=3y$。',
        '(1) $x=2y$：$\\frac{5y^{2}}{2y^{2}}=\\frac52$；$x=3y$：$\\frac{10y^{2}}{3y^{2}}=\\frac{10}{3}$（$y\\ne0$，约去 $y^{2}$）。',
        '(2) 先看分式有没有意义：分母 $x^{2}+xy-6y^{2}=(x+3y)(x-2y)$。$x=2y$ 时分母为 $0$，分式没有意义，这种情况要舍去。',
        '只剩 $x=3y$：分子 $x^{2}-9y^{2}=(x+3y)(x-3y)=0$，分母 $=6y\\cdot y=6y^{2}\\ne0$，所以值为 $0$。',
        '（也可以先约分：$\\frac{(x+3y)(x-3y)}{(x+3y)(x-2y)}=\\frac{x-3y}{x-2y}$，再分两种情况。）',
        '易错：(2) 把 $x=2y$ 也代进去，得到“$\\frac{-5y^{2}}{0}$”还硬算；或者只看约分后的式子，不检查原分母。',
      ],
      verify: () => {
        const r1 = new Set();
        const r2 = new Set();
        for (const y of [1, -2, 3]) {
          for (let i = -40; i <= 40; i++) {
            const x = F(i).div(2);
            const Y = F(y);
            if (x.isZero() || !Poly.of('x^2-5x*y+6y^2').at({ x, y: Y }).isZero()) continue;
            r1.add(x.pow(2).add(Y.pow(2)).div(x.mul(Y)).toString());
            const d = Poly.of('x^2+x*y-6y^2').at({ x, y: Y });
            if (!d.isZero()) r2.add(Poly.of('x^2-9y^2').at({ x, y: Y }).div(d).toString());
          }
        }
        return [[...r1], [...r2]];
      },
    },
    {
      id: '13.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '分式 $M=\\frac{x^{3}-2x^{2}-x+2}{x^{3}-3x^{2}+2x}$。(1) 把 $M$ 约分；(2) $x$ 是整数，且 $M$ 的值是整数，求 $x$ 的所有可能值（全部填出，用逗号隔开）；(3) $M$ 的值能等于 $\\frac32$ 吗？',
      blanks: [
        { kind: 'frac', label: '(1)', answer: '(x+1)/x' },
        { kind: 'nums', label: '(2) $x=$', answer: ['-1'] },
        { kind: 'text', label: '(3)', answer: '不能', options: ['能', '不能'] },
      ],
      explain: [
        '(1) 分子分组：$x^{2}(x-2)-(x-2)=(x-2)(x+1)(x-1)$；分母 $x(x^{2}-3x+2)=x(x-1)(x-2)$。',
        '约去 $(x-1)(x-2)$：$M=\\frac{x+1}{x}$。但要记住原分式有意义的条件：$x\\ne0$，$x\\ne1$，$x\\ne2$。',
        '(2) $\\frac{x+1}{x}$ 是整数，说明 $x$ 能整除 $x+1$；而 $x$ 能整除 $x$，所以 $x$ 能整除它们的差 $1$，$x=1$ 或 $-1$。',
        '$x=1$ 时原分式没有意义，舍去；$x=-1$ 时 $M=0$，是整数。所以只有 $x=-1$。',
        '(3) $\\frac{x+1}{x}=\\frac32$，说明 $x+1$ 是 $x$ 的 $\\frac32$ 倍：$x+1=\\frac32x$，多出来的 $1$ 正好是 $\\frac12x$，所以 $x=2$。但 $x=2$ 时原分式没有意义，所以 $M$ 不能等于 $\\frac32$。',
        '关键：约分以后，被约掉的因式不为 $0$ 的条件仍然有效。易错：(2) 把 $x=1$ 也算上；(3) 回答“能，$x=2$”。',
      ],
      verify: () => {
        const N = Poly.of('x^3-2x^2-x+2');
        const D = Poly.of('x^3-3x^2+2x');
        const ints = [];
        let can = false;
        for (let x = -50; x <= 50; x++) {
          const d = D.at({ x: F(x) });
          if (d.isZero()) continue;
          const v = N.at({ x: F(x) }).div(d);
          if (v.d === 1n) ints.push(x);
        }
        for (let i = -200; i <= 200; i++) {
          const x = F(i).div(4);
          const d = D.at({ x });
          if (!d.isZero() && N.at({ x }).div(d).eq(F('3/2'))) can = true;
        }
        return [chk131('x^3-2x^2-x+2', 'x^3-3x^2+2x', 'x+1', 'x'), ints, can ? '能' : '不能'];
      },
    },
  ],
});
