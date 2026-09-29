'use strict';

// Unit 5 Teamwork：主题与语法范围据教材，内容原创。
const teamQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/5.1',
  title: '合作表达与原因状语从句',
  review: { status: 'pending' },
  reading: {
    title: 'One Booth, Four Ideas',
    paragraphs: [
      'Our class planned a booth for the school fair. Four students joined the team, but each wanted a different activity. We lost a whole meeting [[because]] we kept talking about our own ideas. Nobody wrote down what visitors might enjoy or what materials we could afford.',
      'At the next meeting, our leader gave everyone a clear [[role]]. I checked the cost, Jia designed a game, Ling talked to visitors, and Bo made a sign. [[Since]] we had only two days, we tested one simple game first. It failed: the rules were too long. Instead of blaming Jia, we gave specific [[feedback]] and changed the rules together.',
      '[[Now that]] the game was easier, more visitors tried it. We did not win a prize, but we raised enough money for new library books. Our [[teamwork]] improved when we listened, shared tasks and adjusted our plan. A team is not a group that never disagrees; it is a group that can solve a problem together.',
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
  questions: [
    teamQuestion('5.1-b01', 'basic', 'The group finished early ___ everyone did a part of the work.', ['because', 'although', 'before', 'until'], 0, ['“每个人都分担工作”解释了“完成得早”。', 'because 引导原因状语从句。']),
    teamQuestion('5.1-b02', 'basic', '选出 because 后接完整句的一项。', ['We waited because the rain.', 'We waited because it rained.', 'We waited because of it rained.', 'We waited because raining.'], 1, ['because 后接主语加谓语的完整句子。', 'it rained 是完整句；the rain 是名词短语，适合放在 because of 后。']),
    teamQuestion('5.1-e01', 'extended', '哪一句同时说明合作中的具体问题和解决办法？', ['We were a good team.', 'We had different ideas, so we compared the plans and chose one together.', 'Teamwork is important because it is important.', 'Somebody made a mistake, so it was all their fault.'], 1, ['“不同想法”是具体问题。', '比较方案并一起选择，是可执行的解决行动。']),
    teamQuestion('5.1-e02', 'extended', '“因为时间有限，我们把任务分成三部分。”最自然的是：', ['Because time was short, we divided the task into three parts.', 'Although time was short, we divided the task into three parts.', 'Before time was short, we divided the task into three parts.', 'Because of time was short, we divided the task into three parts.'], 0, ['时间有限是分工的原因。', 'because 后接 time was short 这一完整句；because of 后不能直接接句子。']),
    teamQuestion('5.1-c01', 'challenge', '组员 A 迟交图片，组员 B 因此没法排版。哪项建议最能解决问题又尊重队友？', ['Tell A that the whole failure is their fault.', 'Set an earlier shared deadline, tell B the progress, and offer help to A.', 'Wait silently until the final day.', 'Ask B to finish everything alone because A is late.'], 1, ['先识别依赖关系：B 要等图片才能排版。', '提前共享节点、同步进度并提供帮助，能处理问题而非只责备个人。']),
    teamQuestion('5.1-c02', 'challenge', '读句子：Since our rehearsal room was closed, we practised in the library. 此处 since 的意思是：', ['自从，强调一直持续到现在', '因为，说明换地点的原因', '虽然，承认相反条件', '直到，说明结束时间'], 1, ['排练室关闭解释了换到图书馆。', '这里 since 引出原因，不是“自从”的时间关系。']),
  ],
});
