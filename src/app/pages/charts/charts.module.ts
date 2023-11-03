import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';

import { ApexComponent } from './apex/apex.component';
import { ChartjsComponent } from './chartjs/chartjs.component';


@NgModule({
  declarations: [
    ChartjsComponent,
    ApexComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgApexchartsModule,
    NgChartsModule,
    ChartsRoutingModule
  ]
})
export class ChartModule { }
