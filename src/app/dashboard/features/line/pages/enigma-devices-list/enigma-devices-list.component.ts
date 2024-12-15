import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subject, catchError, debounceTime, of, switchMap} from 'rxjs';
import {EnigmaList} from 'src/app/shared/models/enigma';
import {Page} from 'src/app/shared/models/page';
import {EnigmaService} from 'src/app/shared/services/enigma.service';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {LoggingService} from "../../../../../services/logging.service";

@Component({
    selector: 'app-enigma-devices-list',
    templateUrl: './enigma-devices-list.component.html',
    styleUrl: './enigma-devices-list.component.scss'
})
export class EnigmaDevicesListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        "mac",
        "ip",
        "owner",
        "status",
        "online",
        "trial",
        "expiration",
        'action',
    ];

    dataSource = new MatTableDataSource<EnigmaList>([]);
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

    constructor(private enigmaService: EnigmaService,
                private loggingService: LoggingService, private notificationService: NotificationService) {
        // this.loadEnigmas();
    }

    ngOnInit(): void {
        this.loadEnigmas();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.enigmaService.getEnigmas<EnigmaList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadEnigmas());
        this.paginator?.page.subscribe(() => this.loadEnigmas());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteEnigma(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.enigmaService.deleteEnigma(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(line => line.id !== id);
            });
        }
    }

    loadEnigmas(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.enigmaService.getEnigmas<EnigmaList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load lines', error);
                this.loading = false;
                this.notificationService.error('Failed to load enigma devices. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<EnigmaList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }
}
