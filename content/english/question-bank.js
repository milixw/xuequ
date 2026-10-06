'use strict';
// 由 scripts/import-english-bank.py 从错题 PDF 提取；文本、答案和解析待人工核对。
(function (root) {
  const questions = [
  {
    "id": "xdf-6e7122cb546618b6",
    "type": "choice",
    "text": "When the sun _______ in the morning, our national flag _______.\nA. is raised, will be raised\nB. rises, will be risen\nC. rises, will be raised\nD. is raised, will rise",
    "answer": "C",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：当太阳在早晨升起时，我们的国旗就会升起。\n考查时间状语从句及被动语态。本句是由when引导的时间状语从句。结合选项可知， 从句时态为一般\n现在时。sun和rise之间是主动关系，排除AD；第二空所在句为主句，用一般将来时，主谓和谓语之间\n是被动关系，用被动语态。rise是不及物动词，没有被动语态，排除B。故选C。"
  },
  {
    "id": "xdf-38f89d8d6919cf33",
    "type": "choice",
    "text": "Through the years, Jolin made much in becoming an excellent dancer and\nperformer.\nA. advantage\nB. progress\nC. opinion\nD. conclusion",
    "answer": "B",
    "answerSource": {"kind":"ai-supplement","originalAnswer":null,"checkedAt":"2026-10-06","review":{"status":"pending"}},
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 2,
        "page": 1
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-eb1397d4189c2411",
    "type": "choice",
    "text": "I was writing a letter at home ________ I heard a knock on the door.\nA. while\nB. when\nC. but\nD. as",
    "answer": "B",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 3,
        "page": 1
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 3,
        "page": 1
      },
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我正在家写信这时我听到敲门声。\n考查连词辨析。while当……时候，与……同时，引导从句动作必须是延续性动词；when当……时候，\n在那时，可表示一个动作正在进行时，突然另一个动作发生了；but但是；as当……时，随着。根据语\n境可知，本题应考查sb. was/were doing when sb. did sth表示“某人正在做某事突然发生另一件\n事”。故选B。"
  },
  {
    "id": "xdf-5d27db6f9be93dd2",
    "type": "choice",
    "text": "Jack was about to tell the secret_______ someone patted him on the shoulder.\nA. as\nB. until\nC. while\nD. when",
    "answer": "D",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 4,
        "page": 1
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 4,
        "page": 1
      },
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：杰克正要说出这个秘密，这时有人拍了拍他的肩膀。\nA. 像……一样；B. 直到；C. 当……时，引导的从句动作要用进行时态；D. 当……时；引导的动作可\n以用过去时，也可以用进行时态；根据句意理解可知，这里从句的动作pat是短暂性的，是过去时，所\n以应该选择when，所以这里应该选择D。"
  },
  {
    "id": "xdf-d10a74ef8943c3bc",
    "type": "choice",
    "text": "like Hawaii, Lenovo used to do with foreigners.\nA. Business; business\nB. Businesses; businesses\nC. Businesses; business\nD. Business; businesses",
    "answer": "C",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 5,
        "page": 1
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 5,
        "page": 1
      },
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：像夏威夷、联想这样的公司过去常常和外国人做生意。\nbusiness是一个名词，意为“商业，买卖，生意”，此时是不可数名词；做可数名词时，意为“企业，\n公司”。结合句意可知，第一个空表示“公司”，且应用复数形式；第二个空表示“做生意”，没有复\n数形式。故选C。"
  },
  {
    "id": "xdf-bebd63fba73213a4",
    "type": "choice",
    "text": "Lisa didn’t notice the mistake she made at all ________ she read the article once again.\nA. until\nB. while\nC. since\nD. after",
    "answer": "A",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 6,
        "page": 1
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 6,
        "page": 1
      },
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：丽莎根本没有注意到她犯的错误，直到她又读了一遍文章。\n考查连词辨析。until直到；while当……时候；since自从；after在……之后。根据“Lisa didn’t\nnotice the mistake she made at all...she read the article once again.”可知应用until引导时\n间状语从句。not...until...直到……才……，固定搭配。故选A。"
  },
  {
    "id": "xdf-6404da0df5ef02a3",
    "type": "choice",
    "text": "I _______ Jenny about the good news as soon as she _______ back.\nA. will tell; will come\nB. will tell; comes\nC. tell; comes\nD. tell; will come",
    "answer": "B",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 7,
        "page": 2
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 7,
        "page": 2
      },
      {
        "file": "错题_05_20260922_215416.pdf",
        "number": 3,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "“as soon as”（一…… 就……）引导时间状语从句，遵循 “主将从现” 原则，即主句用一般将来\n时（will tell），从句用一般现在时（comes）；A 选项从句用将来时，C 选项主句用一般现在时，D\n选项主从句时态搭配错误，均不符合规则。故选 B。"
  },
  {
    "id": "xdf-174514d71a33f174",
    "type": "reading",
    "text": "根据短文内容，选择正确答案。\nThis was the first real task I received in my new school. It seemed simple: go on the Internet\nand find information about a man named George Washington. As I searched the name, I found\nthat there were two famous people having the same name who looked completely different! One\ninvented hundreds of uses for peanuts, while the other led some sort of army across America. I\nstared at the screen, wondering which one my teacher meant. I called my grandfather for a\ngolden piece of advice; let the coin decide. I flipped (掷) a coin and Ah! Tails (背面)! My report\nwould be about the great main who invented peanut butter, George Washington Carver.\nWeeks later, I stood in front of the classroom and proudly read my homework. But things\nstarted to get strange. I looked around the room, only to find my classmates with big smiles on\ntheir faces and tears in their eyes and my stone–faced teacher. I was completely lost. \"What\ncould be causing everyone to act this way?'\nOh well, I dropped the paper and sat down at my desk, burning to find out what I had done\nwrong. As a classmate began his report, it all became clear, \"My report is on George Washington,\nthe man who started the American War of Independence.\" The whole world became quiet! How\ncould I know that my teacher meant that George Washington?\nOf course, my subject result was awful. Sad but fearless, I decided to turn this around. I\ntalked to the headmaster Miss Lancelot, but she said firmly: No re–dos; no new score. I felt that it\nwas not fair, and I believed I deserved a second chance. So I threw myself heartily into my work\nfor the rest of the school year. Ten months later, I sat in the headmaster's office again, but this\ntime a completely different conversation. I smiled and flashed back to the terrible moment at the\nbeginning of the year as the headmaster told me I was good enough to skip (跳过) the 6th grade\nand started the 7th grade next term.\n(1)单选题 The task I received was to find information about .\nA. my headmaster Miss Lancelot\nB. American War of Independence\nC. George Washington\nD. uses for peanuts\n(2)单选题 helped me decide what my report would be about.\nA. The Internet\nB. A coin\nC. My grandpa\nD. My classmates\n(3)单选题 People in the class acted strangely because .\nA. I was too proud of my homework\nB. the teacher's face turned to a stone\nC. the whole world suddenly became quiet\nD. I mistook what the homework was about\n(4)单选题 I after I failed the subject.\nA. worked harder to prove my ability\nB. started to study from the 7th grade\nC. was so frightened at the awful result\nD. was given a second chance to redo the work\n(5)单选题 We can infer (推断) from the passage that .\nA. the headmaster didn't like the writer at all\nB. the writer's classmates felt sad at his mistake\nC. the writer knew little about American history\nD. the writer's grandpa was a very wise man",
    "answer": "(1) C (2) B (3) D (4) A (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":null,"checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_05_20260922_215416.pdf","number":2,"page":1,"sha256":"1a45a734304c4a7ffd2004b1f04321720da115e00efe95fcc1327501774ad476","samePaperQuestion":"xdf-5f0f4fca9e7e2301"},
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 8,
        "page": 2
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-cd65462bdec81cb2",
    "type": "choice",
    "text": "Next, cook the tomatoes in the pan ________ they are soft.\nA. when\nB. while\nC. after\nD. until",
    "answer": "D",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 9,
        "page": 3
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 9,
        "page": 3
      },
      {
        "file": "错题_05_20260922_215416.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：接下来，在锅里煮西红柿，直到它们变软。\nwhen当……时；while当……期间；after在……之后；until直到……为止。根据“cook the\ntomatoes in the pan ... they are soft”可知，煮西红柿的动作需要持续进行，直到达到变软的状态\n为止，until引导时间状语从句符合语境。"
  },
  {
    "id": "xdf-812ba9a9ce451291",
    "type": "choice",
    "text": "Most of the villagers were sleeping ________ the earthquake happened.\nA. until\nB. when\nC. while\nD. after",
    "answer": "B",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 10,
        "page": 3
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 10,
        "page": 3
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_05_20260922_215416.pdf",
        "number": 4,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：地震发生时，大多数村民正在睡觉。\n考查从属连词辨析。until直到；when当……时候；while当……时候；after在……之后。根\n据“Most of the villagers were sleeping…the earthquake happened.”可知，主句是持续性动\n作“were sleeping”，从句是短暂性动作“happened”，用“when”引导时间状语从句，表示当\n短暂事件发生时，持续性动作正在进行。故选B。"
  },
  {
    "id": "xdf-87772dea64f62aae",
    "type": "choice",
    "text": "In the past 10 years, the life of ordinary people________dramatically.\nA. changed\nB. has changed\nC. have changed\nD. had changed",
    "answer": "B",
    "answerSource": {"kind":"ai-supplement","originalAnswer":null,"checkedAt":"2026-10-06","review":{"status":"pending"}},
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 11,
        "page": 4
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 11,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-00684949199af900",
    "type": "choice",
    "text": "If I driving test tomorrow, I will have another try.\nA. will fail\nB. am failing\nC. fail\nD. failed",
    "answer": null,
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 12,
        "page": 4
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 12,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-035ded739f46e89f",
    "type": "choice",
    "text": "Gork opened the cave door a little and told his kangaroos to go out one after________.\nA. another\nB. other\nC. the others\nD. the other",
    "answer": "A",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 13,
        "page": 4
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 13,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-68b4a75015e805bb",
    "type": "choice",
    "text": "Will you please tell him to stop playing computer games? Your words carry more weight\nthan ______.\nA. anybody’s\nB. anybody's else\nC. anybody else’s\nD. anybody elses’",
    "answer": "C",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 14,
        "page": 4
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 14,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-df644f0adf5ea0d7",
    "type": "choice",
    "text": "He is a man of ________ words and he seldom goes out with his friends, either.\nA. a little\nB. little\nC. few\nD. a few",
    "answer": "C",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 15,
        "page": 4
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 15,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-70fcc7b611825989",
    "type": "choice",
    "text": "Liu Xiang runs faster than _________ in America.\nA. any other athlete\nB. any other athletes\nC. any athlete\nD. any athletes",
    "answer": "C",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 16,
        "page": 5
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 16,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-52ff904271b0c8f9",
    "type": "choice",
    "text": "There are three books on the shelf. One is an English book, ________ are French books.\nA. others\nB. the other\nC. another\nD. the others",
    "answer": "D",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 17,
        "page": 5
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 17,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-e20636e50a5e4d34",
    "type": "choice",
    "text": "Boy students are interested in sports. Some like running, or swimming, and ____like ball\ngames.\nA. the others\nB. others\nC. the other\nD. other",
    "answer": "B",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 18,
        "page": 5
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 18,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-9023b30e443ef0b6",
    "type": "choice",
    "text": "We didn't reach an agreement yesterday because neither side would give way to_______.\nA. another\nB. any other\nC. other\nD. the other",
    "answer": "D",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 19,
        "page": 5
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 19,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-8a2f29efb28102f2",
    "type": "fill",
    "text": "A. Also B. far from C. worried D. raise E. important F.\nHowever\nWhere does the seafood we eat come from? You may have a quick answer: the sea. But\nXinjiang people may say: “It is not true.”\nXinjiang is (1) the sea. Now it welcomes a big harvest of local “seafood”, such as\nshrimp and crabs.\nThe most (2) thing for aquatic products (水产品) is water. Xinjiang has many\nrivers and lakes with water from the melting snow and glaciers of the Tianshan Mountains. With\nthe water, fishermen can build fish ponds.\n(3) , land in Xinjiang has a lot of salt. This is not good for growing crops. But “one\nman’s trash is another man’s treasure”. The land makes the underground water salty. People turn\nthe salty water into “man–made seawater”. They then use it to (4) sea fish, shrimp\nand crabs.\nNow some of Xinjiang’s “seafood” goes to many cities in China. It also goes to countries in\nSoutheast Asia.\nMany people are (5) about the safety of seafood because of the nuclear-\ncontaminated water (核污染水). Now, Xinjiang’s “seafood” is becoming a new choice for seafood\nlovers.",
    "answer": null,
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 20,
        "page": 5
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 20,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-2e1709599cc545f5",
    "type": "choice",
    "text": "He has the advantage ________ learning English early in childhood.\nA. of\nB. on\nC. to\nD. for",
    "answer": "A",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 21,
        "page": 6
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 21,
        "page": 6
      },
      {
        "file": "错题_06_20260922_215426.pdf",
        "number": 4,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：他有小时候早早学习英语的优势。\n固定搭配have the advantage of doing sth.表示“拥有做某事的优势”，介词of后接动名词；on、\nto、for均不能与advantage搭配该结构。"
  },
  {
    "id": "xdf-fd9788795467c8b6",
    "type": "choice",
    "text": "Research has shown that having a preference for junk food can _______ obesity (肥胖).\nA. come up with\nB. result in\nC. due to\nD. as a result of",
    "answer": "B",
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 22,
        "page": 6
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 22,
        "page": 6
      },
      {
        "file": "错题_06_20260922_215426.pdf",
        "number": 3,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "根据句意，研究表明，偏爱垃圾食品会导致肥胖。导致，result in，故选B。"
  },
  {
    "id": "xdf-eb7c5953f169a6b9",
    "type": "reading",
    "text": "The Great Wall is one of the greatest wonders of the world. It has a long history of\nover 2,000 years. It was built to protect the country from enemies.\nThe Great Wall is very long. It runs from the east to the west of China. It is about 21,196\nkilometers long. The walls are usually about 7–8 meters high and 6–5 meters wide.\nBuilding the Great Wall was a difficult task. In ancient times, there were no modern\nmachines. Workers had to carry heavy stones and bricks by hand. Many people lost their lives\nduring the construction. But their hard work finally created this great wonder.\nToday, the Great Wall is a famous tourist attraction. Millions of people from all over the world\ncome to visit it every year. They climb the Great Wall, take photos and learn about its history.\nThe Great Wall is not only a symbol of China’s ancient civilization, but also a symbol of the\nwisdom and perseverance of the Chinese people. We should protect it and pass on its culture to\nfuture generations.\n(1)单选题 What was the Great Wall built for?\nA. To attract tourists.\nB. To protect the country from enemies.\nC. To show the wisdom of the Chinese people.\nD. To carry heavy stones.\n(2)单选题 How long is the Great Wall?\nA. About 7–8 kilometers.\nB. About 6–5 kilometers.\nC. About 21,196 kilometers.\nD. About 2,000 kilometers.\n(3)单选题 How did workers build the Great Wall in ancient times?\nA. With modern machines.\nB. By carrying heavy stones and bricks by hand.\nC. By using advanced technology.\nD. By asking for help from other countries.\n(4)单选题 What is the Great Wall now?\nA. A symbol of China’s ancient civilization.\nB. A famous tourist attraction.\nC. A place for workers to rest.\nD. A symbol of perseverance.\n(5)单选题 What should we do according to the passage?\nA. Visit the Great Wall every year.\nB. Build more walls.\nC. Protect the Great Wall and pass on its culture.\nD. Learn about the history of other countries.",
    "answer": "(1) B (2) C (3) B (4) B (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":null,"checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_06_20260922_215426.pdf","number":2,"page":2,"sha256":"9a1a864d95a2dc5c1b9881cc64b22da79c5fe858dd60a4916aec0a6e02f8b379","samePaperQuestion":"xdf-6ba4eee091032424"},
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 23,
        "page": 6
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 23,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-b52f20ae6ca31f0b",
    "type": "reading",
    "text": "There is a town near Suzhou. It is very interesting and\nbeautiful. This is Luxiang, an old town. Luxiang was built in\nthe Southern Song dynasty(1127~1279). There were many\nfamous people living in the town at that time.\nThere are around 30 old buildings of Ming and\nQing(1368~1912) dynasties now. People live a simple life. Six\nlanes(巷) in the town go to Taihu Lake.\nLuxiang looks more beautiful in spring, with many tea\ntrees and orchards(果园). This place is famous for the tea\ncalled Biluocun.\nThe Egyptian pyramids were built around 2560 B.C. The\nlargest one of them is the Great Pyramid of Khufu. The King\nKhufu built it as his tomb.\nThe Great Pyramid was considered a unique(独特的)\nbuilding in the 19th century A.D. At that time, it was still the\ntallest construction( 建 筑 物 ) in the world. According to\nscientific research, Khufu ordered his men to build it stone\nby stone. The biggest stone was over 15 tons, and each\nstone was fixed so well.\nThe Great Pyramid has four sides and each side is\nabout 230–4 metres long and 146–59 metres high. At that\ntime, there were no modern machines or equipment, so\nhow did the ancient Egyptians build? To this day, it is still a\nmystery.\n(1)单选题 Many famous people lived in Luxiang ________.\nA. from 1127 to 1279\nB. from 1368 to 1912\nC. from 1127 to 1368\nD. from 1279 to 1912\n(2)单选题 Luxiang is famous for ________.\nA. orchards\nB. tea trees\nC. Biluochun\nD. six lanes\n(3)单选题 In order to build his tomb, the King Khufu built ________.\nA. the ancient pyramids\nB. the Egyptian pyramids\nC. the Great pyramid\nD. the mysterious pyramids\n(4)单选题 Building the Great Pyramid is still a mystery now, because ________.\nA. each stone was fixed well\nB. there were no modern machines or equipment then\nC. it was made of stone\nD. it was the tallest construction in the world\n(5)单选题 Which of the following is TRUE?\nA. Each stone of the Great Pyramid is about 230–4 metres long and 146–59 metres wide.\nB. Luxiang is far away from Suzhou.\nC. Luxiang looks more beautiful except spring.\nD. In the 19thcentury A.D. , the Great pyramid was special and unusual.",
    "answer": "(1) A (2) C (3) C (4) B (5) D",
    "answerSource": {"kind":"local-original","originalAnswer":null,"checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_06_20260922_215426.pdf","number":1,"page":1,"sha256":"9a1a864d95a2dc5c1b9881cc64b22da79c5fe858dd60a4916aec0a6e02f8b379","samePaperQuestion":"xdf-6f4bbab652524923"},
    "sources": [
      {
        "file": "错题_01_20260922_214806.pdf",
        "number": 24,
        "page": 7
      },
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 24,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-f6e903e7255f3c30",
    "type": "choice",
    "text": "His talk had __________ me.\nA. a big effect to\nB. a deep effect on\nC. a deep effect for\nD. a deep affect on",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 25,
        "page": 9
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 2,
        "page": 1
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 50,
        "page": 11
      },
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 11,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：他的演讲对我有很深的影响。\n考查固定短语。have an effect on sb.“对某人有影响”，可以用形容词来修饰effect。affect是动词，\n排除D项。故选B。"
  },
  {
    "id": "xdf-c76086002be42736",
    "type": "choice",
    "text": "Many topics ______ in the course, ______ food and drink, travel and hotels.\nA. include; including\nB. are included; including\nC. including; including\nD. are included; include",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 26,
        "page": 9
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 3,
        "page": 1
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 51,
        "page": 11
      },
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 10,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本题考查时态和非谓语动词。\n解题要点：①分析第一句句子结构，缺少谓语，排除C。因为including是非谓语且为主动；②topic和\ninclude是被动关系，又因为主语是复数所以第一空填are included。第二空因句中已有谓语动词，故\n填非谓语 including。这个课包含很多主题，包括食物饮料，旅行和酒店。"
  },
  {
    "id": "xdf-24abef8bd9d4a087",
    "type": "choice",
    "text": "To ensure the feasibility of an idea, we need to do ________ .\nA. no research\nB. some research\nC. a lot of research\nD. very little research",
    "answer": "C",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 27,
        "page": 9
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 4,
        "page": 1
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 47,
        "page": 10
      },
      {
        "file": "错题_18_20260922_215551.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：为了确保一个想法的可行性，我们需要做许多研究。\n考查代词和不可数名词数量的表达。no research没有研究；some research一些研究；a lot of\nresearch许多研究；very little research很少研究。根据“To ensure the feasibility of an idea”可知，\n为了确保一个想法的可行性，我们需要做大量的研究。故选C。"
  },
  {
    "id": "xdf-9260aa403d0d7c58",
    "type": "choice",
    "text": "审题型。\nWould you follow the example of Jiang Mengnan？Why or why not？\nA. 由一般疑问句引出的判断\nB. 由选择疑问句(A or B)来提问文章细节\nC. 由特殊疑问句来提问文章细节\nD. 由特殊疑问句来概括主旨要义",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 28,
        "page": 10
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 5,
        "page": 1
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 46,
        "page": 10
      },
      {
        "file": "错题_18_20260922_215551.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "你会以姜梦楠为榜样吗？为什么或者为什么不？\n这里是以特殊疑问句来概括主旨要义。"
  },
  {
    "id": "xdf-0367f95a1f5aade4",
    "type": "choice",
    "text": "—Your help is of great _______ to me.\n—You’re welcome.I hope it’s _______ to you.\nA. use; useful\nB. useful; useful\nC. useless; useless\nD. useless; useful",
    "answer": "A",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 29,
        "page": 10
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 6,
        "page": 1
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 48,
        "page": 10
      },
      {
        "file": "错题_18_20260922_215551.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考查词性及词义辨析。第一空：“of + 名词” 相当于形容词，“of great use” 相当于 “very useful”\n，意为 “很有用” ，所以第一空用 “use” 。第二空：“be useful to” 是固定短语，意为 “对…… 有用” ，\n所以第二空用 “useful” 。故选 A 。"
  },
  {
    "id": "xdf-4a0e5e0f1263e0b8",
    "type": "choice",
    "text": "Reading good books can ________ our understanding of the world.\nA. acquire\nB. promote\nC. concern\nD. worth",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 30,
        "page": 10
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 7,
        "page": 2
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 44,
        "page": 9
      },
      {
        "file": "错题_18_20260922_215551.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：读好书可以提升我们对世界的理解。\nacquire获得；promote促进、增进；concern涉及、关心；worth值得，是形容词。根据“our\nunderstanding of the world”可知，阅读好书能增进理解，应填promote。"
  },
  {
    "id": "xdf-ad1efa3fbf82632c",
    "type": "choice",
    "text": "The __________ of the disaster is still remembered today.\nA. victim\nB. heroine\nC. impact\nD. alarm",
    "answer": "C",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 31,
        "page": 10
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 8,
        "page": 2
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 45,
        "page": 9
      },
      {
        "file": "错题_18_20260922_215551.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：灾难的影响今天仍然被记住。\n考查名词辨析。victim受害者；heroine女英雄；impact影响；alarm警报。根据“still remembered\ntoday”可知，灾难的“影响”通常指其长期后果或教训，容易被铭记。故选C。"
  },
  {
    "id": "xdf-be099713659a9a82",
    "type": "choice",
    "text": "一Do you get bored to stay at home?\n—Yes, I look forward to ____ back to school.\nA. going\nB. went\nC. go\nD. goes",
    "answer": "A",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 32,
        "page": 10
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 9,
        "page": 2
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 33,
        "page": 6
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 10,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：-你待在家里感到无聊吗？-是的，我盼望回到学校。going去某地，动名词形式；went是go的\n过去式；go动词原形；goes第三人称单数形式。句中谓语动词是look forward to，盼望着，期待着，\n后面跟名词或者动名词形式，故应选A。"
  },
  {
    "id": "xdf-17b69eecd4821242",
    "type": "choice",
    "text": "Almost everyone is thirsty ________ success.\nA. of\nB. with\nC. for",
    "answer": "C",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 33,
        "page": 11
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 10,
        "page": 2
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 32,
        "page": 6
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 11,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：几乎每个人都渴望成功。\n考查介词。of属于；with具有；for对于。这里是：be thirsty for意为“渴望……”，因此用介词for。故\n选C。"
  },
  {
    "id": "xdf-e915c6cb975b5386",
    "type": "choice",
    "text": "In Chinese classes, if you know the answer to the teacher’s question, usually, you will\n_______ your hand and ________ to speak.\nA. rise; raise\nB. raise; rise\nC. rise; rise\nD. raise; raise",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 34,
        "page": 11
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 11,
        "page": 2
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 31,
        "page": 6
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 12,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：在语文课上，如果你知道老师问题的答案，通常你会举起你的手，提到你的声音说。Raise表示\n举起来，是借助外力，一般是举起手来; rise表示上升，升起，是没有借助外力自然地提升。故选B。\n点睛：raise是及物动词，后面一定要加宾语。\n而rise是不及物动词，后面不能加宾语\n1.raise 提起，使升高\n如：raise one's hand 举手\n2.rise 上升，升高，上涨，指有形的东西。如：\nThe sun rises in the east."
  },
  {
    "id": "xdf-478eb7816ca24b1a",
    "type": "choice",
    "text": "I got up late this morning, but I ran to the bus stop just _______ to catch the\nearly bus.\nA. in time\nB. in the time\nC. on time\nD. on the time",
    "answer": "A",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 35,
        "page": 11
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 30,
        "page": 5
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 13,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：今天早上我起床晚了，但我及时跑到到达公共汽车站，赶上了早班车。\nin time意为“及时”，表示“恰好、正是时候”；on time意为“按时”，表示“按照计划或预先的时间安\n排”。结合语境可知，答案为A。"
  },
  {
    "id": "xdf-cb683e73a96d83d1",
    "type": "choice",
    "text": "________ so many lights ________ bright at night, Hongyadong looks like a wonderland.\nA. As, shining\nB. With, shine\nC. As, to shine\nD. With, shining",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 36,
        "page": 11
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 13,
        "page": 3
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 29,
        "page": 5
      },
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：晚上有这么多的灯在闪烁，洪崖洞看起来像一个仙境。\n考查介词辨析和非谓语动词。as作为；with随着，其后接单词或短语。由于with sth. doing表示“伴随\n着某事进行”，根据“Hongyadong looks like a wonderland”可知，是伴随着灯光闪烁的情况，洪崖洞\n看起来像一个仙境。故选D。"
  },
  {
    "id": "xdf-4791e9200fa1f035",
    "type": "choice",
    "text": "He carried the box on his ________ and walked into the room.\nA. an shoulder\nB. shoulder\nC. the shoulder\nD. a shoulder",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 37,
        "page": 11
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 14,
        "page": 3
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 28,
        "page": 5
      },
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：他把箱子扛在肩上，走进了房间。\n考查名词用法。根据“He carried the box on his…”以及选项可知，此处指他把箱子扛在肩上，空前为\nhis，空处应用单数名词shoulder。故选B。"
  },
  {
    "id": "xdf-e7a327b2d5983b2f",
    "type": "choice",
    "text": "Our country is taking action to ________ pollution.\nA. cut down\nB. cut up\nC. cut out\nD. cut off",
    "answer": "A",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 38,
        "page": 11
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 15,
        "page": 3
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 26,
        "page": 5
      },
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我们的国家正在采取措施来减少污染。\n考查动词短语辨析。cut down减少；cut up切碎；cut out裁剪；cut off中断。根据“taking action to\n________ pollution.”可知应表示采取措施来减少污染。故选A。"
  },
  {
    "id": "xdf-110b6d99b2f39543",
    "type": "choice",
    "text": "The purpose of building the Great Wall was to _________ enemies.\nA. keep on\nB. keep up\nC. keep from\nD. keep out",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 39,
        "page": 12
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 16,
        "page": 3
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 25,
        "page": 5
      },
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：修建长城的目的是为了阻挡敌人。\n考查短语辨析。keep on继续；keep up保持；keep from不让（某人）做某事；keep out抵御，阻止\n某 人 或 某 物 进 入 某 个 区 域 或 空 间 。 根 据 “The purpose of building the Great Wall was\nto...enemies.”可知，此处指的是“抵御敌人”，故选D。"
  },
  {
    "id": "xdf-f2006ed8b4dfa4f0",
    "type": "choice",
    "text": "Her great courage helped her _______ the difficulties.\nA. go over\nB. go on\nC. go ahead\nD. go through",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 40,
        "page": 12
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 17,
        "page": 3
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 23,
        "page": 4
      },
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "A 复习；B 继续；C 前行；D 经历；根据句意：她的巨大勇气帮助她渡过了难关。故选D。"
  },
  {
    "id": "xdf-44afa27745a0f30d",
    "type": "choice",
    "text": "Most young people prefer ________ news on ________ devices like smartphones or tablets.\nA. read; digital\nB. reading; digital\nC. to read; live\nD. reading; classical",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 41,
        "page": 12
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 18,
        "page": 3
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 18,
        "page": 3
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：大多数年轻人更喜欢在智能手机或平板电脑等数字设备上阅读新闻。\n考查非谓语动词和形容词辨析。read阅读，动词原形；digital数字的；reading阅读，动名词；to\nread阅读，动词不定式；live现场的；classical古典的。第一空，动词prefer后接动名词（prefer\ndoing）表示“喜欢做某事”，为固定搭配；第二空，根据“like smartphones or tablets”可知，智能手机\n或平板电脑属于“数字设备”，digital符合语境。故选B。"
  },
  {
    "id": "xdf-51a13ffe519a1830",
    "type": "choice",
    "text": "If the product is faulty, customers have the right to _______.\nA. make a complaint\nB. make complaints\nC. do a complaint\nD. give complaints",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 42,
        "page": 12
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 19,
        "page": 4
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 17,
        "page": 3
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "提出投诉make complaints。"
  },
  {
    "id": "xdf-58a1347499d5baf7",
    "type": "choice",
    "text": "He made a great effort ________ his problem last year.\nA. solve\nB. solved\nC. solving\nD. to solve",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 43,
        "page": 12
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 20,
        "page": 4
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 16,
        "page": 3
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：去年他做了很大努力来解决他的问题。\n考查非谓语动词。solve解决，动词原形；solved解决，动词过去式；solving解决，现在分词；to\nsolve解决，动词不定式。根据“He made a great effort...his problem last year.”可知，他努力的目的\n是解决问题，动词不定式作目的状语。故选D。"
  },
  {
    "id": "xdf-a27df983761ab71d",
    "type": "choice",
    "text": "I'm going to buy for my mother at the Spring Festival.\nA. private something\nB. something private\nC. anything private\nD. private anything",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 44,
        "page": 12
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 21,
        "page": 4
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 14,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考查不定代词辨析题。不定代词有形容词等修饰作定语时，该定语需后置，可排除AD选项。\nsomething用于肯定句，anything用于疑问句和否定句；根据句意和语境，可知选B。\n【句意】我打算在春节给妈妈买点私房菜。"
  },
  {
    "id": "xdf-9283701b8c89a083",
    "type": "choice",
    "text": "I have two new markers. One is red, and _________ is green.\nA. one\nB. other\nC. the one\nD. the other",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 45,
        "page": 13
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 22,
        "page": 4
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 4,
        "page": 1
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我有两支新的记号笔。一支是红色的，另一支是绿色的。\n考查代词辨析。one一个，指代与前面事物同属一类的事物，表泛指；other其它的，形容词；the one\n那一个，表定指；the other （二者中的）另外一个，代词。空格是主语，所以排除B；根据“I have\ntwo new markers.”可知指“一支是红色的，另一支是绿色的”。故选D。"
  },
  {
    "id": "xdf-9269555bef972b43",
    "type": "choice",
    "text": "If your phone becomes slow, you can try to ________ apps you don’t need.\nA. clean\nB. clean off\nC. clear\nD. clear out",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 46,
        "page": 13
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 23,
        "page": 4
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 19,
        "page": 4
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：如果你的手机变慢了，你可以尝试清理掉你不需要的应用程序。\n考查动词短语辨析。clean清洁；clean off擦掉；clear搬走；clear out清除。根据“you can try\nto...apps you don’t need.”可知，处理不需要的应用时，应使用表示“彻底移除”的短语。故选\nD。"
  },
  {
    "id": "xdf-bd4bc882546f3f8d",
    "type": "choice",
    "text": "Don’t forget to __________ the lights when you’re out.\nA. turn down\nB. turn up\nC. turn on\nD. turn off",
    "answer": "D",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 47,
        "page": 13
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 24,
        "page": 4
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 22,
        "page": 4
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：当你外出时，别忘了关灯。\n考查动词短语词义辨析。turn down拒绝，调低；turn up调高，出现；turn on打开；turn off关掉。\n根据“when you’re out”可知，此处表示别忘了关灯。故选D。"
  },
  {
    "id": "xdf-654bcf79b4650372",
    "type": "choice",
    "text": "This plant will release a strong smell to get rid of insects. Here “release” means ________.\nA. give in\nB. give off\nC. give away\nD. give out",
    "answer": "B",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 48,
        "page": 13
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 25,
        "page": 5
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 21,
        "page": 4
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：这种植物会释放出强烈的气味来消灭昆虫。这里的“release”意思是“释放”。\n考查动词短语。give in屈服；give off释放，散发（某种气体或气味）；give away捐赠；give out分\n发，散发（光、热量等）。根据“This plant will release a strong smell”可知，此处指植物释放气味，\n故release与give off意思相近。故选B。"
  },
  {
    "id": "xdf-461f6824cd9002b1",
    "type": "choice",
    "text": "Tom has three penfriends in Britain，and he also has one in Paris.（ ）\nA. another\nB. other\nC. the other\nD. others",
    "answer": "A",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 49,
        "page": 13
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 26,
        "page": 5
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 11,
        "page": 2
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "another另一个，表示泛指；other其他的，后面常跟复数名词；the other跟单数名词时，表示两个中\n另一个；others其他的人或物。根据Tom has three penfriends in Britain（汤姆在英国有三个笔友）\n可知，此句是说他还有另一个笔友在巴黎，表示泛指。\n故选：A。"
  },
  {
    "id": "xdf-aefbe10a6effdbae",
    "type": "choice",
    "text": "There is ________ in these boring stories, so I can’t learn ________ from them.\nA. something meaningful; everything\nB. meaningful something; anything\nC. nothing meaningful; anything\nD. meaningful nothing; anything",
    "answer": "C",
    "sources": [
      {
        "file": "错题_02_20260922_214939.pdf",
        "number": 50,
        "page": 13
      },
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 27,
        "page": 5
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 6,
        "page": 1
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：这些无聊的故事毫无意义，所以我无法从它们中学到任何东西。\n考查不定代词和形容词的位置关系以及不定代词的用法。形容词修饰不定代词时，形容词要后置，故排\n除选项B和D；something meaningful意为“一些有意义的东西”；nothing meaningful意为“毫无意义\n的东西”；everything意为“一切”；anything意为“任何东西”，常用于否定句和疑问句中。根\n据“I can’t learn...”可知，此处表示否定意义，即从这些无聊的故事中学不到任何东西，所以第\n一个空应填nothing meaningful，第二个空应填anything。故选C。"
  },
  {
    "id": "xdf-470051960705e642",
    "type": "choice",
    "text": "I got up late this morning, but I ran to the bus stop just _______ to catch the\nearly bus.\nA. in time\nB. in the time\nC. on time\nD. on the time",
    "answer": "A",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-5f8cc614adc22bd2",
    "type": "choice",
    "text": "I have to speak to my grandpa loudly because there’s ________ with his ears.\nA. nothing wrong\nB. anything wrong\nC. something wrong\nD. wrong something",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 28,
        "page": 5
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 9,
        "page": 2
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我不得不大声和爷爷说话，因为他的耳朵有问题。\n考查不定代词和形容词的位置。something的意思是“某事”；anything的意思是“任何事物”；nothing\n的意思是“没有什么事物”，这几个词都是不定代词，如果有形容词修饰不定代词的时候，形容词要放\n在不定代词的后面，且肯定句中用something。故选C。"
  },
  {
    "id": "xdf-34e3ebe358bf799c",
    "type": "choice",
    "text": "2018年上海长宁二模The waitress talked as__________as she could to make the customers\nunderstand her.\nA. clear\nB. clearer\nC. clearly\nD. more clearly",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 29,
        "page": 5
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 15,
        "page": 3
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：女服务员尽量把话说得清楚些，使顾客能听懂她的话。A. clear形容词，清楚的；B. clearer比\n较级，更清楚的；C. clearly副词，清楚地；D. more clearly比较级，更清楚地。根据语境可知，本句\n为“as…as…”引导的原级比较的句子，中间跟形容词或副词的原级，副词或形容词不需要任何修饰\n词。在本句中副词clearly修饰动词talked。故选C。"
  },
  {
    "id": "xdf-e784b6e058790a74",
    "type": "choice",
    "text": "We should protect ________ facilities.\nA. public\nB. private\nC. personal\nD. own",
    "answer": "A",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 30,
        "page": 6
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 13,
        "page": 3
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我们应该保护公共设施。\n考查形容词辨析。public公共的；private私人的；personal个人的；own自己的。根据“We should\nprotect ... facilities.”以及常识可知，我们应该保护“公共设施”。故选A。"
  },
  {
    "id": "xdf-019e0366c72d463a",
    "type": "choice",
    "text": "There aren't enough chairs for the guests.We need ________10 chairs.（ ）\nA. other\nB. the other\nC. another\nD. the others",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 31,
        "page": 6
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 8,
        "page": 2
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "other其他的，后接复数名词，泛指\"其他的人或物\"；the other两者中的另一个，特指；another再一\n个、又一个，后接数词或单数名词，泛指\"额外的\"；the others其余的，特指某一范围内的\"其他全\n部\"，后不接名词。根据We need…10 chairs（我们……需要10把椅子）可知，此处表示\"额外再需要\n10把椅子\"，another符合语境。\n故选：C。"
  },
  {
    "id": "xdf-4d4095836fae61a2",
    "type": "choice",
    "text": "—It’s hard to make a decision between the two roads.\n—Not really. ________ way may reach Rome to a willing heart, you know.\nA. All\nB. Each\nC. Either\nD. Both",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 32,
        "page": 6
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 3,
        "page": 1
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：——在这两条路之间很难做出决定。——不见得。你知道，只要有决心，无论哪一条路都可以\n到达罗马。\n考查代词辨析。All三者及以上都；Each每一个；Either两者之一；Both两者都。根据“between the\ntwo roads”可知，是两者，所以两者之一的路都可以到达罗马。故选C。"
  },
  {
    "id": "xdf-cfdfd8e78ef5f409",
    "type": "choice",
    "text": "I bought two pens last week, ________ writes easily.\nA. both of which\nB. neither of which\nC. both of them\nD. neither of them",
    "answer": "B",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 33,
        "page": 6
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：上周我买了两支钢笔，两支都不好写。\n考查非限制性定语从句。分析句子可知，本句是非限制性定语从句，先行词pens指物，故应用关系代\n词which引导，排除C和D；根据“writes easily”可知，此处应用代词neither，表示“两者都不”。故选\nB。"
  },
  {
    "id": "xdf-01f4fef11c06b866",
    "type": "choice",
    "text": "There are hospitals in those poor villages. The sick people in those places,\n, need our help.\nA. too few; therefore\nB. a little; so\nC. a few; so\nD. too little; therefore",
    "answer": null,
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 34,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-ea488dd4f8f117bf",
    "type": "choice",
    "text": "This app will inform you ________ any unusual changes in your heart rate.\nA. with\nB. for\nC. of\nD. to",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 35,
        "page": 6
      },
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 12,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：这个应用程序会通知你心率的任何异常变化。\n考查介词辨析。with和；for为了；of……的；to到。inform sb of sth表示“通知某人某事”，固定\n短语，故选C。"
  },
  {
    "id": "xdf-afa38180bc832af1",
    "type": "choice",
    "text": "The old man is blind ______ the left eye.\nA. at\nB. on\nC. in\nD. to",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 36,
        "page": 7
      },
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 11,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：这个老人的左眼是瞎的。at 在具体时刻或地点；on在…上面；in 在…里面；to到…。这里be\nblind in…表示那只眼睛是盲的，固定搭配，故选C。"
  },
  {
    "id": "xdf-b30262f37c15247c",
    "type": "choice",
    "text": "Tommy, my younger brother has a large __________of butterflies at home.\nA. connection\nB. communication\nC. construction\nD. collection",
    "answer": "D",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 37,
        "page": 7
      },
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 10,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：我的弟弟Tommy家里有很多蝴蝶收藏。\n考查名词辨析。connection联系，关联；communication 交流；construction 建造；\ncollection 收藏，收集。根据题意可知我弟弟喜欢“收集”蝴蝶标本，其他选项在此题中均不能\n和“of butterflies”搭配，故选D。"
  },
  {
    "id": "xdf-26f0ce69335147a6",
    "type": "choice",
    "text": "Unless I ______ another chance, I ______ the exam.\nA. am given; won’t pass\nB. will give; passes\nC. will be given; passes\nD. give ;will pass",
    "answer": "A",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 38,
        "page": 7
      },
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 23,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "除非我被给予另一个机会，否则我通不过考试。\nunless引导条件状语从句，符合主将从现。"
  },
  {
    "id": "xdf-f1c11a4e92c9a9c1",
    "type": "choice",
    "text": "_______I know the money is securely kept，I shall not worry about it.\nA. Even though\nB. Unless\nC. As long as\nD. Despite",
    "answer": null,
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 39,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-826692980ae7fc7f",
    "type": "choice",
    "text": "He got up early ______ get to school on time.\nA. though\nB. so\nC. to\nD. so that",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 40,
        "page": 7
      },
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考点为状语从句。根据句意，他起得很早，为了按时到校。to do表目的"
  },
  {
    "id": "xdf-ff0f0ad6561a9d6a",
    "type": "choice",
    "text": "______ there is supply and demand, there is commerce.\nA. When\nB. Where\nC. Even if\nD. As if",
    "answer": "B",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 41,
        "page": 7
      },
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考点为状语从句。固定句型Where there is…,there is… 表示“哪儿有……哪儿就有……”"
  },
  {
    "id": "xdf-08a90ff01c0943a7",
    "type": "choice",
    "text": "he she likes running, but I do.\nA. Both; and\nB. Either; or\nC. Neither; nor\nD. Not only; but also",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 42,
        "page": 8
      },
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "both; and…和…...两个都；either; or或者...…或者...…；not only; but also不仅...…而且。从but判断\n前后是转折关系，后面是肯定形式，前面应该用否定形式，所以用neither；nor。故选C。"
  },
  {
    "id": "xdf-c61f5547a4e22c38",
    "type": "choice",
    "text": "How many chemicals have you added to the water?\n—________. ________ of the workers came to work yesterday.\nA. Nothing; None\nB. None; No one\nC. No one; None\nD. None; None",
    "answer": "D",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 43,
        "page": 8
      },
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——你们在水中添加了多少化学物质？——没有添加化学物质。昨天没有一个工人来上班。\n考查代词辨析。Nothing没有任何东西，什么也没有，强调“内容”，只能指物，用来回答what… 引起\n的问句；None表示三者或三者以上的人或物中“没有一个”，指的是数量概念，后常接of短语，它用来\n回答how many…… 或how much……引导的问句；No one没有人，只指人，后面不能接of构成的短语。\n由问句“How many chemicals have you added to the water?”可知询问数量，应用None回答；\n由“of the workers”可知用none。故选D。"
  },
  {
    "id": "xdf-76b35a2144db43d2",
    "type": "choice",
    "text": "The birds flew out of the nest one after _________, spreading their wings and\ndisappearing into the sky.\nA. another\nB. the other\nC. other\nD. others",
    "answer": "A",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 44,
        "page": 8
      },
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：鸟儿们一只接一只地飞出鸟巢，展开翅膀，消失在天空中。\n考查不定代词辨析。another另一个（三者或三者以上中的）；the other（两者中的）另一个；other\n其他的；others其他（人或物）。根据“The birds flew out of the nest one after…”可\n知，“one after another”是固定搭配，意为“一个接一个地”，即鸟儿们陆续飞出，故选A。"
  },
  {
    "id": "xdf-c550f29bd72d5dce",
    "type": "choice",
    "text": "There are some ____ ways for them to get to ____ side of the mountain.\nA. another; another\nB. others; other\nC. other; other\nD. other; the other",
    "answer": "D",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 45,
        "page": 8
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-c68a76aa4cf169a6",
    "type": "choice",
    "text": "—Does ____ of the two buses go to Hankou Railway Station?\n—Oh! You can't get there by ____ of them.\nA. both; none\nB. both; both\nC. either; either\nD. either; none",
    "answer": "C",
    "answerSource": { "kind": "ai-supplement", "originalAnswer": null, "checkedAt": "2026-10-06", "review": { "status": "pending" } },
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 46,
        "page": 8
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-b53af6f1e2eaa341",
    "type": "choice",
    "text": "You’d better _________ others’ secrets when _________ friends.\nA. not to be curious about; make\nB. to not be curious about; to make\nC. not be curious about; making\nD. not be curious of; making",
    "answer": "C",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 47,
        "page": 9
      },
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：你最好在交朋友时不要对别人的秘密好奇。\n考查had better和when的用法。had better not do sth“最好不要做某事”，故A和B选项错误；be\ncurious about“对……好奇”，故D选项错误；此处when表示“当……时”，后接现在分词。故选C。"
  },
  {
    "id": "xdf-9f5e47a7f359a407",
    "type": "choice",
    "text": "The flood washed away many villages. , many people have nowhere to live.\nA. As a result\nB. So that\nC. As a result of\nD. In fact",
    "answer": "A",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 48,
        "page": 9
      },
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：洪水冲走了很多村庄。结果，许多人无处可住。As a result 结果； So that以便于；\nAs a result of 由于；In fact事实上。前半句表示洪水冲走了许多村庄，后半句表示许多人无处可\n住，后半句许多人无处可住，是前半句洪水冲走了村庄的结果，故选A。"
  },
  {
    "id": "xdf-8e638921bc031370",
    "type": "choice",
    "text": "My mother says the kids will play a trick you if they don't get a treat\nyou.\nA. to;to\nB. to;from\nC. for;to\nD. on;from",
    "answer": "D",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 49,
        "page": 9
      },
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我妈妈说如果孩子们从你那儿得不到款待，他们就会捉弄你。\n考查固定短语。to到，及；from从；for为了；on上面。根据句意可知，空一处是短语play a trick on\nsb 意为“捉弄某人”；空二处是get sth from sb，意为“从某人那儿得到某物”，get a treat from\nyou从你那儿得到款待。故选D。"
  },
  {
    "id": "xdf-ee29d71f9e314be2",
    "type": "choice",
    "text": "I suddenly with him last October and we ever since．\nA. got in touch; have got in touch\nB. got in touch; have stayed in touch\nC. kept in touch; have kept in touch\nD. stayed in touch; have got in touch",
    "answer": "B",
    "sources": [
      {
        "file": "错题_03_20260922_215342.pdf",
        "number": 50,
        "page": 9
      },
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第一空 “last October” 是过去时间，用一般过去时，“get in touch with” 表示 “和…… 取得\n联系”，符合 “去年十月突然联系”；第二空 “ever since”（从那以后）是现在完成时标\n志，“stay in touch” 表示 “保持联系”，是延续性动作，能和时间段连用，所以选 B 。"
  },
  {
    "id": "xdf-3c0335ab8c585db1",
    "type": "choice",
    "text": "The twin sisters have learned a lot ________ they came to China.\nA. when\nB. as soon as\nC. since\nD. for",
    "answer": "C",
    "sources": [
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "since 引导时间状语从句，意为 “自从…… 以来”，常与现在完成时连用，符合 have learned 的时\n态。故选 C。"
  },
  {
    "id": "xdf-f2ccb4f01d64f741",
    "type": "choice",
    "text": "When I took his temperature, it was two degrees above ______.\nA. average\nB. ordinary\nC. regular\nD. normal\n第7题 1\n[单选题]Through the years, Jolin made much in becoming an excellent dancer and\nperformer.\nA. advantage\nB. progress\nC. opinion\nD. conclusion\n第8题\n1 2\n[单选题]—Who this watch ?\n—It's mine.\nA. is; belong to\nB. does; belong to\nC. is; belonged to\nD. did; belong to",
    "answer": "D",
    "sources": [
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：当我量他的体温，高于正常2°。\n考查形容词辨析。A. average（平均的）； B. ordinary（普通的）； C. regular（有\n规律的）；D. normal（正常的）；根据常识，指一个人的体温的“高了还是低了”是以正常体温为标\n准，故选D。"
  },
  {
    "id": "xdf-77668fec150c1bfc",
    "type": "choice",
    "text": "Do you know who __________ the world record for the high jump at the 1968\nOlympics?\nA. break\nB. broke\nC. has broken\nD. will break",
    "answer": "B",
    "sources": [
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：你知道是谁打破了1968年奥运会跳高的世界纪录吗？\n考查宾语从句的主现从不限。根据“Do you know”可知后接who引导的宾语从句，主句为一般现在时，\n从句的时态由“at the 1968 Olympics”可知应用一般过去时。故选B。"
  },
  {
    "id": "xdf-65ad5fe986c7b12f",
    "type": "choice",
    "text": "The secret ________ is ________.\nA. of staying healthy; that you need to do exercises every day\nB. of staying healthy; you need to do exercise everyday\nC. to stay healthy; that you need to do exercise every day\nD. to stay healthy; you need to do exercise everyday",
    "answer": "A",
    "sources": [
      {
        "file": "错题_04_20260922_215411.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：保持健康的秘诀就是你需要每天做运动\n考查后置定语和表语从句。根据“The secret…is…”可知，第一个空，考查of作后置定语的用法，故\n排除C和D；第一个空，考查that引导的表语从句，that不可省略，故排除B。故选A。"
  },
  {
    "id": "xdf-5f0f4fca9e7e2301",
    "type": "reading",
    "text": "根据短文内容，选择正确答案。\nThis was the first real task I received in my new school. It seemed simple: go on the Internet\nand find information about a man named George Washington. As I searched the name, I found\nthat there were two famous people having the same name who looked completely different! One\ninvented hundreds of uses for peanuts, while the other led some sort of army across America. I\nstared at the screen, wondering which one my teacher meant. I called my grandfather for a\ngolden piece of advice; let the coin decide. I flipped (掷) a coin and Ah! Tails (背面)! My report\nwould be about the great main who invented peanut butter, George Washington Carver.\nWeeks later, I stood in front of the classroom and proudly read my homework. But things\nstarted to get strange. I looked around the room, only to find my classmates with big smiles on\ntheir faces and tears in their eyes and my stone-faced teacher. I was completely lost. \"What could\nbe causing everyone to act this way?'\nOh well, I dropped the paper and sat down at my desk, burning to find out what I had done\nwrong. As a classmate began his report, it all became clear, \"My report is on George Washington,\nthe man who started the American War of Independence.\" The whole world became quiet! How\ncould I know that my teacher meant that George Washington?\nOf course, my subject result was awful. Sad but fearless, I decided to turn this around. I\ntalked to the headmaster Miss Lancelot, but she said firmly: No re-dos; no new score. I felt that it\nwas not fair, and I believed I deserved a second chance. So I threw myself heartily into my work\nfor the rest of the school year. Ten months later, I sat in the headmaster's office again, but this\ntime a completely different conversation. I smiled and flashed back to the terrible moment at the\nbeginning of the year as the headmaster told me I was good enough to skip (跳过) the 6th grade\nand started the 7th grade next term.\n1.单选题\n1\nThe task I received was to find information about .\nA. my headmaster Miss Lancelot\nB. American War of Independence\nC. George Washington\nD. uses for peanuts\n2.单选题\n1\nhelped me decide what my report would be about.\nA. The Internet\nB. A coin\nC. My grandpa\nD. My classmates\n3单选题\n3.单选题\nPeople in the class acted strangely because .\nA. I was too proud of my homework\nB. the teacher's face turned to a stone\nC. the whole world suddenly became quiet\nD. I mistook what the homework was about\n4.单选题\nI 1 after I failed the subject.\nA. worked harder to prove my ability\nB. started to study from the 7th grade\nC. was so frightened at the awful result\nD. was given a second chance to redo the work\n5.单选题\nWe can infer (推断) from the passage that 1 .\nA. the headmaster didn't like the writer at all\nB. the writer's classmates felt sad at his mistake\nC. the writer knew little about American history\nD. the writer's grandpa was a very wise man",
    "answer": "(1) C (2) B (3) D (4) A (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_05_20260922_215416.pdf","number":2,"page":1,"sha256":"1a45a734304c4a7ffd2004b1f04321720da115e00efe95fcc1327501774ad476"},
    "sources": [
      {
        "file": "错题_05_20260922_215416.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。\n根据题干中的“The task I received was to find information about”定位到原文中的“It\nseemed simple: go on the Internet and find information about a man named George\nWashington.”，可知任务是寻找关于George Washington的信息。\n故正确答案为C。\n\n第 2 小题：\n细节理解题。\n根据题干中的“helped me decide what my report would be about”定位到原文中的“I\ncalled my grandfather for a golden piece of advice; let the coin decide. I flipped (掷) a\ncoin and Ah! Tails (背面)! My report would be about the great main who invented\npeanut butter, George Washington Carver.”，可知是掷硬币帮助我决定了报告的主题。\n故正确答案为B。\n\n第 3 小题：\n推理判断题。\n根据题干中的“People in the class acted strangely”定位到原文中的“But things\nstarted to get strange. I looked around the room, only to find my classmates with big\nsmiles on their faces and tears in their eyes and my stone-faced teacher. I was\ncompletely lost.”，结合后文可知，同学们和老师之所以表现得奇怪，是因为我误解了作\n业的内容，写了关于George Washington Carver的报告，而老师想要的是关于美国独立战\n争领袖George Washington的报告。\n故正确答案为D。\n\n第 4 小题：\n细节理解题。\n根据题干中的“I _______ after I failed the subject.”定位到原文中的“So I threw myself\nheartily into my work for the rest of the school year.”，可知我在失败后更加努力地工\n作。\n故正确答案为A。\n\n第 5 小题：\n推理判断题。\n根据文章中的描述，我误解了作业的内容，写了关于George Washington Carver的报告，\n而老师想要的是关于美国独立战争领袖George Washington的报告，这表明我对美国历史\n知之甚少。\n故正确答案为C。"
  },
  {
    "id": "xdf-6f4bbab652524923",
    "type": "reading",
    "text": "There is a town near Suzhou. It is very interesting\nand beautiful. This is Luxiang, an old town. Luxiang was\nbuilt in the Southern Song dynasty(1127~1279). There\nwere many famous people living in the town at that time.\nThere are around 30 old buildings of Ming and\nQing(1368~1912) dynasties now. People live a simple\nlife. Six lanes(巷) in the town go to Taihu Lake.\nLuxiang looks more beautiful in spring, with many\ntea trees and orchards(果园). This place is famous for\nthe tea called Biluocun.\nThe Egyptian pyramids were built around 2560 B.C.\nThe largest one of them is the Great Pyramid of Khufu.\nThe King Khufu built it as his tomb.\nThe Great Pyramid was considered a unique(独特的)\nbuilding in the 19th century A.D. At that time, it was\nstill the tallest construction(建筑物) in the world.\nAccording to scientific research, Khufu ordered his men\nto build it stone by stone. The biggest stone was over\n15 tons, and each stone was fixed so well.\nThe Great Pyramid has four sides and each side is\nabout 230.4 metres long and 146.59 metres high. At that\ntime, there were no modern machines or equipment, so how\ndid the ancient Egyptians build? To this day, it is\nstill a mystery.\n1.单选题\nMany famous people lived in Luxiang ________.\nA. from 1127 to 1279\nB. from 1368 to 1912\nC. from 1127 to 1368\nD. from 1279 to 1912\n2.单选题\nLuxiang is famous for ________.\nA. orchards\nB. tea trees\nC. Biluochun\nD. six lanes\n3.单选题\nIn order to build his tomb, the King Khufu built ________.\nA. the ancient pyramids\nB. the Egyptian pyramids\nC. the Great pyramid\nD. the mysterious pyramids\n4.单选题\nBuilding the Great Pyramid is still a mystery now, because ________.\nA. each stone was fixed well\nB. there were no modern machines or equipment then\nC. it was made of stone\nD. it was the tallest construction in the world\n5.单选题\nWhich of the following is TRUE?\nA. Each stone of the Great Pyramid is about 230.4 metres long and 146.59 metres wide.\nB. Luxiang is far away from Suzhou.\nC. Luxiang looks more beautiful except spring.\nD. In the 19th century A.D. , the Great pyramid was special and unusual.",
    "answer": "(1) A (2) C (3) C (4) B (5) D",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_06_20260922_215426.pdf","number":1,"page":1,"sha256":"9a1a864d95a2dc5c1b9881cc64b22da79c5fe858dd60a4916aec0a6e02f8b379"},
    "sources": [
      {
        "file": "错题_06_20260922_215426.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“Luxiang was built in the Southern Song dynasty(1127~1279).\nThere were many famous people living in the town at that time.”可知从1127年到\n1279年，许多名人都住在鲈乡。故选A。\n\n第 2 小题：\n细节理解题。根据“Luxiang looks more beautiful in spring, with many tea trees and\norchards(果园). This place is famous for the tea called Biluocun.”可知鲈乡以碧螺\n春而闻名。故选C。\n\n第 3 小题：\n细节理解题。根据“The Egyptian pyramids were built around 2560 B.C. The largest\none of them is the Great Pyramid of Khufu. The King Khufu built it as his\ntomb.”可知为了建造他的坟墓，胡夫国王建造了大金字塔。故选C。\n\n第 4 小题：\n细节理解题。根据“At that time, there were no modern machines or equipment, so\nhow did the ancient Egyptians build? To this day, it is still a mystery.”可知大\n金字塔的建造至今仍是个谜，因为当时没有现代机器或设备。故选B。\n\n第 5 小题：\n细节理解题。根据“The Great Pyramid was considered a unique(独特的) building in\nthe 19th century A.D....To this day, it is still a mystery.”可知在公元19世纪，大\n金字塔是特别而不寻常的。故选D。"
  },
  {
    "id": "xdf-6ba4eee091032424",
    "type": "reading",
    "text": "The Great Wall is one of the greatest wonders of the world. It has a long\nhistory of over 2,000 years. It was built to protect the country from enemies.\nThe Great Wall is very long. It runs from the east to the west of China. It is about\n21,196 kilometers long. The walls are usually about 7.8 meters high and 6.5 meters wide.\nBuilding the Great Wall was a difficult task. In ancient times, there were no modern\nmachines. Workers had to carry heavy stones and bricks by hand. Many people lost their\nlives during the construction. But their hard work finally created this great wonder.\nToday, the Great Wall is a famous tourist attraction. Millions of people from all over\nthe world come to visit it every year. They climb the Great Wall, take photos and learn\nabout its history.\nThe Great Wall is not only a symbol of China’s ancient civilization, but also a\nsymbol of the wisdom and perseverance of the Chinese people. We should protect it and pass\non its culture to future generations.\n1.单选题\nWhat was the Great Wall built for?\nA. To attract tourists.\nB. To protect the country from enemies.\nC. To show the wisdom of the Chinese people.\nD. To carry heavy stones.\n2.单选题\nHow long is the Great Wall?\nA. About 7.8 kilometers.\nB. About 6.5 kilometers.\nC. About 21,196 kilometers.\nD. About 2,000 kilometers.\n3.单选题\nHow did workers build the Great Wall in ancient times?\nA. With modern machines.\nB. By carrying heavy stones and bricks by hand.\nC. By using advanced technology.\nD. By asking for help from other countries.\n4.单选题\nWhat is the Great Wall now?\nA. A symbol of China’s ancient civilization.\nB. A famous tourist attraction.\nC. A place for workers to rest.\nD. A symbol of perseverance.\n5.单选题\nWhat should we do according to the passage?\nA. Visit the Great Wall every year.\nB. Build more walls.\nC. Protect the Great Wall and pass on its culture.\nD. Learn about the history of other countries.",
    "answer": "(1) B (2) C (3) B (4) B (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_06_20260922_215426.pdf","number":2,"page":2,"sha256":"9a1a864d95a2dc5c1b9881cc64b22da79c5fe858dd60a4916aec0a6e02f8b379"},
    "sources": [
      {
        "file": "错题_06_20260922_215426.pdf",
        "number": 2,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n第一段提到建造长城的目的：“It was built to protect the country from enemies.”，\n这说明长城建造目的是保卫国家抵御外敌。\n\n第 2 小题：\n第二段明确说明长城的长度：“It is about 21,196 kilometers long.”，因此长城的长度\n约为21196千米。\n\n第 3 小题：\n第三段讲述了建造方法：“Workers had to carry heavy stones and bricks by hand.”，\n这说明古代修建长城时工人是靠徒手搬运材料完成的。\n\n第 4 小题：\n第 四 段 介 绍 长 城 现 在 的 性 质 ： “Today, the Great Wall is a famous tourist\nattraction.”，这表明如今长城是著名的旅游景点。\n\n第 5 小题：\n最 后 一 段 提 到 ： “We should protect it and pass on its culture to future\ngenerations.”，这表明作者呼吁人们保护长城并传承其文化。"
  },
  {
    "id": "xdf-d9e7a9a8487aafa1",
    "type": "fill",
    "text": "A. Also B. far from C. worried D. raise E.\nimportant F. However\nWhere does the seafood we eat come from? You may have a quick answer: the sea. But\nXinjiang people may say: “It is not true.”\n1\nXinjiang is (1) the sea. Now it welcomes a big harvest of local\n“seafood”, such as shrimp and crabs.\n2\nThe most (2) thing for aquatic products (水产品) is water. Xinjiang has\nmany rivers and lakes with water from the melting snow and glaciers of the Tianshan\nMountains. With the water, fishermen can build fish ponds.\n3\n(3) , land in Xinjiang has a lot of salt. This is not good for growing\ncrops. But “one man’s trash is another man’s treasure”. The land makes the underground\nwater salty. People turn the salty water into “man-made seawater”. They then use it to\n4\n(4) sea fish, shrimp and crabs.\nNow some of Xinjiang’s “seafood” goes to many cities in China. It also goes to\ncountries in Southeast Asia.\nMany people are (5) about the safety of seafood because of the nuclear-\ncontaminated water (核污染水). Now, Xinjiang’s “seafood” is becoming a new choice for\nseafood lovers.",
    "answer": "1 B 2 E 3 A 4 D 5 C",
    "sources": [
      {
        "file": "错题_06_20260922_215426.pdf",
        "number": 5,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本文介绍了新疆的特殊气候环境和那里的“海鲜”。\n句意：新疆离海很远。根据“Xinjiang is …the sea”的语境及常识并结合备选词汇可知，新疆离海\n很远，far from“远离”符合。故选B。\n句意：水产品最重要的是水。根据“The most…thing for aquatic products (水产品) is water”的\n语境及常识并结合备选词汇可知，水产品最重要的是水，important“重要的”符合。故选E。\n句意：此外，新疆的土地有很多盐。上文“With the water, fishermen can build fish ponds.”及\n空后的“land in Xinjiang has a lot of salt”和下文“The land makes the underground water\nsalty. People turn the salty water into ‘man-made seawater’.”可知，此处表示附加或补充说\n明，Also“此外”符合。故选A。\n句意：然后，他们用它来养海鱼、虾和螃蟹。根据“They then use it to…sea fish, shrimp and\ncrabs.”的语境并结合备选词汇可知，此处指养海产品，raise“饲养”符合。故选D。\n句意：由于核污染水，许多人担心海鲜的安全。根据“because of the nuclear-contaminated\nwater”并结合备选词汇可知，由于核污染水，应是导致许多人担心海鲜的安全，worried“担心的”符\n合。故选C。"
  },
  {
    "id": "xdf-cfaecfbfc91b23ce",
    "type": "cloze",
    "text": "Storytelling is one of humanity’s traditions. It shows people’s\nimagination, willingness to share their own lives and desire to explore the world. Long ago,\npeople sat around campfires to share tales that supplied them joy and wisdom. Today,\nstories are still powerful tools. They teach us, bring us happiness, and keep our cultures\n.\nGood storytellers know how they can catch their audience’s attention : the livelier\ntheir words are, the more listeners are drawn in. They use vivid details to help listeners\nunderstand, and their voices and gestures make simple tales . No one seems\nabout hearing too many good stories!\nChildren benefit from storytelling a lot. It builds their imagination and often them\nnot to make wrong choices. When parents read bedtime stories, they are creating precious\nmemories that last until adulthood just having fun. This deepens the emotional\nwithin the family.\nAs novelist Philip Pullman said, “After food, shelter, and friends, stories are what we need most.\nAs long as we share stories, it is that we can understand each other better.”\n( ) (1) A. old B. older C. oldest D. the oldest\n( ) (2) A. with B. to C. by D. of\n( ) (3) A. living B. live C. life D. alive\n( ) (4) A. success B. successful C. successfully D. succeed\n( ) (5) A. touch B. touched C. touching D. touches\n( ) (6) A. complain B. complained C. complaining D. to complain\n( ) (7) A. warn B. warns C. warned D. to warn\n( ) (8) A. because B. such as C. instead of D. as well as\n( ) (9) A. connect B. connective C. connecting D. connection\n( ) (10) A. likely B. possibly C. simply D. hopefully",
    "answer": "(1) C (2) A (3) D (4) C (5) C (6) D (7) B (8) D (9) D (10)A",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：讲故事是人类最古老的传统之一。\nold古老的，形容词原级；older更古老的，形容词比较级；oldest最古老的，形容词最高\n级；the oldest最古老的，the+形容词最高级。此句为“one of+名词所有格+形容词最高级\n+可数名词复数”“最……的……之一”结构。空前有名词所有格修饰，空处填形容词最高\n级。故选C。\n【小题2】 句意：很久以前，人们围坐在篝火旁分享带给他们欢乐和智慧的故事。\nwith具有；to朝向；by通过；of属于。根据“supplied them”和“joy and wisdom”可知，此\n处指故事为人们提供欢乐和智慧。supply sb. with sth.“为某人提供某物”。故选A。\n【小题3】 句意：故事教我们，给我们带来幸福，让我们的文化保持活力。\nliving活着的，形容词，作定语；live居住，动词；life生命，名词；alive活着的，形容词，\n作表语或宾语补足语。keep sth.+adj.“保持某物……”，空处填形容词作宾语补足语。故选\nD。\n【小题4】 句意：好的说书人知道他们能如何成功地吸引听众的注意力：他们的话越生动，听众就越\n被吸引。\nsuccess成功，名词；successful成功的，形容词；successfully成功地，副词；succeed\n成功，动词。空处修饰动词“catch”，需用副词。故选C。\n【小题5】 句意：他们用生动的细节帮助听众理解，他们的声音和手势使简单的故事感人。\ntouch触摸，动词原形；touched受感动的，形容词，修饰人的感受；touching动人的，形\n容词，修饰事物的特征或状态；touches触摸，动词三单形式。make sth.+adj.“使某\n物……”，空处填形容词作宾语补足语，且描述故事的特性，用touching。故选C。\n【小题6】 句意：似乎没有人抱怨听到了太多的好故事！\ncomplain抱怨，动词原形；complained抱怨，动词过去式；complaining抱怨，动词现在\n分词；to complain抱怨，动词不定式。seem to do“似乎做某事”，空处填动词不定式。故\n选D。\n【小题7】 句意：它建立他们的想象力，并经常警告他们不要做出错误的选择。\nwarn警告，动词原形；warns警告，动词三单形式；warned警告，动词过去式；to warn\n警告，动词不定式。根据“It builds”可知，此句时态为一般现在时，主语为“It”，空处填动\n词三单形式作谓语，与“builds”是并列关系。故选B。\n【小题8】 句意：当父母读睡前故事时，他们创造了宝贵的记忆，这些记忆会一直持续到成年，同时\n也很有趣。\nbecause因为；such as例如；instead of而不是；as well as还有。“just having\nfun”和“creating precious memories”是并列关系，指睡前故事创造记忆和提供乐趣，用as\nwell as连接。故选D。\n【小题9】 句意：这加深了家庭内部的情感联系。\nconnect连接，动词原形；connective连接的，形容词；connecting连接，现在分词；\nconnection联系，名词。空处位于形容词“emotional”后，填名词作宾语。故选D。\n【小题10】句意：只要我们分享故事，我们就有可能更好地了解对方。\nlikely可能的，形容词；possibly可能地，副词；simply简单地，副词；hopefully有希望\n地，副词。空处位于“is”后，填形容词作表语，指分享故事就有可能了解对方。It is likely\nthat“很可能”，固定句型。故选A。"
  },
  {
    "id": "xdf-4f3b4c1d07c1664d",
    "type": "cloze",
    "text": "On a Sunday morning in 2025, the Louvre Museum in Paris, which is famous for its glass\npyramid and known as the world’s most visited museum, experienced a shocking event. A group\nof robbers broke into museum and stole several pieces of valuable jewellery, a source\nfollowing the case said. The thieves arrived 9–30 ________ 9–40 a.m. According to\nreports, they came a scooter and were armed with small chainsaws. They used a\ngoods lift to reach the room they wanted to rob. The value of the stolen jewellery is\nstill unknown, but it is believed to be very precious.\nFrance’s Culture Minister, Rachida Dati, reported the break–in on social media. She wrote\nthat a robbery and thankfully, no one was injured. She also mentioned that she was at\nthe museum with the staff and police.\nBecause of this incident, the Louvre Museum had to close the whole day. The\nmuseum told people that the closure is for special reasons it did not give more\ndetails.\nThe Louvre is not just a museum; it has a long and rich history. It was once the home of\nFrench kings Louis XIV moved to Versailles in the late 1600s. Last year, this famous\nexhibition hall welcomed about nine visitors. This incident has surely left many people\naround the world and worried about museum safety and the protection of cultural\ntreasures. It reminds us that even the most famous places need strong security to keep our\nshared history safe for everyone to enjoy in the future.\n( ) (1) A. a B. an C. the\n( ) (2) A. neither...nor... B. between...an C. both...and...\nd...\n( ) (3) A. on B. by C. with\n( ) (4) A. exact B. exactly C. exactness\n( ) (5) A. happened B. has C. had\nhappened happened\n( ) (6) A. with B. for C. to\n( ) (7) A. and B. but C. because\n( ) (8) A. after B. when C. until\n( ) (9) A. hundred B. thousand C. million\n( ) (10) A. surprised B. surprise C. surprising",
    "answer": "(1) C (2) B (3) A (4) A (5) C (6) B (7) B (8) C (9) C (10)A",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：一群窃贼闯入该博物馆并偷走了几件贵重珠宝，一位跟进此案的消息人士称。\na一个，不定冠词；an一个，不定冠词；the这个，定冠词。根据“the Louvre Museum in\nParis”可知，此处是特指卢浮宫博物馆，要用定冠词the。故选C。\n【小题2】 句意：窃贼在上午9–30到9–40之间到达。\nneither...nor...既不……也不……；between...and...在……和……之间；both...and...两者\n都。根据“...9–30...9–40 a.m.”可知，是在两个时间之间，between...and...符合语境。故选\nB。\n【小题3】 句意：据报道，他们骑着一辆小型摩托车前来，并且配备了小型链锯。\non在……上；乘坐；by通过；乘坐，后接交通工具时不加冠词；with和……一起；带有。\n根据“a scooter”可知，空后有冠词a，所以用on a scooter表示“骑小型摩托车”。故选A。\n【小题4】 句意：被盗珠宝的确切价值仍不清楚，但据信非常珍贵。\nexact确切的，形容词；exactly确切地，副词；exactness确切，名词。此处修饰名\n词“value”，要用形容词。故选A。\n【小题5】 句意：她写道，发生了一起抢劫案，谢天谢地，没有人受伤。\nhappened发生，一般过去时；has happened已经发生，现在完成时；had happened已\n经发生，过去完成时。主句“She wrote”是一般过去时，抢劫案发生在“写”之前，即过去的\n过去，要用过去完成时had happened。故选C。\n【小题6】 句意：由于这起事件，卢浮宫博物馆不得不关闭一整天。\nwith和……一起；带有；for持续，后接时间段；to到；向。“the whole day”是时间段，\nfor+时间段表示“持续……时间”。故选B。\n【小题7】 句意：博物馆告诉人们闭馆是因为特殊原因，但没有给出更多细节。\nand和，表并列；but但是，表转折；because因为，表原因。前句说“告知闭馆原因”，后\n句说“没给更多细节”，是转折关系，用but。故选B。\n【小题8】 句意：它曾经是法国国王的居所，直到路易十四在17世纪晚期搬到凡尔赛。\nafter在……之后；when当……时；until直到。根据“was once the home of French\nkings...Louis XIV moved to Versailles in the late 1600s”可知，是“直到”路易十四搬走，\n卢浮宫才不再是国王居所，until符合语境。故选C。\n【小题9】 句意：去年，这个著名的展览馆接待了大约900万游客。\nhundred百；thousand千；million百万。卢浮宫是世界著名博物馆，所以游客数量应是以\n百万计，million符合实际情况。故选C。\n【小题10】句意：这一事件肯定让世界各地的许多人感到惊讶，并对博物馆的安全和文化宝藏的保护\n感到担忧。\nsurprised感到惊讶的，形容词，修饰人；surprise惊讶，名词；使惊讶，动词；surprising\n令人惊讶的，形容词，修饰物。此处修饰“people”人，要用surprised，表示“感到惊讶\n的”。故选A。"
  },
  {
    "id": "xdf-d48a6823ecd6cabd",
    "type": "fill",
    "text": "A. perfectly B. goal C. regularly D. similar E. strange\nHave you ever dreamed of becoming an astronaut? For most of us, it seems like an\nimpossible (1) . But actually, astronauts train for years to prepare for space missions.\nThey practice underwater to experience a (2) environment to zero gravity.\nBefore a mission, astronauts must check their health (3) . They need to be in top\nphysical condition. Sometimes they have to live in a special building for weeks to get used to the\nsmall space. The training is hard, but they know every detail must work (4) for their\nsafety in space.\nA. confident B. breathing C. record D. set E. collect\nWhen astronauts are in space, even simple tasks like (5) or eating become\nchallenging. Food floats away if you’re not careful! That’s why astronauts (6) their\nmeals carefully before eating. They also need to exercise two hours every day to keep their\nmuscles strong.\nMany astronauts say the most amazing moment is looking at Earth from above. They feel\nproud but also responsible for protecting our planet. Some have (7) a world (8)\nfor the longest time spent in space. Their courage and hard work inspire us to reach\nfor the stars.",
    "answer": "B； D； C； A； B； E； D； C",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 3,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本文主要介绍了宇航员在执行太空任务前的训练、在太空中的日常工作与生活，以及宇航员肩负的责\n任与带给人们的激励。\n句意：对我们大多数人来说，这似乎是一个不可能实现的目标。空格前有不定冠词an和形容词\nimpossible，此处需要填入单数可数名词；B选项goal“目标”，符合“成为宇航员是一个目标”的语境。\n句意：他们在水下训练，来体验和零重力相似的环境。空格后为名词environment，需要形容词修\n饰；固定搭配similar to表示“与……相似”，符合水下模拟太空零重力环境的语境。\n句意：在任务开始前，宇航员必须定期检查身体健康状况。本句句子结构完整，需要副词修饰动词\ncheck；C选项regularly“定期地”，用来描述体检的频率。\n句意：训练十分艰苦，但他们知道每一个细节都必须完美运作，来保障他们在太空中的安全。需要副\n词修饰动词work；A选项perfectly“完美地”，契合细节必须精准无误保障安全的语境。\n句意：当宇航员身处太空时，就连呼吸、吃饭这类简单的任务都变得充满挑战。介词like后需要接动名\n词，和后面eating并列；B选项breathing“呼吸”，和eating并列作like的宾语。\n句意：这就是宇航员们在吃饭前要仔细整理餐食的原因。本句缺少谓语动词，主语astronauts为复\n数，时态为一般现在时，用动词原形；E选项collect“收集、整理”，符合语境。\n句意：一些宇航员已经创下了保持太空最长停留时间的世界纪录。本句为现在完成时，have后需要接\n动词过去分词set，构成固定搭配set a world record“创下一项世界纪录”。\n句意：一些宇航员已经创下了保持太空最长停留时间的世界纪录。固定搭配world record“世界纪录”，\nC选项record“纪录”，符合语境。"
  },
  {
    "id": "xdf-5fd4a40378fbbf0c",
    "type": "cloze",
    "text": "An ocean of noise affects my life a lot\nI’m a little clown fish, and I like to live in coral reefs (珊瑚礁), but I don’t always stay here.\nWhen I was just a baby, I wandered in the open sea for months. It was a big, scary world out\nthere. When I grew strong enough, I hurried home. I couldn’t see the reef. , I depended\non its small sound to guide me home.\nUnfortunately, the ocean isn’t as peaceful as it used to be. Humans, with their ships,\nspeedboats, and surfing, have made it a noisy place. Their noises are often louder than the\nones, which makes it difficult for us to find our way back.\nI’m not the only one to suffer. Deep underwater, there is little light. Sounds, however, travel\nfar. Many of my ocean friends rely on their ability of to survive. Dolphins call each\nother by unique names and whales sing beautiful songs. But now, the noise is disturbing our\nlives. Therefore, they swim away from the noises. For example, whales try to busy\nshipping routes. But in many places, human–made noise is everywhere. We’re forced to leave our\nhomes and move to quieter areas, where we must compete with others for food and shelter.\nOver time, our populations shrink.\nLuckily, I have discovered humans are taking action and noise is a controllable problem.\nMany , like wind–powered boats, have already existed. Scientists are calling for stricter\nrules. “We have noise standards (标准) for cars and trucks,” they say. “Why shouldn’t we have\nthem for ?”\n( ) (1) A. In addition B. In brief C. Instead D. In return\n( ) (2) A. common B. real C. sudden D. natural\n( ) (3) A. singing B. hearing C. changing D. thinking\n( ) (4) A. repeat B. avoid C. manage D. spread\n( ) (5) A. awareness B. services C. solutions D. complaints\n( ) (6) A. animals B. humans C. planes D. ships",
    "answer": "(1) C (2) D (3) B (4) B (5) C (6) D",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 4,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：相反，我依靠它微弱的声音指引我回家。\nIn addition此外；In brief简而言之；Instead相反；In return作为回报。根据“I couldn’t\nsee the reef.”可知，由于看不到，转而依靠声音。故选C。\n【小题2】 句意：它们的噪音通常比自然的更大，这让我们很难找到回去的路。\ncommon常见的；real真实的；sudden突然的；natural自然的。根据“Humans, with their\nships, speedboats, and surfing, have made it a noisy place.”可知，人类噪音比海洋自然\n的声音更大，突出人类噪音对海洋生物的影响。故选D。\n【小题3】 句意：我的许多海洋朋友依靠它们的听觉能力生存。\nsinging唱歌；hearing听觉；changing改变；thinking思考。根据“Dolphins call each\nother by unique names and whales sing beautiful songs.”可知，海洋生物依靠听觉能力\n生存。故选B。\n【小题4】 句意：例如，鲸鱼试图避开繁忙的航运路线。\nrepeat重复；avoid避开；manage管理；spread传播。根据“the noise is disturbing our\nlives”可知，鲸鱼会避开繁忙的航运路线，减少噪音影响。故选B。\n【小题5】 句意：许多解决办法，比如风力驱动的船，已经存在了。\nawareness意识；services服务；solutions解决办法；complaints抱怨。根据“like wind-\npowered boats, have already existed”可知，举例说明应对海洋噪音问题的解决办法。故\n填C。\n【小题6】 句意：他们说：“我们有针对汽车和卡车的噪音标准，为什么我们不能针对船舶呢？”\nanimals动物；humans人类；planes飞机；ships船。根据“We have noise standards (标\n准) for cars and trucks”可知，提到汽车、卡车有噪音标准，此处指出人类航海活动的船舶\n也应有噪音标准。故选D。"
  },
  {
    "id": "xdf-fa21468b57f39e79",
    "type": "cloze",
    "text": "Choose the best answer to complete the passage. (选择最恰当的答案完成短文)\nNatural disasters are becoming more frequent and more in recent years around\nthe world. Scientists believe that climate change plays a major role in this worrying trend. Many\ncountries have better warning systems including advanced ( 先 进 的 ) weather\nmonitoring technology to people from dangers.\nWhen a disaster hits, it is important to stay calm. People should follow\ninstructions given by local government through official channels (频道). In some high–risk areas,\nschools practise earthquake and fire drills (演习) students know clearly\nwhat to do when real emergencies occur, such as where to find safe shelter.\nWe cannot keep natural disasters from happening, but we can reduce their influence\nthrough proper . Making an emergency kit (应急包) is much better than waiting until\nthe last minute when stores are closed.\n, being prepared today saves your life tomorrow. Let’s all learn to be ready for\nunexpected events by creating family emergency plans and staying informed about local risks.\n( ) (1) A. vivid B. serious C. valuable D. necessary\n( ) (2) A. limited B. destroyed C. donated D. developed\n( ) (3) A. prevent B. provide C. prefer D. protect\n( ) (4) A. suddenly B. immediately C. hardly D. exactly\n( ) (5) A. especially B. regularly C. peacefully D. terribly\n( ) (6) A. though B. if C. so that D. as if\n( ) (7) A. preparation B. decoration C. expectation D. position\n( ) (8) A. In addition B. In conclusion C. For example D. As a result",
    "answer": "(1) B (2) D (3) D (4) A (5) B (6) C (7) A (8) B",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 5,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：近年来全球自然灾害变得更频繁、更严重。\nworrying trend表示“令人担忧的趋势”，应用serious“严重的”，符合灾害变严重的语境。\n【小题2】 句意：许多国家研发了更完善的预警系统，包含先进气象监测技术。\nbetter warning systems表示“更完善的预警系统”，应用developed“开发”，符合开发系统\n完善预警系统的语境。\n【小题3】 句意：为了保护人们免受危险。\nprotect sb from sth表示“保护某人免受某物伤害”，固定搭配。\n【小题4】 句意：当灾害突然袭击时，保持冷静很重要。\n根据常识，自然灾害具有突发性，应用suddenly“突然”。\n【小题5】 句意：在高风险地区，学校定期开展地震、消防演练。\n为了熟悉流程，演习需要定期进行，应用regularly“定期地”。\n【小题6】 句意：学校定期演练，以便学生清楚突发事件的应对方法。\n后句是演练想要达成的目的，应用so that引导目的状语从句。\n【小题7】 句意：我们无法阻止灾害发生，但可以通过充分准备降低灾害影响。\n根据下文，“Making an emergency kit”表示“准备应急包”，对应防灾准备，应用\npreparation。\n【小题8】 句意：总而言之，今日做好准备能在未来拯救生命。\n本段是全文收尾总结，In conclusion表示“总之”，用于文末总结。"
  },
  {
    "id": "xdf-32dd69be051c22fb",
    "type": "completion",
    "text": "Lily: Hi Tom! Our teacher asked us to prepare a speech about volunteers. I think it’s a big\ntopic — where should we start?\nTom: I totally agree! Talking about all volunteers is too broad. (1) ____ Many of us want to\nvolunteer but don’t know how.\nLily: (2) ____ Teen volunteers have special needs, like safety and time for homework. Let’s\nnarrow it down to “what teens should note when volunteering.”\nTom: I couldn’t agree more. (3) ____ My cousin got lost alone at a clean–up.\nLily: Hmm. Safety should always be first. What’s more, teens shouldn’t spend too much time —\nmy friend skipped class and failed a test.\nLily: Right! (4) ____\nTom: (5) ____ I’m sure that will be very useful.\nLily: Perfect! Let’s act at once.\nA. That’s a great idea!\nB. Balance is better than cutting time.\nC. Maybe we can focus on teenagers?\nD. It might inspire more students to take action.\nE. Add our stories as examples — classmates will get it easily.\nF. Teens must choose safe activities.",
    "answer": "(1) C (2) A (3) F (4) B (5) E",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 6,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "本文通过Lily和Tom的讨论，聚焦青少年志愿者的注意事项，包括选择安全活动、平衡时间以及用实例\n说明，为演讲准备提供了具体方向。\n根据“Talking about all volunteers is too broad.”可知，Tom在建议聚焦青少年志愿者。C项“也许我们\n可以聚焦青少年？”符合语境。故选C。\n根据“Teen volunteers have special needs, like safety and time for homework.”可知，Lily在同意聚\n焦青少年。A项“好主意！”符合语境。故选A。\n根据“My cousin got lost alone at a clean–up.”可知，Tom在强调安全的重要性。F项“青少年必须选择\n安全的活动。”符合语境。故选F。\n根据“What’s more, teens shouldn’t spend too much time — my friend skipped class and failed a\ntest.”可知，Lily在说明平衡时间的重要性。B项“平衡比削减时间更好。”符合语境。故选B。\n根据“I’m sure that will be very useful.”可知，Tom在建议加入实例。E项“加入我们的故事作为例子\n——同学们会更容易理解。”符合语境。故选E。"
  },
  {
    "id": "xdf-14810b5be57141b5",
    "type": "reading",
    "text": "Digital technology is changing our lives in many good ways. It makes daily tasks\neasier and helps us connect with the world better.\nFirst, it helps with learning. Before, students could only learn from books and teachers at\nschool. Now, with apps like online classes and educational videos, we can study at home or\nanywhere. If we don’t understand a math problem, we can watch a video to learn it again. This\nmakes learning more flexible.\nSecond, it improves communication. Long ago, people sent letters which took weeks to\narrive. Now, we use Wechat, WhatsApp or video calls. We can talk to grandparents who live far\naway and even see their faces. It feels like they are right beside us.\nThird, it makes our life more convenient. We don’t need to carry much cash. We can pay for\nfood or books with our phones. When we want to go somewhere, apps like maps help us find the\nbest way. They even tell us when the bus will come.\nLastly, it helps with health. Some apps can track our steps or sleep. Doctors can also use\ntechnology to check patients’ health better. For example they can look at test results online\nquickly.\nDigital technology is really a great helper. It makes our lives happier and easier. We should\nlearn to use it well to make our future better.\n(1)单选题 Where did students mainly learn before digital technology?\nA. Online classes.\nB. Books and school teachers.\nC. Educational videos.\nD. Learning apps.\n(2)单选题 How long did it take for letters to arrive long ago?\nA. A few minutes.\nB. A few hours.\nC. A few weeks.\nD. A few days.\n(3)单选题 Which app is NOT mentioned for communication?\nA. Map apps.\nB. WhatsApp.\nC. Wechat.\nD. Video call apps.\n(4)单选题 What can we use our phones to do for convenience according to the passage?\nA. Track sleep.\nB. Pay for things.\nC. Watch educational videos.\nD. Talk to grandparents.\n(5)单选题 What can some health apps track?\nA. Test results.\nB. Bus arrival time.\nC. Steps or sleep.\nD. Math problems.\n(6)单选题 What does the passage mainly tell us?\nA. How to use digital technology well.\nB. The history of digital technology.\nC. The problems of digital technology.\nD. How digital technology improves our lives.",
    "answer": "(1) B (2) C (3) A (4) B (5) C (6) D",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 7,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 细节理解题。根据“Before, students could only learn from books and teachers at\nschool.”可知，以前，学生只能从书本和学校的老师那里学习。故选B。\n【小题2】 细节理解题。根据“Long ago, people sent letters which took weeks to arrive.”可知，很\n久以前，人们寄信，信件要花数周才能送达。故选C。\n【小题3】 细节理解题。根据“Now, we use Wechat, WhatsApp or video calls.”可知，现在，我们\n会使用微信、WhatsApp或者视频通话。故选A。\n【小题4】 细节理解题。根据“We don’t need to carry much cash. We can pay for food or books\nwith our phones.”可知，我们不需要携带大量现金，能用手机支付食物或书籍的费用。故\n选B。\n【小题5】 细节理解题。根据“Some apps can track our steps or sleep.”可知，一些应用可以追踪\n我们的步数或睡眠情况。故选C。\n【小题6】 主旨大意题。根据文章可知，全文从学习、沟通、生活便利、健康四个方面介绍数字技术\n对生活的积极改变。故选D。"
  },
  {
    "id": "xdf-62f90353d6d8f563",
    "type": "reading",
    "text": "COLORFUL CREATURES CLUB\nCalling all curious kids & students!\nDiscover nature’s living rainbows!\nJoin our Colorful Creatures Club to explore the amazing world of animals that light up the wild\nwith their brilliant colors!\nMeet the masters of disguise (伪装) & display!\n●Chameleons: Watch them shift colors like magic!\n●Red rock crabs: These colorful climbers stick to rocks like superheroes!\n●Red–eyed tree frogs: See how their bright red eyes scare predators (捕食者) away!\n●Rainbow lorikeets: These birds carry real rainbows on their wings!\n●Siamese fighting fish: Beautiful but fierce (凶残的)—see their flowing fins in action!\nFun club activities:\n√Interactive (交互式的) animal talks Where: VR lab, New Star School\n√Nature art & coloring When: Friday afternoons from 3–30 to 5–00\n√Outdoor exploration When: in December.\n√Science experiments minds! Who: Students aged 6-14 with curious\n√Creative storytelling minds!\nSign up today and let your curiosity take flight!\nFor more information ...\nCall 800****1234.\nTalk to Mr. Lee at the Students’ Club Office.\nScan the QR code on the right.\n(1)单选题 By making this poster, the author mainly wanted to ________.\nA. call on students to join the Colorful Creatures Club\nB. make students vote for their favorite colorful creature\nC. collect video clips of colorful creatures from students\nD. invite students to join a painting contest about colorful creatures\n(2)单选题 The outdoor exploration of the club will be organized in the month of ________.\nA. May\nB. September\nC. November\nD. December\n(3)单选题 All of the following kinds of animals are introduced in the poster EXCEPT________.\nA. frogs\nB. crabs\nC. dinosaurs\nD. birds\n(4)单选题 Students with ________ are most welcome to join the club.\nA. a strong body\nB. curious minds\nC. effective leadership\nD. good scores at school\n(5)单选题 Among the creatures introduced, ________ are likely to fight one another.\nA. chameleons\nB. red rock crabs\nC. red–eyed tree frogs\nD. Siamese fighting fish\n(6)单选题 A common feature of the creatures in the poster is ________.\nA. beautiful colors\nB. living on land\nC. good hunting skills\nD. the ability to change their colors",
    "answer": "(1) A (2) D (3) C (4) B (5) D (6) A",
    "sources": [
      {
        "file": "错题_07_20260922_215435.pdf",
        "number": 8,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 主旨大意题。根据海报标题“COLORFUL CREATURES CLUB”、“Join our Colorful\nCreatures Club...”以及“Sign up today and let your curiosity take flight!”等内容可知，\n作者制作这张海报主要是为了号召学生加入该俱乐部。故选A。\n【小题2】 细节理解题。根据海报中“Fun club activities”部分的“When: Friday afternoons from\n3–30 to 5–00 in December.”可知，俱乐部的活动将在12月组织。故选D。\n【小题3】 细节理解题。海报中介绍的动物有变色龙（Chameleons）、红石蟹（Red rock\ncrabs）、红眼树蛙（Red–eyed tree frogs）、彩虹吸蜜鹦鹉（Rainbow lorikeets）、暹\n罗斗鱼（Siamese fighting fish），其中提到了青蛙、螃蟹、鸟类，未提及恐龙。故选\nC。\n【小题4】 细节理解题。根据“Who: Students aged 6-14 with curious minds!”可知，俱乐部最欢迎\n有好奇心的学生加入。故选B。\n【小题5】 细节理解题。根据“Siamese fighting fish: Beautiful but fierce (凶残的)—see their\nflowing fins in action!”可知，暹罗斗鱼可能会互相争斗。故选D。\n【小题6】 细节理解题。根据海报开头“Discover nature’s living rainbows!”以及“explore the\namazing world of animals that light up the wild with their brilliant colors!”可知，海报\n中介绍的生物的共同特征是拥有美丽的颜色。故选A。"
  },
  {
    "id": "xdf-c5e8764747d81efe",
    "type": "cloze",
    "text": "On a Sunday morning in 2025, the Louvre Museum in Paris, which is famous for its glass\npyramid and known as the world’s most visited museum, experienced a shocking event. A\n1\ngroup of robbers broke into museum and stole several pieces of valuable\njewellery, a source following the case said. The thieves arrived 9:30 ________\n9:40 a.m. According to reports, they came a scooter and were armed with small\n4\nchainsaws. They used a goods lift to reach the room they wanted to rob. The\nvalue of the stolen jewellery is still unknown, but it is believed to be very precious.\nFrance’s Culture Minister, Rachida Dati, reported the break-in on social media. She\n5\nwrote that a robbery and thankfully, no one was injured. She also mentioned\nthat she was at the museum with the staff and police.\n6\nBecause of this incident, the Louvre Museum had to close the whole day.\n7\nThe museum told people that the closure is for special reasons it did not give\nmore details.\nThe Louvre is not just a museum; it has a long and rich history. It was once the home\n8\nof French kings Louis XIV moved to Versailles in the late 1600s. Last year,\n9\nthis famous exhibition hall welcomed about nine visitors. This incident has\n10\nsurely left many people around the world and worried about museum safety and\nthe protection of cultural treasures. It reminds us that even the most famous places need\nstrong security to keep our shared history safe for everyone to enjoy in the future.\n1. A. a B. an C. the\n2. A. neither...nor... B. between...and... C. both...and...\n3. A. on B. by C. with\n4. A. exact B. exactly C. exactness\n5. A. happened B. has happened C. had happened\n6. A. with B. for C. to\n7. A. and B. but C. because\n8. A. after B. when C. until\n9. A. hundred B. thousand C. million\n10. A. surprised B. surprise C. surprising",
    "answer": "1-5 CBAAC 6-10 BBCCA",
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "1.句意：一群窃贼闯入该博物馆并偷走了几件贵重珠宝，一位跟进此案的消息人士称。\na一个，不定冠词；an一个，不定冠词；the这个，定冠词。根据“the Louvre Museum in Paris”可\n知，此处是特指卢浮宫博物馆，要用定冠词the。故选C。\n2.句意：窃贼在上午9:30到9:40之间到达。\nneither...nor...既不……也不……；between...and...在……和……之间；both...and...两者都。\n根据“...9:30...9:40 a.m.”可知，是在两个时间之间，between...and...符合语境。故选B。\n3.句意：据报道，他们骑着一辆小型摩托车前来，并且配备了小型链锯。\non在……上；乘坐；by通过；乘坐，后接交通工具时不加冠词；with和……一起；带有。根据“a\nscooter”可知，空后有冠词a，所以用on a scooter表示“骑小型摩托车”。故选A。\n4.句意：被盗珠宝的确切价值仍不清楚，但据信非常珍贵。\nexact确切的，形容词；exactly确切地，副词；exactness确切，名词。此处修饰名词“value”，要用\n形容词。故选A。\n5.句意：她写道，发生了一起抢劫案，谢天谢地，没有人受伤。\nhappened发生，一般过去时；has happened已经发生，现在完成时；had happened已经发生，过去完成\n时。主句“She wrote”是一般过去时，抢劫案发生在“写”之前，即过去的过去，要用过去完成时had\nhappened。故选C。\n6.句意：由于这起事件，卢浮宫博物馆不得不关闭一整天。\nwith和……一起；带有；for持续，后接时间段；to到；向。“the whole day”是时间段，for+时间段\n表示“持续……时间”。故选B。\n7.句意：博物馆告诉人们闭馆是因为特殊原因，但没有给出更多细节。\nand和，表并列；but但是，表转折；because因为，表原因。前句说“告知闭馆原因”，后句说“没给\n更多细节”，是转折关系，用but。故选B。\n8.句意：它曾经是法国国王的居所，直到路易十四在17世纪晚期搬到凡尔赛。\nafter在……之后；when当……时；until直到。根据“was once the home of French kings...Louis\nXIV moved to Versailles in the late 1600s”可知，是“直到”路易十四搬走，卢浮宫才不再是国\n王居所，until符合语境。故选C。\n9.句意：去年，这个著名的展览馆接待了大约900万游客。\nhundred百；thousand千；million百万。卢浮宫是世界著名博物馆，所以游客数量应是以百万计，\nmillion符合实际情况。故选C。\n10.句意：这一事件肯定让世界各地的许多人感到惊讶，并对博物馆的安全和文化宝藏的保护感到担忧。\nsurprised感到惊讶的，形容词，修饰人；surprise惊讶，名词；使惊讶，动词；surprising令人惊讶\n的，形容词，修饰物。此处修饰“people”人，要用surprised，表示“感到惊讶的”。故选A。"
  },
  {
    "id": "xdf-5378f07ff8f92ccf",
    "type": "fill",
    "text": "A. perfectly B. goal C. regularly D.\nsimilar E. strange\nHave you ever dreamed of becoming an astronaut? For most of us, it seems like an\n1\nimpossible (1) . But actually, astronauts train for years to prepare for space\n2\nmissions. They practice underwater to experience a (2) environment to zero\ngravity.\n3\nBefore a mission, astronauts must check their health (3) . They need to be\nin top physical condition. Sometimes they have to live in a special building for weeks to\nget used to the small space. The training is hard, but they know every detail must work\n4\n(4) for their safety in space.\nA. confident B. breathing C. record D. set E. collect\nWhen astronauts are in space, even simple tasks like (5) or eating become\nchallenging. Food floats away if you’re not careful! That’s why astronauts (6)\n6\ntheir meals carefully before eating. They also need to exercise two hours\nevery day to keep their muscles strong.\nMany astronauts say the most amazing moment is looking at Earth from above. They feel\n7\nproud but also responsible for protecting our planet. Some have (7) a world\n8\n(8) for the longest time spent in space. Their courage and hard work inspire\nus to reach for the stars.",
    "answer": "1 B 2 D 3 C 4 A 5 B 6 E 7 D 8 C",
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 3,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "本文主要介绍了宇航员在执行太空任务前的训练、在太空中的日常工作与生活，以及宇航员肩负的责任\n与带给人们的激励。\n句意：对我们大多数人来说，这似乎是一个不可能实现的目标。空格前有不定冠词an和形容词\nimpossible，此处需要填入单数可数名词；B选项goal“目标”，符合“成为宇航员是一个目标”的语\n境。\n句意：他们在水下训练，来体验和零重力相似的环境。空格后为名词environment，需要形容词修饰；\n固定搭配similar to表示“与……相似”，符合水下模拟太空零重力环境的语境。\n句意：在任务开始前，宇航员必须定期检查身体健康状况。本句句子结构完整，需要副词修饰动词\ncheck；C选项regularly“定期地”，用来描述体检的频率。\n句意：训练十分艰苦，但他们知道每一个细节都必须完美运作，来保障他们在太空中的安全。需要副词\n修饰动词work；A选项perfectly“完美地”，契合细节必须精准无误保障安全的语境。\n句意：当宇航员身处太空时，就连呼吸、吃饭这类简单的任务都变得充满挑战。介词like后需要接动名\n词，和后面eating并列；B选项breathing“呼吸”，和eating并列作like的宾语。\n句意：这就是宇航员们在吃饭前要仔细整理餐食的原因。本句缺少谓语动词，主语astronauts为复数，\n时态为一般现在时，用动词原形；E选项collect“收集、整理”，符合语境。\n句意：一些宇航员已经创下了保持太空最长停留时间的世界纪录。本句为现在完成时，have后需要接动\n词过去分词set，构成固定搭配set a world record“创下一项世界纪录”。\n句意：一些宇航员已经创下了保持太空最长停留时间的世界纪录。固定搭配world record“世界纪\n录”，C选项record“纪录”，符合语境。"
  },
  {
    "id": "xdf-08e952cdb2bf7238",
    "type": "cloze",
    "text": "An ocean of noise affects my life a lot\nI’m a little clown fish, and I like to live in coral reefs (珊瑚礁), but I don’t\nalways stay here. When I was just a baby, I wandered in the open sea for months. It was a\nbig, scary world out there. When I grew strong enough, I hurried home. I couldn’t see the\nreef. 1 , I depended on its small sound to guide me home.\nUnfortunately, the ocean isn’t as peaceful as it used to be. Humans, with their\nships, speedboats, and surfing, have made it a noisy place. Their noises are often louder\nthan the 2 ones, which makes it difficult for us to find our way back.\nI’m not the only one to suffer. Deep underwater, there is little light. Sounds,\nhowever, travel far. Many of my ocean friends rely on their ability of 3 to survive.\nDolphins call each other by unique names and whales sing beautiful songs. But now, the\nnoise is disturbing our lives. Therefore, they swim away from the noises. For example,\nwhales try to 4 busy shipping routes. But in many places, human-made noise is\neverywhere. We’re forced to leave our homes and move to quieter areas, where we must\ncompete with others for food and shelter. Over time, our populations shrink.\nLuckily, I have discovered humans are taking action and noise is a controllable\nproblem. Many 5 , like wind-powered boats, have already existed. Scientists are\ncalling for stricter rules. “We have noise standards (标准) for cars and trucks,” they\nsay. “Why shouldn’t we have them for 6 ?”\n1. A. In addition B. In brief C. Instead D. In return\n2. A. common B. real C. sudden D. natural\n3. A. singing B. hearing C. changing D. thinking\n4. A. repeat B. avoid C. manage D. spread\n5. A. awareness B. services C. solutions D. complaints\n6. A. animals B. humans C. planes D. ships",
    "answer": "1-5 CDBBC 6-6 D",
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 4,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "1.句意：相反，我依靠它微弱的声音指引我回家。\nIn addition此外；In brief简而言之；Instead相反；In return作为回报。根据“I couldn’t see\nthe reef.”可知，由于看不到，转而依靠声音。故选C。\n2.句意：它们的噪音通常比自然的更大，这让我们很难找到回去的路。\ncommon常见的；real真实的；sudden突然的；natural自然的。根据“Humans, with their ships,\nspeedboats, and surfing, have made it a noisy place.”可知，人类噪音比海洋自然的声音更大，\n突出人类噪音对海洋生物的影响。故选D。\n3.句意：我的许多海洋朋友依靠它们的听觉能力生存。\nsinging唱歌；hearing听觉；changing改变；thinking思考。根据“Dolphins call each other by\nunique names and whales sing beautiful songs.”可知，海洋生物依靠听觉能力生存。故选B。\n4.句意：例如，鲸鱼试图避开繁忙的航运路线。\nrepeat重复；avoid避开；manage管理；spread传播。根据“the noise is disturbing our lives”可\n知，鲸鱼会避开繁忙的航运路线，减少噪音影响。故选B。\n5.句意：许多解决办法，比如风力驱动的船，已经存在了。\nawareness意识；services服务；solutions解决办法；complaints抱怨。根据“like wind-powered\nboats, have already existed”可知，举例说明应对海洋噪音问题的解决办法。故填C。\n6.句意：他们说：“我们有针对汽车和卡车的噪音标准，为什么我们不能针对船舶呢？”\nanimals动物；humans人类；planes飞机；ships船。根据“We have noise standards (标准) for\ncars and trucks”可知，提到汽车、卡车有噪音标准，此处指出人类航海活动的船舶也应有噪音标\n准。故选D。"
  },
  {
    "id": "xdf-83db06c9b355a7f2",
    "type": "cloze",
    "text": "Choose the best answer to complete the passage. (选择最恰当的答案完成短文)\nNatural disasters are becoming more frequent and more 1 in recent years around\nthe world. Scientists believe that climate change plays a major role in this worrying\ntrend. Many countries have 2 better warning systems including advanced (先进的)\nweather monitoring technology to 3 people from dangers.\nWhen a disaster 4 hits, it is important to stay calm. People should follow\ninstructions given by local government through official channels (频道). In some high-risk\nareas, schools 5 practise earthquake and fire drills (演习) 6 students know\nclearly what to do when real emergencies occur, such as where to find safe shelter.\nWe cannot keep natural disasters from happening, but we can reduce their influence\nthrough proper 7 . Making an emergency kit (应急包) is much better than waiting until\nthe last minute when stores are closed.\n8 , being prepared today saves your life tomorrow. Let’s all learn to be ready\nfor unexpected events by creating family emergency plans and staying informed about local\nrisks.\n1. A. vivid B. serious C. valuable D. necessary\n2. A. limited B. destroyed C. donated D. developed\n3. A. prevent B. provide C. prefer D. protect\n4. A. suddenly B. immediately C. hardly D. exactly\n5. A. especially B. regularly C. peacefully D. terribly\n6. A. though B. if C. so that D. as if\n7. A. preparation B. decoration C. expectation D. position\n8. A. In addition B. In conclusion C. For example D. As a result",
    "answer": "1-5 BDDAB 6-8 CAB",
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 5,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "1.句意：近年来全球自然灾害变得更频繁、更严重。\nworrying trend表示“令人担忧的趋势”，应用serious“严重的”，符合灾害变严重的语境。\n2.句意：许多国家研发了更完善的预警系统，包含先进气象监测技术。\nbetter warning systems表示“更完善的预警系统”，应用developed“开发”，符合开发系统完善预\n警系统的语境。\n3.句意：为了保护人们免受危险。\nprotect sb from sth表示“保护某人免受某物伤害”，固定搭配。\n4.句意：当灾害突然袭击时，保持冷静很重要。\n根据常识，自然灾害具有突发性，应用suddenly“突然”。\n5.句意：在高风险地区，学校定期开展地震、消防演练。\n为了熟悉流程，演习需要定期进行，应用regularly“定期地”。\n6.句意：学校定期演练，以便学生清楚突发事件的应对方法。\n后句是演练想要达成的目的，应用so that引导目的状语从句。\n7.句意：我们无法阻止灾害发生，但可以通过充分准备降低灾害影响。\n根据下文，“Making an emergency kit”表示“准备应急包”，对应防灾准备，应用preparation。\n8.句意：总而言之，今日做好准备能在未来拯救生命。\n本段是全文收尾总结，In conclusion表示“总之”，用于文末总结。"
  },
  {
    "id": "xdf-4ceb4d0a761b6e21",
    "type": "completion",
    "text": "Lily: Hi Tom! Our teacher asked us to prepare a speech about volunteers. I think\nit’s a big topic — where should we start?\n1\nTom: I totally agree! Talking about all volunteers is too broad. (1) ____ Many of\nus want to volunteer but don’t know how.\n2\nLily: (2) ____ Teen volunteers have special needs, like safety and time for\nhomework. Let’s narrow it down to “what teens should note when volunteering.”\n3\nTom: I couldn’t agree more. (3) ____ My cousin got lost alone at a clean-up.\nLily: Hmm. Safety should always be first. What’s more, teens shouldn’t spend too much\ntime — my friend skipped class and failed a test.\n4\nLily: Right! (4) ____\n5\nTom: (5) ____ I’m sure that will be very useful.\nLily: Perfect! Let’s act at once.\nA. That’s a great idea!\nB. Balance is better than cutting time.\nC. Maybe we can focus on teenagers?\nD. It might inspire more students to take action.\nE. Add our stories as examples — classmates will get it easily.\nF. Teens must choose safe activities.",
    "answer": "1-5 CAFBE",
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 6,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "本文通过Lily和Tom的讨论，聚焦青少年志愿者的注意事项，包括选择安全活动、平衡时间以及用实例\n说明，为演讲准备提供了具体方向。\n根据“Talking about all volunteers is too broad.”可知，Tom在建议聚焦青少年志愿者。C项“也\n许我们可以聚焦青少年？”符合语境。故选C。\n根据“Teen volunteers have special needs, like safety and time for homework.”可知，Lily在\n同意聚焦青少年。A项“好主意！”符合语境。故选A。\n根据“My cousin got lost alone at a clean-up.”可知，Tom在强调安全的重要性。F项“青少年必\n须选择安全的活动。”符合语境。故选F。\n根据“What’s more, teens shouldn’t spend too much time — my friend skipped class and\nfailed a test.”可知，Lily在说明平衡时间的重要性。B项“平衡比削减时间更好。”符合语境。故\n选B。\n根据“I’m sure that will be very useful.”可知，Tom在建议加入实例。E项“加入我们的故事作\n为例子——同学们会更容易理解。”符合语境。故选E。"
  },
  {
    "id": "xdf-b052612b727dc0c4",
    "type": "reading",
    "text": "Digital technology is changing our lives in many good ways. It makes daily\ntasks easier and helps us connect with the world better.\nFirst, it helps with learning. Before, students could only learn from books and\nteachers at school. Now, with apps like online classes and educational videos, we can\nstudy at home or anywhere. If we don’t understand a math problem, we can watch a video to\nlearn it again. This makes learning more flexible.\nSecond, it improves communication. Long ago, people sent letters which took weeks to\narrive. Now, we use Wechat, WhatsApp or video calls. We can talk to grandparents who live\nfar away and even see their faces. It feels like they are right beside us.\nThird, it makes our life more convenient. We don’t need to carry much cash. We can\npay for food or books with our phones. When we want to go somewhere, apps like maps help\nus find the best way. They even tell us when the bus will come.\nLastly, it helps with health. Some apps can track our steps or sleep. Doctors can also\nuse technology to check patients’ health better. For example they can look at test\nresults online quickly.\nDigital technology is really a great helper. It makes our lives happier and easier. We\nshould learn to use it well to make our future better.\n1.单选题\nWhere did students mainly learn before digital technology?\nA. Online classes.\nB. Books and school teachers.\nC. Educational videos.\nD. Learning apps.\n2.单选题\nHow long did it take for letters to arrive long ago?\nA. A few minutes.\nB. A few hours.\nC. A few weeks.\nD. A few days.\n3.单选题\nWhich app is NOT mentioned for communication?\nA. Map apps.\nB. WhatsApp.\nC. Wechat.\nD. Video call apps.\n4.单选题\nWhat can we use our phones to do for convenience according to the passage?\nA. Track sleep.\nB. Pay for things.\nC. Watch educational videos.\nD. Talk to grandparents.\n5.单选题\nWhat can some health apps track?\nA. Test results.\nB. Bus arrival time.\nC. Steps or sleep.\nD. Math problems.\n6.单选题\nWhat does the passage mainly tell us?\nA. How to use digital technology well.\nB. The history of digital technology.\nC. The problems of digital technology.\nD. How digital technology improves our lives.",
    "answer": "(1) B (2) C (3) A (4) B (5) C (6) D",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_08_20260922_215442.pdf","number":7,"page":5,"sha256":"62f446ebd060c952f438b459102b8b6b6bc640776e5602811ca8e927c8941dfb"},
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 7,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“Before, students could only learn from books and teachers at\nschool.”可知，以前，学生只能从书本和学校的老师那里学习。故选B。\n\n第 2 小题：\n细节理解题。根据“Long ago, people sent letters which took weeks to arrive.”可\n知，很久以前，人们寄信，信件要花数周才能送达。故选C。\n\n第 3 小题：\n细节理解题。根据“Now, we use Wechat, WhatsApp or video calls.”可知，现在，我们\n会使用微信、WhatsApp或者视频通话。故选A。\n\n第 4 小题：\n细节理解题。根据“We don’t need to carry much cash. We can pay for food or books\nwith our phones.”可知，我们不需要携带大量现金，能用手机支付食物或书籍的费用。故\n选B。\n\n第 5 小题：\n细节理解题。根据“Some apps can track our steps or sleep.”可知，一些应用可以追踪\n我们的步数或睡眠情况。故选C。\n\n第 6 小题：\n主旨大意题。根据文章可知，全文从学习、沟通、生活便利、健康四个方面介绍数字技术对\n生活的积极改变。故选D。"
  },
  {
    "id": "xdf-03cbb9d690511229",
    "type": "reading",
    "text": "COLORFUL CREATURES CLUB\nCalling all curious kids & students!\nDiscover nature’s living rainbows!\nJoin our Colorful Creatures Club to explore the amazing world of animals that light up the\nwild with their brilliant colors!\nMeet the masters of disguise (伪装) & display!\n●Chameleons: Watch them shift colors like magic!\n●Red rock crabs: These colorful climbers stick to rocks like superheroes!\n●Red-eyed tree frogs: See how their bright red eyes scare predators (捕食者) away!\n●Rainbow lorikeets: These birds carry real rainbows on their wings!\n●Siamese fighting fish: Beautiful but fierce (凶残的)—see their flowing fins in action!\nFun club activities:\n√Interactive (交互式的) animal talks Where: VR lab, New Star School\n√Nature art & coloring When: Friday afternoons from 3:30 to 5:00\n√Outdoor exploration When: in December.\n√Science experiments minds! Who: Students aged 6-14 with curious\n√Creative storytelling minds!\nSign up today and let your curiosity take flight!\nFor more information ...\nCall 800****1234.\nTalk to Mr. Lee at the Students’ Club Office.\nScan the QR code on the right.\n1.单选题\nBy making this poster, the author mainly wanted to ________.\nA. call on students to join the Colorful Creatures Club\nB. make students vote for their favorite colorful creature\nC. collect video clips of colorful creatures from students\nD. invite students to join a painting contest about colorful creatures\n2.单选题\nThe outdoor exploration of the club will be organized in the month of ________.\nA. May\nB. September\nC. November\nD. December\n3.单选题\nAll of the following kinds of animals are introduced in the poster EXCEPT________.\nA. frogs\nB. crabs\nC. dinosaurs\nD. birds\n4.单选题\nStudents with ________ are most welcome to join the club.\nA. a strong body\nB. curious minds\nC. effective leadership\nD. good scores at school\n5.单选题\nAmong the creatures introduced, ________ are likely to fight one another.\nA. chameleons\nB. red rock crabs\nC. red-eyed tree frogs\nD. Siamese fighting fish\n6.单选题\nA common feature of the creatures in the poster is ________.\nA. beautiful colors\nB. living on land\nC. good hunting skills\nD. the ability to change their colors",
    "answer": "(1) A (2) D (3) C (4) B (5) D (6) A",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_08_20260922_215442.pdf","number":8,"page":6,"sha256":"62f446ebd060c952f438b459102b8b6b6bc640776e5602811ca8e927c8941dfb"},
    "sources": [
      {
        "file": "错题_08_20260922_215442.pdf",
        "number": 8,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n主旨大意题。根据海报标题“COLORFUL CREATURES CLUB”、“Join our Colorful\nCreatures Club...”以及“Sign up today and let your curiosity take flight!”等内\n容可知，作者制作这张海报主要是为了号召学生加入该俱乐部。故选A。\n\n第 2 小题：\n细节理解题。根据海报中“Fun club activities”部分的“When: Friday afternoons from\n3:30 to 5:00 in December.”可知，俱乐部的活动将在12月组织。故选D。\n\n第 3 小题：\n细节理解题。海报中介绍的动物有变色龙（Chameleons）、红石蟹（Red rock crabs）、红\n眼树蛙（Red-eyed tree frogs）、彩虹吸蜜鹦鹉（Rainbow lorikeets）、暹罗斗鱼\n（Siamese fighting fish），其中提到了青蛙、螃蟹、鸟类，未提及恐龙。故选C。\n\n第 4 小题：\n细节理解题。根据“Who: Students aged 6-14 with curious minds!”可知，俱乐部最欢迎\n有好奇心的学生加入。故选B。\n\n第 5 小题：\n细节理解题。根据“Siamese fighting fish: Beautiful but fierce (凶残的)—see their\nflowing fins in action!”可知，暹罗斗鱼可能会互相争斗。故选D。\n\n第 6 小题：\n细节理解题。根据海报开头“Discover nature’s living rainbows!”以及“explore the\namazing world of animals that light up the wild with their brilliant colors!”可\n知，海报中介绍的生物的共同特征是拥有美丽的颜色。故选A。"
  },
  {
    "id": "xdf-410964dac9399842",
    "type": "choice",
    "text": "——I wonder if I could use your telephone.\n—— .\nA. I wonder how\nB. I don't wonder\nC. Sorry, it's out of order\nD. No wonder, here it is",
    "answer": "C",
    "sources": [
      {
        "file": "错题_09_20260922_215452.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考查常见情景交际用语。\n解题要点：\n选项分析：\nA．我想知道怎样；\nB．我不想知道，我不认为；\nC．抱歉，它坏了；\nD．难怪，它在这。\n结合语境：我想知道我能否用一下你的电话。问句相当于 \"Could I use your telephone?\" 正确的答\n话方式一般为 \"Of course you can\"（肯定）或 \"Sorry，you can't\" （否定）。\n因此正确答案为 C"
  },
  {
    "id": "xdf-21d569d0861a92c0",
    "type": "choice",
    "text": "There are 1 hospitals in those poor villages. The sick people in those\nplaces, 2 , need our help.\nA. too few; therefore\nB. a little; so\nC. a few; so\nD. too little; therefore",
    "answer": "A",
    "sources": [
      {
        "file": "错题_09_20260922_215452.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "确定句意，那些贫穷的村庄几乎没有医院。所以那地方的病人需要我们的帮助。too few几乎没有一\n个。a few有几个。therefore所以，一般前面的分句表达原因，后面的分句表达结果。so做副词表示程\n度\"如此\"。a little一点儿。too little太少，几乎没有，后跟不可数名词。题干中hospital 是可数\n名词。题干表达的含义：那些贫穷的村庄几乎没有医院。所以那地方的病人需要我们的帮助。\n确定答案。故答案选A。"
  },
  {
    "id": "xdf-4d32c6b295d92845",
    "type": "choice",
    "text": "\"Trick or treat\"means\"get a _________or play a _________\"．（ ）\nA. trick；trick\nB. treat；treat\nC. treat；trick\nD. trick；treat",
    "answer": "C",
    "sources": [
      {
        "file": "错题_09_20260922_215452.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "trick or treat是万圣节大家串门所用的俗语，意为不给糖就捣乱。treat的意思是请客，这里和get搭\n配，表示给糖；trick的意思是诡计，把戏，这里和play搭配，表示耍花招。\n故选：C。"
  },
  {
    "id": "xdf-2dbc3ff79590b703",
    "type": "reading",
    "text": "Can you believe everything you see? Not always! Sometimes our minds and our\neyes make mistakes and get confused (困惑的). This may be because we are looking at an\noptical illusion. Here optical means “related to sight”—the way we see things. An\nillusion is something that looks different from the way it really is. In short, an optical\nillusion is a trick that our eyes play on us.\nLook at these optical illusions and compare what you see with what your classmates\nsee. The way we see things is often personal, so not everyone will see things the same\nway.\n1. Are the lines straight?\nAt a first look, most people say “No”. But if you compare the lines against object\nwith a ruler, you’ll see otherwise. The small circles in the square help create the\nillusion.\n2. Is it white?\nSquare 1 is clearly gray. But what about Square 2? Is it white? Is it light gray? You\nmay not believe it, but Squares 1 and 2 are exactly the same color. Your eyes see the\ncolors. but your brain notices the shadow (阴影) made by the apple. It therefore decides\nthat the square in the shadow is a lighter color than it really is.\n3. Are the circles moving?\nIf you look closely at this picture, the circles may appear to move. Of course, this\nis impossible. How can a picture move? When we see circle-in-circle shapes, like in car\nwheels, they are usually moving. Our brains are used to seeing these shapes move. When our\neyes see this shape, our mind decides that the image is moving. Other scientists believe\nthe illusion of movement is caused by the movements of our eyes as we look at the\ndifferent colors and patterns of the picture.\n1.单选题\nWhat is the main purpose of the reading?\nA. To describe how human eyes work.\nB. to give examples of everyday optical illusions.\nC. to tell us there are optical illusions in our daily life.\nD. to explain what optical illusions are and give some examples.\n2.单选题\nWhat causes optical illusion 1?\nA. The size of the squares.\nB. The color of the lines.\nC. The circles inside the squares.\nD. The lines against object with a straight line.\n3.单选题\nWhat causes optical illusion 2?\nA. The shadow in the image.\nB. The color of the apple.\nC. The position of the square.\nD. The number of squares in the picture.\n4.单选题\nWhich of these is an optical illusion?\nA. Thinking of a picture in your mind.\nB. Hearing a voice in your head that isn’t there.\nC. Seeing water on a road when it’s not really there.\nD. Looking up at a strange cloud and noticing its shape.",
    "answer": "(1) D (2) C (3) A (4) C",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_09_20260922_215452.pdf","number":4,"page":1,"sha256":"d868372180bd5ba4d3ba2faadf1234368e76ad4bd8b444a9a24a39db1ef16c95"},
    "sources": [
      {
        "file": "错题_09_20260922_215452.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n推理判断题。通读文章，并根据第一段中的“Not always! Sometimes our minds and our\neyes make mistakes and get confused. This may be because we are looking at an\noptical illusion.”可知，文章主要解释了什么是光学错觉，并通过三个具体的例子来说明\n光学错觉是如何产生的。所以文章的主旨大意是解释什么是光学错觉，并给出一些例子。故\n选D。\n\n第 2 小题：\n细节理解题。根据第三段中的“The small circles in the square help create the\nillusion.”可知，第一个光学错觉产生的原因是正方形里的小圆圈。故选C。\n\n第 3 小题：\n细节理解题。根据第四段中的“Your eyes see the colors. but your brain notices the\nshadow (阴影) made by the apple. It therefore decides that the square in the\nshadow is a lighter color than it really is.”可知，第二个光学错觉产生的原因是图\n片中的阴影。故选A。\n\n第 4 小题：\n推理判断题。根据第一段中的“Not always! Sometimes our minds and our eyes make\nmistakes and get confused. This may be because we are looking at an optical\nillusion.”可知，光学错觉是一种看起来与实际情况不同的视觉现象。C项“Seeing water\non a road when it’s not really there.(在路上看到水，而实际上并没有。)”符合光学\n错觉的定义，即一种看起来与实际情况不同的视觉现象。故选C。"
  },
  {
    "id": "xdf-eb91afc630947b77",
    "type": "reading",
    "text": "Many students think repeating (重复) something again and again is the\nbest way to learn. But a study shows this: ★\nOur brains (大脑) like learning fun and new things. Just reading the same thing many\ntimes may not be the best way. But if we study in different ways and from different\nexamples (例子), we can remember more.\nIn a study, students learn Finnish words in sentences (句子). Some read the same\nsentence many times. Others see the words in different sentences. The students seeing the\nwords in different sentences can remember more, even after one day!\nBut many students think learning from the same sentence is easier. This is called a\n“metacognitive illusion”. It means we may think a way works, even if it doesn’t.\nTo learn better, choose different parts of a day to study. Don’t look at your notes\nwhen you recall the details (回忆细节)，and use different ways to test yourselves. It may\nfeel harder, but it works better in the long run.\n1.单选题\nWhat can we put back into the blank “ ★ ” ?\nA. It’s important to study different subjects.\nB. Reading the same thing over three times is the best.\nC. Thinking too much about a problem is bad for our brains.\nD. Learning in different ways can help you remember things better.\n2.单选题\nWhat’s the function (功能) of Paragraph 3 ?\nA. To share something funny with us.\nB. To show the idea in Paragraph 1 is true.\nC. To tell us what ways of learning are right.\nD. To ask us for our ideas on learning ways.\n3.单选题\nWhat may the underlined phrase “metacognitive illusion” in Paragraph 4 mean in Chinese ?\nA. 元认知错觉\nB. 运动错觉\nC. 时间错觉\nD. 方位错觉\n4.单选题\nWhat may the writer say to Tim if he only reads words again and again?\nA. You are using the best way. Keep going.\nB. You should only remember words right before the exam.\nC. It’s not good to just read words. You should also try other ways.\nD. Reading words is not useful; you should always make word cards.\n5.单选题\nWhat’s the best title of the text?\nA. Why We Shouldn’t Repeat Things in Learning\nB. Ways of Remembering Finnish Words Fast\nC. Variety (多样性): the Key to Learning Well\nD. The Science Behind the Metacognitive Illusion",
    "answer": "(1) D (2) B (3) A (4) C (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_09_20260922_215452.pdf","number":5,"page":2,"sha256":"d868372180bd5ba4d3ba2faadf1234368e76ad4bd8b444a9a24a39db1ef16c95"},
    "sources": [
      {
        "file": "错题_09_20260922_215452.pdf",
        "number": 5,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n推理判断题。根据“Many students think repeating something again and again is the\nbest way to learn. But a study shows this...”及“Our brains like learning fun\nand new things...But if we study in different ways and from different examples,\nwe can remember more.”可知，很多学生认为重复是最好的学习方法；大脑喜欢有趣新颖的\n内容，用不同方式学习能记住更多，此处应用“用不同方式学习能帮你更好地记忆。”承上\n启下。故选D。\n\n第 2 小题：\n细节理解题。根据“In a study, students learn Finnish words in sentences. Some\nread the same sentence many times. Others see the words in different sentences.\nThe students seeing the words in different sentences can remember more, even\nafter one day!”可知，在一项研究中，学生们通过句子来学习芬兰语单词。一部分学生反\n复朗读同一个句子，另一部分学生则在不同的句子中认识这些单词。结果发现，那些在不同\n句子中学习单词的学生，哪怕过了一天，能记住的内容也更多，本段通过具体研究对比两种\n学习方法的效果，其主要功能在于证明第一段提出的观点“重复学习未必是最优的学习方\n式，用不同方式学习效果更好”的正确性。故选B。\n\n第 3 小题：\n词句猜测题。根据“This is called a ‘metacognitive illusion’. It means we may\nthink a way works, even if it doesn’t.”可知，这被称为“元认知错觉”。它指的是，\n我们可能会认为某种方法是有效的，即便事实并非如此，因此此处metacognitive illusion\n表达为“元认知错觉”。故选A。\n\n第 4 小题：\n推理判断题。根据文章可知，文章反对单一重复的学习方法，建议尝试多元方法，可推知如\n果Tim只反复读单词，作者会建议他尝试其他方法。故选C。\n\n第 5 小题：\n最佳标题题。根据文章可知，全文围绕学习多样性展开，反驳重复学习的误区，用实验证明\n多样化学习的有效性，最后给出多样化学习的建议，因此最佳标题应为Variety (多样性):\nthe Key to Learning Well。故选C。"
  },
  {
    "id": "xdf-2233ab8bfdc05a71",
    "type": "choice",
    "text": "I want to buy ________ for my mother’s birthday.\nA. special something\nB. something special\nC. anything special\nD. special anything",
    "answer": "B",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我想为我妈妈的生日买些特别的东西。\n考查不定代词及形容词的位置。something某物，常用于肯定句中；anything任何东西，常用于否定句\n或疑问句中。本句是肯定句，所以应用something，排除选项C、D。形容词修饰不定代词时应置于不定\n代词之后，所以应是something special，排除选项A。故选B。"
  },
  {
    "id": "xdf-f73a927784ff6f08",
    "type": "choice",
    "text": "There are some 1 ways for them to get to 2 side of the\nmountain.\nA. another; another\nB. others; other\nC. other; other\nD. other; the other",
    "answer": "D",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意： \"对于他们来说，有一些其他的方法来到达山的另一边\" 。\nanother（无范围）另一个；others（无范围且后不接名词）另一些；other其他的（后接名词复数）；\nthe other两者中另一个。第一空处指的是 \"一些其他的方法\" ，且空后为ways，用other. 第二空处，\n根据side（可数名词单数）可知，表示\"山的另一边\"，指两者中另一个，用the other，故选D."
  },
  {
    "id": "xdf-85e9a4ddf6b6d3d2",
    "type": "reading",
    "text": "Gene was from a small town in India.He had to do homework by the light of a\nkerosene lamp（煤油灯）.Gene's eyes hurt and this made studying difficult.It was also\nother children's problem in his town.\nAlthough studying was difficult，Gene was an excellent student and went to a\nuniversity.He still worried about the kerosene lamp.By this time，he realized it was not\njust bad for school children but for the whole family.First，it can make them ill.Also，\nthe light can hurt people's eyes.Besides，it can lead to fires.Lastly，kerosene is\nexpensive.It was difficult to come up with a different kind of lamp that was cheap and\ngood for the environment.Yet Gene did not give up.\nOne day，he had an idea.He could use a small solar（太阳能的） light.Sunlight is free\nand solar power is good for the environment.Gene built his first solar lamp，and it\nworked.He began to build more lamps.\nEach lamp only cost ＄20.However，this was a lot of money to many villagers，who only\ngot around ＄34 a week，so Gene made sure he kept the cost down.First，Gene used the\nrecycled materials（可再生材料）.Next，volunteers built the lamps for free.Finally，people\nfrom many countries gave away money to his team，so the lamps were usually free.\nThousands of people had safe light.Julia，a mother of three，said， \"Thanks to Gene，\nmy children have light to read，and I have my own light to cook.\"The solar lamps made a\nbig difference.\n根据材料内容选择最佳答案。\n1.单选题\nWhat's Gene and other children's problem in the town？ ________\nA. Getting ill.\nB. Leaving school.\nC. Doing homework.\nD. Having eye problems.\n2.单选题\nWhat wasn't the reason that Gene worried about the kerosene lamp？ ________\nA. It was very expensive.\nB. It can make people ill.\nC. It can make more families poor.\nD. It is not good for people's eyes.\n3.单选题\nWhat do you think of the boy？ ________\nA. Kind and friendly.\nB. Smart and careful.\nC. Humorous and clever.\nD. Creative and warm-hearted.\n4.单选题\nWhat did Julia's words mean in the last paragraph？ ________\nA. To share Julia's experience.\nB. To show Gene's influence.\nC. To describe Gene's feeling.\nD. To introduce Gene's invention.\n5.单选题\nWhat's the best title of this passage？ ________\nA. A bright idea.\nB. A small town in India.\nC. How solar light is found.\nD. Kerosene lamp is bad for kids.",
    "answer": "(1) D (2) C (3) D (4) B (5) A",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_10_20260922_215503.pdf","number":5,"page":1,"sha256":"afc0ecf4006ad24938097cc8490461b53cc2076c69b1c5d733547cda537926e4"},
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据第一段Gene's eyes hurt and this made studying difficult.It was\nalso other children's problem in his town.（吉恩的眼睛很疼，这让学习变得困难。这\n也是他所在城镇其他孩子的问题。）可知吉恩和镇上其他孩子的问题是眼睛有问题。故选D。\n\n第 2 小题：\n细节理解题。根据第二段First，it can make them ill.Also，the light can hurt\npeople's eyes.Besides，it can lead to fires.Lastly，kerosene is expensive.（首\n先，它会使他们生病。另外，光会伤害人们的眼睛。此外，它还可能导致火灾。最后，煤油\n很贵。）可知吉恩担心煤油灯的原因不包括它会使更多的家庭变得贫穷。故选C。\n\n第 3 小题：\n细节理解题。根据全文尤其第三段Gene built his first solar lamp，and it worked.（吉\n恩制造了他的第一盏太阳能灯，并成功了。）可知吉恩富有创造力，热心肠。故选D。\n\n第 4 小题：\n细节理解题。根据最后一段Julia，a mother of three，said， \"Thanks to Gene，my\nchildren have light to read，and I have my own light to cook.\"The solar lamps\nmade a big difference.（朱莉娅是三个孩子的母亲，她说：\"多亏了吉恩，我的孩子们有了\n读书的灯，我也有了做饭的灯。\"太阳能灯起到了很大的作用。）可知朱莉娅最后一段的话展\n示吉恩的影响力。故选B。\n\n第 5 小题：\n标题归纳题。根据全文可知本文主要讲述了吉恩制造了他的第一盏太阳能灯的事情。故最佳\n标题为\"一个明亮的主意。\"故选A。"
  },
  {
    "id": "xdf-fdc36ba175ee1366",
    "type": "reading",
    "text": "SEEING DOUBLE\nA\nMany scientists once believed that physical similarities between identical twins are\ngenetic, while their personalities, intelligence, and other differences between them are\nan effect of their environment. But scientists are now discovering that the\nboundaries between genetics and environment are not so clear after all.\nThe Jim Twins\nB\nIdentical twins Jim Springer and Jim Lewis were adopted as babies and raised by\ndifferent couples. When the two Jims finally met at age 39, they discovered they had\nplenty in common. Both were 182 centimeters tall and weighed 82 kilograms. They had the\nsame smile and the same voice. When psychologist Thomas Bouchard Jr. invited the Jim twins\nto his lab, his colleagues found it very hard to tell them apart.\nC\nBut the similarities didn't stop at the physical. They had both had dogs named Toy,\nThey had both married women named Linda, and then divorced them. They had both been\nsheriff, 1enjoyed making things with wood, suffered severe headaches, and admitted to\nleaving love notes around the house for their wives. They had so much in common that it\nseemed unlikely these were just coincidences.\nGenetics and Intelligence\nD\nThe Jim twins were just one of 137 sets of separated twins Bouchard tested. When they\ncompared the twins' IQ scores, Bouchard and his team reached a surprising conclusion. They\nconcluded that intelligence was mostly connected to genetics rather than to training or\neducation. It seemed the differences in family and environment had little effect.\nE\nHowever, genes can't control everything, argues geneticist Danielle Reed, who also\nstudies twins. Reed's research shows that, though nothing can truly change our DNA,\nenvironmental differences that a child experiences before birth and in their first year\ncan sometimes affect the way the DNA behaves. This can make even identical twins into\nvastly different people. \"What I like to say is that Mother Nature2 writes some things in\npencil and some things in pen,\" she explains. \"'Things written in pen you can't change.\nThat's DNA. But things written in pencil you can.\"\n1 A sheriff is a kind of police officer.\n2 Mother Nature is sometimes used to refer to nature, especially when it is being\nconsidered as a force that affects human beings.\n1.单选题\nWhat is the reading mainly about?\nA. how identical twins are formed\nB. the effects genes have on personality\nC. the differences between identical twins\n2.单选题\nIn the past, scientists believed that _______.\nA. genetics only controlled our appearance\nB. genetics controlled everything about who we are\nC. our genes are affected by the environment around us\n3.单选题\nWho does the word they refer to in the second sentence of paragraph D?\nA. the Jim Twins\nB. sets of twins\nC. Bouchard and his team\n4.单选题\nAccording to Bouchard and his team, what is intelligence mostly related to?\nA. genetics\nB. education\nC. parenting\n5.单选题\nIn paragraph E, the word vastly is closest in meaning to _______.\nA. unfortunately\nB. interestingly\nC. extremely",
    "answer": "(1) B (2) A (3) C (4) A (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_10_20260922_215503.pdf","number":6,"page":2,"sha256":"afc0ecf4006ad24938097cc8490461b53cc2076c69b1c5d733547cda537926e4"},
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 6,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n主旨大意题。文章主要讨论了基因和环境如何影响同卵双胞胎的相似性和差异性，特别是在\n个性、智力等方面。这一点在文章的A段有提到：“Many scientists once believed that\nphysical similarities between identical twins are genetic, while their\npersonalities, intelligence, and other differences between them are an effect of\ntheir environment.”（许多科学家曾经相信，同卵双胞胎之间的身体相似性是遗传的，而\n他们的个性、智力和其他差异是环境的影响。）故选b。\n\n第 2 小题：\n细 节 理 解 题 。 文 章 A 段 提 到 ： “Many scientists once believed that physical\nsimilarities between identical twins are genetic...”（许多科学家曾经相信，同卵双\n胞胎之间的身体相似性是遗传的...），这表明科学家们过去认为基因只控制了我们的外表。\n故选a。\n\n第 3 小题：\n推理题。文章D段中提到：“When they compared the twins' IQ scores, Bouchard and\nhis team reached a surprising conclusion.”（当他们比较双胞胎的智商分数时，布沙尔\n和他的团队得出了一个令人惊讶的结论。）这里的“他们”指的是进行比较的布沙尔和他的\n团队。故选c。\n\n第 4 小题：\n细节理解题。文章D段提到：“They concluded that intelligence was mostly connected\nto genetics rather than to training or education.”（他们得出结论，智力主要与遗传\n有关，而不是训练或教育。）故选a。\n\n第 5 小题：\n词义猜测题。文章E段中提到：“This can make even identical twins into vastly\ndifferent people.”（这可以使即使是同卵双胞胎也变得极其不同。）“Vastly”在这里的\n意思是“极其”，表示程度很深的差异。故选c。"
  },
  {
    "id": "xdf-25a52828e771db0e",
    "type": "reading",
    "text": "I have two friends. They are Gina and Jenny, and they are twin sisters. They\ncome from Singapore. They are 12 years old. They can speak English and Chinese.\nNow the twins are in China. Their family are in China, too. They live in Shanghai.\nThere are 5 people in their family. They are their parents, their brother and them. Their\nmother is a doctor (医生). Their father is a teacher. Their brother Alan is only four\nyears old. He can’t go to school. Gina, Jenny and I are in the same class. Every day, we\nwalk to school and talk a lot together. They say China is a very good place and they like\nChina.\n根据短文内容，选择正确答案。\n1.单选题\nThe twins come from ________.\nA. China\nB. Singapore\nC. America\nD. Canada\n2.单选题\nThere are ________ people in the twins’ family.\nA. three\nB. four\nC. five\nD. six\n3.单选题\nThe twins’ mother is a ________.\nA. doctor\nB. nurse (护士)\nC. teacher\nD. worker\n4.单选题\nAlan is ________ years old.\nA. 12\nB. 10\nC. 6\nD. 4\n5.单选题\nWhich of the following is NOT TRUE (不符合事实)?\nA. Gina, Jenny and the writer (作者) walk to school every day.\nB. The writer and the twins are not classmates.\nC. Gina and Jenny like China.\nD. The twins’ family live in Shanghai now.",
    "answer": "(1) B (2) C (3) A (4) D (5) B",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_10_20260922_215503.pdf","number":7,"page":4,"sha256":"afc0ecf4006ad24938097cc8490461b53cc2076c69b1c5d733547cda537926e4"},
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 7,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“They come from Singapore.”可知她们来自新加坡。故选B。\n\n第 2 小题：\n细节理解题。根据“There are 5 people in their family.”可知她们家里有五口人。故选\nC。\n\n第 3 小题：\n细节理解题。根据“Their mother is a doctor (医生).”可知她们的妈妈是一名医生。故\n选A。\n\n第 4 小题：\n细节理解题。根据“Their brother Alan is only four years old.”可知艾伦只有四岁。\n故选D。\n\n第 5 小题：\n细节理解题。根据“Gina, Jenny and I are in the same class.”可知作者和双胞胎是同\n班同学。故选B。"
  },
  {
    "id": "xdf-f8d1b16601a6537e",
    "type": "choice",
    "text": "— ________ is the population of Shanghai?\n— More than 28 million.\nA. How much\nB. How many\nC. How big\nD. What",
    "answer": "D",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 8,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：——上海的人口是多少？——超过2800万。\n考查特殊疑问句。How much多少，询问不可数名词或价格；How many多少，询问可数名词；How big多\n大；What什么。询问人口数量时，固定使用“What is the population of...?”句型。故选D。"
  },
  {
    "id": "xdf-69b3174bd4ce4185",
    "type": "choice",
    "text": "You must finish your design ____________．（ ）\nA. as soon as you can\nB. as careful as you can\nC. as quick as possible\nD. as soon as possibly",
    "answer": "A",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 9,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "as soon as you can尽早地；as careful as you can 尽可能地细心；as quick as possible尽可能地\n快；as soon as possiby表达不正确。根据观察可知空格处应使用副词作状语，修饰finish，本题答案\n是A。\n故选：A。"
  },
  {
    "id": "xdf-bb2a3435c8787601",
    "type": "choice",
    "text": "We couldn’t connect computers ________ the Internet due to a fault in connection\n________ the router.\nA. to, with\nB. to, to\nC. with, with\nD. to, to",
    "answer": "A",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 13,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：由于路由器故障，我们无法将电脑连接到网络。\n考查介词辨析。to到……；with和，与。connect...to...表示“把……与……连接起来”，此处\n指“把电脑与网络连接起来”；in connection with表示“与……有关”，此处指“与路由器有关”。\n故选A。"
  },
  {
    "id": "xdf-a13a9f152de5eaf8",
    "type": "choice",
    "text": "Students can ________ this online course to improve their English.\nA. hear from\nB. benefit from\nC. come from\nD. learn from",
    "answer": "B",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 14,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "句意：学生们可以从这个在线课程中受益来提高他们的英语。\n考查动词短语辨析。hear from收到某人的来信；benefit from从……中受益；come from来自……；\nlearn from 向 …… 学 习 。 根 据 “Students can ... this online course to improve their\nEnglish.”，提高英语是从课程中受益。故选B。"
  },
  {
    "id": "xdf-eb87070514f24057",
    "type": "choice",
    "text": "As we keep _______ ourselves, we can _______ the changes in our life.\nA. to change; keep up with\nB. changing; keep in touch with\nC. to change; keep away from\nD. changing; keep up with",
    "answer": "D",
    "sources": [
      {
        "file": "错题_10_20260922_215503.pdf",
        "number": 15,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "本题考查非谓语动词（keep 的用法）以及动词短语辨析 。\n首先看 “keep” 的用法，“keep doing sth.” 是固定搭配，意为 “持续做某事” ，所以第一空要\n用 “changing” ，排除 A、C 选项（“keep to do sth.” 表述错误 ）。\n然后看动词短语，“keep up with” 意为 “跟上；适应” ，“keep in touch with” 意为\n“与…… 保持联系” 。句子表达的是随着我们不断改变自己，我们能够适应生活中的变化，所以第二\n空用 “keep up with” ，B 选项 “keep in touch with” 不符合语义。因此选 D，即随着我们不断\n改变自己，我们能够跟上生活中的变化。\n故正确答案为 D。"
  },
  {
    "id": "xdf-1f5d461ad54d0ddb",
    "type": "choice",
    "text": "Which of the following underlined parts is different in pronunciation from the\nothers?\nA. opinion\nB. object\nC. opposite\nD. operation",
    "answer": "A",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：下列划线部分的发音不同于其他的是？\n考查元音字母的发音。opinion/əˈpɪnjən/；object/ˈɒbdʒɪkt/；opposite/ˈɒpəzɪt/；operation/\nˌɒpəˈreɪʃ(ə)n/。选项B、C、D中划线部分的发音为/ɒ/，选项A中划线部分的发音为/ə/。故选A。"
  },
  {
    "id": "xdf-485b6c964161a464",
    "type": "choice",
    "text": "— What about some coffee?\n— No, I am not thirsty and recent studies ________ people ________ drinking it too much.\nA. warn; of\nB. warn; /\nC. warn; against\nD. warn; to",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——来点咖啡怎么样？——不，我不渴，最近的研究也警告人们不要喝太多咖啡。\n考查动词短语。warn sb. of sth. 警告(通知)某人会有某情况；warn sb. doing sth.表述错误；warn\nsb. against doing sth.告诫某人不要做某事；warn sb. (not) to do sth. 告诫某人(不)要做某事，\n其中to为不定式符号，后面接动词原形，可排除D项。根据“No, I am not thirsty”以及“drinking\nit too much.”可推知，研究是警告人们不要喝太多咖啡。故选C。"
  },
  {
    "id": "xdf-3e3292479f23151a",
    "type": "choice",
    "text": "What ________ animal is the panda? Is it a bear?\nA. a type of\nB. type of\nC. the type of\nD. types of",
    "answer": "B",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：熊猫是哪一种动物？——它是熊吗？\n“What type of…”是固定疑问句型，意为“什么类型的……？”符合题意。"
  },
  {
    "id": "xdf-0bbd5b70e4b314dc",
    "type": "choice",
    "text": "Radars used to track storms can detect water in the atmosphere only once it has\ncondensed into clouds or raindrops. 1\nA. 监控\nB. 探测\nC. 打听\nD. 证实",
    "answer": "B",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考查 detect词义。\n解题要点：题干翻译\"用于跟踪风暴的雷达只能在大气中凝结成云或雨滴后才能够探测到水。\"，因此划\n线处单词释义为 \"探测\"，本题选择B项。"
  },
  {
    "id": "xdf-4983eaf470c99721",
    "type": "choice",
    "text": "Don’t worry, Tom! I’ll send you an email __________.\nA. as soon as possible\nB. as soon as quickly\nC. as soon as can\nD. as quick as I can",
    "answer": "A",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "试题分析：句意:Tom，别担心。我会尽快的给你发电子邮件。as…as possible 尽可能…的，等同于\nas…as one can，根据句意可知这里应该用副词修饰动词send，故D选项不对。B、C两个选项的构成不\n对。故选A。\n考点：考查短语。"
  },
  {
    "id": "xdf-0540b3e12f13d070",
    "type": "choice",
    "text": "You should be ______the danger of playing with fire.\nA. aware to\nB. aware of\nC. aware with\nD. aware for",
    "answer": "B",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：你应该意识到玩火的危险。\n考查形容词短语，be aware of sth.意为“意识到”，是固定短语。其他三项搭配错误。故选B。"
  },
  {
    "id": "xdf-2de6b14ad18aaa15",
    "type": "choice",
    "text": "________how hard I try, I can’t seem to catch up with my classmates.\nA. No wonder\nB. No matter\nC. Whatever\nD. Even if",
    "answer": "B",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：不管我多努力，我似乎赶不上我的同学。\n考查让步状语从句。No wonder难怪；No matter不管； Whatever无论什么，不管什么；Even if\n即使。No matter how…：不管……如何；无论……多么……；此处指不管我多努力，我似乎赶不上我\n的同学。故选B。\nno matter 的用法：\nno matter作“无论”、“不管”解，用以引导表示让步的状语从句，常用在下列句型中：句型中的No\nmatter what (who/when etc.)...分别表示“无论何事”、“无论何人”、“无论何时”等，这个从句\n可以置主句之前，也可以置主句之后。\n（1）由no matter + what等引导的让步状语从句。No matter后面接关系代词或关系副词引导状语从句\n在句中作让步状语。\nNo matter what you do(=Whatever you do), you must be very careful.不管做什么事，你都必须非\n常细心。\n（2）No matter how…：不管……如何；无论……多么……。\nNo matter how hard you try (=However hard you try), you will never be successful. 不管你如\n何努力，你都不会成功的。本题就是这种用法。"
  },
  {
    "id": "xdf-96303b39e91242d2",
    "type": "choice",
    "text": "No matter ________hard it may be，I will carry it out．（ ）\nA. what\nB. whatever\nC. how\nD. however",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "分析句子，结合选项，推测意思是无论它可能有多么困难，我将执行下去．考查短语no matter how无\n论怎样，故选C．A什么，B无论什么，D无论怎样．答案为C。"
  },
  {
    "id": "xdf-aff501c13820e468",
    "type": "choice",
    "text": "23秋季week14 语法 17. ______ nobody was interested in it, they decided to cancel\nthe trip.\nA. Even though\nB. As soon as\nC. While\nD. Seeing that",
    "answer": "D",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考点为状语从句。根据句意，由于没有人感兴趣，他们决定取消旅行。seeing that表示由于"
  },
  {
    "id": "xdf-9247e8383ff42695",
    "type": "choice",
    "text": "23秋季week14 语法 18. ______ our country has so many good table-tennis players, we\nhave to decide on the best ones to take part in the game.\nA. Although\nB. Since\nC. If\nD. While",
    "answer": "B",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考点为状语从句。根据句意，既然我们国家有这么多优秀的乒乓球运动员，我们必须挑选最好的运动员\n参加比赛。since表示由于，既然"
  },
  {
    "id": "xdf-cf04a765f5d33bf4",
    "type": "choice",
    "text": "______ Tom has no interest in piano, there is no point pushing him to learn it.\nA. Now that\nB. In case\nC. Even if\nD. As if",
    "answer": "A",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "本题考查连词（短语）辨析。选项 A：“Now that” 意为 “既然；由于” ，符合 “既然汤姆对钢琴\n没兴趣，逼他学没意义” 的语义 。选项 B：“In case” 意为 “万一；假使” ，不符合语境 ，排\n除 。选项 C：“Even if” 意为 “即使；虽然” ，语义不符 ，排除 。选项 D：“As if” 意为\n“好像；仿佛” ，不符合 ，排除 。故选 A 。"
  },
  {
    "id": "xdf-768df3a1a45a3199",
    "type": "choice",
    "text": "23秋季week14 语法 21. She is willing to help you, ______ busy she is.\nA. what\nB. how\nC. however\nD. whatever",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考点为状语从句。根据句意，她很愿意帮你，然而她很忙。however表示然而，表转折"
  },
  {
    "id": "xdf-4550349476e5170a",
    "type": "choice",
    "text": "23秋季week14 语法 24. John may phone tonight. I don't want to go out ______ he\nphones.\nA. as long as\nB. in order to\nC. in case\nD. so that",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 15,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考点为状语从句。根据句意，John今晚可能会打电话。我不想出去，以防他打电话。in case表示以防"
  },
  {
    "id": "xdf-2ff6549d450f0555",
    "type": "choice",
    "text": "_______I know the money is securely kept，I shall not worry about it.\nA. Even though\nB. Unless\nC. As long as\nD. Despite\n第17题 1\n[单选题]The traffic in Shanghai will become better if everyone the traffic\nrules.\nA. will obey\nB. is obeying\nC. obey\nD. obeys",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 16,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "Even though 即使；Unless 除非，如果不；As long as 只要；Despite 尽管。根据语境\"____我知道\n钱被安全的保存，我将不会担心它。\"可知，前文是条件，即只要我知道钱被安全的保存，我将不会担\n心它。因此是\"As long as\"引导的条件状语从句，符合语境。\n故选：C。"
  },
  {
    "id": "xdf-7aa20c006dd655e6",
    "type": "choice",
    "text": "—Can you tell me if Sandy ________ to have dinner with us?\n—I think she will come if she ________ free tonight.\nA. come; will be\nB. come; is\nC. will come; is\nD. comes; is",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 18,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：——你能告诉我桑迪是否会来和我们一起吃晚饭吗？——我想如果她今晚有空的话，她会来的。\n考查时态。第一处是if引导的宾语从句，吃晚饭的动作还未发生，时态是一般将来时；第二处是if引导\n的条件状语从句，需满足“主将从现”原则。故选C。"
  },
  {
    "id": "xdf-21d267ffa819375a",
    "type": "choice",
    "text": "—Would you like to climb the mountain this Sunday?\n—Yes, I’d like to. But if you don’t, ________.\nA. so do I\nB. so I will\nC. neither do I\nD. neither will I",
    "answer": "D",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 19,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：——你这周日想要去爬山吗？——是的，我想去。但是如果你不去，我也不去。\n考查倒装句。so do I我也去；so I will我确实会；neither do I我也不去；neither will I我也不\n会。根据“But if you don’t”可知，if引导条件状语从句遵循“主将从现”，主句用一般将来时，\n排除A和C选项。此处表示你不去我也不去，否定用neither+助动词+主语，故选D。"
  },
  {
    "id": "xdf-4188b01ba491623d",
    "type": "choice",
    "text": "_______ the difficulty, we'll try our best to finish the work.\nA. In spite\nB. Although\nC. Despite of\nD. In spite of",
    "answer": "D",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 20,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "选项 A\n“in spite” 是一个不完整的表达，“in spite of” 才是完整的表示 “尽管；不顾” 的短语，所\n以 A 选项不符合要求。\n选项 B\n“although” 是一个连词，意思是 “虽然；尽管”，它后面需要接一个句子。例如：Although it\nwas raining heavily, he still went to school on time.（尽管雨下得很大，他仍然按时去上\n学。）而在本题中，“the difficulty” 是一个名词短语，不是一个句子，所以 B 选项不合适。\n选项 C\n“despite of” 是一个错误的表达，正确的是 “despite”，它和 “in spite of” 意思相近，后面\n直接接名词、代词或动名词。例如：Despite the bad weather, we had a wonderful picnic.（尽管\n天气不好，我们的野餐还是很愉快。）所以 C 选项错误。\n选项 D\n“in spite of” 是一个介词短语，意思是 “尽管；不顾”，后面接名词、代词或动名词。在本题\n中，“in spite of the difficulty” 表示 “尽管有困难”，符合句子的意思，所以 D 选项正确。"
  },
  {
    "id": "xdf-581a5fe197116039",
    "type": "choice",
    "text": "________ the cold weather, many people still go jogging in the park every morning.\nA. Because of\nB. Despite of\nC. Though\nD. Despite",
    "answer": "D",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 21,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：尽管天气寒冷，许多人仍然每天早晨去公园慢跑。\n考查短语辨析。Because of因为；Despite of错误搭配；Though虽然（后接句子）；Despite尽管（后\n接名词或名词短语）。根据“...the cold weather, many people still go jogging in the park\nevery morning.”可知，前后句为让步关系，且空格后为名词短语“the cold weather”。故选D。"
  },
  {
    "id": "xdf-568e3f31ec93d3bf",
    "type": "choice",
    "text": "You can use my room as you like ________ you keep it clean.（ ）\nA. as well as\nB. as soon as\nC. as long as\nD. as far as",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 22,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "考查连词。as well as和；as soon as一……就……；as long as只要；as far as就……而言。结合\n句意，你可以随便用我的房间，是在你保持房间干净的条件下，因此用as long as引导条件状语从句。\n故选：C。"
  },
  {
    "id": "xdf-a7159ff30af790d6",
    "type": "choice",
    "text": "—How can the medical team help the homelessness?\n—_______ they are in need, it will offer medical care to them at once.\nA. Before\nB. Though\nC. Once\nD. Because",
    "answer": "C",
    "sources": [
      {
        "file": "错题_11_20260922_215509.pdf",
        "number": 24,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：——医疗队如何帮助无家可归的人？——一旦他们有需要，它会立即为他们提供医疗服务。\n考查连词词义辨析。Before在……之前；Though尽管，虽然；Once一旦。“they are in need他们有需\n要”是“offer medical care to them at once立即为他们提供医疗服务”的条件。所以“一旦”符合\n语境。故选C。"
  },
  {
    "id": "xdf-2cfa348750e195f8",
    "type": "choice",
    "text": "________ her illness leaving her very weak at times, she tries to gain pleasure\nfrom life.\nA. Despite\nB. However\nC. Although\nD. Instead of",
    "answer": "A",
    "sources": [
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 15,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "本题考查让步状语的连接词。句子结构为“________ + 名词短语，主句”，需选择能引导让步状语的\n介词。\nA. Despite 是介词，后接名词或名词短语，符合结构要求，表“尽管”。\nB. However 是副词，需接完整句子，且需用逗号分隔，如“However, she...”，与题干结构不符。\nC. Although 是连词，后需接完整句子（含主语和谓语），但题干空格后为名词短语“her\nillness...”，故排除。\nD. Instead of 表“代替”或“而不是”，无让步含义，与句意矛盾。\n综上，正确答案为 A. Despite，句意为“尽管疾病让她有时很虚弱，她仍努力从生活中寻找乐趣”。"
  },
  {
    "id": "xdf-ad331fde99772ecf",
    "type": "choice",
    "text": "— Our company will provide more children with affordable preschool education.\n—________great the news is!\nA. How\nB. What\nC. What a",
    "answer": "A",
    "sources": [
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——我们公司将为更多的儿童提供负担得起的学前教育。——这消息真是太好了！\n考查感叹句。How引导的感叹句修饰的中心词为形容词或副词；What引导的感叹句修饰的中心词为名\n词。本句的中心词为great“极好的”，形容词，故应用how引导感叹句。故选A。\n常见的感叹句的结构。What +a/an ＋形容词＋可数名词单数＋主语＋谓语！What＋形容词＋可数名词\n复数/不可数名词＋主语＋谓语！How＋形容词/副词＋主语＋谓语！How＋形容词＋a/an＋可数名词单数\n＋主语＋谓语！How＋主语＋谓语！"
  },
  {
    "id": "xdf-4ad86797f2bb9b48",
    "type": "choice",
    "text": "—Does 1 of the two buses go to Hankou Railway Station?\n—Oh! You can't get there by 2 of them.\nA. both; none\nB. both; both\nC. either; either\nD. either; none",
    "answer": "C",
    "sources": [
      {
        "file": "错题_12_20260922_215514.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-fd6df9a46765a0c6",
    "type": "choice",
    "text": "I missed the 10 o’clock bus. I had to wait for the next bus in the rain for ________ half an\nhour.\nA. another\nB. the other\nC. others\nD. other",
    "answer": "A",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 5,
        "page": 1
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：——我错过了10点的公交车。我不得不在雨中再等半个小时的下一班车。\n考查不定代词辨析。another另一个，再一；the other两者中的另一个；others其他人或物；other其\n他的。这里表示“再等半个小时”，应用another表示“再一，又一”，后接时间段。故选A。"
  },
  {
    "id": "xdf-e0e5e55e9c63a69f",
    "type": "choice",
    "text": "My mom loves reading newspapers and she always shares ________with me.\nA. nothing interesting\nB. interesting nothing\nC. something interesting\nD. interesting something",
    "answer": "C",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 7,
        "page": 2
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "nothing没有什么；something某物；当形容词修饰不定代词时，要把形容词放在不定代词的后面，排\n除B、D项，根据My mom loves reading newspapers（我妈妈喜欢看报纸）可知，此处指分享一些\n有趣的事情，因此选something interesting。\n故选：C。"
  },
  {
    "id": "xdf-3677162990017b57",
    "type": "choice",
    "text": "Look at the people on the beach. Some are walking, ________ are ________.\nA. others; laying\nB. others; lying\nC. the others; lying\nD. other; laying",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 10,
        "page": 2
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 6,
        "page": 1
      },
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：看看海滩上的人。有些人在走路，有些人在躺着。\n考查代词和动词辨析。others其他人；the others指两部分中的另一部分；other其他的，后面跟名\n词。根据“Look at the people on the beach.”可知，此处指其余的一部分，“some…others…”意为“一\n些……另一些……”。lie平躺；lay放置。根据“Some are walking”可知，是指有些人在走路，有些人\n在躺着，lie的现在分词为lying，故选B。"
  },
  {
    "id": "xdf-0a6b8bad1f996eb3",
    "type": "choice",
    "text": "—Mary, did you go ________ last summer vacation?\n—Yes. I went to Hangzhou.\nA. wonderful anywhere\nB. anywhere wonderful\nC. somewhere wonderful\nD. wonderful somewhere",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 12,
        "page": 2
      },
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——玛丽，你去年暑假去了什么好地方吗？——是的。我去了杭州。\n考查不定副词和定语后置。somewhere某地，用于肯定句中；anywhere某地，用于否定或疑问句\n中。wonderful“美好的”，作定语修饰不定副词，要后置，故排除A、D；设空所在句是一般疑问句，\n所以用anywhere。故选B。"
  },
  {
    "id": "xdf-514c3a78a7ac2707",
    "type": "choice",
    "text": "All it needs ________ a lot of help and ________.（ ）\nA. is；support\nB. is；supportive\nC. are；support\nD. is；supporting",
    "answer": "A",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 20,
        "page": 4
      },
      {
        "file": "错题_15_20260922_215535.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "is是，主语为三单；are是，主语为第二人称或复数；support支持，名词；supportive支持的；\nsupporting支持，动词现在分词或动名词。分析句子结构可知，句子真正的主语为All，为第三人称单\n数，故谓语动词用is；and连接并列成分，help是名词，此处也用名词support。\n故选：A。"
  },
  {
    "id": "xdf-7236177f69e3197a",
    "type": "choice",
    "text": "If you ________ at the next station, you should get ready in advance.\nA. get on\nB. get up\nC. get off\nD. get back",
    "answer": "C",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 24,
        "page": 4
      },
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "考查动词短语辨析。句意为：如果你在下一站________，你应该提前准备好。get on上车；get up起\n床；get off下车；get back回来。根据常识可知如果在下一站下车的话应提前做好准备，故选C。"
  },
  {
    "id": "xdf-94006928acdcbe61",
    "type": "choice",
    "text": "The children are Father Christmas next year.\nA. looking forward to seeing\nB. look forward to see\nC. looking forward to see\nD. look forward to seeing",
    "answer": "A",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 27,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "本题考查现在进行时和词组look forward to doing\n题干中，有are，需接动词的ing形式，排除B,D选项\n根据look forward to doing这个词组，排除C选项"
  },
  {
    "id": "xdf-27d695deb8a7a767",
    "type": "choice",
    "text": "After class, the students left the classroom________.\nA. little by little\nB. side by side\nC. step by step\nD. one by one",
    "answer": "D",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 34,
        "page": 6
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 9,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：下课后，学生们一个接一个地离开了教室。\n考查副词短语。little by little渐渐地；side by side肩并肩地；step by step一步步地；one by one一\n个接一个地。根据“After class, the students left the classroom”可知，此处描述的是学生离开教室的\n方式。one by one表示依次、逐个离开，符合学生下课离场的实际情况。故选D。"
  },
  {
    "id": "xdf-9b640d2fb2a00ee2",
    "type": "choice",
    "text": "There were good times .\nA. around the corner\nB. at corner\nC. cut the corner\nD. turn the corner",
    "answer": "A",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 35,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "本题考查名词相关的介词搭配。\n①句意分析。“好时光很快就会来临”。\n②词义判断。\"around the corner\"意思为在附近，接近，附近；\"at corner\"意思为在角落；\"cut the\ncorner\"意思为走捷径；\"turn the corner\"意思为转危为安，脱离危险。\n③解题要点。根据句意理解，好日子很快就会来临，好日子就在附近。所以用around the corner。\n因此本题答案为A。"
  },
  {
    "id": "xdf-ac1e4f64fcf3653a",
    "type": "choice",
    "text": "The hole is ________. Be careful not to fall into it.\nA. two metres long\nB. two metres deep\nC. two–metre long\nD. two–metre deep",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 36,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "句意：这个洞有两米深。小心不要掉进去。\n考查深度、高度等表达。根据“Be careful not to fall into it.”可知，此处表示深度用deep，排除A和C\n选项；英语中长度宽度等的表示方法为“基数词+单位词+形容词”，基数词超过1的，后单位词需要用复\n数形式，所以B选项正确；D选项三个单词之前都需要连字符，且只能放在名词前作定语。故选B。"
  },
  {
    "id": "xdf-b27284925610ce7c",
    "type": "choice",
    "text": "The coach patted each player ________ shoulder as they came off the field, proud of their\neffort.\nA. on the\nB. in the\nC. on their\nD. in their",
    "answer": "A",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 37,
        "page": 7
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 6,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：球员们离场时，教练拍了拍每个人的肩膀，为他们的努力感到骄傲。\n考查动词短语。由“patted each player”可知，此句指拍肩膀，表示“拍打某人的身体部位”时，需\n用“pat sb on the+身体部位”的固定结构。故选A。"
  },
  {
    "id": "xdf-e73116d4b493a601",
    "type": "choice",
    "text": "The police have warned the citizens ________ in the polluted river.\nA. not bathing\nB. not to bath\nC. to not bathe\nD. not to bathe",
    "answer": "D",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 38,
        "page": 7
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 5,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：警方已警告市民不要在污染的河里游泳。\n考查动词辨析和非谓语动词。根据“The police have warned the citizens ... in the polluted river.”可\n知此处表示“警告不要做某事”，用“warn sb. not to do sth.”。bath给……洗澡；bathe游泳，结合语\n境，这里指警告市民不要在污染的河里游泳，故选D。"
  },
  {
    "id": "xdf-14fbb0251141196a",
    "type": "reading",
    "text": "Iceland lies in the North Atlantic Ocean. It lies between 63°24’ and 66°33’ N and\nbetween 13°30’ and 24°2’ W. It is the second largest island in Europe. It is close to the Arctic\nCircle (北极圈) yet in fact only one of its northerly islands lies inside. The country has a total area\nof 103,000 square kilometers and a coastline of about 6,600 km. The island is 300 km wide from\nnorth to south, and 500 km across from west to east.\nFrom 1262 to 1944 Iceland was ruled first by Norway and then by Denmark. Centuries of\nforeign rule, and such things as volcanoes (火山) and the weather, made life very difficult at\ntimes for the Icelanders, there was lots of hard work and little change. The situation began to\nimprove during the nineteenth century. Then in 1944 Iceland became an independent republic\n(独立国家); since that time it has become a quite rich country where the people enjoy having\ncars, modern houses and lots of electrical equipment. If you look at the kind of products that\nIceland sells to other countries today—fish, meat, wool and so on—it’s easy to see that both the\nsea and the land are important to Icelanders. This has been true in fact since the time of the first\nIcelanders—Vikings from Norway who arrived in AD 874.\nSome things in the lives of the Icelanders have hardly changed—the Icelandic language, for\nexample, 700 years ago the stories called Sagas were first written down, these can still be read\nin the old language without much difficulty by Icelandic speakers today.\n(1)单选题 What is the purpose of the passage?\nA. To invite people to come and visit Iceland.\nB. To introduce something about Iceland.\nC. To show the culture of Iceland.\nD. To show the long history of Iceland.\n(2)单选题 What’s the main idea of Paragraph 2?\nA. There’re great changes in Icelanders’ living conditions.\nB. Icelanders sell different kinds of local products abroad.\nC. The living conditions in Iceland are unsuitable for people to live.\nD. The Icelanders work hard to sell their products.\n(3)单选题 Which of the following sentences is NOT true?\nA. Iceland is not the largest island in the world.\nB. Iceland is a country of many small islands.\nC. Iceland is quite a modern country now.\nD. Iceland has been an independent republic since Vikings began to live there.\n(4)单选题 What can we infer (推断) from the passage?\nA. It is the second largest island in Europe.\nB. Great changes have taken place in Iceland since the nineteenth century.\nC. The Icelandic language changed a lot over the years.\nD. The sea and the land are important to Icelanders.\n(5)单选题 In what type of book we can read the passage?\nA. Novel.\nB. Science.\nC. History.\nD. Travel.",
    "answer": "(1) B (2) A (3) D (4) B (5) D",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 39,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 推理判断题。通读全文后，可知该文章介绍了冰岛，包括其地理位置、历史、经济和文\n化，所以文章就是想要向人们介绍一些有关冰岛的事情。故选B。\n【小题2】 段落大意题。根据第二段中“Centuries of foreign rule, and such things as volcanoes\n(火山) and the weather, made life very difficult at times for the Icelanders, there was\nlots of hard work and little change. The situation began to improve during the\nnineteenth century.”及通读第二段可知，几个世纪的外国统治，以及火山和天气等，使\n得冰岛人的生活有时变得非常困难，而这种情况在19世纪期间开始好转，1944年冰岛成为\n一个独立共和国，从那时起，冰岛已成为了一个相当富裕的国家，人们喜欢拥有汽车、现\n代房屋等，所以第二段主要讲述了冰岛人的生活条件发生了巨大的变化。故选A。\n【小题3】 细节理解题。根据“Then in 1944 Iceland became an independent republic (独立国\n家)”和“Vikings from Norway who arrived in AD 874”可知，维京人在公元874到达冰\n岛，那时的冰岛还不是一个独立共和国。故选D。\n【小题4】 推理判断题。根据“Centuries of foreign rule, and such things as volcanoes (火山) and\nthe weather, made life very difficult at times for the Icelanders, there was lots of\nhard work and little change. The situation began to improve during the nineteenth\ncentury.”可知，在19世纪前冰岛人的生活非常艰难，但在19世纪期间情况有所改善，由此\n可推测，自从19世纪那时开始，冰岛发生了巨大的变化。故选B。\n【小题5】 推理判断题。通读全文，可知本文向人们介绍了冰岛，由此可推测，可以在关于旅行的书\n中看到这篇介绍冰岛的文章。故选D。"
  },
  {
    "id": "xdf-78a8f2088857a2a5",
    "type": "choice",
    "text": "Mr Smith can't attend the meeting because he has ____to do．（ ）\nA. nothing urgent\nB. anything urgent\nC. something urgent\nD. urgent something",
    "answer": "C",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 40,
        "page": 8
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "根据Mr Smith can't attend the meeting because he has ____to do，可知史米斯先生不能参加会\n议，因为他有急事要做．这是一个肯定句，应该用something，同时当形容词修饰不定代词的时候，\n要放在后面．\n故选：C。"
  },
  {
    "id": "xdf-9e548ecee7e86add",
    "type": "choice",
    "text": "—Why do scientists study wetlands carefully?\n—Because they are ________ for protecting biodiversity.\nA. useless\nB. vital\nC. boring\nD. common",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 41,
        "page": 9
      },
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——为什么科学家们仔细研究湿地？——因为它们对保护生物多样性至关重要。\n考查形容词辨析。useless无用的；vital至关重要的；boring无聊的；common普通的。根据问\n句“Why do scientists study wetlands carefully?”及常识可知，湿地对于保护生物多样性非常重要，\n所以科学家才会仔细研究。故选B。"
  },
  {
    "id": "xdf-ab7f843f31fbe681",
    "type": "choice",
    "text": "Mistakes due to carelessness may have serious consequences.\nA. useful\nB. significant\nC. critical\nD. important",
    "answer": "C",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 42,
        "page": 9
      }
    ],
    "review": "pending",
    "explanation": "本题考查形容词辨析。\n解题步骤：\n1. 句意分析。\"造成的错误有可能带来严重的后果。\"\n2. 选项对比。A．useful 有用的；B．significant 重要的；C．critical 危险的，严重的；D．\nimportant 重要的。题干划线单词 serious 含义为严重的。\n因此本题正确答案选择C。"
  },
  {
    "id": "xdf-a50061cc6cf582ea",
    "type": "choice",
    "text": "________, we must get to school on time.\nA. More importantly\nB. Important\nC. More important\nD. Importantly",
    "answer": "A",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 43,
        "page": 9
      },
      {
        "file": "错题_18_20260922_215551.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：更重要的是，我们必须准时到达学校。\n考查副词。A. More importantly副词比较级，更重要的；B. Important形容词，重要的；C. More\nimportant形容词的比较级，更重要的；D. Importantly副词，重要的。根据句意可知，空处的词是修\n饰整个句子，是评论副词，用来对句中陈述的观点进行评论。More importantly就是其中的一个。故\n选A。"
  },
  {
    "id": "xdf-ef8a5fa85f627033",
    "type": "cloze",
    "text": "It’s 2035. There are three robots in my family—Cina, Tim and Ricci. I like them a\nlot.\nCina is my good helper. She is about forty centimeters tall. Her eyes are two\ncameras and her feet two wheels (轮子). She does some cleaning at home.\nhouse is clean because of her.\nTim is a smart robot. He can help us information. What’s more, he can speak\nChinese and English . Dad loves him. Every morning, Tim hello to my dad.\nDad asks him, “What's the weather like today, Tim?” Tim will connect to the Internet and find the\nweather report soon. This morning, Tim tells Dad, “It will rain today, Mr. Hastings. Please bring an\numbrella with you.” Does Dad take umbrella? Yes, of course.\nWhat about robot? What does Ricci do in my family? He is not tall\nshort. He plays with me. Ricci is good at chess. He always wins. He can also dance\nand play ping–pong with me. With his help, I become smart and strong.\n( ) (1) A. mum’s and B. mum and C. mum’s and\ndad’s dad’s dad\n( ) (2) A. are B. is C. am\n( ) (3) A. We B. Our C. Ourselves\n( ) (4) A. get B. getting C. gets\n( ) (5) A. good B. better C. well\n( ) (6) A. said B. say C. says\n( ) (7) A. the B. an C. a\n( ) (8) A. other B. others C. another\n( ) (9) A. and B. or C. so\n( ) (10) A. to play B. play C. playing",
    "answer": "(1) B (2) A (3) B (4) A (5) C (6) C (7) B (8) C (9) B (10)C",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 49,
        "page": 10
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：Cina是我爸爸妈妈的好帮手。\nmum’s and dad’s 表示妈妈和爸爸各自拥有的，其后接复数名词；mum and dad’s 表示妈\n妈和爸爸共同拥有的，其后接单数名词；mum’s and dad 表达错误。由“good helper”可\n知，此处指的是爸爸妈妈共同的好帮手，应用mum and dad’s。故选B。\n【小题2】 句意：她的眼睛是两个摄像头，她的脚是两个轮子。\nare是，主语为复数或第二人称；is是，主语为第三人称单数；am是，主语为第一人称单\n数。由“her feet”可知，主语为复数，be动词应用are。故选A。\n【小题3】 句意：因为有了她，我们的房子很干净。\nWe我们，主格；Our我们的，形容词性物主代词；Ourselves我们自己，反身代词。\n由“house”可知，此处应用形容词性物主代词our修饰名词house。故选B。\n【小题4】 句意：他可以帮助我们获取信息。\nget动词原形；getting动名词或现在分词；gets动词第三人称单数形式。由“help us”可\n知，help sb. do sth.“帮助某人做某事”，固定短语，因此此处应用动词原形get。故选A。\n【小题5】 句意：更重要的是，他汉语和英语说得很好。\ngood好的，形容词；better更好的，形容词比较级；well好地，副词。由“speak Chinese\nand English”可知，此处应用副词well修饰动词speak。故选C。\n【小题6】 句意：每天早上，Tim都跟我爸爸打招呼。\nsaid动词过去式；say动词原形；says动词第三人称单数形式。由“Every morning”可知，\n句子时态为一般现在时，主语Tim为第三人称单数，谓语动词应用第三人称单数形式\nsays。故选C。\n【小题7】 句意：爸爸带伞了吗？\nthe定冠词，表示特指；an不定冠词，表示泛指，用于元音音素开头的单词前；a不定冠\n词，表示泛指，用于辅音音素开头的单词前。由“umbrella”可知，此处表示泛指，\numbrella为元音音素开头，应用不定冠词an。故选B。\n【小题8】 句意：另一个机器人呢？\nother其他的，后接复数名词；others其他人或物；another另一个（三者或以上），后接\n单数名词。由“robot”可知，此处应用another表示三者或三者以上的另一个。故选C。\n【小题9】 句意：他不高也不矮。\nand和；or或者；so所以。由“not tall…short”可知，此处应用or表示“或者”，用于否定句\n中连接两个并列成分。故选B。\n【小题10】句意：Ricci擅长下棋。\nto play动词不定式；play动词原形；playing动名词或现在分词。由“at”可知，be good at\ndoing sth.“擅长做某事”，固定短语，因此此处应用动名词playing。故选C。"
  },
  {
    "id": "xdf-957c048edef15b60",
    "type": "choice",
    "text": "判断下列句子空格处是谓语还是非谓语。\nThey went to the park, ____ . (sing and talk)\nA. 谓语\nB. 非谓语",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 52,
        "page": 11
      }
    ],
    "review": "pending",
    "explanation": "本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据谓语数量\n（went）= 连词数量(本题无连词) + 1，可判断本题谓语数应为 1 个，故空格处应为非谓语。\n所以答案为 B"
  },
  {
    "id": "xdf-ce60dfca0699ee10",
    "type": "reading",
    "text": "单选选择\n(1)单选题 在短语：prefer A ____ B中，空格所填介词为：\nA. to\nB. in\nC. for\n(2)单选题 在短语：prefer doing to ____ (do), 空格所需非谓语形式为：\nA. doing\nB. do\nC. done\n(3)单选题 在短语：prefer to do rather than ____ (do), 空格所需非谓语形式为：\nA. doing\nB. do\nC. to do",
    "answer": "(1) A (2) A (3) B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 53,
        "page": 11
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-07e056bb347fc27d",
    "type": "choice",
    "text": "第六讲\n【Section 1 语法专题查缺补漏——非谓语动词】\n非谓语易错题精讲精练\n7. __________ the course very difficult, she decided to move to a lower level.\nA. Find\nB. Finding\nC. To find\nD. Found",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 54,
        "page": 12
      },
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "7. 考察非谓语。B【解析】现在分词做伴随状语，表示主动和进行。"
  },
  {
    "id": "xdf-5366007c9539e7b6",
    "type": "reading",
    "text": "判断下列句中划线部分是否为非谓语。\n(1)单选题 The present situation is [[u]]inspiring[[/u]].\nA. 是\nB. 否\n(2)单选题 He kept the car [[u]]waiting[[/u]] at the gate.\nA. 是\nB. 否\n(3)单选题 [[u]]Being[[/u]] a League member, he is always helping others.\nA. 是\nB. 否\n(4)单选题 He [[u]]dropped[[/u]] the glass.\nA. 是\nB. 否\n(5)单选题 判断以下句子中划线部分是谓语动词还是非谓语动词。\n[[u]]Keep[[/u]] practicing reading English regularly, and your reading skills will be improved\nquickly.\nA. 谓语\nB. 非谓语\n(6)单选题 判断下列句子空格处是谓语还是非谓语。\n____ (keep) practicing reading English regularly.\nA. 谓语\nB. 非谓语\n(7)单选题 The spider man always ____ (do) his job to save the world.\nA. 谓语\nB. 非谓语\n(8)单选题 Your reading skills will be improved quickly ____ (follow) these steps.\nA. 谓语\nB. 非谓语\n(9)单选题 ____ (finish）the work in ten minutes is very hard.\nA. 谓语\nB. 非谓语",
    "answer": "(1) A (2) A (3) A (4) B (5) A (6) A (7) A (8) B (9) B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 55,
        "page": 12
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 本题考查非谓语的使用语境。判断划线动词形式。根据题干 inspiring 可知，此为非谓\n语。\n故本题选 A\n【小题2】 本题考查非谓语的使用语境。判断划线动词形式。根据题干 waiting 可知，此为非谓语。\n故本题选 A\n【小题3】 本题考查非谓语的使用语境。判断划线动词形式。根据题干 Being 可知，此为非谓语。\n故本题选 A\n【小题4】 本题考查非谓语的使用语境。判断划线动词形式。根据题干 dropped 可知，此为谓语的\n一般过去时。\n故本题选 B\n【小题5】 无\n【小题6】 本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据\n谓语数量（本题无）= 连词数量（本题无连词）+ 1，可判断本题谓语数应为 1 个，而\npracticing reading 为非谓语，故空格处应为谓语。\n所以答案为 A\n【小题7】 本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据\n谓语数量（本题无）= 连词数量（本题无连词）+ 1，可判断本题谓语数应为 1 个，而 to\nsave 为非谓语，故空格处应为谓语。\n所以答案为 A\n【小题8】 本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据\n谓语数量（本题为 will be improved）= 连词数量（本题无连词）+ 1，可判断本题谓语数\n应为 1 个，故空格处应为非谓语。\n所以答案为 B\n【小题9】 本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据\n谓语数量（本题为 is）= 连词数量（本题无连词）+ 1，可判断本题谓语数应为 1 个，故\n空格处应为非谓语。\n所以答案为 B"
  },
  {
    "id": "xdf-7e55185ac3f42b0c",
    "type": "reading",
    "text": "判断划线词的用法\n(1)单选题 a swimming pool\nA. 作定语\nB. 作状语\n(2)单选题 a falling leaf\nA. 作定语\nB. 作状语\n(3)单选题 They haven't finished building the dam\nA. 作定语\nB. 作宾语",
    "answer": "(1) A (2) A (3) B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 56,
        "page": 13
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-e776c1aa86f87668",
    "type": "choice",
    "text": "判断下列划线部分非谓语属于主动还是被动\nWhen [[u]]completed[[/u]],the museum will soon be open to the public.\nA. 主动\nB. 被动",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 57,
        "page": 14
      }
    ],
    "review": "pending",
    "explanation": "本题考察非谓语的主被动关系\n①句意分析。竣工之后，这个博物馆将很快对公众开放。\n②主被动判断。when completed为时间状语从句的省略，主语“the museum”和非谓语“complete”为\n被动关系。\n故选B。"
  },
  {
    "id": "xdf-82f03daa62ec2d04",
    "type": "choice",
    "text": "判断下列划线部分非谓语属于主动还是被动\nHe raised his voice to make himself [[u]]heard[[/u]] more clearly.\nA. 主动\nB. 被动",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 58,
        "page": 14
      }
    ],
    "review": "pending",
    "explanation": "本题考察非谓语的主被动关系\n①句意分析。为了让他自己能被听得更清楚，他提高了他的音量。\n②主被动判断。在该句子中，划线部分的非谓语作宾语himself的补足语，和himself为被动关系。\n故选B。"
  },
  {
    "id": "xdf-717cb760e1a4a15a",
    "type": "choice",
    "text": "请判断下列句子中的非谓语形式是否正确。\nI haven't decided [[u]]when doing[[/u]] it.\nA. 正确\nB. 错误",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 59,
        "page": 14
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-9cddbbea17dd3f98",
    "type": "choice",
    "text": "判断下列结构否为非谓语。\nis speaking\nA. 是\nB. 否",
    "answer": "B",
    "sources": [
      {
        "file": "错题_13_20260922_215522.pdf",
        "number": 60,
        "page": 14
      },
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-60f4495da620c47b",
    "type": "choice",
    "text": "I'm going to buy 1 for my mother at the Spring Festival.\nA. private something\nB. something private\nC. anything private\nD. private anything",
    "answer": "B",
    "sources": [
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "考查不定代词辨析题。不定代词有形容词等修饰作定语时，该定语需后置，可排除AD选项。something\n用于肯定句，anything用于疑问句和否定句；根据句意和语境，可知选B。\n【句意】我打算在春节给妈妈买点私房菜。"
  },
  {
    "id": "xdf-d72358d2ab3026a5",
    "type": "choice",
    "text": "I bought two pens last week, ________ writes easily.\nA. both of which\nB. neither of which\nC. both of them\nD. neither of them",
    "answer": "B",
    "sources": [
      {
        "file": "错题_14_20260922_215528.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：上周我买了两支钢笔，两支都不好写。\n考查非限制性定语从句。分析句子可知，本句是非限制性定语从句，先行词pens指物，故应用关系代词\nwhich引导，排除C和D；根据“writes easily”可知，此处应用代词neither，表示“两者都不”。故\n选B。"
  },
  {
    "id": "xdf-3bad1815063a846a",
    "type": "choice",
    "text": "The children are 1 Father Christmas next year.\nA. looking forward to seeing\nB. look forward to see\nC. looking forward to see\nD. look forward to seeing",
    "answer": "A",
    "sources": [
      {
        "file": "错题_16_20260922_215540.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考查现在进行时和词组look forward to doing\n题干中，有are，需接动词的ing形式，排除B,D选项\n根据look forward to doing这个词组，排除C选项"
  },
  {
    "id": "xdf-4cf2def40f7043dd",
    "type": "choice",
    "text": "Mistakes due to carelessness may have serious consequences. 1\nA. useful\nB. significant\nC. critical\nD. important",
    "answer": "C",
    "sources": [
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考查形容词辨析。\n解题步骤：\n1. 句意分析。\"造成的错误有可能带来严重的后果。\"\n2. 选项对比。A．useful 有用的；B．significant 重要的；C．critical 危险的，严重的；D．\nimportant 重要的。题干划线单词 serious 含义为严重的。\n因此本题正确答案选择C。"
  },
  {
    "id": "xdf-9db4a3b780495805",
    "type": "reading",
    "text": "Iceland lies in the North Atlantic Ocean. It lies between 63°24’ and\n66°33’ N and between 13°30’ and 24°2’ W. It is the second largest island in Europe.\nIt is close to the Arctic Circle (北极圈) yet in fact only one of its northerly islands\nlies inside. The country has a total area of 103,000 square kilometers and a coastline of\nabout 6,600 km. The island is 300 km wide from north to south, and 500 km across from west\nto east.\nFrom 1262 to 1944 Iceland was ruled first by Norway and then by Denmark. Centuries of\nforeign rule, and such things as volcanoes ( 火 山 ) and the weather, made life very\ndifficult at times for the Icelanders, there was lots of hard work and little change. The\nsituation began to improve during the nineteenth century. Then in 1944 Iceland became an\nindependent republic (独立国家); since that time it has become a quite rich country where\nthe people enjoy having cars, modern houses and lots of electrical equipment. If you look\nat the kind of products that Iceland sells to other countries today—fish, meat, wool and\nso on—it’s easy to see that both the sea and the land are important to Icelanders. This\nhas been true in fact since the time of the first Icelanders—Vikings from Norway who\narrived in AD 874.\nSome things in the lives of the Icelanders have hardly changed—the Icelandic\nlanguage, for example, 700 years ago the stories called Sagas were first written down,\nthese can still be read in the old language without much difficulty by Icelandic speakers\ntoday.\n1.单选题\nWhat is the purpose of the passage?\nA. To invite people to come and visit Iceland.\nB. To introduce something about Iceland.\nC. To show the culture of Iceland.\nD. To show the long history of Iceland.\n2.单选题\nWhat’s the main idea of Paragraph 2?\nA. There’re great changes in Icelanders’ living conditions.\nB. Icelanders sell different kinds of local products abroad.\nC. The living conditions in Iceland are unsuitable for people to live.\nD. The Icelanders work hard to sell their products.\n3.单选题\nWhich of the following sentences is NOT true?\nA. Iceland is not the largest island in the world.\nB. Iceland is a country of many small islands.\nC. Iceland is quite a modern country now.\nD. Iceland has been an independent republic since Vikings began to live there.\n4.单选题\nWhat can we infer (推断) from the passage?\nA. It is the second largest island in Europe.\nB. Great changes have taken place in Iceland since the nineteenth century.\nC. The Icelandic language changed a lot over the years.\nD. The sea and the land are important to Icelanders.\n5.单选题\nIn what type of book we can read the passage?\nA. Novel.\nB. Science.\nC. History.\nD. Travel.",
    "answer": "(1) B (2) A (3) D (4) B (5) D",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_17_20260922_215546.pdf","number":4,"page":1,"sha256":"04453365dc65ae79b4cd50ba4d982fa37296c3aecc294148d08acc17fe19bad1"},
    "sources": [
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n推理判断题。通读全文后，可知该文章介绍了冰岛，包括其地理位置、历史、经济和文化，\n所以文章就是想要向人们介绍一些有关冰岛的事情。故选B。\n\n第 2 小题：\n段落大意题。根据第二段中“Centuries of foreign rule, and such things as volcanoes\n(火山) and the weather, made life very difficult at times for the Icelanders,\nthere was lots of hard work and little change. The situation began to improve\nduring the nineteenth century.”及通读第二段可知，几个世纪的外国统治，以及火山和\n天气等，使得冰岛人的生活有时变得非常困难，而这种情况在19世纪期间开始好转，1944年\n冰岛成为一个独立共和国，从那时起，冰岛已成为了一个相当富裕的国家，人们喜欢拥有汽\n车、现代房屋等，所以第二段主要讲述了冰岛人的生活条件发生了巨大的变化。故选A。\n3. D\n答案：\n解析：细节理解题。根据“Then in 1944 Iceland became an independent republic (独立国\n家)”和“Vikings from Norway who arrived in AD 874”可知，维京人在公元874到达冰\n岛，那时的冰岛还不是一个独立共和国。故选D。\n\n第 4 小题：\n推理判断题。根据“Centuries of foreign rule, and such things as volcanoes (火山)\nand the weather, made life very difficult at times for the Icelanders, there was\nlots of hard work and little change. The situation began to improve during the\nnineteenth century.”可知，在19世纪前冰岛人的生活非常艰难，但在19世纪期间情况有所\n改善，由此可推测，自从19世纪那时开始，冰岛发生了巨大的变化。故选B。\n\n第 5 小题：\n推理判断题。通读全文，可知本文向人们介绍了冰岛，由此可推测，可以在关于旅行的书中\n看到这篇介绍冰岛的文章。故选D。"
  },
  {
    "id": "xdf-22472ae3c267fd67",
    "type": "choice",
    "text": "The hole is ________. Be careful not to fall into it.\nA. two metres long\nB. two metres deep\nC. two-metre long\nD. two-metre deep",
    "answer": "B",
    "sources": [
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：这个洞有两米深。小心不要掉进去。\n考查深度、高度等表达。根据“Be careful not to fall into it.”可知，此处表示深度用deep，排\n除A和C选项；英语中长度宽度等的表示方法为“基数词+单位词+形容词”，基数词超过1的，后单位词\n需要用复数形式，所以B选项正确；D选项三个单词之前都需要连字符，且只能放在名词前作定语。故选\nB。"
  },
  {
    "id": "xdf-e803590c223fa498",
    "type": "choice",
    "text": "There were good times 1 .\nA. around the corner\nB. at corner\nC. cut the corner\nD. turn the corner",
    "answer": "A",
    "sources": [
      {
        "file": "错题_17_20260922_215546.pdf",
        "number": 8,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本题考查名词相关的介词搭配。\n①句意分析。“好时光很快就会来临”。\n②词义判断。\"around the corner\"意思为在附近，接近，附近；\"at corner\"意思为在角落；\"cut the\ncorner\"意思为走捷径；\"turn the corner\"意思为转危为安，脱离危险。\n③解题要点。根据句意理解，好日子很快就会来临，好日子就在附近。所以用around the corner。\n因此本题答案为A。"
  },
  {
    "id": "xdf-c50a88a18b14a5ed",
    "type": "choice",
    "text": "请判断下列句子中的非谓语形式是否正确。\n1\nI haven't decided [[u]]when doing[[/u]] it.\nA. 正确\nB. 错误",
    "answer": "B",
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-a8bc15510b37afbe",
    "type": "choice",
    "text": "判断下列划线部分非谓语属于主动还是被动\n1\nHe raised his voice to make himself [[u]]heard[[/u]] more clearly.\nA. 主动\nB. 被动",
    "answer": "B",
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考察非谓语的主被动关系\n①句意分析。为了让他自己能被听得更清楚，他提高了他的音量。\n②主被动判断。在该句子中，划线部分的非谓语作宾语himself的补足语，和himself为被动关系。\n故选B。"
  },
  {
    "id": "xdf-c90580efa2ea71e4",
    "type": "choice",
    "text": "判断下列划线部分非谓语属于主动还是被动\nWhen [[u]]completed[[/u]],the museum will soon be open to the public. 1\nA. 主动\nB. 被动",
    "answer": "B",
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本题考察非谓语的主被动关系\n①句意分析。竣工之后，这个博物馆将很快对公众开放。\n②主被动判断。when completed为时间状语从句的省略，主语“the museum”和非谓语“complete”为\n被动关系。\n故选B。"
  },
  {
    "id": "xdf-34b229509c9a7033",
    "type": "reading",
    "text": "判断划线词的用法\n1.单选题\na swimming pool 1\nA. 作定语\nB. 作状语\n2.单选题\na falling leaf 1\nA. 作定语\nB. 作状语\n3.单选题\nThey haven't finished building the dam 1\nA. 作定语\nB. 作宾语",
    "answer": "(1) A (2) A (3) B",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_19_20260922_215557.pdf","number":5,"page":1,"sha256":"d39ff263935ac877c69af6d6c2d660f3c61b828d1d101a68705caa9afa9bcdc9"},
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-1642f7431764bee5",
    "type": "reading",
    "text": "判断下列句中划线部分是否为非谓语。\n1.单选题\nThe present situation is [[u]]inspiring[[/u]]. 1\nA. 是\nB. 否\n2 单选题\n2.单选题\nHe kept the car [[u]]waiting[[/u]] at the gate. 1\nA. 是\nB. 否\n3.单选题\n[[u]]Being[[/u]] a League member, he is always helping others. 1\nA. 是\nB. 否\n4.单选题\nHe [[u]]dropped[[/u]] the glass. 1\nA. 是\nB. 否\n5.单选题\n判断以下句子中划线部分是谓语动词还是非谓语动词。\n[[u]]Keep[[/u]] practicing reading English regularly, and your reading skills will be improved\nquickly. 1\nA. 谓语\nB. 非谓语\n6.单选题\n判断下列句子空格处是谓语还是非谓语。\n1 ____ (keep) practicing reading English regularly.\nA. 谓语\nB. 非谓语\n7.单选题\nThe spider man always 1 ____ (do) his job to save the world.\nA. 谓语\nB. 非谓语\n8.单选题\nYour reading skills will be improved quickly 1 ____ (follow) these steps.\nA. 谓语\nB. 非谓语\n9.单选题\n1 ____ (finish）the work in ten minutes is very hard.\nA. 谓语\nB. 非谓语",
    "answer": "(1) A (2) A (3) A (4) B (5) A (6) A (7) A (8) B (9) B",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_19_20260922_215557.pdf","page":6,"sha256":"d39ff263935ac877c69af6d6c2d660f3c61b828d1d101a68705caa9afa9bcdc9"},
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n本题考查非谓语的使用语境。判断划线动词形式。根据题干 inspiring 可知，此为非谓语。\n故本题选 A\n\n第 2 小题：\n本题考查非谓语的使用语境。判断划线动词形式。根据题干 waiting 可知，此为非谓语。\n故本题选 A\n\n第 3 小题：\n本题考查非谓语的使用语境。判断划线动词形式。根据题干 Being 可知，此为非谓语。\n故本题选 A\n\n第 4 小题：\n本题考查非谓语的使用语境。判断划线动词形式。根据题干 dropped 可知，此为谓语的一般\n过去时。\n故本题选 B\n\n第 6 小题：\n本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据谓\n语数量（本题无）= 连词数量（本题无连词）+ 1，可判断本题谓语数应为 1 个，而\npracticing reading 为非谓语，故空格处应为谓语。\n所以答案为 A\n\n第 7 小题：\n本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据谓\n语数量（本题无）= 连词数量（本题无连词）+ 1，可判断本题谓语数应为 1 个，而 to\nsave 为非谓语，故空格处应为谓语。\n所以答案为 A\n\n第 8 小题：\n本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据谓\n语数量（本题为 will be improved）= 连词数量（本题无连词）+ 1，可判断本题谓语数应\n为 1 个，故空格处应为非谓语。\n所以答案为 B\n\n第 9 小题：\n本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据谓\n语数量（本题为 is）= 连词数量（本题无连词）+ 1，可判断本题谓语数应为 1 个，故空格\n处应为非谓语。\n所以答案为 B"
  },
  {
    "id": "xdf-5a7a5af879a2aa0f",
    "type": "reading",
    "text": "单选选择\n1.单选题\n1\n在短语：prefer A ____ B中，空格所填介词为：\nA. to\nB. in\nC. for\n2.单选题\n在短语：prefer doing to 1 ____ (do), 空格所需非谓语形式为：\nA. doing\nB. do\nC. done\n3.单选题\n在短语：prefer to do rather than 1 ____ (do), 空格所需非谓语形式为：\nA. doing\nB. do\nC. to do",
    "answer": "(1) A (2) A (3) B",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_19_20260922_215557.pdf","page":7,"sha256":"d39ff263935ac877c69af6d6c2d660f3c61b828d1d101a68705caa9afa9bcdc9"},
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 8,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-2b854669faf1fd1f",
    "type": "choice",
    "text": "判断下列句子空格处是谓语还是非谓语。\n1\nThey went to the park, ____ . (sing and talk)\nA. 谓语\nB. 非谓语",
    "answer": "B",
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 9,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本题考查谓语与非谓语的辨析。判断谓语动词数量。需先找已知谓语动词和连词，再根据谓语数量\n（went）= 连词数量(本题无连词) + 1，可判断本题谓语数应为 1 个，故空格处应为非谓语。\n所以答案为 B"
  },
  {
    "id": "xdf-84a042688b4cca0a",
    "type": "cloze",
    "text": "It’s 2035. There are three robots in my family—Cina, Tim and Ricci. I like\nthem a lot.\nCina is my 1 good helper. She is about forty centimeters tall. Her eyes are two\ncameras and her feet 2 two wheels (轮子). She does some cleaning at home. 3\nhouse is clean because of her.\nTim is a smart robot. He can help us 4 information. What’s more, he can speak\nChinese and English 5 . Dad loves him. Every morning, Tim 6 hello to my dad. Dad\nasks him, “What's the weather like today, Tim?” Tim will connect to the Internet and\nfind the weather report soon. This morning, Tim tells Dad, “It will rain today, Mr.\nHastings. Please bring an umbrella with you.” Does Dad take 7 umbrella? Yes, of\ncourse.\nWhat about 8 robot? What does Ricci do in my family? He is not tall 9\nshort. He plays with me. Ricci is good at 10 chess. He always wins. He can also dance\nand play ping-pong with me. With his help, I become smart and strong.\n1. A. mum’s and da B. mum and dad’s C. mum’s and dad\nd’s\n2. A. are B. is C. am\n3. A. We B. Our C. Ourselves\n4. A. get B. getting C. gets\n5. A. good B. better C. well\n6. A. said B. say C. says\n7. A. the B. an C. a\n8. A. other B. others C. another\n9. A. and B. or C. so\n10. A. to play B. play C. playing",
    "answer": "1-5 BABAC 6-10 CBCBC",
    "sources": [
      {
        "file": "错题_19_20260922_215557.pdf",
        "number": 12,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "1.句意：Cina是我爸爸妈妈的好帮手。\nmum’s and dad’s 表示妈妈和爸爸各自拥有的，其后接复数名词；mum and dad’s 表示妈妈和爸爸\n共同拥有的，其后接单数名词；mum’s and dad 表达错误。由“good helper”可知，此处指的是爸爸\n妈妈共同的好帮手，应用mum and dad’s。故选B。\n2.句意：她的眼睛是两个摄像头，她的脚是两个轮子。\nare是，主语为复数或第二人称；is是，主语为第三人称单数；am是，主语为第一人称单数。由“her\nfeet”可知，主语为复数，be动词应用are。故选A。\n3.句意：因为有了她，我们的房子很干净。\nWe我们，主格；Our我们的，形容词性物主代词；Ourselves我们自己，反身代词。由“house”可知，\n此处应用形容词性物主代词our修饰名词house。故选B。\n4.句意：他可以帮助我们获取信息。\nget动词原形；getting动名词或现在分词；gets动词第三人称单数形式。由“help us”可知，help\nsb. do sth.“帮助某人做某事”，固定短语，因此此处应用动词原形get。故选A。\n5.句意：更重要的是，他汉语和英语说得很好。\ngood好的，形容词；better更好的，形容词比较级；well好地，副词。由“speak Chinese and\nEnglish”可知，此处应用副词well修饰动词speak。故选C。\n6.句意：每天早上，Tim都跟我爸爸打招呼。\nsaid动词过去式；say动词原形；says动词第三人称单数形式。由“Every morning”可知，句子时态为\n一般现在时，主语Tim为第三人称单数，谓语动词应用第三人称单数形式says。故选C。\n7.句意：爸爸带伞了吗？\nthe定冠词，表示特指；an不定冠词，表示泛指，用于元音音素开头的单词前；a不定冠词，表示泛指，\n用于辅音音素开头的单词前。由“umbrella”可知，此处表示泛指，umbrella为元音音素开头，应用不\n定冠词an。故选B。\n8.句意：另一个机器人呢？\nother其他的，后接复数名词；others其他人或物；another另一个（三者或以上），后接单数名词。\n由“robot”可知，此处应用another表示三者或三者以上的另一个。故选C。\n9.句意：他不高也不矮。\nand和；or或者；so所以。由“not tall…short”可知，此处应用or表示“或者”，用于否定句中连接\n两个并列成分。故选B。\n10.句意：Ricci擅长下棋。\nto play动词不定式；play动词原形；playing动名词或现在分词。由“at”可知，be good at doing\nsth.“擅长做某事”，固定短语，因此此处应用动名词playing。故选C。"
  },
  {
    "id": "xdf-2a6e9c56407cffe9",
    "type": "reading",
    "text": "It is an usual school day.During the lunch break，（1） ________ of the class are playing\noutside，but John stays in the classroom.He borrowed a book（2） ________ famous people in\nhistory for a project several weeks ago.The book was filled with interesting stories and there\nwere only three copies in the library，Last week，John met an old friend when he（3） ________ a\npicnic in a park.They chatted happily and poor John left the book somewhere on the grass.All the\nstudents must return the books in a month and it's time for John to give the book back\ntoday.\"What can I do？What can I say to Mrs.Lee …\"John keeps asking（4） ________ .\nIn fact，he has suffered（5） ________ worry for the whole morning.\nHe remembers his father's words， \"The only way to solve a problem is（6） ________ it.\" The\nlibrarian may be angry with him，（7） ________ John still decides to tell her the truth.\nWhen Mrs.Lee knows everything，she smiles and tells John he needs to find\n（8） ________ copy or pay for the book. \"You may mind（9） ________ so but I'm afraid you have\nto，because it can make you avoid the same mistake，\" says Mrs.Lee.\n\"I understand，Mrs.Lee.I will try to find one，\"John feels thankful.The librarian smiles\n（10） ________ than before， \"Thank you for your honesty，John.I'm proud of you.\"\nEven though it is hard，being honest is always the best choice.\n1.单选题\nA. two three\nB. two third\nC. two thirds\n2.单选题\nA. at\nB. on\nC. with\n3.单选题\nA. has\nB. had\nC. was having\n4.单选题\nA. him\nB. himself\nC. he\n5.单选题\nA. from\nB. for\nC. with\n6.单选题\nA. face\nB. to face\nC. to facing\n7.单选题\nA. so\nB. and\nC. but\n8.单选题\nA. another\nB. other\nC. the other\n9.单选题\nA. do\nB. to do\nC. doing\n10.单选题\nA. happily\nB. more happily\nC. most happily",
    "answer": "(1) C (2) B (3) C (4) B (5) A (6) B (7) C (8) A (9) C (10) B",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_20_20260922_215603.pdf","number":1,"page":1,"sha256":"22f642a01e6f6e90713558bcb4b108f2f231d3527d46f26edc751adf4bb49403"},
    "sources": [
      {
        "file": "错题_20_20260922_215603.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n考查数词。句意：午休时，全班三分之二人在外面玩，但约翰留在教室里。A.two three\n错误，不是分数表达；B.two third 错误，分母未用复数；C.two thirds 正确，三分之二的\n正确表达。分数的表达规则为：分子用基数词，分母用序数词，分子大于1时，分母加-\ns。\"三分之二\" 的正确表达为 \"two thirds\"。故选C。\n\n第 2 小题：\n考查介词。句意：几周前，他为了一个项目借了一本关于历史上著名人物的书。A.at 在某\n处；B.on 关于；C.with 和……一起。根据\"He borrowed a book......famous people in\nhistory for a project several weeks ago.\"（几个星期前，他为了一个项目借了一本书......\n历史上有名的人。）可知，此处表达\"关于\"历史上著名人物的书，on在此处表示 \"关于\n（某主题）\"，符合语境。故选B。\n\n第 3 小题：\n考查动词时态。句意：上周，约翰在公园野餐时遇到了一位老朋友。A.has 有，一般现在\n时；B.had 有，一般过去时；C.was having 正有，过去进行时。根据 \"Last week\" （上\n周）可知，事情发生在过去，且结合句意，此处表达 \"遇到老朋友\" 时 \"正在野餐\"，因而\n应用过去进行时（was/were + 现在分词），表示过去某一时刻或阶段正在进行的动作。\n故选C。\n\n第 4 小题：\n考查代词。句意：\"我能做什么？我该对李老师说什么……\" 约翰不停地问自己。A.him\n他，宾格；B.himself 他自己，反身代词；C.he 他，主格。根据语境，约翰在内心自问自\n答，应用反身代词 \"himself\" 表示 \"自己\"。故选B。\n\n第 5 小题：\n考查介词。句意：事实上，他整个上午都在担心。A.from 来自；B.for 为了；C.with\n和……一起。\"suffer from\" 为固定短语，意为 \"遭受（某种痛苦或困扰）\"，此处 \"suffer\nfrom worry\" 表示 \"受担忧困扰\"。故选A。\n\n第 6 小题：\n考查动词不定式。句意：解决问题的唯一方法是面对它。A.face 面对，动词原形；B.to\nface 面对，不定式；C.to facing 面对，to为介词，后加动名词。此处需用动词不定式作表\n语，不定式（to + 动词原形）可表示具体的、一次性的动作，符合语境。故选B。\n\n第 7 小题：\n考查连词。句意：图书管理员可能会生他的气，但约翰仍然决定告诉她真相。A.so 因此\n（因果）；B.and 并且（并列）；C.but 但是（转折）。前句 \"可能生气\" 与后句 \"决定说\n实话\" 为转折关系，用 \"but\" （但是）连接。故选C。\n\n第 8 小题：\n考查限定词。句意：当李老师知道一切后，她笑着告诉约翰，他需要再找一本或赔偿这本\n书。A.another 另一（三者及以上中的另一个）；B.other 其他的（后接复数名词）；\nC.the other 两者中的另一个。根据前文 \"there were only three copies\" （只有三份副\n本）可知图书馆有三本，约翰需再找 \"另一本\"（三者中的任意一本），\"another\" （另\n一）符合语境。故选A。\n\n第 9 小题：\n考查动名词。句意：\"你可能介意这样做，但恐怕你必须这样做，因为这能让你避免犯同\n样的错误，\" 李老师说。A.do 做，动词原形；B.to do 做，不定式；C.doing 做，动名\n词。\"mind doing sth.\" 为固定搭配，意为 \"介意做某事\"，此处用动名词 \"doing\" （做）作\n宾语。故选C。\n\n第 10 小题：\n考查副词比较级。句意：图书管理员笑得比之前更开心了：\"谢谢你的诚实，约翰。我为\n你骄傲。\"A.happily 开心地，原级；B.more happily 更开心地，比较级；C.most happily\n最开心地，最高级。根据 \"than before\" （比之前）可知需用比较级，\"more happily\"\n（更开心地）符合语境。故选B。"
  },
  {
    "id": "xdf-0fd909ee7a15612f",
    "type": "fill",
    "text": "A.misunderstanding B.lonely C.require D.silent E.survey F.situation\nTom and Jack were close friends and often played basketball together after school.One day，they\nhad a big fight over some silly things.Both felt hurt and decided to break up with each other.For\ndays，they were（1） 1 in class，not talking or even looking at each other.\nTom felt sad and（2） 2 without his friend.He missed the fun times they shared.Jack\nalso felt the same.He realized that turning his back on Tom did not solve their problem but only\nmade the（3） 3 worse.\nOne afternoon，Jack gathered his courage and walked up to Tom.\"Hey，Tom，\"he said\nsoftly.\"I am sorry for what happened.Can we talk？\"Tom was surprised but happy to see Jack.He\nnodded and they sat down under a tree in the school garden.\nJack explained how he felt and why he reacted that way.Tom listened carefully and then\n4\nshared his side of the story.They both understood that it was just a（4） .With open\nhearts，they apologized to each other and promised to be more patient and understanding in\nthe future.\nFrom that day on，Tom and Jack became even better friends.They learned that when\nproblems come，it is important to speak up and not to avoid each other.Strong friendships（5）\n5\nnot only communication but also listening.",
    "answer": "1 D 2 B 3 F 4 A 5 C",
    "sources": [
      {
        "file": "错题_20_20260922_215603.pdf",
        "number": 2,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "（1）考查形容词。句意：有几天，他们在课堂上很安静，不说话，甚至不看对方。根据not talking\nor even looking at each other（不说话，甚至不看对方）可知，他们在课堂上很安静，选项D\"安静\n的\"，符合题意。故选D。\n（2）考查形容词。句意：没有了朋友，汤姆感到悲伤和孤独。根据without his friend（没有了朋\n友）和Tom felt sad（汤姆感到悲伤）可知，没有了朋友，汤姆感到悲伤和孤独，选项B\"孤独的\"，\n符合题意。故选B。\n（3）考查名词。句意：他意识到，对汤姆置之不理并不能解决他们的问题，反而会使情况变得更\n糟。根据turning his back on Tom did not solve their problem（对汤姆置之不理并不能解决他们的\n问题）可知，会使情况变得更糟，选项F\"情况\"，符合题意。故选F。\n（4）考查名词。句意：他们都明白这只是一个误会。根据Jack explained how he felt and why he\nreacted that way.Tom listened carefully and then shared his side of the story.（杰克解释了他的感\n受以及他为什么做出那样的反应。汤姆仔细地听着，然后分享了他的故事。）可知，这是一个误\n会，选项A\"误会\"，符合题意。故选A。\n（5）考查动词。句意：牢固的友谊不仅需要沟通，还需要倾听。根据not only communication but\nalso listening.（不仅需要沟通，还需要倾听。）可知，需要沟通和倾听，选项C\"需要\"，符合题意。\n故选C。"
  },
  {
    "id": "xdf-bdb4876ffd5725ca",
    "type": "reading",
    "text": "Most people agree that honesty is a good thing.But does Mother Nature agree？\nAnimals can't talk，but can they lie with their bodies and behaviour？People who study animals\nmay not call it lying，but they do agree that many animals behave dishonestly to fool other\nanimals.Dishonesty often helps them survive （生存）.\nMany kinds of birds are very successful in fooling other animals.A bird called the plover\n（鸻） sometimes pretends （假装） to be hurt in order to protect its young.When an enemy\ngets close to its nest，the plover pretends to have a broken wing.The enemy follows the \"hurt\"\nadult，leaving the baby birds safe.\nAnother kind of bird，the scrub jay （灌丛鸦），buries （埋） its food so it always has\nsomething to eat.Scrub jays also steal food.They watch where others bury their food and steal\nit.But the clever scrub jays seem to know when others are watching them.So they get back later，\nunbury （挖掘） the food，and bury it again somewhere else.\n1.单选题\nAccording to the passage，do animals lie with their bodies and behaviour？ ________\nA. Yes，they do.\nB. No，they don't.\nC. Yes，they lie.\nD. Not mentioned.\n2.单选题\nWhy does the plover pretend to be hurt？ ________\nA. To protect its nest.\nB. To show its friendliness.\nC. To save its young.\nD. To catch the enemy.\n3.单选题\nWhat do clever scrub jays do with their food？ ________\nA. They bury the food deep.\nB. They bury the food twice.\nC. They watch the food.\nD. They eat up all the food.",
    "answer": "(1) A (2) C (3) B",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_20_20260922_215603.pdf","number":3,"page":2,"sha256":"22f642a01e6f6e90713558bcb4b108f2f231d3527d46f26edc751adf4bb49403"},
    "sources": [
      {
        "file": "错题_20_20260922_215603.pdf",
        "number": 3,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据第1段\"People who study animals may not call it lying，but they do\nagree that many animals behave dishonestly to fool other animals.\"（研究动物的人可\n能不会说这是撒谎，但他们确实同意许多动物的不诚实行为是为了愚弄其他动物。）因\n此，动物确实会通过它们的身体和行为来\"说谎\"。故选A。\n\n第 2 小题：\n细节理解题。根据第2段\"A bird called the plover （鸻） sometimes pretends （假装）\nto be hurt in order to protect its young.\"（一种叫鸻的鸟有时假装受伤以保护幼鸟。）可\n知，鸻鸟有时假装受伤是为了保护它的幼鸟。故选C。\n\n第 3 小题：\n推理判断题。根据第3段\"But the clever scrub jays seem to know when others are\nwatching them.So they get back later，unbury （挖掘） the food，and bury it again\nsomewhere else.\"（但聪明的灌丛鸦似乎知道别人在看它们。所以他们晚点回来，把食物\n挖出来，再把它埋在别的地方。）可知，这意味着它们实际上把食物埋了两次。故选B。"
  },
  {
    "id": "xdf-01c6d33e37501b2d",
    "type": "cloze",
    "text": "The zebra shark is now in danger of disappearing from Raja Ampat’s waters. It is\nlargely the result of overfishing, driven by demand for its meat and fins. By 2020, Raja Ampat’s\nzebra shark population had dropped to about 20. “ 1 a reintroduction programme, there\nare simply not enough zebra sharks left in Raja Ampat to recover on their own”, said Nesha\nIchida, an Indonesian marine scientist.\nReShark’s first project, called STAR, broke new ground (or water) in 2023. On a January day,\nNesha carefully supported a 15-week-old zebra shark named Charlie—the first zebra shark to be\n2 in the waters of Raja Ampat. “Everyone involved in the STAR project had been working\ntowards that moment for three years, so we were all incredibly proud,” says Nesha.\nReintroducing species to oceans is far more challenging than reintroducing them on land.\nNot only are reintroduced animals harder to track underwater, but threats to their existence are\nalso more 3 to manage. After all, reintroducing sharks is pointless if they are going to face\nthe danger that caused their original disappearance.\nAcross the world, sharks of all species are being killed faster than aquariums could ever\nreplace them. On top of this, sharks 4 relatively slowly, take many years to mature and\nproduce few young. This means efforts to protect wild sharks are critical. 5 , giving wild\nshark populations a helping hand through rewilding could prove hugely beneficial. Moving\nbeyond zebra sharks, the ReShark team is currently looking at other shark species and other\n6 — from angel sharks in the Canary Islands and off the coast of Wales, to nurse sharks in\nEast Africa.\n“The STAR project has opened the door to new possibilities,” says Erin Meyer, chairman of\nthe STAR project steering committee. “Considering nearly 400 species of sharks and rays are\nthreatened with extinction, the need to add ocean ‘resharking’ is clear and urgent.”\n1. A. By B. Without C. With D. Under\n2. A. caught B. cured C. released D. sold\n3. A. convenient B. dangerous C. important D. difficult\n4. A. grow B. escape C. swim D. eat\n5. A. Besides B. Luckily C. Nevertheless D. Actually\n6. A. animals B. locations C. threats D. projects",
    "answer": "1-5 BCDAC 6-6 B",
    "sources": [
      {
        "file": "错题_20_20260922_215603.pdf",
        "number": 4,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "1.句意：如果没有重新引入计划，拉贾安帕特剩下的斑马鲨根本无法自行恢复。\nBy通过；Without没有；With随着；Under在……之下。根据上文“By 2020, Raja Ampat’s zebra\nshark population had dropped to about 20.”可知，拉贾安帕特的斑马鲨数量已经很少了，所以此\n处是指如果没有重新引入计划，靠它们自己无法恢复种群数量，应用介词“without”。故选B。\n2.句意：1月的一天，内莎小心翼翼地将一只15周大的斑马鲨查理——第一只被放归拉贾安帕特水域\n的斑马鲨——放入水中。\ncaught捕捉；cured治愈；released释放，放走；sold出售。根据前文提到的重新引入计划以及 “in\nthe waters of Raja Ampat”可知，此处是指将斑马鲨放归到拉贾安帕特的水域中。故选C。\n3.句意：不仅重新引入的动物在水下更难追踪，而且对它们生存的威胁也更难控制。\nconvenient方便的；dangerous危险的；important重要的；difficult困难的。根据“Reintroducing\nspecies to oceans is far more challenging than reintroducing them on land.”可知，此处是指在\n海洋中重新引入物种更具挑战性，威胁也更难控制。故选D。\n4.句意：最重要的是，鲨鱼生长相对缓慢，需要很多年才能成熟，而且繁殖的幼鲨很少。\ngrow生长；escape逃脱；swim游泳；eat吃。根据下文“take many years to mature and produce\nfew young”可知，需要很多年才能成熟，很少生育后代，所以此处是指鲨鱼生长相对缓慢。故选\nA。\n5.句意：然而，通过重新放归野生来帮助野生鲨鱼种群可能是非常有益的。\nBesides此外；Luckily幸运的是；Nevertheless然而；Actually实际上。根据语境可知，前文说保护野\n生鲨鱼的努力至关重要，后文说通过重新放归野生鲨鱼种群可能非常有益，前后是转折关系，应\n用“nevertheless”。故选C。\n6.句意：除了斑马鲨，重新引入鲨鱼团队目前正在研究其他鲨鱼物种和其他地点——从加那利群岛和\n威尔士海岸的天使鲨，到东非的护士鲨。\nanimals动物；locations地点；threats威胁；projects项目。根据下文“from angel sharks in the\nCanary Islands and off the coast of Wales, to nurse sharks in East Africa”可知，从加那利群岛和\n威尔士海岸的天使鲨，到东非的护士鲨，所以此处是指其他的地点。故选B。"
  },
  {
    "id": "xdf-a5054f7feba43fe7",
    "type": "choice",
    "text": "Jintan has a population (人口) of 680,000 in 2025. What’s the English for the\nnumber 680,000?\nA. Sixty-eight thousand.\nB. Six hundred and eighty thousand.\nC. Six million and eight hundred thousand.\nD. Six hundred and eighty million.",
    "answer": "B",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：金坛2025年的人口为680,000。数字680,000用英语怎么说？\nSixty-eight thousand六万八千；Six hundred and eighty thousand六十八万；Six million and\neight hundred thousand六百八十万；Six hundred and eighty million六亿八千万。根据题意，数字\n680,000应读作six hundred and eighty thousand（68万）。"
  },
  {
    "id": "xdf-30fe668991963f5d",
    "type": "choice",
    "text": "________ of the money ________ used to help the poor children in mountain areas.\nA. Three-fourths; are\nB. Three-fourths; is\nC. Third-fourths; are\nD. Three-fourth; is",
    "answer": "B",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 2,
        "page": 1
      },
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：四分之三的钱被用来帮助山区的贫困儿童。\n分数表达中，分子用基数词，分母用序数词，分子大于1时分母加s，故“四分之三”为Three-\nfourths；“分数+of+名词”作主语时，谓语动词与of后的名词保持一致，money为不可数名词，谓语动\n词用单数is。故选B。"
  },
  {
    "id": "xdf-17fb11f5ad37a7bd",
    "type": "choice",
    "text": "Tony's mum looks young and beautiful. It's hard to imagine she is already in her\n________.\nA. fifties\nB. fifty\nC. fiftieths\nD. fiftieth",
    "answer": "A",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：托尼的妈妈看起来年轻漂亮。很难想象她已经五十多岁了。\n考查基数词。短语“in one's+几十的复数形式”表示某人大概的年龄段．故选A"
  },
  {
    "id": "xdf-afab2fd2c2e37156",
    "type": "choice",
    "text": "找出划线部分发音与其他三个不同的单词。（ ）\nA. theme\nB. rhythm\nC. breath\nD. athlete",
    "answer": "B",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "A 选项 theme：读音为 /θiːm/，划线部分 \"th\" 发音为 /θ/ ，是清辅音，发音时舌尖轻触上齿背，\n气流从齿间送出，声带不振动。B 选项 rhythm：读音为 /ˈrɪðəm/，划线部分 \"th\" 发音为 /ð/ ，是\n浊辅音，发音时舌尖同样轻触上齿背，但气流送出时声带振动。C 选项 breath：读音为 /breθ/，划\n线部分 \"th\" 发音为 /θ/。D 选项 athlete：读音为 /ˈæθliːt/，划线部分 \"th\" 发音为 /θ/。\nA、C、D 选项中划线部分 \"th\" 发音均为 /θ/，B 选项中 \"th\" 发音为 /ð/，与其他三个不同。\n故选：B。"
  },
  {
    "id": "xdf-72ea8f94852efe57",
    "type": "choice",
    "text": "找出划线部分发音与其他三个不同的单词。（ ）\nA. double\nB. courage\nC. pronounce\nD. rough",
    "answer": "C",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "A 选项 double：读音为 /ˈdʌbl/，划线部分 \"ou\" 的发音为 /ʌ/。B 选项 courage：读音为 /\nˈkʌrɪdʒ/，划线部分 \"ou\" 的发音为 /ʌ/。C 选项 pronounce：读音为 /prəˈnaʊns/，划线部分 \"ou\"\n的发音为 /aʊ/。D 选项 rough：读音为 /rʌf/，划线部分 \"ou\" 的发音为 /ʌ/。A、B、D 选项中划线\n部分 \"ou\" 发音均为 /ʌ/，C 选项中划线部分 \"ou\" 发音为 /aʊ/，与其他三个不同。\n故选：C。"
  },
  {
    "id": "xdf-668d443c8fa6bbdf",
    "type": "choice",
    "text": "The village is really beautiful.We've decided to stay for two days.（ ）\nA. others\nB. the others\nC. the other\nD. another",
    "answer": "D",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "others其他人或者物；the others其余的（表示在一个范围内的其他全部）；the other两者中的另一\n个；another另一的，再加一个的。根据The village is really beautiful.（这个村庄真的很美。）\n可知，我们决定再待两天，因此选another符合题意，another two days\"还要两天\"。\n故选：D。"
  },
  {
    "id": "xdf-f1b0abca8a429ece",
    "type": "choice",
    "text": "They should also take action to give a helping hand to the local\nvillagers.（ ）\nA. them\nB. themselves\nC. their\nD. theirs",
    "answer": "B",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "them他们，宾格；themselves他们自己，反身代词；their他们的，形容词性物主代词；theirs他们\n的，名词性物主代词。主语是They\"他们\"，后面需用反身代词themselves\"他们自己\"，强调主语自身。\n故选：B。"
  },
  {
    "id": "xdf-f3933ad5ea010b23",
    "type": "choice",
    "text": "—Do you want zongzi with meat or zongzi without meat？\n— is OK.I really don't mind.（ ）\nA. Both\nB. None\nC. Either\nD. Neither",
    "answer": "C",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "both两者都；none（三者或以上）都不；either两者任一；neither两者都不。根据\"I really don't\nmind.\"和\"zongzi with meat or zongzi without meat\"可知，此处表示两者任一都可以，且谓语动词\n是is，故用either；both表示复数，谓语动词应用are。\n故选：C。"
  },
  {
    "id": "xdf-2181be7461c1e9ea",
    "type": "choice",
    "text": "Beethoven's Symphony No.5 is ______ best-known classical music in the world.\n（ ）\nA. a\nB. an\nC. the\nD. /",
    "answer": "C",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "the定冠词；an不定冠词，用于元音音素开头的单数名词前；a不定冠词，用于辅音音素开头的单数名词\n前。/代表零冠词。\"best-known\"最著名的，最高级前面加冠词the。\n故选：C。"
  },
  {
    "id": "xdf-3d2812a09b55d8ff",
    "type": "choice",
    "text": "The Pacific Ocean is the deepest ocean ______ the earth.（ ）\nA. in\nB. at\nC. with\nD. on",
    "answer": "D",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "in在……里面；at在，通常用于表示具体的地点或位置；with和……一起或带有；on在……上面。on\nthe earth\"地球上\"，固定短语。\n故选：D。"
  },
  {
    "id": "xdf-81118cf1a4d954a6",
    "type": "choice",
    "text": "There's only________water left in the fridge.We need to buy some in the shop.\n（ ）\nA. a few\nB. few\nC. a little\nD. little",
    "answer": "C",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "a few几个，用于修饰可数名词复数，表肯定含义；few几乎没有，修饰可数名词复数，表否定含义；a\nlittle一点儿，用于修饰不可数名词，表肯定含义；little几乎没有，修饰不可数名词，表否定含义。\n根据\"There's only...buy some in the shop.\"（冰箱里只剩下......水了。我们需要去店里买一\n些。），\"water\"是不可数名词，此处表示肯定意义，only a little表示 \"只有一点\"，所以才要去买\n一些水。\n故选：C。"
  },
  {
    "id": "xdf-58e1a5a8717ae8cf",
    "type": "choice",
    "text": "The number of blue whales sharply in the past 10 years.（ ）\nA. is dropping\nB. dropped\nC. drops\nD. has dropped",
    "answer": "D",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "drop，动词，下降。选项A是现在进行时；选项B是过去式；选项C是第三人称单数形式；选项D是现在完\n成时。本题考查现在完成时。根据时间状语\"in the past 10 years（在过去的十年里）\"可知使用现在\n完成时，结构是have/has done，表示从过去持续到现在的动作。\n故选：D。"
  },
  {
    "id": "xdf-750ce3cc49410323",
    "type": "choice",
    "text": "The sign in the zoo requires visitors ______ food to the animals.（ ）\nA. not give\nB. to not give\nC. don't give\nD. not to give",
    "answer": "D",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "A.不给，为not加动词原形；B.表达错误；C.不给，为助动词加动词原处；D.不给，为动词不定式。根\n据The sign in the zoo requires visitors ______ food to the animals.（动物园里的标识要求游\n客不要给动物喂食。）可知，动物园里的标识要求游客不要给动物喂食，require sb.not to do\nsth.\"要求某人不要做某事\"。\n故选：D。"
  },
  {
    "id": "xdf-fdae5d0316997258",
    "type": "choice",
    "text": "— do you play computer games？\n—Never.（ ）\nA. How long\nB. How soon\nC. How much\nD. How often",
    "answer": "D",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "How long多长；How soon多久；How much多少钱；How often多久一次。根据答语\"Never.\"（从不。）\n可知，对频率提问，应用how often提问。\n故选：D。"
  },
  {
    "id": "xdf-222eb20ea289cd9a",
    "type": "choice",
    "text": "Lu Yao decided to stay indoors the sun was still pale at the moment.\n（ ）\nA. since\nB. though\nC. until\nD. so",
    "answer": "A",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 15,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "since因为，既然；though虽然；until直到；so所以。根据题干Lu Yao decided to stay\nindoors...the sun was still pale at the moment.（陆瑶决定待在室内……此刻太阳仍然黯淡无\n光。）可知，待在屋内是因为阳光暗淡，前后句是因果关系，前果后因，since\"因为\" 符合语境。\n故选：A。"
  },
  {
    "id": "xdf-766b1244add77fd6",
    "type": "choice",
    "text": "—I will give a speech in front of the class tomorrow.I'm worried about it.\n—______!I believe you can do well!（ ）\nA. Congratulations\nB. Good luck\nC. That's all right\nD. Thank you so much",
    "answer": "B",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 16,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "Congratulations祝贺；Good luck祝你好运；That's all right没关系；Thank you so much非常感\n谢。根据上文I will give a speech in front of the class tomorrow.（明天我要在全班面前演\n讲。）可知，此处应是祝福对方好运，所以B选项符合语境。\n故选：B。"
  },
  {
    "id": "xdf-a7f50071d4d12aa2",
    "type": "reading",
    "text": "Harry，a 12-year-old boy，came to China with his parents two years ago.He\ndecided to learn Chinese well.He knew that（1） ________ listening and speaking were\nimportant.According（2） ________ his Chinese teacher，he listened to Chinese songs and\nrepeated the lyrics.（3） ________ it was difficult at first，he kept trying.\nHarry found that learning Chinese required him（4） ________ a lot of exercises.He\nhad to remember new words and understand grammar rules.But he didn't give up.He told\n（5） ________ that he could do it.Later，Tom realized that he needed to learn\n（6） ________ than before.So he changed his learning ways.He joined a Chinese club and\ntalked with other learners.\nNow，（7） ________ in Harry's class can speak Chinese better than him.And he can\nalso write Chinese emails and reports.These days he has（8） ________ goal to become the\nchampion in the coming Chinese speaking competition.At 8：00 last night，when Harry\n（9） ________ the speech in front of the mirror，his mum came back and advised him\n（10） ________ some gestures.Harry thought it was a good idea and he believed he would\nhave a good performance in the competition.\n1.单选题\nA. neither\nB. either\nC. both\n2.单选题\nA. to\nB. on\nC. as\n3.单选题\nA. Even though\nB. Since\nC. If\n4.单选题\nA. do\nB. doing\nC. to do\n5.单选题\nA. him\nB. himself\nC. his\n6.单选题\nA. effectively\nB. more effectively\nC. most effectively\n7.单选题\nA. nobody\nB. anybody\nC. somebody\n8.单选题\nA. another\nB. other\nC. the other\n9.单选题\nA. practices\nB. practiced\nC. was practicing\n10.单选题\nA. add\nB. to add\nC. adding",
    "answer": "(1) C (2) A (3) A (4) C (5) B (6) B (7) A (8) A (9) C (10) B",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_21_20260922_215610.pdf","number":17,"page":3,"sha256":"2cd33258f1d98424905e82960471405ca04a1890a30bdaefa91f6a3c42048652"},
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 17,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n考查不定代词。句意：他知道听力和口语都很重要。A.neither 两者都不；B.either 两者中\n的任意一个；C.both 两者都。根据 \"listening and speaking were important\" （听和说\n很重要）可知，此处指两者都重要，both\"两者都\"符合语境。故选C。\n\n第 2 小题：\n考查介词。句意：根据他的中文老师（的建议），他听中文歌曲并重复歌词。A.to 到；B.on\n在……上；C.as 作为。\"according to\" 为固定短语，意为 \"根据\"。故选A。\n\n第 3 小题：\n考查连词。句意：尽管一开始很难，但他一直坚持尝试。A.Even though 尽管；B.Since 因\n为；C.If 如果。\"it was difficult at first\"（一开始很难）与 \"he kept trying\"（他坚\n持尝试）之间存在转折关系，even though \"尽管\" 引导让步状语从句，符合语境。故选A。\n\n第 4 小题：\n考查动词不定式。句意：Harry 发现学习中文需要他做很多练习。A.do 做（动词原形）；\nB.doing 做（动名词 / 现在分词）；C.to do 做（动词不定式）。\"require sb.to do\nsth.\" 为固定用法，意为 \"要求某人做某事\"，此处需用动词不定式作宾语补足语。故选C。\n\n第 5 小题：\n考查代词。句意：他告诉自己他能做到。A.him 他（宾格）；B.himself 他自己（反身代\n词）；C.his 他的（物主代词）。根据语境可知，此处指Harry对自己说，用反身代词\nhimself 表示 \"他自己\"。故选B。\n\n第 6 小题：\n考查副词比较级。句意：后来，Tom意识到他需要比以前更高效地学习。A.effectively 高效\n地（原级）；B.more effectively 更高效地（比较级）；C.most effectively 最高效地\n（最高级）。根据\"than before\" （比以前）可知，此处存在比较关系，需用副词比较级形\n式。故选B。\n\n第 7 小题：\n考查不定代词。句意：现在，Harry班上没有人比他中文说得更好。A.nobody 没有人；\nB.anybody 任何人；C.somebody 某人。根据下文 \"And he can also write Chinese emails\nand reports.\"（他还能写中文邮件和报告）可知，Harry的中文水平很高，此处指 \"没有人\"\n比他说得更好，nobody\"没有人\"符合语境。故选A。\n\n第 8 小题：\n考查限定词辨析。句意：这些天他有了另一个目标：在即将到来的中文演讲比赛中成为冠\n军。A.another 另一（泛指三者及以上中的另一个）；B.other 其他的（后接复数名词）；\nC.the other 另一（特指两者中的另一个）。根据语境可知，Harry 在原有学习目标之外又\n有了新目标，此处表示 \"另一个\"，且无范围限制，用another\"另一个\"。故选A。\n\n第 9 小题：\n考查动词时态。句意：昨晚 8 点，当Harry正在镜子前练习演讲时，他妈妈回来了，并建议\n他加一些手势。A.practices 练习（一般现在时）；B.practiced 练习（一般过去时）；\nC.was practicing 正在练习（过去进行时）。根据\"At 8：00 last night\" （昨晚 8 点）\n可知，此处表示过去某个具体时间点正在进行的动作，用过去进行时 \"was/were + 现在分\n词\"。故选C。\n\n第 10 小题：\n考查动词不定式。句意：他妈妈回来建议他加一些手势。A.add 加（动词原形）；B.to add\n加（动词不定式）；C.adding 加（动名词 / 现在分词）。\"advise sb.to do sth.\" 为固定\n用法，意为 \"建议某人做某事\"，此处需用动词不定式作宾语补足语。故选B。"
  },
  {
    "id": "xdf-61d6242ab2068692",
    "type": "fill",
    "text": "(1) ____ Mary, a nurse and a mother, wants to teach her daughter how to help others. She's looking for a book with real-life first aid cases and impressive volunteer stories.\n(2) ____ Amy notices many damaged trees in her neighbourhood. She hopes to find a book offering creative ideas to protect trees.\n(3) ____ Lucy wants to organize a charity concert for disabled children. She needs to learn how music can cheer people and pass on joy.\n(4) ____ Jack feels nervous when meeting new people and finds it hard to make friends. He hopes to find tips on improving communication skills.\n(5) ____ Linda found a wounded (受伤的) bird on her way to school. She wants to know how to take care of it safely.\n(6) ____ Jack saw his friend copying homework but isn't sure whether to report it to the teacher. He needs a book discussing such dilemmas (困境) and giving suggestions.\nA. Music's Hidden Stories: How Melodies Change Lives\nB. Rescue and Protect: First Aid for Wild Animals\nC. When Honesty Matters: Smart Choices in School Life\nD. One-step Greener: 50 Creative Ideas for Trees\nE. Let's Talk Globally: Understanding Cultural Differences\nF. Speak with Confidence: A Teen's Guide to Communication\nG. Young Heroes Around Us: First Aid and Volunteer Skills",
    "answer": "1 G 2 D 3 A 4 F 5 B 6 C",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 18,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "（1）细节推理题。根据She's looking for a book with real-life first aid cases and\nimpressive volunteer stories.（她在找一本有真实急救案例和感人志愿者故事的书。）可知需要一\n本有真实急救案例和感人志愿者故事的书，结合选项，可知G选项\"我们身边的年轻英雄：急救和志愿者\n技能\"符合题意。故选G。\n（2）细节推理题。根据She hopes to find a book offering creative ideas to protect trees.\n（她希望找到一本为保护树木提供创造性想法的书。）可知想要一本保护树木的书，结合选项，可知D\n选项\"一步绿化：50个树木创意\"符合题意。故选D。\n（3）细节推理题。根据She needs to learn how music can cheer people and pass on joy.（她需\n要学习音乐如何给人带来快乐，传递快乐。）可知与音乐有关，结合选项，可知A选项\"音乐隐藏的故\n事：旋律如何改变生活\"符合题意。故选A。\n（4）细节推理题。根据He hopes to find tips on improving communication skills.（他希望找到\n提高沟通技巧的窍门。）可知想提高沟通技巧，结合选项，可知F选项\"自信地说话：青少年交流指\n南\"符合题意。故选F。\n（5）细节推理题。根据Linda found a wounded（受伤的） bird on her way to school.She wants\nto know how to take care of it safely.（在上学的路上琳达发现了一个受伤的小鸟。她想知道如何\n安全地照顾它。）可知她想学习照顾小鸟，结合选项，可知B选项\"拯救和保护：野生动物的急救\"符合\n题意。故选B。\n（6）细节推理题。根据Jack saw his friend copying homework but isn't sure whether to report\nit to the teacher.（杰克看见他的朋友抄作业，但不确定是否要向老师报告。）可知杰克需要学会诚\n实，结合选项，可知C选项\"诚实至关重要：学校生活中的明智选择\"符合题意。故选C。"
  },
  {
    "id": "xdf-fb798db89c994509",
    "type": "cloze",
    "text": "Zach, a high school student, wanted to help people who didn’t have enough\nfood. So he started an organization called Fruit For All in his neighborhood. He collects\nextra fruit from people’s trees and gives it to local food banks for free.\nTo make Fruit For All 1 , Zach needed volunteers and trees with fruit. He asked\npeople to contact him and let him know if they could help. At first, it was difficult for\nZach to find people who wanted to 2 their fruit in his neighbourhood. But as more\npeople heard about his idea, they started to help. Zach and his volunteers now pick fruit\nevery weekend. And they have 3 over 70,000 pounds of fruit to food banks up to now.\nSometimes they even have to travel up to 20 miles to collect fruit.\nFruit For All has a 4 where people can learn more about the organization and how\nthey can help. The website also lets people ask questions and leave 5 . More and more\npeople are 6 Fruit For All and helping out. 7 a person’s effort might be\nsmall, together they are making a big difference.\n1. A. comfortable B. famous C. successful D. traditional\n2. A. protect B. lose C. discover D. share\n3. A. given away B. given up C. run away D. put away\n4. A. team B. project C. website D. lab\n5. A. diaries B. comments C. instructions D. schedules\n6. A. joining B. joining in C. taking part in D. attending\n7. A. Because B. Although C. If D. When",
    "answer": "1-5 CDACB 6-7 AB",
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 19,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "1.句意：为了让“全民水果”组织运作成功，扎克需要志愿者和结果子的树木。\n结合后文招募志愿者、收集水果开展公益，此处指让组织办得成功，successful符合语境；\ncomfortable舒适的、famous著名的、traditional传统的均不符合文意。\n2.句意：起初，扎克很难在社区里找到愿意分享自家水果的人。\n文章主旨是收集多余水果无偿捐赠，是分享水果的行为，share符合；protect保护、lose失去、\ndiscover发现均与公益捐水果的语境不符。\n3.句意：到目前为止，他们已经向食物银行捐赠了超过7万磅水果。\ngive away意为捐赠、赠送，契合无偿捐水果给食物银行；give up放弃、run away逃跑、put away收好\n放好均不符合句意。\n4.句意：“全民水果”有一个网站，人们可以在上面了解更多组织信息以及参与帮助的方式。\n根据后句The website also...可直接对应此处为网站website；team团队、project项目、lab实验室均\n无后文对应线索。\n5.句意：这个网站还能让人们提问并留下评论。\n在网站上，人们除了提问，留下的应是对组织或活动的看法，comments符合；diaries日记、\ninstructions说明、schedules日程表均不符合网站互动的语境。\n6.句意：越来越多的人正在加入“全民水果”组织并提供帮助。\n此处指加入某个组织，join后直接接组织名称，符合用法；join in、taking part in侧重参与某项活\n动，attend侧重出席会议、课程等，均不适合接组织名称。\n7.句意：虽然一个人的力量可能很微小，但团结起来他们就能产生巨大的影响。\n前句“个人力量小”与后句“团结影响大”形成转折关系，although表虽然，引导让步状语从句；\nbecause表原因、if表假设、when表时间，均不符合逻辑关系。"
  },
  {
    "id": "xdf-f6d655651afd7388",
    "type": "reading",
    "text": "We need you!\nTeach Music Clean People's Park Help Old People\nAre you good at We need five people We need four people to\nsinging or dancing？Do who are strong and can help at Xinxin Nursing\nyou have a loving help clean up People's Home.You should be\nheart？We need three Park.We need you to good at talking with\npeople to work as help pick up，collect old people.Your job is\nmusic teachers in SOS and sort rubbish. to wash clothes for\nChildren's Villages. If you are free for them.\nIf you are free for four hours this If you can take out\nthree hours every weekend，come and join two hours on May 6，\nweekend，join us. us! come and join us!\nTel：0398-8858518 Tel：0398-8651518 Tel：0398-8656869\nE-mail： E-mail： E-mail：\nlovekids@mail.com cleanpark@mail.com homelove@mail.com\n1.单选题\nThe SOS Children's Villages want ________ teachers.\nA. Dance\nB. Music\nC. Maths\nD. English\n2.单选题\nIf you want to help make People's Park clean，you have to work ________ .\nA. this weekend\nB. every weekend\nC. every weekday\nD. on May 6\n3.单选题\nThe underlined word \"sort\" most probably means ________ .\nA. 乱扔\nB. 捡起\nC. 收集\nD. 分类\n4.单选题\nTo work at Xinxin Nursing Home，you need to do well in ________ .\nA. washing dishes\nB. collecting rubbish\nC. talking with the old\nD. singing and dancing\n5.单选题\nAccording to the passage，which of the following is NOT true？ ________\nA. Eleven people are needed altogether.\nB. It may be tiring to do the cleaning work in People's Park.\nC. Of the three jobs，the work of helping old people takes the shortest time.\nD. If you want to do the teaching job，you can call the number 0398-8858518.\n6.单选题\nWhere can you most probably find this passage？ ________\nA. In a newspaper.\nB. In a Music magazine.\nC. In a storybook.\nD. In a sports magazine.",
    "answer": "(1) B (2) A (3) D (4) C (5) A (6) A",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_21_20260922_215610.pdf","number":20,"page":5,"sha256":"2cd33258f1d98424905e82960471405ca04a1890a30bdaefa91f6a3c42048652"},
    "sources": [
      {
        "file": "错题_21_20260922_215610.pdf",
        "number": 20,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据\"Teach Music\"的\"We need three people to work as music teachers in\nSOS Children's Villages\"（我们需要三个人在SOS儿童村担任音乐老师）可知，SOS儿童村\n需要音乐教师。故选B。\n\n第 2 小题：\n细节理解题。根据表格\"If you are free for four hours this weekend，come and join\nus!\"（如果你这个周末有四个小时的时间，来加入我们吧！）可知，城市人民公园这个周末\n需要人。故选A。\n\n第 3 小题：\n词义猜测题。根据表格\"We need you to help pick up，collect and sort rubbish.\"（我\n们需要你帮忙捡、收集和分类垃圾。）可知，我们需要你帮忙捡、收集和分类垃圾。此处划\n线词\"sort\"的意思是\"分类\"。故选D。\n\n第 4 小题：\n细节理解题。根据表格\"You should be good at talking with old people.Your job is to\nwash clothes for them.\"（你应该善于和老人交谈。你的工作是给他们洗衣服。）可知，在\n疗养院工作你应该善于和老人交谈。故选C。\n\n第 5 小题：\n推理判断题。根据表格\"We need three people to work as music teachers in SOS\nChildren's Villages.\"（我们需要三个人在SOS儿童村担任音乐老师。）\"We need five\npeople who are strong and can help clean up People's Park.\"（我们需要五个强壮的\n人，可以帮助清理人民公园。）\"We need four people to help at Xinxin Nursing\nHome.\"（我们在新新养老院需要四个人帮忙。）可知，总人数计算为音乐教师3人+公园清洁5\n人+老人护理4人=12人，但A项称需要11人，与文本不符，因此A项错误。故选A。\n\n第 6 小题：\n推理判断题。通读全文可知，本文为社区志愿者招聘广告，内容涉及多类公益服务，信息简\n洁且提供联系方式，符合报纸\"招聘/公告\"栏目的特征。故选A。"
  },
  {
    "id": "xdf-5550bbb99b6b6e18",
    "type": "choice",
    "text": "The white flowers in grandma’s garden smell ________, like a sweet summer memory.\nA. terrible\nB. well\nC. delicious\nD. beautiful",
    "answer": "D",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：奶奶花园里的白花闻起来很香，就像夏日里一段甜蜜的回忆。\n考查形容词辨析。terrible糟糕的；well健康的；delicious芬芳的；beautiful美丽的。根据“The\nwhite flowers in grandma’s garden smell...like a sweet summer memory.”可知，此处指白花闻\n起来很好闻，beautiful 可以用于描述气味 “怡人的、美妙的”，与 “甜蜜的夏日回忆” 营造的美\n好氛围一致，符合语境。故选D。"
  },
  {
    "id": "xdf-0f6e61447b64b47f",
    "type": "choice",
    "text": "The woollen scarf feels ________.\nA. roughly\nB. soft\nC. smoothly\nD. hard",
    "answer": "B",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：这条羊毛围巾摸起来很柔软。\n考查单词辨析。roughly粗糙地，副词；soft柔软的，形容词；smoothly平滑地，副词；hard困难\n的，努力地，形容词/副词。feels是系动词，后接形容词作表语，排除A、C项。根据“The woollen\nscarf”可知，羊毛围巾应该是柔软的。故选B。"
  },
  {
    "id": "xdf-aea5db00598a12ba",
    "type": "choice",
    "text": "It is cold outside. Please keep the door _________ to keep ________ .\nA. close, warm\nB. closed, warm\nC. to close, warmth\nD. closing, warmth",
    "answer": "B",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：外面太冷了。请关上门来保暖。\n本题考查形容词。close关上，是动词；closed 关着的，是形容词；to close是动词不定式，closing\n是现在分词，第一空根据keep sth+形容词，表示让某物保持某种状态，用形容词closed作宾语补足\n语；warm温暖的，是形容词；warmth温暖，是名词。keep+形容词，表示保持某种状态，因此用形\n容词warm。故选B。"
  },
  {
    "id": "xdf-89869eee48f0d11c",
    "type": "choice",
    "text": "The sunglasses can 1 your eyes 2 strong sunlight.\nA. protect; from\nB. protect; in\nC. protect; away\nD. protect; out",
    "answer": "A",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "考查短语 \"protect…from\" \"保护…避免受到\""
  },
  {
    "id": "xdf-e530940e0a83fbfb",
    "type": "choice",
    "text": "We can see several ________ students doing morning exercises on the playground.\nA. hundred\nB. ten hundred\nC. hundreds of\nD. a lot",
    "answer": "A",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我们能看到几百名学生在操场上做早操。\n本题考查数量表达。句中需填入表示数量的短语修饰\"students\"。选项A\"hundred\"与\"several\"连用\n构成\"several hundred students\"（几百名学生），符合英语语法规则：当\"hundred\"前有具体数字\n（如two）或模糊数量词（如several）时，用单数形式。选项B\"ten hundred\"（十百）即1000，但\n英语中1000应表达为\"one thousand\"。选项C\"hundreds of\"（数百）需单独使用，不能\n与\"several\"连用。选项D\"a lot\"修饰名词时必须加\"of\"（即a lot of），此处缺少\"of\"。故正确答案为\nA。"
  },
  {
    "id": "xdf-488f7560ef933487",
    "type": "choice",
    "text": "—My little brother is ________. How old is your sister?\n—She is ________.\nA. five years old; a eight-year-old girl\nB. five years old; an eight-year-old girl\nC. five-years-old; an eight-years-old girl\nD. five-year old; an eight-year-old girl",
    "answer": "B",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——我的小弟弟五岁了。你妹妹多大了？——她是一个八岁的女孩。\n考查年龄表达。five years old五岁；eight-year-old八岁的，复合形容词，an eight-year-old girl一个\n八岁的女孩。eight是元音音素开头，因此前加不定冠词时，用an。故选B。"
  },
  {
    "id": "xdf-6f0227cdf94e52b2",
    "type": "choice",
    "text": "We'll spend our summer holidays in the mountains _______ miles away.\nA. several hundreds\nB. hundreds\nC. several hundred\nD. several hundreds of",
    "answer": "C",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "“hundred” 前有具体数字或 “several” 等词修饰时，不用复数形式，“several hundred” 表示\n“几百”。故答案选 C。"
  },
  {
    "id": "xdf-b26fb35a9a4f0759",
    "type": "choice",
    "text": "About _ Asians came to the USA to learn IT science last year.\nA. thousands\nB. thousands of\nC. five thousand\nD. thousand",
    "answer": "C",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 8,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：去年大约有五千位亚洲人来到美国学习信息技术。\n考查数词。表具体数量时，thousand前面应加上具体数字且thousand不可以用复数形式，故排除D\n选项；表示不是具体数量时，可在量后加s + of +名词，来表示不确定的数量，即thousands of，故\n排除A选项。B选项thousands of前面一般不用修饰词，例如数字、About等，本句以About 开头，\n故B选项也可排除，故应选C。\nthousand意为“一千”，前面有具体数字时，用单数形式。例如：\nThere are two thousand students in our school. 我们学校有两千名学生。\nthousand泛指许多时，用复数形式，并常与介词of连用，构成thousands of结构，意为“成千上万\n的”。例如：\nThey seem to have been on earth thousands of years. 它们似乎已在地球上生存了数千年。"
  },
  {
    "id": "xdf-e2467ba0b6919cd2",
    "type": "choice",
    "text": "3% of the teenagers prefer to write to each other in communication. How can we\nread\"%\"?\nA. percentage\nB. percentages\nC. percent\nD. percents",
    "answer": "C",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 10,
        "page": 2
      },
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 40,
        "page": 12
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 7,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "“%” 读作 “percent” ，单数形式，“3%” 是 “three percent”，故正确答案为C。"
  },
  {
    "id": "xdf-b7c8a33cb93583ab",
    "type": "choice",
    "text": "It says over 70% of the Earth ________ covered with water.\nA. are\nB. is\nC. were\nD. being",
    "answer": "B",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：报告称，超过70%的地球被水覆盖。\n考查时态及主谓一致。are是，be的复数和第二人称单数现在时形式；is是，be的第三人称单数现在\n时形式；were是，be的过去时复数和第二人称单数形式being是，现在分词。分析句子结构可知，空\n处为从句谓语；根据“over 70% of the Earth…covered with water.”的语境可知，此处表示事实，\n句子时态为一般现在时；当“百分比/分数 + of + 名词”作主语时，动词形式由“of后的名词”决\n定，根据空后的the Earth“地球”可知，此处用is。故选B。"
  },
  {
    "id": "xdf-c3a408974bbc774e",
    "type": "choice",
    "text": "My father joined the army in ______ when he was in ______.\nA. 1960s; twenties\nB. the 1960s; his twentieth\nC. 1960; his twenties\nD. 1960s; the twenties",
    "answer": "C",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考查年份和年岁的表达。本句意为：我的父亲是在 1960 年参军的，那时他二十几岁。“in 1960”\n表示 “在 1960 年”；“in one's twenties” 表示 “在某人二十多岁时”，所以选 C。"
  },
  {
    "id": "xdf-034ebb0b4a98d016",
    "type": "choice",
    "text": "Is _______ riding enough for you to get there?\nA. thirty five minutes\nB. thirty-five minutes'\nC. thirty-five-minutes\nD. thirty five minute's",
    "answer": "B",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "本题考查名词所有格。thirty five minutes35分钟；thirty-five minutes'35分钟的，是名词所有格；\nthirty-five-minutes是错误的表达；thirty five minute's是错误的表达。根据句意可知，此处应用名词\n所有格，基数词-可数名词单数，构成复合形容词，在句中作定语。\n故选：B。"
  },
  {
    "id": "xdf-bd359f20085be666",
    "type": "choice",
    "text": "_______ of the students of Grade _______ are girls who like singing.\nA. Three-fifths ... Nine\nB. Three-fifth ... Ninth\nC. Three-fifths ...Ninth\nD. Three-fifth ... Nine",
    "answer": "A",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：九年级的五分之三的学生是喜欢唱歌的女孩。\n本题考查数词。nine九，ninth第九。表示分数时，分子用基数词，分母用序数词，当分子大于一\n时，分子用复数形式，表示“五分之三”用three-fifths。表示年级时，开头字母大写，位于Grade后\n用基数词，因此第二空用Nine。故选A。"
  },
  {
    "id": "xdf-7eebb047dd1f6cf5",
    "type": "fill",
    "text": "She has a 1 way of describing even the most boring situations. (humour)",
    "answer": "1 humorous",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 15,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：她用一种幽默的方式描述，即使是在最无聊的情况下。 空格处需要填入一个形容词来修饰\nway（方式），humour的形容词形式是humorous，表示“幽默的”。故填humorous。"
  },
  {
    "id": "xdf-0e0935e934cd52f7",
    "type": "fill",
    "text": "Which book is 1 （thick），yours or mine？",
    "answer": "1 thicker",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 16,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "thick厚的，形容词原级；根据语境可知，此处是两者作比较，所以应用比较级形式，thick的比较级\n为thicker（更厚的）。\n故填：thicker。"
  },
  {
    "id": "xdf-688d7d58eb274d85",
    "type": "choice",
    "text": "Nearly _______of the earth___covered by sea.\nA. three fourth; is\nB. three fourths; is\nC. three fourth; are\nD. three fourths; are",
    "answer": "B",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 17,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：几乎地球表面的四分之三被海洋覆盖。\n考查分数的用法。分数的表达方式：分子用基数词，分母用序数词，当分子超过一了，分母变复\n数，排除A和C；本题中分数作主语，谓语动词要看分数后面的名词earth，所以谓语动词用单数，故\n选B。"
  },
  {
    "id": "xdf-fa7c554f4d261c10",
    "type": "choice",
    "text": "I think Shanghai Disneyland is one of the most interesting places and I want to go there\nfor ________ time during the winter holiday.\nA. two\nB. second\nC. a second\nD. the second",
    "answer": "C",
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 18,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考查序数词的用法。句意：我认为上海迪斯尼乐园是最有趣的地方之一。在寒假期间我还想再去一\n次。根据句意可知此处是指“再一次”，考查的是“a/an＋序数词”表示“又一，再一”的用法。\n故选C。"
  },
  {
    "id": "xdf-1a881b7f39530531",
    "type": "reading",
    "text": "On March 14, math and science lovers around the world celebrated a special day: Pi\nDay. Pi is equal to about 3.14, but the number goes on endlessly. It is sometimes written in\nGreek, π. With the help of computers, mathematicians have been able to calculate pi out to over\na trillion decimal (小数) places, but there is still no end to the number. This makes pi puzzling,\neven for the most famous scientists and mathematicians. Pi Day is celebrated around the world\non March 14, since how we write this date, 3/14, looks just like the number pi.\nFor some people, the appeal (吸引力) of Pi Day goes far beyond math and science. Pi shows\nup throughout popular culture. You can see it in movies, comics, music and more. “In modern\nmovies, any time the filmmaker wants to evoke (唤起) a sense of mystery, often the symbol pi is\nused,” said David Blatner, a Jewish-American writer of The Joy of Pi.\n★ and competing against others to see who can remember the most. Most teachers\nhold class contests to see how many numbers their students can memorize. The Guinness World\nRecord for reciting the most digits of pi is held by Lyu Chao of China, who successfully recited pi\nout to nearly 67,890 decimal places.\nAbove all, Pi Day is about having fun with the number. People celebrate Pi Day by eating or\nthrowing pic and with fun pi-related games and activities. In 2016, Princeton, New Jersey, held a\nbirthday party for Albert Einstein whose birthday also falls on March 14. There was also a “Walk\na Pi Event” where people walked 3.14 miles together. Just like the number itself, the possibilities\nfor Pi Day are truly endless.\n1.单选题\nWhich description of pi is NOT correct?\nA. The number of pi is endless.\nB. Pi Day falls on March 14.\nC. Pi was first found in Greece.\nD. People usually write pi as π.\n2.单选题\nWhich of the following can be put in ________?\nA. There is no point memorizing decimal places of pi\nB. People like using pi in mathematical operations\nC. People also love trying to memorize the digits of pi\nD. Students think reciting pi out is interesting\n3.单选题\nIn modern movies, the symbol pi is often used to ________.\nA. remind us of movies and comics\nB. stand for maths and science\nC. show great understanding of the world\nD. show something mysterious\n4.单选题\nPeople show interest in pi by ________.\na. calculating it out to over a trillion decimal places\nb. reciting as many digits of pi as possible\nc. naming many inventions after pi\nd. including pi in many forms of creative work\nA. abc\nB. abd\nC. acd\nD. bcd\n5.单选题\nWhat is the last paragraph mainly about?\nA. Fun activities to celebrate Pi Day.\nB. The importance of pi to math.\nC. People’s expectation of pi.\nD. The story between Albert Einstein and pi.",
    "answer": "(1) C (2) C (3) D (4) B (5) A",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_22_20260922_215615.pdf","number":19,"page":3,"sha256":"8b8ba99f761faf5d535c377cf48d0a272986eceb31276b5460938925d114f2ae"},
    "sources": [
      {
        "file": "错题_22_20260922_215615.pdf",
        "number": 19,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“It is sometimes written in Greek, π.”可知，圆周率在希腊语中是π，\n并没有说是最早在希腊发现。故选C。\n\n第 2 小题：\n推理判断题。根据“and competing against others to see who can remember the\nmost.”可知，此处与记住圆周率的数字有关，选项C“人们也喜欢记住圆周率的数字”符\n合语境。故选C。\n\n第 3 小题：\n细节理解题。根据“In modern movies, any time the filmmaker wants to evoke (唤起) a\nsense of mystery, often the symbol pi is used,”可知，在现代电影中，符号pi经常被用\n来表示一些神秘的东西。故选D。\n\n第 4 小题：\n细节理解题。根据“With the help of computers, mathematicians have been able to\ncalculate pi out to over a trillion decimal (小数) places, but there is still no end to the\nnumber.”；“Most teachers hold class contests to see how many numbers their\nstudents can memorize.”；“The Guinness World Record for reciting the most digits\nof pi is held by Lyu Chao of China, who successfully recited pi out to nearly 67,890\ndecimal places.”可知，选项B：abd符合。故选B。\n\n第 5 小题：\n段落大意题。根据“Above all, Pi Day is about having fun with the number. People\ncelebrate Pi Day by eating or throwing pic and with fun pi-related games and\nactivities.”可知，本段介绍了庆祝圆周率日的有趣活动。故选A。"
  },
  {
    "id": "xdf-b332d4666311ed20",
    "type": "cloze",
    "text": "Choose the words or expressions and complete the passage（选择最恰当的单词或词组\n完成短文）\nA thousand years ago, Hong Kong was covered by a thick forest. As more and more people\ncame to live in Hong Kong, these trees were cut down and burnt. Now there is 1 forest\nleft, though there are still some small areas covered by trees. We call these woods.\nElephants, tigers and many 2 animals were living in the thick forest. When people\ncame to live in Hong Kong, animals began to die 3 . Early farmers grew rice and 4\npigs and chickens in the valleys. They cut down the trees and burnt them. They needed\n5 to keep themselves warm in winter, to cook their food and to keep away the\ndangerous animals. Elephants quickly disappeared because there was not enough food for\nthem. 6 did most of the wolves and tigers. Monkeys and many other animals soon died\nin the same way.\nYou might think that there are no longer any animals in Hong Kong 7 in the zoos.\nThere are still about 36 different animals living there. One of the most interesting\nanimals of Hong Kong is the barking deer. These are beautiful little animals with a rich\nbrown coat and a white patch (补丁) under the tail. In Hong Kong, the barking deer has\nonly a real enemy-men. People 8 these little animals though it is illegal. There are\nnow not many barking deer left. So, it is important for people to protect wild animals.\n1. A. many B. a few C. a little D. no\n2. A. other B. others C. the other D. another\n3. A. away B. off C. of D. out\n4. A. grew B. made C. got D. kept\n5. A. fire B. hotness C. heat D. stoves\n6. A. So B. Such C. As D. Nor\n7. A. besides B. except C. and D. or\n8. A. raise B. hunt C. keep D. feed",
    "answer": "1-5 DADDA 6-8 ABB",
    "sources": [
      {
        "file": "错题_23_20260922_215620.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "1.句意：现在没有森林了，尽管仍有一些小区域被树木覆盖。\nmany许多；a few有一些，修饰可数名词复数；a little有一些，修饰不可数名词；no没有。根\n据“these trees were cut down and burnt”可知，现在没有森林了。故选D。\n2.句意：大象、老虎和许多其他动物生活在茂密的森林里。\nother其它的，形容词；others其它的，代词，相当于“other+名词复数”，后面不能跟名词。the\nother指两者中的另一个；another另外的。此处修饰名词animals，应用形容词other。故选A。\n3.句意：当人们来到香港居住时，动物开始死亡。\naway离开；off离开；of……的；out出去。die out“灭绝”，是固定短语。故选D。\n4.句意：早期的农民在山谷里种水稻，养猪和鸡。\ngrew种植；made制作；got得到；kept饲养。根据“pigs and chickens”可知，此处指养猪和鸡。故选\nD。\n5.句意：他们需要火来保暖、做饭和驱赶危险的动物。\nfire火；hotness热度；heat热量；stoves炉子。根据“to keep themselves warm in winter, to\ncook their food and to keep away the dangerous animals”可知，此处指他们需要火来保暖、做饭\n和驱赶危险的动物。故选A。\n6.句意：大多数狼和老虎也是这样。\nSo因此；Such这样的；As作为；Nor也不。根据“Elephants quickly disappeared because there was\nnot enough food for them”和“did most of the wolves and tigers”可知，此处指大多数狼和老\n虎也快速消失了，“so did+主语”表示“……也是这样”。故选A。\n7.句意：你可能会认为除了动物园，香港再也没有动物了。\nbesides除了（包括在内）；except除了（不包括在内）；and和；or或者。根据“in the zoos”可\n知，此处指除了动物园，香港再也没有动物了，此处不包括动物园的动物，应用except。故选B。\n8.句意：尽管是非法的，人们仍然猎捕这些小动物。\nraised饲养；hunted猎捕；kept饲养；fed喂养。根据“though it is illegal”可知，此处指非法猎\n捕这些小动物。故选B。"
  },
  {
    "id": "xdf-fb6d8afd763e40e6",
    "type": "choice",
    "text": "There ________ a talk on how to build a better community this Sunday morning.\nA. is going to have\nB. are going to be\nC. will have\nD. will be",
    "answer": "D",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：这个星期天上午将有一个关于如何建设更好社区的讲座。\n考查there be句型的一般将来时。根据“this Sunday morning”可知，句子时态为一般将来时；再根\n据“There … a talk …”可知，句子为there be句型，所以此处考查there be句型的一般将来时，其\n结构为there will be/there is/are going to be，排除A和C；又因为“a talk”是单数，be动词应用\nis，排除B。故选D。"
  },
  {
    "id": "xdf-67fe9ce092424ce1",
    "type": "choice",
    "text": "The number of people that had bought tickets for the performance ________ three\nhundred, but a number of them________ unable to attend it due to the bad weather.\nA. were; was\nB. was; was\nC. was; were\nD. were; were",
    "answer": "C",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：买了演出票的人数是三百，但其中许多人由于天气不好无法参加。\n第一空，句中“the number of+名词复数”意为“……的数量”，谓语动词用单数形式was；第二\n空，“a number of+名词复数”意为“许多”，谓语动词用复数形式were。"
  },
  {
    "id": "xdf-bd9277f42a734ce2",
    "type": "choice",
    "text": "Solve the first problem and the rest ________ tomorrow.\nA. are going to be discussed\nB. is going to be discussed\nC. will discuss\nD. is discussing",
    "answer": "A",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：解决了第一个问题，其余的我们明天再讨论。\n考查主谓一致及被动语态。主语the rest及谓语discuss之间是被动关系，故此处是被动语态be done，\n故排除C项；根据时间状语“tomorrow”可知，此处是一般将来时，故排除D项。the rest指代the rest\nproblems，主语是复数，be动词用are。故选A。"
  },
  {
    "id": "xdf-37a1598d9e896e01",
    "type": "choice",
    "text": "With the joint efforts of all the environment-minded people, the number of newly-\nplanted trees ________ dramatically during the past ten years.\nA. has risen\nB. have risen\nC. has raised\nD. have raised\n第5题 1\n[填空题]Zhao Dong quickly into the woods after saying goodbye to his friends.\n(appear)",
    "answer": "A",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：在所有环保人士的共同努力下，过去十年中新种植的树木数量大幅增加。\n考查主谓一致和动词辨析。rise表示太阳，月亮，数量等“升起，增长”，为不及物动词；raise表示\n工资，价格，地位等“提高”，为及物动词。根据“the number of newly-planted trees”可知，此\n处表示数量增加，且空后没有宾语，应用不及物动词rise；“the number of+名词复数”表示“……的\n数量”，作主语时，谓语动词用单数。故选A。"
  },
  {
    "id": "xdf-81afbad45868c051",
    "type": "choice",
    "text": "I was writing a letter at home ________ I heard a knock on the door.\nA. while\nB. when\nC. as\nD. but",
    "answer": "B",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：当我听见敲门声时，我正在家写一封信。\n考查从属连词辨析。while当……时，与延续性动词连用；when当……时，与瞬间动词或延续性动词连\n用；as随着，强调主从句动作伴随发生；but但是。根据空后谓语动词heard为瞬间动词，可知用when，\n故选B。"
  },
  {
    "id": "xdf-5c16e1dda169a33a",
    "type": "choice",
    "text": "___________ fun it is to take a cable car to the top of the hill!\nA. What\nB. What a\nC. How\nD. How a",
    "answer": "A",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 8,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：乘缆车到达山顶多么有趣啊！\nWhat +a/an + 形容词+名词单数（+主语+谓语+其他）+! What +形容词+复数名词（+主语+谓语+其他）\n+！ What +形容词+不可数名词（+主语+谓语+其他）+！How +形容词/副词（+主语+谓语+其他）+！由\n句子中的fun乐趣，不可数名词，然后是主语it，故选C。\n感叹句结构，1. What +a/an + 形容词+名词（+主语+谓语+其他）+!例如：What a clever boy he is!\n或What an interesting story it is !;What +形容词+复数名词（+主语+谓语+其他）+！例如：What\nbeautiful flowers they are!;What +形容词+不可数名词（+主语+谓语+其他）+！例如：What cold\nweather it is ! 2.How +形容词（+a+名词）+（主语+谓语+其他）+！例如：How clever a boy he\nis!How tall he is!;How +形容词/副词（+主语+谓语+其他）+！例如：How lovely the baby\nis! How well she sings!"
  },
  {
    "id": "xdf-efa1897de280a496",
    "type": "choice",
    "text": "It’s our duty to ________ wild animals from danger.\nA. stop\nB. keep\nC. prevent\nD. All of the above",
    "answer": "D",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我们有责任阻止野生动物的危险。\n考查动词辨析。stop停止；keep保持；prevent阻止；All of the above以上都是。stop/keep/prevent\nsb from doing sth“阻止某人做某事”，固定搭配。故选D。"
  },
  {
    "id": "xdf-044a4413c54fb8c4",
    "type": "choice",
    "text": "They ________ dinner at home at 7 yesterday evening.\nA. had had\nB. have\nC. were having\nD. had",
    "answer": "C",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：昨天晚上7点他们正在家里吃晚餐。\n考查过去进行时。根据“at 7 yesterday evening”可知，此处描述过去某个时刻正在发生的事情，应\n用过去进行时，其结构为“was/were doing”。故选C。"
  },
  {
    "id": "xdf-8e616858d14167ff",
    "type": "choice",
    "text": "The air ________ is very serious here now. Please stop ________ it.\nA. pollute; pollution\nB. pollution; polluting\nC. pollution; to pollute\nD. pollution; pollution",
    "answer": "B",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：现在这里的空气污染非常严重。请停止污染它。\n考查词义辨析和非谓语动词。air pollution“空气污染”，排除A。stop doing sth“停止做某事”，\nstop to do sth“停止一件事去做另一件事”，根据“Please stop...it.”可知，是停止污染。故选\nB。"
  },
  {
    "id": "xdf-1372057e2f9731bd",
    "type": "choice",
    "text": "The fish on the plates ________.\nA. smell well\nB. smells well\nC. smells nice\nD. smell nice",
    "answer": "C",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：盘子里的鱼闻起来很香。\n考查系动词和形容词。smell闻起来；well好，副词；nice好的，形容词。根据“The fish on the\nplates”可知，主语是第三人称单数，动词使用smells，感官动词后接形容词nice作表语。故选C。"
  },
  {
    "id": "xdf-cf4a5854ec85b12f",
    "type": "choice",
    "text": "The practice of hanging clothes across the street is a common ________ in many\nparts of the city.\nA. look\nB. sign\nC. sight\nD. appearance",
    "answer": "C",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：在大街上晾晒衣服在这个城市的许多地方是很常见的景象。\n考查名词辨析。look面容；sign标志；sight景象；appearance外貌。根据“The practice of hanging\nclothes across the street”可知，在街上挂衣服是一种常见的景象。故选C。"
  },
  {
    "id": "xdf-19b8dc7061298b1d",
    "type": "choice",
    "text": "—David, you broke the window!\n—Sorry, I didn’t do it ________.\nA. on purpose\nB. on business\nC. by chance",
    "answer": "A",
    "sources": [
      {
        "file": "错题_24_20260922_215625.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：——David，你打碎了窗户！——对不起，我不是故意这么做的。\non purpose故意地，on business出差，by chance偶然地。David在为打碎窗户道歉，是要说明自己不\n是故意做这件事的，只有“故意地”符合语境，应填on purpose。"
  },
  {
    "id": "xdf-e62d68fd56848af7",
    "type": "choice",
    "text": "He prefers to work out the problem himself _______ someone for help.\nA. rather than ask\nB. instead to have\nC. to asking\nD. but not have",
    "answer": "A",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "“prefer to do sth. rather than do sth.” 是一个固定搭配，意思是 “宁愿做某事而不愿做某\n事”。在这个句子中，“prefer” 后面接了 “to work out the problem himself”，“rather\nthan” 后面接动词原形 “ask”，符合这个固定搭配的用法，所以选 A。"
  },
  {
    "id": "xdf-e8f9001177196b4b",
    "type": "choice",
    "text": "Listen!One of my classmates ____ in the music room.（ ）\nA. sing\nB. sings\nC. is singing\nD. are singing",
    "answer": "C",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "根据listen，可知是现在进行时，其结构是主语+be动词+动词的现在分词，主语是one of my\nclassmates，be动词用is，sing的现在分词是singing。\n故选：C。"
  },
  {
    "id": "xdf-1164134265c9c016",
    "type": "choice",
    "text": "________ Joe ________ Lisa is a good storyteller, but they enjoy sharing.\nA. Both…and\nB. Either…or\nC. Neither…nor\nD. Not only…but also",
    "answer": "C",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：乔和丽莎都不擅长讲故事，但他们喜欢分享。\n考查连词辨析。Both…and两者都；Either…or…或者…或者…；要么…要么…；Neither…nor两者都\n不；Not only…but also不但…而且…。根据“but they enjoy sharing.”可知，乔和丽莎都不擅长\n讲故事，设空处应该用Neither…nor既不……也不……。故选C。"
  },
  {
    "id": "xdf-fda4d3fa7c503752",
    "type": "choice",
    "text": "Three fifths of the land in our country ________ used for farming.\nA. is\nB. are\nC. been\nD. be",
    "answer": "A",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我国五分之三的土地用于农业。\n考查主谓一致和动词的语态。分析句子结构可知，句子缺少谓语动词；根据“Three fifths of the\nland in our country”可知，句子的主语是“Three fifths of the land”，表示“五分之三的土\n地”，land是不可数名词，所以谓语动词应该用单数形式，且句子描述的是客观事实，所以应该用一般\n现在时，因此应该用is。故选A。"
  },
  {
    "id": "xdf-aea38ea5e41cf80e",
    "type": "choice",
    "text": "—What ________ on the table?\n—There _______ some meat and vegetables on it.\nA. is; is\nB. is; are\nC. are; are\nD. are; is",
    "answer": "A",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——桌子上是什么？——在它上有一些肉和蔬菜。\n考查be动词和主谓一致。疑问词what作主语，be动词用is；there be遵循“就近原则”，离be动词最近\n的主语meat是不可数名词，be动词用is，故选A。"
  },
  {
    "id": "xdf-bb684da649ca2edc",
    "type": "choice",
    "text": "Over _______ of the Earth's surface is covered with water.\nA. two third\nB. two thirds\nC. two three\nD. two threes",
    "answer": "B",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "分数表达中，分子用基数词，分母用序数词，分子大于 1 时，分母序数词加 “s” ，“三分之二”\n是 “two thirds” ，所以选 B 。"
  },
  {
    "id": "xdf-09edd3286eb97258",
    "type": "choice",
    "text": "I don't have enough money. Can you lend some _______ me now?\nA. for\nB. to\nC. at\nD. from",
    "answer": "B",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "“lend sth. to sb.” 是固定搭配，意为 “把某物借给某人” ，所以这里用 “to” ，所以选 B 。"
  },
  {
    "id": "xdf-3b808554fccd31e1",
    "type": "choice",
    "text": "_________ of the land in that district is covered with trees and grass.\nA. Two-fifth\nB. Two-fifths\nC. Second-fifths\nD. Two-fives",
    "answer": "B",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 8,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意： 该地区五分之二的土地被树木和草地覆盖。\n考查分数表达。分数表达规则：分子基数词 (two)，分母序数词 (fifths)，分子>1时分母加“s”。故\n选B。"
  },
  {
    "id": "xdf-4da8b4e70f73a2e0",
    "type": "choice",
    "text": "According to the survey last week, about ________ of students took part in outdoor\nactivities to release their study pressure.\nA. three fourth\nB. three fourths\nC. third fourths\nD. third four",
    "answer": "B",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：根据上周的调查，大约四分之三的学生参加户外活动来释放学习压力。\n考查分数的表达。分数由分子和分母构成，分子用基数词，分母用序数词；当分子大于1时，分母需\n加“s”；根据选项可知，此处表达四分之三应用three fourths表示。故选B。"
  },
  {
    "id": "xdf-7b7a82dfd6b11bcb",
    "type": "choice",
    "text": "From the study, we know that about ________ of the Earth is covered by forests.\nA. three-fifth\nB. three-fifths\nC. third-fifth\nD. thirds-fifths",
    "answer": "B",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：从这项研究中，我们了解到地球约五分之三的面积被森林覆盖。\n考查分数表达法。分数表达中分子应用基数词，分母用序数词，当分子大于1的时候，分母用复\n数。“three-fifths”准确表示“五分之三”，符合语法要求。故选B。"
  },
  {
    "id": "xdf-94c8e433befa5de6",
    "type": "choice",
    "text": "He cut ________ branches from a tree to make it grow stronger and better.\nA. off\nB. over\nC. of\nD. up",
    "answer": "A",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：他从树上剪掉树枝，让它长得更壮更好。\n考查动词短语搭配。cut off 剪除，切断；cut over 采伐；cut up 切碎。根据“cut…branches”可\n知此处需表示“剪掉”的短语，剪掉树枝让树长得更好。故选A。"
  },
  {
    "id": "xdf-84454647169bcc04",
    "type": "cloze",
    "text": "Future is bright for podcast star\nMost people may not recognise the name Jack Andrews, but they are likely to hear his\nvoice. The fifteen-year-old from Hertford, England, has won a podcast (播客) prize for his\nshow Jack to the Future.\nTwo years ago, Jack showed himself on a local radio station in his home town. He 1\nto be happy and relaxed when telling jokes on air. The boy enjoyed this experience so\nmuch that he decided to record his own podcast. His first problem was to come up with a\n2 name for the show — a name easy to remember but not too usual. Finally, he based\nit on the title of his favourite film, Back to the Future.\nThe 3 of this podcast was to show teenagers’ views on what may happen in the\nfuture. To realize this aim, Jack spent lots of time on social media searching for\nchallenging and fun topics, such as the future of fast food, rail travel and forests.\nNearly every topic was popular with people of all 4 . Teenagers, college students and\neven adults were glad to share their ideas and knowledge on the show.\nIn addition to the rich knowledge and the spirit of hard work, 5 is one more\nimportant reason for the boy to catch the listeners. “His smart jokes and interesting\nideas can always make me laugh to tears,” a teenager said.\n1. A. managed B. needed C. appeared D. promised\n2. A. funny B. proper C. lucky D. clear\n3. A. purpose B. challenge C. request D. design\n4. A. cities B. schools C. ages D. cultures\n5. A. friendship B. language C. confidence D. humour",
    "answer": "1-5 CBACD",
    "sources": [
      {
        "file": "错题_25_20260922_215631.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "1.句意：他在广播中讲笑话时显得开心又放松。\nmanaged设法做到；needed需要；appeared显得；promised承诺。根据“to be happy and relaxed”可\n知，此处指杰克在广播中“看起来”状态良好，appear to be为固定搭配，表示“看起来……”。故选\nC。\n2.句意：他的第一个问题是为节目想出一个合适的名字——一个容易记住但又不太普通的名字。\nfunny有趣的；proper合适的；lucky幸运的；clear清晰的。根据“easy to remember but not too\nusual”可知，杰克需要一个“合适的”名字。故选B。\n3.句意：这个播客的目的是展示青少年对未来可能发生的事情的看法。\npurpose目的；challenge挑战；request请求；design设计。根据“to show teenagers’ views on\nwhat may happen in the future”可知，这是播客的“目的”。故选A。\n4.句意：几乎每个话题都受到各个年龄段的人的欢迎。\ncities城市；schools学校；ages年龄；cultures文化。根据“Teenagers, college students and\neven adults”可知，播客受众涵盖不同“年龄”。故选C。\n5.句意：除了丰富的知识和努力的精神，幽默感是这个男孩吸引听众的另一个重要原因。\nfriendship友谊；language语言；confidence自信；humour幽默。根据“His smart jokes and\ninteresting ideas can always make me laugh to tears”可知，杰克的“幽默”是吸引听众的关\n键。故选D。"
  },
  {
    "id": "xdf-22dba1eba620b73f",
    "type": "choice",
    "text": "—Look! What a heavy rain!\n—It’s _________ bad weather _________ we all have to stay at home at the weekend.\nA. such a, that\nB. /, so that\nC. such, that\nD. so, that",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——看！好大的雨！——天气如此糟糕，以至于我们周末都必须待在家里。\n考查结果状语从句。weather为不可数名词，故用such修饰，而不用so，不可数名词前不能加不定冠词\na；so that引导目的状语从句，而题干是“天气糟糕导致待在家”的结果关系，可排除；结合选项可\n知，C项符合。故选C。"
  },
  {
    "id": "xdf-8671ad5334804e64",
    "type": "choice",
    "text": "I have got _________ much work to do _________ I don’t have time to play with my\nfriends.\nA. too; that\nB. such; that\nC. so; that\nD. too; to",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我有这么多的工作要做，以至于没有时间和朋友们玩。\n考查连词辨析。such/so…that如此……以至于；too…to太……而不能……。根据“I have got…much\nwork to do … I don’t have time to play with my friends”可知，有太多的工作以至于没有时间\n玩，用so修饰much，故选C。"
  },
  {
    "id": "xdf-942d92b4cf7c498e",
    "type": "choice",
    "text": "________ you have finished your homework, you can go out to play football with\nyour friends.\nA. Even though\nB. Now that\nC. As if\nD. So that",
    "answer": "B",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：既然你已经完成了作业，就可以出去和朋友们踢足球了。\n考查从属连词辨析。Even though即使；Now that既然，由于；As if好像，仿佛；So that为了，以\n便。分析句子结构可知，“you have finished your homework”是“you can go out to play\nfootball with your friends”的原因，应用“Now that”引导原因状语从句，强调已知的事实。故选\nB。"
  },
  {
    "id": "xdf-3e351b251a7cca89",
    "type": "choice",
    "text": "We will make fewer mistakes __________ we are careful enough.\nA. as long as\nB. so that\nC. as far as\nD. even if",
    "answer": "A",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：只要我们足够细心，我们就会少犯错误。\n考查连词辨析。as long as只要；so that以便；as far as直到；even if尽管。空前讲“我们将会犯\n更少错误”，空后讲“我们足够细心”，细心是少犯错误的条件，结合选项可知要用as long as引导条\n件状语从句。故选A。"
  },
  {
    "id": "xdf-a0977b50ad716e52",
    "type": "reading",
    "text": "Every summer, thousands of swamp sparrows (沼泽麻雀) sing songs in the North\nAmerica’s wetlands. These special brown birds only know a few songs, but they sing them\nvery well. In fact, their song list hasn’t changed much for hundreds of years.\nLike humans, baby swamp sparrows learn songs from their elders. “Swamp sparrows just\nmake few mistakes when they learn their songs,” says Robert Lachlan. Actually, they copy\nthe music so well that it stays the same from the elder to the young.\n“Just like children, the sparrows don’t remember every song they hear,” Lachlan\nsays. “They just pick up the songs they hear most often. It’s an example of what\nscientists call ‘conformist bias’.” Until recently, this learning ability was thought\nto be special only to humans.\nBetween 2008 and 2009, Lachlan’s team recorded the songs of 615 swamp sparrows. The\nstudy found that only 2% of these sparrows sang a different song. “The song-types (歌曲类\n型) that you hear in the wetland of North America today may have been there 1, 000 years\nago,” says Lachlan.\nHowever, another team found that a few sparrows had changed their song list in recent\nyears. Now scientists are exploring the influence of losing habitat (栖息地). Cities,\nroads and farms can separate a bird population into a number of different groups. It stops\nbirds from sharing their songs with each other.\n________ The future research will start from these studies. For example, scientists\nmight learn how other animals keep their cultural traditions alive.\n1.单选题\nWhat is special about swamp sparrows?\nA. They can sing many songs.\nB. They learn songs from humans.\nC. They help elders make new songs.\nD. They keep the same song list for years.\n2.单选题\nWhat do the underlined words “conformist bias” probably mean in Paragraph 3?\nA. A song list.\nB. A science team.\nC. A learning ability.\nD. A human tradition.\n3.单选题\nWhy did a few sparrows change their song list?\nA. Man-made buildings separated the birds.\nB. The weather changed in North America.\nC. People hunted a large number of swamp sparrows.\nD. Swamp sparrows stayed in the wetland all the year.\n4.单选题\nWhich of the following can be put in “________” in the last paragraph?\nA. Humans should protect these birds.\nB. The findings are really exciting.\nC. Scientists disagree with the results.\nD. The studies are meaningless.\n5.单选题\nWhat can be the best title of the text?\nA. Copy Music From Birds\nB. Protect Traditional Songs\nC. The 1000-year Bird Songs\nD. The Home-losing Animals",
    "answer": "(1) D (2) C (3) A (4) B (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_26_20260922_215637.pdf","number":5,"page":1,"sha256":"625f89babf80c14e5613c08dff03b8f986ddcaef9ddf14d0de17c8d3444c5015"},
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据文章第1段“their song list hasn’t changed much for hundreds of\nyears”和第4段“The study found that only 2% of these sparrows sang a different\nsong”可知，沼泽麻雀的歌曲列表数百年来几乎未变，仅有2%的个体出现差异。故选D。\n\n第 2 小题：\n词句猜测题。根据文章第3段“They just pick up the songs they hear most often”可\n知，他们只是挑选他们最常听到的歌曲。所以“conformist bias”指麻雀通过高频模仿学习\n歌曲的能力。故选C。\n\n第 3 小题：\n细 节 理 解 题 。 根 据 文 章 第 5 段 “Cities, roads and farms can separate a bird\npopulation… It stops birds from sharing their songs”可知，人类建筑导致麻雀种群\n隔离，阻碍歌曲交流。故选A。\n\n第 4 小题：\n推理判断题。根据“The future research will start from these studies”可知，研究结\n果具有启发性，此处与研究结果有关，B选项“这些发现是激动人心的”。故选B。\n\n第 5 小题：\n最佳标题题。主要讲述了沼泽麻雀通过“从众偏好”能力传承千年不变的歌曲，以及人类活\n动对其栖息地和歌曲传承的影响。标题需突出“传承”这一特点。故选C。"
  },
  {
    "id": "xdf-6a947497321225b1",
    "type": "choice",
    "text": "We had to ________ our prices because of the ________ costs.\nA. raised, risen\nB. raise, rising\nC. rise, raising\nD. rise, risen",
    "answer": "B",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 6,
        "page": 2
      },
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 8,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：由于成本上涨，我们不得不提高价格。\n考查动词辨析和非谓语动词。raised提高，raise的过去式和过去分词；risen上升了的，是“rise”的\n过去分词；raise提高，是及物动词；rising正在上升的，rise的现在分词；rise上升，是不及物动\n词；raising是“raise”的现在分词/动名词。第一空，“had to”后接动词原形，“raise”是及物动\n词，意为“提高”，符合“提高价格”的语境；第二空，“rising”是现在分词，作定语修\n饰“costs”，表示“正在上涨的”。故选B。"
  },
  {
    "id": "xdf-d9d83f0dcdef2b32",
    "type": "choice",
    "text": "He seemed ________ his homework when his mother came in, but his behavior seemed\n________.\nA. doing; strangely\nB. having done; strange\nC. to be doing; strangely\nD. to be doing; strange",
    "answer": "D",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：当他妈妈进来的时候，他似乎正在做家庭作业，但他的行为似乎很奇怪。\n考查非谓语动词及形容词作表语。doing动名词；having done现在分词的完成式；to be doing不定式\n的进行式；strange形容词“奇怪的”；strangely副词“奇怪地”。seem to do sth.“似乎做某\n事”，第一空需要填动词不定式，排除选项A和B；seem“似乎”是系动词，其后接形容词作表语，排除\n选项C。故选D。"
  },
  {
    "id": "xdf-54daa747a895fb69",
    "type": "choice",
    "text": "We had to ________ our prices because of the ________ costs.\nA. raised, risen\nB. raise, rising\nC. rise, raising\nD. rising, raising",
    "answer": "B",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 8,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：由于成本上升，我们不得不提高价格。\n考查动词辨析和非谓语动词。raise举起，提高，及物动词；rise上升，升起，不及物动词。根据“had\nto”可知，后接动词原形，且填及物动词raise接“our prices”作宾语；rising是现在分词作定语，\n意为“正在上升的”。故选B。"
  },
  {
    "id": "xdf-4e208f6f449c34e4",
    "type": "choice",
    "text": "—Excuse me, can you tell me how to say 5,607,813 in English？\n—Yes. ________.\nA. Five million six hundred and seven thousand and eight hundred and thirteen\nB. Five millions six hundreds and seven thousands eight hundreds and thirteen\nC. Five million six hundred and seven thousand eight hundred and thirteen\nD. Five million and six hundred and seven thousand and eight hundred and thirteen",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 9,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：——打扰一下，你能告诉我5,607,813用英语怎么说吗？—— 好的，是五百六十万七千八百一十\n三。\n考查基数词表达。million，thousand，hundred前面有具体数字时，其后不能加s；百位和十位/个位之\n间要用and连接；百万和千、千和百中间均不用连词and，结合选项可知，C项符合。故选C。"
  },
  {
    "id": "xdf-f4e4a76711645ead",
    "type": "choice",
    "text": "Thanks to your pieces of useful ________, otherwise, I couldn’t have made such\nprogress.\nA. advice\nB. suggestion\nC. tip\nD. instruction",
    "answer": "A",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 10,
        "page": 3
      },
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：多亏了你那些有用的建议，否则我不可能取得这么大的进步。\n考查名词辨析。advice建议，不可数名词；suggestion建议，可数名词单数；tip建议，可数名词单\n数；instruction说明，可数名词单数。根据“Thanks to your pieces of useful”可知，此处指“有\n用的建议”，应用advice。故选A。"
  },
  {
    "id": "xdf-2eeff5b6bdef23d4",
    "type": "choice",
    "text": "The classroom was ________ students when the teacher arrived.\nA. full with\nB. filled of\nC. full of\nD. filled by",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 11,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：当老师到达的时候，教室里挤满了学生。\n考查固定搭配。be filled with=be full of“充满，满是”，符合结构的是C选项。故选C。"
  },
  {
    "id": "xdf-b03363b98d70f06a",
    "type": "choice",
    "text": "He even picks up all the stones he can find around his garden, _______ the boys\nwould have nothing to throw; but they soon found others.\nA. such that\nB. so that\nC. in order\nD. in order to",
    "answer": "B",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 12,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本题考查so that引导的目的状语从句。根据句意：他捡起了他能找到的所有的石头以便男孩子们没有\n可扔的东西了。so that加从句表示以便。故答案选B。"
  },
  {
    "id": "xdf-39f1b349f6e3c352",
    "type": "choice",
    "text": "When I was walking past the window, I noticed Wang Fei _______ my homework. I\nreally got _______.\nA. copying, annoyed\nB. copying, annoying\nC. copy, annoyed\nD. copied, annoyed",
    "answer": "A",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 13,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "当我走过窗户时，我注意到王飞正在抄写我的作业。我真的很生气。\n第一空考查动词形式。句子结构为notice sb. doing sth.（注意到某人正在做某事），强调动作正在\n进行。选项中只有A、B的copying符合此结构。第二空考查形容词用法。get为系动词，后接表语形容\n词，主语\"I\"的情绪需用annoyed（感到生气的），故选A。其余选项：B的annoying描述事物性质，与主\n语不符；C、D的动词形式错误。"
  },
  {
    "id": "xdf-8bcc6a5640bb03e1",
    "type": "cloze",
    "text": "He who has never been to the Great Wall is not a true man. The US President\n1 2\nBarack Obama is a man. Obama had a days' visit to China from\n15th to 18th November, 2009. He had a very busy schedule(日程). But he still spent\n3\nvisiting the Forbidden City(紫禁城) and the Great Wall.\na leader visits another country, he or she sometimes goes to the\n5 6\ncountry's most places. It is to show the respect to the local .\n7\nFor the leaders, it's also a good time to during a tiring foreign trip.\nObama spent 50 minutes in the Forbidden City on the afternoon of November 17th. He\n8\nthinks the Forbidden City is a wonderful place to visit. He said, \"I'll with\nmy girls and my wife. \"\nOn November 18th, he paid a quick visit to the Great Wall at Badaling. There, he\n9\na moment of peace.\n10\n\"It's magical. It reminds me the course(进程)of history. \"Obama said\nabout the Great Wall.\n1. A. true B. old C. busy D. free\n2. A. two B. three C. four D. third\n3. A. sometimes B. some times C. some time D. sometime\n4. A. So B. When C. Though D. But\n5. A. expensive B. famous C. thrilling D. clean\n6. A. culture B. food C. sight D. city\n7. A. speak B. discuss C. relax D. drink\n8. A. come back B. come up C. come out D. come in\n9. A. dreamed B. enjoyed C. understood D. found\n10. A. of B. at C. on D. for",
    "answer": "1-5 ACCBB 6-10 ACABA",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 14,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "1.文章主要讲述奥巴马总统访问中国时，特意安排了时间参观故宫和长城。领导人访问其他国家时，通\n常会去当地最著名的地方，以示对当地文化的尊重。奥巴马对故宫和长城都留下了深刻的印象，他表示\n将和家人再次访问这些地方。他在长城上感受到了历史的厚重，称其为神奇。\n考查形容词。句意：美国总统巴拉克•奥巴马是一个好汉。A.真实的；B.老的；C.忙碌的；D.有空的。\n根据He who has never been to the Great Wall is not a true man.（不到长城非好汉。）可知，美\n国总统巴拉克•奥巴马是一个好汉，所以应填true。故选A。\n2.考查数词。句意：2009年11月15日至18日，奥巴马对中国进行了为期四天的访问。A.二；B.三；C.\n四；D.第三。根据from 15th to 18th November（11月15日至18日）可知，是四天。故选C。\n3.考查短语。句意：但是他仍然花了一些时间去参观故宫和长城。A.有时；B.几次；C.一些时间；D.在\n某时。根据spent\"花费\"可知，是花一些时间去参观故宫和长城。故选C。\n4.考查连词。句意：当一个领导人访问另一个国家时，他或她有时会去这个国家最著名的地方。A.所\n以；B.当......的时候；C.虽然；D.但是。分析句子可知，此处为时间状语从句，所以应用When引导。\n故选B。\n5.考查形容词。句意：当一个领导人访问另一个国家时，他或她有时会去这个国家最著名的地方。A.昂\n贵的；B.著名的；C.令人兴奋的；D.干净的。根据But he still spent some time visiting the\nForbidden City（紫禁城） and the Great Wall.（但是他仍然花了一些时间去参观故宫和长城。）可\n知，是去最著名的地方。故选B。\n6.考查名词。句意：这是对当地文化的尊重。A.文化；B.食物；C.视力；D.城市。根据When a leader\nvisits another country，he or she sometimes goes to the country's most famous places.（当\n一个领导人访问另一个国家时，他或她有时会去这个国家最著名的地方。）可知，是对当地文化的尊\n重。故选A。\n7.考查动词。句意：对于领导人来说，这也是在疲惫的国外旅行中放松的好时机。A.说；B.讨论；C.放\n松；D.喝。根据during a tiring foreign trip（在一次疲惫的国外旅行中）可知，是放松。故选C。\n8.考查短语。句意：我会带着我的女儿和妻子回来的。A.回来；B.发生；C.出现；D.进来。根据He\nthinks the Forbidden City is a wonderful place to visit.（他认为故宫是一个参观的好地方。）\n可知，是会带着女儿和妻子再来参观故宫。故选A。\n9.考查动词。句意：在那里，他享受了片刻的宁静。A.梦想；B.享受；C.了解；D.发现。根据a moment\nof peace（片刻的宁静）可知，是享受片刻的宁静。故选B。\n10.考查介词。句意：它让我想起了历史的进程。A.......的；B.在；C.在......上；D.为。remind\nsb.of\"使某人想起\"，固定短语。故选A。"
  },
  {
    "id": "xdf-49c090c91b7750ea",
    "type": "choice",
    "text": "-________ his talk, he touched the old problem: the unemployment.\nA. In middle of\nB. In the center of\nC. In the middle of\nD. In center of",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 15,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "本题考查介词短语的正确用法。句子意为“在他的演讲中，他提到了老问题：失业。”需选择表\n示“在……中间”的短语。\n选项C（In the middle of）：固定短语 表示时间或过程的“中间阶段”，符合语境。\n选项A（In middle of）：缺少定冠词 ，错误。\n选项B（In the center of）： 指空间上的“中心”，如 ，不能表示时\n间或过程。\n选项D（In center of）：既缺少 ，又用错词（应为 ），双重错误。\n综上，正确答案为C。"
  },
  {
    "id": "xdf-5fe5d63c7cf6e5c8",
    "type": "choice",
    "text": "I like biology best because there is a lot of ________ in ________.\nA. wildlife; natural\nB. wildlives; nature\nC. wildlife; nature",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 16,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：我最喜欢生物学，因为在自然界中有很多野生动物。\n考查名词辨析和固定搭配。wildlife野生生物，是不可数名词；wildlives错误形式；natural自然的；\nnature自然。根据“I like biology best because there is a lot of... in...”可知，我最喜欢生\n物学，因为在自然界中有很多野生动物。第一空，“a lot of”后需用名词，使用wildlife，a lot of\nwildlife“很多野生动物”；第二空，介词“in”后需用名词，表示地点或领域，使用nature，in\nnature“在自然界”。故选C。"
  },
  {
    "id": "xdf-2681a98978cefee6",
    "type": "choice",
    "text": "Eating a ________ diet helps us to keep a _______ of your body.\nA. balanced; balance\nB. balance; balance\nC. balancing; balancing\nD. balance; balanced",
    "answer": "A",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 17,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：均衡饮食有助于我们保持身体的平衡。\n考查词义辨析。balanced平衡的，形容词；balance平衡，名词。第一空修饰名词diet，应填\nbalanced；a后接名词，所以第二空应填balance，故选A。"
  },
  {
    "id": "xdf-554faa1dafd2e712",
    "type": "choice",
    "text": "The paintings 1 have been bought by a rich businessman.\nA. are on display\nB. on display\nC. in display\nD. are in display",
    "answer": "B",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 18,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "考查介词短语。on display意为“展出”，固定搭配，所以排除C、D；分析句子成分可知空格是the\npaintings的后置定语，A句子成分不完整；所以，用短语on display当后置定语，意为“展出的画”，\n故选B。\n【句意】展出的画已经被一位富商买了。"
  },
  {
    "id": "xdf-6664ea1103d92778",
    "type": "choice",
    "text": "If you ______, you should rest well and drink warm water.\nA. have flu\nB. have a flu\nC. have the flu\nD. have flu the",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 19,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：如果你得了流感，你应该好好休息并喝温水。\n考查短语have the flu。have the flu“患流感”，是动词短语，故选C。"
  },
  {
    "id": "xdf-57bea19890d32eec",
    "type": "choice",
    "text": "Be quick，please．We need to 1 ．\nA. save time\nB. kill time\nC. spend time\nD. have time",
    "answer": "A",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 20,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "本题考查动词。\n解题要点：根据句意，请快点。我们需要节省时间。\nA. save time 节省时间\nB. kill time 消磨时间\nC. spend time 花费时间\nD. have time 有时间。\n故答案为A。"
  },
  {
    "id": "xdf-66e7e70d0272aa1c",
    "type": "choice",
    "text": "Hunting often ________ the lives of ________ animals.\nA. endangers; endangered\nB. endanger; endangered\nC. endangered; endanger\nD. endangers; endanger",
    "answer": "A",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 21,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：狩猎常常危及濒危动物的生命。\n考查主谓一致及形容词的用法。endangers危及，动词三单形式；endangered濒危的，形容词；\nendanger危及，动词原形。第一空，Hunting是动名词作主语，谓语动词用第三人称单数形式，\nendanger的第三人称单数形式是endangers；第二空需用形容词作定语修饰animals。故选A。"
  },
  {
    "id": "xdf-9a608710ac1631a0",
    "type": "choice",
    "text": "—Which shirt ________, the red one or the orange one?\n—I don’t like red. I ________ wear orange.\nA. would you rather; prefer\nB. would you rather; would rather\nC. do you prefer; would rather\nD. do you prefer; prefer",
    "answer": "C",
    "sources": [
      {
        "file": "错题_26_20260922_215637.pdf",
        "number": 22,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "句意：——你更喜欢哪件衬衫，红色的还是橙色的？——我不喜欢红色。我宁愿穿橙色的。\n考查固定短语。“would rather do sth.宁愿做...”；“prefer更喜欢”，两者之间的选择\n用“prefer”。故选C。"
  },
  {
    "id": "xdf-6b0e87d31b07b0cf",
    "type": "choice",
    "text": "We had built three bridges over the river _________ of 1994.\nA. by the end\nB. at the end\nC. on the end\nD. in the end",
    "answer": "A",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：到1994年末，我们在那条河上已经建造三座桥。\n考查介词短语。by the end of到……为止；at the end of在……结尾；on the end of在……的端\n头；in the end of在……的最后。根据“had built three bridges over the river … of 1994”可\n知，句子为过去完成时，指到1994年末为止，by the end of常与完成时连用，符合语境。故选A。"
  },
  {
    "id": "xdf-3e3543911ef8f176",
    "type": "choice",
    "text": "The Boeing 777 aircraft MH370 suddenly ________ from radar on March 8, 2014 while\ncarrying 239 people from Kuala Lumpur to Beijing.\nA. disappear\nB. disappeared\nC. has disappeared\nD. will disappear",
    "answer": "B",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：2014年3月8号，载着239人的波音777马航370从吉隆坡到北京的时候，突然从雷达上消失了。\n考查一般过去时。disappear一般现在时；disappeared一般过去时；has disappeared现在完成时；\nwill disappear一般将来时。根据“March 8, 2014”可知表达的是过去的事情，用一般过去时。故选\nB。"
  },
  {
    "id": "xdf-462d067bbd9d8bc6",
    "type": "choice",
    "text": "_______ most DreamWorks movies, the story of Kung Fu Panda took place in an\nancient Chinese village and the film has much Chinese culture in it.\nA. Unlike\nB. According to\nC. Except\nD. Instead of",
    "answer": "A",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：与梦工厂的大多数电影不同的是，《功夫熊猫》的故事发生在一个古老的中国村庄，里面有很多\n中国文化。\n考查介词辨析。Unlike不像，和……不同；According to根据；Except除……外，不包括；Instead of\n代替，而不是。根据“the story of Kung Fu Panda took place in an ancient Chinese village\nand the film has much Chinese culture in it”可知《功夫熊猫》故事发生在中国且有许多中国文\n化，结合常识“梦工厂”是美国的电影工作室，大多数电影都应与之不同。故选A。"
  },
  {
    "id": "xdf-3e6bd9357a20b230",
    "type": "choice",
    "text": "I think perhaps people will live on other planets. The underlined word means\n“_________”.\nA. may be\nB. possible\nC. certainly\nD. maybe",
    "answer": "D",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我想也许人们会住在其他星球上。划线的词表示“也许”。\n考查词汇辨析。may be也许是；possible可能的；certainly无疑，确定；maybe或许，也许。根句中划\n线单词perhaps是副词，表示“可能，也许”，与maybe同义。故选D。"
  },
  {
    "id": "xdf-739d4714f10364a2",
    "type": "choice",
    "text": "Although Fred and Doris were poor farmers, ________ they worked hard and lived\nhappily.\nA. because\nB. /\nC. but\nD. since",
    "answer": "B",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：尽管弗雷德和多丽丝是贫穷的农民，但他们工作努力，生活幸福。\n考查连词。because因为；but但是；since自从。此处是although引导的让步状语从句，不和but连用。\n故选B。"
  },
  {
    "id": "xdf-d85c3d9c1a9a5787",
    "type": "choice",
    "text": "Xiao Wei showed ________ great courage that he was praised by his parents.\nA. so\nB. such\nC. such a\nD. so a",
    "answer": "B",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 6,
        "page": 1
      },
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 34,
        "page": 11
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 13,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "句意：小伟表现出了如此大的勇气，以至于他受到了父母的表扬。\n考查固定句型。“so + 形容词 / 副词 + that...” 与 “such + (a/an) + 形容词 + 名词 +\nthat...” 都可表示 “如此…… 以至于……” 。此处 “courage”（勇气 ）是不可数名词，不能\n用 “a/an” ，要用 “such + 形容词 + 不可数名词 + that...” 结构，所以用 “such” 。故选\nB。"
  },
  {
    "id": "xdf-a650ae5d2c0ff04b",
    "type": "choice",
    "text": "She is________ that our teacher likes her very much.\nA. such nice a girl\nB. such a nice girl\nC. so nice girl\nD. a so nice girl",
    "answer": "B",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 7,
        "page": 1
      },
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 33,
        "page": 11
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 14,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "句意：她是如此好的一个女孩，以至于我们老师非常喜欢她 。“such + a/an + 形容词 + 可数名词单\n数 + that...”（如此…… 的一个…… 以至于…… ）；“so + 形容词 + a/an + 可数名词单数 +\nthat...” 。“such a nice girl” 符合结构，A 缺 “a” ，C 、D 结构错误。故选 B 。"
  },
  {
    "id": "xdf-f1d4393dc425d48e",
    "type": "choice",
    "text": "I brought an umbrella with me ________ I wouldn’t get wet in the rain.\nA. as soon as\nB. in order to\nC. so that\nD. unless",
    "answer": "C",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 8,
        "page": 2
      },
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 32,
        "page": 11
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 15,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "句意：我随身带了一把雨伞，这样我就不会被雨淋湿了。\n考查连词短语辨析。as soon as一……就……，引导时间状语从句；in order to为了，后接动词原\n形，不引导从句；so that以便，为了，引导目的状语从句；unless除非，引导条件状语从句。根据句\n意可知，带雨伞的目的是为了不被雨淋湿，空格后是一个完整的句子，所以此处应用so that引导目的\n状语从句。故选C。"
  },
  {
    "id": "xdf-c2c07d94fdc13cb2",
    "type": "choice",
    "text": "The stockings are _______.\nA. too small for her to wear them\nB. so small that she can’t wear\nC. big enough for her to wear them\nD. so small that she can’t wear them",
    "answer": "D",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 9,
        "page": 2
      },
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 47,
        "page": 16
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 15,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "选项 A：“too... to...” 结构中，“to” 后的动词逻辑宾语是句子主语（the stockings\n），“wear them” 中 “them” 多余，因为 “wear” 的宾语就是 “the stockings” ，所以 A\n错。\n选项 B：“so... that...” 结构中，“wear” 是及物动词，后面需接宾语，“she can’t wear”\n缺少宾语，所以 B 错。\n选项 C：句意逻辑矛盾，“big enough”（足够大 ）与 “wear them”（穿它们 ）搭配，但结合语境\n应该是 “太小不能穿” ，且同样存在 “them” 多余问题，所以 C 错。\n选项 D：“so small that she can’t wear them” ，“so... that...” 引导结果状语从\n句，“wear” 后接 “them”（指代 the stockings ）作宾语，结构和语义都正确，所以选 D 。"
  },
  {
    "id": "xdf-dafaa5c629a3c7fc",
    "type": "choice",
    "text": "Everyone should face the fault with courage __________ there’s fear in the heart.\nA. as if\nB. even if\nC. no matter what\nD. so that",
    "answer": "B",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：每个人都应该有勇气面对错误，虽然心中有恐惧。\n考查连词辨析。as if好像；even if虽然；no matter what无论什么；so that以便于。题中后半句表\n示“心中有恐惧”，前半句又说应该勇于面对错误，由此可知前后是让步关系，用even if引导让步状\n语从句。故选B。"
  },
  {
    "id": "xdf-da837acd6f56c883",
    "type": "choice",
    "text": "______ I admit his good points, I can see his bad ones.\nA. When\nB. As\nC. While\nD. Before",
    "answer": "C",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "while 除了引导时间状语从句外，还可以引导让步状语从句，做“尽管，虽然”讲，有着强烈的对比意\n味。"
  },
  {
    "id": "xdf-de39684bafd5f70a",
    "type": "reading",
    "text": "①________ But many people don’t know the ways to read a difficult book. The\nfollowing steps will help you feel relaxed by the book you read.\n②________ Pay attention to what you can catch, and leave behind what you can not. You\nmay understand something important through reading. However, there are some ideas that you\nmay not follow. But remember to move on and you will get the main idea of the book.\nCatch the main point. You may find that each section of the book needs special\nattention. However, it’s not good to keep your eyes on every word. It is better to get a\ngeneral idea of the book rather than reading the whole book carefully. The faster you\nread, the better you are at reading.\n③________ This time you’d better read more slowly and more carefully. You should\ncatch more details of the book. When you read the book for the second time, you would\nunderstand much that you did not understand earlier.\nReading books is not a difficult task any longer if you know how to read a difficult\nbook. It all depends on how you enjoy it. Difficulty lies in the mind, but not in the\nbook. Therefore, don’t be afraid of a difficult book. Try to keep the above reading\nskills in mind, and you’ll get unexpected results!\n1.单选题\nMatch the title with each paragraph.\na.Give it a first read. b. Reading a book is helpful.\nc.Give it a second read. d.Read more difficult books.\nA. ①-b,②-a,③-c\nB. ①-b,②-d,③-c\nC. ①-d,②-c,③-a\nD. ①-d,②-b,③-c\n2.单选题\nWe’d better ________ if we can’t understand some ideas.\nA. stop reading the book\nB. go on reading the book\nC. keep our eyes on every word\nD. ask someone for help\n3.单选题\nWhich of the following is TRUE according to the passage?\nA. Always read the whole book carefully.\nB. Keep your reading speed fast.\nC. Keep your eyes on every word to get the main idea.\nD. Get details of the book in the second time.\n4.单选题\nThe passage is probably a(n) ________.\nA. folk story\nB. science fiction novel\nC. exposition (说明文)\nD. science report",
    "answer": "(1) A (2) B (3) D (4) C",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_27_20260922_215644.pdf","number":12,"page":2,"sha256":"0afb6dfa8574a91b6788b15b3db227c2cf1bd1cc37d43ca90d37cab952db2de2"},
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据第一段“But many people don’t know the ways to read a difficult\nbook”及后文提到阅读技巧，可知①对应标题b“阅读很有用”；第二段②提到“Pay\nattention to what you can catch, and leave behind what you can not”可知此处建议\n抓住能理解的部分，跳过不懂的，对应标题a“先通读一下”；第四段③提到“This time\nyou’d better read more slowly and more carefully”可知第二次应更仔细阅读，对应标\n题c“读第二遍”。故选A。\n\n第 2 小题：\n细节理解题。根据第二段“But remember to move on and you will get the main idea of\nthe book”可知遇到不理解的内容时应继续阅读。故选B。\n\n第 3 小题：\n细节理解题。根据第四段“you should catch more details of the book”可知第二次应抓\n住更多细节。故选D。\n\n第 4 小题：\n推理判断题。全文通过步骤说明如何阅读难书，属于说明文，故选C。"
  },
  {
    "id": "xdf-442bbd33f25919ac",
    "type": "choice",
    "text": "She was ________ careless ________ she hurt herself.\nA. so; that\nB. so; as to\nC. in order; that\nD. in order; to",
    "answer": "A",
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 13,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：她太粗心了，弄伤了自己。\n考查结果状语从句。so...that如此……以至于……；so as to为了；in order that为了；in order\nto为了。根据“She was...careless...she hurt herself.”可知，她太粗心了，以致伤了自己，应用\nso...that引导结果状语从句，故选A。"
  },
  {
    "id": "xdf-563432a12b2a4632",
    "type": "reading",
    "text": "Gibbons (长臂猿) singers\nScientists have discovered\nthat a male and a female gibbons\nsing songs together. The two\ngibbons make their sounds at the\nsame time and make noises at\ncertain breaks. This duet\nsuggests that, unlike most other\nanimals, they have rhythm and it\nis the basic need for most\nmusic.\nAccording to scientists, a\nduet seems to make the gibbons\nget closer to each other. They\nhope this can give them more\ninformation about how living\nthings change over time to get\nalong with nature.\nSalt Lake drying up\nScientists think\nUtah’s Great Salt\nLake will disappear\nwithin just five\n3\nyears. The lake is\nEvery year, between 40 and 60 lynxes (山\ndrying up because\n猫) die from cars in Spain. Local people\npeople use too much\nare hoping to create a kind of tracking\nwater. It has now\ncollars (追踪项圈) to save lynxes. When\nlost 73% of its\na lynx with a collar goes towards a road,\nwater. Scientists\nthe system inside will start a road sign\nworry that the lake\nto warn drivers that a lynx is nearby.\nwill give out\nsomething bad into\nthe air when drying\nup. And that will\ndamage the nature.\n1.单选题\nAccording to scientists, the most important part for most music is ________.\nA. voice\nB. rhythm\nC. theme\nD. melody\n2.单选题\nThe underlined word “duet” probably means ________.\nA. playing music alone\nB. dancing with rhythm\nC. acting in groups\nD. singing in pairs\n3.单选题\nThe proper title to fill in the blank should be ________.\nA. Worried Drivers\nB. Strange Road Signs\nC. Lynxes in Danger\nD. Tracking Collars in Use\n4.单选题\nScientists think the Utah’s Great Salt Lake will disappear because ________.\nA. the world temperature is going up\nB. the ground of the earth is moving\nC. factories are polluting it\nD. people are overusing it\n5.单选题\nYou can probably find these passages in the ________ section of a magazine.\nA. Fun facts of animals\nB. Animals and the environment\nC. News of the world\nD. Advice from readers",
    "answer": "(1) B (2) D (3) C (4) D (5) B",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_27_20260922_215644.pdf","number":14,"page":3,"sha256":"0afb6dfa8574a91b6788b15b3db227c2cf1bd1cc37d43ca90d37cab952db2de2"},
    "sources": [
      {
        "file": "错题_27_20260922_215644.pdf",
        "number": 14,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据文中“they have rhythm and it is the basic need for most\nmusic.”可知，长臂猿的二重唱表明节奏是大多数音乐的基本需求。故选B。\n\n第 2 小题：\n词句猜测题。根据文中“a male and a female gibbons sing songs together. The two\ngibbons make their sounds at the same time and make noises at certain breaks.\nThis duet suggests that...”可知，两只长臂猿同时发出声音，并在特定的休息时间发出\n声音，“duet”指雌雄长臂猿同时发声的对唱行为。故选D。\n\n第 3 小题：\n最佳标题题。根据该段描述“Every year, between 40 and 60 lynxes (山猫) die from\ncars in Spain. Local people are hoping to create a kind of tracking collars (追踪\n项圈) to save lynxes.”可知，核心内容是山猫面临的危险。故选C。\n\n第 4 小题：\n细节理解题。根据文中“The lake is drying up because people use too much\nwater.”可知，大盐湖干涸的原因是人类过度用水。故选D。\n\n第 5 小题：\n推理判断题。综合三则内容（长臂猿行为研究、山猫保护措施、盐湖生态危机）均涉及动物\n与环境的关系，所以应该是在杂志的“动物与环境”板块看到该文章，故选B。"
  },
  {
    "id": "xdf-11045491d2e59e3b",
    "type": "choice",
    "text": "The teacher speaks very loudly _______ all the students can hear her.\nA. such that\nB. because\nC. in order to\nD. in order that",
    "answer": "D",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "根据句意：老师大声说为了让所有的学生都听见。选in order that为了。选项A，such that如此；选\n项B，because因为与句意不符可排除；选项C，in order to为了后面加不定式，而非句子，故排除。"
  },
  {
    "id": "xdf-0296c735630e9c4b",
    "type": "choice",
    "text": "Yesterday morning I got up early ________ be late for the exam.\nA. in order to\nB. in order to not\nC. so as to\nD. so as not to",
    "answer": "D",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：昨天早上我起得很早，以免考试迟到。\n考查不定式的否定形式。in order to为了；in order to not错误结构（否定词位置不当）；so as to\n为了；so as not to为了不。“早起”的目的是“不迟到”，需用否定形式的不定式短语，且“so as\nnot to”为固定搭配，表示“为了不”。故选D。"
  },
  {
    "id": "xdf-f09c825e237ee682",
    "type": "choice",
    "text": "________ it’s raining outside, we’d better have dinner at home.\nA. Although\nB. As soon as\nC. If\nD. Now that",
    "answer": "D",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：既然外面在下雨，我们最好在家吃晚饭。\n考查连词辨析。Although虽然，尽管，引导让步状语从句；As soon as一……就……，引导时间状语从\n句；If如果，引导条件状语从句，强调假设的情况；Now that既然，由于，引导原因状语从句，强调已\n知的事实。根据句意，“外面在下雨”是已知的事实，且以此为理由建议在家吃晚饭，因此用Now that\n引导从句。故选D。"
  },
  {
    "id": "xdf-c5b5b4b26a8be59f",
    "type": "choice",
    "text": "The robbers escaped quickly ________ the alarm rang.\nA. as long as\nB. before\nC. as soon as\nD. since",
    "answer": "C",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：警报一响，劫匪就迅速逃跑了。\n考查连词辨析。as long as只要，引导条件状语从句；before在……之前，引导时间状语从句；as\nsoon as一……就……，引导时间状语从句；since自从/因为，引导时间或原因状语从句。根据“The\nrobbers escaped quickly…the alarm rang”可知，“警报响起”和“劫匪逃跑”是先后发生的连贯\n动作，警报一响，劫匪就跑了，as soon as符合逻辑。故选C。"
  },
  {
    "id": "xdf-6a4a1fccf036f552",
    "type": "choice",
    "text": "Babies never stop discovering ________ they fall asleep.\nA. while\nB. after\nC. until\nD. as soon as",
    "answer": "C",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：婴儿们直到睡着才停止探索。\n考查连词辨析。while当……时候；after在……之后；until直到；as soon as一……就……。句\n中“never stop”与“until”构成“直到……才……”的固定结构，表示动作持续到某个点才停止。\n故选C。"
  },
  {
    "id": "xdf-7d67d3b66c97af45",
    "type": "cloze",
    "text": "Each Sunday, Leo visits his grandpa. His hearing isn’t good, so Leo often\nhas to repeat (重复) himself loudly. Sometimes, Grandpa 1 can’t understand him. Leo\nwould just stop and feel a little sad.\nOne Sunday, Leo’s mother gave him a small notebook. “Why don’t you try 2 with\nGrandpa?” she said. Leo wasn’t sure, but he put the notebook in his pocket.\nAt Grandpa’s house, Leo asked about the old 3 on the wall. Grandpa shook his\nhead, “What? Speak louder, Leo.” Remembering the notebook, Leo 4 it out. He wrote\ndown his question: “ 5 is this photo from?”\nGrandpa took the notebook, put on his glasses, and his face lit up (喜形于色). “Ah!\nThis was 6 my first fishing trip!” he said, and then he began to write back. He told\nLeo a wonderful story about that day, filling almost a whole page.\nLeo read it and felt so 7 . For the first time, he heard a story from Grandpa\nwithout any “What?” or “Pardon?”. They spent the whole afternoon 8 stories and\nquestions in the notebook. When Leo drew a funny fish next to his words, Grandpa laughed\nout loud.\nThat evening, when it was time to leave, Grandpa hugged Leo a little 9 . “Come\nagain next Sunday,” he wrote in the notebook, “and bring your 10 . We have more\nstories to tell.”\nOn the way home, Leo didn’t feel sad anymore. He understood something important.\nSometimes, communication isn’t just about 11 . When words are hard to hear, we can use\na pen. When a voice is difficult to understand, we can share a 12 that can warm\nothers. True communication is about finding a way to 13 each other’s hearts.\nNow, the little notebook is almost 14 . But Leo isn’t worried. He and Grandpa have\nalready bought a new one together. Their conversation, in their own special way, will\nnever 15 .\n1. A. even B. never C. still D. yet\n2. A. drawing B. reading C. writing D. playing\n3. A. photo B. painting C. map D. clock\n4. A. gave B. took C. put D. handed\n5. A. When B. Where C. Why D. How\n6. A. from B. in C. for D. with\n7. A. bored B. tired C. happy D. nervous\n8. A. sharing B. hearing C. making D. creating\n9. A. shorter B. longer C. slower D. colder\n10. A. pen B. photo C. computer D. dictionary\n11. A. hands B. eyes C. noses D. voices\n12. A. meal B. joke C. silence D. smile\n13. A. touch B. break C. lose D. search\n14. A. new B. clean C. lively D. full\n15. A. start B. change C. end D. return",
    "answer": "1-5 CCABB 6-10 ACABA 11-15 DDADC",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "1.句意：有时候，爷爷仍然不能理解他。\neven甚至；never从不；still仍然；yet还。根据上文“His hearing isn’t good, so Leo often has\nto repeat himself loudly.”可知，爷爷听力不好，Leo大声重复后，他有时仍然无法理解。故选C。\n2.句意：“你为什么不试着和爷爷写字交流呢？”她说。\ndrawing画画；reading阅读；writing写字；playing玩。根据下文“Leo’s mother gave him a small\nnotebook.”可知，妈妈给了他一个笔记本，建议他写字交流。故选C。\n3.句意：在爷爷家，Leo问起墙上那张旧照片。\nphoto照片；painting画；map地图；clock钟。根据下文“... is this photo from?”可知，Leo问的\n是墙上的旧照片。故选A。\n4.句意：想起笔记本，Leo把它拿了出来。\ngave给；took拿；put放；handed递。根据“Remembering the notebook, Leo...it out.”可知，Leo\n从口袋里拿出笔记本，take out为固定搭配。故选B。\n5.句意：他写下问题：“这张照片来自哪里？”\nWhen什么时候；Where哪里；Why为什么；How怎样。根据下文“This was ... my first fishing\ntrip!”可知，问的是照片来自哪里。故选B。\n6.句意：“啊！这来自我第一次钓鱼之旅！”他说。\nfrom来自；in在……里；for为了；with和。根据上文“... is this photo from?”可知，回答用be\nfrom。故选A。\n7.句意：Leo读了之后感到非常开心。\nbored无聊的；tired疲惫的；happy开心的；nervous紧张的。根据下文“For the first time, he\nheard a story from Grandpa without any ‘What?’ or ‘Pardon?’.”可知，他第一次顺利听故\n事，所以很开心。故选C。\n8.句意：他们整个下午都在笔记本里分享故事和问题。\nsharing分享；hearing听见；making制作；creating创造。根据上下文，他们通过写字互相分享故事与\n问题。故选A。\n9.句意：那天晚上，到该离开的时候，爷爷抱了Leo更久一点。\nshorter更短；longer更长；slower更慢；colder更冷。根据爷爷开心的心情以及希望Leo再来可知，拥\n抱时间更长。故选B。\n10.句意：“下周日再来，”他在笔记本上写道，“带上你的笔。”\npen钢笔；photo照片；computer电脑；dictionary字典。根据他们一直在笔记本上写字交流可知，让他\n带上笔。故选A。\n11.句意：他明白了一件重要的事。有时候，交流不仅仅关于声音。\nhands手；eyes眼睛；noses鼻子；voices声音。根据下文“When words are hard to hear, we can\nuse a pen.”可知，交流不只是用声音。故选D。\n12.句意：当话语难以听清时，我们可以分享一个能温暖他人的微笑。\nmeal一餐；joke玩笑；silence沉默；smile微笑。根据“we can share a...that can warm\nothers.”可知，温暖他人的是微笑。故选D。\n13.句意：真正的交流是找到一种触动彼此心灵的方式。\ntouch触动；break打破；lose失去；search寻找。根据“warm others”和“each other’s\nhearts”可知，是触动心灵。故选A。\n14.句意：现在，这个小笔记本几乎写满了。\nnew新的；clean干净的；lively生动的；full满的。根据“But Leo isn’t worried. He and Grandpa\nhave already bought a new one together.”可知，旧本子快写满了。故选D。\n15.句意：他们用自己特别方式的对话，永远不会结束。\nstart开始；change改变；end结束；return返回。根据前文他们买了新本子，会继续交流，所以对话不\n会结束。故选C。"
  },
  {
    "id": "xdf-bde0b30eb8bb21af",
    "type": "cloze",
    "text": "David began studying in Germany two years ago. The college was a little far\nfrom 1 he lived, so he had to take the subway every day. This clever student soon\n2 it was easy to escape from (逃避) buying the subway tickets, so he often went and\nreturned without a ticket to save money. As a result, he had been caught with no ticket in\nthe subway four times, 3 he never took them to heart. He thought what he should pay\n4 attention to was his study. He did work very hard and graduated with amazing\nacademic achievements (学术成就) a month ago.\nEveryone, 5 himself, thought he would get a good job easily in Germany and had a\nbright future. He went to a big local company 6 . But to his disappointment, he was\nnot even allowed the chance for an interview! He then went to 7 famous company, only\nto receive the same treatment (待遇). When he was turned down a third time, he couldn’t\nhelp telephoning the company to ask why they didn’t want 8 . The answer was simple.\n“We don’t offer jobs to dishonest people in Germany!”\nWe may get short-term benefits by dishonest ways, but the truth will come out sooner\nor later and the cost is high. So remember, honesty is the best policy.\n1. A. what B. where C. when\n2. A. find B. finding C. found\n3. A. so B. and C. but\n4. A. more B. much C. many\n5. A. include B. includes C. including\n6. A. confident B. confidently C. confidence\n7. A. another B. other C. others\n8. A. he B. him C. himself",
    "answer": "1-5 BCCAC 6-8 BAB",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "1.句意：这所大学离他住的地方有点远，所以他不得不每天坐地铁。\nwhat什么；where哪里；when当……时。根据“he lived”可知，此处表示居住的地方，用表示地点的\n连词where。故选B。\n2.句意：这个聪明的学生很快发现逃避买地铁票很容易，因此他常常往返不购票，以节省开支。\nfind发现，动词原形；finding动名词或现在分词；found动词过去式或过去分词。根据“it was easy\nto ...”可知，时态是一般过去时，动词用过去式。故选C。\n3.句意：结果，他在地铁上被逮到过四次，但是他从没把它们放在心上。\nso所以；and和；but但是。空前后句是转折关系，用but连接。故选C。\n4.句意：他认为更应关注的是学习。\nmore更多；much很多；many很多。根据“what he should pay ... attention to was his study”及\n前文介绍逃票被抓住却没放在心上可知，此处是指他觉得更应该关注的是学习，空处暗含比较，用\nmore。故选A。\n5.句意：包括他自己在内，所有人都以为他很容易能在德国找到一份好工作，并拥有光明的前途。\ninclude包括，动词原形；includes动词第三人称单数；including介词。根据“Everyone, ...\nhimself, thought ...”可知，空处应用介词，构成介词短语在句中作插入语。故选C。\n6.句意：他自信地去了一家大公司。\nconfident自信的，形容词；confidently副词；confidence名词。空处修饰动词went，用副词形式。故\n选B。\n7.句意：他然后去了另一家知名公司，竟然受到了同样的待遇。\nanother另一个，后跟名词单数；other其他的，后跟名词复数；others其他人或物。空后是名词单数\ncompany，用another修饰。故选A。\n8.句意：当他第三次被拒绝时，他忍不住给公司打了电话，询问为何他们不想要他。\nhe他，主格代词；him宾格代词；himself他自己，反身代词。空处作动词want的宾语，用宾格代词。故\n选B。"
  },
  {
    "id": "xdf-e828edb75fc7590e",
    "type": "choice",
    "text": "When Mike got to the airport, he found he ________ his passport at home.\nA. left\nB. has left\nC. had left\nD. was left",
    "answer": "C",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 8,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：当迈克到达机场时，他发现他把护照忘在家里了。主句谓语found表明是一般过去时，而“忘带\n护照”这一动作发生在“发现”之前，即“过去的过去”，空格处是从句谓语，需用过去完成时（had\n+ 过去分词）来表示时间上是“过去的过去”，即had left。"
  },
  {
    "id": "xdf-5894c32905bbde1e",
    "type": "choice",
    "text": "It was warm and sunny and the bird ______ down and began to ______ eggs.\nA. lied; lay\nB. lay; laid\nC. lay; lay\nD. lay; lie",
    "answer": "C",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 9,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：天气温暖晴朗，鸟儿躺下开始下蛋。\n考查动词辨析和动词形式。lied撒谎，过去式；lay放置，下蛋，动词原形/躺，过去式；laid放置，下\n蛋，过去式/过去分词；lie撒谎，躺，位于，动词原形。第一空根据“was”可知，句子时态为一般过\n去时，结合lie down为固定搭配，应填过去式lay，表示“躺下”；第二空根据“begin to do sth”结\n构可知，空出用动词原形，表示“下蛋”。故选C。"
  },
  {
    "id": "xdf-ad04280b2ae15dd1",
    "type": "choice",
    "text": "We mustn’t _________ our phones to class. That’s ________ rule.\nA. carry; other\nB. bring; other\nC. take; other\nD. bring; another",
    "answer": "D",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 10,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：我们绝不能把手机带到课堂上。那是另一条规定。\n考查动词辨析和不定代词辨析。carry携带，强调随身拿着；bring带来，强调从别处带到说话处；take\n带走，强调从说话处带到别处；other其他的，后需接复数名词；another另一个，可直接修饰单数名\n词。根据“to class”可知，第一个空指将手机从别处带到课堂来，用bring；第二个空后是单数名\n词，用another修饰。故选D。"
  },
  {
    "id": "xdf-1b8edaf131511cae",
    "type": "choice",
    "text": "—How did Jimmy usually communicate with friends?\n—He _________ with them through social media.\nA. used to communicate\nB. is used to communicate\nC. was used to communicate\nD. is used to communicating",
    "answer": "A",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 11,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：——吉米通常如何与朋友交流？——他过去常常通过社交媒体与他们交流。\nused to do过去常常做某事；be used to do被用来做某事；be used to doing习惯于做某事。根据问\n句中的“did”和“usually”可知，时态为一般过去时，且表示过去的习惯，主语He是动作执行者。\nB、C为被动语态，语义不通；D为现在时。A选项符合语境。"
  },
  {
    "id": "xdf-fe6fd556344a26f2",
    "type": "choice",
    "text": "Could you please tell me how to check out a book? The underlined phrase means\n“________”.\nA. buy\nB. lend\nC. borrow\nD. send",
    "answer": "C",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 12,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：你能告诉我怎么借一本书吗？划线短语的意思是“借入”。\n考查动词辨析。buy购买；lend借出；borrow借入；send发送。根据“Could you please tell me how\nto check out a book?”可知，check out a book是图书馆常用表达，意为“借书”，此处应该是用户\n想借入图书，划线短语check out的意思与borrow相近。故选C。"
  },
  {
    "id": "xdf-4532f4dedce068f2",
    "type": "choice",
    "text": "________ no one saw him take the money. Peter returned it to the store at last.\nA. When\nB. Because\nC. Even though\nD. If",
    "answer": "C",
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 13,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：尽管没人看到他拿了钱，彼得最终还是把钱还给了商店。\n考查连词辨析。When当……时候；Because因为；Even though尽管；If如果。结合句意和语境可\n知，“Even though”是“尽管；虽然”，引导让步状语从句，“没人看到拿钱”和“还钱”形成让步\n关系。故选C。"
  },
  {
    "id": "xdf-91c78b8b6b175331",
    "type": "reading",
    "text": "Most children are taught the virtue (美德) of honesty from stories. The well-known\nstory of Pinocchio teaches the importance of telling the truth. Every time Pinocchio lies,\nhis nose grows longer and longer. Another story is about the boy who “cried wolf”. In\nthe end, he loses all his sheep and the trust of his fellow villagers because he tells\nlies many times. These types of stories show children that “honesty is the best policy”.\nStill, if this is the case, then why do so many people lie? The fact is that people lie\nfor many reasons.\nOne reason people lie is to minimize (减少) a mistake. While it is true that everyone\ndoes something wrong from time to time, some people do not have the courage to admit their\nmistakes because they are afraid they will be blamed (指责). For example, students might\nlie to their teachers about unfinished homework. They might say that they left the work at\nhome when, in fact, they did not do the work at all. These students do not want to get in\ntrouble or seem irresponsible, so they make up an excuse—a lie— to save face.\nAnother reason for lying has to do with self-protection. Parents, particularly those\nwith young children, may teach their children to use this type of “protective” lie in\ncertain circumstances (状况). What should children do if a stranger calls while the\nparents are out? Many parents teach their children to explain that their mother and father\nare too busy to come to the phone at that time. In this situation, protective lying can\nmean greater safety.\nPeople lie for many reasons, both good and bad. Lying to keep the peace or to stay\nsafe can have positive results. However, lying to stay out of trouble can lead to more\ntrouble in the end. Understanding the motives (动机) behind the impulse (冲动) to lie\nmight minimize this habit of lying.\n1.单选题\nWhat happens to Pinocchio when he tells lies?\nA. His nose grows longer and longer.\nB. He turns into a rabbit.\nC. He breaks his nose.\nD. He forgets his parents.\n2.单选题\nWhat does the underlined word “this” refer to in the passage?\nA. Honesty is the best policy.\nB. The well-known story of Pinocchio.\nC. The story of the boy who “cried wolf”.\nD. Your nose will grow longer and longer if you tell a lie.\n3.单选题\nWhy do some children lie to their teachers?\nA. Because they like making up an excuse.\nB. Because they have left the homework at home.\nC. Because they are afraid to be blamed at school.\nD. Because they have bad personalities.\n4.单选题\nHow does the writer explain why people tell lies?\nA. By asking questions.\nB. By giving examples.\nC. By showing the results.\nD. By drawing a chart.\n5.单选题\nWhat’s the best title for the passage?\nA. The Types of Lies\nB. The Habit of Lying\nC. The Truth behind Lying\nD. The Result of Lying",
    "answer": "(1) A (2) A (3) C (4) B (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_28_20260922_215651.pdf","number":14,"page":4,"sha256":"9a330b6decf505318c36bdea59b3eccffec011acc0239a81275437dcf4b9edbc"},
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 14,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n第一段明确描述皮诺曹撒谎后鼻子会变得越来越长：“Every time Pinocchio lies, his\nnose grows longer and longer.”，直接得出答案。\n\n第 2 小题：\n划线词this前一句明确提到这些故事都向孩子传递了诚实是最好的策略：“honesty is the\nbest policy”，因此this指代前文“诚实是最好的策略”。\n\n第 3 小题：\n第二段提到，孩子没完成作业向老师说谎，是因为他们害怕被责备、不想惹麻\n烦 ： “students might lie to their teachers about unfinished homework…These\nstudents do not want to get in trouble or seem irresponsible”，C项符合原文描述。\n\n第 4 小题：\n第二段和第三段作者介绍说谎原因时，分别举了“学生没做作业骗老师”和“家长教孩子应\n对陌生人时说谎”两个具体例子，是通过举例子解释原因。\n\n第 5 小题：\n全文围绕人们撒谎的原因、动机展开，核心是探究撒谎背后的原因，The Truth behind\nLying（撒谎背后的真相）最符合主旨。"
  },
  {
    "id": "xdf-a0e44dcc9c5ab1c2",
    "type": "reading",
    "text": "Bob’s father has a big farm. On New Year’s Day, he asked Bob, “Could you\nwork on the farm when you’re free this year?”\n“Farming is not my work, Dad. I have much schoolwork to do.” Bob wasn’t glad about\nit.\n“If you help me work on the farm, I will give you anything you want.”\n“OK.” Bob agreed happily.\nSo Bob gets up early and works hard on the farm in his free time this year, just like\nother farmers. His wheat (小麦) grows very well.\nTime flies. Today is December 31st, the last day of the year. The father is talking\nwith his son. “I’m happy to see you work hard on the farm, Bob. Now tell me what you\nwant as the gift (礼物). Bob shows his father a big piece of bread. He makes it with the\nwheat on his farm. “I have already gotten (已经得到) your gift, Dad. You are trying to\ngive me a lesson—no pain, no gain. Right?”\n1.单选题\nBob is a(n) ________.\nA. actor\nB. singer\nC. farmer\nD. student\n2.单选题\nWhat does the underlined word “it” refer to? (带下划线的单词“it”指代的是什么？)\nA. Staying at home.\nB. Getting a new job.\nC. Working on the farm.\nD. Having a New Year party.\n3.单选题\nThe underlined word “agreed” means ________ in Chinese.\nA. 承认\nB. 同意\nC. 拒绝\nD. 考虑\n4.单选题\nBob gets ________ from his father.\nA. some bread\nB. a small farm\nC. much money\nD. an important lesson\n5.单选题\nWhich of the following is TRUE?\nA. Bob grows wheat hard on the farm.\nB. Bob is not a good boy.\nC. Bob doesn’t learn from other farmers.\nD. Bob doesn’t study hard at school.",
    "answer": "(1) D (2) C (3) B (4) D (5) A",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_28_20260922_215651.pdf","number":15,"page":5,"sha256":"9a330b6decf505318c36bdea59b3eccffec011acc0239a81275437dcf4b9edbc"},
    "sources": [
      {
        "file": "错题_28_20260922_215651.pdf",
        "number": 15,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“I have much schoolwork to do.”可知，Bob是一个学生。故选D。\n\n第 2 小题：\n词句猜测题。根据“Could you work on the farm when you’re free this year?”可知，\nBob对于父亲让他去农场工作感到不开心，因此it指代上文“work on the farm”。故选C。\n\n第 3 小题：\n词句猜测题。根据“‘OK.’ Bob agreed happily.”可知，Bob很开心并说了好的，所以这\n里“agreed”意为“同意”。故选B。\n\n第 4 小题：\n细节理解题。根据“I have already gotten (已经得到) your gift, Dad. You are trying\nto give me a lesson—no pain, no gain. Right?”可知，Bob从父亲那里学到了重要的一\n课。故选D。\n\n第 5 小题：\n细节理解题。根据“So Bob gets up early and works hard on the farm in his free\ntime this year, just like other farmers. His wheat (小麦) grows very well.”可\n知，Bob在农场上辛勤地种植小麦。故选A。"
  },
  {
    "id": "xdf-6baf52a0b9d1f13d",
    "type": "choice",
    "text": "Which of the following underlined parts is different in pronunciation from the others?\nA. danger\nB. application\nC. champion\nD. satisfy",
    "answer": "A",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "B 选项 “application”、C 选项 “champion”、D 选项 “satisfy” 中字母 “a” 的发音为 /æ/；A\n选项 “danger” 中字母 “a” 的发音为 /eɪ/ ，故选 A。"
  },
  {
    "id": "xdf-f6c9a7be76ab212d",
    "type": "choice",
    "text": "The music teacher asked the students to ________ their voices during the chorus.\nA. raise\nB. rise\nC. praise\nD. improve",
    "answer": "A",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：音乐老师要求学生们在合唱时提高他们的声音。\n考查动词辨析。raise提高、举起，及物动词；rise上升、升起，不及物动词；praise表扬、赞美；\nimprove改善、改进，通常指质量或能力的提升。根据“their voices”可知，此处表示提高声音，A\n项raise符合。故选A。"
  },
  {
    "id": "xdf-c6b3ea140d7c136a",
    "type": "choice",
    "text": "Which of the following underlined parts is different in pronunciation from the others?\nA. worth\nB. thousand\nC. rhythm\nD. truth",
    "answer": "C",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：下面哪个下划线部分的发音与其他部分不同？\n考查语音知识。worth/wɜːθ/；thousand/(cid:0)θaʊznd/；rhythm/(cid:0)rɪðəm/；truth/truːθ/。根据音标\n可知，选项C划线部分发音与其他三项不同。故选C。"
  },
  {
    "id": "xdf-7855705d2c0aa220",
    "type": "choice",
    "text": "My bike is broken. May I _______ yours?\nA. lend\nB. borrow\nC. keep\nD. send",
    "answer": "B",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "动词辨析：“lend”（借出 ，lend sth. to sb. ）；“borrow”（借入 ，borrow sth. from sb.\n）；“keep”（保留；借（延续性动词 ） ）；“send”（发送；派遣 ） 。\n解析：“My bike is broken. May I ______ yours?” ，自行车坏了，想 “借入” 别人\n的，“borrow” 符合 “借入” 语义，选 B 。"
  },
  {
    "id": "xdf-11d78eeab30786f1",
    "type": "choice",
    "text": "He puts the flowers in the shade ________ the sun will not burn them.\nA. in order to\nB. so that\nC. so as to\nD. such that",
    "answer": "B",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：他把花放在阴凉处，这样太阳就不会把它们晒坏。\n考查目的状语从句。in order to为了，后接动词原形；so that以便、为了，引导目的状语从句，后\n接完整句子；so as to为了，后接动词原形；such that如此……以至于……，用于结果状语从句。根\n据句中“the sun will not burn them”为完整句子，且此处表示把花放在阴凉处的目的，需用“so\nthat”引导目的状语从句。故选B。"
  },
  {
    "id": "xdf-babe41599e5ed6d3",
    "type": "choice",
    "text": "The problems are ________ difficult ________ students can solve them.\nA. so; and few\nB. so; that little\nC. so; that few\nD. so; that a little",
    "answer": "C",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：这些问题太难了，以至于几乎没有学生能解决。\n考查so…that…引导的结果状语从句以及few/little/a little的区别。few几乎没有，后跟可数名词的复\n数形式；little几乎没有，后跟不可数名词；a little一点，后跟不可数名词；students，学生，可数名\n词的复数形式，应用few来修饰。故排除B、D项；so…that…，如此……以至于……，引导结果状语\n从句，固定搭配，故排除A项。故选C。"
  },
  {
    "id": "xdf-ae88b4d14874df3f",
    "type": "choice",
    "text": "Read the sentence. “As teenagers, we should learn English well so that we have the\nability to tell Chinese stories to the world.” The underlined words “so that” are used to\n________.\nA. give a reason\nB. give an example\nC. offer some advice\nD. show the purpose",
    "answer": "D",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：读这个句子。“作为青少年，我们应该学好英语，这样我们才有能力向世界讲述中国故\n事。”下面划线的单词“so that”是用来表示________。\n考查目的状语从句。give a reason表原因；give an example表举例；offer some advice表建议；\nshow the purpose表目的。根据“As teenagers, we should learn English well so that we have the\nability to tell Chinese stories to the world.”可知，so that在句子中引导目的状语从句。故选D。"
  },
  {
    "id": "xdf-7e48bf959bdb8411",
    "type": "choice",
    "text": "The fireman set out immediately __________they received the phone call for help．\nA. unless\nB. while\nC. as soon as\nD. until",
    "answer": "C",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 8,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：消防队员一接到求助电话就立即出发了。\n选项A：除非；选项B：当……时候；选项C：一……就；选项D：直到。结合语境：消防队员一接到\n求救电话就立即出发了。故选C。"
  },
  {
    "id": "xdf-a1b76e9dff06c39a",
    "type": "choice",
    "text": "The boy received________ education that he________ hardly write his own name.\nA. such little… could\nB. so little… could\nC. so few…couldn’t\nD. such few. ..couldn't",
    "answer": "B",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：这个男孩受的教育太少，几乎写不出自己的名字。\n本题考查so…that…引导的结果状语从句。so…that…：固定搭配“太……以至于……”。\n而“education”是不可数名词，所以要用“little”来形容，而“few”是形容可数名词的，当出现\nmuch/many/few/little时，用so修饰。“hardly”是“几乎不”的意思，有否定意味，所以前面要用\n肯定形式“could”。故选B。"
  },
  {
    "id": "xdf-8b2a38a8d097019d",
    "type": "choice",
    "text": "I don't know when Jim ____________ . I'll meet him at the airport when he___________ .\nA. will return; return\nB. returns; will return\nC. returned; returned\nD. will return; returns",
    "answer": "D",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我不知道吉姆什么时候回来。他回来时我会在机场接他。考查动词时态辨析题。本题两句都\n是when引导的时间状语从句，但前句when强调时间，根据I don't know可知Jim没回来，从句需用\n一般将来时，可排除BC两项；后句when表条件，相当于if条件句，时态遵循主将从现，he是单数第\n三人称，动词需用三单形式。根据句意结构和语境，可知选D。"
  },
  {
    "id": "xdf-02086b54f86acd20",
    "type": "choice",
    "text": "Joe was surprised that Jane was thirty minutes late, 1 she always arrived on\ntime.\nA. but\nB. so\nC. for\nD. or",
    "answer": "C",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "本题考查连词。\n解题要点：根据 前半句 “Joe 很惊讶 Jane 迟到了三十分钟”，和 后半句“她总是准时到达” 句\n意，可推断前后为因果关系，只有 C．for 是表示“因为”的连词。\n故正确答案为C。"
  },
  {
    "id": "xdf-e9254e8134ec7194",
    "type": "choice",
    "text": "She won't lose weight 1 she keeps a diet and takes exercise every day.\nA. unless\nB. if\nC. because\nD. since",
    "answer": "A",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-198e98cb768f06e8",
    "type": "choice",
    "text": "It is ________ bad weather that we decide to stay at home.\nA. so\nB. such a\nC. such",
    "answer": "C",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：天气如此糟糕，以至于我们决定待在家里。\n考查结果状语从句。“so+形容词/副词+that”和“such+(a/an)+形容词+名词+that”都表示“如\n此……以至于……”；weather是不可数名词，用“such+形容词+不可数名词+that”结构。故选C。"
  },
  {
    "id": "xdf-f1ec28cf5f7b4d29",
    "type": "choice",
    "text": "We will make few mistakes ______ we are careful enough.（ ）\nA. so that\nB. as soon as\nC. as long as\nD. even if",
    "answer": "C",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "so that以便；as soon as一……就；as long as只要；even if即使。根据题干We will make few\nmistakes…we are careful enough.（我们将会少犯错误…我们足够仔细。）可知，只要我们足够仔\n细，我们将会少犯错误，前后是条件关系，则应用as long as，引导条件状语从句。\n故选：C。"
  },
  {
    "id": "xdf-83d3a1547abdc876",
    "type": "choice",
    "text": "— What a mess! The sharing bikes are thrown here and there!\n— Let’s collect and put them in the right place _______ they can be used conveniently.\nA. as long as\nB. so that\nC. even though",
    "answer": "B",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 16,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：——真乱！共享单车扔的到处都是！——让我们把它们收集起来，放在合适的地方，以便方\n便使用。\n考查so that引导的目的状语从句。as long as只要；so that以便；even though尽管。根据“collect\nand put them in the right place…they can be used conveniently”可知，把共享单车收起来并摆放\n在合适的位置是为了使用起来更方便，此处应用so that引导目的状语从句。故选B。"
  },
  {
    "id": "xdf-96464dad927b6dcc",
    "type": "choice",
    "text": "We learn English 1 we can communicate with English people easily.\nA. in order to\nB. so that\nC. as soon as\nD. because",
    "answer": "B",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 17,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "in order to为了，后跟动词原形；so that以便、这样；as soon as一……就……；because因为。根\n据“We learn English we can communicate with English people easily.”我们学习英语，这\n样我们就可以轻松地与英语人交流了。可知，应该是“这样”，用so that引导目的状语从句。故选\nB。\n【点评】连词可以表并列、承接、转折、因果、选择、假设、比较、让步等关系，要结合语境，选\n择合适连词用法。"
  },
  {
    "id": "xdf-4c5fbc56c579bc8c",
    "type": "choice",
    "text": "—— The Micro-blog is popular now, do you still play that every day?\n1\n—— No, my mother has put away my computer let me focus on my study.\nA. in order to\nB. in order\nC. so that\nD. so as",
    "answer": "A",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 18,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本题考查目的状语从句和不定式表目的的区分。\n解题步骤：\n1. 语义分析，“我妈妈把我的电脑收走了，为了让我能专心学习。”\n2. 确定答案，空后面是动词，故本题为不定式表目的，应用短语in order to。\n故选 A"
  },
  {
    "id": "xdf-cc822817b1e41cc9",
    "type": "choice",
    "text": "He finds it hard to fit in with a new culture _______ he has been accustomed to his own\nculture.\nA. the moment\nB. which\nC. lest\nD. as",
    "answer": "D",
    "sources": [
      {
        "file": "错题_29_20260922_215657.pdf",
        "number": 19,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "后半句“他已经习惯了自己的文化”解释了前半句“他发现很难融入一种新文化”的原因。\"as\" 在\n这里引导原因状语从句，意为“因为，由于”。"
  },
  {
    "id": "xdf-74e1c695a842b76c",
    "type": "choice",
    "text": "—Could you help me sweep the floor, Linda? I’m going to cook dinner.\n—________ I’ll do it at once, Mom.\nA. With pleasure.\nB. My pleasure.\nC. You’re welcome.\nD. Sure, go ahead.",
    "answer": "A",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——琳达，你能帮我扫地吗？我要去做晚饭了。——乐意效劳，我马上就去做，妈妈。\n考查情景交际。With pleasure乐意效劳，常用于答应对方的请求；My pleasure不客气，常用于回应感\n谢；You’re welcome不客气，用于回应感谢；Sure, go ahead当然可以，你先请，用于允许对方行\n动。根据“I’ll do it at once, Mom.”可知，琳达答应母亲的请求，“With pleasure”符合语境。\n故选A。"
  },
  {
    "id": "xdf-6f24ec47efab56d7",
    "type": "choice",
    "text": "I need ________ pair of shoes because these are uncomfortable.\nA. another\nB. other\nC. the other\nD. others",
    "answer": "A",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我需要另一双鞋，因为这双穿着不舒服。\n考查不定代词辨析。another另一，三者及以上；other其他的，后接复数名词；the other两者中的另\n一 个 ；others 其 他 的 人 / 物 ， 复 数 。 根 据 “pair of shoes” 及 “because these are\nuncomfortable”可知，此处表示\"再一双\"，用another符合语境。故选A。"
  },
  {
    "id": "xdf-a7a2775ae647537d",
    "type": "fill",
    "text": "Match these responses with the quiz questions.\na. I’d keep quiet and run back to the middle of the pitch.\nb. I’d ask if I could change it for another one.\nc. I wouldn’t look because I’d be scared of getting caught.\nd. I’d tell the person who did it that they should tell the truth.\ne. I’d put it in my pocket as quickly as I could.\nf. I’d make the door dirty to try and cover it up.\nwhat would you do if...\n1. you gave a £10 note to buy a £5 item, but the assistant gave you £15 change by\nmistake? 1\n2\n2. your grandparents gave you a shirt as a present, but you didn’t like it?\n3. you scored a goal in a football match, but you knew it wasn’t legal because the ball\n3\nhad hit your hand without the referee seeing it?\n4. you kicked a stone outside your house and it made a dent in the neighbour’s car door?\n4\n5. you couldn’t answer a question in a test, but you realised you could see another\nstudent’s answer?\n6. your school principal wanted to know who broke a classroom window, and you knew who the\n6\nperson was?",
    "answer": "1 e 2 b 3 a 4 f 5 c 6 d",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "情境：收银员多找钱时，正确反应是返还多余金额。选项 e（迅速放进口袋）体现未纠正错误的做法，\n匹配问题1。\n情境：不喜欢收到的衬衫，礼貌请求更换。选项 b（询问是否能换）直接对应问题2。\n情境：足球比赛中手球得分未被发现，选项 a（保持沉默并返回）体现隐藏错误的行为，匹配问题3。\n情境：踢石头损坏邻居车门，选项 f（弄脏车门掩盖）是掩盖错误的方式，符合问题4。\n情境：考试中想偷看答案但害怕被抓，选项 c（因害怕而不看）对应问题5的心理反应。\n情境：知道打破窗户的人，选项 d（劝告对方坦白）符合问题6的诚实解决方式。"
  },
  {
    "id": "xdf-77f4bd104441d024",
    "type": "reading",
    "text": "Telemedicine: Doctor Visits Online\nDuring the pandemic, many people started seeing doctors online through video calls. This\nis called \"telemedicine.\" A 2023 study found that 76% of U.S. hospitals now offer online\nvisits, while only 35% did so in 2015.\nTelemedicine helps patients in remote areas. For example, an Australian farmer with a skin\nproblem got advice from a skin doctor in London within minutes. But some doctors worry\nthey can't see small signs of illness through a screen. Older people or those with slow\ninternet may also find it hard to use.\nMost experts think the future will mix online and in-person visits. \"Online visits help\ndoctors decide which patients need urgent care,\" explains Dr. Lee from the WHO. However,\nabout 23% of users still fear hackers might access their private health information.\n1.单选题\nWhat percentage of U.S. hospitals had telemedicine in 2015?\nA. 0%\nB. 76%\nC. 35%\n2.单选题\nWhere was the doctor who helped the Australian farmer?\nA. U.S.\nB. U.K.\nC. Australia\n3.单选题\nWhy might online visits be difficult for elderly patients?\nA. They may not be comfortable with technology.\nB. Their internet might be too slow\nC. They may not be comfortable with technology AND their internet might be too slow.\n4.单选题\nWhat does Dr. Lee mean by \"decide which patients need urgent care\"?\nA. Doctors will stop seeing patients in person completely.\nB. Doctors can prioritize the most serious cases first.\nC. All patients will have to wait longer for treatment.",
    "answer": "(1) C (2) B (3) C (4) B",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_30_20260922_215707.pdf","number":5,"page":2,"sha256":"080bfae97b4092f049d9513a2fce4d672a3428cc465566602a223ef0bb7bf2db"},
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 5,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n答案：C；问题询问2015年美国医院中有多少比例采用了远程医疗。文中明确提到“A 2023\nstudy found that 76% of U.S. hospitals now offer online visits, while only 35%\ndid so in 2015.”（2023年调查显示，76%的美国医院现在提供在线问诊，而2015年仅为\n35%）。因此，2015年的比例为35%。选项C正确。\n\n第 2 小题：\n答案：B；问题询问帮助澳大利亚农民的医生所在地。文中举例说明“an Australian\nfarmer... got advice from a skin doctor in London within minutes”（一名澳大利亚\n农民...在几分钟内得到了伦敦皮肤科医生的建议）。伦敦是英国（U.K.）的首都，选项B正\n确。\n\n第 3 小题：\n答案：C；问题询问老年人为何觉得在线问诊困难。文中提到“Older people or those with\nslow internet may also find it hard to use”（老年人或网络慢的人可能觉得难以使\n用）。选项C结合了两个原因：“不熟悉技术”（对应老年人）和“网络慢”，与原文完全一\n致。\n\n第 4 小题：\n答案：B；Dr. Lee提到“在线问诊帮助医生确定哪些患者需要紧急护理”。选项B（医生可优\n先处理最严重的病例）符合其含义。文中未提到“完全停止线下问诊”（选项A）或“所有患\n者需等待更久”（选项C），因此选项B正确。"
  },
  {
    "id": "xdf-f43fa2d90c3b5df0",
    "type": "choice",
    "text": "She followed the instructions _______ to ensure everything was done correctly.\nA. as carefully as possible\nB. as carefully as she can\nC. as careful as possible\nD. as careful as she can",
    "answer": "A",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 6,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考查副词用法及固定结构，“as + 副词原级 + as possible” 或 “as + 副词原级 + as sb. can”\n表示 “尽可能……” ，此处修饰动词 “followed” 需用副词 。“carefully” 是副词，修饰\n“followed the instructions”；“as carefully as possible” 是正确结构，B 选项 “as\ncarefully as she can” 中 “can” 的时态若结合语境（一般现在时描述 ），用 “could” 更统\n一，但 A 选项更简洁通用；C、D 中 “careful” 是形容词，不能修饰动词，所以选 A 。"
  },
  {
    "id": "xdf-1acf0681be02d0ad",
    "type": "choice",
    "text": "The school radio station is collecting music pieces ________ different occasions.\nA. at\nB. for\nC. on\nD. with",
    "answer": "B",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 7,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：学校广播站正在为不同的场合收集音乐作品。\n考查介词辨析。at在（某时刻或地点）；for为了，用于；on在……上面，关于；with和……一起。根\n据句意，收集音乐作品的目的是“为了”不同场合使用，表示用途或目的，应用介词for。故选B。"
  },
  {
    "id": "xdf-04ae7f1f4d6997ef",
    "type": "choice",
    "text": "________ Tom ________ Mary is busy. You’d better play with others.\nA. Both; and\nB. Neither; nor\nC. Either; or\nD. Not only; but also",
    "answer": "D",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 9,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：不仅汤姆很忙，玛丽也很忙。你最好和别人一起玩。\n考查并列连词辨析。Both...and两者都；Neither...nor既不……也不；Either...or要么……要么；\nNot only...but also不仅……而且。根据“You’d better play with others.”可知，两个人都很\n忙，结合“is”可知，此处需满足就近原则，故选D。"
  },
  {
    "id": "xdf-9ad2dc6500f5d227",
    "type": "choice",
    "text": "I suggest he _________ the new restaurant in town; its food is highly advised.\nA. trying\nB. try\nC. will try\nD. to try",
    "answer": "B",
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 10,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：我建议他尝试一下镇上的新餐厅；那里的食物备受推荐。\n考查动词suggest后接宾语从句的用法。当suggest表示“建议”时，其后的宾语从句中谓语动词\n用“should + 动词原形”或直接用动词原形，表示虚拟语气。故选B。"
  },
  {
    "id": "xdf-baf6af4d65419a5a",
    "type": "reading",
    "text": "Dear Miss Manners，\nMy friend Jack just got back from vacation.He gave me a vase in the shape of a silly\ncat and said，\"I（1） ________ you like it.\"（2） ________ ，I don't like vases or cats.I\ndon't want to tell him a white lie.How can I respond（3） ________ while still being\npolite？\nSam\nDear Sam，\nHonesty is a virtue（美德），but（4） ________ about people's feelings is also an\nimportant virtue.Yes，you should still report a criminal（举报罪犯），（5） ________ it\nhurts that person's feelings.But in everyday life，we need（6） ________ these two\nvirtues.If you tell your friend that you hate his gift，then you are not practicing\nhonesty as a virtue，but using it as a weapon（武器）.You should understand that your\nnegative（负面的）opinions are not great truths，but just your opinions.There is no need\nto say them if they may offend（冒犯）someone.You may simply say，\"The shape of the vase\nis interesting.\"（7） ________ you don't find it interesting and can't think of\n（8） ________ nice to say，you can change the topic.For example，you could say，\"Where\ndid you find the vase？Did you have a good vacation？\"\nMiss Manners\n1.单选题\nA. hope\nB. hoped\nC. will hope\n2.单选题\nA. However\nB. Instead\nC. Therefore\n3.单选题\nA. honesty\nB. honest\nC. honestly\n4.单选题\nA. care\nB. cared\nC. caring\n5.单选题\nA. even if\nB. in case\nC. so that\n6.单选题\nA. balance\nB. balancing\nC. to balance\n7.单选题\nA. Because\nB. If\nC. Though\n8.单选题\nA. anything\nB. everything\nC. nothing",
    "answer": "(1) A (2) A (3) C (4) C (5) A (6) C (7) B (8) A",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_30_20260922_215707.pdf","number":11,"page":3,"sha256":"080bfae97b4092f049d9513a2fce4d672a3428cc465566602a223ef0bb7bf2db"},
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 11,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n考查动词。句意：我希望你喜欢它。A.希望，原形；B.希望，过去式；C.会希望，一般将来\n时结构。结合语境，表示说话者现在的希望，句子用一般现在时态，结合主语I，此处应用动\n词原形，故选A。\n\n第 2 小题：\n考查副词。句意：然而，我不喜欢花瓶或猫。A.然而；B.相反；C.因此。结合前后语境，前\n后句是转折关系，此处位于句首且逗号隔开，所以用副词however表示转折，故选A。\n\n第 3 小题：\n考查副词。句意：我如何在保持礼貌的同时诚实地回应呢？A.诚实；B.诚实的；C.诚实地。\n结合语境，此处修饰动词respond应用副词形式，故选C。\n\n第 4 小题：\n考查动名词。句意：诚实是一种美德，但关心别人的感受也是一种重要的美德。A.关心，原\n形；B.关心，过去式；C.关心，现在分词或动名词。分析句子结构，此处动名词短语\"caring\nabout people's feelings（关心别人的感受）\"作为主语，表示\"关心别人的感受\"这一行\n为，故选C。\n\n第 5 小题：\n考查短语。句意：是的，你仍然应该举报罪犯，即使这伤害了那个人的感情。A.即使；B.如\n果；C.以便。分析句子结构，此处应用even if引导假设性让步从句，主句结果不受从句条件\n影响，故选A。\n\n第 6 小题：\n考查动词不定式。句意：在日常生活中，我们需要平衡这两种美德。A.平衡，原形；B.平\n衡，现在分词或动名词；C.平衡，动词不定式。need to do sth.表示\"需要做某事\"；结合语\n境，此处需要平衡这两种美德，应用动词不定式to balance。故选C。\n\n第 7 小题：\n考查连词。句意：如果你觉得它不有趣，想不出什么好话，你可以换个话题。A.因为；B.如\n果；C.虽然。结合前后语境，此处句子使用If引导条件状语从句，故选B。\n\n第 8 小题：\n考查不定代词。句意：如果你觉得它不有趣，想不出什么好话，你可以换个话题。A.任何事\n情；B.一切；C.什么都没有。结合空前否定词can't可知，此处表示想不出任何好的话来说，\n因此需要使用不定代词anything，故选A。"
  },
  {
    "id": "xdf-7ca145313b1fc11e",
    "type": "reading",
    "text": "Choose the best answer (选择最恰当的答案)\nSTUDENT TIMES\nHome Metro Sports Opinions Arts Photos Videos Search\nEmbarrassing experiences By Jack Preston\nLast week, Student Times reporter Jack Preston asked students, “What’s\nthe most embarrassing experience you’ve ever had?” Here are the three of\nhis favourite responses.\n□—Susan\nI like singing very much. Once, I was singing in the shower when my sister\ncame into the bathroom and recorded me! Later, we were driving and my\nsister put on some music. It was me! I was really embarrassed and turned\nbright red.\n□—Alex\nI fell asleep in math class once. I closed my eyes for a moment, and the\nnext thing I remember is my teacher’s voice. He was asking me a question.\nWhen I didn’t answer, he walked over to my desk. He asked it again.\n□—Evan\nMy friend’s parents had a birthday party for her at their new house last\nsummer. They had these glass doors that went out to the garden. We were in\nthe garden and I had to use the restroom. So I was running to the house and\nthen—BAM! I hit the glass doors. I was really confused for a minute. I\nthought they were open, but they were closed! My friend’s parents felt\n________ about it.\n1.单选题\nWhat kind of article is it?\nA. A story.\nB. A poster.\nC. A diary.\nD. A website report.\n2.单选题\nWhere were Susan and her sister when the recording was played?\nA. In the bathroom.\nB. In the car.\nC. In school.\nD. In the garden.\n3.单选题\nWhat did Alex do in a math class?\nA. He answered a question.\nB. He fell asleep.\nC. He put on some music.\nD. He ran in the classroom.\n4.单选题\nThe word “it” in paragraph 3 refers to (指的是) “________”。\nA. the math class\nB. the teacher’s voice\nC. the question\nD. the desk\n5.单选题\nWhich of the following words can be used to fill in the blank in paragraph 4?\nA. happy\nB. grateful\nC. confident\nD. sorry\n6.单选题\nWhat is the main purpose of the article?\nA. To tell the readers about the Student Times newspaper.\nB. To share students’ embarrassing experiences.\nC. To introduce the reporter Jack Preston.\nD. To discuss the importance of being honest.",
    "answer": "(1) D (2) B (3) B (4) C (5) D (6) B",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_30_20260922_215707.pdf","number":12,"page":5,"sha256":"080bfae97b4092f049d9513a2fce4d672a3428cc465566602a223ef0bb7bf2db"},
    "sources": [
      {
        "file": "错题_30_20260922_215707.pdf",
        "number": 12,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n推理判断题。根据文章开头的“STUDENT TIMES”以及“Home Metro Sports Opinions Arts\nPhotos Videos Search”和文章内容可知，这是一篇来自网站的文章，介绍了学生时代的一\n些内容，特别是关于学生尴尬经历的报道。D选项“一篇网站报道”最符合，文章的结构和内\n容都符合一篇网站报道的特点。故选D。\n\n第 2 小题：\n细节理解题。根据Susan的描述“Later, we were driving and my sister put on some\nmusic. It was me! I was really embarrassed and turned bright red.”可知，当录音被\n播放时，Susan和她的姐姐正在车里。故选B。\n\n第 3 小题：\n细节理解题。根据Alex的描述“I fell asleep in math class once.”可知，Alex在数学课\n上睡着了。故选B。\n\n第 4 小题：\n词义猜测题。根据Alex的描述“He was asking me a question. When I didn’t answer,\nhe walked over to my desk. He asked it again.”可知，老师先问了一个问题，Alex没有\n回答，然后老师走到他的桌子旁，又问了一次“这个问题”。因此，“it”指的是老师问的\n那个问题。故选C。\n\n第 5 小题：\n推理判断题。根据Evan的描述“I hit the glass doors. I was really confused for a\nminute. I thought they were open, but they were closed!”可知，Evan不小心撞到了玻\n璃门上，他可能会感到很尴尬和抱歉。因此，Evan的朋友的父母可能会对此感\n到“sorry”（抱歉）。故选D。\n\n第 6 小题：\n主旨大意题。根据文章首句“Last week, Student Times reporter Jack Preston asked\nstudents, ‘What’s the most embarrassing experience you’ve ever had?’ Here are\nthe three of his favourite responses.”可知，文章的主要目的是分享学生们的尴尬经\n历。A选项“告诉读者关于学生时代报纸的信息”不是文章的主要目的；C选项“介绍记者\nJack Preston”也不是文章的主要内容；D选项“讨论诚实的重要性”与文章内容无关。故选\nB。"
  },
  {
    "id": "xdf-a38e6f977fec38e4",
    "type": "choice",
    "text": "The New Year Concert was so fantastic that ________ left in the middle of it.\nA. everybody\nB. somebody\nC. anybody\nD. nobody",
    "answer": "D",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：新年音乐会太精彩了，没有人中途离开。\n考查复合不定代词。 everybody每人；somebody某人；anybody任何人；nobody没有人。根据“The\nNew Year Concert was so amazing”可知音乐会太精彩了所以没有人中途离开。故选D。"
  },
  {
    "id": "xdf-488fe3e3cb236fa6",
    "type": "choice",
    "text": "We need to ______ five hundred yuan on the flat a month.（ ）\nA. cost\nB. take\nC. spend\nD. pay",
    "answer": "C",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 2,
        "page": 1
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "cost花费，主语通常是物；take花费，主语多为形式主语\"it\"；spend花费，主语是人；pay支付。根\n据\"We need to...five hundred yuan on the flat a month.\"（我们每个月需要在这套公寓上……500\n元。）可知，此处为spend...on...句型，意为\"在……上花费……\"。\n故选：C。"
  },
  {
    "id": "xdf-d8043edf9e6b27a3",
    "type": "choice",
    "text": "Each group is required to the report and share opinions with the class.（ ）\nA. prevent\nB. present\nC. request\nD. recommend",
    "answer": "B",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 3,
        "page": 1
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "A.阻止；B.展示；C.需求；D.建议。根据Each group is required to the report and share\nopinions with the class.（每个小组需要......报告并与全班分享意见。）可知，每个小组需要展示报告\n并与全班分享意见。\n故选：B。"
  },
  {
    "id": "xdf-8aa2bd34e1fa9a4d",
    "type": "choice",
    "text": "We had to our prices because of the costs.（ ）\nA. raised，risen\nB. raise，rising\nC. rise，raised\nD. rise，raising",
    "answer": "B",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 4,
        "page": 1
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "raised提高，过去式/过去分词；risen上升，过去分词；raise提高，动词原形；rise上升，动词原\n形；rising提高的，形容词；根据had to（不得不）可知，have to do sth为固定搭配，意为\"不得不\n做某事\"，此处用动词原形，排除A项；raise为及物动词，rise为不及物动词，our prices（我们的价\n格）为宾语，因此第一个空格填raise，第二个空格修饰名词costs（成本），用形容词rising，因此选\nB项。\n故选：B。"
  },
  {
    "id": "xdf-f998b7839720f202",
    "type": "fill",
    "text": "在短文的空格内填入适当的词，使其内容通顺，每空格限填一词，首字母已给\nLaughter is n (1) for people. We start to laugh at about four months of age. We\nstart to laugh even before we start to speak!\nLaughter is social. It c (2) us with other people. We laugh more when we are with\nother people. Studies find that we are 30 times more likely to laugh with others than when we\nare alone. When one person laughs, other people begin to laugh, too.\nIt is difficult to pretend to laugh. Laughter is h (3) . Try to laugh right now. It’s\ndifficult, isn’t it? When people pretend to laugh, most people know it’s not real. Studies show\nthat people don’t like the sound of fake (虚假的) laughter.\nWhen do people laugh?\nOnly 10 to 20 percent of laughter is about something funny. Most laughter is about being\nfriendly with other people. Most laughter says, “I don’t want to compete with you. I like to be\nwith you.” This kind of laughter brings people t (4) .\nWe often laugh when we feel nervous. At the beginning of the meetings, someone often tells\na joke. It’s usually a small joke, but we laugh a lot. Our laughter helps us relax.\nWhat is funny?\nSome things are funny because we don’t e (5) them. When a joke begins, we\nalready have an idea about the end. We think we know the end, but then the joke ends in a\ndifferent way. The end of the joke surprises us. It makes us laugh.\nSilly things are sometimes funny. We laugh at jokes about people and their mistakes because\nwe know s (6) they don’t know. We think we are better than they are. Not everyone\nhas the same sense of humor. Some people think a joke is funny, but other people don’t think so.\nPeople have different ideas about what is funny. For young children, the world is new. Many\nthings surprise them, so they laugh a lot. Teenagers often worry about what others think of\nthem. They laugh to p (7) themselves. Teenagers laugh when they feel embarrassed.\nAdults laugh at things that give them stress. Our reasons for laughter change over time.",
    "answer": "(n)atural； (c)onnects； (h)onest； (t)ogether； (e)xpect； (s)omething； (p)rotect",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本文主要谈论笑在人们生活中的作用，并解答人们何时会笑，为什么会笑。\n句意：笑对人来说是自然的。根据“We start to laugh at about four months of age...”可知我们大约\n四个月大的时候就开始笑了，所以笑是自然的，作be动词的表语用形容词natural“自然的”。故填\n(n)atural。\n句意：它把我们和其他人联系在一起。根据“We laugh more when we are with other people”可知当\n我们和别人在一起时，我们笑得更多，所以笑把我们和其他人联系在一起，connect“联系”，句子用一\n般现在时，主语是It，谓语动词用单三。故填(c)onnects。\n句意：笑声是诚实的。根据“It is difficult to pretend”可知，笑是很难假装的，所以笑声是诚实的，\nhonest表示“诚实的”，形容词作表语，故填(h)onest。\n句意：这种笑声让人们走到一起。根据“I like to be with you”可知，这种笑声表达出来就是要跟对方\n走到一起，together“一起”，故填(t)ogether。\n句意：有些事情之所以有趣，是因为我们并不期待它们。根据“We think we know the end, but then\nthe joke ends in a different way”可知，我们以为我们知道结局，但后来笑话以不同的方式结束了，\n所以结果并不是我们预期那样的时候，这件事情才变得有趣，expect表示“期待”，don’t后接动词原\n形，故填(e)xpect。\n句意：我们嘲笑别人和他们的错误，因为我们知道一些他们不知道的事情。根据“they don’t know”可\n知是知道一些他们不知道的事情，something“一些事情”。故填(s)omething。\n句意：他们笑是为了保护自己。根据“Teenagers often worry about what others think of them.”可\n知，青少年担心别人对自己的想法，所以用笑来保护自己，protect“保护”符合，动词不定式符号to后\n接动词原形，故填(p)rotect。"
  },
  {
    "id": "xdf-1f86f92690bd0a73",
    "type": "choice",
    "text": "About ________ Asians came to the USA to learn IT science last year.\nA. thousands\nB. thousands of\nC. five thousand\nD. five thousands",
    "answer": "C",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 6,
        "page": 2
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 6,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：去年大约有五千名亚洲人来到美国学习IT科学。\n考查thousand的用法。thousand千，表示具体数字时，不加s，也不与of连用，排除D选项；表示概\n数时，需加s，且与of连用，排除A选项。根据“About”可知，此处是指具体数字，C选项符合。故选\nC。"
  },
  {
    "id": "xdf-557a6e8c05fb8e42",
    "type": "choice",
    "text": "Our school is only ________ walk from here.\nA. ten–minute\nB. ten minute’s\nC. ten minutes\nD. ten minutes’",
    "answer": "D",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我们学校离这里只有十分钟的步行路程。\n考查名词所有格用法。ten–minute十分钟的，复合形容词，作定语时需与a连用，如a ten–minute\nwalk；ten minute’s语法错误；ten minutes十分钟；ten minutes’十分钟的。此处应用名词所有格形\n式，修饰walk，D项符合。故选D。\n答案\nD\n解析\nfluent流利的，形容词原级；more fluent更流利的，形容词比较级；fluently流利地，副词原级；\nmore fluently更流利地，副词比较级。根据much后加比较级，表示\"……得多\"；此处修饰动词\nspeak\"说\"，应用副词，所以应填副词比较级more fluently。\n故选：D。"
  },
  {
    "id": "xdf-fd179bc311899e0d",
    "type": "choice",
    "text": "After taking the training course，he can speak English much ______.（ ）\nA. fluent\nB. more fluent\nC. fluently\nD. more fluently",
    "answer": "D",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 8,
        "page": 2
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "fluent流利的，形容词原级；more fluent更流利的，形容词比较级；fluently流利地，副词原级；\nmore fluently更流利地，副词比较级。根据much后加比较级，表示\"……得多\"；此处修饰动词\nspeak\"说\"，应用副词，所以应填副词比较级more fluently。\n故选：D。"
  },
  {
    "id": "xdf-0844a833fa88ac33",
    "type": "choice",
    "text": "He became and hurriedly left the office without saying anything.（ ）\nA. angry\nB. friendly\nC. gently\nD. sadly",
    "answer": "A",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 9,
        "page": 3
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "angry生气的；friendly友好的；gently温柔地；sadly悲伤地。根据\"…and hurriedly left the office\nwithout saying anything\"（一句话也没说就匆匆离开了办公室）可知，系动词become后接形容词，\n此处是指他\"生气\"了。\n故选：A。"
  },
  {
    "id": "xdf-254d0f880439b500",
    "type": "choice",
    "text": "Steven asked the taxi driver to drive ________ because he had to catch the last train.\n（ ）\nA. quickly\nB. the most quickly\nC. more quickly\nD. less quickly",
    "answer": "C",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 10,
        "page": 3
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 10,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "quickly快速地，副词原级；the most quickly最快地，副词最高级；more quickly更快地，副词比较\n级；less quickly不太快，副词比较级。根据\"because he had to catch the last train.\"（因为他要赶最\n后一班火车。）可知，此处指的是要求出租车司机开更快点儿，空处应为副词\"quickly\"的比较级形\n式\"more quickly\"。\n故选：C。"
  },
  {
    "id": "xdf-d3a5aeeca459c1a0",
    "type": "choice",
    "text": "I will try as ________ as before to challenge it.（ ）\nA. hardly\nB. harder\nC. hard\nD. hardest",
    "answer": "C",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 11,
        "page": 3
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 11,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "hardly几乎不；harder更努力，比较级；hard努力，原级；hardest最努力，最高级。根据句\n中\"as...as...\"（像……一样）可知，第一个as为副词，修饰形容词或副词的原级；所以此处需用副词原\n级hard表示\"和以前一样努力\"。\n故选：C。"
  },
  {
    "id": "xdf-de0c73f8a2d8cc8d",
    "type": "choice",
    "text": "______ amazing music the pianist is playing!（ ）\nA. What\nB. What a\nC. What an\nD. How",
    "answer": "A",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 12,
        "page": 3
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 12,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "What多么；What a多么一个；What an多么一个；How多么。该句中心词是名词\"music\"（音乐），\n为不可数名词，用what引导感叹句，结构为\"What+形容词+不可数名词+主谓\"。\n故选：A。"
  },
  {
    "id": "xdf-7de927e653cbc0f7",
    "type": "choice",
    "text": "________ culture shock it is to see the locals dressed in leaves in some places in Africa!\n（ ）\nA. How\nB. What\nC. What a\nD. What an",
    "answer": "B",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 13,
        "page": 3
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 13,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "How多么；What多么；What a一个多么；What an一个多么。分析句子可知，该句为感叹句。what\n和how都能引导感叹句，what用于修饰名词，how用于修饰形容词或副词。空处用于修饰不可数名词\n短语culture shock（文化冲击），其前不能加不定冠词a/an，所以应用What引导此感叹句。\n故选：B。"
  },
  {
    "id": "xdf-3b25b004c8b0983f",
    "type": "choice",
    "text": "useful advice you gave us on protecting personal information!（ ）\nA. What\nB. What a\nC. What an\nD. How",
    "answer": "A",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 14,
        "page": 4
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 14,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "What多么，引导感叹句，后跟可数名词复数或不可数名词；What a一个多么，引导感叹句，后跟辅\n音音素开头的单数名词；What an一个多么，引导感叹句，后跟元音音素开头的单数名词；How多\n么，引导感叹句，后跟形容词或副词。根据advice（建议）是不可数名词可知，用What。\n故选：A。"
  },
  {
    "id": "xdf-0a0592f47cdda9be",
    "type": "choice",
    "text": "- will the meeting last？\n-For at least two hours.（ ）\nA. How often\nB. How far\nC. How long\nD. How soon",
    "answer": "C",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 15,
        "page": 4
      },
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 15,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "How often询问频率（多久一次），如 \"How often do you exercise？\"（你多久锻炼一次？）；How\nfar询问距离（多远），如 \"How far is the station？\"（车站有多远？）；How long询问时间长度（多\n久），如 \"How long will the meeting last？\"（会议将持续多久？）；How soon询问时间快慢（多\n快），如 \"How soon can you finish？\"（你多久能完成？）。根据答语For at least two hours.（至少\n两个小时。）可知，此处应是对一段时间进行的提问，因此疑问词应用How long。\n故选：C。"
  },
  {
    "id": "xdf-d88c52e7e2955dfc",
    "type": "reading",
    "text": "Ever wonder why your friends from another country might not look you in the eye，\nor why they greet you in a different way？Around the world，body language speaks as loudly as\nwords.\nIn the USA，strong eye contact In China，avoiding too much eye\nshows you're confident and contact is a sign of respect，\ninterested. especially with older people.\nItalians often use lively arm\nBritish people usually do not move\ngestures to emphasize （强调）\ntheir hands much when they talk.\npoints.\nIn some Asian countries，like\nIn the USA，it's common to use\nChina and Japan，using both\none hand for giving or receiving\nhands shows greater respect and\nthings.\npoliteness.\nIn some Middle Eastern\nA thumbs–up means \"good job\"\ncountries，like Egypt，it can be\nin many countries.\nrude.\nIn most countries，nodding\nmeans \"yes\" and shaking your In Bulgaria，it's the opposite.\nhead means \"no\".\n(1)单选题 Italians often ________ to make their points clear.\nA. use facial expressions\nB. use lively hand gestures\nC. use lively arm gestures\nD. speak in a loud voice\n(2)单选题 In China and Japan，when giving or receiving things，it's more respectful to\n________ .\nA. use one hand\nB. use both hands\nC. use the left hand\nD. use the right hand\n(3)单选题 In some Middle Eastern countries like Egypt，a thumbs–up is considered ________ .\nA. a sign of agreement\nB. a friendly gesture\nC. an impolite gesture\nD. a lovely gesture\n(4)单选题 Which of the following is true about British people？ ________\nA. They use a lot of hand gestures when talking.\nB. They move their hands a lot when talking.\nC. They only point things out with hand gestures.\nD. They don't move their hands much while talking.\n(5)单选题 Which behavior is proper when traveling in Bulgaria？ ________\nA. Shaking your head to say \"yes\".\nB. Shaking your head to say \"no\".\nC. Shaking your hand to say \"yes\".\nD. Nodding your head to say \"yes\".\n(6)单选题 What is the main idea of the passage？ ________\nA. Different ways of greeting around the world.\nB. Hand–gesture customs in various countries.\nC. The importance of eye contact in communication.\nD. How body language varies across different cultures.",
    "answer": "(1) C (2) B (3) C (4) D (5) A (6) D",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 16,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 细节理解题。根据表格第二排\"Italians often use lively arm gestures to emphasize （强\n调） points.\"（意大利人经常用活泼的手臂手势来强调要点。）可知，意大利人经常用活\n泼的手臂手势来使要点清晰。故选C。\n【小题2】 细节理解题。根据表格第三排\"In some Asian countries，like China and Japan，using\nboth hands shows greater respect and politeness.\"（在中国和日本这样的亚洲国家，\n用双手接送物品更显尊重和礼貌。）可知，在中国和日本，用双手接送物品更显尊重和礼\n貌，故选B。\n【小题3】 细节理解题。根据表格第四排\"In some Middle Eastern countries，like Egypt，it can\nbe rude.\"（在一些中东国家，比如埃及，竖大拇指可能是粗鲁的。）可知，在一些中东\n国家，比如埃及，竖大拇指被认为是不礼貌的手势。故选C。\n【小题4】 细节理解题。根据表格第二排\"British people usually do not move their hands much\nwhen they talk.\"（英国人通常说话时手的动作不多。）可知，英国人通常说话时手的动\n作不多，故选D。\n【小题5】 细节理解题。根据表格最后一排\"In most countries，nodding means 'yes' and shaking\nyour head means 'no'.\"（在大多数国家，点头意味着\"是\"，摇头意味着\"否\"。）和\"In\nBulgaria，it's the opposite.\"（在保加利亚，情况正好相反。）可知，保加利亚的点头和\n摇头与大多数国家相反，摇头表示\"是\"，故选A。\n【小题6】 主旨大意题。根据第一段\"Ever wonder why your friends from another country might\nnot look you in the eye，or why they greet you in a different way？Around the\nworld，body language speaks as loudly as words.\"（你有没有想过，为什么你来自另\n一个国家的朋友可能不会直视你的眼睛，或者为什么他们以不同的方式问候你？在世界各\n地，肢体语言和言语一样响亮。）可知，本文主要介绍了不同国家的肢体语言差异。故选\nD。"
  },
  {
    "id": "xdf-373148eddbd0ac48",
    "type": "completion",
    "text": "阅读短文及文后选项, 选出可以填入空白处的最佳选项。\nTwenty–six years ago, David went deep into the rainforest and got lost for three weeks. But\nhe got out of the forest successfully (1) ____\nDavid always wanted to travel in a rainforest. Later, he and his friend Ken, started out\ntogether.\n(2) ____ So they built a boat and started. When they went near a waterfall, they fell\ninto the water. (3) ____ David then spent four days trying to find his friend but he couldn’t.\nDuring this time, some fishermen saved Ken. He quickly went to the town and asked for help\nfrom the people there.\nDeep in the forest. David was lost and alone. Also he found some dangerous animals around.\nAs the days passed, David had no food and became ill. (4) ____\nOne day, David heard the sound of a boat engine. He tried his best to get to the river bank\n（河岸）. (5) ____ Together, they finally saved David.\nA. Ken swam to the bank but David was rushed down the river.\nB. Their plan was to travel on a boat down a big river.\nC. The question is——how did he do that?\nD. It was Ken and the rescue group on the boat.\nE. He wanted to give up many times.",
    "answer": "(1) C (2) B (3) A (4) E (5) D",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 17,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "本文讲了26年前，大卫深入雨林迷路了三个星期，但他成功地走出了森林。详细地介绍了他是如何脱\n险的。\n根据“Twenty﹣six years ago, David went deep into the rainforest and got lost for three weeks. But\nhe got out of the forest successfully,”可知，此处应该介绍他是如何逃生的；选项C“问题是——他是\n怎么做到的？”符合语境。故选C。\n根据“So they built a boat and started.”于是他们造了一条船就出发了，可知说的是旅行工具，选项\nB“他们的计划是乘船沿大河航行”符合语境。故选B。\n根据“When they went near a waterfall, they fell into the water.”可知此处应说结果怎样，选项A“肯\n游到岸边，但大卫被冲下了河。”符合语境。故选A。\n根据“As the days passed, David had no food and became ill.”可知这是困难遭遇，应该介绍大卫的\n想法，选项E“他多次想放弃。”符合语境。故选E。\n根据“Together, they finally saved David.”他们终于一起救了大卫，此处应该介绍大卫获救的原因，选\n项D“是肯和船上的救援队。”符合语境。故选D。"
  },
  {
    "id": "xdf-87c26c9a15ed9781",
    "type": "cloze",
    "text": "Choose the words and complete the passage（选择最恰当的单词，完成短文）\nStudents in China have one less things to put in their backpacks these days.The government\nrecently banned（禁止）smartphones in public schools for all students through nine\ngrades.Many schools around the world like Germany，Japan，the United States have similar\nbans.\nSome educators say kids pay better attention in class when they aren't looking at their phones\nall the time.They say banning phones（1） students to talk to each other more.\nMost teachers would agree that they don't want a classroom full of kids texting（发短信）.But\nmany say a total ban on phones isn't（2） .Some people argue that it's better to teach\nkids to use technology responsibly than take it away.Also，many parents point out that they\nneed to be able to reach their kids during the day.\nYes!Smartphones make it（3） for students to concentrate in class.Kids might play\ngames，watch videos，or check out apps instead of paying attention to the teacher.They can\neasily miss important information.Besides，a ringing or buzzing phone distracts（使……分心）\nother students.Also，some kids might use their phones to cheat.They could go online and look\nup（4） to a test，or they could turn to their friends for help.\nNo!Students should be able to have their phones with them in case of an（5） .Kids\nneed a way to get in touch with their parents if they get sick，if the school bus breaks down，or\neven if they forget their lunch at home.Smartphones can actually help kids do better in\nschool.We can use them to go online and do research for a class project or for help with writing\nessays.（6） ，there are great educational apps we can use.They can help us study\nbetter.It's not a good idea to ban phones in school.\n(1) A. begs B. invites C. teaches D. encourages\n(2) A. important B. necessary C. enough D. effective\n(3) A. difficult B. right C. interesting D. disappointin\ng\n(4) A. ideas B. answers C. news D. dictionaries\n(5) A. event B. interview C. argument D. emergency\n(6) A. For example B. In brief C. In addition D. As a result",
    "answer": "(1) D (2) B (3) A (4) B (5) D (6) C",
    "sources": [
      {
        "file": "错题_31_20260922_215712.pdf",
        "number": 18,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 D 动词辨析。A乞求，B邀请，C教，D鼓励，根据上句They say banning phones他们说禁\n止打电话，应该是鼓励学生多交谈，故答案是D。\n【小题2】 B 形容词辨析。A重要的，B必要的，C足够的，D有效的，根据下句Some people argue\nthat it's better to teach kids to use technology responsibly than take it away.有些人认\n为，教孩子负责任地使用科技比把科技拿走要好。可知但许多人说，完全禁止手机是没有\n必要的，故答案是B。\n【小题3】 A 形容词辨析。A困难的，B正确的，C有趣的，D失望的，根据下句 Kids might play\ngames，watch videos，or check out apps instead of paying attention to the teacher.\n孩子们可能会玩游戏、看视频或查看应用程序，而不是关注老师。可知智能手机使学生在\n课堂上很难集中注意力，故答案是A。\n【小题4】 B 名词辨析。A主意，想法，B答案，C消息，D词典，根据上句Also，some kids might\nuse their phones to cheat.另外，有些孩子可能会用手机作弊。可知应该是用手机上网找\n答案，故答案是B。\n【小题5】 D 名词辨析。A事件，B采访，C争论，D紧急情况，根据下句Kids need a way to get in\ntouch with their parents if they get sick，if the school bus breaks down，or even if\nthey forget their lunch at home.如果孩子们生病了，校车坏了，甚至忘了在家吃午饭，他\n们都需要一种与父母联系的方式。可知学生们应该能够在紧急情况下随身携带手机，故答\n案是D。\n【小题6】 C 短语辨析。A例如，B简而言之，B此外，C因此，根据上句We can use them to go\nonline and do research for a class project or for help with writing essays.我们可以利用\n它们上网，为班级项目做研究，或者帮助写论文，后面there are great educational apps\nwe can use我们可以使用一些很好的教育应用程序，此外符合语境，故答案是C。"
  },
  {
    "id": "xdf-00ddc926a6bb1726",
    "type": "fill",
    "text": "用括号中所给单词的适当形式填空，每空限填一词。\nAs a music lover, I have a strong (1) (prefer) for classical music. The smooth (2)\n(melody) of these classic pieces are like a beautiful symphony that calms my soul.\nListening to them is a form of true (3) (relax). (4) (music) create such\nwonderful musical works, which are (5) (wide) loved. They encourage me in my daily\nlife, making me feel (6) (confidence) and bringing me endless enjoyment.",
    "answer": "preference； melodies； relaxation； Musicians； widely； confident",
    "sources": [
      {
        "file": "错题_32_20260922_215717.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本文主要讲述作者对古典音乐的喜爱及其带来的积极影响。\n句意：作为音乐爱好者，我偏爱古典音乐。根据“I have a strong...for classical music.”可知，动词\nprefer应变为名词“preference”，意为“偏爱”，作宾语。故填preference。\n句意：这些经典作品流畅的旋律就像一首美丽的交响乐，让我的灵魂平静下来。根据“The smooth...\nof these classic pieces are...”可知，谓语动词为复数are，主语需用复数形式，melody的复数为\nmelodies。故填melodies。\n句意：聆听它们是一种真正的放松。空前为介词of，动词relax应变为名词“relaxation”，意为“放松”，\n作宾语。故填relaxation。\n句意：音乐家们创作了如此美妙的音乐作品，这些作品广受喜爱。根据“...create such wonderful\nmusical works”可知，空格处需填表示人的名词作主语，music应变为“musician”，意为“音乐家”，谓\n语动词create为动词原形，主语为复数musicians，句首首字母大写。故填Musicians。\n句意：音乐家们创作了如此美妙的音乐作品，这些作品广受喜爱。wide为形容词，此处变为副词\nwidely，意为“广泛地”，修饰动词loved。故填widely。\n句意：它们在我的日常生活中鼓励着我，让我感到自信并带给我无尽的享受。feel为感官系动词，后\n接形容词作表语，confidence的形容词形式为confident，意为“有信心的，自信的”，故填confident。"
  },
  {
    "id": "xdf-0156526aa027d69d",
    "type": "fill",
    "text": "Shirley is talking to Kelly about the Victorian–era clothing (维多利亚时代服饰).\nShirley: Look at the picture. How beautiful the clothes are! But we seldom see such clothes\nnowadays, (1) ?（写出反义疑问句）\nKelly: The dresses belong to the Victorian era. They are very special.\nShirley: (2) ?（根据下文回答进行提问）\nKelly: They are super long and have wide skirts. Ladies even wear “crinolines” (裙撑) to make the\nskirts look bigger.\nShirley: Did ordinary women wear dresses like this?\nKelly: (3) .（对上面的提问作出否定回答）Rich ladies liked such fancy dresses.\nShirley: Well, I see. (4) ?（根据下文回答进行提问）\nKelly: Because it was a sign of social status and elegance. Sometimes even diamonds were\ndecorated on the dress!\nShirley: Wow. Dresses with diamonds must be more expensive. Only wealthy women could\nafford (买得起) them. Do we wear the Victorian dresses today, maybe on special days?\nKelly: Usually, we don't wear them. They are too heavy to wear in daily life. But in some special\ncases, like a costume party, women may wear a Victorian dress.\nShirley: You are right, Kelly. Thank you for telling me so much about Victorian dresses.\nKelly: (5) .（做出恰当的应答）",
    "answer": "do we； What do the Victorian\u0000era dresses look like； No, they didn’t； Why were the Victorian\u0000era dresses so special； You’re welcome",
    "sources": [
      {
        "file": "错题_32_20260922_215717.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本文是Shirley和Kelly两人关于维多利亚时代服饰的对话，包括服饰特点、穿着人群、特殊原因以及现\n代穿着情况等。\n“But we seldom see such clothes nowadays”是一个否定句，且句子时态是一般现在时，主语\n是“we”，在反义疑问句中，前半句为否定句，后半句要用肯定形式，借助助动词“do”，此处强调的\n是“我们”，用do we。故填do we。\n根据答语“They are super long and have wide skirts. Ladies even wear ‘crinolines’ (裙撑) to make\nthe skirts look bigger.”可知，此处在询问维多利亚时代服饰的样子。故填What do the Victorian–era\ndresses look like。\n根据“Did ordinary women wear dresses like this?”以及“Rich ladies liked such fancy dresses.”可\n知，要对上面的提问作出否定回答。故填No, they didn’t。\n根据答语“Because it was a sign of social status and elegance. Sometimes even diamonds were\ndecorated on the dress!”可知，此处在询问维多利亚时代服饰如此特别的原因。故填Why were the\nVictorian–era dresses so special。\n根据“Thank you for telling me so much about Victorian dresses.”可知，此处要对感谢作出回应。故\n填You’re welcome。"
  },
  {
    "id": "xdf-0a4cd5b25c06dd33",
    "type": "reading",
    "text": "One day, an ambitious young man traveled a long distance to visit the home of Socrates (苏\n格拉底). He approached him respectfully and said, “Sir, I have come to ask for your guidance. Will\nyou teach me how to become truly successful?”\nSocrates looked at him with a calm expression and replied, “I will help you. Follow me.” He\nled the young man towards the ocean without further explanation. When they reached the\nshore, Socrates continued walking straight into the water. The young man followed, confused\nbut curious. Once they were both chest–deep (深及胸部的) in the sea, Socrates suddenly placed\nhis hands on the young man’s head and pushed him underwater. The young man struggled (挣\n扎) and fought his way back to the surface after about ten seconds, gasping for air (大口喘气).\nSocrates simply turned and walked back to the shore without saying anything.\nFeeling confused and disrespected, the young man left, telling himself he would never\nreturn. However, after a week, he began to reflect. Maybe there was a reason for Socrates’\nstrange action. He decided to give the wise man another chance.\nHe visited Socrates again and said, “I still wish to learn. Please teach me the secret of\nsuccess.” Once again, Socrates led him into the ocean and pushed his head under the water.\nThis time, the young man was more prepared. He took a deep breath before going under and\ntried to hold it for nearly thirty seconds. But when he surfaced, Socrates was already walking\naway. The young man felt angry and embarrassed.\nAnother month went by. The young man still deeply wanted to succeed. He decided to try\none last time. He approached Socrates and said, “I am here again. Please teach me what I need\nto learn.”\nThen they walked into the ocean. As soon as Socrates grabbed (抓住) his head, the young\nman took a deep breath and relaxed. This time, he held his breath for almost two minutes. When\nhe finally came up, Socrates was already on the beach.\nExtremely angry, the young man ran out of the water and shouted, “Why do you keep\ndunking my head instead of teaching me your wisdom?”\nSocrates turned to him and said calmly, “Listen, my son. I have been teaching you all along. If\nyou want to succeed as badly as you wanted to breathe when you were underwater, you will\nbecome successful. That is the only secret.”\nThe young man finally understood: True success requires (1) ________ .\n(1)填空题 Socrates didn’t say anything after the first time pushing the young man’s head\nunderwater, did he?\n(2)填空题 Why did the young man travel a long distance to visit the home of Socrates?\n(3)填空题 What two things did the young man do to better prepare himself during the second\nvisit?\n(4)填空题 When did the young man go to visit Socrates for the third time?\n(5)填空题 How did Socrates teach the young man the lesson instead of just telling it?\n(6)填空题 What can be filled in the blank to complete the sentence?",
    "answer": null,
    "sources": [
      {
        "file": "错题_32_20260922_215717.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 根 据 “Socrates simply turned and walked back to the shore without saying\nanything.”可知，苏格拉底确实什么也没说。故填No, he didn’t.\n【小题2】 根据“Sir, I have come to ask for your guidance. Will you teach me how to become\ntruly successful?”可知，年轻人来拜访苏格拉底是为了向苏格拉底请教如何成功。故填\nBecause he wanted Socrates to teach him how to become truly successful.\n【小题3】 根据“He took a deep breath before going under and tried to hold it for nearly thirty\nseconds.”可知，他做了两件事，深吸一口气，并尝试憋气将近三十秒。故填He took a\ndeep breath before going under and tried to hold it for about thirty seconds.\n【小题4】 根据“Another month went by. The young man still deeply wanted to succeed. He\ndecided to try one last time.”可知，他是在第二次拜访的一个月之后再次前往。故填He\nvisited Socrates for the third time one month after the second visit.\n【小题5】 根据全文可知，苏格拉底没有直接说出道理，而是通过三次将他按入水中，让他亲身体验\n渴望呼吸的感觉来领悟成功之道。故填He repeatedly pushed the young man\nunderwater so that the young man would experience the strong need for air, helping\nhim realize he needed an equally strong desire for success.\n【小题6】 根据“If you want to succeed as badly as you wanted to breathe when you were\nunderwater, you will become successful.”可知，苏格拉底的话表示如果想成功的话，就\n需要极度强烈的渴望。故填a strong desire。"
  },
  {
    "id": "xdf-f5bc76dc94587d1c",
    "type": "written",
    "text": "如果我们尊重文化差异，我们可以更加有效地交流。（respect，effectively）\n________\n请在线框范围内作答",
    "answer": "If we respect cultural differences，we can communicate more effectively.",
    "sources": [
      {
        "file": "错题_32_20260922_215717.pdf",
        "number": 4,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句子为含有连词if引导的条件状语从句，遵循\"主情从现\"原则。即主句含有情态动词，从句使用一般现\n在时。如果：If；我们：we；尊重：respect；文化差异：cultural differences；我们可以：we can；\n更加有效地交流：communicate more effectively。结合语境，所以这里从句\"if we respect cultural\ndifferences\"用一般现在时，\"respect\"用原形。\n故答案为：If we respect cultural differences，we can communicate more effectively."
  },
  {
    "id": "xdf-55bfdf38d8fc86e1",
    "type": "fill",
    "text": "在短文的空格内填入适当的词，使其内容通顺，每空格限填一词，首字母已给\n1\nLaughter is n (1) for people. We start to laugh at about four months of\nage. We start to laugh even before we start to speak!\n2\nLaughter is social. It c (2) us with other people. We laugh more when we\nare with other people. Studies find that we are 30 times more likely to laugh with others\nthan when we are alone. When one person laughs, other people begin to laugh, too.\n3\nIt is difficult to pretend to laugh. Laughter is h (3) . Try to laugh right\nnow. It’s difficult, isn’t it? When people pretend to laugh, most people know it’s not\nreal. Studies show that people don’t like the sound of fake (虚假的) laughter.\nWhen do people laugh?\nOnly 10 to 20 percent of laughter is about something funny. Most laughter is about\nbeing friendly with other people. Most laughter says, “I don’t want to compete with you.\nI like to be with you.” This kind of laughter brings people t (4) .\nWe often laugh when we feel nervous. At the beginning of the meetings, someone often\ntells a joke. It’s usually a small joke, but we laugh a lot. Our laughter helps us relax.\nWhat is funny?\n5\nSome things are funny because we don’t e (5) them. When a joke begins, we\nalready have an idea about the end. We think we know the end, but then the joke ends in a\ndifferent way. The end of the joke surprises us. It makes us laugh.\nSilly things are sometimes funny. We laugh at jokes about people and their mistakes\n6\nbecause we know s (6) they don’t know. We think we are better than they are.\nNot everyone has the same sense of humor. Some people think a joke is funny, but other\npeople don’t think so. People have different ideas about what is funny. For young\nchildren, the world is new. Many things surprise them, so they laugh a lot. Teenagers\noften worry about what others think of them. They laugh to p (7) 7 themselves.\nTeenagers laugh when they feel embarrassed. Adults laugh at things that give them stress.\nOur reasons for laughter change over time.",
    "answer": "1 (n)atural 2 (c)onnects 3 (h)onest 4 (t)ogether 5 (e)xpect 6 (s)omething 7 (p)rotect",
    "sources": [
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本文主要谈论笑在人们生活中的作用，并解答人们何时会笑，为什么会笑。\n句意：笑对人来说是自然的。根据“We start to laugh at about four months of age...”可知我们\n大约四个月大的时候就开始笑了，所以笑是自然的，作be动词的表语用形容词natural“自然的”。故\n填(n)atural。\n句意：它把我们和其他人联系在一起。根据“We laugh more when we are with other people”可知\n当我们和别人在一起时，我们笑得更多，所以笑把我们和其他人联系在一起，connect“联系”，句子\n用一般现在时，主语是It，谓语动词用单三。故填(c)onnects。\n句意：笑声是诚实的。根据“It is difficult to pretend”可知，笑是很难假装的，所以笑声是诚实\n的，honest表示“诚实的”，形容词作表语，故填(h)onest。\n句意：这种笑声让人们走到一起。根据“I like to be with you”可知，这种笑声表达出来就是要跟\n对方走到一起，together“一起”，故填(t)ogether。\n句意：有些事情之所以有趣，是因为我们并不期待它们。根据“We think we know the end, but then\nthe joke ends in a different way”可知，我们以为我们知道结局，但后来笑话以不同的方式结束\n了，所以结果并不是我们预期那样的时候，这件事情才变得有趣，expect表示“期待”，don’t后接动\n词原形，故填(e)xpect。\n句意：我们嘲笑别人和他们的错误，因为我们知道一些他们不知道的事情。根据“they don’t\nknow”可知是知道一些他们不知道的事情，something“一些事情”。故填(s)omething。\n句意：他们笑是为了保护自己。根据“Teenagers often worry about what others think of\nthem.”可知，青少年担心别人对自己的想法，所以用笑来保护自己，protect“保护”符合，动词不定\n式符号to后接动词原形，故填(p)rotect。"
  },
  {
    "id": "xdf-e653b7af25c5275d",
    "type": "choice",
    "text": "Our school is only ________ walk from here.\nA. ten-minute\nB. ten minute’s\nC. ten minutes\nD. ten minutes’",
    "answer": "D",
    "sources": [
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我们学校离这里只有十分钟的步行路程。\n考查名词所有格用法。ten-minute十分钟的，复合形容词，作定语时需与a连用，如a ten-minute\nwalk；ten minute’s语法错误；ten minutes十分钟；ten minutes’十分钟的。此处应用名词所有格\n形式，修饰walk，D项符合。故选D。"
  },
  {
    "id": "xdf-ffbb9976ed6b58ad",
    "type": "reading",
    "text": "Ever wonder why your friends from another country might not look you in the\neye，or why they greet you in a different way？Around the world，body language speaks as\nloudly as words.\nIn the USA，strong eye contact In China，avoiding too much eye\nshows you're confident and contact is a sign of respect，\ninterested. especially with older people.\nItalians often use lively arm British people usually do not\ngestures to emphasize （强调） move their hands much when they\npoints. talk.\nIn some Asian countries，like\nIn the USA，it's common to use\nChina and Japan，using both hands\none hand for giving or\nshows greater respect and\nreceiving things.\npoliteness.\nIn some Middle Eastern\nA thumbs-up means \"good job\" in\ncountries，like Egypt，it can be\nmany countries.\nrude.\nIn most countries，nodding\nmeans \"yes\" and shaking your In Bulgaria，it's the opposite.\nhead means \"no\".\n1.单选题\nItalians often ________ to make their points clear.\nA. use facial expressions\nB. use lively hand gestures\nC. use lively arm gestures\nD. speak in a loud voice\n2.单选题\nIn China and Japan，when giving or receiving things，it's more respectful to ________ .\nA. use one hand\nB. use both hands\nC. use the left hand\nD. use the right hand\n3.单选题\nIn some Middle Eastern countries like Egypt，a thumbs-up is considered ________ .\nA. a sign of agreement\nB. a friendly gesture\nC. an impolite gesture\nD. a lovely gesture\n4.单选题\nWhich of the following is true about British people？ ________\nA. They use a lot of hand gestures when talking.\nB. They move their hands a lot when talking.\nC. They only point things out with hand gestures.\nD. They don't move their hands much while talking.\n5.单选题\nWhich behavior is proper when traveling in Bulgaria？ ________\nA. Shaking your head to say \"yes\".\nB. Shaking your head to say \"no\".\nC. Shaking your hand to say \"yes\".\nD. Nodding your head to say \"yes\".\n6.单选题\nWhat is the main idea of the passage？ ________\nA. Different ways of greeting around the world.\nB. Hand-gesture customs in various countries.\nC. The importance of eye contact in communication.\nD. How body language varies across different cultures.",
    "answer": "(1) C (2) B (3) C (4) D (5) A (6) D",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_33_20260922_215725.pdf","number":16,"page":4,"sha256":"27bf95241789cc908f29be74f52ce4d0bd89394724ee48a1a171df23809f9b9a"},
    "sources": [
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 16,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据表格第二排\"Italians often use lively arm gestures to emphasize\n（强调） points.\"（意大利人经常用活泼的手臂手势来强调要点。）可知，意大利人经常用\n活泼的手臂手势来使要点清晰。故选C。\n\n第 2 小题：\n细节理解题。根据表格第三排\"In some Asian countries，like China and Japan，using\nboth hands shows greater respect and politeness.\"（在中国和日本这样的亚洲国家，用\n双手接送物品更显尊重和礼貌。）可知，在中国和日本，用双手接送物品更显尊重和礼貌，\n故选B。\n\n第 3 小题：\n细节理解题。根据表格第四排\"In some Middle Eastern countries，like Egypt，it can\nbe rude.\"（在一些中东国家，比如埃及，竖大拇指可能是粗鲁的。）可知，在一些中东国\n家，比如埃及，竖大拇指被认为是不礼貌的手势。故选C。\n\n第 4 小题：\n细节理解题。根据表格第二排\"British people usually do not move their hands much\nwhen they talk.\"（英国人通常说话时手的动作不多。）可知，英国人通常说话时手的动作\n不多，故选D。\n\n第 5 小题：\n细节理解题。根据表格最后一排\"In most countries，nodding means 'yes' and shaking\nyour head means 'no'.\"（在大多数国家，点头意味着\"是\"，摇头意味着\"否\"。）和\"In\nBulgaria，it's the opposite.\"（在保加利亚，情况正好相反。）可知，保加利亚的点头和\n摇头与大多数国家相反，摇头表示\"是\"，故选A。\n\n第 6 小题：\n主旨大意题。根据第一段\"Ever wonder why your friends from another country might\nnot look you in the eye，or why they greet you in a different way？Around the\nworld，body language speaks as loudly as words.\"（你有没有想过，为什么你来自另一\n个国家的朋友可能不会直视你的眼睛，或者为什么他们以不同的方式问候你？在世界各地，\n肢体语言和言语一样响亮。）可知，本文主要介绍了不同国家的肢体语言差异。故选D。"
  },
  {
    "id": "xdf-8069e853b4d60032",
    "type": "completion",
    "text": "阅读短文及文后选项, 选出可以填入空白处的最佳选项。\nTwenty-six years ago, David went deep into the rainforest and got lost for three\n1\nweeks. But he got out of the forest successfully (1) ____\nDavid always wanted to travel in a rainforest. Later, he and his friend Ken, started\nout together.\n2\n(2) ____ So they built a boat and started. When they went near a waterfall,\n3\nthey fell into the water. (3) ____ David then spent four days trying to find his\nfriend but he couldn’t. During this time, some fishermen saved Ken. He quickly went to\nthe town and asked for help from the people there.\nDeep in the forest. David was lost and alone. Also he found some dangerous animals\naround. As the days passed, David had no food and became ill. (4) ____ 4\nOne day, David heard the sound of a boat engine. He tried his best to get to the river\nbank（河岸）. (5) ____ 5 Together, they finally saved David.\nA. Ken swam to the bank but David was rushed down the river.\nB. Their plan was to travel on a boat down a big river.\nC. The question is——how did he do that?\nD. It was Ken and the rescue group on the boat.\nE. He wanted to give up many times.",
    "answer": "1-5 CBAED",
    "sources": [
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 17,
        "page": 5
      }
    ],
    "review": "pending",
    "explanation": "本文讲了26年前，大卫深入雨林迷路了三个星期，但他成功地走出了森林。详细地介绍了他是如何脱险\n的。\n根据“Twenty﹣six years ago, David went deep into the rainforest and got lost for three\nweeks. But he got out of the forest successfully,”可知，此处应该介绍他是如何逃生的；选项\nC“问题是——他是怎么做到的？”符合语境。故选C。\n根据“So they built a boat and started.”于是他们造了一条船就出发了，可知说的是旅行工具，\n选项B“他们的计划是乘船沿大河航行”符合语境。故选B。\n根据“When they went near a waterfall, they fell into the water.”可知此处应说结果怎样，选\n项A“肯游到岸边，但大卫被冲下了河。”符合语境。故选A。\n根据“As the days passed, David had no food and became ill.”可知这是困难遭遇，应该介绍大\n卫的想法，选项E“他多次想放弃。”符合语境。故选E。\n根据“Together, they finally saved David.”他们终于一起救了大卫，此处应该介绍大卫获救的原\n因，选项D“是肯和船上的救援队。”符合语境。故选D。"
  },
  {
    "id": "xdf-40ac4840f8ae5e59",
    "type": "cloze",
    "text": "Choose the words and complete the passage（选择最恰当的单词，完成短文）\nStudents in China have one less things to put in their backpacks these days.The government\nrecently banned（禁止）smartphones in public schools for all students through nine\ngrades.Many schools around the world like Germany，Japan，the United States have similar\nbans.\nSome educators say kids pay better attention in class when they aren't looking at their\nphones all the time.They say banning phones（1） 1 students to talk to each other\nmore.\nMost teachers would agree that they don't want a classroom full of kids texting（发短\n信）.But many say a total ban on phones isn't（2） 2 .Some people argue that it's\nbetter to teach kids to use technology responsibly than take it away.Also，many parents\npoint out that they need to be able to reach their kids during the day.\nYes!Smartphones make it（3） 3 for students to concentrate in class.Kids might play\ngames，watch videos，or check out apps instead of paying attention to the teacher.They can\neasily miss important information.Besides，a ringing or buzzing phone distracts（使……分\n心）other students.Also，some kids might use their phones to cheat.They could go online\nand look up（4） 4 to a test，or they could turn to their friends for help.\nNo!Students should be able to have their phones with them in case of an（5） 5 .Kids\nneed a way to get in touch with their parents if they get sick，if the school bus breaks\ndown，or even if they forget their lunch at home.Smartphones can actually help kids do\nbetter in school.We can use them to go online and do research for a class project or for\nhelp with writing essays.（6） 6 ，there are great educational apps we can use.They can\nhelp us study better.It's not a good idea to ban phones in school.\n1. A. begs B. invites C. teaches D. encourages\n2. A. important B. necessary C. enough D. effective\n3. A. difficult B. right C. interesting D. disappointing\n4. A. ideas B. answers C. news D. dictionaries\n5. A. event B. interview C. argument D. emergency\n6. A. For example B. In brief C. In addition D. As a result",
    "answer": "1-5 DBABD 6-6 C",
    "sources": [
      {
        "file": "错题_33_20260922_215725.pdf",
        "number": 18,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "1.D 动词辨析。A乞求，B邀请，C教，D鼓励，根据上句They say banning phones他们说禁止打电话，\n应该是鼓励学生多交谈，故答案是D。\n2.B 形容词辨析。A重要的，B必要的，C足够的，D有效的，根据下句Some people argue that it's\nbetter to teach kids to use technology responsibly than take it away.有些人认为，教孩子负\n责任地使用科技比把科技拿走要好。可知但许多人说，完全禁止手机是没有必要的，故答案是B。\n3.A 形容词辨析。A困难的，B正确的，C有趣的，D失望的，根据下句 Kids might play games，watch\nvideos，or check out apps instead of paying attention to the teacher.孩子们可能会玩游戏、\n看视频或查看应用程序，而不是关注老师。可知智能手机使学生在课堂上很难集中注意力，故答案是\nA。\n4.B 名词辨析。A主意，想法，B答案，C消息，D词典，根据上句Also，some kids might use their\nphones to cheat.另外，有些孩子可能会用手机作弊。可知应该是用手机上网找答案，故答案是B。\n5.D 名词辨析。A事件，B采访，C争论，D紧急情况，根据下句Kids need a way to get in touch with\ntheir parents if they get sick，if the school bus breaks down，or even if they forget\ntheir lunch at home.如果孩子们生病了，校车坏了，甚至忘了在家吃午饭，他们都需要一种与父母联\n系的方式。可知学生们应该能够在紧急情况下随身携带手机，故答案是D。\n6.C 短语辨析。A例如，B简而言之，B此外，C因此，根据上句We can use them to go online and do\nresearch for a class project or for help with writing essays.我们可以利用它们上网，为班级\n项目做研究，或者帮助写论文，后面there are great educational apps we can use我们可以使用一\n些很好的教育应用程序，此外符合语境，故答案是C。"
  },
  {
    "id": "xdf-5d292e3d293d6b6c",
    "type": "cloze",
    "text": "Choose the best answer to complete the passage（选择最恰当的选项完成短文）\nPeople tell bad stories about wolves. They say wolves like to kill and eat people.\nFarley remembered these stories, and he was 1 . So he had his gun with him all the\ntime.\nOne day, he saw a group of 2 . There was a mother wolf with four baby wolves. A\nfather wolf and another young wolf lived with them.\nFarley watched the wolves every day. The mother was a very 3 mother. She gave\nmilk to her babies. She gave them lessons about life. They learned how to get food. The\nfather wolf got food for the mother. The young wolf played with the children. They were a\nnice happy family — a wolf family! Farley did not need his 4 any more.\nIn a short time, he got on well with the wolf family. Farley 5 them for 5 months.\nHe learned many new things about wolves. He learned that many stories about the wolves\nwere not 6 . Wolves do not eat people. They do not eat many large animals, and they\nalso learned bad things about men. It was men who killed many wolves.\nLater, Farley wrote a book about wolves. He wanted people to understand them and not to\nkill them.\n1. A. afraid B. happy C. angry D. tired\n2. A. animals B. wolves C. people D. babies\n3. A. thirsty B. hungry C. good D. bad\n4. A. food B. clothes C. gun D. plane\n5. A. saw B. watched C. looked D. noticed\n6. A. honest B. true C. alive D. simple",
    "answer": "1-5 ABCCB 6-6 B",
    "sources": [
      {
        "file": "错题_34_20260922_215730.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "1.句意：法利牢记这些故事，他很害怕。\nafraid害怕的；happy高兴的；angry愤怒的；tired疲倦的。根据“He had his gun with him all the\ntime”可知此处指“他很害怕”。故选A。\n2.句意：一天，他看到一群狼。\nanimals动物；wolves狼；people人们；babies婴儿。根据下文“There was a mother wolf with four\nbaby wolves. A father wolf and another young wolf lived with them”有母狼、幼狼、狼爸爸和\n另一只小狼；可知此处指“看到一群狼”；故选B。\n3.句意：这位妈妈是一位非常好的妈妈。\nthirsty口渴的；hungry饥饿的；good好的；bad坏的。根据下文“She gave milk to her babies. She\ngave them lessons about life…”给孩子喂奶，教它们生活的本领；可知，是位好妈妈。故选C。\n4.句意：法利不再需要他的枪了。\nfood食物；clothes衣服；gun枪；plane飞机。上文因为害怕狼，法利总是带着枪，而下文“In a\nshort time, he got on well with the wolf family”他和狼一家相处得很好，可知此处指“不再需\n要枪了”。故选C。\n5.句意：法利观察了他们五个月。\nsaw看到，强调结果；watched观看，强调过程；looked看，提醒对方的注意；noticed注意。根据“for\n5 months”可知此处指“观察了五个月”，指“过程”。故选B。\n6.句意：他知道许多关于狼的故事都是不真实的。\nhonest诚实的；true真的；alive活着的；simple简单的。根据“People tell bad stories about\nwolves. They say wolves like to kill and eat people.”以及“Wolves do not eat people. They\ndo not eat many large animals, and they also learned bad things about men. It was men who\nkilled many wolves.”可知之前听到的许多关于狼的故事都是不真实的。故选B。"
  },
  {
    "id": "xdf-ea944a991fc6725a",
    "type": "fill",
    "text": "用括号中所给单词的适当形式填空，每空限填一词。\nAs a music lover, I have a strong (1) (prefer) for classical music. The\n2\nsmooth (2) (melody) of these classic pieces are like a beautiful symphony\n3\nthat calms my soul. Listening to them is a form of true (3) (relax). (4)\n4 5\n(music) create such wonderful musical works, which are (5) (wide)\nloved. They encourage me in my daily life, making me feel (6) 6 (confidence)\nand bringing me endless enjoyment.",
    "answer": "1 preference 2 melodies 3 relaxation 4 Musicians 5 widely 6 confident",
    "sources": [
      {
        "file": "错题_35_20260922_215737.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本文主要讲述作者对古典音乐的喜爱及其带来的积极影响。\n句意：作为音乐爱好者，我偏爱古典音乐。根据“I have a strong...for classical music.”可知，\n动词prefer应变为名词“preference”，意为“偏爱”，作宾语。故填preference。\n句意：这些经典作品流畅的旋律就像一首美丽的交响乐，让我的灵魂平静下来。根据“The smooth...\nof these classic pieces are...”可知，谓语动词为复数are，主语需用复数形式，melody的复数为\nmelodies。故填melodies。\n句意：聆听它们是一种真正的放松。空前为介词of，动词relax应变为名词“relaxation”，意为“放\n松”，作宾语。故填relaxation。\n句意：音乐家们创作了如此美妙的音乐作品，这些作品广受喜爱。根据“...create such wonderful\nmusical works”可知，空格处需填表示人的名词作主语，music应变为“musician”，意为“音乐\n家”，谓语动词create为动词原形，主语为复数musicians，句首首字母大写。故填Musicians。\n句意：音乐家们创作了如此美妙的音乐作品，这些作品广受喜爱。wide为形容词，此处变为副词\nwidely，意为“广泛地”，修饰动词loved。故填widely。\n句意：它们在我的日常生活中鼓励着我，让我感到自信并带给我无尽的享受。feel为感官系动词，后接\n形容词作表语，confidence的形容词形式为confident，意为“有信心的，自信的”，故填confident。"
  },
  {
    "id": "xdf-0bd1c3497fa6a10c",
    "type": "fill",
    "text": "Shirley is talking to Kelly about the Victorian-era clothing (维多利亚时代服饰).\nShirley: Look at the picture. How beautiful the clothes are! But we seldom see such\n1\nclothes nowadays, (1) ?（写出反义疑问句）\nKelly: The dresses belong to the Victorian era. They are very special.\n2\nShirley: (2) ?（根据下文回答进行提问）\nKelly: They are super long and have wide skirts. Ladies even wear “crinolines” (裙撑) to\nmake the skirts look bigger.\nShirley: Did ordinary women wear dresses like this?\n3\nKelly: (3) .（对上面的提问作出否定回答）Rich ladies liked such fancy dresses.\nShirley: Well, I see. (4) 4 ?（根据下文回答进行提问）\nKelly: Because it was a sign of social status and elegance. Sometimes even diamonds were\ndecorated on the dress!\nShirley: Wow. Dresses with diamonds must be more expensive. Only wealthy women could\nafford (买得起) them. Do we wear the Victorian dresses today, maybe on special days?\nKelly: Usually, we don't wear them. They are too heavy to wear in daily life. But in some\nspecial cases, like a costume party, women may wear a Victorian dress.\nShirley: You are right, Kelly. Thank you for telling me so much about Victorian dresses.\n5\nKelly: (5) .（做出恰当的应答）",
    "answer": "1 do we 2 What do the Victorian-era dresses look like 3 No, they didn’t 4 Why were the Victorian-era dresses so special 5 You’re welcome",
    "sources": [
      {
        "file": "错题_35_20260922_215737.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "本文是Shirley和Kelly两人关于维多利亚时代服饰的对话，包括服饰特点、穿着人群、特殊原因以及现\n代穿着情况等。\n“But we seldom see such clothes nowadays”是一个否定句，且句子时态是一般现在时，主语\n是“we”，在反义疑问句中，前半句为否定句，后半句要用肯定形式，借助助动词“do”，此处强调的\n是“我们”，用do we。故填do we。\n根据答语“They are super long and have wide skirts. Ladies even wear ‘crinolines’ (裙撑)\nto make the skirts look bigger.”可知，此处在询问维多利亚时代服饰的样子。故填What do the\nVictorian-era dresses look like。\n根据“Did ordinary women wear dresses like this?”以及“Rich ladies liked such fancy\ndresses.”可知，要对上面的提问作出否定回答。故填No, they didn’t。\n根据答语“Because it was a sign of social status and elegance. Sometimes even diamonds\nwere decorated on the dress!”可知，此处在询问维多利亚时代服饰如此特别的原因。故填Why were\nthe Victorian-era dresses so special。\n根据“Thank you for telling me so much about Victorian dresses.”可知，此处要对感谢作出回\n应。故填You’re welcome。"
  },
  {
    "id": "xdf-f0864632cf58777d",
    "type": "reading",
    "text": "One day, an ambitious young man traveled a long distance to visit the home of Socrates\n(苏格拉底). He approached him respectfully and said, “Sir, I have come to ask for your\nguidance. Will you teach me how to become truly successful?”\nSocrates looked at him with a calm expression and replied, “I will help you. Follow\nme.” He led the young man towards the ocean without further explanation. When they\nreached the shore, Socrates continued walking straight into the water. The young man\nfollowed, confused but curious. Once they were both chest-deep (深及胸部的) in the sea,\nSocrates suddenly placed his hands on the young man’s head and pushed him underwater. The\nyoung man struggled (挣扎) and fought his way back to the surface after about ten seconds,\ngasping for air (大口喘气). Socrates simply turned and walked back to the shore without\nsaying anything.\nFeeling confused and disrespected, the young man left, telling himself he would never\nreturn. However, after a week, he began to reflect. Maybe there was a reason for\nSocrates’ strange action. He decided to give the wise man another chance.\nHe visited Socrates again and said, “I still wish to learn. Please teach me the\nsecret of success.” Once again, Socrates led him into the ocean and pushed his head under\nthe water. This time, the young man was more prepared. He took a deep breath before going\nunder and tried to hold it for nearly thirty seconds. But when he surfaced, Socrates was\nalready walking away. The young man felt angry and embarrassed.\nAnother month went by. The young man still deeply wanted to succeed. He decided to try\none last time. He approached Socrates and said, “I am here again. Please teach me what I\nneed to learn.”\nThen they walked into the ocean. As soon as Socrates grabbed (抓住) his head, the\nyoung man took a deep breath and relaxed. This time, he held his breath for almost two\nminutes. When he finally came up, Socrates was already on the beach.\nExtremely angry, the young man ran out of the water and shouted, “Why do you keep\ndunking my head instead of teaching me your wisdom?”\nSocrates turned to him and said calmly, “Listen, my son. I have been teaching you all\nalong. If you want to succeed as badly as you wanted to breathe when you were underwater,\nyou will become successful. That is the only secret.”\nThe young man finally understood: True success requires (1) ________ .\n1.填空题\nSocrates didn’t say anything after the first time pushing the young man’s head\nunderwater, did he?\n1\n2.填空题\nWhy did the young man travel a long distance to visit the home of Socrates?\n1\n3.填空题\nWhat two things did the young man do to better prepare himself during the second visit?\n4.填空题\nWhen did the young man go to visit Socrates for the third time?\n1\n5.填空题\nHow did Socrates teach the young man the lesson instead of just telling it?\n1\n6.填空题\nWhat can be filled in the blank to complete the sentence?\n1",
    "answer": "1 No, he didn’t.",
    "sources": [
      {
        "file": "错题_35_20260922_215737.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n根 据 “Socrates simply turned and walked back to the shore without saying\nanything.”可知，苏格拉底确实什么也没说。故填No, he didn’t.\n\n第 2 小题：\n根据“Sir, I have come to ask for your guidance. Will you teach me how to become\ntruly successful?”可知，年轻人来拜访苏格拉底是为了向苏格拉底请教如何成功。故填\nBecause he wanted Socrates to teach him how to become truly successful.\n\n第 3 小题：\n根据“He took a deep breath before going under and tried to hold it for nearly\nthirty seconds.”可知，他做了两件事，深吸一口气，并尝试憋气将近三十秒。故填He\ntook a deep breath before going under and tried to hold it for about thirty\nseconds.\n\n第 4 小题：\n根据“Another month went by. The young man still deeply wanted to succeed. He\ndecided to try one last time.”可知，他是在第二次拜访的一个月之后再次前往。故填He\nvisited Socrates for the third time one month after the second visit.\n\n第 5 小题：\n根据全文可知，苏格拉底没有直接说出道理，而是通过三次将他按入水中，让他亲身体验渴\n望呼吸的感觉来领悟成功之道。故填He repeatedly pushed the young man underwater so\nthat the young man would experience the strong need for air, helping him realize\nhe needed an equally strong desire for success.\n\n第 6 小题：\n根据“If you want to succeed as badly as you wanted to breathe when you were\nunderwater, you will become successful.”可知，苏格拉底的话表示如果想成功的话，就\n需要极度强烈的渴望。故填a strong desire。"
  },
  {
    "id": "xdf-09563858f86234d3",
    "type": "choice",
    "text": "—Do you like cartoons or scary movies?\n—_______. They can cheer me up.\nA. Yes, I do\nB. No, I don't\nC. Cartoons\nD. Scary movies",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：——你喜欢动画片还是恐怖片？——恐怖片。它们能使我振奋。\n考查情景交际和选择疑问句。根据“Do you like cartoons or scary movies?”可知此处是选择疑问句，\n不用Yes或No回答，排除AB；再由答句中“They can cheer me up.”可知喜欢的是能使人振奋的恐怖\n片，用“Scary movies”符合语境。故选D。"
  },
  {
    "id": "xdf-fb13b4b620699805",
    "type": "cloze",
    "text": "What films are good for children?\nEvery year, a lot of films are made, but not all of them are good for young children. Before\nwe see a film in a cinema or watch a play in a , we should find out if it is suitable (适宜\n的) for us.\nA good film teaches us a lesson. For example, the film Beauty and the Beast tells us to love\nsomeone for his/her being good–hearted, not for his/her being . The Lion King teaches\nus to be brave and fair to others.\nSome films are forgotten while others stay in people's minds forever. Perhaps\nyou've seen a classic (经典的) film many times but still it. Every time you watch it, you\nlearn something new and fantastic.\nWatch Beauty and the Beast again, and you'll learn that good looks are not so important. If\nyou are sad, you watch Mouse Hunt again to make yourself happy. No matter you feel,\nthere's always a classic that can meet your need.\nThere are different kinds of films such as funny films, detective films, horror films, science-\nfiction, action films, love stories, and so on. , many of them are only suitable for adults.\n(1) A. theatre B. market C. church D. hospital\n(2) A. hard- B. ugly–looking C. best–selling D. good-\nworking looking\n(3) A. slowly B. quickly C. never D. hardly\n(4) A. hate B. dislike C. enjoy D. imagine\n(5) A. what B. how C. why D. when\n(6) A. Instead B. Therefore C. Luckily D. However",
    "answer": "(1) A (2) D (3) B (4) C (5) B (6) D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 考查：名词词义辨析。根据 “watch a play”（看戏剧），戏剧通常在 “theatre（剧院）” 里\n观看，“market（市场）”“church（教堂）”“hospital（医院）” 不符合语境，所以选 A。\n【小题2】 考查：形容词短语辨析。《美女与野兽》的寓意是爱一个人是因为其善良，而非外貌好\n看。“good–looking（好看的）” 符合语境，“hard–working（勤奋的）”“ugly - looking\n（难看的）”“best–selling（最畅销的）” 不符合，所以选 D。\n【小题3】 考查：副词词义辨析。句中 “while” 表示对比，后半句说有些电影永远留在人们脑海里，\n那么前半句应是有些电影 “quickly（很快地）” 被遗忘，“slowly（缓慢地）”“never（从\n不）”“hardly（几乎不）” 不符合对比逻辑，所以选 B。\n【小题4】 考查：动词词义辨析。根据 “seen a classic film many times”（看过经典电影很多次）以\n及 “learn something new and fantastic”（学到新的奇妙的东西），可知是仍然 “enjoy\n（喜欢）” 它，“hate（讨厌）”“dislike（不喜欢）”“imagine（想象）” 不符合，所以选\nC。\n【小题5】 考查：疑问词用法。“No matter how you feel” 表示 “无论你感觉如何”，“how” 用于询问\n感受、方式等，“what（什么）”“why（为什么）”“when（什么时候）” 不符合语境，所以\n选 B。\n【小题6】 考查：副词词义辨析。前文说有不同种类的电影，后文说很多只适合成年人，是转折关\n系。“However（然而）” 表转折，“Instead（代替）”“Therefore（因此）”“Luckily（幸运\n地）” 不符合逻辑，所以选 D。"
  },
  {
    "id": "xdf-1423f3b0809d6ade",
    "type": "choice",
    "text": "—When shall we have an evening party, on Wednesday or on Thursday?\n—________ day is OK. I'm free at any time.\nA. Both\nB. Neither\nC. None\nD. Either",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 3,
        "page": 1
      },
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "考查不定代词词义辨析。句意为“我们什么时候开晚会呢，星期三还是星期四?”“________一天都可以。\n我随时都有空。”Both两者都，作主语时，谓语动词用复数形式；Neither两者都不，作主语时，谓语\n动词用第三人称单数形式；None三者或三者以上的人或物都不，作主语时，谓语动词用第三人称单数\n或复数均可；Either两者中的任何一个，作主语时，谓语动词用第三人称单数形式。由答语后句“I'm\nfree at any time.”可知，前句应是回答“任何一天均可”。由上句中的on Wednesday or on Thursday及\n答语中的系动词is可知应选D项。"
  },
  {
    "id": "xdf-78533453027101ab",
    "type": "choice",
    "text": "I am grateful you your kindness.\nA. to; to\nB. to; for\nC. for; to\nD. for; for",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 4,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "短语be grateful to sb. for sth. 表示因为某事（物）对某人感到感激，由此可知此题的you前填介词\nto，your kindness前填介词for，综合分析可知此题答案为B。\n【句意】对于你的善意，我感到很感激。"
  },
  {
    "id": "xdf-75d2a2f2d261adc7",
    "type": "choice",
    "text": "I'd advise ______ your tickets well in advance if you want to travel in August.（ ）\nA. buy\nB. to buy\nC. buying\nD. buys",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 5,
        "page": 2
      },
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "buy买，动词原形；to buy动词不定式；buying动名词；buys第三人称单数。advise后接动词要用动\n名词形式，即advise doing sth.\"建议做某事\"。\n故选：C。\n答案\nB\n解析\nsuch as例如；as usual像平常一样；in addition此外；what's more而且。根据gets up early today\n（今天起得很早）和He is used to getting up at 6 o'clock（他习惯六点起床）可知，爷爷习惯6点起\n床，今天像平常一样早起。\n故选：B。"
  },
  {
    "id": "xdf-5709e84692b90e22",
    "type": "choice",
    "text": "Grandpa，______，gets up early today.He is used to getting up at 6 o'clock.（ ）\nA. such as\nB. as usual\nC. in addition\nD. what's more",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 6,
        "page": 2
      },
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "such as例如；as usual像平常一样；in addition此外；what's more而且。根据gets up early today\n（今天起得很早）和He is used to getting up at 6 o'clock（他习惯六点起床）可知，爷爷习惯6点\n起床，今天像平常一样早起。\n故选：B。"
  },
  {
    "id": "xdf-e58430a6e14a932e",
    "type": "choice",
    "text": "I was watching TV ________ my mother came back home.\nA. when\nB. while\nC. if\nD. since",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 7,
        "page": 2
      },
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 1,
        "page": 1
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我妈妈回家的时候，我正在看电视。\n考查连词辨析。when当……时；while当……时，强调主从句动作同时持续进行；if如果，表示条件；\nsince自从，表示时间起点。根据主句“was watching TV”为过去进行时，从句“came back”为一般过\n去时，表示在一个短暂动作发生时，另一个动作正在进行，应用when。故选A。"
  },
  {
    "id": "xdf-c8c7eb716e734cc6",
    "type": "cloze",
    "text": "“I Have Short Legs and Big Skills”\nZhao Qingshuai is a trainer for a K9 unit (警犬队) in Weifang, Shandong Province. One day a\nfew months ago, he was taking a walk in a park. There, he met a corgi (柯基犬) named Fu Zai and\nhis owner.\nZhao called out to the dog, and Fu Zai immediately ran towards him. With the owner’s\npermission (准许), Zhao used his dog training to interact (互动) with Fu Zai. The\ntrainer was surprised because Fu Zai’s interest in objects and ability to play were than\nmany other dogs’. Zhao asked the owner if she agree to send Fu Zai to the K9 unit. After some\ndiscussion, she said yes.\nLater, the dog became China’s first corgi reserve police dog (预备役警犬).\nFu Zai, now seven months old, has been training as a police dog for about five months. Most\npolice dogs are large ones with legs. Fu Zai, however, has short legs. He has\ndeveloped a special skill with his short legs: He can move under cars and search\nnarrow spaces. This makes him a top student in low–ground combat (低地作战). “His short legs\nare not his , but his strength,” said Zhao.\nRecently, Fu Zai showed up at a police open day and became popular online. Soon, he will\ntake a test. If it goes well, he will become a (n) police dog and get ready to work by\nthe time he turns one year old. All the people in Weifang, Shandong Province are eagerly looking\nforward to his performance as a police dog.\n(1) A. matters B. plans C. lessons D. methods\n(2) A. lower B. higher C. heavier D. lighter\n(3) A. short B. long C. strong D. powerful\n(4) A. freely B. carefully C. hurriedly D. successfully\n(5) A. problem B. trouble C. weakness D. failure\n(6) A. amazing B. useful C. helpful D. official",
    "answer": "(1) D (2) B (3) B (4) A (5) C (6) D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：在主人允许的情况下，赵利用他的狗狗训练与福仔互动。\nmatters事情；plans计划；lessons课；methods方法。根据“to interact (互动) with Fu\nZai.”可知，此处指的赵使用他的狗训练“方法”与福仔互动，故选D。\n【小题2】 句意：训练师很惊讶，因为福仔对物体的兴趣和玩耍的能力比许多其他狗都高。\nlower更低；higher更高；heavier更重；lighter更轻。根据“The trainer was surprised”以\n及“than many other dogs’”可知，此处指的福仔对物体的兴趣和玩耍的能力比许多其他狗\n都高。故选B。\n【小题3】 句意：大多数警犬都是长腿的大型警犬。\nshort短的；long长的；strong强壮的；powerful强大的。根据后文“Fu Zai, however, has\nshort legs.”可知，此处应该说大多数警犬都是长腿。故选B。\n【小题4】 句意：他可以在汽车下自由移动，搜索狭窄的空间。\nfreely自由地；carefully仔细地；hurriedly匆忙地；successfully成功地。根据“Fu Zai,\nhowever, has short legs.”以及“under cars and search narrow spaces”可知，应该说他可\n以在汽车下自由移动。故选A。\n【小题5】 句意：他的短腿不是他的弱点，而是他的力量。\nproblem问题；trouble麻烦；weakness弱点；failure失败。根据后文“but his strength”可\n知，前文应该说短腿不是弱点。故选C。\n【小题6】 句意：如果一切顺利，他将成为一只官方警犬，并在一岁时准备好工作。\namazing令人惊奇的；useful有用的；helpful有帮助的；official官方的。根据“If it goes\nwell, he will become a (n)…police dog”并结合语境可知，应该说他将成为一只官方警\n犬。故选D。"
  },
  {
    "id": "xdf-d961cfa6ea5fc1de",
    "type": "cloze",
    "text": "What’s the English word for the Chinese food jiaozi? Perhaps you would say\n“dumpling”. But , you can just say “jiaozi”. It has been officially added to the Oxford\nEnglish Dictionary. Until now, about 120 Chinese words have been added to the dictionary,\nbecoming a part of the English language.\nWhy have these words become popular? It may be because of the increasing interest in\nlearning Chinese. The Confucius Institute ( 孔 子 学 院 ) , which offers Chinese lessons, has\n1, 073 offices in 140 countries and areas, with 2–1 million students.\nResearchers studied 50 media platforms in eight English- speaking , including\nthe US, the UK and India. Their report listed the top 100 Chinese words that people in these\ncountries use the most.\n“Shaolin”, a place in China that is for kung fu, was at the top of the list. Other\npopular words include “yinyang” “gugong” “nihao” “wushu” “qi” “qigong” “renminbi” and\n“majiang”.\nSome of the hot words represent the social and cultural changes. For example,\ntuhao and dama are old words, they have got new meanings. Tuhao used to represent those\nwho owned a lot of land and had many servants in the old days, but now it is used to refer to the\nrich who spend money like water or like to show off. Dama (aunt) used to be a term to middle-\naged women, but now it especially refers to the Chinese women who like shopping. They usually\nrush to buy a lot of gold when its price , thinking that they can save much money.\nSome of the words refer to not only social and cultural changes, but also politics, economics\nand technology, like zhongguomeng (Chinese Dream), yidaiyilu and wanggou.\n(1) A. finally B. actually C. firstly D. luckily\n(2) A. given up B. set up C. put up D. looked up\n(3) A. cities B. towns C. schools D. countries\n(4) A. interesting B. boring C. famous D. late\n(5) A. because B. although C. since D. when\n(6) A. drops B. raises C. rises D. loses",
    "answer": "(1) B (2) B (3) D (4) C (5) B (6) A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 9,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：但事实上，你可以直接说“jiaozi”。\n此处用于转折补充事实，actually事实上，符合语境，用来纠正人们习惯用“dumpling”的说\n法。\n【小题2】 句意：提供汉语课程的孔子学院已在140个国家和地区设立了1073个办事处，有210万学\n生。\nset up建立、设立；与“offices”搭配，符合“建立办事机构”的语境。\n【小题3】 句意：研究人员研究了八个英语国家的50个媒体平台，包括美国、英国和印度。\n后文列举了美国、英国、印度等国家，因此此处指“八个说英语的国家”，countries国家，\n符合上下文逻辑。\n【小题4】 句意：中国一个以功夫闻名的地方“少林”名列榜首。\nbe famous for因……而闻名，是固定搭配，符合“少林以功夫闻名”的常识。\n【小题5】 句意：例如，虽然“土豪”和“大妈”是旧词，但它们有了新含义。\n前后为让步关系，although虽然，引导让步状语从句，符合逻辑。\n【小题6】 句意：他们通常在金价下跌时抢购大量黄金，以为这样可以省下很多钱。\n根据常识，人们会在价格下跌时买入，drop下跌，符合语境；raises/rises上涨，与逻辑相\n反；loses丢失，不与“price”搭配。"
  },
  {
    "id": "xdf-3de59abf22f4e491",
    "type": "completion",
    "text": "A: Hey, Jake, did I do something wrong earlier?\nB: No, not at all! (1) ____\nA: Well, you had your arms crossed and didn’t really look at me when I was talking.\nB: Oh, I’m so sorry, Emma. (2) ____ I was just tired.\nA: (3) ____ It doesn’t matter.\nB: But I should pay more attention. I didn’t mean to make you feel bad.\nA: (4) ____ I’m glad you explained.\nB: Thanks for understanding. Next time, I won’t cross my arms and I will look at you in your eyes\nwhen you talk.\nA: Haha, that’s a good idea. (5) ____\nB: Exactly. If I ever seem off (看起来不对劲) again, just ask me what’s wrong.\nA: Okay. (6) ____\nB: Agreed.\nA. I see.\nB. Don’t worry about it.\nC. I didn’t mean to do that.\nD. Why do you say so?\nE. Communication solves many problems.\nF. Body language can say a lot of things when we talk.",
    "answer": "(1) D (2) C (3) A (4) B (5) F (6) E",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 10,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "本文是Emma和Jake关于肢体语言误解的对话，最终通过沟通解决问题。\n根据“Hey, Jake, did I do something wrong earlier?”及“No, not at all!”可知，Jake反问A为何这么\n问。选项D“你为何这么说？”符合语境。故选D。\n根据“Oh, I’m so sorry, Emma...I was just tired.”可知，Jake解释自己并非故意表现出冷漠，选项C“我\n不是故意那么做的。”符合语境。故选C。\n根据“Oh, I’m so sorry, Emma...I was just tired.”可知，对方解释了自己这么做的原因，此处应表示理\n解，选项A“我明白了。”符合语境。故选A。\n根据“I didn’t mean to make you feel bad.”及“I’m glad you explained.”可知，此处是安慰对方，选项\nB“别担心。”符合语境。故选B。\n根据“Next time, I won’t cross my arms and I will look at you in your eyes when you talk.”及“Haha,\nthat’s a good idea”可知，此处是赞同肢体语言的重要性，选项F“在我们交谈时，肢体语言可以传达很\n多事情。”符合语境。故选F。\n根据“If I ever seem off (看起来不对劲) again, just ask me what’s wrong.”及“Okay.”可知，此处是回\n应沟通的作用，选项E“沟通能解决许多问题。”符合语境。故选E。"
  },
  {
    "id": "xdf-e17c30a64902bd61",
    "type": "choice",
    "text": "Eddie, my best friend _______ Ben.\nA. is as high as\nB. works as careful as\nC. doesn’t sing as beautifully as\nD. writes more better than",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 11,
        "page": 5
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 17,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考查 as...as 结构（和…… 一样）的正确用法，包括形容词 / 副词原级、词性辨析（形容词修饰名词，\n副词修饰动词）。as...as 中间用形容词或副词原级，D 选项 “more better” 是错误表达（“better” 本\n身就是 “good/well” 的比较级，不能用 “more” 修饰 ），排除 D 。A 选项 “is as high as” ，形容人的\n身高一般用 “tall” ，“high” 多形容物体高度，搭配不当，排除 A 。B 选项 “works as careful as”\n，“works” 是动词，要用副词 “carefully” 修饰，不能用形容词 “careful” ，排除 B 。C 选项 “doesn’t\nsing as beautifully as” ，“sing” 是动词，用副词 “beautifully” 修饰，“as...as” 结构正确，语义 “埃\n迪，我最好的朋友唱歌不如本好听” 合理。所以选 C 。"
  },
  {
    "id": "xdf-25c7a731d306019e",
    "type": "choice",
    "text": "In the exam, the _______ you are, the _______ mistakes you’ll make.\nA. less careful; fewer\nB. more careful; less\nC. less careful; few\nD. more careful; fewer",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 12,
        "page": 5
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 16,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考查 “the + 比较级，the + 比较级” 结构（越……，就越……），以及形容词比较级和可数名词复数\n的修饰词用法。“the + 比较级，the + 比较级” 表示 “越……，越……” 。根据语义 “在考试中，你越细\n心，犯的错误就越少” ，第一空应是 “more careful（更细心）” ，第二空 “mistakes（错误）” 是可数\n名词复数，要用 “fewer（更少的，修饰可数名词复数）” 修饰；“less” 修饰不可数名词，所以排除 B\n。A 选项语义逻辑错误（越不细心，错误应越多，不是 “fewer”）；C 选项第二空 “few” 不是比较级，\n不符合结构。所以选 D 。"
  },
  {
    "id": "xdf-0616fbfd310ef954",
    "type": "choice",
    "text": "What is _______ joke you have ever heard?\nA. more funny\nB. the more funny\nC. most funny\nD. the funniest",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 13,
        "page": 5
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 15,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "考查形容词最高级的用法。“you have ever heard（你曾听过的）” 表示范围，在一定范围内比较要用\n最高级。funny 的最高级是 funniest ，且最高级前要加 the 。A 选项 more funny 是比较级（形式也\n不对，正确是 funnier）；B 选项 the more funny 错误；C 选项 most funny 缺少 the 且形式不对。\n所以选 D 。"
  },
  {
    "id": "xdf-3c9ec84473ae3123",
    "type": "choice",
    "text": "—Harry Potter is an _______ book for children, but my cousin doesn’t seem _______ in it.\n—I’ve already read it twice already.\nA. interesting; interesting\nB. interested; interested\nC. interesting; interested\nD. interested; interesting",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 14,
        "page": 5
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 14,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考查 interesting（令人感兴趣的，修饰事物）和 interested（感兴趣的，修饰人）的用法区别。\n第一空修饰 “book（书，事物）”，用 interesting ，表示 “《哈利(cid:0)波特》是本有趣的儿童书”；第二空\n修饰 “my cousin（人）”，且 be interested in 是固定短语 “对…… 感兴趣” ，所以用 interested 。排\n除 A（第二空错）、B（第一空错）、D（一、二空都错）。所以选 C 。"
  },
  {
    "id": "xdf-0da9eba9fbcccbd8",
    "type": "choice",
    "text": "—How does Jack usually go to school?\n—He _______ take the bus, but now he _______ there to lose weight.\nA. used to; is used to walk\nB. used to; is used to walking\nC. was used to; is used to walk\nD. was used to, is used to walking",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 15,
        "page": 6
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 13,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "考查 used to（过去常常做某事）和 be used to（习惯于做某事）的用法区别。\nused to do sth. 表示 “过去常常做某事（现在不做了）”，所以第一空 “他过去常常坐公交” 用 used\nto ，排除 C、D 选项（was used to 是 “被用来……”，不符合此处语义）。\nbe used to doing sth. 表示 “习惯于做某事”，第二空 “现在他习惯走路去（学校）减肥”，要用 is used\nto walking，walk 需用动名词形式，排除 A 选项。所以选 B。\n答案\nD\n解析\n句意：在AI技术的帮助下，医生可以更快速地治疗病人。\n考查副词辨析。clearly清晰地；carefully小心地；correctly正确地；quickly快速地。根据“With the\nhelp of AI technology”可知，AI技术能提高医疗效率，缩短治疗时间，因此强调治疗过程更迅速。故\n选D。"
  },
  {
    "id": "xdf-722d519ebc777ff9",
    "type": "choice",
    "text": "With the help of AI technology, doctors can treat patients more ________.\nA. clearly\nB. carefully\nC. correctly\nD. quickly",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 16,
        "page": 6
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：在AI技术的帮助下，医生可以更快速地治疗病人。\n考查副词辨析。clearly清晰地；carefully小心地；correctly正确地；quickly快速地。根据“With the\nhelp of AI technology”可知，AI技术能提高医疗效率，缩短治疗时间，因此强调治疗过程更迅速。故选\nD。"
  },
  {
    "id": "xdf-724827f1ebb2d3bd",
    "type": "choice",
    "text": "—Would you like ________ watermelon juice? There isn’t ________ tea now.\n—Yes, please.\nA. any; some\nB. many; any\nC. some; any\nD. some; some",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 17,
        "page": 6
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：——你想要一些西瓜汁吗？现在没有茶了。——好的，请给我一些。\nsome常用于肯定句或表示请求、建议的疑问句中；any常用于否定句或疑问句中；many修饰可数名词\n复数。根据“Would you like…”是表示建议或请求的疑问句，第一个空应用some；根据“There\nisn't…”是否定句，第二个空应用any。应填some；any。"
  },
  {
    "id": "xdf-98976c17faff90f1",
    "type": "choice",
    "text": "There is too ________ milk in the glass, so it spills.\nA. many\nB. few\nC. little\nD. much",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 18,
        "page": 6
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：玻璃杯里的牛奶太多了，所以溢出来了。\nmany许多，修饰可数名词复数；few很少，修饰可数名词复数；little很少，修饰不可数名词；much\n许多，修饰不可数名词。根据“so it spills”可知牛奶溢出，说明牛奶“太多”。milk为不可数名词，修饰\n不可数名词表示“多”应用much，too much意为“太多”。 应填much。"
  },
  {
    "id": "xdf-13aa024a78bbed45",
    "type": "choice",
    "text": "Don’t forget to take your _________ with you when you leave the classroom.\nA. cigarette\nB. shelf\nC. wallet\nD. contest",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 19,
        "page": 6
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：当你离开教室时，别忘了带上你的钱包。\ncigarette香烟；shelf架子；wallet钱包；contest比赛。根据“when you leave the classroom”可知，\n离开教室时应带走个人随身物品，“钱包”符合语境，应填wallet。\n答案\nC\n解析\n句意：——打扰一下，你有英汉词典吗？——是的，给你。\nNo, thanks不了，谢谢；That’s all right没关系；Yes. Here you are是的，给你；No, thank you all\nthe same不了，还是要谢谢你。问句是在询问是否有英汉词典，意在借用，应填Yes. Here you are。"
  },
  {
    "id": "xdf-f2cdc6a1ab563665",
    "type": "choice",
    "text": "—Excuse me. Have you got an English-Chinese dictionary?\n—_________.\nA. No, thanks\nB. That’s all right\nC. Yes. Here you are\nD. No, thank you all the same",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 20,
        "page": 7
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 8,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——打扰一下，你有英汉词典吗？——是的，给你。\nNo, thanks不了，谢谢；That’s all right没关系；Yes. Here you are是的，给你；No, thank you all the\nsame不了，还是要谢谢你。问句是在询问是否有英汉词典，意在借用，应填Yes. Here you are。"
  },
  {
    "id": "xdf-00dd13fdab99f47b",
    "type": "choice",
    "text": "Work hard, ________ you’ll pass the English exam this time.\nA. or\nB. and\nC. so\nD. but",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 21,
        "page": 7
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：努力学习，那么你这次就能通过英语考试。\nor否则；and那么；so所以；but但是。此处为“祈使句+and+陈述句”结构，表顺承关系，表示“如果努\n力，就会通过”，需用and。"
  },
  {
    "id": "xdf-e16878c24dac9faf",
    "type": "choice",
    "text": "After hearing the doctor’s words, his face turned ______.\nA. pale\nB. kind\nC. impressed\nD. usual",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 22,
        "page": 7
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：听到医生的话后，他的脸色变得苍白。\npale 苍白的；kind 仁慈的；impressed 印象深刻的；usual 通常的。根据“After hearing the doctor’s\nwords”可知，听到医生的话后，通常是因为担心病情导致脸色变得苍白，pale符合语境。"
  },
  {
    "id": "xdf-dc5572f7fd16d0e9",
    "type": "choice",
    "text": "There ________ much milk in the glass.\nA. isn’t\nB. aren’t\nC. hasn’t\nD. haven’t",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 23,
        "page": 7
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：杯子里没有很多牛奶。\nisn’t不是；aren’t不是；hasn’t没有；haven’t没有。milk是不可数名词，there be句型中be动词用is，\n此处表示否定，应填isn’t。"
  },
  {
    "id": "xdf-40074ea5a42a575d",
    "type": "choice",
    "text": "Lisa is ________ a nice girl ________ we all want to help her.\nA. such; that\nB. too; to\nC. so; that\nD. very; that",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 24,
        "page": 7
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：丽莎是一个非常好的女孩，我们都想帮助她。\n考查短语辨析。such ... that ... 如此……以至于……；too ... to ... 太……而不能……；so ... that ... 如\n此……以至于……；very ... that ... 错误搭配。根据“we all want to help her”可知这里是结果状语从\n句，排除B；再由“a nice girl”可知用such修饰名词性短语，排除C。此处用such ... that ...引导结果状\n语从句。故选A。"
  },
  {
    "id": "xdf-b9b9b1f78402d8f6",
    "type": "choice",
    "text": "Lucy was ________ excited ________ she couldn’t say anything when she heard the good\nnews.\nA. so; that\nB. so; to\nC. too; to\nD. such; that",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 25,
        "page": 7
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：露西听到这个好消息时激动得说不出话来。\n考查so…that引导结果状语从句。so…that如此……以至于……，引导结果状语从句，so修饰形容词/\n副词；so…to没有这种搭配；too…to太……以至于不能做……，to后跟动词原形；such…that如\n此……以至于……，such修饰名词，引导结果状语从句。根据“excited”和“she couldn’t say\nanything”可知，她说不出话来是她激动的结果，excited 是形容词，因此应用so…that引导结果状语\n从句。故选A。"
  },
  {
    "id": "xdf-835bf8c17c130cec",
    "type": "choice",
    "text": "Please call me as soon as you ________ the news.\nA. will get\nB. get\nC. got\nD. getting",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 26,
        "page": 8
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：你一得到消息就请立刻给我打电话。\n考查状语从句的时态。在时间状语从句（如as soon as引导的从句）中，主句为祈使句或一般将来\n时，从句需用一般现在时表示将来。故选B。"
  },
  {
    "id": "xdf-86cdbe402e0ec980",
    "type": "choice",
    "text": "There are ___________ mice in the fields ___________ they can't kill them all.\nA. such many; as\nB. such much; that\nC. so much; that\nD. so many; that",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 27,
        "page": 8
      },
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：田地里有如此多的老鼠以至于他们不能把老鼠都杀死。\n根据句意可知，这里考查的是so/such…that…句型，意为“如此……以至于……”，引导结果状语从\n句，故先排除A。so后常修饰形容词或副词；such后修饰名词。当名词有表示数量的many, much, little\n或者few修饰时，应该用so。mice老鼠，是可数名词mouse的复数形式，故用many修饰，选D。\n“如此……以至于……”的句型：1.so+形容词或副词+that从句；2.so+形容词+a/an+可数名词单数+that\n从句；3.such a/an+形容词+单数可数名词+that从句；4.such+形容词+可数名词复数或不可数名词\n+that从句。"
  },
  {
    "id": "xdf-2662c6ba6836e295",
    "type": "cloze",
    "text": "Community Garden Project\nOur class organized a project to clean up an old garden. There’s some rubbish in the garden.\nThe goal was to and plant flowers. Some students wore gloves to pick up bottles,\nwhile others dug holes.\nAt first, we argued about the plan. Tom suggested more tools, but Emma said,\n“We have time to prepare. Let’s start now!” Finally, we agreed. While working, an old\nlady passed by and said, “You kids seem ! This garden looks much cleaner than\nbefore!” Her words encouraged us to work harder.\nBy noon, we had collected a few bags of rubbish. It was really tiring, we felt\nproud of ourselves.\n(1) A. pick up it B. pick it up C. pick them up\n(2) A. to buy B. buying C. buy\n(3) A. a little B. few C. little\n(4) A. amazing B. amazed C. amaze\n(5) A. but B. and C. so",
    "answer": "(1) B (2) B (3) C (4) A (5) A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 28,
        "page": 8
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：目标是捡起垃圾并种花。\npick up it表述错误，代词应放在pick和up中间；pick it up捡起它，指代单数名词或不可数\n名词；pick them up捡起它们，指代复数名词。根据“The goal was to...and plant\nflowers.”可知，这里“rubbish”是不可数名词，用“pick it up”。故选B。\n【小题2】 句意：汤姆建议多买些工具，但艾玛说：“我们几乎没有时间准备了。我们现在就开始\n吧！”\nto buy 动 词 不 定 式 ；buying 现 在 分 词 或 动 名 词 ；buy 动 词 原 形 。 根 据 “Tom\nsuggested...more tools”可知，suggest doing sth. 是固定用法，表示“建议做某事”，所以\n这里用“buying”。故选B。\n【小题3】 句意：汤姆建议多买些工具，但艾玛说：“我们几乎没有时间准备了。我们现在就开始\n吧！”\na little一点儿，修饰不可数名词，表肯定；few很少，修饰可数名词复数，表否定；little很\n少修饰不可数名词，表否定。根据“Let’s start now!”可知，时间不多，表否定，“time”是不\n可数名词，此处用“little”。故选C。\n【小题4】 句意：你们这些孩子看起来太棒了！\namazing令人惊奇的，常用来形容事物；amazed感到惊奇的，常用来形容人；amaze动\n词，使惊奇。根据“an old lady passed by and said, ‘You kids seem...! This garden looks\nmuch cleaner than before!’”可知，这里形容“kids”，用“amazing”表示“孩子们很棒”。故\n选A。\n【小题5】 句意：这真的很累，但我们为自己感到骄傲。\nbut但是，表转折；and和，表并列；so所以，表因果。根据“It was really tiring,...we felt\nproud of ourselves.”可知，“很累”和“感到骄傲”是转折关系，用“but”。故选A。"
  },
  {
    "id": "xdf-fec7357c1122873e",
    "type": "cloze",
    "text": "There is a young shepherd boy. He takes sheep to a hill every day. The\nboy is bored (无聊的).\nOne day, he gets an idea. He shouts, “Wolf! Wolf! A wolf !” The farmers in the\nvillage hear him. They run up the hill to help him. But when they arrive, they see no\nwolf. The boy and says, “There is no wolf. I just want to have some fun.” The farmers\nare angry and go back. A few days , the boy does the same thing again. He shouts,\n“Wolf! Wolf!” Again, the farmers come to help, there is no wolf. They are very angry\nthe boy.\nOne day, a real wolf comes. The boy is very scared. He shouts, “Wolf! Wolf! Please help!” But\nthis time, no one comes to help him. wolf eats some of his sheep. So we should\nalways tell the truth and be in our daily lives.\n(1) A. him B. his C. he\n(2) A. a few B. a lot of C. a bit\n(3) A. came B. is coming C. was coming\n(4) A. quickly B. quicker C. quick\n(5) A. laughs B. laughed C. will laugh\n(6) A. late B. later C. latest\n(7) A. and B. so C. but\n(8) A. on B. in C. with\n(9) A. The B. A C. An\n(10) A. honesty B. honest C. dishonest",
    "answer": "(1) B (2) C (3) B (4) A (5) A (6) B (7) C (8) C (9) A (10)B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 29,
        "page": 9
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：他每天把他的羊群带到一座山上。\nhim他，宾格；his他的，形容词性物主代词或名词性物主代词；he他，主格。sheep为名\n词，此处应用形容词性物主代词表示所属关系。故选B。\n【小题2】 句意：那个男孩觉得有点儿无聊。\na few些许，修饰复数名词；a lot of许多，修饰名词；a bit一点儿，修饰形容词或副词。\nbored为形容词，此处应用a bit来修饰，表示无聊的程度。故选C。\n【小题3】 句意：一头狼来了！\ncame来，过去式；is coming正在来，现在进行时；was coming正在来，过去进行时。根\n据“Wolf! Wolf!”可知，他当下正在喊狼来了，引语应用现在进行时。故选B。\n【小题4】 句意：他们快速地跑上山去帮助他。\nquickly快速地，副词；quicker更快的，形容词的比较级；quick快的，形容词。run为动\n词，此处应用副词quickly修饰动词run。故选A。\n【小题5】 句意：那个男孩笑着说道：“没有狼。我只是想找点乐子。”\nlaughs笑，一般现在时，三单形式；laughed笑，过去式；will laugh会笑，一般将来时。\n根据“and says”可知，句子应用一般现在时。故选A。\n【小题6】 句意：几天后，那个男孩又做了同样的事情。\nlate迟到的，原级；later晚一点，比较级；latest最迟的，最高级。根据“A few days”可\n知，此处用a few days later表示“几天后”。故选B。\n【小题7】 句意：再一次，农民们前来帮忙，但依旧没有狼。\nand并且；so因此；but但是。前后两句存在转折关系，用but连接。故选C。\n【小题8】 句意：他们对男孩感到愤怒。\non在上面；in在……里；with对。根据“They are very angry”可知，此处应用be angry\nwith表示“对……感到很生气”。故选C。\n【小题9】 句意：那头狼吃掉了他的一些羊。\nThe表特指；A表泛指，用于辅音音素开头的单词前；An表泛指，用于元音音素开头的单\n词前。根据“One day, a real wolf comes.”可知，此处特指前文提到的那头真正的狼，因此\n应用定冠词the。故选A。\n【小题10】句意：所以，我们应该要总是说实话，并且在日常生活中要诚实。\nhonesty诚实，名词；honest诚实的，形容词；dishonest不诚实的，形容词。根据“we\nshould always tell the truth”可知，这个故事告诫人们要诚实，be动词后接形容词作表\n语。故选B。\n答案\n(1) C\n(2) A\n(3) B\n(4) D\n(5) C\n(6) A\n解析\n【小题1】 句意：虽然做食物很有趣，但知道如何安全是很重要的。\nimportance重要性；unimportant不重要的；important重要的；unimportance不重要。\n根据“know how to be safe.”可知，这里是说知道如何安全是很重要的，应填形容词作表\n语。故选C。\n【小题2】 句意：这意味着知道什么时候该得到成年人的帮助，如何保持东西的清洁，以及如何安全\n地使用厨房。\nhow怎样；what什么；when什么时候；who谁。根据“keep things clean”可知，动词不\n定式keep后有宾语，因此用how加动词不定式。故选A。\n【小题3】 句意：如果你是个孩子，一个成年助理可以帮助你让烹饪变得更容易，让你更安全。\neasily容易地；easier更容易的；easy容易的；more easily更容易。根据“a grown–up\nassistant can help you”可知，这里应该用形容词的比较级与safer并列。故选B。\n【小题4】 句意：有了你的助手在身边，你就可以在做饭时保持安全并享受乐趣。\ncooked过去式；had cooked过去完成时；cooks动词三单；cook动词原形。根据“you\ncan stay safe and have fun while you….”可知，while引导的句子应该用一般现在时，主\n语是you，因此谓语用动词原形。故选D。\n【小题5】 句意：在开始做饭之前，一定要用肥皂和水洗手。\nSometimes有时；Never从不；Always总是；Hardly几乎不。根据“before you begin to\ncook. ”可知，做饭前，一定要洗手。故选C。\n【小题6】 句意：在厨房里学点东西也是个好主意。\nsomething某物；anything任何东西；everything每件事；nothing没有什么。分析句子\n结构可知，此句是肯定句，用something。故选A。"
  },
  {
    "id": "xdf-aec340312b9fcc38",
    "type": "reading",
    "text": "Although making food is fun, it’s (1) ________ to know how to be safe. This means\nknowing when to get help from a grown–up, (2) ________ to keep things clean, and how to use\nthe kitchen safely.\nIf you have ever seen a cooking show on TV, you’ll know that all the best cooks have an\nassistant to help them. If you’re a kid, a grown–up assistant can help you to make cooking\n(3) ________ and keep you safer. Some things in the kitchen may seem simple to do, but once\nyou use them yourself, you might be surprised to know how difficult they are. By having your\nassistant around, you can stay safe and have fun while you (4) ________ .\nWearing an apron (围裙) will keep your clothes clean. If you don’t have an apron, an old shirt\nwill be OK. But don’t wear big clothes. They are easy to catch fire. (5) ________ wash your hands\nwith soap and water before you begin to cook. The idea is to keep germs (病菌) out of your food.\nThey can make you sick.\nIt’s also a good idea to learn (6) ________ in the kitchen. It’s easy to get hurt in the kitchen if\nyou’re not careful, and a cut or burn will end your fun cooking.\n(1)单选题\nA. importance\nB. unimportant\nC. important\nD. unimportance\n(2)单选题\nA. how\nB. what\nC. when\nD. who\n(3)单选题\nA. easily\nB. easier\nC. easy\nD. more easily\n(4)单选题\nA. cooked\nB. had cooked\nC. cooks\nD. cook\n(5)单选题\nA. Sometimes\nB. Never\nC. Always\nD. Hardly\n(6)单选题\nA. something\nB. anything\nC. everything\nD. nothing",
    "answer": "(1) C (2) A (3) B (4) D (5) C (6) A",
    "answerSource": {"kind":"ai-supplement","originalAnswer":null,"checkedAt":"2026-10-06","review":{"status":"pending"}},
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 30,
        "page": 9
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-9c423772e7639f50",
    "type": "choice",
    "text": "You could save more money you can buy a gift for your friend's birthday.\nA. although\nB. unless\nC. so that\nD. if",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 31,
        "page": 11
      }
    ],
    "review": "pending",
    "explanation": "本题考查状语从句，多攒钱的目的是可以给朋友买生日礼物。"
  },
  {
    "id": "xdf-0f6587e9a8440fae",
    "type": "choice",
    "text": "—Why do students in No.1 Middle School never give up ________ they are in the face of\ndifficulties?\n—Because they believe that nothing is impossible if they put their heart into it.\nA. as soon as\nB. as long as\nC. so that\nD. even though",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 35,
        "page": 11
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 12,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "句意：——为什么第一中学的学生即使遇到困难也从不放弃？——因为他们相信，如果他们用心去做，\n没有什么是不可能的。\n考查连词辨析。as soon as一……就……；as long as只要；so that以便；even though尽管。根\n据 “students in No.1 Middle School never give up...they are in the face of\ndifficulties”可知，even though符合语境，引导让步状语从句，表示“尽管面临困难，他们也不放\n弃”。故选D。"
  },
  {
    "id": "xdf-7754a17a8a1296c6",
    "type": "choice",
    "text": "________ he is fat, ________ he can jump very high. He got first prize in the last game.\nA. Although; but\nB. Although; so\nC. Although; because\nD. Although; /",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 36,
        "page": 12
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 11,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "句意：虽然他很胖，但他能跳得很高。他在上一次比赛中得了第一名。\n考查连词辨析。Although虽然，引导让步状语从句，主句不能再用but或so；but但是；so因此；\nbecause因为。根据“...he is fat, ...he can jump very high.”可知前后形成鲜明对比，用“虽然……但\n是……”，但英语中although引导的让步状语从句后，主句不能再接but。故选D。"
  },
  {
    "id": "xdf-9d101d75b5b558af",
    "type": "choice",
    "text": "I will tell her the answer _______ she asks me.\nA. if\nB. whether\nC. although\nD. though",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 37,
        "page": 12
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 10,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "“if” 引导条件状语从句，表 “如果她问我，我会告诉她答案”，故正确答案为A。"
  },
  {
    "id": "xdf-2c492bb3b409d2e1",
    "type": "choice",
    "text": "Video chatting is the fourth _______ way of communication among teenagers.\nA. popular\nB. more popular\nC. most popular\nD. the most popular",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 38,
        "page": 12
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 9,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "“the + 序数词 + 形容词最高级” ，“the fourth most popular” ，题目中已有 “the fourth” ，最高级前\n不用再加 “the” ，选 “most popular”，故正确答案为C。"
  },
  {
    "id": "xdf-85af99c1f0b814ce",
    "type": "choice",
    "text": "Tom speaks English _______ as a native speaker.\nA. clear\nB. as clear\nC. so clearly\nD. as clearly",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 39,
        "page": 12
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 8,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "“as + 副词原级 + as” ，修饰动词 “speaks” ，用副词 “clearly”，故正确答案为D。\n答案\nC\n解析\n“%” 读作 “percent” ，单数形式，“3%” 是 “three percent”，故正确答案为C。"
  },
  {
    "id": "xdf-8360f68f208ad503",
    "type": "choice",
    "text": "Landline telephone service began in _______1900s.\nA. a\nB. an\nC. the\nD. /",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 41,
        "page": 13
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 6,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "“in the 1900s” 表 “在20世纪” ，世纪前用定冠词 “the”，故正确答案为C。"
  },
  {
    "id": "xdf-162ffe07263d80ae",
    "type": "choice",
    "text": "Excuse me, you' re wanted _______ the phone.\nA. by\nB. in\nC. on\nD. with",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 42,
        "page": 13
      },
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 5,
        "page": 6
      }
    ],
    "review": "pending",
    "explanation": "“on the phone” 是固定短语，表 “通过电话；在电话上”，故正确答案为C。"
  },
  {
    "id": "xdf-4a4343d296f224d9",
    "type": "reading",
    "text": "Heman Bekele was born in Africa. He saw people there working under the hot sun\nwithout protection for their skin. That made them vulnerable to skin cancer (癌症), an illness\ncaused by too much exposure (暴露) to the sun. Treating cancer usually costs a lot. Heman\nwondered if there was a cheaper way to deal with that. He came up with an idea: adding\nmedicines for skin cancer to soaps. “What is something that everyone can use?” Heman thought.\n“Everyone uses soap and water for cleaning. So soap may be the best choice.”\nHeman needed help to bring his idea to life. In 2023, he joined the 3M Young Scientist\nChallenge. He sent a video, explaining what he wanted to do. Finally, he won the game and got\nthe prize of $25, 000.\nSince then, Heman has been working on his idea. Adult experts from 3M offer him help. “I\ngot really lucky,” one of the experts, Deborah Isabelle, said. “Last year I worked with Heman. He’s\nan amazing, active, very inspiring young man.”\nIt can take years before the soap is available for people to buy. But Heman is still hopeful.\nOver the summer, he spent every weekday in the lab. “It’s absolutely wonderful to think that one\nday, my bar of soap will be able to have a direct influence on somebody else’s life.”\n(1)单选题 What does the underlined word “vulnerable” mean?\nA. Weak.\nB. Safe.\nC. Normal.\nD. Brave.\n(2)单选题 What did Heman think of the idea of using soap?\nA. It’s an expensive way.\nB. It’s a cheap way.\nC. It’s a clean way.\nD. It’s a successful way.\n(3)单选题 What did the 3M challenge bring to Heman?\nA. Support.\nB. Medicines.\nC. An idea.\nD. A position.\n(4)单选题 Which words can best describe Heman?\nA. Humorous and funny.\nB. Outgoing and friendly.\nC. Hard–working and kind.\nD. Interesting and active.\n(5)单选题 What is Heman’s attitude towards the future of the soap?\nA. Worried.\nB. Uncaring.\nC. Doubtful.\nD. Hopeful.",
    "answer": "(1) A (2) B (3) A (4) C (5) D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 43,
        "page": 13
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 词句猜测题。根据第一段“He saw people there working under the hot sun without\nprotection for their skin.”可知，此处表示非洲人在无皮肤防护的烈日下劳作，这会使他\n们“vulnerable to skin cancer(易患由过度日晒引发的皮肤癌)”，vulnerable意思是“易受伤\n害的；脆弱的”，与wek“虚弱的”意思相近。故选A。\n【小题2】 细节理解题。根据第一段“Heman wondered if there was a cheaper way to deal with\nthat ... Heman thought. ‘Everyone uses soap and water for cleaning. So soap may be\nthe best choice.’”可知，此处表示希幔贝克勒觉得使用肥皂的这个办法很便宜。故选B。\n【小题3】 细节理解题。根据第二段“In 2023, he joined the 3M Young Scientist Challenge …\nFinally, he won the game and got the prize of $25, 000.”和第三段“Adult experts from\n3M offer him help.”可知，在这个挑战赛中，希幔贝克勒最终获奖并得到奖金，并且承认\n专家也提供了帮助，因此3M挑战赛给希幔贝克勒带来了支持。故选A。\n【小题4】 推理判断题。根据第四段“Over the summer, he spent every weekday in the lab.”可\n知，此处表示希幔贝克勒每周呆在实验室研究，体现出他是hard–working“勤奋的”；“my\nbar of soap will be able to have a direct influence on somebody else’s life”体现他想通\n过肥皂帮助人，所以他是kind“善良的”。故选C。\n【小题5】 观点态度题。根据第四段“It can take years before the soap is available for people to\nbuy. But Heman is still hopeful… my bar of soap will be able to have a direct\ninfluence on somebody else’s life.”可知，尽快需要很多时间，但是希幔贝克勒依然充满\n希望，所以他觉得这款肥皂未来是hopeful“充满希望的”。故选D。"
  },
  {
    "id": "xdf-6553ed254f4bbc49",
    "type": "reading",
    "text": "\"Now, it is the time to witness the miracle!\" The magician, Liu Qian, discovered a\ndiamond ring in an egg in front of millions of people at CCTV's Spring Festival Gala (春晚) in\n2009. Liu's magic tricks have made the old art of magic fashionable once again, and made him\nthe hottest magician in China.\nAs a skillful young magician from Taiwan, Liu is popular worldwide for his magic shows. He\nhas performed in countries, including the United States, Japan, South Korea and the U.K.\nMaking something impossible happen right before your eyes is the reason why people love\nmagic.\nLiu has a special understanding of magic shows, \"To get a magic shoe successful, thinking is\nmore important than skills. We think a lot about how to make the shows creative and more\ninteresting.\" Liu said. So during his performance, audiences (观众) are often invited to be in his\nshows, making people believe he really has magic power.\nLiu Qian's success dated back to his childhood. Born in 1976 in Taiwan, he found himself\nattracted to a magic toy in a shop when he was seven years old. At the age of 12, he won\nTaiwan's Youth Magic Contest, which was judged by the great American magician, David\nCopperfield. \"It encouraged me to carry on my magic shoe dream.\" But Liu planned on becoming\na professional magician at the beginning. He studied Japanese literature at University and only\nhoped to be a part–time magician. However, his failure to find a good job after graduation\npushed him towards magic as a career. To improve his skills, he has performed on streets for\npassers–by. \"Street shows are the biggest challenge for us magician.\" Liu said.\nIn 2001, Liu started a TV show called \"Magic Star\", which quickly became one of the most\npopular shows. He successfully keeps this traditional art form alive.\n(1)单选题 Why do people love to watch magic?\nA. Because magic is an old art.\nB. Because magic attracts their eyes.\nC. Because they cannot find out the secret of magic.\nD. Because they love watching magicians make the impossible happen.\n(2)单选题 What can we learn from the story?\nA. Liu Qian wanted to be a professional magician at first.\nB. Liu Qian took part in many magic competitions.\nC. Liu Qian often invites audiences to be in his magic show.\nD. Liu Qian performs on streets in order to make himself famous.\n(3)单选题 What made Liu Qian decide to make magic his career?\nA. He played magic on streets in his free time.\nB. He had won Taiwan's Youth Magic Contest.\nC. He was interested in magic when he was little.\nD. He could not find a good job after graduation.\n(4)单选题 In what order did Liu Qian do the following?\n①He became a magician.\n②He fell in love with magic.\n③He began to perform magic on TV.\n④He won Taiwan's Youth Magic Contest.\n⑤He was invited to CCYV's Spring Festival Gala\nA. ②④①③⑤\nB. ②④①⑤③\nC. ①②④③⑤\nD. ①④②⑤③\n(5)单选题 The story is about .\nA. how Liu began to have magic power.\nB. why people love watching magic shows.\nC. what tricks are used in Liu's magic shows.\nD. how Liu became China's hottest magician.",
    "answer": "(1) D (2) C (3) D (4) A (5) D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 44,
        "page": 14
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 本题属于细节题。考查获取事实性信息的能力。根据句意，“人们为什么喜欢看魔术”可定\n位到第三段“Making something impossible happen right before your eyes is the\nreason why people love magic.”看到不可能的事情发生是人们喜欢魔术的原因，选D。\n【小题2】 本题属于细节题。考查获取事实性信息的能力。第四段中，audiences (观众) are often\ninvited to be in his shows，观众常被邀请参与他的表演中，故选C。\n【易错分析】are often invited to翻译成被邀请去做......。\n【小题3】 本题属于细节题。考查获取事实性信息的能力。根据句意“什么让刘谦决定把魔术当做职\n业生涯”，可定位到第五段“his failure to find a good job after graduation pushed him\ntowards magic as a career.”找工作的失败经历迫使他把魔术当做职业生涯，故选D。\n【易错分析】failure失败，push him towards迫使他去......。\n【小题4】 本题属于细节题。考查获取事实性信息的能力。排序题，A. ②④①③⑤，②④在第五段\n第二行，①定位到第五段第六行，③定位到第七段第一行，⑤定位到第一段，发生在\n2009年，最晚的，故选A。\n【易错分析】定位时在原文标出序号，要细心。\n【小题5】 本题属于推断题。考查理解主旨要义的能力。全文讲的是刘谦的成功经历，故“how Liu\nbecame China's hottest magician.”符合要求，故选D。\n【易错分析】通过整篇文章的宏观分析，得出结论。"
  },
  {
    "id": "xdf-58496c36529e6e12",
    "type": "choice",
    "text": "For book lovers, there is ________ much treasure in book that they keep buying new\nbooks and can’t wait ________.\nA. so; to read\nB. such; read\nC. so; reading\nD. such; reads",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 45,
        "page": 16
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 17,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：对于爱读书的人来说，书中有太多的宝藏，他们不断地购买新书，迫不及待地想要阅读。\n考查结果状语从句和非谓语动词。so+many/much+名词+that“如此多……以至于”，固定用法，排除\nBD；再根据can’t wait to do sth.“迫不及待做某事”可知，此处要用动词不定式。故选A。"
  },
  {
    "id": "xdf-cde9d6d58b225545",
    "type": "choice",
    "text": "It is _________ difficult work that we can't finish it in a short time.\nA. so a\nB. such a\nC. so\nD. such",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 46,
        "page": 16
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 16,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "试题分析：so是副词，如此，这么；such形容词，如此的，这样的。根据下文difficult work中心词是\nwork，故用such多定语，选D。如此艰难的工作\n考点：so和such的用法区别\n点评：词义辨析考的是学生的基础词汇知识，了解每个选项的含义是做好此类题型的关键。形容词和\n副词的区别主要是在句子中作为句子成分的不同，形容词只能用来修饰名词，或者作表语。副词可以\n修饰动词，形容词，作状语。"
  },
  {
    "id": "xdf-facbcd01be706f79",
    "type": "choice",
    "text": "The captain was ________ proud ________ he was seized by the Greeks at last.\nA. too, to\nB. enough, that\nC. so, that\nD. enough, to",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 48,
        "page": 17
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 14,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "句意：船长是如此骄傲以至于他最后被希腊人抓住了。\n考查so … that引导结果状语从句。too...to...太……而不能……；enough…that…搭配错误；\nso...that...如此…… 以至于……；enough...to...足够去做……。第二空后“he was seized by the\nGreeks at last”为句子，所以这里不能用不定式符号to，排除A和D；enough“足够地”，副词，修饰形\n容词或副词时要放在所修饰词的后面，即proud enough，排除B；“so”后面接形容词或副词，“that”引\n导结果状语从句。“proud是形容词，“he was seized by the Greeks at last”是一个句子，符\n合“so...that...”的用法。故选C。"
  },
  {
    "id": "xdf-ebc76686adbbe0b0",
    "type": "choice",
    "text": "Henry will start his report as soon as he ____ his computer to the Wi-Fi network.\nA. connects\nB. connected\nC. is connecting\nD. will connect",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 49,
        "page": 17
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 13,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": null
  },
  {
    "id": "xdf-ce20994af7df48ed",
    "type": "choice",
    "text": "The boy _______ to bed _______ his mother came in.\nA. went not; until\nB. didn’t go; after\nC. went; until\nD. didn’t go; until",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 50,
        "page": 17
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 12,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本题考查固定句型“not...until”（直到……才……）。根据句子结构，空格前主语为“the boy”，需填入\n谓语动词形式。选项D中，“didn’t go”对应否定结构，符合“not...until”的要求，即“直到妈妈进来，男\n孩才去睡觉”。“until”后接时间状语从句“his mother came in”。其他选项中：\nwent not”错误，否定动词需用“did not go”；\n“after”不匹配句型逻辑；\n“went; until”缺少否定，无法构成“直到……才……”的语义。\n因此，正确答案为D。\n答案\nB\n解析\n本题中 \"when my camera battery died\"（当我的相机电池没电时） 是一个过去的时间点，可\n知，\"我\" 正在拍摄日落的照片，选项B：\"was taking\" 是过去进行时，表示在过去某个时刻或时间段正\n在进行的动作。符合语境。选项A：\"took\" 是一般过去时，通常表示过去发生的动作或存在的状态，强\n调动作的完成，而本题强调的是在电池没电那一刻正在拍照的动作，所以A选项不合适。选项\nC：\"have taken\" 是现在完成时，用于表示过去发生的动作对现在造成的影响或结果，或者表示从过去\n一直持续到现在的动作或状态，与本题的语境不符，故C选项错误。选项D：\"will take\" 是一般将来\n时，表示将来要发生的动作，而本题描述的是过去发生的事情，所以D选项也不正确。\n故选：B。"
  },
  {
    "id": "xdf-34226c1b23fa5dbe",
    "type": "choice",
    "text": "I a photo of the sunset when my camera battery died.（ ）\nA. took\nB. was taking\nC. have taken\nD. will take",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 51,
        "page": 17
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "本题中 \"when my camera battery died\"（当我的相机电池没电时） 是一个过去的时间点，可\n知，\"我\" 正在拍摄日落的照片，选项B：\"was taking\" 是过去进行时，表示在过去某个时刻或时间段\n正在进行的动作。符合语境。选项A：\"took\" 是一般过去时，通常表示过去发生的动作或存在的状态，\n强调动作的完成，而本题强调的是在电池没电那一刻正在拍照的动作，所以A选项不合适。选项\nC：\"have taken\" 是现在完成时，用于表示过去发生的动作对现在造成的影响或结果，或者表示从过去\n一直持续到现在的动作或状态，与本题的语境不符，故C选项错误。选项D：\"will take\" 是一般将来\n时，表示将来要发生的动作，而本题描述的是过去发生的事情，所以D选项也不正确。\n故选：B。"
  },
  {
    "id": "xdf-8424f44d5830d74c",
    "type": "choice",
    "text": "It was ________ an interesting game ________ all the students don’t want to stop playing it.\nA. such; that\nB. so; as to\nC. so; that\nD. too; to",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 52,
        "page": 17
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：这是一个如此有趣的游戏，所有的学生都不想停止玩它。\n考查连词辨析。such…that如此……以致于；so…as to错误结构；so+形容词或副词+that如此……以\n致于；too…to太……而不能……。根据“It was… an interesting game … all the students don’t\nwant to stop playing it.”可知，是如此有趣的游戏，以致于所有学生都不想停止，game是名词，用\nsuch+冠词+形容词+名词+that引导结果状语从句，故选A。"
  },
  {
    "id": "xdf-56a5dbf6e7250469",
    "type": "choice",
    "text": "It was _____ issue that he really did not know______.\nA. so important an, how to do\nB. so an important, how to do it\nC. such an important, what to do\nD. such an important, what to do it",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 53,
        "page": 17
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：它是如此重要一个问题，以至于他真的不知道做些什么。\n考查固定搭配及宾语从句。表示“如此重要一个问题”可以用“so important an issue”或“such an\nimportant issue”，排除B。根据题干可知know后接宾语从句，若用疑问词how，do后需要加it作宾\n语，用how to do it；若用疑问词what，do的宾语就是what，用what to do，排除AD。故选C。"
  },
  {
    "id": "xdf-d929fc56bbabe2f1",
    "type": "choice",
    "text": "We were to know that we still have .（ ）\nA. glad enough…time enough\nB. enough glad…enough time\nC. enough glad…time enough\nD. glad enough…enough time",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 54,
        "page": 18
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 8,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "glad，形容词，高兴的；time时间；enough（足够）作副词用时，修饰形容词，放到形容词后面；\nenough作形容词时，修饰名词，通常放到名词前。观察可知当enough修饰glad时，要放在后面；当\nenough修饰time时，通常放在前面。\n故选：D。"
  },
  {
    "id": "xdf-4b45c801ac42b766",
    "type": "choice",
    "text": "The door bell rang suddenly when I________ about the holiday plan with my parents.\nA. talk\nB. am talking\nC. talked\nD. was talking",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 55,
        "page": 18
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 7,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：我和父母正谈论假期计划时，门铃突然响了。\n考查过去进行时态。when引导的时间状语从句，表示“当一个动作发生时，另一个动作正在进行”。根\n据“The door bell rang”和“...about the holiday plan”可知，这两个动作同时进行，且“rang”是过去时\n态，所以此处用过去进行时态。故选D。"
  },
  {
    "id": "xdf-3817f6b2d4a0f777",
    "type": "choice",
    "text": "Anne of Green Gables is ________ good book that it touched me deeply.\nA. so\nB. such\nC. so a\nD. such a",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 56,
        "page": 18
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 6,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：《绿山墙的安妮》是一本非常好的书，它深深地打动了我。\n考查结果状语从句。“so+形容词+a/an+可数名词单数+that...”和“such+a/an+形容词+可数名词单数\n+that...”都可以引导结果状语从句，表示“如此……以至于……”。根据“...good book that...”可知，此处\n修饰可数名词单数book，应用such a。故选D。"
  },
  {
    "id": "xdf-9e4fe74edf69c34d",
    "type": "choice",
    "text": "My father ________ on the computer when I came back home yesterday.\nA. work\nB. is working\nC. worked\nD. was working",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 57,
        "page": 18
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：昨天我回家时，我父亲正在电脑前工作。\n考查动词的时态。根据“when I came back home yesterday”可知，此处时态为过去进行时，表示两\n个动作同时发生，主语是My father，所以结构为：was+现在分词。故选D。"
  },
  {
    "id": "xdf-930fc2c53f754188",
    "type": "choice",
    "text": "We have to take action immediately to prevent the situation ________ getting worse.\nA. with\nB. from\nC. for\nD. to",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 58,
        "page": 18
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我们必须立即采取行动，防止事态进一步恶化。\n考查介词词义辨析。with和；from来自；for为了；to到。此处是固定词组，prevent...from...“防\n止……做”，因此这里是from。故选B。"
  },
  {
    "id": "xdf-f1f0290ea1d5434e",
    "type": "choice",
    "text": "Grandpa, ______, gets up early today. He is used to getting up at 6 o’clock.\nA. such as\nB. as usual\nC. in addition\nD. what’s more",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 59,
        "page": 19
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：爷爷像往常一样，今天起得很早。他习惯6点钟起床。\n考查介词短语。such as例如；as usual像平常一样；in addition此外；what’s more而且。根\n据“gets up early today”和“He is used to getting up at 6 o’clock.”可知，爷爷习惯6点起\n床，今天像平常一样早起。故选B。"
  },
  {
    "id": "xdf-b8b5cae7c095407c",
    "type": "choice",
    "text": "—Mom, I want to buy some novels.\n—Before choosing a book, you’d better ________ some pages to know whether it’s easy or hard\nfor you.\nA. look through\nB. look for\nC. look at\nD. look up",
    "answer": "A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 60,
        "page": 19
      },
      {
        "file": "错题_42_20260922_215822.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：——妈妈，我想买些小说。——在选择一本书之前，你最好先浏览几页，看看它对你来说是容\n易还是难。\n考查动词短语辨析。look through浏览；look for寻找；look at看；look up查阅。根据“Before\nchoosing a book, you’d better...some pages to know whether it’s easy or hard for you.”可知，在买\n小说之前先浏览几页，故选A。"
  },
  {
    "id": "xdf-da46d7637f262dc6",
    "type": "reading",
    "text": "When I was thirteen years old, I became very interested in shopping. After a while\nbeing just a buyer, I wanted to sell something. I had many things around the house from my\nchildhood that I no longer needed. I knew, with the help of my father, I could make money. So for\nmonths and months I enjoyed myself by selling things on my dad’s account (账户).\nOn December 9, 2017, I opened my own account and began to start my own business. Things\nwere going great and then I realized that selling things around the house wasn’t making me the\nkind of money that I wanted to make, so I decided to turn my business into a resale shop. I went\naround to the garage sale (旧货出售处) and bought items at low prices and sold them at higher\nprices later.\nLast November, I went to a garage sale that was a little bit different. A single lady had many\nnice items that I knew I would sell quickly. I went up to her and started a conversation with her.\nThrough the conversation, I knew she was jobless at the moment and needed money to support\nher family. I decided to sell any of her things for her to help her out. She looked at me for a\nmoment and then broke into tears. I took away some of her things and over the next month I\nmade over $1,500 for her. She was so thankful for all of my help. I have never felt so happy to\nhelp someone in my life. I felt as if I had made a difference in this world and that my skills could\nbe used to help someone who would really need it.\n(1)单选题 At first, __________ helped the writer make money by selling things.\nA. the writer’s bank\nB. the writer’s father\nC. the writer’s teacher\nD. a single lady\n(2)单选题 The writer went to the garage sale to __________.\nA. meet single ladies\nB. sell things she no longer needed\nC. help others\nD. buy things for her resale shop\n(3)单选题 The writer decided to help the lady sell her things because __________.\nA. the lady’s items were nice\nB. the lady lived a hard life\nC. she liked the lady very much\nD. the lady asked the writer for help\n(4)单选题 Which of the following might be the best title for this passage?\nA. A Whiz Kid\nB. A Good Way to Make Money\nC. A Helpful Skill\nD. How to Sell Things",
    "answer": "(1) B (2) D (3) B (4) C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 61,
        "page": 19
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 细节理解题。根据“I knew, with the help of my father, I could make money. So for\nmonths and months I enjoyed myself by selling things on my dad’s account (账户).”可\n知，作者最初是在父亲的帮助下通过销售物品赚钱的。故选B。\n【小题2】 细节理解题。根据“I decided to turn my business into a resale shop, I went around to\nthe garage sale (旧货出售处) and bought items at low prices and sold them at higher\nprices later.”可知，作者去旧货出售处是为了购买低价物品，以便后续在转售商店中以高\n价出售。故选D。\n【小题3】 细节理解题。根据“Through the conversation, I knew she was jobless at the moment\nand needed money to support her family. I decided to sell any of her things for her\nto help her out.”可知，作者决定帮助这位女士出售物品是因为她失业且生活困难，需要\n钱来支持家庭。故选B。\n【小题4】 最佳标题题。根据“I have never felt so happy to help someone in my life. I felt as if I\nhad made a difference in this world and that my skills could be used to help\nsomeone who would really need it.”可知，全文核心是通过商业技能帮助他人（如为失\n业女士代售物品），因此“A Helpful Skill”最能概括文章主题。故选C。"
  },
  {
    "id": "xdf-53ff72298097cc0f",
    "type": "fill",
    "text": "It is important to keep calm in an (emergent).",
    "answer": "emergency",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 62,
        "page": 20
      }
    ],
    "review": "pending",
    "explanation": "an 后接名词，emergent （形容词，紧急的 ）→ emergency （名词，紧急情况 ）。故答案为\nemergency。"
  },
  {
    "id": "xdf-df9cfa264e266c9a",
    "type": "fill",
    "text": "Teachers always tell students that they should show to classmates. (kind).",
    "answer": "kindness",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 63,
        "page": 20
      }
    ],
    "review": "pending",
    "explanation": "句意：老师总是告诉学生，他们应该对同学友好。根据分析句子“Teachers always tell students that\nthey should show…to classmates.”，结合所给词可知，此处考查：show sth to sb，意为“展示某物\n给某人”符合语境，kind“善良的”，形容词，此处应该填入其名词形式kindness，作直接宾语，意为“善\n良，友好”符合语境。故填kindness。"
  },
  {
    "id": "xdf-84c4c699c45ab285",
    "type": "fill",
    "text": "The artist’s use of colour made a strong (impress) on the viewers.",
    "answer": "impression",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 64,
        "page": 20
      }
    ],
    "review": "pending",
    "explanation": "句意：这位艺术家对色彩的运用给观众留下了深刻的印象。make a strong impression on sb.是固定\n短语，意为“给某人留下深刻的印象”，这里需要用impress的名词形式impression。故填impression。"
  },
  {
    "id": "xdf-5dd142a395c054f1",
    "type": "fill",
    "text": "(library) are professionals who are there to help you find and make sense of\ninformation.",
    "answer": "Librarians",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 65,
        "page": 20
      }
    ],
    "review": "pending",
    "explanation": "根据 are 可知主语是复数，library （图书馆 ）→ librarian （图书管理员 ），复数 librarians 。故答\n案为Librarians。"
  },
  {
    "id": "xdf-ea9cfcbe23231ffa",
    "type": "reading",
    "text": "During the summer holiday, I was lucky enough to go to Chile in South America\nalong with some of my schoolmates. We stayed with Chilean families there. We first met them\nwhen they visited our school before. While we were there, we visited many parts of the country,\nincluding the Atacama Desert and Chile's capital city of Santiago.\nAt first, it was a bit difficult to live in a house with a new family. But I fit in well and my\nSpanish improved quickly. My trip to the Atacama Desert was an unforgettable experience. Not\nonly did I see some amazing scenery, but I was able to experience some unique things there. For\nexample, I swam in Cejar Lagoon, an oasis (绿洲). Also I saw wild flamingos. We watched them in\na distance so that they would not fly away. Then we ate in a cafe at a height of 3300 meters and\nclimbed a mountain to see cave (洞穴) paintings that were created over 4000 years ago. I don't\nthink I will ever forget the view that I got when I watched the sunset on top of the Purple\nMountains.\nI also went on a trip to Santiago. The president's house, called La Moneda, was very\nbeautiful. Santiago is surrounded by mountains. I took a cable car (缆车) to the top and got a\ngreat view of the whole city.\n(1)单选题 The writer lived in while in Chile.\nA. a city hotel\nB. a mountain\nC. a local family\nD. a desert\n(2)单选题 The underlined word \"flamingos\" in Paragraph 2 refers to a kind of .\nA. fish\nB. bird\nC. snake\nD. whale\n(3)单选题 Which of the following is TRUE according to the text?\nA. The writer went to Chile's capital city alone.\nB. In Chile, the president's house is open to visitors.\nC. The writer ate in a cafe on top of the Purple Mountains.\nD. Chilean people speak English as their official language.\n(4)单选题 Put the following in the right order according to the passage.\n①watched the sunset\n②went to Atacama Desert\n③met Chilean families\n④visited the city of Santiago\nA. ③①②④\nB. ②④③①\nC. ③②①④\nD. ②④①③\n(5)单选题 What would be the best title for the text?\nA. A journey to Chile\nB. An introduction to Chile\nC. A history of Chile\nD. A guide to Chile",
    "answer": "(1) C (2) B (3) B (4) C (5) A",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 66,
        "page": 20
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 细节理解题。根据第一段第二句“We stayed with Chilean families there.”可知，作者在\n智利时是住在当地人的家里的。故选C。\n【小题2】 指代判断题。根据第二段第七句“We watched them in a distance so that they would\nnot fly away.”可知，作者和同学们远远地看着他们，免得他们飞走。由此可推\n知，“flamingos”指的是一种鸟。故选B。\n【小题3】 推理判断题。根据第三段第二句“The presidents house, called La Moneda, was very\nbeautiful.”可推知，在智利，总统的房子向游客开放。故选B。\n【小题4】 细节理解题。通读全文可知，本文正确的顺序是作者结识了智利当地人家，去了Atacama\n沙漠，看了日出，游览了Santiago,所以C项顺序正确。故选C。\n【小题5】 标题概括题。通读全文可知，文章主要叙述了作者去智利旅游的经历。A journey to\nChile应是本文的最佳标题。故选A。"
  },
  {
    "id": "xdf-c8cbb038865dad9e",
    "type": "choice",
    "text": "I’d advise ______ your tickets well in advance if you want to travel in August.\nA. buy\nB. to buy\nC. buying\nD. buys",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 67,
        "page": 22
      },
      {
        "file": "错题_43_20260922_215828.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：如果你想在八月份出行，我建议你尽早把车票买好。\n考查非谓语动词。buy买，动词原形；to buy动词不定式；buying动名词；buys三单。advise后接动\n词要用动名词形式，即advise doing sth.“建议做某事”。故选C。"
  },
  {
    "id": "xdf-ac89ad1cda4cb061",
    "type": "reading",
    "text": "C\nOnce there was a famous painter. Lots of people came to see his paintings. They never got\ntired of praising (赞美) his paintings. One day, the painter thought, \"I often hear people praise my\npaintings, but will they talk about the problems in my paintings behind my back?\" Thinking about\nthis, he got up early one morning and put one of his paintings on a busy street with a note (便\n条): \"If anyone finds any problem in this painting, please put a mark (标记) on it.\"\nIn the evening, when he went to get his painting back, he found hundreds of marks on it.\nSeeing this, he was very disappointed. He took his painting quietly and went home.\nFrom then on, the painter stopped painting. One of his friends heard about this and went to\nvisit him. He said to the painter, \"Put the same painting on the same street once again, but this\ntime with the different note — 'If anyone finds any problem in this painting, fix it please.'\"\nThe next morning, the painter did as his friend said. In the evening, when he and his friend\nwent to get the painting, they found there was nothing on it. The painter was surprised. His\nfriend laughed and said, \"Anyone can find problems, but very few people can fix them. Some\npeople only want to find problems of others. So, your problem was not in your painting but in\nasking for advice from such people.\"\n(1)单选题 From Paragraph 1, we know .\nA. what the painter thought of his paintings\nB. why the painter put his painting on a busy street\nC. who gave the painter some advice on his paintings\nD. how people found problems in the painter's paintings\n(2)单选题 What does the underlined word \"disappointed\" in Paragraph 2 mean in Chinese?\nA. 兴奋的\nB. 残忍的\nC. 失望的\nD. 放松的\n(3)单选题 The painter's friend asked him to .\nA. put the same painting on the same street with a different note\nB. put a different painting on the same street with the same note\nC. put the same painting on a different street with a different note\nD. put a different painting on a different street with the same note\n(4)单选题 What is the right order of the following events?\n① The painter stopped painting.\n② The painter found hundreds of marks on his painting.\n③ The painter was surprised to find nothing on his painting.\nA. ①③②\nB. ②①③\nC. ②③①\nD. ③①②\n(5)单选题 What can we learn from the passage?\nA. We should keep on doing things to the end.\nB. We should care less about others' problems.\nC. We should ask for help when we are in trouble.\nD. We should ask for advice in a right way.",
    "answer": "(1) B (2) C (3) A (4) B (5) D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 68,
        "page": 23
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 第一段讲画家听到人们赞美他的画，却想知道人们是否会在背后谈论画中的问题，于是把\n画放到街上，这是他这么做的原因。故答案为 “B”。\n【小题2】 画家看到画上有很多标记，心情低落，“disappointed” 表示 “失望的”。故答案为 “C”。\n【小题3】 朋友让他把同一幅画放在同一条街上，但换一张不同的便条。故答案为 “A”。\n【小题4】 ②画家发现画上有很多标记→①画家停止画画→③画家惊讶地发现画上什么都没有。故答\n案为 “B”。\n【小题5】 文章告诉我们，向别人寻求建议时要选对方式，不能只找只会挑毛病的人。故答案为\n“D”。"
  },
  {
    "id": "xdf-6dd26f11ed581fd9",
    "type": "reading",
    "text": "Ricardo Semler became boss of his father’s company in Brazil at the age of 21. The\nname of the company is Semco. It sold parts for ships. Semler worked like a mad man, from 7–30\nam to midnight every day. One afternoon, while he was visiting a factory in New York, he fell\ndown. The doctor said, “There’s nothing wrong with you. But if you continue like this, you’ll find\na new home in our hospital.” Semler got the message. He changed the way he worked. In fact,\nhe changed the ways his workers worked, too.\nHe let his workers take more responsibility so that they would be the ones worrying when\nthings went wrong. He allowed them to set their own salaries, and he cut all the jobs he thought\nwere unnecessary, like receptionists and secretaries.\nHe changed the office: instead of walls, they have plants at Semco, so bosses can’t shut\nthemselves away from everyone else. And the workers are free to decorate their workplace as\nthey want. As for uniforms, some people wear suits and others wear T-shirts.\nSemco has flexible (弹性的) working hours: the workers decide when they need to arrive at\nwork. Also, Semco lets its workers use the company’s machines for their own projects, and\nmakes them take holidays for at least thirty days a year.\nIt sounds perfect, but does it work? The answer is in the numbers: in the last six years,\nSemco’s revenues (收益) have gone from 35millionto212 million. The company has grown\nfrom 800 workers to 3,000. Why?\ny\nSemler says it’s because of “peer pressure (同辈压力)”. Peer pressure makes workers work\nhard for everyone else. If someone isn’t doing his job well, the other workers will not allow the\nsituation to continue. In other words, Ricardo Semler treats his workers like adults rather than\nchildren, and expects them to act like responsible adults. And they do.\n(1)单选题 Why did Semler change the ways he and his workers worked? Because ________.\nA. he became mad\nB. he had to stay in hospital\nC. his father asked him to do so\nD. he realized the danger of overwork\n(2)单选题 Semler makes a lot of changes in his company EXCEPT ________.\nA. the workers decide when they need to arrive at work\nB. the workers have fewer holidays than before\nC. the workers can decorate their workplace as they like\nD. the workers can use the company’s machines to do their own projects\n(3)单选题 What’s the main idea of Paragraph 5?\nA. Ricardo Semler’s method of running the company was successful.\nB. Ricardo Semler’s idea sounded perfect but not practical (实用).\nC. The company earned a lot of money.\nD. The reason for Ricardo Semler’s success.\n(4)单选题 The underlined word “they” in the last paragraph refers to ________.\nA. adults\nB. Semler’s workers\nC. flexible working hours\nD. Semco’s revenues\n(5)单选题 ________ is the most important thing in Semler’s company.\nA. Money\nB. Rule\nC. Responsibility\nD. Hard work",
    "answer": "(1) D (2) B (3) A (4) B (5) C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 69,
        "page": 24
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 细节理解题。根据“One afternoon, while he was visiting a factory in New York, he fell\ndown ... He changed the way he worked. In fact, he changed the ways his workers\nworked, too.”可知，Semler因过度工作而晕倒，医生警告他继续下去会住院。因此他意\n识到过度工作的危险，从而改变工作方式。故选D。\n【小题2】 细节理解题。根据“And the workers are free to decorate their workplace as they\nwant.”以及“Semco has flexible (弹性的) working hours: the workers decide when they\nneed to arrive at work ... and makes them take holidays for at least thirty days a\nyear.”可知，Semco员工可以按照他们喜欢的方式装饰他们的工作场所；让员工决定他们\n需要什么时候来上班；员工可以使用公司的机器来做他们自己的项目；每年至少休30天\n的假。员工的假期应该比以前多了，而不是少了，B选项“员工的假期比以前少”与原文不\n符。故选B。\n【小题3】 主旨大意题。根据 “It sounds perfect, but does it work? The answer is in the numbers:\nin the last six years, Semco’s revenues (收益) have gone from 35millionto212\nmillion. The company has grown from 800 workers to 3,000.”可知，在过去的六年\n里，Semco的收益从3500万美元增长到2–12亿美元，公司员工从800人增加到3000人。\n所以这一段主要讲了Ricardo Semler的公司经营方法是成功的。故选A。\n【小题4】 词句猜测题。根据文章最后一段“ In other words, Ricardo Semler treats his workers\nlike adults rather than children, and expects them to act like responsible adults. And\nthey do.”可知，Ricardo Semler把他的员工当作成年人而不是孩子来对待，并且期望他们\n表现得像有责任感的成年人，并且他们确实这样做了。由此判断“they”指代的是“Semler’s\nworkers”。故选B。\n【小题5】 推理判断题。根据“He let his workers take more responsibility so that they would be\nthe ones worrying when things went wrong.”以及最后一段“Semler says it’s because\nof ‘peer pressure (同辈压力)’ ... In other words, Ricardo Semler treats his workers like\nadults rather than children, and expects them to act like responsible adults. And they\ndo.”可知，文章强调同辈压力和员工的责任感是成功关键，在Semler的公司里，责任感是\n最重要的事情。故选C。"
  },
  {
    "id": "xdf-9d5ad1209b58559a",
    "type": "fill",
    "text": "It is a (bore) book.",
    "answer": "boring",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 70,
        "page": 26
      }
    ],
    "review": "pending",
    "explanation": "句意：这是一本令人厌倦的书。根据“a ... (bore) book”可知用形容词作定语，book是物，用boring表\n示“令人厌倦的”。故填boring。"
  },
  {
    "id": "xdf-e31f36b9d6a7f965",
    "type": "choice",
    "text": "—The song________ by Jay Chou is very popular.\n—I like it, too. His songs always sound so nice.\nA. is sung\nB. was sung\nC. sung\nD. singing",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 71,
        "page": 26
      }
    ],
    "review": "pending",
    "explanation": "句意：——周杰伦唱的那首歌很受欢迎。——我也喜欢。他的歌听起来总是那么好听。\n考查非谓语动词作后置定语。is sung一般现在时被动语态；was sung一般过去时被动语态；sung过\n去分词；singing现在分词。空格处需用过去分词作后置定语，修饰the song，表示“被周杰伦唱的\n歌”。故选C。"
  },
  {
    "id": "xdf-c5b8b680d71dd80f",
    "type": "choice",
    "text": "We should avoid ________ about the age of a lady. It’s impolite.\nA. to ask\nB. asking\nC. ask\nD. asks",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 72,
        "page": 26
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 16,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：我们应该避免询问女士的年龄。这是不礼貌的。\n考查非谓语动词。avoid doing sth避免做某事，故选B。"
  },
  {
    "id": "xdf-505634980fc47e04",
    "type": "choice",
    "text": "Would you like ________?\nA. something drink\nB. drink something\nC. something to drink\nD. anything drink",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 73,
        "page": 26
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 15,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：你想喝点什么吗？\n考查不定代词。something一些东西；anything任何东西；句子是情态动词开头的疑问句，应用\nsomething，排除D选项；表示“一些喝的东西”，英语表达为something to drink，不定式作后置定\n语，故选C。"
  },
  {
    "id": "xdf-2fbd8a032b6f1695",
    "type": "choice",
    "text": "I have a composition ________ this afternoon and I won’t have my hair ________.\nA. written; cut\nB. to write; cut\nC. to write; to cut\nD. written; to cut",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 74,
        "page": 26
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 14,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：今天下午我有篇作文要写，我不会去剪头发。\n考查非谓语动词。第一空指“有篇作文要写”，用不定式作后置定语修饰名词composition；第二空考查\nhave sth done“让某事被完成”，此处指“使头发被剪”，表被动，用过去分词cut。故选B。"
  },
  {
    "id": "xdf-3f17659475784532",
    "type": "choice",
    "text": "—What a ____change !Molly used to be shy and quiet.\n—Yeah!But now she is used to ____in front of the class.（ ）\nA. surprised；speaking\nB. surprised；speak\nC. surprising；speaking\nD. surprising；speak",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 75,
        "page": 26
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 13,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "surprised惊人的，修饰人；surprising令人惊讶的，修饰物；speak讲话，动词原形；speaking讲话，\n动名词。第一空是ing形容词修饰change（机会）。第二空考查be used to doing sth习惯做某事。\n故选：C。"
  },
  {
    "id": "xdf-38dbc6020369bf76",
    "type": "reading",
    "text": "When I was growing up in America, I was ashamed of my mother’s Chinese English.\nBecause of her Chinese English, she was often treated unfairly. People in department stores, at\nbanks, and at restaurants did not take her seriously, did not give her good service, pretended not\nto understand her, or even acted as if they did not hear her.\nMy mother realized that she was poor at English. When I was fifteen, she used to have me\ncall people on phone to pretend I was she. I was made to ask for information or even to shout at\npeople who had been rude to her. One time I had to call her stockbroker(股票经纪人). I said in an\nadolescent(青少年的) voice that was not very certain, “This is Mrs. Tan.” My mother was standing\nbeside me saying, “Why he doesn’t send me check, already two weeks late.” And then, in perfect\nEnglish I said: “I’m getting rather worried. You agreed to send the check two weeks ago, but it\nhasn’t arrived.”\nMy mother then talked more loudly. “What he wants? I come to New York to tell him in front\nof his boss.” And so I turned to the stockbroker again, “I can’t accept any more excuse. If I don’t\nreceive the check immediately, I am going to have to speak to your manager when I am in New\nYork next week.”\nThe next week we ended up in New York. While I was sitting there red–faced, my mother, the\nreal Mrs. Tan, was shouting to his boss in her broken English.\nWhen I was a teenager, my mother’s broken English embarrassed me. But now, I see it\ndifferently. To me, my mother’s English is perfectly clear, perfectly natural. It is my mother\ntongue. Her language, as I hear it, is vivid, direct, and full of observation and wisdom. It was the\nlanguage that helped me see things, express ideas, and make sense of the world.\n(1)单选题 Why was the writer’s mother poorly served?\nA. She was unable to speak good English.\nB. She was often treated unfairly.\nC. She was not clearly heard.\nD. She was not very polite.\n(2)单选题 From Paragraph 2, we know that the writer was ________.\nA. good at pretending\nB. rude to the stockbroker\nC. ready to help her mother\nD. not willing to phone for her mother\n(3)单选题 To the writer now, her mother’s English ________.\nA. makes her embarrassed\nB. is broken and different\nC. is helpful for her\nD. the nature of language\n(4)单选题 The best title of the passage might be ________.\nA. Great Mother\nB. Mother’s Chinese English\nC. Natural English\nD. Perfect English",
    "answer": "(1) A (2) D (3) C (4) B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 76,
        "page": 27
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 细节理解题。根据第一段中“Because of her Chinese English, she was often treated\nunfairly. People in department stores, at banks, and at restaurants did not take her\nseriously, did not give her good service”可知妈妈受到很差的待遇是因为她英语说不\n好。故选A。\n【小题2】 推理判断题。根据第二段中“I was made to ask for information or even to shout at\npeople who had been rude to her.”可知作者是被迫替妈妈打电话，由此可推出作者是不\n愿意的。故选D。\n【小题3】 推理判断题。根据最后一段中“It was the language that helped me see things, express\nideas, and make sense of the world.”妈妈的英语帮助作者看清事物、表达思想并理解这\n个世界，由此可推出对作者是有帮助的。故选C。\n【小题4】 标题归纳题。妈妈的中式英语是贯穿全文的线索，用“Mother’s Chinese English”做标题\n最合适。故选B。"
  },
  {
    "id": "xdf-a471e37c29522105",
    "type": "choice",
    "text": "You can be what you want to be, a song ________ by Jiang Yunsheng in 2020 is my\nfavorite.\nA. wrote\nB. writes\nC. writing\nD. written",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 77,
        "page": 28
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 11,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：由姜云升2020年写的歌《你一定能够成为你想要去成为的人》是我最喜欢的歌曲。\n考查过去分词作为后置定语。根据句意和情境可知，“a song”和“write”之间构成被动，且谓语动词\n为“is”，因此应该使用过去分词作为后置定语，表示“由……写的”。故选D。\n答案\nB\n解析\n句意：史密斯先生想要剪头发。\n考查非谓语动词。have sth done为固定搭配，意为“让……被做”，hair和cut之间是被动关系，所以用\n过去分词作宾语补足语。故选B。"
  },
  {
    "id": "xdf-fd2454db80fd4430",
    "type": "choice",
    "text": "Mr. Smith wants to have his hair ________.\nA. cutting\nB. cut\nC. to cut\nD. cuts",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 78,
        "page": 28
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 10,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "句意：史密斯先生想要剪头发。\n考查非谓语动词。have sth done为固定搭配，意为“让……被做”，hair和cut之间是被动关系，所以\n用过去分词作宾语补足语。故选B。"
  },
  {
    "id": "xdf-d8f18d306f7eab69",
    "type": "choice",
    "text": "—What ____ children! —Yes, all of the parents were ____ because of them.\nA. excited; exciting\nB. exciting; excited\nC. excited; excited\nD. exciting; exciting",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 79,
        "page": 28
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 9,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "B 本题考查动词的分词辨析。句意：—多么激动的孩子！——是的，他们的家长因为他们很激动。孩\n子们激动是主动的，用exciting，家长因为孩子们兴奋二感觉兴奋，是被动的。因此第一空填\nexciting，第二空填excited。故选B。现在分词exciting表示动作是主动的；过去分词excited意为感到\n激动的，表示被动关系。都可以修饰名词作定语。"
  },
  {
    "id": "xdf-0683bdd6b1936303",
    "type": "choice",
    "text": "I prefer skiing to_____. The snow makes me______.\nA. swim; excited\nB. swimming; exciting\nC. swimming; excited\nD. swim; exciting",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 80,
        "page": 28
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 8,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "C 本题考查prefer…to…的用法。句意：比起游泳，我更喜欢滑雪。这雪使我激动。根据prefer后的\nskiing可知to后面用动名词swimming；第二空是形容人的用动词过去分词，所以用excited。故选C。"
  },
  {
    "id": "xdf-150a787625b5ce7a",
    "type": "choice",
    "text": "Here's the chart _______ different ways to learn English.\nA. to showing\nB. show\nC. showed\nD. to show",
    "answer": "D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 81,
        "page": 29
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 7,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "考查非谓语动词。此处用动词不定式 “to show” 作后置定语，修饰 “chart”，表示 “用来展示…… 的图\n表”，所以选 D。"
  },
  {
    "id": "xdf-4cd72ef294962018",
    "type": "fill",
    "text": "I see so many butterflies in the garden. They are flying around colorful flowers.（合并为\n一句）\nI ____ so many butterflies in the garden ____ around colorful flowers.",
    "answer": "see； flying",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 82,
        "page": 29
      }
    ],
    "review": "pending",
    "explanation": "句意：我在花园里看到很多蝴蝶。他们在多彩的花丛间飞。根据题干信息可知，此处考查see sb.\ndoing sth.“看到某人正在做某事”。故填see；flying。"
  },
  {
    "id": "xdf-4d553515f4b65973",
    "type": "fill",
    "text": "You mustn’t leave rubbish here. (保持句意基本不变)\n____ rubbish is not ____ here.",
    "answer": "Leaving； allowed",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 83,
        "page": 29
      }
    ],
    "review": "pending",
    "explanation": "句意：你不能在这里扔垃圾。此句可改为“扔垃圾在这里是不允许的”，leave rubbish“乱扔垃圾”，在句\n中作主语，应用动名词，allow“允许”，扔垃圾是不被允许的，应用被动语态be done的结构，故填\nLeaving；allowed。"
  },
  {
    "id": "xdf-6f345a16750fa364",
    "type": "choice",
    "text": "When autumn comes, the leaves ________ fall.\nA. are going to\nB. will\nC. shall\nD. would",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 84,
        "page": 29
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 4,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：当秋天来临时，树叶会落下。\n考查动词时态。这是一个含时间状语从句的复合句，从句用一般现在时表将来，主句要用一般将来\n时。be going to表示根据迹象推测马上要发生的事情或表示当前的、已计划过或思考过的意图和打\n算。树叶落下是纯粹的客观现实，因此用will+动词原形，故选B。"
  },
  {
    "id": "xdf-aa1e6c6fcef280ea",
    "type": "choice",
    "text": "He watched the game with a ______ look.\nA. surprise\nB. surprised\nC. surprising\nD. surprisingly",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 85,
        "page": 29
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 3,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：他带着一个惊讶的表情观看比赛。A. surprise惊讶，名词；使惊讶，动词；B. surprised惊讶\n的，形容词，通常指事情或物；C. surprising 惊讶的，形容词，通常指人感到惊讶；D. surprisingly惊\n讶地，副词；根据形容词修饰名词look样子，排除A/D；根据look样子；故选Cexcited表示兴奋的，指\n人或物对---感到兴奋；例如：He was excited at the news. exciting表示令人兴奋的，使人激动\n的，一般修饰事情，物；例如：He told us an exciting story yesterday.类似的词语还有\ninteresting/interested；boring/bored"
  },
  {
    "id": "xdf-d3f232b37ba104b6",
    "type": "choice",
    "text": "I would strongly recommend ________ a good quality bicycle rather than a cheap one.\nA. buy\nB. bought\nC. buying\nD. to buy",
    "answer": "C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 86,
        "page": 29
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我强烈建议买一辆质量好的自行车，而不是便宜的那种。\n考查非谓语动词。recommend doing sth.“建议做某事”，固定搭配，所以这里应用动名词作宾语。故\n选C。"
  },
  {
    "id": "xdf-b7409fbc52519738",
    "type": "choice",
    "text": "I see Lily ________ when I pass her room.\nA. dance\nB. dancing\nC. to dance\nD. dances",
    "answer": "B",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 87,
        "page": 30
      },
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：当我经过莉莉的房间时，我看见她正在跳舞。\n考查非谓语动词。根据“when I pass her room.”可知，此处表示“经过莉莉房间时，看到她正在跳\n舞”，see sb doing sth“看见某人正在做某事”，故空格处为dancing。故选B。"
  },
  {
    "id": "xdf-eb707c5330eddf14",
    "type": "cloze",
    "text": "Living and dealing with kids can be a hard job these days, but living and dealing\nwith parents can be even . Since I was a teenager, I that communication is\nvery important. Both when you disagree and when you get along in any relationship, you need to\nlet people know your feelings. If you are not able to communicate, things\nbad. When you are mad at your parents, it is no use not talking to them. If you look\nthe word “communication” in a dictionary, it will say “the exchange of ideas and information”.\na good relationship, you must keep communication strong. Let people know how you\nfeel, even if it’s just by a note. You have to make your parents good about\nhow they are doing as a parent. If you are trying to make them see something as you see it, tell\nthem that you’ll listen to what they say, but ask them to listen to you. away\nonly makes the situation worse.\nThis is example. One night, Sophie went to a street party with her friends. She\nknew she had to be home by midnight after the fireworks, but she felt it would be rude of\nto go home first. As a result, she was late getting home. Her parents were angry at\nfirst, but when Sophie explained she was late, they weren’t so mad. Communication is\nthe key factor there.\nRelationship can only with communication. Just remember, you get\ninto a situation like Sophie’s, tell your parents how you feel.\n(1) A. hard B. harder C. hardest D. the hardest\n(2) A. have learnt B. learnt C. learn D. will learn\n(3) A. the others B. another C. other D. others\n(4) A. become B. will become C. becomes D. are\nbecoming\n(5) A. in B. to C. up D. at\n(6) A. Kept B. Keep C. Keeping D. To keep\n(7) A. writing B. to write C. write D. writes\n(8) A. felt B. feel C. feels D. to feel\n(9) A. polite B. politeness C. politely D. impolite\n(10) A. Walk B. Walks C. Walked D. Walking\n(11) A. a B. the C. an D. /\n(12) A. hers B. her C. she D. she’s\n(13) A. how B. why C. which D. what\n(14) A. improved B. be improving C. improve D. be improved\n(15) A. because B. before C. unless D. if",
    "answer": "(1) B (2) A (3) C (4) B (5) C (6) D (7) A (8) B (9) C (10)D (11) C (12) B (13) B (14) D (15) D",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 88,
        "page": 30
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：如今，与孩子相处是件难事，而与父母相处更是更难。\nhard原级；harder比较级；hardest最高级；the hardest最高级。根据“even”可知需用比\n较级。故选B。\n【小题2】 句意：从青少年时期起，我就认识到沟通很重要。\nhave learnt现在完成时；learnt一般过去时；learn一般现在时；will learn一般将来时。根\n据“Since I was a teenager”可知是现在完成时。故选A。\n【小题3】 句意：无论是当你不同意其他人还是当你相处任何关系时，你都需要让别人知道你的感\n受。\nthe others剩余全部人或物；another另一个；other其他的；others其他人或物。修\n饰“people”应用形容词other。故选C。\n【小题4】 句意：如果你无法沟通，情况会变糟。\nbecome一般现在时，且主语非三单；will become一般将来时；becomes一般现在时，且\n主语是三单；are becoming现在进行时。if引导条件状语从句，主句需用一般将来时。故\n选B。\n【小题5】 句意：如果你在查字典中查“communication”一词，它会说“思想和信息的交换”。\nin在……里；to到；up向上；at在。固定搭配“look up”表示“查阅”，符合语境。故选C。\n【小题6】 句意：为了保持良好的关系，你必须保持强有力的沟通。\nKept过去分词；Keep原形；Keeping动名词；To keep不定式。分析句子可知，此处表示\n目的状语，需用不定式。故选D。\n【小题7】 句意：让人们知道你的感受，即使只是写张纸条。\nwriting动名词；to write不定式；write原形；writes三单。介词“by”后接动名词。故选A。\n【小题8】 句意：你必须让你的父母对他们作为父母的所作所为感到满意。\nfelt过去式；feel原形；feels三单；to feel不定式。make sb. do sth.是固定搭配，表示“让\n某人做某事”。故选B。\n【小题9】 句意：如果你想让他们认同你的某个看法，要告诉他们你会倾听他们的想法，但也要礼貌\n地请求他们听你把话说完。\npolite礼貌的，形容词；politeness礼貌，名词；politely礼貌地，副词；impolite不礼貌，\n形容词。修饰动词“asked”需用副词。故选C。\n【小题10】句意：走开只会让情况更糟。\nWalk原形；Walks三单；Walked过去式；Walking动名词。此处作主语，需用动名词。故\n选D。\n【小题11】句意：这是一个例子。\na泛指一个，且用于辅音音素开头的单词前；the表示特指；an泛指一个，且用于元音音素\n开头的单词前；/不填。此处表示“一个例子”，且“example”以元音音素开头，需用“an”。故\n选C。\n【小题12】句意：她知道她必须在午夜放完烟花后回家，但她觉得自己先回家是不礼貌的。\nhers她的，名词性物主代词；her她，宾格；she他，主格；she’s她是。介词“of”后应用宾\n格作宾语。故选B。\n【小题13】句意：她的父母起初很生气，但当索菲解释她晚回家的原因时，他们就不那么生气了。\nhow如何；why为什么；which哪个；what什么。根据“Sophie explained...she was\nlate”可知，此处是解释回家晚的原因。故选B。\n【小题14】句意：关系只能通过沟通改善。\nimproved一般过去时；be improving进行时；improve一般现在时；be improved被动语\n态。主语“Relationship”和动词“improve”之间是动宾关系，应用被动语态be improve，且\n情态动词“can”后接be动词原形。故选D。\n【小题15】句意：记住，如果你遇到索菲这样的情况，告诉你父母你的感受。\nbecause因为；before在……之前；unless除非；if如果。根据“you get into a situation\nlike Sophie’s”可知，需用“如果”表示假设。故选D。"
  },
  {
    "id": "xdf-d34a1884c4e10dfc",
    "type": "cloze",
    "text": "通读下面短文，掌握其大意，然后按照句子结构的语法和上下文连贯的要求，从每题所给\n的四个选项中选出一个最佳答案。\nPeople can use their hands to communicate in many ways. The thumbs–up sign has a well-\nknown indication of approval. People cross their fingers to wish for good luck. A wave of the\nhand usually hello. Many people make an O with their thumb and\nforefinger to show that everything is okay.\nWhile riding a bike, people also use hand signs to show that they are going to turn left, turn\nright or stop. Police officers wave their hands to direct drivers to go or stop. In classrooms,\nchildren often raise hands for permission to speak. At concerts and large events,\npeople clap their hands to show appreciation for a performance.\nIt has become common parents to teach their children to sign. Babies can\nactually imitate and use signs they can speak clearly, which helps parents know\nthey are in need of before they are able to say their needs.\nToday, an increasing number of people are choosing sign language in their free\ntime. They learn sign language because they find it is and they really enjoy the\nchallenge of learning a new skill.\nWith sign language, they can communicate with friends or family members who can’t hear\nor say anything a lot .\nAnd job seekers find that people who can communicate through sign language\nby many companies. So sign language is playing an important part in our life.\n(1) A. will mean B. means C. has meant\n(2) A. the B. a C. an\n(3) A. they B. their C. them\n(4) A. on B. for C. of\n(5) A. before B. after C. since\n(6) A. when B. what C. how\n(7) A. studying B. study C. to study\n(8) A. interest B. interesting C. interested\n(9) A. more easily B. easy C. easier\n(10) A. needed B. need C. are needed",
    "answer": "(1) B (2) A (3) B (4) B (5) A (6) B (7) C (8) B (9) A (10)C",
    "sources": [
      {
        "file": "错题_36_20260922_215743.pdf",
        "number": 89,
        "page": 31
      }
    ],
    "review": "pending",
    "explanation": "【小题1】 句意：挥手通常意味着打招呼。\nwill mean一般将来时；means三单形式；has meant现在完成时。 根据“A wave of the\nhand usually...”中的“usually” 可知，该句描述的是经常性的动作，应用一般现在时。主\n语“A wave of the hand”是单数第三人称，谓语动词要用第三人称单数形式。故选B。\n【小题2】 句意：很多人用大拇指和食指围成一个圈，表示一切都好。\nthe定冠词，表示特指；a不定冠词，用于辅音音素开头的单词前；an不定冠词，用于元音\n音素开头的单词前。根据语境可知，这里是特指食指，要用定冠词the。a和an是不定冠\n词，表泛指。故选A。\n【小题3】 句意：在教室里，孩子们经常举手请求发言。\nthey主格，他们；their形容词性物主代词，他们的；them宾格，他们。根据“hands”可\n知，这里表示孩子们举起“他们的”手，修饰名词“hands”要用形容词性物主代词。they是主\n格，作主语；them是宾格，作宾语；their是形容词性物主代词，意为“他们的”。故选B。\n【小题4】 句意：父母教孩子手语已经变得很普遍。\non在……上面；for对于；of……的。根据“It has become common...parents to teach\ntheir children to sign.”可知，此处考查固定句型“It is+形容词+for sb.+to do sth.”，表\n示“对于某人来说做某事是……的”，这里表示对于父母来说教孩子手语很普遍，故选B。\n【小题5】 句意：婴儿在能够清晰说话之前就可以模仿并使用手语。\nbefore在……之前；after在……之后；since自从。根据“which helps parents know...they\nare in need of before they are able to say their needs”可知，婴儿是在能清晰说话“之\n前”就可以模仿和使用手语。故选A。\n【小题6】 句意：这有助于父母在他们能够说出需求之前知道他们需要什么。\nwhen什么时候；what什么；how怎样。分析句子结构可知，“...they are in need\nof”作“know”的宾语，且从句中“are in need of”缺少宾语，此处需要用what来引导，表\n示“……的事物”，故选B。\n【小题7】 句意：如今，越来越多的人选择在空闲时间学习手语。\nstudying动名词；study动词原形；to study动词不定式。根据“Today, an increasing\nnumber of people are choosing...sign language in their free time.”可知，此处考查固定\n搭配“choose to do sth.”，意为“选择做某事”。这里要用动词不定式，故选C。\n【小题8】 句意：他们学习手语是因为他们发现它很有趣。\ninterest名词，兴趣；interesting形容词，有趣的，常用来修饰物；interested形容词，感\n兴趣的，常用来修饰人。根据“They learn sign language because they find it is...”可知，\n这里修饰“it”，即手语，要用“interesting”表示“有趣的”，故选B。\n【小题9】 句意：有了手语，他们可以更容易地与听不见或不能说话的朋友或家人交流。\nmore easily副词比较级，更容易地；easy形容词，容易的；easier形容词比较级，更容易\n的。这里修饰动词“communicate”，要用副词，且是和没有手语的情况作比较，要用比较\n级，故选A。\n【小题10】句意：求职者发现，很多公司都需要会通过手语交流的人。\nneeded过去式/过去分词；need动词原形；are needed一般现在时的被动语态。“people\nwho can communicate through sign language”和“need”之间是被动关系，表示 “被需\n要”，要用被动语态，结构是“be+过去分词”；主语“people”是复数，be动词用are，need\n的过去分词是needed，故选C。"
  },
  {
    "id": "xdf-f4d8306f3ff5c445",
    "type": "choice",
    "text": "I am grateful 1 you 2 your kindness.\nA. to; to\nB. to; for\nC. for; to\nD. for; for",
    "answer": "B",
    "sources": [
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "短语be grateful to sb. for sth. 表示因为某事（物）对某人感到感激，由此可知此题的you前填介\n词to，your kindness前填介词for，综合分析可知此题答案为B。\n【句意】对于你的善意，我感到很感激。"
  },
  {
    "id": "xdf-9328746175562791",
    "type": "cloze",
    "text": "What films are good for children?\nEvery year, a lot of films are made, but not all of them are good for young children.\n1\nBefore we see a film in a cinema or watch a play in a , we should find out if it\nis suitable (适宜的) for us.\nA good film teaches us a lesson. For example, the film Beauty and the Beast tells us\nto love someone for his/her being good-hearted, not for his/her being . The Lion\nKing teaches us to be brave and fair to others.\n3\nSome films are forgotten while others stay in people's minds forever.\n4\nPerhaps you've seen a classic (经典的) film many times but still it. Every time\nyou watch it, you learn something new and fantastic.\nWatch Beauty and the Beast again, and you'll learn that good looks are not so\nimportant. If you are sad, you watch Mouse Hunt again to make yourself happy. No matter\n5\nyou feel, there's always a classic that can meet your need.\nThere are different kinds of films such as funny films, detective films, horror films,\n6\nscience-fiction, action films, love stories, and so on. , many of them are only\nsuitable for adults.\n1. A. theatre B. market C. church D. hospital\n2. A. hard-working B. ugly-looking C. best-selling D. good-looking\n3. A. slowly B. quickly C. never D. hardly\n4. A. hate B. dislike C. enjoy D. imagine\n5. A. what B. how C. why D. when\n6. A. Instead B. Therefore C. Luckily D. However",
    "answer": "1-5 ADBCB 6-6 D",
    "sources": [
      {
        "file": "错题_38_20260922_215755.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "1.考查：名词词义辨析。根据 “watch a play”（看戏剧），戏剧通常在 “theatre（剧院）” 里观\n看，“market（市场）”“church（教堂）”“hospital（医院）” 不符合语境，所以选 A。\n2.考查：形容词短语辨析。《美女与野兽》的寓意是爱一个人是因为其善良，而非外貌好看。“good-\nlooking（好看的）” 符合语境，“hard-working（勤奋的）”“ugly - looking（难看\n的）”“best-selling（最畅销的）” 不符合，所以选 D。\n3.考查：副词词义辨析。句中 “while” 表示对比，后半句说有些电影永远留在人们脑海里，那么前\n半句应是有些电影 “quickly（很快地）” 被遗忘，“slowly（缓慢地）”“never（从\n不）”“hardly（几乎不）” 不符合对比逻辑，所以选 B。\n4.考查：动词词义辨析。根据 “seen a classic film many times”（看过经典电影很多次）以及\n“learn something new and fantastic”（学到新的奇妙的东西），可知是仍然 “enjoy（喜欢）”\n它，“hate（讨厌）”“dislike（不喜欢）”“imagine（想象）” 不符合，所以选 C。\n5.考查：疑问词用法。“No matter how you feel” 表示 “无论你感觉如何”，“how” 用于询问感\n受、方式等，“what（什么）”“why（为什么）”“when（什么时候）” 不符合语境，所以选 B。\n6.考查：副词词义辨析。前文说有不同种类的电影，后文说很多只适合成年人，是转折关\n系。“However（然而）” 表转折，“Instead（代替）”“Therefore（因此）”“Luckily（幸运\n地）” 不符合逻辑，所以选 D。"
  },
  {
    "id": "xdf-40f9748ca442c66a",
    "type": "completion",
    "text": "A: Hey, Jake, did I do something wrong earlier?\n1\nB: No, not at all! (1) ____\nA: Well, you had your arms crossed and didn’t really look at me when I was talking.\n2\nB: Oh, I’m so sorry, Emma. (2) ____ I was just tired.\n3\nA: (3) ____ It doesn’t matter.\nB: But I should pay more attention. I didn’t mean to make you feel bad.\n4\nA: (4) ____ I’m glad you explained.\nB: Thanks for understanding. Next time, I won’t cross my arms and I will look at you in your eyes\nwhen you talk.\n5\nA: Haha, that’s a good idea. (5) ____\nB: Exactly. If I ever seem off (看起来不对劲) again, just ask me what’s wrong.\n6\nA: Okay. (6) ____\nB: Agreed.\nA. I see.\nB. Don’t worry about it.\nC. I didn’t mean to do that.\nD. Why do you say so?\nE. Communication solves many problems.\nF. Body language can say a lot of things when we talk.",
    "answer": "1-5 DCABF 6-6 E",
    "sources": [
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 18,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "本文是Emma和Jake关于肢体语言误解的对话，最终通过沟通解决问题。\n根据“Hey, Jake, did I do something wrong earlier?”及“No, not at all!”可知，Jake反问A为何这么问。\n选项D“你为何这么说？”符合语境。故选D。\n根据“Oh, I’m so sorry, Emma...I was just tired.”可知，Jake解释自己并非故意表现出冷漠，选项C“我不\n是故意那么做的。”符合语境。故选C。\n根据“Oh, I’m so sorry, Emma...I was just tired.”可知，对方解释了自己这么做的原因，此处应表示理\n解，选项A“我明白了。”符合语境。故选A。\n根据“I didn’t mean to make you feel bad.”及“I’m glad you explained.”可知，此处是安慰对方，选项\nB“别担心。”符合语境。故选B。\n根据“Next time, I won’t cross my arms and I will look at you in your eyes when you talk.”及“Haha,\nthat’s a good idea”可知，此处是赞同肢体语言的重要性，选项F“在我们交谈时，肢体语言可以传达很\n多事情。”符合语境。故选F。\n根据“If I ever seem off (看起来不对劲) again, just ask me what’s wrong.”及“Okay.”可知，此处是回应\n沟通的作用，选项E“沟通能解决许多问题。”符合语境。故选E。"
  },
  {
    "id": "xdf-b528fa75d04009f4",
    "type": "cloze",
    "text": "What’s the English word for the Chinese food jiaozi? Perhaps you would say\n“dumpling”. But 1 , you can just say “jiaozi”. It has been officially added to the Oxford English\nDictionary. Until now, about 120 Chinese words have been added to the dictionary, becoming a\npart of the English language.\nWhy have these words become popular? It may be because of the increasing interest in\nlearning Chinese. The Confucius Institute (孔子学院) , which offers Chinese lessons, has 2 1,\n073 offices in 140 countries and areas, with 2–1 million students.\nResearchers studied 50 media platforms in eight English- speaking 3 , including the US,\nthe UK and India. Their report listed the top 100 Chinese words that people in these countries use\nthe most.\n“Shaolin”, a place in China that is 4 for kung fu, was at the top of the list. Other popular\nwords include “yinyang” “gugong” “nihao” “wushu” “qi” “qigong” “renminbi” and “majiang”.\nSome of the hot words represent the social and cultural changes. For example, 5 tuhao\nand dama are old words, they have got new meanings. Tuhao used to represent those who owned\na lot of land and had many servants in the old days, but now it is used to refer to the rich who\nspend money like water or like to show off. Dama (aunt) used to be a term to middle- aged\nwomen, but now it especially refers to the Chinese women who like shopping. They usually rush to\nbuy a lot of gold when its price 6 , thinking that they can save much money.\nSome of the words refer to not only social and cultural changes, but also politics, economics\nand technology, like zhongguomeng (Chinese Dream), yidaiyilu and wanggou.\n1. A. finally B. actually C. firstly D. luckily\n2. A. given up B. set up C. put up D. looked up\n3. A. cities B. towns C. schools D. countries\n4. A. interesting B. boring C. famous D. late\n5. A. because B. although C. since D. when\n6. A. drops B. raises C. rises D. loses",
    "answer": "1-5 BBDCB 6-6 A",
    "sources": [
      {
        "file": "错题_39_20260922_215801.pdf",
        "number": 19,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "1.句意：但事实上，你可以直接说“jiaozi”。\n此处用于转折补充事实，actually事实上，符合语境，用来纠正人们习惯用“dumpling”的说法。\n2.句意：提供汉语课程的孔子学院已在140个国家和地区设立了1073个办事处，有210万学生。\nset up建立、设立；与“offices”搭配，符合“建立办事机构”的语境。\n3.句意：研究人员研究了八个英语国家的50个媒体平台，包括美国、英国和印度。\n后文列举了美国、英国、印度等国家，因此此处指“八个说英语的国家”，countries国家，符合上下文逻\n辑。\n4.句意：中国一个以功夫闻名的地方“少林”名列榜首。\nbe famous for因……而闻名，是固定搭配，符合“少林以功夫闻名”的常识。\n5.句意：例如，虽然“土豪”和“大妈”是旧词，但它们有了新含义。\n前后为让步关系，although虽然，引导让步状语从句，符合逻辑。\n6.句意：他们通常在金价下跌时抢购大量黄金，以为这样可以省下很多钱。\n根据常识，人们会在价格下跌时买入，drop下跌，符合语境；raises/rises上涨，与逻辑相反；loses丢\n失，不与“price”搭配。"
  },
  {
    "id": "xdf-1ebba0957ccd26f8",
    "type": "cloze",
    "text": "Living and dealing with kids can be a hard job these days, but living and\ndealing with parents can be even 1 . Since I was a teenager, I 2 that\ncommunication is very important. Both when you disagree and when you get along in any\nrelationship, you need to let 3 people know your feelings. If you are not able to\ncommunicate, things 4 bad. When you are mad at your parents, it is no use not talking\nto them. If you look 5 the word “communication” in a dictionary, it will say “the\nexchange of ideas and information”. 6 a good relationship, you must keep\ncommunication strong. Let people know how you feel, even if it’s just by 7 a note.\nYou have to make your parents 8 good about how they are doing as a parent. If you are\ntrying to make them see something as you see it, tell them that you’ll listen to what\nthey say, but ask them 9 to listen to you. 10 away only makes the situation\nworse.\nThis is 11 example. One night, Sophie went to a street party with her friends. She\nknew she had to be home by midnight after the fireworks, but she felt it would be rude of\n12 to go home first. As a result, she was late getting home. Her parents were angry at\nfirst, but when Sophie explained 13 she was late, they weren’t so mad. Communication\nis the key factor there.\nRelationship can only 14 with communication. Just remember, 15 you get into a\nsituation like Sophie’s, tell your parents how you feel.\n1. A. hard B. harder C. hardest D. the hardest\n2. A. have learnt B. learnt C. learn D. will learn\n3. A. the others B. another C. other D. others\n4. A. become B. will become C. becomes D. are becoming\n5. A. in B. to C. up D. at\n6. A. Kept B. Keep C. Keeping D. To keep\n7. A. writing B. to write C. write D. writes\n8. A. felt B. feel C. feels D. to feel\n9.\nA. polite B. politeness C. politely D. impolite\n10. A. Walk B. Walks C. Walked D. Walking\n11. A. a B. the C. an D. /\n12. A. hers B. her C. she D. she’s\n13. A. how B. why C. which D. what\n14. A. improved B. be improving C. improve D. be improved\n15. A. because B. before C. unless D. if",
    "answer": "1-5 BACBC 6-10 DABCD 11-15 CBBDD",
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 1,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "1.句意：如今，与孩子相处是件难事，而与父母相处更是更难。\nhard原级；harder比较级；hardest最高级；the hardest最高级。根据“even”可知需用比较级。故选\nB。\n2.句意：从青少年时期起，我就认识到沟通很重要。\nhave learnt现在完成时；learnt一般过去时；learn一般现在时；will learn一般将来时。根\n据“Since I was a teenager”可知是现在完成时。故选A。\n3.句意：无论是当你不同意其他人还是当你相处任何关系时，你都需要让别人知道你的感受。\nthe others剩余全部人或物；another另一个；other其他的；others其他人或物。修饰“people”应用\n形容词other。故选C。\n4.句意：如果你无法沟通，情况会变糟。\nbecome一般现在时，且主语非三单；will become一般将来时；becomes一般现在时，且主语是三单；\nare becoming现在进行时。if引导条件状语从句，主句需用一般将来时。故选B。\n5.句意：如果你在查字典中查“communication”一词，它会说“思想和信息的交换”。\nin在……里；to到；up向上；at在。固定搭配“look up”表示“查阅”，符合语境。故选C。\n6.句意：为了保持良好的关系，你必须保持强有力的沟通。\nKept过去分词；Keep原形；Keeping动名词；To keep不定式。分析句子可知，此处表示目的状语，需用\n不定式。故选D。\n7.句意：让人们知道你的感受，即使只是写张纸条。\nwriting动名词；to write不定式；write原形；writes三单。介词“by”后接动名词。故选A。\n8.句意：你必须让你的父母对他们作为父母的所作所为感到满意。\nfelt过去式；feel原形；feels三单；to feel不定式。make sb. do sth.是固定搭配，表示“让某人做\n某事”。故选B。\n9.句意：如果你想让他们认同你的某个看法，要告诉他们你会倾听他们的想法，但也要礼貌地请求他们\n听你把话说完。\npolite礼貌的，形容词；politeness礼貌，名词；politely礼貌地，副词；impolite不礼貌，形容词。\n修饰动词“asked”需用副词。故选C。\n10.句意：走开只会让情况更糟。\nWalk原形；Walks三单；Walked过去式；Walking动名词。此处作主语，需用动名词。故选D。\n11.句意：这是一个例子。\na泛指一个，且用于辅音音素开头的单词前；the表示特指；an泛指一个，且用于元音音素开头的单词\n前；/不填。此处表示“一个例子”，且“example”以元音音素开头，需用“an”。故选C。\n12.句意：她知道她必须在午夜放完烟花后回家，但她觉得自己先回家是不礼貌的。\nhers她的，名词性物主代词；her她，宾格；she他，主格；she’s她是。介词“of”后应用宾格作宾\n语。故选B。\n13.句意：她的父母起初很生气，但当索菲解释她晚回家的原因时，他们就不那么生气了。\nhow如何；why为什么；which哪个；what什么。根据“Sophie explained...she was late”可知，此处\n是解释回家晚的原因。故选B。\n14.句意：关系只能通过沟通改善。\nimproved一般过去时；be improving进行时；improve一般现在时；be improved被动语态。主\n语“Relationship”和动词“improve”之间是动宾关系，应用被动语态be improve，且情态动\n词“can”后接be动词原形。故选D。\n15.句意：记住，如果你遇到索菲这样的情况，告诉你父母你的感受。\nbecause因为；before在……之前；unless除非；if如果。根据“you get into a situation like\nSophie’s”可知，需用“如果”表示假设。故选D。"
  },
  {
    "id": "xdf-cc28b6561ea5284c",
    "type": "cloze",
    "text": "通读下面短文，掌握其大意，然后按照句子结构的语法和上下文连贯的要求，从每题所给的\n四个选项中选出一个最佳答案。\nPeople can use their hands to communicate in many ways. The thumbs-up sign has a well-\nknown indication of approval. People cross their fingers to wish for good luck. A wave of\nthe hand usually 1 hello. Many people make an O with their thumb and 2\nforefinger to show that everything is okay.\nWhile riding a bike, people also use hand signs to show that they are going to turn\nleft, turn right or stop. Police officers wave their hands to direct drivers to go or\nstop. In classrooms, children often raise 3 hands for permission to speak. At\nconcerts and large events, people clap their hands to show appreciation for a performance.\nIt has become common 4 parents to teach their children to sign. Babies can\nactually imitate and use signs 5 they can speak clearly, which helps parents know\n6 they are in need of before they are able to say their needs.\nToday, an increasing number of people are choosing 7 sign language in their free\ntime. They learn sign language because they find it is 8 and they really enjoy the\nchallenge of learning a new skill.\nWith sign language, they can communicate with friends or family members who can’t\nhear or say anything a lot 9 .\nAnd job seekers find that people who can communicate through sign language 10 by\nmany companies. So sign language is playing an important part in our life.\n1. A. will mean B. means C. has meant\n2. A. the B. a C. an\n3. A. they B. their C. them\n4. A. on B. for C. of\n5. A. before B. after C. since\n6. A. when B. what C. how\n7. A. studying B. study C. to study\n8. A. interest B. interesting C. interested\n9. A. more easily B. easy C. easier\n10. A. needed B. need C. are needed",
    "answer": "1-5 BABBA 6-10 BCBAC",
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 2,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "1.句意：挥手通常意味着打招呼。\nwill mean一般将来时；means三单形式；has meant现在完成时。 根据“A wave of the hand\nusually...”中的“usually” 可知，该句描述的是经常性的动作，应用一般现在时。主语“A wave\nof the hand”是单数第三人称，谓语动词要用第三人称单数形式。故选B。\n2.句意：很多人用大拇指和食指围成一个圈，表示一切都好。\nthe定冠词，表示特指；a不定冠词，用于辅音音素开头的单词前；an不定冠词，用于元音音素开头的单\n词前。根据语境可知，这里是特指食指，要用定冠词the。a和an是不定冠词，表泛指。故选A。\n3.句意：在教室里，孩子们经常举手请求发言。\nthey主格，他们；their形容词性物主代词，他们的；them宾格，他们。根据“hands”可知，这里表示\n孩子们举起“他们的”手，修饰名词“hands”要用形容词性物主代词。they是主格，作主语；them是\n宾格，作宾语；their是形容词性物主代词，意为“他们的”。故选B。\n4.句意：父母教孩子手语已经变得很普遍。\non在……上面；for对于；of……的。根据“It has become common...parents to teach their\nchildren to sign.”可知，此处考查固定句型“It is+形容词+for sb.+to do sth.”，表示“对于某\n人来说做某事是……的”，这里表示对于父母来说教孩子手语很普遍，故选B。\n5.句意：婴儿在能够清晰说话之前就可以模仿并使用手语。\nbefore在……之前；after在……之后；since自从。根据“which helps parents know...they are in\nneed of before they are able to say their needs”可知，婴儿是在能清晰说话“之前”就可以模\n仿和使用手语。故选A。\n6.句意：这有助于父母在他们能够说出需求之前知道他们需要什么。\nwhen什么时候；what什么；how怎样。分析句子结构可知，“...they are in need of”作“know”的\n宾语，且从句中“are in need of”缺少宾语，此处需要用what来引导，表示“……的事物”，故选\nB。\n7.句意：如今，越来越多的人选择在空闲时间学习手语。\nstudying动名词；study动词原形；to study动词不定式。根据“Today, an increasing number of\npeople are choosing...sign language in their free time.”可知，此处考查固定搭配“choose to\ndo sth.”，意为“选择做某事”。这里要用动词不定式，故选C。\n8.句意：他们学习手语是因为他们发现它很有趣。\ninterest名词，兴趣；interesting形容词，有趣的，常用来修饰物；interested形容词，感兴趣的，\n常用来修饰人。根据“They learn sign language because they find it is...”可知，这里修\n饰“it”，即手语，要用“interesting”表示“有趣的”，故选B。\n9.句意：有了手语，他们可以更容易地与听不见或不能说话的朋友或家人交流。\nmore easily副词比较级，更容易地；easy形容词，容易的；easier形容词比较级，更容易的。这里修\n饰动词“communicate”，要用副词，且是和没有手语的情况作比较，要用比较级，故选A。\n10.句意：求职者发现，很多公司都需要会通过手语交流的人。\nneeded过去式/过去分词；need动词原形；are needed一般现在时的被动语态。“people who can\ncommunicate through sign language”和“need”之间是被动关系，表示 “被需要”，要用被动语\n态，结构是“be+过去分词”；主语“people”是复数，be动词用are，need的过去分词是needed，故选\nC。"
  },
  {
    "id": "xdf-9ac9d719371b869a",
    "type": "reading",
    "text": "\"Now, it is the time to witness the miracle!\" The magician, Liu Qian,\ndiscovered a diamond ring in an egg in front of millions of people at CCTV's Spring\nFestival Gala (春晚) in 2009. Liu's magic tricks have made the old art of magic\nfashionable once again, and made him the hottest magician in China.\nAs a skillful young magician from Taiwan, Liu is popular worldwide for his magic\nshows. He has performed in countries, including the United States, Japan, South Korea and\nthe U.K.\nMaking something impossible happen right before your eyes is the reason why people\nlove magic.\nLiu has a special understanding of magic shows, \"To get a magic shoe successful,\nthinking is more important than skills. We think a lot about how to make the shows\ncreative and more interesting.\" Liu said. So during his performance, audiences (观众) are\noften invited to be in his shows, making people believe he really has magic power.\nLiu Qian's success dated back to his childhood. Born in 1976 in Taiwan, he found\nhimself attracted to a magic toy in a shop when he was seven years old. At the age of 12,\nhe won Taiwan's Youth Magic Contest, which was judged by the great American magician,\nDavid Copperfield. \"It encouraged me to carry on my magic shoe dream.\" But Liu planned on\nbecoming a professional magician at the beginning. He studied Japanese literature at\nUniversity and only hoped to be a part-time magician. However, his failure to find a good\njob after graduation pushed him towards magic as a career. To improve his skills, he has\nperformed on streets for passers-by. \"Street shows are the biggest challenge for us\nmagician.\" Liu said.\nIn 2001, Liu started a TV show called \"Magic Star\", which quickly became one of the\nmost popular shows. He successfully keeps this traditional art form alive.\n1.单选题\nWhy do people love to watch magic? 1\nA. Because magic is an old art.\nB. Because magic attracts their eyes.\nC. Because they cannot find out the secret of magic.\nD. Because they love watching magicians make the impossible happen.\n2.单选题\nWhat can we learn from the story? 1\nA. Liu Qian wanted to be a professional magician at first.\nB. Liu Qian took part in many magic competitions.\nC. Liu Qian often invites audiences to be in his magic show.\nD. Liu Qian performs on streets in order to make himself famous.\n3.单选题\nWhat made Liu Qian decide to make magic his career? 1\nA. He played magic on streets in his free time.\nB. He had won Taiwan's Youth Magic Contest.\nC. He was interested in magic when he was little.\nD. He could not find a good job after graduation.\n4.单选题\nIn what order did Liu Qian do the following? 1\n①He became a magician.\n②He fell in love with magic.\n③He began to perform magic on TV.\n④He won Taiwan's Youth Magic Contest.\n⑤He was invited to CCYV's Spring Festival Gala\nA. ②④①③⑤\nB. ②④①⑤③\nC. ①②④③⑤\nD. ①④②⑤③\n5.单选题\nThe story is about 1 .\nA. how Liu began to have magic power.\nB. why people love watching magic shows.\nC. what tricks are used in Liu's magic shows.\nD. how Liu became China's hottest magician.",
    "answer": "(1) D (2) C (3) D (4) A (5) D",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_41_20260922_215818.pdf","number":3,"page":3,"sha256":"cc9ef35003287ffd8c1713a48b46a44601b76bc3c553cc09b51b7889b784ae6f"},
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 3,
        "page": 3
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n本题属于细节题。考查获取事实性信息的能力。根据句意，“人们为什么喜欢看魔术”可定\n位到第三段“Making something impossible happen right before your eyes is the\nreason why people love magic.”看到不可能的事情发生是人们喜欢魔术的原因，选D。\n\n第 2 小题：\n本题属于细节题。考查获取事实性信息的能力。第四段中，audiences (观众) are often\ninvited to be in his shows，观众常被邀请参与他的表演中，故选C。\n【易错分析】are often invited to翻译成被邀请去做......。\n\n第 3 小题：\n本题属于细节题。考查获取事实性信息的能力。根据句意“什么让刘谦决定把魔术当做职业\n生涯”，可定位到第五段“his failure to find a good job after graduation pushed\nhim towards magic as a career.”找工作的失败经历迫使他把魔术当做职业生涯，故选D。\n【易错分析】failure失败，push him towards迫使他去......。\n\n第 4 小题：\n本题属于细节题。考查获取事实性信息的能力。排序题，A. ②④①③⑤，②④在第五段第二\n行，①定位到第五段第六行，③定位到第七段第一行，⑤定位到第一段，发生在2009年，最\n晚的，故选A。\n【易错分析】定位时在原文标出序号，要细心。\n\n第 5 小题：\n本题属于推断题。考查理解主旨要义的能力。全文讲的是刘谦的成功经历，故“how Liu\nbecame China's hottest magician.”符合要求，故选D。\n【易错分析】通过整篇文章的宏观分析，得出结论。"
  },
  {
    "id": "xdf-e1bab525d31767d8",
    "type": "reading",
    "text": "Heman Bekele was born in Africa. He saw people there working under the hot sun\nwithout protection for their skin. That made them vulnerable to skin cancer (癌症), an\nillness caused by too much exposure (暴露) to the sun. Treating cancer usually costs a\nlot. Heman wondered if there was a cheaper way to deal with that. He came up with an idea:\nadding medicines for skin cancer to soaps. “What is something that everyone can use?”\nHeman thought. “Everyone uses soap and water for cleaning. So soap may be the best\nchoice.”\nHeman needed help to bring his idea to life. In 2023, he joined the 3M Young Scientist\nChallenge. He sent a video, explaining what he wanted to do. Finally, he won the game and\ngot the prize of $25, 000.\nSince then, Heman has been working on his idea. Adult experts from 3M offer him help.\n“I got really lucky,” one of the experts, Deborah Isabelle, said. “Last year I worked\nwith Heman. He’s an amazing, active, very inspiring young man.”\nIt can take years before the soap is available for people to buy. But Heman is still\nhopeful. Over the summer, he spent every weekday in the lab. “It’s absolutely wonderful\nto think that one day, my bar of soap will be able to have a direct influence on somebody\nelse’s life.”\n1.单选题\nWhat does the underlined word “vulnerable” mean?\nA. Weak.\nB. Safe.\nC. Normal.\nD. Brave.\n2.单选题\nWhat did Heman think of the idea of using soap?\nA. It’s an expensive way.\nB. It’s a cheap way.\nC. It’s a clean way.\nD. It’s a successful way.\n3.单选题\nWhat did the 3M challenge bring to Heman?\nA. Support.\nB. Medicines.\nC. An idea.\nD. A position.\n4.单选题\nWhich words can best describe Heman?\nA. Humorous and funny.\nB. Outgoing and friendly.\nC. Hard-working and kind.\nD. Interesting and active.\n5.单选题\nWhat is Heman’s attitude towards the future of the soap?\nA. Worried.\nB. Uncaring.\nC. Doubtful.\nD. Hopeful.",
    "answer": "(1) A (2) B (3) A (4) C (5) D",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_41_20260922_215818.pdf","number":4,"page":4,"sha256":"cc9ef35003287ffd8c1713a48b46a44601b76bc3c553cc09b51b7889b784ae6f"},
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 4,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n词句猜测题。根据第一段“He saw people there working under the hot sun without\nprotection for their skin.”可知，此处表示非洲人在无皮肤防护的烈日下劳作，这会使\n他们“vulnerable to skin cancer(易患由过度日晒引发的皮肤癌)”，vulnerable意思\n是“易受伤害的；脆弱的”，与wek“虚弱的”意思相近。故选A。\n\n第 2 小题：\n细节理解题。根据第一段“Heman wondered if there was a cheaper way to deal with\nthat ... Heman thought. ‘Everyone uses soap and water for cleaning. So soap may\nbe the best choice.’”可知，此处表示希幔贝克勒觉得使用肥皂的这个办法很便宜。故选\nB。\n\n第 3 小题：\n细节理解题。根据第二段“In 2023, he joined the 3M Young Scientist Challenge …\nFinally, he won the game and got the prize of $25, 000.”和第三段“Adult experts\nfrom 3M offer him help.”可知，在这个挑战赛中，希幔贝克勒最终获奖并得到奖金，并且\n承认专家也提供了帮助，因此3M挑战赛给希幔贝克勒带来了支持。故选A。\n\n第 4 小题：\n推理判断题。根据第四段“Over the summer, he spent every weekday in the lab.”可\n知，此处表示希幔贝克勒每周呆在实验室研究，体现出他是hard-working“勤奋的”；“my\nbar of soap will be able to have a direct influence on somebody else’s life”体\n现他想通过肥皂帮助人，所以他是kind“善良的”。故选C。\n\n第 5 小题：\n观点态度题。根据第四段“It can take years before the soap is available for people\nto buy. But Heman is still hopeful… my bar of soap will be able to have a direct\ninfluence on somebody else’s life.”可知，尽快需要很多时间，但是希幔贝克勒依然充\n满希望，所以他觉得这款肥皂未来是hopeful“充满希望的”。故选D。"
  },
  {
    "id": "xdf-0e7f099229fc6e23",
    "type": "choice",
    "text": "You could save more money 1 you can buy a gift for your friend's\nbirthday.\nA. although\nB. unless\nC. so that\nD. if",
    "answer": "C",
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 16,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "本题考查状语从句，多攒钱的目的是可以给朋友买生日礼物。"
  },
  {
    "id": "xdf-8ade4b08f22692e8",
    "type": "reading",
    "text": "Although making food is fun, it’s (1) ________ to know how to be safe. This\nmeans knowing when to get help from a grown-up, (2) ________ to keep things clean, and\nhow to use the kitchen safely.\nIf you have ever seen a cooking show on TV, you’ll know that all the best cooks\nhave an assistant to help them. If you’re a kid, a grown-up assistant can help you to\nmake cooking (3) ________ and keep you safer. Some things in the kitchen may seem simple\nto do, but once you use them yourself, you might be surprised to know how difficult they\nare. By having your assistant around, you can stay safe and have fun while you\n(4) ________ .\nWearing an apron (围裙) will keep your clothes clean. If you don’t have an apron,\nan old shirt will be OK. But don’t wear big clothes. They are easy to catch fire.\n(5) ________ wash your hands with soap and water before you begin to cook. The idea is\nto keep germs (病菌) out of your food. They can make you sick.\nIt’s also a good idea to learn (6) ________ in the kitchen. It’s easy to get\nhurt in the kitchen if you’re not careful, and a cut or burn will end your fun cooking.\n1.单选题\nA. importance\nB. unimportant\nC. important\nD. unimportance\n2.单选题\nA. how\nB. what\nC. when\nD. who\n3.单选题\nA. easily\nB. easier\nC. easy\nD. more easily\n4.单选题\nA. cooked\nB. had cooked\nC. cooks\nD. cook\n5.单选题\nA. Sometimes\nB. Never\nC. Always\nD. Hardly\n6.单选题\nA. something\nB. anything\nC. everything\nD. nothing",
    "answer": "(1) C (2) A (3) B (4) D (5) C (6) A",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_41_20260922_215818.pdf","number":17,"page":7,"sha256":"cc9ef35003287ffd8c1713a48b46a44601b76bc3c553cc09b51b7889b784ae6f"},
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 17,
        "page": 7
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n句意：虽然做食物很有趣，但知道如何安全是很重要的。\nimportance重要性；unimportant不重要的；important重要的；unimportance不重要。根\n据“know how to be safe.”可知，这里是说知道如何安全是很重要的，应填形容词作表\n语。故选C。\n\n第 2 小题：\n句意：这意味着知道什么时候该得到成年人的帮助，如何保持东西的清洁，以及如何安全地\n使用厨房。\nhow怎样；what什么；when什么时候；who谁。根据“keep things clean”可知，动词不定式\nkeep后有宾语，因此用how加动词不定式。故选A。\n\n第 3 小题：\n句意：如果你是个孩子，一个成年助理可以帮助你让烹饪变得更容易，让你更安全。\neasily容易地；easier更容易的；easy容易的；more easily更容易。根据“a grown-up\nassistant can help you”可知，这里应该用形容词的比较级与safer并列。故选B。\n\n第 4 小题：\n句意：有了你的助手在身边，你就可以在做饭时保持安全并享受乐趣。\ncooked过去式；had cooked过去完成时；cooks动词三单；cook动词原形。根据“you can\nstay safe and have fun while you….”可知，while引导的句子应该用一般现在时，主语\n是you，因此谓语用动词原形。故选D。\n\n第 5 小题：\n句意：在开始做饭之前，一定要用肥皂和水洗手。\nSometimes有时；Never从不；Always总是；Hardly几乎不。根据“before you begin to\ncook. ”可知，做饭前，一定要洗手。故选C。\n\n第 6 小题：\n句意：在厨房里学点东西也是个好主意。\nsomething某物；anything任何东西；everything每件事；nothing没有什么。分析句子结构\n可知，此句是肯定句，用something。故选A。"
  },
  {
    "id": "xdf-574e50342860dfdc",
    "type": "cloze",
    "text": "There is a young shepherd boy. He takes 1 sheep to a hill every day.\nThe boy is 2 bored (无聊的).\nOne day, he gets an idea. He shouts, “Wolf! Wolf! A wolf 3 !” The farmers in the\nvillage hear him. They run up the hill 4 to help him. But when they arrive, they see\nno wolf. The boy 5 and says, “There is no wolf. I just want to have some fun.” The\nfarmers are angry and go back. A few days 6 , the boy does the same thing again. He\nshouts, “Wolf! Wolf!” Again, the farmers come to help, 7 there is no wolf. They are\nvery angry 8 the boy.\nOne day, a real wolf comes. The boy is very scared. He shouts, “Wolf! Wolf! Please\nhelp!” But this time, no one comes to help him. 9 wolf eats some of his sheep. So we\nshould always tell the truth and be 10 in our daily lives.\n1. A. him B. his C. he\n2. A. a few B. a lot of C. a bit\n3. A. came B. is coming C. was coming\n4. A. quickly B. quicker C. quick\n5. A. laughs B. laughed C. will laugh\n6. A. late B. later C. latest\n7. A. and B. so C. but\n8. A. on B. in C. with\n9. A. The B. A C. An\n10. A. honesty B. honest C. dishonest",
    "answer": "1-5 BCBAA 6-10 BCCAB",
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 18,
        "page": 9
      }
    ],
    "review": "pending",
    "explanation": "1.句意：他每天把他的羊群带到一座山上。\nhim他，宾格；his他的，形容词性物主代词或名词性物主代词；he他，主格。sheep为名词，此处应用\n形容词性物主代词表示所属关系。故选B。\n2.句意：那个男孩觉得有点儿无聊。\na few些许，修饰复数名词；a lot of许多，修饰名词；a bit一点儿，修饰形容词或副词。bored为形\n容词，此处应用a bit来修饰，表示无聊的程度。故选C。\n3.句意：一头狼来了！\ncame来，过去式；is coming正在来，现在进行时；was coming正在来，过去进行时。根据“Wolf!\nWolf!”可知，他当下正在喊狼来了，引语应用现在进行时。故选B。\n4.句意：他们快速地跑上山去帮助他。\nquickly快速地，副词；quicker更快的，形容词的比较级；quick快的，形容词。run为动词，此处应用\n副词quickly修饰动词run。故选A。\n5.句意：那个男孩笑着说道：“没有狼。我只是想找点乐子。”\nlaughs笑，一般现在时，三单形式；laughed笑，过去式；will laugh会笑，一般将来时。根据“and\nsays”可知，句子应用一般现在时。故选A。\n6.句意：几天后，那个男孩又做了同样的事情。\nlate迟到的，原级；later晚一点，比较级；latest最迟的，最高级。根据“A few days”可知，此处\n用a few days later表示“几天后”。故选B。\n7.句意：再一次，农民们前来帮忙，但依旧没有狼。\nand并且；so因此；but但是。前后两句存在转折关系，用but连接。故选C。\n8.句意：他们对男孩感到愤怒。\non在上面；in在……里；with对。根据“They are very angry”可知，此处应用be angry with表\n示“对……感到很生气”。故选C。\n9.句意：那头狼吃掉了他的一些羊。\nThe表特指；A表泛指，用于辅音音素开头的单词前；An表泛指，用于元音音素开头的单词前。根\n据“One day, a real wolf comes.”可知，此处特指前文提到的那头真正的狼，因此应用定冠词the。\n故选A。\n10.句意：所以，我们应该要总是说实话，并且在日常生活中要诚实。\nhonesty诚实，名词；honest诚实的，形容词；dishonest不诚实的，形容词。根据“we should always\ntell the truth”可知，这个故事告诫人们要诚实，be动词后接形容词作表语。故选B。"
  },
  {
    "id": "xdf-b29271781348e62a",
    "type": "cloze",
    "text": "Community Garden Project\nOur class organized a project to clean up an old garden. There’s some rubbish in the\ngarden. The goal was to 1 and plant flowers. Some students wore gloves to pick up\nbottles, while others dug holes.\nAt first, we argued about the plan. Tom suggested 2 more tools, but Emma said,\n“We have 3 time to prepare. Let’s start now!” Finally, we agreed. While working,\nan old lady passed by and said, “You kids seem 4 ! This garden looks much cleaner\nthan before!” Her words encouraged us to work harder.\nBy noon, we had collected a few bags of rubbish. It was really tiring, 5 we felt\nproud of ourselves.\n1. A. pick up it B. pick it up C. pick them up\n2. A. to buy B. buying C. buy\n3. A. a little B. few C. little\n4. A. amazing B. amazed C. amaze\n5. A. but B. and C. so",
    "answer": "1-5 BBCAA",
    "sources": [
      {
        "file": "错题_41_20260922_215818.pdf",
        "number": 19,
        "page": 9
      }
    ],
    "review": "pending",
    "explanation": "1.句意：目标是捡起垃圾并种花。\npick up it表述错误，代词应放在pick和up中间；pick it up捡起它，指代单数名词或不可数名词；\npick them up捡起它们，指代复数名词。根据“The goal was to...and plant flowers.”可知，这\n里“rubbish”是不可数名词，用“pick it up”。故选B。\n2.句意：汤姆建议多买些工具，但艾玛说：“我们几乎没有时间准备了。我们现在就开始吧！”\nto buy动词不定式；buying现在分词或动名词；buy动词原形。根据“Tom suggested...more\ntools”可知，suggest doing sth. 是固定用法，表示“建议做某事”，所以这里用“buying”。故选\nB。\n3.句意：汤姆建议多买些工具，但艾玛说：“我们几乎没有时间准备了。我们现在就开始吧！”\na little一点儿，修饰不可数名词，表肯定；few很少，修饰可数名词复数，表否定；little很少修饰\n不可数名词，表否定。根据“Let’s start now!”可知，时间不多，表否定，“time”是不可数名\n词，此处用“little”。故选C。\n4.句意：你们这些孩子看起来太棒了！\namazing令人惊奇的，常用来形容事物；amazed感到惊奇的，常用来形容人；amaze动词，使惊奇。根\n据“an old lady passed by and said, ‘You kids seem...! This garden looks much cleaner\nthan before!’”可知，这里形容“kids”，用“amazing”表示“孩子们很棒”。故选A。\n5.句意：这真的很累，但我们为自己感到骄傲。\nbut但是，表转折；and和，表并列；so所以，表因果。根据“It was really tiring,...we felt\nproud of ourselves.”可知，“很累”和“感到骄傲”是转折关系，用“but”。故选A。"
  },
  {
    "id": "xdf-c507850f2d51c885",
    "type": "reading",
    "text": "C\nOnce there was a famous painter. Lots of people came to see his paintings. They never\ngot tired of praising (赞美) his paintings. One day, the painter thought, \"I often hear\npeople praise my paintings, but will they talk about the problems in my paintings behind\nmy back?\" Thinking about this, he got up early one morning and put one of his paintings on\na busy street with a note (便条): \"If anyone finds any problem in this painting, please\nput a mark (标记) on it.\"\nIn the evening, when he went to get his painting back, he found hundreds of marks on\nit. Seeing this, he was very disappointed. He took his painting quietly and went home.\nFrom then on, the painter stopped painting. One of his friends heard about this and\nwent to visit him. He said to the painter, \"Put the same painting on the same street once\nagain, but this time with the different note — 'If anyone finds any problem in this\npainting, fix it please.'\"\nThe next morning, the painter did as his friend said. In the evening, when he and his\nfriend went to get the painting, they found there was nothing on it. The painter was\nsurprised. His friend laughed and said, \"Anyone can find problems, but very few people can\nfix them. Some people only want to find problems of others. So, your problem was not in\nyour painting but in asking for advice from such people.\"\n1.单选题\n1\nFrom Paragraph 1, we know .\nA. what the painter thought of his paintings\nB. why the painter put his painting on a busy street\nC. who gave the painter some advice on his paintings\nD. how people found problems in the painter's paintings\n2.单选题\nWhat does the underlined word \"disappointed\" in Paragraph 2 mean in Chinese?\nA. 兴奋的\nB. 残忍的\nC. 失望的\nD. 放松的\n3.单选题\nThe painter's friend asked him to 1 .\nA. put the same painting on the same street with a different note\nB. put a different painting on the same street with the same note\nC. put the same painting on a different street with a different note\nD. put a different painting on a different street with the same note\n4.单选题\nWhat is the right order of the following events?\n① The painter stopped painting.\n② The painter found hundreds of marks on his painting.\n③ The painter was surprised to find nothing on his painting.\nA. ①③②\nB. ②①③\nC. ②③①\nD. ③①②\n5.单选题\nWhat can we learn from the passage?\nA. We should keep on doing things to the end.\nB. We should care less about others' problems.\nC. We should ask for help when we are in trouble.\nD. We should ask for advice in a right way.",
    "answer": "(1) B (2) C (3) A (4) B (5) D",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_43_20260922_215828.pdf","number":2,"page":1,"sha256":"12074892e6178218f424e63ab36eb5710ae23a70ed8d60a7d419cc16ce6c0a50"},
    "sources": [
      {
        "file": "错题_43_20260922_215828.pdf",
        "number": 2,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n第一段讲画家听到人们赞美他的画，却想知道人们是否会在背后谈论画中的问题，于是把画\n放到街上，这是他这么做的原因。故答案为 “B”。\n\n第 2 小题：\n画家看到画上有很多标记，心情低落，“disappointed” 表示 “失望的”。故答案为\n“C”。\n\n第 3 小题：\n朋友让他把同一幅画放在同一条街上，但换一张不同的便条。故答案为 “A”。\n\n第 4 小题：\n②画家发现画上有很多标记→①画家停止画画→③画家惊讶地发现画上什么都没有。故答案\n为 “B”。\n\n第 5 小题：\n文章告诉我们，向别人寻求建议时要选对方式，不能只找只会挑毛病的人。故答案为\n“D”。"
  },
  {
    "id": "xdf-3d6329ce23fc8f5d",
    "type": "reading",
    "text": "During the summer holiday, I was lucky enough to go to Chile in South America\nalong with some of my schoolmates. We stayed with Chilean families there. We first met\nthem when they visited our school before. While we were there, we visited many parts of\nthe country, including the Atacama Desert and Chile's capital city of Santiago.\nAt first, it was a bit difficult to live in a house with a new family. But I fit in\nwell and my Spanish improved quickly. My trip to the Atacama Desert was an unforgettable\nexperience. Not only did I see some amazing scenery, but I was able to experience some\nunique things there. For example, I swam in Cejar Lagoon, an oasis (绿洲). Also I saw wild\nflamingos. We watched them in a distance so that they would not fly away. Then we ate in a\ncafe at a height of 3300 meters and climbed a mountain to see cave (洞穴) paintings that\nwere created over 4000 years ago. I don't think I will ever forget the view that I got\nwhen I watched the sunset on top of the Purple Mountains.\nI also went on a trip to Santiago. The president's house, called La Moneda, was very\nbeautiful. Santiago is surrounded by mountains. I took a cable car (缆车) to the top and\ngot a great view of the whole city.\n1.单选题\nThe writer lived in 1 while in Chile.\nA. a city hotel\nB. a mountain\nC. a local family\nD. a desert\n2.单选题\nThe underlined word \"flamingos\" in Paragraph 2 refers to a kind of 1 .\nA. fish\nB. bird\nC. snake\nD. whale\n3.单选题\nWhich of the following is TRUE according to the text? 1\nA. The writer went to Chile's capital city alone.\nB. In Chile, the president's house is open to visitors.\nC. The writer ate in a cafe on top of the Purple Mountains.\nD. Chilean people speak English as their official language.\n4.单选题\nPut the following in the right order according to the passage. 1\n①watched the sunset\n②went to Atacama Desert\n③met Chilean families\n④visited the city of Santiago\nA. ③①②④\nB. ②④③①\nC. ③②①④\nD. ②④①③\n5.单选题\nWhat would be the best title for the text? 1\nA. A journey to Chile\nB. An introduction to Chile\nC. A history of Chile\nD. A guide to Chile",
    "answer": "(1) C (2) B (3) B (4) C (5) A",
    "answerSource": {"kind":"local-original","originalAnswer":"C","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_43_20260922_215828.pdf","number":3,"page":2,"sha256":"12074892e6178218f424e63ab36eb5710ae23a70ed8d60a7d419cc16ce6c0a50"},
    "sources": [
      {
        "file": "错题_43_20260922_215828.pdf",
        "number": 3,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据第一段第二句“We stayed with Chilean families there.”可知，作者\n在智利时是住在当地人的家里的。故选C。\n\n第 2 小题：\n指代判断题。根据第二段第七句“We watched them in a distance so that they would\nnot fly away.”可知，作者和同学们远远地看着他们，免得他们飞走。由此可推\n知，“flamingos”指的是一种鸟。故选B。\n\n第 3 小题：\n推理判断题。根据第三段第二句“The presidents house, called La Moneda, was very\nbeautiful.”可推知，在智利，总统的房子向游客开放。故选B。\n\n第 4 小题：\n细节理解题。通读全文可知，本文正确的顺序是作者结识了智利当地人家，去了Atacama沙\n漠，看了日出，游览了Santiago,所以C项顺序正确。故选C。\n\n第 5 小题：\n标题概括题。通读全文可知，文章主要叙述了作者去智利旅游的经历。A journey to Chile\n应是本文的最佳标题。故选A。"
  },
  {
    "id": "xdf-96bcc65264268438",
    "type": "fill",
    "text": "1 (library) are professionals who are there to help you find and make\nsense of information.",
    "answer": "1 Librarians",
    "sources": [
      {
        "file": "错题_43_20260922_215828.pdf",
        "number": 4,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "根据 are 可知主语是复数，library （图书馆 ）→ librarian （图书管理员 ），复数 librarians\n。故答案为Librarians。"
  },
  {
    "id": "xdf-434fe447c57ea19a",
    "type": "fill",
    "text": "It is important to keep calm in an 1 (emergent).",
    "answer": "1 emergency",
    "sources": [
      {
        "file": "错题_43_20260922_215828.pdf",
        "number": 7,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "an 后接名词，emergent （形容词，紧急的 ）→ emergency （名词，紧急情况 ）。故答案为\nemergency。"
  },
  {
    "id": "xdf-28c4c54d8214a136",
    "type": "reading",
    "text": "When I was thirteen years old, I became very interested in shopping. After a\nwhile being just a buyer, I wanted to sell something. I had many things around the house\nfrom my childhood that I no longer needed. I knew, with the help of my father, I could\nmake money. So for months and months I enjoyed myself by selling things on my dad’s\naccount (账户).\nOn December 9, 2017, I opened my own account and began to start my own business.\nThings were going great and then I realized that selling things around the house wasn’t\nmaking me the kind of money that I wanted to make, so I decided to turn my business into a\nresale shop. I went around to the garage sale (旧货出售处) and bought items at low prices\nand sold them at higher prices later.\nLast November, I went to a garage sale that was a little bit different. A single lady\nhad many nice items that I knew I would sell quickly. I went up to her and started a\nconversation with her. Through the conversation, I knew she was jobless at the moment and\nneeded money to support her family. I decided to sell any of her things for her to help\nher out. She looked at me for a moment and then broke into tears. I took away some of her\nthings and over the next month I made over $1,500 for her. She was so thankful for all of\nmy help. I have never felt so happy to help someone in my life. I felt as if I had made a\ndifference in this world and that my skills could be used to help someone who would really\nneed it.\n1.单选题\nAt first, __________ helped the writer make money by selling things.\nA. the writer’s bank\nB. the writer’s father\nC. the writer’s teacher\nD. a single lady\n2.单选题\nThe writer went to the garage sale to __________.\nA. meet single ladies\nB. sell things she no longer needed\nC. help others\nD. buy things for her resale shop\n3.单选题\nThe writer decided to help the lady sell her things because __________.\nA. the lady’s items were nice\nB. the lady lived a hard life\nC. she liked the lady very much\nD. the lady asked the writer for help\n4.单选题\nWhich of the following might be the best title for this passage?\nA. A Whiz Kid\nB. A Good Way to Make Money\nC. A Helpful Skill\nD. How to Sell Things",
    "answer": "(1) B (2) D (3) B (4) C",
    "answerSource": {"kind":"local-original","originalAnswer":"B","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_43_20260922_215828.pdf","number":8,"page":4,"sha256":"12074892e6178218f424e63ab36eb5710ae23a70ed8d60a7d419cc16ce6c0a50"},
    "sources": [
      {
        "file": "错题_43_20260922_215828.pdf",
        "number": 8,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“I knew, with the help of my father, I could make money. So for\nmonths and months I enjoyed myself by selling things on my dad’s account (账\n户).”可知，作者最初是在父亲的帮助下通过销售物品赚钱的。故选B。\n\n第 2 小题：\n细节理解题。根据“I decided to turn my business into a resale shop, I went around\nto the garage sale (旧货出售处) and bought items at low prices and sold them at\nhigher prices later.”可知，作者去旧货出售处是为了购买低价物品，以便后续在转售商\n店中以高价出售。故选D。\n\n第 3 小题：\n细节理解题。根据“Through the conversation, I knew she was jobless at the moment\nand needed money to support her family. I decided to sell any of her things for\nher to help her out.”可知，作者决定帮助这位女士出售物品是因为她失业且生活困难，\n需要钱来支持家庭。故选B。\n\n第 4 小题：\n最佳标题题。根据“I have never felt so happy to help someone in my life. I felt\nas if I had made a difference in this world and that my skills could be used to\nhelp someone who would really need it.”可知，全文核心是通过商业技能帮助他人（如\n为失业女士代售物品），因此“A Helpful Skill”最能概括文章主题。故选C。"
  },
  {
    "id": "xdf-ec28af7e62ca35ed",
    "type": "fill",
    "text": "You mustn’t leave rubbish here. (保持句意基本不变)\n1 2\n____ rubbish is not ____ here.",
    "answer": "1 Leaving 2 allowed",
    "sources": [
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 5,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：你不能在这里扔垃圾。此句可改为“扔垃圾在这里是不允许的”，leave rubbish“乱扔垃\n圾”，在句中作主语，应用动名词，allow“允许”，扔垃圾是不被允许的，应用被动语态be done的结\n构，故填Leaving；allowed。"
  },
  {
    "id": "xdf-dfea50b465b491e0",
    "type": "fill",
    "text": "I see so many butterflies in the garden. They are flying around colorful flowers.\n（合并为一句）\n1 2\nI ____ so many butterflies in the garden ____ around colorful flowers.",
    "answer": "1 see 2 flying",
    "sources": [
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 6,
        "page": 1
      }
    ],
    "review": "pending",
    "explanation": "句意：我在花园里看到很多蝴蝶。他们在多彩的花丛间飞。根据题干信息可知，此处考查see sb.\ndoing sth.“看到某人正在做某事”。故填see；flying。"
  },
  {
    "id": "xdf-a9826f82f42b3d28",
    "type": "reading",
    "text": "When I was growing up in America, I was ashamed of my mother’s Chinese\nEnglish. Because of her Chinese English, she was often treated unfairly. People in\ndepartment stores, at banks, and at restaurants did not take her seriously, did not give\nher good service, pretended not to understand her, or even acted as if they did not hear\nher.\nMy mother realized that she was poor at English. When I was fifteen, she used to have\nme call people on phone to pretend I was she. I was made to ask for information or even to\nshout at people who had been rude to her. One time I had to call her stockbroker(股票经纪\n人). I said in an adolescent(青少年的) voice that was not very certain, “This is Mrs.\nTan.” My mother was standing beside me saying, “Why he doesn’t send me check, already\ntwo weeks late.” And then, in perfect English I said: “I’m getting rather worried. You\nagreed to send the check two weeks ago, but it hasn’t arrived.”\nMy mother then talked more loudly. “What he wants? I come to New York to tell him in\nfront of his boss.” And so I turned to the stockbroker again, “I can’t accept any more\nexcuse. If I don’t receive the check immediately, I am going to have to speak to your\nmanager when I am in New York next week.”\nThe next week we ended up in New York. While I was sitting there red-faced, my mother,\nthe real Mrs. Tan, was shouting to his boss in her broken English.\nWhen I was a teenager, my mother’s broken English embarrassed me. But now, I see it\ndifferently. To me, my mother’s English is perfectly clear, perfectly natural. It is my\nmother tongue. Her language, as I hear it, is vivid, direct, and full of observation and\nwisdom. It was the language that helped me see things, express ideas, and make sense of\nthe world.\n1.单选题\nWhy was the writer’s mother poorly served?\nA. She was unable to speak good English.\nB. She was often treated unfairly.\nC. She was not clearly heard.\nD. She was not very polite.\n2.单选题\nFrom Paragraph 2, we know that the writer was ________.\nA. good at pretending\nB. rude to the stockbroker\nC. ready to help her mother\nD. not willing to phone for her mother\n3.单选题\nTo the writer now, her mother’s English ________.\nA. makes her embarrassed\nB. is broken and different\nC. is helpful for her\nD. the nature of language\n4.单选题\nThe best title of the passage might be ________.\nA. Great Mother\nB. Mother’s Chinese English\nC. Natural English\nD. Perfect English",
    "answer": "(1) A (2) D (3) C (4) B",
    "answerSource": {"kind":"local-original","originalAnswer":"A","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_44_20260922_215835.pdf","number":12,"page":2,"sha256":"8877338acee8a4fd1b6abcf9d870d0ed72ca663f45a566f93792ebab847efc83"},
    "sources": [
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 12,
        "page": 2
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据第一段中“Because of her Chinese English, she was often treated\nunfairly. People in department stores, at banks, and at restaurants did not take\nher seriously, did not give her good service”可知妈妈受到很差的待遇是因为她英语\n说不好。故选A。\n\n第 2 小题：\n推理判断题。根据第二段中“I was made to ask for information or even to shout at\npeople who had been rude to her.”可知作者是被迫替妈妈打电话，由此可推出作者是不\n愿意的。故选D。\n\n第 3 小题：\n推理判断题。根据最后一段中“It was the language that helped me see things,\nexpress ideas, and make sense of the world.”妈妈的英语帮助作者看清事物、表达思想\n并理解这个世界，由此可推出对作者是有帮助的。故选C。\n\n第 4 小题：\n标题归纳题。妈妈的中式英语是贯穿全文的线索，用“Mother’s Chinese English”做标题\n最合适。故选B。"
  },
  {
    "id": "xdf-cd87d2f7e2bd2b12",
    "type": "choice",
    "text": "—The song________ by Jay Chou is very popular.\n—I like it, too. His songs always sound so nice.\nA. is sung\nB. was sung\nC. sung\nD. singing\n第18题 1\n[填空题]It is a (bore) book.",
    "answer": "C",
    "sources": [
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 17,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "句意：——周杰伦唱的那首歌很受欢迎。——我也喜欢。他的歌听起来总是那么好听。\n考查非谓语动词作后置定语。is sung一般现在时被动语态；was sung一般过去时被动语态；sung过去\n分词；singing现在分词。空格处需用过去分词作后置定语，修饰the song，表示“被周杰伦唱的\n歌”。故选C。"
  },
  {
    "id": "xdf-bcd4d8927e0d242b",
    "type": "reading",
    "text": "Ricardo Semler became boss of his father’s company in Brazil at the age of\n21. The name of the company is Semco. It sold parts for ships. Semler worked like a mad\nman, from 7:30 am to midnight every day. One afternoon, while he was visiting a factory in\nNew York, he fell down. The doctor said, “There’s nothing wrong with you. But if you\ncontinue like this, you’ll find a new home in our hospital.” Semler got the message. He\nchanged the way he worked. In fact, he changed the ways his workers worked, too.\nHe let his workers take more responsibility so that they would be the ones worrying\nwhen things went wrong. He allowed them to set their own salaries, and he cut all the jobs\nhe thought were unnecessary, like receptionists and secretaries.\nHe changed the office: instead of walls, they have plants at Semco, so bosses can’t\nshut themselves away from everyone else. And the workers are free to decorate their\nworkplace as they want. As for uniforms, some people wear suits and others wear T-shirts.\nSemco has flexible (弹性的) working hours: the workers decide when they need to arrive\nat work. Also, Semco lets its workers use the company’s machines for their own projects,\nand makes them take holidays for at least thirty days a year.\nIt sounds perfect, but does it work? The answer is in the numbers: in the last six\nyears, Semco’s revenues (收益) have gone from 212 million. The company has\ngrown from 800 workers to 3,000. Why?\nSemler says it’s because of “peer pressure (同辈压力)”. Peer pressure makes workers\nwork hard for everyone else. If someone isn’t doing his job well, the other workers will\nnot allow the situation to continue. In other words, Ricardo Semler treats his workers\nlike adults rather than children, and expects them to act like responsible adults. And\nthey do.\n1.单选题\nWhy did Semler change the ways he and his workers worked? Because ________.\nA. he became mad\nB. he had to stay in hospital\nC. his father asked him to do so\nD. he realized the danger of overwork\n2.单选题\nSemler makes a lot of changes in his company EXCEPT ________.\nA. the workers decide when they need to arrive at work\nB. the workers have fewer holidays than before\nC. the workers can decorate their workplace as they like\nD. the workers can use the company’s machines to do their own projects\n3.单选题\nWhat’s the main idea of Paragraph 5?\nA. Ricardo Semler’s method of running the company was successful.\nB. Ricardo Semler’s idea sounded perfect but not practical (实用).\nC. The company earned a lot of money.\nD. The reason for Ricardo Semler’s success.\n4.单选题\nThe underlined word “they” in the last paragraph refers to ________.\nA. adults\nB. Semler’s workers\nC. flexible working hours\nD. Semco’s revenues\n5.单选题\n________ is the most important thing in Semler’s company.\nA. Money\nB. Rule\nC. Responsibility\nD. Hard work",
    "answer": "(1) D (2) B (3) A (4) B (5) C",
    "answerSource": {"kind":"local-original","originalAnswer":"D","checkedAt":"2026-10-06","review":{"status":"pending"},"file":"错题_44_20260922_215835.pdf","number":19,"page":4,"sha256":"8877338acee8a4fd1b6abcf9d870d0ed72ca663f45a566f93792ebab847efc83"},
    "sources": [
      {
        "file": "错题_44_20260922_215835.pdf",
        "number": 19,
        "page": 4
      }
    ],
    "review": "pending",
    "explanation": "第 1 小题：\n细节理解题。根据“One afternoon, while he was visiting a factory in New York, he\nfell down ... He changed the way he worked. In fact, he changed the ways his\nworkers worked, too.”可知，Semler因过度工作而晕倒，医生警告他继续下去会住院。因\n此他意识到过度工作的危险，从而改变工作方式。故选D。\n\n第 2 小题：\n细节理解题。根据“And the workers are free to decorate their workplace as they\nwant.”以及“Semco has flexible (弹性的) working hours: the workers decide when\nthey need to arrive at work ... and makes them take holidays for at least thirty\ndays a year.”可知，Semco员工可以按照他们喜欢的方式装饰他们的工作场所；让员工决定\n他们需要什么时候来上班；员工可以使用公司的机器来做他们自己的项目；每年至少休30天\n的假。员工的假期应该比以前多了，而不是少了，B选项“员工的假期比以前少”与原文不\n符。故选B。\n\n第 3 小题：\n主旨大意题。根据 “It sounds perfect, but does it work? The answer is in the\nnumbers: in the last six years, Semco’s revenues ( 收 益 ) have gone from\n212 million. The company has grown from 800 workers to 3,000.”可知，\n在过去的六年里，Semco的收益从3500万美元增长到2.12亿美元，公司员工从800人增加到\n3000人。所以这一段主要讲了Ricardo Semler的公司经营方法是成功的。故选A。\n\n第 4 小题：\n词句猜测题。根据文章最后一段“ In other words, Ricardo Semler treats his workers\nlike adults rather than children, and expects them to act like responsible\nadults. And they do.”可知，Ricardo Semler把他的员工当作成年人而不是孩子来对待，\n并且期望他们表现得像有责任感的成年人，并且他们确实这样做了。由此判断“they”指代\n的是“Semler’s workers”。故选B。\n\n第 5 小题：\n推理判断题。根据“He let his workers take more responsibility so that they would\nbe the ones worrying when things went wrong.”以及最后一段“Semler says it’s\nbecause of ‘peer pressure (同辈压力)’ ... In other words, Ricardo Semler treats\nhis workers like adults rather than children, and expects them to act like\nresponsible adults. And they do.”可知，文章强调同辈压力和员工的责任感是成功关\n键，在Semler的公司里，责任感是最重要的事情。故选C。"
  }
];
  if (typeof module !== 'undefined') module.exports = questions;
  else root.EnglishBankQuestions = questions;
})(this);
