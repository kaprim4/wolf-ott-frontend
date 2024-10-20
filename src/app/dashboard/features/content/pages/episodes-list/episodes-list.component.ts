import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EpisodeList} from "../../../../../shared/models/episode";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {EpisodeService} from "../../../../../shared/services/episode.service";
import {Page} from "../../../../../shared/models/page";
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-episodes-list',
    templateUrl: './episodes-list.component.html',
    styleUrl: './episodes-list.component.scss'
})
export class EpisodesListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'title',
        'season',
        'number',
        'serie',
        'action',
    ];

    dataSource = new MatTableDataSource<EpisodeList>([]);
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

    constructor(private episodeService: EpisodeService, private notificationService: NotificationService) {
        // this.loadEpisodes();
    }

    ngOnInit(): void {
        this.loadEpisodes();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.episodeService.getEpisodes<EpisodeList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadEpisodes());
        this.paginator?.page.subscribe(() => this.loadEpisodes());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadEpisodes(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);
        this.loading = true; // Start loading
        this.episodeService.getEpisodes<EpisodeList>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load episodes', error);
                this.loading = false;
                this.notificationService.error('Failed to load episodes. Please try again.');
                return of({content: [], totalElements: 0, totalPages: 0, size: 0, number: 0} as Page<EpisodeList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }
}

