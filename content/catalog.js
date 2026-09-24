'use strict';

// 教材目录：学科 → 教材 → 册 → 章 → 节。只放元数据，小节内容在各自的文件里。
// ready: true 表示小节内容已经做好（content/<学科>/<教材>/<册>/<小节号>.js 存在）

Content.catalog = {
  subjects: [
    {
      id: 'math',
      name: '数学',
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
                    { no: '2.3', title: '一次式', ready: true },
                  ],
                },
                {
                  no: 3,
                  title: '一元一次方程',
                  sections: [
                    { no: '3.1', title: '方程与列方程', ready: true },
                    { no: '3.2', title: '一元一次方程及其解法', ready: true },
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
                    { no: '11.1', title: '整式的乘法', ready: false },
                    { no: '11.2', title: '乘法公式', ready: false },
                    { no: '11.3', title: '整式的除法', ready: false },
                  ],
                },
                {
                  no: 12,
                  title: '因式分解',
                  sections: [
                    { no: '12.1', title: '因式分解的意义', ready: false },
                    { no: '12.2', title: '因式分解的方法', ready: false },
                  ],
                },
                {
                  no: 13,
                  title: '分式',
                  sections: [
                    { no: '13.1', title: '分式及其性质', ready: false },
                    { no: '13.2', title: '分式的运算', ready: false },
                    { no: '13.3', title: '分式方程', ready: false },
                  ],
                },
                {
                  no: 14,
                  title: '图形的运动',
                  sections: [
                    { no: '14.1', title: '平移', ready: false },
                    { no: '14.2', title: '旋转', ready: false },
                    { no: '14.3', title: '轴对称', ready: false },
                    { no: '14.4', title: '中心对称', ready: false },
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
                    { no: '15.1', title: '不等式及其性质', ready: false },
                    { no: '15.2', title: '一元一次不等式', ready: false },
                    { no: '15.3', title: '一元一次不等式组', ready: false },
                  ],
                },
                {
                  no: 16,
                  title: '相交线与平行线',
                  sections: [
                    { no: '16.1', title: '相交线', ready: false },
                    { no: '16.2', title: '平行线', ready: false },
                    { no: '16.3', title: '命题与证明', ready: false },
                  ],
                },
                {
                  no: 17,
                  title: '三角形',
                  sections: [
                    { no: '17.1', title: '三角形的有关概念', ready: false },
                    { no: '17.2', title: '三角形的内角和', ready: false },
                    { no: '17.3', title: '全等三角形及其性质', ready: false },
                    { no: '17.4', title: '三角形全等的判定', ready: false },
                  ],
                },
                {
                  no: 18,
                  title: '等腰三角形',
                  sections: [
                    { no: '18.1', title: '等腰三角形的性质', ready: false },
                    { no: '18.2', title: '等腰三角形的判定', ready: false },
                    { no: '18.3', title: '等边三角形', ready: false },
                    { no: '18.4', title: '线段的垂直平分线', ready: false },
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
                    { no: '20.1', title: '二次根式及其性质', ready: false },
                    { no: '20.2', title: '二次根式的运算', ready: false },
                  ],
                },
                {
                  no: 21,
                  title: '一元二次方程',
                  sections: [
                    { no: '21.1', title: '一元二次方程的概念', ready: false },
                    { no: '21.2', title: '一元二次方程的解法', ready: false },
                    { no: '21.3', title: '一元二次方程的判别式', ready: false },
                    { no: '21.4', title: '一元二次方程的根与系数的关系', ready: false },
                    { no: '21.5', title: '一元二次方程的应用', ready: false },
                  ],
                },
                {
                  no: 22,
                  title: '直角三角形',
                  sections: [
                    { no: '22.1', title: '直角三角形', ready: false },
                    { no: '22.2', title: '角平分线', ready: false },
                    { no: '22.3', title: '勾股定理', ready: false },
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
                    { no: '23.1', title: '多边形', ready: false },
                    { no: '23.2', title: '平行四边形', ready: false },
                    { no: '23.3', title: '矩形、菱形与正方形', ready: false },
                    { no: '23.4', title: '三角形的中位线与重心', ready: false },
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
          ],
        },
      ],
    },
  ],
};
