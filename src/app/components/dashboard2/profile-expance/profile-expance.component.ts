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

export interface revenuetwoChart {
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
  selector: 'app-profile-expance',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule],
  templateUrl: './profile-expance.component.html',
})
export class AppProfileExpanceCpmponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenuetwoChart!: Partial<revenuetwoChart> | any;

  constructor() {
    this.revenuetwoChart = {
      series: [
        {
          colors: '#0085db',
          name: 'Profit',
          data: [60, 40, 37, 35, 35, 20, 30],
        },
        {
          colors: '#fb977d',
          name: 'Expenses',
          data: [15, 30, 15, 35, 25, 30, 30],
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 300,
        stacked: true,
      },
      colors: ['#0085db', '#fb977d'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '27%',
          borderRadius: 6,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },

      legend: {
        show: false,
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        padding: { top: 0, bottom: -8, left: 20, right: 20 },
      },
      xaxis: {
        categories: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
        fillSeriesColor: false,
      },
    };
  }
}
