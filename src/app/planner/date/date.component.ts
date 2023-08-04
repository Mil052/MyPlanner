import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/data-management/store/app.reducers';
import { DatePicker } from 'src/app/data-management/date-picker.model';
import { changeDate } from 'src/app/data-management/store/date-slice/date.actions';
import { ActivatedRoute } from '@angular/router';
import { QueryToDate } from '../utilities/date-to-query';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, AfterViewInit {
  date!: DatePicker;
  @ViewChild('dayPicker', {static: true}) dayPicker!: ElementRef;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  calculateDayPickerScrollPosition() {
    const calcPosition = (this.date.day * 40) - 200;
    this.dayPicker.nativeElement.scrollLeft = calcPosition;
  }

  ngOnInit(): void {
    const dateQueryParam: string | undefined = this.route.snapshot.queryParams['date'];
    let activeDate: Date;
    if (dateQueryParam) {
      activeDate = QueryToDate(dateQueryParam);
    } else {
      activeDate = new Date();
      activeDate.setHours(0, 0, 0, 0);
    }
    this.store.dispatch(changeDate({date: activeDate})); // Side effect of changeDate dispatching is fetching tasks for new date
    this.date = new DatePicker(activeDate);
  }

  ngAfterViewInit() {
    this.calculateDayPickerScrollPosition();
  }

  scrollList(event: WheelEvent) {
    const distance: number = event.deltaY > 0 ? 80 : -80;
    event.preventDefault;
    (<HTMLElement>event.currentTarget).scrollLeft += distance;
  }

  pickNewDayHandler(day: number) {
    this.date.day = day;
    this.store.dispatch(changeDate({date: this.date.dateFromDatePicker}));
    this.calculateDayPickerScrollPosition();
  }
  
  nextMonthHandler() {
    this.date.nextMonth();
    this.store.dispatch(changeDate({date: this.date.dateFromDatePicker}));
  }

  previousMonthHandler() {
    this.date.previousMonth();
    this.store.dispatch(changeDate({date: this.date.dateFromDatePicker}));
  }
}