import { combineReducers } from "redux";
import { userReducer } from './user-store/user-reducer'
import { categoryReducer } from "./category-store/category-reducer";
import { cartReducer } from "./cart-store/cart-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    carts: cartReducer
})