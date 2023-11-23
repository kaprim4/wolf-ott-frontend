import {Component, OnInit} from '@angular/core';
import {Column, DeleteEvent} from "../../../../shared/advanced-table/advanced-table.component";
import {IFormType} from "../../../../core/interfaces/formType";
import {EventService} from "../../../../core/service/event.service";
import {EventType} from "../../../../core/constants/events";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import * as moment from "moment/moment";
import {SortEvent} from "../../../../shared/advanced-table/sortable.directive";
import Swal from "sweetalert2";
import {VoucherTypeService} from "../../../../core/service/voucher-type.service";
import {VoucherType} from "../../../../core/interfaces/voucher";
import {FileUploadService} from "../../../../core/service/file-upload.service";

@Component({
    selector: 'app-vt-index',
    templateUrl: './vt-index.component.html',
    styleUrls: ['./vt-index.component.scss']
})
export class VtIndexComponent implements OnInit {

    records: VoucherType[] = [];
    columns: Column[] = [];
    pageSizeOptions: number[] = [10, 25, 50, 100];
    loading: boolean = false;
    error: string = '';
    entityElm: IFormType = {
        label: 'Type de bon',
        entity: 'supervisor'
    }

    constructor(
        private eventService: EventService,
        private voucherTypeService: VoucherTypeService,
        private fileUploadService: FileUploadService
    ) {
    }

    ngOnInit(): void {
        this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
            title: "Liste des types de bon",
            breadCrumbItems: [
                {label: 'Dictionnaire', path: '.'},
                {label: 'Liste des types de bon', path: '.', active: true}
            ]
        });
        this.loading = true;
        this._fetchData();
        this.initTableConfig();
    }

    _fetchData(): void {
        this.voucherTypeService.getVoucherTypes()?.subscribe(
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
            {name: 'id', label: '#', formatter: (record: VoucherType) => record.id},
            {name: 'libelle', label: 'Nom', formatter: (record: VoucherType) => record.libelle},
            {
                name: 'file', label: 'Image', formatter: (record: VoucherType) => {
                    let imageName: string | null = "./assets/images/no_image.png";
                    if (record.file && record.file?.id) {
                        imageName = `data:${record.file?.imageType};base64,${record.file?.imageData}`;
                    }
                    return '<img src="' + imageName + '" alt="' + record.libelle + '" title="' + record.libelle + '" class="thumb-md rounded img-thumbnail" />';
                }
            },
            {
                name: 'isActivated', label: 'Activé ?', formatter: (record: VoucherType) => {
                    return (record.isActivated ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'isDeleted', label: 'Supprimé ?', formatter: (record: VoucherType) => {
                    return (record.isDeleted ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
                }
            },
            {
                name: 'createdAt', label: 'Créé le', formatter: (record: VoucherType) => {
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

    matches(row: VoucherType, term: string) {
        return row.libelle.toLowerCase().includes(term);
    }

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
                    this.voucherTypeService.getVoucherType(deleteEvent.id)?.subscribe(
                        (data: HttpResponse<any>) => {
                            if (data.status === 200 || data.status === 202) {
                                console.log(`Got a successfull status code: ${data.status}`);
                            }
                            if (data.body) {
                                this.voucherTypeService.deleteVoucherType(data.body.id).subscribe(
                                    (data2: HttpResponse<any>) => {
                                        if (data2.status === 200 || data2.status === 202) {
                                            console.log(`Got a successfull status code: ${data2.status}`);
                                        }
                                        if (data2.body) {
                                            Swal.fire({
                                                title: "Succès!",
                                                text: "Cette entrée a été supprimée avec succès.",
                                                icon: "success"
                                            }).then();
                                        }
                                        console.log('This contains body: ', data2.body);
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
