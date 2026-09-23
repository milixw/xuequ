'use strict';

// 极简测试工具：test() 登记用例，run() 依次执行并汇总

const cases = [];
const warnings = [];

function test(name, fn) {
  cases.push({ name, fn });
}

function warn(msg) {
  warnings.push(msg);
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || '断言失败');
}

assert.throws = function (fn, msg) {
  let threw = false;
  try { fn(); } catch { threw = true; }
  if (!threw) throw new Error(msg || '断言失败：期望抛错但没抛');
};

function run() {
  let failed = 0;
  for (const { name, fn } of cases) {
    try {
      fn();
    } catch (e) {
      failed++;
      console.log(`✗ ${name}\n    ${e.message}`);
    }
  }
  for (const w of warnings) console.log(`⚠ ${w}`);
  console.log(`\n${cases.length - failed} 通过，${failed} 失败，${warnings.length} 条提醒`);
  return failed;
}

module.exports = { test, warn, assert, run };
