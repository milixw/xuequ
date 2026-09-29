'use strict';

// Unit 6 Life in the future：主题与语法范围据教材，内容原创。
const futureQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/6.1',
  title: '未来设想与条件状语从句',
  review: { status: 'pending' },
  reading: {
    title: 'A Morning in 2075?',
    paragraphs: [
      'Imagine a morning in 2075. A shared electric bus might arrive when you are ready to leave. If enough people use it, the road could be less crowded. This is a [[prediction]], not a promise: the result depends on how the city plans its [[transport]] and where the electricity comes from.',
      'At school, a smart screen may suggest books for each student. [[If]] it makes a poor suggestion, a teacher can help the student choose another one. Technology should support people, not make every decision for them. The screen will not be very useful [[unless]] students have equal [[access]] to it.',
      'A future city may also use less water and energy. That can happen only if we start to [[protect]] resources today. No one knows exactly what life will be like in 2075. We can, however, discuss the choices that might create a safer and fairer future.',
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
  questions: [
    futureQuestion('6.1-b01', 'basic', 'If it ___ tomorrow, our team will work indoors.', ['rains', 'will rain', 'rained', 'is rain'], 0, ['说将来真实可能发生的条件，if 从句一般用一般现在时。', 'it rains 形式正确，主句可用 will work。']),
    futureQuestion('6.1-b02', 'basic', 'We will miss the bus ___ we leave now. 句意是“除非现在出发，否则会错过车”。', ['unless', 'because', 'although', 'while'], 0, ['unless = if ... not。', '“现在不出发”是错过车的条件。']),
    futureQuestion('6.1-e01', 'extended', '哪一句把预测说成“可能”，而没有误当成确定事实？', ['Every home will certainly have a flying car.', 'Homes might use less electricity if new materials become cheaper.', 'No one will ever walk again.', 'All future technology is safe.'], 1, ['might 标记不确定的预测。', 'if 给出实现预测所依赖的条件，避免绝对化。']),
    futureQuestion('6.1-e02', 'extended', '“如果机器人能处理重复的工作，人们就可以把更多时间花在创造上。”最合适的是：', ['If robots will do repetitive work, people can spend more time creating.', 'If robots do repetitive work, people can spend more time creating.', 'Unless robots do repetitive work, people can spend more time creating.', 'Because robots did repetitive work, people can spend more time creating.'], 1, ['这是将来可能条件，if 从句用一般现在时 do。', '主句 can 表示条件成立时的可能结果。']),
    futureQuestion('6.1-c01', 'challenge', '“如果没有可靠的电力，智能温室就不能持续运行。”哪项改写意思相同？', ['The smart greenhouse can keep running unless it has reliable power.', 'The smart greenhouse cannot keep running unless it has reliable power.', 'The smart greenhouse will run because it has no power.', 'The smart greenhouse cannot run even if it has reliable power.'], 1, ['原句说可靠电力是持续运行的必要条件。', 'cannot ... unless ... 表示“除非有可靠电力，否则不能持续运行”。']),
    futureQuestion('6.1-c02', 'challenge', '为未来社区写一句既有条件又考虑限制的预测，选最合适的一项。', ['If all cars fly, every problem will disappear.', 'If more neighbours share electric buses, traffic may decrease, but the city must also plan safe stops.', 'Because the future is better, safety is not important.', 'Unless technology improves, all people will live exactly the same way.'], 1, ['共享电动公交是明确条件，交通减少用 may 表示预测而非事实。', '后半句提出安全站点这一现实限制，论述更完整。']),
  ],
});
