import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// types
import { Icon } from '../icons.model';

// data
import { THEMIFYICONS_LIST } from './data';

@Component({
  selector: 'app-icons-themify',
  templateUrl: './themify.component.html',
  styleUrls: ['./themify.component.scss']
})
export class ThemifyComponent implements OnInit {

  themifyIcons: Icon[] = [];

  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Themify Icons",
      breadCrumbItems: [{ label: 'Icons', path: '.' }, { label: 'Themify Icons', path: '.', active: true }]
    });
    this._fetchData();
  }

  /**
   * fetch data
   */
  _fetchData(): void {
    this.themifyIcons = THEMIFYICONS_LIST;
  }

  /**
 * filter icons by category
 * @param category category
 */
  filterIcons(category: string): Icon[] {
    return this.themifyIcons.filter((icon) => icon.category === category);
  }

}
