import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { changeDate } from "./date.actions";
import { Store } from "@ngrx/store";
import { AppState, selectDate } from "../app.reducers";
import { fetchTasks, setTasks, closeAndRedirect } from "../tasks-slice/tasks.actions";
import { map, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { dateToQuery } from "src/app/planner/utilities/date-to-query";


@Injectable()
export class DateEffects {
    changeDate$ = createEffect(() => 
        this.actions$.pipe(
            ofType(changeDate),
            tap(actionData => this.router.navigate([], {relativeTo: this.activeRoute, queryParams:{date: dateToQuery(actionData.date)}})),
            map(actionData => {
                return fetchTasks({date: actionData.date});
            })
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private activeRoute: ActivatedRoute){}
}