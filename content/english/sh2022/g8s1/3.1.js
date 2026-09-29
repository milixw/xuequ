'use strict';

// Unit 3 Curious minds：主题与语法范围据教材，内容原创。
const curiousQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/3.1',
  title: 'Curious minds — 探究表达 ----- 动词不定式',
  review: { status: 'pending' },
  reading: {
    title: 'Why Did the Shadows Move?',
    topic: '动词不定式',
    paragraphs: [
      'Mei noticed a strange pattern on the playground. The shadow of a tree was short at noon but much longer before school ended. She did not want [[to guess]] the answer from one photo. Instead, she asked her friends [[to help]] her make a simple [[experiment]].',
      'The group marked the end of the shadow every hour. They used the same tree and the same spot [[to compare]] their results fairly. One student wrote down the time, and another measured the distance. A cloudy afternoon made one mark difficult to see, so they returned the next day [[to check]] it.',
      'Their notes showed a clear change, but Mei still had a question: would a shorter tree show the same pattern? The group [[decided to]] test another tree. They learned that [[curiosity]] is more than asking “why”. It also means finding a careful way to look for an answer.',
    ],
    translations: [
      [
        '梅在操场上注意到一个奇怪的规律。',
        '中午，树影很短；但放学前，它长得多。',
        '她不想只凭一张照片猜答案。',
        '于是，她请朋友们帮她做一个简单的实验。',
      ],
      [
        '小组每小时标记一次树影的末端。',
        '他们始终观察同一棵树、同一个位置，以便公平地比较结果。',
        '一名同学记录时间，另一名同学测量距离。',
        '一个多云的下午使某个标记难以看清，所以他们第二天又回来核查。',
      ],
      [
        '记录显示了明显的变化，但梅还有一个问题：矮一些的树也会出现同样的规律吗？',
        '小组决定再测试另一棵树。',
        '他们认识到，好奇心不只是问“为什么”。',
        '它还意味着用仔细的方法寻找答案。',
      ],
    ],
    vocabulary: [
      { term: 'to guess', meaning: '猜测（动词不定式）' },
      { term: 'to help', meaning: '帮助（动词不定式）' },
      { term: 'experiment', meaning: '实验' },
      { term: 'to compare', meaning: '为了比较（表示目的）' },
      { term: 'to check', meaning: '为了核查（表示目的）' },
      { term: 'decided to', meaning: '决定做……' },
      { term: 'curiosity', meaning: '好奇心' },
    ],
  },
  intro: [
    { title: '把“好奇”变成可探究的问题', body: '谈好奇心时，可按“观察到什么—提出什么问题—怎样验证—发现了什么”来组织内容。不要把自己的猜测直接写成事实。', example: 'I noticed that one plant grew faster, so I decided to compare their light.', pitfall: '观察、猜想和结论要分开写；一次观察不一定能证明原因。' },
    { title: '不定式表示目的', body: 'to 加动词原形可说明“为了做什么”。目的要与主句行动相配，读句子时问一问：这个动作是为了什么？', example: 'Mina visited the library to find more information about birds.', pitfall: 'to 后接动词原形，不写 to found、to finding。' },
    { title: '一些动词后接不定式', body: 'want、hope、plan、decide 等动词后，常接 to do 来说愿望或决定。要把“谁想做”和“做什么”说完整。', example: 'We plan to test the idea again next week.', pitfall: '不要漏掉 to：plan test 在这里不成立。' },
    { title: '信息性短文的证据链', body: '写好奇心故事时，先交代问题，再写尝试与结果，最后说收获。用具体过程支撑结论，让读者明白“为什么这样认为”。', example: 'The first model failed, so Jia changed one part and tried again.', pitfall: '“他很聪明”是评价；“改了哪个部分、结果如何”才是可检查的信息。' },
    { title: '不带 to 的不定式', body: '不定式也有不带 to 的形式。let、make 后的宾语再接动作时，常用动词原形；help 后两种形式通常都可以。', example: 'The puzzle made me think. My friend helped me find another clue.', pitfall: '不要把“所有动词后都要加 to”当成通用规则。' },
    { title: '-ed 与 -ing 形容词', body: '许多 -ed 形容词写人的感受，-ing 形容词写引起这种感受的人或事。辨别时问：谁感到怎样？什么令人怎样？', example: 'I was surprised by the surprising result.', pitfall: '不要因为主语是人，就一律选 -ed；人也可能是让别人产生感受的一方。' },
  ],
  bankExamples: [
    { id: 'xdf-58a1347499d5baf7', point: '不定式表示目的', explain: ['先找主句动作 made a great effort。', '原题答案 D：to solve 说明他努力是为了做什么，to 后接动词原形。'] },
    { id: 'xdf-b7409fbc52519738', point: '感官动词后的动作形式', explain: ['see 后可接宾语再接动作形式，先判断是看见动作全过程还是看见正在发生。', '原题答案 B：when I pass her room 强调经过时看到 Lily 正在跳舞，用 dancing；see Lily dance 则侧重全过程或习惯。'] },
  ],
  questions: [
    curiousQuestion('3.1-b01', 'basic', 'We went to the museum ___ about early cameras.', ['learn', 'to learn', 'learning', 'learned'], 1, ['这里要说明去博物馆的目的。', 'to learn 是不定式，可以表示“为了学习”。']),
    curiousQuestion('3.1-b02', 'basic', 'Lily decided ___ another question.', ['ask', 'asks', 'to ask', 'asking to'], 2, ['decide 后常用 to do。', 'to 后接动词原形 ask。']),
    curiousQuestion('3.1-e01', 'extended', 'Which sentence separates an observation (观察) from an idea that still needs testing?', ['The seeds grew slowly, so the soil is certainly bad.', 'The seeds grew slowly. We wonder whether they got enough sunlight.', 'The seeds grew slowly because all seeds hate water.', 'The seeds grew slowly, which proves that the room is cold.'], 1, ['生长慢是观察结果。', '“是否有足够阳光”是待验证的问题，不能当成已证明的原因。']),
    curiousQuestion('3.1-e02', 'extended', 'Which sentence means that we plan to do two tests in order to check the result?', ['We plan do two tests check the result.', 'We plan to do two tests to check the result.', 'We plan doing two tests to checked the result.', 'We plan to doing two tests for check the result.'], 1, ['plan to do 表示“计划做”。', '第二个 to check 表示目的，两个 to 后都接动词原形。']),
    curiousQuestion('3.1-c01', 'challenge', 'A machine worked after a student changed its battery. The student says, “The old battery must be broken.” Which reply is most careful?', ['The cause is proved; no more tests are needed.', 'Record what happened, then check the old battery and any other changes.', 'Delete the observation because it is not a final answer.', 'If one machine works, all old batteries are broken.'], 1, ['换电池后能工作是观察，不足以排除其他条件。', '继续检查旧电池和变量，才能让结论更可靠。']),
    curiousQuestion('3.1-c02', 'challenge', 'Which account (叙述) follows the steps “make a model—find a problem—change it and test again”?', ['We made a model to test our idea. It failed, so we changed one part and tried again.', 'We made a model for tested our idea. It failed, but we never tried again.', 'We made a model to testing our idea. It worked before we made it.', 'We made a model test our idea. The first result proved every part right.'], 0, ['to test 正确表达设计模型的目的。', '后两句按顺序说明失败、修改和再试，没有把失败误写成最终结论。']),
    curiousQuestion('3.1-b03', 'basic', 'The teacher let us ___ a second experiment (实验).', ['do', 'to do', 'doing', 'did'], 0, ['let 后接宾语再接动词原形。', 'us do 符合这一结构。']),
    curiousQuestion('3.1-b04', 'basic', 'We hope ___ the answer tomorrow.', ['find', 'finding', 'to find', 'found'], 2, ['hope 后常接带 to 的不定式。', 'to 后使用动词原形 find。']),
    curiousQuestion('3.1-b05', 'basic', 'The result was surprising. We were ___.', ['surprise', 'surprised', 'surprising', 'surprisingly'], 1, ['主语 We 说的是人的感受。', 'surprised 表示“感到惊讶的”。']),
    curiousQuestion('3.1-e03', 'extended', 'Why did Mei’s group return the next day in “Why Did the Shadows Move?”', ['They forgot which tree they had used.', 'A cloud made one mark hard to see, so they needed to check it.', 'They decided to stop keeping notes.', 'The playground was closed.'], 1, ['定位第二段结尾。', '云遮挡使某个标记不清楚，所以第二天回来检查。']),
    curiousQuestion('3.1-e04', 'extended', 'Which sentence says they used the same tree in order to make a fair comparison (比较)?', ['They used the same tree to compare the results fairly.', 'They used the same tree to comparing the results fairly.', 'They used the same tree for compare the results fairly.', 'They used the same tree compared the results fairly.'], 0, ['“为了比较”要用 to + 动词原形表示目的。', 'to compare 形式正确，其他形式不适合这个位置。']),
    curiousQuestion('3.1-e05', 'extended', 'Which sentence uses the correct verb forms after made and helped?', ['The puzzle made me to think and helped me to find a clue.', 'The puzzle made me think and helped me find a clue.', 'The puzzle made me thinking and helped me finding a clue.', 'The puzzle made me thought and helped me found a clue.'], 1, ['make + 宾语后用动词原形 think。', 'help + 宾语后可用 find 或 to find，这里 find 正确。']),
    curiousQuestion('3.1-e06', 'extended', 'Which question did Mei’s group ask but had not yet tested?', ['Was the tree shadow short at noon?', 'Was one mark hard to see on a cloudy day?', 'Would a shorter tree show the same pattern?', 'Did the group write down the time?'], 2, ['前三段中，短树的问题出现在已有记录之后。', '文章说小组决定测试另一棵树，说明答案尚待验证。']),
    curiousQuestion('3.1-c03', 'challenge', 'A student says, “The shadows differed when we changed trees, so tree height must be the only cause.” Which response is best?', ['Yes. One change of tree proves the only cause.', 'Not necessarily. The group should also keep the time and place the same.', 'No. Shadows never change.', 'They can rule out other causes by taking no notes.'], 1, ['换树可能同时改变其他条件，不能直接归因。', '要比较树高的影响，应尽量保持时间、地点等条件可比。']),
    curiousQuestion('3.1-c04', 'challenge', 'Which sentence correctly uses an infinitive after decided and another to show purpose?', ['We decided measure again to checking the pattern.', 'We decided to measure again to check the pattern.', 'We decided to measuring again for check the pattern.', 'We decided measuring again to checked the pattern.'], 1, ['decide 后接 to measure。', 'to check 表示再次测量的目的，两处 to 后都用原形。']),
    curiousQuestion('3.1-c05', 'challenge', 'Which summary best describes how Mei’s group explored the question?', ['They chose an answer first and kept only helpful data.', 'They observed a change, kept the comparison fair, checked an unclear mark, and asked a new question.', 'They looked at one photo and stopped.', 'They changed the tree and time every hour without taking notes.'], 1, ['小组先观察影子变化，用同一地点和树测量。', '他们复查云天数据，并提出短树的问题，形成连贯的探究过程。']),
  ],
});
