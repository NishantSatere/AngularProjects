import { createReducer, on } from "@ngrx/store";
import { toggleDrawer, setDrawerState } from "../../actions/siderbar/sidebar-action";

export const sidebarFeatureKey = 'sidebar';

export interface SidebarState {
    isOpen: boolean
}

export const intialState: SidebarState = {
    isOpen: JSON.parse(localStorage.getItem(sidebarFeatureKey) || 'null')?.isOpen || true
}


export const sidebarReducer = createReducer(
    intialState,
    on(toggleDrawer, state => {
        const newState = { ...state, isOpen: !state.isOpen };
        localStorage.setItem(sidebarFeatureKey, JSON.stringify(newState));
        return newState;
    }),
    on(setDrawerState, (state, { isOpen }) => {
        const newState = { ...state, isOpen }
        localStorage.setItem(sidebarFeatureKey, JSON.stringify(newState))
        return newState
    })
)