import * as ActionTypes from './ActionTypes';
export const Leaders = (state = {
        isLoading: true,
        leaders: [],
        errMsg: null
    }, action) => {
    switch (action.type) {
         case ActionTypes.ADD_LEADERS:
             return {
                 isLoading: false,
                 leaders: action.payload,
                 errMsg: null
             }
         case ActionTypes.LEADERS_FAILED:
             return {
                 isLoading: false,
                 leaders: [],
                 errMsg: action.payload
             }
         case ActionTypes.LEADERS_LOADING:
             return {
                 isLoading: true,
                 leaders: [],
                 errMsg: null
             }
        default:
            return state;
    }
};