'use strict';

// 上海数学六年级上册 · 1.5 有理数的混合运算
// 知识范围：运算顺序（乘方 → 乘除 → 加减，括号优先）、运算律简便计算、混合运算的实际应用；可以使用第 1 章全部内容
// 还没学：代数式、方程

Content.section({
  id: 'math/sh2024/g6s1/1.5',
  title: '有理数的混合运算',
  review: { status: 'pending' },
  audit: { blind: '2026-09-19', rounds: 2, note: '子代理盲解：第 1 轮 20 题答案全部一致；第 2 轮复核新 b02、e07、c02 和修改后的卡片' },

  intro: [
    {
      title: '运算顺序',
      body: '有理数混合运算的顺序：**先乘方，再乘除，最后加减**；同级运算从左往右依次进行；有括号的，先算括号里面的，按小括号、中括号、大括号的顺序依次进行。',
      example: '$2-3\\times(-2)^2=2-3\\times 4=2-12=-10$。',
      pitfall: '计算前先看清整个式子的结构，找出先算哪一步，再动笔。',
    },
    {
      title: '巧用运算律',
      body: '能用运算律简化的，就不必死板地按顺序算。常用的办法有：用分配律拆开括号，把分配律反过来提取相同的因数，先把和（或积）为整数的数结合起来。',
      example: '$\\left(-\\frac{5}{8}\\right)\\times 13-\\left(-\\frac{5}{8}\\right)\\times 5=\\left(-\\frac{5}{8}\\right)\\times(13-5)=-5$。',
    },
    {
      title: '常见错误',
      body: '混合运算最容易在这几处出错：① $-a^2$ 和 $(-a)^2$ 不分；② 只有乘除时没有从左往右算；③ 除数是几个数的和或差时，把除数拆开来除；④ 交换加数的位置时，没有连同它前面的符号一起移动。',
      example: '$-5^2=-25$，而 $(-5)^2=25$；$12\\div(2+4)=12\\div 6=2$，不能算成 $12\\div 2+12\\div 4=9$。',
    },
    {
      title: '用混合运算解决问题',
      body: '实际问题中常用“基准数 + 正负偏差”来记录数据：先把偏差加起来，再加上基准数乘个数，计算又快又不容易错。',
      example: '称 5 袋大米，以每袋 50 千克为标准，偏差记录为 $+0.5,\\ -1,\\ +0.3,\\ 0,\\ -0.4$。偏差合计 $0.8-1.4=-0.6$，总重 $50\\times 5-0.6=249.4$（千克）。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '1.5-b01',
      level: 'basic',
      type: 'fill',
      stem: '计算：$8+(-3)^2\\times(-2)$',
      blanks: [{ kind: 'num', answer: '-10' }],
      explain: ['先算乘方：$(-3)^2=9$。', '再算乘法：$9\\times(-2)=-18$。', '最后算加法：$8+(-18)=-10$。'],
      verify: () => F(8).add(F(-3).pow(2).mul(-2)),
    },
    {
      id: '1.5-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(-2)^3+6\\div\\left(-\\frac{1}{2}\\right)$',
      blanks: [{ kind: 'num', answer: '-20' }],
      explain: ['先算乘方：$(-2)^3=-8$。', '再算除法：$6\\div\\left(-\\frac{1}{2}\\right)=6\\times(-2)=-12$。', '最后算加法：$-8+(-12)=-20$。'],
      verify: () => F(-2).pow(3).add(F(6).div('-1/2')),
    },
    {
      id: '1.5-b03',
      level: 'basic',
      type: 'fill',
      stem: '用简便方法计算：$(-24)\\times\\left(\\frac{1}{8}-\\frac{1}{3}+\\frac{1}{4}\\right)$',
      blanks: [{ kind: 'num', answer: '-1' }],
      explain: ['用分配律，$-24$ 分别乘括号里的每一项：', '$(-24)\\times\\frac{1}{8}=-3$，$(-24)\\times\\left(-\\frac{1}{3}\\right)=8$，$(-24)\\times\\frac{1}{4}=-6$。', '$-3+8-6=-1$。'],
      verify: () => F(-24).mul(F('1/8').sub('1/3').add('1/4')),
    },
    {
      id: '1.5-b04',
      level: 'basic',
      type: 'fill',
      stem: '计算：$-2^2\\div\\frac{4}{9}\\times\\left(-\\frac{2}{3}\\right)^2$',
      blanks: [{ kind: 'num', answer: '-4' }],
      explain: ['先算乘方：$-2^2=-4$，$\\left(-\\frac{2}{3}\\right)^2=\\frac{4}{9}$。', '再从左往右算乘除：$-4\\div\\frac{4}{9}=-4\\times\\frac{9}{4}=-9$，$-9\\times\\frac{4}{9}=-4$。'],
      verify: () => F(2).pow(2).neg().div('4/9').mul(F('-2/3').pow(2)),
    },
    {
      id: '1.5-b05',
      level: 'basic',
      type: 'fill',
      stem: '计算：$18\\div(-3)\\times\\frac{1}{3}$',
      blanks: [{ kind: 'num', answer: '-2' }],
      explain: ['只有乘除，从左往右算：$18\\div(-3)=-6$，$-6\\times\\frac{1}{3}=-2$。', '常见错误：先算 $(-3)\\times\\frac{1}{3}=-1$，得到 $-18$。'],
      verify: () => F(18).div(-3).mul('1/3'),
    },

    // ---------- 扩展 ----------
    {
      id: '1.5-e01',
      level: 'extended',
      type: 'fill',
      stem: '计算：$-3^2\\times\\left[\\left(-\\frac{2}{3}\\right)^2-2\\right]-(-2)^3\\div 4$',
      blanks: [{ kind: 'num', answer: '16' }],
      explain: [
        '中括号里：$\\left(-\\frac{2}{3}\\right)^2-2=\\frac{4}{9}-2=-\\frac{14}{9}$。',
        '前一部分：$-9\\times\\left(-\\frac{14}{9}\\right)=14$。',
        '后一部分：$(-2)^3\\div 4=-8\\div 4=-2$，减去它就是加 2。',
        '$14-(-2)=16$。',
      ],
      verify: () => F(3).pow(2).neg().mul(F('-2/3').pow(2).sub(2)).sub(F(-2).pow(3).div(4)),
    },
    {
      id: '1.5-e02',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：$-\\frac{3}{7}\\times 25+\\frac{3}{7}\\times 11-\\left(-\\frac{3}{7}\\right)\\times 7$',
      blanks: [{ kind: 'num', answer: '-3' }],
      explain: [
        '三项都含有 $\\frac{3}{7}$，先把符号统一：原式 $=\\frac{3}{7}\\times(-25)+\\frac{3}{7}\\times 11+\\frac{3}{7}\\times 7$。',
        '反用分配律：$\\frac{3}{7}\\times(-25+11+7)=\\frac{3}{7}\\times(-7)=-3$。',
      ],
      verify: () => F('-3/7').mul(25).add(F('3/7').mul(11)).sub(F('-3/7').mul(7)),
    },
    {
      id: '1.5-e03',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\left[1\\frac{1}{2}-\\left(\\frac{5}{8}+\\frac{7}{12}\\right)\\times 24\\right]\\div(-5)$',
      blanks: [{ kind: 'num', answer: '11/2' }],
      explain: [
        '先算小括号乘 24，用分配律：$\\frac{5}{8}\\times 24+\\frac{7}{12}\\times 24=15+14=29$。',
        '中括号里：$1\\frac{1}{2}-29=-27\\frac{1}{2}$。',
        '$-27\\frac{1}{2}\\div(-5)=\\frac{55}{2}\\times\\frac{1}{5}=\\frac{11}{2}$。',
      ],
      verify: () => F('3/2').sub(F('5/8').add('7/12').mul(24)).div(-5),
    },
    {
      id: '1.5-e04',
      level: 'extended',
      type: 'choice',
      stem: '下列计算正确的是（　　）',
      options: [
        '$-3^2\\div 3\\times\\frac{1}{3}=-1$',
        '$\\left(-\\frac{1}{2}\\right)^3\\div\\left(-\\frac{1}{4}\\right)=-\\frac{1}{2}$',
        '$24\\div\\left(\\frac{1}{4}-\\frac{1}{6}\\right)=24\\div\\frac{1}{4}-24\\div\\frac{1}{6}=-48$',
        '$(-2)^3-3^2=1$',
      ],
      answer: 0,
      explain: [
        'A：$-9\\div 3\\times\\frac{1}{3}=-3\\times\\frac{1}{3}=-1$，正确。',
        'B：$-\\frac{1}{8}\\div\\left(-\\frac{1}{4}\\right)=\\frac{1}{2}$，符号错了。',
        'C：除法不能用分配律，正确结果是 $24\\div\\frac{1}{12}=288$。',
        'D：$-8-9=-17$。选 A。',
      ],
      verify: () =>
        [
          F(3).pow(2).neg().div(3).mul('1/3').eq(-1),
          F('-1/2').pow(3).div('-1/4').eq('-1/2'),
          F(24).div(F('1/4').sub('1/6')).eq(-48),
          F(-2).pow(3).sub(F(3).pow(2)).eq(1),
        ].indexOf(true),
    },
    {
      id: '1.5-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $|a|=3$，$b^2=4$，并且 $a<b$。求 $(a+b)^3$ 的所有可能值。（用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['-1', '-125'] }],
      explain: [
        '$a=\\pm 3$，$b=\\pm 2$。',
        '如果 $a=3$，$b$ 要比 3 大，但 $b$ 只能是 $\\pm 2$，不行。所以 $a=-3$，此时 $b=2$ 或 $-2$ 都满足 $a<b$。',
        '$b=2$ 时 $(a+b)^3=(-1)^3=-1$；$b=-2$ 时 $(a+b)^3=(-5)^3=-125$。',
      ],
      verify: () => {
        const r = [];
        for (const a of [3, -3]) for (const b of [2, -2]) if (a < b) r.push(F(a + b).pow(3));
        return r;
      },
    },
    {
      id: '1.5-e06',
      level: 'extended',
      type: 'fill',
      stem: '规定一种新运算：$a\\bigstar b=a^2-2b$。例如 $3\\bigstar 1=3^2-2\\times 1=7$。计算 $(-3)\\bigstar [2\\bigstar (-1)]$。',
      blanks: [{ kind: 'num', answer: '-3' }],
      explain: [
        '先算中括号：$2\\bigstar (-1)=2^2-2\\times(-1)=4+2=6$。',
        '再算 $(-3)\\bigstar 6=(-3)^2-2\\times 6=9-12=-3$。',
        '新运算要严格按规定代入，注意 $a^2$ 中 $a$ 是负数时要加括号。',
      ],
      verify: () => {
        const star = (a, b) => F(a).pow(2).sub(F(b).mul(2));
        return star(-3, star(2, -1));
      },
    },
    {
      id: '1.5-e07',
      level: 'extended',
      type: 'fill',
      stem: '一辆检修车在东西走向的公路上检修，从出发点开始，向东记为正，一天的行驶记录如下（单位：千米）：$+15,\\ -2,\\ +5,\\ -1,\\ +10,\\ -3,\\ -2,\\ +12,\\ +4,\\ -5$。',
      blanks: [
        { kind: 'num', label: '(1) 收工时，检修车的位置记作（千米）', answer: '33' },
        { kind: 'num', label: '(2) 如果每行驶 1 千米耗油 0.2 升，按记录中的行驶路程计算（不含收工后返回出发点），这一天共耗油（升）', answer: '11.8' },
      ],
      explain: [
        '(1) 把记录全部相加：$(15+5+10+12+4)+(-2-1-3-2-5)=46-13=33$，即在出发点东边 33 千米。',
        '(2) 耗油看的是一共走了多少路，要把每段的绝对值相加：$15+2+5+1+10+3+2+12+4+5=59$（千米）。',
        '$59\\times 0.2=11.8$（升）。常见错误：用 33 千米去算耗油。',
      ],
      verify: () => {
        const trip = [15, -2, 5, -1, 10, -3, -2, 12, 4, -5];
        const pos = trip.reduce((s, x) => s.add(x), F(0));
        const dist = trip.reduce((s, x) => s.add(F(x).abs()), F(0));
        return [pos, dist.mul('0.2')];
      },
    },
    {
      id: '1.5-e08',
      level: 'extended',
      type: 'fill',
      stem: '计算：$-1^{2024}-(1-0.5)\\div 3\\times\\left[3-(-3)^2\\right]$',
      blanks: [{ kind: 'num', answer: '0' }],
      explain: [
        '$-1^{2024}=-1$；中括号里 $3-9=-6$。',
        '$(1-0.5)\\div 3\\times(-6)=\\frac{1}{2}\\times\\frac{1}{3}\\times(-6)=-1$。',
        '原式 $=-1-(-1)=0$。',
      ],
      verify: () => F(1).pow(2024).neg().sub(F(1).sub('0.5').div(3).mul(F(3).sub(F(-3).pow(2)))),
    },
    {
      id: '1.5-e09',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x$ 是最大的负整数，$y$ 是绝对值最小的有理数，$z$ 是倒数等于它本身的正数。求 $x^{2025}+2y-z^3$ 的值。',
      blanks: [{ kind: 'num', answer: '-2' }],
      explain: ['最大的负整数是 $-1$，所以 $x=-1$；绝对值最小的有理数是 0，所以 $y=0$；倒数等于本身的正数是 1，所以 $z=1$。', '$(-1)^{2025}+2\\times 0-1^3=-1+0-1=-2$。'],
      verify: () => F(-1).pow(2025).add(F(0).mul(2)).sub(F(1).pow(3)),
    },
    {
      id: '1.5-e10',
      level: 'extended',
      type: 'fill',
      stem: '有 6 箱苹果，以每箱 20 千克为标准，超过的千克数记为正，不足的记为负，称重记录如下：$+1.5,\\ -2,\\ +0.5,\\ -1,\\ -0.5,\\ +2.5$。',
      blanks: [
        { kind: 'num', label: '(1) 这 6 箱苹果一共重（千克）', answer: '121' },
        { kind: 'num', label: '(2) 如果每千克卖 5.6 元，全部卖完可得（元）', answer: '677.6' },
      ],
      explain: [
        '(1) 偏差合计：$1.5-2+0.5-1-0.5+2.5=(1.5+0.5+2.5)-(2+1+0.5)=4.5-3.5=1$（千克）。',
        '总重 $=20\\times 6+1=121$（千克）。',
        '(2) $121\\times 5.6=677.6$（元）。',
      ],
      verify: () => {
        const total = ['1.5', '-2', '0.5', '-1', '-0.5', '2.5'].reduce((s, x) => s.add(x), F(120));
        return [total, total.mul('5.6')];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '1.5-c01',
      level: 'challenge',
      type: 'fill',
      stem: '观察下列等式：$1^3=1^2$，$1^3+2^3=3^2$，$1^3+2^3+3^3=6^2$，$1^3+2^3+3^3+4^3=10^2$，……按照这个规律，计算 $11^3+12^3+13^3+\\cdots+20^3$。',
      blanks: [{ kind: 'num', answer: '41075' }],
      explain: [
        '找规律：等号右边的底数 1，3，6，10 分别是 $1$，$1+2$，$1+2+3$，$1+2+3+4$。所以 $1^3+2^3+\\cdots+n^3=(1+2+\\cdots+n)^2$。',
        '$1^3+2^3+\\cdots+20^3=(1+2+\\cdots+20)^2=210^2=44100$。',
        '$1^3+2^3+\\cdots+10^3=(1+2+\\cdots+10)^2=55^2=3025$。',
        '所求的和是两者之差：$44100-3025=41075$。',
      ],
      verify: () => {
        let s = F(0);
        for (let k = 11; k <= 20; k++) s = s.add(F(k).pow(3));
        return s;
      },
    },
    {
      id: '1.5-c02',
      level: 'challenge',
      type: 'fill',
      stem: '计算：$1^2-2^2+3^2-4^2+5^2-6^2+\\cdots+99^2-100^2$',
      blanks: [{ kind: 'num', answer: '-5050' }],
      explain: [
        '两两分组，先算几组找规律：$1^2-2^2=-3$，$3^2-4^2=-7$，$5^2-6^2=-11$……',
        '观察发现，每一组的值恰好是这两个数之和的相反数：$-3=-(1+2)$，$-7=-(3+4)$，$-11=-(5+6)$……可以再多算几组验证这个规律（比如 $7^2-8^2=49-64=-15=-(7+8)$）。',
        '所以原式 $=-(1+2)-(3+4)-\\cdots-(99+100)=-(1+2+3+\\cdots+100)=-5050$。',
      ],
      verify: () => {
        let s = F(0);
        for (let k = 1; k <= 100; k++) s = k % 2 ? s.add(F(k).pow(2)) : s.sub(F(k).pow(2));
        return s;
      },
    },
    {
      id: '1.5-c03',
      level: 'challenge',
      type: 'fill',
      stem: '数轴上点 $A$ 表示数 $a$，点 $B$ 表示数 $b$，并且 $|a+3|+(b-2)^2=0$。点 $P$ 是数轴上的一个动点，表示的数是 $x$。',
      blanks: [
        { kind: 'nums', label: '(1) 若点 $P$ 到 $A$、$B$ 两点的距离之和为 7，则 $x$ 等于（全部填出，用逗号隔开）', answer: ['-4', '3'] },
        { kind: 'nums', label: '(2) 若点 $P$ 到 $A$ 的距离是它到 $B$ 的距离的 2 倍，则 $x$ 等于（全部填出，用逗号隔开）', answer: ['1/3', '7'] },
      ],
      explain: [
        '由非负性：$a+3=0$，$b-2=0$，所以 $A$ 表示 $-3$，$B$ 表示 2，$AB=5$。',
        '(1) $P$ 在 $A$、$B$ 之间时距离之和总是 5，不是 7。所以 $P$ 在外侧，多出的 $7-5=2$ 是 $P$ 到较近端点距离的 2 倍，即 $P$ 离端点 1。右侧得 $x=3$，左侧得 $x=-4$。',
        '(2) 分三种情况。$P$ 在 $A$ 左侧：$P$ 离 $A$ 更近，$PA<PB$，不可能。',
        '$P$ 在 $A$、$B$ 之间：$PA+PB=5$，且 $PA=2PB$，把 5 分成 3 份，$PB=\\frac{5}{3}$，所以 $x=2-\\frac{5}{3}=\\frac{1}{3}$。',
        '$P$ 在 $B$ 右侧：$PA-PB=AB=5$，且 $PA=2PB$，所以 $PB=5$，$x=2+5=7$。答案是 $\\frac{1}{3}$ 或 7。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -600; i <= 600; i++) xs.push(F(i).div(60));
        const pa = x => x.sub(-3).abs();
        const pb = x => x.sub(2).abs();
        return [xs.filter(x => pa(x).add(pb(x)).eq(7)), xs.filter(x => pa(x).eq(pb(x).mul(2)))];
      },
    },
    {
      id: '1.5-c04',
      level: 'challenge',
      type: 'fill',
      stem: '按规律排列的一列数：$-1,\\ 2,\\ -3,\\ 4,\\ -5,\\ 6,\\ \\dots$',
      blanks: [
        { kind: 'num', label: '(1) 前 2025 个数的和是', answer: '-1013' },
        { kind: 'num', label: '(2) 前 2025 个数中，所有正数的和除以所有负数的和，商是', answer: '-1012/1013' },
      ],
      explain: [
        '第 $n$ 个数的绝对值是 $n$，$n$ 为奇数时是负数，$n$ 为偶数时是正数。',
        '(1) 前 2024 个数两两一组：$(-1+2)+(-3+4)+\\cdots+(-2023+2024)$，共 1012 组，每组为 1，和为 1012；再加上第 2025 个数 $-2025$，得 $1012-2025=-1013$。',
        '(2) 正数的和：$2+4+\\cdots+2024=2\\times(1+2+\\cdots+1012)=1012\\times 1013$。',
        '负数的和：$-(1+3+5+\\cdots+2025)$。1 到 2025 共 1013 个奇数，首尾配对，和为 $\\frac{(1+2025)\\times 1013}{2}=1013\\times 1013$，所以负数的和是 $-1013\\times 1013$。',
        '商 $=\\frac{1012\\times 1013}{-1013\\times 1013}=-\\frac{1012}{1013}$。',
      ],
      verify: () => {
        let sum = F(0);
        let pos = F(0);
        let neg = F(0);
        for (let n = 1; n <= 2025; n++) {
          const v = F(n % 2 ? -n : n);
          sum = sum.add(v);
          if (v.cmp(0) > 0) pos = pos.add(v);
          else neg = neg.add(v);
        }
        return [sum, pos.div(neg)];
      },
    },
    {
      id: '1.5-c05',
      level: 'challenge',
      type: 'fill',
      stem: '计算：$(-0.125)^{2025}\\times 8^{2026}$',
      blanks: [{ kind: 'num', answer: '-8' }],
      explain: [
        '直接算不可能，要找能凑整的配对：$0.125\\times 8=1$。',
        '把 $8^{2026}$ 拆成 $8^{2025}\\times 8$。$(-0.125)^{2025}\\times 8^{2025}$ 是 2025 个 $(-0.125)$ 和 2025 个 8 相乘，用交换律、结合律把它们一一配对：',
        '每一对 $(-0.125)\\times 8=-1$，共 2025 对，乘积是 $(-1)^{2025}=-1$。',
        '所以原式 $=-1\\times 8=-8$。',
      ],
      verify: () => F('-0.125').pow(2025).mul(F(8).pow(2026)),
    },
  ],
});
