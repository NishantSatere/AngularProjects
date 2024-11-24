import { createReducer, on } from "@ngrx/store";
import { selectedPage } from "../../Action/SiderBar-Action/SelectedPageAction";

export interface SidePageState {
    selectedPage: string;
}

export const initialState: SidePageState = {
    selectedPage:  typeof window !== 'undefined' && localStorage.getItem('selectedPage') ||  "Dashboard" 
}

if(typeof window !== 'undefined' && localStorage.getItem('selectedPage')){
    localStorage.setItem('selectedPage', "Dashboard");
}

export const SelectePageReducer = createReducer(
    initialState,
    on(selectedPage, (state, { page }) => {
        const updatedState = { ...state, selectedPage: page };
        if(typeof window !== 'undefined'){
            localStorage.setItem('selectedPage', page);
        }
        return updatedState;
    })
)