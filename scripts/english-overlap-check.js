#!/usr/bin/env node
'use strict';

// 英语原创内容防抄袭检查：把某个单元的词表例句和小节文字（短文、知识卡例子、题干、选项、参考答案、听力原文）
// 和课本导出文字逐段比对，出现连续 6 个英文单词相同就报出来。课本文字用 scripts/textbook-text.py 导出。
//
// 用法：
//   python3 scripts/textbook-text.py en:g6s1 U4 > /tmp/u4.txt
//   python3 scripts/textbook-text.py en:g6s1 111 133 >> /tmp/u4.txt     # 再加上 Sound file、Grammar file 等附录页
//   node scripts/english-overlap-check.js /tmp/u4.txt g6s1 4
// 有重合时退出码为 1。

const fs = require('fs');
const path = require('path');

const [, , bookFile, vol, unitNo] = process.argv;
if (!bookFile || !vol || !unitNo) {
  console.error('用法：node scripts/english-overlap-check.js <课本文字.txt> <册ID> <单元号>');
  process.exit(2);
}
const ROOT = path.join(__dirname, '..');
const N = 6;
const norm = t => String(t).toLowerCase().replace(/[’‘]/g, "'").replace(/\[\[|\]\]/g, '')
  .replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim();
const book = norm(fs.readFileSync(bookFile, 'utf8'));

const texts = [];
const wordsFile = path.join(ROOT, 'content/english/words', `sh2022-${vol}.js`);
if (fs.existsSync(wordsFile)) {
  const src = fs.readFileSync(wordsFile, 'utf8');
  const data = JSON.parse(src.slice(src.indexOf('Words.volume(') + 13, src.lastIndexOf(');')));
  for (const unit of data.units) {
    if (String(unit.no) !== unitNo) continue;
    for (const w of unit.words) for (const ex of w.ex || []) texts.push([`词表 ${w.w}`, ex.en]);
  }
}

global.Content = { section(def) { this.last = def; } };
for (const k of ['1', '2', '3']) {
  const file = path.join(ROOT, 'content/english/sh2022', vol, `${unitNo}.${k}.js`);
  if (!fs.existsSync(file)) continue;
  require(file);
  const s = Content.last;
  const parts = [
    ...(s.reading ? s.reading.paragraphs : []),
    ...s.intro.map(card => card.example || ''),
    ...s.questions.flatMap(q => [q.stem, ...(q.options || []), ...(q.reference || []), q.audio ? q.audio.text : '']),
  ];
  for (const t of parts) texts.push([`${unitNo}.${k}`, t]);
}

let hits = 0;
for (const [where, t] of texts) {
  const ws = norm(t).split(' ');
  for (let i = 0; i + N <= ws.length; i++) {
    const gram = ws.slice(i, i + N).join(' ');
    if (book.includes(gram)) {
      console.log(`${where} 与课本重合：${gram}`);
      hits++;
      break;
    }
  }
}
console.log(`检查 ${texts.length} 段，重合 ${hits} 处`);
process.exit(hits ? 1 : 0);
