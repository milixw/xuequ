'use strict';

// 上海数学六年级下册 · 8.2 圆锥及其侧面展开图
// 知识范围：圆锥（直角三角形绕一条直角边所在直线旋转一周）、顶点、底面、侧面、高、母线；
//   侧面展开图是扇形（半径 = 母线，弧长 = 底面周长，n = 360r/l）；S侧 = ½Cl = πrl，S表 = πrl + πr²，V = ⅓S底·h（实验得到）
// 可以使用 8.1（圆柱）、第 5～7 章、6 上全部内容（一元一次方程等），以及小学的三角形面积
// 还没学：勾股定理（8 上），所以高、母线、半径要题目直接给足，不能互相推算；相似三角形（9 上），所以不出圆台、倒圆锥容器里水深变化

const FIG82 = {
  // 直角梯形 ABCD：AD∥BC，∠B=90°，AD=3，BC=6，AB=4，CD=5（每厘米 30 像素）
  trapezoid: (() => {
    const k = 30, x0 = 60, y0 = 160;
    const P = (x, y) => [x0 + x * k, y0 - y * k];
    const A = P(0, 4), B = P(0, 0), C = P(6, 0), D = P(3, 4);
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 190" width="300" height="190" font-family="Times New Roman, serif">';
    s += `<polygon points="${[A, B, C, D].map(p => p.join(',')).join(' ')}" fill="#eef3fb" stroke="#2b2b2b" stroke-width="2"/>`;
    s += `<polyline points="${B[0]},${B[1] - 10} ${B[0] + 10},${B[1] - 10} ${B[0] + 10},${B[1]}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
    const lab = (t, p, dx, dy) => `<text x="${p[0] + dx}" y="${p[1] + dy}" font-size="16" font-style="italic" fill="#2b2b2b">${t}</text>`;
    s += lab('A', A, -16, 0) + lab('B', B, -16, 14) + lab('C', C, 4, 14) + lab('D', D, 2, -4);
    const num = (t, x, y) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="13" fill="#2b2b2b">${t}</text>`;
    s += num('3', (A[0] + D[0]) / 2, A[1] - 6) + num('6', (B[0] + C[0]) / 2, B[1] + 18) + num('4', A[0] - 12, (A[1] + B[1]) / 2 + 4) + num('5', (C[0] + D[0]) / 2 + 12, (C[1] + D[1]) / 2);
    return s + '</svg>';
  })(),
  // △ABC：BC=14，高 AD=12，BD=5，DC=9，AB=13，AC=15（每厘米 14 像素）
  triangle: (() => {
    const k = 14, x0 = 50, y0 = 190;
    const P = (x, y) => [x0 + x * k, y0 - y * k];
    const A = P(5, 12), B = P(0, 0), C = P(14, 0), D = P(5, 0);
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" width="300" height="220" font-family="Times New Roman, serif">';
    s += `<polygon points="${[A, B, C].map(p => p.join(',')).join(' ')}" fill="#eef3fb" stroke="#2b2b2b" stroke-width="2"/>`;
    s += `<line x1="${A[0]}" y1="${A[1]}" x2="${D[0]}" y2="${D[1]}" stroke="#2b2b2b" stroke-width="1.4" stroke-dasharray="5 3"/>`;
    s += `<polyline points="${D[0]},${D[1] - 9} ${D[0] + 9},${D[1] - 9} ${D[0] + 9},${D[1]}" fill="none" stroke="#2b2b2b" stroke-width="1.2"/>`;
    const lab = (t, p, dx, dy) => `<text x="${p[0] + dx}" y="${p[1] + dy}" font-size="16" font-style="italic" fill="#2b2b2b">${t}</text>`;
    s += lab('A', A, -5, -6) + lab('B', B, -14, 14) + lab('C', C, 4, 14) + lab('D', D, -5, 17);
    const num = (t, x, y) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="13" fill="#2b2b2b">${t}</text>`;
    s += num('13', (A[0] + B[0]) / 2 - 12, (A[1] + B[1]) / 2) + num('15', (A[0] + C[0]) / 2 + 12, (A[1] + C[1]) / 2) + num('12', A[0] + 12, (A[1] + D[1]) / 2);
    s += num('5', (B[0] + D[0]) / 2, B[1] + 17) + num('9', (D[0] + C[0]) / 2, B[1] + 17);
    return s + '</svg>';
  })(),
};

Content.section({
  id: 'math/sh2024/g6s2/8.2',
  title: '圆锥及其侧面展开图',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮指出 c01 只有 4 级、扩展档缺 4～5 级且 e03/e04 同为组合体、e01 与 b09/c02 同为倒水、c04 第 3 空计数有歧义；第 2 轮 c01 加上底为 x 的含参问，e01 换成弧长相同的三堆粮食，e03 换成圆心角范围与整数条件计数，c04 改为“一共贴几次”，判定整节通过' },

  intro: [
    {
      title: '圆锥是怎样形成的',
      body: '把一个直角三角形绕它的一条直角边所在的直线旋转一周，得到的立体图形叫**圆锥**。另一条直角边转出圆形的**底面**，斜边转出**侧面**；顶点到底面圆心的距离是**高**，顶点和底面圆上任意一点的连线是**母线**，母线有无数条，长度都相等。',
      example: '两条直角边 5 cm、12 cm，斜边 13 cm 的直角三角形，绕 12 cm 的边旋转：高 12 cm，底面半径 5 cm，母线 13 cm。',
      pitfall: '高是顶点到底面圆心的距离，母线是顶点到底面圆周的距离，两者不相等。',
    },
    {
      title: '侧面展开图',
      body: '沿一条母线剪开侧面、铺平，得到一个**扇形**：扇形的半径是母线长 $l$，扇形的弧长是底面周长 $2\\pi r$。由 $\\frac{n\\pi l}{180}=2\\pi r$ 得圆心角 $n=360\\times\\frac{r}{l}$。',
      example: '底面半径 3 cm、母线 15 cm 的圆锥，展开图圆心角 $360^\\circ\\times\\frac{3}{15}=72^\\circ$。',
    },
    {
      title: '侧面积和表面积',
      body: '侧面积就是展开的扇形面积：$S_{\\text{侧}}=\\frac12Cl=\\pi rl$。表面积再加一个底面：$S_{\\text{表}}=\\pi rl+\\pi r^2$。',
      example: '接着上一个圆锥：侧面积 $\\pi\\times3\\times15=45\\pi$（cm²），表面积 $45\\pi+9\\pi=54\\pi$（cm²）。',
      pitfall: '侧面积用的是母线，不是高。',
    },
    {
      title: '圆锥的体积',
      body: '用装满沙子的圆锥往和它等底等高的圆柱里倒，倒三次正好倒满。所以圆锥的体积 $V=\\frac13S_{\\text{底}}h=\\frac13\\pi r^2h$。',
      example: '底面半径 2 cm、高 6 cm 的圆锥：$V=\\frac13\\times\\pi\\times4\\times6=8\\pi$（cm³）。',
      pitfall: '“圆锥体积是圆柱的 $\\frac13$”只对等底等高的圆柱和圆锥成立；体积公式里用的是高，不是母线。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '8.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 圆锥有无数条母线，它们的长都相等；② 圆锥的体积是圆柱体积的 $\\frac13$；③ 直角三角形绕它的斜边所在的直线旋转一周，得到一个圆锥；④ 圆锥的侧面展开图是扇形，扇形的半径等于圆锥的底面半径；⑤ 等底等高的圆柱和圆锥，体积之差是圆锥体积的 2 倍。其中正确的有',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 1,
      explain: [
        '① 对。',
        '② 错：要等底等高才成立。',
        '③ 错：绕斜边转，得到的是两个底面重合的圆锥拼成的立体图形，不是一个圆锥。',
        '④ 错：扇形的半径是圆锥的母线，扇形的弧长才和底面有关（等于底面周长）。',
        '⑤ 对：圆柱体积是圆锥的 3 倍，相差 $3-1=2$ 倍。',
        '正确的是 ①⑤，共 2 个。',
      ],
      verify: () => [true, false, false, false, 3 - 1 === 2].filter(Boolean).length - 1,
    },
    {
      id: '8.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '一个圆锥的底面直径是 8 cm，母线长 12 cm。它的侧面展开图的圆心角是多少度？',
      blanks: [{ kind: 'num', answer: '120', suffix: '°' }],
      explain: [
        '底面半径 4 cm，展开图的弧长 = 底面周长 $8\\pi$ cm。',
        '由 $\\frac{n\\pi\\times12}{180}=8\\pi$，得 $n=120$。也可以直接用 $n=360\\times\\frac{r}{l}=360\\times\\frac{4}{12}=120$。',
        '常见错误：把直径 8 当半径，算出 $240^\\circ$。',
      ],
      verify: () => F(360).mul(4).div(12),
    },
    {
      id: '8.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '一堆圆锥形的沙子，底面周长 18.84 m，高 1.2 m。把这些沙子铺在一条宽 10 m 的路上，铺 2 cm 厚，能铺多少米长（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '56.52', suffix: 'm' }],
      explain: [
        '底面半径 $18.84\\div3.14\\div2=3$（m）。沙堆体积 $\\frac13\\times3.14\\times3^2\\times1.2=11.304$（m³）。',
        '铺成的路是长方体，厚 2 cm = 0.02 m。长 $=11.304\\div(10\\times0.02)=56.52$（m）。',
        '常见错误：忘了乘 $\\frac13$（得 169.56）；或者厚度没有换成米。',
      ],
      verify: () => {
        const r = F('18.84').div(F('3.14').mul(2));
        const V = F('3.14').mul(r).mul(r).mul('1.2').div(3);
        return V.div(F(10).mul('0.02'));
      },
    },
    {
      id: '8.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '一个圆锥形的亭子屋顶，底面直径 10 m，母线长 7 m。在屋顶外面铺一层油毡，需要油毡多少平方米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '109.9', suffix: 'm²' }],
      explain: [
        '屋顶只要铺侧面，不包括底面。底面半径 5 m。',
        '$S_{\\text{侧}}=\\pi rl=3.14\\times5\\times7=109.9$（m²）。',
        '常见错误：加上了底面（得 188.4）；或者用直径 10 去乘（得 219.8）。',
      ],
      verify: () => F('3.14').mul(5).mul(7),
    },
    {
      id: '8.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '一个直角三角形的两条直角边分别是 6 cm 和 8 cm，斜边是 10 cm。以 6 cm 的直角边所在的直线为轴旋转一周，得到一个圆锥（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 圆锥的体积是', answer: '128π', suffix: 'cm³' },
        { kind: 'real', label: '(2) 圆锥的表面积是', answer: '144π', suffix: 'cm²' },
      ],
      explain: [
        '绕 6 cm 的边转，6 cm 是高，8 cm 是底面半径，斜边 10 cm 是母线。',
        '(1) $V=\\frac13\\times\\pi\\times8^2\\times6=128\\pi$（cm³）。',
        '(2) $S_{\\text{表}}=\\pi\\times8\\times10+\\pi\\times8^2=80\\pi+64\\pi=144\\pi$（cm²）。',
        '常见错误：把 6 当成半径（体积 $96\\pi$）；或者侧面积用高 6 代替母线。',
      ],
      verify: () => [Math.PI * 64 * 6 / 3, Math.PI * 8 * 10 + Math.PI * 64],
    },
    {
      id: '8.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '从一张半径 12 cm 的圆形纸片上剪去一个圆心角为 $210^\\circ$ 的扇形，用剩下的扇形围成一个圆锥的侧面（接缝处不重叠）。这个圆锥的底面半径是多少厘米？',
      blanks: [{ kind: 'num', answer: '5', suffix: 'cm' }],
      explain: [
        '剩下的扇形圆心角 $360^\\circ-210^\\circ=150^\\circ$，半径 12 cm，就是圆锥的母线。',
        '弧长 $\\frac{150\\times\\pi\\times12}{180}=10\\pi$，等于底面周长 $2\\pi r$，所以 $r=5$ cm。',
        '常见错误：用剪去的 $210^\\circ$ 计算，得到 7 cm。',
      ],
      verify: () => F(360 - 210).mul(12).div(180).div(2),
    },
    {
      id: '8.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '把一个圆柱形木料削成一个最大的圆锥，削去部分的体积是 24 cm³。削成的圆锥的体积是多少立方厘米？',
      blanks: [{ kind: 'num', answer: '12', suffix: 'cm³' }],
      explain: [
        '削成的最大圆锥和圆柱等底等高，圆锥体积是圆柱的 $\\frac13$，削去的是圆柱的 $\\frac23$，也就是圆锥的 2 倍。',
        '圆锥体积 $=24\\div2=12$（cm³）。',
        '常见错误：以为削去的是圆锥的 3 倍（得 8），或者把 24 当成圆柱的体积。',
      ],
      verify: () => {
        const cyl = F(24).div(F(2).div(3));
        return cyl.div(3);
      },
    },
    {
      id: '8.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '一个圆锥形容器装满了水，把水全部倒进一个和它等底等高的圆柱形容器里，水深 5 cm。这个圆柱形容器的高是多少厘米？',
      blanks: [{ kind: 'num', answer: '15', suffix: 'cm' }],
      explain: [
        '等底等高时，圆锥的容积是圆柱的 $\\frac13$。倒进圆柱的水占圆柱的 $\\frac13$，水深是圆柱高的 $\\frac13$。',
        '圆柱高 $=5\\times3=15$（cm）。',
        '常见错误：以为水深是高的 3 倍，得到 $\\frac53$ cm。',
      ],
      verify: () => F(5).div(F(1).div(3)),
    },
    {
      id: '8.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '一个圆柱形量杯的内部底面半径是 5 cm，里面有水。把一个底面半径 3 cm 的圆锥形铅锤完全浸没在水中，水面上升了 0.6 cm（水没有溢出）。这个铅锤的高是多少厘米？',
      blanks: [{ kind: 'num', answer: '5', suffix: 'cm' }],
      explain: [
        '铅锤的体积 = 上升的水的体积 $=\\pi\\times5^2\\times0.6=15\\pi$（cm³）。',
        '由 $\\frac13\\times\\pi\\times3^2\\times h=15\\pi$，得 $3h=15$，$h=5$ cm。',
        '常见错误：忘了 $\\frac13$，算出 $\\frac53$ cm。',
      ],
      verify: () => F(25).mul('0.6').mul(3).div(9),
    },

    // ---------- 扩展 ----------
    {
      id: '8.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '粮站把同一种稻谷堆成三堆，每堆都是圆锥的一部分，高都是 0.6 m：甲堆在空地上，是一个完整的圆锥；乙堆紧靠一面墙，是半个圆锥；丙堆在两面互相垂直的墙的墙角，是四分之一个圆锥。量得三堆靠地面的弧线长度都是 6.28 m（$\\pi$ 取 3.14）。',
      blanks: [
        { kind: 'num', label: '(1) 乙堆稻谷的体积是', answer: '1.256', suffix: 'm³' },
        { kind: 'num', label: '(2) 丙堆稻谷的体积是', answer: '2.512', suffix: 'm³' },
        { kind: 'num', label: '(3) 丙堆的体积是甲堆的几倍？', answer: '4', suffix: '倍' },
      ],
      explain: [
        '量到的弧线只是底面圆周的一部分，要先分别求出底面半径。',
        '甲：整个圆周 $2\\times3.14\\times r=6.28$，$r=1$ m。乙：半个圆周 $3.14\\times r=6.28$，$r=2$ m。丙：四分之一个圆周 $\\frac12\\times3.14\\times r=6.28$，$r=4$ m。',
        '(1) 乙的体积是整个圆锥的一半：$\\frac12\\times\\frac13\\times3.14\\times2^2\\times0.6=1.256$（m³）。',
        '(2) 丙的体积是整个圆锥的四分之一：$\\frac14\\times\\frac13\\times3.14\\times4^2\\times0.6=2.512$（m³）。',
        '(3) 甲的体积 $\\frac13\\times3.14\\times1^2\\times0.6=0.628$（m³），$2.512\\div0.628=4$。弧长相同时，堆在墙角的半径最大，半径要乘两次，所以反而最多。',
        '常见错误：把 6.28 m 都当成整个底面周长，三堆都按半径 1 m 算；或者算出半径后忘了只取一半、四分之一。',
      ],
      verify: () => {
        const pi = F('3.14'), arc = F('6.28'), h = F('0.6');
        const heap = part => {
          const r = arc.div(pi.mul(2).mul(part));
          return pi.mul(r).mul(r).mul(h).div(3).mul(part);
        };
        return [heap(F(1).div(2)), heap(F(1).div(4)), heap(F(1).div(4)).div(heap(F(1)))];
      },
    },
    {
      id: '8.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '把一张半径 12 cm 的圆形纸片剪成两个扇形，圆心角之比是 $1:2$，分别围成两个圆锥的侧面（接缝处不重叠，没有底面）。',
      blanks: [
        { kind: 'nums', label: '(1) 两个圆锥的底面半径分别是多少厘米（用逗号隔开）？', answer: ['4', '8'], suffix: 'cm' },
        { kind: 'real', label: '(2) 两个圆锥的侧面积之和是', answer: '144π', suffix: 'cm²' },
        { kind: 'num', label: '(3) 如果改为剪成圆心角之比为 $1:2:3$ 的三个扇形，围成三个圆锥，它们的底面半径之和是', answer: '12', suffix: 'cm' },
      ],
      explain: [
        '(1) 两个扇形的圆心角是 $120^\\circ$ 和 $240^\\circ$，母线都是 12 cm。由 $r=l\\times\\frac{n}{360}$，底面半径 $12\\times\\frac13=4$（cm）、$12\\times\\frac23=8$（cm）。',
        '(2) 侧面积之和就是整张圆形纸片的面积 $\\pi\\times12^2=144\\pi$（cm²）。也可以分别算：$\\pi\\times4\\times12+\\pi\\times8\\times12=48\\pi+96\\pi=144\\pi$。',
        '(3) 每个圆锥的底面周长等于它的扇形弧长，所有弧长加起来是整个圆的周长 $24\\pi$。所以底面周长之和 $2\\pi(r_1+r_2+r_3)=24\\pi$，底面半径之和 = 12 cm，就是纸片的半径，和怎么分无关。',
      ],
      verify: () => {
        const r = n => F(12).mul(n).div(360);
        const three = [60, 120, 180].map(r).reduce((a, b) => a.add(b));
        return [[r(120), r(240)], Math.PI * (4 * 12 + 8 * 12), three];
      },
    },
    {
      id: '8.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '用半径 10 cm 的扇形纸片围成圆锥的侧面（接缝处不重叠）。要求围成的圆锥底面半径不小于 3 cm、不大于 6 cm（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'num', label: '(1) 扇形的圆心角最小是', answer: '108', suffix: '°' },
        { kind: 'num', label: '　 最大是', answer: '216', suffix: '°' },
        { kind: 'real', label: '(2) 圆锥的侧面积最大是', answer: '60π', suffix: 'cm²' },
        { kind: 'num', label: '(3) 如果扇形的圆心角是整数度，并且侧面积是 $\\pi$ cm² 的整数倍，符合要求的圆心角有几种？', answer: '7', suffix: '种' },
      ],
      explain: [
        '母线就是扇形半径 10 cm。圆心角 $n=360\\times\\frac{r}{10}=36r$，侧面积 $\\pi r\\times10=10\\pi r$，都跟着底面半径 $r$ 变。',
        '(1) $r=3$ 时 $n=108^\\circ$，$r=6$ 时 $n=216^\\circ$。$r$ 越大圆心角越大，所以圆心角在 $108^\\circ$～$216^\\circ$ 之间。',
        '(2) 侧面积 $10\\pi r$ 在 $r=6$ 时最大，是 $60\\pi$ cm²。',
        '(3) 侧面积 $10\\pi r$ 是 $\\pi$ 的整数倍，要 $10r$ 是整数；而 $r=\\frac{n}{36}$，$10r=\\frac{10n}{36}=\\frac{5n}{18}$。5 和 18 没有公因数，所以 $n$ 要是 18 的倍数。',
        '108 到 216 之间 18 的倍数：108、126、144、162、180、198、216，共 7 种（两端都能取到）。',
        '常见错误：只看圆心角是整数，得到 109 种；或者以为 $r$ 要是整数，只得到 4 种。',
      ],
      verify: () => {
        const ns = [];
        let lo = null, hi = null;
        for (let n = 1; n < 360; n++) {
          const r = F(n).div(36);
          if (r.cmp(3) < 0 || r.cmp(6) > 0) continue;
          if (lo === null) lo = n;
          hi = n;
          if (r.mul(10).d === 1n) ns.push(n);
        }
        return [lo, hi, Math.PI * 10 * 6, ns.length];
      },
    },
    {
      id: '8.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '一个圆柱形木块底面半径 6 cm、高 16 cm。从它的上、下两个底面各挖去一个圆锥：两个圆锥的底面分别就是圆柱的上、下底面，顶点都在圆柱高的中点，圆锥的母线长 10 cm（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 剩下部分的表面积是', answer: '312π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 剩下部分的体积是', answer: '384π', suffix: 'cm³' },
      ],
      explain: [
        '每个圆锥的高是 $16\\div2=8$（cm），底面半径 6 cm，母线 10 cm。',
        '(1) 挖去后，上、下两个底面都没有了，换成了两个圆锥的侧面；圆柱的侧面还在。',
        '表面积 $=2\\pi\\times6\\times16+2\\times\\pi\\times6\\times10=192\\pi+120\\pi=312\\pi$（cm²）。',
        '(2) 体积 $=\\pi\\times6^2\\times16-2\\times\\frac13\\times\\pi\\times6^2\\times8=576\\pi-192\\pi=384\\pi$（cm³）。',
        '常见错误：表面积还保留了两个底面；或者以为挖掉东西表面积一定变小。这里 $312\\pi$ 比原来的 $192\\pi+72\\pi=264\\pi$ 还大。',
      ],
      verify: () => [Math.PI * (2 * 6 * 16 + 2 * 6 * 10), Math.PI * (36 * 16 - 2 * 36 * 8 / 3)],
    },
    {
      id: '8.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '改变一个圆锥的底面半径和高。',
      blanks: [
        { kind: 'num', label: '(1) 底面半径增加 10%，高减少 20%，体积减少了', answer: '3.2', suffix: '%' },
        { kind: 'num', label: '(2) 底面半径减少 20%，要使体积不变，高要增加', answer: '56.25', suffix: '%' },
      ],
      explain: [
        '体积 $\\frac13\\pi r^2h$ 里，半径乘了两次，高乘了一次。',
        '(1) 新体积是原来的 $1.1\\times1.1\\times0.8=0.968$，即 96.8%，减少了 3.2%。',
        '常见错误：以为 $+10\\%$ 和 $-20\\%$ 合起来是 $-10\\%$；或者半径只乘一次，得到减少 12%。',
        '(2) 底面积变为原来的 $0.8\\times0.8=0.64$。体积不变，高要变为原来的 $1\\div0.64=1.5625$ 倍，增加 56.25%。',
        '常见错误：以为高增加 20% 或 40% 就行。',
      ],
      verify: () => [F(1).sub(F('1.1').mul('1.1').mul('0.8')).mul(100), F(1).div(F('0.8').mul('0.8')).sub(1).mul(100)],
    },
    {
      id: '8.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '用一张半径 20 cm、圆心角 $216^\\circ$ 的扇形纸片围一个圆锥形纸帽（没有底面）。围的时候两条半径不是对齐，而是重叠粘贴，粘贴部分是一个小扇形（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'num', label: '(1) 如果粘贴部分的圆心角是 $36^\\circ$，纸帽的底面半径是', answer: '10', suffix: 'cm' },
        { kind: 'real', label: '　 纸帽的侧面积（露在外面的部分）是', answer: '200π', suffix: 'cm²' },
        { kind: 'num', label: '(2) 如果要围成底面半径 11 cm 的纸帽，粘贴部分的圆心角是', answer: '18', suffix: '°' },
      ],
      explain: [
        '粘贴的部分被压在下面，真正围成侧面的只有 $216^\\circ-$ 粘贴部分的圆心角。母线还是 20 cm。',
        '(1) 围成侧面的扇形圆心角 $216^\\circ-36^\\circ=180^\\circ$，底面半径 $r=20\\times\\frac{180}{360}=10$（cm）。',
        '侧面积 $\\pi\\times10\\times20=200\\pi$（cm²），比整张纸片的 $\\frac{216}{360}\\times400\\pi=240\\pi$ 少了粘贴的 $40\\pi$。',
        '(2) 底面半径 11 cm，围成侧面的扇形圆心角 $n=360\\times\\frac{11}{20}=198^\\circ$，粘贴部分 $216^\\circ-198^\\circ=18^\\circ$。',
        '常见错误：用 $216^\\circ$ 直接算，得到半径 12 cm。',
      ],
      verify: () => {
        const r = F(20).mul(216 - 36).div(360);
        return [r, Math.PI * Number(r.n) / Number(r.d) * 20, F(216).sub(F(360).mul(11).div(20))];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '8.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，直角梯形 $ABCD$ 中，$AD\\parallel BC$，$\\angle B=90^\\circ$，$AD=3$ cm，$BC=6$ cm，$AB=4$ cm，$CD=5$ cm。分别以 $BC$、$AD$ 所在的直线为轴，把梯形旋转一周（结果保留 $\\pi$）。',
      figure: FIG82.trapezoid,
      blanks: [
        { kind: 'real', label: '(1) 以 $BC$ 为轴，得到的立体图形的体积是', answer: '64π', suffix: 'cm³' },
        { kind: 'real', label: '　 表面积是', answer: '60π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 以 $AD$ 为轴，得到的立体图形的体积是', answer: '80π', suffix: 'cm³' },
        { kind: 'real', label: '　 表面积是', answer: '84π', suffix: 'cm²' },
        { kind: 'num', label: '(3) 如果 $BC=6$ cm、$AB=4$ cm、$\\angle B=90^\\circ$ 不变，把上底 $AD$ 改为 $x$ cm（$0<x<6$，图中是 $x=3$ 的情形），以 $AD$ 为轴与以 $BC$ 为轴得到的体积之比是 $3:2$，那么 $x$ 是', answer: '1.5', suffix: 'cm' },
      ],
      explain: [
        '先把梯形分块看：过 $D$ 作 $DE\\perp BC$ 于 $E$，得到长方形 $ABED$（$BE=3$，$DE=4$）和直角三角形 $DEC$（$EC=3$，$DE=4$，$DC=5$）。再看每一块绕轴转出什么。',
        '(1) 以 $BC$ 为轴：长方形 $ABED$ 转出圆柱（半径 4、高 3），三角形 $DEC$ 绕直角边 $EC$ 转出圆锥（半径 4、高 3、母线 5），两者底面贴在一起。',
        '体积 $\\pi\\times16\\times3+\\frac13\\times\\pi\\times16\\times3=48\\pi+16\\pi=64\\pi$（cm³）。表面由 $AB$、$AD$、$DC$ 转出：圆柱底面 $16\\pi$ + 圆柱侧面 $2\\pi\\times4\\times3=24\\pi$ + 圆锥侧面 $\\pi\\times4\\times5=20\\pi$，共 $60\\pi$（cm²）。',
        '(2) 以 $AD$ 为轴：梯形在 $AD$ 的下方。把它补成长方形 $ABCF$（$F$ 在 $AD$ 的延长线上，$AF=6$），梯形 = 长方形 $ABCF$ − 三角形 $DFC$。',
        '长方形绕 $AF$ 转出圆柱（半径 4、高 6）；三角形 $DFC$ 绕直角边 $DF$ 转出圆锥（半径 $FC=4$、高 $DF=3$、母线 5），而且这个圆锥正好在圆柱里面。所以立体图形 = 圆柱挖去一个圆锥（从 $F$ 那一端挖进去）。',
        '体积 $\\pi\\times16\\times6-\\frac13\\times\\pi\\times16\\times3=96\\pi-16\\pi=80\\pi$（cm³）。',
        '表面由 $AB$、$BC$、$CD$ 转出：$AB$ 转出底面 $16\\pi$，$BC$ 转出圆柱侧面 $2\\pi\\times4\\times6=48\\pi$，$CD$ 转出凹进去的圆锥侧面 $20\\pi$，共 $84\\pi$（cm²）。另一端的底面被挖掉了，不要算。',
        '同一个梯形，换一条轴，一个是“圆柱加圆锥”，一个是“圆柱减圆锥”。',
        '(3) 上底为 $x$ 时，按同样的分法，三角形部分那条直角边长 $6-x$（算体积用不到 $CD$）。以 $BC$ 为轴：$16\\pi x+\\frac13\\times16\\pi(6-x)=\\frac{16\\pi(2x+6)}{3}$；以 $AD$ 为轴：$16\\pi\\times6-\\frac13\\times16\\pi(6-x)=\\frac{16\\pi(12+x)}{3}$。',
        '由 $(12+x):(2x+6)=3:2$，得 $2(12+x)=3(2x+6)$，$24+2x=6x+18$，$x=1.5$。检验 $0<1.5<6$，符合。',
      ],
      verify: () => {
        const cyl = (r, h) => r * r * h, cone = (r, h) => r * r * h / 3;
        return [
          Math.PI * (cyl(4, 3) + cone(4, 3)), Math.PI * (16 + 2 * 4 * 3 + 4 * 5),
          Math.PI * (cyl(4, 6) - cone(4, 3)), Math.PI * (16 + 2 * 4 * 6 + 4 * 5),
          (() => {
            const vBC = x => F(16).mul(x).add(F(16).mul(F(6).sub(x)).div(3));
            const vAD = x => F(16).mul(6).sub(F(16).mul(F(6).sub(x)).div(3));
            for (let k = 1; k < 600; k++) { const x = F(k).div(100); if (vAD(x).mul(2).eq(vBC(x).mul(3))) return x; }
            return null;
          })(),
        ];
      },
    },
    {
      id: '8.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '一个水塔的储水部分，下部是尖朝下的圆锥，高 6 m；上部是圆柱，高 8 m；两部分的底面半径相同。水塔空着时，只开进水管，30 分钟可以注满；水塔满时，只开底部的出水管，45 分钟可以放空（进水、出水的速度都不变）。',
      blanks: [
        { kind: 'num', label: '(1) 水塔空着时只开进水管，15 分钟后水面离圆锥尖的高度是', answer: '9', suffix: 'm' },
        { kind: 'num', label: '(2) 水塔空着时同时打开进水管和出水管，水面离圆锥尖 10 m 时，经过了', answer: '54', suffix: '分钟' },
      ],
      explain: [
        '底面积不知道，设为 $S$。圆锥部分的容积 $\\frac13S\\times6=2S$，圆柱部分 $8S$，一共 $10S$。圆锥部分只占 $\\frac15$。',
        '(1) 进水管每分钟进 $10S\\div30=\\frac{S}{3}$。注满圆锥部分要 $2S\\div\\frac S3=6$（分钟）。',
        '15 分钟比 6 分钟多，说明水已经漫过圆锥部分、进入圆柱部分（如果还在圆锥里，就要用到还没学的知识，这里正好不用）。再过 $15-6=9$ 分钟，进水 $3S$，在圆柱部分水深 $3S\\div S=3$（m）。水面离圆锥尖 $6+3=9$（m）。',
        '常见错误：按高度平均分配，以为 15 分钟是一半时间，水面就在 $14\\div2=7$ m 处。圆锥部分“下窄上宽”，同样的高度装的水少。',
        '(2) 出水管每分钟出 $10S\\div45=\\frac{2S}{9}$，同时开时每分钟净进 $\\frac S3-\\frac{2S}{9}=\\frac S9$。',
        '水面离圆锥尖 10 m 时，水的体积 = 圆锥部分 $2S$ + 圆柱部分 $4S=6S$，要 $6S\\div\\frac S9=54$（分钟）。',
      ],
      verify: () => {
        const cone = F(6).div(3), cyl = F(8), total = cone.add(cyl);
        const inRate = total.div(30), outRate = total.div(45);
        const t1 = cone.div(inRate);
        const h1 = F(6).add(F(15).sub(t1).mul(inRate));
        const t2 = cone.add(F(10 - 6)).div(inRate.sub(outRate));
        return [h1, t2];
      },
    },
    {
      id: '8.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '研究圆锥的底面积占表面积的比和侧面展开图的圆心角之间的关系（结果保留 $\\pi$ 的地方保留 $\\pi$）。',
      blanks: [
        { kind: 'num', label: '(1) 侧面展开图的圆心角是 $90^\\circ$ 时，底面积占表面积的', answer: '20', suffix: '%' },
        { kind: 'num', label: '(2) 底面积占表面积的 40% 时，侧面展开图的圆心角是', answer: '240', suffix: '°' },
        { kind: 'num', label: '(3) 侧面展开图的圆心角是 $144^\\circ$，表面积是 $56\\pi$ cm² 时，母线长', answer: '10', suffix: 'cm' },
      ],
      explain: [
        '关键：圆心角 $n$ 决定了底面半径和母线的比。由 $n=360\\times\\frac rl$，得 $r:l=n:360$。',
        '底面积 $\\pi r^2$，表面积 $\\pi rl+\\pi r^2=\\pi r(l+r)$，底面积占表面积 $\\frac{\\pi r^2}{\\pi r(l+r)}=\\frac{r}{l+r}$。',
        '把 $r:l=n:360$ 代进去，底面积占表面积 $\\frac{n}{360+n}$，只和圆心角有关，和圆锥大小无关。',
        '(1) $n=90$：$\\frac{90}{450}=20\\%$。',
        '(2) $\\frac{n}{360+n}=\\frac25$，$5n=720+2n$，$n=240$。',
        '(3) $r:l=144:360=2:5$，设 $r=2k$，$l=5k$。表面积 $\\pi\\times2k\\times5k+\\pi\\times(2k)^2=14\\pi k^2=56\\pi$，$k^2=4$，$k=2$。',
        '所以 $r=4$ cm，母线 $l=10$ cm。',
      ],
      verify: () => {
        const frac = n => F(n).div(360 + n);
        let n2 = null;
        for (let n = 1; n < 360; n++) if (frac(n).eq(F(2).div(5))) n2 = n;
        let l3 = null;
        for (let r = 1; r < 50; r++) {
          const l = F(r).mul(360).div(144);
          if (F(r).mul(l).add(r * r).eq(56)) l3 = l;
        }
        return [frac(90).mul(100), n2, l3];
      },
    },
    {
      id: '8.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一个圆锥的母线长 12 cm，底面半径 5 cm。把它侧面着地放在桌面上，让它绕顶点 $P$ 在桌面上滚动（不打滑，$P$ 不动）。开始时，母线 $PA$ 贴在桌面上。滚动时，侧面的母线一条接一条地贴到桌面上。',
      blanks: [
        { kind: 'num', label: '(1) 圆锥侧面展开图的圆心角是', answer: '150', suffix: '°' },
        { kind: 'num', label: '(2) 母线 $PA$ 第一次重新贴回桌面上开始时的那条线上，这时圆锥绕 $P$ 滚了几圈？', answer: '5', suffix: '圈' },
        { kind: 'num', label: '　 从开始到这时，$PA$ 一共贴到桌面上几次（不算开始时，算上回到原线的这一次）？', answer: '12', suffix: '次' },
        { kind: 'num', label: '(3) 如果底面半径还是 5 cm，母线长是 11～19 cm 之间的整数，要使圆锥绕 $P$ 滚一圈时 $PA$ 正好回到开始的那条线上，母线长是', answer: '15', suffix: 'cm' },
      ],
      explain: [
        '(1) $n=360\\times\\frac{5}{12}=150^\\circ$。',
        '关键：圆锥滚动时，侧面在桌面上“印”出来的正是它的侧面展开图。底面圆周在桌面上沿着以 $P$ 为圆心、半径 12 cm 的圆滚动。',
        '所以桌面上与圆锥接触的线每绕 $P$ 转过 $150^\\circ$，底面圆周就滚过一整圈，$PA$ 就贴回桌面一次。',
        '(2) $PA$ 贴桌面的位置依次在 $150^\\circ$、$300^\\circ$、$450^\\circ$…… 处。要回到开始的那条线上，转过的角度既要是 150 的倍数，又要是 360 的倍数。',
        '150 和 360 的最小公倍数是 1800，$1800\\div360=5$，绕 $P$ 滚了 5 圈。$1800\\div150=12$，$PA$ 一共贴到桌面 12 次。',
        '注意区分：“绕 $P$ 滚了 5 圈”说的是桌面上的接触线绕 $P$ 转了 5 圈，和 $PA$ 贴桌面的 12 次不是一回事。',
        '(3) 滚一圈（$360^\\circ$）正好回到开始的那条线上，要 360 是圆心角 $n$ 的整数倍，即 $\\frac{360}{n}=\\frac{l}{r}=\\frac{l}{5}$ 是整数，$l$ 是 5 的倍数。11～19 之间只有 15。',
        '常见错误：以为滚一圈 $PA$ 就回来了；或者把 $PA$ 贴桌面的 12 次当成绕 $P$ 滚的圈数。',
      ],
      verify: () => {
        const n = F(360).mul(5).div(12);
        let deg = n;
        let times = 1;
        while (deg.div(360).d !== 1n) { deg = deg.add(n); times++; }
        const ls = [];
        for (let l = 11; l <= 19; l++) if (F(l).div(5).d === 1n) ls.push(l);
        return [n, deg.div(360), times, ls.length === 1 ? ls[0] : null];
      },
    },
    {
      id: '8.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$\\triangle ABC$ 中，$BC=14$ cm，$AB=13$ cm，$AC=15$ cm，$AD\\perp BC$ 于 $D$，$AD=12$ cm，$BD=5$ cm，$DC=9$ cm。三角形的三个角都小于 $90^\\circ$。把三角形分别绕它的三条边所在的直线旋转一周（结果保留 $\\pi$）。',
      figure: FIG82.triangle,
      blanks: [
        { kind: 'real', label: '(1) 绕 $BC$ 旋转，得到的立体图形的体积是', answer: '672π', suffix: 'cm³' },
        { kind: 'real', label: '　 表面积是', answer: '336π', suffix: 'cm²' },
        { kind: 'ratio', label: '(2) 绕 $AB$ 旋转与绕 $AC$ 旋转，得到的体积之比是', answer: '15:13' },
        { kind: 'text', label: '(3) 绕哪条边旋转，得到的体积最大？', options: ['AB', 'BC', 'AC'], answer: 'AB' },
      ],
      explain: [
        '(1) 绕 $BC$ 转：$\\triangle ABD$ 绕 $BD$ 转出一个圆锥，$\\triangle ACD$ 绕 $DC$ 转出一个圆锥，两个圆锥的底面都是半径 $AD=12$ 的圆，贴在一起。',
        '体积 $\\frac13\\pi\\times12^2\\times5+\\frac13\\pi\\times12^2\\times9=\\frac13\\pi\\times144\\times14=672\\pi$（cm³）。两个高加起来正好是 $BC$。',
        '表面积是两个圆锥的侧面积：$\\pi\\times12\\times13+\\pi\\times12\\times15=156\\pi+180\\pi=336\\pi$（cm²）。',
        '(2) 推广：绕任意一条边 $a$ 旋转，都是两个圆锥，公共底面的半径是这条边上的高 $h$，两个圆锥的高加起来是 $a$，体积 $\\frac13\\pi h^2a$。',
        '三角形面积 $S=\\frac12\\times14\\times12=84$（cm²）不变，$h=\\frac{2S}{a}$，所以体积 $=\\frac13\\pi\\times\\frac{2S}{a}\\times\\frac{2S}{a}\\times a=\\frac{4\\pi S^2}{3a}$：体积和边长成反比。',
        '绕 $AB$（13）与绕 $AC$（15）的体积之比 $=\\frac1{13}:\\frac1{15}=15:13$。',
        '(3) 边越短体积越大，$AB=13$ 最短，所以绕 $AB$ 旋转体积最大。直觉上“绕长边转、转出来更长”，其实短边上的高更大，而高要乘两次。',
      ],
      verify: () => {
        const S = F(14 * 12).div(2);
        const vol = a => S.mul(2).div(a).mul(S.mul(2).div(a)).mul(a).div(3); // 除去 π
        const vBC = F(144).mul(5).div(3).add(F(144).mul(9).div(3));
        const g = vol(13).div(vol(15));
        const sides = { AB: 13, BC: 14, AC: 15 };
        const best = Object.keys(sides).reduce((x, y) => (vol(sides[x]).cmp(vol(sides[y])) >= 0 ? x : y));
        return [Number(vBC.n) / Number(vBC.d) * Math.PI, Math.PI * (12 * 13 + 12 * 15), [g.mul(13), 13], best];
      },
    },
  ],
});
