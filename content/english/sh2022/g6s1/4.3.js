'use strict';

// 六上 Unit 4 语音与听力：课本 Sound 栏目“Letters ei, ea and ee”（第 56 页、Sound file 第 111 页）和“听运动与频率”技能，题目均为原创。
// 带 audio 的题由设备朗读（src/speech.js）；不能朗读时页面直接显示听力原文。
const soundQ643 = (id, level, stem, options, answer, explain, audio) =>
  ({ id, level, type: 'choice', stem, options, answer, explain, ...(audio ? { audio: { text: audio } } : {}) });
const writeQ643 = (id, level, stem, answer, explain, audio) =>
  ({ id, level, type: 'fill', stem, blanks: [{ kind: 'en', answer }], explain, audio: { text: audio } });

Content.section({
  id: 'english/sh2022/g6s1/4.3',
  title: 'Sports — 语音与听力 ----- 字母组合 ei、ea、ee 的读音、听运动与频率',
  review: { status: 'pending' },
  intro: [
    { title: 'ee 和 ea 常读 /iː/', body: '字母组合 ee 几乎都读长音 /iː/；ea 大多也读 /iː/。发 /iː/ 时嘴角向两边拉开，声音拖长一点。', example: 'see，green，sweet（ee）；sea，speak，beach（ea）', pitfall: 'ea 有时读短音 /e/，如 head；少数读 /eɪ/，如 steak。' },
    { title: 'ei 常读 /eɪ/', body: '字母组合 ei 常读 /eɪ/，和字母 A 的名称音一样；少数词里读 /aɪ/ 或 /iː/，要一个一个记。', example: 'eight，weigh（/eɪ/）', pitfall: '/eɪ/ 是从 /e/ 滑向 /ɪ/ 的双元音，不要读成一个短音。' },
    { title: '听运动与频率', body: '听别人谈运动习惯时，抓住三样信息：谁（人名、家人）、什么运动（play / go / do 后面的词）、多经常（always、often、never 等）。', example: 'Mike always does sit-ups before bed. → Mike，sit-ups，always' },
  ],
  questions: [
    soundQ643('4.3-b01', 'basic', 'In which word do the letters “ea” sound like the “ee” in “feet”?', ['bread', 'sweater', 'meat', 'great'], 2, ['feet 里的 ee 读 /iː/。', 'meat 的 ea 也读 /iː/；bread、sweater 的 ea 读 /e/，great 的 ea 读 /eɪ/。']),
    soundQ643('4.3-b02', 'basic', 'Listen and choose the word you hear.', ['sheep', 'ship', 'shop', 'shape'], 0, ['听到的元音是长音 /iː/。', 'ship 是短音 /ɪ/，shop 是 /ɒ/，shape 是 /eɪ/。'], 'sheep'),
    soundQ643('4.3-b03', 'basic', 'Listen and choose the word you hear.', ['time', 'tame', 'team', 'term'], 2, ['听到的元音是 /iː/，拼写是 ea。', 'time 是 /aɪ/，tame 是 /eɪ/，term 是 /ɜː/。'], 'team'),
    soundQ643('4.3-b04', 'basic', 'In which word do the letters “ei” sound like the “ay” in “day”?', ['ceiling', 'neighbour', 'receive', 'either'], 1, ['day 里的 ay 读 /eɪ/。', 'neighbour 的 ei 读 /eɪ/；ceiling、receive 的 ei 读 /iː/，either 读 /aɪ/ 或 /iː/。']),
    soundQ643('4.3-e01', 'extended', 'Which word has a DIFFERENT sound for the letters “ea”?', ['sea', 'leaf', 'break', 'clean'], 2, ['sea、leaf、clean 的 ea 都读 /iː/。', 'break 的 ea 读 /eɪ/，和其他三个不同。']),
    soundQ643('4.3-e02', 'extended', 'Listen. What sport does Ben often play?', ['tennis', 'swimming', 'football', 'badminton'], 0, ['抓住 often 后面的运动：often plays tennis。', 'swimming 前面是 sometimes，不是 often。'], 'Ben often plays tennis with his dad, and he sometimes goes swimming.'),
    soundQ643('4.3-e03', 'extended', 'Listen. Who goes jogging with Kate?', ['her brother', 'her grandpa', 'her dad', 'her friend'], 1, ['听到 Her grandpa goes with her。', '她哥哥 never gets up early，所以不和她一起跑。'], 'Kate goes jogging every morning. Her grandpa goes with her, but her brother never gets up early.'),
    writeQ643('4.3-e04', 'extended', 'Listen and write the missing word: My ___ hurts after the race.', 'knee', ['听到的元音是 /iː/，词首的 k 不发音。', '膝盖是 knee，拼写是 k-n-e-e。'], 'My knee hurts after the race.'),
    writeQ643('4.3-c01', 'challenge', 'Listen and write the whole sentence.', ["She's never late for team practice.", 'She is never late for team practice.', 'She’s never late for team practice.'], ['先记关键词：never、late、team practice。', '频度副词 never 放在 be 动词后面；句首大写，句末用句号。'], "She's never late for team practice."),
    soundQ643('4.3-c02', 'challenge', 'Listen. What is wrong with the boy?', ['His leg hurts.', 'His arm hurts.', 'He is hungry.', 'He has a headache.'], 0, ['男孩说 I fell in the relay race. My leg hurts.', '对话里说的是腿疼，没有提到手臂、饿或头疼。'], "— Are you okay, Tom? You look sad. — I fell in the relay race. My leg hurts. — Oh no! I'll take you to the school nurse."),
  ],
});
