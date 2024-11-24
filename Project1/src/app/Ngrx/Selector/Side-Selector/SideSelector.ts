import { createSelector } from "@ngrx/store";
import { SideState } from "../../Reducer/SideBar-Reducer/SideReducer";
// import { AppState } from "../Login-Selector/LoginSelector";

export interface NavState {
    side: SideState;
}

// Select the sidebar state
export const selectSide = (state: NavState) => state.side.isSideBarOpen;

// Create a selector to get the sidebar open state
export const selectIsSideBarOpen = createSelector(
    selectSide, 
    (isSideBarOpen: boolean) => isSideBarOpen 
);
