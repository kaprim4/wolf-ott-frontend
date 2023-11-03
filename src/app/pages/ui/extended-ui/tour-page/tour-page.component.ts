import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-ui-tour-page',
  templateUrl: './tour-page.component.html',
  styleUrls: ['./tour-page.component.scss']
})
export class TourPageComponent implements OnInit {

  constructor (
    private eventService: EventService,
    private readonly joyrideService: JoyrideService
  ) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Tour Page",
      breadCrumbItems: [{ label: 'Extended UI', path: '.' }, { label: 'Tour Page', path: '.', active: true }]
    });
    this.joyrideService.startTour(
      { steps: ['firstStep', 'secondStep', 'thirdStep'], showCounter: false, themeColor: '#000000' } // steps order
    );
  }

}
