import { STOCK_IN_ACTIONS_TYPE } from "../stock-in-store/stock-in-types";

const INITIAL_STOCKIN = {
    stockOuts: []
}

export const stockInReducer = (state = INITIAL_STOCKIN, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case STOCK_IN_ACTIONS_TYPE.FETCH_STOCK_IN_SUCCESS: {
            return { ...state, stockIns: payload }
        }
        default: {
            return state
        }
    }


}