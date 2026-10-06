'use strict';

// 上海数学七年级下册 · 15.1 不等式及其性质
// 知识范围：不等号（>、<、≥、≤）与不等式，用不等式表示数量关系；性质 1（三种关系有且只有一种成立）、性质 2（传递性）、
//   性质 3（两边同加减）、性质 4（同乘除正数方向不变）、性质 5（同乘除负数方向改变）；由性质 3 得到移项
// 可以使用：六年级全部（有理数、绝对值、数轴、一元一次方程、二元一次方程组）；七年级上册全部（整式、乘法公式、配方、因式分解、分式、幂的运算）
// 还没学：不等式的解集、解一元一次不等式（15.2）；不等式组（15.3）；开平方以外的无理数运算（八年级上册）
// 本节约定：“比较大小”的填空按钮中，“不能确定”表示随字母取值不同，大小关系会变

// verify 用的样本数：正负、整数、分数都有
// F 只在测试里有定义，所以样本在 verify 运行时才生成
const S151 = () => S151_.map(v => F(v));
const S151_ = ['-7', '-3', '-2', '-3/2', '-1', '-1/3', '0', '1/4', '1/2', '1', '2', '5/2', '3', '6'];
const pairs151 = (cond) => {
  const out = [];
  for (const a of S151()) for (const b of S151()) if (cond(a, b)) out.push([a, b]);
  return out;
};
// 样本里某个说法是否总成立
const always151 = (list, claim) => list.every(p => claim(...p));

Content.section({
  id: 'math/sh2024/g7s2/15.1',
  title: '不等式及其性质',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮基础档全部合格；e05（单变量配方）只有 2～3 级且与卡片例子 (x+3)²+1 撞车，c01 只有待定系数一个环节，c02 两种购买方式是经典题且与 c03 的 C 结论相同，c04 跷跷板一加一减就做完，c05 偏常规；第 2 轮 e05 改含交叉项、卡片例子换成 x²+4≥4，c01 加 a²−b² 的范围（按符号分类），c02 加丙并三人排序，c03 的 C 换成三个平方和，c04 改为多选并要求为推不出的结论举反例，c05 (1) 改三数排序后判定整节通过。可选意见：c05 (2) 放缩略带竞赛味' },

  intro: [
    {
      title: '不等号与不等式',
      body: '表示大小关系要用不等号：$>$、$<$，还有 $\\geq$（大于或等于）、$\\leq$（小于或等于）。用不等号连接的式子叫作**不等式**。把文字翻译成不等式时，要抓住关键词：“不大于”就是 $\\leq$，“不小于”就是 $\\geq$，“超过”是 $>$。',
      example: '“$y$ 的一半与 $4$ 的和是负数”写成 $\\frac{y}{2}+4<0$。',
    },
    {
      title: '性质 1、性质 2',
      body: '两个数 $a$、$b$ 在数轴上，$A$ 要么在 $B$ 右边、要么在左边、要么重合，所以 $a>b$、$a<b$、$a=b$ **有且只有一种**成立（性质 1）。如果 $a>b$，$b>c$，那么 $a>c$，这叫**传递性**（性质 2），$<$、$\\geq$、$\\leq$ 也一样。',
      example: '$\\pi>3.1$，$3.1>3$，所以 $\\pi>3$。',
    },
    {
      title: '性质 3：两边同加（或减）',
      body: '不等式两边同加（或减）同一个数，不等号方向**不变**。由它可以**移项**：把一边的某一项变号后移到另一边。',
      example: '由 $a-3>b$，两边同加 $3$，得 $a>b+3$。',
    },
    {
      title: '性质 4、性质 5：两边同乘（或除以）',
      body: '两边同乘（或除以）同一个**正数**，方向不变；同乘（或除以）同一个**负数**，方向**改变**。为什么？乘负数相当于先伸缩、再把数轴上的点翻到原点另一侧，左右顺序就颠倒了，点「播放」看一看。',
      example: '由 $a<b$ 得 $-4a>-4b$；由 $\\frac{x}{2}>1$ 得 $x>2$。',
      pitfall: '乘、除含字母的数之前，要先确定它是正数、负数还是 $0$；不确定时不能直接用性质 4、5。',
      demo: { type: 'scaleOrder', a: 3, b: 1, ks: [2, -1, -2] },
    },
    {
      title: '作差比较大小',
      body: '由性质 3：$a-b>0$ 就是 $a>b$，$a-b<0$ 就是 $a<b$。比较两个式子的大小，可以先**作差**，化简后看差的正负。平方数不会是负数：$a^{2}\\geq0$，只有 $a=0$ 时取等号。',
      example: '$(a+1)^{2}-(a^{2}+2a)=1>0$，所以 $(a+1)^{2}>a^{2}+2a$；$x^{2}+4\\geq4$，$x=0$ 时等于 $4$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '15.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '用不等式表示“$x$ 的 $3$ 倍与 $5$ 的差不大于 $-2$”，正确的是（　　）',
      options: ['$3x-5<-2$', '$3x-5\\leq -2$', '$3(x-5)\\leq -2$', '$3x-5\\geq -2$'],
      answer: 1,
      explain: [
        '“$x$ 的 $3$ 倍与 $5$ 的差”是先算 $3x$，再减 $5$：$3x-5$，不是 $3(x-5)$。',
        '“不大于”就是“小于或等于”，用 $\\leq$。',
        '所以是 $3x-5\\leq-2$，选 B。常见错误：把“不大于”当成“小于”选 A；把“差的 $3$ 倍”和“$3$ 倍与 $5$ 的差”弄混选 C。',
      ],
    },
    {
      id: '15.1-b02',
      level: 'basic',
      type: 'choice',
      stem: '下列用不等式表示的关系：① “$a$ 不是正数”：$a<0$；② “$b$ 至多为 $3$”：$b\\leq3$；③ “$x$ 与 $y$ 的和不超过它们的积”：$x+y<xy$；④ “$c$ 不是负数”：$c\\geq0$。其中正确的有（　　）',
      options: ['$1$ 个', '$2$ 个', '$3$ 个', '$4$ 个'],
      answer: 1,
      explain: [
        '① “不是正数”包括负数和 $0$，应为 $a\\leq0$，错误。',
        '② “至多为 $3$”就是最大是 $3$，$b\\leq3$，正确。',
        '③ “不超过”包括等于，应为 $x+y\\leq xy$，错误。',
        '④ “不是负数”包括正数和 $0$，$c\\geq0$，正确。共 $2$ 个，选 B。坑在 $0$：“不是正数”“不是负数”都把 $0$ 包括在内。',
      ],
    },
    {
      id: '15.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '已知 $a>b$，用适当的不等号填空。',
      blanks: [
        { kind: 'text', label: '(1) $\\frac{a}{4}-2$ ○ $\\frac{b}{4}-2$', answer: '>', options: ['>', '<', '='] },
        { kind: 'text', label: '(2) $b-a$ ○ $0$', answer: '<', options: ['>', '<', '='] },
        { kind: 'text', label: '(3) $3-2a$ ○ $3-2b$', answer: '<', options: ['>', '<', '='] },
      ],
      explain: [
        '(1) 两边同除以正数 $4$，方向不变：$\\frac a4>\\frac b4$；再同减 $2$：$\\frac a4-2>\\frac b4-2$。',
        '(2) $a>b$ 两边同减 $a$：$0>b-a$，即 $b-a<0$。',
        '(3) 两边同乘 $-2$，方向改变：$-2a<-2b$；再同加 $3$：$3-2a<3-2b$。',
        '坑在第 (3) 问：前面有 $3$，容易忘了乘的是 $-2$。',
      ],
      verify: () => {
        const list = pairs151((a, b) => a.cmp(b) > 0);
        const sign = f => { const s = list.map(p => f(...p).cmp(0)); return s.every(x => x === s[0]) ? ['<', '=', '>'][s[0] + 1] : null; };
        return [sign((a, b) => a.div(4).sub(2).sub(b.div(4).sub(2))), sign((a, b) => b.sub(a)), sign((a, b) => F(3).sub(a.mul(2)).sub(F(3).sub(b.mul(2))))];
      },
    },
    {
      id: '15.1-b04',
      level: 'basic',
      type: 'choice',
      stem: '下列变形一定正确的是（　　）',
      options: ['由 $a>b$ 得 $ac>bc$', '由 $a>b$ 得 $ac^{2}>bc^{2}$', '由 $ac^{2}>bc^{2}$ 得 $a>b$', '由 $a>b$ 得 $-\\frac{a}{2}>-\\frac{b}{2}$'],
      answer: 2,
      explain: [
        'A：$c$ 的正负不知道，$c<0$ 时方向要改变，$c=0$ 时两边相等，不一定正确。',
        'B：$c^{2}\\geq0$，当 $c=0$ 时 $ac^{2}=bc^{2}=0$，不一定正确。',
        'C：$ac^{2}>bc^{2}$ 说明两边不相等，所以 $c\\neq0$，$c^{2}>0$。两边同除以正数 $c^{2}$，得 $a>b$，一定正确。',
        'D：两边同乘负数 $-\\frac12$，方向要改变，应为 $-\\frac a2<-\\frac b2$。选 C。坑在 B：$c^{2}$ 可能等于 $0$。',
      ],
      verify: () => {
        const tri = [];
        for (const [a, b] of pairs151(() => true)) for (const c of S151()) tri.push([a, b, c]);
        const ok = [
          tri.filter(([a, b]) => a.cmp(b) > 0).every(([a, b, c]) => a.mul(c).cmp(b.mul(c)) > 0),
          tri.filter(([a, b]) => a.cmp(b) > 0).every(([a, b, c]) => a.mul(c).mul(c).cmp(b.mul(c).mul(c)) > 0),
          tri.filter(([a, b, c]) => a.mul(c).mul(c).cmp(b.mul(c).mul(c)) > 0).every(([a, b]) => a.cmp(b) > 0),
          tri.filter(([a, b]) => a.cmp(b) > 0).every(([a, b]) => a.div(-2).cmp(b.div(-2)) > 0),
        ];
        return ok.indexOf(true) === ok.lastIndexOf(true) ? ok.indexOf(true) : -1;
      },
    },
    {
      id: '15.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '不等式 $(m-2)x>m-2$ 的两边同除以 $m-2$ 后，得到 $x<1$。则 $m$ 的取值范围是多少？',
      blanks: [
        { kind: 'ineq', var: 'm', label: '', answer: 'm<2' },
      ],
      explain: [
        '原来是“$>$”，除以 $m-2$ 后变成了“$<$”，方向改变了，说明除的是负数（性质 5）。',
        '所以 $m-2<0$，两边同加 $2$，得 $m<2$。',
        '坑：$m-2$ 不能为 $0$（除数不能为 $0$），所以不能写成 $m\\leq2$。',
      ],
      verify: () => {
        // m 取样本值，看除以 m−2 后方向是否改变（m−2<0），收集满足的 m，确认恰好是小于 2 的那些
        const good = S151().filter(m => !m.sub(2).isZero() && m.sub(2).cmp(0) < 0);
        return good.every(m => m.cmp(2) < 0) && S151().filter(m => m.cmp(2) < 0).length === good.length ? 'm<2' : null;
      },
    },
    {
      id: '15.1-b06',
      level: 'basic',
      type: 'choice',
      stem: '若 $a<b<0$，则下列不等式成立的是（　　）',
      options: ['$a^{2}<b^{2}$', '$ab<b^{2}$', '$\\frac{1}{a}<\\frac{1}{b}$', '$\\frac{a}{b}>1$'],
      answer: 3,
      explain: [
        '取 $a=-3$，$b=-1$ 检验：$a^{2}=9>1=b^{2}$，A 错；$ab=3>1=b^{2}$，B 错；$\\frac1a=-\\frac13>-1=\\frac1b$，C 错。',
        '用性质说明 D：$a<b$ 两边同除以负数 $b$，方向改变，$\\frac ab>\\frac bb=1$，D 正确。',
        '也可以说明 B 为什么错：$a<b$ 两边同乘负数 $b$，得 $ab>b^{2}$。选 D。坑在“乘或除以负数要变号”，负数越往左绝对值越大。',
      ],
      verify: () => {
        const list = pairs151((a, b) => a.cmp(b) < 0 && b.cmp(0) < 0);
        const ok = [
          always151(list, (a, b) => a.mul(a).cmp(b.mul(b)) < 0),
          always151(list, (a, b) => a.mul(b).cmp(b.mul(b)) < 0),
          always151(list, (a, b) => F(1).div(a).cmp(F(1).div(b)) < 0),
          always151(list, (a, b) => a.div(b).cmp(1) > 0),
        ];
        return ok.indexOf(true) === ok.lastIndexOf(true) ? ok.indexOf(true) : -1;
      },
    },
    {
      id: '15.1-b07',
      level: 'basic',
      type: 'choice',
      stem: '若 $a>b$，$c>d$，则下列不等式一定成立的是（　　）',
      options: ['$a-c>b-d$', '$ac>bd$', '$a+c>b+d$', '$a+d>b+c$'],
      answer: 2,
      explain: [
        'C：$a>b$ 两边同加 $c$，得 $a+c>b+c$；$c>d$ 两边同加 $b$，得 $b+c>b+d$。由传递性，$a+c>b+d$，一定成立。',
        'A：取 $a=2$，$b=1$，$c=5$，$d=0$，$a-c=-3$，$b-d=1$，不成立。“同向不等式相减”不对。',
        'B：取 $a=1$，$b=-3$，$c=0$，$d=-2$，$ac=0$，$bd=6$，不成立。D：仍取 A 中的数，$a+d=2$，$b+c=6$，不成立。选 C。',
      ],
      verify: () => {
        const quad = [];
        for (const [a, b] of pairs151((x, y) => x.cmp(y) > 0)) for (const [c, d] of pairs151((x, y) => x.cmp(y) > 0)) quad.push([a, b, c, d]);
        const ok = [
          quad.every(([a, b, c, d]) => a.sub(c).cmp(b.sub(d)) > 0),
          quad.every(([a, b, c, d]) => a.mul(c).cmp(b.mul(d)) > 0),
          quad.every(([a, b, c, d]) => a.add(c).cmp(b.add(d)) > 0),
          quad.every(([a, b, c, d]) => a.add(d).cmp(b.add(c)) > 0),
        ];
        return ok.indexOf(true) === ok.lastIndexOf(true) ? ok.indexOf(true) : -1;
      },
    },
    {
      id: '15.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '设 $M=(x+1)(x-4)$，$N=(x-2)(x-1)$。比较 $M$ 与 $N$ 的大小。',
      blanks: [
        { kind: 'text', label: '$M$ ○ $N$', answer: '<', options: ['>', '<', '=', '不能确定'] },
      ],
      explain: [
        '作差：$M=x^{2}-3x-4$，$N=x^{2}-3x+2$。',
        '$M-N=(x^{2}-3x-4)-(x^{2}-3x+2)=-6<0$。',
        '所以不论 $x$ 取什么数，都有 $M<N$。坑：看到含 $x$ 就以为“不能确定”，其实差是常数。',
      ],
      verify: () => {
        const s = S151().map(x => x.add(1).mul(x.sub(4)).cmp(x.sub(2).mul(x.sub(1))));
        return s.every(v => v < 0) ? '<' : s.every(v => v > 0) ? '>' : '不能确定';
      },
    },
    {
      id: '15.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '若 $|a-3|=3-a$，则 $a$ 的取值范围是多少？',
      blanks: [
        { kind: 'ineq', var: 'a', label: '', answer: 'a<=3' },
      ],
      explain: [
        '一个数的绝对值等于它的相反数，这个数是负数或 $0$。$|a-3|=-(a-3)$，所以 $a-3\\leq0$。',
        '两边同加 $3$（移项），得 $a\\leq3$。',
        '坑：$a=3$ 时 $|a-3|=0=3-a$ 也成立，不要漏掉等号写成 $a<3$。',
      ],
      verify: () => {
        const ok = S151().filter(a => a.sub(3).abs().eq(F(3).sub(a)));
        return ok.every(a => a.cmp(3) <= 0) && ok.some(a => a.eq(3)) && ok.length === S151().filter(a => a.cmp(3) <= 0).length ? 'a<=3' : null;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '15.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '根据条件填空：(1) 若 $ac>bc$，且 $a<b$，判断 $c$ 与 $0$ 的大小；(2) 若 $(|m|+1)a>(|m|+1)b$，判断 $a$ 与 $b$ 的大小；(3) 若 $a<b$，且 $(c-2)^{2}a\\geq(c-2)^{2}b$，求 $c$ 的值。',
      blanks: [
        { kind: 'text', label: '(1) $c$ ○ $0$', answer: '<', options: ['>', '<', '=', '不能确定'] },
        { kind: 'text', label: '(2) $a$ ○ $b$', answer: '>', options: ['>', '<', '=', '不能确定'] },
        { kind: 'num', label: '(3) $c=$', answer: '2' },
      ],
      explain: [
        '(1) 由性质 1，$a<b$ 时 $c$ 只有三种可能：$c>0$ 时 $ac<bc$；$c=0$ 时 $ac=bc$；$c<0$ 时方向改变，$ac>bc$。和条件相符的只有 $c<0$。',
        '(2) 不论 $m$ 是什么数，$|m|\\geq0$，$|m|+1\\geq1>0$。两边同除以正数 $|m|+1$，方向不变，$a>b$。',
        '(3) $(c-2)^{2}\\geq0$。如果 $(c-2)^{2}>0$，由 $a<b$ 两边同乘这个正数得 $(c-2)^{2}a<(c-2)^{2}b$，和条件“$\\geq$”矛盾。',
        '所以只能 $(c-2)^{2}=0$，此时两边都是 $0$，“$\\geq$”成立，$c=2$。思路：把每种可能都试一遍，用性质 1“有且只有一种成立”排除掉不符合的。',
      ],
      verify: () => {
        const list = pairs151((a, b) => a.cmp(b) < 0);
        const c1 = S151().filter(c => list.every(([a, b]) => a.mul(c).cmp(b.mul(c)) > 0));
        const r1 = c1.length && c1.every(c => c.cmp(0) < 0) ? '<' : null;
        const r2 = pairs151((a, b) => a.cmp(b) !== 0).every(([a, b]) => S151().every(m => (a.mul(m.abs().add(1)).cmp(b.mul(m.abs().add(1))) > 0) === (a.cmp(b) > 0))) ? '>' : null;
        const cs = [];
        for (let k = -20; k <= 20; k++) {
          const c = F(k).div(4);
          if (list.every(([a, b]) => c.sub(2).mul(c.sub(2)).mul(a).cmp(c.sub(2).mul(c.sub(2)).mul(b)) >= 0)) cs.push(c);
        }
        return [r1, r2, cs.length === 1 ? cs[0] : null];
      },
    },
    {
      id: '15.1-e02',
      level: 'extended',
      type: 'choice',
      stem: '已知 $a>0$，$b<0$，且 $a+b<0$。把 $a$、$b$、$-a$、$-b$ 按从小到大的顺序排列，正确的是（　　）',
      options: ['$-a<b<a<-b$', '$b<-a<-b<a$', '$b<-a<a<-b$', '$-b<-a<a<b$'],
      answer: 2,
      explain: [
        '先比较 $b$ 与 $-a$：$a+b<0$ 两边同减 $a$，得 $b<-a$。',
        '再比较 $a$ 与 $-b$：$a+b<0$ 两边同减 $b$，得 $a<-b$。',
        '又 $a>0$，所以 $-a<0<a$。由传递性连起来：$b<-a<a<-b$，选 C。',
        '也可以在数轴上看：$a+b<0$ 说明负数 $b$ 离原点更远，$|b|>|a|$。常见错误：只记得“负数小于正数”，把 $-a$ 和 $b$ 的顺序弄反，选 A。',
      ],
      verify: () => {
        const list = pairs151((a, b) => a.cmp(0) > 0 && b.cmp(0) < 0 && a.add(b).cmp(0) < 0);
        const orders = [
          (a, b) => [a.neg(), b, a, b.neg()],
          (a, b) => [b, a.neg(), b.neg(), a],
          (a, b) => [b, a.neg(), a, b.neg()],
          (a, b) => [b.neg(), a.neg(), a, b],
        ];
        const inc = xs => xs.every((x, i) => i === 0 || xs[i - 1].cmp(x) < 0);
        const ok = orders.map(f => list.length > 0 && list.every(([a, b]) => inc(f(a, b))));
        return ok.indexOf(true) === ok.lastIndexOf(true) ? ok.indexOf(true) : -1;
      },
    },
    {
      id: '15.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '已知 $1<a<3$，$-2<b<1$，求 $2a-3b$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '', answer: '-1', suffix: '$<2a-3b<$' },
        { kind: 'num', label: '', answer: '12' },
      ],
      explain: [
        '由 $1<a<3$，两边同乘正数 $2$：$2<2a<6$。',
        '由 $-2<b<1$，两边同乘负数 $-3$，方向改变：$6>-3b>-3$，即 $-3<-3b<6$。',
        '同向不等式相加（$2a$ 与 $-3b$ 各取各的范围，互不影响）：$2+(-3)<2a-3b<6+6$，即 $-1<2a-3b<12$。',
        '常见错误：直接用“$a$ 的范围减 $b$ 的范围”，算成 $2\\times1-3\\times(-2)=8$ 到 $2\\times3-3\\times1=3$，上下界都错。正确做法是先把 $-3b$ 的范围求出来，再相加。',
      ],
      verify: () => {
        // 2a−3b 随 a 增大而增大、随 b 增大而减小，上下界在范围的角上（取不到）；再用网格确认内部的值都严格在两界之间
        const f = (a, b) => F(a).mul(2).sub(F(b).mul(3));
        const vals = [[1, -2], [1, 1], [3, -2], [3, 1]].map(([a, b]) => f(a, b));
        const lo = vals.reduce((x, y) => (y.cmp(x) < 0 ? y : x)), hi = vals.reduce((x, y) => (y.cmp(x) > 0 ? y : x));
        for (let i = 1; i < 40; i++) for (let j = 1; j < 60; j++) {
          const v = f(F(1).add(F(i).div(20)), F(-2).add(F(j).div(20)));
          if (v.cmp(lo) <= 0 || v.cmp(hi) >= 0) return null;
        }
        return [lo, hi];
      },
    },
    {
      id: '15.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '设 $P=\\frac{x+1}{x+2}$，$Q=\\frac{x+3}{x+4}$。(1) 当 $x>-2$ 时，比较 $P$ 与 $Q$ 的大小；(2) 当 $-4<x<-2$ 时，比较 $P$ 与 $Q$ 的大小。',
      blanks: [
        { kind: 'text', label: '(1) $P$ ○ $Q$', answer: '<', options: ['>', '<', '=', '不能确定'] },
        { kind: 'text', label: '(2) $P$ ○ $Q$', answer: '>', options: ['>', '<', '=', '不能确定'] },
      ],
      explain: [
        '作差并通分：$P-Q=\\frac{(x+1)(x+4)-(x+3)(x+2)}{(x+2)(x+4)}=\\frac{(x^{2}+5x+4)-(x^{2}+5x+6)}{(x+2)(x+4)}=\\frac{-2}{(x+2)(x+4)}$。',
        '分子是负数，所以 $P-Q$ 的正负和分母 $(x+2)(x+4)$ 的正负**相反**。',
        '(1) $x>-2$ 时，$x+2>0$，$x+4>2>0$，分母为正，$P-Q<0$，$P<Q$。',
        '(2) $-4<x<-2$ 时，$x+2<0$，$x+4>0$，分母为负，$P-Q>0$，$P>Q$。',
        '转弯在第 (2) 问：只看“分子都比分母小”会以为总是 $P<Q$，其实分母为负时结论反过来。',
      ],
      verify: () => {
        const cmp = x => x.add(1).div(x.add(2)).cmp(x.add(3).div(x.add(4)));
        const xs1 = [F(-19).div(10), F(0), F(1).div(3), F(7), F(-1)];
        const xs2 = [F(-39).div(10), F(-3), F(-5).div(2), F(-21).div(10), F(-7).div(2)];
        const tag = xs => { const s = xs.map(cmp); return s.every(v => v < 0) ? '<' : s.every(v => v > 0) ? '>' : '不能确定'; };
        return [tag(xs1), tag(xs2)];
      },
    },
    {
      id: '15.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '代数式 $a^{2}+2b^{2}-2ab-4b+5$ 的最小值是多少？取到最小值时 $a$、$b$ 各是多少？',
      blanks: [
        { kind: 'num', label: '最小值', answer: '1' },
        { kind: 'num', label: '$a=$', answer: '2' },
        { kind: 'num', label: '$b=$', answer: '2' },
      ],
      explain: [
        '有交叉项 $-2ab$，不能对 $a$、$b$ 分别配方。先把 $2b^{2}$ 拆成 $b^{2}+b^{2}$，让含 $a$ 的项凑成完全平方：$a^{2}-2ab+b^{2}=(a-b)^{2}$。',
        '剩下 $b^{2}-4b+5=(b-2)^{2}+1$。所以原式 $=(a-b)^{2}+(b-2)^{2}+1$。',
        '$(a-b)^{2}\\geq0$，$(b-2)^{2}\\geq0$，所以原式 $\\geq1$。',
        '两个平方同时为 $0$：$b-2=0$ 且 $a-b=0$，即 $b=2$，$a=2$，这时原式等于 $1$。最小值是 $1$。',
        '转弯：要先看出“$2b^{2}$ 拆开，一份和 $a$ 配，一份自己配”；还要检查两个平方能不能**同时**取 $0$，能同时取到才是最小值。',
      ],
      verify: () => {
        let best = null;
        for (let i = -40; i <= 40; i++) for (let j = -40; j <= 40; j++) {
          const a = F(i).div(4), b = F(j).div(4);
          const v = a.mul(a).add(b.mul(b).mul(2)).sub(a.mul(b).mul(2)).sub(b.mul(4)).add(5);
          if (!best || v.cmp(best[0]) < 0) best = [v, a, b];
        }
        return best;
      },
    },
    {
      id: '15.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a>b>c$，且 $a+b+c=0$。求 $\\frac{c}{a}$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '', answer: '-2', suffix: '$<\\frac{c}{a}<$' },
        { kind: 'num', label: '', answer: '-1/2' },
      ],
      explain: [
        '先定符号：三个数的和为 $0$ 且不全相等，最大的 $a>0$，最小的 $c<0$（否则三个数都 $\\geq0$ 或都 $\\leq0$，和为 $0$ 只能全是 $0$）。',
        '用 $b=-a-c$ 消去 $b$。由 $a>b$：$a>-a-c$，移项得 $2a>-c$。两边同除以正数 $a$：$2>-\\frac ca$，即 $\\frac ca>-2$。',
        '由 $b>c$：$-a-c>c$，移项得 $-a>2c$。两边同除以正数 $a$：$-1>\\frac{2c}{a}$；再同除以 $2$：$\\frac ca<-\\frac12$。',
        '所以 $-2<\\frac ca<-\\frac12$。转弯：要先判断 $a$ 是正数，才能放心地两边同除以 $a$ 而不变号。',
      ],
      verify: () => {
        // 在 a=1 时（c/a 与 a 的大小无关，可以令 a=1）枚举 c，看 b=−1−c 是否满足 a>b>c
        const ok = [];
        for (let k = -400; k <= 400; k++) {
          const c = F(k).div(100), b = F(-1).sub(c);
          if (F(1).cmp(b) > 0 && b.cmp(c) > 0) ok.push(c);
        }
        // 可取的 c 是开区间里的格点，端点向外补一个步长
        return [ok[0].sub(F(1).div(100)), ok[ok.length - 1].add(F(1).div(100))];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '15.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $1\\leq a+b\\leq4$，$-1\\leq a-b\\leq2$。(1) 求 $4a-2b$ 的取值范围；(2) 求 $a^{2}-b^{2}$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '-2', suffix: '$\\leq4a-2b\\leq$' },
        { kind: 'num', label: '', answer: '10' },
        { kind: 'num', label: '(2)', answer: '-4', suffix: '$\\leq a^{2}-b^{2}\\leq$' },
        { kind: 'num', label: '', answer: '8' },
      ],
      explain: [
        '思路：先求出 $a$、$b$ 各自的范围再代入会出错——$a$、$b$ 不能各自独立地取到端点。应当把要求的式子**直接用 $a+b$ 和 $a-b$ 表示**。记 $s=a+b$，$t=a-b$，则 $1\\leq s\\leq4$，$-1\\leq t\\leq2$，而且 $s$、$t$ 可以各自独立取值（由 $s$、$t$ 能反解出 $a=\\frac{s+t}{2}$，$b=\\frac{s-t}{2}$）。',
        '(1) 设 $4a-2b=m(a+b)+n(a-b)$，比较系数：$m+n=4$，$m-n=-2$，得 $m=1$，$n=3$，即 $4a-2b=s+3t$。$-3\\leq3t\\leq6$，与 $1\\leq s\\leq4$ 相加：$-2\\leq4a-2b\\leq10$。（错误做法先求 $0\\leq a\\leq3$、$-\\frac12\\leq b\\leq\\frac52$，会算成 $-5$ 到 $14$。）',
        '(2) $a^{2}-b^{2}=(a+b)(a-b)=st$，是两个范围相乘。乘法不能像加法那样直接把上下界相乘，要按 $t$ 的正负分类，因为 $s$ 总是正数：',
        '当 $0\\leq t\\leq2$ 时：两边同乘正数 $s$，$0\\leq st\\leq2s$；又 $2s\\leq8$，所以 $0\\leq st\\leq8$，$s=4$、$t=2$ 时取到 $8$。',
        '当 $-1\\leq t<0$ 时：$st<0$；由 $t\\geq-1$ 两边同乘正数 $s$，得 $st\\geq-s$，又 $-s\\geq-4$，所以 $-4\\leq st<0$，$s=4$、$t=-1$ 时取到 $-4$。',
        '合起来 $-4\\leq a^{2}-b^{2}\\leq8$。取到端点时：$a=3$，$b=1$ 得 $8$；$a=\\frac32$，$b=\\frac52$ 得 $-4$。注意最小值不是“下界乘下界”$1\\times(-1)=-1$，而是让正的 $s$ 尽量大去乘负的 $t$。',
      ],
      verify: () => {
        let lo1 = null, hi1 = null, lo2 = null, hi2 = null;
        for (let i = -40; i <= 40; i++) for (let j = -40; j <= 40; j++) {
          const a = F(i).div(8), b = F(j).div(8);
          const s = a.add(b), d = a.sub(b);
          if (s.cmp(1) < 0 || s.cmp(4) > 0 || d.cmp(-1) < 0 || d.cmp(2) > 0) continue;
          const v = a.mul(4).sub(b.mul(2)), w = a.mul(a).sub(b.mul(b));
          if (!lo1 || v.cmp(lo1) < 0) lo1 = v;
          if (!hi1 || v.cmp(hi1) > 0) hi1 = v;
          if (!lo2 || w.cmp(lo2) < 0) lo2 = w;
          if (!hi2 || w.cmp(hi2) > 0) hi2 = w;
        }
        return [lo1, hi1, lo2, hi2];
      },
    },
    {
      id: '15.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '甲、乙、丙三人同时去买两次同一种水果，两次的单价分别为 $p$ 元/千克和 $q$ 元/千克（$p>0$，$q>0$，$p\\neq q$）。甲每次买 $1$ 千克；乙每次花 $12$ 元；丙第一次花 $q$ 元，第二次花 $p$ 元。用含 $p$、$q$ 的式子表示乙、丙两次购买的平均单价（总钱数 ÷ 总千克数），并把三人的平均单价从低到高排列。',
      blanks: [
        { kind: 'frac', label: '乙的平均单价', answer: '2pq/(p+q)', vars: ['p', 'q'] },
        { kind: 'frac', label: '丙的平均单价', answer: 'pq(p+q)/(p^2+q^2)', vars: ['p', 'q'] },
        { kind: 'text', label: '从低到高', answer: '丙、乙、甲', options: ['甲、乙、丙', '乙、丙、甲', '丙、乙、甲', '不能确定'] },
      ],
      explain: [
        '甲：花 $(p+q)$ 元买 $2$ 千克，平均单价 $\\frac{p+q}{2}$。',
        '乙：花 $24$ 元，买了 $\\frac{12}{p}+\\frac{12}{q}=\\frac{12(p+q)}{pq}$ 千克，平均单价 $\\frac{24pq}{12(p+q)}=\\frac{2pq}{p+q}$。',
        '丙：花 $(p+q)$ 元，买了 $\\frac qp+\\frac pq=\\frac{p^{2}+q^{2}}{pq}$ 千克，平均单价 $\\frac{pq(p+q)}{p^{2}+q^{2}}$。',
        '甲与乙作差：$\\frac{p+q}{2}-\\frac{2pq}{p+q}=\\frac{(p+q)^{2}-4pq}{2(p+q)}=\\frac{(p-q)^{2}}{2(p+q)}>0$，所以乙低于甲。',
        '乙与丙作差：$\\frac{2pq}{p+q}-\\frac{pq(p+q)}{p^{2}+q^{2}}=\\frac{pq\\left[2(p^{2}+q^{2})-(p+q)^{2}\\right]}{(p+q)(p^{2}+q^{2})}=\\frac{pq(p-q)^{2}}{(p+q)(p^{2}+q^{2})}>0$，所以丙低于乙。',
        '从低到高：丙、乙、甲。想法：两次作差，分子都整理成 $(p-q)^{2}$ 的倍数。直观上，乙便宜时和贵时花一样多的钱，已经在便宜时多买；丙更进一步，单价低的那次花的钱反而多，所以最划算。',
      ],
      verify: () => {
        const ps = [[F(6), F(4)], [F(3), F(5)], [F(1).div(2), F(7)], [F(10), F(9)]];
        const ok = ps.every(([p, q]) => {
          const jia = p.add(q).div(2);
          const yi = F(24).div(F(12).div(p).add(F(12).div(q)));
          const bing = p.add(q).div(q.div(p).add(p.div(q)));
          return yi.eq(p.mul(q).mul(2).div(p.add(q))) && bing.eq(p.mul(q).mul(p.add(q)).div(p.mul(p).add(q.mul(q)))) && bing.cmp(yi) < 0 && yi.cmp(jia) < 0;
        });
        return ok ? ['2pq/(p+q)', 'pq(p+q)/(p^2+q^2)', '丙、乙、甲'] : null;
      },
    },
    {
      id: '15.1-c03',
      level: 'challenge',
      type: 'multi',
      stem: '已知 $a\\neq b$。下列判断中，正确的有（　　）',
      options: [
        '若 $a+b>0$，则 $a^{3}+b^{3}>a^{2}b+ab^{2}$',
        '若 $a<0$，$b<0$，则 $a^{3}+b^{3}>a^{2}b+ab^{2}$',
        '对任意数 $c$，都有 $a^{2}+b^{2}+c^{2}>ab+bc+ca$',
        '若 $ab<0$，则 $a^{2}+b^{2}>-2ab$',
      ],
      answer: [0, 2],
      explain: [
        '思路：每个判断都作差，再化成平方或因式的积，看正负。',
        'A、B：$a^{3}+b^{3}-a^{2}b-ab^{2}=a^{2}(a-b)-b^{2}(a-b)=(a-b)(a^{2}-b^{2})=(a-b)^{2}(a+b)$。$a\\neq b$，$(a-b)^{2}>0$，所以差的正负和 $a+b$ 相同。A：$a+b>0$，正确。B：两个负数的和 $a+b<0$，差为负，错误。',
        'C：差的 $2$ 倍为 $2a^{2}+2b^{2}+2c^{2}-2ab-2bc-2ca=(a-b)^{2}+(b-c)^{2}+(c-a)^{2}$。三个平方都 $\\geq0$，而 $a\\neq b$ 使 $(a-b)^{2}>0$，所以和为正，差也为正，正确。',
        'D：$a^{2}+b^{2}-(-2ab)=(a+b)^{2}\\geq0$，当 $a=-b$ 时等于 $0$。$a=1$，$b=-1$ 满足 $ab<0$ 和 $a\\neq b$，此时 $a^{2}+b^{2}=2=-2ab$，不满足“$>$”，错误。选 A、C。',
        '坑：D 里 $ab<0$ 只保证异号，挡不住 $a=-b$；C 的关键是乘 $2$ 后把每一项拆成两份，配成三个完全平方，而且要说明它们不会同时为 $0$。',
      ],
      verify: () => {
        const list = pairs151((a, b) => !a.eq(b));
        const cube = (a, b) => a.pow(3).add(b.pow(3)).cmp(a.mul(a).mul(b).add(a.mul(b).mul(b))) > 0;
        const ok = [
          always151(list.filter(([a, b]) => a.add(b).cmp(0) > 0), cube),
          always151(list.filter(([a, b]) => a.cmp(0) < 0 && b.cmp(0) < 0), cube),
          always151(list, (a, b) => S151().every(c => a.mul(a).add(b.mul(b)).add(c.mul(c)).cmp(a.mul(b).add(b.mul(c)).add(c.mul(a))) > 0)),
          always151(list.filter(([a, b]) => a.mul(b).cmp(0) < 0), (a, b) => a.mul(a).add(b.mul(b)).cmp(a.mul(b).mul(-2)) > 0),
        ];
        return ok.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '15.1-c04',
      level: 'challenge',
      type: 'multi',
      stem: '甲、乙、丙、丁四人玩跷跷板（体重都是正数）。甲、乙坐一边，丙、丁坐另一边，恰好平衡；甲、丁坐一边，乙、丙坐另一边，甲、丁这边翘起（较轻）；乙一个人比甲、丙两人加起来还重。根据这些信息，下列结论一定成立的有（　　）',
      options: ['甲比丙轻', '乙比丁重', '丁比丙重', '丁比甲重', '乙是四人中最重的'],
      answer: [0, 1, 3, 4],
      explain: [
        '把体重记为 $a$（甲）、$b$（乙）、$c$（丙）、$d$（丁），条件是：① $a+b=c+d$；② $a+d<b+c$；③ $b>a+c$。',
        'A：① 与 ② 相加（等式两边加上不等式两边，方向不变）：$2a+b+d<b+2c+d$，两边同减 $b+d$ 再除以 $2$，得 $a<c$，成立。',
        'B：由 ① 得 $b-d=c-a$，而 $a<c$，所以 $b-d>0$，$b>d$，成立。',
        'D：由 ① 得 $d=a+b-c$，由 ③ 得 $b>a+c$，所以 $d>a+(a+c)-c=2a>a$，成立。',
        'E：由 ③，$b>a+c$，而 $a>0$、$c>0$，所以 $b>c$、$b>a$；再由 B，$b>d$。乙最重，成立。',
        'C：举例检验。$a=1$，$b=4$，$c=2$，$d=3$ 满足三个条件，丁比丙重；$a=1$，$b=7$，$c=5$，$d=3$ 也满足三个条件（$8=8$，$4<12$，$7>6$），丁却比丙轻。所以 C 不一定成立。选 A、B、D、E。',
        '思路：能推出来的，要用“相等关系代入”或“不等式同向相加”一步步推；推不出来的，要找两组都满足条件、结论却相反的例子，说明“不能确定”。',
      ],
      verify: () => {
        const claims = [(a, b, c, d) => a < c, (a, b, c, d) => b > d, (a, b, c, d) => d > c, (a, b, c, d) => d > a, (a, b, c, d) => b > a && b > c && b > d];
        const all = claims.map(() => true);
        let n = 0;
        for (let a = 1; a <= 15; a++) for (let b = 1; b <= 15; b++) for (let c = 1; c <= 15; c++) for (let d = 1; d <= 15; d++) {
          if (a + b !== c + d || !(a + d < b + c) || !(b > a + c)) continue;
          n++;
          claims.forEach((f, i) => { if (!f(a, b, c, d)) all[i] = false; });
        }
        return n ? all.map((x, i) => (x ? i : -1)).filter(i => i >= 0) : null;
      },
    },
    {
      id: '15.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 把 $2^{100}$、$3^{75}$、$5^{50}$ 按从小到大排列；(2) 比较 $31^{11}$ 与 $17^{14}$ 的大小。',
      blanks: [
        { kind: 'text', label: '(1) 从小到大', answer: '2¹⁰⁰、5⁵⁰、3⁷⁵', options: ['2¹⁰⁰、3⁷⁵、5⁵⁰', '2¹⁰⁰、5⁵⁰、3⁷⁵', '5⁵⁰、2¹⁰⁰、3⁷⁵', '3⁷⁵、5⁵⁰、2¹⁰⁰'] },
        { kind: 'text', label: '(2) $31^{11}$ ○ $17^{14}$', answer: '<', options: ['>', '<', '='] },
      ],
      explain: [
        '先用不等式的性质说明一个事实：若 $x>y>0$，则 $x^{n}>y^{n}$。例如 $n=2$：$x>y$ 两边同乘正数 $x$ 得 $x^{2}>xy$，同乘正数 $y$ 得 $xy>y^{2}$，由传递性 $x^{2}>y^{2}$；指数更大时一次次这样推下去。',
        '(1) 三个指数 $100$、$75$、$50$ 的最大公因数是 $25$，化成同指数：$2^{100}=(2^{4})^{25}=16^{25}$，$3^{75}=(3^{3})^{25}=27^{25}$，$5^{50}=(5^{2})^{25}=25^{25}$。$16<25<27$，所以 $2^{100}<5^{50}<3^{75}$。',
        '(2) 底数、指数都不同，又凑不成同指数（$11$ 与 $14$ 互素），要找**中间数**搭桥。$31$ 接近 $32=2^{5}$，$17$ 接近 $16=2^{4}$。',
        '放大小的一边：$31^{11}<32^{11}=2^{55}$；缩小大的一边：$17^{14}>16^{14}=2^{56}$。',
        '由传递性：$31^{11}<2^{55}<2^{56}<17^{14}$，所以 $31^{11}<17^{14}$。关键：一边放大、一边缩小，变成同底数的幂再比较，中间要用两次传递性把三段连起来。',
      ],
      verify: () => {
        const c = (x, y) => (x > y ? '>' : x < y ? '<' : '=');
        const v = { '2¹⁰⁰': 2n ** 100n, '3⁷⁵': 3n ** 75n, '5⁵⁰': 5n ** 50n };
        const order = Object.keys(v).sort((x, y) => (v[x] < v[y] ? -1 : 1)).join('、');
        return [order, c(31n ** 11n, 17n ** 14n)];
      },
    },
  ],
});
