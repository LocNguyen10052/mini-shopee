
import { listAllCategory } from '../../utils/firebase.utils';
import { createAction } from '../../utils/reducer/createAction'
import { CATEGORY_ACTIONS_TYPE } from "./category-reducer"

export const setCategories = (categories) =>
    createAction(CATEGORY_ACTIONS_TYPE.SET_CATEGORIES, categories)
export const getListCategories = async (dispatch) => {
    const categoriesData = await listAllCategory();
    dispatch(setCategories(categoriesData))
}
