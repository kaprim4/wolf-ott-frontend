import {Component, OnInit} from '@angular/core';
import {EventType} from "../../../core/constants/events";
import {EventService} from "../../../core/service/event.service";
import {IFormType} from "../../../core/interfaces/formType";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputProps, InputPropsTypesEnum} from "../../../core/interfaces/input_props";
import {VoucherType} from "../../../core/interfaces/voucher";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";

@Component({
    selector: 'app-voucher-type',
    templateUrl: './voucher-type.component.html',
    styleUrls: ['./voucher-type.component.scss']
})
export class VoucherTypeComponent implements OnInit {

    constructor(
        private eventService: EventService,
        private voucherTypeService: VoucherTypeService,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    entityElm: IFormType = {
        label: 'Bon saisi',
        entity: 'gas-station-voucher'
    }
    title: string = 'Choix du type de Bon';
    voucherTypes: VoucherType[] = [];
    objectProps: InputProps[] = [];

    standardForm: FormGroup = this.fb.group({
        voucherTypes_id: ['', Validators.required],
        date: ['', Validators.required]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'voucherTypes_id',
                label: 'Type de Bon',
                type: InputPropsTypesEnum.S,
                value: '',
                joinTable: this.voucherTypes,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            {
                input: 'date',
                label: 'Date Journée',
                type: InputPropsTypesEnum.D,
                value: '',
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
    }

    private _fetchVoucherTypesData() {
        this.voucherTypeService.getVoucherTypes()?.subscribe(
            (data) => {
                if (data) {
                    this.voucherTypes = data;
                    this.initFieldsConfig();
                    this.loading = false;
                }
            }
        );
    }

    get formValues() {
        return this.standardForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Type des bons",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Type des bons', path: '.'},
                {label: 'Choix du type de Bon', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchVoucherTypesData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.standardForm.valid) {
            this.loading = true;
            this.router.navigate([
                'vouchers/grab-vouchers', {
                    voucherTypes_id: this.standardForm.controls['voucherTypes_id'].value,
                    date: this.standardForm.controls['date'].value,
                }
            ]);
        }

    }
}
