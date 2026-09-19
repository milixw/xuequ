'use strict';

// 上海数学六年级上册 · 1.3 有理数的乘法与除法
// 知识范围：乘法法则、多个数相乘的符号、乘法运算律、倒数、除法法则、乘除混合；可以使用 1.1、1.2 的全部内容
// 还没学：乘方、代数式、方程

Content.section({
  id: 'math/sh2024/g6s1/1.3',
  title: '有理数的乘法与除法',
  review: { status: 'pending' },
  audit: { blind: '2026-09-19', rounds: 2, note: '子代理盲解：第 1 轮 20 题答案全部一致；第 2 轮复核新 e05 和修改后的卡片，一致' },

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
      stem: '计算：$(-2.5)\\times 4$',
      blanks: [{ kind: 'num', answer: '-10' }],
      explain: ['异号两数相乘得负。', '绝对值相乘：$2.5\\times 4=10$，结果是 $-10$。'],
      verify: () => F('-2.5').mul(4),
    },
    {
      id: '1.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\left(-\\frac{3}{4}\\right)\\times\\left(-\\frac{8}{9}\\right)$',
      blanks: [{ kind: 'num', answer: '2/3' }],
      explain: ['同号两数相乘得正。', '$\\frac{3}{4}\\times\\frac{8}{9}=\\frac{24}{36}=\\frac{2}{3}$。'],
      verify: () => F('-3/4').mul('-8/9'),
    },
    {
      id: '1.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '$-2\\frac{1}{3}$ 的倒数是多少？',
      blanks: [{ kind: 'num', answer: '-3/7' }],
      explain: ['先化成假分数：$-2\\frac{1}{3}=-\\frac{7}{3}$。', '倒数不改变符号，把分子分母颠倒：$-\\frac{3}{7}$。'],
      verify: () => F(1).div('-7/3'),
    },
    {
      id: '1.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\left(-\\frac{5}{6}\\right)\\div\\left(-\\frac{10}{3}\\right)$',
      blanks: [{ kind: 'num', answer: '1/4' }],
      explain: ['除以一个数等于乘它的倒数：$\\left(-\\frac{5}{6}\\right)\\times\\left(-\\frac{3}{10}\\right)$。', '同号得正：$\\frac{5}{6}\\times\\frac{3}{10}=\\frac{1}{4}$。'],
      verify: () => F('-5/6').div('-10/3'),
    },
    {
      id: '1.3-b05',
      level: 'basic',
      type: 'choice',
      stem: '下列算式中，结果是负数的是（　　）',
      options: ['$(-2)\\times(-3)$', '$(-2)\\times 3\\times(-1)$', '$0\\times(-5)$', '$(-1)\\times(-2)\\times(-3)$'],
      answer: 3,
      explain: ['看负因数的个数：A 有 2 个，积为正；B 有 2 个，积为正。', 'C 有因数 0，积为 0，0 不是负数。', 'D 有 3 个负因数，积为负（$-6$）。选 D。'],
      verify: () => [F(-2).mul(-3), F(-2).mul(3).mul(-1), F(0).mul(-5), F(-1).mul(-2).mul(-3)].findIndex(x => x.cmp(0) < 0),
    },

    // ---------- 扩展 ----------
    {
      id: '1.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：$\\left(-\\frac{1}{2}+\\frac{2}{3}-\\frac{3}{4}\\right)\\times(-12)$',
      blanks: [{ kind: 'num', answer: '7' }],
      explain: [
        '用分配律，括号里每一项都乘 $-12$：',
        '$\\left(-\\frac{1}{2}\\right)\\times(-12)=6$，$\\frac{2}{3}\\times(-12)=-8$，$\\left(-\\frac{3}{4}\\right)\\times(-12)=9$。',
        '$6-8+9=7$。',
      ],
      verify: () => F('-1/2').add('2/3').sub('3/4').mul(-12),
    },
    {
      id: '1.3-e02',
      level: 'extended',
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
      id: '1.3-e03',
      level: 'extended',
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
      id: '1.3-e04',
      level: 'extended',
      type: 'choice',
      stem: '如果 $ab<0$，并且 $a+b>0$，那么（　　）',
      options: ['$a$、$b$ 都是正数', '$a$、$b$ 异号，并且正数的绝对值较大', '$a$、$b$ 异号，并且负数的绝对值较大', '无法确定 $a$、$b$ 的符号'],
      answer: 1,
      explain: [
        '$ab<0$，说明 $a$、$b$ 异号，A、D 都不对。',
        '异号两数相加，和的符号跟绝对值较大的数相同。和是正数，所以正数的绝对值较大。选 B。',
      ],
      // 在一批取值中检查：满足条件时 A、B、C 哪一个始终成立
      verify: () => {
        const xs = [];
        for (let i = -8; i <= 8; i++) if (i) xs.push(F(i).div(2));
        const claims = [
          (a, b) => a.cmp(0) > 0 && b.cmp(0) > 0,
          (a, b) => a.mul(b).cmp(0) < 0 && (a.cmp(0) > 0 ? a : b).abs().cmp((a.cmp(0) > 0 ? b : a).abs()) > 0,
          (a, b) => a.mul(b).cmp(0) < 0 && (a.cmp(0) < 0 ? a : b).abs().cmp((a.cmp(0) < 0 ? b : a).abs()) > 0,
        ];
        return claims.findIndex(f => xs.every(a => xs.every(b => !(a.mul(b).cmp(0) < 0 && a.add(b).cmp(0) > 0) || f(a, b))));
      },
    },
    {
      id: '1.3-e05',
      level: 'extended',
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
    {
      id: '1.3-e06',
      level: 'extended',
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
      id: '1.3-e07',
      level: 'extended',
      type: 'fill',
      stem: '倒数等于它本身的数是哪些？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['1', '-1'] }],
      explain: ['一个数和它的倒数相乘等于 1，倒数等于本身，就是这个数乘它自己等于 1。', '满足的数是 1 和 $-1$。0 没有倒数，别写进去。'],
      verify: () => [-2, -1, '-1/2', '1/2', 1, 2].filter(x => F(1).div(x).eq(x)),
    },
    {
      id: '1.3-e08',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：$(-0.25)\\times\\left(-\\frac{4}{7}\\right)\\times(-4)\\times(-7)$',
      blanks: [{ kind: 'num', answer: '4' }],
      explain: [
        '先定符号：4 个负因数，积为正。',
        '用交换律和结合律凑整：$(0.25\\times 4)\\times\\left(\\frac{4}{7}\\times 7\\right)=1\\times 4=4$。',
      ],
      verify: () => F('-0.25').mul('-4/7').mul(-4).mul(-7),
    },
    {
      id: '1.3-e09',
      level: 'extended',
      type: 'fill',
      stem: '一个数与 $-\\frac{3}{5}$ 的积是 $\\frac{9}{10}$，这个数除以 $-\\frac{1}{2}$ 的商是多少？',
      blanks: [{ kind: 'num', answer: '3' }],
      explain: ['先求这个数：$\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)=\\frac{9}{10}\\times\\left(-\\frac{5}{3}\\right)=-\\frac{3}{2}$。', '再求商：$-\\frac{3}{2}\\div\\left(-\\frac{1}{2}\\right)=3$。'],
      verify: () => F('9/10').div('-3/5').div('-1/2'),
    },
    {
      id: '1.3-e10',
      level: 'extended',
      type: 'multi',
      stem: '下列说法中，正确的有（多选）',
      options: [
        '如果 $a\\div b<0$，那么 $ab<0$',
        '两个数相除，如果商是 0，那么被除数一定是 0',
        '一个数的倒数一定比这个数小',
        '如果 $a+b=0$，并且 $a\\ne 0$，那么 $a\\div b=-1$',
      ],
      answer: [0, 1, 3],
      explain: [
        'A 对：$a\\div b<0$ 说明 $a$、$b$ 异号，所以 $ab<0$。',
        'B 对：除数不能为 0，被除数不为 0 时商也不为 0，所以商是 0 时被除数一定是 0。',
        'C 错：$\\frac{1}{2}$ 的倒数是 2，比它大；$-2$ 的倒数是 $-\\frac{1}{2}$，也比它大。',
        'D 对：$a$、$b$ 互为相反数且不为 0，绝对值相等、符号相反，商是 $-1$。答案是 A、B、D。',
      ],
    },

    // ---------- 挑战 ----------
    {
      id: '1.3-c01',
      level: 'challenge',
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
      id: '1.3-c02',
      level: 'challenge',
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
      id: '1.3-c03',
      level: 'challenge',
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
      id: '1.3-c04',
      level: 'challenge',
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
      id: '1.3-c05',
      level: 'challenge',
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
  ],
});
