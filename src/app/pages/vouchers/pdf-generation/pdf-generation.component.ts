import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {VoucherHeaderService} from "../../../core/service/voucher-header.service";
import {TokenService} from "../../../core/service/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../core/interfaces/formType";
import {Slip} from "../../extra-pages/invoice/invoice.model";
import {SupervisorService} from "../../../core/service/supervisor.service";
import {GasStationService} from "../../../core/service/gas-station.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {GasStation} from "../../../core/interfaces/gas_station";
import {Supervisor} from "../../../core/interfaces/supervisor";
import {VoucherHeader, VoucherTemp, VoucherTypeSum} from "../../../core/interfaces/voucher";
import {padLeft} from "../../../core/helpers/functions";
import {VoucherLineService} from "../../../core/service/voucher-line.service";
import {VoucherTempService} from "../../../core/service/voucher-temp.service";
import * as moment from "moment/moment";
import {now} from "moment";

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
    error: string = '';
    invoiceData: Slip = {
        documentDate: "",
        signature: "",
        slipDate: "",
        slipNumber: "",
        sum: [],
        sumLetters: "",
        supervisor: undefined,
        title: [],
        vouchers1: [],
        vouchers2: [],
        vouchers3: []

    };
    gasStation!: GasStation;
    supervisor!: Supervisor;
    voucherHeader!: VoucherHeader;
    voucherLines1: VoucherTemp[] = [];
    voucherLines2: VoucherTemp[] = [];
    voucherLines3: VoucherTemp[] = [];
    sum: number = 0;
    count: number = 0;
    voucherTypeSums: VoucherTypeSum[] = [];
    chunk: number = 14;

    private _fetchGasStation() {
        this.gasStationService.getGasStation(this.tokenService.getPayload().iat).subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getGasStation a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    this.gasStation = data.body;
                    this._fetchData();
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
                        this._fetchData();
                        this.voucherTempService.getVoucherTempByHeader(data.body.id).subscribe(
                            (data: HttpResponse<any>) => {
                                if (data.status === 200 || data.status === 202) {
                                    console.log(`getVoucherTempByHeader a successfull status code: ${data.status}`);
                                }
                                if (data.body) {
                                    data.body.map((v: VoucherTemp, index: number) => {
                                        if (index < 14) {
                                            this.voucherLines1.push(v);
                                        } else if (index >= 14 && index < 28) {
                                            this.voucherLines2.push(v);
                                        } else {
                                            this.voucherLines3.push(v);
                                        }
                                    });
                                    this._fetchStatisticsData();
                                    this._fetchGasStation();
                                    this._fetchData();
                                }
                                console.log('getVoucherTempByHeader contains body: ', data.body);
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

    _fetchStatisticsData(): void {
        this.voucherTempService.getVoucherTempStatistics(this.voucherHeader.id)?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`getVoucherTempStatistics a successfull status code: ${data.status}`);
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
                        console.log("voucherTypeSums: ", this.voucherTypeSums);
                    } else {
                        this.error = "La liste est vide.";
                    }

                }
                console.log('getVoucherTempStatistics contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
        );
    }

    _fetchData(): void {
        this.invoiceData = {
            slipNumber: padLeft(String(this.voucherHeader?.slipNumber), '0', 6),
            title: [],
            supervisor: this.supervisor,
            slipDate: moment(this.voucherHeader?.voucherDate).format('D MMMM YYYY'),
            signature: "",
            vouchers1: this.voucherLines1,
            vouchers2: this.voucherLines2,
            vouchers3: this.voucherLines3,
            documentDate: moment(now()).format('D MMMM YYYY'),
            sum: [
                this.voucherLines1.map((v) => v.voucherAmount).flat().reduce((a, b) => a + b, 0),
                this.voucherLines2.map((v) => v.voucherAmount).flat().reduce((a, b) => a + b, 0),
                this.voucherLines3.map((v) => v.voucherAmount).flat().reduce((a, b) => a + b, 0)
            ],
            sumLetters: "-----------------------------"
        }
        console.log("invoiceData: ", this.invoiceData)
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
        this._fetchVoucherHeader();
    }
}
