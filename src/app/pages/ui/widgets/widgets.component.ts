import { Component, OnInit } from '@angular/core';

// constant
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { Member } from 'src/app/shared/widget/member-card/member.model';
import { Remainder } from 'src/app/shared/widget/remainders/remainder.model';
import { TeamMember } from 'src/app/shared/widget/team-members/team-member.model';

// data
import { TEAM } from 'src/app/shared/widget/team-members/data';
import { REMAINDERS } from 'src/app/shared/widget/remainders/data';


@Component({
  selector: 'app-ui-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  member1!: Member;
  teamMembers: TeamMember[] = [];
  remainders: Remainder[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Widgets",
      breadCrumbItems: [{ label: 'Components', path: '.' }, { label: 'Widgets', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.member1 = {
      id: 1,
      name: "Johnathan Deo",
      email: "coderthemes@gmail.com",
      mobile: "(123) 123 1234",
      location: "USA",
      avatar: "assets/images/users/user-9.jpg",
      bio: "Hi I'm Johnathn Deo, has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
    }

    this.teamMembers = TEAM;

    this.remainders = REMAINDERS;
  }

}
