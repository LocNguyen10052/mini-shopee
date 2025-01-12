// import { CART_ACTIONS_TYPE } from "./cart-type";

// const INITIAL_CART = {
//     carts: [],
//     error: null,
//     productID: []
// }


// export const cartReducer = (state = INITIAL_CART, action = {}) => {
//     const { type, payload } = action;

//     switch (type) {
//         case CART_ACTIONS_TYPE.FETCH_CART_SUCCESS: {
//             if (!state.carts.length) {
//                 return { ...state, carts: payload };
//             }
//             else {
//                 const newState = payload.map(cartItem => {
//                     const existingCart = state.carts.find(productCart => productCart.productID === cartItem.productID);
//                     return {
//                         ...existingCart,
//                         ...cartItem,
//                     };
//                 });
//                 return { ...state, carts: newState };
//             }
//         }
//         case CART_ACTIONS_TYPE.ADD_CART_FAILD: {
//             return { ...state, error: payload };
//         }
//         case CART_ACTIONS_TYPE.SET_PRODUCTSID: {
//             return { ...state, productID: payload };
//         }
//         default:
//             return state;
//     }
// };



import { CART_ACTIONS_TYPE } from "./cart-type";

const INITIAL_CART = {
    carts: [],
    productID: [],
    error: null,
    productCartData: [],
    CartDataFull: [],
    cartsFull: []
};

export const cartReducer = (state = INITIAL_CART, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS_TYPE.FETCH_CART_SUCCESS: {

            return { ...state, carts: payload };
        }
        case CART_ACTIONS_TYPE.ADD_CART_FAILED: {
            return { ...state, error: payload };
        }
        case CART_ACTIONS_TYPE.SET_PRODUCTSID: {
            return { ...state, productID: payload };
        }
        case CART_ACTIONS_TYPE.SET_PRODUCT_CART_DATA: {

            return { ...state, productCartData: payload };
        }
        case CART_ACTIONS_TYPE.SET_CART_DATA_FULL: {
            return { ...state, CartDataFull: payload };
        }
        case CART_ACTIONS_TYPE.SET_CART_FULL: {
            return { ...state, cartsFull: payload };
        }
        default:
            return state;
    }
};
