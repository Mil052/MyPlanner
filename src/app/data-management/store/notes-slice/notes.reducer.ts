import { createReducer, on } from "@ngrx/store";
import { Note } from "../../data-models/note.model";
import { setNotes, addNoteToStore, deleteNoteFromStore } from "./notes.actions";

const initialState: {[id: string]: Note} = {};

export const notesReducer = createReducer (
    initialState,
    on(setNotes, (state,  { notes } ) => notes),
    on(addNoteToStore, (state, { id, note }) => ({...state, [id]: note})),
    on(deleteNoteFromStore, (state, { id }) => {
        const newState = {...state};
        delete newState[id];
        return newState;
    })
);