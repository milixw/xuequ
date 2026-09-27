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
      example: '$\\left(\\frac{1}{4}+\\frac{1}{6}\\right)\\times 12=\\frac{1}{4}\\times 12+\\frac{1}{6}\\times 12=3+2=5$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.5-b01',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{3}{4}\\times\\frac{8}{9}\\times 3$',
      blanks: [{ kind: 'num', answer: '2' }],
      explain: [
        '先约分：3 和 9 约去 3，4 和 8 约去 4，再把剩下的 3 和 9 约去的 3 抵消：$\\frac{3}{4}\\times\\frac{8}{9}=\\frac{2}{3}$，$\\frac{2}{3}\\times 3=2$。',
        '易错：分母也乘了 3，得 $\\frac{2}{9}$。',
      ],
      verify: () => F(3).div(4).mul(F(8).div(9)).mul(3),
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
      stem: '甲数是乙数的 $\\frac{3}{4}$，乙数是丙数的 $\\frac{2}{5}$。',
      blanks: [
        { kind: 'num', label: '(1) 甲数是丙数的几分之几', answer: '3/10' },
        { kind: 'num', label: '(2) 甲数比丙数少丙数的几分之几', answer: '7/10' },
      ],
      explain: [
        '把丙看作单位"1"：乙是 $\\frac{2}{5}$，甲是乙的 $\\frac{3}{4}$，即 $\\frac{2}{5}\\times\\frac{3}{4}=\\frac{3}{10}$。',
        '(1) 甲是丙的 $\\frac{3}{10}$。(2) 甲比丙少 $1-\\frac{3}{10}=\\frac{7}{10}$（单位"1"是丙）。',
        '易错：(1) 把两个分数相加得 $\\frac{23}{20}$。',
      ],
      verify: () => { const a = F(2).div(5).mul(F(3).div(4)); return [a, F(1).sub(a)]; },
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
      stem: '一块长方形菜地长 $2\\frac{1}{4}$ 米，宽是长的 $\\frac{2}{3}$。',
      blanks: [
        { kind: 'num', label: '(1) 面积是多少平方米', answer: '27/8' },
        { kind: 'num', label: '(2) 周长是多少米', answer: '15/2' },
      ],
      explain: [
        '宽：$\\frac{9}{4}\\times\\frac{2}{3}=\\frac{3}{2}$ 米。',
        '(1) 面积：$\\frac{9}{4}\\times\\frac{3}{2}=\\frac{27}{8}=3\\frac{3}{8}$ 平方米。',
        '(2) 周长：$\\left(\\frac{9}{4}+\\frac{3}{2}\\right)\\times 2=\\frac{15}{4}\\times 2=\\frac{15}{2}=7\\frac{1}{2}$ 米。',
        '易错：面积算成 长 × 长 × $\\frac{2}{3}$ 时漏乘；周长只加了一次长和宽。',
      ],
      verify: () => { const L = F(9).div(4); const W = L.mul(F(2).div(3)); return [L.mul(W), L.add(W).mul(2)]; },
    },
    {
      id: '2.5-e08',
      level: 'extended',
      type: 'fill',
      stem: '一个正整数的 $\\frac{3}{7}$ 是整数，它的 $\\frac{5}{6}$ 也是整数。',
      blanks: [
        { kind: 'num', label: '(1) 这个数最小是', answer: '42' },
        { kind: 'num', label: '(2) 1～200 中这样的数有几个', answer: '4' },
      ],
      explain: [
        '这个数乘 $\\frac{3}{7}$ 是整数：3 和 7 互素，这个数要能被 7 整除。乘 $\\frac{5}{6}$ 是整数：这个数要能被 6 整除。',
        '所以它是 6 和 7 的公倍数，也就是 42 的倍数。(1) 最小是 42。(2) 42、84、126、168，共 4 个。',
        '易错：以为要被 $3\\times 7$、$5\\times 6$ 整除。',
      ],
      verify: () => {
        const r = [];
        for (let n = 1; n <= 200; n++) { const a = F(n).mul(F(3).div(7)); const b = F(n).mul(F(5).div(6)); if (a.d === 1n && b.d === 1n) r.push(n); }
        return [r[0], r.length];
      },
    },
    {
      id: '2.5-e09',
      level: 'extended',
      type: 'fill',
      stem: '计算：',
      blanks: [
        { kind: 'num', label: '(1) $\\left(1-\\frac{1}{2}\\right)\\times\\left(1-\\frac{1}{3}\\right)\\times\\cdots\\times\\left(1-\\frac{1}{100}\\right)=$', answer: '1/100' },
        { kind: 'num', label: '(2) $\\left(1+\\frac{1}{2}\\right)\\times\\left(1+\\frac{1}{3}\\right)\\times\\cdots\\times\\left(1+\\frac{1}{99}\\right)=$', answer: '50' },
      ],
      explain: [
        '(1) 每个括号：$\\frac{1}{2}$、$\\frac{2}{3}$、……、$\\frac{99}{100}$，连乘时前一个的分母和后一个的分子约去，只剩 $\\frac{1}{100}$。',
        '(2) 每个括号：$\\frac{3}{2}$、$\\frac{4}{3}$、……、$\\frac{100}{99}$，同样约去，只剩 $\\frac{100}{2}=50$。',
        '易错：(2) 以为和 (1) 一样剩首尾，写成 $\\frac{100}{99}$。',
      ],
      verify: () => {
        let a = F(1);
        let b = F(1);
        for (let k = 2; k <= 100; k++) a = a.mul(F(1).sub(F(1).div(k)));
        for (let k = 2; k <= 99; k++) b = b.mul(F(1).add(F(1).div(k)));
        return [a, b];
      },
    },
    {
      id: '2.5-e10',
      level: 'extended',
      type: 'fill',
      stem: '一根电线长 120 米，第一次剪去全长的 $\\frac{3}{8}$ 还多 6 米，第二次剪去余下的 $\\frac{1}{3}$。还剩多少米？',
      blanks: [{ kind: 'num', answer: '46', suffix: '米' }],
      explain: [
        '第一次剪去 $120\\times\\frac{3}{8}+6=45+6=51$ 米，余下 $120-51=69$ 米。',
        '第二次剪去余下的 $\\frac{1}{3}$：$69\\times\\frac{1}{3}=23$ 米，还剩 $69-23=46$ 米。',
        '易错：第一次只剪去 45 米，忘了"还多 6 米"；第二次按全长 120 米的 $\\frac{1}{3}$ 算。',
      ],
      verify: () => { let r = F(120); r = r.sub(r.mul(F(3).div(8))).sub(6); return r.sub(r.mul(F(1).div(3))); },
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
        { kind: 'num', label: '(1) 如果甲、乙两数的和是 99，甲数是', answer: '54' },
        { kind: 'num', label: '(2) 如果甲、乙都是两位数，这样的甲、乙一共有几组', answer: '15' },
      ],
      explain: [
        '思路：用"份数"。甲的 $\\frac{2}{3}$ 和乙的 $\\frac{4}{5}$ 相等，把它看成 4 份（2 和 4 的公倍数），那么甲的 $\\frac{1}{3}$ 是 2 份，甲是 6 份；乙的 $\\frac{1}{5}$ 是 1 份，乙是 5 份。',
        '检验：甲 6 份的 $\\frac{2}{3}$ 是 4 份，乙 5 份的 $\\frac{4}{5}$ 是 4 份，相等。',
        '(1) 甲 + 乙 = 11 份 = 99，1 份是 9，甲是 54（乙是 45）。',
        '(2) 甲 = $6\\times k$，乙 = $5\\times k$（$k$ 是 1 份的大小）。都是两位数：$5\\times k\\ge 10$，$k\\ge 2$；$6\\times k\\le 99$，$k\\le 16$。$k$ 取 2～16，共 15 组。',
        '易错：以为甲多、乙少（看到 $\\frac{4}{5}$ 比 $\\frac{2}{3}$ 大），把份数弄反。',
      ],
      verify: () => {
        let a1 = 0;
        for (let a = 1; a < 99; a++) if (F(a).mul(F(2).div(3)).eq(F(99 - a).mul(F(4).div(5)))) a1 = a;
        let c = 0;
        for (let a = 10; a <= 99; a++) for (let b = 10; b <= 99; b++) if (F(a).mul(F(2).div(3)).eq(F(b).mul(F(4).div(5)))) c++;
        return [a1, c];
      },
    },
    {
      id: '2.5-c03',
      level: 'challenge',
      type: 'fill',
      stem: '求满足条件的最小的分数（分子、分母都是正整数）：',
      blanks: [
        { kind: 'num', label: '(1) 它乘 $\\frac{12}{35}$ 和乘 $\\frac{20}{21}$ 的结果都是整数', answer: '105/4' },
        { kind: 'num', label: '(2) 它乘 $\\frac{12}{35}$、$\\frac{20}{21}$、$\\frac{18}{49}$ 的结果都是整数', answer: '735/2' },
      ],
      explain: [
        '思路：设这个分数约分后是 $\\frac{a}{b}$（$a$、$b$ 互素）。$\\frac{a}{b}\\times\\frac{12}{35}=\\frac{a\\times 12}{b\\times 35}$ 是整数，分母 $b\\times 35$ 要被分子"吃掉"。',
        '$a$ 和 $b$ 互素，12 和 35 也互素，所以 35 只能由 $a$ 约掉——$a$ 是 35 的倍数；$b$ 只能由 12 约掉——$b$ 是 12 的因数。',
        '(1) 同理，由 $\\frac{20}{21}$：$a$ 是 21 的倍数，$b$ 是 20 的因数。分数要最小，分子尽量小、分母尽量大：$a$ 取 35 和 21 的最小公倍数 105，$b$ 取 12 和 20 的最大公因数 4。答案 $\\frac{105}{4}$。',
        '(2) 再加上 $\\frac{18}{49}$：$a$ 是 35、21、49 的最小公倍数 $3\\times 5\\times 7\\times 7=735$，$b$ 是 12、20、18 的最大公因数 2。答案 $\\frac{735}{2}$。',
        '检验 (1)：$\\frac{105}{4}\\times\\frac{12}{35}=9$，$\\frac{105}{4}\\times\\frac{20}{21}=25$。',
        '易错：分母取最小公倍数、分子取最大公因数，正好弄反。',
      ],
      verify: () => {
        const find = fs => {
          let best = null;
          for (let b = 1; b <= 20; b++) for (let a = 1; a <= 1500; a++) {
            const x = F(a).div(b);
            if (fs.every(f => x.mul(f).d === 1n) && (!best || x.cmp(best) < 0)) best = x;
          }
          return best;
        };
        return [find([F(12).div(35), F(20).div(21)]), find([F(12).div(35), F(20).div(21), F(18).div(49)])];
      },
    },
    {
      id: '2.5-c04',
      level: 'challenge',
      type: 'fill',
      stem: '某商品每轮调价都是"先涨价 $\\frac{1}{3}$，再降价 $\\frac{1}{3}$"。',
      blanks: [
        { kind: 'num', label: '(1) 经过几轮后，价格第一次低于原价的一半', answer: '6' },
        { kind: 'num', label: '(2) 经过几轮后，价格第一次低于原价的 $\\frac{1}{4}$', answer: '12' },
      ],
      explain: [
        '一轮后价格是原来的 $\\frac{4}{3}\\times\\frac{2}{3}=\\frac{8}{9}$。$k$ 轮后是原价的 $k$ 个 $\\frac{8}{9}$ 相乘：分子是 $k$ 个 8 相乘，分母是 $k$ 个 9 相乘。',
        '(1) 低于一半：分子的 2 倍比分母小。$k=5$：分子 32768，2 倍是 65536，分母 59049，还不够小；$k=6$：分子 262144，2 倍 524288，分母 531441，小了。所以是第 6 轮。',
        '(2) 低于 $\\frac{1}{4}$：分子的 4 倍比分母小。可以借用 (1)：两轮 6 轮连起来，每 6 轮都乘上一个比 $\\frac{1}{2}$ 小的数，所以 12 轮后一定低于 $\\frac{1}{4}$。',
        '11 轮还不行：11 轮时分子是 8589934592，4 倍是 34359738368；分母是 31381059609，分子的 4 倍更大，所以还没有低于 $\\frac{1}{4}$。',
        '所以是第 12 轮。易错：以为涨 $\\frac{1}{3}$ 再降 $\\frac{1}{3}$ 价格不变。',
      ],
      verify: () => {
        let v = F(1);
        let a = 0;
        let b = 0;
        for (let i = 1; i < 40; i++) { v = v.mul(F(8).div(9)); if (!a && v.cmp(F(1).div(2)) < 0) a = i; if (!b && v.cmp(F(1).div(4)) < 0) b = i; }
        return [a, b];
      },
    },
    {
      id: '2.5-c05',
      level: 'challenge',
      type: 'fill',
      stem: '计算：$\\left(1+\\frac{1}{2}+\\cdots+\\frac{1}{2025}\\right)\\times\\left(\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2026}\\right)-\\left(1+\\frac{1}{2}+\\cdots+\\frac{1}{2026}\\right)\\times\\left(\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2025}\\right)$',
      blanks: [{ kind: 'num', answer: '1/2026' }],
      explain: [
        '思路：直接算不可能。四个括号里有大段相同的部分，把相同的部分看成一个整体。',
        '设 $A=\\frac{1}{2}+\\frac{1}{3}+\\cdots+\\frac{1}{2025}$。那么四个括号分别是 $1+A$、$A+\\frac{1}{2026}$、$1+A+\\frac{1}{2026}$、$A$。',
        '原式 $=(1+A)\\times\\left(A+\\frac{1}{2026}\\right)-\\left(1+A+\\frac{1}{2026}\\right)\\times A$。',
        '用分配律展开：前一部分 $=(1+A)\\times A+(1+A)\\times\\frac{1}{2026}$；后一部分 $=(1+A)\\times A+\\frac{1}{2026}\\times A$。',
        '相减：$(1+A)\\times\\frac{1}{2026}-A\\times\\frac{1}{2026}=\\frac{1}{2026}$。',
        '易错：想把括号里的和先算出来；或者展开时漏项。',
      ],
      verify: () => {
        let A = F(0);
        for (let k = 2; k <= 2025; k++) A = A.add(F(1).div(k));
        const t = F(1).div(2026);
        return F(1).add(A).mul(A.add(t)).sub(F(1).add(A).add(t).mul(A));
      },
    },
  ],
});
