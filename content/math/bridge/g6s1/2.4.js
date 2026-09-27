'use strict';

// 六年级衔接（旧版沪教版六年级第一学期）· 2.4 分数的加减法
// 知识范围：同分母、异分母分数加减，带分数加减（不够减时向整数部分借 1），加法运算律与凑整，
//           拆分单位分数（课本"探究活动：将一个分数拆为几个不同的单位分数之和"）；可以使用第 1 章和 2.1～2.3
// 还没学：分数乘法（2.5）、分数除法（2.6）、分数与小数互化（2.7）、负数
// 难度按衔接分类的标准（以 9 月月考真卷为标尺），见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md

Content.section({
  id: 'math/bridge/g6s1/2.4',
  title: '分数的加减法',
  review: { status: 'pending' },

  intro: [
    {
      title: '同分母、异分母分数加减',
      body: '同分母分数相加减，**分母不变，分子相加减**。异分母分数相加减，先**通分**，再按同分母分数计算。结果能约分的要约成最简分数。',
      example: '$\\frac{3}{4}-\\frac{2}{5}=\\frac{15}{20}-\\frac{8}{20}=\\frac{7}{20}$。',
      pitfall: '分母不能相加减：$\\frac{1}{3}+\\frac{1}{4}$ 不等于 $\\frac{2}{7}$。',
    },
    {
      title: '带分数加减',
      body: '带分数相加减，整数部分和分数部分分别相加减。分数部分不够减时，从整数部分借 1，化成假分数再减。',
      example: '$5\\frac{1}{6}-2\\frac{3}{4}=5\\frac{2}{12}-2\\frac{9}{12}=4\\frac{14}{12}-2\\frac{9}{12}=2\\frac{5}{12}$。',
    },
    {
      title: '运算律和凑整',
      body: '加法交换律、结合律，减法的性质（连续减去几个数，等于减去它们的和）对分数同样适用。先把同分母的、能凑成整数的放在一起算，更简便。',
      example: '$\\frac{3}{7}+\\frac{5}{9}+\\frac{4}{7}=\\left(\\frac{3}{7}+\\frac{4}{7}\\right)+\\frac{5}{9}=1\\frac{5}{9}$。',
    },
    {
      title: '拆成单位分数',
      body: '分子是 1 的分数叫单位分数。相邻两个单位分数的差，可以写成一个单位分数：$\\frac{1}{n}-\\frac{1}{n+1}=\\frac{1}{n\\times(n+1)}$。反过来，$\\frac{1}{n\\times(n+1)}$ 可以拆成两个单位分数的差，这叫**裂项**。',
      example: '$\\frac{1}{20}=\\frac{1}{4\\times 5}=\\frac{1}{4}-\\frac{1}{5}$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.4-b01',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\frac{3}{4}-\\frac{2}{3}+\\frac{5}{6}$',
      blanks: [{ kind: 'num', answer: '11/12' }],
      explain: [
        '4、3、6 的最小公倍数是 12，通分：$\\frac{9}{12}-\\frac{8}{12}+\\frac{10}{12}$。',
        '从左往右：$\\frac{9-8+10}{12}=\\frac{11}{12}$。',
        '易错：先算 $\\frac{2}{3}+\\frac{5}{6}$ 再用 $\\frac{3}{4}$ 去减，改变了运算顺序。',
      ],
      verify: () => F(3).div(4).sub(F(2).div(3)).add(F(5).div(6)),
    },
    {
      id: '2.4-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$4\\frac{1}{5}-1\\frac{2}{3}$',
      blanks: [{ kind: 'num', answer: '38/15' }],
      explain: [
        '通分：$4\\frac{3}{15}-1\\frac{10}{15}$。分数部分 3 个 $\\frac{1}{15}$ 不够减 10 个，从 4 里借 1：$3\\frac{18}{15}-1\\frac{10}{15}$。',
        '整数部分 $3-1=2$，分数部分 $\\frac{18-10}{15}=\\frac{8}{15}$，结果 $2\\frac{8}{15}$。',
        '易错：不够减时直接用 10 − 3，得 $3\\frac{7}{15}$。',
      ],
      verify: () => F(21).div(5).sub(F(5).div(3)),
    },
    {
      id: '2.4-b03',
      level: 'basic',
      type: 'fill',
      stem: '一根绳子长 $\\frac{7}{8}$ 米，第一次用去 $\\frac{1}{4}$ 米，第二次用去 $\\frac{1}{3}$ 米，还剩多少米？',
      blanks: [{ kind: 'num', answer: '7/24', suffix: '米' }],
      explain: [
        '"用去 $\\frac{1}{4}$ 米"是具体的长度，直接减：$\\frac{7}{8}-\\frac{1}{4}-\\frac{1}{3}=\\frac{7}{8}-\\left(\\frac{1}{4}+\\frac{1}{3}\\right)$。',
        '$\\frac{1}{4}+\\frac{1}{3}=\\frac{7}{12}$，$\\frac{7}{8}-\\frac{7}{12}=\\frac{21}{24}-\\frac{14}{24}=\\frac{7}{24}$（米）。',
        '易错：把"用去 $\\frac{1}{4}$ 米"当成"用去全长的 $\\frac{1}{4}$"。',
      ],
      verify: () => F(7).div(8).sub(F(1).div(4)).sub(F(1).div(3)),
    },
    {
      id: '2.4-b04',
      level: 'basic',
      type: 'fill',
      stem: '用简便方法计算：',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{5}{7}+\\frac{3}{8}+\\frac{2}{7}+\\frac{5}{8}=$', answer: '2' },
        { kind: 'num', label: '(2) $7\\frac{5}{9}-\\left(2\\frac{5}{9}+\\frac{1}{4}\\right)=$', answer: '19/4' },
      ],
      explain: [
        '(1) 交换、结合：$\\left(\\frac{5}{7}+\\frac{2}{7}\\right)+\\left(\\frac{3}{8}+\\frac{5}{8}\\right)=1+1=2$。',
        '(2) 减去两个数的和，等于连续减去这两个数：$7\\frac{5}{9}-2\\frac{5}{9}-\\frac{1}{4}=5-\\frac{1}{4}=4\\frac{3}{4}$。',
        '易错：(2) 去括号后写成 $+\\frac{1}{4}$。',
      ],
      verify: () => [F(5).div(7).add(F(3).div(8)).add(F(2).div(7)).add(F(5).div(8)), F(68).div(9).sub(F(23).div(9).add(F(1).div(4)))],
    },
    {
      id: '2.4-b05',
      level: 'basic',
      type: 'choice',
      stem: '下列计算正确的是（ ）',
      options: [
        '$\\frac{1}{3}+\\frac{1}{4}=\\frac{2}{7}$',
        '$\\frac{5}{6}-\\frac{1}{6}=\\frac{2}{3}$',
        '$3\\frac{1}{2}-1\\frac{3}{4}=2\\frac{1}{4}$',
        '$\\frac{2}{5}+\\frac{3}{10}=\\frac{5}{15}$',
      ],
      answer: 1,
      explain: [
        'A：分母不能相加，应是 $\\frac{7}{12}$。',
        'B：$\\frac{5}{6}-\\frac{1}{6}=\\frac{4}{6}=\\frac{2}{3}$，正确。',
        'C：$3\\frac{2}{4}-1\\frac{3}{4}$，分数部分不够减，借 1 得 $2\\frac{6}{4}-1\\frac{3}{4}=1\\frac{3}{4}$，不是 $2\\frac{1}{4}$。',
        'D：要先通分，$\\frac{4}{10}+\\frac{3}{10}=\\frac{7}{10}$。选 B。',
      ],
      verify: () => {
        const ok = [
          F(1).div(3).add(F(1).div(4)).eq(F(2).div(7)),
          F(5).div(6).sub(F(1).div(6)).eq(F(2).div(3)),
          F(7).div(2).sub(F(7).div(4)).eq(F(9).div(4)),
          F(2).div(5).add(F(3).div(10)).eq(F(5).div(15)),
        ];
        return ok.indexOf(true);
      },
    },

    // ---------- 扩展 ----------
    {
      id: '2.4-e01',
      level: 'extended',
      type: 'fill',
      stem: '计算：$\\frac{1}{1\\times 2}+\\frac{1}{2\\times 3}+\\frac{1}{3\\times 4}+\\cdots+\\frac{1}{19\\times 20}$',
      blanks: [{ kind: 'num', answer: '19/20' }],
      explain: [
        '每一项裂项：$\\frac{1}{1\\times 2}=1-\\frac{1}{2}$，$\\frac{1}{2\\times 3}=\\frac{1}{2}-\\frac{1}{3}$，……，$\\frac{1}{19\\times 20}=\\frac{1}{19}-\\frac{1}{20}$。',
        '相加时中间的项一正一负全部抵消，只剩第一项的 1 和最后一项的 $-\\frac{1}{20}$。',
        '结果 $1-\\frac{1}{20}=\\frac{19}{20}$。',
      ],
      verify: () => { let s = F(0); for (let n = 1; n <= 19; n++) s = s.add(F(1).div(n * (n + 1))); return s; },
    },
    {
      id: '2.4-e02',
      level: 'extended',
      type: 'fill',
      stem: '计算：$1\\frac{1}{2}-\\frac{5}{6}+\\frac{7}{12}-\\frac{9}{20}+\\frac{11}{30}-\\frac{13}{42}$',
      blanks: [{ kind: 'num', answer: '6/7' }],
      explain: [
        '找规律：$1\\frac{1}{2}=\\frac{3}{2}=1+\\frac{1}{2}$，$\\frac{5}{6}=\\frac{1}{2}+\\frac{1}{3}$，$\\frac{7}{12}=\\frac{1}{3}+\\frac{1}{4}$，$\\frac{9}{20}=\\frac{1}{4}+\\frac{1}{5}$，$\\frac{11}{30}=\\frac{1}{5}+\\frac{1}{6}$，$\\frac{13}{42}=\\frac{1}{6}+\\frac{1}{7}$。',
        '（分母是两个相邻数的积，分子是这两个数的和，就能拆成两个单位分数的**和**。）',
        '代入：$\\left(1+\\frac{1}{2}\\right)-\\left(\\frac{1}{2}+\\frac{1}{3}\\right)+\\left(\\frac{1}{3}+\\frac{1}{4}\\right)-\\cdots-\\left(\\frac{1}{6}+\\frac{1}{7}\\right)$，相邻两括号里相同的单位分数一加一减抵消。',
        '只剩 $1-\\frac{1}{7}=\\frac{6}{7}$。',
      ],
      verify: () => { let s = F(0); for (let n = 1; n <= 6; n++) s = s.add(F(2 * n + 1).div(n * (n + 1)).mul(n % 2 ? 1 : -1)); return s; },
    },
    {
      id: '2.4-e03',
      level: 'extended',
      type: 'fill',
      stem: '一项工程，第一天完成了全部的 $\\frac{1}{4}$，第二天比第一天多完成全部的 $\\frac{1}{12}$。还剩全部的几分之几没有完成？',
      blanks: [{ kind: 'num', answer: '5/12' }],
      explain: [
        '把全部工程看作单位"1"。第二天完成 $\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$。',
        '还剩 $1-\\frac{1}{4}-\\frac{1}{3}=\\frac{12-3-4}{12}=\\frac{5}{12}$。',
        '易错：以为第二天完成 $\\frac{1}{12}$；或者用 $1-\\frac{1}{4}-\\frac{1}{12}$。',
      ],
      verify: () => F(1).sub(F(1).div(4)).sub(F(1).div(4).add(F(1).div(12))),
    },
    {
      id: '2.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '把 $\\frac{1}{6}$ 写成两个不同的单位分数之和：$\\frac{1}{6}=\\frac{1}{a}+\\frac{1}{b}$（$a<b$）。一共有几种写法？',
      blanks: [{ kind: 'num', answer: '4', suffix: '种' }],
      explain: [
        '两个加数都比 $\\frac{1}{6}$ 小，所以 $a>6$；又因为 $\\frac{1}{a}$ 是较大的一个，它比 $\\frac{1}{6}$ 的一半 $\\frac{1}{12}$ 大，$a<12$。$a$ 只能是 7～11。',
        '逐个试 $\\frac{1}{6}-\\frac{1}{a}$ 是不是单位分数：$a=7$：$\\frac{7-6}{42}=\\frac{1}{42}$，是；$a=8$：$\\frac{2}{48}=\\frac{1}{24}$，是；$a=9$：$\\frac{3}{54}=\\frac{1}{18}$，是；$a=10$：$\\frac{4}{60}=\\frac{1}{15}$，是；$a=11$：$\\frac{5}{66}$，不是。',
        '共 4 种：$\\frac{1}{7}+\\frac{1}{42}$、$\\frac{1}{8}+\\frac{1}{24}$、$\\frac{1}{9}+\\frac{1}{18}$、$\\frac{1}{10}+\\frac{1}{15}$。',
        '易错：把 $a=12$（$\\frac{1}{12}+\\frac{1}{12}$，两个加数相同）也算进去。',
      ],
      verify: () => {
        let c = 0;
        for (let a = 2; a < 100; a++) for (let b = a + 1; b < 1000; b++) if (F(1).div(a).add(F(1).div(b)).eq(F(1).div(6))) c++;
        return c;
      },
    },
    {
      id: '2.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\square$ 里填一个数：$7\\frac{1}{3}-\\square=2\\frac{5}{6}$',
      blanks: [{ kind: 'num', answer: '9/2' }],
      explain: [
        '减数 = 被减数 − 差：$7\\frac{1}{3}-2\\frac{5}{6}=7\\frac{2}{6}-2\\frac{5}{6}=6\\frac{8}{6}-2\\frac{5}{6}=4\\frac{3}{6}=4\\frac{1}{2}$。',
        '易错：用 $7\\frac{1}{3}+2\\frac{5}{6}$；或者借 1 时写成 $6\\frac{12}{6}$。',
      ],
      verify: () => F(22).div(3).sub(F(17).div(6)),
    },
    {
      id: '2.4-e06',
      level: 'extended',
      type: 'fill',
      stem: '观察 $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\cdots$，每一项是前一项的一半。',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{8}+\\frac{1}{16}+\\frac{1}{32}+\\frac{1}{64}=$', answer: '63/64' },
        { kind: 'num', label: '(2) 从 $\\frac{1}{2}$ 开始至少加到第几项，和才超过 $\\frac{999}{1000}$', answer: '10' },
      ],
      explain: [
        '画一个正方形看作 1：先取一半，再取剩下的一半……每加一项，剩下的部分就恰好等于最后加上的那一项。',
        '(1) 加到 $\\frac{1}{64}$，剩下 $\\frac{1}{64}$，和是 $1-\\frac{1}{64}=\\frac{63}{64}$。',
        '(2) 加到第 $n$ 项，和是 1 减去最后一项。要超过 $\\frac{999}{1000}$，最后一项要比 $\\frac{1}{1000}$ 小，分母要超过 1000：2、4、8、……、512、1024，第 10 项的分母是 1024。',
        '所以至少加到第 10 项。易错：第 9 项分母 512，和是 $\\frac{511}{512}$，还没超过。',
      ],
      verify: () => {
        let s = F(0);
        for (let n = 1; n <= 6; n++) s = s.add(F(1).div(2 ** n));
        let t = F(0);
        let k = 0;
        for (let n = 1; ; n++) { t = t.add(F(1).div(2 ** n)); if (t.cmp(F(999).div(1000)) > 0) { k = n; break; } }
        return [s, k];
      },
    },
    {
      id: '2.4-e07',
      level: 'extended',
      type: 'fill',
      stem: '小明做作业用了 $1\\frac{1}{4}$ 小时，比看书多用了 $\\frac{1}{3}$ 小时。两项一共用了几小时？',
      blanks: [{ kind: 'num', answer: '13/6', suffix: '小时' }],
      explain: [
        '做作业比看书多 $\\frac{1}{3}$ 小时，看书用了 $1\\frac{1}{4}-\\frac{1}{3}=1\\frac{3}{12}-\\frac{4}{12}=\\frac{11}{12}$ 小时。',
        '一共 $1\\frac{1}{4}+\\frac{11}{12}=1\\frac{3}{12}+\\frac{11}{12}=2\\frac{2}{12}=2\\frac{1}{6}$ 小时。',
        '易错：看到"多"就用加法，得看书 $1\\frac{7}{12}$ 小时。',
      ],
      verify: () => { const hw = F(5).div(4); const rd = hw.sub(F(1).div(3)); return hw.add(rd); },
    },
    {
      id: '2.4-e08',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\frac{1}{2}\\ \\bigcirc\\ \\frac{1}{3}\\ \\bigcirc\\ \\frac{1}{4}\\ \\bigcirc\\ \\frac{1}{5}\\ \\bigcirc\\ \\frac{1}{6}$ 的每个 $\\bigcirc$ 里填"+"或"−"，使结果是正数，而且尽量小。这个结果是多少？',
      blanks: [{ kind: 'num', answer: '1/20' }],
      explain: [
        '通分成分母 60：五个数是 $\\frac{30}{60}$、$\\frac{20}{60}$、$\\frac{15}{60}$、$\\frac{12}{60}$、$\\frac{10}{60}$，总和 $\\frac{87}{60}$。',
        '结果 = 前面带"+"的分子和 − 带"−"的分子和（再除以 60）。两部分的和是 87，是奇数，所以两部分不可能相等，差至少是 1，而且差一定是奇数。',
        '30 一定在"+"那一部分。试着让两部分接近 43、44：含 30 的"+"部分可以是 $30+15=45$（另一部分 $20+12+10=42$，差 3），或 $30+12=42$（差是负的）。凑不出 43 或 44（$30+13$、$30+14$ 都不行），所以差不能是 1。',
        '最小的正结果是 $\\frac{3}{60}=\\frac{1}{20}$：$\\frac{1}{2}-\\frac{1}{3}+\\frac{1}{4}-\\frac{1}{5}-\\frac{1}{6}=\\frac{1}{20}$。',
      ],
      verify: () => {
        const v = [F(1).div(3), F(1).div(4), F(1).div(5), F(1).div(6)];
        let best = null;
        for (let m = 0; m < 16; m++) {
          let s = F(1).div(2);
          v.forEach((x, i) => { s = (m >> i) & 1 ? s.add(x) : s.sub(x); });
          if (s.cmp(0) > 0 && (!best || s.cmp(best) < 0)) best = s;
        }
        return best;
      },
    },
    {
      id: '2.4-e09',
      level: 'extended',
      type: 'fill',
      stem: '把 $\\frac{7}{12}$ 写成两个不同的单位分数之和，有几种写法？',
      blanks: [{ kind: 'num', answer: '2', suffix: '种' }],
      explain: [
        '设 $\\frac{7}{12}=\\frac{1}{a}+\\frac{1}{b}$，$a<b$。较大的 $\\frac{1}{a}$ 要比 $\\frac{7}{12}$ 的一半大、比 $\\frac{7}{12}$ 小：$\\frac{7}{24}<\\frac{1}{a}<\\frac{7}{12}$，所以 $a$ 是 2 或 3。',
        '$a=2$：$\\frac{7}{12}-\\frac{1}{2}=\\frac{1}{12}$，是单位分数。$a=3$：$\\frac{7}{12}-\\frac{1}{3}=\\frac{3}{12}=\\frac{1}{4}$，是单位分数。',
        '共 2 种：$\\frac{1}{2}+\\frac{1}{12}$ 和 $\\frac{1}{3}+\\frac{1}{4}$。',
        '易错：只凑出 $\\frac{1}{3}+\\frac{1}{4}$ 就停了。',
      ],
      verify: () => {
        let c = 0;
        for (let a = 2; a < 100; a++) for (let b = a + 1; b < 1000; b++) if (F(1).div(a).add(F(1).div(b)).eq(F(7).div(12))) c++;
        return c;
      },
    },
    {
      id: '2.4-e10',
      level: 'extended',
      type: 'fill',
      stem: '计算：$1\\frac{1}{2}+2\\frac{1}{6}+3\\frac{1}{12}+4\\frac{1}{20}+5\\frac{1}{30}+6\\frac{1}{42}$',
      blanks: [{ kind: 'num', answer: '153/7' }],
      explain: [
        '整数部分和分数部分分开：整数部分 $1+2+3+4+5+6=21$。',
        '分数部分 $\\frac{1}{2}+\\frac{1}{6}+\\frac{1}{12}+\\frac{1}{20}+\\frac{1}{30}+\\frac{1}{42}=\\frac{1}{1\\times 2}+\\frac{1}{2\\times 3}+\\cdots+\\frac{1}{6\\times 7}$，裂项得 $1-\\frac{1}{7}=\\frac{6}{7}$。',
        '结果 $21\\frac{6}{7}$。',
      ],
      verify: () => { let s = F(0); for (let n = 1; n <= 6; n++) s = s.add(n).add(F(1).div(n * (n + 1))); return s; },
    },

    // ---------- 挑战 ----------
    {
      id: '2.4-c01',
      level: 'challenge',
      type: 'fill',
      stem: '把 1 写成几个**不同**的单位分数之和：',
      blanks: [
        { kind: 'num', label: '(1) 写成三个不同单位分数之和 $1=\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}$（$a<b<c$），有几种写法', answer: '1' },
        { kind: 'num', label: '(2) 写成 $1=\\frac{1}{2}+\\frac{1}{4}+\\frac{1}{d}+\\frac{1}{e}$（四个单位分数都不同，$d<e$），有几种写法', answer: '2' },
      ],
      explain: [
        '(1) 思路：先用"最大的一项"卡住范围。$\\frac{1}{a}$ 最大，三项之和不超过它的 3 倍，所以 $\\frac{1}{a}>\\frac{1}{3}$ 以外的情况要排除：如果 $a\\ge 3$，三项最大是 $\\frac{1}{3}+\\frac{1}{4}+\\frac{1}{5}=\\frac{47}{60}<1$，不够。所以 $a=2$。',
        '剩下 $\\frac{1}{b}+\\frac{1}{c}=\\frac{1}{2}$，$b>2$。同样，$\\frac{1}{b}$ 比 $\\frac{1}{2}$ 的一半 $\\frac{1}{4}$ 大，$b<4$，只能 $b=3$，$\\frac{1}{c}=\\frac{1}{6}$。',
        '只有 $\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{6}$ 一种。',
        '(2) $\\frac{1}{d}+\\frac{1}{e}=1-\\frac{1}{2}-\\frac{1}{4}=\\frac{1}{4}$，而且 $d$、$e$ 都不能是 2、4。$\\frac{1}{d}$ 在 $\\frac{1}{8}$ 和 $\\frac{1}{4}$ 之间，$d$ 是 5、6、7。',
        '$d=5$：$\\frac{1}{4}-\\frac{1}{5}=\\frac{1}{20}$，可以；$d=6$：$\\frac{1}{12}$，可以；$d=7$：$\\frac{3}{28}$，不是单位分数。（$d=8$ 时 $e=8$，两项相同。）',
        '共 2 种：$\\frac{1}{5}+\\frac{1}{20}$、$\\frac{1}{6}+\\frac{1}{12}$。',
      ],
      verify: () => {
        let a3 = 0;
        for (let a = 2; a < 10; a++) for (let b = a + 1; b < 50; b++) for (let c = b + 1; c < 200; c++) if (F(1).div(a).add(F(1).div(b)).add(F(1).div(c)).eq(1)) a3++;
        let a4 = 0;
        for (let d = 3; d < 100; d++) for (let e = d + 1; e < 1000; e++) if (![2, 4].includes(d) && ![2, 4].includes(e) && F(1).div(d).add(F(1).div(e)).eq(F(1).div(4))) a4++;
        return [a3, a4];
      },
    },
    {
      id: '2.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '一串分数 $\\frac{2}{1\\times 3}$、$\\frac{2}{3\\times 5}$、$\\frac{2}{5\\times 7}$、……，分母是两个相邻奇数的积。',
      blanks: [
        { kind: 'num', label: '(1) 前 49 项的和是', answer: '98/99' },
        { kind: 'num', label: '(2) 从第一项开始，至少加到第几项，和才超过 $\\frac{9}{10}$', answer: '5' },
      ],
      explain: [
        '思路：像 $\\frac{1}{n\\times(n+1)}$ 那样裂项，但这里相邻两个奇数相差 2。试一试：$1-\\frac{1}{3}=\\frac{2}{3}=\\frac{2}{1\\times 3}$，$\\frac{1}{3}-\\frac{1}{5}=\\frac{2}{15}=\\frac{2}{3\\times 5}$。',
        '所以 $\\frac{2}{(2k-1)\\times(2k+1)}=\\frac{1}{2k-1}-\\frac{1}{2k+1}$：分子 2 正好是两个分母的差。',
        '(1) 前 49 项：$\\left(1-\\frac{1}{3}\\right)+\\left(\\frac{1}{3}-\\frac{1}{5}\\right)+\\cdots+\\left(\\frac{1}{97}-\\frac{1}{99}\\right)=1-\\frac{1}{99}=\\frac{98}{99}$。',
        '(2) 前 $n$ 项的和是 $1-\\frac{1}{2n+1}$。要超过 $\\frac{9}{10}$，$\\frac{1}{2n+1}$ 要比 $\\frac{1}{10}$ 小，$2n+1>10$，$n\\ge 5$。',
        '检验：前 4 项和 $\\frac{8}{9}<\\frac{9}{10}$，前 5 项和 $\\frac{10}{11}>\\frac{9}{10}$。所以至少加到第 5 项。',
      ],
      verify: () => {
        let s = F(0);
        for (let k = 1; k <= 49; k++) s = s.add(F(2).div((2 * k - 1) * (2 * k + 1)));
        let t = F(0);
        let n = 0;
        for (let k = 1; ; k++) { t = t.add(F(2).div((2 * k - 1) * (2 * k + 1))); if (t.cmp(F(9).div(10)) > 0) { n = k; break; } }
        return [s, n];
      },
    },
    {
      id: '2.4-c03',
      level: 'challenge',
      type: 'fill',
      stem: '从 1～9 中选四个不同的数字填入 $\\frac{\\square}{\\square}+\\frac{\\square}{\\square}$，两个分数都是真分数（交换两个加数算同一种）。',
      blanks: [
        { kind: 'num', label: '(1) 使和等于 1 的填法有几种', answer: '9' },
        { kind: 'num', label: '(2) 使和等于 $\\frac{1}{2}$ 的填法有几种', answer: '2' },
      ],
      explain: [
        '思路：按两个加数约分后的最简分数分类。两个真分数的和是 1，约分后是 $\\frac{1}{2}+\\frac{1}{2}$、$\\frac{1}{3}+\\frac{2}{3}$、$\\frac{1}{4}+\\frac{3}{4}$ 等（分母要能用一位数写出来）。',
        '(1) $\\frac{1}{2}+\\frac{1}{2}$：一位数写法有 $\\frac{1}{2}$、$\\frac{2}{4}$、$\\frac{3}{6}$、$\\frac{4}{8}$，选两个数字不重复的：$\\frac{1}{2}+\\frac{3}{6}$、$\\frac{1}{2}+\\frac{4}{8}$、$\\frac{2}{4}+\\frac{3}{6}$、$\\frac{3}{6}+\\frac{4}{8}$，4 种。',
        '$\\frac{1}{3}+\\frac{2}{3}$：$\\frac{1}{3}$ 可写 $\\frac{1}{3}$、$\\frac{2}{6}$、$\\frac{3}{9}$，$\\frac{2}{3}$ 可写 $\\frac{2}{3}$、$\\frac{4}{6}$、$\\frac{6}{9}$，不重复的：$\\frac{1}{3}+\\frac{4}{6}$、$\\frac{1}{3}+\\frac{6}{9}$、$\\frac{3}{9}+\\frac{4}{6}$，3 种。',
        '$\\frac{1}{4}+\\frac{3}{4}$：$\\frac{1}{4}$、$\\frac{2}{8}$ 和 $\\frac{3}{4}$、$\\frac{6}{8}$，不重复的 $\\frac{1}{4}+\\frac{6}{8}$、$\\frac{2}{8}+\\frac{3}{4}$，2 种。其他（如 $\\frac{1}{5}+\\frac{4}{5}$）都只有同分母一种写法，数字重复。共 9 种。',
        '(2) 和是 $\\frac{1}{2}$：两个真分数约分后是 $\\frac{1}{4}+\\frac{1}{4}$ 或 $\\frac{1}{6}+\\frac{1}{3}$ 等。$\\frac{1}{4}+\\frac{2}{8}$；$\\frac{1}{6}+\\frac{3}{9}$（$\\frac{1}{6}+\\frac{1}{3}$、$\\frac{1}{6}+\\frac{2}{6}$ 数字重复）。检查其他组合都有重复数字，共 2 种。',
      ],
      verify: () => {
        const count = T => {
          const S = new Set();
          for (let a = 1; a <= 9; a++) for (let b = a + 1; b <= 9; b++) for (let c = 1; c <= 9; c++) for (let d = c + 1; d <= 9; d++) {
            if (new Set([a, b, c, d]).size === 4 && F(a).div(b).add(F(c).div(d)).eq(T)) S.add([a + '/' + b, c + '/' + d].sort().join('+'));
          }
          return S.size;
        };
        return [count(F(1)), count(F(1).div(2))];
      },
    },
    {
      id: '2.4-c04',
      level: 'challenge',
      type: 'fill',
      stem: '把分数写成两个不同的单位分数之和：',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{2}{7}=\\frac{1}{a}+\\frac{1}{b}$（$a<b$），$a+b=$', answer: '32' },
        { kind: 'num', label: '(2) $\\frac{2}{9}=\\frac{1}{a}+\\frac{1}{b}$（$a<b$）有几种写法', answer: '2' },
      ],
      explain: [
        '思路：较大的 $\\frac{1}{a}$ 比总和的一半大、比总和小，先定 $a$ 的范围，再逐个检验。',
        '(1) $\\frac{1}{7}<\\frac{1}{a}<\\frac{2}{7}$：把 $\\frac{2}{7}$ 看成 $\\frac{1}{3.5}$，$a$ 在 3.5 和 7 之间，$a$ 是 4、5、6。',
        '$a=4$：$\\frac{2}{7}-\\frac{1}{4}=\\frac{8-7}{28}=\\frac{1}{28}$，是；$a=5$：$\\frac{10-7}{35}=\\frac{3}{35}$，不是；$a=6$：$\\frac{12-7}{42}=\\frac{5}{42}$，不是。只有 $\\frac{1}{4}+\\frac{1}{28}$，$a+b=32$。',
        '(2) $\\frac{1}{9}<\\frac{1}{a}<\\frac{2}{9}$，$a$ 在 4.5 和 9 之间：5、6、7、8。',
        '$a=5$：$\\frac{10-9}{45}=\\frac{1}{45}$，是；$a=6$：$\\frac{12-9}{54}=\\frac{3}{54}=\\frac{1}{18}$，是；$a=7$：$\\frac{5}{63}$，不是；$a=8$：$\\frac{7}{72}$，不是。共 2 种。',
        '易错：(2) 算出 $\\frac{3}{54}$ 没有约分，以为不是单位分数。',
      ],
      verify: () => {
        const two = (p, q) => { const r = []; for (let a = 2; a < 200; a++) for (let b = a + 1; b < 5000; b++) if (F(1).div(a).add(F(1).div(b)).eq(F(p).div(q))) r.push([a, b]); return r; };
        const r1 = two(2, 7);
        return [r1.length === 1 ? r1[0][0] + r1[0][1] : 0, two(2, 9).length];
      },
    },
    {
      id: '2.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '按下面的规律依次相加：$\\frac{1}{2}+\\left(\\frac{1}{3}+\\frac{2}{3}\\right)+\\left(\\frac{1}{4}+\\frac{2}{4}+\\frac{3}{4}\\right)+\\cdots+\\left(\\frac{1}{50}+\\frac{2}{50}+\\cdots+\\frac{49}{50}\\right)$。',
      blanks: [
        { kind: 'num', label: '(1) 全部加起来的和是', answer: '1225/2' },
        { kind: 'num', label: '(2) 从第一个数开始逐个往上加，加到哪一个数时，和第一次超过 100（写出这个数）', answer: '15/21' },
      ],
      explain: [
        '思路：先算每一组的和。分母是 $n$ 的一组有 $n-1$ 个数，首尾配对：$\\frac{1}{n}+\\frac{n-1}{n}=1$，$\\frac{2}{n}+\\frac{n-2}{n}=1$……一组的和是 $\\frac{n-1}{2}$。',
        '(1) 各组的和依次是 $\\frac{1}{2}$、$\\frac{2}{2}$、$\\frac{3}{2}$、……、$\\frac{49}{2}$，总和 $\\frac{1+2+\\cdots+49}{2}=\\frac{1225}{2}=612\\frac{1}{2}$。',
        '(2) 前几组的和：加完分母是 $n$ 的一组，总和是 $\\frac{1+2+\\cdots+(n-1)}{2}$。分母 20 的一组加完时是 $\\frac{190}{2}=95$，分母 21 的一组加完时是 $95+10=105$。所以在分母 21 的一组中超过 100。',
        '还差 5，也就是还要加 $\\frac{105}{21}$。分母 21 的一组依次加 $\\frac{1}{21}$、$\\frac{2}{21}$、……，前 $k$ 个的分子和是 $1+2+\\cdots+k$，要超过 105：$k=14$ 时是 105，正好等于、没有超过；$k=15$ 时是 120，超过。',
        '所以加到 $\\frac{15}{21}$ 时和第一次超过 100。',
        '易错：$k=14$ 时和恰好是 100，不算"超过"。',
      ],
      verify: () => {
        let S = F(0);
        for (let n = 2; n <= 50; n++) for (let k = 1; k < n; k++) S = S.add(F(k).div(n));
        let T = F(0);
        let hit = null;
        for (let n = 2; n <= 50 && !hit; n++) for (let k = 1; k < n; k++) { T = T.add(F(k).div(n)); if (T.cmp(100) > 0) { hit = F(k).div(n); break; } }
        return [S, hit];
      },
    },
  ],
});
