'use strict';

// Unit 4 Then and now：主题与语法范围据教材，内容原创。
const changeQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/4.1',
  title: 'Then and now — 今昔对比 ----- 让步状语从句',
  review: { status: 'pending' },
  reading: {
    title: 'Two Pictures of One Street',
    topic: '让步状语从句',
    paragraphs: [
      'For a history project, Chen found an old picture of the street near his home. A small food shop stood where the community library is now. He asked his grandfather about the picture. His grandfather [[recalled]] walking there after school and meeting neighbours in front of the shop.',
      'Chen took a new picture from nearly the same place. The street was wider, and a [[footbridge]] crossed the busy road. [[Although]] the old shop had gone, the large tree beside it was still there. Chen compared the two pictures carefully. He did not say that everything was better in the past or in the [[present]].',
      'The library gives children a quiet place to read, but some older neighbours miss the shop. [[Even though]] the street has changed, people still need places to meet. Chen wrote that a good community can keep useful new things and also remember its [[history]]. His article included both pictures and the dates they were taken.',
    ],
    translations: [
      [
        '为了完成历史项目，陈找到一张家附近街道的老照片。',
        '如今的社区图书馆所在的位置，以前是一家小食品店。',
        '他向爷爷打听这张照片。',
        '爷爷回忆起放学后走到那里，并在店门口遇见邻居的情景。',
      ],
      [
        '陈几乎从同一个位置拍了一张新照片。',
        '街道变宽了，一座人行天桥横跨繁忙的马路。',
        '虽然那家老店不在了，旁边的大树却仍在那里。',
        '陈仔细比较了两张照片。',
        '他没有说过去或现在的一切都更好。',
      ],
      [
        '图书馆给孩子们提供了安静的阅读场所，但一些年长的邻居怀念那家店。',
        '尽管街道变了，人们仍需要相聚的地方。',
        '陈写道，好的社区既能保留有用的新事物，也能记住自己的历史。',
        '他的文章附上了两张照片和拍摄日期。',
      ],
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
  bankExamples: [
    { id: 'xdf-739d4714f10364a2', point: 'although 后不再接 but', explain: ['although 已经表达了“虽然贫穷，但依然努力生活”的让步关系。', '原题答案 B（斜线代表不填词），不能再在主句前加 but。'] },
    { id: 'xdf-4188b01ba491623d', point: '从句与名词短语的连接方式', explain: ['空格后是名词短语 the difficulty，不是完整从句。', '原题答案 D：in spite of 后可接名词短语；although 后应接完整句子。'] },
  ],
  questions: [
    changeQuestion('4.1-b01', 'basic', '___ the building is old, it is still in use.', ['Although', 'Because', 'Before', 'Until'], 0, ['旧建筑仍在使用，前后构成“虽然……但是……”的让步关系。', 'although 能引导让步状语从句。']),
    changeQuestion('4.1-b02', 'basic', 'Which sentence does not repeat the contrast with both although and but?', ['Although it rained, but we went out.', 'Although it rained, we went out.', 'Although it rained, so we went out.', 'Although rain, we went out.'], 1, ['although 已经连接让步从句。', '主句直接接在逗号后，不再加 but 或 so。']),
    changeQuestion('4.1-e01', 'extended', 'Which sentence compares the same place at two times without making a claim that is too broad?', ['The city was bad before and is perfect now.', 'This street had two bus stops in 2000; it has four today.', 'People in the past never travelled.', 'One old photograph proves every house was small.'], 1, ['同一条街道、两个时间点和相同指标都明确。', '其他选项有绝对化评价或以少量材料推断全部。']),
    changeQuestion('4.1-e02', 'extended', '___ there are more buses now, the journey still takes a long time at rush hour.', ['Even though', 'Because', 'After', 'Until'], 0, ['公交车更多通常意味着出行更方便，但高峰仍耗时，构成反预期。', 'even though 表达“即使/虽然”。']),
    changeQuestion('4.1-c01', 'challenge', 'The town has changed a lot. The old bridge is still there. Which sentence joins these ideas without changing their relationship?', ['Because the town has changed a lot, the old bridge is still there.', 'Although the town has changed a lot, the old bridge is still there.', 'Before the town has changed a lot, the old bridge is still there.', 'The old bridge is still there, so the town has changed a lot.'], 1, ['小镇变化大，却保留旧桥，是让步关系。', 'although 从句承认变化，主句表达“仍在”。']),
    changeQuestion('4.1-c02', 'challenge', 'Which description gives the most reliable comparison (比较) of a changing community?', ['Our street is better now because modern things are always better.', 'An old map shows one footpath here; the new map shows a footbridge. Even though traffic is heavier, people can cross without stepping into the road.', 'The street looks new, so everyone in the past disliked it.', 'Although the street changed, but it never changed at all.'], 1, ['旧地图与新地图提供了同一地点的可比证据。', '新建的人行天桥支持“行人不用走入车道”的结论，未作无法证明的普遍推断。']),
    changeQuestion('4.1-b03', 'basic', '___ the street is wider now, the old tree is still there.', ['Although', 'Because of', 'Until', 'Before'], 0, ['街道变宽但老树仍在，前后有让步关系。', 'although 后可接完整句子。']),
    changeQuestion('4.1-b04', 'basic', 'There were ___ shops on this street in the past than there are now.', ['less', 'fewer', 'little', 'much'], 1, ['shops 是可数名词复数。', '表示数量更少，用 fewer。']),
    changeQuestion('4.1-b05', 'basic', 'There was ___ traffic on this road twenty years ago.', ['fewer', 'many', 'less', 'a few'], 2, ['traffic 是不可数名词。', '比较数量“更少”，用 less。']),
    changeQuestion('4.1-e03', 'extended', 'In “Two Pictures of One Street,” what was still there in both the old and new pictures?', ['the small food shop', 'the community library', 'the large tree beside the old shop', 'the new footbridge'], 2, ['第二段写老店已不在。', '旁边的大树仍在，因此是今昔共有的事物。']),
    changeQuestion('4.1-e04', 'extended', 'Which sentence incorrectly uses both although and but?', ['Although the shop is gone, the tree remains.', 'The tree remains although the shop is gone.', 'Although the shop is gone, but the tree remains.', 'The tree remains, but the shop is gone.'], 2, ['although 已连接让步从句与主句。', '选项 C 再加 but，造成重复连接。']),
    changeQuestion('4.1-e05', 'extended', 'Why did Chen avoid saying that everything is better now?', ['Neither picture had a date.', 'The new library helps children, but some neighbours miss the old shop.', 'The street never changed.', 'He did not speak with his grandfather.'], 1, ['文章同时写了新图书馆的用途和年长邻居的怀念。', '两面证据不支持“一切都更好”的绝对结论。']),
    changeQuestion('4.1-e06', 'extended', 'In “We watched a live show. My grandparents live nearby,” what are the two roles of live?', ['adjective; verb', 'verb; adjective', 'two nouns', 'two adverbs'], 0, ['live show 中 live 修饰名词 show。', 'grandparents live 中 live 是谓语动词。']),
    changeQuestion('4.1-c03', 'challenge', 'Which sentence says that people can still cross the road by footbridge, despite (尽管) heavier traffic?', ['Although traffic is heavier, people can use the footbridge to cross.', 'Because traffic is heavier, but people can use the footbridge to cross.', 'Although traffic is heavier, but people can use the footbridge to cross.', 'Until traffic is heavier, people can use the footbridge to cross.'], 0, ['交通繁忙是一个不利条件，天桥使人仍可过街，构成让步。', 'although 从句前置后加逗号，主句前不再加 but。']),
    changeQuestion('4.1-c04', 'challenge', 'Which evidence would best show how walking facilities (步行设施) on this street changed over time?', ['maps of the same street from different years, each with a date', 'restaurant menus from different cities on the same day', 'one stranger’s opinion about all streets', 'only the sentence “I think things are better now”'], 0, ['比较对象必须是同一条街，指标要对应行人设施。', '不同年份的地图能显示变化，日期使比较有时间依据。']),
    changeQuestion('4.1-c05', 'challenge', 'Which sentence best keeps the article’s balanced view?', ['New facilities are useful, although some people value the places that disappeared.', 'All old shops were useless because the library is new.', 'Although the road is wider, but everyone loves it.', 'The tree proves that nothing has changed.'], 0, ['新设施的价值与旧地方的情感意义同时出现。', 'although 把两个看似相对的事实放在同一句，而没有绝对化。']),
  ],
});
