'use strict';

// 上海数学六年级下册 · 6.2 圆与扇形的面积
// 知识范围：圆的面积 S=πr²（等分拼成近似长方形推出）、圆环面积；扇形（两条半径和所夹的弧围成）、扇形面积 S=nπr²/360
// 可以使用 6.1（周长、弧长）、第 5 章（比、比例、百分数）、6 上全部内容，以及小学的长方形、正方形、三角形面积
// 还没学：S扇=½lr 这种写法（课本只给了圆心角的公式，本节 c02 让学生自己推出）、勾股定理、三角形内角和、平方根
// 平方根没学：由面积反求半径时，只用“平方等于 25 的正数是 5”这种能直接看出的数

const FIG62 = {
  // 正方形边长 6，以 A、C 为圆心、6 为半径各画四分之一圆，重叠成叶形（每单位 26 像素）
  leaf: (() => {
    const k = 26, x0 = 70, y0 = 180, a = 6 * k;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 210" width="300" height="210" font-family="Times New Roman, serif">';
    s += `<path d="M ${x0} ${y0 - a} A ${a} ${a} 0 0 1 ${x0 + a} ${y0} A ${a} ${a} 0 0 1 ${x0} ${y0 - a} Z" fill="#9dc3e6" stroke="#2b2b2b" stroke-width="2"/>`;
    s += `<rect x="${x0}" y="${y0 - a}" width="${a}" height="${a}" fill="none" stroke="#2b2b2b" stroke-width="2"/>`;
    const lab = (t, x, y) => `<text x="${x}" y="${y}" font-size="16" font-style="italic" fill="#2b2b2b">${t}</text>`;
    s += lab('A', x0 - 16, y0 + 14) + lab('B', x0 + a + 4, y0 + 14) + lab('C', x0 + a + 4, y0 - a) + lab('D', x0 - 16, y0 - a);
    s += `<text x="${x0 + a / 2}" y="${y0 + 20}" text-anchor="middle" font-size="14" fill="#2b2b2b">6 cm</text>`;
    return s + '</svg>';
  })(),
  // 长方形 ABCD（AB=8，AD=6，AC=10）绕 A 顺时针旋转 90° 到 AB′C′D′（每单位 13 像素）
  rotRect: (() => {
    const k = 13, ax = 110, ay = 100;
    const P = (x, y) => [ax + x * k, ay - y * k];
    const poly = (pts, extra) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" ${extra}/>`;
    const A = P(0, 0), B = P(8, 0), C = P(8, 6), D = P(0, 6);
    const B2 = P(0, -8), C2 = P(6, -8), D2 = P(6, 0);
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 230" width="300" height="230" font-family="Times New Roman, serif">';
    s += poly([A, B, C, D], 'fill="#eef3fb" stroke="#2b2b2b" stroke-width="2"');
    s += poly([A, D2, C2, B2], 'fill="none" stroke="#2b2b2b" stroke-width="2" stroke-dasharray="6 3"');
    s += `<path d="M ${C.join(' ')} A ${10 * k} ${10 * k} 0 0 1 ${C2.join(' ')}" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    const lab = (t, p, dx, dy) => `<text x="${p[0] + dx}" y="${p[1] + dy}" font-size="15" font-style="italic" fill="#2b2b2b">${t}</text>`;
    s += lab('A', A, -16, -4) + lab('B', B, 4, -4) + lab('C', C, 4, -4) + lab('D', D, -16, 0);
    s += lab('B′', B2, -22, 12) + lab('C′', C2, 4, 12) + lab('D′', D2, 4, 14);
    return s + '</svg>';
  })(),
  // 仓库 8×4（俯视），羊拴在前墙中点 P 的外侧（每单位 14 像素）
  sheep: (() => {
    const k = 14, cx = 150, y0 = 80;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 140" width="300" height="140" font-family="Times New Roman, serif">';
    s += `<rect x="${cx - 4 * k}" y="${y0 - 4 * k}" width="${8 * k}" height="${4 * k}" fill="#ddd" stroke="#2b2b2b" stroke-width="2.5"/>`;
    s += `<text x="${cx}" y="${y0 - 2 * k + 5}" text-anchor="middle" font-size="14" fill="#2b2b2b">仓库</text>`;
    s += `<circle cx="${cx}" cy="${y0}" r="4" fill="#c0392b"/>`;
    s += `<text x="${cx - 5}" y="${y0 + 18}" font-size="16" font-style="italic" fill="#2b2b2b">P</text>`;
    const yd = y0 + 34;
    s += `<line x1="${cx - 4 * k}" y1="${yd}" x2="${cx + 4 * k}" y2="${yd}" stroke="#666"/><line x1="${cx - 4 * k}" y1="${yd - 5}" x2="${cx - 4 * k}" y2="${yd + 5}" stroke="#666"/><line x1="${cx + 4 * k}" y1="${yd - 5}" x2="${cx + 4 * k}" y2="${yd + 5}" stroke="#666"/>`;
    s += `<text x="${cx}" y="${yd + 18}" text-anchor="middle" font-size="13" fill="#2b2b2b">前墙全长 8 m</text>`;
    s += `<text x="${cx + 4 * k + 6}" y="${y0 - 2 * k + 4}" font-size="13" fill="#2b2b2b">4 m</text>`;
    return s + '</svg>';
  })(),
};

Content.section({
  id: 'math/sh2024/g6s2/6.2',
  title: '圆与扇形的面积',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。第 1 轮指出卡片例子与 b07、b01① 撞车，b01③ 有歧义，e02 与 e05 同为扇环模板，e01 与卡片同模型，c03(2) 是平凡推广，c04 偏弱，c05 配图标注易误读；第 2 轮换题后只剩 e01（四角四分之一圆）偏弱、扩展档缺 5 级题；第 3 轮 e01 换成两点反向运动的扇形面积（多时刻 + 端点取舍），数据避开卡片例子，判定整节通过' },

  intro: [
    {
      title: '圆的面积',
      body: '把圆等分成很多份，拼成一个近似的长方形：长是圆周长的一半 $\\pi r$，宽是半径 $r$。所以圆的面积 $S=\\pi r^2$。',
      example: '半径 4 cm 的圆，面积 $S=\\pi\\times4^2=16\\pi$（cm²），$\\pi$ 取 3.14 时约 50.24 cm²。',
      pitfall: '$\\pi r^2$ 是 $\\pi\\times r\\times r$，不是 $\\pi\\times2r$；已知直径要先求半径。',
    },
    {
      title: '圆环的面积',
      body: '两个同心圆之间的部分叫圆环。圆环面积 = 外圆面积 − 内圆面积 $=\\pi R^2-\\pi r^2$。',
      example: '外圆半径 6 cm、内圆半径 4 cm：$36\\pi-16\\pi=20\\pi$（cm²）。',
      pitfall: '不能先把半径相减再平方：$(6-4)^2\\pi=4\\pi$ 是错的。',
    },
    {
      title: '扇形和它的面积',
      body: '由两条半径和它们所夹的弧围成的图形叫**扇形**。圆心角是 $n^\\circ$ 的扇形，面积是圆面积的 $\\frac{n}{360}$：$S=\\frac{n\\pi r^2}{360}$。扇形的周长 = 两条半径 + 弧长。',
      example: '半径 6 cm、圆心角 $60^\\circ$ 的扇形：面积 $\\frac{60\\times\\pi\\times36}{360}=6\\pi$（cm²），周长 $12+2\\pi$（cm）。',
    },
    {
      title: '半径变化时面积怎样变',
      body: '面积是半径乘半径再乘 $\\pi$，所以半径变为原来的 $k$ 倍，面积变为原来的 $k\\times k$ 倍；而周长只变为 $k$ 倍。两个圆的面积之比等于半径之比的“平方”。',
      example: '半径扩大到原来的 3 倍，周长扩大到 3 倍，面积扩大到 9 倍。',
    },
    {
      title: '组合图形的面积',
      body: '求带弧线的图形面积，常用的办法是**相加、相减**：把图形看成几个会算的图形拼成的，或者用大的图形减去空白部分。几块相同的扇形可以先拼在一起算。',
      example: '长 6 cm、宽 4 cm 的长方形里，以一条长边的一段 4 cm 为直径挖去一个半圆，剩下 $24-\\frac12\\pi\\times2^2=24-2\\pi$（cm²）。',
      pitfall: '先看清阴影由哪几条线围成，再决定“加”还是“减”。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '6.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 圆的半径扩大到原来的 2 倍，面积也扩大到原来的 2 倍；② 周长相等的两个圆，面积也相等；③ 圆心角越大的扇形，面积越大；④ 圆心角是 $90^\\circ$ 的扇形，面积是它所在圆面积的 $\\frac14$；⑤ 半圆的周长是它所在圆周长的一半。其中正确的有',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 1,
      explain: [
        '① 错：面积扩大到 $2\\times2=4$ 倍。',
        '② 对：周长相等，半径就相等，面积也相等。',
        '③ 错：扇形面积还和半径有关。半径 10、圆心角 $30^\\circ$ 的扇形面积 $\\frac{25\\pi}{3}$，比半径 1、圆心角 $300^\\circ$ 的扇形面积 $\\frac{5\\pi}{6}$ 大。',
        '④ 对：$\\frac{90}{360}=\\frac14$。',
        '⑤ 错：半圆的周长还要加一条直径。',
        '正确的是 ②④，共 2 个。',
      ],
    },
    {
      id: '6.2-b02',
      level: 'basic',
      type: 'fill',
      stem: '一个圆形花坛的周长是 18.84 m，它的面积是多少平方米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '28.26', suffix: 'm²' }],
      explain: [
        '先由周长求半径：$r=18.84\\div(2\\times3.14)=3$（m）。',
        '面积 $S=3.14\\times3^2=28.26$（m²）。',
        '常见错误：用 $18.84\\div3.14=6$ 当半径（那是直径），得到 113.04。',
      ],
      verify: () => {
        const r = F('18.84').div(F('3.14').mul(2));
        return F('3.14').mul(r).mul(r);
      },
    },
    {
      id: '6.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '一个圆环形的垫片，外圆直径是 14 mm，内圆直径是 10 mm。垫片的面积是多少平方毫米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '24π', suffix: 'mm²' }],
      explain: [
        '外圆半径 7 mm，内圆半径 5 mm。',
        '面积 $=\\pi\\times7^2-\\pi\\times5^2=49\\pi-25\\pi=24\\pi$（mm²）。',
        '常见错误：直接用直径算 $\\pi(14^2-10^2)=96\\pi$；或者先相减 $7-5=2$ 再算 $4\\pi$。',
      ],
      verify: () => Math.PI * (7 * 7 - 5 * 5),
    },
    {
      id: '6.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '一个扇形的半径是 6 cm，圆心角是 $150^\\circ$，它的面积是多少平方厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '15π', suffix: 'cm²' }],
      explain: [
        '$S=\\frac{150\\times\\pi\\times6^2}{360}=\\frac{150\\times36}{360}\\pi=15\\pi$（cm²）。',
        '常见错误：把弧长公式里的 180 当成分母，算出 $30\\pi$。',
      ],
      verify: () => 150 * Math.PI * 36 / 360,
    },
    {
      id: '6.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '一个扇形的面积是 $10\\pi$ cm²，圆心角是 $144^\\circ$。这个扇形的半径是多少厘米？',
      blanks: [{ kind: 'num', answer: '5', suffix: 'cm' }],
      explain: [
        '由 $\\frac{144\\times\\pi\\times r^2}{360}=10\\pi$，两边同除以 $\\pi$：$\\frac{144r^2}{360}=10$，$r^2=10\\times360\\div144=25$。',
        '半径是正数，$5\\times5=25$，所以 $r=5$ cm。',
        '常见错误：算到 $r^2=25$ 就把 25 当成半径。',
      ],
      verify: () => {
        const r2 = F(10).mul(360).div(144);
        for (let r = 1; r < 100; r++) if (F(r * r).eq(r2)) return r;
        return null;
      },
    },
    {
      id: '6.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '一个正方形的面积是 50 cm²，在它里面画一个最大的圆，这个圆的面积是多少平方厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '25π/2', suffix: 'cm²' }],
      explain: [
        '最大的圆直径等于正方形的边长，半径是边长的一半。',
        '不必求出边长：半径 × 半径 = 边长的一半 × 边长的一半 $=\\frac14\\times$ 边长 × 边长 $=\\frac14\\times50=12.5$。',
        '所以圆的面积 $=12.5\\pi=\\frac{25\\pi}{2}$（cm²）。',
        '常见错误：以为边长不是整数就做不下去；或者把 $50\\pi$ 当成答案。',
      ],
      verify: () => Math.PI * 50 / 4,
    },
    {
      id: '6.2-b07',
      level: 'basic',
      type: 'fill',
      stem: '一个半圆的直径是 12 cm（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 它的面积是', answer: '18π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 它的周长是', answer: '6π+12', suffix: 'cm' },
      ],
      explain: [
        '半径是 6 cm。',
        '(1) 面积是圆面积的一半：$\\frac12\\times\\pi\\times6^2=18\\pi$（cm²）。',
        '(2) 周长是半个圆周加一条直径：$\\frac12\\times2\\pi\\times6+12=6\\pi+12$（cm）。',
        '常见错误：周长漏掉直径；或者面积用直径 12 当半径。',
      ],
      verify: () => [Math.PI * 36 / 2, Math.PI * 6 + 12],
    },
    {
      id: '6.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '钟面上的分针长 10 cm，经过 15 分钟，分针扫过的面积是多少平方厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '25π', suffix: 'cm²' }],
      explain: [
        '分针每分钟转 $6^\\circ$，15 分钟转 $90^\\circ$，扫过一个圆心角 $90^\\circ$、半径 10 cm 的扇形。',
        '面积 $=\\frac{90\\times\\pi\\times10^2}{360}=25\\pi$（cm²）。',
        '常见错误：把分针尖端走过的弧长 $5\\pi$ 当成扫过的面积。',
      ],
      verify: () => 15 * 6 * Math.PI * 100 / 360,
    },
    {
      id: '6.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '两个圆的半径之比是 $2:3$。',
      blanks: [
        { kind: 'ratio', label: '(1) 它们的周长之比是', answer: '2:3' },
        { kind: 'ratio', label: '(2) 它们的面积之比是', answer: '4:9' },
      ],
      explain: [
        '设两圆半径为 $2k$、$3k$。',
        '(1) 周长之比 $2\\pi\\times2k:2\\pi\\times3k=2:3$。',
        '(2) 面积之比 $\\pi(2k)^2:\\pi(3k)^2=4k^2:9k^2=4:9$。常见错误：以为面积之比也是 $2:3$。',
      ],
      verify: () => [[2, 3], [4, 9]],
    },

    // ---------- 扩展 ----------
    {
      id: '6.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '圆 $O$ 的半径是 6 cm。点 $P$、$Q$ 同时从圆上的点 $A$ 出发，$P$ 沿逆时针方向、$Q$ 沿顺时针方向在圆上运动，$OP$ 每秒转 $10^\\circ$，$OQ$ 每秒转 $5^\\circ$。在 $P$ 第一次回到点 $A$ 之前（不含出发时刻），记以 $OP$、$OQ$ 为半径、圆心角不超过 $180^\\circ$ 的扇形为扇形 $POQ$。',
      blanks: [
        { kind: 'nums', label: '(1) 扇形 $POQ$ 的面积是 $9\\pi$ cm² 时，出发了几秒（全部填出，用逗号隔开）？', answer: ['6', '18', '30'], suffix: '秒' },
        { kind: 'nums', label: '(2) 扇形 $POQ$ 是半圆时，出发了几秒（有几个就填几个）？', answer: ['12'], suffix: '秒' },
      ],
      explain: [
        '$P$ 转一圈要 $360\\div10=36$ 秒，所以只看 $0<t<36$。两点反向运动，$t$ 秒后 $OP$ 与 $OQ$ 一共“分开”了 $15t$ 度（从 $OA$ 两边分别转开）。',
        '$\\angle POQ$ 取不超过 $180^\\circ$ 的那个角：$15t$ 不超过 180 时就是 $15t$；超过 180、不超过 360 时是 $360-15t$；超过 360（两点已经相遇又分开）时是 $15t-360$。',
        '(1) 扇形面积 $9\\pi$，由 $\\frac{n\\pi\\times36}{360}=9\\pi$ 得圆心角 $n=90$。',
        '$15t=90$，$t=6$；$360-15t=90$，$t=18$；$15t-360=90$，$t=30$。三个时刻都在 36 秒以内，共 3 个。',
        '(2) 半圆就是圆心角 $180^\\circ$：$15t=180$，$t=12$。下一次是 $15t=540$，$t=36$，这时 $P$ 正好回到 $A$，不在范围内。所以只有 12 秒。',
        '常见错误：只想到 $15t=90$ 一种；或者没注意两点相遇（$t=24$）后角度又从 0 开始增大。',
      ],
      verify: () => {
        const minor = t => { const a = (15 * t) % 360; return a > 180 ? 360 - a : a; };
        const sixPi = [], half = [];
        for (let k = 1; k < 36 * 100; k++) {
          const t = k / 100;
          const area = minor(t) * Math.PI * 36 / 360;
          if (Math.abs(area - 9 * Math.PI) < 1e-9) sixPi.push(t);
          if (Math.abs(minor(t) - 180) < 1e-9) half.push(t);
        }
        return [sixPi, half];
      },
    },
    {
      id: '6.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '公园里有一块扇环形的花坛（两个同心圆的两条半径之间夹的部分），外弧半径 12 m，内弧半径 8 m，圆心角 $135^\\circ$（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 花坛的面积是', answer: '30π', suffix: 'm²' },
        { kind: 'real', label: '(2) 花坛的周长是', answer: '15π+8', suffix: 'm' },
      ],
      explain: [
        '(1) 扇环 = 大扇形 − 小扇形：$\\frac{135\\pi}{360}\\times(12^2-8^2)=\\frac38\\pi\\times80=30\\pi$（m²）。',
        '(2) 周长由外弧、内弧和两段直的边围成。外弧 $\\frac{135\\times\\pi\\times12}{180}=9\\pi$，内弧 $\\frac{135\\times\\pi\\times8}{180}=6\\pi$，每段直边长 $12-8=4$ m。',
        '周长 $=9\\pi+6\\pi+4\\times2=15\\pi+8$（m）。常见错误：直边用 12 或 8。',
      ],
      verify: () => [135 * Math.PI * (144 - 64) / 360, 135 * Math.PI * 12 / 180 + 135 * Math.PI * 8 / 180 + 8],
    },
    {
      id: '6.2-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，正方形 $ABCD$ 的边长是 6 cm，分别以 $A$、$C$ 为圆心、6 cm 为半径，在正方形内画两段四分之一圆弧，两段弧围成一个叶形（涂色部分）。求叶形的面积和周长（结果保留 $\\pi$）。',
      figure: FIG62.leaf,
      blanks: [
        { kind: 'real', label: '(1) 叶形的面积是', answer: '18π-36', suffix: 'cm²' },
        { kind: 'real', label: '(2) 叶形的周长是', answer: '6π', suffix: 'cm' },
      ],
      explain: [
        '每个四分之一圆（扇形）的面积是 $\\frac14\\pi\\times6^2=9\\pi$（cm²）。',
        '(1) 两个扇形都在正方形里，把它们的面积加起来，叶形被算了两次，正方形的其余部分被算了一次，所以 两个扇形面积之和 = 正方形面积 + 叶形面积。',
        '叶形面积 $=9\\pi\\times2-6\\times6=18\\pi-36$（cm²）。',
        '(2) 叶形由两段四分之一圆弧围成：$2\\times\\frac14\\times2\\pi\\times6=6\\pi$（cm）。',
      ],
      verify: () => [2 * Math.PI * 36 / 4 - 36, 2 * 2 * Math.PI * 6 / 4],
    },
    {
      id: '6.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '一个圆形水池要扩建。',
      blanks: [
        { kind: 'num', label: '(1) 如果半径增加 20%，面积增加', answer: '44', suffix: '%' },
        { kind: 'num', label: '(2) 如果要使面积增加 21%，半径要增加', answer: '10', suffix: '%' },
      ],
      explain: [
        '(1) 设原半径为 $r$，新半径是 $1.2r$，新面积 $\\pi(1.2r)^2=1.44\\pi r^2$，是原来的 144%，增加了 44%。常见错误：以为面积也增加 20%，或者增加 40%。',
        '(2) 面积变为原来的 121%，也就是 1.21 倍。半径变为原来的 $k$ 倍时面积变为 $k\\times k$ 倍，要 $k\\times k=1.21$。',
        '$1.1\\times1.1=1.21$，所以 $k=1.1$，半径增加 10%。',
      ],
      verify: () => {
        const up = F('1.2').mul('1.2').sub(1).mul(100);
        let k = null;
        for (let i = 100; i <= 200; i++) { const x = F(i).div(100); if (x.mul(x).eq('1.21')) k = x; }
        return [up, k.sub(1).mul(100)];
      },
    },
    {
      id: '6.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '在半径为 6 cm 的圆 $O$ 中，$OA$、$OB$ 是两条半径，$\\angle AOB=40^\\circ$。点 $C$ 在圆上，以 $OA$、$OC$ 为半径、圆心角小于 $180^\\circ$ 的扇形 $AOC$ 的面积是扇形 $AOB$ 面积的 2 倍。求以 $OB$、$OC$ 为半径、圆心角不超过 $180^\\circ$ 的扇形 $BOC$ 的面积（结果保留 $\\pi$，全部填出，用逗号隔开）。',
      blanks: [{ kind: 'reals', answer: ['4π', '12π'], suffix: 'cm²' }],
      explain: [
        '同一个圆里，扇形的面积与圆心角成比例。扇形 $AOC$ 的面积是扇形 $AOB$ 的 2 倍，所以 $\\angle AOC=2\\times40^\\circ=80^\\circ$。',
        '没有图，$OC$ 可以在 $OA$ 的两侧，要分两种情况。',
        '① $OC$ 与 $OB$ 在 $OA$ 的同侧：$\\angle BOC=80^\\circ-40^\\circ=40^\\circ$，扇形 $BOC$ 面积 $=\\frac{40}{360}\\times36\\pi=4\\pi$（cm²）。',
        '② $OC$ 与 $OB$ 在 $OA$ 的两侧：$\\angle BOC=80^\\circ+40^\\circ=120^\\circ$，扇形 $BOC$ 面积 $=\\frac{120}{360}\\times36\\pi=12\\pi$（cm²）。',
        '所以是 $4\\pi$ cm² 或 $12\\pi$ cm²。',
      ],
      verify: () => {
        const aoc = 2 * 40;
        return [aoc - 40, aoc + 40].map(n => (n > 180 ? 360 - n : n) * Math.PI * 36 / 360);
      },
    },
    {
      id: '6.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '一个半径 5 cm 的大圆和一个半径 3 cm 的小圆部分重叠（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 大圆中不重叠部分的面积比小圆中不重叠部分的面积大', answer: '16π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 如果重叠部分的面积是小圆面积的 $\\frac13$，大圆中不重叠部分的面积是', answer: '22π', suffix: 'cm²' },
      ],
      explain: [
        '(1) 重叠部分的面积不知道，设为 $S$。大圆不重叠部分 $=25\\pi-S$，小圆不重叠部分 $=9\\pi-S$。',
        '两者相差 $(25\\pi-S)-(9\\pi-S)=16\\pi$（cm²），$S$ 被抵消了，不管重叠多少，差都一样。',
        '(2) 重叠部分 $S=\\frac13\\times9\\pi=3\\pi$，大圆不重叠部分 $=25\\pi-3\\pi=22\\pi$（cm²）。',
        '常见错误：以为（1）缺条件；或者（2）用大圆面积的 $\\frac13$。',
      ],
      verify: () => {
        const S = Math.PI * 9 / 3;
        return [(25 * Math.PI - S) - (9 * Math.PI - S), 25 * Math.PI - S];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '6.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '一个边长 10 cm 的正方形框子，一个半径 1 cm 的圆片紧贴着框子滚动一周（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 圆片在框子**内侧**贴着四条边滚动一周，圆片扫过的面积是', answer: '60+π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 框子里圆片始终碰不到的部分中，四个角落的面积之和是', answer: '4-π', suffix: 'cm²' },
        { kind: 'real', label: '(3) 圆片在框子**外侧**贴着四条边滚动一周，圆片扫过的面积是', answer: '80+4π', suffix: 'cm²' },
      ],
      explain: [
        '先想清楚圆片能盖到哪里。圆片直径 2 cm，贴边滚动时盖住的是一条宽 2 cm 的“带子”，关键看四个角。',
        '(2) 在内侧，圆片滚到角落时，最多同时贴住两条边，这时它盖不住角落里一小块：一个边长 1 cm 的小正方形，减去这个小正方形里的四分之一圆。每个角落 $1-\\frac{\\pi}{4}$，四个角共 $4-\\pi$（cm²）。',
        '(1) 带子外沿是整个正方形，内沿是中间边长 $10-2\\times2=6$ cm 的正方形（圆片碰不到中间）。扫过的面积 $=10\\times10-6\\times6-(4-\\pi)=64-4+\\pi=60+\\pi$（cm²）。',
        '(3) 在外侧，每条边外面是一个 $10\\times2$ 的长方形，共 $80$ cm²；在每个角上，圆片绕着顶点转过去，盖住一个半径 2 cm 的四分之一圆，四个角合起来是一个整圆 $\\pi\\times2^2=4\\pi$。',
        '扫过的面积 $=80+4\\pi$（cm²）。内侧角落“缺”一块，外侧角落“圆”一块，这是两种情况不一样的地方。',
      ],
      verify: () => {
        const corner = 4 * (1 - Math.PI / 4);
        return [100 - 36 - corner, corner, 4 * 10 * 2 + Math.PI * 4];
      },
    },
    {
      id: '6.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '用一根长 20 cm 的铁丝恰好围成一个扇形（两条半径加一段弧，接头不计）。',
      blanks: [
        { kind: 'num', label: '(1) 如果扇形的半径是 4 cm，扇形的面积是', answer: '24', suffix: 'cm²' },
        { kind: 'num', label: '(2) 如果半径是整数厘米，半径最小可以取', answer: '3', suffix: 'cm' },
        { kind: 'num', label: '(3) 如果半径是整数厘米，要使扇形面积最大，半径应取', answer: '5', suffix: 'cm' },
        { kind: 'num', label: '　 这时扇形的面积是', answer: '25', suffix: 'cm²' },
      ],
      explain: [
        '(1) 弧长 $l=20-4\\times2=12$ cm。圆心角 $n$ 满足 $\\frac{n\\pi\\times4}{180}=12$，所以 $\\frac{n\\pi}{180}=3$。',
        '面积 $S=\\frac{n\\pi\\times4^2}{360}=\\frac12\\times\\frac{n\\pi}{180}\\times16=\\frac12\\times3\\times16=24$（cm²）。这里不必求出 $n$。',
        '一般地，$S=\\frac{n\\pi r^2}{360}=\\frac12\\times\\frac{n\\pi r}{180}\\times r=\\frac12lr$：扇形面积等于弧长与半径的积的一半（像一个底为 $l$、高为 $r$ 的三角形）。',
        '(2) 半径为 $r$ 时弧长 $l=20-2r$。弧不能比整个圆周长：$20-2r\\le2\\pi r$，$r=1$、$2$ 时 $l=18$、$16$，超过了 $2\\pi$、$4\\pi$，围不成；$r=3$ 时 $l=14<6\\pi\\approx18.8$，可以。所以半径最小取 3 cm。',
        '(3) 面积 $S=\\frac12(20-2r)r=(10-r)r$，$r$ 可取 3～9。',
        '$r=3,4,5,6,7,8,9$ 时面积分别是 21、24、25、24、21、16、9，最大是 $r=5$ 时的 25 cm²。两个因数 $10-r$ 和 $r$ 的和固定是 10，它们相等时积最大。',
      ],
      verify: () => {
        const S = r => F(20 - 2 * r).mul(r).div(2);
        let best = null;
        for (let r = 1; r < 10; r++) {
          if (20 - 2 * r > 2 * Math.PI * r) continue;
          if (!best || S(r).cmp(S(best)) > 0) best = r;
        }
        let min = null;
        for (let r = 1; r < 10 && min === null; r++) if (20 - 2 * r <= 2 * Math.PI * r) min = r;
        return [S(4), min, best, S(best)];
      },
    },
    {
      id: '6.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '如图，长方形 $ABCD$ 中 $AB=8$ cm，$AD=6$ cm，对角线 $AC=10$ cm。把长方形绕点 $A$ 顺时针旋转 $90^\\circ$，得到长方形 $AB^{\\prime}C^{\\prime}D^{\\prime}$（结果保留 $\\pi$）。',
      figure: FIG62.rotRect,
      blanks: [
        { kind: 'real', label: '(1) 边 $CD$ 扫过的面积是', answer: '16π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 整个长方形扫过的面积是', answer: '25π+48', suffix: 'cm²' },
      ],
      explain: [
        '旋转时，每个点都绕 $A$ 走一段圆心角 $90^\\circ$ 的弧，离 $A$ 越远走得越远。所以关键是找出离 $A$ 最近和最远的点。',
        '(1) 边 $CD$ 上，离 $A$ 最近的是 $D$：从 $D$ 沿 $CD$ 往 $C$ 走，离开了 $A$ 的正上方，离 $A$ 越来越远（$AD=6$ 与 $CD$ 垂直，$CD$ 上别的点到 $A$ 都比 6 远），最远的是 $C$（$AC=10$）。$CD$ 扫过的区域是：以 $AC$ 扫出的扇形，加上转到最后位置的 $\\triangle AC^{\\prime}D^{\\prime}$，减去以 $AD$ 扫出的扇形，再减去开始位置的 $\\triangle ACD$。',
        '怎么想到的：线段扫过的是“最远点扫出的大扇形”和“最近点扫出的小扇形”之间的部分，但两端各有一块三角形要补上或去掉；而开始的 $\\triangle ACD$ 和结束的 $\\triangle AC^{\\prime}D^{\\prime}$ 是同一个三角形转过来的，面积相等，一加一减正好抵消。$CD$ 扫过的面积 $=\\frac{90}{360}\\pi\\times10^2-\\frac{90}{360}\\pi\\times6^2=25\\pi-9\\pi=16\\pi$（cm²）。',
        '(2) 长方形上离 $A$ 最远的点是 $C$，它扫出半径 10 cm、圆心角 $90^\\circ$ 的扇形 $CAC^{\\prime}$，面积 $25\\pi$。这个扇形之外，还有两块没被盖住：开始时在 $AC$ 左上方的 $\\triangle ACD$，和结束时在 $AC^{\\prime}$ 下方的 $\\triangle AB^{\\prime}C^{\\prime}$。',
        '为什么只有这两块：长方形转动时，只有 $\\triangle ACD$ 这一半转进了扇形里面，它原来的位置不会再被别的部分盖到；同样 $\\triangle AB^{\\prime}C^{\\prime}$ 是最后才转到的。每个三角形面积是长方形的一半：$\\frac12\\times8\\times6=24$。',
        '扫过的面积 $=25\\pi+24+24=25\\pi+48$（cm²）。常见错误：只算扇形 $25\\pi$，或者再加上整个长方形的面积。',
      ],
      verify: () => {
        // 数值核对：在网格上判断每个点是否被某个转动中的长方形盖到
        const inRect = (x, y) => x >= 0 && x <= 8 && y >= 0 && y <= 6;
        let hit = 0; const step = 0.05, N = 360;
        const cs = [], sn = [];
        for (let i = 0; i <= N; i++) { const t = -Math.PI / 2 * i / N; cs.push(Math.cos(t)); sn.push(Math.sin(t)); }
        for (let x = -10; x <= 10; x += step) for (let y = -10; y <= 10; y += step) {
          if (x * x + y * y > 100.5) continue;
          for (let i = 0; i <= N; i++) {
            // 把点反转回去，看是否在原长方形里
            const u = x * cs[i] + y * sn[i], v = -x * sn[i] + y * cs[i];
            if (inRect(u, v)) { hit++; break; }
          }
        }
        const area = hit * step * step;
        const exact = 25 * Math.PI + 48;
        return [25 * Math.PI - 9 * Math.PI, Math.abs(area - exact) < 1.5 ? exact : area];
      },
    },
    {
      id: '6.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '在半径为 8 cm 的圆里画一个最大的正方形（四个顶点都在圆上），再在这个正方形里画一个最大的圆，再在这个圆里画最大的正方形……一直画下去。',
      blanks: [
        { kind: 'num', label: '(1) 第 1 个正方形的面积是', answer: '128', suffix: 'cm²' },
        { kind: 'real', label: '(2) 第 2 个圆的面积是（结果保留 $\\pi$）', answer: '32π', suffix: 'cm²' },
        { kind: 'num', label: '(3) 每个圆与画在它里面的正方形之间，有四块空白。第几个圆里的这四块空白面积之和第一次小于 1 cm²（$\\pi$ 取 3.14）？第', answer: '8', suffix: '个' },
      ],
      explain: [
        '(1) 圆里最大的正方形，对角线就是圆的直径 16 cm。正方形的两条对角线把它分成 4 个一样的三角形，每个三角形的两条边都是半径 8 cm 且互相垂直，面积 $\\frac12\\times8\\times8=32$。正方形面积 $=4\\times32=128$（cm²），也就是 $2\\times8\\times8$。',
        '(2) 正方形里最大的圆，半径是边长的一半，半径 × 半径 $=\\frac14\\times$ 边长 × 边长 $=\\frac14\\times128=32$，面积 $32\\pi$ cm²。',
        '找规律：半径为 $R$ 的圆，里面最大的正方形面积是 $2R\\times R$，正方形里的圆面积是 $\\frac14\\times2R\\times R\\times\\pi=\\frac12\\pi R^2$。每往里画一次，圆的面积变成原来的一半。',
        '(3) 第 1 个圆里的四块空白 = 圆面积 − 正方形面积 $=64\\pi-128=64(\\pi-2)\\approx72.96$（cm²）。',
        '往里每画一层，圆和它里面的正方形都变成上一层的一半（第 2 个圆 $32\\pi$，里面的正方形 $2\\times32=64$），所以空白也变成一半。第 $k$ 个圆里的空白是 $72.96\\div2^{k-1}$。',
        '$72.96\\div2^6=1.14$，还不小于 1；$72.96\\div2^7=0.57$，小于 1。所以 $k-1=7$，第 8 个圆里的空白第一次小于 1 cm²。'
      ],
      verify: () => {
        const R2 = F(64);
        const square1 = R2.mul(2);
        const circle2 = square1.div(4);   // π 的系数
        // 第 k 个圆的半径平方 R2，里面正方形面积 2·R2，空白 = 3.14·R2 − 2·R2
        let k = 1, r2 = F(64);
        while (F('3.14').mul(r2).sub(r2.mul(2)).cmp(1) >= 0) { r2 = r2.div(2); k++; }
        return [square1, Number(circle2.n) * Math.PI, k];
      },
    },
    {
      id: '6.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '如图，一个长方形仓库长 8 m、宽 4 m，四周是草地。一只羊拴在仓库前墙（长 8 m 的一面）中点 $P$ 的外侧，羊不能进仓库。求羊能吃到草的区域的面积（结果保留 $\\pi$）。',
      figure: FIG62.sheep,
      blanks: [
        { kind: 'real', label: '(1) 绳长 6 m 时，面积是', answer: '20π', suffix: 'm²' },
        { kind: 'real', label: '(2) 绳长 10 m 时，面积是', answer: '70π', suffix: 'm²' },
      ],
      explain: [
        '墙挡住了一侧，绳子拉直时，羊能到达以 $P$ 为圆心的**半圆**。绳子比 4 m（$P$ 到墙角的距离）长时，还能沿前墙绕过墙角，剩下的绳子以墙角为圆心再扫出四分之一圆；如果剩下的比侧墙 4 m 还长，还能再绕过后墙角。',
        '(1) 绳长 6 m：半圆 $\\frac12\\pi\\times6^2=18\\pi$。绕过左右两个前墙角各剩 $6-4=2$ m，各扫出半径 2 m 的四分之一圆 $\\frac14\\pi\\times2^2=\\pi$。剩 2 m 不到侧墙长 4 m，绕不到后面。',
        '面积 $=18\\pi+2\\pi=20\\pi$（m²）。',
        '(2) 绳长 10 m：半圆 $\\frac12\\pi\\times10^2=50\\pi$。绕过前墙角各剩 6 m，各扫出半径 6 m 的四分之一圆 $\\frac14\\pi\\times36=9\\pi$，两边共 $18\\pi$。',
        '6 m 比侧墙 4 m 长，还能绕过后墙角，各剩 $6-4=2$ m，在仓库后面各扫出半径 2 m 的四分之一圆，各 $\\pi$。两块在后墙两端，相距 $8-2-2=4$ m，不重叠。',
        '面积 $=50\\pi+18\\pi+2\\pi=70\\pi$（m²）。',
      ],
      verify: () => {
        const area = L => {
          let s = L * L / 2;                          // π 的系数
          if (L > 4) {
            const a = L - 4;                          // 绕过前墙角后剩下的
            s += 2 * a * a / 4;
            if (a > 4) {
              const b = a - 4;                        // 绕过后墙角后剩下的
              if (2 * b > 8) return null;             // 两块会在后面碰到，本题数据不出现
              s += 2 * b * b / 4;
            }
          }
          return s * Math.PI;
        };
        return [area(6), area(10)];
      },
    },
  ],
});
