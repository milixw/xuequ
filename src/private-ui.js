'use strict';

// 私有课本资料（课文原文与录音）：首页“🔑 课本资料”入口、口令框、#/textbook 页面、英语小节页的“听课本录音”链接。
// 资料在私有仓库（克隆到 private/，不入开源库），线上由 nginx 凭口令服务（scripts/private-gate.js）的凭证放行。
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

  // 'unlocked' 资料可用；'locked' 线上有口令服务但还没解锁；'none' 没有私有资料（公开部署、HTTP 站点）
  let statePromise = null;
  function state() {
    if (!statePromise) {
      statePromise = loadScript(BASE + 'manifest.js')
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
  function homeTile(grid) {
    state().then(s => {
      if (s === 'none' || !grid.isConnected) return;
      const link = document.createElement('a');
      link.className = 'home-tile';
      link.href = '#/textbook';
      link.innerHTML = `<b>🔑 课本资料</b><small>${s === 'locked' ? '输入口令后听课本录音' : '课本录音和课文原文'}</small>`;
      if (s === 'locked') {
        link.addEventListener('click', e => {
          e.preventDefault();
          openUnlock(() => { location.hash = '#/textbook'; });
        });
      }
      grid.appendChild(link);
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
  async function textbookPage(parts, ui) {
    const hash = location.hash;
    const s = await state();
    if (location.hash !== hash) return;
    if (s !== 'unlocked') {
      const main = ui.page('课本资料', '#/');
      if (s === 'locked') {
        main.innerHTML = '<p class="notice">需要先输入口令。</p><p><button type="button" class="primary pv-unlock">输入口令</button></p>';
        main.querySelector('.pv-unlock').onclick = () => openUnlock(() => root.dispatchEvent(new Event('hashchange')));
      } else {
        ui.showError(main, '这里没有课本资料。');
      }
      return;
    }
    if (parts.length >= 2) return unitPage(parts[0], parts[1], ui);
    return indexPage(ui);
  }

  function indexPage(ui) {
    const esc = ui.escapeHtml;
    const main = ui.page('课本资料', '#/', '课本录音和课文原文，只供自己学习');
    const vols = Object.entries((manifest && manifest.english) || {});
    if (!vols.length) return ui.showError(main, '资料清单是空的。');
    for (const [volId, vol] of vols) {
      main.insertAdjacentHTML('beforeend', `<h3 class="group">英语 · ${esc(vol.title)}</h3>`);
      for (const u of vol.units) {
        main.insertAdjacentHTML('beforeend',
          `<a class="card pv-unit" href="#/textbook/${esc(volId)}/${esc(String(u.no))}">` +
          `<h2>${esc(unitLabel(u))}</h2></a>`);
      }
    }
  }

  async function unitPage(volId, no, ui) {
    const esc = ui.escapeHtml;
    const meta = unitMeta(volId, no);
    const vol = volumeOf(volId);
    if (!meta) return ui.showError(ui.page('课本资料', '#/textbook'), '找不到这个单元。');
    const hash = location.hash;
    let unit = null;
    try {
      unit = await loadUnit(volId, no);
    } catch {
      unit = null;
    }
    if (location.hash !== hash) return;
    const main = ui.page(unitLabel(meta), '#/textbook', `英语 ${vol.title} · 课本资料`);
    if (!unit) return ui.showError(main, '这个单元的资料加载失败，请刷新重试。');
    main.insertAdjacentHTML('beforeend', '<p class="notice">课本录音和原文只供自己学习，请勿外传。</p>');
    for (const sec of unit.sections) {
      const card = document.createElement('article');
      card.className = 'card pv-section';
      card.innerHTML =
        `<div class="pv-head"><h2>${esc(sec.name)}</h2>${sec.page ? `<small>课本第 ${esc(String(sec.page))} 页</small>` : ''}</div>` +
        (sec.note ? `<p class="pv-note">${esc(sec.note)}</p>` : '') +
        (sec.audio ? `<audio controls preload="none" src="${esc(BASE + sec.audio)}"></audio>` +
          `<div class="pv-rates" role="group" aria-label="语速">${[0.75, 1, 1.25].map(r =>
            `<button type="button" data-rate="${r}"${r === 1 ? ' class="on"' : ''}>${r} 倍</button>`).join('')}</div>` : '') +
        (sec.text && sec.text.length ? `<button type="button" class="pv-toggle">显示原文</button>` +
          `<div class="pv-text" lang="en" hidden>${sec.text.map(t => `<p>${esc(t)}</p>`).join('')}</div>` : '');
      main.appendChild(card);

      const audio = card.querySelector('audio');
      if (audio) {
        players.push(audio);
        // 同一时间只放一段
        audio.addEventListener('play', () => players.forEach(a => { if (a !== audio) a.pause(); }));
        card.querySelectorAll('.pv-rates button').forEach(btn => btn.addEventListener('click', () => {
          audio.playbackRate = Number(btn.dataset.rate);
          card.querySelectorAll('.pv-rates button').forEach(b => b.classList.toggle('on', b === btn));
        }));
        // preload="none" 时有的浏览器播放后会把倍速重置成 1，开始播放时再设一次
        audio.addEventListener('playing', () => {
          const on = card.querySelector('.pv-rates .on');
          if (on) audio.playbackRate = Number(on.dataset.rate);
        });
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

  const PrivateUI = { homeTile, sectionLink, textbookPage, stop, state, unlock, unitMeta };
  if (typeof module !== 'undefined') module.exports = PrivateUI;
  else root.PrivateUI = PrivateUI;
})(typeof globalThis !== 'undefined' ? globalThis : this);
