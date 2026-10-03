'use strict';

// 做题进度，存在 localStorage 的 xq.progress.v2 里：
// { [小节ID]: { [题目ID]: { tries, solved, revealed } } }
// solved：答对过；revealed：看过解析
// 英语进度、累计答错次数按账号保存；数学练习进度保持原共享键。

(function (root) {
  const KEY = 'xq.progress.v2';
  const store = typeof module !== 'undefined'
    ? require('./learning-store.js').create(() => localStorage) : root.LearningStore;
  const ERRORS_KEY = 'xq.errors.v2';
  let scope;
  let englishData;
  let errors;
  let data = load();

  function syncScope() {
    if (scope === store.scope()) return;
    scope = store.scope();
    englishData = store.read('xq.english-progress.v1', {}, scope);
    errors = loadErrors();
  }

  function loadErrors() {
    let saved = { counts: {}, events: {} };
    try {
      const stored = store.read(ERRORS_KEY, null, scope);
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
      const reports = store.read('xq.english-plan-prints.v2', null, scope);
      if (Array.isArray(reports)) for (const report of reports) importReport(report, report.day);
    } catch {}
    try {
      const plan = store.read('xq.english-plan.v2', null, scope);
      for (const [day, result] of Object.entries(plan && plan.results || {})) importReport(result, day);
    } catch {}
    if (changed) {
      store.write(ERRORS_KEY, saved, scope);
    }
    return saved;
  }

  function saveErrors() {
    store.write(ERRORS_KEY, errors, scope);
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  }

  function save(sectionId) {
    if (sectionId === 'english-bank') { store.write('xq.english-progress.v1', englishData, scope); return; }
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {}
  }

  function entry(sectionId, qid) {
    syncScope();
    const target = sectionId === 'english-bank' ? englishData : data;
    const s = (target[sectionId] = target[sectionId] || {});
    return (s[qid] = s[qid] || { tries: 0, solved: false, revealed: false });
  }

  const Progress = {
    get(sectionId, qid) {
      syncScope();
      return ((sectionId === 'english-bank' ? englishData : data)[sectionId] || {})[qid] || null;
    },

    record(sectionId, qid, correct, eventId) {
      syncScope();
      if (eventId && errors.events[eventId]) return Progress.get(sectionId, qid);
      const e = entry(sectionId, qid);
      e.tries++;
      if (correct) e.solved = true;
      else {
        const counts = errors.counts[sectionId] = errors.counts[sectionId] || {};
        counts[qid] = (counts[qid] || 0) + 1;
      }
      if (eventId) errors.events[eventId] = true;
      save(sectionId);
      saveErrors();
      return e;
    },

    errorCount(sectionId, qid) {
      syncScope();
      return (errors.counts[sectionId] || {})[qid] || 0;
    },

    errorStats(sectionId) {
      syncScope();
      return Object.entries(errors.counts[sectionId] || {})
        .map(([id, wrongCount]) => ({ id, wrongCount }))
        .sort((a, b) => b.wrongCount - a.wrongCount || a.id.localeCompare(b.id));
    },

    reveal(sectionId, qid) {
      entry(sectionId, qid).revealed = true;
      save(sectionId);
    },

    // 删除练习进度，累计错误次数独立保留，不影响同组其它题。
    clear(sectionId, qid) {
      syncScope();
      const target = sectionId === 'english-bank' ? englishData : data;
      const section = target[sectionId];
      if (!section || !Object.prototype.hasOwnProperty.call(section, qid)) return false;
      delete section[qid];
      if (!Object.keys(section).length) delete target[sectionId];
      save(sectionId);
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
      syncScope();
      return Object.values((sectionId === 'english-bank' ? englishData : data)[sectionId] || {}).filter(e => e.solved).length;
    },
  };

  root.Progress = Progress;
})(this);
