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

规则都写在约定文档里，人和 AI 工具读的是同一套：先读 [AGENTS.md](AGENTS.md)（全局规则和“做什么读什么”的路由表），再读 [content/AGENTS.md](content/AGENTS.md)（内容格式）和本学科的 `content/<学科>/AGENTS.md`（出题标准），数学的完整流程见 [docs/sop-section.md](docs/sop-section.md)。最要紧的几条：

1. 知识范围以 [docs/textbooks/](docs/textbooks/) 为准，不能超纲；**全部原创**，不照搬教材、教辅的原文、例题、习题和插图
2. 能计算的题目写 `verify`，用独立计算核对答案
3. **题目 ID 一经发布不要改动**，学生的做题进度靠它关联

## 收录真题卷

格式和要求见 [content/AGENTS.md](content/AGENTS.md) 的“真题卷格式”：写清来源、每题归到教材小节并标 1～5 级难度、在 `docs/references/` 写分析笔记、在 `content/catalog.js` 登记。

## 写代码

先读 [AGENTS.md](AGENTS.md) 的“全局硬规则”和 [src/AGENTS.md](src/AGENTS.md)；加新学科、新练习模式时照 [docs/templates/](docs/templates/) 里的模板和清单做。改了目录结构、内容格式、存储键或路由，同一个提交里更新对应的约定文档（测试会检查一部分）。

**交互式几何、立体图形**是接下来最想做的方向（见 README 的路线图）。动手之前请先开一个 Issue 讨论方案。

## 提交方式

协作方式不做限制：直接推 main、开分支、fork 后提 PR 都可以。

- 直接推 main 前先 `git pull --rebase`，不要在别人的提交上多出 merge
- 提交前运行 `node tests/run.js`，必须全部通过
- 提交信息用中文一句话说清改了什么，比如“八上 19.2「实数」20 道题，盲解复核两轮通过”

## 协议

提交代码即表示同意以 [MIT](LICENSE) 协议发布；提交 `content/` 下的原创内容即表示同意以 [CC BY-NC-SA 4.0](LICENSE-CONTENT) 发布。
