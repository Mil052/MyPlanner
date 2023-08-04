import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplaySingleElementComponent } from './display-single-element.component';

describe('DisplaySingleNoteComponent', () => {
  let component: DisplaySingleElementComponent;
  let fixture: ComponentFixture<DisplaySingleElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplaySingleElementComponent]
    });
    fixture = TestBed.createComponent(DisplaySingleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
