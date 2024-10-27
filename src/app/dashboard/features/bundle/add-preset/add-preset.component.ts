import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-add-preset',
  templateUrl: './add-preset.component.html',
  styleUrl: './add-preset.component.scss'
})
export class AddPresetComponent implements OnInit {
  bouquetsDisplayedColumns: string[] = [
    'select',
    'name',
    'streams',
    'movies',
    'series',
    'stations',
    // 'budget',
];
bouquetsLoading:boolean = false;

bouquets: BouquetList[];
bouquetsSelection = new SelectionModel<IBouquet>(true, []);
bouquetsDataSource = new MatTableDataSource<BouquetList>([]);
  
  addForm: UntypedFormGroup | any;
  preset: PresetDetail;

  constructor(
    private fb: UntypedFormBuilder,
    private presetService: PresetService,
    private bouquetService: BouquetService,
    private router: Router,
    // public dialog: MatDialog
    private notificationService:NotificationService
  ) {

    this.preset = PresetFactory.initPresetDetail();

    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }
  ngOnInit(): void {
    this.bouquetsLoading = true;
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

    const presetName:string = this.addForm.controls["name"].value;
    const presetDescription:string = this.addForm.controls["description"].value;
    const bouquets: number[] = this.bouquetsSelection.selected.map(bouquet => bouquet.id);

    this.preset.presetName = presetName;
    this.preset.presetDescription = presetDescription;
    this.preset.bouquets = bouquets;

    this.presetService.addPreset(this.preset).subscribe(preset => {
      this.notificationService.success(`Presset Created Successfully`)
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
