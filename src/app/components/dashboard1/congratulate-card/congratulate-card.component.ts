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

interface month {
  value: string;
  viewValue: string;
}

interface stats {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface revenueChart {
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
  selector: 'app-congratulate-card',
  standalone: true,
  imports: [NgApexchartsModule, MaterialModule, TablerIconsModule],
  templateUrl: './congratulate-card.component.html',
})
export class AppCongratulateCardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public revenueChart!: Partial<revenueChart> | any;

  months: month[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];

  constructor() {
    this.revenueChart = {
      series: [
        {
          name: '',
          data: [0, 20, 15, 19, 14, 25, 32],
          color: '#0085db',
        },
        {
          name: '',
          data: [0, 12, 19, 13, 26, 16, 25],
          color: '#46caeb',
        },
      ],

      chart: {
        type: 'line',
        fontFamily: "inherit",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 260,
        stacked: false,
      },

      legend: {
        show: false,
      },
      stroke: {
        width: 3,
        curve: "smooth",
      },
      grid: {
        show: true,
        borderColor: 'rgba(0,0,0,0.1)',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
        },
        type: "category",
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function (value: any) {
            return value + "k";
          },
        },
      },
      tooltip: {
        theme: "dark",
        fillSeriesColor: false,
      },
    };
  }

  stats: stats[] = [
    {
      id: 1,
      color: 'success',
      title: '64 new orders',
      subtitle: 'Processing',
      icon: 'shopping-bag',
    },
    {
      id: 2,
      color: 'warning',
      title: '4 orders',
      subtitle: 'On hold',
      icon: 'player-pause',
    },
    {
      id: 3,
      color: 'info',
      title: '12 orders',
      subtitle: 'Delivered',
      icon: 'trolley',
    },
  ];
}
