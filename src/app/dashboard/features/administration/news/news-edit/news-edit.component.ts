import { Component, OnDestroy, OnInit } from '@angular/core';

import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Article} from "../../../../../shared/models/article";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../../shared/services/notification.service";
import {ArticleService} from "../../../../../shared/services/article.service";

import { Editor } from "ngx-editor";

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrl: './news-edit.component.scss'
})
export class NewsEditComponent implements OnInit, OnDestroy {

  id:number = 0;
  editor: Editor;
  html: "<p>Hello World!</p>";

  editForm: UntypedFormGroup | any;
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
      protected notificationService: NotificationService,
      private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id') as unknown as number;
      this.editForm = this.fb.group({
          title: new FormControl("", [Validators.required]),
          content: new FormControl("", [Validators.required]),
      });
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.articleService.getArticle<Article>(this.id).subscribe(article => {
      this.article = article;
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    this.article.id = this.id;
      this.articleService.updateArticle(this.article);
      this.router.navigate(['/apps/administration/news/list']);
  }
}