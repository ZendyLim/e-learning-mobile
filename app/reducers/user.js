import {DATA_AVAILABLE ,FETCH_USER , FETCH_USER_SUCCESS ,  FETCH_USER_FAILED , USER_REMOVE}  from '../lib/constants';

import{USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_UPDATE_SUCCESS} from '../lib/constants';

const initialState = { 
    guestID:'', 
    user: [], 
    loading: true,
    isFailed: false ,
    dataNew: [],
    nationality: '',
    school: '',
    isLogin:false,
    jwtToken:'',
    userID:'',
};
 
export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { 
                user: action.data, loading:false 
            });
            return state;
        case FETCH_USER:
            state = Object.assign({}, state, { 
                isFailed : false
            });
            return state;
        case FETCH_USER_SUCCESS:
            state = Object.assign({}, state, { 
                user: action.data, isFailed : false
            });
        case FETCH_USER_FAILED:
            state = Object.assign({}, state, { 
                isFailed : true
            });
            return state;   
        case USER_REMOVE:
            state = Object.assign({}, state, { 
                user: []
            });
            return state;    
        case "UpdateProfile":
        console.log('update',action.data);
            state = Object.assign({}, state, { 
                nationality: action.data.nationality,
                school: action.data.school
            });
            return state;    
        //USER LOGIN
        case USER_LOGIN_SUCCESS:
            state = Object.assign({}, state, { 
                isLogin : true
            });
            console.log(isLogin,"test login")
            return state;    
        case USER_LOGIN_FAILED:
            state = Object.assign({}, state, { 
                isLogin : false
            });
            console.log(isLogin,"test login failed")
            return state;
        case USER_UPDATE_SUCCESS:
            state = Object.assign({}, state, { 
                user: action.data,
            });
            return state;
        default:
            return state;
    }
}
 