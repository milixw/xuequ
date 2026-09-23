'use strict';

// 导出盲解题单：只有知识点卡片、题干、选项和填空说明，不含答案、解析和 verify。
// 用法：node tests/export-blind.js <小节ID> <输出文件> [题目ID ...]
//   例：node tests/export-blind.js math/sh2024/g6s1/1.1 /tmp/blind.md
//   只导出部分题目：在后面列出题目 ID
const fs = require('fs');
const path = require('path');

const [id, out, ...only] = process.argv.slice(2);
if (!id || !out) {
  console.log('用法：node tests/export-blind.js <小节ID> <输出文件> [题目ID ...]');
  process.exit(1);
}

globalThis.Content = require('../src/content.js');
require('../content/catalog.js');
require(path.join(__dirname, '..', Content.path(id)));
const s = Content.sections[id];
const meta = Content.sectionMeta(id);
const LETTERS = 'ABCDEFGH';

let md = `# ${meta.volume.name} ${meta.section.no} ${s.title}：盲解题单\n\n`;
md += '## 知识点卡片\n\n';
for (const c of s.intro) {
  md += `### ${c.title}\n${c.body}\n`;
  if (c.example) md += `例：${c.example}\n`;
  if (c.pitfall) md += `易错：${c.pitfall}\n`;
  md += '\n';
}
md += '## 题目\n\n';
// 题目 ID 既可以写全（19.1-c01），也可以只写后缀（c01）
const picked = s.questions.filter(q => !only.length || only.some(x => q.id === x || q.id.endsWith('-' + x)));
if (only.length) {
  const missed = only.filter(x => !s.questions.some(q => q.id === x || q.id.endsWith('-' + x)));
  if (missed.length) {
    console.error(`这些题目 ID 在 ${id} 里找不到：${missed.join('、')}`);
    process.exit(1);
  }
}
for (const q of picked) {
  md += `### ${q.id}（标注难度：${q.level}，题型：${q.type}）\n${q.stem}\n`;
  if (q.figure) md += `[配图 SVG] ${q.figure}\n`;
  if (q.options) q.options.forEach((o, i) => (md += `${LETTERS[i]}. ${o}\n`));
  if (q.blanks) {
    q.blanks.forEach((b, i) => {
      md += `第 ${i + 1} 空：${b.label || ''} ____ ${b.suffix || ''}${b.options ? `（从 ${b.options.join(' ')} 中选）` : ''}\n`;
    });
  }
  md += '\n';
}
fs.writeFileSync(out, md);
console.log(`已导出 ${out}`);
