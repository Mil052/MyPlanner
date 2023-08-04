import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectNotes } from 'src/app/data-management/store/app.reducers';
import { Note } from 'src/app/data-management/data-models/note.model';
import { Observable } from 'rxjs';
import { fetchNotes } from 'src/app/data-management/store/notes-slice/notes.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes$!: Observable<{[id: number]: Note}>;

  constructor (
    private store: Store<AppState>,
    private router: Router){}

  ngOnInit(): void {
    this.notes$ = this.store.select(selectNotes);
    this.store.dispatch(fetchNotes());
  }

  scrollNotes(event: WheelEvent) {
    event.preventDefault;
    (<HTMLElement>event.currentTarget).scrollLeft += event.deltaY;
  }

  openNote(noteId: number){
    this.router.navigate(['/planner', 'note'], {queryParams: {id: noteId.toString()}});
  }
}
