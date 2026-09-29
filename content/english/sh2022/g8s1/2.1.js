'use strict';

// Unit 2 Digital life：原创讲解与练习，待英语教师审核。
const digitalQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/2.1',
  title: '数字生活与时间状语从句（二）',
  review: { status: 'pending' },
  reading: {
    title: 'A Map Made by Students',
    paragraphs: [
      'A new student joined our class in September. He could not find the art room, so our group made a [[digital]] school map. We added photos of the main buildings and a short note for each place. [[Before]] we put anyone in a photo, we asked for that person’s [[permission]].',
      'The first version looked good, but it did not work well on older phones. Some students sent us [[feedback]] about slow pages and tiny words. We reduced the picture sizes and made the text larger. [[After]] we changed the map, we asked three new students to try it without our help. They found the art room quickly.',
      'We wanted to add every corner of the school, but our teacher reminded us to protect [[privacy]]. We left out students’ names and classroom schedules. We will not publish the map [[until]] the school checks it. The project taught us that useful technology needs careful choices as well as clever ideas.',
    ],
    vocabulary: [
      { term: 'digital', meaning: '数字的；数码的' },
      { term: 'Before', meaning: '在……以前' },
      { term: 'permission', meaning: '允许；许可' },
      { term: 'feedback', meaning: '反馈意见' },
      { term: 'After', meaning: '在……以后' },
      { term: 'privacy', meaning: '隐私' },
      { term: 'until', meaning: '直到……为止' },
    ],
  },
  intro: [
    { title: '评价数字生活要看两面', body: '数字产品可以节省时间，也可能带来分心、隐私或使用习惯的问题。表达观点时，不只给结论，还要给具体场景作依据。', example: 'Online maps are helpful when I visit a new place, but I still check the road signs.', pitfall: '“方便”不等于“永远可靠”；观点句后要补理由。' },
    { title: 'before、after 表示先后', body: 'before 表示“在……以前”，after 表示“在……以后”。判断两个动作的发生顺序，再选连接词；从句前置时注意逗号。', example: 'Before I shared the photo, I asked my friend for permission.', pitfall: '不要只根据句子里谁先出现来判断先后，要根据连接词。' },
    { title: 'until 表示持续到某时', body: 'until 说明动作或状态持续到一个时间点。not ... until 则强调“直到……才……”，肯定与否定会改变意思。', example: 'I did not open the message until I finished my homework.', pitfall: '漏掉 not 会把“直到才打开”变成“持续打开到……”。' },
    { title: '观点短文的骨架', body: '先说自己的立场，再给一正一反两方面的例子，最后提出合理做法。用 however 引出转折，用 for example 引出实例。', example: 'A tablet helps me search for facts. However, I put it away during dinner.', pitfall: 'however 是连接副词，不能像 but 那样直接把两个完整句子随意粘在一起。' },
    { title: '未来时间从句与不定代词', body: '谈将来，as soon as、when、before 后的时间从句一般用现在时；anything 等不定代词可以指未指定的事物，修饰语放在它后面。', example: 'As soon as the repair is complete, I will download something useful.', pitfall: '不要写 As soon as the repair will be complete ... 或 useful something。' },
    { title: '合成词帮助猜词义', body: '两个词组合能形成一个新词。先辨认组成部分，再结合语境确认意思；不能只把两个中文译词生硬拼在一起。', example: 'A password manager helps me keep my login details safe.', pitfall: '“password manager”要结合数字生活语境理解为管理密码的工具。' },
  ],
  questions: [
    digitalQuestion('2.1-b01', 'basic', '___ you post someone else’s photo, ask for permission.', ['Before', 'After', 'Until', 'Although'], 0, ['先征求允许，再发布照片。', 'before 表示发布之前。']),
    digitalQuestion('2.1-b02', 'basic', 'I did not turn on my phone ___ the lesson ended.', ['before', 'until', 'while', 'because'], 1, ['not ... until 表示“直到……才……”。', '句意是下课后才打开手机。']),
    digitalQuestion('2.1-e01', 'extended', '选出最符合“先备份，再更新软件”的句子。', ['I updated the software before I backed up my files.', 'I backed up my files after I updated the software.', 'I backed up my files before I updated the software.', 'I updated the software until I backed up my files.'], 2, ['确定动作顺序：备份先，更新后。', 'before 后接“更新软件”，主句为“备份文件”。']),
    digitalQuestion('2.1-e02', 'extended', '选出使用 however 最恰当的一句。', ['The app is useful however it uses much battery.', 'The app is useful. However, it uses much battery.', 'The app is useful however, it uses much battery.', 'The app is useful, however it uses much battery.'], 1, ['however 引出转折，不能直接替代 but 连接两个独立句。', '句号后写 However, ... 结构清楚。']),
    digitalQuestion('2.1-c01', 'challenge', '调查发现：多数同学用平板查资料，少数同学睡前刷视频太久。哪句结论最有依据、也最平衡？', ['Tablets are always good for students.', 'All students should stop using tablets.', 'Tablets can support learning, but students need limits on screen time.', 'The survey proves videos cause every sleep problem.'], 2, ['资料里既有学习用途，也有使用时间过长的问题。', '结论应同时回应两面，不能把“多数”“少数”说成“所有”。']),
    digitalQuestion('2.1-c02', 'challenge', '“更新完成后我才重启设备”最准确的英文是：', ['I did not restart the device until the update finished.', 'I restarted the device until the update finished.', 'I did not restart the device before the update started.', 'I restarted the device while the update was running.'], 0, ['“才”对应 not ... until。', '时间点是更新完成，不是更新开始或正在更新。']),
  ],
});
