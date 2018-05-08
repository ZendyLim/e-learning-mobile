import { combineReducers } from 'redux';
import  user  from './user';

// Combine all the reducers
const rootReducer = combineReducers({
    user
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;