import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {VoucherHeaderService} from "../../../core/service/voucher-header.service";
import {TokenService} from "../../../core/service/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../core/interfaces/formType";
import {Invoice, Slip} from "../../extra-pages/invoice/invoice.model";
import {SupervisorService} from "../../../core/service/supervisor.service";
import {GasStationService} from "../../../core/service/gas-station.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {GasStation} from "../../../core/interfaces/gas_station";
import {Supervisor} from "../../../core/interfaces/supervisor";
import {VoucherHeader, VoucherLine} from "../../../core/interfaces/voucher";
import {padLeft} from "../../../core/helpers/functions";
import {VoucherLineService} from "../../../core/service/voucher-line.service";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";

@Component({
    selector: 'app-pdf-generation',
    templateUrl: './pdf-generation.component.html',
    styleUrls: ['./pdf-generation.component.scss']
})
export class PdfGenerationComponent implements OnInit {

    constructor(
        private eventService: EventService,
        private gasStationService: GasStationService,
        private supervisorService: SupervisorService,
        private voucherHeaderService: VoucherHeaderService,
        private voucherTempService: VoucherTempService,
        private voucherLineService: VoucherLineService,
        private tokenService: TokenService,
        private router: Router,
        private activated: ActivatedRoute,
    ) {
    }

    @ViewChild('successSwal')
    public readonly successSwal!: SwalComponent;

    @ViewChild('errorSwal')
    public readonly errorSwal!: SwalComponent;

    entityElm: IFormType = {
        label: 'Bon saisi',
        entity: 'gas-station-voucher'
    }

    title: string = 'Choix du type de Bon';

    loadingList: boolean = false;
    invoiceData!: Slip;
    gasStation!: GasStation;
    supervisor!: Supervisor;
    voucherHeader!: VoucherHeader;
    voucherLines!: VoucherLine[];

    private _fetchGasStation() {
        this.gasStationService.getGasStation(this.tokenService.getPayload().gas_station_id).subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getGasStation a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.gasStation = data.body;
                    this.supervisorService.getSupervisor(data.body.supervisor.id).subscribe(
                        (data2: HttpResponse<any>) => {
                            if (data2.status === 200 || data2.status === 202) {
                                console.log(`getSupervisor a successfull status code: ${data2.status}`);
                            }
                            if (data2.body) {
                                this.supervisor = data2.body;
                                this._fetchData();
                            }
                            console.log('getSupervisor contains body: ', data2.body);
                        },
                        (err: HttpErrorResponse) => {
                            if (err.status === 403 || err.status === 404) {
                                console.error(`${err.status} status code caught`);
                                this.errorSwal.fire().then((r) => {
                                    console.log(err.message);
                                });
                            }
                        }
                    );
                    this._fetchData();
                }
                console.log('getGasStation contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    this.errorSwal.fire().then((r) => {
                        console.log(err.message);
                    });
                }
            }
        );
    }

    private _fetchVoucherHeader() {
        let _voucherHeader_id = Number(this.activated.snapshot.paramMap.get('voucherHeader_id'));
        if (_voucherHeader_id) {
            this.voucherHeaderService.getVoucherHeader(_voucherHeader_id).subscribe(
                (data: HttpResponse<any>) => {
                    if (data.status === 200 || data.status === 202) {
                        console.log(`getVoucherHeader a successfull status code: ${data.status}`);
                    }
                    if (data.body) {
                        this.voucherHeader = data.body;
                        this.voucherTempService.getVoucherTempByHeader(data.body.id).subscribe(
                            (data: HttpResponse<any>) => {
                                if (data.status === 200 || data.status === 202) {
                                    console.log(`getVoucherHeader a successfull status code: ${data.status}`);
                                }
                                if (data.body) {
                                    this.voucherLines = data.body;
                                    this._fetchData();
                                }
                                console.log('getVoucherHeader contains body: ', data.body);
                            },
                            (err: HttpErrorResponse) => {
                                if (err.status === 403 || err.status === 404) {
                                    console.error(`${err.status} status code caught`);
                                }
                            }
                        );
                    }
                    console.log('getVoucherHeader contains body: ', data.body);
                },
                (err: HttpErrorResponse) => {
                    if (err.status === 403 || err.status === 404) {
                        console.error(`${err.status} status code caught`);
                    }
                }
            );
        }
    }

    _fetchData(): void {
        this.invoiceData = {
            slipNumber: padLeft(String(this.voucherHeader?.slipNumber), '0', 6),
            title: [],
            supervisor: this.supervisor,
            date: "",
            signature: "",
            vouchers: this.voucherLines,
            discount: 0,
            sub_total: 0,
            total: 0,
            vat: 0,
        }
        this.loadingList = false;
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Génération PDF",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Génération PDF', path: '.', active: true}
            ]
        });
        this.loadingList = true;
        this._fetchData();
        this._fetchGasStation();
        this._fetchVoucherHeader();

    }
}
