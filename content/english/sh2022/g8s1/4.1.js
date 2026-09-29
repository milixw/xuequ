'use strict';

// Unit 4 Then and now：主题与语法范围据教材，内容原创。
const changeQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/4.1',
  title: '今昔对比与让步状语从句',
  review: { status: 'pending' },
  reading: {
    title: 'Two Pictures of One Street',
    paragraphs: [
      'For a history project, Chen found an old picture of the street near his home. A small food shop stood where the community library is now. He asked his grandfather about the picture. His grandfather [[recalled]] walking there after school and meeting neighbours in front of the shop.',
      'Chen took a new picture from nearly the same place. The street was wider, and a [[footbridge]] crossed the busy road. [[Although]] the old shop had gone, the large tree beside it was still there. Chen compared the two pictures carefully. He did not say that everything was better in the past or in the [[present]].',
      'The library gives children a quiet place to read, but some older neighbours miss the shop. [[Even though]] the street has changed, people still need places to meet. Chen wrote that a good community can keep useful new things and also remember its [[history]]. His article included both pictures and the dates they were taken.',
    ],
    vocabulary: [
      { term: 'recalled', meaning: '回忆起' },
      { term: 'footbridge', meaning: '人行天桥' },
      { term: 'Although', meaning: '虽然；尽管' },
      { term: 'present', meaning: '现在；目前' },
      { term: 'Even though', meaning: '尽管；即使（语气较强）' },
      { term: 'history', meaning: '历史' },
    ],
  },
  intro: [
    { title: '比较要选同一把尺子', body: '谈“过去与现在”，先确定比较对象、地点和时间，再比较交通、通信或生活方式。避免用一张旧照片推断所有人的生活。', example: 'Thirty years ago, this street had fewer shops; today it has a library and a park.', pitfall: 'fewer 修饰可数复数；less 修饰不可数名词。' },
    { title: 'although、though 表示“虽然”', body: '让步状语从句先承认一个事实，再写不受它阻挡的结果。although 和 though 后要接完整句子。', example: 'Although the road was narrow, the market was busy.', pitfall: '同一句中通常不再用 but 把主句连上：Although ... , but ... 是常见错误。' },
    { title: 'even though 语气更强', body: 'even though 也引导让步从句，比 although 更强调“尽管如此”。选词时先看真实关系是不是“出乎预料仍然发生”。', example: 'Even though the shop is small, it serves hundreds of customers.', pitfall: '不要把 even though 当成 because：前者是让步，后者是原因。' },
    { title: '比较短文要有证据', body: '写今昔对比时可分“过去—现在—变化的影响”。给出可核查的事例，例如设施、路线或使用方式，而不是只说“现在更好”。', example: 'In the past, neighbours used a shared phone. Now many families use video calls.', pitfall: '“过去/现在”要与相应时间表达和动词形式协调。' },
    { title: '一词多义要靠上下文', body: '同一个拼写在不同句子里可能词性和意思不同。先看它在句中充当什么成分，再判断含义；不要只背第一个中文义。', example: 'We watched a live show. My grandparents live nearby.', pitfall: '前一句 live 是形容词，后一句是动词；发音也不同。' },
  ],
  questions: [
    changeQuestion('4.1-b01', 'basic', '___ the building is old, it is still in use.', ['Although', 'Because', 'Before', 'Until'], 0, ['旧建筑仍在使用，前后构成“虽然……但是……”的让步关系。', 'although 能引导让步状语从句。']),
    changeQuestion('4.1-b02', 'basic', '哪一句没有重复使用 although 和 but？', ['Although it rained, but we went out.', 'Although it rained, we went out.', 'Although it rained, so we went out.', 'Although rain, we went out.'], 1, ['although 已经连接让步从句。', '主句直接接在逗号后，不再加 but 或 so。']),
    changeQuestion('4.1-e01', 'extended', '选出比较对象明确、说法不过度的一句。', ['The city was bad before and is perfect now.', 'This street had two bus stops in 2000; it has four today.', 'People in the past never travelled.', 'One old photograph proves every house was small.'], 1, ['同一条街道、两个时间点和相同指标都明确。', '其他选项有绝对化评价或以少量材料推断全部。']),
    changeQuestion('4.1-e02', 'extended', '___ there are more buses now, the journey still takes a long time at rush hour.', ['Even though', 'Because', 'After', 'Until'], 0, ['公交车更多通常意味着出行更方便，但高峰仍耗时，构成反预期。', 'even though 表达“即使/虽然”。']),
    changeQuestion('4.1-c01', 'challenge', '合并两句且保持原意：“The town has changed a lot. The old bridge is still there.”', ['Because the town has changed a lot, the old bridge is still there.', 'Although the town has changed a lot, the old bridge is still there.', 'Before the town has changed a lot, the old bridge is still there.', 'The old bridge is still there, so the town has changed a lot.'], 1, ['小镇变化大，却保留旧桥，是让步关系。', 'although 从句承认变化，主句表达“仍在”。']),
    changeQuestion('4.1-c02', 'challenge', '写社区变化时，哪一段的比较最可靠？', ['Our street is better now because modern things are always better.', 'An old map shows one footpath here; the new map shows a footbridge. Even though traffic is heavier, people can cross without stepping into the road.', 'The street looks new, so everyone in the past disliked it.', 'Although the street changed, but it never changed at all.'], 1, ['旧地图与新地图提供了同一地点的可比证据。', '新建的人行天桥支持“行人不用走入车道”的结论，未作无法证明的普遍推断。']),
  ],
});
