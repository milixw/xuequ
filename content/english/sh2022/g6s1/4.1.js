'use strict';

// 六上 Unit 4 Sports：主题、语法（疑问词 what、who，频度副词）和功能范围据课本目录与 Grammar file 第 128～129 页，短文、知识卡和练习均为原创。
const sportsQ641 = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g6s1/4.1',
  title: 'Sports — 体育运动 ----- 疑问词 what、who',
  review: { status: 'pending' },
  reading: {
    title: "Leo's First Practice",
    topic: '疑问词 what、who 与频度副词',
    paragraphs: [
      'Leo is a new member of the volleyball [[team]] at his school. Today is his first practice, and he has a lot of questions for Amy, the team leader. His first question is: Who teaches the team? Mr Zhang does. He is strict but kind.',
      'Next, Leo asks: What do you usually do first? Amy says the players always [[warm up]] for ten minutes in the [[gym]]. This keeps their [[knees]] safe. After that, they practise passing the ball, and they sometimes play short games.',
      "On Saturday, the team has a [[match]] [[against]] Green Hill Middle School. Leo has one more question: Who often [[scores]] for the team? Amy smiles and asks him to [[guess]]. The answer is Amy herself! But she says volleyball is a team sport, and everyone helps. Leo can't wait for Saturday.",
    ],
    translations: [
      [
        '利奥是学校排球队的新队员。',
        '今天是他第一次参加训练，他有很多问题要问队长埃米。',
        '他的第一个问题是：谁给球队上训练课？',
        '张老师。',
        '他很严格，但很和善。',
      ],
      [
        '接着利奥问：你们一般先做什么？',
        '埃米说，队员们总是先在体育馆里热身十分钟。',
        '这样能保护他们的膝盖。',
        '然后他们练习传球，有时还打几场短比赛。',
      ],
      [
        '星期六，球队要和绿山中学进行一场比赛。',
        '利奥还有一个问题：谁经常为球队得分？',
        '埃米笑了，让他猜一猜。',
        '答案就是埃米自己！',
        '不过她说，排球是团队运动，每个人都出力。',
        '利奥盼着星期六快点到来。',
      ],
    ],
    vocabulary: [
      { term: 'team', meaning: '（运动的）队' },
      { term: 'warm up', meaning: '热身，做准备活动' },
      { term: 'gym', meaning: '体育馆；健身房' },
      { term: 'knees', meaning: '膝盖（knee 的复数）' },
      { term: 'match', meaning: '比赛' },
      { term: 'against', meaning: '与……对阵' },
      { term: 'scores', meaning: '得分（score 的三单形式）' },
      { term: 'guess', meaning: '猜测' },
    ],
  },
  intro: [
    { title: 'who 问人，what 问事物', body: '想知道“谁”，用 who；想知道“什么”（东西、事情、想法），用 what。疑问词放在句首，句末用问号。', example: 'Who is your PE teacher? What is in your schoolbag?', pitfall: '回答特殊疑问句不能用 Yes 或 No，要直接说出要问的信息。' },
    { title: 'who / what 作主语', body: '要问的正好是“做动作的人或事物”时，who / what 直接当主语，后面紧跟动词，不加 do / does。一般现在时里，动词按第三人称单数变化。', example: 'Who sings best in your class? What makes you happy?', pitfall: '不说 Who does sing best?；回答常用简略形式：Lily does.' },
    { title: 'who / what 作宾语', body: '要问的是“动作的对象”时，句子顺序是：疑问词 + do / does + 主语 + 动词原形 + 其他。主语是第三人称单数用 does，其他用 do。', example: 'What do they play after class? Who does Ben sit next to?', pitfall: '用了 does，后面的动词就用原形：不说 What does he likes?' },
    { title: '频度副词', body: '表示“多经常”的词，从多到少：always、usually、often、sometimes、seldom、never。它们一般放在实义动词前面、be 动词后面。', example: 'I usually walk to school. My grandma is always busy.', pitfall: 'never 本身就表示否定，句子里不再加 not；sometimes 还可以放在句首或句末。' },
    { title: 'play、go、do 和运动搭配', body: '球类和拔河常用 play；以 -ing 结尾的运动常用 go；各种练习动作、武术和瑜伽常用 do。球类运动前面不加 the。', example: 'play table tennis，go skating，do push-ups', pitfall: '不说 play the football，也不说 play swimming。' },
    { title: '关心受伤的同学', body: '同学运动时受伤了，先问问情况，再提供帮助或建议。', example: 'What\'s wrong? Where does it hurt? Shall I get you some water? Let me tell the teacher.' },
  ],
  questions: [
    sportsQ641('4.1-b01', 'basic', '— ___ is your favourite sports star? — Su Bingtian.', ['What', 'Who', 'Where', 'When'], 1, ['回答的是一个人的名字。', '问人用 who。']),
    sportsQ641('4.1-b02', 'basic', '— ___ do you have for breakfast? — Bread and milk.', ['Who', 'What', 'How', 'Where'], 1, ['回答的是食物，是“东西”。', '问事物用 what。']),
    sportsQ641('4.1-b03', 'basic', 'Which word goes with “go”?', ['basketball', 'swimming', 'sit-ups', 'tennis'], 1, ['go 后面常接 -ing 形式的运动。', 'go swimming；basketball 和 tennis 用 play，sit-ups 用 do。']),
    sportsQ641('4.1-b04', 'basic', 'Which word means “100% of the time”?', ['never', 'sometimes', 'always', 'often'], 2, ['always 表示“总是”，每次都这样。', 'never 是 0%，sometimes 和 often 介于两者之间。']),
    sportsQ641('4.1-b05', 'basic', 'Your friend falls down on the playground. What do you say first?', ['Well done!', 'Are you okay?', 'Here you are.', 'Nice to meet you.'], 1, ['同学摔倒了，先要关心对方。', 'Are you okay? 是问“你还好吗”；其他选项用在别的场合。']),
    sportsQ641('4.1-e01', 'extended', 'Who ___ basketball after school every day?', ['play', 'plays', 'do play', 'does play'], 1, ['who 在这里是主语，后面直接跟动词，不用 do / does。', 'who 作主语时动词按第三人称单数变化：plays。']),
    sportsQ641('4.1-e02', 'extended', 'What ___ your brother usually do at weekends?', ['do', 'does', 'is', 'are'], 1, ['what 在这里是宾语（do 的对象），主语是 your brother。', '主语是第三人称单数，用 does，后面的 do 用原形。']),
    sportsQ641('4.1-e03', 'extended', 'Which sentence is correct?', ['Tom often is late for school.', 'Tom is often late for school.', 'Tom does often late for school.', 'Tom is late often for school.'], 1, ['句子里的动词是 be 动词 is。', '频度副词放在 be 动词后面：is often late。']),
    sportsQ641('4.1-e04', 'extended', "In “Leo's First Practice”, who teaches the volleyball team?", ['Leo', 'Amy', 'Mr Zhang', "Leo's dad"], 2, ['定位第一段：Who teaches the team? Mr Zhang does.', 'Amy 是队长（team leader），Leo 是新队员。']),
    sportsQ641('4.1-e05', 'extended', 'What does the team always do first?', ['They play short games.', 'They warm up in the gym.', 'They practise passing the ball.', 'They have a match.'], 1, ['定位第二段：the players always warm up for ten minutes in the gym.', 'After that 后面才是传球，short games 是 sometimes 才打。']),
    sportsQ641('4.1-e06', 'extended', 'We ___ rock climbing on Saturdays, and we ___ kung fu on Sundays.', ['play; do', 'go; play', 'go; do', 'do; go'], 2, ['rock climbing 是 -ing 形式的运动，用 go。', 'kung fu 是武术，用 do。']),
    sportsQ641('4.1-c01', 'challenge', 'Lucy\'s mum teaches her to swim. Which question asks about “Lucy\'s mum”?', ['Who does teach Lucy to swim?', 'Who teaches Lucy to swim?', "Who do Lucy's mum teach?", 'What teaches Lucy to swim?'], 1, ['要问的是“谁教”，who 是主语。', 'who 作主语不加 does，动词用三单：Who teaches Lucy to swim? 问人不用 what。']),
    sportsQ641('4.1-c02', 'challenge', 'I play ping-pong with my grandpa. Which question asks about “my grandpa”?', ['Who does you play ping-pong with?', 'Who do you play ping-pong with?', 'Who you play ping-pong with?', 'What do you play ping-pong with?'], 1, ['grandpa 是 with 的对象，who 作宾语，要加助动词。', '主语是 you，用 do：Who do you play ping-pong with? 问人不用 what。']),
    sportsQ641('4.1-c03', 'challenge', 'Why does Amy say volleyball is a team sport and everyone helps?', ["She doesn't like scoring.", 'She wants Leo to know every player is important.', 'She thinks Leo is a bad player.', 'She wants to be the coach.'], 1, ['经常得分的正是 Amy 自己，但下一句用 But 转折。', '她想告诉 Leo：得分不只靠一个人，每个队员都很重要。文中没有说她不喜欢得分或觉得 Leo 打得不好。']),
    sportsQ641('4.1-c04', 'challenge', 'Find the mistake: “What does your sister usually does after dinner?”', ['What → Who', 'your sister → your sisters', 'the second “does” → do', 'after → at'], 2, ['句子开头已经有助动词 does。', 'does 后面的实义动词要用原形：What does your sister usually do after dinner?']),
    sportsQ641('4.1-c05', 'challenge', '— Who often goes jogging in your family? — ___', ['Yes, my dad does.', 'My dad does.', 'My dad do.', 'He goes jogging in the park.'], 1, ['特殊疑问句不能用 Yes / No 回答；问的是“谁”，不是“在哪儿”。', 'who 作主语的问句，常用“人 + does”简略回答，my dad 是第三人称单数，用 does。']),
  ],
});
