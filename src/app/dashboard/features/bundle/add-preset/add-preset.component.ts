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

bouquets: BouquetList[];
bouquetsSelection = new SelectionModel<IBouquet>(true, []);
bouquetsDataSource = new MatTableDataSource<BouquetList>([]);
  
  addForm: UntypedFormGroup | any;
  rows: UntypedFormArray;
  preset: PresetDetail;

  ///////////////////////////////////////////////////////////
  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private presetService: PresetService,
    private bouquetService: BouquetService,
    private router: Router,
    public dialog: MatDialog
  ) {
    // tslint:disable-next-line - Disables all
    this.preset = PresetFactory.initPresetDetail();
    ///////////////////////////////////////////////////////////

    this.addForm = this.fb.group({});

    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());
  }
  ngOnInit(): void {
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
        });
  }

  ////////////////////////////////////////////////////////////////////////////////////
  onAddRow(): void {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number): void {
    const totalCostOfItem =
      this.addForm.get('rows')?.value[rowIndex].unitPrice *
      this.addForm.get('rows')?.value[rowIndex].units;

    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      units: ['', Validators.required],
      unitPrice: ['', Validators.required],
      itemTotal: ['0'],
    });
  }

  itemsChanged(): void {
    let total: number = 0;
    // tslint:disable-next-line - Disables all
    for (
      let t = 0;
      t < (<UntypedFormArray>this.addForm.get('rows')).length;
      t++
    ) {
      if (
        this.addForm.get('rows')?.value[t].unitPrice !== '' &&
        this.addForm.get('rows')?.value[t].units
      ) {
        total =
          this.addForm.get('rows')?.value[t].unitPrice *
            this.addForm.get('rows')?.value[t].units +
          total;
      }
    }
    this.subTotal = total;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
  }
  ////////////////////////////////////////////////////////////////////

  saveDetail(): void {

    this.presetService.addPreset(this.preset);
    this.router.navigate(['/apps/bundles/presets/list']);
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
