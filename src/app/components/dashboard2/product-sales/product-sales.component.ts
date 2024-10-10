import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

export interface productSalesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-product-sales',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  templateUrl: './product-sales.component.html',
})
export class AppProductSalesComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public productSalesChart!: Partial<productSalesChart> | any;

  constructor() {
    this.productSalesChart = {
      series: [
        {
          colors: ['#0085db'],
          name: 'Product Sales',
          data: [13, 15, 14, 17, 16, 19, 17],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "inherit",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 240,
      },

      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.2,
          opacityTo: 0,
          stops: [20, 180],
        },
      },
      dataLabels: {
        enabled: false,
      },

      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 4,
        strokeWidth: 1,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      xaxis: {
        categories: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
