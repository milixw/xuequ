'use strict';

// 六上 Unit 2 语法练习：现在进行时、人称代词（课本 Grammar file 第 123～125 页的范围），题目均为原创。
// 辨认（basic）用选择题，运用（extended）用填写题（kind: 'en'），产出（challenge）用 open 自评题。
const choiceQ622 = (id, stem, options, answer, explain) =>
  ({ id, level: 'basic', type: 'choice', stem, options, answer, explain });
const fillQ622 = (id, stem, blanks, explain) =>
  ({ id, level: 'extended', type: 'fill', stem, blanks: blanks.map(b => ({ kind: 'en', ...b })), explain });
const openQ622 = (id, stem, reference, checks, explain) =>
  ({ id, level: 'challenge', type: 'open', stem, reference, checks, explain });

Content.section({
  id: 'english/sh2022/g6s1/2.2',
  title: 'Family ties — 语法练习 ----- 现在进行时与人称代词',
  review: { status: 'pending' },
  levelNames: { basic: '辨认', extended: '运用', challenge: '产出' },
  knowledgeRefs: ['tense', 'pronouns'],
  intro: [
    { title: '现在进行时的三种句子', body: '肯定句：主语 + am / is / are + 动词 -ing；否定句在 be 后面加 not；一般疑问句把 Am / Is / Are 提到句首，简略回答也用 be：Yes, she is. / No, she isn\'t.', example: 'She is drawing. She isn\'t drawing. Is she drawing? Yes, she is.' },
    { title: '-ing 的三条拼写规则', body: '多数动词直接加 -ing；以不发音的 e 结尾，去 e 加 -ing；以“一个元音字母 + 一个辅音字母”结尾的短词，双写辅音字母再加 -ing。', example: 'look → looking，bake → baking，cut → cutting', pitfall: 'open、visit 虽然以辅音结尾，但不双写：opening、visiting。' },
    { title: '主格和宾格', body: '做主语用主格，放在动词、介词后面用宾格：I → me，he → him，she → her，we → us，they → them，you 和 it 不变。', example: 'They love him, and he loves them.', pitfall: '和别人一起说时，自己放在后面：Tom and I ...，... with Tom and me。' },
  ],
  questions: [
    choiceQ622('2.2-b01', 'My father ___ the car now.', ['wash', 'washes', 'is washing', 'are washing'], 2, ['now 提示此刻正在做，用现在进行时。', 'my father 是单数，用 is washing。']),
    choiceQ622('2.2-b02', 'Which is the correct -ing form of “take”?', ['takeing', 'taking', 'takking', 'takes'], 1, ['take 以不发音的 e 结尾。', '去 e 加 -ing：taking。']),
    choiceQ622('2.2-b03', 'Which sentence is correct?', ['They is reading.', 'They are read.', 'They are reading.', 'They reading.'], 2, ['they 是复数，be 动词用 are。', '现在进行时是 be + 动词 -ing，两部分缺一不可。']),
    choiceQ622('2.2-b04', 'Please give the book to ___.', ['I', 'me', 'my', 'mine'], 1, ['空格在介词 to 后面，做宾语。', 'I 的宾格是 me。']),
    choiceQ622('2.2-b05', 'Which sentence is about an action happening at the moment of speaking?', ['Look! It is raining.', 'It often rains in June.', 'It rained last night.', 'It rains a lot here.'], 0, ['Look! 和 is raining 说明说话时正在下雨。', 'often、a lot 是经常发生，last night 是过去。']),
    fillQ622('2.2-e01', 'Write the -ing form of “shop”: My aunt is ___ for a new dress.', [{ answer: 'shopping' }], ['shop 以“一个元音字母 o + 一个辅音字母 p”结尾。', '双写 p 再加 -ing：shopping。']),
    fillQ622('2.2-e02', 'Write the -ing form of “dance”: The girls are ___ in the hall.', [{ answer: 'dancing' }], ['dance 以不发音的 e 结尾。', '去 e 加 -ing：dancing。']),
    fillQ622('2.2-e03', "Make it negative (use the short form): Kate is watching TV. → Kate ___ watching TV.", [{ answer: "isn't" }], ['现在进行时的否定在 be 后面加 not。', 'is not 的缩写是 isn\'t。']),
    fillQ622('2.2-e04', 'Make a Yes/No question: Your parents are cooking dinner. → ___ your parents ___ dinner?', [{ label: '1', answer: 'Are' }, { label: '2', answer: 'cooking' }], ['现在进行时的一般疑问句把 be 提到句首：Are。', '后面的动词仍用 -ing 形式：cooking。']),
    fillQ622('2.2-e05', 'Complete the short answer: — Is your brother doing his homework? — Yes, ___ ___.', [{ label: '1', answer: 'he' }, { label: '2', answer: 'is' }], ['your brother 用代词 he。', '用 Is 提问，肯定回答用 Yes, he is.，不重复 doing。']),
    fillQ622('2.2-e06', 'Write the correct form of “we”: My grandparents live with ___.', [{ answer: 'us' }], ['空格在介词 with 后面，做宾语。', 'we 的宾格是 us。']),
    fillQ622('2.2-e07', 'One word is wrong: “Look! The children is flying kites.” Write the wrong word and the correct word.', [{ label: '错的词', answer: 'is' }, { label: '改为', answer: 'are' }], ['children 是 child 的复数，表示多个孩子。', '复数主语的 be 动词用 are：The children are flying kites.']),
    openQ622('2.2-c01', 'Look around you now. Write one sentence about what someone near you is doing. Use the present continuous.',
      ['My mum is cooking in the kitchen.', 'My little brother is watching cartoons on the sofa.'],
      ['用 am / is / are + 动词 -ing', '主语和 be 动词要一致：一个人用 is，几个人用 are', '-ing 的拼写要对，句首大写、句末有句号'],
      ['先想清楚是谁、正在做什么，再选 is 或 are。', '写完检查 -ing 的拼写，比如去 e、双写辅音。']),
    openQ622('2.2-c02', 'Write about a family member: what he or she looks like and what he or she is doing.',
      ['My grandpa has white hair. He is reading a newspaper.', 'My sister has a round face, and she is playing the piano.'],
      ['外貌用 has + 特征', '动作用 is + 动词 -ing', '用 he / she 代替这个人时，注意男女'],
      ['先写外貌（has），再写动作（is + -ing）。', '同一个人第二次出现时，用 he 或 she 代替，避免重复。']),
    openQ622('2.2-c03', 'Your friend is calling you. Write a question to ask what he or she is doing now, and then write your own answer.',
      ["What are you doing now? I'm doing my homework.", 'What are you doing? I am helping my dad in the garden.'],
      ['问句用 What are you doing ...?', '回答用 I am / I\'m + 动词 -ing', '问句末尾用问号，答句末尾用句号'],
      ['问对方，主语是 you，be 动词用 are。', '回答自己的事，主语是 I，be 动词用 am。']),
  ],
});
