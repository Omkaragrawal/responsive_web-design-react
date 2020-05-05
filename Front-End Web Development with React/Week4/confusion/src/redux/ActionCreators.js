//import {
//    ADD_COMMENT
//} from './ActionTypes' 
import * as ActionTypes from './ActionTypes';
import {
    DISHES
} from '../shared/dishes';


export const addComment = (dishId, rating, author, comment) => ({
    //type: 'ADD_COMMENT', 
    type: ActionTypes.ADD_COMMENT,
    payload: {
        "dishId": dishId,
        "rating": rating,
        "author": author,
        "comment": comment
    }
});

export const fetchDishes = _ => dispatchEvent => {
    dispatchEvent(dishesLoading(true));

    setTimeout(_ => {
        dispatchEvent(addDishes(DISHES));
    }, 5e3);
};

export const dishesLoading = _ => ({
    type: ActionTypes.DISHES_LOADING
});

export const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesFailed = errMsg => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
});

// export const addDish = (dishName, dishImg, dishCategory, dishLabel, dishPrice, isFeatured, dishDescription) => ({
//     type: 'ADD_DISH',
//     payload: {
//         "dishName": dishName,
//         "dishImg": dishImg, 
//         "dishCategory": dishCategory, 
//         "dishLabel": dishLabel, 
//         "dishPrice": dishPrice, 
//         "isFeatured": isFeatured, 
//         "dishDescription": isFeatured
//     }
// })