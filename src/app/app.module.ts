import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DateComponent } from './planner/date/date.component';
import { LoginComponent } from './login/login.component';
import { PlannerComponent } from './planner/planner.component';
import { NotesListComponent } from './planner/notes-list/notes-list.component';
import { TaskListComponent } from './planner/task-list/task-list.component';
import { ControlPanelComponent } from './planner/control-panel/control-panel.component';
import { CreateNoteComponent } from './planner/create-note/create-note.component';
import { DisplaySingleElementComponent } from './planner/display-single-element/display-single-element.component';

import { appReducersMap } from './data-management/store/app.reducers';
import { TasksEffects } from './data-management/store/tasks-slice/tasks.effects';
import { DateEffects } from './data-management/store/date-slice/date.effects';
import { NotesEffects } from './data-management/store/notes-slice/notes.effects';
import { NumberOfDaysDirective } from './planner/date/number-of-days.directive';
import { ForDirective } from './planner/utilities/for.directive';
import { CreateTaskComponent } from './planner/create-task/create-task.component';


@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    LoginComponent,
    PlannerComponent,
    NotesListComponent,
    TaskListComponent,
    ControlPanelComponent,
    CreateNoteComponent,
    DisplaySingleElementComponent,
    NumberOfDaysDirective,
    ForDirective,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducersMap),
    EffectsModule.forRoot([TasksEffects, DateEffects, NotesEffects]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
