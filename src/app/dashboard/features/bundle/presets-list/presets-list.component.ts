import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, debounceTime, of, Subject, switchMap } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { PresetList } from 'src/app/shared/models/preset';
import { PresetService } from 'src/app/shared/services/preset.service';

@Component({
  selector: 'app-presets-list',
  templateUrl: './presets-list.component.html',
  styleUrl: './presets-list.component.scss'
})
export class PresetsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'chk',
    'id',
    'presetName',
    'presetDescription',
    'status',
    'createdAt',
    'action',
  ];

  dataSource = new MatTableDataSource<PresetList>([]);
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

  constructor(private presetService: PresetService) {
    this.loadPresets();
  }
  ngOnInit(): void {
    this.loadPresets();
    // Subscribe to search input changes
    this.searchSubject.pipe(
        debounceTime(300), // Wait for 300ms pause in events
        switchMap(searchTerm => this.presetService.getPresets<PresetList>(searchTerm, this.pageIndex, this.pageSize))
    ).subscribe(response => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
    });
}

ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.sortChange.subscribe(() => this.loadPresets());
    this.paginator.page.subscribe(() => this.loadPresets());
}

  filter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePreset(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.presetService.deletePreset(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(preset => preset.id !== id);
      });
    }
  }

  loadPresets(): void {
    const page = this.paginator?.pageIndex || this.pageIndex;
    const size = this.paginator?.pageSize || this.pageSize;

    this.presetService.getPresets<PresetList>('', page, size).pipe(
      catchError(error => {
        console.error('Failed to load presets', error);
        this.loading = false;
        return of({ content: [], totalPages: 0, totalElements: 0, size: 0, number:0 } as Page<PresetList>);
      })
    ).subscribe(pageResponse => {
      this.dataSource.data = pageResponse.content;
      this.totalElements = pageResponse.totalElements;
      this.loading = false;
    });
  }
}
