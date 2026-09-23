'use strict';

// 内容校验：目录与文件一致、题量和难度配比、字段完整、答案可被判分器接受、verify 与答案一致、公式能渲染
const fs = require('fs');
const path = require('path');
const { test, warn, assert } = require('./harness');
const A = require('../src/answer.js');
const katex = require('../vendor/katex/katex.min.js');

// 内容文件是浏览器脚本，依赖全局 Content；verify 函数里可以用 Frac 和 F
globalThis.Content = require('../src/content.js');
globalThis.Frac = A.Frac;
globalThis.F = A.Frac.of;
require('../content/catalog.js');

const ROOT = path.join(__dirname, '..');
const LEVELS = { b: 'basic', e: 'extended', c: 'challenge' };
const KINDS = ['num', 'nums', 'expr', 'real', 'reals', 'angle', 'text'];
const DEMOS = ['foldCut', 'numberLineFold', 'angleFold', 'ropeCut'];  // src/demos.js 里的演示类型

// 取出文本里所有 $...$ / $$...$$ 公式，逐个用 KaTeX 编译
function checkMath(text, where) {
  assert(typeof text === 'string' && text.trim(), `${where}：内容为空`);
  // 单反斜杠会被 JS 吃掉：'\frac' 变成换页符、'\times' 变成制表符、'\neq' 变成换行，KaTeX 不会报错
  const ctrl = text.match(/[\x00-\x1F\x7F]/);
  assert(!ctrl, `${where}：含控制字符 U+${ctrl && ctrl[0].charCodeAt(0).toString(16).padStart(4, '0')}，多半是 TeX 命令少写了一个反斜杠`);
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/);
  for (const p of parts) {
    if (p.startsWith('$')) {
      const tex = p.replace(/^\$\$?|\$\$?$/g, '');
      // 单反斜杠被 JS 吃掉后 '\sqrt' 会变成 'sqrt'，KaTeX 当成一串字母照样渲染，不报错也看不出来
      const bare = tex.match(/(?<!\\)\b(sqrt|frac|dfrac|times|cdots|ldots|lvert|rvert|approx|neq|angle|overline|cdot|div|left|right|mathrm)\b/);
      assert(!bare, `${where}：公式 ${p} 里的 ${bare && bare[1]} 前面没有反斜杠，多半是 TeX 命令少写了一个反斜杠`);
      try {
        katex.renderToString(tex, { throwOnError: true, strict: 'error' });
      } catch (e) {
        throw new Error(`${where}：公式无法渲染 ${p}\n      ${e.message}`);
      }
    } else {
      assert(!p.includes('$'), `${where}：$ 没有成对出现`);
    }
  }
}

function sameSet(a, b, eq) {
  return a.length === b.length && a.every(x => b.some(y => eq(x, y)));
}

// verify() 的返回值与某个空的标准答案是否一致
function verifyBlank(blank, v) {
  switch (blank.kind) {
    case 'num': return A.Frac.of(v).eq(A.Frac.of(blank.answer));
    case 'nums': return sameSet(v.map(A.Frac.of), blank.answer.map(A.Frac.of), (x, y) => x.eq(y));
    case 'expr': return A.equivalent(A.parseExpr(String(v)), A.parseExpr(blank.answer));
    case 'real': return A.realEqual(typeof v === 'number' ? v : A.realValue(String(v)), A.realValue(blank.answer));
    case 'reals': return sameSet(v.map(x => (typeof x === 'number' ? x : A.realValue(String(x)))), blank.answer.map(A.realValue), (x, y) => A.realEqual(x, y));
    case 'angle': return A.parseAngle(String(v)).eq(A.parseAngle(blank.answer));
    case 'text': return (Array.isArray(blank.answer) ? blank.answer : [blank.answer]).includes(v);
  }
  return false;
}

function checkQuestion(q, sectionNo, where) {
  const m = /^(\d+\.\d+)-([bec])(\d{2})$/.exec(q.id || '');
  assert(m, `${where}：题目 ID 格式应为 ${sectionNo}-b01`);
  assert(m[1] === sectionNo, `${where}：题目 ID 前缀应为 ${sectionNo}`);
  assert(LEVELS[m[2]] === q.level, `${where}：ID 中的档位字母与 level 不一致`);
  checkMath(q.stem, `${where} 题干`);
  assert(Array.isArray(q.explain) && q.explain.length, `${where}：缺少分步解析 explain`);
  q.explain.forEach((s, i) => checkMath(s, `${where} 解析第 ${i + 1} 步`));
  if (q.figure) assert(/^<svg[\s\S]*<\/svg>$/.test(q.figure.trim()), `${where}：figure 应为内联 SVG`);
  if (q.demo) assert(DEMOS.includes(q.demo.type), `${where}：未知演示类型 ${q.demo.type}`);

  if (q.type === 'choice' || q.type === 'multi') {
    assert(Array.isArray(q.options) && q.options.length >= 2, `${where}：选项至少 2 个`);
    q.options.forEach((o, i) => checkMath(o, `${where} 选项 ${i + 1}`));
    assert(new Set(q.options).size === q.options.length, `${where}：选项有重复`);
    const answers = q.type === 'choice' ? [q.answer] : q.answer;
    assert(Array.isArray(answers) && answers.length, `${where}：缺少答案`);
    for (const a of answers) {
      assert(Number.isInteger(a) && a >= 0 && a < q.options.length, `${where}：答案下标 ${a} 超出选项范围`);
    }
    if (q.type === 'multi') assert(new Set(q.answer).size === q.answer.length, `${where}：多选答案有重复`);
  } else if (q.type === 'fill') {
    assert(Array.isArray(q.blanks) && q.blanks.length, `${where}：填空题缺少 blanks`);
    q.blanks.forEach((b, i) => {
      const w = `${where} 第 ${i + 1} 空`;
      assert(KINDS.includes(b.kind), `${w}：未知类型 ${b.kind}`);
      if (b.label) checkMath(b.label, `${w} 标签`);
      if (b.kind === 'nums' || b.kind === 'reals') assert(Array.isArray(b.answer) && b.answer.length, `${w}：${b.kind} 的答案应为数组`);
      if (b.kind === 'text' && b.options) {
        const answers = Array.isArray(b.answer) ? b.answer : [b.answer];
        assert(answers.every(a => b.options.includes(a)), `${w}：答案不在按钮选项中`);
      }
      // 标准答案本身必须能被判分器判对（顺带检查了“已化简”等要求）
      const input = b.kind === 'nums' || b.kind === 'reals' ? b.answer.join(',') : Array.isArray(b.answer) ? b.answer[0] : String(b.answer);
      const r = A.checkBlank(b, input);
      assert(r.ok, `${w}：标准答案 ${input} 不能被判分器判对${r.error ? '（' + r.error + '）' : ''}`);
    });
  } else {
    throw new Error(`${where}：未知题型 ${q.type}`);
  }

  if (q.verify) {
    let v;
    try {
      v = q.verify();
    } catch (e) {
      throw new Error(`${where}：verify 执行出错 ${e.message}`);
    }
    if (q.type === 'choice') assert(v === q.answer, `${where}：verify 得到 ${v}，答案是 ${q.answer}`);
    else if (q.type === 'multi') assert(sameSet(v, q.answer, (x, y) => x === y), `${where}：verify 与多选答案不一致`);
    else {
      // 只有一个空时 verify 直接返回这个空的值；多个空时返回数组
      const values = q.blanks.length === 1 ? [v] : v;
      assert(Array.isArray(values) && values.length === q.blanks.length, `${where}：verify 返回值个数与空数不一致`);
      q.blanks.forEach((b, i) => {
        assert(verifyBlank(b, values[i]), `${where}：第 ${i + 1} 空 verify 得到 ${values[i]}，答案是 ${b.answer}`);
      });
    }
  }
}

for (const meta of Content.sectionMetas()) {
  const file = path.join(ROOT, Content.path(meta.id));
  const exists = fs.existsSync(file);

  if (!meta.section.ready) {
    if (exists) warn(`${meta.id} 的文件已存在，但目录里没有标记 ready`);
    continue;
  }

  test(`小节 ${meta.id} ${meta.section.title}`, () => {
    assert(exists, `目录标记为 ready，但缺少文件 ${Content.path(meta.id)}`);
    require(file);
    const s = Content.sections[meta.id];
    assert(s, `文件里没有注册 id 为 ${meta.id} 的小节`);
    assert(s.title === meta.section.title, `标题“${s.title}”与目录“${meta.section.title}”不一致`);
    assert(s.review && ['pending', 'approved'].includes(s.review.status), 'review.status 应为 pending 或 approved');

    assert(Array.isArray(s.intro) && s.intro.length >= 3 && s.intro.length <= 6, '知识点卡片应为 3～6 张');
    s.intro.forEach((card, i) => {
      checkMath(card.title, `知识点 ${i + 1} 标题`);
      checkMath(card.body, `知识点 ${i + 1} 正文`);
      if (card.example) checkMath(card.example, `知识点 ${i + 1} 例子`);
      if (card.pitfall) checkMath(card.pitfall, `知识点 ${i + 1} 易错提醒`);
    });

    const qs = s.questions;
    const count = level => qs.filter(q => q.level === level).length;
    assert(count('basic') === 5, `基础题应为 5 道，现在 ${count('basic')} 道`);
    assert(count('challenge') === 5, `挑战题应为 5 道，现在 ${count('challenge')} 道`);
    assert(count('extended') >= 5 && count('extended') <= 10, `扩展题应为 5～10 道，现在 ${count('extended')} 道`);
    const ids = qs.map(q => q.id);
    assert(new Set(ids).size === ids.length, '题目 ID 有重复');
    qs.forEach(q => checkQuestion(q, meta.section.no, `题目 ${q.id || '(无 ID)'}`));

    const noVerify = qs.filter(q => !q.verify).map(q => q.id);
    if (noVerify.length && !(s.audit && s.audit.blind)) {
      warn(`${meta.id}：${noVerify.length} 道题没有 verify，且还没做盲解复核（${noVerify.join('、')}）`);
    }
  });
}
