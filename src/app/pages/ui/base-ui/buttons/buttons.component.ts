import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

// types
import { Variant } from '../shared/base-ui.model';

// button variant type
type ButtonVariant = Variant | 'link' | 'white';


// button labels
type ButtonLabel = {
  icon: string;
  name: string;
  variant: string;
}

@Component({
  selector: 'app-ui-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  variants1: Variant[] = ['primary', 'success', 'info', 'warning', 'danger', 'dark', 'pink', 'secondary'];
  variants2: ButtonVariant[] = [...this.variants1, 'light', 'link'];
  variants3: ButtonVariant[] = [...this.variants1, 'light', 'white'];
  buttonLabels: ButtonLabel[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Buttons",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Buttons', path: '.', active: true }]
    });
    this.buttonLabels = [{
      icon: 'mdi mdi-check-all',
      name: 'Success',
      variant: 'success'
    },
    {
      icon: 'mdi mdi-close-circle-outline',
      name: 'Danger',
      variant: 'danger'
    },
    {
      icon: 'mdi mdi-alert-circle-outline',
      name: 'Info',
      variant: 'info'
    },
    {
      icon: 'mdi mdi-alert',
      name: 'Warning',
      variant: 'warning'
    }];
  }

}
