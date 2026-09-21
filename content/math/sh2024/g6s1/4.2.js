'use strict';

// 上海数学六年级上册 · 4.2 角
// 知识范围：角的概念（两条射线、旋转）与表示，平角、周角、直角、锐角、钝角，角的度量与度分秒换算，角的比较、和、差、倍，角平分线，余角与补角（同角或等角的余角相等、补角相等）；可以使用第 1～3 章和 4.1 的全部内容
// 还没学：对顶角、垂线与平行线、三角形内角和、轴对称、方位角
// 本节约定：角的度数都不超过 180°（周角只在“射线分周角”中出现）

// 配图统一放在这里（射线按题中的度数画出，保证与题干一致）
const FIG42 = {
  // ∠AOB=120°，∠AOC=40°，OD 平分 ∠BOC（80°），OE 平分 ∠AOC（20°）
  aocdb: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 170\" width=\"320\" height=\"170\" font-family=\"Times New Roman, serif\"><line x1=\"150\" y1=\"150\" x2=\"275.0\" y2=\"150.0\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"287.0\" y=\"155.0\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">A</text><line x1=\"150\" y1=\"150\" x2=\"267.5\" y2=\"107.2\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"278.7\" y=\"108.1\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">E</text><line x1=\"150\" y1=\"150\" x2=\"245.8\" y2=\"69.7\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"254.9\" y=\"66.9\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">C</text><line x1=\"150\" y1=\"150\" x2=\"171.7\" y2=\"26.9\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"173.8\" y=\"20.1\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">D</text><line x1=\"150\" y1=\"150\" x2=\"87.5\" y2=\"41.7\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"81.5\" y=\"36.4\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">B</text><circle cx=\"150\" cy=\"150\" r=\"2.5\" fill=\"#2b2b2b\"/><text x=\"146\" y=\"167\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">O</text></svg>",
  // ∠AOB=∠COD=90°，∠BOC=30°，∠AOD=150°
  right2: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 170\" width=\"320\" height=\"170\" font-family=\"Times New Roman, serif\"><line x1=\"150\" y1=\"150\" x2=\"275.0\" y2=\"150.0\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"287.0\" y=\"155.0\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">A</text><line x1=\"150\" y1=\"150\" x2=\"212.5\" y2=\"41.7\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"218.5\" y=\"36.4\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">C</text><line x1=\"150\" y1=\"150\" x2=\"150.0\" y2=\"25.0\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"150.0\" y=\"18.0\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">B</text><line x1=\"150\" y1=\"150\" x2=\"41.7\" y2=\"87.5\" stroke=\"#2b2b2b\" stroke-width=\"1.6\"/><text x=\"31.4\" y=\"86.5\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">D</text><circle cx=\"150\" cy=\"150\" r=\"2.5\" fill=\"#2b2b2b\"/><text x=\"146\" y=\"167\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">O</text></svg>",
};

// 两条射线（用与 OA 方向所成的逆时针度数表示）所成的角，结果在 0° 到 180° 之间
const angleBetween = (p, q) => {
  let d = F(p).sub(q).abs();
  while (d.cmp(360) >= 0) d = d.sub(360);
  return d.cmp(180) > 0 ? F(360).sub(d) : d;
};
// 度数（分数）转成“度分秒”字符串，给 angle 类型的空核对用
const dms = deg => {
  const s = F(deg).mul(3600);
  const total = Number(s.n / s.d);
  return `${Math.floor(total / 3600)}°${Math.floor((total % 3600) / 60)}'${total % 60}"`;
};

Content.section({
  id: 'math/sh2024/g6s1/4.2',
  title: '角',
  review: { status: 'pending' },
  audit: { blind: '2026-09-21', rounds: 2, note: '子代理盲解复核两轮：答案全部一致；第 2 轮按意见重做 c02（两角之和超过平角 + 含参舍解）、c04（分针平分 12 点方向与时针所成的角，过 6 点换侧）、c05（射线等分周角的角度和，按奇偶分类反求 n），c03 加与 x 有关的两段方程，升级 e04（无图分类）、e09（反复平分 + 度分秒阈值），e10 明确规则并去掉二选一，判定整节通过' },

  intro: [
    {
      title: '角的概念与表示',
      body: '有公共端点的两条射线组成的图形叫做**角**，公共端点是角的顶点。角也可以看成一条射线绕着端点从一个位置旋转到另一个位置形成的。旋转半周得到**平角**（$180^\\circ$），旋转一周得到**周角**（$360^\\circ$），$90^\\circ$ 的角是**直角**；小于直角的是锐角，大于直角而小于平角的是钝角。',
      example: '以 $O$ 为顶点、$OP$ 和 $OQ$ 为边的角记作 $\\angle POQ$，顶点字母写在中间；不会混淆时也可以写成 $\\angle O$，或者用 $\\angle 1$、$\\angle\\alpha$ 表示。',
      pitfall: '平角的两边在一条直线上，但平角不是直线；周角的两边重合，但周角也不是射线。',
    },
    {
      title: '度、分、秒',
      body: '$1^\\circ=60\'$，$1\'=60\'\'$。度化成分要乘 60，分化成度要除以 60。计算时度、分、秒分别相加减，满 60 进 1，不够减时向前一位借 1 当 60。',
      example: '$25.4^\\circ=25^\\circ+0.4\\times 60\'=25^\\circ 24\'$；$18^\\circ 45\'=18^\\circ+\\frac{45}{60}^\\circ=18.75^\\circ$。',
    },
    {
      title: '角的和差与角平分线',
      body: '角的度数可以相加、相减、乘一个数。从角的顶点出发，把这个角分成两个相等的角的射线，叫做这个角的**平分线**。若 $OM$ 平分 $\\angle POQ$，则 $\\angle POM=\\angle MOQ=\\frac{1}{2}\\angle POQ$。',
      example: '$\\angle POQ=70^\\circ$，$OM$ 平分 $\\angle POQ$，则 $\\angle POM=35^\\circ$；若射线 $OR$ 在 $\\angle POQ$ 内部且 $\\angle POR=50^\\circ$，则 $\\angle ROQ=20^\\circ$，$\\angle MOR=15^\\circ$。',
    },
    {
      title: '余角与补角',
      body: '两个角的和是 $90^\\circ$，这两个角**互为余角**；和是 $180^\\circ$，**互为补角**。同角（或等角）的余角相等，同角（或等角）的补角相等。一个角 $x^\\circ$（$0<x<90$）的余角是 $(90-x)^\\circ$，补角是 $(180-x)^\\circ$。',
      example: '$28^\\circ$ 的余角是 $62^\\circ$，补角是 $152^\\circ$。',
      pitfall: '余角、补角说的是两个角之间的数量关系，与它们的位置无关，不一定要有公共边。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '4.2-b01',
      level: 'basic',
      type: 'fill',
      stem: '度、分、秒的换算与计算。',
      blanks: [
        { kind: 'angle', label: '(1) $36.35^\\circ=$（用度分表示）', answer: "36°21'" },
        { kind: 'num', label: '(2) $52^\\circ 48\'=$（用度表示）', answer: '52.8', suffix: '°' },
        { kind: 'angle', label: '(3) $180^\\circ-47^\\circ 38\' 25\'\'=$', answer: "132°21'35\"" },
        { kind: 'angle', label: '(4) $100^\\circ\\div 3=$（用度分表示）', answer: "33°20'" },
      ],
      explain: [
        '(1) $0.35^\\circ=0.35\\times 60\'=21\'$，所以 $36.35^\\circ=36^\\circ 21\'$。易错：直接写成 $36^\\circ 35\'$。',
        '(2) $48\'=\\frac{48}{60}^\\circ=0.8^\\circ$，所以 $52^\\circ 48\'=52.8^\\circ$。',
        '(3) 把 $180^\\circ$ 写成 $179^\\circ 59\' 60\'\'$，再分别相减：$60\'\'-25\'\'=35\'\'$，$59\'-38\'=21\'$，$179^\\circ-47^\\circ=132^\\circ$。结果 $132^\\circ 21\' 35\'\'$。',
        '(4) $100^\\circ\\div 3=33^\\circ$ 余 $1^\\circ$，$1^\\circ=60\'$，$60\'\\div 3=20\'$。所以是 $33^\\circ 20\'$。',
      ],
      verify: () => [dms('36.35'), F(52).add(F(48).div(60)), dms(F(180).sub(F(47)).sub(F(38).div(60)).sub(F(25).div(3600))), dms(F(100).div(3))],
    },
    {
      id: '4.2-b02',
      level: 'basic',
      type: 'multi',
      stem: '下列说法中，正确的有（　　）',
      options: [
        '平角就是一条直线',
        '周角就是一条射线',
        '由两条射线组成的图形叫做角',
        '若 $\\angle 1+\\angle 2=180^\\circ$，则 $\\angle 1$ 与 $\\angle 2$ 互为补角',
        '一个锐角的补角比它的余角大 $90^\\circ$',
        '互补的两个角中，一定有一个是钝角',
        '一个钝角的一半一定是锐角',
      ],
      answer: [3, 4, 6],
      explain: [
        'A、B 错：平角、周角是角，只是它们的两边恰好在一条直线上或重合，角与直线、射线是不同的图形。',
        'C 错：两条射线要有公共端点才组成角。',
        'D 对：互补只看度数之和是否为 $180^\\circ$。',
        'E 对：设这个锐角是 $x^\\circ$，补角减余角 $=(180-x)-(90-x)=90$，与 $x$ 无关。',
        'F 错：两个直角也互补，其中没有钝角。',
        'G 对：钝角大于 $90^\\circ$ 且小于 $180^\\circ$，一半大于 $45^\\circ$ 且小于 $90^\\circ$，是锐角。',
        '所以选 D、E、G。',
      ],
      verify: () => {
        // E、F、G 用逐个取值检验（整数度）；A、B、C、D 是概念判断
        const E = [...Array(89).keys()].map(i => i + 1).every(x => (180 - x) - (90 - x) === 90);
        const Fok = [...Array(179).keys()].map(i => i + 1).every(x => x > 90 || 180 - x > 90);
        const G = [...Array(89).keys()].map(i => i + 91).every(x => x / 2 < 90);
        return [3, ...(E ? [4] : []), ...(Fok ? [5] : []), ...(G ? [6] : [])];
      },
    },
    {
      id: '4.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '一个角的补角比它的余角的 3 倍少 $20^\\circ$。',
      blanks: [
        { kind: 'num', label: '(1) 这个角是', answer: '35', suffix: '°' },
        { kind: 'num', label: '(2) 这个角的补角是', answer: '145', suffix: '°' },
      ],
      explain: [
        '(1) 设这个角是 $x^\\circ$，余角 $(90-x)^\\circ$，补角 $(180-x)^\\circ$。',
        '列方程：$180-x=3(90-x)-20$。去括号：$180-x=270-3x-20$，移项：$2x=70$，$x=35$。',
        '(2) 补角 $180^\\circ-35^\\circ=145^\\circ$。检验：余角 $55^\\circ$，$3\\times 55-20=145$，正确。',
        '易错：把“3 倍少 20”列成 $3(90-x-20)$。',
      ],
      verify: () => {
        let x = null;
        for (let i = 1; i < 90; i++) if (180 - i === 3 * (90 - i) - 20) x = i;
        return [x, 180 - x];
      },
    },
    {
      id: '4.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '如图，$\\angle AOB=120^\\circ$，射线 $OC$ 在 $\\angle AOB$ 内部，$\\angle AOC=40^\\circ$，$OD$ 平分 $\\angle BOC$，$OE$ 平分 $\\angle AOC$。',
      figure: FIG42.aocdb,
      blanks: [
        { kind: 'num', label: '(1) $\\angle AOD=$', answer: '80', suffix: '°' },
        { kind: 'num', label: '(2) $\\angle DOE=$', answer: '60', suffix: '°' },
      ],
      explain: [
        '(1) $\\angle BOC=\\angle AOB-\\angle AOC=120^\\circ-40^\\circ=80^\\circ$。$OD$ 平分 $\\angle BOC$，$\\angle COD=40^\\circ$。所以 $\\angle AOD=\\angle AOC+\\angle COD=80^\\circ$。',
        '(2) $\\angle EOC=\\frac{1}{2}\\angle AOC=20^\\circ$，$\\angle DOE=\\angle EOC+\\angle COD=20^\\circ+40^\\circ=60^\\circ$。',
        '可以发现 $\\angle DOE=\\frac{1}{2}\\angle AOC+\\frac{1}{2}\\angle BOC=\\frac{1}{2}\\angle AOB$，与 $OC$ 的位置无关。',
      ],
      verify: () => {
        const A = F(0), B = F(120), C = F(40);
        const D = B.add(C).div(2), E = A.add(C).div(2);
        return [angleBetween(A, D), angleBetween(D, E)];
      },
    },
    {
      id: '4.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '钟面上，分针每分钟转 $6^\\circ$，时针每分钟转 $0.5^\\circ$。求下列时刻时针与分针所成的角（不超过 $180^\\circ$ 的那个角）。',
      blanks: [
        { kind: 'num', label: '(1) 3 点 30 分：', answer: '75', suffix: '°' },
        { kind: 'num', label: '(2) 8 点 20 分：', answer: '130', suffix: '°' },
      ],
      explain: [
        '从 12 点的位置开始，按顺时针方向量两针转过的度数。整点时时针在第 $h$ 个大格，每个大格 $30^\\circ$。',
        '(1) 分针转了 $30\\times 6^\\circ=180^\\circ$；时针在 3 点的位置 $90^\\circ$ 的基础上又转了 $30\\times 0.5^\\circ=15^\\circ$，在 $105^\\circ$ 处。夹角 $180^\\circ-105^\\circ=75^\\circ$。',
        '易错：以为时针还停在 3 上，得到 $90^\\circ$。',
        '(2) 分针在 $20\\times 6^\\circ=120^\\circ$；时针在 $8\\times 30^\\circ+20\\times 0.5^\\circ=250^\\circ$。两者相差 $130^\\circ$，不超过 $180^\\circ$，夹角是 $130^\\circ$。',
      ],
      verify: () => {
        const at = (h, m) => angleBetween(F(m).mul(6), F(h).mul(30).add(F(m).div(2)));
        return [at(3, 30), at(8, 20)];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '4.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $\\angle AOB=80^\\circ$，$\\angle BOC=30^\\circ$。（没有图，要考虑射线 $OC$ 的各种位置）',
      blanks: [
        { kind: 'nums', label: '(1) $\\angle AOC$ 的度数是（全部填出，用逗号隔开）', answer: ['110', '50'], suffix: '°' },
        { kind: 'nums', label: '(2) 若 $OM$ 平分 $\\angle AOB$，$ON$ 平分 $\\angle BOC$，则 $\\angle MON$ 的度数是（全部填出，用逗号隔开）', answer: ['55', '25'], suffix: '°' },
      ],
      explain: [
        '$OC$ 可能在 $\\angle AOB$ 的外部（与 $OA$ 在 $OB$ 的两侧），也可能在 $\\angle AOB$ 的内部。',
        '(1) 外部：$\\angle AOC=80^\\circ+30^\\circ=110^\\circ$；内部：$\\angle AOC=80^\\circ-30^\\circ=50^\\circ$。',
        '(2) $\\angle MOB=40^\\circ$，$\\angle BON=15^\\circ$。$OC$ 在外部时，$OM$、$ON$ 在 $OB$ 两侧，$\\angle MON=40^\\circ+15^\\circ=55^\\circ$；在内部时，$OM$、$ON$ 在 $OB$ 同侧，$\\angle MON=40^\\circ-15^\\circ=25^\\circ$。',
        '只画一种图，就会漏掉一个答案。',
      ],
      verify: () => {
        const A = F(0), B = F(80);
        const Cs = [B.add(30), B.sub(30)];
        return [
          Cs.map(C => angleBetween(A, C)),
          Cs.map(C => angleBetween(A.add(B).div(2), B.add(C).div(2))),
        ];
      },
    },
    {
      id: '4.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\angle AOB$ 的内部，从顶点 $O$ 引出若干条射线（射线互不重合）。以 $OA$、$OB$ 和这些射线中的任意两条为边，可以组成若干个角。',
      blanks: [
        { kind: 'num', label: '(1) 在内部引 3 条射线时，图中共有', answer: '10', suffix: '个角' },
        { kind: 'num', label: '(2) 若图中共有 28 个角，则在内部引了', answer: '6', suffix: '条射线' },
        { kind: 'num', label: '(3) 在 (2) 的基础上再引 1 条射线（仍在 $\\angle AOB$ 内部），图中的角增加了', answer: '8', suffix: '个' },
      ],
      explain: [
        '和“直线上的点数线段”一样：共有 $n$ 条射线（含 $OA$、$OB$）时，每两条组成一个角，共 $\\frac{n(n-1)}{2}$ 个。',
        '(1) 共 5 条射线，$\\frac{5\\times 4}{2}=10$ 个角。',
        '(2) $\\frac{n(n-1)}{2}=28$，$n(n-1)=56=8\\times 7$，$n=8$，内部引了 $8-2=6$ 条。',
        '(3) 新射线与原来的 8 条射线各组成一个新角，增加 8 个（$\\frac{9\\times 8}{2}-28=8$）。',
        '易错：(2) 中忘记减去 $OA$、$OB$ 两条边，答成 8。',
      ],
      verify: () => {
        const cnt = n => (n * (n - 1)) / 2;
        let inner = null;
        for (let k = 0; k <= 20; k++) if (cnt(k + 2) === 28) inner = k;
        return [cnt(5), inner, cnt(inner + 3) - cnt(inner + 2)];
      },
    },
    {
      id: '4.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '钟面上，分针每分钟转 $6^\\circ$，时针每分钟转 $0.5^\\circ$。',
      blanks: [
        { kind: 'num', label: '(1) 2 点整之后，经过', answer: '120/11', suffix: '分钟时针与分针第一次重合' },
        { kind: 'num', label: '(2) 2 点整之后，经过', answer: '480/11', suffix: '分钟时针与分针第一次成平角（在一条直线上且方向相反）' },
        { kind: 'num', label: '(3) 10 点 10 分时，时针与分针所成的角是', answer: '115', suffix: '°' },
      ],
      explain: [
        '分针比时针每分钟多转 $6^\\circ-0.5^\\circ=5.5^\\circ$，这是一个“追及”问题。',
        '(1) 2 点整时时针在 $60^\\circ$ 处，分针在 $0^\\circ$，分针落后 $60^\\circ$。设 $t$ 分钟后重合：$5.5t=60$，$t=\\frac{120}{11}$。',
        '(2) 成平角，分针要比时针多转 $60^\\circ+180^\\circ=240^\\circ$：$5.5t=240$，$t=\\frac{480}{11}$（约 43.6 分钟）。',
        '（在重合之前，两针相差从 $60^\\circ$ 减小到 0，不会出现 $180^\\circ$。）',
        '(3) 分针在 $60^\\circ$；时针在 $300^\\circ+5^\\circ=305^\\circ$。相差 $245^\\circ$，超过 $180^\\circ$，所以夹角是 $360^\\circ-245^\\circ=115^\\circ$。',
        '易错：直接答 $245^\\circ$，或者以为时针在 10 上，得 $120^\\circ$。',
      ],
      verify: () => {
        const ts = [];
        for (let k = 1; k < 660; k++) ts.push(F(k).div(11));
        const gap = t => angleBetween(t.mul(6), F(60).add(t.div(2)));
        return [ts.find(t => gap(t).isZero()), ts.find(t => gap(t).eq(180)), angleBetween(F(60), F(305))];
      },
    },
    {
      id: '4.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，把两个直角 $\\angle AOB$ 和 $\\angle COD$ 的顶点重合放在一起，射线 $OC$ 在 $\\angle AOB$ 内部，射线 $OB$ 在 $\\angle COD$ 内部。',
      figure: FIG42.right2,
      blanks: [
        { kind: 'num', label: '(1) 若 $\\angle AOD=150^\\circ$，则 $\\angle BOC=$', answer: '30', suffix: '°' },
        { kind: 'expr', label: '(2) 若 $\\angle BOC=x^\\circ$，则 $\\angle AOD=$（用含 $x$ 的式子表示度数）', answer: '180-x' },
        { kind: 'nums', label: '(3) 若不给图，只知道两个直角 $\\angle AOB$、$\\angle COD$ 的顶点重合，且 $\\angle BOC=36^\\circ$，则 $\\angle AOD$ 的度数是（全部填出，用逗号隔开）', answer: ['144', '36'], suffix: '°' },
      ],
      explain: [
        '(1)(2) 图中 $\\angle AOD=\\angle AOB+\\angle BOD$，而 $\\angle BOD=90^\\circ-\\angle BOC$，所以 $\\angle AOD=180^\\circ-\\angle BOC$。$\\angle BOC=180^\\circ-150^\\circ=30^\\circ$；一般地 $\\angle AOD=(180-x)^\\circ$。',
        '(3) 没有图时，$OC$ 可以在 $OB$ 的两侧，$OD$ 又可以在 $OC$ 的两侧，要逐一画出来。以 $OA$ 为起点量度数，$OB$ 在 $90^\\circ$，$OC$ 在 $126^\\circ$ 或 $54^\\circ$。',
        '① $OC$ 在 $126^\\circ$：$OD$ 在 $216^\\circ$ 时，两针差 $216^\\circ$ 超过平角，$\\angle AOD=360^\\circ-216^\\circ=144^\\circ$；$OD$ 在 $36^\\circ$ 时，$\\angle AOD=36^\\circ$。',
        '② $OC$ 在 $54^\\circ$（就是图中的情形）：$OD$ 在 $144^\\circ$ 时 $\\angle AOD=144^\\circ$；$OD$ 在 $-36^\\circ$ 时 $\\angle AOD=36^\\circ$。',
        '所以 $\\angle AOD$ 是 $144^\\circ$ 或 $36^\\circ$。$144^\\circ$ 的情况与 $\\angle BOC$ 互补，$36^\\circ$ 的情况与 $\\angle BOC$ 相等（$OD$ 落在 $\\angle AOB$ 内，$\\angle AOD$ 和 $\\angle BOC$ 都是 $\\angle BOD$ 的余角）。',
        '只按图的样子算，会漏掉 $36^\\circ$。',
      ],
      verify: () => {
        const aod = x => angleBetween(F(0), F(90).add(F(90)).sub(x));
        let x1 = null;
        for (let i = 1; i < 90; i++) if (aod(i).eq(150)) x1 = i;
        const res = [];
        for (const C of [F(90 + 36), F(90 - 36)]) for (const D of [C.add(90), C.sub(90)]) {
          const v = angleBetween(0, D);
          if (!res.some(w => w.eq(v))) res.push(v);
        }
        return [x1, `${aod(0)}-x`, res];
      },
    },
    {
      id: '4.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '点 $O$ 在直线 $AB$ 上，射线 $OC$、$OD$ 在直线 $AB$ 的同一侧，$OC$ 靠近 $OA$、$OD$ 靠近 $OB$。把 $\\angle AOC$ 沿 $OC$ 折叠，$OA$ 落在 $OA\'$ 处；把 $\\angle BOD$ 沿 $OD$ 折叠，$OB$ 落在 $OB\'$ 处。（折叠后重合的角相等）',
      demo: { type: 'angleFold', cases: [{ name: '恰好重合', a: 50, b: 40 }, { name: '空出 20°', a: 45, b: 35 }, { name: '重叠 20°', a: 55, b: 45 }] },
      blanks: [
        { kind: 'num', label: '(1) 若 $OA\'$ 与 $OB\'$ 恰好重合，则 $\\angle COD=$', answer: '90', suffix: '°' },
        { kind: 'nums', label: '(2) 若 $\\angle A\'OB\'=20^\\circ$，则 $\\angle COD$ 的度数是（全部填出，用逗号隔开）', answer: ['100', '80'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle AOC=a$，$\\angle BOD=b$。折叠后 $\\angle A\'OC=a$，$\\angle B\'OD=b$。',
        '(1) $OA\'$ 与 $OB\'$ 重合时，平角被分成 $a$、$a$、$b$、$b$ 四份：$2a+2b=180^\\circ$，$a+b=90^\\circ$。$\\angle COD=a+b=90^\\circ$。',
        '(2) $OA\'$、$OB\'$ 之间夹 $20^\\circ$，有两种情况：',
        '① 两个折过来的角没有重叠，中间空出 $20^\\circ$：$2a+2b+20^\\circ=180^\\circ$，$a+b=80^\\circ$，$\\angle COD=180^\\circ-(a+b)=100^\\circ$。',
        '② 两个折过来的角重叠了 $20^\\circ$：$2a+2b-20^\\circ=180^\\circ$，$a+b=100^\\circ$，$\\angle COD=180^\\circ-100^\\circ=80^\\circ$。',
        '所以 $\\angle COD=100^\\circ$ 或 $80^\\circ$。',
      ],
      verify: () => {
        // A 在 180°，B 在 0°；OC 在 180-a，OD 在 b；OA′ 在 180-2a，OB′ 在 2b
        const res = [];
        let one = null;
        for (let a = 1; a < 90; a++) for (let b = 1; b < 90; b++) {
          if (180 - a <= b) continue;
          const cod = angleBetween(F(180 - a), F(b));
          const ab = angleBetween(F(180 - 2 * a), F(2 * b));
          if (ab.isZero() && 180 - 2 * a === 2 * b) one = cod;
          if (ab.eq(20) && !res.some(v => v.eq(cod))) res.push(cod);
        }
        return [one, res];
      },
    },
    {
      id: '4.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '$\\angle AOB$ 小于平角，射线 $OC$ 与 $\\angle AOB$ 的两边都不重合，$\\angle AOC=2\\angle BOC$，$OD$ 平分 $\\angle AOB$，$\\angle COD=15^\\circ$。（没有图，要考虑 $OC$ 在 $\\angle AOB$ 内部和外部）',
      blanks: [
        { kind: 'nums', label: '$\\angle AOB$ 的度数是（全部填出，用逗号隔开）', answer: ['90', '10'], suffix: '°' },
      ],
      explain: [
        '设 $\\angle BOC=x^\\circ$，则 $\\angle AOC=2x^\\circ$。',
        '① $OC$ 在 $\\angle AOB$ 内部：$\\angle AOB=3x^\\circ$，$\\angle AOD=1.5x^\\circ$，$\\angle COD=\\angle AOC-\\angle AOD=0.5x^\\circ$。由 $0.5x=15$ 得 $x=30$，$\\angle AOB=90^\\circ$。',
        '② $OC$ 在 $\\angle AOB$ 外部：因为 $\\angle AOC>\\angle BOC$，$OC$ 在 $OB$ 这一侧，$\\angle AOB=\\angle AOC-\\angle BOC=x^\\circ$，$\\angle BOD=0.5x^\\circ$，$\\angle COD=\\angle COB+\\angle BOD=1.5x^\\circ$。由 $1.5x=15$ 得 $x=10$，$\\angle AOB=10^\\circ$。',
        '（$OC$ 不可能在 $OA$ 这一侧的外部，否则 $\\angle AOC<\\angle BOC$。）',
        '所以 $\\angle AOB=90^\\circ$ 或 $10^\\circ$。检验：② 中 $\\angle AOC=20^\\circ$、$\\angle BOC=10^\\circ$、$\\angle AOB=10^\\circ$，$OD$ 离 $OA$ $5^\\circ$，$\\angle COD=15^\\circ$，正确。',
      ],
      verify: () => {
        // OA 在 0°，OB 在 β，OC 在 γ（0 到 180 之间，与两边不重合）
        const res = [];
        for (let b = 1; b < 180; b++) for (let g2 = -358; g2 <= 358; g2++) {
          const g = F(g2).div(2);
          if (g.cmp(180) > 0 || g.cmp(-180) < 0 || g.isZero() || g.eq(b)) continue;
          const AOC = angleBetween(0, g), BOC = angleBetween(b, g);
          if (!AOC.eq(BOC.mul(2))) continue;
          if (angleBetween(g, F(b).div(2)).eq(15) && !res.some(v => v.eq(b))) res.push(F(b));
        }
        return res;
      },
    },
    {
      id: '4.2-e07',
      level: 'extended',
      type: 'fill',
      stem: '$\\angle AOB=120^\\circ$。射线 $OC$ 从 $OA$ 出发，绕点 $O$ 以每秒 $10^\\circ$ 的速度向 $OB$ 旋转；同时射线 $OD$ 从 $OB$ 出发，以每秒 $5^\\circ$ 的速度向 $OA$ 旋转。$OC$ 到达 $OB$ 时两条射线都停止。设旋转时间为 $t$ 秒。',
      blanks: [
        { kind: 'num', label: '(1) $OC$ 与 $OD$ 重合时，$t=$', answer: '8' },
        { kind: 'nums', label: '(2) $\\angle COD=30^\\circ$ 时，$t$ 的值是（全部填出，用逗号隔开）', answer: ['6', '10'] },
        { kind: 'num', label: '(3) $OC$ 恰好平分 $\\angle AOD$ 时，$t=$', answer: '24/5' },
      ],
      explain: [
        '$t$ 秒后 $\\angle AOC=10t^\\circ$，$\\angle AOD=(120-5t)^\\circ$。$OC$ 到达 $OB$ 要 12 秒，所以 $0\\le t\\le 12$。',
        '(1) 重合：$10t=120-5t$，$t=8$。',
        '(2) $\\angle COD=|(120-5t)-10t|=|120-15t|$。相遇前 $120-15t=30$，$t=6$；相遇后 $15t-120=30$，$t=10$。都不超过 12。',
        '(3) $OC$ 平分 $\\angle AOD$，$\\angle AOC=\\frac{1}{2}\\angle AOD$：$10t=\\frac{1}{2}(120-5t)$，$20t=120-5t$，$t=\\frac{24}{5}$。',
        '检验：$t=4.8$ 时 $\\angle AOC=48^\\circ$，$\\angle AOD=96^\\circ$，确实是一半。',
      ],
      verify: () => {
        const ts = [];
        for (let i = 0; i <= 600; i++) ts.push(F(i).div(50));
        const C = t => t.mul(10), D = t => F(120).sub(t.mul(5));
        return [
          ts.find(t => C(t).eq(D(t))),
          ts.filter(t => angleBetween(C(t), D(t)).eq(30)),
          ts.find(t => t.cmp(0) > 0 && C(t).mul(2).eq(D(t))),
        ];
      },
    },
    {
      id: '4.2-e08',
      level: 'extended',
      type: 'fill',
      stem: '射线 $OA$、$OB$、$OC$ 把周角分成三个角：$\\angle AOB:\\angle BOC:\\angle COA=2:3:4$（每个角都在另外两条射线之外，三个角恰好拼成周角）。',
      blanks: [
        { kind: 'num', label: '(1) 三个角中最大的是', answer: '160', suffix: '°' },
        { kind: 'num', label: '(2) 若 $OM$、$ON$ 分别平分 $\\angle AOB$、$\\angle BOC$，则 $\\angle MON=$', answer: '100', suffix: '°' },
        { kind: 'num', label: '(3) 三个角的平分线两两所成的三个角中，最大的是', answer: '140', suffix: '°' },
      ],
      explain: [
        '(1) 设三个角为 $2x$、$3x$、$4x$，$9x=360^\\circ$，$x=40^\\circ$。三个角是 $80^\\circ$、$120^\\circ$、$160^\\circ$，最大 $160^\\circ$。',
        '(2) $\\angle MON=\\angle MOB+\\angle BON=40^\\circ+60^\\circ=100^\\circ$。',
        '(3) 同理，$\\angle BOC$ 与 $\\angle COA$ 的平分线所成的角是 $60^\\circ+80^\\circ=140^\\circ$；$\\angle COA$ 与 $\\angle AOB$ 的平分线所成的角是 $80^\\circ+40^\\circ=120^\\circ$。',
        '三个角 $100^\\circ$、$140^\\circ$、$120^\\circ$ 也拼成周角（和为 $360^\\circ$），最大的是 $140^\\circ$。',
        '规律：相邻两个角的平分线所成的角，等于这两个角之和的一半。',
      ],
      verify: () => {
        let x = null;
        for (let i = 1; i < 100; i++) if (9 * i === 360) x = i;
        const A = F(0), B = F(2 * x), C = F(5 * x);   // 射线的方向（度）
        const m1 = A.add(B).div(2), m2 = B.add(C).div(2), m3 = C.add(360).div(2);
        const angs = [angleBetween(m1, m2), angleBetween(m2, m3), angleBetween(m3, m1)];
        return [4 * x, angs[0], angs.reduce((p, q) => (p.cmp(q) > 0 ? p : q))];
      },
    },
    {
      id: '4.2-e09',
      level: 'extended',
      type: 'fill',
      stem: '$\\angle AOB=80^\\circ$。作 $\\angle AOB$ 的平分线 $OA_1$，再作 $\\angle A_1OB$ 的平分线 $OA_2$，再作 $\\angle A_2OB$ 的平分线 $OA_3$，……，这样一直作下去。',
      blanks: [
        { kind: 'angle', label: '(1) $\\angle A_5OB=$（用度分秒表示）', answer: "2°30'" },
        { kind: 'angle', label: '(2) $\\angle AOA_7=$（用度分秒表示）', answer: "79°22'30\"" },
        { kind: 'num', label: '(3) 使 $\\angle A_nOB$ 小于 $1\'$ 的最小的 $n$ 是', answer: '13' },
      ],
      explain: [
        '每作一次平分线，剩下的 $\\angle A_nOB$ 就减半：$\\angle A_1OB=40^\\circ$，$\\angle A_2OB=20^\\circ$，……，$\\angle A_nOB$ 是 80 连续除以 $n$ 次 2。',
        '(1) $\\angle A_5OB=80^\\circ\\div 32=2.5^\\circ=2^\\circ 30\'$。',
        '(2) $\\angle A_7OB=80^\\circ\\div 128=0.625^\\circ=37.5\'=37\' 30\'\'$。$\\angle AOA_7=80^\\circ-37\' 30\'\'=79^\\circ 22\' 30\'\'$（借 $1^\\circ$ 当 $60\'$，再借 $1\'$ 当 $60\'\'$）。',
        '(3) $80^\\circ=4800\'$。要 $4800\'$ 除以 $n$ 次 2 后小于 $1\'$，就是 $2^n$ 要大于 4800。',
        '$2^{12}=4096<4800$，$2^{13}=8192>4800$，所以最小的 $n=13$（此时约 $0.59\'$）。',
        '易错：用度来比较时把 $1\'$ 当成 $0.1^\\circ$，那样会得到 $n=10$。',
      ],
      verify: () => {
        const at = n => F(80).div(2 ** n);
        let n3 = null;
        for (let n = 1; n <= 30 && n3 === null; n++) if (at(n).mul(60).cmp(1) < 0) n3 = n;
        return [dms(at(5)), dms(F(80).sub(at(7))), n3];
      },
    },
    {
      id: '4.2-e10',
      level: 'extended',
      type: 'fill',
      stem: '一副三角尺中，一块的三个角是 $30^\\circ$、$60^\\circ$、$90^\\circ$，另一块是 $45^\\circ$、$45^\\circ$、$90^\\circ$。本题规定画角时只能用某一个角，或者用两块三角尺上各一个角拼成它们的和或差（不能用三个及以上的角）。',
      blanks: [
        { kind: 'num', label: '(1) 能画出的大于 $0^\\circ$、小于 $180^\\circ$ 的不同角共有', answer: '10', suffix: '种' },
        { kind: 'num', label: '(2) 在 $15^\\circ$、$100^\\circ$、$105^\\circ$、$165^\\circ$、$170^\\circ$ 中，按规定能画出的有', answer: '2', suffix: '个' },
        { kind: 'num', label: '(3) 在 (1) 的这些角中，补角也能画出来的角共有', answer: '9', suffix: '种' },
      ],
      explain: [
        '有序列举，按“一个角、两角之和、两角之差”分类。',
        '只用一个角：$30^\\circ$、$45^\\circ$、$60^\\circ$、$90^\\circ$。',
        '两块各取一个角相加：$30+45=75$，$30+90=120$，$60+45=105$，$60+90=150$，$90+45=135$，$90+90=180$（不小于 $180^\\circ$，不算）。',
        '两块各取一个角相减：$45-30=15$，$60-45=15$，$90-30=60$，$90-60=30$，$90-45=45$，$90-90=0$（不算）。',
        '(1) 去掉重复，得到 $15^\\circ,30^\\circ,45^\\circ,\\dots,150^\\circ$，即 $15^\\circ$ 的 1 倍到 10 倍，共 10 种。',
        '(2) 能画出的角都是 $15^\\circ$ 的倍数，且不超过 $150^\\circ$。$100^\\circ$、$170^\\circ$ 不是 15 的倍数；$165^\\circ$ 超过 $150^\\circ$。只有 $15^\\circ$ 和 $105^\\circ$ 可以，共 2 个。（如果允许用平角减去 $15^\\circ$ 等三个角的拼法，$165^\\circ$ 也能画，但本题规定不行。）',
        '(3) 两个角的和为 $180^\\circ$ 才互补。配对：$30+150$，$45+135$，$60+120$，$75+105$，$90+90$。$15^\\circ$ 的补角 $165^\\circ$ 画不出。所以共 9 种。',
      ],
      verify: () => {
        const t1 = [30, 60, 90], t2 = [45, 45, 90];
        const set = new Set([...t1, ...t2]);
        for (const a of t1) for (const b of t2) { set.add(a + b); set.add(Math.abs(a - b)); }
        const ok = [...set].filter(v => v > 0 && v < 180);
        return [ok.length, [15, 100, 105, 165, 170].filter(v => ok.includes(v)).length, ok.filter(v => ok.includes(180 - v)).length];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '4.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '$\\angle AOB=30^\\circ$。射线 $OC$ 从 $OB$ 出发，绕点 $O$ 按“从 $OA$ 转向 $OB$”的方向继续以每秒 $10^\\circ$ 的速度旋转，转满一周（36 秒）停止。$OM$ 平分 $\\angle AOC$，$ON$ 平分 $\\angle BOC$。本题中的角都指不超过 $180^\\circ$ 的角，并且不考虑 $\\angle AOC$ 或 $\\angle BOC$ 恰好是平角的时刻。设旋转时间为 $t$ 秒。',
      blanks: [
        { kind: 'num', label: '(1) $t=5$ 时，$\\angle MON=$', answer: '15', suffix: '°' },
        { kind: 'num', label: '(2) $t=16$ 时，$\\angle MON=$', answer: '165', suffix: '°' },
        { kind: 'num', label: '(3) 在旋转的 36 秒内，$\\angle MON=165^\\circ$ 的时间共有', answer: '3', suffix: '秒' },
      ],
      explain: [
        '以 $OA$ 为起点，按旋转方向量各射线转过的度数：$OA$ 在 $0^\\circ$，$OB$ 在 $30^\\circ$，$OC$ 在 $(30+10t)^\\circ$。',
        '关键：$\\angle AOC$ 取不超过 $180^\\circ$ 的那个角。$OC$ 转过 $180^\\circ$ 以后，$\\angle AOC$ 就变成“另一边”的角，平分线也随之跳到另一侧。所以要按 $\\angle AOC$、$\\angle BOC$ 是否越过平角分段。',
        '① $0<t<15$：$\\angle AOC=30+10t$（小于 180），$\\angle BOC=10t$。$OM$ 在 $(15+5t)^\\circ$，$ON$ 在 $(30+5t)^\\circ$，$\\angle MON=15^\\circ$。',
        '② $15<t<18$：$OC$ 已转过 $180^\\circ$，$\\angle AOC=360-(30+10t)=330-10t$，它的平分线在 $OA$ 的另一侧，位置是 $(30+10t)+\\frac{330-10t}{2}=(195+5t)^\\circ$；$\\angle BOC=10t$ 还小于 180，$ON$ 仍在 $(30+5t)^\\circ$。两者相差 $165^\\circ$，$\\angle MON=165^\\circ$。',
        '③ $18<t<36$：两个角都越过了平角，两条平分线都跳到另一侧，$OM$ 在 $(195+5t)^\\circ$，$ON$ 在 $(210+5t)^\\circ$，$\\angle MON$ 又是 $15^\\circ$。',
        '(1) $t=5$ 在第①段，$15^\\circ$。(2) $t=16$ 在第②段，$165^\\circ$。(3) 只有第②段是 $165^\\circ$，共 $18-15=3$ 秒。',
        '检验 $t=16$：$OC$ 在 $190^\\circ$，$\\angle AOC=170^\\circ$，$OM$ 在 $275^\\circ$；$\\angle BOC=160^\\circ$，$ON$ 在 $110^\\circ$；$275-110=165$。',
        '思路回顾：“$\\angle MON=\\frac{1}{2}\\angle AOB$”这个熟悉的结论只在一定范围内成立；角的度数不超过平角，射线转过平角时要重新分段。',
      ],
      verify: () => {
        // 两射线（方向 p、q）所成不超过 180° 的角的平分线方向
        const mod = x => { let v = F(x); while (v.cmp(360) >= 0) v = v.sub(360); while (v.cmp(0) < 0) v = v.add(360); return v; };
        const bis = (p, q) => { const d = mod(F(q).sub(p)); return d.cmp(180) < 0 ? mod(F(p).add(d.div(2))) : mod(F(q).add(F(360).sub(d).div(2))); };
        const mon = t => { const C = F(30).add(t.mul(10)); return angleBetween(bis(0, C), bis(30, C)); };
        const step = F(1).div(8);
        const hits = [];
        for (let k = 1; k < 36 * 8; k++) {
          const t = step.mul(k);
          const C = F(30).add(t.mul(10));
          if (angleBetween(0, C).eq(180) || angleBetween(30, C).eq(180)) continue;
          if (mon(t).eq(165)) hits.push(t);
        }
        const dur = hits[hits.length - 1].sub(hits[0]).add(step.mul(2));
        return [mon(F(5)), mon(F(16)), dur];
      },
    },
    {
      id: '4.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '射线 $OA$、$OB$、$OC$ 互不重合。本题中的角都指不超过 $180^\\circ$ 的角。（没有图，要考虑各种位置）',
      blanks: [
        { kind: 'nums', label: '(1) 若 $\\angle AOB=100^\\circ$，$\\angle BOC=120^\\circ$，则 $\\angle AOC$ 的度数是（全部填出，用逗号隔开）', answer: ['140', '20'], suffix: '°' },
        { kind: 'nums', label: '(2) 在 (1) 中，若 $OM$、$ON$ 分别平分 $\\angle AOB$、$\\angle BOC$，则 $\\angle MON$ 的度数是（全部填出，用逗号隔开）', answer: ['110', '10'], suffix: '°' },
        { kind: 'num', label: '(3) 若 $\\angle AOB=100^\\circ$，$\\angle BOC=\\beta^\\circ$（$0<\\beta<180$），$OA$、$OC$ 在 $OB$ 的两侧，$OM$、$ON$ 分别平分 $\\angle AOB$、$\\angle BOC$，且 $\\angle MON=\\angle AOC$，则 $\\beta=$', answer: '140' },
      ],
      explain: [
        '以 $OA$ 为起点量方向：$OB$ 在 $100^\\circ$，$OC$ 在 $100^\\circ\\pm 120^\\circ$，即 $220^\\circ$ 或 $-20^\\circ$。',
        '(1) $OC$ 与 $OA$ 在 $OB$ 两侧（$220^\\circ$）：$\\angle AOB+\\angle BOC=220^\\circ$ 超过了平角，这时 $\\angle AOC$ 不是 $220^\\circ$，而是另一边的 $360^\\circ-220^\\circ=140^\\circ$。',
        '$OC$ 与 $OA$ 在 $OB$ 同侧（$-20^\\circ$）：$\\angle AOC=120^\\circ-100^\\circ=20^\\circ$，这时 $OA$ 在 $\\angle BOC$ 内部。',
        '所以 $\\angle AOC=140^\\circ$ 或 $20^\\circ$。直接写 $220^\\circ$ 是最常见的错误。',
        '(2) $OM$ 在 $50^\\circ$。两侧时 $ON$ 在 $100^\\circ+60^\\circ=160^\\circ$，$\\angle MON=110^\\circ$（没有超过平角）；同侧时 $ON$ 在 $100^\\circ-60^\\circ=40^\\circ$，$\\angle MON=10^\\circ$。',
        '注意 (1)(2) 的对比：两侧时 $\\angle MON=\\frac{1}{2}(100+120)=110^\\circ$，但 $\\angle AOC$ 并不是它的 2 倍（$140\\ne 220$），因为 $\\angle AOC$ 越过了平角。',
        '(3) 两侧时 $\\angle MON=\\frac{100+\\beta}{2}$，最大不到 $140^\\circ$，不会超过平角。而 $\\angle AOC$ 要分类：',
        '① $100+\\beta\\le 180$（$\\beta\\le 80$）：$\\angle AOC=100+\\beta$。方程 $100+\\beta=\\frac{100+\\beta}{2}$ 无正数解。',
        '② $\\beta>80$：$\\angle AOC=360-(100+\\beta)=260-\\beta$。方程 $260-\\beta=\\frac{100+\\beta}{2}$，$520-2\\beta=100+\\beta$，$\\beta=140$，符合 $\\beta>80$。',
        '检验：$\\angle BOC=140^\\circ$，$OC$ 在 $240^\\circ$，$\\angle AOC=120^\\circ$；$ON$ 在 $170^\\circ$，$\\angle MON=120^\\circ$。正确。',
        '思路回顾：角的和一旦超过平角，就要换成“另一边”的角，于是“和差关系”随位置分段变化；列方程前先按是否超过平角分类。',
      ],
      verify: () => {
        const mod = x => { let v = F(x); while (v.cmp(360) >= 0) v = v.sub(360); while (v.cmp(0) < 0) v = v.add(360); return v; };
        const bis = (p, q) => { const d = mod(F(q).sub(p)); return d.cmp(180) < 0 ? mod(F(p).add(d.div(2))) : mod(F(q).add(F(360).sub(d).div(2))); };
        const uniq = arr => arr.filter((v, i) => arr.findIndex(w => w.eq(v)) === i);
        const Cs = [F(220), F(-20)];
        const betas = [];
        for (let b = 1; b < 180; b++) { const C = F(100 + b); if (angleBetween(0, C).eq(angleBetween(bis(0, 100), bis(100, C)))) betas.push(b); }
        return [
          uniq(Cs.map(C => angleBetween(0, C))),
          uniq(Cs.map(C => angleBetween(bis(0, 100), bis(100, C)))),
          betas.length === 1 ? betas[0] : null,
        ];
      },
    },
    {
      id: '4.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '点 $O$ 在直线 $AB$ 上。一个 $60^\\circ$ 的角 $\\angle COD$ 的顶点放在 $O$，射线 $OC$ 在直线 $AB$ 的上方，从 $OA$ 开始绕点 $O$ 向 $OB$ 旋转，$OD$ 始终在 $OC$ 的旋转方向前方 $60^\\circ$ 处（$OD$ 转过 $OB$ 后会到直线下方）。设 $\\angle AOC=x^\\circ$（$0<x<180$，且 $x\\ne 120$）。$OE$ 平分 $\\angle AOC$，$OF$ 平分 $\\angle BOD$（角都取不超过 $180^\\circ$ 的那个）。',
      blanks: [
        { kind: 'num', label: '(1) $x=40$ 时，$\\angle EOF=$', answer: '120', suffix: '°' },
        { kind: 'nums', label: '(2) 若 $\\angle AOC=5\\angle BOD$，则 $x$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['100', '150'] },
        { kind: 'nums', label: '(3) 若 $\\angle AOF=3\\angle BOD$，则 $x$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['480/7', '1200/7'] },
      ],
      explain: [
        '按 $OD$ 是否转过 $OB$ 分两段。',
        '① $x<120$：$OD$ 在直线上方，$\\angle BOD=180-(x+60)=120-x$。$OF$ 也在上方，$\\angle BOF=\\frac{120-x}{2}$，所以 $\\angle AOF=180-\\frac{120-x}{2}=120+\\frac{x}{2}$。',
        '$\\angle EOF=\\angle AOF-\\angle AOE=120+\\frac{x}{2}-\\frac{x}{2}=120^\\circ$。',
        '② $120<x<180$：$OD$ 转到直线下方，$\\angle BOD=(x+60)-180=x-120$，$OF$ 在直线下方，$\\angle BOF=\\frac{x-120}{2}$。这时 $\\angle AOF$ 要从另一边量：$\\angle AOF=180-\\frac{x-120}{2}=240-\\frac{x}{2}$。',
        '$\\angle EOF$ 由 $OE$ 转到 $OB$ 再转到 $OF$：$\\left(180-\\frac{x}{2}\\right)+\\frac{x-120}{2}=120^\\circ$。',
        '(1) 两段都是 $120^\\circ$，所以 $x=40$ 时是 $120^\\circ$。',
        '(2) ① $x=5(120-x)$，$x=100$，符合 $x<120$；② $x=5(x-120)$，$x=150$，符合。所以 $x=100$ 或 150。',
        '(3) 这次 $\\angle AOF$ 和 $\\angle BOD$ 在两段的式子都不同：',
        '① $120+\\frac{x}{2}=3(120-x)$，两边乘 2：$240+x=720-6x$，$7x=480$，$x=\\frac{480}{7}$（约 68.6），符合 $x<120$。',
        '② $240-\\frac{x}{2}=3(x-120)$，两边乘 2：$480-x=6x-720$，$7x=1200$，$x=\\frac{1200}{7}$（约 171.4），符合 $120<x<180$。',
        '思路回顾：$\\angle EOF$ 是定值，但与 $x$ 有关的角（$\\angle BOD$、$\\angle AOF$）在 $OD$ 越过直线前后有不同的表达式，每个条件都要分两段列方程并检验。',
      ],
      verify: () => {
        const mod = x => { let v = F(x); while (v.cmp(360) >= 0) v = v.sub(360); while (v.cmp(0) < 0) v = v.add(360); return v; };
        const bis = (p, q) => { const d = mod(F(q).sub(p)); return d.cmp(180) < 0 ? mod(F(p).add(d.div(2))) : mod(F(q).add(F(360).sub(d).div(2))); };
        // OA 方向 0°，OB 方向 180°，上方为 0°～180°
        const xs = [];
        for (let i = 1; i < 180 * 14; i++) { const x = F(i).div(14); if (!x.eq(120)) xs.push(x); }
        const Fdir = x => bis(180, x.add(60));
        const bod = x => angleBetween(180, x.add(60));
        return [
          angleBetween(bis(0, 40), Fdir(F(40))),
          xs.filter(x => x.eq(bod(x).mul(5))),
          xs.filter(x => angleBetween(0, Fdir(x)).eq(bod(x).mul(3))),
        ];
      },
    },
    {
      id: '4.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '钟面上，分针每分钟转 $6^\\circ$，时针每分钟转 $0.5^\\circ$。把钟面中心记为 $O$，12 点方向的射线记为 $OP$。“分针平分 $\\angle POH$”是指分针所在射线是 $\\angle POH$ 的平分线，其中 $OH$ 是时针所在射线，$\\angle POH$ 取不超过 $180^\\circ$ 的那个角。',
      blanks: [
        { kind: 'num', label: '(1) 5 点到 6 点之间，分针平分 $\\angle POH$ 时，是 5 点过', answer: '300/23', suffix: '分' },
        { kind: 'num', label: '(2) 6 点到 7 点之间，分针平分 $\\angle POH$ 时，是 6 点过', answer: '1080/23', suffix: '分' },
        { kind: 'num', label: '(3) 从 0 点整到 12 点整（两端都不含），分针平分 $\\angle POH$ 的时刻共有', answer: '10', suffix: '个' },
      ],
      explain: [
        '从 $OP$ 开始顺时针量度数。$h$ 点过 $t$ 分时，分针在 $6t^\\circ$，时针在 $(30h+0.5t)^\\circ$。',
        '关键：$\\angle POH$ 取不超过 $180^\\circ$ 的角。时针在前半圈（不超过 $180^\\circ$）时，$\\angle POH$ 在右半边，平分线在 $\\frac{30h+0.5t}{2}$ 处；时针在后半圈时，$\\angle POH$ 在左半边，大小是 $360-(30h+0.5t)$，平分线在 $360-\\frac{360-(30h+0.5t)}{2}=180+\\frac{30h+0.5t}{2}$ 处。',
        '(1) 5 点多时时针在 $150+0.5t$，不超过 180，在前半圈：$6t=\\frac{150+0.5t}{2}$，$12t=150+0.5t$，$11.5t=150$，$t=\\frac{300}{23}$（约 13 分）。',
        '(2) 6 点多时时针已过 $180^\\circ$，在后半圈：$6t=180+\\frac{180+0.5t}{2}$，$12t=360+180+0.5t$，$11.5t=540$，$t=\\frac{1080}{23}$（约 47 分）。',
        '如果不区分前后半圈，仍用 $6t=\\frac{180+0.5t}{2}$，会得到 $t=\\frac{360}{23}$，这时分针在 $94^\\circ$ 左右，平分的是超过平角的那个角，不合题意。',
        '(3) 对每个钟点 $h$ 分别列方程。前半圈（$30h+0.5t\\le 180$，即 $h=0,1,\\dots,5$）：$12t=30h+0.5t$，$t=\\frac{60h}{23}$。后半圈（$h=6,\\dots,11$）：$12t=360+30h+0.5t$，$t=\\frac{720+60h}{23}$。',
        '再检验 $0\\le t<60$ 以及端点：前半圈 $h=0$ 时 $t=0$ 是 0 点整，不含（此时两针都指向 $OP$，没有角）；$h=1\\sim 5$ 都可以，共 5 个。',
        '后半圈要 $\\frac{720+60h}{23}<60$，即 $60h<660$，$h<11$，所以 $h=6\\sim 10$ 可以，共 5 个；$h=11$ 时 $t=60$，已经是 12 点整，不含。',
        '共 $5+5=10$ 个时刻。',
        '思路回顾：“平分线”要看被平分的角在哪一边，时针过了 6 点的位置，角就换到左半边，平分线的位置式子随之改变；再逐个钟点检验范围。',
      ],
      verify: () => {
        const mod = x => { let v = F(x); while (v.cmp(360) >= 0) v = v.sub(360); while (v.cmp(0) < 0) v = v.add(360); return v; };
        const bis = (p, q) => { const d = mod(F(q).sub(p)); return d.cmp(180) < 0 ? mod(F(p).add(d.div(2))) : mod(F(q).add(F(360).sub(d).div(2))); };
        const hits = [];
        for (let k = 1; k < 720 * 23; k++) {
          const T = F(k).div(23);          // 从 0 点整起经过的分钟数
          const H = mod(T.div(2)), M = mod(T.mul(6));
          if (!H.isZero() && bis(0, H).eq(M)) hits.push(T);
        }
        const inHour = h => hits.filter(T => T.cmp(60 * h) >= 0 && T.cmp(60 * (h + 1)) < 0).map(T => T.sub(60 * h));
        return [inHour(5)[0], inHour(6)[0], hits.length];
      },
    },
    {
      id: '4.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '从点 $O$ 引出 $n$ 条射线（$n\\ge 3$），把周角分成 $n$ 个相等的角。以这 $n$ 条射线中的任意两条为边的角都取不超过 $180^\\circ$ 的那个。',
      blanks: [
        { kind: 'num', label: '(1) $n=6$ 时，这些角中平角共有', answer: '3', suffix: '个' },
        { kind: 'num', label: '(2) $n=6$ 时，所有这些角的度数之和是', answer: '1620', suffix: '°' },
        { kind: 'num', label: '(3) $n=5$ 时，所有这些角的度数之和是', answer: '1080', suffix: '°' },
        { kind: 'num', label: '(4) 若所有这些角的度数之和是 $3600^\\circ$，则 $n=$', answer: '9' },
      ],
      explain: [
        '每两条射线组成一个角，共 $\\frac{n(n-1)}{2}$ 个。相邻两条射线之间是 $\\frac{360}{n}$ 度，记为 1 份。两条射线之间隔 $d$ 份时，所成的角是 $d$ 份与 $(n-d)$ 份中较小的那个。',
        '(1)(2) $n=6$，每份 $60^\\circ$。隔 1 份的有 6 对，角是 $60^\\circ$；隔 2 份的有 6 对，角是 $120^\\circ$；隔 3 份的有 3 对（正好相对），角是 $180^\\circ$，这 3 个是平角。',
        '（隔 4 份、5 份就是从另一边隔 2 份、1 份，已经数过。）总和 $=6\\times 60+6\\times 120+3\\times 180=360+720+540=1620^\\circ$。',
        '(3) $n=5$，每份 $72^\\circ$，没有正好相对的射线。隔 1 份的 5 对（$72^\\circ$），隔 2 份的 5 对（$144^\\circ$），总和 $5\\times 72+5\\times 144=1080^\\circ$。',
        '(4) 找一般规律，要按 $n$ 的奇偶分类。',
        '$n$ 是奇数时：隔 $1,2,\\dots,\\frac{n-1}{2}$ 份的各有 $n$ 对，总和 $=n\\times\\frac{360}{n}\\times\\left(1+2+\\cdots+\\frac{n-1}{2}\\right)=360\\times\\frac{(n-1)(n+1)}{8}=45(n\\times n-1)$。检验 $n=5$：$45\\times 24=1080$。',
        '$n$ 是偶数时：隔 $1,\\dots,\\frac{n}{2}-1$ 份的各 $n$ 对，再加 $\\frac{n}{2}$ 个平角，总和 $=360\\times\\frac{(n-2)n}{8}+90n=45n\\times n$。检验 $n=6$：$45\\times 36=1620$。',
        '令总和为 3600：偶数时 $n\\times n=80$，没有整数解；奇数时 $n\\times n-1=80$，$n\\times n=81$，$n=9$。',
        '思路回顾：角取不超过平角的那个，使得“隔 $d$ 份”和“隔 $n-d$ 份”是同一个角，计数要按奇偶分开；再由总和列方程，逐类检验。',
      ],
      verify: () => {
        const sum = n => { let s = F(0); for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) s = s.add(angleBetween(F(360 * i).div(n), F(360 * j).div(n))); return s; };
        let straight = 0;
        for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (angleBetween(60 * i, 60 * j).eq(180)) straight++;
        let n4 = null;
        for (let n = 3; n <= 40; n++) if (sum(n).eq(3600)) n4 = n;
        return [straight, sum(6), sum(5), n4];
      },
    },
  ],
});
