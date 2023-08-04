import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { DataModel } from 'src/app/data-management/data-models/data.model';
import { DateDataObject, dateToObject } from 'src/app/planner/utilities/date-to-object';
import { AppState, selectNoteById, selectTaskById, selectDate } from 'src/app/data-management/store/app.reducers';
import { Store } from '@ngrx/store';
import { deleteNote } from 'src/app/data-management/store/notes-slice/notes.actions';
import { dateToQuery } from 'src/app/planner/utilities/date-to-query';
import { deleteTask } from 'src/app/data-management/store/tasks-slice/tasks.actions';

@Component({
  selector: 'app-display-single-element',
  templateUrl: './display-single-element.component.html',
  styleUrls: ['./display-single-element.component.scss']
})
export class DisplaySingleElementComponent implements OnInit {
  type!: 'task' | 'note';
  elementId!: string;
  element$!: Observable<DataModel>;
  date!: Date;
  dateDataObject!: DateDataObject;
  confirmWindow = false;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState> ){}

  ngOnInit(): void {
    this.type = this.route.snapshot.data['type'];
    this.elementId = this.route.snapshot.queryParams['id'];
    this.store.select(selectDate).pipe(take(1))
      .subscribe(date => {
        this.date = date;
        this.dateDataObject = dateToObject(date);
      });
    if (this.type === 'task') {
      this.element$ = this.store.select(selectTaskById(this.elementId));
    }
    if (this.type === 'note') {
      this.element$ = this.store.select(selectNoteById(this.elementId));
    }
  }

  closeHandler() {
    this.router.navigate(['/planner'], {queryParams: {date: dateToQuery(this.date)}});
  }

  openConfirmModal() {
    this.confirmWindow = true;
  }

  deleteElementHandler() {
    if (this.type === 'task') {
      this.store.dispatch(deleteTask({date: this.date, id: this.elementId}));
    }
    if (this.type === 'note') {
      this.store.dispatch(deleteNote({id: this.elementId}));
    }
  }

  dismissDeletion() {
    this.confirmWindow = false;
  }
}
