import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresetListComponent } from './preset-list/preset-list.component';
import { PresetEditComponent } from './preset-edit/preset-edit.component';
import { PresetCreateComponent } from './preset-create/preset-create.component';
import { PresetRoutingModule } from './preset-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { UiModule } from 'src/app/shared/ui/ui.module';



@NgModule({
  declarations: [
    PresetListComponent,
    PresetEditComponent,
    PresetCreateComponent
  ],
  imports: [
    CommonModule,
    PresetRoutingModule,
    AdvancedTableModule,
    UiModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class PresetModule { }
