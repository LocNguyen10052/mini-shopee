
import { createAction } from '../../utils/reducer/createAction'
import { USER_ACTIONS_TYPE } from "./user-reducer";


export const setCurrentUser = (user) =>
    createAction(USER_ACTIONS_TYPE.SET_CURRENT_USER, user);
