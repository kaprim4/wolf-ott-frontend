import {Component, OnInit, ViewChild} from '@angular/core';
import {Rank} from "../../../../../shared/models/rank";
import {MatTableDataSource} from "@angular/material/table";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {RankingService} from "../../../../../shared/services/ranking.service";
import {NotificationService} from "../../../../../shared/services/notification.service";
import {Page} from "../../../../../shared/models/page";

@Component({
    selector: 'app-rank-list',
    templateUrl: './rank-list.component.html',
    styleUrl: './rank-list.component.scss'
})
export class RankListComponent  implements OnInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'badgeImage',
        'title',
        'minPoints',
        'maxPoints',
        'action',
    ];

    dataSource = new MatTableDataSource<Rank>([]);
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

    constructor(
        private rankingService: RankingService,
        private notificationService: NotificationService
    ) {
        this.loadRanks();
    }

    ngOnInit(): void {
        this.loadRanks();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.rankingService.getRanks<Rank>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadRanks());
        this.paginator?.page.subscribe(() => this.loadRanks());
    }


    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteRank(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.rankingService.deleteRank(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(pkg => pkg.id !== id);
            });
        }
    }

    loadRanks(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.rankingService.getRanks<Rank>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load ranks', error);
                this.loading = false;
                this.notificationService.error('Failed to load ranks. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<Rank>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }
}
