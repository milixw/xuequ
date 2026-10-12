'use strict';
const fs = require('fs');
const path = require('path');
const {test, assert} = require('./harness');
const data = require('../content/past-papers/nantong-chinese.js');
const subject = require('../src/subject-papers.js');
const root = path.join(__dirname, '..');
test('南通语文七年资料独立登记、ID 唯一且全部人工核对', () => {
  assert(JSON.stringify(data.papers.map(p => p.year)) === '[2013,2014,2015,2018,2019,2020,2023]');
  const ids = new Set();
  for (const paper of data.papers) {
    assert(paper.id === 'nt-chinese-' + paper.year);
    assert(paper.review.status === 'pending');
    assert(/^[a-f0-9]{64}$/.test(paper.source.sha256));
    assert(paper.questions.length > 0);
    for (const q of paper.questions) {
      assert(!ids.has(q.id)); ids.add(q.id);
      assert(q.type === 'written' && subject.check(q, '任意文字') === null);
      assert(q.stem && !/【答案】|【解析】|【参考范文】|\{\{image:/.test(q.stem));
      for (const role of ['stemImages', 'answerImages']) for (const im of q[role]) {
        assert(subject.imagePath(im.src));
        assert(fs.existsSync(path.join(root, im.src)));
        assert(im.width > 0 && im.height > 0);
      }
    }
  }
  assert(ids.size === 36);
  assert(!subject.imagePath('content/past-papers/images/../private.png'));
});
test('南通图片题与答案隔离，缺答案年份明确说明', () => {
  const q = subject.find(data, 'chinese', 2020).questions[0];
  const stem = q.stemImages.find(im => im.page === 7);
  const answer = q.answerImages.find(im => im.page === 7);
  assert(stem.bbox[3] === 1340 && answer.bbox[1] === 1340);
  assert(q.stemImages.length === 7 && q.answerImages.length === 4);
  const latest = subject.find(data, 'chinese', 2023);
  assert(latest.questions[0].stemImages.length === 6);
  assert(latest.questions[0].answerImages.length === 0);
  assert(latest.questions[0].answerSource.kind === 'not-provided');
  assert(latest.skipped.join('').includes('未附参考答案'));
  assert(subject.find(data, 'chinese', 2013).questions.every(q => q.answerImages.length === 3));
});
