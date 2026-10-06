'use strict';

// 应用外壳：hash 路由 + 页面渲染
//   #/                 首页：各学科的册
//   #/v/<册ID>          册：章节列表
//   #/s/<小节ID>        小节：知识点 + 题目列表
//   #/q/<小节ID>/<题目ID> 做题
//   #/e/<真题卷ID>      真题卷：按教材小节归类
//   #/eq/<真题卷ID>/<题目ID> 做真题
//   #/exam...           限时测试（src/exam.js 负责渲染）
//   #/g/<游戏ID>[/<关卡ID>] 挂在小节上的动手玩游戏（window.Games 里注册）
//   #/english-bank[/<题目ID>] 英语错题库
//   #/english-plan[/<天数>[/(result|retry)/<记录ID>]] 英语七天复习计划、每日作答、错题记录与重做

(function () {
  const app = document.getElementById('app');
  const { renderText, escapeHtml, LEVEL_NAMES, DIFFICULTY_NAMES } = Quiz;
  const LEVEL_ORDER = ['basic', 'extended', 'challenge'];
  // 题目按 基础 → 扩展 → 挑战 排序，同档内保持文件中的顺序
  function orderedQuestions(section) {
    return LEVEL_ORDER.flatMap(lv => section.questions.filter(q => q.level === lv));
  }

  // 英语原创阅读用 [[词或短语]] 标注重点词；正文始终先转义，不能把内容当 HTML 执行。
  function renderReading(reading) {
    const entries = new Map(reading.vocabulary.map((item, i) => [item.term, { ...item, number: i + 1 }]));
    const paragraphs = reading.paragraphs.map((paragraph, paragraphIndex) => {
      const sentences = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
      return `<div class="reading-paragraph">${sentences.map((sentence, sentenceIndex) => {
        const english = sentence.trim().split(/(\[\[[^\]]+\]\])/g).map(part => {
          const match = /^\[\[([^\]]+)\]\]$/.exec(part);
          if (!match) return escapeHtml(part);
          const entry = entries.get(match[1]);
          if (!entry) return escapeHtml(part);
          return `<mark class="reading-term" title="${escapeHtml(entry.meaning)}" aria-label="${escapeHtml(entry.term + '：' + entry.meaning)}">` +
            `${escapeHtml(entry.term)}<sup>${entry.number}</sup></mark>`;
        }).join('');
        const translation = reading.translations[paragraphIndex][sentenceIndex];
        return `<div class="reading-line"><p class="reading-en">${english}</p>` +
          `<p class="reading-translation" lang="zh-CN">${escapeHtml(translation)}</p></div>`;
      }).join(' ')}</div>`;
    }).join('');
    return `<h3 class="group">单元阅读 · 原创</h3><article class="card unit-reading">` +
      `<div class="reading-heading"><h2>${escapeHtml(reading.title)}</h2>` +
      `<label class="reading-toggle"><input type="checkbox">显示翻译</label></div>${paragraphs}` +
      `<h3>重点词与短语</h3><ol>${reading.vocabulary.map(item =>
        `<li><strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.meaning)}</span></li>`).join('')}</ol></article>`;
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

  // 首页“趣味玩法”的宫格。挂在小节上的游戏（#/g/...）也可以放进来，从首页进去时返回键回首页
  // when：什么时候适合玩（课本位置），按课本顺序排
  const FUN_GAMES = [
    { name: '24 点', tag: '有理数运算', when: '六上第 1 章', icon: '24', color: '#c0513a', href: 'src/games/24/index.html' },
    { name: '数学魔术', tag: '字母表示数', when: '六上第 2 章', icon: '?!', color: '#8a4fb0', href: '#/g/magic' },
    { name: '天平解方程', tag: '等式的性质', when: '六上第 3 章', icon: '=', color: '#3f9a5a', href: '#/g/balance' },
    { name: '费马点', tag: '距离和最小', when: '七下第 18 章', icon: 'P', color: '#c2417a', href: '#/g/fermat' },
    { name: '函数轨道', tag: '一次、二次函数', when: '八下第 25 章', icon: 'y=', color: '#b46a24', href: 'src/games/function-track/index.html' },
    { name: '取石子', tag: '策略推理', when: '不限年级', icon: '●●', color: '#2f6f7a', href: 'src/games/nim/index.html' },
    { name: '立体图形', tag: '展开图 · 截面', when: '不限年级', icon: '◆', color: '#2f6fd6', href: 'src/games/solids/index.html' },
  ];

  function appendVolumeCard(main, v) {
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

  // ---------- 首页 ----------
  function home() {
    const main = page('学趣闯关', null, '跟着课本学，一节一关');
    const header = app.querySelector('header.bar');
    const username = Accounts.current();
    const semester = Content.semester(Accounts.grade.get(username));
    mountSemesterSwitcher(header, semester && semester.id, username);
    AccountUI.mount(header);
    const volumes = semester ? Content.volumes().filter(v => v.volume.id === semester.id) : [];
    volumes.forEach(v => appendVolumeCard(main, v));
    const exam = document.createElement('a');
    exam.className = 'card volume exam-entry';
    exam.innerHTML =
      `<span class="tag">试卷</span>` +
      `<h2>试卷</h2>` +
      `<p>先交卷，再看分数和错题解析</p>`;
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

    const shanghai = document.createElement('section');
    shanghai.innerHTML = '<h3 class="group">上海中考真题</h3>';
    for (const entry of [
      { title: '数学中考真题', desc: '按年份练习上海数学原题', href: '#/shanghai-papers/math' },
      { title: '语文中考真题', desc: '整篇阅读作答，查看原资料参考答案', href: '#/shanghai-papers/chinese' },
      { title: '物理中考真题', desc: '按年份练习上海物理原题和原答案', href: '#/shanghai-papers/physics' },
      { title: '化学中考真题', desc: '按年份练习上海化学原题和原答案', href: '#/shanghai-papers/chemistry' },
    ]) {
      const link = document.createElement('a');
      link.className = 'card'; link.href = entry.href;
      link.innerHTML = `<h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.desc)}</p>`;
      shanghai.appendChild(link);
    }
    main.appendChild(shanghai);
    const english = document.createElement('section');
    english.className = 'home-english';
    english.innerHTML = '<h3 class="group">英语</h3>';
    for (const entry of [
      { title: '英语学习大纲', desc: '查看上海初中英语知识点梳理', href: 'content/english/shanghai-junior-outline.html' },
      { title: '英语单词', desc: '查询上海中考英语单词和短语', href: 'content/english/shanghai-exam-vocabulary.html' },
      { title: '英语试题库', desc: '按知识点和题型练习错题', href: '#/english-bank' },
      { title: '英语中考真题', desc: '按年份直接作答上海英语中考文字题', href: '#/english-exams' },
    ]) {
      const link = document.createElement('a');
      link.className = 'card home-english-entry';
      link.href = entry.href;
      link.innerHTML = `<h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.desc)}</p>`;
      english.appendChild(link);
    }
    main.appendChild(english);
    // 趣味玩法：宫格，每格只写名字、练什么、课本位置，详细玩法进了游戏再看
    const games = document.createElement('section');
    games.innerHTML =
      `<h3 class="group">趣味玩法</h3><div class="fun-grid">` +
      FUN_GAMES.map(g =>
        `<a class="fun-tile" href="${g.href}"><span class="icon" style="background:${g.color}">${g.icon}</span>` +
        `<b>${escapeHtml(g.name)}</b><small>${escapeHtml(g.tag)}</small><i class="when">${escapeHtml(g.when)}</i></a>`).join('') +
      `</div>`;
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
      const chapterLabel = v.subject.id === 'english' ? `Unit ${chapter.no}` : `第 ${chapter.no} 章`;
      box.innerHTML = `<h3 class="group">${chapterLabel}　${escapeHtml(chapter.title)}</h3>`;
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
            ? `<span class="count">${solved}/${total}</span><span class="bar-bg"><span style="width:${total ? (solved / total) * 100 : 0}%"></span></span>`
            : `<span class="count soon">制作中</span>`);
        box.appendChild(row);
        for (const g of sectionGames(s.section)) {
          const p = g.progress();
          box.insertAdjacentHTML('beforeend',
            `<a class="row game-row" href="#/g/${g.id}"><span class="no">玩</span>` +
            `<span class="name">${escapeHtml(g.title)}</span><span class="count">${p.done}/${p.total} 关</span></a>`);
        }
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

  // ---------- 动手玩 ----------
  // 目录里小节的 games 字段列出挂在这一节的游戏，游戏脚本在 index.html 里加载并注册到 window.Games
  function sectionGames(section) {
    return (section.games || []).map(id => window.Games && window.Games[id]).filter(Boolean);
  }

  function gamePage(id, levelId, fromHome) {
    const g = window.Games && window.Games[id];
    if (!g) return showError(page('找不到这个游戏', '#/'), '链接可能有误，请返回首页。');
    const meta = Content.sectionMeta(g.section);
    const main = page(g.title, fromHome ? '#/' : `#/s/${g.section}`, meta ? `${meta.section.no} ${meta.section.title} · 动手玩` : '动手玩');
    g.mount(main, levelId);
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
    if (!meta) return showError(page('找不到这一节', '#/'), '链接可能有误，请返回首页。');
    if (!section) return showError(page('内容还没准备好', `#/v/${meta.volumeId}`), '这一节正在制作中。');
    const chapterLabel = meta.subject.id === 'english' ? `Unit ${meta.chapter.no}` : `第 ${meta.chapter.no} 章`;
    const main = page(`${meta.section.no}　${section.title}`, `#/v/${meta.volumeId}`, `${chapterLabel} ${meta.chapter.title}`);

    if (section.review.status !== 'approved') {
      main.insertAdjacentHTML('beforeend', '<p class="notice">本节内容由 AI 编写，尚未经过老师审核，如发现错误欢迎反馈。</p>');
    }

    if (section.reading) {
      main.insertAdjacentHTML('beforeend', renderReading(section.reading));
      const readingEl = main.querySelector('.unit-reading');
      readingEl.querySelector('.reading-toggle input').addEventListener('change', event => {
        readingEl.classList.toggle('show-translations', event.target.checked);
      });
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
      // 知识点卡片里的演示动画（如图形的平移、旋转过程），放在卡片末尾
      if (card.demo && window.Demos) Demos.mount(main.lastElementChild, card.demo);
    }

    if (section.bankExamples && section.bankExamples.length) {
      main.insertAdjacentHTML('beforeend', '<h3 class="group">题库原题 · 知识点例题</h3>');
      main.insertAdjacentHTML('beforeend', '<p class="notice">例题和参考答案来自已导入题库，尚待人工逐题核对；原题文本未改动。</p>');
      let bank = [];
      try { bank = await EnglishBank.load(); } catch (e) {
        main.insertAdjacentHTML('beforeend', '<p class="notice">题库暂时无法加载，请稍后重试。</p>');
      }
      for (const [index, example] of section.bankExamples.entries()) {
        const original = bank.find(q => q.id === example.id);
        if (!original) continue;
        main.insertAdjacentHTML('beforeend',
          `<article class="card unit-bank-example"><h2>例题 ${index + 1} · ${escapeHtml(example.point)}</h2>` +
          `<div class="unit-bank-original">${escapeHtml(original.text)}</div>` +
          `<details><summary>查看答案与讲解</summary><p><b>参考答案：${escapeHtml(original.answer || '待核对')}</b></p>` +
          `<ol>${example.explain.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol></details>` +
          `<a class="unit-bank-link" href="#/english-bank/${escapeHtml(example.id)}">打开题库原题作答</a></article>`);
      }
    }

    const games = sectionGames(meta.section);
    if (games.length) {
      main.insertAdjacentHTML('beforeend', '<h3 class="group">动手玩</h3>');
      for (const g of games) {
        const p = g.progress();
        main.insertAdjacentHTML(
          'beforeend',
          `<a class="card game-card" href="#/g/${g.id}"><h2>${escapeHtml(g.title)}</h2>` +
            `<p>${escapeHtml(g.desc)}</p><p class="meta">已过 ${p.done} / ${p.total} 关</p></a>`
        );
      }
    }

    const qs = orderedQuestions(section);
    main.insertAdjacentHTML(
      'beforeend',
      `<h3 class="group">原创练习 <small>已答对 ${Progress.solvedCount(id)} / ${qs.length}</small></h3>` +
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

  // 上一个页面：从首页进游戏时返回键回首页，其余回游戏所在的小节
  let prevParts = [];

  async function englishBankPage(id) {
    const main = page(id ? '英语试题' : '英语试题库', id ? '#/english-bank' : '#/', '先学知识点，再练错题');
    try {
      const questions = await EnglishBank.load();
      if (id) EnglishBank.detailPage(main, questions, id);
      else EnglishBank.listPage(main, questions);
    } catch (error) {
      showError(main, '英语试题库暂时无法加载，请稍后重试。');
    }
  }

  // 真题数据体积大（江苏英语约 3MB），首屏不加载，进入对应页面时再用 <script> 加载（file:// 下不能用 fetch）
  const DATA_SCRIPTS = {
    EnglishPastPapers: 'content/english/past-papers/catalog.js?v=20261003-shanghai-answers',
    JiangsuEnglishPastPapers: 'content/english/past-papers/jiangsu.js?v=20261003-jiangsu-answers',
    ShanghaiSubjectPapers: 'content/past-papers/shanghai.js?v=20261004-images',
  };
  const dataLoading = {};

  function loadData(name) {
    if (window[name]) return Promise.resolve(window[name]);
    if (!dataLoading[name]) {
      dataLoading[name] = new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = DATA_SCRIPTS[name];
        el.onload = () => (window[name] ? resolve(window[name]) : reject(new Error('数据文件没有注册 ' + name)));
        el.onerror = () => {
          delete dataLoading[name];
          reject(new Error('数据加载失败：' + name));
        };
        document.head.appendChild(el);
      });
    }
    return dataLoading[name];
  }

  // 数据齐了再渲染页面；没加载过时先显示“加载中”，加载期间切走了页面就不再渲染
  async function withData(names, title, backHref, render) {
    const hash = location.hash;
    if (names.some(n => !window[n])) page(title, backHref).innerHTML = '<p class="notice">真题数据加载中……</p>';
    try {
      await Promise.all(names.map(loadData));
    } catch (error) {
      if (location.hash === hash) showError(page(title, backHref), '真题数据暂时无法加载，请检查网络后刷新重试。');
      return;
    }
    if (location.hash === hash) render();
  }

  function englishExamsPage(region, city, year) {
    if (!region) {
      const main = page('英语中考真题', '#/', '按地区、城市和年份查看');
      return EnglishExams.renderRegions(main, EnglishPastPapers, JiangsuEnglishPastPapers);
    }
    if (region === 'jiangsu') {
      const catalog = JiangsuEnglishPastPapers;
      if (!city) return EnglishExams.renderCities(page('江苏英语中考真题', '#/english-exams', '选择城市'), catalog);
      const entry = catalog.cities.find(c => c.id === city);
      if (!entry) return showError(page('未收录这一城市', '#/english-exams/jiangsu'), '请返回江苏城市目录。');
      const paper = year && EnglishExams.find(catalog, year, city);
      const main = page(year ? (paper ? paper.title : '未收录这一年份') : entry.name + '英语中考真题',
        year ? '#/english-exams/jiangsu/' + city : '#/english-exams/jiangsu', '江苏' + entry.name + ' · 网页文字作答');
      if (year) EnglishExams.renderYear(main, catalog, year, city);
      else EnglishExams.renderList(main, catalog, city);
      return;
    }
    // Preserve old /<year> bookmarks and Shanghai progress keys.
    const shanghaiYear = region === 'shanghai' ? city : region;
    const paper = shanghaiYear && EnglishExams.find(EnglishPastPapers, shanghaiYear);
    const main = page(shanghaiYear ? (paper ? paper.title : '未收录这一年份') : '上海英语中考真题',
      shanghaiYear ? '#/english-exams/shanghai' : '#/english-exams', '上海历年原题 · 网页文字作答');
    if (shanghaiYear) EnglishExams.renderYear(main, EnglishPastPapers, shanghaiYear);
    else EnglishExams.renderList(main, EnglishPastPapers);
  }

  function subjectPapersPage(subject, year) {
    const name = { math: '数学', chinese: '语文', physics: '物理', chemistry: '化学' }[subject];
    const paper = year && SubjectPapers.find(ShanghaiSubjectPapers, subject, year);
    const main = page(year ? (paper ? paper.title : '未收录这一年份') : '上海' + (name || '') + '中考真题',
      year ? '#/shanghai-papers/' + subject : '#/', '上海原题 · 部分导入 · 待教师审核');
    if (year) SubjectPapers.renderYear(main, ShanghaiSubjectPapers, subject, year);
    else SubjectPapers.renderList(main, ShanghaiSubjectPapers, subject);
  }

  async function englishPlanPage(day, view, reportId) {
    const main = page(view === 'retry' ? `第 ${day} 天 · 错题重做` : view === 'result' ? `第 ${day} 天 · 错题回顾` :
      (day ? `英语复习 · 第 ${day} 天` : '英语 7 天复习计划'),
      view === 'retry' ? `#/english-plan/${day}/result/${reportId}` : view === 'result' ? `#/english-plan/${day}` :
        (day ? '#/english-plan' : '#/english-bank'), '按知识点复习错题');
    try {
      const questions = await EnglishBank.load();
      if (day && view === 'retry') EnglishPlan.renderRetry(main, questions, day, reportId);
      else if (day && view === 'result') EnglishPlan.renderResult(main, questions, day, reportId);
      else if (day) EnglishPlan.renderDay(main, questions, day);
      else EnglishPlan.renderOverview(main, questions);
    } catch (error) {
      showError(main, '英语复习计划暂时无法加载，请稍后重试。');
    }
  }

  function route() {
    EnglishExams.stopMedia();
    const parts = (location.hash.slice(1) || '/').split('/').filter(Boolean);
    const prev = prevParts;
    prevParts = parts;
    window.scrollTo(0, 0);
    if (parts[0] === 'english-bank') return englishBankPage(parts[1]);
    if (parts[0] === 'english-exams') {
      const names = !parts[1] ? ['EnglishPastPapers', 'JiangsuEnglishPastPapers']
        : parts[1] === 'jiangsu' ? ['JiangsuEnglishPastPapers'] : ['EnglishPastPapers'];
      return withData(names, '英语中考真题', parts[1] ? '#/english-exams' : '#/', () => englishExamsPage(parts[1], parts[2], parts[3]));
    }
    if (parts[0] === 'shanghai-papers') {
      return withData(['ShanghaiSubjectPapers'], '上海中考真题', '#/', () => subjectPapersPage(parts[1], parts[2]));
    }
    if (parts[0] === 'english-plan') return englishPlanPage(parts[1], parts[2], parts[3]);
    if (parts[0] === 'v') return volumePage(parts.slice(1).join('/'));
    if (parts[0] === 's') return sectionPage(parts.slice(1).join('/'));
    if (parts[0] === 'q') return questionPage(parts.slice(1, -1).join('/'), parts[parts.length - 1]);
    if (parts[0] === 'g') return gamePage(parts[1], parts[2], prev.length === 0);
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
