import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../../../../../shared/services/article.service";
import {Article, ArticleCard} from "../../../../../shared/models/article";

@Component({
    selector: 'app-news-view',
    templateUrl: './news-view.component.html',
    styleUrl: './news-view.component.scss'
})
export class NewsViewComponent implements OnInit {
    id: any;
    imagePreview: string | ArrayBuffer | null = null;
    loading: boolean = false;
    article: ArticleCard = {
        comments: 0,
        views: 0,
        content: "",
        id: 0,
        thumbnail: "",
        title: ""
    };

    constructor(
        public router: Router,
        public articleService: ArticleService,
        private activatedRouter: ActivatedRoute,
    ) {
        this.id = this.activatedRouter.snapshot.paramMap.get('id') as unknown as number;
    }

    ngOnInit(): void {
        this.loading = true;
        this.articleService.getArticle<Article>(this.id).subscribe(article => {
            this.article = {
                id: article.id,
                content: article.content,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                thumbnail: article.thumbnail,
                title: article.title,
                views: 1230,
                comments: 650,
            };
            this.imagePreview = this.article.thumbnail;
            this.loading = false;
        });
        console.log(this.article);
    }
}
