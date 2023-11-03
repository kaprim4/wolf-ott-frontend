import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

interface PersonDetails {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
}

@Component({
  selector: 'app-table-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class TableBasicComponent implements OnInit {

  persons: PersonDetails[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Basic Tables",
      breadCrumbItems: [{ label: 'Tables', path: '.' }, { label: 'Basic Tables', path: '.', active: true }]
    });
    this.persons = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        userName: '@mdo'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        userName: '@fat'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'the Bird',
        userName: '@twitter'
      }
    ];

  }

}
