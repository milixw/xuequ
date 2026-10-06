'use strict';
// 原资料参考答案的作答映射，全部待审核；不修改原题字段。
(function(root) {
const entries = {
  "xdf-8a2f29efb28102f2": {
    "mode": "fill-choice",
    "answers": [
      "B",
      "E",
      "A",
      "D",
      "C"
    ],
    "letters": "ABCDEF",
    "source": {
      "file": "错题_06_20260922_215426.pdf",
      "number": 5,
      "page": 3,
      "sha256": "9a1a864d95a2dc5c1b9881cc64b22da79c5fe858dd60a4916aec0a6e02f8b379"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-d9e7a9a8487aafa1": {
    "mode": "fill-choice",
    "answers": [
      "B",
      "E",
      "A",
      "D",
      "C"
    ],
    "letters": "ABCDEF",
    "source": {
      "file": "错题_06_20260922_215426.pdf",
      "number": 5,
      "page": 3,
      "sha256": "9a1a864d95a2dc5c1b9881cc64b22da79c5fe858dd60a4916aec0a6e02f8b379"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-d48a6823ecd6cabd": {
    "mode": "fill-choice",
    "answers": [
      "B",
      "D",
      "C",
      "A",
      "B",
      "E",
      "D",
      "C"
    ],
    "letters": "ABCDE",
    "source": {
      "file": "错题_07_20260922_215435.pdf",
      "number": 3,
      "page": 3,
      "sha256": "78bd086bd14f23547653415383ded5ac770cc2d4cfaec928287456da4925a788"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-5378f07ff8f92ccf": {
    "mode": "fill-choice",
    "answers": [
      "B",
      "D",
      "C",
      "A",
      "B",
      "E",
      "D",
      "C"
    ],
    "letters": "ABCDE",
    "source": {
      "file": "错题_08_20260922_215442.pdf",
      "number": 3,
      "page": 2,
      "sha256": "62f446ebd060c952f438b459102b8b6b6bc640776e5602811ca8e927c8941dfb"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-0fd909ee7a15612f": {
    "mode": "fill-choice",
    "answers": [
      "D",
      "B",
      "F",
      "A",
      "C"
    ],
    "letters": "ABCDEF",
    "source": {
      "file": "错题_20_20260922_215603.pdf",
      "number": 2,
      "page": 2,
      "sha256": "22f642a01e6f6e90713558bcb4b108f2f231d3527d46f26edc751adf4bb49403"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-61d6242ab2068692": {
    "mode": "fill-choice",
    "answers": [
      "G",
      "D",
      "A",
      "F",
      "B",
      "C"
    ],
    "letters": "ABCDEFG",
    "source": {
      "file": "错题_21_20260922_215610.pdf",
      "number": 18,
      "page": 4,
      "sha256": "2cd33258f1d98424905e82960471405ca04a1890a30bdaefa91f6a3c42048652"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-7eebb047dd1f6cf5": {
    "mode": "text",
    "answers": [
      "humorous"
    ],
    "source": {
      "file": "错题_22_20260922_215615.pdf",
      "number": 15,
      "page": 2,
      "sha256": "8b8ba99f761faf5d535c377cf48d0a272986eceb31276b5460938925d114f2ae"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-0e0935e934cd52f7": {
    "mode": "text",
    "answers": [
      "thicker"
    ],
    "source": {
      "file": "错题_22_20260922_215615.pdf",
      "number": 16,
      "page": 2,
      "sha256": "8b8ba99f761faf5d535c377cf48d0a272986eceb31276b5460938925d114f2ae"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-a7a2775ae647537d": {
    "mode": "fill-choice",
    "answers": [
      "E",
      "B",
      "A",
      "F",
      "C",
      "D"
    ],
    "letters": "ABCDEF",
    "source": {
      "file": "错题_30_20260922_215707.pdf",
      "number": 4,
      "page": 1,
      "sha256": "080bfae97b4092f049d9513a2fce4d672a3428cc465566602a223ef0bb7bf2db"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-f998b7839720f202": {
    "mode": "text",
    "answers": [
      "natural",
      "connects",
      "honest",
      "together",
      "expect",
      "something",
      "protect"
    ],
    "source": {
      "file": "错题_31_20260922_215712.pdf",
      "number": 5,
      "page": 1,
      "sha256": "d40a96af3add68cba46d11b463e2cf440d93eff3eb9861c2b1b628983a398355"
    },
    "review": {
      "status": "pending"
    },
    "alternatives": [
      [
        "natural",
        "atural"
      ],
      [
        "connects",
        "onnects"
      ],
      [
        "honest",
        "onest"
      ],
      [
        "together",
        "ogether"
      ],
      [
        "expect",
        "xpect"
      ],
      [
        "something",
        "omething"
      ],
      [
        "protect",
        "rotect"
      ]
    ]
  },
  "xdf-00ddc926a6bb1726": {
    "mode": "text",
    "answers": [
      "preference",
      "melodies",
      "relaxation",
      "Musicians",
      "widely",
      "confident"
    ],
    "source": {
      "file": "错题_32_20260922_215717.pdf",
      "number": 1,
      "page": 1,
      "sha256": "30583c089d8d904f00ba788a2648d48d483a59c37774f6fbfe6d5335f7b5df10"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-0156526aa027d69d": {
    "mode": "text",
    "manual": true,
    "answers": [
      "do we",
      "What do the Victorian-era dresses look like",
      "No, they didn’t",
      "Why were the Victorian-era dresses so special",
      "You’re welcome"
    ],
    "source": {
      "file": "错题_32_20260922_215717.pdf",
      "number": 2,
      "page": 1,
      "sha256": "30583c089d8d904f00ba788a2648d48d483a59c37774f6fbfe6d5335f7b5df10"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-55bfdf38d8fc86e1": {
    "mode": "text",
    "answers": [
      "natural",
      "connects",
      "honest",
      "together",
      "expect",
      "something",
      "protect"
    ],
    "source": {
      "file": "错题_33_20260922_215725.pdf",
      "number": 5,
      "page": 1,
      "sha256": "27bf95241789cc908f29be74f52ce4d0bd89394724ee48a1a171df23809f9b9a"
    },
    "review": {
      "status": "pending"
    },
    "alternatives": [
      [
        "natural",
        "atural"
      ],
      [
        "connects",
        "onnects"
      ],
      [
        "honest",
        "onest"
      ],
      [
        "together",
        "ogether"
      ],
      [
        "expect",
        "xpect"
      ],
      [
        "something",
        "omething"
      ],
      [
        "protect",
        "rotect"
      ]
    ]
  },
  "xdf-ea944a991fc6725a": {
    "mode": "text",
    "answers": [
      "preference",
      "melodies",
      "relaxation",
      "Musicians",
      "widely",
      "confident"
    ],
    "source": {
      "file": "错题_35_20260922_215737.pdf",
      "number": 1,
      "page": 1,
      "sha256": "5b1eeceb27c22b82d91cead584faca564626baba6d168b07108f1aa2dadd54d7"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-0bd1c3497fa6a10c": {
    "mode": "text",
    "manual": true,
    "answers": [
      "do we",
      "What do the Victorian-era dresses look like",
      "No, they didn’t",
      "Why were the Victorian-era dresses so special",
      "You’re welcome"
    ],
    "source": {
      "file": "错题_35_20260922_215737.pdf",
      "number": 2,
      "page": 1,
      "sha256": "5b1eeceb27c22b82d91cead584faca564626baba6d168b07108f1aa2dadd54d7"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-53ff72298097cc0f": {
    "mode": "text",
    "answers": [
      "emergency"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 62,
      "page": 20,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-df9cfa264e266c9a": {
    "mode": "text",
    "answers": [
      "kindness"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 63,
      "page": 20,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-84c4c699c45ab285": {
    "mode": "text",
    "answers": [
      "impression"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 64,
      "page": 20,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-5dd142a395c054f1": {
    "mode": "text",
    "answers": [
      "Librarians"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 65,
      "page": 20,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-9d5ad1209b58559a": {
    "mode": "text",
    "answers": [
      "boring"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 70,
      "page": 26,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-4cd72ef294962018": {
    "mode": "text",
    "answers": [
      "see",
      "flying"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 82,
      "page": 29,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-4d553515f4b65973": {
    "mode": "text",
    "answers": [
      "Leaving",
      "allowed"
    ],
    "source": {
      "file": "错题_36_20260922_215743.pdf",
      "number": 83,
      "page": 29,
      "sha256": "2dd4ae0bddadd792d4ae8bf06ec1196328b5c55e92ef80e50d8124811a2ade0d"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-96bcc65264268438": {
    "mode": "text",
    "answers": [
      "Librarians"
    ],
    "source": {
      "file": "错题_43_20260922_215828.pdf",
      "number": 4,
      "page": 4,
      "sha256": "12074892e6178218f424e63ab36eb5710ae23a70ed8d60a7d419cc16ce6c0a50"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-434fe447c57ea19a": {
    "mode": "text",
    "answers": [
      "emergency"
    ],
    "source": {
      "file": "错题_43_20260922_215828.pdf",
      "number": 7,
      "page": 4,
      "sha256": "12074892e6178218f424e63ab36eb5710ae23a70ed8d60a7d419cc16ce6c0a50"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-ec28af7e62ca35ed": {
    "mode": "text",
    "answers": [
      "Leaving",
      "allowed"
    ],
    "source": {
      "file": "错题_44_20260922_215835.pdf",
      "number": 5,
      "page": 1,
      "sha256": "8877338acee8a4fd1b6abcf9d870d0ed72ca663f45a566f93792ebab847efc83"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-dfea50b465b491e0": {
    "mode": "text",
    "answers": [
      "see",
      "flying"
    ],
    "source": {
      "file": "错题_44_20260922_215835.pdf",
      "number": 6,
      "page": 1,
      "sha256": "8877338acee8a4fd1b6abcf9d870d0ed72ca663f45a566f93792ebab847efc83"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-0a4cd5b25c06dd33": {
    "mode": "text",
    "answers": [
      "No, he didn’t.",
      "Because he wanted Socrates to teach him how to become truly successful.",
      "He took a deep breath before going under and tried to hold it for about thirty seconds.",
      "He visited Socrates for the third time one month after the second visit.",
      "He repeatedly pushed the young man underwater so that the young man would experience the strong need for air, helping him realize he needed an equally strong desire for success.",
      "a strong desire"
    ],
    "manual": true,
    "source": {
      "file": "错题_32_20260922_215717.pdf",
      "number": 3,
      "page": 1,
      "sha256": "30583c089d8d904f00ba788a2648d48d483a59c37774f6fbfe6d5335f7b5df10"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-f0864632cf58777d": {
    "mode": "text",
    "answers": [
      "No, he didn’t.",
      "Because he wanted Socrates to teach him how to become truly successful.",
      "He took a deep breath before going under and tried to hold it for about thirty seconds.",
      "He visited Socrates for the third time one month after the second visit.",
      "He repeatedly pushed the young man underwater so that the young man would experience the strong need for air, helping him realize he needed an equally strong desire for success.",
      "a strong desire"
    ],
    "manual": true,
    "source": {
      "file": "错题_32_20260922_215717.pdf",
      "number": 3,
      "page": 1,
      "sha256": "30583c089d8d904f00ba788a2648d48d483a59c37774f6fbfe6d5335f7b5df10"
    },
    "review": {
      "status": "pending"
    }
  },
  "xdf-f5bc76dc94587d1c": {
    "mode": "text",
    "answers": [
      "If we respect cultural differences，we can communicate more effectively."
    ],
    "manual": true,
    "source": {
      "file": "错题_32_20260922_215717.pdf",
      "number": 4,
      "page": 3,
      "sha256": "30583c089d8d904f00ba788a2648d48d483a59c37774f6fbfe6d5335f7b5df10"
    },
    "review": {
      "status": "pending"
    }
  }
};
if(typeof module !== 'undefined') module.exports=entries; else root.EnglishGradingSupplements=entries;
})(this);
