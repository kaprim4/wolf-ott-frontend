import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../../material.module';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableDataSource} from '@angular/material/table';
import {UserLogList} from "../../../shared/models/user-log";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {UserLogService} from "../../../shared/services/user-log.service";
import {catchError, of} from "rxjs";
import {Page} from "../../../shared/models/page";
import {LoggingService} from "../../../services/logging.service";
import {TokenService} from "../../../shared/services/token.service";
import {LineService} from "../../../shared/services/line.service";
import {LineList} from "../../../shared/models/line";

@Component({
    selector: 'app-latest-reviews',
    standalone: true,
    imports: [
        MaterialModule,
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
    ],
    templateUrl: './latest-reviews.component.html',
})
export class AppLatestReviewsComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'type',
        'line_username',
        'owner_username',
        'date'
    ];

    dataSource = new MatTableDataSource<LineList>([]);
    totalElements = 0;
    pageSize = 25;
    sortDirection = 'asc';
    sortActive = 'id';
    expiringLinesloading: boolean = true;

    loggedInUser: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private lineService: LineService,
        private loggingService: LoggingService,
        private tokenService: TokenService,
    ) {
        // this.loadStreams();
    }

    ngOnInit(): void {
        this.loggedInUser = this.tokenService.getPayload();
        this.loadExpiredLines();
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort?.sortChange.subscribe(() => this.loadExpiredLines());
        this.paginator?.page.subscribe(() => this.loadExpiredLines());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadExpiredLines(): void {
        this.expiringLinesloading = true;
        this.lineService.getExpiredLine(this.pageSize).subscribe({
            next: pageResponse => {
                this.dataSource.data = pageResponse;
                this.totalElements = pageResponse.length;
                this.expiringLinesloading = false;
            },
            error: error => {
                this.loggingService.error('Failed to load streams', error);
                this.expiringLinesloading = false;
                this.dataSource.data = [];
            },
            complete: () => {
                this.expiringLinesloading = false;
            }
        });
    }
}
