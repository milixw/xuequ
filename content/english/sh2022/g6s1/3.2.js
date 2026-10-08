'use strict';

// 六上 Unit 3 语法练习：可数名词与不可数名词、复数拼写、数量表达（课本 Grammar file 第 125～127 页的范围），题目均为原创。
// 辨认（basic）用选择题，运用（extended）用填写题（kind: 'en'），产出（challenge）用 open 自评题。
const choiceQ632 = (id, stem, options, answer, explain) =>
  ({ id, level: 'basic', type: 'choice', stem, options, answer, explain });
const fillQ632 = (id, stem, blanks, explain) =>
  ({ id, level: 'extended', type: 'fill', stem, blanks: blanks.map(b => ({ kind: 'en', ...b })), explain });
const openQ632 = (id, stem, reference, checks, explain) =>
  ({ id, level: 'challenge', type: 'open', stem, reference, checks, explain });

Content.section({
  id: 'english/sh2022/g6s1/3.2',
  title: 'Food — 语法练习 ----- 可数名词与不可数名词',
  review: { status: 'pending' },
  levelNames: { basic: '辨认', extended: '运用', challenge: '产出' },
  knowledgeRefs: ['quantity'],
  intro: [
    { title: '可数还是不可数？', body: '可数名词有单数和复数，单数前用 a / an；不可数名词没有复数，前面不用 a / an，可以用 some 或量词。', example: 'a banana，two bananas；some bread，some water' },
    { title: '复数拼写速查', body: '多数加 -s；s、x、sh、ch 结尾加 -es；辅音字母 + y 变 -ies；部分 f / fe 变 -ves；还有少数要单独记。', example: 'bus → buses，city → cities，wife → wives，child → children', pitfall: '元音字母 + y 直接加 -s：day → days，toy → toys。' },
    { title: '数量词和提问', body: '可数名词复数配 many、a few，提问用 How many；不可数名词配 much、a little，提问用 How much；some、a lot of 两种都能用。', example: 'many cups / much tea；a few cups / a little tea', pitfall: '一般在肯定句用 some，在否定句和疑问句用 any。' },
  ],
  questions: [
    choiceQ632('3.2-b01', 'Which word is countable?', ['bread', 'juice', 'sandwich', 'rice'], 2, ['sandwich 可以说 one sandwich、two sandwiches，是可数名词。', 'bread、juice、rice 都不可数。']),
    choiceQ632('3.2-b02', 'What is the plural of “box”?', ['boxs', 'boxes', 'boxies', 'boxen'], 1, ['box 以 x 结尾。', '以 s、x、sh、ch 结尾的名词加 -es：boxes。']),
    choiceQ632('3.2-b03', "We don't have ___ milk at home.", ['many', 'much', 'a few', 'few'], 1, ['milk 是不可数名词。', '修饰不可数名词、而且在否定句里，用 much。']),
    choiceQ632('3.2-b04', 'Which is correct?', ['an banana', 'a egg', 'an egg', 'a apple'], 2, ['以元音音素开头的词前用 an，以辅音音素开头的词前用 a。', 'egg 以元音音素开头：an egg；banana 用 a，apple 用 an。']),
    choiceQ632('3.2-b05', 'Which word can follow “a bottle of”?', ['eggs', 'water', 'apples', 'sandwiches'], 1, ['瓶子装的是液体。', 'a bottle of water（一瓶水）；鸡蛋、苹果、三明治不用瓶子装。']),
    fillQ632('3.2-e01', 'Write the plural of “peach”: There are six ___ in the box.', [{ answer: 'peaches' }], ['peach 以 ch 结尾。', '加 -es：peaches。']),
    fillQ632('3.2-e02', 'Write the plural of “family”: Three ___ live in this building.', [{ answer: 'families' }], ['family 以“辅音字母 l + y”结尾。', '变 y 为 i 再加 -es：families。']),
    fillQ632('3.2-e03', 'Write the plural of “foot”: My ___ are cold after the long walk.', [{ answer: 'feet' }], ['foot 的复数不规则，要单独记。', 'foot → feet，中间的 oo 变成 ee。']),
    fillQ632('3.2-e04', 'Fill in “many” or “much”: How ___ water do you drink every day?', [{ answer: 'much' }], ['water 是不可数名词。', '问不可数名词的多少用 How much。']),
    fillQ632('3.2-e05', 'Fill in “a few” or “a little”: There is ___ honey in the jar.', [{ answer: 'a little' }], ['honey（蜂蜜）是不可数名词，句子也用了 is。', '修饰不可数名词用 a little。']),
    fillQ632('3.2-e06', 'Fill in “some” or “any”: Are there ___ eggs in the fridge?', [{ answer: 'any' }], ['这是一个疑问句。', '疑问句和否定句里一般用 any，肯定句里用 some。']),
    fillQ632('3.2-e07', 'One word is wrong: “I want three bowl of noodles.” Write the wrong word and the correct word.', [{ label: '错的词', answer: 'bowl' }, { label: '改为', answer: 'bowls' }], ['three 后面的量词要用复数。', 'three bowls of noodles（三碗面条）。']),
    openQ632('3.2-c01', 'Write one sentence about what you usually have for breakfast. Use at least one quantity word, such as a few, a little, some or a lot of.',
      ['I usually have some bread and a little milk for breakfast.', 'I usually eat two eggs and a few tomatoes for breakfast.'],
      ['可数名词的复数要加 -s / -es', '不可数名词前用 a little、some、much，名词不加 -s', '句首大写，句末有句号'],
      ['先想好早餐吃什么，再判断每样食物可数还是不可数。', '可数的配 a few / 数字，不可数的配 a little / some。']),
    openQ632('3.2-c02', 'Write a question to ask your friend how many or how much of a food he or she wants. Then write an answer.',
      ['How many apples do you want? I want three apples.', 'How much juice would you like? Just a little, please.'],
      ['可数名词用 How many + 复数名词', '不可数名词用 How much + 名词', '问句末尾用问号'],
      ['先选一种食物，判断它可数还是不可数。', '回答里的数量词要和名词搭配。']),
    openQ632('3.2-c03', 'Write two or three steps to make a simple dish. Use signal words like First, Then and Finally.',
      ['First, wash the tomatoes. Then, cut them into pieces. Finally, add some sugar.', 'First, boil some water. Then, put the noodles in. Finally, add a little salt.'],
      ['用 First、Then、Finally 表示顺序，后面加逗号', '每一步用动词原形开头', '数量词和名词单复数要对'],
      ['先想好做什么菜，按先后列出步骤。', '每句以顺序词开头，接动词原形，比如 wash、cut、add。']),
  ],
});
