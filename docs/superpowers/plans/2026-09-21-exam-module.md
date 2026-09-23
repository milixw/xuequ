# 试卷模块实施计划

> **状态：已全部完成，仅作开发过程记录，不要再按它执行。** 现行说明见 [docs/exam.md](../../exam.md)，细节以代码为准。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在学趣闯关新增试卷模块：白名单账号（jiajia / keyi）登录后对某一节做限时测试，交卷后才显示分数和解析。

**Architecture:** 新增 accounts.js（白名单 + 持久化）和 exam.js（状态机 + UI）。从 quiz.js 抽出 `renderQuestion()` 共享渲染函数供练习和考试共用。考试进度走 sessionStorage，与练习进度（Progress / localStorage）隔离。

**Tech Stack:** 纯静态、无构建、原生 ES；自研极简测试工具 `tests/harness.js`；KaTeX 已存在。

**Spec:** `docs/superpowers/specs/2026-09-21-exam-module-design.md`

---

## 文件结构

**新增**：

- `src/accounts.js` — 账号白名单 + 持久化
- `src/exam.js` — 试卷模块（状态机、UI、计时器）
- `docs/exam.md` — 用户/开发者文档
- `tests/accounts.test.js` — 账号测试
- `tests/exam.test.js` — 试卷测试（含判分、计时、sessionStorage）

**修改**：

- `src/quiz.js` — 抽出 `renderQuestion()` 共享渲染，`mount()` 包装它
- `src/app.js` — 增加 `#/exam` 路由 + 首页试卷卡片
- `src/app.css` — 试卷相关样式
- `index.html` — 加载 `accounts.js`、`exam.js`
- `tests/run.js` — 加载新测试文件

**不动**：

- `src/answer.js` — 判分逻辑不变
- `src/content.js`、`content/**` — 内容不变
- `src/progress.js` — 练习进度不变

---

## Task 1：accounts.js — 白名单 + 持久化

**Files:**
- Create: `src/accounts.js`
- Create: `tests/accounts.test.js`
- Modify: `tests/run.js:1-9` — 加 require

- [ ] **Step 1：写失败测试**

在 `tests/accounts.test.js` 写：

```js
'use strict';

const { test, assert } = require('./harness');

// mock localStorage / sessionStorage（node 默认没有）
const _store = {};
global.localStorage = {
  getItem(k) { return _store[k] ?? null; },
  setItem(k, v) { _store[k] = String(v); },
  removeItem(k) { delete _store[k]; },
  clear() { for (const k of Object.keys(_store)) delete _store[k]; },
};

const Accounts = require('../src/accounts.js');

test('accounts.ALLOWED 包含 jiajia 和 keyi', () => {
  assert(Accounts.ALLOWED.includes('jiajia'));
  assert(Accounts.ALLOWED.includes('keyi'));
});

test('isAllowed: 白名单通过', () => {
  assert(Accounts.isAllowed('jiajia'));
  assert(Accounts.isAllowed('keyi'));
});

test('isAllowed: 不在白名单失败', () => {
  assert(!Accounts.isAllowed('admin'));
  assert(!Accounts.isAllowed(''));
  assert(!Accounts.isAllowed(null));
  assert(!Accounts.isAllowed(undefined));
});

test('current 初始为 null', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  assert(Accounts.current() === null);
});

test('signIn 持久化后 current 拿到一致', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('jiajia');
  assert(r.ok, 'signIn 返回 ok');
  assert(Accounts.current() === 'jiajia');
});

test('signIn 拒绝非白名单', () => {
  for (const k of Object.keys(_store)) delete _store[k];
  const r = Accounts.signIn('admin');
  assert(!r.ok, 'admin 拒绝');
  assert(r.error, '返回错误说明');
  assert(Accounts.current() === null, 'current 保持 null');
});

test('signOut 后 current 返回 null', () => {
  Accounts.signIn('keyi');
  Accounts.signOut();
  assert(Accounts.current() === null);
});

test('localStorage 抛错时 signIn 返回错误', () => {
  const orig = localStorage.setItem;
  localStorage.setItem = () => { throw new Error('quota'); };
  const r = Accounts.signIn('jiajia');
  assert(!r.ok, '抛错时 ok=false');
  assert(r.error, '返回 error');
  localStorage.setItem = orig;
});
```

- [ ] **Step 2：跑测试确认失败**

跑：`node tests/accounts.test.js`（临时直接 require harness.run）

预期：`Cannot find module '../src/accounts.js'`

- [ ] **Step 3：实现 accounts.js**

写 `src/accounts.js`：

```js
'use strict';

// 试卷模块账号：白名单，无密码。
// 设计文档：docs/superpowers/specs/2026-09-21-exam-module-design.md

(function (root) {
  const KEY = 'xq.account.v1';
  const ALLOWED = ['jiajia', 'keyi'];

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      return obj && typeof obj.name === 'string' ? obj.name : null;
    } catch {
      return null;
    }
  }

  function write(name) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ name, savedAt: Date.now() }));
      return true;
    } catch {
      return false;
    }
  }

  function remove() {
    try { localStorage.removeItem(KEY); } catch {}
  }

  const Accounts = {
    KEY,
    ALLOWED,

    isAllowed(name) {
      if (typeof name !== 'string') return false;
      return ALLOWED.includes(name.trim());
    },

    current() {
      return read();
    },

    signIn(name) {
      if (!this.isAllowed(name)) {
        return { ok: false, error: '目前只支持 jiajia / keyi' };
      }
      if (!write(name)) {
        return { ok: false, error: '存储不可用' };
      }
      return { ok: true };
    },

    signOut() {
      remove();
    },
  };

  if (typeof module !== 'undefined') module.exports = Accounts;
  else root.Accounts = Accounts;
})(this);
```

- [ ] **Step 4：跑测试确认通过**

临时在 `tests/accounts.test.js` 末尾加 `require('./harness').run()`，跑 `node tests/accounts.test.js`，预期全部通过。

- [ ] **Step 5：接入 run.js**

修改 `tests/run.js`：

```js
'use strict';

require('./answer.test.js');
require('./content.test.js');
require('./function-track.test.js');
require('./accounts.test.js');
require('./exam.test.js');

process.exit(require('./harness').run() ? 1 : 0);
```

（`exam.test.js` 后面建，先空文件不会报错——但用 require 兜底要 file 存在。详见 Task 5 step 1。）

- [ ] **Step 6：跑全量校验**

跑：`node tests/run.js`

预期：除新加的 accounts 用例外，已有 0 失败。accounts 用例全部通过。

- [ ] **Step 7：提交**

```bash
git add src/accounts.js tests/accounts.test.js tests/run.js
git commit -m "accounts 模块：白名单 + 持久化"
```

---

## Task 2：quiz.js 重构 —— 抽出 `renderQuestion()`

**Files:**
- Modify: `src/quiz.js`

- [ ] **Step 1：读当前 quiz.js 看清 mount 实现**

读 `src/quiz.js`，确认 `mount(container, opts)` 内部把题面渲染（stem、figure、answerBox 选项/填空/快捷输入栏）、反馈、解析、上下题导航耦合在一起。后续步骤把"题面 + 输入 + 快捷输入栏"抽到 `renderQuestion`，mount 留下。

- [ ] **Step 2：抽出 renderQuestion**

在 `src/quiz.js` 顶部 `(function (root) {` 后加：

```js
  // 共享渲染：渲染题号、题干、配图、答案输入、快捷输入栏
  // handlers: { onAnswerChange?(response), onSubmit?() }
  // 返回 { setDisabled(bool), setResponse(response), getResponse() }
  function renderQuestion(container, q, opts) {
    opts = opts || {};
    container.innerHTML = '';

    const head = el('div', 'q-head');
    head.innerHTML =
      `<span class="lv lv-${q.level}">${LEVEL_NAMES[q.level]}</span>` +
      `<span class="q-no">第 ${opts.index + 1} / ${opts.total} 题</span>` +
      `<span class="q-id" title="题号，纠错时请写上">${q.id}</span>` +
      `<span class="q-state"></span>`;
    container.appendChild(head);

    container.appendChild(el('div', 'q-stem', renderText(q.stem)));
    if (q.figure) container.appendChild(el('div', 'q-figure', q.figure));

    const answerBox = el('div', 'q-answer');
    container.appendChild(answerBox);
    let selected = q.type === 'multi' ? new Set() : null;
    const inputs = [];
    let lastInput = null;
    let notify = opts.onAnswerChange || (() => {});
    let locked = false;

    function lock(state) {
      locked = state;
      answerBox.querySelectorAll('input, button.option, .seg button').forEach(x => {
        x.disabled = state;
      });
    }

    function fire() {
      if (locked) return;
      if (q.type === 'choice') notify(selected);
      else if (q.type === 'multi') notify([...selected]);
      else notify(inputs.map(x => x.get()));
    }

    if (q.type === 'choice' || q.type === 'multi') {
      if (q.type === 'multi') answerBox.appendChild(el('p', 'hint', '多选题：选出所有正确的选项'));
      q.options.forEach((opt, i) => {
        const b = el('button', 'option', `<span class="letter">${LETTERS[i]}</span><span class="text">${renderText(opt)}</span>`);
        b.type = 'button';
        b.addEventListener('click', () => {
          if (locked) return;
          if (q.type === 'choice') {
            selected = i;
            answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', j === i));
          } else {
            selected.has(i) ? selected.delete(i) : selected.add(i);
            b.classList.toggle('selected', selected.has(i));
          }
          fire();
        });
        answerBox.appendChild(b);
      });
    } else {
      q.blanks.forEach(blank => {
        const row = el('div', 'blank');
        if (blank.label) row.appendChild(el('span', 'label', renderText(blank.label)));
        if (blank.options) {
          let value = null;
          const group = el('div', 'seg');
          blank.options.forEach(o => {
            const b = el('button', '', renderText(/^[<>=≤≥≠]$/.test(o) ? `$${o}$` : o));
            b.type = 'button';
            b.addEventListener('click', () => {
              if (locked) return;
              value = o;
              group.querySelectorAll('button').forEach(x => x.classList.toggle('selected', x === b));
              fire();
            });
            group.appendChild(b);
          });
          row.appendChild(group);
          inputs.push({ get: () => value });
        } else {
          const input = el('input');
          input.type = 'text';
          input.autocomplete = 'off';
          input.setAttribute('autocapitalize', 'off');
          input.spellcheck = false;
          input.inputMode = blank.kind === 'num' || blank.kind === 'nums' ? 'decimal' : 'text';
          input.placeholder = blank.kind === 'nums' ? '多个答案用逗号隔开' : '';
          input.addEventListener('focus', () => (lastInput = input));
          input.addEventListener('input', () => {
            if (locked) return;
            fire();
          });
          input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && opts.onSubmit) opts.onSubmit();
          });
          row.appendChild(input);
          inputs.push({ get: () => input.value, input });
        }
        if (blank.suffix) row.appendChild(el('span', 'suffix', renderText(blank.suffix)));
        answerBox.appendChild(row);
      });

      const keys = quickKeys(q.blanks);
      if (keys.length) {
        const bar = el('div', 'keys');
        keys.forEach(k => {
          const b = el('button', '', escapeHtml(k));
          b.type = 'button';
          b.addEventListener('pointerdown', e => {
            e.preventDefault();
            const target = lastInput || (inputs.find(x => x.input) || {}).input;
            if (!target) return;
            const start = target.selectionStart ?? target.value.length;
            const end = target.selectionEnd ?? target.value.length;
            target.value = target.value.slice(0, start) + k + target.value.slice(end);
            target.setSelectionRange(start + k.length, start + k.length);
            target.focus();
            target.dispatchEvent(new Event('input'));
          });
          bar.appendChild(b);
        });
        answerBox.appendChild(bar);
      }
    }

    return {
      setDisabled: lock,
      setResponse(response) {
        if (q.type === 'choice') {
          selected = response;
          answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', j === response));
        } else if (q.type === 'multi') {
          selected = new Set(response || []);
          answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', selected.has(j)));
        } else {
          (response || []).forEach((v, i) => {
            const it = inputs[i] && inputs[i].input;
            if (it) it.value = v == null ? '' : String(v);
          });
        }
      },
      getResponse() {
        if (q.type === 'choice') return selected;
        if (q.type === 'multi') return [...selected];
        return inputs.map(x => x.get());
      },
    };
  }
```

- [ ] **Step 3：重写 mount() 包装 renderQuestion**

替换 `mount(container, opts)` 函数体（保留函数签名和 `nav`/上下题链接逻辑），用 renderQuestion 画题面，再加原有的"提交"、"看解析"按钮、反馈、解析区、上下题导航。完整替换后：

```js
  function mount(container, opts) {
    const { sectionId, q } = opts;
    container.innerHTML = '';

    const handle = renderQuestion(container, q, { index: opts.index, total: opts.total });

    const stateEl = container.querySelector('.q-state');
    const showState = () => {
      const st = Progress.status(sectionId, q.id);
      stateEl.textContent = st === 'solved' ? '✓ 已答对' : st === 'revealed' ? '看过解析' : '';
      stateEl.className = 'q-state ' + st;
    };
    showState();

    const feedback = el('div', 'feedback');
    container.appendChild(feedback);
    const actions = el('div', 'q-actions');
    const revealBtn = el('button', 'secondary', '看解析');
    const submitBtn = el('button', 'primary', '提交');
    revealBtn.type = submitBtn.type = 'button';
    actions.append(revealBtn, submitBtn);
    container.appendChild(actions);
    const explain = el('div', 'explain');
    explain.hidden = true;
    container.appendChild(explain);

    function clearFeedback() {
      feedback.className = 'feedback';
      feedback.textContent = '';
    }
    function setFeedback(kind, text) {
      feedback.className = 'feedback ' + kind;
      feedback.textContent = text;
    }

    function submit() {
      const response = handle.getResponse();
      if (q.type === 'choice' && response === null) return setFeedback('info', '先选一个答案');
      if (q.type === 'multi' && !response.length) return setFeedback('info', '先选出答案');
      const result = Answer.checkQuestion(q, response);
      const hint = result.blanks && result.blanks.find(b => !b.ok && b.error);
      if (hint) {
        return setFeedback('info', hint.error);
      }
      Progress.record(sectionId, q.id, result.ok);
      if (result.ok) {
        setFeedback('ok', '✓ 回答正确！');
        revealBtn.textContent = '看看解析';
      } else {
        setFeedback('fail', '✗ 不对哦，再想想。实在想不出来可以看解析');
      }
      showState();
    }

    function answerSummary() {
      if (q.type === 'choice') return `${LETTERS[q.answer]}. ${renderText(q.options[q.answer])}`;
      if (q.type === 'multi') return [...q.answer].sort().map(i => LETTERS[i]).join('、');
      return q.blanks
        .map(b => (b.label ? renderText(b.label) + ' ' : '') + renderText(Answer.answerText(b)) + (b.suffix ? ' ' + renderText(b.suffix) : ''))
        .join('；');
    }

    function reveal() {
      if (explain.hidden) {
        explain.innerHTML =
          `<div class="answer-line"><b>答案：</b>${answerSummary()}</div>` +
          `<ol>${q.explain.map(s => `<li>${renderText(s)}</li>`).join('')}</ol>`;
        explain.hidden = false;
        if (Progress.status(sectionId, q.id) !== 'solved') Progress.reveal(sectionId, q.id);
        revealBtn.textContent = '收起解析';
        showState();
        explain.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        explain.hidden = true;
        revealBtn.textContent = '看解析';
      }
    }

    submitBtn.addEventListener('click', submit);
    revealBtn.addEventListener('click', reveal);

    const nav = el('nav', 'q-nav');
    nav.innerHTML =
      (opts.prevHref ? `<a href="${opts.prevHref}">‹ 上一题</a>` : '<span></span>') +
      (opts.nextHref ? `<a href="${opts.nextHref}">下一题 ›</a>` : '<span></span>');
    container.appendChild(nav);
  }
```

把 `root.Quiz = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES };` 暴露 renderQuestion。

- [ ] **Step 4：浏览器手测练习路径**

打开 `http://localhost:8000`，进任意小节、任意题：

1. 选一项选择题 → 点"提交" → 反馈正确。
2. 填空题输入数值 → 点"提交" → 反馈。
3. 点"看解析" → 解析展开。
4. 上下题链接正常。

预期：和重构前完全一致。

- [ ] **Step 5：跑全量测试**

跑：`node tests/run.js`

预期：0 失败。

- [ ] **Step 6：提交**

```bash
git add src/quiz.js
git commit -m "quiz.js 重构：抽出 renderQuestion 共享渲染"
```

---

## Task 3：exam.js 纯逻辑（session、time、scoring）

**Files:**
- Create: `tests/exam.test.js`
- Create: `src/exam.js`（仅逻辑部分，UI 在 Task 5）

- [ ] **Step 1：写失败测试**

写 `tests/exam.test.js`：

```js
'use strict';

const { test, assert } = require('./harness');

// mock localStorage / sessionStorage
const _ls = {};
const _ss = {};
global.localStorage = {
  getItem(k) { return _ls[k] ?? null; },
  setItem(k, v) { _ls[k] = String(v); },
  removeItem(k) { delete _ls[k]; },
};
global.sessionStorage = {
  getItem(k) { return _ss[k] ?? null; },
  setItem(k, v) { _ss[k] = String(v); },
  removeItem(k) { delete _ss[k]; },
};
global.Date = { now: () => 1731910000000 };

const Exam = require('../src/exam.js');
const Answer = require('../src/answer.js');

test('Exam.formatTime: 0 → 00:00', () => {
  assert(Exam.formatTime(0) === '00:00');
});
test('Exam.formatTime: 75 → 01:15', () => {
  assert(Exam.formatTime(75) === '01:15');
});

test('Exam.totalSeconds: 标准 5+10+5 = 2400', () => {
  const qs = [
    ...Array(5).fill({ level: 'basic' }),
    ...Array(10).fill({ level: 'extended' }),
    ...Array(5).fill({ level: 'challenge' }),
  ];
  assert(Exam.totalSeconds(qs) === 2400);
});
test('Exam.totalSeconds: 空数组 = 0', () => {
  assert(Exam.totalSeconds([]) === 0);
});
test('Exam.totalSeconds: 未知档位当 0', () => {
  assert(Exam.totalSeconds([{ level: 'unknown' }]) === 0);
});

test('Exam.prepare: 写入 session 并能读出', () => {
  for (const k of Object.keys(_ss)) delete _ss[k];
  const qs = [
    { id: 'q1', level: 'basic' },
    { id: 'q2', level: 'extended' },
  ];
  const sec = { id: 'sec1', questions: qs };
  Exam.prepare('sec1', 'jiajia', sec);
  const s = Exam.session();
  assert(s, 'session 存在');
  assert(s.username === 'jiajia');
  assert(s.sectionId === 'sec1');
  assert(s.questions.length === 2);
  assert(s.totalSeconds === 60 + 120);
  assert(s.submitted === false);
  assert(s.deadlineAt === 1731910000000 + (60 + 120) * 1000);
});

test('Exam.setResponse 写入后 session.answers 拿到', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.setResponse('q1', 2);
  assert(Exam.session().answers.q1 === 2);
});

test('Exam.submit 后 submitted=true', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.setResponse('q1', 0);
  Exam.submit();
  assert(Exam.session().submitted === true);
});

test('Exam.submit 后再 setResponse 抛错', () => {
  assert.throws(() => Exam.setResponse('q1', 1), '已交卷不应再改');
});

test('Exam.clear 后 session 为 null', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  Exam.clear();
  assert(Exam.session() === null);
});

test('Exam.remainingSeconds 用 Date.now() 算', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic' }] });
  // basic 60s
  global.Date.now = () => 1731910000000 + 30 * 1000;
  assert(Exam.remainingSeconds() === 30);
  global.Date.now = () => 1731910000000 + 70 * 1000;
  assert(Exam.remainingSeconds() === 0, '已超时返回 0 不为负');
});

test('Exam.result 算分', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic', type: 'choice', options: ['A','B'], answer: 1 }] });
  Exam.setResponse('q1', 1);
  const result = Exam.result();
  assert(result.total === 1);
  assert(result.correct === 1);
  assert(result.items[0].ok === true);
});

test('Exam.result 未作答计 0', () => {
  Exam.prepare('sec1', 'jiajia', { id: 'sec1', questions: [{ id: 'q1', level: 'basic', type: 'choice', options: ['A','B'], answer: 1 }] });
  // 不 setResponse
  const result = Exam.result();
  assert(result.correct === 0);
  assert(result.items[0].ok === false);
});
```

- [ ] **Step 2：跑测试确认失败**

跑：`node tests/exam.test.js`

预期：`Cannot find module '../src/exam.js'`

- [ ] **Step 3：实现 exam.js 纯逻辑部分**

写 `src/exam.js`：

```js
'use strict';

// 试卷模块：状态机 + UI。
// 设计文档：docs/superpowers/specs/2026-09-21-exam-module-design.md

(function (root) {
  const KEY = 'xq.exam.v1';
  const PER_LEVEL = { basic: 60, extended: 120, challenge: 180 };

  function ss() {
    try { return root.sessionStorage; } catch { return null; }
  }
  function read() {
    const s = ss();
    if (!s) return null;
    try { const r = s.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; }
  }
  function write(obj) {
    const s = ss();
    if (!s) return false;
    try { s.setItem(KEY, JSON.stringify(obj)); return true; } catch { return false; }
  }
  function clear() {
    const s = ss();
    if (!s) return;
    try { s.removeItem(KEY); } catch {}
  }

  function formatTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function totalSeconds(questions) {
    return questions.reduce((n, q) => n + (PER_LEVEL[q.level] || 0), 0);
  }

  function buildSession(sectionId, username, section) {
    const total = totalSeconds(section.questions);
    const now = Date.now();
    return {
      username,
      sectionId,
      questions: section.questions.map(q => ({ qid: q.id, level: q.level })),
      totalSeconds: total,
      startedAt: now,
      deadlineAt: now + total * 1000,
      answers: {},
      currentIndex: 0,
      submitted: false,
    };
  }

  const Exam = {
    KEY,
    PER_LEVEL,

    formatTime,
    totalSeconds,

    prepare(sectionId, username, section) {
      const s = buildSession(sectionId, username, section);
      write(s);
      return s;
    },

    session() {
      return read();
    },

    clear,

    setResponse(qid, response) {
      const s = read();
      if (!s) return;
      if (s.submitted) throw new Error('已交卷，不能修改作答');
      s.answers[qid] = response;
      write(s);
    },

    getResponse(qid) {
      const s = read();
      return s ? s.answers[qid] : undefined;
    },

    jump(index) {
      const s = read();
      if (!s || s.submitted) return;
      s.currentIndex = Math.max(0, Math.min(index, s.questions.length - 1));
      write(s);
    },

    submit() {
      const s = read();
      if (!s || s.submitted) return;
      s.submitted = true;
      write(s);
    },

    remainingSeconds() {
      const s = read();
      if (!s) return 0;
      return Math.max(0, Math.floor((s.deadlineAt - Date.now()) / 1000));
    },

    // 算分：依赖 Answer.checkQuestion
    result() {
      const s = read();
      if (!s) return null;
      const section = Content.sections[s.sectionId];
      const items = [];
      let correct = 0;
      for (const meta of s.questions) {
        const q = section && section.questions.find(x => x.id === meta.qid);
        const response = s.answers[meta.qid];
        if (!q) { items.push({ qid: meta.qid, ok: false, response, correct: null, error: '题目找不到' }); continue; }
        const isAnswered = response !== undefined && response !== null &&
          !(response instanceof Set && response.size === 0) &&
          !(Array.isArray(response) && response.length === 0);
        if (!isAnswered) { items.push({ qid: meta.qid, ok: false, response: null, correct: q }); correct += 0; continue; }
        try {
          const r = Answer.checkQuestion(q, response);
          items.push({ qid: meta.qid, ok: r.ok, response, correct: q });
          if (r.ok) correct++;
        } catch (e) {
          items.push({ qid: meta.qid, ok: false, response, correct: q, error: e.message });
        }
      }
      return { correct, total: items.length, items };
    },
  };

  if (typeof module !== 'undefined') module.exports = Exam;
  else root.Exam = Exam;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4：跑测试确认通过**

跑：`node tests/exam.test.js`，预期全部通过。

- [ ] **Step 5：跑全量测试**

跑：`node tests/run.js`，预期 0 失败。

- [ ] **Step 6：提交**

```bash
git add src/exam.js tests/exam.test.js
git commit -m "exam 模块：纯逻辑（session/time/scoring）"
```

---

## Task 4：index.html 加载新脚本

**Files:**
- Modify: `index.html:11-19`

- [ ] **Step 1：插入新脚本**

修改 `index.html`：

```html
<script src="vendor/katex/katex.min.js"></script>
<script src="src/answer.js"></script>
<script src="src/accounts.js"></script>
<script src="src/progress.js"></script>
<script src="src/content.js"></script>
<script src="content/catalog.js"></script>
<script src="src/quiz.js"></script>
<script src="src/exam.js"></script>
<script src="src/app.js"></script>
```

- [ ] **Step 2：浏览器打开首页确认无报错**

跑：访问 `http://localhost:8000/`

预期：首页正常渲染，没有"Accounts is not defined"等。

- [ ] **Step 3：提交**

```bash
git add index.html
git commit -m "加载 accounts.js 和 exam.js 脚本"
```

---

## Task 5：exam.js UI —— 列表 / 账号确认 / 答题 / 成绩页

**Files:**
- Modify: `src/exam.js`（追加 UI 函数）
- Modify: `src/app.css`（追加样式）

- [ ] **Step 1：app.css 追加试卷样式**

在 `src/app.css` 末尾追加：

```css
/* === 试卷模块 === */
.exam-card {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 14px; margin-bottom: 8px;
  background: var(--card); border-radius: 10px;
}
.exam-card.disabled { opacity: .55; }
.exam-card .meta { font-size: 13px; color: var(--muted); }
.exam-card .name { font-size: 15px; font-weight: 600; }

.exam-username {
  background: var(--card); padding: 16px; border-radius: 12px;
}
.exam-username input {
  width: 100%; padding: 10px; font-size: 16px;
  border: 1px solid var(--line); border-radius: 8px; margin: 8px 0;
}
.exam-username .primary, .exam-username .secondary {
  padding: 10px 16px; border-radius: 8px; font-size: 15px;
}
.exam-username .primary { background: var(--primary); color: #fff; border: none; }
.exam-username .secondary { background: transparent; color: var(--primary); border: none; cursor: pointer; }
.exam-username .err { color: var(--fail); font-size: 13px; }

.exam-bar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; gap: 12px;
  background: var(--bg); border-bottom: 1px solid var(--line);
  padding: 8px 0;
}
.exam-bar .title { font-size: 14px; font-weight: 600; flex: 1; }
.exam-bar .timer {
  font-size: 18px; font-variant-numeric: tabular-nums;
  padding: 4px 10px; border-radius: 6px; background: var(--card);
}
.exam-bar .timer.urgent { background: var(--fail-bg); color: var(--fail); }
.exam-bar .timer.flash { animation: exam-flash 1s linear infinite; }
@keyframes exam-flash { 50% { opacity: .35; } }
.exam-bar .submit {
  padding: 8px 14px; border-radius: 8px; border: 1px solid var(--fail);
  color: var(--fail); background: var(--card); font-size: 14px;
}

.exam-nav {
  position: sticky; bottom: 0; z-index: 10;
  background: var(--bg); border-top: 1px solid var(--line);
  padding: 10px 0;
}
.exam-nav .level-group { margin-bottom: 6px; }
.exam-nav .level-group h5 { margin: 0 0 6px; font-size: 12px; color: var(--muted); font-weight: normal; }
.exam-nav .tiles {
  display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px;
}
.exam-nav .tile {
  position: relative; height: 32px; display: flex; align-items: center; justify-content: center;
  border-radius: 6px; background: var(--card); border: 1px solid var(--line);
  font-size: 13px; color: var(--muted);
}
.exam-nav .tile.answered { background: var(--extended); color: #fff; border-color: var(--extended); }
.exam-nav .tile.current { outline: 2px solid var(--primary); outline-offset: -2px; }

.exam-result { background: var(--card); border-radius: 12px; padding: 18px; margin-top: 12px; }
.exam-result .score {
  font-size: 48px; font-weight: 700; text-align: center;
  font-variant-numeric: tabular-nums;
}
.exam-result .score small { font-size: 24px; color: var(--muted); }
.exam-result .meta { text-align: center; color: var(--muted); font-size: 13px; margin-top: 4px; }
.exam-result .actions { display: flex; gap: 10px; justify-content: center; margin-top: 14px; flex-wrap: wrap; }
.exam-result .actions a, .exam-result .actions button {
  padding: 10px 14px; border-radius: 8px; border: 1px solid var(--line);
  background: var(--card); font-size: 14px; cursor: pointer;
}
.exam-result .actions .primary { background: var(--primary); color: #fff; border-color: var(--primary); }

.exam-review { margin-top: 14px; }
.exam-review .item {
  padding: 10px 12px; background: var(--card); border-radius: 10px; margin-bottom: 8px;
}
.exam-review .item.wrong { border-left: 4px solid var(--fail); }
.exam-review .item.right { border-left: 4px solid var(--ok); }
.exam-review .item summary {
  cursor: pointer; list-style: none; display: flex; align-items: center; gap: 8px;
}
.exam-review .item summary::-webkit-details-marker { display: none; }
.exam-review .item .ok { color: var(--ok); font-weight: 700; }
.exam-review .item .fail { color: var(--fail); font-weight: 700; }
.exam-review .body { padding: 10px 0 0; font-size: 14px; }
.exam-review .body .row { margin: 4px 0; }
.exam-review .body .row b { color: var(--muted); margin-right: 6px; font-weight: normal; }
.exam-review .body .row.mine.fail b { color: var(--fail); }
.exam-review .body .row.correct b { color: var(--ok); }
```

- [ ] **Step 2：app.js 增加试卷路由（先空实现）**

在 `src/app.js` 末尾 `route()` 函数里插入：

```js
  if (parts[0] === 'exam') {
    if (parts.length === 1) return Exam.listPage(main);
    if (parts.length === 2) return Exam.usernamePage(parts[1], main);
    if (parts[2] === 'play') return Exam.playPage(parts[1], main);
    if (parts[2] === 'result') return Exam.resultPage(parts[1], main);
  }
```

把 `function home()` 末尾追加"试卷"卡片（在 games 之前）：

```js
    const exam = document.createElement('a');
    exam.className = 'card volume';
    exam.href = '#/exam';
    exam.innerHTML =
      `<span class="tag">试卷</span>` +
      `<h2>按章节限时测试</h2>` +
      `<p>先交卷，再看分数和错题解析</p>`;
    main.appendChild(exam);
```

`page(title, backHref, subtitle)` 已经在 router 里被 home / volumePage 调用。route() 函数末尾 `home()` 之前插入新分支。Exam.listPage 等需要 main 参数——但 home/volumePage 都是新建 main。在 route() 里改：

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
      if (parts.length === 2) return Exam.usernamePage(parts[1], main);
      if (parts[2] === 'play') return Exam.playPage(parts[1], main);
      if (parts[2] === 'result') return Exam.resultPage(parts[1], main);
    }
    return home();
  }
```

注意：`main` 是 vault 变量名，要避免和现有 main 重名。

实际实现中 `app` 已是模块顶部的 `document.getElementById('app')`，可以直接用；不要 shadowing 现有的 `page(title, backHref, subtitle)` 里也用 `main`。Exam 的页面要展示顶栏，复用 `page(title, backHref, subtitle)`：把它暴露给 Exam 模块——把 `page` 移到 route() 外面（和现有 home/volumePage 同级），然后通过 `Exam.setUI({ page, showError })` 注入。

具体做法：

在 `src/app.js` 顶部 `(function () {` 后面加：

```js
  const ui = {
    page, // (referenced)
    showError,
    escapeHtml,
  };
```

`page` 函数现在是 function declaration，会被 hoisted 但 var 引用 `app` 变量。要保证初始化时 ui 已就绪。简单做法：

```js
  const examUI = { page, showError, escapeHtml };
```

在 route() 之前赋值：

```js
  Exam.bindUI(examUI);
```

把 page 移出 route()（已经是 module-scope），直接 `const examUI = { page, showError, escapeHtml };` 在 `route()` 定义之前。

- [ ] **Step 3：exam.js 暴露 bindUI + 实现四个 UI 函数**

在 `src/exam.js` 末尾（`if (typeof module !== 'undefined') ... else root.Exam = Exam;` 之前）追加：

```js
  // ---------- UI ----------
  let UI = null;
  Exam.bindUI = function (ui) { UI = ui; };

  function backToList() { location.hash = '#/exam'; }
  function backToSection(sectionId) { location.hash = '#/s/' + sectionId; }

  function renderHeader(main, title, backHref, subtitle) {
    const head = UI.page(title, backHref, subtitle);
    main.appendChild(head);
    return head;
  }

  // ---------- 列表 ----------
  Exam.listPage = function (main) {
    const head = renderHeader(main, '试卷', '#/', '按小节限时测试');
    const metas = Content.sectionMetas().filter(m => m.section.ready);
    for (const chapter of (function () {
      const chs = []; const seen = new Set();
      for (const m of metas) {
        if (!seen.has(m.chapter.no)) { seen.add(m.chapter.no); chs.push(m.chapter); }
      }
      return chs.sort((a, b) => a.no - b.no);
    })()) {
      const box = document.createElement('section');
      box.className = 'chapter';
      box.innerHTML = `<h3 class="group">第 ${chapter.no} 章　${UI.escapeHtml(chapter.title)}</h3>`;
      for (const m of metas.filter(x => x.chapter === chapter)) {
        const card = document.createElement('a');
        card.className = 'exam-card';
        card.href = `#/exam/s/${m.id}`;
        card.innerHTML =
          `<div><div class="name">${UI.escapeHtml(m.section.no)}　${UI.escapeHtml(m.section.title)}</div>` +
          `<div class="meta">${m.section.no} · 20 道 · 约 40 分钟</div></div>`;
        box.appendChild(card);
      }
      main.appendChild(box);
    }
  };

  // ---------- 账号确认 ----------
  Exam.usernamePage = async function (sectionId, main) {
    const meta = Content.sectionMeta(sectionId);
    if (!meta || !meta.section.ready) {
      return UI.showError(main, '这一节暂未上线');
    }
    const section = await Content.load(sectionId);
    renderHeader(main, meta.section.title, '#/exam', '准备开始');

    const wrap = document.createElement('div');
    wrap.className = 'exam-username';
    wrap.innerHTML =
      `<p>本节共 <b>${section.questions.length}</b> 道，预计 <b>${Exam.formatTime(Exam.totalSeconds(section.questions))}</b></p>`;
    const current = Accounts.current();
    if (current) {
      wrap.innerHTML += `<p>当前账号：<b>${UI.escapeHtml(current)}</b> <button class="secondary" id="swap">换账号</button></p>`;
    }
    wrap.innerHTML +=
      `<div id="form"${current ? ' hidden' : ''}>` +
      `<p>输入你的姓名</p>` +
      `<input type="text" id="name" autocomplete="off" autocapitalize="off" placeholder="目前只支持 jiajia / keyi">` +
      `<p class="err" id="err"></p>` +
      `<button class="primary" id="go">开始测试</button>` +
      `</div>`;
    main.appendChild(wrap);

    const form = wrap.querySelector('#form');
    const err = wrap.querySelector('#err');
    const input = wrap.querySelector('#name');
    const swap = wrap.querySelector('#swap');
    if (swap) swap.addEventListener('click', () => {
      form.hidden = false;
      input.focus();
    });
    function start() {
      const name = input.value.trim();
      if (!name) { err.textContent = '请输入账号'; return; }
      const r = Accounts.signIn(name);
      if (!r.ok) { err.textContent = r.error; return; }
      Exam.prepare(sectionId, Accounts.current(), section);
      location.hash = `#/exam/s/${sectionId}/play`;
    }
    wrap.querySelector('#go').addEventListener('click', start);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
  };

  // ---------- 答题 ----------
  Exam.playPage = async function (sectionId, main) {
    const s = Exam.session();
    if (!s || s.sectionId !== sectionId || s.submitted) {
      location.hash = `#/exam/s/${sectionId}`;
      return;
    }
    const section = await Content.load(sectionId);
    const q = section.questions.find(x => x.id === s.questions[s.currentIndex].qid);

    // 顶部固定栏：标题 / 计时器 / 交卷
    const bar = document.createElement('div');
    bar.className = 'exam-bar';
    bar.innerHTML =
      `<div class="title">${UI.escapeHtml(section.title)}</div>` +
      `<div class="timer" id="timer">--:--</div>` +
      `<button class="submit" id="submit">交卷</button>`;
    main.appendChild(bar);

    // 题目容器
    const qc = document.createElement('div');
    main.appendChild(qc);

    // 底部导航
    const nav = document.createElement('div');
    nav.className = 'exam-nav';
    main.appendChild(nav);

    const handle = Quiz.renderQuestion(qc, q, { index: s.currentIndex, total: s.questions.length });

    // 恢复已作答
    if (s.answers[q.id] !== undefined) handle.setResponse(s.answers[q.id]);

    // 计时
    function tick() {
      const left = Exam.remainingSeconds();
      const t = bar.querySelector('#timer');
      t.textContent = Exam.formatTime(left);
      t.classList.toggle('urgent', left <= 60 && left > 0);
      t.classList.toggle('flash', left <= 10 && left > 0);
      if (left === 0) {
        clearInterval(timer);
        Exam.submit();
        location.hash = `#/exam/s/${sectionId}/result`;
      }
    }
    tick();
    const timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });

    // 交卷按钮
    bar.querySelector('#submit').addEventListener('click', () => {
      if (!confirm('确定交卷？未答题将被记 0 分')) return;
      clearInterval(timer);
      Exam.submit();
      location.hash = `#/exam/s/${sectionId}/result`;
    });

    // 导航条
    function renderNav() {
      const sess = Exam.session();
      nav.innerHTML = '';
      const groups = { basic: [], extended: [], challenge: [] };
      sess.questions.forEach((m, i) => groups[m.level] && groups[m.level].push({ m, i }));
      for (const lv of ['basic', 'extended', 'challenge']) {
        if (!groups[lv].length) continue;
        const g = document.createElement('div');
        g.className = 'level-group';
        g.innerHTML = `<h5>${Quiz.LEVEL_NAMES[lv]}（${groups[lv].length}）</h5>` +
          `<div class="tiles">${groups[lv].map(({ m, i }) => {
            const answered = sess.answers[m.qid] !== undefined && sess.answers[m.qid] !== null;
            return `<button class="tile ${answered ? 'answered' : ''} ${i === sess.currentIndex ? 'current' : ''}" data-i="${i}">${i + 1}</button>`;
          }).join('')}</div>`;
        nav.appendChild(g);
      }
      nav.querySelectorAll('.tile').forEach(b => {
        b.addEventListener('click', () => {
          const i = Number(b.dataset.i);
          Exam.jump(i);
          location.reload();
        });
      });
    }
    renderNav();

    // 作答变化：写入 session
    qc.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => {
        const resp = handle.getResponse();
        Exam.setResponse(q.id, resp);
        renderNav();
      });
    });
    // 监听选项按钮点击（renderQuestion 内部 fire 没传 onAnswerChange，所以要靠 click 委托）
    qc.addEventListener('click', e => {
      if (e.target.closest('.option') || e.target.closest('.seg button')) {
        setTimeout(() => {
          Exam.setResponse(q.id, handle.getResponse());
          renderNav();
        }, 0);
      }
    });
  };

  // ---------- 成绩页 ----------
  Exam.resultPage = async function (sectionId, main) {
    const s = Exam.session();
    if (!s || s.sectionId !== sectionId) {
      location.hash = `#/exam/s/${sectionId}`;
      return;
    }
    if (!s.submitted) {
      location.hash = `#/exam/s/${sectionId}/play`;
      return;
    }
    const section = await Content.load(sectionId);
    const r = Exam.result();
    const elapsed = Math.floor((Date.now() - s.startedAt) / 1000);

    const head = renderHeader(main, section.title, '#/exam', '成绩');
    const box = document.createElement('div');
    box.className = 'exam-result';
    box.innerHTML =
      `<div class="score">${r.correct}<small> / ${r.total}</small></div>` +
      `<div class="meta">${UI.escapeHtml(s.username)} · 用时 ${Exam.formatTime(elapsed)}</div>` +
      `<div class="actions">` +
      `<a href="#/exam">返回试卷列表</a>` +
      `<button class="primary" id="retry">再来一次</button>` +
      `<a href="#/s/${sectionId}">考后回到练习</a>` +
      `</div>`;
    main.appendChild(box);

    const review = document.createElement('div');
    review.className = 'exam-review';
    review.innerHTML = r.items.map((it, i) => {
      const cls = it.ok ? 'right' : 'wrong';
      const mark = it.ok ? '<span class="ok">✓</span>' : '<span class="fail">✗</span>';
      const lvl = s.questions[i].level;
      return `<details class="item ${cls}"><summary>${mark} <span>${i + 1}</span> <span class="lv lv-${lvl}">${Quiz.LEVEL_NAMES[lvl]}</span></summary></details>`;
    }).join('');
    main.appendChild(review);

    // 展开每项，填具体内容
    r.items.forEach((it, i) => {
      const det = review.children[i];
      const body = document.createElement('div');
      body.className = 'body';
      const q = it.correct;
      const stem = q ? `<div class="q-stem">${Quiz.renderText(q.stem)}</div>` : '';
      body.innerHTML =
        stem +
        `<div class="row mine ${it.ok ? '' : 'fail'}"><b>你的作答：</b>${it.response == null ? '（未作答）' : Quiz.renderText(String(it.response))}</div>` +
        (q ? `<div class="row correct"><b>正确答案：</b>${Quiz.renderText(answerSummaryFor(q))}</div>` : '') +
        (q && q.explain ? `<ol class="explain">${q.explain.map(s => `<li>${Quiz.renderText(s)}</li>`).join('')}</ol>` : '');
      det.appendChild(body);
    });

    box.querySelector('#retry').addEventListener('click', () => {
      Exam.clear();
      Exam.prepare(sectionId, Accounts.current(), section);
      location.hash = `#/exam/s/${sectionId}/play`;
    });
  };

  function answerSummaryFor(q) {
    if (q.type === 'choice') return `${Quiz.LETTERS[q.answer]}. ${q.options[q.answer]}`;
    if (q.type === 'multi') return [...q.answer].sort().map(i => Quiz.LETTERS[i]).join('、');
    return q.blanks.map(b => (b.label ? b.label + ' ' : '') + Answer.answerText(b) + (b.suffix ? ' ' + b.suffix : '')).join('；');
  }
```

注意：`Quiz.LETTERS` 当前没暴露，task 2 步骤里 export 里只导了 `mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES`。补一下：

在 `src/quiz.js` 末尾 `root.Quiz = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES };` 改成：

```js
  root.Quiz = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES, LETTERS };
```

并在 Node 模块导出分支同步：

```js
  if (typeof module !== 'undefined') module.exports = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES, LETTERS };
  else root.Quiz = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES, LETTERS };
```

- [ ] **Step 4：浏览器手测端到端**

跑：访问 `http://localhost:8000/`

1. 首页看到新"试卷"卡片 → 点击 → 列表看到 13 节。
2. 进入 1.1 → 输入 `jiajia` → 点开始 → 进入答题页。
3. 答题页：填几道题、看计时器递减、点导航条切题。
4. 点"交卷" → 二次确认 → 成绩页显示分数和题目回顾。
5. 点"返回试卷列表" → 回到列表。
6. 再次进入 1.1 → 自动用 jiajia → 开始测试 → 重考。
7. 点"换账号" → 输入 keyi → 开始。
8. 在答题页等几秒（或改 remainingSeconds 阈值做测试）观察红色。

预期：所有路径可用。

- [ ] **Step 5：跑全量测试**

跑：`node tests/run.js`

预期：0 失败。

- [ ] **Step 6：提交**

```bash
git add src/exam.js src/app.js src/app.css src/quiz.js
git commit -m "exam 模块 UI：列表、账号确认、答题、成绩页"
```

---

## Task 6：docs/exam.md 使用说明

**Files:**
- Create: `docs/exam.md`

- [ ] **Step 1：写文档**

写 `docs/exam.md`：

```markdown
# 试卷模块

## 给学生的使用说明

1. 首页 → 点"按章节限时测试"。
2. 选一个已上线的小节 → 输入账号（目前只支持 `jiajia` / `keyi）→ 点"开始测试"。
3. 顶栏中间是剩余时间；做完后点"交卷"或等倒计时到 0。
4. 交卷后看分数和每题的对错、解析。

## 给开发者的说明

- 设计：`docs/superpowers/specs/2026-09-21-exam-module-design.md`
- 模块：`src/exam.js`（状态机 + UI）、`src/accounts.js`（白名单）
- 测试：`tests/exam.test.js`、`tests/accounts.test.js`

### 计时规则

总时长按档位叠加：基础 60s、扩展 120s、挑战 180s。每秒通过 `Date.now()` 与 `sessionStorage.deadlineAt` 算剩余秒数，避免后台节流漂移。

### 修改白名单

改 `src/accounts.js` 的 `ALLOWED` 数组即可。

### 加新考试类型

目前只有"小结测试"。综合测试可在 `Exam.listPage` 同级加一个新卡片，指向一个新的入口函数，复用 `prepare / session / submit / result`。
```

- [ ] **Step 2：提交**

```bash
git add docs/exam.md
git commit -m "试卷模块文档"
```

---

## Task 7：端到端校验 + 总结

**Files:**
- 无

- [ ] **Step 1：跑全量校验**

跑：`node tests/run.js`

预期：0 失败。

- [ ] **Step 2：浏览器走一遍 4 种流程**

1. 首页 → 试卷 → 列表 → 1.1 → 输入 jiajia → 答题 → 主动交卷 → 成绩页。
2. 首页 → 试卷 → 列表 → 2.3 → 输入 keyi → 答题 → 关闭 tab 重开（应回到账号确认或首页；sessionStorage 已清）。
3. 刷新答题页（应恢复 session，账号重确认）。
4. 切到后台 30 秒再切回前台（计时器校正）。

预期：4 个流程全部可用。

- [ ] **Step 3：提交总结（如有改动）**

```bash
git status
# 如有未提交改动：
# git add -A
# git commit -m "试卷模块：端到端校验完成"
```

---

## 自检

### Spec 覆盖

| Spec 段落 | 实施任务 |
|---|---|
| 模块划分 | Task 1, 2, 3, 4, 5 |
| 账号确认 | Task 1 + Task 5 step 3 usernamePage |
| 答题页 UI（顶部 / 计时器 / 题目 / 底部导航） | Task 5 step 3 playPage |
| 计时规则 | Task 3 step 3（formatTime、totalSeconds、remainingSeconds） + Task 5 step 3 playPage |
| 倒计时 / 自动交卷 | Task 5 step 3 playPage 的 tick() |
| 成绩页（分数 / 元信息 / 三个按钮 / 题目回顾） | Task 5 step 3 resultPage |
| 错误处理（localStorage 不可用 / sessionStorage 不可用 / 空白账号 / 不在白名单 / 答题中刷新） | Task 1（localStorage 抛错测试）+ Task 3（session round-trip）+ Task 5 usernamePage 输入校验 + playPage session 校验 |
| 测试 | Task 1, 3 |
| Quiz 重构 | Task 2 |
| 不修改 | 整个计划中没有改 answer.js / content.js / progress.js / content/** |

### 类型一致性

- `Accounts.current()` 返回 `string | null` — 所有调用点按此处理。
- `Exam.session()` 返回 `Session | null`，仅在非空时访问字段。
- `Exam.result()` 返回 `{ correct, total, items }` — items 每项 `{ qid, ok, response, correct, error? }`。
- `Quiz.renderQuestion` 返回 `{ setDisabled, setResponse, getResponse }` — exam.js 端按此使用。

### Placeholder 扫描

通篇搜索 "TBD"、"TODO"、"fill in"、"add appropriate" —— 无。