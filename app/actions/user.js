import {FETCH_USER , FETCH_USER_SUCCESS ,  FETCH_USER_FAILED,  USER_REMOVE}  from '../lib/constants';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_UPDATE_SUCCESS} from '../lib/constants';
import { AsyncStorage } from 'react-native';


saveJWT = async (token) => { 
  try {
    await AsyncStorage.setItem('jwtToken', token);
  } catch (error) {
    console.log("Error saving data" + error);
  }
}

getJWT = async (callback) => { 
    const value = await AsyncStorage.getItem('jwtToken').then( data => {
      callback(data);
    });
}
//================================   API FETCH ===================================
export function createUser(userValue){
  return (dispatch) => {
      // fetch('http://www.mocky.io/v2/5af163c63100002a0096c946',{
      fetch('http://www.mocky.io/v2/5b0c41a53300002600b3ffae',{
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
      })
      .then(data => data.json())
      .then(json => {
        dispatch(fetchDataSuccess(json));
      })
      .catch(err => dispatch(fetchDataFailed(err)))
    };        
}

export function login(userValue,callback){
  return (dispatch) => {
      fetch('https://e-learning-backend.herokuapp.com/api/v1/login',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userValue)
        }).then(data  => {
          saveJWT(data.headers.map.authorization[0]);
          data.json()
          .then( json =>{
            callback(json);
            dispatch(fetchDataSuccess(json));          

            }
          )
        })  
      .catch(err => dispatch(userLoginFailed(err)))
  };        
}

export function deleteUserState(){
  return (dispatch) => {
      dispatch(deleteUserStateDispatch())
    };        
}

export function updateProfile(userVal){
  return (dispatch) => {
      dispatch(updateProfileSuccess(userVal))
    };        
}

export function getUserProfile(){
  return(dispatch) => {
    fetch('http://www.mocky.io/v2/5b06bf5c2f0000b118c61ed7')
    .then(data => data.json())
    .then(json => {
      dispatch(fetchDataSuccess(json));
    })
    .catch(err => dispatch(fetchDataFailed(err)))
  };
}

export function updateUserProfile(userValue){
  return(dispatch) => {
    fetch('',{
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uservalue)
    }).then(data => data.json())
    .then(json => {
      dispatch(fetchDataSuccess(json));
    })
    .catch(err => dispatch(fetchDataFailed(err)))
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
  console.log(error, 'errr');
  return {
    type: FETCH_USER_FAILED,
    error: error
  }
}

export function deleteUserStateDispatch() {
  return {
    type: USER_REMOVE
  }
}

export function updateProfileDispatch(userVal) {
  return {
    type: "UpdateProfile",
    data: userVal,
  }
}

export function userLoginSuccess(data){
  console.log(data.success,"kimakn kau");
  if(data.success){
    return{
      type: USER_LOGIN_SUCCESS,
      data: data,
    }
  }else{
    return{
      type: USER_LOGIN_FAILED,
      error: error,
    }
  }
}

export function updateProfileSuccess(userVal) {
  return {
    type: USER_UPDATE_SUCCESS,
    data: userVal,
  }
}

export function userLoginFailed(error){
  return{
    type: USER_LOGIN_FAILED,
    error: error,
  }
}