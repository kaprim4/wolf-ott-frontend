import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {catchError, debounceTime, of, Subject, switchMap} from 'rxjs';
import {BouquetList} from 'src/app/shared/models/bouquet';
import {Page} from 'src/app/shared/models/page';
import {BouquetService} from 'src/app/shared/services/bouquet.service';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {TokenService} from 'src/app/shared/services/token.service';
import {LoggingService} from "../../../../services/logging.service";

@Component({
    selector: 'app-bouquets-list',
    templateUrl: './bouquets-list.component.html',
    styleUrl: './bouquets-list.component.scss'
})
export class BouquetsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'bouquetName',
        'streams',
        'movies',
        'series',
        'stations',
        //'action',
    ];

    dataSource = new MatTableDataSource<BouquetList>([]);
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    private searchSubject = new Subject<string>();
    searchValue = '';

    principal: any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private bouquetService: BouquetService, private notificationService: NotificationService, private tokenService: TokenService,
                private loggingService: LoggingService) {
        this.loadBouquets();
        this.principal = this.tokenService.getPayload();
    }

    ngOnInit(): void {
        this.loadBouquets();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.bouquetService.getBouquets<BouquetList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadBouquets());
        this.paginator?.page.subscribe(() => this.loadBouquets());
    }


    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteBouquet(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.bouquetService.deleteBouquet(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(bouquet => bouquet.id !== id);
            });
        }
    }

    loadBouquets(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.bouquetService.getBouquets<BouquetList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load bouquets', error);
                this.loading = false;
                this.notificationService.error('Failed to load bouquets. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<BouquetList>);
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

    get isAdmin() {
        return !!this.principal?.isAdmin;
    }
}
