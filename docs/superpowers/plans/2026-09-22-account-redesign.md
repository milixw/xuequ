# 账号系统重设计实施计划

> **状态：已全部完成，仅作开发过程记录，不要再按它执行。** 现行说明见 [docs/exam.md](../../exam.md)，细节以代码为准。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把账号系统从"白名单 + 2 个固定账号"改成"自由注册（无密码）"，加右上角账号区 + 登录模态框，并引入按账号保存的考试历史。

**Architecture:** 重写 `src/accounts.js`（去白名单、加 `formatCheck` 和 `history` 子模块）；新增 `src/account-ui.js`（账号区 + 模态框）；`app.js` / `exam.js` / `app.css` 集成新 UI 和历史存储。

**Tech Stack:** 纯静态、无构建、原生 ES；自研极简测试工具 `tests/harness.js`。

**Spec:** `docs/superpowers/specs/2026-09-22-account-redesign-design.md`

---

## 文件结构

**新增**：

- `src/account-ui.js` — 账号区 + 登录模态框
- `tests/account-ui.test.js` — UI DOM 测试

**修改**：

- `src/accounts.js` — 去白名单、加 `formatCheck` 和 `history` 子模块
- `src/exam.js` — `submit()` 写历史、`listPage` 渲染历史区、新增 `historyResultPage`
- `src/app.js` — `page()` 挂账号区、`home()` 拦截试卷入口、route 加 `entryPage` 和 `result-history` 分支
- `src/app.css` — 账号区 + 模态框 + 历史区样式
- `tests/accounts.test.js` — 改白名单用例、加 `formatCheck` 和 `history` 用例
- `tests/exam.test.js` — 加 `history.append` 测试
- `docs/exam.md` — 更新账号规则段

**不动**：

- `src/answer.js`、`src/progress.js`、`src/quiz.js`、`src/content.js`、`content/**`

---

## Task 1：accounts.js 重写

**Files:**
- Modify: `src/accounts.js`
- Modify: `tests/accounts.test.js`

- [ ] **Step 1：重写 tests/accounts.test.js**

完整替换 `tests/accounts.test.js`：

```js
'use strict';

const { test, assert } = require('./harness');

const _store = {};
global.localStorage = {
  getItem(k) { return _store[k] ?? null; },
  setItem(k, v) { _store[k] = String(v); },
  removeItem(k) { delete _store[k]; },
};

const Accounts = require('../src/accounts.js');

test('Accounts.formatCheck: 合法名', () => {
  for (const n of ['xiaoming', '_alice', 'x123', 'abc_def', 'A1']) {
    assert(Accounts.formatCheck(n).ok, `${n} 应合法`);
  }
});

test('Accounts.formatCheck: 空字符串', () => {
  const r = Accounts.formatCheck('');
  assert(!r.ok, '空应不合法');
  assert(r.error);
});

test('Accounts.formatCheck: 纯数字', () => {
  const r = Accounts.formatCheck('123');
  assert(!r.ok, '纯数字应不合法');
  assert(/数字|字母|下划线/.test(r.error), '提示应提到字符要求');
});

test('Accounts.formatCheck: 首字符数字', () => {
  const r = Accounts.formatCheck('1xiaoming');
  assert(!r.ok, '首字符数字应不合法');
});

test('Accounts.formatCheck: 含特殊字符', () => {
  for (const n of ['xiaoming!', 'foo bar', 'a@b', 'a.b']) {
    const r = Accounts.formatCheck(n);
    assert(!r.ok, `${n} 应不合法`);
  }
});

test('Accounts.formatCheck: 过长', () => {
  const r = Accounts.formatCheck('a'.repeat(21));
  assert(!r.ok, '21 字符应不合法');
});

test('Accounts.formatCheck: null/undefined', () => {
  assert(!Accounts.formatCheck(null).ok);
  assert(!Accounts.formatCheck(undefined).ok);
});

test('current 初始为 null', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  assert(Accounts.current() === null);
});

test('signIn 合法名 → ok + current 拿到', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('xiaoming');
  assert(r.ok);
  assert(Accounts.current() === 'xiaoming');
});

test('signIn 前后空格 trim', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('  xiaoming  ');
  assert(r.ok);
  assert(Accounts.current() === 'xiaoming');
});

test('signIn 非法名 → ok=false + error', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('123');
  assert(!r.ok);
  assert(r.error);
  assert(Accounts.current() === null);
});

test('signIn localStorage 抛错时 → ok=false + error', () => {
  const orig = localStorage.setItem;
  localStorage.setItem = () => { throw new Error('quota'); };
  const r = Accounts.signIn('xiaoming');
  assert(!r.ok);
  assert(r.error);
  localStorage.setItem = orig;
});

test('signOut 清掉 current', () => {
  Accounts.signIn('xiaoming');
  Accounts.signOut();
  assert(Accounts.current() === null);
});

test('history.list 初始为空数组', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const list = Accounts.history.list('xiaoming');
  assert(Array.isArray(list));
  assert(list.length === 0);
});

test('history.append 后能 list 拿到', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const rec = { sectionId: 'math/sh2024/g6s1/1.1', completedAt: 1731910400000, score: 15, total: 20, durationSec: 1950, items: [] };
  Accounts.history.append('xiaoming', rec);
  const list = Accounts.history.list('xiaoming');
  assert(list.length === 1);
  assert(list[0].id, 'append 后应分配 id');
  assert(list[0].sectionId === 'math/sh2024/g6s1/1.1');
  assert(list[0].score === 15);
});

test('history 多条按时间倒序', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.append('xiaoming', { sectionId: 'b', completedAt: 200, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.append('xiaoming', { sectionId: 'c', completedAt: 150, score: 1, total: 1, durationSec: 0, items: [] });
  const list = Accounts.history.list('xiaoming');
  assert(list[0].sectionId === 'b');
  assert(list[1].sectionId === 'c');
  assert(list[2].sectionId === 'a');
});

test('history 不同账号隔离', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  Accounts.history.append('alice', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.append('bob', { sectionId: 'b', completedAt: 200, score: 1, total: 1, durationSec: 0, items: [] });
  assert(Accounts.history.list('alice').length === 1);
  assert(Accounts.history.list('bob').length === 1);
  assert(Accounts.history.list('alice')[0].sectionId === 'a');
});

test('history.clear 清掉该账号全部', () => {
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  Accounts.history.clear('xiaoming');
  assert(Accounts.history.list('xiaoming').length === 0);
});

test('history.get(id) 拿单条', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 100, score: 1, total: 1, durationSec: 0, items: [] });
  const list = Accounts.history.list('xiaoming');
  const got = Accounts.history.get('xiaoming', list[0].id);
  assert(got && got.sectionId === 'a');
});

test('history.append 抛错时静默（不抛给调用方）', () => {
  const orig = localStorage.setItem;
  localStorage.setItem = () => { throw new Error('quota'); };
  let threw = false;
  try {
    Accounts.history.append('xiaoming', { sectionId: 'a', completedAt: 1, score: 1, total: 1, durationSec: 0, items: [] });
  } catch { threw = true; }
  assert(!threw, 'append 应静默失败');
  localStorage.setItem = orig;
});
```

- [ ] **Step 2：跑测试确认失败**

跑：`node tests/accounts.test.js`（临时在文件末尾加 `require('./harness').run()`）

预期：现有 `Accounts.signIn('xiaoming')` 通过（仍是合法名），但 `formatCheck` / `history` / 部分旧白名单用例失败。

- [ ] **Step 3：重写 src/accounts.js**

完整替换 `src/accounts.js`：

```js
'use strict';

// 账号模块：自由注册（无密码）+ 按账号保存考试历史。
// 设计文档：docs/superpowers/specs/2026-09-22-account-redesign-design.md

(function (root) {
  const KEY = 'xq.account.v1';
  const HISTORY_KEY_PREFIX = 'xq.history.v1.';
  const NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
  const NAME_MIN = 1;
  const NAME_MAX = 20;

  function readCurrent() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      return obj && typeof obj.name === 'string' ? obj.name : null;
    } catch {
      return null;
    }
  }

  function writeCurrent(name) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ name }));
      return true;
    } catch {
      return false;
    }
  }

  function removeCurrent() {
    try { localStorage.removeItem(KEY); } catch {}
  }

  function historyKey(username) {
    return HISTORY_KEY_PREFIX + username;
  }

  function readHistory(username) {
    try {
      const raw = localStorage.getItem(historyKey(username));
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function writeHistory(username, list) {
    try {
      localStorage.setItem(historyKey(username), JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function removeHistory(username) {
    try { localStorage.removeItem(historyKey(username)); } catch {}
  }

  function formatCheck(name) {
    if (typeof name !== 'string') return { ok: false, error: '请输入账号' };
    const trimmed = name.trim();
    if (trimmed.length < NAME_MIN) return { ok: false, error: '请输入账号' };
    if (trimmed.length > NAME_MAX) {
      return { ok: false, error: `账号长度 1–${NAME_MAX} 个字符` };
    }
    if (!NAME_PATTERN.test(trimmed)) {
      return { ok: false, error: '账号只能是字母、下划线、数字，不能是纯数字或含其他字符' };
    }
    return { ok: true };
  }

  function makeId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  const Accounts = {
    KEY,
    HISTORY_KEY_PREFIX,
    NAME_PATTERN,
    NAME_MIN,
    NAME_MAX,

    formatCheck,
    isAllowed: formatCheck,   // 旧 API 兼容，等价于 formatCheck

    current() {
      return readCurrent();
    },

    signIn(name) {
      if (typeof name !== 'string') {
        return { ok: false, error: '请输入账号' };
      }
      const trimmed = name.trim();
      const check = formatCheck(trimmed);
      if (!check.ok) return check;
      if (!writeCurrent(trimmed)) {
        return { ok: false, error: '存储不可用' };
      }
      return { ok: true };
    },

    signOut() {
      removeCurrent();
    },

    history: {
      list(username) {
        if (typeof username !== 'string' || !username) return [];
        return readHistory(username);
      },

      append(username, record) {
        if (typeof username !== 'string' || !username) return;
        if (!record || typeof record !== 'object') return;
        const list = readHistory(username);
        const item = Object.assign({}, record, { id: record.id || makeId() });
        list.push(item);
        writeHistory(username, list);
      },

      clear(username) {
        if (typeof username !== 'string' || !username) return;
        removeHistory(username);
      },

      get(username, recordId) {
        if (typeof username !== 'string' || !recordId) return null;
        return readHistory(username).find(r => r.id === recordId) || null;
      },
    },
  };

  if (typeof module !== 'undefined') module.exports = Accounts;
  else root.Accounts = Accounts;
})(this);
```

- [ ] **Step 4：跑测试确认通过**

跑：`node tests/accounts.test.js`（末尾加 `require('./harness').run()`），预期全部通过。

- [ ] **Step 5：去掉末尾 harness.run**

按之前约定，不要在测试文件末尾加 `require('./harness').run()`（run.js 会调）。

- [ ] **Step 6：跑全量测试**

跑：`node tests/run.js`

预期：除新加的 accounts 用例外，已有 0 失败。accounts 用例全部通过。

- [ ] **Step 7：提交**

```bash
git add src/accounts.js tests/accounts.test.js
git commit -m "accounts 重写：去白名单、加 formatCheck 和 history"
```

---

## Task 2：account-ui.js — 账号区 + 登录模态框

**Files:**
- Create: `src/account-ui.js`
- Create: `tests/account-ui.test.js`
- Modify: `tests/run.js`
- Modify: `index.html`

- [ ] **Step 1：写失败测试**

写 `tests/account-ui.test.js`：

```js
'use strict';

const { test, assert } = require('./harness');

// DOM stub
function makeEl(tag) {
  const el = {
    tagName: tag.toUpperCase(),
    children: [],
    classList: { _set: new Set(), add(c) { this._set.add(c); }, remove(c) { this._set.delete(c); }, toggle(c, on) { if (on) this._set.add(c); else this._set.delete(c); }, contains(c) { return this._set.has(c); } },
    attrs: {},
    textContent: '',
    innerHTML: '',
    style: {},
    parentNode: null,
    appendChild(child) { this.children.push(child); child.parentNode = this; return child; },
    insertBefore(child, ref) { const i = this.children.indexOf(ref); if (i < 0) this.appendChild(child); else { this.children.splice(i, 0, child); child.parentNode = this; } return child; },
    removeChild(child) { const i = this.children.indexOf(child); if (i >= 0) { this.children.splice(i, 1); child.parentNode = null; } return child; },
    addEventListener() {},
    removeEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    setAttribute(k, v) { this.attrs[k] = v; },
    getAttribute(k) { return this.attrs[k]; },
    focus() {},
    dispatchEvent() {},
    click() {},
  };
  return el;
}

global.document = {
  createElement: makeEl,
  body: makeEl('body'),
  addEventListener() {},
  removeEventListener() {},
  hidden: false,
};
global.window = global;
global.localStorage = {
  _s: {},
  getItem(k) { return this._s[k] ?? null; },
  setItem(k, v) { this._s[k] = String(v); },
  removeItem(k) { delete this._s[k]; },
};

const Accounts = require('../src/accounts.js');
const AccountUI = require('../src/account-ui.js');
AccountUI.bindUI({ escapeHtml: s => String(s) });

test('AccountUI.mount: 未登录时显示登录按钮', () => {
  Accounts.signOut();
  const header = makeEl('header');
  AccountUI.mount(header);
  assert(header.children.length > 0, '应在 header 内 append 账号区');
});

test('AccountUI.mount: 已登录时显示用户名', () => {
  Accounts.signIn('xiaoming');
  const header = makeEl('header');
  AccountUI.mount(header);
  // 至少找到一个 .login-btn 不存在
  // （DOM stub 不返回复杂结构，所以这里只能粗略校验不抛错）
});

test('AccountUI.ensureLoggedIn 已登录直接回调', () => {
  Accounts.signIn('xiaoming');
  let called = false;
  AccountUI.ensureLoggedIn(() => { called = true; });
  assert(called, '已登录应直接回调');
});

test('AccountUI.ensureLoggedIn 未登录唤出模态框（不直接回调）', () => {
  Accounts.signOut();
  let called = false;
  AccountUI.ensureLoggedIn(() => { called = true; });
  assert(!called, '未登录不应直接回调（应在登录成功后回调）');
});
```

- [ ] **Step 2：跑测试确认失败**

跑：`node tests/account-ui.test.js`

预期：`Cannot find module '../src/account-ui.js'`

- [ ] **Step 3：实现 account-ui.js**

写 `src/account-ui.js`：

```js
'use strict';

// 账号 UI：右上角账号区 + 登录模态框。
// 设计文档：docs/superpowers/specs/2026-09-22-account-redesign-design.md

(function (root) {
  let UI = null;
  let modalEl = null;
  let menuEl = null;
  let onLoginSuccess = null;

  function esc(s) { return UI ? UI.escapeHtml(s) : String(s); }

  function ensureModal() {
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'modal';
    modalEl.hidden = true;
    modalEl.appendChild(buildModalBody());
    document.body.appendChild(modalEl);
    return modalEl;
  }

  function buildModalBody() {
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML =
      `<h2>登录</h2>` +
      `<p>输入你的账号（字母、下划线、数字，1–20 字符，不能是纯数字）</p>` +
      `<input type="text" id="ac-input" autocomplete="off" autocapitalize="off">` +
      `<p class="ac-err" id="ac-err"></p>` +
      `<div class="modal-actions">` +
        `<button class="secondary" id="ac-cancel">取消</button>` +
        `<button class="primary" id="ac-submit">登录</button>` +
      `</div>`;
    return body;
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

  function bindModalHandlers() {
    if (!modalEl) return;
    const input = modalEl.querySelector('#ac-input');
    const errEl = modalEl.querySelector('#ac-err');
    const submitBtn = modalEl.querySelector('#ac-submit');

    function onInput() {
      const v = input.value;
      const check = Accounts.formatCheck(v);
      if (errEl) errEl.textContent = check.ok ? '' : (check.error || '');
      if (submitBtn) submitBtn.disabled = !check.ok;
    }
    function onSubmit() {
      const v = input.value;
      const r = Accounts.signIn(v);
      if (!r.ok) {
        if (errEl) errEl.textContent = r.error || '';
        return;
      }
      const cb = onLoginSuccess;
      closeModal();
      // 触发 route 重渲染（退出模态框后页面状态变化）
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new Event('hashchange'));
      }
      if (cb) cb();
    }
    function onCancel() { closeModal(); }
    function onKey(e) { if (e.key === 'Enter' && !submitBtn.disabled) onSubmit(); }
    function onBackdrop(e) { if (e.target === modalEl) closeModal(); }

    // 用 on-属性简化（生产环境应 addEventListener + removeEventListener）
    input.oninput = onInput;
    input.onkeydown = onKey;
    submitBtn.onclick = onSubmit;
    modalEl.querySelector('#ac-cancel').onclick = onCancel;
    modalEl.onclick = onBackdrop;
  }

  function buildAccountArea(headerEl) {
    const wrap = document.createElement('div');
    wrap.className = 'account';
    const current = Accounts.current();
    if (current) {
      const btn = document.createElement('button');
      btn.className = 'name-btn';
      btn.innerHTML = `${esc(current)} <span class="caret">▾</span>`;
      btn.onclick = e => { e.stopPropagation(); toggleMenu(wrap); };
      wrap.appendChild(btn);
      menuEl = document.createElement('div');
      menuEl.className = 'account-menu';
      menuEl.hidden = true;
      const switchBtn = document.createElement('button');
      switchBtn.textContent = '切换账号';
      switchBtn.onclick = () => { closeMenu(); openModal(null); };
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = '退出登录';
      logoutBtn.onclick = () => {
        Accounts.signOut();
        closeMenu();
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new Event('hashchange'));
        }
      };
      menuEl.appendChild(switchBtn);
      menuEl.appendChild(logoutBtn);
      wrap.appendChild(menuEl);
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
    if (!menuEl) return;
    menuEl.hidden = !menuEl.hidden;
    if (!menuEl.hidden) {
      // 点外侧关闭
      setTimeout(() => {
        const off = (e) => {
          if (!wrap.contains(e.target)) {
            closeMenu();
            document.removeEventListener('click', off);
          }
        };
        document.addEventListener('click', off);
      }, 0);
    }
  }

  function closeMenu() {
    if (menuEl) menuEl.hidden = true;
  }

  const AccountUI = {
    bindUI(ui) { UI = ui; },

    mount(headerEl) {
      return buildAccountArea(headerEl);
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
```

- [ ] **Step 4：跑测试确认通过**

跑：`node tests/account-ui.test.js`（末尾加 `require('./harness').run()`）

预期：4 个用例通过。

- [ ] **Step 5：去掉末尾 harness.run**

按之前约定，去掉末尾的 `require('./harness').run()`。

- [ ] **Step 6：接入 run.js**

修改 `tests/run.js`：

```js
'use strict';

require('./answer.test.js');
require('./content.test.js');
require('./function-track.test.js');
require('./accounts.test.js');
require('./exam.test.js');
require('./account-ui.test.js');

process.exit(require('./harness').run() ? 1 : 0);
```

- [ ] **Step 7：跑全量测试**

跑：`node tests/run.js`，预期 0 失败。

- [ ] **Step 8：加载到 index.html**

修改 `index.html`：

```html
<script src="src/account-ui.js"></script>
```

放在 `src/exam.js` 之后、`src/app.js` 之前。

- [ ] **Step 9：提交**

```bash
git add src/account-ui.js tests/account-ui.test.js tests/run.js index.html
git commit -m "account-ui：账号区 + 登录模态框"
```

---

## Task 3：app.js 集成

**Files:**
- Modify: `src/app.js`

- [ ] **Step 1：app.js 的 page() 加账号挂载**

修改 `src/app.js` 中的 `page()` 函数，在 header 后追加一个挂载点：

```js
function page(title, backHref, subtitle) {
  app.innerHTML =
    `<header class="bar">` +
    (backHref ? `<a class="back" href="${backHref}" aria-label="返回">‹</a>` : '') +
    `<div class="titles"><h1>${escapeHtml(title)}</h1>${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}</div>` +
    `</header>`;
  const headerEl = app.querySelector('header.bar');
  AccountUI.mount(headerEl);
  const main = document.createElement('main');
  app.appendChild(main);
  return main;
}
```

- [ ] **Step 2：home() 拦截"试卷"卡片**

修改 `src/app.js` 中 `home()` 函数的"试卷"卡片创建处：

```js
const exam = document.createElement('a');
exam.className = 'card volume';
exam.innerHTML =
  `<span class="tag">试卷</span>` +
  `<h2>按章节限时测试</h2>` +
  `<p>先交卷，再看分数和错题解析</p>`;
exam.addEventListener('click', e => {
  if (!Accounts.current()) {
    e.preventDefault();
    AccountUI.ensureLoggedIn(() => { location.hash = '#/exam'; });
  } else {
    location.hash = '#/exam';
  }
});
main.appendChild(exam);
```

注意：不设置 href，靠 JS 跳转（避免未登录时 hash 路由跳到 /exam 显示未登录状态时仍残留链接）。

- [ ] **Step 3：route() 加 entryPage 和 result-history 分支**

修改 `src/app.js` 的 `route()` 函数：

```js
function route() {
  const parts = (location.hash.slice(1) || '/').split('/').filter(Boolean);
  window.scrollTo(0, 0);
  if (parts[0] === 'v') return volumePage(parts.slice(1).join('/'));
  if (parts[0] === 's') return sectionPage(parts.slice(1).join('/'));
  if (parts[0] === 'q') return questionPage(parts.slice(1, -1).join('/'), parts[parts.length - 1]);
  if (parts[0] === 'exam') {
    const app = document.getElementById('app');
    app.innerHTML = '';
    const main = document.createElement('main');
    app.appendChild(main);
    if (parts.length === 1) return Exam.listPage(main);
    const last = parts[parts.length - 1];
    if (last === 'play' || last === 'result') {
      const sectionId = parts.slice(1, -1).join('/');
      return last === 'play' ? Exam.playPage(sectionId, main) : Exam.resultPage(sectionId, main);
    }
    if (parts.length >= 4 && parts[parts.length - 2] === 'result-history') {
      const recordId = parts[parts.length - 1];
      const sectionId = parts.slice(1, -2).join('/');
      return Exam.historyResultPage(sectionId, recordId, main);
    }
    return Exam.entryPage(parts.slice(1).join('/'), main);
  }
  return home();
}
```

- [ ] **Step 4：跑全量测试**

跑：`node tests/run.js`，预期 0 失败。

- [ ] **Step 5：浏览器手测**

服务器在 8000 端口（PID 70787）。访问 http://localhost:8000/：

1. 首页看到右上角「登录」按钮（未登录时）。
2. 点「登录」→ 模态框弹出。
3. 输入「xiaoming」→「登录」→ 模态框关闭，右上角显示「xiaoming ▾」。
4. 点「xiaoming ▾」→ 下拉显示「切换账号」「退出登录」。
5. 点「试卷」卡片 → 跳到 /exam（已登录）。
6. 在 /exam 点「退出登录」→ 留在 /exam，右上角变「登录」，页面提示「请先登录」。

预期：所有流程可用。

- [ ] **Step 6：提交**

```bash
git add src/app.js
git commit -m "app.js：page 挂账号区、home 拦截入口、route 加 entryPage"
```

---

## Task 4：exam.js 历史集成 + entryPage + historyResultPage

**Files:**
- Modify: `src/exam.js`
- Modify: `tests/exam.test.js`

- [ ] **Step 1：Exam.submit 写历史**

修改 `src/exam.js` 中 `Exam.submit()` 函数：

```js
submit() {
  const s = read();
  if (!s || s.submitted) return;
  s.submitted = true;
  write(s);
  // 写入历史
  const r = this.result();
  if (r) {
    const elapsedSec = Math.max(0, Math.floor((Date.now() - s.startedAt) / 1000));
    Accounts.history.append(s.username, {
      sectionId: s.sectionId,
      completedAt: Date.now(),
      score: r.correct,
      total: r.total,
      durationSec: elapsedSec,
      items: r.items,
    });
  }
},
```

注意：`durationSec` 算成"实际用时"。上面公式写成"elapsed from start to now"。重写：

```js
const startedAt = s.startedAt;
const completedAt = Date.now();
const elapsedSec = Math.floor((completedAt - startedAt) / 1000);
Accounts.history.append(s.username, {
  sectionId: s.sectionId,
  completedAt,
  score: r.correct,
  total: r.total,
  durationSec: Math.max(0, elapsedSec),
  items: r.items,
});
```

- [ ] **Step 2：Exam.entryPage**

在 `src/exam.js` 的 Exam 对象上加 `entryPage`：

```js
Exam.entryPage = async function (sectionId, main) {
  // 替换原 usernamePage
  const meta = Content.sectionMeta(sectionId);
  if (!meta || !meta.section.ready) {
    return UI.showError(main, '这一节暂未上线');
  }
  const section = await Content.load(sectionId);
  const current = Accounts.current();
  if (!current) {
    // 未登录：在 exam-bar 渲染顶部进度条 + 提示登录
    const head = (function () {
      // 直接 DOM，避免 UI.page 误清
      const app = document.getElementById('app');
      const existing = app.querySelector('header.bar');
      // 旧 app.js 的 exam 分支已经清空了 app，这里重建一个最小 header
      const header = document.createElement('header');
      header.className = 'bar';
      header.innerHTML =
        `<a class="back" href="#/exam" aria-label="返回">‹</a>` +
        `<div class="titles"><h1>${UI.escapeHtml(meta.section.title)}</h1><p>准备开始</p></div>`;
      AccountUI.mount(header);
      main.parentNode.insertBefore(header, main);
      return header;
    })();
    UI.showError(main, '请先登录');
    const btn = document.createElement('button');
    btn.className = 'primary';
    btn.textContent = '登录后开始';
    btn.style.cssText = 'margin-top:12px;padding:10px 16px;border-radius:8px;background:var(--primary);color:#fff;border:none;font-size:15px;';
    btn.addEventListener('click', () => {
      AccountUI.ensureLoggedIn(() => location.reload());
    });
    main.appendChild(btn);
    return;
  }
  Exam.prepare(sectionId, current, section);
  location.hash = `#/exam/${sectionId}/play`;
};
```

**注意**：实际 entryPage 比这复杂；具体路由是 `/exam/<sectionId>` 但已经处理登录检查。原 usernamePage 可以直接被替换为此实现，因为旧的"输入账号后开始"逻辑在 listPage 的卡片点击处已经实现了（点 listPage 的"开始测试"按钮 → ensureLoggedIn + prepare + 跳转 play）。

由于 listPage 已经在客户端拦截，entryPage 主要处理直接访问 URL 的场景（如分享链接）。简化版：直接提示登录或跳转 listPage：

```js
Exam.entryPage = function (sectionId, main) {
  // 直接访问的兜底：未登录提示登录，已登录跳转 listPage
  if (!Accounts.current()) {
    AccountUI.ensureLoggedIn(() => { location.hash = '#/exam'; });
    UI.showError(main, '请先登录');
    return;
  }
  location.hash = '#/exam';
};
```

这是更简单清晰的版本。用这个。

- [ ] **Step 3：Exam.listPage 渲染历史区 + 改小节卡为按钮**

修改 `src/exam.js` 中 `Exam.listPage`：

```js
Exam.listPage = function (main) {
  // 顶部：账号历史 / 未登录提示
  const top = document.createElement('section');
  top.className = 'exam-history';
  const current = Accounts.current();
  if (current) {
    const history = Accounts.history.list(current);
    const metas = Content.sectionMetas().filter(m => m.section.ready);
    // 索引：sectionId -> latest record
    const latestBySection = new Map();
    for (const rec of history) {
      const prev = latestBySection.get(rec.sectionId);
      if (!prev || prev.completedAt < rec.completedAt) {
        latestBySection.set(rec.sectionId, rec);
      }
    }
    top.innerHTML = `<h3 class="group">${UI.escapeHtml(current)} 的考试记录</h3>`;
    const ul = document.createElement('ul');
    metas.forEach(m => {
      const li = document.createElement('li');
      const rec = latestBySection.get(m.id);
      if (rec) {
        const a = document.createElement('a');
        a.href = `#/exam/${m.id}/result-history/${rec.id}`;
        a.textContent = `${m.section.no} ${m.section.title} — ${rec.score}/${rec.total} — ${formatDate(rec.completedAt)}`;
        li.appendChild(a);
      } else {
        const span = document.createElement('span');
        span.className = 'disabled';
        span.textContent = `${m.section.no} ${m.section.title} — 还未考过`;
        li.appendChild(span);
      }
      ul.appendChild(li);
    });
    top.appendChild(ul);
    const clearBtn = document.createElement('button');
    clearBtn.className = 'secondary';
    clearBtn.textContent = '清除我的全部考试记录';
    clearBtn.style.cssText = 'margin-top:8px;padding:6px 10px;border-radius:6px;border:1px solid var(--line);background:var(--card);cursor:pointer;';
    clearBtn.addEventListener('click', () => {
      if (!confirm('确定清除全部考试记录？此操作不可撤销')) return;
      Accounts.history.clear(current);
      // 重渲染
      location.reload();
    });
    top.appendChild(clearBtn);
  } else {
    top.innerHTML = `<h3 class="group">未登录</h3><p>请先登录后查看试卷列表。</p>`;
    const btn = document.createElement('button');
    btn.className = 'primary';
    btn.textContent = '登录';
    btn.style.cssText = 'padding:10px 16px;border-radius:8px;background:var(--primary);color:#fff;border:none;font-size:15px;';
    btn.addEventListener('click', () => {
      AccountUI.ensureLoggedIn(() => location.reload());
    });
    top.appendChild(btn);
  }
  main.appendChild(top);

  // 原有小节列表（保持）
  renderHeader(main, '试卷', '#/', '按小节限时测试');
  const metas = Content.sectionMetas().filter(m => m.section.ready);
  const chapterMap = new Map();
  for (const m of metas) {
    if (!chapterMap.has(m.chapter.no)) chapterMap.set(m.chapter.no, { chapter: m.chapter, items: [] });
    chapterMap.get(m.chapter.no).items.push(m);
  }
  const chapters = [...chapterMap.values()].sort((a, b) => a.chapter.no - b.chapter.no);
  for (const { chapter, items } of chapters) {
    const box = document.createElement('section');
    box.className = 'chapter';
    box.innerHTML = `<h3 class="group">第 ${chapter.no} 章　${UI.escapeHtml(chapter.title)}</h3>`;
    for (const m of items) {
      const card = document.createElement('div');
      card.className = 'exam-card';
      card.innerHTML =
        `<div><div class="name">${UI.escapeHtml(m.section.no)}　${UI.escapeHtml(m.section.title)}</div>` +
        `<div class="meta">20 道 · 约 40 分钟</div></div>` +
        `<button class="start-btn">开始测试</button>`;
      card.querySelector('.start-btn').addEventListener('click', () => {
        AccountUI.ensureLoggedIn(async () => {
          const section = await Content.load(m.id);
          Exam.prepare(m.id, Accounts.current(), section);
          location.hash = `#/exam/${m.id}/play`;
        });
      });
      box.appendChild(card);
    }
    main.appendChild(box);
  }
};

// 帮助函数：格式化时间
function formatDate(ms) {
  const d = new Date(ms);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getMonth() + 1}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
```

- [ ] **Step 4：Exam.historyResultPage**

在 `src/exam.js` 加：

```js
Exam.historyResultPage = async function (sectionId, recordId, main) {
  const current = Accounts.current();
  if (!current) {
    AccountUI.ensureLoggedIn(() => location.reload());
    return;
  }
  const rec = Accounts.history.get(current, recordId);
  if (!rec || rec.sectionId !== sectionId) {
    UI.showError(main, '找不到这次考试记录');
    return;
  }
  const section = await Content.load(sectionId);

  // 复用 resultPage 的样式 + review
  const head = renderHeader(main, section.title, '#/exam', '历史成绩');
  const box = document.createElement('div');
  box.className = 'exam-result';
  box.innerHTML =
    `<div class="score">${rec.score}<small> / ${rec.total}</small></div>` +
    `<div class="meta">${UI.escapeHtml(current)} · 用时 ${Exam.formatTime(rec.durationSec || 0)} · 完成于 ${formatDate(rec.completedAt)}</div>` +
    `<div class="actions">` +
      `<a href="#/exam">返回试卷列表</a>` +
      `<button class="primary" id="retry">再做一次</button>` +
      `<a href="#/s/${sectionId}">考后回到练习</a>` +
    `</div>`;
  main.appendChild(box);

  const review = document.createElement('div');
  review.className = 'exam-review';
  review.innerHTML = rec.items.map((it, i) => {
    const cls = it.ok ? 'right' : 'wrong';
    const mark = it.ok ? '<span class="ok">✓</span>' : '<span class="fail">✗</span>';
    // 注意：历史里 items 没有 level 信息，要从原 section 取
    const lvl = section.questions.find(q => q.id === it.qid)?.level || 'basic';
    return `<details class="item ${cls}"><summary>${mark} <span>${i + 1}</span> <span class="lv lv-${lvl}">${Quiz.LEVEL_NAMES[lvl]}</span></summary></details>`;
  }).join('');
  main.appendChild(review);

  rec.items.forEach((it, i) => {
    const det = review.children[i];
    const body = document.createElement('div');
    body.className = 'body';
    const q = it.question;
    const stem = q ? `<div class="q-stem">${Quiz.renderText(q.stem)}</div>` : '';
    const userText = it.response == null ? '（未作答）' : Quiz.renderText(answerSummaryFor(q, it.response));
    const correctText = q ? Quiz.renderText(answerSummaryFor(q)) : '';
    body.innerHTML =
      stem +
      `<div class="row mine ${it.ok ? '' : 'fail'}"><b>你的作答：</b>${userText}</div>` +
      (q ? `<div class="row correct"><b>正确答案：</b>${correctText}</div>` : '') +
      (q && q.explain ? `<ol class="explain">${q.explain.map(s => `<li>${Quiz.renderText(s)}</li>`).join('')}</ol>` : '');
    det.appendChild(body);
  });

  box.querySelector('#retry').addEventListener('click', () => {
    Exam.clear();
    Exam.prepare(sectionId, Accounts.current(), section);
    location.hash = `#/exam/${sectionId}/play`;
  });
};
```

- [ ] **Step 5：删除旧 usernamePage**

由于 entryPage 替代了 usernamePage，从 exam.js 删掉 `Exam.usernamePage` 函数（如果有）。

- [ ] **Step 6：tests/exam.test.js 加 history 测试**

在 `tests/exam.test.js` 末尾加：

```js
test('Exam.submit 写一条历史', () => {
  for (const k of Object.keys(_ss)) delete _ss[k];
  for (const k of Object.keys(_ls)) delete _ls[k];
  global.Content = { sections: {} };
  Accounts.signIn('xiaoming');
  const sec = { id: 'sec1', questions: [{ id: 'q1', level: 'basic', type: 'choice', options: ['A', 'B'], answer: 1 }] };
  Exam.prepare('sec1', 'xiaoming', sec);
  global.Content.sections.sec1 = sec;
  Exam.setResponse('q1', 1);
  Exam.submit();
  const list = Accounts.history.list('xiaoming');
  assert(list.length === 1, 'submit 后 history 应有 1 条');
  assert(list[0].sectionId === 'sec1');
  assert(list[0].score === 1);
});
```

- [ ] **Step 7：跑全量测试**

跑：`node tests/run.js`，预期 0 失败。

- [ ] **Step 8：浏览器手测**

服务器在 8000 端口。访问 http://localhost:8000/：

1. 登录 xiaoming，进入 /exam。
2. 顶部"xiaoming 的考试记录"：每个小节一行，全部"还未考过"。
3. 点 1.1 的"开始测试" → 答题 → 交卷 → 成绩页。
4. 返回 /exam → 顶部 1.1 显示"15/20 — 时间"。
5. 点 1.1 的历史项 → historyResultPage 渲染历史成绩。
6. 退出登录 → 顶部变"未登录"提示 + 登录按钮。
7. 切换到 keyi → 顶部变"keyi 的考试记录"（隔离）。

预期：所有流程可用。

- [ ] **Step 9：提交**

```bash
git add src/exam.js tests/exam.test.js
git commit -m "exam：submit 写历史、listPage 渲染历史、historyResultPage、entryPage 替代 usernamePage"
```

---

## Task 5：CSS 样式

**Files:**
- Modify: `src/app.css`

- [ ] **Step 1：加账号区 + 模态框 + 历史区样式**

在 `src/app.css` 末尾追加：

```css
/* === 账号区 === */
.account {
  margin-left: auto;
  display: flex; align-items: center;
  position: relative;
}
.account .login-btn,
.account .name-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--card);
  font-size: 14px;
  cursor: pointer;
}
.account .name-btn { color: var(--primary); }
.account .caret { font-size: 10px; margin-left: 2px; }
.account-menu {
  position: absolute; top: 100%; right: 0;
  background: var(--card); border: 1px solid var(--line);
  border-radius: 8px; padding: 6px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
  min-width: 120px;
  z-index: 20;
}
.account-menu button {
  display: block; width: 100%; padding: 8px 14px;
  background: none; border: none; text-align: left;
  font-size: 14px; cursor: pointer; color: var(--text);
}
.account-menu button:hover { background: var(--bg); }

/* === 模态框 === */
.modal {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.modal[hidden] { display: none; }
.modal-body {
  background: var(--card);
  padding: 20px;
  border-radius: 12px;
  width: 90%; max-width: 320px;
}
.modal-body h2 { margin: 0 0 8px; font-size: 18px; }
.modal-body p { margin: 0 0 12px; font-size: 13px; color: var(--muted); }
.modal-body input {
  width: 100%; padding: 10px; font-size: 16px;
  border: 1px solid var(--line); border-radius: 8px;
  box-sizing: border-box;
}
.modal-body .ac-err { color: var(--fail); font-size: 13px; margin: 4px 0 12px; min-height: 16px; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }
.modal-actions .primary,
.modal-actions .secondary {
  padding: 8px 16px; border-radius: 8px; font-size: 14px;
  border: none; cursor: pointer;
}
.modal-actions .primary { background: var(--primary); color: #fff; }
.modal-actions .primary:disabled { background: var(--muted); cursor: not-allowed; }
.modal-actions .secondary { background: transparent; color: var(--primary); }

/* === 试卷历史区 === */
.exam-history {
  background: var(--card);
  padding: 14px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}
.exam-history h3 { margin: 0 0 8px; }
.exam-history ul { padding-left: 0; list-style: none; margin: 0 0 8px; }
.exam-history li { padding: 6px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
.exam-history li:last-child { border-bottom: none; }
.exam-history li a { color: var(--primary); text-decoration: none; }
.exam-history li a:hover { text-decoration: underline; }
.exam-history li.disabled { color: var(--muted); }

.exam-card .start-btn {
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
}
.exam-card .start-btn:hover { background: #245bb8; }
```

- [ ] **Step 2：浏览器手测**

服务器 8000 端口。访问首页 → 看右上角账号区样式 → 点登录 → 看模态框样式 → 登录、退出。

预期：样式正确，移动端也能用。

- [ ] **Step 3：提交**

```bash
git add src/app.css
git commit -m "CSS：账号区、登录模态框、考试历史区样式"
```

---

## Task 6：docs/exam.md 更新

**Files:**
- Modify: `docs/exam.md`

- [ ] **Step 1：更新"修改白名单"段为"账号规则"**

修改 `docs/exam.md` 中的"修改白名单"段：

```markdown
### 账号规则

账号 ID 格式：字母、下划线、数字，长度 1–20，不能是纯数字（至少含一个字母或下划线），首字符不能是数字。无密码。

`src/accounts.js` 的 `NAME_PATTERN`（`/^[A-Za-z_][A-Za-z0-9_]*$/`）和 `NAME_MAX` 控制。修改这两个值即可。

考试历史按账号 ID 保存到 `localStorage['xq.history.v1.<用户名>']`，每个账号一份。退出登录只清当前账号，历史保留。
```

- [ ] **Step 2：提交**

```bash
git add docs/exam.md
git commit -m "docs：更新账号规则段"
```

---

## Task 7：端到端校验

**Files:** 无

- [ ] **Step 1：跑全量测试**

跑：`node tests/run.js`

预期：0 失败。

- [ ] **Step 2：浏览器走 6 种流程**

服务器 8000 端口。访问 http://localhost:8000/：

1. 未登录 → 首页右上角「登录」→ 模态框 → 输入 `1xiaoming` → 实时提示格式错误 → 输入 `xiaoming` → 登录 → 右上角显示「xiaoming ▾」。
2. 点「xiaoming ▾」→ 下拉显示「切换账号」「退出登录」→ 点外侧收起。
3. 点首页「试卷」→ 跳 /exam → 顶部「xiaoming 的考试记录」+ 小节列表 + 「开始测试」按钮。
4. 点 1.1 的「开始测试」→ 答题 → 交卷 → 成绩页。
5. 回 /exam → 顶部 1.1 显示历史项 → 点开 → historyResultPage 渲染题目回顾。
6. 切换账号「alice」→ 顶部变「alisa 的考试记录」（无历史）→ /exam 不再看到 xiaoming 的历史。

预期：所有流程可用。

- [ ] **Step 3：提交总结（如有改动）**

```bash
git status
# 如有未提交改动：
# git add -A
# git commit -m "账号系统重设计：端到端校验完成"
```

---

## 自检

### Spec 覆盖

| Spec 段落 | 实施任务 |
|---|---|
| 账号区（右上角） | Task 2 account-ui.js + Task 3 page() 挂载 + Task 5 CSS |
| 登录模态框 | Task 2 account-ui.js + Task 5 CSS |
| 首页 → 试卷入口拦截 | Task 3 home() |
| 试卷列表顶部历史区 | Task 4 listPage |
| 历史详情页 | Task 4 historyResultPage |
| 退出 / 切换账号 | Task 2 account-ui.js |
| Accounts.formatCheck | Task 1 |
| Accounts.history.* | Task 1 + Task 4 |
| Exam.submit 写历史 | Task 4 |
| entryPage（替换 usernamePage） | Task 4 |
| 测试 | Task 1, 2, 4 |
| CSS | Task 5 |
| docs/exam.md | Task 6 |

### 类型一致性

- `Accounts.signIn(name)` → `{ok, error?, account?}` — UI 端按此处理。
- `Accounts.history.append(username, record)` 静默失败，不抛。
- `Accounts.history.list(username)` → Array<Record>（每项含 id, sectionId, completedAt, score, total, durationSec, items）。
- `Exam.historyResultPage(sectionId, recordId, main)` —— 三参数 UI 函数。
- `AccountUI.mount(headerEl)` —— 返回 wrap DOM。
- `AccountUI.ensureLoggedIn(onLoggedIn)` —— 已登录直接调回调；未登录唤出模态框。

### Placeholder 扫描

通篇搜索 "TBD"、"TODO"、"fill in"、"add appropriate" —— 无。