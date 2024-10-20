import { createAction , props } from "@ngrx/store";

export const login = createAction('[Auth] Login', props<{isLoggedIn : boolean, email : string , token: string}>())
export const logout = createAction('[Auth] Logout' , props<{isLoggedIn : boolean}> ())
