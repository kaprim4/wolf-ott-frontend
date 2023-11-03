import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {VerticalLayoutComponent} from './layout/layout.component';

@NgModule({
    declarations: [
        VerticalLayoutComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        VerticalLayoutComponent
    ]
})
export class VerticalModule {
}
