import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {EventType} from 'src/app/core/constants/events';
import {IFormType} from 'src/app/core/interfaces/formType';
import {
    InputProps,
    InputPropsTypesEnum,
} from 'src/app/core/interfaces/input_props';
import {IPreset} from 'src/app/core/interfaces/ipreset';
import {IBouquet} from 'src/app/core/interfaces/ibouquet';
import {EventService} from 'src/app/core/service/event.service';
import {PresetService} from 'src/app/core/service/preset.service';
import {BouquetsService} from 'src/app/core/service/bouquets.service'; // Import your bouquet service

@Component({
    selector: 'app-preset-edit',
    templateUrl: './preset-edit.component.html',
    styleUrls: ['./preset-edit.component.scss'],
})
export class PresetEditComponent implements OnInit {
    @Input() preset: IPreset = {
        id: 11,
        presetName: '',
        presetDescription: '',
        status: true,
        bouquets: [],
        createdAt: '',
        updatedAt: '',
    };

    @ViewChild('successSwal') public readonly successSwal!: SwalComponent;
    @ViewChild('errorSwal') public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private presetService: PresetService,
        private bouquetsService: BouquetsService, // Inject bouquet service
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Presets', entity: 'preset'};
    title: string =
        'Edit this entry' +
        (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');

    objectProps: InputProps[] = [];
    allBouquets: IBouquet[] = [];
    selectedBouquets: number[] = [];
    availableBouquets: number[] = [];

    editForm = this.fb.group({
        id: [{value: null, disabled: true}, Validators.required],
        presetName: ['', Validators.required],
        presetDescription: ['', Validators.required],
        status: [false],
        bouquets: [[], Validators.required],
        createdAt: [{value: '', disabled: true}],
        updatedAt: [{value: '', disabled: true}],
        availableBouquets: [[]], // Disable if not editable
        selectedBouquets: [[]], // Disable if not editable
    });

    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: 'Preset list',
            breadCrumbItems: [
                {label: 'Preset', path: '.'},
                {label: 'Presets list', path: '.'},
                {label: 'edit preset', path: '.', active: true},
            ],
        });
        this.loading = true;
        this._fetchData();
        this._fetchBouquets(); // Fetch bouquets when initializing
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.presetService.getPreset(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        if (data.body) {
                            this.preset = data.body;
                            this.selectedBouquets = this.preset.bouquets; // Initialize with preset IDs
                            this.loading = false;
                            this.initFieldsConfig();
                        }
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        } else {
            this.loading = false;
            this.error = 'Utilisateur introuvable.';
        }
    }

    private _fetchBouquets() {
        this.bouquetsService.getAllBouquets().subscribe(bouquets => {
            this.allBouquets = bouquets;
            this.availableBouquets = bouquets
                .map(bouquet => bouquet.id)
                .filter(id => !this.selectedBouquets.includes(id));
        });
    }

    moveToPreset() {
        const selected = this.availableBouquets.filter(id =>
            this.allBouquets.some(bouquet => bouquet.id === id)
        );
        this.selectedBouquets.push(...selected);
        this.availableBouquets = this.availableBouquets.filter(id =>
            !selected.includes(id)
        );
    }

    moveToAvailable() {
        const deselected = this.selectedBouquets.filter(id =>
            this.preset.bouquets.includes(id)
        );
        this.availableBouquets.push(...deselected);
        this.selectedBouquets = this.selectedBouquets.filter(id =>
            !deselected.includes(id)
        );
    }


    get formValues() {
        return this.editForm.controls;
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            this.preset.bouquets = this.selectedBouquets;
        }
    }

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'presetName',
                label: 'Nom du Pré-réglage',
                type: InputPropsTypesEnum.T,
                value: this.preset.presetName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: '',
            },
            {
                input: 'presetDescription',
                label: 'Description du Préréglage',
                type: InputPropsTypesEnum.T,
                value: this.preset.presetDescription,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: '',
            },
            {
                input: 'createdAt',
                label: 'Créé le',
                type: InputPropsTypesEnum.D,
                value: this.preset.createdAt,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: '',
            },
            {
                input: 'status',
                label: 'Statut',
                type: InputPropsTypesEnum.C,
                value: this.preset.status,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: '',
            },
        ];

        this.editForm = this.fb.group({
            id: [{value: this.preset.id, disabled: true}], // Assuming ID is not editable
            presetName: [this.preset.presetName, Validators.required],
            presetDescription: [this.preset.presetDescription, Validators.required],
            status: [this.preset.status],
            bouquets: [this.preset.bouquets, Validators.required], // Adjust based on your requirements
            createdAt: [{value: this.preset.createdAt, disabled: true}], // Disable if not editable
            updatedAt: [{value: this.preset.updatedAt, disabled: true}], // Disable if not editable
            availableBouquets: [this.allBouquets], // Disable if not editable
            selectedBouquets: [this.selectedBouquets], // Disable if not editable
        });
    }

    get selectedBouquetsList(): IBouquet[] {
        return this.allBouquets.filter(bouquet =>
            this.selectedBouquets.includes(bouquet.id)
        ).sort((a, b) => a.bouquetOrder - b.bouquetOrder);
    }

    get availableBouquetsList(): IBouquet[] {
        return this.allBouquets
            .filter(bouquet => this.availableBouquets.includes(bouquet.id))
            .sort((a, b) => a.bouquetOrder - b.bouquetOrder);
    }


}
