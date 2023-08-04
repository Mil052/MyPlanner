import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  constructor(private router: Router){}

  addTaskHandler () {
    this.router.navigate(['/planner', 'add', 'task']);
  }

  addNoteHandler () {
    this.router.navigate(['/planner', 'add', 'note']);
  }

}
