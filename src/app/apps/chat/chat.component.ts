import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { ChatUser } from './chat.model';

// data
import { USERS } from './data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {



  selectedUser!: ChatUser;

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Chat",
      breadCrumbItems: [{ label: 'Apps', path: '.' }, { label: 'Chat', path: '.', active: true }]
    });

    // set initial user
    this.selectedUser = USERS[0];
  }

  /**
 * changes chat user
 * @param user selected user
 */
  onSelectedUser(user: ChatUser): void {
    this.selectedUser = user;
  }

}
