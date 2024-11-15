import { createSelector } from "@ngrx/store";
import { LoginState } from "../../Reducer/Login-Reducer/loginReducer";

export interface AppState {
    login: LoginState;
}

export const selectLogin = (state: {login: LoginState}) => state.login;

export const selectIsLoggedIn = createSelector(
    selectLogin,
    (state: LoginState) => state.isLoggedIn
)
