'use strict';

// 六上 Unit 1 语法练习：一般现在时（课本 Grammar file 第 121～123 页的范围），题目均为原创。
// 辨认（basic）用选择题，运用（extended）用填写题（kind: 'en'），产出（challenge）用 open 自评题。
const choiceQ612 = (id, stem, options, answer, explain) =>
  ({ id, level: 'basic', type: 'choice', stem, options, answer, explain });
const fillQ612 = (id, stem, blanks, explain) =>
  ({ id, level: 'extended', type: 'fill', stem, blanks: blanks.map(b => ({ kind: 'en', ...b })), explain });
const openQ612 = (id, stem, reference, checks, explain) =>
  ({ id, level: 'challenge', type: 'open', stem, reference, checks, explain });

Content.section({
  id: 'english/sh2022/g6s1/1.2',
  title: 'School life — 语法练习 ----- 一般现在时',
  review: { status: 'pending' },
  levelNames: { basic: '辨认', extended: '运用', challenge: '产出' },
  knowledgeRefs: ['tense'],
  intro: [
    { title: '一张表记住一般现在时', body: '肯定句：I / you / we / they + 动词原形；he / she / it + 动词 -s。否定句在动词前加 don\'t 或 doesn\'t；一般疑问句把 Do 或 Does 放在句首。用了 does / doesn\'t，动词回到原形。', example: 'They walk to school. He walks to school. He doesn\'t walk to school. Does he walk to school?' },
    { title: '三单变化四条规则', body: '多数动词直接加 -s；以 s、x、sh、ch、o 结尾加 -es；辅音字母 + y 结尾，变 y 为 i 加 -es；have 是特殊的，变成 has。', example: 'mix → mixes，carry → carries，do → does，have → has', pitfall: '元音字母 + y 结尾的词直接加 -s：play → plays，不变 y。' },
    { title: '特殊疑问句的顺序', body: '想问时间、地点、方式时，把 What、When、Where、How 等疑问词放在句首，后面接 do / does + 主语 + 动词原形。', example: 'Where does your aunt work?', pitfall: '不能漏掉 do / does，也不能写成 Where your aunt works?' },
  ],
  questions: [
    choiceQ612('1.2-b01', 'Tom ___ a shower every night.', ['take', 'takes', 'taking', 'is take'], 1, ['主语 Tom 是第三人称单数，every night 表示习惯。', '一般现在时三单形式：take → takes。']),
    choiceQ612('1.2-b02', 'Which is the correct -s form of “fly”?', ['flys', 'flies', 'flyes', 'flis'], 1, ['fly 以“辅音字母 + y”结尾。', '变 y 为 i，再加 -es：flies。']),
    choiceQ612('1.2-b03', 'Which negative sentence is correct?', ["Amy don't like milk.", "Amy doesn't likes milk.", "Amy doesn't like milk.", 'Amy not like milk.'], 2, ['主语 Amy 是第三人称单数，否定用 doesn\'t。', 'doesn\'t 后面的动词回到原形 like，所以 B 错在 likes。']),
    choiceQ612('1.2-b04', 'Which question is correct?', ['Does your father works on Saturdays?', 'Do your father work on Saturdays?', 'Does your father work on Saturdays?', 'Is your father work on Saturdays?'], 2, ['your father 是第三人称单数，提问用 Does。', 'Does 后面的动词用原形 work。']),
    choiceQ612('1.2-b05', 'Which sentence talks about a habit (习惯)?', ['I brush my teeth twice a day.', 'I am brushing my teeth now.', 'I brushed my teeth an hour ago.', "I'm going to brush my teeth."], 0, ['习惯是经常重复做的事，用一般现在时。', 'twice a day 说明每天都这样做；其他三句分别是正在做、过去和将来。']),
    fillQ612('1.2-e01', 'Write the correct form of “teach”: My mum ___ maths at a primary school.', [{ answer: 'teaches' }], ['主语 my mum 是第三人称单数。', 'teach 以 ch 结尾，加 -es：teaches。']),
    fillQ612('1.2-e02', 'Write the correct form of “cry”: The baby ___ when she is hungry.', [{ answer: 'cries' }], ['主语 the baby 是第三人称单数，说的是经常发生的情况。', 'cry 是“辅音字母 + y”结尾，变 y 为 i 加 -es：cries。']),
    fillQ612('1.2-e03', 'Make it negative. Write one word in each blank (use the short form): Peter plays tennis on Sundays. → Peter ___ ___ tennis on Sundays.', [{ label: '1', answer: "doesn't" }, { label: '2', answer: 'play' }], ['Peter 是第三人称单数，否定借助 doesn\'t。', 'doesn\'t 后面的动词回到原形，plays → play。']),
    fillQ612('1.2-e04', 'Make a Yes/No question: They have lunch at school. → ___ they ___ lunch at school?', [{ label: '1', answer: 'Do' }, { label: '2', answer: 'have' }], ['主语 they 是复数，一般疑问句用 Do 开头。', 'Do 后面的动词用原形 have。']),
    fillQ612('1.2-e05', 'Complete the short answer: — Does your aunt live in Beijing? — No, ___ ___.', [{ label: '1', answer: 'she' }, { label: '2', answer: "doesn't" }], ['your aunt 是女性，简略回答里用代词 she。', '用 Does 提问，否定简略回答用 doesn\'t：No, she doesn\'t.']),
    fillQ612('1.2-e06', 'One word in this sentence is wrong: “Lucy go to the library every Friday.” Write the wrong word and the correct word.', [{ label: '错的词', answer: 'go' }, { label: '改为', answer: 'goes' }], ['主语 Lucy 是第三人称单数，every Friday 表示习惯。', 'go 以 o 结尾，加 -es：goes。']),
    fillQ612('1.2-e07', 'Answer: “Linda goes to school by bus.” Complete the question about how she goes to school: ___ ___ Linda go to school?', [{ label: '1', answer: 'How' }, { label: '2', answer: 'does' }], ['by bus 说的是方式，用 How 提问。', 'Linda 是第三人称单数，疑问句用 does，后面的 goes 变回原形 go。']),
    openQ612('1.2-c01', 'Write one sentence about what your best friend does after school. Use the present simple.',
      ['My best friend plays basketball after school.', 'After school, my best friend usually reads in the library.'],
      ['主语是 my best friend（他或她），动词要加 -s 或 -es', '说的是经常做的事，可以加 usually、often 等词', '句首字母大写，句末有句号'],
      ['先确定主语是第三人称单数，再选一个常做的动作。', '写完检查动词有没有加 -s / -es，以及句首大写、句末句号。']),
    openQ612('1.2-c02', 'Write a question to ask a new classmate about his or her school club. Begin with “What” or “When”.',
      ['What club do you go to?', 'When does your club meet?'],
      ['疑问词放在句首，后面接 do 或 does', 'do / does 后面的动词用原形', '句末用问号'],
      ['问对方自己的事，主语是 you，用 do；问 your club，用 does。', '按“疑问词 + do/does + 主语 + 动词原形”的顺序写。']),
    openQ612('1.2-c03', 'Write two sentences: one thing you do on Mondays and one thing you do not do on Mondays.',
      ["I have PE on Mondays. I don't have art on Mondays.", "I go to the chess club on Mondays, but I don't play football."],
      ['主语是 I，肯定句的动词不加 -s', '否定句用 don\'t + 动词原形', '星期 Monday 首字母大写'],
      ['第一句写一件常做的事，第二句用 don\'t 写一件不做的事。', 'I 做主语时，肯定句和否定句的动词都用原形。']),
  ],
});
