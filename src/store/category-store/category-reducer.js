export const CATEGORY_ACTIONS_TYPE = {
    SET_CATEGORIES: 'SET_CATEGORIES'
}

const INITIAL_CATEGORIES = {
    categoriesMap: []
}

export const categoryReducer = (
    state = INITIAL_CATEGORIES,
    action = {}
) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORY_ACTIONS_TYPE.SET_CATEGORIES:
            return { ...state, categoriesMap: payload };
        default:
            return state;
    }
};
