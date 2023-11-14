import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {Role} from "../../../core/interfaces/role";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import * as moment from "moment/moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {RoleService} from "../../../core/service/role.service";

@Component({
    selector: 'app-voucher-consult',
    templateUrl: './voucher-consult.component.html',
    styleUrls: ['./voucher-consult.component.scss']
})
export class VoucherConsultComponent implements OnInit {

    records: Role[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Rôle',
        entity: 'role'
    }

    constructor(
        private eventService: EventService,
        private roleService: RoleService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Consulter les bons",
            breadCrumbItems: [
                {label: 'Gestion bons', path: '.'},
                {label: 'Consulter les bons', path: '.', active: true}
            ]
        });
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.roleService.getRoles()?.subscribe(
            (data: Role[]) => {
                console.log("data", data);
                if (data && data.length > 0) {
                    this.records = data;
                    this.loading = false;
                } else {
                    this.error = "La liste est vide.";
                }
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: Role) => record.id},
            {name: 'libelle', label: 'Libelle', formatter: (record: Role) => record.libelle},
            {name: 'alias', label: 'Alias', formatter: (record: Role) => record.alias},
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: Role) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: Role) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: Role) => {
                    return moment(record.createdAt).format('d MMM YYYY')
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

    matches(row: Role, term: string) {
        return row.libelle.toLowerCase().includes(term)
            || row.alias.toLowerCase().includes(term);
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
