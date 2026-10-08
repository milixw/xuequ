'use strict';

// 六上 Unit 3 Food：主题、语法（可数名词与不可数名词）和功能范围据课本目录与 Grammar file，短文、知识卡和练习均为原创。
const foodQ631 = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g6s1/3.1',
  title: 'Food — 食物 ----- 可数名词与不可数名词',
  review: { status: 'pending' },
  reading: {
    title: 'The Class Picnic',
    topic: '可数名词与不可数名词',
    paragraphs: [
      'Next Friday, our class is having a picnic in the park. Today, Mia and I are making a shopping [[list]]. We want healthy food, so we check the food groups first.',
      'For sandwiches, we need a lot of bread, some [[cheese]] and a few tomatoes. We also want ten [[pears]] and a big [[watermelon]]. How much juice do we need? Mia thinks we need six bottles, but I think water is better for us. We only need a little [[salt]] for the eggs.',
      "At the supermarket, a kind shop assistant helps us find everything. \"Thank you for your help,\" Mia says. \"My [[pleasure]],\" she answers. Now the [[fridge]] in our classroom is full, and we are ready for a [[tasty]] and healthy picnic!",
    ],
    translations: [
      [
        '下周五，我们班要去公园野餐。',
        '今天，米娅和我正在列购物清单。',
        '我们想要健康的食物，所以先查看了食物分类。',
      ],
      [
        '做三明治，我们需要很多面包、一些奶酪和几个西红柿。',
        '我们还想要十个梨和一个大西瓜。',
        '我们需要多少果汁呢？',
        '米娅认为需要六瓶，但我觉得喝水对我们更好。',
        '煮鸡蛋只需要一点点盐。',
      ],
      [
        '在超市里，一位热心的售货员帮我们找到了所有东西。',
        '米娅说：“谢谢你的帮助。”',
        '她回答：“不客气。”',
        '现在我们教室里的冰箱装满了，我们准备好享受一次美味又健康的野餐了！',
      ],
    ],
    vocabulary: [
      { term: 'list', meaning: '清单' },
      { term: 'cheese', meaning: '奶酪' },
      { term: 'pears', meaning: '梨（pear 的复数）' },
      { term: 'watermelon', meaning: '西瓜' },
      { term: 'salt', meaning: '盐' },
      { term: 'pleasure', meaning: '高兴；My pleasure. 不客气' },
      { term: 'fridge', meaning: '冰箱' },
      { term: 'tasty', meaning: '美味的' },
    ],
  },
  intro: [
    { title: '可数名词和不可数名词', body: '能一个一个数的东西（apple、egg）是可数名词，有单数和复数；不能数或很难数的东西（water、rice、milk）是不可数名词，没有复数，前面也不用 a / an。', example: 'an egg，three eggs；some milk，some rice', pitfall: '不说 two milks 或 a bread。' },
    { title: '名词复数的拼写', body: '多数名词加 -s；以 s、x、sh、ch 结尾加 -es；辅音字母 + y 结尾，变 y 为 i 加 -es；部分以 f / fe 结尾，变成 -ves；以 o 结尾的有的加 -s，有的加 -es。', example: 'box → boxes，cherry → cherries，leaf → leaves，potato → potatoes', pitfall: '少数名词的复数要单独记：man → men，mouse → mice。' },
    { title: '表示数量的词', body: 'many、a few 只修饰可数名词复数；much、a little 只修饰不可数名词；a lot of、lots of、some 两种都能用。不可数名词想数一数，要借助 a bag of、a bottle of、a cup of 这样的量词。', example: 'a few biscuits，a little honey，a bottle of water', pitfall: 'a few、a little 表示“有一些”；去掉 a 的 few、little 表示“几乎没有”。' },
    { title: 'How many 还是 How much？', body: '问可数名词的数量用 How many + 复数名词；问不可数名词的多少用 How much + 名词。先判断名词能不能数，再选疑问词。', example: 'How many lemons do you want? How much flour do we need?' },
    { title: '礼貌地道谢和回应', body: '别人帮了你，可以说 Thank you for ... 或 It\'s so kind of you.；别人向你道谢，可以回答 My pleasure. 或 You\'re welcome.', example: '— Thank you for the flowers. — You\'re welcome.' },
    { title: '用顺序词说步骤', body: '介绍做菜步骤时，用 First、Then、Next、After that、Finally 把步骤排好。菜谱里每一步多用动词原形开头的短句。', example: 'First, wash the rice. Then, put it in the cooker.', pitfall: '顺序词后面加逗号，Finally 只用在最后一步。' },
  ],
  questions: [
    foodQ631('3.1-b01', 'basic', 'Which of these is an uncountable noun?', ['apple', 'egg', 'milk', 'carrot'], 2, ['牛奶不能一个一个地数，是不可数名词。', 'apple、egg、carrot 都可以说 one、two、three，是可数名词。']),
    foodQ631('3.1-b02', 'basic', 'What is the plural of “knife”?', ['knifes', 'knives', 'knifs', 'knivs'], 1, ['knife 以 fe 结尾。', '部分以 f / fe 结尾的名词，变成 -ves：knives。']),
    foodQ631('3.1-b03', 'basic', 'I would like ___ orange, please.', ['a', 'an', 'some', 'many'], 1, ['orange 是可数名词单数，前面要用 a 或 an。', 'orange 以元音音素开头，用 an。']),
    foodQ631('3.1-b04', 'basic', 'There is ___ water in the glass.', ['many', 'a few', 'a little', 'few'], 2, ['water 是不可数名词。', '修饰不可数名词用 a little；many、a few、few 修饰可数名词复数。']),
    foodQ631('3.1-b05', 'basic', '— Thank you for your help. — ___', ['My pleasure.', 'Yes, I do.', 'No, thanks.', 'Here you are.'], 0, ['别人道谢时，要礼貌回应。', 'My pleasure. 表示“不客气，很乐意”；其他选项答非所问。']),
    foodQ631('3.1-e01', 'extended', 'How ___ eggs do we need for the cake?', ['much', 'many', 'little', 'lot'], 1, ['eggs 是可数名词复数。', '问可数名词的数量用 How many。']),
    foodQ631('3.1-e02', 'extended', 'Which sentence is correct?', ['I drink two milks every day.', 'I drink two bottles of milk every day.', 'I drink two bottle of milks every day.', 'I drink a milk every day.'], 1, ['milk 不可数，不能加 -s，也不能直接用 a 或数字。', '用量词表示数量，量词变复数：two bottles of milk。']),
    foodQ631('3.1-e03', 'extended', "There are only ___ apples left. Let's buy some more.", ['a few', 'a little', 'much', 'plenty'], 0, ['apples 是可数名词复数。', 'only a few 表示“只有几个”，所以要再买一些；a little、much 修饰不可数名词。']),
    foodQ631('3.1-e04', 'extended', 'In “The Class Picnic”, what does the writer think about drinks?', ['Juice is better than water.', 'Water is better for them.', 'They need six bottles of juice.', 'They do not need any drinks.'], 1, ['定位第二段：Mia thinks we need six bottles, but I think water is better for us.', '“需要六瓶果汁”是米娅的想法，but 后面才是作者的想法。']),
    foodQ631('3.1-e05', 'extended', 'Put the steps in order: (a) Then, fry them in a little oil. (b) First, wash the potatoes and cut them up. (c) Finally, add some salt.', ['a, b, c', 'b, a, c', 'c, b, a', 'b, c, a'], 1, ['看顺序词：First 是第一步，Then 是接下来，Finally 是最后一步。', '所以顺序是 b、a、c。']),
    foodQ631('3.1-e06', 'extended', 'Which food belongs to the group “milk and bean products”?', ['cabbage', 'yogurt', 'rice', 'beef'], 1, ['酸奶是用牛奶做的，属于奶类和豆类制品。', 'cabbage 是蔬菜，rice 是谷物，beef 是肉类。']),
    foodQ631('3.1-c01', 'challenge', 'Find the mistake: “We need some breads and a few bananas for breakfast.”', ['some → any', 'breads → bread', 'a few → a little', 'bananas → banana'], 1, ['bread 是不可数名词，没有复数形式。', 'bananas 可数，用 a few 没问题；肯定句里用 some 也正确。']),
    foodQ631('3.1-c02', 'challenge', 'Which question is correct?', ['How many rice do you want?', 'How much rices do you want?', 'How much rice do you want?', 'How many rices do you want?'], 2, ['rice 是不可数名词，没有复数。', '问不可数名词的多少用 How much，名词保持原形。']),
    foodQ631('3.1-c03', 'challenge', 'Which word best describes the shop assistant in “The Class Picnic”?', ['helpful', 'angry', 'busy', 'shy'], 0, ['第三段说 a kind shop assistant helps us find everything。', '她热心地帮忙找东西，所以是 helpful（乐于助人的）；文中没有提到另外三种情况。']),
    foodQ631('3.1-c04', 'challenge', 'There ___ some cheese and two ___ in the fridge.', ['is; cucumbers', 'are; cucumber', 'is; cucumber', 'are; cucumbers'], 0, ['There be 句型的 be 动词和紧挨着它的名词一致：some cheese 不可数，用 is。', 'two 后面的可数名词要用复数：cucumbers。']),
    foodQ631('3.1-c05', 'challenge', 'Lisa is writing a recipe. Which sentence is best for the last step?', ['First, wash the vegetables.', 'Then, cut the carrots.', 'Finally, put the salad on a plate and enjoy it!', 'Next, add some oil.'], 2, ['最后一步要用表示“最后”的顺序词。', 'Finally 表示最后一步，而且“装盘享用”也正是做菜的最后一步。']),
  ],
});
