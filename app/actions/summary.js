import { SUMMARY_HOME , SUMMARY_TEST , SUMMARY_QUIZ  }  from '../lib/constants';
import { AsyncStorage } from 'react-native';


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
export function failedSummary(err){
}
