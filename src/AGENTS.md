# src/ 代码约定

应用代码。改了路由或本地存储键，同步更新 `docs/storage-and-routes.md`（测试会检查存储键是否登记）。游戏在 `src/games/`，另见 `src/games/AGENTS.md`。

**大文件按需读**：`demos.js` 有 2000 多行、按章节分段（搜 `// ---------- ` 找段落），只读要改的那一段和末尾的 `TYPES`。

## 文件

```
  answer.js                       判分纯函数：精确分数 Frac、数值/多值/代数式/实数（根号、π；simplest 时还要求化成最简二次根式：根号里无平方因数、分母无根号、同类已合并）/角度/比（ratio，要求最简整数比）的解析与比较、“已化简”检查、因式分解（factor，要求写成积并分解彻底，因式只允许差正负号）、最简分式（frac，分子分母和标准答案只允许差正负号）、不等式的解集（ineq，可写 x≥2、2<x、−1<x≤3、无解，var 指定未知数字母）
  accounts.js                     本地账号（无密码）、按账号保存的考试历史、学期偏好
  progress.js                     做题进度（小节和真题卷共用）、独立累计答错次数及按提交事件去重
  learning-store.js               学习数据账号归属、旧共享数据备份与指定账号迁移；未登录访客独立，不回退至他人数据
  content.js                      内容注册表：目录查询、学期列表、按需加载小节文件和真题卷文件
  demos.js                        演示动画：题目的 demo 字段放在解析里，知识点卡片的 demo 字段放在卡片末尾；第 14 章用 motion（平移、旋转、翻折、旋转 180° 的过程）、sweep、rotOverlap、billiard；第 15 章用 scaleOrder（两边同乘一个数，数轴伸缩、翻转）、solutionSet（数轴上画解集、找公共部分和整数解）；第 16 章用 vertAngles（拖动直线看对顶角与垂直）、parallelAngles（三线八角与平行）；第 17 章用 angleSum（内角拼成平角）、ssaSwing（边边角摆出两个三角形）；第 18 章用 perpBisector（拖动点看到线段两端的距离是否相等）；第 22 章用 rtMedian、hlCongruent、ladderSlide、bisectorDist、incenter、pythagorasProof、perpShortest；第 23 章用 exteriorWalk（沿边走一圈看外角和）、parallelogramDrag（滑块改平行四边形看性质）、quadFamily（平行四边形到矩形、菱形、正方形的对角线）、midlineRotate（旋转 180° 证中位线定理）、varignon（拖动顶点看中点四边形）、centroid（三条中线交于重心、分成 2∶1），依赖 DOM
  quiz.js                         做题引擎：题目渲染、作答、判分反馈、解析、快捷输入栏、renderText 排版
  exam.js                         限时测试：会话状态机、计时、交卷判分、结果页
  english-bank.js                 独立英语错题库：知识点介绍、题型筛选、作答与重置
  english-plan.js                 英语七天复习计划：每日全部原题直接作答、保存草稿、提交后保存错题打印记录，可切换历史记录及 A4 打印
  english-exams.js                上海及江苏英语中考文字题：地区 → 城市 → 年份目录，阅读/完形合并作答、原答案与解析、按账号累计错误；不展示图片或 Word
  subject-papers.js               上海语数物化真题：文字与本地题图混合，题图可放大，答案图只在订正区；按账号保存，打印不含答案
  account-ui.js                   右上角账号区和登录弹窗
  app.js                          hash 路由和页面：首页（教材、试卷、趣味玩法，另有英语大纲和试题库入口）→ 册 → 小节 / 真题卷 → 做题
  app.css                         全部样式
```

新增演示类型时：写在 `demos.js` 对应章节段落里，加进末尾的 `TYPES`，同时加进 `tests/content.test.js` 的 `DEMOS` 数组，并在上面 demos.js 那一行补一句说明。

## 代码约定

- 首屏只加载首页和常用页面要用的脚本；大体积数据（真题文字数据）不写进 `index.html`，在 `app.js` 的 `DATA_SCRIPTS` 里登记，进入对应页面时用 `<script>` 按需加载
- 零构建、不引入框架。第三方库只能放在 `vendor/` 里本地加载，不走 CDN（国内访问 CDN 不稳定）
- 内容文件（小节、真题卷）在浏览器里共用一个全局作用域，顶层的 `const`、`let`、`function` 名字要加小节号后缀（如 `S201`、`roots212`），否则后加载的文件报错不执行、页面显示“制作中”；`tests/content.test.js` 会把所有内容文件放进同一个上下文检查
- 判分、分数运算等纯逻辑放在不依赖 DOM 的文件里，文件末尾用 `module.exports` 导出给测试使用
- 界面文字用中文，面向初中生，表述要通俗；负号显示用 `−`（U+2212），但判分时 `-` 和 `−` 都要接受
- 移动端优先：页面在 320px 宽度下也要能正常使用，可点击控件不小于 36px
- localStorage 的读写都要包在 try/catch 里，键名统一加 `xq.` 前缀
- 新增学科时，只需要加 `content/<学科>/` 和 `catalog.js` 条目；如果需要新题型，再扩展 `quiz.js` 和 `answer.js`
