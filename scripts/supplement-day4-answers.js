'use strict';
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../content/english/question-bank.js');
const questions = require(file);
const updates = [
  ['xdf-1642f7431764bee5', 'A', '(1) A (2) A (3) A (4) B (5) A (6) A (7) A (8) B (9) B', 6],
  ['xdf-5a7a5af879a2aa0f', 'A', '(1) A (2) A (3) B', 7],
  ['xdf-87772dea64f62aae', null, 'B', null],
];
let source = fs.readFileSync(file, 'utf8');
for (const [id, old, answer, page] of updates) {
  const q = questions.find(q => q.id === id);
  if (q?.answer === answer && q.answerSource) continue;
  if (!q || q.answer !== old || q.answerSource) throw new Error(`拒绝覆盖人工修改：${id}`);
  const answerSource = { kind: page ? 'local-original' : 'ai-supplement', originalAnswer: old,
    checkedAt: '2026-10-06', review: { status: 'pending' },
    ...(page ? { file: '错题_19_20260922_215557.pdf', page,
      sha256: 'd39ff263935ac877c69af6d6c2d660f3c61b828d1d101a68705caa9afa9bcdc9' } : {}) };
  const pattern = new RegExp(`("id": "${id}"[\\s\\S]*?"answer": )${old === null ? 'null' : '"A"'}`);
  if (!pattern.test(source)) throw new Error(id);
  source = source.replace(pattern, (_, prefix) => prefix + JSON.stringify(answer) + ',\n    "answerSource": ' + JSON.stringify(answerSource));
}
fs.writeFileSync(file, source);
