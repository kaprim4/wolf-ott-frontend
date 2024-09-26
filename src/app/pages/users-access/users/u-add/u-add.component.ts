import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {IUser} from "../../../../core/interfaces/user";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {Router} from "@angular/router";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {GasStation} from "../../../../core/interfaces/gas_station";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {RoleService} from "../../../../core/service/role.service";
import {Role} from "../../../../core/interfaces/role";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import * as moment from "moment";
import {now} from "moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-r-add',
    templateUrl: './u-add.component.html',
    styleUrls: ['./u-add.component.scss']
})
export class UAddComponent implements OnInit {

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
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Utilisateur',
        entity: 'user'
    }
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    gasStationList: GasStation[] = [];
    roleList: Role[] = [];
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
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
        ]
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

    private updateFormValues() {
        this.user = {
            id: this.addForm.controls['id'].value,
            role: this.addForm.controls['role_id'].value,
            lastLogin: "",
            firstName: this.addForm.controls['firstName'].value,
            lastName: this.addForm.controls['lastName'].value,
            email: this.addForm.controls['email'].value,
            username: this.addForm.controls['username'].value,
            password: this.addForm.controls['password'].value,
            isActivated: this.addForm.controls['isActivated'].value,
            isDeleted: false,
            createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
        }
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
        this._fetchGasStationData();
        this._fetchRoleData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            this.updateFormValues();
            console.log(this.user);
            if (this.user) {
                this.userService.addUser(this.user).subscribe(
                    (data: HttpResponse<any>) => {
                        if (data.status === 200 || data.status === 202) {
                            console.log(`Got a successfull status code: ${data.status}`);
                        }
                        if (data.body) {
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
            } else {
                this.errorSwal.fire().then(r => this.loading = false);
            }
        }
    }
}
