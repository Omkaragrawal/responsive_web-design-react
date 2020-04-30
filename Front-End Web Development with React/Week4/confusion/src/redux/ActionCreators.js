//import {
//    ADD_COMMENT
//} from './ActionTypes' //import * as ActionTypes from './ActionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: 'ADD_COMMENT', //type: ActionTypes.ADD_COMMENT,
    payload: {
        "dishId": dishId,
        "rating": rating,
        "author": author,
        "comment": comment
    }
});