import { createSelector } from 'reselect';

export const selectCartReducer = (state) => {
    return state.carts
}

export const selectCartItems = createSelector(
    [selectCartReducer],
    (carts) => carts.carts
);

export const selectCartFull = createSelector(
    [selectCartReducer],
    (carts) => carts.cartsFull
);

export const selectCartItemsCount = createSelector([selectCartReducer], (carts) => {
    return carts.carts.length
})

export const selectCartItemsTotal = createSelector([selectCartReducer], (carts) => {
    const cartTotal = carts.CartDataFull.reduce((total, cart) => {
        if (!cart.ordered) {
            const { productPrice, quality } = cart;
            console.log(cart)
            return total + productPrice * quality;
        }
        else {
            return total;
        }
    }, 0)
    return cartTotal;
})
export const selectProductID = createSelector(
    [selectCartReducer],
    (carts) => carts.productID
);

export const selectCartProductData = createSelector(
    [selectCartReducer],
    (carts) => carts.productCartData
);
export const selectCartDataFull = createSelector(
    [selectCartReducer],
    (carts) => carts.CartDataFull
);