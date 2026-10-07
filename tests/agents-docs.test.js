'use strict';

// AI 约定文档的护栏：各家 AI 工具靠 AGENTS.md（Claude Code 靠同目录的 CLAUDE.md 导入）了解规则。
// 这里检查文档不膨胀、不失效：大小上限、CLAUDE.md 导入、引用的路径存在、学科目录有约定文件、存储键已登记。
const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');

const ROOT = path.join(__dirname, '..');
const LIMIT_ROOT = 16 * 1024;   // 根 AGENTS.md：每个 AI 会话都会整份读入
const LIMIT_DIR = 14 * 1024;    // 目录级 AGENTS.md：在该目录干活时读入
const SKIP_DIRS = new Set(['.git', 'node_modules', 'refs', 'pic', 'dist', 'vendor', '.idea']);
// 不要求有 docs/question-types/<学科>/ 台账的学科及原因
const NO_LEDGER = { english: '英语八上单元由英语教师审核，不建题型台账' };

const rel = p => path.relative(ROOT, p).split(path.sep).join('/');
const read = p => fs.readFileSync(p, 'utf8');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const agents = files.filter(f => path.basename(f) === 'AGENTS.md');
const claudes = files.filter(f => path.basename(f) === 'CLAUDE.md');

test('约定文档：AGENTS.md 大小不超过上限', () => {
  for (const f of agents) {
    const size = fs.statSync(f).size, limit = rel(f) === 'AGENTS.md' ? LIMIT_ROOT : LIMIT_DIR;
    assert(size <= limit, `${rel(f)} 有 ${size} 字节，超过上限 ${limit}：把只和某个目录或专题有关的内容拆到目录级 AGENTS.md 或 docs/`);
  }
});

test('约定文档：每个 AGENTS.md 旁边都有导入它的 CLAUDE.md，反之亦然', () => {
  for (const f of agents) {
    const c = path.join(path.dirname(f), 'CLAUDE.md');
    assert(fs.existsSync(c), `${rel(f)} 旁边缺 CLAUDE.md（Claude Code 只读 CLAUDE.md，照抄 content/CLAUDE.md）`);
    assert(/^@AGENTS\.md\s*$/m.test(read(c)), `${rel(c)} 要用单独一行 @AGENTS.md 导入同目录的 AGENTS.md`);
  }
  for (const c of claudes) {
    assert(fs.existsSync(path.join(path.dirname(c), 'AGENTS.md')), `${rel(c)} 旁边没有 AGENTS.md：约定正文要写在 AGENTS.md 里`);
  }
});

// 文档里出现的仓库路径必须存在：反引号里的路径按仓库根目录算，Markdown 链接按文档所在目录算
const PATH_RE = /^(?:\.\/)?(?:src|content|tests|docs|scripts|\.github|\.claude|\.gemini)\/[^\s`]*$|^(?:AGENTS|CLAUDE|README|CONTRIBUTING)\.md$|^index\.html$/;
const PLACEHOLDER = /[<>*…]|\.\.\.|\{|\$/;
test('约定文档：文档里引用的路径都存在', () => {
  const docs = [...agents, ...claudes,
    ...files.filter(f => /^docs\/(question-types\.md|sop-section\.md|storage-and-routes\.md|templates\/)/.test(rel(f)))];
  const missing = [];
  for (const f of docs) {
    const text = read(f);
    const cands = [];
    for (const m of text.matchAll(/`([^`\n]+)`/g)) cands.push([m[1], ROOT]);
    for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) cands.push([m[1], path.dirname(f)]);
    for (let [p, base] of cands) {
      p = p.replace(/#.*$/, '').replace(/[，。；、）)]+$/, '');
      if (!p || /^[a-z]+:/.test(p) || PLACEHOLDER.test(p)) continue;
      if (base === ROOT && !PATH_RE.test(p)) continue;
      if (base !== ROOT && p.startsWith('../../issues')) continue;
      if (!fs.existsSync(path.join(base, p))) missing.push(`${rel(f)} → ${p}`);
    }
  }
  assert(!missing.length, `这些路径不存在（改名或删除后要同步改文档；占位写成 <册ID> 这样）：\n      ${missing.join('\n      ')}`);
});

test('约定文档：有上线内容的学科都有自己的约定和台账', () => {
  globalThis.Content = require('../src/content.js');
  require('../content/catalog.js');
  const subjects = new Set(), ledgers = new Set();
  for (const meta of Content.sectionMetas()) {
    if (!meta.section.ready) continue;
    const [subject, textbook, vol] = meta.volumeId.split('/');
    subjects.add(subject);
    if (!NO_LEDGER[subject]) ledgers.add(`docs/question-types/${subject}/${textbook === 'sh2024' ? vol : `${textbook}-${vol}`}.md`);
  }
  for (const s of subjects) {
    assert(fs.existsSync(path.join(ROOT, 'content', s, 'AGENTS.md')), `学科 ${s} 已有上线内容，缺 content/${s}/AGENTS.md（模板见 docs/templates/subject-AGENTS.md）`);
  }
  for (const l of ledgers) assert(fs.existsSync(path.join(ROOT, l)), `缺题型台账 ${l}（不建台账的学科要登记在 tests/agents-docs.test.js 的 NO_LEDGER 里并写明原因）`);
});

test('约定文档：代码里用到的本地存储键都登记在 docs/storage-and-routes.md', () => {
  const doc = read(path.join(ROOT, 'docs/storage-and-routes.md'));
  const used = new Set();
  for (const f of files.filter(f => /^(src\/.*\.js|content\/[^/]+\/[^/]+\.html|index\.html)$/.test(rel(f)))) {
    for (const m of read(f).matchAll(/['"`](xq\.[a-z0-9-]+\.v\d+)/g)) used.add(m[1]);
  }
  const missing = [...used].filter(k => !doc.includes('`' + k));
  assert(!missing.length, `这些存储键没有登记在 docs/storage-and-routes.md：${missing.join('、')}`);
});
