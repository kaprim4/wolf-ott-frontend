import {Component, OnInit} from '@angular/core';
// constants
import {EventType} from 'src/app/core/constants/events';
// service
import {EventService} from 'src/app/core/service/event.service';
// types
import {SortEvent} from 'src/app/shared/advanced-table/sortable.directive';
import {Column, DeleteEvent} from 'src/app/shared/advanced-table/advanced-table.component';
import * as moment from 'moment';
import {IFormType} from "../../../../core/interfaces/formType";
import {Region} from "../../../../core/interfaces/region";
import {RegionService} from "../../../../core/service/region.service";
import Swal from "sweetalert2";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

moment.locale('fr');

@Component({
    selector: 'app-rg-index',
    templateUrl: './rg-index.component.html',
    styleUrls: ['./rg-index.component.scss']
})
export class RgIndexComponent implements OnInit {

    records: Region[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'région',
        entity: 'region'
    }

    constructor(
        private eventService: EventService,
        private regionService: RegionService,
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des régions",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des régions', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.regionService.getRegions()?.subscribe(
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
                }
                console.log('This contains body: ', data.body);
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
            {name: 'id', label: '#', formatter: (record: Region) => record.id},
            {name: 'libelle', label: 'Nom', formatter: (record: Region) => record.libelle},
            {name: 'code', label: 'Code', formatter: (record: Region) => record.code},
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: Region) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: Region) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: Region) => {
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

    matches(row: Region, term: string) {
        return row.libelle.toLowerCase().includes(term)
            || row.code.toLowerCase().includes(term);
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
                    this.regionService.getRegion(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                this.regionService.deleteRegion(data.body.id).subscribe(
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
