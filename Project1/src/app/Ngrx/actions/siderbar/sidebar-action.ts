import { createAction, props } from '@ngrx/store';

export const toggleDrawer = createAction('[Sidebar] Toggle Drawer')
export const setDrawerState = createAction('[Sidebar] Set Drawer State', props<{ isOpen: boolean }>())