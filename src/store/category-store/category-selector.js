import { createSelector } from "reselect";

export const selectCategoriesReducer = (state) => state.categories;
export const selectCategories = createSelector([selectCategoriesReducer], (categoriesSlice) => {
    return categoriesSlice.categoriesMap
})
export const selectIsloading = createSelector([selectCategoriesReducer], (categoriesSlice) => {
    return categoriesSlice.isLoading
})
