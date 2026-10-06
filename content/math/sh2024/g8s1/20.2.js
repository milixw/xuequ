'use strict';

// 上海数学八年级上册 · 20.2 二次根式的运算
// 知识范围：同类二次根式（化成最简后被开方数相同）及合并；二次根式的乘法 √a·√b=√(ab)、除法 √a/√b=√(a/b)；分母有理化、有理化因式；
//   含二次根式的混合运算（实数的运算律、乘法公式照样适用）；整体代入求值；系数含二次根式的一元一次方程和不等式（除以负的无理数要变号）；应用
// 可以使用：20.1 全部（有意义的条件、四条性质、化简、最简二次根式），六、七年级全部，19 章实数（估算、整数部分与小数部分）
// 还没学：一元二次方程及其解法、求根公式（第 21 章，本节不出要解二次方程的题，整数范围内逐个检验的除外）；勾股定理（第 22 章）；函数与坐标系
// 本节约定：数值结果的填空要求最简形式（simplest：分母不含根号、同类二次根式已合并）；解集含无理数时用按钮选项

const S202 = Math.sqrt;
const near202 = (x, y) => Math.abs(x - y) < 1e-9;
const R202 = v => Math.round(v * 1e9) / 1e9;

Content.section({
  id: 'math/sh2024/g8s1/20.2',
  title: '二次根式的运算',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。数值结果用 simplest 判分，解集含无理数的用按钮选项。第 1 轮 c03 原为 (√3+√2)⁶ 的整数部分（网上流传的竞赛原题），c01 的 0～20 能穷举，e05 格式提示与答案不符，扩展档缺 5 级；第 2 轮 c03 换成 (√6+√5)⁴，c01 范围放大到 0～200 并改问值为有理数、为 k√2 的 x，e06 加四次式降次和 x²+9/x²，复核指出 c03 直接展开即可、e05 示例泄露答案形式；第 3 轮 c03 加 8 次方的整数部分、换示例，判定整节通过' },

  intro: [
    {
      title: '同类二次根式与加减',
      body: '几个二次根式化成最简二次根式后，如果**被开方数相同**，就叫作**同类二次根式**。二次根式相加减，先把每个根式化成最简，再像合并同类项那样合并同类二次根式；不是同类的不能合并。',
      example: '$\\sqrt{20}=2\\sqrt5$，$\\sqrt{\\dfrac15}=\\dfrac{\\sqrt5}{5}$，它们是同类二次根式；$\\sqrt{50}+\\sqrt{32}=5\\sqrt2+4\\sqrt2=9\\sqrt2$。',
      pitfall: '判断是不是同类，一定要先化简：$\\sqrt{20}$ 和 $\\sqrt5$ 外表不同，却是同类；$\\sqrt2+\\sqrt3$ 不能写成 $\\sqrt5$。',
    },
    {
      title: '乘法和除法',
      body: '把性质 3、性质 4 反过来用，就是乘除法则：**$\\sqrt a\\cdot\\sqrt b=\\sqrt{ab}$**（$a\\geq0$，$b\\geq0$），**$\\dfrac{\\sqrt a}{\\sqrt b}=\\sqrt{\\dfrac ab}$**（$a\\geq0$，$b>0$）。根号外的系数相乘除，根号里的数相乘除，最后化成最简。',
      example: '$\\sqrt6\\times\\sqrt{10}=\\sqrt{60}=2\\sqrt{15}$；$\\sqrt{24}\\div\\sqrt3=\\sqrt8=2\\sqrt2$。',
    },
    {
      title: '分母有理化',
      body: '把分母中的根号化去叫作**分母有理化**：分子、分母同乘一个适当的式子，使分母不含根号。两个含二次根式的非零代数式相乘，积不含二次根式，就说它们**互为有理化因式**，比如 $\\sqrt a$ 与 $\\sqrt a$，$\\sqrt x+\\sqrt y$ 与 $\\sqrt x-\\sqrt y$（用平方差公式）。',
      example: '$\\dfrac{1}{\\sqrt3}=\\dfrac{\\sqrt3}{3}$；$\\dfrac{1}{\\sqrt6+\\sqrt5}=\\dfrac{\\sqrt6-\\sqrt5}{(\\sqrt6+\\sqrt5)(\\sqrt6-\\sqrt5)}=\\sqrt6-\\sqrt5$。',
    },
    {
      title: '混合运算和整体代入',
      body: '实数的运算律、运算顺序和乘法公式，在二次根式运算中同样适用。已知 $x$ 是一个含根号的数、要求一个多项式的值时，先把条件变形（比如移项后两边平方），再整体代入，比直接代入简便。',
      example: '已知 $x=\\sqrt3+1$，则 $x-1=\\sqrt3$，两边平方得 $x^2-2x+1=3$，所以 $x^2-2x=2$。',
    },
    {
      title: '系数含根号的方程和不等式',
      body: '解法和一元一次方程、不等式完全一样：移项、合并，再两边同除以 $x$ 的系数，结果分母有理化。解不等式时，要先判断系数的正负，**除以负数要改变不等号的方向**。',
      example: '$(1-\\sqrt2)x<1$：因为 $1-\\sqrt2<0$，所以 $x>\\dfrac{1}{1-\\sqrt2}=\\dfrac{1+\\sqrt2}{(1-\\sqrt2)(1+\\sqrt2)}=-1-\\sqrt2$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '20.2-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列二次根式中，与 $\\sqrt3$ 是同类二次根式的有（　　）',
      options: ['$\\sqrt{12}$', '$\\sqrt{18}$', '$\\sqrt{0.75}$', '$\\sqrt{\\dfrac23}$', '$\\sqrt{48a^2}$（$a\\neq0$）', '$\\sqrt{30}$'],
      answer: [0, 2, 4],
      explain: [
        '先化成最简二次根式，再看被开方数是不是 $3$。',
        'A：$\\sqrt{12}=2\\sqrt3$，是。B：$\\sqrt{18}=3\\sqrt2$，被开方数是 $2$，不是。坑：$18$ 是 $3$ 的倍数，但化简后根号里剩下的是 $2$。',
        'C：$\\sqrt{0.75}=\\sqrt{\\frac34}=\\frac{\\sqrt3}{2}$，是。D：$\\sqrt{\\frac23}=\\sqrt{\\frac69}=\\frac{\\sqrt6}{3}$，不是。',
        'E：$\\sqrt{48a^2}=4\\lvert a\\rvert\\sqrt3$，是。F：$30=2\\times3\\times5$，$\\sqrt{30}$ 已是最简，被开方数是 $30$，不是。所以选 A、C、E。',
      ],
      verify: () => {
        // 化成 k√m（m 不含平方因数），看 m 是否为 3；分数 p/q 先化成 √(pq)/q
        const core = n => { for (let d = 2; d * d <= n; d++) while (n % (d * d) === 0) n /= d * d; return n; };
        const radicands = [12, 18, 3 * 4, 2 * 3, 48, 30];  // 0.75=3/4→√(3·4)/4，2/3→√6/3，48a²→48
        return radicands.map((n, i) => (core(n) === 3 ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '20.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算（结果化成最简二次根式）。',
      blanks: [
        { kind: 'real', label: '(1) $\\sqrt{18}-\\sqrt8+\\sqrt{\\dfrac12}=$', answer: '3√2/2', simplest: true },
        { kind: 'real', label: '(2) $\\sqrt{48}-9\\sqrt{\\dfrac13}+\\sqrt{0.12}=$', answer: '6√3/5', simplest: true },
      ],
      explain: [
        '(1) $\\sqrt{18}=3\\sqrt2$，$\\sqrt8=2\\sqrt2$，$\\sqrt{\\frac12}=\\frac{\\sqrt2}{2}$。原式 $=3\\sqrt2-2\\sqrt2+\\frac12\\sqrt2=\\frac32\\sqrt2=\\frac{3\\sqrt2}{2}$。',
        '(2) $\\sqrt{48}=4\\sqrt3$；$9\\sqrt{\\frac13}=9\\times\\frac{\\sqrt3}{3}=3\\sqrt3$；$\\sqrt{0.12}=\\sqrt{\\frac{12}{100}}=\\frac{2\\sqrt3}{10}=\\frac{\\sqrt3}{5}$。',
        '原式 $=4\\sqrt3-3\\sqrt3+\\frac15\\sqrt3=\\frac65\\sqrt3=\\frac{6\\sqrt3}{5}$。坑：把 $\\sqrt{\\frac13}$ 写成 $\\frac13$ 或 $\\sqrt3$，或者没化简 $\\sqrt{0.12}$ 就以为它和 $\\sqrt3$ 不是同类。',
      ],
      verify: () => [S202(18) - S202(8) + S202(1 / 2), S202(48) - 9 * S202(1 / 3) + S202(0.12)],
    },
    {
      id: '20.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '计算（结果化成最简形式）。',
      blanks: [
        { kind: 'real', label: '(1) $\\sqrt{14}\\times\\sqrt{35}=$', answer: '7√10', simplest: true },
        { kind: 'real', label: '(2) $\\sqrt{\\dfrac23}\\div\\sqrt{\\dfrac{8}{27}}=$', answer: '3/2', simplest: true },
        { kind: 'real', label: '(3) $(-3\\sqrt6)\\times2\\sqrt{15}=$', answer: '-18√10', simplest: true },
      ],
      explain: [
        '(1) $\\sqrt{14}\\times\\sqrt{35}=\\sqrt{14\\times35}=\\sqrt{2\\times7\\times5\\times7}=\\sqrt{7^2\\times10}=7\\sqrt{10}$。先分解再相乘，不用算出 $490$。',
        '(2) $\\sqrt{\\frac23}\\div\\sqrt{\\frac8{27}}=\\sqrt{\\frac23\\times\\frac{27}{8}}=\\sqrt{\\frac94}=\\frac32$。坑：除法变乘法时忘了把除数颠倒。',
        '(3) 系数和系数相乘，根号和根号相乘：$(-3\\times2)\\sqrt{6\\times15}=-6\\sqrt{90}=-6\\times3\\sqrt{10}=-18\\sqrt{10}$。坑：$\\sqrt{90}$ 化简后还要和前面的 $-6$ 相乘。',
      ],
      verify: () => [S202(14) * S202(35), R202(S202(2 / 3) / S202(8 / 27)), -3 * S202(6) * 2 * S202(15)],
    },
    {
      id: '20.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '把下列各式分母有理化（结果化成最简形式）。',
      blanks: [
        { kind: 'real', label: '(1) $\\dfrac{3}{\\sqrt6}=$', answer: '√6/2', simplest: true },
        { kind: 'real', label: '(2) $\\dfrac{4}{\\sqrt7-\\sqrt3}=$', answer: '√7+√3', simplest: true },
        { kind: 'real', label: '(3) $\\dfrac{\\sqrt5}{\\sqrt5+2}=$', answer: '5-2√5', simplest: true },
      ],
      explain: [
        '(1) 分子分母同乘 $\\sqrt6$：$\\frac{3\\sqrt6}{6}=\\frac{\\sqrt6}{2}$。坑：停在 $\\frac{3\\sqrt6}{6}$ 没有约分。',
        '(2) $\\sqrt7-\\sqrt3$ 的有理化因式是 $\\sqrt7+\\sqrt3$：$\\frac{4(\\sqrt7+\\sqrt3)}{(\\sqrt7)^2-(\\sqrt3)^2}=\\frac{4(\\sqrt7+\\sqrt3)}{4}=\\sqrt7+\\sqrt3$。',
        '(3) 分子分母同乘 $\\sqrt5-2$：分母 $(\\sqrt5)^2-2^2=1$，分子 $\\sqrt5(\\sqrt5-2)=5-2\\sqrt5$，结果是 $5-2\\sqrt5$。坑：分子 $\\sqrt5\\times\\sqrt5$ 写成 $\\sqrt5$。',
      ],
      verify: () => [3 / S202(6), 4 / (S202(7) - S202(3)), S202(5) / (S202(5) + 2)],
    },
    {
      id: '20.2-b05',
      level: 'basic',
      type: 'multi',
      stem: '下列各式中，是 $\\sqrt x-2$（$x\\geq0$ 且 $x\\neq4$）的有理化因式的有（　　）',
      options: ['$\\sqrt x+2$', '$2-\\sqrt x$', '$-\\sqrt x-2$', '$\\sqrt x-2$', '$\\sqrt x$'],
      answer: [0, 2],
      explain: [
        '逐个和 $\\sqrt x-2$ 相乘，看积里还有没有根号。',
        'A：$(\\sqrt x-2)(\\sqrt x+2)=x-4$，不含根号，是。',
        'B：$(\\sqrt x-2)(2-\\sqrt x)=-(\\sqrt x-2)^2=-(x-4\\sqrt x+4)$，含 $\\sqrt x$，不是。坑：$2-\\sqrt x$ 只是把 $\\sqrt x-2$ 变了号，相乘是完全平方，不是平方差。',
        'C：$(\\sqrt x-2)(-\\sqrt x-2)=-(\\sqrt x-2)(\\sqrt x+2)=-(x-4)$，不含根号，是。',
        'D：$(\\sqrt x-2)^2=x-4\\sqrt x+4$，不是。E：$(\\sqrt x-2)\\sqrt x=x-2\\sqrt x$，不是。所以选 A、C。',
      ],
      verify: () => {
        // 积写成 p + q√x，q=0 才不含根号；每个选项记成 [常数, √x 的系数]
        const opts = [[2, 1], [2, -1], [-2, -1], [-2, 1], [0, 1]];
        return opts.map(([c, k], i) => {
          const q = -2 * k + c;  // (√x−2)(k√x+c) 中 √x 的系数
          return q === 0 ? i : -1;
        }).filter(i => i >= 0);
      },
    },
    {
      id: '20.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$\\sqrt3x-2=x$。（结果化成最简形式）',
      blanks: [{ kind: 'real', label: '$x=$', answer: '√3+1', simplest: true }],
      explain: [
        '移项：$\\sqrt3x-x=2$，合并：$(\\sqrt3-1)x=2$。',
        '两边同除以 $\\sqrt3-1$：$x=\\frac{2}{\\sqrt3-1}=\\frac{2(\\sqrt3+1)}{(\\sqrt3-1)(\\sqrt3+1)}=\\frac{2(\\sqrt3+1)}{2}=\\sqrt3+1$。',
        '坑：合并时把 $\\sqrt3x-x$ 写成 $\\sqrt2x$（根号不能这样减），或者停在 $\\frac{2}{\\sqrt3-1}$ 没有分母有理化。',
      ],
      verify: () => 2 / (S202(3) - 1),
    },
    {
      id: '20.2-b07',
      level: 'basic',
      type: 'choice',
      stem: '不等式 $\\sqrt3x+1>2x$ 的解集是（　　）',
      options: ['$x>2+\\sqrt3$', '$x<2+\\sqrt3$', '$x<-2-\\sqrt3$', '$x>-2-\\sqrt3$'],
      answer: 1,
      explain: [
        '移项：$\\sqrt3x-2x>-1$，即 $(\\sqrt3-2)x>-1$。',
        '因为 $\\sqrt3<2$，系数 $\\sqrt3-2$ 是**负数**，两边同除以它，不等号要改变方向：$x<\\frac{-1}{\\sqrt3-2}=\\frac{1}{2-\\sqrt3}$。',
        '分母有理化：$\\frac{1}{2-\\sqrt3}=\\frac{2+\\sqrt3}{(2-\\sqrt3)(2+\\sqrt3)}=2+\\sqrt3$。所以解集是 $x<2+\\sqrt3$，选 B。坑：忘了变号选 A。',
      ],
      verify: () => {
        // 取边界两侧的点检验
        const b = 2 + S202(3), ok = x => S202(3) * x + 1 > 2 * x;
        return ok(b - 0.01) && !ok(b + 0.01) ? 1 : -1;
      },
    },
    {
      id: '20.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '计算。',
      blanks: [
        { kind: 'num', label: '(1) $(\\sqrt6-\\sqrt2)^2+\\sqrt{48}=$', answer: '8' },
        { kind: 'num', label: '(2) $(3\\sqrt2+2\\sqrt3)(3\\sqrt2-2\\sqrt3)=$', answer: '6' },
      ],
      explain: [
        '(1) 完全平方公式：$(\\sqrt6-\\sqrt2)^2=6-2\\sqrt6\\cdot\\sqrt2+2=8-2\\sqrt{12}=8-4\\sqrt3$。又 $\\sqrt{48}=4\\sqrt3$，所以原式 $=8$。坑：漏了中间项，算成 $6+2=8$ 再加 $4\\sqrt3$。',
        '(2) 平方差公式：$(3\\sqrt2)^2-(2\\sqrt3)^2=18-12=6$。坑：$(3\\sqrt2)^2$ 算成 $3\\times2=6$，系数也要平方。',
      ],
      verify: () => [R202((S202(6) - S202(2)) ** 2 + S202(48)), R202((3 * S202(2) + 2 * S202(3)) * (3 * S202(2) - 2 * S202(3)))],
    },
    {
      id: '20.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '一个长方形的面积是 $6\\sqrt{10}\\text{ cm}^2$，长是 $2\\sqrt{15}\\text{ cm}$。（结果化成最简形式）',
      blanks: [
        { kind: 'real', label: '(1) 宽是（cm）', answer: '√6', simplest: true },
        { kind: 'real', label: '(2) 周长是（cm）', answer: '4√15+2√6', simplest: true },
      ],
      explain: [
        '(1) 宽 $=6\\sqrt{10}\\div2\\sqrt{15}=3\\sqrt{\\frac{10}{15}}=3\\sqrt{\\frac23}=3\\times\\frac{\\sqrt6}{3}=\\sqrt6$。',
        '(2) 周长 $=2\\times(2\\sqrt{15}+\\sqrt6)=4\\sqrt{15}+2\\sqrt6$。$\\sqrt{15}$ 和 $\\sqrt6$ 不是同类二次根式，不能再合并。坑：写成 $6\\sqrt{21}$。',
      ],
      verify: () => { const w = 6 * S202(10) / (2 * S202(15)); return [w, 2 * (2 * S202(15) + w)]; },
    },

    // ---------- 扩展 ----------
    {
      id: '20.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\sqrt{a+b}$ 与 $\\sqrt{2a-b}$ 都是最简二次根式，并且 $\\sqrt{a+b}$ 与 $\\sqrt8$ 是同类二次根式，$\\sqrt{2a-b}$ 与 $\\sqrt{\\dfrac13}$ 是同类二次根式。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '5/3' },
        { kind: 'num', label: '$b=$', answer: '1/3' },
      ],
      explain: [
        '先把已知的根式化成最简：$\\sqrt8=2\\sqrt2$，被开方数是 $2$；$\\sqrt{\\frac13}=\\frac{\\sqrt3}{3}$，被开方数是 $3$。',
        '$\\sqrt{a+b}$ 本身就是最简二次根式，系数是 $1$，要和 $2\\sqrt2$ 同类，只能 $a+b=2$；同理 $2a-b=3$。坑：列成 $a+b=8$、$2a-b=\\frac13$，没有先化简。',
        '两式相加：$3a=5$，$a=\\frac53$；代入得 $b=2-\\frac53=\\frac13$。',
        '检验：$\\sqrt{a+b}=\\sqrt2$，$\\sqrt{2a-b}=\\sqrt3$，都是最简二次根式，符合题意。',
      ],
      verify: () => {
        const a = F(2).add(3).div(3), b = F(2).sub(a);
        return a.add(b).eq(2) && a.mul(2).sub(b).eq(3) ? [a, b] : [];
      },
    },
    {
      id: '20.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x=\\dfrac{1}{\\sqrt5-2}$，$y=\\dfrac{1}{\\sqrt5+2}$。（结果化成最简形式）',
      blanks: [
        { kind: 'num', label: '(1) $x^2-xy+y^2=$', answer: '17' },
        { kind: 'real', label: '(2) $\\dfrac xy-\\dfrac yx=$', answer: '8√5', simplest: true },
      ],
      explain: [
        '先分母有理化：$x=\\frac{\\sqrt5+2}{5-4}=\\sqrt5+2$，$y=\\frac{\\sqrt5-2}{5-4}=\\sqrt5-2$。',
        '整体量：$x+y=2\\sqrt5$，$x-y=4$，$xy=(\\sqrt5)^2-2^2=1$。',
        '(1) $x^2-xy+y^2=(x+y)^2-3xy=20-3=17$。',
        '(2) $\\frac xy-\\frac yx=\\frac{x^2-y^2}{xy}=\\frac{(x+y)(x-y)}{xy}=\\frac{2\\sqrt5\\times4}{1}=8\\sqrt5$。坑：把 $x$、$y$ 直接平方再代入，计算量大还容易错。',
      ],
      verify: () => { const x = 1 / (S202(5) - 2), y = 1 / (S202(5) + 2); return [R202(x * x - x * y + y * y), x / y - y / x]; },
    },
    {
      id: '20.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '不用计算器，比较下列各组数的大小（填“$>$”“$<$”或“$=$”）。',
      blanks: [
        { kind: 'text', label: '(1) $\\sqrt7-\\sqrt6$ ____ $\\sqrt6-\\sqrt5$', answer: '<', options: ['>', '<', '='] },
        { kind: 'text', label: '(2) $\\sqrt{11}+\\sqrt3$ ____ $2+\\sqrt{10}$', answer: '<', options: ['>', '<', '='] },
        { kind: 'text', label: '(3) $\\dfrac{\\sqrt3-\\sqrt2}{\\sqrt3+\\sqrt2}$ ____ $5-2\\sqrt6$', answer: '=', options: ['>', '<', '='] },
      ],
      explain: [
        '(1) 两个差都不好直接比，把它们“分子有理化”：$\\sqrt7-\\sqrt6=\\frac{1}{\\sqrt7+\\sqrt6}$，$\\sqrt6-\\sqrt5=\\frac{1}{\\sqrt6+\\sqrt5}$。',
        '分子相同，分母 $\\sqrt7+\\sqrt6>\\sqrt6+\\sqrt5$，分母大的反而小，所以 $\\sqrt7-\\sqrt6<\\sqrt6-\\sqrt5$。',
        '(2) 两边都是正数，比较平方：$(\\sqrt{11}+\\sqrt3)^2=14+2\\sqrt{33}$，$(2+\\sqrt{10})^2=14+4\\sqrt{10}=14+2\\sqrt{40}$。因为 $33<40$，所以 $\\sqrt{11}+\\sqrt3<2+\\sqrt{10}$。',
        '(3) 分母有理化：$\\frac{(\\sqrt3-\\sqrt2)^2}{(\\sqrt3+\\sqrt2)(\\sqrt3-\\sqrt2)}=\\frac{5-2\\sqrt6}{1}=5-2\\sqrt6$，两者相等。',
      ],
      verify: () => {
        const cmp = (a, b) => (near202(a, b) ? '=' : a > b ? '>' : '<');
        return [cmp(S202(7) - S202(6), S202(6) - S202(5)), cmp(S202(11) + S202(3), 2 + S202(10)), cmp((S202(3) - S202(2)) / (S202(3) + S202(2)), 5 - 2 * S202(6))];
      },
    },
    {
      id: '20.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的不等式 $(a-\\sqrt5)x>a^2-5$（$a$ 是常数）。',
      blanks: [
        { kind: 'text', label: '(1) 当 $a=2$ 时，解集是', answer: '$x<2+\\sqrt5$', options: ['$x>2+\\sqrt5$', '$x<2+\\sqrt5$', '$x>2-\\sqrt5$', '$x<2-\\sqrt5$'] },
        { kind: 'text', label: '(2) 当 $a=\\sqrt5$ 时，解集是', answer: '无解', options: ['$x>0$', '$x$ 为任意实数', '无解', '$x>2\\sqrt5$'] },
        { kind: 'text', label: '(3) 如果解集是 $x<3+\\sqrt5$，那么 $a$ 的值', answer: '不存在', options: ['是 $3$', '是 $-3$', '是 $3$ 或 $-3$', '不存在'] },
      ],
      explain: [
        '右边可以用平方差公式分解：$a^2-5=(a-\\sqrt5)(a+\\sqrt5)$。系数 $a-\\sqrt5$ 的正负决定结果，要分类。',
        '(1) $a=2$：$2-\\sqrt5<0$，两边同除以它要变号，$x<\\frac{(2-\\sqrt5)(2+\\sqrt5)}{2-\\sqrt5}=2+\\sqrt5$。',
        '(2) $a=\\sqrt5$：系数为 $0$，不等式变成 $0\\cdot x>0$，即 $0>0$，不成立，无解。',
        '(3) 一般地：$a>\\sqrt5$ 时解集是 $x>a+\\sqrt5$；$a<\\sqrt5$ 时解集是 $x<a+\\sqrt5$。解集是“$x<$ …”的形式，必须 $a<\\sqrt5$，同时 $a+\\sqrt5=3+\\sqrt5$，即 $a=3$。',
        '但 $3>\\sqrt5$（$9>5$），与 $a<\\sqrt5$ 矛盾。所以这样的 $a$ 不存在。坑：只对边界 $a+\\sqrt5=3+\\sqrt5$ 就填 $a=3$，没有检查不等号的方向。',
      ],
      verify: () => {
        // 按系数正负分类得到解集，返回描述
        const sol = a => { const k = a - S202(5), c = a * a - 5; if (Math.abs(k) < 1e-12) return c < 0 ? '任意' : '无解'; return [k > 0 ? '>' : '<', c / k]; };
        const s1 = sol(2), s2 = sol(S202(5)), s3 = sol(3);
        return [
          s1[0] === '<' && near202(s1[1], 2 + S202(5)) ? '$x<2+\\sqrt5$' : '',
          s2 === '无解' ? '无解' : '',
          s3[0] === '>' ? '不存在' : '',  // a=3 是唯一使边界吻合的值，此时解集方向是 >
        ];
      },
    },
    {
      id: '20.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '把下列各式分母有理化（结果化成最简形式，写成分母是整数的一个分数，例如 (3−√5)/2）。',
      blanks: [
        { kind: 'real', label: '(1) $\\dfrac{1}{1+\\sqrt2+\\sqrt3}=$', answer: '(2+√2-√6)/4', simplest: true },
        { kind: 'real', label: '(2) $\\dfrac{2}{\\sqrt2+\\sqrt3+\\sqrt5}=$', answer: '(2√3+3√2-√30)/6', simplest: true },
      ],
      explain: [
        '分母有三项，一次乘不干净。先把其中两项看成一个整体，用平方差去掉一个根号，再有理化一次。',
        '(1) 把 $1+\\sqrt2$ 看成整体，分子分母同乘 $(1+\\sqrt2)-\\sqrt3$：分母 $=(1+\\sqrt2)^2-3=3+2\\sqrt2-3=2\\sqrt2$。',
        '得 $\\frac{1+\\sqrt2-\\sqrt3}{2\\sqrt2}$，再同乘 $\\sqrt2$：$\\frac{\\sqrt2+2-\\sqrt6}{4}=\\frac{2+\\sqrt2-\\sqrt6}{4}$。',
        '(2) 把 $\\sqrt2+\\sqrt3$ 看成整体，同乘 $\\sqrt2+\\sqrt3-\\sqrt5$：分母 $=(\\sqrt2+\\sqrt3)^2-5=2\\sqrt6$，得 $\\frac{2(\\sqrt2+\\sqrt3-\\sqrt5)}{2\\sqrt6}=\\frac{\\sqrt2+\\sqrt3-\\sqrt5}{\\sqrt6}$。',
        '再同乘 $\\sqrt6$：$\\frac{\\sqrt{12}+\\sqrt{18}-\\sqrt{30}}{6}=\\frac{2\\sqrt3+3\\sqrt2-\\sqrt{30}}{6}$。',
        '整体的选法不唯一，比如 (1) 也可以把 $\\sqrt2+\\sqrt3$ 看成整体，第一步分母变成 $1-(5+2\\sqrt6)=-4-2\\sqrt6$，后面更麻烦。挑“平方后常数正好抵消”的组合最省事。',
      ],
      verify: () => [1 / (1 + S202(2) + S202(3)), 2 / (S202(2) + S202(3) + S202(5))],
    },
    {
      id: '20.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x=\\sqrt7-2$。',
      blanks: [
        { kind: 'num', label: '(1) $x^2+4x=$', answer: '3' },
        { kind: 'num', label: '(2) $x^4+8x^3+13x^2-12x+5=$', answer: '5' },
        { kind: 'num', label: '(3) $x-\\dfrac3x=$', answer: '-4' },
        { kind: 'num', label: '(4) $x^2+\\dfrac{9}{x^2}=$', answer: '22' },
      ],
      explain: [
        '(1) 由 $x=\\sqrt7-2$ 得 $x+2=\\sqrt7$，两边平方：$x^2+4x+4=7$，所以 $x^2+4x=3$。',
        '(2) 直接代入要算 $(\\sqrt7-2)^4$，很繁。用 (1) 一层层降次：先凑出 $x^2+4x$：$x^4+8x^3+13x^2=x^2(x^2+8x+13)$，而 $x^2+8x+13=(x^2+4x)+4x+13=4x+16$。',
        '所以 $x^4+8x^3+13x^2=x^2(4x+16)=4x(x^2+4x)=12x$，原式 $=12x-12x+5=5$。',
        '(3) 由 $x^2+4x=3$，两边同除以 $x$（$x\\neq0$）：$x+4=\\frac3x$，所以 $x-\\frac3x=x-(x+4)=-4$。',
        '也可以直接分母有理化验证：$\\frac{3}{\\sqrt7-2}=\\frac{3(\\sqrt7+2)}{7-4}=\\sqrt7+2$，$x-\\frac3x=(\\sqrt7-2)-(\\sqrt7+2)=-4$。',
        '(4) 由 (3) 的 $\\frac3x=x+4$，两边平方：$\\frac9{x^2}=x^2+8x+16$，所以 $x^2+\\frac9{x^2}=2x^2+8x+16=2(x^2+4x)+16=22$。坑：用 $\\left(x-\\frac3x\\right)^2+6$ 也可以，但要记得中间项是 $-2\\times x\\times\\frac3x=-6$，所以是 $+6$：$16+6=22$。',
      ],
      verify: () => { const x = S202(7) - 2; return [R202(x * x + 4 * x), R202(x ** 4 + 8 * x ** 3 + 13 * x * x - 12 * x + 5), R202(x - 3 / x), R202(x * x + 9 / (x * x))]; },
    },

    // ---------- 挑战 ----------
    {
      id: '20.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '两个正数的和不变时，比较 $\\sqrt a+\\sqrt b$ 的大小，可以先平方：$(\\sqrt a+\\sqrt b)^2=a+b+2\\sqrt{ab}$。(2)～(4) 中的 $x$ 都是整数，且 $0\\leq x\\leq200$。可以直接使用：正整数 $N$ 不是完全平方数时，$\\sqrt N$ 是无理数。',
      blanks: [
        {
          kind: 'text',
          label: '(1) $\\sqrt2+\\sqrt{15}$、$\\sqrt5+\\sqrt{12}$、$\\sqrt8+\\sqrt9$、$\\sqrt1+\\sqrt{16}$ 中最大的是',
          answer: '$\\sqrt8+\\sqrt9$',
          options: ['$\\sqrt2+\\sqrt{15}$', '$\\sqrt5+\\sqrt{12}$', '$\\sqrt8+\\sqrt9$', '$\\sqrt1+\\sqrt{16}$'],
        },
        { kind: 'num', label: '(2) $\\sqrt x+\\sqrt{200-x}$ 的最大值是', answer: '20' },
        { kind: 'nums', label: '(3) 使 $\\sqrt x+\\sqrt{200-x}$ 的值是有理数的 $x$ 是（全部填出，用逗号隔开）', answer: ['4', '100', '196'] },
        { kind: 'nums', label: '(4) 使 $\\sqrt x+\\sqrt{200-x}$ 的值能写成 $k\\sqrt2$（$k$ 是有理数）的 $x$ 是（全部填出，用逗号隔开）', answer: ['0', '72', '128', '200'] },
      ],
      explain: [
        '思路：和 $a+b$ 一定时，$(\\sqrt a+\\sqrt b)^2=a+b+2\\sqrt{ab}$ 只由积 $ab$ 决定，积越大和越大。值是不是有理数，则要用“移项再平方”把两个根号分开来判断。',
        '(1) 四组的被开方数之和都是 $17$，积分别是 $30$、$60$、$72$、$16$，$72$ 最大，所以 $\\sqrt8+\\sqrt9$ 最大。',
        '(2) 积 $x(200-x)$：两数和为 $200$，越接近越大，$x=100$ 时积最大为 $10000$。这时值 $=\\sqrt{100}+\\sqrt{100}=20$。',
        '(3) 设 $\\sqrt x+\\sqrt{200-x}=q$ 是有理数（$q>0$），则 $\\sqrt x=q-\\sqrt{200-x}$，平方：$x=q^2+200-x-2q\\sqrt{200-x}$，所以 $\\sqrt{200-x}=\\frac{q^2+200-2x}{2q}$ 是有理数，$200-x$ 是完全平方数；同理 $x$ 也是。',
        '于是要把 $200$ 写成两个完全平方数之和：$200=4+196=100+100=196+4$（逐个看 $200-0,200-1,200-4,\\cdots$ 是不是完全平方数即可）。所以 $x=4$、$100$、$196$（值分别是 $16$、$20$、$16$）。',
        '(4) 两边同乘 $\\sqrt2$：$\\sqrt{2x}+\\sqrt{400-2x}=2k$ 是有理数。同 (3) 的道理，$2x$ 和 $400-2x$ 都是完全平方数。$2x$ 是偶数的平方，设 $2x=(2p)^2$，即 $x=2p^2$，同理 $200-x=2q^2$，所以 $p^2+q^2=100$。',
        '$100=0+100=36+64=64+36=100+0$，$p=0,6,8,10$，$x=0$、$72$、$128$、$200$（值是 $10\\sqrt2$ 或 $14\\sqrt2$）。坑：漏掉 $x=0$ 和 $200$——这时有一个根号是 $0$，值 $\\sqrt{200}=10\\sqrt2$ 也符合。',
      ],
      verify: () => {
        const f = x => S202(x) + S202(200 - x);
        const vals = [[2, 15], [5, 12], [8, 9], [1, 16]].map(([a, b]) => S202(a) + S202(b));
        const names = ['$\\sqrt2+\\sqrt{15}$', '$\\sqrt5+\\sqrt{12}$', '$\\sqrt8+\\sqrt9$', '$\\sqrt1+\\sqrt{16}$'];
        const sq = n => Number.isInteger(S202(n));
        const xs = [...Array(201).keys()];
        return [
          names[vals.indexOf(Math.max(...vals))],
          Math.round(Math.max(...xs.map(f)) * 1e9) / 1e9,
          xs.filter(x => sq(x) && sq(200 - x)),
          xs.filter(x => sq(2 * x) && sq(400 - 2 * x)),
        ];
      },
    },
    {
      id: '20.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '设 $n$ 是正整数，研究 $d=\\sqrt{n+5}-\\sqrt n$ 的大小。',
      blanks: [
        { kind: 'text', label: '(1) $\\sqrt{11}-\\sqrt{10}$ ____ $\\sqrt{10}-3$', answer: '<', options: ['>', '<', '='] },
        { kind: 'num', label: '(2) 使 $d<\\dfrac12$ 的最小的 $n$ 是', answer: '23' },
        { kind: 'num', label: '(3) 使 $d>1$ 的 $n$ 有几个？', answer: '3' },
      ],
      explain: [
        '思路：差不好估计，把它“分子有理化”成分数：$d=\\frac{(\\sqrt{n+5}-\\sqrt n)(\\sqrt{n+5}+\\sqrt n)}{\\sqrt{n+5}+\\sqrt n}=\\frac{5}{\\sqrt{n+5}+\\sqrt n}$。分母随 $n$ 增大而增大，所以 $d$ 随 $n$ 增大而减小。',
        '(1) $\\sqrt{10}-3=\\sqrt{10}-\\sqrt9=\\frac{1}{\\sqrt{10}+\\sqrt9}$，$\\sqrt{11}-\\sqrt{10}=\\frac{1}{\\sqrt{11}+\\sqrt{10}}$，后一个分母大，所以 $\\sqrt{11}-\\sqrt{10}<\\sqrt{10}-3$。',
        '(2) $d<\\frac12$ 即 $\\sqrt{n+5}+\\sqrt n>10$。两边都是正数，平方：$2n+5+2\\sqrt{n(n+5)}>100$，即 $2\\sqrt{n(n+5)}>95-2n$。',
        '$n$ 不太大时 $95-2n>0$，再平方：$4n^2+20n>9025-380n+4n^2$，$400n>9025$，$n>22.5625$。所以最小的 $n=23$。',
        '检验：$n=22$ 时 $(\\sqrt{27}+\\sqrt{22})^2=49+2\\sqrt{594}$，而 $2\\sqrt{594}=\\sqrt{2376}<\\sqrt{2601}=51$，和小于 $10$；$n=23$ 时 $(\\sqrt{28}+\\sqrt{23})^2=51+2\\sqrt{644}=51+\\sqrt{2576}>51+49=100$，和大于 $10$。',
        '(3) $d>1$ 即 $\\sqrt{n+5}+\\sqrt n<5$。$n=1$：$\\sqrt6+1<3+1$；$n=2$：$\\sqrt7+\\sqrt2<2.7+1.5$；$n=3$：$\\sqrt8+\\sqrt3<2.9+1.8$，都小于 $5$。',
        '$n=4$：$\\sqrt9+\\sqrt4=5$，正好等于 $5$，$d=1$，不满足“$>1$”；$n$ 再大和更大。所以 $n=1,2,3$，共 $3$ 个。坑：把 $n=4$ 也算进去。',
      ],
      verify: () => {
        const d = n => S202(n + 5) - S202(n);
        let first = 0, cnt = 0;
        for (let n = 1; n <= 200; n++) { if (!first && d(n) < 0.5) first = n; if (d(n) > 1 + 1e-12) cnt++; }
        return [S202(11) - S202(10) < S202(10) - 3 ? '<' : '>', first, cnt];
      },
    },
    {
      id: '20.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '求 $(\\sqrt6+\\sqrt5)^4$ 的整数部分和小数部分，并进一步研究 $8$ 次方。可以借助它的有理化因式 $\\sqrt6-\\sqrt5$。',
      blanks: [
        { kind: 'num', label: '(1) $(\\sqrt6+\\sqrt5)^4+(\\sqrt6-\\sqrt5)^4=$', answer: '482' },
        { kind: 'num', label: '(2) $(\\sqrt6+\\sqrt5)^4$ 的整数部分是', answer: '481' },
        { kind: 'real', label: '(3) $(\\sqrt6+\\sqrt5)^4$ 的小数部分是（化成最简形式）', answer: '44√30-240', simplest: true },
        { kind: 'num', label: '(4) $(\\sqrt6+\\sqrt5)^8$ 的整数部分是', answer: '232321' },
      ],
      explain: [
        '思路：$(\\sqrt6+\\sqrt5)^4$ 展开后是“整数 + 整数$\\times\\sqrt{30}$”，$\\sqrt{30}$ 要估得非常准才定得出整数部分。换个办法：它和 $(\\sqrt6-\\sqrt5)^4$ 相加，根号部分正好抵消；而 $(\\sqrt6-\\sqrt5)^4$ 很小。',
        '先算平方：$(\\sqrt6+\\sqrt5)^2=11+2\\sqrt{30}$，$(\\sqrt6-\\sqrt5)^2=11-2\\sqrt{30}$。',
        '再平方：$(11+2\\sqrt{30})^2=121+44\\sqrt{30}+120=241+44\\sqrt{30}$；同理 $(11-2\\sqrt{30})^2=241-44\\sqrt{30}$。',
        '(1) 两者相加：$482$。',
        '(2) $\\sqrt6-\\sqrt5=\\frac{1}{\\sqrt6+\\sqrt5}$，在 $0$ 和 $1$ 之间，所以 $0<(\\sqrt6-\\sqrt5)^4<1$。于是 $(\\sqrt6+\\sqrt5)^4=482-(\\sqrt6-\\sqrt5)^4$ 在 $481$ 和 $482$ 之间，整数部分是 $481$。',
        '(3) 小数部分 $=(241+44\\sqrt{30})-481=44\\sqrt{30}-240$。也等于 $1-(\\sqrt6-\\sqrt5)^4$。',
        '直接估算行不通的原因：$44\\sqrt{30}\\approx240.998$，离 $241$ 只差约 $0.002$，用 $\\sqrt{30}\\approx5.477$ 只能得到 $240.99$，要把 $\\sqrt{30}$ 估到小数点后第 $5$ 位才能确定不会进位（或者比较 $44^2\\times30=58080$ 与 $241^2=58081$）。',
        '(4) 八次方再展开就太繁了，用同样的思路推广：设 $A=(\\sqrt6+\\sqrt5)^4$，$B=(\\sqrt6-\\sqrt5)^4$，则 $A+B=482$，$AB=\\left[(\\sqrt6+\\sqrt5)(\\sqrt6-\\sqrt5)\\right]^4=1$。',
        '$A^2+B^2=(A+B)^2-2AB=482^2-2=232322$。又 $0<B<1$，所以 $0<B^2<1$，$A^2=232322-B^2$ 的整数部分是 $232321$。',
      ],
      verify: () => {
        // 用 a+b√30 的精确整数运算做平方，避免浮点误差
        const sq = ([a, b]) => [a * a + 30 * b * b, 2 * a * b];
        const p = sq([11, 2]), q = sq([11, -2]);
        const sum = p[0] + q[0];
        const small = q[0] + q[1] * S202(30);  // (11−2√30)²，应在 0 与 1 之间
        const sum8 = sq(p)[0] + sq(q)[0];  // A²+B² 的有理部分（无理部分抵消）
        return [sum, small > 0 && small < 1 ? sum - 1 : NaN, p[0] + p[1] * S202(30) - (sum - 1), small ** 2 < 1 ? sum8 - 1 : NaN];
      },
    },
    {
      id: '20.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '设 $n$ 是大于 $1$ 的整数，研究 $\\dfrac{\\sqrt n+1}{\\sqrt n-1}$ 分母有理化之后的样子。',
      blanks: [
        { kind: 'real', label: '(1) $n=2$ 时，$\\dfrac{\\sqrt2+1}{\\sqrt2-1}=$', answer: '3+2√2', simplest: true },
        { kind: 'nums', label: '(2) $n$ 不是完全平方数时，能化成 $a+b\\sqrt n$（$a$、$b$ 都是整数）的 $n$ 是（全部填出，用逗号隔开）', answer: ['2', '3'] },
        { kind: 'nums', label: '(3) 使 $\\dfrac{\\sqrt n+1}{\\sqrt n-1}$ 的值是整数的 $n$ 是（全部填出，用逗号隔开）', answer: ['4', '9'] },
      ],
      explain: [
        '思路：先一般地有理化，把结果写成“有理数 + 有理数$\\times\\sqrt n$”，再分“$\\sqrt n$ 是不是整数”两类分析整除。',
        '分子分母同乘 $\\sqrt n+1$：$\\frac{(\\sqrt n+1)^2}{n-1}=\\frac{n+1+2\\sqrt n}{n-1}=\\frac{n+1}{n-1}+\\frac{2}{n-1}\\sqrt n$。',
        '(1) $n=2$：$\\frac{3}{1}+\\frac21\\sqrt2=3+2\\sqrt2$。',
        '(2) $n$ 不是完全平方数时 $\\sqrt n$ 是无理数，“$a+b\\sqrt n$”的写法是唯一的（若 $a+b\\sqrt n=c+d\\sqrt n$ 而 $b\\neq d$，则 $\\sqrt n=\\frac{a-c}{d-b}$ 是有理数，矛盾），所以要 $\\frac{n+1}{n-1}$ 和 $\\frac{2}{n-1}$ 都是整数。',
        '$\\frac{2}{n-1}$ 是整数且 $n-1\\geq1$：$n-1=1$ 或 $2$，即 $n=2$ 或 $3$；这时 $\\frac{n+1}{n-1}=1+\\frac{2}{n-1}$ 也是整数。$n=2$、$3$ 都不是完全平方数，所以答案是 $2$、$3$（$n=3$ 时为 $2+\\sqrt3$）。',
        '(3) 若 $n$ 不是完全平方数，结果含 $\\frac{2}{n-1}\\sqrt n\\neq0$，是无理数，不可能是整数。所以 $n=k^2$（$k\\geq2$），原式 $=\\frac{k+1}{k-1}=1+\\frac{2}{k-1}$，要 $k-1=1$ 或 $2$，$k=2$ 或 $3$，$n=4$ 或 $9$（值分别是 $3$ 和 $2$）。',
      ],
      verify: () => {
        const v = n => (S202(n) + 1) / (S202(n) - 1);
        const ok2 = [], ok3 = [];
        for (let n = 2; n <= 400; n++) {
          const sq = Number.isInteger(S202(n));
          // 非完全平方数：a=(n+1)/(n−1)、b=2/(n−1) 要都是整数
          if (!sq && (n + 1) % (n - 1) === 0 && 2 % (n - 1) === 0) ok2.push(n);
          if (near202(v(n), Math.round(v(n)))) ok3.push(n);
        }
        return [v(2), ok2, ok3];
      },
    },
    {
      id: '20.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '从一个长方形纸片上，沿宽剪下尽可能多的、边长等于宽的正方形，叫作“剪一次”；剩下的长方形（如果有）接着剪。例如长、宽之比为 $\\sqrt2$ 的长方形（宽为 $1$、长为 $\\sqrt2$），剪一次只能剪下 $1$ 个正方形，剩下的长方形宽 $\\sqrt2-1$、长 $1$。（长宽比指“长 ÷ 宽”，结果化成最简形式）',
      blanks: [
        { kind: 'real', label: '(1) 上例中剪一次后剩下的长方形，长宽比是', answer: '√2+1', simplest: true },
        { kind: 'real', label: '(2) 长宽比为 $\\sqrt3$ 的长方形，剪一次后剩下的长方形的长宽比是', answer: '(√3+1)/2', simplest: true },
        { kind: 'real', label: '(3) 接着 (2) 再剪一次，剩下的长方形的长宽比是', answer: '√3+1', simplest: true },
        { kind: 'num', label: '(4) 从长宽比为 $\\sqrt3$ 的长方形开始，一共剪 $10$ 次，共剪下多少个正方形？', answer: '14' },
      ],
      explain: [
        '思路：长宽比为 $r$ 的长方形，剪一次剪下的正方形个数是 $r$ 的整数部分 $k$，剩下的长方形长宽比为 $\\frac{1}{r-k}$。每一步都要分母有理化，算出来以后就能发现规律。',
        '(1) 剩下的长方形长 $1$、宽 $\\sqrt2-1$，长宽比 $\\frac{1}{\\sqrt2-1}=\\frac{\\sqrt2+1}{(\\sqrt2-1)(\\sqrt2+1)}=\\sqrt2+1$。',
        '(2) $1<\\sqrt3<2$，剪下 $1$ 个，剩下长 $1$、宽 $\\sqrt3-1$，长宽比 $\\frac{1}{\\sqrt3-1}=\\frac{\\sqrt3+1}{2}$。',
        '(3) $\\frac{\\sqrt3+1}{2}\\approx1.37$，剪下 $1$ 个，剩下的长宽比 $\\frac{1}{\\frac{\\sqrt3+1}{2}-1}=\\frac{2}{\\sqrt3-1}=\\frac{2(\\sqrt3+1)}{2}=\\sqrt3+1$。',
        '(4) 再剪：$\\sqrt3+1\\approx2.73$，剪下 $2$ 个，剩下的长宽比 $\\frac{1}{\\sqrt3+1-2}=\\frac{1}{\\sqrt3-1}=\\frac{\\sqrt3+1}{2}$，回到了 (2) 的形状！以后就按“剪 $1$ 个、剪 $2$ 个”循环下去，永远剪不完。',
        '各次剪下的个数：第 $1$ 次 $1$ 个，第 $2$～$10$ 次依次是 $1,2,1,2,1,2,1,2,1$。合计 $1+5\\times1+4\\times2=14$ 个。',
        '附注：如果长宽比是有理数 $\\frac pq$，这样剪下去一定会在有限次后剪完（和辗转相除一样）；$\\sqrt3$ 的长方形永远剪不完，这从另一个角度说明了 $\\sqrt3$ 是无理数。',
      ],
      verify: () => {
        // 用 (a+b√3)/c 的精确形式迭代，避免浮点在整数部分附近出错
        const s3 = S202(3);
        let [a, b, c] = [0, 1, 1];  // r = (a + b√3)/c
        const ratios = [], counts = [];
        for (let i = 0; i < 10; i++) {
          const k = Math.floor((a + b * s3) / c);
          counts.push(k);
          // 1/((a−kc + b√3)/c) = c(a−kc − b√3)/((a−kc)² − 3b²)
          const p = a - k * c, den = p * p - 3 * b * b;
          [a, b, c] = [c * p, -c * b, den];
          if (c < 0) [a, b, c] = [-a, -b, -c];
          ratios.push((a + b * s3) / c);
        }
        return [1 / (S202(2) - 1), ratios[0], ratios[1], counts.reduce((x, y) => x + y, 0)];
      },
    },
  ],
});
