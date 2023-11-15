import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../core/service/event.service";
import {EventType} from "../../../core/constants/events";
import {Column} from "../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../core/interfaces/formType";
import * as moment from "moment/moment";
import {SortEvent} from "../../../shared/advanced-table/sortable.directive";
import {RoleService} from "../../../core/service/role.service";
import {GasStationTempService} from "../../../core/service/gas-station-temp.service";
import {GasStationTemp} from "../../../core/interfaces/gas_station_temp";

@Component({
    selector: 'app-voucher-consult',
    templateUrl: './voucher-consult.component.html',
    styleUrls: ['./voucher-consult.component.scss']
})
export class VoucherConsultComponent implements OnInit {

    records: GasStationTemp[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Bon temporaire',
        entity: 'gas-station-temp'
    }

    constructor(
        private eventService: EventService,
        private roleService: RoleService,
        private gasStationTempService: GasStationTempService,
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
        this.gasStationTempService.getGasStationTemps()?.subscribe(
            (data: GasStationTemp[]) => {
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
            {name: 'id_bordereau', label: '#', formatter: (record: GasStationTemp) => record.id_bordereau},
            {name: 'zzclient_temp', label: 'Code Client', formatter: (record: GasStationTemp) => record.zzclient_temp},
            {name: 'zztype_bon_temp', label: 'Type Bon', formatter: (record: GasStationTemp) => record.zztype_bon_temp},
            {name: 'zznum_bord_temp', label: 'Numéro Bordereau', formatter: (record: GasStationTemp) => record.zznum_bord_temp},
            {name: 'zznum_bon_temp', label: 'Numéro Bon', formatter: (record: GasStationTemp) => record.zznum_bon_temp},
            {name: 'zzmnt_produit_temp', label: 'Valeur', formatter: (record: GasStationTemp) => record.zzmnt_produit_temp},
            {name: 'zznum_vehicule_temp', label: 'Numéro Véhicule', formatter: (record: GasStationTemp) => record.zznum_vehicule_temp},
            {name: 'zzdate_bon_temp', label: 'Date Journée', formatter: (record: GasStationTemp) => {
                    return moment(record.zzdate_bon_temp).format('D MMM YYYY')
                }},

            /*{
                name: 'isActivated', label: 'Activé ?', formatter: (record: GasStationTemp) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: GasStationTemp) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: GasStationTemp) => {
                    return moment(record.createdAt).format('d MMM YYYY')
                }
            }*/
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

    matches(row: GasStationTemp, term: string) {
        return row.zztype_bon_temp.toLowerCase().includes(term)
            || row.zznum_bon_temp.toLowerCase().includes(term)
            || row.zznum_vehicule_temp.toLowerCase().includes(term)
            || row.zzmnt_produit_temp.toLowerCase().includes(term)
            || row.zzdate_bon_temp.toLowerCase().includes(term)
            || row.zznum_bord_temp.toLowerCase().includes(term)
            || row.zzclient_temp.toLowerCase().includes(term);
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
