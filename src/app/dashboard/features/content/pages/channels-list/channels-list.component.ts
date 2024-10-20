import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { catchError, debounceTime, of, Subject, switchMap } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import {ChannelService} from "../../../../../shared/services/channel.service";
import {ChannelList} from "../../../../../shared/models/channel";
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-channels-list',
  templateUrl: './channels-list.component.html',
  styleUrl: './channels-list.component.scss'
})
export class ChannelsListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'name',
        'category',
        'action',
    ];

    dataSource = new MatTableDataSource<ChannelList>([]);
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

    constructor(private channelService: ChannelService, private notificationService: NotificationService) {
        // this.loadChannels();
    }

    ngOnInit(): void {
        this.loadChannels();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.channelService.getChannels<ChannelList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadChannels());
        this.paginator?.page.subscribe(() => this.loadChannels());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadChannels(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);

        this.loading = true; // Start loading
        this.channelService.getChannels<ChannelList>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load channels', error);
                this.loading = false;
                this.notificationService.error('Failed to load channels. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<ChannelList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

}
