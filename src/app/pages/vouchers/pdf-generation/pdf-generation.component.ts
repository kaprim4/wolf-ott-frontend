import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";

@Component({
  selector: 'app-pdf-generation',
  templateUrl: './pdf-generation.component.html',
  styleUrls: ['./pdf-generation.component.scss']
})
export class PdfGenerationComponent implements OnInit {

    constructor(
        private eventService: EventService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Génération PDF",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Génération PDF', path: '.', active: true}
            ]
        });
    }

}
