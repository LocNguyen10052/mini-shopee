import { createAction } from "../../utils/reducer/createAction";
import { STOCK_OUT_ACTIONS_TYPE } from "./stock-out-types";

export const fetchStockOutSusscess = (stockOuts) =>
    createAction(STOCK_OUT_ACTIONS_TYPE.FETCH_STOCK_OUT_SUCCESS, stockOuts)