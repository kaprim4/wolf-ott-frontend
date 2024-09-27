import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {IUser} from "../../../../core/interfaces/user";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {Router} from "@angular/router";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
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
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Users',
        entity: 'user'
    }
    title: string = 'New entry' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
        credits: ['', [Validators.required]],
        dateRegistered: moment.now(),
        email: ['', [Validators.required]],
        id: [this.user.id],
        ip: "",
        lastLogin: "",
        notes: "",
        status: [false],
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
        ]
    }

    private updateFormValues() {
        this.user = {
            credits: this.addForm.controls['credits'].value,
            dateRegistered: this.addForm.controls['dateRegistered'].value,
            email: this.addForm.controls['email'].value,
            id: this.addForm.controls['id'].value,
            ip: this.addForm.controls['ip'].value,
            lastLogin: this.addForm.controls['lastLogin'].value,
            notes: this.addForm.controls['notes'].value,
            status: false,
            username: this.addForm.controls['username'].value,
        }
    }

    get formValues() {
        return this.addForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "User list",
            breadCrumbItems: [
                {label: 'Users', path: '.'},
                {label: 'User list', path: '.', active: true},
                {label: 'add user', path: '.', active: true}
            ]
        });
        this.initFieldsConfig();
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
