'use strict';

// 上海数学六年级下册 · 7.2 数据的收集、整理与表达
// 知识范围：全面调查与抽查（抽查对象的代表性、广泛性，抽查数量）；划记、统计表；条形统计图、折线统计图、扇形统计图及其特点；
// 扇形统计图中 百分比 = 圆心角 ÷ 360°，圆心角 = 360° × 百分比；从两幅不完整的统计图中读取信息并补全
// 可以使用 7.1、第 5 章（比、比例、百分数）、第 6 章（扇形）和 6 上的全部内容（方程）
// 还没学：用样本估计总体、平均数的统计意义、百分数表示可能性（7.3）；中位数、众数、方差、频数分布直方图（课本都没有）

const FIG72 = (() => {
  const ink = '#2b2b2b', bar = '#9dc3e6', mute = '#888';
  // 条形统计图：values 中的 null 画成虚线空条并标“?”
  const barChart = (labels, values, { min = 0, max, step, unit = '人数', w = 300, h = 200 }) => {
    const x0 = 40, y0 = h - 30, top = 20, bw = (w - x0 - 10) / labels.length;
    const Y = v => y0 - ((v - min) / (max - min)) * (y0 - top);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif">`;
    for (let v = min; v <= max; v += step) {
      s += `<line x1="${x0}" y1="${Y(v)}" x2="${w - 10}" y2="${Y(v)}" stroke="#e3e3e3"/>`;
      s += `<text x="${x0 - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="${mute}">${v}</text>`;
    }
    s += `<line x1="${x0}" y1="${y0}" x2="${w - 10}" y2="${y0}" stroke="${ink}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${top - 6}" stroke="${ink}"/>`;
    s += `<text x="${x0 - 4}" y="${top - 10}" text-anchor="end" font-size="11" fill="${mute}">${unit}</text>`;
    labels.forEach((lab, i) => {
      const cx = x0 + bw * (i + 0.5), v = values[i];
      if (v === null) {
        s += `<rect x="${cx - bw * 0.3}" y="${y0 - 14}" width="${bw * 0.6}" height="14" fill="#eee" stroke="${mute}" stroke-dasharray="3 2"/>`;
        s += `<text x="${cx}" y="${y0 - 18}" text-anchor="middle" font-size="13" fill="${ink}">?</text>`;
      } else {
        s += `<rect x="${cx - bw * 0.3}" y="${Y(v)}" width="${bw * 0.6}" height="${y0 - Y(v)}" fill="${bar}" stroke="${ink}" stroke-width="0.8"/>`;
        s += `<text x="${cx}" y="${Y(v) - 4}" text-anchor="middle" font-size="12" fill="${ink}">${v}</text>`;
      }
      s += `<text x="${cx}" y="${y0 + 16}" text-anchor="middle" font-size="12" fill="${ink}">${lab}</text>`;
    });
    return s + '</svg>';
  };
  // 扇形统计图：items [{ label, pct, hide }]，按真实的 pct 画扇形；hide 为 true 时百分比处只标“?”
  const pieChart = (items, { w = 260, h = 200 } = {}) => {
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 22;
    const shades = ['#9dc3e6', '#f4b183', '#c5e0b4', '#ffe699', '#d9c3e9', '#e2e2e2'];
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif">`;
    let a0 = -90;
    items.forEach((it, i) => {
      const p = it.pct;
      const a1 = a0 + p * 3.6;
      const P = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
      const [x1, y1] = P(a0), [x2, y2] = P(a1);
      s += `<path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${p > 50 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${shades[i % shades.length]}" stroke="#fff" stroke-width="1.5"/>`;
      const mid = (a0 + a1) / 2, [tx, ty] = [cx + r * 0.6 * Math.cos(mid * Math.PI / 180), cy + r * 0.6 * Math.sin(mid * Math.PI / 180)];
      s += `<text x="${tx.toFixed(1)}" y="${(ty - 2).toFixed(1)}" text-anchor="middle" font-size="12" fill="${ink}">${it.label}</text>`;
      s += `<text x="${tx.toFixed(1)}" y="${(ty + 12).toFixed(1)}" text-anchor="middle" font-size="12" fill="${ink}">${it.hide ? '?' : it.pct + '%'}</text>`;
      a0 = a1;
    });
    return s + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${ink}" stroke-width="1"/></svg>`;
  };
  // 折线统计图：values 中的 null 不画点，只在该位置标“?”
  const lineChart = (labels, values, { min = 0, max, step, unit, w = 300, h = 200 }) => {
    const x0 = 44, y0 = h - 30, top = 20, dx = (w - x0 - 44) / (labels.length - 1);
    const Y = v => y0 - ((v - min) / (max - min)) * (y0 - top);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif">`;
    for (let v = min; v <= max; v += step) {
      s += `<line x1="${x0}" y1="${Y(v)}" x2="${w - 10}" y2="${Y(v)}" stroke="#e3e3e3"/>`;
      s += `<text x="${x0 - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="${mute}">${v}</text>`;
    }
    s += `<line x1="${x0}" y1="${y0}" x2="${w - 10}" y2="${y0}" stroke="${ink}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${top - 6}" stroke="${ink}"/>`;
    s += `<text x="${x0 - 4}" y="${top - 10}" text-anchor="end" font-size="11" fill="${mute}">${unit}</text>`;
    let prev = null;
    labels.forEach((lab, i) => {
      const x = x0 + 22 + dx * i, v = values[i];
      s += `<text x="${x}" y="${y0 + 16}" text-anchor="middle" font-size="12" fill="${ink}">${lab}</text>`;
      if (v === null) { s += `<text x="${x}" y="${y0 - 8}" text-anchor="middle" font-size="14" fill="${ink}">?</text>`; prev = null; return; }
      if (prev) s += `<line x1="${prev[0]}" y1="${prev[1]}" x2="${x}" y2="${Y(v)}" stroke="#2e75b6" stroke-width="2"/>`;
      s += `<circle cx="${x}" cy="${Y(v)}" r="3.5" fill="#2e75b6"/><text x="${x}" y="${Y(v) - 8}" text-anchor="middle" font-size="12" fill="${ink}">${v}</text>`;
      prev = [x, Y(v)];
    });
    return s + '</svg>';
  };
  // 两组并列条形（男、女）
  const groupBar = (labels, a, b, { max, step, w = 300, h = 200 }) => {
    const x0 = 40, y0 = h - 30, top = 24, bw = (w - x0 - 10) / labels.length;
    const Y = v => y0 - (v / max) * (y0 - top);
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Times New Roman, serif">`;
    for (let v = 0; v <= max; v += step) {
      s += `<line x1="${x0}" y1="${Y(v)}" x2="${w - 10}" y2="${Y(v)}" stroke="#e3e3e3"/><text x="${x0 - 6}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="${mute}">${v}</text>`;
    }
    s += `<line x1="${x0}" y1="${y0}" x2="${w - 10}" y2="${y0}" stroke="${ink}"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${top - 6}" stroke="${ink}"/>`;
    s += `<rect x="${w - 110}" y="4" width="10" height="10" fill="#9dc3e6"/><text x="${w - 96}" y="13" font-size="11" fill="${ink}">男生</text>`;
    s += `<rect x="${w - 60}" y="4" width="10" height="10" fill="#f4b183"/><text x="${w - 46}" y="13" font-size="11" fill="${ink}">女生</text>`;
    labels.forEach((lab, i) => {
      const cx = x0 + bw * (i + 0.5);
      [[a[i], '#9dc3e6', -1], [b[i], '#f4b183', 1]].forEach(([v, col, side]) => {
        const x = cx + (side < 0 ? -bw * 0.34 : 0);
        if (v === null) {
          s += `<rect x="${x}" y="${y0 - 14}" width="${bw * 0.34}" height="14" fill="#eee" stroke="${mute}" stroke-dasharray="3 2"/><text x="${x + bw * 0.17}" y="${y0 - 18}" text-anchor="middle" font-size="12" fill="${ink}">?</text>`;
        } else {
          s += `<rect x="${x}" y="${Y(v)}" width="${bw * 0.34}" height="${y0 - Y(v)}" fill="${col}" stroke="${ink}" stroke-width="0.6"/><text x="${x + bw * 0.17}" y="${Y(v) - 3}" text-anchor="middle" font-size="11" fill="${ink}">${v}</text>`;
        }
      });
      s += `<text x="${cx}" y="${y0 + 16}" text-anchor="middle" font-size="12" fill="${ink}">${lab}</text>`;
    });
    return s + '</svg>';
  };
  return {
    b05: barChart(['篮球', '足球', '羽毛球', '跳绳', '其他'], [12, 8, null, 6, 4], { max: 14, step: 2 }),
    b06: pieChart([{ label: 'A', pct: 30 }, { label: 'B', pct: 25 }, { label: 'C', pct: 30, hide: true }, { label: 'D', pct: 15 }]),
    b08: lineChart(['1月', '2月', '3月', '4月', '5月', '6月'], [20, 25, 22, 30, 36, 33], { max: 40, step: 10, unit: '万元' }),
    e01bar: barChart(['阅读', '运动', '音乐', '美术', '其他'], [null, 48, null, 18, 12], { max: 50, step: 10 }),
    e01pie: pieChart([{ label: '运动', pct: 40 }, { label: '美术', pct: 15 }, { label: '阅读', pct: 15, hide: true }, { label: '音乐', pct: 20, hide: true }, { label: '其他', pct: 10, hide: true }]),
    e03: barChart(['A', 'B', 'C'], [105, 115, 110], { min: 100, max: 120, step: 5, unit: '件' }),
    c03: lineChart(['3月', '4月', '5月', '6月'], [50, null, 72, null], { max: 80, step: 10, unit: '万元' }),
    c05: groupBar(['A', 'B', 'C', 'D'], [8, null, 6, 2], [6, 10, null, 4], { max: 16, step: 4 }),
  };
})();

Content.section({
  id: 'math/sh2024/g6s2/7.2',
  title: '数据的收集、整理与表达',
  review: { status: 'pending' },
  audit: { blind: '2026-09-30', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮指出 e01 扇形图遮住的部分按平均份数画错、被遮住的条形高度有误导、c01 与 e05 同为“人次减人数”、c03 答案不整且要开平方、卡片例子泄露 b01、b02、b04、b07、扩展档缺 5 级题；第 2 轮扇形按真实比例画、遮挡统一画矮框，c01 改为 1～3 个小组的最值、c03 改数据并用比例中项观察求值、e06 加难，判定整节通过' },

  intro: [
    {
      title: '全面调查与抽查',
      body: '考察全体对象的调查叫**全面调查**，结果准确，但对象多时费时费力；只考察一部分对象的叫**抽查**，省时省力，但结果不如全面调查准确。调查会破坏对象（比如测寿命）、对象太多时用抽查；对象少、要求准确时用全面调查。抽查要注意抽查对象的**代表性和广泛性**，数量也不能太少。',
      example: '检验一批烟花的燃放效果用抽查；对乘坐高铁的旅客做安检用全面调查。',
      pitfall: '只调查某一类人（比如只在健身房门口问“每天运动多久”），样本没有代表性，结论会偏。',
    },
    {
      title: '数据的整理：划记和统计表',
      body: '收集到的原始数据先分类整理：用“正”字划记，每个“正”表示 5，再写成统计表，最后一行“合计”用来核对总数。',
      example: '“正正下”表示 13 个；各类人数加起来要等于调查的总人数。',
    },
    {
      title: '三种统计图的特点',
      body: '**条形统计图**能清楚地表示每个项目的具体数目；**折线统计图**能清楚地反映数据的变化情况和趋势；**扇形统计图**能清楚地表示各部分在整体中所占的百分比。',
      example: '一周中每天的最高气温用折线统计图；一次投票中各个选项的得票数用条形统计图。',
    },
    {
      title: '扇形统计图的圆心角',
      body: '扇形统计图用整个圆表示总体，每个扇形的圆心角与 $360^\\circ$ 之比就是这部分占总体的百分比：$\\text{百分比}=\\frac{n}{360}\\times100\\%$，反过来 $\\text{圆心角}=360^\\circ\\times\\text{百分比}$。各部分百分比之和是 100%。',
      example: '占 45% 的部分，圆心角是 $360^\\circ\\times45\\%=162^\\circ$。',
    },
    {
      title: '两幅统计图结合着看',
      body: '条形统计图给出人数，扇形统计图给出百分比。找一个两幅图都有信息的项目，用 $\\text{总数}=\\text{这一项的人数}\\div\\text{这一项的百分比}$ 求出总数，就能补全其他项。',
      example: '某项有 21 人，占 35%，总人数是 $21\\div35\\%=60$。',
      pitfall: '先在两幅图里核对同一项目的数据是否一致，再往下算。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '7.2-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列调查中，适合采用全面调查的是',
      options: ['检测一批灯管的使用寿命', '了解全市六年级学生每天的睡眠时间', '了解本班每位同学的身高，以便订购校服', '了解一条河的水质'],
      answer: 2,
      explain: [
        'A：测寿命要把灯管用坏，只能抽查。',
        'B：全市六年级学生人数太多，用抽查。',
        'C：订校服要知道每一位同学的尺码，必须全面调查，而且本班人数少，做得到。',
        'D：不可能把整条河的水都检验，只能抽取水样。',
      ],
    },
    {
      id: '7.2-b02',
      level: 'basic',
      type: 'choice',
      stem: '某校有六～九年级四个年级。为了解全校学生平均每天的课外阅读时间，下列抽查方法中最合理的是',
      options: ['调查六年级（1）班的全体学生', '在学校图书馆门口随机调查 100 名同学', '从每个年级的每个班随机抽取 5 名同学', '调查学校读书社的全体成员'],
      answer: 2,
      explain: [
        'A 只调查了一个班，没有广泛性。',
        'B 看起来“随机”，但去图书馆的同学本身就更爱读书，样本没有代表性，会把阅读时间估计得偏长。',
        'D 读书社成员同样偏爱阅读。',
        'C 覆盖了所有年级和班级，每个同学被抽到的机会差不多，最合理。',
      ],
    },
    {
      id: '7.2-b03',
      level: 'basic',
      type: 'fill',
      stem: '在一幅扇形统计图中：',
      blanks: [
        { kind: 'num', label: '(1) 占总体 35% 的部分，扇形的圆心角是', answer: '126', suffix: '°' },
        { kind: 'num', label: '(2) 圆心角是 $54^\\circ$ 的扇形，表示的部分占总体的', answer: '15', suffix: '%' },
      ],
      explain: [
        '(1) 圆心角 $=360^\\circ\\times35\\%=126^\\circ$。',
        '(2) 百分比 $=\\frac{54}{360}\\times100\\%=15\\%$。',
        '常见错误：把 35% 直接当成 $35^\\circ$；或者用 $54\\div100$。',
      ],
      verify: () => [F(360).mul(F(35).div(100)), F(54).div(360).mul(100)],
    },
    {
      id: '7.2-b04',
      level: 'basic',
      type: 'fill',
      stem: '选择最合适的统计图：',
      blanks: [
        { kind: 'text', label: '(1) 反映某市 2020～2025 年绿地面积的变化趋势，用', options: ['条形统计图', '折线统计图', '扇形统计图'], answer: '折线统计图' },
        { kind: 'text', label: '(2) 表示一个家庭一个月的各项开支分别占总开支的百分比，用', options: ['条形统计图', '折线统计图', '扇形统计图'], answer: '扇形统计图' },
        { kind: 'text', label: '(3) 比较六年级各班参加运动会的具体人数，用', options: ['条形统计图', '折线统计图', '扇形统计图'], answer: '条形统计图' },
      ],
      explain: [
        '(1) 要看随时间的变化和趋势，用折线统计图。',
        '(2) 要看各部分占整体的百分比，用扇形统计图。',
        '(3) 要看各项的具体数目并比较多少，用条形统计图。各班之间没有先后变化的关系，不适合用折线统计图。',
      ],
    },
    {
      id: '7.2-b05',
      level: 'basic',
      type: 'fill',
      stem: '调查某班 40 名同学最喜欢的运动项目（每人只选一项），结果如条形统计图所示，“羽毛球”的条形被遮住了。',
      figure: FIG72.b05,
      blanks: [
        { kind: 'num', label: '(1) 最喜欢羽毛球的有', answer: '10', suffix: '人' },
        { kind: 'num', label: '(2) 在扇形统计图中，“羽毛球”对应扇形的圆心角是', answer: '90', suffix: '°' },
      ],
      explain: [
        '(1) 羽毛球 $=40-12-8-6-4=10$（人）。',
        '(2) 羽毛球占 $\\frac{10}{40}=25\\%$，圆心角 $360^\\circ\\times25\\%=90^\\circ$。',
        '常见错误：漏减“其他”这一项。',
      ],
      verify: () => { const x = 40 - 12 - 8 - 6 - 4; return [x, F(360).mul(x).div(40)]; },
    },
    {
      id: '7.2-b06',
      level: 'basic',
      type: 'fill',
      stem: '某次调查结果如扇形统计图所示，其中 C 部分的百分比被遮住了。已知 C 部分有 36 人。',
      figure: FIG72.b06,
      blanks: [
        { kind: 'num', label: '(1) C 部分占', answer: '30', suffix: '%' },
        { kind: 'num', label: '(2) 参加调查的一共有', answer: '120', suffix: '人' },
      ],
      explain: [
        '(1) 各部分百分比之和是 100%：C 占 $100\\%-30\\%-25\\%-15\\%=30\\%$。',
        '(2) 总人数 $=36\\div30\\%=120$（人）。',
        '常见错误：用 $36\\times30\\%$；或者忘了求 C 的百分比，直接用别的部分的百分比。',
      ],
      verify: () => { const c = F(100).sub(30).sub(25).sub(15); return [c, F(36).div(c.div(100))]; },
    },
    {
      id: '7.2-b07',
      level: 'basic',
      type: 'choice',
      stem: '甲校和乙校各自调查了本校全体学生最喜欢的球类运动，画出扇形统计图。甲校图中“足球”占 30%，乙校图中“足球”占 20%。那么最喜欢足球的学生人数',
      options: ['甲校一定比乙校多', '甲校一定比乙校少', '两校一样多', '无法确定哪校多'],
      answer: 3,
      explain: [
        '扇形统计图只表示各部分占本校总人数的百分比，不告诉我们总人数。',
        '如果甲校 500 人，足球 150 人；乙校 1000 人，足球 200 人，乙校反而多。如果两校人数相同，甲校就多。',
        '所以无法确定。常见错误：看到 30% 大于 20% 就认为甲校人多。',
      ],
      verify: () => {
        const cases = [[500, 1000], [1000, 1000]].map(([a, b]) => Math.sign(a * 0.3 - b * 0.2));
        return cases[0] === cases[1] ? (cases[0] > 0 ? 0 : cases[0] < 0 ? 1 : 2) : 3;
      },
    },
    {
      id: '7.2-b08',
      level: 'basic',
      type: 'fill',
      stem: '某商店 1～6 月的销售额如折线统计图所示（单位：万元）。',
      figure: FIG72.b08,
      blanks: [
        { kind: 'text', label: '(1) 相邻两个月中，销售额增加得最多的是', options: ['1月到2月', '2月到3月', '3月到4月', '4月到5月', '5月到6月'], answer: '3月到4月' },
        { kind: 'num', label: '(2) 5 月的销售额比 1 月增长了', answer: '80', suffix: '%' },
      ],
      explain: [
        '(1) 相邻两月的变化：$+5$、$-3$、$+8$、$+6$、$-3$（万元），增加最多的是 3 月到 4 月，增加 8 万元。',
        '看折线时，线段越陡、向上的，增加得越多。4 月到 5 月虽然数值更大，但只增加了 6 万元。',
        '(2) $\\frac{36-20}{20}\\times100\\%=80\\%$。常见错误：用 5 月的 36 作基数。',
      ],
      verify: () => {
        const v = [20, 25, 22, 30, 36, 33], names = ['1月到2月', '2月到3月', '3月到4月', '4月到5月', '5月到6月'];
        const d = v.slice(1).map((x, i) => x - v[i]);
        return [names[d.indexOf(Math.max(...d))], F(36 - 20).div(20).mul(100)];
      },
    },
    {
      id: '7.2-b09',
      level: 'basic',
      type: 'fill',
      stem: '调查 20 名同学最喜欢的学科（A 语文、B 数学、C 英语、D 其他），收集到的数据如下：A B C A B B A C D A A B C B A D C B A A。',
      blanks: [
        { kind: 'num', label: '(1) 最喜欢语文（A）的占', answer: '40', suffix: '%' },
        { kind: 'num', label: '(2) 画扇形统计图时，“英语”（C）对应扇形的圆心角是', answer: '72', suffix: '°' },
      ],
      explain: [
        '先划记整理：A 8 个，B 6 个，C 4 个，D 2 个，合计 20，核对无误。',
        '(1) A 占 $\\frac{8}{20}=40\\%$。',
        '(2) C 占 $\\frac{4}{20}=20\\%$，圆心角 $360^\\circ\\times20\\%=72^\\circ$。',
        '整理数据时一定用“合计”核对总数，数漏一个，后面的百分比和圆心角就全错了。',
      ],
      verify: () => {
        const data = 'A B C A B B A C D A A B C B A D C B A A'.split(' ');
        const n = k => data.filter(x => x === k).length;
        return [F(n('A')).div(data.length).mul(100), F(n('C')).div(data.length).mul(360)];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '7.2-e01',
      level: 'extended',
      type: 'fill',
      stem: '调查若干名同学最喜欢的课外活动（每人只选一项），得到两幅不完整的统计图。已知最喜欢音乐的比最喜欢阅读的多 6 人。',
      figure: FIG72.e01bar + FIG72.e01pie,
      blanks: [
        { kind: 'num', label: '(1) 参加调查的一共有', answer: '120', suffix: '人' },
        { kind: 'num', label: '(2) 最喜欢阅读的有', answer: '18', suffix: '人' },
        { kind: 'num', label: '(3) 扇形统计图中“音乐”对应的圆心角是', answer: '72', suffix: '°' },
      ],
      explain: [
        '(1) “运动”在两幅图中都有信息：48 人，占 40%。总人数 $=48\\div40\\%=120$（人）。',
        '美术 18 人，检验 $18\\div120=15\\%$，与扇形统计图一致。',
        '(2) 阅读和音乐一共 $120-48-18-12=42$（人），音乐比阅读多 6 人，所以阅读 $(42-6)\\div2=18$（人），音乐 24 人。',
        '(3) 音乐占 $\\frac{24}{120}=20\\%$，圆心角 $360^\\circ\\times20\\%=72^\\circ$。',
      ],
      verify: () => {
        const total = F(48).div(F(40).div(100));
        const rest = total.sub(48).sub(18).sub(12);
        const read = rest.sub(6).div(2), music = read.add(6);
        return [total, read, music.div(total).mul(360)];
      },
    },
    {
      id: '7.2-e02',
      level: 'extended',
      type: 'fill',
      stem: '一幅扇形统计图由 A、B、C、D 四个扇形组成，它们的圆心角之比是 $1:2:3:4$。已知 D 部分比 A 部分多 90 人。',
      blanks: [
        { kind: 'num', label: '(1) C 部分对应扇形的圆心角是', answer: '108', suffix: '°' },
        { kind: 'num', label: '(2) 总人数是', answer: '300', suffix: '人' },
      ],
      explain: [
        '(1) 一共 $1+2+3+4=10$ 份，每份 $36^\\circ$，C 是 $3\\times36^\\circ=108^\\circ$。',
        '(2) 圆心角之比就是人数之比，A、B、C、D 分别占总人数的 10%、20%、30%、40%。',
        'D 比 A 多 $40\\%-10\\%=30\\%$，这 30% 是 90 人，总人数 $=90\\div30\\%=300$（人）。',
      ],
      verify: () => [F(360).mul(3).div(10), F(90).div(F(4 - 1).div(10))],
    },
    {
      id: '7.2-e03',
      level: 'extended',
      type: 'multi',
      stem: '某工厂三个车间某月的产量如条形统计图所示（单位：件），注意纵轴是从 100 开始画的。下列说法正确的是（多选）',
      figure: FIG72.e03,
      options: ['B 车间的产量是 A 车间的 3 倍', 'B 车间的产量比 A 车间多 10 件', 'C 车间的产量比 A 车间多约 4.8%', '三个车间的产量相差很大'],
      answer: [1, 2],
      explain: [
        '纵轴从 100 开始，条形的高度只反映“超出 100 的部分”，不能直接按高度比较倍数。',
        'A 错：从图上看 B 的条形高度是 A 的 3 倍（高出 100 的部分是 15 对 5），但实际产量是 115 和 105，B 只比 A 多一点。',
        'B 对：$115-105=10$（件）。',
        'C 对：$\\frac{110-105}{105}\\approx4.8\\%$。',
        'D 错：三个数 105、110、115 相差不大，是截断的纵轴把差别“放大”了。',
        '所以选 B、C。看统计图要先看纵轴从几开始。',
      ],
      verify: () => {
        const A = 105, B = 115, C = 110, res = [];
        if (B === 3 * A) res.push(0);
        if (B - A === 10) res.push(1);
        if (Math.abs((C - A) / A * 100 - 4.8) < 0.05) res.push(2);
        return res;
      },
    },
    {
      id: '7.2-e04',
      level: 'extended',
      type: 'fill',
      stem: '某工厂 2024 年总支出 200 万元，其中工资占 40%；2025 年总支出 250 万元，其中工资占 36%（两年都用扇形统计图表示）。',
      blanks: [
        { kind: 'num', label: '(1) 2025 年工资支出比 2024 年增长了', answer: '12.5', suffix: '%' },
        { kind: 'num', label: '(2) 工资占总支出的百分比下降了', answer: '4', suffix: '个百分点' },
      ],
      explain: [
        '2024 年工资 $200\\times40\\%=80$（万元），2025 年工资 $250\\times36\\%=90$（万元）。',
        '(1) 增长率 $=\\frac{90-80}{80}\\times100\\%=12.5\\%$。',
        '(2) $40\\%-36\\%=4\\%$，下降 4 个百分点。',
        '工资的占比下降了，金额反而增加了，因为总支出变多了。扇形统计图只看占比，比较不同年份的金额还要结合总数。',
      ],
      verify: () => {
        const a = F(200).mul('0.4'), b = F(250).mul('0.36');
        return [b.sub(a).div(a).mul(100), F(40).sub(36)];
      },
    },
    {
      id: '7.2-e05',
      level: 'extended',
      type: 'fill',
      stem: '全班 40 名同学每人恰好选两项最想观看的比赛，统计各项被选的人数：A 足球 28 人，B 篮球 22 人，C 排球若干人，D 乒乓球 12 人。',
      blanks: [
        { kind: 'num', label: '(1) 选排球的有', answer: '18', suffix: '人' },
        { kind: 'num', label: '(2) 选排球的人占全班人数的', answer: '45', suffix: '%' },
        { kind: 'text', label: '(3) 能否用一幅扇形统计图表示“选各项的人数分别占全班人数的百分比”？', options: ['能', '不能'], answer: '不能' },
      ],
      explain: [
        '(1) 每人选两项，一共选了 $40\\times2=80$ 人次。排球 $=80-28-22-12=18$（人）。常见错误：用 40 去减，得到负数。',
        '(2) 选排球的 18 人占全班 $\\frac{18}{40}=45\\%$。常见错误：用 80 作分母，得到 22.5%。',
        '(3) 四项分别占全班的 70%、55%、45%、30%，加起来是 200%，不是 100%。扇形统计图要求各部分合起来正好是一个整体，所以不能。',
      ],
      verify: () => {
        const c = 40 * 2 - 28 - 22 - 12;
        const sum = [28, 22, c, 12].reduce((a, b) => a + b, 0) / 40 * 100;
        return [c, F(c).div(40).mul(100), sum === 100 ? '能' : '不能'];
      },
    },
    {
      id: '7.2-e06',
      level: 'extended',
      type: 'fill',
      stem: '某校调查学生最喜欢的四类活动 A、B、C、D（每人只选一类）。扇形统计图中，A 的圆心角是 $108^\\circ$，B 的圆心角比 C 的大 $36^\\circ$；C 与 D 的人数之比是 $3:2$；D 比 A 少 24 人。',
      blanks: [
        { kind: 'num', label: '(1) 参加调查的一共有', answer: '160', suffix: '人' },
        { kind: 'num', label: '(2) 最喜欢 B 的有', answer: '52', suffix: '人' },
        { kind: 'num', label: '(3) C 对应扇形的圆心角是', answer: '81', suffix: '°' },
      ],
      explain: [
        'A 占 $\\frac{108}{360}=30\\%$，B、C、D 一共占 70%。B 比 C 多 $\\frac{36}{360}=10\\%$。',
        '按 $3:2$ 设 C 占 $3t\\%$、D 占 $2t\\%$，B 占 $(3t+10)\\%$：$(3t+10)+3t+2t=70$，$8t=60$，$t=7.5$。所以 C 占 22.5%，D 占 15%，B 占 32.5%。',
        '(1) D 比 A 少 $30\\%-15\\%=15\\%$，这 15% 是 24 人，总人数 $=24\\div15\\%=160$（人）。',
        '(2) B $=160\\times32.5\\%=52$（人）。',
        '(3) C 的圆心角 $=360^\\circ\\times22.5\\%=81^\\circ$（也可以由 B 的 $117^\\circ$ 减 $36^\\circ$ 得到）。',
        '检验：A 48 人、B 52 人、C 36 人、D 24 人，合计 160；C:D $=36:24=3:2$。',
      ],
      verify: () => {
        const a = F(108).div(360), diff = F(36).div(360);
        const t = F(1).sub(a).sub(diff).div(8);          // C=3t, D=2t, B=3t+diff
        const c = t.mul(3), d = t.mul(2), b = c.add(diff);
        const total = F(24).div(a.sub(d));
        return [total, total.mul(b), c.mul(360)];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '7.2-c01',
      level: 'challenge',
      type: 'fill',
      stem: '全班 40 名同学参加兴趣小组，每人参加 1 个、2 个或 3 个小组。把各小组的人数加起来，一共是 62 人次。',
      blanks: [
        { kind: 'num', label: '(1) 如果参加 3 个小组的比参加 2 个小组的少 4 人，那么参加 2 个小组的有', answer: '10', suffix: '人' },
        { kind: 'num', label: '(2) 如果不知道 (1) 中的条件，参加 3 个小组的最多可能有', answer: '11', suffix: '人' },
        { kind: 'num', label: '(3) 如果不知道 (1) 中的条件，只参加 1 个小组的最少可能有', answer: '18', suffix: '人' },
      ],
      explain: [
        '每人至少被算 1 次，40 人先算掉 40 人次，多出的 $62-40=22$ 人次来自参加多个小组的人：参加 2 个小组的每人多算 1 次，参加 3 个小组的每人多算 2 次。',
        '设参加 2 个小组的 $x$ 人、参加 3 个小组的 $y$ 人（都是不小于 0 的整数），则 $x+2y=22$，只参加 1 个小组的是 $40-x-y$ 人。',
        '(1) $y=x-4$：$x+2(x-4)=22$，$x=10$（$y=6$，只参加 1 个的 24 人）。',
        '(2) 由 $x+2y=22$，$x$ 不能是负数，$2y\\le22$，$y\\le11$。$y=11$ 时 $x=0$，只参加 1 个的 29 人，符合。所以最多 11 人。',
        '(3) 只参加 1 个的 $=40-(x+y)$，要它最少，就要 $x+y$ 最大。$x+y=22-y$，$y$ 越小越大，$y=0$ 时 $x+y=22$，只参加 1 个的最少 18 人。',
        '想一想：多出的 22 人次，“分摊”给参加 2 个小组的人最“费人”（每人只贡献 1 次），这时参加多个小组的人最多，只参加 1 个的就最少。',
      ],
      verify: () => {
        let a = null, maxY = -1, minOne = 99;
        for (let x = 0; x <= 40; x++) for (let y = 0; x + y <= 40; y++) {
          if (x + 2 * y !== 22) continue;
          if (y === x - 4) a = x;
          maxY = Math.max(maxY, y);
          minOne = Math.min(minOne, 40 - x - y);
        }
        return [a, maxY, minOne];
      },
    },
    {
      id: '7.2-c02',
      level: 'challenge',
      type: 'fill',
      stem: '某班人数在 40～50 之间（含 40 和 50）。调查每人最喜欢的球类（每人只选一项）后画扇形统计图，发现每一个扇形的圆心角都恰好是整数度，其中人数最少的一项只有 1 人，“篮球”对应扇形的圆心角是 $64^\\circ$。',
      blanks: [
        { kind: 'num', label: '(1) 全班有', answer: '45', suffix: '人' },
        { kind: 'num', label: '(2) 最喜欢篮球的有', answer: '8', suffix: '人' },
      ],
      explain: [
        '设全班 $n$ 人。有一项只有 1 人，它的圆心角是 $\\frac{360}{n}$ 度，是整数，所以 $n$ 是 360 的因数。',
        '360 的因数中在 40～50 之间的只有 40 和 45。',
        '再看篮球：设最喜欢篮球的有 $k$ 人，圆心角 $\\frac{360k}{n}=64$，$k=\\frac{64n}{360}=\\frac{8n}{45}$。',
        '$n=40$ 时 $k=\\frac{320}{45}$，不是整数，不可能；$n=45$ 时 $k=8$。',
        '所以全班 45 人，最喜欢篮球的 8 人。反过来，只要 $n=45$，任何一项的圆心角都是 $8^\\circ$ 的整数倍，确实都是整数度。',
      ],
      verify: () => {
        const res = [];
        for (let n = 40; n <= 50; n++) {
          if (360 % n) continue;
          const k = F(64).mul(n).div(360);
          if (k.d === 1n) res.push([n, k]);
        }
        return res.length === 1 ? res[0] : null;
      },
    },
    {
      id: '7.2-c03',
      level: 'challenge',
      type: 'fill',
      stem: '某网店 3～6 月的销售额如折线统计图所示，4 月和 6 月的数据被遮住了。已知：4 月比 3 月的增长率，与 5 月比 4 月的增长率相同；6 月比 5 月下降的百分数，等于 4 月比 3 月增长的百分数。',
      figure: FIG72.c03,
      blanks: [
        { kind: 'num', label: '(1) 4 月的销售额是', answer: '60', suffix: '万元' },
        { kind: 'num', label: '(2) 6 月的销售额是', answer: '57.6', suffix: '万元' },
        { kind: 'num', label: '(3) 6 月比 3 月增长了', answer: '15.2', suffix: '%' },
      ],
      explain: [
        '(1) 增长率相同，意思是 4 月是 3 月的几倍，5 月就是 4 月的几倍：$\\frac{4\\text{ 月}}{50}=\\frac{72}{4\\text{ 月}}$，也就是 $50:(4\\text{ 月})=(4\\text{ 月}):72$，4 月的销售额是 50 和 72 的比例中项。',
        '由比例的基本性质，4 月 × 4 月 $=50\\times72=3600$。销售额是正数，哪个正数乘自己得 3600？$60\\times60=3600$，所以 4 月是 60 万元。检验：$50\\to60$ 和 $60\\to72$ 都增长了 20%。',
        '(2) 4 月比 3 月增长 20%，所以 6 月比 5 月下降 20%：$72\\times(1-20\\%)=57.6$（万元）。',
        '(3) $\\frac{57.6-50}{50}\\times100\\%=15.2\\%$。连续两次涨 20% 再跌 20%，不是只涨了 20%，每次的基数都不同。',
      ],
      verify: () => {
        let x = null;
        for (let k = 1; k <= 1000; k++) if (F(k).mul(k).eq(50 * 72)) x = F(k);
        const rate = x.sub(50).div(50);
        const june = F(72).mul(F(1).sub(rate));
        return [x, june, june.sub(50).div(50).mul(100)];
      },
    },
    {
      id: '7.2-c04',
      level: 'challenge',
      type: 'fill',
      stem: '小海统计问卷时，把一张选 B 的问卷多统计了一次（这张问卷被算了两遍），画出的扇形统计图中 B 的圆心角是 $80^\\circ$。改正以后，B 的圆心角变成了 $72^\\circ$。',
      blanks: [
        { kind: 'num', label: '(1) 实际收回的问卷有', answer: '35', suffix: '份' },
        { kind: 'num', label: '(2) 实际选 B 的有', answer: '7', suffix: '人' },
        { kind: 'text', label: '(3) 改正以后，其他各项的圆心角', options: ['都变大了', '都变小了', '都不变', '有的变大有的变小'], answer: '都变大了' },
      ],
      explain: [
        '设实际有 $n$ 份问卷，实际选 B 的有 $k$ 人。改正后 B 占 $\\frac{72}{360}=\\frac15$，所以 $k=\\frac n5$。',
        '多算一次时，总数变成 $n+1$，B 变成 $k+1$，占 $\\frac{80}{360}=\\frac29$，即 $9(k+1)=2(n+1)$。',
        '把 $k=\\frac n5$ 代入：$\\frac{9n}{5}+9=2n+2$，$\\frac{n}{5}=7$，$n=35$，$k=7$。检验：$\\frac{8}{36}=\\frac29$，对应 $80^\\circ$。',
        '(3) 其他某项有 $c$ 人，改正前圆心角 $\\frac{360c}{36}$，改正后 $\\frac{360c}{35}$，分母变小，圆心角都变大（多算的那张问卷“占”了别的项目的一部分比例）。',
      ],
      verify: () => {
        let ans = null;
        for (let n = 1; n <= 500; n++) for (let k = 0; k <= n; k++) {
          if (F(360 * k).div(n).eq(72) && F(360 * (k + 1)).div(n + 1).eq(80)) ans = [n, k];
        }
        const c = 5;   // 任取其他某项的人数核对
        const bigger = F(360 * c).div(ans[0]).cmp(F(360 * c).div(ans[0] + 1)) > 0;
        return [ans[0], ans[1], bigger ? '都变大了' : '都变小了'];
      },
    },
    {
      id: '7.2-c05',
      level: 'challenge',
      type: 'fill',
      stem: '某班学生参加 A、B、C、D 四个社团（每人只参加一个），各社团男、女生人数如条形统计图所示，其中 B 社团男生、C 社团女生的人数被遮住了。已知全班男、女生人数相等；在表示各社团总人数的扇形统计图中，B 社团扇形的圆心角是 C 社团的 1.5 倍。',
      figure: FIG72.c05,
      blanks: [
        { kind: 'num', label: '(1) B 社团的男生有', answer: '14', suffix: '人' },
        { kind: 'num', label: '(2) C 社团的女生有', answer: '10', suffix: '人' },
        { kind: 'num', label: '(3) 扇形统计图中 B 社团的圆心角是', answer: '144', suffix: '°' },
      ],
      explain: [
        '设 B 社团男生 $x$ 人，C 社团女生 $y$ 人。',
        '男生共 $8+x+6+2=16+x$，女生共 $6+10+y+4=20+y$，男女相等：$16+x=20+y$，即 $x=y+4$。',
        '圆心角之比就是人数之比：B 社团 $x+10$ 人，C 社团 $6+y$ 人，$x+10=1.5(6+y)$。',
        '把 $x=y+4$ 代入：$y+14=9+1.5y$，$0.5y=5$，$y=10$，$x=14$。',
        '(3) 各社团人数：A 14，B 24，C 16，D 6，共 60 人。B 的圆心角 $=360^\\circ\\times\\frac{24}{60}=144^\\circ$，检验 C 是 $96^\\circ$，$144=1.5\\times96$。',
      ],
      verify: () => {
        for (let y = 0; y <= 100; y++) {
          const x = y + 4;
          if (F(x + 10).eq(F(6 + y).mul('1.5'))) {
            const total = 8 + 6 + x + 10 + 6 + y + 2 + 4;
            return [x, y, F(360).mul(x + 10).div(total)];
          }
        }
        return null;
      },
    },
  ],
});
