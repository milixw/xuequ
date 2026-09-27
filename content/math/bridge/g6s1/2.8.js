'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 2.8 分数、小数的四则混合运算
// 知识范围：分数、小数的四则混合运算顺序，分数和小数统一形式（能化成有限小数时可统一成小数，
//           否则把小数化成分数），运算律和简便运算（凑整、提取公因数、裂项、换元）；可以使用第 1 章和 2.1～2.7
// 还没学：负数、比和百分数（不在衔接范围）
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/2.8',
  title: '分数、小数的四则混合运算',
  review: { status: 'pending' },

  intro: [
    {
      title: '运算顺序',
      body: '分数、小数的四则混合运算，顺序和整数一样：**先乘除，后加减，有括号先算括号里面的**；同一级运算从左往右算。',
      example: '$\\frac{2}{5}+0.6\\times\\frac{1}{3}=\\frac{2}{5}+\\frac{1}{5}=\\frac{3}{5}$。',
      pitfall: '只有乘除的式子也要从左往右：$\\frac{1}{2}\\div\\frac{1}{2}\\times 4=4$，不是 $\\frac{1}{4}$。',
    },
    {
      title: '统一成分数还是小数',
      body: '分数能化成有限小数时，统一成小数或分数都可以；如果有分数化不成有限小数（如 $\\frac{1}{3}$），就把小数化成分数再算。',
      example: '$0.35+\\frac{1}{6}=\\frac{7}{20}+\\frac{1}{6}=\\frac{21}{60}+\\frac{10}{60}=\\frac{31}{60}$。',
    },
    {
      title: '常用的分数和小数',
      body: '记住一些常用的对应关系，便于凑整和约分：$0.5=\\frac{1}{2}$，$0.25=\\frac{1}{4}$，$0.75=\\frac{3}{4}$，$0.2=\\frac{1}{5}$，$0.125=\\frac{1}{8}$，$0.375=\\frac{3}{8}$，$0.625=\\frac{5}{8}$。',
      example: '$0.125\\times 17+\\frac{1}{8}\\times 15=\\frac{1}{8}\\times(17+15)=4$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.8-b01',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\left(3.5-1\\frac{1}{4}\\right)\\times\\frac{2}{3}\\div 0.3$',
      blanks: [{ kind: 'num', answer: '5' }],
      explain: [
        '括号里：$3.5-1.25=2.25$，即 $\\frac{9}{4}$。',
        '$\\frac{9}{4}\\times\\frac{2}{3}=\\frac{3}{2}$，再除以 $0.3=\\frac{3}{10}$：$\\frac{3}{2}\\times\\frac{10}{3}=5$。',
        '易错：先算 $\\frac{2}{3}\\div 0.3$，改变了运算顺序。',
      ],
      verify: () => F(7).div(2).sub(F(5).div(4)).mul(F(2).div(3)).div(F(3).div(10)),
    },
    {
      id: '2.8-b02',
      level: 'basic',
      type: 'fill',
      stem: '用简便方法计算：$0.625\\times\\frac{4}{5}+\\frac{3}{8}\\times 0.8$',
      blanks: [{ kind: 'num', answer: '4/5' }],
      explain: [
        '$\\frac{4}{5}=0.8$，$0.625=\\frac{5}{8}$。两项都有因数 $\\frac{4}{5}$：$\\frac{4}{5}\\times\\left(\\frac{5}{8}+\\frac{3}{8}\\right)=\\frac{4}{5}\\times 1=\\frac{4}{5}$。',
        '易错：没看出 $0.625$ 与 $\\frac{3}{8}$ 能凑成 1，硬算两个积。',
      ],
      verify: () => F(5).div(8).mul(F(4).div(5)).add(F(3).div(8).mul(F(4).div(5))),
    },
    {
      id: '2.8-b03',
      level: 'basic',
      type: 'fill',
      stem: '用简便方法计算：$2\\frac{1}{3}-0.75+1\\frac{2}{3}-1.25$',
      blanks: [{ kind: 'num', answer: '2' }],
      explain: [
        '带着符号交换位置：$\\left(2\\frac{1}{3}+1\\frac{2}{3}\\right)-(0.75+1.25)=4-2=2$。',
        '易错：交换位置时把"−1.25"的减号丢了，写成 $4-0.75+1.25$。',
      ],
      verify: () => F(7).div(3).sub(F(3).div(4)).add(F(5).div(3)).sub(F(5).div(4)),
    },
    {
      id: '2.8-b04',
      level: 'basic',
      type: 'choice',
      stem: '$\\frac{3}{4}\\div\\frac{3}{4}\\times 0.8$ 的结果是（ ）',
      options: ['$0.8$', '$\\frac{5}{4}$', '$1$', '$0.6$'],
      answer: 0,
      explain: [
        '只有乘除，从左往右：$\\frac{3}{4}\\div\\frac{3}{4}=1$，$1\\times 0.8=0.8$。选 A。',
        '易错：B 是先算 $\\frac{3}{4}\\times 0.8=0.6$ 再用 $\\frac{3}{4}$ 去除得到的；D 是看到两个 $\\frac{3}{4}$ 就约掉一个，算成 $\\frac{3}{4}\\times 0.8$。',
      ],
      verify: () => ['4/5', '5/4', '1', '3/5'].findIndex(x => F(x).eq(F(3).div(4).div(F(3).div(4)).mul(F(4).div(5)))),
    },
    {
      id: '2.8-b05',
      level: 'basic',
      type: 'fill',
      stem: '计算：$1.25\\times\\frac{3}{7}\\times 8$',
      blanks: [{ kind: 'num', answer: '30/7' }],
      explain: [
        '交换位置先算 $1.25\\times 8=10$，再乘 $\\frac{3}{7}$：$\\frac{30}{7}=4\\frac{2}{7}$。',
        '易错：把 1.25 化成 $\\frac{5}{4}$ 后约分出错。',
      ],
      verify: () => F(5).div(4).mul(F(3).div(7)).mul(8),
    },

    // ---------- 扩展 ----------
    {
      id: '2.8-e01',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：$3.75\\times 8.2+3\\frac{3}{4}\\times 1.8$',
      blanks: [{ kind: 'num', answer: '75/2' }],
      explain: [
        '$3\\frac{3}{4}=3.75$，提取公因数：$3.75\\times(8.2+1.8)=3.75\\times 10=37.5$。',
        '易错：没发现 $3\\frac{3}{4}$ 就是 3.75。',
      ],
      verify: () => F(15).div(4).mul(F(41).div(5)).add(F(15).div(4).mul(F(9).div(5))),
    },
    {
      id: '2.8-e02',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：$4.5\\times 1\\frac{1}{5}+5.5\\times 1.2-1\\frac{1}{5}$',
      blanks: [{ kind: 'num', answer: '54/5' }],
      explain: [
        '$1\\frac{1}{5}=1.2$，三项都有因数 1.2，最后一项是 $1.2\\times 1$：$1.2\\times(4.5+5.5-1)=1.2\\times 9=10.8$。',
        '易错：最后一项当成 0 去提取，得 $1.2\\times 10=12$。',
      ],
      verify: () => F(9).div(2).mul(F(6).div(5)).add(F(11).div(2).mul(F(6).div(5))).sub(F(6).div(5)),
    },
    {
      id: '2.8-e03',
      level: 'extended',
      type: 'fill',
      stem: '计算：$0.5+\\frac{1}{6}+\\frac{1}{12}+\\frac{1}{20}+\\frac{1}{30}+\\frac{1}{42}+\\frac{1}{56}+\\frac{1}{72}+\\frac{1}{90}$',
      blanks: [{ kind: 'num', answer: '9/10' }],
      explain: [
        '$0.5=\\frac{1}{2}=\\frac{1}{1\\times 2}$，其余是 $\\frac{1}{2\\times 3}$、$\\frac{1}{3\\times 4}$、……、$\\frac{1}{9\\times 10}$。',
        '裂项：$\\left(1-\\frac{1}{2}\\right)+\\left(\\frac{1}{2}-\\frac{1}{3}\\right)+\\cdots+\\left(\\frac{1}{9}-\\frac{1}{10}\\right)=1-\\frac{1}{10}=\\frac{9}{10}$。',
        '易错：没把 0.5 看成 $\\frac{1}{1\\times 2}$，单独加上后裂项少了一项。',
      ],
      verify: () => { let s = F(1).div(2); for (let n = 2; n <= 9; n++) s = s.add(F(1).div(n * (n + 1))); return s; },
    },
    {
      id: '2.8-e04',
      level: 'extended',
      type: 'fill',
      stem: '求 $\\square$ 里的数：$\\left(\\square-1.2\\right)\\times\\frac{5}{6}=\\frac{2}{3}$',
      blanks: [{ kind: 'num', answer: '2' }],
      explain: [
        '括号里的差 $=\\frac{2}{3}\\div\\frac{5}{6}=\\frac{4}{5}=0.8$。',
        '$\\square=0.8+1.2=2$。',
        '易错：先算 $1.2\\times\\frac{5}{6}$，把括号去掉了。',
      ],
      verify: () => F(2).div(3).div(F(5).div(6)).add(F(6).div(5)),
    },
    {
      id: '2.8-e05',
      level: 'extended',
      type: 'fill',
      stem: '规定 $a\\odot b=\\frac{a\\times b}{a+b}$（$a$、$b$ 都是正数）。计算 $(0.5\\odot\\frac{1}{3})\\odot 0.25$。',
      blanks: [{ kind: 'num', answer: '1/9' }],
      explain: [
        '先算括号：$0.5\\odot\\frac{1}{3}=\\frac{\\frac{1}{2}\\times\\frac{1}{3}}{\\frac{1}{2}+\\frac{1}{3}}=\\frac{1}{6}\\div\\frac{5}{6}=\\frac{1}{5}$。',
        '再算 $\\frac{1}{5}\\odot\\frac{1}{4}=\\frac{1}{20}\\div\\frac{9}{20}=\\frac{1}{9}$。',
        '观察：$\\frac{1}{a\\odot b}=\\frac{a+b}{a\\times b}=\\frac{1}{a}+\\frac{1}{b}$，所以结果的倒数是 $2+3+4=9$。',
      ],
      verify: () => { const op = (a, b) => a.mul(b).div(a.add(b)); return op(op(F(1).div(2), F(1).div(3)), F(1).div(4)); },
    },
    {
      id: '2.8-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $1\\frac{1}{4}\\times A=0.75\\times B=2\\div C=1$。求 $A+B+C$。',
      blanks: [{ kind: 'num', answer: '62/15' }],
      explain: [
        '$1\\frac{1}{4}\\times A=1$，$A$ 是 $\\frac{5}{4}$ 的倒数 $\\frac{4}{5}$；$0.75\\times B=1$，$B=\\frac{4}{3}$；$2\\div C=1$，$C=2$。',
        '$A+B+C=\\frac{4}{5}+\\frac{4}{3}+2=\\frac{12+20+30}{15}=\\frac{62}{15}$。',
        '易错：$2\\div C=1$ 时误以为 $C$ 是 2 的倒数 $\\frac{1}{2}$。',
      ],
      verify: () => F(1).div(F(5).div(4)).add(F(1).div(F(3).div(4))).add(F(2).div(1)),
    },
    {
      id: '2.8-e07',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\left(1+0.25+\\frac{1}{5}\\right)\\times\\left(0.25+0.2+\\frac{1}{6}\\right)-\\left(1+0.25+0.2+\\frac{1}{6}\\right)\\times\\left(\\frac{1}{4}+\\frac{1}{5}\\right)$',
      blanks: [{ kind: 'num', answer: '1/6' }],
      explain: [
        '思路：四个括号里都有 $0.25+0.2$（即 $\\frac{1}{4}+\\frac{1}{5}$），把它看成一个整体 $A$。',
        '原式 $=(1+A)\\times\\left(A+\\frac{1}{6}\\right)-\\left(1+A+\\frac{1}{6}\\right)\\times A$。',
        '展开：前一部分 $=(1+A)\\times A+(1+A)\\times\\frac{1}{6}$，后一部分 $=(1+A)\\times A+\\frac{1}{6}\\times A$，相减得 $\\frac{1}{6}\\times(1+A)-\\frac{1}{6}\\times A=\\frac{1}{6}$。',
        '易错：先把各括号算出来再乘，数据繁、容易出错。',
      ],
      verify: () => { const A = F(1).div(4).add(F(1).div(5)); return F(1).add(A).mul(A.add(F(1).div(6))).sub(F(1).add(A).add(F(1).div(6)).mul(A)); },
    },
    {
      id: '2.8-e08',
      level: 'extended',
      type: 'fill',
      stem: '计算：$0.\\dot{3}+0.25\\times 1\\frac{1}{3}-0.1\\dot{6}$',
      blanks: [{ kind: 'num', answer: '1/2' }],
      explain: [
        '循环小数化分数：$0.\\dot{3}=\\frac{1}{3}$，$0.1\\dot{6}=\\frac{16-1}{90}=\\frac{1}{6}$。',
        '$0.25\\times 1\\frac{1}{3}=\\frac{1}{4}\\times\\frac{4}{3}=\\frac{1}{3}$。',
        '原式 $=\\frac{1}{3}+\\frac{1}{3}-\\frac{1}{6}=\\frac{1}{2}$。',
        '易错：循环小数按有限小数 0.33、0.17 近似计算。',
      ],
      verify: () => F(1).div(3).add(F(1).div(4).mul(F(4).div(3))).sub(F(15).div(90)),
    },
    {
      id: '2.8-e09',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：$2025\\times\\frac{2027}{2026}-2027\\times\\frac{2024}{2026}$',
      blanks: [{ kind: 'num', answer: '2027/2026' }],
      explain: [
        '两项都有 2027 和 $\\frac{1}{2026}$：$2025\\times\\frac{2027}{2026}=\\frac{2027}{2026}\\times 2025$，$2027\\times\\frac{2024}{2026}=\\frac{2027}{2026}\\times 2024$。',
        '提取公因数：$\\frac{2027}{2026}\\times(2025-2024)=\\frac{2027}{2026}$。',
        '易错：分别约分或化带分数，计算繁琐。',
      ],
      verify: () => F(2025).mul(F(2027).div(2026)).sub(F(2027).mul(F(2024).div(2026))),
    },
    {
      id: '2.8-e10',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\frac{1}{1\\times 2}+\\frac{1}{2\\times 3}+\\cdots+\\frac{1}{n\\times(n+1)}$ 的结果。',
      blanks: [
        { kind: 'num', label: '(1) 结果是 0.95 时，$n=$', answer: '19' },
        { kind: 'num', label: '(2) 结果是 $0.9\\dot{6}$ 时，$n=$', answer: '29' },
      ],
      explain: [
        '裂项后结果是 $1-\\frac{1}{n+1}$，也就是 $\\frac{1}{n+1}=1-$ 结果。',
        '(1) $1-0.95=0.05=\\frac{1}{20}$，$n+1=20$，$n=19$。',
        '(2) $0.9\\dot{6}=\\frac{96-9}{90}=\\frac{87}{90}=\\frac{29}{30}$，$1-\\frac{29}{30}=\\frac{1}{30}$，$n=29$。',
        '易错：(2) 把 $0.9\\dot{6}$ 当成 0.96，得 $\\frac{1}{25}$、$n=24$。',
      ],
      verify: () => {
        const f = target => { let s = F(0); for (let n = 1; n < 1000; n++) { s = s.add(F(1).div(n * (n + 1))); if (s.eq(target)) return n; } return 0; };
        return [f(F(95).div(100)), f(F(87).div(90))];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.8-c01',
      level: 'challenge',
      type: 'fill',
      stem: '计算 $1+\\frac{1}{1+2}+\\frac{1}{1+2+3}+\\cdots+\\frac{1}{1+2+3+\\cdots+n}$。',
      blanks: [
        { kind: 'num', label: '(1) $n=50$ 时，结果是', answer: '100/51' },
        { kind: 'num', label: '(2) 结果第一次超过 1.95 时，$n=$', answer: '40' },
      ],
      explain: [
        '思路：分母 $1+2+\\cdots+k$ 先求出来，再想办法裂项。首尾配对，$1+2+\\cdots+k=\\frac{k\\times(k+1)}{2}$，所以第 $k$ 项是 $\\frac{2}{k\\times(k+1)}$（第 1 项 $1=\\frac{2}{1\\times 2}$ 也符合）。',
        '$\\frac{2}{k\\times(k+1)}=2\\times\\left(\\frac{1}{k}-\\frac{1}{k+1}\\right)$，前 $n$ 项和 $=2\\times\\left(1-\\frac{1}{n+1}\\right)$。',
        '(1) $n=50$：$2\\times\\frac{50}{51}=\\frac{100}{51}$。',
        '(2) $2\\times\\left(1-\\frac{1}{n+1}\\right)>1.95$，即 $\\frac{2}{n+1}<0.05=\\frac{1}{20}$，$n+1>40$，$n\\ge 40$。',
        '检验：$n=39$ 时结果 $2-\\frac{2}{40}=1.95$，正好等于、没有超过；$n=40$ 时超过。',
        '易错：(2) 答 39，没注意"超过"不含等于。',
      ],
      verify: () => {
        const sumTo = n => { let s = F(0); for (let k = 1; k <= n; k++) s = s.add(F(2).div(k * (k + 1))); return s; };
        let n = 1;
        while (sumTo(n).cmp(F(195).div(100)) <= 0) n++;
        return [sumTo(50), n];
      },
    },
    {
      id: '2.8-c02',
      level: 'challenge',
      type: 'fill',
      stem: '计算 $\\frac{1}{1\\times 2\\times 3}+\\frac{1}{2\\times 3\\times 4}+\\frac{1}{3\\times 4\\times 5}+\\cdots$。',
      blanks: [
        { kind: 'num', label: '(1) 前 8 项的和是', answer: '11/45' },
        { kind: 'num', label: '(2) 前 $n$ 项的和第一次超过 0.24 时，$n=$', answer: '6' },
      ],
      explain: [
        '思路：三个数的积不能直接套两项裂项。试一试相邻两个"两数积的倒数"之差：$\\frac{1}{1\\times 2}-\\frac{1}{2\\times 3}=\\frac{3-1}{1\\times 2\\times 3}=\\frac{2}{1\\times 2\\times 3}$。',
        '所以 $\\frac{1}{k\\times(k+1)\\times(k+2)}=\\frac{1}{2}\\times\\left(\\frac{1}{k\\times(k+1)}-\\frac{1}{(k+1)\\times(k+2)}\\right)$。',
        '前 $n$ 项和 $=\\frac{1}{2}\\times\\left(\\frac{1}{2}-\\frac{1}{(n+1)\\times(n+2)}\\right)$。',
        '(1) $n=8$：$\\frac{1}{2}\\times\\left(\\frac{1}{2}-\\frac{1}{90}\\right)=\\frac{1}{2}\\times\\frac{44}{90}=\\frac{11}{45}$。',
        '(2) 要超过 0.24：$\\frac{1}{2}-\\frac{1}{(n+1)\\times(n+2)}>0.48$，$\\frac{1}{(n+1)\\times(n+2)}<0.02=\\frac{1}{50}$，$(n+1)\\times(n+2)>50$。$6\\times 7=42$ 不够，$7\\times 8=56$ 可以，$n+1=7$，$n=6$。',
        '易错：裂项时忘了乘 $\\frac{1}{2}$。',
      ],
      verify: () => {
        const sumTo = n => { let s = F(0); for (let k = 1; k <= n; k++) s = s.add(F(1).div(k * (k + 1) * (k + 2))); return s; };
        let n = 1;
        while (sumTo(n).cmp(F(24).div(100)) <= 0) n++;
        return [sumTo(8), n];
      },
    },
    {
      id: '2.8-c03',
      level: 'challenge',
      type: 'fill',
      stem: '在 $0.5\\ \\square\\ \\frac{1}{3}\\ \\square\\ 0.25\\ \\square\\ \\frac{1}{6}$ 的三个 $\\square$ 里各填一个运算符号（$+$、$-$、$\\times$、$\\div$ 中选，可以重复），按运算顺序计算。',
      blanks: [
        { kind: 'num', label: '(1) 结果最大是多少', answer: '36' },
        { kind: 'num', label: '(2) 结果恰好等于 1 的填法有几种', answer: '2' },
      ],
      explain: [
        '思路：四个数都比 1 小。乘一个比 1 小的数会变小，除以一个比 1 小的数会变大，所以要大就多用除号。',
        '(1) 三个都填 $\\div$：$\\frac{1}{2}\\div\\frac{1}{3}\\div\\frac{1}{4}\\div\\frac{1}{6}=\\frac{1}{2}\\times 3\\times 4\\times 6=36$。其他填法：把某个 $\\div$ 换成 $+$、$-$、$\\times$，那个数就不再"放大"结果，逐个算可知其余填法的结果都不超过 9（最大的是 $0.5+\\frac{1}{3}\\div 0.25\\div\\frac{1}{6}=8\\frac{1}{2}$），比 36 小。所以最大是 36。',
        '(2) 分类找等于 1 的：',
        '全是乘除：结果是 $\\frac{1}{2}$ 乘或除以 $\\frac{1}{3}$、$\\frac{1}{4}$、$\\frac{1}{6}$。要等于 1，需要"除以的数的积"是"乘的数的积"的 $\\frac{1}{2}$：$\\frac{1}{3}\\times\\frac{1}{4}=\\frac{1}{12}$，$\\frac{1}{12}\\div\\frac{1}{6}=\\frac{1}{2}$，所以 $\\div\\frac{1}{3}\\div\\frac{1}{4}\\times\\frac{1}{6}$ 可以：$\\frac{1}{2}\\div\\frac{1}{3}\\div\\frac{1}{4}\\times\\frac{1}{6}=1$。',
        '有加减：$\\frac{1}{2}+\\frac{1}{3}\\times\\frac{1}{4}\\div\\frac{1}{6}=\\frac{1}{2}+\\frac{1}{2}=1$。逐个检验其余填法都不等于 1，所以共 2 种。',
      ],
      verify: () => {
        const nums = [F(1).div(2), F(1).div(3), F(1).div(4), F(1).div(6)];
        const ops = ['+', '-', '*', '/'];
        const ev = o => {
          const vals = [nums[0]];
          const os = [];
          for (let i = 0; i < 3; i++) {
            if (o[i] === '*') vals[vals.length - 1] = vals[vals.length - 1].mul(nums[i + 1]);
            else if (o[i] === '/') vals[vals.length - 1] = vals[vals.length - 1].div(nums[i + 1]);
            else { os.push(o[i]); vals.push(nums[i + 1]); }
          }
          let r = vals[0];
          os.forEach((op, i) => { r = op === '+' ? r.add(vals[i + 1]) : r.sub(vals[i + 1]); });
          return r;
        };
        let best = null;
        let ones = 0;
        for (const a of ops) for (const b of ops) for (const c of ops) {
          const r = ev([a, b, c]);
          if (!best || r.cmp(best) > 0) best = r;
          if (r.eq(1)) ones++;
        }
        return [best, ones];
      },
    },
    {
      id: '2.8-c04',
      level: 'challenge',
      type: 'fill',
      stem: '规定 $a\\star b=\\frac{a+b}{1+a\\times b}$（$a$、$b$ 都是正数），多个数的运算从左往右依次进行。',
      blanks: [
        { kind: 'num', label: '(1) $0.5\\star\\frac{1}{3}\\star 0.25=$', answer: '9/11' },
        { kind: 'num', label: '(2) $0.5\\star 0.5\\star 0.5\\star 0.5\\star 0.5$（5 个 0.5）$=$', answer: '121/122' },
      ],
      explain: [
        '(1) $0.5\\star\\frac{1}{3}=\\frac{\\frac{5}{6}}{\\frac{7}{6}}=\\frac{5}{7}$；$\\frac{5}{7}\\star\\frac{1}{4}=\\frac{\\frac{27}{28}}{\\frac{33}{28}}=\\frac{27}{33}=\\frac{9}{11}$。',
        '(2) 思路：一步一步算，看结果有什么规律。2 个 0.5：$\\frac{1}{1\\frac{1}{4}}=\\frac{4}{5}$；3 个：$\\frac{4}{5}\\star\\frac{1}{2}=\\frac{\\frac{13}{10}}{\\frac{14}{10}}=\\frac{13}{14}$；4 个：$\\frac{13}{14}\\star\\frac{1}{2}=\\frac{\\frac{40}{28}}{\\frac{41}{28}}=\\frac{40}{41}$。',
        '规律：结果都是 $\\frac{m}{m+1}$，分子 1、4、13、40，每次乘 3 再加 1。',
        '为什么？$\\frac{m}{m+1}\\star\\frac{1}{2}$：分子 $\\frac{m}{m+1}+\\frac{1}{2}=\\frac{3\\times m+1}{2\\times(m+1)}$，分母 $1+\\frac{m}{2\\times(m+1)}=\\frac{3\\times m+2}{2\\times(m+1)}$，相除得 $\\frac{3\\times m+1}{3\\times m+2}$。确实是新分子 $3\\times m+1$、分母比分子大 1。',
        '5 个：$m=3\\times 40+1=121$，结果 $\\frac{121}{122}$。',
        '易错：以为 $a\\star a=a$ 或者结果越来越接近 0.5。',
      ],
      verify: () => {
        const st = (a, b) => a.add(b).div(F(1).add(a.mul(b)));
        let x = F(1).div(2);
        for (let i = 2; i <= 5; i++) x = st(x, F(1).div(2));
        return [st(st(F(1).div(2), F(1).div(3)), F(1).div(4)), x];
      },
    },
    {
      id: '2.8-c05',
      level: 'challenge',
      type: 'fill',
      stem: '规定 $a\\otimes b=a\\div b+b\\div a$（$a$、$b$ 都是正数）。',
      blanks: [
        { kind: 'nums', label: '(1) 如果 $0.5\\otimes x=2\\frac{1}{6}$，$x$ 可能是（全部填出，用逗号隔开）', answer: ['1/3', '3/4'] },
        { kind: 'num', label: '(2) $(0.5\\otimes 0.25)\\otimes 1=$', answer: '29/10' },
      ],
      explain: [
        '(1) 思路：$0.5\\otimes x=\\frac{0.5}{x}+\\frac{x}{0.5}$，两项正好互为倒数。设 $t=\\frac{x}{0.5}$（即 $x$ 的 2 倍），则 $t+\\frac{1}{t}=2\\frac{1}{6}=\\frac{13}{6}$。',
        '两个互为倒数的数，和是 $\\frac{13}{6}$：把 $\\frac{13}{6}$ 拆成 $\\frac{a}{b}+\\frac{b}{a}=\\frac{a\\times a+b\\times b}{a\\times b}$，试 $a\\times b=6$：$2\\times 3$，$4+9=13$，正好。所以 $t=\\frac{3}{2}$ 或 $\\frac{2}{3}$。',
        '$x=\\frac{t}{2}$：$x=\\frac{3}{4}$ 或 $\\frac{1}{3}$。检验：$0.5\\div\\frac{3}{4}+\\frac{3}{4}\\div 0.5=\\frac{2}{3}+\\frac{3}{2}=\\frac{13}{6}$；$0.5\\div\\frac{1}{3}+\\frac{1}{3}\\div 0.5=\\frac{3}{2}+\\frac{2}{3}=\\frac{13}{6}$。',
        '(2) $0.5\\otimes 0.25=2+\\frac{1}{2}=\\frac{5}{2}$；$\\frac{5}{2}\\otimes 1=\\frac{5}{2}+\\frac{2}{5}=\\frac{29}{10}$。',
        '易错：(1) 只找到一个 $x$；没发现两项互为倒数，硬凑。',
      ],
      verify: () => {
        const ot = (a, b) => a.div(b).add(b.div(a));
        const r = new Set();
        for (let n = 1; n <= 40; n++) for (let d = 1; d <= 40; d++) { const x = F(n).div(d); if (ot(F(1).div(2), x).eq(F(13).div(6))) r.add(x.toString()); }
        return [[...r].map(s => F(s)), ot(ot(F(1).div(2), F(1).div(4)), F(1))];
      },
    },
  ],
});
