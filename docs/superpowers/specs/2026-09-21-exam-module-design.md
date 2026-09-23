# 试卷模块设计

> **状态：已实现。** 其中的白名单账号已被 [账号系统重设计](2026-09-22-account-redesign-design.md) 取代；现行说明见 [docs/exam.md](../../exam.md)，细节以代码为准。

日期：2026-09-21

## 目标

在学趣闯关新增一个"试卷"模块：学生按用户名（白名单 `jiajia` / `keyi`）进入，对某一节的所有题目做一次限时测试。交卷后才能看分数、错题和解析。账号模块只服务于试卷入口，练习功能保持原样匿名使用。

不在本设计范围内：综合测试（综合测试是占位的二级入口，本期不实现，留待未来按相同结构扩展）。

## 术语

- **小结测试**：以一个"小节"为单位组织的测试。范围 = 该小节 `ready: true` 状态下的所有题目（基础 5 + 扩展 10 + 挑战 5 = 20 道）。
- **综合测试**：跨节测试，本期不实现，UI 上保留占位入口。
- **白名单账号**：硬编码的允许用户名集合，目前仅 `jiajia` / `keyi`。

## 范围

仅覆盖上海 2024 版数学六年级上册现有的 13 个小节（1.1、1.2、1.3、1.4、1.5、2.1、2.2、2.3、3.1、3.2、3.3、4.1、4.2）。其他教材/学科走的是同一个 catalog，不在范围内（结构上已支持）。

## 用户体验

### 入口

首页（`#/`）增加一张"试卷"卡片，标签是"试卷"，副标题"按章节限时测试，先交卷再出分"。点击进入 `#/exam`。

试卷列表（`#/exam`）按章分组，每章下是该章已上线的小节，样式与练习册一致。每个小节显示节号、节标题、题数（"20 道"）。点击进入 `#/exam/s/<id>`，进入账号确认页。

### 账号确认（`#/exam/s/<id>`）

页面顶部显示"准备开始：1.1 有理数的引入 / 共 20 道 / 约 40 分钟"。

下方账号输入框：
- 已有账号时，标题显示"当前账号：xxx"，下方一行小字"换账号"按钮，点开后输入框 + "开始测试"按钮。
- 首次进入（无账号），显示输入框和提示文字"目前只支持 jiajia / keyi"，点"开始测试"进入答题页。

输入校验：
- 空白：提示"请输入账号"。
- 不在白名单：提示"目前只支持 jiajia / keyi"，不清空输入。

### 答题页（`#/exam/s/<id>/play`）

顶部固定栏：
- 左：节标题。
- 中：剩余时间（`MM:SS`）。剩余 ≤ 60 秒时变红色，闪烁一次。归零自动交卷，跳转 `#/exam/s/<id>/result`。
- 右：交卷按钮（红色边框 primary 按钮）。点击二次确认（"确定交卷？未答题将被记 0 分"），确认后跳转成绩页。

题目区域：
- 一道一屏（与现有练习一致），顶部题号（第 X / 20 题）、档位标识（基础/扩展/挑战）、题号 ID（用于纠错提 Issue）。
- 题目下方是选项或填空。填空输入框的快捷输入栏（− / ° ′ ″ / 字母等）和练习页一致。
- 整节内所有题目都不可见"提交""看解析"按钮（练习模式下每题都有）。作答期间可任意修改。

底部固定栏：
- 题目导航条：按档位分组的 20 个小方块，每方块右上角的小圆点表示状态：
  - 灰色：未作答。
  - 蓝色：已作答。
- 点击方块跳转到对应题。当前题目方块加蓝色边框。

切题不提交，不弹窗。

倒计时：
- 进入 play 时启动 setInterval(1s)，用 `Date.now()` 算 deadline。
- 页面 `visibilitychange` 切回前台时重新校正剩余秒数，避免后台节流漂移。
- 刷新页面：恢复考试 session（sessionStorage），账号重新确认，进入 play 继续。
- 关闭 tab 后重开：sessionStorage 已清，需从头开始（这是预期行为，避免历史 exam 残留干扰新用户）。

### 成绩页（`#/exam/s/<id>/result`）

头部：
- 大字分数："15 / 20"（答对题数 / 总题数）。
- 元信息：账号、节标题、用时（`MM:SS`）。
- 三个按钮："返回试卷列表"、"再来一次"（清空 sessionStorage 并跳 play）、"考后回到练习"（跳 `#/s/<id>` 练习页）。

题目回顾列表：
- 20 个条目，每条目一行：题号 + 档位标签 + ✓/✗ + 用时（如 "01:23"）。
- 点击展开：显示题干、你的作答（红色 if 错）、正确答案（绿色）、解析。

题目作答得分判定使用现有的 `Answer.checkQuestion(q, response)`，与练习路径一致，确保两套系统判分逻辑不重复。

## 架构

### 新增文件

```
src/accounts.js     账号白名单 + 持久化（localStorage: xq.account.v1）
src/exam.js         试卷状态机 + UI（计时器、导航条、成绩页）
docs/exam.md        试卷模块使用和开发说明
tests/exam.test.js  白名单、时间计算、判分、sessionStorage round-trip
```

### 修改文件

```
src/quiz.js           抽出 Quiz.renderQuestion(container, q, handlers) 共享渲染
src/app.js            增加 #/exam 系列路由
src/app.css           增加 .exam-、.timer、.result 等样式
index.html            按顺序加载 accounts.js、exam.js（在 quiz.js 之后）
```

### 不修改

```
src/answer.js         判分逻辑不变
src/content.js        内容注册不变
src/progress.js       练习进度不变（试卷进度独立存）
content/**            现有内容不变（试卷从同一份内容抽题）
```

## 模块设计

### Accounts

```js
Accounts = {
  KEY: 'xq.account.v1',
  ALLOWED: ['jiajia', 'keyi'],

  current(),          // 返回当前用户名或 null
  signIn(name),       // 白名单校验 + 持久化；返回 { ok: bool, error?: string }
  signOut(),          // 清除持久化
  isAllowed(name),    // 边界检查，不持久化
}
```

存储：

```js
localStorage['xq.account.v1'] = { name: 'jiajia', savedAt: 1731910400000 }
```

读写都用 try/catch 包裹；不可用时 signIn 返回 `{ ok: false, error: '存储不可用' }`。

### Exam

```js
Exam = {
  KEY: 'xq.exam.v1',       // sessionStorage

  list(),                  // 返回 [{ sectionId, no, title, chapterTitle, questionCount }] ready: true 的小节
  prepare(sectionId),      // 抽题（全部）、算总时长、生成 session、写入 sessionStorage
  session(),               // 读 sessionStorage，返回当前 session 或 null
  clear(),                 // 清掉 session（交卷后或主动放弃）

  // 答题过程中
  getResponse(qid),        // 读用户作答
  setResponse(qid, value), // 写用户作答
  jump(index),             // 切题（UI 状态，session 存 currentIndex）
  submit(),               // 主动交卷 → 计算 result → 写回 session

  // 时间
  remainingSeconds(),      // 用 deadlineAt - Date.now() 算
  formatTime(seconds),     // MM:SS 字符串

  // 成绩
  result(session),         // { correct: number, total: number, items: [{ qid, ok, response, correct }] }
}
```

session 结构：

```js
{
  username,
  sectionId,
  questions: [{ qid, level }],   // 顺序锁定（基础→扩展→挑战）
  totalSeconds,
  startedAt,        // ms
  deadlineAt,       // ms
  answers: { [qid]: response },
  currentIndex,
  submitted,        // bool
}
```

判分：调 `Answer.checkQuestion(q, response)`，复用现有逻辑；不重写判分。

### Quiz 重构

`Quiz.renderQuestion(container, q, handlers)`：
- 渲染题号、题干、配图、选项/填空、快捷输入栏。
- `handlers.onAnswerChange(response)` 在每次输入或选项变化时回调（考试用，练习不传）。
- 返回 `{ setDisabled(bool), setResponse(response), getResponse() }`：考试用来禁用输入、恢复作答。
- 不读 Progress、不写 Progress、不写 localStorage。

`Quiz.mount(container, opts)` 改为包装 `renderQuestion`，加提交、看解析、反馈、解析区、上下题导航、调 `Progress.record` / `Progress.reveal`。

行为兼容：现有练习路径完全不变。

### 路由

```js
// app.js route()
if (parts[0] === 'exam') {
  if (parts.length === 1) return Exam.listPage();
  if (parts.length === 2) return Exam.usernamePage(parts[1]);            // 's/<id>'
  if (parts[2] === 'play') return Exam.playPage(parts[1]);
  if (parts[2] === 'result') return Exam.resultPage(parts[1]);
}
```

URL 例子：
- `#/exam`
- `#/exam/s/math%2Fsh2024%2Fg6s1%2F1.1`
- `#/exam/s/math%2Fsh2024%2Fg6s1%2F1.1/play`
- `#/exam/s/math%2Fsh2024%2Fg6s1%2F1.1/result`

## 数据流

```
首页 → 试卷列表 (Exam.listPage)
     → 选小节 → 账号确认 (Exam.usernamePage)
     → 输入合法账号 → Exam.prepare(sectionId)
     → sessionStorage 写入新 session → 跳转 play
     → Exam.playPage
        → 启动 setInterval(1s)，渲染题面
        → 用户作答 → Exam.setResponse
        → 倒计时 → Exam.submit（自动）
        → 用户主动点交卷 → 二次确认 → Exam.submit
     → Exam.submit → 算分 → 跳转 result
     → Exam.resultPage
        → 显示分数、题目回顾
        → 点击"再来一次" → Exam.clear + Exam.prepare → 跳 play
        → 点击"返回试卷列表" → Exam.clear + 跳 #/exam
        → 点击"回到练习" → 不清 session，跳 #/s/<id>
```

## 计时规则

- 总时长 = 基础 60s × 5 + 扩展 120s × 10 + 挑战 180s × 5 = **2400 秒 ≈ 40 分钟**。
- 进入 play 时记录 `deadlineAt = Date.now() + 2400 * 1000`。
- 每秒 setInterval 更新 UI；不依赖 setInterval 计时（用 `Date.now()` 算剩余秒数）。
- `visibilitychange` 切回前台立即重算一次。
- 剩余 ≤ 60 秒：UI 显示变红，最后 10 秒每 1 秒闪烁一次。
- `deadlineAt` 到期：调 `Exam.submit()`，跳转成绩页。

## 错误处理

| 场景 | 行为 |
|---|---|
| 输入空白账号 | inline 提示，不跳转 |
| 输入不在白名单的账号 | inline 提示"目前只支持 jiajia / keyi"，输入框不清空 |
| localStorage 不可用 | signIn / current 返回错误，不让考试 |
| sessionStorage 不可用 | 阻止进入 play，提示"浏览器不支持，请换浏览器" |
| 小节内容加载失败 | 试卷列表灰显该项，点击提示"暂未上线" |
| 答题中刷新页面 | sessionStorage 恢复 session，账号重新确认，进入 play 继续 |
| 答题中关闭页面（session 残留） | 30 分钟内可恢复；超过 30 分钟清掉，避免旧 session 干扰 |
| 倒计时归零 | 自动 Exam.submit，跳转 result |
| 已交卷后访问 play 路由 | 跳转到 result 路由 |
| 未交卷访问 result 路由 | 跳转到 play 路由 |
| `Answer.checkQuestion` 抛错 | 显示"判分出错，请重试"，保留作答 |

## 测试

新增 `tests/exam.test.js`：

1. `accounts`：
   - 白名单校验：'jiajia' / 'keyi' 通过，'admin' / '' / null / undefined 失败。
   - signIn 持久化 round-trip：set → read → 拿到一致对象。
   - signOut 后 current() 返回 null。
   - localStorage 抛错时 signIn 返回 ok=false、error 非空。

2. `time`：
   - 5b + 10e + 5c 不全等小节：算总秒 = 2400。
   - 不足 20 题（如某扩展题被砍到 5）：按实际档位算。
   - formatTime(0) → '00:00'，formatTime(75) → '01:15'，formatTime(2400) → '40:00'。

3. `scoring`：
   - 模拟一组响应（覆盖对/错/格式错误/未作答），result() 返回 correct 数正确。
   - 未作答（response 未填）按 0 分处理。

4. `session`：
   - prepare → session round-trip：写一次、读一次，字段一致。
   - clear 后 session() 返回 null。
   - submitted=true 后再 setResponse 抛错。

`tests/run.js` 自动收新测试文件。

## 风险

- **sessionStorage 在隐私模式下不可用**：考试模块会拒绝进入，符合预期。
- **倒计时在后台被节流**：用 `Date.now()` 算剩余秒数，避免 drift；用户切回前台立刻校正。
- **小节题目数变化**：抽题按"该小节的所有题"算，不写死 20。如果小节题目数未来增加，总时长按档位叠加；如果减少，也按档位叠加。
- **同一小节多次考**：用户主动"再来一次"会清 session，重新计时。题面顺序保持现有设计的"基础→扩展→挑战"顺序，不随机化（要随机化抽 v2 再说）。

## 不做（YAGNI）

- 综合测试：留入口占位，不实现。
- 历史成绩：用户已确认不记。
- 倒计时暂停、暂停按钮：未提及。
- 题目随机化、试卷随机抽题：用户已确认用该节全部题。
- 账号管理后台、密码、找回：未提及。
- 服务端持久化、跨设备同步：未提及（项目本身就是纯静态）。