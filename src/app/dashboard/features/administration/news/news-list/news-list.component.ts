import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Article} from "../../../../../shared/models/article";
import {catchError, debounceTime, of, Subject, switchMap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ArticleService} from "../../../../../shared/services/article.service";
import {NotificationService} from "../../../../../shared/services/notification.service";
import {Page} from "../../../../../shared/models/page";
import {LoggingService} from "../../../../../services/logging.service";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit {
    displayedColumns: string[] = [
        'chk',
        'id',
        'thumbnail',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        'action',
    ];

    dataSource = new MatTableDataSource<Article>([]);
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
        private articleService: ArticleService,
        private notificationService: NotificationService,
        private loggingService: LoggingService
    ) {
        this.loadArticles();
    }

    ngOnInit(): void {
        this.loadArticles();
        // Subscribe to search input changes
        this.searchSubject.pipe(
            debounceTime(300), // Wait for 300ms pause in events
            switchMap(searchTerm => this.articleService.getArticles<Article>(searchTerm, this.pageIndex, this.pageSize))
        ).subscribe(response => {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
        });
    }

    ngAfterViewInit(): void {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.sort?.sortChange.subscribe(() => this.loadArticles());
        this.paginator?.page.subscribe(() => this.loadArticles());
    }


    filter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteArticle(id: number): void {
        if (confirm('Are you sure you want to delete this record?')) {
            this.articleService.deleteArticle(id).subscribe(() => {
                this.dataSource.data = this.dataSource.data.filter(pkg => pkg.id !== id);
            });
        }
    }

    loadArticles(): void {
        const page = this.paginator?.pageIndex || this.pageIndex;
        const size = this.paginator?.pageSize || this.pageSize;
        this.loading = true;

        this.articleService.getArticles<Article>('', page, size).pipe(
            catchError(error => {
                this.loggingService.error('Failed to load articles', error);
                this.loading = false;
                this.notificationService.error('Failed to load articles. Please try again.');
                return of({content: [], totalPages: 0, totalElements: 0, size: 0, number: 0} as Page<Article>);
            })
        ).subscribe(pageResponse => {
            this.dataSource.data = pageResponse.content.sort((a, b) => {
                if (a.id < b.id) return 1;  // Replace 'id' with the desired property
                if (a.id > b.id) return -1;
                return 0;
            });
            this.totalElements = pageResponse.totalElements;
            this.loading = false;
        });
    }
}
