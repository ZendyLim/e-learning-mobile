import { combineReducers } from 'redux';
import  user  from './user';
import  study  from './study';
import  summary  from './summary';

// Combine all the reducers
const rootReducer = combineReducers({
    user,
    study,
    summary
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;