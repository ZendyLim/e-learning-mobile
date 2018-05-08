import DATA_AVAILABLE from '../lib/constants';

export function getDataAPI(){
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