import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './add/add.component';
import { TrialComponent } from './trial/trial.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {NgbAlertModule, NgbNavModule, NgbProgressbarModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbAlertModule, NgbNavModule, NgbProgressbarModule} from "@ng-bootstrap/ng-bootstrap";
import {UiModule} from "../../../shared/ui/ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { FormsRoutingModule } from '../../forms/forms-routing.module';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    AddComponent,
    TrialComponent,
    ListComponent,
    EditComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        AdvancedTableModule,
        NgbAlertModule,
        UiModule,
        ReactiveFormsModule,
        SweetAlert2Module,
        NgbProgressbarModule,
        NgbNavModule,
        FormsRoutingModule,
        Select2Module,
    ]
})
export class UserModule { }
