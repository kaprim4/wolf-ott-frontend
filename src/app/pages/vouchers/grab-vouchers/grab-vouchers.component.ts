import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {VoucherTypeService} from "../../../core/service/voucher-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IFormType} from "../../../core/interfaces/formType";
import {VoucherTemp, VoucherType} from "../../../core/interfaces/voucher";
import {EventType} from "../../../core/constants/events";
import * as moment from "moment/moment";
import {now} from "moment/moment";
import {Column, DeleteEvent} from "../../../shared/advanced-table/advanced-table.component";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {TokenService} from "../../../core/service/token.service";
import {GasStationService} from "../../../core/service/gas-station.service";
import Swal from "sweetalert2";
import {GasStation} from "../../../core/interfaces/gas_station";

@Component({
    selector: 'app-grab-vouchers',
    templateUrl: './grab-vouchers.component.html',
    styleUrls: ['./grab-vouchers.component.scss']
})
export class GrabVouchersComponent implements OnInit {
    @Input()
    voucherTemp: VoucherTemp = {
        barcode: "",
        createdAt: "",
        gasStation: null,
        gasStationOrigin: null,
        id: 0,
        isActivated: false,
        isDeleted: false,
        poste_produit: 0,
        slipNumber: "",
        updatedAt: "",
        vehiculeNumber: "",
        voucherAmount: 0,
        voucherDate: "",
        voucherNumber: "",
        voucherType: null
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
        private router: Router,
        private fb: FormBuilder,
        private activated: ActivatedRoute,
        private tokenService: TokenService,
        private voucherTempService: VoucherTempService,
        private gasStationService: GasStationService,
    ) {
    }

    voucherType_id: number = 0;
    voucherDate: string = '';
    slipNumber: string = '';
    voucher_type_name: string = '';
    gasStation: GasStation | null = null;

    entityElm: IFormType = {
        label: 'Saisie de Bon',
        entity: 'grab-vouchers'
    }
    title: string = 'Saisie de Bon';

    records: VoucherTemp[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];

    standardForm: FormGroup = this.fb.group({
        voucherType_id: [''],
        voucherDate: [''],
        slipNumber: [''],
        voucherNumber: ['', Validators.required],
        vehiculeNumber: ['', Validators.required],
        voucherAmount: ['', Validators.required]
    });

    formSubmitted: boolean = false;
    error: string = '';
    loadingForm: boolean = false;
    loadingList: boolean = false;

    get formValues() {
        return this.standardForm.controls;
    }

    initFieldsConfig(): void {
        if (this.voucherType_id === 4) {
            this.standardForm = this.fb.group({
                voucherType_id: [this.voucherTemp.voucherType?.id],
                voucherDate: [this.voucherTemp.voucherDate],
                slipNumber: [this.voucherTemp.slipNumber],
                voucherNumber: [this.voucherTemp.voucherNumber, Validators.required],
                vehiculeNumber: [this.voucherTemp.vehiculeNumber, Validators.required],
                voucherAmount: [this.voucherTemp.voucherAmount, Validators.required]
            });
        } else {
            this.standardForm = this.fb.group({
                voucherType_id: [this.voucherTemp.voucherType?.id],
                voucherDate: [this.voucherTemp.voucherDate],
                slipNumber: [this.voucherTemp.slipNumber],
                voucherNumber: [this.voucherTemp.voucherNumber, Validators.required],
            });
        }
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

        let _id = Number(this.activated.snapshot.paramMap.get('voucherType_id'));
        if (_id) {
            this.voucherType_id = _id;
            let _date = this.activated.snapshot.paramMap.get('voucherDate');
            if (_date) {
                this.voucherDate = _date;
                let _slipNumber = this.activated.snapshot.paramMap.get('slipNumber');
                if (_slipNumber) {
                    this.slipNumber = _slipNumber;
                    this.gasStationService.getGasStation(this.tokenService.getPayload().gas_station_id).subscribe((_gasStation) => {
                        if (_gasStation) {
                            this.gasStation = _gasStation;
                            this.voucherTypeService.getVoucherType(this.voucherType_id)?.subscribe((data: VoucherType) => {
                                if (data) {
                                    this.voucher_type_name = data.libelle;
                                    this.title = 'Saisie de Bon de type ' + this.voucher_type_name;
                                    this.voucherTemp.gasStation = _gasStation;
                                    this.voucherTemp.isActivated = true;
                                    this.voucherTemp.poste_produit = 99;
                                    this.voucherTemp.voucherDate = this.voucherDate;
                                    this.voucherTemp.voucherType = data;
                                    this.voucherTemp.slipNumber = this.slipNumber;
                                    this.loadingForm = false;
                                    this.initFieldsConfig();
                                }
                            });
                        }
                    });
                }
            } else {
                this.router.navigate(['vouchers/voucher-type']);
            }
        } else {
            this.router.navigate(['vouchers/voucher-type']);
        }
        this.initTableConfig();
        this._fetchData();
    }

    async onSubmit() {
        this.formSubmitted = true;
        if (this.standardForm.valid) {
            let voucherNumber: string = this.standardForm.controls['voucherNumber'].value;
            this.voucherTempService.getVoucherTempByVoucherNumber(voucherNumber)?.subscribe((v: VoucherTemp) => {
                if (v) {
                    Swal.fire({
                        title: "N° de bon existe déjà",
                        text: "Ce bon est saisi par la station " + v.gasStation?.libelle + ". Veuillez vérifier le numéro du bon s'il est correct.",
                        icon: "error"
                    })
                }
            }, (error) => {
                this.voucherTypeService.getVoucherType(this.voucherType_id)?.subscribe((voucherType: VoucherType) => {
                    if (voucherType) {
                        this.voucherTemp.createdAt = moment(now()).format('Y-M-DTHH:mm:ss').toString();
                        this.voucherTemp.updatedAt = moment(now()).format('Y-M-DTHH:mm:ss').toString();
                        if (this.voucherType_id === 4) {
                            this.voucherTemp.vehiculeNumber = this.standardForm.controls['vehiculeNumber'].value;
                            this.voucherTemp.voucherAmount = this.standardForm.controls['voucherAmount'].value;
                        }
                        this.voucherTemp.voucherNumber = voucherNumber;
                        this.voucherTemp.voucherType = voucherType;
                        this.voucherTempService.addVoucherTemp(this.voucherTemp).subscribe(
                            (data) => {
                                if (data) {
                                    console.log(data);
                                    this.records.push(this.voucherTemp);
                                    this.successSwal.fire();
                                }
                            },
                            (error: string) => {
                                this.errorSwal.fire().then((r) => {
                                    this.error = error;
                                    console.log(error);
                                });
                            },
                            (): void => {
                                this.loadingForm = false;
                            }
                        )
                    }
                });
            });
        }
    }

    _fetchData()
        :
        void {
        this.voucherTempService.getVoucherTemps()?.subscribe(
            (data: VoucherTemp[]) => {
                if (data && data.length > 0) {
                    console.log("data:", data);
                    this.records = [];
                    data.map((voucher: VoucherTemp) => {
                        if (voucher.voucherDate === this.voucherDate && voucher.voucherType.id === this.voucherType_id) {
                            if (this.tokenService.getPayload().role_id === 1) {
                                this.records.push(voucher);
                            } else {
                                if (voucher.gasStation === this.gasStation) {
                                    this.records.push(voucher);
                                }
                            }
                        }
                    });
                    console.log("records:", this.records);
                    this.loadingList = false;
                } else {
                    this.error = "La liste est vide.";
                }
            }
        );
    }

    initTableConfig()
        :
        void {
        this.columns = [
            //{name: 'id', label: '#', formatter: (record: VoucherTemp) => record.id},
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
                    return moment(record.voucherDate).format('D MMM YYYY')
                }
            },
        ];
    }

    compare(v1
                :
                number | string | boolean, v2
                :
                number | string | boolean
    ):
        any {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    onSort(event
               :
               SortEvent
    ):
        void {
        if (event.direction === ''
        ) {
            this._fetchData();
        } else {
            this.records = [...this.records].sort((a, b) => {
                const res = this.compare(a[event.column], b[event.column]);
                return event.direction === 'asc' ? res : -res;
            });
        }
    }

    matches(row
                :
                VoucherTemp, term
                :
                string
    ) {
        return row.gasStation?.libelle.toLowerCase().includes(term)
            || row.voucherType?.libelle.toLowerCase().includes(term)
            || row.slipNumber.toLowerCase().includes(term)
            || row.voucherNumber.toLowerCase().includes(term)
            || row.voucherAmount.toString().toLowerCase().includes(term)
            || row.vehiculeNumber.toLowerCase().includes(term)
            || row.voucherDate.toLowerCase().includes(term);
    }

    searchData(searchTerm
                   :
                   string
    ):
        void {
        if (searchTerm === ''
        ) {
            this._fetchData();
        } else {
            this._fetchData();
            let updatedData = this.records;
            updatedData = updatedData.filter(record => this.matches(record, searchTerm));
            this.records = updatedData;
        }
    }

    deleteRow(deleteEvent
                  :
                  DeleteEvent
    ) {
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
                                        this.loadingList = false;
                                    }
                                )
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
