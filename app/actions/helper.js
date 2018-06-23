import { pointsList } from '../config/quizFormat';

export function countScore(studyRecord,quizItems = 0, byPoint = false) {    
    let score = 0;
    let countQuest = 0;
    var correct = 0;
    for(var i = 0; i < studyRecord.length; ++i) {
        if(studyRecord[i].correct == '1'){      
            if(studyRecord[i].type){
                correct += pointsList[studyRecord[i].type.toLowerCase()];
            }else{                
                correct += pointsList['initial'];
            }
        }        
        if(studyRecord[i].type ){
            countQuest += pointsList[studyRecord[i].type.toLowerCase()];
        }else{
            countQuest += pointsList['initial'];            
        }
    }
    
    if(quizItems && !byPoint){
        countQuest = 100;
    }
    else{
        countQuest = quizItems * 2;
    }

    if(countQuest !== 0 && correct !== 0){
        score = Math.floor(( correct / countQuest) * 100 );
    }

    return score;
}