# 做一个英语单元的流程（SOP）

维护者说“做英语 <册> Unit n”时，按本流程做完**单词 + `<n>.1` + `<n>.2` + `<n>.3`**，跑完检查后先报告、等审核，审核通过再提交。设计依据见 `docs/superpowers/specs/2026-10-08-english-unit-structure.md`，格式和出题标准见 `content/english/AGENTS.md`。六上 Unit 1～4 是样板（`content/english/sh2022/g6s1/`），写之前先看一个同类小节。

## 0. 准备课本资料（每册只做一次）

- 课本 PDF 在 `refs/`（工具配置禁读，需要维护者临时放开 `.claude/settings.json` 的 refs 行；**不要提交这个文件的改动**，用完提醒恢复）
- 新册先建 `docs/textbooks/english-sh2022-<册ID>.md`：PDF 路径、“课本页码 = 文件页码 − N”、目录表（U1～U6、Sound file、Grammar file、按单元词表 WE、按字母词表 WA 的起始页），照 `english-sh2022-g6s1.md` 的格式
- `catalog.js` 英语册条目加 `words: 'content/english/words/sh2022-<册ID>.js'` 和六个 Unit 章（`sections: []`）

## 1. 定范围（只读本单元）

```bash
python3 scripts/textbook-text.py en:<册ID> U<n> > <临时目录>/u<n>.txt
python3 scripts/textbook-text.py en:<册ID> <Sound file 起页> <Grammar file 止页> >> <临时目录>/u<n>.txt
```

从中记下：本单元语法（Grammar in use + Grammar file 对应页）、Sound 栏目的字母或字母组合、TEEN skill / My learning notes 里的功能句型、阅读和写作的话题。只用来定范围，**不照搬原文、例题、习题**。

## 2. 单词

1. `python3 scripts/import-english-words.py <册ID> --units <n> --dry` 先看导出结果：音标有没有没转换的字母（字体编码表在脚本的 PHONETIC 里，缺了就补上并同步课本资料文档）、释义是否通顺
2. 去掉 `--dry` 写入；导出得不通顺的释义手动改，并加 `manual: true`（复导不覆盖）
   - 同一册词头不能重复（记忆进度按词头共用）：前面单元已有的词，脚本会提示“跳过”，把新义手动并进前面那条的释义（如 `n. 联系；纽带；v. 打成平局`），加 `manual: true`
3. `core` 默认取 `basic`：课本粗体词要会拼写，非粗体只认读
4. 写 `forms` 和原创例句：`core` 且有常用变形的词 2 条（一条考原形、一条考变形），其余 1 条；变形优先选和本单元语法对应的形式（一般现在时选三单、进行时选 -ing、名词选复数）；例句贴近初中生生活，`[[...]]` 标挖空
5. 再跑一次导入确认“缺例句 0”，`node tests/run.js` 通过

## 3. 三节小节

| 小节 | 内容 | 要点 |
|---|---|---|
| `<n>.1` 主题 · 本单元语法 | 原创短文（3 段、逐句译文、6～9 个本单元重点词）+ 知识卡 6 张 + 16 道选择题（5/6/5） | 短文换一个和课文不同的情境；知识卡覆盖语法、拼写规则、易混点和本单元功能句型；有阅读理解和推断题 |
| `<n>.2` 语法练习 | 回顾卡 3 张 + 辨认 5 道选择、运用 7 道填写（`kind: 'en'`）、产出 3 道 `open` | `levelNames`、`knowledgeRefs`；填写覆盖变形拼写、否定句、疑问句、简略回答、改错（错的词 / 改为）；整句答案至少列 2 种写法 |
| `<n>.3` 语音与听力 | 知识卡 3 张 + 10 道题，其中约 7 道带 `audio` | 本单元字母读音的辨音题、听音选词（选项是读音相近的词）、本单元情境的听力理解、听写单词和整句 |

小节标题统一“Unit 英文名 — 中文主题 ----- 知识点”，三节写完在 `catalog.js` 登记 `ready: true`。

## 4. 检查（全部通过才报告）

1. `node tests/run.js` 全绿
2. 防抄袭：`node scripts/english-overlap-check.js <临时目录>/u<n>.txt <册ID> <n>`，重合 0 处；有重合就改写原创文字
3. 人工对照：每张知识卡的例子不能泄露任何题目（包括其他两节的题），选项只用英文，干扰项对应真实错误，辨音题逐个核对音标
4. 浏览器走查（手机宽度 320～375px）：册页面、三节页面、一道填写题答对和答错、一道 `open` 题自评、一道听力题看解析里的原文；无报错、无横向滚动

## 5. 报告

说明单词数（粗体 / 只认读）、三节的内容和题型、检查结果、发现并修掉的问题，等维护者说“提交”再提交推送（不带 `.claude/settings.json`）。
