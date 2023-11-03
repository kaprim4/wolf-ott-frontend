import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-forms-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Form Components",
      breadCrumbItems: [{ label: 'Forms', path: '.' }, { label: 'Form Components', path: '.', active: true }]
    });
  }

}
