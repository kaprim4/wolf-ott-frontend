import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../core/interfaces/formType";
import {IVoucher, VoucherType} from "../../../core/interfaces/voucher";
import {InputProps, InputPropsTypesEnum} from "../../../core/interfaces/input_props";
import {EventType} from "../../../core/constants/events";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {GasStationTemp} from "../../../core/interfaces/gas_station_temp";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {GasStationTempService} from "../../../core/service/gas-station-temp.service";

@Component({
    selector: 'app-grab-vouchers',
    templateUrl: './grab-vouchers.component.html',
    styleUrls: ['./grab-vouchers.component.scss']
})
export class GrabVouchersComponent implements OnInit
{

    @Input()
    voucher: IVoucher = {
        id: 0,
        voucherTypes_id: 0,
        date: "",
        num_bon: "",
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
    };

    constructor(
        private eventService: EventService,
        private voucherTypeService: VoucherTypeService,
        private router: Router,
        private fb: FormBuilder,
        private activated: ActivatedRoute,
        private gasStationTempService: GasStationTempService,
    ) {
    }

    entityElm: IFormType = {
        label: 'Saisie de Bon',
        entity: 'grab-vouchers'
    }
    title: string = 'Saisie de Bon';
    vouchers: VoucherType[] = [];
    objectProps: InputProps[] = [];
    records: GasStationTemp[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    standardForm: FormGroup = this.fb.group({
        id: [this.voucher.id],
        voucherTypes_id: [this.voucher.voucherTypes_id],
        date: [this.voucher.date],
        num_bon: [this.voucher.num_bon, Validators.required]
    });
    formSubmitted: boolean = false;
    error: string = '';
    loading: boolean = false;
    voucherTypes_id: number = 0;
    voucherTypes_name: string = '';
    date: string = '';

    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'voucherTypes_id',
                label: 'Type de Bon',
                type: InputPropsTypesEnum.H,
                value: this.voucherTypes_name,
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'date',
                label: 'Date Journée',
                type: InputPropsTypesEnum.H,
                value: moment(this.date).format('D MMM YYYY'),
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
            {
                input: 'num_bon',
                label: 'Date Journée',
                type: InputPropsTypesEnum.T,
                value: '',
                joinTable: [],
                joinTableId: '',
                joinTableIdLabel: ''
            },
        ];
        this.standardForm = this.fb.group({
            id: [this.voucher.id],
            voucherTypes_id: [this.voucher.voucherTypes_id],
            date: [this.voucher.date],
            num_bon: [this.voucher.num_bon, Validators.required]
        });
    }

    private updateFormValues() {
        this.voucher = {
            id: this.standardForm.controls['id'].value,
            voucherTypes_id: this.voucherTypes_id,
            date: this.date,
            num_bon: this.standardForm.controls['num_bon'].value,
            isActivated: true,
            isDeleted: false,
            createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
        }
    }

    get formValues() {
        return this.standardForm.controls;
    }

    ngOnInit(): void{
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Type des bons",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Choix du type de Bon', path: '.'},
                {label: 'Saisie de Bon', path: '.', active: true},
            ]
        });
        this.loading = true;

        let id = Number(this.activated.snapshot.paramMap.get('voucherTypes_id'));
        if (id) {
            this.voucherTypes_id = id;
            let _date = this.activated.snapshot.paramMap.get('date');
            if (_date) {
                this.date = _date;
                this.voucherTypes_name = this._getVoucherTypeName(id);
                console.log(this._getVoucherTypeName(id))
                this.initFieldsConfig();
            } else {
                this.router.navigate(['vouchers/voucher-type']);
            }
        } else {
            this.router.navigate(['vouchers/voucher-type']);
        }
        this._fetchData();
        this.initTableConfig();
    }

    _getVoucherTypeName(id:number):string{
        let name = '';
        this.voucherTypeService.getVoucherType(id)?.subscribe(
            (data: VoucherType) => {
                if (data) {
                    name = data.libelle;
                    this.loading = false;
                }
            }
        );
        return name;
    }

    _fetchData(): void {
        this.gasStationTempService.getGasStationTemps()?.subscribe(
            (data: GasStationTemp[]) => {
                console.log("data", data);
                if (data && data.length > 0) {
                    this.records = data;
                    this.loading = false;
                } else {
                    this.error = "La liste est vide.";
                }
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id_bordereau', label: '#', formatter: (record: GasStationTemp) => record.id_bordereau},
            {name: 'zzclient_temp', label: 'Code Client', formatter: (record: GasStationTemp) => record.zzclient_temp},
            {name: 'zztype_bon_temp', label: 'Type Bon', formatter: (record: GasStationTemp) => record.zztype_bon_temp},
            {name: 'zznum_bord_temp', label: 'Numéro Bordereau', formatter: (record: GasStationTemp) => record.zznum_bord_temp},
            {name: 'zznum_bon_temp', label: 'Numéro Bon', formatter: (record: GasStationTemp) => record.zznum_bon_temp},
            {name: 'zzmnt_produit_temp', label: 'Valeur', formatter: (record: GasStationTemp) => record.zzmnt_produit_temp},
            {name: 'zznum_vehicule_temp', label: 'Numéro Véhicule', formatter: (record: GasStationTemp) => record.zznum_vehicule_temp},
            {name: 'zzdate_bon_temp', label: 'Date Journée', formatter: (record: GasStationTemp) => {
                    return moment(record.zzdate_bon_temp).format('D MMM YYYY')
                }},

            /*{
                name: 'isActivated', label: 'Activé ?', formatter: (record: GasStationTemp) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: GasStationTemp) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: GasStationTemp) => {
                    return moment(record.createdAt).format('d MMM YYYY')
                }
            }*/
        ];
    }

    compare(v1: number | string | boolean, v2: number | string | boolean): any {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    onSort(event: SortEvent): void {
        if (event.direction === '') {
            this._fetchData();
        } else {
            this.records = [...this.records].sort((a, b) => {
                const res = this.compare(a[event.column], b[event.column]);
                return event.direction === 'asc' ? res : -res;
            });
        }
    }

    matches(row: GasStationTemp, term: string) {
        return row.zztype_bon_temp.toLowerCase().includes(term)
            || row.zznum_bon_temp.toLowerCase().includes(term)
            || row.zznum_vehicule_temp.toLowerCase().includes(term)
            || row.zzmnt_produit_temp.toLowerCase().includes(term)
            || row.zzdate_bon_temp.toLowerCase().includes(term)
            || row.zznum_bord_temp.toLowerCase().includes(term)
            || row.zzclient_temp.toLowerCase().includes(term);
    }

    /**
     * Search Method
     */
    searchData(searchTerm: string): void {
        if (searchTerm === '') {
            this._fetchData();
        } else {
            this._fetchData();
            let updatedData = this.records;
            updatedData = updatedData.filter(record => this.matches(record, searchTerm));
            this.records = updatedData;
        }
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.standardForm.valid) {
            this.loading = true;
            this.updateFormValues();
            console.log(this.voucher);
        }

    }

}
