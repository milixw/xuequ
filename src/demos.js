'use strict';

// 题目演示动画：题目里写 demo: { type: 'foldCut', folds: 2 }，在解析里显示。依赖 DOM。

(function (root) {
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
  const clamp01 = t => Math.max(0, Math.min(1, t));

  // ---------- 绳子对折后剪一刀 ----------
  // 原绳放在 [0, 1] 上。每次对折把右半边翻到左半边上面，左端 X=0 始终是两个绳头所在的一端。
  const VIEW_W = 320, VIEW_H = 150, MARGIN = 40, D = VIEW_W - 2 * MARGIN;
  const BASE_Y = 118;       // 最底层绳子的纵坐标
  const GAP = 7;            // 层与层的间距（px）
  const ARC = 110;          // 翻折时弧线的高度系数
  const ZOOM = [1, 1.6, 2.4, 3.2];
  const SPREAD = 8;         // 展开后每段之间拉开的距离（px）
  const COLORS = ['#c0513a', '#2f6fd6', '#3f9a5a'];
  const ROPE = '#a8743a';

  // 原绳上的点 x，在“完成 k 次对折、第 k+1 次对折转到角度 th”时的位置（X 为绳长单位，Y 为 px）
  function place(x, k, th) {
    let X = x, Y = 0;
    const fold = (j, angle) => {
      const p = 1 / 2 ** (j + 1);
      if (X <= p) return;
      const yc = -(2 ** j - 0.5) * GAP;
      const dx = X - p, c = Math.cos(angle), s = Math.sin(angle);
      X = p + dx * c;
      Y = yc + (Y - yc) * c - s * dx * ARC;
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

  function foldCut(container, opts) {
    let folds = opts.folds || 2;
    let pos = 0.4;          // 剪的位置：折叠后宽度的比例（从绳头端量起）
    let raf = 0, start = 0;

    const box = document.createElement('div');
    box.className = 'demo';
    box.innerHTML =
      `<svg viewBox="0 0 ${VIEW_W} ${VIEW_H}" role="img" aria-label="绳子对折后剪一刀的演示"></svg>` +
      '<div class="demo-caption"></div>' +
      '<div class="demo-controls">' +
      '<div class="demo-row"><span>对折</span><div class="seg"></div><span>次</span></div>' +
      '<label class="demo-row"><span>剪的位置</span><input type="range" min="0.1" max="0.9" step="0.05"></label>' +
      '<button type="button" class="demo-play">▶ 播放</button>' +
      '</div>';
    container.appendChild(box);
    const svg = box.querySelector('svg');
    const caption = box.querySelector('.demo-caption');
    const seg = box.querySelector('.seg');
    const range = box.querySelector('input');
    const play = box.querySelector('.demo-play');
    range.value = pos;

    [1, 2, 3].forEach(n => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = n;
      b.addEventListener('click', () => {
        folds = n;
        reset();
      });
      seg.appendChild(b);
    });
    range.addEventListener('input', () => {
      pos = Number(range.value);
      reset();
    });
    play.addEventListener('click', () => {
      cancelAnimationFrame(raf);
      start = performance.now();
      play.textContent = '↻ 重播';
      raf = requestAnimationFrame(tick);
    });

    // 时间轴（毫秒）：逐次对折 → 剪刀落下 → 剪口张开 → 逐次展开 → 各段拉开并着色
    const FOLD = 900, PAUSE = 250, CUT = 900, OPEN = 300, UNFOLD = 800, SPREAD_T = 600;
    const phases = () => {
      const list = [];
      for (let j = 0; j < folds; j++) list.push({ kind: 'fold', j, dur: FOLD }, { kind: 'wait', dur: PAUSE });
      list.push({ kind: 'cut', dur: CUT }, { kind: 'open', dur: OPEN }, { kind: 'wait', dur: PAUSE });
      for (let j = folds - 1; j >= 0; j--) list.push({ kind: 'unfold', j, dur: UNFOLD });
      list.push({ kind: 'spread', dur: SPREAD_T });
      return list;
    };
    const total = () => phases().reduce((s, p) => s + p.dur, 0);

    // 时刻 ms 的画面状态
    function stateAt(ms) {
      const st = { k: 0, th: 0, cut: false, blade: 0, gap: 0, spread: 0, caption: '' };
      let t = ms;
      for (const p of phases()) {
        const f = clamp01(t / p.dur);
        if (p.kind === 'fold') {
          st.k = f < 1 ? p.j : p.j + 1;
          st.th = f < 1 ? Math.PI * ease(f) : 0;
          st.caption = `第 ${p.j + 1} 次对折：变成 ${2 ** (p.j + 1)} 层`;
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
        if (t < p.dur) return st;
        t -= p.dur;
      }
      return st;
    }

    function tick(now) {
      const ms = now - start;
      draw(stateAt(ms));
      if (ms < total()) raf = requestAnimationFrame(tick);
    }

    function reset() {
      cancelAnimationFrame(raf);
      play.textContent = '▶ 播放';
      seg.querySelectorAll('button').forEach((b, i) => b.classList.toggle('selected', i + 1 === folds));
      draw({ k: 0, th: 0, cut: false, blade: 0, gap: 0, spread: 0, caption: '点「播放」，看绳子对折后剪一刀会变成几段' });
    }

    function draw(st) {
      const n = folds;
      const u = pos / 2 ** n;
      // 视图缩放：对折过程中逐步放大，折好的一叠始终居中
      const partial = st.th ? st.th / Math.PI : 0;
      const kk = st.k + partial;
      const z = lerp(ZOOM[Math.floor(kk)], ZOOM[Math.min(3, Math.floor(kk) + 1)], kk - Math.floor(kk));
      const w = 1 / 2 ** kk;
      const off = MARGIN + (D - w * D * z) / 2;
      const sx = X => off + X * D * z;

      // 按剪断位置把绳子分段（没剪时是一整段）
      const cuts = st.cut ? cutPoints(n, u) : [];
      const bounds = [0, ...cuts, 1];
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
        p.color = COLORS[c % COLORS.length];
      });

      let html = '';
      pieces.forEach((p, i) => {
        const shift = (i - (pieces.length - 1) / 2) * SPREAD * st.spread;
        const pts = [];
        const add = x => {
          const [X, Y] = place(x, st.k, st.th);
          pts.push(`${(sx(X) + shift).toFixed(1)},${(BASE_Y + Y).toFixed(1)}`);
        };
        add(p.a);
        for (let j = Math.floor(p.a * 512) + 1; j / 512 < p.b; j++) add(j / 512);
        add(p.b);
        const color = st.spread ? mix(ROPE, p.color, st.spread) : ROPE;
        html += `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
      });
      // 两个绳头
      [0, 1].forEach(x => {
        if (st.spread) return;
        const [X, Y] = place(x, st.k, st.th);
        html += `<circle cx="${sx(X).toFixed(1)}" cy="${(BASE_Y + Y).toFixed(1)}" r="3.5" fill="#5b3a17"/>`;
      });
      // 剪刀：从上往下划过整叠绳子，剪口处留一条虚线
      if (st.blade > 0) {
        const X = sx(u);
        const top = BASE_Y - (2 ** n - 1) * GAP - 14;
        const y = lerp(top, BASE_Y + 12, st.blade);
        const open = st.cut ? 0.3 : 1;   // 剪断后刀口合上
        html += `<line x1="${X}" y1="${top}" x2="${X}" y2="${y}" stroke="#b23a2b" stroke-width="1.5" stroke-dasharray="4 3"/>`;
        html += `<g stroke="#b23a2b" stroke-width="2.5" stroke-linecap="round" fill="none">` +
          `<line x1="${X - 9 * open}" y1="${y}" x2="${X + 6}" y2="${y - 26}"/>` +
          `<line x1="${X + 9 * open}" y1="${y}" x2="${X - 6}" y2="${y - 26}"/>` +
          `<circle cx="${X + 8}" cy="${y - 31}" r="4.5"/><circle cx="${X - 8}" cy="${y - 31}" r="4.5"/></g>`;
      }
      svg.innerHTML = html;
      caption.textContent = st.caption;
    }

    reset();
    // 给调试和截图用：直接画出某一时刻的画面
    return { seek: ms => draw(stateAt(ms)), total };
  }

  function mix(c1, c2, t) {
    const a = parseInt(c1.slice(1), 16), b = parseInt(c2.slice(1), 16);
    const ch = s => Math.round(lerp((a >> s) & 255, (b >> s) & 255, t));
    return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
  }

  const TYPES = { foldCut };

  function mount(container, demo) {
    const make = TYPES[demo.type];
    return make ? make(container, demo) : null;
  }

  root.Demos = { mount, types: Object.keys(TYPES) };
})(this);
