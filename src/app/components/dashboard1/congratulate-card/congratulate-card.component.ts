import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexPlotOptions,
    ApexFill,
    ApexMarkers,
    NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from '../../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';
import {UserDetail} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";
import {TokenService} from "../../../shared/services/token.service";
import {StatsService} from "../../../shared/services/stats.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IDashboardStat} from "../../../shared/models/stats";
import {DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NotificationService} from "../../../shared/services/notification.service";

interface month {
    value: string;
    viewValue: string;
}

interface stats {
    id: number;
    color: string;
    title: string;
    subtitle: string;
    icon: string;
}

export interface revenueChart {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    grid: ApexGrid;
    marker: ApexMarkers;
}

@Component({
    selector: 'app-congratulate-card',
    standalone: true,
    imports: [NgApexchartsModule, MaterialModule, TablerIconsModule, DatePipe, SlicePipe, RouterLink, NgForOf],
    templateUrl: './congratulate-card.component.html',
})
export class AppCongratulateCardComponent implements OnInit {
    @ViewChild('chart') chart: ChartComponent = Object.create(null);

    loggedInUser: any;
    user: any;

    openConnections: number = 0;
    onlineUsers: number = 0;
    activeAccounts: number = 0;
    creditsAssigned: number = 0;
    isStatLoading: boolean = false;

    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private statsService: StatsService,
        protected notificationService: NotificationService
    ) {
    }
    currentIndex = 0;

    ngOnInit(): void {
        this.isStatLoading = true;
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });
        this.getStats();
    }

    getStats(): void {
        const rStart = Date.now();
        this.statsService.getStats("dashboard").subscribe({
            next: (data: HttpResponse<IDashboardStat>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.openConnections = data.body.open_connections;
                    this.onlineUsers = data.body.online_users;
                    this.activeAccounts = data.body.active_accounts;
                    this.creditsAssigned = data.body.credits_assigned;
                    const delay = 1000 - (Date.now() - rStart);
                    setTimeout(() => this.getStats(), delay > 0 ? delay : 0);
                }
                console.log('This contains body: ', data.body);
            },
            error: (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    setTimeout(() => this.getStats(), 1000);
                    this.notificationService.error('Error while Retrieving Stats');
                    console.error("'Error while Retrieving Stats: '", err.message);
                }
            },
            complete: () => {
                this.isStatLoading = false;
                this.notificationService.success('Retrieving Stats successfully');
                console.info("'Retrieving Stats successfully'");
            }
        });
    }

    stats: stats[] = [
        {
            id: 1,
            color: 'success',
            title: `${this.openConnections} Connections`,
            subtitle: 'Live Connections',
            icon: 'plug-connected',
        },
        {
            id: 2,
            color: 'info',
            title: `${this.onlineUsers} Line online`,
            subtitle: 'Live Connections',
            icon: 'users',
        },
        {
            id: 3,
            color: 'warning',
            title: `${this.activeAccounts} Active Lines`,
            subtitle: 'Manage Lines',
            icon: 'activity-heartbeat',
        },
        {
            id: 4,
            color: 'info',
            title: `${this.creditsAssigned} Assigned Credits`,
            subtitle: 'Users',
            icon: 'coins',
        },
    ];
}
