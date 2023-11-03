import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { TimelineItem } from './timeline.model';

// data
import { TIMELINEDATA } from './data';

@Component({
  selector: 'app-pages-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  timelineData: TimelineItem[] = [];

  constructor (
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Timeline",
      breadCrumbItems: [{ label: 'Extra Pages', path: '.' }, { label: 'Timeline', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches timeline data
   */
  _fetchData(): void {
    this.timelineData = TIMELINEDATA;
  }


  /**
 * returns the safe content which can be rendered
 * @param content content
 */
  getRenderedPostContent(content: string) {
    return this.sanitizer.sanitize(1, content);
  }

}
