import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventType } from 'src/app/core/constants/events';
import { IFormType } from 'src/app/core/interfaces/formType';
import { IPreset } from 'src/app/core/interfaces/ipreset';
import { EventService } from 'src/app/core/service/event.service';
import { PresetService } from 'src/app/core/service/preset.service';
import { Column, DeleteEvent } from 'src/app/shared/advanced-table/advanced-table.component';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset-list.component.html',
  styleUrls: ['./preset-list.component.scss']
})
export class PresetListComponent implements OnInit {

  records: IPreset[] | any[] = [];
  columns: Column[] = [];
  pageSizeOptions: number[] = [10, 25, 50, 100];

  totalPages: number = 0;
  totalElements: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  loading: boolean = false;
  error: string = '';
  entityElm: IFormType = {
      label: 'Preset',
      entity: 'preset'
  }

  constructor(
      private eventService: EventService,
      private presetService: PresetService
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
      this._fetchData('', 0, this.pageSize);
      this.initTableConfig();
  }

  _fetchData(search: string, page: number, size: number): void {
      this.presetService.getAllPresets(search)?.subscribe(
          (pageData) => {
              this.records = pageData;// pageData.content;
              // this.totalPages = pageData.totalPages;
              // this.totalElements = pageData.totalElements;
              // this.currentPage = pageData.number;
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
          {name: 'id', label: '#', formatter: (record: IPreset) => record.id},
          {name: 'presetName', label: 'name', formatter: (record: IPreset) => record.presetName},
          {name: 'presetDescription', label: 'Description', formatter: (record: IPreset) => record.presetDescription},
          {
              name: 'status', label: 'status ?', formatter: (record: IPreset) => {
                  return (record.status ? '<span class="badge bg-success me-1">Oui</span>' : '<span class="badge bg-danger me-1">Non</span>')
              }
          },

          {
            name: 'updatedAt', label: 'Updated At', formatter: (record: IPreset) => {
                return moment(record.updatedAt).format('D MMM YYYY')
            }
          },

          {
              name: 'createdAt', label: 'Created At', formatter: (record: IPreset) => {
                  return moment(record.createdAt).format('D MMM YYYY')
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

  matches(row: IPreset, term: string) {
      return row.presetName.toLowerCase().includes(term)
          || row.presetDescription.toLowerCase().includes(term);
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
                  this.presetService.getPreset(deleteEvent.id)?.subscribe(
                      (data: HttpResponse<any>) => {
                          if (data.status === 200 || data.status === 202) {
                              console.log(`Got a successfull status code: ${data.status}`);
                          }
                          if (data.body) {
                              this.presetService.deletePreset(data.body.id).subscribe(
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
