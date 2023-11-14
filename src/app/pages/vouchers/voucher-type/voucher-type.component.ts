import {Component, OnInit} from '@angular/core';
import {EventType} from "../../../core/constants/events";
import {EventService} from "../../../core/service/event.service";

@Component({
    selector: 'app-voucher-type',
    templateUrl: './voucher-type.component.html',
    styleUrls: ['./voucher-type.component.scss']
})
export class VoucherTypeComponent implements OnInit {

    constructor(
        private eventService: EventService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Type des bons",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Type des bons', path: '.', active: true}
            ]
        });
    }
}
