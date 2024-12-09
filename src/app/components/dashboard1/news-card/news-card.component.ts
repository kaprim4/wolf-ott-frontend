import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';
import {ArticleService} from "../../../shared/services/article.service";
import {Article, ArticleCard} from "../../../shared/models/article";
import {DatePipe, NgForOf, SlicePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NotificationService} from "../../../shared/services/notification.service";
import {LoggingService} from "../../../services/logging.service";

@Component({
    selector: 'app-news-card',
    standalone: true,
    imports: [MaterialModule, TablerIconsModule, DatePipe, SlicePipe, RouterLink, NgForOf],
    templateUrl: './news-card.component.html',
})
export class AppNewsCardComponent implements OnInit {
    isNewsLoading: boolean = false;

    constructor(
        private articleService: ArticleService,
        protected notificationService: NotificationService,
        private loggingService: LoggingService
    ) {
    }

    cardArticles: ArticleCard[] = [];
    visibleArticles: ArticleCard[] = [];
    currentIndex = 0;

    ngOnInit(): void {
        this.isNewsLoading = true;
        this.articleService.getAllArticles<Article>().subscribe({
            next: (value: Article[]) => {
                if (value.length > 0) {
                    value.map(article => {
                        this.cardArticles.push({
                            id: article.id,
                            content: article.content,
                            createdAt: article.createdAt,
                            updatedAt: article.updatedAt,
                            thumbnail: article.thumbnail,
                            title: article.title,
                            views: 1230,
                            comments: 650,
                        })
                    })
                }
                this.updateVisibleArticles();
            },
            error: (err) => {
                this.notificationService.error('Error while retrieving news');
                this.loggingService.error("'Error while retrieving news'", err);
            },
            complete: () => {
                this.isNewsLoading = false;
                this.notificationService.success('Retrieving news successfully');
                this.loggingService.info("'Retrieving news successfully'");
            }
        });
    }

    updateVisibleArticles(): void {
        this.visibleArticles = this.cardArticles.slice(this.currentIndex, this.currentIndex + 3);
    }

    nextSlide(): void {
        if (this.currentIndex + 3 < this.cardArticles.length) {
            this.currentIndex += 3;
            this.updateVisibleArticles();
        }
    }

    prevSlide(): void {
        if (this.currentIndex > 0) {
            this.currentIndex -= 3;
            this.updateVisibleArticles();
        }
    }
}
