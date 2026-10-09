'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test, assert } = require('./harness');
test('语文实词资料完整保留内容并隐藏 PDF 入口及页码信息', () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'content/chinese/classical-words.html'), 'utf8');
  const entries = Array.from(html.matchAll(/<article class="sheet" id="word-(\d+)"><pre>([\s\S]*?)<\/pre><\/article>/g));
  assert(entries.length === 180, '必须展示 180 张词条卡片');
  entries.forEach((entry, i) => {
    assert(Number(entry[1]) === i + 1, '卡片编号必须连续');
    assert(entry[2].startsWith(`${i + 1}．`), '原文编号必须与卡片编号一致');
  });
  assert(html.includes('180') && html.includes('虚词资料待补充'));
  assert(html.includes('得到') && !html.includes('\uFFFD'), '文字提取不应产生替代字符');
  assert(html.includes('document.createTextNode(part)') && html.includes('mark.textContent=term'));
  assert(!html.includes('fetch('));
  assert(!html.includes('href="classical-words.pdf"'));
  assert(!/第\s*\d+\s*(?:\/\s*\d+\s*)?页/.test(html));
  assert(!html.includes('来源：') && !html.includes('页相关内容'));
  const pdf = fs.readFileSync(path.join(root, 'content/chinese/classical-words.pdf'));
  assert(pdf.subarray(0, 5).toString() === '%PDF-');
  new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
});
