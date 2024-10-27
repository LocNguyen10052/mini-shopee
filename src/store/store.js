// import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
// import { logger } from 'redux-logger'
// import { rootReducer } from './root-reducer';
// import { thunk } from "redux-thunk";



// const loggerMiddleware = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }

//     console.log('type: ', action.type);
//     console.log('payload: ', action.payload);
//     console.log('currentState: ', store.getState());

//     next(action);

//     console.log('next state: ', store.getState());
// };
// const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(
//     Boolean
// );
// const composeEnhancer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares, thunk));
// export const store = createStore(rootReducer, composedEnhancers);

import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { rootReducer } from './root-reducer';
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';


const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
};
const middleWares = [process.env.NODE_ENV === 'product' && loggerMiddleware].filter(
    Boolean
);
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'cart', 'product'],
}
const persistsReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares, thunk));
export const store = createStore(persistsReducer, composedEnhancers);
export const persistor = persistStore(store);
