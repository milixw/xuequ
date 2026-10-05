'use strict';

// 上海数学七年级上册 · 13.3 分式方程
// 知识范围：分式方程与整式方程；解分式方程（去分母化成整式方程、验根）；增根；可化为一元一次方程的分式方程；
//   分式方程的应用（浓度、优惠、行程、工程等）
// 可以使用：13.1、13.2；第 12 章因式分解；第 11、10 章；六年级上下册全部内容（一元一次方程、二元一次方程组、三元一次方程组、整除）
// 还没学：一元二次方程（去分母后只能得到一元一次方程，二次项要能消掉）；不等式（七年级下册，不出“解为正数求参数范围”）；开平方
// 本节约定：题目里的“解”指原分式方程的解（已经验根）

// verify 用：方程 f(x)=0，D(x) 是公分母。在三个远离分母零点的点上算 f·D，确认它是一次式后求出根；
// 根使公分母为 0 时返回 '增根'，f·D 是非零常数时返回 '无解'
const root133 = (f, D) => {
  const p = [F(97), F(101), F(113)];
  const v = p.map(x => f(x).mul(D(x)));
  const k = v[1].sub(v[0]).div(p[1].sub(p[0]));
  if (!v[2].sub(v[0]).eq(k.mul(p[2].sub(p[0])))) return null;  // 不是一次式
  if (k.isZero()) return v[0].isZero() ? null : '无解';
  const x = p[0].sub(v[0].div(k));
  return D(x).isZero() ? '增根' : x;
};

Content.section({
  id: 'math/sh2024/g7s1/13.3',
  title: '分式方程',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮 e02（顺逆流用时相同）只有 2 级且与卡片例子同模板、扩展档缺 5 级，e06（无解三种情况）与 c05 同模板，c02 第 (1) 问与 b07 同模型、第 (2) 问只到 4～5 级，卡片 π 提醒提前提示 b01；第 2 轮 e02 改两次进货 + 打折求售价、e06 改裂项型分式方程（增根藏在中间分母里）、c02 改为“乙到 B 时甲离 B 还有 6 km”并加返程分类、删去 π 提醒后判定整节通过。可选意见：c02 与 b07 背景相近' },

  intro: [
    {
      title: '分式方程',
      body: '**分母里含有未知数**的方程叫作分式方程；分母里不含未知数的方程（比如一元一次方程）叫作整式方程。判断时看方程原来的样子，不要先约分。',
      example: '$\\frac{3}{x}=1$ 是分式方程；$\\frac{x}{3}=1$ 的分母是数 $3$，是整式方程。',
    },
    {
      title: '解分式方程',
      body: '关键是把分母“去掉”：方程两边同乘**最简公分母**，化成整式方程并求解；然后**验根**，把解代回最简公分母（或原方程），看分母是否为 $0$，最后写出结论。',
      example: '$\\frac{3}{x+1}=\\frac{2}{x}$：两边乘 $x(x+1)$，得 $3x=2(x+1)$，$x=2$。检验：$x=2$ 时 $x(x+1)=6\\ne0$，所以原方程的解是 $x=2$。',
      pitfall: '去分母时，不含分母的项（比如单独的 $1$、$2$）也要乘公分母；分母互为相反数（如 $x-5$ 与 $5-x$）时先变号，化成同一个分母。',
    },
    {
      title: '增根',
      body: '两边同乘的整式的值可能为 $0$，这时就可能产生**不适合原方程的根**，叫作增根，要舍去。所以解分式方程一定要验根；整式方程的根全是增根时，原方程**无解**。',
      example: '$\\frac{x}{x-1}=\\frac{1}{x-1}$：两边乘 $x-1$ 得 $x=1$，此时分母 $x-1=0$，$x=1$ 是增根，原方程无解。',
    },
    {
      title: '含字母系数的分式方程',
      body: '去分母后若得到 $ax=b$：当 $a=0$、$b\\ne0$ 时整式方程就没有解；当 $a\\ne0$ 时 $x=\\frac ba$，还要看它会不会使公分母为 $0$。增根是**去分母后的整式方程**的根，求参数时把它代入整式方程，不能代入原方程。',
    },
    {
      title: '分式方程的应用',
      body: '和一元一次方程一样：审题、设未知数、找等量关系列方程、解方程。分式方程**既要验根，也要看是否符合实际意义**（速度、人数要为正数等），最后作答。',
      example: '甲每小时比乙多做 $2$ 个零件，甲做 $30$ 个与乙做 $20$ 个用时相同。设乙每小时做 $x$ 个：$\\frac{30}{x+2}=\\frac{20}{x}$，$x=4$，经检验符合题意。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '13.3-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列方程：① $\\frac{x-1}{2}=\\frac{x}{3}$；② $\\frac{1}{x}+2=3$；③ $\\frac{x}{\\pi}=1$；④ $\\frac{x^{2}}{x}=2$；⑤ $\\frac{1}{x+1}=0$。其中分式方程有（　　）',
      options: ['$2$ 个', '$3$ 个', '$4$ 个', '$5$ 个'],
      answer: 1,
      explain: [
        '看分母里有没有未知数 $x$。',
        '① 分母是 $2$、$3$，整式方程；③ 分母是 $\\pi$，$\\pi$ 是数，也是整式方程。',
        '② 分母含 $x$，是分式方程；④ 按原来的样子看，分母是 $x$，是分式方程（不能先约分成 $x=2$ 再判断）；⑤ 分母含 $x$，是分式方程。',
        '分式方程有 ②④⑤，共 $3$ 个，选 B。常见错误：把 ③ 也算进去，或者把 ④ 约分后当作整式方程。',
      ],
    },
    {
      id: '13.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$\\frac{2}{x+3}=\\frac{3}{x-1}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '-11' },
      ],
      explain: [
        '最简公分母是 $(x+3)(x-1)$，两边同乘它：$2(x-1)=3(x+3)$。',
        '去括号：$2x-2=3x+9$，移项：$-x=11$，$x=-11$。',
        '检验：$x=-11$ 时 $(x+3)(x-1)=(-8)\\times(-12)=96\\ne0$，所以原方程的解是 $x=-11$。',
        '常见错误：交叉相乘时配错，写成 $2(x+3)=3(x-1)$，得 $x=9$。',
      ],
      verify: () => root133(x => F(2).div(x.add(3)).sub(F(3).div(x.sub(1))), x => x.add(3).mul(x.sub(1))),
    },
    {
      id: '13.3-b03',
      level: 'basic',
      type: 'choice',
      stem: '方程 $\\frac{x}{x-3}-2=\\frac{3}{x-3}$ 的解是（　　）',
      options: ['$x=3$', '$x=-3$', '原方程无解', '$x=5$'],
      answer: 2,
      explain: [
        '两边同乘 $x-3$：$x-2(x-3)=3$。注意左边的 $2$ 也要乘 $x-3$。',
        '去括号：$x-2x+6=3$，$-x=-3$，$x=3$。',
        '验根：$x=3$ 时分母 $x-3=0$，所以 $x=3$ 是增根，原方程无解，选 C。',
        '常见错误：不验根选 A；$2$ 漏乘 $x-3$，得 $x-2=3$，选 D。',
      ],
      verify: () => {
        const r = root133(x => x.div(x.sub(3)).sub(2).sub(F(3).div(x.sub(3))), x => x.sub(3));
        return r === '增根' || r === '无解' ? 2 : null;
      },
    },
    {
      id: '13.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$\\frac{x}{x-2}+\\frac{1}{2-x}=3$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '5/2' },
      ],
      explain: [
        '$2-x=-(x-2)$，先化成同分母：$\\frac{1}{2-x}=-\\frac{1}{x-2}$，方程变为 $\\frac{x}{x-2}-\\frac{1}{x-2}=3$。',
        '两边同乘 $x-2$：$x-1=3(x-2)$，即 $x-1=3x-6$，$-2x=-5$，$x=\\frac52$。',
        '检验：$x=\\frac52$ 时 $x-2=\\frac12\\ne0$，所以原方程的解是 $x=\\frac52$。',
        '常见错误：没变号，直接得 $x+1=3(x-2)$，$x=\\frac72$。',
      ],
      verify: () => root133(x => x.div(x.sub(2)).add(F(1).div(F(2).sub(x))).sub(3), x => x.sub(2)),
    },
    {
      id: '13.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '解方程：$\\frac{x}{x-1}-1=\\frac{6}{(x-1)(x+2)}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '4' },
      ],
      explain: [
        '最简公分母是 $(x-1)(x+2)$。两边同乘它：$x(x+2)-(x-1)(x+2)=6$，左边的 $1$ 也要乘。',
        '展开：$x^{2}+2x-(x^{2}+x-2)=6$，二次项消掉，得 $x+2=6$，$x=4$。',
        '检验：$x=4$ 时 $(x-1)(x+2)=18\\ne0$，所以原方程的解是 $x=4$。',
        '常见错误：$1$ 只乘了 $x-1$ 或者漏乘，得到 $x(x+2)-1=6$ 这样带二次项、解不下去的方程；去括号时 $-(x^{2}+x-2)$ 的 $-2$ 没变号，得 $x=8$。',
      ],
      verify: () => root133(x => x.div(x.sub(1)).sub(1).sub(F(6).div(x.sub(1).mul(x.add(2)))), x => x.sub(1).mul(x.add(2))),
    },
    {
      id: '13.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '若关于 $x$ 的方程 $\\frac{x-1}{x-4}=\\frac{m}{x-4}+2$ 有增根，则 $m$ 的值是多少？',
      blanks: [
        { kind: 'num', label: '$m=$', answer: '3' },
      ],
      explain: [
        '增根只可能使公分母 $x-4=0$，所以增根是 $x=4$。',
        '去分母得整式方程：$x-1=m+2(x-4)$。增根是**这个整式方程**的根，把 $x=4$ 代入：$3=m+0$，$m=3$。',
        '常见错误：把 $x=4$ 代入原方程，分母为 $0$，无从下手；或者去分母时 $2$ 漏乘 $x-4$，得 $m=1$。',
      ],
      verify: () => {
        for (let m = -20; m <= 20; m++) {
          const r = root133(x => x.sub(1).div(x.sub(4)).sub(F(m).div(x.sub(4))).sub(2), x => x.sub(4));
          if (r === '增根') return m;
        }
        return null;
      },
    },
    {
      id: '13.3-b07',
      level: 'basic',
      type: 'choice',
      stem: '$A$、$B$ 两地相距 $160$ km，甲骑摩托车、乙开汽车，都从 $A$ 地去 $B$ 地，汽车的速度是摩托车的 $4$ 倍。甲比乙早出发 $2$ 小时，结果乙比甲早到 $1$ 小时。设摩托车的速度是 $x$ km/h，所列方程正确的是（　　）',
      options: [
        '$\\frac{160}{x}-\\frac{160}{4x}=1$',
        '$\\frac{160}{x}-\\frac{160}{4x}=2$',
        '$\\frac{160}{x}-\\frac{160}{4x}=3$',
        '$\\frac{160}{4x}-\\frac{160}{x}=3$',
      ],
      answer: 2,
      explain: [
        '甲用时 $\\frac{160}{x}$ 小时，乙用时 $\\frac{160}{4x}$ 小时，甲用时多。',
        '甲早出发 $2$ 小时，还比乙晚到 $1$ 小时，所以甲比乙多用 $2+1=3$ 小时：$\\frac{160}{x}-\\frac{160}{4x}=3$，选 C。',
        '常见错误：只看“早出发 $2$ 小时”或“早到 $1$ 小时”，选 A、B；或者把两个时间减反，选 D。（解得 $x=40$，经检验符合题意。）',
      ],
    },
    {
      id: '13.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '已知关于 $x$ 的方程 $\\frac{ax+1}{x-1}-\\frac{2}{1-x}=1$ 的解是 $x=-2$，求 $a$ 的值。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '3' },
      ],
      explain: [
        '把 $x=-2$ 代入：$\\frac{-2a+1}{-3}-\\frac{2}{3}=1$。注意 $1-x=1-(-2)=3$。',
        '所以 $\\frac{-2a+1}{-3}=\\frac53$，$-2a+1=-5$，$a=3$。',
        '也可以先去分母：$ax+1+2=x-1$，再代入 $x=-2$：$-2a+3=-3$，$a=3$。',
        '常见错误：$1-x$ 当成 $x-1$，算成 $\\frac{-2a+1}{-3}+\\frac23=1$，得 $a=\\frac12$。',
      ],
      verify: () => {
        for (let a = -20; a <= 20; a++) {
          const r = root133(x => F(a).mul(x).add(1).div(x.sub(1)).sub(F(2).div(F(1).sub(x))).sub(1), x => x.sub(1));
          if (r instanceof Frac && r.eq(F(-2))) return a;
        }
        return null;
      },
    },
    {
      id: '13.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '当 $x$ 为何值时，分式 $\\frac{3}{x-1}$ 与 $\\frac{4}{x}$ 的值互为相反数？',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '4/7' },
      ],
      explain: [
        '互为相反数，和为 $0$：$\\frac{3}{x-1}+\\frac{4}{x}=0$。',
        '两边同乘 $x(x-1)$：$3x+4(x-1)=0$，$7x=4$，$x=\\frac47$。',
        '检验：$x=\\frac47$ 时 $x(x-1)=\\frac47\\times(-\\frac37)\\ne0$，符合。',
        '常见错误：列成 $\\frac{3}{x-1}=\\frac{4}{x}$（相等），得 $x=-4$。',
      ],
      verify: () => root133(x => F(3).div(x.sub(1)).add(F(4).div(x)), x => x.mul(x.sub(1))),
    },

    // ---------- 扩展 ----------
    {
      id: '13.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '已知 $m$ 是整数，且关于 $x$ 的分式方程 $\\frac{mx-8}{x-2}=1$ 的解是整数，求所有满足条件的 $m$ 的和。',
      blanks: [
        { kind: 'num', label: '和是', answer: '4' },
      ],
      explain: [
        '去分母：$mx-8=x-2$，整理得 $(m-1)x=6$。',
        '$m=1$ 时 $0\\cdot x=6$，无解，舍去。$m\\ne1$ 时 $x=\\frac{6}{m-1}$，要是整数，$m-1$ 是 $6$ 的约数：$m-1=\\pm1,\\pm2,\\pm3,\\pm6$。',
        '还要验根：$x=2$ 是增根，此时 $m-1=3$，即 $m=4$，要舍去。',
        '满足条件的 $m$：$2,3,7,0,-1,-2,-5$，和为 $4$。',
        '常见错误：忘了排除增根，把 $m=4$ 也算进去，得 $8$；或者只考虑正约数。',
      ],
      verify: () => {
        let sum = F(0);
        for (let m = -50; m <= 50; m++) {
          const r = root133(x => F(m).mul(x).sub(8).div(x.sub(2)).sub(1), x => x.sub(2));
          if (r instanceof Frac && r.d === 1n) sum = sum.add(m);
        }
        return sum;
      },
    },
    {
      id: '13.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '某商店第一次用 $3000$ 元购进某种商品，第二次用 $9000$ 元购进同种商品，第二次购进的数量是第一次的 $2.5$ 倍，但每件进价比第一次多 $2$ 元。(1) 第一次每件进价是多少元？(2) 两批商品按同一售价销售，第二批最后剩下的 $50$ 件按售价打八折卖完，两批共盈利 $3600$ 元，求售价。',
      blanks: [
        { kind: 'num', label: '(1) 第一次进价（元）', answer: '10' },
        { kind: 'num', label: '(2) 售价（元）', answer: '15' },
      ],
      explain: [
        '(1) 设第一次每件进价 $x$ 元，第二次 $(x+2)$ 元。第一次买了 $\\frac{3000}{x}$ 件，第二次买了 $\\frac{9000}{x+2}$ 件。',
        '数量关系：$\\frac{3000}{x}\\times2.5=\\frac{9000}{x+2}$，即 $\\frac{7500}{x}=\\frac{9000}{x+2}$。',
        '两边同乘 $x(x+2)$：$7500(x+2)=9000x$，$1500x=15000$，$x=10$。经检验符合题意。',
        '(2) 第一批 $\\frac{3000}{10}=300$ 件，第二批 $\\frac{9000}{12}=750$ 件。设售价 $y$ 元，按原价卖出 $300+700=1000$ 件，打八折卖出 $50$ 件。',
        '$1000y+50\\times0.8y-(3000+9000)=3600$，$1040y=15600$，$y=15$。',
        '常见错误：(1) 把 $2.5$ 倍乘在第二次的数量上；(2) 忘了减去两批的总进价，或者打折的 $50$ 件仍按原价算。',
      ],
      verify: () => {
        const x = root133(x => F(3000).div(x).mul('5/2').sub(F(9000).div(x.add(2))), x => x.mul(x.add(2)));
        if (!(x instanceof Frac)) return null;
        const n1 = F(3000).div(x);
        const n2 = F(9000).div(x.add(2));
        // 盈利是售价 y 的一次式：在 y=0、1 两点求斜率
        const profit = y => n1.add(n2).sub(50).mul(y).add(F(50).mul(y).mul('4/5')).sub(12000);
        const k = profit(F(1)).sub(profit(F(0)));
        return [x, F(3600).sub(profit(F(0))).div(k)];
      },
    },
    {
      id: '13.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '小明解关于 $x$ 的方程 $\\frac{2x-1}{x-3}=\\frac{a}{x-3}+2$ 时，去分母时右边的 $2$ 漏乘了 $x-3$，结果解得 $x=5$。求 $a$ 的值，并求原方程正确的解。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '7' },
        { kind: 'text', label: '原方程的解', answer: '无解', options: ['x=5', 'x=3', 'x=-1', '无解'] },
      ],
      explain: [
        '小明漏乘后得到的方程是 $2x-1=a+2$，$x=5$ 是它的解：$9=a+2$，$a=7$。',
        '正确去分母：$2x-1=7+2(x-3)$，即 $2x-1=2x+1$。',
        '整理得 $0\\cdot x=2$，这个整式方程没有解，所以原方程无解。',
        '常见错误：以为原方程的解仍是 $x=5$；或者没发现 $x$ 消掉了，硬算出 $x=3$。',
      ],
      verify: () => {
        // 漏乘后的方程 2x−1=a+2 在 x=5 时成立
        const a = F(2).mul(5).sub(1).sub(2);
        const r = root133(x => F(2).mul(x).sub(1).div(x.sub(3)).sub(a.div(x.sub(3))).sub(2), x => x.sub(3));
        return [a, r === '无解' || r === '增根' ? '无解' : 'x=' + r];
      },
    },
    {
      id: '13.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '$A$、$B$ 两地相距 $120$ km。一辆汽车按原计划的速度行驶 $1$ 小时后，把速度提高到原来的 $1.5$ 倍，结果比原计划提前 $20$ 分钟到达 $B$ 地。求原计划的速度。',
      blanks: [
        { kind: 'num', label: '原计划速度（km/h）', answer: '60' },
      ],
      explain: [
        '设原计划速度为 $x$ km/h。原计划用时 $\\frac{120}{x}$ 小时。',
        '实际：先行驶 $1$ 小时，走了 $x$ km，剩下 $(120-x)$ km 用速度 $1.5x$，用时 $\\frac{120-x}{1.5x}$ 小时。',
        '$20$ 分钟 $=\\frac13$ 小时：$1+\\frac{120-x}{1.5x}=\\frac{120}{x}-\\frac13$。',
        '两边同乘 $3x$：$3x+2(120-x)=360-x$，$x+240=360-x$，$x=60$。',
        '检验：$x=60$ 时 $3x\\ne0$，且 $1$ 小时只走了 $60$ km，没超过全程，符合题意。',
        '常见错误：$20$ 分钟直接写成 $20$；或者把全程都按 $1.5x$ 算。',
      ],
      verify: () => root133(x => F(1).add(F(120).sub(x).div(x.mul('3/2'))).sub(F(120).div(x)).add(F('1/3')), x => x.mul(3)),
    },
    {
      id: '13.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '某工程，甲队单独做恰好在规定工期内完成，乙队单独做要比规定工期多用 $3$ 天。若甲、乙两队先合作 $2$ 天，余下的由乙队单独做，也恰好在规定工期内完成。(1) 规定工期是多少天？(2) 甲队每天的费用是 $1.2$ 万元，乙队每天的费用是 $0.5$ 万元。在甲单独做、乙单独做、先合作 $2$ 天再由乙单独做这三种方案中，不耽误工期且最省钱的方案要花多少万元？',
      blanks: [
        { kind: 'num', label: '(1) 规定工期（天）', answer: '6' },
        { kind: 'num', label: '(2) 最少费用（万元）', answer: '27/5' },
      ],
      explain: [
        '(1) 设规定工期为 $x$ 天，甲每天完成 $\\frac1x$，乙每天完成 $\\frac{1}{x+3}$。',
        '第三种方案中乙从头做到尾共 $x$ 天，甲只做了 $2$ 天：$\\frac2x+\\frac{x}{x+3}=1$。',
        '两边同乘 $x(x+3)$：$2(x+3)+x^{2}=x(x+3)$，二次项消掉，$2x+6=3x$，$x=6$。经检验符合题意。',
        '(2) 乙单独做要 $9$ 天，超过工期，不行。甲单独做：$1.2\\times6=7.2$（万元）。',
        '先合作再乙做：甲 $2$ 天、乙 $6$ 天，$1.2\\times2+0.5\\times6=5.4$（万元）。最省钱的是这种，花 $5.4$ 万元。',
        '常见错误：把乙做的天数写成 $x-2$（漏掉合作的 $2$ 天里乙也在做）。',
      ],
      verify: () => {
        let days = null;
        const r = root133(x => F(2).div(x).add(x.div(x.add(3))).sub(1), x => x.mul(x.add(3)));
        if (r instanceof Frac) days = r;
        if (!days) return null;
        const plans = [
          { time: days, cost: days.mul('6/5') },
          { time: days.add(3), cost: days.add(3).mul('1/2') },
          { time: days, cost: F('6/5').mul(2).add(days.mul('1/2')) },
        ].filter(p => p.time.cmp(days) <= 0);
        return [days, plans.reduce((m, p) => (p.cost.cmp(m) < 0 ? p.cost : m), plans[0].cost)];
      },
    },
    {
      id: '13.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '解方程：$\\frac{1}{x(x+1)}+\\frac{1}{(x+1)(x+2)}+\\frac{1}{(x+2)(x+3)}+\\cdots+\\frac{1}{(x+2025)(x+2026)}=\\frac{2}{x}$。',
      blanks: [
        { kind: 'text', label: '方程的解', answer: '无解', options: ['x=-1013', 'x=1013', 'x=-2026', '无解'] },
      ],
      explain: [
        '左边有 $2026$ 项，公分母很复杂，直接去分母做不下去。用 13.2 学过的拆分：$\\frac{1}{n(n+1)}=\\frac1n-\\frac{1}{n+1}$。',
        '左边 $=\\left(\\frac1x-\\frac{1}{x+1}\\right)+\\left(\\frac{1}{x+1}-\\frac{1}{x+2}\\right)+\\cdots+\\left(\\frac{1}{x+2025}-\\frac{1}{x+2026}\\right)=\\frac1x-\\frac{1}{x+2026}=\\frac{2026}{x(x+2026)}$。',
        '方程变为 $\\frac{2026}{x(x+2026)}=\\frac2x$，两边同乘 $x(x+2026)$：$2026=2(x+2026)$，$x=-1013$。',
        '验根要看**原方程的所有分母**，不能只看化简后的 $x(x+2026)$：原方程有分母 $x+1013$（第 $1013$、$1014$ 项里），$x=-1013$ 时它等于 $0$，所以 $x=-1013$ 是增根，原方程无解。',
        '常见错误：只代入化简后的分母检验，以为 $x=-1013$ 是解。',
      ],
      verify: () => {
        const lhs = x => {
          let s = F(0);
          for (let k = 0; k <= 2025; k++) s = s.add(F(1).div(x.add(k).mul(x.add(k + 1))));
          return s;
        };
        // 远离分母零点时 (左边 − 2/x)·x(x+2026) 是一次式
        const r = root133(x => lhs(x).sub(F(2).div(x)), x => x.mul(x.add(2026)));
        if (!(r instanceof Frac)) return null;
        let bad = false;
        for (let k = 0; k <= 2026; k++) if (r.add(k).isZero()) bad = true;
        return bad ? '无解' : 'x=' + r;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '13.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '解方程：$\\frac{x+1}{x+2}+\\frac{x+6}{x+7}=\\frac{x+2}{x+3}+\\frac{x+5}{x+6}$。',
      blanks: [
        { kind: 'num', label: '$x=$', answer: '-9/2' },
      ],
      explain: [
        '思路：四个分母相乘去分母，会得到很高次的方程，解不下去。先观察每个分式：分子都比分母小 $1$，可以**分离出整数**：$\\frac{x+1}{x+2}=1-\\frac{1}{x+2}$。',
        '同样 $\\frac{x+6}{x+7}=1-\\frac{1}{x+7}$，$\\frac{x+2}{x+3}=1-\\frac{1}{x+3}$，$\\frac{x+5}{x+6}=1-\\frac{1}{x+6}$。两边的 $2$ 抵消，变号后得：$\\frac{1}{x+2}+\\frac{1}{x+7}=\\frac{1}{x+3}+\\frac{1}{x+6}$。',
        '第二步：如果按原来的搭配，左边通分得 $\\frac{2x+9}{(x+2)(x+7)}$，右边也是 $\\frac{2x+9}{(x+3)(x+6)}$，还要讨论分子为 $0$。换一种搭配，**移项让分母相差 $1$ 的两个分式配成一对**：$\\frac{1}{x+2}-\\frac{1}{x+3}=\\frac{1}{x+6}-\\frac{1}{x+7}$。',
        '各自通分，分子都变成 $1$：$\\frac{1}{(x+2)(x+3)}=\\frac{1}{(x+6)(x+7)}$，所以 $(x+2)(x+3)=(x+6)(x+7)$。',
        '展开：$x^{2}+5x+6=x^{2}+13x+42$，二次项消掉，$-8x=36$，$x=-\\frac92$。',
        '检验：$x=-\\frac92$ 时四个分母分别为 $-\\frac52,-\\frac32,\\frac32,\\frac52$，都不为 $0$，所以原方程的解是 $x=-\\frac92$。',
      ],
      verify: () => {
        const f = x => x.add(1).div(x.add(2)).add(x.add(6).div(x.add(7))).sub(x.add(2).div(x.add(3))).sub(x.add(5).div(x.add(6)));
        // f·公分母 是高次式，不能用 root133；在 −20～20 内以 1/2 为步长找根，并确认 f 只有一个根（f 化简后为 −(2x+9)·8/(四个分母之积)·… 的形式）
        const roots = [];
        for (let k = -80; k <= 80; k++) {
          const x = F(k).div(4);
          if ([2, 7, 3, 6].some(c => x.add(c).isZero())) continue;
          if (f(x).isZero()) roots.push(x);
        }
        // 再用通分后的分子核对：(x+2)(x+3)·(x+6)(x+7)·f(x) 应当是 (2x+9) 的倍数
        const g = x => f(x).mul(x.add(2)).mul(x.add(3)).mul(x.add(6)).mul(x.add(7));
        const ratio = [F(1), F(5), F(-1)].map(x => g(x).div(x.mul(2).add(9)));
        return roots.length === 1 && ratio.every(r => r.eq(ratio[0])) ? roots[0] : null;
      },
    },
    {
      id: '13.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '甲、乙两人沿同一条路从 $A$ 地去相距 $18$ km 的 $B$ 地。甲步行先出发 $1$ 小时，乙才骑车出发，乙的速度是甲的 $3$ 倍，乙到达 $B$ 地时，甲离 $B$ 地还有 $6$ km。(1) 求甲的速度；(2) 乙到达 $B$ 地后立即按原速返回 $A$ 地。从乙出发到甲到达 $B$ 地为止，乙出发后多少小时两人相距 $2$ km？（有几个就填几个，用逗号隔开）',
      blanks: [
        { kind: 'num', label: '(1) 甲的速度（km/h）', answer: '6' },
        { kind: 'nums', label: '(2) 乙出发后（小时）', answer: ['1/3', '2/3', '7/6', '4/3'] },
      ],
      explain: [
        '(1) 设甲的速度为 $x$ km/h，乙为 $3x$ km/h。乙到 $B$ 地用时 $\\frac{18}{3x}=\\frac6x$ 小时，这时甲走了 $12$ km，用时 $\\frac{12}{x}$ 小时，比乙多走 $1$ 小时：$\\frac{12}{x}-\\frac{6}{x}=1$，$x=6$，经检验符合题意。甲 $6$ km/h，乙 $18$ km/h。',
        '(2) 设乙出发后 $t$ 小时。甲离 $A$ 地 $(6+6t)$ km，甲共走 $3$ 小时，所以 $0<t\\le2$。乙 $1$ 小时到 $B$：$t\\le1$ 时乙离 $A$ 地 $18t$ km；$t>1$ 时乙返回，离 $A$ 地 $18-18(t-1)=36-18t$ km。',
        '去程分两段：乙追上甲之前 $(6+6t)-18t=2$，$t=\\frac13$；追上之后 $18t-(6+6t)=2$，$t=\\frac23$。',
        '返程：两人相向而行，相遇时 $36-18t=6+6t$，$t=\\frac54$。相遇前 $(36-18t)-(6+6t)=2$，$t=\\frac76$；相遇后 $(6+6t)-(36-18t)=2$，$t=\\frac43$。都在 $1<t\\le2$ 内，符合。',
        '所以 $t=\\frac13$、$\\frac23$、$\\frac76$ 或 $\\frac43$。常见错误：漏掉返程相遇前后的两种情况；或者忘了甲先走的 $6$ km。',
      ],
      verify: () => {
        const r = root133(x => F(12).div(x).sub(F(18).div(x.mul(3))).sub(1), x => x);
        if (!(r instanceof Frac)) return null;
        const v = r;
        const w = v.mul(3);
        const tB = F(18).div(w);
        const gap = t => {
          const a = v.add(v.mul(t));
          const b = t.cmp(tB) <= 0 ? w.mul(t) : F(18).sub(w.mul(t.sub(tB)));
          return a.sub(b).abs();
        };
        const ts = [];
        for (let k = 1; F(k).div(120).cmp(F(18).div(v).sub(1)) <= 0; k++) {
          const t = F(k).div(120);
          if (gap(t).eq(F(2))) ts.push(t);
        }
        return [v, ts];
      },
    },
    {
      id: '13.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $\\frac{xy}{x+y}=2$，$\\frac{yz}{y+z}=3$，$\\frac{zx}{z+x}=4$。求：(1) $\\frac{xyz}{xy+yz+zx}$ 的值；(2) $x$、$y$、$z$ 的值。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '24/13' },
        { kind: 'num', label: '(2) $x=$', answer: '24/5' },
        { kind: 'num', label: '$y=$', answer: '24/7' },
        { kind: 'num', label: '$z=$', answer: '24' },
      ],
      explain: [
        '思路：三个都是分式方程，直接去分母会出现 $xy$、$yz$ 这样的乘积项，不是一次方程。由条件知 $x$、$y$、$z$ 都不为 $0$（否则左边为 $0$），可以**取倒数**。',
        '$\\frac{x+y}{xy}=\\frac12$，即 $\\frac1x+\\frac1y=\\frac12$；同理 $\\frac1y+\\frac1z=\\frac13$，$\\frac1z+\\frac1x=\\frac14$。',
        '把 $\\frac1x$、$\\frac1y$、$\\frac1z$ 看成三个未知数，这是三元一次方程组。三式相加：$2\\left(\\frac1x+\\frac1y+\\frac1z\\right)=\\frac{13}{12}$，$\\frac1x+\\frac1y+\\frac1z=\\frac{13}{24}$。',
        '(1) 所求式也取倒数：$\\frac{xy+yz+zx}{xyz}=\\frac1z+\\frac1x+\\frac1y=\\frac{13}{24}$，所以原式 $=\\frac{24}{13}$。',
        '(2) 分别减去三个式子：$\\frac1x=\\frac{13}{24}-\\frac13=\\frac{5}{24}$，$\\frac1y=\\frac{13}{24}-\\frac14=\\frac{7}{24}$，$\\frac1z=\\frac{13}{24}-\\frac12=\\frac{1}{24}$。',
        '所以 $x=\\frac{24}{5}$，$y=\\frac{24}{7}$，$z=24$。检验：$x+y$、$y+z$、$z+x$ 都不为 $0$，代回三个条件都成立。',
      ],
      verify: () => {
        // 解关于 p=1/x、q=1/y、r=1/z 的方程组（消元），再代回原条件检验
        const s = F('1/2').add('1/3').add('1/4').div(2);
        const p = s.sub('1/3');
        const q = s.sub('1/4');
        const r = s.sub('1/2');
        const x = F(1).div(p);
        const y = F(1).div(q);
        const z = F(1).div(r);
        const ok = x.mul(y).div(x.add(y)).eq(2) && y.mul(z).div(y.add(z)).eq(3) && z.mul(x).div(z.add(x)).eq(4);
        return ok ? [x.mul(y).mul(z).div(x.mul(y).add(y.mul(z)).add(z.mul(x))), x, y, z] : null;
      },
    },
    {
      id: '13.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '阅读：可以验证，关于 $x$ 的方程 $x+\\frac{k}{x}=c+\\frac{k}{c}$（$k$、$c$ 是不为 $0$ 的常数）的解是 $x_{1}=c$，$x_{2}=\\frac{k}{c}$。利用这个结论解方程：(1) $x+\\frac{12}{x-2}=9$；(2) $\\frac{x^{2}+2x+6}{x+1}=\\frac{14}{3}$。（每小题有几个解就填几个，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $x=$', answer: ['5', '6'] },
        { kind: 'nums', label: '(2) $x=$', answer: ['2', '2/3'] },
      ],
      explain: [
        '思路：去分母会得到含 $x^{2}$ 的方程，我们还不会解。要把方程**凑成阅读材料的样子**：左边是“某个式子 $+\\frac{k}{\\text{这个式子}}$”。',
        '(1) 分母是 $x-2$，左边也要出现 $x-2$：两边减 $2$，得 $(x-2)+\\frac{12}{x-2}=7$。',
        '把 $x-2$ 看成整体，$k=12$，还要把 $7$ 写成 $c+\\frac{12}{c}$：$7=3+\\frac{12}{3}$，$c=3$。所以 $x-2=3$ 或 $x-2=\\frac{12}{3}=4$，$x=5$ 或 $x=6$。',
        '(2) 分子要凑出分母 $x+1$：$x^{2}+2x+6=(x+1)^{2}+5$，所以左边 $=(x+1)+\\frac{5}{x+1}$。',
        '$\\frac{14}{3}=3+\\frac53=c+\\frac{5}{c}$，$c=3$。所以 $x+1=3$ 或 $x+1=\\frac53$，$x=2$ 或 $x=\\frac23$。',
        '检验：四个值都不使分母为 $0$，代回原方程都成立。易错：(1) 不先减 $2$，直接套成 $c=9$；(2) 写成 $c=\\frac{14}{3}$ 而凑不出 $\\frac{k}{c}$。',
      ],
      verify: () => {
        const f1 = x => x.add(F(12).div(x.sub(2))).sub(9);
        const f2 = x => x.pow(2).add(x.mul(2)).add(6).div(x.add(1)).sub('14/3');
        const find = (f, bad) => {
          const xs = [];
          for (let k = -240; k <= 240; k++) {
            const x = F(k).div(6);
            if (x.eq(bad)) continue;
            if (f(x).isZero()) xs.push(x);
          }
          return xs;
        };
        return [find(f1, F(2)), find(f2, F(-1))];
      },
    },
    {
      id: '13.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '若关于 $x$ 的方程 $\\dfrac{1}{1+\\dfrac{1}{1+\\dfrac{1}{x}}}=a$ 无解，求 $a$ 的值（全部填出，用逗号隔开）。',
      blanks: [
        { kind: 'nums', label: '$a=$', answer: ['0', '1/2', '1'] },
      ],
      explain: [
        '第一步：逐层化简左边，同时记下每一层要求不为 $0$ 的分母。',
        '最里层 $\\frac1x$：$x\\ne0$。$1+\\frac1x=\\frac{x+1}{x}$，它作分母，要求 $x+1\\ne0$，即 $x\\ne-1$；它的倒数是 $\\frac{x}{x+1}$。',
        '$1+\\frac{x}{x+1}=\\frac{2x+1}{x+1}$，它作分母，要求 $2x+1\\ne0$，即 $x\\ne-\\frac12$；左边 $=\\frac{x+1}{2x+1}$。所以方程是 $\\frac{x+1}{2x+1}=a$，且 $x\\ne0,-1,-\\frac12$。',
        '第二步：去分母 $x+1=a(2x+1)$，整理得 $(1-2a)x=a-1$。无解分两种情况：',
        '① 整式方程无解：$1-2a=0$ 且 $a-1\\ne0$，$a=\\frac12$。',
        '② 解恰好是被排除的值：$x=0$ 时 $a-1=0$，$a=1$；$x=-1$ 时 $-(1-2a)=a-1$，$a=0$；$x=-\\frac12$ 时 $-\\frac12(1-2a)=a-1$，即 $-\\frac12=-1$，不可能。',
        '所以 $a=0$、$\\frac12$ 或 $1$。关键：化简成 $\\frac{x+1}{2x+1}$ 后，$x\\ne0$、$x\\ne-1$ 这两个限制从式子上看不出来了，最容易漏掉 $a=1$ 和 $a=0$。',
      ],
      verify: () => {
        const lhs = x => F(1).div(F(1).add(F(1).div(F(1).add(F(1).div(x)))));
        const bad = x => x.isZero() || x.add(1).isZero() || x.mul(2).add(1).isZero();
        // 远离分母零点时 (左边 − a)·(2x+1) 是一次式，用 root133 求根，再看根是否落在原方程不允许的值上
        const res = [];
        for (let k = -8; k <= 8; k++) {
          const a = F(k).div(2);
          const r = root133(x => lhs(x).sub(a), x => x.mul(2).add(1));
          const has = r instanceof Frac && !bad(r) && lhs(r).eq(a);
          if (!has) res.push(a);
        }
        return res;
      },
    },
  ],
});
