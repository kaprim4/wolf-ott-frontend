import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { ProgressbarsComponent } from './progressbars/progressbars.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets.component';



@NgModule({
  declarations: [
    WidgetsComponent,
    ProgressbarsComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    WidgetModule,
    WidgetsRoutingModule
  ]
})
export class WidgetsModule { }
