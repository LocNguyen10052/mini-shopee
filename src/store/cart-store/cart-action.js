import { addTocart, getCart } from "../../utils/firebase.cart"
import { createAction } from "../../utils/reducer/createAction"
import { CART_ACTIONS_TYPE } from "./cart-type"

export const setCart = (carts) =>
    createAction(CART_ACTIONS_TYPE.SET_CART, carts)
export const addToCartAction = async (dispatch, data) => {
    const { productID, userID } = data
    await addTocart(productID, userID)
    const carts = await getCart(userID)

    return dispatch(setCart(carts))
}