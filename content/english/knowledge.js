'use strict';

// 英语错题的主要知识点。PDF 提取和自动归类均待人工核对；不修改原题。
(function (root) {
  const points = [
    { id: 'connectors', title: '连词与状语从句', intro: '先判断两个分句是时间、条件、原因、让步，还是目的与结果关系，再选连接词。时间和条件从句说将来时，通常用一般现在时。', example: 'If it rains tomorrow, we will stay at home. 这里 if 引出条件。', review: { status: 'pending' } },
    { id: 'pronouns', title: '代词与限定词', intro: '先看谈论的是几个人或几件物品，以及范围是否确定，再区分 another、the other、others、either、neither 等词。', example: 'I have two bags. One is blue; the other is green. 两个中的另一个用 the other。', review: { status: 'pending' } },
    { id: 'quantity', title: '数词、分数与主谓一致', intro: '数字、分数和百分数题要看修饰的名词；谓语单复数也要看真正的主语。the number of 表示“……的数量”，a number of 表示“许多”。', example: 'The number of visitors is growing. A number of visitors are waiting. 两句的谓语不同。', review: { status: 'pending' } },
    { id: 'nonfinite', title: '非谓语动词', intro: '一个句子已有谓语时，另一个动词常需用 to do、doing 或 done。先找谓语，再看固定搭配、主动被动及动作发生的先后。', example: 'She enjoys reading, but plans to write. enjoy 后接 doing，plan 后接 to do。', review: { status: 'pending' } },
    { id: 'tense', title: '动词时态与被动语态', intro: '先找 yesterday、since、when 等时间线索，再判断动作是否完成、正在发生；主语承受动作时考虑被动语态。', example: 'The window was cleaned yesterday. 窗户承受“擦洗”这个动作。', review: { status: 'pending' } },
    { id: 'comparison', title: '形容词、副词与比较', intro: '看被修饰的是名词、动词还是整个句子，再选词性；有 than 常考虑比较级，表示范围内“最……”时考虑最高级。', example: 'She speaks clearly; her brother speaks more clearly. 修饰 speaks 要用副词。', review: { status: 'pending' } },
    { id: 'prepositions', title: '介词与固定搭配', intro: '介词不能只靠中文直译，要连同前面的动词、形容词或名词一起记。遇到相近短语时，把整个短语放回句子验证意思。', example: 'We listen to music and look at pictures. 两个动词后面的介词不同。', review: { status: 'pending' } },
    { id: 'vocabulary', title: '词义与词形辨析', intro: '先确定句子需要名词、动词、形容词还是副词，再根据上下文比较选项的意义。相似拼写不代表相同词性或用法。', example: 'The plan was a success, and the team worked successfully. 同一词根可以有不同词性。', review: { status: 'pending' } },
    { id: 'phonetics', title: '语音与拼读', intro: '辨音题要听或读划线部分的实际发音，不能只凭字母是否相同判断。尤其留意同一字母在不同单词中的发音。', example: '先读完整单词，再比较划线部分的元音或辅音。', review: { status: 'pending' } },
    { id: 'reading', title: '阅读理解', intro: '先看问题，再回文章定位证据。细节题找对应句，主旨标题题看全文共同话题，推断题要有文中依据，不能只凭常识猜。', example: '问 best title 时，不选只概括某一段的小标题。', review: { status: 'pending' } },
    { id: 'cloze', title: '完形填空', intro: '先通读全文弄清人物、事件和语气，再逐空判断词义与语法。做完后把答案放回原文，检查上下文是否连贯。', example: '前文讲一个问题、后文讲解决办法时，连接词应体现这种关系。', review: { status: 'pending' } },
    { id: 'context-fill', title: '选词填空与语境填空', intro: '先通读段落，再给备选词标词性。每空同时检查句意、固定搭配、时态和单复数，最后通读一遍。', example: '空格前若有冠词，常需名词或被形容词修饰的名词。', review: { status: 'pending' } },
    { id: 'dialogue', title: '对话补全', intro: '看清前一句是在提问、建议、解释还是转折，再选能自然接上的回应。注意代词指代和对话语气。', example: '对方提出建议后，下一句可能先回应，再补充理由。', review: { status: 'pending' } },
    { id: 'writing', title: '翻译与书面表达', intro: '先确定主语、谓语和时态，再补充状语与固定表达。写完检查词序、单复数和拼写。', example: 'If we listen carefully, we can work together more smoothly. 条件从句用一般现在时，副词修饰动词。', review: { status: 'pending' } },
    { id: 'mixed', title: '综合语法与词汇（待细分）', intro: '这组题的主要考点仅凭 PDF 提取文本暂不能可靠判定。做题时先找题干关键词与选项差异，再对照原 PDF 核实题意。', example: '先判断选项差在词义、词性、搭配还是句子结构，不急于选答案。', review: { status: 'pending' } },
  ];

  // 每个知识点给出可执行的判断步骤和带错因的反例；内容待教师审核。
  const lessons = {
    connectors: {
      steps: ['先划出两个分句：是“同时发生”“先后发生”，还是原因、条件、让步、目的、结果？先定关系，再看选项。', '区分 when 与 while：while 常接持续性动作作背景；when 可引出某一时刻发生的事。not ... until 表示“直到……才”。', '时间、条件从句谈将来时，从句通常用一般现在时，主句可用将来时；再检查前后两个分句的主语和语态。'],
      commonErrors: ['误：If it will snow tomorrow, we will stay inside. → 改：If it snows tomorrow, ...。if 引导的条件从句用一般现在时表将来。', '误：Although it was late, but we continued. → 改：去掉 but。although 已经表达“虽然”，同一句中一般不再用 but 与之配对。', '误：看到两个过去动作就一律选 while。→ 改：先看持续动作与瞬间动作；“正在……这时……”通常用 when 引出突然发生的事。'],
    },
    pronouns: {
      steps: ['先找代词所替代的人或物，确定是两者还是多者、特指还是泛指、单数还是复数。', '两个中的“另一个”常用 the other；不限定范围的“再一个”用 another；others 代替复数名词，不能直接再接名词。', '再看句中位置：作主语、宾语、定语还是所有格？例如“别人的”要表达所有关系，而不仅是“别人”。'],
      commonErrors: ['误：I have two pens. One is red; another is blue. → 改：the other。范围已限定为两支，指剩下那一支。', '误：Some students stayed; other left. → 改：others left。other 作限定词后通常要接名词；others 可单独代指复数的人或物。', '误：只看到 someone 就选不定代词题。→ 改：先比较空格和选项；题目也可能真正考时间连词，不能被一句中的无关词带偏。'],
    },
    quantity: {
      steps: ['大数每三位分一组读：千位组、百万位组分别读完，再接 thousand、million 等单位。', '分数或百分数作主语时，先找到 of 后真正表示数量的名词；可数复数通常配复数谓语，不可数名词通常配单数谓语。', 'the number of ... 的中心词是 number，通常用单数谓语；a number of ... 意为“许多”，通常用复数谓语。'],
      commonErrors: ['误：The number of books are rising. → 改：is rising。主语核心是单数的 number。', '误：A number of children is waiting. → 改：are waiting。这里 a number of 表示“许多”，后接复数名词。', '误：读六位数时把每一位数字单独念。→ 改：从右边每三位分组，先读“多少 thousand”，再读末组三位。'],
    },
    nonfinite: {
      steps: ['先找谓语动词：一个简单句通常不能再直接放第二个谓语；若有连词引出另一个分句，则重新判断。', '看前面的词决定形式：enjoy、avoid、介词后常接 doing；plan、decide、want 后常接 to do。to 有时是介词，如 look forward to，后面应接 doing。', '再看逻辑主语和动作关系：主动常用 doing，表示被动或已完成常用 done；目的常用 to do。不要只看词尾选答案。'],
      commonErrors: ['误：I look forward to meet you. → 改：meeting。这里的 to 是介词，后接动名词。', '误：She decided going early. → 改：to go。decide 后常接不定式。', '误：看到句中两个动词就都改成非谓语。→ 改：先判断它们是否分属两个由连词连接的分句，每个分句都可以有自己的谓语。'],
    },
    tense: {
      steps: ['画出时间线：明确的过去时间通常用一般过去时；从过去持续到现在的情况常考虑现在完成时。', '再判断主语是动作发出者还是承受者；被动语态的骨架是 be + 过去分词，be 随时态和主语变化。', '最后核对时间状语与动词形式是否一致；since、for、in the past few years 等需结合语境，不是机械套题。'],
      commonErrors: ['误：I have visited the park yesterday. → 改：I visited ... yesterday。yesterday 指已结束的过去时间，通常用一般过去时。', '误：The door opened by the worker yesterday. → 改：was opened。被动句不能只放过去分词，需有对应时态的 be。', '误：看到 since 就一律用过去式。→ 改：先看动作是否从过去延续到现在，再决定是否用现在完成时。'],
    },
    comparison: {
      steps: ['先问“修饰谁”：修饰名词多用形容词；修饰动作多用副词。再看空格是否位于 be、感官系动词之后。', '比较两者通常用比较级；三者及以上范围内说“最……”通常用最高级。as ... as 中间用形容词或副词原级。', '若考感叹句，先看感叹部分的中心词：名词短语常用 What，形容词或副词常用 How。'],
      commonErrors: ['误：She spoke clear. → 改：clearly。修饰 spoke 这个动作要用副词。', '误：He runs as faster as his friend. → 改：as fast as。as ... as 中间用原级。', '误：What beautiful the day is! → 改：How beautiful the day is!。beautiful 是形容词，不是名词短语。'],
    },
    prepositions: {
      steps: ['先看空格前后的完整词组，不要单独翻译介词；例如动词 + 介词、形容词 + 介词往往一起决定意思。', '分清词性：result in 是动词短语，后接结果；because of / due to 是介词短语，不能直接当作句子的谓语。', '把候选搭配放回整句，检查语法位置和因果方向；固定搭配也要符合上下文。'],
      commonErrors: ['误：The delay resulted from a missed train 表示“导致误车”。→ 改：result from 是“由……引起”，result in 才是“导致……”，方向相反。', '误：The problem due to poor planning. → 改：The problem is due to ...。due to 不是谓语动词，句子需要 is。', '误：把汉语“向某人道歉”逐字译成 apologize for somebody。→ 改：apologize to somebody；表示“因某事道歉”才接 for something。'],
    },
    vocabulary: {
      steps: ['先看题目问的是词义、近义短语还是词形；圈出目标词所在句和前后一句。', '用语境预测大意，再比较选项的词性、搭配和感情色彩；同一个单词在不同语境下可能不止一个意思。', '代入候选项重读整句，排除只在字典里相近、放进句中却不通顺的选项。'],
      commonErrors: ['误：见到 release 就只按熟悉的一个中文义选。→ 改：结合句中的动作对象判断具体含义。', '误：把 give in、give off、give away 当成同义。→ 改：分别核对它们的动作方向和宾语，短语动词不能只看 give。', '误：词性不合也因中文意思接近而选它。→ 改：先确认空格需要名词、动词、形容词还是副词。'],
    },
    phonetics: {
      steps: ['先确认原题究竟画线了哪一部分。PDF 机器提取可能丢掉下划线，缺失时必须回原 PDF 核对，不能凭当前纯文本判分。', '读整个单词或查音标，再只比较画线部分的音素；拼写相同不保证发音相同。', '留意词尾 -ed、-s、字母组合和重音带来的发音差异；读音判断以实际发音为准。'],
      commonErrors: ['误：四个单词都有字母 o，就认定画线部分同音。→ 改：逐个读音或查音标，再比较对应音素。', '误：画线已在导入文本中丢失，仍根据整词猜答案。→ 改：先查原 PDF 确认画线位置；信息不足时标为待核对。', '误：把字母名称当成字母在单词中的读音。→ 改：比较词内实际的元音或辅音，而非字母表读法。'],
    },
    reading: {
      steps: ['先读题干并标出人名、时间、地点或关键词，再回文章找对应信息；不要先凭选项猜。', '细节题找证据句，并留意同义改写；推断题必须有文本依据，不能把自己的常识当作作者观点。', '主旨题看全文反复出现的中心；指代题回到代词前后，检查单复数和语义是否吻合。'],
      commonErrors: ['误：某选项符合常识就选，却找不到原文依据。→ 改：标出支撑答案的具体句子。', '误：标题题选了只概括最后一段的选项。→ 改：比较每一段共同围绕的主题。', '误：看到 they 就直接指向最近的复数名词。→ 改：把候选名词代回句子，检查上下文意思是否连贯。'],
    },
    cloze: {
      steps: ['第一遍不选答案，先读懂人物、事件、态度和文章主线，遇到不认识的词先暂时跳过。', '第二遍逐空判定考点：词义、词性、固定搭配、句间逻辑或指代；同时看空格前后至少一句。', '第三遍把答案全部放回文章通读，检查时态、人称、逻辑和语气是否前后一致。'],
      commonErrors: ['误：只读空格所在一句就选连接词。→ 改：至少读前后句，判断是转折、递进还是因果。', '误：某选项语法上可填就立即确定。→ 改：完形还要看全文语义和文章主线。', '误：做完不通读，导致同一人物的人称或时态前后矛盾。→ 改：最后完整复读一次。'],
    },
    'context-fill': {
      steps: ['先通读全文并给备选词标词性；看清题目要求是否允许变形、是否每词限用一次。', '对每个空先预测需要哪种词性，再用句意和搭配缩小范围；必要时检查时态、单复数、比较级。', '最后把剩余词和所有已填词一起核对，通读全文看指代和逻辑是否连贯。'],
      commonErrors: ['误：只因词义合适就把原形直接填入。→ 改：检查句中需要第三人称单数、过去式、复数或其他词形。', '误：看到冠词就一定填名词。→ 改：冠词后也可能先有形容词，再接名词，要看整个名词短语。', '误：没看是否“每词限用一次”就重复使用同一选项。→ 改：先核对题目说明，再检查剩余选项。'],
    },
    dialogue: {
      steps: ['先确定空格前后的交际意图：提问、回应、建议、解释、转折还是道别。', '若是句子还原，也要看段落衔接词和代词指代，不一定是两个人对话；把候选句放回上下文连读。', '最后检查人称、时态及语气是否自然，避免只看语法正确而忽略答非所问。'],
      commonErrors: ['误：上句问“为什么”，下句只给一句“是的”。→ 改：回应要提供原因或解释。', '误：选项里的 this、they 找不到前文所指对象。→ 改：回前文确认代词指代。', '误：仅因句子语法正确就选，忽略前后话题已转移。→ 改：连读空格前后两句检查话题衔接。'],
    },
    writing: {
      steps: ['把中文要求拆成“谁做什么”和条件、时间等信息，先写出主语与谓语，再确定句型。', '在草稿中确定全文人称和时态；有条件关系时，注意主句与从句的时态配合。', '写完逐项检查：信息是否遗漏、词序与搭配是否自然、名词单复数和拼写是否正确。'],
      commonErrors: ['误：按中文语序逐字拼英文，导致状语位置和固定搭配不自然。→ 改：先建立英文句子主干，再补充修饰语。', '误：前半句用 we，后半句突然改成 they。→ 改：全文保持人称和指代一致。', '误：中文有“如果”就把 if 从句写成 will do。→ 改：表示将来条件时，从句通常用一般现在时。'],
    },
    mixed: {
      steps: ['本组是自动规则暂未可靠细分的题，不代表有一个统一的“综合语法”考点；先自行判断每题真正考什么。', '比较选项究竟差在词义、词性、搭配、时态还是句子结构，再用句子证据逐个排除。', '若题干、画线或答案在 PDF 提取中缺失，不要强行判分；回原卷核对后再归入更具体知识点。'],
      commonErrors: ['误：把“待细分”当作正式知识点，只背一套万能规则。→ 改：逐题识别真实考点。', '误：看到空格附近有介词就断定是介词题。→ 改：结合选项差异和完整句意。', '误：题干缺字或参考答案存疑仍照单计分。→ 改：先核对原 PDF，不把不可靠数据计入掌握率。'],
    },
  };
  for (const point of points) {
    point.steps = lessons[point.id].steps;
    point.commonErrors = lessons[point.id].commonErrors;
  }

  // 依据用户提供的上海初中英语梳理资料整理的复习清单，不等同于官方逐词必背表。
  const connectors = points.find(point => point.id === 'connectors');
  connectors.conjunctionNote = '上海市教育考试院的评价指南将连词分为并列、从属两类；下面把所提供英语资料中的常用词和结构展开为复习清单。不同教材的学习进度可能不同，标“了解”的项目先会认读即可。';
  connectors.conjunctionGroups = [
    { title: '并列连词：连接同等地位的词、短语或句子', items: [
      ['and', '和；并列、递进', 'I packed my bag, and my brother checked the tickets.'],
      ['but', '但是；转折', 'I wanted to go out, but it was raining.'],
      ['or', '或者；否则', 'Would you like tea or juice? / Hurry up, or we will miss the bus.'],
      ['so', '所以；结果', 'The library was closed, so we went home.'],
      ['for', '因为；补充解释（了解，偏书面）', 'I went to bed early, for I was tired.'],
    ] },
    { title: '成对连接结构：留意谓语和主语的搭配', items: [
      ['both ... and ...', '两者都；连接两个主语时谓语用复数', 'Both Lily and Sam enjoy reading.'],
      ['either ... or ...', '或者……或者……；就近一致', 'Either my parents or my brother is coming.'],
      ['neither ... nor ...', '既不……也不……；就近一致', 'Neither my brother nor my parents are at home.'],
      ['not only ... but also ...', '不仅……而且……；连接主语时通常就近一致', 'Not only the teacher but also the students are excited.'],
      ['as well as', '除……之外还；连接结构，谓语通常随前面的主语', 'Mia, as well as her friends, likes the song.'],
    ] },
    { title: '时间从句：回答“什么时候”', items: [
      ['when', '当……时；可接某一时刻或一段时间', 'When the bell rang, the students stood up.'],
      ['while', '当……期间；常突出持续动作', 'While I was cooking, Dad set the table.'],
      ['as', '随着；两个动作同时发展', 'As the sun rose, the street became brighter.'],
      ['before', '在……之前', 'Wash your hands before you eat.'],
      ['after', '在……之后', 'We played outside after the rain stopped.'],
      ['until / till', '直到……；not ... until 表“直到……才”', 'We waited until the shop opened. / I did not leave until noon.'],
      ['as soon as', '一……就……', 'I will tell you as soon as I know.'],
      ['since', '自从；主句常与现在完成时连用', 'She has lived here since she was six.'],
      ['once', '一旦；一……就……', 'Once you understand the rule, try another example.'],
    ] },
    { title: '条件从句：回答“在什么条件下”', items: [
      ['if', '如果；引出条件', 'If the weather is fine, we will ride bikes.'],
      ['unless', '除非；相当于 if ... not', 'Unless you hurry, you will miss the train.'],
      ['as long as', '只要；强调条件满足即可', 'You can borrow the book as long as you return it on time.'],
      ['in case', '以防；事先做准备（了解）', 'Take some water in case you get thirsty.'],
    ] },
    { title: '原因从句：回答“为什么”', items: [
      ['because', '因为；直接说明原因，可回答 why', 'We stayed indoors because the wind was strong.'],
      ['since', '既然；原因通常已知', 'Since everyone is ready, let us begin.'],
      ['as', '由于；常交代背景原因', 'As it was getting dark, we turned back.'],
    ] },
    { title: '让步从句：有阻碍，结果仍发生', items: [
      ['although', '虽然；不能再与 but 配对', 'Although the hill was steep, we reached the top.'],
      ['though', '虽然；语气较灵活', 'Though she was nervous, she gave the talk.'],
      ['even though', '即使；强调事实上的反差', 'Even though he was ill, he finished the project.'],
      ['even if', '即使；常表示假设情况', 'Even if it rains, the match will continue.'],
      ['no matter what', '无论什么；后接从句', 'No matter what happens, we will stay together.'],
      ['no matter how', '无论怎样；后接形容词或副词等', 'No matter how hard the task is, we will try.'],
    ] },
    { title: '目的与结果：分清“为了”还是“以致”', items: [
      ['so that', '为了；目的从句常带 can / could', 'I wrote it down so that I could remember it.'],
      ['in order that', '为了；较正式（了解）', 'He spoke slowly in order that everyone could follow.'],
      ['so ... that ...', '如此……以至于；so 后接形容词或副词', 'The box was so heavy that I could not lift it.'],
      ['such ... that ...', '如此……以至于；such 后接名词短语', 'It was such a clear night that we could see the stars.'],
    ] },
    { title: '比较与地点：说明程度或位置', items: [
      ['than', '比；常跟比较级', 'This path is shorter than that one.'],
      ['as ... as ...', '和……一样；中间用原级', 'Nora sings as well as her sister.'],
      ['not so/as ... as ...', '不如……；中间用原级', 'This task is not as difficult as the last one.'],
      ['where', '在……的地方', 'Sit where you can see the screen.'],
      ['wherever', '无论在哪里', 'You can read wherever you feel comfortable.'],
    ] },
    { title: '宾语从句的连接词：引出“知道、认为、询问”的内容', items: [
      ['that', '引出陈述内容，口语中有时可省略', 'I think that the answer is correct.'],
      ['whether', '是否；可用于 whether ... or not', 'I do not know whether the museum is open.'],
      ['if', '是否；用于部分宾语从句，与条件 if 区分', 'Please tell me if the museum is open.'],
    ] },
  ];
  connectors.confusables = [
    {
      title: 'when / while / as',
      rule: 'when 可指某个时刻或一段时间；while 强调一段持续的动作；as 常表示两个动作同步变化。先看动作是瞬间发生，还是一直在进行。',
      examples: ['When the lights went out, we stopped reading.', 'While Dad was washing the car, I cleaned the windows.', 'As the sky grew darker, the wind became stronger.'],
      pitfall: '“正在做某事，这时突然……”常用 when 引出突然发生的动作，不要见过去进行时就一律选 while。',
    },
    {
      title: 'because / since / as',
      rule: 'because 直接回答“为什么”，原因最突出；since 表示“既然”，原因通常已知；as 常把原因当背景说明。三个词都能引出原因，但语气和信息重点不同。',
      examples: ['I stayed home because I had a fever.', 'Since you know the rules, you can start first.', 'As the road was wet, we walked slowly.'],
      pitfall: 'because 引出的原因后通常不再用 so 接结果；since 和 as 还可表示时间，需按上下文判断。',
    },
    {
      title: 'if / whether',
      rule: 'if 可以表示“如果”，引出条件，也可以表示“是否”，引出宾语从句；whether 主要表示“是否”。在 whether ... or not、介词后或 whether to do 结构中用 whether 更稳妥。',
      examples: ['If it is sunny, we will go hiking.', 'I wonder whether the shop is open.', 'We have not decided whether to leave now.'],
      pitfall: '看到 if 先问：它是“如果”还是“是否”？两种用法的句子关系不同，不能把所有 if 从句都套“主将从现”。',
    },
    {
      title: 'if ... not / unless',
      rule: 'unless 意为“除非”，通常相当于 if ... not。改写时要同时检查主句是否需要调整，不能只替换一个词。',
      examples: ['If you do not leave now, you will be late.', 'Unless you leave now, you will be late.'],
      pitfall: '不要在 unless 后又随手加 not，否则会把原本的条件反过来。',
    },
    {
      title: 'although / though / even though / even if',
      rule: 'although 与 though 都表示“虽然”；even though 更强调已发生的事实与结果相反；even if 常说假设的“即使……也……”。',
      examples: ['Although the room was small, it felt comfortable.', 'Even though she was tired, she kept working.', 'Even if we lose, we will learn something.'],
      pitfall: 'although、though、even though 已表达让步，同一句主句通常不要再加 but。',
    },
    {
      title: 'because / so / so that',
      rule: 'because 引出原因；so 连接“原因→结果”；so that 通常引出目的，回答“为了什么”，后面常有 can 或 could。',
      examples: ['We stayed inside because it was cold.', 'It was cold, so we stayed inside.', 'I spoke clearly so that everyone could hear.'],
      pitfall: '不要写 because ..., so ...；也不要把 so that 拆成表示结果的 so 和普通的 that。',
    },
    {
      title: 'so ... that / such ... that / so that',
      rule: 'so + 形容词或副词 + that、such + 名词短语 + that 都表“如此……以至于”；so that 多表“为了”。先找空格后面的中心词。',
      examples: ['The river was so wide that we could not cross it.', 'It was such a busy day that I forgot lunch.', 'I set an alarm so that I would not oversleep.'],
      pitfall: '通常说 such a difficult question，不说 so a difficult question；但 so many / much / few / little + 名词 + that 是常见例外。',
    },
    {
      title: 'until / not ... until / before',
      rule: 'until 表示某动作一直持续“到……为止”；not ... until 表示动作“直到……才开始”；before 只说明先后，不强调持续到那个时间。',
      examples: ['We waited until the rain stopped.', 'We did not go out until the rain stopped.', 'We checked the map before we left.'],
      pitfall: '看到 until 前有 not，要把整句理解成“直到……才”，不能仍按“持续到……”翻译。',
    },
    {
      title: 'as soon as / when / after',
      rule: 'as soon as 强调“一……就……”，间隔很短；when 只交代“当……时”；after 只说明“在……之后”，不保证紧接着发生。',
      examples: ['Call me as soon as you arrive.', 'Call me when you have time.', 'We visited the park after we finished lunch.'],
      pitfall: '主句说将来时，as soon as、when 等时间从句通常用一般现在时表将来。',
    },
    {
      title: 'in case / if / as long as',
      rule: 'in case 是“以防万一”，强调提前采取预防措施；if 是“如果”；as long as 是“只要”，强调条件满足即可。',
      examples: ['Bring a jacket in case it gets cold.', 'If it gets cold, we will go indoors.', 'You may stay as long as you keep quiet.'],
      pitfall: '带雨伞“以防下雨”时，带伞这个动作会事先发生；不要把 in case 当作普通 if。',
    },
    {
      title: 'both ... and / either ... or / neither ... nor / not only ... but also',
      rule: 'both ... and 表示“两者都”，连接主语时谓语用复数；其余三组分别表示“二选一”“两者都不”“不但……而且”，连接主语时通常按靠近谓语的主语决定单复数。',
      examples: ['Both the coach and the players are ready.', 'Either the players or the coach is ready.', 'Neither the coach nor the players are ready.'],
      pitfall: '不能只看到前面的主语就决定谓语单复数；尤其留意 either ... or 和 neither ... nor 的就近一致。',
    },
  ];

  // 其余题型同样先做易混辨析，再进入原题；均为待审核的原创例句。
  const otherConfusables = {
    pronouns: [
      ['another / the other / others / the others', 'another 是不限定范围的“再一个”；the other 是两个中的另一个；others 指其他一些；the others 指某个已知范围内剩余的全部。先数对象，再判断范围是否确定。', ['I have two cups. One is white; the other is blue.', 'Some children drew pictures, and others sang songs.'], '看到“另一个”不要立刻选 another；两者中剩下的一个要用 the other。'],
      ['both / either / neither', '谈两个对象时，both 是“两者都”，either 是“两者中的任一个”，neither 是“两者都不”。还要检查它们作主语时与谓语的搭配。', ['Both answers are possible.', 'Neither answer is correct.'], 'neither 本身已是否定，不要无意中再加 not；both 后接复数名词。'],
      ['something / anything / nothing + 形容词', '这些不定代词后面的修饰性形容词通常后置；肯定句常用 something，疑问句或否定句常用 anything，nothing 自带否定意义。', ['We found something unusual in the garden.', 'I did not hear anything strange.'], '不要写 unusual something；也不要在 nothing 前再加 not 造成双重否定。'],
    ],
    quantity: [
      ['the number of / a number of', 'the number of 的核心词是单数 number，表示“……的数量”；a number of 表“许多”，后接可数名词复数，谓语通常用复数。', ['The number of visitors is increasing.', 'A number of visitors are waiting outside.'], '不能只看后面的复数名词就把 the number of 的谓语写成复数。'],
      ['two hundred / hundreds of', '具体数字后用 hundred、thousand、million 的单数形式；表示不确切的“数百、数千”时，才常用复数加 of。', ['Two hundred seats were available.', 'Hundreds of fans came to the concert.'], '不要写 two hundreds students，也不要写 hundreds students。'],
      ['分数 / 百分数 + of 后的谓语', '分数或百分数后接 of + 名词时，谓语往往看 of 后所指的人或物：可数复数通常用复数，不可数名词通常用单数。', ['Two thirds of the students are present.', 'Half of the water is gone.'], '不要仅凭分数本身决定 is 或 are；先圈出 of 后面的名词。'],
    ],
    nonfinite: [
      ['enjoy doing / decide to do', '同样是“做某事”，前面动词不同，后接形式也不同：enjoy、avoid 等常接 doing；decide、plan、hope 等常接 to do。先找控制空格形式的前一个词。', ['We enjoy walking by the lake.', 'They decided to visit the museum.'], '不能因为中文都译成“做”就把 to do 和 doing 随意互换。'],
      ['stop doing / stop to do', 'stop doing 表示停止正在做的事；stop to do 表示停下原来的事，转而去做另一件事。两种形式语法都可能对，但意思不同。', ['She stopped talking when the film began.', 'She stopped to drink some water.'], '做题时必须读上下文：是“停止这件事”，还是“停下来去做那件事”？'],
      ['used to do / be used to doing', 'used to do 表示过去常常做、现在未必如此；be used to doing 表示习惯于做。后者的 to 是介词，后接名词或 doing。', ['I used to cycle to school.', 'I am used to getting up early.'], '看到 used to 不要机械接动词原形；先检查前面有没有 be，以及句意是过去习惯还是现在适应。'],
    ],
    tense: [
      ['一般过去时 / 现在完成时', 'yesterday、last Sunday 等明确结束的过去时间通常用一般过去时；过去发生且与现在有联系，或持续到现在的情况，常用现在完成时。', ['We visited the zoo last Sunday.', 'We have visited that zoo several times.'], '有明确的过去时间时，不要只因句子有“曾经”的意思就用 have done。'],
      ['一般过去时 / 过去进行时', '一般过去时叙述已发生的事件；过去进行时强调过去某一时刻动作正在进行。常用进行中的动作作背景，另一个短暂动作插入。', ['At eight last night, I was reading.', 'The phone rang while I was reading.'], '看到 at eight last night 要判断“那一刻正在做”，不能一律用一般过去时。'],
      ['主动语态 / 被动语态', '先找主语与动作的关系：主语发出动作，用主动；主语承受动作，用 be + 过去分词，被动中的 be 还要符合时态。', ['The students cleaned the room.', 'The room was cleaned yesterday.'], '写出过去分词不等于写出了被动语态；不要漏掉 be。'],
    ],
    comparison: [
      ['形容词 / 副词', '形容词常修饰名词或作表语；副词常修饰动词、形容词或其他副词。先找空格实际修饰的词，再判断词性。', ['The speaker gave a clear answer.', 'The speaker answered clearly.'], '修饰 answered 这样的动作时，不要直接填 clear。'],
      ['-ing 形容词 / -ed 形容词', '-ing 形式常表示事物“令人……的”；-ed 形式常表示人“感到……的”。判断的是谁带来感受、谁产生感受。', ['The story was surprising.', 'The children were surprised by the story.'], '不要只按主语是不是人死记；要看句子想表达“令人……”还是“感到……”。'],
      ['比较级 / 最高级 / as ... as', '两者比较常用比较级；在一个范围内选“最……”常用最高级；as ... as 中间用形容词或副词原级。', ['This road is narrower than that one.', 'It is the narrowest road in the village.', 'This road is as narrow as that one.'], '看到 than、the ... in/of、as ... as 时，先确认比较结构，再选词形。'],
    ],
    prepositions: [
      ['at / on / in 表时间', 'at 常接具体时刻；on 常接具体某一天；in 常接月份、年份或较长时间段。具体某天的早上通常用 on。', ['We meet at seven in the morning.', 'The match is on Friday.', 'School starts in September.'], '不要只看到 morning 就用 in；说“星期五早上”应看完整的时间短语。'],
      ['for / since 表持续', 'for 后接一段时间；since 后接起点时间或从句。它们常与持续到现在的情况连用，不能仅凭中文“已经”选。', ['She has studied here for three years.', 'She has studied here since 2023.'], 'three years 是时长，不是起点；不要写 since three years。'],
      ['result in / result from', 'result in 后面接结果，意思是“导致”；result from 后面接原因，意思是“由……引起”。先画清原因指向结果的箭头。', ['Heavy rain can result in floods.', 'The floods resulted from heavy rain.'], '同一件事换主语后，短语可能要从 result in 改成 result from，不能只背一个中文意思。'],
    ],
    vocabulary: [
      ['词义相近 / 词性不同', '选项意思相近时，先检查句子缺名词、动词、形容词还是副词；同一词根的词不能因为“意思差不多”就互换。', ['Her explanation was clear.', 'She explained the rule clearly.'], '只看中文“清楚”而不看空格位置，容易把 clear 和 clearly 放反。'],
      ['动词相同 / 小品词不同', '短语动词往往由动词加介词或副词构成；后一个小词变了，整体意思可能完全不同。必须把整个短语放回语境。', ['Please put on your coat.', 'They put off the trip until Friday.'], '看到同一个 put 就选熟悉的意思，会忽略 on 与 off 改变了整组词义。'],
      ['字典第一义 / 语境义', '一个词可能有多个义项。先用前后句判断动作对象和情境，再回到选项；不要只凭最熟悉的中文翻译。', ['The bank is beside the river.', 'She went to the bank to save money.'], '两句中的 bank 拼写相同，语境不同；不能把第一句硬解释成金融机构。'],
    ],
    phonetics: [
      ['相同拼写 / 不同读音', '英文字母或字母组合相同，不保证在每个词里发音相同。要先确认原题画线位置，再比较对应的音素。', ['The word read can sound different in the present and the past.', 'The letter a sounds different in cat and cake.'], 'PDF 若丢失画线，先回原题确认比较的是哪一部分，不能仅凭整词猜。'],
      ['-ed 的三种词尾读音', '规则动词过去式的 -ed 常读 /t/、/d/ 或 /ɪd/；读音取决于前面的音，而不是只看最后一个字母。', ['The -ed in watched sounds /t/.', 'The -ed in played sounds /d/.', 'The -ed in wanted sounds /ɪd/.'], '不要把所有 -ed 都读成独立的“id”；先听词尾前一个音。'],
      ['-s / -es 的常见读音', '复数和第三人称单数词尾可读 /s/、/z/ 或 /ɪz/；要根据前面的音判断。', ['The -s in books sounds /s/.', 'The -s in bags sounds /z/.', 'The -es in buses sounds /ɪz/.'], '字母 s 写法相同不等于发音相同，读完整单词后再比画线部分。'],
    ],
    reading: [
      ['原文事实 / 合理推断', '细节题要能找到直接证据；推断题可以不照抄原文，但必须由文中信息推出，不能只靠生活经验。', ['Text: The lights were off and no one answered.', 'Inference: The room might be empty.'], '“听起来合理”不等于“文章支持”；找不到证据时不要选。'],
      ['全文主旨 / 局部细节', '标题或主旨题要概括整篇反复围绕的中心；某个选项即使完全正确，只覆盖一段也不适合作全文标题。', ['A passage explains several ways to save water.', 'A title about only one tap would be too narrow.'], '主旨题先看各段共同点，不要被一段里最醒目的句子带跑。'],
      ['代词指代 / 最近名词', 'it、they、this 等代词常指代前文信息，但并不总指最近的名词；代入候选对象后检查单复数与语义。', ['The students thanked the guides because they had helped them.', 'Here they needs the surrounding sentences to identify.'], '不要机械地把 they 指向最近的复数名词；上下文可能说明是另一组人。'],
    ],
    cloze: [
      ['语法通顺 / 语义恰当', '完形选项可能都符合局部语法，但只有一个与人物、事件和全文态度一致。先读全文，再回空格。', ['A story describes a welcome surprise.', 'A word meaning fear may be grammatical but not fit the mood.'], '某选项能组成正确句子，不等于它适合整篇文章。'],
      ['因果 / 转折', '先看前后句是“因为所以”还是“虽然但是”，再选连接词；不要只翻译空格所在一句。', ['It was raining, so we stayed inside.', 'It was raining, but we still played outside.'], '两句都提到下雨，后一句结果不同，所需逻辑关系就不同。'],
      ['局部指代 / 全文人物线', '代词和人称题要追踪故事中的人物：谁说话、谁行动、谁受到影响。近处名词未必就是代词所指。', ['Nina called her sister after the game.', 'The next sentence must show who “she” refers to.'], '做完一空仍要往后读，后文可能明确代词真正所指。'],
    ],
    'context-fill': [
      ['选对词义 / 填对词形', '选词填空不仅要选意义合适的词，还要按句子需要变成正确形式；先看题目是否允许变形。', ['The team won yesterday.', 'The team has won twice this year.'], '只填词表里的原形可能导致时态、单复数或词性错误。'],
      ['形容词 / 副词', '空格修饰名词多考虑形容词，修饰动词多考虑副词；先划出被修饰的词，不凭中文猜。', ['It was a quiet room.', 'The visitors spoke quietly.'], '“安静”同一个中文意思，quiet 与 quietly 的位置不同。'],
      ['because / because of', 'because 后接句子；because of 后接名词、代词或名词短语。先看空格后有没有完整的主语和谓语。', ['We stayed home because it snowed.', 'We stayed home because of the snow.'], '不能写 because of it snowed；介词短语后不能直接接完整从句。'],
    ],
    dialogue: [
      ['一般疑问句 / 特殊疑问句', '一般疑问句常先回答 yes 或 no；以 why、how、where 等开头的问题需要对应的信息。', ['Q: Did you enjoy the trip? A: Yes, I did.', 'Q: Why did you leave early? A: Because I felt tired.'], '看到问号就套 Yes/No，可能没有回答真正的问题。'],
      ['建议 / 请求 / 邀请', '建议侧重一起想办法，请求侧重请别人做事，邀请侧重请对方参与；回应语气和后续动作不同。', ['“Shall we walk there?” “Good idea.”', '“Could you open the window?” “Of course.”'], '只看一句“可以”还不够，要确认下一句是否接得上。'],
      ['对话补全 / 句子还原', '有的补全题是人物轮流说话，有的是短文中补句；前者看问答意图，后者看段落逻辑和代词指代。', ['Dialogue: a question should receive a relevant reply.', 'Passage: “This method” must refer to an earlier method.'], '不要把短文补句题当作双人对话题，只找礼貌用语。'],
    ],
    writing: [
      ['逐字直译 / 英文句子主干', '先写出“谁做什么”，再添时间、条件、原因等信息；中文词序不一定能原样搬到英文里。', ['We discussed the plan carefully.', 'The word carefully describes how we discussed it.'], '先找主谓结构，比把中文每个词逐个换成英文更可靠。'],
      ['过去叙事 / 现在评价', '叙述已发生的事情通常用过去时；表达现在的看法或普遍事实可用现在时。切换时态要有时间线索。', ['Last week we visited a museum.', 'I still think the visit was useful.'], '同一段突然换时态，读者会误以为事件发生时间改变。'],
      ['完整句 / 逗号拼接', '两个完整英文句子不能只用逗号硬连；可用 and、but、because 等恰当连接，或分成两个句子。', ['The rain stopped, and we went outside.', 'The rain stopped. We went outside.'], '不要写 The rain stopped, we went outside. 这种逗号拼接。'],
    ],
    mixed: [
      ['词义题 / 语法题', '先比较选项：若主要差在意思，重点看上下文；若差在时态、词性或句型，先检查语法位置。自动“综合”标签不是实际考点。', ['A choice between happy and glad asks about meaning in context.', 'A choice between happy and happily asks about word class.'], '没看选项差异就套一套固定语法规则，容易答非所问。'],
      ['关键词相同 / 整句合理', '干扰项常复现题干里的一个词，却不符合整句逻辑或搭配。把选项放回原句，检查语法和语义两关。', ['A passage mentions a train and a ticket.', 'An option repeating ticket may still be unrelated to the question.'], '熟悉词不等于正确答案；必须能解释它与题干的关系。'],
      ['真实错误 / PDF 提取缺损', '少量导入题可能缺字、丢画线或答案不可靠。先判断信息是否足够，再决定是否计分或归类。', ['The original may show an underlined vowel.', 'Plain text without the underline cannot support a pronunciation choice.'], '题干或答案不完整时不要强行练，也不要把一次错误算进掌握率。'],
    ],
  };
  for (const point of points) {
    if (point.id === 'connectors') continue;
    point.confusables = otherConfusables[point.id].map(([title, rule, examples, pitfall]) =>
      ({ title, rule, examples, pitfall }));
  }

  function classify(q) {
    if (q.type === 'cloze') return 'cloze';
    if (q.type === 'fill') return 'context-fill';
    if (q.type === 'completion') return 'dialogue';
    if (q.type === 'written') return 'writing';
    if (q.type === 'reading') {
      if (/非谓语|谓语还是非谓语|划线部分非谓语|prefer A B|prefer doing/.test(q.text)) return 'nonfinite';
      if (/\(\d+\)\s*单选题\s*A[.．、]|\d+[.．、]单选题\s*A[.．、]/.test(q.text) &&
          !/what|which|why|how|passage|article|text/i.test(q.text.slice(-900))) return 'cloze';
      return 'reading';
    }
    if (q.type !== 'choice') return 'mixed';
    const optionStart = q.text.search(/(?:\n|\s)A[.．、]\s/);
    const stem = optionStart < 0 ? q.text : q.text.slice(0, optionStart);
    const options = optionStart < 0 ? '' : q.text.slice(optionStart);
    const optionValues = [...options.matchAll(/^[A-D][.．、]\s*([^\n]+)/gm)].map(match => match[1].trim());
    if (/pronunciation|发音|读音|underlined parts is different/i.test(stem)) return 'phonetics';
    // 先看选项的区别，避免题干里的 someone、used to 等背景词误导归类。
    if (optionValues.length >= 3 && optionValues.every(value =>
      /^(?:as|until|while|when|although|though|since|if|unless|because|before|after|despite|in spite)/i.test(value))) return 'connectors';
    if (/^\s*(?:if|unless)\b/i.test(stem) && /\b(?:will|won't|would|was|were|am|is|are)\b/i.test(options)) return 'connectors';
    if (optionValues.some(value => /^to\s+\w+/i.test(value)) &&
        optionValues.some(value => /^\w+(?:ing|ed)\b/i.test(value))) return 'nonfinite';
    if (optionValues.length >= 3 && optionValues.every(value => /^(?:interesting|interested)\b/i.test(value))) return 'comparison';
    const nonfiniteCue = /非谓语|谓语还是非谓语|动名词|不定式|used to|be used to|look forward to|\b(prefer|avoid|suggest|advise|recommend|decide|finish|mind|imagine|require|enjoy)\b/i.test(stem);
    const nonfiniteForms = /\b(?:to\s+\w+|\w+ing|\w+ed)\b/i.test(options);
    if (nonfiniteCue && (nonfiniteForms || /非谓语|谓语还是非谓语|动名词|不定式/.test(stem)) ||
        /\b(?:have|make|help|ask|watch|see|prevent|stop)\s+(?:someone|somebody|sb|him|her|them|us|me)\b/i.test(stem) && nonfiniteForms) return 'nonfinite';
    if (/%|百分|分数|fifths?|thirds?|two[- ]thirds?|the number of|a number of|population|hundred|thousand|million|\b\d{3},\d{3}\b|Grade\s+\d/i.test(stem) ||
        (options.match(/\b(?:hundreds?|thousands?|millions?|fifths?|fourths?|minutes?)\b/gi) || []).length >= 2) return 'quantity';
    if (/\b(another|others?|either|neither|both|each|someone|somebody|anyone|anybody|nobody|nothing|everything|anything|something)\b|两个|两者/i.test(stem) ||
        (options.match(/\b(?:another|the other|others|other|either|neither|both|each|something|anything|nothing|everything|someone|anyone|somebody|anybody|one)\b/gi) || []).length >= 2) return 'pronouns';
    if (/\b(when|while|unless|although|though|whenever|as soon as|so that|in case|even if|no matter|because|since|until|before|after|as long as)\b|so\s+\w+\s+that|such\s+\w+\s+that/i.test(stem) ||
        (options.match(/\b(?:although|unless|while|when|because|since|until|so that|in case|even if|as long as|once|despite|therefore|however|such|so|before|after|though|in order to|in order that)\b/gi) || []).length >= 2) return 'connectors';
    if (/\b(than|more|most|less|least|better|best|worse|worst|faster|earlier)\b|as\s+_+\s+as|the\s+_+\s+you|感叹句/i.test(stem) ||
        (options.match(/\b(?:more|most|less|least|better|best|worse|worst|what|how|clearer|clearly|funniest|faster)\b/gi) || []).length >= 2) return 'comparison';
    if (/\b(yesterday|last year|last week|in the past|since|already|at 7|at the moment|ever since|while I|when I)\b|被动语态|时态/i.test(stem) ||
        (options.match(/\b(?:will be|was|were|has been|have been|had been|is being|is singing|are singing|has broken|will break)\b/gi) || []).length >= 2) return 'tense';
    if (/\b(to|of|for|with|from|about|into|on|at|in)\s+_+|_+\s+\b(to|of|for|with|from|about|into|on|at|in)\b|介词|搭配/i.test(stem) ||
        (options.match(/[A-D][.．、]\s*(?:to|of|for|with|from|about|into|on|at|in|by)\b/gi) || []).length >= 2 ||
        (options.match(/\b(?:to|of|for|with|from|about|into)\b/gi) || []).length >= 3) return 'prepositions';
    if (/means|meaning|underlined word|词义|近义|词性|word form/i.test(stem) ||
        /\b(noun|verb|adjective|adverb)\b/i.test(options)) return 'vocabulary';
    return 'mixed';
  }

  const EnglishKnowledge = { points, classify, get: id => points.find(p => p.id === id) };
  if (typeof module !== 'undefined') module.exports = EnglishKnowledge;
  else root.EnglishKnowledge = EnglishKnowledge;
})(this);
