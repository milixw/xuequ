'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 2.5 分数的乘法
// 知识范围：分数乘整数、分数乘分数、带分数乘法、先约分再乘、乘法运算律（交换、结合、分配）、
//           求一个数的几分之几是多少；可以使用第 1 章和 2.1～2.4 的全部内容
// 还没学：倒数和分数除法（2.6）、分数与小数互化（2.7）、负数。
//         "已知一个数的几分之几是多少，求这个数"要用除法，本节不出；需要时用"份数"说明
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/2.5',
  title: '分数的乘法',
  review: { status: 'pending' },
  audit: { blind: '2026-09-27', rounds: 4, note: '子代理盲解复核四轮，答案全部一致；第 1 轮按意见重做 b01、e05、e07～e10 和 c02、c03、c05，第 2～3 轮消除 c02 两问同答案、c05 能硬算的问题并加难 c04，第 4 轮判定整节通过' },

  intro: [
    {
      title: '分数乘整数',
      body: '分数乘整数，表示几个相同分数相加。计算时**分子乘整数，分母不变**；能约分的先约分再乘。',
      example: '$\\frac{3}{10}\\times 4=\\frac{3\\times 4}{10}=\\frac{12}{10}=\\frac{6}{5}$，也可以先把 4 和 10 约去公因数 2：$\\frac{3\\times 2}{5}=\\frac{6}{5}$。',
    },
    {
      title: '分数乘分数',
      body: '分数乘分数，**分子乘分子，分母乘分母**。计算前先把分子和分母交叉约分，数小了不容易算错。带分数要先化成假分数。',
      example: '$\\frac{5}{12}\\times\\frac{8}{15}$：5 和 15 约去 5，8 和 12 约去 4，得 $\\frac{1\\times 2}{3\\times 3}=\\frac{2}{9}$。',
      pitfall: '带分数不能整数部分乘整数部分、分数部分乘分数部分，要先化成假分数。',
    },
    {
      title: '求一个数的几分之几',
      body: '求一个数的几分之几是多少，用这个数**乘**几分之几。关键是找准单位"1"：说"谁的几分之几"，那个"谁"就是单位"1"。',
      example: '一本书 240 页，看了 $\\frac{3}{8}$，看了 $240\\times\\frac{3}{8}=90$ 页。',
      pitfall: '"剩下的几分之几"里，单位"1"已经变成剩下的部分，不再是原来的总数。',
    },
    {
      title: '乘法运算律',
      body: '乘法交换律、结合律、分配律对分数同样适用，用来简便计算。',
      example: '$\\left(\\frac{1}{3}+\\frac{1}{5}\\right)\\times 15=\\frac{1}{3}\\times 15+\\frac{1}{5}\\times 15=5+3=8$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.5-b01',
      level: 'basic',
      type: 'fill',
      stem: '计算：$2\\frac{1}{4}\\times\\frac{8}{9}\\times 3$',
      blanks: [{ kind: 'num', answer: '6' }],
      explain: [
        '先把带分数化成假分数：$2\\frac{1}{4}=\\frac{9}{4}$。',
        '$\\frac{9}{4}\\times\\frac{8}{9}$：9 和 9 约去，8 和 4 约成 2 和 1，得 2；再乘 3 得 6。',
        '易错：算成 $2\\times\\frac{8}{9}\\times 3+\\frac{1}{4}$，或者 3 乘到了分母上。',
      ],
      verify: () => F(9).div(4).mul(F(8).div(9)).mul(3),
    },
    {
      id: '2.5-b02',
      level: 'basic',
      type: 'choice',
      stem: '3 米的 $\\frac{1}{4}$ 和 1 米的 $\\frac{3}{4}$ 相比，（ ）',
      options: ['前者长', '后者长', '一样长', '无法比较'],
      answer: 2,
      explain: [
        '3 米的 $\\frac{1}{4}$：$3\\times\\frac{1}{4}=\\frac{3}{4}$ 米。1 米的 $\\frac{3}{4}$：$1\\times\\frac{3}{4}=\\frac{3}{4}$ 米。',
        '一样长。选 C。易错：以为"3 米"比"1 米"长，前者就长；或者以为 $\\frac{3}{4}$ 比 $\\frac{1}{4}$ 大，后者就长。',
      ],
      verify: () => { const c = F(3).mul(F(1).div(4)).cmp(F(1).mul(F(3).div(4))); return c > 0 ? 0 : c < 0 ? 1 : 2; },
    },
    {
      id: '2.5-b03',
      level: 'basic',
      type: 'fill',
      stem: '160 先增加它的 $\\frac{1}{4}$，得到的数再减少它的 $\\frac{1}{4}$，结果是多少？',
      blanks: [{ kind: 'num', answer: '150' }],
      explain: [
        '增加 160 的 $\\frac{1}{4}$：$160+160\\times\\frac{1}{4}=200$。',
        '再减少 200 的 $\\frac{1}{4}$（单位"1"变成了 200）：$200-200\\times\\frac{1}{4}=150$。',
        '易错：以为加了 $\\frac{1}{4}$ 又减了 $\\frac{1}{4}$，还是 160。两次的单位"1"不一样。',
      ],
      verify: () => { const a = F(160).mul(F(5).div(4)); return a.mul(F(3).div(4)); },
    },
    {
      id: '2.5-b04',
      level: 'basic',
      type: 'fill',
      stem: '一桶油重 6 千克，第一次用去 $\\frac{1}{3}$，第二次用去 $\\frac{1}{3}$ 千克。还剩多少千克？',
      blanks: [{ kind: 'num', answer: '11/3', suffix: '千克' }],
      explain: [
        '第一次用去的是这桶油的 $\\frac{1}{3}$：$6\\times\\frac{1}{3}=2$ 千克。',
        '第二次用去的是 $\\frac{1}{3}$ 千克，是具体的量。',
        '还剩 $6-2-\\frac{1}{3}=3\\frac{2}{3}$ 千克。易错：把两个 $\\frac{1}{3}$ 当成一样的意思。',
      ],
      verify: () => F(6).sub(F(6).mul(F(1).div(3))).sub(F(1).div(3)),
    },
    {
      id: '2.5-b05',
      level: 'basic',
      type: 'fill',
      stem: '计算：$2\\frac{1}{3}\\times 1\\frac{2}{7}$',
      blanks: [{ kind: 'num', answer: '3' }],
      explain: [
        '化成假分数：$\\frac{7}{3}\\times\\frac{9}{7}$，7 和 7 约去，3 和 9 约去 3，得 3。',
        '易错：整数部分相乘、分数部分相乘，$2\\times 1+\\frac{1}{3}\\times\\frac{2}{7}=2\\frac{2}{21}$。',
      ],
      verify: () => F(7).div(3).mul(F(9).div(7)),
    },

    // ---------- 扩展 ----------
    {
      id: '2.5-e01',
      level: 'extended',
      type: 'fill',
      stem: '修一条路，第一天修了全程的 $\\frac{2}{7}$，第二天修了剩下的 $\\frac{3}{5}$，第三天修完。第三天修了全程的几分之几？',
      blanks: [{ kind: 'num', answer: '2/7' }],
      explain: [
        '第一天后剩下全程的 $1-\\frac{2}{7}=\\frac{5}{7}$。',
        '第二天修了"剩下的 $\\frac{3}{5}$"，单位"1"是剩下的 $\\frac{5}{7}$：$\\frac{5}{7}\\times\\frac{3}{5}=\\frac{3}{7}$。',
        '第三天修 $1-\\frac{2}{7}-\\frac{3}{7}=\\frac{2}{7}$。也可以直接算：第二天后剩下 $\\frac{5}{7}$ 的 $\\frac{2}{5}$，即 $\\frac{2}{7}$。',
        '易错：把第二天当成全程的 $\\frac{3}{5}$，得 $1-\\frac{2}{7}-\\frac{3}{5}$。',
      ],
      verify: () => { const r1 = F(1).sub(F(2).div(7)); return r1.sub(r1.mul(F(3).div(5))); },
    },
    {
      id: '2.5-e02',
      level: 'extended',
      type: 'fill',
      stem: '2026 先减去它的 $\\frac{1}{2}$，再减去余下的 $\\frac{1}{3}$，再减去余下的 $\\frac{1}{4}$，……依次类推。',
      blanks: [
        { kind: 'num', label: '(1) 一直减到余下的 $\\frac{1}{2026}$，最后余下的数是', answer: '1' },
        { kind: 'num', label: '(2) 减去余下的 $\\frac{1}{n}$ 以后，余下的数第一次是 2，$n=$', answer: '1013' },
      ],
      explain: [
        '每次减去余下的 $\\frac{1}{k}$，就是剩下余下的 $\\frac{k-1}{k}$，也就是乘 $\\frac{k-1}{k}$。',
        '(1) $2026\\times\\frac{1}{2}\\times\\frac{2}{3}\\times\\frac{3}{4}\\times\\cdots\\times\\frac{2025}{2026}$，相邻两个分数的分子分母依次约去，只剩 $2026\\times\\frac{1}{2026}=1$。',
        '(2) 减到余下的 $\\frac{1}{n}$ 时，同样约分后余下 $2026\\times\\frac{1}{n}$。要等于 2，$n=1013$。',
        '易错：把每一步都看成减去 2026 的几分之几。',
      ],
      verify: () => {
        let p = F(2026);
        let hit = 0;
        for (let k = 2; k <= 2026; k++) { p = p.mul(F(k - 1).div(k)); if (!hit && p.eq(2)) hit = k; }
        return [p, hit];
      },
    },
    {
      id: '2.5-e03',
      level: 'extended',
      type: 'fill',
      stem: '商品调价：',
      blanks: [
        { kind: 'num', label: '(1) 先涨价 $\\frac{1}{10}$，再降价 $\\frac{1}{10}$，现价比原价低了原价的几分之几', answer: '1/100' },
        { kind: 'text', label: '(2) 先涨价 $\\frac{1}{4}$，再降价 $\\frac{1}{5}$，现价和原价相比', answer: '一样', options: ['高了', '低了', '一样'] },
      ],
      explain: [
        '把原价看作单位"1"。涨价 $\\frac{1}{10}$ 后是原价的 $\\frac{11}{10}$；再降价 $\\frac{1}{10}$，单位"1"变成涨价后的价格，现价是它的 $\\frac{9}{10}$。',
        '(1) 现价是原价的 $\\frac{11}{10}\\times\\frac{9}{10}=\\frac{99}{100}$，低了原价的 $\\frac{1}{100}$。',
        '(2) 现价是原价的 $\\frac{5}{4}\\times\\frac{4}{5}=1$，和原价一样。',
        '易错：(1) 以为涨降相同，价格不变；(2) 以为降得少，价格变高。',
      ],
      verify: () => {
        const p1 = F(11).div(10).mul(F(9).div(10));
        const p2 = F(5).div(4).mul(F(4).div(5));
        const c = p2.cmp(1);
        return [F(1).sub(p1), c > 0 ? '高了' : c < 0 ? '低了' : '一样'];
      },
    },
    {
      id: '2.5-e04',
      level: 'extended',
      type: 'fill',
      stem: '用简便方法计算：',
      blanks: [
        { kind: 'num', label: '(1) $\\left(\\frac{1}{4}+\\frac{1}{6}-\\frac{1}{8}\\right)\\times 48=$', answer: '14' },
        { kind: 'num', label: '(2) $37\\times\\frac{5}{36}=$', answer: '185/36' },
      ],
      explain: [
        '(1) 分配律：$\\frac{1}{4}\\times 48+\\frac{1}{6}\\times 48-\\frac{1}{8}\\times 48=12+8-6=14$。',
        '(2) 把 37 拆成 $36+1$：$(36+1)\\times\\frac{5}{36}=5+\\frac{5}{36}=5\\frac{5}{36}$。',
        '易错：(2) 直接算 $\\frac{185}{36}$ 后化带分数出错。',
      ],
      verify: () => [F(1).div(4).add(F(1).div(6)).sub(F(1).div(8)).mul(48), F(37).mul(F(5).div(36))],
    },
    {
      id: '2.5-e05',
      level: 'extended',
      type: 'fill',
      stem: '甲数是乙数的 $\\frac{3}{4}$，乙数是丙数的 $\\frac{2}{5}$（三个数都不为 0）。',
      blanks: [
        { kind: 'num', label: '(1) 甲数是丙数的几分之几', answer: '3/10' },
        { kind: 'num', label: '(2) 丙数比甲数多甲数的几分之几', answer: '7/3' },
      ],
      explain: [
        '(1) 把丙看作单位"1"：乙是 $\\frac{2}{5}$，甲是 $\\frac{2}{5}\\times\\frac{3}{4}=\\frac{3}{10}$。',
        '(2) 单位"1"换成甲。甲是丙的 $\\frac{3}{10}$，就是把丙平均分成 10 份，甲占 3 份。丙比甲多 7 份，是甲的 $\\frac{7}{3}$。',
        '易错：(2) 用 $1-\\frac{3}{10}=\\frac{7}{10}$，这是"甲比丙少丙的几分之几"，单位"1"弄错了。',
      ],
      verify: () => { const a = F(2).div(5).mul(F(3).div(4)); return [a, F(1).sub(a).div(a)]; },
    },
    {
      id: '2.5-e06',
      level: 'extended',
      type: 'fill',
      stem: '一只猴子摘了 180 个桃子，第一天吃了这些桃子的 $\\frac{1}{3}$，第二天吃了余下的 $\\frac{1}{4}$，第三天吃了余下的 $\\frac{2}{5}$。',
      blanks: [
        { kind: 'num', label: '(1) 第二天吃了几个', answer: '30' },
        { kind: 'num', label: '(2) 三天后还剩几个', answer: '54' },
      ],
      explain: [
        '第一天吃 $180\\times\\frac{1}{3}=60$ 个，余下 120 个。',
        '(1) 第二天吃余下的 $\\frac{1}{4}$：$120\\times\\frac{1}{4}=30$ 个，余下 90 个。',
        '(2) 第三天吃 $90\\times\\frac{2}{5}=36$ 个，还剩 54 个。也可以连乘：$180\\times\\frac{2}{3}\\times\\frac{3}{4}\\times\\frac{3}{5}=54$。',
        '易错：每天都按 180 的几分之几算。',
      ],
      verify: () => {
        let x = F(180);
        x = x.sub(x.mul(F(1).div(3)));
        const d2 = x.mul(F(1).div(4));
        x = x.sub(d2);
        x = x.sub(x.mul(F(2).div(5)));
        return [d2, x];
      },
    },
    {
      id: '2.5-e07',
      level: 'extended',
      type: 'fill',
      stem: '一块长方形菜地长 $2\\frac{1}{4}$ 米，宽是长的 $\\frac{2}{3}$。现在把长增加它的 $\\frac{1}{3}$，宽减少它的 $\\frac{1}{5}$。',
      blanks: [
        { kind: 'num', label: '(1) 原来的面积是多少平方米', answer: '27/8' },
        { kind: 'num', label: '(2) 现在的面积是多少平方米', answer: '18/5' },
      ],
      explain: [
        '(1) 宽 $\\frac{9}{4}\\times\\frac{2}{3}=\\frac{3}{2}$ 米，面积 $\\frac{9}{4}\\times\\frac{3}{2}=\\frac{27}{8}$ 平方米。',
        '(2) 新的长是原来的 $\\frac{4}{3}$，新的宽是原来的 $\\frac{4}{5}$，新面积是原来的 $\\frac{4}{3}\\times\\frac{4}{5}=\\frac{16}{15}$：$\\frac{27}{8}\\times\\frac{16}{15}=\\frac{18}{5}=3\\frac{3}{5}$ 平方米。',
        '易错：以为长增加 $\\frac{1}{3}$、宽减少 $\\frac{1}{5}$，面积就增加 $\\frac{1}{3}-\\frac{1}{5}$。',
      ],
      verify: () => { const L = F(9).div(4); const W = L.mul(F(2).div(3)); return [L.mul(W), L.mul(F(4).div(3)).mul(W.mul(F(4).div(5)))]; },
    },
    {
      id: '2.5-e08',
      level: 'extended',
      type: 'fill',
      stem: '一个正整数的 $\\frac{3}{7}$ 是整数，它的 $\\frac{5}{6}$ 也是整数。',
      blanks: [
        { kind: 'num', label: '(1) 这个数最小是', answer: '42' },
        { kind: 'num', label: '(2) 如果这两个整数的和是 159，这个数是', answer: '126' },
      ],
      explain: [
        '(1) 乘 $\\frac{3}{7}$ 是整数：3 和 7 互素，这个数要能被 7 整除；乘 $\\frac{5}{6}$ 是整数：要能被 6 整除。所以它是 42 的倍数，最小是 42。',
        '(2) 这个数是 42 的倍数，记作 $42\\times k$。它的 $\\frac{3}{7}$ 是 $18\\times k$，$\\frac{5}{6}$ 是 $35\\times k$，和是 $53\\times k=159$，$k=3$，这个数是 126。',
        '易错：(2) 用 $159\\div\\left(\\frac{3}{7}+\\frac{5}{6}\\right)$，要用还没学的分数除法；按 42 的倍数来想更简单。',
      ],
      verify: () => {
        const r = [];
        let hit = 0;
        for (let n = 1; n <= 1000; n++) {
          const a = F(n).mul(F(3).div(7));
          const b = F(n).mul(F(5).div(6));
          if (a.d === 1n && b.d === 1n) { r.push(n); if (a.add(b).eq(159)) hit = n; }
        }
        return [r[0], hit];
      },
    },
    {
      id: '2.5-e09',
      level: 'extended',
      type: 'fill',
      stem: '图形的边长变化：',
      blanks: [
        { kind: 'num', label: '(1) 正方形的边长增加 $\\frac{1}{4}$，面积增加了原来面积的几分之几', answer: '9/16' },
        { kind: 'num', label: '(2) 正方体的棱长增加 $\\frac{1}{2}$，体积增加了原来体积的几分之几', answer: '19/8' },
      ],
      explain: [
        '(1) 把原边长看作单位"1"，新边长是 $\\frac{5}{4}$，新面积是原来的 $\\frac{5}{4}\\times\\frac{5}{4}=\\frac{25}{16}$，增加了 $\\frac{9}{16}$。',
        '(2) 新棱长是原来的 $\\frac{3}{2}$，新体积是原来的 $\\frac{3}{2}\\times\\frac{3}{2}\\times\\frac{3}{2}=\\frac{27}{8}$，增加了 $\\frac{27}{8}-1=\\frac{19}{8}$。',
        '易错：以为边长增加 $\\frac{1}{4}$，面积也增加 $\\frac{1}{4}$ 或 $\\frac{1}{2}$。',
      ],
      verify: () => [F(5).div(4).mul(F(5).div(4)).sub(1), F(3).div(2).mul(F(3).div(2)).mul(F(3).div(2)).sub(1)],
    },
    {
      id: '2.5-e10',
      level: 'extended',
      type: 'fill',
      stem: '一根电线，第一次剪去全长的 $\\frac{3}{8}$ 还多 6 米，第二次剪去余下的 $\\frac{1}{3}$，还剩 46 米。这根电线原来长多少米？',
      blanks: [{ kind: 'num', answer: '120', suffix: '米' }],
      explain: [
        '倒推。第二次剪去余下的 $\\frac{1}{3}$，剩下的 46 米是"余下部分"的 $\\frac{2}{3}$：把余下部分平均分成 3 份，46 米占 2 份，1 份是 23 米，余下部分是 69 米。',
        '第一次剪去全长的 $\\frac{3}{8}$ 还多 6 米后剩 69 米，所以 $69+6=75$ 米是全长的 $1-\\frac{3}{8}=\\frac{5}{8}$。',
        '全长平均分成 8 份，75 米占 5 份，1 份 15 米，全长 120 米。',
        '易错：倒推时先减 6 再算；或者把 46 米当成余下部分的 $\\frac{1}{3}$。',
      ],
      verify: () => {
        for (let L = 1; L < 1000; L++) { let r = F(L); r = r.sub(r.mul(F(3).div(8))).sub(6); r = r.sub(r.mul(F(1).div(3))); if (r.eq(46)) return L; }
        return 0;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.5-c01',
      level: 'challenge',
      type: 'fill',
      stem: '研究连乘 $\\left(1-\\frac{1}{2\\times 2}\\right)\\times\\left(1-\\frac{1}{3\\times 3}\\right)\\times\\cdots\\times\\left(1-\\frac{1}{n\\times n}\\right)$（$n\\ge 2$）。',
      blanks: [
        { kind: 'num', label: '(1) $n=10$ 时，结果是', answer: '11/20' },
        { kind: 'num', label: '(2) 结果第一次比 $\\frac{51}{100}$ 小时，$n=$', answer: '51' },
      ],
      explain: [
        '思路：每一项先写成两个分数的积。$1-\\frac{1}{k\\times k}=\\frac{k\\times k-1}{k\\times k}=\\frac{(k-1)\\times(k+1)}{k\\times k}=\\frac{k-1}{k}\\times\\frac{k+1}{k}$（例如 $1-\\frac{1}{9}=\\frac{8}{9}=\\frac{2}{3}\\times\\frac{4}{3}$）。',
        '把所有的 $\\frac{k-1}{k}$ 放一起：$\\frac{1}{2}\\times\\frac{2}{3}\\times\\cdots\\times\\frac{n-1}{n}=\\frac{1}{n}$；所有的 $\\frac{k+1}{k}$ 放一起：$\\frac{3}{2}\\times\\frac{4}{3}\\times\\cdots\\times\\frac{n+1}{n}=\\frac{n+1}{2}$。',
        '所以结果是 $\\frac{1}{n}\\times\\frac{n+1}{2}=\\frac{n+1}{2\\times n}$。',
        '(1) $n=10$：$\\frac{11}{20}$。',
        '(2) $\\frac{n+1}{2\\times n}$ 通分和 $\\frac{51}{100}$ 比：要 $100\\times(n+1)<51\\times 2\\times n$，即 $100\\times n+100<102\\times n$，$2\\times n>100$，$n>50$。第一次是 $n=51$。',
        '检验：$n=50$ 时 $\\frac{51}{100}$，正好相等，不算"小"。',
      ],
      verify: () => {
        let c = F(1);
        for (let k = 2; k <= 10; k++) c = c.mul(F(1).sub(F(1).div(k * k)));
        let q = F(1);
        let n = 2;
        for (; ; n++) { q = q.mul(F(1).sub(F(1).div(n * n))); if (q.cmp(F(51).div(100)) < 0) break; }
        return [c, n];
      },
    },
    {
      id: '2.5-c02',
      level: 'challenge',
      type: 'fill',
      stem: '甲数的 $\\frac{2}{3}$ 等于乙数的 $\\frac{4}{5}$（甲、乙都是正整数）。',
      blanks: [
        { kind: 'num', label: '(1) 如果甲、乙两数的差是 7，甲数是', answer: '42' },
        { kind: 'nums', label: '(2) 如果甲、乙都是两位数，而且把甲的十位数字和个位数字交换后恰好得到乙，甲可能是（全部填出，用逗号隔开）', answer: ['54'] },
      ],
      explain: [
        '思路：用"份数"。甲的 $\\frac{2}{3}$ 和乙的 $\\frac{4}{5}$ 相等，把它看成 4 份（2 和 4 的公倍数），那么甲的 $\\frac{1}{3}$ 是 2 份，甲是 6 份；乙的 $\\frac{1}{5}$ 是 1 份，乙是 5 份。',
        '检验：甲 6 份的 $\\frac{2}{3}$ 是 4 份，乙 5 份的 $\\frac{4}{5}$ 是 4 份，相等。',
        '(1) 甲比乙多 1 份，1 份是 7，甲是 $6\\times 7=42$（乙是 35）。',
        '(2) 甲 = $6\\times k$，乙 = $5\\times k$（$k$ 是 1 份的大小），都是两位数，$k$ 是 2～16。甲比乙大，交换数字后变小，所以甲的十位数字比个位数字大。',
        '甲是 6 的倍数，个位是偶数；乙是 5 的倍数，个位是 0 或 5，而乙的个位就是甲的十位，所以甲的十位是 5（十位不能是 0）。甲在 50～59 之间、是 6 的倍数：54。对应 $k=9$，乙 $=45$，正好是 54 交换数字。只有 54。',
        '易错：以为甲多、乙少（看到 $\\frac{4}{5}$ 比 $\\frac{2}{3}$ 大），把份数弄反。',
      ],
      verify: () => {
        let a1 = 0;
        for (let a = 8; a < 200; a++) if (F(a).mul(F(2).div(3)).eq(F(a - 7).mul(F(4).div(5)))) a1 = a;
        const r = [];
        for (let a = 10; a <= 99; a++) for (let b = 10; b <= 99; b++) if (F(a).mul(F(2).div(3)).eq(F(b).mul(F(4).div(5))) && String(a).split('').reverse().join('') === String(b)) r.push(a);
        return [a1, r];
      },
    },
    {
      id: '2.5-c03',
      level: 'challenge',
      type: 'fill',
      stem: '求满足条件的最小的分数（分子、分母都是正整数）：',
      blanks: [
        { kind: 'num', label: '(1) 它乘 $\\frac{12}{35}$ 和乘 $\\frac{20}{21}$ 的结果都是整数', answer: '105/4' },
        { kind: 'num', label: '(2) 满足 (1) 的条件、而且大小在 100 和 300 之间（含 100 和 300）的最简分数有几个（整数也算）', answer: '8' },
      ],
      explain: [
        '思路：设这个分数约分后是 $\\frac{a}{b}$（$a$、$b$ 互素）。$\\frac{a}{b}\\times\\frac{12}{35}=\\frac{a\\times 12}{b\\times 35}$ 是整数，分母 $b\\times 35$ 要被分子"吃掉"。',
        '$a$ 和 $b$ 互素，12 和 35 也互素，所以 35 只能由 $a$ 约掉——$a$ 是 35 的倍数；$b$ 只能由 12 约掉——$b$ 是 12 的因数。',
        '(1) 同理，由 $\\frac{20}{21}$：$a$ 是 21 的倍数，$b$ 是 20 的因数。分数要最小，分子尽量小、分母尽量大：$a$ 取 35 和 21 的最小公倍数 105，$b$ 取 12 和 20 的最大公因数 4。答案 $\\frac{105}{4}$。',
        '(2) 由上面的分析，满足条件的最简分数，分子是 105 的倍数，分母是 4 的因数：1、2 或 4。按分母分类：',
        '分母 1：105、210（315 超过 300），2 个。分母 2：分子是 105 的奇数倍（否则能约分），$\\frac{315}{2}$、$\\frac{525}{2}$ 在范围内，2 个。分母 4：分子是 105 的奇数倍，在 400 和 1200 之间：525、735、945、1155，4 个。',
        '共 $2+2+4=8$ 个。',
        '检验 (1)：$\\frac{105}{4}\\times\\frac{12}{35}=9$，$\\frac{105}{4}\\times\\frac{20}{21}=25$。',
        '易错：分母取最小公倍数、分子取最大公因数，正好弄反；(2) 忘了检查最简，把 $\\frac{210}{2}$ 这类也算进去。',
      ],
      verify: () => {
        const g = (x, y) => (y ? g(y, x % y) : x);
        const ok = x => x.mul(F(12).div(35)).d === 1n && x.mul(F(20).div(21)).d === 1n;
        let best = null;
        let cnt = 0;
        for (let b = 1; b <= 20; b++) for (let a = 1; a <= 6000; a++) {
          if (g(a, b) !== 1) continue;
          const x = F(a).div(b);
          if (!ok(x)) continue;
          if (!best || x.cmp(best) < 0) best = x;
          if (x.cmp(100) >= 0 && x.cmp(300) <= 0) cnt++;
        }
        return [best, cnt];
      },
    },
    {
      id: '2.5-c04',
      level: 'challenge',
      type: 'fill',
      stem: '某商品每轮调价都是"先涨价 $\\frac{1}{3}$，再降价 $\\frac{1}{3}$"。',
      blanks: [
        { kind: 'num', label: '(1) 经过几轮后，价格第一次低于原价的一半', answer: '6' },
        { kind: 'num', label: '(2) 如果每轮改成"先涨价 $\\frac{1}{a}$，再降价 $\\frac{1}{a}$"（$a$ 是大于 1 的整数），要使 2 轮后价格不低于原价的 $\\frac{9}{10}$，$a$ 最小是多少', answer: '5' },
      ],
      explain: [
        '一轮后价格是原来的 $\\frac{4}{3}\\times\\frac{2}{3}=\\frac{8}{9}$。$k$ 轮后是原价的 $k$ 个 $\\frac{8}{9}$ 相乘：分子是 $k$ 个 8 相乘，分母是 $k$ 个 9 相乘。',
        '(1) 低于一半：分子的 2 倍比分母小。$k=5$：分子 32768，2 倍是 65536，分母 59049，还不够小；$k=6$：分子 262144，2 倍 524288，分母 531441，小了。所以是第 6 轮。',
        '(2) 先写出一轮的一般情况：先涨 $\\frac{1}{a}$ 是原来的 $\\frac{a+1}{a}$，再降 $\\frac{1}{a}$ 是它的 $\\frac{a-1}{a}$，一轮后是原来的 $\\frac{(a-1)\\times(a+1)}{a\\times a}$，即 $1-\\frac{1}{a\\times a}$（比如 $a=3$ 时是 $\\frac{8}{9}$）。',
        '2 轮后是 $\\left(1-\\frac{1}{a\\times a}\\right)$ 乘它自己。逐个试：$a=3$：$\\frac{64}{81}$，$64\\times 10=640<81\\times 9=729$，低于 $\\frac{9}{10}$；$a=4$：$\\frac{15}{16}\\times\\frac{15}{16}=\\frac{225}{256}$，$2250<2304$，还是低于；$a=5$：$\\frac{24}{25}\\times\\frac{24}{25}=\\frac{576}{625}$，$5760\\ge 5625$，不低于。所以 $a$ 最小是 5。',
        '易错：以为涨 $\\frac{1}{3}$ 再降 $\\frac{1}{3}$ 价格不变，永远不会低于原价。',
      ],
      verify: () => {
        let v = F(1);
        let n6 = 0;
        for (let i = 1; i < 40 && !n6; i++) { v = v.mul(F(4).div(3)).mul(F(2).div(3)); if (v.cmp(F(1).div(2)) < 0) n6 = i; }
        let a = 2;
        for (;; a++) { const r = F(1).add(F(1).div(a)).mul(F(1).sub(F(1).div(a))); if (r.mul(r).cmp(F(9).div(10)) >= 0) break; }
        return [n6, a];
      },
    },
    {
      id: '2.5-c05',
      level: 'challenge',
      type: 'fill',
      stem: '一串括号相乘：$\\left(1+\\frac{1}{2}\\right)\\times\\left(1+\\frac{1}{4}\\right)\\times\\left(1+\\frac{1}{16}\\right)\\times\\left(1+\\frac{1}{256}\\right)\\times\\cdots$，从第二个括号起，括号里的分母是前一个括号里分母乘它自己。',
      blanks: [
        { kind: 'num', label: '(1) 前 3 个括号相乘的结果是', answer: '255/128' },
        { kind: 'num', label: '(2) 前 $n$ 个括号相乘，结果与 2 的差第一次小于一百亿分之一（$\\frac{1}{10000000000}$）时，$n=$', answer: '6' },
      ],
      explain: [
        '思路：观察 $\\left(1-\\frac{1}{2}\\right)\\times\\left(1+\\frac{1}{2}\\right)=\\frac{1}{2}\\times\\frac{3}{2}=\\frac{3}{4}=1-\\frac{1}{4}$——两个括号一乘，变成"1 减去分母乘它自己分之一"。在式子前面乘上 $\\left(1-\\frac{1}{2}\\right)$，后面的括号就会一个接一个地"合并"。',
        '乘上 $\\frac{1}{2}$ 后：$\\left(1-\\frac{1}{2}\\right)\\left(1+\\frac{1}{2}\\right)=1-\\frac{1}{4}$，再乘 $\\left(1+\\frac{1}{4}\\right)$ 得 $\\frac{3}{4}\\times\\frac{5}{4}=\\frac{15}{16}=1-\\frac{1}{16}$，再乘 $\\left(1+\\frac{1}{16}\\right)$ 得 $\\frac{15}{16}\\times\\frac{17}{16}=\\frac{255}{256}=1-\\frac{1}{256}$……',
        '所以前 $n$ 个括号的积，它的 $\\frac{1}{2}$ 等于"1 减去一个单位分数"，这个单位分数的分母依次是 4、16、256、65536、……（每次乘它自己）。积本身是它的 2 倍。',
        '(1) 前 3 个：积的一半是 $\\frac{255}{256}$，积是 2 个 $\\frac{255}{256}$，即 $\\frac{255}{128}$。',
        '(2) 积 = 2 × (1 − 单位分数)，与 2 的差是这个单位分数的 2 倍。单位分数的分母依次是 4、16、256、65536，第 5 个是 65536 × 65536，第 6 个是它再乘它自己。',
        '前 5 个括号：差是 $\\frac{2}{65536\\times 65536}$，而 $65536\\times 65536<100000\\times 100000=10000000000$，所以差比一百亿分之一的 2 倍还大，不够小。',
        '前 6 个括号：分母是 $(65536\\times 65536)$ 乘它自己，比 $4000000000\\times 4000000000$ 还大，差远小于一百亿分之一。所以 $n=6$。',
        '易错：以为每多乘一个括号，差就缩小一半，要乘到第 10 个。其实分母是"自己乘自己"地变大，缩得非常快。',
      ],
      verify: () => {
        let p = F(1);
        let d = 2n;
        let n3 = null;
        let first = 0;
        for (let n = 1; n <= 6; n++) {
          p = p.mul(F(1).add(F(1).div(F(d))));
          d = d * d;
          if (n === 3) n3 = p;
          if (!first && F(2).sub(p).cmp(F(1).div(10000000000)) < 0) first = n;
        }
        return [n3, first];
      },
    },
  ],
});
