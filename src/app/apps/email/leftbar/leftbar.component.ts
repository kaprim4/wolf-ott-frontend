import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})
export class LeftbarComponent implements OnInit {

  @Input() totalUnread: number = 0;

  constructor () { }

  ngOnInit(): void {
  }

}
