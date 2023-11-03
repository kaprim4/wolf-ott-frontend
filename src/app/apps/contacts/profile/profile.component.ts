import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// services
import { EventService } from 'src/app/core/service/event.service';

// types
import { Remainder } from 'src/app/shared/widget/remainders/remainder.model';
import { TeamMember } from 'src/app/shared/widget/team-members/team-member.model';
import { Post } from './profile.model';

// data
import { TEAM } from 'src/app/shared/widget/team-members/data';
import { REMAINDERS } from 'src/app/shared/widget/remainders/data';
import { POSTS } from './data';


@Component({
  selector: 'app-contacts-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  teamMembers: TeamMember[] = [];
  remainders: Remainder[] = [];
  posts: Post[] = [];

  constructor (private eventService: EventService,) { }


  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Profile",
      breadCrumbItems: [{ label: 'Contact', path: '.' }, { label: 'Profile', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    this.teamMembers = TEAM;
    this.remainders = REMAINDERS;
    this.posts = POSTS;
  }

}
