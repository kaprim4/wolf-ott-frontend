import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

// types
import { Variant } from '../shared/base-ui.model';

@Component({
  selector: 'app-ui-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {

  variants: Variant[] = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Dropdowns",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Dropdowns', path: '.', active: true }]
    });
  }

}
