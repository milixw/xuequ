'use strict';

// 立体图形实验室：几何计算和关卡数据校验
const { test, assert } = require('./harness');
const G = require('../src/games/solids/geo3d.js');
const { LEVELS, NET_QUIZ, OPPOSITE_QUIZ, CONE_ROUNDS, BOX_ROUNDS, SHAPE_TARGETS, SECTION_QUIZ, sectionMatches } =
  require('../src/games/solids/game.js');

const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const closeP = (p, q, eps = 1e-9) => G.dist(p, q) < eps;

test('立体实验室：六格图形 35 种，能折成正方体的正好 11 种', () => {
  assert(G.enumerateHexominoes().length === 35, '六格图形不是 35 种');
  const nets = G.cubeNets();
  assert(nets.length === 11, `展开图有 ${nets.length} 种`);
  const count = cat => nets.filter(n => n.cat === cat).length;
  assert(count('1-4-1') === 6 && count('2-3-1') === 3 && count('2-2-2') === 1 && count('3-3') === 1,
    '分类数量不是 6、3、1、1：' + nets.map(n => n.cat).join(' '));
});

test('立体实验室：11 种展开图折好后是棱长 1 的正方体', () => {
  for (const net of G.cubeNets()) {
    const faces = G.foldNet(net.cells, 1);
    const verts = [];
    for (const f of faces) for (const p of f.pts) if (!verts.some(q => closeP(p, q, 1e-6))) verts.push(p);
    assert(verts.length === 8, `${net.key} 折好后有 ${verts.length} 个顶点`);
    // 每个顶点恰好和另外 3 个顶点相距 1
    for (const p of verts) {
      assert(verts.filter(q => close(G.dist(p, q), 1, 1e-6)).length === 3, `${net.key} 折出来不是正方体`);
    }
    // 相对面两两配对
    net.cells.forEach((_, i) => {
      const j = G.oppositeFace(net.cells, i);
      assert(j >= 0 && G.oppositeFace(net.cells, j) === i, `${net.key} 第 ${i} 个面找不到相对面`);
    });
  }
});

test('立体实验室：1-2 判断题有能折的也有不能折的，图形互不相同', () => {
  const oks = NET_QUIZ.map(rows => G.checkNet(G.parseCells(rows)).ok);
  assert(NET_QUIZ.every(rows => G.parseCells(rows).length === 6 && G.isConnected(G.parseCells(rows))), '有题目不是 6 个相连的格子');
  assert(oks.filter(Boolean).length >= 3 && oks.filter(x => !x).length >= 3, `能折 ${oks.filter(Boolean).length} 个，太偏`);
  const keys = NET_QUIZ.map(rows => G.netKey(G.parseCells(rows)));
  assert(new Set(keys).size === keys.length, '有重复的图形');
  // 折不成的，一定有重叠的面可以标红
  NET_QUIZ.forEach(rows => {
    const r = G.checkNet(G.parseCells(rows));
    assert(r.ok || r.overlap.length >= 2, `${rows.join('/')} 折不成但没有重叠的面`);
  });
});

test('立体实验室：1-4 相对面题目的展开图都有效，四类各一题', () => {
  const cats = OPPOSITE_QUIZ.map(q => {
    const cells = G.parseCells(q.rows);
    assert(G.checkNet(cells).ok, `${q.rows.join('/')} 不是正方体展开图`);
    assert(q.ask >= 0 && q.ask < 6, '问的面下标越界');
    return G.netCategory(cells).cat;
  });
  assert(new Set(cats).size === 4, '四类展开图没有各出一题：' + cats.join(' '));
});

test('立体实验室：圆柱侧面摊平后是 2πr × h 的长方形，底面翻开后和侧面相切', () => {
  const r = 1.5, h = 3;
  const { lateral, bottom, top } = G.cylinderShape(r, h, 1);
  assert(closeP(lateral[0][0], [-Math.PI * r, 0, 0]) && closeP(lateral[lateral.length - 1][1], [Math.PI * r, h, 0]), '摊平后尺寸不对');
  const cb = G.mul(bottom.reduce(G.add, [0, 0, 0]), 1 / bottom.length);
  const ct = G.mul(top.reduce(G.add, [0, 0, 0]), 1 / top.length);
  assert(closeP(cb, [0, -r, 0], 1e-6) && closeP(ct, [0, h + r, 0], 1e-6), '底面没有翻到长方形上下');
  // 立体时侧面是半径 r 的圆
  const solid = G.cylinderShape(r, h, 0).lateral;
  for (const [p] of solid) assert(close(G.dist(p, [0, 0, -r]), r, 1e-9), '立体时侧面不在圆柱上');
});

test('立体实验室：圆锥侧面摊平后是半径 l、圆心角 r/l×360° 的扇形', () => {
  const r = 2, l = 5, phi = 2 * Math.PI * r / l;
  const { lateral, base } = G.coneShape(r, l, phi, 1);
  const apex = lateral[0][0];
  const ends = [lateral[0][lateral[0].length - 1], lateral[lateral.length - 1][lateral[0].length - 1]];
  for (const p of ends) assert(close(G.dist(apex, p), l), '母线长度变了');
  const u = G.sub(ends[0], apex), v = G.sub(ends[1], apex);
  const ang = Math.acos(G.dot(u, v) / l / l) * 180 / Math.PI;
  assert(close(ang, 360 - G.sectorAngle(r, l), 1e-6) || close(ang, G.sectorAngle(r, l), 1e-6), `圆心角 ${ang}`);
  // 摊平后所有点共面
  const n = G.norm(G.cross(G.sub(lateral[5][2], apex), G.sub(lateral[30][3], apex)));
  for (const col of lateral) for (const p of col) assert(close(G.dot(G.sub(p, apex), n), 0, 1e-9), '扇形不平');
  for (const p of base) assert(close(G.dot(G.sub(p, apex), n), 0, 1e-9), '底面没有翻到扇形所在平面');
  // 立体时：两条边上的母线重合，底边在半径 r 的圆上
  const solid = G.coneShape(r, l, phi, 0).lateral;
  const k = solid[0].length - 1;
  assert(closeP(solid[0][k], solid[solid.length - 1][k], 1e-9), '立体时没有合上');
  const center = [0, -Math.sqrt(l * l - r * r), 0];
  for (const col of solid) assert(close(G.dist(col[k], center), r, 1e-9), '底边不在底面圆上');
});

test('立体实验室：2-3 每一轮都有唯一的正确半径，且在滑块范围内', () => {
  for (const { l, deg } of CONE_ROUNDS) {
    const r = l * deg / 360;
    assert(r >= 0.5 && r <= 4 && close(r * 2, Math.round(r * 2)), `l=${l}、${deg}° 的答案 ${r} 不在滑块取值上`);
  }
});

test('立体实验室：长方体三种走法展开后是直线，长度和公式一致', () => {
  for (const [a, b, c] of [[4, 1, 2], [2, 3, 5], [1, 4, 3], [3, 3, 3]]) {
    for (const route of G.boxRoutes(a, b, c)) {
      const folded = G.unfoldRoute(route, a, b, c, 0);
      assert(closeP(folded.path[2], [a, c, b]), `${route.name}：没到对角顶点`);
      const [A, X, E] = G.unfoldRoute(route, a, b, c, 1).path;
      assert(close(G.len(G.cross(G.sub(X, A), G.sub(E, A))), 0, 1e-9), `${route.name}：展开后不是直线`);
      assert(close(G.dist(A, X) + G.dist(X, E), Math.sqrt(route.sq)), `${route.name}：长度和公式不一致`);
      // 折起时路径长度不变
      assert(close(G.dist(...folded.path.slice(0, 2)) + G.dist(...folded.path.slice(1)), Math.sqrt(route.sq)), '折起后长度变了');
    }
  }
});

test('立体实验室：3-3 每一轮的最短走法唯一，答案来自计算', () => {
  for (const [a, b, c] of BOX_ROUNDS) {
    const sq = G.boxRoutes(a, b, c).map(r => r.sq).sort((x, y) => x - y);
    assert(sq[0] < sq[1], `${a}×${b}×${c} 最短走法不唯一`);
  }
  const answers = BOX_ROUNDS.map(([a, b, c]) => {
    const sq = G.boxRoutes(a, b, c).map(r => r.sq);
    return sq.indexOf(Math.min(...sq));
  });
  assert(new Set(answers).size === 3, '三轮的答案不应该一样：' + answers.join(','));
});

test('立体实验室：圆柱上的路径展开后是直线', () => {
  const r = 1.5, h = 4;
  for (const turns of [0.5, 1]) {
    const { s0, s1 } = G.cylinderRoute(r, turns);
    const A = G.cylinderPoint(r, s0, 0, 1), B = G.cylinderPoint(r, s1, h, 1);
    assert(close(G.dist(A, B), Math.hypot(2 * Math.PI * r * turns, h)), '展开后的长度不对');
    const A0 = G.cylinderPoint(r, s0, 0, 0), B0 = G.cylinderPoint(r, s1, h, 0);
    const expect = turns === 1 ? 0 : 2 * r;   // 半圈：水平方向正好是一条直径
    assert(close(Math.hypot(A0[0] - B0[0], A0[2] - B0[2]), expect, 1e-9), '起点终点位置不对');
  }
});

test('立体实验室：截面形状判断', () => {
  const name = (yaw, pitch, d) => G.classifySection(G.cubeSection(G.sectionNormal(yaw, pitch), d)).name;
  const hex = G.PITCHES.find(p => close(p, Math.asin(1 / Math.sqrt(3)) * 180 / Math.PI));
  assert(name(0, 90, 0.3) === '正方形', '水平切应是正方形');
  assert(name(45, 0, 0) === '长方形', '沿对角面切应是长方形');
  assert(name(45, hex, 0) === '正六边形', '过中心垂直于体对角线应是正六边形');
  assert(name(45, hex, 1.2) === '等边三角形', '垂直于体对角线切角应是等边三角形');
  assert(name(0, 90, 1.5) === '', '切不到时应为空');
  // 边数不超过 6；三角形截面都是锐角三角形
  for (let yaw = 0; yaw <= 90; yaw += 5) for (const pitch of G.PITCHES) for (let i = -35; i <= 35; i++) {
    const s = G.cubeSection(G.sectionNormal(yaw, pitch), i * 0.05);
    assert(s.length <= 6, '截面超过 6 条边');
    const nm = G.classifySection(s).name;
    assert(!/直角|钝角/.test(nm), `切出了${nm}：yaw=${yaw} pitch=${pitch} d=${i * 0.05}`);
  }
});

test('立体实验室：4-2 每个目标形状在滑块取值下都切得出来', () => {
  const found = new Set();
  for (let yaw = 0; yaw <= 90; yaw += 5) for (const pitch of G.PITCHES) for (let i = -35; i <= 35; i++) {
    const nm = G.classifySection(G.cubeSection(G.sectionNormal(yaw, pitch), i * 0.05)).name;
    SHAPE_TARGETS.forEach(t => { if (sectionMatches(t, nm)) found.add(t); });
  }
  const miss = SHAPE_TARGETS.filter(t => !found.has(t));
  assert(!miss.length, '切不出：' + miss.join('、'));
});

test('立体实验室：4-3 的示意截面和答案一致', () => {
  for (const q of SECTION_QUIZ) {
    const nm = G.classifySection(G.cubeSection(G.sectionNormal(...q.demo.slice(0, 2)), q.demo[2])).name;
    assert(nm === q.demoName, `「${q.q}」的示意截面是${nm}，不是${q.demoName}`);
  }
});

test('立体实验室：关卡编号连续、每章都有挑战关', () => {
  const ids = LEVELS.map(l => l.id);
  assert(new Set(ids).size === ids.length, '关卡编号重复');
  for (const ch of new Set(LEVELS.map(l => l.id.split('-')[0]))) {
    const lv = LEVELS.filter(l => l.id.split('-')[0] === ch);
    lv.forEach((l, i) => assert(l.id === `${ch}-${i + 1}`, `第 ${ch} 章编号不连续`));
    assert(lv.some(l => l.challenge), `第 ${ch} 章没有挑战关`);
  }
});
