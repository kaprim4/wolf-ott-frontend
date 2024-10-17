import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../shared/services/auth.service";

@Component({
    selector: 'app-auth-logout',
    standalone: true,
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit(): void {
        this.authenticationService.logout();
    }

}
