import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {StationList} from "../../../../../shared/models/station";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {StationService} from "../../../../../shared/services/station.service";
import {Page} from "../../../../../shared/models/page";

@Component({
  selector: 'app-stations-list',
  templateUrl: './stations-list.component.html',
  styleUrl: './stations-list.component.scss'
})
export class StationsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'stationname',
        'ip',
        'status',
        'lastLogin',
        'action',
    ];

    dataSource = new MatTableDataSource<StationList>([]);
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

    constructor(private stationService: StationService) {
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
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort.sortChange.subscribe(() => this.loadStations());
        this.paginator.page.subscribe(() => this.loadStations());
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
                console.error('Failed to load stations', error);
                this.loading = false;
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<StationList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

}
