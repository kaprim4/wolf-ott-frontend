import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {Column, DeleteEvent} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import * as moment from "moment/moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {RoleService} from "../../../core/service/role.service";
import {VoucherTemp, VoucherType} from "../../../core/interfaces/voucher";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";
import Swal from "sweetalert2";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputProps, InputPropsTypesEnum} from "../../../core/interfaces/input_props";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {GasStation} from "../../../core/interfaces/gas_station";
import {TokenService} from "../../../core/service/token.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

moment.locale('fr');

@Component({
    selector: 'app-voucher-consult',
    templateUrl: './voucher-consult.component.html',
    styleUrls: ['./voucher-consult.component.scss']
})
export class VoucherConsultComponent implements OnInit {

    records: VoucherTemp[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Bon temporaire',
        entity: 'gas-station-temp'
    }

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    @ViewChild('deleteSwal')
    public readonly deleteSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private roleService: RoleService,
        private tokenService: TokenService,
        private voucherTempService: VoucherTempService,
        private voucherTypeService: VoucherTypeService,
        private fb: FormBuilder,
    ) {
    }

    filterForm: FormGroup = this.fb.group({
        voucherType_id: [''],
    });
    formSubmitted: boolean = false;
    voucherTypes: VoucherType[] = [];
    gasStations: GasStation[] = [];
    objectProps: InputProps[] = [];
    voucherType_id: string = '';
    gasStation_id: number = 0;


    initFieldsConfig(): void {
        this.objectProps = [
            {
                input: 'voucherType_id',
                label: 'Type Bon',
                type: InputPropsTypesEnum.S,
                value: this.voucherType_id,
                joinTable: this.voucherTypes,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },
            /*{
                input: 'gasStation_id',
                label: 'Type Bon',
                type: InputPropsTypesEnum.S,
                value: this.gasStation_id,
                joinTable: this.gasStations,
                joinTableId: 'id',
                joinTableIdLabel: 'libelle'
            },*/
        ]
    }

    private _fetchVoucherTypeData() {
        this.voucherTypeService.getVoucherTypes()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.voucherTypes = data.body;
                    this.initFieldsConfig();
                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            },
        );
    }

    private _fetchVoucherGasStationData() {
        this.voucherTempService.getVoucherTemps()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    data.body.map((voucher: VoucherTemp) => {
                        let gs: GasStation = voucher.voucherHeader.gasStation;
                        if (!this.gasStations.includes(gs)) {
                            this.gasStations.push(gs);
                        }
                    });
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
    }

    get formValues() {
        return this.filterForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Consulter les bons saisis",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Consulter les bons saisis', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchVoucherGasStationData();
        this._fetchVoucherTypeData();
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.voucherTempService.getVoucherTemps()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        data.body.map((voucher: VoucherTemp) => {
                            //if (voucher.voucherType.id == this.voucherType_id)
                            if (voucher.voucherHeader.gasStation.id == this.tokenService.getPayload().gas_station_id) {
                                if (this.voucherType_id != '') {
                                    if (voucher.voucherType.id == this.voucherType_id) {
                                        this.records.push(voucher);
                                    }
                                } else {
                                    this.records.push(voucher);
                                }
                            }

                        });
                        this.loading = false;
                    } else {
                        this.error = "La liste est vide.";
                    }
                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: VoucherTemp) => record.id},
            {name: 'gasStation', label: 'Code Client', formatter: (record: VoucherTemp) => record.voucherHeader.gasStation.libelle},
            {name: 'voucherType', label: 'Type Bon', formatter: (record: VoucherTemp) => record.voucherType.libelle},
            {
                name: 'slipNumber', label: 'Numéro Bordereau', formatter: (record: VoucherTemp) => {
                    return '<span class="badge bg-purple text-light fs-5 m-0">' + record.voucherHeader.slipNumber + '<span>'
                }
            },
            {name: 'voucherNumber', label: 'Numéro Bon', formatter: (record: VoucherTemp) => record.voucherNumber},
            {name: 'voucherAmount', label: 'Valeur', formatter: (record: VoucherTemp) => record.voucherAmount},
            {
                name: 'vehiculeNumber',
                label: 'Numéro Véhicule',
                formatter: (record: VoucherTemp) => record.vehiculeNumber
            },
            {
                name: 'voucherDate', label: 'Date Journée', formatter: (record: VoucherTemp) => {
                    return moment(record.voucherHeader.voucherDate).format('D MMMM YYYY')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: VoucherTemp) => {
                    return moment(record.createdAt).format('D MMMM YYYY')
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

    matches(row: VoucherTemp, term: string) {
        return row.voucherHeader?.gasStation?.libelle.toLowerCase().includes(term)
            || row.voucherType?.libelle.toLowerCase().includes(term)
            || row.voucherHeader.slipNumber.toLowerCase().includes(term)
            || row.voucherNumber.toLowerCase().includes(term)
            || row.voucherAmount.toString().toLowerCase().includes(term)
            || row.vehiculeNumber.toLowerCase().includes(term);
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

    deleteRow(deleteEvent: DeleteEvent) {
        Swal.fire({
            title: "Etes-vous sûr?",
            text: "Voulez vous procèder à la suppression de cet entrée ?",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#28bb4b",
            cancelButtonColor: "#f34e4e",
            confirmButtonText: "Oui, supprimez-le !"
        }).then((re) => {
            this.loading = true;
            if (re.isConfirmed) {
                if (deleteEvent.id) {
                    this.voucherTempService.getVoucherTemp(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                this.voucherTempService.deleteVoucherTemp(data.body.id).subscribe(
                                    (data2: HttpResponse<any>) => {
                                        if (data2.status === 200 || data2.status === 202) {
                                            console.log(`Got a successfull status code: ${data2.status}`);
                                        }
                                        if (data2.body) {
                                            Swal.fire({
                                                title: "Succès!",
                                                text: "Cette entrée a été supprimée avec succès.",
                                                icon: "success"
                                            }).then();
                                        }
                                        console.log('This contains body: ', data2.body);
                                    },
                                    (err: HttpErrorResponse) => {
                                        if (err.status === 403 || err.status === 404) {
                                            console.error(`${err.status} status code caught`);
                                            this.errorSwal.fire().then(() => {
                                                this.error = err.message;
                                                console.log(err.message);
                                            });
                                        }
                                    },
                                    (): void => {
                                        this.records.splice(deleteEvent.index, 1);
                                        this.loading = false;
                                    }
                                )
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
                    this.error = this.entityElm.label + " introuvable.";
                }
            }
        });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.filterForm.valid) {
            this.loading = true;
            this.records = [];
            this.voucherType_id = this.filterForm.controls['voucherType_id'].value;
            this._fetchData();
        }
    }
}
