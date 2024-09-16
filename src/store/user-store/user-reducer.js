export const USER_ACTIONS_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
const INITIAL_VALUE = {
    currentUser: null
}
export const userReducer = (state = INITIAL_VALUE, action) => {
    const { type, payload } = action
    console.log(type)
    switch (type) {
        case USER_ACTIONS_TYPE.SET_CURRENT_USER:

            return { ...state, currentUser: payload }
        default:
            return state
    }
} 