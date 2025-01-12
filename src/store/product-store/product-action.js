import { createAction } from "../../utils/reducer/createAction";
import { PRODUCT_ACTIONS_TYPE } from "./product-reducer";

export const createProductAction = (product) =>
    createAction(PRODUCT_ACTIONS_TYPE.CREATE_PRODUCT, product)
