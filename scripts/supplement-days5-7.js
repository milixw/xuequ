'use strict';
// 应用原 PDF 答案核对清单；不依赖临时目录，不覆盖人工修改。
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const qs = require('../content/english/question-bank.js');
const updates = require('../content/english/reading-answer-transcripts.json').updates;
const file = path.join(__dirname, '../content/english/question-bank.js');
let text = fs.readFileSync(file, 'utf8');
for (const u of updates) {
  if (process.argv[2] && u.source) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(process.argv[2], u.source.file))).digest('hex');
    if (hash !== u.source.sha256) throw new Error(`来源已改变：${u.id}`);
  }
  const q = qs.find(q => q.id === u.id);
  if (q?.answer === u.answer && q.answerSource) continue;
  if (!q || q.answer !== u.originalAnswer || q.answerSource) throw new Error(`拒绝覆盖：${u.id}`);
  const source = { kind: u.ai ? 'ai-supplement' : 'local-original', originalAnswer: q.answer,
    checkedAt: '2026-10-06', review: { status: 'pending' }, ...(u.source || {}),
    ...(u.samePaperQuestion ? { samePaperQuestion: u.samePaperQuestion } : {}) };
  const escaped = JSON.stringify(q.answer).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`("id": "${u.id}"[\\s\\S]*?"answer": )${escaped}`);
  if (!pattern.test(text)) throw new Error(u.id);
  text = text.replace(pattern, (_, prefix) => prefix + JSON.stringify(u.answer) + ',\n    "answerSource": ' + JSON.stringify(source));
}
fs.writeFileSync(file, text);
console.log(`核对 ${updates.length} 组答案，已有答案保持不变。`);
