import { START_TIME_LEARN, END_TIME_LEARN ,LEARN_FAILED , TAKE_QUIZ  }  from '../lib/constants';

//================================   API FETCH ===================================

export function startLearn(studyType, startLearn, studyID){
    return (dispatch) => {
      dispatch(startLearnDispatch(studyType, startLearn, studyID))
    };        
}

export function endLearn(postValue){

  return (dispatch) => {
    fetch('http://www.mocky.io/v2/5af163c63100002a0096c946',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postValue)
    }).then(data => data.json())
    .then(json => {
      dispatch(endLearnDispatch(postValue))
    })
    .catch(err => dispatch(endLearnFailedDispatch(err)))
  };        
}
export function takeQuiz(studyData){
  return (dispatch) => {
    dispatch(takeQuizDispatch(studyData))
  };        
}


// ===================================== ACTION SENDING DATA TO REDUCER =================================================
export function startLearnDispatch(studyType, startLearn, studyID) {
  return {
    type: START_TIME_LEARN,
    startLearn : startLearn,
    studyType: studyType,
    studyID: studyID,
  }
}

export function endLearnDispatch(studyType) {
  return {
     type: END_TIME_LEARN,
     endTime: studyType.endTime
  }
}
export function endLearnFailedDispatch(err) {
  return {
    type: LEARN_FAILED,
    err: err
  }
}  
export function takeQuizDispatch(studyData) {
  return {
    type: TAKE_QUIZ,
    studyRecord: studyData
  }
}