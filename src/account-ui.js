'use strict';

// 账号 UI：右上角账号区 + 登录模态框。
// 设计文档：docs/superpowers/specs/2026-09-22-account-redesign-design.md

(function (root) {
  let UI = null;
  let modalEl = null;
  let onLoginSuccess = null;
  let outsideClickHandler = null;
  let currentWrap = null;

  function esc(s) { return UI ? UI.escapeHtml(s) : String(s); }

  function buildModalBody() {
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML =
      `<h2>登录</h2>` +
      `<p>输入你的账号（任意非空白字符，1–20 字符）</p>` +
      `<input type="text" id="ac-input" autocomplete="off" autocapitalize="off">` +
      `<p class="ac-err" id="ac-err"></p>` +
      `<div class="modal-actions">` +
        `<button class="secondary" id="ac-cancel">取消</button>` +
        `<button class="primary" id="ac-submit">登录</button>` +
      `</div>`;
    return body;
  }

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'modal';
    modalEl.hidden = true;
    modalEl.appendChild(buildModalBody());
    document.body.appendChild(modalEl);
    return modalEl;
  }

  function bindModalHandlers() {
    if (!modalEl) return;
    const input = modalEl.querySelector('#ac-input');
    const errEl = modalEl.querySelector('#ac-err');
    const submitBtn = modalEl.querySelector('#ac-submit');
    const cancelBtn = modalEl.querySelector('#ac-cancel');

    function refresh() {
      if (!input) return;
      const v = input.value;
      const check = Accounts.looseCheck(v);
      if (errEl) errEl.textContent = check.ok ? '' : (check.error || '');
      if (submitBtn) submitBtn.disabled = !check.ok;
    }
    function trySubmit() {
      if (!input) return;
      const r = Accounts.signIn(input.value);
      if (!r.ok) {
        if (errEl) errEl.textContent = r.error || '';
        return;
      }
      const cb = onLoginSuccess;
      closeModal();
      notifyRouteChange();
      if (cb) cb();
    }
    function onKey(e) { if (e.key === 'Enter' && submitBtn && !submitBtn.disabled) trySubmit(); }
    function onBackdrop(e) { if (e.target === modalEl) closeModal(); }

    if (input) {
      input.oninput = refresh;
      input.onkeydown = onKey;
    }
    if (submitBtn) submitBtn.onclick = trySubmit;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    modalEl.onclick = onBackdrop;
  }

  function openModal(onSuccess) {
    onLoginSuccess = onSuccess || null;
    const m = ensureModal();
    const input = m.querySelector('#ac-input');
    const errEl = m.querySelector('#ac-err');
    const submitBtn = m.querySelector('#ac-submit');
    if (input) { input.value = ''; if (input.focus) input.focus(); }
    if (errEl) errEl.textContent = '';
    if (submitBtn) submitBtn.disabled = true;
    m.hidden = false;
    bindModalHandlers();
  }

  function closeModal() {
    if (modalEl) modalEl.hidden = true;
    onLoginSuccess = null;
  }

  function notifyRouteChange() {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new Event('hashchange'));
    }
  }

  function buildAccountArea(headerEl) {
    // 清理上一次 mount 留下的 outsideClickHandler
    if (outsideClickHandler) {
      document.removeEventListener('click', outsideClickHandler);
      outsideClickHandler = null;
    }
    currentWrap = null;
    const wrap = document.createElement('div');
    wrap.className = 'account';
    const current = Accounts.current();
    if (current) {
      const btn = document.createElement('button');
      btn.className = 'name-btn';
      btn.innerHTML = `${esc(current)} <span class="caret">▾</span>`;
      btn.onclick = e => { e.stopPropagation(); toggleMenu(wrap); };
      wrap.appendChild(btn);
      const menu = document.createElement('div');
      menu.className = 'account-menu';
      menu.hidden = true;
      const switchBtn = document.createElement('button');
      switchBtn.textContent = '切换账号';
      switchBtn.onclick = () => { closeMenu(wrap); openModal(null); };
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = '退出登录';
      logoutBtn.onclick = () => {
        Accounts.signOut();
        closeMenu(wrap);
        notifyRouteChange();
      };
      menu.appendChild(switchBtn);
      menu.appendChild(logoutBtn);
      wrap.appendChild(menu);
    } else {
      const btn = document.createElement('button');
      btn.className = 'login-btn';
      btn.textContent = '登录';
      btn.onclick = () => openModal(null);
      wrap.appendChild(btn);
    }
    headerEl.appendChild(wrap);
    return wrap;
  }

  function toggleMenu(wrap) {
    const menu = wrap.querySelector('.account-menu');
    if (!menu) return;
    menu.hidden = !menu.hidden;
    if (!menu.hidden) {
      currentWrap = wrap;
      // 收起另一个弹窗（学期切换器）
      if (typeof window !== 'undefined' && window.__closeSemesterMenu) {
        window.__closeSemesterMenu();
      }
      // 清理旧 handler
      if (outsideClickHandler) document.removeEventListener('click', outsideClickHandler);
      outsideClickHandler = (e) => {
        if (!wrap.contains(e.target)) {
          closeMenu(wrap);
        }
      };
      document.addEventListener('click', outsideClickHandler);
    }
  }

  function closeMenu(wrap) {
    if (outsideClickHandler) {
      document.removeEventListener('click', outsideClickHandler);
      outsideClickHandler = null;
    }
    if (wrap) {
      const menu = wrap.querySelector('.account-menu');
      if (menu) menu.hidden = true;
    }
  }

  const AccountUI = {
    bindUI(ui) { UI = ui; },

    mount(headerEl) {
      return buildAccountArea(headerEl);
    },

    closeMenu() {
      // 暴露给外部（学期切换器等）用来收起账号下拉
      if (currentWrap) {
        const menu = currentWrap.querySelector('.account-menu');
        if (menu) menu.hidden = true;
      }
      if (outsideClickHandler) {
        document.removeEventListener('click', outsideClickHandler);
        outsideClickHandler = null;
      }
    },

    ensureLoggedIn(onLoggedIn) {
      if (Accounts.current()) {
        if (onLoggedIn) onLoggedIn();
      } else {
        openModal(onLoggedIn);
      }
    },

    promptLogin(opts) {
      openModal(opts && opts.onSuccess);
    },

    isLoggedIn() {
      return !!Accounts.current();
    },
  };

  if (typeof module !== 'undefined') module.exports = AccountUI;
  else root.AccountUI = AccountUI;
})(typeof window !== 'undefined' ? window : globalThis);