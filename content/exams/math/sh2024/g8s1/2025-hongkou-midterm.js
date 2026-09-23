'use strict';

// 2025～2026 学年上海虹口区初二上学期期中数学试卷原题。
// 题干、数据和选项保持原卷；章、节、知识点和难度为项目分析元数据。
(function () {
  const chapterTitles = { 19: '实数', 20: '二次根式', 21: '一元二次方程' };
  const sectionTitles = {
    '19.1': '平方根与立方根',
    '19.2': '实数',
    '20.1': '二次根式及其性质',
    '20.2': '二次根式的运算',
    '21.1': '一元二次方程的概念',
    '21.2': '一元二次方程的解法',
    '21.3': '一元二次方程的判别式',
    '21.4': '一元二次方程的根与系数的关系',
    '21.5': '一元二次方程的应用',
  };

  function q(originalNo, section, topic, difficulty, difficultyReason, def) {
    const chapter = Number(section.split('.')[0]);
    return {
      id: 'hk2025-q' + String(originalNo).padStart(2, '0'),
      originalNo,
      chapter,
      chapterTitle: chapterTitles[chapter],
      section,
      sectionTitle: sectionTitles[section],
      topic,
      difficulty,
      difficultyReason,
      ...def,
    };
  }

  Content.exam({
    id: 'math/sh2024/g8s1/2025-hongkou-midterm',
    volumeId: 'math/sh2024/g8s1',
    title: '2025～2026 学年上海虹口区初二上学期期中数学试卷',
    source: {
      kind: 'exam-original',
      name: '2025～2026 学年上海虹口区初二上学期期中数学试卷',
      note: '题目保持原卷，答案与解析依据所附详解整理。',
    },
    questions: [
      q(1, '19.2', '有理数与无理数的辨别', 1, '直接根据数的表示形式判断，只有一个概念步骤。', {
        type: 'choice',
        stem: '下列各数中是无理数的是（　）．',
        options: ['$\\sqrt[3]{16}$', '$\\frac{22}{7}$', '$0.23$', '$0.1010010001$'],
        answer: 0,
        explain: ['$\\frac{22}{7}$ 是分数，$0.23$ 与 $0.1010010001$ 是有限小数，都是有理数。', '$\\sqrt[3]{16}$ 是无限不循环小数，是无理数，选 A。'],
      }),
      q(2, '21.1', '一元二次方程的概念', 1, '逐项核对一元、二次、整式三个条件。', {
        type: 'choice',
        stem: '下列方程是一元二次方程的是（　）．',
        options: ['$2x^2-3y+1=0$', '$x^2-\\frac1x=0$', '$y^2=0$', '$x^2-5=x(x-1)$'],
        answer: 2,
        explain: ['A 含有两个未知数；B 不是整式方程；D 化简后是一元一次方程。', 'C 只含一个未知数，且最高次数是 2，是一元二次方程，选 C。'],
      }),
      q(3, '19.1', '平方根与立方根', 1, '辨析平方根、算术平方根与立方根的基本定义。', {
        type: 'choice',
        stem: '下列计算正确的是（　）．',
        options: ['$\\sqrt9=\\pm3$', '$\\sqrt{-8}=-2$', '$-\\sqrt[3]{-27}=3$', '$\\sqrt[3]{16}=4$'],
        answer: 2,
        explain: ['$\\sqrt9=3$；$\\sqrt{-8}$ 在实数范围内没有意义；$\\sqrt[3]{16}\\ne4$。', '$-\\sqrt[3]{-27}=-(-3)=3$，选 C。'],
      }),
      q(4, '21.3', '一元二次方程根的判别式', 1, '分别计算四个方程的判别式并判断根的情况。', {
        type: 'choice',
        stem: '下列方程中，有两个不相等的实数根的方程是（　）．',
        options: ['$x^2+1=0$', '$x^2+2x+1=0$', '$x^2-x+1=0$', '$x^2+3x+1=0$'],
        answer: 3,
        explain: ['四个方程的判别式依次为 $-4,0,-3,5$。', '只有 D 的判别式大于 0，所以它有两个不相等的实数根。'],
      }),
      q(5, '20.1', '二次根式的性质与化简', 3, '先由根式有意义确定符号，再正确处理绝对值。', {
        type: 'choice',
        stem: '二次根式 $x\\sqrt{-\\frac1x}$ 化成最简结果为（　）．',
        options: ['$\\sqrt{x}$', '$-\\sqrt{-x}$', '$-\\sqrt{x}$', '$\\sqrt{-x}$'],
        answer: 1,
        explain: ['由 $-\\frac1x>0$，得 $x<0$。', '$x\\sqrt{-\\frac1x}=x\\sqrt{\\frac1{x^2}\\cdot(-x)}=x\\left|\\frac1x\\right|\\sqrt{-x}=-\\sqrt{-x}$，选 B。'],
      }),
      q(6, '20.1', '非负数和为零与三角形存在性', 3, '先由非负数和为零求边长，再分腰长情况检验三角形。', {
        type: 'choice',
        stem: '已知 $a,b$ 是等腰三角形的两边长，且 $a,b$ 满足 $\\sqrt{a-b+4}+(a+b-10)^2=0$，则此等腰三角形周长为（　）．',
        options: ['13', '13或14', '17', '13或17'],
        answer: 2,
        explain: ['两个非负数的和为 0，所以 $a-b+4=0$ 且 $a+b-10=0$，解得 $a=3,b=7$。', '若 3 为腰长，$3+3<7$，不能组成三角形；若 7 为腰长，周长为 $3+7+7=17$，选 C。'],
      }),
      q(7, '19.1', '平方根', 1, '直接根据平方根定义作答。', {
        type: 'fill',
        stem: '$\\frac94$ 的平方根是______．',
        blanks: [{ kind: 'nums', answer: ['3/2', '-3/2'] }],
        explain: ['因为 $(\\pm\\frac32)^2=\\frac94$，所以 $\\frac94$ 的平方根是 $\\pm\\frac32$。'],
      }),
      q(8, '19.1', '算术平方根的估算', 1, '用相邻完全平方数夹逼即可。', {
        type: 'fill',
        stem: '$\\sqrt{17}$ 的整数部分是______．',
        blanks: [{ kind: 'num', answer: '4' }],
        explain: ['因为 $4^2<17<5^2$，所以 $4<\\sqrt{17}<5$，整数部分是 4。'],
      }),
      q(9, '20.1', '二次根式有意义的条件', 1, '只需令被开方数非负。', {
        type: 'fill',
        stem: '要使式子 $\\sqrt{a+1}$ 有意义，则 $a$ 的取值范围是______．',
        blanks: [{ kind: 'text', answer: ['a≥-1', 'a>=-1', 'a≥−1'] }],
        explain: ['由 $a+1\\ge0$，得 $a\\ge-1$。'],
      }),
      q(10, '19.2', '循环小数化分数', 2, '需要利用十进制位移消去循环部分。', {
        type: 'fill',
        stem: '将 $0.\\dot1\\dot5$ 化成分数是______．',
        blanks: [{ kind: 'text', answer: ['5/33'] }],
        explain: ['设 $x=0.1515\\ldots$，则 $100x=15.1515\\ldots$。', '两式相减得 $99x=15$，所以 $x=\\frac{15}{99}=\\frac5{33}$。'],
      }),
      q(11, '19.2', '科学记数法', 1, '移动小数点并确定负指数。', {
        type: 'fill',
        stem: '“白日不到处，青春恰自来．苔花如米小，也学牡丹开．”这是清朝袁枚的一首诗《苔》．苔花的花粉直径约为 $0.0000084\\text{m}$，用科学记数法表示 $0.0000084$ 为______．',
        blanks: [{ kind: 'text', answer: ['8.4×10^-6', '8.4*10^-6', '8.4×10⁻6'] }],
        explain: ['$0.0000084=8.4\\times10^{-6}$。'],
      }),
      q(12, '20.1', '同类二次根式', 2, '同时比较根指数与被开方数，列出两个条件。', {
        type: 'fill',
        stem: '若最简二次根式 $\\sqrt{1-2a}$ 和 $\\sqrt[b-1]{7}$ 是同类二次根式，那么 $a+b$ 的值是______．',
        blanks: [{ kind: 'num', answer: '0' }],
        explain: ['由同类二次根式的条件，得 $1-2a=7$，且 $b-1=2$。', '所以 $a=-3,b=3$，从而 $a+b=0$。'],
      }),
      q(13, '20.2', '含二次根式系数的一元一次不等式', 3, '移项后要判断根式系数差的符号，再有理化。', {
        type: 'fill',
        stem: '不等式 $\\sqrt3x+3<\\sqrt5x-1$ 的解集是______．',
        blanks: [{ kind: 'text', answer: ['x>2√3+2√5', 'x＞2√3+2√5'] }],
        explain: ['整理得 $x(\\sqrt3-\\sqrt5)<-4$。因为 $\\sqrt3-\\sqrt5<0$，所以 $x>\\frac4{\\sqrt5-\\sqrt3}$。', '分母有理化得 $x>2\\sqrt3+2\\sqrt5$。'],
      }),
      q(14, '19.1', '立方根的小数点规律', 2, '识别被开方数缩小 1000 倍时立方根缩小 10 倍。', {
        type: 'fill',
        stem: '观察下表规律：$a$ 依次为 $0.008,8,8000,8000000$ 时，$\\sqrt[3]{a}$ 依次为 $0.2,2,20,200$．利用规律解答，若 $\\sqrt[3]{2.37}\\approx1.333$，$\\sqrt[3]{23.7}\\approx2.872$，则 $\\sqrt[3]{0.0237}\\approx$______．',
        blanks: [{ kind: 'num', answer: '0.2872' }],
        explain: ['$0.0237=23.7\\div1000$，所以 $\\sqrt[3]{0.0237}=\\sqrt[3]{23.7}\\div10\\approx0.2872$。'],
      }),
      q(15, '20.1', '根式与绝对值的化简', 3, '把四个根式化为绝对值后，还要结合数轴位置逐个去绝对值。', {
        type: 'fill',
        stem: '已知实数 $a,b,c$ 在数轴上的对应点如图所示，化简：$\\sqrt{a^2}-\\sqrt{(b-c)^2}+\\sqrt{(c-a)^2}+\\sqrt{(b+c)^2}$．',
        figure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 82" width="350" height="82" font-family="serif" font-size="17"><line x1="20" y1="38" x2="330" y2="38" stroke="#222" stroke-width="1.5"/><path d="M328 33 L338 38 L328 43 Z" fill="#222"/><line x1="58" y1="31" x2="58" y2="45" stroke="#222"/><line x1="130" y1="31" x2="130" y2="45" stroke="#222"/><line x1="208" y1="31" x2="208" y2="45" stroke="#222"/><line x1="265" y1="31" x2="265" y2="45" stroke="#222"/><text x="53" y="68">b</text><text x="125" y="68">a</text><text x="203" y="68">0</text><text x="260" y="68">c</text></svg>',
        blanks: [{ kind: 'text', answer: ['-2a-c', '−2a−c'] }],
        explain: ['由图可知 $b<a<0<c$ 且 $b+c<0$。原式为 $|a|-|b-c|+|c-a|+|b+c|$。', '依次去绝对值得 $-a+(b-c)+(c-a)-(b+c)=-2a-c$。'],
      }),
      q(16, '20.1', '二次根式的几何应用', 2, '先求正方形面积，再由圆面积求半径。', {
        type: 'fill',
        stem: '有一个圆的面积和边长为 $\\sqrt{6\\pi}$ 的正方形的面积相同，则此圆的半径为______．',
        blanks: [{ kind: 'text', answer: ['√6', 'sqrt(6)'] }],
        explain: ['正方形面积为 $(\\sqrt{6\\pi})^2=6\\pi$。设圆半径为 $r$，则 $\\pi r^2=6\\pi$，所以 $r=\\sqrt6$。'],
      }),
      q(17, '21.4', '一元二次方程根与系数的关系', 2, '由根的和与积表示平方和，再求参数。', {
        type: 'fill',
        stem: '若关于 $x$ 的方程 $x^2-4x-k=0$ 的两根为 $x_1,x_2$，且 $x_1^2+x_2^2=10$，则 $k=$______．',
        blanks: [{ kind: 'num', answer: '-3' }],
        explain: ['$x_1+x_2=4,x_1x_2=-k$。', '$x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=16+2k=10$，所以 $k=-3$。'],
      }),
      q(18, '19.2', '数轴上的无理数与规律', 4, '要理解连续作图规则，发现距离交替出现的规律。', {
        type: 'fill',
        stem: '如图，在数轴上表示实数 $\\sqrt2$ 的点记为 $A_1$，在数轴上和点 $A_1$ 距离最近的表示整数的点记为 $B_1$；以 $B_1$ 为圆心，$A_1B_1$ 为半径画半圆交数轴于点 $A_2$，点 $A_2$ 右侧最近的表示整数的点记为 $B_2$；再以 $B_2$ 为圆心，$A_2B_2$ 为半径画半圆交数轴于点 $A_3$……按此规律进行下去，则 $A_8B_8=$______．',
        figure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 590 150" width="590" height="150" font-family="serif" font-size="15"><line x1="25" y1="100" x2="565" y2="100" stroke="#222" stroke-width="1.5"/><path d="M563 95 L573 100 L563 105 Z" fill="#222"/><g stroke="#222"><line x1="55" y1="94" x2="55" y2="106"/><line x1="145" y1="94" x2="145" y2="106"/><line x1="235" y1="94" x2="235" y2="106"/><line x1="325" y1="94" x2="325" y2="106"/><line x1="415" y1="94" x2="415" y2="106"/><line x1="505" y1="94" x2="505" y2="106"/></g><g fill="none" stroke="#555"><path d="M182 100 A53 53 0 0 1 288 100"/><path d="M288 100 A37 37 0 0 1 362 100"/><path d="M362 100 A53 53 0 0 1 468 100"/></g><g><text x="50" y="127">0</text><text x="140" y="127">1</text><text x="230" y="127">2</text><text x="320" y="127">3</text><text x="410" y="127">4</text><text x="500" y="127">5</text><text x="174" y="91">A₁</text><text x="226" y="91">B₁</text><text x="280" y="91">A₂</text><text x="316" y="91">B₂</text><text x="354" y="91">A₃</text><text x="406" y="91">B₃</text></g></svg>',
        blanks: [{ kind: 'text', answer: ['√2-1', '√2−1'] }],
        explain: ['$A_1B_1=2-\\sqrt2$，作半圆后得到 $A_2B_2=\\sqrt2-1$。', '继续作图可见两种长度交替出现：奇数项为 $2-\\sqrt2$，偶数项为 $\\sqrt2-1$。因此 $A_8B_8=\\sqrt2-1$。'],
      }),
      q(19, '20.2', '二次根式的混合运算', 2, '涉及分母有理化、完全平方公式和绝对值。', {
        type: 'fill',
        stem: '计算：$\\frac1{2+\\sqrt3}-(\\sqrt3-1)^2-\\sqrt{(1-\\sqrt3)^2}$．',
        blanks: [{ kind: 'num', answer: '-1' }],
        explain: ['$\\frac1{2+\\sqrt3}=2-\\sqrt3$，$(\\sqrt3-1)^2=4-2\\sqrt3$，$\\sqrt{(1-\\sqrt3)^2}=\\sqrt3-1$。', '代入合并，结果为 $-1$。'],
      }),
      q(20, '20.2', '二次根式的乘除', 3, '含字母的根式连续乘除，并需结合正值条件化简。', {
        type: 'fill',
        stem: '计算：$\\frac2m\\sqrt{m^2n}\\times\\left(\\frac32\\sqrt{mn^2}\\right)\\div\\left(\\frac13\\sqrt{\\frac mn}\\right)\\ (m>0)$．',
        blanks: [{ kind: 'text', answer: ['9n^2', '9n²'] }],
        explain: ['系数部分为 $\\frac2m\\times\\frac32\\div\\frac13=\\frac9m$。', '根式部分为 $\\sqrt{m^2n\\cdot mn^2\\div(m/n)}=\\sqrt{m^2n^4}=mn^2$，所以结果为 $9n^2$。'],
      }),
      q(21, '21.2', '因式分解法解一元二次方程', 1, '整理后可直接因式分解。', {
        type: 'fill',
        stem: '解方程：$(x+2)(x-4)=7$．',
        blanks: [{ kind: 'nums', answer: ['5', '-3'] }],
        explain: ['展开并整理得 $x^2-2x-15=0$。', '因式分解为 $(x-5)(x+3)=0$，所以 $x_1=5,x_2=-3$。'],
      }),
      q(22, '21.2', '换元法解一元二次方程', 2, '把重复出现的整体作为新元，再还原求解。', {
        type: 'fill',
        stem: '解方程：$(x-5)^2+2(x-5)-24=0$．',
        blanks: [{ kind: 'nums', answer: ['-1', '9'] }],
        explain: ['设 $y=x-5$，则 $y^2+2y-24=0$，即 $(y+6)(y-4)=0$。', '所以 $y=-6$ 或 4，得到 $x_1=-1,x_2=9$。'],
      }),
      q(23, '20.2', '二次根式的化简求值', 3, '先利用平方差和完全平方结构约分，再代入根式值。', {
        type: 'fill',
        stem: '先化简，再求值：$\\frac{m-n}{\\sqrt m-\\sqrt n}+\\frac{m-4\\sqrt{mn}+4n}{\\sqrt m-2\\sqrt n}$，其中 $m=\\frac12,n=\\frac1{18}$．',
        blanks: [{ kind: 'text', answer: ['5√2/6', '(5/6)√2', '5/6√2'] }],
        explain: ['原式 $=\\sqrt m+\\sqrt n+\\sqrt m-2\\sqrt n=2\\sqrt m-\\sqrt n$。', '代入 $m=\\frac12,n=\\frac1{18}$，得 $2\\cdot\\frac{\\sqrt2}2-\\frac{\\sqrt2}6=\\frac56\\sqrt2$。'],
      }),
      q(24, '19.2', '数轴上的无理数与折叠', 4, '由面积确定无理数长度，再连续完成数轴平移和轴对称。', {
        type: 'fill',
        stem: '如图1，由5个边长为1的小正方形组成的长方形，通过剪拼可以拼成一个正方形 $ABCD$．\n（1）正方形 $ABCD$ 的边长 $AB$ 的长在两个连续整数______和______之间．\n（2）如图2，纸片上有数轴，把图1中的正方形 $ABCD$ 放到数轴上，使得点 $A$ 与 $-1$ 重合，点 $D$ 在数轴上表示的数是______．\n（3）在（2）的基础上以数2对应的点为折叠点，将数轴向右对折，则点 $D$ 与数______对应的点重合．',
        figure: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 165" width="620" height="165" font-family="serif" font-size="16"><g transform="translate(15,20)"><rect x="0" y="35" width="150" height="30" fill="none" stroke="#222"/><path d="M30 35v30M60 35v30M90 35v30M120 35v30" stroke="#222"/><text x="45" y="90">图1</text><path d="M170 50h30" stroke="#222"/><path d="M195 45l10 5-10 5z" fill="#222"/><rect x="220" y="5" width="72" height="72" fill="none" stroke="#222"/><text x="213" y="2">C</text><text x="286" y="2">B</text><text x="213" y="93">D</text><text x="286" y="93">A</text></g><g transform="translate(350,20)"><rect x="0" y="5" width="72" height="72" fill="none" stroke="#222"/><text x="-8" y="2">C</text><text x="67" y="2">B</text><text x="-8" y="93">D</text><text x="67" y="93">A</text><line x1="-20" y1="77" x2="245" y2="77" stroke="#222"/><path d="M243 72l10 5-10 5z" fill="#222"/><g stroke="#222"><path d="M5 72v10M37 72v10M72 72v10M104 72v10M136 72v10M168 72v10M200 72v10"/></g><g><text x="-2" y="104">−3</text><text x="30" y="104">−2</text><text x="65" y="104">−1</text><text x="100" y="104">0</text><text x="132" y="104">1</text><text x="164" y="104">2</text><text x="196" y="104">3</text><text x="75" y="130">图2</text></g></g></svg>',
        blanks: [
          { kind: 'num', label: '（1）第一个整数', answer: '2' },
          { kind: 'num', label: '（1）第二个整数', answer: '3' },
          { kind: 'text', label: '（2）', answer: ['-1-√5', '−1−√5'] },
          { kind: 'text', label: '（3）', answer: ['5+√5'] },
        ],
        explain: ['（1）正方形面积为 5，边长为 $\\sqrt5$。因为 $2<\\sqrt5<3$，所以填 2、3。', '（2）点 $A$ 表示 $-1$，点 $D$ 在其左侧 $\\sqrt5$ 个单位，表示 $-1-\\sqrt5$。', '（3）设折叠后重合点表示 $x$，折痕表示 2，则 $\\frac{-1-\\sqrt5+x}{2}=2$，解得 $x=5+\\sqrt5$。'],
      }),
      q(25, '20.2', '复合二次根式的化简', 4, '从示例识别完全平方结构，并分别处理和式与差式。', {
        type: 'fill',
        stem: '观察下列等式：\n$\\sqrt{3+2\\sqrt2}=\\sqrt{(\\sqrt1+\\sqrt2)^2}=1+\\sqrt2$；\n$\\sqrt{5+2\\sqrt6}=\\sqrt{(\\sqrt2+\\sqrt3)^2}=\\sqrt2+\\sqrt3$；\n$\\sqrt{7+2\\sqrt{12}}=\\sqrt{(\\sqrt3+\\sqrt4)^2}=\\sqrt3+2$．\n根据以上的等式回答问题：\n（1）填空：$\\sqrt{13+2\\sqrt{42}}=$______．\n（2）化简 $\\sqrt{10-4\\sqrt6}$，并写出化简过程．',
        blanks: [
          { kind: 'text', label: '（1）', answer: ['√6+√7', '√7+√6'] },
          { kind: 'text', label: '（2）', answer: ['√6-2', '√6−2'] },
        ],
        explain: ['（1）$13=6+7$ 且 $2\\sqrt{42}=2\\sqrt6\\sqrt7$，所以 $\\sqrt{13+2\\sqrt{42}}=\\sqrt6+\\sqrt7$。', '（2）$10-4\\sqrt6=6-4\\sqrt6+4=(\\sqrt6-2)^2$。因为 $\\sqrt6>2$，所以 $\\sqrt{10-4\\sqrt6}=\\sqrt6-2$。'],
      }),
      q(26, '21.4', '判别式与根的关系综合', 4, '先用判别式限制参数，再用根的和与积列方程并筛选。', {
        type: 'fill',
        stem: '已知关于 $x$ 的一元二次方程 $x^2-2(m-1)x+m^2-3=0$．\n（1）如果方程有两个实数根，求 $m$ 的取值范围．\n（2）如果方程的两根之和等于两根之积，求 $m$ 的值．',
        blanks: [
          { kind: 'text', label: '（1）', answer: ['m≤2', 'm<=2'] },
          { kind: 'text', label: '（2）', answer: ['1-√2', '1−√2'] },
        ],
        explain: ['（1）$\\Delta=4(m-1)^2-4(m^2-3)=-8m+16\\ge0$，所以 $m\\le2$。', '（2）由根与系数的关系，$x_1+x_2=2(m-1)$，$x_1x_2=m^2-3$。依题意得 $2(m-1)=m^2-3$。', '解得 $m=1\\pm\\sqrt2$，结合 $m\\le2$，得到 $m=1-\\sqrt2$。'],
      }),
      q(27, '20.2', '分母有理化与整体代入', 5, '先从有理化结果构造平方关系，再提取整体完成高次式求值。', {
        type: 'fill',
        stem: '请阅读下列材料：\n已知 $x=\\frac{\\sqrt3-2}{\\sqrt3+2}$，求代数式 $x^3+14x^2+x+2023$ 的值．\n小熙根据二次根式的性质及整体代入思想，给出了如下解法：\n由 $x=\\frac{\\sqrt3-2}{\\sqrt3+2}$ 分母有理化得 $x=\\frac{(\\sqrt3-2)^2}{(\\sqrt3+2)(\\sqrt3-2)}=4\\sqrt3-7$；\n但直接代入太繁琐，转而寻求整体关系：由 $x=4\\sqrt3-7$ 得 $x+7=4\\sqrt3$，两边平方得 $(x+7)^2=(4\\sqrt3)^2$，得 $x^2+14x+49=48$，则 $x^2+14x=-1$；\n观察原代数式 $x^3+14x^2+x+2023$，注意到前两项可提取公因式，$x^3+14x^2=x(x^2+14x)$，代入 $x^2+14x=-1$，得 $x(x^2+14x)+x+2023=(-1)\\cdot x+x+2023=2023$，因此，原式的值为2023．\n请运用上述思想方法解决下列问题：\n（1）已知 $x=\\frac{\\sqrt5-\\sqrt6}{\\sqrt5+\\sqrt6}$，求代数式 $x^3+22x^2+x+2024$ 的值．\n（2）已知 $x=\\frac{\\sqrt5+3}{\\sqrt5-3}$，求代数式 $x^3+7x^2+3x+2025$ 的值．',
        blanks: [
          { kind: 'num', label: '（1）', answer: '2024' },
          { kind: 'text', label: '（2）', answer: ['2018-3√5', '2018−3√5'] },
        ],
        explain: ['（1）有理化得 $x=2\\sqrt{30}-11$，所以 $x+11=2\\sqrt{30}$。平方得 $x^2+22x=-1$，原式 $=x(x^2+22x)+x+2024=2024$。', '（2）有理化得 $x=-\\frac{3\\sqrt5+7}{2}$，所以 $-2x-7=3\\sqrt5$。平方得 $x^2+7x=-1$。', '原式 $=x(x^2+7x)+3x+2025=2x+2025=2018-3\\sqrt5$。'],
      }),
    ],
  });
})();
