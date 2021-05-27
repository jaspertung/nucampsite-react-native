import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

// setting configuration values
const config = {
    // 1st property (required) --string value of root
    key: 'root',
    // 2nd property (required) --storage object from import (default: local storage)
    storage,
    // 3rd property (optional) --causes redux persist to console log messages to debug issues
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        //combineReducers({

        // now persistCombineReducers handles updating state to local storage whenever reducer is used to update redux store
        persistCombineReducers(config, {
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)
    // enables store to be persisted and use persistor in app.js

    return { persistor, store }; //add persistor to be able to access both from app.js
}

// importing redux middlewares thunk and logger
// combines all the reducers (campsites, comments, partners, promotions) into a single root reducer
// then enable thunk and logger