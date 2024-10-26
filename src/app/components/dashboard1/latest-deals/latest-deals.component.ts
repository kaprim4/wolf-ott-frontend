import {Component, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';
import {UserService} from "../../../shared/services/user.service";
import {TokenService} from "../../../shared/services/token.service";
import {StatsService} from "../../../shared/services/stats.service";
import {UserDetail} from "../../../shared/models/user";
import {LineService} from "../../../shared/services/line.service";
import {ILine, LineDetail, LineList} from "../../../shared/models/line";
import {catchError, of} from "rxjs";
import {Page} from "../../../shared/models/page";

@Component({
    selector: 'app-latest-deals',
    standalone: true,
    imports: [MaterialModule, TablerIconsModule],
    templateUrl: './latest-deals.component.html',
})
export class AppLatestDealsComponent implements OnInit {

    loggedInUser: any;
    user: any;
    sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    sevenDaysAgo: number = 0;
    old_credits:number = 0;

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private statsService: StatsService,
        private lineService: LineService
    ) {
        this.sevenDaysAgo = Date.now() - this.sevenDaysInMilliseconds;
    }

    ngOnInit(): void {
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });

    }
}
