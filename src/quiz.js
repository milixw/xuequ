'use strict';

// 做题引擎：渲染一道题，处理作答、判分、解析和快捷输入栏。依赖全局 Answer、Progress、katex；英语听力题用 Speech（可选）。
// 题型：choice / multi / fill，以及英语的 open（自己写句子，提交后对照参考答案和自查要点自评，不计入对错）。
// 英语题可带 audio: { text }：题干下显示朗读按钮；设备不能朗读时改为显示听力原文。

(function (root) {
  const LEVEL_NAMES = { basic: '基础', extended: '扩展', challenge: '挑战' };
  const DIFFICULTY_NAMES = { 1: '易', 2: '较易', 3: '中等', 4: '较难', 5: '压轴' };
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
      if (b.kind === 'ratio') [':', '.', '/'].forEach(k => keys.add(k));
      if (b.kind === 'expr' || b.kind === 'factor' || b.kind === 'frac') {
        const vars = b.vars || [...new Set(String(b.answer).match(/[a-zA-Z]/g) || [])];
        vars.forEach(v => keys.add(v));
        ['+', '−', '/', '(', ')', '^'].forEach(k => keys.add(k));
      }
      if (b.kind === 'real' || b.kind === 'reals') ['√', '∛', 'π', '−', '/', '(', ')', '^'].forEach(k => keys.add(k));
      if (b.kind === 'reals') keys.add(',');
      if (b.kind === 'angle') ['°', '′', '″'].forEach(k => keys.add(k));
      if (b.kind === 'ineq') [b.var || 'x', '<', '>', '≤', '≥', '−', '/', '.', '无解'].forEach(k => keys.add(k));
    }
    return [...keys];
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // 共享渲染：渲染题号、题干、配图、答案输入、快捷输入栏
  // opts: { index, total, onChange?(response), onSubmit?() }
  // 返回 { setDisabled(bool), setResponse(response), getResponse(), mark(result) }
  function renderQuestion(container, q, opts) {
    opts = opts || {};
    container.innerHTML = '';

    const head = el('div', 'q-head');
    const badge = q.difficulty
      ? `<span class="lv lv-score-${q.difficulty}" title="${escapeHtml(q.difficultyReason || '')}">难度 ${q.difficulty}/5 · ${DIFFICULTY_NAMES[q.difficulty]}</span>`
      : `<span class="lv lv-${q.level}">${(opts.levelNames || LEVEL_NAMES)[q.level]}</span>`;
    head.innerHTML =
      badge +
      `<span class="q-no">${escapeHtml(opts.numberLabel || `第 ${opts.index + 1} / ${opts.total} 题`)}</span>` +
      `<span class="q-id" title="题号，纠错时请写上">${q.id}</span>` +
      `<span class="q-state"></span>`;
    container.appendChild(head);

    container.appendChild(el('div', 'q-stem', renderText(q.stem)));
    if (q.figure) container.appendChild(el('div', 'q-figure', q.figure));
    if (q.audio) container.appendChild(audioBox(q.audio));

    const answerBox = el('div', 'q-answer');
    container.appendChild(answerBox);
    let selected = q.type === 'multi' ? new Set() : null;
    const inputs = [];
    let lastInput = null;
    let notify = opts.onChange || (() => {});
    let locked = false;

    function lock(state) {
      locked = state;
      answerBox.querySelectorAll('input, textarea, button.option, .seg button').forEach(x => {
        x.disabled = state;
      });
    }

    function fire() {
      if (locked) return;
      if (q.type === 'choice') notify(selected);
      else if (q.type === 'open') notify(inputs[0].get());
      else if (q.type === 'multi') notify([...selected]);
      else notify(inputs.map(x => x.get()));
    }

    if (q.type === 'open') {
      const area = el('textarea', 'open-answer');
      area.rows = 3;
      area.lang = 'en';
      area.spellcheck = false;
      area.setAttribute('autocapitalize', 'sentences');
      area.placeholder = 'Write your sentence here.';
      area.addEventListener('input', () => { if (!locked) fire(); });
      answerBox.appendChild(area);
      inputs.push({ get: () => area.value, input: area });
    } else if (q.type === 'choice' || q.type === 'multi') {
      if (q.type === 'multi') answerBox.appendChild(el('p', 'hint', '多选题：选出所有正确的选项'));
      q.options.forEach((opt, i) => {
        const b = el('button', 'option', `<span class="letter">${LETTERS[i]}</span><span class="text">${renderText(opt)}</span>`);
        b.type = 'button';
        b.addEventListener('click', () => {
          if (locked) return;
          if (q.type === 'choice') {
            selected = i;
            answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', j === i));
          } else {
            selected.has(i) ? selected.delete(i) : selected.add(i);
            b.classList.toggle('selected', selected.has(i));
          }
          fire();
        });
        answerBox.appendChild(b);
      });
    } else {
      q.blanks.forEach(blank => {
        const row = el('div', 'blank');
        if (blank.label) row.appendChild(el('span', 'label', renderText(blank.label)));
        if (blank.options) {
          let value = null;
          const group = el('div', 'seg');
          const optionBtns = [];
          blank.options.forEach(o => {
            const b = el('button', '', renderText(/^[<>=≤≥≠]$/.test(o) ? `$${o}$` : o));
            b.type = 'button';
            b.addEventListener('click', () => {
              if (locked) return;
              value = o;
              group.querySelectorAll('button').forEach(x => x.classList.toggle('selected', x === b));
              group.classList.remove('wrong');
              fire();
            });
            group.appendChild(b);
            optionBtns.push({ btn: b, value: o });
          });
          row.appendChild(group);
          inputs.push({ get: () => value, group, optionBtns });
        } else {
          const input = el('input');
          input.type = 'text';
          input.autocomplete = 'off';
          input.setAttribute('autocapitalize', 'off');
          input.spellcheck = false;
          input.inputMode = blank.kind === 'num' || blank.kind === 'nums' || blank.kind === 'ratio' ? 'decimal' : 'text';
          input.placeholder = blank.kind === 'nums' ? '多个答案用逗号隔开' : blank.kind === 'ratio' ? '比如 3:4' : blank.kind === 'ineq' ? '比如 x≥2 或 −1<x<3' : '';
          input.addEventListener('focus', () => (lastInput = input));
          input.addEventListener('input', () => {
            if (locked) return;
            input.classList.remove('wrong');
            fire();
          });
          input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && opts.onSubmit) opts.onSubmit();
          });
          row.appendChild(input);
          inputs.push({ get: () => input.value, input });
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

    return {
      setDisabled: lock,
      setResponse(response) {
        if (q.type === 'choice') {
          selected = response;
          answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', j === response));
        } else if (q.type === 'multi') {
          selected = new Set(response || []);
          answerBox.querySelectorAll('.option').forEach((o, j) => o.classList.toggle('selected', selected.has(j)));
        } else if (q.type === 'open') {
          inputs[0].input.value = response == null ? '' : String(response);
        } else {
          (response || []).forEach((v, i) => {
            const it = inputs[i];
            if (!it) return;
            if (it.input) {
              it.input.value = v == null ? '' : String(v);
            } else if (it.optionBtns) {
              it.group.classList.remove('wrong');
              it.optionBtns.forEach(({ btn, value }) => {
                btn.classList.toggle('selected', value === v);
              });
            }
          });
        }
      },
      getResponse() {
        if (q.type === 'choice') return selected;
        if (q.type === 'multi') return [...selected];
        if (q.type === 'open') return inputs[0].get();
        return inputs.map(x => x.get());
      },
      mark(result) {
        if (q.type === 'fill' && result.blanks) {
          result.blanks.forEach((b, i) => {
            const it = inputs[i];
            if (!it) return;
            if (it.input) it.input.classList.toggle('wrong', !b.ok);
            else if (it.group) it.group.classList.toggle('wrong', !b.ok);
          });
        } else {
          answerBox.querySelectorAll('.option').forEach(o => o.classList.remove('wrong'));
          if (!result.ok) answerBox.querySelectorAll('.option.selected').forEach(o => o.classList.add('wrong'));
        }
      },
    };
  }

  // 听力：朗读按钮；不能朗读时直接给原文，保证题目还能做
  function audioBox(audio) {
    const box = el('div', 'q-audio');
    const speech = root.Speech;
    const can = !!(speech && speech.available());
    box.innerHTML = can
      ? `<button type="button" class="say say-big" aria-label="播放听力">🔊</button><span>点喇叭听，可以多听几遍</span>`
      : `<p class="notice">这台设备暂时不能朗读，请直接读听力原文：</p><p class="q-script" lang="en">${escapeHtml(audio.text)}</p>`;
    if (can) box.querySelector('button').addEventListener('click', () => speech.say(audio.text));
    return box;
  }

  // opts: { sectionId, q, index, total, prevHref, nextHref, levelNames? }
  function mount(container, opts) {
    const { sectionId, q } = opts;
    container.innerHTML = '';

    const handle = renderQuestion(container, q, {
      index: opts.index,
      total: opts.total,
      levelNames: opts.levelNames,
      onChange: clearFeedback,
      onSubmit: submit,
    });

    const stateEl = container.querySelector('.q-state');
    const showState = () => {
      const st = Progress.status(sectionId, q.id);
      stateEl.textContent = st === 'solved' ? '✓ 已答对' : st === 'revealed' ? '看过解析' : '';
      stateEl.className = 'q-state ' + st;
    };
    showState();

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

    // 产出题：先写，再对照参考答案和自查要点自评；“符合要求”记为完成，不计答错次数
    function submitOpen() {
      const text = String(handle.getResponse() || '').trim();
      if (!text) return setFeedback('info', '先写一句英文');
      feedback.className = 'feedback info open-check';
      feedback.innerHTML =
        `<b>对照参考答案和要点，检查你写的句子：</b>` +
        `<ul class="open-refs">${q.reference.map(x => `<li lang="en">${escapeHtml(x)}</li>`).join('')}</ul>` +
        `<ol class="open-points">${q.checks.map(x => `<li>${renderText(x)}</li>`).join('')}</ol>` +
        `<div class="open-actions"><button type="button" class="primary" data-ok="1">符合要求</button>` +
        `<button type="button" class="secondary" data-ok="0">还要改改</button></div>`;
      feedback.querySelectorAll('[data-ok]').forEach(btn => btn.addEventListener('click', () => {
        if (btn.dataset.ok === '1') {
          Progress.record(sectionId, q.id, true);
          setFeedback('ok', '✓ 完成！这类题是自己检查，不算对错，写得越多越熟练。');
        } else {
          setFeedback('info', '对照要点改一改，再点“提交”检查一次。');
        }
        showState();
      }));
    }

    function submit() {
      if (q.type === 'open') return submitOpen();
      const response = handle.getResponse();
      if (q.type === 'choice' && response === null) return setFeedback('info', '先选一个答案');
      if (q.type === 'multi' && !response.length) return setFeedback('info', '先选出答案');
      const result = Answer.checkQuestion(q, response);
      const hint = result.blanks && result.blanks.find(b => !b.ok && b.error);
      if (hint) {
        // 输入格式有问题：标出哪些空解析成功了，哪些没
        result.blanks.forEach((b, i) => {
          const input = container.querySelectorAll('.blank input')[i];
          if (input) input.classList.toggle('wrong', !b.ok && !b.error);
        });
        return setFeedback('info', hint.error);
      }
      Progress.record(sectionId, q.id, result.ok);
      handle.mark(result);
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
      if (q.type === 'open') return q.reference.map(escapeHtml).join(' / ') + '（参考答案，意思和语法对即可）';
      return q.blanks
        .map(b => (b.label ? renderText(b.label) + ' ' : '') + renderText(Answer.answerText(b)) + (b.suffix ? ' ' + renderText(b.suffix) : ''))
        .join('；');
    }

    function reveal() {
      if (explain.hidden) {
        explain.innerHTML =
          `<div class="answer-line"><b>答案：</b>${answerSummary()}</div>` +
          (q.audio ? `<div class="answer-line"><b>听力原文：</b><span lang="en">${escapeHtml(q.audio.text)}</span></div>` : '') +
          `<ol>${q.explain.map(s => `<li>${renderText(s)}</li>`).join('')}</ol>`;
        // 演示动画放在解析里：它会直接演示出答案
        if (q.demo) {
          const slot = el('div');
          explain.querySelector('.answer-line:last-of-type').after(slot);
          Demos.mount(slot, q.demo);
        }
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

if (typeof module !== 'undefined') module.exports = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES, LETTERS, DIFFICULTY_NAMES };
  else root.Quiz = { mount, renderQuestion, renderText, escapeHtml, LEVEL_NAMES, LETTERS, DIFFICULTY_NAMES };
})(this);
