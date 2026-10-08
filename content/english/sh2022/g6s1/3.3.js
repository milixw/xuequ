'use strict';

// 六上 Unit 3 语音与听力：课本 Sound 栏目“Letters o and u”（第 43 页、Sound file 第 111 页）和“听数量”技能，题目均为原创。
// 带 audio 的题由设备朗读（src/speech.js）；不能朗读时页面直接显示听力原文。
const soundQ633 = (id, level, stem, options, answer, explain, audio) =>
  ({ id, level, type: 'choice', stem, options, answer, explain, ...(audio ? { audio: { text: audio } } : {}) });
const writeQ633 = (id, level, stem, answer, explain, audio) =>
  ({ id, level, type: 'fill', stem, blanks: [{ kind: 'en', answer }], explain, audio: { text: audio } });

Content.section({
  id: 'english/sh2022/g6s1/3.3',
  title: 'Food — 语音与听力 ----- 字母 o、u 的读音、听数量',
  review: { status: 'pending' },
  intro: [
    { title: '字母 o 的常见读音', body: '在“o + 一个辅音字母 + 不发音的 e”里，o 读字母名称的音 /əʊ/；在 o 后面跟辅音结尾的短词里，o 常读短音 /ɒ/；不重读时读轻轻的 /ə/。', example: 'nose，bone（/əʊ/）；box，lot（/ɒ/）', pitfall: 'come、love 是例外，o 读 /ʌ/。' },
    { title: '字母 u 的常见读音', body: '在“u + 一个辅音字母 + 不发音的 e”里，u 常读 /juː/；在 u 后面跟辅音结尾的短词里，u 常读 /ʌ/；还有些词里读 /ʊ/。', example: 'tune，cube（/juː/）；fun，mud（/ʌ/）；put，full（/ʊ/）', pitfall: '/ʌ/ 嘴巴放松、稍微张开；/ʊ/ 嘴唇要收圆。' },
    { title: '听数量', body: '听购物、做菜的话时，重点听数字和数量词：a few、a little、a lot of、two bottles of。边听边记数字，比记整句更快。', example: 'Please buy four cartons of milk. → 4 cartons' },
  ],
  questions: [
    soundQ633('3.3-b01', 'basic', 'In which word does the letter “o” sound like the “o” in “home”?', ['hot', 'rope', 'dog', 'clock'], 1, ['home 里的 o 读 /əʊ/。', 'rope 也是“o + 辅音字母 + e”的结构，读 /əʊ/；hot、dog、clock 的 o 读 /ɒ/。']),
    soundQ633('3.3-b02', 'basic', 'In which word does the letter “u” sound like the “u” in “cup”?', ['cute', 'tube', 'sun', 'use'], 2, ['cup 里的 u 读 /ʌ/。', 'sun 的 u 后面跟辅音、没有词尾 e，也读 /ʌ/；cute、tube、use 读 /juː/。']),
    soundQ633('3.3-b03', 'basic', 'Listen and choose the word you hear.', ['cut', 'cat', 'cute', 'cot'], 0, ['听到的元音是 /ʌ/。', 'cat 是 /æ/，cute 是 /juː/，cot 是 /ɒ/。'], 'cut'),
    soundQ633('3.3-b04', 'basic', 'Listen and choose the word you hear.', ['hop', 'hope', 'hip', 'heap'], 1, ['听到的元音是 /əʊ/。', 'hope 的词尾 e 让 o 读 /əʊ/；hop 是 /ɒ/，hip 是 /ɪ/，heap 是 /iː/。'], 'hope'),
    soundQ633('3.3-e01', 'extended', 'Which word has a DIFFERENT sound for the letter “u”?', ['bus', 'duck', 'huge', 'lunch'], 2, ['bus、duck、lunch 的 u 读 /ʌ/。', 'huge 是“u + 辅音字母 + e”，u 读 /juː/。']),
    soundQ633('3.3-e02', 'extended', 'Listen. How many eggs does Mum need?', ['two', 'four', 'six', 'eight'], 2, ['只听 eggs 前面的数字：six。', 'a little milk 是另一种材料，不影响答案。'], 'Mum needs six eggs and a little milk for the pancakes.'),
    soundQ633('3.3-e03', 'extended', 'Listen. What does the girl want to buy?', ['a bottle of milk and two pears', 'a bottle of orange juice and two apples', 'two bottles of juice and an apple', 'a bag of oranges'], 1, ['边听边记：a bottle of orange juice、two apples。', '选项里的数量和食物要同时对上。'], 'Can I have a bottle of orange juice and two apples, please?'),
    writeQ633('3.3-e04', 'extended', 'Listen and write the missing word: We need two ___ of rice.', 'bags', ['two 后面的量词要用复数。', '听到的是 bags：two bags of rice（两袋米）。'], 'We need two bags of rice.'),
    writeQ633('3.3-c01', 'challenge', 'Listen and write the whole sentence.', ["There's a little milk in the fridge.", 'There is a little milk in the fridge.'], ['先记关键词：a little、milk、fridge。', 'milk 不可数，用 a little，名词不加 -s；句首大写，句末用句号。'], "There's a little milk in the fridge."),
    soundQ633('3.3-c02', 'challenge', 'Listen. What is the first step?', ['boil the carrots', 'cut the carrots', 'wash the carrots', 'buy the carrots'], 2, ['听顺序词 First 后面的动作。', 'First, wash the carrots. 所以第一步是洗胡萝卜。'], 'First, wash the carrots. Then, cut them into small pieces. Finally, boil them for ten minutes.'),
  ],
});
