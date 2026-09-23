'use strict';

// 上海数学七年级上册 · 10.3 整式的加法和减法
// 知识范围：六年级一次式的去括号方法同样适用于整式；几个整式相加减，有括号的先去括号（多层括号从里往外逐层去），再合并同类项；
//   求两个整式的和、差（把每个整式看成整体加括号）；已知和求另一个整式；A−B+C 型计算；先化简再求值
// 可以使用：10.1、10.2 全部内容；六年级上下册全部内容（含二元、三元一次方程组）
// 还没学：幂的运算法则、单项式乘单项式、单项式乘多项式（第 11 章，所以括号前只能是数，不能是含字母的式子）；乘法公式、因式分解；不等式（七年级下册）；三角形三边关系（七年级下册）
// 本节约定：字母的指数都是正整数；“与 x 无关”指合并后不含 x 的项

// 10.3-c02 的配图：长方形盒底 m×n 里放 3 张 a×b 的卡片（按 a=5、b=2、n=8 画，每单位 20px）
const FIG103 = {
  box: `<svg viewBox="0 0 250 215" xmlns="http://www.w3.org/2000/svg" font-size="14" font-family="sans-serif">
  <rect x="30" y="60" width="100" height="120" fill="#cfe3f7" stroke="none"/>
  <rect x="130" y="20" width="80" height="60" fill="#cfe3f7" stroke="none"/>
  <rect x="30" y="20" width="180" height="160" fill="none" stroke="#333" stroke-width="2"/>
  <rect x="30" y="20" width="100" height="40" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="130" y="80" width="40" height="100" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="170" y="80" width="40" height="100" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <line x1="130" y1="60" x2="130" y2="80" stroke="#333" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="80" y="45" text-anchor="middle">①</text>
  <text x="150" y="135" text-anchor="middle">②</text>
  <text x="190" y="135" text-anchor="middle">③</text>
  <text x="80" y="14" text-anchor="middle" font-style="italic">a</text>
  <text x="120" y="45" text-anchor="middle" font-style="italic">b</text>
  <text x="120" y="200" text-anchor="middle" font-style="italic">m</text>
  <text x="14" y="104" text-anchor="middle" font-style="italic">n</text>
  <text x="80" y="125" text-anchor="middle" fill="#2b5d8a">阴影 1</text>
  <text x="170" y="55" text-anchor="middle" fill="#2b5d8a">阴影 2</text>
</svg>`,
};

Content.section({
  id: 'math/sh2024/g7s1/10.3',
  title: '整式的加法和减法',
  review: { status: 'pending' },
  audit: { blind: '2026-09-23', rounds: 3, note: '子代理盲解复核三轮，答案三轮全部一致。第 1 轮打回：c02（盒底卡片）是区级常规题且 (5) 选项被 (4) 暗示；c04（两两之和）是熟模板；c05 递推周期与 e07 同模板、与 AIME 1985 第 5 题同型；e06 只有基础档；“系数为 0 求参数”重复 4 次。第 2 轮 c05 换成“二次整式五个值中有一个算错”（相邻差 + 逐个排除），e07 去掉递推只留嵌套括号符号规律，c02 推广到 p、q 张并加入阴影退化，e06 加入含参比较，c04 改为两差一和。第 3 轮 c04 再改为 m、k 两个参数的整除约束 + 一次项系数恰一个为 0 的计数，c02(4) 改为组合条件，c05(2) 减弱提示，判定整节通过。c02、c04 复核认为在挑战档下限' },

  intro: [
    {
      title: '去括号',
      body: '六年级学过的去括号方法，对整式同样适用：括号前是“$+$”号，去掉括号，里面各项都不变号；括号前是“$-$”号，去掉括号，里面**各项都变号**。括号前有数时，这个数要乘遍括号里的每一项。',
      example: '$-(2y^{2}-y+4)=-2y^{2}+y-4$；$-3(p-2)=-3p+6$。',
      pitfall: '括号前是“$-$”号时，括号里的每一项都要变号，最后一项最容易忘。',
    },
    {
      title: '多层括号',
      body: '有小括号、中括号、大括号时，一般从里往外一层一层去；每去一层，都看这一层括号前面的符号和数。每去掉一层，能合并的同类项先合并，式子会越来越短。',
      example: '$a-[2a-(a-b)]=a-[2a-a+b]=a-(a+b)=-b$。',
    },
    {
      title: '整式的加减',
      body: '几个整式相加减，先把每个整式看成一个整体**加上括号**，再去括号、合并同类项。已知两个整式的和与其中一个，求另一个，就用和减去已知的那一个。',
      example: '求 $2m-n$ 与 $m+n$ 的差：$(2m-n)-(m+n)=2m-n-m-n=m-2n$。',
      pitfall: '不加括号会写成 $2m-n-m+n$，后一个整式只有第一项变了号。',
    },
    {
      title: '先化简，再求值',
      body: '求整式的值时，先去括号、合并同类项，把式子化到最简，再代入数值。代入负数时要加括号。',
      example: '$3(a^{2}-a)-2(a^{2}-2a)=3a^{2}-3a-2a^{2}+4a=a^{2}+a$。当 $a=-2$ 时，值是 $(-2)^{2}+(-2)=2$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '10.3-b01',
      level: 'basic',
      type: 'fill',
      stem: '化简：$3x^{2}-\\left[5x-\\left(\\frac{1}{2}x-3\\right)+2x^{2}\\right]$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: 'x^2-9/2*x-3', simplified: true },
      ],
      explain: [
        '先去小括号：括号前是“$-$”，$\\frac12x$ 和 $-3$ 都变号，中括号里变成 $5x-\\frac12x+3+2x^{2}$。',
        '中括号里先合并：$\\frac92x+3+2x^{2}$。',
        '再去中括号：括号前是“$-$”，三项都变号：$3x^{2}-\\frac92x-3-2x^{2}$。',
        '合并得 $x^{2}-\\frac92x-3$。常见错误是去中括号时只给 $\\frac92x$ 变号，漏掉后面的 $3$ 和 $2x^{2}$。',
      ],
      verify: () => String(Poly.of('3x^2-(5x-(1/2*x-3)+2x^2)')),
    },
    {
      id: '10.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '已知 $A=2a^{2}-3ab+b^{2}$，$B=a^{2}-ab-2b^{2}$。',
      blanks: [
        { kind: 'expr', label: '(1) $A-2B=$', answer: '-a*b+5b^2', simplified: true },
        { kind: 'num', label: '(2) 当 $a=-1$，$b=2$ 时，$A-2B$ 的值是', answer: '22' },
      ],
      explain: [
        '(1) 把 $B$ 看成整体加括号：$A-2B=(2a^{2}-3ab+b^{2})-2(a^{2}-ab-2b^{2})$。',
        '去括号时，$-2$ 要乘遍 $B$ 的每一项：$-2\\times a^{2}=-2a^{2}$，$-2\\times(-ab)=2ab$，$-2\\times(-2b^{2})=4b^{2}$。',
        '原式 $=2a^{2}-3ab+b^{2}-2a^{2}+2ab+4b^{2}=-ab+5b^{2}$。',
        '(2) $-ab=-(-1)\\times2=2$，$5b^{2}=5\\times4=20$，值是 $22$。',
      ],
      verify: () => {
        const r = Poly.of('2a^2-3a*b+b^2').sub(Poly.of('a^2-a*b-2b^2').scale(2));
        return [String(r), r.at({ a: -1, b: 2 })];
      },
    },
    {
      id: '10.3-b03',
      level: 'basic',
      type: 'choice',
      stem: '一个整式加上 $3x^{2}-2x+1$，得到 $x^{2}+4x-5$。这个整式是（　　）',
      options: ['$-2x^{2}+6x-6$', '$4x^{2}+2x-4$', '$-2x^{2}+2x-4$', '$2x^{2}-6x+6$'],
      answer: 0,
      explain: [
        '所求整式 $=$ 和 $-$ 已知的加数：$(x^{2}+4x-5)-(3x^{2}-2x+1)$。',
        '去括号，后一个括号前是“$-$”，三项都变号：$x^{2}+4x-5-3x^{2}+2x-1=-2x^{2}+6x-6$，选 A。',
        'B 是把两个整式加了起来；C 是只给 $3x^{2}$ 变了号，后两项没变号；D 是减反了，用 $3x^{2}-2x+1$ 去减 $x^{2}+4x-5$。',
      ],
      verify: () => {
        const r = Poly.of('x^2+4x-5').sub(Poly.of('3x^2-2x+1'));
        return ['-2x^2+6x-6', '4x^2+2x-4', '-2x^2+2x-4', '2x^2-6x+6'].findIndex(o => Poly.of(o).eq(r));
      },
    },
    {
      id: '10.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '已知 $\\lvert a+2\\rvert+\\left(b-\\frac{1}{3}\\right)^{2}=0$，先化简，再求值：$5ab^{2}-\\left[2a^{2}b-(4ab^{2}-2a^{2}b)\\right]+4a^{2}b$。',
      blanks: [
        { kind: 'expr', label: '(1) 化简结果是', answer: '9a*b^2', simplified: true },
        { kind: 'num', label: '(2) 求值结果是', answer: '-2' },
      ],
      explain: [
        '(1) 先去小括号：$2a^{2}b-4ab^{2}+2a^{2}b=4a^{2}b-4ab^{2}$。',
        '再去中括号（前面是“$-$”）：$5ab^{2}-4a^{2}b+4ab^{2}+4a^{2}b$。',
        '合并：$a^{2}b$ 的系数 $-4+4=0$，$ab^{2}$ 的系数 $5+4=9$，结果是 $9ab^{2}$。',
        '(2) 绝对值和平方都不是负数，和为 0 只能各自为 0：$a=-2$，$b=\\frac13$。',
        '$9ab^{2}=9\\times(-2)\\times\\frac19=-2$。',
      ],
      verify: () => {
        const r = Poly.of('5a*b^2-(2a^2*b-(4a*b^2-2a^2*b))+4a^2*b');
        return [String(r), r.at({ a: -2, b: F('1/3') })];
      },
    },
    {
      id: '10.3-b05',
      level: 'basic',
      type: 'multi',
      stem: '$A$ 是一个五次整式，$B$ 是一个四次整式，$C$ 也是一个五次整式。下列说法正确的有（　　）',
      options: [
        '$A+B$ 一定是五次整式',
        '$A-B$ 一定是五次整式',
        '$A+B$ 的项数一定等于 $A$、$B$ 的项数之和',
        '$A+C$ 一定是五次整式',
        '$A+C$ 可能是三次整式',
      ],
      answer: [0, 1, 4],
      explain: [
        'A、B 对：$B$ 中没有五次项，$A$ 的五次项不会被抵消，所以 $A\\pm B$ 的五次项还在，一定是五次整式。',
        'C 错：$A$、$B$ 里可能有同类项要合并，例如 $A=x^{5}+x$，$B=x^{4}-x$，$A+B=x^{5}+x^{4}$，只有 2 项。',
        'D 错、E 对：$A$、$C$ 的五次项可能互相抵消，例如 $A=x^{5}+x^{3}$，$C=-x^{5}+1$，$A+C=x^{3}+1$，是三次整式。所以选 A、B、E。',
      ],
      verify: () => {
        const A1 = Poly.of('x^5+x'), B1 = Poly.of('x^4-x');
        const A2 = Poly.of('x^5+x^3'), C2 = Poly.of('-x^5+1');
        const ok = [
          A1.add(B1).deg() === 5 && A2.add(B1).deg() === 5,
          A1.sub(B1).deg() === 5 && A2.sub(B1).deg() === 5,
          A1.add(B1).size() === A1.size() + B1.size(),
          A2.add(C2).deg() === 5,
          A2.add(C2).deg() === 3,
        ];
        return ok.map((v, i) => (v ? i : -1)).filter(i => i >= 0);
      },
    },

    // ---------- 扩展 ----------
    {
      id: '10.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $B=x^{2}-xy+y^{2}$。小明计算 $A-2B$ 时，把“$-2B$”错看成“$+2B$”，算得结果是 $x^{2}+3xy-2y^{2}$。',
      blanks: [
        { kind: 'expr', label: '(1) 整式 $A=$', answer: '-x^2+5x*y-4y^2', simplified: true },
        { kind: 'expr', label: '(2) $A-2B$ 的正确结果是', answer: '-3x^2+7x*y-6y^2', simplified: true },
        { kind: 'num', label: '(3) 当 $x=1$，$y=-1$ 时，$A-2B$ 的正确结果的值是', answer: '-16' },
      ],
      explain: [
        '(1) 小明算的是 $A+2B=x^{2}+3xy-2y^{2}$，所以 $A=(x^{2}+3xy-2y^{2})-2(x^{2}-xy+y^{2})$。',
        '去括号：$x^{2}+3xy-2y^{2}-2x^{2}+2xy-2y^{2}=-x^{2}+5xy-4y^{2}$。',
        '(2) $A-2B=(-x^{2}+5xy-4y^{2})-2(x^{2}-xy+y^{2})=-3x^{2}+7xy-6y^{2}$。',
        '也可以不求 $A$：错误结果比正确结果多了 $4B$，所以正确结果 $=(x^{2}+3xy-2y^{2})-4(x^{2}-xy+y^{2})$，结果相同。',
        '(3) $x=1$，$y=-1$：$-3\\times1+7\\times(-1)-6\\times1=-3-7-6=-16$。',
      ],
      verify: () => {
        const B = Poly.of('x^2-x*y+y^2');
        const wrong = Poly.of('x^2+3x*y-2y^2');
        const A = wrong.sub(B.scale(2));
        const right = A.sub(B.scale(2));
        return [String(A), String(right), right.at({ x: 1, y: -1 })];
      },
    },
    {
      id: '10.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '整式 $(2x^{2}+ax-y+6)-(2bx^{2}-3x+5y-1)$ 的值与字母 $x$ 的取值无关。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '-3' },
        { kind: 'num', label: '(2) $b=$', answer: '1' },
        { kind: 'expr', label: '(3) 此时原整式化简的结果是', answer: '-6y+7', simplified: true },
        { kind: 'num', label: '(4) 整式 $3(a^{2}-2ab-b^{2})-(4a^{2}+ab+b^{2})$ 的值是', answer: '8' },
      ],
      explain: [
        '先去括号、合并：$2x^{2}+ax-y+6-2bx^{2}+3x-5y+1=(2-2b)x^{2}+(a+3)x-6y+7$。',
        '与 $x$ 无关，含 $x$ 的项系数都为 0：(1) $a+3=0$，$a=-3$；(2) $2-2b=0$，$b=1$。',
        '(3) 此时只剩 $-6y+7$。',
        '(4) 先化简再代入：$3a^{2}-6ab-3b^{2}-4a^{2}-ab-b^{2}=-a^{2}-7ab-4b^{2}$。',
        '代入 $a=-3$，$b=1$：$-9-7\\times(-3)\\times1-4=-9+21-4=8$。注意 $-a^{2}=-9$，不是 $9$。',
      ],
      verify: () => {
        const vals = [-3, -2, -1, 0, 1, 2, 3];
        let ab = null;
        for (const a of vals) for (const b of vals) {
          const p = Poly.of(`(2x^2+(${a})*x-y+6)-(2*(${b})*x^2-3x+5y-1)`);
          if (p.degIn('x') === 0) ab = { a, b, p };
        }
        const q = Poly.of('3(a^2-2a*b-b^2)-(4a^2+a*b+b^2)');
        return [ab.a, ab.b, String(ab.p), q.at({ a: ab.a, b: ab.b })];
      },
    },
    {
      id: '10.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '已知关于 $x$ 的整式 $A=x^{3}+mx^{2}-2x+1$，$B=2x^{3}-3x^{2}+nx$。',
      blanks: [
        { kind: 'num', label: '(1) 若 $2A-B$ 不含 $x^{2}$ 项和 $x$ 项，则 $m=$', answer: '-3/2' },
        { kind: 'num', label: '(2) 同样的条件下，$n=$', answer: '-4' },
        { kind: 'num', label: '(3) 这时 $2A-B$ 的值是', answer: '2' },
        { kind: 'text', label: '(4) 在 (1)(2) 求出的 $m$、$n$ 下，能不能找到数 $k$，使 $A+kB$ 是二次整式？', answer: '不能', options: ['能', '不能'] },
      ],
      explain: [
        '$2A-B=2x^{3}+2mx^{2}-4x+2-2x^{3}+3x^{2}-nx=(2m+3)x^{2}+(-4-n)x+2$。三次项自动抵消了。',
        '(1) $2m+3=0$，$m=-\\frac32$。(2) $-4-n=0$，$n=-4$。',
        '(3) 这时 $2A-B=2$，是一个常数，无论 $x$ 取什么值都等于 2。',
        '(4) 现在 $A=x^{3}-\\frac32x^{2}-2x+1$，$B=2x^{3}-3x^{2}-4x$。$A+kB=(1+2k)x^{3}+\\left(-\\frac32-3k\\right)x^{2}+(-2-4k)x+1$。',
        '要是二次整式，三次项必须消失：$1+2k=0$，$k=-\\frac12$。但这时二次项系数 $-\\frac32-3\\times\\left(-\\frac12\\right)=0$，二次项也消失了，$A+kB=1$，不是二次整式。',
        '所以找不到这样的 $k$。其实此时 $B$ 恰好等于 $2A-2$，三个系数“成比例”，消掉三次项就会连带消掉二次项和一次项。',
      ],
      verify: () => {
        let mn = null;
        for (const m of ['-2', '-3/2', '-1', '0', '1']) for (const n of [-5, -4, -3, 0]) {
          const r = Poly.of(`2(x^3+(${m})*x^2-2x+1)-(2x^3-3x^2+(${n})*x)`);
          if (r.coef('x^2').isZero() && r.coef('x').isZero()) mn = { m: F(m), n, r };
        }
        const A = Poly.of(`x^3+(${mn.m})*x^2-2x+1`), B = Poly.of(`2x^3-3x^2+(${mn.n})*x`);
        // A+kB 的三次项系数为 0 只有一个 k，检验这个 k 下是不是二次
        const k = F(-1).div(B.coef('x^3')).mul(A.coef('x^3'));
        const s = A.add(B.scale(k));
        return [mn.m, mn.n, mn.r.coef(''), s.deg() === 2 ? '能' : '不能'];
      },
    },
    {
      id: '10.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '对任意两个整式 $A$、$B$，规定一种新运算：$A\\oplus B=2A-B$。',
      blanks: [
        { kind: 'expr', label: '(1) $(x^{2}+1)\\oplus(x-3)=$', answer: '2x^2-x+5', simplified: true },
        { kind: 'expr', label: '(2) 设 $A=x^{2}$，$B=x$，$C=1$，则 $(A\\oplus B)\\oplus C-A\\oplus(B\\oplus C)=$', answer: '2x^2-2', simplified: true },
        { kind: 'expr', label: '(3) 若 $A=x^{2}-3x$，并且对任意整式 $B$ 都有 $(A\\oplus B)\\oplus C=A\\oplus(B\\oplus C)$，则 $C=$', answer: 'x^2-3x', simplified: true },
        { kind: 'expr', label: '(4) 若 $A=x^{2}-3x$，$B=x+1$，整式 $X$ 满足 $A\\oplus X=B\\oplus A$，则 $X=$', answer: '3x^2-11x-2', simplified: true },
      ],
      explain: [
        '(1) $2(x^{2}+1)-(x-3)=2x^{2}+2-x+3=2x^{2}-x+5$。',
        '(2) 先算括号里的：$A\\oplus B=2x^{2}-x$，$(A\\oplus B)\\oplus C=2(2x^{2}-x)-1=4x^{2}-2x-1$；$B\\oplus C=2x-1$，$A\\oplus(B\\oplus C)=2x^{2}-(2x-1)=2x^{2}-2x+1$。差是 $2x^{2}-2$。',
        '这说明新运算不满足结合律，括号位置不同，结果可能不同。',
        '(3) 一般地，$(A\\oplus B)\\oplus C=2(2A-B)-C=4A-2B-C$，$A\\oplus(B\\oplus C)=2A-(2B-C)=2A-2B+C$。',
        '两者之差是 $(4A-2B-C)-(2A-2B+C)=2A-2C$，与 $B$ 无关。相等当且仅当 $A=C$，所以 $C=x^{2}-3x$。',
        '(4) $A\\oplus X=2A-X$，$B\\oplus A=2B-A$。由 $2A-X=2B-A$ 得 $X=3A-2B=3(x^{2}-3x)-2(x+1)=3x^{2}-11x-2$。',
      ],
      verify: () => {
        const op = (a, b) => Poly.lift(a).scale(2).sub(b);
        const A = Poly.of('x^2'), B = Poly.of('x'), C = Poly.of('1');
        const d = op(op(A, B), C).sub(op(A, op(B, C)));
        const A3 = Poly.of('x^2-3x');
        // (3)：差恒为 2A−2C，用两个不同的 B 检验与 B 无关，再解 C
        const C3 = A3;
        const same = ['x', 'x^2+5'].every(b => op(op(A3, b), C3).eq(op(A3, op(b, C3))));
        const X = A3.scale(3).sub(Poly.of('x+1').scale(2));
        if (!op(A3, X).eq(op('x+1', A3))) return null;
        return [String(op('x^2+1', 'x-3')), String(d), same ? String(C3) : null, String(X)];
      },
    },
    {
      id: '10.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $A=3x^{2}-2x+5$，$B=2x^{2}-2x+3$。',
      blanks: [
        { kind: 'expr', label: '(1) $A-B=$', answer: 'x^2+2', simplified: true },
        { kind: 'text', label: '(2) 对任意的 $x$，$A$ 与 $B$ 的大小关系是', answer: 'A>B', options: ['A>B', 'A<B', '不能确定'] },
        { kind: 'expr', label: '(3) 若整式 $C$ 满足 $C-A=B-C$，则 $C=$', answer: '5/2*x^2-2x+4', simplified: true },
        { kind: 'num', label: '(4) $C-B$ 的最小值是', answer: '1' },
      ],
      explain: [
        '(1) $A-B=3x^{2}-2x+5-2x^{2}+2x-3=x^{2}+2$。',
        '(2) 比较两个式子的大小，可以看它们的差。$x^{2}\\ge0$，所以 $A-B=x^{2}+2\\ge2>0$，对任意 $x$ 都有 $A>B$。',
        '(3) $C-A=B-C$，移项得 $2C=A+B=5x^{2}-4x+8$，所以 $C=\\frac52x^{2}-2x+4$。$C$ 在 $A$、$B$ 的正中间。',
        '(4) $C-B=\\frac52x^{2}-2x+4-2x^{2}+2x-3=\\frac12x^{2}+1$。$x^{2}$ 最小是 0（$x=0$ 时），所以最小值是 1。',
        '也可以这样想：$C$ 在正中间，$C-B$ 正好是 $A-B$ 的一半，即 $\\frac12(x^{2}+2)$。',
      ],
      verify: () => {
        const A = Poly.of('3x^2-2x+5'), B = Poly.of('2x^2-2x+3');
        const d = A.sub(B);
        // 差只有 x² 项（系数为正）和正的常数项，x² 不小于 0，所以差恒为正
        const alwaysPos = d.deg() === 2 && d.coef('x^2').cmp(0) > 0 && d.coef('x').isZero() && d.coef('').cmp(0) > 0;
        const C = A.add(B).scale(F('1/2'));
        const CB = C.sub(B);
        let min = null;
        for (let i = -40; i <= 40; i++) {
          const v = CB.at({ x: F(i).div(4) });
          if (min === null || v.cmp(min) < 0) min = v;
        }
        return [String(d), alwaysPos ? 'A>B' : '不能确定', String(C), min];
      },
    },
    {
      id: '10.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '一个三角形的第一条边长为 $3a+2b$，第二条边比第一条边的 2 倍少 $a-b$，第三条边比第二条边短 $ka$（$a$、$b$ 都是正数，$k$ 是正整数，三条边的长都是正数）。',
      blanks: [
        { kind: 'expr', label: '(1) 第二条边长是', answer: '5a+5b', simplified: true },
        { kind: 'expr', label: '(2) 这个三角形的周长是（用 $a$、$b$、$k$ 表示）', answer: '13a+12b-k*a' },
        { kind: 'num', label: '(3) 若第三条边比第一条边长 $3b$，则 $k=$', answer: '2' },
        { kind: 'num', label: '(4) 不论正数 $a$、$b$ 取什么值，第三条边都比第一条边长。这样的正整数 $k$ 有几个？', answer: '2' },
      ],
      explain: [
        '(1) “比第一条边的 2 倍少 $a-b$”，要把 $a-b$ 整体减掉：$2(3a+2b)-(a-b)=6a+4b-a+b=5a+5b$。写成 $6a+4b-a-b$ 是常见错误。',
        '第三条边：$(5a+5b)-ka=(5-k)a+5b$。',
        '(2) 周长 $=(3a+2b)+(5a+5b)+\\left[(5-k)a+5b\\right]=(13-k)a+12b$。',
        '(3) 用作差比较：第三条减第一条是 $\\left[(5-k)a+5b\\right]-(3a+2b)=(2-k)a+3b$。要等于 $3b$，就要 $(2-k)a=0$，而 $a$ 是正数，所以 $k=2$。',
        '(4) 差是 $(2-k)a+3b$，按 $k$ 分类：$k=1$ 时差是 $a+3b$，$k=2$ 时差是 $3b$，都是正数，第三条边一定更长。',
        '$k\\ge3$ 时 $2-k$ 是负数，只要 $a$ 取得足够大，差就会变成负数，例如 $k=3$，$a=4$，$b=1$ 时差是 $-4+3=-1$，第三条边反而短。所以只有 $k=1$、$2$，共 2 个。',
      ],
      verify: () => {
        const e1 = Poly.of('3a+2b');
        const e2 = e1.scale(2).sub(Poly.of('a-b'));
        const e3 = k => e2.sub(Poly.of(`${k}*a`));
        const per = e1.add(e2).add(Poly.of('5a+5b-k*a'));
        let k3 = null;
        for (let k = 1; k <= 20; k++) if (e3(k).sub(e1).eq('3b')) k3 = k;
        // 在一批正数 a、b 上检验“第三条边都更长”
        const pts = [];
        for (const a of [1, 2, 4, 10, 100]) for (const b of [F('1/10'), 1, 3]) pts.push({ a, b });
        let cnt = 0;
        for (let k = 1; k <= 20; k++) if (pts.every(pt => e3(k).sub(e1).at(pt).cmp(0) > 0)) cnt++;
        return [String(e2), String(per), k3, cnt];
      },
    },
    {
      id: '10.3-e07',
      level: 'extended',
      type: 'fill',
      stem: '观察一层套一层的括号，找出去括号后各项符号的规律。',
      blanks: [
        { kind: 'text', label: '(1) 把 $a-(b-(c-(d-(e-f))))$ 的括号全部去掉后，$d$ 前面的符号是', answer: '−', options: ['+', '−'] },
        { kind: 'num', label: '(2) 把 $a_{1}-(a_{2}-(a_{3}-(\\cdots-(a_{2025}-a_{2026})\\cdots)))$ 的括号全部去掉后，前面是“$-$”号的字母有几个？', answer: '1013' },
        { kind: 'num', label: '(3) $1-(2-(3-(4-(\\cdots-(99-100)\\cdots))))$ 的值是', answer: '-50' },
        { kind: 'expr', label: '(4) 化简 $x^{2}-\\left(2x-\\left(x^{2}-\\left(2x-\\left(x^{2}-2x\\right)\\right)\\right)\\right)=$', answer: '3x^2-6x', simplified: true },
      ],
      explain: [
        '(1) 从最里面一层开始去：$e-f$ 不变；$d-(e-f)=d-e+f$；$c-(d-e+f)=c-d+e-f$；……最后得 $a-b+c-d+e-f$。$d$ 前面是“$-$”。',
        '规律：一个字母前面被几层“$-$( )”包着，就变几次号。第 $k$ 个字母被 $k-1$ 层包着（第 1 个不被包），所以第奇数个字母前面是“$+$”，第偶数个字母前面是“$-$”。',
        '(2) 第偶数个字母前面是“$-$”，1 到 2026 中偶数有 1013 个。',
        '(3) 去括号后是 $1-2+3-4+\\cdots+99-100$，两个一组，每组 $-1$，共 50 组，值是 $-50$。',
        '(4) 式子里从左到右依次出现 $x^{2}$、$2x$、$x^{2}$、$2x$、$x^{2}$、$2x$ 六项。按规律，第奇数项取“$+$”，第偶数项取“$-$”：$x^{2}-2x+x^{2}-2x+x^{2}-2x=3x^{2}-6x$。',
        '也可以从里往外逐层算来检验：$2x-(x^{2}-2x)=4x-x^{2}$，$x^{2}-(4x-x^{2})=2x^{2}-4x$，$2x-(2x^{2}-4x)=6x-2x^{2}$，$x^{2}-(6x-2x^{2})=3x^{2}-6x$。',
      ],
      verify: () => {
        const letters = 'abcdef';
        let p = Poly.of('f');
        for (let i = 4; i >= 0; i--) p = Poly.of(letters[i]).sub(p);
        let minus = 0;
        for (let k = 1; k <= 2026; k++) {
          // 第 k 个被 k−1 层“−( )”包着；用小例子验证规律后再计数
          if ((k - 1) % 2 === 1) minus++;
        }
        const small = Poly.of('a-(b-(c-(d-(e-f))))');
        if (!['a', 'c', 'e'].every(v => small.coef(v).eq(1)) || !['b', 'd', 'f'].every(v => small.coef(v).eq(-1))) return null;
        let v = F(100);
        for (let k = 99; k >= 1; k--) v = F(k).sub(v);
        const q = Poly.of('x^2-(2x-(x^2-(2x-(x^2-2x))))');
        return [p.coef('d').cmp(0) > 0 ? '+' : '−', minus, v, String(q)];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '10.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '阅读：对关于 $x$ 的三次整式 $A=ax^{3}+bx^{2}+cx+d$（$a$、$d$ 都不为 0），把四个系数的顺序倒过来，得到 $A\'=dx^{3}+cx^{2}+bx+a$，叫作 $A$ 的**倒序整式**。例如 $3x^{3}+x^{2}-4$ 的倒序整式是 $-4x^{3}+x+3$（缺的项系数看作 0）。',
      blanks: [
        { kind: 'expr', label: '(1) $2x^{3}-x+5$ 的倒序整式是', answer: '5x^3-x^2+2', simplified: true },
        { kind: 'expr', label: '(2) 若 $A+A\'=6x^{3}+4x^{2}+4x+6$，$A-A\'=2x^{3}-2x^{2}+2x-2$，则 $A=$', answer: '4x^3+x^2+3x+2', simplified: true },
        { kind: 'text', label: '(3) 是否存在这样的 $A$，使 $A-A\'=x^{3}+2x^{2}-x+3$？', answer: '不存在', options: ['存在', '不存在'] },
        { kind: 'num', label: '(4) 四个系数都是 1～9 的整数（可以相同）的三次整式 $A$ 中，使 $A+A\'$ 的四个系数全都相等的有几个？', answer: '489' },
      ],
      explain: [
        '(1) $2x^{3}-x+5$ 要先补全：$a=2$，$b=0$，$c=-1$，$d=5$。倒过来是 $5x^{3}-x^{2}+0\\cdot x+2=5x^{3}-x^{2}+2$。常见错误是忘了 $b=0$，写成 $5x^{3}-x+2$。',
        '(2) 两式相加：$2A=8x^{3}+2x^{2}+6x+4$，$A=4x^{3}+x^{2}+3x+2$。检验：$A\'=2x^{3}+3x^{2}+x+4$，$A+A\'$、$A-A\'$ 都对。',
        '(3) 一般地，$A-A\'=(a-d)x^{3}+(b-c)x^{2}+(c-b)x+(d-a)$。三次项系数与常数项互为相反数，二次项系数与一次项系数也互为相反数。',
        '题中三次项系数 1、常数项 3，不互为相反数（二次项 2 与一次项 $-1$ 也不是），所以不存在。',
        '(4) $A+A\'=(a+d)x^{3}+(b+c)x^{2}+(c+b)x+(d+a)$。首尾两个系数自动相等，中间两个也自动相等，只需要 $a+d=b+c$。',
        '设这个共同的和为 $s$。两个 1～9 的整数和为 $s$ 的有序数对个数：$s=2$ 时 1 个，$s=3$ 时 2 个，……，$s=10$ 时 9 个，之后逐个减少，$s=18$ 时 1 个。',
        '$(a,d)$ 和 $(b,c)$ 各自独立选，和为 $s$ 的组合数是这个个数的平方。总数 $=2\\times(1^{2}+2^{2}+\\cdots+8^{2})+9^{2}=2\\times204+81=489$。',
      ],
      verify: () => {
        const rev = p => {
          const cs = [3, 2, 1, 0].map(k => p.coef(k ? `x^${k}` : ''));
          return Poly.of(`(${cs[3]})*x^3+(${cs[2]})*x^2+(${cs[1]})*x+(${cs[0]})`);
        };
        const r1 = rev(Poly.of('2x^3-x+5'));
        const A2 = Poly.of('6x^3+4x^2+4x+6').add(Poly.of('2x^3-2x^2+2x-2')).scale(F('1/2'));
        if (!A2.add(rev(A2)).eq('6x^3+4x^2+4x+6') || !A2.sub(rev(A2)).eq('2x^3-2x^2+2x-2')) return null;
        // (3)：在一个范围内穷举，确认找不到
        const target = Poly.of('x^3+2x^2-x+3');
        let exists = false;
        for (let a = -4; a <= 4 && !exists; a++) for (let b = -4; b <= 4; b++) for (let c = -4; c <= 4; c++) for (let d = -4; d <= 4; d++) {
          if (a && d && Poly.of(`${a}x^3+(${b})x^2+(${c})x+(${d})`).sub(Poly.of(`${d}x^3+(${c})x^2+(${b})x+(${a})`)).eq(target)) exists = true;
        }
        let cnt = 0;
        for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (let c = 1; c <= 9; c++) for (let d = 1; d <= 9; d++) {
          if (a + d === b + c) cnt++;                            // 与“四个系数全相等”等价，下面抽查
        }
        const sample = Poly.of('3x^3+7x^2+2x+6');
        if (new Set([3, 2, 1, 0].map(k => String(sample.add(rev(sample)).coef(k ? `x^${k}` : '')))).size !== 1) return null;
        return [String(r1), String(A2), exists ? '存在' : '不存在', cnt];
      },
    },
    {
      id: '10.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，长方形盒底的长为 $m$、宽为 $n$。把 3 张同样的小长方形卡片（长为 $a$、宽为 $b$，$a>b$）不重叠地放进盒底：卡片①横放在左上角；卡片②③竖放在右下角，并排紧靠右边，卡片①的右边与卡片②的左边在同一条竖线上，所以 $m=a+2b$。盒底没被覆盖的部分用阴影表示，用这条竖线把它分成左下的“阴影 1”和右上的“阴影 2”两个长方形（图中 $n>a$）。',
      figure: FIG103.box,
      blanks: [
        { kind: 'expr', label: '(1) 阴影 1 的周长是（用 $a$、$b$、$n$ 表示）', answer: '2a+2n-2b', simplified: true },
        { kind: 'expr', label: '(2) 两块阴影的周长之和是（用 $b$、$n$ 表示）', answer: '4n+2b', simplified: true },
        { kind: 'expr', label: '(3) 一般地，左上角横放 $p$ 张（上下叠放）、右下角竖放 $q$ 张（并排），盒底长为 $a+qb$，其余放法不变。两块阴影的周长之和是（用 $n$、$b$、$p$、$q$ 表示）', answer: '4n+2q*b-2p*b' },
        { kind: 'num', label: '(4) 在 (3) 中，若一共用了 9 张卡片，两块阴影的周长之和是 $4n+6b$，那么左上角横放了几张？', answer: '3' },
        { kind: 'expr', label: '(5) 回到图中的放法（$p=1$，$q=2$），如果盒底的宽 $n$ 恰好等于 $a$，盒底没被覆盖部分的周长是（用 $a$、$b$ 表示）', answer: '4a-2b', simplified: true },
      ],
      explain: [
        '先从图上读出两块阴影的边长。阴影 1 在卡片①下面、竖线左边：宽是卡片①的长 $a$，高是 $n-b$（盒宽减去卡片①的宽）。',
        '阴影 2 在卡片②③上面、竖线右边：宽是 $m-a=2b$，高是 $n-a$（盒宽减去竖放卡片的长）。',
        '(1) 阴影 1 的周长 $=2[a+(n-b)]=2a+2n-2b$。',
        '(2) 阴影 2 的周长 $=2[2b+(n-a)]=4b+2n-2a$。两者相加：$2a+2n-2b+4b+2n-2a=4n+2b$。$a$ 被抵消了。',
        '(3) 一般情形：阴影 1 是 $a\\times(n-pb)$，阴影 2 是 $qb\\times(n-a)$。周长和 $=2(a+n-pb)+2(qb+n-a)=4n+2qb-2pb$。无论 $p$、$q$ 是多少，$a$ 总会抵消。',
        '(4) 由 $4n+2qb-2pb=4n+6b$ 得 $2(q-p)=6$，$q-p=3$；又 $p+q=9$，两式相加得 $2q=12$，$q=6$，$p=3$。',
        '(5) 这一问不能直接把 $n=a$ 代进 (2) 的结果。$n=a$ 时，阴影 2 的高 $n-a=0$，竖放的卡片正好顶到盒子上边，阴影 2 不存在了，没被覆盖的只剩阴影 1。',
        '阴影 1 是 $a\\times(a-b)$ 的长方形，周长 $=2(a+a-b)=4a-2b$。如果套用 $4n+2b$ 会得到 $4a+2b$，多出来的 $4b$ 正是把“高为 0 的阴影 2”当成长方形，算上了它的两条宽 $2b+2b$。',
        '所以用字母表示的结论要注意适用的范围：(2) 的结果只在两块阴影都真实存在（$n>a$）时成立。',
      ],
      verify: () => {
        const sum = (p, q) => Poly.of(`2*(a+n-${p}*b)`).add(Poly.of(`2*(${q}*b+n-a)`));
        const s1 = Poly.of('2*(a+n-b)');
        let general = true;
        for (let p = 1; p <= 4; p++) for (let q = 1; q <= 4; q++) if (!sum(p, q).eq(Poly.of(`4n+2*${q}*b-2*${p}*b`))) general = false;
        let p4 = null;
        for (let p = 1; p <= 8; p++) if (sum(p, 9 - p).eq('4n+6b')) p4 = p;
        // n=a 时阴影 2 的高为 0，只算阴影 1
        const only1 = Poly.of('2*(a+n-b)'.replace('n', 'a'));
        return [String(s1), String(sum(1, 2)), general ? '4n+2q*b-2p*b' : null, p4, String(only1)];
      },
    },
    {
      id: '10.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $P=x^{2}+x$，$Q=x-1$，$R=x^{2}+1$。要找数 $a$、$b$、$c$，使得对任意的 $x$，$aP+bQ+cR$ 都等于给定的整式。',
      blanks: [
        { kind: 'text', label: '(1) 能不能找到 $a$、$b$、$c$，使 $aP+bQ+cR=5x^{2}-3x+7$ 对任意 $x$ 成立？', answer: '不能', options: ['能', '不能'] },
        { kind: 'num', label: '(2) 若 $aP+bQ+cR=5x^{2}-3x+k$ 能对任意 $x$ 成立，则 $k=$', answer: '8' },
        { kind: 'num', label: '(3) 在 (2) 中，$a$、$b$、$c$ 都是整数并且绝对值都不超过 10 的解共有几组？', answer: '13' },
        { kind: 'num', label: '(4) 在 (3) 的解中，$a+b+c$ 的最大值是', answer: '7' },
      ],
      explain: [
        '先把 $aP+bQ+cR$ 去括号、合并：$ax^{2}+ax+bx-b+cx^{2}+c=(a+c)x^{2}+(a+b)x+(c-b)$。',
        '对任意 $x$ 都相等，同类项的系数要分别相等（否则取几个不同的 $x$ 就能看出差别）。',
        '(1) 要 $a+c=5$，$a+b=-3$，$c-b=7$。前两式相减得 $c-b=8$，与第三式矛盾，所以不能。',
        '原因是 $P-R=x-1=Q$，三个整式之间有关系，用它们凑不出所有的二次整式。',
        '(2) 由 $a+c=5$、$a+b=-3$ 可知，不管 $a$ 取什么，$c-b=(5-a)-(-3-a)=8$ 都不变，所以只有 $k=8$ 时能成立。',
        '(3) $k=8$ 时，$a$ 可以任取，$b=-3-a$，$c=5-a$，有无数组解。加上绝对值都不超过 10：$\\lvert a\\rvert\\le10$ 得 $-10\\le a\\le10$；$\\lvert -3-a\\rvert\\le10$ 得 $-13\\le a\\le7$；$\\lvert5-a\\rvert\\le10$ 得 $-5\\le a\\le15$。',
        '三个范围的公共部分是 $-5\\le a\\le7$，整数 $a$ 共 13 个，每个 $a$ 对应一组解。',
        '(4) $a+b+c=a+(-3-a)+(5-a)=2-a$，$a$ 越小越大。$a=-5$ 时最大，是 7（此时 $b=2$，$c=10$）。',
      ],
      verify: () => {
        const P = Poly.of('x^2+x'), Q = Poly.of('x-1'), R = Poly.of('x^2+1');
        const comb = (a, b, c) => P.scale(a).add(Q.scale(b)).add(R.scale(c));
        let can1 = false;
        const ks = new Set();
        const sols = [];
        for (let a = -15; a <= 15; a++) for (let b = -15; b <= 15; b++) for (let c = -15; c <= 15; c++) {
          const s = comb(a, b, c);
          if (s.eq('5x^2-3x+7')) can1 = true;
          if (s.coef('x^2').eq(5) && s.coef('x').eq(-3)) {
            ks.add(String(s.coef('')));
            if (Math.abs(a) <= 10 && Math.abs(b) <= 10 && Math.abs(c) <= 10) sols.push(a + b + c);
          }
        }
        return [can1 ? '能' : '不能', ks.size === 1 ? [...ks][0] : null, sols.length, Math.max(...sols)];
      },
    },
    {
      id: '10.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '三个整式 $A$、$B$、$C$ 满足：$A-B=x^{2}-2x+3$，$B-C=2x^{2}+x-1$，$A+B+C=8x^{2}+3x+7$。',
      blanks: [
        { kind: 'expr', label: '(1) $C=$', answer: 'x^2+x+2', simplified: true },
        { kind: 'expr', label: '(2) $A=$', answer: '4x^2+4', simplified: true },
        { kind: 'num', label: '(3) 若把条件 $A+B+C=8x^{2}+3x+7$ 改成 $A+B+C=8x^{2}+mx+k$（前两个条件不变），要使 $A$、$B$、$C$ 的各项系数都是整数，$m$ 必须是几的倍数？（填最小的正整数）', answer: '3' },
        { kind: 'num', label: '(4) 在 (3) 的改法下，$m$、$k$ 都是绝对值不超过 10 的整数。使 $A$、$B$、$C$ 的各项系数都是整数，并且 $A$、$B$、$C$ 中恰好有一个不含一次项的数对 $(m,k)$ 共有几组？', answer: '21' },
      ],
      explain: [
        '三个未知的整式，给了两个差和一个和。思路：都用 $C$ 来表示，再代入和。',
        '由 $B-C=2x^{2}+x-1$ 得 $B=C+(2x^{2}+x-1)$；由 $A-B=x^{2}-2x+3$ 得 $A=B+(x^{2}-2x+3)=C+(3x^{2}-x+2)$。',
        '三式相加：$A+B+C=3C+5x^{2}+1$。',
        '(1) $3C=8x^{2}+3x+7-5x^{2}-1=3x^{2}+3x+6$，$C=x^{2}+x+2$。',
        '(2) $A=C+(3x^{2}-x+2)=4x^{2}+4$，一次项正好抵消。（$B=3x^{2}+2x+1$，可以检验三者之和。）',
        '(3) 一般地 $3C=3x^{2}+mx+(k-1)$，$C=x^{2}+\\frac{m}{3}x+\\frac{k-1}{3}$。$A$、$B$ 都是 $C$ 加上整数系数的整式，所以三个整式系数都是整数，当且仅当 $\\frac m3$、$\\frac{k-1}{3}$ 都是整数：$m$ 是 3 的倍数，$k-1$ 是 3 的倍数。',
        '(4) 三个一次项系数：$C$ 是 $\\frac m3$，$A$ 是 $\\frac m3-1$，$B$ 是 $\\frac m3+1$。记 $t=\\frac m3$（整数），三个系数是 $t-1$、$t$、$t+1$，是三个连续整数，最多只有一个为 0。',
        '恰有一个为 0，需要 $t$ 是 $-1$、$0$、$1$ 之一，即 $m=-3,0,3$，3 种（$\\lvert m\\rvert\\le10$ 都满足）。$t$ 取其他值时三个系数都不为 0，不符合。',
        '$k$：$k-1$ 是 3 的倍数且 $\\lvert k\\rvert\\le10$，$k=-8,-5,-2,1,4,7,10$，7 种。$m$、$k$ 互不影响，共 $3\\times7=21$ 组。',
      ],
      verify: () => {
        const P = Poly.of('x^2-2x+3'), Q = Poly.of('2x^2+x-1');
        const solve = T => {
          const C = T.sub(Q.scale(2)).sub(P).scale(F('1/3'));
          const B = C.add(Q), A = B.add(P);
          return [A, B, C];
        };
        const [A, B, C] = solve(Poly.of('8x^2+3x+7'));
        if (!A.sub(B).eq(P) || !B.sub(C).eq(Q) || !A.add(B).add(C).eq('8x^2+3x+7')) return null;
        const intCoef = ps => ps.every(p => [...p.terms.values()].every(c => c.d === 1n));
        const ms = new Set();
        let cnt = 0;
        for (let m = -10; m <= 10; m++) for (let k = -10; k <= 10; k++) {
          const s = solve(Poly.of(`8x^2+(${m})*x+(${k})`));
          if (!intCoef(s)) continue;
          ms.add(m);
          if (s.filter(p => p.coef('x').isZero()).length === 1) cnt++;
        }
        const step = Math.min(...[...ms].filter(m => m > 0));
        return [String(C), String(A), step, cnt];
      },
    },
    {
      id: '10.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的整式合并同类项后是 $ax^{2}+bx+c$。小明分别算出 $x=1,2,3,4,5$ 时它的值，依次是 $3$，$8$，$15$，$25$，$35$。老师说：这五个值中恰好有一个算错了。',
      blanks: [
        { kind: 'expr', label: '(1) $x=2$ 时的值减去 $x=1$ 时的值，用 $a$、$b$ 表示是', answer: '3a+b', simplified: true },
        { kind: 'expr', label: '(2) $x=3$ 时的值减去 $x=2$ 时的值，用 $a$、$b$ 表示是', answer: '5a+b', simplified: true },
        { kind: 'num', label: '(3) 算错的是 $x$ 等于几时的值？', answer: '4' },
        { kind: 'num', label: '(4) 这个值的正确结果是', answer: '24' },
        { kind: 'expr', label: '(5) 这个整式是', answer: 'x^2+2x', simplified: true },
      ],
      explain: [
        '五个值、三个未知系数，还有一个错值，直接列方程组要试很多种组合。先研究相邻两个值的差有什么规律。',
        '(1) $x=2$ 时的值是 $4a+2b+c$，$x=1$ 时是 $a+b+c$，差 $d_{1}=(4a+2b+c)-(a+b+c)=3a+b$。',
        '同样算下去：$d_{2}=(9a+3b+c)-(4a+2b+c)=5a+b$，$d_{3}=(16a+4b+c)-(9a+3b+c)=7a+b$，$d_{4}=(25a+5b+c)-(16a+4b+c)=9a+b$。',
        '(2) 就是 $d_{2}=5a+b$。把四个差排在一起看：$d_{2}-d_{1}$、$d_{3}-d_{2}$、$d_{4}-d_{3}$ 都等于 $2a$，相邻的差每次增加同样多。',
        '(3) 小明的值的差依次是 $5,7,10,10$，再作差是 $2,3,0$，不相等，确实有错。',
        '逐个假设哪个值错了，其余四个值必须符合“相邻的差每次增加同样多”：',
        '若错的是 $x=5$：前四个 3、8、15、25 的差是 5、7、10，增加量 2、3 不相等，矛盾。',
        '若错的是 $x=1$ 或 $x=2$：后三个 15、25、35 都对，差 10、10 说明 $2a=0$，每个差都是 10，倒推 $x=2$ 时应为 5、$x=1$ 时应为 $-5$，3 和 8 两个都错，与“只错一个”矛盾。',
        '若错的是 $x=3$：由 $x=1,2$ 得 $d_{1}=5$，由 $x=4,5$ 得 $d_{4}=10$，而 $d_{4}=d_{1}+3\\times2a$，所以 $2a=\\frac53$。于是 $x=3$ 的值从左边推是 $8+5+\\frac53=\\frac{44}{3}$，从右边推是 $25-\\left(10-\\frac53\\right)=\\frac{50}{3}$，两者不同，矛盾。',
        '若错的是 $x=4$：由前三个得 $d_{1}=5$，$d_{2}=7$，$2a=2$；应有 $d_{3}=9$，$d_{4}=11$，对应 $x=4$ 时为 24，$x=5$ 时为 35，与小明的 35 一致。只有这种情况成立，所以算错的是 $x=4$。',
        '(4) 正确值是 24。',
        '(5) $2a=2$，$a=1$；$d_{1}=3a+b=5$，$b=2$；$a+b+c=3$，$c=0$。整式是 $x^{2}+2x$。验算：$x=4$ 时 $16+8=24$。',
      ],
      verify: () => {
        const vals = [3, 8, 15, 25, 35];
        const general = Poly.of('a*x^2+b*x+c');
        const at = x => general.at({ x });
        const d1 = at(2).sub(at(1)), d2 = at(3).sub(at(2));
        // 逐个假设错的是第 w 个：用其余点中的前三个解出 a、b、c，再检验第四个
        const fits = [];
        for (let w = 0; w < 5; w++) {
          const pts = vals.map((v, i) => [i + 1, F(v)]).filter((_, i) => i !== w);
          const [[x1, y1], [x2, y2], [x3, y3]] = pts;
          const s1 = y2.sub(y1).div(x2 - x1), s2 = y3.sub(y2).div(x3 - x2);
          const a = s2.sub(s1).div(x3 - x1);
          const b = s1.sub(a.mul(x1 + x2));
          const c = y1.sub(a.mul(x1 * x1)).sub(b.mul(x1));
          const p = Poly.of(`(${a})*x^2+(${b})*x+(${c})`);
          if (p.at({ x: pts[3][0] }).eq(pts[3][1])) fits.push({ x: w + 1, p });
        }
        if (fits.length !== 1) return null;
        const { x, p } = fits[0];
        if (!at(4).sub(at(3)).sub(d2).eq(d2.sub(d1))) return null;
        return [String(d1), String(d2), x, p.at({ x }), String(p)];
      },
    },
  ],
});
