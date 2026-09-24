'use strict';

// 天平解方程：关卡数据和页面。在应用内渲染（#/g/balance/<关卡ID>），入口挂在 3.2 小节页。
// 局面变形、最少步数、式子排版在 solver.js
// 包在函数里：几个游戏脚本都用普通 <script> 加载，顶层常量会互相冲突
(function () {
  const BS = typeof BalanceSolver !== 'undefined' ? BalanceSolver : require('./solver.js');

  // ---------- 关卡数据（测试会核对 eq 和 left/right 一致、解是整数、最少步数） ----------
  const CHAPTERS = [
    {
      no: '1', title: '天平和等式', short: '天平',
      intro: '天平平衡，就是等式成立。x 盒子有多重不知道。两边同时放上或拿走一样的东西、同时平均分成几份只留一份，天平仍然平衡，这就是**等式的性质**。目标：让一边只剩一个 x 盒子。',
    },
    {
      no: '2', title: '气球：负数', short: '气球',
      intro: '气球往上拉，一个气球正好抵消一个砝码，表示 $-1$；x 气球表示 $-x$。拿走气球和放上砝码效果一样，所以“两边同时减去 $-5$”就是“两边同时加上 $5$”。',
    },
    {
      no: '3', title: '袋子：括号', short: '袋子',
      intro: '一个袋子装着 $x+3$，两个袋子就是 $2(x+3)$。打开袋子就是**去括号**，重量没变，天平不动。袋子气球往上拉，打开后里面的东西全部变号。有时候不打开袋子反而更快。',
    },
  ];

  // left / right 每边 { x, n, b }，含义见 solver.js；eq 是题面的写法
  const side = (x, n, b = 0) => ({ x, n, b });
  const LEVELS = [
    { id: '1-1', eq: 'x+3=8', left: side(1, 3), right: side(0, 8),
      intro: '点左边的砝码，再点“执行”：两边同时拿走 3 个砝码。',
      learn: '两边同时减去 3，天平仍然平衡：$x+3-3=8-3$，$x=5$。' },
    { id: '1-2', eq: '3x+2=14', left: side(3, 2), right: side(0, 14),
      intro: '先拿走砝码，再把两边平均分成 3 份。',
      learn: '先两边减去 2 得 $3x=12$，再两边除以 3 得 $x=4$。两步分别用了等式性质 1 和性质 2。' },
    { id: '1-3', eq: '4x+1=x+10', left: side(4, 1), right: side(1, 10),
      intro: '两边都有 x 盒子。先让一边的 x 盒子消失。',
      learn: '两边同时减去 $x$，就是把右边的 $x$ “移”到左边变成 $-x$：$4x-x+1=10$。移项的依据就是等式性质 1。' },
    { id: '1-4', eq: '2x+11=5x+2', left: side(2, 11), right: side(5, 2), challenge: true,
      intro: '用最少的步数解出来。x 不一定要留在左边。',
      learn: '拿走 x 盒子少的一边，剩下的 x 系数是正数：$11=3x+2$，$9=3x$，$x=3$。如果从右边拿，会得到 $-3x=-9$，还要多想一次符号。' },

    { id: '2-1', eq: 'x+7=3', left: side(1, 7), right: side(0, 3),
      intro: '右边只有 3 个砝码，却要拿走 7 个。不够的怎么办？',
      learn: '右边拿走 7 个砝码，不够的 4 个变成 4 个气球：$3-7=-4$，所以 $x=-4$。' },
    { id: '2-2', eq: '2x-5=9', left: side(2, -5), right: side(0, 9),
      intro: '左边的气球怎么去掉？',
      learn: '两边同时放上 5 个砝码，左边的 5 个气球被抵消：$2x=14$，$x=7$。这就是把 $-5$ 移到右边变成 $+5$。' },
    { id: '2-3', eq: '-2x=10', left: side(-2, 0), right: side(0, 10),
      intro: '左边是两个 x 气球。除以一个负数时，砝码和气球会互换。',
      learn: '两边同时除以 $-2$：左边 $-2x\\div(-2)=x$，右边 $10\\div(-2)=-5$。除以负数，每一项都要变号。' },
    { id: '2-4', eq: '5-2x=x+11', left: side(-2, 5), right: side(1, 11),
      intro: '一边是 x 气球，一边是 x 盒子。让 x 留在哪边更省事？',
      learn: '两边同时加上 $2x$（拿走 x 气球），得 $5=3x+11$，再减去 11 得 $-6=3x$，$x=-2$。' },
    { id: '2-5', eq: '3-5x=13-3x', left: side(-5, 3), right: side(-3, 13), challenge: true,
      intro: '两边都是 x 气球。用最少的步数解出来。',
      learn: '拿走 x 气球少的一边：两边加上 $5x$ 得 $3=2x+13$，$-10=2x$，$x=-5$。' },

    { id: '3-1', eq: '2(x+3)=14', left: side(0, 0, 2), right: side(0, 14), bag: { x: 1, n: 3 },
      intro: '每个袋子里装着 $x+3$。打开袋子，或者先把两边分成 2 份，都可以。',
      learn: '不打开袋子，两边除以 2 得 $x+3=7$，$x=4$，只要 2 步。先去括号是 $2x+6=14$，要 3 步。' },
    { id: '3-2', eq: '3(x-1)=x+7', left: side(0, 0, 3), right: side(1, 7), bag: { x: 1, n: -1 },
      intro: '每个袋子里装着 $x-1$（一个 x 盒子和一个气球）。',
      learn: '去括号 $3x-3=x+7$，移项 $3x-x=7+3$，$2x=10$，$x=5$。去括号时 3 要乘括号里的每一项。' },
    { id: '3-3', eq: '-2(x-4)=x+2', left: side(0, 0, -2), right: side(1, 2), bag: { x: 1, n: -4 },
      intro: '这回是两个袋子气球，每个装着 $x-4$。打开后会怎样？',
      learn: '$-2(x-4)=-2x+8$：袋子气球打开后，x 盒子变成 x 气球，气球变成砝码。$-2x+8=x+2$，$6=3x$，$x=2$。' },
    { id: '3-4', eq: '5(x+2)=2(x+2)+9', left: side(0, 0, 5), right: side(0, 9, 2), bag: { x: 1, n: 2 }, challenge: true,
      intro: '两边都有装着 $x+2$ 的袋子。用最少的步数解出来。',
      learn: '把袋子看成一个整体：两边拿走 2 个袋子得 $3(x+2)=9$，除以 3 得 $x+2=3$，$x=1$，只要 3 步。全部去括号要 5 步。' },
  ];

  const startState = l => [{ ...l.left }, { ...l.right }];

  const optimal = {};
  function best(l) {
    if (!(l.id in optimal)) optimal[l.id] = BS.shortest(startState(l), l.bag).length;
    return optimal[l.id];
  }

  // 3 星：最少步数；2 星：多 1～2 步；1 星：解出来了
  const stars = (steps, min) => (steps <= min ? 3 : steps <= min + 2 ? 2 : 1);

  // ---------- 存档 xq.balance.v1：{ best: { 关卡ID: 最少用了几步 } } ----------
  const STORE = 'xq.balance.v1';
  function load() {
    try {
      const d = JSON.parse(localStorage.getItem(STORE));
      return d && typeof d.best === 'object' ? d : { best: {} };
    } catch (e) { return { best: {} }; }
  }
  function save(d) {
    try { localStorage.setItem(STORE, JSON.stringify(d)); } catch (e) { /* 存不了就算了 */ }
  }
  // 挑战关要用最少步数才算过关
  function isDone(l, d) {
    const s = d.best[l.id];
    return s != null && (!l.challenge || s <= best(l));
  }

  // ---------- 页面 ----------
  // 放上 / 拿走的东西：kind 是 solver 里的种类，sign 是一个这种东西算正还是负
  const ITEMS = [
    { id: 'xbox', kind: 'x', sign: 1, name: 'x 盒子' },
    { id: 'w', kind: 'n', sign: 1, name: '砝码' },
    { id: 'xball', kind: 'x', sign: -1, name: 'x 气球' },
    { id: 'ball', kind: 'n', sign: -1, name: '气球' },
    { id: 'bag', kind: 'b', sign: 1, name: '袋子' },
    { id: 'bagball', kind: 'b', sign: -1, name: '袋子气球' },
  ];
  const SHOW_MAX = 16;
  // 除数可选 −12～−1、2～12（除以 1 没有意义）
  const DIVISORS = [...Array.from({ length: 12 }, (_, i) => i - 12), ...Array.from({ length: 11 }, (_, i) => i + 2)];
  const num = k => (k < 0 ? '−' + -k : String(k));

  function mount(main, levelId) {
    const R = Quiz.renderText;
    const esc = Quiz.escapeHtml;
    let level, state, log, sel, busy, tilt, msg, won, hintUsed;

    const root = document.createElement('div');
    root.className = 'bal-game';
    main.appendChild(root);

    function start(id) {
      level = LEVELS.find(l => l.id === id) || LEVELS[0];
      state = startState(level);
      log = [];
      sel = { verb: -1, item: 'w', count: 1, div: 2 };
      busy = false; tilt = 0; msg = ''; won = false; hintUsed = false;
      try { window.history.replaceState(null, '', `#/g/balance/${level.id}`); } catch (e) { /* file:// 下可能不让改 */ }
      render();
    }

    // 一边的东西画成 DOM：气球在上面，盒子、砝码、袋子在托盘上
    function drawSide(s, i) {
      const up = [], pan = [];
      const put = (arr, cls, n, label) => {
        const shown = Math.min(Math.abs(n), SHOW_MAX);
        for (let k = 0; k < shown; k++) arr.push(`<i class="it ${cls}" data-item="${cls}">${label}</i>`);
        if (Math.abs(n) > SHOW_MAX) arr.push(`<b class="more">+${Math.abs(n) - SHOW_MAX}</b>`);
      };
      const bagLabel = level.bag ? R(`$${BS.bagTex(level.bag)}$`) : '';
      if (s.b > 0) put(pan, 'bag', s.b, bagLabel);
      if (s.x > 0) put(pan, 'xbox', s.x, 'x');
      if (s.n > 0) put(pan, 'w', s.n, '1');
      if (s.b < 0) put(up, 'bagball', s.b, bagLabel);
      if (s.x < 0) put(up, 'xball', s.x, 'x');
      if (s.n < 0) put(up, 'ball', s.n, '');
      const dy = (i === 0 ? 1 : -1) * tilt * 14;
      return `<div class="bal-side" style="transform:translateY(${dy}px)">` +
        `<div class="bal-up">${up.join('')}</div>` +
        `<div class="bal-pan">${pan.join('') || '<span class="empty">空</span>'}</div>` +
        `<div class="bal-tray"></div></div>`;
    }

    function levelChips(d) {
      return CHAPTERS.map(ch =>
        `<div class="bal-chapter"><span title="${esc(ch.title)}">${esc(ch.short)}</span>` +
        LEVELS.filter(l => l.id.startsWith(ch.no + '-')).map(l =>
          `<button class="${isDone(l, d) ? 'done' : ''}${l === level ? ' current' : ''}" data-level="${l.id}">` +
          `${l.id}${l.challenge ? '★' : ''}</button>`).join('') +
        `</div>`).join('');
    }

    function render() {
      const d = load();
      const ch = CHAPTERS.find(c => level.id.startsWith(c.no + '-'));
      const min = best(level);
      const hasBag = !!level.bag;
      const items = ITEMS.filter(it => hasBag || it.kind !== 'b');
      const bagSides = state.map((s, i) => (s.b ? i : -1)).filter(i => i >= 0);

      root.innerHTML =
        `<div class="bal-levels">${levelChips(d)}</div>` +
        (level.id.endsWith('-1') ? `<div class="bal-lesson">${R(ch.intro)}</div>` : '') +
        `<p class="bal-intro"><b>${level.id}${level.challenge ? ' 挑战' : ''}</b>　${R(level.intro)}</p>` +
        `<div class="bal-eq">${R(`$${eqNow()}$`)}${tilt ? '<small>只动了左边，天平歪了</small>' : ''}</div>` +
        `<div class="bal">` +
          `<div class="bal-sides">${drawSide(state[0], 0)}${drawSide(state[1], 1)}</div>` +
          `<div class="bal-beam" style="transform:rotate(${-tilt * 6}deg)"></div>` +
          `<div class="bal-post"></div>` +
        `</div>` +
        `<p class="bal-steps">已用 ${log.length} 步${level.challenge ? ` · 目标 ${min} 步` : ''}</p>` +
        (won ? winPanel(min) :
          `<div class="bal-ctl">` +
            `<div class="bal-row"><span class="lab">两边同时</span>` +
              `<button data-verb="1" class="${sel.verb > 0 ? 'on' : ''}">放上</button>` +
              `<button data-verb="-1" class="${sel.verb < 0 ? 'on' : ''}">拿走</button></div>` +
            `<div class="bal-row items">${items.map(it =>
              `<button data-pick="${it.id}" class="${sel.item === it.id ? 'on' : ''}"><i class="it ${it.id}">${it.kind === 'x' ? 'x' : it.id === 'w' ? '1' : ''}</i>${it.name}</button>`).join('')}</div>` +
            `<div class="bal-row"><span class="lab">数量</span>` +
              `<button data-count="-1" aria-label="少一个">−</button><b class="num">${sel.count}</b>` +
              `<button data-count="1" aria-label="多一个">+</button>` +
              `<button class="go" data-do="add">执行</button></div>` +
            `<div class="bal-row"><span class="lab">两边同时除以</span>` +
              `<button data-divstep="-1" aria-label="减小">−</button><b class="num">${num(sel.div)}</b>` +
              `<button data-divstep="1" aria-label="增大">+</button>` +
              `<button class="go" data-do="div">执行</button></div>` +
            (bagSides.length ? `<div class="bal-row">${bagSides.map(i =>
              `<button class="wide" data-open="${i}">打开${i ? '右' : '左'}边的袋子</button>`).join('')}</div>` : '') +
            `<div class="bal-row"><button data-undo ${log.length ? '' : 'disabled'}>撤销</button>` +
              `<button data-reset ${log.length ? '' : 'disabled'}>重来</button>` +
              `<button data-hint>提示</button></div>` +
          `</div>`) +
        (msg ? `<p class="bal-msg">${R(msg)}</p>` : '') +
        (log.length ? `<ul class="bal-log">` +
          `<li>${R(`$${BS.eqTex(startState(level), level.bag)}$`)}</li>` +
          log.map(h => `<li><small>${R(h.text)}</small>${R(`$${BS.eqTex(h.after, level.bag)}$`)}</li>`).join('') +
          `</ul>` : '') +
        `<details class="bal-rules"><summary>天平和方程怎么对应</summary><ul>` +
          `<li>x 盒子 $= x$，砝码 $= 1$；气球往上拉，x 气球 $=-x$，气球 $=-1$</li>` +
          `<li>一个砝码和一个气球放在同一边，正好抵消（$1+(-1)=0$）</li>` +
          `<li>“两边同时放上、拿走”是等式性质 1，“两边同时除以”是等式性质 2，天平始终平衡</li>` +
          (hasBag ? `<li>袋子 $=$ 括号，打开袋子就是去括号；只剩一个袋子时自动打开</li>` : '') +
        `</ul></details>`;
    }

    function winPanel(min) {
      const s = BS.solvedSide(state);
      const v = state[1 - s].n;
      const o = startState(level);
      const lw = BS.weight(o[0], level.bag, v), rw = BS.weight(o[1], level.bag, v);
      const n = log.length;
      const st = stars(n, min);
      const pass = !level.challenge || n <= min;
      const idx = LEVELS.indexOf(level);
      const next = LEVELS[idx + 1];
      return `<div class="bal-win${pass ? '' : ' short'}">` +
        `<p class="big">${R(`$x=${v}$`)}</p>` +
        `<p>检验：把 ${R(`$x=${v}$`)} 代回原方程 ${R(`$${level.eq}$`)}，左边等于 ${num(lw)}，右边等于 ${num(rw)}，相等。</p>` +
        `<p class="stars">${'★'.repeat(st)}${'☆'.repeat(3 - st)}　用了 ${n} 步，最少 ${min} 步${hintUsed ? '（用过提示）' : ''}</p>` +
        (pass ? '' : `<p>挑战关要用 ${min} 步完成才算过关，再试一次吧。</p>`) +
        `<p class="learn">${R(level.learn)}</p>` +
        `<div class="bal-row"><button data-reset>再做一次</button>` +
        (next ? `<button class="go" data-level="${next.id}">下一关 ${next.id}</button>` : '') + `</div>` +
        `</div>`;
    }

    // 倾斜的那一下两边不相等，按实际轻重写成 < 或 >
    function eqNow() {
      if (!tilt) return BS.eqTex(state, level.bag);
      return `${BS.sideTex(state[0], level.bag)}${tilt > 0 ? '>' : '<'}${BS.sideTex(state[1], level.bag)}`;
    }

    function currentItem() { return ITEMS.find(it => it.id === sel.item); }

    // 先动左边，天平歪一下，再动右边回平
    function doOp(op, text) {
      const r = BS.apply(state, op, level.bag);
      if (r.error) { msg = r.error + '。'; render(); return; }
      msg = '';
      if (op.op === 'open') return commit(r.state, text);
      const v = BS.solution(startState(level), level.bag);
      const half = [r.state[0], state[1]];
      const diff = BS.weight(half[0], level.bag, v) - BS.weight(half[1], level.bag, v);
      busy = true;
      state = half;
      tilt = Math.sign(diff);
      render();
      setTimeout(() => {
        tilt = 0; busy = false;
        commit(r.state, text);
      }, 550);
    }

    function commit(next, text) {
      log.push({ after: next, text });
      state = next;
      if (BS.solved(state)) {
        won = true;
        const d = load();
        const n = log.length;
        if (d.best[level.id] == null || n < d.best[level.id]) d.best[level.id] = n;
        save(d);
      } else if (BS.dead(state)) {
        msg = 'x 盒子全拿光了，再也求不出 x。点“撤销”退一步。';
      }
      render();
    }

    function note(op) {
      // 拿走的比某一边有的还多：多拿的部分就是放上相反的东西
      if (op.op !== 'add' || op.kind === 'b') return '';
      const it = currentItem();
      if (sel.verb > 0) return '';
      const lack = state.map((s, i) => (s[it.kind] * it.sign < sel.count ? i : -1)).filter(i => i >= 0);
      if (!lack.length) return '';
      return `${lack.map(i => (i ? '右' : '左')).join('、')}边的${it.name}不够拿，不够的部分就等于放上${it.sign > 0 ? (it.kind === 'x' ? 'x 气球' : '气球') : (it.kind === 'x' ? 'x 盒子' : '砝码')}。`;
    }

    root.addEventListener('click', e => {
      const b = e.target.closest('button, .it[data-item]');
      if (!b || busy) return;
      const ds = b.dataset;
      if (ds.level) return start(ds.level);
      if (ds.item && b.closest('.bal-side')) {
        // 点天平上的东西：选中它，准备拿走
        if (won) return;
        sel.item = ds.item; sel.verb = -1; msg = ''; return render();
      }
      if (ds.verb) { sel.verb = Number(ds.verb); return render(); }
      if (ds.pick) { sel.item = ds.pick; return render(); }
      if (ds.count) { sel.count = Math.max(1, Math.min(20, sel.count + Number(ds.count))); return render(); }
      if (ds.divstep) {
        const i = DIVISORS.indexOf(sel.div) + Number(ds.divstep);
        sel.div = DIVISORS[Math.max(0, Math.min(DIVISORS.length - 1, i))];
        return render();
      }
      if (ds.do === 'add') {
        const it = currentItem();
        const op = { op: 'add', kind: it.kind, k: sel.verb * it.sign * sel.count };
        const extra = note(op);
        doOp(op, BS.describe(op, level.bag));
        if (extra && !won) { msg = extra; render(); }
        return;
      }
      if (ds.do === 'div') return doOp({ op: 'div', k: sel.div }, BS.describe({ op: 'div', k: sel.div }, level.bag));
      if (ds.open != null) { const op = { op: 'open', side: Number(ds.open) }; return doOp(op, BS.describe(op, level.bag)); }
      if ('undo' in ds) {
        log.pop();
        state = log.length ? log[log.length - 1].after : startState(level);
        msg = ''; return render();
      }
      if ('reset' in ds) { return start(level.id); }
      if ('hint' in ds) {
        const path = BS.shortest(state, level.bag);
        hintUsed = true;
        msg = path && path.length ? `提示：下一步可以${BS.describe(path[0], level.bag)}。这样还要 ${path.length} 步。` : '这样走下去解不出来，先撤销几步。';
        return render();
      }
    });

    start(levelId);
  }

  function progress() {
    const d = load();
    return { done: LEVELS.filter(l => isDone(l, d)).length, total: LEVELS.length };
  }

  const BalanceGame = {
    id: 'balance',
    title: '天平解方程',
    section: 'math/sh2024/g6s1/3.2',
    desc: '天平两边同时放上、拿走、平均分，让一边只剩一个 x。气球是负数，袋子是括号。',
    mount, progress,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CHAPTERS, LEVELS, startState, best, stars, isDone, BalanceGame };
  } else {
    window.Games = window.Games || {};
    window.Games.balance = BalanceGame;
  }
})();
