'use strict';

// 费马点：关卡内容和页面。在应用内渲染（#/g/fermat/<关卡ID>），入口挂在七下 18.4（阅读材料“到三个定点距离之和最小的点”）。
// 每一关是一串“部件”（parts），做完一个互动部件才出现下一个，做法同数学魔术。拖动用 SVG + Pointer Events，坐标单位是“格”。
// 包在函数里：几个游戏脚本都用普通 <script> 加载，顶层常量会互相冲突
(function () {
  const FL = typeof FermatLogic !== 'undefined' ? FermatLogic : require('./logic.js');

  const CHAPTERS = [
    { no: '1', title: '一条街上', short: '街上' },
    { no: '2', title: '三个点', short: '三点' },
    { no: '3', title: '更多的点', short: '更多' },
  ];

  // 拖动部件离最小值多近算找到（相对误差）
  const TOL = 0.004;

  // 部件：
  //   { t: 'text', md }                                   说明文字（支持 $...$ 和 **粗体**）
  //   { t: 'choice', stem, options, answer, explain }     选择题
  //   { t: 'fill', stem, blanks: [{ label, kind, answer }], explain }  填空，kind 同 answer.js
  //   { t: 'line', xs, range, init, need }                数轴上拖 P，找到 need 个不同的最小位置
  //   { t: 'plane', pts, P, h, show, snap }               平面上拖 P 找最小点；show: 'angles' 找到后显示 P 处的角，'diag' 画对角线
  //   { t: 'rotate', A, B, C, P, h }                      把 △BPC 绕 B 转 60°，再把折线拉直
  //   { t: 'build', A, B, C, h }                          向外作等边三角形，可拖 A、B、C
  //   { t: 'roads', o, s, h }                             正方形四个村修路网，拖两个岔口
  const LEVELS = [
    {
      id: '1-1', title: '两个点、三个点',
      parts: [
        { t: 'text', md: '一条笔直的街上住着几户人家，要在街边设一个快递站 P，让 P 到各户的**距离加起来最小**。先从两户开始，**左右拖动 P** 试试。' },
        { t: 'line', xs: [-2, 5], range: [-4, 8], init: -3.5, need: 2 },
        { t: 'choice', stem: '两户人家时，快递站放在哪里最好？',
          options: ['只有正中间那一点', '两户之间（包括两户门口）的任何位置都一样', '靠近其中一户', '两户的外面'],
          answer: 1,
          explain: 'P 在两户之间时，两段距离加起来正好是两户之间的距离 $7$，放在哪里都一样；P 跑到外面，就多出一段来回的路。' },
        { t: 'text', md: '再加一户人家。' },
        { t: 'line', xs: [-3, 1, 6], range: [-5, 8], init: 7, need: 1 },
        { t: 'choice', stem: '三户人家时，最好的位置是？',
          options: ['三户位置的平均数', '中间那一户的门口', '左右两户的正中间', '哪里都一样'],
          answer: 1,
          explain: '左右两户是一对：P 只要在它们之间，这两段加起来都是 $9$。再看中间那户：P 正好在它门口时这一段是 $0$。所以最好的位置是中间那户，最小值是 $9$。三户位置的平均数是 $\\frac{4}{3}$，不是最好的位置。' },
      ],
    },
    {
      id: '1-2', title: '五个点、六个点',
      parts: [
        { t: 'text', md: '把户数加到五户、六户。上一关的窍门是**两边配对**：最左和最右是一对，次左和次右是一对……P 在一对的中间，这一对的两段加起来就最小。' },
        { t: 'line', xs: [-6, -2, 1, 3, 8], range: [-7, 9], init: -5, need: 1 },
        { t: 'fill', stem: '用绝对值写出来：$|x+6|+|x+2|+|x-1|+|x-3|+|x-8|$ 的最小值是？',
          blanks: [{ kind: 'num', answer: 19 }], line: [-6, -2, 1, 3, 8],
          explain: '配对：$-6$ 和 $8$ 一对，$x$ 在它们之间时这两项加起来是 $14$；$-2$ 和 $3$ 一对，加起来是 $5$；剩下 $|x-1|$，在 $x=1$ 时是 $0$。最小值是 $14+5+0=19$，这时 $x=1$。' },
        { t: 'line', xs: [-6, -2, 1, 3, 8, 9], range: [-7, 10], init: 9.5, need: 2 },
        { t: 'fill', stem: '六户人家时，距离之和最小是多少？',
          blanks: [{ kind: 'num', answer: 27 }], line: [-6, -2, 1, 3, 8, 9],
          explain: '三对：$-6$ 和 $9$、$-2$ 和 $8$、$1$ 和 $3$，加起来是 $15+10+2=27$。' },
        { t: 'choice', stem: '六户人家时，快递站放在哪里最好？',
          options: ['第 3 户和第 4 户之间（包括门口）的任何位置', '只能在第 3 户门口', '六户位置的平均数', '最左和最右两户的正中间'],
          answer: 0,
          explain: 'P 在最里面那一对（$1$ 和 $3$）之间时，三对都在“中间”，三对都取到最小。户数是奇数时，最好的位置是正中间那一户；是偶数时，是正中间的一段。' },
      ],
    },
    {
      id: '2-1', title: '合建水泵站',
      parts: [
        { t: 'text', md: '三个村子 A、B、C 合建一座水泵站 P，从 P 分别铺水管到三个村。P 建在哪里，水管总长最短？这回 P 可以放在平面上任何地方，**拖动 P** 试试。' },
        { t: 'plane', pts: [[2.5, 1], [1, 6.5], [9, 5.5]], P: [7.6, 1.6], h: 7.5, show: 'angles' },
        { t: 'choice', stem: '找到最短的位置后，看看 $\\angle APB$、$\\angle BPC$、$\\angle CPA$，它们有什么特点？',
          options: ['都差不多是 $120^\\circ$', '都是 $90^\\circ$', '分别和三角形的三个内角相等', '没有什么规律'],
          answer: 0,
          explain: '三个角都是 $120^\\circ$，拖得越准越接近。三个角合起来是一个周角 $360^\\circ$，正好平分成三份。这个点叫**费马点**：大约 1640 年，法国数学家费马提出了这个问题。' },
        { t: 'choice', stem: '水泵站建在三角形外面，水管会不会更短？',
          options: ['不会，最短的位置在三角形里面', '会，离某个村越远越好', '说不准'],
          answer: 0,
          explain: '可以把 P 拖到外面看看，总长只会更长。下一关换一个形状特别的三角形，再看看是不是总有三个 $120^\\circ$。' },
      ],
    },
    {
      id: '2-2', title: '有一个角很大',
      parts: [
        { t: 'text', md: '换三个村子：这回 $\\angle BAC$ 超过了 $120^\\circ$。再拖一次 P，找总长最短的位置。' },
        { t: 'plane', pts: [[4.6, 4], [0.8, 2.2], [9.2, 1.4]], P: [5.4, 1.2], h: 5.4, show: 'angles', snap: true },
        { t: 'choice', stem: '这次最短的位置在哪里？',
          options: ['就在村子 A，也就是大角的顶点', '在三角形里面，三个角都是 $120^\\circ$', '在 BC 的中点'],
          answer: 0,
          explain: '$\\angle BAC$ 已经超过 $120^\\circ$，三角形里面找不到三个角都是 $120^\\circ$ 的点。这时最短的位置就是大角的顶点 A，水管总长就是 $AB+AC$。可以证明：三角形有一个角大于或等于 $120^\\circ$ 时，费马点就是这个角的顶点。' },
      ],
    },
    {
      id: '2-3', title: '揭秘：转 60°',
      parts: [
        { t: 'text', md: '为什么是 $120^\\circ$？关键是一个巧妙的想法：把 $\\triangle BPC$ 绕点 B 旋转 $60^\\circ$，得到 $\\triangle BP\'C\'$。' },
        { t: 'rotate', A: [3.9, 0.9], B: [1.4, 4.7], C: [8.6, 4.4], P: [6, 2.1], h: 11.6 },
        { t: 'choice', stem: '$\\triangle BPP\'$ 是什么三角形？',
          options: ['等边三角形', '直角三角形', '等腰三角形，但不一定是等边三角形'],
          answer: 0,
          explain: '旋转不改变长度，$BP\'=BP$，所以是等腰三角形，顶角 $\\angle PBP\'=60^\\circ$。两个底角相等，合起来是 $180^\\circ-60^\\circ=120^\\circ$，各是 $60^\\circ$。三个角都是 $60^\\circ$，所以是等边三角形，$PP\'=PB$。' },
        { t: 'choice', stem: '$P\'C\'$ 等于哪条线段？',
          options: ['$PC$', '$PB$', '$BC$'],
          answer: 0,
          explain: '$\\triangle BP\'C\'$ 是 $\\triangle BPC$ 转过来的，两个三角形全等，$P\'C\'=PC$。' },
        { t: 'choice', stem: '于是 $PA+PB+PC=PA+PP\'+P\'C\'$，是从 A 到 $C\'$ 的一条折线。A 和 $C\'$ 的位置都和 P 无关，折线什么时候最短？',
          options: ['A、P、$P\'$、$C\'$ 在同一条直线上', 'P 在 BC 的中点', '$PA=PB=PC$'],
          answer: 0,
          explain: '两点之间线段最短：折线拉直成线段 $AC\'$ 时最短，最小值就是 $AC\'$ 的长。你刚才拖 P 让折线拉直，找的就是这个位置。' },
        { t: 'fill', stem: '拉直时，A、P、$P\'$ 在一条直线上，$\\angle BPP\'=60^\\circ$。$\\angle BPA$ 是多少度？再看 $P$、$P\'$、$C\'$ 也在一条直线上，$\\angle BPC$ 是多少度？',
          blanks: [{ label: '∠BPA', kind: 'num', answer: 120 }, { label: '∠BPC', kind: 'num', answer: 120 }],
          explain: '$\\angle BPA=180^\\circ-\\angle BPP\'=120^\\circ$。同样 $\\angle BP\'C\'=180^\\circ-\\angle BP\'P=120^\\circ$，而 $\\angle BPC=\\angle BP\'C\'$（全等），也是 $120^\\circ$。剩下的 $\\angle CPA=360^\\circ-120^\\circ-120^\\circ=120^\\circ$。' },
        { t: 'text', md: '$C\'$ 只由 B、C 决定：以 BC 为边向外作等边三角形，第三个顶点就是 $C\'$。下一关用这一点直接**作出**费马点。' },
      ],
    },
    {
      id: '2-4', title: '作图找费马点',
      parts: [
        { t: 'text', md: '在 $\\triangle ABC$ 的三条边上分别向外作等边三角形 ABD、BCE、CAF，连 CD、AE、BF。上一关的 $C\'$ 就是这里的 E。**拖动 A、B、C** 看看。' },
        { t: 'build', A: [4.6, 3], B: [3.2, 5.8], C: [7, 5.6], h: 9.6 },
        { t: 'choice', stem: 'CD、AE、BF 三条线有什么关系？',
          options: ['交于同一点，而且三条线段一样长', '交于同一点，但长度各不相同', '互相平行', '不一定交于一点'],
          answer: 0,
          explain: '上一关知道：费马点在 AE 上，最小总长等于 AE。换成绕 A 或绕 C 旋转，同样知道费马点在 CD、BF 上，最小总长也等于 CD、BF。所以三条线交于费马点，长度都等于最小总长。' },
        { t: 'choice', stem: '把 A 拖下去，让 $\\angle BAC$ 超过 $120^\\circ$。三条线的交点还是总长最短的点吗？',
          options: ['不是了，这时最短的点是 A', '还是', '三条线不再相交'],
          answer: 0,
          explain: '三条线仍然交于一点，但这个点跑到了三角形外面，页面上显示的总长比 $AB+AC$ 还大。和 2-2 一样，这时费马点是大角的顶点 A。' },
      ],
    },
    {
      id: '3-1', title: '四个点', challenge: true,
      parts: [
        { t: 'text', md: '四个村子 A、B、C、D 围成一个四边形，建一个水泵站 P 连到四个村。三个点要转 $60^\\circ$，四个点是不是更难？拖一拖。' },
        { t: 'plane', pts: [[1.2, 1.5], [7.8, 0.8], [9, 6.2], [2.2, 6.8]], P: [2.6, 3.4], h: 7.5, show: 'diag' },
        { t: 'choice', stem: '最短的位置在哪里？',
          options: ['两条对角线 AC、BD 的交点', '四个角都是 $90^\\circ$ 的点，不一定在对角线上', '四边形的某个顶点'],
          answer: 0,
          explain: '找到后页面画出了对角线，最短的位置正好是它们的交点。' },
        { t: 'choice', stem: '为什么？想想 $PA+PC$ 和 $AC$ 的大小关系。',
          options: ['$PA+PC\\geq AC$，P 在线段 AC 上时相等；同样 $PB+PD\\geq BD$', '$PA+PC$ 总等于 $AC$', '$PA=PC$ 时总长最小'],
          answer: 0,
          explain: 'P 不在线段 AC 上时，要么 A、P、C 构成三角形，两边之和大于第三边；要么 P 在直线 AC 上但在线段外，多走一段。所以 $PA+PC\\geq AC$，同理 $PB+PD\\geq BD$，总长 $\\geq AC+BD$。两个等号**同时**成立，P 必须既在 AC 上又在 BD 上，只能是交点。' },
        { t: 'choice', stem: '这和第 1 章的哪个想法一样？',
          options: ['两两配对，每一对只要 P 在它们“中间”就最小', '取平均数', '旋转 $60^\\circ$'],
          answer: 0,
          explain: '街上的点是左右配对，四边形是对角配对。三个点凑不成对，才需要旋转 $60^\\circ$ 的妙招。' },
      ],
    },
    {
      id: '3-2', title: '修路网', challenge: true,
      parts: [
        { t: 'text', md: '边长 4 千米的正方形四个角上有四个村子 A、B、C、D。这回要修路把四个村连通，路可以有岔口。最容易想到的是两条对角线，也就是 X 形。**拖动两个岔口 P、Q**，能修得更短吗？' },
        { t: 'roads', o: [3, 1.2], s: 4, h: 6.4 },
        { t: 'fill', stem: '找到最短的路网后，看岔口 P 处的三个角 $\\angle APD$、$\\angle DPQ$、$\\angle QPA$，每个大约多少度？',
          blanks: [{ kind: 'num', answer: 120 }],
          explain: '三个角都是 $120^\\circ$，岔口 Q 处也一样。' },
        { t: 'choice', stem: '为什么岔口处都是 $120^\\circ$？',
          options: ['Q 不动时，P 要让 $PA+PD+PQ$ 最小，所以 P 是 A、D、Q 三点的费马点', '因为正方形的角是 $90^\\circ$', '碰巧'],
          answer: 0,
          explain: '把 Q 也看成一个“村子”：P 连着 A、D、Q 三条路，要让这三条最短，P 就是 $\\triangle ADQ$ 的费马点。Q 同理。最短路网约 $10.93$ 千米，比 X 形的约 $11.31$ 千米短将近 $0.4$ 千米。' },
        { t: 'choice', stem: '最短的路网只有这一种吗？',
          options: ['还有一种：竖着放两个岔口，A、B 连一个，C、D 连另一个', '只有这一种', '有无数种'],
          answer: 0,
          explain: '正方形转 $90^\\circ$ 还和原来重合，横着的路网转过来就是竖着的，一样短。设计公路、铁路和电路板的布线时，都会用到这种找岔口的想法。' },
      ],
    },
  ];

  // ---------- 存档 xq.fermat.v1：{ done: [关卡ID] } ----------
  const STORE = 'xq.fermat.v1';
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE));
      return d && Array.isArray(d.done) ? d : { done: [] };
    } catch (e) { return { done: [] }; }
  }
  function save(d) {
    try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) { /* 存不了就算了 */ }
  }

  const PASSIVE = new Set(['text']);
  const LABELS = ['A', 'B', 'C', 'D'];

  // ---------- SVG 小工具 ----------
  // 数据用“格”做单位，画的时候乘 K 换成 SVG 坐标：文字直接用 px，免得浏览器的最小字号把很小的字号放大
  const K = 40;
  const f2 = v => v.toFixed(2);
  const k1 = v => (v * K).toFixed(1);
  const deg = v => `${Math.round(v)}°`;
  const seg = (p, q, cls) => `<line class="${cls}" x1="${k1(p[0])}" y1="${k1(p[1])}" x2="${k1(q[0])}" y2="${k1(q[1])}"/>`;
  const poly = (ps, cls) => `<polygon class="${cls}" points="${ps.map(p => `${k1(p[0])},${k1(p[1])}`).join(' ')}"/>`;
  const circle = (p, r, cls) => `<circle class="${cls}" cx="${k1(p[0])}" cy="${k1(p[1])}" r="${k1(r)}"/>`;
  const dot = (p, cls = 'pt') => circle(p, 0.13, cls);
  const handle = p => circle(p, 0.5, 'halo') + circle(p, 0.22, 'knob');
  const square = (p, a, cls) => `<rect class="${cls}" x="${k1(p[0] - a / 2)}" y="${k1(p[1] - a / 2)}" width="${k1(a)}" height="${k1(a)}"/>`;
  const text = (x, y, str, cls) => `<text class="${cls}" x="${k1(x)}" y="${k1(y)}">${str}</text>`;
  // 标签放在点的外侧：沿 away 方向偏一点
  function label(p, str, away, cls = 'lb') {
    let dx = 0, dy = -0.4;
    if (away) {
      const vx = p[0] - away[0], vy = p[1] - away[1], l = Math.hypot(vx, vy) || 1;
      dx = vx / l * 0.42; dy = vy / l * 0.42;
    }
    return text(p[0] + dx, p[1] + dy + 0.14, str, cls);
  }
  const center = ps => [ps.reduce((s, p) => s + p[0], 0) / ps.length, ps.reduce((s, p) => s + p[1], 0) / ps.length];

  // 可拖动的画板：pts 是可拖的点（按名字），render 返回 SVG 内容；move(name, p) 返回新位置或 null（不允许）
  function board(node, { w, h, pts, render, move, change, end }) {
    const wrap = document.createElement('div');
    wrap.className = 'fm-wrap';
    wrap.innerHTML = `<svg class="fm-board" viewBox="0 0 ${w * K} ${h * K}" role="img"></svg>`;
    node.appendChild(wrap);
    const svg = wrap.querySelector('svg');
    let active = null, moved = false;
    const redraw = () => { svg.innerHTML = render(); };
    const at = e => {
      const m = svg.getScreenCTM();
      if (!m) return [0, 0];
      const pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const r = pt.matrixTransform(m.inverse());
      return [r.x / K, r.y / K];
    };
    svg.addEventListener('pointerdown', e => {
      const p = at(e);
      let best = null, bd = 0.8;
      for (const k of Object.keys(pts)) {
        const d = FL.dist(p, pts[k]);
        if (d < bd) { bd = d; best = k; }
      }
      if (!best) return;
      active = best; moved = false;
      e.preventDefault();
      try { svg.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
    });
    svg.addEventListener('pointermove', e => {
      if (!active) return;
      let p = at(e);
      p = [Math.max(0.2, Math.min(w - 0.2, p[0])), Math.max(0.2, Math.min(h - 0.2, p[1]))];
      const q = move ? move(active, p) : p;
      if (!q) return;
      pts[active] = q; moved = true;
      redraw();
      if (change) change();
    });
    const up = () => {
      if (!active) return;
      const was = moved;
      active = null;
      if (end && was) end();
    };
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
    redraw();
    return { redraw };
  }

  // ---------- 页面 ----------
  function mount(main, levelId) {
    const R = Quiz.renderText;
    const esc = Quiz.escapeHtml;
    let level;

    const root = document.createElement('div');
    root.className = 'fm-game';
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
        `<div class="fm-chapter"><span title="${esc(ch.title)}">${esc(ch.short)}</span>` +
        LEVELS.filter(l => l.id.startsWith(ch.no + '-')).map(l =>
          `<button class="${d.done.includes(l.id) ? 'done' : ''}${l === level ? ' current' : ''}" data-level="${l.id}">` +
          `${l.id}${l.challenge ? '★' : ''}</button>`).join('') + `</div>`).join('');
    }

    function start(id) {
      level = LEVELS.find(l => l.id === id) || LEVELS[0];
      try { window.history.replaceState(null, '', `#/g/fermat/${level.id}`); } catch (e) { /* 忽略 */ }
      root.innerHTML = `<div class="fm-levels">${chips()}</div><h2 class="fm-title">${level.id}　${esc(level.title)}${level.challenge ? ' <small>挑战</small>' : ''}</h2>`;
      const body = el('div', 'fm-body');
      root.appendChild(body);
      let i = 0;
      const advance = () => {
        while (i < level.parts.length) {
          const p = level.parts[i++];
          const node = el('div', `fm-part fm-${p.t}`);
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
      root.querySelector('.fm-levels').innerHTML = chips();
      const next = LEVELS[LEVELS.indexOf(level) + 1];
      body.appendChild(el('div', 'fm-finish', `<p>本关完成！</p>` +
        (next ? `<button class="go" data-level="${next.id}">下一关 ${next.id} ${esc(next.title)}</button>` : '<p>全部关卡都完成了。</p>')));
    }

    root.addEventListener('click', e => {
      const b = e.target.closest('[data-level]');
      if (b) { start(b.dataset.level); window.scrollTo(0, 0); }
    });

    const info = (node, html) => {
      let box = node.querySelector('.fm-info');
      if (!box) { box = el('div', 'fm-info'); node.appendChild(box); }
      box.innerHTML = html;
    };

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
            fb.textContent = '再想想，可以回到上面的图里拖一拖。';
          }
        });
      },

      fill(node, p, done) {
        let fails = 0;
        node.innerHTML = `<p class="stem">${R(p.stem)}</p><div class="blanks">${p.blanks.map((b, i) =>
          `<label>${b.label ? `<span>${esc(b.label)}</span>` : ''}<input data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="decimal"></label>`).join('')}</div>` +
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
          fb.textContent = err ? err.error : '还不对，再想想。';
          if (fails >= 2) node.querySelector('[data-show]').hidden = false;
        });
        node.querySelector('[data-show]').addEventListener('click', () => solve(true));
        node.addEventListener('keydown', e => { if (e.key === 'Enter') node.querySelector('[data-check]')?.click(); });
      },

      // 数轴：P 每次挪 0.5，每户到 P 的距离画成一条横线，一户一行
      line(node, p, done) {
        const [lo, hi] = p.range, W = 10, H = 1.6 + p.xs.length * 0.3;
        const X = v => 0.5 + (v - lo) / (hi - lo) * (W - 1), V = x => lo + (x - 0.5) / (W - 1) * (hi - lo);
        const baseY = H - 0.75;
        const min = FL.lineMin(p.xs);
        const found = new Set();
        const pts = { P: [X(p.init), baseY] };
        const cur = () => Math.round(V(pts.P[0]) * 2) / 2;
        const render = () => {
          const x = cur();
          let s = seg([0.3, baseY], [W - 0.3, baseY], 'axis');
          for (let v = Math.ceil(lo); v <= hi; v++) s += seg([X(v), baseY - 0.08], [X(v), baseY + 0.08], 'tick');
          p.xs.forEach((a, i) => {
            const y = baseY - 0.35 - i * 0.3;
            s += seg([X(a), y], [X(x), y], `d${i % 4}`);
            s += square([X(a), baseY - 0.13], 0.26, 'house');
            s += text(X(a), baseY + 0.5, a < 0 ? '−' + -a : a, 'lb sm');
          });
          return s + handle([X(x), baseY]);
        };
        const show = () => {
          const x = cur(), t = FL.lineTotal(x, p.xs);
          const at = Math.abs(t - min.value) < 1e-9;
          if (at) found.add(x);
          const parts = p.xs.map(a => String(Math.abs(x - a)));
          let msg = '';
          if (found.size >= p.need) msg = `<p class="ok">找到了！最小值是 ${min.value}。</p>`;
          else if (found.size) msg = `<p class="tip">找到一个最小的位置了。还有别的位置也一样小吗？</p>`;
          info(node, `<p>P 在 <b>${x < 0 ? '−' + -x : x}</b>　距离之和：${parts.join(' + ')} = <b>${t}</b></p>${msg}`);
          if (found.size >= p.need) done();
        };
        board(node, {
          w: W, h: H, pts,
          render,
          move: (k, q) => [X(Math.max(lo, Math.min(hi, Math.round(V(q[0]) * 2) / 2))), baseY],
          change: show,
        });
        show();
      },

      // 平面上拖 P
      plane(node, p, done) {
        const W = 10, H = p.h;
        const V = p.pts, names = LABELS.slice(0, V.length);
        const opt = FL.median(V), best = FL.total(opt, V);
        const mid = center(V);
        const pts = { P: p.P.slice() };
        let won = false, low = Infinity;
        const render = () => {
          const P = pts.P;
          let s = poly(V, 'shape');
          if (won && p.show === 'diag') s += seg(V[0], V[2], 'diag') + seg(V[1], V[3], 'diag');
          V.forEach((q, i) => { s += seg(P, q, `d${i}`); });
          V.forEach((q, i) => { s += dot(q) + label(q, names[i], mid); });
          return s + handle(P) + label(P, 'P', [P[0], P[1] + 1]);
        };
        const show = () => {
          const P = pts.P, t = FL.total(P, V);
          low = Math.min(low, t);
          if (!won && t <= best * (1 + TOL)) won = true;
          let html = `<p>${names.map((n, i) => `<span class="d${i}">P${n} ${f2(FL.dist(P, V[i]))}</span>`).join(' + ')} = <b>${f2(t)}</b> 千米</p>` +
            `<p class="tip">目前最短：${f2(low)} 千米</p>`;
          if (won) {
            html += `<p class="ok">找到了！最短约 ${f2(best)} 千米。</p>`;
            if (p.show === 'angles') {
              const onVertex = V.some(q => FL.dist(q, P) < 1e-9);
              html += onVertex ? `<p>P 就在一个村子上。</p>`
                : `<p>∠APB ${deg(FL.angleAt(V[0], P, V[1]))}　∠BPC ${deg(FL.angleAt(V[1], P, V[2]))}　∠CPA ${deg(FL.angleAt(V[2], P, V[0]))}</p>`;
            }
          }
          info(node, html);
          if (won) done();
        };
        // 找到后松手，P 吸到准确的最小点上，角度正好是 120°
        const bd = board(node, {
          w: W, h: H, pts, render, change: show,
          end: () => { if (won && FL.total(pts.P, V) <= best * (1 + TOL)) { pts.P = opt.slice(); bd.redraw(); show(); } },
          move: (k, q) => {
            if (p.snap) for (const v of V) if (FL.dist(v, q) < 0.3) return v.slice();
            return q;
          },
        });
        show();
      },

      // 旋转 60°：滑块转 △BPC，再拖 P 把折线拉直
      rotate(node, p, done) {
        const W = 10, H = p.h, A = p.A, B = p.B, C = p.C;
        const sign = FL.awayTurn(A, B, C) / 60;
        const pts = { P: p.P.slice() };
        let t = 0, won = false;
        const Cend = FL.rotate(C, B, sign * 60);
        const best = FL.dist(A, Cend), opt = FL.fermat(A, B, C);
        const render = () => {
          const P = pts.P, P1 = FL.rotate(P, B, sign * t), C1 = FL.rotate(C, B, sign * t);
          const mid = center([A, B, C]);
          let s = poly([A, B, C], 'shape') + poly([B, P, C], 'tri0');
          if (t > 0) s += poly([B, P1, C1], 'tri1') + seg(P, P1, 'd1');
          if (t === 60) s += seg(A, Cend, 'guide');
          s += seg(P, A, 'd0') + seg(P, C, 'd2');
          if (t > 0) s += seg(P1, C1, 'd2');
          s += dot(A) + dot(B) + dot(C) + label(A, 'A', mid) + label(B, 'B', mid) + label(C, 'C', mid);
          if (t > 0) s += dot(P1) + label(P1, 'P′', B) + dot(C1) + label(C1, 'C′', B);
          return s + handle(P) + label(P, 'P', [P[0], P[1] + 1]);
        };
        node.insertAdjacentHTML('beforeend',
          `<div class="row"><span>旋转</span><input type="range" min="0" max="60" step="1" value="0" aria-label="旋转角度"><b class="num">0°</b></div>`);
        const range = node.querySelector('input[type=range]'), num = node.querySelector('.num');
        const bd = board(node, {
          w: W, h: H, pts, render, change: () => show(),
          end: () => { if (won && t === 60 && FL.total(pts.P, [A, B, C]) <= best * (1 + TOL)) { pts.P = opt.slice(); bd.redraw(); show(); } },
        });
        const show = () => {
          const P = pts.P;
          const PA = FL.dist(P, A), PB = FL.dist(P, B), PC = FL.dist(P, C);
          let html;
          if (t < 60) html = `<p class="tip">① 拖动滑块，把 △BPC 绕 B 转到 60°。</p>`;
          else {
            const tt = PA + PB + PC;
            if (!won && tt <= best * (1 + TOL)) won = true;
            html = `<p><span class="d0">PA ${f2(PA)}</span> + <span class="d1">PP′ ${f2(PB)}</span> + <span class="d2">P′C′ ${f2(PC)}</span> = <b>${f2(tt)}</b></p>` +
              `<p class="tip">PP′ = PB，P′C′ = PC，所以这条折线的长就是 PA + PB + PC。</p>` +
              (won ? `<p class="ok">拉直了！折线变成线段 AC′，长 ${f2(best)}。</p>`
                : `<p class="tip">② 拖动 P，让 A、P、P′、C′ 连成一条直线（虚线是 AC′）。</p>`);
          }
          info(node, html);
          if (won) done();
        };
        range.addEventListener('input', () => {
          t = Number(range.value);
          num.textContent = `${t}°`;
          bd.redraw();
          show();
        });
        show();
      },

      // 向外作等边三角形，拖 A、B、C
      build(node, p, done) {
        const W = 10, H = p.h;
        const pts = { A: p.A.slice(), B: p.B.slice(), C: p.C.slice() };
        const area = (a, b, c) => Math.abs(FL.side(c, a, b)) / 2;
        const render = () => {
          const { A, B, C } = pts;
          const D = FL.apexOut(A, B, C), E = FL.apexOut(B, C, A), F = FL.apexOut(C, A, B);
          const P = FL.intersect(C, D, A, E);
          const mid = center([A, B, C]);
          let s = poly([A, B, D], 'eq') + poly([B, C, E], 'eq') + poly([C, A, F], 'eq') + poly([A, B, C], 'shape');
          s += seg(C, D, 'd0') + seg(A, E, 'd1') + seg(B, F, 'd2');
          s += dot(D) + label(D, 'D', mid) + dot(E) + label(E, 'E', mid) + dot(F) + label(F, 'F', mid);
          if (P) s += dot(P, 'fp') + label(P, 'P', [P[0], P[1] + 1], 'lb fp');
          for (const k of ['A', 'B', 'C']) s += handle(pts[k]) + label(pts[k], k, mid);
          return s;
        };
        const show = () => {
          const { A, B, C } = pts;
          const D = FL.apexOut(A, B, C), E = FL.apexOut(B, C, A), F = FL.apexOut(C, A, B);
          const P = FL.intersect(C, D, A, E);
          const ang = FL.angles(A, B, C);
          const big = ang.findIndex(a => a >= 120);
          let html = `<p><span class="d0">CD ${f2(FL.dist(C, D))}</span>　<span class="d1">AE ${f2(FL.dist(A, E))}</span>　<span class="d2">BF ${f2(FL.dist(B, F))}</span></p>`;
          if (P) {
            html += `<p>PA + PB + PC = <b>${f2(FL.total(P, [A, B, C]))}</b></p>`;
            if (big < 0) html += `<p class="tip">∠APB ${deg(FL.angleAt(A, P, B))}　∠BPC ${deg(FL.angleAt(B, P, C))}　∠CPA ${deg(FL.angleAt(C, P, A))}</p>`;
          }
          html += `<p class="tip">三角形的角：∠A ${deg(ang[0])}　∠B ${deg(ang[1])}　∠C ${deg(ang[2])}</p>`;
          if (big >= 0) {
            const V = [A, B, C], n = LABELS[big];
            const others = [0, 1, 2].filter(i => i !== big);
            html += `<p class="warn">∠${n} ≥ 120°：交点跑到三角形外面了。这时最短的是顶点 ${n}，` +
              `${LABELS[others[0]]}${n} + ${n}${LABELS[others[1]]} = ${f2(FL.total(V[big], V))}。</p>`;
          }
          info(node, html);
        };
        board(node, {
          w: W, h: H, pts, render, change: show, end: done,
          // 三角形不能压得太扁
          move: (k, q) => {
            const n = Object.assign({}, pts, { [k]: q });
            return area(n.A, n.B, n.C) < 1 ? null : q;
          },
        });
        show();
        node.insertAdjacentHTML('beforeend', '<p class="tip">拖动一次 A、B、C 中的任意一点，就能继续往下。</p>');
      },

      // 正方形四个村修路网
      roads(node, p, done) {
        const W = 10, H = p.h;
        const sq = FL.squareRoads(p.o, p.s);
        const V = sq.sq, c = center(V);
        const pts = { P: [c[0] - 0.15, c[1]], Q: [c[0] + 0.15, c[1]] };
        let won = false, beat = false, low = Infinity;
        const render = () => {
          const { P, Q } = pts;
          let s = poly(V, 'shape');
          s += seg(V[0], P, 'road') + seg(V[3], P, 'road') + seg(P, Q, 'road') + seg(V[1], Q, 'road') + seg(V[2], Q, 'road');
          V.forEach((q, i) => { s += square(q, 0.32, 'house') + label(q, LABELS[i], c); });
          return s + handle(P) + label(P, 'P', [P[0] + 1, P[1]]) + handle(Q) + label(Q, 'Q', [Q[0] - 1, Q[1]]);
        };
        const show = () => {
          const { P, Q } = pts;
          const t = FL.roadLen(P, Q, V);
          low = Math.min(low, t);
          if (t < sq.cross - 0.05) beat = true;
          if (!won && t <= sq.best * (1 + TOL)) won = true;
          let html = `<p>路网总长 <b>${f2(t)}</b> 千米　<span class="tip">X 形：${f2(sq.cross)} 千米　目前最短：${f2(low)} 千米</span></p>`;
          if (won) {
            html += `<p class="ok">找到了！最短约 ${f2(sq.best)} 千米。</p>` +
              `<p>P 处：∠APD ${deg(FL.angleAt(V[0], P, V[3]))}　∠DPQ ${deg(FL.angleAt(V[3], P, Q))}　∠QPA ${deg(FL.angleAt(Q, P, V[0]))}</p>` +
              `<p>Q 处：∠BQC ${deg(FL.angleAt(V[1], Q, V[2]))}　∠CQP ${deg(FL.angleAt(V[2], Q, P))}　∠PQB ${deg(FL.angleAt(P, Q, V[1]))}</p>`;
          } else if (beat) html += `<p class="tip">比 X 形短了！还能更短吗？</p>`;
          else html += `<p class="tip">P、Q 现在挨在正方形中心，差不多就是 X 形。把它们拖开试试。</p>`;
          info(node, html);
          if (won) done();
        };
        const bd = board(node, {
          w: W, h: H, pts, render, change: show,
          end: () => { if (won && FL.roadLen(pts.P, pts.Q, V) <= sq.best * (1 + TOL)) { pts.P = sq.P.slice(); pts.Q = sq.Q.slice(); bd.redraw(); show(); } },
        });
        show();
      },
    };

    start(levelId);
  }

  function progress() {
    const d = load();
    return { done: LEVELS.filter(l => d.done.includes(l.id)).length, total: LEVELS.length };
  }

  const FermatGame = {
    id: 'fermat',
    title: '费马点',
    section: 'math/sh2024/g7s2/18.4',
    desc: '拖一拖，找到到几个点距离之和最小的点；再把三角形旋转 60°，看懂为什么费马点处三个角都是 120°。',
    mount, progress,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHAPTERS, LEVELS, PASSIVE, TOL, FermatGame };
  } else {
    window.Games = window.Games || {};
    window.Games.fermat = FermatGame;
  }
})();
