import {Component, OnInit} from '@angular/core';
import {first} from "rxjs";
import {User} from "../../../../core/models/user.models";
import {Column} from "../../../../shared/advanced-table/advanced-table.component";
import {EventService} from "../../../../core/service/event.service";
import {UserService} from "../../../../core/service/user.service";
import {EventType} from "../../../../core/constants/events";
import {SortEvent} from "../../../../shared/advanced-table/sortable.directive";

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
    ) { }

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
        // @ts-ignore
        this.userService.getUsers().pipe(first()).subscribe(
            (data: User[]) => {
                if (data.length > 0){
                    console.table(data);
                    this.records = data
                }
            },
            (error: string) => {
                console.log(error);
            }
        );
    }

    /**
     * initialize advanced table columns
     */
    initTableConfig(): void {
        this.columns = [
            {
                name: 'id',
                label: 'id',
                formatter: (record: User) => record.id,
            },
            {
                name: 'firstName',
                label: 'firstName',
                formatter: (record: User) => record.firstName,
            },
            {
                name: 'lastName',
                label: 'lastName',
                formatter: (record: User) => record.lastName,
                width: 180
            },
            {
                name: 'username',
                label: 'username',
                formatter: (record: User) => record.username,
            },
            {
                name: 'email',
                label: 'email',
                formatter: (record: User) => record.email,
            },
            {
                name: 'role',
                label: 'role',
                formatter: (record: User) => record.role,

            },
            {
                name: 'gasStation',
                label: 'gasStation',
                formatter: (record: User) => record.gasStation.libelle,

            },
            {
                name: 'isActivated',
                label: 'isActivated',
                formatter: (record: User) => record.isActivated,

            },
            {
                name: 'isDeleted',
                label: 'isDeleted',
                formatter: (record: User) => record.isDeleted,

            },
            {
                name: 'createdAt',
                label: 'createdAt',
                formatter: (record: User) => record.createdAt,

            }
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
