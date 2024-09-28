import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { EventType } from 'src/app/core/constants/events';
import { IFormType } from 'src/app/core/interfaces/formType';
import { InputProps, InputPropsTypesEnum } from 'src/app/core/interfaces/input_props';
import { IPreset } from 'src/app/core/interfaces/ipreset';
import { EventService } from 'src/app/core/service/event.service';
import { PresetService } from 'src/app/core/service/preset.service';

@Component({
  selector: 'app-preset-edit',
  templateUrl: './preset-edit.component.html',
  styleUrls: ['./preset-edit.component.scss']
})
export class PresetEditComponent implements OnInit {

  @Input()
  preset: IPreset = {
    id: 11,
    presetName: "",
    presetDescription: "",
    status: true,
    bouquets: [],
    createdAt: '',
    updatedAt: ''
  }

  @ViewChild('successSwal')
  public readonly successSwal!: SwalComponent;

  @ViewChild('errorSwal')
  public readonly errorSwal!: SwalComponent;

  constructor(
      private eventService: EventService,
      private presetService: PresetService,
      private router: Router,
      private activated: ActivatedRoute,
      private fb: FormBuilder
  ) {
  }

  entityElm: IFormType = {label: 'Presets', entity: 'preset'}
  title: string = 'Edit this entry' + (this.entityElm.entity ? ' (' + this.entityElm.label + ')' : '');
  objectProps: InputProps[] = [];

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }, Validators.required],  // ID should be disabled for editing
    presetName: ['', Validators.required],
    presetDescription: ['', Validators.required],
    status: [false],  // Default status as false
    bouquets: [[], Validators.required],  // Assuming an array of numbers
    createdAt: [{ value: '', disabled: true }],  // Disable if you don't want to edit it
    updatedAt: [{ value: '', disabled: true }]   // Disable for the same reason
});

  formSubmitted: boolean = false;
  error: string = '';
  loading: boolean = false;

  initFieldsConfig(): void {
    this.objectProps = [
        {
            input: 'presetName', label: 'Nom du Préréglage', type: 'text', joinTable: [], joinTableId: '', joinTableIdLabel: '',
            value: undefined
        },
        {
            input: 'presetDescription', label: 'Description du Préréglage', type: 'text', joinTable: [], joinTableId: '', joinTableIdLabel: '',
            value: undefined
        },
        
        {
            input: 'createdAt', label: 'Créé le', type: 'date', joinTable: [], joinTableId: '', joinTableIdLabel: '',
            value: undefined
        },
        // {
        //     input: 'updatedAt', label: 'Mis à jour le', type: 'date', joinTable: [], joinTableId: '', joinTableIdLabel: '',
        //     value: undefined
        // },

        {
            input: 'status', label: 'Statut', type: 'checkbox', joinTable: [], joinTableId: '', joinTableIdLabel: '',
            value: undefined
        },
    ];
    
  
  this.editForm = this.fb.group({
    id: [{ value: this.preset.id, disabled: true }],  // Assuming ID is not editable
    presetName: [this.preset.presetName, [Validators.required]],
    presetDescription: [this.preset.presetDescription, [Validators.required]],
    status: [this.preset.status],
    bouquets: [this.preset.bouquets, [Validators.required]],  // Adjust based on your requirements
    createdAt: [{ value: this.preset.createdAt, disabled: true }],  // Disable if not editable
    updatedAt: [{ value: this.preset.updatedAt, disabled: true }]   // Disable if not editable
});

  }

  private _fetchData() {
      let id = Number(this.activated.snapshot.paramMap.get('id'));
      if (id) {
          this.presetService.getPreset(id)?.subscribe(
              (data: HttpResponse<any>) => {
                  if (data.status === 200 || data.status === 202) {
                      console.log(`Got a successfull status code: ${data.status}`);
                  }
                  if (data.body) {
                      this.preset = data.body;
                      this.loading = false;
                      this.initFieldsConfig();

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
          this.error = "Utilisateur introuvable.";
      }
  }

  get formValues() {
      return this.editForm.controls;
  }

  ngOnInit(): void {
      this.eventService.broadcast(EventType.CHANGE_PAGE_TITLE, {
          title: "Preset list",
          breadCrumbItems: [
              {label: 'Preset', path: '.'},
              {label: 'Presets list', path: '.'},
              {label: 'edit preset', path: '.', active: true}
          ]
      });
      this.loading = true;
      this._fetchData();
  }

  async onSubmit() {
      this.formSubmitted = true;
      if (this.editForm.valid) {
          this.loading = true;
          // this.roleService.getRole(this.editForm.controls['role_id'].value).subscribe(
          //     (data: HttpResponse<any>) => {
          //         if (data.status === 200 || data.status === 202) {
          //             console.log(`Got a successfull status code: ${data.status}`);
          //         }
          //         if (data.body) {
          //             role = data.body;
          //             if (role) {
          //                 this.gasStationService.getGasStation(this.editForm.controls['gas_station_id'].value).subscribe(
          //                     (data2: HttpResponse<any>) => {
          //                         if (data2.status === 200 || data2.status === 202) {
          //                             console.log(`Got a successfull status code: ${data2.status}`);
          //                         }
          //                         if (data2.body) {
          //                             gas_station = data2.body;
          //                             if (gas_station) {
          //                                 this.line = {
          //                                     credits: this.editForm.controls['credits'].value,
          //                                     dateRegistered: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
          //                                     email: this.editForm.controls['email'].value,
          //                                     id: this.editForm.controls['id'].value,
          //                                     ip: this.editForm.controls['ip'].value,
          //                                     lastLogin: moment(now()).format('Y-M-DTHH:mm:ss').toString(),
          //                                     notes: this.editForm.controls['notes'].value,
          //                                     status: false,
          //                                     linename:this.editForm.controls['linename'].value,
          //                                 }
          //                                 this.lineService.updateLine(this.line).subscribe(
          //                                     (data3: HttpResponse<any>) => {
          //                                         if (data3.status === 200 || data3.status === 202) {
          //                                             console.log(`Got a successfull status code: ${data3.status}`);
          //                                         }
          //                                         if (data3.body) {
          //                                             this.successSwal.fire().then(() => {
          //                                                 this.router.navigate(['lines-access/' + this.entityElm.entity + 's'])
          //                                             });
          //                                         }
          //                                         console.log('This contains body: ', data.body);
          //                                     },
          //                                     (err: HttpErrorResponse) => {
          //                                         if (err.status === 403 || err.status === 404) {
          //                                             console.error(`${err.status} status code caught`);
          //                                             this.errorSwal.fire().then((r) => {
          //                                                 this.error = err.message;
          //                                                 console.log(err.message);
          //                                             });
          //                                         }
          //                                     },
          //                                     (): void => {
          //                                         this.loading = false;
          //                                     }
          //                                 )
          //                                 console.log(this.line)
          //                             } else {
          //                                 this.errorSwal.fire().then(r => this.loading = false);
          //                             }
          //                         }
          //                         console.log('This contains body: ', data2.body);
          //                     },
          //                     (err: HttpErrorResponse) => {
          //                         if (err.status === 403 || err.status === 404) {
          //                             console.error(`${err.status} status code caught`);
          //                         }
          //                     }
          //                 );
          //             }
          //         }
          //         console.log('This contains body: ', data.body);
          //     },
          //     (err: HttpErrorResponse) => {
          //         if (err.status === 403 || err.status === 404) {
          //             console.error(`${err.status} status code caught`);
          //         }
          //     }
          // );
      }
  }

}
