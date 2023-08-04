import { createReducer, on } from "@ngrx/store";
import { changeDate } from "./date.actions";

const initialState = new Date();

export const dateReducer = createReducer (
    initialState,
    on(changeDate, (state, { date }) => date)
);