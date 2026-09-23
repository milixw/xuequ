# 账号系统重设计

> **状态：已实现。** 账号 ID 规则在实现时放宽为“任意非空白、非控制字符，1–20 字符”（严格规则保留为 `{ strict: true }` 选项），以 [docs/exam.md](../../exam.md) 和 `src/accounts.js` 为准。后来还加了按账号保存的学期偏好，见 docs/exam.md。

日期：2026-09-22

## 目标

把账号从"白名单 + 2 个固定账号"改成"自由注册（无密码）"，并在主页 + 试卷相关页面右上角加账号区，方便登录 / 切换 / 退出。同时引入**按账号保存的考试历史**：每个用户的所有考试记录都能在试卷列表页看到，点开可看详情。退出登录仅去掉"当前账号"标记，历史保留。

不在范围内：练习进度（`Progress`）仍按浏览器 local 共享，不按账号隔离。

## 术语

- **当前账号**（`current account`）：浏览器当前会话里"是谁"。存在 `xq.account.v1`，结构 `{ name }`。
- **账号 ID**：用户输入的字符串。本设计下允许字母、数字、下划线，长度 1–20，且不能是纯数字（至少含一个字母或下划线）。
- **考试历史**：某账号的所有考试记录。每条含节、完成时间、用时、分数、题目详情。每账号存一份，独立于"当前账号"。

## 范围

仅改账号 + 试卷列表 + 试卷结果相关；练习路径（`#/`、`#/v/...`、`#/s/...`、`#/q/...`）的右上角不显示账号区。

## 决定

来自 brainstorming（2026-09-22）：

- 规则：字母、下划线、数字；长度 1–20；不能是纯数字。
- 入口限制：未登录用户点首页"试卷"卡片先要求登录，登录后跳到试卷列表。
- 历史展示：每个用户的所有考试记录保留；试卷列表页顶部展示；点开看详情。
- 账号区范围：只在首页 + 试卷相关页面显示。
- 退出行为：留在当前页（试卷列表页会显示"未登录"提示）。
- 存储索引：不维护账号索引；只清当前账号的历史。
- 架构：方案 B（独立 `src/account-ui.js`）。

## 用户体验

### 账号区（右上角）

在 `<header class="bar">` 的最右边加一个 `<div class="account">`。

- **未登录**：显示「登录」按钮。
- **已登录**：显示「xiaoming ▾」。点击展开下拉菜单：
  - 「切换账号」—— 唤出模态框，输入新账号。
  - 「退出登录」—— 清掉当前账号标记，留在当前页。

下拉菜单点外侧收起（监听 document click）。

账号区仅在首页 + 试卷相关页面（`#/exam`、`#/exam/...`、`#/exam/.../result`）出现。`#/v/...`、`#/s/...`、`#/q/...` 不出现。

### 登录模态框

模态框挂在 `<body>` 顶层（不在 `main` 内），不被 `app.innerHTML = ''` 误清。

```
┌──────────────────────────────┐
│ 登录                          │
│                              │
│ 输入你的账号（字母、下划线、   │
│ 数字，1–20 字符，不能是纯数字）│
│                              │
│ [_________________]          │
│ 格式不对：不能是纯数字       │
│                              │
│ [取消]      [登录]            │
└──────────────────────────────┘
```

输入实时校验（input 事件触发），按钮 enable/disable。点击外部或「取消」关闭。登录成功关模态框并触发 `onSuccess` 回调。

### 首页 → 试卷入口

`home()` 里"试卷"卡片加点击拦截：

```js
exam.addEventListener('click', e => {
  if (!Accounts.current()) {
    e.preventDefault();
    AccountUI.promptLogin({ onSuccess: () => location.hash = '#/exam' });
  }
});
```

### 试卷列表页（`#/exam`）顶部历史区

仅在已登录时显示。未登录时该区域替换为提示「请先登录」+ 「登录」按钮。

**列表项遍历所有小节**（不只是已考的）：

```
┌─ xiaoming 的考试记录 ────────────────────────┐
│ 1.1 有理数的引入 — 15/20 — 09-22 20:15       │ ← link（有最新历史）
│ 1.2 加法与减法 — 还未考过                     │ ← span.disabled
│ 1.3 乘法与除法 — 18/20 — 09-22 20:18         │ ← link
│ ...                                            │
│                                              │
│ [清除我的全部考试记录]                        │
└──────────────────────────────────────────────┘
```

每个小节占一行：
- 有历史记录：链接到 `/exam/<sectionId>/result-history/<recordId>`（显示该小节最近一次成绩）。
- 无历史记录：灰色文字"还未考过"。

按 `Content.sectionMetas()` 的章节顺序展示。

### 历史详情页（`#/exam/<sectionId>/result-history/<recordId>`）

复用 `Exam.resultPage` 的 review UI，但传入历史 record 而非 sessionStorage：

- 头部：分数 + 元信息（账号 ID、完成时间、用时） + 三个按钮：「返回试卷列表」「再做一次」「考后回到练习」。
- 题目回顾：每题 ✓/✗ + 展开看题干 / 作答 / 正确答案 / 解析。

route 检测到 `result-history` 时调 `Exam.historyResultPage(sectionId, recordId, main)`。

### 退出登录

点击「退出登录」→ 清 `current` → 留在当前页。

如果当前页是 `/exam` 且有历史区：重渲染为未登录提示 + 「登录」按钮。
如果当前页是 `/exam/.../play`：现有逻辑已会 redirect 到 `/exam/...`（账号页），新行为未变。
其他页面（`#/v/...`、`#/s/...`、`#/q/...`）：无账号区，不显示，原页面不动。

### 切换账号

点击「xiaoming ▾」 → 「切换账号」→ 唤出模态框（input 空）→ 输入合法 → 登录 → 关闭下拉。

切换账号不自动清当前 in-progress exam session。exam session 仍归原账号，提交时 `Accounts.history.append(s.username, ...)` 写到原账号。

## 架构

### 新增

- `src/account-ui.js` —— 右上角账号区 + 登录模态框（独立模块）
- `docs/superpowers/specs/2026-09-22-account-redesign-design.md` —— 本文档

### 修改

- `src/accounts.js` —— 去白名单，加 `formatCheck` 和 `history` 子模块
- `src/exam.js` —— `submit()` 调 `Accounts.history.append`；新增 `historyResultPage`；listPage 渲染历史区
- `src/app.js` —— `page()` 加账号区挂载点；`home()` 拦截"试卷"卡片；route 加 `result-history` 分支
- `src/app.css` —— 账号区 + 模态框 + 历史区样式
- `tests/accounts.test.js` —— 改白名单用例、加 `formatCheck` 和 `history` 用例
- `tests/exam.test.js` —— 加 `history.append` 触发的测试
- `docs/exam.md` —— 更新"修改白名单"段为"账号规则"

### 不修改

- `src/answer.js`、`src/progress.js`、`src/quiz.js`、`src/content.js`、`content/**` —— 练习路径和判分不变

## 模块

#### Accounts（重写）

```js
Accounts = {
  KEY,                       // 'xq.account.v1'：当前账号
  NAME_PATTERN,              // /^[A-Za-z_][A-Za-z0-9_]*$/
  NAME_MIN,                  // 1
  NAME_MAX,                  // 20

  current(),                 // → string | null

  formatCheck(name),         // → { ok, error? }，不持久化
  signIn(name),              // → { ok, error? }，trim + 校验 + 持久化
  signOut(),                 // 仅清 xq.account.v1，不动历史

  history: {
    KEY_PREFIX,              // 'xq.history.v1.'
    list(username),          // → Array<Record>，按时间倒序
    append(username, record),// push (新 ID → Date.now()+random); 落盘
    clear(username),         // 删 'xq.history.v1.<username>'
    get(username, recordId), // → Record | null
  },
};
```

存储：

```js
localStorage['xq.account.v1'] = { name: 'xiaoming' }    // 仅当前账号
localStorage['xq.history.v1.xiaoming'] = [
  { id: 'r1', sectionId: 'math/sh2024/g6s1/1.1', completedAt: 1731910400000,
    score: 15, total: 20, durationSec: 1950, items: [...] },
  ...
]
```

`Record.items` 是 `Exam.result().items` 的克隆（避免共享引用）。

#### account-ui.js（新增）

```js
AccountUI = {
  bindUI({ escapeHtml }),
  mount(headerEl),          // 在现有 header 内挂账号区
  promptLogin({ onSuccess? }), // 唤出登录模态框
  ensureLoggedIn(redirect), // 若未登录，弹模态框+onSuccess=跳转；否则直接跳转
};
```

行为：
- `mount(headerEl)` 在 headerEl 末尾加 `<div class="account">`。已登录时显示用户名 + 下拉，未登录时显示「登录」按钮。
- `promptLogin({ onSuccess })` 唤出模态框；登录成功后 `onSuccess?.()`。
- `ensureLoggedIn(redirect)` = `promptLogin({ onSuccess: () => location.href = redirect })` —— UI 入口用。
- 模态框：`<div class="modal" hidden>` 一次性创建，append 到 `<body>`。多次打开不重复创建。

#### Exam 改动

```js
Exam.submit() {
  // 原有：写回 session
  // 新增：Accounts.history.append(s.username, { ... })
}

Exam.historyResultPage(sectionId, recordId, main) {
  // 类似 resultPage，但读 Accounts.history.get(s.username, recordId)
  // 而不是 Exam.result()
}

Exam.listPage(main) {
  // 已登录：顶部加历史区
  // 未登录：顶部加"请先登录" + 登录按钮
  // 中间：小节卡片列表（不变）
}
```

#### app.js 改动

```js
function page(title, backHref, subtitle) {
  // 渲染 header
  // 调 AccountUI.mount(headerEl)
}

function home() {
  // ... 原有内容 ...
  // "试卷"卡片：
  exam.href = '#/exam';
  exam.addEventListener('click', e => {
    if (!Accounts.current()) {
      e.preventDefault();
      AccountUI.ensureLoggedIn('#/exam');
    }
  });
}

route() {
  // ...
  if (parts[0] === 'exam') {
    const last = parts[parts.length - 1];
    if (last === 'play' || last === 'result') { ... }
    if (parts.length >= 4 && parts[parts.length - 2] === 'result-history') {
      const recordId = parts[parts.length - 1];
      const sectionId = parts.slice(1, -2).join('/');
      return Exam.historyResultPage(sectionId, recordId, main);
    }
    if (parts.length === 1) return Exam.listPage(main);
    return Exam.entryPage(parts.slice(1).join('/'), main);  // 旧 usernamePage 替换为 entryPage：检查登录后调 prepare + 跳 play
  }
}
```

注意：原本的 #/exam/<sectionId> 走 `usernamePage` 已被替换为 `entryPage`（检查登录 → Exam.prepare → 跳 play）。但用户从 listPage 点"开始测试"按钮也可直接走 entryPage（或直接 Exam.prepare + 跳 play）。两条路径并存：列表页按钮走 ensureLoggedIn + prepare；直接访问 entryPage URL 也走 prepare。

#### app.css 改动

新增：

```css
/* 账号区 */
.account { margin-left: auto; }
.account .login-btn { /* 登录按钮 */ }
.account .name-btn { /* 显示用户名 + ▾ */ }
.account-menu {
  position: absolute; top: ...; right: ...;
  box-shadow: ...;
}
.account-menu button { display: block; width: 100%; }

/* 模态框 */
.modal {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.modal[hidden] { display: none; }
.modal-body {
  background: var(--card); padding: 20px; border-radius: 12px;
  width: 90%; max-width: 320px;
}
.modal-body input { /* 沿用 exam-username 样式 */ }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 12px; }

/* 历史区 */
.exam-history { background: var(--card); padding: 14px 16px; border-radius: 12px; margin-bottom: 12px; }
.exam-history ul { padding-left: 0; list-style: none; }
.exam-history li { padding: 6px 0; border-bottom: 1px solid var(--line); }
.exam-history li:last-child { border-bottom: none; }
.exam-history li.disabled { color: var(--muted); }
```

## 数据流

```
未登录点首页"试卷"卡片
  → AccountUI.ensureLoggedIn('#/exam')
  → promptLogin 模态框
  → 输入合法 → Accounts.signIn → 写入 localStorage
  → onSuccess → location.hash = '#/exam'
  → route() → Exam.listPage(main)
    → Accounts.current() === 'xiaoming'
    → 拉 Accounts.history.list('xiaoming') → 渲染顶部历史
    → 拉所有小节 meta → 渲染小节列表
  → 点小节"开始测试"
    → ensureLoggedIn（已登录，直接调）
    → Exam.prepare(sectionId, 'xiaoming', section)
    → location.hash = '/exam/<id>/play'
  → Exam.playPage
  → Exam.submit() → 写入 session + Accounts.history.append('xiaoming', record)
  → Exam.resultPage 渲染分数 + 题目回顾

已登录点右上角"xiaoming ▾"
  → 显示下拉菜单
  → 点"切换账号"
    → promptLogin（input 空）
    → 输入新账号 → Accounts.signIn('newName') → 写入
    → 关闭下拉，留在当前页
  → 点"退出登录"
    → Accounts.signOut() → 清 current
    → 关闭下拉
    → 留在当前页
    → 若当前页是 #/exam，listPage 再次渲染（无历史区，显示未登录提示）
```

## 错误处理

| 场景 | 行为 |
|---|---|
| 输入空 | 模态框提示"请输入账号"，按钮 disabled |
| 格式不对 | 模态框实时显示具体错误（"不能是纯数字""只能是字母、数字、下划线""长度 1–20"） |
| 输入过短 / 过长 | 同上 |
| signIn 时 localStorage 抛错 | 模态框显示"存储不可用" |
| 模态框点外侧 | 关闭模态框（不登录） |
| 退出登录时无 current | no-op |
| 历史 append 时 localStorage 抛错 | 静默失败（考试结果不强制持久化）；成绩页仍正常展示 |
| 历史列表为空 | 不渲染列表项，显示"还没有考过任何小节" |
| 清除历史时 localStorage 抛错 | 静默失败 |
| 切换账号时 Exam.in_progress session | 不清，session 仍归原账号 |
| 旧账号（jiajia、keyi） | 历史保留为独立条目（不被自动删除）。Accounts.ALLOWED 不再存在，但旧 localStorage 中 'jiajia' / 'keyi' 仍可登录。 |

## 测试

新增：

- `Accounts.formatCheck`：
  - `xiaoming` → ok
  - `_alice` → ok
  - `x123` → ok
  - `123` → 不 ok（纯数字）
  - `xiaoming!` → 不 ok（含特殊字符）
  - `12345678901234567890123` → 不 ok（>20 字符）
  - `` → 不 ok（空）
  - `1xiaoming` → 不 ok（首字符数字）
- `Accounts.signIn`：
  - 合法 → ok
  - 非法 → ok=false, error 非空
  - 合法 + storage 抛错 → ok=false
- `Accounts.history`：
  - append → list 能拿到
  - 不同 user 隔离
  - clear → list 为空
  - get(id) → 拿单条
  - storage 抛错 → append 静默
- `AccountUI`：
  - 通过 DOM 测试：mount 后 .account 元素存在；promptLogin 后 .modal 不 hidden；输入合法并 submit 后 .modal hidden

修改：

- `tests/accounts.test.js`：去掉 `ALLOWED` / `isAllowed('jiajia')` 相关用例，改用 `formatCheck`。

`tests/exam.test.js`：加一个用例，submit 后 history.append 被调（用 mock）。

`tests/run.js`：自动收新测试文件。

## 风险

- localStorage 容量：每账号 history 上限无。理论上 1000 条 × 2KB = 2MB，10 账号 = 20MB，可能超过 5MB 默认上限。**当前不限制**，未来超过再清理。
- 跨设备同步：无（项目本身无后端）。
- 旧数据迁移：`xq.account.v1` 当前结构不变（仍是 `{ name }`），旧 jiajia/keyi 用户继续能用。旧 exam session（`xq.exam.v1`）不变。
- 退出后未刷新：listPage 不会自动重渲染。Exam.listPage 每次调用都重读 current()，但 route 切换才重调。如要支持"在 /exam 退出后立即看到未登录状态"，退出逻辑里手动调 `route()` 一次。
- 历史详情路由：`#/exam/<sectionId>/result-history/<recordId>` 中 recordId 末尾是 ID。sectionId 可能含多空格。parts 切分后判断逻辑要细。

## 不做（YAGNI）

- 密码 / 找回 / 双因素 —— 未提及。
- 多设备同步 / 服务端 —— 未提及。
- 头像、个人简介 —— 未提及。
- 课程数据按账号隔离（练习进度）—— 未提及，仍共享。
- 主页以外（小节、知识点、题目页）的账号区 —— 已确认只在首页 + 试卷页显示。