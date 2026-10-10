# 上海语数物化中考原题约定

`content/past-papers/` 收录上海语文、数学、物理、化学历年中考原题（文字 + 本地题图），页面在 `src/subject-papers.js`。英语中考题在 `content/english/past-papers/`，见 `content/english/AGENTS.md`。

**大文件不要整体读取**：`shanghai.js`（约 500KB）和 `images/` 下的 PNG。查题用 `grep -n "<题目ID>"` 或 `node -e`。

## 文件

```
  past-papers/shanghai.js          上海语文、数学、物理、化学历年部分原题文字数据，复合小问不拆开；来源 SHA-256、稳定资料题号、待审核、跳过题声明
  past-papers/math-transcripts.json  数学原 PDF 页面核对的题干、选项、参考答案与源文件 SHA-256；公式用 KaTeX，不根据答案补造题干
  past-papers/math-2026-transcripts.json  2026 数学扫描卷逐页核对的文字题及参考答案，绑定题卷、答案卷 SHA-256
  past-papers/source-inventory.json  两个用户目录递归扫描的上海语数资料清单，按 SHA-256 去重并保留重复路径、已导入/待转录状态；不是运行时原文件链接
  past-papers/science-source-inventory.json  上海物化资料独立清单，按 SHA-256 去重，保留两个根目录的来源路径、年份与转录状态
  past-papers/images/<试卷ID>/    原 PDF 裁切的本地原题和答案 PNG，源页号、点坐标 bbox 与像素尺寸存入题目；不把答案图放进题图
  past-papers/image-supplement-inventory.json  图片补题清单与不能自动定位的资料说明，绑定原文件 SHA-256
  past-papers/chinese-completion-crops.json  2013—2020、2023/2024语文缺题按页核对的题/答案裁切坐标，一基页号、PDF点
  past-papers/chinese-2026-recollections.json  四份本地2026回忆资料核对后的六组整理稿、版本差异与来源哈希，不冒充官方原卷
  past-papers/chinese-text-transcripts.json  46组原图片题的核对文字、标注与必要局部配图，绑定源哈希，不改原ID
```

## 测试

```
  subject-papers.test.js          上海语数原题、数学公式、参考答案、主观题不误判、账号隔离、存储失败、筛选与离线入口
  import-shanghai-subject-papers.test.py  上海语数提取回归：答案分界、重复题号、原标注、页脚及压平公式解析拒绝展示（单独 Python 运行，需 pypdf）
  expand-shanghai-subject-papers.test.py  扩充回归：正文 XML 中公式对象不丢失、原上标标注、原题及人工修正不覆盖、两目录去重与整组阅读（单独 Python 运行，需 pypdf、python-docx）
  import-shanghai-science-papers.test.py  物化提取回归：上下标、公式对象、原答案解析、复合题与不完整公式拒绝导入（单独 Python 运行）
  supplement-shanghai-question-images.test.py  PDF 题号、答案边界、单选答案、跨页裁图及空白过滤回归（单独 Python 运行，需 pdfplumber）
```

## 导入与编号

后续上海语数扩充使用 `python scripts/expand-shanghai-subject-papers.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"`，需 pypdf、python-docx 和现有 `word-binary-text.py`。两目录共找到 64 个资料路径，内容 SHA-256 去重后 37 个版本；目录覆盖 2013—2020、2023—2026 共 24 个学科/年份入口。当前 18 个入口可作答：数学 78 题、语文 34 道整组题，全部有原参考答案；另外 6 个入口明确标资料已找到、题目待转录，不伪装完整试卷。扩充保留原有 ID 和人工修正，主观题不自动评分；缺失公式、图像、关键标注或答案的题仍跳过。DOCX 从正文 XML 保留数字上标、下划线和加点；包括位于普通 run 之外的 OMML/对象也必须标缺失，不能静默删掉公式。新语文 `originalNumbers` 记录整组小题号，`originalNo` 为首题号（按源资料编号）；阅读正文及所有小问一起作答。2026 数学逐页转录 14 题，并绑定独立答案卷哈希；无原解析不冒充原解析。基础导入脚本复导也保留扩充年份。扩充设计见 `docs/superpowers/specs/2026-10-04-shanghai-papers-expansion.md`。

上海语数中考导入使用 `python scripts/import-shanghai-subject-papers.py <中考真题目录>`，依赖 pypdf。首批只收录本地 2023—2025 上海资料：数学 38 题，语文 13 道整组题（含多个小问），均有原资料参考答案，不代表完整试卷。2025 数学明确标回忆版。数学题干、选项及答案来自页面核对的 `math-transcripts.json`；原解析包含被压平的指数、分数或几何标记时不展示，标待完整转录，不冒充可靠解析。语文 `[[u]]...[[/u]]` 和 `[[dot]]...[[/dot]]` 恢复人工核对的下划线/加点，正文安全转义；跨题引用材料存 `context` 与 `contextLabel`。图表、标注不能完整恢复的题先跳过。试卷 ID `sh-<math或chinese>-<年份>`，题目 ID `<试卷ID>-q<资料题号>`，复导保留已有题目与人工修改，源 SHA-256 变动拒绝替换。设计见 `docs/superpowers/specs/2026-10-04-shanghai-chinese-math-papers.md`。

## 上海原题图片补充（2026-10-04 用户同意）

原来“只用文字”的限制对上海语数物化真题改为混合方案：已发布文字题不替换，缺图表或复杂公式的未添加题允许本地原 PDF 截图。英语独立题库尚未接入图片补题，仍沿用其原约定。题图不含答案，`stemImages` 与 `answerImages` 为 `{ src, page, bbox, width, height }` 数组；路径限定 `content/past-papers/images/<试卷ID>/q<题号>-stem或answer-<序号>.png`，page 一基，bbox 为原 PDF 点坐标。`optionsInImage: true` 表示原选项已在题图中，网页只显示 A—D 作答控件，答案明确的单选题才自动判分。

脚本 `python scripts/supplement-shanghai-question-images.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"` 依赖 pdfplumber 和 Poppler pdftoppm，校验原源 SHA-256、独立答案区、题号连续唯一及题卷/答案对应；只追加稳定原 ID，不改文字题。`--refresh-images` 仅重新裁切已接入图片题的图片和裁切元数据，不替换题干、答案、类型或 ID；不对未经确认的扫描件猜题号。图片支持离线加载、手机自适应、原图放大及打印，打印隐藏答案与解析（包括图片），保留文字选项和题图。

首批新增 98 道图片题：数学 37、物理 25、化学 36；按当前资料题号补齐数学 2023—2025、物理 2023/2025、化学 2023—2025 共八份 PDF 的剩余题目。已有文字题及账号记录不变，全部待教师审核，回忆版不冒充官方卷。2020、2026 等扫描件、只有 Word 的旧资料以及英语题目仍需后续定位，不宣称所有资料已补齐。`imageSupplement` 保存源哈希、独立答案边界和原题号清单，供题/答案图片隔离校验。设计见 `docs/superpowers/specs/2026-10-04-original-question-images.md`。

## 上海语文缺题补齐

2025 语文已用 `scripts/complete-shanghai-chinese-2025.py` 按原 PDF 补齐第 2、3、6 组题及原参考答案图片，保留其余已发布文字、ID 与整组编号，共 6 组（含作文），当时语文总计 37 组。分值锚点核对题/答案编号，源 SHA-256 绑定，题图不包含答案，作文范文只供人工参考，全部 pending。仅确认当前本地整理版资料完整，不冒充官方完整版；此定向脚本重跑不覆盖已有题。英语仍缺可靠原题卷，不能从听力原文或答案编造题目。

随后用 `scripts/complete-shanghai-chinese-papers.py <下载根目录> <临时转换PDF目录>` 追加其他年份43组，语文总计80组；2013—2020、2023—2025共11份已覆盖当前本地资料全部题号及作文。旧Word仅在临时目录用LibreOffice导出 `<年份>.pdf`，原资料不修改；2018/2019答案穿插正文，逐组裁切并排除答案，不能用整卷统一答案界线。新题 `imageSource` 记录原文件 `sourceSha256`、转换PDF的 `renderedSha256`、本组题图区结束界线 `answerBoundary`；检验题图在界线之前、答案图之后，转换不改变原资料来源。原文/图表及已发布题不替换。2016原资料将第10题误印为第9题，按阅读组标题及答案编号核对，图片保留误印并说明。2016/2020作文无原范文，`answerSource.kind: no-unique-answer`，不伪造标准答案、无答案图片，作文全部人工评阅。2026“完整版”实际是回忆整合提纲，正文、选项、材料均有缺失，仍待可靠原卷，不标完整。2021/2022目前没有本地资料入口。

2026随后经用户明确同意按多份回忆资料整理：用 `scripts/apply-shanghai-chinese-recollections.py <下载根目录>` 验证两PDF、两Word原哈希，追加六组文字作答，语文现共86组。组号1—6为整理资料编号，不是官方小题号；`recollectionSources`在试卷及题目上保存四份来源的相对路径、SHA-256及`kind: local-recollection`，原文件不作为运行时链接。默写、文言、作文按相互支持的版本整理；现代文材料明确为复述，小说明确非完整原文，只保留节选能支持的小问；名著选项按估分稿排列并标争议。甲同学意见、排序导语、小说发笑与第7段原文仍缺，`skipped`保留原因；不从答案反造内容，不宣称2026完整。六组均主观作答、原资料参考答案人工核对、pending，复导不覆盖已发布题。

## 上海语文文字优先（2026-10-10）

用户授权全部语文题转为文字，原11份整理卷的46组截图题已转录；现有12个年份86组均为文字题干和文字参考答案，仅7组保留雕像、邮票、手机材料、调查图、跳石照片、面具活动单和歌谱局部配图。原图仍留作来源核对，不再整页展示。2026四份资料及Word内嵌图片再次核验，仍有“非试卷完整原文”、采访版本冲突和缺失选项，不根据答案补造，保留回忆版和缺文声明。

`scripts/apply-shanghai-chinese-text.py <下载根目录>` 按转录清单核对原文件SHA-256后替换指定题组文字，首次保存原截图元数据在 `sourceImages: { stem, answer }`；`textSource`含源哈希、记录哈希、核对日和 `kind: source-checked-transcription`。重跑拒绝覆盖后续人工改动。原 `imageSource` 保留溯源，必要配图仍使用 `stemImages`，`sourceImage`及`pixelCrop`说明来自哪张原图与像素框，`label`给出配图名称；答案为文字，无 `answerImages`。图片刷新脚本遇 `textSource`必须跳过，不能恢复成整页截图。所有ID、原资料编号、主观题评分方式与学生存储格式不变，review仍pending。

原标注沿用 `[[u]]`、`[[dot]]`，新增 `[[wave]]...[[/wave]]` 表示波浪下划线；标注不嵌套，其他文本仍安全转义。表格按行列及空号、流程按节点转录；2016第10题原误印为第9题保留并说明。设计见 `docs/superpowers/specs/2026-10-10-chinese-text-transcription.md`。

## 上海物理、化学中考资料

首页增加两个独立学科入口，沿用上海中考按年份目录。文字导入命令为 `python scripts/import-shanghai-science-papers.py "D:\下载\中考真题" "F:\BaiduNetdiskDownload"`，依赖 pdfplumber、pypdf、python-docx 和现有旧 Word 读取器。两个目录去重找到 29 个物化版本，分别登记 2013、2014、2015、2016、2018、2019、2020、2023、2024、2025、2026 年；文字阶段物理 69 题、化学 77 题，加上图片补题后分别为 94、113 题，均有原资料参考答案。2016、2020、2026 暂无可靠题目，明确标待转录，不宣称所有试卷完整，全部待教师审核。

试卷 ID 为 `sh-physics-<年>` 或 `sh-chemistry-<年>`，题目 ID 沿用 `<试卷ID>-q<原题号>`。复导仅追加同一来源的未发布题号，不覆盖已有内容或语数试卷。DOCX 保留原数字上下标；图表、嵌入公式、丢失编号、压平化学式和科学记数法的题暂跳过。原解析不能完整提取时不展示，不生成假原解析。单选自动判分，其余题包括多选按主观题保存作答、人工核对，复合小问不拆开。版本标明整理版/回忆版非官方。设计见 `docs/superpowers/specs/2026-10-04-shanghai-science-papers.md`。
