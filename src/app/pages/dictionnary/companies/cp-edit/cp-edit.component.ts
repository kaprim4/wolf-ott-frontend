import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventService} from "../../../../core/service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {Company} from "../../../../core/interfaces/company";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {CompanyService} from "../../../../core/service/company.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-cp-edit',
    templateUrl: './cp-edit.component.html',
    styleUrls: ['./cp-edit.component.scss']
})
export class CpEditComponent implements OnInit {

    @Input()
    company: Company = {
        id: 0,
        libelle: "",
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
        private companyService: CompanyService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Société',
        entity: 'company'
    }
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.company.id],
        libelle: ['', Validators.required],
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
                value: this.company.libelle,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.company.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.company.id],
            libelle: [this.company.libelle, Validators.required],
            isActivated: [this.company.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.companyService.getCompany(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.company = data.body;
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
            this.error = "Société introuvable.";
        }
    }

    get formValues() {
        return this.editForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des sociétés",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: 'dictionnary'},
                {label: 'Liste des sociétés', path: 'dictionnary/companies'},
                {label: 'Modifier une société', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            this.company = {
                id: this.editForm.controls['id'].value,
                libelle: this.editForm.controls['libelle'].value,
                isActivated: this.editForm.controls['isActivated'].value,
                isDeleted: false,
                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            }
            this.companyService.updateCompany(this.company).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.successSwal.fire().then(() => {
                            this.router.navigate(['dictionnary/companies'])
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
            )
            console.log(this.company)
        }
    }
}
