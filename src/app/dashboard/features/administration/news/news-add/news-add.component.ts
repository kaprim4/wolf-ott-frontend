import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Article} from "../../../../../shared/models/article";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../../shared/services/notification.service";
import {ArticleService} from "../../../../../shared/services/article.service";

@Component({
    selector: 'app-news-add',
    templateUrl: './news-add.component.html',
    styleUrl: './news-add.component.scss'
})
export class NewsAddComponent implements OnInit {
    html: "<p>Hello World!</p>";
    addForm: UntypedFormGroup | any;
    article: Article = {
        id: 0,
        title: "",
        content: "",
        thumbnail: ""
    };
    imagePreview: string | ArrayBuffer | null = null;
    loading: boolean = false;

    ngOnInit(): void {

    }

    constructor(
        private fb: UntypedFormBuilder,
        private articleService: ArticleService,
        private router: Router,
        public dialog: MatDialog,
        protected notificationService: NotificationService
    ) {
        this.addForm = this.fb.group({
            title: new FormControl("", [Validators.required]),
            content: new FormControl("", [Validators.required]),
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
        const title = this.addForm.controls['title'].value;
        const content = this.addForm.controls['content'].value;
        this.article.title = title;
        this.article.content = content;
        this.articleService.addArticle(this.article).subscribe({
            next: () => {
                // Navigate after successful save
                this.router.navigate(['/apps/administration/news/list']);
            },
            error: (err) => {
                // Handle error (show notification or alert)
                this.notificationService.error('Error while saving news');
                console.error("'Error while saving news'", err);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
}
