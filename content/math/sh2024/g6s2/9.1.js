'use strict';

// 上海数学六年级下册 · 9.1 二元一次方程组的概念
// 知识范围：二元一次方程（两个未知数，含未知数的项都是一次项）、方程组、二元一次方程组、方程组的解（使每个方程左右两边都相等的两个未知数的值）；
//   设两个未知数、由两个条件列方程组
// 可以使用 6 上全部内容（一元一次方程及其应用、整体代入）、第 5～8 章
// 还没学：消元法（9.2），所以本节不要求解一般的二元一次方程组；只出概念、检验解、由解求参数（每个方程只剩一个参数，或用和差、整体）、
//   列方程组，以及在小范围内逐个试出二元一次方程的整数解（课本没有单独讲整数解，这里只用代入和整除）

Content.section({
  id: 'math/sh2024/g6s2/9.1',
  title: '二元一次方程组的概念',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。第 1 轮指出整数解题 8 道过多、c03（鸡兔对调）和 c05 只有 3～4 级、c04 接近消元、c02 未说明可只用一种砝码；第 2 轮换掉 e06、c03，b07 改为非负整数解，c05 第 (2) 问可硬算被打回；第 3 轮 c03 换数据避开两个方程都退化的争议、c05 改为和差都是平方数后判定整节通过' },

  intro: [
    {
      title: '二元一次方程',
      body: '含有**两个未知数**，并且含未知数的项都是**一次项**的方程，叫二元一次方程。“元”指未知数，“次”指未知数的次数。',
      example: '$5x-y=9$ 是二元一次方程；$x+y^2=1$ 不是（$y^2$ 是二次）；$xy=4$ 也不是（$xy$ 含两个未知数相乘，也不是一次项）。',
      pitfall: '判断前先整理：把方程化成左右两边没有同类项的样子再看。',
    },
    {
      title: '二元一次方程组',
      body: '由几个方程组成的一组方程叫**方程组**。方程组里一共含有两个未知数，且含未知数的项都是一次项，就是二元一次方程组。其中某个方程可以只含一个未知数。',
      example: '$\\begin{cases}y=-3\\\\x+4y=0\\end{cases}$ 是二元一次方程组；$\\begin{cases}x+y=2\\\\y-z=1\\end{cases}$ 含三个未知数，不是。',
    },
    {
      title: '方程组的解',
      body: '使方程组里**每一个**方程左右两边都相等的两个未知数的值，叫方程组的解，写成 $\\begin{cases}x=\\cdots\\\\y=\\cdots\\end{cases}$。只满足其中一个方程的，不是方程组的解。',
      example: '$\\begin{cases}x=3\\\\y=2\\end{cases}$ 代入 $\\begin{cases}x-y=1\\\\x+2y=7\\end{cases}$：$3-2=1$，$3+4=7$，两个都成立，是解。',
    },
    {
      title: '二元一次方程有无数个解',
      body: '单独一个二元一次方程，任给 $x$ 一个值，就能求出对应的 $y$，所以它有无数个解。如果题目要求 $x$、$y$ 都是正整数，就只剩有限个，可以逐个试。',
      example: '$x+4y=13$ 的正整数解：$y=1$ 时 $x=9$，$y=2$ 时 $x=5$，$y=3$ 时 $x=1$，共 3 组。',
      pitfall: '试的时候先从系数大的那个未知数试起，要试的次数少。',
    },
    {
      title: '列方程组',
      body: '设两个未知数，找出题目里的**两个**相等关系，各列一个方程，合起来就是方程组。设了几个未知数，就要找几个相等关系。',
      example: '两个数的和是 10、差是 4：设较大的数为 $x$、较小的数为 $y$，得 $\\begin{cases}x+y=10\\\\x-y=4\\end{cases}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '9.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列方程组中，是二元一次方程组的是',
      options: [
        '$\\begin{cases}x+y=3\\\\xy=2\\end{cases}$',
        '$\\begin{cases}x-y=1\\\\y+z=4\\end{cases}$',
        '$\\begin{cases}x=4\\\\x+3y=1\\end{cases}$',
        '$\\begin{cases}x^2-y=1\\\\x+y=5\\end{cases}$',
      ],
      answer: 2,
      explain: [
        'A：$xy$ 是两个未知数相乘，不是一次项。',
        'B：一共有 $x$、$y$、$z$ 三个未知数。',
        'C：一共两个未知数，每一项都是一次项。第一个方程只含 $x$ 没关系，是二元一次方程组。',
        'D：$x^2$ 是二次项。',
        '常见错误：以为每个方程都必须同时含两个未知数，把 C 排除掉。',
      ],
      verify: () => {
        // 每个选项：[未知数个数, 是否有非一次项]
        const info = [[2, true], [3, false], [2, false], [2, true]];
        return info.findIndex(([n, bad]) => n === 2 && !bad);
      },
    },
    {
      id: '9.1-b02',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① $\\begin{cases}x=1\\\\y=2\\end{cases}$ 是方程 $x+y=3$ 的一个解；② 方程 $x+y=3$ 只有有限个解；③ $\\begin{cases}x=1\\\\y=2\\end{cases}$ 是方程组 $\\begin{cases}x+y=3\\\\2x-y=0\\end{cases}$ 的解；④ 方程组的解必须满足方程组里的每一个方程；⑤ 满足方程组中某一个方程的一对值，就是这个方程组的解。其中正确的有',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 2,
      explain: [
        '① 对：$1+2=3$。',
        '② 错：$x$ 任取一个值都能求出 $y$，有无数个解。',
        '③ 对：$1+2=3$，$2\\times1-2=0$，两个方程都成立。',
        '④ 对，这是方程组的解的意思。⑤ 错，只满足一个方程不够。',
        '正确的是 ①③④，共 3 个。',
      ],
      verify: () => {
        const ok = [1 + 2 === 3, false, 1 + 2 === 3 && 2 * 1 - 2 === 0, true, false];
        return ok.filter(Boolean).length - 1;
      },
    },
    {
      id: '9.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '已知 $(m-2)x^{|m|-1}+3y=5$ 是关于 $x$、$y$ 的二元一次方程，求 $m$ 的值。',
      blanks: [{ kind: 'num', label: '$m=$', answer: '-2' }],
      explain: [
        '$x$ 的次数要是 1：$|m|-1=1$，$|m|=2$，$m=2$ 或 $-2$。',
        '还要保证 $x$ 这一项真的存在：系数 $m-2\\ne0$，所以 $m\\ne2$。',
        '所以 $m=-2$。常见错误：只看次数，答 $\\pm2$。$m=2$ 时方程变成 $3y=5$，只剩一个未知数。',
      ],
      verify: () => {
        const ms = [];
        for (let m = -10; m <= 10; m++) if (Math.abs(m) - 1 === 1 && m - 2 !== 0) ms.push(m);
        return ms.length === 1 ? ms[0] : null;
      },
    },
    {
      id: '9.1-b04',
      level: 'basic',
      type: 'choice',
      stem: '方程组 $\\begin{cases}2x+y=5\\\\x-3y=-1\\end{cases}$ 的解是',
      options: [
        '$\\begin{cases}x=1\\\\y=3\\end{cases}$',
        '$\\begin{cases}x=2\\\\y=1\\end{cases}$',
        '$\\begin{cases}x=4\\\\y=-3\\end{cases}$',
        '$\\begin{cases}x=-1\\\\y=0\\end{cases}$',
      ],
      answer: 1,
      explain: [
        '把每组值代入两个方程检验：',
        'A：$2+3=5$ 成立，但 $1-9=-8\\ne-1$。C：$8-3=5$ 成立，但 $4+9=13\\ne-1$。D：$-2+0\\ne5$。',
        'B：$4+1=5$，$2-3=-1$，两个都成立，是方程组的解。',
        '常见错误：只代入第一个方程，看到 A 成立就选了。',
      ],
      verify: () => [[1, 3], [2, 1], [4, -3], [-1, 0]].findIndex(([x, y]) => 2 * x + y === 5 && x - 3 * y === -1),
    },
    {
      id: '9.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\begin{cases}x=-3\\\\y=k\\end{cases}$ 是方程 $2x-y=1$ 的一个解，求 $k$。',
      blanks: [{ kind: 'num', label: '$k=$', answer: '-7' }],
      explain: [
        '代入：$2\\times(-3)-k=1$，$-6-k=1$，$k=-7$。',
        '常见错误：移项时符号出错，得到 $k=7$ 或 $k=-5$。',
      ],
      verify: () => F(2).mul(-3).sub(1),
    },
    {
      id: '9.1-b06',
      level: 'basic',
      type: 'choice',
      stem: '买 3 支笔和 2 本本子共花 16 元，一本本子比一支笔贵 3 元。设一支笔 $x$ 元、一本本子 $y$ 元，列出的方程组是',
      options: [
        '$\\begin{cases}3x+2y=16\\\\x-y=3\\end{cases}$',
        '$\\begin{cases}2x+3y=16\\\\y-x=3\\end{cases}$',
        '$\\begin{cases}3x+2y=16\\\\y-x=3\\end{cases}$',
        '$\\begin{cases}3x+2y=16\\\\y+3=x\\end{cases}$',
      ],
      answer: 2,
      explain: [
        '3 支笔 $3x$ 元、2 本本子 $2y$ 元，共 16 元：$3x+2y=16$。',
        '本子比笔贵 3 元：本子的价钱 − 笔的价钱 = 3，即 $y-x=3$。',
        'A、D 把谁贵弄反了（D 相当于笔比本子贵 3 元），B 把数量和单价配错了。',
      ],
      verify: () => {
        // 用一组满足题意的价钱检验：笔 2 元、本子 5 元
        const x = 2, y = 5;
        const sys = [
          [3 * x + 2 * y === 16, x - y === 3], [2 * x + 3 * y === 16, y - x === 3],
          [3 * x + 2 * y === 16, y - x === 3], [3 * x + 2 * y === 16, y + 3 === x],
        ];
        return sys.findIndex(([a, b]) => a && b);
      },
    },
    {
      id: '9.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '二元一次方程 $2x+3y=18$ 有几组非负整数解（$x$、$y$ 都是不小于 0 的整数）？',
      blanks: [{ kind: 'num', answer: '4', suffix: '组' }],
      explain: [
        '$2x$ 和 18 都是偶数，所以 $3y$ 是偶数，$y$ 是偶数；又 $3y\\le18$，$y$ 取 0、2、4、6。',
        '对应 $x=9$、6、3、0。共 4 组：$(9,0)$、$(6,2)$、$(3,4)$、$(0,6)$。',
        '常见错误：把“非负整数”当成“正整数”，漏掉 $y=0$ 和 $x=0$ 的两组，答 2 组。',
      ],
      verify: () => {
        let c = 0;
        for (let x = 0; x <= 18; x++) for (let y = 0; y <= 18; y++) if (2 * x + 3 * y === 18) c++;
        return c;
      },
    },
    {
      id: '9.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\begin{cases}x=2\\\\y=1\\end{cases}$ 是方程组 $\\begin{cases}ax+y=7\\\\x-by=4\\end{cases}$ 的解，求 $a+b$ 的值。',
      blanks: [{ kind: 'num', label: '$a+b=$', answer: '1' }],
      explain: [
        '解要满足每一个方程。代入第一个：$2a+1=7$，$a=3$。',
        '代入第二个：$2-b=4$，$b=-2$。',
        '$a+b=3+(-2)=1$。常见错误：$2-b=4$ 解成 $b=2$，得到 5。',
      ],
      verify: () => {
        const a = F(7).sub(1).div(2), b = F(2).sub(4);
        return a.add(b);
      },
    },
    {
      id: '9.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '对于方程 $x-2y=4$，当 $y$ 分别取 $-1$、$0$、$3$ 时，对应的三个 $x$ 的值之和是多少？',
      blanks: [{ kind: 'num', answer: '16' }],
      explain: [
        '先把方程变形：$x=4+2y$。',
        '$y=-1$ 时 $x=2$；$y=0$ 时 $x=4$；$y=3$ 时 $x=10$。',
        '和为 $2+4+10=16$。常见错误：移项忘了变号，写成 $x=4-2y$，得到 $6+4+(-2)=8$；或者把 $y=-1$ 代成 $x-2=4$。',
      ],
      verify: () => [-1, 0, 3].reduce((s, y) => s + (4 + 2 * y), 0),
    },

    // ---------- 扩展 ----------
    {
      id: '9.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$ 是不为 0 的整数。',
      blanks: [
        { kind: 'nums', label: '(1) 如果 $(a+1)x^{|a|}+2y=3$ 是关于 $x$、$y$ 的二元一次方程，$a$ 的值是（有几个就填几个，用逗号隔开）', answer: ['1'] },
        { kind: 'nums', label: '(2) 如果方程组 $\\begin{cases}(a+1)x^{|a|}+2y=3\\\\x-y=4\\end{cases}$ 是二元一次方程组，$a$ 的值是（有几个就填几个，用逗号隔开）', answer: ['1', '-1'] },
      ],
      explain: [
        '两问都要求 $x$ 的次数是 1：$|a|=1$，$a=1$ 或 $-1$。',
        '(1) 单独一个方程要是二元一次方程，必须真的含 $x$：系数 $a+1\\ne0$，排除 $a=-1$，只有 $a=1$。',
        '(2) 方程组只要求整个方程组一共含两个未知数、每项都是一次项。$a=-1$ 时第一个方程变成 $2y=3$，只含 $y$，但第二个方程含 $x$、$y$，整个方程组仍然是二元一次方程组。',
        '所以 (2) 的答案是 $1$ 和 $-1$。这就是两问的区别：方程组里允许某个方程只含一个未知数。',
      ],
      verify: () => {
        const one = [], sys = [];
        for (let a = -5; a <= 5; a++) {
          if (a === 0 || Math.abs(a) !== 1) continue;
          if (a + 1 !== 0) one.push(a);
          sys.push(a); // 第二个方程已含 x、y，第一个方程的 x 项消失也不影响
        }
        return [one, sys];
      },
    },
    {
      id: '9.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '用 100 元恰好买单价 8 元和 12 元的两种笔记本，两种都要买，钱正好用完。',
      blanks: [
        { kind: 'num', label: '(1) 一共有几种买法？', answer: '4', suffix: '种' },
        { kind: 'num', label: '(2) 要使买到的笔记本总本数最少，最少是', answer: '9', suffix: '本' },
      ],
      explain: [
        '设 8 元的买 $x$ 本、12 元的买 $y$ 本，$8x+12y=100$，两边除以 4：$2x+3y=25$，$x$、$y$ 都是正整数。',
        '$2x$ 是偶数，25 是奇数，所以 $3y$ 是奇数，$y$ 是奇数，且 $3y<25$，$y$ 取 1、3、5、7。',
        '(1) $y=1$：$x=11$；$y=3$：$x=8$；$y=5$：$x=5$；$y=7$：$x=2$。共 4 种。',
        '(2) 总本数分别是 12、11、10、9，最少 9 本（8 元的 2 本、12 元的 7 本）。贵的买得越多，本数越少。',
        '常见错误：没有两边约去 4 就去试，漏掉情况；或者把 $y=0$ 也算进去。',
      ],
      verify: () => {
        const s = [];
        for (let x = 1; x <= 12; x++) for (let y = 1; y <= 8; y++) if (8 * x + 12 * y === 100) s.push(x + y);
        return [s.length, Math.min(...s)];
      },
    },
    {
      id: '9.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '活动室里有若干张三条腿的凳子和四条腿的椅子，每张上面都坐着一个人。数一数，人的腿、凳子腿和椅子腿一共 39 条。凳子和椅子都至少有一张。',
      blanks: [
        { kind: 'num', label: '(1) 凳子有', answer: '3', suffix: '张' },
        { kind: 'num', label: '(2) 活动室里一共坐着', answer: '7', suffix: '人' },
      ],
      explain: [
        '关键：每张凳子连同坐在上面的人是 $3+2=5$ 条腿，每张椅子连同人是 $4+2=6$ 条腿。',
        '设凳子 $x$ 张、椅子 $y$ 张：$5x+6y=39$，$x$、$y$ 是正整数。',
        '$6y<39$，$y$ 取 1～6：$39-6y$ 依次是 33、27、21、15、9、3，只有 15 是 5 的倍数，此时 $y=4$，$x=3$。',
        '(1) 凳子 3 张；(2) 人数 $=3+4=7$。',
        '常见错误：忘了人也有腿，列成 $3x+4y=39$，得出好几组答案。',
      ],
      verify: () => {
        const s = [];
        for (let x = 1; x < 10; x++) for (let y = 1; y < 10; y++) if (3 * x + 4 * y + 2 * (x + y) === 39) s.push([x, y]);
        return s.length === 1 ? [s[0][0], s[0][0] + s[0][1]] : null;
      },
    },
    {
      id: '9.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\begin{cases}x=2\\\\y=1\\end{cases}$ 既是方程 $ax+by=5$ 的解，又是方程 $bx+ay=4$ 的解。',
      blanks: [
        { kind: 'num', label: '(1) $a+b=$', answer: '3' },
        { kind: 'num', label: '(2) $a-b=$', answer: '1' },
      ],
      explain: [
        '代入得 $2a+b=5$，$2b+a=4$。这里有两个参数，但不必先分别求出 $a$、$b$，可以整体看。',
        '(1) 两式相加：$3a+3b=9$，所以 $a+b=3$。',
        '(2) 两式相减：$(2a+b)-(a+2b)=a-b=5-4=1$。',
        '（由和 3、差 1 还可以得到 $a=2$，$b=1$，代回检验成立。）',
        '常见错误：把 $bx+ay$ 代成 $2a+b$，两个方程写成一样的。',
      ],
      verify: () => {
        for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) {
          if (2 * a + b === 5 && 2 * b + a === 4) return [a + b, a - b];
        }
        return null;
      },
    },
    {
      id: '9.1-e05',
      level: 'extended',
      type: 'choice',
      stem: '用一根绳子量井深：把绳子折成三等份去量，井外还多出 4 尺；把绳子折成四等份去量，井外还多出 1 尺。设绳长 $x$ 尺、井深 $y$ 尺，列出的方程组是',
      options: [
        '$\\begin{cases}\\frac{x}{3}=y-4\\\\\\frac{x}{4}=y-1\\end{cases}$',
        '$\\begin{cases}\\frac{x}{3}=y+4\\\\\\frac{x}{4}=y+1\\end{cases}$',
        '$\\begin{cases}3x=y+4\\\\4x=y+1\\end{cases}$',
        '$\\begin{cases}\\frac{x}{3}+4=y\\\\\\frac{x}{4}+1=y\\end{cases}$',
      ],
      answer: 1,
      explain: [
        '折成三等份后，每份长 $\\frac x3$ 尺，比井深长 4 尺（井外多出来）：$\\frac x3=y+4$。',
        '折成四等份，每份 $\\frac x4$，比井深长 1 尺：$\\frac x4=y+1$。',
        'A、D 把“多出”当成“不够”；C 把折成三份当成三根绳子接起来。',
        '（这个方程组的解是 $x=36$，$y=8$：$12=8+4$，$9=8+1$。）',
      ],
      verify: () => {
        const x = 36, y = 8;
        const sys = [[x / 3 === y - 4, x / 4 === y - 1], [x / 3 === y + 4, x / 4 === y + 1], [3 * x === y + 4, 4 * x === y + 1], [x / 3 + 4 === y, x / 4 + 1 === y]];
        return sys.findIndex(([a, b]) => a && b);
      },
    },
    {
      id: '9.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $(k^2-4)x^2+(k+2)x+(k-7)y=5$ 是关于 $x$、$y$ 的二元一次方程。',
      blanks: [
        { kind: 'num', label: '(1) $k=$', answer: '2' },
        { kind: 'num', label: '(2) 如果 $\\begin{cases}x=m\\\\y=-m\\end{cases}$ 是这个方程的一个解，那么 $m=$', answer: '5/9' },
      ],
      explain: [
        '(1) 不能有二次项：$k^2-4=0$，$k=2$ 或 $-2$。',
        '还要真的含 $x$ 和 $y$：$k+2\\ne0$，排除 $k=-2$；$k-7\\ne0$，$k\\ne7$。所以 $k=2$。',
        '(2) $k=2$ 时方程是 $4x-5y=5$。代入 $x=m$、$y=-m$：$4m+5m=5$，$m=\\frac59$。',
        '常见错误：(1) 只看 $x^2$ 的系数为 0，答 $\\pm2$（$k=-2$ 时 $x$ 这一项也没了，只剩 $-9y=5$）；(2) 代入 $y=-m$ 时符号出错，得 $-m=5$。',
      ],
      verify: () => {
        const ks = [];
        for (let k = -10; k <= 10; k++) if (k * k - 4 === 0 && k + 2 !== 0 && k - 7 !== 0) ks.push(k);
        if (ks.length !== 1) return null;
        const k = ks[0];
        // (k+2)m + (k-7)(-m) = 5
        const m = F(5).div(F(k + 2).sub(k - 7));
        return [k, m];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '9.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '研究二元一次方程 $2x+3y=n$（$n$ 是正整数）的正整数解的组数。',
      blanks: [
        { kind: 'num', label: '(1) $n=20$ 时，正整数解有', answer: '3', suffix: '组' },
        { kind: 'num', label: '(2) 正整数解恰好有 2 组时，$n$ 最大是', answer: '18' },
        { kind: 'num', label: '(3) 正整数解恰好有 2 组的 $n$ 一共有几个？', answer: '6', suffix: '个' },
      ],
      explain: [
        '(1) $2x=20-3y$ 要是正偶数，$y$ 是偶数且 $3y<20$：$y=2,4,6$，$x=7,4,1$，共 3 组。',
        '怎么想到的：$y$ 每增加 2，$3y$ 增加 6，$x$ 就减少 3。所以所有的解排成一串，$y$ 隔 2 取一个，$x$ 依次少 3。解的组数由“$x$ 能减几次 3 还保持正数”决定。',
        '恰有 2 组：最小的那组 $y$（记为 $y_0$，是 1 或 2，和 $n$ 奇偶相同）对应的 $x_0$ 要满足：$x_0-3\\ge1$（第二组还存在），$x_0-6\\le0$（没有第三组），即 $x_0=4,5,6$。',
        '$y_0=1$ 时 $n=2x_0+3=11,13,15$；$y_0=2$ 时 $n=2x_0+6=14,16,18$。',
        '为什么更大的 $n$ 不会再只有 2 组：$n$ 增加 6 时，原来的每组解把 $x$ 加 3 仍然是解，组数不会变少。$n=19$～$24$ 时逐个数一下都至少有 3 组，所以 $n\\ge19$ 以后都至少有 3 组。',
        '(2) 最大是 18（解为 $(6,2)$、$(3,4)$，$y=6$ 时 $x=0$，不算）。(3) 共 11、13、14、15、16、18 这 6 个。',
        '常见错误：以为 $n$ 越大解越多，没注意 $n=17$ 就已经有 3 组，而 $n=18$ 只有 2 组；或者把 $x=0$ 的情况算进去。',
      ],
      verify: () => {
        const cnt = n => {
          let c = 0;
          for (let x = 1; 2 * x < n; x++) for (let y = 1; 3 * y < n; y++) if (2 * x + 3 * y === n) c++;
          return c;
        };
        const two = [];
        for (let n = 1; n <= 200; n++) if (cnt(n) === 2) two.push(n);
        return [cnt(20), Math.max(...two), two.length];
      },
    },
    {
      id: '9.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '有足够多的 3 克砝码和 7 克砝码，称东西时砝码只能放在天平的同一边，可以两种都用，也可以只用其中一种。',
      blanks: [
        { kind: 'num', label: '(1) 不能恰好称出的整数克重量中，最大的是', answer: '11', suffix: '克' },
        { kind: 'num', label: '(2) 1～30 克的整数克重量中，不能恰好称出的有几个？', answer: '6', suffix: '个' },
      ],
      explain: [
        '能称出 $n$ 克，就是方程 $3x+7y=n$ 有非负整数解（$x$、$y$ 是两种砝码的个数，可以为 0）。',
        '按用几个 7 克来分：$y=0$ 能称 3 的倍数；$y=1$ 能称 7、10、13、……（除以 3 余 1）；$y=2$ 能称 14、17、20、……（除以 3 余 2）。',
        '除以 3 余 1 的数，从 7 起都能称，1、4 不能；除以 3 余 2 的数，从 14 起都能称，2、5、8、11 不能；3 的倍数都能称。',
        '(1) 不能称的是 1、2、4、5、8、11，最大是 11 克。验证：11 减去 0 个、1 个 7 得 11、4，都不是 3 的倍数。',
        '(2) 12、13、14 这连续三个都能称（$12=3\\times4$，$13=3\\times2+7$，$14=7\\times2$），以后每个重量都比前面某一个多 3 克，再加一个 3 克砝码就行，所以 12 以后都能称。1～30 中不能称的只有这 6 个。',
      ],
      verify: () => {
        const can = n => { for (let y = 0; 7 * y <= n; y++) if ((n - 7 * y) % 3 === 0) return true; return false; };
        const bad = [];
        for (let n = 1; n <= 30; n++) if (!can(n)) bad.push(n);
        for (let n = 31; n <= 200; n++) if (!can(n)) return null;
        return [Math.max(...bad), bad.length];
      },
    },
    {
      id: '9.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '已知关于 $x$、$y$ 的方程组 $\\begin{cases}(a-1)x+y^{|b|}=3\\\\x^{|a|}-(b-1)y=2\\end{cases}$ 是二元一次方程组，其中 $a$、$b$ 是不为 0 的整数。',
      blanks: [
        { kind: 'num', label: '(1) 满足条件的 $a$、$b$ 一共有几组？', answer: '4', suffix: '组' },
        { kind: 'num', label: '(2) 如果 $\\begin{cases}x=2\\\\y=7\\end{cases}$ 是这个方程组的解，那么 $a=$', answer: '-1' },
        { kind: 'num', label: '　 $b=$', answer: '1' },
      ],
      explain: [
        '(1) 每一项都要是一次项：$x^{|a|}$ 要求 $|a|=1$，$a=\\pm1$；$y^{|b|}$ 要求 $|b|=1$，$b=\\pm1$。',
        '再看会不会有未知数“消失”：$a=1$ 时第一个方程的 $x$ 项没了，变成 $y=3$；$b=1$ 时第二个方程的 $y$ 项没了，变成 $x=2$。但第一个方程总含 $y$、第二个方程总含 $x$，整个方程组始终含两个未知数，都是二元一次方程组。',
        '所以 $(a,b)$ 可以是 $(1,1)$、$(1,-1)$、$(-1,1)$、$(-1,-1)$，共 4 组。其中 $(1,1)$ 时两个方程各只含一个未知数（$y=3$、$x=2$），但整个方程组含两个未知数、每项都是一次项，按定义仍是二元一次方程组。',
        '(2) 把 $x=2$、$y=7$ 代入第一个方程：$2(a-1)+7=3$，$a=-1$；代入第二个方程：$2^{|a|}-7(b-1)=2$，$|a|=1$，得 $7(b-1)=0$，$b=1$。',
        '所以 $a=-1$，$b=1$。这时方程组是 $\\begin{cases}-2x+y=3\\\\x=2\\end{cases}$：$b=1$ 让第二个方程的 $y$ 项消失，但它仍是二元一次方程组。',
        '常见错误：(1) 以为系数 $a-1$、$b-1$ 不能为 0，只剩 1 组；其实方程组里允许某个方程只含一个未知数。',
      ],
      verify: () => {
        const combos = [];
        for (const a of [-3, -2, -1, 1, 2, 3]) for (const b of [-3, -2, -1, 1, 2, 3]) {
          if (Math.abs(a) !== 1 || Math.abs(b) !== 1) continue;
          const hasY1 = true, hasX2 = true; // 第一个方程总有 y，第二个总有 x
          if (hasY1 && hasX2) combos.push([a, b]);
        }
        const fit = combos.filter(([a, b]) => (a - 1) * 2 + Math.pow(7, Math.abs(b)) === 3 && Math.pow(2, Math.abs(a)) - (b - 1) * 7 === 2);
        return fit.length === 1 ? [combos.length, fit[0][0], fit[0][1]] : null;
      },
    },
    {
      id: '9.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $\\begin{cases}x=1\\\\y=-1\\end{cases}$ 和 $\\begin{cases}x=2\\\\y=3\\end{cases}$ 都是关于 $x$、$y$ 的方程 $ax+by=c$ 的解，其中 $a$、$b$、$c$ 都不为 0。',
      blanks: [
        { kind: 'ratio', label: '(1) $a:c=$', answer: '4:5' },
        { kind: 'num', label: '(2) 这个方程的解中，当 $x=5$ 时，$y=$', answer: '15' },
        { kind: 'num', label: '(3) 如果这个方程和方程 $x+py=q$ 有一个公共解，且公共解中 $x=3$，那么 $q-7p=$', answer: '3' },
      ],
      explain: [
        '代入得 $a-b=c$，$2a+3b=c$。三个参数只有两个等式，求不出具体的值，但能求出它们之间的关系。',
        '两个式子都等于 $c$，所以它们相等：$a-b=2a+3b$，移项得 $a=-4b$。再代回 $c=a-b=-4b-b=-5b$。',
        '(1) $a:c=(-4b):(-5b)=4:5$。',
        '(2) 把 $a=-4b$、$c=-5b$ 代入方程：$-4bx+by=-5b$。$b\\ne0$，两边除以 $b$：$-4x+y=-5$，即 $y=4x-5$。$x=5$ 时 $y=15$。',
        '不管 $b$ 是多少，方程其实都是同一个方程 $y=4x-5$。',
        '(3) 公共解满足 $y=4x-5$，$x=3$ 时 $y=7$。它也满足 $x+py=q$：$3+7p=q$，所以 $q-7p=3$。',
        '常见错误：以为参数求不出来就做不下去；(2) 中直接用两个已知解“按比例”推算。',
      ],
      verify: () => {
        const b = F(1);
        const a = b.mul(-4), c = a.sub(b);
        if (!F(2).mul(a).add(F(3).mul(b)).eq(c)) return null;
        const y5 = c.sub(a.mul(5)).div(b);
        const y3 = c.sub(a.mul(3)).div(b);
        // q - 7p = 3 + py - 7p，y3=7 时恒为 3
        const p = F(2);
        const q = F(3).add(p.mul(y3));
        return [[a.div(c).mul(5), 5], y5, q.sub(p.mul(7))];
      },
    },
    {
      id: '9.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '一个两位数，把它的个位数字和十位数字对调，得到的新两位数比原数大 27。',
      blanks: [
        { kind: 'num', label: '(1) 这样的两位数一共有几个？', answer: '6', suffix: '个' },
        { kind: 'num', label: '(2) 如果不要求“大 27”，只要求新两位数比原数大，并且原数与新数的和、新数与原数的差都是某个整数的平方，原数是', answer: '56' },
      ],
      explain: [
        '设原数十位数字 $a$、个位数字 $b$，原数 $10a+b$，新数 $10b+a$。新数也是两位数，所以 $b\\ne0$；$a\\ge1$。',
        '$(10b+a)-(10a+b)=27$，$9b-9a=27$，$b-a=3$。',
        '(1) $a$ 取 1～6，$b=a+3$ 取 4～9：14、25、36、47、58、69，共 6 个。',
        '(2) 两位数一共几十个，逐个试太慢，先看和与差的结构：和 $=(10a+b)+(10b+a)=11(a+b)$，差 $=(10b+a)-(10a+b)=9(b-a)$。',
        '和是平方数：$11(a+b)$ 里已有一个 11，$a+b$ 也要含 11，而 $a+b\\le18$，所以 $a+b=11$。差是平方数：$9=3\\times3$，所以 $b-a$ 要是平方数，只能是 1、4、9。',
        '$a+b=11$ 是奇数，$b-a$ 和 $a+b$ 同奇同偶（两者相差 $2a$），也是奇数，只能是 1 或 9。$b-a=9$ 时 $b=10$，不是数字；所以 $b-a=1$，$b=6$，$a=5$。',
        '原数 56：$56+65=121=11^2$，$65-56=9=3^2$。',
        '常见错误：把差写成 $(10a+b)-(10b+a)$，得到 $a-b=3$，方向反了；或者 (2) 逐个试时漏算。',
      ],
      verify: () => {
        const ok = [];
        for (let n = 10; n <= 99; n++) {
          const a = Math.floor(n / 10), b = n % 10;
          if (b !== 0 && 10 * b + a - n === 27) ok.push(n);
        }
        const isSq = v => { const r = Math.round(Math.sqrt(v)); return r * r === v; };
        const sq = [];
        for (let n = 10; n <= 99; n++) {
          const a = Math.floor(n / 10), b = n % 10, m = 10 * b + a;
          if (b !== 0 && m > n && isSq(n + m) && isSq(m - n)) sq.push(n);
        }
        return [ok.length, sq.length === 1 ? sq[0] : null];
      },
    },
  ],
});
