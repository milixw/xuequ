'use strict';

// 上海数学六年级上册 · 1.3 有理数的乘法与除法
// 知识范围：乘法法则、多个数相乘的符号、乘法运算律、倒数、除法法则、乘除混合；可以使用 1.1、1.2 的全部内容
// 还没学：乘方、代数式、方程

Content.section({
  id: 'math/sh2024/g6s1/1.3',
  title: '有理数的乘法与除法',
  review: { status: 'pending' },
  audit: { blind: '2026-09-19', rounds: 3, note: '难度上移后子代理复核三轮：新题答案全部一致，第 3 轮判定整节通过（按意见调整 e08 解析措辞和运算符号）' },

  intro: [
    {
      title: '有理数的乘法法则',
      body: '两数相乘，**同号得正，异号得负**，并把绝对值相乘。任何数与 0 相乘，积都是 0。',
      example: '$(-3)\\times(-4)=12$；$(-1.5)\\times 6=-9$；$0\\times(-7)=0$。',
      pitfall: '先定符号，再算绝对值，和加法一样。但符号规则不同：异号两数相加，要看绝对值的大小来定符号；两数相乘，只看同号还是异号。',
    },
    {
      title: '多个数相乘',
      body: '几个不为 0 的数相乘，积的符号由**负因数的个数**决定：负因数有奇数个，积为负；有偶数个，积为正。只要有一个因数是 0，积就是 0。',
      example: '$(-2)\\times(-1)\\times(-5)=-10$（3 个负因数）；$(-4)\\times 5\\times\\left(-\\frac{1}{2}\\right)=10$（2 个负因数）。',
    },
    {
      title: '倒数',
      body: '乘积是 1 的两个数互为**倒数**。$a$（$a\\ne 0$）的倒数是 $\\frac{1}{a}$。正数的倒数是正数，负数的倒数是负数，**0 没有倒数**。',
      example: '$-\\frac{2}{3}$ 的倒数是 $-\\frac{3}{2}$；$-1\\frac{2}{5}=-\\frac{7}{5}$，它的倒数是 $-\\frac{5}{7}$。',
      pitfall: '求带分数的倒数，要先化成假分数。别把倒数和相反数弄混：倒数不改变符号。',
    },
    {
      title: '有理数的除法法则',
      body: '**除以一个不为 0 的数，等于乘这个数的倒数**。所以两数相除，同号得正，异号得负，并把绝对值相除。0 除以任何不为 0 的数都得 0；**0 不能作除数**。',
      example: '$\\left(-\\frac{4}{5}\\right)\\div\\left(-\\frac{2}{15}\\right)=\\frac{4}{5}\\times\\frac{15}{2}=6$。',
    },
    {
      title: '乘法运算律与乘除混合',
      body: '乘法满足**交换律** $a\\times b=b\\times a$、**结合律** $(a\\times b)\\times c=a\\times(b\\times c)$ 和**分配律** $a\\times(b+c)=a\\times b+a\\times c$。乘除混合运算：先把除法都变成乘法，再确定积的符号，最后约分计算。全部变成乘法以后，就可以用交换律、结合律调整计算顺序。',
      example: '$\\left(\\frac{1}{4}-\\frac{5}{6}+\\frac{2}{3}\\right)\\times(-24)=-6+20-16=-2$。',
      pitfall: '除法没有分配律：$12\\div\\left(\\frac{1}{4}-\\frac{1}{3}\\right)$ 不能拆成 $12\\div\\frac{1}{4}-12\\div\\frac{1}{3}$，要先算括号。另外，如果不把除法变成乘法，只有乘除的式子就要从左往右依次计算，不能随意调换顺序。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '1.3-b01',
      level: 'basic',
      type: 'fill',
      stem: '计算：$-4\\frac{1}{2}\\div 3\\times\\left(-\\frac{2}{3}\\right)$',
      blanks: [{ kind: 'num', answer: '1' }],
      explain: [
        '只有乘除，从左往右算。先把除法变成乘法：$-\\frac{9}{2}\\times\\frac{1}{3}\\times\\left(-\\frac{2}{3}\\right)$。',
        '2 个负因数，积为正：$\\frac{9}{2}\\times\\frac{1}{3}\\times\\frac{2}{3}=1$。',
      ],
      verify: () => F('-9/2').div(3).mul('-2/3'),
    },
    {
      id: '1.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '已知 $|a|=2$，$|b|=3$，并且 $ab<0$。求 $a+b$ 的所有可能值。（用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['1', '-1'] }],
      explain: ['$ab<0$ 说明 $a$、$b$ 异号，有两种情况。', '$a=2,\\ b=-3$ 时，$a+b=-1$；$a=-2,\\ b=3$ 时，$a+b=1$。'],
      verify: () => {
        const r = [];
        for (const a of [2, -2]) for (const b of [3, -3]) if (F(a).mul(b).cmp(0) < 0) r.push(F(a).add(b));
        return r;
      },
    },
    {
      id: '1.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '一个数与 $-\\frac{3}{5}$ 的积是 $\\frac{9}{10}$，这个数除以 $-\\frac{1}{2}$ 的商是多少？',
      blanks: [{ kind: 'num', answer: '3' }],
      explain: ['先求这个数：$\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)=\\frac{9}{10}\\times\\left(-\\frac{5}{3}\\right)=-\\frac{3}{2}$。', '再求商：$-\\frac{3}{2}\\div\\left(-\\frac{1}{2}\\right)=3$。'],
      verify: () => F('9/10').div('-3/5').div('-1/2'),
    },
    {
      id: '1.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '用简便方法计算：$99\\frac{17}{18}\\times(-9)$',
      blanks: [{ kind: 'num', answer: '-1799/2' }],
      explain: [
        '把 $99\\frac{17}{18}$ 拆成 $100-\\frac{1}{18}$，再用分配律：',
        '$\\left(100-\\frac{1}{18}\\right)\\times(-9)=-900+\\frac{1}{2}=-899\\frac{1}{2}$。',
      ],
      verify: () => F('99又17/18').mul(-9),
    },
    {
      id: '1.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\left(-\\frac{1}{30}\\right)\\div\\left(\\frac{2}{3}-\\frac{1}{10}+\\frac{1}{6}-\\frac{2}{5}\\right)$',
      blanks: [{ kind: 'num', answer: '-1/10' }],
      explain: [
        '除法没有分配律，不能拆开。可以先算出括号里的值，也可以用“倒数法”：先求原式的倒数。',
        '原式的倒数 $=\\left(\\frac{2}{3}-\\frac{1}{10}+\\frac{1}{6}-\\frac{2}{5}\\right)\\div\\left(-\\frac{1}{30}\\right)=\\left(\\frac{2}{3}-\\frac{1}{10}+\\frac{1}{6}-\\frac{2}{5}\\right)\\times(-30)$，这里可以用分配律。',
        '$=-20+3-5+12=-10$。',
        '原式的倒数是 $-10$，所以原式 $=-\\frac{1}{10}$。',
      ],
      verify: () => F('-1/30').div(F('2/3').sub('1/10').add('1/6').sub('2/5')),
    },

    // ---------- 扩展 ----------
    {
      id: '1.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$、$c$ 都是不为 0 的有理数，并且 $a+b+c=0$。求 $\\frac{a}{|a|}+\\frac{b}{|b|}+\\frac{c}{|c|}+\\frac{abc}{|abc|}$ 的所有可能值。（用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['0'] }],
      explain: [
        '关键结论：$\\frac{x}{|x|}$ 在 $x>0$ 时等于 1，在 $x<0$ 时等于 $-1$。',
        '$a+b+c=0$ 且都不为 0，所以三个数不可能同号，只有两种情况。',
        '**两正一负**：前三项的和 $=1+1-1=1$；$abc$ 有 1 个负因数，$abc<0$，最后一项是 $-1$。总和为 0。',
        '**一正两负**：前三项的和 $=1-1-1=-1$；$abc$ 有 2 个负因数，$abc>0$，最后一项是 1。总和为 0。',
        '所以只有一个可能值：0。',
      ],
      verify: () => {
        const values = [];
        for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) {
          const c = -a - b;
          if (!a || !b || !c) continue;
          const sgn = x => F(x).div(F(x).abs());
          const v = sgn(a).add(sgn(b)).add(sgn(c)).add(sgn(a * b * c));
          if (!values.some(w => w.eq(v))) values.push(v);
        }
        return values;
      },
    },
    {
      id: '1.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '计算：$-\\frac{1}{1\\times 3}-\\frac{1}{3\\times 5}-\\frac{1}{5\\times 7}-\\cdots-\\frac{1}{2023\\times 2025}$',
      blanks: [{ kind: 'num', answer: '-1012/2025' }],
      explain: [
        '观察：$\\frac{1}{1}-\\frac{1}{3}=\\frac{2}{1\\times 3}$，所以 $\\frac{1}{1\\times 3}=\\frac{1}{2}\\times\\left(1-\\frac{1}{3}\\right)$。同理 $\\frac{1}{3\\times 5}=\\frac{1}{2}\\times\\left(\\frac{1}{3}-\\frac{1}{5}\\right)$……',
        '原式 $=-\\frac{1}{2}\\times\\left[\\left(1-\\frac{1}{3}\\right)+\\left(\\frac{1}{3}-\\frac{1}{5}\\right)+\\cdots+\\left(\\frac{1}{2023}-\\frac{1}{2025}\\right)\\right]$。',
        '中括号里中间各项全部抵消，剩下 $1-\\frac{1}{2025}=\\frac{2024}{2025}$。',
        '所以原式 $=-\\frac{1}{2}\\times\\frac{2024}{2025}=-\\frac{1012}{2025}$。注意别漏乘 $\\frac{1}{2}$。',
      ],
      verify: () => {
        let s = F(0);
        for (let k = 1; k <= 2023; k += 2) s = s.sub(F(1).div(k * (k + 2)));
        return s;
      },
    },
    {
      id: '1.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\left(-\\frac{1}{2}\\right)\\times\\left(-\\frac{2}{3}\\right)\\times\\left(-\\frac{3}{4}\\right)\\times\\cdots\\times\\left(-\\frac{2024}{2025}\\right)\\div\\left(-\\frac{1}{2025}\\right)$',
      blanks: [{ kind: 'num', answer: '-1' }],
      explain: [
        '先数乘法部分的负因数：$-\\frac{1}{2}$ 到 $-\\frac{2024}{2025}$，分子从 1 到 2024，共 2024 个，是偶数，所以乘积为正。',
        '再算绝对值：$\\frac{1}{2}\\times\\frac{2}{3}\\times\\frac{3}{4}\\times\\cdots\\times\\frac{2024}{2025}$，前一个的分母和后一个的分子约掉，只剩 $\\frac{1}{2025}$。',
        '最后算除法：$\\frac{1}{2025}\\div\\left(-\\frac{1}{2025}\\right)=-1$。',
      ],
      verify: () => {
        let p = F(1);
        for (let k = 1; k <= 2024; k++) p = p.mul(F(-k).div(k + 1));
        return p.div('-1/2025');
      },
    },
    {
      id: '1.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '从 $-5,\\ -3,\\ -1,\\ 2,\\ 4,\\ 6$ 中取出三个不同的数，分别作为 $a$、$b$、$c$，计算 $\\frac{ab}{c}$ 的值。',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{ab}{c}$ 的最大值是', answer: '30' },
        { kind: 'num', label: '(2) $\\frac{ab}{c}$ 的最小值是', answer: '-24' },
      ],
      explain: [
        '要让结果的绝对值尽量大：$|ab|$ 尽量大，$|c|$ 尽量小。$|c|$ 最小的是 $-1$，其次是 2。',
        '(1) 结果要为正：$c=-1$ 时需要 $ab<0$，取 $a$、$b$ 为 $-5$ 和 6，得 $\\frac{-30}{-1}=30$。再看 $c=2$ 时 $ab>0$ 最大是 $4\\times 6=24$，只得 12，更小。最大值是 30。',
        '(2) 结果要为负：$c=-1$ 时需要 $ab>0$，最大是 $4\\times 6=24$，得 $-24$；$c=2$ 时 $ab<0$，最小是 $(-5)\\times 6=-30$，只得 $-15$。最小值是 $-24$。',
        '注意 $-1$ 已经被用作 $c$ 时，就不能再用来作 $a$ 或 $b$，所以 $(-5)\\times(-3)$ 这种组合要和 $c$ 一起考虑。',
      ],
      verify: () => {
        const xs = [-5, -3, -1, 2, 4, 6];
        let max = null;
        let min = null;
        for (const a of xs) for (const b of xs) for (const c of xs) {
          if (a === b || b === c || a === c) continue;
          const v = F(a * b).div(c);
          if (!max || v.cmp(max) > 0) max = v;
          if (!min || v.cmp(min) < 0) min = v;
        }
        return [max, min];
      },
    },
    {
      id: '1.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$、$c$、$d$ 是四个互不相等的整数，并且 $abcd=9$。求 $a+b+c+d$ 的值。',
      blanks: [{ kind: 'num', answer: '0' }],
      explain: [
        '四个数都是整数，乘积是 9，所以每个数都是 9 的因数，只能从 $\\pm 1,\\ \\pm 3,\\ \\pm 9$ 中选。',
        '如果选了 9 或 $-9$，其余三个数的乘积就是 $1$ 或 $-1$，那三个数的绝对值都只能是 1，但绝对值为 1 的整数只有 1 和 $-1$ 两个，凑不出三个互不相等的数。所以不能选 $\\pm 9$。',
        '只能从 $1,\\ -1,\\ 3,\\ -3$ 中选四个，也就是全选：$1\\times(-1)\\times 3\\times(-3)=9$，确实成立。',
        '所以 $a+b+c+d=1-1+3-3=0$。',
      ],
      verify: () => {
        const ds = [1, -1, 3, -3, 9, -9];
        const sums = new Set();
        for (let i = 0; i < ds.length; i++) for (let j = i + 1; j < ds.length; j++)
          for (let k = j + 1; k < ds.length; k++) for (let l = k + 1; l < ds.length; l++)
            if (ds[i] * ds[j] * ds[k] * ds[l] === 9) sums.add(ds[i] + ds[j] + ds[k] + ds[l]);
        return sums.size === 1 ? [...sums][0] : null;
      },
    },
    {
      id: '1.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $|a|=3$，$|b|=4$，$|c|=6$，并且 $|ab|=-ab$，$|bc|=bc$，$a+b+c>0$。求 $a\\div b\\div c$ 的值。',
      blanks: [{ kind: 'num', answer: '-1/8' }],
      explain: [
        '$|ab|=-ab$ 说明 $ab\\le 0$，而 $a$、$b$ 都不为 0，所以 $ab<0$，$a$、$b$ 异号。',
        '$|bc|=bc$ 说明 $bc\\ge 0$，同理 $bc>0$，$b$、$c$ 同号。所以 $a$ 与 $b$、$c$ 都异号。',
        '分两种情况用 $a+b+c>0$ 检验：$b$、$c$ 为正、$a$ 为负时，$-3+4+6=7>0$，成立；$b$、$c$ 为负、$a$ 为正时，$3-4-6=-7<0$，不成立。',
        '所以 $a=-3,\\ b=4,\\ c=6$，$a\\div b\\div c=-3\\div 4\\div 6=-\\frac{1}{8}$。',
      ],
      verify: () => {
        const r = [];
        for (const a of [3, -3]) for (const b of [4, -4]) for (const c of [6, -6]) {
          if (Math.abs(a * b) === -a * b && Math.abs(b * c) === b * c && a + b + c > 0) r.push(F(a).div(b).div(c));
        }
        return r.length === 1 ? r[0] : null;
      },
    },
    {
      id: '1.3-e07',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$ 互为倒数，$c$、$d$ 互为相反数，$m$ 的绝对值是 2。求 $3ab-(c+d)\\div m+m$ 的所有可能值。（用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['5', '1'] }],
      explain: [
        '互为倒数的两个数积为 1：$ab=1$；互为相反数的两个数和为 0：$c+d=0$；$m=2$ 或 $-2$（都不为 0，可以作除数）。',
        '$(c+d)\\div m=0\\div m=0$。',
        '原式 $=3\\times 1-0+m=3+m$。$m=2$ 时为 5，$m=-2$ 时为 1。',
      ],
      verify: () => [2, -2].map(m => F(3).mul(1).sub(F(0).div(m)).add(m)),
    },
    {
      id: '1.3-e08',
      level: 'extended',
      type: 'fill',
      stem: '规定一种新运算：$a\\odot b=|a|\\times b-a\\div|b|$（$b\\ne 0$）。若 $x\\odot 2=5$，求 $x$ 的所有可能值。（用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['10/3', '-2'] }],
      explain: [
        '$x\\odot 2=|x|\\times 2-x\\div 2$。$|x|$ 要按 $x$ 的正负分开处理。',
        '$x\\ge 0$ 时：$|x|=x$，结果是“$x$ 的 2 倍减去 $x$ 的一半”，也就是 $x$ 的 1.5 倍。等于 5，所以 $x=5\\div 1.5=\\frac{10}{3}$，确实大于 0。',
        '$x<0$ 时：$|x|=-x$，结果是“$x$ 的 $-2$ 倍减去 $x$ 的一半”，也就是 $x$ 的 $-2.5$ 倍。等于 5，所以 $x=5\\div(-2.5)=-2$，确实小于 0。',
        '两个都符合，$x=\\frac{10}{3}$ 或 $-2$。每种情况求出后都要检验是否符合前提。',
      ],
      verify: () => {
        const op = (a, b) => F(a).abs().mul(b).sub(F(a).div(F(b).abs()));
        const r = [];
        for (let i = -240; i <= 240; i++) if (op(F(i).div(12), 2).eq(5)) r.push(F(i).div(12));
        return r;
      },
    },
    {
      id: '1.3-e09',
      level: 'extended',
      type: 'multi',
      stem: '已知有理数 $a$、$b$、$c$ 满足 $ab>0$，$bc<0$，并且 $|a|>|b|>|c|$。下列结论中**一定成立**的有（多选）',
      options: ['$(a+b)\\times(b+c)>0$', '$(a+b)\\div c<0$', '$abc>0$', '$(b+c)\\div(a+b)>0$'],
      answer: [0, 1, 3],
      explain: [
        '$ab>0$：$a$、$b$ 同号；$bc<0$：$b$、$c$ 异号。所以 $a$、$b$ 同号，$c$ 和它们异号。',
        '$a+b$：同号相加，与 $b$ 同号。$b+c$：异号相加，$|b|>|c|$，符号跟 $b$，也与 $b$ 同号。',
        'A：两个因数都与 $b$ 同号，积为正，成立。B：$a+b$ 与 $b$ 同号，$c$ 与 $b$ 异号，商为负，成立。D：两个数都与 $b$ 同号，商为正，成立。',
        'C：$abc=(ab)\\times c$，$ab>0$，所以与 $c$ 同号，$c$ 可正可负（例如 $a=3,\\ b=2,\\ c=-1$ 与 $a=-3,\\ b=-2,\\ c=1$），不一定成立。答案是 A、B、D。',
      ],
      verify: () => {
        const xs = [3, -3, 2, -2, 1, -1, 4, -4];
        const claims = [
          (a, b, c) => (a + b) * (b + c) > 0,
          (a, b, c) => F(a + b).div(c).cmp(0) < 0,
          (a, b, c) => a * b * c > 0,
          (a, b, c) => F(b + c).div(a + b).cmp(0) > 0,
        ];
        const always = claims.map(() => true);
        for (const a of xs) for (const b of xs) for (const c of xs) {
          if (!(a * b > 0 && b * c < 0 && Math.abs(a) > Math.abs(b) && Math.abs(b) > Math.abs(c))) continue;
          claims.forEach((f, i) => { if (!f(a, b, c)) always[i] = false; });
        }
        return always.map((ok, i) => (ok ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '1.3-e10',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$ 都是整数，并且 $a\\times b=-6$。',
      blanks: [
        { kind: 'num', label: '(1) $a\\div b$ 的最大值是', answer: '-1/6' },
        { kind: 'num', label: '(2) $a\\div b$ 的最小值是', answer: '-6' },
      ],
      explain: [
        '$ab=-6$，$a$、$b$ 异号，所以 $a\\div b$ 一定是负数。按 $a$ 的值列举：$a$ 可以是 $\\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6$，对应 $b=-6\\div a$。',
        '$|a\\div b|=|a|\\div|b|$：$|a|=1$ 时是 $\\frac{1}{6}$；$|a|=2$ 时是 $\\frac{2}{3}$；$|a|=3$ 时是 $\\frac{3}{2}$；$|a|=6$ 时是 6。',
        '都是负数，绝对值越小越大：最大值是 $-\\frac{1}{6}$（如 $a=1,\\ b=-6$），最小值是 $-6$（如 $a=6,\\ b=-1$）。',
      ],
      verify: () => {
        const vals = [];
        for (let a = -6; a <= 6; a++) if (a && (-6) % a === 0) vals.push(F(a).div(-6 / a));
        vals.sort((x, y) => x.cmp(y));
        return [vals[vals.length - 1], vals[0]];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '1.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $|a|=2$，$|b|=1$，并且 $ab>0$。求 $\\frac{1}{ab}+\\frac{1}{(a+1)(b+1)}+\\frac{1}{(a+2)(b+2)}+\\cdots+\\frac{1}{(a+2024)(b+2024)}$ 的值。',
      blanks: [{ kind: 'num', answer: '2025/2026' }],
      explain: [
        '$ab>0$，$a$、$b$ 同号，有两种情况：$a=2,\\ b=1$，或 $a=-2,\\ b=-1$。',
        '先检查第二种：$a=-2,\\ b=-1$ 时，第二项的分母是 $(a+1)(b+1)=(-1)\\times 0=0$，**分母为 0，式子没有意义**，所以这种情况要舍去。',
        '所以 $a=2,\\ b=1$，原式 $=\\frac{1}{2\\times 1}+\\frac{1}{3\\times 2}+\\cdots+\\frac{1}{2026\\times 2025}$。',
        '每一项都是两个相邻整数之积的倒数，拆成两个倒数之差：$\\frac{1}{1\\times 2}=1-\\frac{1}{2}$，$\\frac{1}{2\\times 3}=\\frac{1}{2}-\\frac{1}{3}$……相加时中间全部抵消，得 $1-\\frac{1}{2026}=\\frac{2025}{2026}$。',
        '这道题的关键是第二种情况：不是算出另一个答案，而是发现它根本不成立。',
      ],
      verify: () => {
        const results = [];
        for (const [a, b] of [[2, 1], [-2, -1]]) {
          let s = F(0);
          let ok = true;
          for (let k = 0; k <= 2024; k++) {
            const d = (a + k) * (b + k);
            if (d === 0) { ok = false; break; }
            s = s.add(F(1).div(d));
          }
          if (ok) results.push(s);
        }
        return results.length === 1 ? results[0] : null;
      },
    },
    {
      id: '1.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '从 $-6,\\ -5,\\ -4,\\ -3,\\ -2,\\ -1,\\ 0,\\ 1,\\ 2,\\ 3$ 这 10 个整数中，任取三个不同的数相乘（只看取哪三个数，不计顺序）。',
      blanks: [
        { kind: 'num', label: '(1) 积为正数的取法有几种？', answer: '46', suffix: '种' },
        { kind: 'num', label: '(2) 积为负数，并且大于 $-20$ 的取法有几种？', answer: '22', suffix: '种' },
        { kind: 'num', label: '(3) 积的最大值是', answer: '90' },
      ],
      explain: [
        '负数有 6 个（$-6$～$-1$），正数有 3 个（1～3），还有 0。',
        '(1) 积为正：三个正数，只有 $\\{1,2,3\\}$ 1 种；一正两负：正数 3 种，两个负数从 6 个里取 2 个有 15 种，共 45 种。合计 46 种。',
        '(2) 积为负：三个负数，或两正一负。要大于 $-20$，就是绝对值小于 20。',
        '三个负数：从 1～6 中取三个数，积小于 20 的有 $\\{1,2,3\\},\\{1,2,4\\},\\{1,2,5\\},\\{1,2,6\\},\\{1,3,4\\},\\{1,3,5\\},\\{1,3,6\\}$，共 7 种。注意 $\\{-1,-4,-5\\}$ 的积恰好是 $-20$，“大于 $-20$”不包括 $-20$，不算。',
        '两正一负：两个正数的积是 2（1 和 2）时，负数的绝对值 1～6 都行，6 种；积是 3 时，$3\\times 6=18<20$，也是 6 种；积是 6 时，负数的绝对值只能是 1～3，3 种。共 15 种。合计 $7+15=22$ 种。',
        '(3) 三个正数最大是 6；一正两负取 $3\\times(-6)\\times(-5)=90$。最大值是 90。（最小值是 $(-6)\\times(-5)\\times(-4)=-120$，两者不对称。）',
      ],
      verify: () => {
        const xs = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3];
        let pos = 0;
        let neg = 0;
        let max = -Infinity;
        for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) for (let k = j + 1; k < xs.length; k++) {
          const p = xs[i] * xs[j] * xs[k];
          if (p > 0) pos++;
          if (p < 0 && p > -20) neg++;
          max = Math.max(max, p);
        }
        return [pos, neg, max];
      },
    },
    {
      id: '1.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '对于有理数 $a$、$b$（$a$、$b$、$a+b$ 都不为 0），规定一种新运算：$a\\oplus b=\\frac{a\\times b}{a+b}$。例如 $2\\oplus 3=\\frac{6}{5}$。可以验证：$a\\oplus b$ 的倒数等于 $a$ 的倒数与 $b$ 的倒数之和（如 $\\frac{5}{6}=\\frac{1}{2}+\\frac{1}{3}$）。',
      blanks: [
        { kind: 'num', label: '(1) $(2\\oplus 3)\\oplus 6=$', answer: '1' },
        { kind: 'num', label: '(2) 若 $x\\oplus 3=2$，则 $x=$', answer: '6' },
        { kind: 'nums', label: '(3) 若 $a$、$b$ 都是正整数，$a\\oplus b=2$，并且 $a\\le b$，则 $a$ 的值是（全部填出，用逗号隔开）', answer: ['3', '4'] },
      ],
      explain: [
        '(1) $2\\oplus 3=\\frac{6}{5}$，$\\frac{6}{5}\\oplus 6=\\frac{\\frac{36}{5}}{\\frac{36}{5}}=1$。',
        '用题目给的规律更快：连续做 $\\oplus$ 运算，结果的倒数就是各数倒数之和。(1) $\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{6}=1$，倒数是 1。（再试一个：$4\\oplus 12=\\frac{48}{16}=3$，倒数 $\\frac{1}{3}=\\frac{1}{4}+\\frac{1}{12}$，规律成立。）',
        '(2) 结果是 2，倒数是 $\\frac{1}{2}$，所以 $x$ 的倒数 $=\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$，$x=6$。检验：$\\frac{6\\times 3}{6+3}=2$。',
        '(3) 要 $a$ 的倒数加 $b$ 的倒数等于 $\\frac{1}{2}$，且 $a\\le b$，所以 $a$ 的倒数是两者中较大的，至少是 $\\frac{1}{4}$，又要小于 $\\frac{1}{2}$。',
        '所以 $a$ 只能是 3 或 4：$a=3$ 时 $b$ 的倒数是 $\\frac{1}{6}$，$b=6$；$a=4$ 时 $b=4$。答案是 3 或 4。',
      ],
      verify: () => {
        const op = (a, b) => F(a).mul(b).div(F(a).add(b));
        const one = op(op(2, 3), 6);
        const xs = [];
        for (let i = 1; i <= 200; i++) if (op(F(i).div(4), 3).eq(2)) xs.push(F(i).div(4));
        const as = [];
        for (let a = 1; a <= 50; a++) for (let b = a; b <= 200; b++) if (op(a, b).eq(2)) as.push(a);
        return [one, xs.length === 1 ? xs[0] : null, as];
      },
    },
    {
      id: '1.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一列数 $a_1,\\ a_2,\\ a_3,\\ \\dots$ 满足：$a_1=2$，从第二个数起，每个数都等于“1 减去前一个数”的倒数，即 $a_2=\\frac{1}{1-a_1}$，$a_3=\\frac{1}{1-a_2}$……',
      blanks: [
        { kind: 'num', label: '(1) $a_{2025}=$', answer: '1/2' },
        { kind: 'num', label: '(2) $a_1\\times a_2\\times a_3\\times\\cdots\\times a_{2025}=$', answer: '-1' },
        { kind: 'num', label: '(3) $a_1+a_2+a_3+\\cdots+a_{2025}=$', answer: '2025/2' },
        { kind: 'num', label: '(4) 若前 $n$ 个数的和等于 1000，则 $n=$', answer: '2000' },
      ],
      explain: [
        '逐个算：$a_2=\\frac{1}{1-2}=-1$，$a_3=\\frac{1}{1-(-1)}=\\frac{1}{2}$，$a_4=\\frac{1}{1-\\frac{1}{2}}=2$。又回到了 2，所以每 3 个数一循环：$2,\\ -1,\\ \\frac{1}{2}$。',
        '(1) $2025=3\\times 675$，$a_{2025}$ 是第 675 个循环的最后一个，等于 $\\frac{1}{2}$。',
        '(2) 一个循环的积：$2\\times(-1)\\times\\frac{1}{2}=-1$。675 个 $-1$ 相乘，负因数有奇数个，积为 $-1$。',
        '(3) 一个循环的和：$2-1+\\frac{1}{2}=\\frac{3}{2}$。总和 $=675\\times\\frac{3}{2}=\\frac{2025}{2}$。',
        '(4) 按 $n$ 除以 3 的余数分三类。$n$ 是 3 的倍数（$3k$ 个数）：和为 $\\frac{3}{2}k$；多 1 个：再加 2；多 2 个：再加 $2-1=1$。',
        '$\\frac{3}{2}k=1000$：$k=\\frac{2000}{3}$，不是整数；$\\frac{3}{2}k+2=1000$：$k=\\frac{1996}{3}$，不是整数；$\\frac{3}{2}k+1=1000$：$k=666$，是整数。所以 $n=3\\times 666+2=2000$。',
      ],
      verify: () => {
        let a = F(2);
        let prod = F(1);
        let sum = F(0);
        for (let n = 1; n <= 2025; n++) {
          if (n > 1) a = F(1).div(F(1).sub(a));
          prod = prod.mul(a);
          sum = sum.add(a);
        }
        let b = F(2);
        let t = F(0);
        const ns = [];
        for (let n = 1; n <= 3000; n++) {
          if (n > 1) b = F(1).div(F(1).sub(b));
          t = t.add(b);
          if (t.eq(1000)) ns.push(n);
        }
        return [a, prod, sum, ns.length === 1 ? ns[0] : null];
      },
    },
    {
      id: '1.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '分子是 1、分母是正整数的分数叫作单位分数，例如 $\\frac{1}{2}$，$\\frac{1}{7}$。把 1 写成几个分母互不相同的单位分数之和。',
      blanks: [
        { kind: 'num', label: '(1) 若写成 3 个单位分数之和，最大的分母是', answer: '6' },
        { kind: 'num', label: '(2) 若写成 4 个单位分数之和，最大的分母最小是', answer: '12' },
      ],
      explain: [
        '单位分数就是正整数的倒数。把分母从小到大排：分母越小，倒数越大，最小的分母决定最大的那个单位分数。',
        '(1) 最小分母若 $\\ge 3$，三个数之和最多 $\\frac{1}{3}+\\frac{1}{4}+\\frac{1}{5}<1$，不够，所以最小分母是 2，剩下两个数之和是 $\\frac{1}{2}$。第二个分母若 $\\ge 4$，最多 $\\frac{1}{4}+\\frac{1}{5}<\\frac{1}{2}$，所以是 3，第三个是 $\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$。只有 $1=\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{6}$ 一种，最大分母是 6。',
        '(2) 同理最小分母必须是 2（$\\frac{1}{3}+\\frac{1}{4}+\\frac{1}{5}+\\frac{1}{6}<1$），剩下三个数之和是 $\\frac{1}{2}$。第二个分母只能是 3、4 或 5（$\\ge 6$ 时 $\\frac{1}{6}+\\frac{1}{7}+\\frac{1}{8}<\\frac{1}{2}$）。',
        '第二个是 3：剩 $\\frac{1}{6}$ 拆成两个，$\\frac{1}{7}+\\frac{1}{42}$、$\\frac{1}{8}+\\frac{1}{24}$、$\\frac{1}{9}+\\frac{1}{18}$、$\\frac{1}{10}+\\frac{1}{15}$，最大分母最小是 15。',
        '第二个是 4：剩 $\\frac{1}{4}$ 拆成两个，$\\frac{1}{5}+\\frac{1}{20}$、$\\frac{1}{6}+\\frac{1}{12}$，最大分母最小是 12。第二个是 5：剩 $\\frac{3}{10}$，无法拆成两个更小的不同单位分数。',
        '所以最小是 12：$1=\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{6}+\\frac{1}{12}$。既要找到例子，又要说明更小的不可能。',
      ],
      verify: () => {
        const unit = (r, after) => r.cmp(0) > 0 && r.n === 1n && Number(r.d) > after;
        let three = null;
        for (let a = 2; a <= 20; a++) for (let b = a + 1; b <= 60; b++) {
          const r = F(1).sub(F(1).div(a)).sub(F(1).div(b));
          if (unit(r, b)) three = three === null ? Number(r.d) : Math.max(three, Number(r.d));
        }
        let best = null;
        for (let a = 2; a <= 20; a++) for (let b = a + 1; b <= 60; b++) for (let c = b + 1; c <= 200; c++) {
          const r = F(1).sub(F(1).div(a)).sub(F(1).div(b)).sub(F(1).div(c));
          if (unit(r, c)) best = best === null ? Number(r.d) : Math.min(best, Number(r.d));
        }
        return [three, best];
      },
    },
  ],
});
