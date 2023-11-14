import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VoucherTypeComponent} from "./voucher-type/voucher-type.component";
import {VoucherConsultComponent} from "./voucher-consult/voucher-consult.component";
import {EndDayComponent} from "./end-day/end-day.component";
import {PdfGenerationComponent} from "./pdf-generation/pdf-generation.component";

const routes: Routes = [
    { path: 'voucher-type', component: VoucherTypeComponent},
    { path: 'voucher-consult', component: VoucherConsultComponent},
    { path: 'end-day', component: EndDayComponent},
    { path: 'pdf-generation', component: PdfGenerationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
