import { Component, OnInit } from '@angular/core';

// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { Message, Project } from './dashboard.model';

// data
import { MESSAGES, PROJECTS } from './data';

@Component({
  selector: 'app-dashboard-1',
  templateUrl: './dashboard-one.component.html',
  styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent implements OnInit {

  messages: Message[] = [];
  recentProjects: Project[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE,
      {
        title: 'Dashboard',
        breadCrumbItems: [{ label: 'Dashboards', path: '/' }, { label: 'Dashboard', path: '/', active: true }]
      }
    );
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.messages = MESSAGES;
    this.recentProjects = PROJECTS;
  }

}
