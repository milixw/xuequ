'use strict';

// 试卷模块：状态机 + UI。
// 设计文档：docs/superpowers/specs/2026-09-21-exam-module-design.md

(function (root) {
  const KEY = 'xq.exam.v1';
  // 每档每题秒数：基础 60s、扩展 120s、挑战 180s
  // 标准 5+10+5 = 5*60 + 10*120 + 5*180 = 2400 秒 ≈ 40 分钟
  const PER_LEVEL = { basic: 60, extended: 120, challenge: 180 };

  function ss() {
    try { return root.sessionStorage; } catch { return null; }
  }
  function read() {
    const s = ss();
    if (!s) return null;
    try { const r = s.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; }
  }
  function write(obj) {
    const s = ss();
    if (!s) return false;
    try { s.setItem(KEY, JSON.stringify(obj)); return true; } catch { return false; }
  }
  function clear() {
    const s = ss();
    if (!s) return;
    try { s.removeItem(KEY); } catch {}
  }

  function formatTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    const m = Math.floor(sec / 60), s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function totalSeconds(questions) {
    return questions.reduce((n, q) => n + (PER_LEVEL[q.level] || 0), 0);
  }

  function buildSession(sectionId, username, section) {
    const total = totalSeconds(section.questions);
    const now = Date.now();
    return {
      username,
      sectionId,
      questions: section.questions.map(q => ({ qid: q.id, level: q.level })),
      totalSeconds: total,
      startedAt: now,
      deadlineAt: now + total * 1000,
      answers: {},
      currentIndex: 0,
      submitted: false,
    };
  }

  const Exam = {
    KEY,
    PER_LEVEL,

    formatTime,
    totalSeconds,

    prepare(sectionId, username, section) {
      const s = buildSession(sectionId, username, section);
      write(s);
      return s;
    },

    session() {
      return read();
    },

    clear,

    setResponse(qid, response) {
      const s = read();
      if (!s) return;
      if (s.submitted) throw new Error('已交卷，不能修改作答');
      s.answers[qid] = response;
      write(s);
    },

    getResponse(qid) {
      const s = read();
      return s ? s.answers[qid] : undefined;
    },

    jump(index) {
      const s = read();
      if (!s || s.submitted) return;
      s.currentIndex = Math.max(0, Math.min(index, s.questions.length - 1));
      write(s);
    },

    submit() {
      const s = read();
      if (!s || s.submitted) return;
      s.submitted = true;
      write(s);
      // 写入历史
      const r = this.result();
      if (r) {
        const elapsedSec = Math.max(0, Math.floor((Date.now() - s.startedAt) / 1000));
        Accounts.history.append(s.username, {
          sectionId: s.sectionId,
          completedAt: Date.now(),
          score: r.correct,
          total: r.total,
          durationSec: elapsedSec,
          items: r.items,
        });
      }
    },

    remainingSeconds() {
      const s = read();
      if (!s) return 0;
      return Math.max(0, Math.floor((s.deadlineAt - Date.now()) / 1000));
    },

    // 算分：依赖全局 Content.sections 和 Answer.checkQuestion
    result() {
      const s = read();
      if (!s) return null;
      const section = Content.sections[s.sectionId];
      const items = [];
      let correct = 0;
      for (const meta of s.questions) {
        const q = section && section.questions.find(x => x.id === meta.qid);
        const response = s.answers[meta.qid];
        if (!q) { items.push({ qid: meta.qid, ok: false, response, question: null, error: '题目找不到' }); continue; }
        const isAnswered = response !== undefined && response !== null &&
          !(response instanceof Set && response.size === 0) &&
          !(Array.isArray(response) && response.length === 0);
        if (!isAnswered) { items.push({ qid: meta.qid, ok: false, response: null, question: q }); continue; }
        try {
          const r = Answer.checkQuestion(q, response);
          const item = { qid: meta.qid, ok: r.ok, response, question: q };
          if (r.error) item.error = r.error;
          items.push(item);
          if (r.ok) correct++;
        } catch (e) {
          items.push({ qid: meta.qid, ok: false, response, question: q, error: e.message });
        }
      }
      return { correct, total: items.length, items };
    },
  };

  // ---------- UI ----------
  let UI = null;
  Exam.bindUI = function (ui) { UI = ui; };

  function renderHeader(main, title, backHref, subtitle) {
    const header = document.createElement('header');
    header.className = 'bar';
    header.innerHTML =
      (backHref ? `<a class="back" href="${backHref}" aria-label="返回">‹</a>` : '') +
      `<div class="titles"><h1>${UI.escapeHtml(title)}</h1>${subtitle ? `<p>${UI.escapeHtml(subtitle)}</p>` : ''}</div>`;
    main.appendChild(header);
    return header;
  }

  // ---------- 列表 ----------
  Exam.listPage = function (main) {
    // 册列表：按当前账号选的学期筛选，和首页保持一致
    const semester = Content.semester(Accounts.grade.get(Accounts.current()));
    renderHeader(main, '试卷', '#/', '按小节限时测试');
    for (const v of (semester ? Content.volumes().filter(v => v.volume.id === semester.id) : [])) {
      const metas = Content.sectionMetas().filter(m => m.volumeId === v.id && m.section.ready);
      const card = document.createElement(metas.length ? 'a' : 'div');
      card.className = 'card volume' + (metas.length ? '' : ' disabled');
      if (metas.length) card.href = `#/exam/v/${v.id}`;
      card.innerHTML =
        `<span class="tag">${UI.escapeHtml(v.subject.name)}</span>` +
        `<h2>${UI.escapeHtml(v.volume.name)}</h2>` +
        `<p>${UI.escapeHtml(v.edition.name)}</p>` +
        `<p class="meta">${metas.length ? metas.length + ' 节可考' : '暂未上线'}</p>`;
      main.appendChild(card);
    }
  };

  Exam.volumePage = function (volumeId, main) {
    const v = Content.volume(volumeId);
    if (!v) return UI.showError(main, '找不到这一册');
    const current = Accounts.current();
    const metas = Content.sectionMetas().filter(m => m.volumeId === volumeId && m.section.ready);

    // 收集该册每节最新历史
    const latestBySection = new Map();
    if (current) {
      for (const rec of Accounts.history.list(current)) {
        const prev = latestBySection.get(rec.sectionId);
        if (!prev || prev.completedAt < rec.completedAt) {
          latestBySection.set(rec.sectionId, rec);
        }
      }
    }

    renderHeader(main, v.volume.name, '#/exam', '按小节限时测试');
    const chapterMap = new Map();
    for (const m of metas) {
      if (!chapterMap.has(m.chapter.no)) chapterMap.set(m.chapter.no, { chapter: m.chapter, items: [] });
      chapterMap.get(m.chapter.no).items.push(m);
    }
    const chapters = [...chapterMap.values()].sort((a, b) => a.chapter.no - b.chapter.no);
    for (const { chapter, items } of chapters) {
      const box = document.createElement('section');
      box.className = 'chapter';
      box.innerHTML = `<h3 class="group">第 ${chapter.no} 章　${UI.escapeHtml(chapter.title)}</h3>`;
      for (const m of items) {
        const rec = latestBySection.get(m.id);
        const card = document.createElement('div');
        card.className = 'exam-card';
        const recBtn = document.createElement('a');
        recBtn.className = 'history-btn' + (rec ? '' : ' disabled');
        recBtn.textContent = rec ? `查看记录 ${rec.score}/${rec.total}` : '暂无记录';
        if (rec) {
          recBtn.href = `#/exam/${m.id}/result-history/${rec.id}`;
        } else {
          recBtn.setAttribute('aria-disabled', 'true');
        }
        card.innerHTML =
          `<div><div class="name">${UI.escapeHtml(m.section.no)}　${UI.escapeHtml(m.section.title)}</div>` +
          `<div class="meta">20 道 · 约 40 分钟</div></div>` +
          `<div class="card-actions"></div>`;
        const actions = card.querySelector('.card-actions');
        actions.appendChild(recBtn);
        const startBtn = document.createElement('button');
        startBtn.className = 'start-btn';
        startBtn.textContent = '开始测试';
        startBtn.addEventListener('click', () => {
          AccountUI.ensureLoggedIn(async () => {
            const section = await Content.load(m.id);
            Exam.prepare(m.id, Accounts.current(), section);
            location.hash = `#/exam/${m.id}/play`;
          });
        });
        actions.appendChild(startBtn);
        box.appendChild(card);
      }
      main.appendChild(box);
    }
  };

  // 帮助函数：格式化时间
  function formatDate(ms) {
    const d = new Date(ms);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getMonth() + 1}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // ---------- 入口（账号确认已取消：未登录用 AccountUI 兜底，已登录直接跳 listPage） ----------
  Exam.entryPage = function (sectionId, main) {
    if (!Accounts.current()) {
      AccountUI.ensureLoggedIn(() => { location.hash = '#/exam'; });
      UI.showError(main, '请先登录');
      return;
    }
    location.hash = '#/exam';
  };

  // ---------- 答题 ----------
  Exam.playPage = async function (sectionId, main) {
    const s = Exam.session();
    if (!s || s.sectionId !== sectionId) {
      location.hash = `#/exam/${sectionId}`;
      return;
    }
    if (s.submitted) {
      location.hash = `#/exam/${sectionId}/result`;
      return;
    }
    const section = await Content.load(sectionId);
    const q = section.questions.find(x => x.id === s.questions[s.currentIndex].qid);

    // 顶部固定栏
    const bar = document.createElement('div');
    bar.className = 'exam-bar';
    bar.innerHTML =
      `<div class="title">${UI.escapeHtml(section.title)}</div>` +
      `<div class="timer" id="timer">--:--</div>` +
      `<button class="submit" id="submit">交卷</button>`;
    main.appendChild(bar);

    const qc = document.createElement('div');
    main.appendChild(qc);

    const nav = document.createElement('div');
    nav.className = 'exam-nav';
    main.appendChild(nav);

    const handle = Quiz.renderQuestion(qc, q, {
      index: s.currentIndex,
      total: s.questions.length,
      onChange: response => {
        Exam.setResponse(q.id, response);
        renderNav();
      },
    });

    if (s.answers[q.id] !== undefined) handle.setResponse(s.answers[q.id]);

    // 计时
    let timer = null;
    let alive = true;
    function tick() {
      if (!alive) return;
      const left = Exam.remainingSeconds();
      const t = bar.querySelector('#timer');
      if (!t) return; // 已离开答题页
      t.textContent = Exam.formatTime(left);
      t.classList.toggle('urgent', left <= 60 && left > 0);
      t.classList.toggle('flash', left <= 10 && left > 0);
      if (left === 0) {
        if (timer) clearInterval(timer);
        Exam.submit();
        location.hash = `#/exam/${sectionId}/result`;
      }
    }
    tick();
    timer = setInterval(tick, 1000);
    function onVisibility() { if (!alive) return; if (!document.hidden) tick(); }
    document.addEventListener('visibilitychange', onVisibility);
    // 离开答题页时清理
    function cleanup() {
      alive = false;
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    }
    window.addEventListener('hashchange', cleanup, { once: true });

    // 交卷按钮
    bar.querySelector('#submit').addEventListener('click', () => {
      if (!confirm('确定交卷？未答题将被记 0 分')) return;
      if (timer) clearInterval(timer);
      Exam.submit();
      location.hash = `#/exam/${sectionId}/result`;
    });

    // 导航条
    function renderNav() {
      const sess = Exam.session();
      nav.innerHTML = '';
      const groups = { basic: [], extended: [], challenge: [] };
      sess.questions.forEach((m, i) => { if (groups[m.level]) groups[m.level].push({ m, i }); });
      for (const lv of ['basic', 'extended', 'challenge']) {
        if (!groups[lv].length) continue;
        const g = document.createElement('div');
        g.className = 'level-group';
        g.innerHTML = `<h5>${Quiz.LEVEL_NAMES[lv]}（${groups[lv].length}）</h5>` +
          `<div class="tiles">${groups[lv].map(({ m, i }) => {
            const resp = sess.answers[m.qid];
            const answered = resp !== undefined && resp !== null &&
              !(resp instanceof Set && resp.size === 0) &&
              !(Array.isArray(resp) && resp.length === 0);
            return `<button class="tile ${answered ? 'answered' : ''} ${i === sess.currentIndex ? 'current' : ''}" data-i="${i}">${i + 1}</button>`;
          }).join('')}</div>`;
        nav.appendChild(g);
      }
      nav.querySelectorAll('.tile').forEach(b => {
        b.addEventListener('click', () => {
          const i = Number(b.dataset.i);
          Exam.jump(i);
          if (timer) clearInterval(timer);
          location.reload();
        });
      });
    }
    renderNav();
  };

  // ---------- 成绩页 ----------
  Exam.resultPage = async function (sectionId, main) {
    const s = Exam.session();
    if (!s || s.sectionId !== sectionId) {
      location.hash = `#/exam/${sectionId}`;
      return;
    }
    if (!s.submitted) {
      location.hash = `#/exam/${sectionId}/play`;
      return;
    }
    const section = await Content.load(sectionId);
    const r = Exam.result();
    const elapsed = Math.floor((Date.now() - s.startedAt) / 1000);

    renderHeader(main, section.title, '#/exam', '成绩');
    const box = document.createElement('div');
    box.className = 'exam-result';
    box.innerHTML =
      `<div class="score">${r.correct}<small> / ${r.total}</small></div>` +
      `<div class="meta">${UI.escapeHtml(s.username)} · 用时 ${Exam.formatTime(elapsed)}</div>` +
      `<div class="actions">` +
      `<a href="#/exam">返回试卷列表</a>` +
      `<button class="primary" id="retry">再来一次</button>` +
      `<a href="#/s/${sectionId}">考后回到练习</a>` +
      `</div>`;
    main.appendChild(box);

    const review = document.createElement('div');
    review.className = 'exam-review';
    review.innerHTML = r.items.map((it, i) => {
      const cls = it.ok ? 'right' : 'wrong';
      const mark = it.ok ? '<span class="ok">✓</span>' : '<span class="fail">✗</span>';
      const lvl = s.questions[i].level;
      return `<details class="item ${cls}"><summary>${mark} <span>${i + 1}</span> <span class="lv lv-${lvl}">${Quiz.LEVEL_NAMES[lvl]}</span></summary></details>`;
    }).join('');
    main.appendChild(review);

    r.items.forEach((it, i) => {
      const det = review.children[i];
      const body = document.createElement('div');
      body.className = 'body';
      const q = it.question;
      const stem = q ? `<div class="q-stem">${Quiz.renderText(q.stem)}</div>` : '';
      const userText = it.response == null ? '（未作答）' : Quiz.renderText(answerSummaryFor(q, it.response));
      const correctText = q ? Quiz.renderText(answerSummaryFor(q)) : '';
      body.innerHTML =
        stem +
        `<div class="row mine ${it.ok ? '' : 'fail'}"><b>你的作答：</b>${userText}</div>` +
        (q ? `<div class="row correct"><b>正确答案：</b>${correctText}</div>` : '') +
        (q && q.explain ? `<ol class="explain">${q.explain.map(s => `<li>${Quiz.renderText(s)}</li>`).join('')}</ol>` : '');
      det.appendChild(body);
    });

    box.querySelector('#retry').addEventListener('click', () => {
      Exam.clear();
      Exam.prepare(sectionId, Accounts.current(), section);
      location.hash = `#/exam/${sectionId}/play`;
    });
  };

  // ---------- 历史成绩 ----------
  Exam.historyResultPage = async function (sectionId, recordId, main) {
    const current = Accounts.current();
    if (!current) {
      AccountUI.ensureLoggedIn(() => location.reload());
      return;
    }
    const rec = Accounts.history.get(current, recordId);
    if (!rec || rec.sectionId !== sectionId) {
      UI.showError(main, '找不到这次考试记录');
      return;
    }
    const section = await Content.load(sectionId);

    renderHeader(main, section.title, '#/exam', '历史成绩');
    const box = document.createElement('div');
    box.className = 'exam-result';
    box.innerHTML =
      `<div class="score">${rec.score}<small> / ${rec.total}</small></div>` +
      `<div class="meta">${UI.escapeHtml(current)} · 用时 ${Exam.formatTime(rec.durationSec || 0)} · 完成于 ${formatDate(rec.completedAt)}</div>` +
      `<div class="actions">` +
        `<a href="#/exam">返回试卷列表</a>` +
        `<button class="primary" id="retry">再做一次</button>` +
        `<a href="#/s/${sectionId}">考后回到练习</a>` +
      `</div>`;
    main.appendChild(box);

    const review = document.createElement('div');
    review.className = 'exam-review';
    review.innerHTML = rec.items.map((it, i) => {
      const cls = it.ok ? 'right' : 'wrong';
      const mark = it.ok ? '<span class="ok">✓</span>' : '<span class="fail">✗</span>';
      const lvl = section.questions.find(q => q.id === it.qid)?.level || 'basic';
      return `<details class="item ${cls}"><summary>${mark} <span>${i + 1}</span> <span class="lv lv-${lvl}">${Quiz.LEVEL_NAMES[lvl]}</span></summary></details>`;
    }).join('');
    main.appendChild(review);

    rec.items.forEach((it, i) => {
      const det = review.children[i];
      const body = document.createElement('div');
      body.className = 'body';
      const q = it.question;
      const stem = q ? `<div class="q-stem">${Quiz.renderText(q.stem)}</div>` : '';
      const userText = it.response == null ? '（未作答）' : Quiz.renderText(answerSummaryFor(q, it.response));
      const correctText = q ? Quiz.renderText(answerSummaryFor(q)) : '';
      body.innerHTML =
        stem +
        `<div class="row mine ${it.ok ? '' : 'fail'}"><b>你的作答：</b>${userText}</div>` +
        (q ? `<div class="row correct"><b>正确答案：</b>${correctText}</div>` : '') +
        (q && q.explain ? `<ol class="explain">${q.explain.map(s => `<li>${Quiz.renderText(s)}</li>`).join('')}</ol>` : '');
      det.appendChild(body);
    });

    box.querySelector('#retry').addEventListener('click', () => {
      Exam.clear();
      Exam.prepare(sectionId, Accounts.current(), section);
      location.hash = `#/exam/${sectionId}/play`;
    });
  };

  function answerSummaryFor(q, response) {
    const LETTERS = Quiz.LETTERS || 'ABCDEFGH';
    if (q.type === 'choice') {
      const i = response === undefined ? q.answer : response;
      return `${LETTERS[i]}. ${q.options[i]}`;
    }
    if (q.type === 'multi') {
      const arr = response === undefined ? q.answer : response;
      return [...arr].sort().map(i => LETTERS[i]).join('、');
    }
    const blanks = q.blanks.map((b, i) => {
      const text = response === undefined ? Answer.answerText(b) : (response[i] || '');
      return (b.label ? b.label + ' ' : '') + text + (b.suffix ? ' ' + b.suffix : '');
    });
    return blanks.join('；');
  }

  if (typeof module !== 'undefined') module.exports = Exam;
  else root.Exam = Exam;
})(typeof window !== 'undefined' ? window : globalThis);
