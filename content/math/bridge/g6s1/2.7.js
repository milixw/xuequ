'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 2.7 分数与小数的互化（含课本"拓展：无限循环小数与分数的互化"）
// 知识范围：分数化小数（分子除以分母）、有限小数化分数、能化成有限小数的条件（最简分数的分母只含素因数 2、5）、
//           循环小数、循环节、纯循环小数和混循环小数化分数；可以使用第 1 章和 2.1～2.6
// 还没学：负数；π 在圆的一章（不在衔接范围）
// 注意：填空按数值判分，"化成分数"的题直接问分数会被小数答案蒙过，所以改问分子分母之和等
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/2.7',
  title: '分数与小数的互化',
  review: { status: 'pending' },

  intro: [
    {
      title: '分数化小数',
      body: '分数化小数，用分子除以分母。有的能除尽，得到**有限小数**；有的除不尽，从某一位起一个或几个数字依次不断重复出现，得到**循环小数**，重复的部分叫**循环节**，在循环节首末位上加点表示。',
      example: '$\\frac{3}{16}=3\\div 16=0.1875$；$\\frac{5}{6}=0.8333\\cdots=0.8\\dot{3}$。',
    },
    {
      title: '有限小数化分数',
      body: '有限小数化分数：几位小数就写成分母是 10、100、1000……的分数，再约分。',
      example: '$0.45=\\frac{45}{100}=\\frac{9}{20}$。',
    },
    {
      title: '什么分数能化成有限小数',
      body: '一个**最简分数**，如果分母除了 2 和 5 以外**没有别的素因数**，就能化成有限小数；否则就化成循环小数。',
      example: '$\\frac{7}{40}$：$40=2\\times 2\\times 2\\times 5$，能化成有限小数 0.175；$\\frac{7}{12}$：$12$ 含素因数 3，化成循环小数。',
      pitfall: '一定要先约分再看分母。$\\frac{9}{15}$ 的分母有 3，但约分后是 $\\frac{3}{5}$，能化成有限小数 0.6。',
    },
    {
      title: '循环小数化分数',
      body: '**纯循环小数**（从小数点后第一位就开始循环）：循环节有几位，分母就写几个 9，分子是一个循环节组成的数。**混循环小数**：分子是"不循环部分连同一个循环节组成的数"减去"不循环部分组成的数"，分母是几个 9 后面接几个 0（9 的个数等于循环节位数，0 的个数等于不循环部分位数）。',
      example: '$0.\\dot{4}\\dot{5}=\\frac{45}{99}=\\frac{5}{11}$；$0.2\\dot{3}=\\frac{23-2}{90}=\\frac{21}{90}=\\frac{7}{30}$。',
      pitfall: '道理：$0.\\dot{4}\\dot{5}$ 的 100 倍是 $45.\\dot{4}\\dot{5}$，两者相差正好 45，而这是原数的 99 倍，所以原数是 $\\frac{45}{99}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.7-b01',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\frac{7}{16}$、$\\frac{5}{14}$、$\\frac{21}{35}$、$\\frac{11}{30}$、$\\frac{39}{65}$、$\\frac{13}{250}$ 中，能化成有限小数的有几个？',
      blanks: [{ kind: 'num', answer: '4', suffix: '个' }],
      explain: [
        '先约分，再看分母有没有 2、5 以外的素因数。',
        '$\\frac{7}{16}$：$16$ 只含 2，能。$\\frac{5}{14}$：含 7，不能。$\\frac{21}{35}=\\frac{3}{5}$，能。$\\frac{11}{30}$：含 3，不能。$\\frac{39}{65}=\\frac{3}{5}$，能。$\\frac{13}{250}$：$250=2\\times 5\\times 5\\times 5$，能。',
        '共 4 个。易错：不约分，看到 35、65 含 7、13 就判断不能。',
      ],
      verify: () => {
        const fin = f => { let d = Number(f.d); while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; };
        return ['7/16', '5/14', '21/35', '11/30', '39/65', '13/250'].map(x => F(x)).filter(fin).length;
      },
    },
    {
      id: '2.7-b02',
      level: 'basic',
      type: 'fill',
      stem: '把小数化成最简分数：',
      blanks: [
        { kind: 'num', label: '(1) 0.625 化成最简分数后，分子与分母的和是', answer: '13' },
        { kind: 'num', label: '(2) 2.35 化成最简分数（假分数）后，分子与分母的和是', answer: '67' },
      ],
      explain: [
        '(1) $0.625=\\frac{625}{1000}$，625 和 1000 的最大公因数是 125，约分得 $\\frac{5}{8}$，和是 13。',
        '(2) $2.35=\\frac{235}{100}=\\frac{47}{20}$，和是 67。',
        '易错：没约到最简，比如写成 $\\frac{25}{40}$。',
      ],
      verify: () => { const a = F(625).div(1000); const b = F(235).div(100); return [Number(a.n + a.d), Number(b.n + b.d)]; },
    },
    {
      id: '2.7-b03',
      level: 'basic',
      type: 'choice',
      stem: '$0.\\dot{6}$、$\\frac{2}{3}$、$0.67$、$0.6\\dot{7}$ 四个数中，最大的是（ ）',
      options: ['$0.\\dot{6}$', '$\\frac{2}{3}$', '$0.67$', '$0.6\\dot{7}$'],
      answer: 3,
      explain: [
        '$0.\\dot{6}=0.6666\\cdots$，$\\frac{2}{3}=0.6666\\cdots$，两者相等。',
        '$0.67=0.6700$，$0.6\\dot{7}=0.6777\\cdots$，比 0.67 大。',
        '最大的是 $0.6\\dot{7}$。选 D。易错：以为 0.67 比 $0.6\\dot{7}$ 大，或者以为 $\\frac{2}{3}$ 比 $0.\\dot{6}$ 大。',
      ],
      verify: () => {
        const xs = [F(6).div(9), F(2).div(3), F(67).div(100), F(67 - 6).div(90)];
        let m = 0;
        xs.forEach((x, i) => { if (x.cmp(xs[m]) > 0) m = i; });
        return m;
      },
    },
    {
      id: '2.7-b04',
      level: 'basic',
      type: 'fill',
      stem: '把 $\\frac{7}{11}$ 化成小数，小数点后第 100 位上的数字是几？',
      blanks: [{ kind: 'num', answer: '3' }],
      explain: [
        '$7\\div 11=0.6363\\cdots=0.\\dot{6}\\dot{3}$，循环节是 63，两位一循环。',
        '第 100 位：$100\\div 2=50$，正好 50 个完整的循环节，是循环节的最后一位 3。',
        '易错：第 100 位是偶数位，对应 3，而不是 6。',
      ],
      verify: () => { let r = 7; let d = 0; for (let i = 1; i <= 100; i++) { r *= 10; d = Math.floor(r / 11); r %= 11; } return d; },
    },
    {
      id: '2.7-b05',
      level: 'basic',
      type: 'fill',
      stem: '分数 $\\frac{a}{12}$（$a$ 是 1～11 中的整数）中，能化成有限小数的有几个？',
      blanks: [{ kind: 'num', answer: '3', suffix: '个' }],
      explain: [
        '$12=2\\times 2\\times 3$，分母含素因数 3。要化成有限小数，约分时必须把 3 约掉，也就是 $a$ 是 3 的倍数。',
        '$a$ 是 3、6、9：$\\frac{3}{12}=\\frac{1}{4}$、$\\frac{6}{12}=\\frac{1}{2}$、$\\frac{9}{12}=\\frac{3}{4}$，都能化成有限小数。',
        '共 3 个。易错：看到分母 12 含 3，就以为一个都不能。',
      ],
      verify: () => {
        let c = 0;
        for (let a = 1; a <= 11; a++) { let d = Number(F(a).div(12).d); while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; if (d === 1) c++; }
        return c;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '2.7-e01',
      level: 'extended',
      type: 'fill',
      stem: '计算（结果写成分数或整数）：',
      blanks: [
        { kind: 'num', label: '(1) $0.\\dot{2}\\dot{7}+0.\\dot{7}\\dot{2}=$', answer: '1' },
        { kind: 'num', label: '(2) $0.1\\dot{6}\\times 3=$', answer: '1/2' },
      ],
      explain: [
        '(1) $0.\\dot{2}\\dot{7}=\\frac{27}{99}$，$0.\\dot{7}\\dot{2}=\\frac{72}{99}$，和是 $\\frac{99}{99}=1$。',
        '(2) $0.1\\dot{6}=\\frac{16-1}{90}=\\frac{15}{90}=\\frac{1}{6}$，乘 3 得 $\\frac{1}{2}$。',
        '易错：(1) 直接按小数加法写成 0.99…，不知道它就是 1；(2) 把 $0.1\\dot{6}$ 当成 $\\frac{16}{99}$。',
      ],
      verify: () => [F(27).div(99).add(F(72).div(99)), F(15).div(90).mul(3)],
    },
    {
      id: '2.7-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a=0.\\dot{1}2\\dot{3}$，$b=0.\\dot{2}3\\dot{1}$，$c=0.\\dot{3}1\\dot{2}$。$a$、$b$、$c$ 的平均数是多少？',
      blanks: [{ kind: 'num', answer: '2/9' }],
      explain: [
        '三个都是循环节 3 位的纯循环小数：$a=\\frac{123}{999}$，$b=\\frac{231}{999}$，$c=\\frac{312}{999}$。',
        '和是 $\\frac{123+231+312}{999}=\\frac{666}{999}=\\frac{2}{3}$。',
        '平均数是 $\\frac{2}{3}\\div 3=\\frac{2}{9}$。',
        '也可以观察：三个循环节的每一位上 1、2、3 各出现一次，和的每一位都是 6，即 $0.\\dot{6}=\\frac{2}{3}$。',
      ],
      verify: () => F(123).add(231).add(312).div(999).div(3),
    },
    {
      id: '2.7-e03',
      level: 'extended',
      type: 'fill',
      stem: '比较 $\\frac{1}{7}$、$0.1\\dot{4}$、$0.\\dot{1}\\dot{4}$、$0.14\\dot{2}$、$0.\\dot{1}4\\dot{2}$ 的大小。',
      blanks: [
        { kind: 'num', label: '(1) 最大的数化成最简分数是', answer: '13/90' },
        { kind: 'num', label: '(2) 最小的数化成最简分数是', answer: '14/99' },
      ],
      explain: [
        '都写出前几位：$\\frac{1}{7}=0.142857\\cdots$，$0.1\\dot{4}=0.14444\\cdots$，$0.\\dot{1}\\dot{4}=0.141414\\cdots$，$0.14\\dot{2}=0.14222\\cdots$，$0.\\dot{1}4\\dot{2}=0.142142\\cdots$。',
        '逐位比较：前两位都是 0.14；第三位 4 最大的是 $0.1\\dot{4}$，第三位 1 最小的是 $0.\\dot{1}\\dot{4}$。',
        '(1) 最大 $0.1\\dot{4}=\\frac{14-1}{90}=\\frac{13}{90}$。(2) 最小 $0.\\dot{1}\\dot{4}=\\frac{14}{99}$。',
        '易错：只看循环点标出的数字，没把小数展开写几位再比较。',
      ],
      verify: () => {
        const xs = [F(1).div(7), F(13).div(90), F(14).div(99), F(142 - 14).div(900), F(142).div(999)];
        xs.sort((a, b) => a.cmp(b));
        return [xs[xs.length - 1], xs[0]];
      },
    },
    {
      id: '2.7-e04',
      level: 'extended',
      type: 'fill',
      stem: '把循环小数化成最简分数：',
      blanks: [
        { kind: 'num', label: '(1) $0.\\dot{3}\\dot{6}$ 化成最简分数后，分子与分母的和是', answer: '15' },
        { kind: 'num', label: '(2) $0.4\\dot{5}$ 化成最简分数后，分子与分母的和是', answer: '131' },
      ],
      explain: [
        '(1) 纯循环，循环节 2 位：$\\frac{36}{99}=\\frac{4}{11}$，和是 15。',
        '(2) 混循环，不循环部分 1 位、循环节 1 位：分子 $45-4=41$，分母 90，$\\frac{41}{90}$ 已是最简分数，和是 131。',
        '易错：把 $0.4\\dot{5}$ 化成 $\\frac{45}{99}$ 或 $\\frac{45}{90}$。',
      ],
      verify: () => { const a = F(36).div(99); const b = F(45 - 4).div(90); return [Number(a.n + a.d), Number(b.n + b.d)]; },
    },
    {
      id: '2.7-e05',
      level: 'extended',
      type: 'fill',
      stem: '在 1～100 中，有多少个正整数 $n$，使 $\\frac{1}{n}$ 能化成有限小数（整数也算）？',
      blanks: [{ kind: 'num', answer: '15', suffix: '个' }],
      explain: [
        '$\\frac{1}{n}$ 已是最简分数，能化成有限小数，要求 $n$ 只含素因数 2 和 5，也就是 $n$ = 若干个 2 与若干个 5 的积。',
        '按 5 的个数分类：不含 5：1、2、4、8、16、32、64（7 个）；含一个 5：5、10、20、40、80（5 个）；含两个 5：25、50、100（3 个）。',
        '共 $7+5+3=15$ 个。易错：漏掉 $n=1$ 或 $n=100$。',
      ],
      verify: () => {
        let c = 0;
        for (let n = 1; n <= 100; n++) { let m = n; while (m % 2 === 0) m /= 2; while (m % 5 === 0) m /= 5; if (m === 1) c++; }
        return c;
      },
    },
    {
      id: '2.7-e06',
      level: 'extended',
      type: 'fill',
      stem: '分数 $\\frac{a}{360}$（$a$ 是 1～359 中的整数）中，能化成有限小数的有几个？',
      blanks: [{ kind: 'num', answer: '39', suffix: '个' }],
      explain: [
        '$360=2\\times 2\\times 2\\times 3\\times 3\\times 5$，含两个素因数 3。约分后分母不能再含 3，所以 $a$ 要能把两个 3 都约掉，即 $a$ 是 9 的倍数。',
        '1～359 中 9 的倍数：$359\\div 9=39\\cdots\\cdots 8$，有 39 个。',
        '易错：以为 $a$ 是 3 的倍数就行（如 $\\frac{3}{360}=\\frac{1}{120}$，120 仍含 3）。',
      ],
      verify: () => {
        let c = 0;
        for (let a = 1; a < 360; a++) { let d = Number(F(a).div(360).d); while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; if (d === 1) c++; }
        return c;
      },
    },
    {
      id: '2.7-e07',
      level: 'extended',
      type: 'fill',
      stem: '分数 $\\frac{\\square}{7}$ 是真分数，化成小数后小数点后第一位是 8。',
      blanks: [
        { kind: 'num', label: '(1) $\\square$ 里是几', answer: '6' },
        { kind: 'num', label: '(2) 这个小数的小数点后第 2026 位是几', answer: '1' },
      ],
      explain: [
        '(1) 小数点后第一位是 8，这个分数在 0.8 和 0.9 之间：$\\frac{\\square}{7}$ 比 $\\frac{8}{10}$ 大、比 $\\frac{9}{10}$ 小，$\\square\\times 10$ 在 56 和 63 之间，$\\square=6$。',
        '(2) $\\frac{6}{7}=0.\\dot{8}5714\\dot{2}$，循环节 857142，6 位。$2026\\div 6=337\\cdots\\cdots 4$，是循环节的第 4 位，即 1。',
        '易错：(2) 余数 4 对应第 4 位，不要数成第 5 位。',
      ],
      verify: () => {
        let sq = 0;
        for (let x = 1; x < 7; x++) if (Math.floor((x * 10) / 7) === 8) sq = x;
        let r = sq;
        let d = 0;
        for (let i = 1; i <= 2026; i++) { r *= 10; d = Math.floor(r / 7); r %= 7; }
        return [sq, d];
      },
    },
    {
      id: '2.7-e08',
      level: 'extended',
      type: 'fill',
      stem: '把 $\\frac{1}{2}$、$\\frac{1}{3}$、$\\frac{1}{4}$、……、$\\frac{1}{20}$ 这 19 个分数都化成小数。',
      blanks: [
        { kind: 'num', label: '(1) 化成纯循环小数的有几个', answer: '7' },
        { kind: 'num', label: '(2) 化成混循环小数的有几个', answer: '5' },
      ],
      explain: [
        '分母只含 2、5：有限小数；分母不含 2、5：纯循环小数；分母既含 2 或 5、又含别的素因数：混循环小数。',
        '有限小数：分母 2、4、5、8、10、16、20，共 7 个。',
        '(1) 纯循环：分母 3、7、9、11、13、17、19，共 7 个。(2) 混循环：剩下的 6、12、14、15、18，共 5 个（例如 $\\frac{1}{6}=0.1\\dot{6}$）。',
        '易错：把 $\\frac{1}{15}=0.0\\dot{6}$ 当成纯循环小数。',
      ],
      verify: () => {
        let pure = 0;
        let mixed = 0;
        for (let n = 2; n <= 20; n++) {
          let m = n;
          while (m % 2 === 0) m /= 2;
          while (m % 5 === 0) m /= 5;
          if (m === 1) continue;
          if (m === n) pure++; else mixed++;
        }
        return [pure, mixed];
      },
    },
    {
      id: '2.7-e09',
      level: 'extended',
      type: 'fill',
      stem: '计算：$0.\\dot{3}\\times 0.\\dot{6}+0.\\dot{1}$（结果写成分数）',
      blanks: [{ kind: 'num', answer: '1/3' }],
      explain: [
        '循环小数先化成分数：$0.\\dot{3}=\\frac{3}{9}=\\frac{1}{3}$，$0.\\dot{6}=\\frac{2}{3}$，$0.\\dot{1}=\\frac{1}{9}$。',
        '$\\frac{1}{3}\\times\\frac{2}{3}+\\frac{1}{9}=\\frac{2}{9}+\\frac{1}{9}=\\frac{1}{3}$。',
        '易错：按小数直接乘，写成 0.18…，结果不准确。',
      ],
      verify: () => F(1).div(3).mul(F(2).div(3)).add(F(1).div(9)),
    },
    {
      id: '2.7-e10',
      level: 'extended',
      type: 'fill',
      stem: '一个最简真分数 $\\frac{7}{M}$ 化成小数后，从小数点后第一位起，连续若干位数字之和恰好是 2026。$M$ 最小是多少？',
      blanks: [{ kind: 'num', answer: '12' }],
      explain: [
        '$\\frac{7}{M}$ 是最简真分数，$M$ 比 7 大、不是 7 的倍数。从小往大试。',
        '$M=8$：$0.875$，有限小数，数字和最多 20。$M=9$：$0.\\dot{7}$，数字和总是 7 的倍数，而 $2026\\div 7=289\\cdots\\cdots 3$，不行。$M=10$：0.7，不行。',
        '$M=11$：$0.\\dot{6}\\dot{3}$，前 1 位和 6，前 2 位和 9，之后每 2 位加 9，前若干位的和除以 9 的余数只能是 6 或 0。$2026\\div 9=225\\cdots\\cdots 1$，不行。',
        '$M=12$：$\\frac{7}{12}=0.58\\dot{3}$，前 2 位和 13，之后每一位加 3。$2026-13=2013=3\\times 671$，所以取前 $2+671=673$ 位时和恰好是 2026。',
        '$M$ 最小是 12。',
      ],
      verify: () => {
        const g = (a, b) => (b ? g(b, a % b) : a);
        for (let M = 8; M <= 200; M++) {
          if (g(7, M) !== 1) continue;
          let r = 7;
          let s = 0;
          for (let i = 0; i < 10000; i++) { r *= 10; s += Math.floor(r / M); r %= M; if (s === 2026) return M; if (s > 2026 || r === 0) break; }
        }
        return 0;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.7-c01',
      level: 'challenge',
      type: 'fill',
      stem: '分母是两位数的最简真分数中：',
      blanks: [
        { kind: 'num', label: '(1) 化成小数后是纯循环小数、而且循环节恰好有 2 位的有几个', answer: '90' },
        { kind: 'num', label: '(2) 化成小数后是纯循环小数、而且循环节恰好有 3 位的有几个', answer: '54' },
      ],
      explain: [
        '思路：反过来想。纯循环、循环节 2 位的小数 $0.\\dot{a}\\dot{b}$ 等于 $\\frac{ab}{99}$（$ab$ 表示两位数字组成的数），约分后分母一定是 99 的因数。',
        '(1) 99 的两位数因数：11、33、99（$99=3\\times 3\\times 11$）。反过来，分母是这三个数的最简真分数，化成小数都是循环节 2 位的纯循环小数（分母不是 3 或 9，所以循环节不会只有 1 位）。',
        '数最简真分数的个数（分子与分母互素）：分母 11 有 10 个；分母 33 有 $32-10-2=20$ 个（去掉 3 的倍数 10 个、11 的倍数 2 个）；分母 99 有 $98-32-8+2=60$ 个（去掉 3 的倍数 32 个、11 的倍数 8 个，加回 33、66）。共 90 个。',
        '(2) 同理，循环节 3 位的纯循环小数等于 $\\frac{abc}{999}$，$999=3\\times 3\\times 3\\times 37$，两位数因数是 27 和 37。',
        '分母 27：分子不能是 3 的倍数，有 18 个；分母 37：37 是素数，有 36 个。（它们的循环节确实是 3 位，例如 $\\frac{1}{27}=0.\\dot{0}3\\dot{7}$、$\\frac{1}{37}=0.\\dot{0}2\\dot{7}$。）共 54 个。',
        '易错：把分母 9、3 这样循环节只有 1 位的也算进去；或者忘了分子要和分母互素。',
      ],
      verify: () => {
        const g = (a, b) => (b ? g(b, a % b) : a);
        const per = (a, b) => {
          let x = b;
          while (x % 2 === 0) x /= 2;
          while (x % 5 === 0) x /= 5;
          if (x !== b) return -1;
          let r = a % b;
          const r0 = r;
          let k = 0;
          do { r = (r * 10) % b; k++; } while (r !== r0);
          return k;
        };
        let c2 = 0;
        let c3 = 0;
        for (let b = 10; b <= 99; b++) for (let a = 1; a < b; a++) if (g(a, b) === 1) { const p = per(a, b); if (p === 2) c2++; if (p === 3) c3++; }
        return [c2, c3];
      },
    },
    {
      id: '2.7-c02',
      level: 'challenge',
      type: 'fill',
      stem: '$a$、$b$ 是 0～9 中的数字，把它们依次排成循环节，得到纯循环小数 $0.\\dot{a}\\dot{b}$ 和 $0.\\dot{b}\\dot{a}$。',
      blanks: [
        { kind: 'num', label: '(1) 如果 $0.\\dot{a}\\dot{b}+0.\\dot{b}\\dot{a}=1\\frac{1}{3}$，这样的两位数字组合 $ab$（$a$ 在前）有几个', answer: '7' },
        { kind: 'num', label: '(2) 如果 $0.\\dot{a}\\dot{b}-0.\\dot{b}\\dot{a}=\\frac{5}{11}$，这样的 $ab$ 有几个', answer: '5' },
      ],
      explain: [
        '思路：化成分数，把条件变成关于数字 $a$、$b$ 的简单关系，再数有几组。',
        '$0.\\dot{a}\\dot{b}=\\frac{10\\times a+b}{99}$，$0.\\dot{b}\\dot{a}=\\frac{10\\times b+a}{99}$。',
        '(1) 相加：$\\frac{11\\times a+11\\times b}{99}=\\frac{a+b}{9}=1\\frac{1}{3}=\\frac{12}{9}$，所以 $a+b=12$。',
        '数字和为 12：$a$ 从 3 到 9，$b=12-a$ 是 9 到 3，共 7 组（包括 $a=b=6$）。',
        '(2) 相减：$\\frac{9\\times a-9\\times b}{99}=\\frac{a-b}{11}=\\frac{5}{11}$，所以 $a-b=5$：$a$ 是 5～9，$b$ 是 0～4，共 5 组（$b$ 可以是 0，如 $0.\\dot{5}\\dot{0}-0.\\dot{0}\\dot{5}$）。',
        '易错：(1) 漏掉 $a=b=6$；(2) 以为 $b$ 不能是 0。',
      ],
      verify: () => {
        let c1 = 0;
        let c2 = 0;
        for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
          const x = F(10 * a + b).div(99);
          const y = F(10 * b + a).div(99);
          if (x.add(y).eq(F(4).div(3))) c1++;
          if (x.sub(y).eq(F(5).div(11))) c2++;
        }
        return [c1, c2];
      },
    },
    {
      id: '2.7-c03',
      level: 'challenge',
      type: 'fill',
      stem: '把分数 $\\frac{1}{n}$ 化成小数：',
      blanks: [
        { kind: 'num', label: '(1) $n$ 取 2～100，化成的小数恰好是两位有限小数的 $n$ 有几个', answer: '5' },
        { kind: 'num', label: '(2) $n$ 取 2～30，化成混循环小数、而且不循环部分恰好 1 位的 $n$ 有几个', answer: '7' },
      ],
      explain: [
        '思路：有限小数的位数，看分母里 2 和 5 的个数。$\\frac{1}{n}$ 化成小数的小数位数（或不循环部分的位数），等于 $n$ 中 2 的个数和 5 的个数里较大的那一个。道理：乘上 10、100、1000……后要把分母里的 2 和 5 全部约掉，几个 2 就需要几个 10。',
        '(1) 两位有限小数：$n$ 只含 2、5，并且 2 的个数和 5 的个数中较大的是 2：$4$、$4\\times 5=20$、$25$、$25\\times 2=50$、$4\\times 25=100$，共 5 个（$\\frac{1}{4}=0.25$，$\\frac{1}{20}=0.05$，$\\frac{1}{25}=0.04$，$\\frac{1}{50}=0.02$，$\\frac{1}{100}=0.01$）。',
        '(2) 混循环：$n$ 既含 2 或 5，又含别的素因数；不循环部分 1 位：2、5 的个数中较大的是 1，也就是 $n$ 是 2、5 或 10 乘一个和 10 互素的数（大于 1）。',
        '不超过 30：$2\\times 3=6$、$2\\times 7=14$、$2\\times 9=18$、$2\\times 11=22$、$2\\times 13=26$、$5\\times 3=15$、$10\\times 3=30$，共 7 个（例如 $\\frac{1}{14}=0.0\\dot{7}1428\\dot{5}$）。',
        '易错：(1) 把 $\\frac{1}{8}=0.125$ 算进去；(2) 把 12（含两个 2，$\\frac{1}{12}=0.08\\dot{3}$，不循环部分 2 位）算进去。',
      ],
      verify: () => {
        const two5 = n => { let a = 0; let b = 0; let m = n; while (m % 2 === 0) { m /= 2; a++; } while (m % 5 === 0) { m /= 5; b++; } return [Math.max(a, b), m]; };
        let c1 = 0;
        for (let n = 2; n <= 100; n++) { const [k, m] = two5(n); if (m === 1 && k === 2) c1++; }
        let c2 = 0;
        for (let n = 2; n <= 30; n++) { const [k, m] = two5(n); if (m > 1 && k === 1) c2++; }
        return [c1, c2];
      },
    },
    {
      id: '2.7-c04',
      level: 'challenge',
      type: 'fill',
      stem: '把 $\\frac{1}{7}+\\frac{1}{13}$ 的结果化成小数。',
      blanks: [
        { kind: 'num', label: '(1) 小数点后第 2026 位上的数字是', answer: '7' },
        { kind: 'num', label: '(2) 小数点后前 2026 位数字之和是', answer: '9118' },
      ],
      explain: [
        '思路：$\\frac{1}{7}=0.\\dot{1}4285\\dot{7}$，$\\frac{1}{13}=0.\\dot{0}7692\\dot{3}$，按位相加会进位，不能直接把两个循环节加起来找规律。先算出和再化小数。',
        '$\\frac{1}{7}+\\frac{1}{13}=\\frac{13+7}{91}=\\frac{20}{91}$。$20\\div 91=0.219780219780\\cdots=0.\\dot{2}1978\\dot{0}$，循环节 219780，6 位。',
        '(1) $2026\\div 6=337\\cdots\\cdots 4$，第 2026 位是循环节第 4 位，即 7。',
        '(2) 一个循环节的数字和 $2+1+9+7+8+0=27$，337 个完整循环节和为 $27\\times 337=9099$，再加上循环节前 4 位 $2+1+9+7=19$，共 9118。',
        '易错：把两个小数的循环节逐位相加（$1+0$、$4+7$……），没有处理进位。',
      ],
      verify: () => {
        const f = F(1).div(7).add(F(1).div(13));
        const n = Number(f.n);
        const d = Number(f.d);
        let r = n % d;
        let s = 0;
        let last = 0;
        for (let i = 1; i <= 2026; i++) { r *= 10; last = Math.floor(r / d); r %= d; s += last; }
        return [last, s];
      },
    },
    {
      id: '2.7-c05',
      level: 'challenge',
      type: 'fill',
      stem: '$a$、$b$ 是 1～9 中的数字，混循环小数 $0.a\\dot{b}$（小数点后第一位是 $a$，从第二位起 $b$ 不断重复）恰好等于分数 $\\frac{a}{b}$。',
      blanks: [
        { kind: 'num', label: '(1) 这样的 $a$、$b$ 一共有几组', answer: '2' },
        { kind: 'num', label: '(2) 其中 $a$、$b$ 不相等的那一组，$\\frac{a}{b}$ 等于多少', answer: '1/6' },
      ],
      explain: [
        '思路：化成分数，得到数字之间的关系，再对 $b$ 分类。',
        '$0.a\\dot{b}=\\frac{(10\\times a+b)-a}{90}=\\frac{9\\times a+b}{90}$。要等于 $\\frac{a}{b}$：通分后 $b\\times(9\\times a+b)=90\\times a$。',
        '$b\\times b=90\\times a-9\\times a\\times b=9\\times a\\times(10-b)$，所以 $b\\times b$ 是 9 的倍数，$b$ 是 3、6 或 9。',
        '$b=3$：$9=9\\times a\\times 7$，不行；$b=6$：$36=9\\times a\\times 4$，$a=1$；$b=9$：$81=9\\times a\\times 1$，$a=9$。',
        '(1) 共 2 组：$0.1\\dot{6}=\\frac{1}{6}$，$0.9\\dot{9}=\\frac{9}{9}=1$（$0.9\\dot{9}$ 确实等于 1）。',
        '(2) $a\\ne b$ 的是 $\\frac{1}{6}$。易错：以为 $0.9\\dot{9}$ 比 1 小，漏掉这一组。',
      ],
      verify: () => {
        const r = [];
        for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) if (F(9 * a + b).div(90).eq(F(a).div(b))) r.push([a, b]);
        const d = r.find(([a, b]) => a !== b);
        return [r.length, d ? F(d[0]).div(d[1]) : F(0)];
      },
    },
  ],
});
