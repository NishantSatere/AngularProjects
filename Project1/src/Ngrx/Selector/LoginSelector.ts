import { createSelector } from "@ngrx/store";
import { LoginState } from "../Reducer/loginReducer";

export const selectLogin = (state: {login: any}) => state.login;

export const selectIsLoggedIn = createSelector(
    selectLogin,
    (state: LoginState) => state.isLoggedIn
)

// export const selectIsLoggedIn = createSelector(
//     selectLogin,
//     (state: loginState) => state.isLoggedIn
// )