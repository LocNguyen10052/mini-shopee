import { createAction } from '../../utils/reducer/createAction'

import { CATEGORIES_TYPE_ACTIONS } from './Category-types';

export const fetchCategoriesStart = () => {
    return createAction(CATEGORIES_TYPE_ACTIONS.FETCH_CATEGORIES_START)
}
export const fetchCategoriesFailure = (error) =>
    createAction(CATEGORIES_TYPE_ACTIONS.FETCH_CATEGORIES_FAILED, error)
export const fetchCategoriesSusscess = (categories) =>
    createAction(CATEGORIES_TYPE_ACTIONS.FETCH_CATEGORIES_SUCCESS, categories)
