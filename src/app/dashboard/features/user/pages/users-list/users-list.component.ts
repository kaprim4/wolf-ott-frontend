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
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'chk',
    'id',
    'username',
    'owner',
    'ip',
    'status',
    '# OF Line',
    'Last Login',
    'action',
  ];

    dataSource = new MatTableDataSource<UserList>([]);
    totalElements = 0;
    pageSize = 10;
    pageIndex = 0;
    sortDirection = 'asc';
    sortActive = 'id';
    loading: boolean = true;

    private searchSubject = new Subject<string>(); // Subject for search input
    searchValue = '';

    pageEvent: PageEvent;

  allComplete: boolean = false;

  usersList: UserList[];


  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  constructor(private userService: UserService) {
    // this.userService.getUsers<UserList>('', this.pageIndex, this.pageSize).subscribe(res => {
    //   const usersList = res.content;
    //   this.dataSource = new MatTableDataSource<UserList>(usersList);
    // });
    this.loadUsers();
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateAllComplete(): void {
    console.log("updateAllComplete");
    
  }

  someComplete(): any {
    console.log("someComplete");
    return true;
  }
  setAll(completed: boolean): void {
    console.log("setAll");
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this record ?')) {
      this.userService.deleteUser(id);
      this.dataSource.data = this.dataSource.data.filter(
        (user) => user.id !== id
      );
    }
  }

  loadUsers(): void {
    const page = (this.paginator?.pageIndex || this.pageIndex); //
    const size = this.paginator?.pageSize || this.pageSize; //
    const sortDirection = this.sort?.direction || this.sortDirection;
    const sortActive = this.sort?.active || this.sortActive;

    if (this.searchValue.trim() === '')
        this.userService.getUsers<UserList>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load users', error);
                this.loading = false;
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<UserList>); // Handle error and return an empty page
            })
        ).subscribe(pageResponse => {
          this.usersList = pageResponse.content;
            this.dataSource.data = this.usersList;
            const length = this.totalElements = pageResponse.totalElements;
            const size = this.pageSize = pageResponse.size;
            const page = this.pageIndex = pageResponse.number;
            console.log("Pageable", {page, size, length});
            console.log("Users", this.usersList);
            
            this.dataSource.data.map(line => {
                Object.keys(line).forEach(key => {
                    if (!this.displayedColumns.includes(key)) {
                        this.displayedColumns.push(key);
                    }
                });
            });
            this.loading = false;
        });
    else
        // Trigger search with debounce
        this.searchSubject.next(this.searchValue);

}
}
