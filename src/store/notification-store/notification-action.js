
import { createAction } from "../../utils/reducer/createAction"
import { NOTIFICATION_ACTIONS_TYPE } from "./notification-type";

export const setNotifications = (notification) =>
    createAction(NOTIFICATION_ACTIONS_TYPE.FETCH_NOTIFICATION_SUCCESS, notification);


