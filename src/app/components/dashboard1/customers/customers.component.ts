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

export interface customersChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  templateUrl: './customers.component.html',
})
export class AppCustomersComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public customersChart!: Partial<customersChart> | any;

  constructor() {
    this.customersChart = {
      series: [
        {
          name: '',
          data: [25, 66, 20, 40, 12, 30],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        height: 103,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      colors: ['#0085db'],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.05,
          opacityTo: 0,
          stops: [20, 180],
        },
      },
      markers: {
        size: 0,
      },
      tooltip: {
        enabled: false,
      },
    };
  }
}
