'use strict';

// 教材目录：学科 → 教材 → 册 → 章 → 节。只放元数据，小节内容在各自的文件里。
// ready: true 表示小节内容已经做好（content/<学科>/<教材>/<册>/<小节号>.js 存在）
// games：挂在这一节的动手玩游戏 ID（src/games/<ID>/，在应用内打开 #/g/<ID>）
//
// 学科上另有（首页学科卡片和学科页 #/subject/<学科ID> 都从这里生成，加学科、加入口只改这里）：
//   color      学科色：卡片、图标底色
//   resources  学科页里的入口，按 group 分组：practice 练习 / notes 资料 / exam 考试
//     { group, icon, title, desc, href }   icon 是一两个字的图标
//     stage: 'zhongkao'   中考类入口：六～八年级收进学科页底部的“中考专区”，九年级正常显示
//     from: '<学期ID>'     从哪个学期起显示（不写就是不限）
//     special             要页面代码接管的入口，出现条件和文字由对应模块决定：
//                         'exam' 小节测试（先登录）、'mock' 模拟考试（有私有资料才出现）、'textbook' 课本资料（口令解锁）
//   没有课本的学科 editions 写 []
// 顶层 games：首页“趣味玩法”和 #/games，subject 是所属学科（数学学科页的“玩法”组），from 同上

Content.catalog = {
  subjects: [
    {
      id: 'math',
      name: '数学',
      color: '#2f6fd6',
      resources: [
        { group: 'practice', icon: '测', title: '小节测试', desc: '按小节限时测试，交卷后看错题', href: '#/exam', special: 'exam' },
        { group: 'exam', icon: '模', title: '模拟考试', desc: '整卷限时做，交卷后看解析', href: '#/mock', special: 'mock' },
        { group: 'exam', icon: '真', title: '中考真题', desc: '上海历年原题', href: '#/shanghai-papers/math', stage: 'zhongkao' },
      ],
      editions: [
        {
          id: 'sh2024',
          name: '上海教育出版社 2024 版（五·四学制）',
          volumes: [
            {
              id: 'g6s1',
              name: '六年级上册',
              chapters: [
                {
                  no: 1,
                  title: '有理数',
                  sections: [
                    { no: '1.1', title: '有理数的引入', ready: true },
                    { no: '1.2', title: '有理数的加法与减法', ready: true },
                    { no: '1.3', title: '有理数的乘法与除法', ready: true },
                    { no: '1.4', title: '有理数的乘方', ready: true },
                    { no: '1.5', title: '有理数的混合运算', ready: true },
                  ],
                },
                {
                  no: 2,
                  title: '简单的代数式',
                  sections: [
                    { no: '2.1', title: '用字母表示数', ready: true },
                    { no: '2.2', title: '代数式与代数式的值', ready: true },
                    { no: '2.3', title: '一次式', ready: true, games: ['magic'] },
                  ],
                },
                {
                  no: 3,
                  title: '一元一次方程',
                  sections: [
                    { no: '3.1', title: '方程与列方程', ready: true },
                    { no: '3.2', title: '一元一次方程及其解法', ready: true, games: ['balance'] },
                    { no: '3.3', title: '一元一次方程的应用', ready: true },
                  ],
                },
                {
                  no: 4,
                  title: '线段与角',
                  sections: [
                    { no: '4.1', title: '线段', ready: true },
                    { no: '4.2', title: '角', ready: true },
                  ],
                },
              ],
            },
            {
              id: 'g6s2',
              name: '六年级下册',
              chapters: [
                {
                  no: 5,
                  title: '比与比例',
                  sections: [
                    { no: '5.1', title: '比、比例及其性质', ready: true },
                    { no: '5.2', title: '百分数', ready: true },
                  ],
                },
                {
                  no: 6,
                  title: '圆与扇形',
                  sections: [
                    { no: '6.1', title: '圆的周长与弧长', ready: true },
                    { no: '6.2', title: '圆与扇形的面积', ready: true },
                  ],
                },
                {
                  no: 7,
                  title: '可能性与统计图表',
                  sections: [
                    { no: '7.1', title: '随机现象及其结果的可能性', ready: true },
                    { no: '7.2', title: '数据的收集、整理与表达', ready: true },
                    { no: '7.3', title: '百分数的统计意义', ready: true },
                  ],
                },
                {
                  no: 8,
                  title: '圆柱与圆锥',
                  sections: [
                    { no: '8.1', title: '圆柱及其侧面展开图', ready: true },
                    { no: '8.2', title: '圆锥及其侧面展开图', ready: true },
                  ],
                },
                {
                  no: 9,
                  title: '二元一次方程组',
                  sections: [
                    { no: '9.1', title: '二元一次方程组的概念', ready: true },
                    { no: '9.2', title: '二元一次方程组的解法', ready: true },
                    { no: '9.3', title: '二元一次方程组的应用', ready: true },
                    { no: '9.4', title: '简单的三元一次方程组', ready: true },
                  ],
                },
              ],
            },
            {
              id: 'g7s1',
              name: '七年级上册',
              chapters: [
                {
                  no: 10,
                  title: '整式的加减',
                  sections: [
                    { no: '10.1', title: '整式', ready: true },
                    { no: '10.2', title: '合并同类项', ready: true },
                    { no: '10.3', title: '整式的加法和减法', ready: true },
                  ],
                },
                {
                  no: 11,
                  title: '整式的乘除',
                  sections: [
                    { no: '11.1', title: '整式的乘法', ready: true },
                    { no: '11.2', title: '乘法公式', ready: true },
                    { no: '11.3', title: '整式的除法', ready: true },
                  ],
                },
                {
                  no: 12,
                  title: '因式分解',
                  sections: [
                    { no: '12.1', title: '因式分解的意义', ready: true },
                    { no: '12.2', title: '因式分解的方法', ready: true },
                  ],
                },
                {
                  no: 13,
                  title: '分式',
                  sections: [
                    { no: '13.1', title: '分式及其性质', ready: true },
                    { no: '13.2', title: '分式的运算', ready: true },
                    { no: '13.3', title: '分式方程', ready: true },
                  ],
                },
                {
                  no: 14,
                  title: '图形的运动',
                  sections: [
                    { no: '14.1', title: '平移', ready: true },
                    { no: '14.2', title: '旋转', ready: true },
                    { no: '14.3', title: '轴对称', ready: true },
                    { no: '14.4', title: '中心对称', ready: true },
                  ],
                },
              ],
            },
            {
              id: 'g7s2',
              name: '七年级下册',
              chapters: [
                {
                  no: 15,
                  title: '一元一次不等式',
                  sections: [
                    { no: '15.1', title: '不等式及其性质', ready: true },
                    { no: '15.2', title: '一元一次不等式', ready: true },
                    { no: '15.3', title: '一元一次不等式组', ready: true },
                  ],
                },
                {
                  no: 16,
                  title: '相交线与平行线',
                  sections: [
                    { no: '16.1', title: '相交线', ready: true },
                    { no: '16.2', title: '平行线', ready: true },
                    { no: '16.3', title: '命题与证明', ready: true },
                  ],
                },
                {
                  no: 17,
                  title: '三角形',
                  sections: [
                    { no: '17.1', title: '三角形的有关概念', ready: true },
                    { no: '17.2', title: '三角形的内角和', ready: true },
                    { no: '17.3', title: '全等三角形及其性质', ready: true },
                    { no: '17.4', title: '三角形全等的判定', ready: true },
                  ],
                },
                {
                  no: 18,
                  title: '等腰三角形',
                  sections: [
                    { no: '18.1', title: '等腰三角形的性质', ready: true },
                    { no: '18.2', title: '等腰三角形的判定', ready: true },
                    { no: '18.3', title: '等边三角形', ready: true },
                    { no: '18.4', title: '线段的垂直平分线', ready: true, games: ['fermat'] },
                  ],
                },
              ],
            },
            {
              id: 'g8s1',
              name: '八年级上册',
              exams: [
                {
                  id: '2025-chongming-midterm',
                  title: '2025～2026 学年上海崇明区初二上学期期中数学试卷（九校联考）',
                  ready: true,
                  questionCount: 28,
                },
                {
                  id: '2025-hongkou-midterm',
                  title: '2025～2026 学年上海虹口区初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 27,
                },
                {
                  id: '2025-xuhui-midterm',
                  title: '2025～2026 学年上海徐汇区初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 32,
                },
                {
                  id: '2025-nanyang-midterm',
                  title: '2025～2026 学年上海徐汇区上海市南洋模范初级中学初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 25,
                },
                {
                  id: '2025-yangpu-midterm',
                  title: '2025～2026 学年上海杨浦区初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 25,
                },
                {
                  id: '2025-lansheng-midterm',
                  title: '2025～2026 学年上海杨浦区上海市民办兰生复旦中学初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 28,
                },
                {
                  id: '2025-qingpu-no1-midterm',
                  title: '2025～2026 学年上海青浦区上海市青浦区第一中学初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 28,
                },
                {
                  id: '2025-jianping-experimental-midterm',
                  title: '2025～2026 学年上海浦东新区上海市建平实验中学初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 28,
                },
                {
                  id: '2025-jinshan-midterm',
                  title: '2025～2026 学年上海金山区初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 28,
                },
                {
                  id: '2025-tianjiabing-midterm',
                  title: '2025～2026 学年上海静安区上海市田家炳中学初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 30,
                },
                {
                  id: '2025-putuo-midterm',
                  title: '2025～2026 学年上海普陀区初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 25,
                },
                {
                  id: '2025-songjiang-midterm',
                  title: '2025～2026 学年上海松江区初二上学期期中数学试卷',
                  ready: true,
                  questionCount: 29,
                },
              ],
              chapters: [
                {
                  no: 19,
                  title: '实数',
                  sections: [
                    { no: '19.1', title: '平方根与立方根', ready: true },
                    { no: '19.2', title: '实数', ready: true },
                  ],
                },
                {
                  no: 20,
                  title: '二次根式',
                  sections: [
                    { no: '20.1', title: '二次根式及其性质', ready: true },
                    { no: '20.2', title: '二次根式的运算', ready: true },
                  ],
                },
                {
                  no: 21,
                  title: '一元二次方程',
                  sections: [
                    { no: '21.1', title: '一元二次方程的概念', ready: true },
                    { no: '21.2', title: '一元二次方程的解法', ready: true },
                    { no: '21.3', title: '一元二次方程的判别式', ready: true },
                    { no: '21.4', title: '一元二次方程的根与系数的关系', ready: true },
                    { no: '21.5', title: '一元二次方程的应用', ready: true },
                  ],
                },
                {
                  no: 22,
                  title: '直角三角形',
                  sections: [
                    { no: '22.1', title: '直角三角形', ready: true },
                    { no: '22.2', title: '角平分线', ready: true },
                    { no: '22.3', title: '勾股定理', ready: true },
                  ],
                },
              ],
            },
            {
              id: 'g8s2',
              name: '八年级下册',
              chapters: [
                {
                  no: 23,
                  title: '四边形',
                  sections: [
                    { no: '23.1', title: '多边形', ready: true },
                    { no: '23.2', title: '平行四边形', ready: true },
                    { no: '23.3', title: '矩形、菱形与正方形', ready: true },
                    { no: '23.4', title: '三角形的中位线与重心', ready: true },
                  ],
                },
                {
                  no: 24,
                  title: '平面直角坐标系',
                  sections: [
                    { no: '24.1', title: '平面直角坐标系', ready: false },
                    { no: '24.2', title: '两点间的距离公式', ready: false },
                    { no: '24.3', title: '平移与轴对称', ready: false },
                  ],
                },
                {
                  no: 25,
                  title: '一次函数',
                  sections: [
                    { no: '25.1', title: '变量与函数', ready: false },
                    { no: '25.2', title: '正比例函数', ready: false },
                    { no: '25.3', title: '一次函数', ready: false },
                    { no: '25.4', title: '一次函数的应用', ready: false },
                  ],
                },
                {
                  no: 26,
                  title: '反比例函数',
                  sections: [
                    { no: '26.1', title: '反比例函数的概念', ready: false },
                    { no: '26.2', title: '反比例函数的图像与性质', ready: false },
                    { no: '26.3', title: '反比例函数的应用', ready: false },
                  ],
                },
              ],
            },
            {
              id: 'g9s1',
              name: '九年级上册',
              chapters: [
                {
                  no: 27,
                  title: '二次函数',
                  sections: [
                    { no: '27.1', title: '二次函数的概念', ready: true },
                    { no: '27.2', title: '二次函数的图像与性质', ready: true },
                    { no: '27.3', title: '确定二次函数的表达式', ready: true },
                    { no: '27.4', title: '二次函数与一元二次方程', ready: true },
                    { no: '27.5', title: '二次函数的简单应用', ready: true },
                  ],
                },
                {
                  no: 28,
                  title: '相似三角形',
                  sections: [
                    { no: '28.1', title: '成比例的线段', ready: true },
                    { no: '28.2', title: '相似三角形', ready: true },
                    { no: '28.3', title: '相似多边形', ready: true },
                    { no: '28.4', title: '位似多边形', ready: true },
                  ],
                },
                {
                  no: 29,
                  title: '三角初步',
                  sections: [
                    { no: '29.1', title: '锐角的正弦、余弦与正切', ready: false },
                    { no: '29.2', title: '解直角三角形', ready: false },
                  ],
                },
                {
                  no: 30,
                  title: '投影与视图',
                  sections: [
                    { no: '30.1', title: '投影', ready: false },
                    { no: '30.2', title: '三视图', ready: false },
                    { no: '30.3', title: '立体模型的制作', ready: false },
                  ],
                },
              ],
            },
          ],
        },
        {
          // 六年级衔接：新教材和小学教材之间的断层，学校 9 月仍用旧版沪教版六年级第一学期补课，只补第一、二章（数的整除、分数），之后回到新教材。
          // 册 ID 和新教材 6 上相同，首页选六年级上册时两张卡片并列。设计见 docs/superpowers/specs/2026-09-27-g6-bridge-design.md
          id: 'bridge',
          name: '衔接内容（旧版沪教版六年级第一学期）',
          volumes: [
            {
              id: 'g6s1',
              name: '六年级衔接',
              chapters: [
                {
                  no: 1,
                  title: '数的整除',
                  sections: [
                    { no: '1.1', title: '整数和整除的意义', ready: true },
                    { no: '1.2', title: '因数和倍数', ready: true },
                    { no: '1.3', title: '能被 2、5 整除的数', ready: true },
                    { no: '1.4', title: '素数、合数与分解素因数', ready: true },
                    { no: '1.5', title: '公因数与最大公因数', ready: true },
                    { no: '1.6', title: '公倍数与最小公倍数', ready: true },
                  ],
                },
                {
                  no: 2,
                  title: '分数',
                  sections: [
                    { no: '2.1', title: '分数与除法', ready: true },
                    { no: '2.2', title: '分数的基本性质', ready: true },
                    { no: '2.3', title: '分数的大小比较', ready: true },
                    { no: '2.4', title: '分数的加减法', ready: true },
                    { no: '2.5', title: '分数的乘法', ready: true },
                    { no: '2.6', title: '分数的除法', ready: true },
                    { no: '2.7', title: '分数与小数的互化', ready: true },
                    { no: '2.8', title: '分数、小数的四则混合运算', ready: true },
                    { no: '2.9', title: '分数运算的应用', ready: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'english',
      name: '英语',
      color: '#3f9a5a',
      resources: [
        { group: 'practice', icon: '词', title: '英语单词', desc: '每天 10 分钟背课本单词', href: '#/words' },
        { group: 'practice', icon: '题', title: '英语试题库', desc: '按知识点和题型练错题', href: '#/english-bank' },
        { group: 'practice', icon: '7', title: '七天复习计划', desc: '每天一组原题，错题可以打印重做', href: '#/english-plan' },
        { group: 'practice', icon: '测', title: '小节测试', desc: '按小节限时测试，交卷后看错题', href: '#/exam', special: 'exam' },
        { group: 'notes', icon: 'Aa', title: '英语学习大纲', desc: '上海初中英语知识点梳理', href: 'content/english/shanghai-junior-outline.html' },
        { group: 'notes', icon: '🔑', title: '课本资料', desc: '各册课本录音和课文原文', href: '#/textbook', special: 'textbook' },
        { group: 'notes', icon: '汇', title: '中考词汇表', desc: '上海中考英语单词和短语', href: 'content/english/shanghai-exam-vocabulary.html', stage: 'zhongkao' },
        { group: 'exam', icon: '模', title: '模拟考试', desc: '整卷限时做，交卷后看解析', href: '#/mock', special: 'mock' },
        { group: 'exam', icon: '真', title: '中考真题', desc: '上海历年原题，另有江苏', href: '#/english-exams', stage: 'zhongkao' },
      ],
      editions: [{
        id: 'sh2022',
        name: '上海教育出版社新版（五·四学制，2022 版课标）',
        volumes: [{
          id: 'g6s1',
          name: '六年级上册',
          words: 'content/english/words/sh2022-g6s1.js',  // 单元词表（src/words.js），目前有 Unit 1～4
          chapters: [
            { no: 1, title: 'School life（学校生活）', sections: [
              { no: '1.1', title: '阅读与语法 ----- 一般现在时', ready: true },
              { no: '1.2', title: '语法练习 ----- 一般现在时', ready: true },
              { no: '1.3', title: '语音与听力 ----- 字母 i 的读音、听关键词', ready: true },
            ] },
            { no: 2, title: 'Family ties（家庭纽带）', sections: [
              { no: '2.1', title: '阅读与语法 ----- 现在进行时', ready: true },
              { no: '2.2', title: '语法练习 ----- 现在进行时与人称代词', ready: true },
              { no: '2.3', title: '语音与听力 ----- 字母 a、e 的读音、听家庭关系', ready: true },
            ] },
            { no: 3, title: 'Food（食物）', sections: [
              { no: '3.1', title: '阅读与语法 ----- 可数名词与不可数名词', ready: true },
              { no: '3.2', title: '语法练习 ----- 可数名词与不可数名词', ready: true },
              { no: '3.3', title: '语音与听力 ----- 字母 o、u 的读音、听数量', ready: true },
            ] },
            { no: 4, title: 'Sports（体育运动）', sections: [
              { no: '4.1', title: '阅读与语法 ----- 疑问词 what、who', ready: true },
              { no: '4.2', title: '语法练习 ----- 疑问词 what、who 与频度副词', ready: true },
              { no: '4.3', title: '语音与听力 ----- 字母组合 ei、ea、ee 的读音、听运动与频率', ready: true },
            ] },
            { no: 5, title: 'Animals and us（动物与我们）', sections: [] },
            { no: 6, title: 'Travelling around China（游中国）', sections: [] },
          ],
        }, {
          id: 'g8s1',
          name: '八年级上册',
          chapters: [
            { no: 1, title: 'Water（水）', sections: [{ no: '1.1', title: '阅读与语法 ----- 时间状语从句（一）', ready: true }] },
            { no: 2, title: 'Digital life（数字生活）', sections: [{ no: '2.1', title: '阅读与语法 ----- 时间状语从句（二）', ready: true }] },
            { no: 3, title: 'Curious minds（好奇的心）', sections: [{ no: '3.1', title: '阅读与语法 ----- 动词不定式', ready: true }] },
            { no: 4, title: 'Then and now（过去与现在）', sections: [{ no: '4.1', title: '阅读与语法 ----- 让步状语从句', ready: true }] },
            { no: 5, title: 'Teamwork（团队合作）', sections: [{ no: '5.1', title: '阅读与语法 ----- 原因状语从句', ready: true }] },
            { no: 6, title: 'Life in the future（未来生活）', sections: [{ no: '6.1', title: '阅读与语法 ----- 条件状语从句', ready: true }] },
          ],
        }],
      }],
    },
    {
      id: 'chinese',
      name: '语文',
      color: '#c0513a',
      resources: [
        { group: 'notes', icon: '词', title: '文言实词虚词', desc: '180 个文言实词的词义和例句', href: 'content/chinese/classical-words.html' },
        { group: 'notes', icon: '注', title: '古诗文联动注释', desc: '61 篇古诗文，点词查释义', href: 'content/chinese/上海中考古诗文·虚实词联动注释版.html' },
        { group: 'notes', icon: '纲', title: '语文考纲', desc: '考试范围、考点清单与复习方向', href: 'content/chinese/shanghai-junior-outline.html', stage: 'zhongkao' },
        { group: 'notes', icon: '诗', title: '古诗文阅读应考手册', desc: '考点、解题方法和答题要点', href: 'content/chinese/上海中考古诗文阅读应考手册.html', stage: 'zhongkao' },
        { group: 'notes', icon: '文', title: '现代文阅读应考手册', desc: '题型、分析方法和答题技巧', href: 'content/chinese/上海中考现代文阅读应考手册.html', stage: 'zhongkao' },
        { group: 'exam', icon: '模', title: '模拟考试', desc: '整卷限时做，交卷后看解析', href: '#/mock', special: 'mock' },
        { group: 'exam', icon: '真', title: '中考真题', desc: '上海历年原题', href: '#/shanghai-papers/chinese', stage: 'zhongkao' },
      ],
      editions: [],
    },
    {
      id: 'physics',
      name: '物理',
      color: '#8a4fb0',
      resources: [
        { group: 'exam', icon: '真', title: '中考真题', desc: '上海历年原题', href: '#/shanghai-papers/physics', stage: 'zhongkao' },
      ],
      editions: [],
    },
    {
      id: 'chemistry',
      name: '化学',
      color: '#b46a24',
      resources: [
        { group: 'exam', icon: '真', title: '中考真题', desc: '上海历年原题', href: '#/shanghai-papers/chemistry', stage: 'zhongkao' },
      ],
      editions: [],
    },
  ],

  // 趣味玩法：按课本顺序排；when 是给学生看的课本位置，from 是从哪个学期起首页显示（不写就是不限年级）
  // 挂在小节上的游戏（#/g/...）也可以放进来
  games: [
    { id: '24', subject: 'math', name: '24 点', tag: '有理数运算', when: '六上第 1 章', from: 'g6s1', icon: '24', color: '#c0513a', href: 'src/games/24/index.html' },
    { id: 'magic', subject: 'math', name: '数学魔术', tag: '字母表示数', when: '六上第 2 章', from: 'g6s1', icon: '?!', color: '#8a4fb0', href: '#/g/magic' },
    { id: 'balance', subject: 'math', name: '天平解方程', tag: '等式的性质', when: '六上第 3 章', from: 'g6s1', icon: '=', color: '#3f9a5a', href: '#/g/balance' },
    { id: 'fermat', subject: 'math', name: '费马点', tag: '距离和最小', when: '七下第 18 章', from: 'g7s2', icon: 'P', color: '#c2417a', href: '#/g/fermat' },
    { id: 'function-track', subject: 'math', name: '函数轨道', tag: '一次、二次函数', when: '八下第 25 章', from: 'g8s2', icon: 'y=', color: '#b46a24', href: 'src/games/function-track/index.html' },
    { id: 'nim', subject: 'math', name: '取石子', tag: '策略推理', when: '不限年级', icon: '●●', color: '#2f6f7a', href: 'src/games/nim/index.html' },
    { id: 'solids', subject: 'math', name: '立体图形', tag: '展开图 · 截面', when: '不限年级', icon: '◆', color: '#2f6fd6', href: 'src/games/solids/index.html' },
  ],
};
