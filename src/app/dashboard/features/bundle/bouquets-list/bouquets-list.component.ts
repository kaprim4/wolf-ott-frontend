import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of, Subject } from 'rxjs';
import { BouquetList } from 'src/app/shared/models/bouquet';
import { Page } from 'src/app/shared/models/page';
import { BouquetService } from 'src/app/shared/services/bouquet.service';

@Component({
  selector: 'app-bouquets-list',
  templateUrl: './bouquets-list.component.html',
  styleUrl: './bouquets-list.component.scss'
})
export class BouquetsListComponent {
  displayedColumns: string[] = [
    'chk',
    'id',
    'bouquetName',
    'streams',
    'movies',
    'series',
    'stations',
    'action',
  ];

  dataSource = new MatTableDataSource<BouquetList>([]);
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

  constructor(private bouquetService: BouquetService) {
    this.loadBouquets();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBouquet(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.bouquetService.deleteBouquet(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(bouquet => bouquet.id !== id);
      });
    }
  }

  loadBouquets(): void {
    const page = this.paginator?.pageIndex || this.pageIndex;
    const size = this.paginator?.pageSize || this.pageSize;

    this.bouquetService.getBouquets<BouquetList>('', page, size).pipe(
      catchError(error => {
        console.error('Failed to load bouquets', error);
        this.loading = false;
        return of({ content: [], totalPages: 0, totalElements: 0, size: 0, number:0 } as Page<BouquetList>);
      })
    ).subscribe(pageResponse => {
      this.dataSource.data = pageResponse.content;
      this.totalElements = pageResponse.totalElements;
      this.loading = false;
    });
  }
}
