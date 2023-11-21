import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {EventService} from "../../../../core/service/event.service";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../../core/interfaces/formType";
import {GasStation} from "../../../../core/interfaces/gas_station";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {EventType} from "../../../../core/constants/events";
import {CompanyService} from "../../../../core/service/company.service";
import {SupervisorService} from "../../../../core/service/supervisor.service";
import {CityService} from "../../../../core/service/city.service";
import {Company} from "../../../../core/interfaces/company";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {City} from "../../../../core/interfaces/city";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-gs-add',
    templateUrl: './gs-add.component.html',
    styleUrls: ['./gs-add.component.scss']
})
export class GsAddComponent implements OnInit {

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
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    companyList: Company[] = [];
    supervisorList: Supervisor[] = [];
    cityList: City[] = [];
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
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
    }

    private _fetchCompanyData() {
        this.companyService.getCompanies()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.companyList = data.body;
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

    private _fetchSupervisorData() {
        this.supervisorService.getSupervisors()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.supervisorList = data.body;
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

    private _fetchCityData() {
        this.cityService.getCities()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.cityList = data.body;
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
            title: "Liste des utilisateurs",
            breadCrumbItems: [
                {label: 'Utilisateurs & Accès', path: '.'},
                {label: 'Liste des utilisateurs', path: '.', active: true},
                {label: 'Ajouter un utilisateur', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchCompanyData();
        this._fetchSupervisorData();
        this._fetchCityData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            let company: Company | null = null;
            let supervisor: Supervisor | null = null;
            let city: City | null = null;
            this.companyService.getCompany(this.addForm.controls['company_id'].value).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        company = data.body;
                        if (company) {
                            this.supervisorService.getSupervisor(this.addForm.controls['supervisor_id'].value).subscribe(
                                (data2: HttpResponse<any>) => {
                                    if (data2.status === 200 || data2.status === 202) {
                                        console.log(`Got a successfull status code: ${data2.status}`);
                                    }
                                    if (data2.body) {
                                        supervisor = data2.body;
                                        if (supervisor) {
                                            this.cityService.getCity(this.addForm.controls['city_id'].value).subscribe(
                                                (data3: HttpResponse<any>) => {
                                                    if (data3.status === 200 || data3.status === 202) {
                                                        console.log(`Got a successfull status code: ${data3.status}`);
                                                    }
                                                    if (data3.body) {
                                                        city = data3.body;
                                                        if (city) {
                                                            this.gasStation = {
                                                                id: this.addForm.controls['id'].value,
                                                                company: company,
                                                                code_sap: this.addForm.controls['code_sap'].value,
                                                                libelle: this.addForm.controls['libelle'].value,
                                                                address: this.addForm.controls['address'].value,
                                                                city: city,
                                                                latitude: this.addForm.controls['latitude'].value,
                                                                longitude: this.addForm.controls['longitude'].value,
                                                                supervisor: supervisor,
                                                                zip_code: this.addForm.controls['zip_code'].value,
                                                                isActivated: this.addForm.controls['isActivated'].value,
                                                                isDeleted: false,
                                                                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                                                                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString()
                                                            }
                                                            this.gasStationService.addGasStation(this.gasStation).subscribe(
                                                                (data4: HttpResponse<any>) => {
                                                                    if (data4.status === 200 || data4.status === 202) {
                                                                        console.log(`Got a successfull status code: ${data4.status}`);
                                                                    }
                                                                    if (data4.body) {
                                                                        console.log(data4);
                                                                        this.successSwal.fire().then(() => {
                                                                            this.router.navigate(['dictionnary/' + this.entityElm.entity + 's'])
                                                                        });

                                                                    }
                                                                    console.log('This contains body: ', data.body);
                                                                },
                                                                (err: HttpErrorResponse) => {
                                                                    if (err.status === 403 || err.status === 404) {
                                                                        console.error(`${err.status} status code caught`);
                                                                        this.errorSwal.fire().then((r) => {
                                                                            this.error = err.message;
                                                                            console.log(err.message);
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
