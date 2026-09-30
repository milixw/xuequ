'use strict';

// 上海数学六年级下册 · 9.4 简单的三元一次方程组
// 知识范围：三元一次方程组（三个未知数，含未知数的项都是一次项）；解法：消元，三元 → 二元 → 一元
// 可以使用 9.1～9.3、6 上全部内容、第 5～8 章
// 还没学：不等式、方程组无解和有无数组解的讨论（题目避开）

// 用消元法解三元一次方程组（每行 [a, b, c, d] 表示 ax+by+cz=d），只用于 verify 核对
const SOLVE94 = rows => {
  const m = rows.map(r => r.map(v => F(v)));
  for (let i = 0; i < 3; i++) {
    let p = i;
    while (m[p][i].isZero()) p++;
    [m[i], m[p]] = [m[p], m[i]];
    for (let j = 0; j < 3; j++) {
      if (j === i) continue;
      const f = m[j][i].div(m[i][i]);
      m[j] = m[j].map((v, k) => v.sub(f.mul(m[i][k])));
    }
  }
  return m.map((r, i) => r[3].div(r[i]));
};

Content.section({
  id: 'math/sh2024/g6s2/9.4',
  title: '简单的三元一次方程组',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。第 1 轮指出“三式相加”用了 6 次、c01～c03 未高于压轴（c03 倒推即可）；第 2 轮原 c05 租车下移为 e05，挑战档换成新定义、比值 + 整数、竞赛得分、赛跑，c01/c02 第 (3) 问无难度、赛跑题与本节脱节被打回；第 3 轮改为正整数计数、约数分类和上坡平路下坡往返后判定整节通过' },

  intro: [
    {
      title: '三元一次方程组',
      body: '方程组中一共含有**三个未知数**，并且含未知数的项都是一次项，这样的方程组叫三元一次方程组。一般要有三个方程才能确定三个未知数。',
      example: '$\\begin{cases}x+y=4\\\\y-z=1\\\\x+2z=5\\end{cases}$ 是三元一次方程组，其中每个方程只含两个未知数也可以。',
    },
    {
      title: '解法：一步步消元',
      body: '三元 → 二元 → 一元：先选一个未知数，用两次消元（或代入）把它消掉，得到只含另外两个未知数的方程组，按 9.2 的方法解，最后代回求第三个。',
      example: '先消哪个未知数？选系数最简单、或者在某个方程里已经不出现的那个。',
      pitfall: '两次消元要消去的是**同一个**未知数，否则得到的两个方程还是含三个未知数。',
    },
    {
      title: '整体相加',
      body: '如果每个方程都是“两个未知数的和”，或者系数轮流排列，可以先把三个方程全部相加，求出 $x+y+z$，再分别减去每个方程。',
      example: '$\\begin{cases}x+y=7\\\\y+z=9\\\\z+x=10\\end{cases}$：三式相加 $2(x+y+z)=26$，$x+y+z=13$，再减去各式得 $z=6$，$x=4$，$y=3$。',
    },
    {
      title: '连比：设一份',
      body: '已知 $x:y:z=a:b:c$，可以设 $x=ak$，$y=bk$，$z=ck$，代入另一个方程求出 $k$。连等式 $\\frac xa=\\frac yb=\\frac zc$ 也一样。',
      example: '$x:y:z=2:3:5$，$x+y+z=40$：设每份 $k$，$10k=40$，$k=4$，$x=8$，$y=12$，$z=20$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '9.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列方程组中，是三元一次方程组的是',
      options: [
        '$\\begin{cases}x+y=1\\\\y+z=2\\\\x+z=3\\end{cases}$',
        '$\\begin{cases}xy+z=1\\\\x-y=2\\\\y+z=3\\end{cases}$',
        '$\\begin{cases}x^2+y=4\\\\y-z=1\\\\x+z=2\\end{cases}$',
        '$\\begin{cases}x+y=5\\\\y+z=2\\\\z+w=1\\end{cases}$',
      ],
      answer: 0,
      explain: [
        'A：三个未知数，每项都是一次项，是三元一次方程组（每个方程只含两个未知数没关系）。',
        'B：$xy$ 是两个未知数相乘，不是一次项。C：$x^2$ 是二次项。',
        'D：一共有 $x$、$y$、$z$、$w$ 四个未知数。',
        '常见错误：以为每个方程都要同时含三个未知数，把 A 排除掉。',
      ],
      verify: () => [[3, false], [3, true], [3, true], [4, false]].findIndex(([n, bad]) => n === 3 && !bad),
    },
    {
      id: '9.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}x=-2\\\\x+y+z=3\\\\2x-y+z=-1\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '-2' },
        { kind: 'num', label: '$y=$', answer: '1' },
        { kind: 'num', label: '$z=$', answer: '4' },
      ],
      explain: [
        '把 $x=-2$ 代入后两个方程：$-2+y+z=3$，得 $y+z=5$；$-4-y+z=-1$，得 $-y+z=3$。',
        '两式相加：$2z=8$，$z=4$，$y=1$。',
        '常见错误：移项时符号出错，比如把 $-4-y+z=-1$ 整理成 $-y+z=-5$。',
      ],
      verify: () => SOLVE94([[1, 0, 0, -2], [1, 1, 1, 3], [2, -1, 1, -1]]),
    },
    {
      id: '9.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}x+y=5\\\\y-z=-3\\\\2x-z=1\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '3' },
        { kind: 'num', label: '$y=$', answer: '2' },
        { kind: 'num', label: '$z=$', answer: '5' },
      ],
      explain: [
        '每个方程只含两个未知数，可以都用 $y$ 来表示：由第一个 $x=5-y$，由第二个 $z=y+3$。',
        '代入第三个：$2(5-y)-(y+3)=1$，$10-2y-y-3=1$，$3y=6$，$y=2$。所以 $x=3$，$z=5$。',
        '常见错误：由 $y-z=-3$ 得出 $z=y-3$，符号弄反；或者 $-(y+3)$ 去括号时写成 $-y+3$。',
      ],
      verify: () => SOLVE94([[1, 1, 0, 5], [0, 1, -1, -3], [2, 0, -1, 1]]),
    },
    {
      id: '9.4-b04',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}x+y+z=4\\\\2x-y+z=8\\\\x+y-z=-2\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '2' },
        { kind: 'num', label: '$y=$', answer: '-1' },
        { kind: 'num', label: '$z=$', answer: '3' },
      ],
      explain: [
        '第一个方程减第三个：$2z=6$，$z=3$（$x$、$y$ 一起消掉了）。',
        '代入前两个：$x+y=1$，$2x-y=5$，相加 $3x=6$，$x=2$，$y=-1$。',
        '常见错误：第一个减第三个时，右边算成 $4-2=2$。',
      ],
      verify: () => SOLVE94([[1, 1, 1, 4], [2, -1, 1, 8], [1, 1, -1, -2]]),
    },
    {
      id: '9.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '已知 $x:y:z=1:2:3$，且 $2x-y+z=12$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '4' },
        { kind: 'num', label: '$y=$', answer: '8' },
        { kind: 'num', label: '$z=$', answer: '12' },
      ],
      explain: [
        '设 $x=k$，$y=2k$，$z=3k$，代入：$2k-2k+3k=12$，$3k=12$，$k=4$。',
        '所以 $x=4$，$y=8$，$z=12$。检验：$8-8+12=12$。',
        '常见错误：以为 $x+y+z=12$，按 $1:2:3$ 分成 2、4、6。',
      ],
      verify: () => SOLVE94([[2, -1, 0, 0], [3, 0, -1, 0], [2, -1, 1, 12]]),
    },
    {
      id: '9.4-b06',
      level: 'basic',
      type: 'fill',
      stem: '已知 $x+2y+3z=14$，$3x+2y+z=10$，求 $x+y+z$ 的值。',
      blanks: [{ kind: 'num', label: '$x+y+z=$', answer: '6' }],
      explain: [
        '只有两个方程，求不出 $x$、$y$、$z$ 各是多少，但可以求它们的和。',
        '两式相加：$4x+4y+4z=24$，所以 $x+y+z=6$。',
        '常见错误：以为方程不够就无法求出；或者相加后忘了除以 4。',
      ],
      verify: () => {
        // 任取满足两个方程的几组数，检验 x+y+z 都相同
        const vals = new Set();
        for (let z = -3; z <= 3; z++) {
          // x+2y=14-3z，3x+2y=10-z → x=(-4+2z)/2
          const x = F(-4 + 2 * z).div(2);
          const y = F(14 - 3 * z).sub(x).div(2);
          vals.add(x.add(y).add(z).toString());
        }
        return vals.size === 1 ? [...vals][0] : null;
      },
    },
    {
      id: '9.4-b07',
      level: 'basic',
      type: 'fill',
      stem: '三个数的和是 25，第一个数比第二个数大 3，第三个数是第一个数的 2 倍。',
      blanks: [
        { kind: 'num', label: '第一个数是', answer: '7' },
        { kind: 'num', label: '第二个数是', answer: '4' },
        { kind: 'num', label: '第三个数是', answer: '14' },
      ],
      explain: [
        '设三个数分别是 $x$、$y$、$z$：$\\begin{cases}x+y+z=25\\\\x-y=3\\\\z=2x\\end{cases}$。',
        '由后两个方程，$y=x-3$，$z=2x$，代入第一个：$x+x-3+2x=25$，$4x=28$，$x=7$。',
        '$y=4$，$z=14$。常见错误：把“第一个比第二个大 3”写成 $y-x=3$。',
      ],
      verify: () => SOLVE94([[1, 1, 1, 25], [1, -1, 0, 3], [2, 0, -1, 0]]),
    },
    {
      id: '9.4-b08',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\begin{cases}x=1\\\\y=2\\\\z=3\\end{cases}$ 是方程组 $\\begin{cases}ax+y+z=7\\\\x+by+z=10\\\\x+y+cz=0\\end{cases}$ 的解，求 $a+b+c$。',
      blanks: [{ kind: 'num', label: '$a+b+c=$', answer: '4' }],
      explain: [
        '逐个代入：$a+2+3=7$，$a=2$；$1+2b+3=10$，$b=3$；$1+2+3c=0$，$c=-1$。',
        '$a+b+c=2+3-1=4$。',
        '常见错误：第三个方程移项得 $3c=3$，$c=1$，符号错了。',
      ],
      verify: () => {
        const a = F(7).sub(2 + 3), b = F(10).sub(1 + 3).div(2), c = F(0).sub(1 + 2).div(3);
        return a.add(b).add(c);
      },
    },
    {
      id: '9.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '解方程组 $\\begin{cases}x-y+z=2\\\\x+y+z=6\\\\4x+2y+z=11\\end{cases}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '1' },
        { kind: 'num', label: '$y=$', answer: '2' },
        { kind: 'num', label: '$z=$', answer: '3' },
      ],
      explain: [
        '前两个方程相减，$x$、$z$ 同时消掉：$2y=4$，$y=2$。',
        '代入后得 $x+z=4$，$4x+z=7$，相减：$3x=3$，$x=1$，$z=3$。',
        '常见错误：第三个方程代入 $y=2$ 时写成 $4x+2+z=11$，漏乘 2。',
      ],
      verify: () => SOLVE94([[1, -1, 1, 2], [1, 1, 1, 6], [4, 2, 1, 11]]),
    },

    // ---------- 扩展 ----------
    {
      id: '9.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '一个三位数，各位数字之和是 15；十位数字是百位数字与个位数字之和的一半；把百位数字和个位数字对调，得到的新三位数比原数大 396。原来的三位数是多少？',
      blanks: [{ kind: 'num', answer: '357' }],
      explain: [
        '设百位、十位、个位数字分别是 $a$、$b$、$c$，原数 $100a+10b+c$，新数 $100c+10b+a$。',
        '新数 − 原数 $=99c-99a=396$，$c-a=4$。又 $a+b+c=15$，$2b=a+c$。',
        '由 $2b=a+c$ 代入 $a+b+c=15$：$3b=15$，$b=5$，$a+c=10$。再由 $c-a=4$：$c=7$，$a=3$。',
        '原数 357。常见错误：把对调后的差算成 $90(c-a)$ 或 $100(c-a)$。',
      ],
      verify: () => {
        const [a, b, c] = SOLVE94([[1, 1, 1, 15], [1, -2, 1, 0], [-99, 0, 99, 396]]);
        return a.mul(100).add(b.mul(10)).add(c);
      },
    },
    {
      id: '9.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '买 3 支钢笔、7 本笔记本、1 个文件夹共 315 元；买 4 支钢笔、10 本笔记本、1 个文件夹共 420 元。钢笔、笔记本、文件夹各买一个，共多少元？',
      blanks: [{ kind: 'num', answer: '105', suffix: '元' }],
      explain: [
        '设钢笔 $x$ 元、笔记本 $y$ 元、文件夹 $z$ 元：$3x+7y+z=315$，$4x+10y+z=420$。三个未知数只有两个方程，单个的价格求不出来，但可以求 $x+y+z$。',
        '两式相减：$x+3y=105$。',
        '怎么想到的：想办法从第一个方程里“拿掉” $2x+6y$，剩下的正好是 $x+y+z$。$2x+6y=2(x+3y)=210$。',
        '$x+y+z=(3x+7y+z)-(2x+6y)=315-210=105$（元）。',
        '常见错误：以为少一个方程就求不出答案。',
      ],
      verify: () => {
        const vals = new Set();
        for (let y = 1; y <= 5; y++) {
          const x = F(105).sub(3 * y); // x+3y=105
          const z = F(315).sub(x.mul(3)).sub(7 * y);
          if (!x.mul(4).add(10 * y).add(z).eq(420)) return null;
          vals.add(x.add(y).add(z).toString());
        }
        return vals.size === 1 ? [...vals][0] : null;
      },
    },
    {
      id: '9.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '蜘蛛有 8 条腿；蜻蜓有 6 条腿、2 对翅膀；蝉有 6 条腿、1 对翅膀。现在这三种小虫共 18 只，共有 118 条腿和 20 对翅膀。',
      blanks: [
        { kind: 'num', label: '蜘蛛有', answer: '5', suffix: '只' },
        { kind: 'num', label: '蜻蜓有', answer: '7', suffix: '只' },
        { kind: 'num', label: '蝉有', answer: '6', suffix: '只' },
      ],
      explain: [
        '设蜘蛛 $x$ 只、蜻蜓 $y$ 只、蝉 $z$ 只：$\\begin{cases}x+y+z=18\\\\8x+6y+6z=118\\\\2y+z=20\\end{cases}$。',
        '先消 $y+z$：第一个方程乘 6，$6x+6y+6z=108$，与第二个相减：$2x=10$，$x=5$。',
        '于是 $y+z=13$，又 $2y+z=20$，相减 $y=7$，$z=6$。',
        '常见错误：蜘蛛没有翅膀，第三个方程里不要写 $x$。',
      ],
      verify: () => SOLVE94([[1, 1, 1, 18], [8, 6, 6, 118], [0, 2, 1, 20]]),
    },
    {
      id: '9.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\frac{x+y}{3}=\\frac{y+z}{4}=\\frac{z+x}{5}$，且 $x+y+z=24$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '8' },
        { kind: 'num', label: '$y=$', answer: '4' },
        { kind: 'num', label: '$z=$', answer: '12' },
      ],
      explain: [
        '设三个分式都等于 $k$：$x+y=3k$，$y+z=4k$，$z+x=5k$。',
        '三式相加：$2(x+y+z)=12k$，$x+y+z=6k=24$，$k=4$。',
        '所以 $x+y=12$，$y+z=16$，$z+x=20$，分别用 24 去减：$z=12$，$x=8$，$y=4$。',
        '常见错误：以为 $x:y:z=3:4:5$，得到 6、8、10。分母对应的是两个数的和，不是单个的数。',
      ],
      verify: () => {
        // 连等式化成三个方程：4(x+y)=3(y+z)，5(y+z)=4(z+x)，再加上 x+y+z=24，直接解
        return SOLVE94([[4, 1, -3, 0], [-4, 5, 1, 0], [1, 1, 1, 24]]);
      },
    },
    {
      id: '9.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '学校组织 285 名师生春游，租用 45 座、30 座、15 座三种客车共 8 辆，每种车都要租，所有车都正好坐满。45 座客车每辆租金 900 元，30 座 700 元，15 座 400 元。',
      blanks: [
        { kind: 'num', label: '(1) 符合要求的租车方案有几种？', answer: '2', suffix: '种' },
        { kind: 'num', label: '(2) 最少租金是', answer: '6000', suffix: '元' },
      ],
      explain: [
        '设 45 座 $x$ 辆、30 座 $y$ 辆、15 座 $z$ 辆：$x+y+z=8$，$45x+30y+15z=285$，第二个除以 15：$3x+2y+z=19$。',
        '三个未知数只有两个方程，先消去 $z$：两式相减，$2x+y=11$。再用“都是正整数”来筛选。',
        '$y=11-2x\\ge1$，$x\\le5$；$z=8-x-y=x-3\\ge1$，$x\\ge4$。所以 $x=4$ 或 5。',
        '(1) $x=4$：$y=3$，$z=1$；$x=5$：$y=1$，$z=2$。共 2 种。',
        '(2) 方案一：$4\\times900+3\\times700+1\\times400=6100$ 元；方案二：$5\\times900+1\\times700+2\\times400=6000$ 元。最少 6000 元。',
        '常见错误：忘了“每种车都要租”，把 $x=3$（$z=0$）也算上。',
      ],
      verify: () => {
        const plans = [];
        for (let x = 1; x <= 8; x++) for (let y = 1; y <= 8; y++) {
          const z = 8 - x - y;
          if (z >= 1 && 45 * x + 30 * y + 15 * z === 285) plans.push(900 * x + 700 * y + 400 * z);
        }
        return [plans.length, Math.min(...plans)];
      },
    },
    {
      id: '9.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$、$y$、$z$ 的方程组 $\\begin{cases}x+y+z=6\\\\x-y+z=2\\\\x+y-z=k\\end{cases}$ 的解都是正整数。',
      blanks: [{ kind: 'nums', label: '$k$ 的值是（全部填出，用逗号隔开）', answer: ['0', '2', '4'] }],
      explain: [
        '先用含 $k$ 的式子表示解。第一个减第二个：$2y=4$，$y=2$，与 $k$ 无关。',
        '于是 $x+z=4$，$x-z=k-2$，得 $x=\\frac{k+2}{2}$，$z=\\frac{6-k}{2}$。',
        '$x$、$z$ 都是正整数：$k+2$ 和 $6-k$ 都是正偶数，所以 $k$ 是偶数，且 $k+2\\ge2$、$6-k\\ge2$，即 $k$ 在 0 到 4 之间。',
        '$k=0$：$x=1$，$z=3$；$k=2$：$x=2$，$z=2$；$k=4$：$x=3$，$z=1$。共三个值。',
        '常见错误：漏掉 $k=0$；或者以为 $k$ 必须是正数。',
      ],
      verify: () => {
        const ks = [];
        for (let t = -20; t <= 20; t++) {
          const [x, y, z] = SOLVE94([[1, 1, 1, 6], [1, -1, 1, 2], [1, 1, -1, t]]);
          if ([x, y, z].every(v => v.d === 1n && v.cmp(0) > 0)) ks.push(t);
        }
        return ks;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '9.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '规定一种新运算：$x\\otimes y=ax+by+c$，其中 $a$、$b$、$c$ 是常数。已知 $1\\otimes 2=9$，$(-3)\\otimes 3=6$，$0\\otimes 1=2$。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '2' },
        { kind: 'num', label: '　 $b=$', answer: '5' },
        { kind: 'num', label: '　 $c=$', answer: '-3' },
        { kind: 'num', label: '(2) 如果 $m\\otimes m=m$，那么 $m=$', answer: '1/2' },
        { kind: 'num', label: '(3) $x$、$y$ 都是正整数，且 $x\\otimes y=33$，这样的 $x$、$y$ 有几对？', answer: '3', suffix: '对' },
      ],
      explain: [
        '(1) 按规定写出三个方程：$a+2b+c=9$，$-3a+3b+c=6$，$b+c=2$。',
        '第一个减第三个：$a+b=7$；第二个减第三个：$-3a+2b=4$。由 $a=7-b$：$-21+3b+2b=4$，$b=5$，$a=2$，$c=-3$。',
        '所以 $x\\otimes y=2x+5y-3$。',
        '(2) $m\\otimes m=2m+5m-3=7m-3=m$，$6m=3$，$m=\\frac12$。',
        '(3) $2x+5y-3=33$，即 $2x+5y=36$。$2x$ 和 36 都是偶数，所以 $5y$ 是偶数，$y$ 是偶数；又 $5y<36$，$y$ 取 2、4、6，对应 $x=13$、8、3。共 3 对。',
        '常见错误：(3) 把 $x\\otimes y=33$ 写成 $2x+5y=33$，忘了 $c=-3$；或者把 $y=0$ 也算上。',
      ],
      verify: () => {
        const [a, b, c] = SOLVE94([[1, 2, 1, 9], [-3, 3, 1, 6], [0, 1, 1, 2]]);
        const op = (x, y) => a.mul(x).add(b.mul(y)).add(c);
        const m = c.neg().div(a.add(b).sub(1));
        if (!op(m, m).eq(m)) return null;
        let pairs = 0;
        for (let x = 1; x <= 40; x++) for (let y = 1; y <= 40; y++) if (op(x, y).eq(33)) pairs++;
        return [a, b, c, m, pairs];
      },
    },
    {
      id: '9.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $2x-3y-z=0$，$x+3y-14z=0$，且 $z\\ne0$。',
      blanks: [
        { kind: 'ratio', label: '(1) $x:y:z=$', answer: '5:3:1' },
        { kind: 'num', label: '(2) $\\frac{x+y+z}{x-y+z}=$', answer: '3' },
        { kind: 'nums', label: '(3) 如果 $x$、$y$、$z$ 还满足 $x+y+kz=12$，$x$、$y$、$z$ 都是正整数，$k$ 是整数，$k$ 的值是（全部填出，用逗号隔开）', answer: ['4', '-2', '-4', '-5', '-6', '-7'] },
      ],
      explain: [
        '三个未知数只有两个方程，求不出具体的值，但可以求出它们的比。',
        '怎么想到的：把 $z$ 暂时看作已知数，这就变成关于 $x$、$y$ 的二元一次方程组：$\\begin{cases}2x-3y=z\\\\x+3y=14z\\end{cases}$。',
        '两式相加：$3x=15z$，$x=5z$；代入 $x+3y=14z$：$3y=9z$，$y=3z$。',
        '(1) $x:y:z=5z:3z:z=5:3:1$。(2) $\\frac{5z+3z+z}{5z-3z+z}=\\frac{9z}{3z}=3$。$z\\ne0$ 才能约去 $z$。',
        '(3) 代入 $x=5z$、$y=3z$：$5z+3z+kz=12$，$(8+k)z=12$。$z$ 是正整数，$8+k$ 是整数，所以 $z$ 是 12 的正约数：1、2、3、4、6、12。',
        '对应 $8+k=12$、6、4、3、2、1，$k=4$、$-2$、$-4$、$-5$、$-6$、$-7$，共 6 个。这时 $x=5z$、$y=3z$ 都是正整数。',
        '常见错误：(3) 只考虑 $k$ 是正数，只得到 $k=4$。',
      ],
      verify: () => {
        let ratio = null, val = null;
        const ks = [];
        for (let zz = -12; zz <= 12; zz++) {
          if (zz === 0) continue;
          const z = F(zz);
          const x = z.mul(5), y = F(14).mul(z).sub(x).div(3);
          if (!F(2).mul(x).sub(F(3).mul(y)).sub(z).isZero()) return null;
          ratio = [x.div(z), y.div(z), 1];
          val = x.add(y).add(z).div(x.sub(y).add(z));
          if (zz > 0 && y.d === 1n) {
            const k = F(12).sub(x).sub(y).div(z);
            if (k.d === 1n) ks.push(k);
          }
        }
        return [ratio, val, ks];
      },
    },
    {
      id: '9.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '一次数学竞赛共 20 道题，答对一题得 5 分，不答得 0 分，答错一题扣 2 分。',
      blanks: [
        { kind: 'num', label: '(1) 小明得了 61 分，他答错了', answer: '2', suffix: '道题' },
        { kind: 'num', label: '(2) 得分是 50 分的答题情况（答对、不答、答错各几道）有几种？', answer: '2', suffix: '种' },
      ],
      explain: [
        '设答对 $x$ 道、不答 $y$ 道、答错 $z$ 道，$x+y+z=20$，$x$、$y$、$z$ 都是不小于 0 的整数。',
        '(1) $5x-2z=61$。三个未知数只有两个方程，要用整数条件。$5x=61+2z$ 是奇数，$x$ 是奇数；$5x\\ge61$，$x\\ge13$。',
        '$x=13$：$z=2$，$y=5$，符合；$x=15$：$z=7$，$x+z=22>20$，不行；$x$ 更大时 $x+z$ 更大，都不行。所以答错 2 道。',
        '(2) $5x-2z=50$，$5x=50+2z$ 是偶数，$x$ 是偶数，且 $x\\ge10$，$z=\\frac{5x-50}{2}$。',
        '$x=10$：$z=0$，$y=10$；$x=12$：$z=5$，$y=3$；$x=14$：$z=10$，$x+z=24>20$，不行。共 2 种。',
        '常见错误：只列出 $5x-2z=61$，忘了总题数的限制 $x+y+z=20$；或者漏掉 $z=0$ 的情况。',
      ],
      verify: () => {
        const ways = score => {
          const r = [];
          for (let x = 0; x <= 20; x++) for (let z = 0; x + z <= 20; z++) if (5 * x - 2 * z === score) r.push([x, 20 - x - z, z]);
          return r;
        };
        const w61 = ways(61);
        return w61.length === 1 ? [w61[0][2], ways(50).length] : null;
      },
    },
    {
      id: '9.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一项工程，甲、乙两队合作 6 天完成，付费 8700 元；乙、丙两队合作 10 天完成，付费 9500 元；甲、丙两队合作 7.5 天完成，付费 8250 元。每个队每天的费用固定。',
      blanks: [
        { kind: 'num', label: '(1) 甲队单独完成要', answer: '10', suffix: '天' },
        { kind: 'num', label: '　 乙队单独完成要', answer: '15', suffix: '天' },
        { kind: 'num', label: '　 丙队单独完成要', answer: '30', suffix: '天' },
        { kind: 'num', label: '(2) 如果只请一个队单独完成，最少付费', answer: '8000', suffix: '元' },
      ],
      explain: [
        '(1) 设甲、乙、丙每天分别完成工程的 $x$、$y$、$z$：$x+y=\\frac16$，$y+z=\\frac1{10}$，$z+x=\\frac{2}{15}$。',
        '三式相加：$2(x+y+z)=\\frac{5+3+4}{30}=\\frac{2}{5}$，$x+y+z=\\frac15$。',
        '分别减去：$z=\\frac15-\\frac16=\\frac1{30}$，$x=\\frac15-\\frac1{10}=\\frac1{10}$，$y=\\frac15-\\frac2{15}=\\frac1{15}$。甲 10 天、乙 15 天、丙 30 天。',
        '(2) 设甲、乙、丙每天费用 $a$、$b$、$c$ 元：$a+b=8700\\div6=1450$，$b+c=9500\\div10=950$，$a+c=8250\\div7.5=1100$。',
        '同样三式相加：$a+b+c=1750$，得 $a=800$，$b=650$，$c=300$。',
        '单独完成的费用：甲 $800\\times10=8000$ 元，乙 $650\\times15=9750$ 元，丙 $300\\times30=9000$ 元。最少 8000 元（甲）。',
        '常见错误：以为每天费用最少的丙最省钱。丙虽然便宜，但做得太慢，总费用反而多。',
      ],
      verify: () => {
        const [x, y, z] = SOLVE94([[1, 1, 0, F(1).div(6)], [0, 1, 1, F(1).div(10)], [1, 0, 1, F(1).div('7.5')]]);
        const [a, b, c] = SOLVE94([[1, 1, 0, F(8700).div(6)], [0, 1, 1, F(9500).div(10)], [1, 0, 1, F(8250).div('7.5')]]);
        const costs = [a.div(x), b.div(y), c.div(z)];
        const min = costs.reduce((p, q) => (q.cmp(p) < 0 ? q : p));
        return [F(1).div(x), F(1).div(y), F(1).div(z), min];
      },
    },
    {
      id: '9.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '从 A 地到 B 地的路，先是上坡，接着是平路，最后是下坡，全程 12 km。小明上坡每小时走 3 km，平路每小时走 4 km，下坡每小时走 5 km。他从 A 地走到 B 地用了 3 小时，再从 B 地原路返回 A 地用了 $3\\frac{4}{15}$ 小时。',
      blanks: [
        { kind: 'num', label: '(1) 平路长', answer: '4', suffix: 'km' },
        { kind: 'num', label: '(2) 从 A 地到 B 地，上坡路长', answer: '3', suffix: 'km' },
        { kind: 'num', label: '　 下坡路长', answer: '5', suffix: 'km' },
      ],
      explain: [
        '关键：返回时，原来的上坡变成下坡、下坡变成上坡，平路不变。设从 A 到 B 上坡 $x$ km、平路 $y$ km、下坡 $z$ km。',
        '三个条件：$x+y+z=12$；去时 $\\frac x3+\\frac y4+\\frac z5=3$；回时 $\\frac x5+\\frac y4+\\frac z3=3\\frac{4}{15}=\\frac{49}{15}$。',
        '(1) 怎么想到的：两个时间方程里 $x$、$z$ 的系数正好交换，相加后 $x$、$z$ 的系数相同：$\\frac{8}{15}(x+z)+\\frac y2=\\frac{94}{15}$。再把 $x+z=12-y$ 代入：$\\frac{8}{15}(12-y)+\\frac y2=\\frac{94}{15}$。',
        '两边乘 30：$16(12-y)+15y=188$，$192-y=188$，$y=4$。',
        '(2) 两个时间方程相减：$(\\frac13-\\frac15)x+(\\frac15-\\frac13)z=3-\\frac{49}{15}$，即 $\\frac{2}{15}(x-z)=-\\frac{4}{15}$，$x-z=-2$。',
        '又 $x+z=12-4=8$，所以 $x=3$，$z=5$。检验：去时 $1+1+1=3$，回时 $\\frac35+1+\\frac53=\\frac{49}{15}$。',
        '常见错误：以为返回时每段的速度不变；或者以为回程也是先上坡。',
      ],
      verify: () => SOLVE94([[1, 1, 1, 12], [F(1).div(3), F(1).div(4), F(1).div(5), 3], [F(1).div(5), F(1).div(4), F(1).div(3), F(49).div(15)]]).map((v, i, a) => (i === 0 ? a[1] : i === 1 ? a[0] : a[2])),
    },
  ],
});
