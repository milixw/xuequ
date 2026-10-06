'use strict';

// 上海数学八年级上册 · 21.3 一元二次方程的判别式
// 知识范围：判别式 Δ=b²−4ac；Δ>0 两个不相等的实数根，Δ=0 两个相等的实数根，Δ<0 没有实数根，反过来也成立；
//   不解方程判断根的情况；含参数时由根的情况求参数（注意二次项系数不为 0，“方程有实数根”还要看二次项系数为 0 的情况）；
//   说明方程一定有实数根（Δ 配成完全平方或平方加正数）
// 可以使用：21.1、21.2 全部，六、七年级全部（因式分解、分式、不等式（组）、三角形三边关系），19、20 章
// 还没学：韦达定理（21.4）；实数范围内二次三项式的因式分解、分式方程化为一元二次方程、列方程解应用题（21.5）；勾股定理（第 22 章）；函数
// 本节约定：解集用 ineq 判分（只接受有理数边界），带“且”“或”的条件用按钮选项

const S213 = Math.sqrt;
const R213 = v => Math.round(v * 1e9) / 1e9;
const disc213 = (a, b, c) => b * b - 4 * a * c;
// 实数根的个数（a=0 时按一次方程算），用来核对
const nroots213 = (a, b, c) => {
  if (Math.abs(a) < 1e-12) return Math.abs(b) < 1e-12 ? (Math.abs(c) < 1e-12 ? Infinity : 0) : 1;
  const d = disc213(a, b, c);
  return d > 1e-12 ? 2 : d < -1e-12 ? 0 : 1;
};
const roots213 = (a, b, c) => {
  const d = disc213(a, b, c);
  if (d < -1e-12) return [];
  if (Math.abs(d) < 1e-12) return [-b / (2 * a)];
  return [(-b + S213(d)) / (2 * a), (-b - S213(d)) / (2 * a)];
};
// 在网格上核对：对每个 t，pred(t) 与 want(t) 一致
const agree213 = (pred, want, lo = -20, hi = 20, step = 0.01) => {
  for (let i = Math.round(lo / step); i <= Math.round(hi / step); i++) { const t = i * step; if (pred(t) !== want(t)) return false; }
  return true;
};

Content.section({
  id: 'math/sh2024/g8s1/21.3',
  title: '一元二次方程的判别式',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 1, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核一轮即判定整节通过，答案全部一致。按建议在 c05 注明正方形也看作长方形，解析不用两根之和、积判断根的正负（韦达定理在 21.4）' },

  intro: [
    {
      title: '判别式',
      body: '求根公式里 $b^2-4ac$ 决定了根的情况，所以把它叫作一元二次方程 $ax^2+bx+c=0$（$a\\neq0$）的**判别式**，记作 $\\Delta=b^2-4ac$。$\\Delta>0$：两个不相等的实数根；$\\Delta=0$：两个相等的实数根；$\\Delta<0$：没有实数根。',
      example: '$3x^2-4x+2=0$：$\\Delta=16-24=-8<0$，没有实数根。不用解方程就能判断。',
      pitfall: '先化成一般形式再找 $a$、$b$、$c$，连同符号一起代入。',
    },
    {
      title: '反过来用：由根的情况求参数',
      body: '上面三条反过来也成立：方程有两个不相等的实数根就有 $\\Delta>0$，有两个相等的实数根就有 $\\Delta=0$，没有实数根就有 $\\Delta<0$，“有实数根”就是 $\\Delta\\geq0$。于是可以列出关于参数的方程或不等式。',
      example: '$x^2-6x+m=0$ 有两个相等的实数根：$36-4m=0$，$m=9$，这时方程是 $(x-3)^2=0$，$x_1=x_2=3$。',
    },
    {
      title: '别忘了二次项系数',
      body: '二次项系数含参数时要小心：说“一元二次方程”或“有**两个**实数根”，就隐含二次项系数不为 $0$；只说“方程有实数根”，二次项系数为 $0$ 时方程是一次方程，也可能有根，要单独检查。',
      example: '“方程 $(k-2)x^2+2x-1=0$ 有两个实数根”要求 $k\\neq2$；而“这个方程有实数根”还要算上 $k=2$ 的情况，那时 $2x-1=0$ 有根。',
    },
    {
      title: '说明方程一定有实数根',
      body: '把含参数的 $\\Delta$ 整理成 $(\\ )^2$ 或 $(\\ )^2+$正数 的形式：$\\Delta=(\\ )^2\\geq0$ 说明一定有实数根（可能相等）；$\\Delta=(\\ )^2+$正数$>0$ 说明一定有两个不相等的实数根。',
      example: '$x^2-2mx+m^2-1=0$：$\\Delta=4m^2-4(m^2-1)=4>0$，无论 $m$ 取何值都有两个不相等的实数根。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '21.3-b01',
      level: 'basic',
      type: 'fill',
      stem: '不解方程，判断下列方程的实数根的情况。',
      blanks: [
        { kind: 'text', label: '(1) $2x^2-3x-4=0$', answer: '两个不相等的实数根', options: ['两个不相等的实数根', '两个相等的实数根', '没有实数根'] },
        { kind: 'text', label: '(2) $4x^2+9=12x$', answer: '两个相等的实数根', options: ['两个不相等的实数根', '两个相等的实数根', '没有实数根'] },
        { kind: 'text', label: '(3) $x^2+2\\sqrt2x+3=0$', answer: '没有实数根', options: ['两个不相等的实数根', '两个相等的实数根', '没有实数根'] },
      ],
      explain: [
        '(1) $\\Delta=(-3)^2-4\\times2\\times(-4)=9+32=41>0$，两个不相等的实数根。',
        '(2) 先化成一般形式 $4x^2-12x+9=0$，$\\Delta=144-144=0$，两个相等的实数根。坑：直接拿 $b=0$、$c=9$ 算成 $\\Delta<0$。',
        '(3) $\\Delta=(2\\sqrt2)^2-4\\times1\\times3=8-12=-4<0$，没有实数根。坑：$(2\\sqrt2)^2$ 算成 $4\\sqrt2$ 或 $8\\sqrt2$。',
      ],
      verify: () => {
        const name = n => ['没有实数根', '两个相等的实数根', '两个不相等的实数根'][n];
        return [name(nroots213(2, -3, -4)), name(nroots213(4, -12, 9)), name(nroots213(1, 2 * S213(2), 3))];
      },
    },
    {
      id: '21.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-4x+k=0$。',
      blanks: [
        { kind: 'ineq', var: 'k', label: '(1) 有两个不相等的实数根时，$k$ 的取值范围是', answer: 'k<4' },
        { kind: 'ineq', var: 'k', label: '(2) 没有实数根时，$k$ 的取值范围是', answer: 'k>4' },
      ],
      explain: [
        '$\\Delta=(-4)^2-4k=16-4k$。',
        '(1) $16-4k>0$，$k<4$。坑：写成 $k\\leq4$，$k=4$ 时两根相等。',
        '(2) $16-4k<0$，$k>4$。',
      ],
      verify: () => [
        agree213(k => nroots213(1, -4, k) === 2, k => k < 4) ? 'k<4' : null,
        agree213(k => nroots213(1, -4, k) === 0, k => k > 4) ? 'k>4' : null,
      ],
    },
    {
      id: '21.3-b03',
      level: 'basic',
      type: 'choice',
      stem: '关于 $x$ 的方程 $(k-1)x^2-2x+1=0$ 有两个实数根，则 $k$ 的取值范围是（　　）',
      options: ['$k\\leq2$', '$k<2$', '$k\\leq2$ 且 $k\\neq1$', '$k<2$ 且 $k\\neq1$'],
      answer: 2,
      explain: [
        '有两个实数根，方程必须是一元二次方程，$k-1\\neq0$，即 $k\\neq1$。',
        '“两个实数根”可以相等，所以 $\\Delta\\geq0$：$4-4(k-1)\\geq0$，$8-4k\\geq0$，$k\\leq2$。',
        '所以 $k\\leq2$ 且 $k\\neq1$，选 C。坑：漏掉 $k\\neq1$ 选 A；把“两个实数根”当成“两个不相等的实数根”选 D。',
      ],
      verify: () => {
        const want = k => k !== 1 && 8 - 4 * k >= 0;
        const preds = [k => k <= 2, k => k < 2, k => k <= 2 && k !== 1, k => k < 2 && k !== 1];
        const grid = [-3, 0, 1, 1.5, 2, 2.5, 3];
        return preds.findIndex(p => grid.every(k => p(k) === want(k)));
      },
    },
    {
      id: '21.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $kx^2+4x-2=0$ 有实数根，求 $k$ 的取值范围。',
      blanks: [{ kind: 'ineq', var: 'k', label: '$k$ 的取值范围是', answer: 'k≥-2' }],
      explain: [
        '题目只说“方程有实数根”，没说是一元二次方程，所以分两种情况。',
        '$k=0$ 时方程是 $4x-2=0$，$x=\\frac12$，有实数根，符合。',
        '$k\\neq0$ 时，$\\Delta=16+8k\\geq0$，$k\\geq-2$。合起来：$k\\geq-2$（$k=0$ 已经包含在里面）。',
        '坑：按一元二次方程处理，写成“$k\\geq-2$ 且 $k\\neq0$”。',
      ],
      verify: () => (agree213(k => nroots213(k, 4, -2) >= 1, k => k >= -2) ? 'k≥-2' : null),
    },
    {
      id: '21.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-mx+9=0$ 有两个相等的实数根。',
      blanks: [
        { kind: 'nums', label: '(1) $m=$（有几个填几个，用逗号隔开）', answer: ['6', '-6'] },
        { kind: 'nums', label: '(2) 当 $m$ 取负值时，方程的根是 $x_1=x_2=$', answer: ['-3'] },
      ],
      explain: [
        '(1) $\\Delta=m^2-36=0$，$m^2=36$，$m=\\pm6$。坑：只写 $m=6$。',
        '(2) $m=-6$ 时方程是 $x^2+6x+9=0$，即 $(x+3)^2=0$，$x_1=x_2=-3$。',
      ],
      verify: () => {
        const ms = []; for (let m = -20; m <= 20; m++) if (nroots213(1, -m, 9) === 1) ms.push(m);
        return [ms, roots213(1, -Math.min(...ms), 9)];
      },
    },
    {
      id: '21.3-b06',
      level: 'basic',
      type: 'multi',
      stem: '下列说法正确的有（　　）',
      options: [
        '若 $a$、$c$ 异号，则关于 $x$ 的方程 $ax^2+bx+c=0$ 一定有两个不相等的实数根',
        '方程 $x^2+1=2x$ 没有实数根',
        '若关于 $x$ 的方程 $ax^2+bx+c=0$（$a\\neq0$）没有实数根，则 $a$、$c$ 一定同号',
        '若 $b^2-4ac\\geq0$，则关于 $x$ 的方程 $ax^2+bx+c=0$（$a\\neq0$）有两个不相等的实数根',
      ],
      answer: [0, 2],
      explain: [
        'A：$a$、$c$ 异号时 $ac<0$，$-4ac>0$，$\\Delta=b^2-4ac>0$，正确（异号也说明 $a\\neq0$）。',
        'B：化成 $x^2-2x+1=0$，$\\Delta=0$，有两个相等的实数根，错误。坑：没移项就以为没有根。',
        'C：没有实数根，$\\Delta=b^2-4ac<0$，即 $4ac>b^2\\geq0$，所以 $ac>0$，$a$、$c$ 同号，正确。',
        'D：$b^2-4ac=0$ 时两根相等，错误。选 A、C。',
      ],
      verify: () => {
        // A、C 在一批系数上检验；B、D 各给一个反例
        const cs = [];
        for (let a = -3; a <= 3; a++) for (let b = -4; b <= 4; b++) for (let c = -3; c <= 3; c++) if (a !== 0) cs.push([a, b, c]);
        const A = cs.every(([a, b, c]) => !(a * c < 0) || nroots213(a, b, c) === 2);
        const B = nroots213(1, -2, 1) === 0;
        const C = cs.every(([a, b, c]) => nroots213(a, b, c) !== 0 || a * c > 0);
        const D = cs.every(([a, b, c]) => disc213(a, b, c) < 0 || nroots213(a, b, c) === 2);
        return [A, B, C, D].map((ok, i) => (ok ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '21.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2+(2k+1)x+k^2-2=0$ 有两个不相等的实数根，求 $k$ 的最小整数值。',
      blanks: [{ kind: 'num', label: '$k$ 的最小整数值是', answer: '-2' }],
      explain: [
        '$\\Delta=(2k+1)^2-4(k^2-2)=4k^2+4k+1-4k^2+8=4k+9>0$，所以 $k>-\\frac94$。',
        '$-\\frac94=-2.25$，大于它的最小整数是 $-2$。',
        '坑：展开 $(2k+1)^2$ 漏了 $4k$；或者在数轴上往左数，填成 $-3$。',
      ],
      verify: () => { for (let k = -10; k <= 10; k++) if (nroots213(1, 2 * k + 1, k * k - 2) === 2) return k; return null; },
    },
    {
      id: '21.3-b08',
      level: 'basic',
      type: 'choice',
      stem: '关于 $x$ 的方程 $x^2-(m+3)x+3m=0$ 的根的情况是（　　）',
      options: ['一定有两个不相等的实数根', '一定有实数根', '一定没有实数根', '无法确定，与 $m$ 的取值有关'],
      answer: 1,
      explain: [
        '$\\Delta=(m+3)^2-12m=m^2+6m+9-12m=m^2-6m+9=(m-3)^2\\geq0$。',
        '所以无论 $m$ 取何值，方程一定有实数根；$m=3$ 时 $\\Delta=0$，两根相等，所以不能说“一定有两个不相等的实数根”。选 B。',
        '坑：看到 $\\Delta$ 是平方就选 A。',
      ],
      verify: () => {
        const ns = []; for (let m = -10; m <= 10; m++) ns.push(nroots213(1, -(m + 3), 3 * m));
        if (ns.every(n => n === 2)) return 0;
        if (ns.every(n => n >= 1)) return 1;
        if (ns.every(n => n === 0)) return 2;
        return 3;
      },
    },
    {
      id: '21.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-2x+m=0$ 没有实数根，化简 $\\sqrt{(1-m)^2}+\\lvert m\\rvert$。',
      blanks: [{ kind: 'expr', label: '结果是', answer: '2m-1' }],
      explain: [
        '没有实数根：$\\Delta=4-4m<0$，所以 $m>1$。',
        '$\\sqrt{(1-m)^2}=\\lvert1-m\\rvert=m-1$（$1-m<0$）；$\\lvert m\\rvert=m$。',
        '原式 $=m-1+m=2m-1$。坑：$\\sqrt{(1-m)^2}$ 直接写成 $1-m$。',
      ],
      verify: () => ([1.5, 2, 7].every(m => nroots213(1, -2, m) === 0 && near213(S213((1 - m) ** 2) + Math.abs(m), 2 * m - 1)) ? '2m-1' : null),
    },

    // ---------- 扩展 ----------
    {
      id: '21.3-e01',
      level: 'extended',
      type: 'multi',
      stem: '下列关于 $x$ 的方程中，无论 $k$ 取什么实数，都有两个不相等的实数根的有（　　）',
      options: ['$x^2+kx+k-2=0$', '$x^2-2kx+k^2=0$', '$kx^2+2x-1=0$', '$x^2-(k+1)x+k=0$', '$(k^2+1)x^2+3x-1=0$', '$x^2+2kx+2k^2+1=0$'],
      answer: [0, 4],
      explain: [
        'A：$\\Delta=k^2-4(k-2)=k^2-4k+8=(k-2)^2+4>0$，是。',
        'B：$\\Delta=4k^2-4k^2=0$，两根总相等，不是。C：$k=0$ 时是一次方程，只有一个根；$k=-1$ 时 $\\Delta=4-4=0$。不是。',
        'D：$\\Delta=(k+1)^2-4k=(k-1)^2$，$k=1$ 时为 $0$，不是。坑：看到平方就以为大于 $0$。',
        'E：$k^2+1>0$，总是一元二次方程；$\\Delta=9+4(k^2+1)>0$，是。F：$\\Delta=4k^2-4(2k^2+1)=-4k^2-4<0$，总没有实数根。',
        '选 A、E。',
      ],
      verify: () => {
        const eqs = [k => [1, k, k - 2], k => [1, -2 * k, k * k], k => [k, 2, -1], k => [1, -(k + 1), k], k => [k * k + 1, 3, -1], k => [1, 2 * k, 2 * k * k + 1]];
        const ks = []; for (let i = -400; i <= 400; i++) ks.push(i / 20);
        return eqs.map((f, i) => (ks.every(k => nroots213(...f(k)) === 2) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '21.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的两个方程：① $x^2+2x+m=0$；② $mx^2+2x+1=0$。',
      blanks: [
        { kind: 'text', label: '(1) 是否存在实数 $m$，使方程①有两个不相等的实数根，而方程②没有实数根？', answer: '不存在', options: ['存在', '不存在'] },
        { kind: 'text', label: '(2) 若两个方程都有两个不相等的实数根，则 $m$ 的取值范围是', answer: '$m<1$ 且 $m\\neq0$', options: ['$m<1$', '$m\\leq1$', '$m<1$ 且 $m\\neq0$', '$m\\leq1$ 且 $m\\neq0$'] },
      ],
      explain: [
        '方程①：$\\Delta_1=4-4m$。方程②：$m\\neq0$ 时 $\\Delta_2=4-4m$，和 $\\Delta_1$ **相等**；$m=0$ 时②是 $2x+1=0$，有一个根。',
        '(1) 要①有两个不相等的实数根：$4-4m>0$，$m<1$。要②没有实数根：$m=0$ 时②有根，不行；$m\\neq0$ 时要 $4-4m<0$，即 $m>1$，和 $m<1$ 矛盾。所以不存在。',
        '(2) ①：$m<1$；②：$m\\neq0$ 且 $4-4m>0$。合起来 $m<1$ 且 $m\\neq0$。坑：漏掉②的二次项系数 $m\\neq0$。',
      ],
      verify: () => {
        const ms = []; for (let i = -300; i <= 300; i++) ms.push(i / 50);
        const exists = ms.some(m => nroots213(1, 2, m) === 2 && nroots213(m, 2, 1) === 0);
        const both = agree213(m => nroots213(1, 2, m) === 2 && nroots213(m, 2, 1) === 2, m => m < 1 && Math.abs(m) > 1e-9, -6, 6, 0.02);
        return [exists ? '存在' : '不存在', both ? '$m<1$ 且 $m\\neq0$' : null];
      },
    },
    {
      id: '21.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的一元二次方程 $(k-1)x^2+4x+2=0$ 有两个不相等的实数根，且 $k$ 为正整数。（结果化成最简形式）',
      blanks: [
        { kind: 'nums', label: '(1) $k=$（有几个填几个，用逗号隔开）', answer: ['2'] },
        { kind: 'reals', label: '(2) 此时方程的根是（用逗号隔开）', answer: ['-2+√2', '-2-√2'], simplest: true },
      ],
      explain: [
        '(1) 一元二次方程：$k\\neq1$。两个不相等的实数根：$\\Delta=16-8(k-1)=24-8k>0$，$k<3$。',
        '正整数 $k$ 只能是 $1$、$2$，去掉 $k=1$，所以 $k=2$。坑：把 $k=1$ 也算上（那时方程是 $4x+2=0$）。',
        '(2) $k=2$：$x^2+4x+2=0$，配方 $(x+2)^2=2$，$x=-2\\pm\\sqrt2$。',
      ],
      verify: () => {
        const ks = []; for (let k = 1; k <= 20; k++) if (k !== 1 && nroots213(k - 1, 4, 2) === 2) ks.push(k);
        return [ks, roots213(ks[0] - 1, 4, 2)];
      },
    },
    {
      id: '21.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的一元二次方程 $(k-1)x^2-2\\sqrt k\\,x+1=0$。',
      blanks: [
        { kind: 'text', label: '(1) 方程有两个不相等的实数根时，$k$ 的取值范围是', answer: '$k\\geq0$ 且 $k\\neq1$', options: ['$k\\neq1$', '$k>0$ 且 $k\\neq1$', '$k\\geq0$ 且 $k\\neq1$', '$k>1$'] },
        { kind: 'reals', label: '(2) 当 $k=3$ 时，方程的根是（化成最简形式，用逗号隔开）', answer: ['(√3+1)/2', '(√3-1)/2'], simplest: true },
      ],
      explain: [
        '(1) 三个条件：$\\sqrt k$ 有意义，$k\\geq0$；一元二次方程，$k\\neq1$；$\\Delta=(2\\sqrt k)^2-4(k-1)=4k-4k+4=4>0$，这一条总成立。',
        '所以 $k\\geq0$ 且 $k\\neq1$。坑：只算 $\\Delta$，发现恒大于 $0$ 就填“$k\\neq1$”，忘了根号里的 $k$ 不能为负。',
        '(2) $k=3$：$2x^2-2\\sqrt3x+1=0$，$\\Delta=4$，$x=\\frac{2\\sqrt3\\pm2}{4}=\\frac{\\sqrt3\\pm1}{2}$。',
      ],
      verify: () => {
        const ok = agree213(k => k >= 0 && Math.abs(k - 1) > 1e-9 && nroots213(k - 1, -2 * S213(k), 1) === 2, k => k >= 0 && Math.abs(k - 1) > 1e-9, 0, 20, 0.01);
        return [ok ? '$k\\geq0$ 且 $k\\neq1$' : null, roots213(2, -2 * S213(3), 1)];
      },
    },
    {
      id: '21.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的两个方程：① $x^2+2mx+4=0$；② $x^2-2x+m=0$。',
      blanks: [
        { kind: 'text', label: '(1) 若两个方程中至少有一个有实数根，则 $m$ 的取值范围是', answer: '$m\\leq1$ 或 $m\\geq2$', options: ['$m\\leq-2$ 或 $m\\geq2$', '$m\\leq1$', '$m\\leq1$ 或 $m\\geq2$', '$1<m<2$'] },
        { kind: 'text', label: '(2) 若两个方程中恰好有一个有实数根，则 $m$ 的取值范围是', answer: '$-2<m\\leq1$ 或 $m\\geq2$', options: ['$-2<m\\leq1$ 或 $m\\geq2$', '$-2<m<2$', '$m\\leq-2$ 或 $1<m<2$', '$-2<m\\leq1$'] },
      ],
      explain: [
        '①有实数根：$4m^2-16\\geq0$，$m^2\\geq4$，即 $m\\leq-2$ 或 $m\\geq2$。②有实数根：$4-4m\\geq0$，$m\\leq1$。',
        '(1) 思路：“至少有一个”的反面是“两个都没有”。两个都没有：$-2<m<2$ 且 $m>1$，即 $1<m<2$。去掉这一段，得 $m\\leq1$ 或 $m\\geq2$。',
        '(2) 恰好一个：①有②没有：$m>1$ 且（$m\\leq-2$ 或 $m\\geq2$），即 $m\\geq2$；②有①没有：$m\\leq1$ 且 $-2<m<2$，即 $-2<m\\leq1$。合起来 $-2<m\\leq1$ 或 $m\\geq2$。',
        '坑：(2) 漏掉 $m\\leq-2$ 时两个方程都有实数根，要从“至少一个”里去掉，不是“恰好一个”。',
      ],
      verify: () => {
        const r1 = m => nroots213(1, 2 * m, 4) >= 1, r2 = m => nroots213(1, -2, m) >= 1;
        const a = agree213(m => r1(m) || r2(m), m => m <= 1 || m >= 2);
        const b = agree213(m => r1(m) !== r2(m), m => (m > -2 && m <= 1) || m >= 2);
        return [a ? '$m\\leq1$ 或 $m\\geq2$' : null, b ? '$-2<m\\leq1$ 或 $m\\geq2$' : null];
      },
    },
    {
      id: '21.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '（已知：一个正整数如果不是完全平方数，它的算术平方根就是无理数。）关于 $x$ 的方程 $x^2-2(m+1)x+m^2+5=0$，$m$ 是整数。',
      blanks: [
        { kind: 'ineq', var: 'm', label: '(1) 方程有实数根时，$m$ 的取值范围是', answer: 'm≥2' },
        { kind: 'num', label: '(2) 在 $1\\leq m\\leq50$ 中，使方程的根都是整数的 $m$ 有', answer: '5', suffix: ' 个' },
        { kind: 'nums', label: '(3) 其中最大的 $m$ 对应方程的根是（用逗号隔开）', answer: ['43', '27'] },
      ],
      explain: [
        '(1) $\\Delta=4(m+1)^2-4(m^2+5)=8m-16\\geq0$，$m\\geq2$。',
        '(2) 由求根公式，$x=\\frac{2(m+1)\\pm\\sqrt{8m-16}}{2}=m+1\\pm\\sqrt{2m-4}$。$m$ 是整数，根是整数当且仅当 $\\sqrt{2m-4}$ 是整数，即 $2m-4$ 是完全平方数（否则根是无理数）。',
        '$2m-4$ 是偶数，它的平方根也是偶数，设 $2m-4=(2t)^2$，$t\\geq0$ 是整数，则 $m=2t^2+2$。$m\\leq50$ 时 $t^2\\leq24$，$t=0,1,2,3,4$，$m=2,4,10,20,34$，共 $5$ 个。',
        '(3) $m=34$：$\\sqrt{2m-4}=8$，根是 $35\\pm8$，即 $43$ 和 $27$。坑：只要求 $2m-4$ 是完全平方数，却从 $m$ 逐个试，容易漏掉 $t=0$（$m=2$，两根相等）。',
      ],
      verify: () => {
        const good = [];
        for (let m = 1; m <= 50; m++) {
          const r = roots213(1, -2 * (m + 1), m * m + 5);
          if (r.length && r.every(x => Math.abs(x - Math.round(x)) < 1e-9)) good.push(m);
        }
        const ok = agree213(m => nroots213(1, -2 * (m + 1), m * m + 5) >= 1, m => m >= 2);
        const top = Math.max(...good);
        return [ok ? 'm≥2' : null, good.length, roots213(1, -2 * (top + 1), top * top + 5).map(R213)];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '21.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $x^2-2(k+1)x+2k^2+mk+5=0$，其中 $m$ 是常数，$k$ 可以取任意实数。',
      blanks: [
        { kind: 'ineq', var: 'm', label: '(1) 若无论 $k$ 取何值，方程都没有实数根，则 $m$ 的取值范围是', answer: '-2<m<6' },
        { kind: 'num', label: '(2) 当 $m=6$ 时，只有 $k$ 取一个值时方程才有实数根，这个值是 $k=$', answer: '-2' },
        { kind: 'num', label: '此时方程的根是 $x_1=x_2=$', answer: '-1' },
      ],
      explain: [
        '$\\frac\\Delta4=(k+1)^2-(2k^2+mk+5)=-k^2+(2-m)k-4$。方程没有实数根，就是这个关于 $k$ 的式子小于 $0$，即 $k^2-(2-m)k+4>0$。',
        '(1) 关键转化：要它对**所有** $k$ 都成立。配方：$k^2-(2-m)k+4=\\left(k-\\frac{2-m}2\\right)^2+4-\\frac{(2-m)^2}4$。平方项最小可以是 $0$，所以对所有 $k$ 都大于 $0$，当且仅当 $4-\\frac{(2-m)^2}4>0$。',
        '即 $(2-m)^2<16$，$-4<2-m<4$，$-2<m<6$。',
        '(2) $m=6$：$\\frac\\Delta4=-k^2-4k-4=-(k+2)^2\\leq0$，只有 $k=-2$ 时 $\\Delta=0$，方程有（两个相等的）实数根，其他 $k$ 都没有。',
        '$k=-2$ 时方程是 $x^2+2x+(8-12+5)=0$，即 $x^2+2x+1=0$，$x_1=x_2=-1$。坑：(1) 只取一个 $k$ 检验；把“对所有 $k$ 成立”误当成“存在 $k$”。',
      ],
      verify: () => {
        const ks = []; for (let i = -400; i <= 400; i++) ks.push(i / 20);
        const never = m => ks.every(k => nroots213(1, -2 * (k + 1), 2 * k * k + m * k + 5) === 0);
        const ok = agree213(never, m => m > -2 && m < 6, -10, 14, 0.05);
        const kk = ks.filter(k => nroots213(1, -2 * (k + 1), 2 * k * k + 6 * k + 5) >= 1);
        return [ok ? '-2<m<6' : null, kk.length === 1 ? kk[0] : null, roots213(1, -2 * (kk[0] + 1), 2 * kk[0] * kk[0] + 6 * kk[0] + 5)[0]];
      },
    },
    {
      id: '21.3-c02',
      level: 'challenge',
      type: 'multi',
      stem: '$a$、$b$、$c$ 是一个三角形的三边长。下列关于 $x$ 的方程中，一定没有实数根的有（　　）',
      options: [
        '$b^2x^2+(b^2+c^2-a^2)x+c^2=0$',
        '$x^2-2ax+(b-c)^2=0$',
        '$(a+b)x^2-2cx+(a+b)=0$',
        '$x^2+2(b+c)x+a^2=0$',
      ],
      answer: [0, 2],
      explain: [
        '三角形三边关系：任意两边之和大于第三边，所以 $b+c-a>0$，$a+b-c>0$，$a+c-b>0$。思路：把 $\\Delta$ 分解成因式，再用三边关系判断每个因式的正负。',
        'A：$\\Delta=(b^2+c^2-a^2)^2-4b^2c^2=(b^2+c^2-a^2-2bc)(b^2+c^2-a^2+2bc)=[(b-c)^2-a^2][(b+c)^2-a^2]$。',
        '再用平方差：$=(b-c-a)(b-c+a)(b+c-a)(b+c+a)$。其中 $b-c-a<0$（因为 $b<a+c$），其余三个都大于 $0$，所以 $\\Delta<0$，没有实数根。',
        'B：$\\frac\\Delta4=a^2-(b-c)^2=(a-b+c)(a+b-c)>0$，有两个不相等的实数根。C：$\\frac\\Delta4=c^2-(a+b)^2=(c-a-b)(c+a+b)<0$，没有实数根。',
        'D：$\\frac\\Delta4=(b+c)^2-a^2=(b+c-a)(b+c+a)>0$，有实数根。选 A、C。坑：A 直接展开四次式无从下手，要两次用平方差。',
      ],
      verify: () => {
        const tris = [];
        for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (let c = 1; c <= 9; c++) if (a + b > c && b + c > a && a + c > b) tris.push([a, b, c]);
        const eqs = [([a, b, c]) => [b * b, b * b + c * c - a * a, c * c], ([a, b, c]) => [1, -2 * a, (b - c) ** 2], ([a, b, c]) => [a + b, -2 * c, a + b], ([a, b, c]) => [1, 2 * (b + c), a * a]];
        return eqs.map((f, i) => (tris.every(t => nroots213(...f(t)) === 0) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '21.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '实数 $x$、$y$ 满足 $x^2+xy+y^2=3$。',
      blanks: [
        { kind: 'ineq', var: 'y', label: '(1) $y$ 的取值范围是', answer: '-2≤y≤2' },
        { kind: 'num', label: '(2) $x+y$ 的最大值是', answer: '2' },
        { kind: 'num', label: '(3) $xy$ 的最小值是', answer: '-3' },
      ],
      explain: [
        '关键转化：把等式看成关于 $x$ 的一元二次方程 $x^2+yx+(y^2-3)=0$。给定 $y$ 时能找到实数 $x$，就是这个方程有实数根。',
        '(1) $\\Delta=y^2-4(y^2-3)=12-3y^2\\geq0$，$y^2\\leq4$，$-2\\leq y\\leq2$。',
        '(2) 再推广：设 $s=x+y$，$y=s-x$，代入：$x^2+x(s-x)+(s-x)^2=3$，整理得 $x^2-sx+s^2-3=0$。要有实数 $x$：$\\Delta=s^2-4(s^2-3)=12-3s^2\\geq0$，$-2\\leq s\\leq2$。$s=2$ 时方程是 $x^2-2x+1=0$，$x=1$，$y=1$，能取到，最大值是 $2$。',
        '(3) 由 (2) 的方程，$xy=x(s-x)=sx-x^2=s^2-3$（因为 $x^2-sx=3-s^2$）。$0\\leq s^2\\leq4$，所以 $xy\\geq-3$，$s=0$ 时取到：$x^2=3$，$x=\\sqrt3$，$y=-\\sqrt3$。最小值是 $-3$。',
        '坑：(3) 以为 $xy$ 最小时 $x+y$ 也取端点；要把 $xy$ 写成 $s$ 的式子再看 $s$ 的范围。',
      ],
      verify: () => {
        // 参数化：对每个 y 求 x，统计 y 的范围、x+y 最大、xy 最小
        let ymin = Infinity, ymax = -Infinity, smax = -Infinity, pmin = Infinity;
        for (let i = -3000; i <= 3000; i++) {
          const y = i / 1000;
          for (const x of roots213(1, y, y * y - 3)) {
            ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); smax = Math.max(smax, x + y); pmin = Math.min(pmin, x * y);
          }
        }
        return [R213(ymin) === -2 && R213(ymax) === 2 ? '-2≤y≤2' : null, Math.round(smax * 1000) / 1000, Math.round(pmin * 1000) / 1000];
      },
    },
    {
      id: '21.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '实数 $a$、$b$、$c$ 满足 $a>b>c$，且 $a+b+c=0$。关于 $x$ 的方程 $ax^2+bx+c=0$。',
      blanks: [
        { kind: 'text', label: '(1) 方程根的情况是', answer: '两个不相等的实数根', options: ['两个不相等的实数根', '两个相等的实数根', '没有实数根', '无法确定'] },
        { kind: 'ineq', var: 'r', label: '(2) 方程有一个根是 $1$，设另一个根为 $r$，则 $r$ 的取值范围是', answer: '-2<r<-1/2' },
        { kind: 'num', label: '(3) 若 $a$、$b$、$c$ 都是整数，且 $a=5$，满足条件的方程共有', answer: '7', suffix: ' 个' },
      ],
      explain: [
        '(1) 三个数的和为 $0$，最大的 $a$ 一定是正数，最小的 $c$ 一定是负数（否则三个数同号或有 $0$，和不可能是 $0$ 且互不相等）。所以 $a\\neq0$，$ac<0$，$\\Delta=b^2-4ac>0$，有两个不相等的实数根。',
        '(2) $a+b+c=0$ 说明 $x=1$ 是根。另一个根：把 $b=-a-c$ 代入，$ax^2-(a+c)x+c=(x-1)(ax-c)$，所以 $r=\\frac ca$。',
        '再把 $a>b>c$ 化成关于 $\\frac ca$ 的不等式：$a>-a-c$ 得 $c>-2a$，两边除以正数 $a$：$\\frac ca>-2$；$-a-c>c$ 得 $c<-\\frac a2$，$\\frac ca<-\\frac12$。所以 $-2<r<-\\frac12$。',
        '(3) $a=5$ 时 $-10<c<-\\frac52$，整数 $c=-9,-8,\\dots,-3$，共 $7$ 个；对应 $b=-5-c$ 依次是 $4,3,\\dots,-2$，都满足 $5>b>c$。所以有 $7$ 个方程。',
        '坑：(2) 只得到 $r<0$，没有利用 $a>b$、$b>c$ 两个条件把范围夹紧。',
      ],
      verify: () => {
        // 枚举整数 a>b>c，a+b+c=0，检验根的情况与 r 的范围
        let allTwo = true, rmin = Infinity, rmax = -Infinity;
        for (let a = 1; a <= 40; a++) for (let c = -80; c < 0; c++) {
          const b = -a - c;
          if (!(a > b && b > c)) continue;
          if (nroots213(a, b, c) !== 2) allTwo = false;
          const r = roots213(a, b, c).find(x => Math.abs(x - 1) > 1e-9);
          rmin = Math.min(rmin, r); rmax = Math.max(rmax, r);
        }
        let n = 0;
        for (let c = -20; c <= 20; c++) { const b = -5 - c; if (5 > b && b > c) n++; }
        const range = rmin > -2 && rmax < -0.5 && rmin < -1.95 && rmax > -0.55;
        return [allTwo ? '两个不相等的实数根' : null, range ? '-2<r<-1/2' : null, n];
      },
    },
    {
      id: '21.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '研究“周长和面积都是已知长方形的若干倍”的长方形是否存在（正方形也看作长方形）。（结果化成最简形式）',
      blanks: [
        { kind: 'real', label: '(1) 已知长方形的长为 $3$、宽为 $1$。存在一个长方形，周长和面积都是它的 $2$ 倍，这个长方形的长是', answer: '4+√10', simplest: true },
        { kind: 'text', label: '(2) 是否存在一个长方形，周长和面积都是这个 $3\\times1$ 长方形的一半？', answer: '不存在', options: ['存在', '不存在'] },
        { kind: 'real', label: '(3) 一般地，已知长方形的长为 $a$、宽为 $b$（$a\\geq b>0$），要存在周长和面积都是它一半的长方形，$\\dfrac ab$ 的最小值是', answer: '3+2√2', simplest: true },
      ],
      explain: [
        '设所求长方形的一边为 $x$。周长是 $2$ 倍时，两邻边之和是原来的 $2$ 倍；面积是 $2$ 倍时，两邻边之积是原来的 $2$ 倍。',
        '(1) 邻边之和 $8$，面积 $6$：另一边是 $8-x$，$x(8-x)=6$，$x^2-8x+6=0$，$x=4\\pm\\sqrt{10}$。两边分别是 $4+\\sqrt{10}$ 和 $4-\\sqrt{10}$（都是正数），长是 $4+\\sqrt{10}$。',
        '(2) 邻边之和 $2$，面积 $\\frac32$：$x^2-2x+\\frac32=0$，$\\Delta=4-6<0$，没有实数根，不存在。',
        '(3) 推广：邻边之和 $\\frac{a+b}2$，面积 $\\frac{ab}2$：$x^2-\\frac{a+b}2x+\\frac{ab}2=0$。要有实数根：$\\Delta=\\frac{(a+b)^2}4-2ab\\geq0$，即 $a^2-6ab+b^2\\geq0$。这时由求根公式 $x=\\frac12\\left(\\frac{a+b}2\\pm\\sqrt\\Delta\\right)$，而 $\\Delta<\\frac{(a+b)^2}4$，所以 $\\sqrt\\Delta<\\frac{a+b}2$，两根都是正数，另一边 $\\frac{a+b}2-x$ 也是正数。',
        '两边除以 $b^2$，设 $t=\\frac ab\\geq1$：$t^2-6t+1\\geq0$，配方 $(t-3)^2\\geq8$，$t-3\\geq2\\sqrt2$ 或 $t-3\\leq-2\\sqrt2$。后者给出 $t\\leq3-2\\sqrt2<1$，舍去。所以 $t\\geq3+2\\sqrt2$，最小值 $3+2\\sqrt2$。取到最小值时两根相等，新长方形是正方形。坑：忘了 $t\\geq1$，把 $3-2\\sqrt2$ 也当成答案。',
      ],
      verify: () => {
        const r1 = Math.max(...roots213(1, -8, 6));
        const ex2 = roots213(1, -2, 1.5).length > 0;
        // 二分找最小的 t=a/b（b=1）使 x² − (t+1)/2·x + t/2 = 0 有正实根
        const ok = t => roots213(1, -(t + 1) / 2, t / 2).some(x => x > 0);
        let lo = 1, hi = 10;
        for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (ok(mid)) hi = mid; else lo = mid; }
        return [r1, ex2 ? '存在' : '不存在', hi];
      },
    },
  ],
});

function near213(x, y) { return Math.abs(x - y) < 1e-9; }
