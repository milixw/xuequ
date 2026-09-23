# 参与贡献

谢谢你愿意帮忙！这个项目的内容面向初中生，**准确**比数量重要。

## 报告题目错误

[新建 Issue](../../issues/new/choose)，选“题目纠错”，写清：

- 题号：做题页顶部“第几题”旁边的小字，比如 `1.3-e04`
- 哪里错了：答案、解析、题干表述、配图，还是超纲、难度档位不对
- 你认为正确的是什么，最好附上推理过程

## 老师审核

每个小节文件里都有 `review` 字段，AI 写的内容一律是 `pending`（待审核）。老师审核完一节后，可以提 Issue 或 PR，把它改成：

```js
review: { status: 'approved', by: '审核人', date: '2026-10-01' },
```

## 出题（新增或修改小节）

1. 先读 [AGENTS.md](AGENTS.md) 的“内容写作规范”和 [docs/sop-section.md](docs/sop-section.md) 的完整流程
2. 知识范围以 [docs/textbooks/](docs/textbooks/) 为准，不能超纲；查 [docs/question-types.md](docs/question-types.md) 避开已经用过的套路
3. **全部原创**：小节里的内容不能照搬教材、教辅、真题卷的原文、例题、习题和插图（真题卷原题单独收录，见下一节）
4. 能计算的题目必须写 `verify`，用独立计算核对答案，不能直接返回写死的答案
5. **题目 ID 一经发布不要改动**，学生的做题进度靠它关联
6. 提交前运行 `node tests/run.js`，必须全部通过

## 收录真题卷

真题卷收集自网上公开的试卷，保留原题，格式见 [AGENTS.md](AGENTS.md) 的“真题卷格式”：

1. 在 `source` 里写清试卷名称和来源
2. 每题归到对应的教材小节，标 1～5 级难度并写出判断依据
3. 在 `docs/references/` 写一份分析笔记，在 `content/catalog.js` 对应册的 `exams` 里登记
4. 答案和解析要逐题核对，提交前运行 `node tests/run.js`

## 写代码

- 零构建、不引入框架；第三方库放在 `vendor/` 本地加载，不走 CDN
- 直接双击 `index.html`（`file://`）也要能用，所以不要用 `fetch` 加载本地文件
- 移动端优先：320px 宽度下能正常使用，可点击控件不小于 36px
- 界面文字用中文，表述要让初中生看得懂
- 判分等纯逻辑放在不依赖 DOM 的文件里，并补上测试

- 改了目录结构、内容格式、本地存储键名或页面路由，同一个提交里更新 [AGENTS.md](AGENTS.md)
- 较大的功能先写设计文档，放在 `docs/superpowers/specs/`

**交互式几何、立体图形**是接下来最想做的方向（见 README 的路线图）。动手之前请先开一个 Issue 讨论方案。

## 提交方式

协作方式不做限制：直接推 main、开分支、fork 后提 PR 都可以。

- 直接推 main 前先 `git pull --rebase`，不要在别人的提交上多出 merge
- 提交前运行 `node tests/run.js`，必须全部通过
- 提交信息用中文一句话说清改了什么，比如“八上 19.2「实数」20 道题，盲解复核两轮通过”

## 协议

提交代码即表示同意以 [MIT](LICENSE) 协议发布；提交 `content/` 下的原创内容即表示同意以 [CC BY-NC-SA 4.0](LICENSE-CONTENT) 发布。
