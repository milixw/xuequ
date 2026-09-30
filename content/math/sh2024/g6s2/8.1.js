'use strict';

// 上海数学六年级下册 · 8.1 圆柱及其侧面展开图
// 知识范围：圆柱（长方形绕一边所在直线旋转一周）、底面、侧面、高、母线（母线长 = 高）；侧面展开图是长方形；
//   S侧 = Cl = 2πrh，S表 = 2πrh + 2πr²，V = S底·h（等分底面、切拼成近似长方体推出）
// 可以使用第 5～7 章（比、百分数、圆和扇形）、6 上全部内容（一元一次方程等），以及小学的长方体、正方体
// 还没学：圆锥（8.2）、勾股定理（8 上）、平方根；螺旋线、最短路线要用勾股定理，不出

const FIG81 = {
  // 瓶子正放、倒放：下部是圆柱，上部是瓶颈（每厘米 8 像素）
  bottle: (() => {
    const k = 8, w = 6 * k;
    const draw = (x0, flip) => {
      const y0 = 190, H = 18 * k;
      // 正放：瓶底在下；倒放：瓶口朝下，整体上下翻转
      const Y = y => (flip ? y0 - H + (y0 - y) : y);
      const body = 13 * k;
      const pts = [
        [x0, y0], [x0 + w, y0], [x0 + w, y0 - body], [x0 + w - 12, y0 - body - 22], [x0 + w - 16, y0 - H],
        [x0 + 16, y0 - H], [x0 + 12, y0 - body - 22], [x0, y0 - body],
      ];
      let s = '';
      if (!flip) {
        s += `<rect x="${x0}" y="${y0 - 12 * k}" width="${w}" height="${12 * k}" fill="#9dc3e6"/>`;
        s += `<text x="${x0 + w + 6}" y="${y0 - 6 * k + 5}" font-size="13" fill="#2b2b2b">12 cm</text>`;
      } else {
        // 倒放后瓶底在上，空气柱在瓶底一侧（圆柱部分）
        const top = Y(y0), airBottom = top + 3 * k;
        s += `<rect x="${x0}" y="${airBottom}" width="${w}" height="${Y(y0 - body) - airBottom}" fill="#9dc3e6"/>`;
        s += `<polygon points="${[[x0, Y(y0 - body)], [x0 + w, Y(y0 - body)], [x0 + w - 12, Y(y0 - body - 22)], [x0 + w - 16, Y(y0 - H)], [x0 + 16, Y(y0 - H)], [x0 + 12, Y(y0 - body - 22)]].map(p => p.join(',')).join(' ')}" fill="#9dc3e6"/>`;
        s += `<text x="${x0 + w + 6}" y="${top + 3 * k / 2 + 5}" font-size="13" fill="#2b2b2b">3 cm</text>`;
      }
      s += `<polygon points="${pts.map(p => [p[0], Y(p[1])].join(',')).join(' ')}" fill="none" stroke="#2b2b2b" stroke-width="2"/>`;
      s += `<text x="${x0 + w / 2}" y="${flip ? 20 : 210}" text-anchor="middle" font-size="13" fill="#2b2b2b">${flip ? '倒放' : '正放'}</text>`;
      return s;
    };
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" width="300" height="220" font-family="Times New Roman, serif">';
    s += draw(40, false) + draw(180, true);
    return s + '</svg>';
  })(),
  // 半径 4、3、2、1 cm，高 1 cm 的圆柱从大到小叠起来（正面看，每厘米 28 像素）
  stack: (() => {
    const k = 28, cx = 150, y0 = 170, e = 0.28;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200" font-family="Times New Roman, serif">';
    for (let i = 0; i < 4; i++) {
      const r = (4 - i) * k, yb = y0 - i * k, yt = yb - k;
      s += `<path d="M ${cx - r} ${yt} L ${cx - r} ${yb} A ${r} ${r * e} 0 0 0 ${cx + r} ${yb} L ${cx + r} ${yt}" fill="#eef3fb" stroke="#2b2b2b" stroke-width="1.6"/>`;
      s += `<ellipse cx="${cx}" cy="${yt}" rx="${r}" ry="${r * e}" fill="#dce8f7" stroke="#2b2b2b" stroke-width="1.6"/>`;
    }
    s += `<text x="${cx + 4 * k + 6}" y="${y0 - k / 2 + 5}" font-size="13" fill="#2b2b2b">1 cm</text>`;
    return s + '</svg>';
  })(),
};

Content.section({
  id: 'math/sh2024/g6s2/8.1',
  title: '圆柱及其侧面展开图',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮指出 c01（从大到小叠圆柱）只有 4 级、e01(1) 与 b01② 撞同一结论、c05 单位说法前后不一；第 2 轮 c01 改为任意顺序叠的最值与计数，e01(1) 改问表面积之差，按复核意见在 c01(3) 写明“上下顺序不同算不同叠法”后判定整节通过' },

  intro: [
    {
      title: '圆柱是怎样形成的',
      body: '把一个长方形绕它的一条边所在的直线旋转一周，得到的立体图形叫**圆柱**。上、下两个相同的圆是**底面**，夹在中间的曲面是**侧面**，两个底面圆心之间的距离是**高**。转动的那条对边形成侧面，叫**母线**：母线有无数条，长度都等于高。',
      example: '长 7 cm、宽 2 cm 的长方形绕长边旋转：长边就是高 7 cm，宽 2 cm 转出底面，是底面半径。',
      pitfall: '绕哪条边转，哪条边就是高；另一条边是半径，不是直径。',
    },
    {
      title: '侧面展开图和侧面积',
      body: '沿一条母线把侧面剪开、铺平，得到一个长方形：一边是母线（等于高），另一边等于底面周长。所以侧面积 $S_{\\text{侧}}=Cl=2\\pi rh$。',
      example: '底面半径 3 cm、高 7 cm 的圆柱，侧面积 $2\\pi\\times3\\times7=42\\pi$（cm²）。',
    },
    {
      title: '圆柱的表面积',
      body: '圆柱的表面由侧面和两个底面组成：$S_{\\text{表}}=S_{\\text{侧}}+2S_{\\text{底}}=2\\pi rh+2\\pi r^2$。',
      example: '接着上一个圆柱：$42\\pi+2\\times\\pi\\times3^2=60\\pi$（cm²）。',
      pitfall: '实际问题先想清楚要哪几个面：无盖的只有一个底面，管子、商标纸只有侧面。',
    },
    {
      title: '圆柱的体积',
      body: '把底面等分成很多扇形，沿半径切开再拼起来，得到近似的长方体：底面积不变，高不变。所以 $V=S_{\\text{底}}h=\\pi r^2h$。',
      example: '接着上一个圆柱：$V=\\pi\\times3^2\\times7=63\\pi$（cm³）。',
      pitfall: '1 升 = 1 立方分米 = 1000 立方厘米，1 毫升 = 1 立方厘米，算容积前先统一单位。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '8.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 圆柱有无数条母线，它们的长都等于圆柱的高；② 一个长方形分别绕相邻的两条边所在的直线旋转一周，得到的两个圆柱侧面积相等；③ 侧面积相等的两个圆柱，体积也相等；④ 沿一条母线把圆柱的侧面剪开，得到的图形一定是长方形；⑤ 圆柱的底面半径扩大到原来的 2 倍，高不变，体积也扩大到原来的 2 倍。其中正确的有',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 2,
      explain: [
        '① 对：母线转到哪里都是母线，长度等于高。',
        '② 对：长方形长 $a$、宽 $b$，绕长边转，侧面积 $2\\pi\\times b\\times a$；绕宽边转，侧面积 $2\\pi\\times a\\times b$，相等。',
        '③ 错：例如 $r=1,h=6$ 与 $r=3,h=2$，侧面积都是 $12\\pi$，体积分别是 $6\\pi$ 和 $18\\pi$。',
        '④ 对：展开图一边是母线，一边是底面周长（正方形也是特殊的长方形）。',
        '⑤ 错：底面积变为 $2\\times2=4$ 倍，体积也变为 4 倍。',
        '正确的是 ①②④，共 3 个。',
      ],
      verify: () => {
        const ok = [true, 2 * Math.PI * 1 * 6 === 2 * Math.PI * 6 * 1, 1 * 1 * 6 === 3 * 3 * 2, true, 2 * 2 === 2];
        return ok.filter(Boolean).length - 1;
      },
    },
    {
      id: '8.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '一个长方形长 5 cm、宽 3 cm，以它的宽所在的直线为轴旋转一周，得到一个圆柱（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 圆柱的侧面积是', answer: '30π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 圆柱的体积是', answer: '75π', suffix: 'cm³' },
      ],
      explain: [
        '绕宽旋转，宽 3 cm 是圆柱的高，长 5 cm 转出底面，是底面半径。',
        '(1) 侧面积 $2\\pi\\times5\\times3=30\\pi$（cm²）。',
        '(2) 体积 $\\pi\\times5^2\\times3=75\\pi$（cm³）。',
        '常见错误：把宽当成半径、长当成高，算出 $\\pi\\times3^2\\times5=45\\pi$。',
      ],
      verify: () => [2 * Math.PI * 5 * 3, Math.PI * 25 * 3],
    },
    {
      id: '8.1-b03',
      level: 'basic',
      type: 'choice',
      stem: '一个圆柱的侧面展开图是正方形，这个圆柱的高是它底面直径的',
      options: ['1 倍', '2 倍', '$\\pi$ 倍', '$2\\pi$ 倍'],
      answer: 2,
      explain: [
        '展开图的一边是高，另一边是底面周长。是正方形，说明高 = 底面周长 $=\\pi d$。',
        '所以高是底面直径的 $\\pi$ 倍。',
        '常见错误：以为高等于直径（1 倍）；或者用 $2\\pi r$ 和直径比，得到 $2\\pi$ 倍。',
      ],
      verify: () => {
        const d = 2, h = Math.PI * d;
        return [1, 2, Math.PI, 2 * Math.PI].findIndex(x => Math.abs(x - h / d) < 1e-9);
      },
    },
    {
      id: '8.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '用铁皮做一个无盖的圆柱形水桶，底面直径 40 cm，高 50 cm。至少需要铁皮多少平方厘米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '7536', suffix: 'cm²' }],
      explain: [
        '无盖，只有侧面和一个底面。底面半径 20 cm。',
        '侧面积 $3.14\\times40\\times50=6280$（cm²），底面积 $3.14\\times20^2=1256$（cm²）。',
        '共 $6280+1256=7536$（cm²）。',
        '常见错误：算了两个底面（8792）；或者用直径 40 算底面积。',
      ],
      verify: () => F('3.14').mul(40).mul(50).add(F('3.14').mul(400)),
    },
    {
      id: '8.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '一个圆柱形水杯的容积是 1.57 升，杯子内部的底面直径是 10 cm。杯子内部的高是多少厘米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '20', suffix: 'cm' }],
      explain: [
        '先统一单位：1.57 升 = 1570 cm³。',
        '底面积 $3.14\\times5^2=78.5$（cm²），高 $=1570\\div78.5=20$（cm）。',
        '常见错误：直接用 1.57 去除，得到 0.02；或者用直径 10 算底面积。',
      ],
      verify: () => F('1.57').mul(1000).div(F('3.14').mul(25)),
    },
    {
      id: '8.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '一根底面半径 3 cm 的圆柱形木料，沿着和底面平行的方向截成 3 段小圆柱。表面积一共增加了多少平方厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '36π', suffix: 'cm²' }],
      explain: [
        '截成 3 段要截 2 次，每截一次多出 2 个底面，一共多出 4 个底面。',
        '增加 $4\\times\\pi\\times3^2=36\\pi$（cm²）。',
        '常见错误：以为截 3 次（多 6 个面，$54\\pi$），或者一次只多 1 个面（$18\\pi$）。',
      ],
      verify: () => (3 - 1) * 2 * Math.PI * 9,
    },
    {
      id: '8.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '一个圆柱底面半径 4 cm、高 9 cm。沿着两个底面的一条直径，从上到下把它切成两个半圆柱，表面积一共增加了多少平方厘米？',
      blanks: [{ kind: 'num', answer: '144', suffix: 'cm²' }],
      explain: [
        '切面是一个长方形：长是底面直径 8 cm，宽是高 9 cm，面积 72 cm²。',
        '切开后两个半圆柱各有一个这样的切面，增加 $2\\times72=144$（cm²）。',
        '常见错误：只算一个切面（72）；或者长方形的一边用半径 4（得 72 或 36）。',
      ],
      verify: () => 2 * (2 * 4) * 9,
    },
    {
      id: '8.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '甲、乙两个圆柱的底面半径之比是 $2:3$，高之比是 $3:2$。甲、乙的体积之比是多少？',
      blanks: [{ kind: 'ratio', answer: '2:3' }],
      explain: [
        '设甲底面半径 $2a$、高 $3b$，乙底面半径 $3a$、高 $2b$。',
        '体积之比 $\\pi(2a)^2\\times3b:\\pi(3a)^2\\times2b=12:18=2:3$。',
        '常见错误：以为半径之比和高之比“抵消”，得到 $1:1$。体积里半径要乘两次。',
      ],
      verify: () => {
        const a = F(2 * 2 * 3), b = F(3 * 3 * 2);
        const g = F(6);
        return [a.div(g), b.div(g)];
      },
    },
    {
      id: '8.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '一个圆柱形罐头的底面直径是 8 cm，高 10 cm。在它的侧面包一圈商标纸（上下正好包满），接头处重叠 1 cm。这张商标纸的面积是多少平方厘米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '261.2', suffix: 'cm²' }],
      explain: [
        '商标纸只包侧面，展开是长方形：长 = 底面周长 + 重叠部分 $=3.14\\times8+1=26.12$（cm），宽 = 高 10 cm。',
        '面积 $26.12\\times10=261.2$（cm²）。',
        '常见错误：漏掉重叠的 1 cm（251.2）；或者把两个底面也算上。',
      ],
      verify: () => F('3.14').mul(8).add(1).mul(10),
    },

    // ---------- 扩展 ----------
    {
      id: '8.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '一个长方形的周长是 20 cm，长和宽都是整数厘米，长大于宽。以它的长所在的直线为轴旋转一周得到圆柱甲，以它的宽所在的直线为轴旋转一周得到圆柱乙。',
      blanks: [
        { kind: 'num', label: '(1) 如果乙的表面积比甲大 $40\\pi$ cm²，长方形的长是', answer: '6', suffix: 'cm' },
        { kind: 'num', label: '(2) 如果乙的体积比甲大 $84\\pi$ cm³，长方形的长是', answer: '7', suffix: 'cm' },
        { kind: 'num', label: '　 宽是', answer: '3', suffix: 'cm' },
      ],
      explain: [
        '设长 $a$ cm、宽 $b$ cm，$a+b=10$。甲：高 $a$、底面半径 $b$；乙：高 $b$、底面半径 $a$。',
        '(1) 甲、乙的侧面积都是 $2\\pi ab$，相等，表面积只差在底面上：$2\\pi a^2-2\\pi b^2=40\\pi$，即 $a^2-b^2=20$。',
        '$a>b$，$a+b=10$ 的整数情况：$(9,1)$：80；$(8,2)$：60；$(7,3)$：40；$(6,4)$：20。所以长 6 cm。',
        '(2) 甲的体积 $\\pi b^2a$，乙的体积 $\\pi a^2b$，相差 $\\pi ab(a-b)$，要等于 $84\\pi$，即 $ab(a-b)=84$。',
        '逐个试：$(9,1)$：$9\\times8=72$；$(8,2)$：$16\\times6=96$；$(7,3)$：$21\\times4=84$；$(6,4)$：$24\\times2=48$。只有长 7 cm、宽 3 cm 符合。',
        '常见错误：把甲、乙的半径和高弄反；或者以为侧面积也不同。',
      ],
      verify: () => {
        const pick = f => {
          const found = [];
          for (let b = 1; b < 5; b++) if (f(10 - b, b)) found.push([10 - b, b]);
          return found.length === 1 ? found[0] : null;
        };
        const s = pick((a, b) => (2 * a * b + 2 * a * a) - (2 * a * b + 2 * b * b) === 40);
        const v = pick((a, b) => a * a * b - b * b * a === 84);
        return [s[0], v[0], v[1]];
      },
    },
    {
      id: '8.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '一个圆柱形容器内部底面半径 10 cm，装有 15 cm 深的水（容器足够高）。把一根底面半径 5 cm 的圆柱形铁棒竖直放入水中，铁棒底面贴住容器底面。',
      blanks: [
        { kind: 'num', label: '(1) 如果铁棒长 30 cm，放入后水深', answer: '20', suffix: 'cm' },
        { kind: 'num', label: '(2) 如果铁棒长 18 cm，放入后水深', answer: '19.5', suffix: 'cm' },
      ],
      explain: [
        '关键：先判断铁棒会不会被水完全淹没。',
        '水的体积 $\\pi\\times10^2\\times15=1500\\pi$（cm³），放铁棒前后不变。铁棒立在水里，水只能占“容器底面积 − 铁棒底面积”$=100\\pi-25\\pi=75\\pi$（cm²）这一圈。',
        '(1) 如果铁棒没被淹没，水深 $=1500\\pi\\div75\\pi=20$（cm），比 30 cm 小，确实没被淹没，所以水深 20 cm。',
        '如果按“完全淹没”算，水面上升 $25\\pi\\times30\\div100\\pi=7.5$（cm），水深 22.5 cm，比铁棒还矮，自相矛盾。',
        '(2) 铁棒长 18 cm：按没被淹没算，水深 20 cm，比 18 cm 高，矛盾，说明铁棒被淹没了。',
        '完全淹没时，水面上升 $25\\pi\\times18\\div100\\pi=4.5$（cm），水深 $15+4.5=19.5$（cm），比 18 cm 高，符合。',
      ],
      verify: () => {
        const depth = L => {
          const water = F(100).mul(15);
          const partial = water.div(75);
          if (partial.cmp(L) <= 0) return partial;
          return water.add(F(25).mul(L)).div(100);
        };
        return [depth(30), depth(18)];
      },
    },
    {
      id: '8.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '把一个圆柱的底面等分成很多个扇形，沿半径切开后拼成一个近似的长方体。拼成的长方体的表面积比原来圆柱的表面积多了 40 cm²，圆柱的高是 5 cm（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'num', label: '(1) 圆柱的底面半径是', answer: '4', suffix: 'cm' },
        { kind: 'real', label: '(2) 圆柱的体积是', answer: '80π', suffix: 'cm³' },
      ],
      explain: [
        '拼成长方体后，原来的两个底面变成长方体的上下两面，原来的侧面变成长方体的前后两面（各是侧面的一半），面积都没变。',
        '多出来的是左右两个面：每个都是长方形，一边是圆柱的底面半径 $r$，一边是高 5 cm。',
        '(1) $2\\times r\\times5=40$，$r=4$ cm。',
        '(2) 体积 $\\pi\\times4^2\\times5=80\\pi$（cm³）。体积在切拼前后不变。',
        '常见错误：以为多出的面一边是直径，得到 $r=2$。',
      ],
      verify: () => {
        const r = F(40).div(2 * 5);
        return [r, Math.PI * Number(r.n) * Number(r.n) * 5];
      },
    },
    {
      id: '8.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '如图，一个瓶子的下部是圆柱形，内部底面直径 6 cm。瓶子正放时水深 12 cm（水面在圆柱部分），盖紧瓶盖倒过来放时，瓶底到水面的空气部分（在圆柱部分）高 3 cm（结果保留 $\\pi$）。',
      figure: FIG81.bottle,
      blanks: [
        { kind: 'real', label: '(1) 瓶子的容积是', answer: '135π', suffix: 'cm³' },
        { kind: 'num', label: '(2) 瓶中的水占瓶子容积的', answer: '80', suffix: '%' },
      ],
      explain: [
        '瓶颈形状不规则，没法直接算。关键是：倒过来后，水和空气的体积都没变。',
        '正放时水在圆柱部分，水的体积 $=\\pi\\times3^2\\times12=108\\pi$（cm³）。',
        '倒放时空气在瓶底这一头的圆柱部分，空气的体积 $=\\pi\\times3^2\\times3=27\\pi$（cm³）。',
        '(1) 容积 = 水 + 空气 $=108\\pi+27\\pi=135\\pi$（cm³）。相当于一个高 $12+3=15$ cm 的圆柱。',
        '(2) $108\\pi\\div135\\pi=\\frac{12}{15}=80\\%$。',
        '常见错误：以为瓶子高 15 cm 就是容积的高，或者用瓶子的实际高度去算。',
      ],
      verify: () => [Math.PI * 9 * (12 + 3), F(12).div(15).mul(100)],
    },
    {
      id: '8.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '把一块长 8 cm、宽 6 cm、高 4 cm 的长方体木块削成一个体积尽可能大的圆柱（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 这个圆柱的体积是', answer: '36π', suffix: 'cm³' },
        { kind: 'real', label: '(2) 削去部分的体积是', answer: '192-36π', suffix: 'cm³' },
      ],
      explain: [
        '圆柱的底面画在长方体的某一个面上，底面直径不能超过这个面的短边，高是剩下的那条棱。分三种情况：',
        '① 底面在 $8\\times6$ 的面上：直径 6，半径 3，高 4，体积 $\\pi\\times9\\times4=36\\pi$。',
        '② 底面在 $8\\times4$ 的面上：直径 4，半径 2，高 6，体积 $\\pi\\times4\\times6=24\\pi$。',
        '③ 底面在 $6\\times4$ 的面上：直径 4，半径 2，高 8，体积 $\\pi\\times4\\times8=32\\pi$。',
        '(1) 最大是 $36\\pi$ cm³。“高最长”的③并不是最大，因为半径要乘两次。',
        '(2) 长方体体积 $8\\times6\\times4=192$，削去 $192-36\\pi$（cm³）。',
      ],
      verify: () => {
        const dims = [8, 6, 4];
        let best = 0;
        for (let i = 0; i < 3; i++) {
          const h = dims[i], rest = dims.filter((_, j) => j !== i);
          const r = Math.min(...rest) / 2;
          best = Math.max(best, Math.PI * r * r * h);
        }
        return [best, 192 - best];
      },
    },
    {
      id: '8.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '甲、乙两个圆柱形容器，内部底面半径分别是 4 cm 和 3 cm。甲装有 25 cm 深的水，乙是空的。把甲中的水倒一部分到乙中。',
      blanks: [
        { kind: 'num', label: '(1) 如果乙足够高，要使两个容器的水面一样高，这时水深', answer: '16', suffix: 'cm' },
        { kind: 'num', label: '(2) 如果乙的高只有 14 cm，把乙倒满后，甲的水面比乙的水面高', answer: '3.125', suffix: 'cm' },
      ],
      explain: [
        '水的总体积 $\\pi\\times4^2\\times25=400\\pi$（cm³）不变。',
        '(1) 水面一样高，相当于把两个底面拼在一起：底面积共 $16\\pi+9\\pi=25\\pi$，水深 $400\\pi\\div25\\pi=16$（cm）。',
        '常见错误：把两个水深平均，得到 12.5 cm。',
        '(2) 乙只有 14 cm 高，倒不到 16 cm 就满了。倒入乙的水 $9\\pi\\times14=126\\pi$（cm³）。',
        '甲剩下 $400\\pi-126\\pi=274\\pi$，水深 $274\\pi\\div16\\pi=17.125$（cm），比乙的 14 cm 高 3.125 cm。',
      ],
      verify: () => {
        const total = F(16).mul(25);
        const level = total.div(25);
        const intoB = F(9).mul(14);
        const a = total.sub(intoB).div(16);
        return [level, a.sub(14)];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '8.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '有 4 个高都是 1 cm 的圆柱，底面半径分别是 1 cm、2 cm、3 cm、4 cm。把它们按某种顺序由下往上叠成一摞并粘牢，每个圆柱的底面圆心都对齐（图中是按从大到小的顺序叠的一种）。叠成的立体图形的表面积（露在外面的部分，包括最下面的底面）记作 $S$（结果保留 $\\pi$）。',
      figure: FIG81.stack,
      blanks: [
        { kind: 'real', label: '(1) 按图中从大到小的顺序叠，$S$ 是', answer: '52π', suffix: 'cm²' },
        { kind: 'real', label: '(2) 换不同的顺序叠，$S$ 最大是', answer: '68π', suffix: 'cm²' },
        { kind: 'num', label: '(3) 使 $S$ 最大的叠法有几种（从下往上的顺序不同，就算不同的叠法）？', answer: '8', suffix: '种' },
      ],
      explain: [
        '侧面不会被挡住，不管怎样叠，侧面积之和都是 $2\\pi\\times(1+2+3+4)\\times1=20\\pi$。要看的只是朝上、朝下露出的面。',
        '(1) 从大到小叠：从上往下看，朝上露出的面正好拼成最大的圆 $16\\pi$；朝下只有最下面的底面 $16\\pi$。$S=16\\pi+16\\pi+20\\pi=52\\pi$（cm²）。',
        '(2) 一般地，相邻两个圆柱，大的那个有一个圆环露出来，面积是 $\\pi\\times$（大半径$^2-$小半径$^2$）；最下面的底面和最上面的顶面整个露出。',
        '怎么想到的：在最下面和最上面各补一个“半径 0”的圆柱，那么露出的水平面积 = 相邻两个的“半径平方之差”全部加起来（每次取大减小）。这一串数从 0 出发，上上下下，最后回到 0。',
        '像爬山一样：总的“上坡 + 下坡”= 2 ×（各个山峰的高度之和）− 2 ×（各个山谷的高度之和）。要最大，山峰要尽量高、尽量多，山谷要尽量低。',
        '4 个数最多有 2 个山峰（两个山峰之间一定有山谷）。取山峰 16、9，山谷 1，数 4 放在不影响的位置（比如夹在山峰和端点之间）：水平面积最大 $2\\times(16+9)-2\\times1=48$，$\\pi$ 倍就是 $48\\pi$。',
        '$S$ 最大 $=48\\pi+20\\pi=68\\pi$（cm²）。例如按 3、1、4、2 叠：$9+(9-1)+(16-1)+(16-4)+4=48$。',
        '(3) 半径 4、3 的圆柱是山峰，中间隔着半径 1 的圆柱，半径 2 的圆柱放在一端并且挨着山峰，或者和 1 一起夹在两个山峰中间。列出来：3,1,4,2；2,4,1,3；3,1,2,4；4,2,1,3；3,2,1,4；4,1,2,3；2,3,1,4；4,1,3,2，共 8 种。',
        '常见错误：以为每个圆柱都有两个完整的底面露出来；或者以为大小交替（4,1,3,2 这种）才是唯一的最大叠法。',
      ],
      verify: () => {
        const perm = a => (a.length < 2 ? [a] : a.flatMap((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));
        const flat = p => {
          let s = p[0] * p[0] + p[p.length - 1] * p[p.length - 1];
          for (let i = 1; i < p.length; i++) s += Math.abs(p[i] * p[i] - p[i - 1] * p[i - 1]);
          return s;
        };
        const side = 2 * (1 + 2 + 3 + 4);
        const all = perm([1, 2, 3, 4]).map(flat);
        const max = Math.max(...all);
        return [(flat([4, 3, 2, 1]) + side) * Math.PI, (max + side) * Math.PI, all.filter(x => x === max).length];
      },
    },
    {
      id: '8.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '6 罐相同的圆柱形饮料，每罐底面直径 6 cm、高 12 cm。要把它们装进一个长方体纸盒：罐子排成整齐的若干行、若干列、若干层（可以都立着，也可以都躺着），罐与罐、罐与纸盒都紧贴，接缝不计。',
      blanks: [
        { kind: 'num', label: '(1) 纸盒的表面积最小是', answer: '1152', suffix: 'cm²' },
        { kind: 'num', label: '(2) 不管怎样排，盒内空隙都占纸盒容积的百分之几（$\\pi$ 取 3.14）？', answer: '21.5', suffix: '%' },
      ],
      explain: [
        '每罐正好放在一个 $6\\times6\\times12$ 的长方体“格子”里。6 个格子拼成纸盒，纸盒三条棱分别是若干个 6、若干个 6、若干个 12。',
        '(1) 格子沿三个方向分别排 $a$、$b$、$c$ 个（$c$ 是沿 12 cm 方向的个数），$a\\times b\\times c=6$。躺着放只是把 12 cm 换了方向，得到的纸盒形状和立着的某种排法一样。',
        '列出所有情况（棱长，表面积）：$c=1$ 时，$6\\times36\\times12$：1440，$12\\times18\\times12$：1152；$c=2$ 时，$6\\times18\\times24$：1368；$c=3$ 时，$6\\times12\\times36$：1440；$c=6$ 时，$6\\times6\\times72$：1800。',
        '最小是 $12\\times18\\times12$ 的纸盒（立着排 2 行 3 列 1 层），表面积 $2\\times(12\\times18+18\\times12+12\\times12)=1152$（cm²）。三条棱越接近，表面积越小。',
        '(2) 每个格子里：罐子体积 $\\pi\\times3^2\\times12=108\\pi$，格子体积 $6\\times6\\times12=432$，罐子占 $\\frac{108\\pi}{432}=\\frac{\\pi}{4}$。',
        '每个格子里罐子占的比例都一样，所以整个纸盒里也一样，和怎样排无关。空隙占 $1-\\frac{3.14}{4}=0.215=21.5\\%$。',
      ],
      verify: () => {
        let best = Infinity;
        for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let c = 1; c <= 6; c++) {
          if (a * b * c !== 6) continue;
          const [x, y, z] = [6 * a, 6 * b, 12 * c];
          best = Math.min(best, 2 * (x * y + y * z + z * x));
        }
        return [best, F(1).sub(F('3.14').div(4)).mul(100)];
      },
    },
    {
      id: '8.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '长方形 $ABCD$ 中，$AB=6$ cm，$BC=4$ cm。直线 $l$ 与 $AB$ 在同一平面内且平行，把长方形绕直线 $l$ 旋转一周（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) $l$ 在长方形外、离 $AB$ 2 cm（离 $CD$ 6 cm）时，得到的立体图形的体积是', answer: '192π', suffix: 'cm³' },
        { kind: 'real', label: '(2) $l$ 穿过长方形、离 $AB$ 1 cm 时，得到的立体图形的体积是', answer: '54π', suffix: 'cm³' },
        { kind: 'nums', label: '(3) 得到的立体图形的体积是 $150\\pi$ cm³ 时，$l$ 与 $AB$ 的距离是多少厘米（全部填出，用逗号隔开）？', answer: ['9/8', '41/8'], suffix: 'cm' },
      ],
      explain: [
        '长方形上的每个点绕 $l$ 转出一个圆，离 $l$ 越远圆越大。',
        '(1) $l$ 在外面：离 $l$ 最近 2 cm、最远 6 cm，转出一个“圆管”：大圆柱（半径 6、高 6）挖去小圆柱（半径 2、高 6）。体积 $\\pi\\times(36-4)\\times6=192\\pi$（cm³）。',
        '(2) $l$ 穿过长方形：$l$ 把长方形分成宽 1 cm 和 3 cm 两块，各转出一个圆柱（半径 1 和半径 3，高都是 6）。小的那个完全在大的里面，合起来就是半径 3 的圆柱，体积 $\\pi\\times9\\times6=54\\pi$（cm³），不是两个相加。',
        '(3) 先看 $l$ 穿过长方形时：体积 $=6\\pi\\times$（较宽那块的宽）$^2$，较宽那块的宽在 2～4 cm 之间，体积在 $24\\pi$～$96\\pi$ 之间，到不了 $150\\pi$。',
        '所以 $l$ 在长方形外。设 $l$ 在 $AB$ 外侧、离 $AB$ $d$ cm，体积 $=6\\pi\\times[(d+4)^2-d^2]=6\\pi\\times(8d+16)$。由 $6(8d+16)=150$，$8d+16=25$，$d=\\frac98$。',
        '$l$ 也可能在 $CD$ 外侧、离 $CD$ $\\frac98$ cm，这时离 $AB$ $4+\\frac98=\\frac{41}{8}$（cm）。',
        '所以距离是 $\\frac98$ cm 或 $\\frac{41}{8}$ cm。',
      ],
      verify: () => {
        // y 为 l 到 AB 的有向距离（l 在 AB 所在一侧外为正，CD 在 y=4 处）；按点到 l 的距离求旋转体体积
        const vol = y => {
          const a = -y, b = 4 - y; // 长方形两条长边相对 l 的位置
          if (a >= 0 || b <= 0) return 6 * Math.abs(b * b - a * a);
          return 6 * Math.max(a * a, b * b);
        };
        const sols = [];
        for (let k = -2000; k <= 2000; k++) {
          const d = k / 8; // l 与 AB 的位置（在 AB 所在直线的哪一侧由正负号区分）
          if (Math.abs(vol(-d) - 150) < 1e-9) sols.push(Math.abs(d));
        }
        return [vol(-2) * Math.PI, vol(1) * Math.PI, [...new Set(sols)]];
      },
    },
    {
      id: '8.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '一卷彩带紧紧绕在一个圆柱形的轴上，轴的底面半径是 1 cm，绕满后整卷的外半径是 7 cm，彩带宽 5 cm（就是整卷的高）、厚 0.05 cm。把彩带看成一个很薄的长方体，忽略各层之间的空隙（$\\pi$ 取 3.14）。',
      blanks: [
        { kind: 'num', label: '(1) 这卷彩带长多少米？', answer: '30.144', suffix: 'm' },
        { kind: 'num', label: '(2) 用去一半长度的彩带后，整卷的外半径是', answer: '5', suffix: 'cm' },
        { kind: 'num', label: '(3) 外半径变成 4 cm 时，已经用去了全部彩带的百分之几？', answer: '68.75', suffix: '%' },
      ],
      explain: [
        '彩带卷起来是一个“圆管”（大圆柱挖去轴），拉直是一个薄长方体，两者体积相等。',
        '(1) 圆管体积 $=\\pi\\times(7^2-1^2)\\times5=240\\pi$（cm³）。长方体体积 = 长 × 宽 5 × 厚 0.05，所以长 $=240\\pi\\div(5\\times0.05)=960\\pi\\approx3014.4$（cm）= 30.144 m。',
        '(2) 彩带的长度和圆管的底面（圆环）面积成正比。整卷圆环面积 $\\pi(49-1)=48\\pi$，用去一半后剩 $24\\pi$。',
        '剩下的圆环面积 $\\pi\\times(R^2-1)=24\\pi$，$R^2=25$，$R=5$ cm。不是 7 和 1 的中间 4 cm：外圈一层比内圈一层长得多。',
        '(3) 外半径 4 cm 时，剩下的圆环面积 $\\pi(16-1)=15\\pi$，用去 $48\\pi-15\\pi=33\\pi$，占 $\\frac{33}{48}=68.75\\%$。',
      ],
      verify: () => {
        const len = F('3.14').mul(49 - 1).mul(5).div(F(5).mul('0.05')).div(100);
        let R = null;
        for (let r = 1; r <= 7; r++) if ((r * r - 1) * 2 === 48) R = r;
        return [len, R, F(48 - 15).div(48).mul(100)];
      },
    },
    {
      id: '8.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '圆柱的长度单位都用厘米，面积单位用平方厘米，体积单位用立方厘米。面积和体积不能比大小，但可以比较它们的数值。研究圆柱的面积和体积的数值什么时候相等。',
      blanks: [
        { kind: 'num', label: '(1) 如果圆柱侧面积的数值等于体积的数值，底面半径是', answer: '2', suffix: 'cm' },
        { kind: 'num', label: '(2) 如果圆柱表面积的数值等于体积的数值，且底面半径、高都是整数厘米，这样的圆柱有几种？', answer: '3', suffix: '种' },
        { kind: 'real', label: '　 其中体积最小的是', answer: '54π', suffix: 'cm³' },
      ],
      explain: [
        '(1) $2\\pi rh=\\pi r^2h$，两边同除以 $\\pi rh$（都不为 0），得 $r=2$。高是多少都行。',
        '(2) $2\\pi rh+2\\pi r^2=\\pi r^2h$，两边同除以 $\\pi r$：$2h+2r=rh$。',
        '怎么想到的：把它看成关于 $h$ 的一元一次方程，$rh-2h=2r$，$(r-2)h=2r$。$r=1$、$2$ 时左边不是正数（$r=2$ 时左边是 0，右边是 4），不行，所以 $r\\ge3$，$h=\\frac{2r}{r-2}$。',
        '$\\frac{2r}{r-2}=2+\\frac{4}{r-2}$，要是整数，$r-2$ 得是 4 的因数：$r-2=1,2,4$，即 $r=3,4,6$，对应 $h=6,4,3$。',
        '所以有 3 种：$(r,h)=(3,6),(4,4),(6,3)$。',
        '体积分别是 $\\pi\\times9\\times6=54\\pi$、$\\pi\\times16\\times4=64\\pi$、$\\pi\\times36\\times3=108\\pi$，最小是 $54\\pi$ cm³。',
      ],
      verify: () => {
        let r1 = null;
        for (let r = 1; r < 50; r++) if (2 * r * 7 === r * r * 7) r1 = r;
        const pairs = [];
        for (let r = 1; r <= 200; r++) for (let h = 1; h <= 200; h++) if (2 * r * h + 2 * r * r === r * r * h) pairs.push([r, h]);
        const vmin = Math.min(...pairs.map(([r, h]) => r * r * h));
        return [r1, pairs.length, vmin * Math.PI];
      },
    },
  ],
});
