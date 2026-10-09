'use strict';

// 六上 Unit 4 语法练习：疑问词 what、who 作主语和宾语，频度副词的位置（课本 Grammar file 第 128～129 页的范围），题目均为原创。
// 辨认（basic）用选择题，运用（extended）用填写题（kind: 'en'），产出（challenge）用 open 自评题。
const choiceQ642 = (id, stem, options, answer, explain) =>
  ({ id, level: 'basic', type: 'choice', stem, options, answer, explain });
const fillQ642 = (id, stem, blanks, explain) =>
  ({ id, level: 'extended', type: 'fill', stem, blanks: blanks.map(b => ({ kind: 'en', ...b })), explain });
const openQ642 = (id, stem, reference, checks, explain) =>
  ({ id, level: 'challenge', type: 'open', stem, reference, checks, explain });

Content.section({
  id: 'english/sh2022/g6s1/4.2',
  title: 'Sports — 语法练习 ----- 疑问词 what、who 与频度副词',
  review: { status: 'pending' },
  levelNames: { basic: '辨认', extended: '运用', challenge: '产出' },
  knowledgeRefs: ['tense'],
  intro: [
    { title: '疑问词当主语', body: '问“谁做了这个动作”或“什么东西起了作用”时，who / what 就是主语：疑问词 + 动词（三单）+ 其他，不用 do / does。', example: 'Who draws well in your class? What lives in this river?' },
    { title: '疑问词当宾语', body: '问“动作的对象”时，要借助 do / does：疑问词 + do / does + 主语 + 动词原形 + 其他。', example: 'What does your cousin collect? Who do the twins visit on Sundays?', pitfall: 'does 已经表示第三人称单数，后面的动词不再加 -s。' },
    { title: '频度副词站在哪儿', body: 'always、usually、often、sometimes、seldom、never 一般放在实义动词前、be 动词后；sometimes 也可以放在句首或句末。', example: 'They usually walk home. The library is often quiet.', pitfall: 'never 已经是否定意思，不能再和 not 连用。' },
  ],
  questions: [
    choiceQ642('4.2-b01', '— ___ do you go cycling with? — My cousin.', ['What', 'Who', 'Where', 'How'], 1, ['回答是一个人（my cousin）。', '问人用 who；这里 who 是 with 的宾语，所以句中有 do。']),
    choiceQ642('4.2-b02', 'What ___ your parents usually do on Sunday mornings?', ['do', 'does', 'is', 'are'], 0, ['主语是 your parents，是复数。', '复数主语用 do，后面的 do 是实义动词“做”。']),
    choiceQ642('4.2-b03', 'Who ___ the dishes in your home?', ['wash', 'washes', 'do wash', 'does wash'], 1, ['who 是主语，后面直接跟动词，不用 do / does。', '动词用三单形式，wash 以 sh 结尾加 -es：washes。']),
    choiceQ642('4.2-b04', 'Which sentence is correct?', ['We go sometimes to the gym.', 'We sometimes go to the gym.', 'We go to sometimes the gym.', 'We to the gym sometimes go.'], 1, ['go 是实义动词。', '频度副词放在实义动词前面：sometimes go。']),
    choiceQ642('4.2-b05', 'Which word is NOT an adverb of frequency?', ['usually', 'never', 'quickly', 'seldom'], 2, ['频度副词表示“多经常”。', 'quickly 表示“快地”，说的是动作的方式，不是频率。']),
    fillQ642('4.2-e01', 'Fill in “What” or “Who”: ___ is your best friend?', [{ answer: 'Who' }], ['要问的是一个人。', '问人用 Who。']),
    fillQ642('4.2-e02', 'Write the correct form of “watch”: Who ___ TV after dinner in your family?', [{ answer: 'watches' }], ['who 作主语，动词用三单。', 'watch 以 ch 结尾，加 -es：watches。']),
    fillQ642('4.2-e03', '— Who plays the piano in your family? — My mum ___.', [{ answer: 'does' }], ['who 作主语的问句，用“人 + does / do”简略回答。', 'my mum 是第三人称单数，用 does。']),
    fillQ642('4.2-e04', 'Ask about the sport: “Peter plays football on Saturdays.” → What ___ Peter ___ on Saturdays?', [{ label: '第 1 空', answer: 'does' }, { label: '第 2 空', answer: 'do' }], ['football 是 play 的宾语，what 作宾语，要加助动词。', 'Peter 是第三人称单数用 does，后面的实义动词用原形 do：What does Peter do on Saturdays?']),
    fillQ642('4.2-e05', 'Make it negative: “Lucy goes jogging on rainy days.” → Lucy ___ ___ jogging on rainy days.', [{ label: '第 1 空', answer: ["doesn't", 'doesn’t'] }, { label: '第 2 空', answer: 'go' }], ['一般现在时，主语是第三人称单数，否定用 doesn\'t。', 'doesn\'t 后面的动词用原形：goes → go。']),
    fillQ642('4.2-e06', 'Add “never” to the sentence and write it again: Kate is late for school.', [{ answer: ['Kate is never late for school.', "Kate's never late for school.", 'Kate’s never late for school.'] }], ['句中的动词是 be 动词 is。', '频度副词放在 be 动词后面：Kate is never late for school.']),
    fillQ642('4.2-e07', 'One word is wrong: “Who often play basketball with you?” Write the wrong word and the correct word.', [{ label: '错的词', answer: 'play' }, { label: '改为', answer: 'plays' }], ['who 在句中作主语。', 'who 作主语时动词用三单：Who often plays basketball with you?']),
    openQ642('4.2-c01', 'Write two questions to ask a friend about his or her sports habits: one with “What” and one with “Who”.',
      ['What sports do you play after school? Who do you play with?', 'What do you do at weekends? Who teaches you to swim?'],
      ['what / who 作宾语时，加 do / does，后面用动词原形', 'what / who 作主语时，不加 do / does，动词用三单', '每个问句首字母大写，句末用问号'],
      ['先想好要问朋友什么：做什么运动、和谁一起、谁教他。', '再判断疑问词在句子里是主语还是宾语，决定要不要加 do / does。']),
    openQ642('4.2-c02', 'Write two sentences about how often you or your family members do sports. Use adverbs of frequency like always, usually, often, sometimes or never.',
      ['I often go swimming in summer. My dad sometimes plays badminton with me.', 'My mum often does yoga in the evening. I never play tennis because I don\'t have a racket.'],
      ['频度副词放在实义动词前、be 动词后', '主语是 he / she / 人名时，动词用三单', 'play、go、do 和运动搭配正确'],
      ['先选一个人和一种运动，再想想他多经常做。', '写完检查频度副词的位置和动词的三单形式。']),
    openQ642('4.2-c03', 'Your friend hurts his ankle in a PE class. Write two sentences to show you care and offer help.',
      ['Are you okay? Let me help you to a chair.', "What's wrong? Let me get you an ice pack."],
      ['先问对方的情况', '再提供帮助或建议', '问句用问号，语气友好'],
      ['关心别人可以先问情况，比如 Are you okay? / What\'s wrong?', '再说你能做什么，比如帮他拿水、扶他坐下、去告诉老师。']),
  ],
});
