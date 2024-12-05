import { takeLatest, call, all, put } from "redux-saga/effects";
import { fetchCategoriesFailure, fetchCategoriesSusscess } from "./category-action";
import { listAllCategory } from "../../utils/firebase.utils";
import { CATEGORIES_TYPE_ACTIONS } from "./Category-types";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(listAllCategory, 'categories');
        yield put(fetchCategoriesSusscess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailure(error));
    }
}
export function* onFetchCategories() {

    yield takeLatest(
        CATEGORIES_TYPE_ACTIONS.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}
export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}