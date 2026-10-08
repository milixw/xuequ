'use strict';

// 英语单词页面：今日任务（#/words）、本册各单元（#/words/<册ID>）、单元词表（#/words/<册ID>/<单元号>）、一题一屏的练习。
// 分盒、队列、判分逻辑在 src/words.js；朗读在 src/speech.js。

(function () {
  const { escapeHtml } = Quiz;
  const loading = {};
  const VOCAB_PAGE = 'content/english/shanghai-exam-vocabulary.html';

  // 目录里册条目的 words 字段是词表文件路径；用 <script> 按需加载（file:// 下不能 fetch）
  function wordVolumes() {
    return Content.volumes().filter(v => v.volume.words);
  }
  function loadVolume(v) {
    if (Words.volumes[v.id]) return Promise.resolve();
    if (!loading[v.id]) {
      loading[v.id] = new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = v.volume.words;
        el.onload = () => (Words.volumes[v.id] ? resolve() : reject(new Error('词表文件没有注册 ' + v.id)));
        el.onerror = () => { delete loading[v.id]; reject(new Error('词表加载失败：' + v.id)); };
        document.head.appendChild(el);
      });
    }
    return loading[v.id];
  }
  function loadAll() {
    return Promise.all(wordVolumes().map(loadVolume));
  }

  // 当前学期对应的英语册（没有就取第一本有词表的册）
  function currentVolumeId() {
    const grade = Accounts.grade.get(Accounts.current());
    const list = wordVolumes();
    const own = list.find(v => v.volume.id === grade);
    return (own || list[0] || {}).id || null;
  }

  function boxLabel(state) {
    if (!state) return '未学';
    if (state.box === 'M') return '已掌握';
    if (state.box === 'R') return '认读';
    return `第 ${state.box} 盒`;
  }

  function sayButton(text, big) {
    const off = !Speech.available();
    return `<button type="button" class="say${big ? ' say-big' : ''}" data-say="${escapeHtml(text)}"` +
      `${off ? ' disabled title="这台设备暂时不能朗读"' : ''} aria-label="朗读 ${escapeHtml(text)}">🔊</button>`;
  }
  function bindSay(el) {
    el.querySelectorAll('button.say').forEach(btn => btn.addEventListener('click', () => {
      if (!Speech.say(btn.dataset.say)) {
        btn.disabled = true;
        btn.title = '这台设备暂时不能朗读';
      }
    }));
  }

  // 读写都带着打开页面时的账号；切换账号后旧页面拒绝写入
  function storeFor() {
    const scope = LearningStore.scope();
    return {
      ok: () => LearningStore.scope() === scope,
      read: (k, f) => LearningStore.read(k, f),
      write: (k, v) => LearningStore.scope() === scope && LearningStore.write(k, v),
    };
  }

  // ---------- 今日任务 ----------
  async function todayPage(main) {
    main.innerHTML = '<p class="notice">单词数据加载中……</p>';
    try { await loadAll(); } catch { main.innerHTML = '<p class="error">词表暂时无法加载，请刷新重试。</p>'; return; }
    const store = storeFor();
    const data = Words.load(store);
    const date = Words.today();
    const volumeId = currentVolumeId();
    if (!volumeId) {
      main.innerHTML = `<p class="notice">还没有可以背的课本词表。</p>` +
        `<a class="card" href="${VOCAB_PAGE}"><h2>上海中考词汇表</h2><p>查询上海中考英语单词和短语</p></a>`;
      return;
    }
    const list = Words.plan(data, date, { volumeId });
    const stats = data.days[date];
    const v = Content.volume(volumeId);
    const source = Words.newSource(data, volumeId);
    const unitNo = source ? source.split('/').pop() : null;
    const done = !list.due.length && !list.fresh.length;
    main.innerHTML =
      `<section class="card words-today">` +
      (done
        ? `<h2>今天的单词任务完成了</h2><p>${stats ? `今天练了 ${stats.reviewed + stats.learned} 个词。` : ''}明天再来复习效果最好。</p>`
        : `<h2>今天复习 ${list.due.length} 个、新学 ${list.fresh.length} 个</h2><p>约 ${Words.minutes(list)} 分钟` +
          (list.dueTotal > list.due.length ? `；还有 ${list.dueTotal - list.due.length} 个到期的词顺延到明天` : '') + `</p>`) +
      (unitNo ? `<p class="words-source">新词来自 ${escapeHtml(v.volume.name)} Unit ${escapeHtml(unitNo)}</p>` : '') +
      `<div class="words-actions">` +
      (done ? `<button type="button" class="primary" data-act="extra">再来一组</button>`
        : `<button type="button" class="primary" data-act="start">开始</button>`) +
      `</div></section>` +
      `<label class="words-setting">每天新学 <select>${Words.NEW_PER_DAY.map(n =>
        `<option value="${n}"${n === Words.newPerDay(data) ? ' selected' : ''}>${n} 个</option>`).join('')}</select></label>` +
      `<a class="card" href="#/words/${volumeId}"><h2>${escapeHtml(v.volume.name)}单词</h2><p>按单元查看掌握情况，选择要学的单元</p></a>` +
      `<a class="card" href="${VOCAB_PAGE}"><h2>上海中考词汇表</h2><p>查询上海中考英语单词和短语</p></a>`;
    main.querySelector('select').addEventListener('change', e => {
      data.settings.newPerDay = Number(e.target.value);
      Words.save(store, data, date);
      todayPage(main);
    });
    const start = main.querySelector('[data-act]');
    start.addEventListener('click', () => {
      const run = start.dataset.act === 'extra' ? Words.plan(data, date, { volumeId, extra: true }) : list;
      if (start.dataset.act === 'extra') run.due = [];
      if (!run.fresh.length && !run.due.length) {
        start.replaceWith(Object.assign(document.createElement('p'), { textContent: '这一册的词都学过了，可以到单元页选“只练本单元”。' }));
        return;
      }
      runSession(main, store, data, date, run, { back: '#/words' });
    });
  }

  // ---------- 一题一屏 ----------
  function runSession(main, store, data, date, list, options) {
    const s = Words.session(data, date, list, { practice: options.practice });
    let shownAt = Date.now();

    function finish() {
      const r = s.results;
      const tomorrow = Words.dueOn(data, Words.addDays(date, 1));
      main.innerHTML =
        `<section class="card words-done"><h2>${options.practice ? '本单元练完了' : '这一组完成了'}</h2>` +
        (r.scored ? `<p>计分 ${r.scored} 题，答对 ${r.correct} 题（${Math.round(r.correct / r.scored * 100)}%）。</p>` : '') +
        (options.practice ? '<p>“只练本单元”不改变复习进度。</p>' : `<p>明天要复习 ${tomorrow} 个词。</p>`) +
        `<div class="words-actions"><a class="primary" href="${options.back}">返回</a></div></section>`;
      // 练习就在返回目标页上开始（hash 没变），点链接不会触发路由，需要手动重绘
      main.querySelector('.words-done a').addEventListener('click', e => {
        if (location.hash !== options.back) return;
        e.preventDefault();
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });
    }

    function persist() {
      if (options.practice) return;
      if (!store.ok() || !Words.save(store, data, date)) {
        main.insertAdjacentHTML('afterbegin', '<p class="error">进度没能保存：账号已切换或存储空间不足。</p>');
      }
    }

    function show() {
      const task = s.next();
      if (!task) { persist(); return finish(); }
      if (!store.ok()) { main.innerHTML = '<p class="error">账号已切换，请返回重新开始。</p>'; return; }
      shownAt = Date.now();
      const entry = Words.find(task.key);
      const head = `<p class="words-progress">还剩 ${s.remaining()} 步</p>`;
      if (task.mode === 'card') return showCard(entry, head);
      let mode = task.mode;
      const state = data.words[task.key];
      if (mode === 'L4' && !Words.cloze(entry.word, state)) mode = 'L3';
      if (mode === 'L1' || mode === 'L2') return showChoice(entry, mode, state, head);
      return showTyping(entry, mode, state, head);
    }

    function done(correct, feedbackEl, html) {
      s.addTime(Date.now() - shownAt);
      s.answer(correct);
      persist();
      feedbackEl.innerHTML = html;
      feedbackEl.className = 'words-feedback ' + (correct ? 'ok' : 'fail');
      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'primary';
      next.textContent = '下一个';
      next.addEventListener('click', show);
      feedbackEl.appendChild(next);
      next.focus();
    }

    function wordLine(word) {
      return `<p class="words-meaning"><span class="pos">${escapeHtml(word.pos || '')}</span> ${escapeHtml(word.zh)}</p>`;
    }

    function showCard(entry, head) {
      const w = entry.word;
      main.innerHTML = head +
        `<section class="card words-card"><span class="tag">新词</span>` +
        `<h2 class="words-head">${escapeHtml(w.w)} ${sayButton(w.w)}</h2>` +
        (w.ipa ? `<p class="words-ipa">${escapeHtml(w.ipa)}</p>` : '') + wordLine(w) +
        ((w.forms || []).length ? `<p class="words-forms">变形：${w.forms.map(escapeHtml).join('，')}</p>` : '') +
        (w.ex || []).map(ex => `<p class="words-ex">${escapeHtml(ex.en.replace(/\[\[([^\]]+)\]\]/g, '$1'))}<br><span>${escapeHtml(ex.zh)}</span></p>`).join('') +
        `<div class="words-actions"><button type="button" class="primary" data-k="0">记住了，开始练</button>` +
        `<button type="button" data-k="1">我认识</button></div></section>`;
      bindSay(main);
      main.querySelectorAll('[data-k]').forEach(btn => btn.addEventListener('click', () => {
        s.card(btn.dataset.k === '1');
        show();
      }));
    }

    function showChoice(entry, mode, state, head) {
      const w = entry.word;
      const { options: opts, answer } = Words.choices(entry, mode);
      // L2 隔次改成“只听发音”；不能朗读时退回看中文
      const listen = mode === 'L2' && (state ? state.seen || 0 : 0) % 2 === 1 && Speech.available();
      const prompt = mode === 'L1'
        ? `<h2 class="words-head">${escapeHtml(w.w)} ${sayButton(w.w)}</h2>${w.ipa ? `<p class="words-ipa">${escapeHtml(w.ipa)}</p>` : ''}<p class="words-ask">选出中文意思</p>`
        : listen ? `<div class="words-listen">${sayButton(w.w, true)}</div><p class="words-ask">听发音，选出这个词</p>`
          : `${wordLine(w)}<p class="words-ask">选出对应的英文</p>`;
      main.innerHTML = head + `<section class="card words-q">${prompt}<div class="words-options">` +
        opts.map((o, i) => `<button type="button" data-i="${i}">${escapeHtml(o)}</button>`).join('') +
        `</div><div class="words-feedback" aria-live="polite"></div></section>`;
      bindSay(main);
      if (listen) Speech.say(w.w);
      const fb = main.querySelector('.words-feedback');
      main.querySelectorAll('[data-i]').forEach(btn => btn.addEventListener('click', () => {
        const i = Number(btn.dataset.i);
        main.querySelectorAll('[data-i]').forEach(b => { b.disabled = true; });
        main.querySelector(`[data-i="${answer}"]`).classList.add('right');
        if (i !== answer) btn.classList.add('wrong');
        done(i === answer, fb, i === answer ? '答对了' :
          `正确答案：${escapeHtml(opts[answer])}${mode === 'L1' ? '' : `（${escapeHtml(w.zh)}）`}`);
      }));
    }

    function showTyping(entry, mode, state, head) {
      const w = entry.word;
      const c = mode === 'L4' ? Words.cloze(w, state) : null;
      const want = c ? c.answer : w.w;
      const prompt = c
        ? `<p class="words-ask">用括号里的词的正确形式填空</p>` +
          `<p class="words-cloze">${escapeHtml(c.before)}<span class="words-gap">____</span> (${escapeHtml(w.w)})${escapeHtml(c.after)}</p>` +
          `<p class="words-cloze-zh">${escapeHtml(c.zh)}</p>`
        : `${wordLine(w)}<p class="words-ask">写出这个词 ${sayButton(w.w)}</p>`;
      main.innerHTML = head + `<section class="card words-q">${prompt}` +
        `<form class="words-type"><input type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="en" aria-label="填写英文">` +
        `<button type="submit" class="primary">提交</button></form>` +
        `<div class="words-feedback" aria-live="polite"></div></section>`;
      bindSay(main);
      const form = main.querySelector('form');
      const input = form.querySelector('input');
      input.focus();
      const fb = main.querySelector('.words-feedback');
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!input.value.trim()) return;
        const ok = Answer.checkBlank({ kind: 'en', answer: want }, input.value).ok;
        input.disabled = true;
        form.querySelector('button').disabled = true;
        if (ok) return done(true, fb, `答对了${c ? `：${escapeHtml(c.plain)}` : ''}`);
        const at = Answer.firstDiff(input.value, want);
        const typed = Answer.normalizeEn(input.value);
        const mark = `${escapeHtml(typed.slice(0, at))}<mark>${escapeHtml(typed.slice(at, at + 1) || '␣')}</mark>${escapeHtml(typed.slice(at + 1))}`;
        done(false, fb, `你写的：${mark}<br>正确答案：<strong>${escapeHtml(want)}</strong>（从第 ${at + 1} 个字母开始不对）` +
          (c ? `<br>${escapeHtml(c.plain)}` : ''));
      });
    }

    show();
  }

  // ---------- 本册各单元 ----------
  async function volumePage(main, volumeId) {
    const v = Content.volume(volumeId);
    if (!v || !v.volume.words) { main.innerHTML = '<p class="error">这一册还没有词表。</p>'; return; }
    try { await loadAll(); } catch { main.innerHTML = '<p class="error">词表暂时无法加载，请刷新重试。</p>'; return; }
    const data = Words.load(storeFor());
    const def = Words.volumes[volumeId];
    main.innerHTML = (def.review && def.review.status !== 'approved'
      ? '<p class="notice">释义来自课本词汇表，例句由 AI 编写，尚未经过老师审核。</p>' : '') +
      '<section class="chapter">' + def.units.map(unit => {
        const sum = Words.unitSummary(data, Words.unitId(volumeId, unit.no));
        const chosen = data.settings.unit === Words.unitId(volumeId, unit.no);
        return `<a class="row" href="#/words/${volumeId}/${unit.no}"><span class="no">U${unit.no}</span>` +
          `<span class="name">${escapeHtml(unit.title)}${chosen ? ' · 正在学' : ''}</span>` +
          `<span class="count">${sum.mastered}/${sum.total}</span>` +
          `<span class="bar-bg"><span style="width:${sum.total ? sum.mastered / sum.total * 100 : 0}%"></span></span></a>`;
      }).join('') + '</section>';
  }

  // ---------- 单元词表 ----------
  async function unitPage(main, volumeId, no) {
    try { await loadAll(); } catch { main.innerHTML = '<p class="error">词表暂时无法加载，请刷新重试。</p>'; return; }
    const def = Words.volumes[volumeId];
    const unit = def && def.units.find(u => String(u.no) === String(no));
    if (!unit) { main.innerHTML = '<p class="error">找不到这个单元的词表。</p>'; return; }
    const store = storeFor();
    const data = Words.load(store);
    const uid = Words.unitId(volumeId, unit.no);
    const sum = Words.unitSummary(data, uid);
    const list = Words.entries(uid);
    main.innerHTML =
      `<p class="words-summary">已掌握 ${sum.mastered} / 共 ${sum.total}，已学 ${sum.learned}</p>` +
      `<div class="words-actions"><button type="button" class="primary" data-act="learn">${data.settings.unit === uid ? '正在学这一单元' : '学这一单元'}</button>` +
      `<button type="button" data-act="practice"${sum.learned ? '' : ' disabled'}>只练本单元</button></div>` +
      `<ul class="words-list">${list.map(e => `<li><span class="w">${escapeHtml(e.word.w)}</span>${sayButton(e.word.w)}` +
        `<span class="zh">${escapeHtml(e.word.zh)}</span><span class="box">${boxLabel(data.words[e.key])}</span></li>`).join('')}</ul>`;
    bindSay(main);
    main.querySelector('[data-act="learn"]').addEventListener('click', () => {
      data.settings.unit = uid;
      Words.save(store, data);
      location.hash = '#/words';
    });
    main.querySelector('[data-act="practice"]').addEventListener('click', () => {
      const learned = list.filter(e => data.words[e.key]);
      runSession(main, store, data, Words.today(), { due: learned, fresh: [] }, { practice: true, back: `#/words/${volumeId}/${unit.no}` });
    });
  }

  // 册页面每个 Unit 下的“单词”行
  async function chapterRow(volumeId, chapterNo) {
    const v = Content.volume(volumeId);
    if (!v || !v.volume.words) return '';
    try { await loadVolume(v); } catch { return ''; }
    const def = Words.volumes[volumeId];
    if (!def.units.some(u => String(u.no) === String(chapterNo))) return '';
    const sum = Words.unitSummary(Words.load(storeFor()), Words.unitId(volumeId, chapterNo));
    return `<a class="row words-row" href="#/words/${volumeId}/${chapterNo}"><span class="no">词</span>` +
      `<span class="name">单词 · 已掌握 ${sum.mastered} / 共 ${sum.total}</span>` +
      `<span class="bar-bg"><span style="width:${sum.total ? sum.mastered / sum.total * 100 : 0}%"></span></span></a>`;
  }

  window.WordsUI = { todayPage, volumePage, unitPage, chapterRow, loadAll };
})();
