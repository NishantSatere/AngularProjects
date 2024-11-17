import { createAction, props } from "@ngrx/store";

export const selectedPage = createAction(
    '[Sidebar Component] Selected Page',
    props<{ page: string }>()
);