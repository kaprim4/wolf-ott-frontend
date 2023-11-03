import {Component, Input, OnInit} from '@angular/core';
// types
import {Message} from '../dashboard.model';

@Component({
    selector: 'app-dashboard-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

    @Input() messages: Message[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
