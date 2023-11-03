import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

// types
import { ChatMessage, ChatUser } from '../chat.model';

// data
import MESSAGES from './data';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent implements OnInit {

  @Input() selectedUser!: ChatUser;

  loading: boolean = false;
  messages: ChatMessage[] = [];
  toUser!: ChatUser;
  newMessage: string = '';

  @ViewChild('chatForm', { static: true }) chatForm: any;

  constructor () { }

  ngOnInit(): void {
    // initialiize data
    this.initData();
  }

  /**
   * loads message for new chat user
   * @param changes chat user change
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'].currentValue !== changes['selectedUser'].previousValue) {
      this.loading = true;
      setTimeout(() => {
        this.messages = [...MESSAGES].filter(m => (m.to.id === this.toUser.id && m.from.id === this.selectedUser.id) || (this.toUser.id === m.from.id && m.to.id === this.selectedUser.id));
        this.loading = false;

      }, 750);

    }
  }


  /**
   * set user
   */
  initData(): void {
    this.toUser = {
      id: 9,
      name: 'Nowak Helme',
      avatar: 'assets/images/users/user-1.jpg',
    }
  }

  /** 
   * add new message 
   */
  sendChatMessage(): void {
    const modifiedMessages = [...this.messages];
    modifiedMessages.push({
      id: this.messages.length + 1,
      from: this.toUser,
      to: this.selectedUser,
      message: [{ type: 'text', value: this.newMessage }],
      sendOn: new Date().getHours() + ':' + new Date().getMinutes()
    });
    this.messages = modifiedMessages;
    this.chatForm.resetForm();
  }
}
