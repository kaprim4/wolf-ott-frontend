import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule, NgbNavModule,
  NgbProgressbarModule, NgbTimepickerModule, NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng-select2-component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';

import { FormsRoutingModule } from './forms-routing.module';

import { EditorsComponent } from './editors/editors.component';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';
import { FormsAdvancedComponent } from './forms-advanced/forms-advanced.component';
import { GeneralComponent } from './general/general.component';
import { ValidationComponent } from './validation/validation.component';
import { WizardComponent } from './wizard/wizard.component';



@NgModule({
  declarations: [
    GeneralComponent,
    FormsAdvancedComponent,
    ValidationComponent,
    WizardComponent,
    FileUploadsComponent,
    EditorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgxDropzoneModule,
    QuillModule,
    NgbProgressbarModule,
    NgbNavModule,
    FormsRoutingModule
  ]
})
export class FormModule { }
