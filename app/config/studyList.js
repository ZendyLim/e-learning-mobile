export const StudyList = [{
    title : 'HIRAGANA_TITLE',
    img : 'class',
    lock : false,
    type : 'Initial',
    topic_id: 'T001',
    quizOptions: {
      random: true,
      types:['romaji_moji', 'moji_romaji','audio_moji','audio_romaji'],
      style:'quizSquared'
    }
  },
  {
    title : 'NUMBER_TITLE',
    img : 'number_chara',
    lock : false,
    type : 'Initial',
    topic_id: 'T002',
    quizOptions: {
      random: false,
      types:['moji_english', 'english_moji','audio_english','audio_moji'],
      withCorrection:true,
      style:'quizLong'
    }
  },
  {
    title : 'GREETING_TITLE',
    img : 'loading',
    lock : false,
    type : 'Initial',
    topic_id: 'T003',
    quizOptions: {
      random: true,
      types:['moji_english', 'english_moji','audio_english','audio_moji'],
      withCorrection:true,
      style:'quizLong'
    }
  },
  {
    title : 'TOPIC1_TITLE',
    img : 'me_family',
    lock : true,
    type : 'Topic',
    topic_id: 'T004'
  },
  {
    title : 'TOPIC2_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T005'
  },
  {
    title : 'TOPIC3_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T006'
  },{
    title : 'TOPIC4_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T007'
  },
  {
    title : 'TOPIC5_TITLE',
    img : 'office',
    lock : true,
    type : 'Topic',
    topic_id: 'T008'
  },
  {
    title : 'TOPIC6_TITLE',
    img : 'travel',
    lock : true,
    type : 'Topic',
    topic_id: 'T009'
  },
  {
    title : 'TOPIC7_TITLE',
    img : 'health',
    lock : true,
    type : 'Topic',
    topic_id: 'T010'
  },
  {
    title : 'TOPIC8_TITLE',
    img : 'market',
    lock : true,
    type : 'Topic',
    topic_id: 'T011'
  },
  {
    title : 'TOPIC9_TITLE',
    img : 'ramen_shop',
    lock : true,
    type : 'Topic',
    topic_id: 'T012'
  },
  {
    title : 'TOPIC10_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T013'
  },
  {
    title : 'TOPIC11_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T014'
  },
  {
    title : 'TOPIC12_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T015'
  },
  {
    title : 'TOPIC13_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T016'
  },
  {
    title : 'TOPIC14_TITLE',
    img :'society',
    lock : true,
    type : 'Topic',
    topic_id: 'T017'
  },
  {
    title : 'TOPIC15_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T018'
  },
  {
    title : 'TOPIC16_TITLE',
    img : 'loading',
    lock : true,
    type : 'Topic',
    topic_id: 'T019'
  },
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
    datatopic : 'Goi',
    config : 'mefamily'
  },{
    title : 'FLASH_CARD',
    type : 'GL3',
    study : '4'
  },
],  
TOPIC1_TITLE_and_grammar : [{
  title : 'BUNPO_LIST',
  type : 'BL1',
  study : '4',
  datatopic : 'Bunpo',
  config : 'mefamily'
},{
  title : 'FLASH_CARD',
  type : 'BL3',
  study : '4'
},
],
TOPIC1_TITLE_and_kanji : [{
  title : 'KANJI_LIST',
  type : 'KL1',
  study : '4',
  datatopic : 'Kanji',
  config : 'mefamily'
},{
  title : 'FLASH_CARD',
  type : 'KL3',
  study : '4'
},
],     
  };