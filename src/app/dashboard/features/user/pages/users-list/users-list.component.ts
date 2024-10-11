import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of, Subject } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { IUser, UserList } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'chk',
    'id',
    'username',
    'ip',
    'status',
    'lastLogin',
    'action',
  ];

  dataSource = new MatTableDataSource<UserList>([]);
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

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
      });
    }
  }

  loadUsers(): void {
    const page = this.paginator?.pageIndex || this.pageIndex;
    const size = this.paginator?.pageSize || this.pageSize;

    this.userService.getUsers<UserList>('', page, size).pipe(
      catchError(error => {
        console.error('Failed to load users', error);
        this.loading = false;
        return of({ content: [], totalPages: 0, totalElements: 0, size: 0, number:0 } as Page<UserList>);
      })
    ).subscribe(pageResponse => {
      this.dataSource.data = pageResponse.content;
      this.totalElements = pageResponse.totalElements;
      this.loading = false;
    });
  }
}
