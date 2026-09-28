'use strict';

// 英语错题的七天首轮复习：每道原题归到一天，保留全部原题作答。
(function (root) {
  const KNOWLEDGE = typeof module !== 'undefined'
    ? require('../content/english/knowledge.js')
    : root.EnglishKnowledge;
  const BANK = typeof module !== 'undefined'
    ? require('./english-bank.js')
    : root.EnglishBank;
  const STORE_KEY = 'xq.english-plan.v1';
  const PROGRESS_ID = 'english-bank';
  const DAYS = [
    { title: '连接句意', points: ['connectors'], target: '15 道',
      learn: '辨认时间、条件、原因、让步；再检查主句与从句的时态。',
      check: '能说明每个连接词表达的关系，而不只凭中文翻译猜。' },
    { title: '代词与数量', points: ['pronouns', 'quantity', 'phonetics'], target: '15 道',
      learn: '先圈出所指范围和数量，再核对代词、分数与谓语单复数。',
      check: '能区分 another / the other / others，以及 the number of / a number of。' },
    { title: '搭配与比较', points: ['prepositions', 'comparison', 'vocabulary'], target: '15 道',
      learn: '把介词连同前面的词一起记；用修饰对象判断形容词、副词及比较级。',
      check: '能写出至少 5 组做错过的固定搭配，并说清比较对象。' },
    { title: '动词形式', points: ['nonfinite', 'tense', 'dialogue'], target: '15 道',
      learn: '先找句子谓语和时间线索，再判断 to do / doing / done 或时态语态。',
      check: '能解释每道题为什么用这个动词形式。' },
    { title: '阅读定位', points: ['reading', 'writing'], target: '2 篇阅读',
      learn: '先读问题，再回原文标证据；写作题只做结构与时态自查。',
      check: '每个阅读答案都能对应原文句子，推断题不凭常识猜。' },
    { title: '完形与填空', points: ['cloze', 'context-fill'], target: '2 篇或 12 空',
      learn: '先通读全文，逐空检查词义、词性和前后文，最后通读复核。',
      check: '能说出错误来自词义、词形、搭配还是上下文。' },
    { title: '综合复测', points: ['mixed'], target: '15 道 + 前六天错题',
      learn: '混合做题，不先看分类提示；重做前六天仍不熟的题。',
      check: '记录最常错的 3 个知识点，作为下一轮复习起点。' },
  ];

  function loadState() {
    try {
      const saved = JSON.parse(root.localStorage.getItem(STORE_KEY));
      if (saved && typeof saved === 'object') {
        return { drafts: saved.drafts || {}, results: saved.results || {} };
      }
    } catch {}
    return { drafts: {}, results: {} };
  }

  const state = loadState();

  function saveState() {
    try { root.localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch {}
  }

  function draftFor(dayNumber) {
    return (state.drafts[dayNumber] = state.drafts[dayNumber] || {});
  }

  function selectAnswer(dayNumber, questionId, value) {
    draftFor(dayNumber)[questionId] = value;
    saveState();
  }

  function parseChoice(text) {
    const matches = [...text.matchAll(/^\s*([A-D])[.．、]\s*/gm)];
    if (matches.length < 2 || matches[0][1] !== 'A' ||
        new Set(matches.map(match => match[1])).size !== matches.length) return null;
    const options = matches.map((match, index) => ({
      letter: match[1],
      text: text.slice(match.index + match[0].length,
        index + 1 < matches.length ? matches[index + 1].index : text.length).trim(),
    }));
    if (options.some(option => !option.text)) return null;
    return { stem: text.slice(0, matches[0].index).trim(), options };
  }

  function questionMode(q) {
    if (q.type === 'reading' && typeof q.answer === 'string') {
      const matches = [...q.answer.matchAll(/\((\d+)\)\s*([A-D])/g)];
      const headings = [...q.text.matchAll(/\((\d+)\)\s*单选题/g)];
      if (matches.length >= 2 && headings.length === matches.length &&
          matches.every((match, index) => Number(match[1]) === index + 1) &&
          headings.every((match, index) => Number(match[1]) === index + 1)) {
        const items = matches.map((match, index) => ({
          number: index + 1, options: [...new Set(
            (q.text.slice(headings[index].index,
              index + 1 < headings.length ? headings[index + 1].index : undefined)
              .match(/^\s*([A-D])[.．、]/gm) || []).map(option => option.trim()[0])
          )].map(letter => ({ letter }))
        }));
        if (items.every((item, index) => item.options.length >= 2 &&
            item.options.some(option => option.letter === matches[index][2]))) {
          return { kind: 'reading-multi', items, answer: matches.map(match => match[2]) };
        }
      }
    }
    if (q.type === 'choice' || q.type === 'reading') {
      const parsed = parseChoice(q.text);
      if (parsed) return { kind: 'choice', ...parsed,
        answer: /^[A-D]$/.test(q.answer || '') && parsed.options.some(o => o.letter === q.answer)
          ? q.answer : null };
    }
    if (q.type === 'cloze') {
      const parsed = BANK.parseCloze(q.text);
      if (parsed) {
        const answers = BANK.parseClozeAnswers(q.answer, parsed.items.length);
        return { kind: 'cloze', ...parsed,
          answer: answers && parsed.items.every((item, index) =>
            item.options.some(option => option.letter === answers[index])) ? answers : null };
      }
    }
    return { kind: 'display', answer: null };
  }

  function gradeDay(day, responses) {
    const result = { total: 0, gradable: 0, attempted: 0, correct: 0, unanswered: 0,
      ungradable: 0, graded: [], wrong: [] };
    for (const q of day.groups.flatMap(group => group.questions)) {
      result.total++;
      const mode = questionMode(q);
      if (!mode.answer) { result.ungradable++; continue; }
      result.gradable++;
      const selected = responses[q.id];
      const complete = mode.kind === 'choice'
        ? typeof selected === 'string' && mode.options.some(option => option.letter === selected)
        : Array.isArray(selected) && selected.length === mode.items.length &&
          selected.every((letter, index) => mode.items[index].options.some(option => option.letter === letter));
      if (!complete) { result.unanswered++; continue; }
      result.attempted++;
      const correct = mode.kind === 'choice' ? selected === mode.answer :
        selected.every((letter, index) => letter === mode.answer[index]);
      result.graded.push({ id: q.id, correct });
      if (correct) result.correct++;
      else result.wrong.push({ id: q.id, selected, answer: mode.answer });
    }
    return result;
  }

  function buildPlan(questions) {
    return DAYS.map((day, index) => {
      const groups = day.points.map(id => ({
        point: KNOWLEDGE.get(id),
        questions: questions.filter(q => KNOWLEDGE.classify(q) === id),
      }));
      const assigned = groups.flatMap(group => group.questions);
      return { ...day, number: index + 1, groups, total: assigned.length,
        answerable: assigned.filter(q => questionMode(q).answer != null).length };
    });
  }

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value != null) node.textContent = value;
    return node;
  }

  function appendQuestion(card, ordinal, text) {
    const line = element('p', 'english-plan-question');
    line.appendChild(element('strong', 'english-plan-number', `第 ${ordinal} 题 · `));
    line.appendChild(document.createTextNode(String(text).trimStart()));
    card.appendChild(line);
  }

  function renderOverview(main, questions) {
    const plan = buildPlan(questions);
    const intro = element('p', 'english-plan-intro',
      `题库共 ${questions.length} 道原题，按知识点分到 7 天。每天先完成建议量，其余同类题留作下一轮；这不是要求一周刷完全部题目。`);
    main.appendChild(intro);
    const actions = element('div', 'english-plan-actions');
    const back = element('a', 'english-plan-action', '返回英语错题库');
    back.href = '#/english-bank';
    const print = element('button', 'english-plan-action', '打印 A4 计划');
    print.type = 'button';
    print.addEventListener('click', () => window.print());
    actions.append(back, print);
    main.appendChild(actions);
    const note = element('p', 'notice english-plan-note',
      '题目和答案来自 PDF 机器提取，分类也待人工核对。无参考答案的题可讨论，不计入正确率；做题后按第 1、3、7 天间隔重做仍错的题。');
    main.appendChild(note);
    const primer = element('section', 'english-plan-primer');
    primer.appendChild(element('h2', 'group', '先学：连词与状语从句'));
    const primerDetails = element('details', 'english-plan-primer-details');
    primerDetails.open = true;
    primerDetails.appendChild(element('summary', null, '完整讲解、连词用法清单与常见错误'));
    primerDetails.appendChild(root.EnglishBank.knowledgeIntro(KNOWLEDGE.get('connectors')));
    primer.appendChild(primerDetails);
    main.appendChild(primer);
    const list = element('div', 'english-plan-days');
    for (const day of plan) {
      const card = element('section', 'english-plan-day');
      const heading = element('h2', null, `第 ${day.number} 天 · ${day.title}`);
      const topics = element('p', 'english-plan-topics',
        day.groups.map(group => `${group.point.title} ${group.questions.length} 题`).join(' · '));
      const target = element('p', null, `今日先做：${day.target}；所属原题 ${day.total} 道（可自动判分 ${day.answerable} 道）`);
      const learn = element('p', null, `学习：${day.learn}`);
      const check = element('p', null, `自检：${day.check}`);
      const record = element('p', 'english-plan-record', '□ 已学知识点　□ 已完成练习　□ 已记录错因　　复测：____ / ____');
      const link = element('a', 'english-plan-day-link', '查看今天的原题 →');
      link.href = `#/english-plan/${day.number}`;
      card.append(heading, topics, target, learn, check, record, link);
      list.appendChild(card);
    }
    main.appendChild(list);
  }

  function renderDay(main, questions, number) {
    const day = buildPlan(questions)[Number(number) - 1];
    if (!day || String(day.number) !== String(number)) {
      main.appendChild(element('p', 'error', '找不到这一天的复习计划。'));
      return;
    }
    main.appendChild(element('p', 'english-plan-intro',
      `${day.learn} 今日建议先做 ${day.target}；下方已展开全部 ${day.total} 道原题。选择会自动保存，可分次完成后提交。`));
    const back = element('a', 'english-plan-action', '返回 7 天计划');
    back.href = '#/english-plan';
    main.appendChild(back);
    const form = element('form', 'english-plan-form');
    const draft = draftFor(day.number);
    let ordinal = 0;
    for (const group of day.groups) {
      if (!group.questions.length) continue;
      const section = element('section', 'english-knowledge-group');
      section.appendChild(element('h2', 'group', `${group.point.title} · 知识点讲解 · ${group.questions.length} 题`));
      section.appendChild(root.EnglishBank.knowledgeIntro(group.point));
      for (const q of group.questions) {
        ordinal++;
        const mode = questionMode(q);
        const card = element('article', `card english-plan-item ${root.Progress.status(PROGRESS_ID, q.id)}`);
        if (mode.kind === 'choice') {
          appendQuestion(card, ordinal, mode.stem);
          const choices = element('div', 'english-plan-choices');
          for (const option of mode.options) {
            const label = element('label');
            const radio = element('input');
            radio.type = 'radio';
            radio.name = `q-${q.id}`;
            radio.value = option.letter;
            radio.checked = draft[q.id] === option.letter;
            radio.addEventListener('change', () => {
              selectAnswer(day.number, q.id, option.letter);
              refreshCount();
            });
            label.append(radio, element('span', null, `${option.letter}. ${option.text}`));
            choices.appendChild(label);
          }
          card.appendChild(choices);
          if (!mode.answer) card.appendChild(element('p', 'english-plan-ungraded',
            '这道题的参考答案尚不能可靠核对；选择会保存，但暂不计分。'));
        } else if (mode.kind === 'cloze' || mode.kind === 'reading-multi') {
          appendQuestion(card, ordinal, mode.kind === 'cloze' ? mode.passage : q.text);
          const rows = element('div', 'english-plan-cloze');
          for (let index = 0; index < mode.items.length; index++) {
            const item = mode.items[index];
            const label = element('label');
            label.appendChild(element('span', null,
              mode.kind === 'cloze' ? `第 ${item.number} 空` : `第 ${item.number} 小题`));
            const select = element('select');
            select.setAttribute('aria-label', `第 ${ordinal} 题第 ${item.number} 空`);
            const placeholder = element('option', null, '请选择');
            placeholder.value = '';
            select.appendChild(placeholder);
            for (const option of item.options) {
              const node = element('option', null,
                mode.kind === 'cloze' ? `${option.letter}. ${option.text}` : option.letter);
              node.value = option.letter;
              select.appendChild(node);
            }
            select.value = Array.isArray(draft[q.id]) ? draft[q.id][index] || '' : '';
            select.addEventListener('change', () => {
              const values = Array.isArray(draftFor(day.number)[q.id])
                ? draftFor(day.number)[q.id].slice() : new Array(mode.items.length).fill('');
              values[index] = select.value;
              selectAnswer(day.number, q.id, values);
              refreshCount();
            });
            label.appendChild(select);
            rows.appendChild(label);
          }
          card.appendChild(rows);
          if (!mode.answer) card.appendChild(element('p', 'english-plan-ungraded',
            '这道题的参考答案尚不能可靠核对；选择会保存，但暂不计分。'));
        } else {
          appendQuestion(card, ordinal, q.text);
          card.appendChild(element('p', 'english-plan-ungraded',
            '此题暂不支持在计划页自动判分；可打开原题单独练习。'));
          const link = element('a', 'english-plan-question-link', '打开原题');
          link.href = `#/english-bank/${q.id}`;
          card.appendChild(link);
        }
        section.appendChild(card);
      }
      form.appendChild(section);
    }
    const footer = element('div', 'english-plan-submit');
    const count = element('p', 'english-plan-count');
    function refreshCount() {
      const score = gradeDay(day, draftFor(day.number));
      count.textContent = `已完整作答 ${score.attempted} / ${score.gradable} 道可判分题` +
        ` · 待答 ${score.unanswered} 道 · 暂不可判分 ${score.ungradable} 道`;
    }
    refreshCount();
    const submit = element('button', null, '提交本次作答，查看错题');
    submit.type = 'submit';
    footer.append(count, submit);
    form.appendChild(footer);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const score = gradeDay(day, draftFor(day.number));
      if (!score.attempted) {
        count.textContent = score.gradable
          ? '请先完整作答至少一道可判分题，再提交。'
          : '今天暂无可自动判分的题目，请通过原题页练习。';
        return;
      }
      for (const item of score.graded) root.Progress.record(PROGRESS_ID, item.id, item.correct);
      for (const item of score.wrong) root.Progress.reveal(PROGRESS_ID, item.id);
      state.results[day.number] = { ...score, submittedAt: Date.now() };
      saveState();
      root.location.hash = `#/english-plan/${day.number}/result`;
    });
    main.appendChild(form);
  }

  function renderResult(main, questions, number) {
    const day = buildPlan(questions)[Number(number) - 1];
    if (!day || String(day.number) !== String(number)) {
      main.appendChild(element('p', 'error', '找不到这一天的复习计划。'));
      return;
    }
    const back = element('a', 'english-plan-action', '返回当天题目');
    back.href = `#/english-plan/${day.number}`;
    main.appendChild(back);
    const result = state.results[day.number];
    if (!result) {
      main.appendChild(element('p', 'notice', '这一天还没有提交记录。请先到当天题目页作答并提交。'));
      return;
    }
    main.appendChild(element('p', 'english-plan-intro',
      `本次提交 ${result.attempted} 道可判分题：答对 ${result.correct} 道，答错 ${result.wrong.length} 道；` +
      `未答 ${result.unanswered} 道，暂不可判分 ${result.ungradable} 道。`));
    if (!result.wrong.length) {
      main.appendChild(element('p', 'card', '本次提交没有答错的题。未答或无法可靠判分的题不计入错题。'));
      return;
    }
    main.appendChild(element('h2', 'group', '本次答错的原题与参考答案'));
    const byId = new Map(questions.map(q => [q.id, q]));
    for (const [index, wrong] of result.wrong.entries()) {
      const q = byId.get(wrong.id);
      if (!q) continue;
      const card = element('article', 'card english-plan-review');
      card.appendChild(element('h3', null, `错题 ${index + 1} · ${KNOWLEDGE.get(KNOWLEDGE.classify(q)).title}`));
      card.appendChild(element('p', 'english-plan-question', q.text));
      if (Array.isArray(wrong.answer)) {
        card.appendChild(element('p', 'english-plan-your-answer',
          `你的选择：${wrong.selected.map((value, i) => `(${i + 1}) ${value}`).join('　')}`));
        card.appendChild(element('p', 'english-plan-correct-answer',
          `参考答案：${wrong.answer.map((value, i) => `(${i + 1}) ${value}`).join('　')}`));
      } else {
        card.appendChild(element('p', 'english-plan-your-answer', `你的选择：${wrong.selected}`));
        card.appendChild(element('p', 'english-plan-correct-answer', `参考答案：${wrong.answer}`));
      }
      const link = element('a', 'english-plan-question-link', '打开原题再练');
      link.href = `#/english-bank/${q.id}`;
      card.appendChild(link);
      main.appendChild(card);
    }
    main.appendChild(element('p', 'notice', '参考答案由 PDF 机器提取，尚待人工核对；发现疑点时请以原卷为准。'));
  }

  const EnglishPlan = { DAYS, buildPlan, parseChoice, questionMode, gradeDay,
    renderOverview, renderDay, renderResult };
  if (typeof module !== 'undefined') module.exports = EnglishPlan;
  else root.EnglishPlan = EnglishPlan;
})(this);
