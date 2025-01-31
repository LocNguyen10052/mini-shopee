import { combineReducers } from "redux";
import { userReducer } from './user-store/user-reducer'
import { categoryReducer } from "./category-store/category-reducer";
import { cartReducer } from "./cart-store/cart-reducer";
import { productReducer } from "./product-store/product-reducer";
import { cartAdminReducer } from "./cart-admin-store/cart-admin-reducer";
import { orderReducer } from "./order-store/order-reducer";
import { notificationReducer } from "./notification-store/notification-reducer";
import { stockInReducer } from "./stock-in-store/stock-in-reducer";
import { stockOutReducer } from "./stock-out-store/stock-out-reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoryReducer,
    carts: cartReducer,
    products: productReducer,
    cartAdmins: cartAdminReducer,
    orders: orderReducer,
    stockOuts: stockOutReducer,
    notifications: notificationReducer,
    stockIns: stockInReducer
})