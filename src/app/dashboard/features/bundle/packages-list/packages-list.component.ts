import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {catchError, debounceTime, of, Subject, switchMap} from 'rxjs';
import {PackageList} from 'src/app/shared/models/package';
import {Page} from 'src/app/shared/models/page';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {PackageService} from 'src/app/shared/services/package.service';
import { TokenService } from 'src/app/shared/services/token.service';
import {LoggingService} from "../../../../services/logging.service";

@Component({
    selector: 'app-packages-list',
    templateUrl: './packages-list.component.html',
    styleUrl: './packages-list.component.scss'
})
export class PackagesListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'packageName',
        'trialDuration',
        'officialDuration',
        'isRestreamer',
        'action',
    ];

    dataSource = new MatTableDataSource<PackageList>([]);
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    private searchSubject = new Subject<string>();
    searchValue = '';

    principal:any;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private packageService: PackageService, private notificationService: NotificationService, private tokenService: TokenService,
                private loggingService: LoggingService) {
        this.loadPackages();
        this.principal = this.tokenService.getPayload();
    }

    ngOnInit(): void {
        this.loadPackages();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.packageService.getPackages<PackageList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadPackages());
        this.paginator?.page.subscribe(() => this.loadPackages());
    }


    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deletePackage(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.packageService.deletePackage(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(pkg => pkg.id !== id);
            });
        }
    }

    loadPackages(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.packageService.getPackages<PackageList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load packages', error);
                this.loading = false;
                this.notificationService.error('Failed to load packages. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<PackageList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

    get isAdmin() {
        return !!this.principal?.isAdmin;
    }
}
