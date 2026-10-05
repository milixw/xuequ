'use strict';

// 上海数学七年级上册 · 11.1 整式的乘法
// 知识范围：同底数幂的乘法 a^m·a^n=a^(m+n)（规定 a^1=a）、幂的乘方 (a^m)^n=a^(mn)、积的乘方 (ab)^n=a^n·b^n（m、n 是正整数，可以逆用）；
//   单项式乘单项式、单项式乘整式、整式乘整式；面积问题（相框、长方形中放卡片）
// 可以使用：第 10 章全部内容；六年级上下册全部内容（含一元一次方程、二元和三元一次方程组、梯形和三角形面积）
// 还没学：乘法公式（11.2，所以平方要按整式乘法一项一项乘）；同底数幂的除法、a^0（11.3）；因式分解（第 12 章）；
//   负整数指数（13.2）；科学记数法（八年级上册）；不等式（七年级下册）
// 本节约定：指数都是正整数

// 11.1-e06 的配图：长方形 ABCD 中放 9 张 a×b 的卡片（按 a=50、b=20 画，故意不画成 a=3b）
// 11.1-c02 的配图：三个正方形并排（按 a=3、b=5、c=4 画，每单位 20px）
const FIG111 = {
  cards: `<svg viewBox="0 0 290 205" xmlns="http://www.w3.org/2000/svg" font-size="14" font-family="sans-serif">
  <rect x="30" y="20" width="160" height="50" fill="#cfe3f7" stroke="none"/>
  <rect x="130" y="70" width="120" height="60" fill="#cfe3f7" stroke="none"/>
  <rect x="30" y="20" width="220" height="110" fill="none" stroke="#333" stroke-width="2"/>
  <rect x="190" y="20" width="20" height="50" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="210" y="20" width="20" height="50" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="230" y="20" width="20" height="50" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="30" y="70" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="30" y="90" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="30" y="110" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="80" y="70" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="80" y="90" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <rect x="80" y="110" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <text x="110" y="50" text-anchor="middle" fill="#2b5d8a">S₁</text>
  <text x="190" y="105" text-anchor="middle" fill="#2b5d8a">S₂</text>
  <text x="20" y="16" text-anchor="middle">A</text>
  <text x="260" y="16" text-anchor="middle">D</text>
  <text x="20" y="144" text-anchor="middle">B</text>
  <text x="260" y="144" text-anchor="middle">C</text>
  <rect x="130" y="165" width="50" height="20" fill="#fff" stroke="#333" stroke-width="1.5"/>
  <text x="155" y="160" text-anchor="middle" font-style="italic">a</text>
  <text x="190" y="180" text-anchor="middle" font-style="italic">b</text>
  <text x="95" y="180" text-anchor="middle">卡片：</text>
</svg>`,
  squares: `<svg viewBox="0 0 290 210" xmlns="http://www.w3.org/2000/svg" font-size="14" font-family="sans-serif">
  <rect x="20" y="120" width="60" height="60" fill="none" stroke="#333" stroke-width="1.5"/>
  <rect x="80" y="80" width="100" height="100" fill="none" stroke="#333" stroke-width="1.5"/>
  <rect x="180" y="100" width="80" height="80" fill="none" stroke="#333" stroke-width="1.5"/>
  <polygon points="80,120 180,80 260,100" fill="#cfe3f7" stroke="#2b5d8a" stroke-width="2"/>
  <line x1="10" y1="180" x2="280" y2="180" stroke="#333" stroke-width="1"/>
  <text x="80" y="114" text-anchor="middle">P</text>
  <text x="180" y="74" text-anchor="middle">M</text>
  <text x="268" y="96" text-anchor="middle">Q</text>
  <text x="50" y="198" text-anchor="middle" font-style="italic">a</text>
  <text x="130" y="198" text-anchor="middle" font-style="italic">b</text>
  <text x="220" y="198" text-anchor="middle" font-style="italic">c</text>
</svg>`,
};

Content.section({
  id: 'math/sh2024/g7s1/11.1',
  title: '整式的乘法',
  review: { status: 'pending' },
  audit: { blind: '2026-10-05', rounds: 2, note: '真卷标尺（基础 9 + 扩展 6 + 挑战 5），子代理盲解复核两轮，答案全部一致。第 1 轮指出 b01 四个选项与卡片 1～3 的易错提醒撞车、b06 与卡片 3 例子结构相同、c01 只是反复降次（约 4 级）；第 2 轮 b01 换选项、卡片 1 和 3 改例子与易错、c01 (3) 改为 x^10−mx^2 与 x 无关求 m，e06 注明示意图后判定整节通过。可选意见未处理：扩展档 3 级偏多（4∶1∶1），c03 勉强通过' },

  intro: [
    {
      title: '同底数幂的乘法',
      body: '$a^{n}$ 表示 $n$ 个 $a$ 相乘，$a$ 叫底数，$n$ 叫指数。$a^{m}\\cdot a^{n}$ 就是先乘 $m$ 个 $a$、再乘 $n$ 个 $a$，一共 $m+n$ 个：$a^{m}\\cdot a^{n}=a^{m+n}$。**底数不变，指数相加。**',
      example: '$y^{3}\\cdot y^{4}\\cdot y=y^{3+4+1}=y^{8}$；$(-2)^{3}\\times(-2)^{4}=(-2)^{7}$。',
      pitfall: '同底数幂相乘是乘法，指数相加；几个同类项相加是合并同类项，指数不变，比如 $3m^{2}+m^{2}=4m^{2}$。',
    },
    {
      title: '幂的乘方',
      body: '$(a^{m})^{n}$ 是 $n$ 个 $a^{m}$ 相乘，用同底数幂的乘法，指数是 $n$ 个 $m$ 相加：$(a^{m})^{n}=a^{mn}$。**底数不变，指数相乘。**反过来，$a^{mn}$ 也可以写成 $(a^{m})^{n}$，用来把不同的底数化成相同的底数。',
      example: '$(b^{4})^{3}=b^{12}$；$9^{5}=(3^{2})^{5}=3^{10}$。',
      pitfall: '$(a^{3})^{2}=a^{6}$，指数相乘；和 $a^{3}\\cdot a^{2}=a^{5}$（指数相加）分清楚。',
    },
    {
      title: '积的乘方',
      body: '$(ab)^{n}$ 是 $n$ 个 $ab$ 相乘，用交换律、结合律把 $a$ 和 $b$ 分别放在一起：$(ab)^{n}=a^{n}b^{n}$。积里的**每一个因式**都要乘方，包括数字系数和符号。',
      example: '$\\left(-\\frac{1}{2}mn^{2}\\right)^{3}=\\left(-\\frac12\\right)^{3}\\cdot m^{3}\\cdot(n^{2})^{3}=-\\frac18m^{3}n^{6}$。',
      pitfall: '负号也算因式：底数带负号时，奇次方得负、偶次方得正；数字系数也要乘方，不能只给字母乘方。',
    },
    {
      title: '单项式乘单项式',
      body: '把系数相乘、同底数幂分别相乘，只在一个单项式里出现的字母连同它的指数照抄。先定符号最不容易错。',
      example: '$2ab^{2}\\cdot(-3a^{2}c)=[2\\times(-3)]\\cdot(a\\cdot a^{2})\\cdot b^{2}\\cdot c=-6a^{3}b^{2}c$。',
    },
    {
      title: '单项式乘整式、整式乘整式',
      body: '用乘法分配律：单项式乘整式的**每一项**；整式乘整式，用一个整式的每一项乘另一个整式的每一项，再把积相加，最后合并同类项。两项乘两项，合并前一共有 $4$ 项。',
      example: '$(x+3)(2x-1)=2x^{2}-x+6x-3=2x^{2}+5x-3$。',
      pitfall: '每一项都带着前面的符号去乘；整式前面是“$-$”号时，先把乘积写在括号里，再去括号。',
    },
  ],

  questions: [
    // ---------- 基础 ----------
    {
      id: '11.1-b01',
      level: 'basic',
      type: 'choice',
      stem: '下列计算正确的是（　　）',
      options: ['$a\\cdot a^{5}=a^{5}$', '$(-a^{3})^{2}=-a^{6}$', '$(-3a^{2}b)^{3}=-27a^{6}b^{3}$', '$a^{4}+a^{4}=2a^{8}$'],
      answer: 2,
      explain: [
        'A：单独的 $a$ 指数是 $1$，$a\\cdot a^{5}=a^{1+5}=a^{6}$，错在把 $a$ 的指数当成 $0$。',
        'B：$(-a^{3})^{2}=(-1)^{2}\\cdot(a^{3})^{2}=a^{6}$，偶次方是正的，错在符号。',
        'C：积的乘方，每个因式都乘方：$(-3)^{3}\\cdot(a^{2})^{3}\\cdot b^{3}=-27a^{6}b^{3}$，正确。',
        'D：$a^{4}+a^{4}$ 是合并同类项，系数相加、指数不变，等于 $2a^{4}$。选 C。',
      ],
      verify: () => [['a*a^5', 'a^5'], ['(-a^3)^2', '-a^6'], ['(-3a^2b)^3', '-27a^6b^3'], ['a^4+a^4', '2a^8']]
        .findIndex(([l, r]) => Poly.of(l).eq(Poly.of(r))),
    },
    {
      id: '11.1-b02',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(-x)^{2}\\cdot(-x^{3})\\cdot x^{4}+(-x^{3})^{3}$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '-2x^9', simplified: true },
      ],
      explain: [
        '$(-x)^{2}=x^{2}$（负数的偶次方是正的），$-x^{3}$ 的负号在幂的外面，相当于乘 $-1$。',
        '第一部分：$x^{2}\\cdot(-x^{3})\\cdot x^{4}=-x^{2+3+4}=-x^{9}$。',
        '第二部分：$(-x^{3})^{3}=(-1)^{3}\\cdot(x^{3})^{3}=-x^{9}$。',
        '合并：$-x^{9}-x^{9}=-2x^{9}$。常见错误是把 $(-x)^{2}$ 当成 $-x^{2}$，得到 $0$。',
      ],
      verify: () => String(Poly.of('(-x)^2*(-x^3)*x^4+(-x^3)^3')),
    },
    {
      id: '11.1-b03',
      level: 'basic',
      type: 'fill',
      stem: '把 $(y-x)^{2}\\cdot(x-y)^{3}\\cdot(y-x)^{5}$ 写成 $k(x-y)^{n}$ 的形式，其中 $k$ 是数，$n$ 是正整数。',
      blanks: [
        { kind: 'num', label: '$k=$', answer: '-1' },
        { kind: 'num', label: '$n=$', answer: '10' },
      ],
      explain: [
        '$y-x$ 和 $x-y$ 互为相反数，先把底数统一成 $x-y$：$y-x=-(x-y)$。',
        '偶次方不变号：$(y-x)^{2}=(x-y)^{2}$；奇次方要变号：$(y-x)^{5}=-(x-y)^{5}$。',
        '原式 $=(x-y)^{2}\\cdot(x-y)^{3}\\cdot[-(x-y)^{5}]=-(x-y)^{2+3+5}=-(x-y)^{10}$。',
        '所以 $k=-1$，$n=10$。常见错误是没有给 $(y-x)^{5}$ 变号，得到 $k=1$。',
      ],
      verify: () => {
        const p = Poly.of('(y-x)^2*(x-y)^3*(y-x)^5');
        for (const k of [1, -1]) {
          for (let n = 1; n <= 12; n++) if (Poly.of('x-y').pow(n).scale(k).eq(p)) return [k, n];
        }
        return null;
      },
    },
    {
      id: '11.1-b04',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(-2a^{2}b)^{3}+3a^{2}\\cdot(a^{2}b)^{2}\\cdot b$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '-5a^6b^3', simplified: true },
      ],
      explain: [
        '$(-2a^{2}b)^{3}=(-2)^{3}\\cdot(a^{2})^{3}\\cdot b^{3}=-8a^{6}b^{3}$，系数是 $(-2)^{3}=-8$，不是 $-6$。',
        '$3a^{2}\\cdot(a^{2}b)^{2}\\cdot b=3a^{2}\\cdot a^{4}b^{2}\\cdot b=3a^{6}b^{3}$。',
        '两项是同类项，合并：$-8a^{6}b^{3}+3a^{6}b^{3}=-5a^{6}b^{3}$。',
      ],
      verify: () => String(Poly.of('(-2a^2b)^3+3a^2*(a^2b)^2*b')),
    },
    {
      id: '11.1-b05',
      level: 'basic',
      type: 'fill',
      stem: '(1) 已知 $a^{m}=3$，$a^{n}=2$，求 $a^{2m+3n}$ 的值；(2) 已知 $2x+3y-4=0$，求 $4^{x}\\cdot8^{y}$ 的值。',
      blanks: [
        { kind: 'num', label: '(1) $a^{2m+3n}=$', answer: '72' },
        { kind: 'num', label: '(2) $4^{x}\\cdot8^{y}=$', answer: '16' },
      ],
      explain: [
        '(1) 把运算法则倒过来用：$a^{2m+3n}=a^{2m}\\cdot a^{3n}=(a^{m})^{2}\\cdot(a^{n})^{3}$。',
        '代入：$3^{2}\\times2^{3}=9\\times8=72$。常见错误是写成 $2\\times3+3\\times2=12$，把幂当成了乘法。',
        '(2) 底数化成 $2$：$4^{x}=(2^{2})^{x}=2^{2x}$，$8^{y}=(2^{3})^{y}=2^{3y}$。',
        '$4^{x}\\cdot8^{y}=2^{2x+3y}$，由 $2x+3y=4$ 得 $2^{4}=16$。',
      ],
      verify: () => [
        F(3).pow(2).mul(F(2).pow(3)),
        // 两组满足 2x+3y=4 的整数取值算出来应该一样
        [[2, 0], [-1, 2]].map(([x, y]) => F(4).pow(x).mul(F(8).pow(y))).reduce((p, q) => (p.eq(q) ? p : null)),
      ],
    },
    {
      id: '11.1-b06',
      level: 'basic',
      type: 'choice',
      stem: '计算 $-\\frac{1}{3}x^{2}y\\cdot(-3xy^{2})^{2}$ 的结果是（　　）',
      options: ['$-3x^{4}y^{5}$', '$3x^{4}y^{5}$', '$-x^{4}y^{5}$', '$-3x^{3}y^{5}$'],
      answer: 0,
      explain: [
        '先算积的乘方：$(-3xy^{2})^{2}=(-3)^{2}x^{2}(y^{2})^{2}=9x^{2}y^{4}$。',
        '再算单项式乘单项式：系数 $-\\frac13\\times9=-3$，$x^{2}\\cdot x^{2}=x^{4}$，$y\\cdot y^{4}=y^{5}$。结果是 $-3x^{4}y^{5}$，选 A。',
        'B 符号错：平方以后是正的，前面的 $-\\frac13$ 还是负的；C 是系数 $-3$ 没有平方；D 是 $x$ 没有平方。',
      ],
      verify: () => {
        const r = Poly.of('-1/3*x^2y*(-3x*y^2)^2');
        return ['-3x^4y^5', '3x^4y^5', '-x^4y^5', '-3x^3y^5'].findIndex(o => Poly.of(o).eq(r));
      },
    },
    {
      id: '11.1-b07',
      level: 'basic',
      type: 'fill',
      stem: '计算：$-2x\\left(3x^{2}-x+\\frac{1}{2}\\right)-x(x-4)$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: '-6x^3+x^2+3x', simplified: true },
      ],
      explain: [
        '$-2x$ 乘括号里的每一项，符号一起乘：$-2x\\cdot3x^{2}=-6x^{3}$，$-2x\\cdot(-x)=2x^{2}$，$-2x\\cdot\\frac12=-x$。',
        '$-x(x-4)=-x^{2}+4x$，最后一项 $-x\\cdot(-4)=+4x$。',
        '合并：$-6x^{3}+2x^{2}-x-x^{2}+4x=-6x^{3}+x^{2}+3x$。',
        '常见错误是把 $-x(x-4)$ 写成 $-x^{2}-4x$，结果得 $-6x^{3}+x^{2}-5x$。',
      ],
      verify: () => String(Poly.of('-2x(3x^2-x+1/2)-x(x-4)')),
    },
    {
      id: '11.1-b08',
      level: 'basic',
      type: 'fill',
      stem: '计算：$(2x-3)(x+4)-(x-1)(x-2)$。',
      blanks: [
        { kind: 'expr', label: '结果是', answer: 'x^2+8x-14', simplified: true },
      ],
      explain: [
        '$(2x-3)(x+4)=2x^{2}+8x-3x-12=2x^{2}+5x-12$。',
        '$(x-1)(x-2)=x^{2}-2x-x+2=x^{2}-3x+2$。',
        '后一个积前面是“$-$”号，先把积放在括号里再去括号：$2x^{2}+5x-12-(x^{2}-3x+2)=2x^{2}+5x-12-x^{2}+3x-2$。',
        '合并得 $x^{2}+8x-14$。常见错误是只给 $x^{2}$ 变号，得 $x^{2}+2x-10$。',
      ],
      verify: () => String(Poly.of('(2x-3)(x+4)-(x-1)(x-2)')),
    },
    {
      id: '11.1-b09',
      level: 'basic',
      type: 'fill',
      stem: '已知 $x^{2}-2x=3$，求 $(x-1)(2x+1)-x(x+1)$ 的值。',
      blanks: [
        { kind: 'num', label: '值是', answer: '2' },
      ],
      explain: [
        '$x$ 的值不好求，先化简，看能不能凑出 $x^{2}-2x$。',
        '$(x-1)(2x+1)=2x^{2}+x-2x-1=2x^{2}-x-1$；$x(x+1)=x^{2}+x$。',
        '原式 $=2x^{2}-x-1-x^{2}-x=x^{2}-2x-1$。',
        '把 $x^{2}-2x=3$ 整体代入：$3-1=2$。',
      ],
      verify: () => {
        const rest = Poly.of('(x-1)(2x+1)-x(x+1)').sub(Poly.of('x^2-2x'));
        return rest.deg() === 0 ? rest.at({}).add(3) : null;
      },
    },

    // ---------- 扩展 ----------
    {
      id: '11.1-e01',
      level: 'extended',
      type: 'choice',
      stem: '比较 $2^{55}$、$3^{44}$、$4^{33}$、$5^{22}$ 的大小，正确的是（　　）',
      options: [
        '$5^{22}<2^{55}<4^{33}<3^{44}$',
        '$2^{55}<4^{33}<5^{22}<3^{44}$',
        '$5^{22}<4^{33}<2^{55}<3^{44}$',
        '$5^{22}<2^{55}<3^{44}<4^{33}$',
      ],
      answer: 0,
      explain: [
        '底数、指数都不同，没法直接比。四个指数 $55$、$44$、$33$、$22$ 都是 $11$ 的倍数，用幂的乘方把指数都化成 $11$。',
        '$2^{55}=(2^{5})^{11}=32^{11}$，$3^{44}=(3^{4})^{11}=81^{11}$，$4^{33}=(4^{3})^{11}=64^{11}$，$5^{22}=(5^{2})^{11}=25^{11}$。',
        '指数相同，底数越大幂越大：$25<32<64<81$，所以 $5^{22}<2^{55}<4^{33}<3^{44}$，选 A。',
        'C 的错误是以为指数大的就大，没注意 $4^{33}=2^{66}$ 比 $2^{55}$ 大；B 是以为底数大的就大。',
      ],
      verify: () => {
        const v = { '2^{55}': 2n ** 55n, '3^{44}': 3n ** 44n, '4^{33}': 4n ** 33n, '5^{22}': 5n ** 22n };
        const order = Object.keys(v).sort((p, q) => (v[p] < v[q] ? -1 : 1)).map(k => '$' + k).join('<').replace(/\$/g, '');
        return ['5^{22}<2^{55}<4^{33}<3^{44}', '2^{55}<4^{33}<5^{22}<3^{44}', '5^{22}<4^{33}<2^{55}<3^{44}', '5^{22}<2^{55}<3^{44}<4^{33}']
          .indexOf(order);
      },
    },
    {
      id: '11.1-e02',
      level: 'extended',
      type: 'multi',
      stem: '已知 $2^{a}=3$，$2^{b}=6$，$2^{c}=12$。下列关系中正确的有（　　）',
      options: ['$b-a=1$', '$a+c=2b$', '$c=2a$', '$2^{a+b+c}=216$', '$c-a=b-1$'],
      answer: [0, 1, 3],
      explain: [
        '思路：把要判断的关系“翻译”成 $2$ 的幂，用 $2^{a}=3$ 这些条件代入，看两边的幂是否相等。指数不同的两个 $2$ 的幂不会相等，所以幂相等时指数也相等。',
        'A：$2^{a+1}=2^{a}\\cdot2=6=2^{b}$，所以 $b=a+1$，正确。',
        'B：$2^{a+c}=3\\times12=36$，$2^{2b}=(2^{b})^{2}=36$，正确。',
        'C：$2^{2a}=(2^{a})^{2}=9\\ne12$，错误。',
        'D：$2^{a+b+c}=3\\times6\\times12=216$，正确。',
        'E：由 A 和 $c=b+1$（同理 $12=6\\times2$）得 $c-a=2$，而 $b-1=a$，要 $a=2$ 才成立，但 $2^{2}=4\\ne3$，错误。选 A、B、D。',
      ],
      verify: () => {
        // 各关系化成乘积关系：2^a=3、2^b=6、2^c=12
        const [A, B, C] = [F(3), F(6), F(12)];
        const ok = [
          B.eq(A.mul(2)),            // 2^b = 2^a·2
          A.mul(C).eq(B.mul(B)),     // 2^(a+c) = 2^(2b)
          C.eq(A.mul(A)),            // 2^c = 2^(2a)
          A.mul(B).mul(C).eq(F(216)),
          C.div(A).eq(B.div(2)),     // 2^(c−a) = 2^(b−1)
        ];
        return ok.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
      },
    },
    {
      id: '11.1-e03',
      level: 'extended',
      type: 'fill',
      stem: '$(x^{2}+px+8)(x^{2}-3x+q)$ 的展开式中不含 $x^{3}$ 项和 $x^{2}$ 项。求 $p$、$q$ 的值，以及此时展开式中 $x$ 的系数。',
      blanks: [
        { kind: 'num', label: '$p=$', answer: '3' },
        { kind: 'num', label: '$q=$', answer: '1' },
        { kind: 'num', label: '$x$ 的系数是', answer: '-21' },
      ],
      explain: [
        '不用全部展开，只找能乘出 $x^{3}$、$x^{2}$ 的那几对。',
        '$x^{3}$ 项：$x^{2}\\cdot(-3x)+px\\cdot x^{2}=(p-3)x^{3}$，不含 $x^{3}$ 项，所以 $p-3=0$，$p=3$。',
        '$x^{2}$ 项：$x^{2}\\cdot q+px\\cdot(-3x)+8\\cdot x^{2}=(q-3p+8)x^{2}$，所以 $q-3p+8=0$，代入 $p=3$ 得 $q=1$。',
        '$x$ 项：$px\\cdot q+8\\cdot(-3x)=(pq-24)x$，系数是 $3\\times1-24=-21$。',
        '常见错误是 $x^{2}$ 项漏掉 $8\\cdot x^{2}$ 或 $x^{2}\\cdot q$，只剩一对。',
      ],
      verify: () => {
        for (let p = -10; p <= 10; p++) {
          for (let q = -10; q <= 10; q++) {
            const r = Poly.of(`(x^2+${p}x+8)(x^2-3x+${q})`.replace(/\+-/g, '-'));
            if (r.coef('x^3').isZero() && r.coef('x^2').isZero()) return [p, q, r.coef('x')];
          }
        }
        return null;
      },
    },
    {
      id: '11.1-e04',
      level: 'extended',
      type: 'fill',
      stem: '计算 $(2x+a)(3x+b)$ 时，甲把第一个括号里 $a$ 前面的“$+$”抄成了“$-$”，得到 $6x^{2}+11x-10$；乙漏抄了第二个括号里 $x$ 的系数 $3$，得到 $2x^{2}-9x+10$。求 $a$、$b$ 的值和正确的结果。',
      blanks: [
        { kind: 'num', label: '$a=$', answer: '-5' },
        { kind: 'num', label: '$b=$', answer: '-2' },
        { kind: 'expr', label: '正确结果是', answer: '6x^2-19x+10', simplified: true },
      ],
      explain: [
        '甲算的是 $(2x-a)(3x+b)=6x^{2}+(2b-3a)x-ab$，对照得 $2b-3a=11$。',
        '乙算的是 $(2x+a)(x+b)=2x^{2}+(2b+a)x+ab$，对照得 $2b+a=-9$。',
        '两式相减：$(2b+a)-(2b-3a)=4a=-20$，$a=-5$，代入得 $b=-2$。',
        '检验常数项：甲的 $-ab=-10$，乙的 $ab=10$，都对得上。',
        '正确结果：$(2x-5)(3x-2)=6x^{2}-4x-15x+10=6x^{2}-19x+10$。',
      ],
      verify: () => {
        for (let a = -10; a <= 10; a++) {
          for (let b = -10; b <= 10; b++) {
            const jia = Poly.num(-a).add(Poly.of('2x')).mul(Poly.of('3x').add(b));
            const yi = Poly.of('2x').add(a).mul(Poly.of('x').add(b));
            if (jia.eq(Poly.of('6x^2+11x-10')) && yi.eq(Poly.of('2x^2-9x+10'))) {
              return [a, b, String(Poly.of('2x').add(a).mul(Poly.of('3x').add(b)))];
            }
          }
        }
        return null;
      },
    },
    {
      id: '11.1-e05',
      level: 'extended',
      type: 'fill',
      stem: '(1) 计算 $(-0.125)^{2025}\\times8^{2026}$；(2) $N=2^{2025}\\times5^{2027}$，$N$ 是几位数？它的各位数字之和是多少？',
      blanks: [
        { kind: 'num', label: '(1) 结果是', answer: '-8' },
        { kind: 'num', label: '(2) $N$ 的位数是', answer: '2027' },
        { kind: 'num', label: '各位数字之和是', answer: '7' },
      ],
      explain: [
        '积的乘方倒过来用：指数相同时，$a^{n}b^{n}=(ab)^{n}$。指数不同，先拆出相同的部分。',
        '(1) $8^{2026}=8^{2025}\\times8$，原式 $=(-0.125\\times8)^{2025}\\times8=(-1)^{2025}\\times8=-8$。',
        '(2) $5^{2027}=5^{2025}\\times5^{2}$，$N=(2\\times5)^{2025}\\times25=25\\times10^{2025}$。',
        '$25$ 后面跟 $2025$ 个 $0$，一共 $2+2025=2027$ 位，各位数字之和 $2+5=7$。',
        '常见错误：(1) 忘了奇次方是负的；(2) 只数 $0$ 的个数，把位数写成 $2025$。',
      ],
      verify: () => {
        const n = (2n ** 2025n * 5n ** 2027n).toString();
        return [F('-1/8').pow(2025).mul(F(8).pow(2026)), n.length, [...n].reduce((s, d) => s + Number(d), 0)];
      },
    },
    {
      id: '11.1-e06',
      level: 'extended',
      type: 'fill',
      stem: '把 $9$ 张长为 $a$、宽为 $b$（$a>b$）的小长方形卡片按图中的方式不重叠地放在长方形 $ABCD$ 中：上面一排 $3$ 张竖着靠右放，下面靠左放 $2$ 列、每列 $3$ 张横着叠放。没有被盖住的部分是两个长方形（图是示意图，比例不准），左上角的面积为 $S_{1}$，右下角的面积为 $S_{2}$。当 $BC$ 的长度变化时（卡片的放法不变），$S=S_{1}-S_{2}$ 的值始终不变。求 $a$ 是 $b$ 的几倍；当 $b=2$ 时，$S$ 是多少？',
      figure: FIG111.cards,
      blanks: [
        { kind: 'num', label: '$a$ 是 $b$ 的几倍：', answer: '3' },
        { kind: 'num', label: '$b=2$ 时，$S=$', answer: '36' },
      ],
      explain: [
        '设 $BC=x$，用 $x$、$a$、$b$ 表示两块阴影的长和宽。',
        '上面一排卡片竖着放，高 $a$，$3$ 张一共宽 $3b$：$S_{1}=a(x-3b)$。',
        '下面每列 $3$ 张横着叠，高 $3b$，$2$ 列一共宽 $2a$：$S_{2}=3b(x-2a)$。',
        '$S=a(x-3b)-3b(x-2a)=ax-3ab-3bx+6ab=(a-3b)x+3ab$。',
        '$x$ 变化时 $S$ 不变，$x$ 的系数必须是 $0$：$a-3b=0$，即 $a=3b$。',
        '此时 $S=3ab=3\\times3b\\times b=9b^{2}$，$b=2$ 时 $S=36$。',
      ],
      verify: () => {
        const S = Poly.of('a(x-3b)-3b(x-2a)');
        for (let k = 1; k <= 10; k++) {
          const at = x => S.at({ a: F(k), b: F(1), x: F(x) });
          if (at(20).eq(at(30))) return [k, S.at({ a: F(2 * k), b: F(2), x: F(50) })];
        }
        return null;
      },
    },

    // ---------- 挑战 ----------
    {
      id: '11.1-c01',
      level: 'challenge',
      type: 'fill',
      stem: '已知 $x^{2}=x+1$。(1) 把 $x^{3}$ 写成 $px+q$（$p$、$q$ 是数）的形式；(2) 求 $x^{5}-5x$ 的值；(3) 若无论 $x$ 取满足条件的哪一个值，$x^{10}-mx^{2}$ 的结果都是同一个数，求 $m$ 和这个数。',
      blanks: [
        { kind: 'expr', label: '(1) $x^{3}=$', answer: '2x+1', simplified: true },
        { kind: 'num', label: '(2) $x^{5}-5x=$', answer: '3' },
        { kind: 'num', label: '(3) $m=$', answer: '55' },
        { kind: 'num', label: '这个数是', answer: '-21' },
      ],
      explain: [
        '思路：$x$ 的值求不出来，但 $x^{2}$ 可以换成 $x+1$，次数降下来。高次幂就一次次“乘 $x$，再把 $x^{2}$ 换掉”。',
        '(1) $x^{3}=x\\cdot x^{2}=x(x+1)=x^{2}+x=(x+1)+x=2x+1$。',
        '(2) 继续：$x^{4}=x\\cdot x^{3}=2x^{2}+x=2(x+1)+x=3x+2$；$x^{5}=x\\cdot x^{4}=3x^{2}+2x=5x+3$。所以 $x^{5}-5x=3$。',
        '找规律：若 $x^{n}=px+q$，则 $x^{n+1}=px^{2}+qx=(p+q)x+p$。新的一次项系数是原来两个数的和，新的常数项是原来的一次项系数。',
        '于是一次项系数依次是 $1,1,2,3,5,8,13,21,34,55$（$x^{1}$ 到 $x^{10}$），每个数是前两个数的和，常数项是前一个的一次项系数：$x^{9}=34x+21$，$x^{10}=55x+34$。',
        '(3) $mx^{2}$ 也要降次：$mx^{2}=m(x+1)=mx+m$。所以 $x^{10}-mx^{2}=(55-m)x+(34-m)$。',
        '与 $x$ 无关，$x$ 的系数为 $0$：$m=55$，这个数是 $34-55=-21$。易错：只看 $x^{10}$ 的一次项就得 $34$，忘了 $mx^{2}$ 里还藏着常数 $m$。',
      ],
      verify: () => {
        // x^n = p·x + q，从 x^2 = x + 1 开始递推
        const pow = [null, [1, 0], [1, 1]];
        for (let n = 3; n <= 10; n++) {
          const [p, q] = pow[n - 1];
          pow.push([p + q, p]);  // x·(p x + q) = p x^2 + q x = p(x+1) + q x
        }
        const [p3, q3] = pow[3];
        const [p5, q5] = pow[5];
        const [p10, q10] = pow[10];
        // x^10 − m x^2 = (p10 − m)x + (q10 − m)
        return [String(Poly.of(`${p3}x+${q3}`)), p5 === 5 ? q5 : null, p10, q10 - p10];
      },
    },
    {
      id: '11.1-c02',
      level: 'challenge',
      type: 'fill',
      stem: '边长分别为 $a$、$b$、$c$ 的三个正方形从左到右并排放在直线上（相邻的两个正方形有一条边贴在一起），$P$、$M$、$Q$ 分别是它们右上角的顶点。(1) 如图，$M$ 在直线 $PQ$ 的上方，用 $a$、$b$、$c$ 表示 $\\triangle PMQ$ 的面积；(2) 若 $a=4$，$c=9$，且 $P$、$M$、$Q$ 在同一条直线上，求 $b$；(3) 若 $a=5$，$c=17$，$\\triangle PMQ$ 的面积为 $18$，求 $b$ 的所有可能值（全部填出，用逗号隔开）。',
      figure: FIG111.squares,
      blanks: [
        { kind: 'expr', label: '(1) 面积 $=$', answer: '1/2*b^2-1/2*a*c', simplified: true },
        { kind: 'num', label: '(2) $b=$', answer: '6' },
        { kind: 'nums', label: '(3) $b=$', answer: ['7', '11'] },
      ],
      explain: [
        '思路：三角形三个顶点的高度都知道（就是正方形的边长），从三个顶点向直线作垂线，割成梯形来算。',
        '(1) 以 $P$、$M$ 和它们在直线上的垂足为顶点的梯形，上下底是 $a$、$b$，高是 $b$（第二个正方形的宽），面积 $\\frac12b(a+b)$；同理 $M$、$Q$ 下面的梯形面积 $\\frac12c(b+c)$，$P$、$Q$ 下面的大梯形面积 $\\frac12(b+c)(a+c)$。',
        '$M$ 在 $PQ$ 上方，三角形面积 $=$ 两个小梯形 $-$ 大梯形 $=\\frac12[b(a+b)+c(b+c)-(b+c)(a+c)]$。',
        '展开：$ab+b^{2}+bc+c^{2}-(ab+bc+ac+c^{2})=b^{2}-ac$，面积是 $\\frac12b^{2}-\\frac12ac$。',
        '(2) 三点共线时三角形“压扁”，同样的割法得到两个小梯形的和正好等于大梯形，即 $b^{2}-ac=0$，$b^{2}=36$，边长为正，$b=6$。',
        '(3) 要分 $M$ 在上方和下方两种情况。在上方时面积 $\\frac12(b^{2}-ac)$；在下方时三角形面积 $=$ 大梯形 $-$ 两个小梯形 $=\\frac12(ac-b^{2})$。',
        '$ac=85$：上方 $\\frac12(b^{2}-85)=18$，$b^{2}=121$，$b=11$；下方 $\\frac12(85-b^{2})=18$，$b^{2}=49$，$b=7$。两个都符合，$b=7$ 或 $11$。只算一种情况会漏解。',
      ],
      verify: () => {
        // 坐标：P(a,a)、M(a+b,b)、Q(a+b+c,c)，用梯形割补求面积（带符号），再和穷举对照
        const signed = Poly.of('b(a+b)+c(b+c)-(b+c)(a+c)').scale(F('1/2'));
        const shoelace = (a, b, c) => {
          const [px, py, mx, my, qx, qy] = [a, a, a + b, b, a + b + c, c];
          return F((mx - px) * (qy - py) - (qx - px) * (my - py)).div(-2);
        };
        const same = [[3, 5, 4], [2, 7, 1], [6, 2, 5]].every(([a, b, c]) => signed.at({ a: F(a), b: F(b), c: F(c) }).eq(shoelace(a, b, c)));
        const col = [];
        const area18 = [];
        for (let b = 1; b <= 40; b++) {
          if (shoelace(4, b, 9).isZero()) col.push(b);
          const s = shoelace(5, b, 17);
          if (s.eq(F(18)) || s.eq(F(-18))) area18.push(b);
        }
        return [same ? String(signed) : null, col.length === 1 ? col[0] : null, area18];
      },
    },
    {
      id: '11.1-c03',
      level: 'challenge',
      type: 'fill',
      stem: '(1) 计算 $(x-1)(x^{4}+x^{3}+x^{2}+x+1)$；(2) 设 $2^{50}=m$，用含 $m$ 的式子表示 $2^{50}+2^{51}+2^{52}+\\cdots+2^{99}$；(3) 求 $1-2+2^{2}-2^{3}+\\cdots-2^{19}+2^{20}$ 的值。',
      blanks: [
        { kind: 'expr', label: '(1) 结果是', answer: 'x^5-1', simplified: true },
        { kind: 'expr', label: '(2) 用 $m$ 表示为', answer: 'm^2-m', simplified: true },
        { kind: 'num', label: '(3) 值是', answer: '699051' },
      ],
      explain: [
        '(1) $(x-1)(x^{4}+x^{3}+x^{2}+x+1)=x^{5}+x^{4}+x^{3}+x^{2}+x-x^{4}-x^{3}-x^{2}-x-1=x^{5}-1$，中间的项一正一负全部抵消。',
        '同样的道理，$(x-1)(x^{n}+x^{n-1}+\\cdots+x+1)=x^{n+1}-1$（$n$ 是正整数）。',
        '(2) 先提出 $2^{50}$：原式 $=2^{50}(1+2+2^{2}+\\cdots+2^{49})$。取 $x=2$，$x-1=1$，所以 $1+2+\\cdots+2^{49}=2^{50}-1$。',
        '原式 $=2^{50}(2^{50}-1)=m(m-1)=m^{2}-m$。这里 $2^{100}=(2^{50})^{2}=m^{2}$ 用的是幂的乘方。',
        '(3) 这串数是 $1+x+x^{2}+\\cdots+x^{20}$ 在 $x=-2$ 时的值（奇次幂是负的，偶次幂是正的）。',
        '由规律，$(x-1)\\times$ 这串数 $=x^{21}-1$，即 $(-3)\\times$ 原式 $=(-2)^{21}-1=-2^{21}-1$。',
        '原式 $=\\frac{2^{21}+1}{3}=\\frac{2097152+1}{3}=699051$。',
      ],
      verify: () => {
        let s2 = 0n;
        for (let k = 50; k <= 99; k++) s2 += 2n ** BigInt(k);
        const m = 2n ** 50n;
        let s3 = 0n;
        for (let k = 0; k <= 20; k++) s3 += (-2n) ** BigInt(k);
        return [String(Poly.of('(x-1)(x^4+x^3+x^2+x+1)')), s2 === m * m - m ? 'm^2-m' : null, Number(s3)];
      },
    },
    {
      id: '11.1-c04',
      level: 'challenge',
      type: 'fill',
      stem: '有三种卡片：A 卡是边长为 $a$ 的正方形，B 卡是边长为 $b$ 的正方形，C 卡是长 $a$、宽 $b$ 的长方形。用若干张卡片不重叠、无缝隙地拼成一个长为 $pa+rb$、宽为 $qa+sb$ 的长方形（$p$、$q$、$r$、$s$ 都是正整数），所用 A、B、C 卡的张数恰好分别是 $(pa+rb)(qa+sb)$ 展开后 $a^{2}$、$b^{2}$、$ab$ 的系数。现在恰好用了 A 卡 $6$ 张、C 卡 $17$ 张，B 卡的张数不限。B 卡最少用了几张？最多用了几张？',
      blanks: [
        { kind: 'num', label: 'B 卡最少', answer: '5' },
        { kind: 'num', label: 'B 卡最多', answer: '12' },
      ],
      explain: [
        '先展开：$(pa+rb)(qa+sb)=pq\\,a^{2}+(ps+qr)ab+rs\\,b^{2}$。所以 A 卡 $pq$ 张，C 卡 $ps+qr$ 张，B 卡 $rs$ 张。',
        '条件变成：$pq=6$，$ps+qr=17$，求 $rs$ 的最小值和最大值。',
        '长和宽交换不影响结果，只看 $p\\le q$：$(p,q)=(1,6)$ 或 $(2,3)$。',
        '$(1,6)$：$s+6r=17$，$r=1$ 时 $s=11$，$rs=11$；$r=2$ 时 $s=5$，$rs=10$（$r\\ge3$ 时 $s<0$）。',
        '$(2,3)$：$2s+3r=17$，$r$ 必须是奇数：$r=1,s=7$，$rs=7$；$r=3,s=4$，$rs=12$；$r=5,s=1$，$rs=5$。',
        'B 卡可能是 $5$、$7$、$10$、$11$、$12$ 张，最少 $5$ 张（$(2a+5b)(3a+b)$），最多 $12$ 张（$(2a+3b)(3a+4b)$）。',
        '易错：只试 $(1,6)$ 一种 A 卡的分法，或者漏掉 $r$ 取 $5$ 的情况。',
      ],
      verify: () => {
        const bs = [];
        for (let p = 1; p <= 6; p++) {
          for (let q = 1; q <= 6; q++) {
            for (let r = 1; r <= 17; r++) {
              for (let s = 1; s <= 17; s++) {
                const P = Poly.of(`(${p}a+${r}b)(${q}a+${s}b)`);
                if (P.coef('a^2').eq(F(6)) && P.coef('ab').eq(F(17))) bs.push(Number(P.coef('b^2').n));
              }
            }
          }
        }
        return [Math.min(...bs), Math.max(...bs)];
      },
    },
    {
      id: '11.1-c05',
      level: 'challenge',
      type: 'fill',
      stem: '两个两位数，十位数字分别是 $a$ 和 $10-a$，个位数字都是 $c$（如 $37$ 和 $77$）。(1) 它们的积可以写成 $100\\times(\\ \\ )+c^{2}$，括号里填一个含 $a$、$c$ 的整式；(2) 两个这样的数的积是 $2016$，求这两个数；(3) 如果这两个数不相同，它们的积最大是多少？',
      blanks: [
        { kind: 'expr', label: '(1) 括号里是', answer: '-a^2+10a+c', simplified: true },
        { kind: 'num', label: '(2) 较小的数是', answer: '24' },
        { kind: 'num', label: '较大的数是', answer: '84' },
        { kind: 'num', label: '(3) 积最大是', answer: '3381' },
      ],
      explain: [
        '(1) 两个数是 $10a+c$ 和 $10(10-a)+c=100-10a+c$。',
        '$(10a+c)(100-10a+c)=1000a-100a^{2}+10ac+100c-10ac+c^{2}=100(10a-a^{2}+c)+c^{2}$，括号里是 $-a^{2}+10a+c$。',
        '验证：$37\\times77$，$a=3$，$c=7$，$100\\times(21+7)+49=2849$。',
        '(2) $c$ 是一位数，$c^{2}\\le81<100$，所以积的末两位就是 $c^{2}$：$c^{2}=16$，$c=4$。',
        '前面部分：$a(10-a)+4=20$，$a(10-a)=16$，$a=2$ 或 $8$，两种得到的是同一对数：$24$ 和 $84$。验证 $24\\times84=2016$。',
        '(3) 积 $=100[a(10-a)+c]+c^{2}$，$c$ 越大越好，取 $c=9$；$a(10-a)$ 在 $a=5$ 时最大，但这时两个数都是 $59$，相同，不行。',
        '$a=4$ 或 $6$ 时 $a(10-a)=24$ 最大，积 $=100\\times(24+9)+81=3381$，即 $49\\times69$。',
      ],
      verify: () => {
        let best = 0;
        let pair = null;
        for (let a = 1; a <= 9; a++) {
          for (let c = 0; c <= 9; c++) {
            const x = 10 * a + c;
            const y = 10 * (10 - a) + c;
            if (x * y === 2016 && x < y) pair = [x, y];
            if (x !== y) best = Math.max(best, x * y);
          }
        }
        const inner = Poly.of('(10a+c)(100-10a+c)').sub(Poly.of('c^2')).scale(F('1/100'));
        return [String(inner), ...pair, best];
      },
    },
  ],
});
