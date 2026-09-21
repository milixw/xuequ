'use strict';

// 上海数学六年级上册 · 3.2 一元一次方程及其解法
// 知识范围：一元一次方程的概念（一般形式 ax+b=0，a≠0）、等式的性质、移项、解一元一次方程的一般步骤（去括号、移项、合并同类项、系数化为 1），含分数系数的方程用等式性质两边同乘；可以使用第 1、2 章和 3.1 的全部内容
// 还没学：二元一次方程组、不等式、整式乘法（多项式乘多项式）、乘法公式、分式方程

Content.section({
  id: 'math/sh2024/g6s1/3.2',
  title: '一元一次方程及其解法',
  review: { status: 'pending' },
  audit: { blind: '2026-09-21', rounds: 2, note: '子代理盲解复核两轮：答案全部一致；第 2 轮按意见重做 c01（去掉方法提示，加三项轮换的字母方程）、c02（换成取整方程）、c04（加有序整数组计数）、c05（去掉超纲的分式表示，整数情形改用积为 1 论证），升级 e03、e08（加含参一问），修掉卡片与 b01 的撞车，判定整节通过' },

  intro: [
    {
      title: '一元一次方程',
      body: '只含有一个未知数，未知数的次数都是 1，并且化简后能写成 $ax+b=0$（$a\\ne 0$）的方程，叫做**一元一次方程**。“一元”指一个未知数，“一次”指未知数的次数是 1。',
      example: '$\\frac{y}{3}-1=2y$ 是一元一次方程；$y^2-1=0$ 不是（次数是 2）；$\\frac{2}{y}=1$ 不是（未知数在分母上）。',
    },
    {
      title: '等式的性质',
      body: '性质 1：等式两边都加上（或减去）同一个数或同一个式子，结果仍是等式。性质 2：等式两边都乘同一个数，或都除以同一个**不为 0** 的数，结果仍是等式。解方程的每一步变形，都要有等式的性质作依据。',
      example: '由 $m+4=10$，两边都减去 4，得 $m=6$；由 $m-7=-2$，两边都加上 7，得 $m=5$。',
    },
    {
      title: '移项',
      body: '把方程中的某一项改变符号后，从方程的一边移到另一边，叫做**移项**。它的依据是等式性质 1：两边同时加上（或减去）这一项。通常把含未知数的项移到左边，常数项移到右边。',
      example: '$5y-4=2y+8$，把 $2y$ 移到左边变成 $-2y$，把 $-4$ 移到右边变成 $+4$：$5y-2y=8+4$，$3y=12$，$y=4$。',
      pitfall: '移项一定要变号；没有移动的项不变号。',
    },
    {
      title: '解一元一次方程的一般步骤',
      body: '去括号 → 移项 → 合并同类项，整理成 $ax=b$（$a\\ne 0$）的形式 → 两边同除以 $a$（系数化为 1）。有分数系数时，可以先根据等式性质 2，两边同乘各分母的公倍数，把分母去掉。',
      example: '$3(y-2)=y+4$：去括号 $3y-6=y+4$，移项 $3y-y=4+6$，合并 $2y=10$，系数化为 1，$y=5$。',
      pitfall: '两边同乘去分母时，没有分母的项也要乘；分子是几项的和时，去掉分母后要给它加上括号，比如 $\\frac{y+1}{2}-1=y$ 两边乘 2 得 $(y+1)-2=2y$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '3.2-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列根据等式性质进行的变形中，一定正确的有（　　）',
      options: [
        '由 $\\frac{x}{3}=2$，得 $x=6$',
        '由 $3x=2x$，得 $3=2$',
        '由 $2x-3=5$，得 $2x=5-3$',
        '由 $a=b$，得 $\\frac{a}{c^2+1}=\\frac{b}{c^2+1}$',
        '由 $ac=bc$，得 $a=b$',
        '由 $\\frac{a}{c}=\\frac{b}{c}$，得 $a=b$',
      ],
      answer: [0, 3, 5],
      explain: [
        'A 正确：两边同乘 3。',
        'B 错误：两边同除以 $x$，但 $x$ 可能是 0（其实这个方程的解正是 $x=0$），不能这样除。',
        'C 错误：移项要变号，应得 $2x=5+3$。',
        'D 正确：$c^2$ 不会是负数，所以 $c^2+1$ 至少是 1，一定不为 0，两边同除以它是可以的。',
        'E 错误：$c$ 可能是 0。比如 $a=1$，$b=2$，$c=0$ 时 $ac=bc=0$，但 $a\\ne b$。',
        'F 正确：式子 $\\frac{a}{c}$ 有意义，说明 $c\\ne 0$，两边同乘 $c$ 即得 $a=b$。',
        '所以选 A、D、F。判断的关键：除以一个式子前，要确认它不可能为 0。',
      ],
      verify: () => {
        // 每个选项：[前提, 结论]，在一批取值上找反例；前提或结论中出现除以 0 视为不成立
        const safe = f => { try { return f(); } catch (e) { return false; } };
        const vals = [-3, -2, -1, 0, 1, 2, '1/2', '-2/3'].map(F);
        const opts = [
          [v => v.x.div(3).eq(2), v => v.x.eq(6)],
          [v => v.x.mul(3).eq(v.x.mul(2)), () => F(3).eq(2)],
          [v => v.x.mul(2).sub(3).eq(5), v => v.x.mul(2).eq(F(5).sub(3))],
          [v => v.a.eq(v.b), v => v.a.div(v.c.mul(v.c).add(1)).eq(v.b.div(v.c.mul(v.c).add(1)))],
          [v => v.a.mul(v.c).eq(v.b.mul(v.c)), v => v.a.eq(v.b)],
          [v => v.a.div(v.c).eq(v.b.div(v.c)), v => v.a.eq(v.b)],
        ];
        const envs = [];
        for (const a of vals) for (const b of vals) for (const c of vals) envs.push({ a, b, c, x: a });
        for (let i = -40; i <= 40; i++) envs.push({ a: F(0), b: F(0), c: F(0), x: F(i).div(2) });
        return opts.map(([p, q], i) => (envs.every(v => !safe(() => p(v)) || safe(() => q(v))) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '3.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '已知关于 $x$ 的方程 $(k+1)x^2+kx-3=2x$ 是一元一次方程。',
      blanks: [
        { kind: 'num', label: '(1) $k=$', answer: '-1' },
        { kind: 'num', label: '(2) 这个方程的解是 $x=$', answer: '-1' },
      ],
      explain: [
        '先把所有项移到左边整理：$(k+1)x^2+(k-2)x-3=0$。',
        '要成为一元一次方程，$x^2$ 这一项必须没有，即 $k+1=0$，$k=-1$；同时 $x$ 的系数不能为 0，即 $k-2\\ne 0$。$k=-1$ 时 $k-2=-3$，满足。',
        '(2) 代入 $k=-1$：原方程变成 $-x-3=2x$。',
        '移项：$-x-2x=3$，合并：$-3x=3$，系数化为 1：$x=-1$。',
        '易错：只看到 $x^2$ 的系数，忘记检查化简后 $x$ 的系数是否为 0。',
      ],
      verify: () => {
        const ks = [];
        for (let k = -20; k <= 20; k++) {
          const f = x => F(k + 1).mul(x * x).add(F(k).mul(x)).sub(3).sub(2 * x);   // 左边减右边
          const d1 = f(1).sub(f(0)), d2 = f(2).sub(f(1));
          if (d1.eq(d2) && !d1.isZero()) ks.push(k);
        }
        const k = ks[0];
        let x = null;
        for (let i = -400; i <= 400; i++) { const t = F(i).div(20); if (F(k).mul(t).sub(3).eq(t.mul(2))) x = t; }
        return [ks.length === 1 ? k : null, x];
      },
    },
    {
      id: '3.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '解方程。',
      blanks: [
        { kind: 'num', label: '(1) $2(3x-1)-3(x-4)=4-(x+2)$ 的解是 $x=$', answer: '-2' },
        { kind: 'num', label: '(2) $\\frac{2x-1}{3}-\\frac{x+2}{4}=1$ 的解是 $x=$', answer: '22/5' },
      ],
      explain: [
        '(1) 去括号：$6x-2-3x+12=4-x-2$。注意 $-3\\times(-4)=+12$，括号前是“$-$”时 $x+2$ 两项都变号。',
        '移项：$6x-3x+x=4-2+2-12$；合并：$4x=-8$；系数化为 1：$x=-2$。',
        '(2) 两边同乘 12（3 和 4 的最小公倍数）：$4(2x-1)-3(x+2)=12$。右边的 1 也要乘 12。',
        '去括号：$8x-4-3x-6=12$；移项：$8x-3x=12+4+6$；合并：$5x=22$；$x=\\frac{22}{5}$。',
        '常见错误：右边忘乘 12 写成 1；或者去分母后 $-3(x+2)$ 没加括号，写成 $-3x+6$。',
      ],
      verify: () => {
        const root = f => { const k = f(F(1)).sub(f(F(0))); return f(F(0)).neg().div(k); };   // 一次式 f(x)=0 的根
        const r1 = root(x => x.mul(3).sub(1).mul(2).sub(x.sub(4).mul(3)).sub(F(4).sub(x.add(2))));
        const r2 = root(x => x.mul(2).sub(1).div(3).sub(x.add(2).div(4)).sub(1));
        return [r1, r2];
      },
    },
    {
      id: '3.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '小马解关于 $x$ 的方程 $\\frac{3x+1}{2}=\\frac{x-a}{3}+2$ 时，两边同乘 6 去分母，但右边的 2 忘记乘 6，结果求得的解是 $x=-1$。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '3' },
        { kind: 'num', label: '(2) 原方程正确的解是 $x=$', answer: '3/7' },
      ],
      explain: [
        '(1) 按小马的做法，他实际解的方程是 $3(3x+1)=2(x-a)+2$，$x=-1$ 是这个错误方程的解。',
        '代入：左边 $3\\times(-2)=-6$，右边 $2(-1-a)+2=-2-2a+2=-2a$。由 $-6=-2a$ 得 $a=3$。',
        '(2) 正确去分母：$3(3x+1)=2(x-3)+12$。',
        '去括号：$9x+3=2x-6+12$；移项：$9x-2x=-6+12-3$；合并：$7x=3$；$x=\\frac{3}{7}$。',
        '要点：错解满足的是“错误的方程”，所以要先把错误的方程写出来，再把错解代进去。',
      ],
      verify: () => {
        const wrong = (x, a) => F(x).mul(3).add(1).mul(3).eq(F(x).sub(a).mul(2).add(2));
        let a = null;
        for (let i = -200; i <= 200; i++) if (wrong(-1, F(i).div(4))) a = F(i).div(4);
        let x = null;
        for (let i = -700; i <= 700; i++) {
          const t = F(i).div(70);
          if (t.mul(3).add(1).div(2).eq(t.sub(a).div(3).add(2))) x = t;
        }
        return [a, x];
      },
    },
    {
      id: '3.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '解答下列问题。',
      blanks: [
        { kind: 'num', label: '(1) 方程 $\\frac{x-1}{0.3}-\\frac{x+2}{0.5}=1.2$ 的解是 $x=$', answer: '32/5' },
        { kind: 'num', label: '(2) 若 $\\frac{x+1}{2}$ 与 $\\frac{2x-1}{3}$ 的值互为相反数，则 $x=$', answer: '-1/7' },
      ],
      explain: [
        '(1) 先把分母化成整数：$\\frac{x-1}{0.3}$ 的分子、分母同乘 10 得 $\\frac{10x-10}{3}$；$\\frac{x+2}{0.5}$ 同乘 10 得 $\\frac{10x+20}{5}$。这一步用的是分数的基本性质，右边的 1.2 不变。',
        '方程变成 $\\frac{10x-10}{3}-\\frac{10x+20}{5}=1.2$，两边同乘 15：$5(10x-10)-3(10x+20)=18$。',
        '去括号：$50x-50-30x-60=18$；移项、合并：$20x=128$；$x=6.4=\\frac{32}{5}$。',
        '易错：化分母时顺手把 1.2 也乘 10，变成 12。分数的基本性质只改变这一项的写法，不是整个方程乘 10。',
        '(2) 互为相反数，就是两者的和为 0：$\\frac{x+1}{2}+\\frac{2x-1}{3}=0$。',
        '两边同乘 6：$3(x+1)+2(2x-1)=0$，$3x+3+4x-2=0$，$7x=-1$，$x=-\\frac{1}{7}$。',
      ],
      verify: () => {
        const root = f => { const k = f(F(1)).sub(f(F(0))); return f(F(0)).neg().div(k); };
        const r1 = root(x => x.sub(1).div('0.3').sub(x.add(2).div('0.5')).sub('1.2'));
        const r2 = root(x => x.add(1).div(2).add(x.mul(2).sub(1).div(3)));
        return [r1, r2];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '3.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '由方程的解求字母的值。',
      blanks: [
        { kind: 'num', label: '(1) 关于 $x$ 的方程 $2x-a=3$ 与 $\\frac{x+a}{3}=1-x$ 的解相同，则 $a=$', answer: '-1' },
        { kind: 'nums', label: '(2) 关于 $x$ 的方程 $mx+2=2(m-x)$ 的解满足 $\\left|x-\\frac{1}{2}\\right|=1$，则 $m$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['10', '2/5'] },
      ],
      explain: [
        '(1) 两个方程都含 $a$，先各自用 $a$ 表示解。第一个：$2x=3+a$，$x=\\frac{3+a}{2}$。',
        '第二个：两边乘 3，$x+a=3-3x$，$4x=3-a$，$x=\\frac{3-a}{4}$。',
        '解相同：$\\frac{3+a}{2}=\\frac{3-a}{4}$，两边乘 4：$6+2a=3-a$，$3a=-3$，$a=-1$。此时两个方程的解都是 $x=1$。',
        '(2) 由 $\\left|x-\\frac{1}{2}\\right|=1$ 得 $x-\\frac{1}{2}=1$ 或 $-1$，即 $x=\\frac{3}{2}$ 或 $x=-\\frac{1}{2}$。分别代入求 $m$。',
        '$x=\\frac{3}{2}$：$\\frac{3}{2}m+2=2m-3$，两边乘 2：$3m+4=4m-6$，$m=10$。',
        '$x=-\\frac{1}{2}$：$-\\frac{1}{2}m+2=2m+1$，两边乘 2：$-m+4=4m+2$，$5m=2$，$m=\\frac{2}{5}$。',
        '所以 $m=10$ 或 $\\frac{2}{5}$。',
      ],
      verify: () => {
        const root = f => { const k = f(F(1)).sub(f(F(0))); return k.isZero() ? null : f(F(0)).neg().div(k); };
        let a1 = null;
        for (let i = -200; i <= 200; i++) {
          const a = F(i).div(10);
          const r1 = root(x => x.mul(2).sub(a).sub(3));
          const r2 = root(x => x.add(a).div(3).sub(F(1).sub(x)));
          if (r1 && r2 && r1.eq(r2)) a1 = a;
        }
        const ms = [];
        for (let i = -400; i <= 400; i++) {
          const m = F(i).div(20);
          const r = root(x => m.mul(x).add(2).sub(m.sub(x).mul(2)));
          if (r && r.sub('1/2').abs().eq(1)) ms.push(m);
        }
        return [a1, ms];
      },
    },
    {
      id: '3.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '解含绝对值的方程（全部填出，用逗号隔开；解出后要检验）。',
      blanks: [
        { kind: 'nums', label: '(1) $|3x-2|=2x+1$ 的解是', answer: ['3', '1/5'] },
        { kind: 'nums', label: '(2) $|x-3|=2x+3$ 的解是', answer: ['0'] },
        { kind: 'nums', label: '(3) $|2x-3|=|x+1|$ 的解是', answer: ['4', '2/3'] },
      ],
      explain: [
        '一个数的绝对值等于 $m$，这个数就是 $m$ 或 $-m$；但右边含未知数时，$m$ 本身必须不是负数，所以解出来后一定要检验。',
        '(1) $3x-2=2x+1$，得 $x=3$；或 $3x-2=-(2x+1)$，即 $3x-2=-2x-1$，$5x=1$，$x=\\frac{1}{5}$。',
        '检验：$x=3$ 时左边 7，右边 7；$x=\\frac{1}{5}$ 时左边 $\\left|\\frac{3}{5}-2\\right|=\\frac{7}{5}$，右边 $\\frac{7}{5}$。两个都是解。',
        '(2) $x-3=2x+3$，得 $x=-6$；或 $x-3=-(2x+3)$，即 $x-3=-2x-3$，$3x=0$，$x=0$。',
        '检验：$x=-6$ 时右边 $2\\times(-6)+3=-9$ 是负数，而左边绝对值不可能是负数，舍去；$x=0$ 时左边 3，右边 3，成立。所以只有 $x=0$。',
        '(3) 两个数的绝对值相等，这两个数相等或互为相反数：$2x-3=x+1$，得 $x=4$；或 $2x-3=-(x+1)$，$3x=2$，$x=\\frac{2}{3}$。',
        '检验：$x=4$ 时两边都是 5；$x=\\frac{2}{3}$ 时两边都是 $\\frac{5}{3}$。两边都是绝对值，不会出现负数的问题。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -600; i <= 600; i++) xs.push(F(i).div(15));
        return [
          xs.filter(x => x.mul(3).sub(2).abs().eq(x.mul(2).add(1))),
          xs.filter(x => x.sub(3).abs().eq(x.mul(2).add(3))),
          xs.filter(x => x.mul(2).sub(3).abs().eq(x.add(1).abs())),
        ];
      },
    },
    {
      id: '3.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '用“整体”的眼光解方程。',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{1}{2}\\left[\\frac{1}{3}\\left(\\frac{1}{4}x-1\\right)-2\\right]-3=-1$ 的解是 $x=$', answer: '76' },
        { kind: 'num', label: '(2) $3(2x+1)-\\frac{2x+1}{2}=10$ 的解是 $x=$', answer: '3/2' },
        { kind: 'expr', label: '(3) 已知关于 $x$ 的方程 $ax+b=c$（$a\\ne 0$）的解是 $x=n$，则关于 $y$ 的方程 $a(3y-1)+b=c$ 的解是 $y=$（用含 $n$ 的式子表示）', answer: '(n+1)/3' },
      ],
      explain: [
        '(1) 多层括号不必一层层展开，可以从外往里“剥”：把中括号看成一个整体。',
        '移项：$\\frac{1}{2}[\\cdots]=2$，所以 $[\\cdots]=4$，即 $\\frac{1}{3}\\left(\\frac{1}{4}x-1\\right)-2=4$。',
        '再剥一层：$\\frac{1}{3}\\left(\\frac{1}{4}x-1\\right)=6$，所以 $\\frac{1}{4}x-1=18$，$\\frac{1}{4}x=19$，$x=76$。',
        '(2) $2x+1$ 出现了两次，把它看成一个整体，记作 $u$：$3u-\\frac{u}{2}=10$，$\\frac{5}{2}u=10$，$u=4$。即 $2x+1=4$，$x=\\frac{3}{2}$。',
        '(3) 第二个方程就是把第一个方程中的 $x$ 整体换成了 $3y-1$。',
        '第一个方程 $a\\ne 0$，是一元一次方程，只有一个解 $n$。所以第二个方程成立，当且仅当 $3y-1=n$。',
        '于是 $3y=n+1$，$y=\\frac{n+1}{3}$。这里不需要知道 $a$、$b$、$c$ 各是多少。',
      ],
      verify: () => {
        const root = f => { const k = f(F(1)).sub(f(F(0))); return f(F(0)).neg().div(k); };
        const r1 = root(x => x.div(4).sub(1).div(3).sub(2).div(2).sub(3).add(1));
        const r2 = root(x => x.mul(2).add(1).mul(3).sub(x.mul(2).add(1).div(2)).sub(10));
        // (3) 任取几组 a、b、c，求出 n 与 y，还原 y 关于 n 的一次式
        const pts = [[2, 3, 7], [-5, 1, 4], [3, -2, 10]].map(([a, b, c]) => {
          const n = root(x => x.mul(a).add(b).sub(c));
          const y = root(t => t.mul(3).sub(1).mul(a).add(b).sub(c));
          return [n, y];
        });
        const k = pts[1][1].sub(pts[0][1]).div(pts[1][0].sub(pts[0][0]));
        const c0 = pts[0][1].sub(k.mul(pts[0][0]));
        const ok = pts.every(([n, y]) => k.mul(n).add(c0).eq(y));
        return [r1, r2, ok ? `${k}*n+${c0}` : null];
      },
    },
    {
      id: '3.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知关于 $x$ 的方程 $\\frac{2kx+a}{3}=2+\\frac{x-bk}{6}$（$a$、$b$ 是常数），无论 $k$ 取什么值，$x=1$ 总是这个方程的解。',
      blanks: [
        { kind: 'num', label: '(1) $a=$', answer: '13/2' },
        { kind: 'num', label: '(2) $b=$', answer: '-4' },
        { kind: 'text', label: '(3) 在此条件下，当 $k=\\frac{1}{4}$ 时，这个方程', options: ['只有一个解 x=1', '没有解', '任何数都是解'], answer: '任何数都是解' },
      ],
      explain: [
        '(1)(2) 把 $x=1$ 代入：$\\frac{2k+a}{3}=2+\\frac{1-bk}{6}$。两边乘 6：$4k+2a=12+1-bk$。',
        '把含 $k$ 的项移到一起：$4k+bk+2a-13=0$，即 $(4+b)k+(2a-13)=0$。',
        '“无论 $k$ 取什么值都成立”，说明这个式子与 $k$ 无关：$k$ 的系数 $4+b=0$，并且剩下的常数 $2a-13=0$。',
        '所以 $b=-4$，$a=\\frac{13}{2}$。',
        '(3) 把 $a=\\frac{13}{2}$、$b=-4$ 代回原方程，两边乘 6：$4kx+13=12+x+4k$。',
        '移项：$4kx-x=4k-1$，即 $(4k-1)x=4k-1$。当 $4k-1\\ne 0$ 时，$x=1$，只有一个解。',
        '当 $k=\\frac{1}{4}$ 时，$4k-1=0$，方程变成 $0\\cdot x=0$，任何数都是解（当然也包括 $x=1$，与题设不矛盾）。',
      ],
      verify: () => {
        const holds = (x, k, a, b) => F(k).mul(2).mul(x).add(a).div(3).eq(F(2).add(F(x).sub(F(b).mul(k)).div(6)));
        const ks = [-3, -1, 0, '1/4', 1, 2, 5];
        let found = null;
        for (let i = -40; i <= 40; i++) for (let j = -40; j <= 40; j++) {
          const a = F(i).div(2), b = F(j).div(2);
          if (ks.every(k => holds(1, k, a, b))) found = [a, b];
        }
        const [a, b] = found;
        const xs = [-5, -1, 0, 2, '7/3', 9];
        const cnt = xs.filter(x => holds(x, '1/4', a, b)).length;
        return [a, b, cnt === xs.length ? '任何数都是解' : null];
      },
    },
    {
      id: '3.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '观察下面一列方程：第 1 个 $\\frac{x}{1}+\\frac{x}{2}=3$，第 2 个 $\\frac{x}{2}+\\frac{x}{3}=5$，第 3 个 $\\frac{x}{3}+\\frac{x}{4}=7$，……',
      blanks: [
        { kind: 'num', label: '(1) 第 4 个方程的解是 $x=$', answer: '20' },
        { kind: 'expr', label: '(2) 第 $n$ 个方程的解是 $x=$（用含 $n$ 的式子表示）', answer: 'n*(n+1)' },
        { kind: 'num', label: '(3) 若第 $n$ 个方程的解是 420，则 $n=$', answer: '20' },
      ],
      explain: [
        '先写出规律：第 $n$ 个方程左边两项的分母是 $n$ 和 $n+1$，右边依次是 3、5、7，是第 $n$ 个大于 1 的奇数，即 $2n+1$。',
        '(1) 第 4 个方程：$\\frac{x}{4}+\\frac{x}{5}=9$。两边乘 20：$5x+4x=180$，$9x=180$，$x=20$。',
        '(2) 第 $n$ 个方程：$\\frac{x}{n}+\\frac{x}{n+1}=2n+1$。两边同乘 $n(n+1)$：$(n+1)x+nx=(2n+1)n(n+1)$。',
        '左边合并：$(2n+1)x$。两边同除以 $2n+1$（它不为 0）：$x=n(n+1)$。检验：$n=1,2,3$ 时分别是 2、6、12，与前三个方程的解一致。',
        '(3) $n(n+1)=420$，两个相邻正整数的积是 420。$20\\times 21=420$，所以 $n=20$。',
      ],
      verify: () => {
        const sol = n => {
          const f = x => F(x).div(n).add(F(x).div(n + 1)).sub(2 * n + 1);
          return f(0).neg().div(f(1).sub(f(0)));
        };
        const ok = [1, 2, 3, 5, 8].every(n => sol(n).eq(n * (n + 1)));
        let n420 = null;
        for (let n = 1; n <= 100; n++) if (sol(n).eq(420)) n420 = n;
        return [sol(4), ok ? 'n*(n+1)' : null, n420];
      },
    },
    {
      id: '3.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '用 $\\max\\{a,b\\}$ 表示 $a$、$b$ 两个数中较大的数，$\\min\\{a,b\\}$ 表示较小的数（两数相等时就取这个数）。例如 $\\max\\{-1,3\\}=3$，$\\min\\{-1,3\\}=-1$。',
      blanks: [
        { kind: 'nums', label: '(1) 方程 $\\max\\{2x-1,\\ x+3\\}=5$ 的解是（有几个就填几个，用逗号隔开）', answer: ['2'] },
        { kind: 'nums', label: '(2) 方程 $\\min\\{3x+1,\\ 5-x\\}=-2$ 的解是（有几个就填几个，用逗号隔开）', answer: ['-1', '7'] },
      ],
      explain: [
        '不知道哪一个较大（较小），就分两种情况：假设某一个是较大（较小）的那个，解出 $x$ 后再检验假设是否成立。',
        '(1) 若 $2x-1$ 是较大的：$2x-1=5$，$x=3$。检验：此时 $x+3=6$，比 5 大，较大的数是 6 而不是 5，假设不成立，舍去。',
        '若 $x+3$ 是较大的：$x+3=5$，$x=2$。检验：此时 $2x-1=3$，比 5 小，较大的数确实是 5，成立。所以解是 $x=2$。',
        '(2) 若 $3x+1$ 是较小的：$3x+1=-2$，$x=-1$。检验：此时 $5-x=6$，比 $-2$ 大，较小的数确实是 $-2$，成立。',
        '若 $5-x$ 是较小的：$5-x=-2$，$x=7$。检验：此时 $3x+1=22$，比 $-2$ 大，成立。',
        '所以 (2) 有两个解：$-1$ 和 $7$。两道题形式相近，一个舍去一个解、一个两个都保留，关键都在检验。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -400; i <= 400; i++) xs.push(F(i).div(8));
        const max = (p, q) => (p.cmp(q) >= 0 ? p : q);
        const min = (p, q) => (p.cmp(q) <= 0 ? p : q);
        return [
          xs.filter(x => max(x.mul(2).sub(1), x.add(3)).eq(5)),
          xs.filter(x => min(x.mul(3).add(1), F(5).sub(x)).eq(-2)),
        ];
      },
    },
    {
      id: '3.2-e07',
      level: 'extended',
      type: 'fill',
      stem: '解系数有规律的方程。',
      blanks: [
        { kind: 'num', label: '(1) $x-2x+3x-4x+\\cdots+99x-100x=100$ 的解是 $x=$', answer: '-2' },
        { kind: 'num', label: '(2) $x+\\frac{x}{2}+\\frac{x}{4}+\\frac{x}{8}+\\frac{x}{16}+\\frac{x}{32}+\\frac{x}{64}=127$ 的解是 $x=$', answer: '64' },
      ],
      explain: [
        '左边都是同类项，关键是把系数的和算出来，再系数化为 1。',
        '(1) 系数是 $1-2+3-4+\\cdots+99-100$。相邻两个一组：$(1-2)+(3-4)+\\cdots+(99-100)$，共 50 组，每组都是 $-1$，和为 $-50$。',
        '方程变成 $-50x=100$，$x=-2$。',
        '(2) 系数是 $1+\\frac{1}{2}+\\frac{1}{4}+\\cdots+\\frac{1}{64}$。看出规律：$1+\\frac{1}{2}=2-\\frac{1}{2}$，再加 $\\frac{1}{4}$ 得 $2-\\frac{1}{4}$，……每加一项，离 2 的差就减半。',
        '所以一直加到 $\\frac{1}{64}$，和是 $2-\\frac{1}{64}=\\frac{127}{64}$。',
        '方程变成 $\\frac{127}{64}x=127$，两边同乘 $\\frac{64}{127}$，得 $x=64$。',
        '如果直接去分母（两边乘 64），得 $64x+32x+16x+8x+4x+2x+x=127\\times 64$，即 $127x=127\\times 64$，结果一样。',
      ],
      verify: () => {
        let c1 = F(0);
        for (let k = 1; k <= 100; k++) c1 = c1.add(k % 2 ? k : -k);
        let c2 = F(0);
        for (let k = 0; k <= 6; k++) c2 = c2.add(F(1).div(2 ** k));
        return [F(100).div(c1), F(127).div(c2)];
      },
    },
    {
      id: '3.2-e08',
      level: 'extended',
      type: 'fill',
      stem: '下面是小亮解方程 $\\frac{x+3}{4}-\\frac{2x-5}{6}=1$ 的过程：① 去分母，得 $3(x+3)-2(2x-5)=1$；② 去括号，得 $3x+9-4x-10=1$；③ 移项，得 $3x-4x=1-9+10$；④ 合并同类项，得 $-x=2$；⑤ 系数化为 1，得 $x=2$。',
      blanks: [
        { kind: 'nums', label: '(1) 出错的步骤的序号是（全部填出，用逗号隔开）', answer: ['1', '2', '5'] },
        { kind: 'num', label: '(2) 原方程正确的解是 $x=$', answer: '7' },
        { kind: 'num', label: '(3) 如果把原方程右边的 1 换成常数 $m$，那么小亮第 ① 步那样“右边漏乘”的错误就不会影响方程的解（其余步骤都做对），则 $m=$', answer: '0' },
      ],
      explain: [
        '逐步检查，每一步都要以上一步的结果为准来判断这一步本身对不对。',
        '① 错：两边同乘 12，右边的 1 也要乘 12，应得 $3(x+3)-2(2x-5)=12$。',
        '② 错：$-2\\times(-5)=+10$，应得 $3x+9-4x+10$，他写成了 $-10$。',
        '③ 对：由 ② 的结果，把 $+9$、$-10$ 移到右边分别变成 $-9$、$+10$，这一步本身没问题。④ 对：$3x-4x=-x$，$1-9+10=2$。',
        '⑤ 错：$-x=2$ 两边同除以 $-1$，应得 $x=-2$，他漏了符号。',
        '(2) 正确解法：$3(x+3)-2(2x-5)=12$，$3x+9-4x+10=12$，$-x=12-19=-7$，$x=7$。检验：左边 $\\frac{10}{4}-\\frac{9}{6}=\\frac{5}{2}-\\frac{3}{2}=1$。',
        '(3) 右边是 $m$ 时，左边去分母、去括号后都是 $-x+19$。正确的方程是 $-x+19=12m$，解为 $x=19-12m$；漏乘的方程是 $-x+19=m$，解为 $x=19-m$。',
        '两个解相同：$19-12m=19-m$，移项得 $-11m=0$，$m=0$。道理很简单：只有 0 乘 12 还是它本身。',
      ],
      verify: () => {
        const L = x => F(x);
        const steps = [
          [x => L(x).add(3).div(4).sub(L(x).mul(2).sub(5).div(6)).sub(1), x => L(x).add(3).mul(3).sub(L(x).mul(2).sub(5).mul(2)).sub(1)],
          [x => L(x).add(3).mul(3).sub(L(x).mul(2).sub(5).mul(2)).sub(1), x => L(x).mul(3).add(9).sub(L(x).mul(4)).sub(10).sub(1)],
          [x => L(x).mul(3).add(9).sub(L(x).mul(4)).sub(10).sub(1), x => L(x).mul(3).sub(L(x).mul(4)).sub(F(1).sub(9).add(10))],
          [x => L(x).mul(3).sub(L(x).mul(4)).sub(F(1).sub(9).add(10)), x => L(x).neg().sub(2)],
          [x => L(x).neg().sub(2), x => L(x).sub(2)],
        ];
        const root = f => f(0).neg().div(f(1).sub(f(0)));
        const bad = steps.map(([p, q], i) => (root(p).eq(root(q)) ? -1 : i + 1)).filter(i => i > 0);
        const ms = [];
        for (let i = -40; i <= 40; i++) {
          const m = F(i).div(4);
          const right = root(x => L(x).add(3).div(4).sub(L(x).mul(2).sub(5).div(6)).sub(m));
          const wrong = root(x => L(x).add(3).mul(3).sub(L(x).mul(2).sub(5).mul(2)).sub(m));
          if (right.eq(wrong)) ms.push(m);
        }
        return [bad, root(steps[0][0]), ms.length === 1 ? ms[0] : null];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '3.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '解下列方程。（直接去分母计算量很大，先观察方程的结构。）',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{x-1}{2025}+\\frac{x-2}{2024}+\\frac{x-3}{2023}=3$ 的解是 $x=$', answer: '2026' },
        { kind: 'num', label: '(2) $\\frac{x+1}{2024}+\\frac{x+2}{2023}=\\frac{x+3}{2022}+\\frac{x+4}{2021}$ 的解是 $x=$', answer: '-2025' },
        { kind: 'expr', label: '(3) $a$、$b$、$c$ 都是正数，关于 $x$ 的方程 $\\frac{x-ab}{a+b}+\\frac{x-bc}{b+c}+\\frac{x-ca}{c+a}=a+b+c$ 的解是 $x=$（用含 $a$、$b$、$c$ 的式子表示）', answer: 'a*b+b*c+c*a' },
      ],
      explain: [
        '(1) 观察：每项分子里减去的数与分母之和都是 2026（$1+2025=2+2024=3+2023$），而右边的 3 正好是 3 个 1。',
        '把 3 拆开分给各项，两边都减去 3（等式性质 1）：$\\left(\\frac{x-1}{2025}-1\\right)+\\left(\\frac{x-2}{2024}-1\\right)+\\left(\\frac{x-3}{2023}-1\\right)=0$。',
        '通分每一项：$\\frac{x-1}{2025}-1=\\frac{x-2026}{2025}$，另外两项同样是 $\\frac{x-2026}{2024}$、$\\frac{x-2026}{2023}$——分子都是 $x-2026$。',
        '由分配律：$(x-2026)\\left(\\frac{1}{2025}+\\frac{1}{2024}+\\frac{1}{2023}\\right)=0$。括号里是正数，不为 0，所以 $x=2026$。',
        '(2) 这次每项分子里加的数与分母之和都是 2025，所以每项各加 1，两边各加 2：$\\frac{x+2025}{2024}+\\frac{x+2025}{2023}=\\frac{x+2025}{2022}+\\frac{x+2025}{2021}$。',
        '移项后提出公共部分：$(x+2025)\\left(\\frac{1}{2024}+\\frac{1}{2023}-\\frac{1}{2022}-\\frac{1}{2021}\\right)=0$。',
        '括号里：$\\frac{1}{2024}<\\frac{1}{2022}$，$\\frac{1}{2023}<\\frac{1}{2021}$，所以括号的值是负数，不为 0。于是 $x=-2025$。必须先说明括号不为 0，才能得出这个结论。',
        '(3) 字母多了，思路不变：想办法让三个分子变成同一个式子。右边 $a+b+c$ 可以拆成三份分给三项，关键是每项减哪一份。',
        '第一项分母是 $a+b$，减去 $c$：$\\frac{x-ab}{a+b}-c=\\frac{x-ab-c(a+b)}{a+b}$，由分配律 $c(a+b)=ca+cb$，分子就是 $x-(ab+bc+ca)$。',
        '同理第二项减去 $a$，第三项减去 $b$，分子都变成 $x-(ab+bc+ca)$。',
        '于是 $\\left[x-(ab+bc+ca)\\right]\\left(\\frac{1}{a+b}+\\frac{1}{b+c}+\\frac{1}{c+a}\\right)=0$。$a$、$b$、$c$ 都是正数，括号里是正数，所以 $x=ab+bc+ca$。',
        '怎么想到“第一项减 $c$”：要让分子里出现 $ab+bc+ca$，第一项已经有 $ab$，还缺 $bc+ca=c(a+b)$，正好是分母的 $c$ 倍。',
      ],
      verify: () => {
        const solve = f => { const k = f(F(1)).sub(f(F(0))); return f(F(0)).neg().div(k); };
        const r1 = solve(x => x.sub(1).div(2025).add(x.sub(2).div(2024)).add(x.sub(3).div(2023)).sub(3));
        const r2 = solve(x => x.add(1).div(2024).add(x.add(2).div(2023)).sub(x.add(3).div(2022)).sub(x.add(4).div(2021)));
        const eq3 = (a, b, c) => x => x.sub(F(a).mul(b)).div(a + b).add(x.sub(F(b).mul(c)).div(b + c)).add(x.sub(F(c).mul(a)).div(c + a)).sub(a + b + c);
        const ok = [[1, 2, 3], [2, 5, 7], [4, 1, 9], [3, 3, 8]].every(([a, b, c]) => solve(eq3(a, b, c)).eq(a * b + b * c + c * a));
        return [r1, r2, ok ? 'a*b+b*c+c*a' : null];
      },
    },
    {
      id: '3.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '用 $[x]$ 表示不超过 $x$ 的最大整数，例如 $[2.7]=2$，$[-1.2]=-2$，$[3]=3$；用 $\\{x\\}=x-[x]$ 表示 $x$ 的小数部分，它满足 $0\\le\\{x\\}<1$。解下列方程（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '(1) $2x-[x]=-1.4$ 的解是', answer: ['-1.7', '-2.2'] },
        { kind: 'nums', label: '(2) $x+2\\{x\\}=3[x]$ 的解是', answer: ['0', '5/3'] },
        { kind: 'nums', label: '(3) $x+2\\{x\\}=2[x]$ 的解是', answer: ['0', '4/3', '8/3'] },
      ],
      explain: [
        '通法：设 $x$ 的整数部分 $[x]=n$（$n$ 是整数），小数部分 $\\{x\\}=f$（$0\\le f<1$），则 $x=n+f$。代入后得到关于 $f$ 的一元一次方程，用 $f$ 的范围和 $n$ 是整数来筛选。',
        '(1) $2(n+f)-n=-1.4$，即 $n+2f=-1.4$，所以 $2f=-1.4-n$。',
        '$f$ 在 0 与 1 之间（可以取 0，取不到 1），所以 $2f$ 在 0 与 2 之间（可以取 0，取不到 2），即 $-1.4-n$ 要满足这个要求。',
        '逐个试整数 $n$：$n=-2$ 时 $2f=0.6$，$f=0.3$；$n=-3$ 时 $2f=1.6$，$f=0.8$；$n=-1$ 时 $2f=-0.4$ 是负数，不行；$n=-4$ 时 $2f=2.6$，太大。',
        '所以 $x=-2+0.3=-1.7$ 或 $x=-3+0.8=-2.2$。检验：$[-1.7]=-2$，$2\\times(-1.7)-(-2)=-1.4$ ✓；$[-2.2]=-3$，$-4.4+3=-1.4$ ✓。注意负数的整数部分：$[-1.7]$ 是 $-2$，不是 $-1$。',
        '(2) $(n+f)+2f=3n$，即 $3f=2n$，$f=\\frac{2n}{3}$。',
        '$f$ 不能是负数，所以 $n\\ge 0$；$f<1$ 要求 $2n<3$。$n=0$ 时 $f=0$，$x=0$；$n=1$ 时 $f=\\frac{2}{3}$，$x=\\frac{5}{3}$；$n=2$ 时 $f=\\frac{4}{3}$，超过 1，不行。',
        '所以解是 $0$ 和 $\\frac{5}{3}$。',
        '(3) 同样得 $3f=n$，$f=\\frac{n}{3}$。$n=0,1,2$ 时 $f=0,\\frac{1}{3},\\frac{2}{3}$，都在范围内；$n=3$ 时 $f=1$，不行。',
        '所以解是 $0,\\ \\frac{4}{3},\\ \\frac{8}{3}$。比较 (2)(3)：系数只差一点，解的个数就不同，完全由 $f$ 的范围决定。',
        '思路回顾：一个方程里有 $[x]$ 和 $\\{x\\}$ 两种“未知量”，把 $x$ 拆成整数部分加小数部分，先解一元一次方程，再用“整数”和“0 到 1”两个条件分类筛选。',
      ],
      verify: () => {
        const floor = x => { const q = x.n / x.d; return F(x.n < 0n && x.n % x.d !== 0n ? q - 1n : q); };
        const frac = x => x.sub(floor(x));
        const xs = [];
        for (let i = -1200; i <= 1200; i++) xs.push(F(i).div(60));
        return [
          xs.filter(x => x.mul(2).sub(floor(x)).eq('-1.4')),
          xs.filter(x => x.add(frac(x).mul(2)).eq(floor(x).mul(3))),
          xs.filter(x => x.add(frac(x).mul(2)).eq(floor(x).mul(2))),
        ];
      },
    },
    {
      id: '3.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '讨论关于 $x$ 的方程 $(|a|-2)x=a+2$（$a$ 是常数）的解。',
      blanks: [
        { kind: 'num', label: '(1) 若方程有无数个解，则 $a=$', answer: '-2' },
        { kind: 'num', label: '(2) 若方程无解，则 $a=$', answer: '2' },
        { kind: 'nums', label: '(3) 若 $a$ 是整数，且方程的解是正整数，则 $a$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['3', '4', '6'] },
        { kind: 'text', label: '(4) 使方程的解是整数的整数 $a$', options: ['只有有限个', '有无数个'], answer: '有无数个' },
      ],
      explain: [
        '形如 $mx=n$ 的方程：$m\\ne 0$ 时有唯一解 $x=\\frac{n}{m}$；$m=0$、$n=0$ 时任何数都是解；$m=0$、$n\\ne 0$ 时无解。这里 $m=|a|-2$，$n=a+2$。',
        '(1)(2) $|a|-2=0$ 时 $a=2$ 或 $a=-2$。$a=-2$ 时 $n=0$，方程是 $0\\cdot x=0$，有无数个解；$a=2$ 时 $n=4$，方程是 $0\\cdot x=4$，无解。',
        '(3) 其他情况下 $x=\\frac{a+2}{|a|-2}$。按 $a$ 的符号和大小分类去掉绝对值：',
        '① $a>2$：$x=\\frac{a+2}{a-2}$。因为 $a+2=(a-2)+4$，所以 $x=\\frac{(a-2)+4}{a-2}=1+\\frac{4}{a-2}$。要是正整数，$a-2$ 必须是 4 的约数：$1,2,4$，所以 $a=3,4,6$，对应 $x=5,3,2$。',
        '② $a<-2$：$|a|=-a$，$x=\\frac{a+2}{-a-2}=\\frac{a+2}{-(a+2)}=-1$，总是 $-1$，不是正整数。',
        '③ $-2<a<2$ 的整数 $a=-1,0,1$：$x$ 分别是 $\\frac{1}{-1}=-1$，$\\frac{2}{-2}=-1$，$\\frac{3}{-1}=-3$，都是负数。',
        '所以 $a=3,4,6$。',
        '(4) 由 ②，所有小于 $-2$ 的整数 $a$，方程的解都是整数 $-1$，有无数个这样的 $a$。',
        '思路回顾：两层分类——先按“系数是否为 0”分出无数解、无解；再按 $a$ 的范围去绝对值，最后用约数筛选正整数解。第 ② 类“解恒为 $-1$”容易被忽略。',
      ],
      verify: () => {
        const kind = a => {
          const m = F(Math.abs(a) - 2), n = F(a + 2);
          if (m.isZero()) return n.isZero() ? 'inf' : 'none';
          return n.div(m);
        };
        const as = [];
        for (let a = -60; a <= 60; a++) as.push(a);
        const inf = as.filter(a => kind(a) === 'inf');
        const none = as.filter(a => kind(a) === 'none');
        const pos = as.filter(a => typeof kind(a) === 'object' && kind(a).d === 1n && kind(a).n > 0n);
        const intA = as.filter(a => typeof kind(a) === 'object' && kind(a).d === 1n);
        return [inf[0], none[0], pos, intA.filter(a => a < -40).length > 10 ? '有无数个' : '只有有限个'];
      },
    },
    {
      id: '3.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $a$、$b$、$c$ 都不为 0，且 $\\frac{a+b}{c}=\\frac{b+c}{a}=\\frac{c+a}{b}=k$。',
      blanks: [
        { kind: 'nums', label: '(1) $k$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['2', '-1'] },
        { kind: 'nums', label: '(2) $\\frac{(a+b)(b+c)(c+a)}{abc}$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['8', '-1'] },
        { kind: 'num', label: '(3) 若 $a$、$b$、$c$ 都是绝对值不超过 5 的整数，满足条件的有序数组 $(a,b,c)$ 共有', answer: '70', suffix: '组' },
      ],
      explain: [
        '(1) 由等式性质 2，三个等式可以写成：$a+b=kc$，$b+c=ka$，$c+a=kb$。',
        '三式相加（等式性质 1）：$2(a+b+c)=k(a+b+c)$。移项：$(k-2)(a+b+c)=0$。这里不能直接两边除以 $a+b+c$，因为它可能是 0，要分两种情况。',
        '① $a+b+c\\ne 0$：得 $k=2$。例如 $a=b=c=1$。② $a+b+c=0$：$a+b=-c$，所以 $k=\\frac{-c}{c}=-1$。例如 $a=1$，$b=1$，$c=-2$。',
        '所以 $k=2$ 或 $-1$。只写 $k=2$ 是最常见的错误。',
        '(2) 原式 $=\\frac{a+b}{c}\\times\\frac{b+c}{a}\\times\\frac{c+a}{b}=k^3$，是 8 或 $-1$。',
        '(3) 分两类计数，先弄清每一类里 $a$、$b$、$c$ 是什么样子。',
        '$k=2$ 这一类：$a+b=2c$，$b+c=2a$，两式相减得 $a-c=2c-2a$，即 $3a=3c$，$a=c$；代回得 $b=c$。所以 $a=b=c$，取 $\\pm1,\\pm2,\\dots,\\pm5$，共 10 组。',
        '$k=-1$ 这一类：条件就是 $a+b+c=0$（此时三个分式自动都等于 $-1$），且 $a$、$b$、$c$ 都不为 0、绝对值不超过 5。',
        '先数 $a$ 是正数的情况：$c=-(a+b)$，要求 $b\\ne 0$、$b\\ne -a$（否则 $c=0$），且 $|a+b|\\le 5$。',
        '$a=1$：$b$ 从 $-5$ 到 4 共 10 个，去掉 0 和 $-1$，剩 8 个；$a=2$：$b$ 从 $-5$ 到 3，去掉 0、$-2$，剩 7 个；同理 $a=3,4,5$ 时分别有 6、5、4 个。合计 $8+7+6+5+4=30$。',
        '$a$ 是负数时，把三个数都变成相反数就一一对应，也是 30 组。所以这一类共 60 组。',
        '两类合计 $10+60=70$ 组。',
        '思路回顾：先用“三式相加 + 分类”找到 $k$，再把每个 $k$ 翻译回 $a$、$b$、$c$ 的关系（$a=b=c$ 或 $a+b+c=0$），最后有条理地计数。',
      ],
      verify: () => {
        const ks = new Set();
        const prods = new Set();
        let count = 0;
        const r = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
        for (const a of r) for (const b of r) for (const c of r) {
          const k1 = F(a + b).div(c), k2 = F(b + c).div(a), k3 = F(c + a).div(b);
          if (k1.eq(k2) && k2.eq(k3)) {
            count++;
            ks.add(k1.toString());
            prods.add(F(a + b).mul(b + c).mul(c + a).div(a * b * c).toString());
          }
        }
        return [[...ks], [...prods], count];
      },
    },
    {
      id: '3.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '新定义：如果关于 $x$ 的一元一次方程 $ax=b$（$a\\ne 0$）的解恰好等于 $a+b$，就称它为“和解方程”。例如 $\\frac{1}{2}x=\\frac{1}{2}$ 的解是 $x=1$，而 $\\frac{1}{2}+\\frac{1}{2}=1$，所以它是和解方程。',
      blanks: [
        { kind: 'num', label: '(1) 若关于 $x$ 的方程 $-2x=m$ 是和解方程，则 $m=$', answer: '4/3' },
        { kind: 'num', label: '(2) 若 $3x=b$ 是和解方程，则 $b=$', answer: '-9/2' },
        { kind: 'num', label: '(3) 若和解方程 $ax=b$ 的解是 $x=3$，则 $a=$', answer: '3/4' },
        { kind: 'num', label: '(4) 若和解方程 $ax=b$ 中 $a$、$b$ 都是整数，则 $a=$', answer: '2' },
        { kind: 'num', label: '(5) 在 (4) 的条件下，$b=$', answer: '-4' },
      ],
      explain: [
        '(1) $-2x=m$ 的解是 $x=-\\frac{m}{2}$。和解方程要求 $-\\frac{m}{2}=-2+m$，两边乘 2：$-m=-4+2m$，$-3m=-4$，$m=\\frac{4}{3}$。',
        '(2) $3x=b$ 的解是 $\\frac{b}{3}$，要求 $\\frac{b}{3}=3+b$，两边乘 3：$b=9+3b$，$-2b=9$，$b=-\\frac{9}{2}$。检验：$3x=-\\frac{9}{2}$ 的解是 $-\\frac{3}{2}$，而 $3+\\left(-\\frac{9}{2}\\right)=-\\frac{3}{2}$。',
        '(3)(4) 先找出一般规律。设和解方程的解是 $x$，那么同时有 $ax=b$ 和 $x=a+b$。把 $b=ax$ 代入第二个式子：$x=a+ax$。',
        '移项：$x-ax=a$，即 $x(1-a)=a$。这是 $a$ 与解 $x$ 之间的关系，$b$ 已经被消掉了。',
        '(3) 代入 $x=3$：$3(1-a)=a$，$3-3a=a$，$4a=3$，$a=\\frac{3}{4}$（此时 $b=ax=\\frac{9}{4}$，检验 $\\frac{3}{4}+\\frac{9}{4}=3$）。',
        '(4) $a$、$b$ 是整数时，解 $x=a+b$ 也是整数。在 $x(1-a)=a$ 两边都加上 $1-a$：右边 $a+(1-a)=1$；左边 $x(1-a)+(1-a)$，把 $1-a$ 看成一个整体，由分配律合并成 $(x+1)(1-a)$。于是 $(x+1)(1-a)=1$。',
        '两个整数的积是 1，它们只能都是 1 或都是 $-1$。若 $1-a=1$，则 $a=0$，与 $a\\ne 0$ 矛盾；所以 $1-a=-1$，$a=2$，此时 $x+1=-1$，$x=-2$。',
        '(5) $b=ax=2\\times(-2)=-4$。检验：$2x=-4$ 的解是 $-2$，而 $2+(-4)=-2$。所以系数都是整数的和解方程只有 $2x=-4$ 这一个。',
        '思路回顾：由定义得到两个等式，消去 $b$ 得出 $x(1-a)=a$；再“两边加上 $1-a$”凑成积为 1 的形式，用整数的性质一步定出 $a$。',
      ],
      verify: () => {
        const isHe = (a, b) => !F(a).isZero() && F(b).div(a).eq(F(a).add(b));
        let m1 = null, b2 = null, a3 = null;
        for (let i = -600; i <= 600; i++) {
          const t = F(i).div(12);
          if (isHe(-2, t)) m1 = t;
          if (isHe(3, t)) b2 = t;
          if (!t.isZero() && isHe(t, t.mul(3))) a3 = t;   // 解为 3 即 b=3a
        }
        const pairs = [];
        for (let a = -300; a <= 300; a++) for (let b = -300; b <= 300; b++) if (a && isHe(a, b)) pairs.push([a, b]);
        return [m1, b2, a3, pairs.length === 1 ? pairs[0][0] : null, pairs.length === 1 ? pairs[0][1] : null];
      },
    },
  ],
});
