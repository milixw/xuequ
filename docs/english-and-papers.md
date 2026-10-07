# 英语与中考真题资料

从 AGENTS.md 拆出的专题说明：英语错题库与七天计划、上海及江苏英语中考文字题、上海语数物化中考原题的文件、测试、导入脚本与约定。改这些功能时同步更新本文件；AGENTS.md 的通用约定（本地存储键名、路由表、协作约定）仍以 AGENTS.md 为准。

## 文件

```
  english/question-bank.js        从本地错题 PDF 提取的英语试题，explanation 保存原题解析，缺失为 null（待核对）
  第 3 天及时赶车题 xdf-470051960705e642 按原 PDF 第 2～3 页核对题干与选项并去掉孤立 y，补 AI 参考答案 A（in time）及待审核解析；原答案缺失保存在 answerSource.originalAnswer: null。第 3 天 77 题均可自动判分，原 ID 和存档不变
  第 4 天 43 题均可自动判分：补全对话每空选择 A～F，保留原答案与整题提交统计，支持编号/范围答案和快照重做；复合题支持 (1)单选题 / 1.单选题。scripts/supplement-day4-answers.js 按错题_19 原 PDF 第 6、7 页补齐两组原答案（answerSource.kind: local-original，绑定 SHA-256），时态题 xdf-87772dea64f62aae 补 AI 答案 B 待审核；保留原题、ID、解析与存储格式。见 docs/superpowers/specs/2026-10-06-day4-grading.md
  english/reading-answer-transcripts.json  第 5～7 天 39 组客观题参考答案核对清单，原答案绑定文件、题号、SHA-256；两道缺原答案题另标 AI 待审核。scripts/supplement-days5-7.js 定向应用，不覆盖人工修改
  english/question-format-transcripts.json  第 5～6 天七道原题排版核对：跨行选项标签、误拼后题、书目配对表按原列恢复及句型转换填空横线；保留 ID、答案与来源，scripts/apply-english-formats.js 定向应用并可校验源 SHA-256
  english/grading-supplements.js  第 5～7 天 29 组词语配对、词形、首字母、句型转换、简答和翻译的原资料作答映射（pending），在 english-plan.js 前以 script 加载；每空输入或选择 A～G，整题提交，快照重做保留原答案。自由简答仅自动确认参考答案匹配，未匹配不直接计错，最新结果可查看当前草稿与参考答案供人工核对；不改存储键、快照格式或历史评分。第 5、6、7 天分别 51、60、54 题均有作答入口，见 docs/superpowers/specs/2026-10-06-days5-7-grading.md
  english/underline-transcripts.json  第 4 天 21 道题及第 2 天第 19、20 题按原 PDF 核对的填空横线与词组下划线，绑定来源 SHA-256、题号、页号及修复前后文本；scripts/apply-english-underlines.js 定向应用，不改 ID、答案或来源。词组用 [[u]]...[[/u]]，填空用 ____；英语题库与计划页安全渲染，旧快照只在正文一致时显示补回，不改存储；见 docs/superpowers/specs/2026-10-06-day4-underlines.md
  english/explanation-supplements.js  原 PDF 没有解析的题目补充讲解，按题目 ID 索引，review.status 为 pending；第 2 天九题经用户授权按语法补答案（含补回填空位置的第 19、20 题），question-bank.js 的 answerSource.kind 为 ai-supplement，originalAnswer 为 null、review.status 为 pending，界面标 AI 补充待教师审核；第 34 题钢笔题已按原 PDF 去掉误拼的下一题，保留发布 ID 和原答案 B、原解析，第 2 天 78 题均可判分。定向脚本 scripts/supplement-day2-answers.js 不覆盖已有答案或原解析
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
```

## 测试

```
  english-bank.test.js            英语题库与知识点归类校验
  import-english-bank.test.py      PDF 解析提取回归（单独用 Python 运行，需 pdfplumber）；覆盖复合小题、跨页解析和空解析
  english-plan.test.js            七天计划覆盖、路由入口和 A4 打印校验
  english-plan-retry.test.js      提交记录重做、快照还原、草稿隔离、新记录与错误统计、存储异常及打印校验
  english-exams.test.js           历年文字题数据、原题标记、路由入口、判分、账号隔离及无原件展示校验
  subject-papers.test.js          上海语数原题、数学公式、参考答案、主观题不误判、账号隔离、存储失败、筛选与离线入口
  import-shanghai-subject-papers.test.py  上海语数提取回归：答案分界、重复题号、原标注、页脚及压平公式解析拒绝展示（单独 Python 运行，需 pypdf）
  expand-shanghai-subject-papers.test.py  扩充回归：正文 XML 中公式对象不丢失、原上标标注、原题及人工修正不覆盖、两目录去重与整组阅读（单独 Python 运行，需 pypdf、python-docx）
  import-shanghai-science-papers.test.py  物化提取回归：上下标、公式对象、原答案解析、复合题与不完整公式拒绝导入（单独 Python 运行）
  supplement-shanghai-question-images.test.py  PDF 题号、答案边界、单选答案、跨页裁图及空白过滤回归（单独 Python 运行，需 pdfplumber）
  import-english-past-papers.test.py  原题文字提取回归（单独 Python 运行，需 pypdf、python-docx）：旧 Word 题号、原答案、下划线、图片依赖和缺失题干
  import-jiangsu-english.test.py   江苏解析回归（单独 Python 运行）：行内答案、交错解析、文章分组、缺图与重复题号跳过
```

## 英语题库解析补回

补回已发布英语题库解析时，使用 `python scripts/import-english-bank.py <PDF目录> --supplement-explanations`，只按文件和原题号更新 `explanation`，保留题干、答案、来源、题目 ID 和审核字段；不要用全量重导覆盖已人工修正的题目。

## 导入脚本与编号

后续上海语数扩充使用 `python scripts/expand-shanghai-subject-papers.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"`，需 pypdf、python-docx 和现有 `word-binary-text.py`。两目录共找到 64 个资料路径，内容 SHA-256 去重后 37 个版本；目录覆盖 2013—2020、2023—2026 共 24 个学科/年份入口。当前 18 个入口可作答：数学 78 题、语文 34 道整组题，全部有原参考答案；另外 6 个入口明确标资料已找到、题目待转录，不伪装完整试卷。扩充保留原有 ID 和人工修正，主观题不自动评分；缺失公式、图像、关键标注或答案的题仍跳过。DOCX 从正文 XML 保留数字上标、下划线和加点；包括位于普通 run 之外的 OMML/对象也必须标缺失，不能静默删掉公式。新语文 `originalNumbers` 记录整组小题号，`originalNo` 为首题号（按源资料编号）；阅读正文及所有小问一起作答。2026 数学逐页转录 14 题，并绑定独立答案卷哈希；无原解析不冒充原解析。基础导入脚本复导也保留扩充年份。扩充设计见 `docs/superpowers/specs/2026-10-04-shanghai-papers-expansion.md`。

上海语数中考导入使用 `python scripts/import-shanghai-subject-papers.py <中考真题目录>`，依赖 pypdf。首批只收录本地 2023—2025 上海资料：数学 38 题，语文 13 道整组题（含多个小问），均有原资料参考答案，不代表完整试卷。2025 数学明确标回忆版。数学题干、选项及答案来自页面核对的 `math-transcripts.json`；原解析包含被压平的指数、分数或几何标记时不展示，标待完整转录，不冒充可靠解析。语文 `[[u]]...[[/u]]` 和 `[[dot]]...[[/dot]]` 恢复人工核对的下划线/加点，正文安全转义；跨题引用材料存 `context` 与 `contextLabel`。图表、标注不能完整恢复的题先跳过。试卷 ID `sh-<math或chinese>-<年份>`，题目 ID `<试卷ID>-q<资料题号>`，复导保留已有题目与人工修改，源 SHA-256 变动拒绝替换。设计见 `docs/superpowers/specs/2026-10-04-shanghai-chinese-math-papers.md`。

上海英语中考文字题提取使用 `python scripts/import-english-past-papers.py <中考真题目录> <网盘下载目录>`，依赖 pdfplumber 环境中的 pypdf 和 python-docx；旧 .doc 由 `scripts/word-binary-text.py` 读取主文字流。不得凭答案生成缺失题干，不可靠识别的下划线、图片依赖题或选项先跳过。私用字体的英文撇号恢复成可见撇号，源下划线保留为 `[[u]]...[[/u]]`，界面纯文本转义，只解释下划线标记。来源文件不作为运行时链接。新增导入保留已发布 ID `sh<年份>-q<原资料题号>`，不要全量覆盖人工订正，设计见 `docs/superpowers/specs/2026-10-03-english-past-papers.md`。

江苏使用 `python scripts/import-jiangsu-english.py <中考真题目录> <网盘下载目录>`，额外用本地 7-Zip 读取压缩包内文档，临时提取目录限在工作区 `tmp/pdfs/jiangsu/` 并校验成员路径，不执行压缩包内容；源文件 SHA-256 去重，优先可读文字与原解析，重复小题号导致答案关联不清时跳过。试卷 ID 为 `js-<城市ID>-<年份>`、题目 ID 为 `<试卷ID>-q<原资料题号>`，复导保留原 ID 和人工修改，来源变动拒绝静默替换。13 城市 ID 为 nanjing、wuxi、xuzhou、changzhou、suzhou、nantong、lianyungang、huaian、yancheng、zhenjiang、yangzhou、taizhou、suqian。设计与导入限制见 `docs/superpowers/specs/2026-10-03-jiangsu-english-exams.md`。

補齐上海答案使用 `python scripts/import-english-past-papers.py <中考真题目录> <网盘下载目录> --supplement-answers`，验证来源 SHA-256 后仅补 `answer: null`，不改题干、选项、ID、已有答案、解析或审核状态。2017 年两题取本地原答案表；2018 年 35 题取 `answer-supplements.json` 中两份公开资料核对的答案，`answerSource: { kind: 'public-supplement', urls: [...], checkedAt, review: { status: 'pending' } }` 保存来源，屏幕与本地原答案分别标注，不冒充官方答案；复导保留补充字段与说明。当前上海已导入 253 小题均有参考答案，不代表完整试卷或教师已审核。

补齐已导入江苏题目的原答案使用同一命令加 `--supplement-answers`，仅补 `answer: null` 及相应缺失原解析，先验证来源 SHA-256；支持紧凑答案表、题号范围与原解析中的明确“故选”，冲突不猜。保留题干、选项、题号、ID、已有答案和人工订正。当前 1,493 个已导入江苏作答项均有原资料参考答案，仍待教师审核，不代表整卷导入。

## 上海原题图片补充（2026-10-04 用户同意）

原来“只用文字”的限制对上海语数物化真题改为混合方案：已发布文字题不替换，缺图表或复杂公式的未添加题允许本地原 PDF 截图。英语独立题库尚未接入图片补题，仍沿用其原约定。题图不含答案，`stemImages` 与 `answerImages` 为 `{ src, page, bbox, width, height }` 数组；路径限定 `content/past-papers/images/<试卷ID>/q<题号>-stem或answer-<序号>.png`，page 一基，bbox 为原 PDF 点坐标。`optionsInImage: true` 表示原选项已在题图中，网页只显示 A—D 作答控件，答案明确的单选题才自动判分。

脚本 `python scripts/supplement-shanghai-question-images.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"` 依赖 pdfplumber 和 Poppler pdftoppm，校验原源 SHA-256、独立答案区、题号连续唯一及题卷/答案对应；只追加稳定原 ID，不改文字题。`--refresh-images` 仅重新裁切已接入图片题的图片和裁切元数据，不替换题干、答案、类型或 ID；不对未经确认的扫描件猜题号。图片支持离线加载、手机自适应、原图放大及打印，打印隐藏答案与解析（包括图片），保留文字选项和题图。

首批新增 98 道图片题：数学 37、物理 25、化学 36；按当前资料题号补齐数学 2023—2025、物理 2023/2025、化学 2023—2025 共八份 PDF 的剩余题目。已有文字题及账号记录不变，全部待教师审核，回忆版不冒充官方卷。2020、2026 等扫描件、只有 Word 的旧资料以及英语题目仍需后续定位，不宣称所有资料已补齐。`imageSupplement` 保存源哈希、独立答案边界和原题号清单，供题/答案图片隔离校验。设计见 `docs/superpowers/specs/2026-10-04-original-question-images.md`。

## 上海物理、化学中考资料

首页增加两个独立学科入口，沿用上海中考按年份目录。文字导入命令为 `python scripts/import-shanghai-science-papers.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"`，依赖 pdfplumber、pypdf、python-docx 和现有旧 Word 读取器。两个目录去重找到 29 个物化版本，分别登记 2013、2014、2015、2016、2018、2019、2020、2023、2024、2025、2026 年；文字阶段物理 69 题、化学 77 题，加上图片补题后分别为 94、113 题，均有原资料参考答案。2016、2020、2026 暂无可靠题目，明确标待转录，不宣称所有试卷完整，全部待教师审核。

试卷 ID 为 `sh-physics-<年>` 或 `sh-chemistry-<年>`，题目 ID 沿用 `<试卷ID>-q<原题号>`。复导仅追加同一来源的未发布题号，不覆盖已有内容或语数试卷。DOCX 保留原数字上下标；图表、嵌入公式、丢失编号、压平化学式和科学记数法的题暂跳过。原解析不能完整提取时不展示，不生成假原解析。单选自动判分，其余题包括多选按主观题保存作答、人工核对，复合小问不拆开。版本标明整理版/回忆版非官方。设计见 `docs/superpowers/specs/2026-10-04-shanghai-science-papers.md`。

## 英语八上单元内容格式

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
