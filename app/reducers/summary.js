import { SUMMARY_HOME  }  from '../lib/constants';

const initialState = { 
    dateFrom:'', 
    dateTo: '', 
};

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case SUMMARY_HOME:
            state = Object.assign({}, state, { 
                dateFrom:  new Date(action.data.dateFrom*1000),
                dateTo : new Date(action.data.dateTo*1000),
            });   
            return state;
        default:
            return state;
}
}
