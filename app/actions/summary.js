import { SUMMARY_HOME  }  from '../lib/constants';

//================================   API FETCH ===================================

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
    console.log(homeData);
    return {
        type: SUMMARY_HOME,
        data : homeData.data,
      }
    
}