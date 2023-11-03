import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbTimeStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Select2Data } from 'ng-select2-component';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// data
import { COUNTRIES, STATES } from './data';

@Component({
  selector: 'app-forms-advanced',
  templateUrl: './forms-advanced.component.html',
  styleUrls: ['./forms-advanced.component.scss']
})
export class FormsAdvancedComponent implements OnInit {


  // select2 config
  countries: Select2Data = [];

  // date picker config
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  hidden: boolean = true;

  selectedDateRange: string = '';
  hoveredDate: NgbDate | null = null;
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;

  // timepicker config
  time1!: NgbTimeStruct;
  time2!: NgbTimeStruct;
  time3!: NgbTimeStruct;
  time4!: NgbTimeStruct;
  show: boolean = true;
  meridian: boolean = true;
  spinners = true;

  // typeahead config
  statesList: string[] = [];
  typeaheadModel: any;
  formatter = (result: string) => result.toUpperCase();

  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;

  constructor (private calendar: NgbCalendar, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Form Advanced",
      breadCrumbItems: [{ label: 'Forms', path: '.' }, { label: 'Advanced Form', path: '.', active: true }]
    });
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.selectedDateRange = this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2) + ' to ' + this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2)
    this._fetchData();
  }

  /**
   * fetches country list
   */
  _fetchData(): void {
    this.countries = COUNTRIES;
    this.statesList = STATES;
  }

  /**
 * selects date range
 * @param date date
 */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.selectedDateRange = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.selectedDateRange = this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2) + ' to ' + this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2)
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.selectedDateRange = "";
    }
  }

  /**
   * returns true/false based on whether date is hovered or not
   * @param date date
   */
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  /**
   * returns true if date is inside selected range
   * @param date date
   */
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  /**
   * returns true if date is in range
   * @param date date
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }



  /**
   * toggles meridian
   */
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  /**
   * toggles spinner visibility
   */
  toggleSpinners() {
    this.spinners = !this.spinners;
  }


  /**
 * search function of typeahead 1
 */
  search1: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.statesList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  /**
   * search function of typeahead 2
   */
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.statesList
        : this.statesList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
}
