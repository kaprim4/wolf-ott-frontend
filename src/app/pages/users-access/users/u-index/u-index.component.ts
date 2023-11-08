import {Component, OnInit} from '@angular/core';
// constants
import {EventType} from 'src/app/core/constants/events';

// service
import {EventService} from 'src/app/core/service/event.service';
import {UserService} from "../../../../core/service/user.service";

// types
import {SortEvent} from 'src/app/shared/advanced-table/sortable.directive';
import {Column} from 'src/app/shared/advanced-table/advanced-table.component';
import {IUser} from "../../../../core/interfaces/user";
import * as moment from 'moment';
import {IFormType} from "../../../../core/interfaces/formType";

moment.locale('fr');

@Component({
    selector: 'app-u-index',
    templateUrl: './u-index.component.html',
    styleUrls: ['./u-index.component.scss']
})
export class UIndexComponent implements OnInit {

    records: IUser[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Utilisateur',
        entity: 'user'
    }

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
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.userService.getUsers()?.subscribe(
            (data: IUser[]) => {
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
            {name: 'id', label: '#', formatter: (record: IUser) => record.id},
            {name: 'firstName', label: 'Nom', formatter: (record: IUser) => record.firstName},
            {name: 'lastName', label: 'Prénom', formatter: (record: IUser) => record.lastName},
            {name: 'username', label: 'Identifiant', formatter: (record: IUser) => record.username},
            {name: 'email', label: 'E-mail', formatter: (record: IUser) => record.email},
            {name: 'role', label: 'Rôle', formatter: (record: IUser) => record.role},
            {name: 'gasStation', label: 'Station', formatter: (record: IUser) => record.gasStation.libelle},
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: IUser) => {
                    return record.isActivated
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: IUser) => {
                    return record.isDeleted
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: IUser) => {
                    return moment(record.createdAt).format('d MMM YYYY')
                }
            }
        ];
    }

    compare(v1: string | number, v2: string | number): any {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

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

    matches(row: IUser, term: string) {
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
