import { createReducer, on } from '@ngrx/store';
import { toggleSideBar } from '../../Action/SiderBar-Action/SideAction';

export interface SideState {
  isSideBarOpen: boolean;
}

export const initialState: SideState = {
  isSideBarOpen: 
    typeof window !== 'undefined' && localStorage.getItem('isSideBarOpen') 
      ? localStorage.getItem('isSideBarOpen') === 'true' 
      : false
};

// if not present in localStorage, set it to false
if (typeof window !== 'undefined' && localStorage.getItem('isSideBarOpen') === null) {
  localStorage.setItem('isSideBarOpen', 'false');
}

export const SideReducer = createReducer(
  initialState,
  on(toggleSideBar, (state, { isSideBarOpen }) => {
    // Don't mutate state directly, return a new object
    const updatedState = { ...state, isSideBarOpen };
    // Ensure localStorage is set to the current value of isSideBarOpen
    if (typeof window !== 'undefined') {
      localStorage.setItem('isSideBarOpen', isSideBarOpen.toString());
    }
    return updatedState;
  })
);
