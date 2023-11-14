import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";

@Component({
  selector: 'app-end-day',
  templateUrl: './end-day.component.html',
  styleUrls: ['./end-day.component.scss']
})
export class EndDayComponent implements OnInit {

    constructor(
        private eventService: EventService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Clôturer la journée",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Clôturer la journée', path: '.', active: true}
            ]
        });
    }

}
