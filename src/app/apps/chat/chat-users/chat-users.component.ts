import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// services
import { AuthenticationService } from 'src/app/core/service/auth.service';

// types
import { ChatUser } from '../chat.model';

// data
import { USERS } from '../data';
import {TokenService} from "../../../core/service/token.service";

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  loggedInUser: any = {};
  userList: ChatUser[] = [];
  searchUser: string = '';
  @Input() selectedUser!: ChatUser;

  //On selecting new user
  @Output() selectUser: EventEmitter<ChatUser> = new EventEmitter();

  constructor (
      private authService: AuthenticationService,
      private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.getPayload();

    // Get users for chat
    this._fetchUsers();
  }

  /**
   *  Fetches users for chat
   */
  _fetchUsers(): void {
    this.userList = USERS;
  }

  /**
   * changes active user
   * @param user chat user
   */
  activateUser(user: ChatUser): void {
    this.selectedUser = user;
    this.selectUser.emit(this.selectedUser);
  }

  /**
 * search user
 */
  search(): void {
    this.userList = this.searchUser ? [...USERS].filter(u => u.name!.toLowerCase().indexOf(this.searchUser.toLowerCase()) >= 0) : [...USERS];
  }


}
