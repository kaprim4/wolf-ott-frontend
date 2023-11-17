import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {CitiesRoutingModule} from "./cities-routing.module";
import {CEditComponent} from "./c-edit/c-edit.component";
import {CAddComponent} from "./c-add/c-add.component";
import {CIndexComponent} from "./c-index/c-index.component";


@NgModule({
    declarations: [
        CIndexComponent,
        CAddComponent,
        CEditComponent
    ],
    imports: [
        CommonModule,
        CitiesRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class CitiesModule {
}
