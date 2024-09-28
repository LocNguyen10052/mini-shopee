import { createAction } from "../../utils/reducer/createAction";
import { PRODUCT_ACTIONS_TYPE } from "./product-reducer";

export const createProduct = (product) =>
    createAction(PRODUCT_ACTIONS_TYPE.CREATE_PRODUCT, product)
