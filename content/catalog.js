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
              id: 'g8s1',
              name: '八年级上册',
              exams: [
                {
                  id: '2025-chongming-midterm',
                  title: '2025～2026 学年上海崇明区初二上学期期中数学试卷（九校联考）',
                  ready: true,
                  questionCount: 28,
                },
              ],
              chapters: [
                {
                  no: 19,
                  title: '实数',
                  sections: [
                    { no: '19.1', title: '平方根与立方根', ready: false },
                    { no: '19.2', title: '实数', ready: false },
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
