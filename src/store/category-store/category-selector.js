import { createSelector } from "reselect";

export const selectCategoriesReducer = (state) => state.categories.categoriesMap;
export const selectCategories = createSelector([selectCategoriesReducer], (catelogries) => {
    console.log("Selector fired 2 ")
    return catelogries
})


