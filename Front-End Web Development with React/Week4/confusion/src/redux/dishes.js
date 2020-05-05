import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    isLoading: true,
    dishes:[],
    errMsg:null
}, action) => {
    switch (action.type) {
        // case "ADD_DISH":
        // let dish = action.payload;
        case ActionTypes.ADD_DISHES:
            return {isLoading: false, dishes: action.payload, errMsg: null}
        case ActionTypes.DISHES_FAILED:
            return {isLoading: false, dishes:[], errMsg: action.payload}
        case ActionTypes.DISHES_LOADING:
            return {isLoading: true, dishes: [], errMsg: null}
        default:
            return state;
    }
};