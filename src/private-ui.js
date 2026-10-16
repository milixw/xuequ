'use strict';

// 私有课本资料（课文原文与录音）：首页“🔑 课本资料”入口和本学期一册的直达链接、口令框、#/textbook 页面、英语小节页的“听课本录音”链接。
// 资料在私有仓库（克隆到 private/，不入开源库），线上由 nginx 凭口令服务（scripts/private-gate.js）的凭证放行。
// 线上主要靠分享链接解锁（口令服务发凭证后跳到 #/textbook，页面不用管）；口令框留作备用。
// 本机直接打开时 private/manifest.js 能加载就直接可用，不问口令。
// 设计文档：docs/superpowers/specs/2026-10-13-private-textbook.md

(function (root) {
  const BASE = 'private/';
  const API = 'api/private/';

  // ---------- 私有文件的注册（私有仓库里的 manifest.js 和单元文件调用） ----------
  let manifest = null;
  const units = {};
  root.Private = {
    manifest(m) { manifest = m; },
    unit(id, data) { units[id] = data; },
  };

  // 册的单元清单：manifest.english[<册ID>]
  function volumeOf(volId) {
    return (manifest && manifest.english && manifest.english[volId]) || null;
  }
  // 单元号是数字时显示“Unit n 标题”；Starter、附录这类条目的 no 是字符串，只显示标题
  function unitLabel(u) {
    return typeof u.no === 'number' ? `Unit ${u.no} ${u.title}` : u.title;
  }
  function unitMeta(volId, no) {
    const vol = volumeOf(volId);
    return (vol && vol.units.find(u => String(u.no) === String(no))) || null;
  }

  // ---------- 加载与解锁 ----------
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.onload = () => resolve();
      el.onerror = () => {
        el.remove();
        reject(new Error('加载失败：' + src));
      };
      document.head.appendChild(el);
    });
  }

  // 分享链接可以只给某几册：线上按口令服务 status 的 scope（["english:g6s1", …]，null 是全部）
  // 把 manifest 里看不了的册去掉，页面就只显示能看的册。真正的拦截在服务器（看不了的册文件返回 401）
  async function applyScope() {
    if (location.protocol !== 'https:' || !manifest) return;
    let scope = null;
    try {
      const r = await fetch(API + 'status', { credentials: 'same-origin', cache: 'no-store' });
      if (r.ok) scope = (await r.json()).scope || null;
    } catch {
      scope = null;
    }
    pruneManifest(scope);
  }
  function pruneManifest(scope) {
    if (!Array.isArray(scope) || !manifest) return;
    for (const subject of Object.keys(manifest)) {
      for (const id of Object.keys(manifest[subject] || {})) {
        if (!scope.includes(subject + ':' + id)) delete manifest[subject][id];
      }
    }
  }

  // 'unlocked' 资料可用；'locked' 线上有口令服务但还没解锁；'none' 没有私有资料（公开部署、HTTP 站点）
  let statePromise = null;
  function state() {
    if (!statePromise) {
      statePromise = loadScript(BASE + 'manifest.js')
        .then(applyScope)
        .then(() => (manifest ? 'unlocked' : 'none'))
        .catch(async () => {
          if (location.protocol !== 'https:') return 'none';
          try {
            const r = await fetch(API + 'status', { credentials: 'same-origin', cache: 'no-store' });
            return r.ok ? 'locked' : 'none';
          } catch {
            return 'none';
          }
        });
    }
    return statePromise;
  }

  // 返回提示文字；成功时返回 ''
  async function unlock(pass) {
    let r;
    try {
      r = await fetch(API + 'unlock', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass }),
      });
    } catch {
      return '网络不通，请稍后再试';
    }
    if (r.status === 403) return '口令不对';
    if (r.status === 429) return '试得太频繁了，请一分钟后再试';
    if (r.status !== 204) return '暂时无法解锁，请稍后再试';
    statePromise = null;
    return (await state()) === 'unlocked' ? '' : '解锁了但资料加载失败，请刷新重试';
  }

  function loadUnit(volId, no) {
    const meta = unitMeta(volId, no);
    if (!meta) return Promise.resolve(null);
    const id = `english/${volId}/${meta.no}`;
    if (units[id]) return Promise.resolve(units[id]);
    return loadScript(BASE + meta.file).then(() => units[id] || null);
  }

  // ---------- 口令框（沿用登录框的 .modal 样式） ----------
  function openUnlock(onDone) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML =
      `<div class="modal-body"><h2>🔑 课本资料</h2>` +
      `<p>输入口令后可以听课本录音、看课文原文（30 天内不用再输）。资料只供自己学习，请勿外传。</p>` +
      `<input type="password" id="pv-pass" autocomplete="current-password" aria-label="口令">` +
      `<p class="ac-err" id="pv-err"></p>` +
      `<div class="modal-actions"><button type="button" class="secondary" id="pv-cancel">取消</button>` +
      `<button type="button" class="primary" id="pv-ok" disabled>解锁</button></div></div>`;
    document.body.appendChild(modal);
    const input = modal.querySelector('#pv-pass');
    const err = modal.querySelector('#pv-err');
    const ok = modal.querySelector('#pv-ok');
    const close = () => modal.remove();
    input.oninput = () => { ok.disabled = !input.value; err.textContent = ''; };
    async function submit() {
      if (!input.value || ok.disabled) return;
      ok.disabled = true;
      ok.textContent = '解锁中…';
      const msg = await unlock(input.value);
      ok.textContent = '解锁';
      if (msg) {
        err.textContent = msg;
        ok.disabled = false;
        return;
      }
      close();
      onDone();
    }
    ok.onclick = submit;
    input.onkeydown = e => { if (e.key === 'Enter') submit(); };
    modal.querySelector('#pv-cancel').onclick = close;
    modal.onclick = e => { if (e.target === modal) close(); };
    input.focus();
  }

  // ---------- 首页入口：资料可用或可解锁时才出现 ----------
  // notesList：复习资料英语组，放总入口（未解锁时点了先输口令）
  // booksBox：本学期课本区，已解锁且这一册有资料时加一行直达链接
  // makeRow(entry)：app.js 的列表行，entry 是 { icon, title, desc, href }
  function homeLinks(notesList, booksBox, volId, makeRow) {
    state().then(s => {
      if (s === 'none') return;
      if (notesList.isConnected) {
        const link = makeRow({
          icon: '🔑', title: '课本资料', href: '#/textbook',
          desc: s === 'locked' ? '用分享链接打开，或输入口令' : '各册课本录音和课文原文',
        });
        if (s === 'locked') {
          link.addEventListener('click', e => {
            e.preventDefault();
            openUnlock(() => { location.hash = '#/textbook'; });
          });
        }
        notesList.appendChild(link);
      }
      if (s === 'unlocked' && booksBox.isConnected && volumeOf(volId)) {
        booksBox.appendChild(makeRow({
          icon: '🎧', title: '本册课本录音', href: '#/textbook/' + encodeURIComponent(volId),
          desc: '看课本、听录音、看课文原文',
        }));
      }
    });
  }

  // ---------- 英语小节页：本单元有资料时加一行链接 ----------
  function sectionLink(main, meta) {
    if (meta.subject.id !== 'english') return;
    const volId = meta.volume.id;
    const no = meta.chapter.no;
    state().then(s => {
      if (s !== 'unlocked' || !unitMeta(volId, no) || !main.isConnected) return;
      const p = document.createElement('p');
      p.className = 'pv-link';
      p.innerHTML = `<a href="#/textbook/${volId}/${no}">🎧 听本单元课本录音、看课文原文</a>`;
      main.prepend(p);
    });
  }

  // ---------- 页面 ----------
  // 换页时 app.js 调 stop()：已移出页面的 <audio> 不暂停会继续响
  let players = [];
  function stop() {
    players.forEach(a => a.pause());
    players = [];
  }

  // parts：#/textbook 之后的部分；ui：app.js 的 { page, showError, escapeHtml }
  //   []                     → 跳到本学期那一册（首页右上角选的学期），没有就第一册
  //   [册ID]                 → 本册单元目录，顶部切换册
  //   [册ID, 单元号]          → 听读：整本课本页面 + 底部播放栏（册没有页面图片时用列表）
  //   [册ID, 单元号, 'list'] → 列表：各栏目的录音和原文
  async function textbookPage(parts, ui) {
    const hash = location.hash;
    const s = await state();
    if (location.hash !== hash) return;
    if (s !== 'unlocked') {
      const main = ui.page('课本资料', '#/');
      if (s === 'locked') {
        main.innerHTML = '<p class="notice">请用老师或家长发的分享链接打开，打开一次 30 天内都能用；也可以输入口令。</p><p><button type="button" class="primary pv-unlock">输入口令</button></p>';
        main.querySelector('.pv-unlock').onclick = () => openUnlock(() => root.dispatchEvent(new Event('hashchange')));
      } else {
        ui.showError(main, '这里没有课本资料。');
      }
      return;
    }
    if (!parts.length) {
      const id = defaultVolume();
      if (!id) return ui.showError(ui.page('课本资料', '#/'), '没有可以看的课本资料。');
      location.replace('#/textbook/' + id);
      return;
    }
    if (parts.length === 1) return indexPage(parts[0], ui);
    const vol = volumeOf(parts[0]);
    if (parts[2] === 'list' || !(vol && vol.book)) return unitPage(parts[0], parts[1], ui);
    return readerPage(parts[0], parts[1], ui);
  }

  function volumeIds() {
    return Object.keys((manifest && manifest.english) || {});
  }
  // 册的显示名：“沪教版 英语六上”；旧 manifest 没有 edition 时只写“英语六上”
  function volumeName(vol) {
    return `${vol.edition ? vol.edition + ' ' : ''}英语${vol.short || vol.title}`;
  }
  // 上次看的册（沪教版、人教精通版的册 ID 不同，记住了才不会每次都跳回首页学期那一册）
  const LAST_KEY = 'xq.textbookVol.v1';
  function lastVolume() {
    try { return localStorage.getItem(LAST_KEY); } catch { return null; }
  }
  function rememberVolume(id) {
    try { localStorage.setItem(LAST_KEY, id); } catch { /* 存不了就算了 */ }
  }
  // 上次看的册；没有就首页右上角选的学期（沪教版册 ID 和学期 ID 相同）；都没有资料就第一册
  function defaultVolume() {
    const ids = volumeIds();
    const last = lastVolume();
    if (last && ids.includes(last)) return last;
    let current = null;
    try {
      const sem = root.Content.semester(root.Accounts.grade.get(root.Accounts.current()));
      current = sem && sem.id;
    } catch {
      current = null;
    }
    return ids.includes(current) ? current : ids[0] || null;
  }

  function pageRange(ranges) {
    return ranges.map(([a, b]) => (a < 1 ? `封面～第 ${b} 页` : `第 ${a}～${b} 页`)).join('、');
  }

  function indexPage(volId, ui) {
    const esc = ui.escapeHtml;
    const vol = volumeOf(volId);
    const main = ui.page('课本资料', '#/', vol ? `${volumeName(vol)} · 课本录音和课文原文` : '课本录音和课文原文，只供自己学习');
    if (!vol) return ui.showError(main, '没有这一册的资料。');
    rememberVolume(volId);
    // 册切换：按教材版本分行（沪教版、人教精通版），一册时也显示，让学生知道看的是哪一册
    const groups = new Map();
    for (const id of volumeIds()) {
      const ed = volumeOf(id).edition || '';
      if (!groups.has(ed)) groups.set(ed, []);
      groups.get(ed).push(id);
    }
    main.insertAdjacentHTML('beforeend', `<nav class="pv-eds" aria-label="选择课本">${[...groups].map(([ed, ids]) =>
      `<div class="pv-vols">${ed ? `<span class="pv-ed">${esc(ed)}</span>` : ''}${ids.map(id => {
        const v = volumeOf(id);
        return `<a href="#/textbook/${esc(id)}"${id === volId ? ' class="on" aria-current="page"' : ''}>${ed ? '' : '英语'}${esc(v.short || v.title)}</a>`;
      }).join('')}</div>`).join('')}</nav>`);
    for (const u of vol.units) {
      main.insertAdjacentHTML('beforeend',
        `<a class="card pv-unit" href="#/textbook/${esc(volId)}/${esc(String(u.no))}">` +
        `<h2>${esc(unitLabel(u))}</h2>${u.pages ? `<p>课本${esc(pageRange(u.pages))}</p>` : ''}</a>`);
    }
  }

  // 两个视图共用：标题、返回、视图切换
  async function unitShell(volId, no, ui, view) {
    const meta = unitMeta(volId, no);
    const vol = volumeOf(volId);
    if (!meta) {
      ui.showError(ui.page('课本资料', '#/textbook'), '找不到这个单元。');
      return null;
    }
    const hash = location.hash;
    let unit = null;
    try {
      unit = await loadUnit(volId, no);
    } catch {
      unit = null;
    }
    if (location.hash !== hash) return null;
    const main = ui.page(unitLabel(meta), `#/textbook/${volId}`, `${volumeName(vol)} · 课本资料`);
    if (!unit) {
      ui.showError(main, '这个单元的资料加载失败，请刷新重试。');
      return null;
    }
    const base = `#/textbook/${volId}/${meta.no}`;
    if (vol.book) {
      main.insertAdjacentHTML('beforeend', `<nav class="pv-views" aria-label="显示方式">` +
        `<a href="${base}"${view === 'reader' ? ' class="on" aria-current="page"' : ''}>📖 看课本听录音</a>` +
        `<a href="${base}/list"${view === 'list' ? ' class="on" aria-current="page"' : ''}>☰ 录音和原文</a></nav>`);
    }
    main.insertAdjacentHTML('beforeend', '<p class="notice">课本页面、录音和原文只供自己学习，请勿外传。</p>');
    return { main, meta, vol, unit };
  }

  function rateButtons() {
    return `<div class="pv-rates" role="group" aria-label="语速">${[0.75, 1, 1.25].map(r =>
      `<button type="button" data-rate="${r}"${r === 1 ? ' class="on"' : ''}>${r} 倍</button>`).join('')}</div>`;
  }
  // 倍速按钮接到某个 <audio>；preload="none" 时有的浏览器播放后会把倍速重置成 1，开始播放时再设一次
  function bindRates(box, audio) {
    const btns = [...box.querySelectorAll('.pv-rates button')];
    btns.forEach(btn => btn.addEventListener('click', () => {
      audio.playbackRate = Number(btn.dataset.rate);
      btns.forEach(b => b.classList.toggle('on', b === btn));
    }));
    audio.addEventListener('playing', () => {
      const on = btns.find(b => b.classList.contains('on'));
      if (on) audio.playbackRate = Number(on.dataset.rate);
    });
  }

  // 听读：本单元的课本页从上往下排，图片滑到附近才加载；底部固定播放栏，点栏目跳到那一页并播放
  async function readerPage(volId, no, ui) {
    const shell = await unitShell(volId, no, ui, 'reader');
    if (!shell) return;
    const { main, meta, vol, unit } = shell;
    const esc = ui.escapeHtml;
    const { dir, offset, count } = vol.book;
    const inBook = p => p + offset >= 1 && p + offset <= count;

    // 页面：单元范围内的页，再加上范围外、但有栏目指向的页（比如总词表）
    const pages = [];
    for (const [a, b] of meta.pages || []) for (let p = a; p <= b; p++) if (inBook(p)) pages.push(p);
    const extra = [...new Set(unit.sections.map(x => x.page).filter(p => p && inBook(p) && !pages.includes(p)))].sort((a, b) => a - b);

    const book = document.createElement('div');
    book.className = 'pv-book';
    const figure = (p, label) => `<figure class="pv-page" id="pv-pg-${p}">` +
      `<img src="${esc(BASE + dir)}/p${String(p + offset).padStart(3, '0')}.jpg" width="1241" height="1754" loading="lazy" decoding="async" alt="${esc(label)}">` +
      `<figcaption>${esc(label)}</figcaption></figure>`;
    const label = p => (p >= 1 ? `课本第 ${p} 页` : '封面和目录');
    book.innerHTML = pages.map(p => figure(p, label(p))).join('') +
      (extra.length ? `<h3 class="group">本单元在别处的页</h3>${extra.map(p => figure(p, label(p))).join('')}` : '');
    main.appendChild(book);

    // 底部播放栏：栏目按钮 + 一个共用的 <audio>
    const playable = unit.sections.filter(x => x.audio || x.page);
    const bar = document.createElement('div');
    bar.className = 'pv-bar';
    bar.innerHTML =
      `<div class="pv-chips" role="group" aria-label="栏目">${playable.map((x, i) =>
        `<button type="button" data-i="${i}">${esc(x.name)}${x.page ? `<small>p.${esc(String(x.page))}</small>` : ''}</button>`).join('')}</div>` +
      `<audio controls preload="none"></audio>` +
      `<div class="pv-foot"><p class="pv-now">点上面的栏目：翻到那一页并播放</p>${rateButtons()}</div>`;
    main.appendChild(bar);
    // 顶部标题栏是粘性定位，跳到某页时留出它的高度，页面上端才不会被挡住
    const header = document.querySelector('header.bar');
    if (header) book.style.setProperty('--pv-top', header.offsetHeight + 6 + 'px');
    const audio = bar.querySelector('audio');
    players.push(audio);
    bindRates(bar, audio);
    const now = bar.querySelector('.pv-now');
    const chips = [...bar.querySelectorAll('.pv-chips button')];
    chips.forEach(btn => btn.addEventListener('click', () => {
      const sec = playable[Number(btn.dataset.i)];
      chips.forEach(b => b.classList.toggle('on', b === btn));
      btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      const target = sec.page && book.querySelector(`#pv-pg-${sec.page}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (sec.audio) {
        const src = BASE + sec.audio;
        if (!audio.src.endsWith(src)) audio.src = src;
        audio.play().catch(() => {});
        now.textContent = `正在听：${sec.name}${sec.page ? `（课本第 ${sec.page} 页）` : ''}`;
      } else {
        audio.pause();
        now.textContent = `${sec.name}：${sec.note || '这一栏没有录音'}`;
      }
    }));
  }

  async function unitPage(volId, no, ui) {
    const shell = await unitShell(volId, no, ui, 'list');
    if (!shell) return;
    const { main, unit } = shell;
    const esc = ui.escapeHtml;
    for (const sec of unit.sections) {
      const card = document.createElement('article');
      card.className = 'card pv-section';
      card.innerHTML =
        `<div class="pv-head"><h2>${esc(sec.name)}</h2>${sec.page ? `<small>课本第 ${esc(String(sec.page))} 页</small>` : ''}</div>` +
        (sec.note ? `<p class="pv-note">${esc(sec.note)}</p>` : '') +
        (sec.audio ? `<audio controls preload="none" src="${esc(BASE + sec.audio)}"></audio>${rateButtons()}` : '') +
        (sec.text && sec.text.length ? `<button type="button" class="pv-toggle">显示原文</button>` +
          `<div class="pv-text" lang="en" hidden>${sec.text.map(t => `<p>${esc(t)}</p>`).join('')}</div>` : '');
      main.appendChild(card);

      const audio = card.querySelector('audio');
      if (audio) {
        players.push(audio);
        // 同一时间只放一段
        audio.addEventListener('play', () => players.forEach(a => { if (a !== audio) a.pause(); }));
        bindRates(card, audio);
      }
      const toggle = card.querySelector('.pv-toggle');
      if (toggle) {
        const text = card.querySelector('.pv-text');
        toggle.addEventListener('click', () => {
          text.hidden = !text.hidden;
          toggle.textContent = text.hidden ? '显示原文' : '隐藏原文';
        });
      }
    }
  }

  const PrivateUI = { homeLinks, sectionLink, textbookPage, stop, state, unlock, unitMeta, pageRange, pruneManifest };
  if (typeof module !== 'undefined') module.exports = PrivateUI;
  else root.PrivateUI = PrivateUI;
})(typeof globalThis !== 'undefined' ? globalThis : this);
