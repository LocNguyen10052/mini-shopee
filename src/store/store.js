import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux'
import { rootReducer } from './root-reducer';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import { loggerMiddleware } from './logger/loggerMiddleWare';

const sagaMiddleware = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter(
    Boolean
);
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'carts', 'categories', 'products', 'orders', 'stockOuts', 'notifications', 'cartAdmins', 'stockIns'],

}
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistsReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(
    persistsReducer,
    undefined,
    composedEnhancers
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
