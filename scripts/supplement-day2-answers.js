'use strict';
// 定向补充九道题，保留原文、原解析和来源；重复运行不覆盖已有答案。
const fs = require('fs');
const path = require('path');
const answers = {
  'xdf-035ded739f46e89f': 'A', 'xdf-68b4a75015e805bb': 'C',
  'xdf-df644f0adf5ea0d7': 'C', 'xdf-70fcc7b611825989': 'C',
  'xdf-52ff904271b0c8f9': 'D', 'xdf-e20636e50a5e4d34': 'B',
  'xdf-9023b30e443ef0b6': 'D',
  'xdf-c550f29bd72d5dce': 'D', 'xdf-c68a76aa4cf169a6': 'C',
};
const file = path.join(__dirname, '../content/english/question-bank.js');
let source = fs.readFileSync(file, 'utf8');
for (const [id, answer] of Object.entries(answers)) {
  const q = require(file).find(q => q.id === id);
  if (q?.answer === answer && q.answerSource?.kind === 'ai-supplement') continue;
  if (!q || q.answer !== null) throw new Error(`拒绝覆盖：${id}`);
  const pattern = new RegExp(`("id": "${id}"[\\s\\S]*?"answer": )null`);
  if (!pattern.test(source)) throw new Error(`找不到：${id}`);
  source = source.replace(pattern, `$1"${answer}",\n    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } }`);
}
fs.writeFileSync(file, source);
