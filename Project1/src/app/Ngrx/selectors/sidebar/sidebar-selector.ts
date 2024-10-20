import { createSelector } from "@ngrx/store";
import { SidebarState } from "../../reducers/sidebar/siderbar-reducer";

export const seletSidebarState = (state: any) => state.sidebar

export const selectedIsDrawerOpen = createSelector (
    seletSidebarState,
    (state : SidebarState) => state.isOpen
)