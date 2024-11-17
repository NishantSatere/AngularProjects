import { createSelector } from "@ngrx/store";
import { SidePageState } from "../../Reducer/SideBar-Reducer/SelectedPageReducer";

export interface SidePageStateGlobal {
    sidePage: SidePageState;
}

export const selectSidePage = (state: SidePageStateGlobal) => state.sidePage.selectedPage;

export const selectSelectedPage = createSelector(
    selectSidePage,
    (selectedPage: string) => selectedPage
)