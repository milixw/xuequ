'use strict';

// 上海数学七年级上册 · 11.3 整式的除法
// 知识范围：同底数幂的除法 a^m÷a^n=a^(m−n)（m、n 是正整数且 m>n，a≠0）；规定 a^0=1（a≠0）；
//   单项式除以单项式（系数、同底数幂分别相除）；整式除以单项式（每一项分别除，再相加）；除法是乘法的逆运算
// 可以使用：第 11 章全部内容（幂的运算、整式乘法、乘法公式）；第 10 章；六年级上下册全部内容
// 还没学：整式除以整式（长除法只在阅读材料里，题目里用“设另一个整式再相乘比较系数”代替）；因式分解（第 12 章）；
//   分式（第 13 章）；负整数指数（13.2）；科学记数法（八年级上册）；开平方（八年级上册）；不等式（七年级下册）
// 本节约定：做除法时默认除式不为 0；指数是正整数或 0

// verify 用：整式除以单项式，逐项减指数（某项不够减时返回 null）
function div113(p, m) {
  const [[mk, mc]] = [...Poly.of(m).terms];
  const pw = k => Object.fromEntries([...k.matchAll(/([a-z])(\d+)/g)].map(([, v, e]) => [v, Number(e)]));
  const mp = pw(mk);
  let r = Poly.num(0);
  for (const [k, c] of Poly.lift(p).terms) {
    const tp = pw(k);
    for (const v of Object.keys(mp)) {
      tp[v] = (tp[v] || 0) - mp[v];
      if (tp[v] < 0) return null;
    }
    const mono = Object.entries(tp).filter(([, e]) => e > 0).map(([v, e]) => `${v}^${e}`).join('*');
    r = r.add(Poly.of(`(${c})${mono ? '*' + mono : ''}`));
  }
  return r.scale(F(1).div(mc));
}

Content.section({
  id: 'math/sh2024/g7s1/11.3',
  title: '整式的除法',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 3, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核三轮，答案全部一致。第 1 轮挑战档没有一道高于压轴：c03 与 e03 同情境、c04（比较大数分数）与本节无关、c05 数据能猜出 a、b，扩展档缺 5 级，卡片 (−5)^6÷(−5)^4 与 b02 同结构；第 2 轮原 c03 下放为 e03，c03 换成整式除以单项式的次数分类，c02 加 4^j 分类计数，c05 换数据，c01、c04 仍被判 4～5 级；第 3 轮 c01 改除式含参 (x−1)(x−k) 枚举约数、c04 改指数未知并按正负选组、e06(2) 让底数为 −1 时要判断奇偶后判定整节通过。可选意见未处理：e01 偏易' },

  intro: [
    {
      title: '同底数幂的除法',
      body: '$a^{m}\\div a^{n}$ 是 $m$ 个 $a$ 相乘再除以 $n$ 个 $a$ 相乘，约掉 $n$ 个，剩下 $m-n$ 个：$a^{m}\\div a^{n}=a^{m-n}$（$a\\ne0$，$m>n$）。**底数不变，指数相减。**',
      example: '$a^{7}\\div a^{3}=a^{4}$；$(-5)^{7}\\div(-5)^{4}=(-5)^{3}=-125$。',
      pitfall: '指数是相减，不是相除；底数是负数或式子时，先统一底数再算。',
    },
    {
      title: '零指数幂',
      body: '$a^{m}\\div a^{m}$ 一方面等于 $1$，另一方面按法则是 $a^{0}$。为了让法则在 $m=n$ 时也成立，规定 $a^{0}=1$（$a\\ne0$）：任何不等于零的数的零次幂都等于 $1$。',
      example: '$2025^{0}=1$；$(\\pi-3)^{0}=1$。',
      pitfall: '底数不能是 $0$，$0^{0}$ 没有意义。底数是一个式子时，要先保证这个式子不等于 $0$。',
    },
    {
      title: '单项式除以单项式',
      body: '把系数、同底数幂分别相除；只在被除式里出现的字母，连同它的指数照抄，作为商的因式。先定符号最不容易错。',
      example: '$15x^{4}y^{3}\\div5x^{2}y=(15\\div5)\\cdot x^{4-2}\\cdot y^{3-1}=3x^{2}y^{2}$。',
    },
    {
      title: '整式除以单项式',
      body: '用整式的**每一项**分别除以这个单项式，再把所得的商相加。项数不会变少：某一项和除式完全相同时，商是 $1$，不是 $0$，不能漏掉。',
      example: '$(8m^{3}-4m^{2})\\div4m=8m^{3}\\div4m-4m^{2}\\div4m=2m^{2}-m$。',
    },
    {
      title: '除法和乘法互逆',
      body: '商 $\\times$ 除式 $=$ 被除式。算完除法可以用乘法检验；知道商和除式，也可以用乘法反求被除式。',
      example: '若 $M\\div2x=3x-1$，则 $M=(3x-1)\\cdot2x=6x^{2}-2x$。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '11.3-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列计算正确的是（　　）',
      options: ['$a^{6}\\div a^{2}=a^{3}$', '$(-a)^{5}\\div(-a)^{3}=-a^{2}$', '$x^{8}\\div x^{4}\\cdot x^{2}=x^{2}$', '$-3^{0}=-1$'],
      answer: 3,
      explain: [
        'A：指数相减，$a^{6}\\div a^{2}=a^{4}$。',
        'B：$(-a)^{5}\\div(-a)^{3}=(-a)^{2}=a^{2}$，偶次方是正的。',
        'C：乘除同级，从左往右算：$x^{8}\\div x^{4}=x^{4}$，再乘 $x^{2}$ 得 $x^{6}$。先算 $x^{4}\\cdot x^{2}$ 才会得到 $x^{2}$。',
        'D：$-3^{0}$ 的底数是 $3$，负号在幂的外面：$-3^{0}=-(3^{0})=-1$，正确。选 D。',
      ],
      verify: () => {
        // 在几个具体值下检验每个等式两边
        const sides = [
          [a => a.pow(6).div(a.pow(2)), a => a.pow(3)],
          [a => a.neg().pow(5).div(a.neg().pow(3)), a => a.pow(2).neg()],
          [x => x.pow(8).div(x.pow(4)).mul(x.pow(2)), x => x.pow(2)],
          [() => F(3).pow(0).neg(), () => F(-1)],
        ];
        return sides.findIndex(([l, r]) => [F(2), F(-3), F('1/2')].every(v => l(v).eq(r(v))));
      },
    },
    {
      id: '11.3-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$\\left(-\\frac{1}{2}\\right)^{0}+(-3)^{5}\\div(-3)^{3}-2^{2}$。',
      blanks: [
        { kind: 'num', label: '结果是', answer: '6' },
      ],
      explain: [
        '$\\left(-\\frac12\\right)^{0}=1$：底数不是 $0$，零次幂就是 $1$，和底数的正负无关。',
        '$(-3)^{5}\\div(-3)^{3}=(-3)^{2}=9$。',
        '原式 $=1+9-4=6$。常见错误：把零次幂当成 $0$，或者把 $(-3)^{2}$ 算成 $-9$。',
      ],
      verify: () => F('-1/2').pow(0).add(F(-3).pow(5).div(F(-3).pow(3))).sub(F(2).pow(2)),
    },
    {
      id: '11.3-b03',
      level: 'basic',
      type: 'fill',
      stem: '把 $(x-y)^{7}\\div(y-x)^{3}\\div(x-y)^{2}$ 写成 $k(x-y)^{n}$ 的形式，其中 $k$ 是数，$n$ 是正整数。',
      blanks: [
        { kind: 'num', label: '$k=$', answer: '-1' },
        { kind: 'num', label: '$n=$', answer: '2' },
      ],
      explain: [
        '先统一底数：$(y-x)^{3}=[-(x-y)]^{3}=-(x-y)^{3}$，奇次方变号。',
        '原式 $=(x-y)^{7}\\div[-(x-y)^{3}]\\div(x-y)^{2}=-(x-y)^{7-3-2}=-(x-y)^{2}$。',
        '所以 $k=-1$，$n=2$。常见错误：忘了变号得 $k=1$；或者从右往左算，先算 $(y-x)^{3}\\div(x-y)^{2}$。',
      ],
      verify: () => {
        // 令 t = x − y 取几个值，找 k、n
        const ts = [F(2), F(-3), F('1/3')];
        const val = t => t.pow(7).div(t.neg().pow(3)).div(t.pow(2));
        for (const k of [1, -1]) {
          for (let n = 1; n <= 7; n++) if (ts.every(t => val(t).eq(t.pow(n).mul(k)))) return [k, n];
        }
        return null;
      },
    },
    {
      id: '11.3-b04',
      level: 'basic',
      type: 'fill',
      stem: '计算：$-12a^{5}b^{3}c\\div(-3a^{2}b)$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '4a^3b^2c', simplified: true },
      ],
      explain: [
        '系数：$-12\\div(-3)=4$，负负得正。',
        '同底数幂：$a^{5}\\div a^{2}=a^{3}$，$b^{3}\\div b=b^{2}$。',
        '$c$ 只在被除式里有，照抄。结果 $4a^{3}b^{2}c$。常见错误是把 $c$ 丢掉，或者符号写成负的。',
      ],
      verify: () => String(div113('-12a^5b^3c', '-3a^2b')),
    },
    {
      id: '11.3-b05',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(-2x^{2}y)^{3}\\cdot3xy^{2}\\div(-6x^{5}y^{3})$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '4x^2y^2', simplified: true },
      ],
      explain: [
        '先算乘方：$(-2x^{2}y)^{3}=-8x^{6}y^{3}$。',
        '乘除同级，从左往右：$-8x^{6}y^{3}\\cdot3xy^{2}=-24x^{7}y^{5}$。',
        '再除：$-24x^{7}y^{5}\\div(-6x^{5}y^{3})=4x^{2}y^{2}$。',
        '常见错误是先算 $3xy^{2}\\div(-6x^{5}y^{3})$，这一步除不尽，说明顺序错了。',
      ],
      verify: () => String(div113(Poly.of('(-2x^2y)^3*3x*y^2'), '-6x^5y^3')),
    },
    {
      id: '11.3-b06',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(6a^{3}b^{2}-9a^{2}b^{3}+3a^{2}b)\\div(-3a^{2}b)$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '-2a*b+3b^2-1', simplified: true },
      ],
      explain: [
        '每一项分别除以 $-3a^{2}b$，符号跟着除式一起算：',
        '$6a^{3}b^{2}\\div(-3a^{2}b)=-2ab$；$-9a^{2}b^{3}\\div(-3a^{2}b)=3b^{2}$；$3a^{2}b\\div(-3a^{2}b)=-1$。',
        '结果 $-2ab+3b^{2}-1$。常见错误：最后一项漏掉（以为是 $0$），或者写成 $+1$。',
      ],
      verify: () => String(div113('6a^3b^2-9a^2b^3+3a^2b', '-3a^2b')),
    },
    {
      id: '11.3-b07',
      level: 'basic',
      type: 'fill',
      stem: '已知 $a^{m}=6$，$a^{n}=3$（$a>1$），求 $a^{m-n}$ 和 $a^{2m-3n}$ 的值。',
      blanks: [
        { kind: 'num', label: '$a^{m-n}=$', answer: '2' },
        { kind: 'num', label: '$a^{2m-3n}=$', answer: '4/3' },
      ],
      explain: [
        '把同底数幂的除法倒过来用：$a^{m-n}=a^{m}\\div a^{n}=6\\div3=2$。常见错误是写成 $6-3=3$。',
        '$a^{2m-3n}=a^{2m}\\div a^{3n}=(a^{m})^{2}\\div(a^{n})^{3}=36\\div27=\\frac43$。',
      ],
      verify: () => [F(6).div(3), F(6).pow(2).div(F(3).pow(3))],
    },
    {
      id: '11.3-b08',
      level: 'basic',
      type: 'fill',
      stem: '要使 $(2x-6)^{0}+(x+1)^{0}$ 有意义，$x$ 不能取哪些值？（全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '$x$ 不能取', answer: ['3', '-1'] },
      ],
      explain: [
        '零次幂的底数不能是 $0$，两个底数都要考虑。',
        '$2x-6\\ne0$，所以 $x\\ne3$；$x+1\\ne0$，所以 $x\\ne-1$。',
        '$x$ 不能取 $3$ 和 $-1$。只考虑一个会漏掉另一个。',
      ],
      verify: () => {
        const bad = [];
        for (let i = -40; i <= 40; i++) {
          const x = F(i).div(4);
          if (x.mul(2).sub(6).isZero() || x.add(1).isZero()) bad.push(x);
        }
        return bad;
      },
    },
    {
      id: '11.3-b09',
      level: 'basic',
      type: 'fill',
      stem: '先化简，再求值：$[(x+2y)^{2}-(x+y)(x-y)-5y^{2}]\\div2x$，其中 $x=-2$，$y=\\frac{1}{2}$。',
      blanks: [
        { kind: 'expr', label: '(1) 化简结果是', answer: '2y', simplified: true },
        { kind: 'num', label: '(2) 求值结果是', answer: '1' },
      ],
      explain: [
        '中括号里：$(x+2y)^{2}=x^{2}+4xy+4y^{2}$，$(x+y)(x-y)=x^{2}-y^{2}$。',
        '$x^{2}+4xy+4y^{2}-(x^{2}-y^{2})-5y^{2}=x^{2}+4xy+4y^{2}-x^{2}+y^{2}-5y^{2}=4xy$。',
        '$4xy\\div2x=2y$。代入 $y=\\frac12$，值是 $1$，和 $x$ 取多少没有关系。',
        '常见错误：去括号时 $-y^{2}$ 没有变号，中括号里多出 $-2y^{2}$，后面就除不干净了。',
      ],
      verify: () => {
        const q = div113(Poly.of('(x+2y)^2-(x+y)(x-y)-5y^2'), '2x');
        return [String(q), q.at({ x: F(-2), y: F('1/2') })];
      },
    },

    // ---------- 扩展 ----------
    {
      id: '11.3-e01',
      level: 'extended',
      type: 'fill',
      stem: '(1) 已知 $2^{x+3}\\cdot3^{x+3}=36^{x-2}$，求 $x$；(2) 已知 $27^{m}\\div9^{m}\\div3=3^{8}$，求 $m$。',
      blanks: [
        { kind: 'num', label: '(1) $x=$', answer: '7' },
        { kind: 'num', label: '(2) $m=$', answer: '9' },
      ],
      explain: [
        '思路：两边化成同一个底数的幂，指数就相等。',
        '(1) 左边用积的乘方倒过来：$2^{x+3}\\cdot3^{x+3}=6^{x+3}$；右边 $36^{x-2}=(6^{2})^{x-2}=6^{2x-4}$。',
        '$x+3=2x-4$，$x=7$。',
        '(2) $27^{m}=3^{3m}$，$9^{m}=3^{2m}$，左边 $=3^{3m-2m-1}=3^{m-1}$。',
        '$m-1=8$，$m=9$。常见错误是漏掉“$\\div3$”，得 $m=8$。',
      ],
      verify: () => {
        let x = null;
        let m = null;
        for (let k = 3; k <= 30; k++) {
          if (2n ** BigInt(k + 3) * 3n ** BigInt(k + 3) === 36n ** BigInt(k - 2)) x = k;
          if (27n ** BigInt(k) === 9n ** BigInt(k) * 3n * 3n ** 8n) m = k;
        }
        return [x, m];
      },
    },
    {
      id: '11.3-e02',
      level: 'extended',
      type: 'fill',
      stem: '小明计算一个整式除以 $-2a$ 时，错看成乘以 $-2a$，得到的结果是 $8a^{4}b-4a^{3}+2a^{2}$。这个整式是多少？正确的结果是多少？',
      blanks: [
        { kind: 'expr', label: '这个整式是', answer: '-4a^3b+2a^2-a', simplified: true },
        { kind: 'expr', label: '正确结果是', answer: '2a^2b-a+1/2', simplified: true },
      ],
      explain: [
        '先反求原来的整式：它乘 $-2a$ 得到 $8a^{4}b-4a^{3}+2a^{2}$，所以它等于 $(8a^{4}b-4a^{3}+2a^{2})\\div(-2a)=-4a^{3}b+2a^{2}-a$。',
        '再按正确的算法除以 $-2a$：$-4a^{3}b\\div(-2a)=2a^{2}b$，$2a^{2}\\div(-2a)=-a$，$-a\\div(-2a)=\\frac12$。',
        '正确结果是 $2a^{2}b-a+\\frac12$。',
        '易错：反求时把“乘”当成“除”反过来，又乘了一次 $-2a$；最后一项 $\\frac12$ 的符号也容易弄错。',
      ],
      verify: () => {
        const M = div113('8a^4b-4a^3+2a^2', '-2a');
        return [String(M), String(div113(M, '-2a'))];
      },
    },
    {
      id: '11.3-e03',
      level: 'extended',
      type: 'fill',
      stem: '一个长方形的面积是 $2x^{3}-8x^{2}+14x$（$x>0$），一边长是 $2x$。(1) 用含 $x$ 的式子表示另一边的长；(2) 另一边最短是多少？(3) 这个长方形的周长最小是多少？此时 $x$ 是多少？',
      blanks: [
        { kind: 'expr', label: '(1) 另一边长', answer: 'x^2-4x+7', simplified: true },
        { kind: 'num', label: '(2) 另一边最短是', answer: '3' },
        { kind: 'num', label: '(3) 周长最小是', answer: '12' },
        { kind: 'num', label: '此时 $x=$', answer: '1' },
      ],
      explain: [
        '(1) 另一边 $=(2x^{3}-8x^{2}+14x)\\div2x=x^{2}-4x+7$。',
        '(2) 凑成完全平方：$x^{2}-4x+7=(x-2)^{2}+3$，$x=2$ 时最短，是 $3$。',
        '(3) 周长 $=2(2x+x^{2}-4x+7)=2x^{2}-4x+14=2(x^{2}-2x)+14=2(x-1)^{2}+12$。',
        '$x=1$ 时周长最小，是 $12$。此时两边分别是 $2$ 和 $4$。',
        '关键：周长最小时 $x=1$，并不是另一边最短的 $x=2$（$x=2$ 时周长是 $14$）。直接用“另一边最短”去算周长会出错。',
      ],
      verify: () => {
        const other = div113('2x^3-8x^2+14x', '2x');
        const per = other.add(Poly.of('2x')).scale(2);
        let minO = null;
        let minP = null;
        let at = null;
        for (let i = 1; i <= 800; i++) {
          const x = F(i).div(100);
          const o = other.at({ x });
          const p = per.at({ x });
          if (!minO || o.cmp(minO) < 0) minO = o;
          if (!minP || p.cmp(minP) < 0) { minP = p; at = x; }
        }
        return [String(other), minO, minP, at];
      },
    },
    {
      id: '11.3-e04',
      level: 'extended',
      type: 'fill',
      stem: '已知 $x^{2}-2x=1$，求 $(2x^{5}-4x^{4}-2x^{3})\\div2x^{3}+x(x-2)$ 的值。',
      blanks: [
        { kind: 'num', label: '值是', answer: '1' },
      ],
      explain: [
        '$x$ 的值不好求，先化简，看能不能凑出 $x^{2}-2x$。',
        '$(2x^{5}-4x^{4}-2x^{3})\\div2x^{3}=x^{2}-2x-1$；$x(x-2)=x^{2}-2x$。',
        '原式 $=x^{2}-2x-1+x^{2}-2x=2(x^{2}-2x)-1$。',
        '整体代入：$2\\times1-1=1$。',
      ],
      verify: () => {
        const q = div113('2x^5-4x^4-2x^3', '2x^3').add(Poly.of('x(x-2)'));
        const rest = q.sub(Poly.of('x^2-2x').scale(2));
        return rest.deg() === 0 ? rest.at({}).add(2) : null;
      },
    },
    {
      id: '11.3-e05',
      level: 'extended',
      type: 'fill',
      stem: '已知 $M=(2x^{3}y-4x^{2}y^{2}+axy^{3})\\div2xy$，$N=(x-3y)(x+by)$。若 $M-N$ 的值与 $x$ 无关，且当 $y=2$ 时 $M-N=2$，求 $a$、$b$。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '-5' },
        { kind: 'num', label: '$b=$', answer: '1' },
      ],
      explain: [
        '$M=x^{2}-2xy+\\frac a2y^{2}$；$N=x^{2}+bxy-3xy-3by^{2}=x^{2}+(b-3)xy-3by^{2}$。',
        '$M-N=(-2-b+3)xy+\\left(\\frac a2+3b\\right)y^{2}=(1-b)xy+\\left(\\frac a2+3b\\right)y^{2}$，$x^{2}$ 已经抵消。',
        '与 $x$ 无关，含 $x$ 的项系数为 $0$：$1-b=0$，$b=1$。',
        '此时 $M-N=\\left(\\frac a2+3\\right)y^{2}$，$y=2$ 时 $4\\left(\\frac a2+3\\right)=2$，$\\frac a2+3=\\frac12$，$a=-5$。',
        '易错：$N$ 展开时漏掉 $-3xy$，得 $b=-2$。',
      ],
      verify: () => {
        for (let a = -10; a <= 10; a++) {
          for (let b = -10; b <= 10; b++) {
            const M = div113(Poly.of('2x^3y-4x^2y^2').add(Poly.of('x*y^3').scale(a)), '2x*y');
            const N = Poly.of('x-3y').mul(Poly.of('x').add(Poly.of('y').scale(b)));
            const D = M.sub(N);
            if (D.degIn('x') === 0 && D.at({ y: F(2) }).eq(F(2))) return [a, b];
          }
        }
        return null;
      },
    },
    {
      id: '11.3-e06',
      level: 'extended',
      type: 'fill',
      stem: '还没学负整数指数，本题只考虑指数不是负数的情况。(1) 整数 $n$ 满足 $(n^{2}-n-1)^{n+2}=1$，求 $n$ 的所有可能值；(2) 整数 $x$ 满足 $(2x-3)^{x+3}=(2x-3)^{3x-1}$，求 $x$ 的所有可能值。（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $n=$', answer: ['-2', '-1', '0', '2'] },
        { kind: 'nums', label: '(2) $x=$', answer: ['1', '2'] },
      ],
      explain: [
        '(1) 幂等于 $1$ 有三种情况：指数是 $0$ 而底数不是 $0$；底数是 $1$；底数是 $-1$ 而指数是偶数。',
        '指数为 $0$：$n=-2$，底数 $4+2-1=5\\ne0$，成立。底数为 $1$：$n(n-1)=2$，相邻两个整数的积是 $2$，$n=2$ 或 $-1$，成立。',
        '底数为 $-1$：$n(n-1)=0$，$n=0$ 或 $1$。$n=0$ 时指数 $2$ 是偶数，成立；$n=1$ 时指数 $3$ 是奇数，舍去。所以 $n=-2,-1,0,2$。',
        '(2) 两个同底数的幂相等，不一定指数相等，也要分情况。先看范围：指数 $3x-1\\ge0$，整数 $x\\ge1$。',
        '指数相等：$x+3=3x-1$，$x=2$，成立（这时底数正好是 $1$）。',
        '底数为 $-1$：$x=1$，两个指数是 $4$ 和 $2$，都是偶数，两边都等于 $1$，成立。底数为 $0$：$x=\\frac32$ 不是整数。',
        '所以 $x=1$ 或 $2$。只用“指数相等”会漏掉 $x=1$；看到底数是 $-1$ 就舍去也会漏掉，要看两个指数的奇偶。',
      ],
      verify: () => {
        const ns = [];
        for (let n = -2; n <= 30; n++) {
          const b = F(n * n - n - 1);
          const e = n + 2;
          if (e === 0 ? !b.isZero() : b.pow(e).eq(F(1))) ns.push(n);
        }
        const xs = [];
        for (let x = -20; x <= 20; x++) {
          const e1 = x + 3;
          const e2 = 3 * x - 1;
          if (e1 < 0 || e2 < 0) continue;
          const b = F(2 * x - 3);
          if (b.isZero() && (e1 === 0 || e2 === 0)) continue;
          if (b.pow(e1).eq(b.pow(e2))) xs.push(x);
        }
        return [ns, xs];
      },
    },

    // ---------- 挑战 ----------
    {
      id: '11.3-c01',
      level: 'challenge',
      type: 'fill',
      stem: '$k$ 是整数，整式 $x^{4}+mx^{3}+nx-16$ 等于 $(x-1)(x-k)$ 与另一个整式的积，这个整式是二次的，二次项系数是 $1$，各项系数都是整数。(1) $k$ 的所有可能值；(2) $m$ 的所有可能值。（都全部填出，用逗号隔开）',
      blanks: [
        { kind: 'nums', label: '(1) $k=$', answer: ['2', '-2', '4', '-4', '-16'] },
        { kind: 'nums', label: '(2) $m=$', answer: ['-5', '3', '16'] },
      ],
      explain: [
        '整式除以整式还没学，把除法变成乘法：设另一个整式是 $x^{2}+px+q$（$p$、$q$ 是整数）。',
        '$(x-1)(x-k)=x^{2}-(1+k)x+k$，展开 $[x^{2}-(1+k)x+k](x^{2}+px+q)$，各项系数是：$x^{3}$：$p-(1+k)$；$x^{2}$：$q-(1+k)p+k$；$x$：$kp-(1+k)q$；常数：$kq$。',
        '和原式比较：常数项 $kq=-16$，所以 $k$ 是 $-16$ 的约数，$q=-\\frac{16}{k}$；原式没有 $x^{2}$ 项，$q+k=(1+k)p$，$p$ 要是整数。',
        '逐个试 $k=\\pm1,\\pm2,\\pm4,\\pm8,\\pm16$：$k=1$ 时 $p=-\\frac{15}{2}$ 不行；$k=-1$ 时要 $q+k=15=0$，不行；$k=2$：$q=-8$，$p=-2$；$k=-2$：$q=8$，$p=-6$；$k=4$：$q=-4$，$p=0$；$k=-4$：$q=4$，$p=0$；$k=\\pm8$、$k=16$ 时 $p$ 不是整数；$k=-16$：$q=1$，$p=1$。',
        '所以 $k=2,-2,4,-4,-16$。再算 $m=p-(1+k)$：$k=2$ 时 $m=-5$；$k=-2$ 时 $m=-6+1=-5$；$k=4$ 时 $m=-5$；$k=-4$ 时 $m=3$；$k=-16$ 时 $m=1+15=16$。',
        '前三个 $k$ 得到的是同一个整式 $x^{4}-5x^{3}+20x-16$：它等于 $(x-1)(x-2)(x+2)(x-4)$，$(x-1)$ 和其中任何一个配对都行。所以 $m$ 只有 $-5$、$3$、$16$ 三个值。',
        '易错：只想到正的约数；把 $k$ 的个数当成 $m$ 的个数；或者用“代入 $x=1$、$x=k$”的办法，$k=1$ 时两个方程相同，会误以为 $k=1$ 也行（比较系数时 $p=-\\frac{15}{2}$，不是整数）。',
      ],
      verify: () => {
        const ks = [];
        const ms = new Set();
        for (let k = -20; k <= 20; k++) {
          for (let p = -30; p <= 30; p++) {
            for (let q = -20; q <= 20; q++) {
              const prod = Poly.of('x-1').mul(Poly.of('x').add(-k)).mul(Poly.of('x^2').add(Poly.of('x').scale(p)).add(q));
              if (prod.coef('x^2').isZero() && prod.coef('').eq(F(-16))) {
                if (!ks.includes(k)) ks.push(k);
                ms.add(Number(prod.coef('x^3').n));
              }
            }
          }
        }
        return [ks, [...ms]];
      },
    },
    {
      id: '11.3-c02',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 正整数 $m$、$n$、$k$ 满足 $18^{m}\\div12^{n}=27^{k}$，且 $m+n+k=20$，求 $m$、$n$、$k$；(2) 正整数 $m$、$n$、$k$ 和整数 $j\\ge0$ 满足 $18^{m}\\div12^{n}=27^{k}\\cdot4^{j}$，且 $m\\le12$。这样的 $(m,n,k,j)$ 有几组？',
      blanks: [
        { kind: 'num', label: '(1) $m=$', answer: '10' },
        { kind: 'num', label: '$n=$', answer: '5' },
        { kind: 'num', label: '$k=$', answer: '5' },
        { kind: 'num', label: '(2) 组数', answer: '9' },
      ],
      explain: [
        '思路：底数不同，拆成 $2$ 和 $3$ 的幂，$2$ 的部分和 $3$ 的部分分别比较。$18^{m}=2^{m}\\cdot3^{2m}$，$12^{n}=2^{2n}\\cdot3^{n}$。',
        '(1) 右边 $27^{k}=3^{3k}$ 没有因数 $2$，所以 $2$ 的部分必须是 $1$：$m=2n$，这时 $2^{2n}\\div2^{2n}=2^{0}=1$。（$m>2n$ 会多出因数 $2$；$m<2n$ 时 $2$ 除不尽，结果不是整数。）',
        '$3$ 的部分：$2m-n=3k$，代入 $m=2n$ 得 $k=n$。$m+n+k=4n=20$，$n=5$，$m=10$，$k=5$。',
        '(2) 右边 $=3^{3k}\\cdot2^{2j}$。比较 $2$ 的指数：$m-2n=2j$；比较 $3$ 的指数：$2m-n=3k$。',
        '把 $m=2n+2j$ 代入：$4n+4j-n=3n+4j=3k$，所以 $4j$ 是 $3$ 的倍数，$j$ 是 $3$ 的倍数：$j=0,3,6,\\ldots$。',
        '$j=0$：$m=2n\\le12$，$n=1,\\ldots,6$，$6$ 组（这就是 (1) 的情形，$4^{0}=1$）。$j=3$：$m=2n+6\\le12$，$n=1,2,3$，$3$ 组。$j\\ge6$ 时 $m\\ge14$，不行。',
        '共 $6+3=9$ 组。易错：漏掉 $j=0$（零指数），或者没发现 $j$ 必须是 $3$ 的倍数。',
      ],
      verify: () => {
        let first = null;
        for (let m = 1; m < 20; m++) {
          for (let n = 1; m + n < 20; n++) {
            const k = 20 - m - n;
            if (18n ** BigInt(m) === 27n ** BigInt(k) * 12n ** BigInt(n)) first = [m, n, k];
          }
        }
        let count = 0;
        for (let m = 1; m <= 12; m++) {
          for (let n = 1; n <= 30; n++) {
            for (let k = 1; k <= 30; k++) {
              for (let j = 0; j <= 15; j++) if (18n ** BigInt(m) === 27n ** BigInt(k) * 4n ** BigInt(j) * 12n ** BigInt(n)) count++;
            }
          }
        }
        return [...first, count];
      },
    },
    {
      id: '11.3-c03',
      level: 'challenge',
      type: 'fill',
      stem: '$m$、$n$ 是正整数，$(x^{m}y^{4}-3x^{3}y^{n}+2x^{2}y^{2})\\div(-x^{2}y^{2})$ 的结果是整式（每一项都能整除，字母的指数不出现负数），并且结果的次数是 $3$。(1) 满足条件的 $(m,n)$ 有几组？(2) 其中结果只有两项的那一组，$m$、$n$ 各是多少？',
      blanks: [
        { kind: 'num', label: '(1) 组数', answer: '4' },
        { kind: 'num', label: '(2) $m=$', answer: '3' },
        { kind: 'num', label: '$n=$', answer: '4' },
      ],
      explain: [
        '逐项相除：$x^{m}y^{4}\\div(-x^{2}y^{2})=-x^{m-2}y^{2}$，$-3x^{3}y^{n}\\div(-x^{2}y^{2})=3xy^{n-2}$，$2x^{2}y^{2}\\div(-x^{2}y^{2})=-2$。',
        '能整除：$m-2\\ge0$，$n-2\\ge0$，即 $m\\ge2$，$n\\ge2$。注意 $m=2$ 时 $x^{0}=1$，第一项是 $-y^{2}$，仍是整式，不能漏。',
        '各项次数：$-x^{m-2}y^{2}$ 是 $m$ 次，$3xy^{n-2}$ 是 $n-1$ 次，$-2$ 是 $0$ 次。前两项系数 $-1$ 和 $3$ 相加不为 $0$，即使是同类项也不会抵消，所以结果的次数是 $m$ 与 $n-1$ 中较大的那个。',
        '次数是 $3$：若 $m=3$，要 $n-1\\le3$，$n=2,3,4$；若 $m=2$，要 $n-1=3$，$n=4$；$m\\ge4$ 不行。共 $4$ 组：$(3,2)$、$(3,3)$、$(3,4)$、$(2,4)$。',
        '(2) 只有两项，说明前两项是同类项合并了：$m-2=1$ 且 $n-2=2$，即 $m=3$，$n=4$，结果 $=-xy^{2}+3xy^{2}-2=2xy^{2}-2$。其余三组都是三项。',
        '易错：漏掉 $m=2$（以为 $x^{0}$ 不算），或者没想到两项会合并。',
      ],
      verify: () => {
        const ok = [];
        for (let m = 1; m <= 8; m++) {
          for (let n = 1; n <= 8; n++) {
            const q = div113(Poly.of(`x^${m}y^4-3x^3y^${n}+2x^2y^2`), '-x^2y^2');
            if (q && q.deg() === 3) ok.push([m, n, q.size()]);
          }
        }
        const two = ok.filter(([, , size]) => size === 2);
        return [ok.length, two.length === 1 ? two[0][0] : null, two.length === 1 ? two[0][1] : null];
      },
    },
    {
      id: '11.3-c04',
      level: 'challenge',
      type: 'fill',
      stem: '单项式 $A=sx^{a}y^{2}$，$B=tx^{3}y^{b}$（$s$、$t$ 是数，$a$、$b$ 是正整数）满足 $A\\div B=-2x^{2}y$，$A\\cdot B=-8x^{8}y^{3}$，并且当 $x=-1$，$y=1$ 时 $A>B$。求 $a$、$b$、$s$、$t$，以及 $A^{2}\\div B^{3}$。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '5' },
        { kind: 'num', label: '$b=$', answer: '1' },
        { kind: 'num', label: '$s=$', answer: '-4' },
        { kind: 'num', label: '$t=$', answer: '2' },
        { kind: 'expr', label: '$A^{2}\\div B^{3}=$', answer: '2x*y', simplified: true },
      ],
      explain: [
        '先定指数：$A\\div B=\\frac st x^{a-3}y^{2-b}$，对照 $-2x^{2}y$：$a-3=2$，$2-b=1$，所以 $a=5$，$b=1$。检验积：$x^{5+3}y^{2+1}=x^{8}y^{3}$，对得上。',
        '再定系数：$\\frac st=-2$，$st=-8$。由第一个式子 $s=-2t$，代入第二个：$-2t^{2}=-8$，$t^{2}=4$。平方是 $4$ 的数只有 $2$ 和 $-2$，所以 $t=2,s=-4$ 或 $t=-2,s=4$。',
        '用 $A>B$ 选一组：$x=-1$，$y=1$ 时 $x^{5}=-1$，$x^{3}=-1$，所以 $A=-s$，$B=-t$。$A>B$ 即 $-s>-t$，$s<t$。',
        '$t=2,s=-4$ 时 $-4<2$，成立；$t=-2,s=4$ 时不成立。所以 $s=-4$，$t=2$，$A=-4x^{5}y^{2}$，$B=2x^{3}y$。',
        '$A^{2}\\div B^{3}=16x^{10}y^{4}\\div8x^{9}y^{3}=2xy$。',
        '易错：代入 $x=-1$ 时没注意奇次方是负的，选反了一组；$A^{2}$、$B^{3}$ 的系数忘了乘方。',
      ],
      verify: () => {
        for (let a = 1; a <= 10; a++) {
          for (let b = 1; b <= 10; b++) {
            for (const t of [-4, -2, -1, 1, 2, 4]) {
              for (const s of [-8, -4, -2, 2, 4, 8]) {
                const A = Poly.of(`x^${a}y^2`).scale(s);
                const B = Poly.of(`x^3y^${b}`).scale(t);
                const q = div113(A, B);
                if (!q || !q.eq(Poly.of('-2x^2y')) || !A.mul(B).eq(Poly.of('-8x^8y^3'))) continue;
                const env = { x: F(-1), y: F(1) };
                if (A.at(env).cmp(B.at(env)) <= 0) continue;
                return [a, b, s, t, String(div113(A.pow(2), B.pow(3)))];
              }
            }
          }
        }
        return null;
      },
    },
    {
      id: '11.3-c05',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $a-b=3$，$ab=1$。求：(1) $(a^{5}b^{2}-a^{2}b^{5})\\div a^{2}b^{2}$ 的值；(2) $(a^{9}b^{3}+a^{3}b^{9})\\div a^{3}b^{3}$ 的值。',
      blanks: [
        { kind: 'num', label: '(1)', answer: '36' },
        { kind: 'num', label: '(2)', answer: '1298' },
      ],
      explain: [
        '先做除法，把式子化简：(1) 原式 $=a^{3}-b^{3}$；(2) 原式 $=a^{6}+b^{6}$。这里 $a$、$b$ 不是整数，也不是分数，求不出具体值，只能整体代入。',
        '$a^{2}+b^{2}=(a-b)^{2}+2ab=9+2=11$。',
        '(1) 由 $(a-b)(a^{2}+ab+b^{2})=a^{3}-b^{3}$（展开验证：$a^{3}+a^{2}b+ab^{2}-a^{2}b-ab^{2}-b^{3}$），得 $a^{3}-b^{3}=3\\times(11+1)=36$。',
        '(2) 关键：把 $a^{3}$、$b^{3}$ 看成新的两个数，用 (1) 的结果再做一次公式变形：$a^{6}+b^{6}=(a^{3})^{2}+(b^{3})^{2}=(a^{3}-b^{3})^{2}+2a^{3}b^{3}$。',
        '$a^{3}b^{3}=(ab)^{3}=1$，所以 $a^{6}+b^{6}=36^{2}+2=1298$。',
        '易错：$a^{3}b^{3}$ 写成 $3ab$；或者用 $(a^{2}+b^{2})^{3}$ 硬展开，容易漏项。',
      ],
      verify: () => {
        const q1 = div113('a^5b^2-a^2b^5', 'a^2b^2');
        const q2 = div113('a^9b^3+a^3b^9', 'a^3b^3');
        const ok1 = q1.eq(Poly.of('(a-b)^3+3a*b(a-b)'));
        const ok2 = q2.eq(Poly.of('((a-b)^3+3a*b(a-b))^2+2(a*b)^3'));
        const d = F(3);
        const p = F(1);
        const cube = d.pow(3).add(p.mul(3).mul(d));
        return ok1 && ok2 ? [cube, cube.pow(2).add(p.pow(3).mul(2))] : null;
      },
    },
  ],
});
