import { createSelector } from "@ngrx/store";
import { AuthState } from "../../reducers/Auth/auth-reducer";

export const selectAuthState = (state: any) => state.auth

export const selectedAuthState = createSelector(
    selectAuthState,
    (state: AuthState) => state
)

// export const selectIsLoggedIn = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.isLoggedIn
// );

// export const selectEmail = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.email
// );

// export const selectPassword = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.password
// );