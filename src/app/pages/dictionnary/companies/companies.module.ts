import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {CompaniesRoutingModule} from "./companies-routing.module";
import {CpEditComponent} from "./cp-edit/cp-edit.component";
import {CpDeleteComponent} from "./cp-delete/cp-delete.component";
import {CpAddComponent} from "./cp-add/cp-add.component";
import {CpIndexComponent} from "./cp-index/cp-index.component";


@NgModule({
    declarations: [
        CpIndexComponent,
        CpAddComponent,
        CpDeleteComponent,
        CpEditComponent
    ],
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class CompaniesModule {
}
