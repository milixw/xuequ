'use strict';

// 天平解方程：局面变形、关卡数据和题面一致、最少步数、目录挂载
const fs = require('fs');
const path = require('path');
const katex = require('../vendor/katex/katex.min.js');
const { test, assert } = require('./harness');
const Poly = require('./poly.js');
const S = require('../src/games/balance/solver.js');
const { LEVELS, CHAPTERS, startState, best, stars, BalanceGame } = require('../src/games/balance/game.js');

const ROOT = path.join(__dirname, '..');
const tex = s => katex.renderToString(s, { throwOnError: true, strict: 'error' });

// 一边的整式：x 盒子、砝码、袋子展开
function sidePoly(side, bag) {
  let p = Poly.of(`${side.x}x+${side.n}`.replace('+-', '-'));
  if (side.b) p = p.add(Poly.of(`${bag.x}x+${bag.n}`.replace('+-', '-')).scale(side.b));
  return p;
}

test('天平：变形规则', () => {
  const bag = { x: 1, n: -4 };
  const s = [{ x: 0, n: 0, b: -2 }, { x: 1, n: 2, b: 0 }];
  const open = S.apply(s, { op: 'open', side: 0 }, bag).state;
  assert(open[0].x === -2 && open[0].n === 8 && open[0].b === 0, '−2(x−4) 打开应是 −2x+8');
  assert(S.apply(s, { op: 'div', k: 2 }, bag).error, '右边 x+2 不能平均分成 2 份');
  const half = S.apply([{ x: 0, n: 0, b: 4 }, { x: 0, n: 6, b: 2 }], { op: 'div', k: 2 }, { x: 1, n: 1 }).state;
  assert(half[1].b === 0 && half[1].x === 1 && half[1].n === 4, '只剩 1 个袋子时应自动打开');
  assert(S.apply(s, { op: 'div', k: 1 }, bag).error, '除以 1 应该拦下');
  assert(S.solved([{ x: 0, n: -4, b: 0 }, { x: 1, n: 0, b: 0 }]), 'x 在右边也算解完');
  assert(!S.solved([{ x: 1, n: 0, b: 0 }, { x: 1, n: 3, b: 0 }]), '另一边还有 x 不算解完');
  assert(S.eqTex([{ x: -2, n: 5, b: 0 }, { x: 1, n: -11, b: -3 }], { x: 1, n: -4 }) === '-2x+5=-3(x-4)+x-11', '排版不对');
  assert(S.describe({ op: 'add', kind: 'b', k: -2 }, { x: 1, n: 2 }) === '两边同时减去 $2(x+2)$', '操作说法不对');
});

test('天平：关卡数据和题面一致，解是唯一的整数', () => {
  const ids = new Set();
  for (const l of LEVELS) {
    assert(!ids.has(l.id), `${l.id} 重复`);
    ids.add(l.id);
    assert(CHAPTERS.some(c => l.id.startsWith(c.no + '-')), `${l.id} 不属于任何一章`);
    const [lhs, rhs] = l.eq.split('=');
    assert(Poly.of(lhs).eq(sidePoly(l.left, l.bag)), `${l.id} 左边和 ${lhs} 不一致`);
    assert(Poly.of(rhs).eq(sidePoly(l.right, l.bag)), `${l.id} 右边和 ${rhs} 不一致`);
    const v = S.solution(startState(l), l.bag);
    assert(v !== null, `${l.id} 的解不是整数`);
    assert(!S.solved(startState(l)), `${l.id} 开局就解完了`);
    for (const text of [l.intro, l.learn]) {
      for (const m of text.matchAll(/\$([^$]+)\$/g)) tex(m[1]);
    }
    tex(l.eq);
  }
  CHAPTERS.forEach(c => (c.intro.match(/\$([^$]+)\$/g) || []).forEach(m => tex(m.slice(1, -1))));
});

test('天平：最少步数的走法能解出正确的 x', () => {
  for (const l of LEVELS) {
    const path = S.shortest(startState(l), l.bag);
    assert(path && path.length === best(l), `${l.id} 求不出最少步数`);
    let s = startState(l);
    for (const op of path) {
      const r = S.apply(s, op, l.bag);
      assert(!r.error, `${l.id} 走法出错：${r.error}`);
      s = r.state;
      tex(S.eqTex(s, l.bag));
      for (const m of S.describe(op, l.bag).matchAll(/\$([^$]+)\$/g)) tex(m[1]);
    }
    const i = S.solvedSide(s);
    assert(s[1 - i].n === S.solution(startState(l), l.bag), `${l.id} 解出的 x 不对`);
  }
  const min = Object.fromEntries(LEVELS.map(l => [l.id, best(l)]));
  assert(min['3-1'] === 2 && min['3-4'] === 3, '3-1、3-4 应能不打开袋子、用整体思想少走几步');
});

// 用全部操作（任意个数的放上 / 拿走、任意除数、打开袋子）穷举，确认 BFS 的最少步数没有被别的走法打破
test('天平：全部操作穷举，最少步数不会更少', () => {
  const ops = bag => {
    const out = [];
    for (let k = -20; k <= 20; k++) if (k) out.push({ op: 'add', kind: 'n', k });
    for (let k = -12; k <= 12; k++) if (k) out.push({ op: 'add', kind: 'x', k });
    if (bag) for (let k = -6; k <= 6; k++) if (k) out.push({ op: 'add', kind: 'b', k });
    for (let k = -12; k <= 12; k++) if (k && k !== 1) out.push({ op: 'div', k });
    if (bag) out.push({ op: 'open', side: 0 }, { op: 'open', side: 1 });
    return out;
  };
  for (const l of LEVELS) {
    const all = ops(l.bag);
    let frontier = [startState(l)];
    const seen = new Set([S.key(frontier[0])]);
    for (let depth = 1; depth < best(l); depth++) {
      const next = [];
      for (const s of frontier) {
        for (const op of all) {
          const r = S.apply(s, op, l.bag);
          if (r.error) continue;
          assert(!S.solved(r.state), `${l.id} 用 ${depth} 步就能解完，比 ${best(l)} 步少`);
          const k = S.key(r.state);
          if (!seen.has(k)) { seen.add(k); next.push(r.state); }
        }
      }
      frontier = next;
    }
  }
});

test('天平：评星', () => {
  assert(stars(3, 3) === 3 && stars(4, 3) === 2 && stars(5, 3) === 2 && stars(6, 3) === 1, '评星不对');
});

test('天平：目录里挂的游戏都存在，并在 index.html 加载', () => {
  // 用模块本身，不用全局 Content（exam.test.js 会把全局换成假的）；单独跑本文件时自己加载目录
  const Content = require('../src/content.js');
  if (!Content.catalog) {
    const saved = globalThis.Content;
    globalThis.Content = Content;
    require('../content/catalog.js');
    globalThis.Content = saved;
  }
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const games = { balance: BalanceGame };
  let found = 0;
  for (const meta of Content.sectionMetas()) {
    for (const id of meta.section.games || []) {
      found++;
      assert(games[id], `${meta.id} 挂了不存在的游戏 ${id}`);
      assert(games[id].section === meta.id, `${id} 的 section 应是 ${meta.id}`);
      for (const f of ['solver.js', 'game.js']) {
        assert(html.includes(`src/games/${id}/${f}`), `index.html 没有加载 src/games/${id}/${f}`);
      }
    }
  }
  assert(found === Object.keys(games).length, '每个动手玩游戏都应挂在某一节上');
});
