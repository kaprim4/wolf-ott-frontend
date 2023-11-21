import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventService} from "../../../../core/service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {SupervisorService} from "../../../../core/service/supervisor.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-sp-edit',
    templateUrl: './sp-edit.component.html',
    styleUrls: ['./sp-edit.component.scss']
})
export class SpEditComponent implements OnInit {

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
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Superviseur',
        entity: 'supervisor'
    }
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
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
        this.editForm = this.fb.group({
            id: [this.supervisor.id],
            firstName: [this.supervisor.firstName, Validators.required],
            lastName: [this.supervisor.lastName, Validators.required],
            email: [this.supervisor.email, Validators.required],
            isActivated: [this.supervisor.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.supervisorService.getSupervisor(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.supervisor = data.body;
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
            this.error = "Superviseur introuvable.";
        }
    }

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des superviseurs",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: 'dictionnary'},
                {label: 'Liste des superviseurs', path: 'dictionnary/supervisors'},
                {label: 'Modifier un superviseur', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            this.supervisor = {
                id: this.editForm.controls['id'].value,
                firstName: this.editForm.controls['firstName'].value,
                lastName: this.editForm.controls['lastName'].value,
                email: this.editForm.controls['email'].value,
                isActivated: this.editForm.controls['isActivated'].value,
                isDeleted: false,
                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            }
            this.supervisorService.updateSupervisor(this.supervisor).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.successSwal.fire().then(() => {
                            this.router.navigate(['dictionnary/supervisors'])
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
            console.log(this.supervisor)
        }
    }
}
