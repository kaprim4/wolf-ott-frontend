import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";

import {NotificationService} from "../../../../../shared/services/notification.service";
import {Page} from "../../../../../shared/models/page";
import { LineActivityList } from 'src/app/shared/models/line-activity';
import { LineActivityService } from 'src/app/shared/services/line-activity.service';
import {LoggingService} from "../../../../../services/logging.service";
import {UserDetail} from "../../../../../shared/models/user";
import {TokenService} from "../../../../../shared/services/token.service";
import {UserService} from "../../../../../shared/services/user.service";

@Component({
    selector: 'app-activity-logs-list',
    templateUrl: './activity-logs-list.component.html',
    styleUrl: './activity-logs-list.component.scss'
})
export class ActivityLogsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        //'quality',
        'line',
        'stream',
        'player',
        'isp',
        'ip',
        'duration',
        'output',
        'actions',
    ];

    dataSource = new MatTableDataSource<LineActivityList>([]);
    totalElements = 0;
    pageSize = 25;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    private searchSubject = new Subject<string>();
    searchValue = '';

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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
        // this.loadStreams();
    }

    ngOnInit(): void {
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;

            this.loadStreams();

            // Subscribe to search input changes
            this.searchSubject.pipe(
                debounceTime(300), // Wait for 300ms pause in events
                switchMap(searchTerm => this.activityService.getLineActivitiesByUser<LineActivityList>(this.user.id, searchTerm, this.pageIndex, this.pageSize))
            ).subscribe(response => {
                this.dataSource.data = response.content;
                this.totalElements = response.totalElements;
                this.loading = false;
            });
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort?.sortChange.subscribe(() => this.loadStreams());
        this.paginator?.page.subscribe(() => this.loadStreams());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadStreams(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);
        this.activityService.getLineActivitiesByUser<LineActivityList>(this.user.id, '', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load streams', error);
                this.loading = false;
                this.notificationService.error('Failed to load streams. Please try again.');
                return of({content: [], totalElements: 0, totalPages: 0, size: 0, number: 0} as Page<LineActivityList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

    calculateDuration(startAt: string, endAt: string): string {
        const start = new Date(startAt);
        const end = new Date(endAt);
        const duration = end.getTime() - start.getTime();

        // Calculate duration in hours and minutes
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
      }
}
