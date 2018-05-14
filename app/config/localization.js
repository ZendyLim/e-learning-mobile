// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export let strings = new LocalizedStrings({
 en:{
   loginGuest: "Create Guest Account",
   HIRAGANA_TITLE: "Hiragana & Katakana Learn",
   NUMBER_TITLE : "Number Lesson",
   GREETING_TITLE : "Greeting Lesson",
   TOPIC1_TITLE : "Me & Family",
 },
 ja: {
   loginGuest: "japan",
   HIRAGANA_TITLE: "ひらがなとカタカナ勉強",
   NUMBER_TITLE : "数字勉強",
   GREETING_TITLE : "挨拶勉強",
   TOPIC1_TITLE : "私と家族",
}
});