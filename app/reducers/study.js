import {START_TIME_LEARN ,END_TIME_LEARN , LEARN_FAILED , TAKE_QUIZ, MISTAKES}  from '../lib/constants';

const initialState = { 
    startTime:'', 
    endTime: '', 
    studyType: '',
    studyID: '',
    studyRecord: [] ,
    err: '',
    isErr: false,
    fukushu: true,
    quizSize: 0,
    fukushuMistakes:[]
};
 
export default function userReducer (state = initialState, action) {
    switch (action.type) {
        
        case START_TIME_LEARN:
        console.log(action);
            state = Object.assign({}, state, { 
                studyType: action.studyType,
                startTime : action.startLearn,
                studyID : action.studyID,
                endTime: '',
                studyRecord: [],
                quizSize : action.quizSize,
                isErr: false,
        });   

        return state;
        case END_TIME_LEARN:
        state = Object.assign({}, state, { 
            endTime: action.endTime,
            isErr: false,
        });   
        return state;
        case LEARN_FAILED:
        state = Object.assign({}, state, { 
            isErr: true,
            err: action.err,
        });  
        return state;
        case TAKE_QUIZ:
        state = Object.assign({}, state, { 
            studyRecord: [].concat(state.studyRecord, [action.studyRecord])
        });
        case MISTAKES:
        console.log(action);
        state = Object.assign({}, state, { 
            fukushuMistakes: [].concat(state.fukushuMistakes, [action.mistakes])
        });   
        return state;
        default:
            return state;
    }
}
 