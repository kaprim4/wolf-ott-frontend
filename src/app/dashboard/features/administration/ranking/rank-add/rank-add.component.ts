import {Component, OnInit} from '@angular/core';

import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { Rank } from 'src/app/shared/models/rank';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-rank-add',
  templateUrl: './rank-add.component.html',
  styleUrl: './rank-add.component.scss'
})
export class RankAddComponent implements OnInit {


  addForm: UntypedFormGroup | any;
  rank: Rank = {
    id: 0,
    title: '',
    maxPoints: 0,
    minPoints: 0,
    badgeImage: ''
  };
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
      private fb: UntypedFormBuilder,
      private rankingService: RankingService,
      private router: Router,
      public dialog: MatDialog,
      protected notificationService: NotificationService
  ) {
      this.addForm = this.fb.group({
          title: new FormControl("", [Validators.required]),
          maxPoints: new FormControl(0, [Validators.required]),
          minPoints: new FormControl(0, [Validators.required]),
      });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              this.imagePreview = reader.result;
              this.rank.badgeImage = reader.result as string; // Stocke l'image en base64
          };
          reader.readAsDataURL(file);
      }
  }

  saveDetail(): void {
    const title = this.addForm.controls['title'].value;
    const maxPoints = this.addForm.controls['maxPoints'].value;
    const minPoints = this.addForm.controls['minPoints'].value;

    this.rank.title = title;
    this.rank.maxPoints = maxPoints;
    this.rank.minPoints = minPoints;

    this.rankingService.addRank(this.rank).subscribe({
      next: () => {
        // Navigate after successful save
        this.router.navigate(['/apps/administration/ranking/list']);
      },
      error: (err) => {
        // Handle error (show notification or alert)
        this.notificationService.error('Error while saving rank');
        console.error("'Error while saving rank'", err);
        
      }
    });
    
  }
}
