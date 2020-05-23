import * as ActionTypes from './ActionTypes'
import { DISHES } from '../shared/dishes'
import { baseUrl } from '../shared/baseUrl'
import { Collapse } from 'reactstrap'

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
    

})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        comment: comment,
        author: author
        
    }
    newComment.date = new Date().toISOString()
    console.log("Post comment - " + JSON.stringify(newComment))

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip,beflate,br'
        },
        body: JSON.stringify(newComment),
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess
        })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post comments ', error.message)
        alert('Your comment could not be posted\n Error: ' + error.message)})

}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    //setTimeout(()=> {
    //    dispatch(addDishes(DISHES))
    //},2000)

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))

}

export const dishesLoading = () => ({
    type: ActionTypes.DISH_LOADING
})

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISH_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
        
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})


export const fetchPromos = () => (dispatch) => {
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})


export const fetchLeaders = () => (dispatch) => {
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADER_LOADING
})

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = {
        firstname: feedback.firstname,
        lastname: feedback.lastname,
        telnum: feedback.telnum,
        email: feedback.email,
        agree:feedback.agree,
        contactType:feedback.contactType,
        message:feedback.message
        
    }
    newFeedback.date = new Date().toISOString()
    console.log("Post comment - " + JSON.stringify(newFeedback))

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip,beflate,br'
        },
        body: JSON.stringify(newFeedback),
        credentials: "same-origin"
    }).then(response => {
        if (response.ok) {
            return response
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess
        })
    .then(response => response.json())
    .then(response => {
        console.log('Posted feedback ', JSON.stringify(response))
        alert("Thank you for your feedback!\n" + JSON.stringify(response))
    })
    .catch(error => {console.log('Post feedback ', error.message)
        alert('Your feedback could not be posted\n Error: ' + error.message)})

}