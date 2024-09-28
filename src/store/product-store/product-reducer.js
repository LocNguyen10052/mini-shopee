import { createProduct } from "../../utils/firebase.createproduct"

const INITIAL_PRODUCT = {
    product: null
}
export const PRODUCT_ACTIONS_TYPE = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    GET_PRODUCT: ' GET_PRODUCT'
}

export const productReducer = (state = INITIAL_PRODUCT, action) => {
    const { type, payload } = action
    const {
        categoryID,
        productCreate,
        image
    } = payload
    switch (type) {
        case PRODUCT_ACTIONS_TYPE.CREATE_PRODUCT:
            return createProduct(categoryID, productCreate, image)
        default:
            return state
    }
}