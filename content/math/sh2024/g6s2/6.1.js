'use strict';

// 上海数学六年级下册 · 6.1 圆的周长与弧长
// 知识范围：圆、圆心、半径、直径（d=2r），圆是轴对称图形；圆周率 π，圆的周长 C=πd=2πr；弧、弧长、半圆、优弧、劣弧、圆心角；弧长 l=nπr/180
// 可以使用 6 上全部内容（有理数、代数式、一元一次方程、线段与角）和第 5 章（比、比例、百分数），以及小学的长方形、正方形
// 还没学：圆和扇形的面积（6.2）、勾股定理（8 上）、三角形内角和（7 下）、平方根。题目里的长度都要直接给出，不能靠勾股定理推算
// 结果的两种要求：“结果保留 π”用 real 填空（答案写 5π+10 这样的式子），“π 取 3.14”用 num 填空

const FIG61 = {
  // 长方形 ABCD 放在直线上，AB=4、BC=3（每单位 24 像素）
  roll: (() => {
    const k = 24, x0 = 40, y0 = 110;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" width="320" height="140" font-family="Times New Roman, serif">';
    s += `<line x1="10" y1="${y0}" x2="310" y2="${y0}" stroke="#2b2b2b" stroke-width="1.5"/>`;
    s += `<rect x="${x0}" y="${y0 - 3 * k}" width="${4 * k}" height="${3 * k}" fill="#eef3fb" stroke="#2b2b2b" stroke-width="2"/>`;
    s += `<line x1="${x0}" y1="${y0}" x2="${x0 + 4 * k}" y2="${y0 - 3 * k}" stroke="#888" stroke-dasharray="4 3"/>`;
    const lab = (t, x, y) => `<text x="${x}" y="${y}" font-size="17" font-style="italic" fill="#2b2b2b">${t}</text>`;
    s += lab('A', x0 - 14, y0 + 18) + lab('B', x0 + 4 * k + 2, y0 + 18) + lab('C', x0 + 4 * k + 4, y0 - 3 * k - 4) + lab('D', x0 - 16, y0 - 3 * k - 4);
    s += `<text x="${x0 + 2 * k}" y="${y0 + 20}" text-anchor="middle" font-size="14" fill="#2b2b2b">4</text>`;
    s += `<text x="${x0 + 4 * k + 10}" y="${y0 - 1.3 * k}" font-size="14" fill="#2b2b2b">3</text>`;
    s += `<text x="${x0 + 1.6 * k}" y="${y0 - 1.6 * k}" font-size="14" fill="#666">5</text>`;
    s += `<path d="M ${x0 + 4 * k + 60} ${y0 - 40} a 26 26 0 0 1 26 26" fill="none" stroke="#c0392b" stroke-width="1.8"/><path d="M ${x0 + 4 * k + 86} ${y0 - 14} l -5 -9 l 9 2 z" fill="#c0392b"/>`;
    s += `<text x="${x0 + 4 * k + 60}" y="${y0 - 48}" font-size="13" fill="#c0392b">向右翻滚</text>`;
    return s + '</svg>';
  })(),
  // 5×3 的小屋（俯视），小狗拴在左下角 A（每单位 22 像素）
  dog: (() => {
    const k = 22, x0 = 120, y0 = 150;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200" font-family="Times New Roman, serif">';
    s += `<rect x="${x0}" y="${y0 - 3 * k}" width="${5 * k}" height="${3 * k}" fill="#ddd" stroke="#2b2b2b" stroke-width="2.5"/>`;
    s += `<text x="${x0 + 2.5 * k}" y="${y0 - 1.3 * k}" text-anchor="middle" font-size="14" fill="#2b2b2b">小屋</text>`;
    s += `<circle cx="${x0}" cy="${y0}" r="4" fill="#c0392b"/>`;
    const lab = (t, x, y) => `<text x="${x}" y="${y}" font-size="16" font-style="italic" fill="#2b2b2b">${t}</text>`;
    s += lab('A', x0 - 16, y0 + 16) + lab('B', x0 + 5 * k + 4, y0 + 16) + lab('C', x0 + 5 * k + 4, y0 - 3 * k - 4) + lab('D', x0 - 16, y0 - 3 * k - 4);
    s += `<text x="${x0 + 2.5 * k}" y="${y0 + 18}" text-anchor="middle" font-size="13" fill="#2b2b2b">5 m</text>`;
    s += `<text x="${x0 + 5 * k + 6}" y="${y0 - 1.3 * k}" font-size="13" fill="#2b2b2b">3 m</text>`;
    return s + '</svg>';
  })(),
  // 线段 AB=10 被分成 2、3、1、4 四段，每段为直径向上作半圆，AB 为直径向下作大半圆（每单位 26 像素）
  arbelos: (() => {
    const k = 26, x0 = 30, y0 = 110;
    let s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 250" width="320" height="250" font-family="Times New Roman, serif">';
    s += `<line x1="${x0}" y1="${y0}" x2="${x0 + 10 * k}" y2="${y0}" stroke="#888" stroke-dasharray="4 3"/>`;
    let x = 0;
    for (const d of [2, 3, 1, 4]) {
      const r = d * k / 2;
      s += `<path d="M ${x0 + x * k} ${y0} A ${r} ${r} 0 0 1 ${x0 + (x + d) * k} ${y0}" fill="none" stroke="#2b2b2b" stroke-width="2"/>`;
      s += `<text x="${x0 + (x + d / 2) * k}" y="${y0 + 16}" text-anchor="middle" font-size="13" fill="#666">${d}</text>`;
      x += d;
    }
    s += `<path d="M ${x0} ${y0} A ${5 * k} ${5 * k} 0 0 0 ${x0 + 10 * k} ${y0}" fill="none" stroke="#2b2b2b" stroke-width="2"/>`;
    s += `<text x="${x0 - 16}" y="${y0 + 5}" font-size="16" font-style="italic" fill="#2b2b2b">A</text><text x="${x0 + 10 * k + 4}" y="${y0 + 5}" font-size="16" font-style="italic" fill="#2b2b2b">B</text>`;
    return s + '</svg>';
  })(),
};

Content.section({
  id: 'math/sh2024/g6s2/6.1',
  title: '圆的周长与弧长',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮指出卡片例子与 b02 撞车、b09(2) 无坑、e03 与 b08 同为钟面模板、e05 一步可得、c01 只是直接除法、c03 只有计算枚举、c05 题干直接给了结论；第 2 轮改为两针重合、任意分段推广、起始差 90° 的追及、反求飞轮齿数、从拐角自己推规律，判定整节通过' },

  intro: [
    {
      title: '圆、半径和直径',
      body: '圆上每一点到圆心的距离都相等。连接圆心和圆上一点的线段叫**半径**（$r$），经过圆心、两端都在圆上的线段叫**直径**（$d$）。在同一个圆中，$d=2r$。圆是轴对称图形，过圆心的每一条直线都是它的对称轴。',
      example: '在一个正方形里画一个最大的圆，圆的直径等于正方形的边长。',
      pitfall: '“直径是半径的 2 倍”要加上“在同一个圆中”。',
    },
    {
      title: '圆周率与圆的周长',
      body: '任何一个圆的周长与直径的比值都是同一个数，叫**圆周率**，记作 $\\pi$。$\\pi$ 是无限不循环小数，$\\pi=3.14159\\cdots$，计算时常取 3.14。圆的周长 $C=\\pi d=2\\pi r$。题目要求“结果保留 $\\pi$”时，答案里直接写 $\\pi$。',
      example: '直径 9 cm 的圆，周长 $C=\\pi\\times9=9\\pi$（cm）；$\\pi$ 取 3.14 时约是 28.26 cm。',
      pitfall: '$\\pi$ 不等于 3.14，3.14 只是它的近似值。',
    },
    {
      title: '弧、半圆和圆心角',
      body: '圆上两点之间的部分叫**弧**。直径的两个端点把圆分成两条**半圆**；小于半圆的弧叫**劣弧**，大于半圆的弧叫**优弧**。顶点在圆心的角叫**圆心角**。圆上两点 $A$、$B$ 把圆分成一条劣弧和一条优弧，它们所对的圆心角加起来是 $360^\\circ$。',
      example: '劣弧 $AB$ 所对的圆心角是 $70^\\circ$，那么优弧所对的圆心角是 $290^\\circ$。',
    },
    {
      title: '弧长公式',
      body: '$1^\\circ$ 的圆心角所对的弧长是圆周长的 $\\frac{1}{360}$，所以 $n^\\circ$ 的圆心角所对的弧长是 $l=\\frac{n}{360}\\cdot2\\pi r=\\frac{n\\pi r}{180}$。在同一个圆中，弧长与它所对的圆心角成比例。',
      example: '半径 6 cm、圆心角 $40^\\circ$ 的弧长：$l=\\frac{40\\times\\pi\\times6}{180}=\\frac{4\\pi}{3}$（cm）。',
    },
    {
      title: '含弧的图形的周长',
      body: '求一个图形的周长，要把围成它的**每一条线**都算上：弧长加上直的部分。比如半圆的周长 = 半个圆周 + 一条直径。',
      example: '半径 7 cm 的半圆，周长 $=\\frac12\\times2\\pi\\times7+14=7\\pi+14$（cm）。',
      pitfall: '半圆的周长不是圆周长的一半，别漏了直径。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '6.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列说法：① 直径的长度是半径的 2 倍；② 圆周率是圆的周长与半径的比值；③ $\\pi=3.14$；④ $180^\\circ$ 的圆心角所对的弧是半圆；⑤ 周长相等的两个圆，半径一定相等。其中正确的有',
      options: ['1 个', '2 个', '3 个', '4 个'],
      answer: 1,
      explain: [
        '① 错：要在同一个圆（或两个同样大的圆）中才成立，大圆的半径可以比小圆的直径还长。',
        '② 错：圆周率是周长与**直径**的比值；周长与半径的比值是 $2\\pi$。',
        '③ 错：$\\pi$ 是无限不循环小数，3.14 只是近似值。',
        '④ 对：$180^\\circ$ 的圆心角的两边在一条直线上，就是一条直径，它所对的弧是半圆。',
        '⑤ 对：由 $C=2\\pi r$，周长相等则 $r=\\frac{C}{2\\pi}$ 也相等。',
        '正确的是 ④⑤，共 2 个。',
      ],
    },
    {
      id: '6.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '在一张长 12 cm、宽 8 cm 的长方形纸上剪下一个最大的圆，这个圆的周长是多少厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '8π', suffix: 'cm' }],
      explain: [
        '圆要放得进长方形，直径不能超过宽，所以最大的圆直径是 8 cm（不是 12 cm）。',
        '周长 $C=\\pi d=8\\pi$（cm）。',
      ],
      verify: () => Math.PI * Math.min(12, 8),
    },
    {
      id: '6.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '用一根长 62.8 cm 的铁丝恰好围成一个圆（接头处不计），这个圆的半径是多少厘米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '10', suffix: 'cm' }],
      explain: [
        '铁丝的长就是圆的周长：$C=2\\pi r=62.8$。',
        '$r=62.8\\div(2\\times3.14)=62.8\\div6.28=10$（cm）。',
        '常见错误：只除以 3.14，得到 20，那是直径。',
      ],
      verify: () => F('62.8').div(F('3.14').mul(2)),
    },
    {
      id: '6.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '一个半圆的直径是 10 cm，它的周长是多少厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '5π+10', suffix: 'cm' }],
      explain: [
        '半圆由一条弧和一条直径围成。弧长是圆周长的一半：$\\frac12\\times10\\pi=5\\pi$（cm）。',
        '再加上直径：周长 $=5\\pi+10$（cm）。常见错误：只写 $5\\pi$。',
      ],
      verify: () => Math.PI * 10 / 2 + 10,
    },
    {
      id: '6.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '在半径为 6 cm 的圆中，劣弧 $AB$ 所对的圆心角是 $150^\\circ$（结果保留 $\\pi$）。',
      blanks: [
        { kind: 'real', label: '(1) 劣弧 $AB$ 的长是', answer: '5π', suffix: 'cm' },
        { kind: 'real', label: '(2) 优弧 $AB$ 的长是', answer: '7π', suffix: 'cm' },
      ],
      explain: [
        '(1) $l=\\frac{150\\times\\pi\\times6}{180}=5\\pi$（cm）。',
        '(2) 优弧所对的圆心角是 $360^\\circ-150^\\circ=210^\\circ$，$l=\\frac{210\\times\\pi\\times6}{180}=7\\pi$（cm）。也可以用整个圆周 $12\\pi$ 减去 $5\\pi$。',
      ],
      verify: () => [150 * Math.PI * 6 / 180, 210 * Math.PI * 6 / 180],
    },
    {
      id: '6.1-b06',
      level: 'basic',
      type: 'fill',
      stem: '一条弧所在圆的半径是 9 cm，弧长是 $5\\pi$ cm。这条弧所对的圆心角是多少度？',
      blanks: [{ kind: 'num', answer: '100', suffix: '°' }],
      explain: [
        '由 $l=\\frac{n\\pi r}{180}$：$\\frac{n\\times\\pi\\times9}{180}=5\\pi$，两边同除以 $\\pi$，$\\frac{9n}{180}=5$。',
        '$n=5\\times180\\div9=100$。',
      ],
      verify: () => F(5).mul(180).div(9),
    },
    {
      id: '6.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '一辆小车的车轮直径是 70 cm。车轮滚动 200 圈，小车前进了多少米（$\\pi$ 取 3.14）？',
      blanks: [{ kind: 'num', answer: '439.6', suffix: 'm' }],
      explain: [
        '车轮滚动一圈，前进的距离是车轮的周长：$3.14\\times70=219.8$（cm）。',
        '200 圈：$219.8\\times200=43960$（cm）$=439.6$ m。',
        '常见错误：用半径算周长；或者忘了把厘米换成米。',
      ],
      verify: () => F('3.14').mul(70).mul(200).div(100),
    },
    {
      id: '6.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '钟面上分针长 10 cm。从 8 点整到 8 点 20 分，分针尖端走过的路程是多少厘米（结果保留 $\\pi$）？',
      blanks: [{ kind: 'real', answer: '20π/3', suffix: 'cm' }],
      explain: [
        '分针 60 分钟转一圈 $360^\\circ$，每分钟转 $6^\\circ$，20 分钟转 $120^\\circ$。',
        '分针尖端走的是半径 10 cm、圆心角 $120^\\circ$ 的弧：$l=\\frac{120\\times\\pi\\times10}{180}=\\frac{20\\pi}{3}$（cm）。',
        '常见错误：按钟面上的“4 个大格”当成 $40^\\circ$，或者按时针的速度算。',
      ],
      verify: () => 20 * 6 * Math.PI * 10 / 180,
    },
    {
      id: '6.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '（1）一个圆的半径增加 3 cm，它的周长增加多少？（2）另一个圆的周长增加了 $3\\pi$ cm，它的半径增加了多少？',
      blanks: [
        { kind: 'real', label: '(1) 周长增加了', answer: '6π', suffix: 'cm' },
        { kind: 'num', label: '(2) 半径增加了', answer: '1.5', suffix: 'cm' },
      ],
      explain: [
        '(1) 设原半径为 $r$，周长从 $2\\pi r$ 变成 $2\\pi(r+3)=2\\pi r+6\\pi$，增加 $6\\pi$ cm，与原来的半径无关。',
        '(2) 周长的增加量 $=2\\pi\\times$ 半径的增加量，所以半径增加 $3\\pi\\div2\\pi=1.5$（cm）。',
        '常见错误：以为（1）没给原半径就算不出来；（2）只除以 $\\pi$，得到 3 cm，那是直径的增加量。',
      ],
      verify: () => {
        const r = 7;   // 任取一个半径核对
        return [2 * Math.PI * (r + 3) - 2 * Math.PI * r, F(3).div(2)];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '6.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '学校操场的跑道由两条直道和两个半圆形弯道组成。最内圈跑道的每条直道长 85 m，内侧弯道所在半圆的直径是 60 m。每条跑道宽 1.2 m（$\\pi$ 取 3.14）。',
      blanks: [
        { kind: 'num', label: '(1) 沿最内圈（第 1 道的内侧线）跑一圈是', answer: '358.4', suffix: 'm' },
        { kind: 'num', label: '(2) 跑一整圈的比赛，第 4 道的起跑线要比第 1 道提前', answer: '22.608', suffix: 'm' },
      ],
      explain: [
        '(1) 两个半圆弯道合起来是一个直径 60 m 的圆：$3.14\\times60=188.4$（m）。一圈 $=85\\times2+188.4=358.4$（m）。',
        '(2) 外面的跑道和里面的跑道，直道一样长，只有弯道不同。每往外一道，弯道所在圆的直径增加 $1.2\\times2=2.4$（m），一圈多跑 $3.14\\times2.4=7.536$（m）。',
        '第 4 道比第 1 道往外 3 道，要提前 $7.536\\times3=22.608$（m）。',
        '常见错误：以为每道只增加 $3.14\\times1.2$；直径增加的是两个跑道宽。',
      ],
      verify: () => {
        const p = F('3.14');
        const lap = d => F(85).mul(2).add(p.mul(d));
        return [lap(60), lap(F(60).add(F('1.2').mul(2 * 3))).sub(lap(60))];
      },
    },
    {
      id: '6.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '把 12 根直径都是 10 cm 的圆管捆成一捆，横截面排成长方形的阵列（比如 2 行、每行 6 根），用绳子紧紧捆一圈（接头不计）。怎样排列所用的绳子最短？最短是多少厘米（结果保留 $\\pi$）？',
      blanks: [
        { kind: 'text', label: '(1) 排成', options: ['1 行 12 根', '2 行 6 根', '3 行 4 根'], answer: '3 行 4 根' },
        { kind: 'real', label: '(2) 最短的绳长是', answer: '100+10π', suffix: 'cm' },
      ],
      explain: [
        '绳子由直的部分和绕在四个角上圆管的弧组成。长方形阵列的每个角上，绳子绕过圆管的四分之一圆周，四个角合起来正好是一个整圆：$10\\pi$ cm，与怎样排列无关。',
        '直的部分：绳子与圆管相切的地方之间的距离，等于同一排两端圆管圆心的距离。$a$ 行 $b$ 根时，直的部分共 $2\\times[(a-1)+(b-1)]\\times10$ cm。',
        '1 行 12 根：$2\\times(0+11)\\times10=220$；2 行 6 根：$2\\times(1+5)\\times10=120$；3 行 4 根：$2\\times(2+3)\\times10=100$。',
        '所以排成 3 行 4 根最省，绳长 $100+10\\pi$ cm。行数和每行根数越接近，直的部分越短。',
      ],
      verify: () => {
        const opts = [[1, 12], [2, 6], [3, 4]];
        const len = ([a, b]) => 2 * ((a - 1) + (b - 1)) * 10 + 10 * Math.PI;
        const best = opts.reduce((x, y) => (len(y) < len(x) ? y : x));
        return [`${best[0]} 行 ${best[1]} 根`, len(best)];
      },
    },
    {
      id: '6.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '钟面上时针长 6 cm，分针长 9 cm。从 3 点整开始，到时针和分针第一次重合为止（结果保留 $\\pi$）：',
      blanks: [
        { kind: 'real', label: '(1) 分针尖端走过的路程是', answer: '54π/11', suffix: 'cm' },
        { kind: 'real', label: '(2) 时针尖端走过的路程是', answer: '3π/11', suffix: 'cm' },
      ],
      explain: [
        '先求经过多少分钟两针重合。分针每分钟转 $6^\\circ$，时针每分钟转 $0.5^\\circ$。3 点整时分针指 12、时针指 3，分针落后 $90^\\circ$。',
        '设 $t$ 分钟后第一次重合：$6t-0.5t=90$，$t=\\frac{180}{11}$（分钟）。',
        '(1) 分针转了 $6\\times\\frac{180}{11}=\\frac{1080}{11}$（度），走过 $\\frac{1080}{11}\\times\\frac{\\pi\\times9}{180}=\\frac{54\\pi}{11}$（cm）。',
        '(2) 时针转了 $0.5\\times\\frac{180}{11}=\\frac{90}{11}$（度），走过 $\\frac{90}{11}\\times\\frac{\\pi\\times6}{180}=\\frac{3\\pi}{11}$（cm）。',
        '常见错误：以为 3 点 15 分重合（那时时针已经走过了 3）。',
      ],
      verify: () => {
        const t = F(90).div(F(6).sub('0.5'));
        const a1 = t.mul(6), a2 = t.mul('0.5');
        return [Number(a1.n) / Number(a1.d) * Math.PI * 9 / 180, Number(a2.n) / Number(a2.d) * Math.PI * 6 / 180];
      },
    },
    {
      id: '6.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '$A$、$B$、$C$ 是半径为 9 cm 的圆上的三个点，劣弧 $AB$ 所对的圆心角是 $100^\\circ$，劣弧 $BC$ 所对的圆心角是 $60^\\circ$。劣弧 $AC$ 的长可能是多少厘米（结果保留 $\\pi$，全部填出，用逗号隔开）？',
      blanks: [{ kind: 'reals', answer: ['8π', '2π'], suffix: 'cm' }],
      explain: [
        '没有图，点 $C$ 可以在点 $B$ 的两侧，要分两种情况。',
        '① $C$ 与 $A$ 在 $B$ 的两侧：$\\angle AOC=100^\\circ+60^\\circ=160^\\circ$，小于 $180^\\circ$，劣弧 $AC$ 长 $\\frac{160\\times\\pi\\times9}{180}=8\\pi$（cm）。',
        '② $C$ 与 $A$ 在 $B$ 的同侧：$\\angle AOC=100^\\circ-60^\\circ=40^\\circ$，劣弧 $AC$ 长 $\\frac{40\\times\\pi\\times9}{180}=2\\pi$（cm）。',
        '所以是 $8\\pi$ cm 或 $2\\pi$ cm。注意：若两角之和超过 $180^\\circ$，劣弧所对的圆心角要用 $360^\\circ$ 减去这个和。',
      ],
      verify: () => {
        const res = [];
        for (const ang of [100 + 60, Math.abs(100 - 60)]) {
          const minor = ang > 180 ? 360 - ang : ang;
          res.push(minor * Math.PI * 9 / 180);
        }
        return res;
      },
    },
    {
      id: '6.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '如图，线段 $AB=10$ cm，把它分成长 2 cm、3 cm、1 cm、4 cm 的四段，在 $AB$ 上方以每一段为直径作半圆；在 $AB$ 下方以 $AB$ 为直径作一个大半圆（结果保留 $\\pi$）。',
      figure: FIG61.arbelos,
      blanks: [
        { kind: 'real', label: '(1) 所有弧线围成的封闭图形（不含线段 $AB$）的周长是', answer: '10π', suffix: 'cm' },
        { kind: 'text', label: '(2) 如果把 $AB$ 任意分成若干段（段数、长度都不知道），同样在上方作小半圆。蚂蚁甲沿下方大半圆从 $A$ 爬到 $B$，蚂蚁乙沿上方的小半圆从 $A$ 爬到 $B$，谁爬的路程长？', options: ['甲长', '乙长', '一样长', '不能确定'], answer: '一样长' },
        { kind: 'num', label: '(3) 在 (2) 中，如果乙再在每个小半圆内部，把它的直径二等分作两个更小的半圆，改沿这些更小的半圆爬，乙的路程是甲的几倍？', answer: '1', suffix: '倍' },
      ],
      explain: [
        '直径为 $d$ 的半圆，弧长是 $\\frac12\\pi d$，与直径成比例。',
        '(1) 四个小半圆的弧长之和 $=\\frac12\\pi\\times(2+3+1+4)=5\\pi$；下方大半圆 $\\frac12\\pi\\times10=5\\pi$；周长 $10\\pi$ cm。',
        '(2) 设各段长 $d_1,d_2,\\cdots,d_k$，它们的和是 $AB=10$。乙的路程 $=\\frac12\\pi d_1+\\frac12\\pi d_2+\\cdots+\\frac12\\pi d_k=\\frac12\\pi(d_1+d_2+\\cdots+d_k)=5\\pi$，与甲一样长，与怎么分无关。',
        '(3) 每个小半圆换成两个直径减半的半圆，每一处的弧长和不变（道理同 (2)），总路程还是 $5\\pi$，是甲的 1 倍。半圆越分越小，路线越来越贴近线段 $AB$，长度却始终是 $5\\pi$，不会接近 10。',
      ],
      verify: () => {
        const small = [2, 3, 1, 4].reduce((s, d) => s + Math.PI * d / 2, 0);
        const smaller = [2, 3, 1, 4].reduce((s, d) => s + 2 * Math.PI * (d / 2) / 2, 0);
        return [small + Math.PI * 10 / 2, Math.abs(small - Math.PI * 5) < 1e-12 ? '一样长' : '不能确定', F(Math.round(smaller / (Math.PI * 5) * 1e6)).div(1e6)];
      },
    },
    {
      id: '6.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '两个扇形的弧长相等。甲扇形的半径是 12 cm，乙扇形的半径是 8 cm，乙扇形的圆心角比甲扇形的圆心角大 $30^\\circ$。',
      blanks: [
        { kind: 'num', label: '(1) 甲扇形的圆心角是', answer: '60', suffix: '°' },
        { kind: 'real', label: '(2) 乙扇形的周长是（结果保留 $\\pi$）', answer: '16+4π', suffix: 'cm' },
      ],
      explain: [
        '(1) 设甲的圆心角是 $n^\\circ$，乙是 $(n+30)^\\circ$。弧长相等：$\\frac{n\\pi\\times12}{180}=\\frac{(n+30)\\pi\\times8}{180}$，两边同乘 $\\frac{180}{\\pi}$：$12n=8(n+30)$，$n=60$。',
        '也可以用比例看：由 $12n=8(n+30)$，根据比例的基本性质得 $n:(n+30)=8:12=2:3$，两个圆心角相差 1 份，1 份是 $30^\\circ$，所以 $n=60$。',
        '(2) 乙的圆心角 $90^\\circ$，弧长 $\\frac{90\\times\\pi\\times8}{180}=4\\pi$（cm），与甲的弧长 $\\frac{60\\times\\pi\\times12}{180}=4\\pi$ 相等。',
        '扇形的周长还要加两条半径：$4\\pi+8\\times2=16+4\\pi$（cm）。常见错误：只算弧长。',
      ],
      verify: () => {
        let n = null;
        for (let k = 1; k < 330; k++) if (12 * k === 8 * (k + 30)) n = k;
        return [n, (n + 30) * Math.PI * 8 / 180 + 16];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '6.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '两条圆形跑道有同一个圆心 $O$，内圈半径 30 m，外圈半径 40 m。甲在内圈、乙在外圈，都沿逆时针方向跑，两人每秒都跑 $\\pi$ m。出发时，乙所在的半径比甲所在的半径沿逆时针方向超前 $90^\\circ$（$\\angle$甲$O$乙 $=90^\\circ$）。',
      blanks: [
        { kind: 'num', label: '(1) 出发后，至少经过多少秒，两人第一次在同一条半径上（在圆心同侧）？', answer: '60', suffix: '秒' },
        { kind: 'num', label: '(2) 出发后，至少经过多少秒，两人第一次与圆心 $O$ 在同一条直线上且分别在圆心两侧？', answer: '180', suffix: '秒' },
        { kind: 'real', label: '(3) 两人第 3 次在圆心两侧共线时，甲一共跑了多少米（结果保留 $\\pi$）？', answer: '660π', suffix: 'm' },
      ],
      explain: [
        '关键：两人跑得一样快，但圆的大小不同，每秒转过的**圆心角**不同。把路程换成圆心角，就变成环形跑道上的追及问题。',
        '甲每秒跑 $\\pi$ m，由 $\\frac{n\\pi\\times30}{180}=\\pi$ 得每秒转 $6^\\circ$；乙由 $\\frac{n\\pi\\times40}{180}=\\pi$ 得每秒转 $4.5^\\circ$。甲每秒比乙多转 $1.5^\\circ$，甲在“追”乙，开始落后 $90^\\circ$。',
        '(1) 同一条半径上：甲要追上这 $90^\\circ$，$90\\div1.5=60$（秒）。',
        '(2) 圆心两侧共线：甲要比乙多转 $90^\\circ+180^\\circ=270^\\circ$ 的差距，也就是 $270\\div1.5=180$（秒）。注意不是 $180\\div1.5=120$，出发时两人并不共线。',
        '(3) 此后甲每多转 $360^\\circ$ 相对角度，就再出现一次“两侧共线”，间隔 $360\\div1.5=240$ 秒。第 1、2、3 次分别在 180、420、660 秒。',
        '甲跑了 $660\\times\\pi=660\\pi$（m）。',
      ],
      verify: () => {
        const w1 = F(180).div(30), w2 = F(180).div(40);   // 每秒转过的度数：l=π 时 n=180/r
        const rel = w1.sub(w2);
        const gap = t => rel.mul(t).sub(90);                 // 甲比乙多转的角度（开始是 -90）
        let same = null; const opp = [];
        for (let k = 1; k <= 1200 * 2; k++) {
          const t = F(k).div(2);
          const g = gap(t);
          if (g.div(360).d === 1n && same === null) same = t;
          if (g.sub(180).div(360).d === 1n) opp.push(t);
        }
        return [same, opp[0], Number(opp[2].n) / Number(opp[2].d) * Math.PI];
      },
    },
    {
      id: '6.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '如图，长方形 $ABCD$ 中 $AB=4$，$BC=3$，对角线 $AC=BD=5$。它放在直线上（$AB$ 在直线上），向右无滑动地翻滚：第 1 次绕点 $B$ 顺时针旋转 $90^\\circ$，使 $BC$ 落在直线上；第 2 次再绕此时右下角的顶点旋转 $90^\\circ$……依此类推（结果保留 $\\pi$）。',
      figure: FIG61.roll,
      blanks: [
        { kind: 'real', label: '(1) 翻滚 4 次后，顶点 $A$ 经过的路线长是', answer: '6π' },
        { kind: 'real', label: '(2) 翻滚 10 次后，顶点 $A$ 经过的路线长是', answer: '33π/2' },
        { kind: 'num', label: '(3) 第几次翻滚结束时，顶点 $A$ 经过的路线长第一次超过 $50\\pi$？第', answer: '34', suffix: '次' },
      ],
      explain: [
        '每次翻滚都是绕一个顶点旋转 $90^\\circ$，顶点 $A$ 走过一段四分之一圆弧，半径是 $A$ 到这次旋转中心的距离，弧长 $=\\frac{90\\pi r}{180}=\\frac{\\pi r}{2}$。',
        '旋转中心依次是 $B$、$C$、$D$、$A$，然后又是 $B$、$C$、……4 次一个循环。$A$ 到它们的距离依次是 $AB=4$、$AC=5$、$AD=3$、0（绕 $A$ 自己转时 $A$ 不动）。',
        '(1) 一个循环：$\\frac{\\pi}{2}\\times(4+5+3+0)=6\\pi$。',
        '(2) 10 次 = 2 个循环 + 前 2 次（绕 $B$、绕 $C$）：$2\\times6\\pi+\\frac{\\pi}{2}\\times(4+5)=12\\pi+\\frac{9\\pi}{2}=\\frac{33\\pi}{2}$。',
        '(3) 8 个循环（32 次）后是 $48\\pi$。第 33 次绕 $B$，加 $2\\pi$，正好 $50\\pi$，还没有超过；第 34 次绕 $C$，加 $\\frac{5\\pi}{2}$，变成 $52.5\\pi$，第一次超过。所以是第 34 次。',
      ],
      verify: () => {
        const r = [4, 5, 3, 0];
        const after = k => { let s = 0; for (let i = 0; i < k; i++) s += r[i % 4] / 2; return s; };   // π 的系数
        let k = 1;
        while (after(k) <= 50) k++;
        return [after(4) * Math.PI, after(10) * Math.PI, k];
      },
    },
    {
      id: '6.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '一辆自行车的车轮直径是 70 cm。脚踏带动前面的齿盘，链条带动后轮上的飞轮，飞轮和后轮一起转。链条传动时，齿盘和飞轮转过的齿数相同。这辆车的齿盘有 48 齿、36 齿两种，飞轮有 12 齿、16 齿、18 齿、24 齿四种，可以任意搭配（$\\pi$ 取 3.14）。',
      blanks: [
        { kind: 'num', label: '(1) 用 48 齿的齿盘和 16 齿的飞轮，脚踏踩一圈，自行车前进', answer: '659.4', suffix: 'cm' },
        { kind: 'num', label: '(2) 小华每分钟踩 60 圈，要使 1 小时骑行的路程在 20 km 到 25 km 之间（含 20 km 和 25 km），可以选的搭配有几种？', answer: '3', suffix: '种' },
        { kind: 'nums', label: '(3) 再给这辆车加一个飞轮，齿数是 10 到 30 之间的整数，且和原有的四个都不同。加上以后，(2) 中可以选的搭配变成 4 种，新飞轮的齿数可能是（全部填出，用逗号隔开）', answer: ['13', '14', '17'] },
      ],
      explain: [
        '(1) 脚踏踩一圈，齿盘转过 48 个齿，飞轮也转过 48 个齿，也就是转 $48\\div16=3$ 圈，后轮跟着转 3 圈。后轮一圈前进 $3.14\\times70=219.8$（cm），3 圈前进 659.4 cm。',
        '(2) 一般地，踩一圈后轮转 $\\text{齿盘齿数}\\div\\text{飞轮齿数}$ 圈，记这个比值为 $k$。1 小时踩 3600 圈，前进 $3600\\times k\\times219.8$ cm $=7.9128k$ km。要 $20\\le7.9128k\\le25$，$k$ 大约在 2.53 到 3.16 之间。',
        '八种搭配的 $k$：$48:12=4$，$48:16=3$，$48:18\\approx2.67$，$48:24=2$，$36:12=3$，$36:16=2.25$，$36:18=2$，$36:24=1.5$。符合的是 48 与 16、48 与 18、36 与 12，共 3 种。',
        '(3) 反过来想：新飞轮齿数 $x$ 要让恰好多出 1 种。配 48 齿时，$48\\div x$ 在 2.53 到 3.16 之间，$x$ 在 $48\\div3.16\\approx15.2$ 到 $48\\div2.53\\approx19.0$ 之间，可取 16、17、18；配 36 齿时，$x$ 在 $36\\div3.16\\approx11.4$ 到 $36\\div2.53\\approx14.2$ 之间，可取 12、13、14。',
        '注意边界：$x=19$ 时 $48\\div19\\approx2.526$，1 小时约 19.98 km，差一点不到 20 km，要算准再判断，不能中途粗略四舍五入。去掉原有的 12、16、18，新飞轮可以是 13、14、17，每个都只多出 1 种；没有哪个齿数能同时配两个齿盘（两个范围不重叠）。',
      ],
      verify: () => {
        const wheel = F('3.14').mul(70);   // cm
        const ok = (a, b) => { const km = F(3600).mul(a).div(b).mul(wheel).div(100000); return km.cmp(20) >= 0 && km.cmp(25) <= 0; };
        const count = rears => { let c = 0; for (const a of [48, 36]) for (const b of rears) if (ok(a, b)) c++; return c; };
        const base = [12, 16, 18, 24];
        const res = [];
        for (let x = 10; x <= 30; x++) if (!base.includes(x) && count([...base, x]) === 4) res.push(x);
        return [wheel.mul(48).div(16), count(base), res];
      },
    },
    {
      id: '6.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '如图，一间长方形小屋的墙角 $A$ 处拴着一只小狗，小屋长 5 m、宽 3 m（$AB=5$ m，$AD=3$ m），小屋四周是空地，小狗不能进屋。拴狗的绳子长度记为 $L$。小狗能到达的区域，边界由墙和若干段弧组成，求这些弧的总长（结果保留 $\\pi$）。',
      figure: FIG61.dog,
      blanks: [
        { kind: 'real', label: '(1) $L=4$ m 时，弧的总长是', answer: '13π/2', suffix: 'm' },
        { kind: 'real', label: '(2) $L=7$ m 时，弧的总长是', answer: '27π/2', suffix: 'm' },
      ],
      explain: [
        '绳子拴在 $A$，小屋挡住了 $A$ 处的一个直角，所以绳子拉直时，小狗能到达以 $A$ 为圆心、圆心角 $360^\\circ-90^\\circ=270^\\circ$ 的一大片扇形。',
        '绳子还能沿着墙绕过墙角：沿 $AD$ 绕过 $D$ 后，剩下 $L-3$ 的绳子以 $D$ 为圆心转 $90^\\circ$；沿 $AB$ 绕过 $B$ 后，剩下 $L-5$ 的绳子以 $B$ 为圆心转 $90^\\circ$（剩下的长度要是正的才有这一段）。',
        '(1) $L=4$：大弧 $\\frac{270\\pi\\times4}{180}=6\\pi$；绕过 $D$ 剩 1 m，小弧 $\\frac{90\\pi\\times1}{180}=\\frac{\\pi}{2}$；$4<5$，绕不过 $B$。总长 $6\\pi+\\frac{\\pi}{2}=\\frac{13\\pi}{2}$（m）。',
        '(2) $L=7$：大弧 $\\frac{270\\pi\\times7}{180}=\\frac{21\\pi}{2}$；绕过 $D$ 剩 4 m，弧长 $\\frac{90\\pi\\times4}{180}=2\\pi$（这段弧最远到离 $D$ 4 m 处，没超过屋顶边 $DC=5$ m，碰不到 $C$）；绕过 $B$ 剩 2 m，弧长 $\\pi$（最远到离 $B$ 2 m 处，没超过 $BC=3$ m）。',
        '总长 $\\frac{21\\pi}{2}+2\\pi+\\pi=\\frac{27\\pi}{2}$（m）。',
        '要检查的是：绕过一个墙角后剩下的绳子，会不会长到还能再绕过下一个墙角——这里都不会，所以每个墙角只多出一段四分之一圆弧。',
      ],
      verify: () => {
        const arcs = L => {
          let s = 270 * L / 180;                 // π 的系数
          if (L > 3) { if (L - 3 > 5) return null; s += 90 * (L - 3) / 180; }
          if (L > 5) { if (L - 5 > 3) return null; s += 90 * (L - 5) / 180; }
          return s * Math.PI;
        };
        return [arcs(4), arcs(7)];
      },
    },
    {
      id: '6.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '一个圆沿直线无滑动地滚动一圈，圆心前进的距离正好等于它的周长。一个圆沿着折线或另一个圆的边无滑动地滚动时，它自转几圈呢？（自转圈数指圆上某条半径的方向，相对地面一共转了几整圈。）',
      blanks: [
        { kind: 'num', label: '(1) 一个半径 3 cm 的圆，沿边长 $6\\pi$ cm 的正方形外侧贴着边滚动一周回到原处，自转了', answer: '5', suffix: '圈' },
        { kind: 'num', label: '(2) 一个固定的圆，半径是滚动的圆的 2 倍，滚动的圆沿它的外侧滚动一周回到原处，自转了', answer: '3', suffix: '圈' },
        { kind: 'num', label: '(3) 同样这两个圆，滚动的圆沿固定圆的内侧滚动一周回到原处，自转了', answer: '1', suffix: '圈' },
      ],
      explain: [
        '(1) 分两部分看。在每条边上是沿直线滚动：边长 $6\\pi$，圆周长 $6\\pi$，每条边滚 1 圈，四条边 4 圈。',
        '在每个顶点处，圆没法“滚”过去，而是以顶点为中心整个转过去：从贴住这条边转到贴住下一条边，转了 $90^\\circ$，也就是自转 $\\frac14$ 圈；这时圆心走了一段半径 3 cm、圆心角 $90^\\circ$ 的弧，长 $\\frac32\\pi$，正好也是周长的 $\\frac14$。四个顶点合起来多转 1 圈，共 5 圈。',
        '由此看出：不论在直边上还是拐角处，都是“圆心走过一个周长，圆自转一圈”，所以 自转圈数 = 圆心经过的路程 ÷ 滚动的圆的周长。(1) 中圆心路程 $24\\pi+6\\pi=30\\pi$，$30\\pi\\div6\\pi=5$。',
        '(2) 设滚动的圆半径为 $r$，固定圆半径 $2r$。在外侧滚动时，圆心离固定圆的圆心 $2r+r=3r$，圆心路线是半径 $3r$ 的圆，路程 $6\\pi r$，自转 $6\\pi r\\div2\\pi r=3$（圈）。',
        '(3) 在内侧滚动时，圆心离固定圆的圆心 $2r-r=r$，圆心路程 $2\\pi r$，自转 $2\\pi r\\div2\\pi r=1$（圈）。',
        '直觉上会以为 (2) 是 2 圈（固定圆周长是滚动圆的 2 倍），其实外侧要多 1 圈，内侧要少 1 圈。',
      ],
      verify: () => {
        const turns = (path, r) => Math.round(path / (2 * Math.PI * r) * 1e9) / 1e9;
        const r = 1;
        return [turns(4 * 6 * Math.PI + 2 * Math.PI * 3, 3), turns(2 * Math.PI * (2 * r + r), r), turns(2 * Math.PI * (2 * r - r), r)];
      },
    },
  ],
});
