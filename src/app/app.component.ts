import {Component, OnInit} from '@angular/core';
import {TokenService} from "./core/service/token.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Portail ENELP';

    constructor(
        private tokenService: TokenService,
    ) {
    }

    ngOnInit(): void {

    }
}
