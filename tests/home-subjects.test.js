'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');

const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('首页保留原有教材、试卷和趣味玩法布局', () => {
  const home = app.slice(app.indexOf('function home()'), app.indexOf('// ---------- 册 ----------'));
  assert(home.includes('mountSemesterSwitcher(header, semester && semester.id, username)'));
  assert(home.includes('volumes.forEach(v => appendVolumeCard(main, v))'));
  assert(home.includes('main.appendChild(exam)'));
  assert(home.includes('FUN_GAMES.map(g =>'));
  assert(!home.includes('HOME_SUBJECTS'));
  assert(!home.includes('appendHomeOutlines'));
  assert(!home.includes('subject-grid'));
  assert(!app.includes("if (parts[0] === 'subject')"));
});

test('首页额外只有英语学习大纲与试题库两个入口', () => {
  const home = app.slice(app.indexOf('function home()'), app.indexOf('// ---------- 册 ----------'));
  assert(home.includes("title: '英语学习大纲'"));
  assert(home.includes("href: 'content/english/shanghai-junior-outline.html'"));
  assert(home.includes("title: '英语试题库'"));
  assert(home.includes("href: '#/english-bank'"));
  assert(fs.existsSync(path.join(root, 'content/english/shanghai-junior-outline.html')));
  assert(app.includes("if (parts[0] === 'english-bank') return englishBankPage(parts[1]);"));
});

test('英语试题库脚本按依赖顺序加载', () => {
  const ordered = ['content/english/knowledge.js', 'src/english-bank.js', 'src/app.js'];
  let previous = -1;
  for (const file of ordered) {
    const index = html.indexOf(file);
    assert(index > previous, `${file} 缺失或加载顺序错误`);
    previous = index;
  }
});

test('英语大纲适配手机目录和宽表格', () => {
  const outline = fs.readFileSync(path.join(root, 'content/english/shanghai-junior-outline.html'), 'utf8');
  assert(outline.includes('name="viewport" content="width=device-width, initial-scale=1.0"'));
  assert(outline.includes('<details class="toc-panel" open>'));
  assert(outline.includes("if (matchMedia('(max-width: 640px)').matches) tocPanel.open = false"));
  assert(outline.includes('.table-scroll{max-width:100%;overflow-x:auto;'));
  assert(outline.includes("document.querySelectorAll('table.tbl')"));
  assert(outline.includes('grid-template-columns:246px minmax(0,1fr)'));
});
