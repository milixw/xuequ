'use strict';

// Unit 5 Teamwork：主题与语法范围据教材，内容原创。
const teamQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/5.1',
  title: 'Teamwork — 合作表达 ----- 原因状语从句',
  review: { status: 'pending' },
  reading: {
    title: 'One Booth, Four Ideas',
    topic: '原因状语从句',
    paragraphs: [
      'Our class planned a booth for the school fair. Four students joined the team, but each wanted a different activity. We lost a whole meeting [[because]] we kept talking about our own ideas. Nobody wrote down what visitors might enjoy or what materials we could afford.',
      'At the next meeting, our leader gave everyone a clear [[role]]. I checked the cost, Jia designed a game, Ling talked to visitors, and Bo made a sign. [[Since]] we had only two days, we tested one simple game first. It failed: the rules were too long. Instead of blaming Jia, we gave specific [[feedback]] and changed the rules together.',
      '[[Now that]] the game was easier, more visitors tried it. We did not win a prize, but we raised enough money for new library books. Our [[teamwork]] improved when we listened, shared tasks and adjusted our plan. A team is not a group that never disagrees; it is a group that can solve a problem together.',
    ],
    translations: [
      [
        '我们班计划在学校游园会上设一个摊位。',
        '四名同学加入团队，但每个人都想做不同的活动。',
        '因为我们一直在谈各自的想法，整整一次会议就这样过去了。',
        '没有人记下访客可能喜欢什么，也没人核算我们买得起哪些材料。',
      ],
      [
        '下次开会时，组长给每个人分配了明确的职责。',
        '我核算费用，佳设计游戏，玲与访客交流，博制作标牌。',
        '由于只剩两天，我们先测试了一个简单的游戏。',
        '测试失败了：规则太长。',
        '我们没有责怪佳，而是给出具体反馈，一起修改规则。',
      ],
      [
        '既然游戏更容易玩了，更多访客来尝试。',
        '我们没有获奖，但筹到了足够的钱为图书馆添置新书。',
        '当我们倾听、分工并调整计划时，团队合作变得更好了。',
        '团队不是一个永远没有分歧的群体，而是一个能够共同解决问题的群体。',
      ],
    ],
    vocabulary: [
      { term: 'because', meaning: '因为（强调原因）' },
      { term: 'role', meaning: '角色；职责' },
      { term: 'Since', meaning: '既然；由于（此处表原因）' },
      { term: 'feedback', meaning: '反馈意见' },
      { term: 'Now that', meaning: '既然现在……' },
      { term: 'teamwork', meaning: '团队合作' },
    ],
  },
  intro: [
    { title: '团队合作不只是“大家一起做”', body: '描述合作时要说清目标、分工、沟通和调整。出现分歧时，先描述发生了什么，再说如何解决，不把责任简单推给一个人。', example: 'Our group shared the jobs, and we checked each other’s work before the show.', pitfall: '“我们合作得很好”只是评价；具体的分工和行动才支持评价。' },
    { title: 'because 给出原因', body: 'because 后接完整的原因句。主句说结果，从句回答“为什么”。先判断两句是否真有因果关系。', example: 'The team changed its plan because the first idea took too much time.', pitfall: 'because 后面不能只写一个名词短语；because of 才可以直接接名词短语。' },
    { title: 'since、as 也可说明原因', body: 'since 和 as 可在原因已知或顺带说明时使用，语气通常比 because 弱。它们也可能有别的意思，要结合上下文判断。', example: 'Since everyone was ready, we started the rehearsal.', pitfall: 'since 也能表示“自从”；看到它先辨认句子里的时间还是原因。' },
    { title: '写合作经历', body: '按“任务—困难—行动—结果—收获”组织短文，特别写出团队成员怎样共同改变局面。给建议时说具体做法，不只说“要团结”。', example: 'Two members wanted different posters, so we compared both plans and combined their best ideas.', pitfall: '只列“我们成功了”，却不写遇到什么困难、如何合作，故事就缺少关键过程。' },
    { title: 'now that 说明已发生的新情况', body: 'now that 可解释“既然现在……”，常把大家已知的新情况放在从句里，再说接下来怎么做。与 because 相比，重点往往在主句结果。', example: 'Now that the room is free, we can start our group practice.', pitfall: '不要把 now that 逐词理解成“现在那个”。' },
    { title: '缩写要看上下文', body: '团队沟通里常见首字母缩略语、截短词和缩约形式。正式写作第一次使用不常见缩写时，应写全称，避免读者猜测。', example: 'Our club uses a shared app. The app shows each member’s task.', pitfall: '不要以为所有大写字母组合都能靠字母直接猜出意思。' },
  ],
  bankExamples: [
    { id: 'xdf-cf04a765f5d33bf4', point: 'now that 说明已知原因', explain: ['Tom 对钢琴没有兴趣是当前已知情况，后一句给出不必强迫他的结果。', '原题答案 A：now that 表示“既然”；其他选项改变了句子的逻辑关系。'] },
    { id: 'xdf-9247e8383ff42695', point: 'since 说明原因', explain: ['能打乒乓球的优秀选手很多，是必须挑选参赛者的原因。', '原题答案 B：since 在这里表示“既然/由于”，不是“自从”。原题开头有导入标签，题干以 PDF 为准。'] },
  ],
  questions: [
    teamQuestion('5.1-b01', 'basic', 'The group finished early ___ everyone did a part of the work.', ['because', 'although', 'before', 'until'], 0, ['“每个人都分担工作”解释了“完成得早”。', 'because 引导原因状语从句。']),
    teamQuestion('5.1-b02', 'basic', 'Which sentence correctly puts a full clause after because?', ['We waited because the rain.', 'We waited because it rained.', 'We waited because of it rained.', 'We waited because raining.'], 1, ['because 后接主语加谓语的完整句子。', 'it rained 是完整句；the rain 是名词短语，适合放在 because of 后。']),
    teamQuestion('5.1-e01', 'extended', 'Which sentence gives both a teamwork problem and a way to solve it?', ['We were a good team.', 'We had different ideas, so we compared the plans and chose one together.', 'Teamwork is important because it is important.', 'Somebody made a mistake, so it was all their fault.'], 1, ['“不同想法”是具体问题。', '比较方案并一起选择，是可执行的解决行动。']),
    teamQuestion('5.1-e02', 'extended', 'The team divided its task into three parts because time was short. Which sentence keeps that meaning?', ['Because time was short, we divided the task into three parts.', 'Although time was short, we divided the task into three parts.', 'Before time was short, we divided the task into three parts.', 'Because of time was short, we divided the task into three parts.'], 0, ['时间有限是分工的原因。', 'because 后接 time was short 这一完整句；because of 后不能直接接句子。']),
    teamQuestion('5.1-c01', 'challenge', 'Member A sent pictures late, so member B could not finish the layout (排版). Which suggestion helps both members?', ['Tell A that the whole failure is their fault.', 'Set an earlier shared deadline, tell B the progress, and offer help to A.', 'Wait silently until the final day.', 'Ask B to finish everything alone because A is late.'], 1, ['先识别依赖关系：B 要等图片才能排版。', '提前共享节点、同步进度并提供帮助，能处理问题而非只责备个人。']),
    teamQuestion('5.1-c02', 'challenge', 'In “Since our rehearsal room was closed, we practised in the library,” what does since mean?', ['from that time until now', 'because; it gives the reason for changing rooms', 'although; it shows a contrast', 'until; it gives an ending time'], 1, ['排练室关闭解释了换到图书馆。', '这里 since 引出原因，不是“自从”的时间关系。']),
    teamQuestion('5.1-b03', 'basic', 'We changed the rules ___ visitors could not understand them.', ['because', 'although', 'before', 'unless'], 0, ['访客看不懂规则是修改规则的原因。', 'because 后接完整句子引出这一原因。']),
    teamQuestion('5.1-b04', 'basic', '___ everyone is here, let us begin the meeting.', ['Now that', 'Until', 'Even though', 'Before'], 0, ['所有人都到场是已知的新情况。', 'now that 表示“既然现在……”，引出开始会议的理由。']),
    teamQuestion('5.1-b05', 'basic', 'The outdoor meeting was cancelled ___. Which phrase completes the sentence?', ['because the bad weather', 'because of the bad weather', 'because of it was bad weather', 'because was bad weather'], 1, ['the bad weather 是名词短语，不是完整句子。', 'because of 后可以接名词短语。']),
    teamQuestion('5.1-e03', 'extended', 'Why did the first meeting make little progress in “One Booth, Four Ideas”?', ['No one wanted to join the team.', 'Members discussed only their own ideas and did not note visitors’ needs or costs.', 'The game rules were already simple.', 'The library refused new books.'], 1, ['第一段说大家一直在谈各自想法。', '无人记录访客可能喜欢什么以及能负担哪些材料。']),
    teamQuestion('5.1-e04', 'extended', 'Which sentence clearly gives the long rules as the reason visitors found the game hard?', ['Because the rules were long, visitors found the game hard to play.', 'Although the rules were long, visitors found the game hard to play.', 'Before the rules were long, visitors found the game hard to play.', 'Until the rules were long, visitors found the game hard to play.'], 0, ['规则太长会使访客难以玩游戏，是合理原因。', 'because 前置从句加逗号后接结果。']),
    teamQuestion('5.1-e05', 'extended', 'How did the team respond when Jia’s game rules were too long?', ['They made Jia take all the blame.', 'They gave up the booth.', 'They gave specific feedback and changed the rules together.', 'They stopped testing.'], 2, ['定位第二段最后一句。', '小组没有责怪佳，而是给具体反馈、一起修改。']),
    teamQuestion('5.1-e06', 'extended', 'In “Since we had only two days, we tested one game first,” what does since mean?', ['from a time in the past', 'because', 'although', 'until'], 1, ['“只有两天”解释为何先测试一个游戏。', '这里 since 表原因，不表起点时间。']),
    teamQuestion('5.1-c03', 'challenge', 'Which sentence correctly explains why more visitors tried the game after the rules changed?', ['Because the rules became easier, more visitors tried the game.', 'Although more visitors tried the game, the rules became easier before testing.', 'Visitors tried the game, so the old rules must have been perfect.', 'The group won a prize because the rules changed.'], 0, ['修改使规则更容易理解，随后更多访客尝试。', '文章没有说获奖，不能额外补出结果。']),
    teamQuestion('5.1-c04', 'challenge', 'Which outline (提纲) best follows “problem—action—result” in a teamwork story?', ['We were a great team, so everything was fine.', 'Four members had different ideas; they shared tasks and tested a game; more visitors joined after the rules changed.', 'We liked the school fair.', 'Jia had one idea, and no one else did anything.'], 1, ['先找具体分歧，再找可观察的团队行动。', '最后用访客数量的变化呈现结果，形成完整链条。']),
    teamQuestion('5.1-c05', 'challenge', '“We did not win a prize, so our teamwork failed.” Which reply is best supported by the article?', ['Yes. Only a prize can show success.', 'Not really. The team shared tasks, solved a problem and raised money for library books.', 'Yes. The team never solved the rules problem.', 'No, because the article says they did win a prize.'], 1, ['奖项不是文章唯一的评价标准。', '分工、修改规则与筹款成果都支持“合作有收获”。']),
  ],
});
