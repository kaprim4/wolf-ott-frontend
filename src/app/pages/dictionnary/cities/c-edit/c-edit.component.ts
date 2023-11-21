import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventService} from "../../../../core/service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {City} from "../../../../core/interfaces/city";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {CityService} from "../../../../core/service/city.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {Region} from "../../../../core/interfaces/region";
import {RegionService} from "../../../../core/service/region.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-c-edit',
    templateUrl: './c-edit.component.html',
    styleUrls: ['./c-edit.component.scss']
})
export class CEditComponent implements OnInit {

    @Input()
    city: City = {
        id: 0,
        libelle: "",
        region: null,
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: ""
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private cityService: CityService,
        private regionService: RegionService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Ville',
        entity: 'city'
    }
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    regionList: Region[] = [];
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.city.id],
        region_id: ['', Validators.required],
        libelle: ['', Validators.required],
        isActivated: [false]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'region_id',
                label: 'Région',
                type: InputPropsTypesEnum.S,
                value: this.city.region?.id,
                joinTable: this.regionList,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            {
                input: 'libelle',
                label: 'Libelle',
                type: InputPropsTypesEnum.T,
                value: this.city.libelle,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.city.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.city.id],
            region_id: [this.city.region.id, Validators.required],
            libelle: [this.city.libelle, Validators.required],
            isActivated: [this.city.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.cityService.getCity(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.city = data.body;
                        this.loading = false;
                        this.initFieldsConfig();
                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        } else {
            this.loading = false;
            this.error = "Ville introuvable.";
        }
    }

    private _fetchRegionData() {
        this.regionService.getRegions()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.regionList = data.body;
                    this.initFieldsConfig();
                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
        );
    }

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des villes",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: 'dictionnary'},
                {label: 'Liste des villes', path: 'dictionnary/cities'},
                {label: 'Modifier une ville', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchRegionData();
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            let region: Region | null = null;
            this.regionService.getRegion(this.editForm.controls['region_id'].value).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        region = data.body;
                        if (region) {
                            this.city = {
                                id: this.editForm.controls['id'].value,
                                region: region,
                                libelle: this.editForm.controls['libelle'].value,
                                isActivated: this.editForm.controls['isActivated'].value,
                                isDeleted: false,
                                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                            }
                            this.cityService.updateCity(this.city).subscribe(
                                (data: HttpResponse<any>) => {
                                    if (data.status === 200 || data.status === 202) {
                                        console.log(`Got a successfull status code: ${data.status}`);
                                    }
                                    if (data.body) {
                                        this.successSwal.fire().then(() => {
                                            this.router.navigate(['dictionnary/cities'])
                                        });
                                    }
                                    console.log('This contains body: ', data.body);
                                },
                                (error: HttpErrorResponse) => {
                                    if (error.status === 403 || error.status === 404) {
                                        console.error(`${error.status} status code caught`);
                                        this.errorSwal.fire().then((r) => {
                                            this.error = error.message;
                                            console.log(error.message);
                                        });
                                    }
                                },
                                (): void => {
                                    this.loading = false;
                                }
                            )
                            console.log(this.city);
                        }
                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        }
    }
}
