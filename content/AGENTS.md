# content/ 内容约定（各学科通用）

学习内容都在这里：`catalog.js` 是学科 → 教材 → 册 → 章 → 节的目录（`ready: true` 才上线），每个小节一个文件。**各学科自己的出题标准在 `content/<学科>/AGENTS.md`**，先读它；新加学科照 `docs/templates/subject-AGENTS.md` 建一份。

- 内容文件在浏览器里共用一个全局作用域，顶层的 `const`、`let`、`function` 名字要加小节号后缀（如 `S201`、`FIG221`），否则后加载的文件报错不执行、页面显示“制作中”；`tests/content.test.js` 会把所有内容文件放进同一个上下文检查
- 内容文件用 `<script>` 加载，不用 `fetch`；体积大的数据（真题文字等）不进 `index.html`，在 `src/app.js` 的 `DATA_SCRIPTS` 里登记按需加载
- AI 写的内容 `review.status` 一律是 `pending`，教师审核后才能改成 `approved`
- **题目 ID 一经发布不要改动**，进度记录靠它关联

## 编号

- 学科：`math`、以后可能有 `physics`、`chinese` 等
- 学科：`english` 已接入八年级上册单元内容、六年级上册单元词表（只有单词、暂无小节，册条目 `words` 字段指向词表文件）；英语错题库仍是独立入口
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
    { title: '正数和负数', body: '...', example: '...', pitfall: '...' },  // pitfall 为易错提醒，可选；demo 为卡片里的演示动画，可选，格式同题目的 demo
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

英语八上单元小节另有 `reading` 和 `bankExamples`，格式见 `content/english/AGENTS.md`。

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

## 知识点介绍

- 每张卡片说清一个知识点：标题 + 1～3 句通俗解释 + 一个具体例子，每张控制在 100 字左右
- 先讲"为什么需要它"，再讲规则，最后给例子
- 术语和记号以课本为准，不引入高中术语

## 题目（通用）

- 每道题都要有分步解析，挑战题的解析要讲清思路是怎么想到的
- 选择题的干扰项要对应真实的常见错误（比如符号错、漏掉一种情况），不要随便凑
- TeX 命令在 JS 字符串里要写双反斜杠（`'\\frac'`）；文本里不要出现换行符，测试会拦截控制字符
- 有配图的题用内联 SVG，图里的数据必须和题干一致
- **知识点卡片的例子不能和任何题目撞车**，包括例子的中间步骤：比如卡片写 $(-\frac34)\div(-\frac98)=\frac34\times\frac89$，就等于泄露了题目 $(-\frac34)\times(-\frac89)$ 的答案。写完卡片后要逐题对照
- 公式里只用 KaTeX 认识的符号（测试开了严格模式），比如新运算符号用 `\\bigstar`，不要直接写 ★；中文和单位写在 `$` 外面

## 版权和审核

- 可以参照课本的章节结构和知识范围，但**不能照搬课本原文、例题、习题和插图**，小节里的知识点和题目全部原创
- 真题卷是例外：收录网上公开的试卷原题，要注明来源（见"真题卷格式"），不计入原创内容。原作者要求撤下时照办
- 教辅资料仍然只能提炼成笔记（`docs/references/`），不能整题搬进小节
- AI 写的内容 `review.status` 一律是 `pending`，界面上标注"待审核"，**正式用于教学前必须由相应学科教师审核**
- 不要凭记忆写课本内容。各小节的知识范围以 `docs/textbooks/` 里的课本资料为准，资料不够时先问项目维护者，不要自己补
