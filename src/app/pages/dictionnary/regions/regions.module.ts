import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {RegionsRoutingModule} from "./regions-routing.module";
import {RgEditComponent} from "./rg-edit/rg-edit.component";
import {RgDeleteComponent} from "./rg-delete/rg-delete.component";
import {RgAddComponent} from "./rg-add/rg-add.component";
import {RgIndexComponent} from "./rg-index/rg-index.component";


@NgModule({
    declarations: [
        RgIndexComponent,
        RgAddComponent,
        RgDeleteComponent,
        RgEditComponent
    ],
    imports: [
        CommonModule,
        RegionsRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class RegionsModule {
}
