import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

// types
import { Variant } from '../shared/base-ui.model';


type BadgeVariant = Variant | 'blue';

type BreadcrumbItem = {
  label?: string;
  path?: string;
  active?: boolean;
}

@Component({
  selector: 'app-general-ui',
  templateUrl: './general-ui.component.html',
  styleUrls: ['./general-ui.component.scss']
})
export class GeneralUiComponent implements OnInit {

  variants: BadgeVariant[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'pink', 'blue', 'light', 'dark'];
  breadcrumbData: BreadcrumbItem[][] = [];
  page1 = 1;
  page2 = 1;
  page3 = 1;
  page4 = 1;
  page5 = 1;
  page6 = 1;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "General UI",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'General UI', path: '.', active: true }]
    });
    this.breadcrumbData = [
      [
        { label: 'Home', path: '.', active: true }
      ],
      [
        { label: 'Home', path: '.' },
        { label: 'Library', path: '.', active: true }
      ],
      [
        { label: 'Home', path: '.' },
        { label: 'Library', path: '.' },
        { label: 'Data', path: '.', active: true }
      ]
    ]
  }
}
