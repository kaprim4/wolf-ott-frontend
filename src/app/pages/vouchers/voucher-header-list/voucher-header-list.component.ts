import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {VoucherHeaderService} from "../../../core/service/voucher-header.service";
import {TokenService} from "../../../core/service/token.service";
import {Router} from "@angular/router";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";
import {IFormType} from "../../../core/interfaces/formType";
import {VoucherHeaderResponse} from "../../../core/interfaces/voucher";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {EventType} from "../../../core/constants/events";
import {padLeft} from "../../../core/helpers/functions";
import * as moment from "moment/moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";

@Component({
    selector: 'app-voucher-header-list',
    templateUrl: './voucher-header-list.component.html',
    styleUrls: ['./voucher-header-list.component.scss']
})
export class VoucherHeaderListComponent implements OnInit {

    constructor(
        private eventService: EventService,
        private voucherHeaderService: VoucherHeaderService,
        private tokenService: TokenService,
        private router: Router,
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

    formSubmitted: boolean = false;
    errorList: string = '';
    loadingList: boolean = false;

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
                        data.body.map((vhr: VoucherHeaderResponse) => {
                            if (vhr.voucherHeader.gasStation.id == this.tokenService.getPayload().gas_station_id && vhr.voucherHeader.isDayOver) {
                                this.records.push(vhr);
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

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Génération PDF",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Génération PDF', path: '.', active: true}
            ]
        });
        this.loadingList = true;
        this.initTableConfig();
        this._fetchData();
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: VoucherHeaderResponse) => record.id},
            {
                name: 'gasStation',
                label: 'Station',
                formatter: (record: VoucherHeaderResponse) => record.voucherHeader.gasStation.libelle
            },
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
            {
                name: 'generatePdf', label: 'Générer PDF', formatter: (record: VoucherHeaderResponse) => {
                    return '<a href="' + this.router.createUrlTree(['vouchers/pdf-generation', {voucherHeader_id: record.voucherHeader.id}]) + '" class="btn btn-xs btn-warning waves-effect waves-light"> Imprimer<span class="btn-label-right"><i class="mdi mdi-printer fs-4"></i></span></a>'
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

}
