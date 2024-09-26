import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {IUser} from "../../../../core/interfaces/user";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {GasStation} from "../../../../core/interfaces/gas_station";
import {Role} from "../../../../core/interfaces/role";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {RoleService} from "../../../../core/service/role.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-u-edit',
    templateUrl: './u-edit.component.html',
    styleUrls: ['./u-edit.component.scss']
})
export class UEditComponent implements OnInit {

    @Input()
    user: IUser = {
        createdAt: "",
        email: "",
        firstName: "",
        id: 0,
        isActivated: false,
        isDeleted: false,
        lastLogin: "",
        lastName: "",
        password: "",
        role: undefined,
        updatedAt: "",
        username: ""
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private gasStationService: GasStationService,
        private roleService: RoleService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Utilisateur', entity: 'user'}
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    gasStationList: GasStation[] = [];
    roleList: Role[] = [];
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.user.id],
        role_id: ['', [Validators.required]],
        gas_station_id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        isActivated: [false]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'role_id',
                label: 'Rôle',
                type: InputPropsTypesEnum.S,
                value: this.user.role?.id,
                joinTable: this.roleList,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            // {
            //     input: 'gas_station_id',
            //     label: 'Station',
            //     type: InputPropsTypesEnum.S,
            //     value: this.user.gasStation?.id,
            //     joinTable: this.gasStationList,
            //     joinTableId: 'id',
            //     joinTableIdLabel: 'libelle'
            // },
            {
                input: 'firstName',
                label: 'Nom',
                type: InputPropsTypesEnum.T,
                value: this.user.firstName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'lastName',
                label: 'Prénom',
                type: InputPropsTypesEnum.T,
                value: this.user.lastName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'email',
                label: 'E-mail',
                type: InputPropsTypesEnum.E,
                value: this.user.email,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'username',
                label: 'Identifiant',
                type: InputPropsTypesEnum.T,
                value: this.user.username,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'password',
                label: 'Mot de passe',
                type: InputPropsTypesEnum.P,
                value: this.user.password,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.user.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.user.id],
            role_id: [this.user.role?.id, [Validators.required]],
            //gas_station_id: [this.user.gasStation?.id, Validators.required],
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            email: [this.user.email, Validators.required],
            username: [this.user.username, Validators.required],
            password: ['', Validators.required],
            isActivated: [this.user.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.userService.getUser(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.user = data.body;
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
            this.error = "Utilisateur introuvable.";
        }
    }

    private _fetchGasStationData() {
        this.gasStationService.getGasStations()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.gasStationList = data.body;
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

    private _fetchRoleData() {
        this.roleService.getRoles()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.roleList = data.body;
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
            title: "Liste des utilisateurs",
            breadCrumbItems: [
                {label: 'Utilisateurs & Accès', path: '.'},
                {label: 'Liste des utilisateurs', path: '.'},
                {label: 'Modifier un utilisateur', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchGasStationData();
        this._fetchRoleData();
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            let role: Role | null = null;
            let gas_station: GasStation | null = null;
            this.roleService.getRole(this.editForm.controls['role_id'].value).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        role = data.body;
                        if (role) {
                            this.gasStationService.getGasStation(this.editForm.controls['gas_station_id'].value).subscribe(
                                (data2: HttpResponse<any>) => {
                                    if (data2.status === 200 || data2.status === 202) {
                                        console.log(`Got a successfull status code: ${data2.status}`);
                                    }
                                    if (data2.body) {
                                        gas_station = data2.body;
                                        if (gas_station) {
                                            this.user = {
                                                id: this.editForm.controls['id'].value,
                                                role: role,
                                                lastLogin: "",
                                                firstName: this.editForm.controls['firstName'].value,
                                                lastName: this.editForm.controls['lastName'].value,
                                                email: this.editForm.controls['email'].value,
                                                username: this.editForm.controls['username'].value,
                                                password: this.editForm.controls['password'].value,
                                                isActivated: this.editForm.controls['isActivated'].value,
                                                isDeleted: false,
                                                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                                                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                                            }
                                            this.userService.updateUser(this.user).subscribe(
                                                (data3: HttpResponse<any>) => {
                                                    if (data3.status === 200 || data3.status === 202) {
                                                        console.log(`Got a successfull status code: ${data3.status}`);
                                                    }
                                                    if (data3.body) {
                                                        this.successSwal.fire().then(() => {
                                                            this.router.navigate(['users-access/' + this.entityElm.entity + 's'])
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
                                            console.log(this.user)
                                        } else {
                                            this.errorSwal.fire().then(r => this.loading = false);
                                        }
                                    }
                                    console.log('This contains body: ', data2.body);
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
