# AGENTS.md

面向初中生的学习闯关手机网页应用：按课本章节提供**通俗的知识点介绍 + 分级题目**（六年级另有换教材造成的"衔接"内容），另有按册收录的**真题卷**、按小节的**限时测试**（需要登录本地账号），以后可能扩展到其他学科。另有"趣味玩法"：一个"函数轨道"解谜小游戏，留给函数章节使用；一个"立体图形实验室"，用可旋转的 3D 图形讲展开图、最短路径和截面；一个"24 点"，练有理数的四则混合运算；一个"取石子"（尼姆游戏），从倒推表出发自己找必胜策略。和课本联系紧的"动手玩"游戏挂在对应小节上（目前有 2.3 的"数学魔术揭秘"、3.2 的"天平解方程"、七下 18.4 的"费马点"），也可以同时放进首页宫格。

本文件是项目约定的唯一正文，各家 AI 工具通用；`CLAUDE.md` 只是把它导入，改约定请改这里。

## 协作约定

- 多人协作，**不限制协作方式**：直接推 main、开分支、fork 后提 PR 都可以，按改动大小自己选
- 直接推 main 之前先 `git pull --rebase`，避免在别人的提交上多出一次 merge
- 不管用哪种方式，提交前都必须 `node tests/run.js` 全绿
- 提交信息用中文一句话说清改了什么
- 改了目录结构、内容格式、本地存储的键名或页面路由，要在**同一个提交里**更新本文件对应的部分，别让下一个人（或 AI）照着过时的说明干活
- 较大的功能先写设计文档，放在 `docs/superpowers/specs/`
- AI 写的内容 `review.status` 一律是 `pending`，等相应学科教师审核后才能改成 `approved`

## 常用命令

```bash
node tests/run.js                     # 全部校验（改了内容或代码都要跑）
./scripts/start.sh [端口]             # 后台启动本地服务器（默认 8000），打印电脑和手机的访问地址
./scripts/stop.sh                     # 关闭服务器
./scripts/build.sh                    # 打包成部署用的压缩包（先跑校验），部署说明见 docs/deploy.md
```

不需要构建。直接用浏览器打开 `index.html` 也要能用，所以**不要用 `fetch` 加载本地文件**（`file://` 下会被拦截），内容文件用 `<script>` 加载。

## 目录结构

```
index.html                        应用入口（按顺序加载下面的脚本）
src/
  answer.js                       判分纯函数：精确分数 Frac、数值/多值/代数式/实数（根号、π）/角度/比（ratio，要求最简整数比）的解析与比较、“已化简”检查、因式分解（factor，要求写成积并分解彻底，因式只允许差正负号）、最简分式（frac，分子分母和标准答案只允许差正负号）
  accounts.js                     本地账号（无密码）、按账号保存的考试历史、学期偏好
  progress.js                     做题进度（小节和真题卷共用）、独立累计答错次数及按提交事件去重
  learning-store.js               学习数据账号归属、旧共享数据备份与指定账号迁移；未登录访客独立，不回退至他人数据
  content.js                      内容注册表：目录查询、学期列表、按需加载小节文件和真题卷文件
  demos.js                        解析里的演示动画（题目的 demo 字段），依赖 DOM
  quiz.js                         做题引擎：题目渲染、作答、判分反馈、解析、快捷输入栏、renderText 排版
  exam.js                         限时测试：会话状态机、计时、交卷判分、结果页
  english-bank.js                 独立英语错题库：知识点介绍、题型筛选、作答与重置
  english-plan.js                 英语七天复习计划：每日全部原题直接作答、保存草稿、提交后保存错题打印记录，可切换历史记录及 A4 打印
  english-exams.js                上海及江苏英语中考文字题：地区 → 城市 → 年份目录，阅读/完形合并作答、原答案与解析、按账号累计错误；不展示图片或 Word
  subject-papers.js               上海语数物化真题：文字与本地题图混合，题图可放大，答案图只在订正区；按账号保存，打印不含答案
  account-ui.js                   右上角账号区和登录弹窗
  app.js                          hash 路由和页面：首页（教材、试卷、趣味玩法，另有英语大纲和试题库入口）→ 册 → 小节 / 真题卷 → 做题
  app.css                         全部样式
  games/function-track/           函数轨道小游戏（独立页面，首页“趣味玩法”进入）
  games/solids/                   立体图形实验室（独立页面）：geo3d.js 纯几何，game.js 关卡、控件和 Canvas 渲染
  games/24/                       24 点（独立页面）：solver.js 求解、排版、发牌，game.js 关卡和交互
  games/nim/                      取石子（独立页面）：solver.js 必胜判断、电脑走法、倒推表理由，game.js 关卡和交互
  games/balance/                  天平解方程（应用内页面，挂在 3.2）：solver.js 变形和最少步数，game.js 关卡和交互
  games/magic/                    数学魔术揭秘（应用内页面，挂在 2.3）：logic.js 补数、撕牌、约瑟夫、一次式、1089，game.js 关卡和交互
  games/fermat/                   费马点（应用内页面，挂在七下 18.4）：logic.js 距离、旋转、作图求费马点、数值最小点、路网，game.js 关卡和 SVG 拖动
vendor/katex/                     KaTeX 0.18.7 本地副本（只保留 woff2 字体）
content/
  catalog.js                      学科 → 教材 → 册 → 章 → 节 的目录，册下可挂 exams（真题卷）；ready: true 表示已上线。sh2024 登记了 6 上～9 上七册（8 下按试读片段的目录；8 下完整版、9 下还没出）
  math/
    sh2024/                       教材：上海教育出版社 2024 版（五·四学制）
      g6s1/                       册：六年级上册（g=年级，s1=上册，s2=下册）
        1.1.js ... 4.2.js         每个小节一个文件：知识点 + 题目
      g6s2/                       册：六年级下册（5.1～9.4，全册完成）
      g7s1/                       册：七年级上册（10.1～14.4，全册完成）
      g8s1/                       册：八年级上册（目前 19.1、19.2）
    bridge/g6s1/                  六年级衔接：旧版沪教版六年级第一学期的数的整除、分数两章（1.1～2.9），难度按月考真卷定
  exams/
    math/sh2024/g8s1/*.js         真题卷，一份试卷一个文件，路径 = 真题卷 ID
  english/question-bank.js        从本地错题 PDF 提取的英语试题，explanation 保存原题解析，缺失为 null（待核对）
  english/explanation-supplements.js  原 PDF 没有解析但答案明确的题目补充讲解，按题目 ID 索引，review.status 为 pending；不改变原题或答案
  english/knowledge.js            英语知识点讲解、steps 判断步骤、例子、commonErrors 带错因反例、连词分类例句与各题型 confusables 易混辨析、自动归类规则（待人工审核）；复习时先讲再练
  english/shanghai-junior-outline.html  由用户提供的上海初中英语学习大纲改成的离线页面；手机端目录可收起、宽表格可单独横向滑动
  english/shanghai-exam-vocabulary.html  用户提供的上海中考英语词汇总表，独立离线页面，首页英语单词入口打开；每条带 🔊 朗读（优先用设备英文语音，缺少时用有道在线读音）；单词行按词条加载例句，未覆盖的标记待补充
  english/vocabulary-examples.js   首批常用单词的原创双语例句，review.status 为 pending；不修改原词表与释义
  english/past-papers/catalog.js   上海历年中考原题文字数据，保留原资料题号、题干、选项、答案、解析及来源 SHA-256；目前部分导入，回忆版和缺失内容明确标注，review.status 为 pending
  english/past-papers/answer-supplements.json  上海原文件缺答案时经公开资料核对的补充表，仅供导入脚本使用；关联原文件 SHA-256，答案来源网址与核对日期写入 answerSource，待教师审核
  english/past-papers/jiangsu.js   江苏 13 城市原题文字数据，按 city / year 定位；资料无法可靠提取的年份标待补充，同篇阅读/完形在界面合并，原小题 ID 保持稳定
  english/past-papers/<年份>/      仅存听力媒体，不用 PDF、图片、Word 链接代替网页题目；原件本地参考放 refs/english-past-papers/
  past-papers/shanghai.js          上海语文、数学、物理、化学历年部分原题文字数据，复合小问不拆开；来源 SHA-256、稳定资料题号、待审核、跳过题声明
  past-papers/math-transcripts.json  数学原 PDF 页面核对的题干、选项、参考答案与源文件 SHA-256；公式用 KaTeX，不根据答案补造题干
  past-papers/math-2026-transcripts.json  2026 数学扫描卷逐页核对的文字题及参考答案，绑定题卷、答案卷 SHA-256
  past-papers/source-inventory.json  两个用户目录递归扫描的上海语数资料清单，按 SHA-256 去重并保留重复路径、已导入/待转录状态；不是运行时原文件链接
  past-papers/science-source-inventory.json  上海物化资料独立清单，按 SHA-256 去重，保留两个根目录的来源路径、年份与转录状态
  past-papers/images/<试卷ID>/    原 PDF 裁切的本地原题和答案 PNG，源页号、点坐标 bbox 与像素尺寸存入题目；不把答案图放进题图
  past-papers/image-supplement-inventory.json  图片补题清单与不能自动定位的资料说明，绑定原文件 SHA-256
  english/sh2022/g8s1/            沪教版五四制英语八上，六个 Unit 各一节综合入门（目录标题先英文原题再中文主题；原创阅读 + 重点词标注 + 知识卡 + 分级选择题，待教师审核）
  <其他学科>/                     预留，比如 physics/，结构相同
tests/
  run.js                          测试入口
  harness.js                      极简测试工具（test / warn / assert）
  answer.test.js                  判分逻辑单元测试
  progress.test.js                累计错误次数、历史提交回填、事件去重、刷新和重置校验
  content.test.js                 内容校验：目录与文件一致、题量配比、字段、公式渲染、答案自检、verify
  english-course.test.js          英语八上六个 Unit 的目录、内容、待审核状态与入口校验
  accounts.test.js                账号、考试历史、学期偏好
  account-ui.test.js              账号区和登录弹窗
  english-bank.test.js            英语题库与知识点归类校验
  import-english-bank.test.py      PDF 解析提取回归（单独用 Python 运行，需 pdfplumber）；覆盖复合小题、跨页解析和空解析
  english-plan.test.js            七天计划覆盖、路由入口和 A4 打印校验
  english-plan-retry.test.js      提交记录重做、快照还原、草稿隔离、新记录与错误统计、存储异常及打印校验
  learning-accounts.test.js       账号/访客隔离、同页切换、旧页面拒绝写入、旧共享数据迁移与备份校验
  home-subjects.test.js           首页原布局、英语三个入口与词汇例句的离线接入校验
  english-exams.test.js           历年文字题数据、原题标记、路由入口、判分、账号隔离及无原件展示校验
  subject-papers.test.js          上海语数原题、数学公式、参考答案、主观题不误判、账号隔离、存储失败、筛选与离线入口
  import-shanghai-subject-papers.test.py  上海语数提取回归：答案分界、重复题号、原标注、页脚及压平公式解析拒绝展示（单独 Python 运行，需 pypdf）
  expand-shanghai-subject-papers.test.py  扩充回归：正文 XML 中公式对象不丢失、原上标标注、原题及人工修正不覆盖、两目录去重与整组阅读（单独 Python 运行，需 pypdf、python-docx）
  import-shanghai-science-papers.test.py  物化提取回归：上下标、公式对象、原答案解析、复合题与不完整公式拒绝导入（单独 Python 运行）
  supplement-shanghai-question-images.test.py  PDF 题号、答案边界、单选答案、跨页裁图及空白过滤回归（单独 Python 运行，需 pdfplumber）
  import-english-past-papers.test.py  原题文字提取回归（单独 Python 运行，需 pypdf、python-docx）：旧 Word 题号、原答案、下划线、图片依赖和缺失题干
  import-jiangsu-english.test.py   江苏解析回归（单独 Python 运行）：行内答案、交错解析、文章分组、缺图与重复题号跳过
  exam.test.js                    限时测试的计时、判分、会话存取
  function-track.test.js          函数轨道关卡校验
  solids.test.js                  立体图形实验室：展开图、圆柱圆锥展开、最短路径、截面、关卡数据
  24.test.js                      24 点：求解器、括号化简、发牌分档、关卡条件
  nim.test.js                     取石子：各规则的规律和穷举核对、关卡开局和唯一走法、电脑走法
  balance.test.js                 天平解方程：变形规则、关卡和题面一致、最少步数穷举核对；动手玩的目录挂载
  magic.test.js                   数学魔术揭秘：撕牌所有选法、约瑟夫规律、口令字数、关卡答案由逻辑核对
  fermat.test.js                  费马点：作图法和数值最小点对照、120°、三线共点、旋转后共线、路网最优、关卡数据和答案
  export-blind.js                 导出不含答案的盲解题单（给复核子代理用）
  poly.js                         给 verify 用的整式运算（展开、加减、代入、次数），测试时挂成全局 Poly
docs/
  sop-section.md                  制作一个小节的完整流程（出题前必读）
  question-types.md               题型台账：各套路用在哪里（定位分核心 / 一次性，核心题型有计划复现）、待用套路池、教辅资料使用规则
  games-backlog.md                趣味玩法待完成清单
  exam.md                         限时测试和账号的使用说明、开发说明
  deploy.md                       打包和服务器部署
  plan-*.md                       早期开发计划（已完成，仅供参考）
  superpowers/specs/              功能设计文档
  superpowers/plans/              功能实施计划（开发过程记录，已完成的以代码为准）
  textbooks/                      教材目录与各章知识范围（出题前必读），每册一个文件，按完整课本整理（8 下只有第 23 章）
  references/                     外部参考资料的笔记（原件放 refs/，不入库）
.github/ISSUE_TEMPLATE/           Issue 模板：题目纠错、功能建议
scripts/                          start.sh / stop.sh：本地开发服务器；build.sh：打包；serve.js / run.sh：部署到服务器上运行；pdf-page.sh：教材 PDF 渲染；import-english-bank.py：导入本地英语错题 PDF
dist/                             打包产物，不入库
pic/                              用户拍的教材照片，不入库
refs/                             教材 PDF、教辅等参考资料原件，不入库；完整课本在 refs/沪教版五四制初中数学/（6 上～9 上，2022 课标修订版，可以用 pypdf 直接提取文字）
```

### 页面路由

补回已发布英语题库解析时，使用 `python scripts/import-english-bank.py <PDF目录> --supplement-explanations`，只按文件和原题号更新 `explanation`，保留题干、答案、来源、题目 ID 和审核字段；不要用全量重导覆盖已人工修正的题目。

| hash | 页面 |
|---|---|
| `#/` | 首页：右上角切换学期，展示该学期教材、独立试卷入口和趣味玩法；额外保留英语学习大纲、英语单词、英语试题库、英语中考真题四个入口（依次排列） |
| `#/shanghai-papers/<学科>` / `#/shanghai-papers/<学科>/<年份>` | 首页“上海中考真题”进入 math、chinese、physics、chemistry 的年份目录；原题文字与本地图片混合、题图点击放大，答案图在订正区、打印隐藏答案与作答控件；单选判分，其余人工订正；跨页小问不拆题，未能定位的资料待补 |
| `#/english-exams` / `#/english-exams/shanghai` | 中考地区目录 / 上海年份目录；旧 `#/english-exams/<年份>` 与 `#/english-exams/shanghai/<年份>` 均可作答上海题目 |
| `#/english-exams/jiangsu` / `#/english-exams/jiangsu/<城市ID>` / `#/english-exams/jiangsu/<城市ID>/<年份>` | 江苏城市目录 → 年份目录 → 原题作答；按城市隔离试卷，同篇阅读/完形合为一道大题、文章显示一次、全部小题统一提交，原小题 ID 和逐题错误统计不变；无答案不评分，无法提取的年份标待补充 |
| `#/english-plan` / `#/english-plan/<天数>` / `#/english-plan/<天数>/result` / `#/english-plan/<天数>/result/<记录ID>` | 英语七天计划、每日作答及按提交时间查看错题；屏幕显示订正答案和解析（旧记录按 ID 补取当前解析），A4 打印只保留原题和题号，不打印答案或解析；不改题目 ID 或原题文本 |
| `#/english-plan/<天数>/retry/<记录ID>` | 独立重做该提交记录中的错题；按快照恢复原题及答案，草稿不影响每日练习；提交追加新时间点记录（含全对），原记录不变；新错题可继续重做，重做答对题的答案和解析只在屏幕展示、不打印 |
| `#/v/<册ID>` | 册：章节列表 + 本册的真题卷 |
| `#/s/<小节ID>` | 小节：知识点 + 题目列表 |
| `#/q/<小节ID>/<题目ID>` | 做题 |
| `#/e/<真题卷ID>`、`#/eq/<真题卷ID>/<题目ID>` | 真题卷（按教材小节归类）、做真题 |
| `#/exam`、`#/exam/...` | 限时测试：列表、答题、结果（未登录会先要求登录） |
| `#/english-bank`、`#/english-bank/<题目ID>` | 英语试题库：先学知识点，再按题型浏览和作答；作答或查看答案后展示解析，重置隐藏解析，原题解析与 AI 补充解析分别标待核对 / 待审核 |
| `#/g/<游戏ID>`、`#/g/<游戏ID>/<关卡ID>` | 挂在小节上的动手玩游戏，返回键回到小节 |

### 本地存储

所有键名都以 `xq.` 开头，读写都包在 try/catch 里。改结构时升版本号（`v1` → `v2`）并写迁移，不要直接改旧键的格式。

| 键 | 位置 | 内容 |
|---|---|---|
| `xq.progress.v2` | localStorage | 数学小节和真题卷的共享进度，真题卷用 `exam:<真题卷ID>` 作分组 ID；旧英语分组仅作为迁移备份，不再写入 |
| `xq.english-progress.v1.<归属>` | localStorage | 英语题库及中考文字题练习进度，结构同旧英语分组，按账号隔离；上海中考分组保持 `english-exam:<年份>`，江苏分组为 `english-exam:js-<城市ID>-<年份>`；英语题库可单题重置，重置不清除累计错误 |
| `xq.errors.v2.<归属>` | localStorage | `{ counts: { [分组ID]: { [题目ID]: 次数 } }, events: { [提交事件ID]: true } }`；按账号记录累计错答次数及事件去重，从本账号七天记录补回明确事件；`Progress.errorCount` 查询单题，`errorStats` 返回次数降序统计；重置不清除，打印隐藏次数；旧 v1 保留备份 |
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

### 编号规则

后续上海语数扩充使用 `python scripts/expand-shanghai-subject-papers.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"`，需 pypdf、python-docx 和现有 `word-binary-text.py`。两目录共找到 64 个资料路径，内容 SHA-256 去重后 37 个版本；目录覆盖 2013—2020、2023—2026 共 24 个学科/年份入口。当前 18 个入口可作答：数学 78 题、语文 34 道整组题，全部有原参考答案；另外 6 个入口明确标资料已找到、题目待转录，不伪装完整试卷。扩充保留原有 ID 和人工修正，主观题不自动评分；缺失公式、图像、关键标注或答案的题仍跳过。DOCX 从正文 XML 保留数字上标、下划线和加点；包括位于普通 run 之外的 OMML/对象也必须标缺失，不能静默删掉公式。新语文 `originalNumbers` 记录整组小题号，`originalNo` 为首题号（按源资料编号）；阅读正文及所有小问一起作答。2026 数学逐页转录 14 题，并绑定独立答案卷哈希；无原解析不冒充原解析。基础导入脚本复导也保留扩充年份。扩充设计见 `docs/superpowers/specs/2026-10-04-shanghai-papers-expansion.md`。

上海语数中考导入使用 `python scripts/import-shanghai-subject-papers.py <中考真题目录>`，依赖 pypdf。首批只收录本地 2023—2025 上海资料：数学 38 题，语文 13 道整组题（含多个小问），均有原资料参考答案，不代表完整试卷。2025 数学明确标回忆版。数学题干、选项及答案来自页面核对的 `math-transcripts.json`；原解析包含被压平的指数、分数或几何标记时不展示，标待完整转录，不冒充可靠解析。语文 `[[u]]...[[/u]]` 和 `[[dot]]...[[/dot]]` 恢复人工核对的下划线/加点，正文安全转义；跨题引用材料存 `context` 与 `contextLabel`。图表、标注不能完整恢复的题先跳过。试卷 ID `sh-<math或chinese>-<年份>`，题目 ID `<试卷ID>-q<资料题号>`，复导保留已有题目与人工修改，源 SHA-256 变动拒绝替换。设计见 `docs/superpowers/specs/2026-10-04-shanghai-chinese-math-papers.md`。

学习数据的 `<归属>` 为 `user:<encodeURIComponent(账号名)>`，未登录为 `guest`；`.legacy` 是旧共享数据备份，不参与账号或访客读取。七天草稿、提交、重做、英语进度和累计错误均由 `LearningStore` 按当前账号定位，不能回退读取其他人的数据。登录/退出触发路由重绘，模块检测归属变化后重新加载；旧表单检测账号变化后拒绝写入。迁移实现及约定见 `docs/superpowers/specs/2026-10-01-account-learning-data.md`。

上海英语中考文字题提取使用 `python scripts/import-english-past-papers.py <中考真题目录> <网盘下载目录>`，依赖 pdfplumber 环境中的 pypdf 和 python-docx；旧 .doc 由 `scripts/word-binary-text.py` 读取主文字流。不得凭答案生成缺失题干，不可靠识别的下划线、图片依赖题或选项先跳过。私用字体的英文撇号恢复成可见撇号，源下划线保留为 `[[u]]...[[/u]]`，界面纯文本转义，只解释下划线标记。来源文件不作为运行时链接。新增导入保留已发布 ID `sh<年份>-q<原资料题号>`，不要全量覆盖人工订正，设计见 `docs/superpowers/specs/2026-10-03-english-past-papers.md`。

江苏使用 `python scripts/import-jiangsu-english.py <中考真题目录> <网盘下载目录>`，额外用本地 7-Zip 读取压缩包内文档，临时提取目录限在工作区 `tmp/pdfs/jiangsu/` 并校验成员路径，不执行压缩包内容；源文件 SHA-256 去重，优先可读文字与原解析，重复小题号导致答案关联不清时跳过。试卷 ID 为 `js-<城市ID>-<年份>`、题目 ID 为 `<试卷ID>-q<原资料题号>`，复导保留原 ID 和人工修改，来源变动拒绝静默替换。13 城市 ID 为 nanjing、wuxi、xuzhou、changzhou、suzhou、nantong、lianyungang、huaian、yancheng、zhenjiang、yangzhou、taizhou、suqian。设计与导入限制见 `docs/superpowers/specs/2026-10-03-jiangsu-english-exams.md`。

補齐上海答案使用 `python scripts/import-english-past-papers.py <中考真题目录> <网盘下载目录> --supplement-answers`，验证来源 SHA-256 后仅补 `answer: null`，不改题干、选项、ID、已有答案、解析或审核状态。2017 年两题取本地原答案表；2018 年 35 题取 `answer-supplements.json` 中两份公开资料核对的答案，`answerSource: { kind: 'public-supplement', urls: [...], checkedAt, review: { status: 'pending' } }` 保存来源，屏幕与本地原答案分别标注，不冒充官方答案；复导保留补充字段与说明。当前上海已导入 253 小题均有参考答案，不代表完整试卷或教师已审核。

补齐已导入江苏题目的原答案使用同一命令加 `--supplement-answers`，仅补 `answer: null` 及相应缺失原解析，先验证来源 SHA-256；支持紧凑答案表、题号范围与原解析中的明确“故选”，冲突不猜。保留题干、选项、题号、ID、已有答案和人工订正。当前 1,493 个已导入江苏作答项均有原资料参考答案，仍待教师审核，不代表整卷导入。

- 学科：`math`、以后可能有 `physics`、`chinese` 等
- 学科：`english` 已接入八年级上册单元内容；英语错题库仍是独立入口
- 教材：数学 `sh2024`、英语 `sh2022`（沪教新版，对应 2022 版课程标准）；`bridge` 是六年级衔接（旧版教材补课内容），册 ID 同样用 `g6s1`，首页选六年级上册时和新教材并列
- 册：`g6s1` 表示六年级上册，`g7s2` 表示七年级下册
- 小节 ID：`math/sh2024/g6s1/1.1`
- 英语八上按 Unit 1～6 建章，每章当前一节（`english/sh2022/g8s1/1.1` 至 `6.1`）；首页选择八年级上册时与数学并列显示。教材范围见 `docs/textbooks/english-sh2022-g8s1.md`
- 题目 ID：`<小节号>-<档位首字母><序号>`，比如 `1.1-b01`（基础）、`1.1-e03`（扩展）、`1.1-c05`（挑战）。**题目 ID 一经发布不要改动**，进度记录靠它关联

## 小节内容格式

```js
Content.section({
  id: 'math/sh2024/g6s1/1.1',
  title: '有理数的引入',
  review: { status: 'pending' },          // pending 待审核 / approved 已审核（附审核人、日期）
  audit: { blind: '2026-09-19', rounds: 2, note: '...' },  // 盲解复核记录，没有它测试会提醒
  intro: [                                // 知识点卡片，3～6 张
    { title: '正数和负数', body: '...', example: '...', pitfall: '...' },  // pitfall 为易错提醒，可选
  ],
  questions: [
    {
      id: '1.1-b01',
      level: 'basic',                     // basic 基础 / extended 扩展 / challenge 挑战
      type: 'choice',                     // choice / multi / fill
      stem: '...',                        // 题干，数学式子用 $...$（KaTeX）
      options: ['...'],                   // choice、multi 用
      answer: 1,                          // 形式取决于题型，见 src/answer.js
      explain: ['第一步...', '第二步...'],  // 分步解析
      verify: () => ...,                  // 可选：独立计算答案，测试时和 answer 核对；可用全局 F(x)（=Frac.of）和 Poly（整式运算，见 tests/poly.js）
      figure: '<svg>...</svg>',           // 可选：配图
      demo: { type: 'foldCut', folds: 2 }, // 可选：解析里的演示动画，type 见 src/demos.js 的 TYPES
    },
  ],
});
```

### 英语单元阅读

英语八上 `content/english/sh2022/g8s1/<小节号>.js` 的 `Content.section` 在 `intro` 和 `questions` 之外还有 `reading`，页面按“原创文章 → 重点词与短语 → 知识点 → 练习”的顺序显示：

英语小节 `title` 统一用“主题 ----- 主要知识点”（五个半角短横线），`catalog.js` 和小节文件要一致。`reading.title` 在页面上只显示文章名，不追加知识点；`reading.topic` 是内容元数据，不在文章标题中展示。

```js
reading: {
  title: '原创短文标题',
  topic: '本篇主要知识点',
  paragraphs: ['The club made a [[plan]] for the garden.'],
  translations: [['社团为花园制订了一个计划。']], // 与英文逐句对应；默认关闭时英文按原来的紧凑段落连续排版，开启后逐句换行并显示译文
  vocabulary: [{ term: 'plan', meaning: '计划' }],
}
```

`[[...]]` 内的词或短语必须与 `vocabulary.term` 完全相同，每个词表项都要在正文中标注。英文文章按句号、问号和感叹号分成显示行；`translations` 与段落、句子逐一对应，不能漏译或合并。正文和译文、释义按纯文本转义后显示，不写 HTML。课本仅用于确定主题和知识范围，**不复制课文原文**。新增文章同样保持 `review.status: pending`，由英语教师审核。

英语八上每节还有 `bankExamples: [{ id: 'xdf-...', point: '...', explain: ['...', '...'] }]`，恰好 2 道。`id` 引用 `content/english/question-bank.js` 已有选择题；题库在页面用 `<script>` 按需加载，原题文本、答案、来源和 ID 不改。例题排在知识卡后、原创练习前，答案与讲解默认折叠；题库导入数据尚待人工逐题核对。

## 真题卷格式

真题卷是网上收集的公开试卷，**保留原卷的题干、数据、选项和题号**，按教材小节归类后供学生练习。和原创小节的区别：

- 放在 `content/exams/<册ID>/<试卷名>.js`，在 `catalog.js` 对应册的 `exams` 里登记（`id`、`title`、`ready`、`questionCount`）
- 不受"20 道题、三档配比"的限制；难度用 1～5 标注（1 易 … 5 压轴），和原创题的三档不是一套标准
- 必须写 `source` 注明来源；分析笔记放 `docs/references/`，比如 `2025-chongming-midterm-analysis.md`
- 题目 ID 用 `<试卷缩写>-q<原题号>`，比如 `cm2025-q05`，发布后同样不要改动

```js
Content.exam({
  id: 'math/sh2024/g8s1/2025-chongming-midterm',
  volumeId: 'math/sh2024/g8s1',
  title: '...',
  source: { kind: 'exam-original', name: '...', note: '...' },
  questions: [
    {
      id: 'cm2025-q05', originalNo: 5,
      section: '19.2', sectionTitle: '实数',   // 归到哪个教材小节
      topic: '数轴上的无理数',
      difficulty: 2, difficultyReason: '...',
      type: 'choice', stem: '...', options: [...], answer: 0, explain: [...],  // 同小节题目
    },
  ],
});
```

## 内容写作规范

### 题量和难度

原创小节统一用真卷标尺（下面的旧标准只作记录），测试只检查题量范围：**基础 5～10 道、扩展 5～10 道、挑战 5 道，总数 15～20 道**。

英语八上综合入门小节例外：每个 Unit 有 16 道原创选择题（基础 5、扩展 6、挑战 5），其中最初的 6 道 ID 保持不变，新增 10 道接着编号。另以 `bankExamples` 引用现有错题库的 2 道原题作为知识点例题，**不复制或改写题库原文**；其讲解为 AI 原创。英语难度不硬套数学真卷压轴标尺。英语语法题由英语教师审核，不用数学的数值 `verify` 或盲解记录冒充语言复核；后续扩题保留已发布题目 ID。

英语八上原创练习的题干和选项以英文为主；较难词汇可直接在题干词后用括号写简短中文释义，例如 `evidence (证据)`。中文的分步解析保留，帮助学生订正。题库原题保持原样，不受这一原创题语言规则影响。

**真卷标尺（2026-09-29 起，6 上 13 节、7 上 10.1～10.3、8 上 19.1～19.2 已全部改用，6 下 5.1～9.4 按它新做，样板是 6 上 1.2）**：按上海真实学校考试卷定档。真卷按 1～5 标难度时，1～2 级约占六成，所以基础、扩展两档的比例向真卷靠拢，整节为**基础 9 + 扩展 6 + 挑战 5 = 20 道**。

| 档位 | 标准 |
|---|---|
| 基础 | 真卷常规题（1～2 级）：1～3 步，概念辨析和常见易错点，**每道都要有一个“坑”**（符号、漏解、忘了负数、移项丢符号等）。可以出“说法正确的有几个”、改错题 |
| 扩展 | 真卷中档难题到压轴题（3～5 级），3、4、5 级大约 3∶2∶1：要有转弯（分类讨论、找规律、动点、含绝对值条件筛选等） |
| 挑战 | 比真卷压轴再难一些：一个关键转化之后还要再推广或分类，或者两个环节叠加，5～7 步；**不要求竞赛水平，明显偏竞赛的换掉**；直接套一个方法就能做完的不合格 |

**上移标准（旧标准，已不再使用，保留作记录）**：基础 5 + 扩展 10 + 挑战 5。改用真卷标尺时，已发布的题目换档要换新题号（ID 里带档位字母），删掉的题号不再复用。

| 档位 | 标准 |
|---|---|
| 基础 | 上海区级期中、期末卷中档题：2～3 步，综合 1～2 个知识点，包含常见易错点（符号、绝对值、漏解等）。**不出课本例题式的一步题** |
| 扩展 | 区级期末压轴题、中考压轴小题的水平：3～5 步，至少用到分类讨论、找规律、构造、含参数、动态问题中的一项 |
| 挑战 | 比中考压轴小题更难一档：**至少叠加两个思维环节**（如动态加分段讨论、找规律加构造证明、含参加最值、多层符号判断），推理 6 步以上，相当于初一数学竞赛复赛中档题；标准以盲解复核的判断为准 |

2026-09-19 用户确认三档整体上移一档，得到旧标准。2026-09-29 评估发现旧标准下基础档已是真卷中档偏上、挑战档到竞赛水平，真卷里占六成的 1～2 级题几乎没有，用户确认改用真卷标尺，先做 1.2 样板，同日按同样流程重做了 6 上其余 12 节和 7 上、8 上已有的 5 节（每节保留原 5 道基础题、新写 4 道，扩展删到 6 道，偏竞赛或不够难的挑战题换新题，都经过盲解复核）。

**六年级衔接（`bridge`）** 同样以真卷（9 月月考卷）为标尺，题量沿用 5 + 10 + 5，见 `docs/superpowers/specs/2026-09-27-g6-bridge-design.md`。

**所有题目的知识点都不能超出本小节及之前所学**。挑战题难在思维，不能难在超纲。

### 知识点介绍

- 每张卡片说清一个知识点：标题 + 1～3 句通俗解释 + 一个具体例子，每张控制在 100 字左右
- 先讲"为什么需要它"，再讲规则，最后给例子
- 术语和记号以课本为准，不引入高中术语

### 题目

- 每道题都要有分步解析，挑战题的解析要讲清思路是怎么想到的
- 选择题的干扰项要对应真实的常见错误（比如符号错、漏掉一种情况），不要随便凑
- 能计算验证的题目必须写 `verify`：用 `F()` 做精确分数运算，或者穷举、模拟，**不要直接返回写死的答案**
- TeX 命令在 JS 字符串里要写双反斜杠（`'\\frac'`）；文本里不要出现换行符，测试会拦截控制字符
- 有配图的题用内联 SVG，图里的数据必须和题干一致
- **知识点卡片的例子不能和任何题目撞车**，包括例子的中间步骤：比如卡片写 $(-\frac34)\div(-\frac98)=\frac34\times\frac89$，就等于泄露了题目 $(-\frac34)\times(-\frac89)$ 的答案。写完卡片后要逐题对照
- 公式里只用 KaTeX 认识的符号（测试开了严格模式），比如新运算符号用 `\\bigstar`，不要直接写 ★；中文和单位写在 `$` 外面
- 解析里只能用**已学过的方法**：比如第 1 章用"数格子、距离、行程问题"推理，不要列方程（方程在第 3 章）；1.1 还没学有理数运算，不要写成加减算式

### 版权和审核

- 可以参照课本的章节结构和知识范围，但**不能照搬课本原文、例题、习题和插图**，小节里的知识点和题目全部原创
- 真题卷是例外：收录网上公开的试卷原题，要注明来源（见"真题卷格式"），不计入原创内容。原作者要求撤下时照办
- 教辅资料仍然只能提炼成笔记（`docs/references/`），不能整题搬进小节
- AI 写的内容 `review.status` 一律是 `pending`，界面上标注"待审核"，**正式用于教学前必须由相应学科教师审核**
- 不要凭记忆写课本内容。各小节的知识范围以 `docs/textbooks/` 里的课本资料为准，资料不够时先问项目维护者，不要自己补

### 每个小节的出题流程

**完整步骤、自查清单和复核提示词模板见 `docs/sop-section.md`，做新小节时照着执行。** 简要流程：

1. 查 `docs/textbooks/` 确认知识范围，查 `docs/question-types.md`：核心题型有计划地复现（换情境、换坑或多叠一步），一次性的巧题不重出，再从套路池挑新套路
2. 先列三档提纲（挑战题先写下"叠加哪两个环节"），再写题
3. `node tests/run.js` 通过 → 对照 SOP 的自查清单
4. `node tests/export-blind.js` 导出无答案题单，交一个干净的 AI 会话盲解复核（Claude Code 用子代理，其他工具另开一个新会话）
5. 处理意见后再送一轮，直到复核明确写"整节通过"（第 1 章每节用了 3 轮）
6. 更新题型台账、写入 `audit`、标记 `ready`、截图抽查、提交

### 经验（1.1～1.5）

- 复核方对挑战题的难度要求很严格：常规的"两层分类讨论""折叠数轴""找规律求第 n 项"只被评为期中、期末压轴水平。要达到"难一档"，需要叠加多个思维环节，比如动点加分段讨论加重合的情况，或者端点取舍加反证
- 小节越靠前，可用的知识越少，挑战题的难度上限越低，这一点要如实告诉用户，不要为了凑难度而超纲
- 知识点卡片要避免循环定义（比如相反数和绝对值互相解释），同一个词在同一张卡片里要保持同一个含义
- 难度以复核方的判断为准：复核方认为某道挑战题"没有达到比中考压轴更难一档"时，要修改或换题，直到通过
- 挑战题要做到"方法有门槛"：直接硬算、取特殊值、套单一模板就能解出来的都不合格
- 解析不能用还没学的方法：第 1 章不能"设 S"（字母表示数在第 2 章），不能用幂的运算法则，要从乘方的意义出发说明
- 复核每节开一个新会话；同一节的第二轮复核发回给原来的会话（它记得上下文），只导出改过的题（`export-blind.js` 后面列题目 ID）
- 第 1 章按上移后的标准，每节都做了 3 轮复核才通过。常见被打回的原因，按出现频率排序：
  1. 挑战题和本节扩展题是同一个模板（只换了数据），要换思路，不能只加难
  2. 只有一个思维环节：一次分类、一次裂项、一次找规律都不够
  3. 硬算、取特殊值、套现成模板就能做出来（比如项数太少、数集正负对称、选项二选一）
  4. 卡片例子（含中间步骤）泄露某道题的答案或第一步
  5. 解析用了还没学的方法：设字母、解方程、幂的运算法则
- 出题时先想"这道题要叠加哪两个环节"，再选数据；数据要避开对称、避开能一眼看出的特殊值

## 代码约定

- 零构建、不引入框架。第三方库只能放在 `vendor/` 里本地加载，不走 CDN（国内访问 CDN 不稳定）
- 判分、分数运算等纯逻辑放在不依赖 DOM 的文件里，文件末尾用 `module.exports` 导出给测试使用
- 界面文字用中文，面向初中生，表述要通俗；负号显示用 `−`（U+2212），但判分时 `-` 和 `−` 都要接受
- 移动端优先：页面在 320px 宽度下也要能正常使用，可点击控件不小于 36px
- localStorage 的读写都要包在 try/catch 里，键名统一加 `xq.` 前缀
- 新增学科时，只需要加 `content/<学科>/` 和 `catalog.js` 条目；如果需要新题型，再扩展 `quiz.js` 和 `answer.js`

## 趣味玩法的立意

数学方向的立意：**用技术帮学生看见课本上难以想象的东西**。几何、图形的变换、连续变化、逐步逼近，还有和直觉相反的结论，静态插图讲不清楚，做成能动手的页面讲得更生动，让学生在学习中发现一点乐趣。发掘新点子时按下面三条筛选：

1. **静态图讲不清**：概念本身是动的（变换、运动、逼近），或者结论和直觉相反（比如任意四边形的中点四边形总是平行四边形）
2. **学生自己动手发现**：拖动、旋转、调滑块，先自己得出猜想，再揭秘为什么成立（参照数学魔术的"先表演、再揭秘"），不做只能看的动画
3. **挂得上课本、测得了**：能挂上某个小节或课本里的阅读材料、综合与实践；关卡答案由求解器或几何计算得出，写测试核对

候选点子和进度记在 `docs/games-backlog.md`，新想到的点子也补进去。

## 函数轨道小游戏

玩家调整函数参数，让小球沿函数图像吃到星星、避开障碍、到达终点。有 6 关，内容是一次函数和二次函数；上海教材里函数在八年级，届时接入对应章节。

- 关卡数据在 `LEVELS` 里，格式：`type`、`title`、`hint`、`learn`、`start`、`goal`、`stars`、`walls`、`init`、`locked`、`solution`
- 关卡可以任意选，不按顺序解锁；通关记录是关卡下标的集合，存在 `fg-solved.v2`（会自动迁移旧版按顺序解锁的 `fg-cleared`）
- 判定函数 `simulate()` 是纯函数；改关卡后要跑测试，要求参考解能过关、初始值不能过关，原则上只有唯一解
- 坐标和参数都取在步长的整数倍上（k 为 0.5、b 为 1、a 为 0.25、h/k 为 0.5）

## 立体图形实验室

`src/games/solids/`，设计见 `docs/superpowers/specs/2026-09-23-solids-lab-design.md`。页内用 hash 选关（`index.html#2-2`），关卡 ID 为 `<章>-<序号>`。

- 4 章：1 正方体的展开、2 圆柱和圆锥的展开、3 蚂蚁爬最短路、4 切正方体。现有教材资料里没有立体图形，章节是按主题分的，暂不挂课本章节
- 关卡在 `LEVELS` 里，`challenge: true` 为挑战关；"看一看"关打开就算完成
- 不用 three.js：Canvas 2D 透视投影 + 按深度排序画多边形（画家算法）。画面物件是 `{ poly }`、`{ line }`、`{ dot }`，见 `game.js` 的 `render()`
- 题目数据（`NET_QUIZ`、`OPPOSITE_QUIZ`、`CONE_ROUNDS`、`BOX_ROUNDS`、`SECTION_QUIZ`）只写题面，答案由 `geo3d.js` 算出；改数据后跑测试
- 截面形状判断用的是精确相等（容差只抵消浮点误差）。倾斜角滑块在 35°、55° 两档换成 35.26°、54.74°，否则正六边形、等边三角形、菱形切不出来

## 24 点

`src/games/24/`，设计见 `docs/superpowers/specs/2026-09-24-24-points-design.md`。页内 hash：`#free` 自由练习，`#<章>-<序号>` 挑战关。

- 两种操作方式，页面上切换并记住："写算式"（默认）像计算器一样点牌、运算符、括号，`solver.js` 的 `pushToken` 只接受合法的下一个记号，写完用 `parseTokens` 按运算顺序计算；"一步一步算"点牌 → 点运算符 → 点另一张牌，两张合成一张
- 自由练习按解法数分入门、进阶、困难三档（`TIERS`），发牌时现算，不预存题库；"有理数版"红牌算负数，"可能无解"约四分之一的牌无解
- 挑战关 3 章：经典难题（必须经过分数）、有理数版、有解吗。`LEVELS` 只写牌面，章节条件由测试用求解器核对
- 求解器用 `answer.js` 的 `Frac` 精确运算；"解法数"只把加法、乘法交换两边的算作同一种，是分档用的近似数
- 看过答案的挑战关不算过关，点"重来"再做一遍才算

## 取石子

`src/games/nim/`，设计见 `docs/superpowers/specs/2026-09-24-nim-design.md`。页内 hash：`#free` 自由对局（对电脑 / 同桌对战），`#<章>-<序号>` 关卡。

- 4 章：1 一堆石子、2 两堆、3 三堆以上、4 变式（最后一颗算输、阶梯、棋子对推）。**每章第 1 关**（倒推表或色块讲解）完成后才开放本章后面的关卡
- 不讲二进制、异或，用"把每堆拆成 8、4、2、1 颗的色块，看能不能两两配对"代替；威佐夫游戏讲不清，不做
- 规则对象 `{ kind: 'nim' | 'stair' | 'push', take, misere, width }`，见 `solver.js` 开头。`isWin` 带缓存穷举，棋子对推会循环，改用空格数的配对判断
- `LEVELS` 只写规则和开局，"该选先手还是后手"由求解器算；测试要求学生一方按正确选择能赢，挑战关正确第一步唯一。改关卡后跑测试
- 同一关输 2、3、4 次依次给方法提示、局面提示、"提示"和"看答案"按钮；看过答案的关不算过关

## 动手玩（挂在小节上的游戏）

首页"趣味玩法"是宫格，列表在 `app.js` 的 `FUN_GAMES`（名字、一句“练什么”、课本位置、图标，按课本顺序排），详细玩法进了游戏再看。和课本联系紧的游戏主要挂在小节上，也可以同时放进宫格（数学魔术、天平解方程、费马点都放了），从首页进去时返回键回首页：`catalog.js` 小节条目写 `games: ['<ID>']`，小节页显示“动手玩”卡片，册页在该节下面多一行“玩”。游戏脚本在 `index.html` 里加载，注册 `window.Games[ID] = { id, title, section, desc, mount(main, levelId), progress() }`，由 `app.js` 的 `#/g/<ID>` 路由渲染。样式写在 `app.css`，用游戏专属前缀。game.js 整个包在立即执行函数里，否则几个游戏的顶层常量会冲突。候选玩法见 `docs/games-backlog.md`。

### 天平解方程

`src/games/balance/`，挂在 3.2，设计见 `docs/superpowers/specs/2026-09-24-balance-design.md`。

- 3 章 13 关：天平和等式、气球（负数）、袋子（括号）。★ 挑战关要用最少步数才算过关
- 局面每边 `{ x, n, b }`（x 盒子、砝码、袋子，负数是气球），操作只有两边同时放上 / 拿走、两边同时除以、打开袋子；只剩 1 个袋子时自动打开
- `LEVELS` 写 `eq`（题面）和 `left` / `right`（摆法），测试用 `tests/poly.js` 核对两者一致；最少步数由 BFS 算，测试再用全部操作穷举核对。改关卡后跑测试
- 关卡方程要避开 3.2 知识点卡片和题目里的方程

### 数学魔术揭秘

`src/games/magic/`，挂在 2.3，设计见 `docs/superpowers/specs/2026-09-24-magic-design.md`（含两个春晚魔术的完整原理）。

- 3 章 11 关：春晚计算器（2026 邓男子《惊喜定格》）、春晚撕牌（2024 刘谦《守岁共此时》，约瑟夫问题）、代数魔术（想一个数、生日、自己设计、1089）
- 每关是一串部件（`text`、`choice`、`fill`、表演类），见 game.js 开头；做完一个互动部件才出现下一个。填空复用 `answer.js` 的 `checkBlank`
- 能算的答案都由 `logic.js` 在测试里核对，改关卡数据后跑测试
- 春晚魔术的细节来自网上的复盘，页面上写的是“据网上的复盘”“网上普遍认为”，不要写成确定的事实

### 费马点

`src/games/fermat/`，挂在七下 18.4（课本 18.4 后的阅读材料“到三个定点距离之和最小的点”），设计见 `docs/superpowers/specs/2026-09-30-fermat-design.md`。

- 3 章 8 关：一条街上（数轴上距离和最小，两两配对）、三个点（拖出费马点、转 60° 揭秘、等边三角形作图）、更多的点 ★（四个点是对角线交点、正方形修路网）
- 部件做法同数学魔术；拖动部件（`line`、`plane`、`rotate`、`build`、`roads`）用 SVG + Pointer Events，关卡数据以“格”为单位，画的时候乘 40（`K`），文字用 px，免得浏览器最小字号把字放大
- 离最小值 0.4%（`TOL`）以内算找到，松手时吸到准确的最小点上，显示的角正好是 120°
- 拖动部件都带 `explain`（分步解析）：拖过一次后出现“拖不准？看解析”，点了自动把点移到最短的位置；自己找到或点了按钮，都显示解析。测试要求每个拖动部件都有解析，解析里的数由逻辑核对
- 不用勾股定理和根号，长度都由程序量出来；钝角 ≥ 120° 时“费马点是顶点”只作观察结论
- 改关卡数据后跑测试：要求各三角形的角度符合关卡设计、初始位置没达到最小、点都在画面里

## 上海原题图片补充（2026-10-04 用户同意）

原来“只用文字”的限制对上海语数物化真题改为混合方案：已发布文字题不替换，缺图表或复杂公式的未添加题允许本地原 PDF 截图。英语独立题库尚未接入图片补题，仍沿用其原约定。题图不含答案，`stemImages` 与 `answerImages` 为 `{ src, page, bbox, width, height }` 数组；路径限定 `content/past-papers/images/<试卷ID>/q<题号>-stem或answer-<序号>.png`，page 一基，bbox 为原 PDF 点坐标。`optionsInImage: true` 表示原选项已在题图中，网页只显示 A—D 作答控件，答案明确的单选题才自动判分。

脚本 `python scripts/supplement-shanghai-question-images.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"` 依赖 pdfplumber 和 Poppler pdftoppm，校验原源 SHA-256、独立答案区、题号连续唯一及题卷/答案对应；只追加稳定原 ID，不改文字题。`--refresh-images` 仅重新裁切已接入图片题的图片和裁切元数据，不替换题干、答案、类型或 ID；不对未经确认的扫描件猜题号。图片支持离线加载、手机自适应、原图放大及打印，打印隐藏答案与解析（包括图片），保留文字选项和题图。

首批新增 98 道图片题：数学 37、物理 25、化学 36；按当前资料题号补齐数学 2023—2025、物理 2023/2025、化学 2023—2025 共八份 PDF 的剩余题目。已有文字题及账号记录不变，全部待教师审核，回忆版不冒充官方卷。2020、2026 等扫描件、只有 Word 的旧资料以及英语题目仍需后续定位，不宣称所有资料已补齐。`imageSupplement` 保存源哈希、独立答案边界和原题号清单，供题/答案图片隔离校验。设计见 `docs/superpowers/specs/2026-10-04-original-question-images.md`。

## 上海物理、化学中考资料

首页增加两个独立学科入口，沿用上海中考按年份目录。文字导入命令为 `python scripts/import-shanghai-science-papers.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"`，依赖 pdfplumber、pypdf、python-docx 和现有旧 Word 读取器。两个目录去重找到 29 个物化版本，分别登记 2013、2014、2015、2016、2018、2019、2020、2023、2024、2025、2026 年；文字阶段物理 69 题、化学 77 题，加上图片补题后分别为 94、113 题，均有原资料参考答案。2016、2020、2026 暂无可靠题目，明确标待转录，不宣称所有试卷完整，全部待教师审核。

试卷 ID 为 `sh-physics-<年>` 或 `sh-chemistry-<年>`，题目 ID 沿用 `<试卷ID>-q<原题号>`。复导仅追加同一来源的未发布题号，不覆盖已有内容或语数试卷。DOCX 保留原数字上下标；图表、嵌入公式、丢失编号、压平化学式和科学记数法的题暂跳过。原解析不能完整提取时不展示，不生成假原解析。单选自动判分，其余题包括多选按主观题保存作答、人工核对，复合小问不拆开。版本标明整理版/回忆版非官方。设计见 `docs/superpowers/specs/2026-10-04-shanghai-science-papers.md`。

## 已知问题

- 函数轨道：星星在 y 轴上时，会和 y 轴的刻度数字重叠
- 函数轨道：第 2 关用了"斜率"一词，接入八年级教材时要按课本统一用语
- 用无头 Chrome 截图时，requestAnimationFrame 动画跑不完，所以动画要在真机或普通浏览器里验证
- 立体图形实验室：画家算法在面互相穿插时会画错（比如 2-3 围圆锥时半径偏小、扇形重叠的部分），不影响理解，暂不处理
