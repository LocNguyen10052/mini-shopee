import { all, call, put, takeLatest } from "redux-saga/effects";
import { PRODUCT_ACTIONS_TYPE } from "./product-reducer";
import { findAllProductByCategoryID } from "../../utils/firebase.createproduct";
import { createAction } from "@reduxjs/toolkit";

export function* fetchProduct(categoryID) {
    const products = findAllProductByCategoryID(categoryID)
    yield put(createAction(GET_PRODUCT, products))
}
export function* onProductFetch() {
    yield takeLatest(PRODUCT_ACTIONS_TYPE.GET_PRODUCT, fetchProduct)
}

export function* productSaga() {
    yield all([]);
}