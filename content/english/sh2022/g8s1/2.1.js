'use strict';

// Unit 2 Digital life：原创讲解与练习，待英语教师审核。
const digitalQuestion = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g8s1/2.1',
  title: 'Digital life — 数字生活 ----- 时间状语从句（二）',
  review: { status: 'pending' },
  reading: {
    title: 'A Map Made by Students',
    topic: '时间状语从句（二）',
    paragraphs: [
      'A new student joined our class in September. He could not find the art room, so our group made a [[digital]] school map. We added photos of the main buildings and a short note for each place. [[Before]] we put anyone in a photo, we asked for that person’s [[permission]].',
      'The first version looked good, but it did not work well on older phones. Some students sent us [[feedback]] about slow pages and tiny words. We reduced the picture sizes and made the text larger. [[After]] we changed the map, we asked three new students to try it without our help. They found the art room quickly.',
      'We wanted to add every corner of the school, but our teacher reminded us to protect [[privacy]]. We left out students’ names and classroom schedules. We will not publish the map [[until]] the school checks it. The project taught us that useful technology needs careful choices as well as clever ideas.',
    ],
    translations: [
      [
        '九月，一名新同学来到我们班。',
        '他找不到美术教室，于是我们小组制作了一张数字校园地图。',
        '我们添加了主要建筑的照片，并给每个地点写了一段简短说明。',
        '在把任何人放进照片前，我们都会征求对方同意。',
      ],
      [
        '第一个版本看起来不错，但在旧手机上运行得不好。',
        '一些同学向我们反馈，页面加载慢，文字也太小。',
        '我们缩小了图片，并把文字调大。',
        '修改地图后，我们请三名新同学在没有帮助的情况下试用。',
        '他们很快就找到了美术教室。',
      ],
      [
        '我们本想加入学校的每个角落，但老师提醒我们要保护隐私。',
        '我们没有放入学生姓名和课程表。',
        '学校检查之前，我们不会发布这张地图。',
        '这个项目让我们明白：有用的技术不仅需要聪明的想法，也需要审慎的选择。',
      ],
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
  bankExamples: [
    { id: 'xdf-6404da0df5ef02a3', point: 'as soon as 的将来时间从句', explain: ['主句说将来要告诉 Jenny，as soon as 从句也指将来。', '原题答案 B：主句 will tell，从句用 comes 表将来，不用 will come。'] },
    { id: 'xdf-bebd63fba73213a4', point: 'not ... until 的时间边界', explain: ['didn’t notice 表示此前一直没有注意到错误。', '原题答案 A：until 后的“又读了一遍”是发现错误的时间界线。'] },
  ],
  questions: [
    digitalQuestion('2.1-b01', 'basic', '___ you post someone else’s photo, ask for permission.', ['Before', 'After', 'Until', 'Although'], 0, ['先征求允许，再发布照片。', 'before 表示发布之前。']),
    digitalQuestion('2.1-b02', 'basic', 'I did not turn on my phone ___ the lesson ended.', ['before', 'until', 'while', 'because'], 1, ['not ... until 表示“直到……才……”。', '句意是下课后才打开手机。']),
    digitalQuestion('2.1-e01', 'extended', 'You need to back up (备份) your files first and update the software second. Which sentence says this correctly?', ['I updated the software before I backed up my files.', 'I backed up my files after I updated the software.', 'I backed up my files before I updated the software.', 'I updated the software until I backed up my files.'], 2, ['确定动作顺序：备份先，更新后。', 'before 后接“更新软件”，主句为“备份文件”。']),
    digitalQuestion('2.1-e02', 'extended', 'Which sentence uses however correctly?', ['The app is useful however it uses much battery.', 'The app is useful. However, it uses much battery.', 'The app is useful however, it uses much battery.', 'The app is useful, however it uses much battery.'], 1, ['however 引出转折，不能直接替代 but 连接两个独立句。', '句号后写 However, ... 结构清楚。']),
    digitalQuestion('2.1-c01', 'challenge', 'Most students use tablets for research, but a few watch videos for too long before bed. Which conclusion (结论) is supported?', ['Tablets are always good for students.', 'All students should stop using tablets.', 'Tablets can support learning, but students need limits on screen time.', 'The survey proves videos cause every sleep problem.'], 2, ['资料里既有学习用途，也有使用时间过长的问题。', '结论应同时回应两面，不能把“多数”“少数”说成“所有”。']),
    digitalQuestion('2.1-c02', 'challenge', 'Which sentence means “I restarted the device only after the update was complete”?', ['I did not restart the device until the update finished.', 'I restarted the device until the update finished.', 'I did not restart the device before the update started.', 'I restarted the device while the update was running.'], 0, ['“才”对应 not ... until。', '时间点是更新完成，不是更新开始或正在更新。']),
    digitalQuestion('2.1-b03', 'basic', 'As soon as the page ___, I will send you the link.', ['opens', 'will open', 'opened', 'opening'], 0, ['谈将来，as soon as 引导的时间从句通常用一般现在时。', 'the page 为单数，选 opens。']),
    digitalQuestion('2.1-b04', 'basic', 'Which phrase has the correct word order?', ['useful anything', 'anything useful', 'usefully anything', 'anything use'], 1, ['形容词修饰 anything 时放在后面。', 'useful 是形容词，所以 anything useful 正确。']),
    digitalQuestion('2.1-b05', 'basic', 'In the article, what does permission mean?', ['speed', 'agreement to do something', 'map', 'cost'], 1, ['文章说给别人拍照前要先征求 permission。', '语境指对方是否同意，即“允许”。']),
    digitalQuestion('2.1-e03', 'extended', 'Why did the group change the first version of its map?', ['It had no pictures.', 'It was slow on older phones, and its words were too small.', 'The school had no art room.', 'It showed every student’s name.'], 1, ['定位第二段收到的反馈。', 'slow pages 和 tiny words 是修改的直接原因。']),
    digitalQuestion('2.1-e04', 'extended', 'Which sentence means the map will be published only after the school checks it?', ['We will publish the map until the school checks it.', 'We will not publish the map until the school checks it.', 'We published the map while the school checks it.', 'We will not publish the map although the school checks it.'], 1, ['“才发布”说明在检查完成前不发布。', 'not ... until 表达这个时间边界。']),
    digitalQuestion('2.1-e05', 'extended', 'What did the group leave out to protect privacy (隐私)?', ['large pictures', 'small text', 'students’ names and classroom schedules', 'the art room'], 2, ['先找到文章第三段 protect privacy。', '紧接着写 left out students’ names and classroom schedules。']),
    digitalQuestion('2.1-e06', 'extended', 'An opinion article says, “The digital map is convenient.” Which sentence adds a sensible other side?', ['However, we still need to protect users’ privacy.', 'Because, the map is convenient.', 'Therefore, all apps are perfect.', 'Until, some users are worried.'], 0, ['另一面应是与便利相对的注意事项。', 'However 放在新句开头并接逗号，后面的隐私问题与主题相关。']),
    digitalQuestion('2.1-c03', 'challenge', 'The group changed the map and then asked new students to try it alone. What did this help them find out?', ['whether pictures made testing unnecessary', 'whether the changes worked for real users', 'whether old phones caused every problem', 'whether a more complex map was better'], 1, ['修改解决了已知问题，但不等于已经好用。', '让新同学独立试用能提供对实际效果的证据。']),
    digitalQuestion('2.1-c04', 'challenge', 'Which rule has the correct order for photos and the map?', ['Post every photo before asking; publish the map until it is checked.', 'Ask before using someone’s photo, and do not publish the map until it is checked.', 'Ask after using someone’s photo, and publish the map before it is checked.', 'Never use photos, even if everyone agrees.'], 1, ['照片要先征得同意，before 表示先后。', '地图检查完成前不发布，用 not ... until。']),
    digitalQuestion('2.1-c05', 'challenge', 'A student says, “More digital technology is always better.” Which response is best supported by the article?', ['Yes. The map helped students, so it had no limits.', 'Not fully. The map was useful, but device problems and privacy still mattered.', 'No. Digital maps can never help anyone.', 'Yes. The map should be published before the school checks it.'], 1, ['文章第二段展示了技术的用途与兼容问题。', '第三段还有隐私和发布审核限制，不能据单一好处推出“越多越好”。']),
  ],
});
