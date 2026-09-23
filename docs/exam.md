# 试卷模块（限时测试 + 账号）

> 这里的“试卷”指按小节的**限时测试**，题目来自原创小节。“真题卷”（`content/exams/`、页面 `#/e/...`）是另一个功能，只做练习、不计时，格式见 AGENTS.md 的“真题卷格式”。

## 给学生的使用说明

1. 首页右上角点「登录」→ 输入账号 → 登录。
2. 首页 → 点"按章节限时测试"。
3. 顶栏看"XX 的考试记录"——已经考过的小节会显示分数，没考过的显示"还未考过"。点历史项可看那次的题目回顾。
4. 选一个已上线的小节 → 点"开始测试"。
5. 顶栏中间是剩余时间；做完后点"交卷"或等倒计时到 0。
6. 交卷后看分数和每题的对错、解析。
7. 退出登录：右上角点账号名 → "退出登录"。

## 给开发者的说明

- 设计：`docs/superpowers/specs/2026-09-22-account-redesign-design.md`（账号系统）；`docs/superpowers/specs/2026-09-21-exam-module-design.md`（试卷模块）
- 模块：`src/exam.js`（状态机 + UI）、`src/accounts.js`（账号 + 历史）、`src/account-ui.js`（账号区 + 登录模态框）
- 测试：`tests/exam.test.js`、`tests/accounts.test.js`、`tests/account-ui.test.js`

### 计时规则

总时长按档位叠加：基础 60s、扩展 120s、挑战 180s。每秒通过 `Date.now()` 与 `sessionStorage.deadlineAt` 算剩余秒数，避免后台节流漂移。一节 20 道 = 60×5 + 120×10 + 180×5 = 2400 秒 ≈ 40 分钟。

### 账号规则

账号 ID 格式：任意非空白、非控制字符，长度 1–20。允许字母、数字、下划线、中文、emoji、特殊符号。无密码。

`src/accounts.js` 的 `looseCheck` 控制宽松校验。如需切换为严格模式（仅允许 `^[A-Za-z_][A-Za-z0-9_]*$`，与账号ID一致），调用 `Accounts.signIn(name, { strict: true })`。

设计文档 `2026-09-22-account-redesign-design.md` 里写的“字母、数字、下划线，不能是纯数字”是最初方案，实现时放宽了，**以本文件和 `src/accounts.js` 为准**。

考试历史按账号 ID 保存到 `localStorage['xq.history.v1.<账号>']`，每个账号一份。退出登录只清当前账号标记，历史保留。

### 学期偏好

首页右上角可以切换学期（`app.js` 的 `mountSemesterSwitcher`）。学期列表来自目录里实际有的册（`Content.semesters()`），选中的学期存在 `localStorage['xq.grade.v1.<账号>']`，未登录时存 `xq.grade.v1`，都没有时默认 `g6s1`。存的学期已经不在目录里时退回第一个。

### 加新考试类型

目前只有"小结测试"。综合测试可在 `Exam.listPage` 同级加一个新卡片，指向一个新的入口函数，复用 `prepare / session / submit / result`。