import {Component, OnInit} from '@angular/core';
// constants
import {EventType} from 'src/app/core/constants/events';

// service
import {EventService} from 'src/app/core/service/event.service';
import {UserService} from "../../../../core/service/user.service";

// types
import {SortEvent} from 'src/app/shared/advanced-table/sortable.directive';
import {Column, DeleteEvent} from 'src/app/shared/advanced-table/advanced-table.component';
import {IUser} from "../../../../core/interfaces/user";
import * as moment from 'moment';
import {IFormType} from "../../../../core/interfaces/formType";
import Swal from "sweetalert2";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

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

    totalPages: number = 0;
    totalElements: number = 0;
    currentPage: number = 0;
    pageSize: number = 10;

    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'User',
        entity: 'user'
    }

    constructor(
        private eventService: EventService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "User list",
            breadCrumbItems: [
                {label: 'Users', path: '.'},
                {label: 'list', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData('', 0, this.pageSize);
        this.initTableConfig();
    }

    _fetchData(search: string, page: number, size: number): void {
        this.userService.getUsers(search, page, size)?.subscribe(
            (pageData) => {
                this.records = pageData.content;
                this.totalPages = pageData.totalPages;
                this.totalElements = pageData.totalElements;
                this.currentPage = pageData.number;
                this.loading = false;
                console.log('This contains body: ', pageData);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
        );
    }

    initTableConfig(): void {
        this.columns = [
            {name: 'id', label: '#', formatter: (record: IUser) => record.id},
            {name: 'username', label: 'username', formatter: (record: IUser) => record.username},
            {name: 'email', label: 'Email', formatter: (record: IUser) => record.email},
            {
                name: 'dateRegistered', label: 'dateRegistered', formatter: (record: IUser) => {
                    return moment(record.dateRegistered).format('D MMM YYYY')
                }
            },
            {name: 'credits', label: 'credits', formatter: (record: IUser) => record.credits},
            {name: 'notes', label: 'notes', formatter: (record: IUser) => record.notes},
            {name: 'ip', label: 'ip', formatter: (record: IUser) => record.ip},
            {
                name: 'lastLogin', label: 'Last Login', formatter: (record: IUser) => {
                    return moment(record.lastLogin).format('D MMM YYYY')
                }
            },
            {
                name: 'status', label: 'Activé ?', formatter: (record: IUser) => {
                    return (record.status ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
        ];
    }

    compare(v1: number | string | any | boolean, v2: number | string | any | boolean): any {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    onSort(event: SortEvent): void {
        if (event.direction === '') {
            this._fetchData('', this.currentPage, this.pageSize);
        } else {
            this.records = [...this.records].sort((a, b) => {
                const res = this.compare(a[event.column], b[event.column]);
                return event.direction === 'asc' ? res : -res;
            });
        }
    }

    matches(row: IUser, term: string) {
        return row.username.toLowerCase().includes(term)
            || row.email.toLowerCase().includes(term)
            || row.ip.toLowerCase().includes(term);
    }

    /**
     * Search Method
     */
    searchData(searchTerm: string): void {
        this._fetchData(searchTerm, this.currentPage, this.pageSize);
        let updatedData = this.records;
        //  filter
        updatedData = updatedData.filter(record => this.matches(record, searchTerm));
        this.records = updatedData;
    }

    deleteRow(deleteEvent: DeleteEvent) {
        Swal.fire({
            title: "Etes-vous sûr?",
            text: "Voulez vous procèder à la suppression de cet entrée ?",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#28bb4b",
            cancelButtonColor: "#f34e4e",
            confirmButtonText: "Oui, supprimez-le !"
        }).then((re) => {
            this.loading = true;
            if (re.isConfirmed) {
                if (deleteEvent.id) {
                    this.userService.getUser(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                this.userService.deleteUser(data.body.id).subscribe(
                                    (data: HttpResponse<any>) => {
                                        if (data.status === 200 || data.status === 202) {
                                            console.log(`Got a successfull status code: ${data.status}`);
                                        }
                                        if (data.body) {
                                            Swal.fire({
                                                title: "Succès!",
                                                text: "Cette entrée a été supprimée avec succès.",
                                                icon: "success"
                                            }).then();
                                        }
                                        console.log('This contains body: ', data.body);
                                    },
                                    (err: HttpErrorResponse) => {
                                        if (err.status === 403 || err.status === 404) {
                                            console.error(`${err.status} status code caught`);
                                            Swal.fire({
                                                title: "Erreur!",
                                                text: err.message,
                                                icon: "error"
                                            }).then();
                                        }
                                    },
                                    (): void => {
                                        this.records.splice(deleteEvent.index, 1);
                                        this.loading = false;
                                    }
                                )
                            }
                            console.log('This contains body: ', data.body);
                        },
                        (err: HttpErrorResponse) => {
                            if (err.status === 403 || err.status === 404) {
                                console.error(`${err.status} status code caught`);
                            }
                        }
                    );
                } else {
                    this.loading = false;
                    this.error = this.entityElm.label + " introuvable.";
                }
            }
        });
    }
}
