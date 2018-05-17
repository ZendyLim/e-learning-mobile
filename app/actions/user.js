import {FETCH_USER , FETCH_USER_SUCCESS ,  FETCH_USER_FAILED,  USER_REMOVE }  from '../lib/constants';

//================================   API FETCH ===================================
export function createUser(userValue){
    return (dispatch) => {
        fetch('http://www.mocky.io/v2/5af163c63100002a0096c946',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userValue)
        }).then(data => data.json())
        .then(json => {
          dispatch(fetchDataSuccess(json));
        })
        .catch(err => dispatch(fetchDataFailed(err)))
      };        
}

export function updateUser(userValue){
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
        dispatch(fetchDataSuccess(json));
      })
      .catch(err => dispatch(fetchDataFailed(err)))
    };        
}

export function deleteUserState(){
  return (dispatch) => {
      dispatch(deleteUserStateDispatch())
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
    data: data.data
  }
}
export function fetchDataFailed(error) {
  return {
    type: FETCH_USER_FAILED,
    error: error
  }
}

export function deleteUserStateDispatch() {;
  return {
    type: USER_REMOVE
  }
}