import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { SliderItem } from './rangeslider.model';

// data
import { SLIDERVARIANTS } from './data';


@Component({
  selector: 'app-ui-range-sliders',
  templateUrl: './rangesliders.component.html',
  styleUrls: ['./rangesliders.component.scss']
})
export class RangeslidersComponent implements OnInit {

  rangeSliders: SliderItem[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Range Sliders",
      breadCrumbItems: [{ label: 'Extended UI', path: '.' }, { label: 'Range Sliders', path: '.', active: true }]
    });
    this.rangeSliders = SLIDERVARIANTS;
  }

}
