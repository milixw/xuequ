'use strict';

// 六上 Unit 2 Family ties：主题、语法（现在进行时、人称代词）和功能范围据课本目录与 Grammar file，短文、知识卡和练习均为原创。
const familyQ621 = (id, level, stem, options, answer, explain) =>
  ({ id, level, type: 'choice', stem, options, answer, explain });

Content.section({
  id: 'english/sh2022/g6s1/2.1',
  title: 'Family ties — 家庭纽带 ----- 现在进行时',
  review: { status: 'pending' },
  reading: {
    title: "Sunday at Grandma's",
    topic: '现在进行时',
    paragraphs: [
      "It is Sunday afternoon, and all the [[members]] of my family are at Grandma's flat. I am writing this short note in her living room. Everyone is busy, and the room is full of happy noise.",
      'Grandpa is sitting on the [[sofa]]. He is playing [[chess]] with my uncle, and he is winning again! My aunt is in the kitchen. She is [[teaching]] my cousin how to make dumplings. My [[elder]] sister, Lina, has long dark hair and a round face. She is playing the [[guitar]] by the window.',
      'What about my parents? Dad is washing the [[dishes]], and Mum is putting new photos into the family album. We do not meet like this every day, so we enjoy every minute [[together]]. For me, a family is a place full of love and [[fun]].',
    ],
    translations: [
      [
        '现在是星期天下午，我们家所有人都在奶奶的公寓里。',
        '我正在她的客厅里写这篇小短文。',
        '每个人都很忙，屋子里满是欢乐的声音。',
      ],
      [
        '爷爷坐在沙发上。',
        '他正在和我叔叔下国际象棋，而且他又要赢了！',
        '我婶婶在厨房里。',
        '她正在教我堂弟怎么包饺子。',
        '我姐姐莉娜留着乌黑的长发，脸圆圆的。',
        '她正在窗边弹吉他。',
      ],
      [
        '我爸爸妈妈呢？',
        '爸爸正在洗碗，妈妈正在把新照片放进家庭相册。',
        '我们并不是每天都这样聚在一起，所以我们珍惜在一起的每一分钟。',
        '对我来说，家是一个充满爱和欢乐的地方。',
      ],
    ],
    vocabulary: [
      { term: 'members', meaning: '成员（member 的复数）' },
      { term: 'sofa', meaning: '长沙发' },
      { term: 'chess', meaning: '国际象棋' },
      { term: 'teaching', meaning: '教（teach 的 -ing 形式）' },
      { term: 'elder', meaning: '年长的' },
      { term: 'guitar', meaning: '吉他' },
      { term: 'dishes', meaning: '碗碟（dish 的复数）' },
      { term: 'together', meaning: '在一起' },
      { term: 'fun', meaning: '乐趣' },
    ],
  },
  intro: [
    { title: '现在进行时：说正在发生的事', body: '说话的这一刻正在做的事，或者这段时间正在做的事，用现在进行时：am / is / are + 动词 -ing。它常和 now、Look!、Listen! 一起出现。', example: 'Look! The baby is sleeping.', pitfall: '不能漏掉 be 动词：不说 He playing football.' },
    { title: '动词 -ing 的写法', body: '多数动词直接加 -ing；以不发音的 e 结尾，去 e 再加 -ing；有些以“一个元音字母 + 一个辅音字母”结尾的短词，要双写最后的辅音字母再加 -ing。', example: 'read → reading，write → writing，swim → swimming', pitfall: 'see、play、open 直接加 -ing，不是所有辅音结尾的词都要双写。' },
    { title: '一般现在时还是现在进行时？', body: '经常、每天做的事用一般现在时；说话时正在做的事用现在进行时。先找时间词：every day、usually 指习惯，now、look 指此刻。', example: 'My dad usually drives to work, but today he is taking the bus.', pitfall: 'like、love、know、want 这类表示喜好、知道、想要的词，一般不用进行时。' },
    { title: '人称代词：主格和宾格', body: '代词在句首做主语时用主格 I、he、she、we、they；放在动词或介词后面时用宾格 me、him、her、us、them。you 和 it 两种形式一样。', example: 'Aunt Lin is very kind. I like her very much.', pitfall: '不说 Me like her.，句首做主语要用 I。' },
    { title: '描述家人的样子和动作', body: '说长相用 has：has big eyes、has short hair；说正在做什么用 is + 动词 -ing。两样合在一起，别人就能“看见”你说的人。', example: 'My aunt has curly hair. She is reading a magazine.', pitfall: '外貌不说 She is big eyes.，要说 She has big eyes.' },
    { title: '让对话继续下去', body: '朋友给你介绍家人或照片时，不要只说 OK。可以先给一句评价，再追问一个问题，对话就能接着聊下去。', example: "— This is my cousin's dog. — It's so cute! What's its name?" },
  ],
  questions: [
    familyQ621('2.1-b01', 'basic', 'Look! The twins ___ in the garden.', ['play', 'plays', 'are playing', 'is playing'], 2, ['Look! 提示动作此刻正在发生，用现在进行时。', '主语 the twins 是复数，be 动词用 are：are playing。']),
    familyQ621('2.1-b02', 'basic', 'What is the -ing form of “come”?', ['comeing', 'coming', 'comming', 'comes'], 1, ['come 以不发音的 e 结尾。', '去掉 e 再加 -ing：coming。']),
    familyQ621('2.1-b03', 'basic', 'My mother is a nurse. ___ works in a hospital.', ['He', 'She', 'Her', 'It'], 1, ['代替 my mother 做主语，要用女性的主格代词。', 'She 是主格；Her 是宾格，不能放在句首做主语。']),
    familyQ621('2.1-b04', 'basic', "Your mum's sister is your ___.", ['uncle', 'aunt', 'cousin', 'grandma'], 1, ['妈妈的姐妹是女性长辈。', '英语里姑姑、姨妈都叫 aunt；uncle 是男性长辈，cousin 是同辈，grandma 是祖辈。']),
    familyQ621('2.1-b05', 'basic', 'Which sentence describes what a person looks like?', ['He is reading a book.', 'He has short hair and big eyes.', 'He likes chess.', 'He is at home.'], 1, ['“看起来什么样”说的是外貌。', '外貌用 has + 特征；A 是动作，C 是喜好，D 是位置。']),
    familyQ621('2.1-e01', 'extended', 'Listen! Somebody ___ the piano upstairs.', ['plays', 'is playing', 'are playing', 'play'], 1, ['Listen! 提示说话时正在发生。', 'somebody 当作单数，用 is playing。']),
    familyQ621('2.1-e02', 'extended', 'Grandma ___ tea every morning, but now she ___ coffee.', ['drinks; is drinking', 'is drinking; drinks', 'drink; drinking', 'drinks; drinks'], 0, ['every morning 是习惯，用一般现在时 drinks。', 'now 是此刻，用现在进行时 is drinking。']),
    familyQ621('2.1-e03', 'extended', 'Our teacher often helps ___ with English.', ['we', 'our', 'us', 'ours'], 2, ['空格在动词 helps 后面，做宾语。', '宾语用宾格：we → us。']),
    familyQ621('2.1-e04', 'extended', 'Which -ing form is spelled correctly?', ['stoping', 'stopping', 'stopeing', 'stopying'], 1, ['stop 以“一个元音字母 o + 一个辅音字母 p”结尾。', '双写 p 再加 -ing：stopping。']),
    familyQ621('2.1-e05', 'extended', "In “Sunday at Grandma's”, what is the aunt doing?", ['She is playing chess.', 'She is teaching the cousin to make dumplings.', 'She is washing the dishes.', 'She is playing the guitar.'], 1, ['定位第二段：My aunt is in the kitchen. She is teaching my cousin how to make dumplings.', '下棋的是爷爷和叔叔，洗碗的是爸爸，弹吉他的是姐姐。']),
    familyQ621('2.1-e06', 'extended', '— This is my grandpa. He is ninety this year. — ___', ['OK.', 'Wow, he looks so healthy! Does he live with you?', 'I am ninety.', 'Goodbye.'], 1, ['想让对话继续，先给一句评价，再追问一个问题。', 'B 既回应了“九十岁”，又提出新问题；A、D 会让对话停下来，C 答非所问。']),
    familyQ621('2.1-c01', 'challenge', 'Find the mistake: “Be quiet! The baby sleeping in the next room.”', ['Be → Is', 'sleeping → is sleeping', 'in → on', 'next → near'], 1, ['Be quiet! 说明婴儿此刻正在睡觉，要用现在进行时。', '现在进行时不能缺 be 动词：the baby is sleeping。']),
    familyQ621('2.1-c02', 'challenge', 'Which sentence is NOT correct?', ['I am knowing the answer now.', 'I know the answer now.', 'She is cooking now.', 'They are watching TV.'], 0, ['know 表示“知道”，是一种状态，不是动作。', '这类词一般不用进行时，所以 A 错，应说 I know the answer now.']),
    familyQ621('2.1-c03', 'challenge', "Why does the writer enjoy every minute at Grandma's?", ['Because the family does not meet like this every day.', 'Because Grandpa always wins at chess.', 'Because the writer likes dumplings.', 'Because the album is new.'], 0, ['定位第三段：We do not meet like this every day, so we enjoy every minute together.', 'so 前面的部分就是原因；其他选项文中没有作为原因提出。']),
    familyQ621('2.1-c04', 'challenge', 'Lily is calling her friend. Which question asks about an action happening now?', ['What do you do on Sundays?', 'What are you doing now?', 'What did you do yesterday?', 'What do you usually eat?'], 1, ['问此刻正在做的事，用现在进行时的特殊疑问句。', 'What are you doing now? 中有 are + doing 和 now；其他问习惯或过去。']),
    familyQ621('2.1-c05', 'challenge', 'My uncle and aunt live in Beijing. I often write to ___, and ___ always write back.', ['they; them', 'them; they', 'their; them', 'them; their'], 1, ['第一空在介词 to 后面，做宾语，用宾格 them。', '第二空在动词 write back 前面，做主语，用主格 they。']),
  ],
});
