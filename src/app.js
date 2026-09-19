'use strict';

// 应用外壳：hash 路由 + 页面渲染
//   #/                 首页：各学科的册
//   #/v/<册ID>          册：章节列表
//   #/s/<小节ID>        小节：知识点 + 题目列表
//   #/q/<小节ID>/<题目ID> 做题

(function () {
  const app = document.getElementById('app');
  const { renderText, escapeHtml, LEVEL_NAMES } = Quiz;
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

  // ---------- 首页 ----------
  function home() {
    const main = page('学趣闯关', null, '跟着课本学，一节一关');
    for (const v of Content.volumes()) {
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
    const games = document.createElement('section');
    games.innerHTML =
      `<h3 class="group">趣味玩法</h3>` +
      `<a class="card" href="src/games/function-track/index.html">` +
      `<h2>函数轨道</h2><p>调整函数参数，让小球沿着图像到达终点。适合学完一次函数、二次函数后玩。</p></a>`;
    main.appendChild(games);
  }

  // ---------- 册 ----------
  async function volumePage(id) {
    const v = Content.volume(id);
    if (!v) return showError(page('找不到这一册', '#/'), '链接可能有误，请返回首页。');
    const main = page(v.volume.name, '#/', `${v.subject.name} · ${v.edition.name}`);
    const metas = Content.sectionMetas().filter(s => s.volumeId === id);
    // 预先加载已上线的小节，用来显示题目总数
    await Promise.all(metas.filter(s => s.section.ready).map(s => Content.load(s.id).catch(() => null)));

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

  function route() {
    const parts = (location.hash.slice(1) || '/').split('/').filter(Boolean);
    window.scrollTo(0, 0);
    if (parts[0] === 'v') return volumePage(parts.slice(1).join('/'));
    if (parts[0] === 's') return sectionPage(parts.slice(1).join('/'));
    if (parts[0] === 'q') return questionPage(parts.slice(1, -1).join('/'), parts[parts.length - 1]);
    return home();
  }

  window.addEventListener('hashchange', route);
  route();
})();
