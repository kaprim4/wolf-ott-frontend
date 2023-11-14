import {Component, OnInit} from '@angular/core';
// constants
import {EventType} from 'src/app/core/constants/events';
// service
import {EventService} from 'src/app/core/service/event.service';
// types
import {SortEvent} from 'src/app/shared/advanced-table/sortable.directive';
import {Column} from 'src/app/shared/advanced-table/advanced-table.component';
import * as moment from 'moment';
import {IFormType} from "../../../../core/interfaces/formType";
import {City} from "../../../../core/interfaces/city";
import {CityService} from "../../../../core/service/city.service";
moment.locale('fr');

@Component({
    selector: 'app-c-index',
    templateUrl: './c-index.component.html',
    styleUrls: ['./c-index.component.scss']
})
export class CIndexComponent implements OnInit {

    records: City[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'ville',
        entity: 'city'
    }

    constructor(
        private eventService: EventService,
        private cityService: CityService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des villes",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des villes', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.cityService.getCities()?.subscribe(
            (data: City[]) => {
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
            {name: 'id', label: '#', formatter: (record: City) => record.id},
            {name: 'region_id', label: 'Région', formatter: (record: City) => record.region?.libelle},
            {name: 'libelle', label: 'Nom', formatter: (record: City) => record.libelle},
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: City) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: City) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: City) => {
                    return moment(record.createdAt).format('d MMM YYYY')
                }
            }
        ];
    }

    compare(v1: number | string | boolean | any, v2: number | string | boolean | any): any {
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

    matches(row: City, term: string) {
        return row.libelle.toLowerCase().includes(term)
            || row.region.libelle.toLowerCase().includes(term);
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
