import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {ILine} from "../../../../core/interfaces/line";
import {EventService} from "../../../../core/service/event.service";
import {LineService} from "../../../../core/service/line.service";
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    @Input()
    line: ILine = {
        active: 0,
        connections: 0,
        expiration: "",
        id: 0,
        lastConnection: "",
        online: false,
        owner: "",
        password: "",
        status: 0,
        trial: false,
        username: ""
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private lineService: LineService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Lines', entity: 'line'}
    title: string = 'Edit this entry' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        active: [0],
        connections: [0],
        expiration: [""],
        id: [this.line.id],
        lastConnection: [""],
        online: [false],
        owner: ['', [Validators.required]],
        password: ['', [Validators.required]],
        status: [0],
        trial: [false],
        username: ['', [Validators.required]],
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'username',
                label: 'username',
                type: InputPropsTypesEnum.T,
                value: this.line.username,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'password',
                label: 'password',
                type: InputPropsTypesEnum.T,
                value: this.line.password,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'owner',
                label: 'owner',
                type: InputPropsTypesEnum.T,
                value: this.line.owner,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'status',
                label: 'status',
                type: InputPropsTypesEnum.T,
                value: this.line.status,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'online',
                label: 'online',
                type: InputPropsTypesEnum.T,
                value: this.line.online,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'trial',
                label: 'trial',
                type: InputPropsTypesEnum.T,
                value: this.line.trial,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'active',
                label: 'active',
                type: InputPropsTypesEnum.T,
                value: this.line.active,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'expiration',
                label: 'expiration',
                type: InputPropsTypesEnum.T,
                value: this.line.expiration,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'lastConnection',
                label: 'lastConnection',
                type: InputPropsTypesEnum.H,
                value: this.line.lastConnection,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'connections',
                label: 'connections',
                type: InputPropsTypesEnum.H,
                value: this.line.connections,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            active: [this.line.active],
            connections: [this.line.connections],
            expiration: [this.line.expiration],
            id: [this.line.id],
            lastConnection: [this.line.lastConnection],
            online: [this.line.online],
            owner: [this.line.owner, [Validators.required]],
            password: [this.line.password, [Validators.required]],
            status: [this.line.status],
            trial: [this.line.trial],
            username: [this.line.username, [Validators.required]],
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.lineService.getLine(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.line = data.body;
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
            title: "Line list",
            breadCrumbItems: [
                {label: 'Lines', path: '.'},
                {label: 'Line list', path: '.'},
                {label: 'edit line', path: '.', active: true}
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
            //                                 this.line = {
            //                                     credits: this.editForm.controls['credits'].value,
            //                                     dateRegistered: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            //                                     email: this.editForm.controls['email'].value,
            //                                     id: this.editForm.controls['id'].value,
            //                                     ip: this.editForm.controls['ip'].value,
            //                                     lastLogin: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            //                                     notes: this.editForm.controls['notes'].value,
            //                                     status: false,
            //                                     linename:this.editForm.controls['linename'].value,
            //                                 }
            //                                 this.lineService.updateLine(this.line).subscribe(
            //                                     (data3: HttpResponse<any>) => {
            //                                         if (data3.status === 200 || data3.status === 202) {
            //                                             console.log(`Got a successfull status code: ${data3.status}`);
            //                                         }
            //                                         if (data3.body) {
            //                                             this.successSwal.fire().then(() => {
            //                                                 this.router.navigate(['lines-access/' + this.entityElm.entity + 's'])
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
            //                                 console.log(this.line)
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
