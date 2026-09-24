'use strict';

// 数学魔术揭秘：计算器补数、撕牌模拟和约瑟夫问题、一次式、1089，以及关卡里每道题的答案都由逻辑算出来核对
const fs = require('fs');
const path = require('path');
const katex = require('../vendor/katex/katex.min.js');
const { test, assert } = require('./harness');
const A = require('../src/answer.js');
const M = require('../src/games/magic/logic.js');
const { LEVELS, CHAPTERS, MagicGame } = require('../src/games/magic/game.js');

const F = A.Frac.of;
// exam.test.js 会把全局 Date 换成假的，这里只给 timeNumber 需要的几个方法
const when = (mo, d, h, mi) => ({ getMonth: () => mo - 1, getDate: () => d, getHours: () => h, getMinutes: () => mi });
const tex = s => katex.renderToString(s, { throwOnError: true, strict: 'error' });
const texIn = text => { for (const m of String(text).matchAll(/\$([^$]+)\$/g)) tex(m[1]); };
const part = (id, i) => LEVELS.find(l => l.id === id).parts[i];
const answers = (id, i) => part(id, i).blanks.map(b => b.answer);

test('魔术：计算器补数和目标时间', () => {
  assert(M.timeNumber(when(2, 16, 22, 27)) === 2162227, '2 月 16 日 22:27 应是 2162227');
  assert(M.timeNumber(when(9, 4, 8, 5)) === 9040805, '9 月 4 日 8:05 应是 9040805');
  assert(M.missing(2162227, [1106, 88396]).eq(F(2072725)), '春晚现场丙的数应是 2072725');
  // 甲最多四位、乙最多五位时，丙的数总是正的，最多七位
  const low = M.timeNumber(when(1, 1, 0, 0)) - 9999 - 99999;
  assert(low > 0, '丙的数应总是正数');
});

test('魔术：撕牌怎么选都能对上', () => {
  let n = 0;
  for (let name = 1; name <= 8; name++)
    for (let gap1 = 1; gap1 <= 4; gap1++)
      for (let region = 1; region <= 3; region++)
        for (let gap2 = 1; gap2 <= 6 - region; gap2++)
          for (const gender of [1, 2]) {
            assert(M.perform({ name, gap1, region, gap2, gender }).ok, `名字 ${name} 字、插 ${gap1}/${gap2}、${region}、${gender} 时没对上`);
            n++;
          }
  assert(n === 768, '选法数不对');
  // 插到最底下（不是中间）会被拦下：那正是魔术失败的做法
  let threw = false;
  try { M.insertTop(M.tear(), 3, 5); } catch (e) { threw = true; }
  assert(threw, '插到最底下应被拦下');
});

test('魔术：约瑟夫问题和口令字数', () => {
  for (let n = 1; n <= 64; n++) {
    const p = 2 ** Math.floor(Math.log2(n));
    assert(M.survivor(n) === 2 * (n - p) + 1, `${n} 张应剩第 ${2 * (n - p) + 1} 张`);
  }
  const both = [];
  for (let r = 0; r <= 60; r++) if (M.phraseWorks(6, r) && M.phraseWorks(5, r)) both.push(r);
  assert(both.join() === '7,37', '男女都能成功的口令字数应是 7、37');
  // 口令字数也要能用 perform 验证
  for (const r of [5, 6, 8]) {
    const any = [1, 2].some(gender => !M.perform({ name: 3, gap1: 2, region: 1, gap2: 3, gender, phrase: r }).ok);
    assert(any, `口令 ${r} 个字时应有人对不上`);
  }
});

test('魔术：一次式和 1089', () => {
  const lin = M.runLin([{ op: '*', k: 2 }, { op: '+', k: 6 }, { op: '/', k: 2 }, { op: 'x', k: 1 }]);
  assert(lin.a.isZero() && lin.b.eq(F(3)), '想一个数的魔术应得 3');
  assert(M.linTex(M.runLin([{ op: '*', k: 3 }, { op: '-', k: 1 }, { op: '/', k: 2 }])) === '\\frac{3}{2}x-\\frac{1}{2}', '式子排版不对');
  for (let n = 100; n <= 999; n++) if (M.ok1089(n)) assert(M.trick1089(n).sum === 1089, `${n} 没得 1089`);
  assert(M.trick1089(564).diff === 99, '564 的差应是 99');
});

test('魔术：关卡里的答案由逻辑核对', () => {
  for (const l of LEVELS) for (const p of l.parts) {
    if (p.check) assert(M.missing(p.check.target, p.check.nums).eq(F(p.blanks[0].answer)), `${l.id} 补数答案不对`);
  }
  assert(answers('2-2', 1)[0] === 5, '2-2 第 1 张和第 5 张');
  assert(answers('2-2', 4).join() === [M.afterPhrase(6, 7), M.afterPhrase(5, 7)].join(), '2-2 念完 7 个字的位置不对');
  assert(answers('2-2', 6).join() === [M.survivor(6), M.survivor(5)].join(), '2-2 好运留下来的答案不对');
  assert(answers('2-3', 2).join() === [1, 2, 3, 4, 5, 6, 7, 8].map(M.survivor).join(), '2-3 表格不对');
  assert(answers('2-3', 3).join() === [16, 13, 20].map(M.survivor).join(), '2-3 找规律不对');
  assert(answers('2-3', 4)[0] === M.survivor(100), '2-3 100 张不对');
  assert(answers('2-4', 1)[0] === M.afterPhrase(6, 5), '2-4 5 个字不对');
  const upto20 = n => Array.from({ length: 20 }, (_, i) => i + 1).filter(r => M.phraseWorks(n, r));
  assert(answers('2-4', 2)[0].join() === upto20(6).join(), '2-4 男生字数不对');
  assert(answers('2-4', 3)[0].join() === upto20(5).join(), '2-4 女生字数不对');
  const ops = part('3-1', 2).ops;
  answers('3-1', 3).forEach((a, i) => {
    const lin = M.runLin(ops.slice(0, i + 1));
    assert(A.equivalent(A.parseExpr(a), A.parseExpr(`${lin.a}*x+${lin.b}`)), `3-1 第 ${i + 1} 步不对`);
  });
  const k = answers('3-1', 4)[0];
  assert(M.runLin([{ op: '*', k: 2 }, { op: '+', k }, { op: '/', k: 2 }, { op: 'x', k: 1 }]).b.eq(F(7)), '3-1 改成加几得 7 不对');
  for (let m = 1; m <= 12; m++) for (const d of [1, 9, 31]) assert((m * 4 + 9) * 25 + d - 225 === 100 * m + d, '生日魔术不对');
  const diffs = [...new Set(Array.from({ length: 900 }, (_, i) => i + 100).filter(M.ok1089).map(n => M.trick1089(n).diff))].sort((x, y) => x - y);
  assert(answers('3-4', 3)[0].join() === diffs.join(), '3-4 差的列表不对');
});

test('魔术：关卡格式、公式能渲染、答案能被判分器接受', () => {
  const ids = new Set();
  const TYPES = ['text', 'choice', 'fill', 'calc', 'cards', 'luck', 'try', 'birthday', 'build', 't1089'];
  for (const l of LEVELS) {
    assert(!ids.has(l.id), `${l.id} 重复`);
    ids.add(l.id);
    assert(CHAPTERS.some(c => l.id.startsWith(c.no + '-')), `${l.id} 不属于任何一章`);
    for (const p of l.parts) {
      assert(TYPES.includes(p.t), `${l.id} 有未知部件 ${p.t}`);
      [p.md, p.stem, p.explain, ...(p.options || [])].filter(Boolean).forEach(texIn);
      if (p.t === 'choice') assert(p.answer >= 0 && p.answer < p.options.length, `${l.id} 选择题答案越界`);
      if (p.t === 'fill') {
        for (const b of p.blanks) {
          const input = Array.isArray(b.answer) ? b.answer.join(',') : String(b.answer);
          assert(A.checkBlank(b, input).ok, `${l.id} 的答案 ${input} 判分器不认`);
          texIn(A.answerText(b));
        }
      }
    }
  }
});

test('魔术：挂在 2.3，并在 index.html 加载', () => {
  assert(MagicGame.section === 'math/sh2024/g6s1/2.3', '应挂在 2.3');
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  for (const f of ['logic.js', 'game.js']) assert(html.includes(`src/games/magic/${f}`), `index.html 没有加载 ${f}`);
  const catalog = fs.readFileSync(path.join(__dirname, '..', 'content', 'catalog.js'), 'utf8');
  assert(/no: '2\.3'[^}]*games: \['magic'\]/.test(catalog), 'catalog.js 的 2.3 应挂 magic');
});
