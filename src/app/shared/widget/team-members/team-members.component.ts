import { Component, Input, OnInit } from '@angular/core';

// types
import { TeamMember } from './team-member.model';

@Component({
  selector: 'app-widget-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

  @Input() teamMembers: TeamMember[] = [];
  @Input() cardTitle: string = '';

  constructor () { }

  ngOnInit(): void {
  }

}
