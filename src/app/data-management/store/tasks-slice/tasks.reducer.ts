import { createReducer, on } from '@ngrx/store';
import { Task } from "src/app/data-management/data-models/task.model";
import { setTasks, addTaskToStore, deleteTaskFromStore, updateTask} from "./tasks.actions"

const initialState: {[id: string]: Task} = {};

export const tasksReducer = createReducer(
    initialState, 
    on(setTasks, (state, { tasks }) => tasks),
    on(addTaskToStore, (state, { id, task }) => ({...state, [id]: task})),
    on(deleteTaskFromStore, (state, { id }) => {
        const newState = {...state};
        delete newState[id];
        return newState;
    }),
    on(updateTask,(state, {date, id, task}) => ({...state}))
);