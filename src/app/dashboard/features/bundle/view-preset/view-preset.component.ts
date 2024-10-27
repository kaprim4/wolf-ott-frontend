import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PresetFactory } from 'src/app/shared/factories/preset.factory';
import { SelectionModel } from '@angular/cdk/collections';
import { PresetDetail } from 'src/app/shared/models/preset';
import { MatTableDataSource } from '@angular/material/table';
import { PresetService } from 'src/app/shared/services/preset.service';
import { BouquetList, IBouquet } from 'src/app/shared/models/bouquet';
import { BouquetService } from 'src/app/shared/services/bouquet.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-view-preset',
  templateUrl: './view-preset.component.html',
  styleUrl: './view-preset.component.scss'
})
export class ViewPresetComponent implements OnInit {
  id: number;
  bouquetsDisplayedColumns: string[] = [
    'select',
    'name',
    'streams',
    'movies',
    'series',
    'stations',
    // 'budget',
];

loading: boolean = false;

bouquetsLoading:boolean = false;

bouquets: BouquetList[];
bouquetsSelection = new SelectionModel<IBouquet>(true, []);
bouquetsDataSource = new MatTableDataSource<BouquetList>([]);
  
  editForm: UntypedFormGroup | any;
  preset: PresetDetail;

  constructor(
    private fb: UntypedFormBuilder,
    private presetService: PresetService,
    private bouquetService: BouquetService,
    private router: Router,
    // public dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private notificationService:NotificationService
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get(
      'id'
  ) as unknown as number;
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

  }
  ngOnInit(): void {
    this.loading = true;
    this.bouquetsLoading = true;
    this.presetService.getPreset<PresetDetail>(this.id).subscribe(preset => {
      this.preset = preset;
      this.editForm.controls['name'].setValue(preset.presetName);
      this.editForm.controls['description'].setValue(preset.presetDescription);
      this.loading = false;
    });
    this.bouquetService
        .getAllBouquets<BouquetList>()
        .subscribe((bouquets: BouquetList[]) => {
            this.bouquets = bouquets;
            this.bouquetsDataSource = new MatTableDataSource<BouquetList>(
                this.bouquets
            );
            const presetBouquets = this.preset.bouquets;
            const selectedBouquets = presetBouquets.map(
                (id) =>
                    this.bouquets.find((bouquet) => bouquet.id === id) || {
                        id: 0,
                    }
            );
            this.bouquetsSelection = new SelectionModel<IBouquet>(
                true,
                selectedBouquets
            );
            this.bouquetsLoading = false;
        });
  }
  
  saveDetail(): void {

    const presetName:string = this.editForm.controls["name"].value;
    const presetDescription:string = this.editForm.controls["description"].value;
    const bouquets: number[] = this.bouquetsSelection.selected.map(bouquet => bouquet.id);

    this.preset.id = this.id;
    this.preset.presetName = presetName;
    this.preset.presetDescription = presetDescription;
    this.preset.bouquets = bouquets;

    this.presetService.updatePreset(this.preset).subscribe(preset => {
      this.notificationService.success(`Presset Updated Successfully`)
      this.router.navigate(['/apps/bundles/presets/list']);
    })
    
  }


  masterToggle(): void {
    this.isAllSelected()
        ? this.bouquetsSelection.clear()
        : this.bouquetsDataSource.data.forEach((row) =>
              this.bouquetsSelection.select(row)
          );
}

isAllSelected(): boolean {
  const numSelected = this.bouquetsSelection.selected.length;
  const numRows = this.bouquetsDataSource.data.length;
  return numSelected === numRows;
}

checkboxLabel(row?: BouquetList): string {
  if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${
      this.bouquetsSelection.isSelected(row) ? 'deselect' : 'select'
  } row ${row.bouquetOrder + 1}`;
}
}