import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PresetFactory} from 'src/app/shared/factories/preset.factory';
import {SelectionModel} from '@angular/cdk/collections';
import {PresetDetail} from 'src/app/shared/models/preset';
import {MatTableDataSource} from '@angular/material/table';
import {PresetService} from 'src/app/shared/services/preset.service';
import {BouquetList, IBouquet} from 'src/app/shared/models/bouquet';
import {BouquetService} from 'src/app/shared/services/bouquet.service';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {trigger, transition, style, animate} from '@angular/animations';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {TokenService} from 'src/app/shared/services/token.service';
import {LoggingService} from "../../../../services/logging.service";
import {UserService} from "../../../../shared/services/user.service";
import {UserDetail} from "../../../../shared/models/user";

@Component({
    selector: 'app-view-preset',
    templateUrl: './view-preset.component.html',
    styleUrl: './view-preset.component.scss',
    animations: [
        trigger('dragAnimation', [
            transition(':enter', [
                style({opacity: 0}),
                animate('300ms', style({opacity: 1}))
            ]),
            transition(':leave', [
                animate('300ms', style({opacity: 0}))
            ])
        ])
    ]
})
export class ViewPresetComponent implements OnInit, AfterViewInit {
    isFinishStep: boolean = false;

    id: number;
//   bouquetsDisplayedColumns: string[] = [
//     'select',
//     'name',
//     'streams',
//     'movies',
//     'series',
//     'stations',
//     // 'budget',
// ];
    selectedBouquetsDisplayedColumns: string[] = [
        'select',
        'name',
        // 'streams',
        // 'movies',
        // 'series',
        // 'stations',
        // 'budget',
    ];

    packageBouquetsDisplayedColumns: string[] = [
        'select',
        'name',
        // 'content'
    ];
    vodBouquetsDisplayedColumns: string[] = [
        'select',
        'name',
        // 'content'
    ];

    @ViewChild(MatSort) vodSort: MatSort;
    @ViewChild(MatPaginator) vodPaginator: MatPaginator;

    @ViewChild(MatSort) packageSort: MatSort;
    @ViewChild(MatPaginator) packagePaginator: MatPaginator;

    packageBouquetsDataSource: MatTableDataSource<BouquetList>;
    vodBouquetsDataSource: MatTableDataSource<BouquetList>;

    loading: boolean = false;
    bouquetsLoading: boolean = false;

    bouquets: BouquetList[];
    bouquetsSelection = new SelectionModel<BouquetList>(true, []);
    bouquetsDataSource = new MatTableDataSource<BouquetList>([]);

    editForm: UntypedFormGroup | any;
    preset: PresetDetail;

    principal: any;
    loggedInUser: any;
    user: UserDetail = {
        id: 0, username: ""
    };

    constructor(
        private fb: UntypedFormBuilder,
        private presetService: PresetService,
        private bouquetService: BouquetService,
        private router: Router,
        // public dialog: MatDialog,
        private activatedRouter: ActivatedRoute,
        private notificationService: NotificationService,
        private tokenService: TokenService,
        private loggingService: LoggingService,
        private userService: UserService,
    ) {
        this.id = this.activatedRouter.snapshot.paramMap.get('id') as unknown as number;
        this.editForm = this.fb.group({
            name: ['', Validators.required],
            description: ['']
        });

        this.principal = this.tokenService.getPayload();
    }

    ngAfterViewInit() {
        this.packageBouquetsDataSource.paginator = this.packagePaginator;
        this.vodBouquetsDataSource.paginator = this.vodPaginator;
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
                const presetBouquets = this.preset?.bouquets;
                const selectedBouquets = presetBouquets.map(
                    (id) =>
                        this.bouquets.find((bouquet) => bouquet.id === id) || {
                            id: 0,
                        } as BouquetList
                );
                this.bouquetsSelection = new SelectionModel<BouquetList>(
                    true,
                    selectedBouquets
                );
                console.log("bouquetsSelection:", this.bouquetsSelection);


                this.bouquetsLoading = false;

                this.packageBouquetsDataSource = new MatTableDataSource(this.getPackageBouquets);
                this.packageBouquetsDataSource.paginator = this.packagePaginator;

                this.vodBouquetsDataSource = new MatTableDataSource(this.getVODBouquets);
                this.vodBouquetsDataSource.paginator = this.vodPaginator;

            });
        /*if (!this.isAdmin) {
            this.editForm.disable();
        }*/
        this.loggedInUser = this.tokenService.getPayload();
        this.userService.getUser<UserDetail>(this.loggedInUser.sid).subscribe((user) => {
            this.user = user;
        });
    }

    saveDetail(): void {
        this.loading = true;
        const presetName: string = this.editForm.controls["name"].value;
        const presetDescription: string = this.editForm.controls["description"].value;
        const bouquets: number[] = this.bouquetsSelection.selected.map(bouquet => bouquet.id);

        this.preset.id = this.id;
        this.preset.user = {
            id: this.user.id,
            username: this.user.username
        };
        this.preset.presetName = presetName;
        this.preset.presetDescription = presetDescription;
        this.preset.bouquets = bouquets;

        console.log("bouquets: ", this.preset.bouquets);

        this.presetService.updatePreset(this.preset).subscribe(preset => {
            this.loading = false;
            this.notificationService.success(`Presset Updated Successfully`)
            this.router.navigate(['/apps/bundles/presets/list']);
        });

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

    // Package Bouquets Methods
    masterTogglePackage(): void {
        this.isAllSelectedPackage()
            ? this.bouquetsSelection.clear()
            : this.packageBouquetsDataSource.data.forEach(row => this.bouquetsSelection.select(row));
    }

    isAllSelectedPackage(): boolean {
        const numSelected = this.bouquetsSelection.selected.length;
        const numRows = this.packageBouquetsDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxLabelPackage(row?: BouquetList): string {
        if (!row) {
            return `${this.isAllSelectedPackage() ? 'deselect' : 'select'} all in package`;
        }
        return `${this.bouquetsSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.bouquetOrder + 1}`;
    }

    // VOD Bouquets Methods
    masterToggleVOD(): void {
        this.isAllSelectedVOD()
            ? this.bouquetsSelection.clear()
            : this.vodBouquetsDataSource.data.forEach(row => this.bouquetsSelection.select(row));
    }

    isAllSelectedVOD(): boolean {
        const numSelected = this.bouquetsSelection.selected.length;
        const numRows = this.vodBouquetsDataSource.data.length;
        return numSelected === numRows;
    }

    checkboxLabelVOD(row?: BouquetList): string {
        if (!row) {
            return `${this.isAllSelectedVOD() ? 'deselect' : 'select'} all in VOD`;
        }
        return `${this.bouquetsSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.bouquetOrder + 1}`;
    }


    get getSelectedBouquetDatasource(): MatTableDataSource<BouquetList> {
        return new MatTableDataSource(this.bouquetsSelection.selected);
    }

    // Getters for data sources
    get getPackageBouquets(): BouquetList[] {
        return this.bouquets?.filter(bouquet => bouquet.streams > 0 || bouquet.stations > 0);
    }

    // get getPackageBouquetsDatasource(): MatTableDataSource<BouquetList> {
    //   const dataSource = new MatTableDataSource(this.getPackageBouquets);
    //   dataSource.paginator = this.packagePaginator; // Set paginator
    //   return dataSource;
    // }
    get getVODBouquets(): BouquetList[] {
        return this.bouquets?.filter(bouquet => bouquet.movies > 0 || bouquet.series > 0);
    }

    // get getVODBouquetsDatasource(): MatTableDataSource<BouquetList> {
    //   const dataSource = new MatTableDataSource(this.getVODBouquets);
    //   dataSource.paginator = this.vodPaginator; // Set paginator
    //   return dataSource;
    // }
    getSummary() {
        const presetName = this.editForm.controls["name"].value;
        const presetDescription = this.editForm.controls["description"].value;
        const selectedBouquets = this.bouquetsSelection.selected;

        return {
            presetName,
            presetDescription,
            selectedBouquets,
        };
    }

    getTotalSelectedBouquets(): number {
        return this.bouquetsSelection.selected.length;
    }

    // Total counts for Streams
    getTotalStreams(): number {
        return this.bouquetsSelection.selected.reduce((total, bouquet) => total + (bouquet.streams || 0), 0);
    }

    getTotalStreamBouquets(): number {
        return this.bouquetsSelection.selected.filter(bouquet => bouquet.streams > 0).length;
    }

    // Total counts for Movies
    getTotalMovies(): number {
        return this.bouquetsSelection.selected.reduce((total, bouquet) => total + (bouquet.movies || 0), 0);
    }

    getTotalMovieBouquets(): number {
        return this.bouquetsSelection.selected.filter(bouquet => bouquet.movies > 0).length;
    }

    // Total counts for Series
    getTotalSeries(): number {
        return this.bouquetsSelection.selected.reduce((total, bouquet) => total + (bouquet.series || 0), 0);
    }

    getTotalSeriesBouquets(): number {
        return this.bouquetsSelection.selected.filter(bouquet => bouquet.series > 0).length;
    }

    // Total counts for Stations
    getTotalStations(): number {
        return this.bouquetsSelection.selected.reduce((total, bouquet) => total + (bouquet.stations || 0), 0);
    }

    getTotalStationBouquets(): number {
        return this.bouquetsSelection.selected.filter(bouquet => bouquet.stations > 0).length;
    }

    onStepChange(event: StepperSelectionEvent) {
        this.loggingService.log("event:", event)
        this.isFinishStep = event.selectedIndex === 2; // Assuming finish step is at index 2
    }

    // Handle the drop event
    onBouquetDrop(event: CdkDragDrop<BouquetList[]>): void {
        // Move the item in the array to the new position
        moveItemInArray(this.bouquetsSelection.selected, event.previousIndex, event.currentIndex);
    }

    // Optional: Handle the drag started event
    onDragStarted(bouquet: BouquetList): void {
        this.loggingService.log('Drag started for:', bouquet.bouquetName);
    }

    // Optional: Handle the drag ended event
    onDragEnded(bouquet: BouquetList): void {
        this.loggingService.log('Drag ended for:', bouquet.bouquetName);
    }

    /**
     * Predicate function that only allows even numbers to be
     * sorted into even indices and odd numbers at odd indices.
     */
    sortPredicate(index: number, item: CdkDrag<number>) {
        return (index + 1) % 2 === item.data % 2;
    }

    get isAdmin() {
        return !!this.principal?.isAdmin;
    }

}
