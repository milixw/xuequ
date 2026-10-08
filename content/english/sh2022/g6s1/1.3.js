'use strict';

// 六上 Unit 1 语音与听力：课本 Sound 栏目“Letter i”（第 14 页、Sound file 第 111 页）和“听关键词”技能，题目均为原创。
// 带 audio 的题由设备朗读（src/speech.js）；不能朗读时页面直接显示听力原文。
const soundQ613 = (id, level, stem, options, answer, explain, audio) =>
  ({ id, level, type: 'choice', stem, options, answer, explain, ...(audio ? { audio: { text: audio } } : {}) });
const writeQ613 = (id, level, stem, answer, explain, audio) =>
  ({ id, level, type: 'fill', stem, blanks: [{ kind: 'en', answer }], explain, audio: { text: audio } });

Content.section({
  id: 'english/sh2022/g6s1/1.3',
  title: 'School life — 语音与听力 ----- 字母 i 的读音、听关键词',
  review: { status: 'pending' },
  intro: [
    { title: '字母 i 读 /aɪ/', body: '在“i + 一个辅音字母 + 不发音的 e”这样的词里，i 常常读它在字母表里的名字 /aɪ/，和 hi 里的 i 一样。', example: 'nine，ride，slide', pitfall: '词尾的 e 不发音，但它让前面的 i 读 /aɪ/。' },
    { title: '字母 i 读 /ɪ/', body: '在 i 后面跟辅音字母、词尾没有 e 的短词里，i 常读短而轻的 /ɪ/，和 history 里的 i 一样。', example: 'sit，milk，swim', pitfall: '也有例外：give、live（居住）虽然以 e 结尾，i 却读 /ɪ/，要单独记。' },
    { title: '听关键词', body: '听一段话时不必每个词都听懂，先抓住名词和动词这些关键词，再判断说的是什么场合、什么课。可以多听几遍，每遍关注不同的词。', example: 'Clap your hands to the beat and sing after me. → beat、sing 说明这是音乐课。' },
  ],
  questions: [
    soundQ613('1.3-b01', 'basic', 'In which word does the letter “i” sound like the “i” in “time”?', ['big', 'kite', 'gift', 'hill'], 1, ['time 里的 i 读 /aɪ/。', 'kite 是“i + 辅音字母 + e”的结构，i 也读 /aɪ/；其他三个词的 i 读 /ɪ/。']),
    soundQ613('1.3-b02', 'basic', 'In which word does the letter “i” sound like the “i” in “fish”?', ['bike', 'line', 'drink', 'smile'], 2, ['fish 里的 i 读 /ɪ/。', 'drink 的 i 后面是辅音、词尾没有 e，读 /ɪ/；其他三个词都以不发音的 e 结尾，读 /aɪ/。']),
    soundQ613('1.3-b03', 'basic', 'Listen and choose the word you hear.', ['ship', 'sheep', 'shop', 'shape'], 0, ['听到的元音是短而轻的 /ɪ/。', 'sheep 是长音 /iː/，shop 是 /ɒ/，shape 是 /eɪ/。'], 'ship'),
    soundQ613('1.3-b04', 'basic', 'Listen and choose the word you hear.', ['write', 'white', 'wait', 'wide'], 0, ['听到的是 /raɪt/，开头是 /r/ 音。', 'write 的 w 不发音；white 开头是 /w/，wait 的元音是 /eɪ/，wide 结尾是 /d/。'], 'write'),
    soundQ613('1.3-e01', 'extended', 'Which word has a DIFFERENT sound for the letter “i”?', ['five', 'rice', 'give', 'wife'], 2, ['five、rice、wife 都是“i + 辅音字母 + e”，i 读 /aɪ/。', 'give 是例外，i 读 /ɪ/，所以它和其他三个不同。']),
    soundQ613('1.3-e02', 'extended', 'Listen to the teacher. What lesson are the students having?', ['Art', 'Maths', 'PE', 'History'], 0, ['抓关键词：brushes（画笔）、mix、paint（颜料）。', '用画笔调颜料是美术课的活动。'], 'Put your brushes in the water and mix the blue and yellow paint.'),
    soundQ613('1.3-e03', 'extended', 'Listen to the teacher. What lesson are the students having?', ['Music', 'PE', 'Geography', 'Science'], 1, ['抓关键词：stand in a line、bounce the ball（拍球）、pass it（传球）。', '这些都是体育课上的动作。'], 'Stand in a line, bounce the ball five times and then pass it to your partner.'),
    writeQ613('1.3-e04', 'extended', 'Listen and write the missing word: Our science club meets every ___.', 'Tuesday', ['听清 every 后面的时间词：Tuesday。', '星期的首字母要大写，拼写注意 Tues- 中的 u 和 e。'], 'Our science club meets every Tuesday.'),
    writeQ613('1.3-c01', 'challenge', 'Listen and write the whole sentence.', ['My school day starts at eight.', 'My school day starts at 8.'], ['先听整句，记下关键词 school day、starts、eight。', '主语 my school day 是单数，动词 starts 要加 -s；句首大写，句末用句号。'], 'My school day starts at eight.'),
    soundQ613('1.3-c02', 'challenge', 'Listen. What does the boy want to know?', ['where the chess club meets', 'how to join the chess club', 'who teaches chess', 'when the chess club starts'], 1, ['先听礼貌用语 Excuse me，后面才是真正的问题。', '关键词是 How can I join，他想知道怎样加入象棋社。'], 'Excuse me, Mr Gao. How can I join the chess club?'),
  ],
});
