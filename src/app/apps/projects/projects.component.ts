import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { Project } from './projects.model';

// data
import { PROJECTS } from './data';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Projects",
      breadCrumbItems: [{ label: 'Apps', path: '.' }, { label: 'Projects', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.projects = PROJECTS;
  }

}
