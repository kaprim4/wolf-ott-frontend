import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {Page} from "../../../../../shared/models/page";
import { UserLogList } from 'src/app/shared/models/user-log';
import { CategoryList } from 'src/app/shared/models/category';
import { UserLogService } from 'src/app/shared/services/user-log.service';

@Component({
    selector: 'app-user-logs-list',
    templateUrl: './user-logs-list.component.html',
    styleUrl: './user-logs-list.component.scss'
})
export class UserLogsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'reseller',
        'line',
        'action_package',
        'cost',
        'credit',
        'date',
        'action',
    ];

    dataSource = new MatTableDataSource<UserLogList>([]);
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    private searchSubject = new Subject<string>();
    searchValue = '';

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    categories: CategoryList[] = [];

    constructor(private logService:UserLogService) {
        // this.loadStreams();
    }

    ngOnInit(): void {
        this.loadLogs();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.logService.getUserLogs<UserLogList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });

        // this.categoryService.getAllCategories<CategoryList>().subscribe(categories => {
        //     this.categories = categories;
        // });
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
                console.error('Failed to load streams', error);
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

    getCategories(idx: number[]): string {
        return this.categories.filter(category => idx.includes(category.id))
            .map(category => category.name)
            .join(', ');
    }
}
