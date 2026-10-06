'use strict';

// 上海数学七年级下册 · 15.3 一元一次不等式组
// 知识范围：一元一次不等式组（几个含同一个未知数的一元一次不等式）；不等式组的解集（各解集的公共部分，在数轴上找）；解不等式组；应用
// 可以使用：15.1、15.2；六年级全部（绝对值、数轴、一元一次方程、二元一次方程组、三元一次方程组）；七年级上册全部
// 还没学：一元二次不等式、开平方（八年级上册）
// 本节约定：解集填空写成 −1<x≤3、x>2 这样的形式，没有公共部分填“无解”

// verify 用：几个一次不等式 [f, op] 的公共部分（f 为 Frac → Frac 的一次函数），返回判分器认识的字符串
const system153 = (list, v = 'x') => {
  let lo = null, loInc = false, hi = null, hiInc = false;
  for (const [f, op] of list) {
    const c = f(F(0)), k = f(F(1)).sub(c);
    if (k.isZero()) throw new Error('system153 不处理系数为 0 的不等式');
    const b = c.neg().div(k);
    const inc = op.length === 2;
    const greater = (op[0] === '>') === (k.cmp(0) > 0);  // x 大于 b
    if (greater) { if (!lo || b.cmp(lo) > 0 || (b.eq(lo) && !inc)) { lo = b; loInc = inc; } }
    else if (!hi || b.cmp(hi) < 0 || (b.eq(hi) && !inc)) { hi = b; hiInc = inc; }
  }
  const s = q => `${q.n}/${q.d}`;
  if (lo && hi) {
    const c = lo.cmp(hi);
    if (c > 0 || (c === 0 && !(loInc && hiInc))) return '无解';
    if (c === 0) return `${v}=${s(lo)}`;
    return `${s(lo)}${loInc ? '<=' : '<'}${v}${hiInc ? '<=' : '<'}${s(hi)}`;
  }
  if (lo) return `${v}${loInc ? '>=' : '>'}${s(lo)}`;
  return `${v}${hiInc ? '<=' : '<'}${s(hi)}`;
};
// 区间里的整数（解集字符串只用在 verify 里，这里直接按函数判断）
const ints153 = (ok, from = -50, to = 50) => {
  const r = [];
  for (let x = from; x <= to; x++) if (ok(x)) r.push(x);
  return r;
};

// 配图：数轴上两条射线
const FIG153 = (() => {
  const u = 26, ox = 16, y = 52;
  const svg = (lo, hi, rays) => {
    const w = (hi - lo) * u + 2 * ox + 10;
    const sx = x => ox + (x - lo) * u;
    let s = `<line x1="6" y1="${y}" x2="${w - 6}" y2="${y}" stroke="#2b2b2b" stroke-width="1.6"/><path d="M${w - 10},${y - 4} l6,4 l-6,4" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`;
    for (let x = lo; x <= hi; x++) s += `<line x1="${sx(x)}" y1="${y}" x2="${sx(x)}" y2="${y - 4}" stroke="#2b2b2b"/><text x="${sx(x)}" y="${y + 16}" text-anchor="middle" font-size="12">${x < 0 ? '−' + -x : x}</text>`;
    rays.forEach(([pt, solid, right], i) => {
      const x0 = sx(pt), yy = y - 16 - 14 * i, end = right ? w - 12 : 8, c = i ? '#2f6fd6' : '#c0513a';
      s += `<polyline points="${x0},${y} ${x0},${yy} ${end},${yy}" fill="none" stroke="${c}" stroke-width="1.8"/>`;
      s += `<path d="M${end + (right ? -5 : 5)},${yy - 4} l${right ? 5 : -5},4 l${right ? -5 : 5},4" fill="none" stroke="${c}" stroke-width="1.8"/>`;
      s += `<circle cx="${x0}" cy="${y}" r="4.5" fill="${solid ? c : '#fff'}" stroke="${c}" stroke-width="1.8"/>`;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 76" width="${w}" height="76" font-family="Times New Roman, serif">${s}</svg>`;
  };
  return { b02: svg(-4, 5, [[-2, false, true], [3, true, false]]) };
})();

Content.section({
  id: 'math/sh2024/g7s2/15.3',
  title: '一元一次不等式组',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮卡片 1 的例子与 b01 选项相同，卡片 3 的易错提示说破 b03 的坑，扩展档缺 5 级题，挑战档五题都只到真卷压轴且与扩展题同模板；第 2 轮卡片换例子，原 c02（整数对计数）降为 e02，c01 改为“与 m 无关”反推 t，c02 换成两端都动的整数解计数，c03 加“每种方案都不少于 600 元”，c04 改恰有 4 个整数解，c05（由 15.2 移来）加 S 的整数值个数后判定整节通过。可选意见：c05 (2) 加难有限' },

  intro: [
    {
      title: '一元一次不等式组',
      body: '由几个含有**同一个未知数**的一元一次不等式组成的一组不等式，叫作一元一次不等式组。它和方程组不同：方程组的未知数一般不止一个，不等式组的未知数只有一个。',
      example: '$\\begin{cases}3x>2,\\\\5-x\\geq1\\end{cases}$ 是一元一次不等式组：两个不等式都只含 $x$，次数都是 $1$。',
    },
    {
      title: '不等式组的解集',
      body: '不等式组中**所有**不等式的解集的公共部分，叫作不等式组的解集。把每个解集画在同一条数轴上，几条线都盖住的部分就是公共部分；没有公共部分，不等式组就**无解**。点「播放」看一看。',
      example: '$\\begin{cases}x>-1,\\\\x\\leq2\\end{cases}$ 的解集是 $-1<x\\leq2$；$\\begin{cases}x>2,\\\\x<-1\\end{cases}$ 无解。',
      demo: { type: 'solutionSet', sets: [['>', -1], ['<=', 2]], lo: -5, hi: 5, ints: true },
    },
    {
      title: '解不等式组',
      body: '分两步：先分别解出每个不等式，并在数轴上表示出来；再找它们的公共部分。可以借助口诀检查：同大取大，同小取小，大小小大中间找，大大小小无处找。',
      example: '$\\begin{cases}2x-1>1,\\\\x+3\\geq2x\\end{cases}$：由第一个得 $x>1$，由第二个得 $x\\leq3$，解集是 $1<x\\leq3$。',
      pitfall: '端点有没有等号，要回到各自的不等式里去看，不要凭感觉。',
    },
    {
      title: '连写的不等式',
      body: '像 $a<kx+b<c$ 这样连写的式子，就是不等式组 $\\begin{cases}kx+b>a,\\\\kx+b<c\\end{cases}$ 的简写。可以三部分同时加减、同时乘除（乘除负数时两个不等号都要改变方向）。',
      example: '$1<2x+3\\leq7$：三部分同减 $3$，得 $-2<2x\\leq4$；同除以 $2$，得 $-1<x\\leq2$。',
    },
    {
      title: '含字母的不等式组',
      body: '解集的端点里有字母时，先在数轴上画出端点的大致位置，再按题意判断端点的位置关系；最后把边界值（端点重合的情况）单独代回去检验，决定等号取不取。',
      example: '$\\begin{cases}x\\geq a,\\\\x\\leq1\\end{cases}$ 只有一个解时，两个端点重合，$a=1$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '15.3-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列不等式组中，是一元一次不等式组的是（　　）',
      options: ['$\\begin{cases}x+y>1,\\\\x<2\\end{cases}$', '$\\begin{cases}x^{2}>1,\\\\x<3\\end{cases}$', '$\\begin{cases}x>1,\\\\|x|<2\\end{cases}$', '$\\begin{cases}x>-1,\\\\2x-3\\leq5\\end{cases}$'],
      answer: 3,
      explain: [
        'A 有两个未知数 $x$、$y$，不是。',
        'B 中 $x^{2}>1$ 未知数的次数是 $2$，不是一元一次不等式。',
        'C 中 $|x|<2$ 含有未知数的绝对值，$|x|$ 不是 $x$ 的一次式，所以不是一元一次不等式。它的解集虽然和 $-2<x<2$ 相同，但“解集相同”不等于“本身就是”。',
        'D 两个都是含 $x$ 的一元一次不等式，是一元一次不等式组，选 D。坑：要求每个不等式都是一元一次的，并且是同一个未知数。',
      ],
    },
    {
      id: '15.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '某个不等式组中两个不等式的解集在数轴上的表示如图，这个不等式组的解集是什么？',
      figure: FIG153.b02,
      blanks: [
        { kind: 'ineq', label: '', answer: '-2<x<=3' },
      ],
      explain: [
        '红线：在 $-2$ 处是空心圈，向右画，表示 $x>-2$。',
        '蓝线：在 $3$ 处是实心点，向左画，表示 $x\\leq3$。',
        '两条线都盖住的部分在 $-2$ 和 $3$ 之间，解集是 $-2<x\\leq3$。坑：两端一个空心、一个实心，左端不取等号，右端取等号。',
      ],
      verify: () => system153([[x => x.add(2), '>'], [x => x.sub(3), '<=']]),
    },
    {
      id: '15.3-b03',
      level: 'basic',
      type: 'choice',
      stem: '下列不等式组中，无解的是（　　）',
      options: ['$\\begin{cases}x\\geq3,\\\\x\\leq3\\end{cases}$', '$\\begin{cases}x>-1,\\\\x<-1\\end{cases}$', '$\\begin{cases}x<-1,\\\\x<3\\end{cases}$', '$\\begin{cases}x>3,\\\\x>-1\\end{cases}$'],
      answer: 1,
      explain: [
        'A：两个端点都是 $3$，并且都带等号，$x=3$ 同时满足，解集是 $x=3$，有解。',
        'B：$x>-1$ 和 $x<-1$ 都不含 $-1$，没有公共部分，无解。',
        'C：同小取小，解集 $x<-1$。D：同大取大，解集 $x>3$。选 B。',
        '坑：A 看起来“大小相等”，但 $x=3$ 两个都满足，不是无解。',
      ],
      verify: () => {
        const r = [
          system153([[x => x.sub(3), '>='], [x => x.sub(3), '<=']]),
          system153([[x => x.add(1), '>'], [x => x.add(1), '<']]),
          system153([[x => x.add(1), '<'], [x => x.sub(3), '<']]),
          system153([[x => x.sub(3), '>'], [x => x.add(1), '>']]),
        ];
        return r.indexOf('无解') === r.lastIndexOf('无解') ? r.indexOf('无解') : -1;
      },
    },
    {
      id: '15.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '解不等式组：$\\begin{cases}3(x-1)\\leq5x+1,\\\\\\frac{x}{2}-1<\\frac{x-1}{3}.\\end{cases}$',
      blanks: [
        { kind: 'ineq', label: '解集为', answer: '-2<=x<4' },
      ],
      explain: [
        '第一个：$3x-3\\leq5x+1$，$-2x\\leq4$，两边同除以 $-2$，方向改变：$x\\geq-2$。',
        '第二个：两边同乘 $6$，$3x-6<2(x-1)$，$3x-6<2x-2$，$x<4$。',
        '公共部分：$-2\\leq x<4$。坑：第一个不等式系数是 $-2$，要变号；第二个去分母时 $-1$ 也要乘 $6$。',
      ],
      verify: () => system153([[x => x.sub(1).mul(3).sub(x.mul(5).add(1)), '<='], [x => x.div(2).sub(1).sub(x.sub(1).div(3)), '<']]),
    },
    {
      id: '15.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '求不等式组 $\\begin{cases}2x-1>-5,\\\\5-x\\geq2x-7\\end{cases}$ 的所有整数解的和。',
      blanks: [
        { kind: 'num', label: '', answer: '9' },
      ],
      explain: [
        '第一个：$2x>-4$，$x>-2$。第二个：$-3x\\geq-12$，$x\\leq4$。',
        '解集：$-2<x\\leq4$，整数解是 $-1$、$0$、$1$、$2$、$3$、$4$。',
        '和为 $-1+0+1+2+3+4=9$。坑：$-2$ 不在解集里，$4$ 在解集里。',
      ],
      verify: () => ints153(x => 2 * x - 1 > -5 && 5 - x >= 2 * x - 7).reduce((s, x) => s + x, 0),
    },
    {
      id: '15.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '解不等式：$-3\\leq\\frac{2x-1}{3}<1$。',
      blanks: [
        { kind: 'ineq', label: '解集为', answer: '-4<=x<2' },
      ],
      explain: [
        '三部分同乘 $3$：$-9\\leq2x-1<3$。',
        '三部分同加 $1$：$-8\\leq2x<4$。',
        '三部分同除以 $2$：$-4\\leq x<2$。坑：每一步都要对三部分同时操作，不能只改中间。',
      ],
      verify: () => system153([[x => x.mul(2).sub(1).div(3).add(3), '>='], [x => x.mul(2).sub(1).div(3).sub(1), '<']]),
    },
    {
      id: '15.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '若关于 $x$ 的不等式组 $\\begin{cases}x>a,\\\\x<3\\end{cases}$ 无解，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: 'a>=3' },
      ],
      explain: [
        '在数轴上，$x>a$ 向右，$x<3$ 向左。要没有公共部分，$a$ 必须在 $3$ 的右边或与 $3$ 重合。',
        '$a=3$ 时：$x>3$ 与 $x<3$ 都不含 $3$，没有公共部分，无解。',
        '所以 $a\\geq3$。坑：别漏了 $a=3$ 的情况，两个都是“不含端点”时，端点重合也无解。',
      ],
      verify: () => {
        const ok = [];
        for (let k = 0; k <= 24; k++) {
          const a = F(k).div(4);
          if (system153([[x => x.sub(a), '>'], [x => x.sub(3), '<']]) === '无解') ok.push(a);
        }
        return ok[0].eq(3) && ok.length === 13 ? 'a>=3' : null;
      },
    },
    {
      id: '15.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '$x$ 的 $2$ 倍与 $3$ 的和是正数，并且 $x$ 的一半与 $1$ 的差是负数。求 $x$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '', answer: '-3/2<x<2' },
      ],
      explain: [
        '列不等式组：$\\begin{cases}2x+3>0,\\\\\\frac x2-1<0.\\end{cases}$',
        '第一个：$x>-\\frac32$；第二个：$x<2$。',
        '解集：$-\\frac32<x<2$。坑：“$x$ 的一半与 $1$ 的差”是 $\\frac x2-1$，不是 $\\frac{x-1}{2}$。',
      ],
      verify: () => system153([[x => x.mul(2).add(3), '>'], [x => x.div(2).sub(1), '<']]),
    },
    {
      id: '15.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '解不等式组：$\\begin{cases}x-2\\geq1,\\\\4x+1<2x+5.\\end{cases}$',
      blanks: [
        { kind: 'ineq', label: '解集为', answer: '无解' },
      ],
      explain: [
        '第一个：$x\\geq3$。第二个：$2x<4$，$x<2$。',
        '在数轴上，$x\\geq3$ 从 $3$ 向右，$x<2$ 从 $2$ 向左，两条线没有重叠的部分。',
        '所以不等式组无解。坑：不要把两个端点直接拼成 $2<x\\leq3$，大大小小无处找。',
      ],
      verify: () => system153([[x => x.sub(3), '>='], [x => x.mul(2).sub(4), '<']]),
    },

    // ---------- 扩展 ----------
    {
      id: '15.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$、$y$ 的方程组 $\\begin{cases}x+2y=4k,\\\\2x+y=2k+1\\end{cases}$ 的解满足 $-1<x-y<0$，求 $k$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'k', label: '', answer: '1/2<k<1' },
      ],
      explain: [
        '不用把 $x$、$y$ 分别求出来，观察要用的是 $x-y$：第二个方程减第一个方程，得 $x-y=2k+1-4k=1-2k$。',
        '代入条件：$-1<1-2k<0$。',
        '三部分同减 $1$：$-2<-2k<-1$；同除以 $-2$，两个不等号都改变方向：$1>k>\\frac12$，即 $\\frac12<k<1$。',
        '转弯：整体求出 $x-y$，比分别解出 $x$、$y$ 简单；最后除以负数，两个不等号都要变。',
      ],
      verify: () => {
        // 解方程组后直接用 x−y，按 k 的格点筛选
        const ok = [];
        for (let i = -40; i <= 40; i++) {
          const k = F(i).div(20);
          const y = k.mul(8).sub(k.mul(2).add(1)).div(3), x = k.mul(4).sub(y.mul(2));  // 由两个方程消元
          if (!x.mul(2).add(y).eq(k.mul(2).add(1))) return null;
          const d = x.sub(y);
          if (d.cmp(-1) > 0 && d.cmp(0) < 0) ok.push(k);
        }
        return ok[0].eq(F(11).div(20)) && ok[ok.length - 1].eq(F(19).div(20)) ? '1/2<k<1' : null;
      },
    },
    {
      id: '15.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的不等式组 $\\begin{cases}3x-a\\geq0,\\\\2x-b<0\\end{cases}$ 的整数解恰好是 $2$、$3$、$4$。若 $a$、$b$ 都是整数，这样的有序整数对 $(a,b)$ 共有几对？',
      blanks: [
        { kind: 'num', label: '', answer: '6', suffix: '对' },
      ],
      explain: [
        '解集：$\\frac a3\\leq x<\\frac b2$。整数解恰好是 $2,3,4$，要分别看左右两个端点。',
        '左端点：$2$ 在解集里，$1$ 不在。$\\frac a3\\leq2$，且 $\\frac a3>1$（若 $\\frac a3\\leq1$，$1$ 也满足）。所以 $1<\\frac a3\\leq2$，$3<a\\leq6$，整数 $a=4,5,6$。',
        '右端点：$4$ 在解集里，$5$ 不在。$\\frac b2>4$，且 $\\frac b2\\leq5$（若 $\\frac b2>5$，$5$ 也满足）。所以 $4<\\frac b2\\leq5$，$8<b\\leq10$，整数 $b=9,10$。',
        '$a$ 有 $3$ 种取法，$b$ 有 $2$ 种，互不影响，共 $3\\times2=6$ 对。',
        '关键：两个端点“一个带等号、一个不带”，所以边界上等号的取舍正好相反；每个端点都用“最大（小）的整数解在里面、再往外一个不在里面”来卡住，最后用乘法计数。',
      ],
      verify: () => {
        let n = 0;
        for (let a = -30; a <= 30; a++) for (let b = -30; b <= 30; b++) {
          const sols = ints153(x => 3 * x - a >= 0 && 2 * x - b < 0, -40, 40);
          if (sols.join() === '2,3,4') n++;
        }
        return n;
      },
    },
    {
      id: '15.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '学校安排学生住宿：如果每间住 $4$ 人，有 $20$ 人没有房间住；如果每间住 $8$ 人，那么有一间宿舍不空也不满。求宿舍的间数和学生人数。',
      blanks: [
        { kind: 'num', label: '宿舍', answer: '6', suffix: '间' },
        { kind: 'num', label: '学生', answer: '44', suffix: '人' },
      ],
      explain: [
        '设有 $x$ 间宿舍，则学生有 $(4x+20)$ 人。',
        '每间住 $8$ 人时，前 $(x-1)$ 间住满，最后一间住了 $4x+20-8(x-1)=28-4x$ 人。“不空也不满”：$0<28-4x<8$。',
        '解：$-28<-4x<-20$，同除以 $-4$：$5<x<7$。$x$ 是正整数，$x=6$，学生 $4\\times6+20=44$ 人。',
        '转弯：“不空也不满”是两个条件，要列成连写的不等式；最后一间的人数是“总人数减去前面住满的人数”。',
      ],
      verify: () => {
        const r = [];
        for (let x = 1; x <= 100; x++) {
          const last = 4 * x + 20 - 8 * (x - 1);
          if (last > 0 && last < 8) r.push([x, 4 * x + 20]);
        }
        return r.length === 1 ? r[0] : null;
      },
    },
    {
      id: '15.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '某班要购买 A、B 两种奖品共 $20$ 件，A 每件 $30$ 元，B 每件 $50$ 元。要求总费用不超过 $820$ 元，并且 A 的件数不超过 B 的件数的 $3$ 倍。共有几种购买方案？其中最少要花多少元？',
      blanks: [
        { kind: 'num', label: '方案', answer: '7', suffix: '种' },
        { kind: 'num', label: '最少花', answer: '700', suffix: '元' },
      ],
      explain: [
        '设买 B 种 $x$ 件，A 种 $(20-x)$ 件。',
        '费用：$30(20-x)+50x\\leq820$，$600+20x\\leq820$，$x\\leq11$。件数：$20-x\\leq3x$，$x\\geq5$。',
        '所以 $5\\leq x\\leq11$，$x$ 取 $5,6,\\dots,11$，共 $7$ 种方案。',
        '总费用 $600+20x$ 随 $x$ 增大而增大，$x=5$ 时最少：$600+100=700$ 元。',
      ],
      verify: () => {
        const xs = ints153(x => x >= 0 && x <= 20 && 30 * (20 - x) + 50 * x <= 820 && 20 - x <= 3 * x);
        return [xs.length, Math.min(...xs.map(x => 30 * (20 - x) + 50 * x))];
      },
    },
    {
      id: '15.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '用 $[m]$ 表示不超过 $m$ 的最大整数，例如 $[2.6]=2$，$[-1.2]=-2$，$[3]=3$。求满足 $\\left[\\frac{2x+1}{3}\\right]=x-1$ 的所有 $x$（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$x=$', answer: ['2', '3', '4'] },
      ],
      explain: [
        '第一步：$[m]$ 一定是整数，所以 $x-1$ 是整数，$x$ 也是整数。设 $x-1=n$（$n$ 为整数），$x=n+1$。',
        '第二步：$[m]=n$ 的意思是 $n\\leq m<n+1$。这里 $m=\\frac{2x+1}{3}=\\frac{2n+3}{3}$，所以 $n\\leq\\frac{2n+3}{3}<n+1$。',
        '解这个不等式组：$3n\\leq2n+3$ 得 $n\\leq3$；$2n+3<3n+3$ 得 $n>0$。所以 $0<n\\leq3$，$n=1,2,3$。',
        '$x=n+1=2,3,4$。检验：$x=2$ 时 $[\\frac53]=1$；$x=3$ 时 $[\\frac73]=2$；$x=4$ 时 $[3]=3$，都成立。',
        '转弯：先由“取整的结果是整数”推出 $x$ 是整数，再把 $[m]=n$ 翻译成连写的不等式。',
      ],
      verify: () => {
        const floor = q => { const n = q.n / q.d; return q.n < 0n && q.n % q.d !== 0n ? n - 1n : n; };
        const r = [];
        for (let k = -200; k <= 200; k++) {
          const x = F(k).div(4);
          const m = x.mul(2).add(1).div(3);
          if (x.sub(1).d === 1n && F(floor(m)).eq(x.sub(1))) r.push(x);
        }
        return r;
      },
    },
    {
      id: '15.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '关于 $x$ 的不等式组 $\\begin{cases}2x-a<1,\\\\x-2b>3\\end{cases}$ 的解集是 $-1<x<1$，求 $(a+b)^{2025}$ 的值。',
      blanks: [
        { kind: 'num', label: '', answer: '-1' },
      ],
      explain: [
        '第一个：$x<\\frac{a+1}{2}$；第二个：$x>2b+3$。解集为 $2b+3<x<\\frac{a+1}{2}$。',
        '和 $-1<x<1$ 对照：$2b+3=-1$，$\\frac{a+1}{2}=1$，得 $b=-2$，$a=1$。',
        '$(a+b)^{2025}=(-1)^{2025}=-1$（奇数个 $-1$ 相乘）。',
        '转弯：先用字母表示出解集，再让左端点对左端点、右端点对右端点，不要配错。',
      ],
      verify: () => {
        const a = F(1), b = F(-2);
        const set = system153([[x => x.mul(2).sub(a).sub(1), '<'], [x => x.sub(b.mul(2)).sub(3), '>']]);
        return set === '-1/1<x<1/1' ? a.add(b).pow(2025) : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '15.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$、$y$ 的方程组 $\\begin{cases}x+y=-m-8,\\\\x-y=3m+4\\end{cases}$ 的解中，$x$ 为非正数，$y$ 为负数。(1) 求 $m$ 的取值范围；(2) 若对这个范围内的每一个 $m$，代数式 $|m-t|+|m+3|$ 的值都相同（与 $m$ 无关），求常数 $t$ 的取值范围；(3) 在 $m$ 的取值范围内，$m$ 为哪个整数时，关于 $x$ 的不等式 $(2m+3)x>2m+3$ 的解集为 $x<1$？',
      blanks: [
        { kind: 'ineq', var: 'm', label: '(1)', answer: '-3<m<=2' },
        { kind: 'ineq', var: 't', label: '(2)', answer: 't>=2' },
        { kind: 'num', label: '(3) $m=$', answer: '-2' },
      ],
      explain: [
        '(1) 两式相加：$2x=2m-4$，$x=m-2$；两式相减：$2y=-4m-12$，$y=-2m-6$。$x\\leq0$ 得 $m\\leq2$；$y<0$ 得 $m>-3$。所以 $-3<m\\leq2$。',
        '(2) 在这个范围内 $m+3>0$，$|m+3|=m+3$。要使 $|m-t|+(m+3)$ 与 $m$ 无关，$|m-t|$ 必须去掉绝对值后变成 $t-m$（这样 $m$ 正好抵消，值为 $t+3$）。',
        '也就是对范围内的每一个 $m$ 都有 $m-t\\leq0$，即 $t\\geq m$。$m$ 最大可以取到 $2$，所以 $t\\geq2$。',
        '反过来检验：若 $t<2$，取 $m=2$ 和 $m$ 接近 $-3$ 时，$|m-t|$ 去绝对值的方式不同，式子的值会变（例如 $t=0$：$m=2$ 时值为 $7$，$m=-1$ 时值为 $3$）。所以 $t\\geq2$。',
        '(3) 解集为 $x<1$，方向改变，说明 $2m+3<0$，$m<-\\frac32$。在数轴上和 $-3<m\\leq2$ 的重叠部分是 $-3<m<-\\frac32$，其中的整数只有 $m=-2$。检验：$-x>-1$，$x<1$，符合。',
        '关键：(2) 是“反过来用分类”——不是给了 $t$ 去化简，而是要求化简结果不含 $m$，从而倒推出 $m-t$ 在整个范围里都不能为正。',
      ],
      verify: () => {
        const ms = [];
        for (let k = -24; k <= 24; k++) {
          const m = F(k).div(4);
          const x = m.sub(2), y = m.mul(-2).sub(6);
          if (!x.add(y).eq(m.neg().sub(8)) || !x.sub(y).eq(m.mul(3).add(4))) return null;
          if (x.cmp(0) <= 0 && y.cmp(0) < 0) ms.push(m);
        }
        const rangeOk = ms[0].eq(F(-11).div(4)) && ms[ms.length - 1].eq(2);
        // m 再加上接近 −3 的点，检查 t 的格点里哪些使式子取值唯一
        const probe = [...ms, F(-299).div(100)];
        const ts = [];
        for (let k = -24; k <= 24; k++) {
          const t = F(k).div(4);
          if (new Set(probe.map(m => m.sub(t).abs().add(m.add(3).abs()).toString())).size === 1) ts.push(t);
        }
        const tOk = ts[0].eq(2) && ts.length === 17;
        const m3 = ms.filter(m => m.d === 1n && m.mul(2).add(3).cmp(0) < 0);
        return [rangeOk ? '-3<m<=2' : null, tOk ? 't>=2' : null, m3.length === 1 ? m3[0] : null];
      },
    },
    {
      id: '15.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '关于 $x$ 的不等式组 $\\begin{cases}x>a,\\\\2x\\leq a+3\\end{cases}$ 恰好有 $2$ 个整数解，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: '-2<=a<0' },
      ],
      explain: [
        '解集是 $a<x\\leq\\frac{a+3}{2}$，两个端点都随 $a$ 移动，而且右端点移动的速度只有左端点的一半，所以不能像“一端固定”那样直接卡端点。要有解需 $a<\\frac{a+3}2$，即 $a<3$。',
        '思路：$a$ 变化时，解集里的整数会一个一个地进出。按 $a$ 落在哪两个相邻整数之间来分类：设 $n\\leq a<n+1$（$n$ 为整数），那么大于 $a$ 的最小整数是 $n+1$。',
        '恰好 $2$ 个整数解，就是 $n+1$、$n+2$ 在解集里，$n+3$ 不在：$n+2\\leq\\frac{a+3}{2}<n+3$，即 $2n+1\\leq a<2n+3$。',
        '再和 $n\\leq a<n+1$ 合起来：需要 $2n+1<n+1$ 才可能有重叠（否则 $a\\geq2n+1\\geq n+1$）。逐个看：$n=-1$ 时，$-1\\leq a<0$ 与 $-1\\leq a<1$ 重叠为 $-1\\leq a<0$；$n=-2$ 时，$-2\\leq a<-1$ 与 $-3\\leq a<-1$ 重叠为 $-2\\leq a<-1$；$n=-3$ 时，$-3\\leq a<-2$ 与 $-5\\leq a<-3$ 没有重叠；$n$ 更小时也没有；$n\\geq0$ 时也没有。',
        '合起来：$-2\\leq a<0$。检验：$a=-2$ 时 $-2<x\\leq\\frac12$，整数解 $-1,0$；$a=-0.5$ 时 $-0.5<x\\leq1.25$，整数解 $0,1$；$a=0$ 时 $0<x\\leq1.5$，只有 $1$；$a=-2.5$ 时有 $-2,-1,0$ 三个。',
        '关键：两端都动时，先固定“$a$ 在哪两个整数之间”，把左端第一个整数确定下来，再卡右端点；整数解是哪两个会随 $a$ 变化（$-1,0$ 或 $0,1$）。',
      ],
      verify: () => {
        const ok = [];
        for (let k = -80; k <= 24; k++) {
          const a = F(k).div(8);
          const sols = ints153(x => F(x).cmp(a) > 0 && F(2 * x).cmp(a.add(3)) <= 0);
          if (sols.length === 2) ok.push(a);
        }
        return ok[0].eq(-2) && ok[ok.length - 1].eq(F(-1).div(8)) && ok.length === 16 ? '-2<=a<0' : null;
      },
    },
    {
      id: '15.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '某商店购进 A、B 两种商品共 $100$ 件，A 每件进价 $15$ 元，B 每件进价 $35$ 元，总进价不超过 $2700$ 元。按原定售价，A 每件获利 $5$ 元，B 每件获利 $8$ 元，要求这批商品全部售出后获利不少于 $650$ 元。(1) 共有几种进货方案？(2) 进货后，B 每件降价 $a$ 元出售（$0<a<8$，A 售价不变），全部售出。当 $0<a<3$ 时，B 进多少件获利最多？当 $3<a<8$ 时呢？(3) 在 (2) 的情况下，若要求 (1) 中**每一种**进货方案获利都不少于 $600$ 元，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '11', suffix: '种' },
        { kind: 'num', label: '(2) $0<a<3$ 时 B 进', answer: '60', suffix: '件' },
        { kind: 'num', label: '$3<a<8$ 时 B 进', answer: '50', suffix: '件' },
        { kind: 'ineq', var: 'a', label: '(3) $a$ 的完整取值范围', answer: '0<a<=1' },
      ],
      explain: [
        '(1) 设 B 进 $x$ 件，A 进 $(100-x)$ 件。进价：$15(100-x)+35x\\leq2700$，$1500+20x\\leq2700$，$x\\leq60$。',
        '获利：$5(100-x)+8x\\geq650$，$500+3x\\geq650$，$x\\geq50$。所以 $50\\leq x\\leq60$，$x$ 为整数，共 $11$ 种方案。',
        '(2) B 每件获利变成 $(8-a)$ 元，总获利 $W=5(100-x)+(8-a)x=500+(3-a)x$，$x$ 仍在 $50\\leq x\\leq60$ 中选。',
        '当 $0<a<3$ 时，$3-a>0$，$x$ 越大 $W$ 越大，B 进 $60$ 件获利最多；当 $3<a<8$ 时，$3-a<0$，$x$ 越小 $W$ 越大，B 进 $50$ 件获利最多；$a=3$ 时各方案获利都是 $500$ 元。',
        '(3) 每一种方案都不少于 $600$ 元，就是获利**最少**的那种方案也不少于 $600$ 元。按 (2) 分类：当 $0<a\\leq3$ 时，$3-a\\geq0$，获利最少的是 $x=50$：$500+50(3-a)\\geq600$，$a\\leq1$；当 $3<a<8$ 时，获利最少的是 $x=60$：$500+60(3-a)\\geq600$，$a\\leq\\frac43$，和 $a>3$ 矛盾，这一段不行。',
        '所以 $0<a\\leq1$。思路：先用不等式组确定可选范围，再看获利式子中 $x$ 的系数 $3-a$ 的正负，按 $a$ 分类决定最大、最小分别在范围的哪一端；(3) 是“对所有方案都成立”，要抓住最不利的那一个。',
      ],
      verify: () => {
        const xs = ints153(x => x >= 0 && x <= 100 && 15 * (100 - x) + 35 * x <= 2700 && 5 * (100 - x) + 8 * x >= 650, 0, 100);
        const best = a => xs.reduce((b, x) => (5 * (100 - x) + (8 - a) * x > 5 * (100 - b) + (8 - a) * b ? x : b), xs[0]);
        const lowA = [0.5, 1, 2.9].map(best), highA = [3.1, 5, 7.9].map(best);
        const as = [];
        for (let k = 1; k < 64; k++) { const a = k / 8; if (xs.every(x => 5 * (100 - x) + (8 - a) * x >= 600)) as.push(a); }
        const r3 = as[0] === 1 / 8 && as[as.length - 1] === 1 && as.length === 8 ? '0<a<=1' : null;
        return [xs.length, lowA.every(x => x === lowA[0]) ? lowA[0] : null, highA.every(x => x === highA[0]) ? highA[0] : null, r3];
      },
    },
    {
      id: '15.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 解不等式 $|x-1|+|x+2|<5$；(2) 若关于 $x$ 的不等式 $|x-1|+|x+2|<a$ 恰好有 $4$ 个整数解，求 $a$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '(1) 解集为', answer: '-3<x<2' },
        { kind: 'ineq', var: 'a', label: '(2)', answer: '3<a<=5' },
      ],
      explain: [
        '(1) 按 $x-1$、$x+2$ 的正负分三段去绝对值，分界点是 $1$ 和 $-2$。',
        '当 $x<-2$ 时：原式 $=(1-x)+(-x-2)=-2x-1<5$，$x>-3$。和 $x<-2$ 取公共部分：$-3<x<-2$。',
        '当 $-2\\leq x\\leq1$ 时：原式 $=(1-x)+(x+2)=3<5$，恒成立，这一段全部是解：$-2\\leq x\\leq1$。',
        '当 $x>1$ 时：原式 $=(x-1)+(x+2)=2x+1<5$，$x<2$。公共部分：$1<x<2$。',
        '三段合起来正好连成一段：$-3<x<2$。也可以从数轴上看：$|x-1|+|x+2|$ 是 $x$ 到 $1$ 和到 $-2$ 的距离之和，在两点之间时等于 $3$，向外每走 $1$ 个单位增加 $2$。',
        '(2) 先算整数点上的值：$x=-2,-1,0,1$ 时都等于 $3$；$x=-3$ 或 $2$ 时等于 $5$；$x=-4$ 或 $3$ 时等于 $7$；越往外越大，并且左右成对出现。',
        '整数解是“值小于 $a$”的整数。$a\\leq3$ 时一个也没有；$3<a\\leq5$ 时恰好是 $-2,-1,0,1$ 这 $4$ 个；$5<a\\leq7$ 时多出 $-3$、$2$，变成 $6$ 个。所以 $3<a\\leq5$。',
        '坑：$a=5$ 时 $x=-3$、$2$ 的值等于 $5$，不满足“$<5$”，不算解，所以 $a=5$ 可以取；$a=3$ 时一个解也没有，不能取。',
      ],
      verify: () => {
        const val = x => x.sub(1).abs().add(x.add(2).abs());
        const ok = [];
        for (let k = -80; k <= 80; k++) { const x = F(k).div(10); if (val(x).cmp(5) < 0) ok.push(x); }
        const r1 = ok[0].eq(F(-29).div(10)) && ok[ok.length - 1].eq(F(19).div(10)) && ok.length === 49 ? '-3<x<2' : null;
        let min = null;
        for (let k = -80; k <= 80; k++) { const v = val(F(k).div(10)); if (!min || v.cmp(min) < 0) min = v; }
        const cnt = a => ints153(x => val(F(x)).cmp(a) < 0).length;
        const as = [];
        for (let k = 0; k <= 64; k++) { const a = F(k).div(8); if (cnt(a) === 4) as.push(a); }
        return [r1, min.eq(3) && as[0].eq(F(25).div(8)) && as[as.length - 1].eq(5) && as.length === 16 ? '3<a<=5' : null];
      },
    },
    {
      id: '15.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '已知非负数 $x$、$y$、$z$ 满足 $x+y+z=6$，$x-y+2z=4$。设 $S=2x+y-z$。(1) 求 $S$ 的最大值和最小值；(2) $S$ 能取到的整数值共有几个？(3) 若 $x$、$y$、$z$ 都是非负整数，这样的 $(x,y,z)$ 共有几组？',
      blanks: [
        { kind: 'num', label: '(1) 最大值', answer: '11' },
        { kind: 'num', label: '最小值', answer: '-2/3' },
        { kind: 'num', label: '(2)', answer: '12', suffix: '个' },
        { kind: 'num', label: '(3)', answer: '2', suffix: '组' },
      ],
      explain: [
        '思路：三个未知数、两个方程，可以用其中一个（比如 $z$）表示另外两个，把问题变成一个未知数的问题。',
        '两式相加：$2x+3z=10$，$x=\\frac{10-3z}{2}$；代入第一式：$y=6-x-z=\\frac{2+z}{2}$。',
        '由非负列不等式：$z\\geq0$；$x\\geq0$ 即 $10-3z\\geq0$，$z\\leq\\frac{10}{3}$；$y=\\frac{2+z}{2}\\geq0$ 在 $z\\geq0$ 时自动成立。所以 $0\\leq z\\leq\\frac{10}{3}$。',
        '$S=2x+y-z=(10-3z)+\\frac{2+z}{2}-z=\\frac{22-7z}{2}$。$z$ 越大 $S$ 越小：$z=0$ 时 $S$ 最大，为 $11$；$z=\\frac{10}{3}$ 时 $S$ 最小，为 $\\frac{22-\\frac{70}{3}}{2}=-\\frac23$。',
        '(2) $z$ 可以取 $0$ 到 $\\frac{10}{3}$ 之间的任何数，$S=\\frac{22-7z}{2}$ 就能取到 $-\\frac23$ 到 $11$ 之间的任何数（$z=\\frac{22-2S}{7}$ 正好落在范围里）。其中的整数是 $0,1,\\dots,11$，共 $12$ 个。注意 $S$ 取整数不要求 $x$、$y$、$z$ 是整数。',
        '(3) 要 $x=\\frac{10-3z}{2}$、$y=\\frac{2+z}{2}$ 都是整数，$z$ 必须是偶数；又 $0\\leq z\\leq\\frac{10}{3}$，所以 $z=0$ 或 $2$，对应 $(5,1,0)$、$(2,2,2)$，共 $2$ 组。',
      ],
      verify: () => {
        let hi = null, lo = null;
        let count = 0;
        // z 以 1/30 为步长覆盖 [0, 10/3]（端点 10/3 恰好在格点上）
        for (let k = 0; k <= 200; k++) {
          const z = F(k).div(30), x = F(10).sub(z.mul(3)).div(2), y = F(6).sub(x).sub(z);
          if (x.cmp(0) < 0 || y.cmp(0) < 0) continue;
          if (!x.add(y).add(z).eq(6) || !x.sub(y).add(z.mul(2)).eq(4)) return null;
          const S = x.mul(2).add(y).sub(z);
          if (!hi || S.cmp(hi) > 0) hi = S;
          if (!lo || S.cmp(lo) < 0) lo = S;
        }
        for (let x = 0; x <= 6; x++) for (let y = 0; y <= 6; y++) for (let z = 0; z <= 6; z++) if (x + y + z === 6 && x - y + 2 * z === 4) count++;
        // S 的整数值：对每个整数 s 反解 z，看是否在 [0, 10/3]
        let sInts = 0;
        for (let s = -5; s <= 20; s++) { const z = F(22 - 2 * s).div(7); if (z.cmp(0) >= 0 && z.cmp(F(10).div(3)) <= 0) sInts++; }
        return [hi, lo, sInts, count];
      },
    },
  ],
});
