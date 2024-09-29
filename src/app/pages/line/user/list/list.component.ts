import {Component, OnInit} from '@angular/core';
// constants
import {EventType} from 'src/app/core/constants/events';

// service
import {EventService} from 'src/app/core/service/event.service';

// types
import {SortEvent} from 'src/app/shared/advanced-table/sortable.directive';
import {Column, DeleteEvent} from 'src/app/shared/advanced-table/advanced-table.component';
import {ILine, ILineCompact} from "../../../../core/interfaces/line";
import * as moment from 'moment';
import {IFormType} from "../../../../core/interfaces/formType";
import Swal from "sweetalert2";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LineService} from "../../../../core/service/line.service";
import {LineCompactService} from "../../../../core/service/line.compact.service";

moment.locale('fr');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    records: ILineCompact[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';

    entityElm: IFormType = {
        label: 'Line',
        entity: 'line'
    }

    constructor(
        private eventService: EventService,
        private lineCompactService: LineCompactService
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Lines list",
            breadCrumbItems: [
                {label: 'Lines', path: '.'},
                {label: 'Lines list', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData('');
        this.initTableConfig();
    }

    _fetchData(search: string): void {
        this.lineCompactService.getAllLines(search)?.subscribe(
            (pageData) => {
                this.records = pageData;
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
            {name: 'id', label: '#', formatter: (record: ILineCompact) => record.id},
            {name: 'username', label: 'username', formatter: (record: ILineCompact) => record.username},
            {name: 'password', label: 'password', formatter: (record: ILineCompact) => record.password},
            {name: 'owner', label: 'owner', formatter: (record: ILineCompact) => record.owner},
            {
                name: 'status', label: 'status ?', formatter: (record: ILineCompact) => {
                    return (record.status ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'online', label: 'online ?', formatter: (record: ILineCompact) => {
                    return (record.online ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'trial', label: 'trial ?', formatter: (record: ILineCompact) => {
                    return (record.trial ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'active', label: 'active ?', formatter: (record: ILineCompact) => {
                    return (record.active ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {name: 'connections', label: 'connections', formatter: (record: ILineCompact) => record.connections},
            {
                name: 'expiration', label: 'expiration', formatter: (record: ILineCompact) => {
                    return moment(record.expiration).format('D MMM YYYY')
                }
            },
            {
                name: 'lastConnection', label: 'lastConnection', formatter: (record: ILineCompact) => {
                    return moment(record.lastConnection).format('D MMM YYYY')
                }
            },
        ];
    }

    compare(v1: number | string | any | boolean, v2: number | string | any | boolean): any {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    }

    onSort(event: SortEvent): void {
        if (event.direction === '') {
            this._fetchData('');
        } else {
            this.records = [...this.records].sort((a, b) => {
                const res = this.compare(a[event.column], b[event.column]);
                return event.direction === 'asc' ? res : -res;
            });
        }
    }

    matches(row: ILineCompact, term: string) {
        return row.username.toLowerCase().includes(term)
            || row.owner.toLowerCase().includes(term);
    }

    searchData(searchTerm: string): void {
        this._fetchData(searchTerm);
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
                    this.lineCompactService.getLine(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                this.lineCompactService.deleteLine(data.body.id).subscribe(
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
