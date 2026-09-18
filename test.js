// 关卡校验：参考解必须能过关，初始值不能直接过关，并穷举列出所有可行解
// 运行：node test.js
const { TYPES, LEVELS, simulate } = require('./game.js');

let failed = 0;

LEVELS.forEach((lv, i) => {
  const specs = TYPES[lv.type].params;
  const keys = Object.keys(specs);
  const wins = [];

  const search = (k, p) => {
    if (k === keys.length) {
      if (simulate(lv, p).ok) wins.push(p);
      return;
    }
    const key = keys[k];
    const s = specs[key];
    if (lv.locked.includes(key)) return search(k + 1, { ...p, [key]: lv.init[key] });
    for (let v = s.min; v <= s.max + 1e-9; v += s.step) search(k + 1, { ...p, [key]: v });
  };
  search(0, {});

  const sol = simulate(lv, lv.solution);
  const init = simulate(lv, lv.init);
  const lockedOk = lv.locked.every(key => lv.solution[key] === lv.init[key]);
  const problems = [];
  if (!sol.ok) problems.push(`参考解不通过：${sol.msg}`);
  if (init.ok) problems.push('初始值直接就能过关');
  if (!lockedOk) problems.push('参考解改动了固定参数');
  if (problems.length) failed++;

  console.log(`第 ${i + 1} 关「${lv.title}」${problems.length ? '✗ ' + problems.join('；') : '✓'}`);
  console.log(`  可行解 ${wins.length} 个：${wins.map(w => TYPES[lv.type].format(w)).join('，')}`);
});

process.exit(failed ? 1 : 0);
