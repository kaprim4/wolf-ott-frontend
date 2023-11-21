import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {Router} from "@angular/router";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {CityService} from "../../../../core/service/city.service";
import {City} from "../../../../core/interfaces/city";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import * as moment from "moment";
import {now} from "moment";
import {Region} from "../../../../core/interfaces/region";
import {RegionService} from "../../../../core/service/region.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-c-add',
    templateUrl: './c-add.component.html',
    styleUrls: ['./c-add.component.scss']
})
export class CAddComponent implements OnInit {

    @Input()
    city: City = {
        id: 0,
        region: null,
        libelle: "",
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
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Ville',
        entity: 'city'
    }
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    regionList: Region[] = [];
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
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
                label: 'Libelle',
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
                    this.loading = false;
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
        return this.addForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des villes",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des villes', path: '.'},
                {label: 'Ajouter une ville', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchRegionData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            let region: Region | null = null;
            this.regionService.getRegion(this.addForm.controls['region_id'].value).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        region = data.body;
                        if (region) {
                            this.city = {
                                id: this.addForm.controls['id'].value,
                                region: region,
                                libelle: this.addForm.controls['libelle'].value,
                                isActivated: this.addForm.controls['isActivated'].value,
                                isDeleted: false,
                                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString()
                            }
                            this.cityService.addCity(this.city).subscribe(
                                (data2: HttpResponse<any>) => {
                                    if (data2.status === 200 || data2.status === 202) {
                                        console.log(`Got a successfull status code: ${data2.status}`);
                                    }
                                    if (data2.body) {
                                        console.log(data2);
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
