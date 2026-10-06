'use strict';

// 上海数学八年级上册 · 21.2 一元二次方程的解法
// 知识范围：因式分解法（A·B=0 ⇒ A=0 或 B=0）；利用平方根的定义两边开平方（x²=d：d>0 两个不等实根，d=0 两个相等实根，d<0 没有实数根；
//   (x+m)²=d 把 x+m 看成整体）；配方法（二次项系数化为 1，两边加一次项系数一半的平方）；求根公式与公式法（b²−4ac≥0 时 x=(−b±√(b²−4ac))/(2a)，
//   b²−4ac<0 时没有实数根）；课本辨析“两边同除以含未知数的式子会丢根”；把一个式子看成整体（换元）
// 可以使用：21.1，六、七年级全部（因式分解、分式、不等式（组）、绝对值、三角形三边关系、等腰三角形），19、20 章
// 还没学：“判别式”的名称和 Δ 记号及由根的情况反求参数的系统方法（21.3）；韦达定理（21.4）；实数范围内二次三项式的因式分解、
//   可化为一元二次方程的分式方程和列方程解应用题（21.5）；勾股定理（第 22 章）；函数
// 本节约定：根含根号的填空用 reals + simplest；“没有实数根”用按钮选项

const S212 = Math.sqrt;
const R212 = v => Math.round(v * 1e9) / 1e9;
// 数值转成分母不超过 1000 的精确分数（只在测试的 verify 里调用，F 是测试挂的全局）
const Q212 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return F(n).div(F(d)); } return v; };
// 一元二次方程的实数根（数值），用来核对答案
const roots212 = (a, b, c) => {
  const d = b * b - 4 * a * c;
  if (d < -1e-12) return [];
  if (Math.abs(d) < 1e-12) return [-b / (2 * a)];
  return [(-b + S212(d)) / (2 * a), (-b - S212(d)) / (2 * a)];
};

Content.section({
  id: 'math/sh2024/g8s1/21.2',
  title: '一元二次方程的解法',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮 c04（靠墙菜园配方求最值）只有 3～4 级，e04 两种情况周长相同、不分类也能答对，c02 解析用到还没学的分式方程 x+1/x=2；第 2 轮 c04 改成墙长为参数 a（按 a 与 10 分类求最大值、面积 42 的围法恰好一种），e04 改问 4 是腰时的底边，c02 解析改为整式分组 (x²+1)²−5x(x²+1)+6x²，判定整节通过' },

  intro: [
    {
      title: '因式分解法',
      body: '如果两个因式的积等于 $0$，那么至少有一个因式等于 $0$。所以把方程**右边化成 $0$、左边分解成两个一次因式的积**，就能把一元二次方程转化成两个一元一次方程。',
      example: '$x^2-7x=0$，即 $x(x-7)=0$，所以 $x=0$ 或 $x-7=0$，$x_1=0$，$x_2=7$。',
      pitfall: '不能把方程两边同除以含未知数的式子，那样会丢掉使这个式子等于 $0$ 的根。',
    },
    {
      title: '利用平方根的定义开平方',
      body: '方程 $x^2=d$：$d>0$ 时有两个不相等的实数根 $\\pm\\sqrt d$；$d=0$ 时有两个相等的实数根 $0$；$d<0$ 时没有实数根。形如 $(x+m)^2=d$ 的方程，把 $x+m$ 看成一个整体开平方。',
      example: '$(x+1)^2=7$：$x+1=\\pm\\sqrt7$，所以 $x_1=-1+\\sqrt7$，$x_2=-1-\\sqrt7$。',
    },
    {
      title: '配方法',
      body: '先把二次项系数化为 $1$，常数项移到右边，再在两边同加上**一次项系数一半的平方**，左边就配成完全平方式，然后开平方。',
      example: '$x^2+6x-2=0$：$x^2+6x=2$，两边加 $3^2$：$(x+3)^2=11$，所以 $x=-3\\pm\\sqrt{11}$。',
      pitfall: '二次项系数不是 $1$ 时，两边**每一项**都要除以它，右边的常数也不例外。',
    },
    {
      title: '求根公式',
      body: '对 $ax^2+bx+c=0$（$a\\neq0$）配方可得：当 $b^2-4ac\\geq0$ 时，$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$；当 $b^2-4ac<0$ 时，方程没有实数根。用公式前先化成一般形式，确定 $a$、$b$、$c$ 时连同符号。',
      example: '$2x^2-3x-1=0$：$a=2$，$b=-3$，$c=-1$，$b^2-4ac=17$，$x=\\dfrac{3\\pm\\sqrt{17}}{4}$。',
    },
    {
      title: '把一个式子看成整体',
      body: '方程里反复出现同一个式子时，可以把它看成一个未知数，先求出这个式子的值，再回头求原来的未知数。求出整体的值后，要检查它能不能取到（比如平方、绝对值不能是负数）。',
      example: '$(x-2)^2-3(x-2)=0$：把 $x-2$ 看成整体，$(x-2)(x-2-3)=0$，所以 $x_1=2$，$x_2=5$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '21.2-b01',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$2x(x+4)=5(x+4)$。',
      blanks: [{ kind: 'nums', label: '$x=$（有几个填几个，用逗号隔开）', answer: ['-4', '5/2'] }],
      explain: [
        '移项：$2x(x+4)-5(x+4)=0$，提取公因式：$(x+4)(2x-5)=0$。',
        '所以 $x+4=0$ 或 $2x-5=0$，$x_1=-4$，$x_2=\\frac52$。',
        '坑：两边同除以 $x+4$ 得 $2x=5$，丢掉了 $x=-4$（$x+4$ 可能等于 $0$，不能随便除）。',
      ],
      verify: () => roots212(2, 8 - 5, -20).map(R212),
    },
    {
      id: '21.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$4(x-1)^2-9=0$。',
      blanks: [{ kind: 'nums', label: '$x=$（有几个填几个，用逗号隔开）', answer: ['5/2', '-1/2'] }],
      explain: [
        '移项并两边同除以 $4$：$(x-1)^2=\\frac94$。',
        '两边开平方：$x-1=\\frac32$ 或 $x-1=-\\frac32$，所以 $x_1=\\frac52$，$x_2=-\\frac12$。',
        '坑：开平方只写 $x-1=\\frac32$，漏了负的那个；或者写成 $x-1=\\pm\\frac94$，忘了开方。',
      ],
      verify: () => roots212(4, -8, 4 - 9).map(R212),
    },
    {
      id: '21.2-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列方程中，没有实数根的是（　　）',
      options: ['$(x+2)^2=0$', '$-x^2+5=0$', '$2x^2+3=0$', '$x^2=-2x$'],
      answer: 2,
      explain: [
        'A：$x+2=0$，有两个相等的实数根 $x_1=x_2=-2$。坑：右边是 $0$ 不等于没有根。',
        'B：$x^2=5$，$x=\\pm\\sqrt5$，有两个实数根。坑：看见负号就以为没有根，要先化成 $x^2=d$ 的形式再看 $d$。',
        'C：$x^2=-\\frac32$，任何实数的平方都不是负数，没有实数根。',
        'D：$x^2+2x=0$，$x(x+2)=0$，$x_1=0$，$x_2=-2$。选 C。',
      ],
      verify: () => [[1, 4, 4], [-1, 0, 5], [2, 0, 3], [1, 2, 0]].findIndex(([a, b, c]) => roots212(a, b, c).length === 0),
    },
    {
      id: '21.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '配方填空。',
      blanks: [
        { kind: 'num', label: '(1) $x^2-5x+$', answer: '25/4' },
        { kind: 'num', label: '$=(x-$', answer: '5/2', suffix: '$)^2$' },
        { kind: 'num', label: '(2) 用配方法解 $2x^2-6x-1=0$，配方后得到 $(x-m)^2=n$，则 $m=$', answer: '3/2' },
        { kind: 'num', label: '$n=$', answer: '11/4' },
      ],
      explain: [
        '(1) 一次项系数是 $-5$，一半是 $-\\frac52$，平方是 $\\frac{25}4$：$x^2-5x+\\frac{25}4=\\left(x-\\frac52\\right)^2$。',
        '(2) 两边同除以 $2$：$x^2-3x-\\frac12=0$，移项：$x^2-3x=\\frac12$。两边加 $\\left(\\frac32\\right)^2=\\frac94$：$\\left(x-\\frac32\\right)^2=\\frac12+\\frac94=\\frac{11}4$。',
        '坑：常数项忘了除以 $2$，得到 $n=1+\\frac94=\\frac{13}4$；或者没先化二次项系数为 $1$，直接加 $9$。',
      ],
      verify: () => {
        // (x−m)² = n 与 x² − 3x − 1/2 = 0 同解：m = 3/2，n = m² + 1/2
        const m = F(3).div(F(2));
        return [F(5).div(F(2)).mul(F(5).div(F(2))), F(5).div(F(2)), m, m.mul(m).add(F(1).div(F(2)))];
      },
    },
    {
      id: '21.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '用公式法解方程：$3x^2-2x-2=0$。（结果化成最简形式）',
      blanks: [{ kind: 'reals', label: '$x=$（有几个填几个，用逗号隔开）', answer: ['(1+√7)/3', '(1-√7)/3'], simplest: true }],
      explain: [
        '$a=3$，$b=-2$，$c=-2$，$b^2-4ac=4+24=28$。',
        '$x=\\frac{2\\pm\\sqrt{28}}{6}=\\frac{2\\pm2\\sqrt7}{6}=\\frac{1\\pm\\sqrt7}{3}$。',
        '坑：把 $-b$ 写成 $-2$；$b^2-4ac$ 里 $-4\\times3\\times(-2)$ 是 $+24$；最后 $\\frac{2\\pm2\\sqrt7}{6}$ 要约分。',
      ],
      verify: () => roots212(3, -2, -2),
    },
    {
      id: '21.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '小明用配方法解方程 $2x^2-8x+1=0$ 的过程如下：① 移项，得 $2x^2-8x=-1$；② 二次项系数化为 $1$，得 $x^2-4x=-1$；③ 配方，得 $(x-2)^2=3$；④ 所以 $x_1=2+\\sqrt3$，$x_2=2-\\sqrt3$。',
      blanks: [
        { kind: 'text', label: '(1) 从第几步开始出错', answer: '②', options: ['①', '②', '③', '④'] },
        { kind: 'reals', label: '(2) 方程正确的根是（化成最简形式，用逗号隔开）', answer: ['2+√14/2', '2-√14/2'], simplest: true },
      ],
      explain: [
        '(1) 第 ② 步两边同除以 $2$ 时，右边的 $-1$ 没有除，应为 $x^2-4x=-\\frac12$。',
        '(2) 配方：$x^2-4x+4=-\\frac12+4$，$(x-2)^2=\\frac72$，$x-2=\\pm\\sqrt{\\frac72}=\\pm\\frac{\\sqrt{14}}2$。',
        '所以 $x_1=2+\\frac{\\sqrt{14}}2$，$x_2=2-\\frac{\\sqrt{14}}2$（也可以写成 $\\frac{4\\pm\\sqrt{14}}2$）。坑：$\\sqrt{\\frac72}$ 要化去分母里的根号。',
      ],
      verify: () => ['②', roots212(2, -8, 1)],
    },
    {
      id: '21.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$x^2+2\\sqrt2x-6=0$。（结果化成最简形式）',
      blanks: [{ kind: 'reals', label: '$x=$（有几个填几个，用逗号隔开）', answer: ['√2', '-3√2'], simplest: true }],
      explain: [
        '$a=1$，$b=2\\sqrt2$，$c=-6$，$b^2-4ac=(2\\sqrt2)^2+24=8+24=32$，$\\sqrt{32}=4\\sqrt2$。',
        '$x=\\frac{-2\\sqrt2\\pm4\\sqrt2}{2}$，所以 $x_1=\\sqrt2$，$x_2=-3\\sqrt2$。',
        '坑：$(2\\sqrt2)^2$ 算成 $4\\sqrt2$ 或 $2\\times2$；$\\sqrt{32}$ 不化简就没法和 $-2\\sqrt2$ 合并。',
      ],
      verify: () => roots212(1, 2 * S212(2), -6),
    },
    {
      id: '21.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$(x-1)(x+2)=4$。',
      blanks: [{ kind: 'nums', label: '$x=$（有几个填几个，用逗号隔开）', answer: ['2', '-3'] }],
      explain: [
        '右边不是 $0$，不能直接写“$x-1=4$ 或 $x+2=4$”。先展开整理：$x^2+x-2=4$，即 $x^2+x-6=0$。',
        '分解：$(x+3)(x-2)=0$，所以 $x_1=-3$，$x_2=2$。',
        '坑：错用“积等于 $4$ 时某个因式等于 $4$”，得到 $x=5$ 或 $x=2$。$x=5$ 代入：$4\\times7=28\\neq4$。',
      ],
      verify: () => roots212(1, 1, -6).map(R212),
    },
    {
      id: '21.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '两个连续正偶数的积是 $168$，求这两个数。',
      blanks: [{ kind: 'nums', label: '这两个数是（用逗号隔开）', answer: ['12', '14'] }],
      explain: [
        '设较小的偶数为 $x$，则较大的是 $x+2$。$x(x+2)=168$，即 $x^2+2x-168=0$。',
        '配方：$(x+1)^2=169$，$x+1=\\pm13$，$x_1=12$，$x_2=-14$。',
        '题目要求是正偶数，$x=-14$ 舍去。所以这两个数是 $12$ 和 $14$。坑：没有舍去负根，或者设成 $x$、$x+1$（连续偶数相差 $2$）。',
      ],
      verify: () => {
        const xs = roots212(1, 2, -168).filter(x => x > 0 && x % 2 === 0);
        return [xs[0], xs[0] + 2];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '21.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '解下列方程。',
      blanks: [
        { kind: 'nums', label: '(1) $(2x-3)^2=(x+1)^2$，$x=$（有几个填几个，用逗号隔开）', answer: ['4', '2/3'] },
        { kind: 'nums', label: '(2) $x^2-6x+9=(5-2x)^2$，$x=$（有几个填几个，用逗号隔开）', answer: ['8/3', '2'] },
      ],
      explain: [
        '两个数的平方相等，这两个数相等或互为相反数。',
        '(1) $2x-3=x+1$，得 $x=4$；或 $2x-3=-(x+1)$，得 $x=\\frac23$。',
        '(2) 先认出左边是完全平方式：$(x-3)^2=(5-2x)^2$。$x-3=5-2x$，得 $x=\\frac83$；或 $x-3=-(5-2x)$，即 $x-3=2x-5$，得 $x=2$。',
        '坑：只写“相等”一种情况；或者两边展开硬算，(2) 化成 $3x^2-14x+16=0$ 也能做，但容易算错。',
      ],
      verify: () => [roots212(4 - 1, -12 - 2, 9 - 1).map(Q212), roots212(1 - 4, -6 + 20, 9 - 25).map(Q212)],
    },
    {
      id: '21.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '把一个式子看成整体求值。',
      blanks: [
        { kind: 'nums', label: '(1) 实数 $x$、$y$ 满足 $(x^2+y^2)(x^2+y^2-1)=12$，则 $x^2+y^2=$（有几个填几个，用逗号隔开）', answer: ['4'] },
        { kind: 'nums', label: '(2) 实数 $a$、$b$ 满足 $(a+b)(a+b-2)=8$，则 $a+b=$（有几个填几个，用逗号隔开）', answer: ['4', '-2'] },
      ],
      explain: [
        '(1) 设 $t=x^2+y^2$，则 $t(t-1)=12$，$t^2-t-12=0$，$(t-4)(t+3)=0$，$t=4$ 或 $t=-3$。',
        '$x^2+y^2\\geq0$，$t=-3$ 舍去，所以 $x^2+y^2=4$。坑：两个都填。',
        '(2) 设 $s=a+b$，则 $s^2-2s-8=0$，$(s-4)(s+2)=0$，$s=4$ 或 $s=-2$。$a+b$ 可以是负数，两个都要（比如 $a=b=2$ 和 $a=b=-1$ 都满足）。坑：受 (1) 影响把 $-2$ 也舍掉。',
      ],
      verify: () => [roots212(1, -1, -12).filter(t => t >= 0), roots212(1, -2, -8)],
    },
    {
      id: '21.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-(2m+1)x+m^2+m=0$。',
      blanks: [
        { kind: 'expr', label: '(1) 方程较小的根是（用含 $m$ 的式子表示）', answer: 'm' },
        { kind: 'expr', label: '较大的根是', answer: 'm+1' },
        { kind: 'nums', label: '(2) 若方程的一个根是另一个根的 $2$ 倍，则 $m=$（有几个填几个，用逗号隔开）', answer: ['1', '-2'] },
      ],
      explain: [
        '(1) 常数项 $m^2+m=m(m+1)$，而 $m+(m+1)=2m+1$，所以左边可以分解：$(x-m)(x-m-1)=0$，两根是 $m$ 和 $m+1$，较小的是 $m$。',
        '(2) 两根是 $m$ 和 $m+1$，分两种情况：$m+1=2m$，得 $m=1$（两根 $1$、$2$）；$m=2(m+1)$，得 $m=-2$（两根 $-2$、$-1$）。',
        '坑：只考虑“大根是小根的 $2$ 倍”。负数时较小的根 $-2$ 反而是 $-1$ 的 $2$ 倍。',
      ],
      verify: () => {
        const ms = [];
        for (let m = -10; m <= 10; m++) {
          const r = roots212(1, -(2 * m + 1), m * m + m);
          if (Math.min(...r) !== m || Math.max(...r) !== m + 1) return null;
          if (Math.abs(r[0] - 2 * r[1]) < 1e-9 || Math.abs(r[1] - 2 * r[0]) < 1e-9) ms.push(m);
        }
        return ['m', 'm+1', ms];
      },
    },
    {
      id: '21.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '等腰三角形的一边长为 $4$，另外两边的长恰好是关于 $x$ 的方程 $x^2-10x+m=0$ 的两个根。',
      blanks: [
        { kind: 'nums', label: '(1) $m=$（有几个填几个，用逗号隔开）', answer: ['24', '25'] },
        { kind: 'num', label: '(2) 当 $4$ 是腰时，三角形的底边长是', answer: '6' },
      ],
      explain: [
        '分两种情况：$4$ 是腰，或 $4$ 是底边。',
        '① $4$ 是腰：另两边中有一边也是 $4$，即 $x=4$ 是方程的根，$16-40+m=0$，$m=24$。方程 $x^2-10x+24=0$ 的根是 $4$、$6$，三边 $4$、$4$、$6$，$4+4>6$，能组成三角形。',
        '② $4$ 是底边：另两边是腰，相等，方程有两个相等的实数根。配方：$(x-5)^2=25-m$，要 $25-m=0$，$m=25$，两根都是 $5$，三边 $5$、$5$、$4$，能组成三角形。',
        '(2) 由 ①，$4$ 是腰时三边是 $4$、$4$、$6$，底边长 $6$。坑：漏掉 $4$ 是底边、两根相等的情况；或者 $4$ 是腰时没求出另一个根。',
      ],
      verify: () => {
        const ms = [], base = [];
        for (let m = 0; m <= 30; m++) {
          let r = roots212(1, -10, m);
          if (r.length === 1) r = [r[0], r[0]];
          if (r.length < 2) continue;
          const [p, q] = r;
          // 三边 4、p、q 构成等腰三角形
          const sides = [4, p, q].sort((u, v) => u - v);
          const iso = Math.abs(p - q) < 1e-9 || Math.abs(p - 4) < 1e-9 || Math.abs(q - 4) < 1e-9;
          if (iso && sides[0] > 0 && sides[0] + sides[1] > sides[2] + 1e-9) { ms.push(m); if (Math.abs(p - q) > 1e-9) base.push(R212(Math.abs(p - 4) < 1e-9 ? q : p)); }
        }
        return [ms, base[0]];
      },
    },
    {
      id: '21.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x^2-xy-2y^2=0$，且 $xy\\neq0$。',
      blanks: [
        { kind: 'nums', label: '(1) $\\dfrac xy$ 的值是（有几个填几个，用逗号隔开）', answer: ['2', '-1'] },
        { kind: 'nums', label: '(2) $\\dfrac{x^2+3y^2}{xy}$ 的值是（有几个填几个，用逗号隔开）', answer: ['7/2', '-4'] },
      ],
      explain: [
        '(1) 把 $y$ 看成已知数，左边可以分解：$(x-2y)(x+y)=0$，所以 $x=2y$ 或 $x=-y$，$\\frac xy=2$ 或 $-1$。',
        '也可以两边同除以 $y^2$（$y\\neq0$）：$\\left(\\frac xy\\right)^2-\\frac xy-2=0$，把 $\\frac xy$ 看成未知数解。',
        '(2) $x=2y$ 时，原式 $=\\frac{4y^2+3y^2}{2y^2}=\\frac72$；$x=-y$ 时，原式 $=\\frac{y^2+3y^2}{-y^2}=-4$。坑：只取 $x=2y$ 一种。',
      ],
      verify: () => {
        const ts = roots212(1, -1, -2);
        return [ts, ts.map(t => F(Math.round(t)).mul(F(Math.round(t))).add(F(3)).div(F(Math.round(t))))];
      },
    },
    {
      id: '21.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '解下列方程。（结果化成最简形式）',
      blanks: [
        { kind: 'reals', label: '(1) $x^2-2\\lvert x-1\\rvert-7=0$，$x=$（有几个填几个，用逗号隔开）', answer: ['1+√6', '-1-√10'], simplest: true },
        { kind: 'reals', label: '(2) $x\\lvert x\\rvert-2x-3=0$，$x=$（有几个填几个，用逗号隔开）', answer: ['3'], simplest: true },
      ],
      explain: [
        '(1) 按 $x-1$ 的正负分段。$x\\geq1$ 时：$x^2-2x+2-7=0$，$x^2-2x-5=0$，$x=1\\pm\\sqrt6$；要 $x\\geq1$，只取 $1+\\sqrt6$。',
        '$x<1$ 时：$x^2+2x-2-7=0$，$x^2+2x-9=0$，$x=-1\\pm\\sqrt{10}$；$-1+\\sqrt{10}>2$ 不满足 $x<1$，舍去，取 $-1-\\sqrt{10}$。',
        '(2) $x\\geq0$ 时：$x^2-2x-3=0$，$x=3$ 或 $-1$，$-1$ 舍去。$x<0$ 时：$-x^2-2x-3=0$，即 $x^2+2x+3=0$，$(x+1)^2=-2$，没有实数根。所以只有 $x=3$。',
        '坑：解出来以后不回头检查是否在所设的范围里。',
      ],
      verify: () => {
        const a = roots212(1, -2, -5).filter(x => x >= 1).concat(roots212(1, 2, -9).filter(x => x < 1));
        const b = roots212(1, -2, -3).filter(x => x >= 0).concat(roots212(-1, -2, -3).filter(x => x < 0));
        return [a, b];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '21.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $(x-1)(x-2)(x-3)(x-4)=k$。',
      blanks: [
        { kind: 'reals', label: '(1) 当 $k=3$ 时，方程的实数根是（化成最简形式，全部填出，用逗号隔开）', answer: ['(5+√13)/2', '(5-√13)/2'], simplest: true },
        { kind: 'num', label: '(2) 方程恰好有 $3$ 个不同的实数根时，$k=$', answer: '9/16' },
        { kind: 'ineq', var: 'k', label: '(3) 方程恰好有 $4$ 个不同的实数根时，$k$ 的取值范围是', answer: '-1<k<9/16' },
      ],
      explain: [
        '关键转化：首尾配对，$(x-1)(x-4)=x^2-5x+4$，$(x-2)(x-3)=x^2-5x+6$，两个式子都含 $x^2-5x$。设 $y=x^2-5x+5$（取中间值），方程变成 $(y-1)(y+1)=k$，即 $y^2=k+1$。',
        '(1) $k=3$：$y^2=4$，$y=\\pm2$。$y=2$：$x^2-5x+3=0$，$x=\\frac{5\\pm\\sqrt{13}}2$；$y=-2$：$x^2-5x+7=0$，配方得 $\\left(x-\\frac52\\right)^2=-\\frac34$，没有实数根。',
        '(2)(3) 再看一般的 $k$：由 $x^2-5x+5=y$ 配方得 $\\left(x-\\frac52\\right)^2=y+\\frac54$，所以每个 $y$：$y>-\\frac54$ 时对应 $2$ 个 $x$，$y=-\\frac54$ 时对应 $1$ 个 $x$（$x=\\frac52$），$y<-\\frac54$ 时没有 $x$。不同的 $y$ 对应的 $x$ 也不同。',
        '$k<-1$ 时 $y$ 无解；$k=-1$ 时 $y=0$，$2$ 个根；$k>-1$ 时 $y=\\pm\\sqrt{k+1}$，正的那个总给出 $2$ 个根，负的 $-\\sqrt{k+1}$ 与 $-\\frac54$ 比较：$\\sqrt{k+1}<\\frac54$，即 $-1<k<\\frac9{16}$ 时再给 $2$ 个根，共 $4$ 个；$\\sqrt{k+1}=\\frac54$，即 $k=\\frac9{16}$ 时再给 $1$ 个，共 $3$ 个；$k>\\frac9{16}$ 时只有 $2$ 个。',
        '检验：$x=\\frac52$ 时左边 $=\\frac32\\cdot\\frac12\\cdot\\left(-\\frac12\\right)\\cdot\\left(-\\frac32\\right)=\\frac9{16}$。坑：$k=-1$ 时 $y$ 的两个值重合，只有 $2$ 个根，不能算进 (3)。',
      ],
      verify: () => {
        // 数根：对每个 k 求 (x²−5x+4)(x²−5x+6)=k 的不同实根个数
        const count = k => {
          const xs = [];
          for (const y of roots212(1, 0, -(k + 1))) for (const x of roots212(1, -5, 5 - y)) if (!xs.some(z => Math.abs(z - x) < 1e-7)) xs.push(x);
          return xs;
        };
        const r1 = count(3);
        if (!r1.every(x => Math.abs((x - 1) * (x - 2) * (x - 3) * (x - 4) - 3) < 1e-9)) return null;
        const three = [];
        for (let i = -200; i <= 200; i++) { const k = i / 160; if (count(k).length === 3) three.push(k); }
        const four = [-0.999, -0.5, 0, 0.5, 0.56].every(k => count(k).length === 4) && [-1, 0.5625, 0.57, 2].every(k => count(k).length !== 4);
        return [r1, F(Math.round(three[0] * 16)).div(F(16)), four ? '-1<k<9/16' : null];
      },
    },
    {
      id: '21.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '解下列关于 $x$ 的四次方程。（结果化成最简形式，有几个不同的实数根就填几个，用逗号隔开）',
      blanks: [
        { kind: 'reals', label: '(1) $x^4-5x^3+8x^2-5x+1=0$，$x=$', answer: ['1', '(3+√5)/2', '(3-√5)/2'], simplest: true },
        { kind: 'reals', label: '(2) $x^4+2x^3-x^2+2x+1=0$，$x=$', answer: ['(-3+√5)/2', '(-3-√5)/2'], simplest: true },
      ],
      explain: [
        '观察：两个方程的系数“左右对称”（$1,-5,8,-5,1$）。把首尾两项、第二和第四项配成一组：$x^4+1$ 和 $-5x^3-5x$。',
        '(1) 原方程可写成 $(x^2+1)^2-5x(x^2+1)+6x^2=0$（因为 $(x^2+1)^2=x^4+2x^2+1$，$8x^2-2x^2=6x^2$）。把 $x^2+1$ 看成整体 $u$，就是 $u^2-5xu+6x^2=0$，分解得 $(u-2x)(u-3x)=0$。',
        '所以 $x^2+1-2x=0$ 或 $x^2+1-3x=0$。前者 $(x-1)^2=0$，$x=1$（两个相等的根）；后者 $x=\\frac{3\\pm\\sqrt5}2$。共 $3$ 个不同的实数根。',
        '(2) 同样：$(x^2+1)^2+2x(x^2+1)-3x^2=0$，即 $(u+3x)(u-x)=0$。$x^2+3x+1=0$ 得 $x=\\frac{-3\\pm\\sqrt5}2$；$x^2-x+1=0$ 配方得 $\\left(x-\\frac12\\right)^2=-\\frac34$，没有实数根。',
        '思路小结：对称的四次方程，配成 $(x^2+1)^2$ 和 $x(x^2+1)$ 后是关于 $x^2+1$ 和 $x$ 的“齐次”式，可以像 $u^2-5xu+6x^2$ 那样分解。坑：(2) 分解出两个因式后，不检查哪个没有实数根。',
      ],
      verify: () => {
        const solve = (p, q, r) => {
          // x⁴ + p x³ + q x² + p x + 1 = 0：y² + p y + (q − 2) = 0，再解 x² − y x + 1 = 0
          const xs = [];
          for (const y of roots212(1, p, q - 2)) for (const x of roots212(1, -y, 1)) if (!xs.some(z => Math.abs(z - x) < 1e-7)) xs.push(x);
          if (!xs.every(x => Math.abs(x ** 4 + p * x ** 3 + q * x * x + p * x + 1) < 1e-8)) return null;
          return xs;
        };
        return [solve(-5, 8), solve(2, -1)];
      },
    },
    {
      id: '21.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $(k-1)x^2-(2k-1)x+k=0$。',
      blanks: [
        { kind: 'num', label: '(1) 无论 $k$ 取何值，方程总有一个根是 $x=$', answer: '1' },
        { kind: 'nums', label: '(2) 使方程的根都是整数的整数 $k$ 有（全部填出，用逗号隔开）', answer: ['0', '1', '2'] },
        { kind: 'ineq', var: 'k', label: '(3) 若方程是一元二次方程，且它的另一个根大于 $2$，则 $k$ 的取值范围是', answer: '1<k<2' },
      ],
      explain: [
        '(1) 把含 $k$ 的项放在一起：$k(x^2-2x+1)-(x^2-x)=0$，即 $k(x-1)^2-x(x-1)=0$。$x=1$ 时两部分都是 $0$，所以 $x=1$ 总是根。',
        '再提出 $x-1$：$(x-1)[k(x-1)-x]=0$，即 $(x-1)[(k-1)x-k]=0$。',
        '(2) $k=1$ 时方程变成 $-x+1=0$，只有一个根 $1$，是整数，符合。$k\\neq1$ 时另一个根是 $x=\\frac k{k-1}=1+\\frac1{k-1}$，要是整数，$k-1=\\pm1$，$k=2$ 或 $k=0$（两根分别是 $1$、$2$ 和 $1$、$0$）。所以 $k=0,1,2$。坑：漏掉 $k=1$ 这个一次方程的情况。',
        '(3) $k\\neq1$，要 $\\frac k{k-1}>2$。按 $k-1$ 的正负分类去分母：$k>1$ 时 $k>2k-2$，$k<2$，所以 $1<k<2$；$k<1$ 时 $k<2k-2$，$k>2$，与 $k<1$ 矛盾。所以 $1<k<2$。',
        '坑：直接去分母得 $k>2k-2$，没有考虑 $k-1$ 可能是负数。',
      ],
      verify: () => {
        const fixed = [-2, -1, 0, 1, 2, 3].find(x => [-3, 0, 1, 2, 5].every(k => (k - 1) * x * x - (2 * k - 1) * x + k === 0));
        const ints = [];
        for (let k = -20; k <= 20; k++) {
          const r = k === 1 ? [1] : roots212(k - 1, -(2 * k - 1), k);
          if (r.every(x => Math.abs(x - Math.round(x)) < 1e-9)) ints.push(k);
        }
        const other = k => k / (k - 1);
        const ok = [1.01, 1.5, 1.99].every(k => other(k) > 2) && [0.5, 2, 2.5, -3, 1.0].every(k => k === 1 || !(other(k) > 2));
        return [fixed, ints, ok ? '1<k<2' : null];
      },
    },
    {
      id: '21.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '用 $20\\text{ m}$ 长的篱笆，一面靠墙围一个长方形菜园（只围三边），墙长 $a\\text{ m}$（$0<a<20$），平行于墙的一边不能超过墙长。设垂直于墙的边长为 $x\\text{ m}$。',
      blanks: [
        { kind: 'num', label: '(1) 当 $a=12$ 时，菜园面积最大是（$\\text{m}^2$）', answer: '50' },
        { kind: 'num', label: '(2) 当 $a=8$ 时，菜园面积最大是（$\\text{m}^2$）', answer: '48' },
        { kind: 'expr', label: '(3) 一般地，当 $0<a<10$ 时，菜园面积的最大值是（用含 $a$ 的式子表示）', answer: '10a-a^2/2' },
        { kind: 'ineq', var: 'a', label: '(4) 要使面积为 $42\\text{ m}^2$ 的围法恰好只有一种，$a$ 的取值范围是', answer: '6≤a<14' },
      ],
      explain: [
        '平行于墙的边长 $(20-2x)\\text{ m}$，要 $0<20-2x\\leq a$。面积 $S=x(20-2x)$，配方：$S=-2(x^2-10x)=-2(x-5)^2+50$。',
        '(1) $(x-5)^2\\geq0$，$S\\leq50$，$x=5$ 时取到，这时平行于墙的边是 $10\\leq12$，能围出来。最大面积 $50$。',
        '(2) 关键：$x=5$ 要求平行于墙的边是 $10\\text{ m}>8\\text{ m}$，取不到。由 $20-2x\\leq8$ 得 $x\\geq6$，这时 $x-5\\geq1$，$x$ 越大 $(x-5)^2$ 越大，$S$ 越小，所以 $x=6$ 时最大：$S=-2+50=48$。',
        '(3) 推广 (2)：$a<10$ 时 $20-2x\\leq a$ 即 $x\\geq\\frac{20-a}2>5$，同理在 $x=\\frac{20-a}2$ 时最大（此时平行于墙的边正好是 $a$），$S=\\frac{20-a}2\\cdot a=10a-\\frac{a^2}2$。（$a\\geq10$ 时最大值是 $50$。）',
        '(4) $x(20-2x)=42$，$x^2-10x+21=0$，$x=3$ 或 $x=7$，对应平行于墙的边 $14\\text{ m}$ 或 $6\\text{ m}$。墙要容得下：恰好一种，就是 $6\\leq a<14$（只有 $x=7$ 能围）。坑：$a=6$ 时平行于墙的边正好等于墙长，也可以；$a\\geq14$ 时两种都行。',
      ],
      verify: () => {
        const best = a => { let b = 0; for (let i = 1; i < 2000; i++) { const x = i / 200; if (20 - 2 * x <= a + 1e-12) b = Math.max(b, x * (20 - 2 * x)); } return R212(b); };
        const formulaOk = [2, 5, 8, 9.5].every(a => Math.abs(best(a) - (10 * a - a * a / 2)) < 1e-6);
        const ways = a => roots212(-2, 20, -42).filter(x => 20 - 2 * x > 0 && 20 - 2 * x <= a + 1e-12).length;
        let ok = true;
        for (let i = 1; i < 400; i++) { const a = i / 20; if ((ways(a) === 1) !== (a >= 6 && a < 14)) ok = false; }
        return [best(12), best(8), formulaOk ? '10a-a^2/2' : null, ok ? '6≤a<14' : null];
      },
    },
    {
      id: '21.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2+px+q=0$，其中 $p$、$q$ 是实数。',
      blanks: [
        { kind: 'nums', label: '(1) 若 $p$ 和 $q$ 都是这个方程的根（$p$、$q$ 可以相等），则 $p$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['0', '1', '-1/2'] },
        { kind: 'nums', label: '(2) 若这个方程的两个根恰好就是 $p$ 和 $q$，则 $p$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['0', '1'] },
      ],
      explain: [
        '把两个根分别代入：$p^2+p\\cdot p+q=0$，即 $q=-2p^2$ ①；$q^2+pq+q=0$，即 $q(q+p+1)=0$ ②。',
        '由②分两种情况。$q=0$：代入①得 $p=0$。$q=-p-1$：代入①得 $2p^2-p-1=0$，$(2p+1)(p-1)=0$，$p=1$（$q=-2$）或 $p=-\\frac12$（$q=-\\frac12$）。',
        '(1) 三组都满足“$p$、$q$ 都是根”：$p=0,1,-\\frac12$。',
        '(2) 还要检验方程的两个根**恰好**是 $p$、$q$。$p=q=0$：方程 $x^2=0$，两根都是 $0$，符合。$p=1$，$q=-2$：$x^2+x-2=0$ 的根是 $1$、$-2$，符合。$p=q=-\\frac12$：方程 $x^2-\\frac12x-\\frac12=0$，即 $2x^2-x-1=0$，根是 $1$ 和 $-\\frac12$，两根不都是 $-\\frac12$，不符合。所以 $p=0$ 或 $1$。',
        '坑：(1) 由②直接约去 $q$，漏了 $q=0$；(2) 不回头检验，把 $p=-\\frac12$ 也填上。',
      ],
      verify: () => {
        // 在 p 的分数网格上搜索：q 由 ① 确定，再检验
        const both = [], exact = [];
        for (let i = -60; i <= 60; i++) {
          const p = i / 4, q = -2 * p * p;
          if (Math.abs(q * q + p * q + q) > 1e-9) continue;
          both.push(p);
          let r = roots212(1, p, q);
          if (r.length === 1) r = [r[0], r[0]];
          const want = [p, q].sort((u, v) => u - v), got = r.slice().sort((u, v) => u - v);
          if (got.length === 2 && Math.abs(got[0] - want[0]) < 1e-9 && Math.abs(got[1] - want[1]) < 1e-9) exact.push(p);
        }
        return [both, exact];
      },
    },
  ],
});
