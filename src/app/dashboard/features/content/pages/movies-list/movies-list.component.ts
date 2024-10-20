import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieList} from "../../../../../shared/models/movie";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MovieService} from "../../../../../shared/services/movie.service";
import {Page} from "../../../../../shared/models/page";
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryList } from 'src/app/shared/models/category';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'name',
        'category',
        'action',
    ];

    dataSource = new MatTableDataSource<MovieList>([]);
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

    categories: CategoryList[] = [];

    constructor(private movieService: MovieService, private categoryService: CategoryService, private notificationService: NotificationService) {
        // this.loadMovies();
    }

    ngOnInit(): void {
        this.loadMovies();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.movieService.getMovies<MovieList>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });

        this.categoryService.getAllCategories<CategoryList>().subscribe(categories => {
            this.categories = categories;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadMovies());
        this.paginator?.page.subscribe(() => this.loadMovies());
    }

    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    loadMovies(): void {
        const page = (this.paginator?.pageIndex || this.pageIndex);
        const size = (this.paginator?.pageSize || this.pageSize);

        this.loading = true; // Start loading
        this.movieService.getMovies<MovieList>('', page, size).pipe(
            catchError(error => {
                console.error('Failed to load movies', error);
                this.loading = false;
                this.notificationService.error('Failed to load movies. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<MovieList>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content;
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
        
    }

    getCategories(idx: number[]):string {
        return this.categories.filter(category => idx.includes(category.id))
                              .map(category => category.name)
                              .join(', ');
    }

}
