'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 1.4 素数、合数与分解素因数
// 知识范围：素数（质数）、合数、1 既不是素数也不是合数；判断素数（试除）；素因数、分解素因数（短除法）；
//           利用素因数找因数、数因数个数（课本"探究活动：利用素因数找因数"）；可以使用 1.1～1.3 的全部内容
// 还没学：公因数与最大公因数、互素（1.5）、公倍数与最小公倍数（1.6）、负数
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/1.4',
  title: '素数、合数与分解素因数',
  review: { status: 'pending' },
  audit: { blind: '2026-09-27', rounds: 2, note: '子代理盲解复核两轮，答案全部一致；第 1 轮按意见重做 c01、c03、c05(2)、e03、e06、e01(2) 和 b01，第 2 轮判定整节通过（按意见换掉 b01 中与 b03 撞车的数字）' },

  intro: [
    {
      title: '素数和合数',
      body: '一个大于 1 的整数，如果**只有 1 和它本身两个因数**，叫作**素数**（也叫质数）；如果除了 1 和它本身还有别的因数，叫作**合数**。**1 既不是素数，也不是合数**。',
      example: '13 的因数只有 1、13，是素数；15 的因数有 1、3、5、15，是合数。',
      pitfall: '2 是唯一的偶素数，其他偶数都是合数。素数不一定是奇数（2），奇数也不一定是素数（例如 9、15）。',
    },
    {
      title: '判断一个数是不是素数',
      body: '用 2、3、5、7、11……这些素数依次去试除。只要有一个能整除，它就是合数；试到某个素数乘它自己已经比这个数大时还没有能整除的，它就是素数。',
      example: '判断 83：试 2、3、5、7 都不能整除，而 $11\\times 11=121>83$，不用再试，83 是素数。',
    },
    {
      title: '分解素因数',
      body: '每个合数都可以写成几个素数相乘的形式，这些素数叫作它的**素因数**。把一个合数用素因数相乘的形式表示出来，叫作**分解素因数**，常用**短除法**：用素数一直除，除到商是素数为止。',
      example: '$126=2\\times 3\\times 3\\times 7$：126 ÷ 2 = 63，63 ÷ 3 = 21，21 ÷ 3 = 7，7 是素数。',
      pitfall: '$12=3\\times 4$ 不是分解素因数，因为 4 不是素数；等号左边写合数，右边写素数相乘，不能写成 $2\\times 2\\times 3=12$，也不能乘上 1。',
    },
    {
      title: '利用素因数找因数',
      body: '一个数的每个因数，都是从它的素因数里"挑出一部分相乘"得到的（一个都不挑就是 1）。所以同一个素数有几个，就有"挑 0 个、挑 1 个、……"几种挑法，各种挑法的个数相乘，就是因数的个数。',
      example: '$18=2\\times 3\\times 3$：2 可以挑 0 或 1 个（2 种），3 可以挑 0、1、2 个（3 种），因数有 $2\\times 3=6$ 个：1、2、3、6、9、18。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '1.4-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列各式中，属于分解素因数的是（ ）',
      options: ['$399=3\\times 133$', '$133=7\\times 19$', '$2\\times 2\\times 17=68$', '$87=1\\times 3\\times 29$'],
      answer: 1,
      explain: [
        '分解素因数要把合数写成几个**素数**相乘，合数写在等号左边。',
        'A：133 = 7 × 19 不是素数，还没分解完（应是 $399=3\\times 7\\times 19$）。C：写反了。D：1 不是素数，不能写进去。',
        'B：7 和 19 都是素数，正确。选 B。',
        '易错：133 看起来像素数，其实是 7 × 19。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const cases = [[399, [3, 133], true], [133, [7, 19], true], [68, [2, 2, 17], false], [87, [1, 3, 29], true]];
        return cases.findIndex(([n, fs, leftIsN]) => leftIsN && fs.every(isP) && fs.reduce((a, b) => a * b, 1) === n);
      },
    },
    {
      id: '1.4-b02',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中，正确的有几个？（ ）<br>① 所有的偶数都是合数；<br>② 两个素数的和一定是偶数；<br>③ 两个素数的积一定是合数；<br>④ 一个合数至少有 3 个因数；<br>⑤ 最小的合数是 4。',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 2,
      explain: [
        '① 错：2 是偶数，但它是素数。',
        '② 错：$2+3=5$ 是奇数。两个素数中有 2 时，和就是奇数。',
        '③ 对：两个素数的积，除了 1 和它本身，还有这两个素数作因数，至少 3 个因数，是合数。',
        '④ 对：合数除了 1 和本身还有别的因数。⑤ 对：2、3 是素数，4 = 2 × 2 是合数。',
        '正确的是 ③④⑤，共 3 个。选 C。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const P = [];
        for (let n = 2; n < 60; n++) if (isP(n)) P.push(n);
        const cnt = n => { let c = 0; for (let d = 1; d <= n; d++) if (n % d === 0) c++; return c; };
        const facts = [
          [2, 4, 6, 8].every(n => !isP(n)),
          P.every(p => P.every(q => (p + q) % 2 === 0)),
          P.every(p => P.every(q => !isP(p * q) && p * q > 1)),
          Array.from({ length: 100 }, (_, i) => i + 2).filter(n => !isP(n)).every(n => cnt(n) >= 3),
          [2, 3].every(isP) && !isP(4),
        ];
        return facts.filter(Boolean).length - 1;
      },
    },
    {
      id: '1.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '在 1、2、9、17、21、29、39、51、57、91、97 这十一个数中，素数有几个？',
      blanks: [{ kind: 'num', answer: '4', suffix: '个' }],
      explain: [
        '逐个试除：1 既不是素数也不是合数；2 是素数；9 = 3 × 3；17 是素数；21 = 3 × 7；29 是素数；39 = 3 × 13。',
        '51 = 3 × 17、57 = 3 × 19，这两个最容易看错；91 = 7 × 13；97 试 2、3、5、7 都不能整除，是素数。',
        '素数有 2、17、29、97，共 4 个。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        return [1, 2, 9, 17, 21, 29, 39, 51, 57, 91, 97].filter(isP).length;
      },
    },
    {
      id: '1.4-b04',
      level: 'basic',
      type: 'fill',
      stem: '把 84 分解素因数。',
      blanks: [
        { kind: 'nums', label: '(1) 84 的素因数有哪些（不同的素因数全部填出，用逗号隔开）', answer: ['2', '3', '7'] },
        { kind: 'num', label: '(2) 分解后，一共是几个素数相乘（相同的素数也分别计数）', answer: '4' },
      ],
      explain: [
        '短除法：84 ÷ 2 = 42，42 ÷ 2 = 21，21 ÷ 3 = 7，7 是素数，停止。',
        '$84=2\\times 2\\times 3\\times 7$。',
        '不同的素因数是 2、3、7；一共 4 个素数相乘。易错：写成 $84=4\\times 3\\times 7$，4 不是素数。',
      ],
      verify: () => {
        const fs = [];
        let n = 84;
        for (let d = 2; n > 1; d++) while (n % d === 0) { fs.push(d); n /= d; }
        return [[...new Set(fs)], fs.length];
      },
    },
    {
      id: '1.4-b05',
      level: 'basic',
      type: 'fill',
      stem: '两个素数的和是 25，它们的积是多少？',
      blanks: [{ kind: 'num', answer: '46' }],
      explain: [
        '25 是奇数。奇数 + 奇数 = 偶数，所以两个素数不能都是奇数，其中一个是偶数。',
        '偶素数只有 2，另一个是 $25-2=23$，23 是素数。',
        '积是 $2\\times 23=46$。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const r = new Set();
        for (let p = 2; p <= 23; p++) if (isP(p) && isP(25 - p)) r.add(p * (25 - p));
        return r.size === 1 ? [...r][0] : 0;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '1.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '相差 2 的两个素数叫作一对"孪生素数"，例如 3 和 5。',
      blanks: [
        { kind: 'num', label: '(1) 50 以内（两个数都小于 50）的孪生素数有几对', answer: '6' },
        { kind: 'nums', label: '(2) 两个素数的差是 15，这两个素数的和是多少（有几个就填几个，用逗号隔开）', answer: ['19'] },
      ],
      explain: [
        '(1) 50 以内的素数：2、3、5、7、11、13、17、19、23、29、31、37、41、43、47。相差 2 的：(3, 5)、(5, 7)、(11, 13)、(17, 19)、(29, 31)、(41, 43)，共 6 对。',
        '(2) 差是 15，是奇数。两个奇数的差是偶数，两个偶数的差也是偶数，所以两个素数一奇一偶。',
        '偶素数只有 2，另一个是 $2+15=17$，是素数。和是 $2+17=19$。',
        '易错：去找很多组差 15 的素数，比如 4 和 19——4 不是素数。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        let a = 0;
        for (let p = 2; p + 2 < 50; p++) if (isP(p) && isP(p + 2)) a++;
        const b = new Set();
        for (let p = 2; p <= 10000; p++) if (isP(p) && isP(p + 15)) b.add(2 * p + 15);
        return [a, [...b]];
      },
    },
    {
      id: '1.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '已知 $A=2\\times 3\\times 3\\times 5$。',
      blanks: [
        { kind: 'num', label: '(1) $A$ 一共有几个因数', answer: '12' },
        { kind: 'num', label: '(2) $A$ 的因数中，合数有几个', answer: '8' },
      ],
      explain: [
        '(1) 挑素因数：2 挑 0 或 1 个（2 种），3 挑 0、1、2 个（3 种），5 挑 0 或 1 个（2 种），因数有 $2\\times 3\\times 2=12$ 个。',
        '(2) 12 个因数里，1 不是素数也不是合数；素数因数就是它的素因数 2、3、5，共 3 个。',
        '合数有 $12-1-3=8$ 个（6、9、10、15、18、30、45、90）。',
        '易错：忘了去掉 1，得 9 个。',
      ],
      verify: () => {
        const A = 2 * 3 * 3 * 5;
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const ds = [];
        for (let d = 1; d <= A; d++) if (A % d === 0) ds.push(d);
        return [ds.length, ds.filter(d => d > 1 && !isP(d)).length];
      },
    },
    {
      id: '1.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '一个长方体的体积是 60 立方厘米，长、宽、高都是大于 1 的整厘米数（长、宽、高只是摆放方向不同的算同一个长方体）。',
      blanks: [
        { kind: 'num', label: '(1) 这样的长方体有几种', answer: '4' },
        { kind: 'num', label: '(2) 其中表面积最小是多少平方厘米', answer: '94' },
      ],
      explain: [
        '$60=2\\times 2\\times 3\\times 5$，要把这 4 个素因数分成三组乘起来，每组至少一个素因数（边长大于 1）。',
        '4 个素因数分成 3 组，一定是一组两个、其余各一个。按哪两个放在一起分类：2 × 2、2 × 3、2 × 5、3 × 5，得到 4、3、5；6、2、5；10、2、3；15、2、2，共 4 种。',
        '（2 × 3 和另一个 2 × 3 是同一种情况，两个 2 相同，所以不会多出来。）',
        '表面积：3 × 4 × 5 是 $2\\times(12+15+20)=94$；2 × 5 × 6 是 104；2 × 3 × 10 是 112；2 × 2 × 15 是 128。最小是 94。',
      ],
      verify: () => {
        const t = [];
        for (let a = 2; a <= 60; a++) for (let b = a; b <= 60; b++) for (let c = b; c <= 60; c++) if (a * b * c === 60) t.push(2 * (a * b + b * c + a * c));
        return [t.length, Math.min(...t)];
      },
    },
    {
      id: '1.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '$a$、$b$、$c$、$d$ 是四个互不相等的正整数，并且 $a\\times b\\times c\\times d=225$。求 $a+b+c+d$。',
      blanks: [{ kind: 'num', answer: '24' }],
      explain: [
        '先分解素因数：$225=3\\times 3\\times 5\\times 5$，只有 4 个素因数。',
        '四个不同的正整数相乘等于 225，它们都是 225 的因数：1、3、5、9、15、25、45、75、225。',
        '要凑出四个不同的数，只能用上 1：剩下三个不同的数积为 225，只能是 3、5、15（$3\\times 5\\times 15=225$）；换成 1、3、75 或 1、5、45 等都会出现重复的 1。',
        '四个数是 1、3、5、15，和是 24。易错：忘了 1 也可以是其中一个数。',
      ],
      verify: () => {
        const r = new Set();
        for (let a = 1; a <= 225; a++) for (let b = a + 1; b <= 225; b++) for (let c = b + 1; c <= 225; c++) {
          if (225 % (a * b * c) !== 0) continue;
          const d = 225 / (a * b * c);
          if (d > c) r.add(a + b + c + d);
        }
        return r.size === 1 ? [...r][0] : 0;
      },
    },
    {
      id: '1.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '一个数分解素因数是 $3\\times a\\times b$（$a$、$b$ 都是素数，可以相同），它恰好有 6 个因数。这个数最小是多少？',
      blanks: [{ kind: 'num', answer: '12' }],
      explain: [
        '按 $a$、$b$ 是否相同、是否等于 3 分类，用"挑素因数"数因数个数。',
        '$a$、$b$ 不同，都不是 3：三个不同的素数，因数个数 $2\\times 2\\times 2=8$，不行。',
        '$a$、$b$ 中恰有一个是 3（比如 $a=3$）：这个数是 $3\\times 3\\times b$，因数个数 $3\\times 2=6$，可以，最小取 $b=2$，得 18。',
        '$a=b$，都不是 3：这个数是 $3\\times a\\times a$，因数个数 $2\\times 3=6$，可以，最小取 $a=2$，得 12。$a=b=3$ 时是 27，只有 4 个因数。',
        '所以最小是 12。易错：以为 $a$、$b$ 要不同，只找到 18。',
      ],
      verify: () => {
        const cnt = n => { let c = 0; for (let d = 1; d <= n; d++) if (n % d === 0) c++; return c; };
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        let best = Infinity;
        for (let a = 2; a < 60; a++) for (let b = a; b < 60; b++) if (isP(a) && isP(b) && cnt(3 * a * b) === 6) best = Math.min(best, 3 * a * b);
        return best;
      },
    },
    {
      id: '1.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '三个连续奇数的积是 9177。这三个数的和是多少？',
      blanks: [{ kind: 'num', answer: '63' }],
      explain: [
        '分解素因数：9177 除以 3 得 3059，3059 = 7 × 437，437 = 19 × 23。所以 $9177=3\\times 7\\times 19\\times 23$。',
        '三个连续奇数差不多大：$20\\times 20\\times 20=8000$，所以它们在 20 附近。',
        '19 和 23 是两个素因数，它们之间的奇数是 21，正好 $21=3\\times 7$，把剩下的素因数用完了。',
        '三个数是 19、21、23，和是 63。易错：只盯着分解出来的素因数 3、7、19、23 去凑，没想到要把 3 和 7 合成 21。',
      ],
      verify: () => {
        for (let n = 1; n < 100; n += 2) if (n * (n + 2) * (n + 4) === 9177) return 3 * n + 6;
        return 0;
      },
    },
    {
      id: '1.4-e07',
      level: 'extended',
      type: 'fill',
      stem: '$a$、$b$ 都是素数，并且 $3\\times a+7\\times b=41$。求 $a+b$。',
      blanks: [{ kind: 'num', answer: '7' }],
      explain: [
        '41 是奇数。如果 $a$、$b$ 都是奇数，$3\\times a$、$7\\times b$ 都是奇数，和是偶数，不可能。所以 $a$、$b$ 中有一个是 2。',
        '$a=2$：$7\\times b=35$，$b=5$，是素数，符合。',
        '$b=2$：$3\\times a=27$，$a=9$，不是素数，不行。',
        '所以 $a=2$、$b=5$，$a+b=7$。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const r = new Set();
        for (let a = 2; a <= 14; a++) if (isP(a) && (41 - 3 * a) > 0 && (41 - 3 * a) % 7 === 0 && isP((41 - 3 * a) / 7)) r.add(a + (41 - 3 * a) / 7);
        return r.size === 1 ? [...r][0] : 0;
      },
    },
    {
      id: '1.4-e08',
      level: 'extended',
      type: 'fill',
      stem: '把 $1\\times 2\\times 3\\times\\cdots\\times 10$ 的积分解素因数。',
      blanks: [
        { kind: 'num', label: '(1) 其中素因数 2 一共有几个', answer: '8' },
        { kind: 'num', label: '(2) 一共是几个素数相乘（相同的素数也分别计数）', answer: '15' },
      ],
      explain: [
        '(1) 逐个看每个乘数含几个 2：2 含 1 个，4 = 2 × 2 含 2 个，6 含 1 个，8 = 2 × 2 × 2 含 3 个，10 含 1 个，共 $1+2+1+3+1=8$ 个。',
        '(2) 3：3 含 1 个，6 含 1 个，9 = 3 × 3 含 2 个，共 4 个。5：5、10 各 1 个，共 2 个。7：1 个。',
        '一共 $8+4+2+1=15$ 个素数相乘。易错：把 1 也当成一个因数算进去。',
      ],
      verify: () => {
        const fs = [];
        for (let i = 2; i <= 10; i++) { let n = i; for (let d = 2; n > 1; d++) while (n % d === 0) { fs.push(d); n /= d; } }
        return [fs.filter(x => x === 2).length, fs.length];
      },
    },
    {
      id: '1.4-e09',
      level: 'extended',
      type: 'fill',
      stem: '从 1～10 中去掉一个数，使剩下的九个数能分成两组，两组数的乘积相等。',
      blanks: [
        { kind: 'num', label: '(1) 去掉的数是', answer: '7' },
        { kind: 'num', label: '(2) 这时每组数的乘积是', answer: '720' },
      ],
      explain: [
        '两组积相等，每个素因数在两组里的个数必须一样多，所以剩下的数里，每个素因数的总个数都要是"能平分的"（偶数个）。',
        '1～10 的积里：2 有 8 个，3 有 4 个，5 有 2 个，7 只有 1 个。7 只出现在 7 这一个数里，必须去掉 7。',
        '去掉 7 后，素因数是 8 个 2、4 个 3、2 个 5，每组分到 4 个 2、2 个 3、1 个 5，积是 $2\\times 2\\times 2\\times 2\\times 3\\times 3\\times 5=720$。',
        '确实能分：$8\\times 9\\times 10=720$，$1\\times 2\\times 3\\times 4\\times 5\\times 6=720$。',
      ],
      verify: () => {
        const res = [];
        for (let x = 1; x <= 10; x++) {
          const rest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(v => v !== x);
          const total = rest.reduce((a, b) => a * b, 1);
          for (let m = 0; m < 1 << 9; m++) {
            let p = 1;
            rest.forEach((v, i) => { if (m & (1 << i)) p *= v; });
            if (p * p === total) { res.push([x, p]); break; }
          }
        }
        return res.length === 1 ? res[0] : [0, 0];
      },
    },
    {
      id: '1.4-e10',
      level: 'extended',
      type: 'fill',
      stem: '三个互不相等的素数的积，恰好等于它们的和的 5 倍。这三个素数的和是多少？',
      blanks: [{ kind: 'num', answer: '14' }],
      explain: [
        '积是和的 5 倍，积能被 5 整除，三个素数里一定有一个是 5。',
        '设另外两个素数是甲、乙：5 × 甲 × 乙 = 5 × (5 + 甲 + 乙)，也就是 甲 × 乙 = 5 + 甲 + 乙。',
        '两边都减去 甲 + 乙 − 1：甲 × 乙 − 甲 − 乙 + 1 = 6，也就是 (甲 − 1) × (乙 − 1) = 6（可以用长方形面积图验证这个变形）。',
        '6 = 1 × 6 = 2 × 3，甲、乙（甲 < 乙）是 2 和 7，或 3 和 4。4 不是素数，所以是 2 和 7。',
        '三个素数是 2、5、7，检验：$2\\times 5\\times 7=70$，$5\\times(2+5+7)=70$。和是 14。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const r = new Set();
        for (let p = 2; p < 200; p++) for (let q = p + 1; q < 200; q++) for (let s = q + 1; s < 200; s++) if (isP(p) && isP(q) && isP(s) && p * q * s === 5 * (p + q + s)) r.add(p + q + s);
        return r.size === 1 ? [...r][0] : 0;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '1.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如果正整数 $n$ 能写成 $n=a\\times b+a+b$，其中 $a$、$b$ 都是**素数**（$a\\le b$，可以相等），就说 $n$ 是一个"素和积数"，每一组 $a$、$b$ 叫作一种写法。例如 $8=2\\times 2+2+2$。',
      blanks: [
        { kind: 'num', label: '(1) 1～100 中，素和积数一共有几个', answer: '18' },
        { kind: 'num', label: '(2) 这些数中，至少有两种写法的有几个', answer: '5' },
      ],
      explain: [
        '关键转化：$n+1=a\\times b+a+b+1=(a+1)\\times(b+1)$（看成长 $b+1$、宽 $a+1$ 的长方形面积：$a\\times b$ 加上两条边再加上角上的 1）。所以只要列出 $(a+1)\\times(b+1)-1$。',
        '按 $a$ 分类，$n\\le 100$ 就是 $(a+1)\\times(b+1)\\le 101$：',
        '$a=2$：$n=3\\times(b+1)-1$，$b$ 取 2、3、5、7、11、13、17、19、23、29、31，得 8、11、17、23、35、41、53、59、71、89、95，共 11 个。',
        '$a=3$：$n=4\\times(b+1)-1$，$b$ 取 3、5、7、11、13、17、19、23，得 15、23、31、47、55、71、79、95。其中 23、71、95 已经出现过，新增 5 个。',
        '$a=5$：$n=6\\times(b+1)-1$，$b$ 取 5、7、11、13，得 35、47、71、83，新增只有 83。$a=7$：$n=8\\times(b+1)-1$，$b$ 取 7、11，得 63、95，新增 63。$a\\ge 11$ 时 $12\\times 12-1>100$。',
        '(1) 共 $11+5+1+1=18$ 个。(2) 重复出现的就是有多种写法的：23、35、47、71、95，共 5 个（71 和 95 各有三种写法）。',
        '易错：各类直接相加得 25，没去掉重复的数。',
      ],
      verify: () => {
        const isP = x => { if (x < 2) return false; for (let d = 2; d * d <= x; d++) if (x % d === 0) return false; return true; };
        const ways = {};
        for (let a = 2; a <= 100; a++) for (let b = a; b <= 100; b++) if (isP(a) && isP(b)) { const n = a * b + a + b; if (n <= 100) ways[n] = (ways[n] || 0) + 1; }
        const ks = Object.keys(ways);
        return [ks.length, ks.filter(k => ways[k] >= 2).length];
      },
    },
    {
      id: '1.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '用 1、2、3、4、5、6、7、8、9 这九个数字（每个恰好用一次）组成若干个素数，例如 $2,\\ 3,\\ 5,\\ 41,\\ 67,\\ 89$。这些素数的和最小是多少？',
      blanks: [{ kind: 'num', answer: '207' }],
      explain: [
        '思路：先想每个数字放在哪一位，而不是先凑素数。',
        '4、6、8 不能单独成为素数，也不能放在个位（个位是 4、6、8 的多位数能被 2 整除）。所以 4、6、8 至少要放在十位上。',
        '放在十位，它们贡献至少 $40+60+80=180$；其余六个数字 1、2、3、5、7、9 至少各在个位贡献一次，至少 $1+2+3+5+7+9=27$。和至少 $180+27=207$。',
        '（如果有数字放到百位或更高位，和只会更大。）',
        '能取到 207：2、3、5、41、67、89 都是素数，和是 $2+3+5+41+67+89=207$。所以最小是 207。',
        '易错：只凑出一种组合就停下，不说明为什么不能更小。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const perm = a => (a.length <= 1 ? [a] : a.flatMap((x, i) => perm(a.filter((_, j) => j !== i)).map(p => [x, ...p])));
        let best = Infinity;
        const rec = (rem, sum) => {
          if (sum >= best) return;
          if (!rem.length) { best = sum; return; }
          const f = rem[0];
          const rest = rem.slice(1);
          const subs = [[]];
          for (let i = 0; i < rest.length; i++) { subs.push([rest[i]]); for (let j = i + 1; j < rest.length; j++) subs.push([rest[i], rest[j]]); }
          for (const s of subs) for (const p of perm([f, ...s])) { const n = Number(p.join('')); if (isP(n)) rec(rest.filter(x => !s.includes(x)), sum + n); }
        };
        rec([1, 2, 3, 4, 5, 6, 7, 8, 9], 0);
        return best;
      },
    },
    {
      id: '1.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '$p$ 是小于 100 的素数，并且 $p$、$p+2$、$p+6$、$p+8$ 都是素数。$p$ 可能是多少？（全部填出，用逗号隔开）',
      blanks: [{ kind: 'nums', answer: ['5', '11'] }],
      explain: [
        '思路：用"除以某个小素数的余数"排除大部分情况，剩下的再逐个检验。',
        '先看除以 3 的余数：加上的 0、2、6、8 除以 3 余 0、2、0、2。$p$ 余 1 时，$p+2$ 能被 3 整除且大于 3，不行；$p$ 余 0 时 $p=3$，$p+6=9$ 不是素数。所以 $p$ 除以 3 余 2。',
        '再看除以 5 的余数：0、2、6、8 除以 5 余 0、2、1、3。$p$ 余 2 时 $p+8$ 能被 5 整除，余 3 时 $p+2$ 能被 5 整除，余 4 时 $p+6$ 能被 5 整除，都不行（这些数都大于 5）。所以 $p=5$，或者 $p$ 除以 5 余 1（个位是 1）。',
        '$p=5$：5、7、11、13 都是素数，符合。',
        '个位是 1、除以 3 余 2、小于 100 的素数：11、41、71（再检查一遍 11 ÷ 3 余 2、41 ÷ 3 余 2、71 ÷ 3 余 2）。逐个检验：11、13、17、19 都是素数，符合；41 时 $41+8=49=7\\times 7$，不行；71 时 $71+6=77=7\\times 11$，不行。',
        '所以 $p$ 是 5 或 11。易错：只找到 5，或者以为余数一排除就只剩一个。',
      ],
      verify: () => {
        const isP = x => { if (x < 2) return false; for (let d = 2; d * d <= x; d++) if (x % d === 0) return false; return true; };
        const r = [];
        for (let p = 2; p < 100; p++) if ([0, 2, 6, 8].every(k => isP(p + k))) r.push(p);
        return r;
      },
    },
    {
      id: '1.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '求满足条件的最小正整数：',
      blanks: [
        { kind: 'num', label: '(1) 恰好有 12 个因数的最小正整数是', answer: '60' },
        { kind: 'num', label: '(2) 恰好有 15 个因数的最小正整数是', answer: '144' },
      ],
      explain: [
        '思路：用"挑素因数"的方法，因数个数 = 各素因数"个数 + 1"相乘。先把 12、15 拆成这样的乘积，再让小的素数多用几次。',
        '(1) 12 = 12 = 6 × 2 = 4 × 3 = 3 × 2 × 2。对应：一个素数用 11 次（$2$ 连乘 11 次 = 2048）；两个素数分别用 5 次和 1 次（$2\\times 2\\times 2\\times 2\\times 2\\times 3=96$）；分别用 3 次和 2 次（$2\\times 2\\times 2\\times 3\\times 3=72$）；三个素数分别用 2、1、1 次（$2\\times 2\\times 3\\times 5=60$）。',
        '每种都把用得多的次数给最小的素数 2，最小的是 60。',
        '(2) 15 = 15 = 5 × 3。对应：一个素数用 14 次（很大）；两个素数分别用 4 次和 2 次：$2\\times 2\\times 2\\times 2\\times 3\\times 3=144$。',
        '15 不能拆成三个大于 1 的数相乘，所以不能用三个不同的素数。最小是 144。',
        '易错：以为"因数多就要素因数种类多"，(2) 去凑 $2\\times 3\\times 5\\times\\cdots$，结果因数个数不是 15。',
      ],
      verify: () => {
        const cnt = n => { let c = 0; for (let d = 1; d * d <= n; d++) if (n % d === 0) c += d * d === n ? 1 : 2; return c; };
        let a = 0;
        let b = 0;
        for (let n = 1; !a || !b; n++) { if (!a && cnt(n) === 12) a = n; if (!b && cnt(n) === 15) b = n; }
        return [a, b];
      },
    },
    {
      id: '1.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如果一个两位数是素数，把它的十位数字和个位数字交换后得到的两位数也是素数，并且两个数字不相同，就把它叫作"可逆素数"（例如 13 和 31 都是素数，13 是可逆素数）。',
      blanks: [
        { kind: 'num', label: '(1) 两位数中，可逆素数一共有几个', answer: '8' },
        { kind: 'num', label: '(2) 三个数字不全相同的三位数中，有几个满足"把它的三个数字按任意顺序排列，得到的三位数都是素数"', answer: '9' },
      ],
      explain: [
        '思路：先用个位的特征大幅缩小范围，再逐个试除。',
        '(1) 交换后两个数字都会当一次个位。素数（除 2、5 外）的个位只能是 1、3、7、9，所以两个数字都要从 1、3、7、9 中选，而且不相同：13、17、19、31、37、39、71、73、79、91、93、97，只有 12 个候选。',
        '逐个试除：39 = 3 × 13、91 = 7 × 13、93 = 3 × 31 不是素数，19 是素数但 91 不是。剩下 13、17、31、37、71、73、79、97 都满足，共 8 个。',
        '(2) 同样，三个数字都会当一次个位，只能从 1、3、7、9 中选。按"三个数字都不同"和"有两个数字相同"分类。',
        '三个数字都不同：只有 {1, 3, 7}、{1, 3, 9}、{1, 7, 9}、{3, 7, 9} 四组，每组都找到一个排列不是素数：$371=7\\times 53$，$319=11\\times 29$，$791=7\\times 113$，$793=13\\times 61$。所以这一类一个也没有。',
        '有两个数字相同：形如"甲甲乙"，排列只有 3 个。逐组检验：1、1、3 → 113、131、311 都是素数；1、9、9 → 199、919、991 都是素数；3、3、7 → 337、373、733 都是素数。其他组合都有合数，例如 1、1、7 中 117 = 9 × 13，1、3、3 中 133 = 7 × 19，7、7、9 中 779 = 19 × 41。',
        '所以一共 9 个：113、131、311、199、919、991、337、373、733。易错：只考虑三个数字都不同，得 0 个。',
      ],
      verify: () => {
        const isP = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
        const rv = n => Number(String(n).split('').reverse().join(''));
        let a = 0;
        for (let n = 10; n <= 99; n++) if (n % 10 !== Math.floor(n / 10) && isP(n) && isP(rv(n))) a++;
        const perm = arr => (arr.length <= 1 ? [arr] : arr.flatMap((x, i) => perm(arr.filter((_, j) => j !== i)).map(p => [x, ...p])));
        let b = 0;
        for (let n = 100; n <= 999; n++) {
          const ds = String(n).split('');
          if (new Set(ds).size === 1) continue;
          if (perm(ds).every(p => isP(Number(p.join(''))))) b++;
        }
        return [a, b];
      },
    },
  ],
});
