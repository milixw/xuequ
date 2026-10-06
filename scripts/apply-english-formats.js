'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const entries = require('../content/english/question-format-transcripts.json').entries;
const qs = require('../content/english/question-bank.js');
const file = path.join(__dirname, '../content/english/question-bank.js');
let text = fs.readFileSync(file, 'utf8');
for (const entry of entries) {
  if (process.argv[2]) {
    const sha = crypto.createHash('sha256').update(fs.readFileSync(path.join(process.argv[2], entry.source.file))).digest('hex');
    if (sha !== entry.source.sha256) throw new Error(`来源文件已改变：${entry.id}`);
  }
  const q = qs.find(q => q.id === entry.id);
  if (q?.text === entry.text) continue;
  if (q?.text !== entry.originalText) throw new Error(`拒绝覆盖人工修改：${entry.id}`);
  const pattern = new RegExp(`("id": "${entry.id}"[\\s\\S]*?"text": )"(?:[^"\\\\]|\\\\.)*"`);
  if (!pattern.test(text)) throw new Error(entry.id);
  text = text.replace(pattern, (_, prefix) => prefix + JSON.stringify(entry.text));
}
fs.writeFileSync(file, text);
console.log(`核对并修复 ${entries.length} 道原题排版。`);
