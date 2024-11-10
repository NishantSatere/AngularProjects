import { createSelector } from "@ngrx/store";
import { LoginState } from "../Reducer/loginReducer";

export interface AppState {
    login: LoginState;
}

export const selectLogin = (state: {login: LoginState}) => state.login;

export const selectIsLoggedIn = createSelector(
    selectLogin,
    (state: LoginState) => state.isLoggedIn
)

// export const selectIsLoggedIn = createSelector(
//     selectLogin,
//     (state: loginState) => state.isLoggedIn
// )