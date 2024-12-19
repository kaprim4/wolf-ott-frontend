import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersComponent } from './parameters.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VpnParamsComponent } from './components/vpn-params/vpn-params.component';
import { SmartersProParamsComponent } from './components/smarters-pro-params/smarters-pro-params.component';
import {RichTextEditorComponent} from "./components/rich-text-editor/rich-text-editor.component";
import { WolfguardParamsComponent } from './components/wolfguard-params/wolfguard-params.component';



@NgModule({
    declarations: [
        ParametersComponent,
        VpnParamsComponent,
        SmartersProParamsComponent,
        RichTextEditorComponent,
        WolfguardParamsComponent
    ],
    exports: [
        RichTextEditorComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ParametersModule { }
