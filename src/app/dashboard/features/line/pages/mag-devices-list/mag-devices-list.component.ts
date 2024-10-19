import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { MagList } from 'src/app/shared/models/mag';
import { Page } from 'src/app/shared/models/page';
import { MagService } from 'src/app/shared/services/mag.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-mag-devices-list',
  templateUrl: './mag-devices-list.component.html',
  styleUrl: './mag-devices-list.component.scss'
})
export class MagDevicesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'chk',
    'id',
    "mac",
    "device",
    "owner",
    "status",
    "online",
    "trial",
    "expiration",
    'action',
  ];

  dataSource = new MatTableDataSource<MagList>([]);
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

  constructor(private magService: MagService, private notificationService: NotificationService) {
    // this.loadMags();
  }
  ngOnInit(): void {
    this.loadMags();
    // Subscribe to search input changes
    this.searchSubject.pipe(
        debounceTime(300), // Wait for 300ms pause in events
        switchMap(searchTerm => this.magService.getMags<MagList>(searchTerm, this.pageIndex, this.pageSize))
    ).subscribe(response => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
    });
}

ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe(() => this.loadMags());
    this.paginator.page.subscribe(() => this.loadMags());
}

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteMag(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.magService.deleteMag(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(line => line.id !== id);
      });
    }
  }

  loadMags(): void {
    const page = this.paginator?.pageIndex || this.pageIndex;
    const size = this.paginator?.pageSize || this.pageSize;
    this.loading = true;

    this.magService.getMags<MagList>('', page, size).pipe(
      catchError(error => {
        console.error('Failed to load lines', error);
        this.loading = false;
        this.notificationService.error('Failed to load mag devices. Please try again.');
        return of({ content: [], totalPages: 0, totalElements: 0, size: 0, number:0 } as Page<MagList>);
      })
    ).subscribe(pageResponse => {
      this.dataSource.data = pageResponse.content;
      this.totalElements = pageResponse.totalElements;
      this.loading = false;
    });
  }
}
