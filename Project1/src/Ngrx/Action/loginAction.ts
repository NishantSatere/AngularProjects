import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[login]', 
    props<{isLoggedIn:boolean, email:string, token:string}>()
)

export const logout = createAction(
    '[logout]'
)