'use strict';

// 立体图形实验室：关卡数据、控件和 Canvas 渲染。几何计算在 geo3d.js
const G = typeof Geo3D !== 'undefined' ? Geo3D : require('./geo3d.js');

// ---------- 关卡数据（答案都由几何计算得出，测试会核对） ----------

// 1-2 能不能折成正方体
const NET_QUIZ = [
  ['.#..', '####', '..#.'],
  ['##.', '##.', '.##'],
  ['##..', '.###', '...#'],
  ['#....', '#####'],
  ['#...', '####', '.#..'],
  ['#..#', '####'],
  ['###..', '..###'],
  ['##..', '.##.', '..#.', '..#.'],
];

// 1-4 相对面：ask 是按从上到下、从左到右数的第几个格子（从 0 开始）
const OPPOSITE_QUIZ = [
  { rows: ['.#..', '####', '..#.'], ask: 1 },
  { rows: ['##..', '.###', '...#'], ask: 0 },
  { rows: ['##..', '.##.', '..##'], ask: 1 },
  { rows: ['###..', '..###'], ask: 0 },
];

// 2-3 围圆锥：扇形半径 l、圆心角 deg
const CONE_ROUNDS = [{ l: 6, deg: 120 }, { l: 4, deg: 270 }, { l: 5, deg: 108 }];

// 3-3 猜最短：长方体的长、宽、高
const BOX_ROUNDS = [[4, 1, 2], [2, 3, 5], [1, 4, 3]];

// 4-2 切出指定形状
const SHAPE_TARGETS = ['等边三角形', '正方形', '长方形', '菱形', '梯形', '五边形', '正六边形'];
const sectionMatches = (target, name) => name === target || (target === '梯形' && name === '等腰梯形');

// 4-3 想一想：demo 是示意截面 [转向, 倾斜, 位置]
const P35 = G.PITCHES[7];
const SECTION_QUIZ = [
  {
    q: '能切出直角三角形吗？', answer: false, demo: [30, 40, 1.2], demoName: '锐角三角形',
    why: '切出三角形时，平面切掉了正方体的一个"角"，三个顶点在从同一个顶点出发的三条棱上。设三段长分别是 x、y、z，由勾股定理，三边的平方是 x²+y²、y²+z²、z²+x²，任意两个加起来都比第三个大，所以三个角都是锐角。直角三角形、钝角三角形都切不出来。',
  },
  {
    q: '能切出正六边形吗？', answer: true, demo: [45, P35, 0], demoName: '正六边形',
    why: '能。过正方体的中心、和一条体对角线垂直的平面，正好经过 6 条棱的中点，6 条边一样长，6 个角都是 120°。',
  },
  {
    q: '能切出正五边形吗？', answer: false, demo: [5, 5, -0.95], demoName: '五边形',
    why: '五边形截面要切到 5 个面。正方体的 6 个面是 3 对互相平行的面，5 个面里至少有 2 对是平行的；一个平面切两个平行的面，切出的两条线互相平行。所以五边形截面一定有两组平行的边，而正五边形没有平行的边。',
  },
  {
    q: '能切出梯形吗？', answer: true, demo: [45, 5, -1.3], demoName: '等腰梯形',
    why: '能。平面切到一对平行的面，就会切出一组平行的边；再让另外两条边不平行，就是梯形。',
  },
  {
    q: '能切出七边形吗？', answer: false, demo: [5, 45, 0], demoName: '六边形',
    why: '截面的每条边都在正方体的某一个面上，一个面上最多只有一条，正方体只有 6 个面，所以截面最多是六边形。',
  },
];

const CHAPTERS = [
  { no: '1', title: '正方体的展开', short: '展开图' },
  { no: '2', title: '圆柱和圆锥的展开', short: '圆柱圆锥' },
  { no: '3', title: '蚂蚁爬最短路', short: '最短路' },
  { no: '4', title: '切正方体', short: '截面' },
];

// 关卡：challenge 为挑战关（完成条件见各关），其余打开就算看过
const LEVELS = [
  { id: '1-1', title: '十一种展开图', hint: '正方体沿棱剪开，摊平以后有 11 种不同的样子。拖动滑块看它怎么折起来，拖动画面换个角度看。', setup: s => s.netGallery() },
  { id: '1-2', title: '能不能折成正方体', challenge: true, hint: '先想一想，再折叠验证。答对 7 题以上过关。', setup: s => s.netQuiz() },
  { id: '1-3', title: '自己拼', challenge: true, hint: '在下面的格子里点 6 格，拼一个展开图，再折叠试试。集齐 11 种过关。', setup: s => s.netBuilder() },
  { id: '1-4', title: '相对面', challenge: true, hint: '折成正方体以后，哪两个面相对（不相邻）？先猜，再折起来验证。', setup: s => s.oppositeQuiz() },
  { id: '2-1', title: '圆柱', hint: '圆柱的侧面沿一条高剪开，是一个长方形。红线是底面的一圈，展开后变成了长方形的哪条边？', setup: s => s.cylinder() },
  { id: '2-2', title: '圆锥', hint: '圆锥的侧面沿一条母线剪开，是一个扇形。红线是底面的一圈，展开后变成了扇形的哪一部分？', setup: s => s.cone() },
  { id: '2-3', title: '围一个圆锥', challenge: true, hint: '给你一个扇形，底面半径取多少，才能正好围成一个圆锥？调好后点"围起来"看看，再点"确定"。', setup: s => s.coneQuiz() },
  { id: '3-1', title: '长方体', hint: '蚂蚁从 A 爬到 B，只能在表面爬。把它经过的两个面展开成一个平面，两点之间线段最短。三种走法哪个最短？', setup: s => s.boxPath() },
  { id: '3-2', title: '圆柱', hint: '蚂蚁沿圆柱侧面从 A 爬到 B。把侧面展开，路线就是长方形里的一条线段。', setup: s => s.cylinderPath() },
  { id: '3-3', title: '猜最短', challenge: true, hint: '三条路线分别是三种走法。先不算，猜一猜哪条最短，再看答案。三轮全对过关。', setup: s => s.boxQuiz() },
  { id: '4-1', title: '自由切', hint: '用一个平面去切正方体，调节刀的方向和位置，看看截面是什么形状。', setup: s => s.section() },
  { id: '4-2', title: '切出指定形状', challenge: true, hint: '调节刀的方向和位置，把下面的形状都切出来。特殊形状要用特殊的角度，比如倾斜 35.3°。', setup: s => s.sectionTargets() },
  { id: '4-3', title: '想一想', challenge: true, hint: '先判断能不能切出来，再看理由。', setup: s => s.sectionQuiz() },
];

// ---------- 小工具 ----------
function num(v) {
  return String(Number(v.toFixed(2))).replace('-', '−');
}
const piStr = k => (Math.abs(k - 1) < 1e-9 ? 'π' : num(k) + 'π');
const LETTERS = 'ABCDEF';
const FACE_COLORS = ['#f2b8a2', '#f7d794', '#b8e0b0', '#a9cdea', '#c9b8e8', '#f0b6cf'];
const ROUTE_COLORS = ['#d9534f', '#2f6fd6', '#2f8a4c'];
const RED = '#d9534f';
const deg = x => x * Math.PI / 180;

// 小图：展开图的缩略图
function netSvg(cells, cell = 12, fill = '#f7d794') {
  const w = Math.max(...cells.map(p => p[0])) + 1, h = Math.max(...cells.map(p => p[1])) + 1;
  const rects = cells.map(([c, r]) =>
    `<rect x="${c * cell + 1}" y="${r * cell + 1}" width="${cell}" height="${cell}" fill="${fill}" stroke="#5b5346" stroke-width="1"/>`).join('');
  return `<svg width="${w * cell + 2}" height="${h * cell + 2}" viewBox="0 0 ${w * cell + 2} ${h * cell + 2}">${rects}</svg>`;
}

// ---------- 界面 ----------
function initUI() {
  const $ = id => document.getElementById(id);
  const canvas = $('board');
  const ctx = canvas.getContext('2d');
  const controls = $('controls');
  const info = $('info');
  const STORE_KEY = 'xq.solids.v1';

  let scene = null;        // 当前画面：{ view, radius(), center(), build() }
  let level = null;
  let cam = { yaw: 0, pitch: 0 };
  let tween = null;        // 正在播放的动画
  let drawQueued = false;
  const store = loadStore();

  function loadStore() {
    try {
      const o = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
      return { done: new Set(o.done || []), nets: new Set(o.nets || []) };
    } catch {
      return { done: new Set(), nets: new Set() };
    }
  }

  function saveStore() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ done: [...store.done], nets: [...store.nets] }));
    } catch {}
  }

  function markDone(id = level.id) {
    if (store.done.has(id)) return;
    store.done.add(id);
    saveStore();
    renderNav();
  }

  // ---------- DOM 小工具 ----------
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function button(text, onClick, cls = '') {
    const b = el('button', cls, text);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  function row(parent, ...children) {
    const r = el('div', 'row');
    children.forEach(c => r.appendChild(c));
    parent.appendChild(r);
    return r;
  }

  function setMessage(kind, text) {
    const m = $('message');
    m.className = kind;
    m.textContent = text;
  }

  // 数值滑块：− [滑块] + 数值
  function slider(parent, { label, min, max, step, value, fmt = num, onChange }) {
    const r = el('div', 'param');
    r.innerHTML =
      `<span class="name">${label}</span>` +
      `<button type="button" aria-label="减小${label}">−</button>` +
      `<input type="range" min="${min}" max="${max}" step="${step}">` +
      `<button type="button" aria-label="增大${label}">+</button>` +
      `<span class="val"></span>`;
    const [minus, plus] = r.querySelectorAll('button');
    const range = r.querySelector('input');
    const val = r.querySelector('.val');
    let v = value;
    const show = () => { range.value = v; val.textContent = fmt(v); };
    const set = (x, fire = true) => {
      x = Math.min(max, Math.max(min, min + Math.round((x - min) / step) * step));
      x = Number(x.toFixed(6));
      const changed = x !== v;
      v = x;
      show();
      if (changed && fire) onChange(v);
    };
    range.addEventListener('input', () => set(parseFloat(range.value)));
    minus.addEventListener('click', () => set(v - step));
    plus.addEventListener('click', () => set(v + step));
    show();
    parent.appendChild(r);
    return { get: () => v, set };
  }

  // 折叠滑块：▶ 展开 [滑块] 立体；value 0 为展开，1 为立体
  function foldControl(parent, { value = 0, onChange = () => {} }) {
    const r = el('div', 'fold');
    const play = button('▶', () => animateTo(v < 0.5 ? 1 : 0), 'play');
    play.setAttribute('aria-label', '播放折叠动画');
    const range = el('input');
    range.type = 'range';
    range.min = 0; range.max = 1; range.step = 0.01;
    r.append(play, el('span', 'end', '展开'), range, el('span', 'end', '立体'));
    parent.appendChild(r);
    let v = value;
    const set = x => {
      v = Math.min(1, Math.max(0, x));
      range.value = v;
      onChange(v);
      requestDraw();
    };
    range.addEventListener('input', () => { stopTween(); set(parseFloat(range.value)); });
    function animateTo(target, done) {
      const from = v;
      const dur = 1400 * Math.abs(target - from);
      startTween(dur, k => set(from + (target - from) * k), done);
    }
    range.value = v;
    return { get: () => v, set: x => { stopTween(); set(x); }, animateTo, el: r };
  }

  // 选项按钮组
  function choices(parent, labels, onPick, colors) {
    const r = el('div', 'choices');
    const bs = labels.map((t, i) => {
      const b = button(t, () => onPick(i));
      if (colors) b.style.borderColor = b.style.color = colors[i];
      r.appendChild(b);
      return b;
    });
    parent.appendChild(r);
    return bs;
  }

  // ---------- 动画 ----------
  function startTween(dur, step, done) {
    stopTween();
    if (dur <= 0) { step(1); if (done) done(); return; }
    const t0 = performance.now();
    const t = { id: 0 };
    const tick = now => {
      const k = Math.min(1, (now - t0) / dur);
      step(k < 0.5 ? 2 * k * k : 1 - 2 * (1 - k) * (1 - k));
      if (k < 1) t.id = requestAnimationFrame(tick);
      else { tween = null; if (done) done(); }
    };
    t.id = requestAnimationFrame(tick);
    tween = t;
  }

  function stopTween() {
    if (tween) cancelAnimationFrame(tween.id);
    tween = null;
  }

  // ---------- 渲染 ----------
  // 画面物件：
  //   { poly: [点], fill, alpha, stroke, label, under }  多边形（under：最先画，不参与遮挡排序）
  //   { line: [点], color, width, top, dash }           折线（top：画在最上层）
  //   { dot: 点, color, label }                          标注点（画在最上层）
  function requestDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => { drawQueued = false; render(); });
  }

  function shade(hex, k) {
    const n = parseInt(hex.slice(1), 16);
    const ch = s => Math.min(255, Math.round(((n >> s) & 255) * k));
    return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
  }

  function render() {
    const W = canvas.clientWidth, H = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (!scene) return;

    const R = scene.radius(), C = scene.center();
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const D = R * 5, scale = Math.min(W, H) * 0.46 / R;
    const toCam = p => {
      const x = p[0] - C[0], y = p[1] - C[1], z = p[2] - C[2];
      const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      return [x1, y * cp - z1 * sp, y * sp + z1 * cp];
    };
    const toScr = q => {
      const f = D / (D - q[2]);
      return [W / 2 + q[0] * f * scale, H / 2 - q[1] * f * scale];
    };

    const layers = [], top = [];
    for (const it of scene.build()) {
      if (it.poly) {
        const q = it.poly.map(toCam);
        const z = it.under ? -Infinity : q.reduce((s, p) => s + p[2], 0) / q.length;
        layers.push({ it, q, z });
      } else if (it.line) {
        if (it.top) { top.push(it); continue; }
        const q = it.line.map(toCam);
        for (let i = 0; i + 1 < q.length; i++) {
          layers.push({ it, seg: [q[i], q[i + 1]], z: (q[i][2] + q[i + 1][2]) / 2 + R * 0.02 });
        }
      } else if (it.dot) {
        top.push(it);
      }
    }
    layers.sort((a, b) => a.z - b.z);

    const L = G.norm([-0.4, 0.6, 1]);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    for (const { it, q, seg } of layers) {
      if (seg) {
        drawLine(seg.map(toScr), it);
        continue;
      }
      // 纽厄尔法求法向（面上有重合顶点也没关系）
      let n = [0, 0, 0];
      q.forEach((a, i) => {
        const b = q[(i + 1) % q.length];
        n = G.add(n, [(a[1] - b[1]) * (a[2] + b[2]), (a[2] - b[2]) * (a[0] + b[0]), (a[0] - b[0]) * (a[1] + b[1])]);
      });
      const nl = G.len(n);
      const facing = nl > 1e-12 ? Math.abs(n[2] / nl) : 1;
      const k = nl > 1e-12 ? 0.68 + 0.32 * Math.abs(G.dot(n, L) / nl) : 1;
      const s = q.map(toScr);
      ctx.beginPath();
      s.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.globalAlpha = it.alpha ?? 1;
      if (it.fill) {
        ctx.fillStyle = shade(it.fill, k);
        ctx.fill();
        // 曲面由很多小块拼成，同色描一圈，盖住相邻小块之间抗锯齿留下的细缝
        if (it.seal) { ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 0.8; ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      if (it.stroke) { ctx.strokeStyle = it.stroke; ctx.lineWidth = it.strokeWidth || 1; ctx.stroke(); }
      if (it.label) {
        const cx = s.reduce((a, p) => a + p[0], 0) / s.length, cyy = s.reduce((a, p) => a + p[1], 0) / s.length;
        ctx.globalAlpha = Math.min(1, facing * 1.6);
        ctx.fillStyle = it.labelColor || '#2b2b2b';
        ctx.font = 'bold 17px -apple-system, "PingFang SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(it.label, cx, cyy);
        ctx.globalAlpha = 1;
      }
    }
    for (const it of top) {
      if (it.line) { drawLine(it.line.map(p => toScr(toCam(p))), it); continue; }
      const [x, y] = toScr(toCam(it.dot));
      ctx.fillStyle = it.color || '#2b2b2b';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      if (it.label) {
        ctx.font = 'bold 16px -apple-system, "PingFang SC", sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fffdf8';
        ctx.strokeText(it.label, x + 6, y - 4);
        ctx.fillText(it.label, x + 6, y - 4);
      }
    }
  }

  function drawLine(pts, it) {
    ctx.strokeStyle = it.color || '#2b2b2b';
    ctx.lineWidth = it.width || 2;
    ctx.setLineDash(it.dash || []);
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 拖动旋转视角
  let drag = null;
  canvas.addEventListener('pointerdown', e => {
    drag = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    cam.yaw -= (e.clientX - drag.x) * 0.01;
    cam.pitch = Math.min(1.5, Math.max(-1.5, cam.pitch + (e.clientY - drag.y) * 0.01));
    drag = { x: e.clientX, y: e.clientY };
    requestDraw();
  });
  const endDrag = () => { drag = null; };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  function resetView() {
    const v = (scene && scene.view) || { yaw: -30, pitch: 25 };
    cam = { yaw: deg(v.yaw), pitch: deg(v.pitch) };
    requestDraw();
  }
  $('resetView').addEventListener('click', resetView);

  // ---------- 通用画面 ----------

  // 正方体展开图：cells、折叠程度 t（0 展开，1 立体）、每个面的颜色和字母
  function netItems(cells, t, tree, { colors, labels } = {}) {
    return G.foldNet(cells, t, tree).map((f, i) => ({
      poly: f.pts,
      fill: colors ? colors[i] : FACE_COLORS[i],
      stroke: '#5b5346',
      strokeWidth: 1.5,
      label: labels ? labels[i] : '',
    }));
  }

  // 展开图画面的中心：从平摊时的中心移到立体时正方体的中心
  function netCenter(cells, tree, t) {
    const xs = cells.map(p => p[0]), zs = cells.map(p => p[1]);
    const flat = [(Math.min(...xs) + Math.max(...xs) + 1) / 2, 0, (Math.min(...zs) + Math.max(...zs) + 1) / 2];
    const [c, r] = cells[tree.root];
    return G.lerp(flat, [c + 0.5, 0.5, r + 0.5], t);
  }

  function netRadius(cells) {
    const w = Math.max(...cells.map(p => p[0])) - Math.min(...cells.map(p => p[0])) + 1;
    const h = Math.max(...cells.map(p => p[1])) - Math.min(...cells.map(p => p[1])) + 1;
    return Math.max(2, Math.hypot(w, h) / 2 + 0.3);
  }

  function netScene(get) {
    return {
      view: { yaw: -15, pitch: 50 },
      radius: () => { const s = get(); return netRadius(s.cells) * (1 - s.t) + 1.5 * s.t; },   // 折起来后放大
      center: () => { const s = get(); return netCenter(s.cells, s.tree, s.t); },
      build: () => { const s = get(); return netItems(s.cells, s.t, s.tree, s); },
    };
  }

  // 正方体截面（4-1、4-2、4-3 共用）
  function sectionScene(get) {
    const cubeFaces = [];
    const V = G.CUBE_V;
    // 六个面：每个面取坐标 axis 为 ±1 的四个顶点，按环绕顺序
    for (let axis = 0; axis < 3; axis++) {
      for (const sgn of [-1, 1]) {
        const vs = V.filter(p => p[axis] === sgn);
        const [u, w] = [0, 1, 2].filter(a => a !== axis);
        const ang = p => Math.atan2(p[w], p[u]);
        cubeFaces.push(vs.sort((a, b) => ang(a) - ang(b)));
      }
    }
    return {
      view: { yaw: -30, pitch: 22 },
      radius: () => 2.3,
      center: () => [0, 0, 0],
      build: () => {
        const s = get();
        const items = cubeFaces.map(f => ({ poly: f, fill: '#dfe9f5', alpha: 0.28, stroke: '#7a7366' }));
        if (!s.n) return items;
        // 刀面：过截面、和法向垂直的一个大正方形，画在最底层
        const n = s.n;
        const u = G.norm(Math.abs(n[1]) < 0.9 ? G.cross(n, [0, 1, 0]) : G.cross(n, [1, 0, 0]));
        const w = G.cross(n, u);
        const o = G.mul(n, s.d);
        const k = 2.1;
        items.push({
          poly: [[-k, -k], [k, -k], [k, k], [-k, k]].map(([a, b]) => G.add(o, G.add(G.mul(u, a), G.mul(w, b)))),
          fill: '#2f6fd6', alpha: 0.1, stroke: 'rgba(47,111,214,.35)', under: true,
        });
        const sec = G.cubeSection(n, s.d);
        if (sec.length) items.push({ poly: sec, fill: '#f4a261', alpha: 0.9, stroke: '#c0513a', strokeWidth: 2 });
        return items;
      },
    };
  }

  // 截面的实际形状画在右下角的小画布里
  function drawSectionShape(box, n, d) {
    const pts = G.cubeSection(n, d);
    const size = 110;
    const c = el('canvas', 'shape');
    const dpr = window.devicePixelRatio || 1;
    c.width = size * dpr; c.height = size * dpr;
    box.appendChild(c);
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    if (!pts.length) return;
    const flat = G.flattenPolygon(pts, n);
    const k = (size / 2 - 8) / 2.45;   // 最大截面（长方形对角线的一半约 1.73，六边形约 1.22）
    g.beginPath();
    flat.forEach(([x, y], i) => (i ? g.lineTo(size / 2 + x * k, size / 2 - y * k) : g.moveTo(size / 2 + x * k, size / 2 - y * k)));
    g.closePath();
    g.fillStyle = '#f4a261';
    g.fill();
    g.strokeStyle = '#c0513a';
    g.lineWidth = 2;
    g.stroke();
  }

  // 截面的三个滑块
  function sectionSliders(state, onChange) {
    const p = el('div');
    controls.appendChild(p);
    const fire = () => { state.n = G.sectionNormal(state.yaw, G.PITCHES[state.pitchIdx]); onChange(); requestDraw(); };
    slider(p, { label: '转向', min: 0, max: 90, step: 5, value: state.yaw, fmt: v => v + '°', onChange: v => { state.yaw = v; fire(); } });
    slider(p, {
      label: '倾斜', min: 0, max: G.PITCHES.length - 1, step: 1, value: state.pitchIdx,
      fmt: i => num(G.PITCHES[i]).replace(/(\.\d)\d*/, '$1') + '°',
      onChange: v => { state.pitchIdx = v; fire(); },
    });
    slider(p, { label: '位置', min: -1.75, max: 1.75, step: 0.05, value: state.d, onChange: v => { state.d = v; fire(); } });
    state.n = G.sectionNormal(state.yaw, G.PITCHES[state.pitchIdx]);
  }

  // 圆柱画面（2-1 用；3-2 另画路径）
  function cylinderItems(r, h, t, { caps = true, alpha = 1, rim = true } = {}) {
    const { lateral, bottom, top } = G.cylinderShape(r, h, t);
    const items = [];
    for (let i = 0; i + 1 < lateral.length; i++) {
      items.push({ poly: [lateral[i][0], lateral[i + 1][0], lateral[i + 1][1], lateral[i][1]], fill: '#a9cdea', alpha, seal: alpha === 1 });
    }
    // 侧面的轮廓：上下边和剪开的两条高
    const n = lateral.length - 1;
    items.push({ line: lateral.map(p => p[1]), color: '#3d5f80', width: 1.5 });
    items.push({ line: [lateral[0][0], lateral[0][1]], color: '#3d5f80', width: 1.5 });
    items.push({ line: [lateral[n][0], lateral[n][1]], color: '#3d5f80', width: 1.5 });
    items.push({ line: lateral.map(p => p[0]), color: rim ? RED : '#3d5f80', width: rim ? 3 : 1.5 });
    if (caps) {
      items.push({ poly: bottom, fill: '#f7d794', stroke: rim ? RED : '#5b5346', strokeWidth: rim ? 3 : 1 });
      items.push({ poly: top, fill: '#f7d794', stroke: '#5b5346' });
    }
    return items;
  }

  function coneItems(r, l, phi, t) {
    const { lateral, base } = G.coneShape(r, l, phi, t);
    const items = [];
    const m = lateral[0].length - 1;
    for (let i = 0; i + 1 < lateral.length; i++) {
      for (let j = 0; j < m; j++) {
        items.push({ poly: [lateral[i][j], lateral[i + 1][j], lateral[i + 1][j + 1], lateral[i][j + 1]], fill: '#b8e0b0', seal: true });
      }
    }
    items.push({ line: lateral[0], color: '#3f6b3a', width: 1.5 });
    items.push({ line: lateral[lateral.length - 1], color: '#3f6b3a', width: 1.5 });
    items.push({ line: lateral.map(c => c[m]), color: RED, width: 3 });
    items.push({ poly: base, fill: '#f7d794', stroke: RED, strokeWidth: 3 });
    return items;
  }

  // 圆锥画面的中心和大小：立体时在锥体中间，展开时在扇形和底面中间
  function coneView(r, l, t) {
    const a0 = Math.asin(Math.min(1, r / l));
    const u0 = [0, -Math.cos(a0), Math.sin(a0)];
    return { center: G.lerp([0, -l * Math.cos(a0) / 2, 0], G.mul(u0, r), t), radius: l + r };
  }

  // 长方体的六个面
  function boxFaces(a, b, c) {
    return {
      front: [[0, 0, 0], [a, 0, 0], [a, c, 0], [0, c, 0]],
      back: [[0, 0, b], [a, 0, b], [a, c, b], [0, c, b]],
      left: [[0, 0, 0], [0, 0, b], [0, c, b], [0, c, 0]],
      right: [[a, 0, 0], [a, 0, b], [a, c, b], [a, c, 0]],
      bottom: [[0, 0, 0], [a, 0, 0], [a, 0, b], [0, 0, b]],
      top: [[0, c, 0], [a, c, 0], [a, c, b], [0, c, b]],
    };
  }
  const ROUTE_FACES = [['front', 'right'], ['front', 'top'], ['left', 'top']];

  // 长方体和路线：show 是要画的路线下标，unfold 是展开的路线（-1 不展开）和程度 t
  // 几何里前面是 z=0，而镜头在 +z 一侧，所以画之前沿 z 翻一下，让"前面"朝向学生、A 在左前下角
  function boxItems(a, b, c, opts) {
    const m = p => [p[0], p[1], b - p[2]];
    return boxItemsRaw(a, b, c, opts).map(it =>
      it.poly ? { ...it, poly: it.poly.map(m) } : it.line ? { ...it, line: it.line.map(m) } : { ...it, dot: m(it.dot) });
  }

  function boxItemsRaw(a, b, c, { show, unfold = -1, t = 0 }) {
    const faces = boxFaces(a, b, c);
    const routes = G.boxRoutes(a, b, c);
    const items = [];
    const hide = unfold >= 0 && t > 0 ? ROUTE_FACES[unfold][1] : null;
    const hl = unfold >= 0 ? ROUTE_FACES[unfold] : [];
    for (const [k, f] of Object.entries(faces)) {
      if (k === hide) continue;
      items.push({ poly: f, fill: hl.includes(k) ? '#f7d794' : '#dfe9f5', alpha: hl.includes(k) ? 0.6 : 0.3, stroke: '#7a7366' });
    }
    for (const i of show) {
      const tt = i === unfold ? t : 0;
      const u = G.unfoldRoute(routes[i], a, b, c, tt);
      if (i === unfold && hide) items.push({ poly: u.to, fill: '#f7d794', alpha: 0.6, stroke: '#7a7366' });
      items.push({ line: u.path, color: ROUTE_COLORS[i], width: 3, top: true });
      if (i === unfold || show.length === 1) items.push({ dot: u.path[2], color: '#2b2b2b', label: 'B' });
    }
    if (show.length !== 1 && unfold < 0) items.push({ dot: [a, c, b], color: '#2b2b2b', label: 'B' });
    items.push({ dot: [0, 0, 0], color: '#2b2b2b', label: 'A' });
    return items;
  }

  function boxRadius(a, b, c) {
    return Math.max(a + b, a + c, b + c) * 0.62 + 0.3;
  }

  // 长方体三种走法的长度表
  function routeTable(a, b, c) {
    const routes = G.boxRoutes(a, b, c);
    const min = Math.min(...routes.map(r => r.sq));
    return '<table class="routes"><tr><th>走法</th><th>长度²</th><th>长度</th></tr>' + routes.map((r, i) =>
      `<tr${r.sq === min ? ' class="best"' : ''}><td><i style="background:${ROUTE_COLORS[i]}"></i>${i + 1}. ${r.name}</td>` +
      `<td>${r.formula} = ${r.sq}</td><td>√${r.sq} ≈ ${num(Math.sqrt(r.sq))}${r.sq === min ? ' ★' : ''}</td></tr>`).join('') + '</table>';
  }

  // ---------- 各关 ----------
  const setups = {
    // 1-1 十一种展开图
    netGallery() {
      const nets = G.cubeNets();
      const st = { i: 0, t: 0 };
      const cur = () => {
        const cells = nets[st.i].cells;
        return { cells, tree: G.buildNetTree(cells), t: st.t };
      };
      const CAT_TEXT = {
        '1-4-1': '中间一行 4 个，上下各 1 个。这一类有 6 种。',
        '2-3-1': '三行分别是 2 个、3 个、1 个。这一类有 3 种。',
        '2-2-2': '三行各 2 个，像台阶一样错开。只有 1 种。',
        '3-3': '两行各 3 个，错开相接。只有 1 种。',
      };
      const title = el('span', 'navtext');
      row(controls, button('‹', () => go(st.i - 1), 'nav'), title, button('›', () => go(st.i + 1), 'nav'));
      const fold = foldControl(controls, { value: 0, onChange: v => { st.t = v; } });
      const thumbs = el('div', 'thumbs');
      controls.appendChild(thumbs);
      nets.forEach((n, i) => {
        const b = button(netSvg(n.cells, 9), () => go(i), 'thumb');
        b.setAttribute('aria-label', `第 ${i + 1} 种`);
        thumbs.appendChild(b);
      });
      function go(i) {
        st.i = (i + nets.length) % nets.length;
        const n = nets[st.i];
        title.textContent = `第 ${st.i + 1} 种 · ${n.cat} 型`;
        info.innerHTML = `<p><b>${n.cat} 型：</b>${CAT_TEXT[n.cat]}</p>` +
          '<p class="muted">口诀：1-4-1 型 6 种，2-3-1 型 3 种，2-2-2 型和 3-3 型各 1 种，一共 11 种。不能出现"田"字形，一行也不能超过 4 个。</p>';
        [...thumbs.children].forEach((b, j) => b.classList.toggle('current', j === st.i));
        fold.set(0);
        requestDraw();
      }
      go(0);
      markDone();
      return netScene(cur);
    },

    // 1-2 能不能折成正方体
    netQuiz() {
      const st = { i: 0, t: 0, answered: false, score: 0 };
      const cur = () => {
        const cells = G.parseCells(NET_QUIZ[st.i]);
        const res = G.checkNet(cells);
        const colors = st.answered
          ? cells.map((_, j) => (res.overlap.includes(j) ? '#e57368' : FACE_COLORS[j]))
          : cells.map(() => '#f7d794');
        return { cells, tree: G.buildNetTree(cells), t: st.t, colors, res };
      };
      const box = el('div');
      controls.appendChild(box);
      function show() {
        box.innerHTML = '';
        setMessage('', '');
        st.t = 0;
        st.answered = false;
        if (st.i >= NET_QUIZ.length) {
          const pass = st.score >= 7;
          if (pass) markDone();
          setMessage(pass ? 'ok' : 'fail', `答对 ${st.score} / ${NET_QUIZ.length} 题。${pass ? '过关！' : '答对 7 题以上才过关，再试一次吧。'}`);
          row(box, button('再来一遍', () => { st.i = 0; st.score = 0; show(); }, 'primary'));
          st.i = 0;
          requestDraw();
          return;
        }
        info.innerHTML = `<p>第 ${st.i + 1} / ${NET_QUIZ.length} 题　已答对 ${st.score} 题</p>`;
        choices(box, ['能折成正方体', '不能折成'], pick);
        requestDraw();
      }
      function pick(k) {
        const { res } = cur();
        const right = (k === 0) === res.ok;
        if (right) st.score++;
        st.answered = true;
        box.innerHTML = '';
        const fold = foldControl(box, { value: 0, onChange: v => { st.t = v; } });
        fold.animateTo(1);
        const why = res.ok ? '它能折成正方体。' : '它折不成正方体：标红的面折起来会重叠在一起，而且会空出一个面。';
        setMessage(right ? 'ok' : 'fail', (right ? '答对了！' : '不对。') + why);
        row(box, button(st.i + 1 < NET_QUIZ.length ? '下一题 →' : '看成绩', () => { st.i++; show(); }, 'primary'));
        info.innerHTML = `<p>第 ${st.i + 1} / ${NET_QUIZ.length} 题　已答对 ${st.score} 题</p>`;
      }
      show();
      return netScene(cur);
    },

    // 1-3 自己拼
    netBuilder() {
      const COLS = 6, ROWS = 5;
      const nets = G.cubeNets();
      const st = { sel: new Set(['1,1', '1,2', '2,2', '3,2']), t: 0, folded: false };
      const cellsOf = () => [...st.sel].map(k => k.split(',').map(Number));
      const cur = () => {
        const cells = cellsOf();
        if (!cells.length) return { cells: [[2, 2]], tree: G.buildNetTree([[2, 2]]), t: 0, colors: ['#eee'] };
        const res = st.folded ? G.checkNet(cells) : null;
        const colors = cells.map((_, j) => (res && res.overlap.includes(j) ? '#e57368' : st.folded ? FACE_COLORS[j] : '#f7d794'));
        return { cells, tree: G.buildNetTree(cells), t: st.folded ? st.t : 0, colors };
      };
      const grid = el('div', 'grid');
      grid.style.gridTemplateColumns = `repeat(${COLS}, 40px)`;
      controls.appendChild(grid);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const k = c + ',' + r;
          const b = button('', () => {
            if (st.sel.has(k)) st.sel.delete(k);
            else if (st.sel.size >= 6) { setMessage('fail', '正方体只有 6 个面，最多点 6 格。'); return; }
            else st.sel.add(k);
            st.folded = false;
            fold.set(0);
            setMessage('', '');
            refreshGrid();
          });
          b.dataset.k = k;
          grid.appendChild(b);
        }
      }
      const fold = foldControl(controls, { value: 0, onChange: v => { st.t = v; } });
      fold.el.hidden = true;
      row(controls,
        button('清空', () => { st.sel.clear(); st.folded = false; fold.set(0); setMessage('', ''); refreshGrid(); }),
        button('折叠试试', tryFold, 'primary'));
      const found = el('div', 'thumbs');
      controls.appendChild(found);

      function refreshGrid() {
        [...grid.children].forEach(b => b.classList.toggle('on', st.sel.has(b.dataset.k)));
        fold.el.hidden = !st.folded;
        found.innerHTML = '';
        nets.forEach(n => {
          const got = store.nets.has(n.key);
          const d = el('span', 'thumb' + (got ? ' got' : ''), got ? netSvg(n.cells, 7, '#8fc79a') : netSvg(n.cells, 7, '#e4ddcf'));
          found.appendChild(d);
        });
        info.innerHTML = `<p>已找到 <b>${nets.filter(n => store.nets.has(n.key)).length}</b> / 11 种（灰色的还没找到）</p>`;
        requestDraw();
      }
      function tryFold() {
        const cells = cellsOf();
        if (cells.length !== 6) return setMessage('fail', `要正好 6 格，现在是 ${cells.length} 格。`);
        if (!G.isConnected(cells)) return setMessage('fail', '6 个格子要连在一起（有公共边）。');
        st.folded = true;
        fold.el.hidden = false;
        fold.set(0);
        fold.animateTo(1, () => {
          const res = G.checkNet(cells);
          if (!res.ok) return setMessage('fail', '有面重叠了（标红的面），折不成正方体。换个拼法试试。');
          const key = G.netKey(cells);
          const cat = G.netCategory(cells).cat;
          if (store.nets.has(key)) return setMessage('', `能折成！这是 ${cat} 型，这一种已经找到过了。`);
          store.nets.add(key);
          saveStore();
          refreshGrid();
          const n = nets.filter(x => store.nets.has(x.key)).length;
          if (n === 11) { markDone(); setMessage('ok', '11 种全部找到了，过关！'); }
          else setMessage('ok', `新发现！这是 ${cat} 型。还差 ${11 - n} 种。`);
        });
      }
      refreshGrid();
      const sc = netScene(cur);
      sc.radius = () => 3.2 * (1 - cur().t) + 1.5 * cur().t;
      return sc;
    },

    // 1-4 相对面
    oppositeQuiz() {
      const st = { i: 0, t: 0, answered: false, score: 0 };
      const cur = () => {
        const q = OPPOSITE_QUIZ[Math.min(st.i, OPPOSITE_QUIZ.length - 1)];
        const cells = G.parseCells(q.rows);
        const opp = G.oppositeFace(cells, q.ask);
        const colors = cells.map((_, j) => (j === q.ask || (st.answered && j === opp) ? '#f4a261' : '#fbeecb'));
        return { cells, tree: G.buildNetTree(cells), t: st.t, colors, labels: LETTERS.split(''), q, opp };
      };
      const box = el('div');
      controls.appendChild(box);
      const RULE = '<p><b>找相对面的规律：</b></p><ul><li>同一行（或同一列）里，<b>中间隔一个</b>的两个面相对；</li><li><b>Z 字形（或 S 形）两端</b>的两个面相对；</li><li>相邻的两个面一定不相对。</li></ul>';
      function show() {
        box.innerHTML = '';
        setMessage('', '');
        st.t = 0;
        st.answered = false;
        if (st.i >= OPPOSITE_QUIZ.length) {
          markDone();
          setMessage('ok', `答对 ${st.score} / ${OPPOSITE_QUIZ.length} 题，完成！`);
          info.innerHTML = RULE;
          row(box, button('再来一遍', () => { st.i = 0; st.score = 0; show(); }, 'primary'));
          requestDraw();
          return;
        }
        const { q } = cur();
        const ask = LETTERS[q.ask];
        info.innerHTML = `<p>第 ${st.i + 1} / ${OPPOSITE_QUIZ.length} 题：折成正方体后，和 <b>${ask}</b> 相对的是哪个面？</p>`;
        const others = LETTERS.split('').filter((_, j) => j !== q.ask);
        choices(box, others, k => pick(LETTERS.indexOf(others[k])));
        requestDraw();
      }
      function pick(j) {
        const { q, opp, cells } = cur();
        const right = j === opp;
        if (right) st.score++;
        st.answered = true;
        box.innerHTML = '';
        const fold = foldControl(box, { value: 0, onChange: v => { st.t = v; } });
        fold.animateTo(1);
        const [a, b] = [cells[q.ask], cells[opp]];
        const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const inLine = (a[0] === b[0] || a[1] === b[1]) && G.dist([a[0], a[1], 0], [b[0], b[1], 0]) === 2 &&
          cells.some(p => p[0] === mid[0] && p[1] === mid[1]);
        const why = `${LETTERS[q.ask]} 和 ${LETTERS[opp]} 相对：${inLine ? '它们在同一条线上，中间隔着一个面' : '它们是 Z 字形的两端'}。`;
        setMessage(right ? 'ok' : 'fail', (right ? '答对了！' : '不对。') + why);
        row(box, button(st.i + 1 < OPPOSITE_QUIZ.length ? '下一题 →' : '完成', () => { st.i++; show(); }, 'primary'));
      }
      show();
      return netScene(cur);
    },

    // 2-1 圆柱
    cylinder() {
      const st = { r: 1.5, h: 3, f: 1 };
      slider(controls, { label: 'r', min: 1, max: 3, step: 0.5, value: st.r, onChange: v => { st.r = v; update(); } });
      slider(controls, { label: 'h', min: 1, max: 5, step: 0.5, value: st.h, onChange: v => { st.h = v; update(); } });
      foldControl(controls, { value: st.f, onChange: v => { st.f = v; } });
      function update() {
        const { r, h } = st;
        info.innerHTML =
          `<p>底面半径 r = ${num(r)}，高 h = ${num(h)}</p>` +
          `<p><span class="red">底面周长</span> = 2πr = ${piStr(2 * r)} ≈ ${num(2 * Math.PI * r)}</p>` +
          `<p>展开后的长方形：<span class="red">长 = 底面周长 = ${piStr(2 * r)}</span>，宽 = 高 = ${num(h)}</p>` +
          `<p>侧面积 = 2πrh = ${piStr(2 * r * h)} ≈ ${num(2 * Math.PI * r * h)}</p>` +
          `<p class="muted">表面积 = 侧面积 + 两个底面 = 2πrh + 2πr² = ${piStr(2 * r * h + 2 * r * r)}</p>`;
        requestDraw();
      }
      update();
      markDone();
      return {
        view: { yaw: -25, pitch: 18 },
        radius: () => Math.max(Math.PI * st.r, st.h / 2 + 2 * st.r) + 0.3,
        center: () => G.lerp([0, st.h / 2, 0], [0, st.h / 2, -st.r], st.f),
        build: () => cylinderItems(st.r, st.h, 1 - st.f),
      };
    },

    // 2-2 圆锥
    cone() {
      const st = { r: 1.5, l: 4, f: 1 };
      const sr = slider(controls, {
        label: 'r', min: 0.5, max: 3, step: 0.5, value: st.r,
        onChange: v => { st.r = v; if (st.l <= v) sl.set(v + 0.5); update(); },
      });
      const sl = slider(controls, {
        label: 'l', min: 1, max: 6, step: 0.5, value: st.l,
        onChange: v => { st.l = v; if (st.r >= v) sr.set(v - 0.5); update(); },
      });
      foldControl(controls, { value: st.f, onChange: v => { st.f = v; } });
      function update() {
        const { r, l } = st;
        info.innerHTML =
          `<p>底面半径 r = ${num(r)}，母线 l = ${num(l)}（r 是底面半径，l 是顶点到底面圆周的距离）</p>` +
          `<p>展开后的扇形：半径 = 母线 = ${num(l)}，<span class="red">弧长 = 底面周长 = 2πr = ${piStr(2 * r)}</span></p>` +
          `<p>圆心角 = 弧长 ÷ 整个圆的周长 × 360° = ${piStr(2 * r)} ÷ ${piStr(2 * l)} × 360° = <b>${num(G.sectorAngle(r, l))}°</b></p>` +
          `<p class="muted">也就是 圆心角 = r ÷ l × 360°。侧面积 = 扇形面积 = πrl = ${piStr(r * l)}</p>`;
        requestDraw();
      }
      update();
      markDone();
      return {
        view: { yaw: -35, pitch: 15 },
        radius: () => coneView(st.r, st.l, 1 - st.f).radius,
        center: () => coneView(st.r, st.l, 1 - st.f).center,
        build: () => coneItems(st.r, st.l, 2 * Math.PI * st.r / st.l, 1 - st.f),
      };
    },

    // 2-3 围一个圆锥
    coneQuiz() {
      const st = { i: 0, r: 1, f: 0 };
      const box = el('div');
      controls.appendChild(box);
      let fold;
      function show() {
        box.innerHTML = '';
        setMessage('', '');
        if (st.i >= CONE_ROUNDS.length) {
          markDone();
          setMessage('ok', '三个圆锥都围好了，过关！');
          info.innerHTML = '<p><b>小结：</b>扇形的弧长 = 底面周长，所以 圆心角 ÷ 360° × 2πl = 2πr，也就是 r = l × 圆心角 ÷ 360°。</p>';
          row(box, button('再来一遍', () => { st.i = 0; show(); }, 'primary'));
          st.i = CONE_ROUNDS.length - 1;
          return;
        }
        const { l, deg: d } = CONE_ROUNDS[st.i];
        st.r = 1;
        st.f = 0;
        slider(box, { label: 'r', min: 0.5, max: Math.min(4, l - 0.5), step: 0.5, value: st.r, onChange: v => { st.r = v; fold.set(0); setMessage('', ''); showInfo(); } });
        fold = foldControl(box, { value: 0, onChange: v => { st.f = v; } });
        row(box, button('围起来', () => fold.animateTo(1)), button('确定', check, 'primary'));
        showInfo();
        requestDraw();
      }
      function showInfo() {
        const { l, deg: d } = CONE_ROUNDS[st.i];
        info.innerHTML =
          `<p>第 ${st.i + 1} / ${CONE_ROUNDS.length} 轮：扇形半径 <b>${l}</b>，圆心角 <b>${d}°</b></p>` +
          `<p>扇形的<span class="red">弧长</span> = ${d}/360 × 2π × ${l} = ?</p>` +
          `<p class="muted">现在的底面半径 r = ${num(st.r)}，底面周长 = ${piStr(2 * st.r)}</p>`;
        requestDraw();
      }
      function check() {
        const { l, deg: d } = CONE_ROUNDS[st.i];
        const need = l * d / 360;
        fold.animateTo(1);
        if (Math.abs(st.r - need) < 1e-9) {
          setMessage('ok', `正好合上！弧长 = ${piStr(2 * need)} = 底面周长 2π × ${num(need)}。`);
          box.querySelectorAll('button.primary').forEach(b => b.remove());
          row(box, button(st.i + 1 < CONE_ROUNDS.length ? '下一轮 →' : '完成', () => { st.i++; show(); }, 'primary'));
        } else if (st.r < need) {
          setMessage('fail', '底面太小了：扇形的弧比底面周长长，围起来会重叠。');
        } else {
          setMessage('fail', '底面太大了：扇形的弧不够长，围起来会留一条缝。');
        }
      }
      show();
      return {
        view: { yaw: -35, pitch: 20 },
        radius: () => { const { l } = CONE_ROUNDS[st.i]; return coneView(st.r, l, 1 - st.f).radius; },
        center: () => { const { l } = CONE_ROUNDS[st.i]; return coneView(st.r, l, 1 - st.f).center; },
        build: () => { const { l, deg: d } = CONE_ROUNDS[st.i]; return coneItems(st.r, l, deg(d), 1 - st.f); },
      };
    },

    // 3-1 长方体上的最短路
    boxPath() {
      const st = { a: 4, b: 2, c: 3, route: 0, f: 1 };
      const upd = () => { info.innerHTML = routeTable(st.a, st.b, st.c) + '<p class="muted">长度² 就是展开后直角三角形两条直角边的平方和（勾股定理）。</p>'; requestDraw(); };
      slider(controls, { label: '长', min: 1, max: 5, step: 1, value: st.a, onChange: v => { st.a = v; upd(); } });
      slider(controls, { label: '宽', min: 1, max: 5, step: 1, value: st.b, onChange: v => { st.b = v; upd(); } });
      slider(controls, { label: '高', min: 1, max: 5, step: 1, value: st.c, onChange: v => { st.c = v; upd(); } });
      const bs = choices(controls, ['走法 1', '走法 2', '走法 3'], i => {
        st.route = i;
        bs.forEach((b, j) => b.classList.toggle('on', j === i));
        requestDraw();
      }, ROUTE_COLORS);
      bs[0].classList.add('on');
      foldControl(controls, { value: st.f, onChange: v => { st.f = v; } });
      upd();
      markDone();
      return {
        view: { yaw: -35, pitch: 25 },
        radius: () => boxRadius(st.a, st.b, st.c),
        center: () => [st.a / 2, st.c / 2, st.b / 2],
        build: () => boxItems(st.a, st.b, st.c, { show: [st.route], unfold: st.route, t: 1 - st.f }),
      };
    },

    // 3-2 圆柱上的最短路
    cylinderPath() {
      const st = { r: 1, h: 4, turns: 0.5, f: 1 };
      slider(controls, { label: 'r', min: 0.5, max: 2, step: 0.5, value: st.r, onChange: v => { st.r = v; upd(); } });
      slider(controls, { label: 'h', min: 1, max: 8, step: 1, value: st.h, onChange: v => { st.h = v; upd(); } });
      const bs = choices(controls, ['半圈（到对面）', '绕一圈'], i => {
        st.turns = i ? 1 : 0.5;
        bs.forEach((b, j) => b.classList.toggle('on', j === i));
        upd();
      });
      bs[0].classList.add('on');
      foldControl(controls, { value: st.f, onChange: v => { st.f = v; } });
      function upd() {
        const { r, h, turns } = st;
        const w = 2 * r * turns;   // 水平方向走过的弧长是 w·π
        const L = Math.hypot(Math.PI * w, h);
        let html =
          `<p>展开后，路线是直角三角形的斜边：一条直角边是${turns === 1 ? '底面周长' : '底面周长的一半'} ${piStr(w)} ≈ ${num(Math.PI * w)}，另一条是高 ${num(h)}</p>` +
          `<p>最短路线长 = √((${piStr(w)})² + ${num(h)}²) ≈ <b>${num(L)}</b></p>`;
        if (turns === 0.5) {
          const alt = h + 2 * r;
          html += `<p class="muted">另一种走法：先竖直爬到顶，再沿上底面的直径走过去，长 h + 2r = ${num(alt)}。` +
            `${alt < L ? '这时它反而更短！圆柱又矮又粗时要注意比较。' : alt === L ? '两种一样长。' : '比沿侧面走长。'}</p>`;
        }
        info.innerHTML = html;
        requestDraw();
      }
      upd();
      markDone();
      return {
        view: { yaw: -20, pitch: 18 },
        radius: () => Math.max(Math.PI * st.r * 1.05, st.h / 2) + 0.4,
        center: () => G.lerp([0, st.h / 2, 0], [0, st.h / 2, -st.r], st.f),
        build: () => {
          const { r, h, turns } = st;
          const roll = 1 - st.f;
          const items = cylinderItems(r, h, 0.3 + 0.7 * roll, { caps: false, alpha: 0.55, rim: false });
          const { s0, s1 } = G.cylinderRoute(r, turns);
          const path = [];
          for (let k = 0; k <= 60; k++) {
            const s = s0 + (s1 - s0) * k / 60;
            path.push(G.cylinderPoint(r, s, h * k / 60, roll));
          }
          items.push({ line: path, color: RED, width: 3, top: true });
          items.push({ dot: path[0], label: 'A' }, { dot: path[path.length - 1], label: 'B' });
          return items;
        },
      };
    },

    // 3-3 猜最短
    boxQuiz() {
      const st = { i: 0, score: 0, answered: -1, f: 1 };
      const box = el('div');
      controls.appendChild(box);
      function show() {
        box.innerHTML = '';
        setMessage('', '');
        st.answered = -1;
        st.f = 1;
        if (st.i >= BOX_ROUNDS.length) {
          const pass = st.score === BOX_ROUNDS.length;
          if (pass) markDone();
          setMessage(pass ? 'ok' : 'fail', `答对 ${st.score} / ${BOX_ROUNDS.length} 轮。${pass ? '过关！' : '三轮全对才过关，再试一次。'}`);
          info.innerHTML = '<p><b>规律：</b>把最长的那条棱单独放，另外两条较短的棱加在一起，这样展开的走法最短。</p>';
          row(box, button('再来一遍', () => { st.i = 0; st.score = 0; show(); }, 'primary'));
          st.i = BOX_ROUNDS.length - 1;
          st.answered = -2;
          requestDraw();
          return;
        }
        const [a, b, c] = BOX_ROUNDS[st.i];
        info.innerHTML = `<p>第 ${st.i + 1} / ${BOX_ROUNDS.length} 轮：长 ${a}、宽 ${b}、高 ${c}。三条彩色路线，哪条最短？</p>`;
        choices(box, ['走法 1', '走法 2', '走法 3'], pick, ROUTE_COLORS);
        requestDraw();
      }
      function pick(k) {
        const [a, b, c] = BOX_ROUNDS[st.i];
        const sq = G.boxRoutes(a, b, c).map(r => r.sq);
        const best = sq.indexOf(Math.min(...sq));
        if (k === best) st.score++;
        st.answered = best;
        box.innerHTML = '';
        setMessage(k === best ? 'ok' : 'fail', k === best ? '答对了！' : `不对，最短的是走法 ${best + 1}。`);
        info.innerHTML = routeTable(a, b, c);
        const fold = foldControl(box, { value: 1, onChange: v => { st.f = v; } });
        fold.animateTo(0);
        row(box, button(st.i + 1 < BOX_ROUNDS.length ? '下一轮 →' : '看成绩', () => { st.i++; show(); }, 'primary'));
      }
      show();
      return {
        view: { yaw: -35, pitch: 25 },
        radius: () => boxRadius(...BOX_ROUNDS[st.i]),
        center: () => { const [a, b, c] = BOX_ROUNDS[st.i]; return [a / 2, c / 2, b / 2]; },
        build: () => {
          const [a, b, c] = BOX_ROUNDS[st.i];
          if (st.answered >= 0) return boxItems(a, b, c, { show: [st.answered], unfold: st.answered, t: 1 - st.f });
          return boxItems(a, b, c, { show: [0, 1, 2] });
        },
      };
    },

    // 4-1 自由切
    section() {
      const st = { yaw: 20, pitchIdx: 6, d: 0.3 };
      const shapeBox = el('div', 'shapebox');
      sectionSliders(st, upd);
      function upd() {
        const sec = G.cubeSection(st.n, st.d);
        const { name, sides } = G.classifySection(sec);
        info.innerHTML = '';
        info.appendChild(shapeBox);
        shapeBox.innerHTML = `<div><p>截面：<b>${name || '没切到正方体'}</b></p>${sides ? `<p class="muted">${sides} 条边，右边是它的实际形状（正对着看）</p>` : ''}</div>`;
        drawSectionShape(shapeBox, st.n, st.d);
      }
      upd();
      markDone();
      return sectionScene(() => st);
    },

    // 4-2 切出指定形状
    sectionTargets() {
      const st = { yaw: 20, pitchIdx: 6, d: 0.3 };
      const found = new Set();
      const chips = el('div', 'chips');
      controls.appendChild(chips);
      let moved = false;   // 初始位置切出的形状不算，动过滑块才开始计
      sectionSliders(st, () => { moved = true; upd(); });
      function upd() {
        const sec = G.cubeSection(st.n, st.d);
        const { name } = G.classifySection(sec);
        const hit = moved && SHAPE_TARGETS.find(t => sectionMatches(t, name) && !found.has(t));
        if (hit) {
          found.add(hit);
          if (found.size === SHAPE_TARGETS.length) { markDone(); setMessage('ok', '全部切出来了，过关！'); }
          else setMessage('ok', `切出了${hit}！`);
        }
        chips.innerHTML = SHAPE_TARGETS.map(t => `<span class="chip${found.has(t) ? ' got' : ''}">${found.has(t) ? '✓ ' : ''}${t}</span>`).join('');
        info.innerHTML = `<p>现在的截面：<b>${name || '没切到正方体'}</b></p>`;
      }
      upd();
      return sectionScene(() => st);
    },

    // 4-3 想一想
    sectionQuiz() {
      const st = { i: 0, score: 0, answered: false };
      const box = el('div');
      controls.appendChild(box);
      function show() {
        box.innerHTML = '';
        setMessage('', '');
        st.answered = false;
        if (st.i >= SECTION_QUIZ.length) {
          markDone();
          setMessage('ok', `答对 ${st.score} / ${SECTION_QUIZ.length} 题，完成！`);
          info.innerHTML = '<p><b>小结：</b>正方体的截面可以是三角形（只能是锐角三角形）、四边形、五边形、六边形，最多六条边。</p>';
          row(box, button('再来一遍', () => { st.i = 0; st.score = 0; show(); }, 'primary'));
          st.i = SECTION_QUIZ.length - 1;
          st.answered = true;
          requestDraw();
          return;
        }
        info.innerHTML = `<p>第 ${st.i + 1} / ${SECTION_QUIZ.length} 题：用一个平面去切正方体，<b>${SECTION_QUIZ[st.i].q}</b></p>`;
        choices(box, ['能', '不能'], pick);
        requestDraw();
      }
      function pick(k) {
        const q = SECTION_QUIZ[st.i];
        const right = (k === 0) === q.answer;
        if (right) st.score++;
        st.answered = true;
        box.innerHTML = '';
        setMessage(right ? 'ok' : 'fail', (right ? '答对了！' : '不对。') + (q.answer ? '能切出来。' : '切不出来。'));
        info.innerHTML = `<p><b>${q.q}</b></p><p>${q.why}</p><p class="muted">图中是一个${q.demoName}截面。</p>`;
        row(box, button(st.i + 1 < SECTION_QUIZ.length ? '下一题 →' : '完成', () => { st.i++; show(); }, 'primary'));
        requestDraw();
      }
      show();
      return sectionScene(() => {
        const q = SECTION_QUIZ[st.i];
        return st.answered ? { n: G.sectionNormal(q.demo[0], q.demo[1]), d: q.demo[2] } : {};
      });
    },
  };

  // ---------- 导航 ----------
  function renderNav() {
    const chap = level.id.split('-')[0];
    $('chapters').innerHTML = '';
    CHAPTERS.forEach(ch => {
      const lv = LEVELS.filter(l => l.id.startsWith(ch.no + '-'));
      const all = lv.every(l => store.done.has(l.id));
      const b = button(`${ch.no}. ${ch.short}${all ? ' ✓' : ''}`, () => { location.hash = '#' + lv[0].id; });
      if (ch.no === chap) b.classList.add('current');
      $('chapters').appendChild(b);
    });
    $('levels').innerHTML = '';
    LEVELS.filter(l => l.id.startsWith(chap + '-')).forEach(l => {
      const b = button(`${l.challenge ? '★ ' : ''}${l.title}${store.done.has(l.id) ? ' ✓' : ''}`, () => { location.hash = '#' + l.id; });
      if (store.done.has(l.id)) b.classList.add('done');
      if (l.id === level.id) b.classList.add('current');
      $('levels').appendChild(b);
    });
    const ch = CHAPTERS.find(c => c.no === chap);
    $('title').textContent = `第 ${ch.no} 章 · ${ch.title}`;
  }

  function loadLevel(id) {
    stopTween();
    level = LEVELS.find(l => l.id === id) || LEVELS[0];
    renderNav();
    $('hint').textContent = `${level.id} ${level.title}：${level.hint}`;
    controls.innerHTML = '';
    info.innerHTML = '';
    setMessage('', '');
    scene = level.setup(setups);
    resetView();
  }

  window.addEventListener('hashchange', () => loadLevel(location.hash.slice(1)));
  window.addEventListener('resize', requestDraw);
  loadLevel(location.hash.slice(1) || LEVELS[0].id);
}

if (typeof document !== 'undefined') initUI();
if (typeof module !== 'undefined') {
  module.exports = { LEVELS, NET_QUIZ, OPPOSITE_QUIZ, CONE_ROUNDS, BOX_ROUNDS, SHAPE_TARGETS, SECTION_QUIZ, sectionMatches };
}
