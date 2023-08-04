import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { convertFormIntoNoteLiteral } from './convertFormToNoteObject';
import { Store } from '@ngrx/store';
import { AppState, selectDate } from 'src/app/data-management/store/app.reducers';
import { addNote } from 'src/app/data-management/store/notes-slice/notes.actions';
import { take } from 'rxjs';
import { dateToQuery } from '../utilities/date-to-query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  noteForm!: FormGroup;

  constructor(private store: Store<AppState>,
              private router: Router){}

  ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null),
      images: new FormArray([
        new FormControl(null),
        new FormControl(null)
      ])
    });
  }
  
  saveHandler() {
    if (this.noteForm.status === 'VALID') {
      console.log(this.noteForm.value);
      const newNote = convertFormIntoNoteLiteral(this.noteForm.value);
      this.store.dispatch(addNote({note: newNote}));
    }
  }
  
  cancelHandler() {
    this.store.select(selectDate).pipe(take(1))
      .subscribe(date => {
        this.router.navigate(['/planner'], {queryParams: {date: dateToQuery(date)}});
      });
  }

  controlIsNotValid(controlName: string): boolean {
    const control = this. noteForm.get(controlName);
    if (control?.valid || !control?.touched) {
      return false;
    }
    return true;
  }
}
