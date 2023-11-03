import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

// types
import { Variant } from '../shared/base-ui.model';

@Component({
  selector: 'app-ui-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.scss']
})
export class SpinnersComponent implements OnInit {

  variants: Variant[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'pink', 'light', 'dark'];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Spinners",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Spinners', path: '.', active: true }]
    });
  }

}
