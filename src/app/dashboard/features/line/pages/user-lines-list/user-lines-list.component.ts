import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { LineList } from 'src/app/shared/models/line';
import { Page } from 'src/app/shared/models/page';
import { LineService } from 'src/app/shared/services/line.service';

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

  constructor(private lineService: LineService) {
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

    this.sort.sortChange.subscribe(() => this.loadLines());
    this.paginator.page.subscribe(() => this.loadLines());
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

    this.lineService.getLines<LineList>('', page, size).pipe(
      catchError(error => {
        console.error('Failed to load lines', error);
        this.loading = false;
        return of({ content: [], totalPages: 0, totalElements: 0, size: 0, number:0 } as Page<LineList>);
      })
    ).subscribe(pageResponse => {
      this.dataSource.data = pageResponse.content;
      this.totalElements = pageResponse.totalElements;
      this.loading = false;
    });
  }
}
