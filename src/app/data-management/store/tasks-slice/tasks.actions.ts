import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/data-management/data-models/task.model";

export const fetchTasks = createAction (
    'Fetch Tasks',
    props<{date: Date}>()
);

export const setTasks = createAction (
    'Set Tasks',
    props<{tasks: {[id: string]: Task}}>()
);

export const addTask = createAction (
    'Add Task',
    props<{date: Date, task: Task}>()
);

export const addTaskToStore = createAction (
    'Add Task To Store',
    props<{id: string, task: Task}>()
)

export const closeAndRedirect = createAction (
    'Close and Redirect'
)

export const deleteTask = createAction (
    'Delete Task',
    props<{date: Date, id: string}>()
);

export const deleteTaskFromStore = createAction (
    'Delete Task from Store',
    props<{id: string}>()
)

export const updateTask = createAction (
    'Update Task',
    props<{date: Date, id: string, task: Task}>()
);