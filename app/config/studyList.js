export const StudyList = [{
    title : 'HIRAGANA_TITLE',
    img : 'T001',
    lock : false,
    type : 'INITIAL',
    topic_id: 'T001',
    quizOptions: {
      random: false,
      //types:['romaji_moji', 'moji_romaji','audio_moji','audio_romaji'],
      types:['romaji_moji', 'moji_romaji','audio_moji'],
      style:'quizSquared'
    }
  },
  {
    title : 'NUMBER_TITLE',
    img : 'T002',
    lock : false,
    type : 'INITIAL',
    topic_id: 'T002',
    quizOptions: {
      random: true,
      //types:['audio_english', 'audio_moji'],
      //types:['moji_english', 'english_moji','audio_english','audio_moji'],
      types:['english_moji','audio_english','audio_moji'],
      withCorrection:true,
      style:'quizLong'
    }
  },
  {
    title : 'GREETING_TITLE',
    img : 'T003',
    lock : false,
    type : 'INITIAL',
    topic_id: 'T003',
    quizOptions: {
      random: true,
      //types:['audio_english', 'audio_moji'],
      //types:['moji_english', 'english_moji','audio_english','audio_moji'],
      types:['english_moji','audio_english','audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    }
  },
  {
    title : 'TOPIC1_TITLE',
    img : 'T004',
    lock : false,
    type : 'TOPIC',
    topic_id: 'T004',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      //types:['audio_english','audio_fill'],
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      //types:['english_moji','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      //types:['kanji_moji','kanji_fill','kanji_english','moji_kanji'],
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],
      //types:['audio_kanji'],
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      //types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],
      //types:['kanji_fill'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      //types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],
      //types:['kanji_fill'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'TOPIC2_TITLE',
    img : 'T005',
    lock : false,
    type : 'Topic',
    topic_id: 'T005',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'TOPIC3_TITLE',
    img : 'T006',
    lock : false,
    type : 'TOPIC',
    topic_id: 'T006',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },{
    title : 'TOPIC4_TITLE',
    img : 'T007',
    lock : false,
    type : 'TOPIC',
    topic_id: 'T007',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'FUKUSHU1_TITLE',
    img : 'loading',
    lock : false,
    type : 'FUKUSHU',
    topic_id: 'T008',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'TOPIC5_TITLE',
    img : 'T009',
    lock : false,
    type : 'TOPIC',
    topic_id: 'T009',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'TOPIC6_TITLE',
    img : 'T010',
    lock : true,
    type : 'TOPIC',
    topic_id: 'T010',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'TOPIC7_TITLE',
    img : 'T011',
    lock : true,
    type : 'TOPIC',
    topic_id: 'T011',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'TOPIC8_TITLE',
    img : 'T012',
    lock : true,
    type : 'TOPIC',
    topic_id: 'T012',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  {
    title : 'FUKUSHU2_TITLE',
    img : 'loading',
    lock : true,
    type : 'FUKUSHU',
    topic_id: 'T013',
    vocabulary:{     
      random:true, 
      types:['english_moji','english_fill','audio_english','audio_fill'],      
      withCorrection:true,
      style:'quizVocab'
    },
    grammar:{     
      random:true, 
      types:['english_moji','audio_english','fill','arrange'],
      withCorrection:true,
      style:'quizGrammar'
    },
    kanji:{     
      random:true, 
      types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
      withCorrection:true,
      style:'quizKanji'
    },
    listening:{     
      random:true, 
      types:['audio_moji'],
      withCorrection:true,
      style:'quizVocab'
    },
    reading:{     
      random:true, 
      types:['moji'],
      withCorrection:true,
      style:'quizGrammar'
    }
  },
  // {
  //   title : 'TOPIC9_TITLE',
  //   img : 'T014',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T014',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'TOPIC10_TITLE',
  //   img : 'loading',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T015'
  // },
  // {
  //   title : 'TOPIC11_TITLE',
  //   img : 'T016',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T016',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'TOPIC12_TITLE',
  //   img : 'T017',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T017',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'FUKUSHU3_TITLE',
  //   img : 'loading',
  //   lock : true,
  //   type : 'FUKUSHU',
  //   topic_id: 'T018',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'TOPIC13_TITLE',
  //   img : 'loading',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T019',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'TOPIC14_TITLE',
  //   img :'loading',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T020',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'TOPIC15_TITLE',
  //   img : 'loading',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T021',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
  // {
  //   title : 'TOPIC16_TITLE',
  //   img : 'loading',
  //   lock : true,
  //   type : 'TOPIC',
  //   topic_id: 'T022',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },  
  // {
  //   title : 'FUKUSHU4_TITLE',
  //   img : 'loading',
  //   lock : true,
  //   type : 'FUKUSHU',
  //   topic_id: 'T023',
  //   vocabulary:{     
  //     random:true, 
  //     types:['english_moji','english_fill','audio_english','audio_fill'],      
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   grammar:{     
  //     random:true, 
  //     types:['english_moji','audio_english','fill','arrange'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   },
  //   kanji:{     
  //     random:true, 
  //     types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],      
  //     withCorrection:true,
  //     style:'quizKanji'
  //   },
  //   listening:{     
  //     random:true, 
  //     types:['audio_moji'],
  //     withCorrection:true,
  //     style:'quizVocab'
  //   },
  //   reading:{     
  //     random:true, 
  //     types:['moji'],
  //     withCorrection:true,
  //     style:'quizGrammar'
  //   }
  // },
];


  export const LearnListData = {
    HIRAGANA_TITLE : [{
      title : 'WORD_LIST',
      type : 'HL1',
      study : '1'
    },{
      title : 'EXPLANATION',
      type : 'HL2',
      study : '1'
    },{
      title : 'FLASH_CARD_HIRAGANA',
      type : 'HL3',
      study : '1'
    },{
      title : 'FLASH_CARD_KATAKANA',
      type : 'HL3',
      study : '1'
    },{
      title : 'DRAW',
      type : 'HL4',
      study : '1'
    },
  ],
    NUMBER_TITLE :[{
      title : 'WORD_LIST',
      type : 'HL1',
      study : '2'
    },{
      title : 'FLASH_CARD',
      type : 'HL3',
      study : '2'
    }
  ],
    GREETING_TITLE : [{
      title : 'WORD_LIST',
      type : 'HL1',
      study : '3'
    },{
      title : 'FLASH_CARD',
      type : 'HL3',
      study : '3'
    },
  ],
  TOPIC1_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '4',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '4'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '4'
  },],
  TOPIC2_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '5',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '5'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '5'
  },],
  TOPIC3_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '6',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '6'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '6'
  },],
  TOPIC4_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '7',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '7'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '7'
  },],
  TOPIC5_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '8',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '8'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '8'
  },],
  TOPIC6_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '9',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '9'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '9'
  },],
  TOPIC7_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '10',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '10'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '10'
  },],
  TOPIC8_TITLE_and_vocabulary : [{
    title : 'GOI_LIST',
    type : 'GL1',
    study : '11',
  },{
    title : 'FLASH_CARD',
    type : 'GL2',
    study : '11'
  },{
    title : 'EXPLAINATION',
    type : 'GL3',
    study : '11'
  },],
  TOPIC1_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '4',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '4'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '4'
  },],
  TOPIC2_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '5',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '5'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '5'
  },],
  TOPIC3_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '6',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '6'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '6'
  },],
  TOPIC4_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '7',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '7'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '7'
  },],
  TOPIC5_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '8',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '8'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '8'
  },],
  TOPIC6_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '9',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '9'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '9'
  },],
  TOPIC7_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '10',
  },{
    title : 'FLASH_CARD',
    type : 'BL3',
    study : '12'
  },
  {
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '10'
  },],
  TOPIC8_TITLE_and_grammar : [{
    title : 'BUNPO_LIST',
    type : 'BL1',
    study : '11',
  },{
    title : 'FLASH_CARD',
    type : 'BL2',
    study : '11'
  },{
    title : 'EXPLAINATION',
    type : 'BL3',
    study : '11'
  },],
  TOPIC1_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '4',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '4'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '4'
  },],     
  TOPIC2_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '5',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '5'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '5'
  },],
  TOPIC3_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '6',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '6'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '6'
  },],
  TOPIC4_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '7',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '7'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '7'
  },],
  TOPIC5_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '8',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '8'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '8'
  },],
  TOPIC6_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '9',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '9'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '9'
  },],
  TOPIC7_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '10',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '10'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '10'
  },],
  TOPIC8_TITLE_and_kanji : [{
    title : 'KANJI_LIST',
    type : 'KL1',
    study : '11',
  },{
    title : 'FLASH_CARD',
    type : 'KL2',
    study : '11'
  },{
    title : 'EXPLAINATION',
    type : 'KL3',
    study : '11'
  },],
  };

  export const QuizListData = {
    hiragana_katakana :[
      {
          title : 'HIKA_ROMA',
          type  : 'moji_romaji'
      },
      {
          title : 'ROMA_HIKA',
          type  : 'romaji_moji'
      },
      {
          title : 'LISTEN',
          type  : 'audio_moji'
      }
    ],
    grammar :[
      {
        title : 'TRANSLATE_SENTENCE',
        type : 'english_moji',
      },{
        title : 'FLASH_CARD',
        type : 'audio_english',
      },
      {
        title : 'FILL_THE_BLANKS',
        type : 'fill',
      },
      {
        title : 'REARRANGE',
        type : 'arrange',
      }
    ],
    };