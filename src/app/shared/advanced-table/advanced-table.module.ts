import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AdvancedTableComponent } from './advanced-table.component';
import { NgbSortableHeaderDirective } from './sortable.directive';



@NgModule({
  declarations: [
    AdvancedTableComponent,
    NgbSortableHeaderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule
  ],
  exports: [AdvancedTableComponent]
})
export class AdvancedTableModule { }
