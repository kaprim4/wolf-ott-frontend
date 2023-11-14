import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RolesRoutingModule} from './roles-routing.module';
import {RIndexComponent} from './r-index/r-index.component';
import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import { RAddComponent } from './r-add/r-add.component';
import { RDeleteComponent } from './r-delete/r-delete.component';
import { REditComponent } from './r-edit/r-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
    declarations: [
        RIndexComponent,
        RAddComponent,
        RDeleteComponent,
        REditComponent
    ],
    imports: [
        CommonModule,
        RolesRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class RolesModule {
}
