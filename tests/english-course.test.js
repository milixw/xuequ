'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
const Content = require('../src/content.js');
const bankQuestions = require('../content/english/question-bank.js');
globalThis.Content = Content;
require('../content/catalog.js');

const root = path.join(__dirname, '..');
const expected = [
  ['Water（水）', 'Water — 水资源', '时间状语从句（一）'],
  ['Digital life（数字生活）', 'Digital life — 数字生活', '时间状语从句（二）'],
  ['Curious minds（好奇的心）', 'Curious minds — 探究表达', '动词不定式'],
  ['Then and now（过去与现在）', 'Then and now — 今昔对比', '让步状语从句'],
  ['Teamwork（团队合作）', 'Teamwork — 合作表达', '原因状语从句'],
  ['Life in the future（未来生活）', 'Life in the future — 未来设想', '条件状语从句'],
];

test('英语八上六个 Unit 按教材顺序接入，每节有原创知识卡和三档练习', () => {
  const volume = Content.volume('english/sh2022/g8s1');
  const allExampleIds = [];
  assert(volume, '找不到英语八年级上册');
  assert(volume.volume.chapters.length === expected.length, '八上应有六个 Unit');
  volume.volume.chapters.forEach((chapter, i) => {
    assert(chapter.title === expected[i][0], `Unit ${i + 1} 主题不符`);
    assert(chapter.sections.length === 1, `Unit ${i + 1} 当前应有一节综合入门`);
    const section = chapter.sections[0];
    assert(section.ready, `Unit ${i + 1} 未上线`);
    assert(section.title.startsWith(expected[i][1] + ' ----- '), `Unit ${i + 1} 目录应先显示英文原题，再显示中文主题`);
    assert(section.title.endsWith(expected[i][2]), `Unit ${i + 1} 语法范围不符`);
    assert(section.title.split(' ----- ').length === 2, `Unit ${i + 1} 标题应以 ----- 分隔主题和知识点`);
    const file = path.join(root, 'content', 'english', 'sh2022', 'g8s1', section.no + '.js');
    assert(fs.existsSync(file), `缺少 ${file}`);
    require(file);
    const lesson = Content.sections[`english/sh2022/g8s1/${section.no}`];
    assert(lesson && lesson.review.status === 'pending', `Unit ${i + 1} 应待审核`);
    assert(lesson.reading && lesson.reading.paragraphs.length >= 2, `Unit ${i + 1} 缺少原创阅读`);
    assert(lesson.reading.topic === expected[i][2], `Unit ${i + 1} 阅读标题后的知识点不符`);
    assert(lesson.intro.length >= 3 && lesson.intro.length <= 6, `Unit ${i + 1} 知识卡数量不符`);
    assert(lesson.questions.length === 16, `Unit ${i + 1} 应有原 6 题加新增 10 题`);
    assert(lesson.questions.filter(q => q.level === 'basic').length === 5, `Unit ${i + 1} 基础题应有 5 道`);
    assert(lesson.questions.filter(q => q.level === 'extended').length === 6, `Unit ${i + 1} 扩展题应有 6 道`);
    assert(lesson.questions.filter(q => q.level === 'challenge').length === 5, `Unit ${i + 1} 挑战题应有 5 道`);
    assert(Array.isArray(lesson.bankExamples) && lesson.bankExamples.length === 2, `Unit ${i + 1} 应引用 2 道题库例题`);
    lesson.bankExamples.forEach(example => {
      const original = bankQuestions.find(q => q.id === example.id);
      assert(original && original.type === 'choice' && /^[A-D]$/.test(original.answer), `题库例题 ${example.id} 缺少明确答案`);
      assert(original.review === 'pending' && original.sources.length, `题库例题 ${example.id} 缺少待核对标记或来源`);
      assert(example.point && example.explain.length >= 2, `题库例题 ${example.id} 缺少知识点讲解`);
      allExampleIds.push(example.id);
    });
  });
  assert(new Set(allExampleIds).size === 12, '不同 Unit 的题库例题不应重复');
});

test('英语八上使用现有懒加载路径与首页学期入口，不引入网络取文件', () => {
  assert(Content.path('english/sh2022/g8s1/1.1') === 'content/english/sh2022/g8s1/1.1.js');
  assert(Content.semesters().some(s => s.id === 'g8s1'));
  const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
  assert(app.includes("v.subject.id === 'english' ? `Unit ${chapter.no}`"));
  assert(app.indexOf('renderReading(section.reading)') < app.indexOf("'<h3 class=\"group\">知识点</h3>'"), '单元阅读应排在知识点之前');
  assert(app.includes('reading.translations[paragraphIndex][sentenceIndex]'), '单元阅读缺少逐句译文');
  assert(app.includes('<h2>${escapeHtml(reading.title)}</h2>'), '阅读标题应只显示文章名');
  assert(!app.includes('----- ${escapeHtml(reading.topic)}'), '阅读标题不应追加知识点');
  assert(app.includes('readingEl.classList.toggle(\'show-translations\', event.target.checked)'), '翻译开关未接入');
  assert(app.includes('await EnglishBank.load()'), '知识点例题应引用现有英语题库');
  assert(app.includes('escapeHtml(original.text)'), '题库例题应原样显示并安全转义');
  const css = fs.readFileSync(path.join(root, 'src', 'app.css'), 'utf8');
  assert(app.includes("}).join(' ')}</div>`"), '紧凑模式下句子之间应保留空格');
  assert(css.includes('.reading-line, .unit-reading .reading-en { display: inline; }'), '关闭翻译时应连续排版英文');
  assert(css.includes('.unit-reading.show-translations .reading-en { display: block; }'), '打开翻译时应逐句换行');
  assert(css.includes('.unit-reading.show-translations .reading-translation { display: block; }'), '翻译开关样式缺失');
});
