'use strict';

// 题目演示动画：题目里写 demo: { type: 'foldCut', folds: 2 }，在解析里显示。依赖 DOM。
// 每种演示是一个函数 (container, opts)，用 shell() 搭好画布和按钮，用 phases 描述时间轴。

(function (root) {
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
  const clamp01 = t => Math.max(0, Math.min(1, t));
  const minus = v => String(v).replace('-', '−');
  const ROPE = '#a8743a';
  const RED = '#c0513a', BLUE = '#2f6fd6', GREEN = '#3f9a5a', INK = '#2b2b2b', MUTED = '#7a7366';

  // 按时间轴依次处理每个阶段：已结束的阶段 f=1，当前阶段 0<f<1，之后的不处理
  function walk(phases, ms, fn) {
    let t = ms;
    for (const p of phases) {
      fn(p, clamp01(t / p.dur));
      if (t < p.dur) return;
      t -= p.dur;
    }
  }
  const totalOf = phases => phases.reduce((s, p) => s + p.dur, 0);

  // 公共外壳：画布 + 说明文字 + 自定义控件 + 播放/暂停、重播、慢放按钮
  // frame(ms) 画出某一时刻；duration() 返回总时长
  function shell(container, { w, h, aria, controls = '' }) {
    const box = document.createElement('div');
    box.className = 'demo';
    box.innerHTML =
      `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}"></svg>` +
      '<div class="demo-caption"></div>' +
      `<div class="demo-controls">${controls}` +
      '<span class="demo-row"><button type="button" class="demo-play"></button>' +
      '<button type="button" class="demo-replay" hidden>↻ 重播</button>' +
      '<button type="button" class="demo-speed" aria-pressed="false">0.5× 慢放</button></span></div>';
    container.appendChild(box);
    const play = box.querySelector('.demo-play');
    const replay = box.querySelector('.demo-replay');
    const speedBtn = box.querySelector('.demo-speed');
    const s = {
      box,
      svg: box.querySelector('svg'),
      caption: box.querySelector('.demo-caption'),
      frame: () => {},
      duration: () => 0,
    };
    let raf = 0, at = 0, last = 0, speed = 1, mode = 'idle';   // idle 未开始 / playing / paused / done
    const label = { idle: '▶ 播放', playing: '⏸ 暂停', paused: '▶ 继续', done: '▶ 播放' };
    const setMode = m => {
      mode = m;
      play.textContent = label[m];
      replay.hidden = m === 'idle' || m === 'done';
    };
    const tick = now => {
      at += (now - last) * speed;
      last = now;
      const end = s.duration();
      s.frame(Math.min(at, end));
      if (at < end) raf = requestAnimationFrame(tick);
      else setMode('done');
    };
    const run = () => {
      last = performance.now();
      setMode('playing');
      raf = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(raf);
      at = 0;
      run();
    };
    play.addEventListener('click', () => {
      if (mode === 'playing') {
        cancelAnimationFrame(raf);
        setMode('paused');
      } else if (mode === 'paused') run();
      else restart();
    });
    replay.addEventListener('click', restart);
    // 慢放：可以在播放中途切换，从当前画面接着按新速度走
    speedBtn.addEventListener('click', () => {
      speed = speed === 1 ? 0.5 : 1;
      speedBtn.classList.toggle('on', speed !== 1);
      speedBtn.setAttribute('aria-pressed', String(speed !== 1));
    });
    // 参数改变后回到开头
    s.reset = () => {
      cancelAnimationFrame(raf);
      at = 0;
      setMode('idle');
    };
    s.reset();
    return s;
  }

  // 一组数字按钮（.seg），点选后回调
  function segButtons(seg, values, current, onPick) {
    const mark = v => seg.querySelectorAll('button').forEach((b, i) => b.classList.toggle('selected', values[i] === v));
    values.forEach((v, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = String(v);
      b.addEventListener('click', () => {
        mark(v);
        onPick(v, i);
      });
      seg.appendChild(b);
    });
    mark(current);
  }

  // ---------- 绳子（或纸条）对折，可选剪一刀 ----------
  // 原绳放在 [0, 1] 上。每次对折把右半边翻到左半边上面，左端 X=0 始终是两个绳头所在的一端。
  // opts：folds 默认对折次数；cut 为 false 时只对折不剪（纸的对折）；thickness 每层厚度（毫米），给出时说明里显示总厚度
  const FC_W = 320, FC_H = 150, FC_MARGIN = 40, FC_D = FC_W - 2 * FC_MARGIN;
  const FC_BASE = 118;      // 最底层的纵坐标
  const FC_ARC = 110;       // 翻折时弧线的高度系数
  const FC_ZOOM = [1, 1.6, 2.4, 3.2, 4];
  const FC_SPREAD = 8;      // 展开后每段之间拉开的距离（px）

  // 原绳上的点 x，在“完成 k 次对折、第 k+1 次对折转到角度 th”时的位置（X 为绳长单位，Y 为 px）
  function place(x, k, th, gap) {
    let X = x, Y = 0;
    const fold = (j, angle) => {
      const p = 1 / 2 ** (j + 1);
      if (X <= p) return;
      const yc = -(2 ** j - 0.5) * gap;
      const dx = X - p, c = Math.cos(angle), s = Math.sin(angle);
      X = p + dx * c;
      Y = yc + (Y - yc) * c - s * dx * FC_ARC;
    };
    for (let j = 0; j < k; j++) fold(j, Math.PI);
    if (th) fold(k, th);
    return [X, Y];
  }

  // 对折 n 次后在离绳头端 u 处（折叠后的横坐标）剪一刀，原绳上的剪断位置
  function cutPoints(n, u) {
    const p = 2 / 2 ** n, r = [];
    for (let k = 0; k < 2 ** n; k++) {
      const base = p * Math.floor(k / 2);
      r.push(k % 2 ? base + p - u : base + u);
    }
    return r.sort((a, b) => a - b);
  }

  // 折痕处相邻两点几乎上下对齐：补一段向外鼓的半圆，半径是两层间距的一半。
  // 这样折了几次以后，外层折痕包住内层折痕，能看出哪一层连着哪一层
  function bends(pts) {
    const out = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
      const dy = y2 - y1;
      if (Math.abs(dy) > 1 && Math.abs(dy) > 2 * Math.abs(x2 - x1)) {
        // 往绳子原来前进的方向鼓出去
        const ref = i >= 2 ? x1 - pts[i - 2][0] : x2 - pts[Math.min(i + 1, pts.length - 1)][0];
        const dir = ref >= 0 ? 1 : -1;
        const r = Math.abs(dy) / 2;
        for (let t = 1; t < 12; t++) {
          const a = Math.PI * t / 12;
          out.push([lerp(x1, x2, t / 12) + dir * r * Math.sin(a), (y1 + y2) / 2 - (dy / 2) * Math.cos(a)]);
        }
      }
      out.push(pts[i]);
    }
    return out.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  }

  function foldCut(container, opts) {
    const cutting = opts.cut !== false;
    const counts = cutting ? [1, 2, 3] : [1, 2, 3, 4];
    let folds = opts.folds || 2;
    let pos = 0.4;          // 剪的位置：折叠后宽度的比例（从绳头端量起）

    const s = shell(container, {
      w: FC_W,
      h: FC_H,
      aria: cutting ? '绳子对折后剪一刀的演示' : '纸条对折的演示',
      controls:
        '<span class="demo-row"><span>对折</span><span class="seg"></span><span>次</span></span>' +
        (cutting ? '<label class="demo-row"><span>剪的位置</span><input type="range" min="0.1" max="0.9" step="0.05"></label>' : ''),
    });
    segButtons(s.box.querySelector('.seg'), counts, folds, v => {
      folds = v;
      reset();
    });
    if (cutting) {
      const range = s.box.querySelector('input');
      range.value = pos;
      range.addEventListener('input', () => {
        pos = Number(range.value);
        reset();
      });
    }

    // 时间轴：逐次对折 →（剪刀落下 → 剪口张开 → 逐次展开 → 各段拉开并着色）
    const phases = () => {
      const list = [];
      for (let j = 0; j < folds; j++) list.push({ kind: 'fold', j, dur: 900 }, { kind: 'wait', dur: 250 });
      if (!cutting) return list;
      list.push({ kind: 'cut', dur: 900 }, { kind: 'open', dur: 300 }, { kind: 'wait', dur: 250 });
      for (let j = folds - 1; j >= 0; j--) list.push({ kind: 'unfold', j, dur: 800 });
      list.push({ kind: 'spread', dur: 600 });
      return list;
    };
    const layerNote = n => {
      const t = opts.thickness ? `，厚 ${Math.round(opts.thickness * 2 ** n * 1000) / 1000} 毫米` : '';
      return `${2 ** n} 层${t}`;
    };

    function stateAt(ms) {
      const st = { k: 0, th: 0, cut: false, blade: 0, gap: 0, spread: 0, caption: '' };
      walk(phases(), ms, (p, f) => {
        if (p.kind === 'fold') {
          st.k = f < 1 ? p.j : p.j + 1;
          st.th = f < 1 ? Math.PI * ease(f) : 0;
          st.caption = `第 ${p.j + 1} 次对折：变成 ${layerNote(p.j + 1)}`;
        } else if (p.kind === 'cut') {
          st.blade = ease(f);
          st.cut = f >= 0.6;
          st.caption = `垂直剪一刀，${2 ** folds} 层同时剪断`;
        } else if (p.kind === 'open') {
          st.blade = 1 - f;
          st.gap = ease(f);
        } else if (p.kind === 'unfold') {
          st.k = p.j;
          st.th = Math.PI * (1 - ease(f));
          st.caption = '把绳子展开';
        } else if (p.kind === 'spread') {
          st.spread = ease(f);
          st.caption = `剪断 ${2 ** folds} 处，绳子变成 ${2 ** folds + 1} 段（同色的段一样长）`;
        }
      });
      return st;
    }

    function reset() {
      s.reset();
      draw({ k: 0, th: 0, cut: false, blade: 0, gap: 0, spread: 0,
        caption: cutting ? '点「播放」，看绳子对折后剪一刀会变成几段' : '点「播放」，看纸条每对折一次层数怎么变' });
    }

    function draw(st) {
      const n = folds;
      const gap = n >= 4 ? 5 : 7;   // 层与层的间距（px）
      const u = pos / 2 ** n;
      // 视图缩放：对折过程中逐步放大，折好的一叠始终居中
      const kk = st.k + (st.th ? st.th / Math.PI : 0);
      const i0 = Math.floor(kk);
      const z = lerp(FC_ZOOM[i0], FC_ZOOM[Math.min(FC_ZOOM.length - 1, i0 + 1)], kk - i0);
      const off = FC_MARGIN + (FC_D - FC_D * z / 2 ** kk) / 2;
      const sx = X => off + X * FC_D * z;

      // 按剪断位置把绳子分段（没剪时是一整段）
      const bounds = [0, ...(st.cut ? cutPoints(n, u) : []), 1];
      const shortest = Math.min(...bounds.slice(1).map((b, i) => b - bounds[i]));
      const g = st.gap * Math.min(0.012, shortest / 4);   // 剪口张开的宽度，不能把短段吃掉
      const pieces = [];
      for (let i = 0; i + 1 < bounds.length; i++) {
        const a = bounds[i] + (i > 0 ? g : 0), b = bounds[i + 1] - (i + 2 < bounds.length ? g : 0);
        pieces.push({ a, b, len: bounds[i + 1] - bounds[i] });
      }
      // 长度相同的段同色
      const kinds = [];
      pieces.forEach(p => {
        let c = kinds.findIndex(L => Math.abs(L - p.len) < 1e-9);
        if (c < 0) c = kinds.push(p.len) - 1;
        p.color = [RED, BLUE, GREEN][c % 3];
      });

      const stroke = cutting ? ROPE : '#7d8fa6';
      let html = '';
      pieces.forEach((p, i) => {
        const shift = (i - (pieces.length - 1) / 2) * FC_SPREAD * st.spread;
        const pts = [];
        const add = x => {
          const [X, Y] = place(x, st.k, st.th, gap);
          pts.push([sx(X) + shift, FC_BASE + Y]);
        };
        add(p.a);
        for (let j = Math.floor(p.a * 512) + 1; j / 512 < p.b; j++) add(j / 512);
        add(p.b);
        const color = st.spread ? mix(stroke, p.color, st.spread) : stroke;
        html += `<polyline points="${bends(pts)}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
      });
      // 两个端头
      if (!st.spread) {
        [0, 1].forEach(x => {
          const [X, Y] = place(x, st.k, st.th, gap);
          html += `<circle cx="${sx(X).toFixed(1)}" cy="${(FC_BASE + Y).toFixed(1)}" r="3.5" fill="#5b3a17"/>`;
        });
      }
      // 剪刀：从上往下划过整叠绳子，剪口处留一条虚线
      if (st.blade > 0) {
        const X = sx(u);
        const top = FC_BASE - (2 ** n - 1) * gap - 14;
        const y = lerp(top, FC_BASE + 12, st.blade);
        const open = st.cut ? 0.3 : 1;   // 剪断后刀口合上
        html += `<line x1="${X}" y1="${top}" x2="${X}" y2="${y}" stroke="#b23a2b" stroke-width="1.5" stroke-dasharray="4 3"/>`;
        html += `<g stroke="#b23a2b" stroke-width="2.5" stroke-linecap="round" fill="none">` +
          `<line x1="${X - 9 * open}" y1="${y}" x2="${X + 6}" y2="${y - 26}"/>` +
          `<line x1="${X + 9 * open}" y1="${y}" x2="${X - 6}" y2="${y - 26}"/>` +
          `<circle cx="${X + 8}" cy="${y - 31}" r="4.5"/><circle cx="${X - 8}" cy="${y - 31}" r="4.5"/></g>`;
      }
      s.svg.innerHTML = html;
      s.caption.textContent = st.caption;
    }

    s.frame = ms => draw(stateAt(ms));
    s.duration = () => totalOf(phases());
    reset();
    return s;
  }

  // ---------- 数轴沿点 P 折叠 ----------
  // P 左边的部分翻到右边上方。opts：a 被折的点，b 参照点，d 题目给的距离，probe 第 (2) 问要看的点，min/max 可选的 P
  const NL_W = 320, NL_H = 140, NL_LO = -8, NL_HI = 12, NL_Y = 100;
  function numberLineFold(container, opts) {
    const { a, b, d, probe } = opts;
    let P = opts.p0 != null ? opts.p0 : 0;
    const s = shell(container, {
      w: NL_W,
      h: NL_H,
      aria: '数轴沿点 P 折叠的演示',
      controls: `<label class="demo-row"><span>折痕 P</span><input type="range" min="${opts.min}" max="${opts.max}" step="1"><b class="demo-val"></b></label>`,
    });
    const range = s.box.querySelector('input');
    const val = s.box.querySelector('.demo-val');
    range.value = P;
    range.addEventListener('input', () => {
      P = Number(range.value);
      reset();
    });

    const unit = (NL_W - 32) / (NL_HI - NL_LO);
    const sx = x => 16 + (x - NL_LO) * unit;
    const phases = [{ kind: 'wait', dur: 300 }, { kind: 'fold', dur: 1400 }, { kind: 'wait', dur: 200 }, { kind: 'mark', dur: 500 }];

    // 原来数轴上的数 x，在翻转角 th 时的屏幕位置
    const LIFT = 14;   // 翻过来的部分比原数轴高出的距离
    function pos(x, th) {
      if (x > P) return [sx(x), NL_Y];
      const dx = (P - x) * unit, yc = -LIFT / 2;
      return [sx(P) - dx * Math.cos(th), NL_Y + yc - yc * Math.cos(th) - Math.sin(th) * dx * 0.35];
    }

    function draw(th, mark, caption) {
      const img = 2 * P - a;   // A′
      let html = '';
      // 右边不动的部分（含 P 左边的淡色痕迹）
      html += `<line x1="${sx(NL_LO)}" y1="${NL_Y}" x2="${sx(P)}" y2="${NL_Y}" stroke="#d8d0c0" stroke-width="2"/>`;
      html += `<line x1="${sx(P)}" y1="${NL_Y}" x2="${sx(NL_HI)}" y2="${NL_Y}" stroke="${INK}" stroke-width="2"/>`;
      html += `<path d="M${sx(NL_HI) + 2},${NL_Y - 4} l6,4 l-6,4" fill="none" stroke="${INK}" stroke-width="2"/>`;
      for (let x = Math.ceil(P); x <= NL_HI; x++) {
        html += `<line x1="${sx(x)}" y1="${NL_Y}" x2="${sx(x)}" y2="${NL_Y + 5}" stroke="${INK}"/>`;
        if (x % 2 === 0 || x === b || x === probe) html += `<text x="${sx(x)}" y="${NL_Y + 18}" font-size="10" text-anchor="middle" fill="${INK}">${minus(x)}</text>`;
      }
      for (let x = NL_LO; x < P; x++) {
        if (!th && (x % 2 === 0 || x === a)) html += `<text x="${sx(x)}" y="${NL_Y + 18}" font-size="10" text-anchor="middle" fill="${MUTED}">${minus(x)}</text>`;
      }
      // 翻过来的部分
      const [x0, y0] = pos(NL_LO, th), [x1, y1] = pos(P, th);
      html += `<polyline points="${x0.toFixed(1)},${y0.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)} ${sx(P)},${NL_Y}" fill="none" stroke="${BLUE}" stroke-width="2"/>`;
      for (let x = NL_LO; x < P; x++) {
        const [X, Y] = pos(x, th);
        html += `<line x1="${X.toFixed(1)}" y1="${Y.toFixed(1)}" x2="${X.toFixed(1)}" y2="${(Y - 4).toFixed(1)}" stroke="${BLUE}"/>`;
      }
      // 折痕 P
      html += `<line x1="${sx(P)}" y1="${NL_Y - 40}" x2="${sx(P)}" y2="${NL_Y + 24}" stroke="${MUTED}" stroke-dasharray="3 3"/>`;
      html += `<text x="${sx(P)}" y="${NL_Y + 34}" font-size="11" text-anchor="middle" fill="${MUTED}">P</text>`;
      // 点 B 和第 (2) 问的点
      html += dot(sx(b), NL_Y, INK, 'B', 1);
      html += dot(sx(probe), NL_Y, GREEN, '', 1);
      // 点 A 以及与第 (2) 问的点重合的那个点，跟着翻
      const [ax, ay] = pos(a, th);
      html += dot(ax, ay, RED, th > 3 ? 'A′' : 'A', -1);
      const partner = 2 * P - probe;
      if (partner < P) {
        const [qx, qy] = pos(partner, th);
        html += dot(qx, qy, GREEN, '', -1);
      }
      // 折好后标出 A′ 与 B 的距离
      if (mark > 0) {
        const y = NL_Y - 42;
        html += `<g opacity="${mark}"><line x1="${sx(img)}" y1="${y}" x2="${sx(b)}" y2="${y}" stroke="${RED}" stroke-width="1.5"/>` +
          `<line x1="${sx(img)}" y1="${y - 4}" x2="${sx(img)}" y2="${y + 4}" stroke="${RED}"/>` +
          `<line x1="${sx(b)}" y1="${y - 4}" x2="${sx(b)}" y2="${y + 4}" stroke="${RED}"/>` +
          `<text x="${(sx(img) + sx(b)) / 2}" y="${y - 5}" font-size="11" text-anchor="middle" fill="${RED}">${Math.abs(img - b)}</text></g>`;
      }
      s.svg.innerHTML = html;
      val.textContent = minus(P);
      s.caption.textContent = caption;
    }

    s.frame = ms => {
      let th = 0, mark = 0;
      walk(phases, ms, (p, f) => {
        if (p.kind === 'fold') th = Math.PI * ease(f);
        if (p.kind === 'mark') mark = f;
      });
      const img = 2 * P - a, dist = Math.abs(img - b);
      const caption = mark
        ? `A 落在 ${minus(img)}，与 B 相距 ${dist}${dist === d ? ' ✓' : ''}；${minus(probe)} 与 ${minus(2 * P - probe)} 重合（绿点）`
        : `沿 P 把数轴左边翻过来`;
      draw(th, mark, caption);
    };
    s.duration = () => totalOf(phases);
    function reset() {
      s.reset();
      draw(0, 0, '拖动 P 的位置，再点「播放」，看 A 落在哪里');
    }
    reset();
    return s;
  }

  function dot(x, y, color, text, side) {
    const t = text ? `<text x="${x.toFixed(1)}" y="${(y + (side > 0 ? -8 : -9)).toFixed(1)}" font-size="11" text-anchor="middle" fill="${color}" font-weight="bold">${text}</text>` : '';
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="${color}"/>` + t;
  }

  // ---------- 平角里两个角分别沿 OC、OD 折叠 ----------
  // opts.cases：[{ name, a, b }]，a=∠AOC，b=∠BOD
  const AF_W = 320, AF_H = 175, AF_OX = 160, AF_OY = 150, AF_R = 115;
  function angleFold(container, opts) {
    let cur = opts.cases[0];
    const s = shell(container, {
      w: AF_W,
      h: AF_H,
      aria: '把两个角分别沿一条边折叠的演示',
      controls: '<span class="demo-row"><span class="seg"></span></span>',
    });
    segButtons(s.box.querySelector('.seg'), opts.cases.map(c => c.name), cur.name, (v, i) => {
      cur = opts.cases[i];
      reset();
    });
    const phases = [{ kind: 'wait', dur: 300 }, { kind: 'foldA', dur: 1100 }, { kind: 'wait', dur: 200 }, { kind: 'foldB', dur: 1100 }, { kind: 'mark', dur: 400 }];

    // 角度（0° 指向 B，180° 指向 A）→ 屏幕坐标
    const pt = (deg, r = AF_R) => [AF_OX + r * Math.cos(deg * Math.PI / 180), AF_OY - r * Math.sin(deg * Math.PI / 180)];
    const sector = (d1, d2, r, color, op) => {
      const [x1, y1] = pt(d1, r), [x2, y2] = pt(d2, r);
      return `<path d="M${AF_OX},${AF_OY} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 ${d2 > d1 ? 0 : 1} ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}" fill-opacity="${op}"/>`;
    };
    const ray = (deg, color, text, width = 2) => {
      const [x, y] = pt(deg), [lx, ly] = pt(deg, AF_R + 11);
      return `<line x1="${AF_OX}" y1="${AF_OY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="${width}"/>` +
        (text ? `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" font-size="12" text-anchor="middle" fill="${color}" font-weight="bold">${text}</text>` : '');
    };

    function draw(fa, fb, mark, caption) {
      const { a, b } = cur;
      const c = 180 - a, dd = b;                 // OC、OD 的方向
      const ra = 180 - 2 * a * fa, rb = 2 * b * fb; // 翻折中 OA、OB 转到的方向
      let html = '';
      html += `<line x1="${AF_OX - AF_R}" y1="${AF_OY}" x2="${AF_OX + AF_R}" y2="${AF_OY}" stroke="#d8d0c0" stroke-width="2"/>`;
      // 被折的角：一边固定在 OC（OD），另一边从 OA（OB）翻过去
      html += sector(Math.min(c, ra), Math.max(c, ra), AF_R * 0.8, RED, 0.28);
      html += sector(Math.min(dd, rb), Math.max(dd, rb), AF_R * 0.8, BLUE, 0.28);
      html += ray(c, INK, 'C') + ray(dd, INK, 'D');
      const same = fa >= 1 && fb >= 1 && 180 - 2 * a === 2 * b;   // 重合时两个名字写在一起
      html += ray(ra, RED, fa >= 1 ? (same ? 'A′(B′)' : 'A′') : '', 2.5) + ray(rb, BLUE, fb >= 1 && !same ? 'B′' : '', 2.5);
      html += `<text x="${AF_OX - AF_R - 10}" y="${AF_OY + 4}" font-size="12" text-anchor="middle" fill="${INK}">A</text>`;
      html += `<text x="${AF_OX + AF_R + 10}" y="${AF_OY + 4}" font-size="12" text-anchor="middle" fill="${INK}">B</text>`;
      html += `<text x="${AF_OX}" y="${AF_OY + 16}" font-size="12" text-anchor="middle" fill="${INK}">O</text>`;
      // 标出 ∠A′OB′
      if (mark > 0 && 180 - 2 * a !== 2 * b) {
        const lo = Math.min(180 - 2 * a, 2 * b), hi = Math.max(180 - 2 * a, 2 * b);
        html += `<g opacity="${mark}">${sector(lo, hi, AF_R * 0.45, '#9a6a12', 0.55)}</g>`;
      }
      s.svg.innerHTML = html;
      s.caption.textContent = caption;
    }

    s.frame = ms => {
      let fa = 0, fb = 0, mark = 0;
      walk(phases, ms, (p, f) => {
        if (p.kind === 'foldA') fa = ease(f);
        if (p.kind === 'foldB') fb = ease(f);
        if (p.kind === 'mark') mark = f;
      });
      const { a, b } = cur;
      const between = 180 - 2 * a - 2 * b;
      let caption = fb ? '沿 OD 把 ∠BOD 折过去' : fa ? '沿 OC 把 ∠AOC 折过去' : '';
      if (mark) {
        const how = between === 0 ? 'OA′ 与 OB′ 重合' : between > 0 ? `两个角之间空出 ${between}°` : `两个角重叠了 ${-between}°`;
        caption = `∠AOC=${a}°，∠BOD=${b}°：${how}，∠COD=${180 - a - b}°`;
      }
      draw(fa, fb, mark, caption);
    };
    s.duration = () => totalOf(phases);
    function reset() {
      s.reset();
      draw(0, 0, 0, '选一种情况，点「播放」看两个角折过去以后的位置');
    }
    reset();
    return s;
  }

  // ---------- 两种剪绳子的方法对比 ----------
  // opts.rows：[{ label, cuts: [[剪去的比例, '剩下的标注'], ...] }]，比例都相对于全长
  const RC_W = 320, RC_H = 150, RC_X = 20, RC_L = 280;
  function ropeCut(container, opts) {
    const rows = opts.rows;
    const steps = Math.max(...rows.map(r => r.cuts.length));
    const s = shell(container, { w: RC_W, h: RC_H, aria: '两种剪绳子方法的对比演示' });
    const phases = [];
    for (let i = 0; i < steps; i++) phases.push({ kind: 'cut', i, dur: 800 }, { kind: 'wait', dur: 350 });

    function draw(done, f, caption) {
      let html = '';
      rows.forEach((row, r) => {
        const y = 45 + r * 65;
        html += `<text x="${RC_X}" y="${y - 14}" font-size="12" fill="${INK}">${row.label}</text>`;
        html += `<rect x="${RC_X}" y="${y - 5}" width="${RC_L}" height="10" rx="3" fill="none" stroke="#d8d0c0" stroke-dasharray="4 3"/>`;
        let left = 1;
        row.cuts.slice(0, done).forEach(c => (left -= c[0]));
        const next = row.cuts[done];
        const keep = next && f > 0 ? left - next[0] : left;
        html += `<rect x="${RC_X}" y="${y - 5}" width="${(keep * RC_L).toFixed(1)}" height="10" rx="3" fill="${ROPE}"/>`;
        // 正在剪掉的一段：往下掉并变淡
        if (next && f > 0) {
          html += `<rect x="${(RC_X + keep * RC_L + 3).toFixed(1)}" y="${(y - 5 + f * 18).toFixed(1)}" width="${(next[0] * RC_L - 3).toFixed(1)}" height="10" rx="3" fill="${RED}" opacity="${(1 - f * 0.8).toFixed(2)}"/>`;
        }
        const note = done ? '剩 ' + row.cuts[Math.min(done, row.cuts.length) - 1][1] : '全长 a';
        html += `<text x="${RC_X + RC_L}" y="${y - 14}" font-size="12" text-anchor="end" fill="${RED}" font-weight="bold">${note}</text>`;
      });
      s.svg.innerHTML = html;
      s.caption.textContent = caption;
    }

    s.frame = ms => {
      let done = 0, f = 0;
      walk(phases, ms, (p, t) => {
        if (p.kind !== 'cut') return;
        if (t >= 1) {
          done = p.i + 1;
          f = 0;
        } else {
          done = p.i;
          f = ease(t);
        }
      });
      draw(done, f, done >= steps ? opts.summary : `第 ${Math.min(steps, done + 1)} 次剪`);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(0, 0, '点「播放」，比较两种剪法');
    return s;
  }

  function mix(c1, c2, t) {
    const a = parseInt(c1.slice(1), 16), b = parseInt(c2.slice(1), 16);
    const ch = s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, t));
    return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
  }

  // ---------- 第 14 章 图形的运动 ----------
  // 坐标用“格”为单位、y 轴向上；view = [xmin, xmax, ymin, ymax]，画布宽 320
  function gridView(view, w = 320, pad = 14) {
    const [x0, x1, y0, y1] = view;
    const u = (w - 2 * pad) / (x1 - x0);
    const h = Math.round((y1 - y0) * u + 2 * pad);
    const P = ([x, y]) => [pad + (x - x0) * u, pad + (y1 - y) * u];
    let grid = '';
    for (let x = Math.ceil(x0); x <= x1; x++) grid += `<line x1="${P([x, y0])[0].toFixed(1)}" y1="${P([x, y0])[1].toFixed(1)}" x2="${P([x, y1])[0].toFixed(1)}" y2="${P([x, y1])[1].toFixed(1)}" stroke="#e4ddd0" stroke-width="1"/>`;
    for (let y = Math.ceil(y0); y <= y1; y++) grid += `<line x1="${P([x0, y])[0].toFixed(1)}" y1="${P([x0, y])[1].toFixed(1)}" x2="${P([x1, y])[0].toFixed(1)}" y2="${P([x1, y])[1].toFixed(1)}" stroke="#e4ddd0" stroke-width="1"/>`;
    return { w, h, u, P, grid };
  }
  const ptsAttr = (P, pts) => pts.map(p => P(p).map(v => v.toFixed(1)).join(',')).join(' ');
  const rotPt = ([x, y], [cx, cy], deg) => {
    const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
    return [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c];
  };

  // 平移、旋转、翻折（轴对称）、旋转 180°（中心对称）的过程演示，放在知识点卡片里
  // opts：mode（translate / rotate / reflect / half）、shape 顶点、labels、view，
  //   translate 用 v，rotate 用 center、angle（逆时针为正）及可选的 centers 供切换，reflect 用 axis（两点），half 用 center
  function motion(container, opts) {
    const mode = opts.mode;
    const g = gridView(opts.view);
    const shape = opts.shape;
    const labels = opts.labels || ['A', 'B', 'C', 'D'].slice(0, shape.length);
    let center = opts.center || (opts.centers ? opts.centers[0].c : null);
    const centers = opts.centers;
    const s = shell(container, {
      w: g.w,
      h: g.h,
      aria: { translate: '平移过程演示', rotate: '旋转过程演示', reflect: '翻折过程演示', half: '旋转 180° 演示' }[mode],
      controls: centers ? '<span class="demo-row"><span class="seg"></span></span>' : '',
    });
    if (centers) {
      segButtons(s.box.querySelector('.seg'), centers.map(c => c.name), centers[0].name, (v, i) => {
        center = centers[i].c;
        s.reset();
        draw(0, 0);
      });
    }
    const angle = mode === 'half' ? 180 : opts.angle || 0;
    const move = (p, f) => {
      if (mode === 'translate') return [p[0] + opts.v[0] * f, p[1] + opts.v[1] * f];
      if (mode === 'rotate' || mode === 'half') return rotPt(p, center, angle * f);
      // 翻折：垂直于对称轴的分量按 cos 缩放，像纸片翻过去
      const [a, b] = opts.axis;
      const dx = b[0] - a[0], dy = b[1] - a[1], len2 = dx * dx + dy * dy;
      const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
      const foot = [a[0] + t * dx, a[1] + t * dy];
      const c = Math.cos(Math.PI * f);
      return [foot[0] + (p[0] - foot[0]) * c, foot[1] + (p[1] - foot[1]) * c];
    };
    const ends = {
      translate: '对应点的连线平行且相等，长度都等于平移的距离；形状、大小都没变',
      rotate: '每个点都沿以旋转中心为圆心的圆弧转过同样的角度：到中心的距离不变，转过的角都等于旋转角',
      reflect: '对称点的连线都和对称轴垂直，并且被对称轴平分',
      half: '转了 180°：每组对称点的连线都经过对称中心，并且被它平分',
    };
    const doing = { translate: '平移中……', rotate: '旋转中……', reflect: '沿对称轴翻折中……', half: '绕对称中心旋转 180° 中……' };
    const prime = t => t + '′';

    function draw(f, mark) {
      const P = g.P;
      let html = g.grid;
      if (mode === 'reflect') {
        const [a, b] = opts.axis;
        const k = 20;
        const A = [a[0] - (b[0] - a[0]) * k, a[1] - (b[1] - a[1]) * k], B = [b[0] + (b[0] - a[0]) * k, b[1] + (b[1] - a[1]) * k];
        html += `<line x1="${P(A)[0].toFixed(1)}" y1="${P(A)[1].toFixed(1)}" x2="${P(B)[0].toFixed(1)}" y2="${P(B)[1].toFixed(1)}" stroke="${RED}" stroke-width="1.8" stroke-dasharray="6 4"/>`;
      }
      const now = shape.map(p => move(p, f));
      // 轨迹
      shape.forEach((p, i) => {
        if (mode === 'rotate' || mode === 'half') {
          const n = 24, arc = [];
          for (let j = 0; j <= n; j++) arc.push(move(p, (f * j) / n));
          html += `<polyline points="${ptsAttr(P, arc)}" fill="none" stroke="${GREEN}" stroke-width="1.4" stroke-dasharray="4 3"/>`;
          if (mark > 0) {
            html += `<line x1="${P(center)[0].toFixed(1)}" y1="${P(center)[1].toFixed(1)}" x2="${P(p)[0].toFixed(1)}" y2="${P(p)[1].toFixed(1)}" stroke="${MUTED}" stroke-width="1" opacity="${mark}"/>`;
            html += `<line x1="${P(center)[0].toFixed(1)}" y1="${P(center)[1].toFixed(1)}" x2="${P(now[i])[0].toFixed(1)}" y2="${P(now[i])[1].toFixed(1)}" stroke="${MUTED}" stroke-width="1" opacity="${mark}"/>`;
          }
        } else {
          html += `<line x1="${P(p)[0].toFixed(1)}" y1="${P(p)[1].toFixed(1)}" x2="${P(now[i])[0].toFixed(1)}" y2="${P(now[i])[1].toFixed(1)}" stroke="${GREEN}" stroke-width="1.4" stroke-dasharray="4 3"/>`;
          if (mode === 'reflect' && mark > 0) {
            const m = [(p[0] + now[i][0]) / 2, (p[1] + now[i][1]) / 2];
            html += `<circle cx="${P(m)[0].toFixed(1)}" cy="${P(m)[1].toFixed(1)}" r="3" fill="${RED}" opacity="${mark}"/>`;
          }
        }
      });
      html += `<polygon points="${ptsAttr(P, shape)}" fill="#cfe3f7" stroke="${INK}" stroke-width="1.6"/>`;
      const back = mode === 'reflect' && f > 0.5;
      if (f > 0) html += `<polygon points="${ptsAttr(P, now)}" fill="${back ? '#f2c6a0' : '#f6d8b8'}" fill-opacity="0.85" stroke="${INK}" stroke-width="1.6"/>`;
      shape.forEach((p, i) => {
        html += `<text x="${(P(p)[0] - 8).toFixed(1)}" y="${(P(p)[1] - 5).toFixed(1)}" font-size="13" fill="${BLUE}">${labels[i]}</text>`;
        if (f > 0.05) html += `<text x="${(P(now[i])[0] + 4).toFixed(1)}" y="${(P(now[i])[1] - 5).toFixed(1)}" font-size="13" fill="${RED}">${prime(labels[i])}</text>`;
      });
      if (center) {
        html += `<circle cx="${P(center)[0].toFixed(1)}" cy="${P(center)[1].toFixed(1)}" r="3.2" fill="${INK}"/>`;
        html += `<text x="${(P(center)[0] - 12).toFixed(1)}" y="${(P(center)[1] + 15).toFixed(1)}" font-size="13" fill="${INK}">O</text>`;
      }
      s.svg.innerHTML = html;
    }

    const phases = [{ kind: 'move', dur: 2200 }, { kind: 'mark', dur: 900 }];
    s.frame = ms => {
      let f = 0, mark = 0;
      walk(phases, ms, (p, t) => {
        if (p.kind === 'move') f = ease(t);
        else mark = t;
      });
      draw(f, mark);
      s.caption.textContent = mark > 0 ? opts.caption || ends[mode] : doing[mode];
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(0, 0);
    s.caption.textContent = '点「播放」看图形怎样运动';
    return s;
  }

  // 正方形斜向平移扫过的区域（14.1-c01）：opts.side 边长，opts.v 每单位 t 的位移，opts.tMax
  function sweep(container, opts) {
    const a = opts.side, [vx, vy] = opts.v, T = opts.tMax;
    const g = gridView([0, a + vx * T + 0.5, 0, a + vy * T + 0.5]);
    const s = shell(container, { w: g.w, h: g.h, aria: '正方形平移扫过区域的演示' });
    function draw(t, mark) {
      const P = g.P;
      const dx = vx * t, dy = vy * t;
      const hex = [[0, 0], [a, 0], [a + dx, dy], [a + dx, a + dy], [dx, a + dy], [0, a]];
      let html = g.grid;
      html += `<polygon points="${ptsAttr(P, hex)}" fill="#f6d8b8" fill-opacity="0.7" stroke="${RED}" stroke-width="1.4"/>`;
      if (mark > 0) {
        html += `<rect x="${P([0, a + dy])[0]}" y="${P([0, a + dy])[1]}" width="${((a + dx) * g.u).toFixed(1)}" height="${((a + dy) * g.u).toFixed(1)}" fill="none" stroke="${MUTED}" stroke-dasharray="5 3" opacity="${mark}"/>`;
        html += `<polygon points="${ptsAttr(P, [[a, 0], [a + dx, 0], [a + dx, dy]])}" fill="#ddd" opacity="${mark}"/>`;
        html += `<polygon points="${ptsAttr(P, [[0, a], [dx, a + dy], [0, a + dy]])}" fill="#ddd" opacity="${mark}"/>`;
      }
      html += `<polygon points="${ptsAttr(P, [[0, 0], [a, 0], [a, a], [0, a]])}" fill="#cfe3f7" fill-opacity="0.8" stroke="${INK}" stroke-width="1.4" stroke-dasharray="5 3"/>`;
      html += `<polygon points="${ptsAttr(P, [[dx, dy], [a + dx, dy], [a + dx, a + dy], [dx, a + dy]])}" fill="#cfe3f7" fill-opacity="0.9" stroke="${INK}" stroke-width="1.6"/>`;
      s.svg.innerHTML = html;
      const area = a * a + (a * vy + a * vx) * t;
      s.caption.textContent = mark > 0
        ? `扫过的区域 = 外框 ${(a + dx).toFixed(0)}×${(a + dy).toFixed(0)} 减去两个灰色三角形 = ${area.toFixed(0)}`
        : `t = ${t.toFixed(1)}，扫过的面积 ${area.toFixed(1)}`;
    }
    const phases = [{ kind: 'move', dur: 3000 }, { kind: 'mark', dur: 900 }];
    s.frame = ms => {
      let t = 0, mark = 0;
      walk(phases, ms, (p, f) => {
        if (p.kind === 'move') t = T * f;
        else mark = f;
      });
      draw(t, mark);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(0, 0);
    s.caption.textContent = '点「播放」，看扫过的区域怎样长出来';
    return s;
  }

  // 正方形中心的直角绕中心旋转，重叠面积不变（14.2-c01）。屏幕坐标：A(0,0) 左上，B(0,6)，C(6,6)，D(6,0)，O(3,3)
  function rotOverlap(container) {
    const k = 34, ox = 40, oy = 22;
    const Q = ([x, y]) => [ox + x * k, oy + y * k];
    const s = shell(container, { w: 6 * k + 2 * ox, h: 6 * k + 2 * oy + 20, aria: '直角绕正方形中心旋转的演示' });
    const O = [3, 3];
    const rot = ([x, y]) => [y, -x];  // 把 OB 方向转到 OC 方向
    function geom(th) {
      const d = [Math.cos(th), Math.sin(th)];
      const e = rot(d);
      const E = [3 + d[0] * (3 / Math.abs(d[0])), 3 + d[1] * (3 / Math.abs(d[0]))];
      const F = [3 + e[0] * (3 / Math.abs(e[1])), 3 + e[1] * (3 / Math.abs(e[1]))];
      return { E, F, d, e };
    }
    const pa = pts => pts.map(p => Q(p).map(v => v.toFixed(1)).join(',')).join(' ');
    function draw(th, spin) {
      const { E, F, d, e } = geom(th);
      const B = [0, 6], C = [6, 6];
      const M = [3 + d[0] * 5, 3 + d[1] * 5], N = [3 + e[0] * 5, 3 + e[1] * 5];
      let html = `<polygon points="${pa([O, E, B, F])}" fill="#cfe3f7"/>`;
      html += `<polygon points="${pa([[0, 0], [0, 6], [6, 6], [6, 0]])}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
      html += `<polygon points="${pa([O, B, E])}" fill="none" stroke="${BLUE}" stroke-width="2"/>`;
      html += `<polygon points="${pa([O, C, F])}" fill="#f6d8b8" fill-opacity="0.6" stroke="${RED}" stroke-width="2"/>`;
      if (spin > 0) {
        // 三角形 OBE 绕 O 转过 spin×90°，落到 OCF 上
        const r = p => {
          const a = (-spin * Math.PI) / 2, c = Math.cos(a), sn = Math.sin(a);
          const x = p[0] - 3, y = p[1] - 3;
          return [3 + x * c - y * sn, 3 + x * sn + y * c];
        };
        html += `<polygon points="${pa([O, B, E].map(r))}" fill="${BLUE}" fill-opacity="0.25" stroke="${BLUE}" stroke-width="1.4" stroke-dasharray="4 3"/>`;
      }
      html += `<line x1="${Q(O)[0]}" y1="${Q(O)[1]}" x2="${Q(M)[0].toFixed(1)}" y2="${Q(M)[1].toFixed(1)}" stroke="${INK}" stroke-width="1.6"/>`;
      html += `<line x1="${Q(O)[0]}" y1="${Q(O)[1]}" x2="${Q(N)[0].toFixed(1)}" y2="${Q(N)[1].toFixed(1)}" stroke="${INK}" stroke-width="1.6"/>`;
      const lab = (t, p, dx, dy, col = INK) => `<text x="${(Q(p)[0] + dx).toFixed(1)}" y="${(Q(p)[1] + dy).toFixed(1)}" font-size="13" fill="${col}">${t}</text>`;
      html += lab('A', [0, 0], -14, 4) + lab('B', B, -14, 14) + lab('C', C, 6, 14) + lab('D', [6, 0], 6, 4) + lab('O', O, 6, -4);
      html += lab('E', E, -14, -4, BLUE) + lab('F', F, -4, 16, RED);
      s.svg.innerHTML = html;
      // 面积：四边形 OEBF = 三角形 OEB + 三角形 OBF
      const area = (6 - E[1]) * 3 / 2 + F[0] * 3 / 2;
      return area;
    }
    const th0 = (140 * Math.PI) / 180, th1 = (220 * Math.PI) / 180;
    const phases = [{ kind: 'turn', from: th0, to: th1, dur: 2400 }, { kind: 'turn', from: th1, to: (175 * Math.PI) / 180, dur: 1400 }, { kind: 'spin', dur: 1600 }];
    s.frame = ms => {
      let th = th0, spin = 0;
      walk(phases, ms, (p, f) => {
        if (p.kind === 'turn') th = lerp(p.from, p.to, ease(f));
        else spin = ease(f);
      });
      const area = draw(th, spin);
      s.caption.textContent = spin > 0
        ? '三角形 OBE 绕 O 转 90°，正好盖住三角形 OCF，所以阴影面积总等于三角形 OBC'
        : `直角转动时，阴影 OEBF 的面积始终是 ${area.toFixed(1)}`;
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(th0, 0);
    s.caption.textContent = '点「播放」，转动直角，观察阴影面积';
    return s;
  }

  // 台球反弹与“翻折展开”（14.3-c02）：opts.sizes = [[W,H], ...]
  function billiard(container, opts) {
    const sizes = opts.sizes;
    let [W, H] = sizes[0];
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    const sw = 320, sh = 230;
    const s = shell(container, {
      w: sw,
      h: sh,
      aria: '台球反弹与展开的演示',
      controls: sizes.length > 1 ? '<span class="demo-row"><span>桌子</span><span class="seg"></span></span>' : '',
    });
    if (sizes.length > 1) {
      segButtons(s.box.querySelector('.seg'), sizes.map(([w, h]) => `${w}×${h}`), `${W}×${H}`, (v, i) => {
        [W, H] = sizes[i];
        s.reset();
        draw(0, 0);
        s.caption.textContent = '点「播放」';
      });
    }
    const corner = (x, y) => (x === 0 ? (y === 0 ? 'A' : 'D') : (y === 0 ? 'B' : 'C'));
    function draw(f, g2) {
      const L = (W * H) / gcd(W, H);
      let html = '';
      if (g2 === 0) {
        // 桌面视图：球沿 45° 走，碰边反弹
        const k = Math.min((sw - 40) / W, (sh - 40) / H);
        const ox = (sw - W * k) / 2, oy = (sh - H * k) / 2;
        const P = ([x, y]) => [ox + x * k, oy + (H - y) * k];
        const fold = (v, m) => {
          const r = v % (2 * m);
          return r > m ? 2 * m - r : r;
        };
        const sAt = f * L;
        const pts = [[0, 0]];
        const step = Math.max(1, Math.round(L / 400));
        for (let t = step; t < sAt; t += step) pts.push([fold(t, W), fold(t, H)]);
        pts.push([fold(sAt, W), fold(sAt, H)]);
        html += `<rect x="${ox}" y="${oy}" width="${(W * k).toFixed(1)}" height="${(H * k).toFixed(1)}" fill="#e3f1e3" stroke="${INK}" stroke-width="2"/>`;
        html += `<polyline points="${ptsAttr(P, pts)}" fill="none" stroke="${RED}" stroke-width="1.6"/>`;
        const cur = pts[pts.length - 1];
        html += `<circle cx="${P(cur)[0].toFixed(1)}" cy="${P(cur)[1].toFixed(1)}" r="4.5" fill="#fff" stroke="${INK}"/>`;
        [[0, 0], [W, 0], [W, H], [0, H]].forEach(([x, y]) => {
          html += `<text x="${(P([x, y])[0] + (x ? 6 : -14)).toFixed(1)}" y="${(P([x, y])[1] + (y ? -4 : 14)).toFixed(1)}" font-size="13">${corner(x, y)}</text>`;
        });
      } else {
        // 展开视图：把桌子一次次翻折过去，路线变成一条直线
        const nx = L / W, ny = L / H;
        const k = Math.min((sw - 40) / (nx * W), (sh - 30) / (ny * H));
        const ox = (sw - nx * W * k) / 2, oy = (sh - ny * H * k) / 2;
        const P = ([x, y]) => [ox + x * k, oy + (ny * H - y) * k];
        for (let i = 0; i < nx; i++) {
          for (let j = 0; j < ny; j++) {
            html += `<rect x="${P([i * W, (j + 1) * H])[0].toFixed(1)}" y="${P([i * W, (j + 1) * H])[1].toFixed(1)}" width="${(W * k).toFixed(1)}" height="${(H * k).toFixed(1)}" fill="${(i + j) % 2 ? '#d7ebd7' : '#e3f1e3'}" stroke="${MUTED}" stroke-width="1"/>`;
          }
        }
        const end = [g2 * L, g2 * L];
        html += `<line x1="${P([0, 0])[0]}" y1="${P([0, 0])[1]}" x2="${P(end)[0].toFixed(1)}" y2="${P(end)[1].toFixed(1)}" stroke="${RED}" stroke-width="2"/>`;
        html += `<text x="${P([0, 0])[0] - 12}" y="${P([0, 0])[1] + 14}" font-size="13">A</text>`;
        if (g2 >= 1) {
          const fx = nx % 2 ? W : 0, fy = ny % 2 ? H : 0;
          html += `<text x="${P([L, L])[0] + 4}" y="${P([L, L])[1] - 4}" font-size="13" fill="${RED}" font-weight="bold">${corner(fx, fy)}</text>`;
        }
      }
      s.svg.innerHTML = html;
    }
    const phases = [{ kind: 'roll', dur: 3600 }, { kind: 'wait', dur: 500 }, { kind: 'unfold', dur: 2000 }];
    s.frame = ms => {
      let f = 0, g2 = 0;
      walk(phases, ms, (p, t) => {
        if (p.kind === 'roll') f = t;
        if (p.kind === 'unfold') g2 = Math.max(t, 0.001);
      });
      draw(f, g2);
      const L = (W * H) / gcd(W, H);
      s.caption.textContent = g2 > 0
        ? `展开：横向 ${L / W} 张、竖向 ${L / H} 张桌子，路线是一条直线，横、竖都走了 ${L}（${W} 和 ${H} 的最小公倍数）`
        : '球碰到桌边就像照镜子一样反弹';
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(0, 0);
    s.caption.textContent = '点「播放」，先看反弹，再看展开';
    return s;
  }

  // ---------- 数轴的公共画法（第 15 章） ----------
  // 数轴 [lo, hi] 画在 y 处；返回 { sx, html }
  function axis(w, y, lo, hi) {
    const unit = (w - 36) / (hi - lo);
    const sx = x => 16 + (x - lo) * unit;
    const every = hi - lo > 14 ? 2 : 1;
    let html = `<line x1="8" y1="${y}" x2="${w - 10}" y2="${y}" stroke="${INK}" stroke-width="1.6"/>` +
      `<path d="M${w - 12},${y - 4} l6,4 l-6,4" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
    for (let x = Math.ceil(lo); x <= hi; x++) {
      html += `<line x1="${sx(x).toFixed(1)}" y1="${y}" x2="${sx(x).toFixed(1)}" y2="${y - 4}" stroke="${INK}"/>`;
      if (x % every === 0) {
        html += `<text x="${sx(x).toFixed(1)}" y="${y + 15}" font-size="10" text-anchor="middle" fill="${INK}">${minus(x)}</text>`;
      }
    }
    return { sx, html };
  }
  const fmtNum = v => minus(Number.isInteger(v) ? v : +v.toFixed(2));

  // 不等式两边同乘一个数（15.1 性质 4、5）：opts { a, b, ks }，a>b；先按 |k| 伸缩，k<0 时再绕原点翻到另一侧
  function scaleOrder(container, opts) {
    const { a, b, ks } = opts;
    let k = ks[0];
    const W = 320, H = 130, Y = 92;
    const s = shell(container, {
      w: W, h: H, aria: '不等式两边同乘一个数，两点位置变化的演示',
      controls: ks.length > 1 ? '<span class="demo-row"><span>乘</span><span class="seg"></span></span>' : '',
    });
    if (ks.length > 1) segButtons(s.box.querySelector('.seg'), ks.map(minus), minus(k), (v, i) => { k = ks[i]; s.reset(); draw(1, 0); s.caption.textContent = `点「播放」，看两边同乘 ${minus(k)} 后谁大`; });
    const span = Math.max(...ks.map(m => Math.max(Math.abs(a * m), Math.abs(b * m))), Math.abs(a), Math.abs(b));
    const lim = Math.ceil(span) + 1;
    const phases = () => [{ kind: 'wait', dur: 300 }, { kind: 'stretch', dur: 1200 }, ...(k < 0 ? [{ kind: 'wait', dur: 250 }, { kind: 'flip', dur: 1500 }] : []), { kind: 'wait', dur: 200 }];
    function draw(scale, flip) {
      const ax = axis(W, Y, -lim, lim);
      let html = ax.html;
      html += `<line x1="${ax.sx(0)}" y1="${Y - 58}" x2="${ax.sx(0)}" y2="${Y + 4}" stroke="${MUTED}" stroke-dasharray="3 3"/>`;
      const th = Math.PI * flip;
      // 翻转时沿半圆弧走到原点另一侧（弧高按距原点的远近压扁，免得出画面）
      const at = v => {
        const x = v * scale;
        return [ax.sx(x * Math.cos(th)), Y - Math.sin(th) * Math.min(62, Math.abs(ax.sx(x) - ax.sx(0)) * 0.6)];
      };
      const done = scale === Math.abs(k) && (k > 0 || flip === 1);
      const tag = (v, name) => (scale === 1 && !flip ? name : done ? `${minus(k)}${name}` : name);
      const [xa, ya] = at(a), [xb, yb] = at(b);
      html += dot(xa, ya, RED, tag(a, 'a'), 1) + dot(xb, yb, BLUE, tag(b, 'b'), 1);
      s.svg.innerHTML = html;
    }
    s.frame = ms => {
      let scale = 1, flip = 0, end = false;
      walk(phases(), ms, (p, f) => {
        if (p.kind === 'stretch') scale = lerp(1, Math.abs(k), ease(f));
        if (p.kind === 'flip') flip = ease(f);
      });
      end = ms >= totalOf(phases());
      draw(scale, flip);
      const ka = a * k, kb = b * k;
      s.caption.textContent = end
        ? `a=${fmtNum(a)} 在 b=${fmtNum(b)} 右边；乘 ${minus(k)} 后 ${fmtNum(ka)} 在 ${fmtNum(kb)} 的${ka > kb ? '右边，方向不变' : '左边，方向改变'}：${minus(k)}a ${ka > kb ? '>' : '<'} ${minus(k)}b`
        : flip ? '乘负数：再绕原点翻到另一侧，左右顺序颠倒' : `先按 ${Math.abs(k)} 倍伸缩，左右顺序不变`;
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(1, 0);
    s.caption.textContent = `a>b：a 在 b 的右边。点「播放」，看两边同乘 ${minus(k)} 后谁大`;
    return s;
  }

  // 在数轴上找几个不等式解集的公共部分（15.2、15.3）
  // opts { sets: [[op, v, 标签?], ...], lo, hi, ints }；op 为 '>' '>=' '<' '<='，ints 为 true 时最后标出公共部分里的整数
  function solutionSet(container, opts) {
    const { sets, lo, hi, ints } = opts;
    const W = 320, n = sets.length, Y = 40 + 18 * n, H = Y + 40;
    const s = shell(container, { w: W, h: H, aria: '在数轴上表示不等式的解集并找公共部分的演示' });
    const colors = [RED, BLUE, GREEN, '#8a5cc2'];
    // 公共部分：下界取最大的，上界取最小的；同一个数时“不含”优先
    const lows = sets.filter(([op]) => op[0] === '>'), highs = sets.filter(([op]) => op[0] === '<');
    const L = lows.length ? Math.max(...lows.map(([, v]) => v)) : null;
    const R = highs.length ? Math.min(...highs.map(([, v]) => v)) : null;
    const Li = lows.filter(([, v]) => v === L).every(([op]) => op.length === 2);
    const Ri = highs.filter(([, v]) => v === R).every(([op]) => op.length === 2);
    const empty = L !== null && R !== null && (L > R || (L === R && !(Li && Ri)));
    const intList = [];
    if (ints && !empty) {
      for (let x = Math.ceil(L === null ? lo : L); x <= (R === null ? hi : R); x++) {
        if ((L === null || x > L || (x === L && Li)) && (R === null || x < R || (x === R && Ri))) intList.push(x);
      }
    }
    const phases = [
      ...sets.map((_, i) => ({ kind: 'ray', i, dur: 900 })),
      ...(n > 1 ? [{ kind: 'wait', dur: 250 }, { kind: 'common', dur: 800 }] : []),
      ...(ints && !empty ? [{ kind: 'ints', dur: 700 }] : []),
    ];
    function draw(grow, common, intF) {
      const ax = axis(W, Y, lo, hi);
      let html = '';
      // 公共部分画在数轴上，先画在底下
      if (common > 0 && !empty) {
        const x1 = ax.sx(L === null ? lo : L), x2 = ax.sx(R === null ? hi : R);
        html += `<rect x="${Math.min(x1, x2).toFixed(1)}" y="${Y - 7}" width="${Math.abs(x2 - x1).toFixed(1)}" height="14" fill="#f2d44c" opacity="${(0.65 * common).toFixed(2)}"/>`;
      }
      html += ax.html;
      sets.forEach(([op, v, label], i) => {
        const f = grow[i];
        if (!f) return;
        const c = colors[i % colors.length], x0 = ax.sx(v), yy = Y - 16 - 16 * i;
        const end = op[0] === '>' ? W - 14 : 10;
        const x1 = lerp(x0, end, ease(f));
        html += `<line x1="${x0.toFixed(1)}" y1="${Y}" x2="${x0.toFixed(1)}" y2="${yy}" stroke="${c}" stroke-width="1.6"/>`;
        html += `<line x1="${x0.toFixed(1)}" y1="${yy}" x2="${x1.toFixed(1)}" y2="${yy}" stroke="${c}" stroke-width="1.6"/>`;
        if (f === 1) html += `<path d="M${end + (op[0] === '>' ? -5 : 5)},${yy - 4} l${op[0] === '>' ? 5 : -5},4 l${op[0] === '>' ? -5 : 5},4" fill="none" stroke="${c}" stroke-width="1.6"/>`;
        html += `<circle cx="${x0.toFixed(1)}" cy="${Y}" r="4" fill="${op.length === 2 ? c : '#fff'}" stroke="${c}" stroke-width="1.6"/>`;
        if (!Number.isInteger(v)) html += `<text x="${x0.toFixed(1)}" y="${Y + 29}" font-size="10" text-anchor="middle" fill="${c}">${label || fmtNum(v)}</text>`;
        const tx = op[0] === '>' ? Math.min(x0 + 18, W - 30) : Math.max(x0 - 18, 24);
        if (n > 1) html += `<text x="${tx.toFixed(1)}" y="${yy - 4}" font-size="11" text-anchor="middle" fill="${c}">${['①', '②', '③', '④'][i]}</text>`;
      });
      if (intF > 0) intList.forEach(x => { html += `<circle cx="${ax.sx(x).toFixed(1)}" cy="${Y}" r="3" fill="${INK}" opacity="${intF.toFixed(2)}"/>`; });
      s.svg.innerHTML = html;
    }
    const opText = op => ({ '>': '>', '>=': '≥', '<': '<', '<=': '≤' })[op];
    const commonText = () => {
      if (empty) return '没有公共部分，不等式组无解';
      const lt = L === null ? '' : `${fmtNum(L)}${Li ? '≤' : '<'}`;
      const rt = R === null ? '' : `${Ri ? '≤' : '<'}${fmtNum(R)}`;
      if (L !== null && R !== null && L === R) return `公共部分只有一个数：x=${fmtNum(L)}`;
      if (L === null) return `公共部分：x${rt}`;
      if (R === null) return `公共部分：x${Li ? '≥' : '>'}${fmtNum(L)}`;
      return `公共部分：${lt}x${rt}`;
    };
    s.frame = ms => {
      const grow = sets.map(() => 0);
      let common = 0, intF = 0, cap = '';
      walk(phases, ms, (p, f) => {
        if (p.kind === 'ray') { grow[p.i] = f; cap = `${n > 1 ? ['①', '②', '③', '④'][p.i] + ' ' : ''}x${opText(sets[p.i][0])}${sets[p.i][2] || fmtNum(sets[p.i][1])}：${sets[p.i][0].length === 2 ? '实心点，含这个数' : '空心圈，不含这个数'}`; }
        if (p.kind === 'common') { common = f; cap = commonText(); }
        if (p.kind === 'ints') { intF = f; cap = `${n > 1 ? commonText() : '解集'}，其中的整数：${intList.map(minus).join('，')}，共 ${intList.length} 个`; }
      });
      draw(grow, common, intF);
      s.caption.textContent = cap;
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(sets.map(() => 0), 0, 0);
    s.caption.textContent = n > 1 ? '点「播放」，把每个解集画在数轴上，再找公共部分' : '点「播放」，把解集画在数轴上';
    return s;
  }

  // ---------- 相交线（第 16 章） ----------
  // 角度 deg（数学方向，逆时针为正）在半径 r 处的屏幕坐标
  const polar = (ox, oy, deg, r) => [ox + r * Math.cos(deg * Math.PI / 180), oy - r * Math.sin(deg * Math.PI / 180)];
  // 从 d1 逆时针转到 d2 的扇形（d2>d1）
  function wedge(ox, oy, d1, d2, r, color, op = 0.25) {
    const [x1, y1] = polar(ox, oy, d1, r), [x2, y2] = polar(ox, oy, d2, r);
    const large = d2 - d1 > 180 ? 1 : 0;
    return `<path d="M${ox},${oy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}" fill-opacity="${op}" stroke="${color}" stroke-width="1"/>`;
  }
  function label(ox, oy, deg, r, text, color = INK, size = 12) {
    const [x, y] = polar(ox, oy, deg, r);
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" font-size="${size}" text-anchor="middle" fill="${color}" font-weight="bold">${text}</text>`;
  }
  // 直角记号：在 d 与 d+90 两条射线之间画小正方形
  function rightMark(ox, oy, d, s = 11) {
    const [x1, y1] = polar(ox, oy, d, s), [x2, y2] = polar(ox, oy, d + 90, s), [x3, y3] = polar(ox, oy, d + 45, s * Math.SQRT2);
    return `<polyline points="${x1.toFixed(1)},${y1.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${INK}" stroke-width="1.3"/>`;
  }

  // 对顶角相等（16.1）：直线 AB 不动，直线 CD 绕交点 O 转动；拖滑块或点播放
  function vertAngles(container, opts) {
    const W = 320, H = 210, OX = 160, OY = 105, R = 82;
    let ang = opts.start || 40;
    const s = shell(container, {
      w: W, h: H, aria: '两条直线相交时对顶角的演示',
      controls: '<label class="demo-row"><span>∠AOC</span><input type="range" min="10" max="170" step="1"><b class="demo-val"></b></label>',
    });
    const range = s.box.querySelector('input'), val = s.box.querySelector('.demo-val');
    range.value = ang;
    range.addEventListener('input', () => { s.reset(); ang = Number(range.value); draw(ang); });
    function draw(a) {
      a = Math.round(a);
      const c = 180 - a;   // OC 的方向（OA 指向 180°）
      let html = '';
      html += wedge(OX, OY, c, 180, 30, RED) + wedge(OX, OY, 360 - a, 360, 30, RED);       // ∠AOC 与 ∠BOD
      html += wedge(OX, OY, 0, c, 22, BLUE, 0.18) + wedge(OX, OY, 180, 360 - a, 22, BLUE, 0.18);  // ∠BOC 与 ∠AOD
      const line = (d1, d2, n1, n2) => {
        const [x1, y1] = polar(OX, OY, d1, R), [x2, y2] = polar(OX, OY, d2, R);
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="2"/>` +
          label(OX, OY, d1, R + 11, n1) + label(OX, OY, d2, R + 11, n2);
      };
      html += line(180, 0, 'A', 'B') + line(c, c + 180, 'C', 'D');
      html += label(OX, OY, (c + 180) / 2, 46, `${a}°`, RED, 11) + label(OX, OY, 360 - a / 2, 46, `${a}°`, RED, 11);
      if (a !== 90) html += label(OX, OY, c / 2, 40, `${180 - a}°`, BLUE, 11) + label(OX, OY, 180 + (180 - a) / 2, 40, `${180 - a}°`, BLUE, 11);
      else html += rightMark(OX, OY, 0) + rightMark(OX, OY, 90) + rightMark(OX, OY, 180) + rightMark(OX, OY, 270);
      html += `<circle cx="${OX}" cy="${OY}" r="2.5" fill="${INK}"/><text x="${OX + 5}" y="${OY + 14}" font-size="12" fill="${INK}" stroke="#fff" stroke-width="3" paint-order="stroke">O</text>`;
      s.svg.innerHTML = html;
      val.textContent = `${a}°`;
      s.caption.textContent = a === 90
        ? '四个角都是 90°：AB⊥CD，垂直是相交的特殊情况'
        : `∠AOC=∠BOD=${a}°（对顶角相等），它们都等于 180°−∠BOC；两直线的夹角是 ${Math.min(a, 180 - a)}°`;
    }
    // 播放：从当前角度转到 150°、再转回 30°，经过 90° 时停一下
    const phases = () => [{ kind: 'go', from: ang, to: 90, dur: Math.abs(90 - ang) * 18 + 1 }, { kind: 'hold', dur: 900 }, { kind: 'go', from: 90, to: 150, dur: 1100 }, { kind: 'go', from: 150, to: 30, dur: 2200 }];
    s.frame = ms => {
      let a = ang;
      walk(phases(), ms, (p, f) => { if (p.kind === 'go') a = lerp(p.from, p.to, ease(f)); });
      draw(a);
      range.value = Math.round(a);
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(ang);
    return s;
  }

  // 三线八角与平行（16.2）：直线 a、b 被直线 l 所截。a 固定水平，b 绕它与 l 的交点转动（β 为 b 的倾斜角）
  // opts.kinds 可选 ['same', 'alt', 'inner']：同位角、内错角、同旁内角
  function parallelAngles(container, opts) {
    const W = 320, H = 230, L = 70;            // l 的方向
    const P1 = [170, 72], P2 = polar(170, 72, L + 180, 100);
    const kinds = opts.kinds || ['same', 'alt', 'inner'];
    const NAMES = { same: '同位角', alt: '内错角', inner: '同旁内角' };
    let kind = kinds[0], beta = opts.start != null ? opts.start : 20;
    const s = shell(container, {
      w: W, h: H, aria: '两条直线被第三条直线所截，同位角、内错角、同旁内角与平行的演示',
      controls: `<span class="demo-row"><span class="seg"></span></span><label class="demo-row"><span>转动 b</span><input type="range" min="-30" max="30" step="1"></label>`,
    });
    const range = s.box.querySelector('input');
    range.value = beta;
    range.addEventListener('input', () => { s.reset(); beta = Number(range.value); draw(beta); });
    segButtons(s.box.querySelector('.seg'), kinds.map(k => NAMES[k]), NAMES[kind], (v, i) => { kind = kinds[i]; s.reset(); draw(beta); });
    // 每种角在 P1、P2 处的两条边方向 [起, 止]（逆时针）和度数
    const pair = b => ({
      same: [[0, L], [b, L], L, L - b],
      alt: [[180, L + 180], [b, L], L, L - b],
      inner: [[L + 180, 360], [b, L], 180 - L, L - b],
    })[kind];
    function draw(b) {
      b = Math.round(b);
      const line = (p, d, r, name) => {
        const [x1, y1] = polar(p[0], p[1], d, r), [x2, y2] = polar(p[0], p[1], d + 180, r);
        const [lx, ly] = polar(p[0], p[1], d, r - 8);
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="2"/>` +
          `<text x="${(lx + (name === 'l' ? 10 : 0)).toFixed(1)}" y="${(ly - 7).toFixed(1)}" font-size="13" font-style="italic" fill="${INK}">${name}</text>`;
      };
      const [[a1, a2], [b1, b2], v1, v2] = pair(b);
      let html = '';
      html += wedge(P1[0], P1[1], a1, a2, 26, RED, 0.3) + wedge(P2[0], P2[1], b1, b2, 26, BLUE, 0.3);
      html += line(P1, 0, 140, 'a') + line(P2, b, 140, 'b') + line(P1, L, 70, '') + line(P2, L + 180, 50, 'l');
      html += label(P1[0], P1[1], (a1 + a2) / 2, 40, `${v1}°`, RED, 11) + label(P2[0], P2[1], (b1 + b2) / 2, 40, `${v2}°`, BLUE, 11);
      s.svg.innerHTML = html;
      const par = b === 0;
      const rel = kind === 'inner' ? `和为 ${v1 + v2}°` : v1 === v2 ? '相等' : '不相等';
      s.caption.textContent = `${NAMES[kind]}：红 ${v1}°，蓝 ${v2}°，${rel}` +
        (par ? `。a∥b！${kind === 'inner' ? '同旁内角互补' : `${NAMES[kind]}相等`}，两直线平行` : '；拖动或点「播放」转动 b');
    }
    const phases = () => [{ kind: 'go', from: beta, to: 0, dur: Math.abs(beta) * 70 + 300 }, { kind: 'hold', dur: 600 }];
    s.frame = ms => {
      let b = beta;
      walk(phases(), ms, (p, f) => { if (p.kind === 'go') b = lerp(p.from, p.to, ease(f)); });
      draw(b);
      range.value = Math.round(b);
      if (ms >= s.duration()) beta = 0;
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(beta);
    return s;
  }

  // ---------- 三角形（第 17 章） ----------
  // 屏幕坐标下点 p 处、从射线 p→q1 转到 p→q2（取小于平角的一侧）的扇形顶点列表
  function wedgePts(p, q1, q2, r) {
    let a1 = Math.atan2(q1[1] - p[1], q1[0] - p[0]), a2 = Math.atan2(q2[1] - p[1], q2[0] - p[0]);
    let d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    const pts = [p];
    for (let i = 0; i <= 16; i++) pts.push([p[0] + r * Math.cos(a1 + (d * i) / 16), p[1] + r * Math.sin(a1 + (d * i) / 16)]);
    return pts;
  }
  const polyAttr = pts => pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ');
  const angDeg = (p, q1, q2) => {
    const a = Math.atan2(q1[1] - p[1], q1[0] - p[0]) - Math.atan2(q2[1] - p[1], q2[0] - p[0]);
    let d = Math.abs((a * 180) / Math.PI) % 360;
    return d > 180 ? 360 - d : d;
  };

  // 三角形内角和（17.2）：∠A 绕 AC 中点转 180°（内错角），∠B 沿 BC 平移（同位角），都拼到点 C，与 ∠ACB 组成平角
  function angleSum(container, opts) {
    const W = 300, H = 200;
    const shapes = opts.shapes || [
      { name: '锐角三角形', A: [110, 40] },
      { name: '直角三角形', A: [95, 78] },
      { name: '钝角三角形', A: [175, 118] },
    ];
    const B = [40, 170], C = [250, 170];
    let A = shapes[0].A;
    const s = shell(container, { w: W, h: H, aria: '三角形三个内角拼成平角的演示', controls: '<span class="demo-row"><span class="seg"></span></span>' });
    segButtons(s.box.querySelector('.seg'), shapes.map(x => x.name), shapes[0].name, (v, i) => { A = shapes[i].A; s.reset(); draw(0, 0); s.caption.textContent = '点「播放」，把 ∠A、∠B 搬到点 C'; });
    const phases = [{ kind: 'wait', dur: 300 }, { kind: 'a', dur: 1500 }, { kind: 'wait', dur: 200 }, { kind: 'b', dur: 1500 }, { kind: 'line', dur: 600 }];
    function draw(fa, fb, fl = 0) {
      const M = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
      const r = 26;
      const wa = wedgePts(A, B, C, r).map(p => rotPt(p, M, 180 * ease(fa)));
      const wb = wedgePts(B, A, C, r).map(p => [p[0] + (C[0] - B[0]) * ease(fb), p[1] + (C[1] - B[1]) * ease(fb)]);
      const wc = wedgePts(C, A, B, r);
      let html = '';
      if (fl > 0) {
        // 过 C 且平行于 AB 的直线，以及 BC 的延长线
        const dx = A[0] - B[0], dy = A[1] - B[1], k = 0.3;
        html += `<g opacity="${fl.toFixed(2)}"><line x1="${(C[0] - dx * k).toFixed(1)}" y1="${(C[1] - dy * k).toFixed(1)}" x2="${(C[0] + dx * 0.7).toFixed(1)}" y2="${(C[1] + dy * 0.7).toFixed(1)}" stroke="${MUTED}" stroke-dasharray="5 4"/>` +
          `<line x1="${C[0]}" y1="${C[1]}" x2="${W - 4}" y2="${C[1]}" stroke="${MUTED}" stroke-dasharray="5 4"/></g>`;
      }
      html += `<polygon points="${polyAttr([A, B, C])}" fill="#fbf8f1" stroke="${INK}" stroke-width="1.8"/>`;
      html += `<polygon points="${polyAttr(wc)}" fill="${GREEN}" fill-opacity="0.35" stroke="${GREEN}"/>`;
      html += `<polygon points="${polyAttr(wa)}" fill="${RED}" fill-opacity="0.35" stroke="${RED}"/>`;
      html += `<polygon points="${polyAttr(wb)}" fill="${BLUE}" fill-opacity="0.35" stroke="${BLUE}"/>`;
      const lab = (p, t, dx, dy) => `<text x="${p[0] + dx}" y="${p[1] + dy}" font-size="13" font-weight="bold" fill="${INK}">${t}</text>`;
      html += lab(A, 'A', -4, -8) + lab(B, 'B', -14, 4) + lab(C, 'C', 4, 16);
      s.svg.innerHTML = html;
    }
    s.frame = ms => {
      let fa = 0, fb = 0, fl = 0;
      walk(phases, ms, (p, f) => {
        if (p.kind === 'a') fa = f;
        if (p.kind === 'b') fb = f;
        if (p.kind === 'line') fl = f;
      });
      draw(fa, fb, fl);
      const a = Math.round(angDeg(A, B, C)), b = Math.round(angDeg(B, A, C)), c = 180 - a - b;
      s.caption.textContent = fl > 0
        ? `∠A=${a}°，∠B=${b}°，∠C=${c}°，三个角在点 C 拼成一个平角：${a}°+${b}°+${c}°=180°。虚线平行于 AB，这正是证明里添的辅助线`
        : fb > 0 ? '∠B 沿 BC 方向平移到点 C（同位角相等）' : fa > 0 ? '∠A 绕 AC 的中点转 180°，落到点 C 旁边（内错角相等）' : '点「播放」，把 ∠A、∠B 搬到点 C';
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(0, 0);
    s.caption.textContent = '点「播放」，把 ∠A、∠B 搬到点 C';
    return s;
  }

  // “边边角”不能判定全等（17.4）：∠A 和 AB 固定，BC 绕 B 摆动，以 B 为圆心的圆与射线交于两点
  function ssaSwing(container, opts) {
    const W = 270, H = 200, u = 28;
    const angA = opts.angle || 40, c = opts.c || 6, a = opts.a || 4.5;
    const A = [30, 175], B = [30 + c * u, 175];
    const dir = [Math.cos((angA * Math.PI) / 180), -Math.sin((angA * Math.PI) / 180)];
    const m = c * Math.cos((angA * Math.PI) / 180), disc = Math.sqrt(m * m - c * c + a * a);
    const at = t => [A[0] + dir[0] * t * u, A[1] + dir[1] * t * u];
    const C1 = at(m - disc), C2 = at(m + disc);
    const s = shell(container, { w: W, h: H, aria: '两边及其中一边的对角对应相等时三角形不唯一的演示' });
    const a1 = Math.atan2(C1[1] - B[1], C1[0] - B[0]), a2 = Math.atan2(C2[1] - B[1], C2[0] - B[0]);
    const phases = [{ kind: 'wait', dur: 300 }, { kind: 'show1', dur: 700 }, { kind: 'hold', dur: 700 }, { kind: 'swing', dur: 1600 }, { kind: 'both', dur: 700 }];
    function draw(f, both, cap) {
      const ang = a1 + (a2 - a1) * ease(f);
      const Cp = [B[0] + a * u * Math.cos(ang), B[1] + a * u * Math.sin(ang)];
      let html = `<circle cx="${B[0]}" cy="${B[1]}" r="${a * u}" fill="none" stroke="${MUTED}" stroke-dasharray="4 4"/>`;
      const far = at(9);
      html += `<line x1="${A[0]}" y1="${A[1]}" x2="${far[0].toFixed(1)}" y2="${far[1].toFixed(1)}" stroke="${INK}" stroke-width="1.4"/>`;
      if (both) html += `<polygon points="${polyAttr([A, B, C1])}" fill="${BLUE}" fill-opacity="0.2" stroke="${BLUE}" stroke-width="1.6"/>`;
      html += `<polygon points="${polyAttr([A, B, Cp])}" fill="${RED}" fill-opacity="0.2" stroke="${RED}" stroke-width="1.8"/>`;
      html += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${INK}" stroke-width="2.2"/>`;
      html += `<text x="${A[0] - 12}" y="${A[1] + 4}" font-size="13" font-weight="bold">A</text><text x="${B[0] + 4}" y="${B[1] + 14}" font-size="13" font-weight="bold">B</text>`;
      html += `<text x="${(Cp[0] - 4).toFixed(1)}" y="${(Cp[1] - 8).toFixed(1)}" font-size="13" font-weight="bold" fill="${RED}">C</text>`;
      if (both) html += `<text x="${(C1[0] - 16).toFixed(1)}" y="${(C1[1] + 2).toFixed(1)}" font-size="13" font-weight="bold" fill="${BLUE}">C′</text>`;
      html += `<text x="${A[0] + 22}" y="${A[1] - 5}" font-size="11" fill="${INK}">${angA}°</text>`;
      s.svg.innerHTML = html;
      s.caption.textContent = cap;
    }
    s.frame = ms => {
      let f = 0, both = false, cap = `∠A=${angA}°，AB=${c}，BC=${a}：以 B 为圆心、${a} 为半径画弧，与射线交于两点`;
      walk(phases, ms, (p, t) => {
        if (p.kind === 'swing') { f = t; cap = 'BC 绕点 B 摆过去，长度不变，又碰到了射线'; }
        if (p.kind === 'both') { f = 1; both = true; cap = `两个三角形都满足 ∠A=${angA}°、AB=${c}、BC=${a}，却不全等：“边边角”不能判定全等`; }
      });
      draw(f, both, cap);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(0, false, `已知 ∠A=${angA}°、AB=${c}、BC=${a}（BC 是 ∠A 的对边），点「播放」看能画出几个三角形`);
    return s;
  }

  // ---------- 线段的垂直平分线（18.4） ----------
  // 线段 AB 水平，点 P 由两个滑块控制：沿垂直平分线的位置、离开垂直平分线的距离；实时显示 PA、PB（以格为单位）
  function perpBisector(container) {
    const W = 300, H = 230, u = 24, M = [150, 170];
    const A = [M[0] - 3 * u, M[1]], B = [M[0] + 3 * u, M[1]];
    let pos = 4, off = 0;
    const s = shell(container, {
      w: W, h: H, aria: '线段垂直平分线上的点到两端距离相等的演示',
      controls: '<label class="demo-row"><span>上下</span><input type="range" min="-1" max="6" step="0.5" data-k="pos"></label>' +
        '<label class="demo-row"><span>离开</span><input type="range" min="-3" max="3" step="0.5" data-k="off"></label>',
    });
    const [rPos, rOff] = s.box.querySelectorAll('input');
    rPos.value = pos; rOff.value = off;
    rPos.addEventListener('input', () => { s.reset(); pos = Number(rPos.value); draw(); });
    rOff.addEventListener('input', () => { s.reset(); off = Number(rOff.value); draw(); });
    function draw() {
      const P = [M[0] + off * u, M[1] - pos * u];
      const pa = Math.hypot(P[0] - A[0], P[1] - A[1]) / u, pb = Math.hypot(P[0] - B[0], P[1] - B[1]) / u;
      const on = Math.abs(off) < 1e-9;
      let html = `<line x1="${M[0]}" y1="${M[1] + 40}" x2="${M[0]}" y2="10" stroke="${GREEN}" stroke-width="1.6" stroke-dasharray="6 4"/>`;
      html += `<polyline points="${M[0] + 9},${M[1]} ${M[0] + 9},${M[1] - 9} ${M[0]},${M[1] - 9}" fill="none" stroke="${GREEN}"/>`;
      html += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${INK}" stroke-width="2.2"/>`;
      html += `<line x1="${P[0].toFixed(1)}" y1="${P[1].toFixed(1)}" x2="${A[0]}" y2="${A[1]}" stroke="${on ? BLUE : RED}" stroke-width="1.6"/>`;
      html += `<line x1="${P[0].toFixed(1)}" y1="${P[1].toFixed(1)}" x2="${B[0]}" y2="${B[1]}" stroke="${on ? BLUE : RED}" stroke-width="1.6"/>`;
      html += dot(A[0], A[1], INK, '', 1) + dot(B[0], B[1], INK, '', 1) + dot(P[0], P[1], on ? BLUE : RED, 'P', 1);
      html += `<text x="${A[0] - 12}" y="${A[1] + 5}" font-size="13" font-weight="bold">A</text><text x="${B[0] + 5}" y="${B[1] + 5}" font-size="13" font-weight="bold">B</text>`;
      html += `<text x="${M[0] - 4}" y="${M[1] + 16}" font-size="12">M</text><text x="${M[0] + 6}" y="22" font-size="12" fill="${GREEN}">l</text>`;
      s.svg.innerHTML = html;
      s.caption.textContent = on
        ? `P 在 AB 的垂直平分线 l 上：PA=${pa.toFixed(2)}，PB=${pb.toFixed(2)}，总是相等`
        : `P 离开了 l：PA=${pa.toFixed(2)}，PB=${pb.toFixed(2)}，不相等（P 靠近哪个端点，到哪个端点就近）`;
    }
    // 播放：P 沿 l 上下走一趟，再向右偏离又回来
    const phases = [{ k: 'pos', from: 4, to: -0.5, dur: 1600 }, { k: 'pos', from: -0.5, to: 5, dur: 1800 }, { k: 'off', from: 0, to: 2, dur: 900 }, { k: 'off', from: 2, to: 0, dur: 900 }];
    s.frame = ms => {
      walk(phases, ms, (p, f) => { const v = lerp(p.from, p.to, ease(f)); if (p.k === 'pos') pos = v; else off = Math.round(v * 100) / 100; });
      rPos.value = pos; rOff.value = off;
      draw();
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw();
    return s;
  }

  // ---------- 直角三角形（第 22 章） ----------
  // 屏幕坐标的小工具：p、q 为 [x, y]
  const f22 = v => v.toFixed(1);
  const num22 = v => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2));
  const unit22 = (p, q) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1; return [(q[0] - p[0]) / d, (q[1] - p[1]) / d]; };
  const dist22 = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
  const mid22 = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const dir22 = deg => [Math.cos((deg * Math.PI) / 180), -Math.sin((deg * Math.PI) / 180)];
  const add22 = (p, v, k = 1) => [p[0] + v[0] * k, p[1] + v[1] * k];
  // 点 p 在直线 PQ 上的垂足
  const foot22 = (p, P, Q) => {
    const d = unit22(P, Q), t = (p[0] - P[0]) * d[0] + (p[1] - P[1]) * d[1];
    return add22(P, d, t);
  };
  function ln22(p, q, color = INK, w = 2, dash = '') {
    return `<line x1="${f22(p[0])}" y1="${f22(p[1])}" x2="${f22(q[0])}" y2="${f22(q[1])}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''} stroke-linecap="round"/>`;
  }
  function tx22(p, t, dx = 0, dy = 0, color = INK, size = 13, weight = 'bold') {
    return `<text x="${f22(p[0] + dx)}" y="${f22(p[1] + dy)}" font-size="${size}" text-anchor="middle" fill="${color}" font-weight="${weight}" stroke="#fff" stroke-width="3" paint-order="stroke">${t}</text>`;
  }
  // 直角记号：顶点 V，两条边的单位方向 u1、u2
  function rt22(V, u1, u2, s = 9) {
    const p1 = add22(V, u1, s), p3 = add22(V, u2, s), p2 = add22(p1, u2, s);
    return `<polyline points="${polyAttr([p1, p2, p3])}" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
  }
  // 线段中点处的等长短划记号
  function tick22(p, q, color = INK, n = 1) {
    const m = mid22(p, q), d = unit22(p, q), nv = [-d[1], d[0]];
    let html = '';
    for (let i = 0; i < n; i++) {
      const c = add22(m, d, (i - (n - 1) / 2) * 4);
      html += ln22(add22(c, nv, -5), add22(c, nv, 5), color, 1.4);
    }
    return html;
  }
  const poly22 = (pts, color, op, sw = 1.4) => `<polygon points="${polyAttr(pts)}" fill="${color}" fill-opacity="${op}" stroke="${color}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const dot22 = (p, color = INK) => `<circle cx="${f22(p[0])}" cy="${f22(p[1])}" r="3" fill="${color}"/>`;

  // 直角三角形斜边上的中线等于斜边的一半（22.1）：AB 固定，C 在以 AB 为直径的半圆上，滑块控制 ∠A
  // opts.ab 斜边长（格，默认 6）
  function rtMedian(container, opts) {
    const W = 300, H = 192, ab = opts.ab || 6, R = 120, u = (2 * R) / ab;
    const D = [150, 165], A = [D[0] - R, D[1]], B = [D[0] + R, D[1]];
    let ang = opts.start || 45;
    const s = shell(container, {
      w: W, h: H, aria: '直角三角形斜边上的中线等于斜边一半的演示',
      controls: '<label class="demo-row"><span>∠A</span><input type="range" min="10" max="80" step="1"><b class="demo-val"></b></label>',
    });
    const range = s.box.querySelector('input'), val = s.box.querySelector('.demo-val');
    range.value = ang;
    range.addEventListener('input', () => { s.reset(); ang = Number(range.value); draw(ang); });
    function draw(a) {
      a = Math.round(a);
      const C = add22(D, dir22(2 * a), R);
      const half = num22(ab / 2);
      let html = `<path d="M${A[0]},${A[1]} A${R},${R} 0 0 1 ${B[0]},${B[1]}" fill="none" stroke="${MUTED}" stroke-dasharray="4 4"/>`;
      html += poly22([A, C, D], BLUE, a === 60 ? 0.32 : 0.13, 0) + poly22([B, C, D], RED, a === 30 ? 0.32 : 0.13, 0);
      html += `<polygon points="${polyAttr(wedgePts(A, B, C, 26))}" fill="${INK}" fill-opacity="0.12" stroke="${INK}" stroke-width="0.8"/>`;
      html += ln22(A, B, INK, 2.2) + ln22(A, C, INK, 2.2) + ln22(B, C, INK, 2.2) + ln22(C, D, GREEN, 2);
      html += rt22(C, unit22(C, A), unit22(C, B), 10);
      html += tick22(A, D) + tick22(D, B) + tick22(C, D, GREEN);
      html += dot22(D) + dot22(C);
      const lm = dir22(a + 4);
      html += tx22(A, `${a}°`, lm[0] * 40 + 4, lm[1] * 40 + 4, INK, 11);
      html += tx22(mid22(A, D), half, 0, 18, BLUE, 12) + tx22(mid22(D, B), half, 0, 18, RED, 12);
      const cm = mid22(C, D), cn = dir22(2 * a + 90);
      html += tx22(cm, half, cn[0] * 17, cn[1] * 17 + 4, GREEN, 12);
      html += tx22(A, 'A', -10, 5) + tx22(B, 'B', 10, 5) + tx22(D, 'D', 0, 18);
      const cd = dir22(2 * a);
      html += tx22(C, 'C', cd[0] * 13, cd[1] * 13 + 4);
      s.svg.innerHTML = html;
      val.textContent = `${a}°`;
      s.caption.textContent = a === 30
        ? `∠A=30°，∠B=60°，DB=DC，所以 △BCD 是等边三角形：BC=CD=AB 的一半=${half}`
        : a === 60
          ? `∠A=60°，DA=DC，所以 △ACD 是等边三角形：AC=CD=AB 的一半=${half}`
          : `∠ACB=90°，D 是斜边 AB 的中点：CD=AD=BD=${half}，△ACD、△BCD 都是等腰三角形（∠ACD=∠A=${a}°）`;
    }
    // 播放：扫到 80°，再扫到 30° 停一下，最后扫到 10° 再回到 45°
    const phases = () => [{ kind: 'go', from: ang, to: 80, dur: 1300 }, { kind: 'go', from: 80, to: 30, dur: 2000 }, { kind: 'hold', dur: 1600 }, { kind: 'go', from: 30, to: 10, dur: 900 }, { kind: 'go', from: 10, to: 45, dur: 1400 }];
    s.frame = ms => {
      let a = ang;
      walk(phases(), ms, (p, f) => { if (p.kind === 'go') a = lerp(p.from, p.to, ease(f)); });
      draw(a);
      range.value = Math.round(a);
      if (ms >= s.duration()) ang = 45;
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(ang);
    return s;
  }

  // 斜边、直角边判定直角三角形全等（22.2）：画 AC → 过 C 作垂线 MN → 以 A 为圆心、斜边长为半径画弧交 MN 于 B、B′ → 翻折重合
  // opts.b 直角边（默认 3），opts.c 斜边（默认 5）
  function hlCongruent(container, opts) {
    const W = 300, H = 230;
    const b = opts.b || 3, c = opts.c > b ? opts.c : Math.max(5, b + 2), a = Math.sqrt(c * c - b * b);
    const u = Math.min(26, 196 / (2 * a + 1.8), 190 / b);
    const A = [60, H / 2], C = [60 + b * u, H / 2];
    const B = [C[0], C[1] - a * u], B2 = [C[0], C[1] + a * u];
    const M = [C[0], C[1] - (a + 0.9) * u], N = [C[0], C[1] + (a + 0.9) * u];
    const phi = (Math.atan2(a, b) * 180) / Math.PI;
    const s = shell(container, { w: W, h: H, aria: '斜边和一条直角边对应相等的两个直角三角形全等的演示' });
    const phases = [{ k: 'wait', dur: 300 }, { k: 'ac', dur: 800 }, { k: 'mn', dur: 800 }, { k: 'arc', dur: 1300 }, { k: 'tri', dur: 900 }, { k: 'wait', dur: 500 }, { k: 'fold', dur: 1600 }, { k: 'done', dur: 400 }];
    const CAP = {
      start: `直角边 AC=${b}，斜边 ${c}：点「播放」看看能画出几个直角三角形`,
      ac: `先画直角边 AC=${b}`,
      mn: '过点 C 作 AC 的垂线 MN，∠ACM=90°',
      arc: `以 A 为圆心、${c} 为半径画弧，交 MN 于 B、B′ 两点`,
      tri: `连接 AB、AB′：Rt△ABC 和 Rt△AB′C 的斜边都是 ${c}，直角边 AC 公用`,
      fold: '把 △AB′C 沿 AC 翻折上去……',
      done: '完全重合！斜边和一条直角边对应相等的两个直角三角形全等',
    };
    function draw(fr, cap) {
      let html = '';
      const fold = ease(fr.fold);
      const Bf = [B2[0], C[1] + (B2[1] - C[1]) * Math.cos(Math.PI * fold)];
      if (fr.mn > 0) {
        const e = ease(fr.mn);
        html += ln22(add22(C, [0, -1], (C[1] - M[1]) * e), add22(C, [0, 1], (N[1] - C[1]) * e), MUTED, 1.4);
        if (fr.mn >= 1) html += tx22(M, 'M', -11, 8, MUTED, 12) + tx22(N, 'N', -11, 4, MUTED, 12) + rt22(C, [-1, 0], [0, -1], 9);
      }
      if (fr.arc > 0) {
        const pts = [], from = -(phi + 14), to = phi + 14;
        for (let i = 0; i <= 40; i++) pts.push(add22(A, dir22(lerp(from, lerp(from, to, ease(fr.arc)), i / 40)), c * u));
        html += `<polyline points="${polyAttr(pts)}" fill="none" stroke="${GREEN}" stroke-width="1.4" stroke-dasharray="5 4"/>`;
      }
      if (fr.tri > 0) {
        const op = ease(fr.tri);
        html += `<g opacity="${op.toFixed(2)}">` + poly22([A, B, C], BLUE, 0.18, 1.8) + poly22([A, Bf, C], RED, 0.18, 1.8);
        html += tx22(mid22(A, B), num22(c), -8, -6, BLUE, 12);
        if (fold < 0.05) html += tx22(mid22(A, B2), num22(c), -8, 16, RED, 12);
        html += '</g>';
      }
      if (fr.ac > 0) {
        html += ln22(A, add22(A, [1, 0], b * u * ease(fr.ac)), INK, 2.4);
        html += tx22(A, 'A', -11, 5);
        if (fr.ac >= 1) html += tx22(C, 'C', 11, 15) + tx22(mid22(A, C), num22(b), 0, fr.tri > 0 && fold < 0.5 ? -6 : 16, INK, 12);
      }
      if (fr.arc >= 1) {
        html += dot22(B, BLUE) + tx22(B, 'B', 12, 0, BLUE);
        html += dot22(Bf, RED) + tx22(Bf, 'B′', 13, fold > 0.5 ? 16 : 8, RED);
      }
      s.svg.innerHTML = html;
      s.caption.textContent = cap;
    }
    s.frame = ms => {
      const fr = { ac: 0, mn: 0, arc: 0, tri: 0, fold: 0 };
      let cap = CAP.start;
      walk(phases, ms, (p, f) => {
        if (p.k in fr) fr[p.k] = f;
        if (CAP[p.k]) cap = CAP[p.k];
      });
      draw(fr, cap);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw({ ac: 1, mn: 1, arc: 1, tri: 1, fold: 0 }, CAP.start);
    return s;
  }

  // 梯子下滑（22.1 斜边中线的应用）：墙角 O，梯子 AB 下滑，中点 M 到 O 的距离始终是梯长的一半
  // opts.len 梯长（默认 10），opts.start 底端到墙的初始距离（默认梯长的 0.6）
  function ladderSlide(container, opts) {
    const W = 300, H = 232, len = opts.len || 10, O = [52, 208], u = 172 / len;
    const x0 = opts.start || len * 0.6, lo0 = len * 0.1, hi0 = len * 0.95;
    const top = x => Math.sqrt(Math.max(0, len * len - x * x));
    let x = x0, lo = x0, hi = x0;
    const s = shell(container, {
      w: W, h: H, aria: '梯子下滑时中点到墙角距离不变的演示',
      controls: `<label class="demo-row"><span>底端到墙</span><input type="range" min="${lo0}" max="${hi0}" step="${len / 200}"><b class="demo-val"></b></label>`,
    });
    const range = s.box.querySelector('input'), val = s.box.querySelector('.demo-val');
    range.value = x;
    range.addEventListener('input', () => { s.reset(); x = Number(range.value); draw(x); });
    const mAt = v => [O[0] + (v / 2) * u, O[1] - (top(v) / 2) * u];
    function draw(v) {
      lo = Math.min(lo, v); hi = Math.max(hi, v);
      const A = [O[0], O[1] - top(v) * u], B = [O[0] + v * u, O[1]], M = mid22(A, B);
      const A0 = [O[0], O[1] - top(x0) * u], B0 = [O[0] + x0 * u, O[1]];
      const r = (len / 2) * u;
      let html = '';
      for (let y = O[1] - 4; y > 14; y -= 14) html += ln22([O[0], y], [O[0] - 8, y + 8], MUTED, 1);
      for (let xx = O[0] + 10; xx < W - 4; xx += 14) html += ln22([xx, O[1]], [xx - 8, O[1] + 8], MUTED, 1);
      html += ln22([O[0], O[1]], [O[0], 10], INK, 2.4) + ln22(O, [W - 6, O[1]], INK, 2.4);
      html += `<path d="M${f22(O[0] + r)},${O[1]} A${f22(r)},${f22(r)} 0 0 0 ${O[0]},${f22(O[1] - r)}" fill="none" stroke="${MUTED}" stroke-dasharray="3 4"/>`;
      const trace = [];
      for (let i = 0; i <= 40; i++) trace.push(mAt(lerp(lo, hi, i / 40)));
      html += `<polyline points="${polyAttr(trace)}" fill="none" stroke="${RED}" stroke-width="2" stroke-opacity="0.6"/>`;
      if (Math.abs(v - x0) > 1e-6) html += ln22(A0, B0, MUTED, 2, '6 4');
      html += ln22(O, M, GREEN, 2) + tick22(O, M, GREEN);
      html += ln22(A, B, ROPE, 5) + tick22(A, M) + tick22(M, B);
      html += dot22(M, RED) + dot22(A) + dot22(B);
      html += tx22(A, 'A', -11, 5) + tx22(B, 'B', 0, 20) + tx22(O, 'O', -11, 16) + tx22(M, 'M', 11, -6, RED);
      html += tx22(mid22(O, M), num22(len / 2), -9, -2, GREEN, 12);
      html += tx22(mid22(A, M), num22(len / 2), 10, 2, ROPE, 11);
      html += tx22(mid22(M, B), num22(len / 2), 10, 2, ROPE, 11);
      s.svg.innerHTML = html;
      val.textContent = v.toFixed(2);
      const drop = top(x0) - top(v), out = v - x0;
      const head = `OM=${num22(len / 2)}，始终是梯长 ${num22(len)} 的一半（斜边上的中线），M 在以 O 为圆心的圆弧上`;
      s.caption.textContent = Math.abs(out) < 1e-6
        ? `${head}。拖动滑块或点「播放」，让梯子滑动`
        : out > 0
          ? `${head}。与开始相比：顶端下降 ${drop.toFixed(2)}，底端滑出 ${out.toFixed(2)}`
          : `${head}。与开始相比：顶端升高 ${(-drop).toFixed(2)}，底端向墙移近 ${(-out).toFixed(2)}`;
    }
    // 播放：从初始位置滑到底，停一下，再推回竖直附近，最后回到初始位置
    const phases = () => [{ kind: 'go', from: x, to: hi0, dur: 2200 }, { kind: 'hold', dur: 600 }, { kind: 'go', from: hi0, to: lo0, dur: 2600 }, { kind: 'go', from: lo0, to: x0, dur: 1400 }];
    s.frame = ms => {
      let v = x;
      walk(phases(), ms, (p, f) => { if (p.kind === 'go') v = lerp(p.from, p.to, ease(f)); });
      draw(v);
      range.value = v;
      if (ms >= s.duration()) x = x0;
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(x);
    return s;
  }

  // 角平分线上的点到角两边距离相等（22.3）：点 P 由两个滑块控制（沿平分线、离开平分线），PD⊥OA、PE⊥OB
  // opts.angle 初始角度（默认 60），按钮可换 40°、60°、100°、150°
  function bisectorDist(container, opts) {
    const W = 320, H = 230;
    const angles = [40, 60, 100, 150];
    let alpha = opts.angle || 60, pos = 4.5, off = 0;
    if (!angles.includes(alpha)) angles.push(alpha), angles.sort((p, q) => p - q);
    const s = shell(container, {
      w: W, h: H, aria: '角平分线上的点到角两边距离相等的演示',
      controls: '<span class="demo-row"><span class="seg"></span></span>' +
        '<label class="demo-row"><span>沿平分线</span><input type="range" min="1" max="7" step="0.25"></label>' +
        '<label class="demo-row"><span>离开</span><input type="range" min="-2" max="2" step="0.25"></label>',
    });
    const [rPos, rOff] = s.box.querySelectorAll('input');
    rPos.value = pos; rOff.value = off;
    rPos.addEventListener('input', () => { s.reset(); pos = Number(rPos.value); draw(); });
    rOff.addEventListener('input', () => { s.reset(); off = Number(rOff.value); draw(); });
    segButtons(s.box.querySelector('.seg'), angles.map(v => `${v}°`), `${alpha}°`, (v, i) => { alpha = angles[i]; s.reset(); draw(); });
    // 从 O 沿方向 d 走多远会碰到画面边缘
    const reach = (O, d) => {
      let t = 400;
      if (d[0] > 1e-9) t = Math.min(t, (W - 10 - O[0]) / d[0]);
      if (d[0] < -1e-9) t = Math.min(t, (O[0] - 10) / -d[0]);
      if (d[1] < -1e-9) t = Math.min(t, (O[1] - 12) / -d[1]);
      return t;
    };
    function draw() {
      const O = alpha > 120 ? [196, 198] : alpha > 90 ? [178, 198] : [42, 198];
      const u = alpha <= 45 ? 33 : 24;   // 角小时放大，免得 P、D、E 挤在一起
      const ua = dir22(0), ub = dir22(alpha), ubis = dir22(alpha / 2), n = dir22(alpha / 2 + 90);
      const P = add22(add22(O, ubis, pos * u), n, off * u);
      const proj = d => ((P[0] - O[0]) * d[0] + (P[1] - O[1]) * d[1]) / u;
      const sA = proj(ua), sB = proj(ub);
      const Dp = add22(O, ua, sA * u), Ep = add22(O, ub, sB * u);
      const pd = dist22(P, Dp) / u, pe = dist22(P, Ep) / u;
      const on = Math.abs(off) < 1e-9;
      const th = (Math.atan2(-(P[1] - O[1]), P[0] - O[0]) * 180) / Math.PI;
      const inside = th > 0 && th < alpha;
      const LA = reach(O, ua), LB = reach(O, ub), LBis = reach(O, ubis);
      let html = wedge(O[0], O[1], 0, alpha / 2, 24, GREEN, 0.2) + wedge(O[0], O[1], alpha / 2, alpha, 24, GREEN, 0.2);
      html += ln22(O, add22(O, ubis, LBis), GREEN, 1.6, '6 4');
      if (sA < 0) html += ln22(O, add22(O, ua, (sA - 0.6) * u), MUTED, 1.4, '4 4');
      if (sB < 0) html += ln22(O, add22(O, ub, (sB - 0.6) * u), MUTED, 1.4, '4 4');
      html += ln22(O, add22(O, ua, LA), INK, 2.2) + ln22(O, add22(O, ub, LB), INK, 2.2);
      const cD = on ? BLUE : RED, cE = on ? BLUE : '#8a5cc2';
      if (pd > 0.05) html += rt22(Dp, sA < 0 ? [-1, 0] : [1, 0], unit22(Dp, P), 8);
      if (pe > 0.05) html += rt22(Ep, sB < 0 ? [-ub[0], -ub[1]] : ub, unit22(Ep, P), 8);
      html += ln22(P, Dp, cD, 2) + ln22(P, Ep, cE, 2);
      html += dot22(P, on ? BLUE : RED) + dot22(Dp) + dot22(Ep);
      // 长度标在线段远离 O 的一侧
      const lab = (p, q, t, color) => {
        const m = mid22(p, q), d = unit22(p, q);
        let nv = [-d[1], d[0]];
        if (nv[0] * (m[0] - O[0]) + nv[1] * (m[1] - O[1]) < 0) nv = [-nv[0], -nv[1]];
        return tx22(m, t, nv[0] * 16, nv[1] * 16 + 4, color, 12);
      };
      if (pd > 0.3) html += lab(P, Dp, pd.toFixed(2), cD);
      if (pe > 0.3) html += lab(Ep, P, pe.toFixed(2), cE);
      html += tx22(P, 'P', 0, -9, on ? BLUE : RED) + tx22(Dp, 'D', 0, 17) + tx22(Ep, 'E', -ub[1] * -12 - 8, 4);
      html += tx22(O, 'O', -9, 17) + tx22(add22(O, ua, LA), 'A', -6, 18) + tx22(add22(O, ub, LB), 'B', ub[0] < -0.5 ? 4 : 12, ub[0] < -0.5 ? -9 : 6);
      s.svg.innerHTML = html;
      s.caption.textContent = on
        ? `P 在 ∠AOB 的平分线上：PD=${pd.toFixed(2)}，PE=${pe.toFixed(2)}，到角两边的距离相等`
        : inside
          ? `P 离开了平分线：PD=${pd.toFixed(2)}，PE=${pe.toFixed(2)}，不相等（P 靠近哪条边，到哪条边就近）`
          : `P 跑到角的外面了：PD=${pd.toFixed(2)}，PE=${pe.toFixed(2)}，也不相等`;
    }
    // 播放：P 沿平分线走一趟，再向两侧偏离又回来
    const phases = [{ k: 'pos', from: 1.5, to: 6.5, dur: 2000 }, { k: 'pos', from: 6.5, to: 4.5, dur: 900 }, { k: 'off', from: 0, to: 1, dur: 800 }, { k: 'off', from: 1, to: -1, dur: 1400 }, { k: 'off', from: -1, to: 0, dur: 800 }];
    s.frame = ms => {
      walk(phases, ms, (p, f) => { const v = lerp(p.from, p.to, ease(f)); if (p.k === 'pos') pos = v; else off = Math.round(v * 100) / 100; });
      rPos.value = pos; rOff.value = off;
      draw();
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw();
    return s;
  }

  // 三角形三条角平分线交于一点，这点到三边距离相等（22.3）。不画内切圆
  // opts.shapes 可选：[{ name, A, B, C }]
  function incenter(container, opts) {
    const W = 310, H = 215, u = 25;
    const shapes = opts.shapes || [
      { name: '锐角三角形', A: [130, 28], B: [30, 195], C: [285, 195] },
      { name: '直角三角形', A: [48, 40], B: [48, 195], C: [280, 195] },
      { name: '钝角三角形', A: [85, 108], B: [25, 195], C: [290, 195] },
    ];
    let sh = shapes[0];
    const s = shell(container, { w: W, h: H, aria: '三角形三条角平分线交于一点、到三边距离相等的演示', controls: '<span class="demo-row"><span class="seg"></span></span>' });
    const START = '点「播放」，依次画出三条角平分线';
    segButtons(s.box.querySelector('.seg'), shapes.map(x => x.name), sh.name, (v, i) => { sh = shapes[i]; s.reset(); draw(FULL, START); });
    const phases = [{ k: 'wait', dur: 300 }, { k: 'bA', dur: 1000 }, { k: 'bB', dur: 1000 }, { k: 'bC', dur: 1000 }, { k: 'I', dur: 700 }, { k: 'perp', dur: 1300 }, { k: 'done', dur: 400 }];
    const FULL = { bA: 1, bB: 1, bC: 1, I: 1, perp: 1 };
    function draw(fr, cap) {
      const { A, B, C } = sh;
      const a = dist22(B, C), b = dist22(C, A), c = dist22(A, B), sum = a + b + c;
      const I = [(a * A[0] + b * B[0] + c * C[0]) / sum, (a * A[1] + b * B[1] + c * C[1]) / sum];
      // 每个顶点：角平分线与对边的交点
      const bis = (V, P, Q) => add22(P, unit22(P, Q), (dist22(P, Q) * dist22(V, P)) / (dist22(V, P) + dist22(V, Q)));
      const verts = [[A, B, C, RED, fr.bA], [B, C, A, BLUE, fr.bB], [C, A, B, GREEN, fr.bC]];
      let html = poly22([A, B, C], INK, 0.04, 2);
      for (const [V, P, Q, color, f] of verts) {
        if (f <= 0) continue;
        const F = bis(V, P, Q);
        const op = Math.min(1, f * 2).toFixed(2);
        html += `<g opacity="${op}">`;
        html += `<polygon points="${polyAttr(wedgePts(V, P, F, 20))}" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="0.8"/>`;
        html += `<polygon points="${polyAttr(wedgePts(V, F, Q, 20))}" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="0.8"/>`;
        html += '</g>';
        html += ln22(V, add22(V, unit22(V, F), dist22(V, F) * ease(f)), color, 1.5, '6 3');
      }
      const sides = [[B, C, 'D'], [C, A, 'E'], [A, B, 'F']];
      const r = dist22(I, foot22(I, B, C)) / u;
      if (fr.perp > 0) {
        for (const [P, Q, name] of sides) {
          const F = foot22(I, P, Q), e = ease(fr.perp);
          html += ln22(I, add22(I, unit22(I, F), dist22(I, F) * e), '#8a5cc2', 2.2);
          if (fr.perp >= 1) {
            html += rt22(F, unit22(F, Q), unit22(F, I), 7) + dot22(F);
            const out = unit22(I, F);
            html += tx22(F, name, out[0] * 12, out[1] * 12 + 4, INK, 12);
          }
        }
      }
      if (fr.I > 0) html += `<g opacity="${ease(fr.I).toFixed(2)}">${dot22(I, '#8a5cc2')}${tx22(I, 'I', 12, 16, '#8a5cc2')}</g>`;
      html += tx22(A, 'A', 0, -7) + tx22(B, 'B', -10, 5) + tx22(C, 'C', 10, 5);
      s.svg.innerHTML = html;
      s.caption.textContent = typeof cap === 'function' ? cap(r) : cap;
    }
    const CAP = {
      bA: '画 ∠A 的平分线：两个小角相等',
      bB: '再画 ∠B 的平分线，和 ∠A 的平分线交于一点',
      bC: '第三条：∠C 的平分线也经过这一点',
      I: '三条角平分线交于同一点，记作 I',
      perp: '从 I 向三边作垂线段 ID、IE、IF',
      done: r => `ID=IE=IF≈${r.toFixed(2)}：I 在 ∠A、∠B 的平分线上，所以到三边的距离都相等，因此也在 ∠C 的平分线上`,
    };
    s.frame = ms => {
      const fr = { bA: 0, bB: 0, bC: 0, I: 0, perp: 0 };
      let cap = START;
      walk(phases, ms, (p, f) => {
        if (p.k in fr) fr[p.k] = f;
        if (CAP[p.k]) cap = CAP[p.k];
      });
      draw(fr, cap);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(FULL, START);
    return s;
  }

  // 勾股定理的拼图证明（22.4 / 勾股定理）：两个边长 a+b 的正方形，左边四个直角三角形围出 c²，
  // 右边把三角形平移成两个长方形，剩下 a²、b²
  // opts.ratios：[[a, b], ...]，默认 3:4、1:2、2:3
  function pythagorasProof(container, opts) {
    const W = 310, H = 184, S = 128, L0 = [18, 26], R0 = [164, 26];
    const ratios = opts.ratios || [[3, 4], [1, 2], [2, 3]];
    let [a, b] = ratios[0];
    const s = shell(container, { w: W, h: H, aria: '用四个全等直角三角形拼图证明勾股定理的演示', controls: '<span class="demo-row"><span>a∶b</span><span class="seg"></span></span>' });
    segButtons(s.box.querySelector('.seg'), ratios.map(r => `${r[0]}:${r[1]}`), `${a}:${b}`, (v, i) => { [a, b] = ratios[i]; s.reset(); draw(DONE, endCap()); });
    const phases = [{ k: 'wait', dur: 500 }, { k: 'm1', dur: 1100 }, { k: 'm2', dur: 1100 }, { k: 'm3', dur: 1100 }, { k: 'show', dur: 800 }];
    const DONE = { m1: 1, m2: 1, m3: 1, show: 1 };
    const endCap = () => `两边都是大正方形去掉四个同样的直角三角形：左边剩 c²=${a * a + b * b}，右边剩 a²+b²=${a * a}+${b * b}，所以 a²+b²=c²`;
    const START = () => `两个大正方形边长都是 a+b=${a + b}；左边四个全等的直角三角形围出边长为 c 的正方形。点「播放」把右边的三角形挪一挪`;
    function draw(fr, cap) {
      const sz = a + b, k = S / sz;
      const at = (o, p) => [o[0] + p[0] * k, o[1] + p[1] * k];
      // 第一种摆法：四个角各一个三角形；平移量把它们挪成第二种摆法（T2 不动）
      const tris = [
        { pts: [[0, 0], [a, 0], [0, b]], mv: [0, a], f: 'm2' },
        { pts: [[sz, 0], [a, 0], [sz, a]], mv: [0, 0], f: null },
        { pts: [[sz, sz], [sz, a], [b, sz]], mv: [-b, 0], f: 'm3' },
        { pts: [[0, sz], [b, sz], [0, b]], mv: [a, -b], f: 'm1' },
      ];
      const sq = o => `<rect x="${o[0]}" y="${o[1]}" width="${S}" height="${S}" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
      let html = sq(L0) + sq(R0);
      const inner = [[a, 0], [sz, a], [b, sz], [0, b]];
      html += poly22(inner.map(p => at(L0, p)), GREEN, 0.25, 0);
      const ctrL = at(L0, [sz / 2, sz / 2]);
      html += tx22(ctrL, `c²=${a * a + b * b}`, 0, 4, GREEN, 12);
      const green = 1 - ease(fr.m1);
      if (green > 0) html += `<g opacity="${green.toFixed(2)}">${poly22(inner.map(p => at(R0, p)), GREEN, 0.25, 0)}</g>`;
      if (fr.show > 0) {
        const e = ease(fr.show).toFixed(2);
        html += `<g opacity="${e}"><rect x="${f22(R0[0])}" y="${f22(R0[1])}" width="${f22(a * k)}" height="${f22(a * k)}" fill="${RED}" fill-opacity="0.25"/>` +
          `<rect x="${f22(R0[0] + a * k)}" y="${f22(R0[1] + a * k)}" width="${f22(b * k)}" height="${f22(b * k)}" fill="${BLUE}" fill-opacity="0.25"/>` +
          tx22(at(R0, [a / 2, a / 2]), `a²=${a * a}`, 0, 4, RED, a * k < 50 ? 10 : 12) + tx22(at(R0, [a + b / 2, a + b / 2]), `b²=${b * b}`, 0, 4, BLUE, 12) + '</g>';
      }
      for (const t of tris) {
        html += poly22(t.pts.map(p => at(L0, p)), ROPE, 0.3, 1.2).replace(`stroke="${ROPE}"`, `stroke="${INK}"`);
        const e = t.f ? ease(fr[t.f]) : 0;
        html += poly22(t.pts.map(p => at(R0, [p[0] + t.mv[0] * e, p[1] + t.mv[1] * e])), ROPE, 0.3, 1.2).replace(`stroke="${ROPE}"`, `stroke="${INK}"`);
      }
      // 左边标 a、b、c
      html += tx22(at(L0, [a / 2, 0]), 'a', 0, -5, RED, 12) + tx22(at(L0, [a + b / 2, 0]), 'b', 0, -5, BLUE, 12);
      html += tx22(at(L0, [0, b / 2]), 'b', -9, 4, BLUE, 12) + tx22(at(L0, [0, b + a / 2]), 'a', -9, 4, RED, 12);
      const hc = at(L0, [a / 2, b / 2]), nv = unit22(at(L0, [0, 0]), hc);
      html += tx22(hc, 'c', nv[0] * 9, nv[1] * 9 + 4, GREEN, 12);
      if (fr.show > 0) {
        html += `<g opacity="${ease(fr.show).toFixed(2)}">` + tx22(at(R0, [a / 2, 0]), 'a', 0, -5, RED, 12) + tx22(at(R0, [a + b / 2, 0]), 'b', 0, -5, BLUE, 12) +
          tx22(at(R0, [sz, a / 2]), 'a', 9, 4, RED, 12) + tx22(at(R0, [sz, a + b / 2]), 'b', 9, 4, BLUE, 12) + '</g>';
      }
      html += tx22([L0[0] + S / 2, L0[1] + S], '拼法一', 0, 18, MUTED, 12, 'normal') + tx22([R0[0] + S / 2, R0[1] + S], '拼法二', 0, 18, MUTED, 12, 'normal');
      s.svg.innerHTML = html;
      s.caption.textContent = cap;
    }
    s.frame = ms => {
      const fr = { m1: 0, m2: 0, m3: 0, show: 0 };
      let cap = START();
      walk(phases, ms, (p, f) => {
        if (p.k in fr) fr[p.k] = f;
        if (p.k[0] === 'm') cap = '把右边的三角形平移：两个两个拼成长方形';
        if (p.k === 'show') cap = endCap();
      });
      draw(fr, cap);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(DONE, endCap());
    return s;
  }

  // 垂线段最短（直角三角形中斜边大于直角边）：P 在直线 l 外，Q 在 l 上移动，PH⊥l
  // opts.h 点 P 到 l 的距离（默认 4），opts.start Q 的初始位置（相对 H，默认 3）
  function perpShortest(container, opts) {
    const W = 300, H = 182, h = opts.h || 4, u = Math.min(28, 130 / h);
    const Hp = [150, 156], P = [150, 156 - h * u];
    let q = opts.start != null ? opts.start : 3;
    const s = shell(container, {
      w: W, h: H, aria: '直线外一点与直线上各点的连线中垂线段最短的演示',
      controls: '<label class="demo-row"><span>移动 Q</span><input type="range" min="-4.5" max="4.5" step="0.25"><b class="demo-val"></b></label>',
    });
    const range = s.box.querySelector('input'), val = s.box.querySelector('.demo-val');
    range.value = q;
    range.addEventListener('input', () => { s.reset(); q = Number(range.value); draw(q); });
    function draw(v) {
      v = Math.round(v * 100) / 100;
      const Q = [Hp[0] + v * u, Hp[1]];
      const pq = Math.hypot(v, h), at = Math.abs(v) < 1e-9;
      let html = ln22([8, Hp[1]], [W - 8, Hp[1]], INK, 2) + tx22([W - 12, Hp[1]], 'l', 0, -7, INK, 13, 'normal');
      if (!at) html += poly22([P, Hp, Q], RED, 0.12, 0);
      html += ln22(P, Hp, at ? BLUE : GREEN, 2, at ? '' : '6 4') + rt22(Hp, [1, 0], [0, -1], 9);
      if (!at) html += ln22(P, Q, RED, 2.2);
      html += dot22(P) + dot22(Hp) + dot22(Q, at ? BLUE : RED);
      html += tx22(P, 'P', 0, -9) + tx22(Hp, 'H', at ? -10 : (v > 0 ? -9 : 9), 18) + tx22(Q, 'Q', at ? 10 : 0, 18, at ? BLUE : RED);
      html += tx22(mid22(P, Hp), num22(h), v > 0 ? -12 : 12, 4, at ? BLUE : GREEN, 12);
      if (!at) { const m = mid22(P, Q), d = unit22(P, Q); html += tx22(m, num22(pq), d[1] * 14 * Math.sign(v), -d[0] * 14 * Math.sign(v) + 4, RED, 12); }
      s.svg.innerHTML = html;
      val.textContent = minus(num22(v));
      s.caption.textContent = at
        ? `Q 和垂足 H 重合：PQ=PH=${num22(h)}，这时最短（垂线段最短）`
        : `PQ=${num22(pq)} > PH=${num22(h)}：在 Rt△PHQ 中 ∠PHQ=90°，斜边 PQ 大于直角边 PH`;
    }
    // 播放：Q 从左走到右，最后停在 H
    const phases = [{ kind: 'go', from: null, to: -4, dur: 1300 }, { kind: 'go', from: -4, to: 4, dur: 2600 }, { kind: 'go', from: 4, to: 0, dur: 1400 }, { kind: 'hold', dur: 500 }];
    s.frame = ms => {
      let v = q;
      walk(phases, ms, (p, f) => { if (p.kind === 'go') v = lerp(p.from == null ? q : p.from, p.to, ease(f)); });
      draw(v);
      range.value = v;
      if (ms >= s.duration()) q = 0;
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(q);
    return s;
  }

  // ---------- 四边形（第 23 章） ----------
  const PURPLE23 = '#8a5cc2', ORANGE23 = '#d08a1e';
  const fmt23 = v => num22(Math.round(v * 100) / 100);
  const rad23 = d => (d * Math.PI) / 180;
  // 屏幕方向角（度，y 向下）规范到 (−180, 180]
  const norm23 = d => { while (d > 180) d -= 360; while (d <= -180) d += 360; return d; };
  const head23 = (p, q) => (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
  // 角 ∠PVQ 的扇形（取小于平角的一侧）
  const wedge23 = (V, P, Q, r, color, op = 0.28) => `<polygon points="${polyAttr(wedgePts(V, P, Q, r))}" fill="${color}" fill-opacity="${op}" stroke="${color}" stroke-width="0.8"/>`;
  // 角 ∠PVQ 的平分线方向（单位向量）
  const bis23 = (V, P, Q) => unit22([0, 0], add22(unit22(V, P), unit22(V, Q)));
  // 平行四边形 ABCD：AB 水平，∠A=ang，整体（外接矩形）中心在 (cx, cy)
  function pg23(ab, ad, ang, u, cx, cy) {
    const c = Math.cos(rad23(ang)), sn = Math.sin(rad23(ang));
    const xmin = Math.min(0, ad * c), xmax = Math.max(ab, ab + ad * c);
    const A = [cx - ((xmin + xmax) / 2) * u, cy + (ad * sn * u) / 2];
    const B = [A[0] + ab * u, A[1]], D = [A[0] + ad * c * u, A[1] - ad * sn * u];
    const C = [B[0] + D[0] - A[0], B[1] + D[1] - A[1]];
    return { A, B, C, D, O: mid22(A, C) };
  }
  // 顶点名字标在远离中心 O 的方向
  const vlab23 = (V, O, t, k = 13, color = INK) => { const d = unit22(O, V); return tx22(V, t, d[0] * k, d[1] * k + 4, color); };
  // 线段长度标在远离中心 O 的一侧
  const slab23 = (P, Q, O, t, color = INK, k = 12) => {
    const m = mid22(P, Q), d = unit22(P, Q);
    let nv = [-d[1], d[0]];
    if (nv[0] * (m[0] - O[0]) + nv[1] * (m[1] - O[1]) < 0) nv = [-nv[0], -nv[1]];
    return tx22(m, t, nv[0] * k, nv[1] * k + 4, color, 12);
  };

  // 多边形的外角和（23.1）：小箭头沿边走一圈，每到一个顶点转过一个外角，一共转 360°；再把多边形缩成一点，外角拼成周角
  // opts.sides 默认边数（3～6）
  function exteriorWalk(container, opts) {
    const W = 300, H = 220;
    const shapes = [
      { name: '三角形', pts: [[55, 185], [245, 168], [120, 42]] },
      { name: '四边形', pts: [[50, 172], [228, 192], [258, 78], [108, 42]] },
      { name: '五边形', pts: [[75, 192], [214, 194], [264, 112], [166, 30], [46, 96]] },
      { name: '六边形', pts: [[86, 194], [200, 198], [264, 140], [238, 58], [128, 30], [42, 112]] },
    ];
    let sh = shapes[Math.max(0, Math.min(3, (opts.sides || 3) - 3))];
    const COLORS = [RED, BLUE, GREEN, PURPLE23, ORANGE23, ROPE];
    const s = shell(container, { w: W, h: H, aria: '多边形外角和等于 360° 的演示', controls: '<span class="demo-row"><span class="seg"></span></span>' });
    // 每个顶点：进来的方向、出去的方向、转过的角（带符号）和外角的度数（取整后凑足 360）
    const info = () => {
      const P = sh.pts, n = P.length;
      const v = P.map((V, i) => {
        const hin = head23(P[(i + n - 1) % n], V), hout = head23(V, P[(i + 1) % n]);
        return { V, hin, hout, turn: norm23(hout - hin) };
      });
      const r = v.map(x => Math.round(Math.abs(x.turn)));
      let big = 0;
      r.forEach((x, i) => { if (x > r[big]) big = i; });
      r[big] += 360 - r.reduce((a, b) => a + b, 0);
      v.forEach((x, i) => { x.deg = r[i]; });
      return v;
    };
    const START = () => {
      const v = info();
      return `${sh.name}的外角：${v.map(x => `${x.deg}°`).join('+')}=360°。点「播放」，沿着边走一圈`;
    };
    segButtons(s.box.querySelector('.seg'), shapes.map(x => x.name), sh.name, (v, i) => { sh = shapes[i]; s.reset(); draw(FULL(), START()); });
    const FULL = () => ({ edge: sh.pts.map(() => 1), turn: sh.pts.map(() => 1), pos: null, heading: 0, shrink: 0 });
    const phases = () => {
      const n = sh.pts.length, ph = [{ k: 'wait', dur: 300 }];
      for (let i = 0; i < n; i++) ph.push({ k: 'm', i, dur: 750 }, { k: 't', i: (i + 1) % n, dur: 700 });
      ph.push({ k: 'hold', dur: 900 }, { k: 'shrink', dur: 1800 }, { k: 'end', dur: 400 });
      return ph;
    };
    function draw(st, cap) {
      const v = info(), P = sh.pts, n = P.length;
      const G = [P.reduce((a, p) => a + p[0], 0) / n, P.reduce((a, p) => a + p[1], 0) / n];
      const e = ease(st.shrink), k = 1 - e;
      const Q = P.map(p => [G[0] + (p[0] - G[0]) * k, G[1] + (p[1] - G[1]) * k]);
      let html = '';
      if (k > 0.02) {
        html += poly22(Q, INK, 0.05, 0) + `<polygon points="${polyAttr(Q)}" fill="none" stroke="${MUTED}" stroke-width="1.2"/>`;
        if (st.shrink === 0) st.edge.forEach((f, i) => { if (f > 0) html += ln22(P[i], [lerp(P[i][0], P[(i + 1) % n][0], f), lerp(P[i][1], P[(i + 1) % n][1], f)], INK, 2.4); });
      }
      const r = 24 + 34 * e;
      v.forEach((x, i) => {
        const f = st.turn[i];
        if (f <= 0) return;
        const V = Q[i], din = [Math.cos(rad23(x.hin)), Math.sin(rad23(x.hin))];
        const hd = x.hin + x.turn * f, dcur = [Math.cos(rad23(hd)), Math.sin(rad23(hd))];
        if (e < 1) html += `<g opacity="${(1 - e).toFixed(2)}">${ln22(V, add22(V, din, 34), MUTED, 1.2, '4 3')}</g>`;
        if (Math.abs(x.turn * f) > 0.5) html += wedge23(V, add22(V, din, 10), add22(V, dcur, 10), r, COLORS[i], 0.35);
        if (f >= 1) {
          const b = bis23(V, add22(V, din, 10), add22(V, dcur, 10));
          html += tx22(V, `${x.deg}°`, b[0] * lerp(r + 12, r * 0.62, e), b[1] * lerp(r + 12, r * 0.62, e) + 4, COLORS[i], 11);
        }
      });
      if (st.pos) {
        const d = [Math.cos(rad23(st.heading)), Math.sin(rad23(st.heading))], nv = [-d[1], d[0]];
        const tip = add22(st.pos, d, 10), b = add22(st.pos, d, -5);
        html += `<polygon points="${polyAttr([tip, add22(b, nv, 6), add22(b, nv, -6)])}" fill="${RED}" stroke="#fff" stroke-width="1"/>`;
      }
      if (k > 0.3) {
        const names = 'ABCDEF';
        Q.forEach((V, i) => { html += `<g opacity="${clamp01((k - 0.3) / 0.7).toFixed(2)}">${vlab23(V, G, names[i], 12, MUTED)}</g>`; });
      }
      if (e >= 1) html += dot22(G);
      s.svg.innerHTML = html;
      s.caption.textContent = cap;
    }
    s.frame = ms => {
      const v = info(), n = sh.pts.length;
      const st = { edge: sh.pts.map(() => 0), turn: sh.pts.map(() => 0), pos: sh.pts[0], heading: v[0].hout, shrink: 0 };
      let cap = '箭头从 A 出发，沿着边往前走';
      walk(phases(), ms, (p, f) => {
        if (p.k === 'm') {
          const A = sh.pts[p.i], B = sh.pts[(p.i + 1) % n];
          st.edge[p.i] = ease(f);
          st.pos = [lerp(A[0], B[0], ease(f)), lerp(A[1], B[1], ease(f))];
          st.heading = v[p.i].hout;
        }
        if (p.k === 't') {
          st.turn[p.i] = ease(f);
          st.pos = sh.pts[p.i];
          st.heading = v[p.i].hin + v[p.i].turn * ease(f);
        }
        if (p.k === 'm' || p.k === 't') {
          let sum = 0;
          v.forEach((x, i) => { sum += st.turn[i] >= 1 ? x.deg : Math.round(x.deg * st.turn[i]); });
          cap = `每到一个顶点就转向，转过的就是这个顶点处的外角：已转 ${sum}°`;
        }
        if (p.k === 'hold') cap = `回到 A，方向和出发时一样，正好转了一整圈：${v.map(x => `${x.deg}°`).join('+')}=360°`;
        if (p.k === 'shrink' || p.k === 'end') { st.pos = null; st.shrink = f; cap = `把${sh.name}缩小到一点：${n} 个外角正好拼成一个周角，外角和是 360°，和边数无关`; }
      });
      draw(st, cap);
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(FULL(), START());
    return s;
  }

  // 平行四边形的性质（23.2）：滑块控制 AB、AD 和 ∠A，实时显示对边、对角、对角线被交点分成的两段
  // opts.ab、opts.ad（格）、opts.angle 初始值
  function parallelogramDrag(container, opts) {
    const W = 300, H = 176;
    let ab = opts.ab || 5, ad = opts.ad || 3, ang = opts.angle || 60;
    const s = shell(container, {
      w: W, h: H, aria: '平行四边形对边相等、对角相等、对角线互相平分的演示',
      controls: '<label class="demo-row"><span>AB</span><input type="range" min="3" max="7" step="0.5"><b class="demo-val"></b></label>' +
        '<label class="demo-row"><span>AD</span><input type="range" min="2" max="5" step="0.5"><b class="demo-val"></b></label>' +
        '<label class="demo-row"><span>∠A</span><input type="range" min="30" max="150" step="1"><b class="demo-val"></b></label>',
    });
    const [rAB, rAD, rAng] = s.box.querySelectorAll('input');
    const [vAB, vAD, vAng] = s.box.querySelectorAll('.demo-val');
    rAB.value = ab; rAD.value = ad; rAng.value = ang;
    rAB.addEventListener('input', () => { s.reset(); ab = Number(rAB.value); draw(ab, ad, ang); });
    rAD.addEventListener('input', () => { s.reset(); ad = Number(rAD.value); draw(ab, ad, ang); });
    rAng.addEventListener('input', () => { s.reset(); ang = Number(rAng.value); draw(ab, ad, ang); });
    function draw(x, y, a) {
      x = Math.round(x * 100) / 100; y = Math.round(y * 100) / 100; a = Math.round(a);
      // 图形尽量画大：按外接矩形的宽、高定比例（长度都用格数显示，不受缩放影响）
      const cs = Math.cos(rad23(a)), sn = Math.sin(rad23(a));
      const u = Math.min(34, 256 / (Math.max(x, x + y * cs) - Math.min(0, y * cs)), 132 / (y * sn));
      const { A, B, C, D, O } = pg23(x, y, a, u, W / 2, H / 2 + 2);
      let html = poly22([A, B, C, D], INK, 0.05, 0);
      html += wedge23(A, B, D, 17, RED) + wedge23(C, D, B, 17, RED) + wedge23(B, C, A, 17, BLUE) + wedge23(D, A, C, 17, BLUE);
      html += ln22(A, C, GREEN, 1.6, '5 3') + ln22(B, D, PURPLE23, 1.6, '5 3');
      html += tick22(A, O, GREEN) + tick22(O, C, GREEN) + tick22(B, O, PURPLE23, 2) + tick22(O, D, PURPLE23, 2);
      html += `<polygon points="${polyAttr([A, B, C, D])}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
      html += dot22(O) + tx22(O, 'O', 0, -7, INK, 12);
      const angLab = (V, P, Q, t, color) => { const b = bis23(V, P, Q); return tx22(V, t, b[0] * 31, b[1] * 31 + 4, color, 11); };
      html += angLab(A, B, D, `${a}°`, RED) + angLab(C, D, B, `${a}°`, RED) + angLab(B, C, A, `${180 - a}°`, BLUE) + angLab(D, A, C, `${180 - a}°`, BLUE);
      html += slab23(A, B, O, num22(x)) + slab23(D, C, O, num22(x)) + slab23(A, D, O, num22(y)) + slab23(B, C, O, num22(y));
      html += vlab23(A, O, 'A') + vlab23(B, O, 'B') + vlab23(C, O, 'C') + vlab23(D, O, 'D');
      s.svg.innerHTML = html;
      vAB.textContent = num22(x); vAD.textContent = num22(y); vAng.textContent = `${a}°`;
      const oa = dist22(A, O) / u, ob = dist22(B, O) / u;
      const note = a === 90 && x === y ? '（这时是正方形）' : a === 90 ? '（这时是矩形）' : x === y ? '（这时是菱形）' : '';
      s.caption.textContent = `AB=CD=${num22(x)}，AD=BC=${num22(y)}；∠A=∠C=${a}°，∠B=∠D=${180 - a}°；OA=OC=${fmt23(oa)}，OB=OD=${fmt23(ob)}${note}`;
    }
    // 播放：依次改变 AB、AD、∠A，各自变大、变小再回到原来的值
    const phases = () => [
      { k: 'ab', from: ab, to: 7, dur: 900 }, { k: 'ab', from: 7, to: 3, dur: 1300 }, { k: 'ab', from: 3, to: ab, dur: 800 },
      { k: 'ad', from: ad, to: 5, dur: 900 }, { k: 'ad', from: 5, to: 2, dur: 1200 }, { k: 'ad', from: 2, to: ad, dur: 800 },
      { k: 'ang', from: ang, to: 150, dur: 1300 }, { k: 'ang', from: 150, to: 30, dur: 2000 }, { k: 'ang', from: 30, to: ang, dur: 1100 },
    ];
    s.frame = ms => {
      const cur = { ab, ad, ang };
      walk(phases(), ms, (p, f) => { cur[p.k] = lerp(p.from, p.to, ease(f)); });
      draw(cur.ab, cur.ad, cur.ang);
      rAB.value = cur.ab; rAD.value = cur.ad; rAng.value = Math.round(cur.ang);
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw(ab, ad, ang);
    return s;
  }

  // 平行四边形 → 矩形、菱形、正方形（23.3）：按钮切换时夹角变到 90°、邻边变相等；画对角线，显示长度和夹角
  function quadFamily(container) {
    const W = 300, H = 200, u = 30;
    const T = [
      { name: '平行四边形', ab: 5, ad: 3, ang: 60 },
      { name: '有一个角是直角（矩形）', ab: 5, ad: 3, ang: 90 },
      { name: '邻边相等（菱形）', ab: 4, ad: 4, ang: 60 },
      { name: '两者都有（正方形）', ab: 4, ad: 4, ang: 90 },
    ];
    let cur = { ab: 5, ad: 3, ang: 60 }, rest = { ...cur }, tw = 0;
    const s = shell(container, { w: W, h: H, aria: '平行四边形、矩形、菱形、正方形的对角线性质演示', controls: '<span class="demo-row"><span class="seg"></span></span>' });
    const seg = s.box.querySelector('.seg');
    const markSeg = i => seg.querySelectorAll('button').forEach((b, j) => b.classList.toggle('selected', i === j));
    const mixState = (a, b, f) => ({ ab: lerp(a.ab, b.ab, f), ad: lerp(a.ad, b.ad, f), ang: lerp(a.ang, b.ang, f) });
    segButtons(seg, T.map(x => x.name), T[0].name, (v, i) => {
      s.reset();
      cancelAnimationFrame(tw);
      const from = { ...cur }, t0 = performance.now();
      rest = { ...T[i] };
      const step = now => {
        const f = clamp01((now - t0) / 900);
        cur = mixState(from, T[i], ease(f));
        draw();
        if (f < 1) tw = requestAnimationFrame(step);
      };
      tw = requestAnimationFrame(step);
    });
    function draw() {
      const right = Math.abs(cur.ang - 90) < 0.5, eq = Math.abs(cur.ab - cur.ad) < 0.02;
      const { A, B, C, D, O } = pg23(cur.ab, cur.ad, cur.ang, u, W / 2, 114);
      const ac = dist22(A, C) / u, bd = dist22(B, D) / u;
      const aob = angDeg(O, A, B), perp = Math.abs(aob - 90) < 0.5;
      let html = poly22([A, B, C, D], INK, 0.05, 0);
      if (eq) {
        html += wedge23(A, B, C, 20, RED, 0.25) + wedge23(A, C, D, 20, RED, 0.25) + wedge23(C, A, B, 20, RED, 0.25) + wedge23(C, D, A, 20, RED, 0.25);
        if (!right) html += wedge23(B, C, D, 16, BLUE, 0.25) + wedge23(B, D, A, 16, BLUE, 0.25) + wedge23(D, A, B, 16, BLUE, 0.25) + wedge23(D, B, C, 16, BLUE, 0.25);
        html += tick22(A, B) + tick22(B, C) + tick22(C, D) + tick22(D, A);
      }
      html += ln22(A, C, RED, 2) + ln22(B, D, BLUE, 2);
      html += `<polygon points="${polyAttr([A, B, C, D])}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
      if (right) [[A, B, D], [B, C, A], [C, D, B], [D, A, C]].forEach(([V, P, Q]) => { html += rt22(V, unit22(V, P), unit22(V, Q), 9); });
      else html += tx22(A, `${Math.round(cur.ang)}°`, bis23(A, B, D)[0] * 34, bis23(A, B, D)[1] * 34 + 4, INK, 11);
      if (perp) html += rt22(O, unit22(O, A), unit22(O, B), 8);
      else html += wedge23(O, A, B, 13, GREEN, 0.35);
      html += dot22(O) + vlab23(A, O, 'A') + vlab23(B, O, 'B') + vlab23(C, O, 'C') + vlab23(D, O, 'D');
      html += `<text x="${W / 2}" y="17" font-size="13" text-anchor="middle" font-weight="bold"><tspan fill="${RED}">AC=${fmt23(ac)}</tspan>　<tspan fill="${BLUE}">BD=${fmt23(bd)}</tspan>　<tspan fill="${GREEN}">∠AOB=${Math.round(aob)}°</tspan></text>`;
      s.svg.innerHTML = html;
      s.caption.textContent = right && eq
        ? '正方形：既是矩形又是菱形，对角线相等、互相垂直平分，每条对角线平分一组对角'
        : right
          ? `矩形：四个角都是直角，对角线相等（AC=BD=${fmt23(ac)}），并且互相平分`
          : eq
            ? '菱形：四条边相等，对角线互相垂直平分，每条对角线平分一组对角（同色的两个角相等）'
            : `平行四边形：对角线互相平分，但 AC=${fmt23(ac)}、BD=${fmt23(bd)} 不相等，也不垂直`;
    }
    // 播放：平行四边形 → 矩形 → 正方形 → 菱形 → 平行四边形，每种停一下
    const order = [1, 3, 2, 0];
    const phases = () => {
      const ph = [];
      let from = rest;
      for (const i of order) { ph.push({ k: 'go', from, to: T[i], i, dur: 1100 }, { k: 'hold', i, dur: 1300 }); from = T[i]; }
      return ph;
    };
    s.frame = ms => {
      cancelAnimationFrame(tw);
      let st = rest, sel = -1;
      walk(phases(), ms, (p, f) => {
        if (p.k === 'go') st = mixState(p.from, p.to, ease(f));
        if (p.k === 'hold') sel = p.i;
      });
      cur = st;
      if (sel >= 0) markSeg(sel);
      if (ms >= s.duration()) rest = { ...T[0] };
      draw();
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw();
    return s;
  }

  // 三角形中位线定理（23.4）：△ADE 绕 E 旋转 180° 到 △CFE，DBCF 是平行四边形，于是 DE∥BC、DE=½BC
  function midlineRotate(container) {
    const W = 310, H = 240, u = 28;
    const A = [80, 30], B = [36, 190], C = [260, 190];
    const D = mid22(A, B), E = mid22(A, C), F = [2 * E[0] - D[0], 2 * E[1] - D[1]];
    const de = dist22(D, E) / u, bc = dist22(B, C) / u;
    const s = shell(container, { w: W, h: H, aria: '用旋转证明三角形中位线定理的演示' });
    const START = `D、E 是 AB、AC 的中点：DE=${fmt23(de)}，BC=${fmt23(bc)}，DE∥BC。为什么？点「播放」看课本的证法`;
    const CAP = {
      de: 'D、E 分别是 AB、AC 的中点，连接 DE',
      rot: '把 △ADE 绕点 E 旋转 180°：EA=EC，A 落到 C；D 落到 F，D、E、F 在一条直线上，EF=DE',
      cf: 'CF=AD=DB，∠ECF=∠A，所以 CF∥AB：CF 和 DB 平行且相等',
      pg: '一组对边平行且相等的四边形是平行四边形：四边形 DBCF 是平行四边形',
      end: `所以 DF∥BC、DF=BC；DE 是 DF 的一半，于是 DE∥BC，DE=½BC=${fmt23(de)}`,
    };
    const phases = [{ k: 'wait', dur: 300 }, { k: 'de', dur: 900 }, { k: 'rot', dur: 2000 }, { k: 'hold', dur: 500 }, { k: 'cf', dur: 1400 }, { k: 'pg', dur: 1400 }, { k: 'end', dur: 1600 }];
    function draw(fr, cap) {
      let html = '';
      if (fr.pg > 0) html += `<g opacity="${ease(fr.pg).toFixed(2)}">${poly22([D, B, C, F], GREEN, 0.18, 0)}</g>`;
      html += poly22([A, D, E], RED, fr.rot > 0 ? 0.1 : 0.04, 0);
      if (fr.rot > 0) {
        const e = ease(fr.rot);
        const R = [A, D, E].map(p => rotPt(p, E, -180 * e));
        html += poly22(R, RED, 0.28, 1.4);
      }
      html += `<polygon points="${polyAttr([A, B, C])}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
      if (fr.cf > 0) {
        const o = ease(fr.cf).toFixed(2);
        html += `<g opacity="${o}">${ln22(D, B, BLUE, 3.2)}${ln22(C, F, BLUE, 3.2)}${tick22(A, D)}${tick22(D, B, BLUE)}${tick22(C, F, BLUE)}` +
          `${wedge23(A, B, C, 20, ORANGE23, 0.4)}${wedge23(C, A, F, 20, ORANGE23, 0.4)}</g>`;
      }
      if (fr.rot >= 1) html += ln22(E, F, GREEN, 2.2, '6 4') + dot22(F) + tx22(F, 'F', 10, 4);
      if (fr.pg > 0) html += `<g opacity="${ease(fr.pg).toFixed(2)}">${ln22(D, F, GREEN, 2.6)}${ln22(B, C, GREEN, 2.6)}</g>`;
      if (fr.de > 0) {
        html += ln22(D, add22(D, unit22(D, E), dist22(D, E) * ease(fr.de)), GREEN, 2.6);
        html += dot22(D) + dot22(E) + tx22(D, 'D', -11, 4) + tx22(E, 'E', 2, -9);
      }
      if (fr.lab) html += tx22(mid22(D, E), `DE=${fmt23(de)}`, 0, 17, GREEN, 12) + tx22(mid22(B, C), `BC=${fmt23(bc)}`, 0, 18, GREEN, 12);
      html += tx22(A, 'A', 0, -8) + tx22(B, 'B', -10, 5) + tx22(C, 'C', 10, 5);
      s.svg.innerHTML = html;
      s.caption.textContent = cap;
    }
    s.frame = ms => {
      const fr = { de: 0, rot: 0, cf: 0, pg: 0, lab: false };
      let cap = START;
      walk(phases, ms, (p, f) => {
        if (p.k in fr) fr[p.k] = f;
        if (CAP[p.k]) cap = CAP[p.k];
        if (p.k === 'end') fr.lab = true;
      });
      draw(fr, cap);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw({ de: 1, rot: 0, cf: 0, pg: 0, lab: true }, START);
    return s;
  }

  // 中点四边形（23.4 中位线的应用）：拖动任意四边形 ABCD 的顶点，四边中点 E、F、G、H 连成平行四边形；
  // 对角线相等时是菱形，互相垂直时是矩形，两者都有时是正方形。播放时顶点按预设路径走，经过这些特殊情况并停一下
  function varignon(container) {
    const W = 300, H = 244;
    const KEYS = [
      { A: [70, 52], B: [40, 182], C: [262, 204], D: [214, 40] },   // 一般
      { A: [60, 60], B: [50, 170], C: [240, 190], D: [237, 50] },   // 对角线相等 → 菱形
      { A: [44, 110], B: [130, 222], C: [244, 130], D: [150, 22] }, // 相等且垂直 → 正方形
      { A: [60, 112], B: [150, 205], C: [250, 112], D: [150, 35] }, // 垂直 → 矩形
    ];
    const NAMES = ['A', 'B', 'C', 'D'];
    const copy = k => ({ A: [...k.A], B: [...k.B], C: [...k.C], D: [...k.D] });
    let base = copy(KEYS[0]), cur = copy(base), drag = null;
    const s = shell(container, { w: W, h: H, aria: '任意四边形各边中点连成平行四边形的演示，可以拖动顶点' });
    s.svg.style.touchAction = 'none';
    s.svg.style.userSelect = 'none';
    const at = e => {
      const m = s.svg.getScreenCTM();
      if (!m) return [0, 0];
      const pt = s.svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const r = pt.matrixTransform(m.inverse());
      return [r.x, r.y];
    };
    s.svg.addEventListener('pointerdown', e => {
      const p = at(e);
      let best = null, bd = 26;
      for (const k of NAMES) { const d = dist22(p, cur[k]); if (d < bd) { bd = d; best = k; } }
      if (!best) return;
      s.reset();
      base = copy(cur);
      drag = best;
      e.preventDefault();
      try { s.svg.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
    });
    s.svg.addEventListener('pointermove', e => {
      if (!drag) return;
      const p = at(e);
      base[drag] = [Math.max(10, Math.min(W - 10, p[0])), Math.max(10, Math.min(H - 10, p[1]))];
      cur = copy(base);
      draw();
    });
    const up = () => { drag = null; };
    s.svg.addEventListener('pointerup', up);
    s.svg.addEventListener('pointercancel', up);
    function draw() {
      const { A, B, C, D } = cur;
      const E = mid22(A, B), F = mid22(B, C), G = mid22(C, D), Hm = mid22(D, A);
      const Ct = mid22(mid22(A, C), mid22(B, D));
      const ac = dist22(A, C) / 20, bd = dist22(B, D) / 20;
      const ang = angDeg([0, 0], [C[0] - A[0], C[1] - A[1]], [D[0] - B[0], D[1] - B[1]]);
      const eq = Math.abs(ac - bd) / Math.max(ac, bd) < 0.012, perp = Math.abs(ang - 90) < 1.5;
      const kind = eq && perp ? '正方形' : eq ? '菱形' : perp ? '矩形' : '平行四边形';
      let html = poly22([E, F, G, Hm], GREEN, eq || perp ? 0.3 : 0.18, 0);
      html += ln22(A, C, RED, 1.5, '5 4') + ln22(B, D, BLUE, 1.5, '5 4');
      html += `<polygon points="${polyAttr([A, B, C, D])}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
      html += ln22(E, F, RED, 2.2) + ln22(Hm, G, RED, 2.2) + ln22(E, Hm, BLUE, 2.2) + ln22(F, G, BLUE, 2.2);
      html += tick22(E, F, RED) + tick22(Hm, G, RED) + tick22(E, Hm, BLUE, 2) + tick22(F, G, BLUE, 2);
      if (perp) html += rt22(E, unit22(E, F), unit22(E, Hm), 8);
      [[E, 'E'], [F, 'F'], [G, 'G'], [Hm, 'H']].forEach(([p, t]) => { html += dot22(p, GREEN) + vlab23(p, Ct, t, 12, GREEN); });
      NAMES.forEach(k => {
        html += `<circle cx="${f22(cur[k][0])}" cy="${f22(cur[k][1])}" r="9" fill="${ORANGE23}" fill-opacity="0.22"/>` + dot22(cur[k], INK);
        html += vlab23(cur[k], Ct, k, 15);
      });
      s.svg.innerHTML = html;
      const head = `EF∥AC∥HG，EF=HG=½AC=${fmt23(ac / 2)}；EH∥BD∥FG，EH=FG=½BD=${fmt23(bd / 2)}：EFGH 是平行四边形`;
      s.caption.textContent = kind === '正方形'
        ? `${head}。对角线 AC=BD 且 AC⊥BD，EFGH 是正方形`
        : kind === '菱形'
          ? `${head}。对角线 AC=BD=${fmt23(ac)}，所以 EF=EH，EFGH 是菱形`
          : kind === '矩形'
            ? `${head}。对角线 AC⊥BD，所以 EF⊥EH，EFGH 是矩形`
            : `${head}。拖动 A、B、C、D 试试`;
    }
    const mixQ = (p, q, f) => { const r = {}; for (const k of NAMES) r[k] = [lerp(p[k][0], q[k][0], f), lerp(p[k][1], q[k][1], f)]; return r; };
    // 播放：回到一般位置 → 菱形 → 正方形 → 矩形 → 一般位置
    const phases = () => {
      const ph = [], seq = [0, 1, 2, 3, 0];
      let from = base;
      seq.forEach((i, j) => { ph.push({ k: 'go', from, to: KEYS[i], dur: j === 0 ? 800 : 1500 }, { k: 'hold', dur: j === 0 ? 400 : 1500 }); from = KEYS[i]; });
      return ph;
    };
    s.frame = ms => {
      let st = base;
      walk(phases(), ms, (p, f) => { if (p.k === 'go') st = mixQ(p.from, p.to, ease(f)); });
      cur = copy(st);
      if (ms >= s.duration()) base = copy(KEYS[0]);
      draw();
    };
    s.duration = () => totalOf(phases());
    s.reset();
    draw();
    return s;
  }

  // 三角形的重心（23.4 中位线的应用）：依次画三条中线，交于 G，AG∶GD=BG∶GE=CG∶GF=2∶1
  // opts.shapes 可选：[{ name, A, B, C }]
  function centroid(container, opts) {
    const W = 310, H = 215, u = 25;
    const shapes = opts.shapes || [
      { name: '锐角三角形', A: [120, 26], B: [28, 192], C: [286, 192] },
      { name: '直角三角形', A: [44, 32], B: [44, 192], C: [284, 192] },
      { name: '钝角三角形', A: [22, 34], B: [100, 192], C: [292, 192] },
    ];
    let sh = shapes[0];
    const s = shell(container, { w: W, h: H, aria: '三角形三条中线交于一点并把中线分成 2∶1 的演示', controls: '<span class="demo-row"><span class="seg"></span></span>' });
    const START = '点「播放」，依次画出三条中线';
    segButtons(s.box.querySelector('.seg'), shapes.map(x => x.name), sh.name, (v, i) => { sh = shapes[i]; s.reset(); draw(FULL, START); });
    const FULL = { mA: 1, mB: 1, mC: 1, G: 1, len: 1 };
    const phases = [{ k: 'wait', dur: 300 }, { k: 'mA', dur: 1000 }, { k: 'mB', dur: 1000 }, { k: 'mC', dur: 1000 }, { k: 'G', dur: 700 }, { k: 'len', dur: 1200 }, { k: 'done', dur: 400 }];
    function draw(fr, cap) {
      const { A, B, C } = sh;
      const G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
      const meds = [[A, mid22(B, C), 'A', 'D', RED, fr.mA, [B, C]], [B, mid22(C, A), 'B', 'E', BLUE, fr.mB, [C, A]], [C, mid22(A, B), 'C', 'F', GREEN, fr.mC, [A, B]]];
      let html = poly22([A, B, C], INK, 0.04, 2);
      for (const [V, M, , mn, color, f, [P, Q]] of meds) {
        if (f <= 0) continue;
        const o = Math.min(1, f * 3).toFixed(2);
        html += `<g opacity="${o}">${tick22(P, M, color)}${tick22(M, Q, color)}${dot22(M, color)}${vlab23(M, G, mn, 12, color)}</g>`;
        html += ln22(V, add22(V, unit22(V, M), dist22(V, M) * ease(f)), color, 2);
      }
      if (fr.G > 0) html += `<g opacity="${ease(fr.G).toFixed(2)}">${dot22(G, PURPLE23)}<circle cx="${f22(G[0])}" cy="${f22(G[1])}" r="6" fill="none" stroke="${PURPLE23}"/></g>`;
      if (fr.len > 0) {
        html += `<g opacity="${ease(fr.len).toFixed(2)}">`;
        for (const [V, M, , , color] of meds) {
          const d = unit22(V, M), nv = [-d[1], d[0]];
          const lab = (p, q, t) => tx22(mid22(p, q), t, nv[0] * 11, nv[1] * 11 + 4, color, 11);
          html += lab(V, G, fmt23(dist22(V, G) / u)) + lab(G, M, fmt23(dist22(G, M) / u));
        }
        html += '</g>';
      }
      if (fr.G > 0) html += `<g opacity="${ease(fr.G).toFixed(2)}">${tx22(G, 'G', -9, -7, PURPLE23)}</g>`;
      html += vlab23(A, G, 'A') + vlab23(B, G, 'B') + vlab23(C, G, 'C');
      s.svg.innerHTML = html;
      const len = (p, q) => fmt23(dist22(p, q) / u);
      const [ma, mb, mc] = meds.map(m => m[1]);
      s.caption.textContent = typeof cap === 'function'
        ? cap()
        : cap === START && fr.len >= 1
          ? `AG=${len(A, G)}，GD=${len(G, ma)}；BG=${len(B, G)}，GE=${len(G, mb)}；CG=${len(C, G)}，GF=${len(G, mc)}：都是 2∶1。${START}`
          : cap;
    }
    const CAP = {
      mA: '连接 A 和 BC 的中点 D：AD 是一条中线',
      mB: '再画中线 BE，和 AD 交于一点',
      mC: '第三条中线 CF 也经过这一点',
      G: '三条中线交于同一点 G，G 叫做三角形的重心',
      len: () => {
        const { A, B, C } = sh, G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
        const l = (p, q) => fmt23(dist22(p, q) / u);
        return `AG∶GD=${l(A, G)}∶${l(G, mid22(B, C))}=2∶1，BG∶GE=${l(B, G)}∶${l(G, mid22(C, A))}=2∶1，CG∶GF=${l(C, G)}∶${l(G, mid22(A, B))}=2∶1：重心把每条中线分成 2∶1`;
      },
    };
    s.frame = ms => {
      const fr = { mA: 0, mB: 0, mC: 0, G: 0, len: 0 };
      let cap = START;
      walk(phases, ms, (p, f) => {
        if (p.k in fr) fr[p.k] = f;
        if (CAP[p.k]) cap = CAP[p.k];
      });
      draw(fr, cap);
    };
    s.duration = () => totalOf(phases);
    s.reset();
    draw(FULL, START);
    return s;
  }

  const TYPES = { foldCut, numberLineFold, angleFold, ropeCut, motion, sweep, rotOverlap, billiard, scaleOrder, solutionSet, vertAngles, parallelAngles, angleSum, ssaSwing, perpBisector, rtMedian, hlCongruent, ladderSlide, bisectorDist, incenter, pythagorasProof, perpShortest, exteriorWalk, parallelogramDrag, quadFamily, midlineRotate, varignon, centroid };

  function mount(container, demo) {
    const make = TYPES[demo.type];
    return make ? make(container, demo) : null;
  }

  root.Demos = { mount, types: Object.keys(TYPES) };
})(this);
