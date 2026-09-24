'use strict';

// 24 点：关卡数据和页面交互。求解、排版、发牌在 solver.js
const S = typeof Solver24 !== 'undefined' ? Solver24 : require('./solver.js');

// ---------- 关卡数据（测试会用求解器核对每章的条件） ----------
const CHAPTERS = [
  { no: '1', short: '经典难题', intro: '这几组牌只有中间先算出分数，才能凑出 24。' },
  { no: '2', short: '有理数版', rational: true, intro: '红色牌（♥ ♦）算负数，红 5 就是 −5。每组只有一种算法，注意符号。' },
  { no: '3', short: '有解吗', askNone: true, intro: '有的牌无解。觉得无解就点「无解」，有解就把 24 算出来。' },
];

// cards 是带符号的数；第 3 章的 solvable 标明有没有解
const LEVELS = [
  { id: '1-1', cards: [3, 3, 8, 8] },
  { id: '1-2', cards: [1, 5, 5, 5] },
  { id: '1-3', cards: [4, 4, 7, 7] },
  { id: '1-4', cards: [3, 3, 7, 7] },
  { id: '1-5', cards: [1, 3, 4, 6] },
  { id: '1-6', cards: [1, 4, 5, 6] },
  { id: '2-1', cards: [-7, 2, 4, 4] },
  { id: '2-2', cards: [-4, 5, 5, 7] },
  { id: '2-3', cards: [-9, -2, 1, 1] },
  { id: '2-4', cards: [-9, -3, 1, 10] },
  { id: '2-5', cards: [-3, -3, 2, 2] },
  { id: '2-6', cards: [-3, -3, 8, 8] },
  { id: '3-1', cards: [1, 1, 2, 7], solvable: true },
  { id: '3-2', cards: [5, 8, 9, 10], solvable: false },
  { id: '3-3', cards: [1, 6, 11, 13], solvable: true },
  { id: '3-4', cards: [4, 6, 7, 13], solvable: false },
  { id: '3-5', cards: [2, 2, 11, 11], solvable: true },
  { id: '3-6', cards: [3, 5, 11, 13], solvable: false },
];
const chapterOf = level => CHAPTERS.find(c => c.no === level.id.split('-')[0]);

// ---------- 界面 ----------
function initUI() {
  const $ = id => document.getElementById(id);
  const STORE_KEY = 'xq.24.v1';
  const OPS = [['+', '+'], ['-', '−'], ['*', '×'], ['/', '÷']];

  const store = loadStore();
  const free = { tier: 'easy', rational: false, maybeNone: false, streak: 0 };
  let level = null;          // null 表示自由练习
  let g = null;              // 当前一局

  function loadStore() {
    try {
      const o = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
      return { done: new Set(o.done || []), input: o.input === 'merge' ? 'merge' : 'expr' };
    } catch {
      return { done: new Set(), input: 'expr' };
    }
  }

  function saveStore() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ done: [...store.done], input: store.input }));
    } catch {}
  }

  // ---------- 小工具 ----------
  function button(text, onClick, cls) {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = text;
    if (cls) b.className = cls;
    b.addEventListener('click', onClick);
    return b;
  }

  const minus = s => String(s).replace('-', '−');
  function fracHtml(v) {
    if (v.d === 1n) return minus(v.n);
    const n = v.n < 0n ? -v.n : v.n;
    return `${v.n < 0n ? '−' : ''}<span class="fr"><span>${n}</span><span>${v.d}</span></span>`;
  }
  const fracText = v => minus(v.toString());

  // 在 #info 里显示一个算式；tex、text 不含"= 24"
  function showFormula(tex, text) {
    const box = document.createElement('p');
    box.className = 'formula';
    let ok = false;
    if (typeof katex !== 'undefined') {
      try { katex.render(tex + ' = ' + S.TARGET, box, { throwOnError: false }); ok = true; } catch {}
    }
    if (!ok) box.textContent = text + ' = ' + S.TARGET;
    $('info').innerHTML = '';
    $('info').appendChild(box);
  }
  const values = () => g.hand.map(c => c.value);

  function setMessage(cls, html) {
    const m = $('message');
    m.className = cls;
    m.innerHTML = html;
  }

  // ---------- 一局 ----------
  // hand：[{ rank, suit, value }]；cards：当前桌面上的牌，每张是 { node, card }（合成的牌 card 为 null）
  function startGame(hand, opts) {
    g = { hand, askNone: opts.askNone, solvable: opts.solvable, peeked: false };
    resetBoard();
    setMessage('', '');
    render();
  }

  function resetBoard() {
    g.tokens = [];
    g.cards = g.hand.map((c, i) => ({ node: { v: S.Frac.of(c.value), i }, card: c }));
    g.history = [];
    g.sel = -1;
    g.op = null;
    g.hint = null;
    g.over = false;
    $('info').innerHTML = '';
  }

  function pickCard(k) {
    if (g.over) return;
    g.hint = null;
    if (g.sel < 0 || g.sel === k) {
      g.sel = g.sel === k ? -1 : k;
      g.op = null;
      setMessage('', '');
    } else if (!g.op) {
      g.sel = k;
    } else {
      merge(g.sel, k, g.op);
    }
    render();
  }

  function pickOp(op) {
    if (g.over) return;
    if (g.sel < 0) {
      setMessage('', '先点一张牌，再选运算符。');
      return;
    }
    g.op = g.op === op ? null : op;
    g.hint = null;
    render();
  }

  function merge(i, j, op) {
    const a = g.cards[i].node, b = g.cards[j].node;
    if (op === '/' && b.v.isZero()) {
      setMessage('fail', '0 不能作除数，换一张牌试试。');
      return;
    }
    const v = op === '+' ? a.v.add(b.v) : op === '-' ? a.v.sub(b.v) : op === '*' ? a.v.mul(b.v) : a.v.div(b.v);
    g.history.push(g.cards);
    const next = g.cards.slice();
    next[i] = { node: { v, op, a, b }, card: null };
    next.splice(j, 1);
    g.cards = next;
    g.sel = j < i ? i - 1 : i;
    g.op = null;
    setMessage('', '');
    if (g.cards.length === 1) finish();
  }

  function finish() {
    const t = g.cards[0].node;
    g.sel = -1;
    if (!t.v.eq(S.TARGET)) {
      setMessage('fail', `结果是 ${fracText(t.v)}，不是 24。点「撤销」退一步再试试。`);
      return;
    }
    win(S.toTex(t), S.toText(t));
  }

  function win(tex, text) {
    g.over = true;
    g.sel = -1;
    showFormula(tex, text);
    if (g.peeked) {
      setMessage('ok', '算对了！不过这一局看过答案，点「重来」自己再做一遍' + (level ? '才算过关。' : '。'));
    } else if (level) {
      setMessage('ok', '算对了，过关！');
      markDone();
    } else {
      free.streak++;
      setMessage('ok', `算对了！已经连续做对 ${free.streak} 组。`);
    }
  }

  // ---------- 写算式 ----------
  const exprMode = () => store.input === 'expr';

  function press(tok) {
    if (g.over) return;
    const next = S.pushToken(g.tokens, tok);
    g.hint = null;
    if (next.error) {
      setMessage('fail', next.error);
      render();
      return;
    }
    g.tokens = next;
    setMessage('', '');
    $('info').innerHTML = '';
    checkExpr();
    render();
  }

  function backspace() {
    if (g.over || !g.tokens.length) return;
    g.tokens = g.tokens.slice(0, -1);
    g.hint = null;
    setMessage('', '');
    render();
  }

  function checkExpr() {
    const n = g.hand.length;
    const used = g.tokens.filter(x => x.t === 'num').length;
    if (used < n) return;
    if (!S.isComplete(g.tokens, n)) {
      const open = g.tokens.reduce((k, x) => k + (x.t === '(') - (x.t === ')'), 0);
      if (open > 0) setMessage('', `4 张牌都用上了，还差 ${open} 个右括号。`);
      return;
    }
    let t;
    try {
      t = S.parseTokens(g.tokens, values());
    } catch {
      setMessage('fail', '算式里出现了除以 0，0 不能作除数。按 ⌫ 改一改。');
      return;
    }
    if (!t.v.eq(S.TARGET)) {
      setMessage('fail', `算出来是 ${fracText(t.v)}，不是 24。按 ⌫ 改一改。`);
      return;
    }
    win(S.tokensFormat(g.tokens, values(), 'tex'), S.tokensFormat(g.tokens, values(), 'text'));
  }

  function setInput(mode) {
    if (store.input === mode) return;
    store.input = mode;
    saveStore();
    const redo = g.peeked;
    resetBoard();
    g.peeked = redo;
    setMessage('', '');
    renderMode();
    render();
  }

  function renderMode() {
    const box = $('mode');
    box.innerHTML = '';
    [['expr', '写算式'], ['merge', '一步一步算']].forEach(([id, name]) => {
      box.appendChild(button(name, () => setInput(id), store.input === id ? 'on' : ''));
    });
  }

  // ---------- 一步一步算 ----------
  function undo() {
    if (!g.history.length) return;
    g.cards = g.history.pop();
    g.sel = -1;
    g.op = null;
    g.hint = null;
    g.over = false;
    $('info').innerHTML = '';
    setMessage('', '');
    render();
  }

  function restart() {
    const redo = g.peeked;
    resetBoard();
    g.peeked = false;
    setMessage('', redo ? '重新做一遍，这次做对就算数。' : '');
    render();
  }

  // 写算式时按原始的 4 张牌提示，一步一步算时按桌面上现有的牌提示
  function showHint() {
    if (g.over) return;
    const vals = exprMode() ? values().map(v => S.Frac.of(v)) : g.cards.map(c => c.node.v);
    const h = S.hint(vals);
    if (!h) {
      setMessage('fail', '现在这几张牌已经凑不出 24 了，点「撤销」退回去再试试。');
      return;
    }
    g.hint = h;
    g.sel = -1;
    g.op = null;
    const name = OPS.find(o => o[0] === h.op)[1];
    const num = k => vals[k].n < 0n ? `(${fracText(vals[k])})` : fracText(vals[k]);
    setMessage('', `提示：先算 ${num(h.i)} ${name} ${num(h.j)}（亮起的两张牌）。`);
    render();
  }

  function showAnswer() {
    const sols = S.solve(values());
    loseStreak();
    g.peeked = true;
    $('info').innerHTML = '';
    if (!sols.length) {
      setMessage('', '这组牌无解。');
      return;
    }
    showFormula(S.toTex(sols[0]), S.toText(sols[0]));
    setMessage('', '一种算法如下。' + (level ? '看过答案这一关不算过关，点「重来」自己再做一遍。' : ''));
  }

  function sayNone() {
    if (g.over) return;
    if (!g.solvable) {
      g.over = true;
      if (g.peeked) {
        setMessage('ok', '对，这组牌无解。');
      } else if (level) {
        setMessage('ok', '判断对了，这组牌无解。过关！');
        markDone();
      } else {
        free.streak++;
        setMessage('ok', `判断对了，这组牌无解。已经连续做对 ${free.streak} 组。`);
      }
      render();
      return;
    }
    showAnswer();
    setMessage('fail', '这组牌有解，一种算法如下。' + (level ? '点「重来」自己做一遍才算过关。' : ''));
  }

  function loseStreak() {
    if (!level) free.streak = 0;
  }

  function markDone() {
    if (store.done.has(level.id)) return;
    store.done.add(level.id);
    saveStore();
    renderNav();
  }

  // ---------- 渲染 ----------
  function cardHtml(c) {
    const corner = `${S.rankText(c.rank)}${c.suit}`;
    return `<span class="corner">${corner}</span><span class="val">${minus(c.value)}</span>` +
      `<span class="corner bottom">${corner}</span>`;
  }

  function render() {
    const board = $('cards');
    board.innerHTML = '';
    const bar = $('bar');
    if (exprMode()) renderExpr(board, bar);
    else renderMerge(board, bar);

    // 写算式时括号和退格并进运算符这一排，按钮小一号
    const ops = $('ops');
    ops.innerHTML = '';
    ops.classList.toggle('compact', exprMode());
    OPS.forEach(([op, name]) => {
      let cls = 'op';
      if (!exprMode() && op === g.op) cls += ' on';
      if (g.hint && g.hint.op === op) cls += ' hint';
      ops.appendChild(button(name, () => (exprMode() ? press({ t: 'op', op }) : pickOp(op)), cls));
    });
    if (exprMode()) {
      ops.appendChild(button('(', () => press({ t: '(' }), 'op'));
      ops.appendChild(button(')', () => press({ t: ')' }), 'op'));
      ops.appendChild(button('⌫', backspace, 'op'));
    }

    const acts = $('actions');
    acts.innerHTML = '';
    if (!exprMode()) acts.appendChild(button('撤销', undo));
    acts.appendChild(button('重来', restart));
    if (!g.askNone) acts.appendChild(button('提示', showHint));
    acts.appendChild(button('看答案', showAnswer));
    if (g.askNone) acts.appendChild(button('无解', sayNone, 'none'));
  }

  function renderExpr(board, bar) {
    g.hand.forEach((c, k) => {
      let cls = 'card';
      if (S.isRed(c.suit)) cls += ' red';
      if (g.tokens.some(x => x.t === 'num' && x.i === k)) cls += ' used';
      if (g.hint && (k === g.hint.i || k === g.hint.j)) cls += ' hint';
      board.appendChild(button(cardHtml(c), () => press({ t: 'num', i: k }), cls));
    });
    bar.className = g.over ? 'win' : g.tokens.length ? '' : 'guide';
    bar.textContent = g.tokens.length ? S.tokensFormat(g.tokens, values(), 'text') : '点牌、运算符和括号，像按计算器一样写出算式';
  }

  // 一步一步算：算式栏显示下一步该点什么
  function mergeGuide() {
    const num = k => { const v = g.cards[k].node.v; return v.n < 0n ? `(${fracText(v)})` : fracText(v); };
    if (g.over) return ['win', S.toText(g.cards[0].node) + ' = 24'];
    if (g.cards.length === 1) return ['step', `结果是 ${fracText(g.cards[0].node.v)}，点「撤销」退一步`];
    if (g.sel >= 0 && g.op) return ['step', `${num(g.sel)} ${OPS.find(o => o[0] === g.op)[1]} ？　再点另一张牌`];
    if (g.sel >= 0) return ['step', `已选 ${num(g.sel)}，再点一个运算符`];
    if (g.history.length) return ['guide', '接着点一张牌，继续合成'];
    return ['guide', '点一张牌 → 点运算符 → 点另一张牌，两张牌合成一张（相当于给这一步加了括号）'];
  }

  function renderMerge(board, bar) {
    [bar.className, bar.textContent] = mergeGuide();
    g.cards.forEach((c, k) => {
      let html;
      let cls = 'card';
      if (c.card) {
        if (S.isRed(c.card.suit)) cls += ' red';
        html = cardHtml(c.card);
      } else {
        cls += ' made';
        html = `<span class="val">${fracHtml(c.node.v)}</span><span class="expr">${S.toText(c.node)}</span>`;
      }
      if (k === g.sel) cls += ' sel';
      if (g.hint && (k === g.hint.i || k === g.hint.j)) cls += ' hint';
      if (g.over && g.cards.length === 1) cls += ' win';
      board.appendChild(button(html, () => pickCard(k), cls));
    });
  }

  // ---------- 自由练习 ----------
  function newFreeHand() {
    const d = S.deal(free.tier, { rational: free.rational, maybeNone: free.maybeNone });
    startGame(d.cards, { askNone: free.maybeNone, solvable: d.solvable });
  }

  function renderFree() {
    const box = $('setup');
    box.innerHTML = '';
    const tiers = document.createElement('div');
    tiers.className = 'choices';
    Object.entries(S.TIERS).forEach(([id, t]) => {
      tiers.appendChild(button(t.name + (id === 'hard' ? '<small>含 J Q K</small>' : ''), () => {
        free.tier = id;
        renderFree();
        newFreeHand();
      }, id === free.tier ? 'on' : ''));
    });
    box.appendChild(tiers);
    const toggles = document.createElement('div');
    toggles.className = 'toggles';
    [['rational', '有理数版（红牌算负数）'], ['maybeNone', '可能无解']].forEach(([k, text]) => {
      const lab = document.createElement('label');
      lab.innerHTML = `<input type="checkbox"${free[k] ? ' checked' : ''}> ${text}`;
      lab.querySelector('input').addEventListener('change', e => {
        free[k] = e.target.checked;
        free.streak = 0;
        newFreeHand();
      });
      toggles.appendChild(lab);
    });
    box.appendChild(toggles);
    const next = document.createElement('div');
    next.className = 'row';
    next.appendChild(button('换一组', () => {
      if (!g.over) free.streak = 0;
      newFreeHand();
    }, 'primary'));
    box.appendChild(next);
  }

  // ---------- 导航 ----------
  function renderNav() {
    const chap = level ? level.id.split('-')[0] : null;
    $('chapters').innerHTML = '';
    const fb = button('自由练习', () => { location.hash = '#free'; });
    if (!level) fb.classList.add('current');
    $('chapters').appendChild(fb);
    CHAPTERS.forEach(ch => {
      const lv = LEVELS.filter(l => l.id.startsWith(ch.no + '-'));
      const all = lv.every(l => store.done.has(l.id));
      const b = button(`${ch.no}. ${ch.short}${all ? ' ✓' : ''}`, () => { location.hash = '#' + lv[0].id; });
      if (ch.no === chap) b.classList.add('current');
      $('chapters').appendChild(b);
    });
    $('levels').innerHTML = '';
    if (!level) return;
    LEVELS.filter(l => l.id.startsWith(chap + '-')).forEach(l => {
      const b = button(`${l.id}${store.done.has(l.id) ? ' ✓' : ''}`, () => { location.hash = '#' + l.id; });
      if (store.done.has(l.id)) b.classList.add('done');
      if (l.id === level.id) b.classList.add('current');
      $('levels').appendChild(b);
    });
  }

  function load(id) {
    level = LEVELS.find(l => l.id === id) || null;
    renderNav();
    renderMode();
    $('setup').innerHTML = '';
    if (!level) {
      $('hint').textContent = '随机发牌，用 + − × ÷ 把 4 张牌算成 24，每张牌用一次。';
      renderFree();
      newFreeHand();
      return;
    }
    const ch = chapterOf(level);
    $('hint').textContent = `${level.id}：${ch.intro}`;
    startGame(S.cardsOf(level.cards, !!ch.rational), {
      askNone: !!ch.askNone, solvable: S.solve(level.cards).length > 0,
    });
  }

  window.addEventListener('hashchange', () => load(location.hash.slice(1)));
  load(location.hash.slice(1) || 'free');
}

if (typeof document !== 'undefined') initUI();
if (typeof module !== 'undefined') module.exports = { CHAPTERS, LEVELS, chapterOf };
