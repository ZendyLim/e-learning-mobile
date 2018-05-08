import {DATA_AVAILABLE ,FETCH_USER , FETCH_USER_SUCCESS ,  FETCH_USER_FAILED , USER_REMOVE}  from '../lib/constants';

const initialState = { 
    guestID:'', 
    user: [], 
    loading: true,
    isFailed: false 
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
        default:
            return state;
    }
}
 