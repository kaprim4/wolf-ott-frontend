import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppDialogOverviewComponent } from 'src/app/pages/ui-components/dialog/dialog.component';
import { PackageService } from '../../services/package.service';
import { LineService } from '../../services/line.service';
import { PackageList } from '../../models/package';
import { FormControl } from '@angular/forms';
import { CreateLine, ILine, LineList } from '../../models/line';
import { NotificationService } from '../../services/notification.service';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-quick-m3u',
  templateUrl: './quick-m3u.component.html',
  styleUrl: './quick-m3u.component.scss'
})
export class QuickM3uComponent implements OnInit {
  loading: boolean = false;
  username: string = '';
  password: string = '';

  lineCreated: boolean = false;

  packages: PackageList[] = [];
  filteredPackages: PackageList[] = [];
  selectedPackage: PackageList;
  packageSearchTerm = '';
  dropdownOpened = false;

  packageSearchCtrl = new FormControl();

  constructor(private lineService: LineService, private packageService: PackageService, private notificationService: NotificationService) { 
    this.username = LineService.generateRandomUsername();
    this.password = LineService.generateRandomPassword();
  }
  ngOnInit(): void {
    this.packageService.getAllPackages<PackageList>().subscribe(list => {
      this.packages = list;
      this.filteredPackages = this.packages;
    })
  }

  createLine() {
    this.loading = true;
    const line: CreateLine = {
        id: 0,
        username: this.username,
        password: this.password,
        packageId: this.selectedPackage.id,
        isTrial: true,
        bouquets: ''
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
            this.loading = false;
        })
    ).subscribe();
}

  get canCreate(): boolean { return !this.loading && !this.selectedPackage?.id }

  get playlistUrl(): string { return `http://r2u.tech/playlist/${this.username}/${this.password}/m3u_plus`; }
  get downloadUrl(): string { return `http://r2u.tech/get.php?username=${this.username}&password=${this.password}&type=m3u_plus&output=mpegts`; }

  copyToClipboard(url: string) {
      navigator.clipboard.writeText(url).then(() => {
          console.log('Copied to clipboard: ', url);
      }).catch(err => {
          console.error('Could not copy: ', err);
      });
  }

  downloadM3U(url: string) {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
  
              // Get the filename from the Content-Disposition header
              const contentDisposition = response.headers.get('Content-Disposition');
              let filename = 'playlist.m3u'; // Default filename
  
              if (contentDisposition) {
                  const matches = /filename[^;=\n]*=((['"]).*?\2|([^;\n]*))/i.exec(contentDisposition);
                  if (matches != null && matches[1]) {
                      filename = matches[1].replace(/['"]/g, ''); // Clean up quotes
                  }
              }
  
              return response.blob().then(blob => ({ blob, filename })); // Return both the Blob and the filename
          })
          .then(({ blob, filename }) => {
              const link = document.createElement('a');
              const blobUrl = window.URL.createObjectURL(blob); // Create a URL for the Blob
              link.href = blobUrl;
              link.download = filename; // Set the filename from response
              document.body.appendChild(link);
              link.click(); // Programmatically click the link to trigger the download
              link.remove(); // Remove the link from the document
              window.URL.revokeObjectURL(blobUrl); // Clean up the URL.createObjectURL
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
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
