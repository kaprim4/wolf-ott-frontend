import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministrationRoutingModule} from './administration-routing.module';
import {SharedModule} from "../../../shared/shared.module";
import { ParametersModule } from './parameters/parameters.module';
import { ApplicationsModule } from './applications/applications.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        ParametersModule,
        AdministrationRoutingModule,
        ApplicationsModule
    ]
})
export class AdministrationModule {
}
