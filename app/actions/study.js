import { START_TIME_LEARN, END_TIME_LEARN ,LEARN_FAILED , TAKE_QUIZ  }  from '../lib/constants';

//================================   API FETCH ===================================

export function startLearn(studyType, startLearn, studyID){
    return (dispatch) => {
      dispatch(startLearnDispatch(studyType, startLearn, studyID))
    };        
}

export function endLearn(postValue){
  return (dispatch) => {
    fetch('https://e-learning-backend.herokuapp.com/api/v1/finishStudy',{
      method: 'POST',
      headers: {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjViMGI0ZWYzMjMwZjJmMjMyNjI3NjI4YSIsInJvbGUiOiJVU0VSIn0sImlhdCI6MTUyNzcyNjMwNywiZXhwIjoxNjg1NDI2MzA3fQ.jRQSMxc1AezfuTUFoHitSjQ74sDzUngArzQr8yTlhDM',
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