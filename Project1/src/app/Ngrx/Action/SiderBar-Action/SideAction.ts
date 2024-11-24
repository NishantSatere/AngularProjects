import { createAction, props } from "@ngrx/store";

export const toggleSideBar = createAction(
    '[toggleSideBar]',
    props<{ isSideBarOpen: boolean }>()
)

export const removeSideState = createAction(
    '[removeSideState]'
)