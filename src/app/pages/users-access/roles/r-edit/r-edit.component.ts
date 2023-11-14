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

@Component({
    selector: 'app-r-edit',
    templateUrl: './r-edit.component.html',
    styleUrls: ['./r-edit.component.scss']
})
export class REditComponent implements OnInit {

    @Input()
    role: Role = {
        id: 0,
        libelle: "",
        alias: "",
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
        private roleService: RoleService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {label: 'Rôle', entity: 'role'}
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.role.id],
        libelle: ['', Validators.required],
        alias: ['', Validators.required],
        isActivated: [false]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'libelle',
                label: 'Libelle',
                type: InputPropsTypesEnum.T,
                value: this.role.libelle,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'alias',
                label: 'Alias',
                type: InputPropsTypesEnum.T,
                value: this.role.alias,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.role.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.role.id],
            libelle: [this.role.libelle, Validators.required],
            alias: [this.role.alias, Validators.required],
            isActivated: [this.role.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.roleService.getRole(id)?.subscribe(
                (data: Role) => {
                    if (data) {
                        this.role = data;
                        this.loading = false;
                        this.initFieldsConfig();
                    }
                }
            );
        } else {
            this.loading = false;
            this.error = "Rôle introuvable.";
        }
    }

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des rôles",
            breadCrumbItems: [
                {label: 'Utilisateurs & Accès', path: '.'},
                {label: 'Liste des rôles', path: '.'},
                {label: 'Modifier un rôle', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            this.role = {
                id: this.editForm.controls['id'].value,
                libelle: this.editForm.controls['libelle'].value,
                alias: this.editForm.controls['alias'].value,
                isActivated: this.editForm.controls['isActivated'].value,
                isDeleted: false,
                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            }
            this.roleService.updateRole(this.role).subscribe(
                (data) => {
                    if (data) {
                        this.successSwal.fire().then(() => {
                            this.router.navigate(['users-access/roles'])
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
            console.log(this.role)
        }
    }
}
