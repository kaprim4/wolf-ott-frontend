import { Component, OnInit } from '@angular/core';

// service
import { EventService } from 'src/app/core/service/event.service';

// constant
import { EventType } from 'src/app/core/constants/events';

type Alert = {
  type: string;
  message?: string;
  icon?: string;
  link?: boolean;
}

@Component({
  selector: 'app-ui-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  showClosable: boolean = true;
  show = false;
  autohide = true;
  toastPlacement: string = "top-0 start-0";
  alertVariants: Alert[] = [];
  closableAlerts: Alert[] = [];
  closableAlerts2: Alert[] = [];
  showLiveAlert: boolean = false;


  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Notifications",
      breadCrumbItems: [{ label: 'Base UI', path: '.' }, { label: 'Notifications', path: '.', active: true }]
    });
    this.alertVariants = [
      {
        type: 'primary',
      },
      {
        type: 'secondary',
      },
      {
        type: 'success',
        message: 'This is a success alert',
        icon: 'mdi mdi-check-all'
      },
      {
        type: 'danger',
        message: 'This is a danger alert',
        icon: 'mdi mdi-block-helper'
      },
      {
        type: 'warning',
        message: 'This is a warning alert',
        icon: 'mdi mdi-alert-outline'
      },
      {
        type: 'info',
        message: 'This is an info alert',
        icon: 'mdi mdi-alert-circle-outline'
      },
      {
        type: 'light',
        link: true
      },
      {
        type: 'dark',
        link: true
      }
    ];

    this.closableAlerts = [
      {
        type: 'primary',
      },
      {
        type: 'secondary',
      },
      {
        type: 'success',
      },
      {
        type: 'danger',
      },
      {
        type: 'warning',

      },
      {
        type: 'info',

      },
      {
        type: 'light',

      },
      {
        type: 'dark',

      }
    ];

    this.closableAlerts2 = [
      {
        type: 'primary',
      },
      {
        type: 'secondary',
      },
      {
        type: 'success',
      },
      {
        type: 'danger',
      },
      {
        type: 'warning',

      },
      {
        type: 'info',

      },
      {
        type: 'light',

      },
      {
        type: 'dark',

      }
    ];
  }

  /**
   * manages re-appear and close state of closable toast
   */
  close(): void {
    this.showClosable = false;
    setTimeout(() => this.showClosable = true, 3000);
  }


  /**
 * closes alert
 * @param alert alert
 */
  closeAlert(list: Alert[], alert: Alert): void {
    list.splice(list.indexOf(alert), 1);
  }

}
