import { createReducer, on } from "@ngrx/store";
import { login, logout } from "../../Action/Login-Action/loginAction";

export interface LoginState {
  isLoggedIn: boolean;
  email: string | null;
  token: string | null;
}

export const initialState: LoginState = {
  isLoggedIn: typeof window !== 'undefined' && localStorage.getItem('token') ? true : false,
  email: typeof window !== 'undefined' ? localStorage.getItem('email') || null : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') || null : null
};


export const _loginReducer = createReducer(
  initialState,
  on(login, (state, { isLoggedIn, email, token }) => {
    // Set items in localStorage and return the new state
    // localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    // localStorage.setItem('email', email);
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
