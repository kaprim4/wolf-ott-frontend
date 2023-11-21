import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {Router} from "@angular/router";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {SupervisorService} from "../../../../core/service/supervisor.service";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import * as moment from "moment";
import {now} from "moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-sp-add',
    templateUrl: './sp-add.component.html',
    styleUrls: ['./sp-add.component.scss']
})
export class SpAddComponent implements OnInit {

    @Input()
    supervisor: Supervisor = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: ""
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private supervisorService: SupervisorService,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Superviseur',
        entity: 'supervisor'
    }
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
        id: [this.supervisor.id],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        isActivated: [false]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'firstName',
                label: 'Nom',
                type: InputPropsTypesEnum.T,
                value: this.supervisor.firstName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'lastName',
                label: 'Prénom',
                type: InputPropsTypesEnum.T,
                value: this.supervisor.lastName,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'email',
                label: 'E-mail',
                type: InputPropsTypesEnum.T,
                value: this.supervisor.email,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.supervisor.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
    }

    private updateFormValues() {
        this.supervisor = {
            id: this.addForm.controls['id'].value,
            firstName: this.addForm.controls['firstName'].value,
            lastName: this.addForm.controls['lastName'].value,
            email: this.addForm.controls['email'].value,
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
            title: "Liste des superviseurs",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des superviseurs', path: '.'},
                {label: 'Ajouter un superviseur', path: '.', active: true}
            ]
        });
        this.initFieldsConfig();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            this.updateFormValues();
            console.log(this.supervisor);
            if (this.supervisor) {
                this.supervisorService.addSupervisor(this.supervisor).subscribe(
                    (data: HttpResponse<any>) => {
                        if (data.status === 200 || data.status === 202) {
                            console.log(`Got a successfull status code: ${data.status}`);
                        }
                        if (data.body) {
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
            } else {
                this.errorSwal.fire().then(r => this.loading = false);
            }
        }
    }
}
