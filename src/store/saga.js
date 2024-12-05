import { all, call } from 'redux-saga/effects'
import { categoriesSaga } from './category-store/category-saga'
import { userSaga } from './user-store/user-saga';
import { cartSaga } from './cart-store/cart-saga';
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga), call(cartSaga)]);
}