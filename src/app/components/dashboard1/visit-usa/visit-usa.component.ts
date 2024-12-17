import {Component, OnInit} from '@angular/core';
import {NgxEchartsDirective, provideEcharts} from 'ngx-echarts';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MaterialModule} from 'src/app/material.module';
import {LineActivityService} from "../../../shared/services/line-activity.service";
import {LineActivityList} from "../../../shared/models/line-activity";
import {NotificationService} from "../../../shared/services/notification.service";
import {DecimalPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {LoggingService} from "../../../services/logging.service";
import {UserDetail} from "../../../shared/models/user";
import {TokenService} from "../../../shared/services/token.service";
import {UserService} from "../../../shared/services/user.service";

@Component({
    selector: 'app-visit-usa',
    standalone: true,
    imports: [
        TablerIconsModule,
        MaterialModule,
        DecimalPipe,
        NgForOf,
        NgClass
    ],
    templateUrl: './visit-usa.component.html',
})
export class AppVisitUsaComponent implements OnInit {
    loading: boolean = false;
    lineChartList: any[] = [];
    topCountries: { name: string; value: number }[] = [];
    totalElements: number = 0;
    page: number = 0;
    size: number = 10;

    loggedInUser: any;
    user: UserDetail = {
        id: 0, username: ""
    };

    constructor(
        private activityService: LineActivityService,
        private notificationService: NotificationService,
        private loggingService: LoggingService,
        private tokenService: TokenService,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.loading = true;
        this.loggedInUser = this.tokenService.getPayload();

        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe({
            next: (user) => {
                this.user = user;
                this.loggingService.log('userService.getUser :', this.user);
            }, error: (e: any) => {
                this.loggingService.error('Failed to load user. Please try again.', e);
                this.loading = false;
            }, complete: () => {
                this.loggingService.info('Load user successfully.');

                this.activityService.getLineChart(10).subscribe({
                    next: (pageResponse: any) => {
                        console.log("pageResponse: ", pageResponse);
                        this.lineChartList = pageResponse;
                    }, error: (e: any) => {
                        this.loggingService.error('Failed to load Line Activities By User. Please try again.', e);
                        this.loading = false;
                    }, complete: () => {
                        this.loading = false;
                        this.loggingService.info('Load Line Activities By User successfully.');
                    }
                });
            }
        });

    }

    getColor(value: number): string {
        if (value > 25) return 'primary';
        if (value > 15) return 'accent';
        return 'warn';
    }
}
