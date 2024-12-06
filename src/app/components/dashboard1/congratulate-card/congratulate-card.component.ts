import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ChartComponent,
    NgApexchartsModule,
} from 'ng-apexcharts';
import {MaterialModule} from '../../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';
import {UserDetail} from "../../../shared/models/user";
import {UserService} from "../../../shared/services/user.service";
import {TokenService} from "../../../shared/services/token.service";
import {DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NotificationService} from "../../../shared/services/notification.service";
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import {HttpErrorResponse} from "@angular/common/http";

interface stats {
    id: number;
    color: string;
    title: string;
    subtitle: string;
    icon: string;
    getValue: Function
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
        protected notificationService: NotificationService,
        private dashboardService: DashboardService
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
        this.isStatLoading = true;
        const rStart = Date.now();
        this.dashboardService.getGlobalStates().subscribe({
            next:(state) => {
                console.log("Global State:", state);
                this.openConnections = state.onlineLines;
                this.onlineUsers = state.onlineUsers;
                this.activeAccounts = state.activeLines;
                this.creditsAssigned = state.assignedCredits;
                this.isStatLoading = false;
                const delay = 10000 - (Date.now() - rStart);
                //setTimeout(() => this.getStats(), delay > 0 ? delay : 0);

            },
            error: (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    //setTimeout(() => this.getStats(), 1000);
                    this.notificationService.error('Error while Retrieving Stats');
                    console.error("'Error while Retrieving Stats: '", err.message);
                }
            },
                complete: () => {
                    this.isStatLoading = false;
                    //this.notificationService.success('Retrieving Stats successfully');
                    console.info("'Retrieving Stats successfully'");
                }
        });
    }

    get getStates(): stats[] {
        return [
            {
                id: 1,
                color: 'success',
                title: `${this.onlineUsers} User connections`,
                subtitle: 'Live Connections',
                icon: 'users',
                getValue: () => {
                    return this.onlineUsers;
                }
            },
            {
                id: 2,
                color: 'info',
                title: `${this.openConnections} Line online`,
                subtitle: 'Live Connections',
                icon: 'plug-connected',
                getValue: () => {
                    return this.openConnections;
                }
            },
            {
                id: 3,
                color: 'warning',
                title: `${this.activeAccounts} Active Lines`,
                subtitle: 'Manage Lines',
                icon: 'activity-heartbeat',
                getValue: () => {
                    return this.activeAccounts;
                }
            },
            {
                id: 4,
                color: 'info',
                title: `${this.creditsAssigned} Assigned Credits`,
                subtitle: 'Users',
                icon: 'coins',
                getValue: () => {
                    return this.creditsAssigned;
                }
            },
        ];
    };
}
