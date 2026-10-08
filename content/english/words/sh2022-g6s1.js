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
    },
    {
      "no": 2,
      "title": "Family ties",
      "words": [
        {
          "w": "tie",
          "ipa": "/taɪ/",
          "pos": "n.",
          "zh": "联系；关系；纽带",
          "page": 26,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "ties"
          ],
          "ex": [
            {
              "en": "There is a strong [[tie]] between the two brothers.",
              "zh": "兄弟俩之间有很深的感情纽带。"
            },
            {
              "en": "Family [[ties]] are very important to my grandma.",
              "zh": "家庭纽带对我奶奶来说非常重要。"
            }
          ]
        },
        {
          "w": "relation",
          "ipa": "/rɪˈleɪʃn/",
          "pos": "n.",
          "zh": "关系；联系",
          "page": 28,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "What is your [[relation]] to that girl? — She is my cousin.",
              "zh": "你和那个女孩是什么关系？——她是我表妹。"
            }
          ]
        },
        {
          "w": "introduce",
          "ipa": "/ˌɪntrəˈdjuːs/",
          "pos": "v.",
          "zh": "介绍",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "introducing"
          ],
          "ex": [
            {
              "en": "Let me [[introduce]] my new friend to you.",
              "zh": "让我把我的新朋友介绍给你。"
            },
            {
              "en": "The teacher is [[introducing]] a new student to the class.",
              "zh": "老师正在向全班介绍一位新同学。"
            }
          ]
        },
        {
          "w": "classmate",
          "ipa": "/ˈklɑːsmeɪt/",
          "pos": "n.",
          "zh": "同班同学",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "classmates"
          ],
          "ex": [
            {
              "en": "Wang Fei is my [[classmate]] and my neighbour.",
              "zh": "王菲是我的同班同学，也是我的邻居。"
            },
            {
              "en": "I have forty [[classmates]].",
              "zh": "我有四十个同班同学。"
            }
          ]
        },
        {
          "w": "relative",
          "ipa": "/ˈrelətɪv/",
          "pos": "n.",
          "zh": "亲戚；亲属",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "relatives"
          ],
          "ex": [
            {
              "en": "A [[relative]] from Canada is visiting us this week.",
              "zh": "一位来自加拿大的亲戚这周来看我们。"
            },
            {
              "en": "We visit our [[relatives]] during the Spring Festival.",
              "zh": "春节期间我们去走亲戚。"
            }
          ]
        },
        {
          "w": "only",
          "ipa": "/ˈəʊnli/",
          "pos": "adj.",
          "zh": "仅有的；唯一的",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "This is the [[only]] photo of my great-grandpa.",
              "zh": "这是我曾祖父唯一的一张照片。"
            }
          ]
        },
        {
          "w": "only child",
          "ipa": "",
          "pos": "",
          "zh": "独生子（或女）",
          "page": 28,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "My cousin is an [[only child]], so she often plays with me.",
              "zh": "我表妹是独生女，所以她常和我一起玩。"
            }
          ]
        },
        {
          "w": "twin",
          "ipa": "/twɪn/",
          "pos": "n.",
          "zh": "双胞胎之一",
          "page": 28,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "Amy is my [[twin]], and we have the same birthday.",
              "zh": "艾米是我的双胞胎姐妹，我们同一天生日。"
            }
          ]
        },
        {
          "w": "husband",
          "ipa": "/ˈhʌzbənd/",
          "pos": "n.",
          "zh": "丈夫",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "husbands"
          ],
          "ex": [
            {
              "en": "Aunt Mei's [[husband]] is my uncle.",
              "zh": "梅姨的丈夫是我的姨父。"
            },
            {
              "en": "The two [[husbands]] are cooking in the kitchen.",
              "zh": "两位丈夫正在厨房里做饭。"
            }
          ]
        },
        {
          "w": "wife",
          "ipa": "/waɪf/",
          "pos": "n.",
          "zh": "妻子",
          "page": 28,
          "basic": true,
          "note": "(pl. wives)",
          "core": true,
          "exam": true,
          "forms": [
            "wives"
          ],
          "ex": [
            {
              "en": "My uncle's [[wife]] is a nurse.",
              "zh": "我叔叔的妻子是一名护士。"
            },
            {
              "en": "The farmers and their [[wives]] are dancing together.",
              "zh": "农民们和他们的妻子正在一起跳舞。"
            }
          ]
        },
        {
          "w": "son",
          "ipa": "/sʌn/",
          "pos": "n.",
          "zh": "儿子",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "sons"
          ],
          "ex": [
            {
              "en": "Mr Li has a [[son]] and a daughter.",
              "zh": "李先生有一个儿子和一个女儿。"
            },
            {
              "en": "Their two [[sons]] are both in Grade 6.",
              "zh": "他们的两个儿子都在六年级。"
            }
          ]
        },
        {
          "w": "daughter",
          "ipa": "/ˈdɔːtə(r)/",
          "pos": "n.",
          "zh": "女儿",
          "page": 28,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "daughters"
          ],
          "ex": [
            {
              "en": "My aunt's [[daughter]] is my cousin.",
              "zh": "我姑姑的女儿是我的表姐。"
            },
            {
              "en": "Mrs Green has three [[daughters]].",
              "zh": "格林太太有三个女儿。"
            }
          ]
        },
        {
          "w": "other",
          "ipa": "/ˈʌðə(r)/",
          "pos": "adj. & pron.",
          "zh": "adj. 另外；其他；pron. 另外的人（或物）",
          "page": 29,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "others"
          ],
          "ex": [
            {
              "en": "Do you have any [[other]] questions?",
              "zh": "你还有其他问题吗？"
            },
            {
              "en": "Some students are reading, and [[others]] are drawing.",
              "zh": "一些学生在读书，另一些在画画。"
            }
          ]
        },
        {
          "w": "member",
          "ipa": "/ˈmembə(r)/",
          "pos": "n.",
          "zh": "成员；分子",
          "page": 30,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "members"
          ],
          "ex": [
            {
              "en": "Our cat is a [[member]] of our family too.",
              "zh": "我们的猫也是家里的一员。"
            },
            {
              "en": "There are five [[members]] in my family.",
              "zh": "我家有五口人。"
            }
          ]
        },
        {
          "w": "add",
          "ipa": "/æd/",
          "pos": "v.",
          "zh": "添加；增加",
          "page": 30,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "adding"
          ],
          "ex": [
            {
              "en": "Please [[add]] some salt to the soup.",
              "zh": "请往汤里加点盐。"
            },
            {
              "en": "Grandma is [[adding]] sugar to her tea.",
              "zh": "奶奶正在往她的茶里加糖。"
            }
          ]
        },
        {
          "w": "note",
          "ipa": "/nəʊt/",
          "pos": "n.",
          "zh": "笔记；记录；音符",
          "page": 30,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "notes"
          ],
          "ex": [
            {
              "en": "Write a short [[note]] under each photo.",
              "zh": "在每张照片下面写一条简短的记录。"
            },
            {
              "en": "I always take [[notes]] in class.",
              "zh": "我上课总是记笔记。"
            }
          ]
        },
        {
          "w": "album",
          "ipa": "/ˈælbəm/",
          "pos": "n.",
          "zh": "相册；影集",
          "page": 30,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "We keep our holiday photos in a big [[album]].",
              "zh": "我们把假期照片放在一本大相册里。"
            }
          ]
        },
        {
          "w": "teach",
          "ipa": "/tiːtʃ/",
          "pos": "v.",
          "zh": "教（某人）；使（某人）明白或会做某事",
          "page": 30,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "teaching"
          ],
          "ex": [
            {
              "en": "Can you [[teach]] me how to swim?",
              "zh": "你能教我游泳吗？"
            },
            {
              "en": "Grandpa is [[teaching]] my brother to ride a bike.",
              "zh": "爷爷正在教我弟弟骑自行车。"
            }
          ]
        },
        {
          "w": "homework",
          "ipa": "/ˈhəʊmwɜːk/",
          "pos": "n.",
          "zh": "（学生的）家庭作业",
          "page": 30,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "I finish my [[homework]] before dinner.",
              "zh": "我在晚饭前完成作业。"
            }
          ]
        },
        {
          "w": "guitar",
          "ipa": "/ɡɪˈtɑː(r)/",
          "pos": "n.",
          "zh": "吉他",
          "page": 31,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "guitars"
          ],
          "ex": [
            {
              "en": "My cousin is playing the [[guitar]] in his room.",
              "zh": "我表哥正在他的房间里弹吉他。"
            },
            {
              "en": "The music club has six [[guitars]].",
              "zh": "音乐社有六把吉他。"
            }
          ]
        },
        {
          "w": "elder",
          "ipa": "/ˈeldə(r)/",
          "pos": "adj.",
          "zh": "年长的；年龄较大的",
          "page": 31,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "My [[elder]] brother is fifteen years old.",
              "zh": "我哥哥十五岁。"
            }
          ]
        },
        {
          "w": "sofa",
          "ipa": "/ˈsəʊfə/",
          "pos": "n.",
          "zh": "长沙发",
          "page": 31,
          "basic": true,
          "core": true,
          "exam": false,
          "forms": [
            "sofas"
          ],
          "ex": [
            {
              "en": "Grandpa is sleeping on the [[sofa]].",
              "zh": "爷爷正在沙发上睡觉。"
            },
            {
              "en": "There are two [[sofas]] in our living room.",
              "zh": "我们的客厅里有两张沙发。"
            }
          ]
        },
        {
          "w": "round",
          "ipa": "/raʊnd/",
          "pos": "adj.",
          "zh": "圆形的",
          "page": 31,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "My little sister has a [[round]] face.",
              "zh": "我妹妹有一张圆脸。"
            }
          ]
        },
        {
          "w": "dark",
          "ipa": "/dɑːk/",
          "pos": "adj.",
          "zh": "乌黑的；深色的；黑暗的",
          "page": 31,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Uncle Tom has [[dark]] eyes and a big smile.",
              "zh": "汤姆叔叔有一双深色的眼睛和灿烂的笑容。"
            }
          ]
        },
        {
          "w": "chess",
          "ipa": "/tʃes/",
          "pos": "n.",
          "zh": "国际象棋",
          "page": 31,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "My grandpa and I play [[chess]] every Sunday.",
              "zh": "我和爷爷每周日下国际象棋。"
            }
          ]
        },
        {
          "w": "duty",
          "ipa": "/ˈdjuːti/",
          "pos": "n.",
          "zh": "责任；义务；本分",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "duties"
          ],
          "ex": [
            {
              "en": "It is my [[duty]] to feed the fish.",
              "zh": "喂鱼是我的责任。"
            },
            {
              "en": "Everyone in my family has some [[duties]] at home.",
              "zh": "我家每个人在家里都有一些分内的事。"
            }
          ]
        },
        {
          "w": "born",
          "ipa": "/bɔːn/",
          "pos": "v.",
          "zh": "（仅用于被动语态 be born）出生；出世",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "manual": true,
          "ex": [
            {
              "en": "My little brother was [[born]] in 2020.",
              "zh": "我弟弟出生于 2020 年。"
            }
          ]
        },
        {
          "w": "weekend",
          "ipa": "/ˌwiːkˈend/",
          "pos": "n.",
          "zh": "星期六和星期日；周末",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "weekends"
          ],
          "ex": [
            {
              "en": "What do you usually do at the [[weekend]]?",
              "zh": "你周末通常做什么？"
            },
            {
              "en": "We often visit Grandma at [[weekends]].",
              "zh": "我们经常在周末去看奶奶。"
            }
          ]
        },
        {
          "w": "thing",
          "ipa": "/θɪŋ/",
          "pos": "n.",
          "zh": "事情；事件",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "things"
          ],
          "ex": [
            {
              "en": "Being kind is an important [[thing]].",
              "zh": "善良是一件重要的事。"
            },
            {
              "en": "I have many [[things]] to do today.",
              "zh": "我今天有很多事要做。"
            }
          ]
        },
        {
          "w": "enough",
          "ipa": "/ɪˈnʌf/",
          "pos": "adv.",
          "zh": "足够地；充分地",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Is the box big [[enough]] for the cat?",
              "zh": "这个盒子对猫来说够大吗？"
            }
          ]
        },
        {
          "w": "Well done!",
          "ipa": "",
          "pos": "",
          "zh": "做得好！干得好！",
          "page": 32,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "[[Well done!]] You cleaned the whole room.",
              "zh": "干得好！你把整个房间都打扫干净了。"
            }
          ]
        },
        {
          "w": "dish",
          "ipa": "/dɪʃ/",
          "pos": "n.",
          "zh": "碟子；盘子；一道菜；菜肴",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "dishes"
          ],
          "ex": [
            {
              "en": "Fish with tomato is my mum's best [[dish]].",
              "zh": "番茄鱼是我妈妈最拿手的菜。"
            },
            {
              "en": "After dinner, I help wash the [[dishes]].",
              "zh": "晚饭后我帮忙洗碗。"
            }
          ]
        },
        {
          "w": "usually",
          "ipa": "/ˈjuːʒuəli/",
          "pos": "adv.",
          "zh": "通常地；经常地",
          "page": 32,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "I [[usually]] get up at half past six.",
              "zh": "我通常六点半起床。"
            }
          ]
        },
        {
          "w": "quick",
          "ipa": "/kwɪk/",
          "pos": "adj.",
          "zh": "快的；迅速的",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "quicker"
          ],
          "ex": [
            {
              "en": "Let's have a [[quick]] lunch and go to the park.",
              "zh": "我们快点吃个午饭，然后去公园吧。"
            },
            {
              "en": "Riding a bike is [[quicker]] than walking.",
              "zh": "骑自行车比走路快。"
            }
          ]
        },
        {
          "w": "together",
          "ipa": "/təˈɡeðə(r)/",
          "pos": "adv.",
          "zh": "在一起；共同",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "My family has dinner [[together]] every evening.",
              "zh": "我们全家每天晚上一起吃晚饭。"
            }
          ]
        },
        {
          "w": "flat",
          "ipa": "/flæt/",
          "pos": "n.",
          "zh": "公寓；一套房间",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "flats"
          ],
          "ex": [
            {
              "en": "We live in a small [[flat]] near the river.",
              "zh": "我们住在河边的一套小公寓里。"
            },
            {
              "en": "There are twenty [[flats]] in this building.",
              "zh": "这栋楼里有二十套公寓。"
            }
          ]
        },
        {
          "w": "fun",
          "ipa": "/fʌn/",
          "pos": "n.",
          "zh": "乐趣；快乐",
          "page": 32,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "We have a lot of [[fun]] at the family party.",
              "zh": "我们在家庭聚会上玩得很开心。"
            }
          ]
        },
        {
          "w": "celebration",
          "ipa": "/ˌselɪˈbreɪʃn/",
          "pos": "n.",
          "zh": "庆典；庆祝活动",
          "page": 36,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "The New Year [[celebration]] starts at eight.",
              "zh": "新年庆祝活动八点开始。"
            }
          ]
        },
        {
          "w": "prepare",
          "ipa": "/prɪˈpeə(r)/",
          "pos": "v.",
          "zh": "使做好准备；把……预备好",
          "page": 36,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "preparing"
          ],
          "ex": [
            {
              "en": "We [[prepare]] the food together before the party.",
              "zh": "聚会前我们一起准备食物。"
            },
            {
              "en": "Mum is [[preparing]] a big dinner for Grandpa's birthday.",
              "zh": "妈妈正在为爷爷的生日准备一顿丰盛的晚餐。"
            }
          ]
        },
        {
          "w": "decorate",
          "ipa": "/ˈdekəreɪt/",
          "pos": "v.",
          "zh": "装饰",
          "page": 36,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "Let's [[decorate]] the classroom with paper flowers.",
              "zh": "我们用纸花装饰教室吧。"
            }
          ]
        },
        {
          "w": "living room",
          "ipa": "/ˈlɪvɪŋ ruːm/",
          "pos": "n.",
          "zh": "客厅；起居室",
          "page": 36,
          "basic": false,
          "note": "(= sitting room)",
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "The TV is in the [[living room]].",
              "zh": "电视在客厅里。"
            }
          ]
        },
        {
          "w": "balloon",
          "ipa": "/bəˈluːn/",
          "pos": "n.",
          "zh": "气球",
          "page": 36,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "balloons"
          ],
          "ex": [
            {
              "en": "The little boy is holding a red [[balloon]].",
              "zh": "小男孩正拿着一个红气球。"
            },
            {
              "en": "We put twenty [[balloons]] on the wall.",
              "zh": "我们在墙上挂了二十个气球。"
            }
          ]
        },
        {
          "w": "set",
          "ipa": "/set/",
          "pos": "v.",
          "zh": "放置；摆放餐具",
          "page": 36,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "setting"
          ],
          "ex": [
            {
              "en": "Can you help me [[set]] the table for dinner?",
              "zh": "你能帮我摆好餐具准备吃晚饭吗？"
            },
            {
              "en": "My sister is [[setting]] the bowls and chopsticks on the table.",
              "zh": "我姐姐正在桌上摆碗筷。"
            }
          ]
        },
        {
          "w": "surprised",
          "ipa": "/səˈpraɪzd/",
          "pos": "adj.",
          "zh": "惊奇的；惊讶的；感觉意外的",
          "page": 37,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "Dad looks [[surprised]] when he opens the gift.",
              "zh": "爸爸打开礼物时看起来很惊讶。"
            }
          ]
        },
        {
          "w": "super-excited",
          "ipa": "/ˌsuːpə(r) ɪkˈsaɪtɪd/",
          "pos": "adj.",
          "zh": "超级激动的；格外兴奋的",
          "page": 37,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "The kids are [[super-excited]] about the trip.",
              "zh": "孩子们对这次旅行格外兴奋。"
            }
          ]
        },
        {
          "w": "joy",
          "ipa": "/dʒɔɪ/",
          "pos": "n.",
          "zh": "高兴；愉快；喜悦",
          "page": 37,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Grandma's face is full of [[joy]].",
              "zh": "奶奶满脸喜悦。"
            }
          ]
        },
        {
          "w": "jump for joy",
          "ipa": "",
          "pos": "",
          "zh": "欢呼雀跃",
          "page": 37,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "The children [[jump for joy]] when they see the snow.",
              "zh": "孩子们看到雪时欢呼雀跃。"
            }
          ]
        }
      ]
    },
    {
      "no": 3,
      "title": "Food",
      "words": [
        {
          "w": "something",
          "ipa": "/ˈsʌmθɪŋ/",
          "pos": "pron.",
          "zh": "某事；某物",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "I want [[something]] to drink.",
              "zh": "我想喝点东西。"
            }
          ]
        },
        {
          "w": "beef",
          "ipa": "/biːf/",
          "pos": "n.",
          "zh": "牛肉",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "My dad cooks [[beef]] with potatoes on Sundays.",
              "zh": "爸爸每周日做土豆炖牛肉。"
            }
          ]
        },
        {
          "w": "tofu",
          "ipa": "/ˈtəʊfuː/",
          "pos": "n.",
          "zh": "豆腐",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "ex": [
            {
              "en": "We often have [[tofu]] soup for dinner.",
              "zh": "我们晚饭常喝豆腐汤。"
            }
          ]
        },
        {
          "w": "pepper",
          "ipa": "/ˈpepə(r)/",
          "pos": "n.",
          "zh": "甜椒",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "forms": [
            "peppers"
          ],
          "ex": [
            {
              "en": "Please cut the green [[pepper]] for me.",
              "zh": "请帮我把青椒切好。"
            },
            {
              "en": "Red and yellow [[peppers]] look bright on the plate.",
              "zh": "红色和黄色的甜椒在盘子里看起来很鲜艳。"
            }
          ]
        },
        {
          "w": "cabbage",
          "ipa": "/ˈkæbɪdʒ/",
          "pos": "n.",
          "zh": "卷心菜",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "cabbages"
          ],
          "ex": [
            {
              "en": "Grandma grows [[cabbage]] in her garden.",
              "zh": "奶奶在菜园里种卷心菜。"
            },
            {
              "en": "There are three [[cabbages]] in the basket.",
              "zh": "篮子里有三棵卷心菜。"
            }
          ]
        },
        {
          "w": "onion",
          "ipa": "/ˈʌnjən/",
          "pos": "n.",
          "zh": "洋葱",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "forms": [
            "onions"
          ],
          "ex": [
            {
              "en": "Cutting an [[onion]] makes me cry.",
              "zh": "切洋葱会让我流泪。"
            },
            {
              "en": "We need two [[onions]] for the soup.",
              "zh": "这道汤需要两个洋葱。"
            }
          ]
        },
        {
          "w": "carrot",
          "ipa": "/ˈkærət/",
          "pos": "n.",
          "zh": "胡萝卜",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "carrots"
          ],
          "ex": [
            {
              "en": "Give me a [[carrot]], please.",
              "zh": "请给我一根胡萝卜。"
            },
            {
              "en": "[[Carrots]] are good for your eyes.",
              "zh": "胡萝卜对眼睛有好处。"
            }
          ]
        },
        {
          "w": "watermelon",
          "ipa": "/ˈwɔːtəmelən/",
          "pos": "n.",
          "zh": "西瓜",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "ex": [
            {
              "en": "We eat cold [[watermelon]] in summer.",
              "zh": "夏天我们吃冰镇西瓜。"
            }
          ]
        },
        {
          "w": "cucumber",
          "ipa": "/ˈkjuːkʌmbə(r)/",
          "pos": "n.",
          "zh": "黄瓜",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "forms": [
            "cucumbers"
          ],
          "ex": [
            {
              "en": "I put some [[cucumber]] in my salad.",
              "zh": "我在沙拉里放了些黄瓜。"
            },
            {
              "en": "Mum buys three [[cucumbers]] at the market.",
              "zh": "妈妈在市场买了三根黄瓜。"
            }
          ]
        },
        {
          "w": "strawberry",
          "ipa": "/ˈstrɔːbəri/",
          "pos": "n.",
          "zh": "草莓",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "strawberries"
          ],
          "ex": [
            {
              "en": "This [[strawberry]] is very sweet.",
              "zh": "这颗草莓很甜。"
            },
            {
              "en": "Let's pick some [[strawberries]] on the farm.",
              "zh": "我们去农场摘些草莓吧。"
            }
          ]
        },
        {
          "w": "pear",
          "ipa": "/peə(r)/",
          "pos": "n.",
          "zh": "梨",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "pears"
          ],
          "ex": [
            {
              "en": "Would you like a [[pear]] or an apple?",
              "zh": "你想要一个梨还是一个苹果？"
            },
            {
              "en": "There are five [[pears]] on the plate.",
              "zh": "盘子里有五个梨。"
            }
          ]
        },
        {
          "w": "yogurt",
          "ipa": "/ˈjɒɡət/",
          "pos": "n.",
          "zh": "酸奶；一份酸奶",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "I have a cup of [[yogurt]] after breakfast.",
              "zh": "我早饭后喝一杯酸奶。"
            }
          ]
        },
        {
          "w": "cheese",
          "ipa": "/tʃiːz/",
          "pos": "n.",
          "zh": "干酪；奶酪",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "In cartoons, mice love [[cheese]].",
              "zh": "动画片里的老鼠都爱吃奶酪。"
            }
          ]
        },
        {
          "w": "corn",
          "ipa": "/kɔːn/",
          "pos": "n.",
          "zh": "玉米；（小麦等）谷物",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "ex": [
            {
              "en": "The farmers grow [[corn]] in this field.",
              "zh": "农民在这块地里种玉米。"
            }
          ]
        },
        {
          "w": "butter",
          "ipa": "/ˈbʌtə(r)/",
          "pos": "n.",
          "zh": "黄油",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Put some [[butter]] on your bread.",
              "zh": "在面包上抹点黄油。"
            }
          ]
        },
        {
          "w": "oil",
          "ipa": "/ɔɪl/",
          "pos": "n.",
          "zh": "食用油",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Don't use too much [[oil]] when you cook.",
              "zh": "做饭时别放太多油。"
            }
          ]
        },
        {
          "w": "salt",
          "ipa": "/sɔːlt/",
          "pos": "n.",
          "zh": "盐；食盐",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "This soup needs a little more [[salt]].",
              "zh": "这汤还需要再放一点盐。"
            }
          ]
        },
        {
          "w": "bean",
          "ipa": "/biːn/",
          "pos": "n.",
          "zh": "豆；豆科植物",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": false,
          "forms": [
            "beans"
          ],
          "ex": [
            {
              "en": "A [[bean]] is a small seed.",
              "zh": "豆子是一种小小的种子。"
            },
            {
              "en": "Mum cooks green [[beans]] with pork.",
              "zh": "妈妈用猪肉炒四季豆。"
            }
          ]
        },
        {
          "w": "product",
          "ipa": "/ˈprɒdʌkt/",
          "pos": "n.",
          "zh": "产品；制品",
          "page": 42,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "products"
          ],
          "ex": [
            {
              "en": "Paper is a [[product]] made from trees.",
              "zh": "纸是用树木做成的产品。"
            },
            {
              "en": "This shop sells milk [[products]] like cheese and yogurt.",
              "zh": "这家店卖奶酪、酸奶这样的奶制品。"
            }
          ]
        },
        {
          "w": "grain",
          "ipa": "/ɡreɪn/",
          "pos": "n.",
          "zh": "谷物；谷粒",
          "page": 42,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "Rice is a kind of [[grain]].",
              "zh": "大米是一种谷物。"
            }
          ]
        },
        {
          "w": "rainbow",
          "ipa": "/ˈreɪnbəʊ/",
          "pos": "n.",
          "zh": "虹；彩虹",
          "page": 43,
          "basic": true,
          "core": true,
          "exam": false,
          "forms": [
            "rainbows"
          ],
          "ex": [
            {
              "en": "Look! There is a [[rainbow]] after the rain.",
              "zh": "看！雨后有一道彩虹。"
            },
            {
              "en": "We sometimes see [[rainbows]] in summer.",
              "zh": "我们夏天有时能看到彩虹。"
            }
          ]
        },
        {
          "w": "balanced",
          "ipa": "/ˈbælənst/",
          "pos": "adj.",
          "zh": "保持（或显示）平衡的",
          "page": 43,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "A [[balanced]] diet keeps us healthy.",
              "zh": "均衡的饮食让我们保持健康。"
            }
          ]
        },
        {
          "w": "diet",
          "ipa": "/ˈdaɪət/",
          "pos": "n.",
          "zh": "日常饮食；日常食物",
          "page": 43,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Eating fruit every day is part of a healthy [[diet]].",
              "zh": "每天吃水果是健康饮食的一部分。"
            }
          ]
        },
        {
          "w": "each",
          "ipa": "/iːtʃ/",
          "pos": "det. & pron.",
          "zh": "（两个或以上的人或物中）各自，各个，每个",
          "page": 43,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "[[Each]] student has a lunch box.",
              "zh": "每个学生都有一个饭盒。"
            }
          ]
        },
        {
          "w": "plenty",
          "ipa": "/ˈplenti/",
          "pos": "pron.",
          "zh": "大量",
          "page": 43,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Don't worry about the food. We have [[plenty]].",
              "zh": "别担心食物，我们有很多。"
            }
          ]
        },
        {
          "w": "plenty of",
          "ipa": "",
          "pos": "",
          "zh": "大量；很多的",
          "page": 43,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "Drink [[plenty of]] water every day.",
              "zh": "每天要多喝水。"
            }
          ]
        },
        {
          "w": "choice",
          "ipa": "/tʃɔɪs/",
          "pos": "n.",
          "zh": "选择；挑选；抉择",
          "page": 44,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "choices"
          ],
          "ex": [
            {
              "en": "Fruit is a good [[choice]] for a snack.",
              "zh": "水果是零食的好选择。"
            },
            {
              "en": "There are many [[choices]] on the menu.",
              "zh": "菜单上有很多选择。"
            }
          ]
        },
        {
          "w": "list",
          "ipa": "/lɪst/",
          "pos": "n.",
          "zh": "一览表；清单",
          "page": 44,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "lists"
          ],
          "ex": [
            {
              "en": "Let's make a shopping [[list]] first.",
              "zh": "我们先列个购物清单吧。"
            },
            {
              "en": "Mum keeps her [[lists]] on the fridge.",
              "zh": "妈妈把她的清单贴在冰箱上。"
            }
          ]
        },
        {
          "w": "few",
          "ipa": "/fjuː/",
          "pos": "det. & adj.",
          "zh": "不多；很少",
          "page": 44,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "Very [[few]] people know the answer.",
              "zh": "很少有人知道答案。"
            }
          ]
        },
        {
          "w": "a few",
          "ipa": "",
          "pos": "",
          "zh": "有些；几个（用于可数名词之前）",
          "page": 44,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "I have [[a few]] questions about the recipe.",
              "zh": "我对这个食谱有几个问题。"
            }
          ]
        },
        {
          "w": "pleasure",
          "ipa": "/ˈpleʒə(r)/",
          "pos": "n.",
          "zh": "高兴；快乐；愉快",
          "page": 44,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "— Thanks for your help. — My [[pleasure]].",
              "zh": "——谢谢你的帮助。——不客气。"
            }
          ]
        },
        {
          "w": "ingredient",
          "ipa": "/ɪnˈɡriːdiənt/",
          "pos": "n.",
          "zh": "（尤指烹饪）材料；成分",
          "page": 44,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "Eggs are the main [[ingredient]] of this cake.",
              "zh": "鸡蛋是这个蛋糕的主要材料。"
            }
          ]
        },
        {
          "w": "tasty",
          "ipa": "/ˈteɪsti/",
          "pos": "adj.",
          "zh": "美味的；可口的",
          "page": 45,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "The noodles are hot and [[tasty]].",
              "zh": "面条又热又好吃。"
            }
          ]
        },
        {
          "w": "need",
          "ipa": "/niːd/",
          "pos": "v.",
          "zh": "需要",
          "page": 45,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "needs"
          ],
          "ex": [
            {
              "en": "We [[need]] some milk for breakfast.",
              "zh": "我们早餐需要一些牛奶。"
            },
            {
              "en": "The plant [[needs]] water and sunlight.",
              "zh": "这株植物需要水和阳光。"
            }
          ]
        },
        {
          "w": "fridge",
          "ipa": "/frɪdʒ/",
          "pos": "n.",
          "zh": "冰箱",
          "page": 45,
          "basic": true,
          "note": "(= refrigerator)",
          "core": true,
          "exam": true,
          "forms": [
            "fridges"
          ],
          "ex": [
            {
              "en": "Put the meat in the [[fridge]].",
              "zh": "把肉放进冰箱里。"
            },
            {
              "en": "The shop sells big and small [[fridges]].",
              "zh": "这家店卖大大小小的冰箱。"
            }
          ]
        },
        {
          "w": "surprise",
          "ipa": "/səˈpraɪz/",
          "pos": "n.",
          "zh": "意想不到（或突然）的事",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "surprises"
          ],
          "ex": [
            {
              "en": "The party is a [[surprise]] for Dad.",
              "zh": "这个聚会是给爸爸的惊喜。"
            },
            {
              "en": "Life is full of [[surprises]].",
              "zh": "生活充满了惊喜。"
            }
          ]
        },
        {
          "w": "blog",
          "ipa": "/blɒɡ/",
          "pos": "n.",
          "zh": "博客；网志",
          "page": 46,
          "basic": false,
          "note": "(= weblog)",
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "My cousin writes a food [[blog]].",
              "zh": "我表姐写美食博客。"
            }
          ]
        },
        {
          "w": "as",
          "ipa": "/æz; əz/",
          "pos": "prep.",
          "zh": "作为；当作",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": true,
          "ex": [
            {
              "en": "She works [[as]] a cook in a hotel.",
              "zh": "她在一家酒店当厨师。"
            }
          ]
        },
        {
          "w": "soy sauce",
          "ipa": "/ˌsɔɪ ˈsɔːs/",
          "pos": "n.",
          "zh": "酱油",
          "page": 46,
          "basic": false,
          "note": "(= soya sauce)",
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "Add some [[soy sauce]] to the noodles.",
              "zh": "往面条里加点酱油。"
            }
          ]
        },
        {
          "w": "into",
          "ipa": "/ˈɪntuː; ˈɪntə/",
          "pos": "prep.",
          "zh": "进入；变成（表示状态的变化）",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": true,
          "manual": true,
          "ex": [
            {
              "en": "Put the noodles [[into]] the hot water.",
              "zh": "把面条放进热水里。"
            }
          ]
        },
        {
          "w": "piece",
          "ipa": "/piːs/",
          "pos": "n.",
          "zh": "碎片；碎块",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "pieces"
          ],
          "ex": [
            {
              "en": "Can I have a [[piece]] of cake?",
              "zh": "我能吃一块蛋糕吗？"
            },
            {
              "en": "Cut the apple into four [[pieces]].",
              "zh": "把苹果切成四块。"
            }
          ]
        },
        {
          "w": "fry",
          "ipa": "/fraɪ/",
          "pos": "v.",
          "zh": "油炒；油煎",
          "page": 46,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "Grandma likes to [[fry]] fish for us.",
              "zh": "奶奶喜欢给我们煎鱼。"
            }
          ]
        },
        {
          "w": "finally",
          "ipa": "/ˈfaɪnəli/",
          "pos": "adv.",
          "zh": "最后",
          "page": 46,
          "basic": false,
          "core": false,
          "exam": true,
          "ex": [
            {
              "en": "[[Finally]], put the cake in the oven.",
              "zh": "最后，把蛋糕放进烤箱。"
            }
          ]
        },
        {
          "w": "boil",
          "ipa": "/bɔɪl/",
          "pos": "v.",
          "zh": "用沸水煮；烧开",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "boils"
          ],
          "ex": [
            {
              "en": "Please [[boil]] some water for tea.",
              "zh": "请烧点开水泡茶。"
            },
            {
              "en": "Water [[boils]] at 100 degrees.",
              "zh": "水在 100 度沸腾。"
            }
          ]
        },
        {
          "w": "side",
          "ipa": "/saɪd/",
          "pos": "n.",
          "zh": "一边；侧面",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "sides"
          ],
          "ex": [
            {
              "en": "There is a shop on each [[side]] of the road.",
              "zh": "路的两边各有一家商店。"
            },
            {
              "en": "A box has six [[sides]].",
              "zh": "一个盒子有六个面。"
            }
          ]
        },
        {
          "w": "side dish",
          "ipa": "",
          "pos": "",
          "zh": "（随同主菜一起上的）配菜",
          "page": 46,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "We have rice with a [[side dish]] of vegetables.",
              "zh": "我们吃米饭配一份蔬菜配菜。"
            }
          ]
        },
        {
          "w": "mutton",
          "ipa": "/ˈmʌtn/",
          "pos": "n.",
          "zh": "羊肉",
          "page": 46,
          "basic": true,
          "core": true,
          "exam": false,
          "ex": [
            {
              "en": "People in the north often eat [[mutton]] in winter.",
              "zh": "北方人冬天常吃羊肉。"
            }
          ]
        },
        {
          "w": "recipe",
          "ipa": "/ˈresəpi/",
          "pos": "n.",
          "zh": "食谱；烹饪法",
          "page": 47,
          "basic": false,
          "core": false,
          "exam": false,
          "ex": [
            {
              "en": "This [[recipe]] is easy to follow.",
              "zh": "这个食谱很容易照着做。"
            }
          ]
        },
        {
          "w": "beat",
          "ipa": "/biːt/",
          "pos": "v.",
          "zh": "（用叉等）快速搅拌；打",
          "page": 50,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "beats"
          ],
          "ex": [
            {
              "en": "[[Beat]] two eggs before you cook them.",
              "zh": "做之前先把两个鸡蛋打散。"
            },
            {
              "en": "My brother [[beats]] the cream with a fork.",
              "zh": "我弟弟用叉子打奶油。"
            }
          ]
        },
        {
          "w": "chopsticks",
          "ipa": "/ˈtʃɒpstɪks/",
          "pos": "n.",
          "zh": "筷子",
          "page": 50,
          "basic": true,
          "note": "(pl.)",
          "core": true,
          "exam": false,
          "ex": [
            {
              "en": "Can you use [[chopsticks]]?",
              "zh": "你会用筷子吗？"
            }
          ]
        },
        {
          "w": "bowl",
          "ipa": "/bəʊl/",
          "pos": "n.",
          "zh": "碗",
          "page": 50,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "bowls"
          ],
          "ex": [
            {
              "en": "I have a [[bowl]] of rice for lunch.",
              "zh": "我午饭吃一碗米饭。"
            },
            {
              "en": "Please put the [[bowls]] on the table.",
              "zh": "请把碗放到桌上。"
            }
          ]
        },
        {
          "w": "menu",
          "ipa": "/ˈmenjuː/",
          "pos": "n.",
          "zh": "菜单",
          "page": 53,
          "basic": true,
          "core": true,
          "exam": true,
          "forms": [
            "menus"
          ],
          "ex": [
            {
              "en": "Let me see the [[menu]], please.",
              "zh": "请让我看看菜单。"
            },
            {
              "en": "The waiter brings us two [[menus]].",
              "zh": "服务员给我们拿来两份菜单。"
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
