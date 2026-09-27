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
      pitfall: '只有乘除的式子也要从左往右：$\\frac{1}{2}\\div\\frac{1}{4}\\times 2=4$，不是 1。',
    },
    {
      title: '统一成分数还是小数',
      body: '分数能化成有限小数时，统一成小数或分数都可以；如果有分数化不成有限小数（如 $\\frac{1}{3}$），就把小数化成分数再算。',
      example: '$0.35+\\frac{1}{6}=\\frac{7}{20}+\\frac{1}{6}=\\frac{21}{60}+\\frac{10}{60}=\\frac{31}{60}$。',
    },
    {
      title: '常用的分数和小数',
      body: '记住一些常用的对应关系，便于凑整和约分：$0.5=\\frac{1}{2}$，$0.25=\\frac{1}{4}$，$0.75=\\frac{3}{4}$，$0.2=\\frac{1}{5}$，$0.125=\\frac{1}{8}$，$0.375=\\frac{3}{8}$，$0.625=\\frac{5}{8}$。',
      example: '$0.125\\times 72=\\frac{1}{8}\\times 8\\times 9=9$；$0.25\\times 0.8\\times 1.25\\times 4=(0.25\\times 4)\\times(0.8\\times 1.25)=1$。',
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
      stem: '用简便方法计算：$2025\\times\\frac{2027}{2026}$',
      blanks: [{ kind: 'num', answer: '4104675/2026' }],
      explain: [
        '拆成接近整数的形式：$2025=2026-1$，$\\frac{2027}{2026}=1+\\frac{1}{2026}$。',
        '$(2026-1)\\times\\left(1+\\frac{1}{2026}\\right)=2026\\times 1+2026\\times\\frac{1}{2026}-1\\times 1-1\\times\\frac{1}{2026}=2026+1-1-\\frac{1}{2026}$。',
        '结果是 $2026-\\frac{1}{2026}=2025\\frac{2025}{2026}$。',
        '易错：只拆一个数，例如 $2025\\times\\left(1+\\frac{1}{2026}\\right)=2025+\\frac{2025}{2026}$，这样也对，但如果用分配律时漏乘，就会出错。',
      ],
      verify: () => F(2025).mul(F(2027).div(2026)),
    },
    {
      id: '2.8-e02',
      level: 'extended',
      type: 'fill',
      stem: '求 $\\square$ 里的数：$\\left[\\left(\\square+0.\\dot{3}\\right)\\times 1.5-0.25\\right]\\div\\frac{1}{4}=5$',
      blanks: [{ kind: 'num', answer: '2/3' }],
      explain: [
        '从外往里倒推。中括号里的数 $\\div\\frac{1}{4}=5$，中括号里是 $5\\times\\frac{1}{4}=\\frac{5}{4}$。',
        '$(\\square+0.\\dot{3})\\times 1.5-0.25=\\frac{5}{4}$，所以 $(\\square+0.\\dot{3})\\times 1.5=\\frac{3}{2}$，$\\square+0.\\dot{3}=1$。',
        '$0.\\dot{3}=\\frac{1}{3}$，$\\square=\\frac{2}{3}$。',
        '易错：把 $0.\\dot{3}$ 当成 0.33 算，得到近似值 0.67。',
      ],
      verify: () => { for (let n = 1; n < 50; n++) for (let d = 1; d < 50; d++) { const x = F(n).div(d); if (x.add(F(1).div(3)).mul(F(3).div(2)).sub(F(1).div(4)).div(F(1).div(4)).eq(5)) return x; } return F(0); },
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
      stem: '已知 $A\\times 1\\frac{1}{4}=B\\times 0.75=C\\div 2$，并且 $A$、$B$、$C$ 都不为 0。三个数中最大的数是最小的数的几倍？',
      blanks: [{ kind: 'num', answer: '5/2' }],
      explain: [
        '$C\\div 2=C\\times\\frac{1}{2}$。三个积相等，乘的数越大，被乘的数越小。比较 $1\\frac{1}{4}$、$0.75$、$\\frac{1}{2}$：$A$ 乘的最大，$A$ 最小；$C$ 乘的最小，$C$ 最大。',
        '设三个积都等于 1：$A=\\frac{4}{5}$，$B=\\frac{4}{3}$，$C=2$。',
        '最大的是最小的 $2\\div\\frac{4}{5}=\\frac{5}{2}$ 倍。',
        '易错：看到 $C$ 后面是"除以 2"，以为 $C$ 最小。',
      ],
      verify: () => { const v = [F(1).div(F(5).div(4)), F(1).div(F(3).div(4)), F(2)]; v.sort((a, b) => a.cmp(b)); return v[2].div(v[0]); },
    },
    {
      id: '2.8-e05',
      level: 'extended',
      type: 'fill',
      stem: '规定 $[a,b,c]=(a+b)\\div c$。计算 $\\left[0.5,\\ \\frac{1}{3},\\ [0.25,\\ \\frac{1}{4},\\ 0.2]\\right]$。',
      blanks: [{ kind: 'num', answer: '1/3' }],
      explain: [
        '先算里面的：$[0.25,\\ \\frac{1}{4},\\ 0.2]=\\left(\\frac{1}{4}+\\frac{1}{4}\\right)\\div\\frac{1}{5}=\\frac{1}{2}\\times 5=\\frac{5}{2}$。',
        '再算外面的：$\\left(0.5+\\frac{1}{3}\\right)\\div\\frac{5}{2}=\\frac{5}{6}\\times\\frac{2}{5}=\\frac{1}{3}$。',
        '易错：外层先算，把 0.2 当成 $c$；或者按从左往右把六个数串起来算。',
      ],
      verify: () => { const g = (a, b, c) => a.add(b).div(c); return g(F(1).div(2), F(1).div(3), g(F(1).div(4), F(1).div(4), F(1).div(5))); },
    },
    {
      id: '2.8-e06',
      level: 'extended',
      type: 'fill',
      stem: '计算：$0.\\dot{1}\\dot{2}\\times 0.\\dot{2}\\dot{7}\\div 0.\\dot{0}\\dot{3}$（结果写成分数）',
      blanks: [{ kind: 'num', answer: '12/11' }],
      explain: [
        '三个都是循环节 2 位的纯循环小数：$0.\\dot{1}\\dot{2}=\\frac{12}{99}$，$0.\\dot{2}\\dot{7}=\\frac{27}{99}$，$0.\\dot{0}\\dot{3}=\\frac{3}{99}$。',
        '$\\frac{12}{99}\\times\\frac{27}{99}\\div\\frac{3}{99}=\\frac{12}{99}\\times\\frac{27}{99}\\times\\frac{99}{3}=\\frac{12\\times 9}{99}=\\frac{108}{99}=\\frac{12}{11}$。',
        '易错：把 $0.\\dot{0}\\dot{3}$ 当成 $\\frac{3}{9}$；或者先约分时把两个 99 都约掉。',
      ],
      verify: () => F(12).div(99).mul(F(27).div(99)).div(F(3).div(99)),
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
      stem: '计算：$0.\\dot{1}\\dot{2}+0.\\dot{2}\\dot{7}+0.\\dot{6}\\dot{0}+0.1\\dot{6}\\times 6$',
      blanks: [{ kind: 'num', answer: '2' }],
      explain: [
        '前三个都是循环节 2 位的纯循环小数，分母都是 99：$\\frac{12+27+60}{99}=\\frac{99}{99}=1$。',
        '$0.1\\dot{6}=\\frac{16-1}{90}=\\frac{1}{6}$，乘 6 得 1。',
        '原式 $=1+1=2$。易错：$0.\\dot{6}\\dot{0}$ 看成 $0.\\dot{6}$；或者按近似值计算。',
      ],
      verify: () => F(12).div(99).add(F(27).div(99)).add(F(60).div(99)).add(F(15).div(90).mul(6)),
    },
    {
      id: '2.8-e09',
      level: 'extended',
      type: 'fill',
      stem: '计算：$1\\div\\left[1+1\\div\\left(1+1\\div 1.5\\right)\\right]$',
      blanks: [{ kind: 'num', answer: '5/8' }],
      explain: [
        '从最里层往外算。$1\\div 1.5=\\frac{2}{3}$，$1+\\frac{2}{3}=\\frac{5}{3}$。',
        '$1\\div\\frac{5}{3}=\\frac{3}{5}$，$1+\\frac{3}{5}=\\frac{8}{5}$。',
        '$1\\div\\frac{8}{5}=\\frac{5}{8}$。',
        '易错：从左往右算，先算 $1\\div 1$。',
      ],
      verify: () => F(1).div(F(1).add(F(1).div(F(1).add(F(1).div(F(3).div(2)))))),
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
      stem: '在 $0.5\\ \\square\\ \\frac{1}{3}\\ \\square\\ 0.25\\ \\square\\ \\frac{1}{6}$ 的三个 $\\square$ 里各填一个运算符号（从 $+$、$-$、$\\times$、$\\div$ 中选），按运算顺序计算。计算过程中出现"不够减"的填法不算。',
      blanks: [
        { kind: 'num', label: '(1) 如果三个符号互不相同，结果最大是多少', answer: '5/3' },
        { kind: 'num', label: '(2) 符号可以重复，结果是正整数的填法有几种', answer: '6' },
      ],
      explain: [
        '四个数都比 1 小：乘它们会变小，除以它们会变大。',
        '(1) 三个符号不同，恰好有一个除号。按除号的位置分三类，每类再试另外两个符号：',
        '除号在第 1 个：$0.5\\div\\frac{1}{3}=\\frac{3}{2}$，后面接 $\\frac{1}{4}$、$\\frac{1}{6}$，最大是 $\\frac{3}{2}+\\frac{1}{4}-\\frac{1}{6}=\\frac{19}{12}$。',
        '除号在第 2 个：$\\frac{1}{3}\\div\\frac{1}{4}=\\frac{4}{3}$，最大是 $0.5+\\frac{4}{3}-\\frac{1}{6}=\\frac{5}{3}$（$0.5-\\frac{4}{3}$ 不够减）。',
        '除号在第 3 个：$\\frac{1}{4}\\div\\frac{1}{6}=\\frac{3}{2}$，最大是 $0.5-\\frac{1}{3}+\\frac{3}{2}=\\frac{5}{3}$ 或 $0.5\\times\\frac{1}{3}+\\frac{3}{2}=\\frac{5}{3}$；若乘号在除号前，$\\frac{1}{3}\\times\\frac{1}{4}\\div\\frac{1}{6}=\\frac{1}{2}$，结果更小。',
        '比较三类，最大是 $\\frac{5}{3}$。',
        '(2) 按除号的个数分类，逐个计算后，结果是正整数的有：$0.5\\div\\frac{1}{3}\\div 0.25\\div\\frac{1}{6}=36$；$0.5\\times\\frac{1}{3}\\div 0.25\\div\\frac{1}{6}=4$；$0.5\\div\\frac{1}{3}\\div 0.25\\times\\frac{1}{6}=1$；$0.5\\div\\frac{1}{3}+0.25\\div\\frac{1}{6}=3$；$0.5+\\frac{1}{3}\\div 0.25+\\frac{1}{6}=2$；$0.5+\\frac{1}{3}\\times 0.25\\div\\frac{1}{6}=1$。共 6 种。',
        '（没有除号时结果都比 2 小且不是整数；其余填法检验后都不是正整数或不够减。）易错：漏掉三个除号的那一种，或者把不够减的也算进去。',
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
          let neg = false;
          os.forEach((op, i) => { r = op === '+' ? r.add(vals[i + 1]) : r.sub(vals[i + 1]); if (r.cmp(0) < 0) neg = true; });
          return neg ? null : r;
        };
        let best = null;
        let ints = 0;
        for (const a of ops) for (const b of ops) for (const c of ops) {
          const r = ev([a, b, c]);
          if (!r) continue;
          if (new Set([a, b, c]).size === 3 && (!best || r.cmp(best) > 0)) best = r;
          if (r.d === 1n && r.cmp(0) > 0) ints++;
        }
        return [best, ints];
      },
    },
    {
      id: '2.8-c03',
      level: 'challenge',
      type: 'fill',
      stem: '一组数的平均数是 1.2。去掉其中一个数 3.6 后，剩下的数的平均数是 $1\\frac{1}{15}$。',
      blanks: [
        { kind: 'num', label: '(1) 原来一共有几个数', answer: '19' },
        { kind: 'num', label: '(2) 再去掉一个数后，剩下的数的平均数恰好是 1，第二次去掉的数是多少', answer: '11/5' },
      ],
      explain: [
        '思路：平均数变化的原因是去掉的数比平均数大，多出来的部分被剩下的数"分摊"了。',
        '(1) 3.6 比原平均数 1.2 多 2.4。去掉它后，剩下的每个数的平均数比 1.2 少了 $1.2-1\\frac{1}{15}=\\frac{6}{5}-\\frac{16}{15}=\\frac{2}{15}$。',
        '原来这 2.4 是被所有数平分的；也就是说，去掉 3.6 后，剩下的数的总和比"个数 × 1.2"少了 2.4，平均下来每个少 $\\frac{2}{15}$。剩下的个数 $=2.4\\div\\frac{2}{15}=18$，原来 19 个。',
        '检验：原总和 $19\\times 1.2=22.8$，去掉 3.6 剩 19.2，$19.2\\div 18=1\\frac{1}{15}$。',
        '(2) 剩下 18 个数总和 19.2，再去掉一个后剩 17 个，平均数是 1，总和 17。去掉的数是 $19.2-17=2.2=\\frac{11}{5}$。',
        '易错：(1) 用 $3.6\\div\\frac{2}{15}$ 或 $2.4\\div\\frac{2}{15}$ 当成原来的个数。',
      ],
      verify: () => {
        let n = 0;
        for (let m = 2; m < 200; m++) if (F(m).mul(F(6).div(5)).sub(F(18).div(5)).div(m - 1).eq(F(16).div(15))) n = m;
        const rest = F(n).mul(F(6).div(5)).sub(F(18).div(5));
        return [n, rest.sub(n - 2)];
      },
    },
    {
      id: '2.8-c04',
      level: 'challenge',
      type: 'fill',
      stem: '规定 $a\\star b=\\frac{a+b}{1+a\\times b}$（$a$、$b$ 都是正数），多个数的运算从左往右依次进行。',
      blanks: [
        { kind: 'num', label: '(1) $0.5\\star\\frac{1}{3}\\star 0.25=$', answer: '9/11' },
        { kind: 'num', label: '(2) 把 $n$ 个 0.5 依次做 $\\star$ 运算（$0.5\\star 0.5\\star\\cdots\\star 0.5$），结果第一次超过 0.999 时，$n$ 最小是多少', answer: '7' },
      ],
      explain: [
        '(1) $0.5\\star\\frac{1}{3}=\\frac{5}{6}\\div\\frac{7}{6}=\\frac{5}{7}$；$\\frac{5}{7}\\star\\frac{1}{4}=\\frac{27}{28}\\div\\frac{33}{28}=\\frac{9}{11}$。',
        '(2) 思路：先算前几个，找规律，再推广。2 个：$\\frac{1}{1\\frac{1}{4}}=\\frac{4}{5}$；3 个：$\\frac{4}{5}\\star\\frac{1}{2}=\\frac{13}{10}\\div\\frac{14}{10}=\\frac{13}{14}$；4 个：$\\frac{13}{14}\\star\\frac{1}{2}=\\frac{40}{41}$。',
        '规律：结果都是 $\\frac{m}{m+1}$，$m$ 依次是 1、4、13、40，每次乘 3 再加 1。说明：$\\frac{m}{m+1}\\star\\frac{1}{2}$ 的分子 $\\frac{3\\times m+1}{2\\times(m+1)}$，分母 $\\frac{3\\times m+2}{2\\times(m+1)}$，相除得 $\\frac{3\\times m+1}{3\\times m+2}$。',
        '$\\frac{m}{m+1}$ 超过 $0.999=\\frac{999}{1000}$，就是离 1 差的 $\\frac{1}{m+1}$ 比 $\\frac{1}{1000}$ 小，$m+1>1000$，$m\\ge 1000$。',
        '$m$ 依次是 1、4、13、40、121、364、1093：第 7 个是 1093，才超过 1000。所以 $n=7$。',
        '易错：只算到第 4、5 个就猜答案；或者以为结果越来越接近 0.5。',
      ],
      verify: () => {
        const st = (a, b) => a.add(b).div(F(1).add(a.mul(b)));
        let x = F(1).div(2);
        let n = 1;
        while (x.cmp(F(999).div(1000)) <= 0) { x = st(x, F(1).div(2)); n++; }
        return [st(st(F(1).div(2), F(1).div(3)), F(1).div(4)), n];
      },
    },
    {
      id: '2.8-c05',
      level: 'challenge',
      type: 'fill',
      stem: '规定 $a\\otimes b=a\\div b+b\\div a$（$a$、$b$ 都是正数）。',
      blanks: [
        { kind: 'nums', label: '(1) 如果 $0.5\\otimes x=2\\frac{1}{6}$，$x$ 可能是（全部填出，用逗号隔开）', answer: ['1/3', '3/4'] },
        { kind: 'nums', label: '(2) 如果 $x$ 是分数（或整数），并且 $0.5\\otimes x$ 是整数，$x$ 可能是（全部填出，用逗号隔开）', answer: ['1/2'] },
      ],
      explain: [
        '思路：$0.5\\otimes x=\\frac{0.5}{x}+\\frac{x}{0.5}$，两项正好互为倒数。设 $t=\\frac{x}{0.5}$（$x$ 的 2 倍），式子就是 $t+\\frac{1}{t}$。',
        '(1) $t+\\frac{1}{t}=\\frac{13}{6}$。把 $t$ 写成最简分数 $\\frac{p}{q}$，$\\frac{p}{q}+\\frac{q}{p}=\\frac{p\\times p+q\\times q}{p\\times q}$。$p\\times q$ 与 $p\\times p+q\\times q$ 互素（$p$、$q$ 互素时，$p$ 的素因数整除不了 $q\\times q$），所以这个分数已经最简，$p\\times q=6$，$p\\times p+q\\times q=13$。',
        '$p\\times q=6$ 只有 1 和 6、2 和 3 两种，$1+36=37$ 不行，$4+9=13$ 可以。所以 $t=\\frac{2}{3}$ 或 $\\frac{3}{2}$，$x=\\frac{1}{3}$ 或 $\\frac{3}{4}$，恰好两个。',
        '(2) 同样，$t+\\frac{1}{t}=\\frac{p\\times p+q\\times q}{p\\times q}$ 已是最简分数，要是整数，分母 $p\\times q=1$，$p=q=1$，$t=1$，$x=\\frac{1}{2}$（这时 $0.5\\otimes 0.5=2$）。',
        '易错：(1) 只凑出一个 $x$；(2) 以为 $x=1$、$x=2$ 这样的整数也行（$0.5\\otimes 1=2\\frac{1}{2}$，不是整数）。',
      ],
      verify: () => {
        const ot = (a, b) => a.div(b).add(b.div(a));
        const r1 = new Set();
        const r2 = new Set();
        for (let n = 1; n <= 60; n++) for (let d = 1; d <= 60; d++) {
          const x = F(n).div(d);
          const v = ot(F(1).div(2), x);
          if (v.eq(F(13).div(6))) r1.add(x.toString());
          if (v.d === 1n) r2.add(x.toString());
        }
        return [[...r1].map(s => F(s)), [...r2].map(s => F(s))];
      },
    },
  ],
});
