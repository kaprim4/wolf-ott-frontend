import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-ui-sweet-alerts',
  templateUrl: './sweet-alerts.component.html',
  styleUrls: ['./sweet-alerts.component.scss']
})
export class SweetAlertsComponent implements OnInit {


  email: string = '';

  @ViewChild('ajaxRequest') ajaxRequest!: SwalComponent;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Sweet Alerts",
      breadCrumbItems: [{ label: 'Extended UI', path: '.' }, { label: 'Sweet Alerts', path: '.', active: true }]
    });
  }

  /**
 * executes before confirmation
 */
  preConfirm(email: string): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'taken@example.com') {
          reject('This email is already taken.')
        } else {
          resolve('')
        }
      }, 2000)
    })
  }

  /**
   * handle confirm action of alert
   */
  handleConfirm(email: string): void {
    this.ajaxRequest.fire();
  }

}
