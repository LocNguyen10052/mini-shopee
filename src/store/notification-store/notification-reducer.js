import { NOTIFICATION_ACTIONS_TYPE } from "./notification-type";

const INITIAL_NOTIFICATION = {
    notifications: [],
};

export const notificationReducer = (state = INITIAL_NOTIFICATION, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case NOTIFICATION_ACTIONS_TYPE.FETCH_NOTIFICATION_SUCCESS: {
            return { ...state, notifications: payload };
        }
        default:
            return state;
    }
};
