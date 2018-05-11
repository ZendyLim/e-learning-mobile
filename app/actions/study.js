import {FETCH_USER , FETCH_USER_SUCCESS ,  FETCH_USER_FAILED,  USER_REMOVE }  from '../lib/constants';

//================================   API FETCH ===================================

export function startLearn(dataStart){
    return (dispatch) => {
      dispatch(startLearnDispatch(dataStart))
    };        
}

export function finishLearn(dataAll){
    return (dispatch) => {
        fetch('http://www.mocky.io/v2/5af163c63100002a0096c946',{
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userValue)
        }).then(data => data.json())
        .then(json => {
          console.log('json:', json)
          dispatch(fetchDataSuccess(json));
        })
        .catch(err => dispatch(fetchDataFailed(err)))
      };        
  }
  

// ===================================== ACTION SENDING DATA TO REDUCER =================================================
export function startLearnDispatch(data) {
  return {
    type: START_LEARN_FETCH,
    data: data

  }
}

export function finishLearnDispatch() {
    return {
      type: FINISH_LEARN_FETCH,
      data: data
  
    }
  }
  export function finishLearnFailedDispatch() {
    return {
      type: FINISH_LEARN_FAILED,
      data: data
  
    }
  }