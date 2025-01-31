import { createAction } from "../../utils/reducer/createAction";
import { ORDER_ACTIONS_TYPE } from "./order-type";

export const createOrderAction = (orders) =>
    createAction(ORDER_ACTIONS_TYPE.SET_ORDER, orders)
