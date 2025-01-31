

const INITIAL_PRODUCT = {
    products: []
}
export const PRODUCT_ACTIONS_TYPE = {
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    GET_PRODUCT: ' GET_PRODUCT'
}

export const productReducer = (state = INITIAL_PRODUCT, action) => {
    const { type, payload } = action

    switch (type) {
        case PRODUCT_ACTIONS_TYPE.CREATE_PRODUCT:
            return { ...state, products: payload };
        default:
            return state;
    }
}