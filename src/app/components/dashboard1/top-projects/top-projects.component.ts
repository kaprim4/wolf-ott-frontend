import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../../material.module';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {LineActivityList} from "../../../shared/models/line-activity";
import {MatTableDataSource} from "@angular/material/table";
import {LineActivityService} from "../../../shared/services/line-activity.service";
import {UserLogList} from "../../../shared/models/user-log";
import {UserLogService} from "../../../shared/services/user-log.service";
import {Page} from "../../../shared/models/page";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CategoryList} from "../../../shared/models/category";
import {LoggingService} from "../../../services/logging.service";

interface month {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-top-projects',
    standalone: true,
    imports: [MaterialModule, CommonModule, MatMenuModule, MatButtonModule],
    templateUrl: './top-projects.component.html',
})
export class AppTopProjectsComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = [
        'reseller',
        'line',
        'action_package',
        'date'
    ];

    dataSource = new MatTableDataSource<UserLogList>([]);
    totalElements = 0;
    pageSize = 25;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private logService: UserLogService,
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

        this.loading = true; // Start loading
        this.logService.getUserLogs<UserLogList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load streams', error);
                this.loading = false;
                // this.notificationService.error('Failed to load streams. Please try again.');
                return of({content: [], totalElements: 0, totalPages: 0, size: 0, number: 0} as Page<UserLogList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }
}
