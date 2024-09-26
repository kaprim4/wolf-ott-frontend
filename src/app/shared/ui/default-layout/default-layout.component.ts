import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

    @Input() hasLogo?: boolean = true;
    @Input() cardClass?: string = '';

    currYear: number = new Date().getFullYear();
    today: Date = new Date();
    APP_NAME = environment.APP_NAME;
    APP_EDITOR_NAME = environment.APP_EDITOR_NAME;
    APP_EDITOR_LINK = environment.APP_EDITOR_LINK;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        document.body.classList.add('authentication-bg', 'authentication-bg-pattern');
    }

    ngOnDestroy(): void {
        document.body.classList.remove('authentication-bg', 'authentication-bg-pattern');
    }

}
