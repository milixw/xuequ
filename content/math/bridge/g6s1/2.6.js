'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 2.6 分数的除法
// 知识范围：倒数、分数除以整数、除以分数（乘它的倒数）、带分数除法、
//           已知一个数的几分之几是多少求这个数、比多比少的分率问题、工作效率（工程问题）；可以使用第 1 章和 2.1～2.5
// 还没学：分数与小数互化（2.7）、负数
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/2.6',
  title: '分数的除法',
  review: { status: 'pending' },

  intro: [
    {
      title: '倒数',
      body: '乘积是 1 的两个数互为**倒数**。$\\frac{a}{b}$ 的倒数是 $\\frac{b}{a}$（$a$、$b$ 都不为 0）。**0 没有倒数**，1 的倒数是 1。带分数要先化成假分数再求倒数。',
      example: '$2\\frac{1}{3}=\\frac{7}{3}$，它的倒数是 $\\frac{3}{7}$。',
    },
    {
      title: '分数除法',
      body: '**除以一个不为 0 的数，等于乘这个数的倒数**。分数除以整数，就是乘这个整数的倒数。',
      example: '$\\frac{5}{6}\\div\\frac{10}{9}=\\frac{5}{6}\\times\\frac{9}{10}=\\frac{3}{4}$。',
      pitfall: '只把除数变成倒数，被除数不变。',
    },
    {
      title: '已知几分之几，求这个数',
      body: '已知一个数的几分之几是多少，求这个数，用**除法**：这个数 = 部分量 ÷ 对应的分率。关键是找准单位"1"，再找和数量对应的分率。',
      example: '一个数的 $\\frac{3}{5}$ 是 24，这个数是 $24\\div\\frac{3}{5}=40$。',
    },
    {
      title: '比多比少',
      body: '"甲比乙多 $\\frac{1}{4}$"，是以乙为单位"1"，甲是乙的 $1+\\frac{1}{4}=\\frac{5}{4}$；"甲比乙少 $\\frac{1}{4}$"，甲是乙的 $\\frac{3}{4}$。已知甲求乙，用除法。',
      example: '甲是 50，比乙多 $\\frac{1}{4}$，乙是 $50\\div\\frac{5}{4}=40$。',
      pitfall: '"比"字后面的量是单位"1"。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.6-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，正确的有几个？（ ）<br>① 任何数都有倒数；<br>② 真分数的倒数都是假分数；<br>③ 假分数的倒数都是真分数；<br>④ $2\\frac{3}{5}$ 的倒数是 $2\\frac{5}{3}$；<br>⑤ 一个数的倒数不一定比这个数小。',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 1,
      explain: [
        '① 错：0 没有倒数。',
        '② 对：真分数分子比分母小，倒过来分子比分母大，是假分数。',
        '③ 错：分子等于分母的假分数（如 $\\frac{5}{5}$）倒过来还是假分数。',
        '④ 错：要先化成假分数 $\\frac{13}{5}$，倒数是 $\\frac{5}{13}$。',
        '⑤ 对：例如 $\\frac{1}{2}$ 的倒数是 2，比它大。正确的是 ②⑤，共 2 个。选 B。',
      ],
      verify: () => {
        const facts = [
          false /* 0 没有倒数 */,
          [[1, 2], [3, 7], [5, 9]].every(([a, b]) => b > a),
          [[5, 5], [7, 3]].every(([a, b]) => b < a),
          F(5).div(13).eq(F(2).add(F(5).div(3))),
          F(1).div(2).cmp(F(2)) < 0,
        ];
        return facts.filter(Boolean).length - 1;
      },
    },
    {
      id: '2.6-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{5}{8}\\div\\frac{15}{16}\\times\\frac{3}{4}$',
      blanks: [{ kind: 'num', answer: '1/2' }],
      explain: [
        '只有乘除，从左往右；除法变成乘倒数：$\\frac{5}{8}\\times\\frac{16}{15}\\times\\frac{3}{4}$。',
        '约分：5 和 15 约成 1 和 3，16 和 8 约成 2 和 1，3 和 3 约去：$\\frac{1\\times 2\\times 1}{1\\times 1\\times 4}=\\frac{1}{2}$。',
        '易错：先算 $\\frac{15}{16}\\times\\frac{3}{4}$ 再去除，改变了运算顺序。',
      ],
      verify: () => F(5).div(8).div(F(15).div(16)).mul(F(3).div(4)),
    },
    {
      id: '2.6-b03',
      level: 'basic',
      type: 'fill',
      stem: '填空：',
      blanks: [
        { kind: 'num', label: '(1) 60 比几多 $\\frac{1}{4}$', answer: '48' },
        { kind: 'num', label: '(2) 60 比几少 $\\frac{1}{4}$', answer: '80' },
      ],
      explain: [
        '"60 比 □ 多 $\\frac{1}{4}$"，□ 是单位"1"，60 是它的 $\\frac{5}{4}$，□ $=60\\div\\frac{5}{4}=48$。',
        '"60 比 □ 少 $\\frac{1}{4}$"，60 是 □ 的 $\\frac{3}{4}$，□ $=60\\div\\frac{3}{4}=80$。',
        '易错：用 $60\\times\\frac{5}{4}=75$ 或 $60\\times\\frac{3}{4}=45$，把 60 当成了单位"1"。',
      ],
      verify: () => [F(60).div(F(5).div(4)), F(60).div(F(3).div(4))],
    },
    {
      id: '2.6-b04',
      level: 'basic',
      type: 'multi',
      stem: '下面的问题中，能用 $\\frac{2}{3}\\div\\frac{4}{5}$ 解答的有（多选）',
      options: [
        '$\\frac{2}{3}$ 米长的彩带是 $\\frac{4}{5}$ 米长的彩带的几分之几',
        '一桶油装了 $\\frac{2}{3}$ 千克，正好装了桶容量的 $\\frac{4}{5}$，这个桶能装多少千克',
        '王叔叔 $\\frac{4}{5}$ 小时走了 $\\frac{2}{3}$ 千米，他 1 小时走多少千米',
        '小英有 $\\frac{2}{3}$ 元，花去了其中的 $\\frac{4}{5}$，花了多少元',
      ],
      answer: [0, 1, 2],
      explain: [
        'A：求一个数是另一个数的几分之几，用除法，$\\frac{2}{3}\\div\\frac{4}{5}$。',
        'B：桶容量的 $\\frac{4}{5}$ 是 $\\frac{2}{3}$ 千克，求容量用除法。',
        'C：速度 = 路程 ÷ 时间 $=\\frac{2}{3}\\div\\frac{4}{5}$。',
        'D：求 $\\frac{2}{3}$ 元的 $\\frac{4}{5}$，用乘法。选 A、B、C。',
      ],
      verify: () => {
        const target = F(2).div(3).div(F(4).div(5));
        const vals = [F(2).div(3).div(F(4).div(5)), F(2).div(3).div(F(4).div(5)), F(2).div(3).div(F(4).div(5)), F(2).div(3).mul(F(4).div(5))];
        return vals.map((v, i) => (v.eq(target) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '2.6-b05',
      level: 'basic',
      type: 'fill',
      stem: '买 $\\frac{3}{8}$ 千克茶叶付了 45 元，买 $\\frac{2}{5}$ 千克巧克力付了 18 元。买 1 千克茶叶和 1 千克巧克力一共要多少元？',
      blanks: [{ kind: 'num', answer: '165', suffix: '元' }],
      explain: [
        '1 千克茶叶：$45\\div\\frac{3}{8}=120$ 元；1 千克巧克力：$18\\div\\frac{2}{5}=45$ 元。',
        '一共 $120+45=165$ 元。',
        '易错：用 $45\\times\\frac{3}{8}$ 求单价。',
      ],
      verify: () => F(45).div(F(3).div(8)).add(F(18).div(F(2).div(5))),
    },

    // ---------- 扩展 ----------
    {
      id: '2.6-e01',
      level: 'extended',
      type: 'fill',
      stem: '一根电线，第一次用去全长的 $\\frac{2}{7}$，第二次用去 6 米，余下的和第一次用去的一样长。这根电线原来长多少米？',
      blanks: [{ kind: 'num', answer: '14', suffix: '米' }],
      explain: [
        '把全长看作单位"1"。第一次用去 $\\frac{2}{7}$，余下的也是 $\\frac{2}{7}$。',
        '第二次用去的 6 米，占全长的 $1-\\frac{2}{7}-\\frac{2}{7}=\\frac{3}{7}$。',
        '全长 $6\\div\\frac{3}{7}=14$ 米。',
        '易错：以为 6 米对应 $1-\\frac{2}{7}=\\frac{5}{7}$。',
      ],
      verify: () => F(6).div(F(1).sub(F(4).div(7))),
    },
    {
      id: '2.6-e02',
      level: 'extended',
      type: 'fill',
      stem: '某商店 11 月用电 1400 度，比原计划节约了 $\\frac{1}{8}$；12 月实际用电比原计划多用了 $\\frac{1}{8}$（两个月的原计划相同）。',
      blanks: [
        { kind: 'num', label: '(1) 每月原计划用电多少度', answer: '1600' },
        { kind: 'num', label: '(2) 12 月实际用电多少度', answer: '1800' },
      ],
      explain: [
        '(1) 以原计划为单位"1"，11 月用了计划的 $1-\\frac{1}{8}=\\frac{7}{8}$。计划 $=1400\\div\\frac{7}{8}=1600$ 度。',
        '(2) 12 月用了计划的 $\\frac{9}{8}$：$1600\\times\\frac{9}{8}=1800$ 度。',
        '易错：(1) 用 $1400\\times\\frac{9}{8}$；(2) 用 $1400\\times\\frac{9}{8}$，单位"1"找错。',
      ],
      verify: () => { const plan = F(1400).div(F(7).div(8)); return [plan, plan.mul(F(9).div(8))]; },
    },
    {
      id: '2.6-e03',
      level: 'extended',
      type: 'fill',
      stem: '甲车速度的 $\\frac{3}{5}$ 等于乙车速度的 $\\frac{4}{7}$。',
      blanks: [
        { kind: 'num', label: '(1) 乙车速度是甲车的几分之几', answer: '21/20' },
        { kind: 'num', label: '(2) 甲车速度比乙车慢乙车速度的几分之几', answer: '1/21' },
      ],
      explain: [
        '(1) 甲 × $\\frac{3}{5}$ = 乙 × $\\frac{4}{7}$，乙 = 甲 × $\\frac{3}{5}\\div\\frac{4}{7}$ = 甲 × $\\frac{21}{20}$。乙是甲的 $\\frac{21}{20}$。',
        '(2) 以乙为单位"1"：甲是乙的 $\\frac{20}{21}$，比乙慢 $1-\\frac{20}{21}=\\frac{1}{21}$。',
        '易错：(2) 以为"乙比甲快 $\\frac{1}{20}$"，所以"甲比乙慢 $\\frac{1}{20}$"——两个问题的单位"1"不同。',
      ],
      verify: () => { const r = F(3).div(5).div(F(4).div(7)); return [r, F(1).sub(F(1).div(r))]; },
    },
    {
      id: '2.6-e04',
      level: 'extended',
      type: 'fill',
      stem: '小丽看一本书，第一天看了全书的 $\\frac{1}{5}$ 还多 10 页，第二天看了全书的 $\\frac{1}{4}$ 还少 4 页，两天一共看了全书的 $\\frac{1}{2}$。这本书有多少页？',
      blanks: [{ kind: 'num', answer: '120', suffix: '页' }],
      explain: [
        '两天看的 = 全书的 $\\left(\\frac{1}{5}+\\frac{1}{4}\\right)$，再多 $10-4=6$ 页。',
        '这等于全书的 $\\frac{1}{2}$，所以 6 页对应全书的 $\\frac{1}{2}-\\frac{1}{5}-\\frac{1}{4}=\\frac{1}{20}$。',
        '全书 $6\\div\\frac{1}{20}=120$ 页。',
        '易错：把"少 4 页"也当成多，得 14 页对应 $\\frac{1}{20}$。',
      ],
      verify: () => {
        for (let n = 20; n <= 2000; n += 20) if (F(n).div(5).add(10).add(F(n).div(4).sub(4)).eq(F(n).div(2))) return n;
        return 0;
      },
    },
    {
      id: '2.6-e05',
      level: 'extended',
      type: 'fill',
      stem: '一只猴子摘了一堆桃子，第一天吃了这堆桃子的 $\\frac{1}{3}$ 还多 2 个，第二天吃了余下的 $\\frac{1}{4}$ 还多 3 个，第三天吃了余下的 $\\frac{1}{2}$ 还多 1 个，最后还剩 5 个。原来有多少个桃子？',
      blanks: [{ kind: 'num', answer: '33', suffix: '个' }],
      explain: [
        '从最后一天倒推。第三天吃了余下的 $\\frac{1}{2}$ 还多 1 个后剩 5 个：第三天开始时的一半是 $5+1=6$，开始时有 $6\\div\\frac{1}{2}=12$ 个。',
        '第二天吃了余下的 $\\frac{1}{4}$ 还多 3 个后剩 12 个：第二天开始时的 $\\frac{3}{4}$ 是 $12+3=15$，开始时有 $15\\div\\frac{3}{4}=20$ 个。',
        '第一天吃了 $\\frac{1}{3}$ 还多 2 个后剩 20 个：原来的 $\\frac{2}{3}$ 是 22，原来有 $22\\div\\frac{2}{3}=33$ 个。',
        '检验：33 → 吃 13 剩 20 → 吃 8 剩 12 → 吃 7 剩 5。',
        '易错：倒推时先除后加，得不到整数。',
      ],
      verify: () => {
        for (let x = 1; x < 1000; x++) {
          let v = F(x);
          v = v.sub(v.div(3).add(2));
          v = v.sub(v.div(4).add(3));
          v = v.sub(v.div(2).add(1));
          if (v.eq(5)) return x;
        }
        return 0;
      },
    },
    {
      id: '2.6-e06',
      level: 'extended',
      type: 'fill',
      stem: '一项工程，甲队单独做 12 天完成，乙队单独做 18 天完成。两队合作 3 天后，甲队调走，剩下的由乙队单独做。乙队还要做几天？',
      blanks: [{ kind: 'num', answer: '21/2', suffix: '天' }],
      explain: [
        '把工程看作单位"1"，甲每天做 $\\frac{1}{12}$，乙每天做 $\\frac{1}{18}$，合作每天 $\\frac{1}{12}+\\frac{1}{18}=\\frac{5}{36}$。',
        '3 天做了 $\\frac{15}{36}=\\frac{5}{12}$，还剩 $\\frac{7}{12}$。',
        '乙还要 $\\frac{7}{12}\\div\\frac{1}{18}=\\frac{21}{2}=10\\frac{1}{2}$ 天。',
        '易错：用剩下的 $\\frac{7}{12}$ 乘 18。',
      ],
      verify: () => F(1).sub(F(3).mul(F(1).div(12).add(F(1).div(18)))).div(F(1).div(18)),
    },
    {
      id: '2.6-e07',
      level: 'extended',
      type: 'fill',
      stem: '商店同时卖出两件衣服，每件都卖 1200 元，其中一件赚了成本的 $\\frac{1}{4}$，另一件亏了成本的 $\\frac{1}{4}$。',
      blanks: [
        { kind: 'text', label: '(1) 两件合在一起，商店', answer: '亏了', options: ['赚了', '亏了', '不赚不亏'] },
        { kind: 'num', label: '(2) 赚或亏了多少元', answer: '160' },
      ],
      explain: [
        '赚钱的一件：售价是成本的 $\\frac{5}{4}$，成本 $1200\\div\\frac{5}{4}=960$ 元。',
        '亏钱的一件：售价是成本的 $\\frac{3}{4}$，成本 $1200\\div\\frac{3}{4}=1600$ 元。',
        '总成本 2560 元，总售价 2400 元，亏了 160 元。',
        '易错：以为赚的和亏的都是 $\\frac{1}{4}$，正好抵消。两件的成本（单位"1"）不同。',
      ],
      verify: () => {
        const cost = F(1200).div(F(5).div(4)).add(F(1200).div(F(3).div(4)));
        const d = F(2400).sub(cost);
        return [d.cmp(0) > 0 ? '赚了' : d.cmp(0) < 0 ? '亏了' : '不赚不亏', d.abs()];
      },
    },
    {
      id: '2.6-e08',
      level: 'extended',
      type: 'choice',
      stem: '已知 $a\\times\\frac{3}{4}=b\\div\\frac{5}{6}=c\\times 1\\frac{1}{2}$，而且 $a$、$b$、$c$ 都不为 0。$a$、$b$、$c$ 中最大的是（ ）',
      options: ['$a$', '$b$', '$c$', '无法确定'],
      answer: 0,
      explain: [
        '$b\\div\\frac{5}{6}=b\\times\\frac{6}{5}$。三个积相等，乘的数越小，被乘的数就越大。',
        '比较 $\\frac{3}{4}$、$\\frac{6}{5}$、$1\\frac{1}{2}$：$\\frac{3}{4}$ 最小，所以 $a$ 最大。',
        '也可以设它们都等于 1：$a=\\frac{4}{3}$，$b=\\frac{5}{6}$，$c=\\frac{2}{3}$。选 A。',
        '易错：看到 $b$ 后面是"除以"，就以为 $b$ 最小或最大，没先把除法化成乘法。',
      ],
      verify: () => {
        const v = [F(4).div(3), F(5).div(6), F(2).div(3)];
        let m = 0;
        v.forEach((x, i) => { if (x.cmp(v[m]) > 0) m = i; });
        return m;
      },
    },
    {
      id: '2.6-e09',
      level: 'extended',
      type: 'fill',
      stem: '一个数先除以 $\\frac{2}{3}$，再乘 $\\frac{3}{4}$，所得的结果比原数多 12。原数是多少？',
      blanks: [{ kind: 'num', answer: '96' }],
      explain: [
        '先除以 $\\frac{2}{3}$ 就是乘 $\\frac{3}{2}$，再乘 $\\frac{3}{4}$，结果是原数的 $\\frac{3}{2}\\times\\frac{3}{4}=\\frac{9}{8}$。',
        '比原数多原数的 $\\frac{1}{8}$，这就是 12。原数 $=12\\div\\frac{1}{8}=96$。',
        '易错：以为除以 $\\frac{2}{3}$ 再乘 $\\frac{3}{4}$，结果比原数小。',
      ],
      verify: () => {
        for (let x = 1; x < 1000; x++) if (F(x).div(F(2).div(3)).mul(F(3).div(4)).sub(x).eq(12)) return x;
        return 0;
      },
    },
    {
      id: '2.6-e10',
      level: 'extended',
      type: 'fill',
      stem: '甲、乙两车同时从 A、B 两地出发相向而行。甲车走完全程要 4 小时，乙车走完全程要 6 小时。相遇时甲车比乙车多行了 30 千米。A、B 两地相距多少千米？',
      blanks: [{ kind: 'num', answer: '150', suffix: '千米' }],
      explain: [
        '把全程看作单位"1"：甲每小时行 $\\frac{1}{4}$，乙每小时行 $\\frac{1}{6}$，两车每小时共行 $\\frac{5}{12}$。',
        '相遇用时 $1\\div\\frac{5}{12}=\\frac{12}{5}$ 小时。这段时间甲行了 $\\frac{1}{4}\\times\\frac{12}{5}=\\frac{3}{5}$，乙行了 $\\frac{2}{5}$。',
        '甲比乙多行全程的 $\\frac{1}{5}$，这是 30 千米，全程 $30\\div\\frac{1}{5}=150$ 千米。',
        '易错：用 $30\\div\\left(\\frac{1}{4}-\\frac{1}{6}\\right)$，把"每小时多行的分率"当成"相遇时多行的分率"。',
      ],
      verify: () => {
        const t = F(1).div(F(1).div(4).add(F(1).div(6)));
        const diff = F(1).div(4).sub(F(1).div(6)).mul(t);
        return F(30).div(diff);
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.6-c01',
      level: 'challenge',
      type: 'fill',
      stem: '一筐苹果，第一次拿走全部的 $\\frac{1}{3}$ 又 1 个，第二次拿走余下的 $\\frac{2}{5}$ 又 1 个，第三次拿走余下的 $\\frac{3}{4}$ 又 1 个。要求每次拿走的都是整数个，而且最后还有剩下的。',
      blanks: [
        { kind: 'num', label: '(1) 这筐苹果原来最少有几个', answer: '24' },
        { kind: 'num', label: '(2) 如果最后剩下 10 个，原来有几个', answer: '114' },
      ],
      explain: [
        '思路：从最后剩下的 $r$ 个倒推，每一步都要求是整数，由此找出 $r$ 的条件。',
        '第三次：拿走余下的 $\\frac{3}{4}$ 又 1 个后剩 $r$ 个，第三次开始时的 $\\frac{1}{4}$ 是 $r+1$，开始时有 $4\\times(r+1)$ 个。',
        '第二次：第二次开始时的 $\\frac{3}{5}$ 是 $4\\times(r+1)+1$，开始时有 $(4\\times r+5)\\div\\frac{3}{5}=\\frac{5\\times(4\\times r+5)}{3}$ 个。要是整数，$4\\times r+5$ 要能被 3 整除。',
        '第一次：原来的 $\\frac{2}{3}$ 是"第二次开始时的个数 + 1"，原来有 $(\\text{第二次开始时}+1)\\times\\frac{3}{2}$ 个，要求第二次开始时的个数是奇数。',
        '(1) $r$ 从 1 开始试：$r=1$ 时 $4\\times 1+5=9$ 能被 3 整除，第二次开始时 15 个（奇数），原来 $16\\times\\frac{3}{2}=24$ 个。检验：24 → 拿 9 剩 15 → 拿 7 剩 8 → 拿 7 剩 1。',
        '(2) $r=10$：第三次开始时 44 个，第二次开始时 $45\\div\\frac{3}{5}=75$ 个，原来 $76\\times\\frac{3}{2}=114$ 个。',
      ],
      verify: () => {
        const run = x => {
          let v = F(x);
          for (const [p, a] of [[F(1).div(3), 1], [F(2).div(5), 1], [F(3).div(4), 1]]) {
            const t = v.mul(p).add(a);
            if (t.d !== 1n || t.cmp(0) <= 0) return null;
            v = v.sub(t);
            if (v.cmp(0) <= 0) return null;
          }
          return v;
        };
        let first = 0;
        let ten = 0;
        for (let x = 1; x < 1000; x++) { const v = run(x); if (v && !first) first = x; if (v && v.eq(10)) ten = x; }
        return [first, ten];
      },
    },
    {
      id: '2.6-c02',
      level: 'challenge',
      type: 'fill',
      stem: '一项工程，甲单独做 9 天完成，乙单独做 12 天完成。两人轮流做，每人每次做一整天（最后一天可能不满一天就完成了）。',
      blanks: [
        { kind: 'num', label: '(1) 甲先做，一共要几天完成', answer: '41/4' },
        { kind: 'num', label: '(2) 乙先做，一共要几天完成', answer: '31/3' },
      ],
      explain: [
        '思路：两天为一轮，先算整轮能完成多少，最后不满一轮的部分要看轮到谁。',
        '一轮（甲、乙各一天）完成 $\\frac{1}{9}+\\frac{1}{12}=\\frac{7}{36}$。5 轮（10 天）完成 $\\frac{35}{36}$，剩 $\\frac{1}{36}$。6 轮会超过 1，所以做完 5 轮后还没完成。',
        '(1) 甲先做：第 11 天轮到甲，甲每天做 $\\frac{1}{9}=\\frac{4}{36}$，剩下的 $\\frac{1}{36}$ 要 $\\frac{1}{36}\\div\\frac{1}{9}=\\frac{1}{4}$ 天。共 $10\\frac{1}{4}$ 天。',
        '(2) 乙先做：第 11 天轮到乙，要 $\\frac{1}{36}\\div\\frac{1}{12}=\\frac{1}{3}$ 天。共 $10\\frac{1}{3}$ 天。',
        '注意检查：会不会在某一轮的第一天就完成了？5 轮后只剩 $\\frac{1}{36}$，而 4 轮后剩 $\\frac{8}{36}$，比甲或乙一天做的都多，所以不会提前完成。',
        '易错：用 $1\\div\\frac{7}{36}$ 直接算天数；或者以为谁先做都一样。',
      ],
      verify: () => {
        const run = first => {
          const e = [F(1).div(9), F(1).div(12)];
          let r = F(1);
          let day = 0;
          for (;;) { const w = e[(day + first) % 2]; if (r.cmp(w) <= 0) return F(day).add(r.div(w)); r = r.sub(w); day++; }
        };
        return [run(0), run(1)];
      },
    },
    {
      id: '2.6-c03',
      level: 'challenge',
      type: 'fill',
      stem: '一项工程，甲、乙两队合作 6 天完成，乙、丙两队合作 10 天完成，甲、丙两队合作 $7\\frac{1}{2}$ 天完成。',
      blanks: [
        { kind: 'num', label: '(1) 三队合作几天完成', answer: '5' },
        { kind: 'num', label: '(2) 甲队单独做几天完成', answer: '10' },
      ],
      explain: [
        '思路：一个条件求不出单独一队的效率。把三个"两队合作"加起来，每一队都被算了两次。',
        '甲乙每天做 $\\frac{1}{6}$，乙丙每天做 $\\frac{1}{10}$，甲丙每天做 $1\\div 7\\frac{1}{2}=\\frac{2}{15}$。',
        '三个加起来：$\\frac{1}{6}+\\frac{1}{10}+\\frac{2}{15}=\\frac{5+3+4}{30}=\\frac{2}{5}$，这是"甲乙丙每天的 2 倍"，所以三队合作每天做 $\\frac{1}{5}$。',
        '(1) 三队合作 $1\\div\\frac{1}{5}=5$ 天。',
        '(2) 甲每天 = 三队每天 − 乙丙每天 $=\\frac{1}{5}-\\frac{1}{10}=\\frac{1}{10}$，甲单独做 10 天。',
        '易错：甲丙合作的效率写成 $\\frac{1}{7}\\frac{1}{2}$；或者三个效率相加后忘了"每队算了两次"。',
      ],
      verify: () => {
        const ab = F(1).div(6);
        const bc = F(1).div(10);
        const ac = F(1).div(F(15).div(2));
        const all = ab.add(bc).add(ac).div(2);
        return [F(1).div(all), F(1).div(all.sub(bc))];
      },
    },
    {
      id: '2.6-c04',
      level: 'challenge',
      type: 'fill',
      stem: '$A$、$B$、$C$ 都是正整数，并且 $A$ 的 $\\frac{2}{3}$、$B$ 的 $\\frac{3}{4}$、$C$ 的 $\\frac{4}{5}$ 三者相等。',
      blanks: [
        { kind: 'num', label: '(1) $A+B+C$ 最小是多少', answer: '49' },
        { kind: 'num', label: '(2) 如果 $A+B+C$ 在 200 和 300 之间，$A+B+C$ 是多少', answer: '245' },
      ],
      explain: [
        '思路：设三者相等的那个数是 $k$，用 $k$ 表示 $A$、$B$、$C$，再看什么时候它们都是整数。',
        '$A=k\\div\\frac{2}{3}=\\frac{3}{2}\\times k$，$B=k\\div\\frac{3}{4}=\\frac{4}{3}\\times k$，$C=k\\div\\frac{4}{5}=\\frac{5}{4}\\times k$。',
        '要找 $k$ 的条件：$B-C=\\frac{4}{3}\\times k-\\frac{5}{4}\\times k=\\frac{1}{12}\\times k$，$B$、$C$ 都是整数，所以 $\\frac{1}{12}\\times k$ 是整数，$k$ 是 12 的倍数。反过来，$k$ 是 12 的倍数时，$A$、$B$、$C$ 都是整数。',
        '(1) $k=12$：$A=18$，$B=16$，$C=15$，$A+B+C=49$。',
        '(2) $k=12\\times m$ 时，$A+B+C=49\\times m$。在 200 和 300 之间的只有 $49\\times 5=245$。',
        '易错：以为 $k$ 要被 2、3、4 的乘积 24 整除，得 98。',
      ],
      verify: () => {
        const r = [];
        for (let A = 1; A <= 300; A++) for (let B = 1; B <= 300; B++) {
          const k = F(A).mul(F(2).div(3));
          if (!k.eq(F(B).mul(F(3).div(4)))) continue;
          const C = k.div(F(4).div(5));
          if (C.d === 1n) r.push(A + B + Number(C.n));
        }
        r.sort((x, y) => x - y);
        return [r[0], r.find(s => s > 200 && s < 300)];
      },
    },
    {
      id: '2.6-c05',
      level: 'challenge',
      type: 'fill',
      stem: 'A、B 两地相距 70 千米。甲从 A 地、乙从 B 地同时出发相向而行，甲走完全程要 5 小时，乙走完全程要 7 小时。两人到达对方出发地后都立即原路返回。',
      blanks: [
        { kind: 'num', label: '(1) 第一次相遇的地点离 A 地多少千米', answer: '245/6' },
        { kind: 'num', label: '(2) 第二次相遇的地点离 A 地多少千米', answer: '35/2' },
      ],
      explain: [
        '甲的速度 $70\\div 5=14$ 千米/时，乙的速度 $70\\div 7=10$ 千米/时，两人每小时共走 24 千米。',
        '(1) 第一次相遇：两人共走 1 个全程，用 $70\\div 24=\\frac{35}{12}$ 小时，甲走了 $14\\times\\frac{35}{12}=\\frac{245}{6}=40\\frac{5}{6}$ 千米，就是离 A 地的距离。',
        '(2) 思路：从出发到第二次相遇，两人共走了 **3 个全程**（第一次相遇共走 1 个；之后各自走到对方出发地再返回，到第二次相遇又共走了 2 个）。',
        '用时 $210\\div 24=\\frac{35}{4}$ 小时。甲走了 $14\\times\\frac{35}{4}=\\frac{245}{2}=122\\frac{1}{2}$ 千米：先走 70 千米到 B，再往回走 $52\\frac{1}{2}$ 千米。',
        '离 A 地 $70-52\\frac{1}{2}=17\\frac{1}{2}$ 千米。还要检查：这时乙已经到过 A 地并返回了吗？乙走了 $10\\times\\frac{35}{4}=87\\frac{1}{2}$ 千米，超过 70，已经从 A 返回走了 $17\\frac{1}{2}$ 千米，两人位置一致。',
        '易错：以为第二次相遇时两人共走了 2 个全程。',
      ],
      verify: () => {
        const va = F(14);
        const vb = F(10);
        const t1 = F(70).div(va.add(vb));
        const t2 = F(210).div(va.add(vb));
        const da = va.mul(t2);
        const posA = da.cmp(70) > 0 ? F(140).sub(da) : da;
        return [va.mul(t1), posA];
      },
    },
  ],
});
