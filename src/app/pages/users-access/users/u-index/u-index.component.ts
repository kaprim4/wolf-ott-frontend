import {Component, OnInit} from '@angular/core';
// constants
import {EventType} from 'src/app/core/constants/events';

// service
import {EventService} from 'src/app/core/service/event.service';
import {UserService} from "../../../../core/service/user.service";

// types
import {SortEvent} from 'src/app/shared/advanced-table/sortable.directive';
import {Column} from 'src/app/shared/advanced-table/advanced-table.component';
import {User} from "../../../../core/models/user.models";
import {first} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-u-index',
    templateUrl: './u-index.component.html',
    styleUrls: ['./u-index.component.scss']
})
export class UIndexComponent implements OnInit {

    records: User[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];

    constructor(
        private eventService: EventService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des utilisateurs",
            breadCrumbItems: [
                {label: 'Utilisateurs & Accès', path: '.'},
                {label: 'Liste des utilisateurs', path: '.', active: true}
            ]
        });
        this._fetchData();
        this.initTableConfig();
    }

    /**
     * fetches table records
     */
    _fetchData(): void {
        this.userService.getUsers()?.subscribe(
            (data: User[]) => {
                console.log("data", data);
                if (data && data.length > 0) {
                    this.records = data
                }
            }
        );
    }

    /**
     * initialize advanced table columns
     */
    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: User) => record.id},
            {name: 'firstName', label: 'Nom', formatter: (record: User) => record.firstName,},
            {name: 'lastName', label: 'Prénom', formatter: (record: User) => record.lastName, width: 180},
            {name: 'username', label: 'Identifiant', formatter: (record: User) => record.username,},
            {name: 'email', label: 'E-mail', formatter: (record: User) => record.email,},
            {name: 'role', label: 'Rôle', formatter: (record: User) => record.role,},
            {name: 'gasStation', label: 'Station', formatter: (record: User) => record.gasStation.libelle,},
            {name: 'isActivated', label: 'Activé ?', formatter: (record: User) => record.isActivated,},
            {name: 'isDeleted', label: 'Supprimé ?', formatter: (record: User) => record.isDeleted,},
            {name: 'createdAt', label: 'Créé le', formatter: (record: User) => record.createdAt,}
        ];
    }

    // compares two cell values
    compare(v1: string | number, v2: string | number): any {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    /**
     * Sort the table data
     * @param event column name, sort direction
     */
    onSort(event: SortEvent): void {
        if (event.direction === '') {
            this._fetchData();
        } else {
            /*this.records = [...this.records].sort((a, b) => {
                const res = this.compare(a[event.column], b[event.column]);
                return event.direction === 'asc' ? res : -res;
            });*/
        }
    }

    /**
     * Match table data with search input
     * @param row Table row
     * @param term Search the value
     */
    matches(row: User, term: string) {
        return row.firstName.toLowerCase().includes(term)
            || row.lastName.toLowerCase().includes(term)
            || row.email.toLowerCase().includes(term)
            || row.role.toLowerCase().includes(term)
            || row.gasStation.libelle.toLowerCase().includes(term)
            || row.username.toLowerCase().includes(term);
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
            //  filter
            updatedData = updatedData.filter(record => this.matches(record, searchTerm));
            this.records = updatedData;
        }

    }
}
