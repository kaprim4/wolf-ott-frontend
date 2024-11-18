import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, debounceTime, of, Subject, switchMap } from 'rxjs';
import { Apps } from 'src/app/shared/models/apps';
import { Page } from 'src/app/shared/models/page';
import { AppsService } from 'src/app/shared/services/apps.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrl: './applications-list.component.scss'
})
export class ApplicationsListComponent implements OnInit {
  displayedColumns: string[] = [
      'chk',
      'id',
      'thumbnail',
      'title',
      'url',
      'createdAt',
      'updatedAt',
      'action',
  ];

  dataSource = new MatTableDataSource<Apps>([]);
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
      private appsService: AppsService,
      private notificationService: NotificationService
  ) {
      this.loadApplications();
  }

  ngOnInit(): void {
      this.loadApplications();
      // Subscribe to search input changes
      this.searchSubject.pipe(
          debounceTime(300), // Wait for 300ms pause in events
          switchMap(searchTerm => this.appsService.getApps<Apps>(searchTerm, this.pageIndex, this.pageSize))
      ).subscribe(response => {
          this.dataSource.data = response.content;
          this.totalElements = response.totalElements;
      });
  }

  ngAfterViewInit(): void {
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.sort?.sortChange.subscribe(() => this.loadApplications());
      this.paginator?.page.subscribe(() => this.loadApplications());
  }


  filter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteApplication(id: number): void {
      if (confirm('Are you sure you want to delete this record?')) {
          this.appsService.deleteApp(id).subscribe(() => {
              this.dataSource.data = this.dataSource.data.filter(pkg => pkg.id !== id);
          });
      }
  }

  loadApplications(): void {
      const page = this.paginator?.pageIndex || this.pageIndex;
      const size = this.paginator?.pageSize || this.pageSize;
      this.loading = true;

      this.appsService.getApps<Apps>('', page, size).pipe(
          catchError(error => {
              console.error('Failed to load applications', error);
              this.loading = false;
              this.notificationService.error('Failed to load applications. Please try again.');
              return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<Apps>);
          })
      ).subscribe(pageResponse => {
          this.dataSource.data = pageResponse.content;
          this.totalElements = pageResponse.totalElements;
          this.loading = false;
      });
  }
}
