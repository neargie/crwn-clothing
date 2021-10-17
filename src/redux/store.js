import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';

import rootReducer from './root.reducer'
import {persistStore} from "redux-persist";

const middleware = [];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));

// store data into storage (related file to configure are store.js, root.reducer.js, index.js)
export const persistor = persistStore(store);
