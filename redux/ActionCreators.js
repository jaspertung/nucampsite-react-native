import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
// using ip address from baseUrl file

// comments action creators
export const fetchComments = () => dispatch => {
    // fetchComments action creator wrapping action creator in another function so thunk middleware will stop dispatch from going to reducer
    // instead sends async request to server in baseUrl file using fetch
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
        // actions depend on if promise comes back or not
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
// non-thunk action creator functions

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// adding new comment action creators
export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId,
        rating,
        author,
        text
    }
    newComment.date = new Date().toISOString() //don't put method in newComment (refresh often)
    setTimeout(() => {
        dispatch(addComment(newComment))
    }, 2000)
}

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

// campsites action creators
export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

// promotions action creators
export const fetchPromotions = () => dispatch => {
    
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});


// partners action creators
export const fetchPartners = () => dispatch => {
    
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

// favorites action creators
export const postFavorite = campsiteId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(campsiteId))
    }, 2000)
} //thunked

export const addFavorite = campsiteId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: campsiteId
})

export const deleteFavorite = campsiteId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: campsiteId
})