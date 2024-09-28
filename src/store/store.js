import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import { rootReducer } from './root-reducer';
import { thunk } from "redux-thunk";
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares, thunk));


export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), undefined, composedEnhancers,);