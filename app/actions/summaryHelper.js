import  { quizItems } from '../config/quiz/index';
import  { StudyList } from '../config/studyList';
import { localization } from './user';

export function countInitialData(type){
    var count = StudyList.length;
    var total = 0;
    for (var i = 0; i < count; i++){
        if(type == StudyList[i]['type']){
            total += quizItems[StudyList[i]['title']].length
        }else{
            if(quizItems[StudyList[i]['title'] + "_and_" + type]){
                total += quizItems[StudyList[i]['title'] + "_and_" + type].length
            }
        }
    }
    return total;
}

export function setSummaryCount(data, callback){
    var count = data.length;
    var initialArr = [];
    var vocabularyArr = [];
    var grammarArr = [];
    var kanjiArr = [];
    for(var i = 0; i < count; i++){
        var countQues = data[i]['questions'].length;
        for(var y = 0; y < countQues; y++){
            if(data[i]['questions'][y]['type'] == 'INITIAL' && data[i]['questions'][y]['correct'] == true ){
                if(initialArr.indexOf(data[i]['questions'][y]['questionID']) == -1){
                    initialArr.push(data[i]['questions'][y]['questionID']);
                }
            }else if(data[i]['questions'][y]['type'] == 'VOCABULARY'  && data[i]['questions'][y]['correct'] == true){
                if(vocabularyArr.indexOf(data[i]['questions'][y]['questionID']) == -1){
                    vocabularyArr.push(data[i]['questions'][y]['questionID']);
                }
            }else if(data[i]['questions'][y]['type'] == 'GRAMMAR'  && data[i]['questions'][y]['correct'] == true){
                if(grammarArr.indexOf(data[i]['questions'][y]['questionID']) == -1){
                    grammarArr.push(data[i]['questions'][y]['questionID']);
                }
            }else if(data[i]['questions'][y]['type'] == 'KANJI'  && data[i]['questions'][y]['correct'] == true){
                if(kanjiArr.indexOf(data[i]['questions'][y]['questionID']) == -1){
                    kanjiArr.push(data[i]['questions'][y]['questionID']);
                }
            }
        }
    }
    var parseValue = {
        VOCABULARY : vocabularyArr.length,
        GRAMMAR : grammarArr.length,
        KANJI : kanjiArr.length,
        
    }
    console.log(parseValue,'check New');
    callback(parseValue); 
}

export function setSumary(data, topicId, categoryId, callback){
    var itemList = [];
    var index = -1;
    var countData = StudyList.length;
    var indexing = [];
    for(var i = 0; i < countData; i++){
        if(StudyList[i]['topic_id'] == topicId){
            index = i;
        }
    }
    var dataSet = [];
    if(index < 3){
        if(quizItems[StudyList[index]['title']]){
            dataSet = quizItems[StudyList[index]['title']];
            var countQuiz = dataSet.length;
            for(var i = 0; i < countQuiz; i++){
                var itemsSet = {
                    questionID : dataSet[i]['id'],
                    title : dataSet[i]['moji'],
                    correct : 0,
                    total : 0
                }
                indexing.push( dataSet[i]['id']);
                itemList.push(itemsSet);
            }    
        }
    }else{
        if(categoryId.substring(4,8) == 'C001'){
            if(quizItems[StudyList[index]['title'] +"_and_vocabulary"]){
                dataSet = quizItems[StudyList[index]['title'] +"_and_vocabulary"];
                var countQuiz = dataSet.length;
                for(var i = 0; i < countQuiz; i++){
                    var itemsSet = {
                        questionID : dataSet[i]['id'],
                        title : dataSet[i]['moji'],
                        correct : 0,
                        total : 0
                    }
                    indexing.push( dataSet[i]['id']);
                    itemList.push(itemsSet);
                }
    
            }
        }else if(categoryId.substring(4,8) == 'C002'){
            if(quizItems[StudyList[index]['title'] +"_and_grammar"]){
                dataSet = quizItems[StudyList[index]['title'] +"_and_grammar"];
                var countQuiz = dataSet.length;
                for(var i = 0; i < countQuiz; i++){
                    var itemsSet = {
                        questionID : dataSet[i]['id'],
                        title : dataSet[i]['moji'],
                        correct : 0,
                        total : 0
                    }
                    indexing.push( dataSet[i]['id']);
                    itemList.push(itemsSet);
                }                
            }
        }else if(categoryId.substring(4,8) == 'C003'){
            if(quizItems[StudyList[index]['title'] +"_and_kanji"]){
                dataSet = quizItems[StudyList[index]['title'] +"_and_kanji"];
                var countQuiz = dataSet.length;
                for(var i = 0; i < countQuiz; i++){
                    var itemsSet = {
                        questionID : dataSet[i]['id'],
                        title : dataSet[i]['moji'],
                        correct : 0,
                        total : 0
                    }
                    indexing.push( dataSet[i]['id']);
                    itemList.push(itemsSet);
                }
    
    
            }
        }
    }

    var countAct = data.length;
    for(var i = 0; i < countAct; i++){
        countInside = data[i]['questions'].length;
        for(var y = 0; y < countInside; y++){
            var index = indexing.indexOf(data[i]['questions'][y]['questionID']);
            itemList[index]['total'] += 1;
            if(data[i]['questions'][y]['correct'] == true){
                itemList[index]['correct'] += 1;
            } 
        }
    }
    callback(itemList);
}