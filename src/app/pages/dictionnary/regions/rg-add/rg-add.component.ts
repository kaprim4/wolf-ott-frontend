import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IFormType} from "../../../../core/interfaces/formType";
import {EventType} from "../../../../core/constants/events";
import {EventService} from "../../../../core/service/event.service";
import {Router} from "@angular/router";
import {InputProps, InputPropsTypesEnum} from "../../../../core/interfaces/input_props";
import {RegionService} from "../../../../core/service/region.service";
import {Region} from "../../../../core/interfaces/region";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import * as moment from "moment";
import {now} from "moment";

@Component({
    selector: 'app-rg-add',
    templateUrl: './rg-add.component.html',
    styleUrls: ['./rg-add.component.scss']
})
export class RgAddComponent implements OnInit {

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
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'région',
        entity: 'region'
    }
    title: string = 'Nouvelle entrée' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
    objectProps: InputProps[] = [];

    addForm: FormGroup = this.fb.group({
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
    }

    private updateFormValues() {
        this.region = {
            id: this.addForm.controls['id'].value,
            libelle: this.addForm.controls['libelle'].value,
            code: this.addForm.controls['code'].value,
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
            title: "Liste des régions",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des régions', path: '.'},
                {label: 'Ajouter une région', path: '.', active: true}
            ]
        });
        this.initFieldsConfig();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.addForm.valid) {
            this.loading = true;
            this.updateFormValues();
            console.log(this.region);
            if (this.region) {
                this.regionService.addRegion(this.region).subscribe(
                    (data) => {
                        if (data) {
                            console.log(data);
                            this.successSwal.fire().then(() => {
                                this.router.navigate(['dictionnary/regions'])
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
