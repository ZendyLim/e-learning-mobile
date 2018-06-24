export const quizFormat = {

};

export const pointsList = {
    'initial': 2,
    'vocabulary': 2,
    'kanji': 2,
    'grammar': 2,
    'reading': 5,
    'listening': 5
};
//types:['romaji_moji', 'moji_romaji','audio_moji','audio_romaji'],
//types:['english_moji','audio_english','audio_moji'],
// types:['english_moji','english_fill','audio_english','audio_fill'],      
//types:['english_moji','audio_english','fill','arrange'],
//types:['kanji_moji','kanji_fill','kanji_english','audio_kanji','moji_kanji'],
export const studyType = {
    hiragana:{ // for hiragana and katakana
        romaji_moji:'HQ1',
        moji_romaji:'HQ2',
        audio_moji:'HQ3',
    },
    initial:{ // for number and aisatsu
        english_moji:'IQ1',
        english_fill:'IQ2',
        audio_moji:'IQ3',
        audio_fill:'IQ4'
    },
    vocabulary:{ // topic 1 to 8
        english_moji:'GQ1',
        english_fill:'GQ2',
        audio_english:'GQ3',
        audio_fill:'GQ4'
    },
    grammar:{ // topic 1 to 8
        english_moji:'BQ1',
        audio_english:'BQ2',
        fill:'BQ3',
        arrange:'BQ4',
    },
    kanji:{ // topic 1 to 8
        kanji_moji:'KQ1',
        kanji_fill:'KQ2',
        kanji_english:'KQ3',
        audio_kanji:'KQ4',
        moji_kanji:'KQ5',
    },
    listening:{ // topic 1 to 8
        audio_moji:'LQ1',
    },
    reading:{ // topic 1 to 8
        moji:'RQ1',
    }
};