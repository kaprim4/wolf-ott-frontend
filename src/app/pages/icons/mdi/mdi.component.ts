import { Component, OnInit } from '@angular/core';
// constants
import { EventType } from 'src/app/core/constants/events';

// service
import { EventService } from 'src/app/core/service/event.service';

// data
import { MdiIcon, MDIICONSLIST } from './data';

@Component({
  selector: 'app-icons-mdi',
  templateUrl: './mdi.component.html',
  styleUrls: ['./mdi.component.scss']
})
export class MdiComponent implements OnInit {

  mdiIconsList: MdiIcon[] = [];
  mdiNewIcons: MdiIcon[] = [];
  constructor (private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
      title: "Material Design Icons",
      breadCrumbItems: [{ label: 'Icons', path: '.' }, { label: 'Material Design Icons', path: '.', active: true }]
    });
    this.mdiIconsList = MDIICONSLIST;
    this.mdiNewIcons = MDIICONSLIST.filter((icon: MdiIcon) => icon.version === '5.8.55');
  }

}
