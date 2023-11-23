import { Component, OnInit } from '@angular/core';
import {VoucherCustomer} from "../../../core/interfaces/voucher";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import {EventService} from "../../../core/service/event.service";
import {RoleService} from "../../../core/service/role.service";
import {EventType} from "../../../core/constants/events";
import * as moment from "moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {VoucherCustomerService} from "../../../core/service/voucher-customer.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-voucher-customer',
  templateUrl: './voucher-customer.component.html',
  styleUrls: ['./voucher-customer.component.scss']
})
export class VoucherCustomerComponent implements OnInit {
    records: VoucherCustomer[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Client',
        entity: 'vouchers-customer'
    }

    constructor(
        private eventService: EventService,
        private roleService: RoleService,
        private voucherCustomerService: VoucherCustomerService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Consulter les Clients des bons",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Consulter les Clients des bons', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.voucherCustomerService.getVoucherCustomers()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {
                    if (data.body && data.body.length > 0) {
                        this.records = data.body;
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
            {name: 'id', label: '#', formatter: (record: VoucherCustomer) => record.id},
            {name: 'code_sap', label: 'Code SAP', formatter: (record: VoucherCustomer) => record.codeSap},
            {name: 'libelle', label: 'Libelle', formatter: (record: VoucherCustomer) => record.libelle},
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: VoucherCustomer) => {
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

    matches(row: VoucherCustomer, term: string) {
        return row.codeSap.toLowerCase().includes(term)
            || row.libelle.toLowerCase().includes(term);
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
