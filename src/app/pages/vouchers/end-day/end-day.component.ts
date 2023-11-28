import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {VoucherLine, VoucherTemp, VoucherTypeSum} from "../../../core/interfaces/voucher";
import {Column, DeleteEvent} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {RoleService} from "../../../core/service/role.service";
import {TokenService} from "../../../core/service/token.service";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InputProps} from "../../../core/interfaces/input_props";
import * as moment from "moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import Swal from "sweetalert2";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {padLeft} from "../../../core/helpers/functions";
import {VoucherLineService} from "../../../core/service/voucher-line.service";
import {Router} from "@angular/router";
import {now} from "moment/moment";
import {VoucherHeaderService} from "../../../core/service/voucher-header.service";

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
        label: 'Bon saisi',
        entity: 'gas-station-temp'
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private roleService: RoleService,
        private tokenService: TokenService,
        private voucherTempService: VoucherTempService,
        private voucherLineService: VoucherLineService,
        private voucherHeaderService: VoucherHeaderService,
        private router: Router,
        private fb: FormBuilder,
    ) {
    }

    filterForm: FormGroup = this.fb.group({
        voucherType_id: [''],
    });

    objectProps: InputProps[] = [];
    voucherType_id: string = '';
    sum: number = 0;
    count: number = 0;
    voucherTypeSums: VoucherTypeSum[] = [];

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
        this._fetchData();
        this._fetchStatisticsData();
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

    _fetchStatisticsData(): void {
        this.voucherTempService.getVoucherTempStatistics()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        data.body.map((value: any) => {
                            let imageName: string | null = "./assets/images/no_image.png";
                            if (value[0].file && value[0].file?.id) {
                                imageName = `data:${value[0].file?.imageType};base64,${value[0].file?.imageData}`;
                            }
                            this.voucherTypeSums.push({
                                voucherType: value[0],
                                voucherTypeIcon: `data:${value[0].file?.imageType};base64,${value[0].file?.imageData}`,
                                sum: value[1],
                                count: value[2],
                            });
                            this.sum += value[1];
                            this.count += value[2];
                        });
                        this.loading = false;
                        console.log("voucherTypeSums: ", this.voucherTypeSums);
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
                    return '<span class="badge bg-purple text-light fs-5 m-0">' + padLeft(String(record.voucherHeader.slipNumber), '0', 6) + '<span>'
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
        return row.voucherHeader.gasStation?.libelle.toLowerCase().includes(term)
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
                                        console.log('This contains body: ', data.body);
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

    endTheDay() {
        this.loading = true;
        this.voucherHeaderService.getLastVoucherHeaderOpened().subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getLastVoucherHeaderOpened has successfull status code: ${data.status}`);
                }
                if (data.body) {

                }
                console.log('getLastVoucherHeaderOpened contains body: ', data.body);
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

        /*this.records.map((voucherTemp: VoucherTemp) => {
            let voucherLine: VoucherLine = {
                id: 0,
                voucherTemp: voucherTemp,
                isActivated: true,
                isDeleted: false,
                createdAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
                updatedAt: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
            }
            this.voucherLineService.addVoucherLine(voucherLine).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`Got a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.successSwal.fire().then(() => {
                            this.router.navigate(['vouchers/end-day'])
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
        });*/
    }
}
