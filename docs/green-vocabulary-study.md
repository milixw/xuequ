# 绿本词汇专项约定

页面 `content/english/green-vocabulary-study.html` 用本地script加载 `content/english/green-vocabulary-study-data.js` 和 `src/vocabulary-study.js`，从英语词汇总表三条链接进入。无需构建、联网、fetch或账号；不修改原词表、ID、判分及任何进度键。

内容为39组词义辨析（参考PDF309—329页范围）、24组固定搭配与同义句转换（参考相关词条/词组及名师点拨）、104个不规则动词和5条情态/助动词提醒（PDF356—359页）。原书解释、例题和插图不整体搬入，讲解、双语例句与24道自查练习原创；全体review为pending，页面显示待英语教师审核。练习答案仅自查，不按字符串相等评分，不记录学生进度；切标签/搜索通过隐藏卡片保留输入，刷新不保存。

辨析词条ID `green-confusable-<两位序号>`、转换ID `green-pattern-<两位序号>`、动词ID `green-verb-<词头>`，发布后保持。各记录保存PDF源页；第31组work/job与OCR漏字页已对照原图确认，不凭前后顺序猜题型。常见陷阱要写清范围：-ing/-ed形容词不按人/物机械区分，after不只过去时，方位介词要核对内外及相邻，词义近似不保证句型可替换。转换涉及主语、人称、时态、代词和逻辑条件都应明确。

不规则动词按实际拼写组合分类，read字形为AAA但读音变化；get、strike、fit等多写法可以匹配多组，不能以组别代替用法判断。hang的hung/hanged、bear的born/borne、lie与lay分别说明含义。情态/助动词另列相关形式，不编造普通动词的过去分词。表格在手机可横向滚动，不造成整页横向溢出。

页面本地hash `#confusables`、`#patterns`、`#verbs` 对应三个标签，浏览器回退可按hash定位。没有新增本地存储键。来源范围来自用户提供的2025手册，不宣称已核实的官方考纲。

`tests/green-vocabulary-study.test.js` 校验记录数量、范围、稳定编号、审核状态、关键转换条件、动词形态和实际字形分类、安全转义以及三项离线接入。运行 `node tests/run.js`；浏览器额外验证手机、搜索、类型筛选、参考答案默认折叠、输入切换保留和返回词汇页。
