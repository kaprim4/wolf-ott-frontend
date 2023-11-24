import {Component, OnInit, ViewChild} from '@angular/core';
import {EventType} from "../../../core/constants/events";
import {EventService} from "../../../core/service/event.service";
import {IFormType} from "../../../core/interfaces/formType";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputProps, InputPropsTypesEnum} from "../../../core/interfaces/input_props";
import {VoucherHeader, VoucherResponseHeader, VoucherType} from "../../../core/interfaces/voucher";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {VoucherHeaderService} from "../../../core/service/voucher-header.service";
import {TokenService} from "../../../core/service/token.service";
import {GasStation} from "../../../core/interfaces/gas_station";
import {GasStationService} from "../../../core/service/gas-station.service";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {padLeft} from "../../../core/helpers/functions";

@Component({
    selector: 'app-voucher-type',
    templateUrl: './voucher-type.component.html',
    styleUrls: ['./voucher-type.component.scss']
})
export class VoucherTypeComponent implements OnInit {

    constructor(
        private eventService: EventService,
        private voucherTypeService: VoucherTypeService,
        private voucherHeaderService: VoucherHeaderService,
        private gasStationService: GasStationService,
        private tokenService: TokenService,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    voucherHeader: VoucherHeader = {
        id: 0,
        slipNumber: 0,
        gasStation: undefined,
        voucherDate: "",
        isActivated: true,
        isDeleted: false,
        createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
        updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
    }

    entityElm: IFormType = {
        label: 'Bon saisi',
        entity: 'gas-station-voucher'
    }

    title: string = 'Choix du type de Bon';

    standardForm: FormGroup = this.fb.group({
        id: [this.voucherHeader.id],
        voucherTypes_id: ['', Validators.required],
        voucherDate: ['', Validators.required],
    });

    voucherTypes: VoucherType[] = [];
    gasStation: GasStation | null = null;
    voucherResponseHeader: VoucherResponseHeader | null = null;
    objectProps: InputProps[] = [];

    formSubmitted: boolean = false;
    error: string = '';
    errorList: string = '';
    loadingForm: boolean = false;
    loadingList: boolean = false;
    slipNumber: number = 0;

    records: VoucherHeader[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];

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
        ];
    }

    _fetchData(): void {
        this.voucherHeaderService.getVoucherHeaders()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        this.records = [];
                        data.body.map((voucher: VoucherHeader) => {
                            if (voucher.gasStation.id == this.tokenService.getPayload().gas_station_id) {
                                this.records.push(voucher);
                            }
                        });
                        console.log("records:", this.records);
                        this.initTableConfig();
                    } else {
                        this.errorList = "La liste est vide.";
                    }
                }
                console.log('This contains body: ', data.body);
                this.loadingList = false;
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
        );
    }

    private _fetchGasStationData() {
        this.gasStationService.getGasStation(this.tokenService.getPayload().gas_station_id)?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.gasStation = data.body;
                    this.voucherHeader.gasStation = this.gasStation;
                }
                console.log('_fetchGasStationData contains body: ', data.body);
                this.loadingForm = false;
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    this.loadingForm = false;
                }
            }
        );
    }

    private _fetchVoucherTypesData() {
        this.voucherTypeService.getVoucherTypes()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.voucherTypes = data.body;
                    this.initFieldsConfig();
                }
                console.log('_fetchVoucherTypesData contains body: ', data.body);
                this.loadingForm = false;
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    this.loadingForm = false;
                }
            }
        );
    }

    private _fetchVoucherHeaderData() {
        this.voucherHeaderService.getNextVoucherHeader(this.tokenService.getPayload().gas_station_id)?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.voucherResponseHeader = data.body;
                    this.initFieldsConfig();
                }
                console.log('_fetchVoucherHeaderData contains body: ', data.body);
                this.loadingForm = false;
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    this.loadingForm = false;
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
        this.loadingForm = true;
        this.loadingList = true;
        this.initTableConfig();
        this._fetchData();
        this._fetchGasStationData();
        this._fetchVoucherTypesData();
        this._fetchVoucherHeaderData();
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: VoucherHeader) => record.id},
            {name: 'gasStation', label: 'Station', formatter: (record: VoucherHeader) => record.gasStation.libelle},
            {
                name: 'slipNumber', label: 'Numéro Bordereau', formatter: (record: VoucherHeader) => {
                    return '<span class="badge bg-purple text-light fs-5 m-0">' + padLeft(String(record.slipNumber), '0', 6) + '<span>'
                }
            },
            {
                name: 'voucherDate', label: 'Date Journée', formatter: (record: VoucherHeader) => {
                    return moment(record.voucherDate).format('D MMMM YYYY')
                }
            },
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: VoucherHeader) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: VoucherHeader) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: VoucherHeader) => {
                    return moment(record.createdAt).format('D MMMM YYYY')
                }
            },
            {
                name: '', label: 'Actions', formatter: (record: VoucherHeader) => {
                    return '<a href="'+this.router.createUrlTree([
                        'vouchers/grab-vouchers', {
                            voucherHeader_id: record.id,
                        }
                    ])+'" class="btn btn-purple btn-xs rounded-pill waves-effect waves-light"><span class="btn-label"><i class="mdi mdi-circle-edit-outline"></i></span> Modifier</a>'
                }
            }
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

    matches(row: VoucherHeader, term: string) {
        return row.gasStation?.libelle.toLowerCase().includes(term)
            || row.slipNumber.toString().toLowerCase().includes(term)
            || row.voucherDate.toLowerCase().includes(term);
    }

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
            this.loadingForm = true;
            this.voucherHeader.id = this.standardForm.controls['id'].value;
            this.voucherHeader.voucherDate = this.standardForm.controls['voucherDate'].value;
            this.voucherHeader.slipNumber = this.voucherResponseHeader ? this.voucherResponseHeader.nextSlipNumber : 0;
            console.log(this.voucherHeader);
            if (this.voucherHeader) {
                this.voucherHeaderService.addVoucherHeader(this.voucherHeader).subscribe(
                    (data: HttpResponse<any>) => {
                        if (data.status === 200 || data.status === 202) {
                            console.log(`Got a successfull status code: ${data.status}`);
                        }
                        if (data.body) {
                            this.successSwal.fire().then(() => {
                                this.router.navigate([
                                    'vouchers/grab-vouchers', {
                                        voucherType_id: this.standardForm.controls['voucherTypes_id'].value,
                                    }
                                ]);
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
                        this.loadingForm = false;
                    }
                )
            } else {
                this.errorSwal.fire().then(r => this.loadingForm = false);
            }
        }

    }
}
