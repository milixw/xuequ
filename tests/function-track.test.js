'use strict';

// 函数轨道关卡校验：参考解必须能过关，初始值不能直接过关，并穷举列出所有可行解
const { test, warn, assert } = require('./harness');
const { TYPES, LEVELS, simulate } = require('../src/games/function-track/game.js');

LEVELS.forEach((lv, i) => {
  test(`函数轨道 第 ${i + 1} 关「${lv.title}」`, () => {
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
    assert(sol.ok, `参考解不通过：${sol.msg}`);
    assert(!simulate(lv, lv.init).ok, '初始值直接就能过关');
    assert(lv.locked.every(key => lv.solution[key] === lv.init[key]), '参考解改动了固定参数');
    if (wins.length > 1) {
      warn(`函数轨道 第 ${i + 1} 关有 ${wins.length} 个解：${wins.map(w => TYPES[lv.type].format(w)).join('，')}`);
    }
  });
});
