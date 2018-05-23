import { DATA_AVAILABLE } from '../lib/constants';

export function getDataAPI(){
    return (dispatch) => {
        fetch('http://www.mocky.io/v2/5af16325310000550096c943')
        .then(data => data.json())
        .then(json => {
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
      type: DATA_AVAILABLE,
      data: ''
    }
  }