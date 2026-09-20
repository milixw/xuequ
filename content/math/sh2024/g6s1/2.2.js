'use strict';

// 上海数学六年级上册 · 2.2 代数式与代数式的值
// 知识范围：代数式的概念、用代数式表示数量关系、求代数式的值（代入计算）、整体代换；可以使用第 1 章和 2.1 的全部内容
// 还没学：一次式与合并同类项（2.3）、方程（第 3 章）

const FIG22 = {
  road: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 288 144\" width=\"288\" height=\"144\" font-family=\"Times New Roman, serif\"><rect x=\"26\" y=\"18\" width=\"240\" height=\"100\" fill=\"#eef5ea\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><rect x=\"150\" y=\"18\" width=\"18\" height=\"100\" fill=\"#d9d9d9\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><rect x=\"26\" y=\"66\" width=\"240\" height=\"18\" fill=\"#d9d9d9\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"72\" y=\"138\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">a</text><text x=\"14\" y=\"73\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">b</text><text x=\"159\" y=\"14\" text-anchor=\"middle\" font-size=\"13\">1</text><line x1=\"26\" y1=\"126\" x2=\"266\" y2=\"126\" stroke=\"#999\" stroke-width=\"1\"/><line x1=\"26\" y1=\"122\" x2=\"26\" y2=\"130\" stroke=\"#999\" stroke-width=\"1\"/><line x1=\"266\" y1=\"122\" x2=\"266\" y2=\"130\" stroke=\"#999\" stroke-width=\"1\"/><text x=\"276\" y=\"80\" text-anchor=\"middle\" font-size=\"13\">1</text><text x=\"66\" y=\"50\" font-size=\"13\">草地</text></svg>",
};

Content.section({
  id: 'math/sh2024/g6s1/2.2',
  title: '代数式与代数式的值',
  review: { status: 'pending' },
  audit: { blind: '2026-09-20', rounds: 2, note: '子代理盲解复核两轮：答案全部一致；第 2 轮按意见重做 c01(4)(5)（改为最值与调整法）、c02(4)、c03（改为正整数下求 abcd 最值）、c05(5)，并升级 b01/b04/e01/e03/e04/e05/e09/e10，判定整节通过' },

  intro: [
    {
      title: '什么是代数式',
      body: '用加、减、乘、除、乘方这些运算符号和括号，把数与表示数的字母连接起来，所组成的式子叫做**代数式**。单独一个数、单独一个字母，也是代数式。带等号、不等号的式子不是代数式，它们是等式、不等式。',
      example: '$5x$、$\\frac{a}{3}$、$-2$、$m$ 都是代数式；$3+4=7$ 和 $x>1$ 不是代数式。',
    },
    {
      title: '代数式的值',
      body: '用具体的数代替代数式里的字母，按运算顺序算出的结果，叫做这个**代数式的值**。字母取的数不同，代数式的值一般也不同。',
      example: '当 $x=-4$ 时，$3-2x=3-2\\times(-4)=3+8=11$。',
    },
    {
      title: '代入时要小心',
      body: '代入求值有三个要点：① 原来省略的乘号要补回来；② 代入负数或分数时，一定要给它加上括号；③ 先看清运算顺序，再动笔。',
      example: '当 $x=5$ 时，$-x^2=-(5\\times 5)=-25$，而 $(-x)^2=(-5)\\times(-5)=25$，两者不同。',
      pitfall: '$\\frac{1}{2}xy$ 中的 $x$、$y$ 都要代入，别漏掉一个字母。',
    },
    {
      title: '整体代换',
      body: '有些题目求不出每个字母各是多少，但只要把式子凑成题目已经告诉你的那一部分，就能算出结果。这种“把一整块看成一个数”的办法叫整体代换。',
      example: '已知 $m-n=2$，求 $5-(m-n)$ 的值：把 $m-n$ 整体看成 2，得 $5-2=3$。',
    },
    {
      title: '读懂代数式的意思',
      body: '同一个代数式可以表示不同的实际意义；反过来，用代数式描述实际问题时，先要说清每个字母表示什么量、用什么单位。',
      example: '一支笔 $p$ 元、一本本子 $q$ 元，那么 $4p+3q$ 表示买 4 支笔和 3 本本子共付的钱；$100-4p$ 表示用 100 元买 4 支笔后剩下的钱。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '在 $-7$，$3a+2b$，$x-1>0$，$\\frac{m+n}{2}$，$S=ab$，$0$ 这 6 个式子中，代数式的个数是（　　）',
      options: ['3 个', '4 个', '5 个', '6 个'],
      answer: 1,
      explain: [
        '判断的关键只有一条：有没有等号或不等号。有，就是等式或不等式，不是代数式。',
        '$-7$ 是代数式（单独一个数也算）；$3a+2b$ 是；$\\frac{m+n}{2}$ 是（分数线表示除法，也是运算符号）；$0$ 也是（它同样是一个数）。',
        '$x-1>0$ 含不等号，是不等式；$S=ab$ 含等号，是等式（公式）。这两个都不是代数式。',
        '所以代数式共有 4 个，选 B。注意别漏掉 $0$，也别因为 $S=ab$ 里有 $ab$ 就把它算进来。',
      ],
    },
    {
      id: '2.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '当 $a=-3$，$b=\\frac{1}{2}$ 时，求下列代数式的值。',
      blanks: [
        { kind: 'num', label: '(1) $a^2b-2ab=$', answer: '15/2' },
        { kind: 'num', label: '(2) $\\frac{a-b}{a+b}=$', answer: '7/5' },
      ],
      explain: [
        '(1) 代入时给负数加括号：$a^2b=(-3)^2\\times\\frac{1}{2}=9\\times\\frac{1}{2}=\\frac{9}{2}$。',
        '$2ab=2\\times(-3)\\times\\frac{1}{2}=-3$，所以 $a^2b-2ab=\\frac{9}{2}-(-3)=\\frac{9}{2}+3=\\frac{15}{2}$。',
        '这里最容易错的是把 $(-3)^2$ 算成 $-9$，以及减去负数时忘记变成加。',
        '(2) 分子 $a-b=-3-\\frac{1}{2}=-\\frac{7}{2}$，分母 $a+b=-3+\\frac{1}{2}=-\\frac{5}{2}$。',
        '$\\left(-\\frac{7}{2}\\right)\\div\\left(-\\frac{5}{2}\\right)=\\frac{7}{2}\\times\\frac{2}{5}=\\frac{7}{5}$。',
      ],
      verify: () => {
        const a = F(-3), b = F('1/2');
        return [a.pow(2).mul(b).sub(a.mul(b).mul(2)), a.sub(b).div(a.add(b))];
      },
    },
    {
      id: '2.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '一个长方形的长是 $a$ 厘米，宽比长少 3 厘米（$a>3$）。',
      blanks: [
        { kind: 'expr', label: '(1) 它的周长是（厘米）', answer: '4a-6' },
        { kind: 'expr', label: '(2) 它的面积是（平方厘米）', answer: 'a(a-3)' },
        { kind: 'num', label: '(3) 当 $a=7$ 时，它的面积是（平方厘米）', answer: '28' },
      ],
      explain: [
        '宽 = 长 − 3 = $(a-3)$ 厘米。',
        '(1) 周长 = （长 + 宽）× 2 = $2\\left[a+(a-3)\\right]$。里面两个 $a$ 合起来是 $2a$，所以周长是 $2(2a-3)$，也就是 $(4a-6)$ 厘米。',
        '(2) 面积 = 长 × 宽 = $a(a-3)$ 平方厘米。注意不能写成 $a\\times a-3$。',
        '(3) 把 $a=7$ 代入：$7\\times(7-3)=7\\times 4=28$ 平方厘米。',
        '代入时要先算括号里的 $7-3$，不能算成 $7\\times 7-3$。',
      ],
      verify: () => {
        const peri = a => F(a).add(F(a).sub(3)).mul(2);
        const area = a => F(a).mul(F(a).sub(3));
        const lin = f => `${f(1).sub(f(0))}*a+${f(0)}`;
        const C = area(0);
        const A = area(2).sub(area(1).mul(2)).add(C).div(2);
        const B = area(1).sub(C).sub(A);
        return [lin(peri), `${A}*a^2+${B}*a+${C}`, area(7)];
      },
    },
    {
      id: '2.2-b04',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，**不能**用代数式 $\\frac{a+b}{2}$ 表示的是（　　）',
      options: [
        '$a$ 与 $b$ 的平均数',
        '数轴上表示 $a$、$b$ 两点的中点所表示的数',
        '$a$ 的一半与 $b$ 的一半的和',
        '$a$ 的一半与 $b$ 的和',
      ],
      answer: 3,
      explain: [
        'A 可以：两个数的平均数就是和除以 2。',
        'B 可以：中点表示的数就是两端所表示的数的平均数。',
        'C 可以：$\\frac{a}{2}+\\frac{b}{2}$ 由分配律可以合成 $\\frac{1}{2}(a+b)$，正是 $\\frac{a+b}{2}$。',
        'D 不可以：“$a$ 的一半与 $b$ 的和”是先取 $a$ 的一半，再加上整个 $b$，应写成 $\\frac{a}{2}+b$。',
        '取 $a=2$、$b=4$ 检验：$\\frac{a+b}{2}=3$，C 是 $1+2=3$，D 是 $1+4=5$。只有 D 不同，选 D。',
      ],
      verify: () => {
        const a = F(2), b = F(6);
        const target = a.add(b).div(2);
        const vals = [a.add(b).div(2), a.add(b).div(2), a.div(2).add(b.div(2)), a.div(2).add(b)];
        return vals.findIndex(v => !v.eq(target));
      },
    },
    {
      id: '2.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '华氏温度与摄氏温度的换算办法是：把摄氏温度的数值乘 1.8，再加上 32，就得到华氏温度的数值。',
      blanks: [
        { kind: 'num', label: '(1) 摄氏 25 度对应的华氏温度是（度）', answer: '77' },
        { kind: 'num', label: '(2) 华氏 5 度对应的摄氏温度是（度）', answer: '-15' },
        { kind: 'num', label: '(3) 摄氏温度升高 10 度，华氏温度升高（度）', answer: '18' },
      ],
      explain: [
        '(1) $25\\times 1.8+32=45+32=77$（度）。',
        '(2) 这一问要倒着算：先减去 32，得 $5-32=-27$；再除以 1.8，得 $-27\\div 1.8=-15$（度）。',
        '注意顺序要反过来：正着算是“先乘后加”，倒着算就是“先减后除”。',
        '(3) 设原来是摄氏 $c$ 度，升高后是 $(c+10)$ 度。',
        '华氏温度从 $1.8c+32$ 变成 $1.8(c+10)+32=1.8c+18+32$，多出来的正好是 $1.8\\times 10=18$ 度，与原来的温度是多少无关。',
      ],
      verify: () => {
        const f = c => F(c).mul('1.8').add(32);
        let back = null;
        for (let c = -60; c <= 60; c++) if (f(c).eq(5)) back = c;
        const ups = new Set([-20, 0, 25, 37].map(c => f(c + 10).sub(f(c)).toString()));
        return [f(25), back, ups.size === 1 ? [...ups][0] : null];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '2.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $2a+b=5$。',
      blanks: [
        { kind: 'num', label: '(1) $4a+2b-3=$', answer: '7' },
        { kind: 'num', label: '(2) $10-(2a+b)^2=$', answer: '-15' },
        { kind: 'num', label: '(3) $\\frac{4a+2b-1}{2a+b+4}=$', answer: '1' },
        { kind: 'num', label: '(4) 若还知道 $a-b=1$，则 $(2a+b)+(a-b)=$', answer: '6' },
        { kind: 'num', label: '(5) 由 (4) 可知 $a=$', answer: '2' },
      ],
      explain: [
        '(1)(2)(3) 都求不出 $a$、$b$ 各是多少，只能把式子凑成 $2a+b$ 再整体代入。',
        '(1) $4a+2b$ 是 2 个 $(2a+b)$（分配律：$2(2a+b)=4a+2b$），等于 $2\\times 5=10$，所以原式 $=10-3=7$。',
        '(2) 括号里正好是 $2a+b=5$，原式 $=10-5^2=10-25=-15$。',
        '(3) 分子分母要分别凑：分子 $4a+2b-1=2\\times 5-1=9$；分母 $2a+b+4=5+4=9$。所以商是 $9\\div 9=1$。',
        '(4) 这一问多给了一个条件。两个已知的式子的值都知道，把它们相加就是 $5+1=6$。',
        '(5) 再看 $(2a+b)+(a-b)$ 这个代数式本身：去括号后是 $2a+b+a-b$，其中 $b$ 与 $-b$ 抵消，$2a$ 与 $a$ 合起来是 3 个 $a$，所以它就是 $3a$。',
        '于是 $3a=6$，$a$ 是 6 的三分之一，即 $a=2$。',
        '检验：$a=2$ 时由 $2a+b=5$ 得 $b=1$，确实有 $a-b=1$。',
        '这里没有“解方程”，只是先算出一个代数式的值，再看出这个代数式等于 $3a$。',
      ],
      verify: () => {
        const vals = [new Set(), new Set(), new Set()];
        for (let i = -40; i <= 40; i++) {
          const a = F(i).div(4);
          const b = F(5).sub(a.mul(2));
          vals[0].add(a.mul(4).add(b.mul(2)).sub(3).toString());
          vals[1].add(F(10).sub(a.mul(2).add(b).pow(2)).toString());
          vals[2].add(a.mul(4).add(b.mul(2)).sub(1).div(a.mul(2).add(b).add(4)).toString());
        }
        let hit = null;
        for (let i = -100; i <= 100; i++) {
          const a = F(i).div(4);
          const b = F(5).sub(a.mul(2));
          if (a.sub(b).eq(1)) hit = a;
        }
        return [...vals.map(s => (s.size === 1 ? [...s][0] : null)), F(5).add(1), hit];
      },
    },
    {
      id: '2.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知当 $x=2$ 时，代数式 $ax^3+bx+1$ 的值是 5（$a$、$b$ 是常数）。',
      blanks: [
        { kind: 'num', label: '(1) 当 $x=-2$ 时，$ax^3+bx+1$ 的值是', answer: '-3' },
        { kind: 'num', label: '(2) 当 $x=-2$ 时，$ax^3+bx-6$ 的值是', answer: '-10' },
      ],
      explain: [
        '把 $x=2$ 代入：$8a+2b+1=5$，所以 $8a+2b=4$。$a$、$b$ 各是多少并不知道，但这一整块的值知道了。',
        '(1) 把 $x=-2$ 代入：$a\\times(-2)^3+b\\times(-2)+1=-8a-2b+1$。',
        '而 $-8a-2b$ 正好是 $8a+2b$ 的相反数，等于 $-4$。所以值是 $-4+1=-3$。',
        '(2) 同样地，$-8a-2b-6=-4-6=-10$。',
        '这类题的窍门是：$x$ 变成相反数后，奇数次方的项都变成原来的相反数，把它们看成一整块就行了。',
      ],
      verify: () => {
        const v1 = new Set(), v2 = new Set();
        for (let i = -20; i <= 20; i++) {
          const a = F(i).div(8);
          const b = F(4).sub(a.mul(8)).div(2);   // 由 8a+2b=4 定出 b
          v1.add(a.mul(F(-2).pow(3)).add(b.mul(-2)).add(1).toString());
          v2.add(a.mul(F(-2).pow(3)).add(b.mul(-2)).sub(6).toString());
        }
        return [v1.size === 1 ? [...v1][0] : null, v2.size === 1 ? [...v2][0] : null];
      },
    },
    {
      id: '2.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '小明家到学校的路程是 $s$ 米。他上学时每分钟走 $a$ 米，放学时沿原路返回，每分钟走 $b$ 米。',
      blanks: [
        { kind: 'expr', label: '(1) 他上学路上用的时间是（分钟）', answer: 's/a' },
        { kind: 'expr', label: '(2) 他往返一趟共用的时间是（分钟）', answer: 's/a+s/b' },
        { kind: 'num', label: '(3) 当 $s=600$，$a=100$，$b=60$ 时，他往返一趟的平均速度是每分钟（米）', answer: '75' },
        {
          kind: 'text',
          label: '(4) 要使往返的平均速度恰好等于上学时的速度，放学时的速度应当',
          options: ['等于上学时的速度', '是上学时速度的一半', '是上学时速度的 2 倍', '不管多大都做不到'],
          answer: '等于上学时的速度',
        },
        {
          kind: 'text',
          label: '(5) 要使往返的平均速度达到上学时速度的 2 倍，放学时的速度应当',
          options: ['不管多大都做不到', '是上学时速度的 2 倍', '是上学时速度的 3 倍', '是上学时速度的 4 倍'],
          answer: '不管多大都做不到',
        },
      ],
      explain: [
        '(1) 时间 = 路程 ÷ 速度 = $\\frac{s}{a}$ 分钟。',
        '(2) 回来用 $\\frac{s}{b}$ 分钟，往返共用 $\\frac{s}{a}+\\frac{s}{b}$ 分钟。',
        '(3) 平均速度要用“总路程 ÷ 总时间”，不能把两个速度直接平均。',
        '总路程 $=600\\times 2=1200$ 米；上学用 $600\\div 100=6$ 分钟，回来用 $600\\div 60=10$ 分钟，共 16 分钟。',
        '平均速度 $=1200\\div 16=75$ 米/分。注意它不等于 $(100+60)\\div 2=80$：走得慢的那段花的时间更长，所以平均速度更靠近慢的那个。',
        '(4) 正因为慢的那段“占用的时间多”，只要两段速度不一样，平均速度一定比快的那个小。所以要让平均速度等于上学时的速度，只有放学时也走同样的速度。',
        '(5) 这一问要说明“做不到”。往返的总时间是 $\\frac{s}{a}+\\frac{s}{b}$，它一定比 $\\frac{s}{a}$ 大（因为回来还要花时间）。',
        '而“平均速度是上学速度的 2 倍”就是要求总时间等于 $\\frac{2s}{2a}=\\frac{s}{a}$ 分钟，也就是往返两趟用的时间和上学一趟一样多，这显然不可能。',
        '所以无论放学时走多快，往返的平均速度都到不了上学速度的 2 倍——跑得再快，回来这一趟总要花一点时间。',
      ],
      verify: () => {
        const avg = (s, a, b) => F(s).mul(2).div(F(s).div(a).add(F(s).div(b)));
        let same = null;
        let twice = false;
        for (let b = 10; b <= 100000; b = b + 10) {
          if (avg(600, 100, b).eq(100)) same = b;
          if (avg(600, 100, b).cmp(200) >= 0) twice = true;
        }
        return [
          's/a',
          's/a+s/b',
          avg(600, 100, 60),
          same === 100 ? '等于上学时的速度' : '不管多大都做不到',
          twice ? '是上学时速度的 2 倍' : '不管多大都做不到',
        ];
      },
    },
    {
      id: '2.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $-2$，点 $B$ 表示 6。点 $P$ 从点 $A$ 出发，沿数轴向右匀速运动，速度是每秒 3 个单位长度，运动时间为 $t$ 秒（$t\\ge 0$）。',
      blanks: [
        { kind: 'expr', label: '(1) $t$ 秒时，点 $P$ 表示的数是', answer: '3t-2' },
        { kind: 'num', label: '(2) 当 $t=3$ 时，$P$、$B$ 两点间的距离是', answer: '1' },
        { kind: 'num', label: '(3) 当 $PA=PB$ 时，$t=$', answer: '4/3' },
        { kind: 'nums', label: '(4) 当 $PA=2PB$ 时，$t$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['16/9', '16/3'] },
      ],
      explain: [
        '(1) $t$ 秒走了 $3t$ 个单位，从 $-2$ 向右走，所以 $P$ 表示 $-2+3t$，即 $3t-2$。',
        '(2) $t=3$ 时 $P$ 表示 $3\\times 3-2=7$，它在 $B$（表示 6）的右边，距离是 $7-6=1$。',
        '(3) $PA=PB$ 说明 $P$ 是 $A$、$B$ 的中点，中点表示的数是 $\\frac{-2+6}{2}=2$。由 $3t-2=2$ 反推：$3t=4$，$t=\\frac{4}{3}$。',
        '(4) $P$ 一直向右走，所以 $PA=3t$。但 $PB$ 要分两种情况，这是本题的关键。',
        '情况一：$P$ 还没走过 $B$（即 $3t-2\\le 6$）。此时 $PB=6-(3t-2)=8-3t$，且 $PA+PB=AB=8$。',
        '由 $PA=2PB$ 知 $PA$ 占 8 中的 2 份、$PB$ 占 1 份，所以 $PA=\\frac{16}{3}$，由 $3t=\\frac{16}{3}$ 得 $t=\\frac{16}{9}$。此时 $P$ 表示 $\\frac{10}{3}$，确实在 $A$、$B$ 之间。',
        '情况二：$P$ 已经走过 $B$。此时 $PA-PB=AB=8$，而 $PA=2PB$，所以 $2PB-PB=PB=8$，$PA=16$。由 $3t=16$ 得 $t=\\frac{16}{3}$。此时 $P$ 表示 14，确实在 $B$ 右边。',
        '两种情况都成立，所以 $t=\\frac{16}{9}$ 或 $t=\\frac{16}{3}$。只答一个就漏解了。',
      ],
      verify: () => {
        const p = t => F(t).mul(3).sub(2);
        const lin = f => `${f(1).sub(f(0))}*t+${f(0)}`;
        const eq = [], twice = [];
        for (let i = 0; i <= 7200; i++) {
          const t = F(i).div(720);
          const pa = p(t).sub(-2).abs();
          const pb = p(t).sub(6).abs();
          if (pa.eq(pb)) eq.push(t);
          if (pa.eq(pb.mul(2))) twice.push(t);
        }
        return [lin(p), p(3).sub(6).abs(), eq[0], twice];
      },
    },
    {
      id: '2.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，一块长 $a$ 米、宽 $b$ 米的长方形草坪上修了两条宽都是 1 米的小路：一条竖着、一条横着，其余部分种草（$a>1$，$b>1$）。',
      figure: FIG22.road,
      blanks: [
        { kind: 'expr', label: '(1) 两条小路的总面积是（平方米）', answer: 'a+b-1' },
        { kind: 'expr', label: '(2) 种草部分的面积是（平方米）', answer: '(a-1)(b-1)' },
        { kind: 'num', label: '(3) 当 $a=20$，$b=12$ 时，种草部分的面积是（平方米）', answer: '209' },
      ],
      explain: [
        '(1) 横的小路长 $a$ 米、宽 1 米，面积 $a$ 平方米；竖的小路面积 $b$ 平方米。',
        '但两条路交叉处的那个 $1\\times 1$ 的小方块被数了两次，要减掉 1，所以小路总面积是 $(a+b-1)$ 平方米。忘记减这 1 是最常见的错误。',
        '(2) 草地面积 = 总面积 − 小路面积 = $ab-(a+b-1)$。',
        '也可以换个更漂亮的办法：把竖着的小路想象成向右推到最右边，横着的小路向下推到最下边，草地的四块就拼成了一个完整的长方形，长 $(a-1)$ 米、宽 $(b-1)$ 米，面积是 $(a-1)(b-1)$ 平方米。小路修在哪里都不影响结果。',
        '(3) 代入得 $(20-1)\\times(12-1)=19\\times 11=209$ 平方米。',
        '用另一种办法检验：$20\\times 12-(20+12-1)=240-31=209$，一致。',
      ],
      verify: () => {
        // 按整数格子逐格数：第 5 列和第 4 行是小路
        const grass = (a, b) => {
          let c = 0;
          for (let i = 1; i <= a; i++) for (let j = 1; j <= b; j++) if (i !== 5 && j !== 4) c++;
          return c;
        };
        const boxes = [[20, 12], [9, 7], [11, 6]];
        const okGrass = boxes.every(([a, b]) => grass(a, b) === (a - 1) * (b - 1));
        const okRoad = boxes.every(([a, b]) => a * b - grass(a, b) === a + b - 1);
        return [okRoad ? 'a+b-1' : '0', okGrass ? '(a-1)(b-1)' : '0', grass(20, 12)];
      },
    },
    {
      id: '2.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x$ 是整数，且 $-2\\le x\\le 3$。',
      blanks: [
        { kind: 'num', label: '(1) 代数式 $x^2-2x$ 的最小值是', answer: '-1' },
        { kind: 'num', label: '(2) 代数式 $x^2-2x$ 的最大值是', answer: '8' },
        { kind: 'num', label: '(3) 代数式 $x^2-2x$ 的值中，互不相同的共有（个）', answer: '4' },
      ],
      explain: [
        '$x$ 只能取 $-2,-1,0,1,2,3$ 这 6 个整数，逐个代入即可，注意负数要加括号。',
        '$x=-2$：$(-2)^2-2\\times(-2)=4+4=8$；$x=-1$：$1+2=3$；$x=0$：$0$。',
        '$x=1$：$1-2=-1$；$x=2$：$4-4=0$；$x=3$：$9-6=3$。',
        '(1) 六个值中最小的是 $-1$。特别注意 $x$ 最小时代数式的值反而最大，不能想当然。',
        '(2) 最大的是 8。',
        '(3) 六个值是 $8,\\ 3,\\ 0,\\ -1,\\ 0,\\ 3$，其中 3 出现了两次、0 出现了两次，互不相同的只有 $8,\\ 3,\\ 0,\\ -1$ 共 4 个。',
      ],
      verify: () => {
        const vals = [];
        for (let x = -2; x <= 3; x++) vals.push(F(x).pow(2).sub(F(x).mul(2)));
        vals.sort((p, q) => p.cmp(q));
        const uniq = new Set(vals.map(v => v.toString()));
        return [vals[0], vals[vals.length - 1], uniq.size];
      },
    },
    {
      id: '2.2-e07',
      level: 'extended',
      type: 'fill',
      stem: '已知 $|a|=5$，$|b|=3$，且 $a+b\\ge 0$。',
      blanks: [
        { kind: 'nums', label: '(1) $a-b$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['2', '8'] },
        { kind: 'nums', label: '(2) $\\frac{a}{b}$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['5/3', '-5/3'] },
      ],
      explain: [
        '由绝对值得 $a=5$ 或 $a=-5$，$b=3$ 或 $b=-3$，一共四种搭配，但还要用 $a+b\\ge 0$ 筛一遍。',
        '$a=5,\\ b=3$：和是 8，符合；$a=5,\\ b=-3$：和是 2，符合。',
        '$a=-5,\\ b=3$：和是 $-2$，不符合；$a=-5,\\ b=-3$：和是 $-8$，不符合。',
        '所以只剩两种情况，都有 $a=5$。',
        '(1) $5-3=2$，$5-(-3)=8$，所以 $a-b$ 是 2 或 8。',
        '(2) $\\frac{5}{3}$ 或 $\\frac{5}{-3}=-\\frac{5}{3}$。注意两问的答案都有两个，漏掉一种就错了。',
      ],
      verify: () => {
        const d = [], q = [];
        for (const a of [5, -5]) for (const b of [3, -3]) {
          if (a + b < 0) continue;
          d.push(F(a).sub(b));
          q.push(F(a).div(b));
        }
        return [d, q];
      },
    },
    {
      id: '2.2-e08',
      level: 'extended',
      type: 'fill',
      stem: '一根绳子长 $a$ 米。第一次剪去全长的一半，第二次剪去剩下的一半，第三次再剪去这时剩下的一半。',
      blanks: [
        { kind: 'expr', label: '(1) 三次之后还剩（米）', answer: 'a/8' },
        { kind: 'expr', label: '(2) 若改成每次都剪去 $\\frac{a}{4}$ 米，共剪三次，三次之后还剩（米）', answer: 'a/4' },
        { kind: 'num', label: '(3) 当 $a=8$ 时，第一种剪法剩下的比第二种剩下的少（米）', answer: '1' },
        { kind: 'num', label: '(4) 若把第二种剪法改成每次都剪去全长的 $\\frac{k}{24}$，要使两种剪法剩下的一样多，则 $k=$', answer: '7' },
      ],
      explain: [
        '(1) 每次剩下上一次的一半：$a\\to\\frac{a}{2}\\to\\frac{a}{4}\\to\\frac{a}{8}$，三次后剩 $\\frac{a}{8}$ 米。',
        '(2) 三次共剪去 $3\\times\\frac{a}{4}=\\frac{3a}{4}$ 米，还剩 $a-\\frac{3a}{4}=\\frac{a}{4}$ 米。',
        '(3) $a=8$ 时，第一种剩 1 米，第二种剩 2 米，第一种少 1 米。',
        '注意两种剪法“剪的次数一样，剪掉的却不一样”：第一种每次剪的越来越短。',
        '(4) 要使剩下的都是 $\\frac{a}{8}$，三次一共要剪去 $a-\\frac{a}{8}=\\frac{7a}{8}$。',
        '每次剪去 $\\frac{k}{24}$，三次共剪去 $\\frac{3k}{24}=\\frac{k}{8}$。所以 $\\frac{k}{8}=\\frac{7}{8}$，$k=7$。',
      ],
      verify: () => {
        const half3 = a => F(a).div(2).div(2).div(2);
        const fixed = (a, part) => F(a).sub(F(a).mul(part).mul(3));
        let k = null;
        for (let i = 1; i <= 24; i++) if (fixed(96, F(i).div(24)).eq(half3(96))) k = i;
        return [half3(1) + '*a', fixed(1, F(1).div(4)) + '*a', fixed(8, F(1).div(4)).sub(half3(8)), k];
      },
    },
    {
      id: '2.2-e09',
      level: 'extended',
      type: 'fill',
      stem: '一项工程，甲队单独做 $a$ 天完成，乙队单独做 $b$ 天完成。',
      blanks: [
        { kind: 'expr', label: '(1) 甲队每天完成这项工程的', answer: '1/a' },
        { kind: 'expr', label: '(2) 两队合作一天，完成这项工程的', answer: '1/a+1/b' },
        { kind: 'num', label: '(3) 当 $a=12$，$b=24$ 时，两队合作（天）完成', answer: '8' },
        { kind: 'num', label: '(4) 当 $a=12$，$b=24$ 时，若甲队先做 3 天，余下的由乙队单独做，乙队还要做（天）', answer: '18' },
        { kind: 'num', label: '(5) 当 $a=12$，$b=24$ 时，若两队合作若干天后甲队撤出、由乙队做完，从开工到完工共用 10 天，则甲队做了（天）', answer: '7' },
      ],
      explain: [
        '把整项工程看成 1。',
        '(1) 甲队 $a$ 天完成全部，每天完成 $\\frac{1}{a}$。',
        '(2) 两队合作一天完成 $\\frac{1}{a}+\\frac{1}{b}$。',
        '(3) $a=12$、$b=24$ 时，每天合作完成 $\\frac{1}{12}+\\frac{1}{24}=\\frac{3}{24}=\\frac{1}{8}$，所以 8 天完成。',
        '(4) 甲队 3 天完成 $3\\times\\frac{1}{12}=\\frac{1}{4}$，还剩 $\\frac{3}{4}$。乙队每天完成 $\\frac{1}{24}$，$\\frac{3}{4}\\div\\frac{1}{24}=18$，所以乙队还要做 18 天。',
        '(5) 关键是看清楚：乙队从头做到尾，一共做了 10 天，完成了 $10\\times\\frac{1}{24}=\\frac{5}{12}$。',
        '剩下的 $1-\\frac{5}{12}=\\frac{7}{12}$ 是甲队做的。甲队每天做 $\\frac{1}{12}$，所以甲队做了 $\\frac{7}{12}\\div\\frac{1}{12}=7$ 天。',
        '检验：前 7 天两队合作完成 $7\\times\\frac{1}{8}=\\frac{7}{8}$，后 3 天乙队单独做 $3\\times\\frac{1}{24}=\\frac{1}{8}$，合起来正好是 1。',
      ],
      verify: () => {
        const together = (a, b) => F(1).div(F(1).div(a).add(F(1).div(b)));
        const rest = (a, b, d) => F(1).sub(F(d).div(a)).div(F(1).div(b));
        let jia = null;
        for (let d = 0; d <= 10; d++) if (F(d).div(12).add(F(10).div(24)).eq(1)) jia = d;
        return ['1/a', '1/a+1/b', together(12, 24), rest(12, 24, 3), jia];
      },
    },
    {
      id: '2.2-e10',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$ 互为相反数，$c$、$d$ 互为倒数，$m$ 的绝对值是 2。',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{a+b}{m}+m^2-cd$ 的值是', answer: '3' },
        { kind: 'nums', label: '(2) $m^3-cd+\\frac{a+b}{5}$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['7', '-9'] },
        { kind: 'num', label: '(3) $\\frac{a+b}{m^3}+(cd)^{2025}-|m|$ 的值是', answer: '-1' },
      ],
      explain: [
        '先把三个条件翻译成式子：$a+b=0$（互为相反数），$cd=1$（互为倒数），$m=2$ 或 $m=-2$。',
        '(1) $\\frac{a+b}{m}=\\frac{0}{m}=0$（$m$ 不为 0，可以做除数）；$m^2=(\\pm 2)^2=4$；$cd=1$。所以值是 $0+4-1=3$，与 $m$ 取 2 还是 $-2$ 无关。',
        '(2) 这里是 $m^3$：$m=2$ 时 $m^3=8$，$m=-2$ 时 $m^3=-8$，两者不同，必须分类。',
        '$m=2$：$8-1+0=7$；$m=-2$：$-8-1+0=-9$。所以有两个值：7 和 $-9$。',
        '(3) 逐项看：$\\frac{a+b}{m^3}=\\frac{0}{m^3}=0$；$(cd)^{2025}=1^{2025}=1$；$|m|=2$（不管 $m$ 是 2 还是 $-2$）。',
        '所以值是 $0+1-2=-1$，又是一个与 $m$ 的正负无关的式子。',
        '对比 (2) 和 (3)：$m$ 带着奇数次方出现在分子上时要分类，而出现在分母上（分子是 0）或被绝对值“包住”时就不必分类。',
      ],
      verify: () => {
        const v1 = new Set(), v2 = [], v3 = new Set();
        for (const m of [2, -2]) for (const c of [2, '1/3', -5]) {
          const d = F(1).div(c);
          v1.add(F(0).div(m).add(F(m).pow(2)).sub(F(c).mul(d)).toString());
          v3.add(F(0).div(F(m).pow(3)).add(F(c).mul(d).pow(2025)).sub(F(m).abs()).toString());
        }
        for (const m of [2, -2]) v2.push(F(m).pow(3).sub(1).add(F(0).div(5)));
        return [v1.size === 1 ? [...v1][0] : null, v2, v3.size === 1 ? [...v3][0] : null];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '某市居民用电按下面的办法收费：每月用电量不超过 150 度的部分，每度 0.6 元；超过 150 度但不超过 400 度的部分，每度 0.7 元；超过 400 度的部分，每度 0.9 元。',
      blanks: [
        { kind: 'num', label: '(1) 某户某月用电 120 度，应交电费（元）', answer: '72' },
        { kind: 'expr', label: '(2) 某户某月用电 $x$ 度（$150<x\\le 400$），应交电费（元）', answer: '0.7x-15' },
        { kind: 'num', label: '(3) 某户某月交电费 292 元，这个月用电（度）', answer: '430' },
        { kind: 'num', label: '(4) 甲、乙两户这个月共用电 600 度（每户用电量都是整数度，可以为 0），两户电费之和最少是（元）', answer: '390' },
        { kind: 'num', label: '(5) 在 (4) 的条件下，两户电费之和最多是（元）', answer: '445' },
      ],
      explain: [
        '(1) 120 度不超过 150 度，全部按每度 0.6 元算：$120\\times 0.6=72$ 元。',
        '(2) 前 150 度交 $150\\times 0.6=90$ 元，超过的 $(x-150)$ 度每度 0.7 元。电费 $=90+0.7(x-150)$，用分配律展开是 $0.7x-105+90=0.7x-15$（元）。',
        '(3) 先判断 292 元落在哪一段——这是最容易出错的一步。用电 150 度时交 90 元，用电 400 度时交 $0.7\\times 400-15=265$ 元。',
        '292 元比 265 元多，所以用电超过了 400 度。超出部分的电费是 $292-265=27$ 元，按每度 0.9 元算是 $27\\div 0.9=30$ 度。所以这个月用电 $400+30=430$ 度。',
        '(4)(5) 不能把六百多种分法一个个试，要抓住阶梯价格的特点：**用得越多，后面那部分电的单价越贵**。',
        '先算一种分法：两户各用 300 度，每户交 $90+0.7\\times 150=195$ 元，合计 390 元。',
        '其实最少的情形不止这一种：只要两户的用电量都在 200 度到 400 度之间（一户在这个范围里，另一户自然也在），两户超过 150 度的部分就都按每度 0.7 元算，把 1 度电从一户挪到另一户，一边多 0.7 元、一边少 0.7 元，正好抵消，总电费恒等于 390 元。',
        '再看会不会更便宜：如果分得更不平均，一户不到 200 度，那么另一户必定超过 400 度，挪过去的那部分电要按每度 0.9 元算，而少用的那一户每度最多只省 0.7 元，一多一少，总价只会更贵。所以最少就是 390 元。',
        '(5) 按同样的道理，分得越极端越贵：一户用 600 度、另一户用 0 度时最多。',
        '这一户交 $90+0.7\\times 250+0.9\\times 200=90+175+180=445$ 元，另一户交 0 元，合计 445 元。',
        '所以最少 390 元、最多 445 元，同样是 600 度电，交的钱可以差 55 元。',
      ],
      verify: () => {
        const fee = x => {
          let f = F(Math.min(x, 150)).mul('0.6');
          if (x > 150) f = f.add(F(Math.min(x, 400) - 150).mul('0.7'));
          if (x > 400) f = f.add(F(x - 400).mul('0.9'));
          return f;
        };
        const lin = f => `${f(200).sub(f(199))}*x+${f(200).sub(f(200).sub(f(199)).mul(200))}`;
        let back = null;
        for (let x = 1; x <= 1000; x++) if (fee(x).eq(292)) back = x;
        let mn = null, mx = null;
        for (let x = 0; x <= 600; x++) {
          const t = fee(x).add(fee(600 - x));
          if (!mn || t.cmp(mn) < 0) mn = t;
          if (!mx || t.cmp(mx) > 0) mx = t;
        }
        return [fee(120), lin(fee), back, mn, mx];
      },
    },
    {
      id: '2.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '下面研究“什么时候一个分数的值是整数”。这里 $n$ 都表示正整数。',
      blanks: [
        { kind: 'num', label: '(1) 使 $\\frac{12}{n+2}$ 的值是整数的 $n$ 共有（个）', answer: '4' },
        { kind: 'num', label: '(2) 使 $\\frac{n+9}{n+1}$ 的值是整数的 $n$ 共有（个）', answer: '3' },
        { kind: 'nums', label: '(3) 使 $\\frac{3n+2}{n-1}$ 的值是整数的 $n$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['2', '6'] },
        { kind: 'num', label: '(4) 使 $\\frac{n^2+5}{n+1}$ 的值是整数的 $n$ 共有（个）', answer: '3' },
        { kind: 'num', label: '(5) 使 $\\frac{12}{n+2}$ 与 $\\frac{n+9}{n+1}$ 的值都是整数的 $n$ 是', answer: '1' },
      ],
      explain: [
        '(1) 要让 $\\frac{12}{n+2}$ 是整数，分母 $n+2$ 必须是 12 的约数。12 的约数是 $1,2,3,4,6,12$。',
        '因为 $n$ 是正整数，$n+2\\ge 3$，所以 $n+2$ 只能取 $3,4,6,12$，对应 $n=1,2,4,10$，共 4 个。',
        '(2) 分子含字母，不能直接看约数，要先把分子“凑”成分母的样子：$n+9=(n+1)+8$。',
        '所以 $\\frac{n+9}{n+1}=1+\\frac{8}{n+1}$。整数部分 1 不用管，只要 $\\frac{8}{n+1}$ 是整数，即 $n+1$ 是 8 的约数。由 $n\\ge 1$ 得 $n+1\\ge 2$，所以 $n+1$ 取 $2,4,8$，即 $n=1,3,7$，共 3 个。',
        '(3) 分母是 $n-1$，先凑出 3 个 $(n-1)$：$3n+2=3(n-1)+5$，所以 $\\frac{3n+2}{n-1}=3+\\frac{5}{n-1}$。',
        '分母不能为 0，所以 $n\\ne 1$；又 $n$ 是正整数，故 $n-1\\ge 1$，取 5 的约数 1 和 5，得 $n=2$ 或 $n=6$。',
        '(4) 分子是 $n^2+5$，怎么凑？先用 $n^2=n\\times n$ 与 $n+1$ 搭一次：$n(n+1)=n^2+n$，所以 $n^2=n(n+1)-n$。',
        '于是 $n^2+5=n(n+1)-n+5$。式子里还有一个 $-n$，再凑一次：$-n=-(n+1)+1$，所以 $n^2+5=n(n+1)-(n+1)+6$。',
        '前两块都能被 $n+1$ 整除，所以只要 $n+1$ 是 6 的约数。由 $n+1\\ge 2$ 得 $n+1$ 取 $2,3,6$，即 $n=1,2,5$，共 3 个。',
        '检验：$n=5$ 时 $\\frac{25+5}{6}=5$，确实是整数。',
        '(5) 把 (1) 的答案 $\\{1,2,4,10\\}$ 和 (2) 的答案 $\\{1,3,7\\}$ 取公共部分，只有 $n=1$。',
        '这一节的通法：把分子拆成“分母的整数倍 + 一个常数”，问题就变成找这个常数的约数；分子含 $n^2$ 时要拆两次。',
      ],
      verify: () => {
        const list = (f, skip) => {
          const r = [];
          for (let n = 1; n <= 2000; n++) {
            if (skip && skip(n)) continue;
            if (f(n).d === 1n) r.push(n);
          }
          return r;
        };
        const a = list(n => F(12).div(n + 2));
        const b = list(n => F(n + 9).div(n + 1));
        const c = list(n => F(3 * n + 2).div(n - 1), n => n === 1);
        const d = list(n => F(n * n + 5).div(n + 1));
        const both = a.filter(n => b.includes(n));
        return [a.length, b.length, c.map(F), d.length, both.length === 1 ? both[0] : null];
      },
    },
    {
      id: '2.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $a+b=5$，$b+c=7$，$c+d=9$。',
      blanks: [
        { kind: 'num', label: '(1) $a+b+c+d=$', answer: '14' },
        { kind: 'num', label: '(2) $d+a=$', answer: '7' },
        { kind: 'nums', label: '(3) 若 $a$、$b$、$c$、$d$ 都是正整数，则 $a$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['1', '2', '3', '4'] },
        { kind: 'num', label: '(4) 在 (3) 的条件下，$abcd$ 的最大值是', answer: '120' },
        { kind: 'num', label: '(5) 在 (3) 的条件下，$abcd$ 的最小值是', answer: '72' },
      ],
      explain: [
        '(1) 把 $a+b=5$ 与 $c+d=9$ 相加，正好得到四个数的和：$a+b+c+d=5+9=14$。',
        '(2) 四个数的和去掉 $b+c$ 就是 $d+a$：$14-7=7$。这里用的是“配对”的想法：$(a+b)+(c+d)$ 与 $(b+c)+(d+a)$ 都等于四个数的总和。',
        '(3) 四个数其实只有一个可以自由选。只要定下 $a$，就依次定下 $b=5-a$、$c=7-b=2+a$、$d=9-c=7-a$。',
        '要求它们都是正整数：$a\\ge 1$；$b=5-a\\ge 1$ 得 $a\\le 4$；$c=2+a$ 自然满足；$d=7-a\\ge 1$ 得 $a\\le 6$。',
        '几个限制取最严的，得到 $a$ 只能是 $1,\\ 2,\\ 3,\\ 4$。',
        '(4)(5) 把四种情况逐一算出来：',
        '$a=1$ 时四数是 $1,4,3,6$，积为 72；$a=2$ 时是 $2,3,4,5$，积为 120；',
        '$a=3$ 时是 $3,2,5,4$，积为 120；$a=4$ 时是 $4,1,6,3$，积为 72。',
        '所以最大值是 120，最小值是 72。',
        '可以看出一个有意思的现象：四个数的和固定是 14，几个数越接近，乘积越大；相差越悬殊，乘积越小。',
      ],
      verify: () => {
        const chain = a => [F(a), F(5).sub(a), F(2).add(a), F(7).sub(a)];
        const sums = new Set(), das = new Set();
        for (let i = -20; i <= 20; i++) {
          const [a, b, c, d] = chain(F(i).div(2));
          sums.add(a.add(b).add(c).add(d).toString());
          das.add(d.add(a).toString());
        }
        const good = [];
        for (let a = 1; a <= 30; a++) {
          const four = chain(a);
          if (four.every(v => v.d === 1n && v.cmp(0) > 0)) good.push([a, four.reduce((p, x) => p.mul(x), F(1))]);
        }
        const prods = good.map(g => g[1]);
        prods.sort((p, q) => p.cmp(q));
        return [
          sums.size === 1 ? [...sums][0] : null,
          das.size === 1 ? [...das][0] : null,
          good.map(g => F(g[0])),
          prods[prods.length - 1],
          prods[0],
        ];
      },
    },
    {
      id: '2.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '阅读：用符号 $[x]$ 表示不超过 $x$ 的最大整数。例如 $[2.6]=2$，$[5]=5$，$[-1.3]=-2$（因为不超过 $-1.3$ 的整数里最大的是 $-2$）。',
      blanks: [
        { kind: 'num', label: '(1) $\\left[-\\frac{7}{2}\\right]+[4.8]=$', answer: '0' },
        {
          kind: 'text',
          label: '(2) 若 $[x]=-3$，则 $x$ 的取值范围是',
          options: ['$-4<x\\le -3$', '$-3\\le x<-2$', '$-4\\le x<-3$', '$-3<x\\le -2$'],
          answer: '$-3\\le x<-2$',
        },
        { kind: 'num', label: '(3) 满足 $[x]=3$ 且 $x$ 能写成 $\\frac{k}{4}$（$k$ 为整数）的数 $x$ 共有（个）', answer: '4' },
        { kind: 'num', label: '(4) $\\left[\\frac{1}{2}\\right]+\\left[\\frac{2}{2}\\right]+\\left[\\frac{3}{2}\\right]+\\cdots+\\left[\\frac{2025}{2}\\right]=$', answer: '1025156' },
      ],
      explain: [
        '(1) $-\\frac{7}{2}=-3.5$，不超过它的整数有 $-4,-5,\\dots$，最大的是 $-4$，所以 $\\left[-\\frac{7}{2}\\right]=-4$。负数这里最容易错，答成 $-3$ 就不对了。',
        '$[4.8]=4$，所以和是 $-4+4=0$。',
        '(2) $[x]=-3$ 表示 $x$ 从 $-3$ 开始（$-3$ 本身也算），但还没到 $-2$，即 $-3\\le x<-2$。',
        '(3) $[x]=3$ 表示 $3\\le x<4$。写成 $\\frac{k}{4}$ 的数就是 $\\frac{12}{4},\\frac{13}{4},\\frac{14}{4},\\frac{15}{4}$（$\\frac{16}{4}=4$ 已经不在范围内），共 4 个。',
        '(4) 这个和有 2025 项，不能硬加，要先找规律：$\\left[\\frac{k}{2}\\right]$ 中，$k$ 是偶数时等于 $\\frac{k}{2}$，$k$ 是奇数时等于 $\\frac{k-1}{2}$。',
        '所以把相邻两项配成一组：$\\left[\\frac{1}{2}\\right]+\\left[\\frac{2}{2}\\right]=0+1=1$，$\\left[\\frac{3}{2}\\right]+\\left[\\frac{4}{2}\\right]=1+2=3$，$\\left[\\frac{5}{2}\\right]+\\left[\\frac{6}{2}\\right]=2+3=5$，……每组都是相邻两个整数之和。',
        '前 2024 项恰好配成 1012 组，各组依次是 $1,\\ 3,\\ 5,\\ \\dots$，也就是前 1012 个奇数。',
        '前 $n$ 个奇数之和等于 $n^2$（把 $1,3,5,\\dots$ 个小方块一圈一圈地摆，正好摆成一个 $n\\times n$ 的正方形；也可以首尾配对验证）。',
        '所以前 2024 项之和是 $1012^2=1024144$。',
        '最后还剩第 2025 项：$\\left[\\frac{2025}{2}\\right]=1012$。总和 $=1024144+1012=1025156$。',
      ],
      verify: () => {
        const fl = q => {
          let n = 0;
          while (F(n + 1).cmp(q) <= 0) n++;
          while (F(n).cmp(q) > 0) n--;
          return n;
        };
        const cnt = [];
        for (let k = 0; k <= 40; k++) if (fl(F(k).div(4)) === 3) cnt.push(k);
        let s = F(0);
        for (let k = 1; k <= 2025; k++) s = s.add(fl(F(k).div(2)));
        const range = fl(F(-3)) === -3 && fl(F('-2.5')) === -3 && fl(F(-2)) === -2;
        return [F(fl(F('-7/2'))).add(fl(F('4.8'))), range ? '$-3\\le x<-2$' : '$-4\\le x<-3$', cnt.length, s];
      },
    },
    {
      id: '2.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '一个三位数的百位、十位、个位数字分别是 $a$、$b$、$c$，这个三位数可以写成 $100a+10b+c$，也可以写成 $99a+9b+(a+b+c)$。',
      blanks: [
        {
          kind: 'text',
          label: '(1) 由此可知，这个三位数被 9 除的余数，与下面哪个数被 9 除的余数相同',
          options: ['$a+b+c$', '$a$', '$99a+9b$', '$100a$'],
          answer: '$a+b+c$',
        },
        { kind: 'num', label: '(2) 三位数 $\\overline{5a7}$（百位是 5，十位是 $a$，个位是 7）能被 9 整除，则 $a=$', answer: '6' },
        { kind: 'num', label: '(3) 一个四位数各位数字之和是 20，它被 9 除的余数是', answer: '2' },
        { kind: 'num', label: '(4) 把 2025 的四个数字重新排列（首位不能是 0），能得到（个）不同的四位数是 9 的倍数', answer: '9' },
        { kind: 'num', label: '(5) 从 $0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5$ 中取出四个**不同**的数字组成四位数（首位不能是 0），其中是 9 的倍数的共有（个）', answer: '36' },
      ],
      explain: [
        '(1) $99a$ 和 $9b$ 都是 9 的倍数（$99=9\\times 11$），去掉它们不影响余数，所以三位数被 9 除的余数就是 $a+b+c$ 被 9 除的余数。',
        '(2) 各位数字之和是 $5+a+7=a+12$。要被 9 整除，$a+12$ 必须是 9 的倍数。$a$ 是 $0\\sim 9$ 的数字，$a+12$ 在 12 到 21 之间，其中只有 18 是 9 的倍数，所以 $a=6$（这个数是 567）。',
        '(3) 四位数也一样：$1000a+100b+10c+d=999a+99b+9c+(a+b+c+d)$，前面几项都是 9 的倍数。所以余数与 20 被 9 除的余数相同，$20=9\\times 2+2$，余数是 2。',
        '(4) 2025 的四个数字之和是 $2+0+2+5=9$，重新排列不改变数字之和，所以只要排出来是四位数，就一定是 9 的倍数。',
        '四个数字里有两个相同的 2，不同的排法有 $\\frac{4\\times 3\\times 2\\times 1}{2}=12$ 种；去掉首位是 0 的（此时后三位由 $2,2,5$ 组成，有 $\\frac{3\\times 2\\times 1}{2}=3$ 种）。所以有 $12-3=9$ 个。',
        '(5) 这一问要自己去找“哪些数字组合可以”。先看数字之和：四个不同数字取自 $0\\sim 5$，最小的和是 $0+1+2+3=6$，最大的是 $2+3+4+5=14$。这个范围里 9 的倍数只有 9。',
        '所以要选出四个不同数字，和恰好是 9。六个数字的总和是 $0+1+2+3+4+5=15$，选四个就是去掉两个，去掉的两个数字之和要等于 $15-9=6$。',
        '和为 6 的两个不同数字只有 $1+5$ 和 $2+4$（$0+6$ 里没有 6，$3+3$ 不是两个不同的数字）。',
        '去掉 $1,5$ 剩下 $\\{0,2,3,4\\}$；去掉 $2,4$ 剩下 $\\{0,1,3,5\\}$。两组都含 0。',
        '每一组四个不同数字排成四位数：先算全部排法 $4\\times 3\\times 2\\times 1=24$ 种，再去掉首位是 0 的 $3\\times 2\\times 1=6$ 种，得 $24-6=18$ 个。',
        '两组合计 $18\\times 2=36$ 个。',
      ],
      verify: () => {
        let a6 = null;
        for (let a = 0; a <= 9; a++) if ((500 + 10 * a + 7) % 9 === 0) a6 = a;
        const rem = new Set();
        for (let n = 1000; n <= 9999; n++) {
          const s = String(n).split('').reduce((p, q) => p + Number(q), 0);
          if (s === 20) rem.add(n % 9);
        }
        const set = new Set();
        const perm = (rest, cur) => {
          if (!rest.length) { set.add(cur.join('')); return; }
          rest.forEach((d, i) => perm(rest.filter((_, j) => j !== i), [...cur, d]));
        };
        perm(['2', '0', '2', '5'], []);
        const ok9 = [...set].filter(s => s[0] !== '0' && Number(s) % 9 === 0);
        let pick = 0;
        for (let n = 1000; n <= 9999; n++) {
          const s = String(n).split('');
          if (new Set(s).size === 4 && s.every(d => Number(d) <= 5) && n % 9 === 0) pick++;
        }
        const same = [123, 456, 987, 100].every(n => n % 9 === String(n).split('').reduce((p, q) => p + Number(q), 0) % 9);
        return [same ? '$a+b+c$' : '$a$', a6, rem.size === 1 ? [...rem][0] : null, ok9.length, pick];
      },
    },
  ],
});
