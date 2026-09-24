'use strict';

// 取石子：必胜 / 必败判断、正确走法、电脑走法、倒推表的理由。纯函数，不依赖 DOM，浏览器和 node 通用。
//
// 规则 rule 和局面 state：
//   { kind: 'nim', take, misere }  几堆石子，state 是每堆颗数的数组；take 是每次能取的颗数（省略表示随便取），
//                                   misere 为 true 时取到最后一颗算输
//   { kind: 'stair' }              阶梯：state[i] 是第 i+1 级台阶上的硬币数，每步把某一级的几枚往下移一级
//   { kind: 'push', width }        棋子对推：state 是每行 [白子列, 黑子列]，白子在左（学生），黑子在右（电脑）
// 走法 move：石子 { i, n }（第 i 堆取 n 颗）；阶梯 { i, n }（第 i+1 级移 n 枚）；对推 { i, to }（第 i 行走到 to 列）
// 对推的 state 不分先后手，所以走法要额外知道这一步是谁走：side 为 'w'（白）或 'b'（黑）

(function (root) {
  const BLOCKS = [8, 4, 2, 1];

  // ---------- 走法 ----------
  function moves(state, rule, side) {
    const out = [];
    if (rule.kind === 'push') {
      state.forEach(([w, b], i) => {
        if (side === 'w') { for (let to = 0; to < b; to++) if (to !== w) out.push({ i, to }); }
        else { for (let to = w + 1; to < rule.width; to++) if (to !== b) out.push({ i, to }); }
      });
      return out;
    }
    state.forEach((c, i) => {
      for (let n = 1; n <= c; n++) if (!rule.take || rule.take.includes(n)) out.push({ i, n });
    });
    return out;
  }

  function apply(state, rule, m, side) {
    if (rule.kind === 'push') {
      const s = state.map(r => r.slice());
      s[m.i][side === 'w' ? 0 : 1] = m.to;
      return s;
    }
    const s = state.slice();
    s[m.i] -= m.n;
    if (rule.kind === 'stair' && m.i > 0) s[m.i - 1] += m.n;
    return s;
  }

  // 局面结束（轮到的一方无路可走）时，轮到的一方是不是赢了：只有"取到最后一颗算输"时是
  const terminalWin = rule => rule.kind === 'nim' && !!rule.misere;

  // ---------- 必胜 / 必败 ----------
  const memos = new Map();
  const ruleKey = rule => JSON.stringify([rule.kind, rule.take || null, !!rule.misere]);

  // 轮到走的一方是不是必胜（对方不犯错时）
  function isWin(state, rule) {
    if (rule.kind === 'push') return nimSum(gaps(state)) !== 0;
    const rk = ruleKey(rule);
    if (!memos.has(rk)) memos.set(rk, new Map());
    return search(state, rule, memos.get(rk));
  }

  function search(state, rule, memo) {
    // 几堆石子和顺序无关，排序后作缓存键；阶梯和台阶顺序有关
    const k = (rule.kind === 'nim' ? state.slice().sort((a, b) => a - b) : state).join(',');
    if (memo.has(k)) return memo.get(k);
    const ms = moves(state, rule);
    const r = ms.length ? ms.some(m => !search(apply(state, rule, m), rule, memo)) : terminalWin(rule);
    memo.set(k, r);
    return r;
  }

  // 能留给对方必败局面的走法。对推只算向前推（后退不会让局面变好，电脑不走后退）
  function winningMoves(state, rule, side) {
    let ms = moves(state, rule, side);
    if (rule.kind === 'push') ms = ms.filter(m => isAdvance(state, m, side));
    return ms.filter(m => !isWin(apply(state, rule, m, side), rule));
  }

  const isAdvance = (state, m, side) => (side === 'w' ? m.to > state[m.i][0] : m.to < state[m.i][1]);

  // 电脑的走法。必胜时从正确走法里随机挑；必败时尽量拖长对局：
  // 石子从最多的一堆取 1 颗，阶梯从最高一级移 1 枚，对推在空格最多的一行前进 1 格（没得前进才后退）
  function aiMove(state, rule, side, rand) {
    rand = rand || Math.random;
    const good = winningMoves(state, rule, side);
    if (good.length) return good[Math.floor(rand() * good.length)];
    if (rule.kind === 'push') {
      const gs = gaps(state);
      const i = gs.indexOf(Math.max(...gs));
      if (gs[i] > 0) return { i, to: state[i][side === 'w' ? 0 : 1] + (side === 'w' ? 1 : -1) };
      const back = moves(state, rule, side).find(m => !isAdvance(state, m, side));
      return back || null;
    }
    if (!moves(state, rule).length) return null;
    let i = 0;
    if (rule.kind === 'stair') { i = state.length - 1; while (!state[i]) i--; }
    else state.forEach((c, k) => { if (c > state[i]) i = k; });
    return { i, n: 1 };
  }

  // ---------- 规律（测试和穷举核对） ----------
  const nimSum = piles => piles.reduce((a, b) => a ^ b, 0);

  // 把一堆拆成 8、4、2、1 颗的色块，从大到小
  const blocks = n => BLOCKS.filter(b => n & b);

  // 落单的色块大小：所有堆里出现奇数次的
  const unpaired = piles => BLOCKS.filter(b => nimSum(piles) & b);

  // 色块配对的必胜走法：从含有最大落单色块的一堆里取，让所有色块重新配对
  function pairMoves(piles) {
    const s = nimSum(piles);
    if (!s) return [];
    return piles.map((c, i) => ({ i, n: c - (c ^ s) })).filter(m => m.n > 0);
  }

  // 取到最后一颗算输：前面照常配对，只剩 1 颗堆时，1 颗堆的个数是偶数就是必胜
  function misereWin(piles) {
    if (piles.every(c => c <= 1)) return piles.filter(c => c === 1).length % 2 === 0;
    return nimSum(piles) !== 0;
  }

  // 阶梯：只看奇数级（第 1、3、5 级，下标 0、2、4）
  const oddSteps = state => state.filter((_, i) => i % 2 === 0);
  const stairWin = state => nimSum(oddSteps(state)) !== 0;

  // 对推：每行两子之间的空格数
  const gaps = rows => rows.map(([w, b]) => b - w - 1);

  // ---------- 倒推表 ----------
  // 解释一个局面为什么必胜 / 必败：
  //   { win, terminal: true }                       无路可走
  //   { win: true, move, next }                     能走到必败局面 next
  //   { win: false, nexts: [局面...] }              走一步能到的局面全是必胜
  function explain(state, rule) {
    const win = isWin(state, rule);
    const ms = moves(state, rule);
    if (!ms.length) return { win, terminal: true };
    if (win) {
      const m = ms.find(x => !isWin(apply(state, rule, x), rule));
      return { win, move: m, next: apply(state, rule, m) };
    }
    return { win, nexts: ms.map(m => apply(state, rule, m)) };
  }

  const NimSolver = {
    BLOCKS, moves, apply, isWin, winningMoves, aiMove, isAdvance,
    nimSum, blocks, unpaired, pairMoves, misereWin, oddSteps, stairWin, gaps, explain,
  };
  if (typeof module !== 'undefined') module.exports = NimSolver;
  else root.NimSolver = NimSolver;
})(this);
