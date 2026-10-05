'use strict';

// 上海数学七年级上册 · 12.1 因式分解的意义
// 知识范围：几个整式相乘，每个整式叫积的因式；把含多个项的整式化为几个次数更低的整式的积，叫因式分解；
//   因式分解要分解到每个因式都不能再分解为止；因式分解与整式乘法是互逆的变形，可以用整式乘法检验，
//   也可以把已知的乘法结果（单项式乘整式、平方差、完全平方、(x+a)(x+b)）倒过来写成积
// 可以使用：第 11 章全部内容（幂的运算、整式乘除、乘法公式）；第 10 章；六年级上下册全部内容（含整数的整除、质数、方程组）
// 还没学：提取公因式法、公式法、十字相乘法、分组分解这些“方法”的系统讲解（12.2），本节只用“乘法倒过来”和“设积再比较系数”；
//   分式（第 13 章）；负整数指数；开平方（八年级上册）；实数范围内的分解（八年级上册）
// 本节约定：因式分解在有理数范围内进行

Content.section({
  id: 'math/sh2024/g7s1/12.1',
  title: '因式分解的意义',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 4, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核四轮。第 1 轮 b09 选项“每个因式次数都比原式低”与 3(x^2−1) 这类写法矛盾、答案不定，c04（平方和恒等式）能硬算且与和化积无关，c01 条件不起作用、与 c02 同为因数对枚举，扩展档缺 5 级；第 2 轮 b09 换选项、c04 改 a≠b 相减写成积、c02 去提示改为乘 2 才能写成积、e06 加 n^5−n，c01（连续平方差求约数）是经典题且两问同法被打回；第 3 轮 c01 改作差比大小，因给出 (a+b)(a−b)^k 形式等于白送、第 (3) 问与 b07 同答案被打回；第 4 轮 c01 去掉形式提示、按 a+b 正负分类后判定整节通过。b01、b02、b09 是概念辨析题，没有 verify' },

  intro: [
    {
      title: '因式和因式分解',
      body: '几个整式相乘，每个整式都叫作积的**因式**。把一个含多个项的整式化成几个次数更低的整式的**积**，叫作把这个整式**因式分解**。',
      example: '$3m^{2}-6m=3m(m-2)$，$3m$ 和 $m-2$ 都是 $3m^{2}-6m$ 的因式。',
    },
    {
      title: '和整式乘法互逆',
      body: '整式乘法是把积化成和，因式分解是把和化成积，方向正好相反。所以学过的乘法结果倒过来写，就是因式分解；分解完也可以用乘法检验对不对。',
      example: '$(y+4)(y-1)=y^{2}+3y-4$，所以 $y^{2}+3y-4=(y+4)(y-1)$。',
    },
    {
      title: '怎样判断是不是因式分解',
      body: '看三点：左边是含多个项的整式；右边是几个**整式**的积，整个右边是一个乘积，不能是“积再加减一项”；左右两边相等。',
      pitfall: '单个单项式写成两个单项式的积，不叫因式分解；右边出现分母里含字母的式子，也不是整式的积。',
    },
    {
      title: '分解要彻底',
      body: '分解到每个因式都不能再分解为止。分出一步以后，要再看看每个括号里还能不能继续分。',
      example: '$2a^{3}+4a^{2}+2a=2a(a^{2}+2a+1)=2a(a+1)^{2}$。',
    },
    {
      title: '因式和取值',
      body: '如果整式 $P$ 等于 $(x-a)$ 乘另一个整式，那么 $x=a$ 时 $x-a=0$，$P$ 的值也是 $0$。反过来可以用“代入看值是不是 $0$”来求参数。',
      example: '$x^{2}-7x+12$ 在 $x=3$ 时值为 $0$，它确实等于 $(x-3)(x-4)$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '12.1-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列从左到右的变形中，是因式分解的有（　　）',
      options: [
        '$(x+2)(x-2)=x^{2}-4$',
        '$x^{2}-4+3x=(x+2)(x-2)+3x$',
        '$x^{2}-6x+9=(x-3)^{2}$',
        '$2x^{2}+4x=2x(x+2)$',
        '$x^{2}+1=x\\left(x+\\frac{1}{x}\\right)$',
        '$12a^{2}b=3a\\cdot4ab$',
      ],
      answer: [2, 3],
      explain: [
        'A：从左到右是整式乘法，方向反了。',
        'B：右边是“积 $+3x$”，整体不是积。',
        'C：右边是 $(x-3)(x-3)$，两个整式的积，是因式分解。',
        'D：右边是 $2x$ 与 $x+2$ 的积，是因式分解。',
        'E：$\\frac1x$ 的分母里有字母，$x+\\frac1x$ 不是整式。',
        'F：左边是单项式，不是含多个项的整式。选 C、D。',
      ],
    },
    {
      id: '12.1-b02',
      level: 'basic',
      type: 'choice',
      stem: '下列因式分解中，结果已经分解彻底的是（　　）',
      options: [
        '$x^{4}-1=(x^{2}+1)(x^{2}-1)$',
        '$x^{2}y-y=y(x^{2}-1)$',
        '$a^{3}-a=a(a+1)(a-1)$',
        '$x^{2}-2x+1=x(x-2)+1$',
      ],
      answer: 2,
      explain: [
        'A：$x^{2}-1$ 还能写成 $(x+1)(x-1)$，没有分解完。',
        'B：$x^{2}-1$ 同样还能再分，应为 $y(x+1)(x-1)$。',
        'C：$a$、$a+1$、$a-1$ 都是一次式，不能再分，彻底。',
        'D：右边是“积 $+1$”，根本不是因式分解，应为 $(x-1)^{2}$。选 C。',
      ],
    },
    {
      id: '12.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '整式 $x^{2}+ax+b$ 因式分解的结果是 $(x+3)(x-5)$，求 $a$、$b$。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '-2' },
        { kind: 'num', label: '$b=$', answer: '-15' },
      ],
      explain: [
        '因式分解和整式乘法互逆，把右边乘出来：$(x+3)(x-5)=x^{2}-5x+3x-15=x^{2}-2x-15$。',
        '对照 $x^{2}+ax+b$：$a=-2$，$b=-15$。',
        '常见错误：$a$ 写成 $3+5=8$ 或 $2$，没有带符号算 $3+(-5)$。',
      ],
      verify: () => {
        const p = Poly.of('(x+3)(x-5)');
        return [p.coef('x'), p.coef('')];
      },
    },
    {
      id: '12.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '整式 $2x^{2}+mx-6$ 因式分解的结果是 $(2x+3)(x+n)$，求 $m$、$n$。',
      blanks: [
        { kind: 'num', label: '$m=$', answer: '-1' },
        { kind: 'num', label: '$n=$', answer: '-2' },
      ],
      explain: [
        '展开右边：$(2x+3)(x+n)=2x^{2}+2nx+3x+3n=2x^{2}+(2n+3)x+3n$。',
        '常数项：$3n=-6$，$n=-2$；一次项：$m=2n+3=-1$。',
        '常见错误：一次项只写 $2n$ 或 $3$，漏了另一部分。',
      ],
      verify: () => {
        for (let n = -10; n <= 10; n++) {
          const p = Poly.of('2x+3').mul(Poly.of('x').add(n));
          if (p.coef('').eq(F(-6))) return [p.coef('x'), n];
        }
        return null;
      },
    },
    {
      id: '12.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '在括号里填上适当的整式，使等式成立：(1) $x^{2}-9y^{2}=(x+3y)(\\quad)$；(2) $-4a^{2}+1=(1+2a)(\\quad)$。',
      blanks: [
        { kind: 'expr', label: '(1)', answer: 'x-3y', simplified: true },
        { kind: 'expr', label: '(2)', answer: '1-2a', simplified: true },
      ],
      explain: [
        '(1) 由平方差公式倒过来：$x^{2}-(3y)^{2}=(x+3y)(x-3y)$。',
        '(2) 先调换顺序：$-4a^{2}+1=1-(2a)^{2}=(1+2a)(1-2a)$。',
        '常见错误：(2) 填成 $2a-1$，乘出来是 $4a^{2}-1$，符号反了。可以用乘法检验。',
      ],
      verify: () => {
        // 在 px+qy、p+qa 里找使等式成立的因式
        let f1 = null;
        let f2 = null;
        for (let p = -5; p <= 5; p++) {
          for (let q = -5; q <= 5; q++) {
            const c1 = Poly.of('x').scale(p).add(Poly.of('y').scale(q));
            if (Poly.of('x+3y').mul(c1).eq(Poly.of('x^2-9y^2'))) f1 = String(c1);
            const c2 = Poly.num(p).add(Poly.of('a').scale(q));
            if (Poly.of('1+2a').mul(c2).eq(Poly.of('-4a^2+1'))) f2 = String(c2);
          }
        }
        return [f1, f2];
      },
    },
    {
      id: '12.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '$x-2$ 是整式 $x^{2}+kx-6$ 的一个因式。求 $k$，并写出它的另一个因式 $x+c$ 中的 $c$。',
      blanks: [
        { kind: 'num', label: '$k=$', answer: '1' },
        { kind: 'num', label: '$c=$', answer: '3' },
      ],
      explain: [
        '方法一：$x^{2}+kx-6=(x-2)(x+c)$，展开右边 $x^{2}+(c-2)x-2c$。常数项 $-2c=-6$，$c=3$；$k=c-2=1$。',
        '方法二：$x=2$ 时右边是 $0$，所以 $4+2k-6=0$，$k=1$。',
        '检验：$(x-2)(x+3)=x^{2}+x-6$。常见错误是常数项符号弄反，得 $c=-3$。',
      ],
      verify: () => {
        for (let c = -10; c <= 10; c++) {
          const p = Poly.of('x-2').mul(Poly.of('x').add(c));
          if (p.coef('').eq(F(-6))) return [p.coef('x'), c];
        }
        return null;
      },
    },
    {
      id: '12.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '把式子写成积再计算：(1) $99^{2}+99$；(2) $2025^{2}-2024^{2}$。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '9900' },
        { kind: 'num', label: '(2)', answer: '4049' },
      ],
      explain: [
        '(1) 由 $a(a+1)=a^{2}+a$ 倒过来：$99^{2}+99=99\\times(99+1)=99\\times100=9900$。',
        '(2) 由平方差公式倒过来：$2025^{2}-2024^{2}=(2025+2024)(2025-2024)=4049\\times1=4049$。',
        '常见错误：(1) 写成 $99\\times99+1$；(2) 以为差是 $1$。',
      ],
      verify: () => [F(99).pow(2).add(99), F(2025).pow(2).sub(F(2024).pow(2))],
    },
    {
      id: '12.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '已知 $x+y=4$，$x^{2}-y^{2}=12$，求 $x-y$ 和 $x$ 的值。',
      blanks: [
        { kind: 'num', label: '$x-y=$', answer: '3' },
        { kind: 'num', label: '$x=$', answer: '7/2' },
      ],
      explain: [
        '把 $x^{2}-y^{2}$ 写成积：$x^{2}-y^{2}=(x+y)(x-y)$。',
        '$4(x-y)=12$，$x-y=3$。',
        '再和 $x+y=4$ 相加：$2x=7$，$x=\\frac72$。',
        '常见错误：以为 $x^{2}-y^{2}=(x-y)^{2}$，得 $x-y=\\pm\\ldots$ 算不下去。',
      ],
      verify: () => {
        const ok = Poly.of('x^2-y^2').eq(Poly.of('(x+y)(x-y)'));
        const d = F(12).div(4);
        return ok ? [d, F(4).add(d).div(2)] : null;
      },
    },
    {
      id: '12.1-b09',
      level: 'basic',
      type: 'multi',
      stem: '下列说法正确的有（　　）',
      options: [
        '因式分解和整式乘法是方向相反的变形',
        '$x^{2}-4x=x(x-4)$，$x$ 和 $x-4$ 都是 $x^{2}-4x$ 的因式',
        '因式分解的结果只能是两个整式的积',
        '$3x^{2}-3=3(x^{2}-1)$ 已经分解彻底',
        '单项式 $6x^{2}y$ 可以因式分解为 $2x\\cdot3xy$',
      ],
      answer: [0, 1],
      explain: [
        'A：整式乘法把积化成和，因式分解把和化成积，互逆，正确。',
        'B：积里的每个整式都是因式，正确。',
        'C：可以是几个整式的积，比如 $a^{3}-a=a(a+1)(a-1)$ 是三个，错误。',
        'D：$x^{2}-1=(x+1)(x-1)$ 还能再分，错误。',
        'E：因式分解的对象是含多个项的整式，单项式不谈因式分解，错误。选 A、B。',
      ],
    },

    // ---------- 扩展 ----------
    {
      id: '12.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '分解 $x^{2}+ax+b$ 时，甲看错了 $a$，分解成 $(x+1)(x+9)$；乙看错了 $b$，分解成 $(x-2)(x-4)$。求 $a$、$b$，并把原式正确地分解成 $(x+p)(x+q)$（$p\\le q$），求 $p$、$q$。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '-6' },
        { kind: 'num', label: '$b=$', answer: '9' },
        { kind: 'num', label: '$p=$', answer: '-3' },
        { kind: 'num', label: '$q=$', answer: '-3' },
      ],
      explain: [
        '甲看错的是 $a$，他算出的常数项是对的：$(x+1)(x+9)=x^{2}+10x+9$，所以 $b=9$。',
        '乙看错的是 $b$，他的一次项系数是对的：$(x-2)(x-4)=x^{2}-6x+8$，所以 $a=-6$。',
        '原式 $=x^{2}-6x+9$。要 $pq=9$、$p+q=-6$，两个数都是 $-3$：$x^{2}-6x+9=(x-3)(x-3)=(x-3)^{2}$，$p=q=-3$。',
        '常见错误：把对错弄反，用甲的一次项、乙的常数项，得 $x^{2}+10x+8$。',
      ],
      verify: () => {
        const jia = Poly.of('(x+1)(x+9)');
        const yi = Poly.of('(x-2)(x-4)');
        const a = yi.coef('x');
        const b = jia.coef('');
        const target = Poly.of('x^2').add(Poly.of('x').scale(a)).add(b);
        for (let p = -10; p <= 10; p++) {
          for (let q = p; q <= 10; q++) if (Poly.of('x').add(p).mul(Poly.of('x').add(q)).eq(target)) return [a, b, p, q];
        }
        return null;
      },
    },
    {
      id: '12.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '整式 $x^{3}+ax^{2}+bx-6$ 有因式 $x-1$ 和 $x+2$。求 $a$、$b$，以及它的第三个因式 $x+c$ 中的 $c$。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '4' },
        { kind: 'num', label: '$b=$', answer: '1' },
        { kind: 'num', label: '$c=$', answer: '3' },
      ],
      explain: [
        '整式等于 $(x-1)$ 乘一个整式，所以 $x=1$ 时值为 $0$：$1+a+b-6=0$，$a+b=5$。',
        '同理 $x=-2$ 时值为 $0$：$-8+4a-2b-6=0$，$2a-b=7$。',
        '两式相加：$3a=12$，$a=4$，$b=1$。',
        '原式 $=(x-1)(x+2)(x+c)$，比较常数项：$(-1)\\times2\\times c=-6$，$c=3$。检验：$(x^{2}+x-2)(x+3)=x^{3}+4x^{2}+x-6$。',
      ],
      verify: () => {
        for (let c = -10; c <= 10; c++) {
          const p = Poly.of('(x-1)(x+2)').mul(Poly.of('x').add(c));
          if (p.coef('').eq(F(-6))) return [p.coef('x^2'), p.coef('x'), c];
        }
        return null;
      },
    },
    {
      id: '12.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '(1) $5^{23}-5^{21}$ 可以写成 $120\\times5^{n}$，求 $n$；(2) $2^{2026}-2^{2025}-2^{2024}$ 可以写成 $2^{m}$，求 $m$。',
      blanks: [
        { kind: 'num', label: '(1) $n=$', answer: '20' },
        { kind: 'num', label: '(2) $m=$', answer: '2024' },
      ],
      explain: [
        '思路：把和差写成积，看出因数。',
        '(1) $5^{23}=5^{21}\\times25$，所以 $5^{23}-5^{21}=5^{21}\\times(25-1)=24\\times5^{21}=24\\times5\\times5^{20}=120\\times5^{20}$，$n=20$。这也说明它一定能被 $120$ 整除。',
        '(2) $2^{2026}=2^{2024}\\times4$，$2^{2025}=2^{2024}\\times2$，原式 $=2^{2024}\\times(4-2-1)=2^{2024}$，$m=2024$。',
        '常见错误：(1) 写成 $5^{2}$ 的差，以为 $n=21$；(2) 以为指数相减。',
      ],
      verify: () => {
        let n = null;
        let m = null;
        const v1 = 5n ** 23n - 5n ** 21n;
        const v2 = 2n ** 2026n - 2n ** 2025n - 2n ** 2024n;
        for (let k = 0; k <= 30; k++) if (120n * 5n ** BigInt(k) === v1) n = k;
        for (let k = 2000; k <= 2030; k++) if (2n ** BigInt(k) === v2) m = k;
        return [n, m];
      },
    },
    {
      id: '12.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x^{2}+x-1=0$，求 $x^{3}+2x^{2}+2025$ 的值。',
      blanks: [
        { kind: 'num', label: '值是', answer: '2026' },
      ],
      explain: [
        '由条件 $x^{2}+x=1$。思路：从高次项里凑出 $x^{2}+x$，降低次数。',
        '$x^{3}+2x^{2}=x^{3}+x^{2}+x^{2}=x(x^{2}+x)+x^{2}=x\\cdot1+x^{2}=x^{2}+x=1$。',
        '原式 $=1+2025=2026$。',
        '常见错误：想先求出 $x$ 的值，这里求不出来；或者凑的时候把 $2x^{2}$ 全部用掉。',
      ],
      verify: () => {
        // x^3+2x^2 − (x+1)(x^2+x−1) 应该是常数，代入 x^2+x=1
        const rest = Poly.of('x^3+2x^2').sub(Poly.of('(x+1)(x^2+x-1)'));
        return rest.deg() === 0 ? rest.at({}).add(2025) : null;
      },
    },
    {
      id: '12.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '一个长方形的长为 $a$、宽为 $b$，周长是 $14$，面积是 $10$。求 $a^{2}b+ab^{2}$ 和 $a^{3}b+ab^{3}$ 的值。',
      blanks: [
        { kind: 'num', label: '$a^{2}b+ab^{2}=$', answer: '70' },
        { kind: 'num', label: '$a^{3}b+ab^{3}=$', answer: '290' },
      ],
      explain: [
        '条件给的是 $a+b=7$（周长的一半）和 $ab=10$。把要求的式子写成积，就能用上它们。',
        '$a^{2}b+ab^{2}=ab(a+b)=10\\times7=70$。',
        '$a^{3}b+ab^{3}=ab(a^{2}+b^{2})$，而 $a^{2}+b^{2}=(a+b)^{2}-2ab=49-20=29$，所以等于 $10\\times29=290$。',
        '常见错误：把周长 $14$ 直接当成 $a+b$。',
      ],
      verify: () => {
        const ok1 = Poly.of('a^2b+a*b^2').eq(Poly.of('a*b(a+b)'));
        const ok2 = Poly.of('a^3b+a*b^3').eq(Poly.of('a*b((a+b)^2-2a*b)'));
        const s = F(7);
        const p = F(10);
        return ok1 && ok2 ? [p.mul(s), p.mul(s.pow(2).sub(p.mul(2)))] : null;
      },
    },
    {
      id: '12.1-e06',
      level: 'extended',
      type: 'multi',
      stem: '$n$ 是任意整数（负数、$0$ 也算；一个整数除以另一个非零整数，商是整数就叫整除）。下列说法一定正确的有（　　）',
      options: [
        '$n^{2}+n$ 是偶数',
        '$(2n+1)^{2}-1$ 能被 $8$ 整除',
        '$n^{3}-n$ 能被 $6$ 整除',
        '$n^{2}+3n+2$ 能被 $6$ 整除',
        '$(2n+1)^{2}-(2n-1)^{2}$ 能被 $16$ 整除',
        '$n^{5}-n$ 能被 $5$ 整除',
      ],
      answer: [0, 1, 2, 5],
      explain: [
        '思路：写成积，看因数。',
        'A：$n^{2}+n=n(n+1)$，相邻两个整数里一定有偶数，正确。',
        'B：$(2n+1)^{2}-1=4n^{2}+4n=4n(n+1)$，$n(n+1)$ 是偶数，所以是 $8$ 的倍数，正确。',
        'C：$n^{3}-n=n(n^{2}-1)=(n-1)n(n+1)$，连续三个整数里有偶数，也有 $3$ 的倍数，正确。',
        'D：$n^{2}+3n+2=(n+1)(n+2)$ 只是两个连续整数的积，$n=0$ 时是 $2$，错误。E：等于 $8n$，$n=1$ 时是 $8$，错误。',
        'F：$n^{5}-n=n(n^{4}-1)=n(n^{2}+1)(n+1)(n-1)$。按 $n$ 除以 $5$ 的余数分类，写成 $n=5k+r$（$k$ 是整数，$r=0,1,2,3,4$）：$r=0$ 时 $n$ 是 $5$ 的倍数；$r=1$ 时 $n-1=5k$；$r=4$ 时 $n+1=5(k+1)$；$r=2$ 时 $n^{2}+1=25k^{2}+20k+5$；$r=3$ 时 $n^{2}+1=25k^{2}+30k+10$。每种都有一个因式是 $5$ 的倍数，正确。选 A、B、C、F。',
      ],
      verify: () => {
        const tests = [
          n => (n * n + n) % 2 === 0,
          n => ((2 * n + 1) ** 2 - 1) % 8 === 0,
          n => (n ** 3 - n) % 6 === 0,
          n => (n * n + 3 * n + 2) % 6 === 0,
          n => ((2 * n + 1) ** 2 - (2 * n - 1) ** 2) % 16 === 0,
          n => (n ** 5 - n) % 5 === 0,
        ];
        const ns = [];
        for (let n = -30; n <= 30; n++) ns.push(n);
        return tests.map((t, i) => (ns.every(t) ? i : -1)).filter(i => i >= 0);
      },
    },

    // ---------- 挑战 ----------
    {
      id: '12.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '$M=a^{3}-a^{2}b-ab^{2}+b^{3}$ 能写成几个形如 $a+mb$（$m$ 是数）的一次整式的积。(1) 这些一次因式里 $m$ 的所有可能值是多少？（全部填出，用逗号隔开）其中有一个因式出现了几次？(2) 比较 $a^{3}+b^{3}$ 与 $a^{2}b+ab^{2}$ 的大小：当 $a+b>0$ 且 $a\\ne b$ 时，以及当 $a+b<0$ 且 $a\\ne b$ 时；(3) $P=2027^{3}+2024^{3}$，$Q=2027^{2}\\times2024+2027\\times2024^{2}$，求 $P-Q$。',
      blanks: [
        { kind: 'nums', label: '(1) $m=$', answer: ['1', '-1'] },
        { kind: 'num', label: '重复的因式出现的次数', answer: '2' },
        { kind: 'text', label: '(2) $a+b>0$ 时：$a^{3}+b^{3}$ ○ $a^{2}b+ab^{2}$', answer: '>', options: ['>', '<', '='] },
        { kind: 'text', label: '$a+b<0$ 时：$a^{3}+b^{3}$ ○ $a^{2}b+ab^{2}$', answer: '<', options: ['>', '<', '='] },
        { kind: 'num', label: '(3) $P-Q=$', answer: '36459' },
      ],
      explain: [
        '(1) 用“因式和取值”找因式：$M$ 有因式 $a+mb$，那么 $a=-mb$ 时 $M=0$。',
        '试 $a=b$：$M=b^{3}-b^{3}-b^{3}+b^{3}=0$，所以有因式 $a-b$（$m=-1$）。试 $a=-b$：$M=-b^{3}-b^{3}+b^{3}+b^{3}=0$，所以有因式 $a+b$（$m=1$）。',
        '$M$ 是三次的，还差一个一次因式。设 $M=(a-b)(a+b)(a+nb)=(a^{2}-b^{2})(a+nb)=a^{3}+na^{2}b-ab^{2}-nb^{3}$，对照 $a^{2}b$ 的系数 $n=-1$（检验 $b^{3}$ 的系数 $-n=1$ 也对）。',
        '所以 $M=(a+b)(a-b)^{2}$，$m$ 只有 $1$ 和 $-1$，$a-b$ 出现了 $2$ 次。',
        '(2) 两式之差正好是 $M=(a+b)(a-b)^{2}$。$a\\ne b$ 时 $(a-b)^{2}$ 是正数，所以差的符号和 $a+b$ 相同：$a+b>0$ 时差为正，$a^{3}+b^{3}>a^{2}b+ab^{2}$；$a+b<0$ 时差为负，$a^{3}+b^{3}<a^{2}b+ab^{2}$。（$a=b$ 或 $a+b=0$ 时两边相等。）',
        '(3) $P-Q$ 就是 $a=2027$、$b=2024$ 时的 $M$：$(2027+2024)\\times(2027-2024)^{2}=4051\\times9=36459$。',
        '易错：(1) 只找到一个因式就停，或者以为三个因式各不相同；(2) 不分 $a+b$ 的正负，一律认为 $a^{3}+b^{3}$ 大；(3) 忘了平方，算成 $4051\\times3$。',
      ],
      verify: () => {
        const M = Poly.of('a^3-a^2b-a*b^2+b^3');
        const ms = [];
        for (let i = -12; i <= 12; i++) {
          const m = F(i).div(4);
          if (M.at({ a: m.neg(), b: F(1) }).isZero()) ms.push(m);
        }
        let times = null;
        for (let t = 1; t <= 3; t++) if (M.eq(Poly.of('a+b').mul(Poly.of('a-b').pow(t)))) times = t;
        const sign = cond => {
          const seen = new Set();
          for (let i = -8; i <= 8; i++) {
            for (let j = -8; j <= 8; j++) {
              if (i === j || !cond(i + j)) continue;
              const d = M.at({ a: F(i), b: F(j) });
              seen.add(d.cmp(F(0)) > 0 ? '>' : d.cmp(F(0)) < 0 ? '<' : '=');
            }
          }
          return seen.size === 1 ? [...seen][0] : null;
        };
        const a = 2027n;
        const b = 2024n;
        return [ms, times, sign(s => s > 0), sign(s => s < 0), Number(a ** 3n + b ** 3n - a * a * b - a * b * b)];
      },
    },
    {
      id: '12.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 方程 $2xy-x-3y=3$ 有几组正整数解？(2) 在这些解中，$xy$ 最大是多少？',
      blanks: [
        { kind: 'num', label: '(1) 组数', answer: '3' },
        { kind: 'num', label: '(2) 最大是', answer: '10' },
      ],
      explain: [
        '思路：左边是“和”，不好找整数解；设法写成“积 $=$ 数”，就能用约数。',
        '试 $(2x+p)(y+q)$ 展开得 $2xy+2qx+py+pq$，要 $2q=-1$，$q$ 不是整数。先两边乘 $2$：$4xy-2x-6y=6$。',
        '$(2x-3)(2y-1)=4xy-2x-6y+3$，所以两边再加 $3$：$(2x-3)(2y-1)=9$。',
        '$x$、$y$ 是正整数，$2x-3\\ge-1$，$2y-1\\ge1$，所以两个因数都是正的：$(1,9)$、$(3,3)$、$(9,1)$。',
        '得 $(x,y)=(2,5)$、$(3,2)$、$(6,1)$，共 $3$ 组。$xy$ 分别是 $10$、$6$、$6$，最大是 $10$。',
        '易错：不乘 $2$ 就硬凑，凑不出积；或者忘了 $2y-1\\ge1$，把负因数也算进去。',
      ],
      verify: () => {
        const sols = [];
        for (let x = 1; x <= 100; x++) {
          for (let y = 1; y <= 100; y++) if (2 * x * y - x - 3 * y === 3) sols.push(x * y);
        }
        return [sols.length, Math.max(...sols)];
      },
    },
    {
      id: '12.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '(1) $x$ 是整数，$x^{2}-5x+6$ 的值是质数，求 $x$ 的所有可能值（全部填出，用逗号隔开）；(2) $x$ 是整数，使 $x^{2}-4x-12$ 的值是质数的 $x$ 有几个？',
      blanks: [
        { kind: 'nums', label: '(1) $x=$', answer: ['1', '4'] },
        { kind: 'num', label: '(2) 个数', answer: '0' },
      ],
      explain: [
        '思路：先写成积。一个质数 $p$ 写成两个整数的积，只能是 $1\\times p$ 或 $(-1)\\times(-p)$，所以其中一个因数必须是 $1$ 或 $-1$。',
        '(1) 由 $(x-2)(x-3)=x^{2}-5x+6$，两个因数相差 $1$。',
        '$x-2=1$：另一个是 $0$，积是 $0$；$x-3=1$：$x=4$，积是 $2\\times1=2$，是质数；$x-2=-1$：$x=1$，积是 $(-1)\\times(-2)=2$，是质数；$x-3=-1$：另一个是 $0$。所以 $x=1$ 或 $4$。',
        '(2) 由 $(x-6)(x+2)=x^{2}-4x-12$，两个因数相差 $8$。',
        '$x-6=1$：积 $1\\times9=9$，不是质数；$x+2=1$：积 $(-7)\\times1=-7$，是负数；$x-6=-1$：积 $(-1)\\times7=-7$；$x+2=-1$：积 $(-9)\\times(-1)=9$。',
        '四种都不行，所以一个也没有。易错：只看到“有一个因数是 $\\pm1$”就以为一定是质数，没检验另一个因数和积的正负。',
      ],
      verify: () => {
        const isPrime = v => v > 1 && [...Array(Math.floor(Math.sqrt(v)) + 1).keys()].slice(2).every(d => v % d !== 0);
        const xs1 = [];
        let n2 = 0;
        for (let x = -200; x <= 200; x++) {
          if (isPrime(x * x - 5 * x + 6)) xs1.push(x);
          if (isPrime(x * x - 4 * x - 12)) n2++;
        }
        return [xs1, n2];
      },
    },
    {
      id: '12.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '$a\\ne b$，且 $a^{2}-3a=1$，$b^{2}-3b=1$。求：(1) $a+b$；(2) $ab$；(3) $a^{3}+b^{3}$。',
      blanks: [
        { kind: 'num', label: '(1) $a+b=$', answer: '3' },
        { kind: 'num', label: '(2) $ab=$', answer: '-1' },
        { kind: 'num', label: '(3) $a^{3}+b^{3}=$', answer: '36' },
      ],
      explain: [
        '思路：$a$、$b$ 求不出具体值（不是整数也不是分数），但两个式子结构一样，相减后可以写成积。',
        '(1) 两式相减：$a^{2}-b^{2}-3a+3b=0$。左边写成积：$(a-b)(a+b)-3(a-b)=(a-b)(a+b-3)$（展开验证即可）。',
        '$(a-b)(a+b-3)=0$，两个数的积是 $0$，至少有一个是 $0$。$a\\ne b$，$a-b\\ne0$，所以 $a+b-3=0$，$a+b=3$。',
        '(2) 两式相加：$a^{2}+b^{2}-3(a+b)=2$，$a^{2}+b^{2}=2+9=11$。由 $(a+b)^{2}=a^{2}+b^{2}+2ab$：$9=11+2ab$，$ab=-1$。',
        '(3) $a^{3}+b^{3}=(a+b)(a^{2}-ab+b^{2})=3\\times(11+1)=36$。',
        '易错：相减后直接两边“除以 $a-b$”而不说明 $a-b\\ne0$；或者把 $a^{2}+b^{2}$ 当成 $(a+b)^{2}$。',
      ],
      verify: () => {
        const ok = Poly.of('(a^2-3a)-(b^2-3b)').eq(Poly.of('(a-b)(a+b-3)'));
        const okCube = Poly.of('a^3+b^3').eq(Poly.of('(a+b)((a+b)^2-3a*b)'));
        const s = F(3);
        const sq = F(2).add(s.mul(3));
        const p = s.pow(2).sub(sq).div(2);
        return ok && okCube ? [s, p, s.mul(s.pow(2).sub(p.mul(3)))] : null;
      },
    },
    {
      id: '12.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '(1) $n(n+1)(n+2)-(n-1)n(n+1)$ 可以写成 $k\\cdot n(n+1)$，求 $k$；(2) 计算 $1\\times2+2\\times3+3\\times4+\\cdots+99\\times100$；(3) 计算 $1\\times2\\times3+2\\times3\\times4+\\cdots+20\\times21\\times22$。',
      blanks: [
        { kind: 'num', label: '(1) $k=$', answer: '3' },
        { kind: 'num', label: '(2)', answer: '333300' },
        { kind: 'num', label: '(3)', answer: '53130' },
      ],
      explain: [
        '(1) 两项都含因式 $n(n+1)$，写成积：$n(n+1)[(n+2)-(n-1)]=3n(n+1)$，$k=3$。',
        '(2) 由 (1)，$n(n+1)=\\frac13[n(n+1)(n+2)-(n-1)n(n+1)]$，每一项写成两个相邻“三连乘”之差。',
        '求和时中间全部抵消：$1\\times2+\\cdots+99\\times100=\\frac13[99\\times100\\times101-0\\times1\\times2]=\\frac{999900}{3}=333300$。',
        '(3) 推广：同样有 $n(n+1)(n+2)(n+3)-(n-1)n(n+1)(n+2)=n(n+1)(n+2)[(n+3)-(n-1)]=4n(n+1)(n+2)$。',
        '所以和 $=\\frac14\\times20\\times21\\times22\\times23=\\frac{212520}{4}=53130$。',
        '关键在 (1)：把差写成积，才看出每一项能“拆成两个相邻的数之差”，从而首尾相消。',
      ],
      verify: () => {
        const d = Poly.of('n(n+1)(n+2)-(n-1)n(n+1)');
        let k = null;
        for (let t = 1; t <= 6; t++) if (d.eq(Poly.of('n(n+1)').scale(t))) k = t;
        let s2 = 0;
        for (let n = 1; n <= 99; n++) s2 += n * (n + 1);
        let s3 = 0;
        for (let n = 1; n <= 20; n++) s3 += n * (n + 1) * (n + 2);
        return [k, s2, s3];
      },
    },
  ],
});
