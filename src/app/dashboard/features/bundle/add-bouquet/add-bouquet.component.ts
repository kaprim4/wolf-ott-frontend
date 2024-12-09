import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { BouquetDetail } from 'src/app/shared/models/bouquet';
import { MatTableDataSource } from '@angular/material/table';
import { BouquetService } from 'src/app/shared/services/bouquet.service';
import { BouquetFactory } from 'src/app/shared/factories/bouquet.factory';
import { StreamService } from 'src/app/shared/services/stream.service';
import { MovieService } from 'src/app/shared/services/movie.service';
import { StationService } from 'src/app/shared/services/station.service';
import { SerieService } from 'src/app/shared/services/serie.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryList } from 'src/app/shared/models/category';
import { IStream, StreamList } from 'src/app/shared/models/stream';
import { catchError, finalize, of } from 'rxjs';
import { Page } from 'src/app/shared/models/page';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IMovie, MovieList } from 'src/app/shared/models/movie';
import { ISerie, SerieList } from 'src/app/shared/models/serie';
import { IStation, StationList } from 'src/app/shared/models/station';

import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { trigger, transition, style, animate } from '@angular/animations';
import {LoggingService} from "../../../../services/logging.service";

@Component({
    selector: 'app-add-bouquet',
    templateUrl: './add-bouquet.component.html',
    styleUrl: './add-bouquet.component.scss',
    animations: [
        trigger('dragAnimation', [
          transition(':enter', [
            style({ opacity: 0 }),
            animate('300ms', style({ opacity: 1 }))
          ]),
          transition(':leave', [
            animate('300ms', style({ opacity: 0 }))
          ])
        ])
      ]
})
export class AddBouquetComponent implements OnInit, AfterViewInit {
    moviesDisplayedColumns: string[] = [
        'select',
        'name',
        'category',
        // 'connections',
        // 'budget',
        // 'actions',
    ];

    seriesDisplayedColumns: string[] = [
        'select',
        'name',
        'category',
        // 'connections',
        // 'budget',
        // 'actions',
    ];

    stationDisplayedColumns: string[] = [
        'select',
        'name',
        'category',
        // 'connections',
        // 'budget',
        // 'actions',
    ];

    streams: Page<StreamList>;
    streamsSelection = new SelectionModel<IStream>(true, []);
    streamsDataSource = new MatTableDataSource<StreamList>([]);
    streamsPage: number = 0;
    streamsSize: number = 10;
    streamsTotalElements: number = 0;
    @ViewChild(MatSort) streamSort: MatSort;
    @ViewChild(MatPaginator) streamPaginator: MatPaginator;

    movies: Page<MovieList>;
    moviesSelection = new SelectionModel<IMovie>(true, []);
    moviesDataSource = new MatTableDataSource<MovieList>([]);
    moviesPage: number = 0;
    moviesSize: number = 10;
    moviesTotalElements: number = 0;
    @ViewChild(MatSort) movieSort: MatSort;
    @ViewChild(MatPaginator) moviePaginator: MatPaginator;

    series: Page<SerieList>;
    seriesSelection = new SelectionModel<ISerie>(true, []);
    seriesDataSource = new MatTableDataSource<SerieList>([]);
    seriesPage: number = 0;
    seriesSize: number = 10;
    seriesTotalElements: number = 0;
    @ViewChild(MatSort) serieSort: MatSort;
    @ViewChild(MatPaginator) seriePaginator: MatPaginator;

    stations: Page<StationList>;
    stationsSelection = new SelectionModel<IStation>(true, []);
    stationsDataSource = new MatTableDataSource<StationList>([]);
    stationsPage: number = 0;
    stationsSize: number = 10;
    stationsTotalElements: number = 0;
    @ViewChild(MatSort) stationSort: MatSort;
    @ViewChild(MatPaginator) stationPaginator: MatPaginator;

    addForm: UntypedFormGroup | any;
    rows: UntypedFormArray;
    bouquet: BouquetDetail;

    subTotal = 0;
    vat = 0;
    grandTotal = 0;

    loadingStreams: boolean;
    loadingMovies: boolean;
    loadingSeries: boolean;
    loadingStations: boolean;

    categories: CategoryList[] = [];

    constructor(
        private fb: UntypedFormBuilder,
        private bouquetService: BouquetService,
        private streamService: StreamService,
        private movieService: MovieService,
        private serieService: SerieService,
        private stationService: StationService,
        private categoryService: CategoryService,
        private router: Router,
        public dialog: MatDialog,
        protected notificationService: NotificationService,
        private loggingService: LoggingService
    ) {
        this.bouquet = BouquetFactory.initBouquetDetail();

        this.addForm = this.fb.group({});
    }
    ngAfterViewInit(): void {
        this.streamsDataSource.sort = this.streamSort;
        this.streamSort?.sortChange.subscribe(() => this.loadStreams());
        this.streamPaginator?.page.subscribe(() => this.loadStreams());

        this.moviesDataSource.sort = this.movieSort;
        this.movieSort?.sortChange.subscribe(() => this.loadMovies());
        this.moviePaginator?.page.subscribe(() => this.loadMovies());

        this.seriesDataSource.sort = this.serieSort;
        this.serieSort?.sortChange.subscribe(() => this.loadSeries());
        this.seriePaginator?.page.subscribe(() => this.loadSeries());

        this.stationsDataSource.sort = this.stationSort;
        this.stationSort?.sortChange.subscribe(() => this.loadStations());
        this.stationPaginator?.page.subscribe(() => this.loadStations());
    }
    ngOnInit(): void {
        this.categoryService.getAllCategories<CategoryList>().subscribe(categories => {
            this.categories = categories;
        });
        this.loadStreams();
        this.loadMovies();
        this.loadSeries();
        this.loadStations();
    }

    saveDetail(): void {
        this.bouquetService.addBouquet(this.bouquet);
        this.router.navigate(['/apps/bundles/bouquets/list']);
    }

    masterStreamsToggle(): void {
        this.isAllMoviesSelected()
            ? this.streamsSelection.clear()
            : this.streamsDataSource.data.forEach((row) =>
                  this.streamsSelection.select(row)
              );
    }

    isAllStreamsSelected(): boolean {
        const numSelected = this.streamsSelection.selected.length;
        const numRows = this.streamsDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxStreamLabel(row?: any): string {
        if (!row) {
            return `${this.isAllStreamsSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.streamsSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    masterMoviesToggle(): void {
        this.isAllMoviesSelected()
            ? this.moviesSelection.clear()
            : this.moviesDataSource.data.forEach((row) =>
                  this.moviesSelection.select(row)
              );
    }

    isAllMoviesSelected(): boolean {
        const numSelected = this.moviesSelection.selected.length;
        const numRows = this.moviesDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxMovieLabel(row?: any): string {
        if (!row) {
            return `${this.isAllMoviesSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.moviesSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    masterSeriesToggle(): void {
        this.isAllSeriesSelected()
            ? this.seriesSelection.clear()
            : this.seriesDataSource.data.forEach((row) =>
                  this.seriesSelection.select(row)
              );
    }

    isAllSeriesSelected(): boolean {
        const numSelected = this.seriesSelection.selected.length;
        const numRows = this.seriesDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxSerieLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSeriesSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.seriesSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    masterStationsToggle(): void {
        this.isAllStationsSelected()
            ? this.stationsSelection.clear()
            : this.stationsDataSource.data.forEach((row) =>
                  this.stationsSelection.select(row)
              );
    }

    isAllStationsSelected(): boolean {
        const numSelected = this.stationsSelection.selected.length;
        const numRows = this.seriesDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxStationLabel(row?: any): string {
        if (!row) {
            return `${
                this.isAllStationsSelected() ? 'select' : 'deselect'
            } all`;
        }
        return `${
            this.stationsSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    getCategories(idx: number[]):string {
        return this.categories.filter(category => idx.includes(category.id))
                              .map(category => category.name)
                              .join(', ');
    }

    loadStreams(): void {
        const page = (this.streamPaginator?.pageIndex || this.streamsPage);
        const size = (this.streamPaginator?.pageSize || this.streamsSize);

        this.loadingStreams = true; // Start loading
        this.streamService.getStreams<StreamList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load streams', error);
                this.loadingStreams = false;
                this.notificationService.error('Failed to load streams. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<StreamList>);
            })
        ).subscribe(pageResponse => {
            this.streamsDataSource.data = pageResponse.content;
            this.streamsTotalElements = pageResponse.totalElements;
            this.loadingStreams = false;
        });
    }

    loadMovies(): void {
        const page = (this.moviePaginator?.pageIndex || this.moviesPage);
        const size = (this.moviePaginator?.pageSize || this.moviesSize);

        this.loadingMovies = true; // Start loading
        this.movieService.getMovies<MovieList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load movies', error);
                this.loadingMovies = false;
                this.notificationService.error('Failed to load movies. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<MovieList>);
            })
        ).subscribe(pageResponse => {
            this.moviesDataSource.data = pageResponse.content;
            this.moviesTotalElements = pageResponse.totalElements;
            this.loadingMovies = false;
        });
    }

    loadSeries(): void {
        const page = (this.seriePaginator?.pageIndex || this.seriesPage);
        const size = (this.seriePaginator?.pageSize || this.seriesSize);

        this.loadingSeries = true; // Start loading
        this.serieService.getSeries<SerieList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load series', error);
                this.loadingSeries = false;
                this.notificationService.error('Failed to load series. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<SerieList>);
            })
        ).subscribe(pageResponse => {
            this.seriesDataSource.data = pageResponse.content;
            this.seriesTotalElements = pageResponse.totalElements;
            this.loadingSeries = false;
        });
    }

    loadStations(): void {
        const page = (this.stationPaginator?.pageIndex || this.stationsPage);
        const size = (this.stationPaginator?.pageSize || this.stationsSize);

        this.loadingStations = true; // Start loading
        this.stationService.getStations<StationList>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load series', error);
                this.loadingStations = false;
                this.notificationService.error('Failed to load stations. Please try again.');
                return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 } as Page<StationList>);
            })
        ).subscribe(pageResponse => {
            this.stationsDataSource.data = pageResponse.content;
            this.stationsTotalElements = pageResponse.totalElements;
            this.loadingStations = false;
        });
    }

    onSttreamCategoryDrop(event: CdkDragDrop<CategoryList[]>): void {
        // Move the item in the array to the new position
        // moveItemInArray(this.cazz.selected, event.previousIndex, event.currentIndex);
    }
}
