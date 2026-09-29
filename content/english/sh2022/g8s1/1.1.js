'use strict';

// Unit 1 Water：目录主题和语法范围据教材，以下例句与练习均为原创。
const waterQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/1.1',
  title: 'Water — 水资源 ----- 时间状语从句（一）',
  review: { status: 'pending' },
  reading: {
    title: 'The Garden after the Rain',
    topic: '时间状语从句（一）',
    paragraphs: [
      'Our school has a small garden behind the library. Last summer, the flowers often looked dry. We used clean tap water to keep them alive, but our science club wondered whether we could [[reuse]] water in a better way. We decided to watch what happened [[when]] it rained.',
      'The club placed two covered barrels beside the roof. [[As soon as]] the first heavy rain ended, we checked them. Both were nearly full. Before we used the water, our teacher helped us remove leaves and dirt. We then carried it to the garden. [[While]] some students watered the plants, others measured how much water we had saved.',
      'The barrels did not solve every problem. During a long dry week, there was not enough [[rainwater]], so we still needed the tap. Now we check for a [[leak]] before we water the garden. We also keep a daily [[record]]. Small actions matter most when we continue them, not just when we talk about them.',
    ],
    translations: [
      [
        '我们学校的图书馆后面有一个小花园。',
        '去年夏天，花儿看起来常常很干。',
        '我们用干净的自来水让它们存活，但科学社团想知道能否更好地重复利用水。',
        '我们决定观察下雨时会发生什么。',
      ],
      [
        '社团在屋顶旁放了两个带盖的桶。',
        '第一场大雨一结束，我们就去查看。',
        '两个桶都快装满了。',
        '用这些水之前，老师帮我们清除了树叶和泥土。',
        '然后我们把水提到花园里。',
        '一些同学给植物浇水时，其他同学测量我们节省了多少水。',
      ],
      [
        '这些桶并没有解决所有问题。',
        '在漫长而干燥的一周里，雨水不够，所以我们仍需要用水龙头的水。',
        '现在，我们浇花前会先检查有没有漏水处。',
        '我们还每天做记录。',
        '只有坚持做这些小事，而不只是谈论它们，小行动才最有意义。',
      ],
    ],
    vocabulary: [
      { term: 'reuse', meaning: '再次使用；重复利用' },
      { term: 'when', meaning: '当……时（引导时间从句）' },
      { term: 'As soon as', meaning: '一……就……' },
      { term: 'While', meaning: '当……期间；与此同时' },
      { term: 'rainwater', meaning: '雨水' },
      { term: 'leak', meaning: '漏水处；渗漏' },
      { term: 'record', meaning: '记录；记载' },
    ],
  },
  intro: [
    { title: '从“水在哪里”到“水够不够”', body: '讨论水资源时，先分清日常用途、来源和节约行动，再说理由。water 作“水”时通常不可数；谈用量可说 much water 或 a little water。', example: 'We use water to wash vegetables, but we can reuse it for plants.', pitfall: '不要说 many water；many 修饰可数名词复数。' },
    { title: 'when 引出时间背景', body: '时间状语从句说明一件事在什么时候发生。when 后接完整句子；从句在前面时，通常在它后面加逗号。', example: 'When the rain stopped, the children went outside.', pitfall: '不要把 when 后面只写成一个名词短语，却当作完整从句。' },
    { title: 'while 强调同一段时间', body: 'while 常表示两件事在同一段时间内发生。先看动作是否持续，再决定用 while 是否自然。', example: 'While my brother was taking a shower, I was filling the kettle.', pitfall: '短促的瞬间动作不宜机械地都用 while；要看句意是否强调持续。' },
    { title: '提出节水建议', body: '建议要说清“做什么”和“为什么”：可以用 We should ... because ...，或 If we ..., we can ...。写校园建议时，行动要具体、可执行。', example: 'We should report leaking taps because they waste clean water.', pitfall: '只写 Save water! 是口号，不是可操作的建议。' },
    { title: '不定代词指不说出名字的人或物', body: 'someone、anyone、everyone、nobody 指人；something、anything、everything、nothing 指物。它们作主语时，谓语通常用单数形式。', example: 'Someone is checking the pipes. Nobody knows where the leak is.', pitfall: '不要说 Everyone are ...；形容词一般放在不定代词后，如 something useful。' },
    { title: '同一个词也能换词性', body: '英语里有些词不改拼写也能换词性，例如名词作动词。先看它前后的词和句子位置，再判断是“事物”还是“动作”。', example: 'There is water in the can. Please water the young tree.', pitfall: '第二句的 water 是动词，不能按“这里有水”的名词用法理解。' },
  ],
  bankExamples: [
    { id: 'xdf-eb1397d4189c2411', point: '持续动作中的突发事件', explain: ['先找背景动作：was writing 表示当时正在写信。', '听见敲门声是在写信过程中发生的事，原题答案 B，用 when 引出这一事件。'] },
    { id: 'xdf-cd65462bdec81cb2', point: 'until 表示持续到某时', explain: ['煮番茄这个动作持续到番茄变软。', '原题答案 D，until 表示“直到……为止”；after 只说在变软之后，不符合煮的过程。'] },
  ],
  questions: [
    waterQuestion('1.1-b01', 'basic', 'Which sentence is correct?', ['We do not have many water.', 'We do not have much water.', 'We do not have a few water.', 'We do not have several water.'], 1, ['water 表示“水”时不可数。', 'much 可修饰不可数名词，其他三个通常修饰可数名词复数。']),
    waterQuestion('1.1-b02', 'basic', '___ the bell rang, the students left the classroom.', ['When', 'Because of', 'Despite', 'During'], 0, ['空格后是完整句子 the bell rang。', 'when 可以引导时间状语从句；其余选项不能在此直接接完整句子表达“当……时”。']),
    waterQuestion('1.1-e01', 'extended', 'Which sentence has the correct comma after a time clause at the beginning?', ['When we reached the river we stopped to rest.', 'When we reached the river, we stopped to rest.', 'When we reached the river, and we stopped to rest.', 'When reached the river, we stopped to rest.'], 1, ['when 从句前置，按本题要求在后面加逗号。', '从句和主句都要有完整结构，不能多加 and。']),
    waterQuestion('1.1-e02', 'extended', 'I was checking the water meter (水表) ___ my sister was writing down the numbers. Both actions continued at the same time.', ['while', 'until', 'after', 'before'], 0, ['checking 和 writing 都是在一段时间内进行。', 'while 强调两件事同时持续；其他词改变了先后关系。']),
    waterQuestion('1.1-c01', 'challenge', 'Which school water-saving proposal (建议) gives both a clear action and a reason?', ['Water is important.', 'Everyone should save water.', 'We should turn off the tap while soaping our hands because running water is wasted then.', 'Water is useful, and the school has many taps.'], 2, ['先找可执行的行动：洗手打肥皂时关水龙头。', '再找与行动直接对应的理由：这段时间开着水会浪费。']),
    waterQuestion('1.1-c02', 'challenge', 'Read: “When the tank is nearly empty, we collect rainwater.” Which sentence keeps the same time relationship?', ['We collect rainwater before the tank is nearly empty.', 'We collect rainwater after the tank is nearly empty.', 'We collect rainwater when the tank is nearly empty.', 'We collect rainwater because the tank is nearly empty.'], 2, ['原句的 when 表示“当水箱快空时”。', '把从句放到后面仍可用 when；before、after 改变时间，because 改成原因。']),
    waterQuestion('1.1-b03', 'basic', 'Everyone ___ a part to play in saving water.', ['have', 'has', 'are having', 'were having'], 1, ['everyone 虽然指所有人，但作主语时按单数处理。', '一般现在时选 has。']),
    waterQuestion('1.1-b04', 'basic', 'Which phrase means “a thing that is useful”?', ['useful something', 'something useful', 'some useful thing else', 'anything usefully'], 1, ['形容词修饰 something 等不定代词时后置。', 'something useful 词序和词性都正确。']),
    waterQuestion('1.1-b05', 'basic', 'We checked the pipes ___ we left the garden. We checked them first.', ['before', 'after', 'until', 'although'], 0, ['先检查，后离开。', 'before we left 表示“在我们离开之前”。']),
    waterQuestion('1.1-e03', 'extended', 'In “Please water the plants with rainwater,” what are the roles of water and rainwater?', ['verb; noun', 'noun; verb', 'two verbs', 'two nouns'], 0, ['Please 后的 water 是祈使句动词“浇水”。', 'rainwater 是名词“雨水”，构成法与 water 有关。']),
    waterQuestion('1.1-e04', 'extended', 'According to “The Garden after the Rain,” why did the club still need tap water?', ['The barrels were too far away.', 'There was too little rainwater during a dry week.', 'The teacher did not allow rainwater.', 'The garden no longer needed water.'], 1, ['定位文章第三段的 dry week。', '那周 rainwater 不足，因此仍需要 tap water。']),
    waterQuestion('1.1-e05', 'extended', 'Which sentence shows two actions continuing at the same time?', ['While I was recording the data, my partner was measuring the water.', 'Until I recorded the data, my partner measured the water.', 'Before I was recording the data, my partner measured the water.', 'Although I recorded the data, my partner measured the water.'], 0, ['两个动作都在一段时间内进行，且同时发生。', 'while 与两个进行时配合，清楚表达这一关系。']),
    waterQuestion('1.1-e06', 'extended', 'Which statement gives evidence (证据) for a school water-saving plan?', ['Water is important.', 'We should all try hard.', 'Records show that fixing a leaking tap saved two buckets of water a day.', 'No tap will ever break.'], 2, ['证据要对应节水行动，并有可观察的结果。', '修理前后的用水记录比口号或绝对化说法更可核查。']),
    waterQuestion('1.1-c03', 'challenge', 'The barrels were full after rain, but the club still needed tap water in a dry week. What is the best conclusion?', ['Collecting rainwater has no value.', 'Collecting rainwater helps, but it may not provide enough water all the time.', 'One rainy day means tap water will never be needed again.', 'The club should stop keeping water records.'], 1, ['把雨后和干旱两个情境一起考虑。', '前者证明方法有效，后者说明它有条件限制。']),
    waterQuestion('1.1-c04', 'challenge', 'Complete the water-saving advice: ___ should report a leaking tap ___ they see one.', ['Anyone; when', 'Anything; while', 'Nobody; after', 'Everything; until'], 0, ['报告漏水的是人，用 Anyone 指未指定的任何人。', 'when they see one 表示“看见漏水龙头时”，时间关系清楚。']),
    waterQuestion('1.1-c05', 'challenge', 'A student says, “The article proves rainwater can completely replace tap water.” Which reply uses the strongest evidence?', ['Rainwater is a long word.', 'The article says there was too little rainwater in a dry week, so tap water was still needed.', 'No flowers can use rainwater.', 'The barrels stood beside the roof.'], 1, ['先核对“完全取代”这一绝对说法。', '第三段明确给出雨水不足的反例，故不能推出完全取代。']),
  ],
});
