import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

export interface productsChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  templateUrl: './products.component.html',
})
export class AppProductsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public productsChart!: Partial<productsChart> | any;

  constructor() {
    this.productsChart = {
      series: [70, 18, 12],

      chart: {
        type: 'donut',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 170,
      },
      colors: ['#0085db', '#fb977d', '#46caeb'],
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: '85%',
          },
        },
      },
      stroke: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },

      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    };
  }
}
