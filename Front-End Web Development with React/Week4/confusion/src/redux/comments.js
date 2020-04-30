import {
    COMMENTS
} from '../shared/comments';

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case "ADD_COMMENT": //case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString()
            console.log("Comment: ", comment);
            return state.concat(comment);

        default:
            return state;
    }
};