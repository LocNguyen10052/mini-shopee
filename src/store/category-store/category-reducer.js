import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES_TYPE_ACTIONS } from "./Category-types";

const INITIAL_CATEGORIES = {
    categoriesMap: []
}

// export const categoriySlice = createSlice({
//     name: 'categories',
//     initialState: INITIAL_CATEGORIES,
//     setCategories(state, action) {

//     }
// })
// export const { setCategories } = categoriySlice.actions
export const categoryReducer = (
    state = INITIAL_CATEGORIES,
    action = {}
) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_TYPE_ACTIONS.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_TYPE_ACTIONS.FETCH_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categoriesMap: payload };
        default:
            return state;
    }
};
