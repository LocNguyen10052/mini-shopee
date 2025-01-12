import { CART_ADMIN_ACTIONS_TYPE } from "./cart-admin-type";

const INITIAL_CART = {
    carts: [],
    CartDataFull: []
};

export const cartAdminReducer = (state = INITIAL_CART, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ADMIN_ACTIONS_TYPE.FETCH_CART_SUCCESS: {
            return { ...state, carts: payload };
        }
        case CART_ADMIN_ACTIONS_TYPE.SET_CART_DATA_SUCCESS: {
            return { ...state, cartsFull: payload };
        }
        default:
            return state;
    }
};
