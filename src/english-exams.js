/* 上海英语中考文字题：保留原题，缺失的题干、选项和答案不补造。 */
(function (root) {
  'use strict';
  function papers(catalog, city) { return (catalog.papers || []).filter(p => !city || p.city === city).sort((a, b) => b.year - a.year); }
  function find(catalog, year, city) {
    // Jiangsu always requires a city: never pick an arbitrary same-year paper.
    if (catalog.cities && !city) return null;
    return papers(catalog, city).find(p => String(p.year) === String(year)) || null;
  }
  function progressGroup(paper) { return 'english-exam:' + (paper.id || paper.year); }
  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function originalText(parent, text) {
    // Only source underline markers are interpreted; source text is never HTML.
    String(text || '').split(/(\[\[u\]\][\s\S]*?\[\[\/u\]\])/g).forEach(part => {
      if (part.startsWith('[[u]]')) parent.appendChild(node('u', part.slice(5, -6)));
      else parent.appendChild(node('span', part));
    });
  }
  function originalImages(parent, images) {
    for (const item of images || []) {
      if (!/^content\/english\/past-papers\/\d{4}\/[\w.-]+\.(?:png|jpg|jpeg)$/.test(item.src)) continue;
      const link = node('a'); link.href = item.src; link.target = '_blank'; link.rel = 'noopener';
      const img = node('img'); img.src = item.src; img.alt = item.label || '原题配图，点击放大'; img.loading = 'lazy';
      img.style = 'max-width:100%;height:auto'; link.appendChild(img); parent.appendChild(link);
    }
  }
  function directoryCard(main, title, href, description) {
    const card = node('a', undefined, 'card english-exams-year'); card.href = href;
    card.appendChild(node('h2', title)); card.appendChild(node('p', description, 'meta'));
    main.appendChild(card);
  }
  function renderRegions(main, shanghai, jiangsu) {
    main.appendChild(node('p', '先选择地区，再按城市和年份查看原题。', 'notice'));
    directoryCard(main, '上海', '#/english-exams/shanghai', papers(shanghai).length + ' 个年份');
    directoryCard(main, '江苏', '#/english-exams/jiangsu', (jiangsu.cities || []).length + ' 个城市');
  }
  function renderCities(main, catalog) {
    main.appendChild(node('p', '选择城市后查看历年英语中考真题；题干尚未提取的年份会明确标注。', 'notice'));
    for (const city of catalog.cities || []) {
      const entries = papers(catalog, city.id);
      directoryCard(main, city.name, '#/english-exams/jiangsu/' + city.id,
        entries.filter(p => p.questions.length).length + ' 份已导入文字题 · ' + entries.length + ' 个资料年份');
    }
  }
  function renderList(main, catalog, city) {
    main.appendChild(node('p', '原题文字直接作答，题干、选项及原解析保留。导入内容待核对、待审核；目前仅导入能可靠提取的部分题目，不代表完整试卷。', 'notice'));
    if (catalog.missingYears) main.appendChild(node('p', '指定目录未找到 ' + catalog.missingYears.join('、') + ' 年上海英语试卷。', 'english-exams-meta'));
    for (const paper of papers(catalog, city)) {
      const card = node('a', undefined, 'card english-exams-year');
      card.href = '#/english-exams/' + (city ? 'jiangsu/' + city + '/' : '') + paper.year;
      card.appendChild(node('span', paper.version, 'tag'));
      card.appendChild(node('h2', paper.title));
      card.appendChild(node('p', questionGroups(paper.questions).length + ' 道文字题（含 ' + paper.questions.length + ' 个作答项） · ' + paper.completeness, 'meta'));
      card.appendChild(node('p', paper.note));
      main.appendChild(card);
    }
  }
  function normalized(value) { return String(value).trim().replace(/\s+/g, ' ').toLowerCase(); }
  function check(q, selected) {
    if (q.type === 'open') return null;
    if (!q.answer) return null;
    if (q.type === 'choice') return selected === q.answer;
    let answers = String(q.answer).split('/');
    answers = answers.flatMap(a => a.endsWith('(s)') ? [a.slice(0, -3), a.slice(0, -3) + 's'] : [a]);
    return answers.some(a => normalized(a) === normalized(selected));
  }
  function questionGroups(questions) {
    const groups = [], passages = new Map();
    for (const q of questions) {
      if (q.passage || q.materialId) {
        const key = q.materialId || q.category + '\u0000' + q.passage;
        if (!passages.has(key)) { const group = []; passages.set(key, group); groups.push(group); }
        passages.get(key).push(q);
      } else groups.push([q]);
    }
    return groups;
  }
  function renderQuestion(main, paper, questions) {
    const owner = LearningStore.scope();
    const group = progressGroup(paper);
    const card = node('section', undefined, 'card english-exams-question');
    const first = questions[0];
    if (first.passage || first.passageImages) {
      card.appendChild(node('h2', first.category));
      const passage = node('div', undefined, 'english-exams-passage');
      originalText(passage, first.passage);
      originalImages(passage, first.passageImages);
      card.appendChild(passage);
    }
    const form = node('form');
    const entries = questions.map(q => {
    const part = node('div', undefined, 'english-exams-subquestion');
    const stem = node('p', undefined, 'english-exams-stem');
    stem.appendChild(node('span', '原第 ' + q.originalNo + ' 题 · '));
    originalText(stem, q.stem || '请选择文章中对应空格的答案。');
    part.appendChild(stem);
    originalImages(part, q.stemImages);
    if (q.sourceNote) part.appendChild(node('p', q.sourceNote, 'english-exams-meta'));
    part.appendChild(node('p', q.category + ' · 待审核' + (q.type === 'open' ? ' · 人工核对' : ''), 'english-exams-meta'));
    let selected = '';
    if (q.type === 'choice') {
      const choices = node('div', undefined, 'english-exams-choices');
      q.options.forEach((option, i) => {
        const label = node('label');
        const input = node('input');
        input.type = 'radio'; input.name = q.id; input.value = (q.optionLabels || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')[i];
        input.addEventListener('change', () => { selected = input.value; });
        label.appendChild(input);
        label.appendChild(node('span', input.value + '. '));
        originalText(label, option);
        choices.appendChild(label);
      });
      part.appendChild(choices);
    } else {
      const input = node(q.type === 'open' ? 'textarea' : 'input'); input.type = 'text'; input.autocomplete = 'off';
      input.setAttribute('aria-label', '原第 ' + q.originalNo + ' 题答案');
      input.className = 'english-exams-fill';
      input.addEventListener('input', () => { selected = input.value; });
      part.appendChild(input);
    }
    const feedback = node('p', '', 'english-feedback');
    const explanation = node('section', undefined, 'english-explanation');
    explanation.hidden = true;
    const answerLabel = q.answerSource && q.answerSource.kind === 'public-supplement'
      ? '补充参考答案（公开资料核对·待审核）：' : '原资料参考答案：';
    explanation.appendChild(node('p', q.answer ? answerLabel + q.answer : '原资料未提供可可靠提取的答案，暂不自动评分。'));
    const explanationText = node('p');
    originalText(explanationText, q.explanation || '原资料没有可可靠提取的解析，待补充核对；不以答案代替解析。');
    explanation.appendChild(explanationText);
    if (q.listeningText) {
      const transcript = node('details'); transcript.appendChild(node('summary', '查看原资料听力文字'));
      const body = node('p'); originalText(body, q.listeningText); transcript.appendChild(body); explanation.appendChild(transcript);
    }
    originalImages(explanation, q.answerImages);
    part.appendChild(feedback); part.appendChild(explanation); form.appendChild(part);
    return { q, feedback, explanation, selected: () => selected };
    });
    const feedback = node('p', '', 'english-feedback');
    const submit = node('button', questions.length > 1 ? '提交整道题' : first.type === 'open' ? '提交作答（人工核对）' : first.answer ? '提交答案' : '提交作答（不判分）'); submit.type = 'submit';
    form.appendChild(submit);
    function unchanged() {
      if (owner === LearningStore.scope()) return true;
      feedback.textContent = '账号已切换，请重新打开本页后作答。'; return false;
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!unchanged()) return;
      const missing = entries.filter(entry => !entry.selected().trim());
      if (missing.length) { feedback.textContent = '请先作答' + (questions.length > 1 ? '所有小题（未答：' + missing.map(entry => entry.q.originalNo).join('、') + '）' : '') + '。'; return; }
      feedback.textContent = '';
      for (const entry of entries) {
      const { q, feedback, explanation } = entry;
      const selected = entry.selected();
      const correct = check(q, selected);
      if (correct === null) feedback.textContent = '本次作答：' + selected + (q.type === 'open' ? '。请对照参考答案核对，本题不自动判分、不计错误次数。' : '。参考答案待核对，本题不判分、不计错误次数。');
      else {
        Progress.record(group, q.id, correct);
        feedback.textContent = (correct ? '答对了！' : '答错了，请看解析订正。') +
          ' 本次作答：' + selected + ' · 累计答错 ' + Progress.errorCount(group, q.id) + ' 次';
      }
      explanation.hidden = false;
      }
    });
    const reveal = node('button', '查看参考答案与解析'); reveal.type = 'button';
    reveal.addEventListener('click', () => {
      if (!unchanged()) return;
      for (const entry of entries) {
        Progress.reveal(group, entry.q.id); entry.explanation.hidden = false;
      }
    });
    form.appendChild(reveal);
    card.appendChild(form); card.appendChild(feedback);
    main.appendChild(card);
  }
  function renderYear(main, catalog, year, city) {
    const paper = find(catalog, year, city);
    if (!paper) { main.appendChild(node('p', '未收录这一年份，请返回年份列表。', 'error')); return; }
    main.appendChild(node('p', paper.version + ' · 待审核。' + paper.note, 'notice'));
    if (paper.source) main.appendChild(node('p', '题目来源：' + paper.source.file.split('/').pop() +
      '（优先文字，必要原图可点击放大）', 'english-exams-meta'));
    if (paper.coverage && paper.coverage.gaps.length) main.appendChild(node('p', '原资料尚缺或待核：' + paper.coverage.gaps.join('；'), 'notice'));
    if (paper.questions.some(q => q.part === 'listening') && !paper.audio) main.appendChild(node('p', '本地资料没有对应原录音；听力题已保留，原听力文字若有则在订正区查看。', 'english-exams-meta'));
    if (paper.audio) {
      const audio = node('audio'); audio.controls = true; audio.preload = 'none'; audio.src = paper.audio;
      audio.setAttribute('aria-label', paper.year + ' 年听力音频（题干对应关系待核对）');
      main.appendChild(node('p', '听力音频（与已收录题干的版本对应关系待核对）', 'english-exams-meta'));
      main.appendChild(audio);
    }
    if (!paper.questions.length) { main.appendChild(node('p', '题干资料待补充，暂不能生成原题。', 'notice')); return; }
    const controls = node('div', undefined, 'english-exams-filter');
    const select = node('select'); select.setAttribute('aria-label', '按题型筛选中考题');
    for (const name of ['全部题型', ...new Set(paper.questions.map(q => q.category))]) {
      const option = node('option', name); option.value = name; select.appendChild(option);
    }
    controls.appendChild(select); main.appendChild(controls);
    const list = node('div'); main.appendChild(list);
    function redraw() {
      list.textContent = '';
      const filtered = paper.questions.filter(q => !select.value || select.value === '全部题型' || select.value === q.category);
      const groups = questionGroups(filtered);
      list.appendChild(node('p', '共 ' + groups.length + ' 道题（含 ' + filtered.length + ' 个作答项）', 'english-exams-meta'));
      groups.forEach(questions => renderQuestion(list, paper, questions));
    }
    select.addEventListener('change', redraw); redraw();
  }
  function stopMedia() { document.querySelectorAll('main audio, main video').forEach(media => media.pause()); }
  const api = { papers, find, check, questionGroups, progressGroup, renderRegions, renderCities, renderList, renderYear, stopMedia };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EnglishExams = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
