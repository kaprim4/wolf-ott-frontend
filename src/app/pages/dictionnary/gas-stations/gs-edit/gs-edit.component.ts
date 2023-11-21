import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {EventService} from "../../../../core/service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../../core/interfaces/formType";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {EventType} from "../../../../core/constants/events";
import * as moment from "moment";
import {now} from "moment";
import {GasStation} from "../../../../core/interfaces/gas_station";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {Company} from "../../../../core/interfaces/company";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {City} from "../../../../core/interfaces/city";
import {CompanyService} from "../../../../core/service/company.service";
import {SupervisorService} from "../../../../core/service/supervisor.service";
import {CityService} from "../../../../core/service/city.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-gs-edit',
    templateUrl: './gs-edit.component.html',
    styleUrls: ['./gs-edit.component.scss']
})
export class GsEditComponent implements OnInit {

    @Input()
    gasStation: GasStation = {
        id: 0,
        company: null,
        libelle: "",
        supervisor: null,
        city: null,
        address: "",
        code_sap: "",
        latitude: "",
        longitude: "",
        zip_code: "",
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private gasStationService: GasStationService,
        private companyService: CompanyService,
        private supervisorService: SupervisorService,
        private cityService: CityService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Station-service', entity: 'gas-station'}
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    companyList: Company[] = [];
    supervisorList: Supervisor[] = [];
    cityList: City[] = [];
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.gasStation.id],
        company_id: ['', Validators.required],
        code_sap: ['', Validators.required],
        libelle: ['', Validators.required],
        supervisor_id: ['', Validators.required],
        city_id: ['', Validators.required],
        address: ['', Validators.required],
        zip_code: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
        isActivated: [false]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'company_id',
                label: 'Gestion',
                type: InputPropsTypesEnum.S,
                value: this.gasStation.company?.id,
                joinTable: this.companyList,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            {
                input: 'code_sap',
                label: 'Code SAP',
                type: InputPropsTypesEnum.T,
                value: this.gasStation.code_sap,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'libelle',
                label: 'Libelle',
                type: InputPropsTypesEnum.T,
                value: this.gasStation.libelle,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'supervisor_id',
                label: 'Superviseur',
                type: InputPropsTypesEnum.S,
                value: this.gasStation.supervisor?.id,
                joinTable: this.supervisorList,
                joinTableId: 'id',
                joinTableIdLabel: 'firstName'
            },
            {
                input: 'city_id',
                label: 'Ville',
                type: InputPropsTypesEnum.S,
                value: this.gasStation.city?.id,
                joinTable: this.cityList,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            {
                input: 'address',
                label: 'Adresse',
                type: InputPropsTypesEnum.T,
                value: this.gasStation.address,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'zip_code',
                label: 'Code postal',
                type: InputPropsTypesEnum.T,
                value: this.gasStation.zip_code,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'latitude',
                label: 'Latitude',
                type: InputPropsTypesEnum.T,
                value: this.gasStation.latitude,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'longitude',
                label: 'Longitude',
                type: InputPropsTypesEnum.T,
                value: this.gasStation.longitude,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.gasStation.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.gasStation.id],
            company_id: [this.gasStation?.company.id, Validators.required],
            code_sap: [this.gasStation.code_sap, Validators.required],
            libelle: [this.gasStation.libelle, Validators.required],
            supervisor_id: [this.gasStation?.supervisor.id, Validators.required],
            city_id: [this.gasStation?.city.id, Validators.required],
            address: [this.gasStation.address, Validators.required],
            zip_code: [this.gasStation.zip_code, Validators.required],
            latitude: [this.gasStation.latitude, Validators.required],
            longitude: [this.gasStation.longitude, Validators.required],
            isActivated: [this.gasStation.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.gasStationService.getGasStation(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {

                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
                (data: GasStation) => {
                    if (data) {
                        this.gasStation = data;
                        this.loading = false;
                        this.initFieldsConfig();
                    }
                }
            );
        } else {
            this.loading = false;
            this.error = "Station-service introuvable.";
        }
    }

    private _fetchCompanyData() {
        this.companyService.getCompanies()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {

                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
            (data) => {
                if (data) {
                    this.companyList = data;
                    this.initFieldsConfig();
                }
            }
        );
    }

    private _fetchSupervisorData() {
        this.supervisorService.getSupervisors()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {

                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
            (data) => {
                if (data) {
                    this.supervisorList = data;
                    this.initFieldsConfig();
                }
            }
        );
    }

    private _fetchCityData() {
        this.cityService.getCities()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {

                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
            (data) => {
                if (data) {
                    this.cityList = data;
                    this.initFieldsConfig();
                }
            }
        );
    }

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des Station-service",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des station-service', path: '.'},
                {label: 'Modifier un station-service', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchCompanyData();
        this._fetchSupervisorData();
        this._fetchCityData();
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            let company: Company | null = null;
            let supervisor: Supervisor | null = null;
            let city: City | null = null;
            this.companyService.getCompany(this.editForm.controls['company_id'].value).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {

                    }
                    console.log('This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }(c) => {
                company = c;
                if (company) {
                    this.supervisorService.getSupervisor(this.editForm.controls['supervisor_id'].value).subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {

                            }
                            console.log('This contains body: ', data.body);
                        },
                        (err: HttpErrorResponse) => {
                            if (err.status === 403 || err.status === 404) {
                                console.error(`${err.status} status code caught`);
                            }
                        }(s) => {
                        supervisor = s;
                        if (supervisor) {
                            this.cityService.getCity(this.editForm.controls['city_id'].value).subscribe(
                                (data: HttpResponse<any>) => {
                                    if (data.status === 200 || data.status === 202) {
                                        console.log(`Got a successfull status code: ${data.status}`);
                                    }
                                    if (data.body) {

                                    }
                                    console.log('This contains body: ', data.body);
                                },
                                (err: HttpErrorResponse) => {
                                    if (err.status === 403 || err.status === 404) {
                                        console.error(`${err.status} status code caught`);
                                    }
                                }(ct) => {
                                city = ct;
                                if (city) {
                                    this.gasStation = {
                                        id: this.editForm.controls['id'].value,
                                        company: company,
                                        code_sap: this.editForm.controls['code_sap'].value,
                                        libelle: this.editForm.controls['libelle'].value,
                                        address: this.editForm.controls['address'].value,
                                        city: city,
                                        latitude: this.editForm.controls['latitude'].value,
                                        longitude: this.editForm.controls['longitude'].value,
                                        supervisor: supervisor,
                                        zip_code: this.editForm.controls['zip_code'].value,
                                        isActivated: this.editForm.controls['isActivated'].value,
                                        isDeleted: false,
                                        createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                                        updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString()
                                    }
                                    this.gasStationService.updateGasStation(this.gasStation).subscribe(
                                        (data: HttpResponse<any>) => {
                                            if (data.status === 200 || data.status === 202) {
                                                console.log(`Got a successfull status code: ${data.status}`);
                                            }
                                            if (data.body) {

                                            }
                                            console.log('This contains body: ', data.body);
                                        },
                                        (err: HttpErrorResponse) => {
                                            if (err.status === 403 || err.status === 404) {
                                                console.error(`${err.status} status code caught`);
                                            }
                                        }
                                        (data) => {
                                            if (data) {
                                                this.successSwal.fire().then(() => {
                                                    this.router.navigate(['dictionnary/gas-stations'])
                                                });
                                            }
                                        },
                                        (error: string) => {
                                            this.errorSwal.fire().then((r) => {
                                                this.error = error;
                                                console.log(error);
                                            });
                                        },
                                        (): void => {
                                            this.loading = false;
                                        }
                                    )
                                    console.log(this.gasStation);
                                }
                            });
                        }
                    });
                }
            });
        }
    }

}
