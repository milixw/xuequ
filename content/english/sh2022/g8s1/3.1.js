'use strict';

// Unit 3 Curious minds：主题与语法范围据教材，内容原创。
const curiousQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/3.1',
  title: '探究表达与动词不定式',
  review: { status: 'pending' },
  reading: {
    title: 'Why Did the Shadows Move?',
    paragraphs: [
      'Mei noticed a strange pattern on the playground. The shadow of a tree was short at noon but much longer before school ended. She did not want [[to guess]] the answer from one photo. Instead, she asked her friends [[to help]] her make a simple [[experiment]].',
      'The group marked the end of the shadow every hour. They used the same tree and the same spot [[to compare]] their results fairly. One student wrote down the time, and another measured the distance. A cloudy afternoon made one mark difficult to see, so they returned the next day [[to check]] it.',
      'Their notes showed a clear change, but Mei still had a question: would a shorter tree show the same pattern? The group [[decided to]] test another tree. They learned that [[curiosity]] is more than asking “why”. It also means finding a careful way to look for an answer.',
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
  questions: [
    curiousQuestion('3.1-b01', 'basic', 'We went to the museum ___ about early cameras.', ['learn', 'to learn', 'learning', 'learned'], 1, ['这里要说明去博物馆的目的。', 'to learn 是不定式，可以表示“为了学习”。']),
    curiousQuestion('3.1-b02', 'basic', 'Lily decided ___ another question.', ['ask', 'asks', 'to ask', 'asking to'], 2, ['decide 后常用 to do。', 'to 后接动词原形 ask。']),
    curiousQuestion('3.1-e01', 'extended', '哪一句清楚地区分了观察与猜想？', ['The seeds grew slowly, so the soil is certainly bad.', 'The seeds grew slowly. We wonder whether they got enough sunlight.', 'The seeds grew slowly because all seeds hate water.', 'The seeds grew slowly, which proves that the room is cold.'], 1, ['生长慢是观察结果。', '“是否有足够阳光”是待验证的问题，不能当成已证明的原因。']),
    curiousQuestion('3.1-e02', 'extended', '“我们计划做两次实验以检查结果。”选最准确的句子。', ['We plan do two tests check the result.', 'We plan to do two tests to check the result.', 'We plan doing two tests to checked the result.', 'We plan to doing two tests for check the result.'], 1, ['plan to do 表示“计划做”。', '第二个 to check 表示目的，两个 to 后都接动词原形。']),
    curiousQuestion('3.1-c01', 'challenge', '一名同学说“我换了电池后机器就工作了，因此一定是旧电池坏了”。哪一项最严谨？', ['结论已经得到证明，不需要再试。', '应记录观察结果，并进一步检查旧电池或其他同时改变的条件。', '应该删掉这次观察，因为它不是结论。', '只要机器工作，所有旧电池都坏了。'], 1, ['换电池后能工作是观察，不足以排除其他条件。', '继续检查旧电池和变量，才能让结论更可靠。']),
    curiousQuestion('3.1-c02', 'challenge', '为“设计模型—发现问题—修改后再试”选最合适的英文叙述。', ['We made a model to test our idea. It failed, so we changed one part and tried again.', 'We made a model for tested our idea. It failed, but we never tried again.', 'We made a model to testing our idea. It worked before we made it.', 'We made a model test our idea. The first result proved every part right.'], 0, ['to test 正确表达设计模型的目的。', '后两句按顺序说明失败、修改和再试，没有把失败误写成最终结论。']),
  ],
});
