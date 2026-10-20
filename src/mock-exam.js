'use strict';

// 模拟考试：私有库里的整卷试卷与解析（页面图片），限时作答、交卷后看解析、自己填分数。
// 学科页（语数英）“考试”组的“模拟考试”行、首页“今天”的进行中提示、#/mock 页面。资料和解锁都靠 src/private-ui.js（manifest.exams，口令服务按 exams:<卷集ID> 授权）。
// 学生在纸上作答，页面只管计时和翻看；不做在线判分。
// 设计文档：docs/superpowers/specs/2026-10-17-mock-exam.md

(function (root) {
  const KEY = 'xq.mockExam.v1';
  const HISTORY_MAX = 10;
  const WARN_SEC = 5 * 60; // 最后 5 分钟倒计时变色
  const SUBJECTS = [['chinese', '语文'], ['math', '数学'], ['english', '英语']];
  const subjectName = id => (SUBJECTS.find(x => x[0] === id) || [id, id])[1];

  // ---------- 本机记录：{ "<卷集ID>/<卷ID>": { startedAt?, history: [{ at, usedSec, score? }] } } ----------
  function loadAll() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '{}');
      return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
    } catch {
      return {};
    }
  }
  function saveAll(all) {
    try {
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch {
      // 存不了（隐私模式等）就只在本页有效
    }
  }
  function getRecord(key) {
    const r = loadAll()[key];
    return {
      startedAt: r && typeof r.startedAt === 'number' ? r.startedAt : null,
      history: r && Array.isArray(r.history) ? r.history.filter(h => h && typeof h.at === 'number') : [],
    };
  }
  function putRecord(key, rec) {
    const all = loadAll();
    all[key] = { ...(rec.startedAt ? { startedAt: rec.startedAt } : {}), history: rec.history.slice(-HISTORY_MAX) };
    saveAll(all);
  }

  // 剩余秒数（可能为负）
  function remainingSec(rec, minutes, now) {
    return Math.ceil((rec.startedAt + minutes * 60000 - now) / 1000);
  }
  // 交卷：用时不超过限时，记一条历史，清掉计时
  function submit(rec, minutes, now) {
    const usedSec = Math.max(0, Math.min(minutes * 60, Math.round((now - rec.startedAt) / 1000)));
    return { startedAt: null, history: [...rec.history, { at: now, usedSec }].slice(-HISTORY_MAX) };
  }
  // 分数：0～上限的数，允许半分；不对返回 null
  function parseScore(text, max) {
    const t = String(text).trim();
    if (!/^\d+(\.5)?$/.test(t)) return null;
    const n = Number(t);
    return n <= max ? n : null;
  }
  function clock(sec) {
    const s = Math.max(0, sec);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, '0')}`;
  }
  function duration(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m ? `${m} 分${s ? ` ${s} 秒` : '钟'}` : `${s} 秒`;
  }
  function day(ms) {
    const d = new Date(ms);
    return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }

  // ---------- 计时器：换页时 app.js 调 stop() ----------
  let timer = null;
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // ---------- 学科页入口：有这一科的卷子或可以解锁时才出现 ----------
  // slot：占位元素，出现时换成 makeRow(entry) 返回的行，不出现就删掉；entry 是 { icon, title, desc, href }
  function entryRow(slot, subjectId, makeRow) {
    PrivateUI.state().then(s => {
      if (!slot.isConnected) return;
      const sets = Object.values(PrivateUI.examSets());
      if (s === 'none' || (s === 'unlocked' && !sets.some(set => set.papers.some(p => p.subject === subjectId)))) {
        slot.remove();
        return;
      }
      const row = makeRow({ icon: '模', title: '模拟考试', desc: '整卷限时做，交卷后看解析', href: '#/mock' });
      if (s === 'locked') {
        row.addEventListener('click', e => {
          e.preventDefault();
          openUnlock(() => { location.hash = '#/mock'; });
        });
      }
      slot.replaceWith(row);
    });
  }

  // 首页“今天”：正在做、还没到时间的那份卷子；没有返回 null
  function inProgress() {
    return PrivateUI.state().then(s => {
      if (s !== 'unlocked') return null;
      const now = Date.now();
      for (const [setId, set] of Object.entries(PrivateUI.examSets())) {
        for (const paper of set.papers) {
          const rec = getRecord(`${setId}/${paper.id}`);
          const sec = rec.startedAt ? remainingSec(rec, paper.minutes, now) : 0;
          if (sec > 0) return { href: `#/mock/${setId}/${paper.id}`, title: paper.title, minutesLeft: Math.ceil(sec / 60) };
        }
      }
      return null;
    });
  }
  function openUnlock(onDone) {
    PrivateUI.openUnlock(onDone, '📝 模拟考试', '输入口令后可以做模拟卷、看解析（30 天内不用再输）。');
  }

  // ---------- 页面 ----------
  // parts：#/mock 之后的部分；ui：app.js 的 { page, showError, escapeHtml }
  //   []                → 能看的卷集；只有一个就直接进去
  //   [卷集ID]           → 卷子按学科分组，复习资料在最上面
  //   [卷集ID, 'review'] → 复习资料翻看
  //   [卷集ID, 卷ID]     → 一份卷子：开始前 / 作答中 / 交卷后
  async function mockPage(parts, ui) {
    const hash = location.hash;
    const s = await PrivateUI.state();
    if (location.hash !== hash) return;
    if (s !== 'unlocked') {
      const main = ui.page('模拟考试', '#/');
      if (s === 'locked') {
        main.innerHTML = '<p class="notice">请用老师或家长发的分享链接打开，打开一次 30 天内都能用；也可以输入口令。</p><p><button type="button" class="mk-btn primary mk-unlock">输入口令</button></p>';
        main.querySelector('.mk-unlock').onclick = () => openUnlock(() => root.dispatchEvent(new Event('hashchange')));
      } else {
        ui.showError(main, '这里没有模拟考试的资料。');
      }
      return;
    }
    const sets = PrivateUI.examSets();
    const ids = Object.keys(sets);
    if (!parts.length) {
      if (ids.length === 1) return location.replace('#/mock/' + ids[0]);
      return setsPage(sets, ui);
    }
    const set = sets[parts[0]];
    if (!set) return ui.showError(ui.page('模拟考试', '#/mock'), '找不到这套卷子，可能没有查看权限。');
    const back = ids.length === 1 ? '#/' : '#/mock';
    if (parts.length === 1) return setPage(parts[0], set, back, ui);
    if (parts[1] === 'review' && set.review) return reviewPage(parts[0], set, ui);
    const paper = set.papers.find(p => p.id === parts[1]);
    if (!paper) return ui.showError(ui.page(set.title, '#/mock/' + parts[0]), '找不到这份卷子。');
    return paperPage(parts[0], set, paper, ui);
  }

  function setsPage(sets, ui) {
    const main = ui.page('模拟考试', '#/', '整卷限时做，交卷后看解析');
    const esc = ui.escapeHtml;
    const ids = Object.keys(sets);
    if (!ids.length) return ui.showError(main, '没有可以做的模拟卷。');
    main.innerHTML = ids.map(id =>
      `<a class="card" href="#/mock/${esc(id)}"><h2>${esc(sets[id].title)}</h2><p>${sets[id].papers.length} 份卷子${sets[id].review ? ' · 附复习资料' : ''}</p></a>`).join('');
  }

  function statusText(key, minutes) {
    const rec = getRecord(key);
    if (rec.startedAt) {
      return remainingSec(rec, minutes, Date.now()) > 0 ? '<span class="mk-doing">正在做</span>' : '<span class="mk-doing">时间到了，点开交卷</span>';
    }
    const last = rec.history[rec.history.length - 1];
    if (!last) return '';
    return typeof last.score === 'number' ? `上次 ${last.score} 分` : '做过，还没填分数';
  }

  function setPage(setId, set, back, ui) {
    const main = ui.page(set.title, back, '模拟考试');
    const esc = ui.escapeHtml;
    let html = '<p class="mk-tip">准备好草稿纸和笔，在纸上作答；交卷后对照解析自己批改。资料只供自己学习，请勿外传。</p>';
    if (set.review) {
      html += `<a class="card mk-row" href="#/mock/${esc(setId)}/review"><h2>📖 ${esc(set.review.title)}</h2>` +
        `<p>${esc(set.review.note || '')}${set.review.note ? ' · ' : ''}${set.review.pages} 页</p></a>`;
    }
    for (const [subject, name] of SUBJECTS) {
      const papers = set.papers.filter(p => p.subject === subject);
      if (!papers.length) continue;
      html += `<h3 class="group">${esc(name)}</h3>` + papers.map(p => {
        const st = statusText(`${setId}/${p.id}`, p.minutes);
        return `<a class="card mk-row" href="#/mock/${esc(setId)}/${esc(p.id)}"><h2>${esc(p.title)}</h2>` +
          `<p>${p.minutes} 分钟 · 满分 ${p.full}${st ? ` · ${st}` : ''}</p></a>`;
      }).join('');
    }
    main.innerHTML = html;
  }

  // 页面图片竖排，滑到附近才加载；双指放大用浏览器自带的
  function pagesHtml(dir, count, size, label, esc) {
    const [w, h] = size || [1240, 1754];
    let html = '';
    for (let i = 1; i <= count; i++) {
      html += `<figure class="pv-page"><img src="${esc(PrivateUI.BASE + dir)}/p${String(i).padStart(3, '0')}.jpg" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${esc(label)}第 ${i} 页">` +
        `<figcaption>${esc(label)}第 ${i} / ${count} 页</figcaption></figure>`;
    }
    return html;
  }

  function reviewPage(setId, set, ui) {
    const main = ui.page(set.review.title, '#/mock/' + setId, set.title);
    const book = document.createElement('div');
    book.className = 'pv-book mk-book';
    book.innerHTML = pagesHtml(`exams/${setId}/review`, set.review.pages, set.review.size, '', ui.escapeHtml);
    main.appendChild(book);
  }

  function paperPage(setId, set, paper, ui) {
    const key = `${setId}/${paper.id}`;
    const esc = ui.escapeHtml;
    const dir = `exams/${setId}/${paper.id}`;
    const maxScore = paper.maxScore || paper.full;
    const main = ui.page(paper.title, '#/mock/' + setId, `${set.title} · ${subjectName(paper.subject)}`);
    let rec = getRecord(key);

    // 中途关掉再打开时已经超时：按时间到交卷
    let autoSubmitted = false;
    if (rec.startedAt && remainingSec(rec, paper.minutes, Date.now()) <= 0) {
      rec = submit(rec, paper.minutes, Date.now());
      putRecord(key, rec);
      autoSubmitted = true;
    }

    if (rec.startedAt) return doing();
    if (rec.history.length) return done();
    return intro();

    function intro() {
      main.innerHTML =
        `<div class="card mk-intro"><h2>${esc(paper.title)}</h2>` +
        `<p>${esc(subjectName(paper.subject))} · ${paper.minutes} 分钟 · 满分 ${paper.full}</p>` +
        (paper.note ? `<p>${esc(paper.note)}</p>` : '') +
        `<ul><li>准备好草稿纸和笔，题目在纸上作答</li><li>开始后倒计时，中途关掉页面再打开会接着计时</li><li>交卷或时间到之后才能看解析，然后自己批改、填分数</li></ul>` +
        `<button type="button" class="mk-btn primary mk-start">开始考试</button></div>`;
      main.querySelector('.mk-start').onclick = () => {
        rec = { ...rec, startedAt: Date.now() };
        putRecord(key, rec);
        doing();
      };
    }

    function doing() {
      main.innerHTML = '';
      const book = document.createElement('div');
      book.className = 'pv-book mk-book';
      book.innerHTML = pagesHtml(dir + '/paper', paper.paper, paper.size, '试卷', esc);
      main.appendChild(book);
      const bar = document.createElement('div');
      bar.className = 'pv-bar mk-bar';
      bar.innerHTML = `<div class="mk-bar-row"><p class="mk-left" aria-live="off">剩余 <b></b></p>` +
        `<button type="button" class="mk-btn primary mk-submit">交卷</button></div>`;
      main.appendChild(bar);
      window.scrollTo(0, 0);
      const left = bar.querySelector('b');
      const box = bar.querySelector('.mk-left');
      const finish = () => {
        stop();
        rec = submit(rec, paper.minutes, Date.now());
        putRecord(key, rec);
        done();
      };
      const tick = () => {
        const sec = remainingSec(rec, paper.minutes, Date.now());
        left.textContent = clock(sec);
        box.classList.toggle('warn', sec <= WARN_SEC);
        if (sec <= 0) {
          autoSubmitted = true;
          finish();
        }
      };
      bar.querySelector('.mk-submit').onclick = () => {
        if (confirm('确定交卷？交卷后就能看解析了。')) finish();
      };
      stop();
      tick();
      if (rec.startedAt) timer = setInterval(tick, 1000);
    }

    function done() {
      const last = rec.history[rec.history.length - 1];
      const older = rec.history.slice(0, -1).reverse();
      main.innerHTML =
        `<div class="card mk-result">` +
        (autoSubmitted ? '<p class="notice">时间到，已自动交卷。</p>' : '') +
        `<h2>${day(last.at)}交卷 · 用时 ${duration(last.usedSec)}</h2>` +
        `<p>限时 ${paper.minutes} 分钟。对照下面的解析批改，再填上得分。</p>` +
        `<div class="mk-score"><label>得分 <input type="number" inputmode="decimal" min="0" max="${maxScore}" step="0.5" value="${typeof last.score === 'number' ? last.score : ''}"></label>` +
        `<span>/ ${paper.full}</span><button type="button" class="mk-btn primary mk-save">保存</button></div>` +
        `<p class="mk-msg" role="status"></p>` +
        (older.length ? `<details class="mk-history"><summary>以前做过 ${older.length} 次</summary><ul>${older.map(h =>
          `<li>${day(h.at)} · 用时 ${duration(h.usedSec)} · ${typeof h.score === 'number' ? h.score + ' 分' : '没填分数'}</li>`).join('')}</ul></details>` : '') +
        `</div>` +
        `<div class="pv-views mk-views" role="group" aria-label="显示内容"><button type="button" class="on" data-v="both">试卷和解析</button><button type="button" data-v="answer">只看解析</button></div>` +
        `<div class="pv-book mk-book"><h3 class="group mk-part-paper">试卷</h3><div class="mk-part-paper">${pagesHtml(dir + '/paper', paper.paper, paper.size, '试卷', esc)}</div>` +
        `<h3 class="group">解析</h3>${pagesHtml(dir + '/answer', paper.answer, paper.size, '解析', esc)}` +
        `<p><button type="button" class="mk-btn mk-again">重新做一遍</button></p></div>`;
      window.scrollTo(0, 0);

      const input = main.querySelector('.mk-score input');
      const msg = main.querySelector('.mk-msg');
      main.querySelector('.mk-save').onclick = () => {
        const score = parseScore(input.value, maxScore);
        if (score === null) {
          msg.textContent = `请填 0～${maxScore} 之间的分数（可以有半分）`;
          msg.classList.add('error');
          return;
        }
        last.score = score;
        putRecord(key, rec);
        msg.textContent = '已保存';
        msg.classList.remove('error');
      };
      const views = [...main.querySelectorAll('.mk-views button')];
      views.forEach(btn => btn.addEventListener('click', () => {
        views.forEach(b => b.classList.toggle('on', b === btn));
        main.querySelectorAll('.mk-part-paper').forEach(el => { el.hidden = btn.dataset.v === 'answer'; });
      }));
      main.querySelector('.mk-again').onclick = () => {
        if (!confirm('重新开始计时做一遍？以前的分数会留着。')) return;
        autoSubmitted = false;
        rec = { ...rec, startedAt: Date.now() };
        putRecord(key, rec);
        doing();
      };
    }
  }

  const MockExam = { entryRow, inProgress, mockPage, stop, remainingSec, submit, parseScore, clock, duration, getRecord, putRecord, KEY };
  if (typeof module !== 'undefined') module.exports = MockExam;
  else root.MockExam = MockExam;
})(typeof globalThis !== 'undefined' ? globalThis : this);
