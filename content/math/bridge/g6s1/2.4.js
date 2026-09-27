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
  audit: { blind: '2026-09-27', rounds: 3, note: '子代理盲解复核三轮，答案全部一致；第 1 轮按意见重做 e03～e05、e07、e09 和 c01、c02、c04，第 2 轮消除 e08/e09 同构、c04 改成素数分母的推广分类，第 3 轮判定整节通过' },

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
      example: '$\\frac{1}{56}=\\frac{1}{7\\times 8}=\\frac{1}{7}-\\frac{1}{8}$。',
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
      stem: '一项工程，第一天完成了全部的 $\\frac{1}{4}$，第二天比第一天多完成全部的 $\\frac{1}{12}$，第三天完成的比前两天完成的总和少全部的 $\\frac{1}{4}$。还剩全部的几分之几没有完成？',
      blanks: [{ kind: 'num', answer: '1/12' }],
      explain: [
        '把全部工程看作单位"1"。第二天完成 $\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$。',
        '前两天共完成 $\\frac{1}{4}+\\frac{1}{3}=\\frac{7}{12}$；第三天完成 $\\frac{7}{12}-\\frac{1}{4}=\\frac{4}{12}=\\frac{1}{3}$。',
        '三天共完成 $\\frac{7}{12}+\\frac{4}{12}=\\frac{11}{12}$，还剩 $\\frac{1}{12}$。',
        '易错：把第三天当成"比第二天少"，或者把"少 $\\frac{1}{4}$"理解成比前两天少了前两天的 $\\frac{1}{4}$。',
      ],
      verify: () => {
        const d1 = F(1).div(4);
        const d2 = d1.add(F(1).div(12));
        const d3 = d1.add(d2).sub(F(1).div(4));
        return F(1).sub(d1).sub(d2).sub(d3);
      },
    },
    {
      id: '2.4-e04',
      level: 'extended',
      type: 'fill',
      stem: '两个分数的和是 $1\\frac{1}{12}$，差是 $\\frac{1}{4}$。较大的分数是多少？',
      blanks: [{ kind: 'num', answer: '2/3' }],
      explain: [
        '统一成十二分之几：和是 $\\frac{13}{12}$，差是 $\\frac{3}{12}$。',
        '较大的数 + 较小的数 = 13 个 $\\frac{1}{12}$；较大的数 − 较小的数 = 3 个 $\\frac{1}{12}$。把较小的数补成和较大的数一样大（补上 3 个 $\\frac{1}{12}$），两个较大的数合起来是 16 个 $\\frac{1}{12}$。',
        '较大的数是 8 个 $\\frac{1}{12}$，即 $\\frac{8}{12}=\\frac{2}{3}$（较小的数是 $\\frac{5}{12}$）。',
        '检验：$\\frac{2}{3}+\\frac{5}{12}=\\frac{13}{12}$，$\\frac{2}{3}-\\frac{5}{12}=\\frac{3}{12}$。',
      ],
      verify: () => {
        for (let n = 1; n < 100; n++) { const big = F(n).div(24); const small = F(13).div(12).sub(big); if (big.sub(small).eq(F(1).div(4))) return big; }
        return F(0);
      },
    },
    {
      id: '2.4-e05',
      level: 'extended',
      type: 'fill',
      stem: '一个数先加上 $2\\frac{5}{6}$，再减去 $4\\frac{3}{8}$，结果是 $1\\frac{1}{12}$。这个数是多少？',
      blanks: [{ kind: 'num', answer: '21/8' }],
      explain: [
        '倒推：最后减去了 $4\\frac{3}{8}$，先加回来；之前加上了 $2\\frac{5}{6}$，再减掉。',
        '这个数 $=1\\frac{1}{12}+4\\frac{3}{8}-2\\frac{5}{6}$，通分成分母 24：$1\\frac{2}{24}+4\\frac{9}{24}-2\\frac{20}{24}=5\\frac{11}{24}-2\\frac{20}{24}$。',
        '分数部分不够减，借 1：$4\\frac{35}{24}-2\\frac{20}{24}=2\\frac{15}{24}=2\\frac{5}{8}$。',
        '易错：倒推时仍然按"先加后减"的顺序算，得到 $1\\frac{1}{12}+2\\frac{5}{6}-4\\frac{3}{8}$，结果不够减。',
      ],
      verify: () => F(13).div(12).add(F(35).div(8)).sub(F(17).div(6)),
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
      stem: '小明周末做作业用了 $1\\frac{1}{4}$ 小时，看书比做作业少用 $\\frac{1}{3}$ 小时，运动比看书多用 $\\frac{1}{6}$ 小时。',
      blanks: [
        { kind: 'num', label: '(1) 运动用了几小时', answer: '13/12' },
        { kind: 'num', label: '(2) 三项一共用了几小时', answer: '13/4' },
      ],
      explain: [
        '看书：$1\\frac{1}{4}-\\frac{1}{3}=\\frac{15}{12}-\\frac{4}{12}=\\frac{11}{12}$ 小时。',
        '(1) 运动：$\\frac{11}{12}+\\frac{1}{6}=\\frac{11}{12}+\\frac{2}{12}=\\frac{13}{12}=1\\frac{1}{12}$ 小时。',
        '(2) 一共：$\\frac{15}{12}+\\frac{11}{12}+\\frac{13}{12}=\\frac{39}{12}=3\\frac{1}{4}$ 小时。',
        '易错：运动是"比看书多"，不是比做作业多；一连串比较要一步一步找清楚和谁比。',
      ],
      verify: () => { const hw = F(5).div(4); const rd = hw.sub(F(1).div(3)); const sp = rd.add(F(1).div(6)); return [sp, hw.add(rd).add(sp)]; },
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
      stem: '从 $\\frac{1}{3}$、$\\frac{1}{4}$、$\\frac{1}{5}$、$\\frac{1}{6}$、$\\frac{1}{7}$、$\\frac{1}{8}$ 中选出若干个相加，要求和比 1 小。和最大是多少？',
      blanks: [{ kind: 'num', answer: '271/280' }],
      explain: [
        '思路：六个数全加起来比 1 大多少？再想"去掉哪些数"最划算。',
        '通分成分母 840：六个数依次是 280、210、168、140、120、105 个 $\\frac{1}{840}$，全部加起来是 1023 个，比 1（840 个）多 183 个。',
        '要让和比 1 小，去掉的部分必须超过 183 个；要让和最大，去掉的部分要尽量少。单独去掉一个：210（$\\frac{1}{4}$）或 280 超过 183，最少是 210；去掉两个或更多，至少 $105+120=225$，更多。',
        '所以去掉 $\\frac{1}{4}$，和是 $1023-210=813$ 个 $\\frac{1}{840}$，即 $\\frac{813}{840}=\\frac{271}{280}$。',
        '易错：去掉最小的 $\\frac{1}{8}$，剩下的和是 $\\frac{918}{840}$，仍然比 1 大。',
      ],
      verify: () => {
        const v = [3, 4, 5, 6, 7, 8].map(d => F(1).div(d));
        let best = F(0);
        for (let m = 1; m < 64; m++) {
          let s = F(0);
          v.forEach((x, i) => { if ((m >> i) & 1) s = s.add(x); });
          if (s.cmp(1) < 0 && s.cmp(best) > 0) best = s;
        }
        return best;
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
      stem: '把 1 写成四个**不同**的单位分数之和：$1=\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}+\\frac{1}{d}$（$a<b<c<d$）。',
      blanks: [
        { kind: 'num', label: '(1) 一共有几种写法', answer: '6' },
        { kind: 'num', label: '(2) 其中 $d$ 最大是多少', answer: '42' },
      ],
      explain: [
        '思路：从最大的一项开始，一层一层卡范围。',
        '$\\frac{1}{a}$ 最大，四项之和比它的 4 倍小，所以 $\\frac{1}{a}>\\frac{1}{4}$；$a\\ne 1$。如果 $a=3$，四项最大是 $\\frac{1}{3}+\\frac{1}{4}+\\frac{1}{5}+\\frac{1}{6}=\\frac{57}{60}<1$。所以 $a=2$。',
        '剩下 $\\frac{1}{b}+\\frac{1}{c}+\\frac{1}{d}=\\frac{1}{2}$，$b>2$。同理 $\\frac{1}{b}>\\frac{1}{6}$，$b$ 是 3、4、5；$b=5$ 时最大 $\\frac{1}{5}+\\frac{1}{6}+\\frac{1}{7}<\\frac{1}{2}$，不行。',
        '$b=3$：$\\frac{1}{c}+\\frac{1}{d}=\\frac{1}{6}$，$c$ 在 7～11 之间逐个试：$c=7$、8、9、10 得 $d=42$、24、18、15（$c=11$ 不行）。4 种。',
        '$b=4$：$\\frac{1}{c}+\\frac{1}{d}=\\frac{1}{4}$，$c$ 在 5～7 之间：$c=5$ 得 $d=20$，$c=6$ 得 $d=12$，$c=7$ 不行。2 种。',
        '(1) 共 6 种；(2) $d$ 最大是 42（$\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{7}+\\frac{1}{42}$）。',
      ],
      verify: () => {
        const r = [];
        for (let a = 2; a < 5; a++) for (let b = a + 1; b < 13; b++) for (let c = b + 1; c < 60; c++) {
          const rem = F(1).sub(F(1).div(a)).sub(F(1).div(b)).sub(F(1).div(c));
          if (rem.cmp(0) > 0 && rem.n === 1n && Number(rem.d) > c) r.push(Number(rem.d));
        }
        return [r.length, Math.max(...r)];
      },
    },
    {
      id: '2.4-c02',
      level: 'challenge',
      type: 'fill',
      stem: '把 $\\frac{7}{15}$ 写成几个不同的单位分数之和。一种办法是每次都取"不超过剩下部分的最大单位分数"，直到剩下的部分本身是单位分数为止。',
      blanks: [
        { kind: 'num', label: '(1) 按这种办法，最后一个单位分数的分母是', answer: '120' },
        { kind: 'num', label: '(2) 把 $\\frac{7}{15}$ 写成不同单位分数之和，最少要几个', answer: '3' },
      ],
      explain: [
        '(1) 不超过 $\\frac{7}{15}$ 的最大单位分数：$\\frac{1}{2}=\\frac{7.5}{15}$ 太大，$\\frac{1}{3}=\\frac{5}{15}$ 可以。剩下 $\\frac{7}{15}-\\frac{1}{3}=\\frac{2}{15}$。',
        '不超过 $\\frac{2}{15}$ 的最大单位分数：$\\frac{2}{15}=\\frac{1}{7.5}$，所以是 $\\frac{1}{8}$。剩下 $\\frac{2}{15}-\\frac{1}{8}=\\frac{16-15}{120}=\\frac{1}{120}$，是单位分数，停止。',
        '$\\frac{7}{15}=\\frac{1}{3}+\\frac{1}{8}+\\frac{1}{120}$，最后一个分母是 120。',
        '(2) 一个不行（$\\frac{7}{15}$ 不是单位分数）。两个：$\\frac{7}{15}=\\frac{1}{a}+\\frac{1}{b}$（$a<b$），较大的 $\\frac{1}{a}$ 比 $\\frac{7}{30}$ 大、比 $\\frac{7}{15}$ 小，$a$ 在 $\\frac{15}{7}$ 和 $\\frac{30}{7}$ 之间，是 3 或 4。',
        '$a=3$：剩 $\\frac{2}{15}$，不是单位分数；$a=4$：剩 $\\frac{7}{15}-\\frac{1}{4}=\\frac{13}{60}$，不是。所以两个不行，最少 3 个（(1) 已经给出了 3 个的写法）。',
      ],
      verify: () => {
        let rem = F(7).div(15);
        const terms = [];
        while (rem.cmp(0) > 0) { let d = 1; while (F(1).div(d).cmp(rem) > 0) d++; terms.push(d); rem = rem.sub(F(1).div(d)); }
        let two = 0;
        for (let a = 2; a < 100; a++) for (let b = a + 1; b < 5000; b++) if (F(1).div(a).add(F(1).div(b)).eq(F(7).div(15))) two++;
        const isUnit = F(7).div(15).n === 1n;
        return [terms[terms.length - 1], isUnit ? 1 : two ? 2 : terms.length];
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
      stem: '把形如 $\\frac{2}{n}$（$n$ 是奇数）的分数写成两个不同的单位分数之和 $\\frac{1}{a}+\\frac{1}{b}$（$a<b$）。',
      blanks: [
        { kind: 'num', label: '(1) $\\frac{2}{19}=\\frac{1}{a}+\\frac{1}{b}$ 时，$a+b=$', answer: '200' },
        { kind: 'num', label: '(2) $n$ 取 5～25 中的奇数（5、7、9、……、25），$\\frac{2}{n}$ 恰好只有一种写法的 $n$ 有几个', answer: '7' },
      ],
      explain: [
        '思路：较大的 $\\frac{1}{a}$ 比总和的一半大、比总和小，所以 $a$ 在 $\\frac{n}{2}$ 和 $n$ 之间。$\\frac{2}{n}-\\frac{1}{a}=\\frac{2\\times a-n}{n\\times a}$，要是单位分数，分子 $2\\times a-n$ 要能整除分母 $n\\times a$。',
        '(1) $n=19$，$a$ 是 10～18。$a=10$ 时分子是 1，得 $\\frac{1}{190}$。$a=11$～18 时分子是 3～17 的奇数，它们和 19 互素，要整除 $19\\times a$ 就得整除 $a$；但分子 $2\\times a-19$ 如果整除 $a$，也就整除 $2\\times a$，进而整除 $2\\times a-(2\\times a-19)=19$，只能是 1。所以只有 $a=10$，$a+b=200$。',
        '(2) 上面的道理对任何**素数** $n$ 都成立：分子 $2\\times a-n$ 只能是 1，$a=\\frac{n+1}{2}$，恰好一种写法。5～25 中的素数：5、7、11、13、17、19、23，共 7 个。',
        '奇合数 9、15、21、25 除了 $a=\\frac{n+1}{2}$ 这种，还能再找到一种：$\\frac{2}{9}=\\frac{1}{6}+\\frac{1}{18}$，$\\frac{2}{15}=\\frac{1}{10}+\\frac{1}{30}$，$\\frac{2}{21}=\\frac{1}{14}+\\frac{1}{42}$，$\\frac{2}{25}=\\frac{1}{15}+\\frac{1}{75}$（都是取 $a$ 为 $n$ 的一个因数的 2 倍附近，让分子能约掉）。所以它们不止一种。',
        '答案是 7 个。',
      ],
      verify: () => {
        // 2/n = 1/a + 1/b（a<b）：b = n×a ÷ (2a − n) 要是整数且比 a 大
        const ways = n => { const r = []; for (let a = Math.floor(n / 2) + 1; a < n; a++) { const k = 2 * a - n; if ((n * a) % k === 0 && (n * a) / k > a) r.push([a, (n * a) / k]); } return r; };
        const w19 = ways(19);
        let k = 0;
        for (let n = 5; n <= 25; n += 2) if (ways(n).length === 1) k++;
        return [w19.length === 1 ? w19[0][0] + w19[0][1] : 0, k];
      },
    },
    {
      id: '2.4-c05',
      level: 'challenge',
      type: 'fill',
      stem: '按下面的规律依次相加：$\\frac{1}{2}+\\left(\\frac{1}{3}+\\frac{2}{3}\\right)+\\left(\\frac{1}{4}+\\frac{2}{4}+\\frac{3}{4}\\right)+\\cdots+\\left(\\frac{1}{50}+\\frac{2}{50}+\\cdots+\\frac{49}{50}\\right)$。',
      blanks: [
        { kind: 'num', label: '(1) 全部加起来的和是', answer: '1225/2' },
        { kind: 'num', label: '(2) 从第一个数开始逐个往上加，加到哪一个数时，和第一次超过 100（写出这个数，约分或不约分都可以）', answer: '15/21' },
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
