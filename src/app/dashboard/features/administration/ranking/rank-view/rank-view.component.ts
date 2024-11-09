import {Component, OnInit} from '@angular/core';

import {FormControl, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { Rank } from 'src/app/shared/models/rank';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-rank-view',
  templateUrl: './rank-view.component.html',
  styleUrl: './rank-view.component.scss'
})
export class RankViewComponent implements OnInit {
  id: number = 0;

  editForm: UntypedFormGroup | any;
  rank: Rank = {
    id: 0,
    title: '',
    maxPoints: 0,
    minPoints: 0,
    badgeImageUrl: ''
  };
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
      private fb: UntypedFormBuilder,
      private rankingService: RankingService,
      private router: Router,
      public dialog: MatDialog,
      protected notificationService: NotificationService,
      private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id') as unknown as number;
      this.editForm = this.fb.group({
          title: new FormControl("", [Validators.required]),
          maxPoints: new FormControl(0, [Validators.required]),
          minPoints: new FormControl(0, [Validators.required]),
      });
  }

  ngOnInit(): void {
    this.rankingService.getRank<Rank>(this.id).subscribe(rank => {
      this.rank = rank;
    })
  }

  onFileSelected(event: Event): void {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              this.imagePreview = reader.result;
              this.rank.badgeImageUrl = reader.result as string; // Stocke l'image en base64
          };
          reader.readAsDataURL(file);
      }
  }

  saveDetail(): void {
      this.rankingService.updateRank(this.rank);
      this.router.navigate(['/apps/administration/news/list']);
  }
}
