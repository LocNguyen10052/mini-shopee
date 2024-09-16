import { combineReducers } from "redux";
import { userReducer } from './user-store/user-reducer'
import { categoryReducer } from "./category-store/category-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer
})