'use strict';

// 上海数学六年级下册 · 9.2 二元一次方程组的解法
// 知识范围：消元法——把一个方程变形、用“代入”的方法消元；两个方程相加或相减消元（系数相同或相反，必要时先乘一个数）
//   课本没有单独起“代入消元法”“加减消元法”的名字，卡片里用课本的说法
// 可以使用 9.1、6 上全部内容（一元一次方程、绝对值、乘方）、第 5～8 章
// 还没学：不等式、分式方程、二元一次方程的图像；方程组无解、有无数组解课本没有讲，题目避开这两种情况

// 解 a1x+b1y=c1、a2x+b2y=c2（系数可以是分数），只用于 verify 核对
const SOLVE92 = (a1, b1, c1, a2, b2, c2) => {
  [a1, b1, c1, a2, b2, c2] = [a1, b1, c1, a2, b2, c2].map(v => F(v));
  const d = a1.mul(b2).sub(a2.mul(b1));
  return [c1.mul(b2).sub(c2.mul(b1)).div(d), a1.mul(c2).sub(a2.mul(c1)).div(d)];
};

Content.section({
  id: 'math/sh2024/g6s2/9.2',
  title: '二元一次方程组的解法',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 4, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核四轮，答案全部一致。第 1 轮挑战档只有 c02 合格：c01 是常规看错系数、c03 选项只需代入、c04 与 e03 同为整体换元、c05 两问同一方法且被卡片提示；第 2 轮 c01 改为三人各看错一个系数需先判断、c03 加绝对值分段和非负整数计数、c04 改为不对称换元；c05 连改三次（按参数整理求公共解 → 加常数项不同的方程组，相减提出 m−n 再整体代入）后判定整节通过' },

  intro: [
    {
      title: '消元的思路',
      body: '一元一次方程我们会解。解二元一次方程组的办法是**消元**：设法消去一个未知数，把方程组变成一元一次方程，求出一个未知数，再代回去求另一个。',
      example: '解出一个未知数后，代回哪个方程都可以，一般选系数简单的那个。最后把两个值写成方程组的解。',
    },
    {
      title: '用“代入”的方法消元',
      body: '把其中一个方程变形，用一个未知数表示另一个（如 $y=\\cdots$），再代入另一个方程，就只剩一个未知数了。某个未知数的系数是 1 或 $-1$ 时，用这个方法方便。',
      example: '$\\begin{cases}y=3x\\\\x+y=8\\end{cases}$：把 $y=3x$ 代入第二个方程，$x+3x=8$，$x=2$，$y=6$。',
      pitfall: '代入时要加括号，比如把 $y=2x-1$ 代入 $3y$，要写成 $3(2x-1)$。',
    },
    {
      title: '两个方程相加或相减',
      body: '如果两个方程中同一个未知数的系数**相同**，两式相减就能消去它；系数**互为相反数**，两式相加就能消去它。',
      example: '$\\begin{cases}x+2y=9\\\\x-2y=1\\end{cases}$：两式相加 $2x=10$，$x=5$；代回得 $y=2$。',
      pitfall: '相减时每一项都要减，特别是右边的常数和带负号的项。',
    },
    {
      title: '先乘一个数，再加减',
      body: '系数不相同也不相反时，先把一个或两个方程的两边同乘一个适当的数，使某个未知数的系数相同或相反，再加减。',
      example: '$\\begin{cases}2x+y=4\\\\3x-2y=6\\end{cases}$：第一个方程乘 2 得 $4x+2y=8$，与第二个相加 $7x=14$，$x=2$，$y=0$。',
      pitfall: '乘的时候，方程两边每一项都要乘，常数项别漏。',
    },
    {
      title: '先整理，再消元；有时可以整体处理',
      body: '含括号、分母的方程组，先去括号、去分母，整理成 $ax+by=c$ 的样子。如果方程里反复出现同一个整体（如 $x+y$），也可以把它当作一个未知数来解。',
      example: '只要求 $x+y$ 的值时，常常把两个方程直接相加或相减，不必先求出 $x$、$y$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '9.2-b01',
      level: 'basic',
      type: 'fill',
      stem: '把方程 $2x-3y=12$ 变形，用含 $x$ 的式子表示 $y$。',
      blanks: [{ kind: 'expr', label: '$y=$', answer: '2x/3-4', vars: ['x'] }],
      explain: [
        '移项：$-3y=12-2x$。',
        '两边除以 $-3$：$y=\\frac{2x-12}{3}=\\frac23x-4$。',
        '常见错误：移项不变号得 $-3y=12+2x$；或者除以 $-3$ 时只改了一项的符号，得 $y=4-\\frac23x$ 或 $y=\\frac23x+4$。',
      ],
      verify: () => '(2x-12)/3',
    },
    {
      id: '9.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}x=2y-1\\\\3x+y=11\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '3' },
        { kind: 'num', label: '$y=$', answer: '2' },
      ],
      explain: [
        '把第一个方程代入第二个：$3(2y-1)+y=11$。',
        '$6y-3+y=11$，$7y=14$，$y=2$。',
        '代回 $x=2y-1=3$。所以 $\\begin{cases}x=3\\\\y=2\\end{cases}$。',
        '常见错误：不加括号写成 $3\\times2y-1+y=11$，得到 $y=\\frac{12}{7}$。',
      ],
      verify: () => SOLVE92(1, -2, -1, 3, 1, 11),
    },
    {
      id: '9.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}3x+2y=7\\\\5x-2y=9\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '2' },
        { kind: 'num', label: '$y=$', answer: '1/2' },
      ],
      explain: [
        '$y$ 的系数互为相反数，两式相加：$8x=16$，$x=2$。',
        '代入第一个方程：$6+2y=7$，$y=\\frac12$。',
        '常见错误：两式相减，$y$ 没有消掉反而变成 $4y$；或者 $y$ 不是整数就以为算错了。',
      ],
      verify: () => SOLVE92(3, 2, 7, 5, -2, 9),
    },
    {
      id: '9.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}2x+3y=1\\\\3x-2y=8\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '2' },
        { kind: 'num', label: '$y=$', answer: '-1' },
      ],
      explain: [
        '消 $y$：第一个方程乘 2，第二个方程乘 3，得 $4x+6y=2$，$9x-6y=24$。',
        '两式相加：$13x=26$，$x=2$。代入第一个方程：$4+3y=1$，$y=-1$。',
        '常见错误：乘的时候右边的常数没乘，写成 $4x+6y=1$。',
      ],
      verify: () => SOLVE92(2, 3, 1, 3, -2, 8),
    },
    {
      id: '9.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}2x-y=5\\\\3x-y=8\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '3' },
        { kind: 'num', label: '$y=$', answer: '1' },
      ],
      explain: [
        '$y$ 的系数相同（都是 $-1$），用第二个方程减第一个：$(3x-y)-(2x-y)=8-5$。',
        '$-y-(-y)=0$，得 $x=3$。代入第一个方程：$6-y=5$，$y=1$。',
        '常见错误：相减时把 $-y-(-y)$ 算成 $-2y$，消不掉。',
      ],
      verify: () => SOLVE92(2, -1, 5, 3, -1, 8),
    },
    {
      id: '9.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$、$y$ 的方程组 $\\begin{cases}2x+y=3k-1\\\\x+2y=-2\\end{cases}$ 的解满足 $x+y=1$，求 $k$。',
      blanks: [{ kind: 'num', label: '$k=$', answer: '2' }],
      explain: [
        '要的是 $x+y$，两式相加最快：$3x+3y=3k-3$，所以 $x+y=k-1$。',
        '由 $k-1=1$，得 $k=2$。',
        '常见错误：先用含 $k$ 的式子求 $x$、$y$，计算繁琐容易出错；或者相加后忘了两边同除以 3。',
      ],
      verify: () => {
        for (let k = -10; k <= 10; k++) {
          const [x, y] = SOLVE92(2, 1, 3 * k - 1, 1, 2, -2);
          if (x.add(y).eq(1)) return k;
        }
        return null;
      },
    },
    {
      id: '9.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}\\frac{x}{2}+\\frac{y}{3}=2\\\\\\frac{x}{4}-\\frac{y}{6}=0\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '2' },
        { kind: 'num', label: '$y=$', answer: '3' },
      ],
      explain: [
        '先去分母：第一个方程乘 6 得 $3x+2y=12$；第二个方程乘 12 得 $3x-2y=0$。',
        '两式相加：$6x=12$，$x=2$；代入 $3x-2y=0$，$y=3$。',
        '常见错误：去分母时右边的 2 没乘 6，写成 $3x+2y=2$。',
      ],
      verify: () => SOLVE92(F(1).div(2), F(1).div(3), 2, F(1).div(4), F(-1).div(6), 0),
    },
    {
      id: '9.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}3(x-1)=y+5\\\\5(y-1)=3(x+5)\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '5' },
        { kind: 'num', label: '$y=$', answer: '7' },
      ],
      explain: [
        '先整理：第一个方程 $3x-3=y+5$，即 $3x-y=8$；第二个方程 $5y-5=3x+15$，即 $-3x+5y=20$。',
        '两式相加：$4y=28$，$y=7$；代入 $3x-y=8$，$x=5$。',
        '常见错误：去括号时漏乘，写成 $3x-1=y+5$ 或 $5y-1=3x+15$。',
      ],
      verify: () => SOLVE92(3, -1, 8, -3, 5, 20),
    },
    {
      id: '9.2-b09',
      level: 'basic',
      type: 'choice',
      stem: '解方程组 $\\begin{cases}3x+4y=10\\\\3x-5y=1\\end{cases}$（第一个方程记作 ①，第二个记作 ②）时，要消去 $x$，下列做法正确的是',
      options: ['① + ②', '① − ②', '① × 5 + ② × 4', '① × 3 + ② × 3'],
      answer: 1,
      explain: [
        '两个方程中 $x$ 的系数都是 3，相同，相减就能消去 $x$：① − ② 得 $9y=9$。',
        '① + ② 得 $6x-y=11$，$x$ 没消掉。① × 5 + ② × 4 消去的是 $y$，不是 $x$。① × 3 + ② × 3 得 $18x-3y=33$，$x$ 的系数反而变大了。',
        '常见错误：看到“相加”就以为能消元。要看同一个未知数的系数是相同（相减）还是相反（相加）。',
      ],
      verify: () => {
        // 每种做法得到的 x 系数
        const coef = [3 + 3, 3 - 3, 3 * 5 + 3 * 4, 3 * 3 + 3 * 3];
        const firstZero = coef.findIndex(c => c === 0);
        return firstZero;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '9.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}\\frac{x+1}{3}=\\frac{y+2}{4}\\\\2(x-1)-(y+3)=-1\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '5' },
        { kind: 'num', label: '$y=$', answer: '6' },
      ],
      explain: [
        '第一个方程两边乘 12：$4(x+1)=3(y+2)$，$4x+4=3y+6$，即 $4x-3y=2$。',
        '第二个方程去括号：$2x-2-y-3=-1$，即 $2x-y=4$。',
        '由 $2x-y=4$ 得 $y=2x-4$，代入 $4x-3y=2$：$4x-3(2x-4)=2$，$-2x+12=2$，$x=5$，$y=6$。',
        '常见错误：$-(y+3)$ 去括号写成 $-y+3$；或者交叉相乘写成 $3(x+1)=4(y+2)$。',
      ],
      verify: () => SOLVE92(4, -3, 2, 2, -1, 4),
    },
    {
      id: '9.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '方程组 $\\begin{cases}2x+y=5\\\\ax-by=4\\end{cases}$ 与方程组 $\\begin{cases}x-y=1\\\\bx+ay=7\\end{cases}$ 的解相同，求 $a$、$b$ 的值。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '3' },
        { kind: 'num', label: '$b=$', answer: '2' },
      ],
      explain: [
        '怎么想到的：两个方程组有同一个解，这个解满足全部四个方程。其中 $2x+y=5$、$x-y=1$ 不含参数，把它们组成一个新方程组先解出 $x$、$y$。',
        '两式相加：$3x=6$，$x=2$，$y=1$。',
        '代入含参数的两个方程：$2a-b=4$，$2b+a=7$。',
        '由 $2a-b=4$ 得 $b=2a-4$，代入 $2(2a-4)+a=7$：$5a=15$，$a=3$，$b=2$。',
        '常见错误：把每个方程组各自解，参数太多解不出来。',
      ],
      verify: () => {
        const [x, y] = SOLVE92(2, 1, 5, 1, -1, 1);
        // 2a-b=4 → x·a - y·b = 4；a + 2b = 7 → y·a + x·b = 7
        return SOLVE92(x, y.neg(), 4, y, x, 7);
      },
    },
    {
      id: '9.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}\\frac{x+y}{2}+\\frac{x-y}{3}=6\\\\2(x+y)-3(x-y)=-2\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '7' },
        { kind: 'num', label: '$y=$', answer: '1' },
      ],
      explain: [
        '方程里反复出现 $x+y$ 和 $x-y$，把它们当作整体：设 $x+y=m$，$x-y=n$。',
        '方程组变成 $\\begin{cases}\\frac m2+\\frac n3=6\\\\2m-3n=-2\\end{cases}$，第一个乘 6：$3m+2n=36$。',
        '$3m+2n=36$ 乘 3、$2m-3n=-2$ 乘 2，相加：$13m=104$，$m=8$，代回得 $n=6$。',
        '再解 $\\begin{cases}x+y=8\\\\x-y=6\\end{cases}$：$x=7$，$y=1$。',
        '直接去括号展开也能做，但整体换元计算量小，不容易错。',
      ],
      verify: () => {
        const [m, n] = SOLVE92(F(1).div(2), F(1).div(3), 6, 2, -3, -2);
        return SOLVE92(1, 1, m, 1, -1, n);
      },
    },
    {
      id: '9.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$、$y$ 的方程组 $\\begin{cases}2x+3y=k\\\\3x+5y=k+2\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '(1) 如果它的解中 $x$ 与 $y$ 互为相反数，$k=$', answer: '2' },
        { kind: 'num', label: '(2) 如果它的解满足 $x=2y$，$k=$', answer: '7/2' },
      ],
      explain: [
        '(1) $x$、$y$ 互为相反数，$y=-x$。代入两个方程：$2x-3x=k$，得 $x=-k$；$3x-5x=k+2$，得 $-2x=k+2$。',
        '把 $x=-k$ 代入 $-2x=k+2$：$2k=k+2$，$k=2$。',
        '(2) 用第二个方程减第一个方程，$k$ 被消掉了：$x+2y=2$。这个关系对任何 $k$ 都成立。',
        '再加上 $x=2y$：$4y=2$，$y=\\frac12$，$x=1$，代入第一个方程 $k=2+\\frac32=\\frac72$。',
        '常见错误：(2) 先求出含 $k$ 的解再代入，算得很繁。',
      ],
      verify: () => {
        const find = cond => {
          for (let t = -40; t <= 40; t++) {
            const k = F(t).div(2);
            const [x, y] = SOLVE92(2, 3, k, 3, 5, k.add(2));
            if (cond(x, y)) return k;
          }
          return null;
        };
        return [find((x, y) => x.add(y).eq(0)), find((x, y) => x.eq(y.mul(2)))];
      },
    },
    {
      id: '9.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $|a-2b+1|+(2a+b-8)^2=0$。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '3' },
        { kind: 'num', label: '　 $b=$', answer: '2' },
        { kind: 'num', label: '(2) $a^b=$', answer: '9' },
      ],
      explain: [
        '绝对值和平方都不小于 0，两个不小于 0 的数相加等于 0，只能两个都等于 0。',
        '所以 $\\begin{cases}a-2b+1=0\\\\2a+b-8=0\\end{cases}$，即 $\\begin{cases}a-2b=-1\\\\2a+b=8\\end{cases}$。',
        '(1) 第二个方程乘 2 再与第一个相加：$5a=15$，$a=3$，$b=2$。',
        '(2) $a^b=3^2=9$。常见错误：算成 $2^3=8$。',
      ],
      verify: () => {
        const [a, b] = SOLVE92(1, -2, -1, 2, 1, 8);
        return [a, b, a.pow(Number(b.n))];
      },
    },
    {
      id: '9.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}|x|+y=2\\\\x+2|y|=1\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '(1) 方程组一共有几组解？', answer: '2', suffix: '组' },
        { kind: 'nums', label: '(2) 各组解中 $x$ 的值分别是（用逗号隔开）', answer: ['-1', '-5'] },
      ],
      explain: [
        '去绝对值要按 $x$、$y$ 的正负分四种情况，解出来还要检验是否符合假设。',
        '① $x\\ge0$，$y\\ge0$：$x+y=2$，$x+2y=1$，得 $y=-1$，不符合 $y\\ge0$，舍去。',
        '② $x\\ge0$，$y<0$：$x+y=2$，$x-2y=1$，得 $y=\\frac13$，不符合，舍去。',
        '③ $x<0$，$y\\ge0$：$-x+y=2$，$x+2y=1$，相加 $3y=3$，$y=1$，$x=-1$，符合。',
        '④ $x<0$，$y<0$：$-x+y=2$，$x-2y=1$，相加 $-y=3$，$y=-3$，$x=-5$，符合。',
        '所以有两组解：$\\begin{cases}x=-1\\\\y=1\\end{cases}$，$\\begin{cases}x=-5\\\\y=-3\\end{cases}$。常见错误：只考虑 $x$、$y$ 都是正数，或者解出来不检验。',
      ],
      verify: () => {
        const sols = [];
        for (const sx of [1, -1]) for (const sy of [1, -1]) {
          const [x, y] = SOLVE92(sx, 1, 2, 1, 2 * sy, 1);
          const okx = sx === 1 ? x.cmp(0) >= 0 : x.cmp(0) < 0;
          const oky = sy === 1 ? y.cmp(0) >= 0 : y.cmp(0) < 0;
          if (okx && oky) sols.push(x);
        }
        return [sols.length, sols];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '9.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '甲、乙、丙三人解关于 $x$、$y$ 的方程组 $\\begin{cases}ax+by=8\\\\cx-y=5\\end{cases}$。甲正确地解得 $\\begin{cases}x=2\\\\y=1\\end{cases}$；乙只看错了 $a$、$b$、$c$ 中的一个，解得 $\\begin{cases}x=4\\\\y=0\\end{cases}$；丙也只看错了其中一个，解得 $\\begin{cases}x=1\\\\y=-2\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '2' },
        { kind: 'num', label: '　 $b=$', answer: '4' },
        { kind: 'num', label: '　 $c=$', answer: '3' },
        { kind: 'num', label: '(2) 乙把看错的那个系数看成了', answer: '5/4' },
        { kind: 'nums', label: '(3) 丙看错的系数被看成了多少？（可能有几种情况，全部填出，用逗号隔开）', answer: ['16', '-3'] },
      ],
      explain: [
        '关键：看错哪个系数，只影响含这个系数的那个方程；另一个方程没抄错，他的解仍然满足它。',
        '甲的解代入第二个方程：$2c-1=5$，$c=3$；代入第一个方程：$2a+b=8$。还差一个条件。',
        '乙的解代入正确的第二个方程：$3\\times4-0=12\\ne5$，说明乙的第二个方程抄错了，看错的是 $c$；他的第一个方程没错：$4a+0=8$，$a=2$，$b=8-2a=4$。',
        '(2) 乙的解满足他看错后的第二个方程 $c^{\\prime}\\times4-0=5$，$c^{\\prime}=\\frac54$。',
        '(3) 丙的解代入正确的方程组：第二个 $3\\times1-(-2)=5$ 成立，第一个 $2\\times1+4\\times(-2)=-6\\ne8$ 不成立，说明丙看错的是 $a$ 或 $b$，要分两种情况。',
        '看错 $a$：$a^{\\prime}\\times1+4\\times(-2)=8$，$a^{\\prime}=16$；看错 $b$：$2\\times1+b^{\\prime}\\times(-2)=8$，$b^{\\prime}=-3$。两种情况都说得通，所以是 16 或 $-3$。',
        '常见错误：以为丙看错的系数只有一种可能；或者把乙的解代入第一个方程之前，没有先判断乙看错的是哪个。',
      ],
      verify: () => {
        const c = F(5).add(1).div(2);
        // 乙：代入正确的第二个方程不成立 → 看错 c，第一个方程成立
        if (c.mul(4).sub(0).eq(5)) return null;
        const a = F(8).div(4), b = F(8).sub(a.mul(2));
        const cc = F(5).div(4);
        // 丙：检验哪个方程成立
        const ok1 = a.mul(1).add(b.mul(-2)).eq(8), ok2 = c.mul(1).sub(-2).eq(5);
        if (ok1 || !ok2) return null;
        const aa = F(8).sub(b.mul(-2)), bb = F(8).sub(a).div(-2);
        return [a, b, c, cc, [aa, bb]];
      },
    },
    {
      id: '9.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$、$y$ 的方程组 $\\begin{cases}x+ky=3\\\\2x+y=1\\end{cases}$ 的解 $x$、$y$ 都是整数，$k$ 是整数。',
      blanks: [
        { kind: 'nums', label: '(1) $k$ 的值是（全部填出，用逗号隔开）', answer: ['0', '1', '-2', '3'] },
        { kind: 'num', label: '(2) 其中使 $x$ 最大的 $k$ 对应的解中，$y=$', answer: '-5' },
      ],
      explain: [
        '由第二个方程 $y=1-2x$，代入第一个：$x+k(1-2x)=3$，整理得 $(1-2k)x=3-k$。',
        '怎么想到的：左边、右边都含 $k$，设法把 $k$ 集中起来。两边乘 2：$2(1-2k)x=6-2k=(1-2k)+5$，移项得 $(1-2k)(2x-1)=5$。',
        '$k$、$x$ 都是整数，$1-2k$ 和 $2x-1$ 是两个整数，乘积是 5，只能是 $1\\times5$、$5\\times1$、$(-1)\\times(-5)$、$(-5)\\times(-1)$。',
        '$1-2k=1$：$k=0$，$2x-1=5$，$x=3$；$1-2k=5$：$k=-2$，$x=1$；$1-2k=-1$：$k=1$，$x=-2$；$1-2k=-5$：$k=3$，$x=0$。每种情况 $y=1-2x$ 也是整数。',
        '(1) $k=0$、$-2$、$1$、$3$。(2) $x$ 最大是 3（$k=0$），$y=1-2\\times3=-5$。',
        '常见错误：只试了几个小的 $k$，漏掉 $k=3$（这时 $x=0$，也是整数）。',
      ],
      verify: () => {
        const ks = [];
        let best = null;
        for (let k = -100; k <= 100; k++) {
          if (1 - 2 * k === 0) continue;
          const [x, y] = SOLVE92(1, k, 3, 2, 1, 1);
          if (x.d === 1n && y.d === 1n) {
            ks.push(k);
            if (!best || x.cmp(best[0]) > 0) best = [x, y];
          }
        }
        return [ks, best[1]];
      },
    },
    {
      id: '9.2-c03',
      level: 'challenge',
      type: 'multi',
      stem: '关于 $x$、$y$ 的方程组 $\\begin{cases}x+3y=4-a\\\\x-y=3a\\end{cases}$，下列结论中正确的是（多选）',
      options: [
        '当 $a=-2$ 时，$x$、$y$ 的值互为相反数',
        '当 $a=1$ 时，方程组的解也是方程 $x-3y=3$ 的解',
        '若 $y=3$，则 $x=5$',
        '若 $|x|+|y|=5$，则 $a$ 有两个不同的值',
        '若 $x$、$y$ 都是不小于 0 的整数，则 $a$ 有三个不同的值',
      ],
      answer: [0, 1, 3],
      explain: [
        '先用含 $a$ 的式子表示解：两式相减 $4y=4-4a$，$y=1-a$；$x=3a+y=1+2a$。',
        '① $a=-2$：$x=-3$，$y=3$，互为相反数，正确。',
        '② $a=1$：$x=3$，$y=0$，$x-3y=3$，正确。',
        '③ $y=3$ 时 $a=-2$，$x=-3$，不是 5，错误。',
        '④ $|1+2a|+|1-a|=5$，按 $1+2a$、$1-a$ 的正负分三段：$a\\ge1$ 时 $(1+2a)+(a-1)=3a=5$，$a=\\frac53$，符合；$-\\frac12\\le a<1$ 时 $(1+2a)+(1-a)=a+2=5$，$a=3$，不在这一段，舍去；$a<-\\frac12$ 时 $-(1+2a)+(1-a)=-3a=5$，$a=-\\frac53$，符合。有两个值，正确。',
        '⑤ $y=1-a\\ge0$，$a\\le1$；$x=1+2a\\ge0$，$a\\ge-\\frac12$；$y$ 是整数，所以 $a=1-y$ 是整数。$a$ 只能是 0 或 1，只有两个值，错误。',
        '所以正确的是 ①②④。',
      ],
      verify: () => {
        const sol = a => SOLVE92(1, 3, F(4).sub(a), 1, -1, F(3).mul(a));
        const ok = [];
        let [x, y] = sol(-2); if (x.add(y).eq(0)) ok.push(0);
        [x, y] = sol(1); if (x.sub(y.mul(3)).eq(3)) ok.push(1);
        let third = true;
        for (let t = -60; t <= 60; t++) { const [p, q] = sol(F(t).div(6)); if (q.eq(3) && !p.eq(5)) third = false; }
        if (third) ok.push(2);
        const abs = f => (f.cmp(0) < 0 ? f.neg() : f);
        const as = [];
        for (let t = -60; t <= 60; t++) { const [p, q] = sol(F(t).div(6)); if (abs(p).add(abs(q)).eq(5)) as.push(t); }
        if (as.length === 2) ok.push(3);
        const nonneg = [];
        for (let t = -60; t <= 60; t++) { const [p, q] = sol(F(t).div(6)); if (p.d === 1n && q.d === 1n && p.cmp(0) >= 0 && q.cmp(0) >= 0) nonneg.push(t); }
        if (nonneg.length === 3) ok.push(4);
        return ok;
      },
    },
    {
      id: '9.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知关于 $x$、$y$ 的方程组 $\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}$ 的解是 $\\begin{cases}x=3\\\\y=4\\end{cases}$（这个方程组只有这一组解）。',
      blanks: [
        { kind: 'num', label: '(1) 方程组 $\\begin{cases}3a_1x+2b_1y=5c_1\\\\3a_2x+2b_2y=5c_2\\end{cases}$ 的解是 $x=$', answer: '5' },
        { kind: 'num', label: '　 $y=$', answer: '10' },
        { kind: 'num', label: '(2) 如果方程组 $\\begin{cases}ma_1x+nb_1y=c_1\\\\ma_2x+nb_2y=c_2\\end{cases}$ 的解是 $\\begin{cases}x=1\\\\y=2\\end{cases}$，那么 $m=$', answer: '3' },
        { kind: 'num', label: '　 $n=$', answer: '2' },
      ],
      explain: [
        '$a_1$、$b_1$ 等都不知道，不能直接解。要把新方程组“变形”成和原方程组一样的样子。',
        '(1) 两个方程两边都除以 5：$a_1\\cdot\\frac{3x}{5}+b_1\\cdot\\frac{2y}{5}=c_1$，第二个同样。把 $\\frac{3x}{5}$ 看作原来的 $x$、把 $\\frac{2y}{5}$ 看作原来的 $y$，形状和原方程组完全一样。',
        '原方程组只有一组解，所以 $\\frac{3x}{5}=3$，$\\frac{2y}{5}=4$，得 $x=5$，$y=10$。',
        '(2) 同样地，$a_1\\cdot(mx)+b_1\\cdot(ny)=c_1$，所以 $mx=3$，$ny=4$。把 $x=1$、$y=2$ 代入：$m=3$，$2n=4$，$n=2$。',
        '检验 (1)：$3a_1\\times5+2b_1\\times10=15a_1+20b_1=5(3a_1+4b_1)=5c_1$，成立。',
        '常见错误：(1) 以为 $3x=3$、$2y=4$，忘了右边的 5；(2) 把 $m$、$n$ 当成解。',
      ],
      verify: () => {
        // 任取一组以 (3,4) 为唯一解的系数，直接解新方程组核对
        const [a1, b1, a2, b2] = [F(2), F(-1), F(1), F(3)];
        const c1 = a1.mul(3).add(b1.mul(4)), c2 = a2.mul(3).add(b2.mul(4));
        const [x, y] = SOLVE92(a1.mul(3), b1.mul(2), c1.mul(5), a2.mul(3), b2.mul(2), c2.mul(5));
        // (2)：m·1=3，n·2=4，代回核对
        const m = F(3), n = F(4).div(2);
        const [p, q] = SOLVE92(a1.mul(m), b1.mul(n), c1, a2.mul(m), b2.mul(n), c2);
        if (!p.eq(1) || !q.eq(2)) return null;
        return [x, y, m, n];
      },
    },
    {
      id: '9.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$、$y$ 的方程 $(m+1)x+(m-2)y=3m+6$，$m$ 取不同的值时得到不同的方程。',
      blanks: [
        { kind: 'num', label: '(1) 不论 $m$ 取什么值，这些方程都有一个公共解，公共解是 $x=$', answer: '4' },
        { kind: 'num', label: '　 $y=$', answer: '-1' },
        { kind: 'num', label: '(2) 已知 $m-n=1$，关于 $x$、$y$ 的方程组 $\\begin{cases}(m+1)x+(m-2)y=3m+6\\\\(n+1)x+(n-2)y=3n+7\\end{cases}$ 的解中 $x+y=$', answer: '2' },
        { kind: 'num', label: '(3) 在 (2) 中，如果方程组的解还满足 $x=2y$，那么 $m=$', answer: '-6' },
      ],
      explain: [
        '(1) 怎么想到的：“不论 $m$ 取什么值都成立”，就把方程按 $m$ 整理：$m(x+y-3)+(x-2y-6)=0$。',
        '要对所有 $m$ 都成立，$m$ 的系数和剩下的部分都要是 0（否则 $m$ 一变左边就变了）：$x+y=3$，$x-2y=6$。两式相减：$3y=-3$，$y=-1$，$x=4$。',
        '(2) 注意第二个方程右边是 $3n+7$，不是 $3n+6$，所以 (1) 的公共解不满足它，不能直接照搬。',
        '两式相减：$(m-n)x+(m-n)y=3(m-n)-1$。$m-n=1$，得 $x+y=3-1=2$。',
        '(3) 由 $x+y=2$、$x=2y$：$y=\\frac23$，$x=\\frac43$。代入第一个方程：$(m+1)\\times\\frac43+(m-2)\\times\\frac23=3m+6$，两边乘 3：$4m+4+2m-4=9m+18$，$m=-6$（此时 $n=-7$）。',
        '检验：$m=-6$、$n=-7$ 时方程组是 $\\begin{cases}-5x-8y=-12\\\\-6x-9y=-14\\end{cases}$，$x=\\frac43$、$y=\\frac23$ 代入两式都成立。',
        '常见错误：(2) 以为解还是 (4, −1)，得 $x+y=3$；或者相减后忘了右边多出的 $-1$。',
      ],
      verify: () => {
        const [x, y] = SOLVE92(1, 1, 3, 1, -2, 6);
        for (let m = -5; m <= 5; m++) if (!F(m + 1).mul(x).add(F(m - 2).mul(y)).eq(3 * m + 6)) return null;
        const sys = m => SOLVE92(m + 1, m - 2, 3 * m + 6, m, m - 3, 3 * (m - 1) + 7);
        // x+y 对不同的 m 都相同
        const sums = new Set([-3, 0, 2, 5].map(m => { const [p, q] = sys(m); return p.add(q).toString(); }));
        if (sums.size !== 1) return null;
        let mm = null;
        for (let m = -20; m <= 20; m++) { const [p, q] = sys(m); if (p.eq(q.mul(2))) mm = m; }
        return [x, y, [...sums][0], mm];
      },
    },
  ],
});
