export const selectorNotification = (state) => state.notifications.notifications

export const selectorReadNotifications = (state) => {
    return state.notifications.notifications.filter(notification => notification.read === false).length;
};
