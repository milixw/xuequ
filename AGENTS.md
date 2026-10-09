# AGENTS.md

面向初中生的学习闯关手机网页应用：按课本章节提供**通俗的知识点介绍 + 分级题目**，另有真题卷、限时测试、英语错题库与中考题、上海中考原题，以及帮助理解课本的“趣味玩法”。目前有数学（6 上～8 下第 23 章）和英语，以后会加更多学科和练习模式。

本文件是**所有 AI 工具都会读到的根约定**，只放全局规则和“做什么事读什么文件”的路由。各目录还有自己的 `AGENTS.md`（同目录的 `CLAUDE.md` 只是导入它），在那个目录干活时必须先读。

## 怎么读文档（省 token）

1. **先看下面的任务路由表**，只读与当前任务有关的文件；不要通读 `docs/`、不要为了“了解项目”把整个目录读一遍
2. **大文件先 grep 再读片段**：超过 100KB 的文件一律不整体读取（见下面的禁读清单），代码大文件按段落读（比如 `src/demos.js` 按 `// ---------- ` 分段）
3. **课本原文按节导出**：`python3 scripts/textbook-text.py <册ID> <小节号>`，不要导出整章、整本
4. **多代理 / 多会话**：同时最多 2～3 个；给子代理写短简报（任务、知识范围、要读的几个文件），不要让它自己通读；复核意见只涉及几道题时开新的小会话定点修改。细则见 `docs/sop-section.md` 的“用 AI 子代理批量做多节时”
5. 规则冲突时，离要改的文件最近的 `AGENTS.md` 优先；但下面的“全局硬规则”任何目录都不能放宽

### 禁读清单（数据量大，读了会耗掉大量 token）

| 路径 | 怎么查 |
|---|---|
| `content/english/past-papers/jiangsu.js`（约 3MB）、`content/english/past-papers/catalog.js`、`content/english/question-bank.js`、`content/english/shanghai-exam-vocabulary.html` | `grep -n "<题目ID或关键词>"`，或 `node -e` 加载后按 ID 取出 |
| `content/past-papers/shanghai.js`、`content/past-papers/images/`、`content/english/past-papers/<年份>/`（音视频） | 同上；图片只看文件名和题目里的元数据 |
| `vendor/`、`dist/`、`refs/`、`pic/` | 第三方库、打包产物、版权资料原件；课本文字用上面的导出脚本 |

Claude Code（`.claude/settings.json`）、Cursor（`.cursorignore`）、Gemini CLI（`.geminiignore`）已配置禁读这些路径；确实需要直接读写时，临时注释掉对应条目，用完恢复。其他工具请自觉遵守。

## 任务路由表

| 要做的事 | 先读 |
|---|---|
| 出数学题（新小节、改题、复核） | `content/AGENTS.md` → `content/math/AGENTS.md` → `docs/sop-section.md`；课本 `docs/textbooks/math-sh2024-<册ID>.md`；台账 `docs/question-types.md` + `docs/question-types/math/<册ID>.md` |
| 收录数学真题卷 | `content/AGENTS.md` 的“真题卷格式” |
| 做英语单元（“做英语 <册> Unit n”：单词 + 三节） | `docs/sop-english-unit.md` → `content/english/AGENTS.md` |
| 英语错题库、七天计划、英语中考题 | `content/AGENTS.md` → `content/english/AGENTS.md` |
| 上海语数物化中考原题（导入、补图、补答案） | `content/past-papers/AGENTS.md` |
| 加新学科 | `docs/templates/subject-AGENTS.md`，再按 `content/AGENTS.md` 建目录和目录条目 |
| 语文实词虚词资料入口 | `content/AGENTS.md` → `content/chinese/AGENTS.md`；首页代码另读 `src/AGENTS.md` |
| 加新练习模式 / 新页面 | `docs/templates/new-mode-checklist.md`、`src/AGENTS.md`、`docs/storage-and-routes.md` |
| 改应用代码、演示动画 | `src/AGENTS.md`；涉及路由或存储键再读 `docs/storage-and-routes.md` |
| 趣味玩法、动手玩游戏 | `src/games/AGENTS.md`、`docs/games-backlog.md` |
| 改测试 | `tests/AGENTS.md` |
| 限时测试、账号 | `docs/exam.md`、`docs/storage-and-routes.md` |
| 部署、打包 | `docs/deploy.md` |
| 改这些约定文档本身 | 本文件的“维护约定文档” |

## 全局硬规则

- **零构建、不引入框架**；第三方库只放 `vendor/` 本地加载，不走 CDN（国内访问不稳定）
- 直接双击 `index.html`（`file://`）也要能用，所以**不要用 `fetch` 加载本地文件**，内容文件用 `<script>` 加载
- 本地存储键名统一 `xq.` 前缀，读写都包在 try/catch 里；改结构升版本号并写迁移，不改旧键格式；新键、新路由登记在 `docs/storage-and-routes.md`
- AI 写的学习内容 `review.status` 一律是 `pending`，等相应学科教师审核后才能改成 `approved`
- 学习内容全部原创：可以参照课本的章节结构和知识范围，**不能照搬课本、教辅的原文、例题、习题和插图**；真题原题单独收录并注明来源
- 不要凭记忆写课本内容，知识范围以 `docs/textbooks/` 为准，资料不够先问维护者
- **题目 ID、小节 ID 一经发布不要改动**，学生进度靠它关联
- 界面文字用中文，面向初中生，表述通俗；移动端优先（320px 宽可用，可点击控件不小于 36px）

## 协作约定

- 多人、多种 AI 工具协作，**不限制协作方式**：直接推 main、开分支、fork 后提 PR 都可以
- 直接推 main 之前先 `git pull --rebase`；提交前 `node tests/run.js` 必须全绿；提交信息用中文一句话说清改了什么
- 改了目录结构、内容格式、存储键或路由，**同一个提交里**更新对应的约定文档（根 / 目录级 `AGENTS.md`、`docs/storage-and-routes.md`），别让下一个人（或 AI）照着过时的说明干活
- 较大的功能先写设计文档，放在 `docs/superpowers/specs/`

## 常用命令

```bash
node tests/run.js                     # 全部校验（改了内容、代码或约定文档都要跑）
./scripts/start.sh [端口]             # 后台启动本地服务器（默认 8000），打印电脑和手机的访问地址
./scripts/stop.sh                     # 关闭服务器
./scripts/build.sh                    # 打包成部署用的压缩包（先跑校验），部署说明见 docs/deploy.md
python3 scripts/textbook-text.py g8s1 22.1   # 导出某一节的课本文字
```

## 目录结构（顶层）

```
index.html          应用入口（按顺序加载 src/ 下的脚本）
src/                应用代码；games/ 是趣味玩法                    → src/AGENTS.md、src/games/AGENTS.md
content/            学习内容：catalog.js 目录，<学科>/ 各学科内容，exams/ 真题卷，past-papers/ 上海中考原题 → content/AGENTS.md
tests/              自动校验（run.js 入口）                         → tests/AGENTS.md
scripts/            本地服务器、打包部署、课本文字导出、各类导入脚本
docs/               SOP、题型台账、课本知识范围、存储与路由、模板、设计文档
vendor/katex/       KaTeX 本地副本
.github/            Issue 模板
dist/ refs/ pic/    打包产物、参考资料原件、教材照片（都不入库）
```

## 维护约定文档

- 根 `AGENTS.md` 只放全局规则和路由；只和某个目录有关的约定写进那个目录的 `AGENTS.md`，专题资料放 `docs/`。`tests/agents-docs.test.js` 限制大小：根文件 16KB、目录级 14KB，超了就拆
- 新建目录级 `AGENTS.md` 时，同目录放一个只含导入的 `CLAUDE.md`（照抄 `content/CLAUDE.md`），并在上面的路由表加一行
- 文档里写的仓库路径要真实存在（测试会检查）；写占位路径用 `<册ID>` 这样的尖括号
- 各学科的经验、打回原因写进本学科的 `AGENTS.md` 或 `docs/sop-section.md`，不要写回根文件

## 已知问题

- 用无头 Chrome 截图时，requestAnimationFrame 动画跑不完，所以动画要在真机或普通浏览器里验证
- 游戏相关的已知问题见 `src/games/AGENTS.md`
