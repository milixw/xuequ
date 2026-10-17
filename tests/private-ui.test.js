'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { test, assert } = require('./harness');

const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

test('私有课本资料不进开源仓库：private/ 被忽略，git 里没有它的文件', () => {
  assert(/^private\/$/m.test(read('.gitignore')), '.gitignore 应忽略 private/');
  let tracked = '';
  try {
    tracked = execFileSync('git', ['ls-files', '--', 'private'], { cwd: root, encoding: 'utf8' });
  } catch {
    return; // 不在 git 仓库里（比如解压的部署包）就跳过
  }
  assert(tracked.trim() === '', 'private/ 下的文件不能提交到开源仓库：\n' + tracked);
  // 公开打包不带 private/
  assert(!/cp -R[^\n]*\bprivate\b/.test(read('scripts/build.sh')), 'build.sh 不能打包 private/');
});

test('私有课本资料：开源代码里不写口令', () => {
  let files = [];
  try {
    files = execFileSync('git', ['ls-files', '--', 'src', 'scripts', 'docs', 'index.html'], { cwd: root, encoding: 'utf8' })
      .split('\n').filter(f => /\.(js|md|html|sh)$/.test(f));
  } catch {
    return;
  }
  for (const f of files) {
    const s = read(f);
    for (const m of s.matchAll(/PRIVATE_PASS=([^\s`'"]+)/g)) {
      assert(m[1] === '这里写口令', `${f} 里出现了疑似真实口令：PRIVATE_PASS=${m[1]}`);
    }
  }
});

// 线上站点的域名、发布仓库名等不能进开源仓库；词表在私有仓库里（private/public-blocklist.txt），没有 private/ 时跳过
test('私有课本资料：开源仓库里不出现线上站点信息', () => {
  const list = path.join(root, 'private', 'public-blocklist.txt');
  if (!fs.existsSync(list)) return;
  let hits = '';
  try {
    hits = execFileSync('git', ['grep', '-n', '-i', '-F', '-f', list, '--', '.'], { cwd: root, encoding: 'utf8' });
  } catch (e) {
    if (e.status === 1) return; // 没有匹配
    throw e;
  }
  assert(false, `开源仓库里出现了线上站点信息（词表见 private/public-blocklist.txt，说明见 private/DEPLOY.md）：\n      ${hits.trim().split('\n').slice(0, 10).join('\n      ')}`);
});

test('私有课本资料：页面接线（入口、路由、换页停止、小节链接）', () => {
  const html = read('index.html');
  assert(html.indexOf('src/private-ui.js') > 0 && html.indexOf('src/private-ui.js') < html.indexOf('src/app.js'), 'private-ui.js 应在 app.js 之前加载');
  const app = read('src/app.js');
  assert(app.includes("PrivateUI.homeLinks(noteLists['英语'], books,"), '首页复习资料英语组缺少总入口（本学期课本区的本册直达也靠它）');
  const homeLinks = read('src/private-ui.js').slice(read('src/private-ui.js').indexOf('function homeLinks('), read('src/private-ui.js').indexOf('// ---------- 英语小节页'));
  assert(homeLinks.includes("if (s === 'none') return;"), '没有私有资料时首页不应出现入口');
  assert(homeLinks.includes('openUnlock('), '未解锁时点总入口要先输口令');
  assert(homeLinks.includes("s === 'unlocked' && booksBox.isConnected && volumeOf(volId)"), '本册直达只在已解锁且本册有资料时出现');
  assert(app.includes("if (parts[0] === 'textbook') return PrivateUI.textbookPage("), '缺少 #/textbook 路由');
  assert(app.includes('PrivateUI.stop();'), '换页时应停止录音');
  assert(app.includes('PrivateUI.sectionLink(main, meta)'), '英语小节页缺少录音链接');
  const ui = read('src/private-ui.js');
  assert(!/fetch\(\s*BASE/.test(ui), '私有文件用 <script> 加载，不用 fetch（file:// 也要能用）');
  assert(read('docs/storage-and-routes.md').includes('#/textbook'), '新路由要登记到 docs/storage-and-routes.md');
});

test('私有课本资料：manifest 和单元文件的注册', () => {
  const saved = globalThis.Private;
  try {
    delete require.cache[require.resolve('../src/private-ui.js')];
    const PrivateUI = require('../src/private-ui.js');
    assert(PrivateUI.unitMeta('g6s1', 1) === null, '没有 manifest 时查不到单元');
    globalThis.Private.manifest({ english: { g6s1: { title: '六年级上册', units: [{ no: 1, title: 'School life', file: 'english/g6s1/U1.js' }] } } });
    assert(PrivateUI.unitMeta('g6s1', 1).title === 'School life');
    assert(PrivateUI.unitMeta('g6s1', '1').file === 'english/g6s1/U1.js', '单元号字符串和数字都能查');
    assert(PrivateUI.unitMeta('g6s1', 2) === null);
    assert(PrivateUI.unitMeta('g8s1', 1) === null);
    assert(PrivateUI.pageRange([[12, 25]]) === '第 12～25 页');
    assert(PrivateUI.pageRange([[-8, 11], [96, 153]]) === '封面～第 11 页、第 96～153 页', '附录含封面时的页码说明');
  } finally {
    globalThis.Private = saved;
  }
});

test('私有课本资料：分享链接限定范围时只显示能看的册', () => {
  const saved = globalThis.Private;
  try {
    delete require.cache[require.resolve('../src/private-ui.js')];
    const PrivateUI = require('../src/private-ui.js');
    const vol = () => ({ title: 'x', units: [{ no: 1, title: 'U', file: 'f.js' }] });
    const load = () => globalThis.Private.manifest({ english: { g6s1: vol(), g7s1: vol(), 'rj-g4s1': vol() } });
    load();
    PrivateUI.pruneManifest(['english:g6s1', 'english:rj-g4s1']);
    assert(PrivateUI.unitMeta('g6s1', 1) && PrivateUI.unitMeta('rj-g4s1', 1), '范围内的册应保留');
    assert(PrivateUI.unitMeta('g7s1', 1) === null, '范围外的册应去掉');
    load();
    PrivateUI.pruneManifest(null);
    assert(PrivateUI.unitMeta('g7s1', 1), 'scope 为 null 是全部资料');
    globalThis.Private.manifest({ english: { g6s1: vol() }, exams: { 'g6s1-mid': { title: '期中', papers: [] }, 'g7s1-mid': { title: '期中', papers: [] } } });
    PrivateUI.pruneManifest(['exams:g6s1-mid']);
    assert(Object.keys(PrivateUI.examSets()).join() === 'g6s1-mid', '模拟考试卷集也按范围过滤');
    assert(PrivateUI.unitMeta('g6s1', 1) === null, '只给卷集时课本的册都去掉');
    const ui = read('src/private-ui.js');
    assert(/loadScript\(BASE \+ 'manifest\.js'\)\s*\.then\(applyScope\)/.test(ui), '加载 manifest 后要按范围过滤');
    assert(ui.includes("if (location.protocol !== 'https:' || !manifest) return;"), '本机打开不查范围');
  } finally {
    globalThis.Private = saved;
  }
});

test('模拟考试：页面接线（首页小格、路由、换页停计时、登记路由和存储键）', () => {
  const html = read('index.html');
  const at = f => html.indexOf(f);
  assert(at('src/private-ui.js') < at('src/mock-exam.js') && at('src/mock-exam.js') < at('src/app.js'), 'mock-exam.js 应在 private-ui.js 之后、app.js 之前加载');
  const app = read('src/app.js');
  assert(app.includes('MockExam.homeTile(grid,'), '首页练习区缺少模拟考试小格');
  assert(app.includes("if (parts[0] === 'mock') return MockExam.mockPage("), '缺少 #/mock 路由');
  assert(app.includes('MockExam.stop();'), '换页时应停止计时');
  const mock = read('src/mock-exam.js');
  assert(mock.includes("if (s === 'none' || !grid.isConnected) return;"), '没有私有资料时首页不应出现模拟考试');
  assert(mock.includes("if (s === 'unlocked' && !Object.keys(PrivateUI.examSets()).length) return;"), '已解锁但没有卷集权限时不出现');
  assert(!/fetch\(/.test(mock), '私有文件用 <script>/<img> 加载，不用 fetch');
  const doc = read('docs/storage-and-routes.md');
  assert(doc.includes('#/mock') && doc.includes('`xq.mockExam.v1`'), '#/mock 路由和 xq.mockExam.v1 要登记到 docs/storage-and-routes.md');
  const homeLinks = read('src/private-ui.js');
  assert(homeLinks.includes("(s === 'locked' || volumeIds().length)"), '只给了模拟考试的链接时不显示课本资料入口');
});

test('模拟考试：计时、交卷和分数', () => {
  const M = require('../src/mock-exam.js');
  const t0 = 1_760_000_000_000;
  const rec = { startedAt: t0, history: [{ at: 1, usedSec: 60, score: 80 }] };
  assert(M.remainingSec(rec, 90, t0) === 5400);
  assert(M.remainingSec(rec, 90, t0 + 5399_500) === 1, '不足一秒按一秒算');
  assert(M.remainingSec(rec, 90, t0 + 5400_000) === 0);
  const done = M.submit(rec, 90, t0 + 1234_000);
  assert(done.startedAt === null, '交卷后清掉计时');
  assert(done.history.length === 2 && done.history[0].score === 80, '以前的分数保留');
  assert(done.history[1].usedSec === 1234 && done.history[1].at === t0 + 1234_000);
  assert(M.submit(rec, 90, t0 + 9999_000).history[1].usedSec === 5400, '超时交卷用时按限时记');
  const many = { startedAt: t0, history: Array.from({ length: 10 }, (_, i) => ({ at: i, usedSec: 1 })) };
  assert(M.submit(many, 90, t0).history.length === 10, '历史最多留 10 条');
  assert(M.parseScore('86', 100) === 86 && M.parseScore(' 92.5 ', 100) === 92.5 && M.parseScore('0', 100) === 0);
  for (const bad of ['', '101', '-1', '8.3', 'abc', '1e2']) assert(M.parseScore(bad, 100) === null, '不该接受：' + bad);
  assert(M.parseScore('102', 102) === 102, '满分另有书写分时上限可以更高');
  assert(M.clock(5400) === '90:00' && M.clock(65) === '1:05' && M.clock(-3) === '0:00');
  assert(M.duration(5400) === '90 分钟' && M.duration(1234) === '20 分 34 秒' && M.duration(42) === '42 秒');
});

test('模拟考试：本机记录读写容错', () => {
  const M = require('../src/mock-exam.js');
  const saved = globalThis.localStorage;
  const store = {};
  globalThis.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } };
  try {
    assert(M.getRecord('s/p').startedAt === null && M.getRecord('s/p').history.length === 0, '没有记录时是空的');
    M.putRecord('s/p', { startedAt: 5, history: [{ at: 1, usedSec: 2 }] });
    assert(M.getRecord('s/p').startedAt === 5 && M.getRecord('s/p').history.length === 1);
    store[M.KEY] = '{坏掉的';
    assert(M.getRecord('s/p').history.length === 0, 'JSON 坏了当作没做过');
    store[M.KEY] = JSON.stringify({ 's/p': { history: [null, { at: 'x' }, { at: 3, usedSec: 1 }] } });
    assert(M.getRecord('s/p').history.length === 1, '格式不对的历史条目跳过');
    globalThis.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
    assert(M.getRecord('s/p').history.length === 0, '读不了时不报错');
    M.putRecord('s/p', { startedAt: null, history: [] });
  } finally {
    globalThis.localStorage = saved;
  }
});
