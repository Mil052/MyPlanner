import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DatePicker } from 'src/app/data-management/date-picker.model';
import { convertFormIntoTaskLiteral } from './convertFormToTaskObject';
import { Store } from '@ngrx/store';
import { AppState, selectDate } from 'src/app/data-management/store/app.reducers';
import { addTask } from 'src/app/data-management/store/tasks-slice/tasks.actions';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dateToQuery } from '../utilities/date-to-query';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  date!: DatePicker;
  taskForm!: FormGroup;

  constructor(private store: Store<AppState>,
              private router: Router){}

  ngOnInit() {
    this.store.select(selectDate).pipe(take(1)).subscribe(date => this.date = new DatePicker(date));

    this.taskForm = new FormGroup({
      hours: new FormGroup({
        from: new FormGroup({
          from_hour: new FormControl(null, Validators.required),
          from_minute: new FormControl(null, Validators.required),
        }),
        to: new FormGroup({
          to_hour: new FormControl(null, Validators.required),
          to_minute: new FormControl(null, Validators.required),
        })
      }),
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null),
      images: new FormArray([
        new FormControl(null),
        new FormControl(null)
      ])
    });
  }
  
  saveHandler() {
    if (this.taskForm.status === 'VALID' && this.date) {
      console.log(this.taskForm);
      const newTask = convertFormIntoTaskLiteral(this.taskForm.value);
      const date = this.date.dateFromDatePicker;
      this.store.dispatch(addTask({date: date, task: newTask}));
    }
  }
 
  cancelHandler() {
    this.store.select(selectDate).pipe(take(1))
      .subscribe(date => {
        this.router.navigate(['/planner'], {queryParams: {date: dateToQuery(date)}});
      });
  }
  
  hoursValidationHandler(event: Event, controlPath: string[], max: number) {
    const control = this.taskForm.get(['hours', ...controlPath]);
    let controlValue = (event.target as HTMLInputElement).value;   
    let controlValueToNumber = parseInt(controlValue);
    
    if (controlValue.length === 2 && controlValueToNumber < max) {
      return;
    }
    if (controlValue.length > 2) {
      controlValue = controlValueToNumber.toString().slice(0,2);
      controlValueToNumber = parseInt(controlValue);
    }
    if (controlValueToNumber < 10 || controlValueToNumber > max) {
        controlValue = '0' + controlValue[0];
    }
    control!.setValue(controlValue);
  }

  controlIsNotValid(controlName: string): boolean {
    const control = this. taskForm.get(controlName);
    if (control?.valid || !control?.touched) {
      return false;
    }
    return true;
  }

}

// https://stackoverflow.com/questions/61662115/input-event-and-reactive-forms-of-angular