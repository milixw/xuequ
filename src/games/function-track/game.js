'use strict';

// ---------- 常量（单位都是坐标系单位） ----------
const VIEW = 6;              // 画面显示 x、y ∈ [-6, 6]
const BALL_R = 0.2;          // 小球半径，用于撞墙判定
const STAR_R = 0.35;         // 离星星多近算吃到
const GOAL_TOL = 0.3;        // 终点处 y 允许的误差
const STEPS_PER_UNIT = 100;  // 模拟时每个单位 x 采样多少个点
const SPEED = 5;             // 动画速度（每秒走多少单位路程）

// ---------- 函数类型 ----------
const TYPES = {
  linear: {
    template: '一次函数  y = kx + b',
    params: {
      k: { min: -3, max: 3, step: 0.5 },
      b: { min: -5, max: 5, step: 1 },
    },
    f: (p, x) => p.k * x + p.b,
    format: p => 'y = ' + joinTerms(coefTerm(p.k, 'x'), p.b),
  },
  quadratic: {
    template: '二次函数（顶点式）  y = a(x − h)² + k',
    params: {
      a: { min: -2, max: 2, step: 0.25 },
      h: { min: -4, max: 4, step: 0.5 },
      k: { min: -5, max: 5, step: 0.5 },
    },
    f: (p, x) => p.a * (x - p.h) ** 2 + p.k,
    format: p => {
      const sq = p.h === 0 ? 'x²' : `(x ${p.h > 0 ? '−' : '+'} ${num(Math.abs(p.h))})²`;
      return 'y = ' + joinTerms(coefTerm(p.a, sq), p.k);
    },
  },
};

function num(v) {
  return String(Number(v.toFixed(2))).replace('-', '−');
}

// 系数 × 项，处理 1、-1、0 的写法
function coefTerm(c, body) {
  if (c === 0) return '';
  if (c === 1) return body;
  if (c === -1) return '−' + body;
  return num(c) + body;
}

// 主项 + 常数项
function joinTerms(lead, c) {
  if (!lead) return num(c);
  if (c === 0) return lead;
  return `${lead} ${c > 0 ? '+' : '−'} ${num(Math.abs(c))}`;
}

// ---------- 关卡 ----------
// start：小球出发的 x；小球沿函数图像从 start 走到 goal.x
// 过关条件：一路不出界、不撞墙，吃到所有星星，并在 goal.x 处落在终点上
const LEVELS = [
  {
    type: 'linear',
    title: '认识截距 b',
    hint: '直线 y = x + b 的倾斜程度固定不变。调整 b，让小球吃到星星并到达终点旗帜。',
    learn: 'b 决定直线和 y 轴交在哪里：交点就是 (0, b)。b 变大，整条直线向上平移。',
    start: -3,
    goal: { x: 3, y: 1 },
    stars: [{ x: 0, y: -2 }],
    walls: [],
    init: { k: 1, b: 0 },
    locked: ['k'],
    solution: { k: 1, b: -2 },
  },
  {
    type: 'linear',
    title: '认识斜率 k',
    hint: '这次 b 固定为 0，直线总是经过原点。调整 k 改变直线的倾斜程度。',
    learn: 'k 表示 x 每增加 1，y 变化多少。k = 0.5 就是每向右走 2 格，向上走 1 格。',
    start: -5,
    goal: { x: 4, y: 2 },
    stars: [{ x: 2, y: 1 }],
    walls: [],
    init: { k: 1, b: 0 },
    locked: ['b'],
    solution: { k: 0.5, b: 0 },
  },
  {
    type: 'linear',
    title: 'k 也可以是负数',
    hint: 'k 和 b 都能调了。星星在 y 轴上，先想想 b 应该是多少。',
    learn: 'k < 0 时，直线从左上往右下走。两点确定一条直线：先用 y 轴上的点得出 b，再算 k。',
    start: -2,
    goal: { x: 4, y: -1 },
    stars: [{ x: 0, y: 3 }],
    walls: [],
    init: { k: 1, b: 0 },
    locked: [],
    solution: { k: -1, b: 3 },
  },
  {
    type: 'linear',
    title: '穿过缝隙',
    hint: '经过终点的直线有很多条，找出能从两块障碍物中间穿过去的那一条。',
    learn: '经过 (4, 3) 的直线都满足 3 = 4k + b。再加上“穿过缝隙”这个条件，就只剩下一条了。',
    start: -5,
    goal: { x: 4, y: 3 },
    stars: [],
    walls: [
      { x1: -1, x2: 1, y1: -6, y2: 0 },
      { x1: -1, x2: 1, y1: 3, y2: 6 },
    ],
    init: { k: 1, b: 0 },
    locked: [],
    solution: { k: 0.5, b: 1 },
  },
  {
    type: 'quadratic',
    title: '抛物线登场',
    hint: 'y = a(x − h)² + k 的顶点是 (h, k)。这里顶点固定在 (0, 4)，调整 a 让小球落到终点。',
    learn: 'a < 0 时抛物线开口向下，a > 0 时开口向上；|a| 越大，开口越窄。',
    start: -4,
    goal: { x: 4, y: -4 },
    stars: [{ x: -2, y: 2 }, { x: 2, y: 2 }],
    walls: [],
    init: { a: 0.25, h: 0, k: 4 },
    locked: ['h', 'k'],
    solution: { a: -0.5, h: 0, k: 4 },
  },
  {
    type: 'quadratic',
    title: '跳过高墙',
    hint: '三个参数都能调了。先把抛物线的顶点移到星星的位置，再调整 a。',
    learn: '顶点式能直接看出顶点 (h, k)。注意括号里是减号：h = 1 时写成 (x − 1)²，抛物线向右平移。',
    start: -3,
    goal: { x: 5, y: -3 },
    stars: [{ x: 1, y: 5 }],
    walls: [{ x1: 0.5, x2: 1.5, y1: -6, y2: 2 }],
    init: { a: 0.5, h: 0, k: -3 },
    locked: [],
    solution: { a: -0.5, h: 1, k: 5 },
  },
];

// ---------- 模拟 ----------
function hitsWall(x, y, w) {
  const cx = Math.min(Math.max(x, w.x1), w.x2);
  const cy = Math.min(Math.max(y, w.y1), w.y2);
  return (x - cx) ** 2 + (y - cy) ** 2 < BALL_R ** 2;
}

// 返回 { ok, crashed, msg, pts: 小球实际走过的点, starAt: 每颗星在第几个点被吃到（-1 为没吃到） }
function simulate(level, p) {
  const f = TYPES[level.type].f;
  const { start, goal } = level;
  const n = Math.round((goal.x - start) * STEPS_PER_UNIT);
  const pts = [];
  const starAt = level.stars.map(() => -1);
  const fail = (msg, crashed) => ({ ok: false, crashed, msg, pts, starAt });

  for (let i = 0; i <= n; i++) {
    const x = start + (goal.x - start) * i / n;
    const y = f(p, x);
    if (Math.abs(y) > VIEW) {
      return fail(`小球飞出了画面：x = ${num(x)} 时，y = ${num(y)}`, true);
    }
    pts.push({ x, y });
    if (level.walls.some(w => hitsWall(x, y, w))) {
      return fail(`撞到障碍物了（x ≈ ${num(x)}）`, true);
    }
    level.stars.forEach((s, j) => {
      if (starAt[j] < 0 && Math.hypot(x - s.x, y - s.y) < STAR_R) starAt[j] = i;
    });
  }

  const yEnd = pts[n].y;
  if (Math.abs(yEnd - goal.y) > GOAL_TOL) {
    return fail(`没到终点：x = ${num(goal.x)} 时 y = ${num(yEnd)}，终点在 y = ${num(goal.y)}`, false);
  }
  const missed = starAt.filter(i => i < 0).length;
  if (missed) return fail(`到达了终点，但还有 ${missed} 颗星星没吃到`, false);
  return { ok: true, crashed: false, msg: '', pts, starAt };
}

// ---------- 界面 ----------
function initUI() {
  const $ = id => document.getElementById(id);
  const canvas = $('board');
  const ctx = canvas.getContext('2d');

  let levelIdx = 0;
  let params = {};
  let result = null;  // 上一次发射的结果（动画结束后）
  let anim = null;    // 正在播放的动画
  let cleared = loadProgress();
  let S = 0;          // 画布边长（CSS 像素）
  let dpr = 1;

  function loadProgress() {
    try {
      return Math.min(Number(localStorage.getItem('fg-cleared')) || 0, LEVELS.length);
    } catch {
      return 0;
    }
  }

  function saveProgress() {
    try { localStorage.setItem('fg-cleared', String(cleared)); } catch {}
  }

  function loadLevel(i) {
    const lv = LEVELS[i];
    levelIdx = i;
    params = { ...lv.init };
    $('title').textContent = `第 ${i + 1} 关 · ${lv.title}`;
    $('hint').textContent = lv.hint;
    $('template').textContent = TYPES[lv.type].template;
    $('next').hidden = !(i < cleared && i < LEVELS.length - 1);
    buildParams(lv);
    renderLevels();
    clearResult();
  }

  function clearResult() {
    result = null;
    anim = null;
    setMessage('', '');
    refresh();
  }

  function buildParams(lv) {
    const box = $('params');
    box.innerHTML = '';
    for (const [key, spec] of Object.entries(TYPES[lv.type].params)) {
      const row = document.createElement('div');
      if (lv.locked.includes(key)) {
        row.className = 'param locked';
        row.textContent = `${key} = ${num(params[key])}（本关固定）`;
        box.appendChild(row);
        continue;
      }
      row.className = 'param';
      row.innerHTML =
        `<span class="name">${key}</span>` +
        `<button type="button" aria-label="减小 ${key}">−</button>` +
        `<input type="range" min="${spec.min}" max="${spec.max}" step="${spec.step}">` +
        `<button type="button" aria-label="增大 ${key}">+</button>` +
        `<span class="val"></span>`;
      const [minus, plus] = row.querySelectorAll('button');
      const range = row.querySelector('input');
      const val = row.querySelector('.val');
      const show = () => {
        range.value = params[key];
        val.textContent = num(params[key]);
      };
      const set = v => {
        const snapped = Math.round(v / spec.step) * spec.step;
        params[key] = Math.min(spec.max, Math.max(spec.min, snapped));
        show();
        clearResult();
      };
      range.addEventListener('input', () => set(parseFloat(range.value)));
      minus.addEventListener('click', () => set(params[key] - spec.step));
      plus.addEventListener('click', () => set(params[key] + spec.step));
      show();
      box.appendChild(row);
    }
  }

  function renderLevels() {
    const nav = $('levels');
    nav.innerHTML = '';
    LEVELS.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = i + 1;
      b.disabled = i > cleared;
      if (i < cleared) b.classList.add('done');
      if (i === levelIdx) b.classList.add('current');
      b.addEventListener('click', () => loadLevel(i));
      nav.appendChild(b);
    });
  }

  function setMessage(kind, text) {
    const el = $('message');
    el.className = kind;
    el.textContent = text;
  }

  function refresh() {
    $('formula').textContent = TYPES[LEVELS[levelIdx].type].format(params);
    draw();
  }

  function launch() {
    if (anim) return;
    const res = simulate(LEVELS[levelIdx], params);
    // 每个点处累计走过的路程，用来让小球匀速运动
    const dist = [];
    res.pts.forEach((pt, i) => {
      dist.push(i === 0 ? 0 : dist[i - 1] + Math.hypot(pt.x - res.pts[i - 1].x, pt.y - res.pts[i - 1].y));
    });
    result = null;
    setMessage('', '');
    const a = { res, dist, idx: 0, t0: performance.now() };
    anim = a;
    requestAnimationFrame(function frame(now) {
      if (anim !== a) return;  // 动画被参数调整或切关打断
      const d = (now - a.t0) / 1000 * SPEED;
      while (a.idx < dist.length - 1 && dist[a.idx + 1] <= d) a.idx++;
      if (a.idx >= dist.length - 1) {
        anim = null;
        finish(res);
        return;
      }
      draw();
      requestAnimationFrame(frame);
    });
  }

  function finish(res) {
    result = res;
    if (res.ok) {
      const last = levelIdx === LEVELS.length - 1;
      if (levelIdx + 1 > cleared) {
        cleared = levelIdx + 1;
        saveProgress();
      }
      setMessage('ok', `${last ? '🎉 全部通关！' : '✓ 过关！'}${LEVELS[levelIdx].learn}`);
      $('next').hidden = last;
      renderLevels();
    } else {
      setMessage('fail', res.msg);
    }
    draw();
  }

  // ---------- 绘制 ----------
  const X = x => (x + VIEW) / (2 * VIEW) * S;
  const Y = y => (VIEW - y) / (2 * VIEW) * S;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    S = canvas.clientWidth;
    canvas.width = Math.round(S * dpr);
    canvas.height = Math.round(S * dpr);
    draw();
  }

  function draw() {
    if (!S) return;
    const lv = LEVELS[levelIdx];
    const f = x => TYPES[lv.type].f(params, x);
    const unit = S / (2 * VIEW);

    // 当前要展示的模拟结果：动画中取动画进度，结束后取最终位置
    const cur = anim ? anim.res : result;
    const idx = anim ? anim.idx : (result ? result.pts.length - 1 : -1);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, S, S);
    drawGrid();
    lv.walls.forEach(w => {
      ctx.fillStyle = '#8a7f6e';
      ctx.fillRect(X(w.x1), Y(w.y2), X(w.x2) - X(w.x1), Y(w.y1) - Y(w.y2));
    });
    drawCurve(f, lv);
    drawGoal(lv.goal, unit);
    lv.stars.forEach((s, j) => {
      const got = cur && cur.starAt[j] >= 0 && cur.starAt[j] <= idx;
      drawStar(s, unit, got);
    });

    let ball = cur && idx >= 0 ? cur.pts[idx] : null;
    if (!cur) {
      const y0 = f(lv.start);
      if (Math.abs(y0) <= VIEW) ball = { x: lv.start, y: y0 };
    }
    if (ball) drawBall(ball, unit, !anim && result && result.crashed);
  }

  function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawGrid() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ece6d8';
    for (let i = -VIEW; i <= VIEW; i++) {
      line(X(i), 0, X(i), S);
      line(0, Y(i), S, Y(i));
    }
    ctx.strokeStyle = '#9a9486';
    line(X(0), 0, X(0), S);
    line(0, Y(0), S, Y(0));

    ctx.fillStyle = '#a09a8c';
    ctx.font = '11px -apple-system, sans-serif';
    for (let i = -VIEW + 2; i < VIEW; i += 2) {
      if (i === 0) continue;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(num(i), X(i), Y(0) + 3);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(num(i), X(0) - 4, Y(i));
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('O', X(0) - 4, Y(0) + 3);
    ctx.font = 'italic 13px "Times New Roman", serif';
    ctx.fillText('x', S - 4, Y(0) + 3);
    ctx.textAlign = 'left';
    ctx.fillText('y', X(0) + 5, 3);
  }

  // 把函数图像在 [x0, x1] 上的部分加入路径，跳过远离画面的点
  function tracePath(f, x0, x1) {
    ctx.beginPath();
    const n = Math.ceil((x1 - x0) * 40);
    let pen = false;
    for (let i = 0; i <= n; i++) {
      const x = x0 + (x1 - x0) * i / n;
      const y = f(x);
      if (Math.abs(y) > VIEW + 2) {
        pen = false;
        continue;
      }
      if (pen) ctx.lineTo(X(x), Y(y));
      else ctx.moveTo(X(x), Y(y));
      pen = true;
    }
  }

  function drawCurve(f, lv) {
    // 完整的函数图像画虚线，小球要走的那一段画实线
    ctx.save();
    ctx.setLineDash([6, 5]);
    ctx.strokeStyle = 'rgba(47, 111, 214, .45)';
    ctx.lineWidth = 2;
    tracePath(f, -VIEW, VIEW);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = '#2f6fd6';
    ctx.lineWidth = 3;
    tracePath(f, lv.start, lv.goal.x);
    ctx.stroke();
  }

  function label(pt, dy) {
    const nearRight = pt.x > VIEW - 1.5;
    ctx.fillStyle = '#6b6457';
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = nearRight ? 'right' : 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(`(${num(pt.x)}, ${num(pt.y)})`, X(pt.x) + (nearRight ? -10 : 10), Y(pt.y) + dy);
  }

  function drawGoal(g, unit) {
    const gx = X(g.x), gy = Y(g.y);
    ctx.fillStyle = 'rgba(70, 170, 90, .25)';
    ctx.beginPath();
    ctx.arc(gx, gy, GOAL_TOL * unit, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3b3b3b';
    ctx.lineWidth = 2;
    line(gx, gy, gx, gy - unit * 0.9);
    ctx.fillStyle = '#d9443a';
    ctx.beginPath();
    ctx.moveTo(gx, gy - unit * 0.9);
    ctx.lineTo(gx + unit * 0.55, gy - unit * 0.72);
    ctx.lineTo(gx, gy - unit * 0.54);
    ctx.closePath();
    ctx.fill();
    label(g, 12);
  }

  function drawStar(s, unit, got) {
    const cx = X(s.x), cy = Y(s.y);
    const R = unit * 0.32, r = R * 0.45;
    ctx.save();
    ctx.globalAlpha = got ? 0.25 : 1;
    ctx.fillStyle = '#f2b632';
    ctx.strokeStyle = '#b8800f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 ? r : R;
      const ang = -Math.PI / 2 + i * Math.PI / 5;
      ctx.lineTo(cx + rad * Math.cos(ang), cy + rad * Math.sin(ang));
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    label(s, -12);
  }

  function drawBall(b, unit, crashed) {
    const bx = X(b.x), by = Y(b.y), r = BALL_R * unit;
    ctx.fillStyle = crashed ? '#c0392b' : '#f08a24';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (crashed) {
      ctx.strokeStyle = '#c0392b';
      ctx.lineWidth = 3;
      const d = r * 2;
      line(bx - d, by - d, bx + d, by + d);
      line(bx - d, by + d, bx + d, by - d);
    }
  }

  $('launch').addEventListener('click', launch);
  $('reset').addEventListener('click', () => loadLevel(levelIdx));
  $('next').addEventListener('click', () => loadLevel(levelIdx + 1));
  window.addEventListener('resize', resize);

  loadLevel(Math.min(cleared, LEVELS.length - 1));
  resize();
}

if (typeof document !== 'undefined') initUI();
if (typeof module !== 'undefined') module.exports = { TYPES, LEVELS, simulate };
