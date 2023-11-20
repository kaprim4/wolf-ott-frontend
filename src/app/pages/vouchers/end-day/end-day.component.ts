import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {VoucherTemp, VoucherType} from "../../../core/interfaces/voucher";
import {Column, DeleteEvent} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {RoleService} from "../../../core/service/role.service";
import {TokenService} from "../../../core/service/token.service";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GasStation} from "../../../core/interfaces/gas_station";
import {InputProps, InputPropsTypesEnum} from "../../../core/interfaces/input_props";
import * as moment from "moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import Swal from "sweetalert2";

@Component({
  selector: 'app-end-day',
  templateUrl: './end-day.component.html',
  styleUrls: ['./end-day.component.scss']
})
export class EndDayComponent implements OnInit {
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
            (data) => {
                if (data) {
                    this.voucherTypes = data;
                    this.initFieldsConfig();
                }
            }
        );
    }

    private _fetchVoucherGasStationData() {
        this.voucherTempService.getVoucherTemps()?.subscribe((data) => {
            if (data) {
                data.map((voucher: VoucherTemp) => {
                    let gs: GasStation = voucher.gasStation;
                    if (!this.gasStations.includes(gs)) {
                        this.gasStations.push(gs);
                    }
                });
                this.initFieldsConfig();
            }
        });
    }

    get formValues() {
        return this.filterForm.controls;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Clôturer la journée",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Clôturer la journée', path: '.', active: true}
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
            (data: VoucherTemp[]) => {
                if (data && data.length > 0) {
                    data.map((voucher: VoucherTemp) => {
                        //if (voucher.voucherType.id == this.voucherType_id)
                        if (voucher.gasStation.id == this.tokenService.getPayload().gas_station_id){
                            if (this.voucherType_id != '') {
                                if (voucher.voucherType.id == this.voucherType_id){
                                    this.records.push(voucher);
                                }
                            }else{
                                this.records.push(voucher);
                            }
                        }

                    });
                    this.loading = false;
                } else {
                    this.error = "La liste est vide.";
                }
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: VoucherTemp) => record.id},
            {name: 'gasStation', label: 'Code Client', formatter: (record: VoucherTemp) => record.gasStation.libelle},
            {name: 'voucherType', label: 'Type Bon', formatter: (record: VoucherTemp) => record.voucherType.libelle},
            {
                name: 'slipNumber', label: 'Numéro Bordereau', formatter: (record: VoucherTemp) => {
                    return '<span class="badge bg-purple text-light fs-5 m-0">' + record.slipNumber + '<span>'
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
                    return moment(record.voucherDate).format('D MMMM YYYY')
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
        return row.gasStation?.libelle.toLowerCase().includes(term)
            || row.voucherType?.libelle.toLowerCase().includes(term)
            || row.slipNumber.toLowerCase().includes(term)
            || row.voucherNumber.toLowerCase().includes(term)
            || row.voucherAmount.toString().toLowerCase().includes(term)
            || row.vehiculeNumber.toLowerCase().includes(term)
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
                        (data: VoucherTemp) => {
                            if (data) {
                                this.voucherTempService.deleteVoucherTemp(data.id).subscribe(
                                    () => {
                                        Swal.fire({
                                            title: "Succès!",
                                            text: "Cette entrée a été supprimée avec succès.",
                                            icon: "success"
                                        }).then();
                                    },
                                    (error: string) => {
                                        this.errorSwal.fire().then(() => {
                                            this.error = error;
                                            console.log(error);
                                        });
                                    },
                                    (): void => {
                                        this.records.splice(deleteEvent.index, 1);
                                        this.loading = false;
                                    }
                                )
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
