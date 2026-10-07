# tests/ 约定

`node tests/run.js` 跑全部 JS 校验（提交前必须全绿）；新测试文件要在 `run.js` 里 `require`。纯逻辑测试不依赖 DOM，被测文件末尾用 `module.exports` 导出。Python 回归测试（`*.test.py`）单独运行，见各内容目录的 AGENTS.md。

```
  run.js                          测试入口
  harness.js                      极简测试工具（test / warn / assert）
  answer.test.js                  判分逻辑单元测试
  progress.test.js                累计错误次数、历史提交回填、事件去重、刷新和重置校验
  content.test.js                 内容校验：目录与文件一致、题量配比、字段、公式渲染、答案自检、verify
  english-course.test.js          英语八上六个 Unit 的目录、内容、待审核状态与入口校验
  accounts.test.js                账号、考试历史、学期偏好
  account-ui.test.js              账号区和登录弹窗
  （英语题库、七天计划、中考真题相关的十几个测试，含单独用 Python 运行的导入回归，列表见 content/english/AGENTS.md 和 content/past-papers/AGENTS.md）
  learning-accounts.test.js       账号/访客隔离、同页切换、旧页面拒绝写入、旧共享数据迁移与备份校验
  home-subjects.test.js           首页原布局、英语三个入口与词汇例句的离线接入校验
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
  agents-docs.test.js             AI 约定文档的护栏：各层 AGENTS.md 的大小上限、CLAUDE.md 导入、文档里引用的路径存在、学科目录有约定文件、存储键已登记
```
