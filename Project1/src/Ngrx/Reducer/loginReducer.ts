import { createReducer, on } from "@ngrx/store";
import { login, logout } from "../Action/loginAction";

export interface LoginState {
  isLoggedIn: boolean;
  email: string | null;
  token: string | null;
}

export const initialState: LoginState = {
  isLoggedIn: localStorage.getItem('token') ? true : false,
  email: localStorage.getItem('email') || null,
  token: localStorage.getItem('token') || null
};

export const _loginReducer = createReducer(
  initialState,
  on(login, (state, { isLoggedIn, email, token }) => {
    // Set items in localStorage and return the new state
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    return { isLoggedIn, email, token };
  }),
  on(logout, (state) => {
    // Remove items from localStorage and return the reset state
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    return { isLoggedIn: false, email: null, token: null };
  })
);
