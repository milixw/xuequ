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

test('私有课本资料：页面接线（入口、路由、换页停止、小节链接）', () => {
  const html = read('index.html');
  assert(html.indexOf('src/private-ui.js') > 0 && html.indexOf('src/private-ui.js') < html.indexOf('src/app.js'), 'private-ui.js 应在 app.js 之前加载');
  const app = read('src/app.js');
  assert(app.includes('PrivateUI.homeTile(notesGrid)'), '首页复习资料区缺少入口');
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
  } finally {
    globalThis.Private = saved;
  }
});
