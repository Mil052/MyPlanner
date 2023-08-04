import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FirebaseDataService, FirebaseDailyTasks } from '../../firebase.service';
import { fetchTasks, setTasks, addTask, deleteTask, deleteTaskFromStore, addTaskToStore, closeAndRedirect } from './tasks.actions';
import { switchMap, map, withLatestFrom, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectTasks, selectDate } from 'src/app/data-management/store/app.reducers';
import { dateToQuery } from 'src/app/planner/utilities/date-to-query';
import { createUniqueId } from "src/app/planner/utilities/create-unique-id";

@Injectable()
export class TasksEffects {

    fetchTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTasks),
            switchMap(({date}) => this.firebaseService.fetchDbDailyTasks(date)),
            map(resData => {
                if (resData) {  
                    console.log(resData);
                    return setTasks({tasks: resData.tasks});
                }
                return setTasks({tasks: {}});
            })
        )
    );

    addTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(addTask),
            switchMap(actionData => {
                const id = createUniqueId();
                return this.firebaseService.createDbDailyTask(actionData.date, id, actionData.task);
            }),
            withLatestFrom(this.store.select(selectDate)),
            map(([newTask, dateState]) => {
                if (newTask.date.getTime() === dateState.getTime()) {
                    console.log("dates are the same!");
                    return addTaskToStore({id: newTask.id, task: newTask.task});
                }
                console.log("dates are different!");
                return closeAndRedirect();
            })
        )
    );

    deleteTask$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteTask),
            withLatestFrom(this.store.select(selectTasks).pipe(map((tasksObject) => Object.keys(tasksObject).length))),
            switchMap(([actionData, numberOfTasks]) => {
                if (numberOfTasks > 1) {
                    return this.firebaseService.deleteDbTask(actionData.date, actionData.id);
                } else {
                    console.log('delete effect METHOD NR 2!');
                    return this.firebaseService.deleteDbTaskDocument(actionData.date, actionData.id);
                }
            }),
            map(taskId => {
                return deleteTaskFromStore({id: taskId});
            })
        )
    );

    // updateTask$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(updateTask),
    //         switchMap(([actionData, taskState]) => {
    //             const updatedTasks = [...taskState];
    //             updatedTasks[actionData.taskIndex] = actionData.updatedTask;
    //             return this.firebaseService.updateDbDailyTasks(actionData.date, updatedTasks)
    //         }),
    //         map(() => {
    //             return ({type: 'update success'});
    //         })
    //     )
    // );

    closeAndRedirect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(closeAndRedirect, addTaskToStore, deleteTaskFromStore),
            withLatestFrom(this.store.select(selectDate).pipe(map(date => dateToQuery(date)))),
            tap(([actionData, dateQuery]) => this.router.navigate(['/planner'], {queryParams: {date: dateQuery}}))
        ), {dispatch: false}
    );
    
    constructor(
        private actions$: Actions,
        private firebaseService: FirebaseDataService,
        private store: Store<AppState>,
        private router: Router){}
}