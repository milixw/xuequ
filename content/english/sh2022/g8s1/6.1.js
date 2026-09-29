'use strict';

// Unit 6 Life in the future：主题与语法范围据教材，内容原创。
const futureQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/6.1',
  title: 'Life in the future — 未来设想 ----- 条件状语从句',
  review: { status: 'pending' },
  reading: {
    title: 'A Morning in 2075?',
    topic: '条件状语从句',
    paragraphs: [
      'Imagine a morning in 2075. A shared electric bus might arrive when you are ready to leave. If enough people use it, the road could be less crowded. This is a [[prediction]], not a promise: the result depends on how the city plans its [[transport]] and where the electricity comes from.',
      'At school, a smart screen may suggest books for each student. [[If]] it makes a poor suggestion, a teacher can help the student choose another one. Technology should support people, not make every decision for them. The screen will not be very useful [[unless]] students have equal [[access]] to it.',
      'A future city may also use less water and energy. That can happen only if we start to [[protect]] resources today. No one knows exactly what life will be like in 2075. We can, however, discuss the choices that might create a safer and fairer future.',
    ],
    translations: [
      [
        '想象一下 2075 年的一个早晨。',
        '一辆共享电动巴士可能会在你准备出门时到达。',
        '如果有足够多的人乘坐它，道路可能就不会那么拥挤。',
        '这是一种预测，不是承诺：结果取决于城市如何规划交通，以及电力从哪里来。',
      ],
      [
        '在学校，智能屏幕也许会为每个学生推荐书籍。',
        '如果它推荐得不合适，老师可以帮助学生另选一本。',
        '技术应该帮助人，而不是替人做所有决定。',
        '除非学生都有平等的使用机会，否则屏幕不会很有用。',
      ],
      [
        '未来的城市也可能消耗更少的水和能源。',
        '只有从今天开始保护资源，这种变化才可能发生。',
        '没人确切知道 2075 年的生活会是什么样。',
        '不过，我们可以讨论哪些选择可能创造更安全、更公平的未来。',
      ],
    ],
    vocabulary: [
      { term: 'prediction', meaning: '预测' },
      { term: 'transport', meaning: '交通；运输' },
      { term: 'If', meaning: '如果（引导条件从句）' },
      { term: 'unless', meaning: '除非；如果不' },
      { term: 'access', meaning: '使用或获得的机会' },
      { term: 'protect', meaning: '保护' },
    ],
  },
  intro: [
    { title: '未来设想要标清是预测', body: '谈未来生活时，区分“已经有的技术”和“可能出现的变化”。预测可以用 may、might、could 等表达不确定，不要把猜想写成事实。', example: 'In the future, homes may use less energy if their systems become smarter.', pitfall: 'may 表示可能，不等于 will 一定发生。' },
    { title: 'if 引出条件', body: 'if 从句提出条件，主句说明条件成立时可能出现的结果。先问自己“什么情况下”，再检查结果是否真的依赖该条件。', example: 'If the train arrives on time, we will reach the museum before noon.', pitfall: '真实将来条件句中，if 从句一般用一般现在时，不写 If the train will arrive ...。' },
    { title: 'unless 表示“除非”', body: 'unless 可以理解为 if ... not，用来写某个条件不满足时会怎样。改写句子时要同时检查否定有没有重复。', example: 'We cannot finish the model unless everyone helps.', pitfall: 'unless 本身含有否定条件，不要随手再加 not 造成意思反转。' },
    { title: '有依据地写未来观点', body: '可以按“预测—理由—可能的影响—我们能做什么”组织观点。讨论未来既要看便利，也要考虑资源、安全与公平。', example: 'Shared buses may reduce traffic, but cities will need safe routes for them.', pitfall: '不要用“科技会解决一切”替代具体条件和理由。' },
    { title: '短语动词要结合语境记', body: '动词与副词或介词组合后，整体意思不一定能按单词直译。先看它后面接什么、前后发生什么，再判断短语意思。', example: 'Please look over your design before you hand it in.', pitfall: 'look over 在这里是“检查”，不是“看向上方”。' },
  ],
  bankExamples: [
    { id: 'xdf-26f0ce69335147a6', point: 'unless 从句用现在时表将来', explain: ['unless 表示“如果不/除非”，从句说将来可能得到机会。', '原题答案 A：从句用 am given，主句用 won’t pass；还要注意“得到机会”的被动关系。'] },
    { id: 'xdf-9d101d75b5b558af', point: 'if 提出条件', explain: ['主句承诺会告诉她答案，从句说触发这一行动的条件。', '原题答案 A：if 表示“如果她问我”，whether 则是“是否”。'] },
  ],
  questions: [
    futureQuestion('6.1-b01', 'basic', 'If it ___ tomorrow, our team will work indoors.', ['rains', 'will rain', 'rained', 'is rain'], 0, ['说将来真实可能发生的条件，if 从句一般用一般现在时。', 'it rains 形式正确，主句可用 will work。']),
    futureQuestion('6.1-b02', 'basic', 'We will miss the bus ___ we leave now. The meaning is: we must leave now.', ['unless', 'because', 'although', 'while'], 0, ['unless = if ... not。', '“现在不出发”是错过车的条件。']),
    futureQuestion('6.1-e01', 'extended', 'Which sentence presents a prediction (预测) as possible rather than certain?', ['Every home will certainly have a flying car.', 'Homes might use less electricity if new materials become cheaper.', 'No one will ever walk again.', 'All future technology is safe.'], 1, ['might 标记不确定的预测。', 'if 给出实现预测所依赖的条件，避免绝对化。']),
    futureQuestion('6.1-e02', 'extended', 'Which sentence correctly says people may have more time to create if robots do repetitive (重复的) work?', ['If robots will do repetitive work, people can spend more time creating.', 'If robots do repetitive work, people can spend more time creating.', 'Unless robots do repetitive work, people can spend more time creating.', 'Because robots did repetitive work, people can spend more time creating.'], 1, ['这是将来可能条件，if 从句用一般现在时 do。', '主句 can 表示条件成立时的可能结果。']),
    futureQuestion('6.1-c01', 'challenge', 'Without reliable power (可靠电力), a smart greenhouse cannot keep running. Which sentence has the same meaning?', ['The smart greenhouse can keep running unless it has reliable power.', 'The smart greenhouse cannot keep running unless it has reliable power.', 'The smart greenhouse will run because it has no power.', 'The smart greenhouse cannot run even if it has reliable power.'], 1, ['原句说可靠电力是持续运行的必要条件。', 'cannot ... unless ... 表示“除非有可靠电力，否则不能持续运行”。']),
    futureQuestion('6.1-c02', 'challenge', 'Which prediction about a future community gives a condition and also considers a limit?', ['If all cars fly, every problem will disappear.', 'If more neighbours share electric buses, traffic may decrease, but the city must also plan safe stops.', 'Because the future is better, safety is not important.', 'Unless technology improves, all people will live exactly the same way.'], 1, ['共享电动公交是明确条件，交通减少用 may 表示预测而非事实。', '后半句提出安全站点这一现实限制，论述更完整。']),
    futureQuestion('6.1-b03', 'basic', 'If the screen ___ a poor suggestion, the teacher will help.', ['makes', 'will make', 'making', 'make'], 0, ['将来真实条件句中的 if 从句一般用现在时。', 'the screen 是单数，谓语用 makes。']),
    futureQuestion('6.1-b04', 'basic', 'Unless you save your work, you ___ it when the device stops.', ['may lose', 'lost', 'are losing yesterday', 'to lose'], 0, ['unless 表示“如果不保存”。', '主句要写可能的结果，may lose 合适。']),
    futureQuestion('6.1-b05', 'basic', 'Which sentence gives a possible future, not a fact that is certain?', ['Future buses are certain to solve every problem.', 'Future buses might be more convenient.', 'Every bus will fly tomorrow.', 'No one will need to walk again.'], 1, ['might 表示可能，不作绝对承诺。', '其他选项都有无法从材料证明的绝对说法。']),
    futureQuestion('6.1-e03', 'extended', 'Who can help if the smart screen suggests a poor book in “A Morning in 2075?”', ['a bus driver', 'a teacher', 'a librarian', 'a city planner'], 1, ['定位第二段的 poor suggestion。', '文章说 a teacher can help the student choose another one。']),
    futureQuestion('6.1-e04', 'extended', 'Which sentence has the same meaning as “The screen is not very useful unless students have equal access (使用机会) to it”?', ['It will be very useful if no student can use it.', 'It will not be very useful if students do not have equal access to it.', 'It will be useful because only one student can use it.', 'It will never be useful even if everyone can use it.'], 1, ['unless 可改写为 if ... not。', '把“不具备平等使用机会”代入，结果仍是“不太有用”。']),
    futureQuestion('6.1-e05', 'extended', 'Which sentence uses a future condition and a possible result correctly?', ['If more people will use the bus, traffic may decrease.', 'If more people use the bus, traffic may decrease.', 'If more people used the bus, traffic may decreased.', 'Unless more people use the bus, traffic must decrease.'], 1, ['if 从句用一般现在时表将来。', '主句 may decrease 表可能结果，不要机械地说一定下降。']),
    futureQuestion('6.1-e06', 'extended', 'Why does the article say that a prediction is not a promise?', ['Buses no longer exist.', 'The result depends on city plans and where electricity comes from.', 'The year 2075 is already over.', 'Every prediction is wrong.'], 1, ['定位第一段 prediction, not a promise 后的解释。', '交通结果依赖规划和能源条件，不能保证发生。']),
    futureQuestion('6.1-c03', 'challenge', 'Someone says, “A smart screen will certainly help every student learn better.” Which reply is supported by the article?', ['The screen may suggest a poor book; teacher support and equal access still matter.', 'The screen will never suggest any book.', 'The article proves teachers are no longer needed.', 'New technology is always fair to everyone.'], 0, ['第二段同时写了错误推荐与教师帮助。', '还提到平等使用机会，因此“所有学生一定”缺少依据。']),
    futureQuestion('6.1-c04', 'challenge', 'Which sentence uses if and unless correctly and keeps the ideas consistent?', ['If we protect resources today, a city may use less energy; unless we act, this change is less likely.', 'If we will protect resources today, a city may use less energy; unless we will act, this change is less likely.', 'If we protect resources today, a city must use no energy; unless we act, this is certain.', 'If we act, nothing may change; unless we act, every problem disappears.'], 0, ['两个条件从句都用一般现在时。', '行动可能有帮助，缺乏行动则更难实现；没有把预测写成绝对事实。']),
    futureQuestion('6.1-c05', 'challenge', 'Which information would best support an opinion about future transport (交通)?', ['Only the words “the future will be perfect”.', 'How shared buses might reduce traffic, plus conditions such as users, power and safe stops.', 'Only five science-fiction film titles.', 'One person’s guess stated as a fact about every city.'], 1, ['观点需要预测和可检查的实现条件。', '使用人数、能源与安全设施能让论证更完整。']),
  ],
});
