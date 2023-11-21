import {Component, OnInit} from '@angular/core';
import {Column, DeleteEvent} from "../../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../../core/interfaces/formType";
import {EventService} from "../../../../core/service/event.service";
import {EventType} from "../../../../core/constants/events";
import * as moment from "moment/moment";
import {SortEvent} from "../../../../shared/advanced-table/sortable.directive";
import {GasStation} from "../../../../core/interfaces/gas_station";
import {GasStationService} from "../../../../core/service/gas-station.service";
import {Company} from "../../../../core/interfaces/company";
import {Supervisor} from "../../../../core/interfaces/supervisor";
import {City} from "../../../../core/interfaces/city";
import Swal from "sweetalert2";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-gs-index',
    templateUrl: './gs-index.component.html',
    styleUrls: ['./gs-index.component.scss']
})
export class GsIndexComponent implements OnInit {

    records: GasStation[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Stations-service',
        entity: 'user'
    }

    constructor(
        private eventService: EventService,
        private gasStationService: GasStationService
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des Stations-service",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des Stations-service', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.gasStationService.getGasStations()?.subscribe(
            (data: HttpResponse<any>) => {
                if (data.status === 200 || data.status === 202) {
                    console.log(`Got a successfull status code: ${data.status}`);
                }
                if (data.body) {

                }
                console.log('This contains body: ', data.body);
            },
            (err: HttpErrorResponse) => {
                if (err.status === 403 || err.status === 404) {
                    console.error(`${err.status} status code caught`);
                }
            }
            (data: GasStation[]) => {
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
            {name: 'id', label: '#', formatter: (record: GasStation) => record.id},
            {name: 'company', label: 'Gestion', formatter: (record: GasStation) => record.company?.libelle},
            {
                name: 'supervisor',
                label: 'Superviseur',
                formatter: (record: GasStation) => record.supervisor?.firstName + " " + record.supervisor?.lastName
            },
            {name: 'city', label: 'Ville', formatter: (record: GasStation) => record.city.libelle},
            {name: 'code_sap', label: 'Code SAP', formatter: (record: GasStation) => record.code_sap},
            {name: 'libelle', label: 'Libelle', formatter: (record: GasStation) => record.libelle},
            {name: 'latitude', label: 'Latitude', formatter: (record: GasStation) => record.latitude},
            {name: 'longitude', label: 'Longitude', formatter: (record: GasStation) => record.longitude},
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: GasStation) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: GasStation) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: GasStation) => {
                    return moment(record.createdAt).format('d MMM YYYY')
                }
            }
        ];
    }

    compare(v1: string | Company | Supervisor | City | number | boolean, v2: string | Company | Supervisor | City | number | boolean): any {
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

    matches(row: GasStation, term: string) {
        return row.company.libelle.toLowerCase().includes(term)
            || row.supervisor.firstName.toLowerCase().includes(term)
            || row.supervisor.lastName.toLowerCase().includes(term)
            || row.city.libelle.toLowerCase().includes(term)
            || row.libelle.toLowerCase().includes(term)
            || row.address.toLowerCase().includes(term);
    }

    /**
     * Search Method
     */
    searchData(searchTerm: string): void {
        if (searchTerm === '') {
            this._fetchData();
        } else {
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
                    this.gasStationService.getGasStation(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {

                            }
                            console.log('This contains body: ', data.body);
                        },
                        (err: HttpErrorResponse) => {
                            if (err.status === 403 || err.status === 404) {
                                console.error(`${err.status} status code caught`);
                            }
                        }
                        (data: GasStation) => {
                            if (data) {
                                this.gasStationService.deleteGasStation(data.id).subscribe(
                                    (data: HttpResponse<any>) => {
                                        if (data.status === 200 || data.status === 202) {
                                            console.log(`Got a successfull status code: ${data.status}`);
                                        }
                                        if (data.body) {

                                        }
                                        console.log('This contains body: ', data.body);
                                    },
                                    (err: HttpErrorResponse) => {
                                        if (err.status === 403 || err.status === 404) {
                                            console.error(`${err.status} status code caught`);
                                        }
                                    }
                                    () => {
                                        Swal.fire({
                                            title: "Succès!",
                                            text: "Cette entrée a été supprimée avec succès.",
                                            icon: "success"
                                        }).then();
                                    },
                                    (error: string) => {
                                        Swal.fire({
                                            title: "Erreur!",
                                            text: error,
                                            icon: "error"
                                        }).then();
                                    },
                                    (): void => {
                                        this.records.splice(deleteEvent.index, 1);
                                        this.loading = false;
                                    }
                                )
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
