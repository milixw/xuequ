'use strict';

const fs = require('fs');
const path = require('path');
const { test, assert } = require('./harness');
const Content = require('../src/content.js');
globalThis.Content = Content;
require('../content/catalog.js');

const root = path.join(__dirname, '..');
const expected = [
  ['Water（水）', '时间状语从句'],
  ['Digital life（数字生活）', '时间状语从句'],
  ['Curious minds（好奇的心）', '动词不定式'],
  ['Then and now（过去与现在）', '让步状语从句'],
  ['Teamwork（团队合作）', '原因状语从句'],
  ['Life in the future（未来生活）', '条件状语从句'],
];

test('英语八上六个 Unit 按教材顺序接入，每节有原创知识卡和三档练习', () => {
  const volume = Content.volume('english/sh2022/g8s1');
  assert(volume, '找不到英语八年级上册');
  assert(volume.volume.chapters.length === expected.length, '八上应有六个 Unit');
  volume.volume.chapters.forEach((chapter, i) => {
    assert(chapter.title === expected[i][0], `Unit ${i + 1} 主题不符`);
    assert(chapter.sections.length === 1, `Unit ${i + 1} 当前应有一节综合入门`);
    const section = chapter.sections[0];
    assert(section.ready, `Unit ${i + 1} 未上线`);
    assert(section.title.includes(expected[i][1]), `Unit ${i + 1} 语法范围不符`);
    const file = path.join(root, 'content', 'english', 'sh2022', 'g8s1', section.no + '.js');
    assert(fs.existsSync(file), `缺少 ${file}`);
    require(file);
    const lesson = Content.sections[`english/sh2022/g8s1/${section.no}`];
    assert(lesson && lesson.review.status === 'pending', `Unit ${i + 1} 应待审核`);
    assert(lesson.reading && lesson.reading.paragraphs.length >= 2, `Unit ${i + 1} 缺少原创阅读`);
    assert(lesson.intro.length >= 3 && lesson.intro.length <= 6, `Unit ${i + 1} 知识卡数量不符`);
    for (const level of ['basic', 'extended', 'challenge']) {
      assert(lesson.questions.filter(q => q.level === level).length >= 2, `Unit ${i + 1} ${level} 练习不足`);
    }
  });
});

test('英语八上使用现有懒加载路径与首页学期入口，不引入网络取文件', () => {
  assert(Content.path('english/sh2022/g8s1/1.1') === 'content/english/sh2022/g8s1/1.1.js');
  assert(Content.semesters().some(s => s.id === 'g8s1'));
  const app = fs.readFileSync(path.join(root, 'src', 'app.js'), 'utf8');
  assert(app.includes("v.subject.id === 'english' ? `Unit ${chapter.no}`"));
  assert(app.indexOf('renderReading(section.reading)') < app.indexOf("'<h3 class=\"group\">知识点</h3>'"), '单元阅读应排在知识点之前');
});
