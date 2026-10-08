'use strict';

// 英语 g6s1 单元词表：词头、音标、词性、释义、页码、basic（课本粗体 = 课标基本词汇）由
// scripts/import-english-words.py 从课本词汇表导出；ex 例句与 forms 为 AI 原创，待英语教师审核。
// 复导只更新课本字段，保留 ex、forms、core 和 manual: true 的释义。整个括号内保持 JSON 格式，导入脚本按 JSON 读写。
Words.volume({
  "id": "english/sh2022/g6s1",
  "review": {
    "status": "pending"
  },
  "units": [
    {
      "no": 1,
      "title": "School life",
      "words": [
        {
          "w": "life",
          "ipa": "/laɪf/",
          "pos": "n.",
          "zh": "生活；生命",
          "page": 12,
          "basic": true,
          "note": "(pl. lives)",
          "core": true,
          "exam": true,
          "forms": [
            "lives"
          ],
          "ex": [
            {
              "en": "School [[life]] is busy but fun.",
              "zh": "学校生活忙碌但有趣。"
            },
            {
              "en": "Doctors help save people's [[lives]].",
              "zh": "医生帮助拯救人们的生命。"
            }
          ]
        },
        {
          "w": "break",
          "ipa": "/breɪk/",
          "pos": "n.",
          "zh": "课间休息；间歇；休息",
          "page": 14,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "breaks"
          ],
          "ex": [
            {
              "en": "We play table tennis in the [[break]].",
              "zh": "我们课间休息时打乒乓球。"
            },
            {
              "en": "We have two short [[breaks]] in the morning.",
              "zh": "我们上午有两次短暂的课间休息。"
            }
          ]
        },
        {
          "w": "ICT",
          "ipa": "",
          "pos": "n.",
          "zh": "信息通信技术（课程）",
          "page": 14,
          "basic": false,
          "note": "(= information and communications technology)",
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "We learn to make simple web pages in [[ICT]] class.",
              "zh": "我们在信息科技课上学做简单的网页。"
            }
          ]
        },
        {
          "w": "geography",
          "ipa": "/dʒiˈɒɡrəfi/",
          "pos": "n.",
          "zh": "地理",
          "page": 14,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "In [[geography]], we learn about rivers and mountains.",
              "zh": "在地理课上，我们学习河流和山脉。"
            }
          ]
        },
        {
          "w": "history",
          "ipa": "/ˈhɪstri/",
          "pos": "n.",
          "zh": "历史",
          "page": 14,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "My favourite subject is [[history]] because I like old stories.",
              "zh": "我最喜欢的科目是历史，因为我喜欢古老的故事。"
            }
          ]
        },
        {
          "w": "more",
          "ipa": "/mɔː(r)/",
          "pos": "det. & pron.",
          "zh": "更多的",
          "page": 14,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Can I have [[more]] time to finish the test?",
              "zh": "我能有更多时间完成测验吗？"
            }
          ]
        },
        {
          "w": "instruction",
          "ipa": "/ɪnˈstrʌkʃn/",
          "pos": "n.",
          "zh": "指示；命令",
          "page": 15,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "instructions"
          ],
          "ex": [
            {
              "en": "Follow each [[instruction]] on the card.",
              "zh": "按照卡片上的每一条指示去做。"
            },
            {
              "en": "Read the [[instructions]] before you start the game.",
              "zh": "开始游戏前先读一读说明。"
            }
          ]
        },
        {
          "w": "experiment",
          "ipa": "/ɪkˈsperɪmənt/",
          "pos": "n.",
          "zh": "实验；试验",
          "page": 15,
          "basic": false,
          "core": false,
          "exam": true,
          "forms": [
            "experiments"
          ],
          "ex": [
            {
              "en": "We do an [[experiment]] with water and ice today.",
              "zh": "今天我们用水和冰做一个实验。"
            }
          ]
        },
        {
          "w": "activity",
          "ipa": "/ækˈtɪvəti/",
          "pos": "n.",
          "zh": "活动",
          "page": 16,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "activities"
          ],
          "ex": [
            {
              "en": "Reading is my favourite after-school [[activity]].",
              "zh": "阅读是我最喜欢的课后活动。"
            },
            {
              "en": "Our school has many [[activities]] for new students.",
              "zh": "我们学校为新生准备了许多活动。"
            }
          ]
        },
        {
          "w": "club",
          "ipa": "/klʌb/",
          "pos": "n.",
          "zh": "社团",
          "page": 16,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "clubs"
          ],
          "ex": [
            {
              "en": "Tom wants to be in the football [[club]].",
              "zh": "汤姆想参加足球社。"
            },
            {
              "en": "There are ten [[clubs]] at our school.",
              "zh": "我们学校有十个社团。"
            }
          ]
        },
        {
          "w": "calligraphy",
          "ipa": "/kəˈlɪɡrəfi/",
          "pos": "n.",
          "zh": "书法",
          "page": 16,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "My grandpa practises [[calligraphy]] with a brush every morning.",
              "zh": "我爷爷每天早上用毛笔练书法。"
            }
          ]
        },
        {
          "w": "join",
          "ipa": "/dʒɔɪn/",
          "pos": "v.",
          "zh": "加入",
          "page": 16,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "joins"
          ],
          "ex": [
            {
              "en": "Would you like to [[join]] our music club?",
              "zh": "你想加入我们的音乐社吗？"
            },
            {
              "en": "My sister [[joins]] a new club every term.",
              "zh": "我姐姐每学期都加入一个新社团。"
            }
          ]
        },
        {
          "w": "technology",
          "ipa": "/tekˈnɒlədʒi/",
          "pos": "n.",
          "zh": "科技",
          "page": 16,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "We use new [[technology]] in our classroom.",
              "zh": "我们在教室里使用新科技。"
            }
          ]
        },
        {
          "w": "everyone",
          "ipa": "/ˈevriwʌn/",
          "pos": "pron.",
          "zh": "每个人",
          "page": 16,
          "basic": true,
          "note": "(= everybody)",
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Hello, [[everyone]]! Let's begin our lesson.",
              "zh": "大家好！我们开始上课吧。"
            }
          ]
        },
        {
          "w": "lab",
          "ipa": "/læb/",
          "pos": "n.",
          "zh": "实验室",
          "page": 16,
          "basic": true,
          "note": "(= laboratory)",
          "core": true,
          "exam": true,
          "forms": [
            "labs"
          ],
          "ex": [
            {
              "en": "We wear white coats in the science [[lab]].",
              "zh": "我们在科学实验室里穿白大褂。"
            },
            {
              "en": "Our school has three computer [[labs]].",
              "zh": "我们学校有三个计算机实验室。"
            }
          ]
        },
        {
          "w": "field",
          "ipa": "/fiːld/",
          "pos": "n.",
          "zh": "场地",
          "page": 16,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "fields"
          ],
          "ex": [
            {
              "en": "The boys are running on the sports [[field]].",
              "zh": "男孩们正在运动场上跑步。"
            },
            {
              "en": "There are two football [[fields]] near our school.",
              "zh": "我们学校附近有两个足球场。"
            }
          ]
        },
        {
          "w": "grade",
          "ipa": "/ɡreɪd/",
          "pos": "n.",
          "zh": "年级",
          "page": 16,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "grades"
          ],
          "ex": [
            {
              "en": "Students in the same [[grade]] have lunch together.",
              "zh": "同一年级的学生一起吃午饭。"
            },
            {
              "en": "There are four [[grades]] in our middle school.",
              "zh": "我们初中有四个年级。"
            }
          ]
        },
        {
          "w": "excuse",
          "ipa": "/ɪkˈskjuːz/",
          "pos": "v.",
          "zh": "原谅；宽恕",
          "page": 17,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Please [[excuse]] my bad handwriting.",
              "zh": "请原谅我潦草的字迹。"
            }
          ]
        },
        {
          "w": "excuse me",
          "ipa": "",
          "pos": "",
          "zh": "（因打扰别人或失礼表示歉意）对不起；劳驾",
          "page": 17,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "[[Excuse me]], where is the library?",
              "zh": "劳驾，图书馆在哪儿？"
            }
          ]
        },
        {
          "w": "of course",
          "ipa": "",
          "pos": "",
          "zh": "当然",
          "page": 17,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "Can I use your ruler? — [[Of course]].",
              "zh": "我能用一下你的尺子吗？——当然可以。"
            }
          ]
        },
        {
          "w": "project",
          "ipa": "/ˈprɒdʒekt/",
          "pos": "n.",
          "zh": "项目",
          "page": 17,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "projects"
          ],
          "ex": [
            {
              "en": "Our group is working on a [[project]] about trees.",
              "zh": "我们小组在做一个关于树的项目。"
            },
            {
              "en": "We finish two big [[projects]] every term.",
              "zh": "我们每学期完成两个大项目。"
            }
          ]
        },
        {
          "w": "start",
          "ipa": "/stɑːt/",
          "pos": "v.",
          "zh": "开始（做某事）",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "starts"
          ],
          "ex": [
            {
              "en": "Our classes [[start]] at eight o'clock.",
              "zh": "我们八点开始上课。"
            },
            {
              "en": "The film [[starts]] at seven in the evening.",
              "zh": "电影晚上七点开始。"
            }
          ]
        },
        {
          "w": "topic",
          "ipa": "/ˈtɒpɪk/",
          "pos": "n.",
          "zh": "话题；主题",
          "page": 18,
          "basic": false,
          "core": false,
          "exam": true,
          "forms": [
            "topics"
          ],
          "ex": [
            {
              "en": "The [[topic]] of today's talk is healthy food.",
              "zh": "今天讲座的主题是健康食品。"
            }
          ]
        },
        {
          "w": "online",
          "ipa": "/ˌɒnˈlaɪn/",
          "pos": "adv. & adj.",
          "zh": "adv. 在线；adj. 在线的；联网的",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "I often read books [[online]] at the weekend.",
              "zh": "我周末经常在网上看书。"
            }
          ]
        },
        {
          "w": "receive",
          "ipa": "/rɪˈsiːv/",
          "pos": "v.",
          "zh": "接到；收到",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "receives"
          ],
          "ex": [
            {
              "en": "I [[receive]] a lot of emails from my pen friend.",
              "zh": "我收到笔友的很多邮件。"
            },
            {
              "en": "My mum [[receives]] flowers on her birthday every year.",
              "zh": "我妈妈每年生日都会收到鲜花。"
            }
          ]
        },
        {
          "w": "reply",
          "ipa": "/rɪˈplaɪ/",
          "pos": "n.",
          "zh": "回答；答复",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "replies"
          ],
          "ex": [
            {
              "en": "I am still waiting for your [[reply]].",
              "zh": "我还在等你的答复。"
            },
            {
              "en": "Her post gets ten [[replies]] in one hour.",
              "zh": "她的帖子一小时内收到了十条回复。"
            }
          ]
        },
        {
          "w": "group",
          "ipa": "/ɡruːp/",
          "pos": "n.",
          "zh": "组；群；批；类",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "groups"
          ],
          "ex": [
            {
              "en": "Please work in a [[group]] of four.",
              "zh": "请四人一组合作。"
            },
            {
              "en": "The teacher puts us into six [[groups]].",
              "zh": "老师把我们分成六个小组。"
            }
          ]
        },
        {
          "w": "most",
          "ipa": "/məʊst/",
          "pos": "adv.",
          "zh": "最",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Of all the subjects, I like maths [[most]].",
              "zh": "在所有科目中，我最喜欢数学。"
            }
          ]
        },
        {
          "w": "a.m.",
          "ipa": "",
          "pos": "abbr.",
          "zh": "上午",
          "page": 18,
          "basic": true,
          "note": "(AmE A.M.)",
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Our first lesson begins at 8:00 [[a.m.]]",
              "zh": "我们第一节课上午 8 点开始。"
            }
          ]
        },
        {
          "w": "end",
          "ipa": "/end/",
          "pos": "v.",
          "zh": "结束",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "ends"
          ],
          "ex": [
            {
              "en": "When does the art club [[end]] today?",
              "zh": "美术社今天什么时候结束？"
            },
            {
              "en": "School [[ends]] at half past three.",
              "zh": "学校三点半放学。"
            }
          ]
        },
        {
          "w": "p.m.",
          "ipa": "",
          "pos": "abbr.",
          "zh": "下午",
          "page": 18,
          "basic": true,
          "note": "(AmE P.M.)",
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "We go home at 4:30 [[p.m.]]",
              "zh": "我们下午 4:30 回家。"
            }
          ]
        },
        {
          "w": "difference",
          "ipa": "/ˈdɪfrəns/",
          "pos": "n.",
          "zh": "差别；不同之处",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "differences"
          ],
          "ex": [
            {
              "en": "Can you tell the [[difference]] between the twins?",
              "zh": "你能分辨出这对双胞胎的差别吗？"
            },
            {
              "en": "There are some [[differences]] between my old school and my new school.",
              "zh": "我的旧学校和新学校有一些不同之处。"
            }
          ]
        },
        {
          "w": "same",
          "ipa": "/seɪm/",
          "pos": "adj.",
          "zh": "相同的；一样的",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Lucy and I are in the [[same]] class.",
              "zh": "露西和我在同一个班。"
            }
          ]
        },
        {
          "w": "during",
          "ipa": "/ˈdjʊərɪŋ/",
          "pos": "prep.",
          "zh": "在……期间",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Don't talk [[during]] the test.",
              "zh": "考试期间不要说话。"
            }
          ]
        },
        {
          "w": "outside",
          "ipa": "/ˌaʊtˈsaɪd/",
          "pos": "adv. & prep.",
          "zh": "adv. 在外面；prep. 在……外面",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Let's have our lunch [[outside]] today.",
              "zh": "我们今天在外面吃午饭吧。"
            }
          ]
        },
        {
          "w": "noon",
          "ipa": "/nuːn/",
          "pos": "n.",
          "zh": "正午；中午",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": false,
          "ex": [
            {
              "en": "We have lunch at [[noon]].",
              "zh": "我们中午吃午饭。"
            }
          ]
        },
        {
          "w": "connect",
          "ipa": "/kəˈnekt/",
          "pos": "v.",
          "zh": "连接",
          "page": 18,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "connects"
          ],
          "ex": [
            {
              "en": "Please [[connect]] the computer to the screen.",
              "zh": "请把电脑连接到屏幕上。"
            },
            {
              "en": "This bridge [[connects]] the two parts of the town.",
              "zh": "这座桥连接着小镇的两部分。"
            }
          ]
        },
        {
          "w": "comment",
          "ipa": "/ˈkɒment/",
          "pos": "n. & v.",
          "zh": "n. 议论；评论；解释；v. 表达意见",
          "page": 18,
          "basic": false,
          "core": false,
          "exam": false,
          "forms": [
            "comments"
          ],
          "ex": [
            {
              "en": "Thank you for your kind [[comment]].",
              "zh": "谢谢你友善的评论。"
            }
          ]
        }
      ]
    }
  ],
  "source": {
    "kind": "textbook-glossary",
    "file": "refs/沪教版五四制初中英语/六年级上册/沪教版英语 六年级上册.pdf",
    "pages": "134–139",
    "sha256": "d4e6aad29654e03a8a53aa020c7fc44c4dd7c960a5a20887ac1e6baf19bb2844"
  }
});
