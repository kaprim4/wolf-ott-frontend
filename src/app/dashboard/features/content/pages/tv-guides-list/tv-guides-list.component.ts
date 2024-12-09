import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TvGuideService} from "../../../../../shared/services/tv-guide.service";
import {Page} from "../../../../../shared/models/page";
import {TvGuideList} from "../../../../../shared/models/tv-guide";
import {LoggingService} from "../../../../../services/logging.service";

@Component({
  selector: 'app-tv-guides-list',
  templateUrl: './tv-guides-list.component.html',
  styleUrl: './tv-guides-list.component.scss'
})
export class TvGuidesListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'tvGuidename',
        'ip',
        'status',
        'lastLogin',
        'action',
    ];

    dataSource = new MatTableDataSource<TvGuideList>([]);
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

    constructor(private tvGuideService: TvGuideService,
                private loggingService: LoggingService) {
        // this.loadTvGuides();
    }

    ngOnInit(): void {
        this.loadTvGuides();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.tvGuideService.getTvGuides<TvGuideList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort.sortChange.subscribe(() => this.loadTvGuides());
        this.paginator.page.subscribe(() => this.loadTvGuides());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadTvGuides(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);

        this.loading = true; // Start loading
        this.tvGuideService.getTvGuides<TvGuideList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load tvGuides', error);
                this.loading = false;
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<TvGuideList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

}
