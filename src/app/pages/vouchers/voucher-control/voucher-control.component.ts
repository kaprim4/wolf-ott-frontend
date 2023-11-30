import {Component, OnInit} from '@angular/core';
import {VoucherControl} from "../../../core/interfaces/voucher";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import {EventService} from "../../../core/service/event.service";
import {RoleService} from "../../../core/service/role.service";
import {EventType} from "../../../core/constants/events";
import * as moment from "moment/moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {VoucherControlService} from "../../../core/service/voucher-control.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-voucher-control',
    templateUrl: './voucher-control.component.html',
    styleUrls: ['./voucher-control.component.scss']
})
export class VoucherControlComponent implements OnInit {
    records: VoucherControl[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Bon de contrôle',
        entity: 'vouchers-customer'
    }

    constructor(
        private eventService: EventService,
        private roleService: RoleService,
        private voucherControlService: VoucherControlService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Consulter les bons de contrôle",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Consulter les bons de contrôle', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.voucherControlService.getVoucherControls()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        this.records = data.body;
                        this.loading = false;
                    } else {
                        this.error = "La liste est vide.";
                    }
                    this.loading = false;
                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                    this.loading = false;
                }
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: VoucherControl) => record.id},
            {name: 'voucherType', label: 'Type Bon', formatter: (record: VoucherControl) => record.voucherType.libelle},
            {
                name: 'voucherCustomer',
                label: 'Client Bon',
                formatter: (record: VoucherControl) => record.voucherCustomer.codeSap + " / " + record.voucherCustomer.libelle
            },
            {name: 'voucherNumber', label: 'Numéro Bon', formatter: (record: VoucherControl) => record.voucherNumber},
            {name: 'voucherAmount', label: 'Valeur', formatter: (record: VoucherControl) => record.voucherAmount},
            {
                name: 'newlyAdded', label: 'Ajouté récement ?', formatter: (record: VoucherControl) => {
                    return (record.newlyAdded ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: VoucherControl) => {
                    return moment(record.createdAt).format('D MMMM YYYY')
                }
            }
        ];
    }

    compare(v1: string | number | boolean | any, v2: string | number | boolean | any): any {
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

    matches(row: VoucherControl, term: string) {
        return row.voucherType?.libelle.toLowerCase().includes(term)
            || row.voucherCustomer?.libelle.toLowerCase().includes(term)
            || row.voucherNumber.toLowerCase().includes(term)
            || row.voucherAmount.toString().toLowerCase().includes(term);
    }

    /**
     * Search Method
     */
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
