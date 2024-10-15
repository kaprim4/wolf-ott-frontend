import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { BouquetDetail } from 'src/app/shared/models/bouquet';
import { MatTableDataSource } from '@angular/material/table';
import { BouquetService } from 'src/app/shared/services/bouquet.service';
import { BouquetFactory } from 'src/app/shared/factories/bouquet.factory';

@Component({
    selector: 'app-add-bouquet',
    templateUrl: './add-bouquet.component.html',
    styleUrl: './add-bouquet.component.scss',
})
export class AddBouquetComponent implements OnInit {
    moviesDisplayedColumns: string[] = [
        'select',
        'name',
        'category',
        'connections',
        // 'budget',
        // 'actions',
    ];

    seriesDisplayedColumns: string[] = [
        'select',
        'name',
        'category',
        'connections',
        // 'budget',
        // 'actions',
    ];

    stationDisplayedColumns: string[] = [
        'select',
        'name',
        'category',
        'connections',
        // 'budget',
        // 'actions',
    ];

    streams: any[];
    streamsSelection = new SelectionModel<any>(true, []);
    streamsDataSource = new MatTableDataSource<any>([]);

    movies: any[];
    moviesSelection = new SelectionModel<any>(true, []);
    moviesDataSource = new MatTableDataSource<any>([]);

    series: any[];
    seriesSelection = new SelectionModel<any>(true, []);
    seriesDataSource = new MatTableDataSource<any>([]);

    stations: any[];
    stationsSelection = new SelectionModel<any>(true, []);
    stationsDataSource = new MatTableDataSource<any>([]);

    addForm: UntypedFormGroup | any;
    rows: UntypedFormArray;
    bouquet: BouquetDetail;

    subTotal = 0;
    vat = 0;
    grandTotal = 0;

    constructor(
        private fb: UntypedFormBuilder,
        private bouquetService: BouquetService,
        private router: Router,
        public dialog: MatDialog
    ) {
        this.bouquet = BouquetFactory.initBouquetDetail();

        this.addForm = this.fb.group({});

        this.rows = this.fb.array([]);
        this.addForm.addControl('rows', this.rows);
        this.rows.push(this.createItemFormGroup());
    }
    ngOnInit(): void {}

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

    saveDetail(): void {
        this.bouquetService.addBouquet(this.bouquet);
        this.router.navigate(['/apps/bundles/bouquets/list']);
    }
    masterStreamsToggle(): void {
        this.isAllMoviesSelected()
            ? this.streamsSelection.clear()
            : this.streamsDataSource.data.forEach((row) =>
                  this.streamsSelection.select(row)
              );
    }

    isAllStreamsSelected(): boolean {
        const numSelected = this.streamsSelection.selected.length;
        const numRows = this.streamsDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxStreamLabel(row?: any): string {
        if (!row) {
            return `${this.isAllStreamsSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.streamsSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    masterMoviesToggle(): void {
        this.isAllMoviesSelected()
            ? this.moviesSelection.clear()
            : this.moviesDataSource.data.forEach((row) =>
                  this.moviesSelection.select(row)
              );
    }

    isAllMoviesSelected(): boolean {
        const numSelected = this.moviesSelection.selected.length;
        const numRows = this.moviesDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxMovieLabel(row?: any): string {
        if (!row) {
            return `${this.isAllMoviesSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.moviesSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    masterSeriesToggle(): void {
        this.isAllSeriesSelected()
            ? this.seriesSelection.clear()
            : this.seriesDataSource.data.forEach((row) =>
                  this.seriesSelection.select(row)
              );
    }

    isAllSeriesSelected(): boolean {
        const numSelected = this.seriesSelection.selected.length;
        const numRows = this.seriesDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxSerieLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSeriesSelected() ? 'select' : 'deselect'} all`;
        }
        return `${
            this.seriesSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }

    masterStationsToggle(): void {
        this.isAllStationsSelected()
            ? this.stationsSelection.clear()
            : this.seriesDataSource.data.forEach((row) =>
                  this.stationsSelection.select(row)
              );
    }

    isAllStationsSelected(): boolean {
        const numSelected = this.stationsSelection.selected.length;
        const numRows = this.seriesDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxStationLabel(row?: any): string {
        if (!row) {
            return `${
                this.isAllStationsSelected() ? 'select' : 'deselect'
            } all`;
        }
        return `${
            this.stationsSelection.isSelected(row) ? 'deselect' : 'select'
        } row ${row.name}`;
    }
}
