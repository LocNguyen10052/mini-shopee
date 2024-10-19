import { createSelector } from 'reselect';

export const selectCartReducer = (state) => {
    return state.carts.carts
}

export const selectCartItems = createSelector([selectCartReducer], (carts) => carts)
