'use strict';

// 数学魔术揭秘：关卡内容和页面。在应用内渲染（#/g/magic/<关卡ID>），入口挂在 2.3 小节页。
// 每一关是一串“部件”（parts）：文字、表演（计算器、撕牌、试一试）、问题。做完一个互动部件才出现下一个。
// 包在函数里：几个游戏脚本都用普通 <script> 加载，顶层常量会互相冲突
(function () {
  const ML = typeof MagicLogic !== 'undefined' ? MagicLogic : require('./logic.js');

  const CHAPTERS = [
    { no: '1', title: '春晚计算器', short: '计算器' },
    { no: '2', title: '春晚撕牌', short: '撕牌' },
    { no: '3', title: '代数魔术', short: '代数' },
  ];

  // 部件：
  //   { t: 'text', md }                                   说明文字（支持 $...$ 和 **粗体**）
  //   { t: 'choice', stem, options, answer, explain }     选择题
  //   { t: 'fill', stem, blanks: [{ label, kind, answer, simplified }], explain }  填空，kind 同 answer.js
  //   { t: 'calc' } 计算器表演   { t: 'cards' } 撕牌表演   { t: 'luck' } 好运留下来演示器（不挡后面）
  //   { t: 'try', ops, need } 想一个数试一试   { t: 'birthday' } 生日魔术   { t: 'build' } 自己设计   { t: 't1089', need }
  const LEVELS = [
    {
      id: '1-1', title: '计算器预言',
      parts: [
        { t: 'text', md: '2026 年春晚，魔术师邓男子表演了《惊喜定格》：三位观众，甲说一个四位数，乙说一个五位数，丙拿着计算器闭眼乱按一个七位数。三个数一加，结果是 **2162227**，正好是节目进行到的那一刻：**2 月 16 日 22:27**。据网上的复盘，现场的三个数是 $1106$、$88396$、$2072725$。' },
        { t: 'text', md: '下面这个计算器也能“预言”。你一个人扮演三位观众，看看结果是什么。' },
        { t: 'calc' },
        { t: 'choice', stem: '丙“乱按”时，屏幕上出现的数由什么决定？',
          options: ['丙按了哪些键', '目标数和甲、乙的数，是程序事先算好的', '完全随机，碰巧凑上了', '只由甲的数决定'],
          answer: 1,
          explain: '计算器是特制的：丙不管按哪个键，屏幕都按顺序显示事先算好的数（目标数减去甲、乙两数之和）的各位数字。甲、乙的数是真随机的，丙的数是算出来的，三个数一加当然正好是目标数。' },
      ],
    },
    {
      id: '1-2', title: '你来当魔术师',
      parts: [
        { t: 'text', md: '现在你是计算器里的“暗箱程序”：知道目标数和前面观众的数，算出屏幕该显示几。' },
        { t: 'fill', stem: '春晚现场：目标数 $2162227$，甲 $1106$，乙 $88396$。丙的屏幕该显示？',
          blanks: [{ kind: 'num', answer: 2072725 }], check: { target: 2162227, nums: [1106, 88396] },
          explain: '$1106+88396=89502$，$2162227-89502=2072725$，和现场一样。' },
        { t: 'fill', stem: '9 月 24 日 18:30 表演，目标数是 $9241830$。甲 $4519$，乙 $27386$。丙的屏幕该显示？',
          blanks: [{ kind: 'num', answer: 9209925 }], check: { target: 9241830, nums: [4519, 27386] },
          explain: '$4519+27386=31905$，$9241830-31905=9209925$。' },
        { t: 'fill', stem: '有理数版：目标数 $-20$，甲报 $-37$，乙报 $15$。丙该是几？',
          blanks: [{ kind: 'num', answer: 2 }], check: { target: -20, nums: [-37, 15] },
          explain: '甲、乙的和是 $-37+15=-22$，$-20-(-22)=-20+22=2$。减去一个负数，等于加上它的相反数。' },
        { t: 'fill', stem: '目标数 $3.5$，甲报 $-4.25$，乙报 $7.5$，丙报 $-\\frac{3}{4}$，丁该是几？',
          blanks: [{ kind: 'num', answer: 1 }], check: { target: 3.5, nums: [-4.25, 7.5, -0.75] },
          explain: '前三个数的和是 $-4.25+7.5-0.75=2.5$，$3.5-2.5=1$。人再多，也是用目标数减去前面所有数的和。' },
      ],
    },
    {
      id: '1-3', title: '用字母揭秘',
      parts: [
        { t: 'text', md: '不管哪天表演、观众说什么数，方法都一样。用字母把它写出来：目标数是 $t$，甲说 $a$，乙说 $b$。' },
        { t: 'fill', stem: '丙的屏幕该显示的数，用 $t$、$a$、$b$ 表示是？',
          blanks: [{ kind: 'expr', answer: 't-a-b' }],
          explain: '丙的数是 $t-(a+b)$，也就是 $t-a-b$。' },
        { t: 'fill', stem: '三个数相加：$a+b+(t-a-b)$，化简的结果是？',
          blanks: [{ kind: 'expr', answer: 't', simplified: true }],
          explain: '$a$ 和 $-a$、$b$ 和 $-b$ 抵消，只剩 $t$。不管 $a$、$b$ 是多少，和都是 $t$。' },
        { t: 'fill', stem: '换个玩法：魔术师让大家算“甲 − 乙 − 丙”，结果还要是 $t$。丙的屏幕该显示？',
          blanks: [{ kind: 'expr', answer: 'a-b-t' }],
          explain: '设丙是 $c$，要 $a-b-c=t$，$c$ 就是 $a-b-t$。检验：$a-b-(a-b-t)=t$。' },
        { t: 'choice', stem: '如果丙真的是随便按的，这个魔术还能成功吗？',
          options: ['能，三个数相加总能凑出目标数', '几乎不能，除非碰巧按出了 $t-a-b$', '能，因为目标数是时间'],
          answer: 1,
          explain: '这个魔术的关键是**藏起来的一步**：真正“变”出结果的是计算器程序，数学只负责算出 $t-a-b$。后面第 3 章的代数魔术不一样，每一步都公开，照样能猜中。' },
      ],
    },
    {
      id: '2-1', title: '跟着撕一次',
      parts: [
        { t: 'text', md: '2024 年春晚，刘谦表演《守岁共此时》：全国观众拿 4 张牌跟着他的口令撕牌、插牌、扔牌，最后手里剩下的半张，和一开始藏起来的半张拼成同一张牌。主持人尼格买提那一次没有对上，网上普遍认为是他有一步插牌没按要求做。' },
        { t: 'text', md: '牌堆从左到右摆，**左边是牌堆顶**。照着口令做一遍。' },
        { t: 'cards' },
        { t: 'choice', stem: '你选的名字字数、插牌位置、南方北方、男生女生，会影响最后能不能对上吗？',
          options: ['不会，怎么选都能对上', '会，只有某些选法能对上', '只有名字字数有影响'],
          answer: 0,
          explain: '可以回去换几种选法再做几次，每次都能对上。下一关看看为什么。' },
      ],
    },
    {
      id: '2-2', title: '揭秘：底牌没动过',
      parts: [
        { t: 'text', md: '用字母表示 4 张牌：撕开叠好后，8 个半张从顶到底是 $A\\,B\\,C\\,D\\,A\\,B\\,C\\,D$。' },
        { t: 'fill', stem: '名字有 3 个字，把顶上 3 张放到底下，变成 $D\\,A\\,B\\,C\\,D\\,A\\,B\\,C$。这时第 1 张和第几张是同一张牌？',
          blanks: [{ kind: 'num', answer: 5 }],
          explain: '顶上的牌放到底下只是“转圈”，“每隔 4 张是同一张牌”这件事不会变。名字几个字都一样。' },
        { t: 'choice', stem: '接着拿起顶上 3 张，插到剩下 5 张的中间。这时第 1 张和最后一张？',
          options: ['一定是同一张牌的两半', '一定不是同一张牌', '要看插在哪里'],
          answer: 0,
          explain: '拿走 3 张后剩 5 张，第 1 张和第 5 张隔了 4 张，是同一张牌。3 张插在它们**中间**，一个还在顶，一个还在底。' },
        { t: 'choice', stem: '把顶上一张藏起来，它的另一半在最底下。之后“南方人、北方人”从顶上拿牌插到中间，“男生、女生”从顶上扔牌。底牌会被动到吗？',
          options: ['不会，插在中间、从顶上扔都碰不到底牌', '会，扔牌时可能扔掉它', '说不准'],
          answer: 0,
          explain: '所以不管选什么，藏起来那半张的另一半一直在最底下。要是插牌时插到了最底下，底牌就被换掉了，魔术就会失败。' },
        { t: 'fill', stem: '男生扔 1 张后剩 6 张，底牌在第 6 张。念“见证奇迹的时刻”7 个字，每个字把顶上一张放到底下。念完后底牌在第几张？女生扔 2 张后剩 5 张，念完后底牌在第几张？',
          blanks: [{ label: '男生', kind: 'num', answer: 5 }, { label: '女生', kind: 'num', answer: 3 }],
          explain: '6 张转 6 次回到原样，7 次相当于转 1 次，第 6 张到了第 5 张。5 张转 7 次相当于转 2 次，第 5 张到了第 3 张。' },
        { t: 'luck' },
        { t: 'fill', stem: '“好运留下来，烦恼丢出去”：顶上一张放到底下，再扔掉顶上一张，直到剩一张。用上面的演示器试试：6 张时剩下原来的第几张？5 张时呢？',
          blanks: [{ label: '6 张', kind: 'num', answer: 5 }, { label: '5 张', kind: 'num', answer: 3 }],
          explain: '6 张剩第 5 张，5 张剩第 3 张，**正好是底牌念完 7 个字后的位置**。男生女生都能对上，这就是魔术的全部秘密。' },
      ],
    },
    {
      id: '2-3', title: '好运留下来的规律',
      parts: [
        { t: 'text', md: '“好运留下来，烦恼丢出去”是一个有名的数学问题，叫**约瑟夫问题**。n 张牌做完，剩下的是第几张？' },
        { t: 'luck' },
        { t: 'fill', stem: '用演示器把 1～8 张都试一遍，填出剩下的是第几张。',
          blanks: [1, 1, 3, 1, 3, 5, 7, 1].map((a, i) => ({ label: `${i + 1} 张`, kind: 'num', answer: a })),
          explain: '1、2、4、8 张时剩第 1 张；之后每多 1 张，剩下的位置往后挪 2。' },
        { t: 'fill', stem: '不用演示器，找规律：16 张、13 张、20 张时各剩第几张？',
          blanks: [{ label: '16 张', kind: 'num', answer: 1 }, { label: '13 张', kind: 'num', answer: 11 }, { label: '20 张', kind: 'num', answer: 9 }],
          explain: '16 是 1、2、4、8、16 这一串里的数，剩第 1 张。13 比 8 多 5，剩第 $1+2\\times5=11$ 张。20 比 16 多 4，剩第 $1+2\\times4=9$ 张。' },
        { t: 'fill', stem: '挑战：100 张时剩第几张？',
          blanks: [{ kind: 'num', answer: 73 }],
          explain: '不超过 100 的最大的“1、2、4、8……”是 64，100 比 64 多 36，剩第 $1+2\\times36=73$ 张。为什么是这样：每扔掉一张，就相当于张数少 1、起点往后挪 2；张数正好是 1、2、4、8……时，每一轮都扔掉一半，第 1 张一直留着。' },
      ],
    },
    {
      id: '2-4', title: '为什么是 7 个字', challenge: true,
      parts: [
        { t: 'text', md: '口令“见证奇迹的时刻”正好 7 个字。换一句口令还行吗？记住：念口令前男生剩 6 张、女生剩 5 张，底牌都在最后一张；“好运留下来”后，6 张剩第 5 张，5 张剩第 3 张。' },
        { t: 'fill', stem: '口令只有 5 个字，男生念完后底牌在第几张？',
          blanks: [{ kind: 'num', answer: 1 }],
          explain: '6 张转 5 次，第 6 张到了第 1 张。可“好运留下来”剩的是第 5 张，男生对不上。' },
        { t: 'fill', stem: '口令 1～20 个字，男生能对上的有哪几种字数？（用逗号隔开）',
          blanks: [{ kind: 'nums', answer: [1, 7, 13, 19] }],
          explain: '底牌要从第 6 张挪到第 5 张，要转 1 次；6 张每转 6 次回到原样，所以字数除以 6 余 1：1、7、13、19。' },
        { t: 'fill', stem: '口令 1～20 个字，女生能对上的有哪几种字数？',
          blanks: [{ kind: 'nums', answer: [2, 7, 12, 17] }],
          explain: '底牌要从第 5 张挪到第 3 张，要转 2 次；5 张每转 5 次回到原样，所以字数除以 5 余 2：2、7、12、17。' },
        { t: 'fill', stem: '男生女生都能对上的口令，最少几个字？再多一点的下一个是几个字？',
          blanks: [{ label: '最少', kind: 'num', answer: 7 }, { label: '下一个', kind: 'num', answer: 37 }],
          explain: '两串数的第一个公共数是 7，所以口令正好 7 个字。之后每隔 $6\\times5=30$ 个字再重合一次：37 个字也行，不过那就太长了。' },
      ],
    },
    {
      id: '3-1', title: '想一个数',
      parts: [
        { t: 'text', md: '前两章的魔术，一个靠藏起来的程序，一个靠固定的规则。这一章的魔术**每一步都公开**，照样能猜中。' },
        { t: 'text', md: '口令：想一个数，乘 2，加 6，除以 2，再减去你想的数。我猜结果是 3。换几个数试试，负数、分数也行。' },
        { t: 'try', ops: [{ op: '*', k: 2 }, { op: '+', k: 6 }, { op: '/', k: 2 }, { op: 'x', k: 1 }], need: 3 },
        { t: 'fill', stem: '设想的数是 $x$，写出每一步的结果（要化简）。',
          blanks: [
            { label: '乘 2', kind: 'expr', answer: '2x', simplified: true },
            { label: '加 6', kind: 'expr', answer: '2x+6', simplified: true },
            { label: '除以 2', kind: 'expr', answer: 'x+3', simplified: true },
            { label: '减去原数', kind: 'expr', answer: '3', simplified: true },
          ],
          explain: '$(2x+6)\\div2=x+3$，再减去 $x$ 就只剩 $3$。$x$ 在最后一步被消掉了，所以结果和你想的数无关。' },
        { t: 'fill', stem: '把“加 6”改成“加几”，结果就会是 7？',
          blanks: [{ kind: 'num', answer: 14 }],
          explain: '加 $k$ 时，最后结果是 $k\\div2$。要结果是 7，$k=14$。' },
      ],
    },
    {
      id: '3-2', title: '生日魔术',
      parts: [
        { t: 'text', md: '口令：出生月份乘 4，加 9，乘 25，加上出生的日，最后减 225。告诉我结果，我就知道你的生日。' },
        { t: 'birthday' },
        { t: 'fill', stem: '设月份是 $m$，日是 $d$，写出每一步的结果（要化简）。',
          blanks: [
            { label: '乘 4', kind: 'expr', answer: '4m', simplified: true },
            { label: '加 9', kind: 'expr', answer: '4m+9', simplified: true },
            { label: '乘 25', kind: 'expr', answer: '100m+225', simplified: true },
            { label: '加上日', kind: 'expr', answer: '100m+d+225', simplified: true },
            { label: '减 225', kind: 'expr', answer: '100m+d', simplified: true },
          ],
          explain: '$(4m+9)\\times25=100m+225$，加 $d$ 再减 225，得 $100m+d$。' },
        { t: 'choice', stem: '为什么从 $100m+d$ 能直接读出生日？',
          options: ['日最多 31，比 100 小，所以最后两位是日，前面是月份', '因为结果一定是四位数', '因为 225 是 15 的平方'],
          answer: 0,
          explain: '$100m$ 的最后两位是 0，加上不到 100 的 $d$，最后两位就是 $d$，前面的就是 $m$。比如 $100\\times9+24=924$，就是 9 月 24 日。' },
        { t: 'fill', stem: '有人算出的结果是 1207，他的生日是？',
          blanks: [{ label: '月', kind: 'num', answer: 12 }, { label: '日', kind: 'num', answer: 7 }],
          explain: '$1207=100\\times12+7$，12 月 7 日。' },
      ],
    },
    {
      id: '3-3', title: '自己设计魔术',
      parts: [
        { t: 'text', md: '用加、减、乘、除和“减去原数的几倍”，设计一串口令，让结果不管想什么数都一样。下面会实时显示每一步用 $x$ 表示的式子，想想怎样让 $x$ 消掉。' },
        { t: 'build' },
      ],
    },
    {
      id: '3-4', title: '1089', challenge: true,
      parts: [
        { t: 'text', md: '口令：想一个三位数，百位和个位至少相差 2。把它倒过来写，用大数减小数；再把差倒过来写，和差相加。我猜结果是 1089。' },
        { t: 't1089', need: 2 },
        { t: 'fill', stem: '设三位数百位是 $a$、十位是 $b$、个位是 $c$（$a>c$），它是 $100a+10b+c$。倒过来是 $100c+10b+a$。两数相减，化简是？',
          blanks: [{ kind: 'expr', answer: '99a-99c', simplified: true }],
          explain: '$(100a+10b+c)-(100c+10b+a)=99a-99c$，十位的 $b$ 抵消了。差总是 99 的倍数。' },
        { t: 'fill', stem: '$a-c$ 可以是 2～9，差就是 $99\\times(a-c)$。把所有可能的差写出来。',
          blanks: [{ kind: 'nums', answer: [198, 297, 396, 495, 594, 693, 792, 891] }],
          explain: '198、297、396、495、594、693、792、891。' },
        { t: 'choice', stem: '这些差有什么共同点，让“倒过来相加”总是 1089？',
          options: ['十位都是 9，百位加个位都是 9', '都是奇数', '百位都比个位小'],
          answer: 0,
          explain: '倒过来相加时，百位和个位互换：百位上是 9 个百，个位上是 9 个一，十位是 $9+9=18$ 个十。$900+180+9=1089$。' },
        { t: 'fill', stem: '如果百位和个位只差 1，比如 564，差是几？',
          blanks: [{ kind: 'num', answer: 99 }],
          explain: '$564-465=99$，只有两位。要是把它看成 099，倒过来是 990，$99+990=1089$ 仍然成立；但大家一般不会这样写，所以口令要求“至少相差 2”。' },
      ],
    },
  ];

  // ---------- 存档 xq.magic.v1：{ done: [关卡ID] } ----------
  const STORE = 'xq.magic.v1';
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE));
      return d && Array.isArray(d.done) ? d : { done: [] };
    } catch (e) { return { done: [] }; }
  }
  function save(d) {
    try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) { /* 存不了就算了 */ }
  }

  // 不挡后面内容的部件
  const PASSIVE = new Set(['text', 'luck']);

  // ---------- 页面 ----------
  const SUITS = ['♠', '♥', '♣', '♦'];
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  function mount(main, levelId) {
    const R = Quiz.renderText;
    const esc = Quiz.escapeHtml;
    const Frac = Answer.Frac;
    const fx = v => R(`$${Frac.of(v).toTeX()}$`);
    let level;

    const root = document.createElement('div');
    root.className = 'mg-game';
    main.appendChild(root);

    const el = (tag, cls, html) => {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (html != null) e.innerHTML = html;
      return e;
    };

    function chips() {
      const d = load();
      return CHAPTERS.map(ch =>
        `<div class="mg-chapter"><span title="${esc(ch.title)}">${esc(ch.short)}</span>` +
        LEVELS.filter(l => l.id.startsWith(ch.no + '-')).map(l =>
          `<button class="${d.done.includes(l.id) ? 'done' : ''}${l === level ? ' current' : ''}" data-level="${l.id}">` +
          `${l.id}${l.challenge ? '★' : ''}</button>`).join('') + `</div>`).join('');
    }

    function start(id) {
      level = LEVELS.find(l => l.id === id) || LEVELS[0];
      try { window.history.replaceState(null, '', `#/g/magic/${level.id}`); } catch (e) { /* 忽略 */ }
      root.innerHTML = `<div class="mg-levels">${chips()}</div><h2 class="mg-title">${level.id}　${esc(level.title)}${level.challenge ? ' <small>挑战</small>' : ''}</h2>`;
      const body = el('div', 'mg-body');
      root.appendChild(body);
      let i = 0;
      // 依次放出部件，遇到还没完成的互动部件就停下，等它完成
      const advance = () => {
        while (i < level.parts.length) {
          const p = level.parts[i++];
          const node = el('div', `mg-part mg-${p.t}`);
          body.appendChild(node);
          if (PASSIVE.has(p.t)) { PARTS[p.t](node, p, () => {}); continue; }
          PARTS[p.t](node, p, once(advance));
          return;
        }
        finish(body);
      };
      advance();
    }

    function once(fn) {
      let done = false;
      return () => { if (!done) { done = true; fn(); } };
    }

    function finish(body) {
      const d = load();
      if (!d.done.includes(level.id)) { d.done.push(level.id); save(d); }
      root.querySelector('.mg-levels').innerHTML = chips();
      const next = LEVELS[LEVELS.indexOf(level) + 1];
      const box = el('div', 'mg-finish', `<p>本关完成！</p>` +
        (next ? `<button class="go" data-level="${next.id}">下一关 ${next.id} ${esc(next.title)}</button>` : '<p>全部魔术都揭秘了。</p>'));
      body.appendChild(box);
    }

    root.addEventListener('click', e => {
      const b = e.target.closest('[data-level]');
      if (b) { start(b.dataset.level); window.scrollTo(0, 0); }
    });

    // ---------- 各种部件 ----------
    const PARTS = {
      text(node, p) { node.innerHTML = `<p>${R(p.md)}</p>`; },

      choice(node, p, done) {
        node.innerHTML = `<p class="stem">${R(p.stem)}</p><div class="opts">${p.options.map((o, i) =>
          `<button data-i="${i}">${R(o)}</button>`).join('')}</div><p class="fb"></p>`;
        const fb = node.querySelector('.fb');
        node.querySelector('.opts').addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b || node.classList.contains('solved')) return;
          if (Number(b.dataset.i) === p.answer) {
            b.classList.add('right');
            node.classList.add('solved');
            fb.className = 'fb ok';
            fb.innerHTML = R(p.explain);
            done();
          } else {
            b.classList.add('wrong');
            b.disabled = true;
            fb.className = 'fb bad';
            fb.textContent = '再想想。';
          }
        });
      },

      fill(node, p, done) {
        let fails = 0;
        node.innerHTML = `<p class="stem">${R(p.stem)}</p><div class="blanks">${p.blanks.map((b, i) =>
          `<label>${b.label ? `<span>${esc(b.label)}</span>` : ''}<input data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false"` +
          ` inputmode="${b.kind === 'num' ? 'decimal' : 'text'}"></label>`).join('')}</div>` +
          `<div class="row"><button class="go" data-check>检查</button><button data-show hidden>看答案</button></div><p class="fb"></p>`;
        const fb = node.querySelector('.fb');
        const inputs = [...node.querySelectorAll('input')];
        const solve = shown => {
          node.classList.add('solved');
          inputs.forEach(x => { x.disabled = true; });
          node.querySelector('.row').remove();
          fb.className = 'fb ok';
          fb.innerHTML = (shown ? `答案：${p.blanks.map(b => Answer.answerText(b)).map(R).join('，')}。` : '') + R(p.explain);
          done();
        };
        node.querySelector('[data-check]').addEventListener('click', () => {
          const rs = p.blanks.map((b, i) => Answer.checkBlank(b, inputs[i].value));
          rs.forEach((r, i) => inputs[i].classList.toggle('bad', !r.ok));
          if (rs.every(r => r.ok)) return solve(false);
          fails++;
          const err = rs.find(r => !r.ok && r.error);
          fb.className = 'fb bad';
          fb.textContent = err ? err.error : '还不对，再算算。';
          if (fails >= 2) node.querySelector('[data-show]').hidden = false;
        });
        node.querySelector('[data-show]').addEventListener('click', () => solve(true));
        node.addEventListener('keydown', e => { if (e.key === 'Enter') node.querySelector('[data-check]')?.click(); });
      },

      // 计算器：甲输入四位数，乙输入五位数，丙乱按，屏幕显示事先算好的数
      calc(node, p, done) {
        const who = ['甲', '乙', '丙'];
        const maxLen = [4, 5];
        let stage = 0, cur = '', nums = [], target = 0, secret = '', pressed = '', tape = [];
        const draw = () => {
          const tip = stage === 0 ? '观众甲：随便输入一个数，最多四位，然后按“+”'
            : stage === 1 ? '观众乙：随便输入一个数，最多五位，然后按“+”'
            : stage === 2 ? `观众丙：闭上眼睛随便按数字键，按 ${secret.length} 下`
            : stage === 3 ? '按“=”看结果' : '';
          node.innerHTML =
            `<div class="calc"><div class="tape">${tape.map(esc).join(' + ')}${tape.length ? ' +' : ''}</div>` +
            `<div class="screen">${esc(cur || (stage >= 4 ? String(target) : '0'))}</div>` +
            `<div class="keys">${[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(k => `<button data-k="${k}" ${stage >= 3 ? 'disabled' : ''}>${k}</button>`).join('')}` +
            `<button data-plus ${stage < 2 && cur ? '' : 'disabled'}>+</button><button data-eq ${stage === 3 ? '' : 'disabled'}>=</button></div></div>` +
            `<p class="tip">${esc(tip)}</p>`;
          if (stage >= 4) {
            const t = String(target);
            const when = `${t.slice(0, -6)} 月 ${Number(t.slice(-6, -4))} 日 ${t.slice(-4, -2)}:${t.slice(-2)}`;
            const sum = nums[0] + nums[1];
            node.insertAdjacentHTML('beforeend',
              `<div class="reveal"><p class="big">${t}</p><p>看看现在的时间：<b>${when}</b>！</p>` +
              `<p><b>揭秘：</b>丙按的键是 <code>${esc(pressed)}</code>，屏幕显示的却是 <code>${secret}</code>。` +
              `程序在丙开始按之前就算好了：${R(`$${t}-(${nums[0]}+${nums[1]})=${t}-${sum}=${secret}$`)}。丙按哪个键都一样，屏幕只是按顺序吐出这个数的每一位。</p></div>`);
          }
        };
        node.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b || b.disabled) return;
          if (b.dataset.k != null) {
            if (stage < 2) { if (cur.length < maxLen[stage] && !(cur === '' && b.dataset.k === '0')) cur += b.dataset.k; }
            else if (stage === 2) {
              pressed += b.dataset.k;
              cur = secret.slice(0, pressed.length);
              if (cur.length === secret.length) { tape.push(cur); stage = 3; }
            }
          } else if ('plus' in b.dataset) {
            nums.push(Number(cur)); tape.push(cur); cur = '';
            stage++;
            if (stage === 2) {
              target = ML.timeNumber(new Date());
              secret = ML.missing(target, nums).toString();
            }
          } else if ('eq' in b.dataset) {
            cur = ''; stage = 4; draw(); done(); return;
          }
          draw();
        });
        draw();
      },

      // 撕牌：一步一步照口令做
      cards(node, p, done) {
        const picks = [];
        while (picks.length < 4) {
          const c = { s: Math.floor(Math.random() * 4), r: Math.floor(Math.random() * 13) };
          if (!picks.some(q => q.s === c.s && q.r === c.r)) picks.push(c);
        }
        const face = h => {
          const c = picks[h.card];
          return `<span class="card h${h.half}${c.s % 2 ? ' red' : ''}">${SUITS[c.s]}${RANKS[c.r]}</span>`;
        };
        const WORDS = '见证奇迹的时刻';
        let step = 0, deck = [], hidden = null, pending = 0, said = 0, keep = true, lastKept = null;
        const deckHtml = (gapPick, k) => {
          if (!gapPick) return `<div class="deck"><span class="end">顶</span>${deck.map(face).join('')}<span class="end">底</span></div>`;
          // 选插入位置：顶上 k 张单独放一边，剩下的牌之间出现可点的缝
          const top = deck.slice(0, k), rest = deck.slice(k);
          return `<div class="deck hand">手里：${top.map(face).join('')}</div>` +
            `<div class="deck"><span class="end">顶</span>${rest.map((h, i) => face(h) + (i < rest.length - 1 ? `<button class="gap" data-gap="${i + 1}" aria-label="插到这里">▾</button>` : '')).join('')}<span class="end">底</span></div>`;
        };
        const btns = list => `<div class="row">${list.map(([label, data]) => `<button ${data}>${label}</button>`).join('')}</div>`;
        const draw = () => {
          let html = '';
          const hid = hidden ? `<p class="hid">藏起来的半张：${face(hidden)}</p>` : '';
          switch (step) {
            case 0: html = `<p>1. 准备 4 张牌：${picks.map(c => `<span class="card whole${c.s % 2 ? ' red' : ''}">${SUITS[c.s]}${RANKS[c.r]}</span>`).join('')}。每张撕成两半，两叠叠在一起。</p>` + btns([['撕开叠好', 'data-tear']]); break;
            case 1: html = `<p>2. 名字有几个字，就从顶上拿几张放到底下。</p>${deckHtml()}` + btns([2, 3, 4, 5].map(n => [`${n} 个字`, `data-name="${n}"`])); break;
            case 2: html = `<p>3. 拿起顶上 3 张，插到中间任意位置（点一个 ▾）。</p>${deckHtml(true, 3)}`; break;
            case 3: html = `<p>4. 把最上面一张藏起来（刘谦让大家坐在屁股底下）。</p>${deckHtml()}` + btns([['藏起来', 'data-hide']]); break;
            case 4: html = `<p>5. 南方人拿 1 张，北方人拿 2 张，不确定的拿 3 张，从顶上拿起来插到中间。</p>${deckHtml()}` +
              btns([['南方人', 'data-region="1"'], ['北方人', 'data-region="2"'], ['不确定', 'data-region="3"']]); break;
            case 5: html = `<p>5. 接着把手里的 ${pending} 张插到中间（点一个 ▾）。</p>${deckHtml(true, pending)}`; break;
            case 6: html = `<p>6. 男生从顶上扔掉 1 张，女生扔掉 2 张。</p>${deckHtml()}` + btns([['男生', 'data-gender="1"'], ['女生', 'data-gender="2"']]); break;
            case 7: html = `<p>7. “见证奇迹的时刻”：每念一个字，把顶上一张放到底下。<b class="words">${WORDS.slice(0, said)}</b></p>${deckHtml()}` +
              btns([[`念“${WORDS[said]}”`, 'data-say']]); break;
            case 8: html = `<p>8. “好运留下来，烦恼丢出去”：顶上一张放到底下，再扔掉顶上一张，直到剩一张。</p>${deckHtml()}` +
              (lastKept ? `<p class="small">刚才${lastKept}</p>` : '') +
              btns([[keep ? '好运留下来' : '烦恼丢出去', 'data-luck']]); break;
            case 9: html = `<p>剩下的半张和藏起来的半张：</p><div class="match">${face(deck[0])}${face(hidden)}</div>` +
              `<p class="ok">${deck[0].card === hidden.card ? '拼成了同一张牌！' : '没对上……'}</p>`; break;
          }
          node.innerHTML = html + (step > 3 && step < 9 ? hid : '');
        };
        node.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b) return;
          const ds = b.dataset;
          if ('tear' in ds) { deck = ML.tear(); step = 1; }
          else if (ds.name) { deck = ML.rotate(deck, Number(ds.name)); step = 2; }
          else if (ds.gap && step === 2) { deck = ML.insertTop(deck, 3, Number(ds.gap)); step = 3; }
          else if ('hide' in ds) { hidden = deck[0]; deck = deck.slice(1); step = 4; }
          else if (ds.region) { pending = Number(ds.region); step = 5; }
          else if (ds.gap && step === 5) { deck = ML.insertTop(deck, pending, Number(ds.gap)); step = 6; }
          else if (ds.gender) { deck = deck.slice(Number(ds.gender)); step = 7; }
          else if ('say' in ds) { deck = ML.rotate(deck, 1); said++; if (said === 7) step = 8; }
          else if ('luck' in ds) {
            lastKept = keep ? '把顶上一张放到了底下。' : '扔掉了顶上一张。';
            deck = keep ? ML.rotate(deck, 1) : deck.slice(1);
            keep = !keep;
            if (deck.length === 1) step = 9;
          } else return;
          draw();
          if (step === 9) done();
        });
        draw();
      },

      // 好运留下来演示器：牌上写着原来的位置
      luck(node) {
        let n = 6, deck, keep, gone;
        const reset = () => { deck = Array.from({ length: n }, (_, i) => i + 1); keep = true; gone = []; };
        const draw = () => {
          node.innerHTML = `<p class="small"><b>演示器</b>：牌上的数是它原来的位置，左边是牌堆顶。</p>` +
            `<div class="row"><span>张数</span><button data-n="-1" aria-label="少一张">−</button><b class="num">${n}</b><button data-n="1" aria-label="多一张">+</button></div>` +
            `<div class="deck">${deck.map(k => `<span class="card num">${k}</span>`).join('')}</div>` +
            (gone.length ? `<p class="small">扔掉了：${gone.join('、')}</p>` : '') +
            (deck.length > 1
              ? `<div class="row"><button data-step>${keep ? '好运留下来' : '烦恼丢出去'}</button><button data-all>一口气做完</button></div>`
              : `<p class="ok">剩下原来的第 ${deck[0]} 张。</p><div class="row"><button data-reset>再来</button></div>`);
        };
        const one = () => { if (keep) deck = ML.rotate(deck, 1); else gone.push(deck.shift()); keep = !keep; };
        node.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b) return;
          if (b.dataset.n) { n = Math.max(1, Math.min(16, n + Number(b.dataset.n))); reset(); }
          else if ('step' in b.dataset) one();
          else if ('all' in b.dataset) while (deck.length > 1) one();
          else if ('reset' in b.dataset) reset();
          draw();
        });
        reset(); draw();
      },

      // 想一个数：按口令一步步算，试够 need 个不同的数
      try(node, p, done) {
        const tried = new Map();
        node.innerHTML = `<div class="row"><span>想的数</span><input inputmode="decimal" autocomplete="off"><button class="go" data-go>算一算</button></div><div class="out"></div><p class="fb"></p>`;
        const input = node.querySelector('input'), out = node.querySelector('.out'), fb = node.querySelector('.fb');
        const go = () => {
          const v = Answer.parseNumber(Answer.normalize(input.value));
          if (!v) { fb.className = 'fb bad'; fb.textContent = '请填一个数，比如 7、−3、2/5。'; return; }
          let cur = v;
          const chain = [`想 ${fx(v)}`];
          for (const o of p.ops) {
            cur = o.op === 'x' ? cur.sub(v.mul(Frac.of(o.k))) : ML.applyLin({ a: Frac.of(0), b: cur }, o).b;
            chain.push(`${R(ML.opTex(o).replace(/-?\d+(\.\d+)?/g, m => `$${m}$`))} → ${fx(cur)}`);
          }
          tried.set(v.toString(), cur);
          out.insertAdjacentHTML('afterbegin', `<p class="chain">${chain.join('　')}</p>`);
          input.value = '';
          fb.className = 'fb';
          fb.textContent = tried.size < p.need ? `已经试了 ${tried.size} 个数，再换一个。` : '每次结果都一样。为什么？';
          if (tried.size >= p.need) done();
        };
        node.querySelector('[data-go]').addEventListener('click', go);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
      },

      birthday(node, p, done) {
        node.innerHTML = `<div class="row"><span>月</span><input data-m inputmode="numeric" size="3"><span>日</span><input data-d inputmode="numeric" size="3">` +
          `<button class="go" data-go>算一算</button></div><div class="out"></div><p class="fb"></p>`;
        const fb = node.querySelector('.fb'), out = node.querySelector('.out');
        node.querySelector('[data-go]').addEventListener('click', () => {
          const m = Number(node.querySelector('[data-m]').value), d = Number(node.querySelector('[data-d]').value);
          const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (!Number.isInteger(m) || m < 1 || m > 12 || !Number.isInteger(d) || d < 1 || d > days[m - 1]) {
            fb.className = 'fb bad'; fb.textContent = '请填一个真实的日期。'; return;
          }
          const s = [m * 4, m * 4 + 9, (m * 4 + 9) * 25, (m * 4 + 9) * 25 + d, (m * 4 + 9) * 25 + d - 225];
          out.innerHTML = `<p class="chain">月份 ${m}　×4 → ${s[0]}　+9 → ${s[1]}　×25 → ${s[2]}　+${d} → ${s[3]}　−225 → <b>${s[4]}</b></p>` +
            `<p>结果 ${s[4]}：前面是 <b>${Math.floor(s[4] / 100)}</b>，最后两位是 <b>${String(s[4] % 100).padStart(2, '0')}</b>，你的生日是 ${m} 月 ${d} 日！</p>`;
          fb.textContent = '';
          done();
        });
      },

      // 自己设计：选操作，实时显示式子，x 消掉且至少 3 步就成功
      build(node, p, done) {
        const ops = [];
        let kind = '+', k = 3, won = false;
        const KINDS = [['+', '加'], ['-', '减'], ['*', '乘'], ['/', '除以'], ['x', '减去原数的几倍']];
        const draw = () => {
          const lin = ML.runLin(ops);
          const flat = lin.a.isZero();
          const ok = flat && ops.length >= 3;
          node.innerHTML =
            `<div class="row kinds">${KINDS.map(([id, name]) => `<button data-kind="${id}" class="${kind === id ? 'on' : ''}">${name}</button>`).join('')}</div>` +
            `<div class="row"><span>几</span><button data-k="-1" aria-label="减小">−</button><b class="num">${k}</b><button data-k="1" aria-label="增大">+</button>` +
            `<button class="go" data-add>加一步</button></div>` +
            `<ol class="steps"><li>想一个数　${R('$x$')}</li>${ops.map((o, i) => `<li>${R(ML.opTex(o).replace(/\d+/g, m => `$${m}$`))}　${R(`$${ML.linTex(ML.runLin(ops.slice(0, i + 1)))}$`)}</li>`).join('')}</ol>` +
            `<div class="row"><button data-undo ${ops.length ? '' : 'disabled'}>撤销</button><button data-clear ${ops.length ? '' : 'disabled'}>清空</button></div>` +
            (ok ? `<p class="fb ok">成功！${R('$x$')} 消掉了，不管想什么数，结果都是 ${fx(lin.b)}。` +
              `试试：${[7, -2, 0.5].map(x => `想 ${fx(x)} 得 ${fx(ML.evalLin(lin, x))}`).join('，')}。</p>`
              : flat ? `<p class="fb">${R('$x$')} 已经消掉了，不过口令至少要 3 步才像魔术。</p>`
              : `<p class="fb">现在结果还和想的数有关：${R(`$${ML.linTex(lin)}$`)}。</p>`);
          if (ok && !won) { won = true; done(); }
        };
        node.addEventListener('click', e => {
          const b = e.target.closest('button');
          if (!b) return;
          if (b.dataset.kind) kind = b.dataset.kind;
          else if (b.dataset.k) k = Math.max(1, Math.min(12, k + Number(b.dataset.k)));
          else if ('add' in b.dataset) { if (ops.length < 8) ops.push({ op: kind, k }); }
          else if ('undo' in b.dataset) ops.pop();
          else if ('clear' in b.dataset) ops.length = 0;
          draw();
        });
        draw();
      },

      t1089(node, p, done) {
        const tried = new Set();
        node.innerHTML = `<div class="row"><span>三位数</span><input inputmode="numeric" size="5"><button class="go" data-go>算一算</button></div><div class="out"></div><p class="fb"></p>`;
        const input = node.querySelector('input'), out = node.querySelector('.out'), fb = node.querySelector('.fb');
        const go = () => {
          const n = Number(input.value);
          if (!Number.isInteger(n) || !ML.ok1089(n)) { fb.className = 'fb bad'; fb.textContent = '要一个三位数，百位和个位至少相差 2，比如 532。'; return; }
          const r = ML.trick1089(n);
          const big = Math.max(n, r.r), small = Math.min(n, r.r);
          out.insertAdjacentHTML('afterbegin', `<p class="chain">${big} − ${String(small).padStart(3, '0')} = ${String(r.diff).padStart(3, '0')}　${String(r.diff).padStart(3, '0')} + ${String(r.back).padStart(3, '0')} = <b>${r.sum}</b></p>`);
          tried.add(n);
          input.value = '';
          fb.className = 'fb';
          fb.textContent = tried.size < p.need ? '再换一个数试试。' : '又是 1089。为什么？';
          if (tried.size >= p.need) done();
        };
        node.querySelector('[data-go]').addEventListener('click', go);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
      },
    };

    start(levelId);
  }

  function progress() {
    const d = load();
    return { done: LEVELS.filter(l => d.done.includes(l.id)).length, total: LEVELS.length };
  }

  const MagicGame = {
    id: 'magic',
    title: '数学魔术揭秘',
    section: 'math/sh2024/g6s1/2.3',
    desc: '揭秘春晚的计算器预言和撕牌魔术，再用字母看穿“想一个数”“生日”“1089”这些魔术，最后自己设计一个。',
    mount, progress,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHAPTERS, LEVELS, PASSIVE, MagicGame };
  } else {
    window.Games = window.Games || {};
    window.Games.magic = MagicGame;
  }
})();
