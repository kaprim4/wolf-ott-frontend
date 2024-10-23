import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
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
import {ToastrService} from "ngx-toastr";

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
        username: string,
        password: string,
        enterAnimationDuration: string = '0ms',
        exitAnimationDuration: string = '0ms'
    ): void {
        const dialogRef = this.dialog.open(AppDialogOverviewComponent, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: {username, password}
        });
        // dialogRef.componentInstance.username = username;
        // dialogRef.componentInstance.password = password;
    }
}


//  1
@Component({
    selector: 'dialog-overview',
    styles: `.input-group {
        display: flex;
        align-items: center;
        // margin-bottom: 16px; /* Adjust spacing between rows */
    }

    .mat-form-field {
        flex: 1; /* Take up remaining space */
        margin-right: 8px; /* Space between input and buttons */
    }

    .action-btn {
        transform: translateY(-25%);
        margin-left: 12px;
    }`,
    standalone: true,
    imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule, MatFormField, MatInput, MatLabel, MatOption, MatSelect, MatSelectTrigger, ReactiveFormsModule, SharedModule],
    templateUrl: 'dialog-m3u.component.html',
})
export class AppDialogOverviewComponent {
    username: string = '';
    password: string = '';
    server: string = "http://r2u.tech:80/";
    isDownloading: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AppDialogOverviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {
            username: string;
            password: string
        },
        private toastr: ToastrService
    ) {
        this.username = data.username;
        // console.log("Username :", this.username);
        this.password = data.password;
        // console.log("Password :", this.password);
    }

    get playlistUrl(): string {
        return `${this.server}playlist/${this.username}/${this.password}/m3u_plus`;
    }

    get downloadUrl(): string {
        return `${this.server}get.php?username=${this.username}&password=${this.password}&type=m3u_plus&output=mpegts`;
    }

    copyToClipboard(url: string) {
        this.isDownloading = true; // Démarrer le chargement
        navigator.clipboard.writeText(url).then(() => {
            console.log('Copied to clipboard: ', url);
            this.toastr.success('Copied to clipboard.', 'Succès');
            this.isDownloading = false; // Fin du chargement
        }).catch(err => {
            console.error('Could not copy: ', err);
            this.toastr.error('Could not copy.', 'Erreur');
            this.isDownloading = false; // Fin du chargement
        });
    }

    downloadM3U(url: string) {
        this.isDownloading = true; // Démarrer le chargement
        this.toastr.info('Download in progress...', 'Download');
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Get the filename from the Content-Disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = `playlist_${this.username}_plus.m3u`; // Default filename
            if (contentDisposition) {
                const matches = /filename[^;=\n]*=((['"]).*?\2|([^;\n]*))/i.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, ''); // Clean up quotes
                }
            }
            return response.blob().then(blob => ({blob, filename})); // Return both the Blob and the filename
        }).then(({blob, filename}) => {
            const link = document.createElement('a');
            const blobUrl = window.URL.createObjectURL(blob); // Create a URL for the Blob
            link.href = blobUrl;
            link.download = filename; // Set the filename from response
            document.body.appendChild(link);
            link.click(); // Programmatically click the link to trigger the download
            link.remove(); // Remove the link from the document
            window.URL.revokeObjectURL(blobUrl); // Clean up the URL.createObjectURL
            this.isDownloading = false; // Fin du chargement
            this.toastr.success('Download completed', 'Succès');
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            this.isDownloading = false; // Fin du chargement même en cas d'erreur
            this.toastr.error('Download failed', 'Erreur');
        });
    }
}
