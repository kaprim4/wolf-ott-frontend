import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calendar-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class CalendarEventComponent implements OnInit {

  modelTitle: string = "";
  event: EventInput = {};

  @Output() eventSaved: EventEmitter<EventInput> = new EventEmitter();
  @Output() eventDeleted: EventEmitter<EventInput> = new EventEmitter();

  @ViewChild('content', { static: true }) content: any;
  constructor (public activeModal: NgbModal) { }


  ngOnInit(): void {
  }

  /**
   * opens modal
   * @param title title of modal 
   * @param data data to be used in modal
   */
  openModal(title: string, data: any): void {
    this.modelTitle = title;
    this.event = { id: data['id'], title: data['title'], category: data['category'], start: data['start'], classNames: data['classNames'] };
    this.activeModal.open(this.content, { backdrop: "static" });
  }

  /**
   * stores event in calendar events
   */
  saveEvent() {
    this.eventSaved.emit(this.event);
    this.activeModal.dismissAll();
  }

  /**
   * deletes event from calendar events
   */
  deleteEvent() {
    this.eventDeleted.emit(this.event);
    this.activeModal.dismissAll();
  }


}
