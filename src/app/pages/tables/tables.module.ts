import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';
import { TableAdvancedComponent } from './advanced/advanced.component';
import { TableBasicComponent } from './basic/basic.component';
import { TablesRoutingModule } from './tables-routing.module';



@NgModule({
  declarations: [
    TableBasicComponent,
    TableAdvancedComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    AdvancedTableModule,
    TablesRoutingModule
  ]
})
export class TablesModule { }
