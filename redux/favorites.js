import * as ActionTypes from './ActionTypes';

// store id of favorited campsites in state as an array
// adding new favorite will add new campsite id as the payload of ADD_FAVORITE
export const favorites = (state = [], action) => { // initialize state into empty array if it doesn't exist yet
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE:
            // check if campsite id already exists in state's array
            if (state.includes(action.payload)) {
                // .includes takes a single argument (action.payload) and checks to see if it matches anything in the array
                // return true or false
                return state
                // if campsite already exists in favorites array, return original state
            }
            return state.concat(action.payload)
            // else return new state with new favorited campsite id concatenated to end of array
            // .concat takes copy of array and add new item without mutating original array
        default:
            return state;
    }
};