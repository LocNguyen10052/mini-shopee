export const selectCurrentUser = (state) => state.user.currentUser;
export const selectLoadedUser = (state) => state.user.isLoaded;
export const selectRole = (state) => state.user.currentUser.role;