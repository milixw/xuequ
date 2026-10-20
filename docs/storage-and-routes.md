# 页面路由与本地存储

新增或修改 hash 路由、localStorage / sessionStorage 键时，**在同一个提交里更新本文件**。`tests/agents-docs.test.js` 会扫描 `src/` 和内容页里出现的 `xq.` 键，没登记在下表的会报错。

## 页面路由

| hash | 页面 |
|---|---|
| `#/` | 首页：右上角切换学期；从上到下分「今天」（接着学：上次打开的小节，见 `xq.lastVisit.v1`；今日单词：本学期有课本词表且今天有任务时；进行中的模拟考试，都没有时显示一句提示）、「学科」（数学、英语、语文、物理、化学两列卡片，本学期有课本的写册名和答对题数，没有的写“复习资料”或“中考真题”，进 `#/subject/<学科ID>`）、「趣味玩法」（只显示 `from` 不晚于当前学期的游戏，其余在“全部”里）。入口都登记在 `content/catalog.js` 的学科 `resources` 和顶层 `games`。设计见 `docs/superpowers/specs/2026-10-20-home-today-subjects.md` |
| `#/subject/<学科ID>` | 学科页：本学期课本（课本卡片，英语已解锁时加本册课本录音，“其他册”展开看全部册）→ 练习 → 资料 → 考试 → 玩法（数学）；`stage: 'zhongkao'` 的入口六～八年级收进底部“中考专区”，九年级正常显示；学科 ID 不存在时回首页 |
| `#/games` | 全部趣味玩法（不按学期过滤）；从这里、首页或学科页进 `#/g/…` 时返回键回原页面 |
| `#/shanghai-papers/<学科>` / `#/shanghai-papers/<学科>/<年份>` | 从各学科页“考试”组（中考专区）进入 math、chinese、physics、chemistry 的年份目录，目录页返回键回学科页；原题文字与本地图片混合、题图点击放大，答案图在订正区、打印隐藏答案与作答控件；单选判分，其余人工订正；跨页小问不拆题，未能定位的资料待补 |
| `#/shanghai-papers/<学科>/<年份>/<题组ID>` | 从阅读手册题型练习直达指定题组，保留原阅读材料、关联材料和同组小问；答案默认隐藏，返回键回到该年份全卷。使用原题组 ID 与原存储，不复制题目或新增进度键；无效 ID 明确报错 |
| `#/nantong-chinese` / `#/nantong-chinese/<年份>` | 首页入口暂时隐藏，保留年份目录及原题作答页面；主观作答、参考答案人工核对，数据独立按需加载，沿用按账号的 subject-papers 键与 `nt-chinese-<年份>` 分组 |
| `#/english-exams` / `#/english-exams/shanghai` | 中考地区目录 / 上海年份目录；旧 `#/english-exams/<年份>` 与 `#/english-exams/shanghai/<年份>` 均可作答上海题目 |
| `#/english-exams/jiangsu` / `#/english-exams/jiangsu/<城市ID>` / `#/english-exams/jiangsu/<城市ID>/<年份>` | 江苏城市目录 → 年份目录 → 原题作答；按城市隔离试卷，同篇阅读/完形合为一道大题、文章显示一次、全部小题统一提交，原小题 ID 和逐题错误统计不变；无答案不评分，无法提取的年份标待补充 |
| `#/english-plan` / `#/english-plan/<天数>` / `#/english-plan/<天数>/result` / `#/english-plan/<天数>/result/<记录ID>` | 英语七天计划、每日作答及按提交时间查看错题；屏幕显示订正答案和解析（旧记录按 ID 补取当前解析），A4 打印只保留原题和题号，不打印答案或解析；不改题目 ID 或原题文本 |
| `#/english-plan/<天数>/retry/<记录ID>` | 独立重做该提交记录中的错题；按快照恢复原题及答案，草稿不影响每日练习；提交追加新时间点记录（含全对），原记录不变；新错题可继续重做，重做答对题的答案和解析只在屏幕展示、不打印 |
| `#/words` / `#/words/<册ID>` / `#/words/<册ID>/<单元号>` | 英语单词：今日任务（到期复习 + 新词，一题一屏）/ 本册各单元掌握情况 / 单元词表（学这一单元、只练本单元）；英语学科页“英语单词”入口和首页“今日单词”进 `#/words`，中考词汇表从这里链出。设计见 `docs/superpowers/specs/2026-10-08-english-unit-structure.md` |
| `#/textbook` / `#/textbook/<册ID>` / `#/textbook/<册ID>/<单元号>` / `…/<单元号>/list` | 私有课本资料（`src/private-ui.js`）：`#/textbook` 跳到上次看的册，没有就首页右上角所选学期那一册（沪教版册 ID 同学期 ID；都没有就第一册）；册 ID 沪教版是 `g6s1` 这样，人教精通版加 `rj-` 前缀（`rj-g4s1`）；册页顶部按教材版本分行切换册、列出单元（人教精通版含 `r1`、`r2` 两个 Revision）和课本页码范围；单元默认“看课本听录音”——整本课本页面图片按单元竖排（滑到附近才加载，范围外的栏目页如总词表附在后面），底部固定播放栏，点栏目翻到那一页并播放；`/list` 是各栏目录音（0.75、1、1.25 倍速）和可显示隐藏的课文原文。资料在 `private/`（私有仓库，不入开源库）；本机能加载 `private/manifest.js` 就直接用，线上要先打开分享链接 `/xuequ/api/private/open/<分享码>`（口令服务发凭证后 302 到 `#/textbook`）或在首页“🔑 课本资料”输口令，凭证是口令服务发的 HttpOnly cookie `xq_private`（30 天，页面读不到，不占 localStorage）。分享链接可以只给某几册（2026-10-16 起），这时页面按口令服务 `status` 返回的范围只显示能看的册。英语小节页在已解锁且本单元有资料时顶部多一行链接。设计见 `docs/superpowers/specs/2026-10-13-private-textbook.md` |
| `#/mock` / `#/mock/<卷集ID>` / `…/<卷ID>` / `…/review` | 模拟考试（`src/mock-exam.js`）：私有库里的整卷试卷和解析（页面图片）。`#/mock` 只有一个卷集时直接进去；卷集页按语文、数学、英语分组列卷子（时长、满分、上次分数），复习资料在最上面；一份卷子先看说明再“开始考试”，作答时底部固定倒计时条（最后 5 分钟变色，时间到自动交卷，关掉再打开接着计时），交卷后才显示解析页，可切换“只看解析”、填自评分数、重新做一遍；`review` 是复习资料翻看。资料和解锁同课本资料：线上凭证范围是 `exams:<卷集ID>`，只给卷集的分享链接打开后跳到 `#/mock`。首页“练习”区有能做的卷子或可输口令时才出现“模拟考试”小格。设计见 `docs/superpowers/specs/2026-10-17-mock-exam.md` |
| `#/v/<册ID>` | 册：章节列表 + 本册的真题卷；英语册有词表时每个 Unit 多一行“单词 · 已掌握 n / 共 m” |
| `#/s/<小节ID>` | 小节：知识点 + 题目列表 |
| `#/q/<小节ID>/<题目ID>` | 做题 |
| `#/e/<真题卷ID>`、`#/eq/<真题卷ID>/<题目ID>` | 真题卷（按教材小节归类）、做真题 |
| `#/exam`、`#/exam/...` | 限时测试：列表、答题、结果（未登录会先要求登录） |
| `#/english-bank`、`#/english-bank/<题目ID>` | 英语试题库：先学知识点，再按题型浏览和作答；作答或查看答案后展示解析，重置隐藏解析，原题解析与 AI 补充解析分别标待核对 / 待审核 |
| `#/g/<游戏ID>`、`#/g/<游戏ID>/<关卡ID>` | 挂在小节上的动手玩游戏，返回键回到小节 |

## 本地存储

语文学科页“语文考纲”链接到 `content/chinese/shanghai-junior-outline.html`，展示用户提供的归纳资料，可返回首页；不新增 hash 路由或存储键。
英语词汇总表和课本单元词表通过 `green-vocabulary-enrichment.js`、`vocabulary-details.js` 补充词汇关系及原创例句，总表新增“2025手册 · 考纲词组”筛选按钮；不改原词条或学习进度，不新增路由、存储键，见 `docs/green-vocabulary.md`。
英语词汇总表另有三项专项链接，进入 `content/english/green-vocabulary-study.html#confusables` / `#patterns` / `#verbs`，分别是易混辨析、搭配与句型转换、不规则动词。练习输入临时保留在页面DOM，切换不清空，刷新不保存；无新增存储键，见 `docs/green-vocabulary-study.md`。
语文学科页两份阅读应考手册分别链接到 `content/chinese/上海中考古诗文阅读应考手册.html`、`content/chinese/上海中考现代文阅读应考手册.html`，本地离线打开，可返回首页，不新增 hash 路由或存储键。
语文学科页“古诗文联动注释”链接到 `content/chinese/上海中考古诗文·虚实词联动注释版.html`，配套三份参考页同目录离线使用，可返回首页，不新增 hash 路由或存储键。

语文学科页“文言实词虚词”链接到独立离线页面 `content/chinese/classical-words.html`，实词180条、虚词6个基础词及31个拓展词，搜索只匹配当前分类词名；虚词用本地 `classical-function-words.js` 加载，不宣称拓展词是官方范围。不展示 PDF 打开、下载入口和来源、页码、页数信息。原 PDF 为同目录 `classical-words.pdf`，供维护核对。不新增 hash 路由或存储键。

所有键名都以 `xq.` 开头，读写都包在 try/catch 里。改结构时升版本号（`v1` → `v2`）并写迁移，不要直接改旧键的格式。

| 键 | 位置 | 内容 |
|---|---|---|
| `xq.reading-handbook.modern.v1` | sessionStorage | 现代文阅读手册当前标签、页面纵向位置、搜索词、展开卡片及修辞表横向位置；同一浏览器标签内回退/重载恢复，存储异常不影响阅读，不是学生学习进度 |
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
| `xq.grade.v1.<账号>` / `xq.grade.v1` | localStorage | 首页、学科页右上角选的学期（登录 / 未登录），默认 `g6s1` |
| `xq.lastVisit.v1.<归属>` | localStorage | 首页“接着学”：上次打开的小节 `{ section: 小节ID, at: 毫秒时间戳 }`，小节页和做题页打开时写入，只存最近一次；经 `LearningStore` 按账号隔离，小节已不在目录或未上线时不显示 |
| `xq.textbookVol.v1` | localStorage | 课本资料上次看的册 ID（如 `g6s1`、`rj-g4s1`），`#/textbook` 优先跳到它；不分账号 |
| `xq.mockExam.v1` | localStorage | 模拟考试记录：`{ "<卷集ID>/<卷ID>": { startedAt?, history: [{ at, usedSec, score? }] } }`，`startedAt` 是进行中的开始时间，`history` 每次交卷一条（最多 10 条），`score` 是自评分数；不分账号 |
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
