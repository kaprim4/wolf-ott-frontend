import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;
    APP_EDITOR_NAME = environment.APP_EDITOR_NAME;
    APP_EDITOR_LINK = environment.APP_EDITOR_LINK;

    constructor() {
    }

    ngOnInit(): void {
    }

}
