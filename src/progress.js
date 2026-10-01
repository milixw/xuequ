'use strict';

// 做题进度，存在 localStorage 的 xq.progress.v2 里：
// { [小节ID]: { [题目ID]: { tries, solved, revealed } } }
// solved：答对过；revealed：看过解析
// 累计答错次数独立存在 xq.errors.v1，重置练习不删除统计。

(function (root) {
  const KEY = 'xq.progress.v2';
  const ERRORS_KEY = 'xq.errors.v1';
  let data = load();
  const errors = loadErrors();

  function loadErrors() {
    let saved = { counts: {}, events: {} };
    try {
      const stored = JSON.parse(localStorage.getItem(ERRORS_KEY));
      if (stored && stored.counts && stored.events) saved = stored;
    } catch {}
    let changed = false;
    function importReport(report, day) {
      if (!report || !Array.isArray(report.wrong)) return;
      const id = report.id || `${day}-${report.submittedAt || 'legacy'}`;
      for (const wrong of report.wrong) {
        if (!wrong || !wrong.id) continue;
        const eventId = `english-plan:${id}:${wrong.id}`;
        if (saved.events[eventId]) continue;
        const counts = saved.counts['english-bank'] = saved.counts['english-bank'] || {};
        counts[wrong.id] = (counts[wrong.id] || 0) + 1;
        saved.events[eventId] = true;
        changed = true;
      }
    }
    try {
      const reports = JSON.parse(localStorage.getItem('xq.english-plan-prints.v1'));
      if (Array.isArray(reports)) for (const report of reports) importReport(report, report.day);
    } catch {}
    try {
      const plan = JSON.parse(localStorage.getItem('xq.english-plan.v1'));
      for (const [day, result] of Object.entries(plan && plan.results || {})) importReport(result, day);
    } catch {}
    if (changed) {
      try { localStorage.setItem(ERRORS_KEY, JSON.stringify(saved)); } catch {}
    }
    return saved;
  }

  function saveErrors() {
    try { localStorage.setItem(ERRORS_KEY, JSON.stringify(errors)); } catch {}
  }

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

    record(sectionId, qid, correct, eventId) {
      if (eventId && errors.events[eventId]) return Progress.get(sectionId, qid);
      const e = entry(sectionId, qid);
      e.tries++;
      if (correct) e.solved = true;
      else {
        const counts = errors.counts[sectionId] = errors.counts[sectionId] || {};
        counts[qid] = (counts[qid] || 0) + 1;
      }
      if (eventId) errors.events[eventId] = true;
      save();
      saveErrors();
      return e;
    },

    errorCount(sectionId, qid) {
      return (errors.counts[sectionId] || {})[qid] || 0;
    },

    errorStats(sectionId) {
      return Object.entries(errors.counts[sectionId] || {})
        .map(([id, wrongCount]) => ({ id, wrongCount }))
        .sort((a, b) => b.wrongCount - a.wrongCount || a.id.localeCompare(b.id));
    },

    reveal(sectionId, qid) {
      entry(sectionId, qid).revealed = true;
      save();
    },

    // 删除练习进度，累计错误次数独立保留，不影响同组其它题。
    clear(sectionId, qid) {
      const section = data[sectionId];
      if (!section || !Object.prototype.hasOwnProperty.call(section, qid)) return false;
      delete section[qid];
      if (!Object.keys(section).length) delete data[sectionId];
      save();
      return true;
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
