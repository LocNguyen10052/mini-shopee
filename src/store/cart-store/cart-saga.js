import { all, call, put, takeLatest } from "redux-saga/effects";
import { CART_ACTIONS_TYPE } from "./cart-type";
import { addTocart } from "../../utils/firebase.cart";
import { createCartFailed, fetchCartSusscess } from "./cart-action";

export function* createCartSaga({ payload: { productID, userID } }) {
    try {
        yield call(addTocart, productID, userID)
    } catch (error) {
        yield put(createCartFailed(error));
    }
}

export function* fetchCartSaga({ payload }) {
    try {
        yield put(fetchCartSusscess, payload)
    } catch (error) {
    }
}
export function* onAddCart() {
    yield takeLatest(CART_ACTIONS_TYPE.ADD_CART_START, createCartSaga)
}
export function* onFetchCart() {
    yield takeLatest(CART_ACTIONS_TYPE.FETCH_CART_START, fetchCartSaga)
}
export function* cartSaga() {
    yield all([
        call(onAddCart),
        call(onFetchCart)]);
}