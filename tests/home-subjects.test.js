'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');

const root = path.join(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

// 目录（含学科入口和游戏）：Content 是模块单例，别的测试可能已经加载过 catalog.js
const Content = require('../src/content.js');
if (!Content.catalog) {
  globalThis.Content = Content;
  require('../content/catalog.js');
}
const homeSrc = app.slice(app.indexOf('  function home()'), app.indexOf('  // ---------- 学科页 ----------'));
const subjectSrc = app.slice(app.indexOf('  function subjectPage('), app.indexOf('  // ---------- 全部趣味玩法 ----------'));

test('首页只有今天、学科卡片、趣味玩法三区，入口都从 catalog.js 生成', () => {
  const order = ["homeSection(main, '今天')", "homeSection(main, '学科'", 'appendGames(main, semester && semester.id)'].map(x => homeSrc.indexOf(x));
  assert(order.every((n, i) => n >= 0 && (i === 0 || n > order[i - 1])), '首页分区顺序应为 今天 → 学科 → 趣味玩法');
  assert(homeSrc.includes('lastVisit()') && homeSrc.includes('WordsUI.todaySummary()') && homeSrc.includes('MockExam.inProgress()'), '今天块缺少接着学、今日单词或进行中的模拟考试');
  assert(homeSrc.includes('Content.subjects()') && homeSrc.includes('#/subject/${subject.id}'), '学科卡片应从目录生成并进学科页');
  for (const old of ['NOTE_GROUPS', 'FUN_GAMES', 'home-tile', 'home-chips', "href: '#/shanghai-papers/", "href: '#/english-exams'"]) {
    assert(!app.includes(old), `app.js 不应再写死首页入口：${old}`);
  }
  assert(app.includes("if (parts[0] === 'subject') return subjectPage(parts[1]);") && app.includes("if (parts[0] === 'games') return gamesPage();"));
  assert(!/\.home-(tile|chips|grid)\b/.test(read('src/app.css')), '旧首页样式应删掉');
});

test('学科页按 练习 → 资料 → 考试 分组，中考类在九年级以前收进中考专区', () => {
  assert(app.includes("const GROUPS = [['practice', '练习'], ['notes', '资料'], ['exam', '考试']];"));
  assert(subjectSrc.includes('Content.resources(id, semester && semester.id)'));
  assert(subjectSrc.includes("zk.className = 'zhongkao'") && subjectSrc.includes('resources.filter(r => r.folded)'));
  assert(subjectSrc.includes("more.className = 'other-volumes'"), '学科页应能看到其他册');
  assert(subjectSrc.includes("r.special === 'exam'") && subjectSrc.includes('AccountUI.ensureLoggedIn('), '小节测试没登录时要先登录');
  // 学科下一层页面的返回键回学科页
  assert(app.includes("page(v.volume.name, `#/subject/${v.subject.id}`"));
  assert(app.includes("page('英语单词', '#/subject/english'"));
  assert(app.includes("id ? '#/english-bank' : '#/subject/english'"));
  assert(app.includes("page('英语中考真题', '#/subject/english'"));
});

test('接着学：小节页和做题页记录上次打开的小节，按账号存', () => {
  assert(app.includes("const LAST_VISIT = 'xq.lastVisit.v1';"));
  assert(app.includes('LearningStore.write(LAST_VISIT,') && app.includes('LearningStore.read(LAST_VISIT,'), '应经 LearningStore 按账号读写');
  const section = app.slice(app.indexOf('  async function sectionPage('), app.indexOf('  // ---------- 做题 ----------'));
  const question = app.slice(app.indexOf('  async function questionPage('), app.indexOf('  // ---------- 真题卷 ----------'));
  assert(section.includes('recordVisit(id);') && question.includes('recordVisit(sectionId);'));
});

test('catalog.js 的学科入口和游戏字段齐全、链接有效', () => {
  const routes = new Set([...app.matchAll(/parts\[0\] === '([a-z-]+)'/g)].map(m => m[1]));
  const checkHref = (href, where) => {
    if (href.startsWith('#/')) assert(routes.has(href.slice(2).split('/')[0]), `${where} 的 ${href} 不是已有路由`);
    else assert(fs.existsSync(path.join(root, href.split('?')[0])), `${where} 的 ${href} 文件不存在`);
  };
  const subjects = Content.subjects();
  assert(subjects.map(s => s.id).join() === 'math,english,chinese,physics,chemistry');
  for (const s of subjects) {
    assert(/^#[0-9a-f]{6}$/.test(s.color), `${s.id} 缺学科色`);
    assert(Array.isArray(s.editions) && Array.isArray(s.resources) && s.resources.length, `${s.id} 缺 editions 或 resources`);
    for (const r of s.resources) {
      const where = `${s.id}/${r.title}`;
      assert(['practice', 'notes', 'exam'].includes(r.group), `${where} 的 group 不对`);
      assert(r.icon && r.title && r.desc && r.href, `${where} 缺 icon/title/desc/href`);
      assert(r.special === undefined || ['exam', 'mock', 'textbook'].includes(r.special), `${where} 的 special 不认识`);
      assert(r.stage === undefined || r.stage === 'zhongkao', `${where} 的 stage 不认识`);
      assert(r.from === undefined || Content.semesterRank(r.from) !== null, `${where} 的 from 不是学期 ID`);
      checkHref(r.href, where);
    }
  }
  const ids = new Set();
  for (const g of Content.catalog.games) {
    assert(!ids.has(g.id), `游戏 ${g.id} 重复`); ids.add(g.id);
    assert(g.name && g.tag && g.when && g.icon && /^#[0-9a-f]{6}$/.test(g.color) && Content.subject(g.subject), `游戏 ${g.id} 字段不全`);
    assert(g.from === undefined || Content.semesterRank(g.from) !== null, `游戏 ${g.id} 的 from 不是学期 ID`);
    checkHref(g.href, '游戏 ' + g.id);
  }
});

test('按年级显示：六年级收起中考类入口和以后的游戏，九年级全部展开', () => {
  assert(Content.semesterRank('g6s1') === 12 && Content.semesterRank('g6s2') === 13 && Content.semesterRank('bridge') === null);
  assert(Content.grade('g9s1') === 9);
  const g6 = Content.resources('chinese', 'g6s1');
  assert(g6.filter(r => r.folded).map(r => r.title).join() === '语文考纲,古诗文阅读应考手册,现代文阅读应考手册,中考真题');
  assert(g6.some(r => r.title === '文言实词虚词' && !r.folded), '实词虚词各年级都用得上，不收起');
  assert(Content.resources('chinese', 'g9s1').every(r => !r.folded), '九年级不收起');
  const games6 = Content.games('g6s1');
  assert(!games6.shown.some(g => g.id === 'fermat' || g.id === 'function-track') && games6.shown.some(g => g.id === 'nim'), '六上不显示七下、八下的游戏，不限年级的照常显示');
  assert(Content.games('g7s2').shown.some(g => g.id === 'fermat'));
  assert(Content.games(null).shown.length === Content.games(null).all.length, '认不出学期时全部显示');
});

test('试卷改名小节测试，路由和存储键不变', () => {
  const exam = read('src/exam.js');
  assert(exam.includes("renderHeader(main, '小节测试', '#/'") && !exam.includes('返回试卷列表'));
  assert(read('content/catalog.js').includes("title: '小节测试'") && read('content/catalog.js').includes("href: '#/exam', special: 'exam'"));
  assert(exam.includes("'xq.exam.v1'") || exam.includes('xq.exam.v1'));
});

test('英语学科页有学习大纲、单词、试题库、七天计划入口，中考词汇表从单词页链出', () => {
  const english = Content.subject('english').resources;
  const href = t => (english.find(r => r.title === t) || {}).href;
  assert(href('英语单词') === '#/words' && href('英语试题库') === '#/english-bank' && href('七天复习计划') === '#/english-plan');
  assert(href('英语学习大纲') === 'content/english/shanghai-junior-outline.html');
  const wordsUi = fs.readFileSync(path.join(root, 'src', 'words-ui.js'), 'utf8');
  assert(wordsUi.includes("'content/english/shanghai-exam-vocabulary.html'"), '中考词汇表要从单词页链出去');
  assert(wordsUi.includes('async function todaySummary()'), '首页今日单词要用 WordsUI.todaySummary');
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
