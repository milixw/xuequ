'use strict';

// 做题进度，存在 localStorage 的 xq.progress.v1 里：
// { [小节ID]: { [题目ID]: { tries, solved, revealed } } }
// solved：答对过；revealed：看过解析

(function (root) {
  const KEY = 'xq.progress.v1';
  let data = load();

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {}
  }

  function entry(sectionId, qid) {
    const s = (data[sectionId] = data[sectionId] || {});
    return (s[qid] = s[qid] || { tries: 0, solved: false, revealed: false });
  }

  const Progress = {
    get(sectionId, qid) {
      return (data[sectionId] || {})[qid] || null;
    },

    record(sectionId, qid, correct) {
      const e = entry(sectionId, qid);
      e.tries++;
      if (correct) e.solved = true;
      save();
      return e;
    },

    reveal(sectionId, qid) {
      entry(sectionId, qid).revealed = true;
      save();
    },

    // 题目状态：solved 答对 / revealed 看过解析未答对 / tried 答错过 / new 未做
    status(sectionId, qid) {
      const e = Progress.get(sectionId, qid);
      if (!e) return 'new';
      if (e.solved) return 'solved';
      if (e.revealed) return 'revealed';
      return e.tries ? 'tried' : 'new';
    },

    solvedCount(sectionId) {
      return Object.values(data[sectionId] || {}).filter(e => e.solved).length;
    },
  };

  root.Progress = Progress;
})(this);
