import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppDialogOverviewComponent} from 'src/app/pages/ui-components/dialog/dialog.component';
import {PackageService} from '../../services/package.service';
import {LineService} from '../../services/line.service';
import {PackageList} from '../../models/package';
import {FormControl} from '@angular/forms';
import {CreateLine, ILine, LineList} from '../../models/line';
import {NotificationService} from '../../services/notification.service';
import {catchError, finalize, tap, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {UserDetail} from "../../models/user";
import {UserService} from "../../services/user.service";
import {TokenService} from "../../services/token.service";

@Component({
    selector: 'app-quick-m3u',
    templateUrl: './quick-m3u.component.html',
    styleUrl: './quick-m3u.component.scss'
})
export class QuickM3uComponent implements OnInit {
    username: string = '';
    password: string = '';
    lineCreated: boolean = false;
    packages: PackageList[] = [];
    filteredPackages: PackageList[] = [];
    selectedPackage: PackageList;
    packageSearchTerm = '';
    dropdownOpened = false;
    packageSearchCtrl = new FormControl();
    server: string = "http://r2u.tech/";
    isLoading: boolean = false;
    loggedInUser: any;
    user: any;

    constructor(
        private lineService: LineService,
        private packageService: PackageService,
        private notificationService: NotificationService,
        private toastr: ToastrService,
        private tokenService: TokenService,
        private userService: UserService
    ) {
        this.username = LineService.generateRandomUsername();
        this.password = LineService.generateRandomPassword();
    }

    ngOnInit(): void {
        this.packageService.getAllPackages<PackageList>().subscribe(list => {
            this.packages = list;
            this.filteredPackages = this.packages;
        })
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });
    }

    createLine() {
        this.isLoading = true;
        const line: CreateLine = {
            id: 0,
            username: this.username,
            password: this.password,
            packageId: this.selectedPackage.id,
            isTrial: true,
            bouquets: '',
            memberId: this.user.id
        };
        this.lineService.addLine(line).pipe(
            tap(() => {
                // This will only run if the line creation is successful
                this.notificationService.success('Line Created Successfully');
                this.lineCreated = true;
            }),
            catchError((ex) => {
                // Handle the error here
                // Optionally notify the user of the error
                this.notificationService.error('Failed to create line.'); // Example error notification
                return throwError(ex); // Rethrow the error for further handling if needed
            }),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe();
    }

    get canCreate(): boolean {
        return !this.isLoading && !this.selectedPackage?.id
    }

    get playlistUrl(): string {
        return `${this.server}playlist/${this.username}/${this.password}/m3u_plus`;
    }

    get downloadUrl(): string {
        return `${this.server}get.php?username=${this.username}&password=${this.password}&type=m3u_plus&output=mpegts`;
    }

    copyToClipboard(url: string) {
        this.isLoading = true;
        navigator.clipboard.writeText(url).then(() => {
            console.log('Copied to clipboard: ', url);
            this.toastr.success('Copied to clipboard.', 'Succès');
            this.isLoading = false; // Fin du chargement
        }).catch(err => {
            console.error('Could not copy: ', err);
            this.toastr.error('Could not copy.', 'Erreur');
            this.isLoading = false;
        });
    }

    downloadM3U(url: string) {
        this.isLoading = true;
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
            this.isLoading = false;
            this.toastr.success('Download completed', 'Succès');
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            this.isLoading = false;
            this.toastr.error('Download failed', 'Erreur');
        });
    }

    private filterPackages(value: string): any[] {
        const filterValue = value?.toLowerCase();
        return this.packages.filter(pkg => pkg?.packageName?.toLowerCase().includes(filterValue));
    }

    packagesFilterOptions() {
        const searchTermLower = this.packageSearchTerm.toLowerCase();
        this.filteredPackages = this.packages.filter((pkg) =>
            pkg.packageName.toLowerCase().includes(searchTermLower)
        );
    }

    onPackagesDropdownOpened(opened: boolean) {
        this.dropdownOpened = opened;
        if (opened) {
            // Reset search term and filter options when the dropdown opens
            this.packageSearchTerm = '';
            this.packagesFilterOptions();
        }
    }
}
