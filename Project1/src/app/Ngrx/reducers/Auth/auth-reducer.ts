import { login, logout } from "../../actions/Auth/auth-action";
import { createReducer, on } from "@ngrx/store";

export const authFeatureKey = 'auth';

export interface AuthState {
    isLoggedIn: boolean;
    email: string | null;
    token: string | null; // Consider removing this
}

let storedAuth = null;
try {
    storedAuth = JSON.parse(localStorage.getItem(authFeatureKey) || 'null');
} catch (error) {
    console.error('Failed to parse auth state from local storage:', error);
}

export const initialState: AuthState = {
    isLoggedIn: storedAuth?.isLoggedIn || false,
    email: storedAuth?.email || null,
    token: storedAuth?.token || null,
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, { isLoggedIn, email, token }) => {
        const newState = {
            ...state,
            isLoggedIn,
            email,
            token // Consider only storing a token instead of token
        };
        localStorage.setItem(authFeatureKey, JSON.stringify(newState));
        return newState;
    }),
    on(logout, (state) => {
        const newState = {
            ...state,
            isLoggedIn: false,
            email: null,
            token: null // Consider removing this
        };
        localStorage.removeItem(authFeatureKey);
        return newState;
    })
);
