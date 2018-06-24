import { SUMMARY_HOME , SUMMARY_TEST , SUMMARY_QUIZ , SUMMARY_ALL, SUMMARY_LEARN , SUMMARY_LOCK , SUMMARY_HISTORY}  from '../lib/constants';
import { AsyncStorage } from 'react-native';
import * as SummaryHelper from '../actions/summaryHelper';  

async function saveJWT(token){ 
  try {
    await AsyncStorage.setItem('@MySuperStore:jwtToken', token);
  } catch (error) {
    console.log(error);
  }
   
};

async function getJWT(){ 
    return  await AsyncStorage.getItem('@MySuperStore:jwtToken');
}
//================================   API FETCH ===================================

export function getAllRecord(){
    
    return (dispatch) => {
        getJWT().then( JWT => {
            fetch('https://e-learning-backend.herokuapp.com/api/v1/activities',{
              method: 'GET',
              headers: {
                'Authorization' : JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(data => data.json())
            .then(json => {   
                            
                SummaryHelper.setSummaryCount(json.activities.quiz, dataVal =>{
                    dispatch(summaryCountAllDispatch(dataVal))            
                }); 
            })
            .catch(err => dispatch(failedSummary(err)))
        })
    };    
    
     
}


export function getLockRecord(){
    return (dispatch) => {
        getJWT().then( JWT => {
            fetch('https://e-learning-backend.herokuapp.com/api/v1/lock',{
              method: 'GET',
              headers: {
                'Authorization' : JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(data => data.json())
            .then(json => {
                console.log('lock',json)
                dispatch(getLockDispatch(json))            
            })
            .catch(err => dispatch(failedSummary(err)))
        })
    };    
    
     
}


export function getSummaryRecord(type, topicId, categoryId, studyId){
    return (dispatch) => {
        getJWT().then( JWT => {
            fetch('https://e-learning-backend.herokuapp.com/api/v1/lastReview?type=' + type + '&topicId=' + topicId + '&categoryId='+ categoryId +'&studyId='+ studyId,{
              method: 'GET',
              headers: {
                'Authorization' : JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(data => data.json())
            .then(json => {
                if(type == 'QUIZ'){
                    dispatch(summaryRecordQuizDispatch(json, type))
                }else{
                    dispatch(summaryRecordTestDispatch(json, type))            
                }
            })
            .catch(err => dispatch(failedSummary(err)))
        })
    };    
    
     
}

export function getSummaryV2(topicId, categoryId, studyId){
    return (dispatch) => {
        getJWT().then( JWT => {
            fetch('https://e-learning-backend.herokuapp.com/api/v1/summaries?topicId=' + topicId + '&categoryId='+ categoryId,{
              method: 'GET',
              headers: {
                'Authorization' : JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(data => data.json())
            .then(json => {
                SummaryHelper.setSumary(json.activities, topicId, categoryId, data => {
                    dispatch(summaryShowLearn(data))
                });
            })
            .catch(err => dispatch(failedSummary(err)))
        })
    };         
}


export function getHistory(topicId, categoryId, studyId){
    console.log("running history");
    return (dispatch) => {
        getJWT().then( JWT => {
            console.log(JWT);

            fetch('https://e-learning-backend.herokuapp.com/api/v1/summaries?topicId=' + topicId + '&categoryId='+ categoryId,{
              method: 'GET',
              headers: {
                'Authorization' : JWT,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(data => data.json())
            .then(json => {
                dispatch(getHistoryDispatch(json))
            })
            .catch(err => dispatch(failedSummary(err)))
        })
    };         
}

export function getHomeSummary(studentID){
    return (dispatch) => {
        fetch('http://www.mocky.io/v2/5b06d14d2f00002b00c61f1b')
        .then(data => data.json())
        .then(json => {
          dispatch(setHomeSummary(json));
        })
        .catch(err => dispatch(getPeopleFailure(err)))
    }
}

// ===================================== ACTION SENDING DATA TO REDUCER =================================================
export function setHomeSummary(homeData){
    return {
        type: SUMMARY_HOME,
        data : homeData.data,
      }
    
}
export function summaryRecordTestDispatch(data, type){
    return {
        type: SUMMARY_TEST,
        data : data.data,
    }
    
}
export function summaryRecordQuizDispatch(data, type){
    return {
        type: SUMMARY_QUIZ,
        data : data.data,
    }  
}

export function summaryRecordV2(data){
    // return {
    //     type: SUMMARY_QUIZ,
    //     data : data.data,
    // }  
}
export function summaryCountAllDispatch(data){
        return {
            type: SUMMARY_ALL,
            data : data,
        }

}

export function summaryShowLearn(data){
    return {
        type: SUMMARY_LEARN,
        data : data,
    }

}

export function getLockDispatch(data){
    return {
        type: SUMMARY_LOCK,
        data : data.topics,
    }
}

export function getHistoryDispatch(data){
    return {
        type: SUMMARY_HISTORY,
        data : data.activities,
    }
}

export function failedSummary(err){
}
