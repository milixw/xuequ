'use strict';

// 上海数学七年级上册 · 11.2 乘法公式
// 知识范围：平方差公式 (a+b)(a−b)=a²−b²；完全平方公式 (a±b)²=a²±2ab+b²；用完全平方公式展开 (a+b+c)²；
//   用公式简便计算（如 998×1002+4、98²）；公式的变形：由 a+b、a−b、ab 求 a²+b² 等；“某个整式的平方”含参问题
// 可以使用：11.1 全部内容；第 10 章；六年级上下册全部内容（含方程组、三角形和梯形面积）
// 还没学：同底数幂的除法、a^0（11.3）；因式分解（第 12 章，所以只能“凑成完全平方”验证展开，不讲分解方法）；
//   分式（第 13 章，不出 x+1/x 型）；负整数指数；开平方、根号（八年级上册）；勾股定理；不等式（七年级下册）
// 本节约定：指数都是正整数

// 11.2-e04 的配图：正方形 ABCD、CEFG 并排（按 a=7、b=3 画，每单位 20px）
// 11.2-c02 的配图：长方形 ABCD，AB=6、BC=10，AE=BF=x（按 x=4 画，避开答案 2，每单位 14px）
const FIG112 = {
  twoSquares: `<svg viewBox="0 0 270 200" xmlns="http://www.w3.org/2000/svg" font-size="14" font-family="sans-serif">
  <polygon points="30,170 170,30 170,110 230,110" fill="#cfe3f7" stroke="none"/>
  <rect x="30" y="30" width="140" height="140" fill="none" stroke="#333" stroke-width="1.5"/>
  <rect x="170" y="110" width="60" height="60" fill="none" stroke="#333" stroke-width="1.5"/>
  <line x1="30" y1="170" x2="170" y2="30" stroke="#333" stroke-width="1.5"/>
  <line x1="30" y1="170" x2="230" y2="110" stroke="#333" stroke-width="1.5"/>
  <text x="22" y="26" text-anchor="middle">A</text>
  <text x="22" y="186" text-anchor="middle">B</text>
  <text x="170" y="188" text-anchor="middle">C</text>
  <text x="178" y="26" text-anchor="middle">D</text>
  <text x="240" y="186" text-anchor="middle">E</text>
  <text x="242" y="106" text-anchor="middle">F</text>
  <text x="160" y="104" text-anchor="middle">G</text>
</svg>`,
  moving: `<svg viewBox="0 0 200 125" xmlns="http://www.w3.org/2000/svg" font-size="14" font-family="sans-serif">
  <rect x="30" y="20" width="140" height="84" fill="none" stroke="#333" stroke-width="1.5"/>
  <polygon points="170,20 30,76 86,104" fill="#cfe3f7" stroke="#2b5d8a" stroke-width="2"/>
  <text x="22" y="18" text-anchor="middle">A</text>
  <text x="22" y="118" text-anchor="middle">B</text>
  <text x="178" y="118" text-anchor="middle">C</text>
  <text x="178" y="18" text-anchor="middle">D</text>
  <text x="18" y="81" text-anchor="middle">E</text>
  <text x="86" y="120" text-anchor="middle">F</text>
</svg>`,
};

Content.section({
  id: 'math/sh2024/g7s1/11.2',
  title: '乘法公式',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮 c02～c05 只有 4 级被打回，b06(2) 与卡片“凑成完全平方”撞车且没有坑，e04 答案恰好等于已知 ab，扩展档缺 5 级，c01 与 e02 同为四次方和；第 2 轮 c02 改长方形并要舍根、c03 加偶方差数分类、c04 改整数 a 和 Q−P、c05 改逆用 (a−b)^4，e02 改五次方和，e06(2) 改三元连续配方后判定整节通过，c02 配图按意见改成不显示答案。可选意见未处理：e06 两问同为相邻配方，c03(3) 略偏竞赛' },

  intro: [
    {
      title: '平方差公式',
      body: '$(a+b)(a-b)=a^{2}-b^{2}$：两个数的和与这两个数的差相乘，等于它们的平方差。用之前先认清：两个括号里**一项完全相同**（看作 $a$），**另一项互为相反数**（看作 $b$），结果是“相同项的平方减相反项的平方”。',
      example: '$(2y+5)(2y-5)=(2y)^{2}-5^{2}=4y^{2}-25$。',
      pitfall: '$a$、$b$ 可以是带系数、带负号的整个单项式，平方时系数和符号一起平方：$(2y)^{2}=4y^{2}$。',
    },
    {
      title: '完全平方公式',
      body: '$(a+b)^{2}=a^{2}+2ab+b^{2}$，$(a-b)^{2}=a^{2}-2ab+b^{2}$。口诀：首平方，尾平方，首尾乘积的 $2$ 倍放中间。',
      example: '$(x-3y)^{2}=x^{2}-2\\cdot x\\cdot3y+(3y)^{2}=x^{2}-6xy+9y^{2}$。',
      pitfall: '最常见的两个错：漏掉中间的 $2ab$；把 $(a-b)^{2}$ 的最后一项写成 $-b^{2}$。$b^{2}$ 永远是加。',
    },
    {
      title: '三项的平方',
      body: '把其中两项看成一个整体，用两次完全平方公式：$(a+b+c)^{2}=a^{2}+b^{2}+c^{2}+2ab+2bc+2ca$，即每一项的平方，加上每两项乘积的 $2$ 倍。',
      example: '$(x+y-1)^{2}=x^{2}+y^{2}+1+2xy-2x-2y$。',
    },
    {
      title: '公式的变形',
      body: '完全平方公式里有 $a+b$（或 $a-b$）、$ab$、$a^{2}+b^{2}$ 三个量，知道其中两个，就能求第三个：$a^{2}+b^{2}=(a+b)^{2}-2ab=(a-b)^{2}+2ab$，$(a+b)^{2}-(a-b)^{2}=4ab$。',
      example: '已知 $a+b=3$，$ab=1$，则 $a^{2}+b^{2}=3^{2}-2\\times1=7$。',
    },
    {
      title: '用公式简便计算',
      body: '把接近整十、整百的数写成和或差，套用公式，计算会简单很多。',
      example: '$49\\times51=(50-1)(50+1)=2500-1=2499$；$201^{2}=(200+1)^{2}=40000+400+1=40401$。',
    },
    {
      title: '凑成完全平方',
      body: '平方一定不是负数。把一个式子写成“完全平方 $+$ 一个数”，就能看出它最小是多少。凑的办法：二次项系数是 $1$ 时，加上并减去一次项系数一半的平方。',
      example: '$x^{2}+6x+10=x^{2}+6x+9+1=(x+3)^{2}+1$，所以它的值最小是 $1$（$x=-3$ 时）。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '11.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列各式中，能用平方差公式计算的是（　　）',
      options: ['$(a+b)(-a-b)$', '$(-x+y)(-x-y)$', '$(2a-b)(b-2a)$', '$(x+1)(1+x)$'],
      answer: 1,
      explain: [
        '平方差公式要求：一项相同、另一项互为相反数。',
        'A：$a$ 与 $-a$、$b$ 与 $-b$ 都互为相反数，没有相同的项，结果是 $-(a+b)^{2}$。',
        'B：$-x$ 相同，$y$ 与 $-y$ 互为相反数，$(-x+y)(-x-y)=(-x)^{2}-y^{2}=x^{2}-y^{2}$，可以。',
        'C：$2a$ 与 $-2a$、$-b$ 与 $b$ 都互为相反数，结果是 $-(2a-b)^{2}$；D 两项都相同，是 $(x+1)^{2}$。选 B。',
      ],
      verify: () => {
        // 能用平方差公式：两个因式的和或差中，恰好一个“只剩一项”
        const pairs = [['a+b', '-a-b'], ['-x+y', '-x-y'], ['2a-b', 'b-2a'], ['x+1', '1+x']];
        return pairs.findIndex(([p, q]) => {
          const s = Poly.of(p).add(Poly.of(q));
          const d = Poly.of(p).sub(Poly.of(q));
          return s.size() === 1 && d.size() === 1;
        });
      },
    },
    {
      id: '11.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(-2x-3y)(3y-2x)$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '4x^2-9y^2', simplified: true },
      ],
      explain: [
        '先找相同的项和互为相反数的项：两个括号里都有 $-2x$；$-3y$ 和 $3y$ 互为相反数。',
        '把相同的项放在前面：$(-2x-3y)(-2x+3y)=(-2x)^{2}-(3y)^{2}$。',
        '$=4x^{2}-9y^{2}$。常见错误是把 $3y$ 当成相同项，写成 $9y^{2}-4x^{2}$。',
      ],
      verify: () => String(Poly.of('(-2x-3y)(3y-2x)')),
    },
    {
      id: '11.2-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列计算正确的是（　　）',
      options: [
        '$(a+b)^{2}=a^{2}+b^{2}$',
        '$(a-3)^{2}=a^{2}-6a-9$',
        '$(a-2b)^{2}=a^{2}-4ab+4b^{2}$',
        '$\\left(x+\\frac{1}{2}\\right)^{2}=x^{2}+x+\\frac{1}{2}$',
      ],
      answer: 2,
      explain: [
        'A 漏了中间项 $2ab$。',
        'B 最后一项是 $(-3)^{2}=+9$，不是 $-9$：$(a-3)^{2}=a^{2}-6a+9$。',
        'C：$(a-2b)^{2}=a^{2}-2\\cdot a\\cdot2b+(2b)^{2}=a^{2}-4ab+4b^{2}$，正确。',
        'D 最后一项是 $\\left(\\frac12\\right)^{2}=\\frac14$。选 C。',
      ],
      verify: () => [['(a+b)^2', 'a^2+b^2'], ['(a-3)^2', 'a^2-6a-9'], ['(a-2b)^2', 'a^2-4a*b+4b^2'], ['(x+1/2)^2', 'x^2+x+1/2']]
        .findIndex(([l, r]) => Poly.of(l).eq(Poly.of(r))),
    },
    {
      id: '11.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(-2m-3n)^{2}$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '4m^2+12m*n+9n^2', simplified: true },
      ],
      explain: [
        '两项都是负的，可以先提出负号：$(-2m-3n)^{2}=[-(2m+3n)]^{2}=(2m+3n)^{2}$。',
        '$=(2m)^{2}+2\\cdot2m\\cdot3n+(3n)^{2}=4m^{2}+12mn+9n^{2}$。',
        '常见错误是看到两个负号，把中间项写成 $-12mn$。实际上 $2\\cdot(-2m)\\cdot(-3n)=+12mn$。',
      ],
      verify: () => String(Poly.of('(-2m-3n)^2')),
    },
    {
      id: '11.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '用乘法公式简便计算：(1) $2025^{2}-2024\\times2026$；(2) $99.8^{2}$。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '1' },
        { kind: 'num', label: '(2)', answer: '9960.04' },
      ],
      explain: [
        '(1) $2024\\times2026=(2025-1)(2025+1)=2025^{2}-1$。',
        '原式 $=2025^{2}-(2025^{2}-1)=1$。注意减去的是整个乘积，要加括号，否则会得到 $-1$。',
        '(2) $99.8^{2}=(100-0.2)^{2}=10000-2\\times100\\times0.2+0.04=10000-40+0.04=9960.04$。',
        '常见错误是漏了中间项，写成 $10000+0.04$ 或 $10000-0.04$。',
      ],
      verify: () => [F(2025).pow(2).sub(F(2024).mul(2026)), F('499/5').pow(2)],
    },
    {
      id: '11.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '(1) 若 $x^{2}+kx+16$ 是某个整式的平方，求 $k$（全部填出，用逗号隔开）；(2) 若 $4x^{2}-12x+n$ 是某个整式的平方，求 $n$。',
      blanks: [
        { kind: 'nums', label: '(1) $k=$', answer: ['8', '-8'] },
        { kind: 'num', label: '(2) $n=$', answer: '9' },
      ],
      explain: [
        '(1) $16=4^{2}$，这个整式可以是 $x+4$ 或 $x-4$。',
        '$(x+4)^{2}=x^{2}+8x+16$，$(x-4)^{2}=x^{2}-8x+16$，所以 $k=8$ 或 $-8$。只写 $8$ 会漏掉一个。',
        '(2) 首项 $4x^{2}=(2x)^{2}$，中间项 $-12x=-2\\cdot2x\\cdot3$，所以这个整式是 $2x-3$，$n=3^{2}=9$。',
        '常见错误是照搬“一次项系数一半的平方”，算成 $6^{2}=36$。那个办法只在二次项系数是 $1$ 时能用。',
      ],
      verify: () => {
        const ks = [];
        let n = null;
        for (let c = -10; c <= 10; c++) {
          const sq = Poly.of('x').add(c).pow(2);
          if (sq.coef('').eq(F(16))) ks.push(Number(sq.coef('x').n));
          const sq2 = Poly.of('2x').add(c).pow(2);
          if (sq2.coef('x').eq(F(-12))) n = sq2.coef('');
        }
        return [ks, n];
      },
    },
    {
      id: '11.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '已知 $a-b=4$，$ab=-3$，求 $a^{2}+b^{2}$ 和 $(a+b)^{2}$ 的值。',
      blanks: [
        { kind: 'num', label: '$a^{2}+b^{2}=$', answer: '10' },
        { kind: 'num', label: '$(a+b)^{2}=$', answer: '4' },
      ],
      explain: [
        '$(a-b)^{2}=a^{2}-2ab+b^{2}$，所以 $a^{2}+b^{2}=(a-b)^{2}+2ab=16+2\\times(-3)=10$。',
        '$(a+b)^{2}=a^{2}+2ab+b^{2}=10+2\\times(-3)=4$。',
        '易错：$ab$ 是负数，代入时 $2ab=-6$；也可以用 $(a+b)^{2}=(a-b)^{2}+4ab=16-12=4$ 检验。',
      ],
      verify: () => {
        // 恒等式核对后代入
        const ok1 = Poly.of('a^2+b^2').eq(Poly.of('(a-b)^2+2a*b'));
        const ok2 = Poly.of('(a+b)^2').eq(Poly.of('(a-b)^2+4a*b'));
        return ok1 && ok2 ? [F(16).add(F(-6)), F(16).add(F(-12))] : null;
      },
    },
    {
      id: '11.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(x+2)(x-2)(x^{2}+4)-(x^{2}-2)^{2}$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '4x^2-20', simplified: true },
      ],
      explain: [
        '连续用平方差公式：$(x+2)(x-2)=x^{2}-4$，$(x^{2}-4)(x^{2}+4)=x^{4}-16$。',
        '$(x^{2}-2)^{2}=x^{4}-4x^{2}+4$。',
        '原式 $=x^{4}-16-(x^{4}-4x^{2}+4)=x^{4}-16-x^{4}+4x^{2}-4=4x^{2}-20$。',
        '常见错误：去括号时 $+4$ 没有变号，得到 $4x^{2}-12$。',
      ],
      verify: () => String(Poly.of('(x+2)(x-2)(x^2+4)-(x^2-2)^2')),
    },
    {
      id: '11.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(a-b+2)(a+b-2)$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: 'a^2-b^2+4b-4', simplified: true },
      ],
      explain: [
        '两个括号里 $a$ 相同，剩下的 $-b+2$ 和 $b-2$ 互为相反数，把它们看成一个整体。',
        '原式 $=[a-(b-2)][a+(b-2)]=a^{2}-(b-2)^{2}$。',
        '$=a^{2}-(b^{2}-4b+4)=a^{2}-b^{2}+4b-4$。',
        '常见错误是分组成 $(a-b)$ 和 $(a+b)$，或者去括号时 $4b$、$4$ 的符号弄错。',
      ],
      verify: () => String(Poly.of('(a-b+2)(a+b-2)')),
    },

    // ---------- 扩展 ----------
    {
      id: '11.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\left(1-\\frac{1}{2^{2}}\\right)\\left(1-\\frac{1}{3^{2}}\\right)\\left(1-\\frac{1}{4^{2}}\\right)\\cdots\\left(1-\\frac{1}{2025^{2}}\\right)$。',
      blanks: [
        { kind: 'num', label: '结果是', answer: '1013/2025' },
      ],
      explain: [
        '每个因数都是“$1$ 减一个数的平方”，用平方差公式拆开：$1-\\frac{1}{n^{2}}=\\left(1-\\frac1n\\right)\\left(1+\\frac1n\\right)=\\frac{n-1}{n}\\times\\frac{n+1}{n}$。',
        '原式 $=\\frac12\\times\\frac32\\times\\frac23\\times\\frac43\\times\\frac34\\times\\frac54\\times\\cdots\\times\\frac{2024}{2025}\\times\\frac{2026}{2025}$。',
        '相邻的 $\\frac32\\times\\frac23=1$，$\\frac43\\times\\frac34=1$……中间全部约掉，只剩第一个 $\\frac12$ 和最后一个 $\\frac{2026}{2025}$。',
        '结果 $=\\frac12\\times\\frac{2026}{2025}=\\frac{1013}{2025}$。',
      ],
      verify: () => {
        let p = F(1);
        for (let n = 2; n <= 2025; n++) p = p.mul(F(1).sub(F(1).div(F(n * n))));
        return p;
      },
    },
    {
      id: '11.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x+y=5$，$xy=3$，求 $x^{3}+y^{3}$ 和 $x^{5}+y^{5}$ 的值。',
      blanks: [
        { kind: 'num', label: '$x^{3}+y^{3}=$', answer: '80' },
        { kind: 'num', label: '$x^{5}+y^{5}=$', answer: '1475' },
      ],
      explain: [
        '先求 $x^{2}+y^{2}=(x+y)^{2}-2xy=25-6=19$。',
        '$x^{3}+y^{3}$：上一节算过 $(x+y)(x^{2}-xy+y^{2})=x^{3}+y^{3}$，所以 $x^{3}+y^{3}=5\\times(19-3)=80$。',
        '$x^{5}+y^{5}$：用已经求出的两个量相乘，$(x^{2}+y^{2})(x^{3}+y^{3})=x^{5}+x^{2}y^{3}+x^{3}y^{2}+y^{5}=x^{5}+y^{5}+x^{2}y^{2}(x+y)$。',
        '所以 $x^{5}+y^{5}=19\\times80-3^{2}\\times5=1520-45=1475$。',
        '常见错误：把多出来的 $x^{2}y^{3}+x^{3}y^{2}$ 当成 $xy(x+y)$，少乘了一个 $xy$。',
      ],
      verify: () => {
        const okCube = Poly.of('x^3+y^3').eq(Poly.of('(x+y)^3-3x*y(x+y)'));
        const okFive = Poly.of('x^5+y^5').eq(Poly.of('(x^2+y^2)(x^3+y^3)-(x*y)^2(x+y)'));
        const s = F(5);
        const p = F(3);
        const two = s.pow(2).sub(p.mul(2));
        const three = s.pow(3).sub(p.mul(3).mul(s));
        return okCube && okFive ? [three, two.mul(three).sub(p.pow(2).mul(s))] : null;
      },
    },
    {
      id: '11.2-e03',
      level: 'extended',
      type: 'multi',
      stem: '给整式 $4x^{2}+1$ 加上一个单项式，使它成为某个整式的平方（单独的数、单项式也算整式）。这个单项式可以是（　　）',
      options: ['$4x$', '$-4x$', '$4x^{4}$', '$-1$', '$-4x^{2}$', '$2x$', '$x^{4}$', '$4x^{2}$'],
      answer: [0, 1, 2, 3, 4],
      explain: [
        '分三类想：加上的单项式当“中间项”、当“首项”，或者干脆消掉一项。',
        '当中间项：$4x^{2}+1=(2x)^{2}+1^{2}$，中间项是 $\\pm2\\cdot2x\\cdot1=\\pm4x$，得 $(2x\\pm1)^{2}$。A、B 可以。',
        '当首项：把 $4x^{2}$ 看成中间项 $2\\cdot2x^{2}\\cdot1$，首项是 $(2x^{2})^{2}=4x^{4}$，得 $(2x^{2}+1)^{2}=4x^{4}+4x^{2}+1$。C 可以。',
        '消掉一项：加 $-1$ 剩下 $4x^{2}=(2x)^{2}$，是单项式 $2x$ 的平方；加 $-4x^{2}$ 剩下 $1=1^{2}$，是数 $1$ 的平方。D、E 可以。',
        '加 $2x$：$(2x+\\frac12)^{2}=4x^{2}+2x+\\frac14$，常数项不对；加 $x^{4}$：$(x^{2}+2)^{2}$ 的中间项是 $4x^{2}$，但常数项是 $4$；加 $4x^{2}$ 得 $8x^{2}+1$，$8$ 不是整数的平方，$8x^{2}+1$ 也凑不出中间项。选 A、B、C、D、E。',
      ],
      verify: () => {
        const base = Poly.of('4x^2+1');
        const isSquare = p => {
          for (let a = -3; a <= 3; a++) {
            for (let b = -6; b <= 6; b++) {
              for (let c = -3; c <= 3; c++) {
                const q = Poly.of('x^2').scale(F(a)).add(Poly.of('x').scale(F(b).div(2))).add(F(c));
                if (q.pow(2).eq(p)) return true;
              }
            }
          }
          return false;
        };
        return ['4x', '-4x', '4x^4', '-1', '-4x^2', '2x', 'x^4', '4x^2'].map((m, i) => (isSquare(base.add(Poly.of(m))) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '11.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 和正方形 $CEFG$ 的边长分别为 $a$、$b$（$a>b$），$B$、$C$、$E$ 在同一条直线上，$G$ 在 $CD$ 上。连接 $BD$、$BF$，阴影部分是四边形 $BDGF$。若 $a+b=10$，$ab=18$，求阴影部分的面积。',
      figure: FIG112.twoSquares,
      blanks: [
        { kind: 'num', label: '阴影面积是', answer: '23' },
      ],
      explain: [
        '阴影 $=$ 两个正方形的面积 $-\\triangle ABD-\\triangle BEF$（左上角和下面两块空白都是三角形）。',
        '$\\triangle ABD$ 是大正方形的一半：$\\frac12a^{2}$；$\\triangle BEF$ 的直角边 $BE=a+b$，$EF=b$：$\\frac12b(a+b)$。',
        '阴影 $=a^{2}+b^{2}-\\frac12a^{2}-\\frac12ab-\\frac12b^{2}=\\frac12(a^{2}+b^{2}-ab)$。',
        '$a^{2}+b^{2}$ 用公式变形：$a^{2}+b^{2}=(a+b)^{2}-2ab=100-36=64$。',
        '阴影 $=\\frac12\\times(64-18)=23$。',
      ],
      verify: () => {
        // 坐标 B(0,0) D(a,a) G(a,b) F(a+b,b)，鞋带公式求面积，与 ½(a²+b²−ab) 对照后代入
        const area = (a, b) => {
          const pts = [[0, 0], [a, a], [a, b], [a + b, b]];
          let s = F(0);
          for (let i = 0; i < 4; i++) {
            const [x1, y1] = pts[i];
            const [x2, y2] = pts[(i + 1) % 4];
            s = s.add(F(x1 * y2 - x2 * y1));
          }
          return s.div(2);
        };
        const formula = Poly.of('1/2*(a^2+b^2-a*b)');
        const ok = [[7, 3], [5, 2], [9, 4]].every(([a, b]) => area(a, b).abs().eq(formula.at({ a: F(a), b: F(b) })));
        const s = F(10);
        const p = F(18);
        return ok ? s.pow(2).sub(p.mul(2)).sub(p).div(2) : null;
      },
    },
    {
      id: '11.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '(1) $(2+1)(2^{2}+1)(2^{4}+1)(2^{8}+1)(2^{16}+1)+1$ 的结果可以写成 $2^{n}$，求 $n$；(2) 计算 $\\left(1+\\frac{1}{2}\\right)\\left(1+\\frac{1}{2^{2}}\\right)\\left(1+\\frac{1}{2^{4}}\\right)\\left(1+\\frac{1}{2^{8}}\\right)$。',
      blanks: [
        { kind: 'num', label: '(1) $n=$', answer: '32' },
        { kind: 'num', label: '(2) 结果是', answer: '65535/32768' },
      ],
      explain: [
        '(1) 乘上一个 $(2-1)$（它等于 $1$，不改变结果），就能连续用平方差公式：',
        '$(2-1)(2+1)=2^{2}-1$，$(2^{2}-1)(2^{2}+1)=2^{4}-1$，……，$(2^{16}-1)(2^{16}+1)=2^{32}-1$。',
        '再加 $1$ 得 $2^{32}$，$n=32$。',
        '(2) 同样的办法，乘上 $\\left(1-\\frac12\\right)$，最后再除掉它（也就是乘 $2$）：',
        '$\\left(1-\\frac12\\right)\\times$ 原式 $=1-\\frac{1}{2^{16}}$，所以原式 $=2\\left(1-\\frac{1}{2^{16}}\\right)=2-\\frac{1}{2^{15}}=\\frac{65535}{32768}$。',
        '易错：乘了 $\\left(1-\\frac12\\right)$ 以后忘了再乘 $2$，得到 $1-\\frac{1}{2^{16}}$。',
      ],
      verify: () => {
        let p1 = F(1);
        let p2 = F(1);
        for (const k of [1, 2, 4, 8, 16]) p1 = p1.mul(F(2).pow(k).add(1));
        for (const k of [1, 2, 4, 8]) p2 = p2.mul(F(1).add(F(1).div(F(2).pow(k))));
        const v = p1.add(1);
        let n = 0;
        while (F(2).pow(n).cmp(v) < 0) n++;
        return [F(2).pow(n).eq(v) ? n : null, p2];
      },
    },
    {
      id: '11.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '(1) 已知 $a^{2}+2b^{2}+c^{2}-2ab-2bc=0$，且 $a+2b+3c=18$，求 $a$；(2) 已知 $x^{2}+2y^{2}+2z^{2}-2xy-2yz+4z+4=0$，求 $x+y+z$ 的值。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '3' },
        { kind: 'num', label: '(2) $x+y+z=$', answer: '-6' },
      ],
      explain: [
        '思路：把左边拆成几个完全平方的和。平方都不是负数，和为 $0$ 只能每个都是 $0$。',
        '(1) 把 $2b^{2}$ 拆成 $b^{2}+b^{2}$，分别和 $a$、$c$ 配对：$(a^{2}-2ab+b^{2})+(b^{2}-2bc+c^{2})=(a-b)^{2}+(b-c)^{2}=0$。',
        '所以 $a=b$，$b=c$，即 $a=b=c$。代入 $a+2b+3c=6a=18$，$a=3$。',
        '(2) 从含 $x$ 的项开始配：$x^{2}-2xy$ 需要一个 $y^{2}$，配成 $(x-y)^{2}$，$2y^{2}$ 还剩 $y^{2}$。',
        '剩下的 $y^{2}-2yz$ 需要一个 $z^{2}$，配成 $(y-z)^{2}$，$2z^{2}$ 还剩 $z^{2}$，和 $4z+4$ 配成 $(z+2)^{2}$。',
        '原式 $=(x-y)^{2}+(y-z)^{2}+(z+2)^{2}=0$，所以 $z=-2$，$y=z=-2$，$x=y=-2$，$x+y+z=-6$。',
        '易错：一开始把 $2y^{2}$ 全部用掉，或者先配 $z^{2}+4z+4$，后面就配不下去了。',
      ],
      verify: () => {
        const ok1 = Poly.of('a^2+2b^2+c^2-2a*b-2b*c').eq(Poly.of('(a-b)^2+(b-c)^2'));
        const P = Poly.of('x^2+2y^2+2z^2-2x*y-2y*z+4z+4');
        const ok2 = P.eq(Poly.of('(x-y)^2+(y-z)^2+(z+2)^2'));
        const sums = [];
        for (let x = -6; x <= 6; x++) {
          for (let y = -6; y <= 6; y++) {
            for (let z = -6; z <= 6; z++) if (P.at({ x: F(x), y: F(y), z: F(z) }).isZero()) sums.push(x + y + z);
          }
        }
        return [ok1 ? F(18).div(6) : null, ok2 && sums.length === 1 ? sums[0] : null];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '11.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $a+b+c=0$，$a^{2}+b^{2}+c^{2}=10$。求：(1) $ab+bc+ca$；(2) $a^{2}b^{2}+b^{2}c^{2}+c^{2}a^{2}$；(3) $a^{4}+b^{4}+c^{4}$。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '-5' },
        { kind: 'num', label: '(2)', answer: '25' },
        { kind: 'num', label: '(3)', answer: '50' },
      ],
      explain: [
        '(1) $(a+b+c)^{2}=a^{2}+b^{2}+c^{2}+2(ab+bc+ca)$，即 $0=10+2(ab+bc+ca)$，所以 $ab+bc+ca=-5$。',
        '(2) 关键：把 $ab$、$bc$、$ca$ 看成三个新的数，对它们再用一次三项的平方：',
        '$(ab+bc+ca)^{2}=a^{2}b^{2}+b^{2}c^{2}+c^{2}a^{2}+2(ab\\cdot bc+bc\\cdot ca+ca\\cdot ab)$。',
        '括号里 $ab\\cdot bc+bc\\cdot ca+ca\\cdot ab=ab^{2}c+abc^{2}+a^{2}bc=abc(a+b+c)=0$。所以 $a^{2}b^{2}+b^{2}c^{2}+c^{2}a^{2}=(-5)^{2}=25$。',
        '(3) 把 $a^{2}+b^{2}+c^{2}$ 平方：$100=a^{4}+b^{4}+c^{4}+2(a^{2}b^{2}+b^{2}c^{2}+c^{2}a^{2})$，所以 $a^{4}+b^{4}+c^{4}=100-50=50$。',
        '这三个数满足条件但都不是整数，没法猜出具体值，只能整体求。',
      ],
      verify: () => {
        // 用 c = −a−b 代入，核对三个结论都是 a²+b²+c² 的固定倍数
        const c = Poly.of('-a-b');
        const a = Poly.of('a');
        const b = Poly.of('b');
        const sq = a.pow(2).add(b.pow(2)).add(c.pow(2));
        const e2 = a.mul(b).add(b.mul(c)).add(c.mul(a));
        const pair = a.mul(b).pow(2).add(b.mul(c).pow(2)).add(c.mul(a).pow(2));
        const four = a.pow(4).add(b.pow(4)).add(c.pow(4));
        const S = F(10);
        const r1 = e2.add(sq.scale(F('1/2'))).size() === 0 ? S.div(-2) : null;
        const r2 = pair.sub(sq.pow(2).scale(F('1/4'))).size() === 0 ? S.pow(2).div(4) : null;
        const r3 = four.sub(sq.pow(2).scale(F('1/2'))).size() === 0 ? S.pow(2).div(2) : null;
        return [r1, r2, r3];
      },
    },
    {
      id: '11.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，长方形 $ABCD$ 中，$AB=6$，$BC=10$。点 $E$ 在 $AB$ 上，点 $F$ 在 $BC$ 上，$AE=BF=x$（$0<x<6$）。(1) 用含 $x$ 的式子表示 $\\triangle DEF$ 的面积；(2) $\\triangle DEF$ 的面积最小是多少？(3) 当 $\\triangle DEF$ 的面积为 $22$ 时，求 $x$（有几个就填几个，用逗号隔开）。',
      figure: FIG112.moving,
      blanks: [
        { kind: 'expr', label: '(1) 面积 $=$', answer: '1/2*x^2-5x+30', simplified: true },
        { kind: 'num', label: '(2) 最小面积是', answer: '35/2' },
        { kind: 'nums', label: '(3) $x=$', answer: ['2'] },
      ],
      explain: [
        '(1) 用长方形面积减去三个直角三角形：$\\triangle ADE$ 直角边 $AD=10$、$AE=x$，面积 $5x$；$\\triangle EBF$ 直角边 $EB=6-x$、$BF=x$，面积 $\\frac12x(6-x)=3x-\\frac12x^{2}$；$\\triangle FCD$ 直角边 $FC=10-x$、$CD=6$，面积 $30-3x$。',
        '$S=60-5x-\\left(3x-\\frac12x^{2}\\right)-(30-3x)=\\frac12x^{2}-5x+30$。',
        '(2) 凑成完全平方：$\\frac12x^{2}-5x+30=\\frac12(x^{2}-10x+25)-\\frac{25}{2}+30=\\frac12(x-5)^{2}+\\frac{35}{2}$。',
        '平方最小是 $0$，这时 $x=5$，在 $0<x<6$ 内，所以面积最小是 $\\frac{35}{2}$。',
        '(3) $\\frac12(x-5)^{2}+\\frac{35}{2}=22$，$(x-5)^{2}=9$。平方等于 $9$ 的数是 $3$ 和 $-3$，所以 $x-5=3$ 或 $-3$，$x=8$ 或 $2$。',
        '$x=8$ 时 $AE=8>AB=6$，点 $E$ 不在边 $AB$ 上，舍去，只有 $x=2$。只开出一个值会漏解，不检查范围会多解。',
      ],
      verify: () => {
        const S = Poly.of('60-5x-1/2*(6-x)*x-1/2*(10-x)*6');
        // 在 0<x<6 内按 1/100 步长找最小值，再找面积为 22 的点
        let min = null;
        for (let i = 1; i < 600; i++) {
          const v = S.at({ x: F(i).div(100) });
          if (!min || v.cmp(min) < 0) min = v;
        }
        const roots = [];
        for (let i = 1; i < 600; i++) if (S.at({ x: F(i).div(100) }).eq(F(22))) roots.push(i / 100);
        return [String(S), min, roots];
      },
    },
    {
      id: '11.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如果一个正整数能表示成两个连续正偶数的平方差，就把它叫作“神秘数”，例如 $12=4^{2}-2^{2}$。如果一个正整数能表示成两个正偶数（不要求连续）的平方差，就把它叫作“偶方差数”，例如 $32=6^{2}-2^{2}$。(1) $2020$ 是神秘数，$2020=m^{2}-(m-2)^{2}$，求 $m$；(2) 不超过 $200$ 的神秘数有几个？(3) 不超过 $200$ 的偶方差数有几个？',
      blanks: [
        { kind: 'num', label: '(1) $m=$', answer: '506' },
        { kind: 'num', label: '(2) 神秘数的个数', answer: '24' },
        { kind: 'num', label: '(3) 偶方差数的个数', answer: '35' },
      ],
      explain: [
        '(1) 设两个连续正偶数是 $2k+2$ 和 $2k$（$k$ 是正整数）：$(2k+2)^{2}-(2k)^{2}=(4k+2)\\times2=4(2k+1)$，神秘数就是“$4$ 乘一个不小于 $3$ 的奇数”。',
        '$2020=4\\times505$，$2k+1=505$，$k=252$，$m=2k+2=506$。',
        '(2) $4(2k+1)\\le200$，奇数 $2k+1$ 是 $3,5,\\ldots,49$，共 $24$ 个（$4=2^{2}-0^{2}$ 中 $0$ 不是正偶数，不算）。',
        '(3) 设两个正偶数是 $2p$、$2q$（$p>q\\ge1$）：$(2p)^{2}-(2q)^{2}=4(p+q)(p-q)$。关键看 $(p+q)(p-q)$ 能是哪些数：$p+q$ 与 $p-q$ 相差 $2q$，奇偶性相同。',
        '两个都是奇数：积是奇数，而且 $p+q>p-q\\ge1$，所以积至少是 $3$。反过来，任何不小于 $3$ 的奇数 $t$ 都取得到（$p-q=1$，$p+q=t$）。这一类正好是神秘数，$24$ 个。',
        '两个都是偶数：$p-q\\ge2$，$p+q\\ge4$，积是 $4$ 的倍数且至少是 $8$；任何 $4j$（$j\\ge2$）都取得到（$p-q=2$，$p+q=2j$）。偶方差数就是 $16j$，$16j\\le200$，$j=2,3,\\ldots,12$，共 $11$ 个。',
        '两类没有重复（一类是 $4\\times$ 奇数，一类是 $16$ 的倍数），共 $24+11=35$ 个。',
      ],
      verify: () => {
        const mystery = new Set();
        const even = new Set();
        let m2020 = null;
        for (let k = 1; k <= 600; k++) {
          const v = (2 * k + 2) ** 2 - (2 * k) ** 2;
          if (v <= 200) mystery.add(v);
          if (v === 2020) m2020 = 2 * k + 2;
        }
        for (let p = 2; p <= 100; p++) {
          for (let q = 1; q < p; q++) {
            const v = (2 * p) ** 2 - (2 * q) ** 2;
            if (v <= 200) even.add(v);
          }
        }
        return [m2020, mystery.size, even.size];
      },
    },
    {
      id: '11.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '观察：$1^{2}+1^{2}\\times2^{2}+2^{2}=9=3^{2}$，$2^{2}+2^{2}\\times3^{2}+3^{2}=49=7^{2}$，$3^{2}+3^{2}\\times4^{2}+4^{2}=169=13^{2}$，……(1) 对正整数 $n$，$n^{2}+n^{2}(n+1)^{2}+(n+1)^{2}$ 是哪个整式的平方？（写出这个整式，各项系数为正）(2) 整数 $a$（可以是负数）满足 $a^{2}+a^{2}(a+1)^{2}+(a+1)^{2}=961$，求 $a$（全部填出，用逗号隔开）；(3) 记 $P=2024^{2}+2024^{2}\\times2025^{2}+2025^{2}$，$Q=2025^{2}+2025^{2}\\times2026^{2}+2026^{2}$，求 $Q-P$。',
      blanks: [
        { kind: 'expr', label: '(1) 这个整式是', answer: 'n^2+n+1', simplified: true },
        { kind: 'nums', label: '(2) $a=$', answer: ['5', '-6'] },
        { kind: 'num', label: '(3) $Q-P=$', answer: '33215070600' },
      ],
      explain: [
        '(1) 猜：$3=1\\times2+1$，$7=2\\times3+1$，$13=3\\times4+1$，所以猜是 $n(n+1)+1=n^{2}+n+1$。',
        '证明：设 $t=n(n+1)=n^{2}+n$。$n^{2}+(n+1)^{2}=2n^{2}+2n+1=2t+1$，中间一项 $n^{2}(n+1)^{2}=t^{2}$，左边 $=t^{2}+2t+1=(t+1)^{2}$。这个证明对负整数 $n$ 也成立。',
        '(2) $961=31\\times31$，平方等于 $961$ 的数是 $31$ 和 $-31$，所以 $a^{2}+a+1=31$ 或 $-31$。',
        '$a^{2}+a+1=a(a+1)+1$，相邻两个整数的积不是负数，所以它至少是 $1$，不能是 $-31$。',
        '$a(a+1)=30$：相邻两个整数的积是 $30$，可以是 $5\\times6$，也可以是 $(-6)\\times(-5)$，所以 $a=5$ 或 $-6$。只考虑正整数会漏掉 $-6$。',
        '(3) 由 (1)，$P=N_{1}^{2}$，$Q=N_{2}^{2}$，其中 $N_{1}=2024\\times2025+1=4098601$，$N_{2}=2025\\times2026+1=4102651$。',
        '用平方差公式：$Q-P=(N_{2}-N_{1})(N_{2}+N_{1})$。$N_{2}-N_{1}=2025\\times(2026-2024)=4050$，$N_{2}+N_{1}=8201252$。',
        '$Q-P=4050\\times8201252=33215070600$。',
      ],
      verify: () => {
        const ok = Poly.of('n^2+n^2(n+1)^2+(n+1)^2').eq(Poly.of('(n^2+n+1)^2'));
        const v = n => n * n + n * n * (n + 1n) ** 2n + (n + 1n) ** 2n;
        const as = [];
        for (let k = -50; k <= 50; k++) if (v(BigInt(k)) === 961n) as.push(k);
        return [ok ? 'n^2+n+1' : null, as, Number(v(2025n) - v(2024n))];
      },
    },
    {
      id: '11.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 把 $(a+b)^{4}$ 写成 $[(a+b)^{2}]^{2}$，用乘法公式展开，$a^{2}b^{2}$ 的系数是多少？(2) 计算 $99^{4}$；(3) 计算 $2026^{4}-4\\times2026^{3}\\times2024+6\\times2026^{2}\\times2024^{2}-4\\times2026\\times2024^{3}+2024^{4}$。',
      blanks: [
        { kind: 'num', label: '(1) $a^{2}b^{2}$ 的系数是', answer: '6' },
        { kind: 'num', label: '(2) $99^{4}=$', answer: '96059601' },
        { kind: 'num', label: '(3) 结果是', answer: '16' },
      ],
      explain: [
        '(1) $(a+b)^{2}=a^{2}+2ab+b^{2}$，再平方，用三项的平方：$(a^{2}+2ab+b^{2})^{2}=a^{4}+4a^{2}b^{2}+b^{4}+2\\cdot a^{2}\\cdot2ab+2\\cdot2ab\\cdot b^{2}+2\\cdot a^{2}\\cdot b^{2}$。',
        '$a^{2}b^{2}$ 来自两处：$(2ab)^{2}=4a^{2}b^{2}$ 和 $2\\cdot a^{2}\\cdot b^{2}=2a^{2}b^{2}$，系数 $4+2=6$。',
        '整理得 $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$。把 $b$ 换成 $-b$，奇数次的项变号：$(a-b)^{4}=a^{4}-4a^{3}b+6a^{2}b^{2}-4ab^{3}+b^{4}$。',
        '(2) $99^{4}=(100-1)^{4}=10^{8}-4\\times10^{6}+6\\times10^{4}-4\\times10^{2}+1=100000000-4000000+60000-400+1=96059601$。注意 $-1$ 的奇数次方是负的。',
        '(3) 硬算不现实，观察结构：系数 $1,-4,6,-4,1$，$2026$ 的指数从 $4$ 降到 $0$，$2024$ 的指数从 $0$ 升到 $4$，正好是 $(a-b)^{4}$ 的展开式，$a=2026$，$b=2024$。',
        '原式 $=(2026-2024)^{4}=2^{4}=16$。',
      ],
      verify: () => {
        const p = Poly.of('((a+b)^2)^2');
        const a = 2026n;
        const b = 2024n;
        const v = a ** 4n - 4n * a ** 3n * b + 6n * a ** 2n * b ** 2n - 4n * a * b ** 3n + b ** 4n;
        return [p.coef('a^2b^2'), F(99).pow(4), Number(v)];
      },
    },
  ],
});
