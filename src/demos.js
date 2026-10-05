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

  const TYPES = { foldCut, numberLineFold, angleFold, ropeCut, motion, sweep, rotOverlap, billiard };

  function mount(container, demo) {
    const make = TYPES[demo.type];
    return make ? make(container, demo) : null;
  }

  root.Demos = { mount, types: Object.keys(TYPES) };
})(this);
