import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LineRoutingModule} from './line-routing.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UiModule } from 'src/app/shared/ui/ui.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        LineRoutingModule,
        AdvancedTableModule,
        UiModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule,
        SweetAlert2Module
    ]
})
export class LineModule {
}
