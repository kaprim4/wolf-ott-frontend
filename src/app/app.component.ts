import {Component, OnInit} from '@angular/core';
import {TokenService} from "./core/service/token.service";
import {environment} from "../environments/environment";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = environment.APP_NAME;

    constructor(
        private tokenService: TokenService,
    ) {
    }

    ngOnInit(): void {

    }
}
