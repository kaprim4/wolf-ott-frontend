import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-email-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Output() closeMessage = new EventEmitter<void>();

  constructor () { }

  ngOnInit(): void {
  }

  handleMessageClose(): void {
    this.closeMessage.emit();
  }

}
