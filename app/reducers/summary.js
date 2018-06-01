import { SUMMARY_HOME  , SUMMARY_TEST , SUMMARY_QUIZ }  from '../lib/constants';

const initialState = { 
    dateFrom:'', 
    dateTo: '', 
    testData: [],
    quizData: []
};

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case SUMMARY_HOME:
            state = Object.assign({}, state, { 
                dateFrom:  new Date(action.data.dateFrom*1000),
                dateTo : new Date(action.data.dateTo*1000),
            });   
            return state;
        case SUMMARY_TEST:
            state = Object.assign({}, state, { 
                testData:  [],
                testData : action.data,
            });   
            return state;            
        case SUMMARY_QUIZ:
            state = Object.assign({}, state, { 
                quizData:  [],
                quizData : action.data,
            });   
            return state;            
        default:
            return state;
}
}
