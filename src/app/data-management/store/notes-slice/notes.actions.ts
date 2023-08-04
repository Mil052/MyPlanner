import { createAction, props } from "@ngrx/store";
import { Note } from "../../data-models/note.model";

export const fetchNotes = createAction (
    'Fetch Notes'
)

export const setNotes = createAction (
    'Set Notes',
    props<{notes: {[id: string]: Note}}>()
);

export const addNote = createAction (
    'Add Note',
    props<{note: Note}>()
);

export const addNoteToStore = createAction(
    'Add Note To Store',
    props<{id: string, note: Note}>()
);

export const deleteNote = createAction (
    'Delete Note',
    props<{id: string}>()
);

export const deleteNoteFromStore = createAction (
    'Delete Note from Store',
    props<{id: string}>()
)