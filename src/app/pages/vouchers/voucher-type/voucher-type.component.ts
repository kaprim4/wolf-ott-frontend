import {Component, OnInit, ViewChild} from '@angular/core';
import {EventType} from "../../../core/constants/events";
import {EventService} from "../../../core/service/event.service";
import {IFormType} from "../../../core/interfaces/formType";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VoucherHeader, VoucherHeaderResponse, VoucherResponseHeader} from "../../../core/interfaces/voucher";
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
import {Column, DeleteEvent} from "../../../shared/advanced-table/advanced-table.component";
import {padLeft} from "../../../core/helpers/functions";
import Swal from "sweetalert2";

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
        isDayOver: false,
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
        voucherDate: ['', Validators.required],
    });

    gasStation: GasStation | null = null;
    voucherResponseHeader: VoucherResponseHeader | null = null;

    formSubmitted: boolean = false;
    error: string = '';
    errorList: string = '';
    loadingForm: boolean = false;
    loadingList: boolean = false;
    slipNumber: number = 0;

    records: VoucherHeaderResponse[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];

    _fetchData(): void {
        this.voucherHeaderService.getVoucherHeaders()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        this.records = [];
                        data.body.map((voucherHeaderResponse: VoucherHeaderResponse) => {
                            if (voucherHeaderResponse.voucherHeader.gasStation.id == this.tokenService.getPayload().gas_station_id) {
                                this.records.push(voucherHeaderResponse);
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

    private _fetchVoucherHeaderData() {
        this.voucherHeaderService.getNextVoucherHeader(this.tokenService.getPayload().gas_station_id)?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.voucherResponseHeader = data.body;
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
        this._fetchVoucherHeaderData();
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: VoucherHeaderResponse) => record.id},
            {name: 'gasStation', label: 'Station', formatter: (record: VoucherHeaderResponse) => record.voucherHeader.gasStation.libelle},
            {
                name: 'slipNumber', label: 'Numéro Bordereau', formatter: (record: VoucherHeaderResponse) => {
                    return '<a href="' + this.router.createUrlTree(['vouchers/grab-vouchers', {voucherHeader_id: record.voucherHeader.id}]) + '" class="btn btn-success btn-xs waves-effect waves-light"> ' + padLeft(String(record.voucherHeader.slipNumber), '0', 6) + '<span class="btn-label-right"><i class="mdi mdi-check-all"></i></span></a>'
                }
            },
            {
                name: 'voucherDate', label: 'Date Journée', formatter: (record: VoucherHeaderResponse) => {
                    return moment(record.voucherHeader.voucherDate).format('D MMMM YYYY')
                }
            },
            {
                name: 'voucherCount', label: 'Nombre de bon', formatter: (record: VoucherHeaderResponse) => {
                    return record.voucherCount
                }
            },
            {
                name: 'voucherSum', label: 'Valeur total', formatter: (record: VoucherHeaderResponse) => {
                    return record.voucherSum
                }
            },
            {
                name: 'isDayOver', label: 'Journée clôturée ?', formatter: (record: VoucherHeaderResponse) => {
                    return (record.voucherHeader.isDayOver ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: VoucherHeaderResponse) => {
                    return (record.voucherHeader.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: VoucherHeaderResponse) => {
                    return moment(record.voucherHeader.createdAt).format('D MMMM YYYY')
                }
            },
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

    matches(row: VoucherHeaderResponse, term: string) {
        return row.voucherHeader.gasStation?.libelle.toLowerCase().includes(term)
            || row.voucherHeader.slipNumber.toString().toLowerCase().includes(term)
            || row.voucherHeader.voucherDate.toLowerCase().includes(term);
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
            Swal.fire({
                title: "Etes-vous sûr?",
                html: 'Vous êtes sur le point de créer un nouveau Bordereau pour la journée du <b>' + moment(this.standardForm.controls['voucherDate'].value).format('D MMMM YYYY') + '</b>.<br />Voulez-vous vraiment procèder ?',
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#28bb4b",
                cancelButtonColor: "#f34e4e",
                confirmButtonText: "Oui, supprimez-le !"
            }).then((re) => {
                if (re.isConfirmed) {
                    this.loadingForm = true;
                    this.voucherHeaderService.getLastVoucherHeaderOpened().subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`getLastVoucherHeaderOpened has successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                Swal.fire({
                                    title: "Opération impossible",
                                    html: 'Un bordereau portant le N° <b>' + padLeft(String(data.body.slipNumber), '0', 6) + '</b> en date du <b>' + moment(data.body.voucherDate).format('D MMMM YYYY') + '</b> est toujours <b>OUVERT</b>.<br /> Veuillez <b>Clôturer</b> la journée et réessayer.',
                                    icon: "error",
                                });
                                this.loadingForm = false;
                            } else {
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
                                                let v: VoucherHeaderResponse = {
                                                    id: this.voucherHeader.id,
                                                    voucherCount: 0,
                                                    voucherHeader: this.voucherHeader,
                                                    voucherSum: 0
                                                }
                                                this.records.push(v);
                                                this.successSwal.fire();
                                                this.loadingForm = false;
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
                                }
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
                            this.loadingForm = false;
                        }
                    )
                }else{
                    this.loadingForm = false;
                }
            });
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
            this.loadingList = true;
            if (re.isConfirmed) {
                console.log("deleteEvent: ", deleteEvent.id)
                if (deleteEvent.id) {
                    this.voucherHeaderService.deleteVoucherHeader(deleteEvent.id).subscribe(
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
                                    this.errorList = err.message;
                                    console.log(err.message);
                                });
                            }
                        },
                        (): void => {
                            this.records.splice(deleteEvent.index, 1);
                            this.loadingList = false;
                        }
                    );

                } else {
                    this.loadingList = false;
                    this.errorList = this.entityElm.label + " introuvable.";
                }
            }
        });
    }
}
