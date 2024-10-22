import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subject, catchError, debounceTime, of, switchMap} from 'rxjs';
import {LineList} from 'src/app/shared/models/line';
import {Page} from 'src/app/shared/models/page';
import {LineService} from 'src/app/shared/services/line.service';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../../shared/shared.module";

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

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private lineService: LineService,
        private notificationService: NotificationService,
        public dialog: MatDialog
    ) {
        // this.loadLines();
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
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }

    // 1
    openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string
    ): void {
        this.dialog.open(AppDialogOverviewComponent, {
            width: '290px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }
}


//  1
@Component({
    selector: 'dialog-overview',
    standalone: true,
    imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule, MatFormField, MatInput, MatLabel, MatOption, MatSelect, MatSelectTrigger, ReactiveFormsModule, SharedModule],
    templateUrl: 'dialog-m3u.component.html',
})
export class AppDialogOverviewComponent {

    constructor(
        public dialogRef: MatDialogRef<AppDialogOverviewComponent>
    ) {
    }
}
