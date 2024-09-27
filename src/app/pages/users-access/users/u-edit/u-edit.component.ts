import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {IUser} from "../../../../core/interfaces/user";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

moment.locale('fr');

@Component({
    selector: 'app-u-edit',
    templateUrl: './u-edit.component.html',
    styleUrls: ['./u-edit.component.scss']
})
export class UEditComponent implements OnInit {

    @Input()
    user: IUser = {
        credits: 0, dateRegistered: "", email: "", id: 0, ip: "", lastLogin: "", notes: "", status: false, username: ""
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Users', entity: 'user'}
    title: string = 'Edit this entry' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        credits: ['', [Validators.required]],
        dateRegistered: [''],
        email: ['', [Validators.required]],
        id: [this.user.id],
        ip: [''],
        lastLogin: [''],
        notes: [''],
        status:  [false],
        username: ['', [Validators.required]],
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'username',
                label: 'Username',
                type: InputPropsTypesEnum.T,
                value: this.user.username,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'email',
                label: 'Email',
                type: InputPropsTypesEnum.E,
                value: this.user.email,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'credits',
                label: 'Credits',
                type: InputPropsTypesEnum.T,
                value: this.user.credits,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'notes',
                label: 'Notes',
                type: InputPropsTypesEnum.T,
                value: this.user.notes,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'ip',
                label: 'Ip',
                type: InputPropsTypesEnum.T,
                value: this.user.ip,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'dateRegistered',
                label: 'Date Registered',
                type: InputPropsTypesEnum.DT,
                value: this.user.dateRegistered,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'lastLogin',
                label: 'Last Login',
                type: InputPropsTypesEnum.DT,
                value: this.user.lastLogin,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'status',
                label: 'Status',
                type: InputPropsTypesEnum.C,
                value: this.user.status,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            credits: [this.user.credits, Validators.required],
            dateRegistered: [this.user.dateRegistered],
            email: [this.user.email, Validators.required],
            id: [this.user.id],
            ip: [this.user.ip],
            lastLogin: [this.user.lastLogin],
            notes: [this.user.notes],
            status:  [this.user.status],
            username: [this.user.username, Validators.required],
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

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "User list",
            breadCrumbItems: [
                {label: 'Users', path: '.'},
                {label: 'User list', path: '.'},
                {label: 'edit user', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            // this.roleService.getRole(this.editForm.controls['role_id'].value).subscribe(
            //     (data: HttpResponse<any>) => {
            //         if (data.status === 200 || data.status === 202) {
            //             console.log(`Got a successfull status code: ${data.status}`);
            //         }
            //         if (data.body) {
            //             role = data.body;
            //             if (role) {
            //                 this.gasStationService.getGasStation(this.editForm.controls['gas_station_id'].value).subscribe(
            //                     (data2: HttpResponse<any>) => {
            //                         if (data2.status === 200 || data2.status === 202) {
            //                             console.log(`Got a successfull status code: ${data2.status}`);
            //                         }
            //                         if (data2.body) {
            //                             gas_station = data2.body;
            //                             if (gas_station) {
            //                                 this.user = {
            //                                     credits: this.editForm.controls['credits'].value,
            //                                     dateRegistered: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            //                                     email: this.editForm.controls['email'].value,
            //                                     id: this.editForm.controls['id'].value,
            //                                     ip: this.editForm.controls['ip'].value,
            //                                     lastLogin: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            //                                     notes: this.editForm.controls['notes'].value,
            //                                     status: false,
            //                                     username:this.editForm.controls['username'].value,
            //                                 }
            //                                 this.userService.updateUser(this.user).subscribe(
            //                                     (data3: HttpResponse<any>) => {
            //                                         if (data3.status === 200 || data3.status === 202) {
            //                                             console.log(`Got a successfull status code: ${data3.status}`);
            //                                         }
            //                                         if (data3.body) {
            //                                             this.successSwal.fire().then(() => {
            //                                                 this.router.navigate(['users-access/' + this.entityElm.entity + 's'])
            //                                             });
            //                                         }
            //                                         console.log('This contains body: ', data.body);
            //                                     },
            //                                     (err: HttpErrorResponse) => {
            //                                         if (err.status === 403 || err.status === 404) {
            //                                             console.error(`${err.status} status code caught`);
            //                                             this.errorSwal.fire().then((r) => {
            //                                                 this.error = err.message;
            //                                                 console.log(err.message);
            //                                             });
            //                                         }
            //                                     },
            //                                     (): void => {
            //                                         this.loading = false;
            //                                     }
            //                                 )
            //                                 console.log(this.user)
            //                             } else {
            //                                 this.errorSwal.fire().then(r => this.loading = false);
            //                             }
            //                         }
            //                         console.log('This contains body: ', data2.body);
            //                     },
            //                     (err: HttpErrorResponse) => {
            //                         if (err.status === 403 || err.status === 404) {
            //                             console.error(`${err.status} status code caught`);
            //                         }
            //                     }
            //                 );
            //             }
            //         }
            //         console.log('This contains body: ', data.body);
            //     },
            //     (err: HttpErrorResponse) => {
            //         if (err.status === 403 || err.status === 404) {
            //             console.error(`${err.status} status code caught`);
            //         }
            //     }
            // );
        }
    }
}
