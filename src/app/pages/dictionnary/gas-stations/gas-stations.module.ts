import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GasStationsRoutingModule} from './gas-stations-routing.module';
import {GsIndexComponent} from './gs-index/gs-index.component';
import {GsEditComponent} from './gs-edit/gs-edit.component';
import {GsAddComponent} from './gs-add/gs-add.component';
import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {UiModule} from "../../../shared/ui/ui.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
    declarations: [
        GsIndexComponent,
        GsEditComponent,
        GsAddComponent
    ],
    imports: [
        CommonModule,
        GasStationsRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class GasStationsModule {
}
