export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectErrorAuth = (state) => state.auth.error;
export const selectIsLoadingAuth = (state) => state.auth.isLoading;
export const selectToken = (state) => state.auth.token;
