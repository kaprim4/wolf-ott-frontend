import {Component} from '@angular/core';
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
export class NewsAddComponent {

    addForm: UntypedFormGroup | any;
    article: Article = {
        content: "",
        id: 0,
        imageUrl: "",
        title: ""
    };
    imagePreview: string | ArrayBuffer | null = null;

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
                this.article.imageUrl = reader.result as string; // Stocke l'image en base64
            };
            reader.readAsDataURL(file);
        }
    }

    saveDetail(): void {
        this.articleService.addArticle(this.article);
        this.router.navigate(['/apps/administration/news/list']);
    }
}
