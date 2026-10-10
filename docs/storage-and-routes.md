# 页面路由与本地存储

新增或修改 hash 路由、localStorage / sessionStorage 键时，**在同一个提交里更新本文件**。`tests/agents-docs.test.js` 会扫描 `src/` 和内容页里出现的 `xq.` 键，没登记在下表的会报错。

## 页面路由

| hash | 页面 |
|---|---|
| `#/` | 首页：右上角切换学期，展示该学期教材、独立试卷入口和趣味玩法；额外保留英语学习大纲、英语单词、英语试题库、英语中考真题四个入口（依次排列） |
| `#/shanghai-papers/<学科>` / `#/shanghai-papers/<学科>/<年份>` | 首页“上海中考真题”进入 math、chinese、physics、chemistry 的年份目录；原题文字与本地图片混合、题图点击放大，答案图在订正区、打印隐藏答案与作答控件；单选判分，其余人工订正；跨页小问不拆题，未能定位的资料待补 |
| `#/english-exams` / `#/english-exams/shanghai` | 中考地区目录 / 上海年份目录；旧 `#/english-exams/<年份>` 与 `#/english-exams/shanghai/<年份>` 均可作答上海题目 |
| `#/english-exams/jiangsu` / `#/english-exams/jiangsu/<城市ID>` / `#/english-exams/jiangsu/<城市ID>/<年份>` | 江苏城市目录 → 年份目录 → 原题作答；按城市隔离试卷，同篇阅读/完形合为一道大题、文章显示一次、全部小题统一提交，原小题 ID 和逐题错误统计不变；无答案不评分，无法提取的年份标待补充 |
| `#/english-plan` / `#/english-plan/<天数>` / `#/english-plan/<天数>/result` / `#/english-plan/<天数>/result/<记录ID>` | 英语七天计划、每日作答及按提交时间查看错题；屏幕显示订正答案和解析（旧记录按 ID 补取当前解析），A4 打印只保留原题和题号，不打印答案或解析；不改题目 ID 或原题文本 |
| `#/english-plan/<天数>/retry/<记录ID>` | 独立重做该提交记录中的错题；按快照恢复原题及答案，草稿不影响每日练习；提交追加新时间点记录（含全对），原记录不变；新错题可继续重做，重做答对题的答案和解析只在屏幕展示、不打印 |
| `#/words` / `#/words/<册ID>` / `#/words/<册ID>/<单元号>` | 英语单词：今日任务（到期复习 + 新词，一题一屏）/ 本册各单元掌握情况 / 单元词表（学这一单元、只练本单元）；首页“英语单词”入口进 `#/words`，中考词汇表从这里链出。设计见 `docs/superpowers/specs/2026-10-08-english-unit-structure.md` |
| `#/v/<册ID>` | 册：章节列表 + 本册的真题卷；英语册有词表时每个 Unit 多一行“单词 · 已掌握 n / 共 m” |
| `#/s/<小节ID>` | 小节：知识点 + 题目列表 |
| `#/q/<小节ID>/<题目ID>` | 做题 |
| `#/e/<真题卷ID>`、`#/eq/<真题卷ID>/<题目ID>` | 真题卷（按教材小节归类）、做真题 |
| `#/exam`、`#/exam/...` | 限时测试：列表、答题、结果（未登录会先要求登录） |
| `#/english-bank`、`#/english-bank/<题目ID>` | 英语试题库：先学知识点，再按题型浏览和作答；作答或查看答案后展示解析，重置隐藏解析，原题解析与 AI 补充解析分别标待核对 / 待审核 |
| `#/g/<游戏ID>`、`#/g/<游戏ID>/<关卡ID>` | 挂在小节上的动手玩游戏，返回键回到小节 |

## 本地存储

首页“语文考纲”链接到 `content/chinese/shanghai-junior-outline.html`，展示用户提供的归纳资料，可返回首页；不新增 hash 路由或存储键。
首页两份阅读应考手册分别链接到 `content/chinese/上海中考古诗文阅读应考手册.html`、`content/chinese/上海中考现代文阅读应考手册.html`，本地离线打开，可返回首页，不新增 hash 路由或存储键。
首页“古诗文联动注释”链接到 `content/chinese/上海中考古诗文·虚实词联动注释版.html`，配套三份参考页同目录离线使用，可返回首页，不新增 hash 路由或存储键。

首页“语文实词虚词”链接到独立离线页面 `content/chinese/classical-words.html`，实词展示资料正文并支持查找，虚词待补充；不展示 PDF 打开、下载入口和来源、页码、页数信息。原 PDF 为同目录 `classical-words.pdf`，供维护核对。不新增 hash 路由或存储键。

所有键名都以 `xq.` 开头，读写都包在 try/catch 里。改结构时升版本号（`v1` → `v2`）并写迁移，不要直接改旧键的格式。

| 键 | 位置 | 内容 |
|---|---|---|
| `xq.progress.v2` | localStorage | 数学小节和真题卷的共享进度，真题卷用 `exam:<真题卷ID>` 作分组 ID；旧英语分组仅作为迁移备份，不再写入 |
| `xq.english-progress.v1.<归属>` | localStorage | 英语题库及中考文字题练习进度，结构同旧英语分组，按账号隔离；上海中考分组保持 `english-exam:<年份>`，江苏分组为 `english-exam:js-<城市ID>-<年份>`；英语题库可单题重置，重置不清除累计错误 |
| `xq.errors.v2.<归属>` | localStorage | `{ counts: { [分组ID]: { [题目ID]: 次数 } }, events: { [提交事件ID]: true } }`；按账号记录累计错答次数及事件去重，从本账号七天记录补回明确事件；`Progress.errorCount` 查询单题，`errorStats` 返回次数降序统计；重置不清除，打印隐藏次数；旧 v1 保留备份 |
| `xq.words.v1.<归属>` | localStorage | 英语单词记忆进度 `{ words: { [词头小写]: { box: 1～5 \| 'M' 掌握 \| 'R' 认读, due: 'YYYY-MM-DD', seen, wrong, last } }, days: { [日期]: { reviewed, learned, wrong, ms } }（保留 90 天）, settings: { newPerDay: 5\|10\|15, unit: '<册ID>/<单元号>' } }`；按词头跨册共用，按账号隔离，“只练本单元”不写入 |
| `xq.vocab.ipa.v1` / `xq.vocab.src.v1` | localStorage | 独立英语单词页的音标与词表来源偏好；读取时兼容原页面的 `shvocab.ipa` / `shvocab.src` |
| `xq.english-plan.v2.<归属>` | localStorage | 本账号七天复习每日草稿及最近提交结果，切换账号重新加载；未登录独立 |
| `xq.english-plan-prints.v2.<归属>` | localStorage | 本账号错题打印记录数组；按提交 ID 去重，保留原题、知识点、选择和答案；含零错题记录，每条有时间入口，打印隐藏选择、答案和解析 |
| `xq.english-plan-retry.v2.<归属>` | localStorage | `{ drafts: { [源记录ID]: 作答 }, submissions: { [新记录ID]: { sourceId, review: [题干、ID、知识点、选择、答案快照] } } }`；本账号独立重做草稿和订正结果，不覆盖每日最近结果；提交清空本轮草稿 |
| `xq.learning-migration.v1` | localStorage | 旧共享学习数据迁移完成标记。用户指定归入“我是臭恩铭”，首次加载合并并保留旧 v1 键及 `.legacy` 副本；完整写入成功才标记，失败下次加载重试，不给其他账号自动导入 |
| `xq.account.v1` | localStorage | 当前登录的账号 `{ name }` |
| `xq.subject-papers.v1.<归属>` | localStorage | 上海语数物化 `{ [试卷ID]: { [题目ID]: { response, attempts, wrongCount, revealed, solved } } }`；通过 LearningStore 按账号/访客隔离，只累计单选题错误，主观题不标答对；查看答案不增加提交次数，切换账号后旧表单拒绝写入 |
| `xq.history.v1.<账号>` | localStorage | 该账号的考试历史，退出登录也保留 |
| `xq.grade.v1.<账号>` / `xq.grade.v1` | localStorage | 首页选的学期（登录 / 未登录），默认 `g6s1` |
| `xq.exam.v1` | sessionStorage | 进行中的限时测试（含截止时间） |
| `fg-solved.v2` | localStorage | 函数轨道通关记录（早于 `xq.` 约定，保持不动） |
| `xq.solids.v1` | localStorage | 立体图形实验室：`{ done: [关卡ID], nets: [1-3 拼出的展开图标准形] }` |
| `xq.24.v1` | localStorage | 24 点：`{ done: [关卡ID], input: 'expr' \| 'merge' }`，input 是选的操作方式；自由练习不存档 |
| `xq.nim.v1` | localStorage | 取石子：`{ done: [关卡ID], tables: [填完倒推表的关卡ID] }`；自由对局不存档 |
| `xq.balance.v1` | localStorage | 天平解方程：`{ best: { 关卡ID: 最少用了几步 } }` |
| `xq.magic.v1` | localStorage | 数学魔术揭秘：`{ done: [关卡ID] }` |
| `xq.fermat.v1` | localStorage | 费马点：`{ done: [关卡ID] }` |
| `xq.errors.v1` / `xq.english-plan.v1` / `xq.english-plan-prints.v1` / `xq.english-plan-retry.v1` | localStorage | 旧版本键：只在迁移时读取并保留备份，不再写入 |

## 学习数据归属

学习数据的 `<归属>` 为 `user:<encodeURIComponent(账号名)>`，未登录为 `guest`；`.legacy` 是旧共享数据备份，不参与账号或访客读取。七天草稿、提交、重做、英语进度和累计错误均由 `LearningStore` 按当前账号定位，不能回退读取其他人的数据。登录/退出触发路由重绘，模块检测归属变化后重新加载；旧表单检测账号变化后拒绝写入。迁移实现及约定见 `docs/superpowers/specs/2026-10-01-account-learning-data.md`。
