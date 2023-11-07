import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersAccessRoutingModule} from './users-access-routing.module';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgbDropdownModule,
        UsersAccessRoutingModule
    ]
})
export class UsersAccessModule {
}
