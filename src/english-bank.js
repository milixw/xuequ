'use strict';

// 独立英语试题库：知识点介绍在前，PDF 原题在后，不混入数学教材小节。
(function (root) {
  const KNOWLEDGE = typeof module !== 'undefined'
    ? require('../content/english/knowledge.js')
    : root.EnglishKnowledge;
  const TYPES = [
    ['choice', '选择题'],
    ['cloze', '完形填空'],
    ['reading', '阅读理解'],
    ['fill', '填空题'],
    ['completion', '补全题'],
    ['written', '主观题'],
    ['other', '其他'],
  ];
  const PROGRESS_ID = 'english-bank';
  const store = typeof module !== 'undefined'
    ? require('./learning-store.js').create(() => globalThis.localStorage) : root.LearningStore;
  const SUPPLEMENTS = typeof module !== 'undefined'
    ? require('../content/english/explanation-supplements.js')
    : root.EnglishExplanationSupplements;
  let loading;

  function explanationFor(q) {
    if (q && q.explanation) return { title: '原题解析（待核对）', text: q.explanation };
    const supplement = q && SUPPLEMENTS && SUPPLEMENTS[q.id];
    if (supplement) return { title: '补充解析（AI 编写·待审核）', text: supplement.explanation };
    return { title: '题目解析', text: '原 PDF 未提供可用解析，暂待补充；请勿将尚未核对的答案作为订正依据。' };
  }

  function explanationNode(q) {
    const info = explanationFor(q);
    const section = document.createElement('section');
    section.className = 'english-explanation';
    const title = document.createElement('h4');
    title.textContent = info.title;
    const body = document.createElement('p');
    body.textContent = info.text;
    section.append(title, body);
    return section;
  }

  function filterQuestions(questions, type, query, knowledge = 'all') {
    const needle = (query || '').trim().toLocaleLowerCase();
    return questions.filter(q =>
      (!type || type === 'all' || q.type === type) &&
      (!knowledge || knowledge === 'all' || KNOWLEDGE.classify(q) === knowledge) &&
      (!needle || q.text.toLocaleLowerCase().includes(needle) ||
        q.sources.some(s => s.file.toLocaleLowerCase().includes(needle)))
    );
  }

  function categoryCounts(questions) {
    const counts = {};
    for (const q of questions) counts[q.type] = (counts[q.type] || 0) + 1;
    return counts;
  }

  function knowledgeCounts(questions) {
    const counts = {};
    for (const q of questions) {
      const id = KNOWLEDGE.classify(q);
      counts[id] = (counts[id] || 0) + 1;
    }
    return counts;
  }

  function optionLetters(text) {
    return [...new Set([...text.matchAll(/^\s*([A-D])[.．、]\s*/gm)].map(m => m[1]))];
  }

  // PDF 中的完形题通常把选项集中放在文末；空格线可能没有被提取出来。
  function parseCloze(text) {
    const marker = /(?:^|\n)\s*(?:\(\s*\)\s*)?(?:\((\d{1,2})\)|(\d{1,2})[.．、])\s*A[.．、]\s*/g;
    const matches = [...text.matchAll(marker)];
    if (!matches.length) return null;
    const items = [];
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index + matches[i][0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
      const block = text.slice(start, end);
      const boundaries = [{ letter: 'A', start: 0, end: 0 }];
      for (const match of block.matchAll(/\b([B-D])[.．、]\s*/g)) {
        boundaries.push({ letter: match[1], start: match.index, end: match.index + match[0].length });
      }
      const options = boundaries.map((part, j) => ({
        letter: part.letter,
        text: block.slice(part.end, j + 1 < boundaries.length ? boundaries[j + 1].start : block.length).trim(),
      }));
      const number = Number(matches[i][1] || matches[i][2]);
      if (number !== i + 1 || options.length < 3 || options.some(o => !o.text)) return null;
      if (options.some((o, j) => o.letter !== 'ABCD'[j])) return null;
      items.push({ number, options });
    }
    return { passage: text.slice(0, matches[0].index).trim(), items };
  }

  function parseClozeAnswers(answer, count) {
    if (!answer) return null;
    const values = new Array(count).fill(null);
    for (const match of answer.matchAll(/\((\d{1,2})\)\s*([A-D])/g)) {
      values[Number(match[1]) - 1] = match[2];
    }
    for (const match of answer.matchAll(/(\d{1,2})\s*[-–]\s*(\d{1,2})\s*([A-D]+)/g)) {
      const first = Number(match[1]);
      const last = Number(match[2]);
      if (match[3].length !== last - first + 1) return null;
      [...match[3]].forEach((letter, i) => { values[first + i - 1] = letter; });
    }
    return values.every(Boolean) ? values : null;
  }

  function labelFor(type) {
    return (TYPES.find(([id]) => id === type) || TYPES[TYPES.length - 1])[1];
  }

  function load() {
    if (root.EnglishBankQuestions) return Promise.resolve(root.EnglishBankQuestions);
    if (!loading) {
      loading = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'content/english/question-bank.js?v=20261001-explanations';
        script.onload = () => root.EnglishBankQuestions
          ? resolve(root.EnglishBankQuestions)
          : reject(new Error('英语题库数据未注册'));
        script.onerror = () => {
          loading = null;
          reject(new Error('英语题库数据加载失败'));
        };
        document.head.appendChild(script);
      });
    }
    return loading;
  }

  function notice(main) {
    const p = document.createElement('p');
    p.className = 'notice';
    p.textContent = '题目、参考答案和原题解析由 PDF 机器提取，尚未人工逐题核对；补充解析由 AI 编写、待教师审核。若发现缺字、排版或配图问题，请以原 PDF 为准。源 PDF 未打包，以免公开学生信息。';
    main.appendChild(p);
  }

  function knowledgeIntro(point) {
    const box = document.createElement('div');
    box.className = 'english-knowledge-intro';
    const heading = document.createElement('strong');
    heading.textContent = '知识点讲解';
    const body = document.createElement('p');
    body.textContent = point.intro;
    const stepsHeading = document.createElement('strong');
    stepsHeading.className = 'english-knowledge-subtitle';
    stepsHeading.textContent = '怎么判断、怎么做';
    const steps = document.createElement('ol');
    steps.className = 'english-knowledge-steps';
    for (const step of point.steps) {
      const item = document.createElement('li');
      item.textContent = step;
      steps.appendChild(item);
    }
    const example = document.createElement('p');
    example.className = 'english-knowledge-example';
    example.textContent = `例：${point.example}`;
    let conjunctionGuide = null;
    if (point.conjunctionGroups) {
      conjunctionGuide = document.createElement('section');
      conjunctionGuide.className = 'english-conjunction-guide';
      const guideTitle = document.createElement('h4');
      const count = point.conjunctionGroups.reduce((n, group) => n + group.items.length, 0);
      guideTitle.textContent = `初中连词与连接结构学习清单 · ${count} 项`;
      const guideNote = document.createElement('p');
      guideNote.textContent = point.conjunctionNote;
      conjunctionGuide.append(guideTitle, guideNote);
      for (const group of point.conjunctionGroups) {
        const details = document.createElement('details');
        details.className = 'english-conjunction-group';
        details.open = true;
        const summary = document.createElement('summary');
        summary.textContent = `${group.title}（${group.items.length}）`;
        const list = document.createElement('ul');
        for (const [term, meaning, sentence] of group.items) {
          const item = document.createElement('li');
          const termEl = document.createElement('strong');
          termEl.textContent = term;
          const meaningEl = document.createElement('span');
          meaningEl.textContent = meaning;
          const sentenceEl = document.createElement('em');
          sentenceEl.textContent = sentence;
          item.append(termEl, meaningEl, sentenceEl);
          list.appendChild(item);
        }
        details.append(summary, list);
        conjunctionGuide.appendChild(details);
      }
    }
    let confusableGuide = null;
    if (point.confusables) {
      confusableGuide = document.createElement('section');
      confusableGuide.className = 'english-confusable-guide';
      const guideTitle = document.createElement('h4');
      guideTitle.textContent = point.id === 'connectors'
        ? '容易混淆的连词与连接结构'
        : '容易混淆的知识点';
      confusableGuide.appendChild(guideTitle);
      for (const comparison of point.confusables) {
        const card = document.createElement('article');
        card.className = 'english-confusable-card';
        const title = document.createElement('h5');
        title.textContent = comparison.title;
        const rule = document.createElement('p');
        rule.textContent = comparison.rule;
        const examples = document.createElement('ul');
        for (const sentence of comparison.examples) {
          const item = document.createElement('li');
          item.textContent = sentence;
          examples.appendChild(item);
        }
        const pitfall = document.createElement('p');
        pitfall.className = 'english-confusable-pitfall';
        pitfall.textContent = `易错：${comparison.pitfall}`;
        card.append(title, rule, examples, pitfall);
        confusableGuide.appendChild(card);
      }
    }
    const errors = document.createElement('div');
    errors.className = 'english-knowledge-errors';
    const errorsHeading = document.createElement('strong');
    errorsHeading.textContent = '常见错误';
    const list = document.createElement('ul');
    for (const mistake of point.commonErrors) {
      const item = document.createElement('li');
      item.textContent = mistake;
      list.appendChild(item);
    }
    errors.append(errorsHeading, list);
    box.append(heading, body, stepsHeading, steps, example);
    if (conjunctionGuide) box.appendChild(conjunctionGuide);
    if (confusableGuide) box.appendChild(confusableGuide);
    box.appendChild(errors);
    return box;
  }

  function questionLink(q) {
    const link = document.createElement('a');
    link.className = `card english-result ${Progress.status(PROGRESS_ID, q.id)}`;
    link.href = `#/english-bank/${q.id}`;
    const heading = document.createElement('strong');
    heading.textContent = labelFor(q.type);
    const preview = document.createElement('p');
    preview.textContent = q.text.replace(/\s+/g, ' ').slice(0, 130);
    link.append(heading, preview);
    const wrongCount = Progress.errorCount(PROGRESS_ID, q.id);
    if (wrongCount) {
      const count = document.createElement('small');
      count.className = 'english-error-count';
      count.textContent = `累计答错 ${wrongCount} 次`;
      link.appendChild(count);
    }
    return link;
  }

  function listPage(main, questions) {
    notice(main);
    const plan = document.createElement('a');
    plan.className = 'english-plan-entry';
    plan.href = '#/english-plan';
    plan.textContent = '查看 7 天错题复习计划（可打印 A4）';
    main.appendChild(plan);
    const exams = document.createElement('a');
    exams.className = 'english-plan-entry';
    exams.href = '#/english-exams';
    exams.textContent = '英语中考真题 · 上海历年文字题直接作答';
    main.appendChild(exams);
    const counts = categoryCounts(questions);
    const controls = document.createElement('div');
    controls.className = 'english-controls';
    const search = document.createElement('input');
    search.type = 'search';
    search.placeholder = '搜索题干或来源';
    search.setAttribute('aria-label', '搜索英语题目');
    const select = document.createElement('select');
    select.setAttribute('aria-label', '按题型筛选');
    for (const [id, name] of [['all', '全部题型'], ...TYPES]) {
      if (id !== 'all' && !counts[id]) continue;
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${name}（${id === 'all' ? questions.length : counts[id]}）`;
      select.appendChild(option);
    }
    const knowledgeSelect = document.createElement('select');
    knowledgeSelect.setAttribute('aria-label', '按知识点筛选');
    const pointCounts = knowledgeCounts(questions);
    for (const point of [{ id: 'all', title: '全部知识点' }, ...KNOWLEDGE.points]) {
      if (point.id !== 'all' && !pointCounts[point.id]) continue;
      const option = document.createElement('option');
      option.value = point.id;
      option.textContent = `${point.title}（${point.id === 'all' ? questions.length : pointCounts[point.id]}）`;
      knowledgeSelect.appendChild(option);
    }
    controls.append(search, select, knowledgeSelect);
    main.appendChild(controls);
    const summary = document.createElement('p');
    summary.className = 'english-summary';
    main.appendChild(summary);
    const results = document.createElement('div');
    main.appendChild(results);
    function update() {
      const matched = filterQuestions(questions, select.value, search.value, knowledgeSelect.value);
      summary.textContent = `找到 ${matched.length} 道 · 已答对 ${Progress.solvedCount(PROGRESS_ID)} 道`;
      results.replaceChildren();
      for (const point of KNOWLEDGE.points) {
        const group = matched.filter(q => KNOWLEDGE.classify(q) === point.id);
        if (!group.length) continue;
        const section = document.createElement('section');
        section.className = 'english-knowledge-group';
        const title = document.createElement('h3');
        title.className = 'group';
        title.textContent = `${point.title} · 知识点讲解 · ${group.length} 题`;
        const items = document.createElement('div');
        let visible = 6;
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'english-more';
        more.textContent = '显示本知识点更多错题';
        function showItems() {
          items.replaceChildren(...group.slice(0, visible).map(questionLink));
          more.hidden = visible >= group.length;
        }
        more.addEventListener('click', () => { visible += 10; showItems(); });
        section.append(title, knowledgeIntro(point), items, more);
        results.appendChild(section);
        showItems();
      }
      if (!matched.length) {
        const empty = document.createElement('p');
        empty.textContent = '没有找到符合条件的错题。';
        results.appendChild(empty);
      }
    }
    search.addEventListener('input', update);
    select.addEventListener('change', update);
    knowledgeSelect.addEventListener('change', update);
    update();
  }

  function detailPage(main, questions, id) {
    const owner = store.scope();
    const q = questions.find(item => item.id === id);
    if (!q) {
      const error = document.createElement('p');
      error.className = 'error';
      error.textContent = '找不到这道题，请返回题库。';
      main.appendChild(error);
      return;
    }
    notice(main);
    const point = KNOWLEDGE.get(KNOWLEDGE.classify(q));
    if (point) {
      const knowledge = document.createElement('section');
      knowledge.className = 'english-knowledge-group';
      const title = document.createElement('h2');
      title.className = 'group';
      title.textContent = `${point.title} · 知识点讲解`;
      knowledge.append(title, knowledgeIntro(point));
      main.appendChild(knowledge);
    }
    const article = document.createElement('article');
    article.className = 'card english-question';
    const heading = document.createElement('h2');
    heading.textContent = labelFor(q.type);
    const body = document.createElement('div');
    body.className = 'english-question-text';
    const cloze = q.type === 'cloze' ? parseCloze(q.text) : null;
    body.textContent = cloze ? cloze.passage : q.text;
    article.append(heading, body);
    if (cloze) {
      const note = document.createElement('p');
      note.className = 'english-cloze-note';
      note.textContent = 'PDF 提取可能丢失正文中的空格线，请按原题题号在下方选择。';
      article.appendChild(note);
    }
    main.appendChild(article);

    const answerBox = document.createElement('section');
    answerBox.className = 'card english-answer';
    const explanation = explanationNode(q);
    explanation.hidden = !Progress.get(PROGRESS_ID, q.id);
    const feedback = document.createElement('p');
    feedback.className = 'english-feedback';
    function unchangedAccount() {
      if (owner === store.scope()) return true;
      feedback.textContent = '账号已切换，请重新打开本题后作答。';
      return false;
    }
    const errorCount = document.createElement('p');
    errorCount.className = 'english-error-count';
    function refreshErrorCount() {
      errorCount.textContent = `累计答错 ${Progress.errorCount(PROGRESS_ID, q.id)} 次`;
    }
    refreshErrorCount();
    answerBox.appendChild(errorCount);
    let resetInputs = () => {};
    if (cloze) {
      const form = document.createElement('form');
      form.className = 'english-cloze-form';
      const selects = [];
      for (const item of cloze.items) {
        const row = document.createElement('label');
        row.className = 'english-cloze-row';
        const number = document.createElement('span');
        number.textContent = `第 ${item.number} 空`;
        const select = document.createElement('select');
        select.setAttribute('aria-label', `第 ${item.number} 空选项`);
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = '请选择';
        select.appendChild(placeholder);
        for (const option of item.options) {
          const node = document.createElement('option');
          node.value = option.letter;
          node.textContent = `${option.letter}. ${option.text}`;
          select.appendChild(node);
        }
        row.append(number, select);
        form.appendChild(row);
        selects.push(select);
      }
      const submit = document.createElement('button');
      submit.type = 'submit';
      submit.textContent = '提交完形填空';
      form.appendChild(submit);
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!unchangedAccount()) return;
        if (selects.some(select => !select.value)) {
          feedback.textContent = '请先完成每一空，再提交。';
          return;
        }
        const answers = parseClozeAnswers(q.answer, cloze.items.length);
        if (!answers || cloze.items.some((item, i) => !item.options.some(o => o.letter === answers[i]))) {
          feedback.textContent = '这道题的参考答案无法可靠识别，暂不自动判分。';
          return;
        }
        const correct = selects.filter((select, i) => select.value === answers[i]).length;
        Progress.record(PROGRESS_ID, q.id, correct === selects.length);
        refreshErrorCount();
        feedback.textContent = `答对 ${correct} / ${selects.length} 空。` +
          (correct === selects.length ? '全部正确！' : '可以修改选项后再试，或查看参考答案。');
        feedback.className = `english-feedback ${correct === selects.length ? 'ok' : 'fail'}`;
        explanation.hidden = false;
      });
      resetInputs = () => form.reset();
      answerBox.appendChild(form);
    } else if (q.type === 'choice' && /^[A-D]$/.test(q.answer || '')) {
      const choices = document.createElement('div');
      choices.className = 'english-choices';
      for (const letter of optionLetters(q.text)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = letter;
        button.setAttribute('aria-label', `选择 ${letter}`);
        button.addEventListener('click', () => {
          if (!unchangedAccount()) return;
          const correct = letter === q.answer;
          Progress.record(PROGRESS_ID, q.id, correct);
          refreshErrorCount();
          feedback.textContent = correct ? '答对了！' : '还不对，可以再试一次或查看参考答案。';
          feedback.className = `english-feedback ${correct ? 'ok' : 'fail'}`;
          explanation.hidden = false;
        });
        choices.appendChild(button);
      }
      answerBox.appendChild(choices);
    }
    if (q.answer) {
      const reveal = document.createElement('button');
      reveal.type = 'button';
      reveal.className = 'english-reveal';
      reveal.textContent = '查看参考答案与解析';
      reveal.addEventListener('click', () => {
        if (!unchangedAccount()) return;
        Progress.reveal(PROGRESS_ID, q.id);
        feedback.textContent = `PDF 参考答案（待核对）：${q.answer}`;
        feedback.className = 'english-feedback';
        explanation.hidden = false;
      });
      answerBox.appendChild(reveal);
    } else {
      feedback.textContent = '这道题的参考答案暂未可靠提取。';
    }
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'english-reset';
    reset.textContent = '重置本题';
    reset.addEventListener('click', () => {
      if (!unchangedAccount()) return;
      if (Progress.get(PROGRESS_ID, q.id) &&
          !window.confirm('重置后将取消本题的练习进度，累计错误次数和历史提交仍会保留，确定吗？')) return;
      Progress.clear(PROGRESS_ID, q.id);
      resetInputs();
      feedback.textContent = '已重置本题，完成记录已取消。';
      feedback.className = 'english-feedback';
      explanation.hidden = true;
    });
    answerBox.appendChild(reset);
    answerBox.appendChild(feedback);
    answerBox.appendChild(explanation);
    main.appendChild(answerBox);
  }

  const EnglishBank = { load, listPage, detailPage, knowledgeIntro, filterQuestions, categoryCounts, knowledgeCounts, optionLetters,
    parseCloze, parseClozeAnswers, explanationFor, explanationNode, TYPES };
  if (typeof module !== 'undefined') module.exports = EnglishBank;
  else root.EnglishBank = EnglishBank;
})(this);
