import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UIndexComponent} from './u-index/u-index.component';
import {AdvancedTableModule} from "../../../shared/advanced-table/advanced-table.module";


@NgModule({
    declarations: [
        UIndexComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        AdvancedTableModule
    ]
})
export class UsersModule {
}
