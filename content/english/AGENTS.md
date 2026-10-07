# 英语内容约定

英语八上单元小节（`content/english/sh2022/`）、英语错题库与七天计划、上海及江苏英语中考文字题。通用格式见 `content/AGENTS.md`。

**大文件不要整体读取**：`question-bank.js`（约 700KB）、`past-papers/jiangsu.js`（约 3MB）、`past-papers/catalog.js`、`shanghai-exam-vocabulary.html`。查某道题用 `grep -n "<题目ID>"`，或 `node -e` 加载后按 ID 取出；这些文件在部分工具里配置了禁读（见根 AGENTS.md）。

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
```

## 测试

```
  english-bank.test.js            英语题库与知识点归类校验
  import-english-bank.test.py      PDF 解析提取回归（单独用 Python 运行，需 pdfplumber）；覆盖复合小题、跨页解析和空解析
  english-plan.test.js            七天计划覆盖、路由入口和 A4 打印校验
  english-plan-retry.test.js      提交记录重做、快照还原、草稿隔离、新记录与错误统计、存储异常及打印校验
  english-exams.test.js           历年文字题数据、原题标记、路由入口、判分、账号隔离及无原件展示校验
  import-english-past-papers.test.py  原题文字提取回归（单独 Python 运行，需 pypdf、python-docx）：旧 Word 题号、原答案、下划线、图片依赖和缺失题干
  import-jiangsu-english.test.py   江苏解析回归（单独 Python 运行）：行内答案、交错解析、文章分组、缺图与重复题号跳过
```

## 英语八上单元的出题标准

英语八上综合入门小节例外：每个 Unit 有 16 道原创选择题（基础 5、扩展 6、挑战 5），其中最初的 6 道 ID 保持不变，新增 10 道接着编号。另以 `bankExamples` 引用现有错题库的 2 道原题作为知识点例题，**不复制或改写题库原文**；其讲解为 AI 原创。英语难度不硬套数学真卷压轴标尺。英语语法题由英语教师审核，不用数学的数值 `verify` 或盲解记录冒充语言复核；后续扩题保留已发布题目 ID。

英语八上原创练习的题干和选项以英文为主；较难词汇可直接在题干词后用括号写简短中文释义，例如 `evidence (证据)`。中文的分步解析保留，帮助学生订正。题库原题保持原样，不受这一原创题语言规则影响。

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

## 英语题库解析补回

补回已发布英语题库解析时，使用 `python scripts/import-english-bank.py <PDF目录> --supplement-explanations`，只按文件和原题号更新 `explanation`，保留题干、答案、来源、题目 ID 和审核字段；不要用全量重导覆盖已人工修正的题目。

## 中考题导入与编号

上海英语中考文字题提取使用 `python scripts/import-english-past-papers.py <中考真题目录> <网盘下载目录>`，依赖 pdfplumber 环境中的 pypdf 和 python-docx；旧 .doc 由 `scripts/word-binary-text.py` 读取主文字流。不得凭答案生成缺失题干，不可靠识别的下划线、图片依赖题或选项先跳过。私用字体的英文撇号恢复成可见撇号，源下划线保留为 `[[u]]...[[/u]]`，界面纯文本转义，只解释下划线标记。来源文件不作为运行时链接。新增导入保留已发布 ID `sh<年份>-q<原资料题号>`，不要全量覆盖人工订正，设计见 `docs/superpowers/specs/2026-10-03-english-past-papers.md`。

江苏使用 `python scripts/import-jiangsu-english.py <中考真题目录> <网盘下载目录>`，额外用本地 7-Zip 读取压缩包内文档，临时提取目录限在工作区 `tmp/pdfs/jiangsu/` 并校验成员路径，不执行压缩包内容；源文件 SHA-256 去重，优先可读文字与原解析，重复小题号导致答案关联不清时跳过。试卷 ID 为 `js-<城市ID>-<年份>`、题目 ID 为 `<试卷ID>-q<原资料题号>`，复导保留原 ID 和人工修改，来源变动拒绝静默替换。13 城市 ID 为 nanjing、wuxi、xuzhou、changzhou、suzhou、nantong、lianyungang、huaian、yancheng、zhenjiang、yangzhou、taizhou、suqian。设计与导入限制见 `docs/superpowers/specs/2026-10-03-jiangsu-english-exams.md`。

補齐上海答案使用 `python scripts/import-english-past-papers.py <中考真题目录> <网盘下载目录> --supplement-answers`，验证来源 SHA-256 后仅补 `answer: null`，不改题干、选项、ID、已有答案、解析或审核状态。2017 年两题取本地原答案表；2018 年 35 题取 `answer-supplements.json` 中两份公开资料核对的答案，`answerSource: { kind: 'public-supplement', urls: [...], checkedAt, review: { status: 'pending' } }` 保存来源，屏幕与本地原答案分别标注，不冒充官方答案；复导保留补充字段与说明。当前上海已导入 253 小题均有参考答案，不代表完整试卷或教师已审核。

补齐已导入江苏题目的原答案使用同一命令加 `--supplement-answers`，仅补 `answer: null` 及相应缺失原解析，先验证来源 SHA-256；支持紧凑答案表、题号范围与原解析中的明确“故选”，冲突不猜。保留题干、选项、题号、ID、已有答案和人工订正。当前 1,493 个已导入江苏作答项均有原资料参考答案，仍待教师审核，不代表整卷导入。
