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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GrabVouchersComponent } from './grab-vouchers/grab-vouchers.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { VoucherCustomerComponent } from './voucher-customer/voucher-customer.component';
import { VoucherControlComponent } from './voucher-control/voucher-control.component';
import { VoucherHeaderListComponent } from './voucher-header-list/voucher-header-list.component';


@NgModule({
  declarations: [
    VoucherTypeComponent,
    VoucherConsultComponent,
    EndDayComponent,
    PdfGenerationComponent,
    GrabVouchersComponent,
    VoucherCustomerComponent,
    VoucherControlComponent,
    VoucherHeaderListComponent
  ],
    imports: [
        CommonModule,
        VouchersRoutingModule,
        AdvancedTableModule,
        NgbAlertModule,
        UiModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class VouchersModule { }
