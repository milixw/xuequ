'use strict';

// 上海数学七年级上册 · 14.2 旋转
// 知识范围：图形的旋转（旋转中心、旋转角，规定旋转角大于 0°、小于 360°，顺时针或逆时针）；对应点、对应线段、对应角；
//   旋转的性质——对应点到旋转中心的距离相等，对应点与旋转中心连线所成的角都等于旋转角，对应线段、对应角相等，形状大小不变；旋转作图
// 可以使用：14.1 平移；六年级全部（数轴、角的和差、余角补角、圆的周长与弧长、圆与扇形面积、方程与方程组）；第 10～13 章；小学的平面图形面积
// 还没学：三角形内角和、等腰三角形的性质、平行线的性质、全等三角形（七年级下册）；勾股定理、开平方（八年级上册）；轴对称、中心对称（14.3、14.4）
// 本节约定：网格中每个小方格的边长为 1；长度都直接给出或由网格数出，不用勾股定理；含 π 的结果保留 π

// 配图工具（与 14.1 相同的画法，坐标以格为单位，y 轴向下）
const SVG142 = {
  wrap: (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif" font-size="15">${inner}</svg>`,
  grid: (ox, oy, cols, rows, u) => {
    let s = '';
    for (let i = 0; i <= cols; i++) s += `<line x1="${ox + i * u}" y1="${oy}" x2="${ox + i * u}" y2="${oy + rows * u}" stroke="#c8c8c8" stroke-width="1"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${ox}" y1="${oy + j * u}" x2="${ox + cols * u}" y2="${oy + j * u}" stroke="#c8c8c8" stroke-width="1"/>`;
    return s;
  },
  poly: (pts, ox, oy, u, fill = '#cfe3f7', dash = false) =>
    `<polygon points="${pts.map(([x, y]) => `${(ox + x * u).toFixed(1)},${(oy + y * u).toFixed(1)}`).join(' ')}" fill="${fill}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  seg: (a, b, ox, oy, u, dash = false) =>
    `<line x1="${(ox + a[0] * u).toFixed(1)}" y1="${(oy + a[1] * u).toFixed(1)}" x2="${(ox + b[0] * u).toFixed(1)}" y2="${(oy + b[1] * u).toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"${dash ? ' stroke-dasharray="5 3"' : ''}/>`,
  text: (t, x, y, opt = '') => `<text x="${x.toFixed ? x.toFixed(1) : x}" y="${y.toFixed ? y.toFixed(1) : y}" text-anchor="middle" ${opt}>${t}</text>`,
  dot: (x, y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="#2b2b2b"/>`,
};

// 网格点绕点 c 旋转 90°（屏幕坐标 y 向下）：cw 为顺时针
const rot90142 = ([x, y], [cx, cy], cw) => (cw ? [cx - (y - cy), cy + (x - cx)] : [cx + (y - cy), cy - (x - cx)]);

const FIG142 = (() => {
  const S = SVG142;
  const out = {};

  // b06：三角形 ABC 绕格点 P(4,4) 顺时针旋转 90° 得 A′B′C′；候选点 P(4,4)、Q(5,4)、R(6,3)、S(4,3)
  {
    const u = 24;
    const ox = 14;
    const oy = 10;
    const tri = [[5, 1], [7, 1], [5, 2]];
    const img = tri.map(p => rot90142(p, [4, 4], true));
    const at = ([x, y]) => [ox + x * u, oy + y * u];
    const lab = (p, t, dx, dy) => S.text(t, at(p)[0] + dx, at(p)[1] + dy);
    out.b06 = S.wrap(9 * u + 2 * ox, 8 * u + 2 * oy,
      S.grid(ox, oy, 9, 8, u) + S.poly(tri, ox, oy, u) + S.poly(img, ox, oy, u, '#f6d8b8')
      + lab(tri[0], 'A', -9, -4) + lab(tri[1], 'B', 9, -4) + lab(tri[2], 'C', -9, 12)
      + lab(img[0], 'A′', 0, -6) + lab(img[1], 'B′', 12, 14) + lab(img[2], 'C′', -10, -4)
      + [[[4, 4], 'P'], [[5, 4], 'Q'], [[6, 3], 'R'], [[4, 3], 'S']].map(([p, t]) => S.dot(...at(p)) + lab(p, t, -8, -5)).join(''));
  }

  // b07：正方形 ABCD（边长 4，按每格 36px 画），E 在 BC 上且 ∠BAE=25°，F 在 CD 的延长线上，DF=BE
  {
    const k = 36;
    const ox = 30;
    const oy = 20;
    const be = 4 * Math.tan((25 * Math.PI) / 180);
    const P = (x, y) => [ox + x * k, oy + y * k];  // A(0,be) 在左上，向下为正
    const A = P(0, be);
    const B = P(0, be + 4);
    const C = P(4, be + 4);
    const D = P(4, be);
    const E = P(be, be + 4);
    const Fp = P(4, 0);
    const pt = p => p.map(v => v.toFixed(1)).join(',');
    out.b07 = S.wrap(4 * k + 2 * ox, Math.round((be + 4) * k + oy + 30),
      `<polygon points="${pt(A)} ${pt(B)} ${pt(C)} ${pt(D)}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<polygon points="${pt(A)} ${pt(B)} ${pt(E)}" fill="#cfe3f7" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<polygon points="${pt(A)} ${pt(D)} ${pt(Fp)}" fill="#f6d8b8" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<line x1="${D[0]}" y1="${D[1]}" x2="${Fp[0]}" y2="${Fp[1]}" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('A', A[0] - 12, A[1] + 4) + S.text('B', B[0] - 12, B[1] + 6) + S.text('C', C[0] + 12, C[1] + 6)
      + S.text('D', D[0] + 12, D[1] + 8) + S.text('E', E[0], E[1] + 16) + S.text('F', Fp[0] + 12, Fp[1] + 6));
  }

  // e05：线段 OA，O(2,4)，A(5,3)（O 右 3 格、上 1 格），网格 7×7
  {
    const u = 24;
    const ox = 14;
    const oy = 10;
    const O = [2, 4];
    const A = [5, 3];
    const at = ([x, y]) => [ox + x * u, oy + y * u];
    out.e05 = S.wrap(7 * u + 2 * ox, 7 * u + 2 * oy,
      S.grid(ox, oy, 7, 7, u) + S.seg(O, A, ox, oy, u) + S.dot(...at(O)) + S.dot(...at(A))
      + S.text('O', at(O)[0] - 9, at(O)[1] + 14) + S.text('A', at(A)[0] + 10, at(A)[1] - 4));
  }

  // e06：正方形 ABCD 占 [0,2]×[4,6]，正方形 EFGH 占 [4,6]×[0,2]，候选点 M(5,5)、N(1,1)、P(3,3)、Q(5,3)
  {
    const u = 26;
    const ox = 14;
    const oy = 12;
    const at = ([x, y]) => [ox + x * u, oy + y * u];
    const lab = (p, t, dx, dy) => S.text(t, at(p)[0] + dx, at(p)[1] + dy);
    out.e06 = S.wrap(6 * u + 2 * ox, 6 * u + 2 * oy + 4,
      S.grid(ox, oy, 6, 6, u) + S.poly([[0, 4], [2, 4], [2, 6], [0, 6]], ox, oy, u) + S.poly([[4, 0], [6, 0], [6, 2], [4, 2]], ox, oy, u, '#f6d8b8')
      + lab([0, 4], 'A', -7, -3) + lab([0, 6], 'B', -7, 14) + lab([2, 6], 'C', 8, 14) + lab([2, 4], 'D', 8, -3)
      + lab([4, 0], 'E', -8, 12) + lab([4, 2], 'F', -8, 14) + lab([6, 2], 'G', 8, 14) + lab([6, 0], 'H', 8, 12)
      + [[[5, 5], 'M'], [[1, 1], 'N'], [[3, 3], 'P'], [[5, 3], 'Q']].map(([p, t]) => S.dot(...at(p)) + lab(p, t, 9, 15)).join(''));
  }

  // c01：正方形 ABCD 边长 6，中心 O，直角 ∠MON 的边 OM 交 AB 于 E（BE=2）、ON 交 BC 于 F
  {
    const k = 26;
    const ox = 56;
    const oy = 20;
    const P = (x, y) => [ox + x * k, oy + y * k];  // A(0,0) 左上，B(0,6) 左下，C(6,6)，D(6,0)，O(3,3)
    const O = P(3, 3);
    // 按 BE=2 画：E(0,4)，F(4,6)（BF=AE=4），M、N 在射线 OE、OF 上再往外延长
    const E = P(0, 4);
    const Fq = P(4, 6);
    const Mq = P(-1.2, 4.4);
    const Nq = P(4.4, 7.2);
    const pt = p => p.map(v => v.toFixed(1)).join(',');
    const B = P(0, 6);
    out.c01 = S.wrap(Math.round(6 * k + 2 * ox), Math.round(6 * k + oy + 60),
      `<polygon points="${pt(O)} ${pt(E)} ${pt(B)} ${pt(Fq)}" fill="#cfe3f7"/>`
      + `<polygon points="${pt(P(0, 0))} ${pt(B)} ${pt(P(6, 6))} ${pt(P(6, 0))}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<line x1="${O[0]}" y1="${O[1]}" x2="${Mq[0].toFixed(1)}" y2="${Mq[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"/>`
      + `<line x1="${O[0]}" y1="${O[1]}" x2="${Nq[0].toFixed(1)}" y2="${Nq[1].toFixed(1)}" stroke="#2b2b2b" stroke-width="1.6"/>`
      + S.text('A', P(0, 0)[0] - 10, P(0, 0)[1] + 4) + S.text('B', B[0] - 10, B[1] + 14) + S.text('C', P(6, 6)[0] + 10, P(6, 6)[1] + 14)
      + S.text('D', P(6, 0)[0] + 10, P(6, 0)[1] + 4) + S.text('O', O[0] + 12, O[1] - 2) + S.text('E', E[0] - 10, E[1] - 2)
      + S.text('F', Fq[0] + 2, Fq[1] + 16) + S.text('M', Mq[0] - 8, Mq[1] + 8) + S.text('N', Nq[0] + 10, Nq[1] + 6));
  }

  // c03：4×4 方格，已涂黑三格：第 1 行第 1 格（角）、第 1 行第 2 格（边）、第 2 行第 2 格（中间）
  {
    const u = 34;
    const ox = 14;
    const oy = 12;
    const black = [[0, 0], [1, 0], [1, 1]];  // [列, 行]
    out.c03 = S.wrap(4 * u + 2 * ox, 4 * u + 2 * oy,
      black.map(([c, r]) => `<rect x="${ox + c * u}" y="${oy + r * u}" width="${u}" height="${u}" fill="#444"/>`).join('')
      + `<rect x="${ox}" y="${oy}" width="${4 * u}" height="${4 * u}" fill="none" stroke="#2b2b2b" stroke-width="1.6"/>`
      + [1, 2, 3].map(i => `<line x1="${ox + i * u}" y1="${oy}" x2="${ox + i * u}" y2="${oy + 4 * u}" stroke="#2b2b2b" stroke-width="1"/><line x1="${ox}" y1="${oy + i * u}" x2="${ox + 4 * u}" y2="${oy + i * u}" stroke="#2b2b2b" stroke-width="1"/>`).join(''));
  }
  // c05：A(0,0)、B(3,1)、C(1,3)（向上为正），三个外正方形的外顶点 (1,−3)(4,−2)(5,3)(3,5)(−2,4)(−3,1)，网格 x∈[−3,5]、y∈[−3,5]
  {
    const u = 22;
    const ox = 14;
    const oy = 12;
    const P = ([x, y]) => [ox + (x + 3) * u, oy + (5 - y) * u];
    const pt = p => P(p).join(',');
    const sqs = [[[0, 0], [3, 1], [4, -2], [1, -3]], [[3, 1], [1, 3], [3, 5], [5, 3]], [[1, 3], [0, 0], [-3, 1], [-2, 4]]];
    out.c05 = S.wrap(8 * u + 2 * ox, 8 * u + 2 * oy,
      S.grid(ox, oy, 8, 8, u)
      + sqs.map(q => `<polygon points="${q.map(pt).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="1.3" stroke-dasharray="5 3"/>`).join('')
      + `<polygon points="${[[0, 0], [3, 1], [1, 3]].map(pt).join(' ')}" fill="#cfe3f7" stroke="#2b2b2b" stroke-width="1.8"/>`
      + S.text('A', P([0, 0])[0] - 10, P([0, 0])[1] + 4) + S.text('B', P([3, 1])[0] + 10, P([3, 1])[1] + 4) + S.text('C', P([1, 3])[0] - 4, P([1, 3])[1] - 7));
  }
  return out;
})();

Content.section({
  id: 'math/sh2024/g7s1/14.2',
  title: '旋转',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。第 1 轮 c01 三空都能用特殊位置猜出、c02（三条射线互为平分线）只到真卷压轴、c05（数轴上转 180° 找规律）偏弱、c04(1) 用到“垂线段最短”（七下），e03、b07 缺旋转方向，b04 与卡片例子太近，2026 周期出现三次；第 2 轮 c01 改为由 BE 求 BF 再推广到正六边形、正八边形，c02 加 OC 折返，c04(1) 题干给出最近点，c05 换成两边向外作正方形，e01(2) 改为绕另一格点旋转；第 3 轮 c05 改为方格纸三正方形求六边形面积，并按复核建议加 (3) 不在格点上的一般情形（答案 134），复核方确认答案 134 即判定整节通过。可选意见：c01(2)(3) 可按比例猜答案；c02 与旋转性质的联系偏向六年级动角题' },

  intro: [
    {
      title: '图形的旋转',
      body: '在平面上，把一个图形上的**所有点**绕一个定点按某个方向（顺时针或逆时针）转动一个角度，叫作图形的旋转。这个定点叫**旋转中心**，转动的角叫**旋转角**，规定旋转角大于 $0^\\circ$、小于 $360^\\circ$。',
      example: '电扇叶片绕中心 $O$ 按顺时针方向转动 $150^\\circ$：旋转中心是 $O$，旋转角是 $150^\\circ$。',
    },
    {
      title: '旋转的性质',
      body: '旋转后：① 每组对应点到旋转中心的距离相等；② 每组对应点与旋转中心连线所成的角都等于旋转角；③ 对应线段相等，对应角相等；④ 形状相同、大小相等。',
      pitfall: '对应点的连线一般**不经过**旋转中心；旋转中心可以在图形上、图形内，也可以在图形外。',
    },
    {
      title: '找旋转中心和旋转角',
      body: '旋转中心是唯一不动的点，它到每组对应点的距离都相等；找到一组对应点 $P$、$P\'$ 后，旋转角就是 $\\angle POP\'$（$O$ 是旋转中心）。画旋转后的图形时，先旋转关键点，再按原顺序连接。',
      example: '点 $P$ 绕点 $O$ 逆时针旋转 $60^\\circ$ 到 $P\'$，则 $OP\'=OP$，$\\angle POP\'=60^\\circ$。',
    },
    {
      title: '旋转与圆',
      body: '一个点绕旋转中心旋转，经过的路线是一段**圆弧**，半径是这个点到旋转中心的距离；一条线段绕它的一个端点旋转，扫过的区域是一个**扇形**。所以弧长、扇形面积的公式经常和旋转一起用。',
      example: '线段 $OP=2$ 绕点 $O$ 旋转 $90^\\circ$：点 $P$ 经过的路线长 $\\frac{90}{360}\\times2\\pi\\times2=\\pi$，扫过的扇形面积 $\\frac{90}{360}\\times\\pi\\times2^{2}=\\pi$。',
    },
    {
      title: '旋转后与自身重合',
      body: '有些图形绕某一点旋转一定角度后能与自身重合，这个角度最小是多少、还有哪些角度也可以，是常见问题：如果转 $\\alpha$ 能重合，那么转 $2\\alpha$、$3\\alpha$……（小于 $360^\\circ$）也都能重合。',
      example: '一个四片叶子的风车图案，相邻叶片的位置相差 $90^\\circ$，绕中心至少旋转 $90^\\circ$ 与自身重合，旋转 $180^\\circ$、$270^\\circ$ 也可以。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '14.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 旋转中心可以在图形的外部；② 旋转会改变图形的形状；③ 旋转后，对应点到旋转中心的距离相等；④ 旋转角可以是 $360^\\circ$；⑤ 旋转后，对应点的连线都经过旋转中心。其中正确的有（　　）',
      options: ['$1$ 个', '$2$ 个', '$3$ 个', '$4$ 个'],
      answer: 1,
      explain: [
        '① 正确，旋转中心可以在任何位置。③ 正确，这是旋转的性质。',
        '② 错误，旋转不改变形状和大小。④ 错误，规定旋转角大于 $0^\\circ$、小于 $360^\\circ$。',
        '⑤ 错误：只有旋转 $180^\\circ$ 时对应点的连线才经过旋转中心，一般不经过。',
        '正确的有 ①③，共 $2$ 个，选 B。',
      ],
    },
    {
      id: '14.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '一个正五角星（五个角完全一样）绕它的中心至少旋转多少度，才能与原来的图形重合？',
      blanks: [
        { kind: 'num', label: '至少旋转（度）', answer: '72' },
      ],
      explain: [
        '五个角均匀地分布在中心周围，转一周 $360^\\circ$ 经过 $5$ 个角，相邻两个角的位置相差 $360^\\circ\\div5=72^\\circ$。',
        '旋转 $72^\\circ$，每个角正好转到相邻角的位置，图形与原来重合。',
        '常见错误：五角星的十个顶点（五个外角尖、五个内凹点）都算上，得 $36^\\circ$；但外角尖和内凹点形状不同，转 $36^\\circ$ 时外角尖会转到内凹点的位置，不能重合。',
      ],
      verify: () => {
        // 外角尖的方向为 90°+72°k，内凹点为 90°+36°+72°k；找最小的 θ 使外角尖集合转动后不变
        const tips = [0, 1, 2, 3, 4].map(k => (90 + 72 * k) % 360);
        for (let th = 1; th < 360; th++) {
          if (tips.every(a => tips.includes((a + th) % 360))) return th;
        }
        return null;
      },
    },
    {
      id: '14.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '$\\angle AOB=40^\\circ$，射线 $OB$ 在射线 $OA$ 的逆时针方向。把 $\\angle AOB$ 绕点 $O$ 按**顺时针**方向旋转 $70^\\circ$ 得到 $\\angle A\'OB\'$（$A$、$B$ 的对应点分别是 $A\'$、$B\'$）。求 $\\angle AOB\'$ 和 $\\angle A\'OB$ 的度数。',
      blanks: [
        { kind: 'num', label: '$\\angle AOB\'=$（度）', answer: '30' },
        { kind: 'num', label: '$\\angle A\'OB=$（度）', answer: '110' },
      ],
      explain: [
        '以 $OA$ 为起点，逆时针方向的度数为正：$OA$ 在 $0^\\circ$，$OB$ 在 $40^\\circ$。',
        '顺时针旋转 $70^\\circ$ 后，$OA\'$ 在 $-70^\\circ$，$OB\'$ 在 $40^\\circ-70^\\circ=-30^\\circ$，即 $OB\'$ 在 $OA$ 的顺时针方向 $30^\\circ$ 处。',
        '$\\angle AOB\'=30^\\circ$；$\\angle A\'OB=70^\\circ+40^\\circ=110^\\circ$。',
        '常见错误：没注意旋转方向，按逆时针旋转算出 $\\angle AOB\'=110^\\circ$、$\\angle A\'OB=30^\\circ$。',
      ],
      verify: () => {
        const pos = { A: 0, B: 40 };
        const A2 = pos.A - 70;
        const B2 = pos.B - 70;
        const ang = (p, q) => {
          const d = Math.abs(p - q) % 360;
          return d > 180 ? 360 - d : d;
        };
        return [ang(pos.A, B2), ang(A2, pos.B)];
      },
    },
    {
      id: '14.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '三角形 $OAB$ 中 $OA=6$，$AB=4$，把它绕点 $O$ 逆时针旋转 $120^\\circ$。求点 $A$ 经过的路线长（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '路线长', answer: '4π' },
      ],
      explain: [
        '点 $A$ 绕点 $O$ 旋转，经过的路线是以 $O$ 为圆心、$OA$ 为半径的一段圆弧，圆心角是旋转角 $120^\\circ$。',
        '路线长 $=\\frac{120}{360}\\times2\\pi\\times6=4\\pi$。',
        '常见错误：用 $AB=4$ 作半径，得 $\\frac83\\pi$；或者算成扇形面积 $12\\pi$。',
      ],
      verify: () => F(120).div(360).mul(2).mul(6).toString() + 'π',
    },
    {
      id: '14.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '长为 $6$ 的线段 $AB$ 绕它的中点 $O$ 旋转 $60^\\circ$，求线段 $AB$ 扫过的区域的面积（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '面积', answer: '3π' },
      ],
      explain: [
        '绕中点旋转时，$OA$、$OB$ 各扫过一个扇形，半径都是 $3$，圆心角都是 $60^\\circ$。',
        '面积 $=2\\times\\frac{60}{360}\\times\\pi\\times3^{2}=3\\pi$。',
        '常见错误：把它当成绕端点旋转，用半径 $6$ 得 $6\\pi$；或者只算了一个扇形，得 $\\frac32\\pi$。',
      ],
      verify: () => F(2).mul(60).div(360).mul(9).toString() + 'π',
    },
    {
      id: '14.2-b06',
      level: 'basic',
      type: 'choice',
      stem: '如图，在方格纸中，三角形 $ABC$ 绕某一个格点按顺时针方向旋转 $90^\\circ$ 得到三角形 $A\'B\'C\'$，旋转中心是（　　）',
      figure: FIG142.b06,
      options: ['点 $P$', '点 $Q$', '点 $R$', '点 $S$'],
      answer: 0,
      explain: [
        '旋转中心到每组对应点的距离相等，并且对应点与旋转中心连线的夹角是 $90^\\circ$。',
        '看点 $P$：$A$ 在 $P$ 右 $1$ 格、上 $3$ 格，$A\'$ 在 $P$ 右 $3$ 格、下 $1$ 格，绕 $P$ 顺时针转 $90^\\circ$ 正好从 $A$ 到 $A\'$；$B$、$C$ 也一样。选 A。',
        '常见错误：选两个三角形“中间”的点 $R$；用 $A$、$A\'$ 检验 $R$：$A$ 在 $R$ 左 $1$ 格、上 $2$ 格，$A\'$ 在 $R$ 右 $1$ 格、下 $2$ 格，这是转了 $180^\\circ$，不是 $90^\\circ$。',
      ],
      verify: () => {
        const tri = [[5, 1], [7, 1], [5, 2]];
        const img = tri.map(p => rot90142(p, [4, 4], true));
        const cands = [[4, 4], [5, 4], [6, 3], [4, 3]];
        return cands.findIndex(c => tri.every((p, i) => {
          const q = rot90142(p, c, true);
          return q[0] === img[i][0] && q[1] === img[i][1];
        }));
      },
    },
    {
      id: '14.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '如图，$E$ 是正方形 $ABCD$ 的边 $BC$ 上一点，三角形 $ABE$ 绕点 $A$ 按逆时针方向旋转后与三角形 $ADF$ 重合（点 $F$ 在 $CD$ 的延长线上）。若 $\\angle BAE=25^\\circ$，求旋转角的度数和 $\\angle BAF$ 的度数。',
      figure: FIG142.b07,
      blanks: [
        { kind: 'num', label: '旋转角（度）', answer: '90' },
        { kind: 'num', label: '$\\angle BAF=$（度）', answer: '115' },
      ],
      explain: [
        '点 $B$ 的对应点是 $D$，旋转角是 $\\angle BAD=90^\\circ$（也等于 $\\angle EAF$）。',
        '$\\angle DAF$ 是 $\\angle BAE$ 的对应角，$\\angle DAF=25^\\circ$。',
        '$\\angle BAF=\\angle BAD+\\angle DAF=90^\\circ+25^\\circ=115^\\circ$。',
        '常见错误：以为旋转角是 $\\angle BAE$ 或 $\\angle EAD$；或者 $\\angle BAF$ 算成 $90^\\circ-25^\\circ=65^\\circ$。',
      ],
      verify: () => {
        // 以 AB 方向为 0°，向 AD 方向为正：AD 在 90°，AE 在 25°，AF = AE 再转 90°
        const ad = 90;
        const ae = 25;
        const af = ae + (ad - 0);
        return [ad - 0, af];
      },
    },
    {
      id: '14.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '数轴上点 $A$ 表示 $3$。把点 $A$ 绕数轴上表示 $-1$ 的点 $M$ 旋转 $180^\\circ$，得到点 $A\'$，求点 $A\'$ 表示的数。',
      blanks: [
        { kind: 'num', label: '$A\'$ 表示', answer: '-5' },
      ],
      explain: [
        '旋转 $180^\\circ$ 后，$A\'$ 在数轴上，且在 $M$ 的另一侧，$MA\'=MA$。',
        '$MA=3-(-1)=4$，$A\'$ 在 $M$ 左边 $4$ 个单位：$-1-4=-5$。',
        '常见错误：当成绕原点旋转，得 $-3$。',
      ],
      verify: () => F(-1).sub(F(3).sub(-1)),
    },
    {
      id: '14.2-b09',
      level: 'basic',
      type: 'choice',
      stem: '下列图形中，绕它的中心旋转 $90^\\circ$ 后能与自身重合的是（　　）',
      options: ['正五边形', '长方形（长、宽不相等）', '正方形', '等边三角形'],
      answer: 2,
      explain: [
        '正方形四条边一样长、四个角都是直角，转 $90^\\circ$ 后每个顶点转到相邻顶点的位置，能重合，选 C。',
        '长方形长、宽不等，转 $90^\\circ$ 后长边竖起来，不能重合，要转 $180^\\circ$ 才行。',
        '正五边形至少转 $360^\\circ\\div5=72^\\circ$，转 $90^\\circ$ 不行；等边三角形至少转 $120^\\circ$。',
      ],
      verify: () => {
        // 各图形能与自身重合的旋转角：正五边形 72k，长方形 180，正方形 90k，等边三角形 120k
        const sets = [[72, 144, 216, 288], [180], [90, 180, 270], [120, 240]];
        return sets.findIndex(s => s.includes(90));
      },
    },

    // ---------- 扩展 ----------
    {
      id: '14.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '在方格纸上，点 $A$ 在格点 $O$ 的右方 $3$ 格、上方 $1$ 格，格点 $Q$ 在 $O$ 的右方 $2$ 格。(1) 把点 $A$ 绕点 $O$ 顺时针旋转 $90^\\circ$ 得到点 $A_{1}$，$A_{1}$ 在 $O$ 的右方几格、上方几格？(2) 再把点 $A_{1}$ 绕点 $Q$ 逆时针旋转 $90^\\circ$ 得到点 $A_{2}$，$A_{2}$ 在 $O$ 的右方几格、上方几格？（在左方、下方用负数表示）',
      blanks: [
        { kind: 'num', label: '(1) 右方', answer: '1' },
        { kind: 'num', label: '上方', answer: '-3' },
        { kind: 'num', label: '(2) 右方', answer: '5' },
        { kind: 'num', label: '上方', answer: '-1' },
      ],
      explain: [
        '(1) 从 $O$ 到 $A$ 是“右 $3$、上 $1$”。顺时针转 $90^\\circ$，“向右”变成“向下”，“向上”变成“向右”：变成“下 $3$、右 $1$”，即右方 $1$ 格、上方 $-3$ 格。画出来检验：两条线段长度相等，夹角是直角。',
        '(2) 这次旋转中心是 $Q$，要先看 $A_{1}$ 相对 $Q$ 的位置：$A_{1}$ 在 $O$ 右 $1$、下 $3$，$Q$ 在 $O$ 右 $2$，所以 $A_{1}$ 在 $Q$ 的左 $1$、下 $3$。',
        '逆时针转 $90^\\circ$，“向左”变成“向下”，“向下”变成“向右”：变成“下 $1$、右 $3$”，$A_{2}$ 在 $Q$ 右 $3$、下 $1$，即在 $O$ 右 $5$、下 $1$。',
        '常见错误：(1) 方向转反；(2) 仍然按相对 $O$ 的位置去转，得到“右 $3$、上 $1$”（以为两次旋转抵消了）。',
      ],
      verify: () => {
        // 屏幕坐标：右为 +x，下为 +y
        const A1 = rot90142([3, -1], [0, 0], true);
        const A2 = rot90142(A1, [2, 0], false);
        return [A1[0], -A1[1], A2[0], -A2[1]];
      },
    },
    {
      id: '14.2-e02',
      level: 'extended',
      type: 'multi',
      stem: '一个图形绕它的中心旋转 $40^\\circ$ 后能与自身重合。那么它绕中心旋转下列哪些角度后，**一定**能与自身重合？（多选）',
      options: ['$80^\\circ$', '$100^\\circ$', '$120^\\circ$', '$200^\\circ$', '$320^\\circ$'],
      answer: [0, 2, 3, 4],
      explain: [
        '转 $40^\\circ$ 能重合，再转 $40^\\circ$ 还是重合，所以转 $40^\\circ$ 的整数倍（小于 $360^\\circ$）都一定能重合：$80^\\circ$、$120^\\circ$、$160^\\circ$、$200^\\circ$、$240^\\circ$、$280^\\circ$、$320^\\circ$。',
        '$100^\\circ$ 不是 $40^\\circ$ 的整数倍。有的图形转 $100^\\circ$ 也能重合（比如最小旋转角是 $20^\\circ$ 的图形），但不是“一定”：最小旋转角恰好是 $40^\\circ$ 的图形（如九片叶子的风车）转 $100^\\circ$ 不能重合。',
        '所以选 $80^\\circ$、$120^\\circ$、$200^\\circ$、$320^\\circ$。常见错误：以为 $320^\\circ$ 太大不行，或者把 $100^\\circ$ 也选上。',
      ],
      verify: () => [80, 100, 120, 200, 320].map((a, i) => (a % 40 === 0 ? i : -1)).filter(i => i >= 0),
    },
    {
      id: '14.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '三角形 $ABC$ 中 $AB=4$，$AC=7$，$\\angle BAC=50^\\circ$，射线 $AC$ 在射线 $AB$ 的逆时针方向。把三角形 $ABC$ 绕点 $A$ 逆时针旋转，使点 $B$ 的对应点 $B\'$ 恰好落在边 $AC$ 上，点 $C$ 的对应点为 $C\'$。求：(1) $B\'C$ 的长；(2) $\\angle BAC\'$ 的度数；(3) 点 $C$ 经过的路线长（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'num', label: '(1) $B\'C=$', answer: '3' },
        { kind: 'num', label: '(2) $\\angle BAC\'=$（度）', answer: '100' },
        { kind: 'real', label: '(3) 路线长', answer: '35π/18' },
      ],
      explain: [
        '$B\'$ 落在 $AC$ 上，说明 $AB$ 转到了 $AC$ 的方向，旋转角 $=\\angle BAB\'=\\angle BAC=50^\\circ$。',
        '(1) $AB\'=AB=4$，$B\'C=AC-AB\'=7-4=3$。',
        '(2) $\\angle CAC\'=50^\\circ$（旋转角），$\\angle BAC\'=\\angle BAC+\\angle CAC\'=50^\\circ+50^\\circ=100^\\circ$。',
        '(3) 点 $C$ 绕 $A$ 转 $50^\\circ$，半径 $AC=7$：路线长 $=\\frac{50}{360}\\times2\\pi\\times7=\\frac{35}{18}\\pi$。',
        '常见错误：(2) 以为 $C\'$ 也在 $AC$ 上；(3) 用 $AB$ 作半径。',
      ],
      verify: () => {
        const rot = 50;
        return [F(7).sub(4), 50 + rot, F(rot).div(360).mul(2).mul(7).toString().replace(/^(\d+)\/(\d+)$/, '$1π/$2')];
      },
    },
    {
      id: '14.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '把一个图形绕点 $O$ 按逆时针方向连续旋转，每次旋转 $75^\\circ$。(1) 至少旋转几次后，图形第一次回到原来的位置？(2) 旋转 $2026$ 次后，图形的位置相当于把原图形绕点 $O$ 逆时针旋转了多少度（大于等于 $0^\\circ$、小于 $360^\\circ$）？',
      blanks: [
        { kind: 'num', label: '(1) 次数', answer: '24' },
        { kind: 'num', label: '(2) 度数', answer: '30' },
      ],
      explain: [
        '(1) 回到原位，转过的总角度要是 $360^\\circ$ 的整数倍，也是 $75^\\circ$ 的整数倍，最少是 $75$ 与 $360$ 的最小公倍数。',
        '$75=3\\times5^{2}$，$360=2^{3}\\times3^{2}\\times5$，最小公倍数 $=2^{3}\\times3^{2}\\times5^{2}=1800$，次数 $=1800\\div75=24$。',
        '(2) 每 $24$ 次回到原位，$2026=24\\times84+10$，相当于旋转 $10$ 次，$75^\\circ\\times10=750^\\circ=360^\\circ\\times2+30^\\circ$，相当于逆时针旋转 $30^\\circ$。',
        '常见错误：(1) 用 $360\\div75$ 不是整数就以为回不到原位；(2) 直接用 $2026\\times75$ 除以 $360$ 时算错余数。',
      ],
      verify: () => {
        let n = 1;
        while ((75 * n) % 360 !== 0) n++;
        return [n, (75 * 2026) % 360];
      },
    },
    {
      id: '14.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，方格纸中每个小方格的边长为 $1$，把线段 $OA$ 绕格点 $O$ 逆时针旋转 $90^\\circ$ 得到线段 $OA\'$。求：(1) 三角形 $AOA\'$ 的面积；(2) 线段 $OA$ 扫过的扇形面积（结果保留 $\\pi$）。',
      figure: FIG142.e05,
      blanks: [
        { kind: 'num', label: '(1)', answer: '5' },
        { kind: 'real', label: '(2)', answer: '5π/2' },
      ],
      explain: [
        '先在图上画出 $A\'$：$A$ 在 $O$ 右 $3$、上 $1$，逆时针转 $90^\\circ$ 后“右”变“上”、“上”变“左”，$A\'$ 在 $O$ 左 $1$、上 $3$。',
        '(1) $\\angle AOA\'=90^\\circ$，$OA=OA\'$。用“补成长方形”：$A$、$O$、$A\'$ 所在的最小长方形横 $4$、竖 $3$，面积 $12$，减去三个直角三角形 $\\frac{3\\times1}{2}+\\frac{1\\times3}{2}+\\frac{4\\times2}{2}=7$，得 $5$。',
        '(2) 扇形面积 $=\\frac{90}{360}\\pi\\cdot OA^{2}$，要的是 $OA^{2}$，不需要知道 $OA$ 本身。三角形 $AOA\'$ 是两条直角边都等于 $OA$ 的直角三角形，面积 $=\\frac12OA^{2}=5$，所以 $OA^{2}=10$。',
        '扇形面积 $=\\frac14\\times10\\pi=\\frac52\\pi$。',
        '常见错误：把 $OA$ 当成 $3$ 或 $4$；(1) 补成长方形时减错三角形。',
      ],
      verify: () => {
        const O = [2, 4];
        const A = [5, 3];
        const A2 = rot90142(A, O, false);
        const area = Math.abs((A[0] - O[0]) * (A2[1] - O[1]) - (A[1] - O[1]) * (A2[0] - O[0])) / 2;
        const r2 = (A[0] - O[0]) ** 2 + (A[1] - O[1]) ** 2;
        return [area, F(r2).div(4).toString().replace(/^(\d+)\/(\d+)$/, '$1π/$2')];
      },
    },
    {
      id: '14.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '如图，方格纸中有两个大小相同的正方形 $ABCD$ 和 $EFGH$。正方形 $ABCD$ 绕平面内某一点旋转一个角度（大于 $0^\\circ$、小于 $360^\\circ$）后，能与正方形 $EFGH$ 完全重合（顶点不要求按字母对应）。(1) 这样的旋转中心一共有几个？(2) 若按顺时针方向旋转 $90^\\circ$，旋转中心是图中的哪一点？',
      figure: FIG142.e06,
      blanks: [
        { kind: 'num', label: '(1) 个数', answer: '3' },
        { kind: 'text', label: '(2) 旋转中心', answer: 'M', options: ['M', 'N', 'P', 'Q'] },
      ],
      explain: [
        '两个正方形的边都是水平、竖直的。旋转后边还要是水平、竖直的，旋转角只能是 $90^\\circ$、$180^\\circ$ 或 $270^\\circ$（顺时针、逆时针说法不同，但位置只有这三种）。',
        '对每一个旋转角，旋转中心要把正方形 $ABCD$ 的中心转到正方形 $EFGH$ 的中心，并且两个中心到旋转中心的距离相等、连线夹角等于旋转角，这样的点只有一个。所以旋转中心一共有 $3$ 个。',
        '(2) $ABCD$ 的中心在 $M$ 左 $4$ 格，$EFGH$ 的中心在 $M$ 上 $4$ 格；绕 $M$ 顺时针转 $90^\\circ$，“向左 $4$”正好变成“向上 $4$”，所以中心是 $M$。',
        '检验其他点：绕 $P$ 是转 $180^\\circ$；绕 $N$ 是逆时针转 $90^\\circ$（即顺时针 $270^\\circ$）；$Q$ 到两个中心的距离不相等。',
        '常见错误：(1) 只想到两个正方形中间的一个点（转 $180^\\circ$），得 $1$。',
      ],
      verify: () => {
        // 正方形 ABCD 的四个顶点，绕候选点旋转后与 EFGH 的顶点集合比较；旋转角枚举 90°、180°、270°（以 1/2 格为步长找中心）
        const s1 = [[0, 4], [2, 4], [2, 6], [0, 6]];
        const s2 = ['4,0', '6,0', '6,2', '4,2'];
        const rotK = (p, c, k) => {
          let q = p;
          for (let i = 0; i < k; i++) q = rot90142(q, c, true);
          return q;
        };
        const centers = [];
        for (let k = 1; k <= 3; k++) {
          for (let x = -10; x <= 20; x++) {
            for (let y = -10; y <= 20; y++) {
              const c = [x / 2, y / 2];
              const img = s1.map(p => rotK(p, c, k).join(','));
              if (img.every(v => s2.includes(v))) centers.push([k, c]);
            }
          }
        }
        const cw90 = centers.find(([k]) => k === 1)[1];
        const names = { '5,5': 'M', '1,1': 'N', '3,3': 'P', '5,3': 'Q' };
        return [centers.length, names[cw90.join(',')]];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '14.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 如图，正方形 $ABCD$ 的边长为 $6$，$O$ 是它的中心。一个直角 $\\angle MON$ 的顶点放在 $O$，绕 $O$ 旋转，$OM$ 与边 $AB$ 交于点 $E$，$ON$ 与边 $BC$ 交于点 $F$。当 $BE=2$ 时，求三角形 $BEF$ 的面积。(2) 一个正六边形的面积为 $36$，$O$ 是它的中心。把一个 $60^\\circ$ 的角的顶点放在 $O$ 绕 $O$ 旋转，角的两边分别与正六边形的两条边相交，求角的内部与正六边形重叠部分的面积。(3) 一个正八边形的面积为 $48$，$O$ 是它的中心。把一个 $135^\\circ$ 的角的顶点放在 $O$ 绕 $O$ 旋转（两边都与正八边形的边相交），重叠部分的面积是多少？',
      figure: FIG142.c01,
      blanks: [
        { kind: 'num', label: '(1)', answer: '4' },
        { kind: 'num', label: '(2)', answer: '6' },
        { kind: 'num', label: '(3)', answer: '18' },
      ],
      explain: [
        '(1) 只知道 $BE$，还要 $BF$。关键想法：用旋转把 $BF$ “搬”到已知的地方。正方形绕中心 $O$ 顺时针旋转 $90^\\circ$ 后与自身重合，$A$ 转到 $B$，$B$ 转到 $C$，边 $AB$ 转到边 $BC$。',
        '$\\angle MON=90^\\circ$，射线 $OM$ 顺时针转 $90^\\circ$ 正好是射线 $ON$。点 $E$ 既在 $OM$ 上又在 $AB$ 上，转过去后既在 $ON$ 上又在 $BC$ 上，就是点 $F$。所以线段 $AE$ 转到线段 $BF$，$BF=AE=6-2=4$。',
        '三角形 $BEF$ 中 $\\angle B=90^\\circ$，面积 $=\\frac12\\times2\\times4=4$。（同样的道理，三角形 $OBE$ 转到三角形 $OCF$，四边形 $OEBF$ 的面积总是三角形 $OBC$ 的面积 $9$。）',
        '(2) 推广：上面的办法要求“图形绕 $O$ 转过角的度数后与自身重合”。正六边形绕中心转 $60^\\circ$ 与自身重合，角的一边转 $60^\\circ$ 正好是另一边。设角的两边与正六边形的边交于 $E$、$F$，$E$ 所在的边与 $F$ 所在的边相邻，公共顶点为 $P$，则三角形 $OPE$ 转到三角形 $OP\'F$（$P\'$ 是 $P$ 的下一个顶点），重叠部分的面积 $=$ 三角形 $OPP\'$ 的面积，是正六边形的 $\\frac16$，即 $6$。',
        '(3) 正八边形绕中心转 $45^\\circ$ 与自身重合，$135^\\circ=3\\times45^\\circ$，转 $135^\\circ$ 也与自身重合，同样可以搬，重叠部分面积不变。取一个特殊位置计算：角的两边都过顶点时，重叠部分是 $3$ 个“中心三角形”（每个是正八边形的 $\\frac18$），面积 $=\\frac38\\times48=18$。',
        '常见错误：(1) 以为 $BF=BE$；(2)(3) 以为重叠部分随着旋转而变化，或者 (2) 直接套 (1) 的 $\\frac14$。',
      ],
      verify: () => {
        // (1) 按坐标计算：A(0,0) 左上、B(0,6)、C(6,6)，O(3,3)；E(0,4)（BE=2），F 在 BC 上且 OE⊥OF
        const E = [F(0), F(4)];
        const O = [F(3), F(3)];
        const v = [E[0].sub(O[0]), E[1].sub(O[1])];  // OE 方向
        // OF 方向为 OE 绕 O 转 90°（屏幕上逆时针）：(x,y)→(y,−x)
        const w = [v[1], v[0].neg()];
        const t = F(3).div(w[1]);  // 交 BC：y=6
        const Fx = O[0].add(w[0].mul(t));
        const s1 = F('1/2').mul(2).mul(Fx);  // BE=2，BF=Fx
        // (2)(3) 数值：极坐标积分，检查不同起始方向下重叠面积不变
        const overlapReg = (n, area, start, alpha) => {
          const R = Math.sqrt(area / ((n / 2) * Math.sin((2 * Math.PI) / n)));
          const apo = R * Math.cos(Math.PI / n);
          const steps = 3000;
          let s = 0;
          for (let i = 0; i < steps; i++) {
            const th = start + ((i + 0.5) / steps) * alpha;
            const seg = (2 * Math.PI) / n;
            const tt = ((th % seg) + seg) % seg - seg / 2;
            const r = apo / Math.cos(tt);
            s += (r * r) / 2 * (alpha / steps);
          }
          return s;
        };
        const a2 = [0.05, 0.3, 0.7].map(st => overlapReg(6, 36, st, Math.PI / 3));
        const a3 = [0.05, 0.3, 0.6].map(st => overlapReg(8, 48, st, (3 * Math.PI) / 4));
        const same = (a, v2) => a.every(x => Math.abs(x - v2) < 1e-3);
        return [s1, same(a2, 6) ? 6 : null, same(a3, 18) ? 18 : null];
      },
    },
    {
      id: '14.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '点 $O$ 在直线 $AB$ 上，射线 $OE$ 在直线 $AB$ 上方，$\\angle AOE=110^\\circ$。射线 $OC$ 从 $OA$ 出发，绕点 $O$ 在直线 $AB$ 上方以每秒 $8^\\circ$ 的速度向 $OB$ 旋转；同时射线 $OD$ 从 $OB$ 出发，绕点 $O$ 在直线 $AB$ 上方以每秒 $4^\\circ$ 的速度向 $OA$ 旋转。$OC$ 到达 $OB$ 后立即按原速度返回，绕点 $O$ 在直线 $AB$ 上方向 $OA$ 旋转；当 $OD$ 到达 $OA$ 时两条射线都停止。在运动过程中，当 $OC$、$OD$、$OE$ 中有一条射线平分另外两条射线所成的角时，求运动时间 $t$（秒）（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$t=$', answer: ['10', '29/2', '125/8', '80/3', '215/6'] },
      ],
      explain: [
        '用“从 $OA$ 开始转过的度数”表示每条射线的位置。$OD$ 在 $(180-4t)^\\circ$，$0\\le t\\le45$；$OE$ 在 $110^\\circ$；$OC$ 去程（$0\\le t\\le22.5$）在 $8t^\\circ$，返程（$22.5\\le t\\le45$）在 $(360-8t)^\\circ$。三条射线都在直线上方，两条射线所成的角就是位置之差。',
        '一条射线平分另两条所成的角，它的位置是另两条位置的平均数（而且在另两条中间）。去程、返程各分三种情况。',
        '去程：① $OE$ 平分：$\\frac{8t+180-4t}{2}=110$，$t=10$（$OC$ 在 $80^\\circ$、$OD$ 在 $140^\\circ$，符合）；② $OC$ 平分：$8t=\\frac{110+180-4t}{2}$，$t=\\frac{29}{2}$（$OC$ 在 $116^\\circ$，$OD$ 在 $122^\\circ$，符合）；③ $OD$ 平分：$180-4t=\\frac{8t+110}{2}$，$t=\\frac{125}{8}$（符合）。',
        '返程：① $OE$ 平分：$\\frac{360-8t+180-4t}{2}=110$，$t=\\frac{80}{3}$（$OC$ 约在 $146.7^\\circ$、$OD$ 约在 $73.3^\\circ$，$OE$ 在中间，符合）；② $OC$ 平分：$2(360-8t)=110+180-4t$，$t=\\frac{215}{6}$（$OC$ 约在 $73.3^\\circ$，在 $OD$（约 $36.7^\\circ$）与 $OE$ 中间，符合）；③ $OD$ 平分：$2(180-4t)=360-8t+110$，化简得 $360=470$，无解。',
        '所以 $t=10$、$\\frac{29}{2}$、$\\frac{125}{8}$、$\\frac{80}{3}$ 或 $\\frac{215}{6}$。常见错误：只考虑固定射线 $OE$ 作平分线；或者返程仍用 $8t$ 表示 $OC$ 的位置。',
      ],
      verify: () => {
        const res = [];
        for (let k = 0; k <= 45 * 48; k++) {
          const t = F(k).div(48);
          const C = t.cmp(F('45/2')) <= 0 ? t.mul(8) : F(360).sub(t.mul(8));
          const D = F(180).sub(t.mul(4));
          const E = F(110);
          const rays = [C, D, E];
          const ok = [0, 1, 2].some(i => {
            const [p, q] = rays.filter((_, j) => j !== i);
            return !p.eq(q) && rays[i].mul(2).eq(p.add(q));
          });
          if (ok) res.push(t);
        }
        return res;
      },
    },
    {
      id: '14.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，$4\\times4$ 的方格中已经涂黑了 $3$ 个小方格。(1) 至少再涂黑几个小方格，才能使整个图形绕方格的中心旋转 $90^\\circ$ 后与自身重合？(2) 如果只要求绕中心旋转 $180^\\circ$ 后与自身重合，至少再涂黑几个？(3) 如果既可以涂黑白格，也可以把黑格擦成白格，要使图形绕中心旋转 $90^\\circ$ 后与自身重合，并且至少有一个黑格，最少要改变几个小方格的颜色？',
      figure: FIG142.c03,
      blanks: [
        { kind: 'num', label: '(1)', answer: '9' },
        { kind: 'num', label: '(2)', answer: '3' },
        { kind: 'num', label: '(3)', answer: '5' },
      ],
      explain: [
        '关键想法：一个格子绕中心每转 $90^\\circ$ 到一个新位置，转 $4$ 次回来，这 $4$ 个位置要么全黑、要么全白。$16$ 个格子正好分成 $4$ 组，每组 $4$ 个：四个角一组；中间 $2\\times2$ 的四格一组；边上的 $8$ 个格子分成两组（第 $1$ 行第 $2$ 格、第 $2$ 行第 $4$ 格、第 $4$ 行第 $3$ 格、第 $3$ 行第 $1$ 格为一组，其余四个为另一组）。',
        '(1) 已涂黑的 $3$ 格分别在“四角组”“中间组”和一个“边组”里，这三组都要全涂黑，共 $12$ 格，还要再涂 $12-3=9$ 个。',
        '(2) 转 $180^\\circ$ 时，每个格子只和中心对面的一个格子配对。$3$ 个黑格的对面格子都是白的，各涂黑一个就行，至少 $3$ 个。（这时转 $90^\\circ$ 并不重合，但题目只要求 $180^\\circ$。）',
        '(3) 每组最后要么全黑（这组要涂黑 $4-$ 已有黑格数个），要么全白（要擦掉已有的黑格）。三组各有 $1$ 个黑格，另一边组没有黑格。',
        '只保留一组变成全黑：选一个有 $1$ 个黑格的组涂满（改 $3$ 个），另外两组各擦掉 $1$ 个（改 $2$ 个），共 $5$ 个；如果选没有黑格的那组涂满要改 $4+3=7$ 个；保留更多组只会更多。所以最少 $5$ 个。',
      ],
      verify: () => {
        // 格子 [行, 列]，0 起；绕中心顺时针转 90°：(r,c) → (c, 3−r)
        const rot = ([r, c]) => [c, 3 - r];
        const key = p => p.join(',');
        const black = new Set(['0,0', '0,1', '1,1']);
        const orbits = [];
        const seen = new Set();
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            if (seen.has(key([r, c]))) continue;
            const orb = [];
            let p = [r, c];
            for (let i = 0; i < 4; i++) {
              if (!orb.includes(key(p))) orb.push(key(p));
              seen.add(key(p));
              p = rot(p);
            }
            orbits.push(orb);
          }
        }
        const k = orbits.map(o => o.filter(x => black.has(x)).length);
        const add90 = orbits.reduce((s, o, i) => s + (k[i] > 0 ? o.length - k[i] : 0), 0);
        let add180 = 0;
        for (const b of black) {
          const [r, c] = b.split(',').map(Number);
          if (!black.has(key([3 - r, 3 - c]))) add180++;
        }
        // (3) 枚举每组全黑或全白（不能全白）
        let best = Infinity;
        for (let m = 1; m < 1 << orbits.length; m++) {
          let cost = 0;
          orbits.forEach((o, i) => { cost += (m >> i) & 1 ? o.length - k[i] : k[i]; });
          best = Math.min(best, cost);
        }
        return [add90, add180, best];
      },
    },
    {
      id: '14.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '直角三角形 $ABC$ 中，$\\angle ACB=90^\\circ$，$AC=6$，$BC=8$，$AB=10$。(1) 已知 $AB$ 边上的高 $CH$ 的垂足 $H$ 是边 $AB$ 上离点 $C$ 最近的点。把三角形 $ABC$ 绕点 $C$ 旋转一周，求边 $AB$ 扫过的区域的面积；(2) 把三角形 $ABC$ 绕点 $A$ 顺时针旋转 $90^\\circ$，求边 $BC$ 扫过的区域的面积。（结果保留 $\\pi$）',
      blanks: [
        { kind: 'real', label: '(1)', answer: '1024π/25' },
        { kind: 'real', label: '(2)', answer: '16π' },
      ],
      explain: [
        '思路：线段绕一点旋转，线段上每个点都画出一段圆弧。扫过的区域由线段上**离旋转中心最远**和**最近**的点决定。',
        '(1) 边 $AB$ 上离 $C$ 最远的点是 $B$（$CB=8$）；最近的点不是 $A$，而是高的垂足 $H$。先用面积求 $CH$：$\\frac12\\times6\\times8=\\frac12\\times10\\times CH$，$CH=\\frac{24}{5}$。',
        '旋转一周，到 $C$ 的距离在 $\\frac{24}{5}$ 到 $8$ 之间的点都被扫到，离 $C$ 更近的点扫不到。扫过的区域是一个圆环：面积 $=\\pi\\times8^{2}-\\pi\\times\\left(\\frac{24}{5}\\right)^{2}=64\\pi-\\frac{576}{25}\\pi=\\frac{1024}{25}\\pi$。',
        '(2) 边 $BC$ 上离 $A$ 最近的点是 $C$，最远的点是 $B$，用割补法：',
        '设旋转后为三角形 $AB\'C\'$。扫过的区域 $=$ 扇形 $BAB\'$ $+$ 三角形 $AB\'C\'$ $-$ 三角形 $ABC$ $-$ 扇形 $CAC\'$，两个三角形面积相等，所以等于两个扇形的面积差：$\\frac{90}{360}\\pi(10^{2}-6^{2})=16\\pi$。',
        '常见错误：(1) 把内圆半径当成 $CA=6$，得 $28\\pi$；(2) 把整个三角形扫过的面积当成边 $BC$ 扫过的面积。',
      ],
      verify: () => {
        // (1) 点 C 到线段 AB 上各点距离的最小值和最大值（C 在原点，A(0,6)，B(8,0)）
        let mn = null;
        let mx = null;
        for (let i = 0; i <= 1000; i++) {
          const t = F(i).div(1000);
          const x = F(8).mul(t);
          const y = F(6).mul(F(1).sub(t));
          const d2 = x.mul(x).add(y.mul(y));
          if (!mn || d2.cmp(mn) < 0) mn = d2;
          if (!mx || d2.cmp(mx) > 0) mx = d2;
        }
        // 垂足处 t = 36/100 落在步长上，最小值精确
        const ring = mx.sub(mn);
        // (2) A 到线段 BC 上各点的距离平方：A(0,6)、C(0,0)、B(8,0) → 最小 36，最大 100
        const sector = F(90).div(360).mul(F(100).sub(36));
        const fmt = v => (v.d === 1n ? `${v.n}π` : `${v.n}π/${v.d}`);
        return [fmt(ring), fmt(sector)];
      },
    },
    {
      id: '14.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，方格纸中每个小方格的边长为 $1$，三角形 $ABC$ 的三个顶点都在格点上。以它的三条边为边，分别向三角形外作正方形（虚线）。三个正方形离三角形最远的 $6$ 个顶点围成一个六边形。求：(1) 三个正方形的面积之和；(2) 这个六边形的面积；(3) 另一个三角形不在方格纸上，三边分别为 $5$、$5$、$6$，面积为 $12$，同样向外作三个正方形，求六个外顶点围成的六边形的面积。',
      figure: FIG142.c05,
      blanks: [
        { kind: 'num', label: '(1)', answer: '28' },
        { kind: 'num', label: '(2)', answer: '44' },
        { kind: 'num', label: '(3)', answer: '134' },
      ],
      explain: [
        '第一步：求斜放的正方形的面积，不需要知道边长。以 $AB$ 为边的正方形：它的四个顶点落在一个横 $4$、竖 $4$ 的大正方形的四条边上，大正方形面积 $16$，四个角上的直角三角形直角边都是 $3$ 和 $1$，面积 $=16-4\\times\\frac32=10$。同样，以 $AC$ 为边的正方形面积也是 $10$，以 $BC$ 为边的正方形（直角边 $2$ 和 $2$）面积 $=16-4\\times2=8$。(1) 面积之和 $=28$。',
        '第二步：六边形 $=$ 三个正方形 $+$ 三角形 $ABC$ $+$ 夹在相邻两个正方形之间的三个三角形。三角形 $ABC$ 补成长方形计算，面积为 $4$。',
        '关键想法：夹在中间的三角形不用一个一个算，用旋转。以顶点 $A$ 处为例：设两个正方形在 $A$ 处的外顶点为 $E$、$G$（$AE=AB$，$AG=AC$）。把三角形 $AEG$ 绕 $A$ 旋转 $90^\\circ$，使 $E$ 转到 $B$；$\\angle EAG+\\angle BAC=360^\\circ-90^\\circ-90^\\circ=180^\\circ$，所以 $G$ 转到射线 $CA$ 的延长线上的点 $G\'$，$AG\'=AC$。',
        '旋转后形状、大小不变，三角形 $AEG$ 的面积 $=$ 三角形 $ABG\'$ 的面积；三角形 $ABG\'$ 与三角形 $ABC$ 的底 $AG\'$、$AC$ 在同一直线上且相等，顶点都是 $B$，等底等高，面积都是 $4$。另外两个顶点处同理，三个三角形的面积都是 $4$。',
        '(2) 六边形面积 $=28+4+3\\times4=44$。（在方格纸上也可以直接割补硬算来检验。）',
        '(3) 没有方格纸，只能用上面的旋转结论：三个夹角三角形的面积都等于原三角形的面积 $12$。六边形面积 $=5^{2}+5^{2}+6^{2}+12+3\\times12=134$。',
        '常见错误：用格点数“估”斜正方形的面积；或者以为中间三个三角形要分别补成长方形计算而算错（可以用这种方法检验）。',
      ],
      verify: () => {
        const A = [0, 0];
        const B = [3, 1];
        const C = [1, 3];
        const cw = ([x, y]) => [y, -x];  // ABC 逆时针，边的外侧是右侧
        const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
        const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
        const shoelace = pts => Math.abs(pts.reduce((s, p, i) => {
          const q = pts[(i + 1) % pts.length];
          return s + p[0] * q[1] - q[0] * p[1];
        }, 0)) / 2;
        const sq = (P, Q) => {
          const v = cw(sub(Q, P));
          return [add(P, v), add(Q, v)];
        };
        const [a1, b1] = sq(A, B);
        const [b2, c2] = sq(B, C);
        const [c3, a3] = sq(C, A);
        const len2 = (P, Q) => sub(Q, P)[0] ** 2 + sub(Q, P)[1] ** 2;
        const hex = (P1, P2, P3) => {
          const [x1, y1] = sq(P1, P2);
          const [y2, z2] = sq(P2, P3);
          const [z3, x3] = sq(P3, P1);
          return shoelace([x1, y1, y2, z2, z3, x3]);
        };
        // (3)：取 A(0,0)、B(6,0)… 三边 5、5、6、面积 12 的三角形，按逆时针排列：(0,0)、(6,0)、(3,4)
        const T = [[0, 0], [6, 0], [3, 4]];
        const ok3 = len2(T[0], T[2]) === 25 && len2(T[1], T[2]) === 25 && shoelace(T) === 12;
        return [len2(A, B) + len2(B, C) + len2(C, A), hex(A, B, C), ok3 ? hex(...T) : null];
      },
    },
  ],
});
