'use strict';

// 英语单词：词表格式、分盒升降与到期、每日队列、一轮练习流程、英语判分、存储异常
const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
// exam.test.js 把全局 Date 换成了假对象；加载 words.js 时临时换回真的 Date，words.js 会自己留一份
const vm = require('vm');
const fakeDate = global.Date;
const RealDate = vm.runInNewContext('Date');
global.Date = RealDate;
const Words = require('../src/words.js');
global.Date = fakeDate;
const Answer = require('../src/answer.js');

const root = path.join(__dirname, '..');
const D = '2026-10-08';

function word(w, extra = {}) {
  return { w, ipa: '', pos: 'n.', zh: w + '的意思', ex: [{ en: `I like the [[${w}]].`, zh: '例句' }], core: true, exam: true, ...extra };
}

function fixture(units) {
  Words.reset();
  Words.volume({ id: 'english/sh2022/t1', review: { status: 'pending' }, units });
}

function memStore(init) {
  const saved = {};
  if (init) saved[Words.STORE_KEY] = init;
  return {
    saved,
    read: (k, f) => (k in saved ? JSON.parse(JSON.stringify(saved[k])) : f),
    write: (k, v) => { saved[k] = JSON.parse(JSON.stringify(v)); return true; },
  };
}

function many(prefix, n) {
  return Array.from({ length: n }, (_, i) => word(`${prefix}${String.fromCharCode(97 + (i % 26))}${Math.floor(i / 26)}`));
}

// ---------- 词表格式 ----------

test('单词：validate 检查挖空、例句条数、重复词头和 exam 标记', () => {
  const ok = { units: [{ no: 1, words: [
    word('reuse', { pos: 'v.', forms: ['reused'], ex: [{ en: 'We [[reuse]] water.', zh: '我们重复用水。' }, { en: 'We [[reused]] it.', zh: '我们重复用了它。' }] }),
    word('as soon as', { pos: 'conj.', ex: [{ en: 'Call me [[as soon as]] you arrive.', zh: '你一到就给我打电话。' }] }),
  ] }] };
  assert(Words.validate(ok).length === 0, Words.validate(ok).join('；'));
  const bad = { units: [{ no: 1, words: [
    word('leak', { ex: [{ en: 'The tap leaks.', zh: '漏水' }] }),
    word('leak'),
    word('record', { ex: [{ en: 'A [[records]] book.', zh: '记录' }] }),
    word('rain', { ex: [] }),
    word('tap', { exam: undefined }),
    word('club', { forms: ['clubs'] }),
    word('lab', { forms: ['labs'], ex: [{ en: 'A [[lab]].', zh: '一' }, { en: 'The [[lab]].', zh: '二' }] }),
  ] }] };
  const problems = Words.validate(bad).join('\n');
  assert(/恰好一处/.test(problems) && /本册重复/.test(problems) && /不是词头或 forms/.test(problems) &&
    /至少要 1 条/.test(problems) && /exam/.test(problems) && /club 有变形的词要 2 条/.test(problems) &&
    /lab 例句要分别考原形和变形/.test(problems), problems);
});

test('单词：已发布词表文件都通过格式校验并在目录登记', () => {
  const dir = path.join(root, 'content/english/words');
  if (!fs.existsSync(dir)) return;
  const catalog = fs.readFileSync(path.join(root, 'content/catalog.js'), 'utf8');
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.js'))) {
    Words.reset();
    global.Words = Words;
    require(path.join(dir, f));
    delete require.cache[require.resolve(path.join(dir, f))];
    const defs = Object.values(Words.volumes);
    assert(defs.length === 1, `${f} 应只注册一册`);
    const problems = Words.validate(defs[0]);
    assert(!problems.length, `${f}：${problems.slice(0, 5).join('；')}`);
    assert(defs[0].review && ['pending', 'approved'].includes(defs[0].review.status), `${f} 缺审核状态`);
    assert(catalog.includes(`words: 'content/english/words/${f}'`), `${f} 没有在 catalog.js 对应册的 words 字段登记`);
  }
});

// ---------- 分盒 ----------

test('单词：新词第一次计分 L3 答对进第 2 盒、1 天后见；答错留第 1 盒、明天再见', () => {
  const w = word('rain');
  const ok = Words.grade(w, null, true, D);
  assert(ok.box === 2 && ok.due === '2026-10-09', JSON.stringify(ok));
  const bad = Words.grade(w, null, false, D);
  assert(bad.box === 1 && bad.due === '2026-10-09' && bad.wrong === 1, JSON.stringify(bad));
});

test('单词：答对逐盒升到掌握，间隔 1/3/7/15/30 天', () => {
  const w = word('rain');
  let st = { box: 2, seen: 1, wrong: 0 };
  const want = [[3, 3], [4, 7], [5, 15], ['M', 30], ['M', 30]];
  for (const [box, days] of want) {
    st = Words.grade(w, st, true, D);
    assert(st.box === box && st.due === Words.addDays(D, days), `${JSON.stringify(st)} 应为 ${box} 盒 +${days} 天`);
  }
});

test('单词：答错时第 1、2 盒回第 1 盒，第 3 盒及以上（含掌握）降两盒，都明天再见', () => {
  const w = word('rain');
  const cases = [[1, 1], [2, 1], [3, 1], [4, 2], [5, 3], ['M', 4]];
  for (const [from, to] of cases) {
    const st = Words.grade(w, { box: from, seen: 3, wrong: 0 }, false, D);
    assert(st.box === to && st.due === '2026-10-09', `${from} 盒答错应到 ${to} 盒，实际 ${st.box}`);
  }
});

test('单词：core: false 走第 1、2 盒后进认读态（15 天、之后 30 天），永不出 L3/L4，答错回第 1 盒', () => {
  const w = word('kettle', { core: false });
  let st = Words.grade(w, null, true, D);
  assert(st.box === 2, '认读词第一次答对进第 2 盒');
  st = Words.grade(w, st, true, D);
  assert(st.box === 'R' && st.due === Words.addDays(D, 15), JSON.stringify(st));
  st = Words.grade(w, st, true, D);
  assert(st.box === 'R' && st.due === Words.addDays(D, 30), JSON.stringify(st));
  assert(Words.mastered(st), '认读态计入已掌握');
  assert(Words.grade(w, st, false, D).box === 1, '认读态答错回第 1 盒');
  for (const box of [1, 2, 'R']) {
    for (let seen = 0; seen < 4; seen++) {
      const m = Words.modeFor(w, { box, seen });
      assert(m.mode === 'L1' || m.mode === 'L2', `认读词 ${box} 盒出了 ${m.mode}`);
    }
  }
});

test('单词：各盒练法——第 1 盒 L1 热身 + L3，第 2 盒拼写，3/4 盒 L3、L4 交替，第 5 盒 L4，掌握抽查 L3', () => {
  const w = word('rain');
  const m1 = Words.modeFor(w, null);
  assert(m1.warmup === 'L1' && m1.mode === 'L3');
  assert(Words.modeFor(w, { box: 2, seen: 1 }).mode === 'L3');
  const b3 = [0, 1].map(seen => Words.modeFor(w, { box: 3, seen }).mode).sort().join();
  const b4 = [0, 1].map(seen => Words.modeFor(w, { box: 4, seen }).mode).sort().join();
  assert(b3 === 'L3,L4' && b4 === 'L3,L4', `${b3} / ${b4}`);
  assert(Words.modeFor(w, { box: 5, seen: 2 }).mode === 'L4');
  assert(Words.modeFor(w, { box: 'M', seen: 2 }).mode === 'L3');
});

test('单词：“我认识”答对只进第 2 盒，答错留第 1 盒', () => {
  const w = word('rain');
  assert(Words.gradeKnown(w, true, D).box === 2 && Words.gradeKnown(w, true, D).due === '2026-10-09');
  assert(Words.gradeKnown(w, false, D).box === 1);
});

test('单词：L4 例句按作答次数轮换，原形和变形都能考到', () => {
  const w = word('reuse', { forms: ['reused'], ex: [
    { en: 'We [[reuse]] water.', zh: '一' }, { en: 'They [[reused]] bottles.', zh: '二' }] });
  const got = [0, 1, 2, 3].map(seen => Words.cloze(w, { seen }).answer);
  assert(got.join() === 'reuse,reused,reuse,reused', got.join());
  const c = Words.cloze(w, { seen: 1 });
  assert(c.before === 'They ' && c.after === ' bottles.' && c.plain === 'They reused bottles.');
});

// ---------- 每日队列 ----------

test('单词：到期复习按逾期从多到少、最多 40 个，超过 30 个时新词减半，当天已学新词从额度扣除', () => {
  fixture([{ no: 1, title: 'A', words: many('a', 60) }, { no: 2, title: 'B', words: many('b', 20) }]);
  const data = { words: {}, days: {}, settings: {} };
  const unit1 = Words.entries('english/sh2022/t1/1');
  unit1.slice(0, 45).forEach((e, i) => { data.words[e.key] = { box: 3, seen: 2, wrong: 0, due: Words.addDays(D, -(i % 9)) }; });
  data.words[unit1[50].key] = { box: 3, seen: 2, wrong: 0, due: Words.addDays(D, 1) };
  const p = Words.plan(data, D, { volumeId: 'english/sh2022/t1' });
  assert(p.dueTotal === 45 && p.due.length === 40, `${p.dueTotal} / ${p.due.length}`);
  const dues = p.due.map(e => data.words[e.key].due);
  assert(dues.every((d, i) => i === 0 || dues[i - 1] <= d), '应按到期日从早到晚');
  assert(p.fresh.length === 5, `到期 45 个时新词减半为 5，实际 ${p.fresh.length}`);
  assert(p.fresh.every(e => e.unit === 'english/sh2022/t1/1'), '新词先取第一个还有未学词的单元');

  const light = { words: {}, days: { [D]: { reviewed: 0, learned: 4, wrong: 0, ms: 0 } }, settings: { newPerDay: 15 } };
  assert(Words.plan(light, D, { volumeId: 'english/sh2022/t1' }).fresh.length === 11, '当天已学 4 个，15 个额度还剩 11');
  assert(Words.plan(light, D, { volumeId: 'english/sh2022/t1', extra: true }).fresh.length === 15, '“再来一组”不扣当天额度');
  light.settings.unit = 'english/sh2022/t1/2';
  assert(Words.plan(light, D, { volumeId: 'english/sh2022/t1' }).fresh.every(e => e.unit === 'english/sh2022/t1/2'), '设置的单元优先');
  light.settings.newPerDay = 7;
  assert(Words.newPerDay(light) === 10, '非法设置退回默认 10');
});

test('单词：同一个词头跨册共用进度，单元统计只算一次', () => {
  Words.reset();
  Words.volume({ id: 'english/sh2022/t1', units: [{ no: 1, title: 'A', words: [word('Record'), word('rain')] }] });
  Words.volume({ id: 'english/sh2022/t2', units: [{ no: 1, title: 'B', words: [word('record'), word('snow')] }] });
  assert(Words.entries().length === 3, '同词头只留一条');
  const data = { words: { record: { box: 'M', due: '2027-01-01', seen: 6, wrong: 0 } }, days: {}, settings: {} };
  assert(Words.unitSummary(data, 'english/sh2022/t1/1').mastered === 1);
  assert(Words.newWords(data, 'english/sh2022/t2').map(e => e.key).join() === 'snow', '后一册里学过的词不再算新词');
});

// ---------- 一轮练习 ----------

function answerAll(s, decide) {
  const log = [];
  let guard = 0;
  while (s.next() && guard++ < 200) {
    const t = s.next();
    log.push(`${t.key}:${t.mode}${t.scored ? '*' : ''}`);
    if (t.mode === 'card') s.card(decide(t) === 'known');
    else s.answer(decide(t) !== false);
  }
  return log;
}

test('单词：新词流程——卡片 → L1 热身 → 本轮末尾计分 L3；答对进第 2 盒并记入当天新学', () => {
  fixture([{ no: 1, title: 'A', words: [word('rain'), word('snow')] }]);
  const data = { words: {}, days: {}, settings: {} };
  const p = Words.plan(data, D, { volumeId: 'english/sh2022/t1' });
  const log = answerAll(Words.session(data, D, p), () => true);
  assert(log.join(' ') === 'rain:card snow:card snow:L1 rain:L3* snow:L3*' ||
    log.join(' ') === 'rain:card rain:L1 snow:card snow:L1 rain:L3* snow:L3*', log.join(' '));
  assert(data.words.rain.box === 2 && data.words.snow.box === 2);
  assert(data.days[D].learned === 2 && data.days[D].reviewed === 0);
});

test('单词：剩余步数只减不增（全对时），新词卡片按 3 步、认读词按 2 步算', () => {
  fixture([{ no: 1, title: 'A', words: [word('rain'), word('snow'), word('kettle', { core: false })] }]);
  const data = { words: {}, days: {}, settings: {} };
  const s = Words.session(data, D, Words.plan(data, D, { volumeId: 'english/sh2022/t1' }));
  let last = s.remaining();
  assert(last === 8, `开始应为 3+3+2=8 步，实际 ${last}`);
  while (s.next()) {
    if (s.next().mode === 'card') s.card(false); else s.answer(true);
    assert(s.remaining() === last - 1, `剩余步数应逐步减 1：${last} → ${s.remaining()}`);
    last = s.remaining();
  }
});

test('单词：L3 答错的词本轮末尾再练一次但不再计分，进度停在第 1 盒', () => {
  fixture([{ no: 1, title: 'A', words: [word('rain')] }]);
  const data = { words: {}, days: {}, settings: {} };
  const s = Words.session(data, D, Words.plan(data, D, { volumeId: 'english/sh2022/t1' }));
  let l3 = 0;
  const log = answerAll(s, t => (t.mode === 'L3' ? (l3++ === 0 ? false : true) : true));
  assert(log.join(' ') === 'rain:card rain:L1 rain:L3* rain:L3', log.join(' '));
  assert(data.words.rain.box === 1 && data.words.rain.due === '2026-10-09');
  assert(s.results.scored === 1 && s.results.correct === 0 && data.days[D].wrong === 1);
});

test('单词：“我认识”跳过 L1 直接计分拼写，认读词改出 L2', () => {
  fixture([{ no: 1, title: 'A', words: [word('rain'), word('kettle', { core: false })] }]);
  const data = { words: {}, days: {}, settings: {} };
  const log = answerAll(Words.session(data, D, Words.plan(data, D, { volumeId: 'english/sh2022/t1' })), t => (t.mode === 'card' ? 'known' : true));
  assert(log.includes('rain:L3*') && log.includes('kettle:L2*') && !log.some(x => /L1/.test(x)), log.join(' '));
  assert(data.words.rain.box === 2 && data.words.kettle.box === 2);
});

test('单词：认读新词只做一次计分 L1，不出拼写', () => {
  fixture([{ no: 1, title: 'A', words: [word('kettle', { core: false })] }]);
  const data = { words: {}, days: {}, settings: {} };
  const log = answerAll(Words.session(data, D, Words.plan(data, D, { volumeId: 'english/sh2022/t1' })), () => true);
  assert(log.join(' ') === 'kettle:card kettle:L1*', log.join(' '));
});

test('单词：“只练本单元”不改动任何进度', () => {
  fixture([{ no: 1, title: 'A', words: [word('rain'), word('snow')] }]);
  const data = { words: { rain: { box: 3, due: '2026-12-01', seen: 4, wrong: 0 }, snow: { box: 2, due: '2026-12-01', seen: 1, wrong: 0 } }, days: {}, settings: {} };
  const before = JSON.stringify(data);
  const list = { due: Words.entries('english/sh2022/t1/1'), fresh: [] };
  answerAll(Words.session(data, D, list, { practice: true }), () => false);
  assert(JSON.stringify(data) === before, '练习模式不应写入进度');
});

test('单词：模拟连续 7 天，每天队列不超上限，全对时没有词卡在第 1 盒', () => {
  fixture([{ no: 1, title: 'A', words: many('c', 70) }]);
  const data = { words: {}, days: {}, settings: {} };
  for (let day = 0; day < 7; day++) {
    const date = Words.addDays(D, day);
    const p = Words.plan(data, date, { volumeId: 'english/sh2022/t1' });
    assert(p.due.length <= 40 && p.fresh.length <= 10, `第 ${day + 1} 天 ${p.due.length}/${p.fresh.length}`);
    answerAll(Words.session(data, date, p), () => true);
  }
  const states = Object.values(data.words);
  assert(states.length === 70, `7 天每天 10 个新词，学了 ${states.length}`);
  assert(states.every(st => st.box !== 1), '全对时不应有词留在第 1 盒');
});

// ---------- 干扰项 ----------

test('单词：选择题 4 个选项不重复、含正确答案；L2 优先拼写相近的词', () => {
  fixture([{ no: 1, title: 'A', words: [word('rain'), word('train'), word('brain'), word('elephant'), word('rainy'), word('dog')] }]);
  const e = Words.entries().find(x => x.key === 'rain');
  for (const mode of ['L1', 'L2']) {
    const c = Words.choices(e, mode, () => 0.3);
    assert(c.options.length === 4 && new Set(c.options).size === 4, c.options.join());
    assert(c.options[c.answer] === (mode === 'L1' ? e.word.zh : 'rain'));
  }
  const l2 = Words.choices(e, 'L2', () => 0.3).options;
  assert(!l2.includes('elephant'), `拼写相近的词应优先：${l2.join()}`);
});

// ---------- 判分 ----------

test('英语判分 kind en：不分大小写、空格合一、弯撇号、忽略句末标点；连字符和空格不互换', () => {
  const ok = (answer, input) => Answer.checkBlank({ kind: 'en', answer }, input).ok;
  assert(ok('reuse', ' Reuse '));
  assert(ok('as soon as', 'as  soon   as'));
  assert(ok("don't", 'don’t'));
  assert(ok('He left as soon as it stopped raining.', 'he left as soon as it stopped raining'));
  assert(ok(['We should reuse it.', 'We ought to reuse it.'], 'We ought to reuse it!'));
  assert(!ok('well-known', 'well known'));
  assert(!ok('reuse', 'resue'));
  assert(Answer.firstDiff('resue', 'reuse') === 2);
  assert(Answer.firstDiff('Reuse.', 'reuse') === -1);
  assert(Answer.answerText({ kind: 'en', answer: ['a', 'b'] }) === 'a');
});

// ---------- 存储 ----------

test('单词：存储损坏或写入失败时不崩溃，90 天前的每日记录被清理', () => {
  const broken = memStore({ words: 'x', days: null, settings: 3 });
  const data = Words.load(broken);
  assert(typeof data.words === 'object' && typeof data.days === 'object' && typeof data.settings === 'object');
  const store = memStore();
  const d = { words: {}, days: { '2026-01-01': { reviewed: 1 }, [D]: { reviewed: 2 } }, settings: {} };
  Words.save(store, d, D);
  assert(!store.saved[Words.STORE_KEY].days['2026-01-01'] && store.saved[Words.STORE_KEY].days[D]);
  const failing = { read: (k, f) => f, write: () => false };
  assert(Words.save(failing, Words.load(failing), D) === false);
});

test('单词：日期按本地日期计算，跨月跨年正确', () => {
  assert(Words.addDays('2026-12-30', 3) === '2027-01-02');
  assert(Words.addDays('2027-02-28', 1) === '2027-03-01');
  assert(Words.daysBetween('2026-10-08', '2026-11-07') === 30);
  assert(Words.today(new RealDate(2026, 0, 5, 23, 59)) === '2026-01-05');
});

// ---------- 接入 ----------

test('单词：页面接入——脚本顺序、路由、首页入口、册页面单词行', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  const order = ['src/answer.js', 'src/learning-store.js', 'src/speech.js', 'src/words.js', 'src/words-ui.js', 'src/app.js'].map(f => html.indexOf(f));
  assert(order.every((x, i) => x >= 0 && (i === 0 || order[i - 1] < x)), '脚本加载顺序不对');
  assert(app.includes("if (parts[0] === 'words') return wordsPage(parts.slice(1));"));
  assert(app.includes('WordsUI.chapterRow(id, chapter.no)'));
  const ui = fs.readFileSync(path.join(root, 'src/words-ui.js'), 'utf8');
  assert(ui.includes('LearningStore.scope() === scope'), '切换账号后旧页面不能写入');
  assert(!/fetch\(/.test(ui), '不能用 fetch 加载本地文件');
});
