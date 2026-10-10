/* 上海语数物化原题：主观题只保存作答，不以字符串相等冒充评分。 */
(function(root) {
  'use strict';
  const NAMES = { math: '数学', chinese: '语文', physics: '物理', chemistry: '化学' };
  const KEY = 'xq.subject-papers.v1';
  function papers(catalog, subject) {
    return (catalog.papers || []).filter(p => p.subject === subject).sort((a, b) => b.year - a.year);
  }
  function find(catalog, subject, year) {
    return papers(catalog, subject).find(p => String(p.year) === String(year)) || null;
  }
  function check(q, response) {
    return q.type === 'choice' && /^[A-D]$/.test(q.answer || '') ? q.answer === response : null;
  }
  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function rich(parent, text) {
    // Only our checked annotation markers are interpreted; all other source
    // text is escaped by Quiz before local KaTeX formatting.
    String(text || '').split(/(\[\[(?:u|dot|wave)\]\][\s\S]*?\[\[\/(?:u|dot|wave)\]\])/g).forEach(part => {
      const marker = part.match(/^\[\[(u|dot|wave)\]\]([\s\S]*)\[\[\/\1\]\]$/);
      const el = node(marker && (marker[1] === 'u' || marker[1] === 'wave') ? 'u' : 'span');
      if (marker && marker[1] === 'dot') el.className = 'subject-papers-dot';
      if (marker && marker[1] === 'wave') el.className = 'subject-papers-wave';
      el.innerHTML = Quiz.renderText(marker ? marker[2] : part);
      parent.appendChild(el);
    });
  }
  function imagePath(src) {
    return typeof src === 'string' && /^content\/past-papers\/images\/sh-(?:math|chinese|physics|chemistry)-\d{4}\/q\d{2}-(?:stem|answer)-\d{2}\.png$/.test(src);
  }
  function renderImages(parent, images, label) {
    (Array.isArray(images) ? images : []).forEach((item, i) => {
      if (!item || !imagePath(item.src)) return;
      const link = node('a', undefined, 'subject-papers-image');
      link.href = item.src; link.target = '_blank'; link.rel = 'noopener';
      link.setAttribute('aria-label', label + '第 ' + (i + 1) + ' 张，打开原图放大');
      const img = node('img'); img.src = item.src;
      img.alt = item.label || label + '第 ' + (i + 1) + ' 张（原 PDF 第 ' + item.page + ' 页）';
      img.decoding = 'async';
      // Eager loading keeps long question sheets complete when printed.
      if (Number.isFinite(item.width) && item.width > 0) img.width = item.width;
      if (Number.isFinite(item.height) && item.height > 0) img.height = item.height;
      link.appendChild(img); parent.appendChild(link);
    });
  }
  function renderList(main, catalog, subject) {
    if (!NAMES[subject]) { main.appendChild(node('p', '未收录这一学科。', 'error')); return; }
    main.appendChild(node('p', '仅收录上海原题，按年份练习。当前部分导入，整理资料待核对、待教师审核。', 'notice'));
    for (const paper of papers(catalog, subject)) {
      const card = node('a', undefined, 'card');
      card.href = '#/shanghai-papers/' + subject + '/' + paper.year;
      card.appendChild(node('h2', paper.title));
      card.appendChild(node('p', paper.version + ' · ' + (paper.questions.length ? paper.questions.length +
        (subject === 'chinese' ? ' 道整组题（含多个小问）' : ' 道题') : '资料已找到 · 题目待完整转录') + ' · 待审核', 'meta'));
      card.appendChild(node('p', paper.note));
      main.appendChild(card);
    }
  }
  function renderQuestion(main, paper, q) {
    const owner = LearningStore.scope();
    const data = LearningStore.read(KEY, {}, owner);
    const saved = (data[paper.id] || {})[q.id] || {};
    const card = node('section', undefined, 'card subject-papers-question');
    const numbers = q.originalNumbers && q.originalNumbers.length ? q.originalNumbers : [q.originalNo];
    card.appendChild(node('h2', '资料第 ' + numbers.join('、') + ' 题 · ' + q.category));
    if (q.context) {
      const context = node('details'); context.open = true;
      context.appendChild(node('summary', q.contextLabel || '关联阅读材料'));
      const material = node('div', undefined, 'subject-papers-text'); rich(material, q.context);
      context.appendChild(material); card.appendChild(context);
    }
    const stem = node('div', undefined, 'subject-papers-text'); rich(stem, q.stem); card.appendChild(stem);
    if (q.stemImages && q.stemImages.length) {
      renderImages(card, q.stemImages, '资料第 ' + q.originalNo + ' 题原题');
      card.appendChild(node('p', '点击题图可打开原图放大。', 'meta subject-papers-image-hint'));
    }
    const form = node('form');
    let response = typeof saved.response === 'string' ? saved.response : '';
    if (q.type === 'choice') {
      const choices = node('div', undefined, 'english-exams-choices');
      q.options.forEach((option, i) => {
        const label = node('label'), input = node('input');
        input.type = 'radio'; input.name = q.id; input.value = 'ABCD'[i]; input.checked = response === input.value;
        input.addEventListener('change', () => { response = input.value; });
        label.appendChild(input); label.appendChild(node('span', input.value + (q.optionsInImage ? '' : '. ')));
        if (!q.optionsInImage) rich(label, option);
        choices.appendChild(label);
      });
      form.appendChild(choices);
    } else {
      const input = node('textarea'); input.rows = paper.subject === 'chinese' ? 5 : 2; input.value = response;
      input.className = 'subject-papers-response'; input.setAttribute('aria-label', '资料第 ' + q.originalNo + ' 题作答');
      input.placeholder = paper.subject === 'chinese' ? '按小问编号写出你的答案' : '写出答案或解题过程';
      input.addEventListener('input', () => { response = input.value; }); form.appendChild(input);
      form.appendChild(node('p', '本题需人工核对，不自动判分、不计错误次数。', 'meta'));
    }
    const feedback = node('p', saved.attempts ? '已保存作答 ' + saved.attempts + ' 次' +
      (q.type === 'choice' ? ' · 累计答错 ' + (saved.wrongCount || 0) + ' 次' : '') : '', 'english-feedback');
    const explanation = node('section', undefined, 'english-explanation'); explanation.hidden = !saved.revealed;
    explanation.appendChild(node('h3', '原资料参考答案 · 待核对'));
    const answer = node('div', undefined, 'subject-papers-text');
    rich(answer, q.answer || '原资料答案尚未可靠提取，待补充。'); explanation.appendChild(answer);
    renderImages(explanation, q.answerImages, '资料第 ' + q.originalNo + ' 题参考答案与解析');
    explanation.appendChild(node('h3', '原资料解析'));
    const analysis = node('div', undefined, 'subject-papers-text');
    rich(analysis, q.explanation || (q.textSource ? '原资料说明与解析已并入上方文字参考答案，供人工核对。' : q.answerImages && q.answerImages.length ? '原资料解析见上方答案图片，供人工核对。' : '原解析尚未完整提取，待补充核对。')); explanation.appendChild(analysis);
    if (q.explanationNote) explanation.appendChild(node('p', q.explanationNote, 'meta'));
    function save(submitted) {
      if (LearningStore.scope() !== owner) { feedback.textContent = '账号已切换，请重新打开本页后作答。'; return false; }
      const current = LearningStore.read(KEY, {}, owner);
      const group = current[paper.id] = current[paper.id] || {};
      const previous = group[q.id] || {};
      const correct = check(q, response);
      group[q.id] = { ...previous, revealed: true };
      if (submitted) Object.assign(group[q.id], {
        response, attempts: (previous.attempts || 0) + 1,
        wrongCount: (previous.wrongCount || 0) + (correct === false ? 1 : 0),
        solved: previous.solved === true || correct === true,
      });
      if (!LearningStore.write(KEY, current, owner)) {
        feedback.textContent = '保存失败，作答未丢失，请检查浏览器存储空间后重新提交。'; return false;
      }
      explanation.hidden = false;
      if (submitted) feedback.textContent = correct === null ? '已保存作答，请对照参考答案逐项订正（不自动判分）。' :
        (correct ? '答对了！' : '答错了，请看解析订正。') + ' 累计答错 ' + group[q.id].wrongCount + ' 次';
      return true;
    }
    const submit = node('button', q.type === 'choice' ? '提交答案' : '保存作答并查看答案'); submit.type = 'submit'; form.appendChild(submit);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!response.trim()) { feedback.textContent = '请先作答。'; return; }
      save(true);
    });
    const reveal = node('button', '查看参考答案与解析'); reveal.type = 'button';
    reveal.addEventListener('click', () => save(false)); form.appendChild(reveal);
    card.appendChild(form); card.appendChild(feedback); card.appendChild(explanation); main.appendChild(card);
  }
  function renderYear(main, catalog, subject, year) {
    const paper = find(catalog, subject, year);
    if (!paper) { main.appendChild(node('p', '未收录这一学科或年份，请返回目录。', 'error')); return; }
    main.appendChild(node('p', paper.version + ' · 待审核。' + paper.note, 'notice'));
    main.appendChild(node('p', '原资料来源：' + paper.source.file +
      (paper.questions.length ? '（已整理为网页文字或本地原题图片）' : '（尚未完整转录）'), 'meta'));
    if (!paper.questions.length) {
      main.appendChild(node('p', '原题尚未完整转录，目前不能作答。' + paper.skipped.join('；'), 'notice'));
      return;
    }
    const select = node('select'); select.className = 'subject-papers-filter'; select.setAttribute('aria-label', '筛选题型');
    for (const name of ['全部题型', ...new Set(paper.questions.map(q => q.category))]) {
      const option = node('option', name); option.value = name; select.appendChild(option);
    }
    main.appendChild(select);
    const list = node('div'); main.appendChild(list);
    function redraw() {
      list.textContent = '';
      paper.questions.filter(q => !select.value || select.value === '全部题型' || q.category === select.value)
        .forEach(q => renderQuestion(list, paper, q));
    }
    select.addEventListener('change', redraw); redraw();
    if (paper.skipped.length) {
      const detail = node('details'); detail.appendChild(node('summary', '尚未导入的题目'));
      detail.appendChild(node('p', paper.skipped.join('；'))); main.appendChild(detail);
    }
  }
  const api = { papers, find, check, renderList, renderYear, imagePath, KEY };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SubjectPapers = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
