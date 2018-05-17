import { combineReducers } from 'redux';
import  user  from './user';
import  study  from './study';

// Combine all the reducers
const rootReducer = combineReducers({
    user,
    study
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;