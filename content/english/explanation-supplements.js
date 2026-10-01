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
  if (typeof module !== 'undefined') module.exports = supplements;
  else root.EnglishExplanationSupplements = supplements;
})(this);
