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
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

export interface paymentsChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  templateUrl: './payments.component.html',
})
export class AppPaymentsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public paymentsChart!: Partial<paymentsChart> | any;

  constructor() {
    this.paymentsChart = {
      series: [
        {
          name: 'Last Year ',
          data: [29, 52, 38, 47, 56, 41, 46],
        },
        {
          name: 'This Year ',
          data: [71, 71, 71, 71, 71, 71, 71],
        },
      ],

      chart: {
        type: "bar",
        fontFamily: "inherit",
        foreColor: "#adb0bb",
        toolbar: {
          show: false,
        },
        height: 150,
        stacked: true,
      },
      colors: ['#0085db', '#e7ecf0'],
      plotOptions: {
        bar: {
            horizontal: false,
            // barHeight: "90%",
            columnWidth: "26%",
            borderRadius: [3],
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "all",
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
      grid: {
        show: false,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      xaxis: {
        categories: [["M"], ["T"], ["W"], ["T"], ["F"], ["S"], ["S"]],
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
        enabled: false,
      },
    };
  }
}
