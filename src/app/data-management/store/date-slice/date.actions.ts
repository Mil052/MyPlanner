import { createAction, props } from "@ngrx/store";

export const changeDate = createAction (
    'Change Date',
    props<{date: Date}>()
);