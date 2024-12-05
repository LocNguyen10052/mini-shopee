import { CART_ACTIONS_TYPE } from "./cart-type";

const INITIAL_CART = {
    carts: [],
    error: null
}


export const cartReducer = (state = INITIAL_CART, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS_TYPE.FETCH_CART_SUCCESS: {
            if (!state.carts.length) {
                return { ...state, carts: payload };
            }
            else {
                const newState = payload.map(cartItem => {
                    const existingCart = state.carts.find(productCart => productCart.productID === cartItem.productID);
                    return {
                        ...existingCart,
                        ...cartItem,
                    };
                });
                return { ...state, carts: newState };
            }
        }
        case CART_ACTIONS_TYPE.ADD_CART_FAILD: {
            return { ...state, error: payload };
        }
        default:
            return state;
    }
};



