import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {StationList} from "../../../../../shared/models/station";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {StationService} from "../../../../../shared/services/station.service";
import {Page} from "../../../../../shared/models/page";
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryList } from 'src/app/shared/models/category';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {LoggingService} from "../../../../../services/logging.service";

@Component({
  selector: 'app-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrl: './stations-list.component.scss'
})
export class StationsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'name',
        'category',
        'action',
    ];


    dataSource = new MatTableDataSource<StationList>([]);
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

    categories: CategoryList[] = [];

    constructor(private stationService: StationService,
                private loggingService: LoggingService, private categoryService: CategoryService, private notificationService: NotificationService) {
        // this.loadStations();
    }

    ngOnInit(): void {
        this.loadStations();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.stationService.getStations<StationList>(searchTerm, this.pageIndex, this.pageSize))
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

        this.sort?.sortChange.subscribe(() => this.loadStations());
        this.paginator?.page.subscribe(() => this.loadStations());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadStations(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);

        this.loading = true; // Start loading
        this.stationService.getStations<StationList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load stations', error);
                this.loading = false;
                this.notificationService.error('Failed to load stations. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<StationList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content.sort((a, b) => {
                if (a.id < b.id) return 1;  // Replace 'id' with the desired property
                if (a.id > b.id) return -1;
                return 0;
            });
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
