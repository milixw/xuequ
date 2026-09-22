'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
const A = require('../src/answer.js');
const katex = require('../vendor/katex/katex.min.js');
const Content = globalThis.Content || require('../src/content.js');

if (!Content.catalog) require('../content/catalog.js');

function checkMath(text, where) {
  assert(typeof text === 'string' && text.trim(), `${where}：内容为空`);
  const ctrl = text.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/);
  assert(!ctrl, `${where}：含控制字符`);
  for (const part of text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/)) {
    if (!part.startsWith('$')) continue;
    const tex = part.replace(/^\$\$?|\$\$?$/g, '');
    katex.renderToString(tex, { throwOnError: true, strict: 'error' });
  }
}

for (const meta of Content.examMetas()) {
  if (!meta.exam.ready) continue;
  test(`真题卷 ${meta.exam.title}`, () => {
    const file = path.join(__dirname, '..', Content.examPath(meta.id));
    assert(fs.existsSync(file), `缺少真题卷文件 ${Content.examPath(meta.id)}`);
    require(file);
    const exam = Content.exams[meta.id];
    assert(exam, `文件没有注册真题卷 ${meta.id}`);
    assert(exam.title === meta.exam.title, '真题卷标题与目录不一致');
    assert(exam.questions.length === meta.exam.questionCount, `题量应为 ${meta.exam.questionCount}`);

    const ids = exam.questions.map(q => q.id);
    assert(new Set(ids).size === ids.length, '真题卷题目 ID 有重复');
    const numbers = exam.questions.map(q => q.originalNo);
    assert(numbers.every((n, i) => n === i + 1), '原卷题号应从 1 连续排列');

    for (const q of exam.questions) {
      const where = `原题 ${q.originalNo}`;
      assert(/^cm2025-q\d{2}$/.test(q.id), `${where}：题目 ID 格式错误`);
      assert(Content.sectionMeta(`${meta.volumeId}/${q.section}`), `${where}：未知教材小节 ${q.section}`);
      assert(Number.isInteger(q.difficulty) && q.difficulty >= 1 && q.difficulty <= 5, `${where}：难度应为 1～5`);
      assert(typeof q.difficultyReason === 'string' && q.difficultyReason.trim(), `${where}：缺少难度理由`);
      assert(typeof q.topic === 'string' && q.topic.trim(), `${where}：缺少知识点`);
      checkMath(q.stem, `${where}题干`);
      q.explain.forEach((s, i) => checkMath(s, `${where}解析${i + 1}`));
      if (q.figure) assert(/^<svg[\s\S]*<\/svg>$/.test(q.figure.trim()), `${where}：figure 应为 SVG`);

      let response;
      if (q.type === 'choice') response = q.answer;
      else if (q.type === 'multi') response = q.answer;
      else response = q.blanks.map(b => b.kind === 'nums' ? b.answer.join(',') : Array.isArray(b.answer) ? b.answer[0] : String(b.answer));
      const result = A.checkQuestion(q, response);
      assert(result.ok, `${where}：标准答案不能被判分器判对`);
    }
  });
}
