import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VouchersRoutingModule } from './vouchers-routing.module';
import { VoucherTypeComponent } from './voucher-type/voucher-type.component';
import { VoucherConsultComponent } from './voucher-consult/voucher-consult.component';
import { EndDayComponent } from './end-day/end-day.component';
import { PdfGenerationComponent } from './pdf-generation/pdf-generation.component';
import {AdvancedTableModule} from "../../shared/advanced-table/advanced-table.module";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {UiModule} from "../../shared/ui/ui.module";


@NgModule({
  declarations: [
    VoucherTypeComponent,
    VoucherConsultComponent,
    EndDayComponent,
    PdfGenerationComponent
  ],
    imports: [
        CommonModule,
        VouchersRoutingModule,
        AdvancedTableModule,
        NgbAlertModule,
        UiModule
    ]
})
export class VouchersModule { }
