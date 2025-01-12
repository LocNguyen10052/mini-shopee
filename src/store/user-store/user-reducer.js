export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
    GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILED: 'user/SIGN_IN_FAILED',
    SIGN_UP_START: 'user/SIGN_UP_START',
    SIGN_UP_SUCCESS: 'user/SIGN_UP_SUCCESS',
    SIGN_UP_FAILED: 'user/SIGN_UP_FAILED',
    SIGN_OUT_START: 'user/SIGN_OUT_START',
    SIGN_OUT_SUCCESS: 'user/SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILED: 'user/SIGN_OUT_FAILED',
    CHECK_USER_SESSION_ADMIN: 'admin/CHECK_USER_SESSION_ADMIN',
    EMAIL_SIGN_IN_START_ADMIN: 'admin/EMAIL_SIGN_IN_START_ADMIN'
}
const INITIAL_VALUE = {
    currentUser: null,
    isLoading: false,
    isLoaded: false,
    error: null,
}



export const userReducer = (state = INITIAL_VALUE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload, isLoaded: true };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, error: payload };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null, isLoaded: false };
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload, };
        default:
            return state;
    }
} 