'use strict';

// 六上 Unit 2 语音与听力：课本 Sound 栏目“Letters a and e”（第 29 页、Sound file 第 111 页）和“听家庭关系”技能，题目均为原创。
// 带 audio 的题由设备朗读（src/speech.js）；不能朗读时页面直接显示听力原文。
const soundQ623 = (id, level, stem, options, answer, explain, audio) =>
  ({ id, level, type: 'choice', stem, options, answer, explain, ...(audio ? { audio: { text: audio } } : {}) });
const writeQ623 = (id, level, stem, answer, explain, audio) =>
  ({ id, level, type: 'fill', stem, blanks: [{ kind: 'en', answer }], explain, audio: { text: audio } });

Content.section({
  id: 'english/sh2022/g6s1/2.3',
  title: 'Family ties — 语音与听力 ----- 字母 a、e 的读音、听家庭关系',
  review: { status: 'pending' },
  intro: [
    { title: '字母 a 的常见读音', body: '在“a + 一个辅音字母 + 不发音的 e”里，a 读字母名称的音 /eɪ/；在 a 后面跟辅音结尾的短词里，a 常读嘴张大的 /æ/；有些词里读长音 /ɑː/。', example: 'cake，game（/eɪ/）；bag，hat（/æ/）；fast，dark（/ɑː/）', pitfall: '同一个字母有几种读音，先看单词结构，拿不准就查音标。' },
    { title: '字母 e 的常见读音', body: '在 he、we 这样的短词或“e + 辅音字母 + e”里，e 读长音 /iː/；在 e 后面跟辅音结尾的短词里，e 读短音 /e/；不重读时常读轻轻的 /ə/。', example: 'we，Chinese（/iː/）；desk，ten（/e/）', pitfall: '/e/ 和 /æ/ 很像：说 /æ/ 时嘴要张得更大，比如 pen 和 pan。' },
    { title: '听家庭关系', body: '听介绍家人的话时，先抓称呼词（aunt、cousin、uncle），再听 ’s 后面的词：my mum’s brother 就是 my uncle。可以边听边画家谱树。', example: 'Jack is my mum’s brother. → Jack is my uncle.' },
  ],
  questions: [
    soundQ623('2.3-b01', 'basic', 'In which word does the letter “a” sound like the “a” in “name”?', ['cat', 'lake', 'hand', 'map'], 1, ['name 里的 a 读 /eɪ/。', 'lake 也是“a + 辅音字母 + e”的结构，读 /eɪ/；其他三个词的 a 读 /æ/。']),
    soundQ623('2.3-b02', 'basic', 'In which word does the letter “e” sound like the “e” in “he”?', ['bed', 'red', 'she', 'pen'], 2, ['he 里的 e 读长音 /iː/。', 'she 和 he 结构一样，读 /iː/；bed、red、pen 的 e 后面跟辅音，读短音 /e/。']),
    soundQ623('2.3-b03', 'basic', 'Listen and choose the word you hear.', ['bag', 'beg', 'big', 'bug'], 0, ['听到的元音是嘴张大的 /æ/。', 'beg 是 /e/，big 是 /ɪ/，bug 是 /ʌ/。'], 'bag'),
    soundQ623('2.3-b04', 'basic', 'Listen and choose the word you hear.', ['man', 'men', 'mean', 'main'], 1, ['听到的元音是短音 /e/。', 'man 是 /æ/（嘴张得更大），mean 是 /iː/，main 是 /eɪ/。'], 'men'),
    soundQ623('2.3-e01', 'extended', 'Which word has a DIFFERENT sound for the letter “a”?', ['flag', 'apple', 'plane', 'hat'], 2, ['flag、apple、hat 的 a 读 /æ/。', 'plane 是“a + 辅音字母 + e”，a 读 /eɪ/，和其他三个不同。']),
    soundQ623('2.3-e02', 'extended', 'Listen. Who is Tina to the speaker?', ['my aunt', 'my cousin', 'my sister', 'my grandma'], 0, ["抓关键词：my mother's sister。", '妈妈的姐妹就是 aunt（姨妈）。'], "Tina is my mother's sister. She lives in Hangzhou."),
    soundQ623('2.3-e03', 'extended', 'Listen. What is Grandpa doing?', ['He is cooking.', 'He is reading a newspaper.', 'He is playing chess.', 'He is sleeping.'], 1, ['听 is 后面的 -ing 动词：sitting 和 reading。', '他坐在花园里看报纸，所以选 B。'], 'Grandpa is sitting in the garden and reading a newspaper.'),
    writeQ623('2.3-e04', 'extended', 'Listen and write the missing word: My cousin is ___ the guitar in her room.', 'playing', ['空格在 is 后面，要填动词的 -ing 形式。', '听到的是 playing：play 直接加 -ing。'], 'My cousin is playing the guitar in her room.'),
    writeQ623('2.3-c01', 'challenge', 'Listen and write the whole sentence.', ['My dad is making a cake.', "My dad's making a cake."], ['先记下关键词 dad、making、cake。', '现在进行时别漏掉 is；make 去 e 加 -ing；句首大写，句末用句号。'], 'My dad is making a cake.'),
    soundQ623('2.3-c02', 'challenge', 'Listen. How is Ben related to Amy?', ['He is her brother.', 'He is her cousin.', 'He is her uncle.', 'He is her father.'], 1, ["抓关键词：the son of Amy's uncle。", '舅舅（叔叔）的儿子和 Amy 是同辈的亲戚，也就是 cousin。'], "Ben is the son of Amy's uncle."),
  ],
});
