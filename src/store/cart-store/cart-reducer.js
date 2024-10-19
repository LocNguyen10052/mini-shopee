import { listAllCategory } from "../../utils/firebase.utils";
import { CART_ACTIONS_TYPE } from "./cart-type";

const INITIAL_CART = {
    carts: []
}

export const cartReducer = (
    state = INITIAL_CART,
    action = {}
) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTIONS_TYPE.SET_CART: {
            return { ...state, carts: payload };
        }

        default:
            return state;
    }
};
