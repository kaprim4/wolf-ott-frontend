import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventService} from "../../../../core/service/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventType} from "../../../../core/constants/events";
import {Region} from "../../../../core/interfaces/region";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {RegionService} from "../../../../core/service/region.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-rg-edit',
    templateUrl: './rg-edit.component.html',
    styleUrls: ['./rg-edit.component.scss']
})
export class RgEditComponent implements OnInit {

    @Input()
    region: Region = {
        id: 0,
        libelle: "",
        code: "",
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
        private regionService: RegionService,
        private router: Router,
        private activated: ActivatedRoute,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Société',
        entity: 'region'
    }
    title: string = 'Modifier cette entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    editForm: FormGroup = this.fb.group({
        id: [this.region.id],
        libelle: ['', Validators.required],
        code: ['', Validators.required],
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
                value: this.region.libelle,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'code',
                label: 'Code',
                type: InputPropsTypesEnum.T,
                value: this.region.code,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'isActivated',
                label: 'Est-t-il activé ?',
                type: InputPropsTypesEnum.C,
                value: this.region.isActivated,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.editForm = this.fb.group({
            id: [this.region.id],
            libelle: [this.region.libelle, Validators.required],
            code: [this.region.code, Validators.required],
            isActivated: [this.region.isActivated]
        });
    }

    private _fetchData() {
        let id = Number(this.activated.snapshot.paramMap.get('id'));
        if (id) {
            this.regionService.getRegion(id)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.region = data.body;
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
            title: "Liste des régions",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: 'dictionnary'},
                {label: 'Liste des régions', path: 'dictionnary/regions'},
                {label: 'Modifier une région', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.editForm.valid) {
            this.loading = true;
            this.region = {
                id: this.editForm.controls['id'].value,
                libelle: this.editForm.controls['libelle'].value,
                code: this.editForm.controls['code'].value,
                isActivated: this.editForm.controls['isActivated'].value,
                isDeleted: false,
                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            }
            this.regionService.updateRegion(this.region).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.successSwal.fire().then(() => {
                            this.router.navigate(['dictionnary/regions'])
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
            console.log(this.region)
        }
    }
}
