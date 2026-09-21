'use strict';

// 做题引擎：渲染一道题，处理作答、判分、解析和快捷输入栏。依赖全局 Answer、Progress、katex。

(function (root) {
  const LEVEL_NAMES = { basic: '基础', extended: '扩展', challenge: '挑战' };
  const LETTERS = 'ABCDEFGH';

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // 文本排版：$...$ 行内公式，$$...$$ 独立公式，**...** 加粗，换行保留
  function renderText(s) {
    return String(s)
      .split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/)
      .map(part => {
        if (part.startsWith('$$')) {
          return katex.renderToString(part.slice(2, -2), { displayMode: true, throwOnError: false });
        }
        if (part.startsWith('$')) {
          return katex.renderToString(part.slice(1, -1), { throwOnError: false });
        }
        return escapeHtml(part).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
      })
      .join('');
  }

  // 快捷输入栏的按键，按填空类型组合
  function quickKeys(blanks) {
    const keys = new Set();
    for (const b of blanks) {
      if (b.options) continue;
      if (b.kind === 'num' || b.kind === 'nums') ['−', '/', '.'].forEach(k => keys.add(k));
      if (b.kind === 'nums') keys.add(',');
      if (b.kind === 'expr') {
        const vars = b.vars || [...new Set(String(b.answer).match(/[a-zA-Z]/g) || [])];
        vars.forEach(v => keys.add(v));
        ['+', '−', '/', '(', ')', '^'].forEach(k => keys.add(k));
      }
      if (b.kind === 'angle') ['°', '′', '″'].forEach(k => keys.add(k));
    }
    return [...keys];
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // opts: { sectionId, q, index, total, prevHref, nextHref }
  function mount(container, opts) {
    const { sectionId, q } = opts;
    container.innerHTML = '';

    const head = el('div', 'q-head');
    head.innerHTML =
      `<span class="lv lv-${q.level}">${LEVEL_NAMES[q.level]}</span>` +
      `<span class="q-no">第 ${opts.index + 1} / ${opts.total} 题</span>` +
      `<span class="q-id" title="题号，纠错时请写上">${q.id}</span>` +
      `<span class="q-state"></span>`;
    container.appendChild(head);
    const stateEl = head.querySelector('.q-state');
    const showState = () => {
      const st = Progress.status(sectionId, q.id);
      stateEl.textContent = st === 'solved' ? '✓ 已答对' : st === 'revealed' ? '看过解析' : '';
      stateEl.className = 'q-state ' + st;
    };
    showState();

    container.appendChild(el('div', 'q-stem', renderText(q.stem)));
    if (q.figure) container.appendChild(el('div', 'q-figure', q.figure));

    // ---------- 作答区 ----------
    const answerBox = el('div', 'q-answer');
    container.appendChild(answerBox);
    let selected = q.type === 'multi' ? new Set() : null;
    const inputs = [];      // 每个空一个：{ get(), mark(ok) }
    let lastInput = null;

    if (q.type === 'choice' || q.type === 'multi') {
      if (q.type === 'multi') answerBox.appendChild(el('p', 'hint', '多选题：选出所有正确的选项'));
      q.options.forEach((opt, i) => {
        const b = el('button', 'option', `<span class="letter">${LETTERS[i]}</span><span class="text">${renderText(opt)}</span>`);
        b.type = 'button';
        b.addEventListener('click', () => {
          if (q.type === 'choice') {
            selected = i;
            answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', j === i));
          } else {
            selected.has(i) ? selected.delete(i) : selected.add(i);
            b.classList.toggle('selected', selected.has(i));
          }
          clearFeedback();
        });
        answerBox.appendChild(b);
      });
    } else {
      q.blanks.forEach(blank => {
        const row = el('div', 'blank');
        if (blank.label) row.appendChild(el('span', 'label', renderText(blank.label)));
        if (blank.options) {
          // 固定选项（比如 > < =）用按钮
          let value = null;
          const group = el('div', 'seg');
          blank.options.forEach(o => {
            const b = el('button', '', renderText(/^[<>=≤≥≠]$/.test(o) ? `$${o}$` : o));
            b.type = 'button';
            b.addEventListener('click', () => {
              value = o;
              group.querySelectorAll('button').forEach(x => x.classList.toggle('selected', x === b));
              clearFeedback();
            });
            group.appendChild(b);
          });
          row.appendChild(group);
          inputs.push({ get: () => value, mark: ok => group.classList.toggle('wrong', !ok) });
        } else {
          const input = el('input');
          input.type = 'text';
          input.autocomplete = 'off';
          input.setAttribute('autocapitalize', 'off');
          input.spellcheck = false;
          input.inputMode = blank.kind === 'num' || blank.kind === 'nums' ? 'decimal' : 'text';
          input.placeholder = blank.kind === 'nums' ? '多个答案用逗号隔开' : '';
          input.addEventListener('focus', () => (lastInput = input));
          input.addEventListener('input', () => {
            input.classList.remove('wrong');
            clearFeedback();
          });
          input.addEventListener('keydown', e => {
            if (e.key === 'Enter') submit();
          });
          row.appendChild(input);
          inputs.push({ get: () => input.value, mark: ok => input.classList.toggle('wrong', !ok), input });
        }
        if (blank.suffix) row.appendChild(el('span', 'suffix', renderText(blank.suffix)));
        answerBox.appendChild(row);
      });

      const keys = quickKeys(q.blanks);
      if (keys.length) {
        const bar = el('div', 'keys');
        keys.forEach(k => {
          const b = el('button', '', escapeHtml(k));
          b.type = 'button';
          // pointerdown + preventDefault：点按键时输入框不失去焦点，手机键盘不收起
          b.addEventListener('pointerdown', e => {
            e.preventDefault();
            const target = lastInput || (inputs.find(x => x.input) || {}).input;
            if (!target) return;
            const start = target.selectionStart ?? target.value.length;
            const end = target.selectionEnd ?? target.value.length;
            target.value = target.value.slice(0, start) + k + target.value.slice(end);
            target.setSelectionRange(start + k.length, start + k.length);
            target.focus();
            target.dispatchEvent(new Event('input'));
          });
          bar.appendChild(b);
        });
        answerBox.appendChild(bar);
      }
    }

    // ---------- 反馈、按钮、解析 ----------
    const feedback = el('div', 'feedback');
    container.appendChild(feedback);
    const actions = el('div', 'q-actions');
    const revealBtn = el('button', 'secondary', '看解析');
    const submitBtn = el('button', 'primary', '提交');
    revealBtn.type = submitBtn.type = 'button';
    actions.append(revealBtn, submitBtn);
    container.appendChild(actions);
    const explain = el('div', 'explain');
    explain.hidden = true;
    container.appendChild(explain);

    function clearFeedback() {
      feedback.className = 'feedback';
      feedback.textContent = '';
    }

    function setFeedback(kind, text) {
      feedback.className = 'feedback ' + kind;
      feedback.textContent = text;
    }

    function submit() {
      let response;
      if (q.type === 'choice') {
        if (selected === null) return setFeedback('info', '先选一个答案');
        response = selected;
      } else if (q.type === 'multi') {
        if (!selected.size) return setFeedback('info', '先选出答案');
        response = [...selected];
      } else {
        response = inputs.map(x => x.get());
      }

      const result = Answer.checkQuestion(q, response);
      // 输入看不懂或需要再化简时只提示，不算一次作答
      const hint = result.blanks && result.blanks.find(b => !b.ok && b.error);
      if (hint) {
        result.blanks.forEach((b, i) => inputs[i].mark(b.ok || !b.error));
        return setFeedback('info', hint.error);
      }

      Progress.record(sectionId, q.id, result.ok);
      if (result.blanks) result.blanks.forEach((b, i) => inputs[i].mark(b.ok));
      if (q.type !== 'fill') {
        answerBox.querySelectorAll('.option').forEach(o => o.classList.remove('wrong'));
        if (!result.ok) answerBox.querySelectorAll('.option.selected').forEach(o => o.classList.add('wrong'));
      }
      if (result.ok) {
        setFeedback('ok', '✓ 回答正确！');
        revealBtn.textContent = '看看解析';
      } else {
        setFeedback('fail', '✗ 不对哦，再想想。实在想不出来可以看解析');
      }
      showState();
    }

    function answerSummary() {
      if (q.type === 'choice') return `${LETTERS[q.answer]}. ${renderText(q.options[q.answer])}`;
      if (q.type === 'multi') return [...q.answer].sort().map(i => LETTERS[i]).join('、');
      return q.blanks
        .map(b => (b.label ? renderText(b.label) + ' ' : '') + renderText(Answer.answerText(b)) + (b.suffix ? ' ' + renderText(b.suffix) : ''))
        .join('；');
    }

    function reveal() {
      if (explain.hidden) {
        explain.innerHTML =
          `<div class="answer-line"><b>答案：</b>${answerSummary()}</div>` +
          `<ol>${q.explain.map(s => `<li>${renderText(s)}</li>`).join('')}</ol>`;
        explain.hidden = false;
        if (Progress.status(sectionId, q.id) !== 'solved') Progress.reveal(sectionId, q.id);
        revealBtn.textContent = '收起解析';
        showState();
        explain.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        explain.hidden = true;
        revealBtn.textContent = '看解析';
      }
    }

    submitBtn.addEventListener('click', submit);
    revealBtn.addEventListener('click', reveal);

    const nav = el('nav', 'q-nav');
    nav.innerHTML =
      (opts.prevHref ? `<a href="${opts.prevHref}">‹ 上一题</a>` : '<span></span>') +
      (opts.nextHref ? `<a href="${opts.nextHref}">下一题 ›</a>` : '<span></span>');
    container.appendChild(nav);
  }

  root.Quiz = { mount, renderText, escapeHtml, LEVEL_NAMES };
})(this);
