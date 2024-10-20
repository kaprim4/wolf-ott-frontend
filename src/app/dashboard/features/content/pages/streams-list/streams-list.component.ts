import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { catchError, debounceTime, of, Subject, switchMap } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import {StreamService} from "../../../../../shared/services/stream.service";
import {StreamList} from "../../../../../shared/models/stream";
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryList } from 'src/app/shared/models/category';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-streams-list',
    templateUrl: './streams-list.component.html',
    styleUrls: ['./streams-list.component.scss']
})
export class StreamsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'name',
        'category',
        'action',
    ];

    dataSource = new MatTableDataSource<StreamList>([]);
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

    constructor(private streamService: StreamService, private categoryService: CategoryService, private notificationService: NotificationService) {
        // this.loadStreams();
    }

    ngOnInit(): void {
        this.loadStreams();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.streamService.getStreams<StreamList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });

        this.categoryService.getAllCategories<CategoryList>().subscribe(categories => {
            this.categories = categories;
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

        this.loading = true; // Start loading
        this.streamService.getStreams<StreamList>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load streams', error);
                this.loading = false;
                this.notificationService.error('Failed to load streams. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<StreamList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

    getCategories(idx: number[]):string {
        return this.categories.filter(category => idx.includes(category.id))
                              .map(category => category.name)
                              .join(', ');
    }
}
