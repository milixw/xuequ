'use strict';

// 导入脚本的 Python 回归（tests/*.test.py）：逐个用 python3 跑 unittest
// 没装 Python 3 或缺第三方模块时只提醒、不算失败，免得只改页面的人被卡住

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { test, warn } = require('./harness');

const ROOT = path.join(__dirname, '..');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.py')).sort();

// Windows 上常见的是 python，python3 可能是应用商店的占位程序
function findPython() {
  for (const cmd of ['python3', 'python']) {
    const r = spawnSync(cmd, ['--version'], { encoding: 'utf8' });
    if (r.status === 0 && /Python 3/.test(r.stdout + r.stderr)) return cmd;
  }
  return null;
}

const python = findPython();
if (!python) {
  warn(`没找到 Python 3，跳过 ${files.length} 个 Python 回归（tests/*.test.py）`);
} else {
  for (const file of files) {
    test(`Python 回归 ${file}`, () => {
      const r = spawnSync(python, [path.join('tests', file)], {
        cwd: ROOT, encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' },
      });
      if (r.status === 0) return;
      const output = (r.stdout || '') + (r.stderr || '');
      const m = output.match(/ModuleNotFoundError: No module named '([^'.]+)/);
      if (m) {
        warn(`跳过 ${file}：缺 Python 模块 ${m[1]}（装依赖见 tests/AGENTS.md）`);
        return;
      }
      throw new Error(output.trim().split('\n').slice(-15).join('\n    '));
    });
  }
}
