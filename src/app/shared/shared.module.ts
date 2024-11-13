import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TablerIconsModule} from 'angular-tabler-icons';

import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {NotificationComponent} from './components/notification/notification.component';
import {QuickM3uComponent} from './components/quick-m3u/quick-m3u.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {QuickXtreamComponent} from "./components/quick-xtream/quick-xtream.component";
import {GeetestCaptchaComponent} from "./components/geetest-captcha/geetest-captcha.component";
import { NgxEditorModule } from "ngx-editor";
import {QuickSmartersProComponent} from "./components/quick-smarters-pro/quick-smarters-pro.component";


@NgModule({
    declarations: [
        NotificationComponent,
        QuickM3uComponent,
        QuickXtreamComponent,
        QuickSmartersProComponent,
        GeetestCaptchaComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TablerIconsModule,
        NgxMatSelectSearchModule,
        NgxEditorModule
    ],
    exports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TablerIconsModule,
        NgxMatSelectSearchModule,
        DragDropModule,
        GeetestCaptchaComponent,
        NgxEditorModule
    ]
})
export class SharedModule {
}

