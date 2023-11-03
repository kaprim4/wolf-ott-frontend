import { Component, Input, OnInit } from '@angular/core';

// types
import { Member } from './member.model';

@Component({
  selector: 'app-widget-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input() member?: Member;

  constructor () { }

  ngOnInit(): void {
  }

}
