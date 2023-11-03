import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TreeModule } from '@circlon/angular-tree-component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { JoyrideModule } from 'ngx-joyride';
import { SortablejsModule } from 'ngx-sortablejs';

import { ExtendedUiRoutingModule } from './extended-ui-routing.module';

import { DraggableCardsComponent } from './draggable-cards/draggable-cards.component';
import { RangeslidersComponent } from './rangesliders/rangesliders.component';
import { SweetAlertsComponent } from './sweet-alerts/sweet-alerts.component';
import { TourPageComponent } from './tour-page/tour-page.component';
import { TreeViewComponent } from './tree-view/tree-view.component';



@NgModule({
  declarations: [
    RangeslidersComponent,
    SweetAlertsComponent,
    DraggableCardsComponent,
    TourPageComponent,
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    SortablejsModule,
    SweetAlert2Module,
    TreeModule,
    JoyrideModule,
    NgbDropdownModule,
    ExtendedUiRoutingModule
  ]
})
export class ExtendedUiModule { }
