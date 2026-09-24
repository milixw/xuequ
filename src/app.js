'use strict';

// 应用外壳：hash 路由 + 页面渲染
//   #/                 首页：各学科的册
//   #/v/<册ID>          册：章节列表
//   #/s/<小节ID>        小节：知识点 + 题目列表
//   #/q/<小节ID>/<题目ID> 做题
//   #/e/<真题卷ID>      真题卷：按教材小节归类
//   #/eq/<真题卷ID>/<题目ID> 做真题
//   #/exam...           限时测试（src/exam.js 负责渲染）

(function () {
  const app = document.getElementById('app');
  const { renderText, escapeHtml, LEVEL_NAMES, DIFFICULTY_NAMES } = Quiz;
  const LEVEL_ORDER = ['basic', 'extended', 'challenge'];

  // 题目按 基础 → 扩展 → 挑战 排序，同档内保持文件中的顺序
  function orderedQuestions(section) {
    return LEVEL_ORDER.flatMap(lv => section.questions.filter(q => q.level === lv));
  }

  function page(title, backHref, subtitle) {
    app.innerHTML =
      `<header class="bar">` +
      (backHref ? `<a class="back" href="${backHref}" aria-label="返回">‹</a>` : '') +
      `<div class="titles"><h1>${escapeHtml(title)}</h1>${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ''}</div>` +
      `</header>`;
    const main = document.createElement('main');
    app.appendChild(main);
    return main;
  }

  function showError(main, msg) {
    main.innerHTML = `<p class="error">${escapeHtml(msg)}</p>`;
  }

  // 学期切换器（首页用），下拉菜单显示在 button 之下，点外侧收起
  // 切换的是学期（如「八年级下」），学期下的多个课程都列出
  function mountSemesterSwitcher(headerEl, currentSemester, username) {
    // 只列目录里真有的学期，列了没有的册点进去会是一片空白
    const semesters = Content.semesters();
    if (semesters.length < 2) return;
    const current = semesters.find(g => g.id === currentSemester) || semesters[0];
    const wrap = document.createElement('div');
    wrap.className = 'semester-switcher';
    const btn = document.createElement('button');
    btn.className = 'semester-btn';
    btn.innerHTML = `${escapeHtml(current.name)} <span class="caret">▾</span>`;
    const menu = document.createElement('div');
    menu.className = 'semester-menu';
    menu.hidden = true;
    semesters.forEach(g => {
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.textContent = g.name + (g.id === current.id ? ' ✓' : '');
      opt.addEventListener('click', () => {
        Accounts.grade.set(username, g.id);
        menu.hidden = true;
        // 重渲染首页
        location.reload();
      });
      menu.appendChild(opt);
    });
    btn.addEventListener('click', e => {
      e.stopPropagation();
      // 切换菜单显示，并按需注册/卸载「点外侧收起」监听器
      if (menu.hidden) {
        // 收起另一个弹窗（账号下拉）
        if (typeof AccountUI !== 'undefined' && AccountUI.closeMenu) {
          AccountUI.closeMenu();
        }
        menu.hidden = false;
        if (outsideHandler) document.removeEventListener('click', outsideHandler);
        outsideHandler = (ev) => {
          if (!wrap.contains(ev.target)) {
            menu.hidden = true;
            document.removeEventListener('click', outsideHandler);
            outsideHandler = null;
          }
        };
        document.addEventListener('click', outsideHandler);
        // 暴露给账号下拉收起自己用
        if (typeof window !== 'undefined') window.__closeSemesterMenu = () => {
          if (!menu.hidden) {
            menu.hidden = true;
            if (outsideHandler) {
              document.removeEventListener('click', outsideHandler);
              outsideHandler = null;
            }
          }
        };
      } else {
        menu.hidden = true;
        if (outsideHandler) {
          document.removeEventListener('click', outsideHandler);
          outsideHandler = null;
        }
      }
    });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    headerEl.appendChild(wrap);
  }

  let outsideHandler = null;

  // ---------- 首页 ----------
  function home() {
    const main = page('学趣闯关', null, '跟着课本学，一节一关');
    const header = app.querySelector('header.bar');
    const username = Accounts.current();
    const semester = Content.semester(Accounts.grade.get(username));
    mountSemesterSwitcher(header, semester && semester.id, username);
    AccountUI.mount(header);
    const volumes = semester ? Content.volumes().filter(v => v.volume.id === semester.id) : [];
    for (const v of volumes) {
      const metas = Content.sectionMetas().filter(s => s.volumeId === v.id);
      const ready = metas.filter(s => s.section.ready).length;
      const solved = metas.reduce((n, s) => n + Progress.solvedCount(s.id), 0);
      const card = document.createElement('a');
      card.className = 'card volume';
      card.href = `#/v/${v.id}`;
      card.innerHTML =
        `<span class="tag">${escapeHtml(v.subject.name)}</span>` +
        `<h2>${escapeHtml(v.volume.name)}</h2>` +
        `<p>${escapeHtml(v.edition.name)}</p>` +
        `<p class="meta">已上线 ${ready} / ${metas.length} 节 · 已答对 ${solved} 题</p>`;
      main.appendChild(card);
    }
    const exam = document.createElement('a');
    exam.className = 'card volume exam-entry';
    exam.innerHTML =
      `<span class="tag">试卷</span>` +
      `<h2>试卷</h2>` +
      `<p>先交卷，再看分数和错题解析</p>`;
    // 短按才跳转；长按（>500ms）不触发
    let pressStart = 0;
    let longPressed = false;
    exam.addEventListener('pointerdown', () => {
      pressStart = Date.now();
      longPressed = false;
    });
    exam.addEventListener('pointerup', () => {
      if (Date.now() - pressStart > 500) { longPressed = true; return; }
      if (longPressed) return;
      if (!Accounts.current()) {
        AccountUI.ensureLoggedIn(() => { location.hash = '#/exam'; });
      } else {
        location.hash = '#/exam';
      }
    });
    exam.addEventListener('contextmenu', e => e.preventDefault());
    main.appendChild(exam);
    const games = document.createElement('section');
    games.innerHTML =
      `<h3 class="group">趣味玩法</h3>` +
      `<a class="card" href="src/games/function-track/index.html">` +
      `<h2>函数轨道</h2><p>调整函数参数，让小球沿着图像到达终点。适合学完一次函数、二次函数后玩。</p></a>` +
      `<a class="card" href="src/games/solids/index.html">` +
      `<h2>立体图形实验室</h2><p>正方体展开图、圆柱圆锥的展开、蚂蚁爬最短路、切正方体。拖动旋转，动手折一折、切一切。</p></a>` +
      `<a class="card" href="src/games/24/index.html">` +
      `<h2>24 点</h2><p>用 + − × ÷ 把 4 张牌算成 24。有经典难题，还有红牌算负数的有理数版，适合学完有理数的运算后玩。</p></a>` +
      `<a class="card" href="src/games/nim/index.html">` +
      `<h2>取石子</h2><p>几堆石子轮流取，取到最后一颗的人赢。从倒推表出发，自己找出必胜策略；也可以和同桌对战。</p></a>`;
    main.appendChild(games);
  }

  // ---------- 册 ----------
  async function volumePage(id) {
    const v = Content.volume(id);
    if (!v) return showError(page('找不到这一册', '#/'), '链接可能有误，请返回首页。');
    const main = page(v.volume.name, '#/', `${v.subject.name} · ${v.edition.name}`);
    const metas = Content.sectionMetas().filter(s => s.volumeId === id);
    const examMetas = Content.examMetas().filter(e => e.volumeId === id);
    // 预先加载已上线的小节，用来显示题目总数
    await Promise.all(metas.filter(s => s.section.ready).map(s => Content.load(s.id).catch(() => null)));
    await Promise.all(examMetas.filter(e => e.exam.ready).map(e => Content.loadExam(e.id).catch(() => null)));

    for (const chapter of v.volume.chapters) {
      const box = document.createElement('section');
      box.className = 'chapter';
      box.innerHTML = `<h3 class="group">第 ${chapter.no} 章　${escapeHtml(chapter.title)}</h3>`;
      for (const s of metas.filter(m => m.chapter === chapter)) {
        const content = Content.sections[s.id];
        const row = document.createElement(content ? 'a' : 'div');
        row.className = 'row' + (content ? '' : ' disabled');
        if (content) row.href = `#/s/${s.id}`;
        const total = content ? content.questions.length : 0;
        const solved = Progress.solvedCount(s.id);
        row.innerHTML =
          `<span class="no">${s.section.no}</span>` +
          `<span class="name">${escapeHtml(s.section.title)}</span>` +
          (content
            ? `<span class="count">${solved}/${total}</span><span class="bar-bg"><span style="width:${(solved / total) * 100}%"></span></span>`
            : `<span class="count soon">制作中</span>`);
        box.appendChild(row);
      }
      main.appendChild(box);
    }

    if (examMetas.length) {
      const box = document.createElement('section');
      box.className = 'chapter';
      box.innerHTML = '<h3 class="group">真题卷</h3>';
      for (const e of examMetas) {
        const exam = Content.exams[e.id];
        const row = document.createElement(exam ? 'a' : 'div');
        row.className = 'row' + (exam ? '' : ' disabled');
        if (exam) row.href = `#/e/${e.id}`;
        const total = exam ? exam.questions.length : e.exam.questionCount || 0;
        const solved = Progress.solvedCount('exam:' + e.id);
        row.innerHTML =
          '<span class="no">卷</span>' +
          `<span class="name">${escapeHtml(e.exam.title)}</span>` +
          (exam
            ? `<span class="count">${solved}/${total}</span><span class="bar-bg"><span style="width:${total ? (solved / total) * 100 : 0}%"></span></span>`
            : '<span class="count soon">制作中</span>');
        box.appendChild(row);
      }
      main.appendChild(box);
    }
  }

  // ---------- 小节 ----------
  async function loadSection(id) {
    const meta = Content.sectionMeta(id);
    if (!meta || !meta.section.ready) return { meta, section: null };
    try {
      return { meta, section: await Content.load(id) };
    } catch (e) {
      return { meta, section: null, error: e };
    }
  }

  async function sectionPage(id) {
    const { meta, section } = await loadSection(id);
    if (!section) return showError(page('内容还没准备好', '#/'), '这一节正在制作中。');
    const main = page(`${meta.section.no}　${section.title}`, `#/v/${meta.volumeId}`, `第 ${meta.chapter.no} 章 ${meta.chapter.title}`);

    if (section.review.status !== 'approved') {
      main.insertAdjacentHTML('beforeend', '<p class="notice">本节内容由 AI 编写，尚未经过老师审核，如发现错误欢迎反馈。</p>');
    }

    main.insertAdjacentHTML('beforeend', '<h3 class="group">知识点</h3>');
    for (const card of section.intro) {
      main.insertAdjacentHTML(
        'beforeend',
        `<article class="card knowledge">` +
          `<h2>${renderText(card.title)}</h2>` +
          `<div class="body">${renderText(card.body)}</div>` +
          (card.example ? `<div class="example"><b>例</b>${renderText(card.example)}</div>` : '') +
          (card.pitfall ? `<div class="pitfall"><b>易错</b>${renderText(card.pitfall)}</div>` : '') +
          `</article>`
      );
    }

    const qs = orderedQuestions(section);
    main.insertAdjacentHTML(
      'beforeend',
      `<h3 class="group">练习 <small>已答对 ${Progress.solvedCount(id)} / ${qs.length}</small></h3>` +
        `<p class="legend"><i class="solved"></i>答对 <i class="tried"></i>答错过 <i class="revealed"></i>看过解析 <i class="new"></i>未做</p>`
    );
    for (const lv of LEVEL_ORDER) {
      const group = qs.map((q, i) => ({ q, i })).filter(x => x.q.level === lv);
      if (!group.length) continue;
      main.insertAdjacentHTML(
        'beforeend',
        `<div class="level-group"><h4><span class="lv lv-${lv}">${LEVEL_NAMES[lv]}</span> ${group.length} 题</h4>` +
          `<div class="tiles">${group
            .map(({ q, i }) => `<a class="tile ${Progress.status(id, q.id)}" href="#/q/${id}/${q.id}">${i + 1}</a>`)
            .join('')}</div></div>`
      );
    }
  }

  // ---------- 做题 ----------
  async function questionPage(sectionId, qid) {
    const { meta, section } = await loadSection(sectionId);
    if (!section) return showError(page('内容还没准备好', '#/'), '这一节正在制作中。');
    const qs = orderedQuestions(section);
    const index = qs.findIndex(q => q.id === qid);
    if (index < 0) return showError(page('找不到这道题', `#/s/${sectionId}`), '返回小节重新选择吧。');
    const main = page(`${meta.section.no}　${section.title}`, `#/s/${sectionId}`);
    const href = q => (q ? `#/q/${sectionId}/${q.id}` : null);
    Quiz.mount(main, {
      sectionId,
      q: qs[index],
      index,
      total: qs.length,
      prevHref: href(qs[index - 1]),
      nextHref: href(qs[index + 1]),
    });
  }

  // ---------- 真题卷 ----------
  async function loadExam(id) {
    const meta = Content.examMeta(id);
    if (!meta || !meta.exam.ready) return { meta, exam: null };
    try {
      return { meta, exam: await Content.loadExam(id) };
    } catch (e) {
      return { meta, exam: null, error: e };
    }
  }

  async function examPage(id) {
    const { meta, exam } = await loadExam(id);
    if (!exam) return showError(page('真题卷还没准备好', '#/'), '这份试卷正在整理中。');
    const main = page(exam.title, `#/v/${meta.volumeId}`, `${meta.volume.name} · 真题原题`);
    const progressId = 'exam:' + id;
    main.insertAdjacentHTML(
      'beforeend',
      `<p class="notice">题目保持原卷内容；章节归属和难度为系统分析结果。难度采用 1～5 级，不等同于原创题的基础/扩展/挑战档。</p>` +
        `<p class="exam-source">来源：${escapeHtml(exam.source.name)} · 共 ${exam.questions.length} 题</p>` +
        `<h3 class="group">按教材小节练习 <small>已答对 ${Progress.solvedCount(progressId)} / ${exam.questions.length}</small></h3>` +
        `<p class="legend"><i class="solved"></i>答对 <i class="tried"></i>答错过 <i class="revealed"></i>看过解析 <i class="new"></i>未做</p>`
    );

    const usedSections = new Set(exam.questions.map(q => q.section));
    const sectionOrder = Content.sectionMetas()
      .filter(s => s.volumeId === meta.volumeId && usedSections.has(s.section.no))
      .map(s => s.section.no);
    for (const sectionNo of sectionOrder) {
      const group = exam.questions.filter(q => q.section === sectionNo);
      const sectionMeta = Content.sectionMeta(`${meta.volumeId}/${sectionNo}`);
      const title = sectionMeta ? sectionMeta.section.title : group[0].sectionTitle;
      main.insertAdjacentHTML(
        'beforeend',
        `<div class="level-group"><h4><b>${escapeHtml(sectionNo)}</b> ${escapeHtml(title)} · ${group.length} 题</h4>` +
          `<div class="exam-tiles">${group
            .map(q => `<a class="exam-tile ${Progress.status(progressId, q.id)}" href="#/eq/${id}/${q.id}"><span>原题 ${q.originalNo}</span><small>难度 ${q.difficulty}/5 · ${DIFFICULTY_NAMES[q.difficulty]}</small></a>`)
            .join('')}</div></div>`
      );
    }
  }

  async function examQuestionPage(examId, qid) {
    const { meta, exam } = await loadExam(examId);
    if (!exam) return showError(page('真题卷还没准备好', '#/'), '这份试卷正在整理中。');
    const index = exam.questions.findIndex(q => q.id === qid);
    if (index < 0) return showError(page('找不到这道题', `#/e/${examId}`), '返回试卷重新选择吧。');
    const q = exam.questions[index];
    const main = page(exam.title, `#/e/${examId}`, `${q.section} ${q.sectionTitle} · ${q.topic}`);
    const href = item => (item ? `#/eq/${examId}/${item.id}` : null);
    Quiz.mount(main, {
      sectionId: 'exam:' + examId,
      q,
      index,
      total: exam.questions.length,
      numberLabel: `原卷第 ${q.originalNo} 题 · ${index + 1}/${exam.questions.length}`,
      prevHref: href(exam.questions[index - 1]),
      nextHref: href(exam.questions[index + 1]),
    });
  }

  function route() {
    const parts = (location.hash.slice(1) || '/').split('/').filter(Boolean);
    window.scrollTo(0, 0);
    if (parts[0] === 'v') return volumePage(parts.slice(1).join('/'));
    if (parts[0] === 's') return sectionPage(parts.slice(1).join('/'));
    if (parts[0] === 'q') return questionPage(parts.slice(1, -1).join('/'), parts[parts.length - 1]);
    if (parts[0] === 'e') return examPage(parts.slice(1).join('/'));
    if (parts[0] === 'eq') return examQuestionPage(parts.slice(1, -1).join('/'), parts[parts.length - 1]);
    if (parts[0] === 'exam') {
      const app = document.getElementById('app');
      app.innerHTML = '';
      const main = document.createElement('main');
      app.appendChild(main);
      if (parts.length === 1) return Exam.listPage(main);
      const last = parts[parts.length - 1];
      if (last === 'play' || last === 'result') {
        const sectionId = parts.slice(1, -1).join('/');
        return last === 'play' ? Exam.playPage(sectionId, main) : Exam.resultPage(sectionId, main);
      }
      if (parts.length >= 4 && parts[parts.length - 2] === 'result-history') {
        const recordId = parts[parts.length - 1];
        const sectionId = parts.slice(1, -2).join('/');
        if (typeof Exam.historyResultPage === 'function') {
          return Exam.historyResultPage(sectionId, recordId, main);
        }
        location.hash = '#/exam';
        return;
      }
      if (parts[1] === 'v') {
        return Exam.volumePage(parts.slice(2).join('/'), main);
      }
      if (typeof Exam.entryPage === 'function') {
        return Exam.entryPage(parts.slice(1).join('/'), main);
      }
      // 兜底：未登录 → 跳登录
      if (!Accounts.current()) {
        AccountUI.ensureLoggedIn(() => { location.hash = '#/exam'; });
      } else {
        location.hash = '#/exam';
      }
    }
    return home();
  }

  Exam.bindUI({ showError, escapeHtml });
  AccountUI.bindUI({ escapeHtml });

  window.addEventListener('hashchange', route);
  route();
})();
