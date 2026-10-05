'use strict';

// 上海数学七年级上册 · 14.1 平移
// 知识范围：图形的平移（方向、距离），对应点、对应线段、对应角；平移的性质——对应点之间的距离相等，连接对应点的线段平行（或在同一直线上）且相等，
//   对应线段平行（或在同一直线上）且相等，对应角相等，形状、大小不变；网格中的平移；平移的应用（化折为直、拼接、扫过的区域）
// 可以使用：六年级全部（数轴、线段与角、两点之间线段最短、方程与方程组、比）；第 10～13 章；小学的长方形、正方形、三角形、平行四边形、梯形面积
// 还没学：平行线的判定与性质、三角形内角和、全等三角形（七年级下册）；勾股定理、开平方（八年级上册）；平面直角坐标系（八年级下册）；旋转、轴对称、中心对称（14.2～14.4）
// 本节约定：网格中每个小方格的边长都是 1；长度不能靠勾股定理推算，斜线段的长度不出

// 配图工具：u 是每格的像素数，坐标以格为单位，y 轴向下
const SVG141 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  grid: (ox, oy, cols, rows, u) => {
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<line x1="${ox + i * u}" y1="${oy}" x2="${ox + i * u}" y2="${oy + rows * u}" stroke="#c8c8c8" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${ox}" y1="${oy + j * u}" x2="${ox + cols * u}" y2="${oy + j * u}" stroke="#c8c8c8" stroke-width="1"/>`;
    return s;
  },
  poly: (pts, ox, oy, u, fill = '#cfe3f7', dash = false) =>
    `<polygon points="${pts.map(([x, y]) => `${ox + x * u},${oy + y * u}`).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  line: (a, b, ox, oy, u, w = 1.6, dash = false) =>
    `<line x1="${ox + a[0] * u}" y1="${oy + a[1] * u}" x2="${ox + b[0] * u}" y2="${oy + b[1] * u}" stroke="#2b2b2b" stroke-width="${w}"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, x, y, opt = '') => `<text x="${x}" y="${y}" text-anchor="middle" ${opt}>${t}</text>`,
  dot: (x, y) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#2b2b2b"/>`,
};

// 多边形面积（鞋带公式），点用分数坐标，给 verify 用
const area141 = pts => {
  let s = F(0);
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length];
    s = s.add(F(p[0]).mul(q[1]).sub(F(q[0]).mul(p[1])));
  });
  return s.abs().div(2);
};
// 两个与网格对齐的长方形 [x1,x2]×[y1,y2] 的重叠面积
const overlap141 = (a, b) => {
  const lo = (p, q) => (F(p).cmp(q) > 0 ? F(p) : F(q));
  const hi = (p, q) => (F(p).cmp(q) < 0 ? F(p) : F(q));
  const dx = hi(a[1], b[1]).sub(lo(a[0], b[0]));
  const dy = hi(a[3], b[3]).sub(lo(a[2], b[2]));
  return dx.cmp(0) > 0 && dy.cmp(0) > 0 ? dx.mul(dy) : F(0);
};

const FIG141 = (() => {
  const S = SVG141;
  const u = 24;
  const out = {};

  // b02：三角形甲 (1,1)(1,4)(3,4)，乙 = 甲向右 5 格、向下 2 格
  {
    const ox = 16;
    const oy = 10;
    const jia = [[1, 1], [1, 4], [3, 4]];
    const yi = jia.map(([x, y]) => [x + 5, y + 2]);
    out.b02 = S.wrap(10 * u + 2 * ox, 7 * u + 2 * oy,
      S.grid(ox, oy, 10, 7, u) + S.poly(jia, ox, oy, u) + S.poly(yi, ox, oy, u, '#f6d8b8')
      + S.text('甲', ox + 1.7 * u, oy + 3.3 * u) + S.text('乙', ox + 6.7 * u, oy + 5.3 * u));
  }

  // b05：楼梯侧面，总高 2.4 m、总水平长 4.2 m，画 6 级
  {
    const ox = 40;
    const oy = 20;
    const W = 210;
    const H = 120;
    const n = 6;
    let pts = [[0, H]];
    for (let i = 0; i < n; i++) {
      pts.push([(W / n) * i, H - (H / n) * (i + 1)]);
      pts.push([(W / n) * (i + 1), H - (H / n) * (i + 1)]);
    }
    pts.push([W, H]);
    const poly = `<polygon points="${pts.map(([x, y]) => `${ox + x},${oy + y}`).join(' ')}" fill="#e8e8e8" stroke="#2b2b2b" stroke-width="1.6"/>`;
    out.b05 = S.wrap(W + 2 * ox, H + oy + 40, poly
      + `<line x1="${ox}" y1="${oy + H + 14}" x2="${ox + W}" y2="${oy + H + 14}" stroke="#2b2b2b" stroke-width="1"/>`
      + S.text('4.2 m', ox + W / 2, oy + H + 32)
      + `<line x1="${ox + W + 14}" y1="${oy}" x2="${ox + W + 14}" y2="${oy + H}" stroke="#2b2b2b" stroke-width="1"/>`
      + S.text('2.4 m', ox + W + 14, oy - 6));
  }

  // b06：AB=8，BC=40/3，BE=5，H 在 DE 上且 HE=5（DH=3），按每单位 12px 画
  {
    const k = 12;
    const ox = 30;
    const oy = 20;
    const P = (x, y) => [ox + x * k, oy + (8 - y) * k];
    const A = P(0, 8);
    const B = P(0, 0);
    const C = P(40 / 3, 0);
    const D = P(5, 8);
    const E = P(5, 0);
    const Fp = P(5 + 40 / 3, 0);
    const Hh = P(5, 5);
    const pt = p => p.join(',');
    out.b06 = S.wrap(Math.round(Fp[0] + 30), Math.round(B[1] + 30),
      `<polygon points="${pt(Hh)} ${pt(D)} ${pt(Fp)} ${pt(C)}" fill="#cfe3f7" stroke="none"/>`
      + `<polygon points="${pt(A)} ${pt(B)} ${pt(C)}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<polygon points="${pt(D)} ${pt(E)} ${pt(Fp)}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('A', A[0] - 10, A[1] + 4) + S.text('B', B[0] - 10, B[1] + 14) + S.text('C', C[0] + 2, C[1] + 16)
      + S.text('D', D[0], D[1] - 6) + S.text('E', E[0], E[1] + 16) + S.text('F', Fp[0] + 10, Fp[1] + 6)
      + S.text('H', Hh[0] + 12, Hh[1] - 2));
  }

  // b07：长方形草地 20×12，竖向斜路（水平宽 2）+ 横向直路（宽 1），每米 12px
  {
    const k = 12;
    const ox = 20;
    const oy = 16;
    const R = (x, y) => `${ox + x * k},${oy + y * k}`;
    out.b07 = S.wrap(20 * k + 2 * ox, 12 * k + oy + 34,
      `<rect x="${ox}" y="${oy}" width="${20 * k}" height="${12 * k}" fill="#d6ecc9" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<polygon points="${R(7, 0)} ${R(9, 0)} ${R(13, 12)} ${R(11, 12)}" fill="#f2f2f2" stroke="#2b2b2b" stroke-width="1.2"/>`
      + `<rect x="${ox}" y="${oy + 5 * k}" width="${20 * k}" height="${1 * k}" fill="#f2f2f2" stroke="#2b2b2b" stroke-width="1.2"/>`
      + S.text('20 m', ox + 10 * k, oy + 12 * k + 22) + `<text x="${ox}" y="${oy - 4}">12 m</text>`);
  }

  // e01：边长 4 的等边三角形分成 16 个小等边三角形，标出最上面的小三角形 ① 和最上面边长为 2 的三角形 ②（虚线）
  {
    const s = 56;
    const h = s * 0.866;
    const ox = 30;
    const oy = 20;
    const top = [ox + 2 * s, oy];
    const P = (r, c) => [top[0] - (r * s) / 2 + c * s, top[1] + r * h];  // 第 r 行第 c 个格点
    const pt = p => p.map(v => v.toFixed(1)).join(',');
    let lines = '';
    for (let r = 1; r <= 4; r++) lines += `<line x1="${pt(P(r, 0)).split(',')[0]}" y1="${P(r, 0)[1].toFixed(1)}" x2="${P(r, r)[0].toFixed(1)}" y2="${P(r, r)[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.3"/>`;
    for (let c = 0; c < 4; c++) {
      lines += `<line x1="${P(c, c)[0].toFixed(1)}" y1="${P(c, c)[1].toFixed(1)}" x2="${P(4, c)[0].toFixed(1)}" y2="${P(4, c)[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.3"/>`;
      lines += `<line x1="${P(c, 0)[0].toFixed(1)}" y1="${P(c, 0)[1].toFixed(1)}" x2="${P(4, 4 - c)[0].toFixed(1)}" y2="${P(4, 4 - c)[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.3"/>`;
    }
    out.e01 = S.wrap(4 * s + 2 * ox, Math.round(4 * h + oy + 20),
      `<polygon points="${pt(P(0, 0))} ${pt(P(1, 0))} ${pt(P(1, 1))}" fill="#cfe3f7"/>`
      + `<polygon points="${pt(P(0, 0))} ${pt(P(2, 0))} ${pt(P(2, 2))}" fill="none" stroke="#c0392b" stroke-width="2.2" stroke-dasharray="6 3"/>`
      + lines
      + S.text('①', P(0, 0)[0], P(1, 0)[1] - 8, 'font-size="13"')
      + `<text x="${(P(2, 0)[0] - 14).toFixed(1)}" y="${(P(1, 0)[1] + 6).toFixed(1)}" font-size="13" fill="#c0392b">②</text>`);
  }

  // e03：组合图形（单位：cm），每格 20px
  {
    const k = 20;
    const ox = 30;
    const oy = 20;
    const pts = [[0, 0], [4, 0], [4, 2], [6, 2], [6, 0], [7, 0], [7, 2], [9, 2], [9, 4], [10, 4], [10, 6], [0, 6]];
    out.e03 = S.wrap(10 * k + 2 * ox, 6 * k + oy + 40,
      S.poly(pts, ox, oy, k, '#e8e8e8')
      + S.text('10', ox + 5 * k, oy + 6 * k + 22) + S.text('6', ox - 14, oy + 3 * k + 5)
      + S.text('2', ox + 3.6 * k, oy + 1.2 * k, 'font-size="13"'));
  }

  // e04：线段 AB 平移到 A′B′，A(1,4) B(4,5) A′(2,1) B′(5,2)，网格 7×6
  {
    const ox = 20;
    const oy = 12;
    const A = [1, 4];
    const B = [4, 5];
    const A2 = [2, 1];
    const B2 = [5, 2];
    const at = ([x, y]) => [ox + x * u, oy + y * u];
    out.e04 = S.wrap(7 * u + 2 * ox, 6 * u + 2 * oy,
      S.grid(ox, oy, 7, 6, u) + S.line(A, B, ox, oy, u, 2) + S.line(A2, B2, ox, oy, u, 2)
      + [[A, 'A', -10, 4], [B, 'B', 10, 14], [A2, 'A′', -10, -4], [B2, 'B′', 14, 0]].map(([p, t, dx, dy]) => S.dot(...at(p)) + S.text(t, at(p)[0] + dx, at(p)[1] + dy)).join(''));
  }

  // e06：固定图形是台阶形（[0,6] 上高 3，[6,9] 上高 5），正方形边长 4，G 在 B 左侧 2，每单位 18px
  {
    const k = 18;
    const ox = 14;
    const oy = 14;
    const X = x => ox + (x + 6) * k;
    const Y = y => oy + (5 - y) * k;
    const pts = [[0, 0], [9, 0], [9, 5], [6, 5], [6, 3], [0, 3]].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ');
    const sqp = [[-6, 0], [-2, 0], [-2, 4], [-6, 4]].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ');
    out.e06 = S.wrap(16 * k + 2 * ox, 5 * k + oy + 40,
      `<line x1="${ox - 4}" y1="${Y(0)}" x2="${X(10)}" y2="${Y(0)}" stroke="#2b2b2b" stroke-width="1.2"/>`
      + `<polygon points="${pts}" fill="#e8e8e8" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<polygon points="${sqp}" fill="#cfe3f7" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('F', X(-6), Y(0) + 16) + S.text('G', X(-2), Y(0) + 16) + S.text('B', X(0), Y(0) + 16) + S.text('C', X(6), Y(0) + 16) + S.text('D', X(9), Y(0) + 16)
      + S.text('l', X(10) - 4, Y(0) - 6, 'font-style="italic"'));
  }

  // c01：边长 4 的正方形 ABCD，虚线是向右 4 格、向上 2 格（t=2）的位置，网格 9×8
  {
    const ox = 20;
    const oy = 12;
    const v = 22;
    const sq = [[0, 8], [4, 8], [4, 4], [0, 4]];
    const sq2 = sq.map(([x, y]) => [x + 4, y - 2]);
    out.c01 = S.wrap(9 * v + 2 * ox, 8 * v + 2 * oy + 8,
      S.grid(ox, oy, 9, 8, v) + S.poly(sq, ox, oy, v) + S.poly(sq2, ox, oy, v, 'none', true)
      + S.text('A', ox - 8, oy + 8 * v + 12) + S.text('B', ox + 4 * v + 6, oy + 8 * v + 14) + S.text('C', ox + 4 * v + 8, oy + 4 * v + 4) + S.text('D', ox - 8, oy + 4 * v));
  }

  // c03：两条河（河岸都沿水平格线），A(0,1)、B(6,10)，河一在第 3～4 条格线之间，河二在第 7～9 条之间
  {
    const ox = 24;
    const oy = 10;
    const v = 20;
    const at = ([x, y]) => [ox + x * v, oy + y * v];
    out.c03 = S.wrap(9 * v + 2 * ox, 11 * v + 2 * oy,
      `<rect x="${ox}" y="${oy + 3 * v}" width="${9 * v}" height="${1 * v}" fill="#bcd9f2"/>`
      + `<rect x="${ox}" y="${oy + 7 * v}" width="${9 * v}" height="${2 * v}" fill="#bcd9f2"/>`
      + S.grid(ox, oy, 9, 11, v)
      + S.text('河一', ox + 7.5 * v, oy + 3.75 * v, 'font-size="13"') + S.text('河二', ox + 7.5 * v, oy + 8.2 * v, 'font-size="13"')
      + S.dot(...at([0, 1])) + S.text('A', at([0, 1])[0] + 10, at([0, 1])[1] - 4)
      + S.dot(...at([6, 10])) + S.text('B', at([6, 10])[0] + 10, at([6, 10])[1] + 14));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s1/14.1',
  title: '平移',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮 c01（对角线方向扫过面积）一个公式就做完、只有 4 级，c05(1)“重叠为 2”与 e06 同模板，扩展档缺 5 级，c04 与平移联系弱，e03 缺“槽两侧一样高”的条件，e01、b07 配图有小问题；第 2 轮 c01 改为“右 2t、上 t”并按是否重叠分类、e06 改台阶形图形分五段求最值、c04 第 (2) 问改按 n 模 4 分类、c05(1) 改“MN 等于重叠长度一半”后判定整节通过。可选意见：扩展档实际约 4∶1∶1（e02、e04 可再加转弯）；c04 与平移的联系仍偏弱' },

  intro: [
    {
      title: '图形的平移',
      body: '在平面上，把图形上的**所有点**都按照某个方向作相同距离的移动，叫作图形的平移。平移由**方向**和**距离**决定。平移前后重合的点叫对应点，同样有对应线段、对应角。',
      example: '推拉窗沿轨道向左推动 $0.5$ m，窗上的每一个点都向左移动了 $0.5$ m。',
    },
    {
      title: '平移的性质',
      body: '平移后：① 每组对应点之间的距离相等，都等于平移的距离；② 连接对应点的线段平行（或在同一直线上）且相等；③ 对应线段平行（或在同一直线上）且相等，对应角相等；④ 形状相同、大小相等。',
      pitfall: '沿某条直线方向平移时，这条直线上的对应线段、对应点连线都在同一直线上，不能说“一定平行”。',
      demo: { type: 'motion', mode: 'translate', shape: [[1, 1], [4, 1], [2, 3]], v: [5, 1], view: [0, 10, 0, 5] },
    },
    {
      title: '网格中的平移',
      body: '画平移后的图形，先找“关键点”（如多边形的顶点），把每个关键点按同样的方向、同样的格数移动，再按原来的顺序连起来。数格数要数**对应点**之间相隔几格。',
      example: '点 $P$ 向左平移 $2$ 格、再向上平移 $3$ 格得到 $P\'$；图形上其他点也都是向左 $2$ 格、向上 $3$ 格。',
    },
    {
      title: '用平移“化折为直”',
      body: '把折线中的线段平移，可以把它们接成一条直线或长方形的边，方便计算长度和周长；把图形的一部分平移拼起来，可以求不规则图形的面积。',
      example: '一个台阶形图形，所有水平边平移后正好拼成宽 $5$，所有竖直边拼成高 $3$，它的周长等于长方形的周长 $2\\times(5+3)=16$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '14.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 平移不改变图形的形状和大小；② 平移后，对应线段一定平行；③ 平移后，各组对应点之间的距离相等；④ 图形平移的方向只能是水平或竖直方向；⑤ 平移后，对应角相等。其中正确的有（　　）',
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 1,
      explain: [
        '① 正确，平移只改变位置。③ 正确，对应点之间的距离都等于平移的距离。⑤ 正确。',
        '② 错误：对应线段平行**或在同一直线上**。比如三角形 $ABC$ 沿 $BC$ 方向平移，$BC$ 与它的对应线段在同一直线上。',
        '④ 错误：平移可以沿任意方向。',
        '正确的有 ①③⑤，共 $3$ 个，选 B。',
      ],
    },
    {
      id: '14.1-b02',
      level: 'basic',
      type: 'choice',
      stem: '如图，在方格纸中，三角形甲经过平移得到三角形乙，下列平移方法正确的是（　　）',
      figure: FIG141.b02,
      options: [
        '先向右平移 $5$ 格，再向下平移 $2$ 格',
        '先向右平移 $5$ 格，再向上平移 $2$ 格',
        '先向右平移 $3$ 格，再向下平移 $2$ 格',
        '先向下平移 $2$ 格，再向左平移 $5$ 格',
      ],
      answer: 0,
      explain: [
        '找一组对应点数格数：甲的直角顶点到乙的直角顶点，向右 $5$ 格、向下 $2$ 格，选 A。',
        '常见错误：数的是两个三角形之间空出的格数（甲的右端到乙的左端只隔 $3$ 格），选 C；数格数一定要从对应点数到对应点。',
      ],
      verify: () => {
        // 甲的顶点 (1,1)(1,4)(3,4)，乙的顶点由配图数据得到，比较对应点的差
        const jia = [[1, 1], [1, 4], [3, 4]];
        const yi = jia.map(([x, y]) => [x + 5, y + 2]);
        const d = jia.map((p, i) => [yi[i][0] - p[0], yi[i][1] - p[1]]);
        const same = d.every(q => q[0] === d[0][0] && q[1] === d[0][1]);
        // 选项：[右, 下]
        const opts = [[5, 2], [5, -2], [3, 2], [-5, 2]];
        return same ? opts.findIndex(o => o[0] === d[0][0] && o[1] === d[0][1]) : null;
      },
    },
    {
      id: '14.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '三角形 $ABC$ 沿射线 $BC$ 的方向平移 $6$ cm 得到三角形 $DEF$（点 $A$、$B$、$C$ 的对应点分别是 $D$、$E$、$F$）。若 $BC=4$ cm，求 $CE$ 和 $BF$ 的长。',
      blanks: [
        { kind: 'num', label: '$CE=$（cm）', answer: '2' },
        { kind: 'num', label: '$BF=$（cm）', answer: '10' },
      ],
      explain: [
        '平移的距离是 $6$ cm，所以 $BE=CF=6$ cm，且 $E$、$F$ 都在射线 $BC$ 上。',
        '$BE=6>BC=4$，点 $E$ 在点 $C$ 的**右边**：$CE=BE-BC=6-4=2$（cm）。',
        '$EF=BC=4$ cm，$BF=BE+EF=6+4=10$（cm）。',
        '常见错误：习惯性地以为 $E$ 在 $B$、$C$ 之间，算成 $CE=4-6$；或者把 $BF$ 算成 $BC+CF$ 时把 $CF$ 写成 $2$。',
      ],
      verify: () => {
        // 把射线 BC 看成数轴，B=0、C=4
        const B = F(0);
        const C = F(4);
        const E = B.add(6);
        const Fp = C.add(6);
        return [E.sub(C).abs(), Fp.sub(B)];
      },
    },
    {
      id: '14.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '三角形 $ABC$ 的周长为 $12$ cm，把它沿 $BC$ 的方向平移 $3$ cm 得到三角形 $DEF$（$A$、$B$、$C$ 的对应点分别是 $D$、$E$、$F$），求四边形 $ABFD$ 的周长。',
      blanks: [
        { kind: 'num', label: '周长（cm）', answer: '18' },
      ],
      explain: [
        '四边形 $ABFD$ 的四条边是 $AB$、$BF$、$FD$、$DA$。',
        '$BF=BC+CF=BC+3$；$FD$ 是 $AC$ 的对应线段，$FD=AC$；$AD$ 是对应点的连线，$AD=3$。',
        '周长 $=AB+(BC+3)+AC+3=(AB+BC+AC)+6=12+6=18$（cm）。',
        '常见错误：只加了一个 $3$，忘了 $AD$ 也等于平移的距离，得 $15$。',
      ],
      verify: () => {
        // 取一组满足周长 12 的三边，计算四边形周长
        const [ab, bc, ac] = [F(3), F(4), F(5)];
        const d = F(3);
        return ab.add(bc.add(d)).add(ac).add(d);
      },
    },
    {
      id: '14.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '如图是一段楼梯的侧面，楼梯高 $2.4$ m，水平长度为 $4.2$ m，楼梯宽 $1.5$ m。现在要在楼梯上铺满地毯（台阶的水平面和竖直面都要铺），地毯每平方米 $50$ 元，至少需要多少元？',
      figure: FIG141.b05,
      blanks: [
        { kind: 'num', label: '费用（元）', answer: '495' },
      ],
      explain: [
        '把每级台阶的水平面平移下去，正好拼成 $4.2$ m；把每个竖直面平移过去，正好拼成 $2.4$ m。',
        '地毯的长度 $=4.2+2.4=6.6$（m），面积 $=6.6\\times1.5=9.9$（m²）。',
        '费用 $=9.9\\times50=495$（元）。',
        '常见错误：只算水平部分，或者以为要知道每一级台阶的尺寸才能算。',
      ],
      verify: () => {
        // 6 级台阶，每级高 0.4、宽 0.7，逐级相加
        let len = F(0);
        for (let i = 0; i < 6; i++) len = len.add('0.4').add('0.7');
        return len.mul('1.5').mul(50);
      },
    },
    {
      id: '14.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '如图，直角三角形 $ABC$ 中 $\\angle B=90^\\circ$，把它沿 $BC$ 的方向平移得到直角三角形 $DEF$，$DE$ 与 $AC$ 相交于点 $H$。已知 $AB=8$，$BE=5$，$DH=3$，求图中阴影部分（四边形 $HDFC$）的面积。',
      figure: FIG141.b06,
      blanks: [
        { kind: 'num', label: '面积', answer: '65/2' },
      ],
      explain: [
        '阴影部分 $=$ 三角形 $DEF$ 的面积 $-$ 三角形 $HEC$ 的面积。',
        '平移不改变大小，三角形 $DEF$ 与三角形 $ABC$ 面积相等，所以阴影面积 $=$ 三角形 $ABC$ 的面积 $-$ 三角形 $HEC$ 的面积 $=$ 四边形 $ABEH$ 的面积。',
        '$DE=AB=8$，$HE=DE-DH=5$，$\\angle DEF=\\angle B=90^\\circ$，四边形 $ABEH$ 是直角梯形：面积 $=\\frac{(8+5)\\times5}{2}=\\frac{65}{2}$。',
        '常见错误：把 $HE$ 当成 $3$；或者想直接求阴影面积，却缺少 $EF$、$CE$ 的长度。',
      ],
      verify: () => {
        // 按配图数据：B(0,0) A(0,8)，BC=40/3，E(5,0)，H(5,5) 在 AC 上
        const bc = F(40).div(3);
        const onAC = F(8).sub(F(8).mul(5).div(bc)).eq(5);
        const shade = area141([[5, 5], [5, 8], [F(5).add(bc), 0], [bc, 0]]);
        return onAC ? shade : null;
      },
    },
    {
      id: '14.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，在一块长 $20$ m、宽 $12$ m 的长方形草地上，修了一条横向的直路（宽 $1$ m）和一条斜向的小路（沿水平方向量，宽处处都是 $2$ m），其余部分种草。求种草部分的面积。',
      figure: FIG141.b07,
      blanks: [
        { kind: 'num', label: '面积（m²）', answer: '198' },
      ],
      explain: [
        '把斜路右边的草地向左平移 $2$ m，把直路下面的草地向上平移 $1$ m，草地正好拼成一个长方形。',
        '长方形的长 $=20-2=18$（m），宽 $=12-1=11$（m），面积 $=18\\times11=198$（m²）。',
        '常见错误：两条路面积分别是 $2\\times12$ 和 $1\\times20$，直接用 $240-24-20=196$，把两条路交叉处减了两次。',
      ],
      verify: () => {
        // 逐行（每 1/4 m 一条水平带）计算草地宽度：不在直路上的带，草地宽 = 20 − 2
        let s = F(0);
        for (let i = 0; i < 48; i++) {
          const y = F(i).div(4);
          const onRoad = y.cmp(5) >= 0 && y.cmp(6) < 0;
          if (!onRoad) s = s.add(F(20 - 2).mul('1/4'));
        }
        return s;
      },
    },
    {
      id: '14.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '长方形 $ABCD$ 中 $AB=6$ cm，$BC=4$ cm。把它沿 $AB$ 的方向平移 $2$ cm 得到长方形 $A\'B\'C\'D\'$。求：(1) 两个长方形重叠部分的面积；(2) 两个长方形一共盖住的面积。',
      blanks: [
        { kind: 'num', label: '(1) 重叠面积（cm²）', answer: '16' },
        { kind: 'num', label: '(2) 盖住的面积（cm²）', answer: '32' },
      ],
      explain: [
        '(1) 重叠部分是长方形，长 $6-2=4$（cm），宽 $4$ cm，面积 $16$ cm²。',
        '(2) 两个长方形各 $24$ cm²，重叠部分算了两次，要减去一次：$24+24-16=32$（cm²）。',
        '也可以直接看：一共盖住的是长 $6+2=8$、宽 $4$ 的长方形，面积 $32$ cm²。',
        '常见错误：(2) 直接写 $48$，忘了减去重叠部分。',
      ],
      verify: () => {
        const r1 = [0, 6, 0, 4];
        const r2 = [2, 8, 0, 4];
        const o = overlap141(r1, r2);
        return [o, F(48).sub(o)];
      },
    },
    {
      id: '14.1-b09',
      level: 'basic',
      type: 'choice',
      stem: '把三角形甲先向右平移 $4$ 格、再向上平移 $3$ 格得到三角形乙，再把三角形乙向左平移 $1$ 格、向下平移 $5$ 格得到三角形丙。三角形甲到三角形丙的位置变化，可以看成一次平移：（　　）',
      options: [
        '向右平移 $3$ 格，再向下平移 $2$ 格',
        '向右平移 $5$ 格，再向上平移 $8$ 格',
        '向右平移 $3$ 格，再向上平移 $2$ 格',
        '向左平移 $3$ 格，再向下平移 $2$ 格',
      ],
      answer: 0,
      explain: [
        '左右方向：先向右 $4$ 格，再向左 $1$ 格，合起来向右 $3$ 格。',
        '上下方向：先向上 $3$ 格，再向下 $5$ 格，合起来向下 $2$ 格。选 A。',
        '常见错误：把格数直接相加，选 B；或者上下方向算反，选 C。',
      ],
      verify: () => {
        // 向右、向上为正
        const dx = 4 - 1;
        const dy = 3 - 5;
        const opts = [[3, -2], [5, 8], [3, 2], [-3, -2]];
        return opts.findIndex(o => o[0] === dx && o[1] === dy);
      },
    },

    // ---------- 扩展 ----------
    {
      id: '14.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '如图，把一个大等边三角形的每条边四等分，分成 $16$ 个大小相同的小等边三角形。(1) 通过平移小三角形 ①（涂色），可以得到图中其他多少个小三角形？(2) 虚线框出的是由 $4$ 个小三角形组成的三角形 ②，通过平移三角形 ②，可以得到图中其他多少个同样大小的三角形？',
      figure: FIG141.e01,
      blanks: [
        { kind: 'num', label: '(1)', answer: '9' },
        { kind: 'num', label: '(2)', answer: '5' },
      ],
      explain: [
        '平移不改变图形的方向。① 是“尖朝上”的，只有尖朝上的小三角形才能由它平移得到；尖朝下的要转半圈，不能平移得到。',
        '(1) 尖朝上的小三角形：第 $1$～$4$ 行分别有 $1$、$2$、$3$、$4$ 个，共 $10$ 个，除去 ① 本身，有 $9$ 个。',
        '(2) 边长为 $2$ 的尖朝上三角形，顶点可以放在第 $1$～$3$ 行的格点上，分别有 $1$、$2$、$3$ 个位置，共 $6$ 个，除去 ② 本身，有 $5$ 个。',
        '常见错误：把尖朝下的三角形也算上，(1) 得 $15$；(2) 把中间那个尖朝下的大三角形也算上，得 $6$。',
      ],
      verify: () => {
        // 三角形网格：尖朝上、边长 k 的三角形，顶点在第 r 行第 c 个格点（0≤c≤r），要求 r+k≤4
        const up = k => {
          let n = 0;
          for (let r = 0; r + k <= 4; r++) n += r + 1;
          return n;
        };
        return [up(1) - 1, up(2) - 1];
      },
    },
    {
      id: '14.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $-2$，点 $B$ 表示 $3$。把线段 $AB$ 沿数轴平移得到线段 $A\'B\'$（$A$、$B$ 的对应点分别是 $A\'$、$B\'$），使得点 $A\'$ 与点 $B$ 之间的距离为 $1$。求点 $B\'$ 表示的数（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$B\'$ 表示', answer: ['7', '9'] },
      ],
      explain: [
        '$A\'$ 与 $B$ 的距离为 $1$，$A\'$ 表示 $3-1=2$ 或 $3+1=4$。',
        '平移时各点移动的方向、距离都一样：$A$ 从 $-2$ 到 $2$ 是向右平移 $4$；从 $-2$ 到 $4$ 是向右平移 $6$。',
        '$B\'$ 表示 $3+4=7$ 或 $3+6=9$。',
        '常见错误：只想到 $A\'$ 在 $B$ 的左边一种情况；或者以为 $A\'B\'$ 可以“掉头”，得到 $B\'$ 在 $A\'$ 左边的数。',
      ],
      verify: () => {
        const res = [];
        for (const a2 of [F(3).sub(1), F(3).add(1)]) res.push(F(3).add(a2.sub(-2)));
        return res;
      },
    },
    {
      id: '14.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，一个组合图形的各边都是水平或竖直的（单位：cm），最下面的边长 $10$，最左边的边长 $6$，上面凹进去的槽深 $2$，槽两侧的顶部与最左边的顶部一样高。求这个图形的周长。',
      figure: FIG141.e03,
      blanks: [
        { kind: 'num', label: '周长（cm）', answer: '36' },
      ],
      explain: [
        '把上方所有朝上的水平边平移到同一条直线上，正好拼成长 $10$ 的线段，和最下面的边一样长。',
        '右侧台阶的竖直边向右平移，正好拼成长 $6$ 的线段，和最左边一样长。这两部分合起来是长方形的周长 $2\\times(10+6)=32$。',
        '但凹槽的两条竖直边（各长 $2$）不能和其他边拼接，要另外加上：$32+2\\times2=36$（cm）。',
        '常见错误：把整个图形当成长方形，得 $32$。',
      ],
      verify: () => {
        const pts = [[0, 0], [4, 0], [4, 2], [6, 2], [6, 0], [7, 0], [7, 2], [9, 2], [9, 4], [10, 4], [10, 6], [0, 6]];
        let p = 0;
        pts.forEach((a, i) => {
          const b = pts[(i + 1) % pts.length];
          p += Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
        });
        return p;
      },
    },
    {
      id: '14.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，方格纸中线段 $AB$ 平移后得到线段 $A\'B\'$，每个小方格的边长为 $1$。求四边形 $ABB\'A\'$ 的面积。',
      figure: FIG141.e04,
      blanks: [
        { kind: 'num', label: '面积', answer: '10' },
      ],
      explain: [
        '四条边都是斜的，没法直接用公式。用“补成正方形再减去”的方法。',
        '四个点 $A$、$B$、$B\'$、$A\'$ 正好落在一个横 $4$ 格、竖 $4$ 格的正方形的四条边上，正方形面积 $16$。',
        '四个角上多出 $4$ 个直角三角形，直角边都是 $3$ 和 $1$（比如 $A$ 到 $B$ 向右 $3$ 格、向下 $1$ 格），每个面积 $\\frac{3\\times1}{2}=\\frac32$。',
        '四边形面积 $=16-4\\times\\frac32=10$。',
        '常见错误：把四边形当成“底 $3$、高 $3$”的平行四边形，得 $9$；或者只减去两个三角形。',
      ],
      verify: () => area141([[1, 4], [4, 5], [5, 2], [2, 1]]),
    },
    {
      id: '14.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '三角形 $ABC$ 沿射线 $BC$ 的方向平移得到三角形 $DEF$（$A$、$B$、$C$ 的对应点分别是 $D$、$E$、$F$），点 $E$ 不与点 $C$ 重合。已知 $BF=14$，$AD=2EC$，求 $BC$ 的长（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$BC=$', answer: ['42/5', '14/3'] },
      ],
      explain: [
        '设 $BC=a$，平移的距离为 $d$，则 $AD=BE=CF=d$，$BF=BC+CF=a+d=14$。',
        '$E$ 的位置要分两种情况。',
        '① $E$ 在 $B$、$C$ 之间（$d<a$）：$EC=a-d$，$d=2(a-d)$，$3d=2a$。与 $a+d=14$ 联立：$a=\\frac{42}{5}$，$d=\\frac{28}{5}$，满足 $d<a$。',
        '② $E$ 在 $C$ 的右边（$d>a$）：$EC=d-a$，$d=2(d-a)$，$d=2a$。与 $a+d=14$ 联立：$a=\\frac{14}{3}$，$d=\\frac{28}{3}$，满足 $d>a$。',
        '所以 $BC=\\frac{42}{5}$ 或 $\\frac{14}{3}$。常见错误：默认按题目常见的画法，只做情况 ①。',
      ],
      verify: () => {
        // 枚举：a+d=14，AD=2|a−d|，以 1/15 为步长
        const res = [];
        for (let k = 1; k < 14 * 15; k++) {
          const a = F(k).div(15);
          const d = F(14).sub(a);
          if (a.eq(d)) continue;
          if (d.eq(a.sub(d).abs().mul(2))) res.push(a);
        }
        return res;
      },
    },
    {
      id: '14.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，直线 $l$ 上有一个固定的台阶形图形：$BC=6$ cm 上方高 $3$ cm，$CD=3$ cm 上方高 $5$ cm。边长为 $4$ cm 的正方形 $EFGH$ 的边 $FG$ 在 $l$ 上，点 $G$ 在点 $B$ 左侧 $2$ cm 处。正方形沿直线 $l$ 以每秒 $1$ cm 的速度向右平移，直到完全离开台阶形图形为止。(1) 正方形出发后几秒时，两个图形重叠部分的面积是 $10$ cm²？（全部填出，用逗号隔开）(2) 重叠部分面积的最大值是多少？此时正方形出发了几秒？',
      figure: FIG141.e06,
      blanks: [
        { kind: 'nums', label: '(1) 秒数', answer: ['16/3', '25/2'] },
        { kind: 'num', label: '(2) 最大面积（cm²）', answer: '15' },
        { kind: 'num', label: '此时（秒）', answer: '11' },
      ],
      explain: [
        '把 $l$ 看成数轴，$B$ 为 $0$，$C$ 为 $6$，$D$ 为 $9$。$t$ 秒时 $F$ 在 $t-6$，$G$ 在 $t-2$。重叠部分在 $BC$ 段上的高是 $3$，在 $CD$ 段上的高是 $4$（台阶高 $5$，但正方形只有 $4$）。',
        '按 $F$、$G$ 经过 $B$、$C$、$D$ 的时刻分段：$G$ 过 $B$（$t=2$）、$F$ 过 $B$（$t=6$）、$G$ 过 $C$（$t=8$）、$G$ 过 $D$（$t=11$）、$F$ 过 $C$（$t=12$）、$F$ 过 $D$（$t=15$）。',
        '$2\\le t\\le6$：面积 $=3(t-2)$；$6\\le t\\le8$：$=3\\times4=12$；$8\\le t\\le11$：$=3(12-t)+4(t-8)=t+4$；$11\\le t\\le12$：$=3(12-t)+4\\times3=48-3t$；$12\\le t\\le15$：$=4(15-t)$。',
        '(1) $3(t-2)=10$，$t=\\frac{16}{3}$，在 $[2,6]$ 内；中间三段的面积都不小于 $12$；$4(15-t)=10$，$t=\\frac{25}{2}$，在 $[12,15]$ 内。',
        '(2) $t+4$ 在 $t=11$ 时最大，为 $15$；之后 $48-3t$ 变小。所以最大面积是 $15$ cm²，在第 $11$ 秒（$G$ 正好到 $D$）时取得。',
        '常见错误：把 $CD$ 段上的重叠高度当成 $5$；或者以为正方形完全在台阶上方时面积最大。',
      ],
      verify: () => {
        const h = x => (x.cmp(6) < 0 ? F(3) : F(4));  // 台阶在 x 处与正方形重叠的高度
        // 以 1/12 为宽的小条累加重叠面积（各分界点都是 1/12 的倍数，计算是精确的）
        const area = t => {
          let s = F(0);
          for (let i = 0; i < 9 * 12; i++) {
            const x = F(i).div(12);
            const mid = x.add(F(1).div(24));
            if (mid.cmp(F(t).sub(6)) > 0 && mid.cmp(F(t).sub(2)) < 0) s = s.add(h(mid).div(12));
          }
          return s;
        };
        const r = [];
        let best = F(0);
        let at = null;
        for (let k = 0; k <= 15 * 6; k++) {
          const t = F(k).div(6);
          const a = area(t);
          if (a.eq(10)) r.push(t);
          if (a.cmp(best) > 0) {
            best = a;
            at = t;
          }
        }
        return [r, best, at];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '14.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '如图，方格纸中正方形 $ABCD$ 的边长为 $4$。把它平移，使点 $A$ 向右移动 $2t$ 格、向上移动 $t$ 格（虚线是 $t=2$ 时的位置）。正方形在平移过程中经过的区域叫作它“扫过”的区域。(1) $t=2$ 时，扫过的区域面积是多少？(2) 扫过的区域中，不在开始和结束两个正方形里的部分面积为 $20$ 时，$t$ 是多少？',
      figure: FIG141.c01,
      blanks: [
        { kind: 'num', label: '(1)', answer: '40' },
        { kind: 'num', label: '(2) $t=$', answer: '3' },
      ],
      demo: { type: 'sweep', side: 4, v: [2, 1], tMax: 3 },
      explain: [
        '第一步：弄清扫过的区域。正方形上的点都沿同一方向移动同样的距离，扫过的区域由开始、结束两个正方形，以及顶点 $B$、$D$ 走过的两条线段围成，是一个六边形。',
        '六边形正好放在一个横 $(4+2t)$、竖 $(4+t)$ 的长方形里，只在右下角和左上角各缺一个直角三角形，直角边都是 $2t$ 和 $t$（比如 $B$ 向右走 $2t$、向上走 $t$）。',
        '扫过面积 $=(4+2t)(4+t)-2\\times\\frac{2t\\cdot t}{2}=16+12t+2t^{2}-2t^{2}=16+12t$。(1) $t=2$ 时为 $40$。',
        '(2) 两个正方形盖住的面积要看它们是否重叠，分两种情况。',
        '① $t<2$（$2t<4$，两个正方形重叠）：重叠部分是 $(4-2t)\\times(4-t)$ 的长方形，两个正方形盖住的面积 $=32-(4-2t)(4-t)=16+12t-2t^{2}$，所以这部分 $=(16+12t)-(16+12t-2t^{2})=2t^{2}$，正好是两个缺角三角形的面积。$t<2$ 时它小于 $8$，不可能等于 $20$。',
        '② $t\\ge2$（两个正方形不重叠）：这部分 $=16+12t-32=12t-16=20$，$t=3$，符合 $t\\ge2$。',
        '所以 $t=3$。常见错误：不分情况，直接用 $16+12t-32=20$ 却不检查是否重叠；或者用 $2t^{2}=20$ 硬求 $t$。',
      ],
      verify: () => {
        const swept = t => {
          const T = F(t);
          return area141([[0, 0], [4, 0], [T.mul(2).add(4), T], [T.mul(2).add(4), T.add(4)], [T.mul(2), T.add(4)], [0, 4]]);
        };
        const outside = t => {
          const T = F(t);
          const ov = overlap141([0, 4, 0, 4], [T.mul(2), T.mul(2).add(4), T, T.add(4)]);
          return swept(T).sub(F(32).sub(ov));
        };
        let t2 = null;
        for (let k = 1; k <= 80; k++) if (outside(F(k).div(10)).eq(20)) t2 = F(k).div(10);
        return [swept(2), t2];
      },
    },
    {
      id: '14.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '两张完全相同的长方形纸片，长 $8$ cm、宽 $4$ cm，开始时完全重合，长边水平放置。把上面一张先向右平移 $x$ cm，再向下平移 $y$ cm（$x$、$y$ 都是正整数，$x<8$，$y<4$），两张纸片组成的图形的周长是 $34$ cm。两张纸片重叠部分的面积可能是多少 cm²？（全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '重叠面积（cm²）', answer: ['6', '10', '12'] },
      ],
      explain: [
        '第一步：用平移求组合图形的周长。组合图形像两级台阶，它的水平边平移后拼成两条长 $8+x$ 的线段，竖直边拼成两条长 $4+y$ 的线段。',
        '所以周长 $=2(8+x)+2(4+y)=24+2x+2y=34$，得 $x+y=5$。',
        '第二步：按整数分类。$y$ 只能是 $1$、$2$、$3$，对应 $x=4$、$3$、$2$，都满足 $x<8$。',
        '重叠部分是长 $(8-x)$、宽 $(4-y)$ 的长方形：$(x,y)=(4,1)$ 时 $4\\times3=12$；$(3,2)$ 时 $5\\times2=10$；$(2,3)$ 时 $6\\times1=6$。',
        '所以重叠面积可能是 $6$、$10$ 或 $12$ cm²。常见错误：以为周长是两张纸片周长之和减去重叠部分的周长；或者漏掉 $y$ 的某个取值。',
      ],
      verify: () => {
        const res = [];
        for (let x = 1; x < 8; x++) {
          for (let y = 1; y < 4; y++) {
            // 组合图形是阶梯形，按边界逐段算周长：外接长方形的周长（阶梯形不增加周长）
            const pts = [[0, 0], [8, 0], [8, y], [8 + x, y], [8 + x, 4 + y], [x, 4 + y], [x, 4], [0, 4]];
            let p = 0;
            pts.forEach((a, i) => {
              const b = pts[(i + 1) % pts.length];
              p += Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
            });
            if (p === 34) res.push(overlap141([0, 8, 0, 4], [x, 8 + x, y, 4 + y]));
          }
        }
        return res;
      },
    },
    {
      id: '14.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，方格纸中每个小方格的边长都代表 $100$ m，$A$、$B$ 两村之间有两条河，河岸都是水平的，河一宽 $100$ m，河二宽 $200$ m。现在要在两条河上各建一座与河岸垂直的桥，使从 $A$ 村到 $B$ 村的路线（包括过桥）最短。两座桥分别应建在 $A$ 村右侧多少米处（按水平距离算）？',
      figure: FIG141.c03,
      blanks: [
        { kind: 'num', label: '河一的桥（m）', answer: '200' },
        { kind: 'num', label: '河二的桥（m）', answer: '500' },
      ],
      explain: [
        '路线 $=$ 三段“岸上的路” $+$ 两座桥。桥长是固定的（$100$ m 和 $200$ m），只要岸上三段路的总长最短。',
        '关键想法：把桥“去掉”。把第一段路（$A$ 到河一北岸）向下平移 $100+200=300$ m，第二段路（河一南岸到河二北岸）向下平移 $200$ m，三段路就首尾相接，从 $A$ 向下平移 $300$ m 后的点 $A_{1}$ 连到 $B$。',
        '根据两点之间线段最短，三段路接起来是线段 $A_{1}B$ 时最短，即三段路的方向都和 $A_{1}B$ 相同。',
        '看方格：$A_{1}$ 在 $A$ 正下方 $3$ 格，$A_{1}$ 到 $B$ 是向右 $6$ 格、向下 $6$ 格，方向是“向右 $1$ 格就向下 $1$ 格”。',
        '第一段从 $A$ 向下 $2$ 格到河一北岸，同时向右 $2$ 格，河一的桥在 $A$ 右侧 $2$ 格；第二段从河一南岸向下 $3$ 格到河二北岸，再向右 $3$ 格，河二的桥在 $A$ 右侧 $5$ 格；最后一段向下 $1$ 格、向右 $1$ 格正好到 $B$。',
        '所以两座桥分别建在 $A$ 村右侧 $200$ m 和 $500$ m 处。',
      ],
      verify: () => {
        // 枚举两座桥的位置（以 1/2 格为步长），用“岸上三段路的水平、竖直位移”比较路线长度的平方和（不用开方：三段方向相同时最短，等价于检查三段的斜率相同）
        const A = [0, 1];
        const B = [6, 10];
        const banks = [[3, 4], [7, 9]];
        let best = null;
        for (let i = 0; i <= 18; i++) {
          for (let j = 0; j <= 18; j++) {
            const p = F(i).div(2);
            const q = F(j).div(2);
            const segs = [[p.sub(A[0]), F(banks[0][0] - A[1])], [q.sub(p), F(banks[1][0] - banks[0][1])], [F(B[0]).sub(q), F(B[1] - banks[1][1])]];
            const len = segs.reduce((s, [dx, dy]) => s + Math.hypot(Number(dx.n) / Number(dx.d), Number(dy.n) / Number(dy.d)), 0);
            if (!best || len < best.len - 1e-9) best = { len, p, q };
          }
        }
        return [best.p.mul(100), best.q.mul(100)];
      },
    },
    {
      id: '14.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一个机器人在方格纸上从点 $O$ 出发，第 $1$ 次向右平移 $1$ 格，第 $2$ 次向上平移 $2$ 格，第 $3$ 次向左平移 $3$ 格，第 $4$ 次向下平移 $4$ 格，第 $5$ 次向右平移 $5$ 格……按“右、上、左、下”的顺序循环，第 $n$ 次平移 $n$ 格。(1) 第 $2026$ 次平移后，机器人在点 $O$ 右方几格、上方几格？（在左方、下方用负数表示）(2) 第 $n$ 次平移后，机器人与点 $O$ 的左右距离与上下距离之和记为 $d_{n}$（如 $d_{2}=1+2=3$）。求所有使 $d_{n}=100$ 的 $n$（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'num', label: '(1) 右方（格）', answer: '1013' },
        { kind: 'num', label: '上方（格）', answer: '1014' },
        { kind: 'nums', label: '(2) $n=$', answer: ['99', '100'] },
      ],
      explain: [
        '几次平移合起来，等于把左右方向、上下方向的格数分别相加（向右、向上为正）。每 $4$ 次一组：第 $4k+1$～$4k+4$ 次分别是右 $(4k+1)$、上 $(4k+2)$、左 $(4k+3)$、下 $(4k+4)$，每组合起来是向左 $2$ 格、向下 $2$ 格。',
        '(1) $2026=4\\times506+2$。前 $2024$ 次合起来向左 $1012$ 格、向下 $1012$ 格；第 $2025$ 次向右 $2025$ 格，第 $2026$ 次向上 $2026$ 格。所以在右方 $1013$ 格、上方 $1014$ 格。',
        '(2) 按 $n$ 除以 $4$ 的余数分四类（$k\\ge0$）：第 $4k$ 次后在左 $2k$、下 $2k$，$d=4k$；第 $4k+1$ 次后在右 $2k+1$、下 $2k$，$d=4k+1$；第 $4k+2$ 次后在右 $2k+1$、上 $2k+2$，$d=4k+3$；第 $4k+3$ 次后在左 $2k+2$、上 $2k+2$，$d=4k+4$。',
        '$d_{n}=100$：$4k=100$ 得 $k=25$，$n=100$；$4k+4=100$ 得 $k=24$，$n=99$；$4k+1$、$4k+3$ 是奇数，不可能等于 $100$。',
        '所以 $n=99$ 或 $100$。常见错误：只找到 $n=100$，漏掉余数为 $3$ 的一类；或者 (1) 只算了完整的组。',
      ],
      verify: () => {
        let x = 0;
        let y = 0;
        const hit = [];
        const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        let p2026 = null;
        for (let n = 1; n <= 400; n++) {
          const [dx, dy] = dirs[(n - 1) % 4];
          x += dx * n;
          y += dy * n;
          if (Math.abs(x) + Math.abs(y) === 100) hit.push(n);
        }
        x = 0;
        y = 0;
        for (let n = 1; n <= 2026; n++) {
          const [dx, dy] = dirs[(n - 1) % 4];
          x += dx * n;
          y += dy * n;
        }
        p2026 = [x, y];
        return [p2026[0], p2026[1], hit];
      },
    },
    {
      id: '14.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '数轴上，线段 $AB$ 的端点 $A$、$B$ 分别表示 $-10$、$-6$，线段 $CD$ 的端点 $C$、$D$ 分别表示 $2$、$10$。线段 $AB$ 以每秒 $3$ 个单位向右平移，同时线段 $CD$ 以每秒 $1$ 个单位向左平移，设运动时间为 $t$ 秒。$M$、$N$ 分别是线段 $AB$、$CD$ 的中点。(1) $MN$ 恰好等于两条线段重叠部分长度的一半时，求 $t$；(2) 两条线段重叠部分的长度恰好等于 $MN$ 时，求 $t$。（每问全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $t=$', answer: ['3', '4'] },
        { kind: 'nums', label: '(2) $t=$', answer: ['11/4', '17/4'] },
      ],
      explain: [
        '$t$ 秒时 $A$、$B$、$C$、$D$ 分别表示 $-10+3t$、$-6+3t$、$2-t$、$10-t$。$AB$ 长 $4$，$CD$ 长 $8$。',
        '重叠情况分段：$B$ 追上 $C$ 时 $-6+3t=2-t$，$t=2$；$A$ 到 $C$ 时 $t=3$；$B$ 到 $D$ 时 $t=4$；$A$ 到 $D$ 时 $t=5$。',
        '所以 $2\\le t\\le3$ 时重叠长度 $=B-C=4t-8$；$3\\le t\\le4$ 时 $AB$ 整个在 $CD$ 上，重叠长度 $=4$；$4\\le t\\le5$ 时重叠长度 $=D-A=20-4t$；其他时刻没有重叠。',
        '$M$ 表示 $-8+3t$，$N$ 表示 $6-t$，$MN=|4t-14|$，$t=\\frac72$ 时 $M$、$N$ 重合。没有重叠时 $MN>0$，两问都只需在 $2\\le t\\le5$ 内找。',
        '(1) $2\\le t\\le3$：$14-4t=\\frac{4t-8}{2}$，$t=3$；$3\\le t\\le4$：$|4t-14|=2$，$t=3$ 或 $4$，都在范围内；$4\\le t\\le5$：$4t-14=\\frac{20-4t}{2}$，$t=4$。合起来 $t=3$ 或 $4$（分界点不要重复计数）。',
        '(2) $2\\le t\\le3$：$MN=14-4t$，$4t-8=14-4t$，$t=\\frac{11}{4}$，在范围内；$3\\le t\\le4$：$|4t-14|=4$，$t=\\frac92$ 或 $\\frac52$，都不在范围内；$4\\le t\\le5$：$MN=4t-14$，$20-4t=4t-14$，$t=\\frac{17}{4}$，在范围内。没有重叠时 $MN>0$，不相等。',
        '所以 (2) $t=\\frac{11}{4}$ 或 $\\frac{17}{4}$。',
      ],
      verify: () => {
        const at = t => {
          const A = F(-10).add(F(t).mul(3));
          const B = A.add(4);
          const C = F(2).sub(t);
          const D = C.add(8);
          const lo = A.cmp(C) > 0 ? A : C;
          const hi = B.cmp(D) < 0 ? B : D;
          const ov = hi.cmp(lo) > 0 ? hi.sub(lo) : F(0);
          const mn = A.add(B).div(2).sub(C.add(D).div(2)).abs();
          return [ov, mn];
        };
        const r1 = [];
        const r2 = [];
        for (let k = 0; k <= 400; k++) {
          const t = F(k).div(40);
          const [ov, mn] = at(t);
          if (ov.cmp(0) > 0 && mn.eq(ov.div(2))) r1.push(t);
          if (ov.eq(mn)) r2.push(t);
        }
        return [r1, r2];
      },
    },
  ],
});
