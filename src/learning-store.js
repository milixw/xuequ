'use strict';

// 学习数据归属。旧共享键保留备份，不自动分配给任意登录账号。
(function (root) {
  const LEGACY = {
    'xq.english-plan.v2': 'xq.english-plan.v1',
    'xq.english-plan-prints.v2': 'xq.english-plan-prints.v1',
    'xq.english-plan-retry.v2': 'xq.english-plan-retry.v1',
    'xq.errors.v2': 'xq.errors.v1',
  };
  function create(storage) {
    const getStorage = typeof storage === 'function' ? storage : () => storage;
    function current() {
      try {
        const name = JSON.parse(getStorage().getItem('xq.account.v1'))?.name;
        return typeof name === 'string' && name ? name : null;
      } catch { return null; }
    }
    function scope() { const name = current(); return name ? `user:${encodeURIComponent(name)}` : 'guest'; }
    function key(base, owner = scope()) { return `${base}.${owner}`; }
    function readRaw(key, fallback) {
      try { const value = getStorage().getItem(key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; }
    }
    function writeRaw(key, value) {
      try { getStorage().setItem(key, JSON.stringify(value)); return true; } catch { return false; }
    }
    function migrateLegacy() {
      let ok = true;
      for (const [base, old] of Object.entries(LEGACY)) {
        try {
          if (getStorage().getItem(key(base, 'legacy')) === null) {
            const value = readRaw(old, null);
            if (value !== null && !writeRaw(key(base, 'legacy'), value)) ok = false;
          }
        } catch { ok = false; }
      }
      try {
        const target = key('xq.english-progress.v1', 'legacy');
        if (getStorage().getItem(target) === null) {
          const progress = readRaw('xq.progress.v2', {}) || {};
          if (progress['english-bank'] && !writeRaw(target, { 'english-bank': progress['english-bank'] })) ok = false;
        }
      } catch { ok = false; }
      return ok;
    }
    migrateLegacy();
    function read(base, fallback, owner) {
      const saved = readRaw(key(base, owner), fallback);
      if (Array.isArray(fallback)) return Array.isArray(saved) ? saved : fallback;
      if (fallback && typeof fallback === 'object') {
        if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return fallback;
        const value = { ...saved };
        for (const [field, empty] of Object.entries(fallback)) {
          if (!value[field] || typeof value[field] !== typeof empty) value[field] = empty;
        }
        return value;
      }
      return saved;
    }
    function write(base, value, owner) { return writeRaw(key(base, owner), value); }
    function hasLegacy() {
      return Object.values(LEGACY).some(old => readRaw(old, null) !== null) ||
        !!(readRaw('xq.progress.v2', {}) || {})['english-bank'];
    }
    function importLegacy(name = current()) {
      if (!name) return { ok: false, error: '请先登录要接收记录的账号。' };
      if (!migrateLegacy()) return { ok: false, error: '旧数据备份未完成，未进行迁移，请检查存储空间后重试。' };
      const owner = `user:${encodeURIComponent(name)}`;
      const reports = read('xq.english-plan-prints.v2', [], owner);
      const incoming = read('xq.english-plan-prints.v2', [], 'legacy');
      const oldPlan = read('xq.english-plan.v2', { drafts: {}, results: {} }, 'legacy');
      // 早期版本只有最近结果，没有打印快照，也必须留下独立时间入口。
      for (const [day, result] of Object.entries(oldPlan.results)) {
        const id = `${day}-${result.submittedAt || 'legacy'}`;
        if (!incoming.some(report => report.id === id)) incoming.push({
          id, day: Number(day), submittedAt: result.submittedAt || null,
          attempted: result.attempted, correct: result.correct, unanswered: result.unanswered,
          ungradable: result.ungradable, wrong: Array.isArray(result.wrong) ? result.wrong : [],
        });
      }
      const ids = {};
      for (const original of incoming) {
        const report = JSON.parse(JSON.stringify(original));
        let id = report.id;
        let suffix = 0;
        while (reports.some(saved => saved.id === id && JSON.stringify({ ...saved, id: report.id }) !== JSON.stringify(report))) {
          id = `${report.id}-legacy-${++suffix}`;
        }
        ids[report.id] = id;
        if (!reports.some(saved => saved.id === id)) reports.push({ ...report, id });
      }
      const plan = read('xq.english-plan.v2', { drafts: {}, results: {} }, owner);
      // 最新结果也已在记录列表中保留；不覆盖当前账号正在作答的草稿。
      for (const [day, draft] of Object.entries(oldPlan.drafts || {})) if (!plan.drafts[day]) plan.drafts[day] = draft;
      for (const [day, result] of Object.entries(oldPlan.results || {})) {
        const id = `${day}-${result.submittedAt || 'legacy'}`;
        if ((!ids[id] || ids[id] === id) && !plan.results[day]) plan.results[day] = result;
      }
      const retry = read('xq.english-plan-retry.v2', { drafts: {}, submissions: {} }, owner);
      const oldRetry = read('xq.english-plan-retry.v2', { drafts: {}, submissions: {} }, 'legacy');
      for (const [id, draft] of Object.entries(oldRetry.drafts || {})) if (!retry.drafts[ids[id] || id]) retry.drafts[ids[id] || id] = draft;
      for (const [id, item] of Object.entries(oldRetry.submissions || {})) {
        const mapped = ids[id] || id;
        if (!retry.submissions[mapped]) retry.submissions[mapped] = { ...item, sourceId: ids[item.sourceId] || item.sourceId };
      }
      const errors = read('xq.errors.v2', { counts: {}, events: {} }, owner);
      const oldErrors = read('xq.errors.v2', { counts: {}, events: {} }, 'legacy');
      function importEvents(report, day) {
        const id = report.id || `${day}-${report.submittedAt || 'legacy'}`;
        for (const wrong of report.wrong || []) {
          const event = `english-plan:${id}:${wrong.id}`;
          if (oldErrors.events[event]) continue;
          const counts = oldErrors.counts['english-bank'] = oldErrors.counts['english-bank'] || {};
          counts[wrong.id] = (counts[wrong.id] || 0) + 1;
          oldErrors.events[event] = true;
        }
      }
      for (const report of incoming) importEvents(report, report.day);
      for (const [day, result] of Object.entries(oldPlan.results || {})) importEvents(result, day);
      for (const [group, counts] of Object.entries(oldErrors.counts || {})) {
        errors.counts[group] = errors.counts[group] || {};
        for (const [id, count] of Object.entries(counts)) errors.counts[group][id] = Math.max(errors.counts[group][id] || 0, count);
      }
      for (const event of Object.keys(oldErrors.events || {})) {
        const mapped = event.replace(/^english-plan:([^:]+):/, (_, id) => `english-plan:${ids[id] || id}:`);
        errors.events[mapped] = true;
      }
      const progress = read('xq.english-progress.v1', {}, owner);
      const oldProgress = read('xq.english-progress.v1', {}, 'legacy');
      progress['english-bank'] = progress['english-bank'] || {};
      for (const [id, item] of Object.entries(oldProgress['english-bank'] || {})) {
        const own = progress['english-bank'][id] || {};
        progress['english-bank'][id] = { tries: Math.max(own.tries || 0, item.tries || 0),
          solved: !!(own.solved || item.solved), revealed: !!(own.revealed || item.revealed) };
      }
      const updates = { 'xq.english-plan-prints.v2': reports, 'xq.english-plan.v2': plan,
        'xq.english-plan-retry.v2': retry, 'xq.errors.v2': errors, 'xq.english-progress.v1': progress };
      for (const [base, value] of Object.entries(updates)) if (!write(base, value, owner)) {
        return { ok: false, error: '导入未全部完成，存储可能已满；旧数据仍保留，请重试。' };
      }
      return { ok: true };
    }
    // 用户已指定旧数据归属；整个迁移成功后才标记，失败可安全重试。
    const migrationKey = 'xq.learning-migration.v1';
    if (hasLegacy() && !readRaw(migrationKey, null)) {
      const migrated = importLegacy('我是臭恩铭');
      if (migrated.ok) writeRaw(migrationKey, { owner: '我是臭恩铭', version: 2 });
    }
    return { current, scope, key, read, write, hasLegacy, importLegacy,
      migrationPending: () => hasLegacy() && !readRaw(migrationKey, null) };
  }
  if (typeof module !== 'undefined') module.exports = { create };
  else root.LearningStore = create(() => root.localStorage);
})(typeof globalThis !== 'undefined' ? globalThis : this);
