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
import {UserService} from "../../../../core/service/user.service";
import {IUser} from "../../../../core/interfaces/user";
import {PackageService} from "../../../../core/service/user.package.service";
import {IPackage} from "../../../../core/interfaces/ipackage";

moment.locale('fr');

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    @Input()
    line: ILine = {
        accessToken: "",
        adminEnabled: 0,
        adminNotes: "",
        allowedIps: "",
        allowedOutputs: "",
        allowedUa: "",
        asNumber: "",
        bouquet: "",
        bypassUa: false,
        contact: "",
        createdAt: "",
        enabled: 0,
        expDate: "",
        forceServerId: 0,
        forcedCountry: "",
        id: 0,
        isE2: false,
        isIsplock: false,
        isMag: false,
        isRestreamer: false,
        isStalker: false,
        isTrial: false,
        ispDesc: "",
        lastActivity: "",
        lastActivityArray: "",
        lastExpirationVideo: "",
        lastIp: "",
        maxConnections: 0,
        memberId: 0,
        packageId: "",
        pairId: "",
        password: "",
        playToken: "",
        resellerNotes: "",
        updated: "",
        username: ""
    }

    activeWizard: number = 1;

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private lineService: LineService,
        private userService: UserService,
        private packageService: PackageService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Lines', entity: 'line'}
    title: string = 'Edit this entry' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');

    userList: IUser[] = [];
    packageList: IPackage[] = [];
    accountProps: InputProps[] = [];
    restrictionsProps: InputProps[] = [];
    reviewPurchaseProps: InputProps[] = [];

    editForm = this.fb.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        memberId: [""],
        packageId: [""],
        maxConnections: [0, Validators.required],
        expDate: ["", Validators.required],
        contact: [""],
        resellerNotes: [""],
        allowedIps: ["[]"],
        allowedUa: ["[]"],
        bypassUa: [false],
        isIsplock: [false],
        ispDesc: [""],
        acceptTerms: [false, Validators.requiredTrue],
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {

        this.accountProps = [
            {
                input: 'username',
                label: 'Username',
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
                input: 'memberId',
                label: 'owner',
                type: InputPropsTypesEnum.S,
                value: this.line.memberId,
                joinTable: this.userList,
                joinTableId: 'id',
                joinTableIdLabel: 'username'
            },
            {
                input: 'packageId',
                label: 'Original Package',
                type: InputPropsTypesEnum.S,
                value: this.line.packageId,
                joinTable: this.packageList,
                joinTableId: 'id',
                joinTableIdLabel: 'packageName',
            },
            {
                input: 'maxConnections',
                label: 'Max Connections',
                type: InputPropsTypesEnum.T,
                value: this.line.maxConnections,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'expDate',
                label: 'Expiration Date',
                type: InputPropsTypesEnum.D,
                value: this.line.expDate,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'contact',
                label: 'Contact Email',
                type: InputPropsTypesEnum.T,
                value: this.line.contact,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'resellerNotes',
                label: 'Reseller Notes',
                type: InputPropsTypesEnum.TA,
                value: this.line.resellerNotes,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];

        this.restrictionsProps = [
            {
                input: 'allowedIps',
                label: 'Allowed IP Addresses',
                type: InputPropsTypesEnum.L,
                value: JSON.parse(this.line.allowedIps),
                joinTable: JSON.parse(this.line.allowedIps),
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'allowedUa',
                label: 'Allowed User-Agents',
                type: InputPropsTypesEnum.L,
                value: JSON.parse(this.line.allowedUa),
                joinTable: JSON.parse(this.line.allowedUa),
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'bypassUa',
                label: 'Bypass UA Restrictions',
                type: InputPropsTypesEnum.C,
                value: this.line.bypassUa,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isIsplock',
                label: 'Lock to ISP',
                type: InputPropsTypesEnum.C,
                value: this.line.isIsplock,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'ispDesc',
                label: 'Lock to ISP',
                type: InputPropsTypesEnum.TA,
                value: this.line.ispDesc,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];

        this.reviewPurchaseProps = [];

        this.editForm = this.fb.group({
            username: [this.line.username, Validators.required],
            password: [this.line.password, Validators.required],
            memberId: [this.line.memberId],
            packageId: [this.line.packageId],
            maxConnections: [this.line.maxConnections, Validators.required],
            expDate: [this.line.expDate, Validators.required],
            contact: [this.line.contact],
            resellerNotes: [this.line.resellerNotes],
            allowedIps: [this.line.allowedIps],
            allowedUa: [this.line.allowedUa],
            bypassUa: [this.line.bypassUa],
            isIsplock: [this.line.isIsplock],
            ispDesc: [this.line.ispDesc],
            acceptTerms: [false, Validators.requiredTrue],
        });
    }

    private _fetchUserData(search: string): void {
        this.userService.getAllUsers(search)?.subscribe(users => {
            this.userList = users;
            console.log('_fetchUserData contains : ', users);
            this._fetchPackageData('');
        });
    }

    private _fetchPackageData(search: string) {
        this.packageService.getAllPackages(search)?.subscribe(packages => {
            this.packageList = packages;
            console.log('_fetchPackageData contains : ', packages);
            this._fetchData();
            this.loading = true;
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
                    console.log('_fetchData contains : ', data.body);
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
            title: "Edit line",
            breadCrumbItems: [
                {label: 'Lines', path: '.'},
                {label: 'Line list', path: '.'},
                {label: 'Edit line', path: '.', active: true}
            ]
        });
        this._fetchUserData('');
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
