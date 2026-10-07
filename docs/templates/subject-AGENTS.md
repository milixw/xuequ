# 新学科约定模板

加新学科（比如物理 `physics`、语文 `chinese`）时，把下面的模板复制成 `content/<学科>/AGENTS.md`，同目录再复制一份 `content/CLAUDE.md`，然后把 `<…>` 全部填好。各学科的标准不同，**不要直接套用数学的真卷标尺、verify 和盲解复核**，先和维护者商量本学科怎么定档、怎么复核。

建目录和数据的步骤：

1. `content/catalog.js` 加学科 → 教材 → 册 → 章 → 节条目（先全部 `ready: false`），学科、教材、册的 ID 规则见 `content/AGENTS.md` 的“编号”
2. 课本资料整理成 `docs/textbooks/<学科>-<教材ID>-<册ID>.md`：目录、页码、各节知识范围、“课本页码 = 文件页码 − N”、原件路径（原件放 `refs/`，不入库）
3. 需要题型台账时建 `docs/question-types/<学科>/<册ID>.md`（格式照数学的分册文件）；不建台账要在本学科 `AGENTS.md` 写明原因
4. 需要新题型时扩展 `src/quiz.js`、`src/answer.js`，并补测试；需要专门的校验（像英语的 `tests/english-course.test.js`）就加一个测试文件并在 `tests/run.js` 里 `require`
5. 在根 `AGENTS.md` 的任务路由表加一行，`node tests/run.js` 全绿后提交

---

```markdown
# <学科中文名>内容约定

<一句话：本目录收什么内容、用哪个教材>。通用格式见 `content/AGENTS.md`。

- 课本资料：`docs/textbooks/<学科>-<教材ID>-<册ID>.md`；原文按节导出：<导出方法>
- 题型台账：`docs/question-types/<学科>/<册ID>.md`（或写明不建台账的原因）
- 审核：由<学科>教师审核，`review.status` 先写 `pending`

## 题量和难度

<每节几道、分几档、每档的标准；和数学不同的地方要写清楚>

## 题目写法

<本学科特有的要求：语言、单位、图示、判分方式、能不能自动核对答案>

## 出题流程和复核

<从查范围到提交的步骤；复核方式（另一个 AI 会话盲解、人工核对等）和通过标准>

## 经验

<做过几节后补：常见打回原因、易错点>
```
