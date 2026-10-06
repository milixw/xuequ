'use strict';

// 上海数学七年级下册 · 17.1 三角形的有关概念
// 知识范围：三角形及其顶点、边、内角；公理“三角形任意两边的和大于第三边”（三角不等式），推出任意两边的差小于第三边；
//   按角分类（锐角、直角、钝角三角形，直角边、斜边）；等腰三角形、等边三角形、等腰直角三角形的定义；
//   三角形的高、中线、角平分线（三条中线、三条角平分线交于形内一点；三条高所在直线交于一点，锐角在内、直角在直角顶点、钝角在外）；中线把三角形分成面积相等的两部分
// 可以使用：第 15、16 章（不等式、相交线与平行线）；六年级、七年级上册全部；小学的三角形面积公式
// 还没学：三角形内角和（17.2，本节不能用“内角和 180°”）；全等；等腰三角形的性质（18.1）；勾股定理（八年级）
// 本节约定：长度单位相同时省略单位

const SVG171 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  seg: (a, b, dash = false) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, [x, y], dx = 0, dy = 0) => `<text x="${(x + dx).toFixed(1)}" y="${(y + dy + 5).toFixed(1)}" text-anchor="middle">${t}</text>`,
  tri: pts => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`,
  // 点 p 在直线 ab 上的垂足
  foot: (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
    return [a[0] + t * dx, a[1] + t * dy];
  },
  right: (p, d1, d2, s = 9) => {
    // 在 p 处沿两个单位方向画直角记号
    const a = [p[0] + d1[0] * s, p[1] + d1[1] * s], b = [p[0] + d2[0] * s, p[1] + d2[1] * s], c = [p[0] + (d1[0] + d2[0]) * s, p[1] + (d1[1] + d2[1]) * s];
    return `<polyline points="${a.map(v => v.toFixed(1))} ${c.map(v => v.toFixed(1))} ${b.map(v => v.toFixed(1))}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
  },
};

const FIG171 = (() => {
  const S = SVG171, out = {};
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [dx / l, dy / l]; };
  // b04：钝角三角形 ABC（∠B 是钝角），AD⊥CB 的延长线于 D，BE⊥AC 于 E，CF⊥AB 的延长线于 F
  {
    const B = [120, 140], C = [275, 140], A = [80, 30];
    const D = S.foot(A, B, C), E = S.foot(B, A, C), Fp = S.foot(C, A, B);
    out.b04 = S.wrap(300, 215, S.tri([A, B, C]) + S.seg(D, B, true) + S.seg(A, D) + S.seg(B, E) + S.seg(Fp, B, true) + S.seg(C, Fp)
      + S.right(D, unit(D, C), unit(D, A)) + S.right(E, unit(E, C), unit(E, B)) + S.right(Fp, unit(Fp, C), unit(Fp, A))
      + S.text('A', A, -6, -12) + S.text('B', B, 4, 14) + S.text('C', C, 10, 6) + S.text('D', D, -6, 14) + S.text('E', E, 10, -10) + S.text('F', Fp, -12, 0));
  }
  // b05：AD 是中线，E 是 AD 的中点
  {
    const A = [120, 30], B = [30, 160], C = [270, 160], D = [150, 160], E = [135, 95];
    out.b05 = S.wrap(300, 185, S.tri([A, B, C]) + S.seg(A, D) + S.seg(B, E) + S.seg(C, E)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14) + S.text('E', E, -12, -4));
  }
  // e03：D 在 BC 上，BD=2DC，E 是 AD 的中点
  {
    const A = [100, 30], B = [30, 160], C = [270, 160], D = [190, 160], E = [145, 95];
    out.e03 = S.wrap(300, 185, S.tri([A, B, C]) + S.seg(A, D) + S.seg(B, E) + S.seg(C, E)
      + S.text('A', A, 0, -14) + S.text('B', B, -10, 6) + S.text('C', C, 10, 6) + S.text('D', D, 0, 14) + S.text('E', E, -12, -4));
  }
  // c03：△ABC 各边延长：D 在 BC 延长线上，E 在 CA 延长线上，F 在 AB 延长线上
  {
    const k = 30, o = [100, 140];
    const P = ([x, y]) => [o[0] + x * k, o[1] - y * k];
    const A = P([0, 0]), B = P([1, 0]), C = P([0, 1]), D = P([-1, 2]), E = P([0, -2]), Fp = P([4, 0]);
    out.c03 = S.wrap(300, 225, `<polygon points="${[D, E, Fp].map(p => p.join(',')).join(' ')}" fill="#cfe3f7" fill-opacity="0.5" stroke="#2b2b2b" stroke-width="1.4"/>`
      + S.tri([A, B, C]) + S.seg(C, D) + S.seg(A, E) + S.seg(B, Fp)
      + S.text('A', A, -10, 4) + S.text('B', B, 2, 12) + S.text('C', C, 10, -4) + S.text('D', D, -8, -10) + S.text('E', E, -10, 6) + S.text('F', Fp, 10, 4));
  }
  return out;
})();

// verify 用：三条边能否组成三角形
const isTri171 = (a, b, c) => a + b > c && b + c > a && c + a > b;

Content.section({
  id: 'math/sh2024/g7s2/17.1',
  title: '三角形的有关概念',
  review: { status: 'pending' },
  audit: { blind: '2026-10-06', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。本节在内角和之前，题目只用三边关系、分类、高中线角平分线和面积。第 1 轮 c04（由周长立刻得 b，只剩一个不等式）只有 3～4 级，c01（周长 24 计数）与 e04（最长边为 6 计数）同方法；第 2 轮原 c01 下放为 e04，新 c01 改为四根木棒按可组成的取法数求 x 的范围，新 c04 改为 a+c=2b、周长不超过 30 的计数与最值，c02 补充两端能任意接近的说明后判定整节通过。可选意见：扩展档仍无 5 级题' },

  intro: [
    {
      title: '三角形',
      body: '不在同一直线上的三点用线段两两连接而成的图形叫作三角形，记作 $\\triangle ABC$。三个点是顶点，三条线段是边，顶点处两边组成的角是内角。顶点 $A$、$B$、$C$ 所对的边通常记作 $a$、$b$、$c$。',
      example: '在 $\\triangle ABC$ 中，$\\angle A$ 的对边是 $BC$，记作 $a$。',
    },
    {
      title: '三角不等式',
      body: '**公理**：三角形任意两边的和大于第三边。由不等式的性质推出：任意两边的差小于第三边。判断三条线段能否组成三角形，只要看**较短的两条之和是否大于最长的一条**。',
      example: '$4$、$5$、$10$：$4+5=9<10$，不能组成三角形；$4$、$5$、$8$：$4+5>8$，能组成三角形。',
      pitfall: '两边之和**等于**第三边时也不能组成三角形（三个点在同一直线上）。',
    },
    {
      title: '三角形的分类',
      body: '按角分：三个角都是锐角的是**锐角三角形**，有一个直角的是**直角三角形**（直角的两边叫直角边，直角所对的边叫斜边），有一个钝角的是**钝角三角形**。按边：有两边相等的是**等腰三角形**，三边都相等的是**等边三角形**。',
      example: '有 $45^\\circ$ 角的三角尺是等腰直角三角形：既是等腰三角形，又是直角三角形。',
    },
    {
      title: '高、中线、角平分线',
      body: '从一个顶点向对边**所在直线**作垂线，顶点和垂足之间的线段是高；连接顶点和对边中点的线段是中线；一个内角的平分线与对边相交，顶点和交点之间的线段是角平分线。三条中线、三条角平分线都交于三角形内一点；三条高所在直线交于一点：锐角三角形在内部，直角三角形在直角顶点，钝角三角形在外部。',
      example: '钝角三角形中，钝角两边上的高都落在三角形外面，要先把对边延长。',
    },
    {
      title: '中线平分面积',
      body: '三角形的一条中线把三角形分成两个三角形：它们的底相等（中线把对边平分），高相同（都是从同一个顶点到对边所在直线的距离），所以面积相等。更一般地，**高相同时，面积的比等于底的比**。',
      example: '$AD$ 是 $\\triangle ABC$ 的中线，$\\triangle ABC$ 的面积是 $10$，则 $\\triangle ABD$、$\\triangle ACD$ 的面积都是 $5$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '17.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列长度的三条线段，能组成三角形的是（　　）',
      options: ['$3$、$4$、$7$', '$2$、$5$、$8$', '$6$、$7$、$12$', '$5$、$5$、$11$'],
      answer: 2,
      explain: [
        '看较短的两条之和是否大于最长的一条。',
        'A：$3+4=7$，等于第三边，不能。B：$2+5=7<8$，不能。D：$5+5=10<11$，不能。',
        'C：$6+7=13>12$，能。选 C。坑：A 中“和等于第三边”也不行，三个点会在同一直线上。',
      ],
      verify: () => {
        const sets = [[3, 4, 7], [2, 5, 8], [6, 7, 12], [5, 5, 11]];
        const ok = sets.map(s => isTri171(...s));
        return ok.indexOf(true) === ok.lastIndexOf(true) ? ok.indexOf(true) : -1;
      },
    },
    {
      id: '17.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '三角形的两边长分别为 $3$ 和 $8$，第三边长为 $x$。求 $x$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '', answer: '5<x<11' },
      ],
      explain: [
        '第三边大于另两边的差：$x>8-3=5$；小于另两边的和：$x<8+3=11$。',
        '所以 $5<x<11$。',
        '坑：两端都不能取等号；只写 $x<11$ 会漏掉“差小于第三边”这一边。',
      ],
      verify: () => {
        const ok = [];
        for (let k = 0; k <= 60; k++) { const x = k / 4; if (isTri171(3, 8, x)) ok.push(x); }
        return ok[0] === 5.25 && ok[ok.length - 1] === 10.75 ? '5<x<11' : null;
      },
    },
    {
      id: '17.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '一个等腰三角形的两边长分别为 $4$ 和 $9$。求它的周长。',
      blanks: [
        { kind: 'num', label: '周长', answer: '22' },
      ],
      explain: [
        '等腰三角形有两边相等，相等的两边可能都是 $4$，也可能都是 $9$。',
        '若三边为 $4$、$4$、$9$：$4+4=8<9$，不能组成三角形，舍去。',
        '若三边为 $9$、$9$、$4$：$9+4>9$，能组成三角形，周长 $9+9+4=22$。坑：不检验三边关系，会多出周长 $17$。',
      ],
      verify: () => [[4, 4, 9], [9, 9, 4]].filter(s => isTri171(...s)).map(s => s[0] + s[1] + s[2])[0],
    },
    {
      id: '17.1-b04',
      level: 'basic',
      type: 'choice',
      stem: '如图，在钝角三角形 $ABC$ 中，$\\angle ABC$ 是钝角，$AD\\perp CB$ 的延长线于 $D$，$BE\\perp AC$ 于 $E$，$CF\\perp AB$ 的延长线于 $F$。$\\triangle ABC$ 中 $BC$ 边上的高是（　　）',
      figure: FIG171.b04,
      options: ['线段 $BE$', '线段 $AD$', '线段 $CF$', '线段 $AB$'],
      answer: 1,
      explain: [
        '$BC$ 边上的高，是从 $BC$ 所对的顶点 $A$ 向 $BC$ **所在直线**作的垂线段。',
        '$\\angle ABC$ 是钝角，垂足 $D$ 落在 $CB$ 的延长线上，$AD$ 就是 $BC$ 边上的高。选 B。',
        '$BE$ 是 $AC$ 边上的高，$CF$ 是 $AB$ 边上的高。坑：高不一定在三角形内部，钝角三角形中钝角两边上的高都在外面。',
      ],
    },
    {
      id: '17.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图，$AD$ 是 $\\triangle ABC$ 的中线，$E$ 是 $AD$ 的中点，$\\triangle ABC$ 的面积为 $16$。求 $\\triangle BEC$ 的面积。',
      figure: FIG171.b05,
      blanks: [
        { kind: 'num', label: '', answer: '8' },
      ],
      explain: [
        '$AD$ 是中线：$S_{\\triangle ABD}=S_{\\triangle ACD}=8$。',
        '$E$ 是 $AD$ 的中点，$BE$ 是 $\\triangle ABD$ 的中线：$S_{\\triangle BED}=4$；同理 $CE$ 是 $\\triangle ACD$ 的中线，$S_{\\triangle CED}=4$。',
        '$S_{\\triangle BEC}=S_{\\triangle BED}+S_{\\triangle CED}=8$。坑：只算了一半，答成 $4$。',
      ],
      verify: () => {
        // 坐标：B(0,0)，C(4,0)，A(1,8)，面积 16
        const area = (p, q, r) => F(Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]))).div(2);
        const A = [1, 8], B = [0, 0], C = [4, 0], D = [2, 0], E = [(A[0] + D[0]) / 2, (A[1] + D[1]) / 2];
        return area(A, B, C).eq(16) ? area(B, E, C) : null;
      },
    },
    {
      id: '17.1-b06',
      level: 'basic',
      type: 'choice',
      stem: '下列说法中正确的是（　　）',
      options: ['三角形的三条高都在三角形内部', '直角三角形只有一条高', '三角形的三条中线、三条角平分线都在三角形内部', '等边三角形不是等腰三角形'],
      answer: 2,
      explain: [
        'A：钝角三角形有两条高在外部，错误。',
        'B：直角三角形的两条直角边互为对方边上的高，加上斜边上的高，共三条，错误。',
        'C：中线连接顶点和对边中点，角平分线连接顶点和对边上一点，都在三角形内部，正确。',
        'D：等边三角形有两边相等，是特殊的等腰三角形，错误。选 C。坑：B 忘了直角边本身就是高。',
      ],
    },
    {
      id: '17.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '三角形的两边长为 $2$ 和 $7$，第三边长是偶数。求这个三角形的周长（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '周长', answer: ['15', '17'] },
      ],
      explain: [
        '第三边 $x$ 满足 $7-2<x<7+2$，即 $5<x<9$。',
        '其中的偶数是 $6$、$8$。周长分别为 $2+7+6=15$，$2+7+8=17$。',
        '坑：漏掉一个偶数，或把端点 $5$、$9$ 算进去。',
      ],
      verify: () => [6, 8, 4, 10, 2].filter(x => isTri171(2, 7, x)).map(x => 9 + x),
    },
    {
      id: '17.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=8$，$AC=5$，$AD$ 是 $BC$ 边上的中线。求 $\\triangle ABD$ 与 $\\triangle ACD$ 的周长之差。',
      blanks: [
        { kind: 'num', label: '', answer: '3' },
      ],
      explain: [
        '$\\triangle ABD$ 的周长 $=AB+BD+AD$，$\\triangle ACD$ 的周长 $=AC+CD+AD$。',
        '中线平分 $BC$：$BD=CD$；$AD$ 是公共边。两者相减，$BD$ 与 $CD$、$AD$ 与 $AD$ 都抵消。',
        '周长之差 $=AB-AC=8-5=3$。坑：以为不知道 $BC$ 和 $AD$ 就求不出来。',
      ],
      verify: () => 8 - 5,
    },
    {
      id: '17.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '用一根长 $16$ cm 的铁丝围成一个三边长都是整厘米数的等腰三角形，共有几种不同的形状？',
      blanks: [
        { kind: 'num', label: '', answer: '3', suffix: '种' },
      ],
      explain: [
        '设腰长为 $a$，底边长为 $16-2a$（都是正整数）。',
        '底边为正：$16-2a>0$，$a<8$；三边关系：两腰之和大于底边，$2a>16-2a$，$a>4$。',
        '所以 $a=5$、$6$、$7$，三边为 $5,5,6$；$6,6,4$；$7,7,2$，共 $3$ 种。坑：只要求底边为正，会把 $a=1$～$4$ 也算进去。',
      ],
      verify: () => {
        let n = 0;
        for (let a = 1; a < 16; a++) { const b = 16 - 2 * a; if (b > 0 && isTri171(a, a, b)) n++; }
        return n;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '17.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $a$、$b$、$c$ 是 $\\triangle ABC$ 的三边长，化简 $|a+b-c|-|a-b-c|$。',
      blanks: [
        { kind: 'expr', label: '', answer: '2a-2c', simplified: true },
      ],
      explain: [
        '由三边关系，$a+b>c$，所以 $a+b-c>0$，$|a+b-c|=a+b-c$。',
        '$b+c>a$，所以 $a-b-c<0$，$|a-b-c|=-(a-b-c)=-a+b+c$。',
        '原式 $=(a+b-c)-(-a+b+c)=2a-2c$。转弯：用三角不等式判断绝对值里式子的正负，再去绝对值。',
      ],
      verify: () => {
        const r = [];
        for (const [a, b, c] of [[3, 4, 5], [5, 4, 3], [6, 6, 2], [2, 6, 7]]) if (isTri171(a, b, c)) r.push(Math.abs(a + b - c) - Math.abs(a - b - c) === 2 * a - 2 * c);
        return r.every(Boolean) ? '2a-2c' : null;
      },
    },
    {
      id: '17.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '等腰三角形 $ABC$ 中，$AB=AC$，腰 $AC$ 上的中线 $BD$ 把它的周长分成 $15$ 和 $12$ 两部分。求底边 $BC$ 的长（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$BC=$', answer: ['7', '11'] },
      ],
      explain: [
        '设腰长 $AB=AC=x$，底 $BC=y$。$D$ 是 $AC$ 的中点，两部分分别是 $AB+AD=x+\\frac x2$ 和 $DC+BC=\\frac x2+y$。哪部分是 $15$ 不确定，要分两种情况。',
        '① $\\frac32x=15$，$\\frac x2+y=12$：$x=10$，$y=7$。三边 $10,10,7$ 能组成三角形。',
        '② $\\frac32x=12$，$\\frac x2+y=15$：$x=8$，$y=11$。三边 $8,8,11$：$8+8>11$，能组成三角形。',
        '所以底边长为 $7$ 或 $11$。转弯：分情况列方程后，都要用三边关系检验。',
      ],
      verify: () => {
        const r = [];
        for (const [p, q] of [[15, 12], [12, 15]]) { const x = (p * 2) / 3, y = q - x / 2; if (y > 0 && isTri171(x, x, y)) r.push(y); }
        return r;
      },
    },
    {
      id: '17.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，点 $D$ 在 $\\triangle ABC$ 的边 $BC$ 上，$BD=2DC$，$E$ 是 $AD$ 的中点，$\\triangle ABC$ 的面积为 $18$。求 $\\triangle BEC$ 和 $\\triangle ABE$ 的面积。',
      figure: FIG171.e03,
      blanks: [
        { kind: 'num', label: '$S_{\\triangle BEC}=$', answer: '9' },
        { kind: 'num', label: '$S_{\\triangle ABE}=$', answer: '6' },
      ],
      explain: [
        '$\\triangle ABD$ 与 $\\triangle ACD$ 的高相同（都是 $A$ 到 $BC$ 的距离），面积比等于底的比 $2:1$：$S_{\\triangle ABD}=12$，$S_{\\triangle ACD}=6$。',
        '$E$ 是 $AD$ 的中点：$S_{\\triangle ABE}=S_{\\triangle BED}=6$，$S_{\\triangle ACE}=S_{\\triangle CED}=3$。',
        '$S_{\\triangle BEC}=S_{\\triangle BED}+S_{\\triangle CED}=6+3=9$。',
        '转弯：两次用“高相同，面积比等于底的比”，第一次以 $BC$ 上的线段为底，第二次以 $AD$ 上的线段为底。',
      ],
      verify: () => {
        const area = (p, q, r) => F(Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]))).div(2);
        const A = [1, 12], B = [0, 0], C = [3, 0], D = [2, 0], E = [1.5, 6];
        return area(A, B, C).eq(18) ? [area(B, E, C), area(A, B, E)] : null;
      },
    },
    {
      id: '17.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '三边长都是正整数、周长为 $24$ 的三角形共有多少个？其中等腰三角形（含等边三角形）有多少个？（三边长分别相同的算同一个）',
      blanks: [
        { kind: 'num', label: '共', answer: '12', suffix: '个' },
        { kind: 'num', label: '等腰三角形', answer: '5', suffix: '个' },
      ],
      explain: [
        '设三边 $a\\leq b\\leq c$，$a+b+c=24$。先定最长边 $c$ 的范围：三边关系 $a+b>c$，即 $24-c>c$，$c<12$；又 $c$ 最大，$3c\\geq24$，$c\\geq8$。所以 $c=8,9,10,11$。',
        '对每个 $c$，$a+b=24-c$，且 $a\\leq b\\leq c$：$c=8$，$a+b=16$，只有 $(8,8)$，$1$ 个；$c=9$，$a+b=15$，$(6,9)(7,8)$，$2$ 个；$c=10$，$a+b=14$，$(4,10)(5,9)(6,8)(7,7)$，$4$ 个；$c=11$，$a+b=13$，$(2,11)(3,10)(4,9)(5,8)(6,7)$，$5$ 个。',
        '共 $1+2+4+5=12$ 个。',
        '等腰的：$(8,8,8)$、$(6,9,9)$、$(4,10,10)$、$(7,7,10)$、$(2,11,11)$，共 $5$ 个。',
        '思路：先用三边关系和“最长边”两头夹出 $c$ 的范围，再按 $c$ 分类、按大小顺序列举，保证不重不漏。',
      ],
      verify: () => {
        let n = 0, iso = 0;
        for (let a = 1; a <= 24; a++) for (let b = a; b <= 24; b++) {
          const c = 24 - a - b;
          if (c < b || !isTri171(a, b, c)) continue;
          n++;
          if (a === b || b === c) iso++;
        }
        return [n, iso];
      },
    },
    {
      id: '17.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '一个三角形的三边长分别为 $4$、$5$、$6$，求这三边上的高之比（按边 $4$、$5$、$6$ 上的高的顺序，写成最简整数比）。',
      blanks: [
        { kind: 'ratio', label: '', answer: '15:12:10' },
      ],
      explain: [
        '同一个三角形的面积 $S$ 有三种算法：$S=\\frac12\\times4h_1=\\frac12\\times5h_2=\\frac12\\times6h_3$。',
        '所以 $h_1=\\frac{2S}{4}$，$h_2=\\frac{2S}{5}$，$h_3=\\frac{2S}{6}$，$h_1:h_2:h_3=\\frac14:\\frac15:\\frac16$。',
        '乘以 $60$ 化成整数比：$15:12:10$。转弯：边越长，它上面的高越短，高的比是边的倒数之比。',
      ],
      verify: () => {
        const h = [4, 5, 6].map(x => F(1).div(x)), k = h.map(x => x.mul(60));
        return k.map(x => Number(x.n));
      },
    },
    {
      id: '17.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '在 $\\triangle ABC$ 中，$AB=5$，$AC=7$，$BC=6$，点 $P$ 在三角形内部。求 $PB+PC$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '', answer: '6', suffix: '$<PB+PC<$' },
        { kind: 'num', label: '', answer: '12' },
      ],
      explain: [
        '下界：在 $\\triangle PBC$ 中，$PB+PC>BC=6$。',
        '上界：延长 $BP$ 交 $AC$ 于点 $Q$。在 $\\triangle ABQ$ 中，$AB+AQ>BQ=BP+PQ$；在 $\\triangle PQC$ 中，$PQ+QC>PC$。',
        '两式相加：$AB+AQ+PQ+QC>BP+PQ+PC$，消去 $PQ$，又 $AQ+QC=AC$，得 $AB+AC>PB+PC$，即 $PB+PC<12$。',
        '$P$ 靠近 $BC$ 中点时 $PB+PC$ 接近 $6$，靠近 $A$ 时接近 $12$，两端都取不到。所以 $6<PB+PC<12$。转弯：上界要添辅助线（延长 $BP$），把 $PB+PC$ 放进两个三角形里，用两次三角不等式。',
      ],
      verify: () => {
        // 坐标：B(0,0)，C(6,0)，A 满足 AB=5、AC=7：x=(25−49+36)/12=1，y=√24
        const A = [1, Math.sqrt(24)], B = [0, 0], C = [6, 0];
        let lo = Infinity, hi = -Infinity;
        for (let i = 1; i < 60; i++) for (let j = 1; j < 60; j++) {
          const u = i / 60, v = j / 60;
          if (u + v >= 1) continue;
          const P = [A[0] + u * (B[0] - A[0]) + v * (C[0] - A[0]), A[1] + u * (B[1] - A[1]) + v * (C[1] - A[1])];
          const s = Math.hypot(P[0] - B[0], P[1] - B[1]) + Math.hypot(P[0] - C[0], P[1] - C[1]);
          lo = Math.min(lo, s); hi = Math.max(hi, s);
        }
        return lo > 6 && hi < 12 && lo < 6.2 && hi > 11.6 ? [6, 12] : null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '17.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '有四根木棒，长度分别为 $3$、$5$、$7$、$x$。(1) 若从中任取三根都能组成三角形，求 $x$ 的取值范围；(2) 若从中任取三根，能组成三角形的取法恰好有 $2$ 种，求 $x$ 的取值范围。',
      blanks: [
        { kind: 'ineq', label: '(1)', answer: '4<x<8' },
        { kind: 'ineq', label: '(2)', answer: '10<=x<12' },
      ],
      explain: [
        '四根中取三根有 $4$ 种取法：$\\{3,5,7\\}$ 与三种含 $x$ 的取法。$\\{3,5,7\\}$：$3+5>7$，总能组成三角形。',
        '含 $x$ 的三种分别要求：$\\{3,5,x\\}$：$2<x<8$；$\\{3,7,x\\}$：$4<x<10$；$\\{5,7,x\\}$：$2<x<12$。',
        '(1) 四种都能组成，三个条件同时成立，取公共部分：$4<x<8$。',
        '(2) 恰好 $2$ 种，除了 $\\{3,5,7\\}$ 外，含 $x$ 的三种里恰好有 $1$ 种成立。在数轴上画出三个范围 $(2,8)$、$(4,10)$、$(2,12)$，数每一段被几个范围盖住：$2<x\\leq4$ 被 $2$ 个盖住，$4<x<8$ 被 $3$ 个，$8\\leq x<10$ 被 $2$ 个，$10\\leq x<12$ 只被 $1$ 个，其余没有被盖住。',
        '所以 $10\\leq x<12$。端点检验：$x=10$ 时 $3+7=10$，$\\{3,7,10\\}$ 不能组成，只有 $\\{5,7,10\\}$ 能，恰好 $2$ 种；$x=12$ 时 $5+7=12$，一种也不能，只剩 $\\{3,5,7\\}$。',
        '思路：把每种取法翻译成一个关于 $x$ 的不等式组，再在数轴上数“重叠的层数”，端点要逐个检验。',
      ],
      verify: () => {
        const isT = (a, b, c) => a + b > c && b + c > a && c + a > b;
        const cnt = x => [isT(3, 5, 7), isT(3, 5, x), isT(3, 7, x), isT(5, 7, x)].filter(Boolean).length;
        const xs = [];
        for (let k = 1; k <= 64; k++) xs.push(k / 4);
        const all = xs.filter(x => cnt(x) === 4), two = xs.filter(x => cnt(x) === 2);
        return [all[0] === 4.25 && all[all.length - 1] === 7.75 ? '4<x<8' : null, two[0] === 10 && two[two.length - 1] === 11.75 && two.length === 8 ? '10<=x<12' : null];
      },
    },
    {
      id: '17.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '四边形 $ABCD$ 的对角线 $AC$、$BD$ 相交于点 $O$，四边形的周长为 $20$。求 $AC+BD$ 的取值范围。',
      blanks: [
        { kind: 'num', label: '', answer: '10', suffix: '$<AC+BD<$' },
        { kind: 'num', label: '', answer: '20' },
      ],
      explain: [
        '下界：在 $\\triangle AOB$、$\\triangle BOC$、$\\triangle COD$、$\\triangle DOA$ 中分别用三角不等式：$OA+OB>AB$，$OB+OC>BC$，$OC+OD>CD$，$OD+OA>DA$。',
        '四式相加：$2(OA+OB+OC+OD)>AB+BC+CD+DA=20$。而 $OA+OC=AC$，$OB+OD=BD$，所以 $2(AC+BD)>20$，$AC+BD>10$。',
        '上界：在 $\\triangle ABC$ 中 $AC<AB+BC$，在 $\\triangle ADC$ 中 $AC<AD+DC$，相加得 $2AC<20$，$AC<10$；同理 $BD<10$。所以 $AC+BD<20$。',
        '两端都取不到，但都能任意接近：把四边形压扁成很扁的菱形（一条对角线接近 $0$，另一条接近边长的 $2$ 倍即周长的一半），$AC+BD$ 接近 $10$；让 $A$、$B$ 非常接近，$C$、$D$ 也非常接近，两条对角线都接近周长的一半，$AC+BD$ 接近 $20$。所以 $10<AC+BD<20$。思路：下界把对角线拆成四段放进四个小三角形，上界把每条对角线放进两个大三角形，两次都是“若干个三角不等式相加”。',
      ],
      verify: () => {
        // 随机取凸四边形（顶点在圆周上按顺序），缩放到周长 20，检查 AC+BD 的范围
        let lo = Infinity, hi = -Infinity;
        const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
        for (let i = 0; i < 400; i++) {
          const t = [0, 1, 2, 3].map(k => k * 1.5 + ((i * (k + 3) * 0.37) % 1.4));
          const P = t.map(a => [Math.cos(a), Math.sin(a)]);
          const per = d(P[0], P[1]) + d(P[1], P[2]) + d(P[2], P[3]) + d(P[3], P[0]);
          const s = ((d(P[0], P[2]) + d(P[1], P[3])) * 20) / per;
          lo = Math.min(lo, s); hi = Math.max(hi, s);
        }
        return lo > 10 && hi < 20 ? [10, 20] : null;
      },
    },
    {
      id: '17.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 的面积为 $1$。延长 $BC$ 到 $D$，使 $CD=BC$；延长 $CA$ 到 $E$，使 $AE=2CA$；延长 $AB$ 到 $F$，使 $BF=3AB$。求 $\\triangle DEF$ 的面积。',
      figure: FIG171.c03,
      blanks: [
        { kind: 'num', label: '', answer: '18' },
      ],
      explain: [
        '思路：连接 $AD$、$BE$、$CF$，把 $\\triangle DEF$ 分成 $\\triangle ABC$ 和三个“角上”的三角形 $\\triangle AEF$、$\\triangle BFD$、$\\triangle CDE$，每块都用“高相同，面积比等于底的比”求。',
        '$\\triangle CDE$：连接 $AD$。$\\triangle ACD$ 与 $\\triangle ABC$ 底 $CD=BC$、高相同，面积 $1$。$\\triangle ADE$ 与 $\\triangle ACD$ 以 $AE$、$AC$ 为底（同一直线上），高相同，$AE=2AC$，面积 $2$。所以 $S_{\\triangle CDE}=1+2=3$。',
        '$\\triangle AEF$：连接 $BE$。$\\triangle ABE$ 与 $\\triangle ABC$ 底 $AE=2AC$，面积 $2$；$\\triangle BEF$ 与 $\\triangle ABE$ 底 $BF=3AB$，面积 $6$。所以 $S_{\\triangle AEF}=2+6=8$。',
        '$\\triangle BFD$：连接 $CF$。$\\triangle BCF$ 与 $\\triangle ABC$ 底 $BF=3AB$，面积 $3$；$\\triangle CDF$ 与 $\\triangle BCF$ 底 $CD=BC$，面积 $3$。所以 $S_{\\triangle BFD}=3+3=6$。',
        '$S_{\\triangle DEF}=1+3+8+6=18$。关键：每个角上的三角形都要再连一条线分成两块，第一块和 $\\triangle ABC$ 比，第二块和第一块比。',
      ],
      verify: () => {
        const area = (p, q, r) => F(Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]))).div(2);
        const A = [0, 0], B = [1, 0], C = [0, 2];  // 面积 1
        const D = [2 * C[0] - B[0], 2 * C[1] - B[1]], E = [3 * A[0] - 2 * C[0], 3 * A[1] - 2 * C[1]], Fp = [4 * B[0] - 3 * A[0], 4 * B[1] - 3 * A[1]];
        return area(A, B, C).eq(1) ? area(D, E, Fp) : null;
      },
    },
    {
      id: '17.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '$\\triangle ABC$ 的三边长 $a$、$b$、$c$ 都是正整数，$a>b>c$，$a+c=2b$，并且周长不超过 $30$。(1) 这样的三角形共有多少个？(2) 最长边与最短边之差 $a-c$ 的最大值是多少？',
      blanks: [
        { kind: 'num', label: '(1)', answer: '20', suffix: '个' },
        { kind: 'num', label: '(2)', answer: '8' },
      ],
      explain: [
        '$a+c=2b$ 说明 $b$ 正好在 $a$、$c$ 中间：设 $a=b+d$，$c=b-d$，$d$ 为正整数（$a>b>c$）。',
        '三边关系只需检验最长边：$b+c>a$，即 $b+(b-d)>b+d$，$b>2d$。（$c>0$ 由 $b>2d$ 自动满足。）周长 $a+b+c=3b\\leq30$，$b\\leq10$。',
        '对每个 $b$，$d$ 取满足 $1\\leq d<\\frac b2$ 的整数：$b=3,4$ 各 $1$ 个；$b=5,6$ 各 $2$ 个；$b=7,8$ 各 $3$ 个；$b=9,10$ 各 $4$ 个（$b=1,2$ 没有）。',
        '共 $2\\times(1+2+3+4)=20$ 个。',
        '(2) $a-c=2d$，$d<\\frac b2\\leq5$，$d$ 最大为 $4$（如 $b=9$ 时三边 $13,9,5$），$a-c$ 最大为 $8$。',
        '思路：用“中间那条边”和“公差”两个量表示三边，三边关系和周长条件就变成两个简单的不等式，再按 $b$ 分类计数。',
      ],
      verify: () => {
        let n = 0, best = 0;
        for (let a = 1; a <= 30; a++) for (let b = 1; b < a; b++) for (let c = 1; c < b; c++) {
          if (a + c !== 2 * b || a + b + c > 30 || !(b + c > a)) continue;
          n++; best = Math.max(best, a - c);
        }
        return [n, best];
      },
    },
    {
      id: '17.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '一个三角形有两条高的长分别为 $4$ 和 $12$，第三条高的长也是整数。求第三条高的最大值。',
      blanks: [
        { kind: 'num', label: '', answer: '5' },
      ],
      explain: [
        '设三角形面积为 $S$，三条高 $4$、$12$、$h$ 对应的边分别为 $\\frac{2S}{4}=\\frac S2$、$\\frac{2S}{12}=\\frac S6$、$\\frac{2S}{h}$。',
        '三边关系：第三边大于另两边之差、小于另两边之和：$\\frac S2-\\frac S6<\\frac{2S}{h}<\\frac S2+\\frac S6$。',
        '两边同除以正数 $S$：$\\frac13<\\frac2h<\\frac23$，即 $3<h<6$。',
        '$h$ 是整数，$h=4$ 或 $5$，最大值是 $5$。思路：高不能直接用三边关系，先用“面积相同”把高转化成边（边与高成反比），再用三角不等式。',
      ],
      verify: () => {
        let best = null;
        for (let h = 1; h <= 30; h++) { const S = 60; if (isTri171(S / 2, S / 6, (2 * S) / h)) best = h; }
        return best;
      },
    },
  ],
});
