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

test('首页英语学习大纲、单词和试题库三个入口依次显示', () => {
  const home = app.slice(app.indexOf('function home()'), app.indexOf('// ---------- 册 ----------'));
  const outlineIndex = home.indexOf("title: '英语学习大纲'");
  const vocabIndex = home.indexOf("title: '英语单词'");
  const bankIndex = home.indexOf("title: '英语试题库'");
  assert(outlineIndex >= 0 && vocabIndex > outlineIndex && bankIndex > vocabIndex);
  assert(home.includes("href: 'content/english/shanghai-junior-outline.html'"));
  assert(home.includes("href: 'content/english/shanghai-exam-vocabulary.html'"));
  assert(home.includes("href: '#/english-bank'"));
  assert(fs.existsSync(path.join(root, 'content/english/shanghai-junior-outline.html')));
  const vocab = fs.readFileSync(path.join(root, 'content/english/shanghai-exam-vocabulary.html'), 'utf8');
  assert(vocab.includes('name="viewport" content="width=device-width, initial-scale=1"'));
  assert(vocab.includes('<script id="data" type="application/json">'));
  assert(vocab.includes("localStorage.setItem('xq.vocab.ipa.v1'"));
  assert(vocab.includes("localStorage.setItem('xq.vocab.src.v1'"));
  assert(app.includes("if (parts[0] === 'english-bank') return englishBankPage(parts[1]);"));
});

test('英语单词页每条都有朗读按钮，词表写法能整理成可读文本', () => {
  const vocab = fs.readFileSync(path.join(root, 'content/english/shanghai-exam-vocabulary.html'), 'utf8');
  assert(vocab.includes('<button class="say" type="button" data-say="'));
  assert(vocab.includes('speechSynthesis'));
  assert(vocab.includes('https://dict.youdao.com/dictvoice?audio='));
  const speakTextSource = vocab.match(/  function speakText\(en\)\{[\s\S]*?\r?\n  \}/);
  assert(speakTextSource, '找不到 speakText');
  const speakText = new Function(speakTextSource[0] + '\nreturn speakText;')();
  const cases = {
    'Math(s)': 'Maths',
    'although / though': 'although, though',
    'at breakfast / lunch /supper': 'at breakfast, lunch, supper',
    'a lot of (lots of)': 'a lot of, lots of',
    'go to (the) hospital': 'go to the hospital',
    'add … to': 'add to',
    'provide...with': 'provide with',
    'apologize to sb. for sth.': 'apologize to somebody for something',
    'change one’s mind': "change one's mind",
    'so that (': 'so that',
    'A.M.': 'A.M.',
  };
  for (const [en, want] of Object.entries(cases)) {
    assert(speakText(en) === want, `${en} → ${speakText(en)}，应为 ${want}`);
  }
  const data = JSON.parse(vocab.slice(vocab.indexOf('>', vocab.indexOf('<script id="data"')) + 1, vocab.indexOf('</script>', vocab.indexOf('<script id="data"'))));
  for (const it of data.words.concat(data.phrases)) {
    const t = speakText(it.en);
    assert(/^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F' ,.-]*$/.test(t), `${it.en} 整理后是 “${t}”`);
  }
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

test('英语单词页离线展示首批原创例句，未覆盖单词明确标注待补充', () => {
  const vocab = fs.readFileSync(path.join(root, 'content/english/shanghai-exam-vocabulary.html'), 'utf8');
  const match = vocab.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/);
  assert(match, '找不到原词表数据');
  const data = JSON.parse(match[1]);
  const examples = require('../content/english/vocabulary-examples.js');
  assert(examples.review.status === 'pending', 'AI 原创例句必须待审核');
  const keys = Object.keys(examples.entries);
  assert(keys.length >= 50, '首批应覆盖至少 50 个常用单词');
  const words = new Set(data.words.map(word => word.en.toLowerCase()));
  for (const key of keys) {
    assert(words.has(key), `例句词条 ${key} 不在原词表中`);
    const pair = examples.entries[key];
    assert(Array.isArray(pair) && pair.length === 2 && pair[0].trim() && pair[1].trim(), `${key} 缺少双语例句`);
    assert(pair[0].toLowerCase().includes(key), `${key} 的英文例句未使用目标词`);
  }
  assert(vocab.includes('<script src="vocabulary-examples.js"></script>'), '离线例句脚本未加载');
  assert(vocab.includes('var pair = EXAMPLES[it.en.toLowerCase()]'), '单词行未按词条查找例句');
  assert(vocab.includes('例句待补充'), '未覆盖词条缺少明确提示');
  assert(vocab.includes("esc(pair[0])") && vocab.includes("esc(pair[1])"), '例句须安全显示');
});
