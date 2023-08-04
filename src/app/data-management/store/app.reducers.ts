import { ActionReducerMap, createSelector } from "@ngrx/store";

import { Task } from "../data-models/task.model";
import { tasksReducer } from "./tasks-slice/tasks.reducer";
import { Note } from "../data-models/note.model";
import { notesReducer } from "./notes-slice/notes.reducer";
import { dateReducer } from "./date-slice/date.reducer";

export interface AppState {
    date: Date,
    tasks: {[id: string]: Task},
    notes: {[id: string]: Note};
}

// Selectors:
export const selectDate = (state: AppState) => state.date;
export const selectTasks = (state: AppState) => state.tasks;
export const selectTaskById = (selectedId: string) => 
    createSelector (
        selectTasks,
        (state: {[id: string]: Task}) => state[selectedId]
    );
export const selectTasksIds = createSelector (
    selectTasks,
    state => Object.keys(state)
);
export const selectNotes = (state: AppState) => state.notes;
export const selectNoteById = (selectedId: string) => 
    createSelector (
        selectNotes,
        (state: {[id: string]: Note}) => state[selectedId]
    );
export const selectNotesIds = createSelector (
    selectNotes,
    state => Object.keys(state)
);

// https://ngrx.io/api/store/ActionReducerMap !!! second parameter is also important in strict mode!!!
export const appReducersMap: ActionReducerMap<AppState, any> = {
    date: dateReducer,
    tasks: tasksReducer,
    notes: notesReducer
};