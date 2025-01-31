
import { createAction } from "../../utils/reducer/createAction"
import { CART_ADMIN_ACTIONS_TYPE } from "./cart-admin-type";

export const setAdminCart = (carts) =>
    createAction(CART_ADMIN_ACTIONS_TYPE.FETCH_CART_SUCCESS, carts);
export const setAdminCartFullDATA = (carts) =>
    createAction(CART_ADMIN_ACTIONS_TYPE.SET_CART_DATA_FULL, carts);


