import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { Icon } from '../icons.model';

// data
import { DRIPICONSLIST } from './data';

@Component({
  selector: 'app-icons-dripicons',
  templateUrl: './dripicons.component.html',
  styleUrls: ['./dripicons.component.scss']
})
export class DripiconsComponent implements OnInit {

  dripIconList: Icon[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Dripicons",
      breadCrumbItems: [{ label: 'Icons', path: '.' }, { label: 'Dripicons', path: '.', active: true }]
    });
    this.dripIconList = DRIPICONSLIST;
  }

}
