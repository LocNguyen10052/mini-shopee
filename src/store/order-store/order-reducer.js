import { ORDER_ACTIONS_TYPE } from "./order-type";



const INITIAL_ORDER = {
    orders: null
}
export const orderReducer = (state = INITIAL_ORDER, action) => {
    const { type, payload } = action

    switch (type) {
        case ORDER_ACTIONS_TYPE.SET_ORDER:
            return { ...state, orders: payload };
        default:
            return state;
    }
}