import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VoucherTypeComponent} from "./voucher-type/voucher-type.component";
import {VoucherConsultComponent} from "./voucher-consult/voucher-consult.component";
import {EndDayComponent} from "./end-day/end-day.component";
import {PdfGenerationComponent} from "./pdf-generation/pdf-generation.component";
import {GrabVouchersComponent} from "./grab-vouchers/grab-vouchers.component";
import {VoucherCustomerComponent} from "./voucher-customer/voucher-customer.component";
import {VoucherControlComponent} from "./voucher-control/voucher-control.component";

const routes: Routes = [
    { path: 'voucher-customer', component: VoucherCustomerComponent},
    { path: 'voucher-control', component: VoucherControlComponent},
    { path: 'voucher-consult', component: VoucherConsultComponent},
    { path: 'voucher-type', component: VoucherTypeComponent},
    { path: 'end-day', component: EndDayComponent},
    { path: 'pdf-generation', component: PdfGenerationComponent},
    { path: 'grab-vouchers', component: GrabVouchersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
