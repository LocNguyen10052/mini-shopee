import { useSelector } from "react-redux"
import { addTocart, deleteCart, getCart, getCartSnapShoot, removeCart } from "../../utils/firebase.cart"
import { createAction } from "../../utils/reducer/createAction"
import { CART_ACTIONS_TYPE } from "./cart-type"
import React from "react";

export const setCart = (carts) =>
    createAction(CART_ACTIONS_TYPE.SET_CART, carts)
export const addToCartAction = async (dispatch, data) => {
    const { productID, userID } = data
    await addTocart(productID, userID)
}
export const deleteCartAction = async (dispatch, data) => {
    const { productID, userID } = data
    await deleteCart(productID, userID)
}
export const removeCartAction = async (dispatch, data) => {
    const { productID, userID } = data
    await removeCart(productID, userID)
}
export const getCartCartAction = async (dispatch, userEmail) => {
    await getCartSnapShoot(userEmail, dispatch)
}