'use strict';

// 上海数学七年级上册 · 13.2 分式的运算
// 知识范围：分式的乘除（分子乘分子、分母乘分母；除以一个分式等于乘它的倒数）；同分母、异分母分式的加减（通分、公分母）；
//   混合运算与化简求值；整数指数幂 a^(−n)=1/a^n（a≠0），幂的运算性质推广到整数指数
// 可以使用：13.1；第 12 章因式分解；第 11 章；第 10 章；六年级上下册全部内容（含方程与方程组、整除）
// 还没学：分式方程（13.3，不出“解分式方程”，求值题里的条件可以变形但不用“去分母、验根”的说法）；
//   科学记数法（八年级上册）；不等式（七年级下册）；开平方
// 本节约定：除法默认除式不为 0；分式结果用 frac 判分类型（约到最简），含负整数指数的结果要求写成只含正整数指数的形式

// verify 用：在若干个点上比较原式 f 和结果 g 的值，全部相等就返回结果
const same132 = (f, g, ans, pts = [F(4), F(6), F('-13/2'), F('1/3'), F('9/2')]) =>
  (pts.every(x => f(x).eq(g(x))) ? ans : null);

Content.section({
  id: 'math/sh2024/g7s1/13.2',
  title: '分式的运算',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮 e02（x+x⁻¹ 平方，2 级）太易且与 c01 重叠、扩展档缺 5 级，c01（取倒数）只有 4 级，c02 第 (1) 问直接给出配对方法，c03（往返平均速度）是常见题，卡片易错提醒与 b06 同数据；第 2 轮 e02 改化简后求整数值（原式定义域排除）、c01 加 x³/(x⁶+x³+1)、c02 去提示改两种配对（含负指数）、c03 改两人一半时间与一半路程比较并分类后判定整节通过。可选意见：c04 只有 4～5 级' },

  intro: [
    {
      title: '分式的乘除',
      body: '和分数一样：分子乘分子作分子，分母乘分母作分母；除以一个分式，等于乘它的倒数。分子、分母是多项式时，**先因式分解**，能约的先约掉，最后化成最简分式。',
      example: '$\\frac{3a}{4b}\\cdot\\frac{2b^{2}}{9a^{2}}=\\frac{6ab^{2}}{36a^{2}b}=\\frac{b}{6a}$。',
    },
    {
      title: '同分母分式加减',
      body: '分母不变，分子相加减。分子是多项式时，减号后面的分子要加括号；结果能约分的要约分。',
      example: '$\\frac{x}{x-3}-\\frac{3}{x-3}=\\frac{x-3}{x-3}=1$。',
      pitfall: '分母互为相反数（如 $m-5$ 与 $5-m$）时，先把其中一个变号，化成同分母。',
    },
    {
      title: '异分母分式加减',
      body: '先**通分**：取各分母所有因式的最高次幂的积作公分母（分母是多项式先因式分解），把每个分式化成以它为分母的分式，再按同分母加减。',
      example: '$\\frac{1}{2a}+\\frac{1}{3a}=\\frac{3}{6a}+\\frac{2}{6a}=\\frac{5}{6a}$。',
    },
    {
      title: '整数指数幂',
      body: '为了让 $a^{m}\\div a^{n}=a^{m-n}$ 在 $m<n$ 时也成立，规定 $a^{-n}=\\frac{1}{a^{n}}$（$a\\ne0$，$n$ 是正整数）。这样指数可以是任意整数，同底数幂的乘法、幂的乘方、积的乘方仍然成立。',
      example: '$10^{-2}=\\frac{1}{100}$；$x^{-1}y^{2}=\\frac{y^{2}}{x}$。',
      pitfall: '负指数不表示负数：$a^{-n}$ 是 $a^{n}$ 的倒数，不是相反数。',
    },
    {
      title: '混合运算和化简求值',
      body: '先乘方，再乘除，最后加减；有括号先算括号里的。化简求值时，代入的数要使原式里**每一个**分母、除式都不为 $0$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '13.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列计算正确的是（　　）',
      options: ['$2^{-3}=-8$', '$a^{6}\\div a^{-2}=a^{3}$', '$(a^{-2})^{3}=a^{-6}$', '$(2x)^{-1}=\\frac{2}{x}$'],
      answer: 2,
      explain: [
        'A：$2^{-3}=\\frac{1}{2^{3}}=\\frac18$，负指数是倒数，不是负数。',
        'B：$a^{6}\\div a^{-2}=a^{6-(-2)}=a^{8}$，指数相减，不是相除。',
        'C：幂的乘方，指数相乘：$(a^{-2})^{3}=a^{-6}$，正确。',
        'D：$(2x)^{-1}=\\frac{1}{2x}$，$2$ 也要取倒数。选 C。',
      ],
      verify: () => {
        const sides = [
          [() => F(2).pow(-3), () => F(-8)],
          [a => a.pow(6).div(a.pow(-2)), a => a.pow(3)],
          [a => a.pow(-2).pow(3), a => a.pow(-6)],
          [x => x.mul(2).pow(-1), x => F(2).div(x)],
        ];
        return sides.findIndex(([l, r]) => [F(2), F(-3), F('1/2')].every(v => l(v).eq(r(v))));
      },
    },
    {
      id: '13.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\left(-\\frac{1}{2}\\right)^{-2}+(\\pi-3)^{0}-2^{-1}$。',
      blanks: [
        { kind: 'num', label: '结果是', answer: '9/2' },
      ],
      explain: [
        '$\\left(-\\frac12\\right)^{-2}=\\frac{1}{\\left(-\\frac12\\right)^{2}}=\\frac{1}{\\frac14}=4$，偶次方是正的。',
        '$(\\pi-3)^{0}=1$（$\\pi-3\\ne0$）；$2^{-1}=\\frac12$。',
        '原式 $=4+1-\\frac12=\\frac92$。常见错误：把 $\\left(-\\frac12\\right)^{-2}$ 算成 $-4$ 或 $\\frac14$。',
      ],
      verify: () => F('-1/2').pow(-2).add(1).sub(F(2).pow(-1)),
    },
    {
      id: '13.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '计算 $(2a^{-2}b)^{-2}\\cdot(ab^{-1})^{3}$，结果写成只含正整数指数的形式。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: 'a^7/(4b^5)' },
      ],
      explain: [
        '积的乘方：$(2a^{-2}b)^{-2}=2^{-2}\\cdot a^{4}\\cdot b^{-2}$，$(ab^{-1})^{3}=a^{3}b^{-3}$。',
        '相乘：$2^{-2}a^{4+3}b^{-2-3}=\\frac14a^{7}b^{-5}$。',
        '化成正整数指数：$\\frac{a^{7}}{4b^{5}}$。常见错误：$2^{-2}$ 写成 $-4$，或者 $a^{-2}$ 的 $-2$ 次方算成 $a^{-4}$。',
      ],
      verify: () => same132(a => F(2).mul(a.pow(-2)).mul(F(3)).pow(-2).mul(a.mul(F(3).pow(-1)).pow(3)), a => a.pow(7).div(F(3).pow(5).mul(4)), 'a^7/(4b^5)'),
    },
    {
      id: '13.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{x^{2}-9}{x+2}\\cdot\\frac{3x+6}{3-x}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '-3x-9' },
      ],
      explain: [
        '先因式分解：$x^{2}-9=(x+3)(x-3)$，$3x+6=3(x+2)$，$3-x=-(x-3)$。',
        '原式 $=\\frac{(x+3)(x-3)\\cdot3(x+2)}{(x+2)\\cdot[-(x-3)]}=-3(x+3)=-3x-9$。',
        '常见错误：没发现 $3-x$ 与 $x-3$ 互为相反数，约不掉；或者约掉以后丢了负号。',
      ],
      verify: () => same132(x => x.pow(2).sub(9).div(x.add(2)).mul(x.mul(3).add(6).div(F(3).sub(x))), x => x.mul(-3).sub(9), '-3x-9'),
    },
    {
      id: '13.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{a^{2}-1}{a^{2}+2a}\\div\\frac{a-1}{a}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '(a+1)/(a+2)' },
      ],
      explain: [
        '除以一个分式，等于乘它的倒数：$\\frac{a^{2}-1}{a^{2}+2a}\\cdot\\frac{a}{a-1}$。',
        '因式分解后约分：$\\frac{(a+1)(a-1)}{a(a+2)}\\cdot\\frac{a}{a-1}=\\frac{a+1}{a+2}$。',
        '常见错误：没把除式颠倒就直接相乘。',
      ],
      verify: () => same132(a => a.pow(2).sub(1).div(a.pow(2).add(a.mul(2))).div(a.sub(1).div(a)), a => a.add(1).div(a.add(2)), '(a+1)/(a+2)'),
    },
    {
      id: '13.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{x^{2}}{x-2}+\\frac{4}{2-x}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: 'x+2' },
      ],
      explain: [
        '分母 $2-x=-(x-2)$，先化成同分母：$\\frac{4}{2-x}=-\\frac{4}{x-2}$。',
        '原式 $=\\frac{x^{2}-4}{x-2}=\\frac{(x+2)(x-2)}{x-2}=x+2$。',
        '常见错误：直接把分子相加得 $\\frac{x^{2}+4}{x-2}$。',
      ],
      verify: () => same132(x => x.pow(2).div(x.sub(2)).add(F(4).div(F(2).sub(x))), x => x.add(2), 'x+2'),
    },
    {
      id: '13.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{1}{x-1}-\\frac{2}{x^{2}-1}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '1/(x+1)' },
      ],
      explain: [
        '$x^{2}-1=(x+1)(x-1)$，公分母取 $(x+1)(x-1)$：$\\frac{1}{x-1}=\\frac{x+1}{(x+1)(x-1)}$。',
        '原式 $=\\frac{x+1-2}{(x+1)(x-1)}=\\frac{x-1}{(x+1)(x-1)}=\\frac{1}{x+1}$。',
        '常见错误：通分后忘了约分，停在 $\\frac{x-1}{x^{2}-1}$。',
      ],
      verify: () => same132(x => F(1).div(x.sub(1)).sub(F(2).div(x.pow(2).sub(1))), x => F(1).div(x.add(1)), '1/(x+1)'),
    },
    {
      id: '13.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '计算：$a-1-\\frac{a^{2}}{a+1}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '-1/(a+1)' },
      ],
      explain: [
        '把整式 $a-1$ 看成一个整体，分母是 $1$，通分：$a-1=\\frac{(a-1)(a+1)}{a+1}=\\frac{a^{2}-1}{a+1}$。',
        '原式 $=\\frac{a^{2}-1-a^{2}}{a+1}=-\\frac{1}{a+1}$。',
        '常见错误：只给 $a$ 通分、把 $-1$ 留在外面，或者写成 $\\frac{a-1-a^{2}}{a+1}$。',
      ],
      verify: () => same132(a => a.sub(1).sub(a.pow(2).div(a.add(1))), a => F(-1).div(a.add(1)), '-1/(a+1)'),
    },
    {
      id: '13.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '先化简，再求值：$\\left(1-\\frac{1}{x+1}\\right)\\div\\frac{x}{x^{2}-1}$，其中 $x=3$。',
      blanks: [
        { kind: 'expr', label: '(1) 化简结果是', answer: 'x-1', simplified: true },
        { kind: 'num', label: '(2) 求值结果是', answer: '2' },
      ],
      explain: [
        '括号里：$1-\\frac{1}{x+1}=\\frac{x+1-1}{x+1}=\\frac{x}{x+1}$。',
        '再除：$\\frac{x}{x+1}\\cdot\\frac{x^{2}-1}{x}=\\frac{x}{x+1}\\cdot\\frac{(x+1)(x-1)}{x}=x-1$。',
        '$x=3$ 时，原式里各分母、除式都不为 $0$，值是 $2$。常见错误：括号里写成 $\\frac{1}{x+1}$ 或 $\\frac{x+2}{x+1}$。',
      ],
      verify: () => {
        const f = x => F(1).sub(F(1).div(x.add(1))).div(x.div(x.pow(2).sub(1)));
        return [same132(f, x => x.sub(1), 'x-1'), f(F(3))];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '13.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\frac{1}{a}-\\frac{1}{b}=3$，求 $\\frac{2a+3ab-2b}{a-ab-b}$ 的值。',
      blanks: [
        { kind: 'num', label: '值是', answer: '3/4' },
      ],
      explain: [
        '条件通分：$\\frac1a-\\frac1b=\\frac{b-a}{ab}=3$，所以 $b-a=3ab$，即 $a-b=-3ab$。',
        '把所求式里的 $a-b$ 整体换掉：分子 $=2(a-b)+3ab=-6ab+3ab=-3ab$，分母 $=(a-b)-ab=-4ab$。',
        '$ab\\ne0$，所以值是 $\\frac{-3ab}{-4ab}=\\frac34$。',
        '常见错误：$a-b$ 的符号弄反，得 $b-a=-3ab$。',
      ],
      verify: () => {
        const vals = [1, 2, -1].map(a => {
          const A = F(a);
          const B = A.div(F(1).sub(A.mul(3)));  // b − a = 3ab → b = a/(1−3a)
          return A.mul(2).add(A.mul(B).mul(3)).sub(B.mul(2)).div(A.sub(A.mul(B)).sub(B));
        });
        return vals.every(v => v.eq(vals[0])) ? vals[0] : null;
      },
    },
    {
      id: '13.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '(1) 化简 $\\frac{x+2}{x-1}-\\frac{x^{2}+x}{x^{2}-1}$；(2) $x$ 是整数，且原式的值也是整数，求 $x$ 的所有可能值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'frac', label: '(1)', answer: '2/(x-1)' },
        { kind: 'nums', label: '(2) $x=$', answer: ['0', '2', '3'] },
      ],
      explain: [
        '(1) 第二个分式先约分：$\\frac{x(x+1)}{(x+1)(x-1)}=\\frac{x}{x-1}$。',
        '原式 $=\\frac{x+2}{x-1}-\\frac{x}{x-1}=\\frac{2}{x-1}$。',
        '(2) $\\frac{2}{x-1}$ 是整数，$x-1$ 是 $2$ 的约数：$x-1=\\pm1$ 或 $\\pm2$，$x=2,0,3,-1$。',
        '关键：要看**原式**有没有意义。原式分母 $x^{2}-1\\ne0$，$x\\ne\\pm1$，所以 $x=-1$ 要舍去（虽然化简后 $\\frac{2}{x-1}=-1$ 是整数）。',
        '所以 $x=0,2,3$。常见错误：只看化简后的分母 $x-1$，把 $x=-1$ 也算上。',
      ],
      verify: () => {
        const f = x => x.add(2).div(x.sub(1)).sub(x.pow(2).add(x).div(x.pow(2).sub(1)));
        const xs = [];
        for (let x = -30; x <= 30; x++) {
          if (x === 1 || x === -1) continue;
          if (f(F(x)).d === 1n) xs.push(x);
        }
        return [same132(f, x => F(2).div(x.sub(1)), '2/(x-1)'), xs];
      },
    },
    {
      id: '13.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\frac{1}{x(x+1)}+\\frac{1}{(x+1)(x+2)}+\\frac{1}{(x+2)(x+3)}+\\cdots+\\frac{1}{(x+9)(x+10)}$。',
      blanks: [
        { kind: 'frac', label: '结果是', answer: '10/(x^2+10x)' },
      ],
      explain: [
        '十个分母各不相同，直接通分太繁。先看一项：$\\frac1n-\\frac{1}{n+1}=\\frac{n+1-n}{n(n+1)}=\\frac{1}{n(n+1)}$。',
        '所以每一项都能拆成两个分式的差：$\\frac{1}{x(x+1)}=\\frac1x-\\frac{1}{x+1}$，$\\frac{1}{(x+1)(x+2)}=\\frac{1}{x+1}-\\frac{1}{x+2}$，……',
        '相加时中间全部抵消，只剩 $\\frac1x-\\frac{1}{x+10}=\\frac{x+10-x}{x(x+10)}=\\frac{10}{x(x+10)}$。',
        '常见错误：最后一项拆成 $\\frac{1}{x+9}-\\frac{1}{x+10}$ 后，首尾数错，得 $\\frac{9}{x(x+9)}$。',
      ],
      verify: () => same132(x => {
        let s = F(0);
        for (let k = 0; k <= 9; k++) s = s.add(F(1).div(x.add(k).mul(x.add(k + 1))));
        return s;
      }, x => F(10).div(x.mul(x.add(10))), '10/(x^2+10x)'),
    },
    {
      id: '13.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '化简 $\\frac{x^{2}-4x+4}{x^{2}-4}\\div\\frac{x-2}{x^{2}+2x}+\\frac{3}{x-2}$，再从 $-2$、$0$、$2$、$3$ 中选一个合适的数代入求值。(1) 化简结果；(2) 代入后的值。',
      blanks: [
        { kind: 'frac', label: '(1)', answer: '(x^2-2x+3)/(x-2)' },
        { kind: 'num', label: '(2) 值是', answer: '6' },
      ],
      explain: [
        '除法部分：$\\frac{(x-2)^{2}}{(x+2)(x-2)}\\cdot\\frac{x(x+2)}{x-2}=x$。',
        '再加：$x+\\frac{3}{x-2}=\\frac{x(x-2)+3}{x-2}=\\frac{x^{2}-2x+3}{x-2}$。',
        '选数：原式要求 $x^{2}-4\\ne0$、$x^{2}+2x\\ne0$、$x-2\\ne0$，还要除式 $\\frac{x-2}{x^{2}+2x}\\ne0$，所以 $x\\ne\\pm2$、$x\\ne0$，只能选 $3$。',
        '$x=3$ 时值为 $\\frac{9-6+3}{1}=6$。常见错误：选 $0$，没注意 $x^{2}+2x$ 在分母里。',
      ],
      verify: () => {
        const f = x => x.pow(2).sub(x.mul(4)).add(4).div(x.pow(2).sub(4)).div(x.sub(2).div(x.pow(2).add(x.mul(2)))).add(F(3).div(x.sub(2)));
        const ok = [-2, 0, 2, 3].filter(x => {
          const X = F(x);
          return ![X.pow(2).sub(4), X.pow(2).add(X.mul(2)), X.sub(2)].some(d => d.isZero());
        });
        return [same132(f, x => x.pow(2).sub(x.mul(2)).add(3).div(x.sub(2)), '(x^2-2x+3)/(x-2)'), ok.length === 1 ? f(F(ok[0])) : null];
      },
    },
    {
      id: '13.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\frac{3x-4}{(x-1)(x-2)}=\\frac{A}{x-1}+\\frac{B}{x-2}$ 对使分母不为 $0$ 的所有 $x$ 都成立，求 $A$、$B$。',
      blanks: [
        { kind: 'num', label: '$A=$', answer: '1' },
        { kind: 'num', label: '$B=$', answer: '2' },
      ],
      explain: [
        '右边通分：$\\frac{A(x-2)+B(x-1)}{(x-1)(x-2)}=\\frac{(A+B)x-(2A+B)}{(x-1)(x-2)}$。',
        '分母相同，分子要对所有 $x$ 都相等：$(A+B)x-(2A+B)=3x-4$，所以 $A+B=3$，$2A+B=4$。',
        '解得 $A=1$，$B=2$。验证：$\\frac{1}{x-1}+\\frac{2}{x-2}=\\frac{x-2+2x-2}{(x-1)(x-2)}=\\frac{3x-4}{(x-1)(x-2)}$。',
        '常见错误：常数项符号弄错，得 $2A+B=-4$。',
      ],
      verify: () => {
        for (let A = -10; A <= 10; A++) {
          for (let B = -10; B <= 10; B++) {
            const ok = [F(3), F(5), F(-1), F('1/2')].every(x => x.mul(3).sub(4).div(x.sub(1).mul(x.sub(2))).eq(F(A).div(x.sub(1)).add(F(B).div(x.sub(2)))));
            if (ok) return [A, B];
          }
        }
        return null;
      },
    },
    {
      id: '13.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $abc=1$，求 $\\frac{a}{ab+a+1}+\\frac{b}{bc+b+1}+\\frac{c}{ca+c+1}$ 的值。',
      blanks: [
        { kind: 'num', label: '值是', answer: '1' },
      ],
      explain: [
        '三个分母各不相同，直接通分很繁。思路：用 $abc=1$ 把后两个分式化成和第一个**同分母**。',
        '第二个分式分子、分母同乘 $a$：$\\frac{ab}{abc+ab+a}=\\frac{ab}{1+ab+a}$。',
        '第三个分式分子、分母同乘 $ab$：$\\frac{abc}{a^{2}bc+abc+ab}=\\frac{1}{a\\cdot1+1+ab}=\\frac{1}{ab+a+1}$（$a^{2}bc=a\\cdot abc=a$）。',
        '三个分母都是 $ab+a+1$，相加：$\\frac{a+ab+1}{ab+a+1}=1$。',
        '常见错误：第三个分式只乘 $a$ 或只乘 $b$，分母化不成一样。',
      ],
      verify: () => {
        const vals = [[2, 3], [F('1/2'), 5], [-1, 4]].map(([a, b]) => {
          const A = F(a);
          const B = F(b);
          const C = F(1).div(A.mul(B));
          return A.div(A.mul(B).add(A).add(1)).add(B.div(B.mul(C).add(B).add(1))).add(C.div(C.mul(A).add(C).add(1)));
        });
        return vals.every(v => v.eq(vals[0])) ? vals[0] : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '13.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $\\frac{x}{x^{2}-x+1}=\\frac{1}{5}$。求：(1) $\\frac{x^{2}}{x^{4}+x^{2}+1}$；(2) $\\frac{x^{3}}{x^{6}+x^{3}+1}$。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '1/35' },
        { kind: 'num', label: '(2)', answer: '1/199' },
      ],
      explain: [
        '思路：直接求 $x$ 求不出来。$x\\ne0$，把条件两边**取倒数**：$\\frac{x^{2}-x+1}{x}=5$，即 $x-1+\\frac1x=5$，所以 $x+x^{-1}=6$。',
        '(1) 所求式也取倒数：$\\frac{x^{4}+x^{2}+1}{x^{2}}=x^{2}+1+x^{-2}$。由 $(x+x^{-1})^{2}=x^{2}+2+x^{-2}=36$，得 $x^{2}+x^{-2}=34$，倒数式 $=35$，原式 $=\\frac{1}{35}$。',
        '(2) 同样取倒数：$\\frac{x^{6}+x^{3}+1}{x^{3}}=x^{3}+1+x^{-3}$，关键是求 $x^{3}+x^{-3}$。',
        '用乘法：$(x+x^{-1})(x^{2}+x^{-2})=x^{3}+x^{-1}+x+x^{-3}$，所以 $x^{3}+x^{-3}=(x+x^{-1})(x^{2}+x^{-2})-(x+x^{-1})=6\\times34-6=198$。',
        '倒数式 $=199$，原式 $=\\frac{1}{199}$。',
        '易错：(2) 以为 $x^{3}+x^{-3}=6^{3}=216$；或者取倒数后把 $\\frac{x^{2}-x+1}{x}$ 拆成 $x-x+\\frac1x$。',
      ],
      verify: () => {
        // 条件化为 x² = 6x − 1；把 x^n 写成 p·x + q 递推
        const condOk = Poly.of('5x').eq(Poly.of('x^2-x+1').sub(Poly.of('x^2-6x+1')));
        const pw = [[0, 1], [1, 0]];
        for (let n = 2; n <= 6; n++) {
          const [p, q] = pw[n - 1];
          pw.push([6 * p + q, -p]);
        }
        const lin = idx => idx.reduce(([a, b], n) => [a + pw[n][0], b + pw[n][1]], [0, 0]);
        const ratio = (num, den) => {
          const [a, b] = lin(num);
          const [c, d] = lin(den);
          // 分母 = k·分子（都是 px+q 的形式）
          return a !== 0 && F(c).div(a).eq(F(d).div(b)) ? F(a).div(c) : null;
        };
        return condOk ? [ratio([2], [4, 2, 0]), ratio([3], [6, 3, 0])] : null;
      },
    },
    {
      id: '13.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '(1) $f(x)=\\frac{1}{1+x}$，求 $f(2^{-2025})+f(2^{-2024})+\\cdots+f(2^{-1})+f(2^{0})+f(2^{1})+\\cdots+f(2^{2025})$；(2) $g(x)=\\frac{4^{x}}{4^{x}+2}$（$x$ 是整数），求 $g(-2024)+g(-2023)+\\cdots+g(0)+g(1)+\\cdots+g(2025)$。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '4051/2' },
        { kind: 'num', label: '(2)', answer: '2025' },
      ],
      explain: [
        '思路：项数很多、每项都不好算，找“两两配对和为定值”。',
        '(1) 看 $f(t)$ 与 $f\\left(\\frac1t\\right)$：$f\\left(\\frac1t\\right)=\\frac{1}{1+\\frac1t}=\\frac{t}{t+1}$（分子分母同乘 $t$），所以 $f(t)+f\\left(\\frac1t\\right)=\\frac{1+t}{1+t}=1$。',
        '$2^{-k}=\\frac{1}{2^{k}}$，所以 $f(2^{k})$ 与 $f(2^{-k})$ 配对，$k=1,\\ldots,2025$ 共 $2025$ 对；单独的 $f(2^{0})=f(1)=\\frac12$。和 $=2025+\\frac12=\\frac{4051}{2}$。',
        '(2) 这次换一种配对：看 $g(x)$ 与 $g(1-x)$。$g(1-x)=\\frac{4^{1-x}}{4^{1-x}+2}$，分子分母同乘 $4^{x}$：$=\\frac{4}{4+2\\cdot4^{x}}=\\frac{2}{2+4^{x}}$。',
        '所以 $g(x)+g(1-x)=\\frac{4^{x}+2}{4^{x}+2}=1$。$-2024$ 与 $2025$、$-2023$ 与 $2024$、……、$0$ 与 $1$ 配对，从 $-2024$ 到 $2025$ 共 $4050$ 项、$2025$ 对，和为 $2025$。',
        '易错：(1) 把 $f(1)$ 也算成一对；(2) 照搬 (1) 用 $x$ 与 $-x$ 配对，那样和不是定值。',
      ],
      verify: () => {
        const f = t => F(1).div(F(1).add(t));
        const g = x => F(4).pow(x).div(F(4).pow(x).add(2));
        let okF = true;
        let okG = true;
        for (let k = 1; k <= 12; k++) if (!f(F(2).pow(k)).add(f(F(2).pow(-k))).eq(F(1))) okF = false;
        for (let x = -12; x <= 12; x++) if (!g(x).add(g(1 - x)).eq(F(1))) okG = false;
        // 项数：(1) 从 −2025 到 2025 共 4051 项，除 k=0 外两两成对；(2) 从 −2024 到 2025 共 4050 项
        return [okF ? F(2025).add(f(F(1))) : null, okG ? F(4050).div(2) : null];
      },
    },
    {
      id: '13.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '甲、乙两人同时从 $A$ 地出发去 $B$ 地，路程为 $s$。甲前一半**时间**的速度是 $a$，后一半时间的速度是 $b$；乙前一半**路程**的速度是 $a$，后一半路程的速度是 $b$（$a$、$b$ 是正数）。(1) 用 $s$、$a$、$b$ 表示甲、乙各用的时间；(2) 化简乙用的时间减去甲用的时间；(3) 谁先到 $B$ 地？（分 $a\\ne b$ 和 $a=b$ 两种情况）',
      blanks: [
        { kind: 'frac', label: '(1) 甲用时', answer: '2s/(a+b)' },
        { kind: 'frac', label: '乙用时', answer: '(a*s+b*s)/(2a*b)' },
        { kind: 'frac', label: '(2) 乙用时 − 甲用时', answer: 's*(a-b)^2/(2a*b*(a+b))' },
        { kind: 'text', label: '(3) $a\\ne b$ 时', answer: '甲先到', options: ['甲先到', '乙先到', '同时到'] },
        { kind: 'text', label: '$a=b$ 时', answer: '同时到', options: ['甲先到', '乙先到', '同时到'] },
      ],
      explain: [
        '(1) 甲：设总时间为 $t$，前后各 $\\frac t2$，路程 $\\frac t2a+\\frac t2b=s$，所以 $t=\\frac{2s}{a+b}$。',
        '乙：前一半路程用时 $\\frac{s}{2a}$，后一半用时 $\\frac{s}{2b}$，共 $\\frac{s}{2a}+\\frac{s}{2b}=\\frac{bs+as}{2ab}=\\frac{s(a+b)}{2ab}$。',
        '(2) $\\frac{s(a+b)}{2ab}-\\frac{2s}{a+b}=\\frac{s(a+b)^{2}-4abs}{2ab(a+b)}=\\frac{s(a^{2}-2ab+b^{2})}{2ab(a+b)}=\\frac{s(a-b)^{2}}{2ab(a+b)}$。',
        '(3) 分母 $2ab(a+b)$ 是正数，$s$ 是正数。$a\\ne b$ 时 $(a-b)^{2}$ 是正数，差是正数，乙用时多，甲先到；$a=b$ 时差为 $0$，同时到。',
        '直观理解：甲用快的速度走的**时间**和慢的一样长，乙用快的速度走的**路程**和慢的一样长，所以乙在慢速上花的时间更多。',
        '易错：把“一半时间”和“一半路程”混为一谈；(3) 不分 $a=b$ 的情况。',
      ],
      verify: () => {
        const pts = [[3, 5, 2], [2, 7, 1], [F('1/2'), 4, 3], [4, 4, 5]];
        const tA = (a, b, s) => F(s).mul(2).div(F(a).add(b));
        const tB = (a, b, s) => F(s).div(F(a).mul(2)).add(F(s).div(F(b).mul(2)));
        const ok = pts.every(([a, b, s]) => tB(a, b, s).sub(tA(a, b, s)).eq(F(s).mul(F(a).sub(b).pow(2)).div(F(a).mul(b).mul(2).mul(F(a).add(b)))));
        const neq = pts.filter(([a, b]) => !F(a).eq(F(b))).every(([a, b, s]) => tB(a, b, s).cmp(tA(a, b, s)) > 0);
        const eq = tB(4, 4, 5).eq(tA(4, 4, 5));
        return [ok ? '2s/(a+b)' : null, ok ? '(a*s+b*s)/(2a*b)' : null, ok ? 's*(a-b)^2/(2a*b*(a+b))' : null, neq ? '甲先到' : null, eq ? '同时到' : null];
      },
    },
    {
      id: '13.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $x+\\frac{1}{y}=1$，$y+\\frac{1}{z}=1$。求 $z+\\frac{1}{x}$ 和 $xyz$ 的值。',
      blanks: [
        { kind: 'num', label: '$z+\\frac1x=$', answer: '1' },
        { kind: 'num', label: '$xyz=$', answer: '-1' },
      ],
      explain: [
        '思路：三个字母、两个条件，求不出具体值，但可以都用 $y$ 表示。',
        '由第一个条件：$x=1-\\frac1y=\\frac{y-1}{y}$，所以 $\\frac1x=\\frac{y}{y-1}$。',
        '由第二个条件：$\\frac1z=1-y$，所以 $z=\\frac{1}{1-y}$（条件中出现 $\\frac1z$、$\\frac1x$，说明 $y\\ne1$）。',
        '$z+\\frac1x=\\frac{1}{1-y}+\\frac{y}{y-1}=\\frac{1}{1-y}-\\frac{y}{1-y}=\\frac{1-y}{1-y}=1$。',
        '$xyz=\\frac{y-1}{y}\\cdot y\\cdot\\frac{1}{1-y}=\\frac{y-1}{1-y}=-1$。',
        '关键：两个结果都和 $y$ 无关。易错：$\\frac{y}{y-1}$ 与 $\\frac{1}{1-y}$ 通分时分母变号出错。',
      ],
      verify: () => {
        const vals = [2, 3, -1, F('1/3')].map(y => {
          const Y = F(y);
          const X = F(1).sub(F(1).div(Y));
          const Z = F(1).div(F(1).sub(Y));
          return [Z.add(F(1).div(X)), X.mul(Y).mul(Z)];
        });
        return vals.every(v => v[0].eq(vals[0][0]) && v[1].eq(vals[0][1])) ? vals[0] : null;
      },
    },
    {
      id: '13.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '正整数 $a$、$b$ 满足 $\\frac1a+\\frac1b=\\frac16$。(1) 有序的正整数对 $(a,b)$ 共有几组？(2) 当 $a\\le b$ 时，$a$ 最大是多少？',
      blanks: [
        { kind: 'num', label: '(1) 组数', answer: '9' },
        { kind: 'num', label: '(2) $a$ 最大是', answer: '12' },
      ],
      explain: [
        '通分：$\\frac{a+b}{ab}=\\frac16$，即 $6(a+b)=ab$，$ab-6a-6b=0$。',
        '两边加 $36$，左边写成积：$ab-6a-6b+36=(a-6)(b-6)=36$。',
        '$\\frac1a<\\frac16$，所以 $a>6$，同理 $b>6$，$a-6$、$b-6$ 都是正整数，是 $36$ 的一对约数。',
        '$36$ 的正约数有 $1,2,3,4,6,9,12,18,36$ 共 $9$ 个，每个约数 $d$ 对应 $a-6=d$、$b-6=\\frac{36}{d}$，所以有序对共 $9$ 组。',
        '(2) $a\\le b$ 时 $a-6\\le b-6$，$a-6$ 最大取 $6$（$6\\times6=36$），$a=12$，此时 $b=12$。',
        '易错：漏掉 $a=b$ 的情况，或者没说明 $a>6$ 就去试负约数。',
      ],
      verify: () => {
        let n = 0;
        let best = 0;
        for (let a = 1; a <= 100; a++) {
          for (let b = 1; b <= 100; b++) {
            if (F(1).div(a).add(F(1).div(b)).eq(F('1/6'))) {
              n++;
              if (a <= b) best = Math.max(best, a);
            }
          }
        }
        return [n, best];
      },
    },
  ],
});
