import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UIndexComponent} from './u-index/u-index.component';
import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import { UAddComponent } from './u-add/u-add.component';
import { UDeleteComponent } from './u-delete/u-delete.component';
import { UEditComponent } from './u-edit/u-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
    declarations: [
        UIndexComponent,
        UAddComponent,
        UDeleteComponent,
        UEditComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class UsersModule {
}
