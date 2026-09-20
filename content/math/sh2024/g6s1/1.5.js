'use strict';

// 上海数学六年级上册 · 1.5 有理数的混合运算
// 知识范围：运算顺序（乘方 → 乘除 → 加减，括号优先）、运算律简便计算、混合运算的实际应用；可以使用第 1 章全部内容
// 还没学：代数式、方程

Content.section({
  id: 'math/sh2024/g6s1/1.5',
  title: '有理数的混合运算',
  review: { status: 'pending' },
  audit: { blind: '2026-09-20', rounds: 3, note: '难度上移后子代理复核三轮：新题答案全部一致，第 3 轮判定整节通过（按意见换掉 e09、c05 增加第 3 问）' },

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
      id: '1.5-b02',
      level: 'basic',
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
      id: '1.5-b03',
      level: 'basic',
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
      id: '1.5-b04',
      level: 'basic',
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
      id: '1.5-b05',
      level: 'basic',
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

    // ---------- 扩展 ----------
    {
      id: '1.5-e01',
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
      id: '1.5-e02',
      level: 'extended',
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
      id: '1.5-e03',
      level: 'extended',
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
      id: '1.5-e04',
      level: 'extended',
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
      id: '1.5-e05',
      level: 'extended',
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
      id: '1.5-e06',
      level: 'extended',
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
    {
      id: '1.5-e07',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\left(1+\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2024}\\right)\\times\\left(\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2025}\\right)-\\left(1+\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2025}\\right)\\times\\left(\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2024}\\right)$',
      blanks: [{ kind: 'num', answer: '1/2025' }],
      explain: [
        '四个括号里的和都算不出来，要找它们的共同部分。四个括号都含有“$\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2024}$”，把这一段整体记作 □。',
        '那么四个括号分别是：$1+\\square $，$\\square +\\frac{1}{2025}$，$1+\\square +\\frac{1}{2025}$，$\\square $。',
        '前一个积：$(1+\\square )\\times\\left(\\square +\\frac{1}{2025}\\right)=\\square +\\frac{1}{2025}+\\square \\times\\square +\\square \\times\\frac{1}{2025}$（分配律）。',
        '后一个积：$\\left(1+\\square +\\frac{1}{2025}\\right)\\times\\square =\\square +\\square \\times\\square +\\frac{1}{2025}\\times\\square $。',
        '相减，相同的部分全部抵消，只剩 $\\frac{1}{2025}$。这种把一段相同的式子“看成一个整体”的方法，以后会经常用到。',
      ],
      verify: () => {
        let box = F(0);
        for (let k = 2; k <= 2024; k++) box = box.add(F(1).div(k));
        const last = F(1).div(2025);
        return F(1).add(box).mul(box.add(last)).sub(F(1).add(box).add(last).mul(box));
      },
    },
    {
      id: '1.5-e08',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$、$c$ 都是不为 0 的有理数，并且 $a+b+c=0$，$abc>0$。求 $\\frac{b+c}{|a|}+\\frac{a+c}{|b|}+\\frac{a+b}{|c|}$ 的值。',
      blanks: [{ kind: 'num', answer: '1' }],
      explain: [
        '由 $a+b+c=0$ 得 $b+c=-a$，$a+c=-b$，$a+b=-c$。',
        '原式 $=\\frac{-a}{|a|}+\\frac{-b}{|b|}+\\frac{-c}{|c|}=-\\left(\\frac{a}{|a|}+\\frac{b}{|b|}+\\frac{c}{|c|}\\right)$。',
        '再定符号：$abc>0$，负数有 0 个或 2 个；$a+b+c=0$ 且都不为 0，不可能全是正数。所以恰好两个负数、一个正数。',
        '括号里 $=1-1-1=-1$，原式 $=1$。',
      ],
      verify: () => {
        const vals = new Set();
        for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) {
          const c = -a - b;
          if (!a || !b || !c || a * b * c <= 0) continue;
          const v = F(b + c).div(Math.abs(a)).add(F(a + c).div(Math.abs(b))).add(F(a + b).div(Math.abs(c)));
          vals.add(v.toString());
        }
        return vals.size === 1 ? [...vals][0] : null;
      },
    },
    {
      id: '1.5-e09',
      level: 'extended',
      type: 'fill',
      stem: '某车间每天的产量以 1000 个为标准，超出的个数记为正，不足的记为负。本周七天的记录是：$+16,\\ -5,\\ -9,\\ +22,\\ -8,\\ 0,\\ +30$。',
      blanks: [
        { kind: 'num', label: '(1) 产量最高的一天比最低的一天多几个？', answer: '39', suffix: '个' },
        { kind: 'num', label: '(2) 本周一共生产了多少个？', answer: '7046', suffix: '个' },
        { kind: 'num', label: '(3) 按规定，每生产 1 个奖励 2 元；超出标准的部分每个再奖 1 元，不足标准的部分每个扣 1.5 元。本周车间共得多少元？', answer: '14127', suffix: '元' },
      ],
      explain: [
        '(1) 最高的一天是 $+30$，最低的一天是 $-9$，相差 $30-(-9)=39$ 个。注意比较的是记录的数，不是绝对值。',
        '(2) 先把偏差加起来：$16-5-9+22-8+0+30=(16+22+30)-(5+9+8)=68-22=46$。总产量 $=1000\\times 7+46=7046$ 个。',
        '(3) 分三部分算：生产奖励 $7046\\times 2=14092$ 元；超出的部分共 $16+22+30=68$ 个，再奖 68 元；不足的部分共 $5+9+8=22$ 个，扣 $22\\times 1.5=33$ 元。',
        '合计 $14092+68-33=14127$ 元。用“基准数 + 偏差”来算，比一天天算快得多。',
      ],
      verify: () => {
        const rec = [16, -5, -9, 22, -8, 0, 30];
        const total = rec.reduce((s, x) => s.add(x), F(1000 * 7));
        const extra = rec.filter(x => x > 0).reduce((s, x) => s.add(x), F(0));
        const less = rec.filter(x => x < 0).reduce((s, x) => s.add(-x), F(0));
        const hi = rec.reduce((a, b) => Math.max(a, b));
        const lo = rec.reduce((a, b) => Math.min(a, b));
        return [F(hi).sub(lo), total, total.mul(2).add(extra).sub(less.mul('1.5'))];
      },
    },
    {
      id: '1.5-e10',
      level: 'extended',
      type: 'fill',
      stem: '已知 $|x|=4$，$|y|=\\frac{1}{2}$，并且 $xy<0$。求 $x\\div y-(x+y)^2$ 的所有可能值。（有几个就填几个，只有一个就填一个）',
      blanks: [{ kind: 'nums', answer: ['-81/4'] }],
      explain: [
        '$xy<0$，$x$、$y$ 异号，有两种情况：$x=4,\\ y=-\\frac{1}{2}$，或 $x=-4,\\ y=\\frac{1}{2}$。',
        '第一种：$x\\div y=4\\div\\left(-\\frac{1}{2}\\right)=-8$，$x+y=\\frac{7}{2}$，$(x+y)^2=\\frac{49}{4}$，原式 $=-8-\\frac{49}{4}=-\\frac{81}{4}$。',
        '第二种：$x\\div y=-8$，$x+y=-\\frac{7}{2}$，$(x+y)^2=\\frac{49}{4}$，原式也是 $-\\frac{81}{4}$。',
        '两种情况结果相同，所以只有一个值 $-\\frac{81}{4}$。分类后发现结果一样，也要写清楚。',
      ],
      verify: () => {
        const vals = new Set();
        for (const [x, y] of [[4, '-1/2'], [-4, '1/2']]) vals.add(F(x).div(y).sub(F(x).add(y).pow(2)).toString());
        return [...vals];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '1.5-c01',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $x$、$y$ 是有理数，$|x+1|+|x-2|+(y-3)^2$ 的值记为 $M$。',
      blanks: [
        { kind: 'num', label: '(1) $M$ 的最小值是', answer: '3' },
        { kind: 'num', label: '(2) 当 $M$ 取最小值时，$x^y$ 的最大值是', answer: '8' },
        { kind: 'num', label: '(3) 当 $M$ 取最小值时，$x^y$ 的最小值是', answer: '-1' },
      ],
      explain: [
        '$M$ 由两部分组成，可以分别求最小值：$|x+1|+|x-2|$ 是数轴上点 $x$ 到 $-1$ 和 2 的距离之和，最小值是 $2-(-1)=3$，在 $-1\\le x\\le 2$ 时取到；$(y-3)^2\\ge 0$，最小值 0，在 $y=3$ 时取到。',
        '(1) 两部分同时取最小，$M$ 的最小值是 $3+0=3$。',
        '此时 $y=3$，$x$ 可以是 $-1$ 到 2 之间（含端点）的任意有理数，要研究 $x^3$ 的范围。',
        '$x$ 在 $-1$ 到 0 之间时，$x^3$ 是负数，$|x^3|$ 不超过 1，所以 $-1\\le x^3\\le 0$；$x$ 在 0 到 2 之间时，$x^3$ 是正数，而且 $x$ 越大 $x^3$ 越大，$0\\le x^3\\le 8$。',
        '(2) 最大值 $2^3=8$；(3) 最小值 $(-1)^3=-1$。关键是先看出“最小值在一段范围内取到”，而不是只在一个点。',
      ],
      verify: () => {
        const M = (x, y) => x.sub(-1).abs().add(x.sub(2).abs()).add(y.sub(3).pow(2));
        const pts = [];
        for (let i = -12; i <= 16; i++) for (let j = 0; j <= 24; j++) pts.push([F(i).div(4), F(j).div(4)]);
        const min = pts.map(([x, y]) => M(x, y)).reduce((a, b) => (a.cmp(b) < 0 ? a : b));
        const vals = pts.filter(([x, y]) => M(x, y).eq(min)).map(([x, y]) => x.pow(Number(y.n)));
        vals.sort((a, b) => a.cmp(b));
        return [min, vals[vals.length - 1], vals[0]];
      },
    },
    {
      id: '1.5-c02',
      level: 'challenge',
      type: 'fill',
      stem: '把 $1,\\ -2,\\ 3,\\ -4,\\ 5,\\ -6,\\ \\dots$ 这列数按下面的方式排成数阵：第 1 行 1 个数，第 2 行 2 个数，第 3 行 3 个数……第 $n$ 行 $n$ 个数。',
      blanks: [
        { kind: 'num', label: '(1) 第 20 行所有数的和是', answer: '-10' },
        { kind: 'num', label: '(2) 第 21 行所有数的和是', answer: '221' },
        { kind: 'num', label: '(3) 2025 在第几行？', answer: '64' },
        { kind: 'num', label: '(4) 2025 是这一行的第几个数？', answer: '9' },
      ],
      explain: [
        '这列数的第 $k$ 个数，绝对值是 $k$，$k$ 为奇数时为正，为偶数时为负。前 $n$ 行共有 $1+2+\\cdots+n$ 个数。',
        '(1) 前 19 行共 190 个数，第 20 行是第 191 到 210 个数：$191-192+193-\\cdots+209-210$，20 个数两两一组，每组为 $-1$，共 10 组，和为 $-10$。',
        '(2) 前 20 行共 210 个数，第 21 行是第 211 到 231 个数，共 21 个：前 20 个两两一组得 $-10$，再加上最后一个 231，和为 221。',
        '一行的和取决于这一行的个数是奇数还是偶数，以及第一个数的正负，这就是要分类的地方。',
        '(3)(4) 2025 是第 2025 个数（奇数，所以是正的）。前 63 行共 $\\frac{63\\times 64}{2}=2016$ 个，前 64 行共 2080 个，所以在第 64 行，是这一行的第 $2025-2016=9$ 个数。',
      ],
      verify: () => {
        const val = k => F(k % 2 ? k : -k);
        const start = row => (row - 1) * row / 2 + 1;
        const rowSum = row => {
          let s = F(0);
          for (let k = start(row); k < start(row + 1); k++) s = s.add(val(k));
          return s;
        };
        let row = 1;
        while (start(row + 1) <= 2025) row++;
        return [rowSum(20), rowSum(21), row, 2025 - start(row) + 1];
      },
    },
    {
      id: '1.5-c03',
      level: 'challenge',
      type: 'fill',
      stem: '记 $S_n=\\frac{1}{1\\times 2\\times 3}+\\frac{1}{2\\times 3\\times 4}+\\frac{1}{3\\times 4\\times 5}+\\cdots+\\frac{1}{n(n+1)(n+2)}$（共 $n$ 项）。',
      blanks: [
        { kind: 'num', label: '(1) $S_{98}=$', answer: '4949/19800' },
        { kind: 'num', label: '(2) 使 $S_n>0.2499$ 的最小正整数 $n$ 是', answer: '70' },
      ],
      explain: [
        '仿照两个数之积的裂项，试着把每一项拆成“前两个数之积的倒数”减“后两个数之积的倒数”：$\\frac{1}{1\\times 2}-\\frac{1}{2\\times 3}=\\frac{3-1}{1\\times 2\\times 3}=\\frac{2}{1\\times 2\\times 3}$，是原来那一项的 2 倍。',
        '所以 $\\frac{1}{1\\times 2\\times 3}=\\frac{1}{2}\\times\\left(\\frac{1}{1\\times 2}-\\frac{1}{2\\times 3}\\right)$，后面每一项同理。相加时中间抵消：$S_n=\\frac{1}{2}\\times\\left(\\frac{1}{2}-\\frac{1}{(n+1)(n+2)}\\right)=\\frac{1}{4}-\\frac{1}{2(n+1)(n+2)}$。',
        '(1) $S_{98}=\\frac{1}{4}-\\frac{1}{2\\times 99\\times 100}=\\frac{1}{4}-\\frac{1}{19800}=\\frac{4950-1}{19800}=\\frac{4949}{19800}$。',
        '(2) $S_n$ 永远比 $\\frac{1}{4}=0.25$ 小，差是 $\\frac{1}{2(n+1)(n+2)}$。要 $S_n>0.2499$，差要小于 0.0001，即 $2(n+1)(n+2)>10000$，$(n+1)(n+2)>5000$。',
        '$70\\times 71=4970<5000$（$n=69$），$71\\times 72=5112>5000$（$n=70$），所以最小的 $n$ 是 70。',
      ],
      verify: () => {
        let s = F(0);
        let s98 = null;
        let first = null;
        for (let n = 1; n <= 200; n++) {
          s = s.add(F(1).div(n * (n + 1) * (n + 2)));
          if (n === 98) s98 = s;
          if (!first && s.cmp('0.2499') > 0) first = n;
        }
        return [s98, first];
      },
    },
    {
      id: '1.5-c04',
      level: 'challenge',
      type: 'fill',
      stem: '在 $1\\ \\square \\ 2\\ \\square \\ 3\\ \\square \\ 4\\ \\square \\ 5\\ \\square \\ 6$ 的五个 $\\square$ 中，填入“$+$”“$-$”“$\\times$”“$\\div$”，每种符号至少用一次（有一种会用两次），然后按运算顺序计算。',
      blanks: [
        { kind: 'num', label: '(1) 计算结果的最大值是', answer: '361/3' },
        { kind: 'num', label: '(2) 计算结果的最小值是', answer: '-355/3' },
      ],
      explain: [
        '填法有好几百种，不能逐一试，要分析每种符号的作用：“$\\times$”能让数变得最大，“$\\div$”会让数变小。',
        '(1) 结果要最大，应该让最大的几个数相乘，再用“$+$”加上去。四种符号都要用，五个位置里“$\\times$”最多用两次，所以乘积部分最大是 $4\\times 5\\times 6=120$，前面用“$+$”。',
        '剩下 1、2、3 之间要填“$-$”和“$\\div$”：$1-2\\div 3=\\frac{1}{3}$，$1\\div 2-3=-\\frac{5}{2}$，取前者。最大值 $=1-2\\div 3+4\\times 5\\times 6=\\frac{1}{3}+120=\\frac{361}{3}$。',
        '也要排除别的想法：比如让“$+$”用两次、“$\\times$”只用一次，乘积最多是 $5\\times 6=30$，远小于 120。',
        '(2) 结果要最小，把 120 用“$-$”减掉；1、2、3 之间填“$+$”和“$\\div$”，要让这部分尽量小：$1+2\\div 3=\\frac{5}{3}$，$1\\div 2+3=\\frac{7}{2}$，取前者。最小值 $=\\frac{5}{3}-120=-\\frac{355}{3}$。',
      ],
      verify: () => {
        const ops = ['+', '-', '*', '/'];
        const calc = o => {
          const nums = [1, 2, 3, 4, 5, 6].map(n => F(n));
          const terms = [nums[0]];
          const signs = [];
          o.forEach((op, i) => {
            const n = nums[i + 1];
            if (op === '*') terms[terms.length - 1] = terms[terms.length - 1].mul(n);
            else if (op === '/') terms[terms.length - 1] = terms[terms.length - 1].div(n);
            else { signs.push(op); terms.push(n); }
          });
          return terms.slice(1).reduce((s, t, i) => (signs[i] === '+' ? s.add(t) : s.sub(t)), terms[0]);
        };
        const vals = [];
        (function fill(a) {
          if (a.length === 5) {
            if (ops.every(o => a.includes(o))) vals.push(calc(a));
            return;
          }
          for (const o of ops) fill([...a, o]);
        })([]);
        vals.sort((x, y) => x.cmp(y));
        return [vals[vals.length - 1], vals[0]];
      },
    },
    {
      id: '1.5-c05',
      level: 'challenge',
      type: 'fill',
      stem: '观察：$1\\times 2=\\frac{1}{3}\\times(1\\times 2\\times 3-0\\times 1\\times 2)$，$2\\times 3=\\frac{1}{3}\\times(2\\times 3\\times 4-1\\times 2\\times 3)$，……',
      blanks: [
        { kind: 'num', label: '(1) $1\\times 2+2\\times 3+3\\times 4+\\cdots+99\\times 100=$', answer: '333300' },
        { kind: 'num', label: '(2) $1\\times 2\\times 3+2\\times 3\\times 4+\\cdots+20\\times 21\\times 22=$', answer: '53130' },
        { kind: 'num', label: '(3) $1^2+2^2+3^2+\\cdots+50^2=$', answer: '42925' },
      ],
      explain: [
        '(1) 按规律，每一项都能写成 $\\frac{1}{3}\\times$（“它和后一个数的三连乘” − “前一个数开头的三连乘”）。相加时中间的三连乘全部抵消。',
        '原式 $=\\frac{1}{3}\\times(99\\times 100\\times 101-0\\times 1\\times 2)=\\frac{1}{3}\\times 999900=333300$。',
        '(2) 自己仿照构造：试 $1\\times 2\\times 3\\times 4-0\\times 1\\times 2\\times 3=24=4\\times(1\\times 2\\times 3)$。一般地，四个连续数之积减去“往前挪一位”的四连乘，等于中间三连乘的 4 倍，所以每一项 $=\\frac{1}{4}\\times$（两个四连乘之差）。',
        '原式 $=\\frac{1}{4}\\times(20\\times 21\\times 22\\times 23-0)=\\frac{1}{4}\\times 212520=53130$。',
        '(3) 换一个思路：$k^2$ 和 $k\\times(k+1)$ 只差一个 $k$，因为 $k\\times(k+1)=k^2+k$，所以 $k^2=k\\times(k+1)-k$。',
        '于是 $1^2+2^2+\\cdots+50^2=(1\\times 2+2\\times 3+\\cdots+50\\times 51)-(1+2+\\cdots+50)$。',
        '用 (1) 的方法算第一部分：$\\frac{1}{3}\\times 50\\times 51\\times 52=44200$；第二部分首尾配对：$1+50=51$，$2+49=51$……共 25 对，$51\\times 25=1275$。所以结果是 $44200-1275=42925$。',
        '(2) 要把 (1) 的方法推广到三个因数，(3) 要先把平方转化成两个相邻数之积，都是自己构造出来的，这是这道题的难点。',
      ],
      verify: () => {
        let a = F(0);
        for (let k = 1; k <= 99; k++) a = a.add(k * (k + 1));
        let b = F(0);
        for (let k = 1; k <= 20; k++) b = b.add(k * (k + 1) * (k + 2));
        let c = F(0);
        for (let k = 1; k <= 50; k++) c = c.add(k * k);
        return [a, b, c];
      },
    },
  ],
});
