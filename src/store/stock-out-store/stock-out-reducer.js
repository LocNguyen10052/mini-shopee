import { STOCK_OUT_ACTIONS_TYPE } from "./stock-out-types";

const INITIAL_STOCKOUT = {
    stockOuts: []
}

export const stockOutReducer = (state = INITIAL_STOCKOUT, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case STOCK_OUT_ACTIONS_TYPE.FETCH_STOCK_OUT_SUCCESS: {
            return { ...state, stockOuts: payload }
        }
        default: {
            return state
        }
    }
}