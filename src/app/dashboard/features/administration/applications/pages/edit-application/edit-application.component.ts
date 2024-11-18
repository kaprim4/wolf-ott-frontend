import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Apps } from 'src/app/shared/models/apps';
import { AppsService } from 'src/app/shared/services/apps.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrl: './edit-application.component.scss'
})
export class EditApplicationComponent implements OnInit, OnDestroy {
  id: number;

  editForm: UntypedFormGroup | any;
  app: Apps = {
      id: 0,
      title: "",
      url: "",
      thumbnail: ""
  };
  imagePreview: string | ArrayBuffer | null = null;
  loading: boolean = false;

  ngOnInit(): void {
    this.appsService.getApp(this.id).subscribe(app => {
      this.app = app;
      this.editForm.controls['title'].setValue(this.app.title);
      this.editForm.controls['url'].setValue(this.app.url);
      this.imagePreview = this.app.thumbnail;
    });
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
  }

  constructor(
      private fb: UntypedFormBuilder,
      private appsService: AppsService,
      private router: Router,
      public dialog: MatDialog,
      protected notificationService: NotificationService,
      private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id') as unknown as number;
      this.editForm = this.fb.group({
          title: new FormControl("", [Validators.required]),
          url: new FormControl("", [Validators.required]),
      });
  }


  onFileSelected(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              this.imagePreview = reader.result;
              this.app.thumbnail = reader.result as string; // Stocke l'image en base64
          };
          reader.readAsDataURL(file);
      }
  }

  saveDetail(): void {
      this.loading = true;
      const title = this.editForm.controls['title'].value;
      const url = this.editForm.controls['url'].value;
      this.app.title = title;
      this.app.url = url;
      this.appsService.updateApp(this.app).subscribe({
          next: () => {
              // Navigate after successful save
              this.router.navigate(['/apps/administration/applications/list']);
          },
          error: (err) => {
              // Handle error (show notification or alert)
              this.notificationService.error('Error while saving application');
              console.error("'Error while saving application'", err);
          },
          complete: () => {
              this.loading = false;
          }
      });
  }
}
