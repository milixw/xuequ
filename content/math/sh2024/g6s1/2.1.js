'use strict';

// 上海数学六年级上册 · 2.1 用字母表示数
// 知识范围：用字母表示数、含字母式子的书写规范、用字母表示数量关系和规律（运算律用字母表示）；可以使用第 1 章全部内容
// 还没学：代数式与代数式的值（2.2）、一次式与合并同类项（2.3）、方程（第 3 章）

// 配图统一放在这里，题目里用 FIG21.xxx 引用（图形数据由脚本按题意生成，保证与题干一致）
const FIG21 = {
  squares: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 74\" width=\"300\" height=\"74\" font-family=\"Times New Roman, serif\"><line x1=\"14\" y1=\"16\" x2=\"44\" y2=\"16\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"14\" y1=\"46\" x2=\"44\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"14\" y1=\"16\" x2=\"14\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"44\" y1=\"16\" x2=\"44\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"64\" y1=\"16\" x2=\"124\" y2=\"16\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"64\" y1=\"46\" x2=\"124\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"64\" y1=\"16\" x2=\"64\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"94\" y1=\"16\" x2=\"94\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"124\" y1=\"16\" x2=\"124\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"144\" y1=\"16\" x2=\"234\" y2=\"16\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"144\" y1=\"46\" x2=\"234\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"144\" y1=\"16\" x2=\"144\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"174\" y1=\"16\" x2=\"174\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"204\" y1=\"16\" x2=\"204\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><line x1=\"234\" y1=\"16\" x2=\"234\" y2=\"46\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><text x=\"29\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">1 个</text><text x=\"94\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">2 个</text><text x=\"189\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">3 个</text><text x=\"256\" y=\"38\" font-size=\"18\">……</text></svg>",
  cut: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 124\" width=\"320\" height=\"124\" font-family=\"Times New Roman, serif\"><path d=\"M20 24 L114 24 L114 50 L140 50 L140 88 L20 88 Z\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><path d=\"M114 24 L140 24 L140 50\" fill=\"none\" stroke=\"#999\" stroke-width=\"1\" stroke-dasharray=\"4 3\"/><text x=\"80\" y=\"104\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">a</text><text x=\"10\" y=\"60\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">b</text><text x=\"127\" y=\"20\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">c</text><text x=\"80\" y=\"118\" text-anchor=\"middle\" font-size=\"13\">图 1</text><path d=\"M180 24 L227 24 L227 50 L253 50 L253 24 L300 24 L300 88 L180 88 Z\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"2\"/><text x=\"240\" y=\"20\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">c</text><text x=\"240\" y=\"104\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">a</text><text x=\"310\" y=\"60\" text-anchor=\"middle\" font-size=\"14\" font-style=\"italic\">b</text><text x=\"240\" y=\"118\" text-anchor=\"middle\" font-size=\"13\">图 2</text></svg>",
  snake: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 296 112\" width=\"296\" height=\"112\" font-family=\"Times New Roman, serif\"><rect x=\"16\" y=\"12\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"38\" y=\"29\" text-anchor=\"middle\" font-size=\"14\">1</text><rect x=\"60\" y=\"12\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"82\" y=\"29\" text-anchor=\"middle\" font-size=\"14\">2</text><rect x=\"104\" y=\"12\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"126\" y=\"29\" text-anchor=\"middle\" font-size=\"14\">3</text><rect x=\"148\" y=\"12\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"170\" y=\"29\" text-anchor=\"middle\" font-size=\"14\">4</text><rect x=\"192\" y=\"12\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"214\" y=\"29\" text-anchor=\"middle\" font-size=\"14\">5</text><rect x=\"236\" y=\"12\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"258\" y=\"29\" text-anchor=\"middle\" font-size=\"14\">6</text><rect x=\"16\" y=\"36\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"38\" y=\"53\" text-anchor=\"middle\" font-size=\"14\">12</text><rect x=\"60\" y=\"36\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"82\" y=\"53\" text-anchor=\"middle\" font-size=\"14\">11</text><rect x=\"104\" y=\"36\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"126\" y=\"53\" text-anchor=\"middle\" font-size=\"14\">10</text><rect x=\"148\" y=\"36\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"170\" y=\"53\" text-anchor=\"middle\" font-size=\"14\">9</text><rect x=\"192\" y=\"36\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"214\" y=\"53\" text-anchor=\"middle\" font-size=\"14\">8</text><rect x=\"236\" y=\"36\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"258\" y=\"53\" text-anchor=\"middle\" font-size=\"14\">7</text><rect x=\"16\" y=\"60\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"38\" y=\"77\" text-anchor=\"middle\" font-size=\"14\">13</text><rect x=\"60\" y=\"60\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"82\" y=\"77\" text-anchor=\"middle\" font-size=\"14\">14</text><rect x=\"104\" y=\"60\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"126\" y=\"77\" text-anchor=\"middle\" font-size=\"14\">15</text><rect x=\"148\" y=\"60\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"170\" y=\"77\" text-anchor=\"middle\" font-size=\"14\">16</text><rect x=\"192\" y=\"60\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"214\" y=\"77\" text-anchor=\"middle\" font-size=\"14\">17</text><rect x=\"236\" y=\"60\" width=\"44\" height=\"24\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"1\"/><text x=\"258\" y=\"77\" text-anchor=\"middle\" font-size=\"14\">18</text><text x=\"148\" y=\"102\" text-anchor=\"middle\" font-size=\"16\">……</text></svg>",
};

Content.section({
  id: 'math/sh2024/g6s1/2.1',
  title: '用字母表示数',
  review: { status: 'pending' },
  audit: { blind: '2026-09-20', rounds: 3, note: '子代理盲解复核三轮：答案全部一致；第 2 轮按意见换掉 c01（与 e01 同模板）、重做 c02、升级 e05/e07/e08/e09，第 3 轮重做 c05（分奇偶一般式 + 配对求和）后判定整节通过' },

  intro: [
    {
      title: '为什么要用字母表示数',
      body: '一个具体的数只能说清一件事，而字母可以代表任何一个数。用字母写出来的式子，一句话就把无数个算式的共同规律说清楚了。第 1 章学过的运算律——加法交换律、结合律、乘法交换律、结合律、分配律——用字母写出来最简洁。',
      example: '加法交换律：$a+b=b+a$；“任何数与它的相反数之和是 0”：$a+(-a)=0$。这里的 $a$、$b$ 可以是任何有理数。',
    },
    {
      title: '书写的规矩',
      body: '含字母的式子有约定的写法：① 乘号可以省略，也可以写成 $\\cdot$，数字要写在字母前面；② 系数是 1 或 $-1$ 时，这个 1 不写；③ 带分数要先化成假分数；④ 除法一律写成分数线的形式；⑤ 式子后面要带单位时，如果式子是和或差，先用括号把整个式子括起来再写单位。',
      example: '$n\\times 7$ 写成 $7n$；$(x-y)\\div 4$ 写成 $\\frac{x-y}{4}$。',
      pitfall: '$3a$ 表示 $3\\times a$，$a^3$ 表示 $a\\times a\\times a$，两者完全不同。',
    },
    {
      title: '把话翻译成式子',
      body: '先读清楚“谁和谁在比”“先算哪一步”，再动笔。“和、差、积、商”决定用什么运算，“……的……”常常表示乘，“比……多（少）”决定加减的顺序。哪一步要先算，就给它加括号。',
      example: '“$x$ 的 2 倍与 3 的和的一半”写成 $\\frac{2x+3}{2}$；“$x$ 与 3 的和的 2 倍”写成 $2(x+3)$。语序不同，式子就不同。',
    },
    {
      title: '用字母表示规律',
      body: '看一列数或一串图形时，先找它是“每次多几”还是“每次乘几”，再想第 $n$ 个与 $n$ 之间的关系。写出式子以后，一定要用第 1 个、第 2 个代进去检验一下。',
      example: '$1,\\ 4,\\ 9,\\ 16,\\ \\dots$ 每个数都是某个数的平方，第 $n$ 个是 $n^2$。检验：$n=3$ 时是 9，对上了。',
    },
    {
      title: '字母可以表示任何数',
      body: '除非题目另有说明，字母可以是正数、负数或 0。判断一个含字母的式子是正是负、是大是小，必须把各种可能都想一遍，不能只想“字母是正数”这一种。',
      example: '$5-a$ 不一定比 5 小：当 $a=-2$ 时，$5-a=7$，反而比 5 大。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '2.1-b01',
      level: 'basic',
      type: 'multi',
      stem: '下列各组式子中，两个式子的含义完全相同（即不论字母取什么数，两个式子的结果都相等）的是（　　）',
      options: [
        '$x+x+x$ 与 $3x$',
        '$2(x+y)$ 与 $2x+2y$',
        '$\\frac{a+b}{2}$ 与 $\\frac{1}{2}a+b$',
        '$-a^2$ 与 $(-a)^2$',
        '$\\frac{x}{3}$ 与 $\\frac{1}{3}x$',
      ],
      answer: [0, 1, 4],
      explain: [
        'A 相同：3 个 $x$ 相加就是 $x$ 的 3 倍，即 $3x$。',
        'B 相同：这正是分配律，把 2 分别乘 $x$ 和 $y$。',
        'C 不同：$\\frac{a+b}{2}$ 是“和的一半”，而 $\\frac{1}{2}a+b$ 是“$a$ 的一半再加 $b$”。取 $a=2$、$b=4$ 试：前者是 3，后者是 5。',
        'D 不同：按第 1 章的约定（$-3^2=-9$），$-a^2$ 是先平方再取相反数，而 $(-a)^2$ 是先取相反数再平方。取 $a=3$ 试：前者是 $-9$，后者是 9。',
        'D 里还埋了个陷阱：取 $a=0$ 时两个式子都等于 0，只用这一个数是判断不出来的。要说明两个式子“含义相同”，必须对所有的数都相等；要说明“不同”，找到一个反例就够了。',
        'E 相同：除以 3 就是乘 $\\frac{1}{3}$，所以 $\\frac{x}{3}=\\frac{1}{3}x$。所以选 A、B、E。',
      ],
      verify: () => {
        const xs = [];
        for (let i = -8; i <= 8; i++) xs.push(F(i).div(2));
        const same = [
          (x, y) => [x.add(x).add(x), x.mul(3)],
          (x, y) => [x.add(y).mul(2), x.mul(2).add(y.mul(2))],
          (x, y) => [x.add(y).div(2), x.div(2).add(y)],
          (x, y) => [x.pow(2).neg(), x.neg().pow(2)],
          (x, y) => [x.div(3), x.mul(F(1).div(3))],
        ];
        return same
          .map((f, i) => (xs.every(x => xs.every(y => { const [p, q] = f(x, y); return p.eq(q); })) ? i : -1))
          .filter(i => i >= 0);
      },
    },
    {
      id: '2.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '用含字母的式子表示下列各数。',
      blanks: [
        { kind: 'expr', label: '(1) 比 $a$ 的 3 倍的一半少 7 的数是', answer: '3a/2-7' },
        { kind: 'expr', label: '(2) $x$ 与 $y$ 的和的平方，减去 $x$ 的平方，结果是', answer: '(x+y)^2-x^2' },
        { kind: 'expr', label: '(3) $p$ 与 $q$ 的差除以 $p$、$q$ 两数的和（已知 $p+q\\ne 0$），商是', answer: '(p-q)/(p+q)' },
      ],
      explain: [
        '(1) 先写“$a$ 的 3 倍”，是 $3a$；再取它的一半，是 $\\frac{3a}{2}$；最后“少 7”就是减去 7，得 $\\frac{3a}{2}-7$。',
        '注意顺序：“比……少 7”是用前面那个数减 7，不是 $7-\\frac{3a}{2}$。',
        '(2) “$x$ 与 $y$ 的和的平方”要先算和，写成 $(x+y)^2$，再减去 $x^2$，得 $(x+y)^2-x^2$。',
        '$(x+y)^2$ 与 $x^2+y^2$ 不是一回事：取 $x=1$、$y=2$ 试一下，前者是 9，后者是 5。',
        '(3) 被除数是差 $p-q$，除数是和 $p+q$，除法写成分数线：$\\frac{p-q}{p+q}$。题目已经说明 $p+q\\ne 0$，所以这个商有意义。',
      ],
    },
    {
      id: '2.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '某商品的原价是 $a$ 元。商店先把价格提高 $10\\%$，过节时再按提价后的价格降价 $10\\%$。',
      blanks: [
        { kind: 'expr', label: '(1) 现在的价格是（元）', answer: '0.99a' },
        {
          kind: 'text',
          label: '(2) 现价与原价相比',
          options: ['比原价低 $0.01a$ 元', '比原价高 $0.01a$ 元', '与原价相等', '比原价低 $0.1a$ 元'],
          answer: '比原价低 $0.01a$ 元',
        },
      ],
      explain: [
        '(1) 提价 $10\\%$ 后是原价的 $1.1$ 倍，即 $1.1a$ 元。',
        '再降价 $10\\%$，是在 $1.1a$ 的基础上降，降价后是 $1.1a$ 的 $90\\%$，即 $1.1a\\times 0.9=0.99a$（元）。',
        '(2) $0.99a$ 比 $a$ 少 $0.01a$，所以现价比原价低 $0.01a$ 元。',
        '很多人以为“先涨 10% 再降 10% 就回到原价”，错在两次的“10%”是对不同的价格算的：涨价时按原价算，降价时按涨价后的价格算。',
      ],
      verify: () => {
        const c = F('1.1').mul('0.9');   // 现价是原价的几倍
        return [c.toString() + 'a', c.cmp(1) < 0 ? '比原价低 $0.01a$ 元' : '与原价相等'];
      },
    },
    {
      id: '2.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '设 $n$ 是整数。',
      blanks: [
        { kind: 'expr', label: '(1) 与 $2n$ 相邻的两个奇数中，较小的一个是', answer: '2n-1' },
        { kind: 'text', label: '(2) 无论 $n$ 取什么整数，$2n+1$ 一定是', options: ['奇数', '偶数', '正数', '负数'], answer: '奇数' },
        { kind: 'expr', label: '(3) 比 $2n$ 大的偶数中，第 3 个是', answer: '2n+6' },
      ],
      explain: [
        '(1) $2n$ 是偶数，与它相邻的两个奇数是 $2n-1$ 和 $2n+1$，较小的是 $2n-1$。',
        '(2) $2n$ 是偶数，偶数加 1 一定是奇数。注意 $n$ 可以是负数或 0，$2n+1$ 不一定是正数：$n=-3$ 时 $2n+1=-5$。',
        '(3) 偶数每隔 2 出现一个。比 $2n$ 大的偶数依次是 $2n+2$、$2n+4$、$2n+6$，第 3 个是 $2n+6$。',
        '注意“比 $2n$ 大的第 3 个偶数”不包括 $2n$ 本身，要从 $2n+2$ 开始数起。',
      ],
    },
    {
      id: '2.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '一艘轮船在静水中的速度是 $a$ 千米/时（$a>3$），水流的速度是 3 千米/时。',
      blanks: [
        { kind: 'expr', label: '(1) 顺水航行 2 小时，行驶的路程是（千米）', answer: '2(a+3)' },
        { kind: 'expr', label: '(2) 逆水航行 5 小时，行驶的路程是（千米）', answer: '5(a-3)' },
        { kind: 'num', label: '(3) 顺水航行 2 小时比逆水航行 2 小时多走（千米）', answer: '12' },
      ],
      explain: [
        '顺水速度 = 静水速度 + 水流速度 = $(a+3)$ 千米/时；逆水速度 = 静水速度 − 水流速度 = $(a-3)$ 千米/时。',
        '(1) 路程 = 速度 × 时间 = $2(a+3)$ 千米。',
        '(2) 路程 = $5(a-3)$ 千米。',
        '(3) 两段时间都是 2 小时，顺水比逆水每小时多走 $(a+3)-(a-3)=6$ 千米，2 小时就多走 $6\\times 2=12$ 千米。',
        '这里的 $a$ 被抵消了：不管船速多大，答案都是 12 千米。',
      ],
      verify: () => {
        const down = a => F(a).add(3);
        const up = a => F(a).sub(3);
        const lin = f => `${f(1).sub(f(0))}*a+${f(0)}`;   // 由两个取值还原一次式
        const diff = new Set();
        for (let a = 4; a <= 20; a++) diff.add(down(a).mul(2).sub(up(a).mul(2)).toString());
        return [lin(a => down(a).mul(2)), lin(a => up(a).mul(5)), diff.size === 1 ? [...diff][0] : null];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '2.1-e01',
      level: 'extended',
      type: 'fill',
      stem: '用同样长的小棒按下图的方式摆一排正方形：摆 1 个用 4 根，摆 2 个用 7 根，摆 3 个用 10 根，……',
      figure: FIG21.squares,
      blanks: [
        { kind: 'expr', label: '(1) 照这样摆 $n$ 个正方形，要用小棒（根）', answer: '3n+1' },
        { kind: 'num', label: '(2) 用 2026 根小棒按这种方式最多能摆正方形（个）', answer: '675' },
        { kind: 'expr', label: '(3) 按同样的方式摆一排三角形，第 1 个用 3 根，以后每多摆 1 个多用 2 根。摆 $n$ 个正方形比摆 $n$ 个三角形多用小棒（根）', answer: 'n' },
      ],
      explain: [
        '(1) 数小棒可以按“横”“竖”分开数：$n$ 个正方形排成一排，上下各 $n$ 根横的，共 $2n$ 根；竖的一共 $n+1$ 根。合起来是 $3n+1$ 根。',
        '也可以这样想：第 1 个用 4 根，以后每多一个正方形多用 3 根，$n$ 个就是 $4+3(n-1)$，同样等于 $3n+1$。检验：$n=3$ 时为 10，对上了。',
        '(2) 由 $3n+1=2026$ 反推：$3n=2025$，$n=675$。正好用完 2026 根，所以最多能摆 675 个。',
        '(3) 摆 $n$ 个三角形要 $3+2(n-1)=2n+1$ 根。',
        '两者相减：$(3n+1)-(2n+1)$，常数 1 抵消，剩下 3 个 $n$ 减 2 个 $n$，还剩 1 个 $n$。也就是说，正方形比三角形恰好多用 $n$ 根。',
      ],
      verify: () => {
        // 一排 k 个正方形：横边 2k 根、竖边 k+1 根；一排 k 个三角形：底边 k 根、斜边 k+1 根
        const sq = k => 2 * k + (k + 1);
        const tri = k => k + (k + 1);
        const lin = f => `${f(1) - f(0)}*n+${f(0)}`;
        let most = 0;
        while (sq(most + 1) <= 2026) most++;
        return [lin(sq), most, lin(k => sq(k) - tri(k))];
      },
    },
    {
      id: '2.1-e02',
      level: 'extended',
      type: 'fill',
      stem: '某月有 30 天，1 日是星期日。在这个月的日历上用一个方框框住 $2\\times 2$ 的四个数（同一行相邻的两个数相差 1，上下相邻的两个数相差 7），设方框里左上角的数是 $a$。',
      blanks: [
        { kind: 'expr', label: '(1) 方框里四个数的和是', answer: '4a+16' },
        { kind: 'num', label: '(2) 若四个数的和是 76，则 $a=$', answer: '15' },
        { kind: 'text', label: '(3) 方框里四个数的和', options: ['可能是 50', '不可能是 50'], answer: '不可能是 50' },
      ],
      explain: [
        '(1) 左上角是 $a$，右上角比它大 1，是 $a+1$；左下角在下一行，是 $a+7$；右下角是 $a+8$。',
        '四个数相加：四个 $a$ 合起来是 $4a$，常数部分是 $0+1+7+8=16$，所以和是 $4a+16$。',
        '(2) 由 $4a+16=76$ 反推：$4a=60$，$a=15$。',
        '还要检验方框放得下：1 日是星期日，所以 15 日也是星期日（在最左一列），它的右边有 16 日，下一行有 22、23 日，四个数都在这个月里，$a=15$ 成立。',
        '(3) 若和是 50，则 $4a=34$，$a=8.5$ 不是整数，而日历上的数都是整数，所以不可能。',
        '换句话说，这四个数的和减去 16 以后一定能被 4 整除，这是判断“可不可能”的关键。',
      ],
      verify: () => {
        const sum = a => F(a).add(a + 1).add(a + 7).add(a + 8);
        const ok = a => a >= 1 && a + 8 <= 30 && a % 7 !== 0;   // 方框要放得进这个月的日历
        const lin = f => `${f(1).sub(f(0))}*a+${f(0)}`;
        let hit = null;
        const can50 = [];
        for (let a = 1; a <= 30; a++) {
          if (!ok(a)) continue;
          if (sum(a).eq(76)) hit = a;
          if (sum(a).eq(50)) can50.push(a);
        }
        return [lin(sum), hit, can50.length ? '可能是 50' : '不可能是 50'];
      },
    },
    {
      id: '2.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '如图，图 1 是从一个长为 $a$、宽为 $b$ 的长方形的一个角上剪去一个边长为 $c$ 的小正方形（$c<b<a$）；图 2 是从同样的长方形的一条长边的中间剪去一个边长为 $c$ 的小正方形缺口。',
      figure: FIG21.cut,
      blanks: [
        { kind: 'expr', label: '(1) 图 1 中剩下图形的面积是', answer: 'ab-c^2' },
        { kind: 'expr', label: '(2) 图 1 中剩下图形的周长是', answer: '2a+2b' },
        { kind: 'expr', label: '(3) 图 2 中剩下图形的周长是', answer: '2a+2b+2c' },
      ],
      explain: [
        '(1) 面积就是长方形面积减去小正方形面积：$ab-c^2$。',
        '(2) 周长要一段一段数。剪去角上的正方形后，原来的长边少了一段 $c$，原来的短边也少了一段 $c$；同时缺口处新增了两段，长都是 $c$。',
        '一少一多正好抵消，所以周长仍然是 $2(a+b)$，即 $2a+2b$。',
        '(3) 缺口在边的中间时，原来的长边只少了一段 $c$，而缺口新增了三段：两条竖边和一条横边，长度都是 $c$。',
        '所以周长比原来多了 $3c-c=2c$，是 $2a+2b+2c$。可见“剪在角上”和“剪在中间”对周长的影响完全不同。',
      ],
    },
    {
      id: '2.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '同一款商品，甲店的优惠是“全部商品打八折”，乙店的优惠是“满 100 元减 20 元”（每笔订单最多减一次）。设一次购买商品的标价总额为 $a$ 元，且 $100\\le a<200$。',
      blanks: [
        { kind: 'expr', label: '(1) 在甲店实际付款（元）', answer: '0.8a' },
        { kind: 'expr', label: '(2) 在乙店实际付款（元）', answer: 'a-20' },
        { kind: 'text', label: '(3) 当 $a=150$ 时，付款较少的是', options: ['甲店', '乙店', '一样多'], answer: '甲店' },
        { kind: 'num', label: '(4) 当 $a=$（元）时，两店付款一样多', answer: '100' },
      ],
      explain: [
        '(1) 打八折就是按标价的 $80\\%$ 付款，付 $0.8a$ 元。',
        '(2) 因为 $100\\le a<200$，满 100 元减一次 20 元，付 $(a-20)$ 元。',
        '(3) $a=150$ 时，甲店付 $0.8\\times 150=120$ 元，乙店付 $150-20=130$ 元，甲店少付 10 元。',
        '(4) 换个角度看：在甲店省下的是标价的两成，即 $0.2a$ 元；在乙店省下的是固定的 20 元。',
        '两店付款一样多，就是省下的钱一样多，也就是“标价的两成正好是 20 元”。两成是 20 元，那么一成是 10 元，十成（也就是标价）就是 100 元。',
        '在 $100<a<200$ 的范围里，标价的两成超过 20 元，所以甲店总是更便宜。',
      ],
      verify: () => {
        const jia = a => F(a).mul('0.8');
        const yi = a => F(a).sub(20);
        const lin = f => `${f(1).sub(f(0))}*a+${f(0)}`;
        let same = null;
        for (let a = 100; a < 200; a++) if (jia(a).eq(yi(a))) same = a;
        const c = jia(150).cmp(yi(150));
        return [lin(jia), lin(yi), c < 0 ? '甲店' : c > 0 ? '乙店' : '一样多', same];
      },
    },
    {
      id: '2.1-e05',
      level: 'extended',
      type: 'multi',
      stem: '设 $n$ 是整数，下列各式中，无论 $n$ 取什么整数，结果都一定是偶数的是（　　）',
      options: ['$2n+1$', '$4n-2$', '$n^2+n$', '$3n$', '$n^2+1$'],
      answer: [1, 2],
      explain: [
        'A 错：$2n$ 是偶数，$2n+1$ 一定是奇数。',
        'B 对：$4n-2=2(2n-1)$，是 2 的倍数，一定是偶数（$n$ 取负数时也一样，比如 $n=-1$ 时是 $-6$）。',
        'C 对：$n^2+n$ 就是 $n\\times n+n$，也就是 $n$ 个 $n$ 再加 1 个 $n$，即 $n(n+1)$，是两个相邻整数的积。',
        '相邻的两个整数中必定有一个是偶数，所以它们的积一定是偶数。检验：$n=3$ 时是 12，$n=-4$ 时是 12，都是偶数。',
        'D 错：$3n$ 的奇偶由 $n$ 决定，$n=1$ 时 $3n=3$ 是奇数。',
        'E 错：$n=2$ 时 $n^2+1=5$ 是奇数。所以选 B、C。',
      ],
      verify: () => {
        const isEven = v => ((v % 2) + 2) % 2 === 0;
        const fs = [n => 2 * n + 1, n => 4 * n - 2, n => n * n + n, n => 3 * n, n => n * n + 1];
        const ns = [];
        for (let n = -30; n <= 30; n++) ns.push(n);
        return fs.map((f, i) => (ns.every(n => isEven(f(n))) ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '2.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '数轴上的点 $A$、$B$ 分别表示有理数 $a$、$b$，已知 $a<0<b$，且 $|a|>|b|$。',
      blanks: [
        { kind: 'expr', label: '(1) $A$、$B$ 两点间的距离是', answer: 'b-a' },
        { kind: 'expr', label: '(2) $A$、$B$ 的中点表示的数是', answer: '(a+b)/2' },
        { kind: 'expr', label: '(3) 化简 $|a+b|-|a-b|$ 的结果是', answer: '-2b' },
      ],
      explain: [
        '(1) $B$ 在 $A$ 的右边，两点间的距离是右边的数减左边的数，即 $b-a$。',
        '(2) 中点在 $A$ 的右边、离 $A$ 是全程的一半，即从 $a$ 出发向右走 $\\frac{b-a}{2}$，得到 $a+\\frac{b-a}{2}$。',
        '把 $a$ 看成 $\\frac{2a}{2}$，就是 $\\frac{2a+b-a}{2}=\\frac{a+b}{2}$，也就是两数的平均数。由 $|a|>|b|$ 可知它是负数，确实落在原点左边。',
        '(3) 先判断绝对值里面的符号。$a$ 是负数、$b$ 是正数，而 $|a|>|b|$，说明 $a$ 的“负的部分”更多，所以 $a+b<0$。',
        '又因为 $a<0<b$，所以 $a-b<0$。',
        '于是 $|a+b|=-(a+b)$，$|a-b|=-(a-b)=b-a$。',
        '原式 $=-(a+b)-(b-a)$。去掉括号后 $-a$ 与 $+a$ 抵消，剩下 $-b-b$，也就是 2 个 $-b$，即 $-2b$。因为 $b>0$，结果是负数。',
      ],
      verify: () => {
        const pairs = [];
        for (let i = -20; i <= -1; i++) for (let j = 1; j <= 20; j++) if (-i > j) pairs.push([F(i), F(j)]);
        const dist = pairs.every(([a, b]) => b.sub(a).eq(b.sub(a).abs()));
        const mid = pairs.every(([a, b]) => { const m = a.add(b).div(2); return m.sub(a).eq(b.sub(m)); });
        const simp = pairs.every(([a, b]) => a.add(b).abs().sub(a.sub(b).abs()).eq(b.mul(-2)));
        return [dist ? 'b-a' : '0', mid ? '(a+b)/2' : '0', simp ? '-2b' : '0'];
      },
    },
    {
      id: '2.1-e07',
      level: 'extended',
      type: 'fill',
      stem: '某小组有 5 名同学，其中 3 名同学的数学成绩分别是 $a$ 分、$b$ 分、$c$ 分，另外 2 名同学的成绩都是 $m$ 分。',
      blanks: [
        { kind: 'expr', label: '(1) 这 5 名同学的平均分是（分）', answer: '(a+b+c+2m)/5' },
        { kind: 'num', label: '(2) 若 $a+b+c=240$，且 5 人的平均分是 56 分，则 $m=$', answer: '20' },
        { kind: 'num', label: '(3) 若只有成绩为 $a$ 分的同学提高了 10 分，其余人不变，平均分比原来提高（分）', answer: '2' },
        { kind: 'expr', label: '(4) 若这 5 名同学的平均分是 $p$ 分，再加入一名成绩为 $q$ 分的同学，则 6 人的平均分是（分）', answer: '(5p+q)/6' },
      ],
      explain: [
        '(1) 总分是 $a+b+c+m+m$，其中两个 $m$ 合起来是 $2m$，所以总分为 $a+b+c+2m$ 分，平均分是 $\\frac{a+b+c+2m}{5}$ 分。',
        '(2) 平均分 56 分说明总分是 $56\\times 5=280$ 分。去掉 $a+b+c=240$ 分，剩下 $2m=40$，所以 $m=20$。',
        '(3) 只有一个人加 10 分，总分只增加 10 分，平均分增加 $10\\div 5=2$ 分。要分清“总分增加多少”和“平均分增加多少”。',
        '(4) 不必知道每个人的成绩：5 人平均分是 $p$，总分就是 $5p$ 分；加入一人后总分是 $(5p+q)$ 分，人数是 6，平均分是 $\\frac{5p+q}{6}$ 分。',
        '这种“不求每个数，只用总数”的想法，在平均数问题里特别好用。',
      ],
      verify: () => {
        const avg = v => v.reduce((s, x) => s.add(x), F(0)).div(v.length);
        const sets = [[7, 9, 11, 8, 8], [60, 75, 90, 82, 82], [0, 100, 50, 30, 30]].map(v => v.map(F));
        const up10 = new Set(sets.map(v => avg([v[0].add(10), ...v.slice(1)]).sub(avg(v)).toString()));
        // (2)：由总分反推 m
        let m2 = null;
        for (let m = 0; m <= 100; m++) if (F(240).add(2 * m).div(5).eq(56)) m2 = m;
        return ['(a+b+c+2m)/5', m2, up10.size === 1 ? [...up10][0] : null, '(5p+q)/6'];
      },
    },
    {
      id: '2.1-e08',
      level: 'extended',
      type: 'fill',
      stem: '一个杯子里有 $a$ 克糖和 $b$ 克水（$a>0$，$b>0$），搅拌均匀后成为糖水。',
      blanks: [
        { kind: 'expr', label: '(1) 糖的质量占糖水质量的', answer: 'a/(a+b)' },
        { kind: 'expr', label: '(2) 在 (1) 的糖水里再加入 $c$ 克糖（$c>0$）并搅匀后，糖的质量占糖水质量的', answer: '(a+c)/(a+b+c)' },
        { kind: 'text', label: '(3) 与加糖前相比，(2) 中的糖水', options: ['更甜', '更淡', '甜淡不变'], answer: '更甜' },
        {
          kind: 'text',
          label: '(4) 回到最初的 $a$ 克糖、$b$ 克水。如果同时加入 $c$ 克糖和 $c$ 克水（$c>0$）并搅匀，那么糖水',
          options: [
            '$a<b$ 时变甜，$a>b$ 时变淡，$a=b$ 时甜淡不变',
            '一定变甜',
            '一定变淡',
            '一定甜淡不变',
          ],
          answer: '$a<b$ 时变甜，$a>b$ 时变淡，$a=b$ 时甜淡不变',
        },
        { kind: 'expr', label: '(5) 仍回到最初的 $a$ 克糖、$b$ 克水，且 $b>a$。要使糖恰好占糖水的一半，还要再加糖（克）', answer: 'b-a' },
      ],
      explain: [
        '(1) 糖水的质量是糖加水，共 $(a+b)$ 克，糖占 $\\frac{a}{a+b}$。',
        '(2) 加糖后糖是 $(a+c)$ 克，糖水是 $(a+b+c)$ 克，糖占 $\\frac{a+c}{a+b+c}$。',
        '(3) 水一直是 $b$ 克没变，糖却变多了，糖与水的比变大，所以一定更甜。',
        '取一组数看看：$a=1$、$b=3$ 时糖占 $\\frac{1}{4}$；再加 1 克糖就占 $\\frac{2}{5}$，$\\frac{2}{5}>\\frac{1}{4}$，确实更甜。',
        '(4) 这一问加进去的是 $c$ 克糖和 $c$ 克水，可以把它们看成“一杯糖占一半的糖水”。',
        '两杯糖水混在一起，混合后的甜度一定在两者之间：比淡的那杯甜，比甜的那杯淡。',
        '所以要先判断原来的糖水比“糖占一半”甜还是淡。糖占一半就是糖和水一样多：$a<b$ 时糖不到一半，原来更淡，混合后变甜；$a>b$ 时原来更甜，混合后变淡；$a=b$ 时两杯一样，混合后不变。',
        '(5) “糖占一半”就是糖和水一样重。从最初的状态出发，水是 $b$ 克不变，所以糖也要变成 $b$ 克，现在只有 $a$ 克，还要再加 $(b-a)$ 克（由 $b>a$ 知它是正数）。',
        '这里不必去算分数，抓住“一半就是两者相等”这一点就够了。',
      ],
      verify: () => {
        let sweeter = true;
        let half = true;
        const mixed = [];
        for (let a = 1; a <= 12; a++) for (let b = 1; b <= 12; b++) {
          const before = F(a).div(a + b);
          for (let c = 1; c <= 12; c++) {
            if (F(a + c).div(a + b + c).cmp(before) <= 0) sweeter = false;
            const after = F(a + c).div(a + b + 2 * c);   // 同时加糖和水
            mixed.push(a < b ? after.cmp(before) > 0 : a > b ? after.cmp(before) < 0 : after.eq(before));
          }
          if (b > a && !F(b).div(F(b).add(b)).eq('1/2')) half = false;
        }
        return [
          'a/(a+b)',
          '(a+c)/(a+b+c)',
          sweeter ? '更甜' : '更淡',
          mixed.every(Boolean) ? '$a<b$ 时变甜，$a>b$ 时变淡，$a=b$ 时甜淡不变' : '一定变甜',
          half ? 'b-a' : '0',
        ];
      },
    },
    {
      id: '2.1-e09',
      level: 'extended',
      type: 'fill',
      stem: '一张厚 0.1 毫米的纸，对折 1 次后是 2 层，对折 2 次后是 4 层，对折 3 次后是 8 层，……（假设可以一直对折下去）',
      blanks: [
        { kind: 'num', label: '(1) 对折 5 次后是（层）', answer: '32' },
        { kind: 'text', label: '(2) 对折 $n$ 次后的层数是', options: ['$2^n$', '$2n$', '$n^2$', '$n+2$'], answer: '$2^n$' },
        { kind: 'num', label: '(3) 对折 10 次后，这叠纸的总厚度是（毫米）', answer: '102.4' },
        { kind: 'num', label: '(4) 至少对折（次），总厚度才能超过 1 米', answer: '14' },
        {
          kind: 'text',
          label: '(5) 有人说“只要能对折 30 次，厚度就会超过 100 千米”，这句话',
          options: ['对', '不对，还不到 1 千米', '不对，只有 10 千米左右'],
          answer: '对',
        },
      ],
      explain: [
        '(1) 每对折一次，层数变成原来的 2 倍：$2,\\ 4,\\ 8,\\ 16,\\ 32$，对折 5 次后是 32 层。',
        '(2) 对折 $n$ 次就是乘了 $n$ 个 2，层数是 $2^n$。注意 $2^n$ 和 $2n$ 完全不同：$n=5$ 时前者是 32，后者只有 10。',
        '(3) 对折 10 次是 $2^{10}=1024$ 层，总厚度 $1024\\times 0.1=102.4$ 毫米。',
        '(4) 1 米 = 1000 毫米，要 $2^n\\times 0.1>1000$，即层数要超过 10000。',
        '由 $2^{13}=8192$（厚 819.2 毫米，不够）和 $2^{14}=16384$（厚 1638.4 毫米，够了），所以至少要对折 14 次。',
        '(5) 100 千米就是 100000 米。由 (4) 知对折 14 次后厚约 1.6 米。',
        '每多对折 10 次，就是再连乘 10 个 2，也就是变成原来的 1024 倍。所以对折 24 次约 $1.6\\times 1024\\approx 1600$ 米；对折 30 次还要再乘 6 个 2，即再乘 64 倍，约 $1600\\times 64\\approx 102400$ 米。',
        '10 万米出头就是 100 千米多一点，所以这句话是对的。估算时要当心：如果把 1024 粗略当成 1000，算出来正好是 100 千米，就看不出“超过”了，必须记住 $1024>1000$。',
      ],
      verify: () => {
        const layers = [];
        let t = 1;
        for (let k = 1; k <= 40; k++) { t *= 2; layers.push(t); }
        const cands = [['$2^n$', n => 2 ** n], ['$2n$', n => 2 * n], ['$n^2$', n => n * n], ['$n+2$', n => n + 2]];
        const pick = cands.find(([, f]) => layers.slice(0, 10).every((v, i) => f(i + 1) === v))[0];
        let over = null;
        for (let k = 1; k <= 40 && over === null; k++) if (F(layers[k - 1]).mul('0.1').cmp(1000) > 0) over = k;
        const km30 = F(layers[29]).mul('0.1').div(1000000);   // 毫米换算成千米
        return [
          layers[4],
          pick,
          F(layers[9]).mul('0.1'),
          over,
          km30.cmp(100) > 0 ? '对' : km30.cmp(1) > 0 ? '不对，还不到 1 千米' : '不对，只有 10 千米左右',
        ];
      },
    },
    {
      id: '2.1-e10',
      level: 'extended',
      type: 'fill',
      stem: '今年爸爸 $a$ 岁，小明 $b$ 岁，且 $a>2b$。',
      blanks: [
        { kind: 'expr', label: '(1) 5 年后，爸爸比小明大（岁）', answer: 'a-b' },
        { kind: 'expr', label: '(2) 当爸爸的年龄恰好是小明年龄的 2 倍时，小明的年龄是（岁）', answer: 'a-b' },
        { kind: 'expr', label: '(3) 那一年是今年之后的第（年）', answer: 'a-2b' },
      ],
      explain: [
        '(1) 两人每年都长 1 岁，年龄差永远不变，5 年后爸爸仍比小明大 $(a-b)$ 岁。',
        '(2) 设那时小明的年龄为“一份”，爸爸是“两份”，两人相差正好“一份”。',
        '而这个差就是 $(a-b)$ 岁，所以“一份”就是 $(a-b)$ 岁，即小明那时 $(a-b)$ 岁。',
        '(3) 小明从 $b$ 岁长到 $(a-b)$ 岁，经过了 $(a-b)-b$ 年，也就是 $(a-2b)$ 年。题目给了 $a>2b$，保证这一年还没到。',
        '这类问题的关键是抓住“年龄差不变”这个不变量，不必一年一年去试。',
      ],
      verify: () => {
        const pairs = [[40, 10], [38, 12], [45, 15], [50, 20], [37, 11]];
        const ok = pairs.every(([a, b]) => {
          let t = 0;
          while (t <= 200 && a + t !== 2 * (b + t)) t++;
          return t === a - 2 * b && b + t === a - b && (a + 5) - (b + 5) === a - b;
        });
        return [ok ? 'a-b' : '0', ok ? 'a-b' : '0', ok ? 'a-2b' : '0'];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '2.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '几个连续整数相加，和会有什么特点？下面来研究这件事。',
      blanks: [
        { kind: 'expr', label: '(1) 从 $n$ 开始的 5 个连续整数 $n,\\ n+1,\\ n+2,\\ n+3,\\ n+4$ 的和是', answer: '5n+10' },
        { kind: 'text', label: '(2) 2023、2024、2025、2026 这四个数中，能写成 5 个连续整数之和的是', options: ['2023', '2024', '2025', '2026'], answer: '2025' },
        { kind: 'text', label: '(3) 2025 能不能写成 4 个连续整数之和？', options: ['能', '不能'], answer: '不能' },
        { kind: 'num', label: '(4) 把 2025 写成 $k$ 个连续正整数之和（$k\\ge 2$），$k$ 的最大值是', answer: '54' },
        { kind: 'num', label: '(5) 在 (4) 中 $k$ 取最大值时，这些连续正整数中最小的一个是', answer: '11' },
      ],
      explain: [
        '(1) 五个数相加：五个 $n$ 合起来是 $5n$，常数部分是 $0+1+2+3+4=10$，所以和是 $5n+10$。',
        '(2) $5n+10$ 就是 $5(n+2)$，一定是 5 的倍数。四个数中只有 2025 是 5 的倍数（此时 $n+2=405$，即从 403 开始的五个数）。',
        '(3) 从 $n$ 开始的 4 个连续整数之和是 $4n+6$。$4n$ 是偶数，加 6 还是偶数，而 2025 是奇数，所以不能。',
        '这里看出一条规律：连续整数的个数是奇数时，和是“个数 × 中间那个数”；个数是偶数时，和一定是“一半个数 × 中间两数之和”。',
        '(4) 用“和 $=$ 个数 $\\times$ 平均数”来分析（这正是首尾配对求和的结果）。',
        '先定上界：这 $k$ 个数最小的至少是 1，所以 $2025\\ge 1+2+\\cdots+k=\\frac{k(k+1)}{2}$，即 $k(k+1)\\le 4050$。由 $63\\times 64=4032$、$64\\times 65=4160$ 可知 $k\\le 63$。',
        '再按 $k$ 的奇偶分两类。$k$ 是奇数时，平均数就是正中间的那个整数，所以 2025 必须能被 $k$ 整除。不超过 63 的 2025 的约数有 $3,\\ 5,\\ 9,\\ 15,\\ 25,\\ 27,\\ 45$，最大是 45。',
        '$k$ 是偶数时，正中间是两个数的中间，平均数形如“整数加 $0.5$”，于是 $2025=k\\times(\\text{整数}+0.5)=\\frac{k}{2}\\times(\\text{奇数})$，所以 $\\frac{k}{2}$ 必须能整除 2025。$\\frac{k}{2}$ 取 27 得 $k=54$，没超过 63，可以；取 45 得 $k=90$，超出上界。',
        '两类比较，$k$ 最大是 54。',
        '(5) $k=54$ 时平均数是 $2025\\div 54=37.5$。54 个连续整数中，最小的比平均数小 $26.5$，即 $37.5-26.5=11$。',
        '检验：$11+12+\\cdots+64$ 首尾配对，$(11+64)\\times 54\\div 2=75\\times 27=2025$，正确。',
      ],
      verify: () => {
        const lin = f => `${f(1).sub(f(0))}*n+${f(0)}`;
        const sum5 = n => F(n).add(n + 1).add(n + 2).add(n + 3).add(n + 4);
        const can = (total, k) => {   // total 能否写成 k 个连续整数之和，返回最小的数
          const rest = total - k * (k - 1) / 2;
          return rest % k === 0 ? rest / k : null;
        };
        const five = [2023, 2024, 2025, 2026].filter(t => can(t, 5) !== null);
        const four = can(2025, 4) !== null;
        let best = null;
        for (let k = 2; k <= 400; k++) {
          const a = can(2025, k);
          if (a !== null && a >= 1) best = [k, a];
        }
        return [lin(sum5), String(five[0]), four ? '能' : '不能', best[0], best[1]];
      },
    },
    {
      id: '2.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '把一个长、宽、高分别是 $a$、$b$、$c$ 的长方体（$a$、$b$、$c$ 都是大于 2 的整数）的表面全部涂成红色，再把它切成 $abc$ 个棱长为 1 的小正方体。',
      blanks: [
        { kind: 'num', label: '(1) 三面涂红的小正方体有（个）', answer: '8' },
        { kind: 'expr', label: '(2) 两面涂红的小正方体有（个）', answer: '4(a+b+c-6)' },
        { kind: 'expr', label: '(3) 一面也没有涂红的小正方体有（个）', answer: '(a-2)(b-2)(c-2)' },
        { kind: 'num', label: '(4) 若两面涂红的个数恰好是三面涂红个数的 6 倍，则 $a+b+c=$', answer: '18' },
        { kind: 'num', label: '(5) 在 (4) 的条件下，这样的长方体共有（种）不同的形状（长、宽、高只是摆放不同的算同一种；正方体是特殊的长方体，也要算进去）', answer: '12' },
      ],
      explain: [
        '按小正方体所在的位置分四类：顶点上、棱上（不含顶点）、面上（不含棱）、内部。',
        '(1) 三面涂红的只能在长方体的 8 个顶点上，共 8 个，与 $a$、$b$、$c$ 无关。',
        '(2) 两面涂红的在棱上但不在顶点。长方体的 12 条棱分成三组，每组 4 条：长为 $a$ 的 4 条，每条去掉两端剩 $(a-2)$ 个；长为 $b$、$c$ 的同理。',
        '所以共有 $4(a-2)+4(b-2)+4(c-2)$ 个，也就是 $4(a+b+c-6)$ 个。',
        '(3) 没涂红的在内部，它们组成一个长、宽、高分别为 $(a-2)$、$(b-2)$、$(c-2)$ 的长方体，共 $(a-2)(b-2)(c-2)$ 个。',
        '(4) 三面涂红有 8 个，6 倍就是 48 个。而两面涂红的个数是 4 个 $(a+b+c-6)$，所以 $(a+b+c-6)$ 就是 $48\\div 4=12$，于是 $a+b+c=18$。',
        '注意这一问只能定出三条棱长之和，定不出每条棱各是多少——这正是下一问要数的东西。',
        '(5) 现在要找出所有满足 $a+b+c=18$ 且每个都大于 2 的整数。因为形状与摆放无关，不妨按 $a\\le b\\le c$ 有序地数，避免重复。',
        '$a=3$ 时，$b+c=15$ 且 $3\\le b\\le c$，$b$ 可取 $3,4,5,6,7$（$b=7$ 时 $c=8$；$b=8$ 时 $c=7$ 就重复了），5 种；',
        '$a=4$ 时，$b+c=14$，$b$ 可取 $4,5,6,7$，4 种；$a=5$ 时，$b+c=13$，$b$ 可取 $5,6$，2 种；$a=6$ 时，$b+c=12$，$b$ 只能取 6，1 种；$a=7$ 时要求 $b\\ge 7$、$c\\ge b$，和已经超过 18，不可能。',
        '合计 $5+4+2+1=12$ 种：$(3,3,12)$、$(3,4,11)$、$(3,5,10)$、$(3,6,9)$、$(3,7,8)$、$(4,4,10)$、$(4,5,9)$、$(4,6,8)$、$(4,7,7)$、$(5,5,8)$、$(5,6,7)$、$(6,6,6)$。',
        '别漏掉最后一种 $(6,6,6)$：它是正方体，而正方体是特殊的长方体，同样满足条件。',
      ],
      verify: () => {
        // 逐个小正方体数它有几面在表面上
        const counts = (a, b, c) => {
          const r = [0, 0, 0, 0];
          for (let x = 1; x <= a; x++) for (let y = 1; y <= b; y++) for (let z = 1; z <= c; z++) {
            let f = 0;
            if (x === 1 || x === a) f++;
            if (y === 1 || y === b) f++;
            if (z === 1 || z === c) f++;
            r[f]++;
          }
          return r;
        };
        const three = new Set([[3, 4, 5], [4, 6, 7], [5, 5, 9]].map(t => counts(...t)[3]));
        const boxes = [];
        for (let a = 3; a <= 16; a++) for (let b = a; b <= 16; b++) for (let c = b; c <= 16; c++) {
          if (counts(a, b, c)[2] === 6 * counts(a, b, c)[3]) boxes.push([a, b, c]);
        }
        const sums = new Set(boxes.map(t => t[0] + t[1] + t[2]));
        const inner = [[3, 4, 5], [4, 6, 7]].every(t => counts(...t)[0] === (t[0] - 2) * (t[1] - 2) * (t[2] - 2));
        const two = [[3, 4, 5], [4, 6, 7], [5, 5, 9]].every(t => counts(...t)[2] === 4 * (t[0] + t[1] + t[2] - 6));
        return [
          three.size === 1 ? [...three][0] : null,
          two ? '4(a+b+c-6)' : '0',
          inner ? '(a-2)(b-2)(c-2)' : '0',
          sums.size === 1 ? [...sums][0] : null,
          boxes.length,
        ];
      },
    },
    {
      id: '2.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '一个三位数的百位数字是 $a$，十位数字是 $b$，个位数字是 $c$（$a\\ne 0$，$c\\ne 0$）。把它的百位数字与个位数字交换位置，得到一个新的三位数。',
      blanks: [
        { kind: 'expr', label: '(1) 原数减去新数，差是', answer: '99(a-c)' },
        { kind: 'num', label: '(2) 当 $a\\ne c$ 时，这个差一定能被（填最大的正整数）整除', answer: '99' },
        { kind: 'num', label: '(3) 若原数减去新数的差是 396，则 $a-c=$', answer: '4' },
        { kind: 'num', label: '(4) 满足 (3) 且本身是偶数的三位数共有（个）', answer: '20' },
      ],
      explain: [
        '(1) 三位数按数位展开：原数是 $100a+10b+c$，新数是 $100c+10b+a$。',
        '相减时十位上的 $10b$ 抵消：差 $=100a+c-100c-a$。含 $a$ 的合起来是 $99a$，含 $c$ 的合起来是 $-99c$，所以差是 $99a-99c=99(a-c)$。',
        '(2) 差总是 99 的倍数。取 $a-c=1$（比如 201 与 102）时差恰好是 99，所以不可能有比 99 更大的数能整除所有这样的差，最大的就是 99。',
        '(3) 由 $99(a-c)=396$ 得 $a-c=396\\div 99=4$。',
        '(4) 先找满足 $a-c=4$ 且 $c\\ne 0$ 的数字对：$(a,c)$ 可以是 $(5,1),(6,2),(7,3),(8,4),(9,5)$ 共 5 对（$c$ 再大 $a$ 就超过 9 了）。',
        '再加上“原数是偶数”的条件：个位 $c$ 必须是偶数，只剩 $(6,2)$ 和 $(8,4)$ 两对。',
        '十位数字 $b$ 不受任何限制，可以取 $0\\sim 9$ 共 10 个值。所以这样的三位数共有 $2\\times 10=20$ 个。',
      ],
      verify: () => {
        const all = [];
        for (let n = 100; n <= 999; n++) {
          const a = Math.floor(n / 100), b = Math.floor(n / 10) % 10, c = n % 10;
          if (c === 0) continue;
          all.push({ n, a, c, diff: n - (100 * c + 10 * b + a) });
        }
        const sample = (a, b, c) => (100 * a + 10 * b + c) - (100 * c + 10 * b + a);
        const k = sample(3, 4, 2) - sample(3, 4, 3);   // a-c 每增加 1，差增加多少
        const gcd = (x, y) => (y ? gcd(y, x % y) : x);
        const big = all.filter(x => x.a !== x.c).map(x => Math.abs(x.diff)).reduce(gcd);
        const d = new Set(all.filter(x => x.diff === 396).map(x => x.a - x.c));
        const cnt = all.filter(x => x.diff === 396 && x.n % 2 === 0).length;
        return [`${k}*(a-c)`, big, d.size === 1 ? [...d][0] : null, cnt];
      },
    },
    {
      id: '2.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '小明表演“猜数游戏”，规则是：心里想一个数，然后依次做五步——① 加 3；② 乘 4；③ 减 4；④ 除以 2；⑤ 减去最初想的那个数。',
      blanks: [
        { kind: 'num', label: '(1) 最初想的数是 $-5$ 时，最后的结果是', answer: '-1' },
        { kind: 'expr', label: '(2) 最初想的数是 $x$ 时，最后的结果是', answer: 'x+4' },
        { kind: 'num', label: '(3) 若把第④步改成“除以 $m$”（$m\\ne 0$），要使最后的结果与最初想的数无关，则 $m=$', answer: '4' },
        { kind: 'num', label: '(4) 在 (3) 的条件下，最后的结果总是', answer: '2' },
        {
          kind: 'text',
          label: '(5) 若第④步仍是“除以 2”，而把第①步改成“加 $k$”，能否使最后的结果总等于最初想的数的相反数？',
          options: ['能，$k=1$', '能，$k=0$', '能，$k=-1$', '不能，无论 $k$ 取何值都做不到'],
          answer: '不能，无论 $k$ 取何值都做不到',
        },
      ],
      explain: [
        '(1) 依次算：$-5+3=-2$；$-2\\times 4=-8$；$-8-4=-12$；$-12\\div 2=-6$；$-6-(-5)=-1$。',
        '(2) 把想的数记作 $x$，五步依次得到：$x+3$；$4(x+3)$；$4(x+3)-4$；$\\frac{4(x+3)-4}{2}$；最后再减 $x$。',
        '用分配律把 $4(x+3)$ 写成 $4x+12$，减 4 得 $4x+8$，除以 2 得 $2x+4$。最后减去 $x$：$2x$ 是 2 个 $x$，减去 1 个 $x$ 还剩 1 个 $x$（这也是分配律：$2x-x=(2-1)x=x$），所以结果是 $x+4$。',
        '所以这个“魔术”其实不灵：结果随想的数而变。用 (1) 检验：$x=-5$ 时 $x+4=-1$，对上了。',
        '(3) 把第④步改成除以 $m$：前三步的结果是 $4x+8$，除以 $m$ 后，含 $x$ 的部分是 $\\frac{4x}{m}$，也就是 $x$ 的 $\\frac{4}{m}$ 倍；再减去 1 个 $x$。',
        '要使结果与 $x$ 无关，含 $x$ 的部分必须正好消失，即 $\\frac{4}{m}$ 倍减去 1 倍等于 0 倍，所以 $\\frac{4}{m}=1$，$m=4$。',
        '(4) 此时常数部分是 $8\\div 4=2$，所以无论想的是什么数，结果都是 2。',
        '(5) 第①步改成加 $k$ 后，前四步得到 $\\frac{4(x+k)-4}{2}$。用分配律展开：$4x+4k-4$，除以 2 得 $2x+2k-2$，再减去 $x$，结果是 $x+(2k-2)$。',
        '结果里含 $x$ 的部分始终是 1 个 $x$，而“最初想的数的相反数”是 $-x$，含 $x$ 的部分是 $-1$ 个 $x$。$k$ 只能改变常数部分，改不了 $x$ 前面的倍数，所以无论 $k$ 取什么值都做不到。',
        '提醒：只代一个数验证是不够的。比如取 $k=0$ 再代 $x=1$，结果是 $-1$，正好等于 $-x$，看上去“成功”了；但换成 $x=2$ 就得到 0，不等于 $-2$。必须看含 $x$ 的部分，才能下结论。',
      ],
      verify: () => {
        const run = (x, m, k) => F(x).add(k).mul(4).sub(4).div(m).sub(x);
        const xs = [-5, -2, 0, 1, 7, 100];
        const lin = f => `${f(1).sub(f(0))}*x+${f(0)}`;
        let m0 = null;
        for (let m = -20; m <= 20; m++) {
          if (!m) continue;
          if (new Set(xs.map(x => run(x, m, 3).toString())).size === 1) m0 = m;
        }
        let chance = null;
        for (let k = -20; k <= 20; k++) if (xs.every(x => run(x, 2, k).eq(F(-x)))) chance = k;
        return [
          run(-5, 2, 3),
          lin(x => run(x, 2, 3)),
          m0,
          run(0, m0, 3),
          chance === null ? '不能，无论 $k$ 取何值都做不到' : `能，$k=${chance}$`,
        ];
      },
    },
    {
      id: '2.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '把正整数 $1,\\ 2,\\ 3,\\ \\dots$ 按下图的方式排成 6 列：第 1 行从左往右依次填 $1\\sim 6$，第 2 行从右往左依次填 $7\\sim 12$，第 3 行又从左往右依次填 $13\\sim 18$，……（奇数行从左往右填，偶数行从右往左填）',
      figure: FIG21.snake,
      blanks: [
        { kind: 'num', label: '(1) 2025 在第（行）', answer: '338' },
        { kind: 'num', label: '(2) 2025 在第（列）', answer: '4' },
        { kind: 'expr', label: '(3) 当 $n$ 是奇数时，第 $n$ 行第 $k$ 列的数是（用含 $n$、$k$ 的式子表示）', answer: '6n-6+k' },
        { kind: 'expr', label: '(4) 当 $n$ 是偶数时，第 $n$ 行第 $k$ 列的数是（用含 $n$、$k$ 的式子表示）', answer: '6n-k+1' },
        { kind: 'expr', label: '(5) 第 4 列中，从上往下前 $2n$ 个数的和是（用含 $n$ 的式子表示）', answer: '12n^2+n' },
      ],
      explain: [
        '每行都有 6 个数，第 $n$ 行填的是从 $6n-5$ 到 $6n$ 这 6 个连续整数，方向由行数的奇偶决定。',
        '(1) 由 $6\\times 337=2022$ 知，第 337 行的最后一个数是 2022，所以 2025 在第 338 行，是这一行第 3 个填的数。',
        '(2) 338 是偶数，这一行从右往左填：第 1 个填的在第 6 列，第 2 个在第 5 列，第 3 个在第 4 列。所以 2025 在第 4 列。漏掉方向就会答成第 3 列。',
        '(3) $n$ 是奇数时从左往右填，第 $k$ 列就是这一行第 $k$ 个填的数，比这一行最小的数 $6n-5$ 大 $k-1$，即 $6n-5+k-1=6n-6+k$。',
        '检验：$n=3$、$k=1$ 时是 13，$n=3$、$k=6$ 时是 18，与图一致。',
        '(4) $n$ 是偶数时从右往左填，第 6 列是第 1 个填的数 $6n-5$，每往左一列就大 1，第 $k$ 列比第 6 列大 $6-k$，即 $6n-5+6-k=6n-k+1$。',
        '检验：$n=2$、$k=1$ 时是 12，$n=2$、$k=6$ 时是 7，与图一致。',
        '(5) 把 (3)(4) 中的 $k$ 取成 4：奇数行第 4 列是 $6n-2$，偶数行第 4 列是 $6n-3$，两者不一样，必须分开处理。',
        '把前几个写出来看看：$4,\\ 9,\\ 16,\\ 21,\\ 28,\\ 33,\\ \\dots$，每次增加的是 5、7、5、7……交替，并不是等差数列，不能直接套公式。',
        '但首尾配对仍然管用。前 $2n$ 个数占第 1 行到第 $2n$ 行，最后两个是第 $2n-1$ 行（奇数行）的 $6(2n-1)-2=12n-8$ 和第 $2n$ 行（偶数行）的 $6\\times 2n-3=12n-3$。',
        '第 1 个与最后 1 个：$4+(12n-3)=12n+1$；第 2 个与倒数第 2 个：$9+(12n-8)=12n+1$；两次都得到同一个数。',
        '为什么每一对都相等？因为从前往后每次增加 5、7 交替，从后往前每次减少 7、5 交替，一增一减正好抵消，所以每对的和都是 $12n+1$。',
        '一共 $2n$ 个数，配成 $n$ 对，总和是 $n$ 个 $(12n+1)$，即 $12n^2+n$。',
        '检验：$n=1$ 时前 2 个数是 4 和 9，和为 13，而 $12+1=13$；$n=5$ 时前 10 个数之和是 305，而 $12\\times 25+5=305$，都对上了。',
      ],
      verify: () => {
        const rowNums = n => {
          const a = [];
          for (let k = 6 * n - 5; k <= 6 * n; k++) a.push(k);
          return n % 2 ? a : a.reverse();
        };
        let pos = null;
        for (let n = 1; n <= 400; n++) {
          const i = rowNums(n).indexOf(2025);
          if (i >= 0) pos = [n, i + 1];
        }
        const odd = [1, 3, 5, 7].every(n => [1, 2, 3, 4, 5, 6].every(k => rowNums(n)[k - 1] === 6 * n - 6 + k));
        const even = [2, 4, 6, 8].every(n => [1, 2, 3, 4, 5, 6].every(k => rowNums(n)[k - 1] === 6 * n - k + 1));
        const colSum = m => { let s = 0; for (let n = 1; n <= m; n++) s += rowNums(n)[3]; return s; };
        // 由三个取值还原二次式 An^2+Bn+C
        const C = 0;
        const A = (colSum(4) - 2 * colSum(2) + C) / 2;
        const B = colSum(2) - C - A;
        return [pos[0], pos[1], odd ? '6n-6+k' : '0', even ? '6n-k+1' : '0', `${A}*n^2+${B}*n+${C}`];
      },
    },
  ],
});
