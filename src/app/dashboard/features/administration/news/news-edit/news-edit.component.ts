import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Article} from "../../../../../shared/models/article";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../../shared/services/notification.service";
import {ArticleService} from "../../../../../shared/services/article.service";
import {LoggingService} from "../../../../../services/logging.service";

@Component({
    selector: 'app-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrl: './news-edit.component.scss'
})
export class NewsEditComponent implements OnInit {

    id: number = 0;
    editForm: UntypedFormGroup | any;
    article: Article = {
        content: "",
        id: 0,
        thumbnail: "",
        title: ""
    };
    imagePreview: string | ArrayBuffer | null = null;
    loading: boolean = false;

    constructor(
        private fb: UntypedFormBuilder,
        private articleService: ArticleService,
        private router: Router,
        public dialog: MatDialog,
        protected notificationService: NotificationService,
        private activatedRouter: ActivatedRoute,
        private loggingService: LoggingService
    ) {
        this.id = this.activatedRouter.snapshot.paramMap.get('id') as unknown as number;
        this.editForm = this.fb.group({
            title: new FormControl("", [Validators.required]),
            content: new FormControl("", [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.articleService.getArticle<Article>(this.id).subscribe({
            next: (article) => {
                this.article = article;
            },
            error: (err) => {
                this.notificationService.error("An error has occured", err)
            },
            complete: () => {
                this.editForm.controls['title'].setValue(this.article.title);
                this.editForm.controls['content'].setValue(this.article.content);
                this.imagePreview = this.article.thumbnail;
                this.notificationService.success("Fetch success");
            }
        });
    }

    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.article.thumbnail = reader.result as string; // Stocke l'image en base64
            };
            reader.readAsDataURL(file);
        }
    }

    saveDetail(): void {
        this.loading = true;
        this.article.id = this.id;

        const title = this.editForm.controls['title'].value;
        const content = this.editForm.controls['content'].value;

        this.article.title = title;
        this.article.content = content;

        this.articleService.updateArticle(this.article).subscribe({
            next: () => {
                // Navigate after successful save
                this.router.navigate(['/apps/administration/news/list']);
            },
            error: (err) => {
                // Handle error (show notification or alert)
                this.notificationService.error('Error while saving news');
                this.loggingService.error("'Error while saving news'", err);
            },
            complete:()=>{
                this.loading = false;
            }
        });
    }
}
