import { addTocart, updateCart } from "../../utils/firebase.cart"
import { createAction } from "../../utils/reducer/createAction"
import { CART_ACTIONS_TYPE } from "./cart-type"


export const setCart = (carts) =>
    createAction(CART_ACTIONS_TYPE.FETCH_CART_SUCCESS, carts);

export const addToCartAction = async (data, userID) => {
    await addTocart(data, userID);
}

export const updateCartAction = async (cartID, type) => {
    await updateCart(cartID, type);
}

export const fetchCartStart = () => {
    return createAction(CART_ACTIONS_TYPE.FETCH_CART_START)
}

export const fetchCartFailure = (error) =>
    createAction(CART_ACTIONS_TYPE.FETCH_CART_FAILED, error)

export const fetchCartSusscess = (carts) =>
    createAction(CART_ACTIONS_TYPE.FETCH_CART_SUCCESS, carts)

export const createCartStart = (productID, userID) =>
    createAction(CART_ACTIONS_TYPE.ADD_CART_START, { productID, userID })

export const createCartFailed = (error) =>
    createAction(CART_ACTIONS_TYPE.ADD_CART_FAILD, error)

export const setProductsID = (productsID) =>
    createAction(CART_ACTIONS_TYPE.SET_PRODUCTSID, productsID)
export const setProductCartData = (productCartData) =>
    createAction(CART_ACTIONS_TYPE.SET_PRODUCT_CART_DATA, productCartData)
export const setCartData = (cartData) =>
    createAction(CART_ACTIONS_TYPE.SET_CART_DATA_FULL, cartData)
export const setCartDataFull = (cartData) =>
    createAction(CART_ACTIONS_TYPE.SET_CART_FULL, cartData)