'use strict';

// Unit 1 Water：目录主题和语法范围据教材，以下例句与练习均为原创。
const waterQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/1.1',
  title: '水资源与时间状语从句（一）',
  review: { status: 'pending' },
  reading: {
    title: 'The Garden after the Rain',
    paragraphs: [
      'Our school has a small garden behind the library. Last summer, the flowers often looked dry. We used clean tap water to keep them alive, but our science club wondered whether we could [[reuse]] water in a better way. We decided to watch what happened [[when]] it rained.',
      'The club placed two covered barrels beside the roof. [[As soon as]] the first heavy rain ended, we checked them. Both were nearly full. Before we used the water, our teacher helped us remove leaves and dirt. We then carried it to the garden. [[While]] some students watered the plants, others measured how much water we had saved.',
      'The barrels did not solve every problem. During a long dry week, there was not enough [[rainwater]], so we still needed the tap. Now we check for a [[leak]] before we water the garden. We also keep a daily [[record]]. Small actions matter most when we continue them, not just when we talk about them.',
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
  questions: [
    waterQuestion('1.1-b01', 'basic', '选出正确的表达：我们没有很多水。', ['We do not have many water.', 'We do not have much water.', 'We do not have a few water.', 'We do not have several water.'], 1, ['water 表示“水”时不可数。', 'much 可修饰不可数名词，其他三个通常修饰可数名词复数。']),
    waterQuestion('1.1-b02', 'basic', '___ the bell rang, the students left the classroom.', ['When', 'Because of', 'Despite', 'During'], 0, ['空格后是完整句子 the bell rang。', 'when 可以引导时间状语从句；其余选项不能在此直接接完整句子表达“当……时”。']),
    waterQuestion('1.1-e01', 'extended', '按“前置时间从句后加逗号”的写法，哪一句的标点和结构都正确？', ['When we reached the river we stopped to rest.', 'When we reached the river, we stopped to rest.', 'When we reached the river, and we stopped to rest.', 'When reached the river, we stopped to rest.'], 1, ['when 从句前置，按本题要求在后面加逗号。', '从句和主句都要有完整结构，不能多加 and。']),
    waterQuestion('1.1-e02', 'extended', 'I was checking the water meter ___ my sister was writing down the numbers. 两个动作同时持续，选哪个最贴切？', ['while', 'until', 'after', 'before'], 0, ['checking 和 writing 都是在一段时间内进行。', 'while 强调两件事同时持续；其他词改变了先后关系。']),
    waterQuestion('1.1-c01', 'challenge', '学校想减少浪费。哪条建议同时写出了具体行动和合理理由？', ['Water is important.', 'Everyone should save water.', 'We should turn off the tap while soaping our hands because running water is wasted then.', 'Water is useful, and the school has many taps.'], 2, ['先找可执行的行动：洗手打肥皂时关水龙头。', '再找与行动直接对应的理由：这段时间开着水会浪费。']),
    waterQuestion('1.1-c02', 'challenge', '读句子：When the tank is nearly empty, we collect rainwater. 哪项改写保持了原来的时间关系和意思？', ['We collect rainwater before the tank is nearly empty.', 'We collect rainwater after the tank is nearly empty.', 'We collect rainwater when the tank is nearly empty.', 'We collect rainwater because the tank is nearly empty.'], 2, ['原句的 when 表示“当水箱快空时”。', '把从句放到后面仍可用 when；before、after 改变时间，because 改成原因。']),
  ],
});
