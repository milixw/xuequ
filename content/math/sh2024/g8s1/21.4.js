'use strict';

// 上海数学八年级上册 · 21.4 一元二次方程的根与系数的关系
// 知识范围：韦达定理 x₁+x₂=−b/a，x₁x₂=c/a（前提是方程有两个实数根）；已知一根求另一根和参数；
//   把关于 x₁、x₂ 的代数式化成两根之和与积再求值；由两根满足的条件求参数，并用判别式检验
// 可以使用：21.1～21.3 全部，六、七年级全部（因式分解、分式、不等式（组）、数轴、绝对值），19、20 章
// 还没学：实数范围内二次三项式的因式分解、分式方程化为一元二次方程、列方程解应用题（21.5）；勾股定理（第 22 章）；函数
// 本节约定：课本没有讲“以两数为根构造方程”（韦达定理的逆用），题目和解析都不用它；求出参数一律回头检验 Δ

const S214 = Math.sqrt;
const R214 = v => Math.round(v * 1e9) / 1e9;
const roots214 = (a, b, c) => {
  const d = b * b - 4 * a * c;
  if (d < -1e-12) return [];
  if (Math.abs(d) < 1e-12) return [-b / (2 * a), -b / (2 * a)];
  return [(-b + S214(d)) / (2 * a), (-b - S214(d)) / (2 * a)];
};
// 数值转成分母不超过 1000 的精确分数（verify 只在测试里运行，F 是测试挂的全局）
const Q214 = v => { for (let d = 1; d <= 1000; d++) { const n = Math.round(v * d); if (Math.abs(n / d - v) < 1e-9) return F(n).div(F(d)); } return v; };

Content.section({
  id: 'math/sh2024/g8s1/21.4',
  title: '一元二次方程的根与系数的关系',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 1, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核一轮即判定整节通过，答案全部一致。不用韦达定理的逆用（课本没讲）。按建议把 c01 (2) 改为“至少有一个正整数根”（多一次筛选），c03 解析补充用 2(2m−7)(m+1) 判断符号；复核提醒 c03 与流传的 (α−1)²+(β−1)² 最小值模型同构（数据不同）' },

  intro: [
    {
      title: '韦达定理',
      body: '把求根公式的两个根相加、相乘可得：如果方程 $ax^2+bx+c=0$（$a\\neq0$）的两个实数根是 $x_1$、$x_2$，那么 $x_1+x_2=-\\dfrac ba$，$x_1x_2=\\dfrac ca$。不解方程就能知道两根的和与积。',
      example: '$2x^2-6x-5=0$：$x_1+x_2=-\\dfrac{-6}2=3$，$x_1x_2=-\\dfrac52$。',
      pitfall: '用之前要确认方程有实数根（$\\Delta\\geq0$），并且先化成一般形式；两根之和是 $-\\dfrac ba$，别漏了负号。',
    },
    {
      title: '已知一根求另一根',
      body: '已知一个根，用两根之积（或之和）求另一个根，再用另一个关系求参数。',
      example: '$3x^2+kx-2=0$ 有一个根是 $1$：$1\\cdot x_2=-\\dfrac23$，另一根 $x_2=-\\dfrac23$；再由 $1+\\left(-\\dfrac23\\right)=-\\dfrac k3$ 得 $k=-1$。',
    },
    {
      title: '化成两根的和与积',
      body: '关于 $x_1$、$x_2$ 的对称式，都能用 $x_1+x_2$ 和 $x_1x_2$ 表示：$x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2$，$\\dfrac1{x_1}+\\dfrac1{x_2}=\\dfrac{x_1+x_2}{x_1x_2}$，$(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2$。',
      example: '$x^2-4x+1=0$：$x_1+x_2=4$，$x_1x_2=1$，所以 $x_1^2+x_2^2=16-2=14$，$(x_1-x_2)^2=16-4=12$。',
    },
    {
      title: '由两根的符号看方程',
      body: '两根之积为负，两根异号；两根之积为正，两根同号，这时再看两根之和：和为正是两个正根，和为负是两个负根。前提仍然是方程有实数根。',
      example: '$x^2+7x+5=0$：$\\Delta=29>0$，$x_1x_2=5>0$，$x_1+x_2=-7<0$，所以两个根都是负数。',
    },
    {
      title: '求出参数要检验',
      body: '由两根满足的关系列方程求参数时，韦达定理只在有实数根时成立，所以求出参数后要代回检查 $\\Delta\\geq0$（题目要求不相等时检查 $\\Delta>0$），以及二次项系数不为 $0$。',
      example: '$x^2+2x+m=0$ 两根的平方和为 $10$：$4-2m=10$，$m=-3$；检验 $\\Delta=4+12>0$，符合。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '21.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列方程中，两个实数根之和为 $2$ 的是（　　）',
      options: ['$x^2-2x+3=0$', '$x^2+2x-1=0$', '$2x^2-4x-1=0$', '$x^2-2=0$'],
      answer: 2,
      explain: [
        'A：$\\Delta=4-12<0$，没有实数根，谈不上两根之和。坑：直接用 $-\\frac ba=2$ 选 A。',
        'B：和为 $-2$。C：$\\Delta=16+8>0$，和为 $-\\frac{-4}2=2$，是。D：和为 $0$。选 C。',
      ],
      verify: () => [[1, -2, 3], [1, 2, -1], [2, -4, -1], [1, 0, -2]].findIndex(([a, b, c]) => { const r = roots214(a, b, c); return r.length === 2 && Math.abs(r[0] + r[1] - 2) < 1e-9; }),
    },
    {
      id: '21.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '不解方程，求下列方程两根的和与积。',
      blanks: [
        { kind: 'num', label: '(1) $2x^2+3x-7=0$：$x_1+x_2=$', answer: '-3/2' },
        { kind: 'num', label: '$x_1x_2=$', answer: '-7/2' },
        { kind: 'num', label: '(2) $x(x-4)=3$：$x_1+x_2=$', answer: '4' },
        { kind: 'num', label: '$x_1x_2=$', answer: '-3' },
      ],
      explain: [
        '(1) $\\Delta=9+56>0$。$x_1+x_2=-\\frac32$，$x_1x_2=-\\frac72$。坑：和写成 $\\frac32$。',
        '(2) 先化成一般形式 $x^2-4x-3=0$，$\\Delta>0$。$x_1+x_2=4$，$x_1x_2=-3$。坑：直接看成积是 $3$。',
      ],
      verify: () => { const r1 = roots214(2, 3, -7), r2 = roots214(1, -4, -3); return [Q214(r1[0] + r1[1]), Q214(r1[0] * r1[1]), Q214(r2[0] + r2[1]), Q214(r2[0] * r2[1])]; },
    },
    {
      id: '21.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2+kx-6=0$ 的一个根是 $2$，求另一个根和 $k$ 的值。',
      blanks: [
        { kind: 'num', label: '另一个根是', answer: '-3' },
        { kind: 'num', label: '$k=$', answer: '1' },
      ],
      explain: [
        '两根之积 $2x_2=-6$，所以另一个根 $x_2=-3$。',
        '两根之和 $2+(-3)=-k$，所以 $k=1$。坑：由 $x_1+x_2=k$ 得 $k=-1$，漏了负号。',
      ],
      verify: () => { for (let k = -10; k <= 10; k++) if (4 + 2 * k - 6 === 0) return [R214(roots214(1, k, -6).find(x => Math.abs(x - 2) > 1e-9)), k]; return null; },
    },
    {
      id: '21.4-b04',
      level: 'basic',
      type: 'fill',
      stem: '设 $x_1$、$x_2$ 是方程 $x^2-3x-2=0$ 的两个根，不解方程，求下列各式的值。',
      blanks: [
        { kind: 'num', label: '(1) $\\dfrac1{x_1}+\\dfrac1{x_2}=$', answer: '-3/2' },
        { kind: 'num', label: '(2) $x_1^2+x_2^2=$', answer: '13' },
        { kind: 'num', label: '(3) $(x_1-1)(x_2-1)=$', answer: '-4' },
      ],
      explain: [
        '$\\Delta=9+8>0$，$x_1+x_2=3$，$x_1x_2=-2$。',
        '(1) $\\frac{x_1+x_2}{x_1x_2}=\\frac3{-2}=-\\frac32$。(2) $(x_1+x_2)^2-2x_1x_2=9+4=13$。坑：写成 $9-4=5$，$-2\\times(-2)$ 的符号错了。',
        '(3) 展开：$x_1x_2-(x_1+x_2)+1=-2-3+1=-4$。',
      ],
      verify: () => { const [p, q] = roots214(1, -3, -2); return [Q214(1 / p + 1 / q), R214(p * p + q * q), R214((p - 1) * (q - 1))]; },
    },
    {
      id: '21.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-2x+c=0$ 的一个根是 $1+\\sqrt2$。（结果化成最简形式）',
      blanks: [
        { kind: 'real', label: '另一个根是', answer: '1-√2', simplest: true },
        { kind: 'num', label: '$c=$', answer: '-1' },
      ],
      explain: [
        '两根之和是 $2$，所以另一个根是 $2-(1+\\sqrt2)=1-\\sqrt2$。',
        '$c=x_1x_2=(1+\\sqrt2)(1-\\sqrt2)=1-2=-1$。坑：用积先求另一个根，绕到含 $c$ 的式子里；用和更直接。',
      ],
      verify: () => { const r = 1 + S214(2), c = -(r * r - 2 * r); const other = roots214(1, -2, c).find(x => Math.abs(x - r) > 1e-9); return [other, R214(c)]; },
    },
    {
      id: '21.4-b06',
      level: 'basic',
      type: 'choice',
      stem: '关于方程 $x^2-5x-3=0$ 的两个根，下列说法正确的是（　　）',
      options: ['两个都是正数', '两个都是负数', '一正一负，正根的绝对值较大', '一正一负，负根的绝对值较大'],
      answer: 2,
      explain: [
        '$\\Delta=25+12>0$。两根之积 $-3<0$，所以一正一负。',
        '两根之和 $5>0$，正根加负根是正数，说明正根的绝对值较大。选 C。',
        '坑：只看积就停下，或者把“和为正”理解成两个都是正数。',
      ],
      verify: () => { const [p, q] = roots214(1, -5, -3); const pos = Math.max(p, q), neg = Math.min(p, q); if (!(pos > 0 && neg < 0)) return -1; return Math.abs(pos) > Math.abs(neg) ? 2 : 3; },
    },
    {
      id: '21.4-b07',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-(m+1)x+m^2-2=0$ 的两个实数根的平方和等于 $2$，求 $m$ 的值。',
      blanks: [{ kind: 'nums', label: '$m=$（有几个填几个，用逗号隔开）', answer: ['-1'] }],
      explain: [
        '$x_1+x_2=m+1$，$x_1x_2=m^2-2$。$x_1^2+x_2^2=(m+1)^2-2(m^2-2)=-m^2+2m+5=2$，即 $m^2-2m-3=0$，$m=3$ 或 $m=-1$。',
        '检验：$\\Delta=(m+1)^2-4(m^2-2)=-3m^2+2m+9$。$m=3$ 时 $\\Delta=-12<0$，方程没有实数根，舍去；$m=-1$ 时 $\\Delta=4>0$，符合。',
        '所以 $m=-1$。坑：不检验判别式，把 $m=3$ 也填上。',
      ],
      verify: () => { const ms = []; for (let m = -10; m <= 10; m++) { const r = roots214(1, -(m + 1), m * m - 2); if (r.length && Math.abs(r[0] ** 2 + r[1] ** 2 - 2) < 1e-9) ms.push(m); } return ms; },
    },
    {
      id: '21.4-b08',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2+(k^2-4)x+k-1=0$ 的两个实数根互为相反数，求 $k$。',
      blanks: [{ kind: 'nums', label: '$k=$（有几个填几个，用逗号隔开）', answer: ['-2'] }],
      explain: [
        '两根互为相反数，和为 $0$：$-(k^2-4)=0$，$k=\\pm2$。',
        '检验：$k=2$ 时方程是 $x^2+1=0$，没有实数根，舍去；$k=-2$ 时方程是 $x^2-3=0$，两根 $\\pm\\sqrt3$，符合。',
        '所以 $k=-2$。坑：只用和为 $0$，不检查方程有没有实数根。',
      ],
      verify: () => { const ks = []; for (let k = -10; k <= 10; k++) { const r = roots214(1, k * k - 4, k - 1); if (r.length && Math.abs(r[0] + r[1]) < 1e-9) ks.push(k); } return ks; },
    },
    {
      id: '21.4-b09',
      level: 'basic',
      type: 'fill',
      stem: '一个长方形的长和宽恰好是方程 $x^2-7x+11=0$ 的两个根。（结果化成最简形式）',
      blanks: [
        { kind: 'num', label: '(1) 长方形的周长是', answer: '14' },
        { kind: 'num', label: '(2) 面积是', answer: '11' },
        { kind: 'real', label: '(3) 长与宽的差是', answer: '√5', simplest: true },
      ],
      explain: [
        '$\\Delta=49-44=5>0$，两根之和 $7$、之积 $11$ 都是正数，两根都是正数，能作长方形的边。',
        '(1) 周长 $=2(x_1+x_2)=14$。坑：写成 $7$。(2) 面积 $=x_1x_2=11$。',
        '(3) $(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=49-44=5$，长减宽是正数，所以差是 $\\sqrt5$。',
      ],
      verify: () => { const [p, q] = roots214(1, -7, 11); return [R214(2 * (p + q)), R214(p * q), Math.abs(p - q)]; },
    },

    // ---------- 扩展 ----------
    {
      id: '21.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '设 $x_1$、$x_2$ 是方程 $x^2-2x-4=0$ 的两个根，求下列各式的值。',
      blanks: [
        { kind: 'num', label: '(1) $x_1^2+2x_2=$', answer: '8' },
        { kind: 'num', label: '(2) $x_1^3+8x_2=$', answer: '24' },
      ],
      explain: [
        '这两个式子 $x_1$、$x_2$ 不对称，不能直接化成和与积。先用根的意义降次：$x_1^2=2x_1+4$。',
        '(1) $x_1^2+2x_2=2x_1+4+2x_2=2(x_1+x_2)+4=2\\times2+4=8$。',
        '(2) $x_1^3=x_1\\cdot x_1^2=2x_1^2+4x_1=2(2x_1+4)+4x_1=8x_1+8$，所以 $x_1^3+8x_2=8(x_1+x_2)+8=24$。',
        '坑：想把 $x_1^2+2x_2$ 硬凑成对称式；降次后要对上两根之和的系数。',
      ],
      verify: () => { const vs = []; const [p, q] = roots214(1, -2, -4); for (const [a, b] of [[p, q], [q, p]]) vs.push([R214(a * a + 2 * b), R214(a ** 3 + 8 * b)]); return vs[0][0] === vs[1][0] && vs[0][1] === vs[1][1] ? vs[0] : null; },
    },
    {
      id: '21.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-6x+k=0$ 的两个实数根为 $x_1$、$x_2$。',
      blanks: [
        { kind: 'num', label: '(1) 若两根之差为 $4$，则 $k=$', answer: '5' },
        { kind: 'num', label: '(2) 若 $3x_1+x_2=14$，则 $k=$', answer: '8' },
      ],
      explain: [
        '$x_1+x_2=6$，$x_1x_2=k$。',
        '(1) $(x_1-x_2)^2=(x_1+x_2)^2-4x_1x_2=36-4k=16$，$k=5$。检验 $\\Delta=36-20>0$。',
        '(2) 把 $3x_1+x_2=14$ 和 $x_1+x_2=6$ 联立：相减得 $2x_1=8$，$x_1=4$，$x_2=2$，$k=x_1x_2=8$。检验 $\\Delta=36-32>0$。',
        '坑：(2) 想用对称式表示 $3x_1+x_2$；它不对称，要和两根之和联立求出两根。',
      ],
      verify: () => { let k1 = null, k2 = null; for (let k = -20; k <= 9; k++) { const [p, q] = roots214(1, -6, k); if (p === undefined) continue; if (Math.abs(Math.abs(p - q) - 4) < 1e-9) k1 = k; if (Math.abs(3 * p + q - 14) < 1e-9 || Math.abs(3 * q + p - 14) < 1e-9) k2 = k; } return [k1, k2]; },
    },
    {
      id: '21.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-2(m-1)x+m^2-3=0$。',
      blanks: [
        { kind: 'text', label: '(1) 两个根都是正数时，$m$ 的取值范围是', answer: '$\\sqrt3<m\\leq2$', options: ['$m\\leq2$', '$1<m\\leq2$', '$\\sqrt3<m\\leq2$', '$\\sqrt3<m<2$'] },
        { kind: 'text', label: '(2) 两个根一正一负时，$m$ 的取值范围是', answer: '$-\\sqrt3<m<\\sqrt3$', options: ['$-\\sqrt3<m<\\sqrt3$', '$m<\\sqrt3$', '$-\\sqrt3<m<1$', '$m<2$'] },
      ],
      explain: [
        '$\\Delta=4(m-1)^2-4(m^2-3)=-8m+16$；$x_1+x_2=2(m-1)$；$x_1x_2=m^2-3$。',
        '(1) 三个条件：有实数根 $-8m+16\\geq0$，$m\\leq2$；和为正 $m>1$；积为正 $m^2>3$，即 $m>\\sqrt3$ 或 $m<-\\sqrt3$。取公共部分：$\\sqrt3<m\\leq2$。“两个根”可以相等（相等的两根也算两个根），$m=2$ 时方程是 $(x-1)^2=0$，两根都是 $1$。',
        '(2) 积为负：$m^2<3$，$-\\sqrt3<m<\\sqrt3$。这时 $\\Delta=b^2-4ac$ 中 $ac<0$，自动大于 $0$，不用再加条件。',
        '坑：(1) 漏了判别式条件，或者只用积为正；(2) 又把 $m\\leq2$ 叠上去（虽然不影响结果，但要明白为什么不用）。',
      ],
      verify: () => {
        const ms = []; for (let i = -400; i <= 400; i++) ms.push(i / 100);
        const s3 = S214(3);
        const a = ms.every(m => { const r = roots214(1, -2 * (m - 1), m * m - 3); const both = r.length === 2 && r[0] > 1e-12 && r[1] > 1e-12; return both === (m > s3 && m <= 2); });
        const b = ms.every(m => { const r = roots214(1, -2 * (m - 1), m * m - 3); const opp = r.length === 2 && r[0] * r[1] < 0; return opp === (m > -s3 && m < s3); });
        return [a ? '$\\sqrt3<m\\leq2$' : null, b ? '$-\\sqrt3<m<\\sqrt3$' : null];
      },
    },
    {
      id: '21.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '设 $x_1$、$x_2$ 是方程的两个根，求 $\\lvert x_1\\rvert+\\lvert x_2\\rvert$。（结果化成最简形式）',
      blanks: [
        { kind: 'real', label: '(1) 方程 $x^2-3x-5=0$：$\\lvert x_1\\rvert+\\lvert x_2\\rvert=$', answer: '√29', simplest: true },
        { kind: 'real', label: '(2) 方程 $x^2+5x+3=0$：$\\lvert x_1\\rvert+\\lvert x_2\\rvert=$', answer: '5', simplest: true },
      ],
      explain: [
        '先判断两根的符号，才能去绝对值。',
        '(1) $x_1x_2=-5<0$，一正一负。设 $x_1>0>x_2$，则 $\\lvert x_1\\rvert+\\lvert x_2\\rvert=x_1-x_2$。$(x_1-x_2)^2=9+20=29$，所以结果是 $\\sqrt{29}$。坑：写成 $\\lvert x_1+x_2\\rvert=3$。',
        '(2) $\\Delta=13>0$，$x_1x_2=3>0$，$x_1+x_2=-5<0$，两个都是负数，$\\lvert x_1\\rvert+\\lvert x_2\\rvert=-(x_1+x_2)=5$。',
      ],
      verify: () => [roots214(1, -3, -5), roots214(1, 5, 3)].map(r => Math.abs(r[0]) + Math.abs(r[1])),
    },
    {
      id: '21.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的一元二次方程 $kx^2-2(k+1)x+k-1=0$ 有两个不相等的实数根 $x_1$、$x_2$。',
      blanks: [
        { kind: 'text', label: '(1) $k$ 的取值范围是', answer: '$k>-\\dfrac13$ 且 $k\\neq0$', options: ['$k>-\\dfrac13$', '$k>-\\dfrac13$ 且 $k\\neq0$', '$k\\geq-\\dfrac13$ 且 $k\\neq0$', '$k<-\\dfrac13$'] },
        { kind: 'nums', label: '(2) 使 $(x_1+x_2)-x_1x_2$ 的值为整数的整数 $k$ 有（全部填出，用逗号隔开）', answer: ['1', '3'] },
      ],
      explain: [
        '(1) 一元二次方程：$k\\neq0$。$\\Delta=4(k+1)^2-4k(k-1)=12k+4>0$，$k>-\\frac13$。所以 $k>-\\frac13$ 且 $k\\neq0$。',
        '(2) $x_1+x_2=\\frac{2(k+1)}k$，$x_1x_2=\\frac{k-1}k$，相减：$\\frac{2k+2-k+1}k=\\frac{k+3}k=1+\\frac3k$。',
        '要是整数，$k$ 是 $3$ 的因数：$k=\\pm1$ 或 $\\pm3$。再用 (1) 的范围筛选：$-1$、$-3$ 不满足 $k>-\\frac13$，舍去。所以 $k=1$ 或 $3$。',
        '坑：求出 $k=\\pm1,\\pm3$ 就交卷，不用判别式的范围筛选。',
      ],
      verify: () => {
        const ks = [];
        for (let k = -20; k <= 20; k++) {
          if (k === 0) continue;
          const r = roots214(k, -2 * (k + 1), k - 1);
          if (r.length === 2 && Math.abs(r[0] - r[1]) > 1e-9) { const v = r[0] + r[1] - r[0] * r[1]; if (Math.abs(v - Math.round(v)) < 1e-9) ks.push(k); }
        }
        const ok = [-0.3, 0.5, 2].every(k => 12 * k + 4 > 0) && [-1, -0.34].every(k => 12 * k + 4 <= 0);
        return [ok ? '$k>-\\dfrac13$ 且 $k\\neq0$' : null, ks];
      },
    },
    {
      id: '21.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '设 $x_1$、$x_2$ 是方程 $x^2+6x+4=0$ 的两个根，求下列各式的值。',
      blanks: [
        { kind: 'num', label: '(1) $\\sqrt{\\dfrac{x_2}{x_1}}+\\sqrt{\\dfrac{x_1}{x_2}}=$', answer: '3' },
        { kind: 'num', label: '(2) $x_1\\sqrt{\\dfrac{x_2}{x_1}}+x_2\\sqrt{\\dfrac{x_1}{x_2}}=$', answer: '-4' },
      ],
      explain: [
        '$\\Delta=36-16>0$，$x_1+x_2=-6$，$x_1x_2=4$。积为正、和为负，两根都是**负数**。',
        '(1) $\\sqrt{\\frac{x_2}{x_1}}=\\sqrt{\\frac{x_1x_2}{x_1^2}}=\\frac{\\sqrt{x_1x_2}}{\\lvert x_1\\rvert}=\\frac{2}{-x_1}$，同理 $\\sqrt{\\frac{x_1}{x_2}}=\\frac2{-x_2}$。和为 $-2\\left(\\frac1{x_1}+\\frac1{x_2}\\right)=-2\\times\\frac{-6}4=3$。',
        '(2) $x_1\\sqrt{\\frac{x_2}{x_1}}=x_1\\cdot\\frac2{-x_1}=-2$，同理第二项也是 $-2$，和为 $-4$。',
        '坑：把 $\\sqrt{x_1^2}$ 当成 $x_1$，得到 $-3$ 和 $4$。',
      ],
      verify: () => { const [p, q] = roots214(1, 6, 4); return [R214(S214(q / p) + S214(p / q)), R214(p * S214(q / p) + q * S214(p / q))]; },
    },

    // ---------- 挑战 ----------
    {
      id: '21.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2+mx+m+5=0$，$m$ 是整数。',
      blanks: [
        { kind: 'nums', label: '(1) 若方程的两个根都是整数，则 $m$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['-5', '-3', '7', '9'] },
        { kind: 'nums', label: '(2) 若方程的两个根都是整数，且至少有一个是正整数，则 $m=$（全部填出，用逗号隔开）', answer: ['-5', '-3'] },
      ],
      explain: [
        '关键转化：两根之和 $x_1+x_2=-m$，两根之积 $x_1x_2=m+5$，两式相加把 $m$ 消掉：$x_1x_2+x_1+x_2=5$，两边加 $1$：$(x_1+1)(x_2+1)=6$。',
        '(1) $x_1+1$、$x_2+1$ 是整数，积为 $6$：$\\{1,6\\}$、$\\{2,3\\}$、$\\{-1,-6\\}$、$\\{-2,-3\\}$。对应两根 $\\{0,5\\}$、$\\{1,2\\}$、$\\{-2,-7\\}$、$\\{-3,-4\\}$，$m=-(x_1+x_2)=-5,-3,9,7$。',
        '检验：如 $m=-5$ 时方程是 $x^2-5x=0$，根是 $0$、$5$；$m=7$ 时 $x^2+7x+12=0$，根是 $-3$、$-4$，都对。',
        '(2) 在四组根里找含正整数的：$\\{0,5\\}$ 中 $5$ 是正整数，$\\{1,2\\}$ 两个都是，另两组全是负数。所以 $m=-5$ 或 $-3$。坑：看到 $0$ 不是正整数就把 $\\{0,5\\}$ 整组排除；或者漏掉负因数的分解。',
      ],
      verify: () => {
        const ms = [], pos = [];
        for (let m = -50; m <= 50; m++) {
          const r = roots214(1, m, m + 5);
          if (r.length && r.every(x => Math.abs(x - Math.round(x)) < 1e-9)) { ms.push(m); if (r.some(x => x > 0.5)) pos.push(m); }
        }
        return [ms, pos];
      },
    },
    {
      id: '21.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的两个方程：① $x^2+px+q=0$；② $x^2+qx+p=0$，它们都有实数根。',
      blanks: [
        { kind: 'num', label: '(1) 若①的两根分别比②的两根大 $1$，则 $p=$', answer: '-3' },
        { kind: 'num', label: '$q=$', answer: '-1' },
        { kind: 'nums', label: '(2) 若①的两根分别是②的两根的平方，则 $p$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['0'] },
      ],
      explain: [
        '设②的两根为 $r$、$s$：$r+s=-q$，$rs=p$。',
        '(1) ①的两根是 $r+1$、$s+1$：和 $r+s+2=-p$，所以 $-q+2=-p$，$q=p+2$；积 $(r+1)(s+1)=rs+(r+s)+1=p-q+1=q$，所以 $p+1=2q$。联立得 $p=-3$，$q=-1$。',
        '检验：①是 $x^2-3x-1=0$，②是 $x^2-x-3=0$，判别式都大于 $0$；②的根 $\\frac{1\\pm\\sqrt{13}}2$ 加 $1$ 正好是①的根 $\\frac{3\\pm\\sqrt{13}}2$。',
        '(2) ①的两根是 $r^2$、$s^2$：积 $r^2s^2=q$，即 $p^2=q$；和 $r^2+s^2=(r+s)^2-2rs=q^2-2p=-p$，即 $q^2=p$。所以 $p^4=p$，$p(p^3-1)=0$，实数解 $p=0$ 或 $p=1$。',
        '检验：$p=q=1$ 时②是 $x^2+x+1=0$，$\\Delta<0$，没有实数根，舍去；$p=q=0$ 时两个方程都是 $x^2=0$，两根都是 $0$，$0^2=0$，符合。所以 $p=0$。坑：不检验判别式，填上 $p=1$。',
      ],
      verify: () => {
        let pq = null;
        for (let p = -10; p <= 10; p++) for (let q = -10; q <= 10; q++) {
          const a = roots214(1, p, q), b = roots214(1, q, p);
          if (a.length && b.length) { const A = a.slice().sort((u, v) => u - v), B = b.map(x => x + 1).sort((u, v) => u - v); if (Math.abs(A[0] - B[0]) < 1e-9 && Math.abs(A[1] - B[1]) < 1e-9) pq = [p, q]; }
        }
        const ps = [];
        for (let i = -40; i <= 40; i++) for (let j = -40; j <= 40; j++) {
          const p = i / 4, q = j / 4, a = roots214(1, p, q), b = roots214(1, q, p);
          if (!a.length || !b.length) continue;
          const A = a.slice().sort((u, v) => u - v), B = b.map(x => x * x).sort((u, v) => u - v);
          if (Math.abs(A[0] - B[0]) < 1e-9 && Math.abs(A[1] - B[1]) < 1e-9 && !ps.includes(p)) ps.push(p);
        }
        return [pq[0], pq[1], ps];
      },
    },
    {
      id: '21.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-2mx+3m+4=0$ 有两个实数根 $x_1$、$x_2$。',
      blanks: [
        { kind: 'text', label: '(1) $m$ 的取值范围是', answer: '$m\\leq-1$ 或 $m\\geq4$', options: ['$-1\\leq m\\leq4$', '$m\\leq-1$ 或 $m\\geq4$', '$m<-1$ 或 $m>4$', '$m\\geq4$'] },
        { kind: 'num', label: '(2) $(x_1-1)^2+(x_2-1)^2$ 的最小值是', answer: '8' },
        { kind: 'num', label: '此时 $m=$', answer: '-1' },
      ],
      explain: [
        '(1) $\\frac\\Delta4=m^2-(3m+4)=(m-4)(m+1)\\geq0$，所以 $m\\leq-1$ 或 $m\\geq4$。',
        '(2) $x_1+x_2=2m$，$x_1x_2=3m+4$。原式 $=x_1^2+x_2^2-2(x_1+x_2)+2=(4m^2-6m-8)-4m+2=4m^2-10m-6$。',
        '配方：$4m^2-10m-6=4\\left(m-\\frac54\\right)^2-\\frac{49}4$。关键：$m=\\frac54$ 不在 (1) 的范围里，不能直接取 $-\\frac{49}4$（平方和也不可能是负数）。',
        '在 $m\\leq-1$ 上，$m$ 离 $\\frac54$ 越近值越小，最近是 $m=-1$：值 $4+10-6=8$；在 $m\\geq4$ 上最近是 $m=4$：值 $64-40-6=18$。所以最小值是 $8$，此时 $m=-1$（方程 $x^2+2x+1=0$，两根都是 $-1$，$(-2)^2+(-2)^2=8$）。也可以这样验证：原式 $-8=4m^2-10m-14=2(2m-7)(m+1)$，在 $m\\leq-1$ 时两个因式都不大于 $0$，积 $\\geq0$；在 $m\\geq4$ 时两个因式都大于 $0$，积 $>0$。所以原式 $\\geq8$，只在 $m=-1$ 时取等号。',
        '坑：直接取配方的最小值 $-\\frac{49}4$，忘了判别式限制 $m$ 的范围。',
      ],
      verify: () => {
        let best = Infinity, bm = null;
        for (let i = -2000; i <= 2000; i++) { const m = i / 100, r = roots214(1, -2 * m, 3 * m + 4); if (!r.length) continue; const v = (r[0] - 1) ** 2 + (r[1] - 1) ** 2; if (v < best - 1e-12) { best = v; bm = m; } }
        const rangeOk = [-3, -1, 4, 5].every(m => roots214(1, -2 * m, 3 * m + 4).length) && [0, 3.9, -0.9].every(m => !roots214(1, -2 * m, 3 * m + 4).length);
        return [rangeOk ? '$m\\leq-1$ 或 $m\\geq4$' : null, R214(best), bm];
      },
    },
    {
      id: '21.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2+(m-2)x+5-m=0$。',
      blanks: [
        { kind: 'ineq', var: 'm', label: '(1) 若方程的一个根大于 $2$、另一个根小于 $2$，则 $m$ 的取值范围是', answer: 'm<-5' },
        { kind: 'ineq', var: 'm', label: '(2) 若方程的两个根都大于 $2$，则 $m$ 的取值范围是', answer: '-5<m≤-4' },
      ],
      explain: [
        '关键转化：根和 $2$ 比大小，就看 $x_1-2$、$x_2-2$ 的符号。$x_1+x_2=2-m$，$x_1x_2=5-m$。',
        '$(x_1-2)(x_2-2)=x_1x_2-2(x_1+x_2)+4=5-m-4+2m+4=m+5$；$(x_1-2)+(x_2-2)=-m-2$。',
        '(1) 一个大于 $2$、一个小于 $2$：$(x_1-2)(x_2-2)<0$，$m<-5$。这时有实数根吗？$\\Delta=(m-2)^2-4(5-m)=m^2-16$，$m<-5$ 时 $\\Delta>0$，自动满足。',
        '(2) 两个都大于 $2$：$x_1-2$、$x_2-2$ 都是正数，要同时满足 $\\Delta\\geq0$（$m\\leq-4$ 或 $m\\geq4$）、和为正（$m<-2$）、积为正（$m>-5$）。取公共部分：$-5<m\\leq-4$（$m=-4$ 时两根相等，都是 $3$，也算）。',
        '坑：(2) 只要求 $x_1+x_2>4$、$x_1x_2>4$，这不能保证两根都大于 $2$；还要记得判别式。',
      ],
      verify: () => {
        const ok1 = [], ok2 = [];
        for (let i = -1500; i <= 1500; i++) {
          const m = i / 100, r = roots214(1, m - 2, 5 - m);
          if (r.length && Math.abs(r[0] - r[1]) > 1e-12 && (r[0] - 2) * (r[1] - 2) < 0) ok1.push(m);
          if (r.length && r.every(x => x > 2 + 1e-12)) ok2.push(m);
        }
        const a = ok1.every(m => m < -5) && ok1.length === 1000;  // m=−15.00…−5.01 共 1000 个格点
        const b = ok2.every(m => m > -5 && m <= -4) && R214(Math.max(...ok2)) === -4 && R214(Math.min(...ok2)) === -4.99;
        return [a ? 'm<-5' : null, b ? '-5<m≤-4' : null];
      },
    },
    {
      id: '21.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-2mx+m^2-2m-7=0$ 有两个不相等的实数根，它们在数轴上对应的点是 $A$、$B$，$O$ 是原点。（结果化成最简形式）',
      blanks: [
        { kind: 'num', label: '(1) $m$ 必须大于', answer: '-7/2' },
        { kind: 'reals', label: '(2) 若线段 $AB$ 的中点到原点的距离等于 $AB$ 的长，则 $m=$（全部填出，用逗号隔开）', answer: ['4+2√11', '4-2√11'], simplest: true },
        { kind: 'nums', label: '(3) 若原点 $O$ 是线段 $AB$ 的一个三等分点，则 $m=$（全部填出，用逗号隔开）', answer: ['1', '-7/9'] },
      ],
      explain: [
        '(1) $\\frac\\Delta4=m^2-(m^2-2m-7)=2m+7>0$，$m>-\\frac72$。',
        '用韦达定理表示线段：中点对应 $\\frac{x_1+x_2}2=m$；$AB=\\lvert x_1-x_2\\rvert$，$(x_1-x_2)^2=4m^2-4(m^2-2m-7)=4(2m+7)$，$AB=2\\sqrt{2m+7}$。',
        '(2) $\\lvert m\\rvert=2\\sqrt{2m+7}$，两边平方：$m^2=8m+28$，$m=4\\pm2\\sqrt{11}$。检验 $2m+7>0$：$4-2\\sqrt{11}\\approx-2.63>-3.5$，两个都符合。坑：舍掉负值。',
        '(3) $O$ 是三等分点，说明 $O$ 在 $A$、$B$ 之间，离较近的端点 $\\frac13AB$，离中点 $\\frac12AB-\\frac13AB=\\frac16AB$，即 $\\lvert m\\rvert=\\frac16\\cdot2\\sqrt{2m+7}$，$9m^2=2m+7$，$(9m+7)(m-1)=0$。',
        '$m=1$：方程 $x^2-2x-8=0$，根 $4$、$-2$，$O$ 把 $AB$ 分成 $2$ 和 $4$，符合；$m=-\\frac79$：根 $\\frac{14}9$、$-\\frac{28}9$，也符合。坑：只考虑 $O$ 靠近正根一侧的情况。',
      ],
      verify: () => {
        const ok = m => 2 * m + 7 > 0;
        const two = [4 + 2 * S214(11), 4 - 2 * S214(11)].filter(m => ok(m) && Math.abs(Math.abs(m) - 2 * S214(2 * m + 7)) < 1e-9);
        const thirds = [];
        for (let i = -3600; i <= 3600; i++) {
          const m = i / 900; if (!ok(m)) continue;
          const [p, q] = roots214(1, -2 * m, m * m - 2 * m - 7);
          const hi = Math.max(p, q), lo = Math.min(p, q);
          if (lo < 0 && hi > 0 && (Math.abs(hi + 2 * lo) < 1e-9 || Math.abs(2 * hi + lo) < 1e-9)) thirds.push(Q214(m));
        }
        return [F(-7).div(F(2)), two, thirds];
      },
    },
  ],
});
