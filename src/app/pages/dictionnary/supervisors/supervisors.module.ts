import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {SupervisorsRoutingModule} from "./supervisors-routing.module";
import {SpEditComponent} from "./sp-edit/sp-edit.component";
import {SpDeleteComponent} from "./sp-delete/sp-delete.component";
import {SpAddComponent} from "./sp-add/sp-add.component";
import {SpIndexComponent} from "./sp-index/sp-index.component";


@NgModule({
    declarations: [
        SpIndexComponent,
        SpAddComponent,
        SpDeleteComponent,
        SpEditComponent
    ],
    imports: [
        CommonModule,
        SupervisorsRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class SupervisorsModule {
}
