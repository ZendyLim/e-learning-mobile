import { pointsList } from '../config/quizFormat';

export function countScore(studyRecord) {
    let score = 0;
    let countQuest = 0;
    var correct = 0;
    for(var i = 0; i < studyRecord.length; ++i) {
        if(studyRecord[i].correct == '1'){      
            correct += pointsList[studyRecord[i].type];
        }
        
        countQuest += pointsList[studyRecord[i].type];
    }

    if(countQuest !== 0 && correct !== 0){
        score = Math.floor(( correct / countQuest) * 100 );
    }

    return score;
}