import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { Icon } from '../icons.model';

// data
import { FEATHERICONLIST } from './data';

@Component({
  selector: 'app-icons-feather',
  templateUrl: './feather.component.html',
  styleUrls: ['./feather.component.scss']
})
export class FeatherComponent implements OnInit {

  featherIcons: Icon[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Feather Icons",
      breadCrumbItems: [{ label: 'Icons', path: '.' }, { label: 'Feather Icons', path: '.', active: true }]
    });
    this.featherIcons = FEATHERICONLIST;
  }

}
