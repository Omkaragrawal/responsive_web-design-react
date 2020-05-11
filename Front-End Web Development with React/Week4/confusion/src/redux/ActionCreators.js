import * as ActionTypes from './ActionTypes';
import {
    DISHES
} from '../shared/dishes';
import {
    baseUrl
} from '../shared/baseUrl';

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

export const fetchDishes = _ => dispatch => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
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

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});