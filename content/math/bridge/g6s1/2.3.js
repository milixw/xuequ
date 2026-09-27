'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 2.3 分数的大小比较
// 知识范围：同分母、同分子分数的比较；异分母分数通分后比较（或化成同分子）；借助 1、1/2 等中间数比较；
//           带分数、假分数的比较；可以使用第 1 章和 2.1、2.2 的全部内容
// 还没学：分数的加减乘除运算（2.4～2.6）、分数与小数互化（2.7）、负数。
//         需要"差多少"时，用"差几个分数单位"或者通分后数小格来说明，不写分数减法
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/2.3',
  title: '分数的大小比较',
  review: { status: 'pending' },
  audit: { blind: '2026-09-27', rounds: 4, note: '子代理盲解复核四轮，答案全部一致；第 1 轮按意见重做 e01、e03、e04 和 c01、c02、c03、c05，第 2～3 轮消除 e03、e08 与 c03 的模板重复，第 4 轮判定整节通过' },

  intro: [
    {
      title: '同分母、同分子',
      body: '分母相同，分数单位一样大，**分子大的分数大**；分子相同，取的份数一样多，**分母小的分数大**（分得越少，每份越大）。',
      example: '$\\frac{4}{11}<\\frac{6}{11}$；$\\frac{4}{11}>\\frac{4}{13}$。',
    },
    {
      title: '异分母分数',
      body: '分子、分母都不同时，可以**通分**化成同分母再比；如果分子容易化成相同的，也可以化成**同分子**再比。',
      example: '$\\frac{2}{7}$ 和 $\\frac{3}{10}$：通分成 $\\frac{20}{70}$ 和 $\\frac{21}{70}$，所以 $\\frac{2}{7}<\\frac{3}{10}$。',
      pitfall: '不能只看分子或只看分母，比如 $\\frac{3}{10}$ 的分母比 $\\frac{2}{7}$ 大，但它反而更大。',
    },
    {
      title: '借助中间数',
      body: '真分数比 1 小，假分数不比 1 小；一个分数的分子的 2 倍比分母小，它就比 $\\frac{1}{2}$ 小。和 1 很接近的真分数，可以看"离 1 还差几个分数单位"：差一样多时，分数单位越小，分数越大。',
      example: '$\\frac{13}{14}$ 离 1 差 1 个 $\\frac{1}{14}$，$\\frac{16}{17}$ 离 1 差 1 个 $\\frac{1}{17}$，$\\frac{1}{17}$ 更小，所以 $\\frac{16}{17}$ 更大。',
    },
    {
      title: '带分数和假分数',
      body: '带分数先比整数部分，整数部分相同再比分数部分。假分数可以先化成带分数再比。',
      example: '$\\frac{13}{4}=3\\frac{1}{4}$，$\\frac{17}{6}=2\\frac{5}{6}$，整数部分 $3>2$，所以 $\\frac{13}{4}>\\frac{17}{6}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.3-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列分数中，最大的是（ ）',
      options: ['$\\frac{5}{6}$', '$\\frac{7}{9}$', '$\\frac{11}{12}$', '$\\frac{3}{4}$'],
      answer: 2,
      explain: [
        '四个都是真分数，看离 1 差多少：$\\frac{5}{6}$ 差 1 个 $\\frac{1}{6}$，$\\frac{7}{9}$ 差 2 个 $\\frac{1}{9}$，$\\frac{11}{12}$ 差 1 个 $\\frac{1}{12}$，$\\frac{3}{4}$ 差 1 个 $\\frac{1}{4}$。',
        '也可以通分成分母 36：$\\frac{30}{36}$、$\\frac{28}{36}$、$\\frac{33}{36}$、$\\frac{27}{36}$，最大的是 $\\frac{11}{12}$。选 C。',
        '易错：看 B 的分子、分母"都比较大"就以为它大。',
      ],
      verify: () => {
        const xs = ['5/6', '7/9', '11/12', '3/4'].map(x => F(x));
        let m = 0;
        xs.forEach((x, i) => { if (x.cmp(xs[m]) > 0) m = i; });
        return m;
      },
    },
    {
      id: '2.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '分母是 12，比 $\\frac{1}{3}$ 大、比 $\\frac{3}{4}$ 小的最简分数有哪些？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['5/12', '7/12'] }],
      explain: [
        '通分成分母 12：$\\frac{1}{3}=\\frac{4}{12}$，$\\frac{3}{4}=\\frac{9}{12}$。分子要在 4 和 9 之间：5、6、7、8。',
        '要是最简分数，分子要和 12 互素：6、8 和 12 有公因数，去掉。',
        '剩下 $\\frac{5}{12}$、$\\frac{7}{12}$。易错：把 $\\frac{6}{12}$、$\\frac{8}{12}$ 也算进去。',
      ],
      verify: () => {
        const g = (x, y) => (y ? g(y, x % y) : x);
        const r = [];
        for (let a = 1; a < 12; a++) { const v = F(a).div(12); if (g(a, 12) === 1 && v.cmp(F(1).div(3)) > 0 && v.cmp(F(3).div(4)) < 0) r.push(v); }
        return r;
      },
    },
    {
      id: '2.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '比较大小：',
      blanks: [
        { kind: 'text', label: '(1) $\\frac{7}{8}$ ○ $\\frac{8}{9}$', answer: '<', options: ['<', '>', '='] },
        { kind: 'text', label: '(2) $\\frac{13}{15}$ ○ $\\frac{26}{31}$', answer: '>', options: ['<', '>', '='] },
      ],
      explain: [
        '(1) $\\frac{7}{8}$ 离 1 差 1 个 $\\frac{1}{8}$，$\\frac{8}{9}$ 离 1 差 1 个 $\\frac{1}{9}$，$\\frac{1}{9}$ 更小，所以 $\\frac{7}{8}<\\frac{8}{9}$。',
        '(2) 化成同分子：$\\frac{13}{15}=\\frac{26}{30}$，分子相同，分母 30 比 31 小，所以 $\\frac{26}{30}>\\frac{26}{31}$，即 $\\frac{13}{15}>\\frac{26}{31}$。',
        '易错：(1) 以为分母大的分数小；(2) 通分成分母 465，计算量大容易出错。',
      ],
      verify: () => {
        const s = (a, b) => { const c = F(a).cmp(F(b)); return c < 0 ? '<' : c > 0 ? '>' : '='; };
        return [s('7/8', '8/9'), s('13/15', '26/31')];
      },
    },
    {
      id: '2.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\frac{3}{5}$ 和 $\\frac{4}{5}$ 之间（不含这两个数），分母是 20 的分数有几个？',
      blanks: [{ kind: 'num', answer: '3', suffix: '个' }],
      explain: [
        '通分成分母 20：$\\frac{3}{5}=\\frac{12}{20}$，$\\frac{4}{5}=\\frac{16}{20}$。',
        '分母是 20、在它们之间，分子是 13、14、15，共 3 个。',
        '易错：以为 $\\frac{3}{5}$ 和 $\\frac{4}{5}$ 之间"没有分数"，或者把 12、16 也算进去。',
      ],
      verify: () => {
        let c = 0;
        for (let a = 1; a < 20; a++) { const v = F(a).div(20); if (v.cmp(F(3).div(5)) > 0 && v.cmp(F(4).div(5)) < 0) c++; }
        return c;
      },
    },
    {
      id: '2.3-b05',
      level: 'basic',
      type: 'choice',
      stem: '$2\\frac{2}{3}$、$\\frac{11}{4}$、$\\frac{23}{9}$ 三个数中，最大的是（ ）',
      options: ['$2\\frac{2}{3}$', '$\\frac{11}{4}$', '$\\frac{23}{9}$', '一样大'],
      answer: 1,
      explain: [
        '把假分数化成带分数：$\\frac{11}{4}=2\\frac{3}{4}$，$\\frac{23}{9}=2\\frac{5}{9}$。',
        '整数部分都是 2，比分数部分 $\\frac{2}{3}$、$\\frac{3}{4}$、$\\frac{5}{9}$：通分成分母 36 得 $\\frac{24}{36}$、$\\frac{27}{36}$、$\\frac{20}{36}$。',
        '最大的是 $\\frac{11}{4}$。选 B。易错：看 $\\frac{23}{9}$ 分子最大就选 C。',
      ],
      verify: () => {
        const xs = [F(8).div(3), F(11).div(4), F(23).div(9)];
        let m = 0;
        xs.forEach((x, i) => { if (x.cmp(xs[m]) > 0) m = i; });
        return m;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '2.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '比较 $\\frac{4}{7}$、$\\frac{8}{15}$、$\\frac{12}{23}$、$\\frac{6}{11}$、$\\frac{3}{5}$、$\\frac{5}{9}$ 的大小。',
      blanks: [
        { kind: 'num', label: '(1) 最小的是', answer: '12/23' },
        { kind: 'num', label: '(2) 第三大的是', answer: '5/9' },
      ],
      explain: [
        '分母各不相同，通分很麻烦；分子 4、8、12、6、3 的最小公倍数是 24，化成同分子更方便。',
        '$\\frac{4}{7}=\\frac{24}{42}$，$\\frac{8}{15}=\\frac{24}{45}$，$\\frac{12}{23}=\\frac{24}{46}$，$\\frac{6}{11}=\\frac{24}{44}$，$\\frac{3}{5}=\\frac{24}{40}$。',
        '分子相同，分母越大分数越小：$\\frac{24}{46}<\\frac{24}{45}<\\frac{24}{44}<\\frac{24}{42}<\\frac{24}{40}$。',
        '还剩 $\\frac{5}{9}$，它的分子 5 不能化成 24。单独和相邻的数比：$\\frac{5}{9}$ 与 $\\frac{4}{7}$ 通分得 $\\frac{35}{63}<\\frac{36}{63}$；$\\frac{5}{9}$ 与 $\\frac{6}{11}$ 通分得 $\\frac{55}{99}>\\frac{54}{99}$。所以它在 $\\frac{6}{11}$ 和 $\\frac{4}{7}$ 之间。',
        '从小到大：$\\frac{12}{23}<\\frac{8}{15}<\\frac{6}{11}<\\frac{5}{9}<\\frac{4}{7}<\\frac{3}{5}$。最小的是 $\\frac{12}{23}$，第三大的是 $\\frac{5}{9}$。',
      ],
      verify: () => {
        const xs = ['4/7', '8/15', '12/23', '6/11', '3/5', '5/9'].map(x => F(x));
        xs.sort((a, b) => a.cmp(b));
        return [xs[0], xs[3]];
      },
    },
    {
      id: '2.3-e02',
      level: 'extended',
      type: 'multi',
      stem: '下列说法中**一定正确**的有（多选，$a$、$b$ 都是正整数）',
      options: [
        '真分数 $\\frac{a}{b}$ 的分子、分母都加上 1，分数变大',
        '假分数 $\\frac{a}{b}$（$a>b$）的分子、分母都加上 1，分数变小',
        '分数 $\\frac{a}{b}$ 的分子、分母都乘 2，分数变大',
        '分子相同的两个分数，分母大的分数大',
      ],
      answer: [0, 1],
      explain: [
        'A：真分数 $\\frac{a}{b}$ 离 1 差 $b-a$ 个 $\\frac{1}{b}$；加 1 后是 $\\frac{a+1}{b+1}$，离 1 还是差 $b-a$ 个分数单位，但分数单位变成了更小的 $\\frac{1}{b+1}$，差得更少，所以变大。例如 $\\frac{2}{5}<\\frac{3}{6}$。',
        'B：假分数 $\\frac{a}{b}$ 比 1 多 $a-b$ 个 $\\frac{1}{b}$；加 1 后比 1 多 $a-b$ 个 $\\frac{1}{b+1}$，多得更少，所以变小。例如 $\\frac{5}{2}>\\frac{6}{3}$。',
        'C：分子、分母同乘一个数，分数大小不变，错误。D：分子相同，分母大的分数反而小，错误。',
      ],
      verify: () => {
        const ok = [true, true, true, true];
        for (let a = 1; a <= 20; a++) for (let b = 1; b <= 20; b++) {
          const v = F(a).div(b);
          const up = F(a + 1).div(b + 1);
          if (a < b && up.cmp(v) <= 0) ok[0] = false;
          if (a > b && up.cmp(v) >= 0) ok[1] = false;
          if (F(2 * a).div(2 * b).cmp(v) <= 0) ok[2] = false;
          for (let c = 1; c <= 20; c++) if (c > b && F(a).div(c).cmp(v) <= 0) ok[3] = false;
        }
        return ok.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '2.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\square$ 里填正整数：',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{1}{4}<\\frac{\\square}{18}<\\frac{2}{5}$，$\\square$ 有几种填法', answer: '3' },
        { kind: 'num', label: '(2) $\\frac{1}{3}<\\frac{4}{\\square}<\\frac{3}{7}$，$\\square$ 有几种填法', answer: '2' },
      ],
      explain: [
        '(1) 通分成分母 180：$\\frac{1}{4}=\\frac{45}{180}$，$\\frac{2}{5}=\\frac{72}{180}$，$\\frac{\\square}{18}=\\frac{\\square\\times 10}{180}$。$\\square\\times 10$ 在 45 和 72 之间，$\\square$ 是 5、6、7，3 种。',
        '(2) 三个分数的分子是 1、4、3，最小公倍数是 12，都化成分子 12：$\\frac{1}{3}=\\frac{12}{36}$，$\\frac{3}{7}=\\frac{12}{28}$，$\\frac{4}{\\square}=\\frac{12}{3\\times\\square}$。',
        '分子相同，分母小的大：$3\\times\\square$ 要比 28 大、比 36 小，是 30 或 33，$\\square$ 是 10 或 11，2 种。',
        '易错：只把 $\\frac{4}{\\square}$ 和 $\\frac{1}{3}$ 化成同分子 4，另一边的 $\\frac{3}{7}$ 化不过去；或者按分母 $3<\\square<7$ 来想。',
      ],
      verify: () => {
        let a = 0;
        let b = 0;
        for (let x = 1; x < 100; x++) {
          const v = F(x).div(18);
          if (v.cmp(F(1).div(4)) > 0 && v.cmp(F(2).div(5)) < 0) a++;
          const w = F(4).div(x);
          if (w.cmp(F(1).div(3)) > 0 && w.cmp(F(3).div(7)) < 0) b++;
        }
        return [a, b];
      },
    },
    {
      id: '2.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '比较大小：',
      blanks: [
        { kind: 'text', label: '(1) $\\frac{2025}{2026}$ ○ $\\frac{2026}{2027}$', answer: '<', options: ['<', '>', '='] },
        { kind: 'text', label: '(2) $\\frac{2026}{2028}$ ○ $\\frac{2025}{2027}$', answer: '>', options: ['<', '>', '='] },
      ],
      explain: [
        '(1) 两个都是真分数，都离 1 差 1 个分数单位：分别差 $\\frac{1}{2026}$ 和 $\\frac{1}{2027}$。后者更小，差得更少，所以 $\\frac{2025}{2026}<\\frac{2026}{2027}$。',
        '(2) 两个都离 1 差 **2 个**分数单位：分别差 2 个 $\\frac{1}{2027}$ 和 2 个 $\\frac{1}{2028}$。$\\frac{1}{2028}$ 更小，后者差得少，所以 $\\frac{2026}{2028}>\\frac{2025}{2027}$。',
        '易错：(2) 看到 $\\frac{2026}{2028}$ 能约分，约成 $\\frac{1013}{1014}$ 后反而不好比；其实不用约分，直接数差几个分数单位。',
      ],
      verify: () => {
        const s = (a, b) => { const c = F(a).cmp(F(b)); return c < 0 ? '<' : c > 0 ? '>' : '='; };
        return [s('2025/2026', '2026/2027'), s('2026/2028', '2025/2027')];
      },
    },
    {
      id: '2.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '分母小于 20 的分数中（分子、分母都是正整数）：',
      blanks: [
        { kind: 'num', label: '(1) 比 $\\frac{1}{2}$ 小、而且最接近 $\\frac{1}{2}$ 的是', answer: '9/19' },
        { kind: 'num', label: '(2) 比 $\\frac{1}{2}$ 大、而且最接近 $\\frac{1}{2}$ 的是', answer: '10/19' },
      ],
      explain: [
        '把分数 $\\frac{a}{b}$ 和 $\\frac{1}{2}$ 通分成分母 $2\\times b$：$\\frac{2\\times a}{2\\times b}$ 和 $\\frac{b}{2\\times b}$。两者相差 $2\\times a$ 和 $b$ 的差个"$\\frac{1}{2\\times b}$"。',
        '分子 $2\\times a$ 是偶数，要和 $b$ 差得最少：$b$ 是奇数时最少差 1 个；$b$ 是偶数时 $2\\times a$ 不等于 $b$，至少差 2 个。',
        '所以最接近时相差 1 个 $\\frac{1}{2\\times b}$，$b$ 越大这一份越小。$b$ 取小于 20 的最大奇数 19：比 $\\frac{1}{2}$ 小的是 $\\frac{9}{19}$，比 $\\frac{1}{2}$ 大的是 $\\frac{10}{19}$。',
        '易错：以为分母越大越好，取 $b=18$，得 $\\frac{8}{18}$——它和 $\\frac{1}{2}$ 相差 2 个 $\\frac{1}{36}$，即 $\\frac{1}{18}$，比 $\\frac{1}{38}$ 大。',
      ],
      verify: () => {
        let lo = F(0);
        let hi = F(10);
        const h = F(1).div(2);
        for (let b = 1; b < 20; b++) for (let a = 1; a < 2 * b; a++) {
          const v = F(a).div(b);
          if (v.cmp(h) < 0 && v.cmp(lo) > 0) lo = v;
          if (v.cmp(h) > 0 && v.cmp(hi) < 0) hi = v;
        }
        return [lo, hi];
      },
    },
    {
      id: '2.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\square$ 里填正整数，求 $\\square$ 最大能填几：',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{7}{\\square}>\\frac{3}{8}$', answer: '18' },
        { kind: 'num', label: '(2) $\\frac{\\square}{9}<\\frac{5}{7}$', answer: '6' },
      ],
      explain: [
        '(1) 化成同分子 21：$\\frac{7}{\\square}=\\frac{21}{3\\times\\square}$，$\\frac{3}{8}=\\frac{21}{56}$。分子相同，分母小的大：$3\\times\\square<56$，$\\square$ 最大是 18（$3\\times 18=54$，$3\\times 19=57$）。',
        '(2) 通分成分母 63：$\\frac{\\square}{9}=\\frac{7\\times\\square}{63}$，$\\frac{5}{7}=\\frac{45}{63}$。$7\\times\\square<45$，$\\square$ 最大是 6。',
        '易错：(1) 以为 $\\square$ 越大分数越大。',
      ],
      verify: () => {
        let a = 0;
        let b = 0;
        for (let x = 1; x < 200; x++) {
          if (F(7).div(x).cmp(F(3).div(8)) > 0) a = x;
          if (F(x).div(9).cmp(F(5).div(7)) < 0) b = x;
        }
        return [a, b];
      },
    },
    {
      id: '2.3-e07',
      level: 'extended',
      type: 'fill',
      stem: '把 $\\frac{5}{11}$、$\\frac{10}{21}$、$\\frac{15}{32}$、$\\frac{20}{43}$ 从大到小排列。',
      blanks: [
        { kind: 'num', label: '(1) 最大的是', answer: '10/21' },
        { kind: 'num', label: '(2) 最小的是', answer: '5/11' },
      ],
      explain: [
        '分子 5、10、15、20 的最小公倍数是 60，化成同分子：$\\frac{60}{132}$、$\\frac{60}{126}$、$\\frac{60}{128}$、$\\frac{60}{129}$。',
        '分母越小分数越大：126 < 128 < 129 < 132。',
        '从大到小是 $\\frac{10}{21}>\\frac{15}{32}>\\frac{20}{43}>\\frac{5}{11}$。最大 $\\frac{10}{21}$，最小 $\\frac{5}{11}$。',
        '易错：以为分子、分母都在变大，分数也跟着一直变大或变小。',
      ],
      verify: () => {
        const xs = ['5/11', '10/21', '15/32', '20/43'].map(x => F(x));
        xs.sort((a, b) => a.cmp(b));
        return [xs[xs.length - 1], xs[0]];
      },
    },
    {
      id: '2.3-e08',
      level: 'extended',
      type: 'fill',
      stem: '一个分数的分母比分子大 7，这个分数比 $\\frac{3}{5}$ 大、比 $\\frac{2}{3}$ 小。',
      blanks: [
        { kind: 'num', label: '(1) 这样的分数有几个', answer: '3' },
        { kind: 'num', label: '(2) 其中最大的一个是', answer: '13/20' },
      ],
      explain: [
        '设分子是 $a$，分母是 $a+7$。',
        '比 $\\frac{3}{5}$ 大：通分比较，$5\\times a>3\\times(a+7)$，即 2 个 $a$ 比 21 大，$a\\ge 11$。',
        '比 $\\frac{2}{3}$ 小：$3\\times a<2\\times(a+7)$，即 $a$ 比 14 小，$a\\le 13$。',
        '$a$ 是 11、12、13，分数是 $\\frac{11}{18}$、$\\frac{12}{19}$、$\\frac{13}{20}$，共 3 个。',
        '分母与分子的差一定时，分子越大，离 1 差的 7 个分数单位越小，分数越大。最大的是 $\\frac{13}{20}$。',
      ],
      verify: () => {
        const r = [];
        for (let a = 1; a < 100; a++) { const f = F(a).div(a + 7); if (f.cmp(F(3).div(5)) > 0 && f.cmp(F(2).div(3)) < 0) r.push(f); }
        r.sort((x, y) => x.cmp(y));
        return [r.length, r[r.length - 1]];
      },
    },
    {
      id: '2.3-e09',
      level: 'extended',
      type: 'fill',
      stem: '把 $\\frac{1}{2}$、$\\frac{2}{3}$、$\\frac{3}{4}$、……、$\\frac{99}{100}$ 和 $\\frac{100}{99}$、$\\frac{99}{98}$、……、$\\frac{3}{2}$、$\\frac{2}{1}$ 这些分数混在一起，从小到大排列。',
      blanks: [
        { kind: 'num', label: '(1) 一共有几个分数', answer: '198' },
        { kind: 'num', label: '(2) 第 100 个是', answer: '100/99' },
      ],
      explain: [
        '(1) 第一串分子从 1 到 99，有 99 个；第二串分子从 100 到 2，也有 99 个，共 198 个。',
        '(2) 第一串都是真分数，比 1 小；第二串都是假分数，比 1 大。所以前 99 个是第一串，第 100 个是第二串里最小的。',
        '第二串 $\\frac{n+1}{n}=1\\frac{1}{n}$，$n$ 越大越接近 1、越小，最小的是 $\\frac{100}{99}=1\\frac{1}{99}$。',
        '易错：以为第二串里 $\\frac{2}{1}$ 最小（分子最小）。',
      ],
      verify: () => {
        const xs = [];
        for (let n = 1; n <= 99; n++) { xs.push(F(n).div(n + 1)); xs.push(F(n + 1).div(n)); }
        xs.sort((a, b) => a.cmp(b));
        return [xs.length, xs[99]];
      },
    },
    {
      id: '2.3-e10',
      level: 'extended',
      type: 'fill',
      stem: '分数 $\\frac{7}{12}$ 的分子加上 $a$、分母加上 $b$（$a$、$b$ 都是 1～9 中的整数），得到的新分数比 $\\frac{7}{12}$ 大。这样的 $a$、$b$ 一共有几组？',
      blanks: [{ kind: 'num', answer: '59', suffix: '组' }],
      explain: [
        '通分比较：$\\frac{7+a}{12+b}$ 和 $\\frac{7}{12}$ 通分成分母 $12\\times(12+b)$，分子分别是 $12\\times(7+a)$ 和 $7\\times(12+b)$。',
        '$12\\times(7+a)=84+12\\times a$，$7\\times(12+b)=84+7\\times b$。新分数大，就是 $12\\times a>7\\times b$。',
        '按 $a$ 分类：$a=1$，$7\\times b<12$，$b=1$，1 组；$a=2$，$7\\times b<24$，$b\\le 3$，3 组；$a=3$，$b\\le 5$，5 组；$a=4$，$b\\le 6$，6 组；$a=5$，$b\\le 8$，8 组；$a=6$～9，$b$ 取 1～9 都行，各 9 组。',
        '共 $1+3+5+6+8+9\\times 4=59$ 组。',
        '易错：以为只要 $a\\ge b$ 就变大，或者只要分子加得多就行。',
      ],
      verify: () => {
        let c = 0;
        for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) if (F(7 + a).div(12 + b).cmp(F(7).div(12)) > 0) c++;
        return c;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '分数 $\\frac{a}{b}$（$a$、$b$ 是正整数）比 $\\frac{5}{9}$ 大、比 $\\frac{4}{7}$ 小。',
      blanks: [
        { kind: 'num', label: '(1) 分母 $b$ 最小时，这个分数是', answer: '9/16' },
        { kind: 'num', label: '(2) 分母 $b$ 不超过 35 的这样的最简分数有几个', answer: '5' },
      ],
      explain: [
        '思路：把条件写成关于 $a$ 的范围，再对 $b$ 从小到大试。$\\frac{5}{9}<\\frac{a}{b}$ 通分得 $5\\times b<9\\times a$；$\\frac{a}{b}<\\frac{4}{7}$ 得 $7\\times a<4\\times b$。',
        '所以 $9\\times a$ 要比 $5\\times b$ 大，$7\\times a$ 要比 $4\\times b$ 小。$b=10$：$9\\times a>50$，$a\\ge 6$，但 $7\\times 6=42>40$，不行。',
        '$b=11$～15 同样检查：$b=11$ 要 $a\\ge 7$，$7\\times 7=49>44$；$b=12$ 要 $a\\ge 7$，$49>48$；$b=13$ 要 $a\\ge 8$，$56>52$；$b=14$ 要 $a\\ge 8$，$56=56$ 不是"小于"；$b=15$ 要 $a\\ge 9$，$63>60$。都不行。（$b<10$ 时同样找不到。）',
        '$b=16$：$9\\times a>80$，$a\\ge 9$；$7\\times 9=63<64$，可以。所以 (1) 是 $\\frac{9}{16}$。',
        '观察：$\\frac{9}{16}$ 的分子是 5 + 4，分母是 9 + 7，这是找"两个分数之间的分数"的一个好办法。',
        '(2) 两个数通分成分母 63 是 $\\frac{35}{63}$ 和 $\\frac{36}{63}$，只差 1 个 $\\frac{1}{63}$，非常接近。分母是 $b$ 时，$\\frac{a}{b}$ 每差 1 就差 $\\frac{1}{b}$，比 $\\frac{1}{63}$ 大，所以每个分母 $b$ 最多只有一个 $a$ 落在两数之间，而且由 (1)，$b$ 至少是 16。',
        '对 $b=16$～35 逐个检验"$9\\times a>5\\times b$ 且 $7\\times a<4\\times b$"（$a$ 取使 $9\\times a$ 刚超过 $5\\times b$ 的那个数）：有 $b=16$（$a=9$）、$b=23$（$a=13$）、$b=25$（$a=14$）、$b=30$（$a=17$）、$b=32$（$a=18$）、$b=34$（$a=19$）成立。',
        '其中 $\\frac{18}{32}$ 能约分成 $\\frac{9}{16}$，不是最简分数，去掉。剩下 $\\frac{9}{16}$、$\\frac{13}{23}$、$\\frac{14}{25}$、$\\frac{17}{30}$、$\\frac{19}{34}$，共 5 个。（还可以发现：$\\frac{13}{23}$ 的分子、分母是 $\\frac{9}{16}$ 和 $\\frac{4}{7}$ 的分子、分母分别相加。）',
      ],
      verify: () => {
        let first = null;
        for (let b = 1; b < 100 && !first; b++) for (let a = 1; a < b; a++) { const v = F(a).div(b); if (v.cmp(F(5).div(9)) > 0 && v.cmp(F(4).div(7)) < 0) { first = v; break; } }
        const g = (x, y) => (y ? g(y, x % y) : x);
        let c = 0;
        for (let b = 2; b <= 35; b++) for (let a = 1; a < b; a++) { const v = F(a).div(b); if (g(a, b) === 1 && v.cmp(F(5).div(9)) > 0 && v.cmp(F(4).div(7)) < 0) c++; }
        return [first, c];
      },
    },
    {
      id: '2.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '一串分数：$\\frac{1}{2}$、$\\frac{2}{3}$、$\\frac{3}{5}$、$\\frac{5}{8}$、$\\frac{8}{13}$、$\\frac{13}{21}$、$\\frac{21}{34}$、$\\frac{34}{55}$、$\\frac{55}{89}$、$\\frac{89}{144}$，从第二个起，每个分数的分子是前一个的分母，分母是前一个的分子与分母之和。把这 10 个分数从小到大排列。',
      blanks: [
        { kind: 'num', label: '(1) 从小到大排第 6 个的，是这串分数中的第几个', answer: '10' },
        { kind: 'num', label: '(2) 从大到小排第 3 个的分数是', answer: '13/21' },
      ],
      explain: [
        '思路：10 个分数两两通分太麻烦。先比较相邻的两个，找规律。',
        '相邻两个通分：$\\frac{1}{2}$ 和 $\\frac{2}{3}$ 是 $\\frac{3}{6}$ 和 $\\frac{4}{6}$，后者大 1 份；$\\frac{2}{3}$ 和 $\\frac{3}{5}$ 是 $\\frac{10}{15}$ 和 $\\frac{9}{15}$，后者小 1 份；$\\frac{3}{5}$ 和 $\\frac{5}{8}$ 是 $\\frac{24}{40}$ 和 $\\frac{25}{40}$，后者大 1 份……每次都只差 1 份，一大一小交替。',
        '每一份的大小越来越小（公分母越来越大），所以摆动越来越小：第 1、3、5、7、9 个越来越大，第 2、4、6、8、10 个越来越小，而且所有单数位置的都比双数位置的小（两串互相"夹"着往中间靠）。',
        '从小到大：第 1、3、5、7、9 个，然后是第 10、8、6、4、2 个。',
        '(1) 第 6 小的是双数位置里最小的，也就是第 10 个 $\\frac{89}{144}$。',
        '(2) 从大到小：第 2、4、6 个……第 3 大是第 6 个 $\\frac{13}{21}$。',
      ],
      verify: () => {
        const t = [[1, 2]];
        while (t.length < 10) { const [a, b] = t[t.length - 1]; t.push([b, a + b]); }
        const v = t.map((x, i) => [F(x[0]).div(x[1]), i + 1]);
        v.sort((p, q) => p[0].cmp(q[0]));
        return [v[5][1], v[7][0]];
      },
    },
    {
      id: '2.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '比 $\\frac{1}{3}$ 大、比 $\\frac{1}{2}$ 小的最简分数中：',
      blanks: [
        { kind: 'num', label: '(1) 分子与分母的和是 60 的有几个', answer: '2' },
        { kind: 'num', label: '(2) 分子与分母的和是 61 的有几个', answer: '5' },
      ],
      explain: [
        '设分子是 $a$，分母是"和 − $a$"。比 $\\frac{1}{2}$ 小：分母比分子的 2 倍大；比 $\\frac{1}{3}$ 大：分母比分子的 3 倍小。所以分子 + 分母在"分子的 3 倍"和"分子的 4 倍"之间。',
        '(1) 和是 60：$3\\times a<60<4\\times a$，$a$ 在 15 和 20 之间：16、17、18、19。',
        '最简分数：分子、分母的公因数也整除它们的和 60，所以要 $a$ 和 60 互素（不能被 2、3、5 整除）：只有 17、19。共 2 个（$\\frac{17}{43}$、$\\frac{19}{41}$）。',
        '(2) 和是 61：$3\\times a<61<4\\times a$，$a$ 是 16～20。61 是素数，$a$ 都和 61 互素，5 个都是最简分数。',
        '易错：(1) 忘了检查最简；(2) 边界算成 16～19。',
      ],
      verify: () => {
        const g = (x, y) => (y ? g(y, x % y) : x);
        const f = s => { let c = 0; for (let a = 1; a < s; a++) { const v = F(a).div(s - a); if (g(a, s - a) === 1 && v.cmp(F(1).div(3)) > 0 && v.cmp(F(1).div(2)) < 0) c++; } return c; };
        return [f(60), f(61)];
      },
    },
    {
      id: '2.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '把一条表示 0 到 1 的线段分别平均分成 7 份和 9 份，得到的分点（不含两个端点）是 $\\frac{1}{7}$、……、$\\frac{6}{7}$ 和 $\\frac{1}{9}$、……、$\\frac{8}{9}$，共 14 个。',
      blanks: [
        { kind: 'num', label: '(1) 这 14 个点从小到大排列，第 7 个是', answer: '4/9' },
        { kind: 'num', label: '(2) 相邻两个点之间的距离，最小是全长的几分之几', answer: '1/63' },
      ],
      explain: [
        '思路：把线段分成 63 个小格（63 是 7 和 9 的最小公倍数），每个分点都落在格线上。$\\frac{k}{7}$ 在第 $9\\times k$ 格，$\\frac{k}{9}$ 在第 $7\\times k$ 格。',
        '7 份的分点：9、18、27、36、45、54；9 份的分点：7、14、21、28、35、42、49、56。7 和 9 互素，这些位置都不重合。',
        '(1) 从小到大：7、9、14、18、21、27、28、……，第 7 个是第 28 格，就是 $\\frac{4}{9}$。',
        '(2) 相邻两点相差的格数：两个数的差最小是 1 格，例如 27 和 28（$\\frac{3}{7}$ 和 $\\frac{4}{9}$）、35 和 36（$\\frac{5}{9}$ 和 $\\frac{4}{7}$）。所以最小距离是全长的 $\\frac{1}{63}$。',
        '易错：直接比较 $\\frac{3}{7}$ 和 $\\frac{4}{9}$ 谁大时容易弄错；用小格数一目了然。',
      ],
      verify: () => {
        const P = [];
        for (let a = 1; a < 7; a++) P.push(9 * a);
        for (let b = 1; b < 9; b++) P.push(7 * b);
        P.sort((x, y) => x - y);
        let m = 99;
        for (let i = 1; i < P.length; i++) m = Math.min(m, P[i] - P[i - 1]);
        return [F(P[6]).div(63), F(m).div(63)];
      },
    },
    {
      id: '2.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '$n$ 是正整数，比较 $\\frac{n}{n+1}$ 和 $\\frac{n+30}{n+32}$ 的大小。',
      blanks: [
        { kind: 'num', label: '(1) 使 $\\frac{n}{n+1}>\\frac{n+30}{n+32}$ 的最小的 $n$ 是', answer: '31' },
        { kind: 'num', label: '(2) 在 1～100 中，使 $\\frac{n}{n+1}<\\frac{n+30}{n+32}$ 的 $n$ 有几个', answer: '29' },
      ],
      explain: [
        '思路：试几个数找不到头绪（$n=1$、2、3 时都是前者小），要一般地比较。两个都是真分数，看"离 1 差多少"：$\\frac{n}{n+1}$ 差 1 个 $\\frac{1}{n+1}$；$\\frac{n+30}{n+32}$ 差 2 个 $\\frac{1}{n+32}$，即 $\\frac{2}{n+32}$。差得少的大。',
        '比较 $\\frac{1}{n+1}$ 和 $\\frac{2}{n+32}$：化成同分子 2，是 $\\frac{2}{2\\times n+2}$ 和 $\\frac{2}{n+32}$，比分母 $2\\times n+2$ 和 $n+32$。',
        '两个分母相等时 $2\\times n+2=n+32$，$n=30$，这时两个分数相等。$n$ 比 30 大，$2\\times n+2$ 更大，$\\frac{n}{n+1}$ 差得更少、更大；$n$ 比 30 小，则 $\\frac{n}{n+1}$ 更小。',
        '(1) 最小的 $n$ 是 31。(2) $n$ 是 1～29，共 29 个（$n=30$ 时相等，不算）。',
        '易错：(2) 把 $n=30$ 也算上，答 30。',
      ],
      verify: () => {
        let m = 0;
        let k = 0;
        for (let n = 1; n <= 100; n++) { const c = F(n).div(n + 1).cmp(F(n + 30).div(n + 32)); if (c > 0 && !m) m = n; if (c < 0) k++; }
        return [m, k];
      },
    },
  ],
});
