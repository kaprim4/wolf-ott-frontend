import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subject, catchError, debounceTime, of, switchMap} from 'rxjs';
import {LineList} from 'src/app/shared/models/line';
import {Page} from 'src/app/shared/models/page';
import {LineService} from 'src/app/shared/services/line.service';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {WolfGuardDialogComponent} from '../../components/wolf-guard-dialog/wolf-guard-dialog.component';
import {M3UDialogComponent} from '../../components/m3u-dialog/m3u-dialog.component';
import {TokenService} from 'src/app/shared/services/token.service';

@Component({
    selector: 'app-user-lines-list',
    templateUrl: './user-lines-list.component.html',
    styleUrl: './user-lines-list.component.scss'
})
export class UserLinesListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        "username",
        // "memberId",
        "password",
        "owner",
        "status",
        "online",
        "trial",
        "active",
        "connections",
        "expiration",
        "lastConnection",
        'action',
    ];

    dataSource = new MatTableDataSource<LineList>([]);
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

    constructor(
        private lineService: LineService,
        private notificationService: NotificationService,
        public dialog: MatDialog,
        private tokenService: TokenService
    ) {
        // this.loadLines();
        this.principal = this.tokenService.getPayload();
    }

    ngOnInit(): void {
        this.loadLines();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.lineService.getLines<LineList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadLines());
        this.paginator?.page.subscribe(() => this.loadLines());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteLine(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.lineService.deleteLine(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(line => line.id !== id);
            });
        }
    }

    loadLines(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.lineService.getLines<LineList>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load lines', error);
                this.loading = false;
                this.notificationService.error('Failed to load lines. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<LineList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            console.log(pageResponse.content)
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

    // 1
    openDialog(
        username: string,
        password: string,
        enterAnimationDuration: string = '0ms',
        exitAnimationDuration: string = '0ms'
    ): void {
        const dialogRef = this.dialog.open(M3UDialogComponent, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {username, password}
        });
        // dialogRef.componentInstance.username = username;
        // dialogRef.componentInstance.password = password;
    }

    openWolfGuard(
        line: LineList,
        enterAnimationDuration: string = '0ms',
        exitAnimationDuration: string = '0ms'
    ): void {
        const dialogRef = this.dialog.open(WolfGuardDialogComponent, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {line}
        });
        // dialogRef.componentInstance.username = username;
        // dialogRef.componentInstance.password = password;
    }

    banLine(id: number): void {
        if (confirm('Are you sure you want to ban this record?')) {
            this.lineService.banLine(id).subscribe({
                next: (response) => {
                    console.log("Success to Suspend Connection: ", response);
                    this.loadLines();
                    this.notificationService.success("This line Connection has been killed.");
                },
                error: (err) => {
                    console.error("Failed to Suspend Line: ", err)
                },
                complete: () => {
                }
            });
        }
    }

    disableLine(id: number): void {
        if (confirm('Are you sure you want to disable this record?')) {
            // this.notificationService.success("This line has been disabled.")
            this.lineService.disableLine(id).subscribe({
                next: (response) => {
                    console.log("Success to Disable Line: ", response);
                    this.loadLines();
                    this.notificationService.success("This line has been disabled.");
                },
                error: (err) => {
                    console.error("Failed to Disable Line: ", err)
                },
                complete: () => {
                }
            });
        }
    }

    killLineConnection(id: number): void {
        if (confirm('Are you sure you want to kill this Line Connection?')) {
            this.lineService.killLineConnection(id).subscribe({
                next: (response) => {
                    console.log("Success to Kill Line Connections: ", response);
                    this.notificationService.success("This line connections has been killed.");
                },
                error: (err) => {
                    console.error("Failed to Kill Line Connections: ", err)
                },
                complete: () => {
                }
            });
        }
    }

    killLiveLine(id: number): void {
        if (confirm('Are you sure you want to kill this Live Line?')) {
            this.lineService.killLineConnection(id).subscribe({
                next: (response) => {
                    console.log("Success to Kill Line Lives: ", response);
                    this.notificationService.success("This line lives has been killed.");
                },
                error: (err) => {
                    console.error("Failed to Kill Line Lives: ", err)
                },
                complete: () => {
                }
            });
        }
    }
}
