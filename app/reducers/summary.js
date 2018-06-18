import { SUMMARY_HOME  , SUMMARY_TEST , SUMMARY_QUIZ , SUMMARY_ALL, SUMMARY_LEARN, SUMMARY_LOCK , SUMMARY_HISTORY}  from '../lib/constants';

const initialState = { 
    dateFrom:'', 
    dateTo: '', 
    testData: [],
    quizData: [],
    showLearn : [],
    lock : [],
    historyData : [],
    countSummary: []
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
        case SUMMARY_ALL: 
            state = Object.assign({}, state, { 
                countSummary: [],
                countSummary : action.data,
            });   
            return state;      
        case SUMMARY_LEARN:
            state = Object.assign({}, state, { 
                showLearn: [],
                showLearn : action.data,
            });   
            return state;                      
        case SUMMARY_LOCK:
            state = Object.assign({}, state, { 
                lock: [],
                lock : action.data,
            });   
            return state;      
        case SUMMARY_HISTORY:
            state = Object.assign({}, state, { 
                historyData: [],
                historyData : action.data,
            });   
            return state;                         
        default:
            return state;
}
}
