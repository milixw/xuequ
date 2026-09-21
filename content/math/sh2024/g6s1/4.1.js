'use strict';

// 上海数学六年级上册 · 4.1 线段
// 知识范围：直线、射线、线段及其表示，两个基本事实（两点确定一条直线、两点之间线段最短），两点间的距离，线段的比较、和、差、倍，线段的中点；可以使用第 1～3 章的全部内容（数轴、绝对值、列方程）
// 还没学：角（4.2）、对顶角、三角形与勾股定理、轴对称

// 配图统一放在这里（图形数据按题意生成，保证与题干一致）
const FIG41 = {
  // 线段 AB=10，AC=4，D 为 CB 中点（每单位 28 像素）
  acdb: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 56\" width=\"320\" height=\"56\" font-family=\"Times New Roman, serif\"><line x1=\"20\" y1=\"24\" x2=\"300\" y2=\"24\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><circle cx=\"20\" cy=\"24\" r=\"3\" fill=\"#2b2b2b\"/><circle cx=\"132\" cy=\"24\" r=\"3\" fill=\"#2b2b2b\"/><circle cx=\"216\" cy=\"24\" r=\"3\" fill=\"#2b2b2b\"/><circle cx=\"300\" cy=\"24\" r=\"3\" fill=\"#2b2b2b\"/><text x=\"20\" y=\"48\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">A</text><text x=\"132\" y=\"48\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">C</text><text x=\"216\" y=\"48\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">D</text><text x=\"300\" y=\"48\" text-anchor=\"middle\" font-size=\"16\" font-style=\"italic\">B</text></svg>",
};

Content.section({
  id: 'math/sh2024/g6s1/4.1',
  title: '线段',
  review: { status: 'pending' },
  audit: { blind: '2026-09-21', rounds: 2, note: '子代理盲解复核两轮：答案全部一致；第 2 轮按意见重做 c04（加入反向，重叠分四段 + 舍解）、c05（改为直线条数的所有可能值，按共线分组构造与排除），换掉 e07（三等分点 → 小棒加减量长度）、e10（整数点个数、原点为端点），e03(2) 改为真正两解，b02 注明射线的数法；复核意见“e07 题干例子泄露 (3) 的答案，改掉后整节通过”，已把例子换成 5 cm 和 2 cm' },

  intro: [
    {
      title: '直线、射线、线段',
      body: '把一根拉紧的线看成**线段**，它有两个端点，可以度量长度；把线段向一方无限延伸，得到**射线**，它只有一个端点；向两方无限延伸，得到**直线**，没有端点。线段 $AB$ 和线段 $BA$ 是同一条；射线要把端点字母写在前面，射线 $OA$ 与射线 $AO$ 不同。',
      example: '笔直的铁轨可以看成直线的一部分；手电筒射出的光可以看成射线；一支铅笔可以看成线段。',
    },
    {
      title: '两个基本事实',
      body: '① 经过两点有一条直线，并且只有一条直线（两点确定一条直线）。② 两点之间的所有连线中，线段最短（两点之间线段最短）。连接两点的线段的长度，叫做这**两点间的距离**。',
      example: '砌墙时先在两端各钉一根钉子拉直线，用的是①；把弯曲的河道改直可以缩短航程，用的是②。',
    },
    {
      title: '线段的和、差与中点',
      body: '线段的长度可以相加、相减、乘一个数。把线段分成两条相等线段的点，叫做线段的**中点**。若 $M$ 是线段 $AB$ 的中点，则 $AM=MB=\\frac{1}{2}AB$，$AB=2AM$。',
      example: '线段 $PQ=9$，点 $R$ 在 $PQ$ 上且 $PR=6$，则 $RQ=9-6=3$；若 $S$ 是 $PQ$ 的中点，则 $PS=4.5$，$PR$ 比 $PS$ 长，$RS=6-4.5=1.5$。',
    },
    {
      title: '没有图时要分类',
      body: '题目只说“点在直线上”而没有给图时，点的位置常常不止一种：可能在线段上，也可能在线段的延长线上。要把每种位置都画出来分别计算，再看是否都符合题意。在数轴上，表示 $a$、$b$ 的两点间的距离是 $|a-b|$，中点表示的数是 $\\frac{a+b}{2}$。',
      example: '直线上有 $P$、$Q$、$R$ 三点，$PQ=5$，$QR=1$。$R$ 在线段 $PQ$ 上时 $PR=4$；$R$ 在 $PQ$ 的延长线上时 $PR=6$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '4.1-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列说法中，正确的有（　　）',
      options: [
        '射线 $AB$ 与射线 $BA$ 是同一条射线',
        '线段 $AB$ 与线段 $BA$ 是同一条线段',
        '两点之间，直线最短',
        '若 $AC=BC$，则点 $C$ 是线段 $AB$ 的中点',
        '延长线段 $AB$ 到点 $C$，使 $BC=AB$，则 $AC=2AB$',
        '经过任意三点，一定可以画一条直线',
      ],
      answer: [1, 4],
      explain: [
        'A 错：射线 $AB$ 的端点是 $A$，向 $B$ 的方向延伸；射线 $BA$ 的端点是 $B$，方向相反，不是同一条。',
        'B 对：线段只看两个端点，与字母顺序无关。',
        'C 错：直线无限长，不能度量，应该是“两点之间，线段最短”。',
        'D 错：$C$ 不一定在直线 $AB$ 上。比如 $C$ 在线段 $AB$ 的外面，与 $A$、$B$ 距离相等，它就不是中点。要说“点 $C$ 在线段 $AB$ 上，且 $AC=BC$”。',
        'E 对：$C$ 在 $AB$ 的延长线上，$AC=AB+BC=2AB$。',
        'F 错：三点不一定在同一条直线上；只有“两点确定一条直线”。',
        '所以选 B、E。',
      ],
    },
    {
      id: '4.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '一条直线上依次有 $A$、$B$、$C$、$D$、$E$ 五个点。',
      blanks: [
        { kind: 'num', label: '(1) 以这五个点中的任意两点为端点的线段共有', answer: '10', suffix: '条' },
        { kind: 'num', label: '(2) 以这五个点中的某一点为端点、在这条直线上的射线共有（包括不能用这五个字母中的两个来表示的射线）', answer: '10', suffix: '条' },
        { kind: 'num', label: '(3) 图中共有', answer: '1', suffix: '条直线' },
      ],
      explain: [
        '(1) 有序地数，避免重复和遗漏：以 $A$ 为左端点的有 $AB$、$AC$、$AD$、$AE$，4 条；以 $B$ 为左端点的 3 条；以 $C$ 为左端点的 2 条；以 $D$ 为左端点的 1 条。共 $4+3+2+1=10$ 条。',
        '也可以这样想：每个点与另外 4 个点各连一条，共 $5\\times 4=20$，但每条线段被它的两个端点各数了一次，所以是 $20\\div 2=10$ 条。',
        '(2) 每个点在直线上都可以向左、向右各引出一条射线，共 $5\\times 2=10$ 条。注意“射线 $AB$”与“射线 $AC$”是同一条（端点相同、方向相同），不能重复数。',
        '(3) 五个点都在同一条直线上，只有 1 条直线。',
      ],
      verify: () => {
        const pts = [0, 1, 2, 3, 4];
        let seg = 0;
        for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) seg++;
        const rays = new Set();
        // 射线由端点和方向决定：每个点在直线上向左、向右各一条（不要求方向上还有别的点）
        for (const p of pts) for (const dir of ['+', '-']) rays.add(`${p}${dir}`);
        return [seg, rays.size, 1];
      },
    },
    {
      id: '4.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '如图，线段 $AB=10$，点 $C$ 在线段 $AB$ 上，$AC=4$，点 $D$ 是线段 $CB$ 的中点。',
      figure: FIG41.acdb,
      blanks: [
        { kind: 'num', label: '(1) $AD=$', answer: '7' },
        { kind: 'num', label: '(2) 若点 $E$ 是线段 $AD$ 的中点，则 $CE=$', answer: '1/2' },
      ],
      explain: [
        '(1) $CB=AB-AC=10-4=6$。$D$ 是 $CB$ 的中点，$CD=\\frac{1}{2}CB=3$。所以 $AD=AC+CD=4+3=7$。',
        '(2) $E$ 是 $AD$ 的中点，$AE=\\frac{1}{2}AD=3.5$。$E$ 离 $A$ 3.5，$C$ 离 $A$ 4，所以 $E$ 在 $A$ 与 $C$ 之间，$CE=AC-AE=4-3.5=0.5$。',
        '易错：以为 $E$ 在 $C$ 的右边，写成 $CE=AE-AC$，得到负数。先判断点的位置，再决定用和还是差。',
      ],
      verify: () => {
        const A = F(0), B = F(10), C = F(4);
        const D = C.add(B).div(2);
        const E = A.add(D).div(2);
        return [D.sub(A), C.sub(E).abs()];
      },
    },
    {
      id: '4.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '已知 $A$、$B$、$C$ 三点在同一条直线上，$AB=8$，$BC=3$。（没有图，要考虑各种位置）',
      blanks: [
        { kind: 'nums', label: '(1) $AC$ 的长是（全部填出，用逗号隔开）', answer: ['11', '5'] },
        { kind: 'nums', label: '(2) 若 $M$、$N$ 分别是 $AB$、$BC$ 的中点，则 $MN$ 的长是（全部填出，用逗号隔开）', answer: ['11/2', '5/2'] },
      ],
      explain: [
        '$C$ 与 $A$ 可能在 $B$ 的两侧，也可能在 $B$ 的同侧，要分两种情况。',
        '(1) ① $C$ 在线段 $AB$ 的延长线上（在 $B$ 的外侧）：$AC=AB+BC=11$。② $C$ 在线段 $AB$ 上：$AC=AB-BC=5$。',
        '（$C$ 不可能在 $A$ 的外侧：那样 $BC$ 会比 $AB=8$ 还长。）',
        '(2) $MB=\\frac{1}{2}AB=4$，$BN=\\frac{1}{2}BC=1.5$。',
        '① $C$ 在 $B$ 外侧时，$M$、$N$ 在 $B$ 的两侧，$MN=4+1.5=5.5$；② $C$ 在线段 $AB$ 上时，$M$、$N$ 都在 $B$ 的同一侧，$MN=4-1.5=2.5$。',
        '只按一种位置计算，是这类题最常见的漏解。',
      ],
      verify: () => {
        // 把直线看成数轴：A=0，B=8，C=8±3
        const A = F(0), B = F(8);
        const Cs = [B.add(3), B.sub(3)];
        return [
          Cs.map(C => C.sub(A).abs()),
          Cs.map(C => A.add(B).div(2).sub(B.add(C).div(2)).abs()),
        ];
      },
    },
    {
      id: '4.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $-3$，点 $B$ 表示 $7$。$M$ 是线段 $AB$ 的中点，$N$ 是线段 $MB$ 的中点。',
      blanks: [
        { kind: 'num', label: '(1) 点 $M$ 表示的数是', answer: '2' },
        { kind: 'num', label: '(2) 点 $N$ 表示的数是', answer: '9/2' },
        { kind: 'num', label: '(3) 线段 $AN$ 的长是', answer: '15/2' },
      ],
      explain: [
        '(1) $AB=7-(-3)=10$，$AM=5$，$M$ 表示 $-3+5=2$。也可以用中点公式：$\\frac{-3+7}{2}=2$。',
        '(2) $N$ 是 $MB$ 的中点：$\\frac{2+7}{2}=4.5$。',
        '(3) $AN=4.5-(-3)=7.5$。',
        '易错：把 $AB$ 算成 $7-3=4$，忘了减去的是负数。',
      ],
      verify: () => {
        const M = F(-3).add(7).div(2);
        const N = M.add(7).div(2);
        return [M, N, N.sub(-3)];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '4.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '线段计数的规律。',
      blanks: [
        { kind: 'num', label: '(1) 一条直线上有若干个点，以其中任意两点为端点的线段共有 45 条，则这条直线上有', answer: '10', suffix: '个点' },
        { kind: 'num', label: '(2) 在 (1) 的直线上再增加 1 个点，线段增加', answer: '10', suffix: '条' },
        { kind: 'num', label: '(3) 一条铁路上共有 8 个车站（含起点站和终点站），每两站之间都要准备往返两种车票，共需准备', answer: '56', suffix: '种车票' },
      ],
      explain: [
        '先找规律：直线上有 $n$ 个点时，每个点与另外 $(n-1)$ 个点各连一条，每条被数了两次，线段有 $\\frac{n(n-1)}{2}$ 条。',
        '(1) $\\frac{n(n-1)}{2}=45$，即 $n(n-1)=90$。两个相邻整数之积为 90：$10\\times 9=90$，所以 $n=10$。',
        '(2) 新增的点与原来的 10 个点各组成一条新线段，增加 10 条（$\\frac{11\\times 10}{2}-45=10$）。',
        '(3) 8 个站之间的线段有 $\\frac{8\\times 7}{2}=28$ 条，每条对应两种车票（从甲到乙、从乙到甲），共 56 种。',
        '车票与线段的区别：线段 $AB$ 和 $BA$ 是同一条，但车票“$A$ 到 $B$”和“$B$ 到 $A$”是两种。',
      ],
      verify: () => {
        const segs = n => { let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) c++; return c; };
        let n1 = null;
        for (let n = 2; n <= 50; n++) if (segs(n) === 45) n1 = n;
        let tickets = 0;
        for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if (i !== j) tickets++;
        return [n1, segs(n1 + 1) - segs(n1), tickets];
      },
    },
    {
      id: '4.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '点 $B$、$C$ 在线段 $AD$ 上，按 $A$、$B$、$C$、$D$ 的顺序排列，且 $AB:BC:CD=2:3:4$。$M$ 是 $AB$ 的中点，$N$ 是 $CD$ 的中点，$MN=15$。',
      blanks: [
        { kind: 'num', label: '(1) $AD=$', answer: '45/2' },
        { kind: 'num', label: '(2) 若点 $P$ 在线段 $AD$ 上，且 $AP:PD=1:2$，则 $BP=$', answer: '5/2' },
      ],
      explain: [
        '(1) 比例已知但长度未知，设一份为 $x$：$AB=2x$，$BC=3x$，$CD=4x$。',
        '$MB=\\frac{1}{2}AB=x$，$CN=\\frac{1}{2}CD=2x$，所以 $MN=MB+BC+CN=x+3x+2x=6x$。',
        '列方程 $6x=15$，$x=2.5$。$AD=9x=22.5$。',
        '(2) $AP=\\frac{1}{3}AD=7.5$，而 $AB=2x=5$，所以 $P$ 在 $B$ 的右边，$BP=7.5-5=2.5$。',
        '检验 $P$ 是否还在 $BC$ 上：$AC=5x=12.5>7.5$，是的。',
      ],
      verify: () => {
        let x = null;
        for (let i = 1; i <= 400; i++) {
          const t = F(i).div(10);
          const A = F(0), B = t.mul(2), C = t.mul(5), D = t.mul(9);
          if (C.add(D).div(2).sub(A.add(B).div(2)).eq(15)) x = t;
        }
        const AD = x.mul(9);
        return [AD, AD.div(3).sub(x.mul(2)).abs()];
      },
    },
    {
      id: '4.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '已知线段 $AB=12$，点 $C$ 在直线 $AB$ 上，$BC=4$。（没有图，要考虑各种位置）',
      blanks: [
        { kind: 'nums', label: '(1) 若 $M$、$N$ 分别是 $AC$、$BC$ 的中点，则 $MN$ 的长是（有几个就填几个，用逗号隔开）', answer: ['6'] },
        { kind: 'nums', label: '(2) 若 $P$ 是 $AC$ 的中点，则 $PB$ 的长是（有几个就填几个，用逗号隔开）', answer: ['8', '4'] },
      ],
      explain: [
        '$C$ 可能在线段 $AB$ 上，也可能在 $AB$ 的延长线上（$B$ 的外侧），要分别计算。（$C$ 不可能在 $A$ 的外侧，否则 $BC>12$。）',
        '(1) ① $C$ 在 $AB$ 上：$AC=8$，$MC=4$，$CN=2$，$M$、$N$ 在 $C$ 两侧，$MN=4+2=6$。',
        '② $C$ 在延长线上：$AC=16$，$MC=8$，$NC=2$，$M$、$N$ 在 $C$ 同侧，$MN=8-2=6$。',
        '两种情况结果相同，所以只有一个值 6。原因：无论哪种，$MN=\\frac{1}{2}AC\\pm\\frac{1}{2}BC=\\frac{1}{2}(AC\\pm BC)$，而 $AC\\pm BC$ 恰好就是 $AB$。',
        '(2) ① $C$ 在 $AB$ 上：$AC=8$，$AP=4$，$PB=12-4=8$。② $C$ 在延长线上：$AC=16$，$AP=8$，$PB=12-8=4$。',
        '这一问两种位置的结果不同，有两个值 8 和 4。对比 (1)：分类讨论后结果可能相同，也可能不同，都要算出来再下结论。'
      ],
      verify: () => {
        const A = F(0), B = F(12);
        const uniq = arr => arr.filter((v, i) => arr.findIndex(w => w.eq(v)) === i);
        const Cs = [B.sub(4), B.add(4)].filter(C => C.sub(B).abs().eq(4));
        return [
          uniq(Cs.map(C => A.add(C).div(2).sub(B.add(C).div(2)).abs())),
          uniq(Cs.map(C => A.add(C).div(2).sub(B).abs())),
        ];
      },
    },
    {
      id: '4.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $-10$，点 $B$ 表示 $20$。动点 $P$ 从 $A$ 出发，以每秒 3 个单位的速度向右运动；同时动点 $Q$ 从 $B$ 出发，以每秒 2 个单位的速度向左运动。设运动时间为 $t$ 秒。',
      blanks: [
        { kind: 'num', label: '(1) 当 $PB=2PA$ 时，$t=$', answer: '10/3' },
        { kind: 'nums', label: '(2) 当 $P$、$Q$ 两点相距 5 个单位时，$t$ 的值是（全部填出，用逗号隔开）', answer: ['5', '7'] },
      ],
      explain: [
        '$t$ 秒后 $P$ 表示 $-10+3t$，$Q$ 表示 $20-2t$，$PA=3t$。',
        '(1) $PB=|20-(-10+3t)|=|30-3t|$。要 $|30-3t|=2\\times 3t=6t$。',
        '若 $P$ 还没到 $B$（$30-3t$ 不是负数）：$30-3t=6t$，$t=\\frac{10}{3}$，此时 $3t=10<30$，符合。',
        '若 $P$ 已过 $B$：$3t-30=6t$，$t=-10$，不符合。所以 $t=\\frac{10}{3}$。',
        '(2) $PQ=|(20-2t)-(-10+3t)|=|30-5t|$。相遇前 $30-5t=5$，$t=5$；相遇后 $5t-30=5$，$t=7$。',
      ],
      verify: () => {
        const ts = [];
        for (let i = 0; i <= 1200; i++) ts.push(F(i).div(60));
        const P = t => F(-10).add(t.mul(3)), Q = t => F(20).sub(t.mul(2));
        return [
          ts.filter(t => t.cmp(0) > 0 && F(20).sub(P(t)).abs().eq(P(t).sub(-10).mul(2)))[0],
          ts.filter(t => Q(t).sub(P(t)).abs().eq(5)),
        ];
      },
    },
    {
      id: '4.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '点 $C$ 在直线 $AB$ 上，且 $AC:BC=2:3$，$D$ 是线段 $AB$ 的中点，$CD=2$。（没有图，要考虑各种位置）',
      blanks: [
        { kind: 'nums', label: '线段 $AB$ 的长是（全部填出，用逗号隔开）', answer: ['20', '4/5'] },
      ],
      explain: [
        '$AC<BC$，所以 $C$ 离 $A$ 更近。$C$ 可能在线段 $AB$ 上，也可能在 $A$ 的外侧；不可能在 $B$ 的外侧（那样 $AC>BC$）。',
        '① $C$ 在线段 $AB$ 上：设 $AC=2x$，$BC=3x$，$AB=5x$，$AD=2.5x$，$CD=AD-AC=0.5x$。由 $0.5x=2$ 得 $x=4$，$AB=20$。',
        '② $C$ 在 $A$ 的外侧（$BA$ 的延长线上）：设 $AC=2x$，$BC=3x$，这时 $AB=BC-AC=x$，$AD=0.5x$，$CD=AC+AD=2.5x$。由 $2.5x=2$ 得 $x=0.8$，$AB=0.8=\\frac{4}{5}$。',
        '所以 $AB=20$ 或 $\\frac{4}{5}$。第 ② 种情况很容易被忽略：“$AC:BC=2:3$”并没有说 $C$ 在 $A$、$B$ 之间。',
      ],
      verify: () => {
        // A=0，B=L，C=c：先由 |c-L/2|=2 得 L=2(c±2)，再检验 |c|:|c-L|=2:3
        const res = [];
        for (let j = -5000; j <= 5000; j++) {
          const c = F(j).div(100);
          for (const L of [c.add(2).mul(2), c.sub(2).mul(2)]) {
            if (L.cmp(0) > 0 && c.abs().mul(3).eq(c.sub(L).abs().mul(2)) && !res.some(v => v.eq(L))) res.push(L);
          }
        }
        return res;
      },
    },
    {
      id: '4.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '把长 10 cm 的线段 $AB$ 十等分，连同 $A$、$B$ 共得到 11 个点。以这 11 个点中任意两点为端点的线段：',
      blanks: [
        { kind: 'num', label: '(1) 共有', answer: '55', suffix: '条' },
        { kind: 'num', label: '(2) 长度不同的线段有', answer: '10', suffix: '种' },
        { kind: 'num', label: '(3) 所有这些线段的长度之和是', answer: '220', suffix: 'cm' },
      ],
      explain: [
        '(1) 11 个点，$\\frac{11\\times 10}{2}=55$ 条。',
        '(2) 相邻两点相距 1 cm，线段长度可以是 1、2、……、10 cm，共 10 种。',
        '(3) 按长度分类计数：长 1 cm 的有 10 条，长 2 cm 的有 9 条，……，长 10 cm 的有 1 条。总长 $=1\\times 10+2\\times 9+3\\times 8+\\cdots+10\\times 1$。',
        '首尾配对：$1\\times 10=10$，$2\\times 9=18$，$3\\times 8=24$，$4\\times 7=28$，$5\\times 6=30$，后五项与前五项对称相同，和为 $2\\times(10+18+24+28+30)=220$ cm。',
        '另一种想法：看每一小段（相邻两点之间 1 cm）被多少条线段覆盖。第 $k$ 小段左边有 $k$ 个点、右边有 $(11-k)$ 个点，被 $k(11-k)$ 条线段覆盖，结果相同。',
      ],
      verify: () => {
        let cnt = 0, sum = 0;
        const lens = new Set();
        for (let i = 0; i <= 10; i++) for (let j = i + 1; j <= 10; j++) { cnt++; sum += j - i; lens.add(j - i); }
        return [cnt, lens.size, sum];
      },
    },
    {
      id: '4.1-e07',
      level: 'extended',
      type: 'fill',
      stem: '用几根长度已知的小棒沿同一条直线摆放来“量”长度：可以首尾相接（长度相加），也可以并排重叠、一端对齐（长度相减），每根小棒最多用一次。例如用 5 cm 和 2 cm 的小棒可以量出 5 cm、2 cm、7 cm 和 3 cm。',
      blanks: [
        { kind: 'num', label: '(1) 用 1 cm、3 cm、9 cm 的小棒各一根，能量出的不同长度（整厘米）共有', answer: '13', suffix: '种' },
        { kind: 'num', label: '(2) 用 1 cm、2 cm、6 cm 的小棒各一根，能量出的不同长度共有', answer: '9', suffix: '种' },
        { kind: 'num', label: '(3) 用两根整厘米长的小棒（长度不同），要能量出 1 cm、2 cm、3 cm、4 cm 这四种长度，较长的那根最短是', answer: '3', suffix: 'cm' },
      ],
      explain: [
        '量出的长度，就是若干根小棒的长度加加减减的结果（取正值）。有序地列举，按“用几根”分类。',
        '(1) 用一根：1、3、9；用两根：$1+3=4$，$3-1=2$，$9+1=10$，$9-1=8$，$9+3=12$，$9-3=6$；用三根：$9+3+1=13$，$9+3-1=11$，$9-3+1=7$，$9-3-1=5$。',
        '合起来是 1 到 13 的每一个整数，恰好 13 种，没有重复。',
        '(2) 用一根：1、2、6；两根：3、1、7、5、8、4；三根：9、7、5、3。去掉重复后是 1、2、3、4、5、6、7、8、9，共 9 种。',
        '(3) 两根小棒 $a<b$ 最多量出 $a$、$b$、$a+b$、$b-a$ 四种长度，要正好是 1、2、3、4。最大的 $a+b=4$，所以 $\\{a,b\\}$ 是 $\\{1,3\\}$（$\\{2,2\\}$ 长度相同不行）。检验：1、3、4、2，正好。较长的一根是 3 cm。',
        '这里的“相减”就是线段的差：两根小棒一端对齐，另一端之间的距离。',
      ],
      verify: () => {
        const measure = sticks => {
          const set = new Set();
          const go = (i, v) => {
            if (i === sticks.length) { if (v > 0) set.add(Math.abs(v)); return; }
            go(i + 1, v); go(i + 1, v + sticks[i]); go(i + 1, v - sticks[i]);
          };
          go(0, 0);
          for (const v of [...set]) if (v < 0) set.delete(v);
          return [...set].map(Math.abs);
        };
        const kinds = s => new Set(measure(s)).size;
        let best = null;
        for (let b = 2; b <= 10 && best === null; b++) for (let a = 1; a < b; a++) {
          const m = new Set(measure([a, b]));
          if ([1, 2, 3, 4].every(v => m.has(v))) { best = b; break; }
        }
        return [kinds([1, 3, 9]), kinds([1, 2, 6]), best];
      },
    },
    {
      id: '4.1-e08',
      level: 'extended',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $-4$，点 $B$ 表示 $6$。动点 $P$ 从原点出发，以每秒 1 个单位的速度向右运动，设运动时间为 $t$ 秒（$t>0$）。',
      blanks: [
        { kind: 'nums', label: '(1) 当 $A$、$B$、$P$ 三点中有一点恰好是另外两点所连线段的中点时，$t$ 的值是（全部填出，用逗号隔开）', answer: ['1', '16'] },
        { kind: 'nums', label: '(2) 当点 $P$ 到 $A$ 的距离恰好是它到 $B$ 的距离的 3 倍时，$t$ 的值是（全部填出，用逗号隔开）', answer: ['7/2', '11'] },
      ],
      explain: [
        '$t$ 秒后 $P$ 表示 $t$。',
        '(1) 分三种情况：① $P$ 是 $AB$ 的中点：$t=\\frac{-4+6}{2}=1$。② $A$ 是 $PB$ 的中点：$P$ 要在 $A$ 左边 10 个单位，表示 $-14$，但 $P$ 一直在原点右边，不可能。③ $B$ 是 $AP$ 的中点：$\\frac{-4+t}{2}=6$，$t=16$。',
        '所以 $t=1$ 或 16。',
        '(2) $PA=t+4$，$PB=|t-6|$。$P$ 在 $B$ 左边时：$t+4=3(6-t)$，$4t=14$，$t=\\frac{7}{2}$，确实小于 6；$P$ 在 $B$ 右边时：$t+4=3(t-6)$，$2t=22$，$t=11$，确实大于 6。',
        '两个都符合，$t=\\frac{7}{2}$ 或 11。',
      ],
      verify: () => {
        const ts = [];
        for (let i = 1; i <= 1200; i++) ts.push(F(i).div(20));
        const A = F(-4), B = F(6);
        const mid = t => A.add(B).div(2).eq(t) || t.add(B).div(2).eq(A) || A.add(t).div(2).eq(B);
        return [ts.filter(mid), ts.filter(t => t.sub(A).eq(t.sub(B).abs().mul(3)))];
      },
    },
    {
      id: '4.1-e09',
      level: 'extended',
      type: 'fill',
      stem: '线段 $AB=32$。取 $AB$ 的中点 $C_1$，再取 $C_1B$ 的中点 $C_2$，再取 $C_2B$ 的中点 $C_3$，……，这样一直取下去。',
      blanks: [
        { kind: 'num', label: '(1) $C_5B=$', answer: '1' },
        { kind: 'num', label: '(2) $AC_1+AC_2+AC_3+AC_4+AC_5=$', answer: '129' },
        { kind: 'num', label: '(3) 使 $AC_n$ 超过 $AB$ 的 $99\\%$ 的最小的 $n$ 是', answer: '7' },
      ],
      explain: [
        '每取一次中点，到 $B$ 的距离就减半：$C_1B=16$，$C_2B=8$，$C_3B=4$，$C_4B=2$，$C_5B=1$。',
        '(1) $C_5B=1$。一般地，$C_nB$ 是 32 连续除以 $n$ 次 2。',
        '(2) $AC_n=AB-C_nB$：依次是 $16,\\ 24,\\ 28,\\ 30,\\ 31$，和为 $129$。也可以算成 $5\\times 32-(16+8+4+2+1)=160-31=129$。',
        '(3) $AC_n$ 超过 $AB$ 的 $99\\%$，就是 $C_nB$ 小于 $AB$ 的 $1\\%$，即 $C_nB$ 小于 $0.32$。',
        '$C_5B=1$，$C_6B=0.5$，$C_7B=0.25<0.32$。所以最小的 $n=7$。',
      ],
      verify: () => {
        const CB = [F(32)];
        for (let k = 1; k <= 20; k++) CB.push(CB[k - 1].div(2));
        let s = F(0);
        for (let k = 1; k <= 5; k++) s = s.add(F(32).sub(CB[k]));
        let n = null;
        for (let k = 1; k <= 20 && n === null; k++) if (F(32).sub(CB[k]).cmp(F(32).mul('0.99')) > 0) n = k;
        return [CB[5], s, n];
      },
    },
    {
      id: '4.1-e10',
      level: 'extended',
      type: 'fill',
      stem: '数轴上点 $A$ 表示数 $a$，点 $B$ 表示数 $2a+6$（$a$ 是常数），$O$ 是原点。',
      blanks: [
        { kind: 'num', label: '(1) 若线段 $AB$ 的中点表示的数是 3，则 $a=$', answer: '0' },
        { kind: 'nums', label: '(2) 若 $a$ 是整数，且线段 $AB$ 上（包括端点）恰好有 5 个表示整数的点，则 $a$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['-2', '-10'] },
        { kind: 'nums', label: '(3) 若线段 $AB$ 的中点到原点的距离恰好等于 $AB$ 长的一半，则 $a$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['0', '-3'] },
      ],
      explain: [
        '(1) 中点表示 $\\frac{a+(2a+6)}{2}=\\frac{3a+6}{2}$。由 $\\frac{3a+6}{2}=3$ 得 $a=0$。',
        '(2) $a$ 是整数时，$A$、$B$ 都表示整数，$AB=|(2a+6)-a|=|a+6|$。线段上的整数点比长度多 1 个，所以 $|a+6|+1=5$，$|a+6|=4$，$a=-2$ 或 $-10$。',
        '检验：$a=-10$ 时 $A$ 表示 $-10$、$B$ 表示 $-14$，$B$ 在 $A$ 的左边，线段上是 $-14$ 到 $-10$ 共 5 个整数，符合。不要默认 $B$ 在 $A$ 右边。',
        '(3) 中点 $M$ 表示 $\\frac{3a+6}{2}$，$MO=\\left|\\frac{3a+6}{2}\\right|$；$AB$ 的一半是 $\\frac{|a+6|}{2}$。',
        '列方程 $|3a+6|=|a+6|$：$3a+6=a+6$ 得 $a=0$；$3a+6=-(a+6)$ 得 $4a=-12$，$a=-3$。',
        '检验：$a=0$ 时 $A$、$B$ 表示 0、6；$a=-3$ 时表示 $-3$、0。两种情况原点都恰好是线段的一个端点。',
        '这不是巧合：$M$ 到两个端点的距离都是 $AB$ 的一半，$O$ 在直线 $AB$ 上且 $MO$ 也等于一半，$O$ 只能是 $A$ 或 $B$。从这个角度，直接由 $a=0$ 或 $2a+6=0$ 也能得到答案。',
      ],
      verify: () => {
        const as = [];
        for (let i = -400; i <= 400; i++) as.push(F(i).div(4));
        const B = a => a.mul(2).add(6);
        const ints = a => { const lo = a.cmp(B(a)) < 0 ? a : B(a), hi = a.cmp(B(a)) < 0 ? B(a) : a; let c = 0; for (let k = -200; k <= 200; k++) if (lo.cmp(k) <= 0 && hi.cmp(k) >= 0) c++; return c; };
        return [
          as.find(a => a.add(B(a)).div(2).eq(3)),
          as.filter(a => a.d === 1n && ints(a) === 5),
          as.filter(a => a.add(B(a)).div(2).abs().eq(B(a).sub(a).abs().div(2))),
        ];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '4.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '直线上有四个不同的点，每两点之间的距离共有 6 个。',
      blanks: [
        { kind: 'num', label: '(1) 若这 6 个距离从小到大依次是 2，4，5，7，9，11，则相距最远的两点之间的另外两个点，把这段分成三段，中间一段的长是', answer: '5' },
        { kind: 'nums', label: '(2) 在 (1) 中，把最左边的点看成数轴上的原点、向右为正方向，则从左往右第二个点表示的数是（全部填出，用逗号隔开）', answer: ['2', '4'] },
        { kind: 'nums', label: '(3) 若这 6 个距离从小到大依次是 1，3，4，5，$a$，9，则 $a$ 的所有可能值是（全部填出，用逗号隔开）', answer: ['6', '8'] },
      ],
      explain: [
        '设四个点从左到右依次相邻的三段长为 $x$、$y$、$z$。6 个距离就是：三段本身 $x$、$y$、$z$，相邻两段拼成的 $x+y$、$y+z$，以及全长 $x+y+z$。',
        '(1) 最大的 11 一定是全长：$x+y+z=11$。其余 5 个数 2，4，5，7，9 就是 $x$、$y$、$z$、$x+y$、$y+z$。',
        '关键观察：$(x+y)+z=11$，$x+(y+z)=11$，所以“两段之和”各自与一个“单段”配成 11。在 2，4，5，7，9 中，和为 11 的配对只有 $2+9$ 和 $4+7$，剩下的 5 只能是中间一段 $y$。',
        '于是 $\\{x,z\\}=\\{2,4\\}$，检验：$x=2$、$z=4$ 时 $x+y=7$、$y+z=9$，正好对上。中间一段长 5。',
        '(2) 从左到右三段可能是 2，5，4，也可能反过来是 4，5，2。第二个点表示 2 或 4。',
        '(3) 最大的 9 是全长 $x+y+z=9$。同 (1) 的想法，其余 5 个数 1，3，4，5，$a$ 中，要有两对各自和为 9，剩下的一个是 $y$。',
        '$a$ 在 5 与 9 之间（从小到大排列，且不能与 9 相等，否则就不止一个全长）。',
        '若 $a$ 与 1 配对：$a=8$，另一对要从 3，4，5 中找和为 9 的：$4+5$，剩下 $y=3$，$\\{x,z\\}=\\{1,5\\}$。检验：三段 1，3，5，两段和 4 和 8，符合。',
        '若 $a$ 与 3 配对：$a=6$，另一对从 1，4，5 中找：$4+5$，剩下 $y=1$，$\\{x,z\\}=\\{3,5\\}$。检验：三段 3，1，5，两段和 4 和 6，符合。',
        '若 $a$ 与 4 或 5 配对：$a=5$ 或 4，不大于 5，不行。所以 $a=6$ 或 8。',
        '思路回顾：先认出全长，再利用“一段 $+$ 另两段 $=$ 全长”的配对结构把 5 个数分组，最后逐一检验。',
      ],
      verify: () => {
        const dists = (x, y, z) => [x, y, z, x + y, y + z, x + y + z].sort((p, q) => p - q).join(',');
        const sols = target => {
          const r = [];
          for (let x = 1; x <= 20; x++) for (let y = 1; y <= 20; y++) for (let z = 1; z <= 20; z++) if (dists(x, y, z) === target) r.push([x, y, z]);
          return r;
        };
        const s1 = sols('2,4,5,7,9,11');
        const mids = [...new Set(s1.map(s => s[1]))];
        const second = [...new Set(s1.map(s => s[0]))];
        const as = [];
        for (let a = 5; a <= 9; a++) if (sols(`1,3,4,5,${a},9`).length) as.push(a);
        return [mids.length === 1 ? mids[0] : null, second, as];
      },
    },
    {
      id: '4.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '$A$、$B$、$C$、$D$ 是同一条直线上四个不同的点，$AB=6$，$BC=4$，$CD=2$。（没有图，要考虑各种位置）',
      blanks: [
        { kind: 'nums', label: '(1) $AD$ 的长是（全部填出，用逗号隔开）', answer: ['12', '8', '4'] },
        { kind: 'nums', label: '(2) 若 $E$、$F$ 分别是 $AB$、$CD$ 的中点，则 $EF$ 的长是（全部填出，用逗号隔开）', answer: ['8', '6', '0'] },
        { kind: 'nums', label: '(3) 若把 $CD$ 的长改为 $m$（$m>0$，$AB=6$、$BC=4$ 不变，四点仍互不相同），要使 $AD$ 恰好有 4 个不同的可能值，$m$ 不能取的值是（全部填出，用逗号隔开）', answer: ['2', '4', '6', '10'] },
      ],
      explain: [
        '把直线看成数轴，设 $A$ 表示 0，$B$ 表示 6（$B$ 在 $A$ 左边的情况与此对称，长度相同）。',
        '(1) $C$ 到 $B$ 距离 4：$C$ 表示 10 或 2。$D$ 到 $C$ 距离 2：$C=10$ 时 $D$ 表示 12 或 8；$C=2$ 时 $D$ 表示 4 或 0。',
        '但 $D$ 表示 0 时与 $A$ 重合，题目说四点不同，要舍去。所以 $AD=12$、8 或 4。',
        '(2) $E$ 表示 3。$F$ 是 $CD$ 的中点：$(10,12)$ 时 $F$ 表示 11，$(10,8)$ 时表示 9，$(2,4)$ 时表示 3。',
        '所以 $EF=8$、6 或 0。$EF=0$ 表示 $E$、$F$ 重合，这是允许的（只要求 $A$、$B$、$C$、$D$ 不同）。',
        '(3) $CD=m$ 时，$D$ 可能表示 $10+m$、$10-m$、$2+m$、$2-m$，$AD$ 就是这些数的绝对值。一般情况下有 4 个值，以下几种情况会变少：',
        '① $D$ 与 $A$ 重合（表示 0），这个位置要舍去：$2-m=0$ 时 $m=2$，$10-m=0$ 时 $m=10$。这两种情况都只剩 3 个值（$m=2$ 时 $AD$ 为 12、8、4；$m=10$ 时为 20、12、8）。',
        '② $D$ 与 $B$ 重合（表示 6）：$10-m=6$ 或 $2+m=6$，都得 $m=4$。这时 $D$ 只能表示 14 或 $-2$，只剩 2 个值。',
        '③ 两个位置的绝对值相等：$|10-m|=|2+m|$ 得 $m=4$（已包含在②中）；$|2-m|=|10-m|$ 得 $m=6$，这时 $D$ 表示 16、4、8、$-4$，$AD$ 为 16、4、8，只有 3 个值；其他配对（如 $|10+m|=|2-m|$）没有正数解。',
        '（$D$ 不会与自己那一支的 $C$ 重合，因为 $m>0$。）',
        '所以 $m$ 不能取 2、4、6、10。$m=10$ 最容易漏掉：$D$ 从 $C$（表示 10）向左走 10，正好回到 $A$。',
        '思路回顾：两层位置分类得到 4 个候选位置，再逐一排查“重合”和“长度相同”两类退化情况。',
      ],
      verify: () => {
        const ADs = m => {
          const r = [];
          for (const C of [F(10), F(2)]) for (const D of [C.add(m), C.sub(m)]) {
            if (D.isZero() || D.eq(6) || D.eq(C)) continue;
            if (!r.some(x => x.eq(D.abs()))) r.push(D.abs());
          }
          return r;
        };
        const E = F(3);
        const EFs = [];
        for (const C of [F(10), F(2)]) for (const D of [C.add(2), C.sub(2)]) {
          if (D.isZero() || D.eq(6)) continue;
          const v = C.add(D).div(2).sub(E).abs();
          if (!EFs.some(x => x.eq(v))) EFs.push(v);
        }
        const bad = [];
        for (let i = 1; i <= 600; i++) { const m = F(i).div(20); if (ADs(m).length !== 4) bad.push(m); }
        return [ADs(F(2)), EFs, bad];
      },
    },
    {
      id: '4.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '把一根绳子对折，再对折，使它变成原长的四分之一（共四层），然后在某处垂直剪一刀，把四层同时剪断。',
      demo: { type: 'foldCut', folds: 2 },
      blanks: [
        { kind: 'num', label: '(1) 绳子被剪成', answer: '5', suffix: '段' },
        { kind: 'num', label: '(2) 若对折三次后（共八层）同样剪一刀，绳子被剪成', answer: '9', suffix: '段' },
        { kind: 'nums', label: '(3) 按题干的方法（对折两次）剪开后，最长的一段是 30 cm，最短的一段是 10 cm，则绳子原长的所有可能值是（全部填出，用逗号隔开）', answer: ['100', '80'], suffix: 'cm' },
      ],
      explain: [
        '先弄清剪刀剪在原来绳子的哪些位置。设原长为 $L$，把绳子放在数轴上从 0 到 $L$。',
        '第一次对折，折痕在 $\\frac{L}{2}$ 处，两个绳头 0 与 $L$ 重在一起。第二次对折，折痕在 $\\frac{L}{4}$ 和 $\\frac{3L}{4}$ 处，这时一端是两个绳头和第一次的折痕（0、$L$、$\\frac{L}{2}$），另一端是新折痕。',
        '在离“绳头那一端” $c$ 处剪一刀（$c$ 小于 $\\frac{L}{4}$），展开后剪断的位置是 $c$、$\\frac{L}{2}-c$、$\\frac{L}{2}+c$、$L-c$，共 4 处。',
        '(1) 剪断 4 处，绳子被分成 $4+1=5$ 段。',
        '(2) 对折三次共八层，一刀剪断 8 处，分成 9 段。一般地，对折 $n$ 次剪一刀得 $2^n+1$ 段。',
        '(3) 5 段的长度依次是：$c$，$\\frac{L}{2}-2c$，$2c$，$\\frac{L}{2}-2c$，$c$。只有三种长度：$c$、$2c$、$\\frac{L}{2}-2c$。',
        '$c$ 比 $2c$ 短，所以最短的是 $c$ 或 $\\frac{L}{2}-2c$，最长的是 $2c$ 或 $\\frac{L}{2}-2c$。分类：',
        '① 最短是 $c=10$，最长是 $\\frac{L}{2}-2c=30$：$\\frac{L}{2}=50$，$L=100$。检验：三种长度 10、20、30，符合。',
        '② 最短是 $\\frac{L}{2}-2c=10$，最长是 $2c=30$：$c=15$，$\\frac{L}{2}=40$，$L=80$。检验：三种长度 15、30、10，符合。',
        '③ 最短是 $c=10$，最长是 $2c=20$，与“最长是 30”矛盾，不成立。',
        '所以原长是 100 cm 或 80 cm。',
        '思路回顾：先把“折叠后剪一刀”翻译成原绳子上的剪断位置（关键是找对称关系），再按“谁最长、谁最短”分类列方程。',
      ],
      verify: () => {
        // 对折 n 次后在离绳头端 c 处剪：原绳上的剪断位置是 x，满足 x 除以 (2L/2^n) 的余数为 c 或 2L/2^n - c
        const cuts = (L, c, n) => {
          const p = L.mul(2).div(2 ** n);
          const r = [];
          for (let k = 0; k < 2 ** n; k++) {
            const base = p.mul(Math.floor(k / 2));
            r.push(k % 2 ? base.add(p).sub(c) : base.add(c));
          }
          return r.sort((u, v) => u.cmp(v));
        };
        const pieces = (L, c, n) => {
          const cs = [F(0), ...cuts(L, c, n), L];
          return cs.slice(1).map((v, i) => v.sub(cs[i]));
        };
        const Ls = [];
        for (let i = 1; i <= 300; i++) {
          const L = F(i);
          for (let j = 1; j * 4 < i * 2; j++) {
            const c = F(j).div(2);
            const ps = pieces(L, c, 2);
            const mx = ps.reduce((u, v) => (u.cmp(v) > 0 ? u : v)), mn = ps.reduce((u, v) => (u.cmp(v) < 0 ? u : v));
            if (mx.eq(30) && mn.eq(10) && !Ls.some(v => v.eq(L))) Ls.push(L);
          }
        }
        return [pieces(F(40), F(3), 2).length, pieces(F(40), F(2), 3).length, Ls];
      },
    },
    {
      id: '4.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '数轴上线段 $AB$ 的端点 $A$、$B$ 分别表示 $-10$、$-6$，线段 $CD$ 的端点 $C$、$D$ 分别表示 8、16。线段 $AB$ 以每秒 3 个单位的速度向右平移，同时线段 $CD$ 以每秒 1 个单位的速度向左平移。当点 $B$ 与点 $D$ 重合时，线段 $AB$ 立即改为以每秒 3 个单位的速度向左平移，线段 $CD$ 的运动不变。设运动时间为 $t$ 秒。',
      blanks: [
        { kind: 'num', label: '(1) 两条线段有重叠部分的总时长是', answer: '6', suffix: '秒' },
        { kind: 'nums', label: '(2) 两条线段重叠部分的长为 2 时，$t$ 的值是（全部填出，用逗号隔开）', answer: ['4', '17/2'] },
        { kind: 'nums', label: '(3) 设 $M$、$N$ 分别是 $AB$、$CD$ 的中点，$MN=3$ 时，$t$ 的值是（全部填出，用逗号隔开）', answer: ['17/4', '8'] },
      ],
      explain: [
        '先写出各端点的位置。$CD$ 始终是：$C$ 表示 $8-t$，$D$ 表示 $16-t$。$AB$ 长 4，反向之前 $A$ 表示 $-10+3t$，$B$ 表示 $-6+3t$。',
        '$B$ 与 $D$ 重合：$-6+3t=16-t$，$t=5.5$，此时 $B$ 表示 10.5。之后 $B$ 表示 $10.5-3(t-5.5)=27-3t$，$A$ 表示 $23-3t$。',
        '(1) 按时间把重叠情况分段：',
        '① $B$ 追上 $C$：$-6+3t=8-t$，$t=3.5$，开始重叠。② $A$ 到达 $C$：$-10+3t=8-t$，$t=4.5$，此后 $AB$ 整个在 $CD$ 内。③ $t=5.5$ 时 $B$ 到达 $D$，$AB$ 反向。',
        '④ 反向后两条线段都向左，$AB$ 更快，从 $CD$ 的左端离开：$A$ 到达 $C$，$23-3t=8-t$，$t=7.5$；$B$ 到达 $C$，$27-3t=8-t$，$t=9.5$，完全分开。',
        '重叠从 $t=3.5$ 一直持续到 $t=9.5$，共 6 秒。',
        '(2) 各段的重叠长度：3.5 到 4.5 秒是 $CB=(-6+3t)-(8-t)=4t-14$；4.5 到 7.5 秒是 4（$AB$ 整个在 $CD$ 内）；7.5 到 9.5 秒是 $CB=(27-3t)-(8-t)=19-2t$。',
        '$4t-14=2$ 得 $t=4$；$19-2t=2$ 得 $t=8.5$。都在各自的时间段内。',
        '(3) $N$ 表示 $12-t$。反向前 $M$ 表示 $-8+3t$，$MN=|20-4t|$；反向后 $M$ 表示 $25-3t$，$MN=|13-2t|$。',
        '反向前（$t\\le 5.5$）：$20-4t=3$ 得 $t=\\frac{17}{4}$，符合；$4t-20=3$ 得 $t=\\frac{23}{4}=5.75$，超过 5.5，这时 $AB$ 已经反向，舍去。',
        '反向后（$t>5.5$）：$13-2t=3$ 得 $t=5$，不符合；$2t-13=3$ 得 $t=8$，符合。所以 $t=\\frac{17}{4}$ 或 8。',
        '思路回顾：运动改变方向，位置的式子就要分段写；每一段里再按端点的先后顺序讨论重叠长度，解出的时间都要回到所在的段检验。',
      ],
      verify: () => {
        const pos = t => {
          const turn = F(11).div(2);
          const B = t.cmp(turn) <= 0 ? F(-6).add(t.mul(3)) : F(27).sub(t.mul(3));
          return { A: B.sub(4), B, C: F(8).sub(t), D: F(16).sub(t) };
        };
        const ts = [];
        for (let i = 0; i <= 480; i++) ts.push(F(i).div(40));
        const overlap = t => { const { A, B, C, D } = pos(t); const lo = A.cmp(C) > 0 ? A : C, hi = B.cmp(D) < 0 ? B : D; return hi.sub(lo); };
        const touching = ts.filter(t => overlap(t).cmp(0) >= 0);
        const span = touching[touching.length - 1].sub(touching[0]);
        const two = ts.filter(t => overlap(t).eq(2));
        const mn = ts.filter(t => { const { A, B, C, D } = pos(t); return A.add(B).div(2).sub(C.add(D).div(2)).abs().eq(3); });
        return [span, two, mn];
      },
    },
    {
      id: '4.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '平面上有若干个不同的点，经过其中每两个点画一条直线（重合的直线只算一条）。',
      blanks: [
        { kind: 'nums', label: '(1) 平面上有 5 个点，一共画出的直线条数的所有可能值是（全部填出，用逗号隔开）', answer: ['1', '5', '6', '8', '10'] },
        { kind: 'nums', label: '(2) 平面上有 6 个点，其中恰有 4 个点在同一条直线 $l$ 上，另外 2 个点不在 $l$ 上，一共画出的直线条数的所有可能值是（全部填出，用逗号隔开）', answer: ['10', '8'] },
      ],
      explain: [
        '基本想法：先假设没有三点共线，每两点一条直线，$n$ 个点有 $\\frac{n(n-1)}{2}$ 条（5 个点 10 条，6 个点 15 条）。有 $k$ 个点共线时，其中两两配成的 $\\frac{k(k-1)}{2}$ 条其实是同一条，要合并。',
        '(1) 按 5 个点中“最多有几点共线”分类：',
        '① 5 点共线：只有 1 条。',
        '② 恰有 4 点共线，第 5 点在线外：这条直线 1 条，再加上第 5 点与另外 4 点各连 1 条，共 $1+4=5$ 条（第 5 点与这 4 点中任何两点都不共线）。',
        '③ 最多 3 点共线。若只有一组 3 点共线：$10-3+1=8$ 条。',
        '若有两组 3 点共线：两组不可能没有公共点（那样要 6 个点），所以两组恰好共用 1 个点（共用 2 个点就是同一条直线了）。每组合并少 2 条，共 $10-2-2=6$ 条。三组 3 点共线在 5 个点中做不到（每两组要共用一点，会出现 4 点共线或点数不够）。',
        '④ 没有三点共线：10 条。',
        '所以可能值是 1、5、6、8、10。',
        '(2) 设 $l$ 上的 4 点为 $A_1\\sim A_4$，另外两点为 $P$、$Q$。直线 $l$ 算 1 条；$P$ 与 4 点各连 1 条，$Q$ 也是，共 8 条；再加直线 $PQ$，一共 $1+4+4+1=10$ 条。',
        '会不会重合？$P$、$Q$ 与 $l$ 上的两点共线是不可能的（那样 $P$ 就在 $l$ 上了）。唯一可能的重合是直线 $PQ$ 恰好经过 $l$ 上的某一点 $A_i$：这时 $PA_i$、$QA_i$、$PQ$ 是同一条直线，3 条合成 1 条，共 $10-2=8$ 条。',
        '$PQ$ 最多经过 $l$ 上的一个点，所以只有这两种情况：10 条或 8 条。',
        '思路回顾：计数的难点在于“哪些直线会重合”。按共线的点分组讨论，每种情况都要说明能画出来，并说明不会再有别的重合。',
      ],
      verify: () => {
        // 在方格点上穷举点集，数出不同直线的条数
        const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
        const key = ([x1, y1], [x2, y2]) => {
          let a = y2 - y1, b = x1 - x2, c = -(a * x1 + b * y1);
          const d = gcd(gcd(a, b), c) || 1; a /= d; b /= d; c /= d;
          if (a < 0 || (a === 0 && b < 0)) { a = -a; b = -b; c = -c; }
          return `${a},${b},${c}`;
        };
        const lines = pts => {
          const m = new Map();
          for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
            const k = key(pts[i], pts[j]);
            if (!m.has(k)) m.set(k, new Set());
            m.get(k).add(i).add(j);
          }
          return m;
        };
        const combos = (n, k, f, s = 0, cur = []) => {
          if (cur.length === k) { f(cur); return; }
          for (let i = s; i < n; i++) { cur.push(i); combos(n, k, f, i + 1, cur); cur.pop(); }
        };
        const grid = n => { const g = []; for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) g.push([x, y]); return g; };
        const g5 = grid(5), g4 = grid(4);
        const five = new Set();
        combos(25, 5, c => five.add(lines(c.map(i => g5[i])).size));
        const six = new Set();
        combos(16, 6, c => {
          const L = lines(c.map(i => g4[i]));
          if ([...L.values()].some(s => s.size === 4)) six.add(L.size);
        });
        return [[...five], [...six]];
      },
    },
  ],
});
