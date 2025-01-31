import { createAction } from "../../utils/reducer/createAction";
import { STOCK_IN_ACTIONS_TYPE } from "../stock-in-store/stock-in-types";
export const fetchStockInSusscess = (stockIns) =>
    createAction(STOCK_IN_ACTIONS_TYPE.FETCH_STOCK_IN_SUCCESS, stockIns)