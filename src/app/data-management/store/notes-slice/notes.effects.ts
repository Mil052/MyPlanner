import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fetchNotes, setNotes, addNote, addNoteToStore, deleteNote, deleteNoteFromStore } from "./notes.actions";
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { FirebaseDataService } from "../../firebase.service";
import { Note } from "../../data-models/note.model";
import { Router } from "@angular/router";
import { AppState, selectDate } from "../app.reducers";
import { dateToQuery } from "src/app/planner/utilities/date-to-query";
import { createUniqueId } from "src/app/planner/utilities/create-unique-id";

@Injectable()
export class NotesEffects {

    fetchNotes$ = createEffect (() => 
        this.actions$.pipe(
            ofType(fetchNotes),
            switchMap(() => this.firebaseService.fetchDbNotes()),
            map(resData => {
                if (resData) {  
                    console.log(resData);
                    return setNotes({notes: resData});
                }
                return setNotes({notes: {}});
            })
        )
    );

    addNote$ = createEffect (() =>
        this.actions$.pipe(
            ofType(addNote),
            switchMap(actionData => {
                const id = createUniqueId();
                return this.firebaseService.createNote(id, actionData.note);
            }),
            map(resData => {
                return addNoteToStore({id: resData.id, note: resData.note});
            })
        )
    );

    deleteNote$ = createEffect (() =>
        this.actions$.pipe(
            ofType(deleteNote),
            switchMap(actionData => this.firebaseService.deleteDbNote(actionData.id)),
            map(resData => {
                return deleteNoteFromStore({id: resData});
            })
        )
    )

    closeAndRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addNoteToStore, deleteNoteFromStore),
            withLatestFrom(this.store.select(selectDate).pipe(map(date => dateToQuery(date)))),
            tap(([actionData, dateQuery]) => this.router.navigate(['/planner'], {queryParams: {date: dateQuery}}))
        ), {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private firebaseService: FirebaseDataService,
        private router: Router){}
}