# 试卷模块

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

考试历史按账号 ID 保存到 `localStorage['xq.history.v1.<账号>']`，每个账号一份。退出登录只清当前账号标记，历史保留。

### 加新考试类型

目前只有"小结测试"。综合测试可在 `Exam.listPage` 同级加一个新卡片，指向一个新的入口函数，复用 `prepare / session / submit / result`。