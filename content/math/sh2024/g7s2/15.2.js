'use strict';

// 上海数学七年级下册 · 15.2 一元一次不等式
// 知识范围：不等式的解与解集、一元一次不等式、解集在数轴上的表示（空心圈 / 实心点）；解一元一次不等式（去分母、去括号、移项、
//   合并同类项化成 ax>b 等形式，再按 a 的正负决定是否变号）；一元一次不等式的应用（结合正整数等实际限制）
// 可以使用：15.1 不等式的性质；六年级全部（有理数、绝对值、数轴动点、一元一次方程、二元一次方程组、三元一次方程组）；七年级上册全部
// 还没学：一元一次不等式组（15.3，本节不出“同时满足两个不等式”求公共部分的题；两个独立条件各自是一个不等式、只取其一的除外）
// 本节约定：解集的填空写成 x>2、x≤-3/2 这样的形式

// verify 用：一次函数 f（Frac → Frac）满足 f(x) op 0 的解集，写成判分器认识的字符串
const solve152 = (f, op, v = 'x') => {
  const c = f(F(0)), k = f(F(1)).sub(c);
  if (k.isZero()) {
    const holds = { '>': c.cmp(0) > 0, '>=': c.cmp(0) >= 0, '<': c.cmp(0) < 0, '<=': c.cmp(0) <= 0 }[op];
    return holds ? '任意数' : '无解';
  }
  const b = c.neg().div(k);
  const flip = { '>': '<', '>=': '<=', '<': '>', '<=': '>=' };
  return `${v}${k.cmp(0) > 0 ? op : flip[op]}${b.n}/${b.d}`;
};

// 配图：数轴，标出空心圈或实心点和射线（坐标以“格”为单位，每格 26px）
const FIG152 = (() => {
  const line = (lo, hi, pt, solid, right) => {
    const u = 26, ox = 16, y = 40, w = (hi - lo) * u + 2 * ox + 10;
    const sx = x => ox + (x - lo) * u;
    let s = `<line x1="6" y1="${y}" x2="${w - 6}" y2="${y}" stroke="#2b2b2b" stroke-width="1.6"/><path d="M${w - 10},${y - 4} l6,4 l-6,4" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`;
    for (let x = lo; x <= hi; x++) s += `<line x1="${sx(x)}" y1="${y}" x2="${sx(x)}" y2="${y - 4}" stroke="#2b2b2b"/><text x="${sx(x)}" y="${y + 16}" text-anchor="middle" font-size="12">${x < 0 ? '−' + -x : x}</text>`;
    const x0 = sx(pt), end = right ? w - 12 : 8;
    s += `<polyline points="${x0},${y} ${x0},${y - 16} ${end},${y - 16}" fill="none" stroke="#c0513a" stroke-width="1.8"/>`;
    s += `<path d="M${end + (right ? -5 : 5)},${y - 20} l${right ? 5 : -5},4 l${right ? -5 : 5},4" fill="none" stroke="#c0513a" stroke-width="1.8"/>`;
    s += `<circle cx="${x0}" cy="${y}" r="4.5" fill="${solid ? '#c0513a' : '#fff'}" stroke="#c0513a" stroke-width="1.8"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 64" width="${w}" height="64" font-family="Times New Roman, serif">${s}</svg>`;
  };
  return { b02: line(-4, 4, -1, false, false) };
})();

Content.section({
  id: 'math/sh2024/g7s2/15.2',
  title: '一元一次不等式',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。第 1 轮 c02（三元非负求最值）要用不等式组，移到 15.3-c05；c03 门票题只有 3～4 级；e05（最小整数解代入方程）只有 2 级。第 2 轮 e05 改为解集包含 + 系数符号讨论，c03 换三家旅行社；复核指出新 c02 限定整数后能代入试出、(1) 与 e02 换数，c01 与 c04 同为“由解集反推参数”。第 3 轮 c01 换成含绝对值方程分情况求解并检验，c02 改为解集 x>−1、两支都要计算并追问“不是关联方程”，c03 (3) 改四选一，补充 k=1 的措辞后判定整节通过。' },

  intro: [
    {
      title: '不等式的解和解集',
      body: '能使不等式成立的未知数的值，叫作不等式的**解**；一个不等式所有解的全体，叫作它的**解集**。一元一次方程只有一个解，一元一次不等式通常有无数个解。只含一个未知数、未知数的次数是 $1$ 的不等式叫作**一元一次不等式**。',
      example: '$x=5$、$x=3.5$ 都是 $x-1>2$ 的解，$x=3$ 不是；它的解集是 $x>3$。',
    },
    {
      title: '在数轴上表示解集',
      body: '大于向右画，小于向左画。端点**不包含**在解集里画空心圈，**包含**（$\\geq$、$\\leq$）画实心点。点「播放」看 $x\\geq-2$ 怎么画。',
      example: '$x<1$：在 $1$ 处画空心圈，向左画线；$x\\geq-2$：在 $-2$ 处画实心点，向右画线。',
      demo: { type: 'solutionSet', sets: [['>=', -2]], lo: -5, hi: 5 },
    },
    {
      title: '解一元一次不等式',
      body: '和解一元一次方程的步骤一样：去分母、去括号、移项、合并同类项，化成 $ax>b$（或 $ax<b$ 等）的形式，最后两边同除以系数 $a$。**唯一的区别**：$a$ 是负数时，不等号方向要改变。',
      example: '$7-2x>1$：移项得 $-2x>-6$，两边同除以 $-2$，得 $x<3$。',
      pitfall: '去分母时每一项都要乘，包括不含分母的项；分子是多项式时要加括号。',
    },
    {
      title: '特殊解：整数解、正整数解',
      body: '求出解集后，再在解集里挑出符合要求的数。先在数轴上画出解集，再看端点是否包含，最不容易出错。',
      example: '$x\\leq2.5$ 的正整数解是 $1$、$2$；$x>-1$ 的最小整数解是 $0$。',
    },
    {
      title: '一元一次不等式的应用',
      body: '步骤：设未知数，找出“至少”“不超过”“多于”这类不等关系并列出不等式，解不等式，最后**结合实际**确定答案（人数、件数要取整数，“至少”要往大取，“最多”要往小取）。',
      example: '每本练习本 $5$ 元，$32$ 元最多买几本？$5x\\leq32$，$x\\leq6.4$，最多买 $6$ 本。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '15.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '关于不等式 $3x-2\\geq4$，下列说法正确的是（　　）',
      options: ['$x=2$ 是它的一个解', '$x=1.9$ 是它的一个解', '它的解集是 $x>2$', '它只有一个解 $x=2$'],
      answer: 0,
      explain: [
        '解不等式：移项得 $3x\\geq6$，两边同除以 $3$，得 $x\\geq2$。解集是 $x\\geq2$，C 漏了等号。',
        'A：$x=2$ 时 $3\\times2-2=4$，$4\\geq4$ 成立，是解，正确。',
        'B：$1.9<2$，不是解。D：解集里有无数个数，$x=2$ 只是其中一个。选 A。坑：“$\\geq$”包括相等，$x=2$ 也是解。',
      ],
      verify: () => {
        const ok = [F(2), F('1.9')].map(x => x.mul(3).sub(2).cmp(4) >= 0);
        return ok[0] && !ok[1] && solve152(x => x.mul(3).sub(6), '>=') === 'x>=2/1' ? 0 : -1;
      },
    },
    {
      id: '15.2-b02',
      level: 'basic',
      type: 'choice',
      stem: '下面数轴上表示的是某个不等式的解集，这个不等式是（　　）',
      figure: FIG152.b02,
      options: ['$3-2x<5$', '$3x+1<-2$', '$-2x\\geq2$', '$x-1>-2$'],
      answer: 1,
      explain: [
        '图中在 $-1$ 处是空心圈，向左画线，表示 $x<-1$。',
        'A：$-2x<2$，两边同除以 $-2$ 要变号，$x>-1$，方向不对。B：$3x<-3$，$x<-1$，正确。',
        'C：两边同除以 $-2$，$x\\leq-1$，端点应是实心点。D：$x>-1$，方向不对。选 B。',
        '坑：A 忘了变号会得到 $x<-1$ 误选；C 的方向对了，但“$\\leq$”要画实心点。',
      ],
      verify: () => {
        const sets = [solve152(x => F(3).sub(x.mul(2)).sub(5), '<'), solve152(x => x.mul(3).add(3), '<'), solve152(x => x.mul(-2).sub(2), '>='), solve152(x => x.add(1), '>')];
        return sets.indexOf('x<-1/1') === sets.lastIndexOf('x<-1/1') ? sets.indexOf('x<-1/1') : -1;
      },
    },
    {
      id: '15.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '解不等式：$5x-3(2x-1)>7$。',
      blanks: [
        { kind: 'ineq', label: '解集为', answer: 'x<-4' },
      ],
      explain: [
        '去括号：$5x-6x+3>7$。注意 $-3$ 乘 $-1$ 得 $+3$。',
        '移项、合并同类项：$-x>4$。',
        '两边同除以 $-1$，方向改变：$x<-4$。',
        '常见错误：去括号得 $-3$，算出 $x<-10$；或者最后忘了变号，写成 $x>-4$。',
      ],
      verify: () => solve152(x => x.mul(5).sub(x.mul(2).sub(1).mul(3)).sub(7), '>'),
    },
    {
      id: '15.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '解不等式：$\\frac{x-1}{2}-\\frac{2x+1}{3}\\leq1$。',
      blanks: [
        { kind: 'ineq', label: '解集为', answer: 'x>=-11' },
      ],
      explain: [
        '两边同乘 $6$ 去分母：$3(x-1)-2(2x+1)\\leq6$。右边的 $1$ 也要乘 $6$。',
        '去括号：$3x-3-4x-2\\leq6$。合并：$-x-5\\leq6$，移项得 $-x\\leq11$。',
        '两边同除以 $-1$，方向改变：$x\\geq-11$。',
        '常见错误：右边的 $1$ 漏乘 $6$，得 $x\\geq-6$；$-2(2x+1)$ 去括号写成 $-4x+2$，得 $x\\geq-7$。',
      ],
      verify: () => solve152(x => x.sub(1).div(2).sub(x.mul(2).add(1).div(3)).sub(1), '<='),
    },
    {
      id: '15.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '不等式 $3(x+2)-1\\geq5x-3$ 的最大整数解是多少？',
      blanks: [
        { kind: 'num', label: '', answer: '4' },
      ],
      explain: [
        '去括号：$3x+6-1\\geq5x-3$，即 $3x+5\\geq5x-3$。',
        '移项：$3x-5x\\geq-3-5$，$-2x\\geq-8$，两边同除以 $-2$，方向改变：$x\\leq4$。',
        '解集包含 $4$，所以最大整数解是 $4$。坑：端点是实心点，$4$ 本身就是解，不要答成 $3$。',
      ],
      verify: () => {
        for (let x = 20; x > -20; x--) if (F(3).mul(x + 2).sub(1).cmp(F(5 * x - 3)) >= 0) return x;
        return null;
      },
    },
    {
      id: '15.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '当 $x$ 取何值时，代数式 $\\frac{3x-1}{2}$ 的值不小于 $x+1$ 的值？',
      blanks: [
        { kind: 'ineq', label: '', answer: 'x>=3' },
      ],
      explain: [
        '“不小于”就是 $\\geq$：$\\frac{3x-1}{2}\\geq x+1$。',
        '两边同乘 $2$：$3x-1\\geq2x+2$，移项得 $x\\geq3$。',
        '坑：“不小于”包括等于，写成 $x>3$ 就漏了 $x=3$；右边的 $x+1$ 也要乘 $2$。',
      ],
      verify: () => solve152(x => x.mul(3).sub(1).div(2).sub(x.add(1)), '>='),
    },
    {
      id: '15.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '小林带了 $55$ 元去文具店，先买了一个 $8$ 元的文件袋，剩下的钱买单价 $6$ 元的笔记本。他最多能买多少本笔记本？',
      blanks: [
        { kind: 'num', label: '', answer: '7', suffix: '本' },
      ],
      explain: [
        '设买 $x$ 本笔记本，总花费不超过 $55$ 元：$8+6x\\leq55$。',
        '移项：$6x\\leq47$，$x\\leq7\\frac56$。',
        '$x$ 是正整数，不超过 $7\\frac56$ 的最大整数是 $7$，所以最多买 $7$ 本。坑：“最多”要往小取，四舍五入成 $8$ 本钱就不够了（$8+48=56>55$）。',
      ],
      verify: () => {
        let best = 0;
        for (let x = 0; x <= 20; x++) if (8 + 6 * x <= 55) best = x;
        return best;
      },
    },
    {
      id: '15.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '一次知识竞赛有 $20$ 道题，每题答对得 $5$ 分，答错或不答都扣 $2$ 分。小华要使得分不低于 $60$ 分，至少要答对几道题？',
      blanks: [
        { kind: 'num', label: '', answer: '15', suffix: '道' },
      ],
      explain: [
        '设答对 $x$ 道，则答错或不答的有 $(20-x)$ 道：$5x-2(20-x)\\geq60$。',
        '去括号：$5x-40+2x\\geq60$，$7x\\geq100$，$x\\geq14\\frac27$。',
        '$x$ 是正整数，所以至少答对 $15$ 道。坑：“至少”要往大取，答对 $14$ 道只得 $5\\times14-2\\times6=58$ 分。',
      ],
      verify: () => {
        for (let x = 0; x <= 20; x++) if (5 * x - 2 * (20 - x) >= 60) return x;
        return null;
      },
    },
    {
      id: '15.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '已知 $x=2$ 是关于 $x$ 的不等式 $ax-3>2x+a$ 的一个解，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: 'a>7' },
      ],
      explain: [
        '$x=2$ 是解，就是把 $x=2$ 代入后不等式成立：$2a-3>4+a$。',
        '这是关于 $a$ 的不等式，移项得 $a>7$。',
        '坑：要求的是 $a$ 的范围，代入后未知数变成了 $a$；不要再去解关于 $x$ 的不等式。',
      ],
      verify: () => solve152(a => a.mul(2).sub(3).sub(F(4).add(a)), '>', 'a'),
    },

    // ---------- 扩展 ----------
    {
      id: '15.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的不等式 $3x-a\\leq0$ 的正整数解恰好是 $1$、$2$、$3$，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: '9<=a<12' },
      ],
      explain: [
        '解不等式：$3x\\leq a$，$x\\leq\\frac a3$。',
        '正整数解恰好是 $1$、$2$、$3$：$3$ 要在解集里，$4$ 不能在解集里。在数轴上看，端点 $\\frac a3$ 要落在 $3$ 和 $4$ 之间，并且可以等于 $3$、不能等于 $4$。',
        '所以 $3\\leq\\frac a3<4$。由 $3\\leq\\frac a3$ 得 $a\\geq9$；由 $\\frac a3<4$ 得 $a<12$。',
        '答案 $9\\leq a<12$。边界检验：$a=9$ 时解集 $x\\leq3$，正整数解 $1,2,3$，可以；$a=12$ 时解集 $x\\leq4$，多了 $4$，不行。',
      ],
      verify: () => {
        // a 以 1/4 为步长枚举，看正整数解是否恰好是 1、2、3
        const ok = [];
        for (let k = 0; k <= 80; k++) {
          const a = F(k).div(4);
          const sols = [];
          for (let x = 1; x <= 30; x++) if (F(3 * x).sub(a).cmp(0) <= 0) sols.push(x);
          if (sols.join() === '1,2,3') ok.push(a);
        }
        return ok[0].eq(9) && ok[ok.length - 1].eq(F(47).div(4)) ? '9<=a<12' : null;
      },
    },
    {
      id: '15.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的方程 $2(x-m)=3x+6-m$ 的解不小于 $-2$，求 $m$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'm', label: '', answer: 'm<=-4' },
      ],
      explain: [
        '先把 $m$ 当作已知数解方程：$2x-2m=3x+6-m$，$-x=6+m$，$x=-6-m$。',
        '解不小于 $-2$：$-6-m\\geq-2$。',
        '解关于 $m$ 的不等式：$-m\\geq4$，两边同除以 $-1$，方向改变：$m\\leq-4$。',
        '转弯：先解方程、再列不等式；最后一步系数是 $-1$，要变号。',
      ],
      verify: () => solve152(m => F(-6).sub(m).add(2), '>=', 'm'),
    },
    {
      id: '15.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '小明解不等式 $\\frac{2x-1}{3}-\\frac{x+a}{2}\\leq1$ 时，去分母时右边的 $1$ 忘了乘 $6$，结果得到解集 $x\\leq5$。求 $a$ 的值和这个不等式正确的解集。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '2/3' },
        { kind: 'ineq', label: '正确的解集为', answer: 'x<=10' },
      ],
      explain: [
        '按小明的做法：$2(2x-1)-3(x+a)\\leq1$，即 $4x-2-3x-3a\\leq1$，$x\\leq3+3a$。',
        '他得到 $x\\leq5$，所以 $3+3a=5$，$a=\\frac23$。',
        '正确做法：$2(2x-1)-3(x+a)\\leq6$，$x\\leq8+3a=8+2=10$。',
        '思路：错误的过程也是确定的，照着错法算出带 $a$ 的解集，和给出的结果对照求 $a$，再按正确方法重解。',
      ],
      verify: () => {
        const a = F(5).sub(3).div(3);
        const wrong = solve152(x => x.mul(2).sub(1).mul(2).sub(x.add(a).mul(3)).sub(1), '<=');
        const right = solve152(x => x.mul(2).sub(1).mul(2).sub(x.add(a).mul(3)).sub(6), '<=');
        return wrong === 'x<=5/1' ? [a, right] : null;
      },
    },
    {
      id: '15.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '甲商场所有商品打九折；乙商场购物不超过 $200$ 元不打折，超过 $200$ 元的部分打八折。某人要购买标价总额为 $x$ 元（$x>200$）的商品，$x$ 在什么范围内时，去乙商场花费更少？',
      blanks: [
        { kind: 'ineq', label: '', answer: 'x>400' },
      ],
      explain: [
        '甲商场花费 $0.9x$ 元；乙商场花费 $200+0.8(x-200)$ 元。',
        '去乙商场更少：$200+0.8(x-200)<0.9x$。',
        '去括号：$200+0.8x-160<0.9x$，即 $40+0.8x<0.9x$，移项得 $-0.1x<-40$，两边同除以 $-0.1$，方向改变：$x>400$。',
        '所以购物超过 $400$ 元时去乙商场花费更少（恰好 $400$ 元时两家都是 $360$ 元）。坑：乙商场是“超过 $200$ 元的部分”打八折，不是全部打八折。',
      ],
      verify: () => solve152(x => F(200).add(x.sub(200).mul(F('0.8'))).sub(x.mul(F('0.9'))), '<'),
    },
    {
      id: '15.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '不等式 $2(x+1)-3<3(x-1)$ 的每一个解，都是关于 $x$ 的不等式 $ax-1>2x$ 的解。求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: 'a>=5/2' },
      ],
      explain: [
        '先解第一个：$2x+2-3<3x-3$，$-x<-2$，$x>2$。',
        '第二个化为 $(a-2)x>1$，要按 $a-2$ 的正负分类。若 $a-2<0$，解集是 $x<\\frac{1}{a-2}$（一个负数），比 $2$ 大的数都不在里面；若 $a-2=0$，变成 $0>1$，无解。这两种都不行。',
        '所以 $a-2>0$，解集是 $x>\\frac{1}{a-2}$。要让所有大于 $2$ 的数都在里面，在数轴上 $\\frac{1}{a-2}$ 必须在 $2$ 的左边或与 $2$ 重合：$\\frac{1}{a-2}\\leq2$。',
        '两边同乘正数 $a-2$：$1\\leq2(a-2)$，$a\\geq\\frac52$。边界：$a=\\frac52$ 时第二个的解集是 $x>2$，正好相同，符合。',
        '转弯：不是“两个解集相等”，而是“一个装在另一个里面”，端点可以重合；还要先排除系数为负和为 $0$ 的情况。',
      ],
      verify: () => {
        // a 取格点，检查 x>2 的一批样本是否都满足 (a−2)x>1
        const xs = [F(201).div(100), F(5).div(2), F(3), F(10), F(1000)];
        const ok = [];
        for (let k = -40; k <= 40; k++) {
          const a = F(k).div(8);
          if (xs.every(x => a.mul(x).sub(1).cmp(x.mul(2)) > 0)) ok.push(a);
        }
        // x 取 2.01 时会让略小于 5/2 的 a 也通过，再用“比 2 大一点点”的 x 精确检查边界：要求 1/(a−2) ≤ 2
        const exact = ok.filter(a => a.sub(2).cmp(0) > 0 && F(1).div(a.sub(2)).cmp(2) <= 0);
        return exact[0].eq(F(5).div(2)) && exact.length === ok.filter(a => a.cmp(F(5).div(2)) >= 0).length ? 'a>=5/2' : null;
      },
    },
    {
      id: '15.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '一次竞赛共 $30$ 道题，答对一题得 $4$ 分，答错一题扣 $2$ 分，不答不得分。小军有题没答，答错的题数是没答题数的 $2$ 倍，最后得分超过 $70$ 分。小军最多、最少各答对了几道题？',
      blanks: [
        { kind: 'num', label: '最多', answer: '27', suffix: '道' },
        { kind: 'num', label: '最少', answer: '21', suffix: '道' },
      ],
      explain: [
        '设没答 $y$ 道（$y$ 是正整数，因为“有题没答”），则答错 $2y$ 道，答对 $(30-3y)$ 道。',
        '得分：$4(30-3y)-2\\times2y>70$，即 $120-12y-4y>70$，$-16y>-50$，$y<3\\frac18$。',
        '所以 $y$ 只能是 $1$、$2$、$3$，答对的题数 $30-3y$ 分别是 $27$、$24$、$21$。',
        '最多答对 $27$ 道，最少答对 $21$ 道。检验 $y=3$：答对 $21$、答错 $6$，得 $84-12=72>70$。',
        '转弯：设“没答的题数”比设“答对的题数”方便；“有题没答”说明 $y\\geq1$，答对的题数越少，$y$ 越大。',
      ],
      verify: () => {
        const ok = [];
        for (let y = 1; 3 * y <= 30; y++) if (4 * (30 - 3 * y) - 4 * y > 70) ok.push(30 - 3 * y);
        return [Math.max(...ok), Math.min(...ok)];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '15.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的方程 $|x-3|=a-2x$（$a$ 为常数）。(1) 不论 $a$ 取什么数，这个方程的解有几个？(2) 方程的解是负数时，求 $a$ 的取值范围；(3) 方程的解大于 $4$ 时，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '1', suffix: '个' },
        { kind: 'ineq', var: 'a', label: '(2)', answer: 'a<3' },
        { kind: 'ineq', var: 'a', label: '(3)', answer: 'a>9' },
      ],
      explain: [
        '按 $x-3$ 的正负分两种情况去绝对值，每种情况解出的 $x$ 都要**检验是否落在这种情况的范围里**。',
        '情况①：$x\\geq3$ 时，$x-3=a-2x$，$x=\\frac{a+3}{3}$。它有效要求 $\\frac{a+3}{3}\\geq3$，即 $a\\geq6$。',
        '情况②：$x<3$ 时，$3-x=a-2x$，$x=a-3$。它有效要求 $a-3<3$，即 $a<6$。',
        '(1) $a\\geq6$ 时只有情况①有效，$a<6$ 时只有情况②有效（两种情况的条件正好互补，而且每种情况都只解出一个 $x$），所以不论 $a$ 是多少，方程都恰好有 $1$ 个解。',
        '(2) 解是负数只可能来自情况②（情况①的解 $\\geq3$）：$a-3<0$，$a<3$，它满足 $a<6$，所以 $a<3$。',
        '(3) 解大于 $4$ 只可能来自情况①（情况②的解 $<3$）：$\\frac{a+3}{3}>4$，$a>9$，满足 $a\\geq6$，所以 $a>9$。思路：分情况求出解之后，先用“情况的范围”筛掉无效的解，再按问题的要求列不等式。',
      ],
      verify: () => {
        // a 取 1/4 的倍数，在 x 的格点上直接找方程的解（这时解都是 1/12 的倍数，且在 −25～25 之间）
        const sols = a => {
          const r = [];
          for (let k = -300; k <= 300; k++) { const x = F(k).div(12); if (x.sub(3).abs().eq(a.sub(x.mul(2)))) r.push(x); }
          return r;
        };
        const as = [];
        for (let k = -20; k <= 60; k++) as.push(F(k).div(4));
        const counts = new Set(as.map(a => sols(a).length));
        const neg = as.filter(a => sols(a).some(x => x.cmp(0) < 0));
        const big = as.filter(a => sols(a).some(x => x.cmp(4) > 0));
        return [
          counts.size === 1 ? [...counts][0] : null,
          neg[neg.length - 1].eq(F(11).div(4)) && neg.length === as.filter(a => a.cmp(3) < 0).length ? 'a<3' : null,
          big[0].eq(F(37).div(4)) && big.length === as.filter(a => a.cmp(9) > 0).length ? 'a>9' : null,
        ];
      },
    },
    {
      id: '15.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '定义：如果一个一元一次方程的解在某个一元一次不等式的解集里，就称这个方程是这个不等式的“关联方程”。已知不等式 $3x+2>2x+1$，关于 $x$ 的方程 $(k-1)x=2$。(1) 若这个方程是不等式的关联方程，求 $k$ 的取值范围（分成两部分填写，先填较小的部分）；(2) 若这个方程不是不等式的关联方程（方程无解时也算不是关联方程），求 $k$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'k', label: '(1)', answer: 'k<-1', suffix: '或' },
        { kind: 'ineq', var: 'k', label: '', answer: 'k>1' },
        { kind: 'ineq', var: 'k', label: '(2)', answer: '-1<=k<=1' },
      ],
      explain: [
        '先解不等式：$x>-1$。关联方程就是“方程有解，并且解大于 $-1$”。',
        '$k=1$ 时方程变成 $0=2$，没有解，不是关联方程。$k\\neq1$ 时 $x=\\frac{2}{k-1}$，要 $\\frac{2}{k-1}>-1$。两边要乘 $k-1$，必须按它的正负分类：',
        '当 $k-1>0$ 即 $k>1$ 时：$\\frac{2}{k-1}$ 是正数，一定大于 $-1$，所以 $k>1$ 都可以。',
        '当 $k-1<0$ 即 $k<1$ 时：两边同乘负数 $k-1$，方向改变：$2<-(k-1)$，$2<1-k$，$k<-1$。在数轴上看，$k<-1$ 都满足 $k<1$，所以这一支是 $k<-1$。',
        '(1) 关联方程：$k<-1$ 或 $k>1$。',
        '(2) 不是关联方程的 $k$ 是剩下的部分：$-1\\leq k\\leq1$。端点检验：$k=-1$ 时解为 $x=-1$，不大于 $-1$，不是关联方程；$k=1$ 时方程无解，也不是。坑：不分类直接乘 $k-1$，会得到 $k<-1$ 而漏掉 $k>1$；还要记得 $k=1$ 单独处理。',
      ],
      verify: () => {
        const isRel = k => !k.eq(1) && F(2).div(k.sub(1)).cmp(-1) > 0;
        const ks = [];
        for (let i = -40; i <= 40; i++) ks.push(F(i).div(8));
        const rel = ks.filter(isRel), not = ks.filter(k => !isRel(k));
        const lowOk = rel.filter(k => k.cmp(1) < 0).every(k => k.cmp(-1) < 0) && rel.some(k => k.eq(F(-9).div(8)));
        const highOk = ks.filter(k => k.cmp(1) > 0).every(isRel);
        const notOk = not.every(k => k.cmp(-1) >= 0 && k.cmp(1) <= 0) && not[0].eq(-1) && not[not.length - 1].eq(1);
        return [lowOk ? 'k<-1' : null, highOk ? 'k>1' : null, notOk ? '-1<=k<=1' : null];
      },
    },
    {
      id: '15.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '某班 $2$ 名老师带若干名学生去旅游，每人原价 $500$ 元。甲旅行社：老师免费，学生打八折；乙旅行社：所有人打七五折；丙旅行社：总人数达到 $20$ 人（含）时所有人打七折，不到 $20$ 人时所有人打九折。设学生有 $x$ 人。(1) 只在甲、乙两家中选，$x$ 满足什么条件时选甲更省？(2) 三家都可以选，$x$ 满足什么条件时选丙最省？(3) 学生人数满足什么条件时，乙旅行社是三家中最省的？',
      blanks: [
        { kind: 'ineq', label: '(1)', answer: 'x<30' },
        { kind: 'ineq', label: '(2)', answer: 'x>=18' },
        { kind: 'text', label: '(3) 乙最省时', answer: '不存在这样的 x', options: ['x<18', '18≤x<30', 'x≥30', '不存在这样的 x'] },
      ],
      explain: [
        '甲：$500\\times0.8x=400x$；乙：$500\\times0.75(x+2)=375x+750$。',
        '(1) $400x<375x+750$，$25x<750$，$x<30$。',
        '(2) 丙要分两段。总人数 $x+2<20$（$x<18$）时，丙是 $450(x+2)$，比乙的 $375(x+2)$ 贵，不可能最省。$x\\geq18$ 时，丙是 $350(x+2)=350x+700$：比乙便宜（$350<375$，人数相同）；和甲比，$350x+700<400x$，$x>14$，在 $x\\geq18$ 时总成立（在数轴上，$x\\geq18$ 的部分全在 $x>14$ 里面）。所以 $x\\geq18$ 时选丙最省。',
        '(3) $x<18$ 时，丙不是最省的，再比甲和乙：由 (1)，$x<30$ 时甲比乙省，所以这时甲最省；$x\\geq18$ 时丙最省。不论 $x$ 是多少，都有一家比乙省，乙不可能最省，不存在这样的 $x$。',
        '思路：丙的价格随人数“跳一下”，先按是否满 $20$ 人分段，每段里分别和甲、乙比；最后得出一个反直觉的结论：乙在和甲单独比较时 $x\\geq30$ 更省，但那时丙已经更便宜了。',
      ],
      verify: () => {
        const jia = x => 400 * x, yi = x => 375 * (x + 2), bing = x => (x + 2 >= 20 ? 350 : 450) * (x + 2);
        const cheaperJia = [];
        const bingBest = [];
        let yiBest = false;
        for (let x = 1; x <= 200; x++) {
          if (jia(x) < yi(x)) cheaperJia.push(x);
          if (bing(x) < jia(x) && bing(x) < yi(x)) bingBest.push(x);
          if (yi(x) < jia(x) && yi(x) < bing(x)) yiBest = true;
        }
        const r1 = cheaperJia[cheaperJia.length - 1] === 29 && cheaperJia.length === 29 ? 'x<30' : null;
        const r2 = bingBest[0] === 18 && bingBest.length === 200 - 17 ? 'x>=18' : null;
        return [r1, r2, yiBest ? null : '不存在这样的 x'];
      },
    },
    {
      id: '15.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的不等式 $(|a|-2)x>a+2$ 的解集是 $x<-1$，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: '-2<a<=0' },
      ],
      explain: [
        '第一步：解集是“$x<$”，方向改变了，说明 $|a|-2<0$，即 $|a|<2$，$a$ 在 $-2$ 和 $2$ 之间（不含端点）。',
        '第二步：解集为 $x<\\frac{a+2}{|a|-2}$，所以 $\\frac{a+2}{|a|-2}=-1$，即 $a+2=2-|a|$，$|a|=-a$。',
        '第三步：$|a|=-a$ 说明 $a$ 是负数或 $0$，即 $a\\leq0$。',
        '在数轴上看：$a$ 既要在 $-2$ 和 $2$ 之间（不含端点），又不能在 $0$ 的右边，所以 $-2<a\\leq0$。检验：$a=0$ 时 $-2x>2$，$x<-1$；$a=-1$ 时 $-x>1$，$x<-1$；$a=-2$ 时系数为 $0$，变成 $0>0$，不成立，要排除。',
        '关键：通常“由解集求参数”只得到一个值，这里因为 $|a|=-a$ 不是只有一个解，答案是一个范围；还要用第一步的条件把 $a=-2$ 排除。',
      ],
      verify: () => {
        const ok = [];
        for (let k = -16; k <= 16; k++) {
          const a = F(k).div(4);
          if (solve152(x => a.abs().sub(2).mul(x).sub(a.add(2)), '>') === 'x<-1/1') ok.push(a);
        }
        return ok[0].eq(F(-7).div(4)) && ok[ok.length - 1].eq(0) && ok.length === 8 ? '-2<a<=0' : null;
      },
    },
    {
      id: '15.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $-4$，点 $B$ 表示 $8$。点 $P$ 从 $A$ 出发，以每秒 $2$ 个单位的速度向右运动，到达 $B$ 后立即以原速返回；点 $Q$ 同时从 $B$ 出发，以每秒 $1$ 个单位的速度一直向左运动。在出发后的 $10$ 秒内（含第 $10$ 秒末），$P$、$Q$ 两点的距离不超过 $3$ 的时间一共有多少秒？',
      blanks: [
        { kind: 'num', label: '', answer: '3', suffix: '秒' },
      ],
      explain: [
        '设运动了 $t$ 秒。$P$ 到达 $B$ 用 $12\\div2=6$ 秒，所以要分 $0\\leq t\\leq6$ 和 $6<t\\leq10$ 两段。$Q$ 表示的数是 $8-t$。',
        '第一段 $0\\leq t\\leq6$：$P$ 表示 $-4+2t$。相遇前（$P$ 在 $Q$ 左边）距离 $(8-t)-(-4+2t)=12-3t$，由 $12-3t\\leq3$ 得 $t\\geq3$；相遇时 $t=4$。',
        '相遇后（$P$ 在 $Q$ 右边）距离 $(-4+2t)-(8-t)=3t-12$，由 $3t-12\\leq3$ 得 $t\\leq5$。所以第一段里 $3\\leq t\\leq5$，共 $2$ 秒。',
        '第二段 $6<t\\leq10$：$P$ 返回，表示 $8-2(t-6)=20-2t$。$t=6$ 时 $P$ 在 $8$、$Q$ 在 $2$，$P$ 在 $Q$ 右边；两点都向左，$P$ 更快，在追 $Q$，距离 $(20-2t)-(8-t)=12-t$，由 $12-t\\leq3$ 得 $t\\geq9$，所以 $9\\leq t\\leq10$，共 $1$ 秒。',
        '一共 $2+1=3$ 秒。关键：每一段先确定谁在左、谁在右，写出不带绝对值的距离，再列不等式，最后和这一段的时间范围合起来。',
      ],
      verify: () => {
        // 以 1/100 秒为步长扫描，统计距离不超过 3 的时长
        const pos = t => (t.cmp(6) <= 0 ? F(-4).add(t.mul(2)) : F(20).sub(t.mul(2)));
        let inside = 0;
        for (let k = 0; k < 1000; k++) {
          const t = F(2 * k + 1).div(200);  // 每个小段的中点
          if (pos(t).sub(F(8).sub(t)).abs().cmp(3) <= 0) inside++;
        }
        return F(inside).div(100);
      },
    },
  ],
});
