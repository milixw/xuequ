'use strict';

// 英语单词：词表注册、分盒间隔复习、每日队列和一轮练习的纯逻辑（不依赖 DOM，测试直接加载）。
// 设计见 docs/superpowers/specs/2026-10-08-english-unit-structure.md
//   盒 1～5，'M' 掌握（只给 core 词），'R' 认读（只给 core: false 的词）
//   练法 L1 看英文选中文、L2 看中文/听音选英文、L3 拼写、L4 例句填正确形式

(function (root) {
  const volumes = {};
  const NativeDate = Date;  // 加载时取一份，避免别处替换全局 Date 影响日期计算
  const STORE_KEY = 'xq.words.v1';
  const DAYS_KEPT = 90;
  const DUE_CAP = 40;
  const HALVE_NEW_ABOVE = 30;
  const NEW_PER_DAY = [5, 10, 15];
  const DEFAULT_NEW = 10;
  // 答对后进入这一盒，隔几天再见
  const INTERVAL = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 15, M: 30 };
  const R_FIRST = 15;
  const R_NEXT = 30;

  // ---------- 词表 ----------
  // 词头是进度的键：小写、空格合一，弯撇号转直撇号；同一个词在不同册共用进度
  function key(w) {
    return String(w).trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ');
  }

  function volume(def) {
    volumes[def.id] = def;
  }

  function unitId(volumeId, no) {
    return `${volumeId}/${no}`;
  }

  // 已加载的词条，按册、单元的顺序；同一个词头只留最先出现的一条
  function entries(filter) {
    const list = [];
    const seen = new Set();
    for (const v of Object.values(volumes)) {
      for (const unit of v.units) {
        const uid = unitId(v.id, unit.no);
        if (filter && filter !== v.id && filter !== uid) continue;
        for (const word of unit.words) {
          const k = key(word.w);
          if (seen.has(k)) continue;
          seen.add(k);
          list.push({ key: k, word, unit: uid, volumeId: v.id });
        }
      }
    }
    return list;
  }

  function find(k) {
    return entries().find(e => e.key === k) || null;
  }

  // ---------- 日期（本地日期字符串） ----------
  function pad(n) { return String(n).padStart(2, '0'); }
  function today(now = new NativeDate()) {
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }
  function addDays(date, n) {
    const [y, m, d] = date.split('-').map(Number);
    return today(new NativeDate(y, m - 1, d + n));
  }
  function daysBetween(a, b) {
    const [y1, m1, d1] = a.split('-').map(Number);
    const [y2, m2, d2] = b.split('-').map(Number);
    return Math.round((NativeDate.UTC(y2, m2 - 1, d2) - NativeDate.UTC(y1, m1 - 1, d1)) / 86400000);
  }

  // ---------- 存储 ----------
  function emptyData() {
    return { words: {}, days: {}, settings: {} };
  }
  function load(store) {
    const data = store.read(STORE_KEY, emptyData());
    if (!data.words || typeof data.words !== 'object') data.words = {};
    if (!data.days || typeof data.days !== 'object') data.days = {};
    if (!data.settings || typeof data.settings !== 'object') data.settings = {};
    return data;
  }
  function save(store, data, date = today()) {
    const cutoff = addDays(date, -DAYS_KEPT);
    for (const d of Object.keys(data.days)) if (d < cutoff) delete data.days[d];
    return store.write(STORE_KEY, data);
  }
  function dayStats(data, date) {
    return data.days[date] || (data.days[date] = { reviewed: 0, learned: 0, wrong: 0, ms: 0 });
  }
  function newPerDay(data) {
    return NEW_PER_DAY.includes(data.settings.newPerDay) ? data.settings.newPerDay : DEFAULT_NEW;
  }

  // ---------- 分盒 ----------
  function isCore(word) { return word.core !== false; }

  // 这一盒用哪种练法；交替的盒按作答次数轮换。返回第一项为计分练法，warmup 为当轮先做的热身
  function modeFor(word, state) {
    const box = state ? state.box : 1;
    const seen = state ? state.seen || 0 : 0;
    if (!isCore(word)) {
      if (box === 'R') return { mode: seen % 2 ? 'L2' : 'L1' };
      return { mode: box === 2 ? 'L2' : 'L1' };
    }
    switch (box) {
      case 1: return { mode: 'L3', warmup: 'L1' };
      case 2: return { mode: 'L3' };
      case 3: return { mode: seen % 2 ? 'L4' : 'L3' };
      case 4: return { mode: seen % 2 ? 'L3' : 'L4' };
      case 5: return { mode: 'L4' };
      default: return { mode: 'L3' };
    }
  }

  // 一次计分作答后的新状态。答错：1、2 盒回 1 盒，3 盒及以上（含掌握）降两盒，认读回 1 盒；都明天再见
  function grade(word, state, correct, date) {
    const prev = state || { box: 1, seen: 0, wrong: 0 };
    const next = { ...prev, seen: (prev.seen || 0) + 1, wrong: prev.wrong || 0, last: date };
    const level = prev.box === 'M' ? 6 : prev.box === 'R' ? 0 : prev.box;
    if (!correct) {
      next.wrong += 1;
      next.box = level <= 2 ? 1 : level - 2;
      next.due = addDays(date, 1);
      return next;
    }
    if (!isCore(word)) {
      if (prev.box === 'R') { next.box = 'R'; next.due = addDays(date, R_NEXT); }
      else if (prev.box === 2) { next.box = 'R'; next.due = addDays(date, R_FIRST); }
      else { next.box = 2; next.due = addDays(date, INTERVAL[2]); }
      return next;
    }
    next.box = level >= 5 ? 'M' : level + 1;
    next.due = addDays(date, INTERVAL[next.box]);
    return next;
  }

  // “我认识”：core 词拼对、认读词 L2 选对，都只进第 2 盒
  function gradeKnown(word, correct, date) {
    if (!correct) return { box: 1, seen: 1, wrong: 1, last: date, due: addDays(date, 1) };
    return { box: 2, seen: 1, wrong: 0, last: date, due: addDays(date, INTERVAL[2]) };
  }

  function mastered(state) {
    return !!state && (state.box === 'M' || state.box === 'R');
  }

  // ---------- 每日队列 ----------
  // 到期复习按逾期天数从多到少，最多 40 个；到期超过 30 个时新词减半；当天已学的新词从额度里扣
  function plan(data, date, options = {}) {
    const known = entries(options.scope);
    const due = known
      .filter(e => data.words[e.key] && data.words[e.key].due <= date)
      .sort((a, b) => (data.words[a.key].due < data.words[b.key].due ? -1 :
        data.words[a.key].due > data.words[b.key].due ? 1 : 0));
    let quota = newPerDay(data);
    if (due.length > HALVE_NEW_ABOVE) quota = Math.ceil(quota / 2);
    if (!options.extra) quota = Math.max(0, quota - ((data.days[date] || {}).learned || 0));
    const fresh = newWords(data, options.newScope || newSource(data, options.volumeId)).slice(0, quota);
    return { due: due.slice(0, DUE_CAP), dueTotal: due.length, fresh };
  }

  // 新词从哪来：设置里选的单元还有没学的词就用它，否则取本册第一个还有未学词的单元
  function newSource(data, volumeId) {
    const chosen = data.settings.unit;
    if (chosen && newWords(data, chosen).length) return chosen;
    const v = volumeId && volumes[volumeId];
    if (!v) return chosen || null;
    for (const unit of v.units) {
      const uid = unitId(v.id, unit.no);
      if (newWords(data, uid).length) return uid;
    }
    return null;
  }

  function newWords(data, scope) {
    if (!scope) return [];
    return entries(scope).filter(e => !data.words[e.key]);
  }

  function minutes(planResult) {
    const seconds = planResult.due.length * 10 + planResult.fresh.length * 25;
    return Math.max(1, Math.round(seconds / 60));
  }

  // ---------- 干扰项 ----------
  function editDistance(a, b) {
    const dp = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return dp[b.length];
  }

  function shuffle(list, random) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // 由近及远取候选：同单元 → 同册 → 全部，去掉与正确答案相同的文字
  function pool(entry) {
    return [entries(entry.unit), entries(entry.volumeId), entries()]
      .map(list => list.filter(e => e.key !== entry.key));
  }

  function pick(groups, text, answer, count, prefer) {
    const out = [];
    for (const group of groups) {
      const sorted = prefer ? group.slice().sort(prefer) : group;
      for (const e of sorted) {
        const t = text(e);
        if (t === answer || out.includes(t)) continue;
        out.push(t);
        if (out.length === count) return out;
      }
    }
    return out;
  }

  // 返回 { options, answer }，answer 为正确选项下标
  function choices(entry, mode, random = Math.random) {
    const groups = pool(entry).map(list => shuffle(list, random));
    let answer;
    let others;
    if (mode === 'L1') {
      answer = entry.word.zh;
      const samePos = groups.map(list => list.filter(e => e.word.pos === entry.word.pos));
      others = pick(samePos.concat(groups), e => e.word.zh, answer, 3);
    } else {
      answer = entry.word.w;
      const near = (a, b) => editDistance(entry.word.w, a.word.w) - editDistance(entry.word.w, b.word.w);
      others = pick(groups, e => e.word.w, answer, 3, near);
    }
    const options = shuffle([answer, ...others], random);
    return { options, answer: options.indexOf(answer) };
  }

  // ---------- 例句 ----------
  // [[...]] 标挖空；L4 按作答次数轮换例句，原形和变形都能考到
  const BLANK = /\[\[([^\]]+)\]\]/g;
  function cloze(word, state) {
    const list = word.ex || [];
    if (!list.length) return null;
    const ex = list[(state ? state.seen || 0 : 0) % list.length];
    const match = /\[\[([^\]]+)\]\]/.exec(ex.en);
    return {
      before: ex.en.slice(0, match.index),
      after: ex.en.slice(match.index + match[0].length),
      answer: match[1],
      zh: ex.zh,
      plain: ex.en.replace(BLANK, '$1'),
    };
  }

  // ---------- 一轮练习 ----------
  // 任务 { key, mode, scored, known? }。新词先看卡片：正常是 L1 热身 + 本轮末尾计分 L3；
  // 点“我认识”直接做计分题（core 拼写、认读词 L2）。答错的计分题在本轮末尾再练一次（不再计分）。
  function session(data, date, list, options = {}) {
    const practice = !!options.practice;
    const queue = [];
    const tail = [];
    const results = { scored: 0, correct: 0, learned: 0, wrongKeys: [] };
    for (const e of list.due) {
      const m = modeFor(e.word, data.words[e.key]);
      if (m.warmup) { queue.push({ key: e.key, mode: m.warmup, scored: false }); tail.push({ key: e.key, mode: m.mode, scored: !practice }); }
      else queue.push({ key: e.key, mode: m.mode, scored: !practice });
    }
    for (const e of list.fresh || []) {
      queue.push({ key: e.key, mode: 'card', scored: false, fresh: true });
    }
    queue.push(...tail);

    function entryOf(k) { return find(k); }

    return {
      results,
      next() { return queue[0] || null; },
      // 剩余步数：没看过的新词卡片还会带出 L1 和末尾的 L3，按 3 步算（认读词 2 步），进度条不会越做越多
      remaining() {
        return queue.reduce((n, t) => n + (t.mode === 'card' ? (isCore(entryOf(t.key).word) ? 3 : 2) : 1), 0);
      },
      // 新词卡片：known=true 走“我认识”
      card(known) {
        const task = queue.shift();
        const e = entryOf(task.key);
        if (known) {
          queue.unshift({ key: task.key, mode: isCore(e.word) ? 'L3' : 'L2', scored: true, known: true, fresh: true });
        } else {
          queue.unshift({ key: task.key, mode: 'L1', scored: !isCore(e.word), fresh: true });
          if (isCore(e.word)) queue.push({ key: task.key, mode: 'L3', scored: true, fresh: true });
        }
      },
      answer(correct) {
        const task = queue.shift();
        if (!task.scored) {
          if (!correct && task.mode !== 'card') queue.push({ ...task });
          return;
        }
        const e = entryOf(task.key);
        const prev = data.words[task.key];
        const state = task.known ? gradeKnown(e.word, correct, date)
          : task.fresh ? grade(e.word, null, correct, date)
          : grade(e.word, prev, correct, date);
        data.words[task.key] = state;
        const stats = dayStats(data, date);
        if (task.fresh) { stats.learned += 1; results.learned += 1; } else stats.reviewed += 1;
        results.scored += 1;
        if (correct) results.correct += 1;
        else {
          stats.wrong += 1;
          results.wrongKeys.push(task.key);
          queue.push({ key: task.key, mode: task.mode, scored: false });
        }
      },
      addTime(ms) { dayStats(data, date).ms += Math.max(0, Math.min(ms, 120000)); },
    };
  }

  // 单元掌握情况：已掌握（掌握态 + 认读态）/ 已学 / 共计
  function unitSummary(data, uid) {
    const list = entries(uid);
    return {
      total: list.length,
      learned: list.filter(e => data.words[e.key]).length,
      mastered: list.filter(e => mastered(data.words[e.key])).length,
    };
  }

  // 明天到期的数量（结束页提示用）
  function dueOn(data, date) {
    return entries().filter(e => data.words[e.key] && data.words[e.key].due <= date).length;
  }

  // 数据格式校验（测试和导入后检查共用），返回问题列表
  function validate(def) {
    const problems = [];
    const seen = new Set();
    for (const unit of def.units || []) {
      for (const word of unit.words || []) {
        const where = `Unit ${unit.no} ${word.w}`;
        const k = key(word.w || '');
        if (!word.w || !word.zh) problems.push(`${where} 缺词头或释义`);
        if (seen.has(k)) problems.push(`${where} 本册重复`);
        seen.add(k);
        const allowed = new Set([word.w, ...(word.forms || [])].map(key));
        const ex = word.ex || [];
        if (!Array.isArray(ex) || !ex.length) problems.push(`${where} 至少要 1 条例句`);
        if (ex.length > 3) problems.push(`${where} 例句最多 3 条`);
        for (const item of ex) {
          const blanks = (item.en || '').match(BLANK) || [];
          if (blanks.length !== 1) problems.push(`${where} 例句要恰好一处 [[ ]]：${item.en}`);
          else if (!allowed.has(key(blanks[0].slice(2, -2)))) problems.push(`${where} 挖空 ${blanks[0]} 不是词头或 forms 之一`);
          if (!item.zh) problems.push(`${where} 例句缺译文`);
        }
        if (isCore(word) && (word.forms || []).length) {
          const answers = ex.map(item => key(((item.en || '').match(/\[\[([^\]]+)\]\]/) || [])[1] || ''));
          if (ex.length < 2) problems.push(`${where} 有变形的词要 2 条例句（原形、常用变形各一条）`);
          else if (!answers.includes(key(word.w)) || !answers.some(a => a !== key(word.w))) problems.push(`${where} 例句要分别考原形和变形`);
        }
        if (typeof word.exam !== 'boolean') problems.push(`${where} 缺 exam 标记`);
      }
    }
    return problems;
  }

  const Words = {
    STORE_KEY, DUE_CAP, HALVE_NEW_ABOVE, NEW_PER_DAY, volumes,
    key, volume, unitId, entries, find, today, addDays, daysBetween,
    load, save, dayStats, newPerDay, isCore, modeFor, grade, gradeKnown, mastered,
    plan, newSource, newWords, minutes, editDistance, choices, cloze, session,
    unitSummary, dueOn, validate,
    reset() { for (const k of Object.keys(volumes)) delete volumes[k]; },
  };

  if (typeof module !== 'undefined') module.exports = Words;
  else root.Words = Words;
})(typeof globalThis !== 'undefined' ? globalThis : this);
