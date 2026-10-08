# 沪教版英语六年级上册：教学范围索引

来源：`refs/沪教版五四制初中英语/六年级上册/沪教版英语 六年级上册.pdf`（共 162 页），课本页码 = 文件页码 − 9。以下为目录摘要和页码，不是教材正文。

按页导出：`python3 scripts/textbook-text.py en:g6s1 U1`（导出 Unit 1）或 `python3 scripts/textbook-text.py en:g6s1 134 139`（导出课本第 134～139 页）。

## 目录与页码

| 编号 | 内容 | 起始页 | 大问题 / 语法 |
|---|---|---|---|
| S | Starter 1～4（Meet our new friends、Open the schoolbag、Plan my time、Yes, I'm ready!） | 2 | 字母、基本句型 SV / SVC / SVO、a/an/the、方位介词、时间表达、一般疑问句 |
| U1 | Unit 1 School life | 12 | What do you like most about school?；一般现在时（Present simple）；语音 Letter “i”；Word study: Word group |
| U2 | Unit 2 Family ties | 26 | What makes a family?；现在进行时（Present continuous）；语音 Letters “a” and “e” |
| U3 | Unit 3 Food | 40 | What role does food play in our lives?；可数名词与不可数名词；语音 Letters “o” and “u” |
| U4 | Unit 4 Sports | 54 | Why do we play sports?；疑问词 what、who；语音 Letters “ei”, “ea” and “ee”；Word study: Word partner |
| U5 | Unit 5 Animals and us | 68 | In what ways are animals important to us?；疑问词 how、when、where、why；语音 Letters “ar”, “are” and “ear” |
| U6 | Unit 6 Travelling around China | 82 | How can we get around and explore China?；be going to 表示将来；语音 Letters “oa” and “ou” |
| CC | Culture corner | 96 | |
| LC | Literature corner | 102 | |
| NT | Notes（课文难句注释） | 107 | |
| SF | Sound file（字母组合发音表） | 111 | |
| WS | Word study support（Word group、Word partner） | 113 | |
| LN | My learning notes support（各单元功能句型） | 117 | |
| GF | Grammar file | 119 | |
| WE | Words and expressions in each unit（按单元词表） | 134 | |
| WA | Words and expressions in alphabetical order | 140 | |
| PN | Proper nouns and glossary、Glossary、Numbers、Months and days | 146 | |

每个 Unit 依次为 Viewing and listening、Speaking、Reading（含 Grammar in use）、Writing、Discovery、Project 六部分。

## 单元词表

- 按单元词表在课本第 134～139 页，每条为“词头 音标 词性 释义 首次出现页码”。
- 词表页脚注：**粗体词为课标三级词汇表中收录的初中阶段基本词汇**。PDF 中粗体词头用 MyriadPro-Semibold 字体，非粗体用 MyriadPro-Regular，导入脚本据此生成 `basic` 字段；`core` 默认取 `basic`，非粗体词只认读、不考拼写。
- 音标用 TimesKKPhoneticNewRoman 字体编码，导入脚本按下表转成国际音标：`I→ɪ`、`9`/`'`→`ˈ`、`0→ˌ`、`R→ə`、`B→ɒ`、`V→ʌ`、`O→ɔ`、`S→ʃ`、`Z→ʒ`、`P→θ`、`N→ŋ`、`G→ɡ`、`W→ʊ`、`F→ɜ`、`A→ɑ`、`:→ː`。
- 导入：`python3 scripts/import-english-words.py g6s1 --units 1`，生成 `content/english/words/sh2022-g6s1.js`。
