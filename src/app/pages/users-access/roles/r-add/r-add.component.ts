import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {Router} from "@angular/router";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {RoleService} from "../../../../core/service/role.service";
import {Role} from "../../../../core/interfaces/role";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import * as moment from "moment";
import {now} from "moment";

@Component({
    selector: 'app-r-add',
    templateUrl: './r-add.component.html',
    styleUrls: ['./r-add.component.scss']
})
export class RAddComponent implements OnInit {

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
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Rôle',
        entity: 'role'
    }
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
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
    }

    private updateFormValues() {
        this.role = {
            id: this.addForm.controls['id'].value,
            libelle: this.addForm.controls['libelle'].value,
            alias: this.addForm.controls['alias'].value,
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
            title: "Liste des rôles",
            breadCrumbItems: [
                {label: 'Utilisateurs & Accès', path: '.'},
                {label: 'Liste des rôles', path: '.'},
                {label: 'Ajouter un rôle', path: '.', active: true}
            ]
        });
        this.initFieldsConfig();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            this.updateFormValues();
            console.log(this.role);
            if (this.role) {
                this.roleService.addRole(this.role).subscribe(
                    (data) => {
                        if (data) {
                            console.log(data);
                            this.successSwal.fire().then(() => {
                                this.router.navigate(['users-access/' + this.entityElm.entity + 's'])
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
            } else {
                this.errorSwal.fire().then(r => this.loading = false);
            }
        }
    }
}