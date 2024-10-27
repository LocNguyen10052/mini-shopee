import { createSelector } from 'reselect';

export const selectCartReducer = (state) => {
    return state.carts.carts
}

export const selectCartItems = createSelector([selectCartReducer], (carts) => carts)
export const selectCartItemsCount = createSelector([selectCartReducer], (carts) => {
    return carts.length
})
export const selectCartItemsTotal = createSelector([selectCartReducer], (carts) => {
    const cartTotal = carts.reduce((total, cart) => {
        const { productPrice, quality } = cart

        return total + productPrice * quality
    }, 0)

    return cartTotal
})