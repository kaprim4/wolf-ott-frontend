import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoucherTypesRoutingModule} from './voucher-types-routing.module';
import {VtIndexComponent} from './vt-index/vt-index.component';
import {VtAddComponent} from './vt-add/vt-add.component';
import {VtEditComponent} from './vt-edit/vt-edit.component';
import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {UiModule} from "../../../shared/ui/ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {CoreModule} from "../../../core/core.module";


@NgModule({
    declarations: [
        VtIndexComponent,
        VtAddComponent,
        VtEditComponent
    ],
    imports: [
        CommonModule,
        VoucherTypesRoutingModule,
        AdvancedTableModule,
        NgbAlertModule,
        UiModule,
        ReactiveFormsModule,
        SweetAlert2Module,
        CoreModule
    ]
})
export class VoucherTypesModule {
}
