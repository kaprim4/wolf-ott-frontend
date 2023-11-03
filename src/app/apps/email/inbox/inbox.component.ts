import { Component, OnInit, ViewChild } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// component
import { ComposeMailComponent } from '../compose-mail/compose-mail.component';

// types
import { Email } from './email.model';

// data
import { EMAILS } from './data';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  emailList: Email[] = [];
  page: number = 1;
  emailCountPerPage: number = 20;
  totalEmails: number = EMAILS.length;
  activeIndex: number = -1;
  messageIsOpen: boolean = false;

  @ViewChild('composeModal', { static: true }) composeModal!: ComposeMailComponent;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Inbox",
      breadCrumbItems: [{ label: 'Email', path: '.' }, { label: 'Inbox', path: '.', active: true }]
    });
    document.querySelector('footer.footer')?.classList.add('d-none');
    this._fetchData();
  }

  ngOnDestroy(): void {
    document.querySelector('footer.footer')?.classList.remove('d-none');
  }

  /**
  * fetches first page
  */
  _fetchData(): void {
    this.emailList = EMAILS.slice(0, this.emailCountPerPage);
  }

  /**
 * Opens compose modal
 * @param title title of modal
 * @param data data to be used in modal
 */
  openComposeModal(): void {
    this.composeModal.openModal();
  }
  /**
   * fetches emails
   */
  showMoreMessages(): void {
    let nextPage = this.page + 1;
    if (nextPage > this.totalEmails / this.emailCountPerPage) {
      nextPage = this.totalEmails / this.emailCountPerPage;
    }
    let endIdx = nextPage * this.emailCountPerPage;
    this.page = nextPage;
    this.emailList = EMAILS.slice(0, endIdx);
  };


  // handle overlay
  showOverlay(): void {
    document.body.classList.add('show-main-overlay');
  };
  hideOverlay(): void {
    document.body.classList.remove('show-main-overlay');
  };

  // handle message
  showMessage(): void {
    document.body.classList.add('show-message');
    this.messageIsOpen = true;
  };
  hideMessage(): void {
    document.body.classList.remove('show-message');
    this.messageIsOpen = false;
    this.activeIndex = -1;
  };

  // hanlde sidebar
  showSidebar(): void {
    document.body.classList.add('show-sidebar');
  };
  hideSidebar(): void {
    document.body.classList.remove('show-sidebar');
  };

  toggleSidebar(): void {
    this.showSidebar();
    this.showOverlay();
  };

  handleMessageClose(): void {
    this.hideMessage();
    this.hideOverlay();
  };

  handleMessageClick = (index: number) => {
    if (this.messageIsOpen && this.activeIndex === index) {
      this.hideMessage();
      this.hideOverlay();
    } else {
      if (this.messageIsOpen) {
        this.hideMessage();
        this.activeIndex = index;
        setTimeout(() => {
          this.showMessage();
        }, 300);
      } else {
        this.activeIndex = index;
        this.showMessage();
      }
      this.showOverlay();
    }
  };

  handleOverlayClick(): void {
    this.hideOverlay();
    this.hideMessage();
    this.hideSidebar();
  };

}
