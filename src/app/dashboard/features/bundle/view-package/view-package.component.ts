import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PackageService } from 'src/app/shared/services/package.service';
import { PackageDetail } from 'src/app/shared/models/package';
import { PackageFactory } from 'src/app/shared/factories/package.factory';
import { SelectionModel } from '@angular/cdk/collections';
import { BouquetList, IBouquet } from 'src/app/shared/models/bouquet';
import { MatTableDataSource } from '@angular/material/table';
import { BouquetService } from 'src/app/shared/services/bouquet.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-view-package',
  templateUrl: './view-package.component.html',
  styleUrl: './view-package.component.scss'
})
export class ViewPackageComponent {
  id:number;

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
  package: PackageDetail;

  ///////////////////////////////////////////////////////////
  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  principal: any;

  constructor(
    private fb: UntypedFormBuilder,
    private packageService: PackageService,
    private bouquetService: BouquetService,
    private router: Router,
    public dialog: MatDialog,
    private activatedRouter: ActivatedRoute, 
    private tokenService: TokenService
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get(
      'id'
  ) as unknown as number;
    this.package = PackageFactory.initPackageDetail();
    this.packageService.getPackage<PackageDetail>(this.id).subscribe(pkg => {
      this.package = pkg;
    })

    this.addForm = this.fb.group({});

    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());

    this.principal = this.tokenService.getPayload();
  }
  ngOnInit(): void {
    this.bouquetService
        .getAllBouquets<BouquetList>()
        .subscribe((bouquets: BouquetList[]) => {
            this.bouquets = bouquets;
            this.bouquetsDataSource = new MatTableDataSource<BouquetList>(
                this.bouquets
            );
            const packageBouquets = this.package.bouquets;
            const selectedBouquets = packageBouquets.map(
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

      if(!this.isAdmin)
        this.addForm.disable()
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
    this.packageService.addPackage(this.package);
    this.router.navigate(['/apps/bundles/packages']);
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

get isAdmin() {
  return !!this.principal?.isAdmin;
}
}