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
                    { no: '3.1', title: '方程与列方程' },
                    { no: '3.2', title: '一元一次方程及其解法' },
                    { no: '3.3', title: '一元一次方程的应用' },
                  ],
                },
                {
                  no: 4,
                  title: '线段与角',
                  sections: [
                    { no: '4.1', title: '线段' },
                    { no: '4.2', title: '角' },
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
