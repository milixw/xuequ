'use strict';

// 原 PDF 解析为“无”的题目：仅补写讲解，不改变原题、答案、来源或 ID。
(function (root) {
  const either = '第一空：of the two buses 表示两辆车中的任意一辆，用 either；either 作主语时与 Does 搭配。第二空：not ... either of them 表示“两者中的任何一个都不”，对应“两辆车都不能到”。故选 C。\n易错：both 指两者都，不能与单数助动词 Does 直接搭配；none 通常用于三个或以上，谈两者时用 neither 或 not ... either。';
  const prefer = '第 1 小题：prefer A to B 表示“比起 B 更喜欢 A”，to 是介词，选 A。\n第 2 小题：prefer doing to doing 的两个动作形式一致，介词 to 后用动名词 doing，选 A。\n第 3 小题：prefer to do rather than do 表示“宁愿做前者而不愿做后者”，rather than 后与前面的不定式并列，通常省略 to，选 B。\n易错：prefer doing to doing 中的 to 是介词；prefer to do 中的 to 是不定式标记，不能混用。';
  const ing = '第 1 小题：a swimming pool 中 swimming 修饰名词 pool，表示用途“供游泳用的”，作定语，选 A。\n第 2 小题：a falling leaf 中 falling 修饰 leaf，表示“一片正在落下的树叶”，作定语，选 A。\n第 3 小题：finish doing sth 表示“完成做某事”，building the dam 是动词 finish 的宾语，选 B。\n易错：不能只看 -ing 就判断成同一种用法；先看它修饰的是名词，还是接在动词后充当宾语。';
  const when = '判断为错误，选 B。decide 后可以接“疑问词 + to do”结构，when to do it 表示“什么时候做这件事”。原句的 when doing it 不能在这里充当 decided 的宾语。正确表达为 I haven’t decided when to do it.\n易错：when doing 可以用于省略后的时间状语，例如 Be careful when crossing the road，但不能把这种状语用法直接搬到 decide 的宾语中。';
  const finite = '判断为“否”，选 B。is speaking 是现在进行时的谓语结构，由 be 动词 is 和现在分词 speaking 共同构成，可以表示主语正在做的动作。\n易错：speaking 单独看是 -ing 形式，但本题给出的整个结构是 is speaking，不能因为看见 -ing 就把完整谓语判断为非谓语。';
  const explanations = {
    'xdf-4ad86797f2bb9b48': either,
    'xdf-ce60dfca0699ee10': prefer,
    'xdf-7e55185ac3f42b0c': ing,
    'xdf-717cb760e1a4a15a': when,
    'xdf-9cddbbea17dd3f98': finite,
    'xdf-c50a88a18b14a5ed': when,
    'xdf-34b229509c9a7033': ing,
    'xdf-5a7a5af879a2aa0f': prefer,
    'xdf-e9254e8134ec7194': '句意：除非她坚持控制饮食并每天锻炼，否则她不会减重。unless 表示“除非”，相当于 if ... not，故选 A。主句的 won’t 与 unless 从句组合表示“如果不满足条件，就不会有结果”。\n易错：if she keeps ... 表示“如果她坚持……”，与主句“不会减重”的逻辑不符；because / since 表示原因，也不符合这里的必要条件关系。unless 从句通常不再重复加 not。',
    'xdf-ebc76686adbbe0b0': '句意：亨利一把电脑连接到 Wi-Fi 网络就会开始报告。as soon as 表示“一……就……”，引导时间状语从句。主句用 will start 表将来，从句用一般现在时表示将来的动作；he 是第三人称单数，connect 加 -s，故选 A。\n易错：不能因动作发生在将来，就在时间状语从句里选 will connect；connected 是过去时，is connecting 是现在进行时，均不符合本题的时态关系。',
  };
  const supplements = Object.fromEntries(Object.entries(explanations).map(([id, explanation]) =>
    [id, { explanation, review: { status: 'pending' }, source: 'ai-supplement' }]));
  const day2 = {
    'xdf-174514d71a33f174': '第1题选C：任务明确要求查找 George Washington 的资料。第2题选B：作者最终通过掷硬币决定报告对象。第3题选D：作者误解了作业要求，把两位人物混淆。第4题选A：失败后作者把精力投入余下学年的学习，努力证明能力。第5题选C：作者分不清美国历史人物，可推断他当时对美国历史了解较少。参考答案与同篇同选项的本地原资料核对；本段解析由 AI 编写，待教师审核。',
    'xdf-eb7c5953f169a6b9': '第1题选B：文章明确写建长城是为了保护国家免受敌人侵扰。第2题选C：文中长度为约21,196千米。第3题选B：古代工人用手搬运石块和砖。第4题选B：文章说长城如今是著名旅游景点，本题问现在的用途与身份。第5题选C：末段要求保护长城并把其文化传给后代。参考答案按同篇同选项的本地原资料核对；本段讲解由 AI 编写，待教师审核。',
    'xdf-b52f20ae6ca31f0b': '第1题选A：陆巷建于南宋，文中给出1127～1279年，当时有许多名人居住。第2题选C：陆巷以碧螺春闻名。第3题选C：胡夫建造胡夫大金字塔作为陵墓。第4题选B：当时没有现代机器和设备，如何建成仍是谜。第5题选D：文章明确说大金字塔在19世纪被视为独特建筑。答案与同篇同选项的本地原资料核对；本段讲解由 AI 编写，待教师审核。',
    'xdf-aec340312b9fcc38': '六空依次选C、A、B、D、C、A。第1空：it is important to do，形容词作表语。第2空：how to keep things clean，表示怎样保持清洁。第3空：make cooking easier，形容词比较级作宾补。第4空：while you cook，一般现在时表示做饭时。第5空：为避免病菌，每次做饭前都要洗手，用 Always。第6空：learn something 表示学习一些厨房安全知识。答案和本段讲解由 AI 按上下文与语法推断，待教师审核。',
    'xdf-38f89d8d6919cf33': '选B。make progress in doing sth 表示“在做某事方面取得进步”。progress 是不可数名词，因此可用 much 修饰。题干说 Jolin 多年来在成为优秀舞者和表演者方面取得进步，符合 made much progress in becoming 的表达。advantage 表示优势，opinion 表示观点，conclusion 表示结论，均不符合本题搭配与语境。答案及讲解由 AI 按语法与上下文推断，待教师审核。',
    'xdf-87772dea64f62aae': '选 B。In the past 10 years 表示“在过去十年里”，通常与现在完成时搭配，描述从过去延续到现在的变化。现在完成时的结构是 have/has + 过去分词。主语 the life of ordinary people 的中心词是单数 life，of ordinary people 只是修饰语，因此用 has changed，不能因为 people 是复数就选 have changed。changed 是一般过去时，had changed 是过去完成时，本句没有相应的过去时间基准。答案由 AI 按语法推断，待教师审核。',
    'xdf-470051960705e642': '选 A。in time 表示“及时、来得及”，in time to do sth 表示“及时做某事”。前面说今天起晚了，但跑到公交站后还是来得及赶上早班车，所以用 just in time to catch the early bus，意思是“刚好及时赶上早班车”。on time 表示“按预定时间、准时”，侧重是否符合时间安排，不表达本题强调的险些错过但赶上的语境。in the time 和 on the time 均不是此处的固定表达。答案由 AI 按语法与语境推断，待教师审核。',
    'xdf-c550f29bd72d5dce': '选 D。第一空位于 some 与 ways 之间，other 作形容词修饰复数名词 ways，some other ways 表示“一些其他方法”。others 是代词，不能再修饰 ways；another 通常接单数可数名词。第二空指山的另一侧，用 the other side，表示两侧中的另一侧；other side 在这里缺少限定词。完整表达是 some other ways ... to the other side of the mountain。答案由 AI 按语法推断，待教师审核。',
    'xdf-c68a76aa4cf169a6': '选 C。of the two buses 明确只涉及两辆车，either of the two buses 表示“两辆车中的任意一辆”，作主语时可搭配单数助动词 Does。第二空用 either：can’t ... by either of them 表示“两辆车中的任何一辆都不能乘坐去那里”。both 是复数意义，不符合第一空的 Does；none 通常用于三个或以上，本题谈两者，用 not ... either 表示两者都不。答案由 AI 按语法推断，待教师审核。',
    'xdf-035ded739f46e89f': '选 A。one after another 是固定表达，表示“一个接一个”。本句让袋鼠依次出去，强调连续的顺序。another 指接下来的另一个；other 通常不能单独充当这里的代词，the others 指剩下的全部，the other 指两者中的另一个，都不符合这个固定搭配。答案由 AI 按语法推断，原 PDF 未提供答案，待教师审核。',
    'xdf-68b4a75015e805bb': '选 C。比较的是“你的话”和“其他任何人的话”，后半句省略重复的 words，要用所有格 anybody else’s。else 修饰 anybody，整个 anybody else 的所有格在末尾加 ’s。A 缺少“其他”的意思；B 错把所有格加在 anybody 上；D 的 elses’ 不是正确形式。答案由 AI 按语法推断，原 PDF 未提供答案，待教师审核。',
    'xdf-df644f0adf5ea0d7': '选 C。words 是可数名词复数，应由 few 或 a few 修饰，不能用修饰不可数名词的 little 或 a little。a man of few words 表示“寡言的人”，few 强调很少，带否定意味；a few 强调还有一些。后面 seldom goes out 的语境也符合题目对寡言人物的描述。答案由 AI 按语法推断，原 PDF 未提供答案，待教师审核。',
    'xdf-70fcc7b611825989': '选 C。按通常题意，刘翔是中国运动员，不属于美国运动员这一比较范围，因此用 any athlete，表示比该范围中任何一名运动员都快。any other athlete 用于主语属于同一比较范围时，other 排除主语自身。any 在这种比较表达中接单数 athlete。本题是在练比较范围，并非核实真实比赛成绩。答案由 AI 按通常语境推断，待教师审核。',
    'xdf-52ff904271b0c8f9': '选 D。共有三本书，one 指其中一本，剩下两本全部是法语书，用 the others，表示限定范围内“其余全部”。others 泛指另一些，不强调全部剩余；the other 通常指两者中的另一者，单数不能与 are 搭配；another 指另一本，也不能作这里的复数主语。答案由 AI 按语法推断，原 PDF 未提供答案，待教师审核。',
    'xdf-e20636e50a5e4d34': '选 B。some ... others ... 表示“一些……另一些……”，不要求把所有人恰好分成两组。本句泛指一些男生喜欢跑步或游泳，另一些喜欢球类运动，用 others 作复数主语。the others 强调剩余的全部，题干没有明确这种穷尽分组；the other 是单数，other 不能单独代替这些复数的人。答案由 AI 按通常题意推断，待教师审核。',
    'xdf-9023b30e443ef0b6': '选 D。neither side 表示双方中的任何一方都不，已经限定为两方；give way to the other 表示“向另一方让步”。another 指不限定范围的另一个，other 在这里不能单独作代词，any other 缺少明确的两方对应关系。本句是说双方都不肯向对方让步，所以未达成协议。答案由 AI 按语法推断，原 PDF 未提供答案，待教师审核。',
  };
  for (const [id, explanation] of Object.entries(day2)) supplements[id] = {
    explanation, review: { status: 'pending' }, source: 'ai-supplement',
  };
  if (typeof module !== 'undefined') module.exports = supplements;
  else root.EnglishExplanationSupplements = supplements;
})(this);
