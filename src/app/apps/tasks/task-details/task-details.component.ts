import { Component, OnInit } from '@angular/core';
import { Select2Data } from 'ng-select2-component';

// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { Comment } from '../tasks.model';

// data
import { COMMENTS } from '../data';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  comments: Comment[] = [];
  tags: Select2Data = [];
  selectedTags: string[] = ['Amsterdam', 'Washington', 'Sydney']

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Task Details",
      breadCrumbItems: [{ label: 'Tasks', path: '.' }, { label: 'Task Details', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.comments = COMMENTS;
    this.tags = [
      { label: 'Amsterdam', value: 'Amsterdam' },
      { label: 'Washington', value: 'Washington' },
      { label: 'Sydney', value: 'Sydney' },
    ]
  }

}
