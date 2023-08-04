import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PlannerComponent } from './planner/planner.component';
import { CreateNoteComponent } from './planner/create-note/create-note.component';
import { CreateTaskComponent } from './planner/create-task/create-task.component';
import { DisplaySingleElementComponent } from './planner/display-single-element/display-single-element.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "planner", component: PlannerComponent, children: [
    {path: "add/task", component: CreateTaskComponent},
    {path: "add/note", component: CreateNoteComponent},
    {path: "note", component: DisplaySingleElementComponent, data: {type: 'note'}},
    {path: "task", component: DisplaySingleElementComponent, data: {type: 'task'}}
  ]},
  {path: "",  redirectTo: '/planner', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
