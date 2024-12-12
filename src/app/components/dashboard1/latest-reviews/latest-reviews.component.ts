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

    dataSource = new MatTableDataSource<UserLogList>([]);
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    expiringLinesloading: boolean = true;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private logService:UserLogService,
        private loggingService: LoggingService
    ) {
        // this.loadStreams();
    }

    ngOnInit(): void {
        this.loadLogs();
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadLogs());
        this.paginator?.page.subscribe(() => this.loadLogs());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadLogs(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);

        this.expiringLinesloading = true; // Start loading
        this.logService.getUserLogs<UserLogList>('id,desc', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load streams', error);
                this.expiringLinesloading = false;
                return of({content: [], totalElements: 0, totalPages: 0, size: 0, number: 0} as Page<UserLogList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.expiringLinesloading = false;
        });
    }
}
