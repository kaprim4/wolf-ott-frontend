import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// data
import { FAICONS } from './data';

@Component({
  selector: 'app-icons-font-awesome',
  templateUrl: './font-awesome.component.html',
  styleUrls: ['./font-awesome.component.scss']
})
export class FontAwesomeComponent implements OnInit {

  solidIconList: any[] = [];
  regularIconList: any[] = [];
  brandsIconList: any[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Font Awesome Icons",
      breadCrumbItems: [{ label: 'Icons', path: '.' }, { label: 'Font Awesome Icons', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetch data
   */
  _fetchData(): void {
    this.solidIconList = FAICONS.data.filter((icon: any) => icon.attributes.membership.free.includes('solid'));
    this.regularIconList = FAICONS.data.filter((icon: any) => icon.attributes.membership.free.includes('regular'));
    this.brandsIconList = FAICONS.data.filter((icon: any) => icon.attributes.membership.free.includes('brands'));
  }


}
