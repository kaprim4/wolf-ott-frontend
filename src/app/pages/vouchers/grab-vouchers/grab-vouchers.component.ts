import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../core/interfaces/formType";
import {VoucherHeader, VoucherTemp, VoucherType} from "../../../core/interfaces/voucher";
import {EventType} from "../../../core/constants/events";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {Column, DeleteEvent} from "../../../shared/advanced-table/advanced-table.component";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {TokenService} from "../../../core/service/token.service";
import Swal from "sweetalert2";
import {VoucherControlService} from "../../../core/service/voucher-control.service";
import {isNumeric, padLeft} from "../../../core/helpers/functions";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {VoucherHeaderService} from "../../../core/service/voucher-header.service";

moment.locale('fr');

@Component({
    selector: 'app-grab-vouchers',
    templateUrl: './grab-vouchers.component.html',
    styleUrls: ['./grab-vouchers.component.scss']
})
export class GrabVouchersComponent implements OnInit {

    @Input()
    voucherTemp: VoucherTemp = {
        id: 0,
        voucherHeader: null,
        voucherType: null,
        voucherNumber: "",
        voucherAmount: 0,
        vehiculeNumber: "0",
        barcode: "",
        poste_produit: 0,
        gasStationOrigin: null,
        isActivated: false,
        isDeleted: false,
        createdAt: "",
        updatedAt: "",
    };

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    @ViewChild('deleteSwal')
    public readonly deleteSwal!: SwalComponent;

    constructor(
        private eventService: EventService,
        private voucherTypeService: VoucherTypeService,
        private fb: FormBuilder,
        private tokenService: TokenService,
        private voucherTempService: VoucherTempService,
        private voucherControlService: VoucherControlService,
        private voucherHeaderService: VoucherHeaderService,
    ) {
    }

    entityElm: IFormType = {label: 'Saisie de Bon', entity: 'grab-vouchers'}
    title: string = 'Saisie de Bon';

    records: VoucherTemp[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];

    formSubmitted: boolean = false;
    error: string = '';
    loadingForm: boolean = false;
    loadingList: boolean = false;
    isVerified: boolean = false;
    voucherError: string = 'Veuillez saisir une valeur valide.';

    voucherHeader!: VoucherHeader;
    voucherTypes: VoucherType[] = [];
    voucherType_id: number = 0;
    standardForm: FormGroup = this.fb.group({
        voucherType: [this.voucherType_id, Validators.required],
        voucherNumber: ['', Validators.required],
        vehiculeNumber: ['0'],
        voucherAmount: ['0']
    });

    get formValues() {
        return this.standardForm.controls;
    }

    initFieldsConfig(): void {
        if (this.voucherType_id != 3) {
            this.standardForm = this.fb.group({
                voucherType: [this.voucherType_id, Validators.required],
                voucherNumber: [this.voucherTemp?.voucherNumber, Validators.required],
                vehiculeNumber: [this.voucherTemp?.vehiculeNumber, Validators.required],
                voucherAmount: [this.voucherTemp?.voucherAmount, Validators.required]
            });
        } else {
            this.standardForm = this.fb.group({
                voucherType: [this.voucherType_id, Validators.required],
                voucherNumber: [this.voucherTemp?.voucherNumber, Validators.required],
                vehiculeNumber: [this.voucherTemp?.vehiculeNumber],
                voucherAmount: [this.voucherTemp?.voucherAmount]
            });
        }
    }

    _fetchVoucherHeader(): void {
        this.voucherHeaderService.getLastVoucherHeaderOpened(this.tokenService.getPayload().iat).subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getLastVoucherHeaderOpened has successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.voucherHeader = data.body;
                    this.voucherTemp.voucherHeader = data.body;
                    this.initFieldsConfig();
                    this._fetchData();
                } else {
                    this.error = "Aucun Bordereau n'est ouvert pour le moment.";
                }
                this.loadingForm = false;
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
    }

    _fetchVoucherTypes() {
        this.voucherTypeService.getVoucherTypes().subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getLastVoucherHeaderOpened has successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.voucherTypes = data.body;
                    this.initFieldsConfig();
                } else {
                    this.error = "Aucun Bordereau n'est ouvert pour le moment.";
                }
                this.loadingForm = false;
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
    }

    _fetchData(): void {
        this.voucherTempService.getVoucherTempByHeader(this.voucherHeader.id)?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getVoucherTemps a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        this.records = data.body;
                    } else {
                        this.error = "La liste est vide.";
                    }
                } else {
                    this.error = "La liste est vide.";
                }
                console.log('getVoucherTemps contains body: ', data.body);
                this.loadingList = false;
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
                this.loadingList = false;
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            //{name: 'id', label: '#', formatter: (record: VoucherTemp) => record.id},
            {name: 'gasStation', label: 'Code Client', formatter: (record: VoucherTemp) => record.voucherHeader.gasStation.libelle},
            {name: 'voucherType', label: 'Type Bon', formatter: (record: VoucherTemp) => record.voucherType.libelle},
            {
                name: 'slipNumber', label: 'Numéro Bordereau', formatter: (record: VoucherTemp) => {
                    return '<span class="badge bg-purple text-light fs-5 m-0">' + padLeft(String(record.voucherHeader.slipNumber), '0', 6) + '<span>'
                }
            },
            {name: 'voucherNumber', label: 'Numéro Bon', formatter: (record: VoucherTemp) => record.voucherNumber},
            {name: 'voucherAmount', label: 'Valeur', formatter: (record: VoucherTemp) => record.voucherAmount},
            {name: 'vehiculeNumber', label: 'Numéro Véhicule', formatter: (record: VoucherTemp) => record.vehiculeNumber},
            {
                name: 'voucherDate', label: 'Date Journée', formatter: (record: VoucherTemp) => {
                    return moment(record.voucherHeader.voucherDate).format('D MMMM YYYY')
                }
            },
        ];
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Type des bons",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Choix du type de Bon', path: '.'},
                {label: 'Saisie de Bon', path: '.', active: true},
            ]
        });
        this.loadingForm = true;
        this.loadingList = true;
        this._fetchVoucherHeader();
        this.initTableConfig();
        this._fetchVoucherTypes();
    }

    onSelect() {
        let _voucherType = this.standardForm.controls['voucherType'].value;
        if (_voucherType != 0) {
            this.voucherTypeService.getVoucherType(_voucherType)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`getVoucherType a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.voucherTemp.voucherType = data.body;
                        this.voucherType_id = data.body.id;
                        console.log('getVoucherType contains body: ', data.body);
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        } else {
            this.voucherType_id = 0;
            this.voucherTemp.voucherType = null;
        }
    }

    verifyVoucher() {
        this.formSubmitted = true;
        console.log(this.standardForm)
        if (this.standardForm.valid) {
            let voucherNumber: string = this.standardForm.controls['voucherNumber'].value;
            this.voucherTemp.createdAt = moment(now()).format('Y-M-DTHH:mm:ss').toString();
            this.voucherTemp.updatedAt = moment(now()).format('Y-M-DTHH:mm:ss').toString();
            this.voucherTemp.voucherNumber = voucherNumber;
            this.voucherTemp.isActivated = true;
            this.voucherTemp.poste_produit = 99;

            if (this.voucherType_id != 3) {
                this.voucherTemp.vehiculeNumber = this.standardForm.controls['vehiculeNumber'].value;
                this.voucherTemp.voucherAmount = this.standardForm.controls['voucherAmount'].value;
            }
            this.voucherTempService.getVoucherTempByVoucherNumber(voucherNumber)?.subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`getVoucherTempByVoucherNumber a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        Swal.fire({
                            title: "N° de bon existe déjà",
                            html: "Ce bon est saisi par la station " + this.voucherTemp.voucherHeader.gasStation?.libelle + " le " + moment(data.body.voucherDate).format('D MMMM YYYY') + ".<br /> Veuillez vérifier le numéro du bon s'il est correct.",
                            icon: "error",
                        });
                        this.voucherError = 'N° de bon existe déjà.';
                        this.isVerified = false;
                    } else {
                        if (this.voucherTemp.voucherType.id === 3) {
                            if (!isNumeric(voucherNumber)) {
                                Swal.fire({
                                    title: "N° de bon erroné",
                                    html: "Le N° de série de bon WINXO est toujours <b>Numérique</b>.<br /> Veuillez <b>vérifier</b> le type de bon s'il est correct.",
                                    icon: "error",
                                });
                                this.voucherError = 'N° de bon erroné.';
                                this.isVerified = false;
                            } else {
                                this.voucherControlService.getVoucherControlByVoucherNumber(this.voucherTemp.voucherNumber).subscribe(
                                    (data: HttpResponse<any>) => {
                                        if (data.status === 200 || data.status === 202) {
                                            console.log(`getVoucherControlByVoucherNumber a successfull status code: ${data.status}`);
                                        }
                                        if (data.body) {
                                            this.voucherTemp.voucherAmount = data.body.voucherAmount;
                                            Swal.fire({
                                                title: "N° de bon valide",
                                                icon: "info",
                                                confirmButtonText: "Continuer"
                                            });
                                            this.isVerified = true;
                                        } else {
                                            Swal.fire({
                                                title: "N° de bon introuvable",
                                                html: "Le N° de série de bon WINXO est <b>introuvable</b>.<br /> Veuillez <b>vérifier</b> le type de bon s'il est correct.",
                                                icon: "error",
                                            });
                                            this.voucherError = 'N° de bon erroné.';
                                            this.isVerified = false;
                                        }
                                        console.log('getVoucherControlByVoucherNumber contains body: ', data.body);
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
                                );
                            }
                        } else {
                            Swal.fire({
                                title: "N° de bon valide",
                                icon: "info",
                                confirmButtonText: "Continuer"
                            });
                            this.voucherError = '';
                            this.isVerified = true;
                        }
                    }
                    console.log('getVoucherTempByVoucherNumber This contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        }
    }

    onSubmit() {
        this.voucherTempService.addVoucherTemp(this.voucherTemp).subscribe(
            (data3: HttpResponse<any>) => {
                if (data3.status === 200 || data3.status === 202) {
                    console.log(`Got a successfull status code: ${data3.status}`);
                }
                if (data3.body) {
                    this.records.push(this.voucherTemp);
                    this.successSwal.fire();
                    this.isVerified = false;
                }
                console.log('This contains body: ', data3.body);
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
        );
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
            this.loadingList = true;
            if (re.isConfirmed) {
                if (deleteEvent.id) {
                    this.voucherTempService.getVoucherTemp(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                if (data) {
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
                                            this.loadingList = false;
                                        }
                                    );
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
                } else {
                    this.loadingList = false;
                    this.error = this.entityElm.label + " introuvable.";
                }
            }
        });
    }
}
