'use strict';

// 六上 Unit 1 School life：主题、语法（一般现在时）和功能范围据课本目录与 Grammar file，短文、知识卡和练习均为原创。
const schoolQ611 = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g6s1/1.1',
  title: 'School life — 学校生活 ----- 一般现在时',
  review: { status: 'pending' },
  reading: {
    title: "Lin Tao's School Day",
    topic: '一般现在时',
    paragraphs: [
      'My name is Lin Tao, and I am a new student at Riverside Middle School. There are six classes in our [[grade]]. My school day starts at ten to eight in the morning and ends at four in the afternoon. I usually walk to school with my friend Ben.',
      'Every day we have five or six lessons. [[Geography]] is my favourite subject because I love maps. Ben likes [[ICT]] best, and he often helps me with my computer homework. Between lessons, we have a short [[break]] of ten minutes. [[During]] the break, some students chat in the classroom and others play outside.',
      'On Tuesdays, I stay after school for the science [[club]]. We do an [[experiment]] there every week. My sister does not go to my school, but she asks me about my clubs every evening. For me, the best part of school life is learning new things with my friends.',
    ],
    translations: [
      [
        '我叫林涛，是河畔中学的一名新生。',
        '我们年级有六个班。',
        '我的上学日从早上七点五十分开始，到下午四点结束。',
        '我通常和朋友本一起走路上学。',
      ],
      [
        '每天我们有五到六节课。',
        '地理是我最喜欢的科目，因为我喜欢地图。',
        '本最喜欢信息科技课，他经常帮我做电脑作业。',
        '两节课之间，我们有十分钟的课间休息。',
        '课间休息时，一些同学在教室里聊天，另一些在外面玩。',
      ],
      [
        '每周二放学后，我留下来参加科学社。',
        '我们每周都在那里做一个实验。',
        '我姐姐不在我的学校上学，但她每天晚上都会问我社团的事。',
        '对我来说，学校生活最棒的部分是和朋友们一起学习新东西。',
      ],
    ],
    vocabulary: [
      { term: 'grade', meaning: '年级' },
      { term: 'Geography', meaning: '地理' },
      { term: 'ICT', meaning: '信息科技（课程）' },
      { term: 'break', meaning: '课间休息' },
      { term: 'During', meaning: '在……期间' },
      { term: 'club', meaning: '社团' },
      { term: 'experiment', meaning: '实验' },
    ],
  },
  intro: [
    { title: '一般现在时：说习惯和日常', body: '经常做的事、按时间表进行的事，以及一直都对的事实，都用一般现在时。它常和 every day、usually、often、on Mondays 这类词一起出现。', example: 'I read English stories every evening.', pitfall: '看到 every day、on Fridays 这样表示“经常”的词，就要想到一般现在时。' },
    { title: '他、她、它做主语，动词加 -s', body: '主语是 he、she、it 或一个人、一件事时，动词要变成“三单”形式：多数加 -s；以 s、x、sh、ch、o 结尾加 -es；辅音字母 + y 结尾，变 y 为 i 再加 -es；have 变成 has。', example: 'He fixes bikes. She carries a red bag. It has two doors.', pitfall: 'I 和 you 虽然是一个人，动词也不加 -s：I like ...，You like ...' },
    { title: '否定和提问借助 do / does', body: '一般现在时的否定句在动词前加 don\'t 或 doesn\'t；一般疑问句把 Do 或 Does 放在句首。用了 does 或 doesn\'t，后面的动词就回到原形。', example: 'My uncle doesn\'t drink coffee. Does he drink tea? No, he doesn\'t.', pitfall: '不能说 Does she likes ...，does 已经“带走”了 -s。' },
    { title: '礼貌地询问信息', body: '向老师或不认识的人打听事情，先说 Excuse me 引起对方注意，再用 May I ask ...? 或特殊疑问句提问，最后说 Thanks a lot.', example: 'Excuse me, Ms Lin. Could you tell me when the library opens?', pitfall: '直接说 Tell me ... 听起来像命令，不够礼貌。' },
    { title: '称呼老师：Mr / Ms / Miss / Mrs + 姓', body: '英语里一般不说 Teacher Wang，而是用称谓加姓：男老师用 Mr，女老师常用 Ms。中国人的名字姓在前，所以只取第一个字（姓）。', example: 'Good afternoon, Mr Zhou.', pitfall: '不要把名字放在 Mr、Ms 后面，也不要连名带姓一起叫。' },
    { title: '句首大写，句末有标点', body: '每个句子的第一个字母大写，句末用句号、问号或感叹号。人名、地名、星期和月份的首字母在句中也要大写，代词 I 永远大写。', example: 'My best friend is from Hangzhou.', pitfall: '星期写成 monday 是常见错误，应写 Monday。' },
  ],
  questions: [
    schoolQ611('1.1-b01', 'basic', 'My brother ___ to school by bike every day.', ['go', 'goes', 'going', 'is go'], 1, ['主语 my brother 是第三人称单数，every day 表示习惯，用一般现在时。', 'go 以 o 结尾，加 -es 变成 goes。']),
    schoolQ611('1.1-b02', 'basic', 'Which is the correct -s form of “watch”?', ['watchs', 'watches', 'watchies', 'watching'], 1, ['watch 以 ch 结尾。', '以 s、x、sh、ch 结尾的动词加 -es：watches。']),
    schoolQ611('1.1-b03', 'basic', '___ your school have a music club?', ['Do', 'Does', 'Is', 'Are'], 1, ['句中的动词是 have（有），是实义动词，提问要借助 do 或 does。', '主语 your school 是第三人称单数，用 Does，后面的 have 保持原形。']),
    schoolQ611('1.1-b04', 'basic', 'Your English teacher is a woman. Her name is Zhang Hong. What do you say to her in the morning?', ['Good morning, Teacher Zhang.', 'Good morning, Ms Hong.', 'Good morning, Ms Zhang.', 'Good morning, Zhang Hong.'], 2, ['英语里称呼老师用“称谓 + 姓”，女老师可以用 Ms。', '中国人名姓在前，Zhang 是姓，所以说 Ms Zhang。']),
    schoolQ611('1.1-b05', 'basic', 'Which sentence is written correctly?', ['we have art on Wednesdays.', 'We have art on Wednesdays', 'We have art on Wednesdays.', 'we have art on wednesdays.'], 2, ['句首字母要大写，句末要有句号。', '星期的首字母也要大写：Wednesdays。只有 C 三处都对。']),
    schoolQ611('1.1-e01', 'extended', 'Lily ___ like spicy (辣的) food, so she never eats hot pot.', ["don't", "doesn't", "isn't", 'not'], 1, ['主语 Lily 是第三人称单数，句子说的是她的口味，用一般现在时。', '实义动词 like 的否定要借助 doesn\'t，后面的 like 用原形。']),
    schoolQ611('1.1-e02', 'extended', 'Which sentence talks about a fact that is always true?', ['My cousin is reading now.', 'Fish live in water.', 'We had a test yesterday.', 'I am going to visit Hainan.'], 1, ['“一直都对的事实”用一般现在时。', '鱼生活在水里是事实；A 是正在进行，C 是过去，D 是将来的打算。']),
    schoolQ611('1.1-e03', 'extended', '— Do your parents cook on Sundays? — ___ They make dumplings together.', ['Yes, they do.', 'Yes, they are.', 'Yes, they does.', 'Yes, they cook.'], 0, ['用 Do 提问，简略回答也用 do：Yes, they do. / No, they don\'t.', '主语 they 是复数，不能用 does；are 对应的是 Are 开头的问句。']),
    schoolQ611('1.1-e04', 'extended', 'Our school library ___ at 8:00 and closes at 5:00.', ['open', 'opens', 'opening', 'to open'], 1, ['图书馆的开放时间是固定的日程，用一般现在时。', '主语 our school library 是单数，和后面的 closes 一样加 -s：opens。']),
    schoolQ611('1.1-e05', 'extended', "According to “Lin Tao's School Day”, which club does Lin Tao go to after school?", ['the art club', 'the science club', 'the music club', 'the football club'], 1, ['定位第三段第一句：On Tuesdays, I stay after school for the science club.', '文章只提到科学社，其他社团都没有出现。']),
    schoolQ611('1.1-e06', 'extended', 'You want to know when the art club meets. Which question is polite and correct?', ['When the art club meets?', 'Excuse me, when does the art club meet?', 'Excuse me, when do the art club meet?', 'Hey, when the art club meet?'], 1, ['礼貌提问先说 Excuse me。', '特殊疑问句的顺序是“疑问词 + does + 主语 + 动词原形”；the art club 是单数，用 does。']),
    schoolQ611('1.1-c01', 'challenge', 'Find the mistake: “My sister study English every evening, but she doesn\'t like grammar.”', ['My sister → My sisters', 'study → studies', "doesn't → don't", 'every evening → evenings'], 1, ['先找主语：my sister，第三人称单数，后半句的 she doesn\'t 也说明是一个人。', 'study 是“辅音字母 + y”结尾，变 y 为 i 再加 -es：studies。改 A 会和后面的 she 不一致。']),
    schoolQ611('1.1-c02', 'challenge', "Which of these is NOT mentioned in “Lin Tao's School Day”?", ['when the school day starts', "Lin Tao's favourite subject", 'how long the break is', 'what Lin Tao eats for lunch'], 3, ['逐项回文章找依据：第一段说了上学时间，第二段说了最喜欢的科目和课间十分钟。', '全文没有提到午饭吃什么，所以选 D。这类题要一项一项核对，不能凭印象。']),
    schoolQ611('1.1-c03', 'challenge', 'Which question matches the answer “She has PE on Thursdays.”?', ['When does she have PE?', 'When does she has PE?', 'When do she have PE?', 'What does she have PE?'], 0, ['答句说的是时间 on Thursdays，用 When 提问。', 'she 是第三人称单数，用 does；does 后面的 has 要变回原形 have。']),
    schoolQ611('1.1-c04', 'challenge', 'Mike ___ his homework after dinner, and then he ___ a story.', ['do; read', 'does; reads', 'does; read', 'did; reads'], 1, ['两个分句的主语都是 Mike / he，说的是每天的习惯，用一般现在时。', '两个动词都要用三单形式：does 和 reads，前后时态要一致。']),
    schoolQ611('1.1-c05', 'challenge', 'Which sentence uses the present simple for a timetable (时间表)?', ['The school bus leaves at 7:15 every morning.', 'The school bus is leaving now.', 'The school bus left early yesterday.', 'Look! The school bus is coming.'], 0, ['按时间表固定发生的事用一般现在时。', 'A 的 leaves 和 every morning 表示固定的班车时间；B、D 是正在发生，C 是过去。']),
  ],
});
