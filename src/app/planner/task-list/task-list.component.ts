import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectTasks } from 'src/app/data-management/store/app.reducers';
import { Task } from '../../data-management/data-models/task.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<{[id: number]: Task}>;

  constructor(
    private store: Store<AppState>,
    private router: Router){}

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasks);
  }

  specifyTaskSizeClass(task: Task): string[] {
    const classArray: string[] = ['task'];
    if (task.images && task.description && (task.description.length > 200)) {
      classArray.push('large');
    } else {
      classArray.push('normal');
    }
    return classArray;
  }

  scrollTaskList(event: WheelEvent) {
    event.preventDefault;
    event.stopPropagation;
    (<HTMLElement>event.currentTarget).scrollTop += event.deltaY;
  }

  openTask(taskId: number){
    console.log('open task clicked : ' + taskId);
    this.router.navigate(['/planner', 'task'], {queryParams: {id: taskId.toString()}, queryParamsHandling: "merge"});
  }
}
