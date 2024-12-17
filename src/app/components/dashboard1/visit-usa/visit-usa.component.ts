import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import type {EChartsOption} from 'echarts';
import {NgxEchartsDirective, provideEcharts} from 'ngx-echarts';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MaterialModule} from 'src/app/material.module';
import * as echarts from 'echarts';
import {LineActivityService} from "../../../shared/services/line-activity.service";
import {LineActivityList} from "../../../shared/models/line-activity";
import {catchError, of} from "rxjs";
import {Page} from "../../../shared/models/page";
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
        NgxEchartsDirective,
        DecimalPipe,
        NgForOf,
        NgIf,
        NgClass
    ],
    providers: [provideEcharts()],
    templateUrl: './visit-usa.component.html',
})
export class AppVisitUsaComponent implements OnInit {
    logsLoading: boolean = true;
    lineActivityList: any[] = [];
    topCountries: { name: string; value: number }[] = [];
    totalElements: number = 0;
    page: number = 0;
    size: number = 5000;

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
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
            this.topCountries = this.processData(this.lineActivityList);
            this.activityService.getLineActivitiesByUser<LineActivityList>(this.user.id, '', this.page, this.size).pipe(
                catchError(error => {
                    this.loggingService.error('Failed to load streams', error);
                    this.logsLoading = false;
                    this.notificationService.error('Failed to load streams. Please try again.');
                    return of({
                        content: [],
                        totalElements: 0,
                        totalPages: 0,
                        size: 0,
                        number: 0
                    } as Page<LineActivityList>);
                })
            ).subscribe(pageResponse => {
                this.lineActivityList = pageResponse.content;
                this.loggingService.log("lineActivityList: ", this.lineActivityList)
                this.totalElements = pageResponse.totalElements;
                this.logsLoading = false;
                this.topCountries = this.processData(this.lineActivityList);
            });
        });
    }

    processData(data: any[]): { name: string; value: number }[] {
        const countryCounts: { [key: string]: number } = {};
        data.forEach(item => {
            if (countryCounts[item.country]) {
                countryCounts[item.country]++;
            } else {
                countryCounts[item.country] = 1;
            }
        });
        const total = data.length;
        return Object.entries(countryCounts)
            .map(([name, count]) => ({name, value: (count / total) * 100}))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }

    getColor(value: number): string {
        if (value > 25) return 'primary';
        if (value > 15) return 'accent';
        return 'warn';
    }
}
