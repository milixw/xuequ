'use strict';

// 取石子：求解器、色块配对和各变式的规律、关卡数据、电脑走法、倒推表的理由
const { test, assert } = require('./harness');
const S = require('../src/games/nim/solver.js');
const { RULES, LEVELS, startState, shouldGoFirst } = require('../src/games/nim/game.js');

function rng(seed) {
  return () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
}

// 所有 k 堆、每堆 0～max 的局面（不排序，顺序有关的阶梯也能用）
function eachState(k, max, fn) {
  const s = new Array(k).fill(0);
  (function rec(i) {
    if (i === k) return fn(s.slice());
    for (let v = 0; v <= max; v++) { s[i] = v; rec(i + 1); }
  })(0);
}

const lose = (max, rule) => Array.from({ length: max + 1 }, (_, n) => n).filter(n => !S.isWin([n], rule));

test('取石子：一堆时的必败局面', () => {
  for (let k = 2; k <= 5; k++) {
    const rule = { kind: 'nim', take: Array.from({ length: k }, (_, i) => i + 1) };
    lose(30, rule).forEach(n => assert(n % (k + 1) === 0, `取 1～${k} 时 ${n} 不该是必败`));
    assert(lose(30, rule).length === Math.floor(30 / (k + 1)) + 1, `取 1～${k} 时必败局面数不对`);
  }
  assert(lose(21, RULES.take134).join() === '0,2,7,9,14,16,21', '取 1、3、4 时必败局面应是除以 7 余 0、2');
  assert(lose(17, RULES.misere3).join() === '1,5,9,13,17', '最后一颗算输、取 1～3 时必败局面应是除以 4 余 1');
});

test('取石子：色块配对和穷举一致（3 堆各 0～7 颗）', () => {
  eachState(3, 7, p => {
    assert(S.isWin(p, RULES.std) === (S.nimSum(p) !== 0), `${p} 的色块判断和穷举不一致`);
    const good = S.winningMoves(p, RULES.std).map(m => m.i + ':' + m.n).sort().join();
    const pair = S.pairMoves(p).map(m => m.i + ':' + m.n).sort().join();
    assert(good === pair, `${p} 的配对走法和穷举不一致`);
  });
  assert(S.blocks(13).join() === '8,4,1', '13 应拆成 8、4、1');
  assert(S.unpaired([3, 4, 5]).join() === '2', '3、4、5 落单的应是 2');
});

test('取石子：最后一颗算输（多堆）、阶梯的规律和穷举一致', () => {
  eachState(3, 6, p => assert(S.isWin(p, RULES.misere) === S.misereWin(p), `最后一颗算输 ${p} 不一致`));
  eachState(4, 3, s => assert(S.isWin(s, RULES.stair) === S.stairWin(s), `阶梯 ${s} 不一致`));
  eachState(5, 2, s => assert(S.isWin(s, RULES.stair) === S.stairWin(s), `阶梯 ${s} 不一致`));
});

test('取石子：关卡开局，学生一方按正确的先后手能赢', () => {
  for (const l of LEVELS) {
    if (!l.piles && !l.rows && !l.rounds) continue;
    const rounds = l.rounds ? l.rounds.length : 1;
    for (let r = 0; r < rounds; r++) {
      const s = startState(l, r);
      const win = S.isWin(s, l.rule);
      if (l.first === 'you') assert(win, `${l.id} 你先走，开局应是必胜`);
      if (l.first === 'ai') assert(!win, `${l.id} 电脑先走，开局应是必败`);
      if (l.first === 'choose') assert(shouldGoFirst(l, r) === win, `${l.id} 第 ${r + 1} 局先后手答案不对`);
    }
  }
  const byId = id => LEVELS.find(l => l.id === id);
  assert(shouldGoFirst(byId('1-3')) && !shouldGoFirst(byId('1-4')), '1-3 该先走，1-4 该后走');
  assert(!shouldGoFirst(byId('2-3')) && !shouldGoFirst(byId('3-3')), '2-3、3-3 该后走');
  const r24 = byId('2-4').rounds.map((_, r) => shouldGoFirst(byId('2-4'), r));
  assert(r24.includes(true) && r24.includes(false), '2-4 应该有该先走的，也有该后走的');
});

test('取石子：挑战关的正确第一步唯一', () => {
  const one = (id, expect) => {
    const l = LEVELS.find(x => x.id === id);
    const ms = S.winningMoves(startState(l), l.rule, 'w');
    assert(ms.length === 1, `${id} 的正确走法有 ${ms.length} 种`);
    assert(JSON.stringify(ms[0]) === JSON.stringify(expect), `${id} 的正确走法是 ${JSON.stringify(ms[0])}`);
  };
  one('3-4', { i: 3, n: 3 });          // 11 颗取 3 颗剩 8
  one('4-2', { i: 2, n: 3 });          // 4 颗取 3 颗剩 1
  one('4-3', { i: 2, n: 1 });          // 第 3 级移 1 枚
  one('4-4', { i: 2, to: 1 });         // 空格 3 的那一行白子前进 1 格
});

test('取石子：3-1 判断题有配对的也有落单的', () => {
  const q = LEVELS.find(l => l.id === '3-1').quiz;
  const paired = q.filter(p => S.nimSum(p) === 0).length;
  assert(paired >= 2 && paired <= q.length - 2, '3-1 配对和落单的题各至少 2 道');
});

test('取石子：对推的棋子都在棋盘内、白左黑右', () => {
  const l = LEVELS.find(x => x.rows);
  l.rows.forEach(([w, b]) => assert(w >= 0 && w < b && b < l.rule.width, `对推的行 ${w},${b} 不合法`));
});

test('取石子：电脑在必胜局面下每步都留下必败局面', () => {
  const rand = rng(7);
  for (const rule of [RULES.std, RULES.take3, RULES.take134, RULES.misere, RULES.misere3]) {
    eachState(3, 5, p => {
      if (!S.isWin(p, rule) || !S.moves(p, rule).length) return;
      const m = S.aiMove(p, rule, 'b', rand);
      assert(!S.isWin(S.apply(p, rule, m), rule), `${JSON.stringify(rule)} ${p} 电脑走错`);
    });
  }
  eachState(4, 2, s => {
    if (!S.isWin(s, RULES.stair)) return;
    const m = S.aiMove(s, RULES.stair, 'b', rand);
    assert(!S.isWin(S.apply(s, RULES.stair, m), RULES.stair), `阶梯 ${s} 电脑走错`);
  });
});

// 对推有后退，局面可能循环，不穷举：电脑按策略走，对手随机走（包括后退），电脑必须在步数上限内赢
test('取石子：棋子对推模拟对局，电脑处在必胜局面时都能赢', () => {
  const rand = rng(11);
  const rule = RULES.push;
  let games = 0;
  for (let t = 0; t < 2000; t++) {
    const rows = Array.from({ length: 3 }, () => {
      const w = Math.floor(rand() * 4);
      return [w, w + 1 + Math.floor(rand() * (rule.width - w - 1))];
    });
    // 让白方先走且处在必败局面，电脑执黑
    if (S.isWin(rows, rule)) continue;
    games++;
    let s = rows, side = 'w', steps = 0;
    for (;;) {
      const ms = S.moves(s, rule, side);
      if (!ms.length) break;
      const m = side === 'b' ? S.aiMove(s, rule, 'b', rand) : ms[Math.floor(rand() * ms.length)];
      s = S.apply(s, rule, m, side);
      side = side === 'w' ? 'b' : 'w';
      assert(++steps < 200, `对推 ${JSON.stringify(rows)} 超过 200 步没下完`);
    }
    assert(side === 'w', `对推 ${JSON.stringify(rows)} 电脑输了`);
  }
  assert(games > 100, '对推模拟的对局太少');
});

test('取石子：倒推表的理由', () => {
  for (const l of LEVELS.filter(x => x.table || x.table2)) {
    const max = (l.table || l.table2).max;
    const states = [];
    if (l.table) for (let n = 0; n <= max; n++) states.push([n]);
    else for (let a = 0; a <= max; a++) for (let b = 0; b <= max; b++) states.push([a, b]);
    for (const s of states) {
      const e = S.explain(s, l.rule);
      if (e.terminal) continue;
      if (e.win) assert(!S.isWin(e.next, l.rule), `${l.id} ${s} 的理由应指向必败局面`);
      else assert(e.nexts.length && e.nexts.every(x => S.isWin(x, l.rule)), `${l.id} ${s} 的理由应全是必胜局面`);
    }
  }
  const two = LEVELS.find(l => l.table2);
  eachState(2, two.table2.max, s => assert(S.isWin(s, two.rule) === (s[0] !== s[1]), `二维表 ${s} 应是两堆一样多才必败`));
});

test('取石子：关卡 ID、每章第 1 关、数据范围', () => {
  const ids = LEVELS.map(l => l.id);
  assert(new Set(ids).size === ids.length, '关卡 ID 重复');
  for (const l of LEVELS) {
    assert(/^\d-\d$/.test(l.id), `${l.id} 格式不对`);
    assert(l.intro && l.title, `${l.id} 缺 intro 或 title`);
    if (l.piles || l.rows || l.rounds) assert(l.learn, `${l.id} 缺 learn`);
    if (l.table || l.table2) assert(l.summary, `${l.id} 缺 summary`);
    const states = l.rounds || (l.piles ? [l.piles] : []);
    states.forEach(p => assert(p.length <= 5 && p.every(c => c >= 1 && c <= 23), `${l.id} 的堆数或颗数超出范围`));
    if (l.rule.kind === 'nim' && states.some(p => p.length > 1)) {
      states.forEach(p => assert(p.every(c => c <= 15), `${l.id} 多堆时每堆最多 15 颗`));
    }
  }
  ['1-1', '2-1', '3-1', '4-1'].forEach(id => assert(ids.includes(id), `缺少 ${id}`));
  const first = ['1-1', '2-1', '4-1'].map(id => LEVELS.find(l => l.id === id));
  assert(first.every(l => l.table || l.table2), '1-1、2-1、4-1 应该有倒推表');
});
