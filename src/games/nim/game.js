'use strict';

// 取石子：关卡数据和页面交互。必胜 / 必败判断和电脑走法在 solver.js
const S = typeof NimSolver !== 'undefined' ? NimSolver : require('./solver.js');

// ---------- 关卡数据（测试会用求解器核对开局、先后手和唯一走法） ----------
const RULES = {
  take3: { kind: 'nim', take: [1, 2, 3] },
  take4: { kind: 'nim', take: [1, 2, 3, 4] },
  take134: { kind: 'nim', take: [1, 3, 4] },
  std: { kind: 'nim' },
  misere3: { kind: 'nim', take: [1, 2, 3], misere: true },
  misere: { kind: 'nim', misere: true },
  stair: { kind: 'stair' },
  push: { kind: 'push', width: 7 },
};

const CHAPTERS = [
  { no: '1', short: '一堆石子', hint: '回想倒推表：该给电脑留下多少颗？' },
  { no: '2', short: '两堆', hint: '回想二维倒推表：两堆什么样的时候是必败？' },
  { no: '3', short: '三堆以上', hint: '看看哪些色块落单了，想办法让所有色块重新配对。' },
  { no: '4', short: '变式' },
];

// table：一维倒推表（0～max 颗）；table2：二维倒推表（两堆各 0～max 颗）
// first：'you' 你先走，'ai' 电脑先走，'choose' 自己选（该选哪个由求解器算）
// rounds：连续几局，每局自己选先后手；quiz：色块配对判断
const LEVELS = [
  {
    id: '1-1', title: '倒推表', rule: RULES.take3, table: { max: 12 },
    intro: '一堆石子，两人轮流取，每次取 1～3 颗，取到最后一颗的人赢。从 0 颗开始，一格一格判断：轮到你时，这是必胜还是必败？',
    summary: '必败的是 0、4、8、12 颗，都是 4 的倍数。对手取几颗，你就取 4 减几颗，一轮正好 4 颗，必败局面就一直留给对手。',
  },
  {
    id: '1-2', title: '先手', rule: RULES.take3, piles: [21], first: 'you',
    intro: '21 颗，每次取 1～3 颗，你先走。赢过电脑。',
    learn: '第一步取 1 颗，留下 20 颗（4 的倍数）。之后电脑取几颗，你就取 4 减几颗。',
  },
  {
    id: '1-3', title: '选先后手', rule: RULES.take4, piles: [23], first: 'choose',
    intro: '23 颗，这次每次可以取 1～4 颗。先想好：你要先走，还是让电脑先走？',
    learn: '每次取 1～4 颗，一轮凑 5 颗，必败局面是 5 的倍数。23 颗先取 3 颗，留下 20 颗，所以该选先走。一般地，每次取 1～k 颗时，必败局面是 k+1 的倍数。',
  },
  {
    id: '1-4', title: '只能取 1、3、4', challenge: true, rule: RULES.take134, table: { max: 16 }, piles: [21], first: 'choose',
    intro: '规则变了：每次只能取 1 颗、3 颗或 4 颗，不能取 2 颗。4 的倍数还管用吗？先填表，再选先后手对战 21 颗。',
    summary: '必败的是 0、2、7、9、14、16 颗：每 7 个一循环，除以 7 余 0 或 2 的是必败。',
    learn: '21 除以 7 余 0，是必败局面，所以该让电脑先走。之后每一步都给电脑留下除以 7 余 0 或 2 的颗数。规则一变规律就变，但倒推的方法不变。',
    hint: '回想你填的表：哪些颗数是必败？',
  },
  {
    id: '2-1', title: '二维倒推表', rule: RULES.std, table2: { max: 5 },
    intro: '两堆石子，每次只能从一堆里取，想取几颗都行，取到最后一颗的人赢。格子表示“第一堆几颗、第二堆几颗”，按两堆总数从小到大判断。',
    summary: '必败的格子排成一条斜线：两堆一样多就是必败。',
  },
  {
    id: '2-2', title: '先手', rule: RULES.std, piles: [7, 4], first: 'you',
    intro: '7 颗和 4 颗，你先走。赢过电脑。',
    learn: '先从 7 颗那堆取 3 颗，变成 4 和 4。之后电脑在一堆取几颗，你就在另一堆取几颗（对称策略），最后一颗一定是你的。',
  },
  {
    id: '2-3', title: '选先后手', rule: RULES.std, piles: [9, 9], first: 'choose',
    intro: '9 颗和 9 颗。你要先走，还是让电脑先走？',
    learn: '两堆一样多，先走的一方必败，所以该让电脑先走，然后照着电脑学：它在一堆取几颗，你就在另一堆取几颗。',
  },
  {
    id: '2-4', title: '连续判断', challenge: true, rule: RULES.std, first: 'choose',
    rounds: [[5, 5], [6, 3], [1, 2, 3], [1, 3, 4], [1, 4, 5]],
    intro: '连续 5 局，每局先判断选先手还是后手，再下完。有两堆的，也有三堆的。',
    learn: '1、2、3 和 1、4、5 是必败局面，1、3、4 是必胜局面（取成 1、2、3 或 1、4、5 都不行，要取成……自己再想想）。三堆时“一样多”不够用了，第 3 章会讲怎么判断。',
    hint: '三堆时，试着把局面走成你认识的必败局面，比如两堆一样多、另一堆取光；也可以先想想 1、2、3 是必胜还是必败。',
  },
  {
    id: '3-1', title: '色块配对', lesson: true, rule: RULES.std,
    quiz: [[1, 2, 3], [4, 5, 6], [3, 5, 6], [1, 4, 6], [3, 6, 9, 12], [5, 6, 7]],
    intro: '三堆以上怎么判断必胜还是必败？把每堆拆成色块来看。',
  },
  {
    id: '3-2', title: '三堆', rule: RULES.std, piles: [3, 4, 5], first: 'you', blocks: true,
    intro: '3、4、5 三堆，你先走。看看哪种色块落单。',
    learn: '3 = 2+1，4 = 4，5 = 4+1，2 颗的色块落单。从 3 颗那堆取 2 颗，剩 1、4、5，全部配对。之后电脑拆散哪对，你就把它重新配好。',
  },
  {
    id: '3-3', title: '选先后手', rule: RULES.std, piles: [1, 3, 5, 7], first: 'choose', blocks: true,
    intro: '1、3、5、7 四堆。你要先走，还是让电脑先走？',
    learn: '4 颗的色块有两块，2 颗的有两块，1 颗的有四块，全部配对，是必败局面，所以该让电脑先走。',
  },
  {
    id: '3-4', title: '五堆', challenge: true, rule: RULES.std, piles: [4, 8, 9, 11, 13], first: 'you', blocks: true,
    intro: '4、8、9、11、13 五堆，你先走。正确的第一步只有一种。',
    learn: '落单的是 2 颗和 1 颗的色块。只有 11 颗那堆（8+2+1）含有 2 颗的色块，从它取 3 颗剩 8 颗，落单的 2 和 1 一起去掉，全部配对。',
  },
  {
    id: '4-1', title: '最后一颗算输', rule: RULES.misere3, table: { max: 12 }, piles: [17], first: 'ai',
    intro: '规则反过来：每次取 1～3 颗，取到最后一颗的人输。先填表，再和电脑对战 17 颗（电脑先走）。',
    summary: '必败的是 1、5、9、13 颗：除以 4 余 1。和原来的规律比，整体挪了 1 颗。',
    learn: '每一步给电脑留下除以 4 余 1 的颗数，最后剩 1 颗时轮到电脑，它只能取走最后一颗。',
    hint: '回想你填的表：给电脑留下多少颗，它就输了？',
  },
  {
    id: '4-2', title: '多堆最后一颗算输', rule: RULES.misere, piles: [2, 3, 4], first: 'you', blocks: true,
    intro: '2、3、4 三堆，想取几颗都行，取到最后一颗的人输。你先走。',
    learn: '前面照常配对（第一步从 4 颗那堆取 3 颗，剩 2、3、1）。只剩一堆超过 1 颗时改变策略：把它取成 0 颗或 1 颗，让剩下的 1 颗堆有奇数个，最后一颗就是电脑的。',
    hint: '前面和标准玩法一样让色块配对。什么时候要改变策略？想想最后只剩几个 1 颗堆时该轮到谁。',
  },
  {
    id: '4-3', title: '阶梯', challenge: true, rule: RULES.stair, piles: [1, 2, 4, 3, 2], first: 'you',
    intro: '5 级台阶上放着硬币。每步选一级，把这一级上任意几枚硬币往下移一级，移到地面的就不能再动。没得走的一方输。你先走。',
    learn: '只看奇数级台阶：第 1、3、5 级的 1、4、2 枚当成三堆石子，落单的是 4、2、1。从第 3 级移 1 枚下去，剩 3 = 2+1，正好和第 1、5 级配对。偶数级上的硬币是干扰：电脑把偶数级的硬币移到奇数级，你就把它们再往下移一级。',
    hint: '偶数级台阶上的硬币有没有用？电脑把它们移下来，你能不能马上再把它们移走？',
  },
  {
    id: '4-4', title: '棋子对推', challenge: true, rule: RULES.push, rows: [[1, 6], [2, 5], [0, 4], [0, 5]], first: 'you',
    intro: '每行左边的白子是你的，右边的黑子是电脑的。轮流在任意一行把自己的棋子向前推任意格（不能跳过对方），也可以往后退。没得走的一方输。你先走。',
    learn: '每行两子之间的空格数 4、2、3、4 就是四堆石子：4 和 4 配对，2 和 3 里落单的是 1 颗的色块。把空格 3 的那一行推 1 格变成 2，全部配对。电脑后退几格，你就跟进几格，后退没有用。',
    hint: '每一行两枚棋子之间的空格数，像不像一堆石子？往前推就是取石子。',
  },
];

const chapterOf = level => CHAPTERS.find(c => c.no === level.id.split('-')[0]);

// 关卡的开局（2-4 每局一个）
function startState(level, round) {
  if (level.rows) return level.rows.map(r => r.slice());
  return (level.rounds ? level.rounds[round || 0] : level.piles).slice();
}

// 自己选先后手时，正确答案：开局是必胜就该先走
const shouldGoFirst = (level, round) => S.isWin(startState(level, round), level.rule);

// ---------- 界面 ----------
function initUI() {
  const $ = id => document.getElementById(id);
  const STORE_KEY = 'xq.nim.v1';
  const AI_THINK = 500, AI_SHOW = 700, PUSH_LIMIT = 200;

  const store = loadStore();
  const losses = {};                   // 每关输的次数，只在本次打开页面时有效
  const view = { blocks: false, analysis: false };
  const free = { mode: 'ai', rule: 'std', k: 3, source: 'random', custom: [3, 4, 5], first: 0 };
  let level = null;                    // null 表示自由对局
  let phase = null;                    // 'table' | 'choose' | 'play' | 'lesson' | 'quiz' | 'setup'
  let g = null;                        // 当前一局
  let t = null;                        // 当前倒推表
  let lesson = null;                   // 3-1 的讲解和判断
  let round = 0;                       // 2-4 第几局
  let levelPeeked = false;             // 这一关看过答案（2-4 跨局也算）
  let gameId = 0;

  function loadStore() {
    try {
      const o = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
      return { done: new Set(o.done || []), tables: new Set(o.tables || []) };
    } catch {
      return { done: new Set(), tables: new Set() };
    }
  }

  function saveStore() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ done: [...store.done], tables: [...store.tables] }));
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

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function setMessage(cls, html) {
    const m = $('message');
    m.className = cls;
    m.innerHTML = html;
  }

  const list = xs => xs.join('、');
  const pilesText = p => list(p);
  const lossCount = () => (level ? losses[level.id] || 0 : 0);

  function markDone() {
    if (!level || store.done.has(level.id)) return;
    store.done.add(level.id);
    saveStore();
    renderNav();
  }

  // ---------- 一局 ----------
  // players：[{ name, ai, side }]，side 只有棋子对推用（'w' 白 / 'b' 黑）
  function startGame(state, rule, players, first) {
    clearTimeout(g && g.timer);
    gameId++;
    g = {
      id: gameId, rule, state, players, turn: first, history: [], moves: 0,
      sel: null, pending: null, over: false, winner: null, peeked: g && g.keepPeek ? true : false,
    };
    phase = 'play';
    setMessage('', '');
    $('info').innerHTML = '';
    render();
    nextTurn();
  }

  const current = () => g.players[g.turn];
  const sideOf = p => p.side || 'w';

  function nextTurn() {
    if (g.over) return;
    const p = current();
    if (!S.moves(g.state, g.rule, sideOf(p)).length) return finish();
    if (g.rule.kind === 'push' && g.moves >= PUSH_LIMIT) return finish(true);
    if (p.ai) {
      const id = g.id;
      g.timer = setTimeout(() => {
        if (g.id !== id) return;
        g.pending = S.aiMove(g.state, g.rule, sideOf(p));
        render();
        g.timer = setTimeout(() => {
          if (g.id !== id) return;
          const m = g.pending;
          g.pending = null;
          play(m);
        }, AI_SHOW);
      }, AI_THINK);
    } else if (g.peeked && level) {
      autoHint();
    }
    render();
  }

  function play(m) {
    g.history.push({ state: g.state, turn: g.turn });
    g.state = S.apply(g.state, g.rule, m, sideOf(current()));
    g.turn = 1 - g.turn;
    g.moves++;
    g.sel = null;
    if (!level || phase === 'play') setMessage('', '');
    nextTurn();
    render();
  }

  // 轮到的一方无路可走：一般是他输，"取到最后一颗算输"时是他赢
  function finish(draw) {
    g.over = true;
    g.sel = null;
    if (draw) {
      g.winner = null;
      setMessage('', `已经走了 ${PUSH_LIMIT} 步，算平局。`);
      render();
      return;
    }
    const moverWins = g.rule.kind === 'nim' && g.rule.misere;
    g.winner = moverWins ? g.turn : 1 - g.turn;
    const w = g.players[g.winner];
    if (!level) {
      if (g.players.every(p => !p.ai)) setMessage('ok', `${w.name}赢了！`);
      else setMessage(w.ai ? 'fail' : 'ok', w.ai ? '电脑赢了。再来一局？' : '你赢了！');
    } else if (w.ai) {
      losses[level.id] = lossCount() + 1;
      setMessage('fail', '电脑赢了。' + lossHint());
    } else {
      wonLevel();
    }
    render();
  }

  function wonLevel() {
    if (level.rounds && round < level.rounds.length - 1) {
      round++;
      g.nextRound = true;
      setMessage('ok', `第 ${round} 局赢了！点「下一局」接着下。`);
      return;
    }
    round = 0;
    if (g.peeked || levelPeeked) {
      setMessage('ok', '赢了！不过这一关看过答案，点「重来」自己再赢一次才算过关。');
      return;
    }
    setMessage('ok', '赢了，过关！');
    markDone();
    losses[level.id] = 0;
    if (level.learn) $('info').innerHTML = `<p class="learn"><b>想一想</b>　${level.learn}</p>`;
  }

  // 输的次数越多，提示越多
  function lossHint() {
    const n = lossCount();
    const tips = [];
    if (n >= 2) tips.push(level.hint || chapterOf(level).hint || '');
    if (n >= 3) tips.push('从现在起，轮到你时会显示当前是必胜还是必败局面。');
    if (n >= 4) tips.push('还可以点「提示」看一种正确走法，或者点「看答案」（看过答案的这一关要重做才算过关）。');
    return tips.filter(Boolean).join('');
  }

  function restart() {
    if (!level) return startFree();
    const peek = g && g.peeked;
    if (g) clearTimeout(g.timer);
    g = null;
    if (levelPeeked) round = 0;   // 看过答案就从第一局重新来
    levelPeeked = false;
    loadLevelPhase();
    if (peek) setMessage('', '重新下一遍，这次赢了就算数。');
  }

  function undo() {
    if (!g.history.length) return;
    clearTimeout(g.timer);
    const h = g.history.pop();
    g.state = h.state;
    g.turn = h.turn;
    g.moves--;
    g.over = false;
    g.winner = null;
    g.sel = null;
    g.pending = null;
    setMessage('', '');
    render();
  }

  // ---------- 提示 ----------
  function goodMoves() {
    return S.winningMoves(g.state, g.rule, sideOf(current()));
  }

  function showHint() {
    if (g.over || current().ai) return;
    const good = goodMoves();
    if (!good.length) {
      setMessage('fail', '现在是必败局面，怎么走都留不下必败局面，只能等电脑犯错。点「重来」再试一次。');
      return;
    }
    g.sel = Object.assign({}, good[0]);
    setMessage('', '提示：试试亮起的这一步。' + moveText(good[0]));
    render();
  }

  function autoHint() {
    const good = goodMoves();
    if (good.length) {
      g.sel = Object.assign({}, good[0]);
      setMessage('', '答案：' + moveText(good[0]));
    }
  }

  function showAnswer() {
    if (!g) return;
    g.peeked = true;
    levelPeeked = true;
    if (phase === 'choose') {
      const first = shouldGoFirst(level, round);
      setMessage('', `答案：这个局面先走的一方${first ? '必胜，选「我先走」' : '必败，选「电脑先走」'}。之后每步都会亮出正确走法。`);
      return;
    }
    if (!g.over && !current().ai) autoHint();
    render();
  }

  function moveText(m) {
    if (g.rule.kind === 'push') return `第 ${m.i + 1} 行走到第 ${m.to + 1} 格。`;
    if (g.rule.kind === 'stair') return `把第 ${m.i + 1} 级的 ${m.n} 枚移到${m.i ? `第 ${m.i} 级` : '地面'}。`;
    return g.state.length > 1 ? `从第 ${m.i + 1} 堆取 ${m.n} 颗。` : `取 ${m.n} 颗。`;
  }

  // ---------- 学生的操作 ----------
  const myTurn = () => g && phase === 'play' && !g.over && !current().ai;
  const allowed = n => !g.rule.take || g.rule.take.includes(n);

  // 石子、阶梯：点一堆选中，点石子时从上往下取到这一颗
  function pickPile(i, n) {
    if (!myTurn() || !g.state[i]) return;
    if (n === undefined) {
      n = g.sel && g.sel.i === i ? g.sel.n : firstAllowed(g.state[i]);
    }
    g.sel = { i, n: Math.min(n, g.state[i]) };
    setMessage('', '');
    render();
  }

  const firstAllowed = c => { for (let n = 1; n <= c; n++) if (allowed(n)) return n; return 1; };

  function step(d) {
    if (!g.sel) return;
    const c = g.state[g.sel.i];
    let n = g.sel.n;
    do { n += d; } while (n >= 1 && n <= c && !allowed(n));
    if (n < 1 || n > c) return;
    g.sel.n = n;
    render();
  }

  function takeSel() {
    if (!myTurn() || !g.sel) return;
    if (g.rule.kind === 'push') return play(g.sel);
    if (!allowed(g.sel.n)) {
      setMessage('fail', `每次只能取 ${list(g.rule.take)} 颗。`);
      return;
    }
    play(g.sel);
  }

  function pickCell(i, to) {
    if (!myTurn()) return;
    const [w, b] = g.state[i];
    const side = sideOf(current());
    const ok = side === 'w' ? to < b && to !== w : to > w && to !== b;
    if (!ok) return;
    g.sel = { i, to };
    render();
  }

  // ---------- 倒推表 ----------
  function startTable() {
    const two = !!level.table2;
    const max = (level.table || level.table2).max;
    t = { two, max, marks: new Map(), sel: null };
    // 无路可走的局面预先填好
    const first = two ? [0, 0] : [0];
    t.marks.set(first.join(','), S.isWin(first, level.rule));
    phase = 'table';
    setMessage('', terminalText(first));
    t.sel = nextCell();
    render();
  }

  const cellKey = s => s.join(',');
  const stateText = s => (s.length === 1 ? `${s[0]} 颗` : `${s[0]} 颗和 ${s[1]} 颗`);
  const winText = w => (w ? '必胜' : '必败');

  function cells() {
    const out = [];
    if (!t.two) { for (let n = 0; n <= t.max; n++) out.push([n]); return out; }
    for (let b = 0; b <= t.max; b++) for (let a = 0; a <= t.max; a++) out.push([a, b]);
    return out;
  }

  // 一维按颗数，二维按总数：比当前格小的都填完了才能填
  const order = s => (s.length === 1 ? s[0] : s[0] + s[1]);
  const layer = () => Math.min(...cells().filter(s => !t.marks.has(cellKey(s))).map(order));
  const fillable = s => !t.marks.has(cellKey(s)) && order(s) === layer();

  function nextCell() {
    const c = cells().find(fillable);
    return c || null;
  }

  function terminalText(s) {
    const e = S.explain(s, level.rule);
    return e.win
      ? `${stateText(s)}：轮到你时已经没有石子，说明上一步对方取走了最后一颗——对方输了。所以这是必胜，已经填好。`
      : `${stateText(s)}：轮到你时已经没有石子，说明上一步对方取走了最后一颗，你输了。所以这是必败，已经填好。`;
  }

  function reason(s) {
    const e = S.explain(s, level.rule);
    const from = `从 ${stateText(s)}`;
    if (e.win) {
      const how = s.length === 1 ? `取 ${e.move.n} 颗剩 ${e.next[0]} 颗` : `，在第 ${e.move.i + 1} 堆取 ${e.move.n} 颗，变成 ${stateText(e.next)}`;
      return `${from}${how}，${stateText(e.next)}是必败，留给对方，所以 ${stateText(s)}是必胜。`;
    }
    let nexts;
    if (s.length === 1) {
      const takes = S.moves(s, level.rule).map(m => m.n);
      nexts = `能取 ${list(takes)} 颗，剩 ${list(e.nexts.map(x => x[0]))} 颗`;
    } else {
      const shown = e.nexts.slice(0, 4).map(stateText);
      nexts = `，走一步能变成 ${list(shown)}${e.nexts.length > 4 ? `……共 ${e.nexts.length} 种` : ''}`;
    }
    return `${from}${nexts}，都是必胜，留给对方的都是必胜，所以 ${stateText(s)}是必败。`;
  }

  function pickTableCell(s) {
    if (!fillable(s)) {
      if (!t.marks.has(cellKey(s))) setMessage('', t.two ? '先把两堆总数更少的格子填完。' : '按顺序填，先填前面的格子。');
      return;
    }
    t.sel = s;
    render();
  }

  function markCell(win) {
    if (!t.sel) return;
    const s = t.sel;
    const right = S.isWin(s, level.rule);
    if (win !== right) {
      setMessage('fail', `不对。${reason(s)}`);
      return;
    }
    t.marks.set(cellKey(s), right);
    t.sel = nextCell();
    if (t.sel) {
      setMessage('ok', `对。${reason(s)}`);
    } else {
      store.tables.add(level.id);
      saveStore();
      tableDone();
    }
    render();
  }

  function tableDone() {
    t.sel = null;
    const tail = level.piles ? '点「开始对战」。' : '过关！';
    setMessage('ok', `表填完了。${level.summary}${tail}`);
    if (!level.piles) markDone();
  }

  // ---------- 3-1 色块讲解 ----------
  const LESSON = [
    { piles: [3, 5, 6], text: '看 3、5、6 这三堆。能不能一眼看出，先走的一方是必胜还是必败？' },
    { piles: [3, 5, 6], blocks: true, text: '把每堆拆成 8、4、2、1 颗的色块，每种大小最多一块：3 = 2+1，5 = 4+1，6 = 4+2。同样大小的色块用同一种颜色。' },
    { piles: [3, 5, 6], blocks: true, text: '同样大小的色块两两配对：4 颗的有两块，2 颗的有两块，1 颗的有两块，全部配上了。这样的局面是<b>必败</b>：不管怎么取，都会拆散配对；对手总能把它重新配好。' },
    { piles: [3, 4, 5], blocks: true, odd: true, text: '再看 3、4、5：3 = 2+1，4 = 4，5 = 4+1。4 颗的配上了，1 颗的配上了，2 颗的色块落单（发亮的那块）。' },
    { piles: [1, 4, 5], blocks: true, text: '有色块落单时是<b>必胜</b>：从含有落单色块的那堆（3 颗）取 2 颗，剩 1、4、5，又全部配对了，把必败局面留给对手。' },
    { piles: [4, 4], blocks: true, text: '两堆一样多时，色块自然全部配对，就是第 2 章的对称策略。下面判断 6 个局面：色块能不能全部配对？' },
  ];

  function startLesson() {
    phase = 'lesson';
    lesson = { step: 0, quiz: 0, wrong: 0, answered: false };
    setMessage('', '');
    render();
  }

  function lessonStep(d) {
    lesson.step += d;
    if (lesson.step >= LESSON.length) {
      phase = 'quiz';
      lesson.quiz = 0;
      lesson.wrong = 0;
      lesson.answered = false;
      setMessage('', '');
    }
    render();
  }

  function answerQuiz(paired) {
    if (lesson.answered) return;
    const p = level.quiz[lesson.quiz];
    const right = S.nimSum(p) === 0;
    lesson.answered = true;
    const why = right
      ? '所有色块都配上了，是必败局面。'
      : `${list(S.unpaired(p).map(b => `${b} 颗的有 ${p.filter(c => c & b).length} 块`))}，两两配对后总有一块剩下（发亮），是必胜局面。`;
    if (paired === right) setMessage('ok', '对。' + why);
    else { lesson.wrong++; setMessage('fail', '不对。' + why); }
    render();
  }

  function nextQuiz() {
    lesson.quiz++;
    lesson.answered = false;
    setMessage('', '');
    if (lesson.quiz >= level.quiz.length) {
      if (lesson.wrong) {
        setMessage('fail', `错了 ${lesson.wrong} 个，再做一遍，全对才过关。`);
        lesson.quiz = 0;
        lesson.wrong = 0;
      } else {
        setMessage('ok', '全对，过关！从下一关开始，石子会按色块上色（可以用下面的开关关掉）。');
        markDone();
        lesson.finished = true;
      }
    }
    render();
  }

  // ---------- 渲染 ----------
  function render() {
    const board = $('board');
    const controls = $('controls');
    const acts = $('actions');
    board.innerHTML = '';
    controls.innerHTML = '';
    acts.innerHTML = '';
    $('turn').hidden = true;
    $('status').textContent = '';
    renderSetup();
    renderToggles();
    if (phase === 'table') return renderTable(board, controls);
    if (phase === 'lesson' || phase === 'quiz') return renderLesson(board, controls, acts);
    if (!g) return;
    if (g.rule.kind === 'push') renderPush(board);
    else if (g.rule.kind === 'stair') renderStair(board);
    else board.appendChild(pilesEl(g.state, { interactive: true }));
    if (phase === 'choose') return renderChoose(controls, acts);
    renderTurn();
    renderControls(controls);
    renderActions(acts);
  }

  function renderTurn() {
    const bar = $('turn');
    bar.hidden = false;
    bar.className = 'turn p' + g.turn;
    if (g.over) {
      bar.className = 'turn';
      bar.textContent = g.winner === null ? '平局' : `${g.players[g.winner].name}赢了`;
      return;
    }
    const p = current();
    bar.textContent = p.ai ? '电脑在想……' : (g.players.some(x => x.ai) ? '轮到你了' : `轮到${p.name}`);
    const show = view.analysis || (level && lossCount() >= 3 && !p.ai);
    if (show && !p.ai) {
      const good = goodMoves();
      $('status').textContent = good.length
        ? `现在是必胜局面（有 ${good.length} 种正确走法）`
        : '现在是必败局面（对方不犯错就赢不了）';
    }
  }

  // 一列石子；blocks 时按 8、4、2、1 分组上色
  function pilesEl(piles, opts) {
    const box = el('div', 'piles' + (piles.length === 1 ? ' single' : ''));
    const showBlocks = opts.blocks !== undefined ? opts.blocks : view.blocks;
    const odd = opts.odd ? S.unpaired(piles) : [];
    piles.forEach((c, i) => {
      const col = el('div', 'pile');
      const take = g && opts.interactive ? takeCount(i) : { n: 0 };
      if (take.n && take.cls === 'sel') col.classList.add('sel');
      const stack = el('div', 'stack');
      const groups = showBlocks ? S.blocks(c).slice().reverse() : [c];
      let k = 0;   // 从下往上第几颗
      groups.forEach(size => {
        const grp = el('div', 'grp' + (showBlocks ? ' b' + size : '') + (odd.includes(size) ? ' odd' : ''));
        for (let j = 0; j < size; j++, k++) {
          const s = el('span', 'stone');
          if (take.n && k >= c - take.n) s.classList.add(take.cls);
          s.dataset.k = k;
          grp.appendChild(s);
        }
        stack.appendChild(grp);
      });
      col.appendChild(stack);
      col.appendChild(el('div', 'count', String(c)));
      if (opts.interactive) {
        col.setAttribute('role', 'button');
        col.addEventListener('click', e => {
          const k2 = e.target.dataset && e.target.dataset.k;
          pickPile(i, k2 !== undefined ? c - Number(k2) : undefined);
        });
      }
      box.appendChild(col);
    });
    return box;
  }

  function takeCount(i) {
    if (g.pending && g.pending.i === i) return { n: g.pending.n, cls: 'ai' };
    if (g.sel && g.sel.i === i && !g.over) return { n: g.sel.n, cls: 'sel' };
    return { n: 0 };
  }

  function renderStair(board) {
    const box = el('div', 'stair');
    const total = startState(level).reduce((a, b) => a + b, 0);
    const ground = total - g.state.reduce((a, b) => a + b, 0);
    const gcol = el('div', 'stepcol ground');
    gcol.appendChild(el('div', 'coins', '<span class="coin"></span>'.repeat(ground)));
    gcol.appendChild(el('div', 'step', '地面'));
    box.appendChild(gcol);
    g.state.forEach((c, i) => {
      const col = el('div', 'stepcol');
      const take = takeCount(i);
      if (take.n && take.cls === 'sel') col.classList.add('sel');
      const coins = el('div', 'coins');
      for (let k = 0; k < c; k++) {
        const s = el('span', 'coin');
        if (take.n && k >= c - take.n) s.classList.add(take.cls);
        s.dataset.k = k;
        coins.appendChild(s);
      }
      col.appendChild(coins);
      const st = el('div', 'step', String(i + 1));
      st.style.height = (i + 1) * 16 + 'px';
      col.appendChild(st);
      col.setAttribute('role', 'button');
      col.addEventListener('click', e => {
        const k2 = e.target.dataset && e.target.dataset.k;
        pickPile(i, k2 !== undefined ? c - Number(k2) : undefined);
      });
      box.appendChild(col);
    });
    board.appendChild(box);
  }

  function renderPush(board) {
    const box = el('div', 'push');
    const w = g.rule.width;
    g.state.forEach(([a, b], i) => {
      const row = el('div', 'prow');
      for (let x = 0; x < w; x++) {
        let cls = 'cell';
        let html = '';
        if (x === a) { cls += ' white'; html = '<span class="piece"></span>'; }
        if (x === b) { cls += ' black'; html = '<span class="piece"></span>'; }
        if (x > a && x < b) cls += ' gap';
        if (g.sel && g.sel.i === i && g.sel.to === x && !g.over) cls += ' target';
        if (g.pending && g.pending.i === i && g.pending.to === x) cls += ' aitarget';
        row.appendChild(button(html, () => pickCell(i, x), cls));
      }
      box.appendChild(row);
    });
    board.appendChild(box);
  }

  function renderControls(box) {
    if (!myTurn()) return;
    const kind = g.rule.kind;
    if (kind === 'push') {
      box.appendChild(el('span', 'ctext', g.sel ? `第 ${g.sel.i + 1} 行白子走到第 ${g.sel.to + 1} 格` : '点一行里的空格，把白子走过去'));
      if (g.sel) box.appendChild(button('走', takeSel, 'primary'));
      return;
    }
    if (!g.sel) {
      box.appendChild(el('span', 'ctext', kind === 'stair' ? '点一级台阶，选要往下移的硬币' : '点一堆石子，选要取走的颗数'));
      return;
    }
    const unit = kind === 'stair' ? '枚' : '颗';
    const where = kind === 'stair'
      ? `第 ${g.sel.i + 1} 级移`
      : g.state.length > 1 ? `第 ${g.sel.i + 1} 堆取` : '取';
    box.appendChild(el('span', 'ctext', where));
    box.appendChild(button('−', () => step(-1), 'stepper'));
    box.appendChild(el('span', 'num', String(g.sel.n)));
    box.appendChild(button('+', () => step(1), 'stepper'));
    box.appendChild(el('span', 'ctext', unit + (kind === 'stair' ? `到${g.sel.i ? `第 ${g.sel.i} 级` : '地面'}` : '')));
    box.appendChild(button(kind === 'stair' ? '移动' : '取走', takeSel, 'primary'));
  }

  function renderActions(box) {
    const duo = g.players.every(p => !p.ai);
    if (duo) {
      box.appendChild(button('悔棋', undo));
      box.appendChild(button(g.over ? '再来一局' : '重新开始', () => { free.first = g.over ? 1 - free.first : free.first; startFree(); }));
      box.appendChild(button('换设置', freeSetup));
      return;
    }
    box.appendChild(button(level ? '重来' : (g.over ? '再来一局' : '重新开始'), restart));
    if (!level) box.appendChild(button('换设置', freeSetup));
    if (level && lossCount() >= 4 && !g.over) {
      box.appendChild(button('提示', showHint));
      box.appendChild(button('看答案', showAnswer));
    }
    if (g.nextRound) box.appendChild(button('下一局', () => { g = null; loadLevelPhase(); }, 'primary'));
  }

  function renderChoose(controls, acts) {
    const st = startState(level, round);
    const label = level.rounds ? `第 ${round + 1} / ${level.rounds.length} 局：${pilesText(st)}。` : '';
    controls.appendChild(el('span', 'ctext', label + '你要先走，还是让电脑先走？'));
    const row = el('div', 'row');
    row.appendChild(button('我先走', () => startLevelGame(0), 'primary'));
    row.appendChild(button('电脑先走', () => startLevelGame(1)));
    controls.appendChild(row);
    if (lossCount() >= 3) {
      $('status').textContent = `这个局面先走的一方是${winText(S.isWin(st, level.rule))}`;
    }
    if (lossCount() >= 4) acts.appendChild(button('看答案', showAnswer));
  }

  function renderTable(board, controls) {
    const box = el('div', t.two ? 'tbl2' : 'tbl1');
    const cellBtn = s => {
      const k = cellKey(s);
      let cls = 'tcell';
      let label = '';
      if (t.marks.has(k)) { const w = t.marks.get(k); cls += w ? ' w' : ' l'; label = w ? '胜' : '败'; }
      else if (fillable(s)) cls += ' open';
      if (t.sel && cellKey(t.sel) === k) cls += ' cur';
      const html = t.two ? `<b>${label}</b>` : `<span>${s[0]}</span><b>${label}</b>`;
      return button(html, () => pickTableCell(s), cls);
    };
    if (!t.two) {
      cells().forEach(s => box.appendChild(cellBtn(s)));
    } else {
      box.style.gridTemplateColumns = `24px repeat(${t.max + 1}, 1fr)`;
      box.appendChild(el('span', 'axis', ''));
      for (let a = 0; a <= t.max; a++) box.appendChild(el('span', 'axis', String(a)));
      for (let b = 0; b <= t.max; b++) {
        box.appendChild(el('span', 'axis', String(b)));
        for (let a = 0; a <= t.max; a++) box.appendChild(cellBtn([a, b]));
      }
    }
    board.appendChild(box);
    if (t.two) board.appendChild(el('p', 'note', '横着数是第一堆的颗数，竖着数是第二堆的颗数。'));
    if (t.sel) {
      controls.appendChild(el('span', 'ctext', `轮到你时剩 ${stateText(t.sel)}，这是：`));
      const row = el('div', 'row');
      row.appendChild(button('必胜', () => markCell(true), 'primary'));
      row.appendChild(button('必败', () => markCell(false), 'lose'));
      controls.appendChild(row);
    } else if (level.piles) {
      const row = el('div', 'row');
      row.appendChild(button('开始对战', () => loadLevelPhase(), 'primary'));
      controls.appendChild(row);
    }
  }

  function renderLesson(board, controls, acts) {
    if (phase === 'lesson') {
      const s = LESSON[lesson.step];
      board.appendChild(pilesEl(s.piles, { blocks: !!s.blocks, odd: !!s.odd }));
      board.appendChild(el('p', 'lesson', s.text));
      const row = el('div', 'row');
      const prev = button('上一步', () => lessonStep(-1));
      prev.disabled = lesson.step === 0;
      row.appendChild(prev);
      row.appendChild(button(lesson.step === LESSON.length - 1 ? '开始判断' : '下一步', () => lessonStep(1), 'primary'));
      controls.appendChild(row);
      return;
    }
    if (lesson.finished) {
      board.appendChild(el('p', 'lesson', '色块全部配对是必败局面；有色块落单是必胜局面，从含有最大那块落单色块的一堆里取，让所有色块重新配对。'));
      acts.appendChild(button('再看一遍讲解', startLesson));
      return;
    }
    const p = level.quiz[lesson.quiz];
    board.appendChild(pilesEl(p, { blocks: true, odd: lesson.answered }));
    controls.appendChild(el('span', 'ctext', `第 ${lesson.quiz + 1} / ${level.quiz.length} 题：${pilesText(p)}，色块能全部配对吗？`));
    const row = el('div', 'row');
    if (!lesson.answered) {
      row.appendChild(button('全部配对<small>必败</small>', () => answerQuiz(true)));
      row.appendChild(button('有落单<small>必胜</small>', () => answerQuiz(false)));
    } else {
      row.appendChild(button('下一题', nextQuiz, 'primary'));
    }
    controls.appendChild(row);
    acts.appendChild(button('再看一遍讲解', startLesson));
  }

  function renderToggles() {
    const box = $('toggles');
    box.innerHTML = '';
    const game = g && (phase === 'play' || phase === 'choose') && g.rule.kind === 'nim';
    const items = [];
    if (game && (!level || chapterOf(level).no >= '3')) items.push(['blocks', '按色块上色']);
    if (g && phase === 'play' && (!level || store.done.has(level.id))) items.push(['analysis', '局面分析']);
    items.forEach(([k, text]) => {
      const lab = el('label', '', `<input type="checkbox"${view[k] ? ' checked' : ''}> ${text}`);
      lab.querySelector('input').addEventListener('change', e => { view[k] = e.target.checked; render(); });
      box.appendChild(lab);
    });
  }

  // ---------- 自由对局 ----------
  function freeRule() {
    if (free.rule === 'take') return { kind: 'nim', take: Array.from({ length: free.k }, (_, i) => i + 1) };
    if (free.rule === 'misere') return RULES.misere;
    return RULES.std;
  }

  function freePiles() {
    if (free.source === 'custom') return free.custom.slice();
    const n = 2 + Math.floor(Math.random() * 4);
    return Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 15));
  }

  function freeSetup() {
    clearTimeout(g.timer);
    g = null;
    phase = 'setup';
    setMessage('', '');
    render();
  }

  function startFree() {
    const players = free.mode === 'ai'
      ? [{ name: '你', ai: false }, { name: '电脑', ai: true }]
      : [{ name: '甲', ai: false }, { name: '乙', ai: false }];
    startGame(freePiles(), freeRule(), players, free.first);
  }

  function renderSetup() {
    const box = $('setup');
    box.innerHTML = '';
    if (level || g) return;
    const choices = (items, key, after) => {
      const row = el('div', 'choices');
      items.forEach(([id, name]) => row.appendChild(button(name, () => { free[key] = id; if (after) after(); render(); }, free[key] === id ? 'on' : '')));
      box.appendChild(row);
    };
    choices([['ai', '对电脑'], ['duo', '同桌对战']], 'mode', () => { free.first = 0; });
    choices([['std', '标准'], ['take', `每次取 1～${free.k} 颗`], ['misere', '最后一颗算输']], 'rule');
    const opts = el('div', 'opts');
    if (free.rule === 'take') {
      opts.appendChild(el('span', 'ctext', '每次最多取'));
      opts.appendChild(button('−', () => { free.k = Math.max(2, free.k - 1); render(); }, 'stepper'));
      opts.appendChild(el('span', 'num', String(free.k)));
      opts.appendChild(button('+', () => { free.k = Math.min(5, free.k + 1); render(); }, 'stepper'));
      opts.appendChild(el('span', 'ctext', '颗'));
    }
    box.appendChild(opts);
    choices([['random', '随机发石子'], ['custom', '自己摆']], 'source');
    if (free.source === 'custom') {
      const ed = el('div', 'editor');
      const head = el('div', 'opts');
      head.appendChild(el('span', 'ctext', '堆数'));
      head.appendChild(button('−', () => { if (free.custom.length > 1) free.custom.pop(); render(); }, 'stepper'));
      head.appendChild(el('span', 'num', String(free.custom.length)));
      head.appendChild(button('+', () => { if (free.custom.length < 5) free.custom.push(3); render(); }, 'stepper'));
      ed.appendChild(head);
      free.custom.forEach((c, i) => {
        const r = el('div', 'opts');
        r.appendChild(el('span', 'ctext', `第 ${i + 1} 堆`));
        r.appendChild(button('−', () => { free.custom[i] = Math.max(1, c - 1); render(); }, 'stepper'));
        r.appendChild(el('span', 'num', String(c)));
        r.appendChild(button('+', () => { free.custom[i] = Math.min(15, c + 1); render(); }, 'stepper'));
        ed.appendChild(r);
      });
      box.appendChild(ed);
    }
    const row = el('div', 'row');
    if (free.mode === 'ai') {
      row.appendChild(button('开始，我先走', () => { free.first = 0; startFree(); }, 'primary'));
      row.appendChild(button('开始，电脑先走', () => { free.first = 1; startFree(); }));
    } else {
      row.appendChild(button('开始（甲先走）', () => { free.first = 0; startFree(); }, 'primary'));
    }
    box.appendChild(row);
  }

  // ---------- 关卡 ----------
  function startLevelGame(first) {
    const players = [
      { name: '你', ai: false, side: 'w' },
      { name: '电脑', ai: true, side: 'b' },
    ];
    const keepPeek = g && g.peeked;
    g = keepPeek ? { keepPeek: true, peeked: true } : null;
    startGame(startState(level, round), level.rule, players, first);
  }

  // 按关卡形式进入对应环节：没填完的表 → 讲解 → 选先后手 → 对战
  function loadLevelPhase() {
    t = null;
    lesson = null;
    if ((level.table || level.table2) && !store.tables.has(level.id)) return startTable();
    if (level.lesson) return startLesson();
    if (!level.piles && !level.rows && !level.rounds) {
      // 只有表、已经填过：显示填好的表
      startTable();
      cells().forEach(s => t.marks.set(cellKey(s), S.isWin(s, level.rule)));
      t.sel = null;
      setMessage('ok', `这张表已经填完了。${level.summary}`);
      return render();
    }
    if (level.first === 'choose') {
      phase = 'choose';
      g = { rule: level.rule, state: startState(level, round), players: [], peeked: g && g.peeked, over: false };
      setMessage('', '');
      $('info').innerHTML = '';
      return render();
    }
    startLevelGame(level.first === 'ai' ? 1 : 0);
  }

  // ---------- 导航 ----------
  function locked(l) {
    const first = LEVELS.find(x => x.id.startsWith(l.id.split('-')[0] + '-'));
    return first !== l && !store.done.has(first.id);
  }

  function renderNav() {
    const chap = level ? level.id.split('-')[0] : null;
    $('chapters').innerHTML = '';
    const fb = button('自由对局', () => { location.hash = '#free'; });
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
      const lock = locked(l);
      const b = button(`${l.id}${l.challenge ? '★' : ''}${store.done.has(l.id) ? ' ✓' : lock ? ' 🔒' : ''}`, () => {
        if (lock) {
          setMessage('', `先完成 ${chap}-1，这一章后面的关卡才会开放。`);
          return;
        }
        location.hash = '#' + l.id;
      });
      if (store.done.has(l.id)) b.classList.add('done');
      if (lock) b.classList.add('locked');
      if (l.id === level.id) b.classList.add('current');
      $('levels').appendChild(b);
    });
  }

  function load(id) {
    if (g) clearTimeout(g.timer);
    g = null;
    t = null;
    lesson = null;
    round = 0;
    levelPeeked = false;
    level = LEVELS.find(l => l.id === id) || null;
    if (level && locked(level)) level = LEVELS.find(l => l.id === id.split('-')[0] + '-1');
    view.blocks = !!(level && level.blocks);
    view.analysis = false;
    renderNav();
    setMessage('', '');
    $('info').innerHTML = '';
    if (!level) {
      $('hint').textContent = '几堆石子，轮流取，每次只能从一堆里取。可以和电脑下，也可以和同桌轮流用一台手机下。';
      phase = 'setup';
      render();
      return;
    }
    $('hint').textContent = `${level.id} ${level.title}：${level.intro}`;
    loadLevelPhase();
  }

  window.addEventListener('hashchange', () => load(location.hash.slice(1)));
  load(location.hash.slice(1) || '1-1');
}

if (typeof document !== 'undefined') initUI();
if (typeof module !== 'undefined') module.exports = { RULES, CHAPTERS, LEVELS, chapterOf, startState, shouldGoFirst };
