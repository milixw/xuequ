'use strict';
// 只修复已核对原文的题干，保留发布 ID、答案及来源；不覆盖后续人工修改。
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const entries = require('../content/english/underline-transcripts.json').entries;
const file = path.join(__dirname, '../content/english/question-bank.js');
const questions = require(file);
let source = fs.readFileSync(file, 'utf8');
for (const item of entries) {
  if (process.argv[2]) {
    const raw = fs.readFileSync(path.join(process.argv[2], item.source.file));
    if (crypto.createHash('sha256').update(raw).digest('hex') !== item.source.sha256) throw new Error(`来源文件已变化：${item.id}`);
  }
  const q = questions.find(q => q.id === item.id);
  if (q?.text === item.text) continue;
  if (q?.text !== item.originalText) throw new Error(`拒绝覆盖人工修改：${item.id}`);
  const pattern = new RegExp(`("id": "${item.id}"[\\s\\S]*?"text": )"(?:[^"\\\\]|\\\\.)*"`);
  if (!pattern.test(source)) throw new Error(item.id);
  source = source.replace(pattern, (_, prefix) => prefix + JSON.stringify(item.text));
}
fs.writeFileSync(file, source);
console.log(`核对并恢复 ${entries.length} 道题，答案与 ID 不变。`);
