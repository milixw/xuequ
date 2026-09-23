'use strict';

// 立体图形实验室的纯几何：向量、旋转、正方体展开图、圆柱圆锥展开、表面最短路径、正方体截面
// 坐标约定：y 轴向上，z 轴朝向观察者
const Geo3D = (() => {
  const EPS = 1e-9;

  // ---------- 向量 ----------
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = a => Math.hypot(a[0], a[1], a[2]);
  const norm = a => mul(a, 1 / len(a));
  const lerp = (a, b, t) => add(a, mul(sub(b, a), t));
  const dist = (a, b) => len(sub(a, b));
  const clamp01 = x => Math.min(1, Math.max(0, x));

  // 点 p 绕过点 o、方向为 axis（单位向量）的直线旋转 ang 弧度（罗德里格斯公式）
  function rotateAbout(p, o, axis, ang) {
    const v = sub(p, o);
    const c = Math.cos(ang), s = Math.sin(ang);
    const r = add(add(mul(v, c), mul(cross(axis, v), s)), mul(axis, dot(axis, v) * (1 - c)));
    return add(o, r);
  }

  // 绕 x 轴旋转（过原点）
  function rotX(p, ang) {
    const c = Math.cos(ang), s = Math.sin(ang);
    return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
  }

  // ---------- 六格图形与正方体展开图 ----------
  // 格子用 [列, 行] 表示；平铺时第 c 列第 r 行的格子占 x∈[c,c+1]、z∈[r,r+1]，y=0

  // 字符串行（'#' 表示有格子）转成格子列表
  function parseCells(rows) {
    const cells = [];
    rows.forEach((row, r) => [...row].forEach((ch, c) => { if (ch === '#') cells.push([c, r]); }));
    return cells;
  }

  // 平移到左上角，按行、列排序
  function normalize(cells) {
    const minC = Math.min(...cells.map(p => p[0]));
    const minR = Math.min(...cells.map(p => p[1]));
    return cells.map(([c, r]) => [c - minC, r - minR]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  }

  const cellsKey = cells => normalize(cells).map(p => p.join(',')).join(';');

  // 旋转、翻转后的 8 种摆法里取字符串最小的，作为标准形（同一个图形的标准形相同）
  function netKey(cells) {
    const syms = [
      ([c, r]) => [c, r], ([c, r]) => [-c, r], ([c, r]) => [c, -r], ([c, r]) => [-c, -r],
      ([c, r]) => [r, c], ([c, r]) => [-r, c], ([c, r]) => [r, -c], ([c, r]) => [-r, -c],
    ];
    return syms.map(f => cellsKey(cells.map(f))).sort()[0];
  }

  function isConnected(cells) {
    if (!cells.length) return false;
    const has = new Set(cells.map(p => p.join(',')));
    const seen = new Set([cells[0].join(',')]);
    const stack = [cells[0]];
    while (stack.length) {
      const [c, r] = stack.pop();
      for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const k = (c + dc) + ',' + (r + dr);
        if (has.has(k) && !seen.has(k)) { seen.add(k); stack.push([c + dc, r + dr]); }
      }
    }
    return seen.size === cells.length;
  }

  // 穷举所有六格图形（旋转、翻转算同一种），共 35 种
  function enumerateHexominoes() {
    let level = new Map([[netKey([[0, 0]]), [[0, 0]]]]);
    for (let n = 2; n <= 6; n++) {
      const next = new Map();
      for (const cells of level.values()) {
        const has = new Set(cells.map(p => p.join(',')));
        for (const [c, r] of cells) {
          for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const p = [c + dc, r + dr];
            if (has.has(p.join(','))) continue;
            const grown = normalize([...cells, p]);
            const k = netKey(grown);
            if (!next.has(k)) next.set(k, grown);
          }
        }
      }
      level = next;
    }
    return [...level.values()];
  }

  // 把展开图整理成面的树：根是邻居最多的格子，其余格子按广度优先挂到父格子上
  // hinge：和父格子的公共边（过点 o、方向 axis），axis 的方向保证正角度时这个面向上（+y）折起
  function buildNetTree(cells) {
    const idx = new Map(cells.map((p, i) => [p.join(','), i]));
    const nbrs = cells.map(([c, r]) =>
      [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dc, dr]) => idx.get((c + dc) + ',' + (r + dr))).filter(i => i !== undefined));
    let root = 0;
    nbrs.forEach((n, i) => { if (n.length > nbrs[root].length) root = i; });
    const parent = cells.map(() => -1);
    const hinge = cells.map(() => null);
    const order = [root];
    const seen = new Set([root]);
    for (let k = 0; k < order.length; k++) {
      const i = order[k];
      for (const j of nbrs[i]) {
        if (seen.has(j)) continue;
        seen.add(j);
        order.push(j);
        parent[j] = i;
        const [pc, pr] = cells[i], [cc, cr] = cells[j];
        let o, axis;
        if (cc !== pc) { o = [Math.max(pc, cc), 0, pr]; axis = [0, 0, 1]; }
        else { o = [pc, 0, Math.max(pr, cr)]; axis = [1, 0, 0]; }
        const v = sub([cc + 0.5, 0, cr + 0.5], o);
        if (cross(axis, v)[1] < 0) axis = mul(axis, -1);
        hinge[j] = { o, axis };
      }
    }
    return { root, parent, hinge };
  }

  // 折叠到 t（0 平铺，1 每条折痕都折 90°），返回每个面的四个顶点和中心
  function foldNet(cells, t, tree = buildNetTree(cells)) {
    const ang = t * Math.PI / 2;
    return cells.map(([c, r], i) => {
      let pts = [[c, 0, r], [c + 1, 0, r], [c + 1, 0, r + 1], [c, 0, r + 1]];
      let center = [c + 0.5, 0, r + 0.5];
      for (let j = i; tree.parent[j] !== -1; j = tree.parent[j]) {
        const { o, axis } = tree.hinge[j];
        pts = pts.map(p => rotateAbout(p, o, axis, ang));
        center = rotateAbout(center, o, axis, ang);
      }
      return { pts, center };
    });
  }

  // 折完以后检查：6 个面的位置是否互不相同；overlap 是和别的面重叠的面的下标
  function checkNet(cells) {
    const faces = foldNet(cells, 1);
    const overlap = new Set();
    faces.forEach((f, i) => faces.forEach((g, j) => {
      if (i < j && dist(f.center, g.center) < 1e-6) { overlap.add(i); overlap.add(j); }
    }));
    return { ok: cells.length === 6 && isConnected(cells) && overlap.size === 0, overlap: [...overlap], faces };
  }

  // 第 i 个面的相对面（折成正方体后中心相距 1）
  function oppositeFace(cells, i) {
    const faces = foldNet(cells, 1);
    return faces.findIndex((f, j) => j !== i && Math.abs(dist(f.center, faces[i].center) - 1) < 1e-6);
  }

  // 展开图的分类：摆成不高于宽的方向，按每行格子数得到 1-4-1、2-3-1、2-2-2、3-3
  // 返回 { cat, cells }，cells 是分类时用的摆法（显示时用它）
  function netCategory(cells) {
    const tries = [cells, cells.map(([c, r]) => [r, c])].map(normalize);
    const flat = tries.find(cs => Math.max(...cs.map(p => p[1])) <= Math.max(...cs.map(p => p[0])));
    const rows = [];
    flat.forEach(([, r]) => { rows[r] = (rows[r] || 0) + 1; });
    const pattern = rows.join('-');
    const cat = { '1-4-1': '1-4-1', '2-3-1': '2-3-1', '1-3-2': '2-3-1', '2-2-2': '2-2-2', '3-3': '3-3' }[pattern] || pattern;
    return { cat, cells: flat };
  }

  const CATEGORY_ORDER = ['1-4-1', '2-3-1', '2-2-2', '3-3'];

  // 11 种正方体展开图，按类别排序
  function cubeNets() {
    return enumerateHexominoes()
      .filter(cells => checkNet(cells).ok)
      .map(cells => ({ key: netKey(cells), ...netCategory(cells) }))
      .sort((a, b) => CATEGORY_ORDER.indexOf(a.cat) - CATEGORY_ORDER.indexOf(b.cat) || (a.key < b.key ? -1 : 1));
  }

  // ---------- 圆柱 ----------
  // 侧面上的点用 (s, y) 表示：s 是沿底面圆周的弧长（-πr～πr，0 是正前方那条母线），y 是高度
  // roll：0 是圆柱，1 是完全摊平；横截面是一段长 2πr 的圆弧，曲率从 1/r 线性减到 0，s=0 处始终在原点、切线沿 x 轴
  function cylinderPoint(r, s, y, roll) {
    const k = (1 - roll) / r;
    if (k < EPS) return [s, y, 0];
    return [Math.sin(k * s) / k, y, -(1 - Math.cos(k * s)) / k];
  }

  // 圆柱展开：t=0 立体，t=1 展开；前 30% 翻开上下底面，后 70% 摊平侧面
  // 返回侧面网格 lateral[i][j]（i 沿圆周 0..n，j=0 底边、1 顶边）和两个底面（多边形顶点）
  function cylinderShape(r, h, t, n = 48) {
    const capT = clamp01(t / 0.3), roll = clamp01((t - 0.3) / 0.7);
    const lateral = [];
    for (let i = 0; i <= n; i++) {
      const s = -Math.PI * r + 2 * Math.PI * r * i / n;
      lateral.push([cylinderPoint(r, s, 0, roll), cylinderPoint(r, s, h, roll)]);
    }
    const th = capT * Math.PI / 2;
    const disc = [];
    for (let i = 0; i < n; i++) {
      const a = 2 * Math.PI * i / n;
      disc.push([r * Math.sin(a), -r + r * Math.cos(a)]);   // 圆心在 (0, -r)，过原点
    }
    // 底面绕 x 轴向下翻，顶面绕 y=h 处的 x 轴向上翻
    const bottom = disc.map(([x, z]) => [x, z * Math.sin(th), z * Math.cos(th)]);
    const top = disc.map(([x, z]) => [x, h - z * Math.sin(th), z * Math.cos(th)]);
    return { lateral, bottom, top };
  }

  // ---------- 圆锥 ----------
  // 扇形半径 l（母线）、圆心角 phi（弧度），围成底面半径为 r 的圆锥；phi = 2πr/l 时正好合上
  // 扇形上的点用 (d, psi) 表示：d 是到顶点的距离，psi 是和中间那条半径的夹角（-phi/2～phi/2）
  // roll：0 贴在底面半径 r 的圆锥上，1 摊平；中间那条母线始终不动，顶点在原点
  function coneFrame(r, l, roll) {
    const a0 = Math.asin(Math.min(1, r / l));
    const a = a0 + (Math.PI / 2 - a0) * roll;
    return { a0, a, rho: l * Math.sin(a) };
  }

  function conePoint(r, l, d, psi, roll) {
    const { a0, a, rho } = coneFrame(r, l, roll);
    const phi = psi * l / rho;
    const p = [d * Math.sin(a) * Math.sin(phi), -d * Math.cos(a), d * Math.sin(a) * Math.cos(phi)];
    return rotX(p, a - a0);
  }

  // 圆锥展开：t=0 立体，t=1 展开；前 30% 翻开底面，后 70% 摊平侧面
  // 返回侧面网格 lateral[i][j]（i 沿弧 0..n，j 从顶点 0 到底边 rings）和底面多边形
  function coneShape(r, l, phi, t, n = 48, rings = 4) {
    const capT = clamp01(t / 0.3), roll = clamp01((t - 0.3) / 0.7);
    const lateral = [];
    for (let i = 0; i <= n; i++) {
      const psi = -phi / 2 + phi * i / n;
      const col = [];
      for (let j = 0; j <= rings; j++) col.push(conePoint(r, l, l * j / rings, psi, roll));
      lateral.push(col);
    }
    // 底面：以中间母线的端点 P 为铰链，绕 x 轴向外翻到和摊平的扇形共面
    const { a0 } = coneFrame(r, l, 0);
    const P = [0, -l * Math.cos(a0), l * Math.sin(a0)];
    const g = -capT * (Math.PI / 2 + a0);
    const base = [];
    for (let i = 0; i < n; i++) {
      const b = 2 * Math.PI * i / n;
      const v = [r * Math.sin(b), 0, -r + r * Math.cos(b)];   // 相对 P，圆心在 P 后方 r 处
      base.push(add(P, rotX(v, g)));
    }
    return { lateral, base };
  }

  // 扇形圆心角（度）
  const sectorAngle = (r, l) => r / l * 360;

  // ---------- 长方体表面最短路 ----------
  // 长方体 x∈[0,a]（长）、z∈[0,b]（宽）、y∈[0,c]（高），蚂蚁从 A(0,0,0) 爬到 G(a,c,b)
  // 三种走法各经过两个面：from 含 A，to 含 G；展开时 to 面绕公共棱（过 o、方向 axis）转 90°
  function boxRoutes(a, b, c) {
    return [
      {
        name: '前面 → 右面',
        from: [[0, 0, 0], [a, 0, 0], [a, c, 0], [0, c, 0]],
        to: [[a, 0, 0], [a, 0, b], [a, c, b], [a, c, 0]],
        o: [a, 0, 0], axis: [0, 1, 0],
        cross: [a, c * a / (a + b), 0],
        sq: (a + b) ** 2 + c ** 2, formula: `(${a}+${b})²+${c}²`,
      },
      {
        name: '前面 → 上面',
        from: [[0, 0, 0], [a, 0, 0], [a, c, 0], [0, c, 0]],
        to: [[0, c, 0], [a, c, 0], [a, c, b], [0, c, b]],
        o: [0, c, 0], axis: [-1, 0, 0],
        cross: [a * c / (c + b), c, 0],
        sq: a ** 2 + (c + b) ** 2, formula: `${a}²+(${c}+${b})²`,
      },
      {
        name: '左面 → 上面',
        from: [[0, 0, 0], [0, 0, b], [0, c, b], [0, c, 0]],
        to: [[0, c, 0], [0, c, b], [a, c, b], [a, c, 0]],
        o: [0, c, 0], axis: [0, 0, 1],
        cross: [0, c, b * c / (c + a)],
        sq: b ** 2 + (c + a) ** 2, formula: `${b}²+(${c}+${a})²`,
      },
    ];
  }

  // 走法展开到 t（0 在盒子上，1 两个面摊平）：返回 to 面顶点和路径三点 A → 交点 → G
  function unfoldRoute(route, a, b, c, t) {
    const turn = p => rotateAbout(p, route.o, route.axis, t * Math.PI / 2);
    return { to: route.to.map(turn), path: [[0, 0, 0], route.cross, turn([a, c, b])] };
  }

  // 圆柱侧面最短路：turns=0.5 从左侧底面爬到右侧顶面（半圈），turns=1 绕一圈回到正上方
  // 返回侧面坐标下的起点 s0 和终点 s1
  function cylinderRoute(r, turns) {
    const L = 2 * Math.PI * r * turns;
    return { s0: -L / 2, s1: L / 2 };
  }

  // ---------- 正方体截面 ----------
  // 正方体 [-1,1]³，平面 n·p = d（n 为单位向量）
  const CUBE_V = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) CUBE_V.push([x, y, z]);
  const CUBE_E = [];
  CUBE_V.forEach((p, i) => CUBE_V.forEach((q, j) => {
    if (i < j && dist(p, q) === 2) CUBE_E.push([i, j]);
  }));

  // 截面法向：转向 yaw（绕竖直轴，度）、倾斜 pitch（0 为竖直截面，90 为水平截面，度）
  function sectionNormal(yaw, pitch) {
    const y = yaw * Math.PI / 180, p = pitch * Math.PI / 180;
    return [Math.cos(p) * Math.cos(y), Math.sin(p), Math.cos(p) * Math.sin(y)];
  }

  // 截面多边形顶点（按顺序），切不到或只切到点、线时返回 []
  function cubeSection(n, d) {
    const pts = [];
    const push = p => { if (!pts.some(q => dist(p, q) < 1e-7)) pts.push(p); };
    for (const [i, j] of CUBE_E) {
      const p = CUBE_V[i], q = CUBE_V[j];
      const fp = dot(n, p) - d, fq = dot(n, q) - d;
      if (Math.abs(fp) < 1e-9) push(p);
      if (Math.abs(fq) < 1e-9) push(q);
      if (fp * fq < 0 && Math.abs(fp) > 1e-9 && Math.abs(fq) > 1e-9) push(lerp(p, q, fp / (fp - fq)));
    }
    if (pts.length < 3) return [];
    const c = mul(pts.reduce(add, [0, 0, 0]), 1 / pts.length);
    const u = norm(sub(pts[0], c)), w = cross(n, u);
    return pts
      .map(p => ({ p, ang: Math.atan2(dot(sub(p, c), w), dot(sub(p, c), u)) }))
      .sort((x, y) => x.ang - y.ang)
      .map(x => x.p);
  }

  // 倾斜角的可选值：每 5° 一档，其中 35°、55° 换成正好的 35.26°、54.74°（法向为 (1,1,1)、(1,2,1) 方向），
  // 这样正六边形、等边三角形、菱形能切得出来
  const PITCHES = [];
  for (let p = 0; p <= 90; p += 5) PITCHES.push(p === 35 ? Math.asin(1 / Math.sqrt(3)) * 180 / Math.PI : p === 55 ? Math.asin(2 / Math.sqrt(6)) * 180 / Math.PI : p);

  // 判断截面形状。只认真正相等的边和角（容差只为抵消浮点误差），不把"差不多"算成特殊图形
  const LEN_TOL = 1e-6, ANG_TOL = 1e-6;
  function classifySection(pts) {
    const n = pts.length;
    if (n < 3) return { sides: 0, name: '' };
    const sides = pts.map((p, i) => sub(pts[(i + 1) % n], p));
    const lens = sides.map(len);
    const eq = (x, y) => Math.abs(x - y) <= LEN_TOL * Math.max(x, y);
    // 顶点 i 处的内角
    const angle = i => {
      const u = mul(sides[(i + n - 1) % n], -1), v = sides[i];
      return Math.acos(Math.max(-1, Math.min(1, dot(u, v) / len(u) / len(v))));
    };
    const angs = pts.map((_, i) => angle(i));
    const parallel = (i, j) => len(cross(sides[i], sides[j])) / lens[i] / lens[j] < Math.sin(ANG_TOL);
    const allEq = lens.every(x => eq(x, lens[0]));
    if (n === 3) {
      if (allEq) return { sides: 3, name: '等边三角形' };
      const big = Math.max(...angs);
      const kind = Math.abs(big - Math.PI / 2) < ANG_TOL ? '直角' : big > Math.PI / 2 ? '钝角' : '锐角';
      const iso = eq(lens[0], lens[1]) || eq(lens[1], lens[2]) || eq(lens[0], lens[2]);
      return { sides: 3, name: iso ? `等腰${kind === '锐角' ? '' : kind}三角形` : `${kind}三角形` };
    }
    if (n === 4) {
      const p02 = parallel(0, 2), p13 = parallel(1, 3);
      const right = angs.every(x => Math.abs(x - Math.PI / 2) < ANG_TOL);
      if (p02 && p13) {
        if (right) return { sides: 4, name: allEq ? '正方形' : '长方形' };
        return { sides: 4, name: allEq ? '菱形' : '平行四边形' };
      }
      if (p02 || p13) {
        const legs = p02 ? [lens[1], lens[3]] : [lens[0], lens[2]];
        return { sides: 4, name: eq(legs[0], legs[1]) ? '等腰梯形' : '梯形' };
      }
      return { sides: 4, name: '四边形' };
    }
    if (n === 5) return { sides: 5, name: '五边形' };
    const regular = allEq && angs.every(x => Math.abs(x - 2 * Math.PI / 3) < ANG_TOL);
    return { sides: 6, name: regular ? '正六边形' : '六边形' };
  }

  // 把截面摊到平面上（用来画实际形状）：返回二维坐标
  function flattenPolygon(pts, n) {
    const c = mul(pts.reduce(add, [0, 0, 0]), 1 / pts.length);
    const u = norm(sub(pts[0], c)), w = cross(n, u);
    return pts.map(p => [dot(sub(p, c), u), dot(sub(p, c), w)]);
  }

  return {
    add, sub, mul, dot, cross, len, norm, lerp, dist, rotateAbout, rotX,
    parseCells, normalize, netKey, isConnected, enumerateHexominoes, buildNetTree, foldNet, checkNet,
    oppositeFace, netCategory, cubeNets,
    cylinderPoint, cylinderShape, conePoint, coneShape, sectorAngle,
    boxRoutes, unfoldRoute, cylinderRoute,
    CUBE_V, CUBE_E, PITCHES, sectionNormal, cubeSection, classifySection, flattenPolygon,
  };
})();

if (typeof module !== 'undefined') module.exports = Geo3D;
