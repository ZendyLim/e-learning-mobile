import {FETCH_USER , FETCH_USER_SUCCESS ,  FETCH_USER_FAILED }  from '../lib/constants';
//================================   API FETCH ===================================
export function createUser(userValue){
    return (dispatch) => {
        fetch('http://www.mocky.io/v2/5af046b9310000690096c583')
        .then(data => data.json())
        .then(json => {
          console.log('json:', json)
          dispatch(SetDataSuccess(json));
        })
        .catch(err => dispatch(getPeopleFailure(err)))
      };        
}

export function updateUser(userValue){
  return (dispatch) => {
      fetch('http://www.mocky.io/v2/5af046b9310000690096c583')
      .then(data => data.json())
      .then(json => {
        console.log('json:', json)
        dispatch(SetDataSuccess(json));
      })
      .catch(err => dispatch(getPeopleFailure(err)))
    };        
}

// ===================================== ACTION SENDING DATA TO REDUCER =================================================
export function fetchData() {
  return {
    type: FETCH_USER,
  }
}

export function fetchDataSuccess(data) {
  return {
    type: FETCH_USER_SUCCESS,
    data: data.instructions,
    isFailed: false
  }
}
export function fetchDataFailed(error) {
  return {
    type: FETCH_USER_FAILED,
    error: error
  }
}

export function SetDataSuccess(data) {
    return {
      type: DATA_AVAILABLE,
      data: data.instructions
    }
  }

  export function getPeopleFailure(data) {
    return {
      type: DATA_AVAILABLE_FAILURE,
      data: ''
    }
  }